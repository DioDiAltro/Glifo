/**
 * «Spiegami» con Qwen3 vero, nel browser, sulla build in dist/ (esegui prima `npm run build`):
 *   CHROMIUM_PATH=/opt/pw-browsers/chromium node scripts/spiegami-qwen.mjs
 *
 * Le prove di sempre (scripts/smoke-test.mjs) usano un worker finto; questa scarica il modello da
 * Hugging Face (serve la rete verso huggingface.co e i suoi server dei file, *.hf.co) e lo fa girare.
 * Senza scheda grafica Chromium usa WebGPU sulla CPU (SwiftShader, con --enable-unsafe-webgpu): va
 * bene per vedere se i passaggi e gli strumenti funzionano, non per la velocità.
 *
 * MODELLO=Qwen3-1.7B per un altro modello (di solito Qwen3-0.6B, il più leggero; uno qualunque dell'elenco
 * di src/ai/localModels.ts, per esempio Qwen3.5-2B o Llama-3.2-1B-Instruct), FORMULA per un altro
 * conto, MINUTI per aspettare di più (60), FOTO=cartella per la foto della spiegazione. Scrive le
 * domande e le risposte del modello, poi i passaggi con i segni di Glifo.
 *
 * Sulla CPU WebGPU è lentissimo (Qwen3.5 0.8B: 0,4 token al secondo per leggere, 39 secondi per token
 * scritto): con LLAMA=http://127.0.0.1:8080 le risposte le dà un server llama.cpp con lo stesso modello in
 * GGUF (`llama-server -m modello.gguf --jinja -c 4096 -np 1 --reasoning-format none`), molto più veloce.
 * Glifo resta quello vero (domande, conti del motore, controlli e correzioni): finto è solo il worker di
 * «Spiegami», che gira le domande al server con gli stessi parametri del worker vero. Non dice quanto è
 * veloce il modello nel browser né se WebGPU lo fa girare: quello si prova su un computer vero.
 */
import { chromium } from 'playwright-core'
import { preview } from 'vite'

const model = process.env.MODELLO || 'Qwen3-0.6B'
const formula = process.env.FORMULA || String.raw`\int_{-R}^{R} \pi (R^2 - x^2) \, dx =`
const minutes = Number(process.env.MINUTI || 60)
const llama = process.env.LLAMA
const server = await preview({ preview: { port: 4176, strictPort: true }, logLevel: 'error' })
const url = server.resolvedUrls.local[0]
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--enable-unsafe-webgpu'] })
const started = Date.now()
const elapsed = () => `${Math.round((Date.now() - started) / 1000)} s`
let ok = false

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: 'block', locale: 'it-IT' })
  await context.addInitScript(({ chosen, llama }) => {
    localStorage.setItem('glifo.tutorial.v1', 'visto')
    localStorage.setItem('glifo.settings.v1', JSON.stringify({ localModel: chosen }))
    // Con LLAMA il worker di «Spiegami» è finto: risponde come src/ai/llmWorker.ts, con il testo di llama.cpp.
    class LlamaWorker {
      listeners = []
      addEventListener(type, fn) {
        if (type === 'message') this.listeners.push(fn)
      }
      removeEventListener() {}
      terminate() {}
      reply(data) {
        setTimeout(() => this.listeners.forEach((fn) => fn({ data })))
      }
      postMessage(msg) {
        if (msg?.type === 'load') {
          window.glifoLog?.('carico', msg.model)
          this.model = msg.model
          this.reply({ type: 'done', id: msg.id, value: `${msg.model}-q4f32_1-MLC` })
        } else if (msg?.type === 'chat') {
          window.glifoLog?.('domanda', msg.messages.at(-1).content)
          window.glifoLlama(this.model, msg.messages, msg.options?.maxTokens ?? 900).then(
            (text) => {
              window.glifoLog?.('risposta', text)
              this.reply({ type: 'delta', id: msg.id, text })
              this.reply({ type: 'done', id: msg.id, value: text })
            },
            (e) => {
              window.glifoLog?.('errore', e.message)
              this.reply({ type: 'error', id: msg.id, name: 'Error', message: e.message })
            },
          )
        } else if (msg?.type === 'remove') this.reply({ type: 'done', id: msg.id, value: '' })
      }
    }
    // Le domande al worker e le risposte del modello, per vederle qui.
    const Original = window.Worker
    window.Worker = class extends Original {
      constructor(...args) {
        if (llama && String(args[0]).includes('llmWorker')) return new LlamaWorker()
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
  }, { chosen: model, llama: Boolean(llama) })
  const page = await context.newPage()
  await page.exposeFunction('glifoLog', (kind, text) => console.log(`\n[${elapsed()}] ${kind}:\n${text}`))
  if (llama) {
    // Un modello grande ci mette qualche minuto a caricarsi: si aspetta che il server sia pronto.
    for (let i = 0; i < 600 && !(await fetch(`${llama}/health`).then((r) => r.ok, () => false)); i++) await new Promise((resolve) => setTimeout(resolve, 1000))
    const served = await fetch(`${llama}/v1/models`).then((r) => r.json())
    console.log(`Risponde llama.cpp con ${served.data?.[0]?.id}.`)
    // Gli stessi parametri di src/ai/llmWorker.ts (WebLLM non usa top_k e min_p); ai Qwen3 e Qwen3.5 il
    // ragionamento spento, con il blocco vuoto che WebLLM lascia anche nella risposta.
    await page.exposeFunction('glifoLlama', async (chosen, messages, maxTokens) => {
      const thinking = /^Qwen3(\.5)?-/.test(chosen)
      const body = { messages, max_tokens: maxTokens, temperature: 0.7, top_p: 0.8, top_k: 0, min_p: 0, seed: Math.floor(Math.random() * 2 ** 31), ...(thinking && { chat_template_kwargs: { enable_thinking: false } }) }
      const res = await fetch(`${llama}/v1/chat/completions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error?.message ?? res.statusText)
      const t = json.timings
      if (t) console.log(`[${elapsed()}] llama.cpp: ${t.prompt_n} token letti in ${Math.round(t.prompt_ms / 1000)} s, ${t.predicted_n} scritti in ${Math.round(t.predicted_ms / 1000)} s`)
      const text = json.choices[0].message.content
      return thinking && !text.startsWith('<think>') ? `<think>\n\n</think>\n\n${text}` : text
    })
  }
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
