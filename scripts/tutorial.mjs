/**
 * Registra i video del tutorial (src/ui/tutorial.ts) dall'app vera, nel tema chiaro e in quello
 * scuro, e li mette in public/tutorial/<pagina>-chiaro.webm e -scuro.webm:
 *   npm run build && node scripts/tutorial.mjs
 * Con LINGUA=en registra quelli con Glifo in inglese, in public/tutorial/en/.
 * Va rifatto quando cambia l'interfaccia che i video mostrano. Serve Chromium (CHROMIUM_PATH) e il
 * programma ffmpeg che Playwright usa per i suoi video (o FFMPEG_PATH).
 * Con un nome (node scripts/tutorial.mjs formule) rifà solo quella pagina.
 */
import { chromium } from 'playwright-core'
import { preview } from 'vite'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, statSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { join } from 'node:path'

/** La lingua di Glifo nei video: LINGUA=en per l'inglese. */
const LANG = process.env.LINGUA === 'en' ? 'en' : 'it'
const OUT = new URL(LANG === 'en' ? '../public/tutorial/en/' : '../public/tutorial/', import.meta.url).pathname

/** I testi che si scrivono nelle scene e le etichette dei pulsanti da premere, nelle due lingue. */
const L = {
  it: {
    title: '# Appunti di Analisi',
    parabola: 'La parabola $y = x^2',
    parabolaEnd: ' è rivolta verso l\'alto: il **vertice** è nell\'origine.',
    note: '# Appunti di Analisi\n\nLa parabola $y = x^2$ è rivolta verso l\'alto: il **vertice** è nell\'origine.\n',
    series: '## Serie\n\n',
    seriesText: 'La serie $\\sum',
    root: 'e la radice $\\radice',
    limits: '## Limiti\n\nIl limite per $x \\to $',
    search: 'infinito',
    insert: 'Inserisci',
    integrals: '## Integrali\n\n',
    parabolas: '## Parabole\n\nLa parabola $f(x) = x^2 - 2x$ ha il vertice in $(1, -1)$.\n',
    beforeCursor: 'La parabola $f(x) = x',
    graphButton: 'Grafico di una funzione',
    expenses: '## Spese del mese\n\n',
    tableButton: 'Tabella',
    tableWithFormulas: 'Tabella con le formule',
    rows: [
      ['Spesa', 'Euro'],
      ['Libri', '35'],
      ['Quaderni', '12'],
      ['Penne', '6'],
      ['Totale', '=SOMMA(B2:B4)'],
    ],
    chapter: '## Come studio un capitolo\n\n',
    diagramButton: 'Schema',
    read: 'Leggo il capitolo',
    understood: 'Ho capito?',
    redo: 'Rifaccio gli esercizi',
    done: 'Fatto',
    area: '## Integrali\n\nL\'area sotto la parabola $y = x^2$ tra 0 e 1:\n\n$$\\int_0^1 x^2 \\, dx = \\frac{1}{3}$$\n',
    whiteboard: 'Lavagna',
    highlighter: 'Evidenziatore',
    pen: 'Penna',
    select: 'Selezione',
    preview: 'Anteprima',
    split: 'Diviso',
  },
  en: {
    title: '# Calculus notes',
    parabola: 'The parabola $y = x^2',
    parabolaEnd: ' opens upward: its **vertex** is at the origin.',
    note: '# Calculus notes\n\nThe parabola $y = x^2$ opens upward: its **vertex** is at the origin.\n',
    series: '## Series\n\n',
    seriesText: 'The series $\\sum',
    root: 'and the root $\\sqrt',
    limits: '## Limits\n\nThe limit as $x \\to $',
    search: 'infinity',
    insert: 'Insert',
    integrals: '## Integrals\n\n',
    parabolas: '## Parabolas\n\nThe parabola $f(x) = x^2 - 2x$ has its vertex at $(1, -1)$.\n',
    beforeCursor: 'The parabola $f(x) = x',
    graphButton: 'Graph of a function',
    expenses: '## Monthly expenses\n\n',
    tableButton: 'Table',
    tableWithFormulas: 'Table with formulas',
    rows: [
      ['Expense', 'Amount'],
      ['Books', '35'],
      ['Notebooks', '12'],
      ['Pens', '6'],
      ['Total', '=SUM(B2:B4)'],
    ],
    chapter: '## How I study a chapter\n\n',
    diagramButton: 'Diagram',
    read: 'Read the chapter',
    understood: 'Did I get it?',
    redo: 'Redo the exercises',
    done: 'Done',
    area: '## Integrals\n\nThe area under the parabola $y = x^2$ between 0 and 1:\n\n$$\\int_0^1 x^2 \\, dx = \\frac{1}{3}$$\n',
    whiteboard: 'Whiteboard',
    highlighter: 'Highlighter',
    pen: 'Pen',
    select: 'Select',
    preview: 'Preview',
    split: 'Split',
  },
}[LANG]
const SIZE = { width: 960, height: 600 }
/** Il primo e l'ultimo istante restano fermi un po', così il video ricomincia senza scatti. */
const HOLD = 1200

function ffmpegPath() {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH
  const roots = [process.env.PLAYWRIGHT_BROWSERS_PATH, join(homedir(), '.cache', 'ms-playwright')].filter(Boolean)
  for (const root of roots) {
    if (!existsSync(root)) continue
    for (const dir of readdirSync(root).filter((d) => d.startsWith('ffmpeg'))) {
      for (const name of ['ffmpeg-linux', 'ffmpeg-mac', 'ffmpeg-win64.exe']) {
        const p = join(root, dir, name)
        if (existsSync(p)) return p
      }
    }
  }
  return 'ffmpeg'
}

/**
 * Un puntatore disegnato nella pagina: nei video di Chromium quello vero non si vede. Segue i
 * pointermove, che arrivano anche mentre si scrive sulla lavagna; con la penna è la sua punta.
 */
function fakeCursor() {
  addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div')
    const arrow =
      '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 3v15.5l4.2-4.1 2.9 6.6 2.6-1.1-2.9-6.5H18z" fill="#14161f" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>'
    const tip = '<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="5" cy="3" r="3.2" fill="#6366f1" stroke="#fff" stroke-width="1.4"/></svg>'
    let kind = 'mouse'
    cursor.innerHTML = arrow
    Object.assign(cursor.style, { position: 'fixed', left: '-50px', top: '-50px', zIndex: 2147483647, pointerEvents: 'none' })
    document.body.append(cursor)
    addEventListener(
      'pointermove',
      (e) => {
        const next = e.pointerType === 'pen' ? 'pen' : 'mouse'
        if (next !== kind) cursor.innerHTML = (kind = next) === 'pen' ? tip : arrow
        Object.assign(cursor.style, { left: `${e.clientX - 5}px`, top: `${e.clientY - 3}px` })
      },
      true,
    )
    addEventListener(
      'pointerdown',
      (e) => {
        if (e.pointerType === 'pen') return
        const ring = document.createElement('div')
        Object.assign(ring.style, {
          position: 'fixed',
          left: `${e.clientX - 14}px`,
          top: `${e.clientY - 14}px`,
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '2px solid #6366f1',
          zIndex: 2147483646,
          pointerEvents: 'none',
          transition: 'transform 0.45s, opacity 0.45s',
        })
        document.body.append(ring)
        requestAnimationFrame(() => Object.assign(ring.style, { transform: 'scale(1.8)', opacity: '0' }))
        setTimeout(() => ring.remove(), 600)
      },
      true,
    )
  })
}

/** Il punto in mezzo a un elemento (un selettore o un locator di Playwright). */
async function centerOf(page, target) {
  const locator = typeof target === 'string' ? page.locator(target) : target
  const box = await locator.first().boundingBox()
  if (!box) throw new Error(`Non trovo ${target}`)
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
}

/** Il puntatore va piano sull'elemento e ci clicca. */
async function clickOn(page, target, pause = 350) {
  const { x, y } = await centerOf(page, target)
  await page.mouse.move(x, y, { steps: 28 })
  await page.waitForTimeout(pause)
  await page.mouse.down()
  await page.mouse.up()
}

const type = (page, text) => page.keyboard.type(text, { delay: 65 })

/** La nota da cui parte la scena (scritta di colpo: questa parte non resta nel video). */
async function startNote(page, text, cursorAt = 'end') {
  await page.locator('.cm-content').click()
  await page.keyboard.press('Control+A')
  await page.keyboard.insertText(text)
  if (cursorAt === 'end') await page.keyboard.press('Control+End')
  await page.waitForTimeout(500)
}

/**
 * Il worker di WebLLM finto per la pagina di «Spiega con l'AI» (parla come src/ai/llmWorker.ts, vedi
 * anche quello di scripts/smoke-test.mjs): chiede al motore la primitiva e poi spiega l'integrale in
 * quattro passaggi giusti, che Glifo segna con ✓, scrivendoli a pezzi come un modello vero. Nei video
 * inglesi parla inglese, con i nomi inglesi degli strumenti (src/ai/tools.ts).
 */
function tutorialModel(lang) {
  const call =
    lang === 'en'
      ? '<tool_call>{"name": "antiderivative", "arguments": {"function": "x^2", "variable": "x"}}</tool_call>'
      : '<tool_call>{"name": "primitiva", "arguments": {"funzione": "x^2", "variabile": "x"}}</tool_call>'
  const steps =
    lang === 'en'
      ? String.raw`1. By the power rule an antiderivative of $x^2$ is $\frac{x^3}{3}$: raise the exponent by one and divide by the new exponent. $$\int x^{2} \, dx = \frac{x^{3}}{3} + c$$
2. By the fundamental theorem of calculus we only need the antiderivative at the endpoints. $$\int_{0}^{1} x^{2} \, dx = \left[ \frac{x^{3}}{3} \right]_{0}^{1}$$
3. I plug in the endpoints, first 1 and then 0, and take the difference. $$\left[ \frac{x^{3}}{3} \right]_{0}^{1} = \frac{1^{3}}{3} - \frac{0^{3}}{3}$$
4. So the area under the parabola between 0 and 1 is one third. $$\frac{1^{3}}{3} - \frac{0^{3}}{3} = \frac{1}{3}$$`
      : String.raw`1. Per la regola della potenza una primitiva di $x^2$ è $\frac{x^3}{3}$: si alza l'esponente di uno e si divide per il nuovo esponente. $$\int x^{2} \, dx = \frac{x^{3}}{3} + c$$
2. Per il teorema fondamentale del calcolo integrale basta calcolare la primitiva agli estremi. $$\int_{0}^{1} x^{2} \, dx = \left[ \frac{x^{3}}{3} \right]_{0}^{1}$$
3. Sostituisco gli estremi, prima 1 e poi 0, e faccio la differenza. $$\left[ \frac{x^{3}}{3} \right]_{0}^{1} = \frac{1^{3}}{3} - \frac{0^{3}}{3}$$
4. Quindi l'area sotto la parabola tra 0 e 1 è un terzo. $$\frac{1^{3}}{3} - \frac{0^{3}}{3} = \frac{1}{3}$$`
  self.addEventListener('message', (ev) => {
    const msg = ev.data
    if (msg.type === 'load') {
      self.postMessage({ id: msg.id, type: 'progress', progress: 0.6, text: 'Fetching param cache[3/5]' })
      setTimeout(() => self.postMessage({ id: msg.id, type: 'done', value: `${msg.model}-q4f16_1-MLC` }), 400)
    } else if (msg.type === 'chat') {
      const reply = msg.messages.some((m) => m.role === 'user' && m.content.includes('<tool_response>')) ? steps : call
      let at = 0
      const next = () => {
        if (at >= reply.length) return self.postMessage({ id: msg.id, type: 'done', value: reply })
        self.postMessage({ id: msg.id, type: 'delta', text: reply.slice(at, at + 5) })
        at += 5
        setTimeout(next, 16)
      }
      setTimeout(next, 300)
    } else if (msg.type === 'remove') self.postMessage({ id: msg.id, type: 'done' })
  })
}

/**
 * Il worker finto del lettore di «In LaTeX» per la pagina della lavagna (parla come src/ai/formulaWorker.ts,
 * vedi anche quello di scripts/smoke-test.mjs): si prepara e legge «y = x²» nel LaTeX a modo suo di
 * pix2text-mfr, nel tempo di una lettura vera.
 */
function tutorialReader() {
  self.addEventListener('message', (ev) => {
    const msg = ev.data
    if (msg.type === 'load') setTimeout(() => self.postMessage({ id: msg.id, type: 'done' }), 150)
    else if (msg.type === 'read') setTimeout(() => self.postMessage({ id: msg.id, type: 'done', text: 'y = x ^ { 2 }', ms: 900 }), 900)
  })
}

/**
 * Il lettore di «In LaTeX» già nel browser, come dopo il primo sì: la sua cache con i nomi dei file veri
 * (il worker finto non li legge), così la finestra legge subito, senza chiedere di scaricarlo.
 */
async function readerInCache(page) {
  const engine = readdirSync(new URL('../dist/assets/', import.meta.url)).find((f) => /^ort-wasm-simd-threaded.*\.wasm$/.test(f))
  await page.evaluate(async (engine) => {
    const cache = await caches.open('glifo-lettore')
    const hub = 'https://huggingface.co/breezedeus/pix2text-mfr-1.5/resolve/1cef9f0bdcd6a4c63df7de1311fb0894593340cc/'
    for (const f of ['tokenizer.json', 'decoder_model.onnx', 'encoder_model.onnx']) await cache.put(hub + f, new Response('x'))
    await cache.put(`${location.origin}/assets/${engine}`, new Response('x'))
  }, engine)
}

/** Il centro di una forma dello schema, dal suo testo. */
async function schemaShape(page, text) {
  return page.evaluate((t) => {
    const label = [...document.querySelectorAll('.schema-canvas foreignObject > div > div > div')].find((d) => d.textContent === t)
    if (!label) return null
    const r = label.getBoundingClientRect()
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
  }, text)
}

const SCENES = {
  // Benvenuto: si scrive una nota e accanto si vede come viene.
  scrivere: {
    settings: { view: 'split' },
    async setup(page) {
      await startNote(page, '')
      await page.mouse.move(470, 330)
    },
    async play(page) {
      await type(page, L.title)
      await page.keyboard.press('Enter')
      await page.keyboard.press('Enter')
      await type(page, L.parabola)
      await page.keyboard.press('End')
      await type(page, L.parabolaEnd)
    },
  },
  // Le formule: i suggerimenti dopo la barra (nel pannello dei simboli), Tab e i segnaposto;
  // anche in italiano.
  formule: {
    settings: { view: 'editor', symbolsOpen: true },
    async setup(page) {
      await startNote(page, L.series)
      await page.mouse.move(480, 330)
    },
    async play(page) {
      await type(page, L.seriesText)
      await page.waitForSelector('.sug-list')
      await page.waitForTimeout(900)
      await page.keyboard.press('Tab')
      await type(page, 'n=0')
      await page.keyboard.press('Tab')
      await type(page, '\\infty')
      await page.keyboard.press('Tab')
      await type(page, ' a_n')
      await page.keyboard.press('End')
      await page.keyboard.press('Enter')
      await page.keyboard.press('Enter')
      await type(page, L.root)
      await page.waitForSelector('.sug-list')
      await page.waitForTimeout(700)
      await page.keyboard.press('Tab')
      await type(page, '2')
      await page.keyboard.press('End')
    },
  },
  // Il pannello dei simboli: si apre, si cerca a parole, un clic e il simbolo è nel testo.
  simboli: {
    settings: { view: 'editor', symbolsOpen: false },
    async setup(page) {
      await startNote(page, L.limits)
      await page.keyboard.press('ArrowLeft')
      await page.mouse.move(480, 330)
    },
    async play(page) {
      await clickOn(page, '.symbols-toggle')
      await page.waitForSelector('.symbols-panel', { state: 'visible' })
      await page.waitForTimeout(500)
      await clickOn(page, '.panel-search-input', 200)
      await type(page, L.search)
      await page.waitForTimeout(700)
      await clickOn(page, page.locator('.symbols-panel .answer-card button', { hasText: L.insert }))
      await page.waitForTimeout(300)
    },
  },
  // I calcoli: il risultato dopo l'uguale, Tab per scriverlo (✓), il controllo di un risultato scritto
  // sbagliato (✗) e un limite.
  calcoli: {
    settings: { view: 'split' },
    async setup(page) {
      await startNote(page, L.integrals)
      await page.mouse.move(470, 330)
    },
    async play(page) {
      await type(page, '$\\int_0^1 x^2 \\, dx =')
      await page.waitForSelector('.cm-calc-result', { timeout: 5000 })
      await page.waitForTimeout(1000)
      await page.keyboard.press('Tab')
      await page.waitForSelector('.cm-calc-check.is-ok', { timeout: 5000 })
      await page.waitForTimeout(900)
      await page.keyboard.press('End')
      await page.keyboard.press('Enter')
      await page.keyboard.press('Enter')
      await type(page, '$\\int_0^1 2x \\, dx = 2')
      await page.keyboard.press('End')
      await page.waitForSelector('.cm-calc-check.is-wrong', { timeout: 5000 })
      await page.waitForTimeout(1400)
      await page.keyboard.press('Enter')
      await page.keyboard.press('Enter')
      await type(page, '$\\lim_{x \\to 0} \\frac{\\sin x}{x} =')
      await page.waitForSelector('.cm-calc-result', { timeout: 5000 })
      await page.waitForTimeout(900)
      await page.keyboard.press('Tab')
      await page.waitForTimeout(600)
    },
  },
  // I grafici: il pulsante con gli assi disegna la funzione su cui c'è il cursore; nel blocco si aggiunge
  // una parabola con un numero da scegliere, il pulsante sotto il grafico ne fa lo slider e lo si trascina;
  // poi la freccia ↑ porta il grafico sopra la formula.
  grafici: {
    settings: { view: 'split' },
    async setup(page) {
      await startNote(page, L.parabolas)
      // Il cursore dentro la prima formula.
      await page.keyboard.press('Control+Home')
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Home')
      for (let i = 0; i < L.beforeCursor.length; i++) await page.keyboard.press('ArrowRight')
      await page.mouse.move(470, 330)
    },
    async play(page) {
      await clickOn(page, `.editor-toolbar button[aria-label^="${L.graphButton}"]`)
      await page.waitForSelector('.preview-pane .graph-block svg', { timeout: 5000 })
      await page.waitForTimeout(1200)
      // Nel blocco, sotto la funzione: una parabola con un numero da scegliere.
      await page.keyboard.press('ArrowUp')
      await page.keyboard.press('ArrowUp')
      await page.keyboard.press('End')
      await page.keyboard.press('Enter')
      await type(page, 'y = a x^2')
      await page.waitForSelector('.preview-pane .graph-add-slider', { timeout: 5000 })
      await page.waitForTimeout(700)
      await clickOn(page, '.preview-pane .graph-add-slider')
      await page.waitForSelector('.preview-pane .graph-slider-input', { timeout: 5000 })
      await page.waitForTimeout(600)
      // Lo slider: da 1 verso 3, piano, e poi indietro fino a mezzo.
      const box = await page.locator('.preview-pane .graph-slider-input').first().boundingBox()
      const at = (v) => box.x + 8 + ((v + 10) / 20) * (box.width - 16)
      const y = box.y + box.height / 2
      await page.mouse.move(at(1), y, { steps: 20 })
      await page.waitForTimeout(300)
      await page.mouse.down()
      await page.mouse.move(at(3), y, { steps: 30 })
      await page.waitForTimeout(400)
      await page.mouse.move(at(0.5), y, { steps: 30 })
      await page.mouse.up()
      await page.waitForTimeout(900)
      // La freccia ↑: il grafico va sopra la formula.
      await clickOn(page, '.preview-pane .graph-block .block-move[data-dir="up"]')
      await page.waitForTimeout(900)
    },
  },
  // Le tabelle: dal menu «Tabella» quella con le formule; si scrivono le spese (sotto l'intestazione) e il
  // totale con SOMMA, e con «Fatto» la tabella è nella nota.
  tabelle: {
    settings: { view: 'split' },
    async setup(page) {
      await startNote(page, L.expenses)
      await page.mouse.move(470, 330)
    },
    async play(page) {
      await clickOn(page, `.editor-toolbar button.tool-more[aria-label="${L.tableButton}"]`)
      await page.waitForTimeout(500)
      await clickOn(page, page.locator('.tool-menu-item', { hasText: L.tableWithFormulas }))
      await page.waitForSelector('dialog.sheet-editor[open]')
      await page.waitForTimeout(700)
      await clickOn(page, '#sheet-0-0', 250)
      // La prima riga è l'intestazione.
      for (const [what, amount] of L.rows) {
        await type(page, what)
        await page.keyboard.press('Tab')
        await type(page, amount)
        await page.keyboard.press('Enter')
        await page.waitForTimeout(250)
      }
      await page.waitForTimeout(1200)
      await clickOn(page, 'dialog.sheet-editor .btn-primary')
      await page.waitForSelector('.preview-pane .sheet-table', { timeout: 5000 })
      await page.waitForTimeout(600)
    },
  },
  // Gli schemi: l'editor come draw.io, due forme dalla tavolozza, la freccia blu che le collega e una
  // terza forma collegata con un clic; con «Fatto» lo schema è nella nota.
  schemi: {
    settings: { view: 'split' },
    async setup(page) {
      await startNote(page, L.chapter)
      await page.mouse.move(470, 330)
    },
    async play(page) {
      await clickOn(page, `.editor-toolbar button[aria-label^="${L.diagramButton}"]`)
      await page.waitForSelector('dialog.schema-editor[open]')
      await page.waitForTimeout(800)
      await clickOn(page, '.schema-shape[data-shape="rounded"]')
      await type(page, L.read)
      await page.keyboard.press('Escape')
      await page.waitForTimeout(300)
      await clickOn(page, '.schema-shape[data-shape="rhombus"]')
      await type(page, L.understood)
      await page.keyboard.press('Escape')
      await page.waitForTimeout(400)
      // La freccia blu sotto la prima forma, trascinata sul rombo.
      const first = await schemaShape(page, L.read)
      const second = await schemaShape(page, L.understood)
      await page.mouse.move(first.x, first.y, { steps: 25 })
      await page.waitForTimeout(400)
      const down = await centerOf(page, '.schema-arrow-down')
      await page.mouse.move(down.x, down.y, { steps: 10 })
      await page.mouse.down()
      await page.mouse.move(second.x, second.y, { steps: 25 })
      await page.mouse.up()
      await page.waitForTimeout(500)
      // Un clic sulla freccia a destra del rombo: una forma collegata.
      await page.mouse.move(second.x, second.y, { steps: 20 })
      await page.waitForTimeout(400)
      await clickOn(page, '.schema-arrow-right', 250)
      await type(page, L.redo)
      await page.keyboard.press('Escape')
      await page.waitForTimeout(1000)
      await clickOn(page, page.locator('dialog.schema-editor .btn-primary', { hasText: L.done }))
      await page.waitForSelector('dialog.schema-editor', { state: 'detached' })
      await page.waitForTimeout(800)
    },
  },
  // «Spiega con l'AI»: il pulsante ✨ apre l'elenco di cosa si può spiegare nella nota; scelto l'integrale,
  // il modello (qui finto, vedi tutorialModel) chiede la primitiva e lo spiega, e Glifo controlla i passaggi.
  spiegami: {
    settings: { view: 'editor', symbolsOpen: false },
    model: tutorialModel,
    async setup(page) {
      await startNote(page, L.area)
      await page.mouse.move(470, 330)
    },
    async play(page) {
      await clickOn(page, '.ai-toggle')
      await page.waitForSelector('.ai-subject')
      await page.waitForTimeout(900)
      await clickOn(page, '.ai-subject[data-kind="conto"]')
      await page.waitForSelector('.explain-summary', { timeout: 20000 })
      await page.waitForTimeout(700)
      // Giù nel pannello, fino al riepilogo di Glifo.
      await page.mouse.move(820, 420, { steps: 20 })
      for (let i = 0; i < 12; i++) {
        await page.mouse.wheel(0, 60)
        await page.waitForTimeout(60)
      }
      await page.waitForTimeout(600)
    },
  },
  // La lavagna: si apre accanto al testo e ci si scrive a mano con una penna (simulata, con la
  // pressione): gli assi (frecce storte che, tenendo ferma la penna, diventano precise), la parabola
  // in blu, «y = x²» con l'evidenziatore e il vertice cerchiato in rosso; poi il lazo prende «y = x²» e
  // «In LaTeX» (con un lettore finto, vedi tutorialReader) ne fa la formula, che va nella nota.
  lavagna: {
    settings: { view: 'editor', notesOpen: false },
    reader: tutorialReader,
    async setup(page) {
      await readerInCache(page)
      await startNote(page, L.note)
      await page.mouse.move(470, 330)
    },
    async play(page) {
      await clickOn(page, `.view-button[aria-label="${L.whiteboard}"]`)
      await page.waitForSelector('.board-pane[data-loaded="true"]')
      await page.waitForTimeout(500)
      const stage = await page.locator('.board-stage').boundingBox()
      const cdp = await page.context().newCDPSession(page)
      const send = (type, [x, y], force) =>
        cdp.send('Input.dispatchMouseEvent', {
          type,
          x: stage.x + x,
          y: stage.y + y,
          button: 'left',
          buttons: type === 'mouseReleased' ? 0 : 1,
          clickCount: 1,
          pointerType: 'pen',
          force,
        })
      /**
       * Un tratto per i punti dati, un punto ogni 6 pixel; `pressure(t)` da 0 (inizio) a 1 (fine);
       * `hold`: alla fine la penna resta ferma tanti millisecondi (il tratto diventa una figura precisa).
       */
      async function pen(points, pressure = () => 0.5, pace = 3, hold = 0, wobble = 0) {
        const dense = [points[0]]
        for (let i = 1; i < points.length; i++) {
          const [ax, ay] = points[i - 1]
          const [bx, by] = points[i]
          const steps = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay) / 6))
          for (let k = 1; k <= steps; k++) {
            // Un po' storto, come a mano.
            const w = wobble * Math.sin((dense.length + k) * 0.7)
            dense.push([ax + ((bx - ax) * k) / steps + w * 0.4, ay + ((by - ay) * k) / steps + w])
          }
        }
        // La penna arriva da sopra il foglio, sospesa, come una vera.
        await send('mouseMoved', dense[0], 0)
        await page.waitForTimeout(40)
        await send('mousePressed', dense[0], pressure(0))
        for (let i = 1; i < dense.length; i++) {
          await send('mouseMoved', dense[i], pressure(i / (dense.length - 1)))
          await page.waitForTimeout(pace)
        }
        if (hold) await page.waitForTimeout(hold)
        await send('mouseReleased', dense.at(-1), 0)
        await page.waitForTimeout(60)
      }
      /** Si tocca un pulsante con la penna, come sul tablet. */
      const tap = async (selector) => {
        const box = await page.locator(selector).boundingBox()
        const at = [box.x + box.width / 2 - stage.x, box.y + box.height / 2 - stage.y]
        await send('mouseMoved', at, 0)
        await page.waitForTimeout(250)
        await send('mousePressed', at, 0.5)
        await send('mouseReleased', at, 0)
        await page.waitForTimeout(250)
      }
      const color = (name) => tap(`.board-color[data-color="${name}"]`)
      // Gli assi: frecce in un tratto solo, un po' storte; la penna ferma alla fine le fa precise.
      await pen([[40, 333], [440, 327], [426, 319], [440, 327], [426, 337]], () => 0.5, 3, 800, 2.5)
      await pen([[202, 410], [198, 105], [190, 119], [198, 105], [206, 119]], () => 0.5, 3, 800, 2.5)
      // La parabola, in blu: la pressione cresce un po' verso la fine.
      await color('blue')
      const parabola = Array.from({ length: 41 }, (_, i) => {
        const t = i / 20 - 1
        return [200 + 92 * t, 330 - 205 * t * t]
      })
      await pen(parabola, (t) => 0.35 + 0.4 * t, 6)
      // «y = x²» scritto a mano.
      await color('ink')
      await pen([[292, 140], [297, 150], [303, 157], [307, 160]], (t) => 0.45 + 0.2 * t)
      await pen([[318, 140], [312, 156], [306, 171], [300, 183], [293, 190]], (t) => 0.55 - 0.2 * t)
      await pen([[328, 155], [347, 155]])
      await pen([[328, 166], [347, 166]])
      await pen([[358, 145], [380, 170]], (t) => 0.4 + 0.3 * t)
      await pen([[380, 145], [358, 170]], (t) => 0.4 + 0.3 * t)
      await pen([[386, 133], [389, 128], [394, 126], [399, 129], [398, 134], [387, 145], [400, 145]], () => 0.45)
      // L'evidenziatore giallo su «y = x²»: passato dopo, resta sotto la scrittura.
      await tap(`.board-button[aria-label="${L.highlighter}"]`)
      await pen([[284, 160], [344, 158], [406, 159]], () => 0.5, 8)
      // Il vertice cerchiato in rosso: prima si torna alla penna (con l'evidenziatore si vedono i suoi colori).
      await tap(`.board-button[aria-label="${L.pen}"]`)
      await color('red')
      const circle = Array.from({ length: 33 }, (_, i) => {
        const a = (i / 30) * 2 * Math.PI - 0.6
        return [200 + 22 * Math.cos(a), 330 + 18 * Math.sin(a)]
      })
      await pen(circle, () => 0.55, 6)
      // Il lazo intorno a «y = x²» (con l'evidenziatore): si apre il menu della selezione.
      await tap(`.board-button[aria-label="${L.select}"]`)
      const loop = Array.from({ length: 37 }, (_, i) => {
        const a = (i / 34) * 2 * Math.PI + 0.4
        return [345 + 78 * Math.cos(a), 160 + 44 * Math.sin(a)]
      })
      await pen(loop, () => 0.5, 8)
      await page.waitForTimeout(600)
      // «In LaTeX», nel menu della selezione: si vedono la formula letta e il suo codice, e «Inserisci nella
      // nota» la mette in fondo alla nota, dov'è il cursore; la penna, scelta di nuovo, toglie la selezione.
      await tap('.board-sel-item.is-latex')
      await page.waitForFunction(() => document.querySelector('.dialog-latex .latex-code')?.value)
      await page.waitForTimeout(1300)
      await tap('.dialog-latex .dialog-actions .btn-primary')
      await page.waitForTimeout(400)
      await tap(`.board-button[aria-label="${L.pen}"]`)
      // Il puntatore va subito dopo la formula arrivata nella nota.
      const formula = await page
        .locator('.cm-line', { hasText: 'x^2' })
        .last()
        .evaluate((line) => {
          const range = document.createRange()
          range.selectNodeContents(line)
          const r = range.getBoundingClientRect()
          return { x: r.right, y: r.y + r.height / 2 }
        })
      await page.mouse.move(formula.x + 10, formula.y + 4, { steps: 15 })
    },
  },
  // Le viste e la barra laterale.
  barra: {
    settings: { view: 'split', notesOpen: false },
    async setup(page) {
      await startNote(page, `${L.note}\n$$\\int_0^1 x^2 \\, dx = \\frac{1}{3}$$\n`)
      await page.mouse.move(480, 300)
    },
    async play(page) {
      await clickOn(page, `.view-button[aria-label="${L.preview}"]`)
      await page.waitForTimeout(900)
      await clickOn(page, '.view-button[aria-label="Editor"]')
      await page.waitForTimeout(900)
      await clickOn(page, `.view-button[aria-label="${L.split}"]`)
      await page.waitForTimeout(700)
      await clickOn(page, '.side-open')
      await page.waitForTimeout(700)
      const share = await centerOf(page, '.share-button')
      await page.mouse.move(share.x, share.y, { steps: 25 })
      await page.waitForTimeout(700)
      const profile = await centerOf(page, '.side-profile')
      await page.mouse.move(profile.x, profile.y, { steps: 30 })
    },
  },
  // Condividere: «Condividi» in fondo alla barra laterale (senza account: il link vuole l'account, la
  // stampa no), poi l'account e il fumetto dei commenti.
  condividi: {
    settings: { view: 'split', notesOpen: false },
    async setup(page) {
      await startNote(page, `${L.note}\n$$\\int_0^1 x^2 \\, dx = \\frac{1}{3}$$\n`)
      await page.mouse.move(480, 300)
    },
    async play(page) {
      await clickOn(page, '.side-open')
      await page.waitForTimeout(700)
      await clickOn(page, '.share-button')
      await page.waitForSelector('dialog.dialog[open]')
      await page.waitForTimeout(1200)
      const print = await centerOf(page, '.share-print')
      await page.mouse.move(print.x, print.y, { steps: 25 })
      await page.waitForTimeout(1400)
      await page.keyboard.press('Escape')
      await page.waitForTimeout(500)
      const account = await centerOf(page, '.account-button')
      await page.mouse.move(account.x, account.y, { steps: 25 })
      await page.waitForTimeout(900)
      const feedback = await centerOf(page, '.side-feedback')
      await page.mouse.move(feedback.x, feedback.y, { steps: 20 })
    },
  },
}

const only = process.argv[2]
const scenes = Object.entries(SCENES).filter(([id]) => !only || id === only)
if (!scenes.length) throw new Error(`Pagina sconosciuta: ${only}`)

const ffmpeg = ffmpegPath()
mkdirSync(OUT, { recursive: true })
const server = await preview({ preview: { port: 4176, strictPort: true }, logLevel: 'error' })
const url = server.resolvedUrls.local[0]
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
const work = mkdtempSync(join(tmpdir(), 'glifo-tutorial-'))
try {
  for (const [id, scene] of scenes) {
    for (const [theme, scheme] of [
      ['chiaro', 'light'],
      ['scuro', 'dark'],
    ]) {
      const dir = join(work, `${id}-${theme}`)
      // Glifo nella lingua dei video (la prende dal browser e dalle impostazioni, src/i18n.ts); senza
      // service worker il modello finto di «Spiega con l'AI» e il lettore finto di «In LaTeX» prendono il
      // posto di quelli veri.
      const context = await browser.newContext({
        viewport: SIZE,
        colorScheme: scheme,
        locale: LANG === 'en' ? 'en-US' : 'it-IT',
        serviceWorkers: 'block',
        recordVideo: { dir, size: SIZE },
      })
      if (scene.model) await context.route('**/assets/llmWorker-*.js', (route) => route.fulfill({ contentType: 'text/javascript', body: `(${scene.model})(${JSON.stringify(LANG)})` }))
      if (scene.reader) await context.route('**/assets/formulaWorker-*.js', (route) => route.fulfill({ contentType: 'text/javascript', body: `(${scene.reader})()` }))
      const started = Date.now()
      await context.addInitScript(fakeCursor)
      await context.addInitScript((settings) => {
        localStorage.setItem('glifo.tutorial.v1', 'visto')
        localStorage.setItem(
          'glifo.settings.v1',
          JSON.stringify({ theme: 'auto', fontSize: 17, spellcheck: false, notesOpen: false, symbolsOpen: false, ...settings }),
        )
      }, { language: LANG, ...scene.settings })
      const page = await context.newPage()
      await page.goto(url)
      await page.waitForSelector('.cm-editor')
      await page.waitForTimeout(800)
      await scene.setup(page)
      // I fotogrammi arrivano al video con un po' di ritardo: si comincia quando la nota di
      // partenza c'è già da un momento.
      await page.waitForTimeout(700)
      const from = (Date.now() - started) / 1000 + 0.3
      await page.waitForTimeout(HOLD)
      await scene.play(page)
      await page.waitForTimeout(HOLD + 600)
      const raw = await page.video().path()
      await context.close()
      const out = join(OUT, `${id}-${theme}.webm`)
      execFileSync(ffmpeg, [
        '-y', '-loglevel', 'error',
        '-ss', from.toFixed(2),
        '-i', raw,
        '-an',
        '-c:v', 'libvpx',
        '-b:v', '700k',
        '-crf', '10',
        '-qmin', '0',
        '-qmax', '42',
        '-deadline', 'good',
        '-cpu-used', '1',
        out,
      ])
      console.log(`${id}-${theme}.webm: ${Math.round(statSync(out).size / 1024)} kB`)
    }
  }
} finally {
  await browser.close()
  await new Promise((resolve) => server.httpServer.close(resolve))
  rmSync(work, { recursive: true, force: true })
}
