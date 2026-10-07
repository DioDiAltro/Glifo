/**
 * «Spiegami» con Qwen3 vero, nel browser, sulla build in dist/ (esegui prima `npm run build`):
 *   CHROMIUM_PATH=/opt/pw-browsers/chromium node scripts/spiegami-qwen.mjs
 *
 * Le prove di sempre (scripts/smoke-test.mjs) usano un worker finto; questa scarica il modello da
 * Hugging Face (serve la rete verso huggingface.co e i suoi server dei file, *.hf.co) e lo fa girare.
 * Senza scheda grafica Chromium usa WebGPU sulla CPU (SwiftShader, con --enable-unsafe-webgpu): va
 * bene per vedere se i passaggi e gli strumenti funzionano, non per la velocità.
 *
 * MODELLO=Qwen3-1.7B per un altro modello (di solito Qwen3-0.6B, il più leggero), FORMULA per un altro
 * conto, MINUTI per aspettare di più (60), FOTO=cartella per la foto della spiegazione. Scrive le
 * domande e le risposte del modello, poi i passaggi con i segni di Glifo.
 */
import { chromium } from 'playwright-core'
import { preview } from 'vite'

const model = process.env.MODELLO || 'Qwen3-0.6B'
const formula = process.env.FORMULA || String.raw`\int_{-R}^{R} \pi (R^2 - x^2) \, dx =`
const minutes = Number(process.env.MINUTI || 60)
const server = await preview({ preview: { port: 4176, strictPort: true }, logLevel: 'error' })
const url = server.resolvedUrls.local[0]
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--enable-unsafe-webgpu'] })
const started = Date.now()
const elapsed = () => `${Math.round((Date.now() - started) / 1000)} s`
let ok = false

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: 'block' })
  await context.addInitScript((chosen) => {
    localStorage.setItem('glifo.tutorial.v1', 'visto')
    localStorage.setItem('glifo.settings.v1', JSON.stringify({ localModel: chosen }))
    // Le domande al worker e le risposte del modello, per vederle qui.
    const Original = window.Worker
    window.Worker = class extends Original {
      constructor(...args) {
        super(...args)
        this.addEventListener('message', (ev) => {
          const m = ev.data
          if (m?.type === 'done' && typeof m.value === 'string' && m.value) window.glifoLog?.('risposta', m.value)
          if (m?.type === 'error') window.glifoLog?.('errore', `${m.name}: ${m.message}`)
        })
      }
      postMessage(msg, ...rest) {
        if (msg?.type === 'chat') window.glifoLog?.('domanda', msg.messages.at(-1).content)
        if (msg?.type === 'load') window.glifoLog?.('carico', msg.model)
        return super.postMessage(msg, ...rest)
      }
    }
  }, model)
  const page = await context.newPage()
  await page.exposeFunction('glifoLog', (kind, text) => console.log(`\n[${elapsed()}] ${kind}:\n${text}`))
  page.on('pageerror', (e) => console.log(`[${elapsed()}] errore nella pagina: ${e.message}`))
  await page.goto(url)
  await page.waitForSelector('.cm-editor')
  const gpu = await page.evaluate(async () => {
    const a = await navigator.gpu?.requestAdapter()
    return a ? `${a.info?.vendor} ${a.info?.architecture}, shader-f16: ${a.features.has('shader-f16')}` : 'nessuna'
  })
  console.log(`Scheda grafica per WebGPU: ${gpu}. Modello: ${model}.`)
  await page.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await page.keyboard.press('Control+a')
  await page.keyboard.insertText(`# Prova\n\n$${formula}$`)
  await page.keyboard.press('ArrowLeft')
  const button = page.locator('.formula-box .btn-explain')
  await button.waitFor({ state: 'visible', timeout: 10000 })
  await button.click()
  // L'avanzamento ogni 15 secondi, finché ci sono i passaggi o un errore.
  let last = ''
  const deadline = Date.now() + minutes * 60_000
  while (Date.now() < deadline) {
    const state = await page.evaluate(() => {
      const box = document.querySelector('.explain-box')
      return {
        status: box?.querySelector('[role="status"]')?.textContent ?? '',
        error: box?.querySelector('.ai-error')?.textContent ?? '',
        done: !!box?.querySelector('.explain-steps'),
      }
    })
    if (state.error) {
      console.log(`\n[${elapsed()}] Il pannello dice: ${state.error}`)
      break
    }
    if (state.done) {
      ok = true
      break
    }
    if (state.status !== last) console.log(`[${elapsed()}] ${(last = state.status)}`)
    await page.waitForTimeout(15000)
  }
  if (ok) {
    const result = await page.evaluate(() => {
      const box = document.querySelector('.explain-box')
      const tex = (el) => [...(el?.querySelectorAll('annotation') ?? [])].map((a) => a.textContent).join(' ')
      const steps = [...box.querySelectorAll('.explain-step')].map((li, i) => {
        const mark = li.querySelector('.calc-check')
        const sign = mark ? (mark.classList.contains('is-ok') ? '✓' : `✗ ${mark.title}`) : li.querySelector('.explain-unchecked') ? 'non controllato' : ''
        const text = li.querySelector('.explain-text')
        const plain = text ? [...text.childNodes].map((n) => (n.nodeType === 3 ? n.textContent : tex(n) ? `$${tex(n)}$` : n.textContent)).join('') : ''
        return `${i + 1}. ${plain}\n   $$${tex(li.querySelector('.explain-math-render'))}$$  ${sign}`
      })
      const summary = box.querySelector('.explain-summary')
      return { model: box.querySelector('.ai-model')?.textContent, steps, summary: summary ? [...summary.childNodes].map((n) => (n.nodeType === 3 ? n.textContent : tex(n))).join('') : '', notes: box.querySelector('.ai-hint')?.textContent ?? '' }
    })
    console.log(`\n[${elapsed()}] Spiegazione di ${result.model}:\n${result.steps.join('\n')}\n${result.summary}\n${result.notes}`)
    if (process.env.FOTO) await page.screenshot({ path: `${process.env.FOTO}/spiegami-qwen.png` })
  } else if (Date.now() >= deadline) console.log(`\nDopo ${minutes} minuti la spiegazione non è ancora arrivata.`)
} finally {
  await browser.close()
  await new Promise((resolve) => server.httpServer.close(resolve))
}
process.exit(ok ? 0 : 1)
