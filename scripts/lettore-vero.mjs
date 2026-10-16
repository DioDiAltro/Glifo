/**
 * «In LaTeX» con il lettore vero (pix2text-mfr con onnxruntime-web), nel browser, sulla build in dist/
 * (esegui prima `npm run build`):
 *   CHROMIUM_PATH=/opt/pw-browsers/chromium MODELLO=cartella node scripts/lettore-vero.mjs
 *
 * Le prove di sempre (scripts/smoke-test.mjs) usano un lettore finto; questa scrive due formule sulla lavagna
 * con la penna (una scrittura a mano finta, fatta di archi e linee: ∫₀¹ x² dx = 1/3 e x + 1 = 2), le prende con
 * la Selezione, preme «In LaTeX» e «Scarica il lettore» e scrive quello che legge, con i segni del motore.
 * MODELLO è la cartella con i file del modello (`python3 -I scripts/prova-lettori.py scarica CARTELLA`), serviti
 * in locale al posto di Hugging Face (nelle sessioni il browser non arriva a huggingface.co); senza, li scarica
 * davvero. FOTO=cartella per le foto della lavagna con il menu e della finestra; TEMA=scuro per il tema scuro.
 */
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { chromium } from 'playwright-core'
import { preview } from 'vite'

const folder = process.env.MODELLO
const photos = process.env.FOTO
const dark = process.env.TEMA === 'scuro'
const server = await preview({ preview: { port: 4177, strictPort: true }, logLevel: 'error' })
const url = server.resolvedUrls.local[0]
// I file del modello da un server a parte: passano per un rinvio, perché Playwright non dà risposte oltre 100 MB.
const files = folder
  ? http
      .createServer((req, res) => {
        const file = path.join(folder, path.basename(new URL(req.url, 'http://x').pathname))
        if (!fs.existsSync(file)) return res.writeHead(404).end()
        res.writeHead(200, { 'content-type': 'application/octet-stream', 'content-length': fs.statSync(file).size, 'access-control-allow-origin': '*' })
        fs.createReadStream(file).pipe(res)
      })
      .listen(4178)
  : null
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
let ok = false

/** Una scrittura a mano finta: archi e linee, come li farebbe una penna. Ogni glifo dà i suoi tratti. */
const line = (x0, y0, x1, y1, n = 8) => Array.from({ length: n + 1 }, (_, i) => [x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n])
const arc = (cx, cy, rx, ry, from, to, n = 18) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const a = ((from + ((to - from) * i) / n) * Math.PI) / 180
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]
  })
const curve = (p0, p1, p2, p3, n = 24) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n
    const u = 1 - t
    return [0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k])
  })
const GLYPHS = {
  integral: (x, y, s) => [curve([x + s * 0.2, y + s * 0.04], [x - s * 0.04, y - s * 0.08], [x + s * 0.22, y + s * 1.08], [x, y + s * 0.96])],
  x: (x, y, s) => [line(x, y, x + s * 0.75, y + s), line(x + s * 0.75, y, x, y + s)],
  d: (x, y, s) => [arc(x + s * 0.3, y + s * 0.72, s * 0.3, s * 0.28, 0, 360), line(x + s * 0.6, y, x + s * 0.6, y + s)],
  1: (x, y, s) => [[...line(x, y + s * 0.25, x + s * 0.3, y, 3), ...line(x + s * 0.3, y, x + s * 0.3, y + s)]],
  2: (x, y, s) => [[...arc(x + s * 0.32, y + s * 0.3, s * 0.32, s * 0.3, 200, 380), ...line(x + s * 0.62, y + s * 0.42, x, y + s), ...line(x, y + s, x + s * 0.7, y + s, 4)]],
  3: (x, y, s) => [[...arc(x + s * 0.3, y + s * 0.25, s * 0.3, s * 0.24, 200, 450), ...arc(x + s * 0.3, y + s * 0.72, s * 0.34, s * 0.27, 270, 520)]],
  0: (x, y, s) => [arc(x + s * 0.3, y + s * 0.5, s * 0.3, s * 0.5, 0, 360, 24)],
  '+': (x, y, s) => [line(x + s * 0.4, y + s * 0.1, x + s * 0.4, y + s * 0.9), line(x, y + s * 0.5, x + s * 0.8, y + s * 0.5)],
  '=': (x, y, s) => [line(x, y + s * 0.38, x + s * 0.8, y + s * 0.38), line(x, y + s * 0.66, x + s * 0.8, y + s * 0.66)],
  bar: (x, y, s) => [line(x, y, x + s, y)],
}
/** Le due formule: ogni pezzo è [glifo, x, y, altezza] sulla lavagna. */
const WRITING = [
  ['integral', 100, 90, 110], [1, 128, 82, 20], [0, 112, 196, 20], ['x', 142, 135, 30], [2, 170, 118, 18], ['d', 198, 118, 47], ['x', 238, 135, 30],
  ['=', 280, 127, 34], [1, 326, 98, 30], ['bar', 312, 146, 36], [3, 320, 154, 32],
  ['x', 100, 330, 30], ['+', 145, 330, 30], [1, 190, 330, 30], ['=', 230, 328, 34], [2, 275, 330, 30],
]

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: 'block', locale: 'it-IT', colorScheme: dark ? 'dark' : 'light' })
  await context.addInitScript(() => localStorage.setItem('glifo.tutorial.v1', 'visto'))
  if (folder) {
    await context.route('https://huggingface.co/**', (route) =>
      route.fulfill({ status: 302, headers: { location: `http://localhost:4178/${route.request().url().split('/').pop()}`, 'access-control-allow-origin': '*' } }),
    )
  }
  const page = await context.newPage()
  page.on('pageerror', (e) => console.log('Errore nella pagina:', e.message))
  await page.goto(url)
  await page.waitForSelector('.cm-editor')
  await page.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await page.keyboard.type('Lettore della lavagna')
  await page.keyboard.press('Enter')
  await page.locator('.view-button[aria-label="Lavagna"]').click()
  await page.waitForSelector('.board-pane[data-loaded="true"]')
  const cdp = await context.newCDPSession(page)
  const stage = await page.locator('.board-stage').boundingBox()
  const stroke = async (points) => {
    const send = (type, [x, y], pressed = true) =>
      cdp.send('Input.dispatchMouseEvent', { type, x: stage.x + x, y: stage.y + y, button: 'left', buttons: pressed ? 1 : 0, clickCount: 1, pointerType: 'pen', force: 0.5 })
    await send('mousePressed', points[0])
    for (const q of points.slice(1)) await send('mouseMoved', q)
    await send('mouseReleased', points.at(-1), false)
  }
  for (const [glyph, x, y, s] of WRITING) for (const points of GLYPHS[glyph](x, y, s)) await stroke(points)
  await page.locator('.board-button[aria-label="Selezione"]').click()
  // Il laccio: un giro intorno alle due formule (la lavagna accanto al testo è larga circa 400).
  const corners = [[70, 60], [390, 60], [390, 395], [70, 395], [70, 62]]
  await stroke(corners.slice(1).flatMap((q, i) => line(...corners[i], ...q, 10)))
  await page.waitForSelector('.board-sel-item.is-latex')
  if (photos) await page.screenshot({ path: path.join(photos, `lavagna-menu${dark ? '-scuro' : ''}.png`) })
  const started = Date.now()
  await page.locator('.board-sel-item.is-latex').click()
  await page.locator('.dialog-latex button', { hasText: 'Scarica il lettore' }).click()
  await page.waitForFunction(() => [...document.querySelectorAll('.dialog-latex .latex-code')].every((c) => !c.disabled), null, { timeout: 15 * 60_000 })
  const lines = await page.$$eval('.dialog-latex .latex-line', (items) =>
    items.map((li) => ({ tex: li.querySelector('textarea').value, check: li.querySelector('.calc-check')?.getAttribute('title') ?? '', note: li.querySelector('.latex-note').textContent })),
  )
  console.log(`Letto in ${Math.round((Date.now() - started) / 1000)} s, scaricamento compreso:`)
  for (const l of lines) console.log(`  ${l.tex}   ${l.check}   (${l.note})`)
  if (photos) await page.screenshot({ path: path.join(photos, `in-latex${dark ? '-scuro' : ''}.png`) })
  await page.locator('.dialog-latex button', { hasText: 'Inserisci nella nota' }).click()
  const doc = await page.evaluate(() => document.querySelector('.cm-content').innerText)
  console.log('Nella nota:\n' + doc)
  ok = lines.length === 2 && lines.every((l) => l.tex) && lines.every((l) => doc.includes(l.tex.split('=')[0].slice(0, 6)))
} catch (err) {
  console.error(err)
} finally {
  await browser.close()
  await server.close()
  files?.close()
}
process.exit(ok ? 0 : 1)
