/**
 * Registra i video del tutorial (src/ui/tutorial.ts) dall'app vera, nel tema chiaro e in quello
 * scuro, e li mette in public/tutorial/<pagina>-chiaro.webm e -scuro.webm:
 *   npm run build && node scripts/tutorial.mjs
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

const OUT = new URL('../public/tutorial/', import.meta.url).pathname
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

/** Un puntatore disegnato nella pagina: nei video di Chromium quello vero non si vede. */
function fakeCursor() {
  addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div')
    cursor.innerHTML =
      '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 3v15.5l4.2-4.1 2.9 6.6 2.6-1.1-2.9-6.5H18z" fill="#14161f" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>'
    Object.assign(cursor.style, { position: 'fixed', left: '-50px', top: '-50px', zIndex: 2147483647, pointerEvents: 'none' })
    document.body.append(cursor)
    addEventListener('mousemove', (e) => Object.assign(cursor.style, { left: `${e.clientX - 5}px`, top: `${e.clientY - 3}px` }), true)
    addEventListener(
      'mousedown',
      (e) => {
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

const SCENES = {
  // Benvenuto: si scrive una nota e accanto si vede come viene.
  scrivere: {
    settings: { view: 'split' },
    async setup(page) {
      await startNote(page, '')
      await page.mouse.move(470, 330)
    },
    async play(page) {
      await type(page, '# Appunti di Analisi')
      await page.keyboard.press('Enter')
      await page.keyboard.press('Enter')
      await type(page, 'La parabola $y = x^2')
      await page.keyboard.press('End')
      await type(page, ' è rivolta verso l\'alto: il **vertice** è nell\'origine.')
    },
  },
  // Le formule: i suggerimenti dopo la barra (nel pannello dei simboli), Tab e i segnaposto;
  // anche in italiano.
  formule: {
    settings: { view: 'editor', symbolsOpen: true },
    async setup(page) {
      await startNote(page, '## Serie\n\n')
      await page.mouse.move(480, 330)
    },
    async play(page) {
      await type(page, 'La serie $\\sum')
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
      await type(page, 'e la radice $\\radice')
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
      await startNote(page, '## Limiti\n\nIl limite per $x \\to $')
      await page.keyboard.press('ArrowLeft')
      await page.mouse.move(480, 330)
    },
    async play(page) {
      await clickOn(page, '.symbols-toggle')
      await page.waitForSelector('.symbols-panel', { state: 'visible' })
      await page.waitForTimeout(500)
      await clickOn(page, '.panel-search-input', 200)
      await type(page, 'infinito')
      await page.waitForTimeout(700)
      await clickOn(page, page.locator('.symbols-panel .answer-card button', { hasText: 'Inserisci' }))
      await page.waitForTimeout(300)
    },
  },
  // I calcoli e i grafici: il risultato dopo l'uguale, Tab per scriverlo, il pulsante del grafico.
  calcoli: {
    settings: { view: 'split' },
    async setup(page) {
      await startNote(page, '## Integrali\n\n')
      await page.mouse.move(470, 330)
    },
    async play(page) {
      await type(page, '$\\int_0^1 x^2 \\, dx =')
      await page.waitForSelector('.cm-calc-result', { timeout: 5000 })
      await page.waitForTimeout(1000)
      await page.keyboard.press('Tab')
      await page.keyboard.press('End')
      await page.keyboard.press('Enter')
      await page.keyboard.press('Enter')
      await type(page, '$f(x) = x^2 - 2x')
      await page.waitForTimeout(400)
      await clickOn(page, '.editor-toolbar button[aria-label^="Grafico"]')
      await page.waitForSelector('.preview-pane .graph-block svg', { timeout: 5000 }).catch(() => {})
    },
  },
  // Le viste e la barra laterale.
  barra: {
    settings: { view: 'split', notesOpen: false },
    async setup(page) {
      await startNote(page, '# Appunti di Analisi\n\nLa parabola $y = x^2$ è rivolta verso l\'alto: il **vertice** è nell\'origine.\n\n$$\\int_0^1 x^2 \\, dx = \\frac{1}{3}$$\n')
      await page.mouse.move(480, 300)
    },
    async play(page) {
      await clickOn(page, '.view-button[aria-label="Anteprima"]')
      await page.waitForTimeout(900)
      await clickOn(page, '.view-button[aria-label="Editor"]')
      await page.waitForTimeout(900)
      await clickOn(page, '.view-button[aria-label="Diviso"]')
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
      const context = await browser.newContext({ viewport: SIZE, colorScheme: scheme, recordVideo: { dir, size: SIZE } })
      const started = Date.now()
      await context.addInitScript(fakeCursor)
      await context.addInitScript((settings) => {
        localStorage.setItem('glifo.tutorial.v1', 'visto')
        localStorage.setItem(
          'glifo.settings.v1',
          JSON.stringify({ theme: 'auto', fontSize: 17, spellcheck: false, notesOpen: false, symbolsOpen: false, ...settings }),
        )
      }, scene.settings)
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
