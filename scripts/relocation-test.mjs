/**
 * Prova il trasloco su glifo.page (src/relocation.ts) in un browser vero, con i due indirizzi veri:
 * diodialtro.github.io/Glifo/ e glifo.page, serviti tutti e due dalla build fatta qui.
 *   node scripts/relocation-test.mjs
 *
 * Costruisce Glifo in una cartella a parte, con le date del trasloco accese (VITE_TRASLOCO_AVVISO e
 * VITE_TRASLOCO), e sposta l'orologio del browser nei giorni dell'avviso e dopo il trasloco. Il
 * Supabase vero non si tocca. Serve Chromium: indica il percorso con CHROMIUM_PATH. Con FOTO=cartella
 * salva lì le foto dell'avviso, della pagina finale e del messaggio sul sito nuovo.
 */
import { chromium } from 'playwright-core'
import { build } from 'vite'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { extname, join } from 'node:path'

const OLD = 'https://diodialtro.github.io'
const NEW = 'https://glifo.page'
const ID_A = '0b6f2a52-3c1d-4e0f-9a7b-1c2d3e4f5a6b'
const ID_B = '1c7a3b63-4d2e-4f1a-8b8c-2d3e4f5a6b7c'
const ID_ACCOUNT = '2d8b4c74-5e3f-4a2b-9c9d-3e4f5a6b7c8d'
const USER = '7f3e2d1c-0b9a-4876-9543-210fedcba987'
const NOTICE_DAY = new Date('2026-10-12T10:00:00')
const AFTER_MOVE = new Date('2026-10-19T10:00:00')

const out = mkdtempSync(join(tmpdir(), 'glifo-trasloco-'))
process.env.VITE_TRASLOCO_AVVISO = '2026-10-12'
process.env.VITE_TRASLOCO = '2026-10-18'
await build({ logLevel: 'error', build: { outDir: out, emptyOutDir: true } })
const photos = process.env.FOTO
if (photos) mkdirSync(photos, { recursive: true })

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.wasm': 'application/wasm',
  '.woff2': 'font/woff2',
  '.webm': 'video/webm',
  '.aff': 'text/plain; charset=utf-8',
  '.dic': 'text/plain; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
}

/** La build di qui, servita sotto `prefix`: come GitHub Pages (/Glifo/) o Cloudflare Pages (/). */
function serve(prefix) {
  return async (route) => {
    let path = decodeURIComponent(new URL(route.request().url()).pathname)
    if (!path.startsWith(prefix)) return route.fulfill({ status: 404, body: 'non trovato' })
    path = path.slice(prefix.length)
    if (!path || path.endsWith('/')) path += 'index.html'
    const file = join(out, path)
    if (!existsSync(file) || statSync(file).isDirectory()) return route.fulfill({ status: 404, body: 'non trovato' })
    return route.fulfill({ status: 200, body: readFileSync(file), contentType: TYPES[extname(file)] ?? 'application/octet-stream' })
  }
}

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
let failures = 0
const check = (ok, msg) => {
  console.log(`${ok ? '✓' : '✗'} ${msg}`)
  if (!ok) failures++
}

/** Un browser con i due indirizzi, senza service worker (le pagine finte passano da `route`). */
async function newBrowser(viewport = { width: 1280, height: 800 }) {
  const context = await browser.newContext({ serviceWorkers: 'block', viewport, acceptDownloads: true })
  await context.route(`${OLD}/**`, serve('/Glifo/'))
  await context.route(`${NEW}/**`, serve('/'))
  // Il Supabase vero non si chiama mai.
  await context.route('https://*.supabase.co/**', (route) => route.abort())
  return context
}

/**
 * Gli appunti del vecchio sito, prima che Glifo parta: due note fuori dall'account (una in una
 * cartella), la nota di un account, il dizionario, le impostazioni con una chiave dell'AI e l'accesso
 * salvato, che non devono viaggiare.
 */
function seedOldSite({ OLD, ID_A, ID_B, ID_ACCOUNT, USER }) {
  if (location.origin !== OLD || localStorage.getItem('prova.seminato')) return
  localStorage.setItem('prova.seminato', '1')
  const day = (d) => Date.UTC(2026, 9, d, 9, 30)
  const meta = (id, title, folderId, updatedAt) => ({ id, title, createdAt: day(1), updatedAt, folderId })
  localStorage.setItem('glifo.folders.v1', JSON.stringify([{ id: 'f1', name: 'Analisi', createdAt: 1000, updatedAt: 1000 }]))
  localStorage.setItem('glifo.notes.v1', JSON.stringify([meta(ID_A, 'Limiti', 'f1', day(8)), meta(ID_B, 'Derivate', null, day(6))]))
  localStorage.setItem(`glifo.note.v1.${ID_A}`, '# Limiti\n\nIl limite notevole $\\lim_{x\\to 0} \\frac{\\sin x}{x} = 1$.')
  localStorage.setItem(`glifo.note.v1.${ID_B}`, '# Derivate\n\nLa derivata di $x^2$ è $2x$.')
  localStorage.setItem(`glifo.active.v1`, ID_A)
  localStorage.setItem(`glifo.u.${USER}.notes.v1`, JSON.stringify([{ ...meta(ID_ACCOUNT, 'Integrali', null, day(7)), rev: 3 }]))
  localStorage.setItem(`glifo.u.${USER}.note.v1.${ID_ACCOUNT}`, '# Integrali')
  localStorage.setItem('glifo.auth.v1', '{"access_token":"segreto-di-accesso"}')
  localStorage.setItem('glifo.dictionary.v1', JSON.stringify(['Weierstrass']))
  localStorage.setItem('glifo.settings.v1', JSON.stringify({ fontSize: 18, apiKey: 'chiave-segreta' }))
  localStorage.setItem('glifo.tutorial.v1', 'visto')
}

/** I tratti di una lavagna, scritti nel database delle lavagne come fa src/board/store.ts. */
async function drawOn(page, notes) {
  await page.evaluate(
    (notes) =>
      new Promise((resolve, reject) => {
        const open = indexedDB.open('glifo-lavagne', 1)
        open.onupgradeneeded = () => {
          const db = open.result
          if (!db.objectStoreNames.contains('strokes')) db.createObjectStore('strokes', { keyPath: ['note', 'id'] })
          if (!db.objectStoreNames.contains('views')) db.createObjectStore('views', { keyPath: 'note' })
        }
        open.onerror = () => reject(open.error)
        open.onsuccess = () => {
          const tx = open.result.transaction('strokes', 'readwrite')
          for (const [note, count] of notes) {
            for (let i = 0; i < count; i++) {
              tx.objectStore('strokes').put({ note, id: `${note}-${i}`, t: 1000 + i, color: 'ink', size: 3, pen: true, points: [10, 20 + i * 10, 0.5, 200, 20 + i * 10, 0.5] })
            }
          }
          tx.oncomplete = () => resolve(undefined)
          tx.onerror = () => reject(tx.error)
        }
      }),
    notes,
  )
}

/** Quanti tratti ha la lavagna di ogni nota. */
async function strokesOf(page, notes) {
  return page.evaluate(
    (notes) =>
      new Promise((resolve) => {
        const open = indexedDB.open('glifo-lavagne', 1)
        open.onsuccess = async () => {
          const db = open.result
          if (!db.objectStoreNames.contains('strokes')) return resolve(notes.map(() => 0))
          const counts = await Promise.all(
            notes.map(
              (note) =>
                new Promise((done) => {
                  const req = db.transaction('strokes').objectStore('strokes').count(IDBKeyRange.bound([note, ''], [note, '￿']))
                  req.onsuccess = () => done(req.result)
                }),
            ),
          )
          resolve(counts)
        }
      }),
    notes,
  )
}

const ids = { OLD, ID_A, ID_B, ID_ACCOUNT, USER }

// ——— Il giorno dell'avviso: la fascia, e gli appunti portati su glifo.page ———
{
  const context = await newBrowser()
  await context.clock.setFixedTime(NOTICE_DAY)
  await context.addInitScript(seedOldSite, ids)
  const old = await context.newPage()
  await old.goto(`${OLD}/Glifo/`)
  const banner = old.locator('.relocation-banner')
  await banner.waitFor()
  const text = await banner.textContent()
  check(text.includes('Glifo si sposta su glifo.page') && text.includes('domenica 18 ottobre'), 'il vecchio sito, dal giorno dell\'avviso, ha la fascia con la data')
  await drawOn(old, [[ID_A, 3], [ID_ACCOUNT, 2]])
  const box = await old.locator('.workspace').boundingBox()
  const bannerBox = await banner.boundingBox()
  check(box && bannerBox && Math.abs(box.y - (bannerBox.y + bannerBox.height)) < 2 && Math.abs(box.y + box.height - 800) < 2, 'la fascia sta sopra Glifo, che usa il resto della pagina')
  if (photos) await old.screenshot({ path: join(photos, 'trasloco-avviso.png') })

  const [popup] = await Promise.all([context.waitForEvent('page'), old.locator('.relocation-transfer').click()])
  await popup.locator('dialog[open]', { hasText: 'Benvenuto nel nuovo Glifo' }).waitFor({ timeout: 20000 })
  check(popup.url() === `${NEW}/`, 'glifo.page si apre in un\'altra finestra e toglie #trasloco dall\'indirizzo')
  const welcome = await popup.locator('dialog[open]').textContent()
  check(welcome.includes('Dal vecchio Glifo sono arrivati 3 appunti e 2 lavagne'), `glifo.page dice cosa è arrivato («${welcome.slice(0, 160)}…»)`)
  await old.locator('.toast', { hasText: 'Fatto: i tuoi appunti sono su glifo.page' }).waitFor({ timeout: 5000 }).then(
    () => check(true, 'il vecchio sito dice che gli appunti sono arrivati'),
    () => check(false, 'il vecchio sito dice che gli appunti sono arrivati'),
  )
  if (photos) await popup.screenshot({ path: join(photos, 'trasloco-arrivati.png') })
  const stored = await popup.evaluate(
    ({ ID_A, ID_B, ID_ACCOUNT, USER }) => ({
      a: localStorage.getItem(`glifo.note.v1.${ID_A}`),
      b: localStorage.getItem(`glifo.note.v1.${ID_B}`),
      account: localStorage.getItem(`glifo.u.${USER}.note.v1.${ID_ACCOUNT}`),
      auth: localStorage.getItem('glifo.auth.v1'),
      settings: JSON.parse(localStorage.getItem('glifo.settings.v1') ?? '{}'),
      words: JSON.parse(localStorage.getItem('glifo.dictionary.v1') ?? '[]'),
      tutorial: localStorage.getItem('glifo.tutorial.v1'),
    }),
    ids,
  )
  check(stored.a?.startsWith('# Limiti') && stored.b?.startsWith('# Derivate'), 'su glifo.page ci sono gli appunti, con i loro id')
  check(stored.account === '# Integrali', 'su glifo.page c\'è anche l\'account, pronto per quando si entra')
  check(stored.auth === null, 'l\'accesso salvato non viaggia: su glifo.page si entra di nuovo')
  check(stored.settings.fontSize === 18 && !stored.settings.apiKey, 'arrivano le impostazioni, ma non la chiave dell\'AI')
  check(stored.words.includes('Weierstrass') && stored.tutorial !== null, 'arrivano il dizionario e il tutorial già visto')
  check(JSON.stringify(await strokesOf(popup, [ID_A, ID_ACCOUNT])) === '[3,2]', 'arrivano le lavagne, anche quella della nota dell\'account')
  await popup.locator('dialog[open] button', { hasText: 'Va bene' }).click()
  const titles = await popup.locator('.notes-panel').textContent()
  check(titles.includes('Limiti') && titles.includes('Derivate'), 'gli appunti si vedono nell\'elenco di glifo.page')
  check(!titles.includes('Benvenuto in Glifo'), 'la nota di benvenuto del sito nuovo, mai toccata, se ne va')
  const open = await popup.locator('.cm-content').textContent()
  check(open.includes('Limiti'), 'si apre l\'appunto che era aperto sul vecchio sito')

  // Portarli una seconda volta non raddoppia niente.
  const [again] = await Promise.all([context.waitForEvent('page'), old.locator('.relocation-transfer').click()])
  await again.locator('dialog[open]', { hasText: 'Benvenuto nel nuovo Glifo' }).waitFor({ timeout: 20000 })
  const second = await again.locator('dialog[open]').textContent()
  check(second.includes('c\'erano già tutti'), `la seconda volta non raddoppia niente («${second.slice(0, 120)}…»)`)
  check(JSON.stringify(await strokesOf(again, [ID_A, ID_ACCOUNT])) === '[3,2]', 'la seconda volta le lavagne restano com\'erano')

  // La fascia si chiude con ×, e Glifo torna a tutta pagina.
  await old.locator('.relocation-banner-close').click()
  const full = await old.locator('.workspace').boundingBox()
  check((await old.locator('.relocation-banner').count()) === 0 && full && full.y === 0 && Math.abs(full.height - 800) < 2, 'chiusa la fascia, Glifo usa tutta la pagina')
  await context.close()
}

// ——— Sul telefono: la fascia va a capo ———
{
  const context = await newBrowser({ width: 390, height: 844 })
  await context.clock.setFixedTime(NOTICE_DAY)
  await context.addInitScript(seedOldSite, ids)
  const old = await context.newPage()
  await old.goto(`${OLD}/Glifo/`)
  await old.locator('.relocation-banner').waitFor()
  const width = await old.evaluate(() => document.documentElement.scrollWidth)
  check(width <= 390, `sul telefono la fascia non allarga la pagina (${width}px)`)
  if (photos) await old.screenshot({ path: join(photos, 'trasloco-avviso-telefono.png') })
  await context.close()
}

// ——— Dopo il trasloco: la pagina a tutto schermo, il backup e i link condivisi ———
{
  const context = await newBrowser()
  await context.clock.setFixedTime(AFTER_MOVE)
  await context.addInitScript(seedOldSite, ids)
  const old = await context.newPage()
  await old.goto(`${OLD}/Glifo/`)
  const page = old.locator('dialog.relocation-page[open]')
  await page.waitFor()
  const text = await page.textContent()
  check(text.includes('Glifo ora è su glifo.page') && text.includes('domenica 18 ottobre'), 'dopo il trasloco il vecchio sito mostra solo la pagina del trasloco')
  check((await old.locator('.relocation-banner').count()) === 0, 'dopo il trasloco niente fascia')
  await old.keyboard.press('Escape')
  check(await page.isVisible(), 'la pagina del trasloco non si chiude con Esc')
  if (photos) await old.screenshot({ path: join(photos, 'trasloco-pagina-finale.png') })
  const [download] = await Promise.all([old.waitForEvent('download'), page.locator('button', { hasText: 'Scarica il backup' }).click()])
  const file = await download.path()
  const pkg = JSON.parse(readFileSync(file, 'utf8'))
  check(download.suggestedFilename().startsWith('glifo-trasloco-') && pkg.app === 'glifo-trasloco' && pkg.notes.length === 2, 'il backup del trasloco si scarica, con gli appunti')
  check(!JSON.stringify(pkg).includes('segreto-di-accesso') && !JSON.stringify(pkg).includes('chiave-segreta'), 'nel backup non ci sono l\'accesso né la chiave dell\'AI')

  // Il file si apre su glifo.page con «Ripristina backup», in un altro browser.
  const other = await newBrowser()
  await other.addInitScript(() => localStorage.setItem('glifo.tutorial.v1', 'visto'))
  const fresh = await other.newPage()
  await fresh.goto(`${NEW}/`)
  await fresh.locator('.side-profile button[aria-label="Impostazioni"]').click()
  const [chooser] = await Promise.all([fresh.waitForEvent('filechooser'), fresh.locator('dialog button', { hasText: 'Ripristina backup' }).click()])
  await chooser.setFiles(file)
  await fresh.locator('dialog[open]', { hasText: 'Benvenuto nel nuovo Glifo' }).waitFor({ timeout: 20000 })
  const restored = await fresh.locator('dialog[open]').textContent()
  check(restored.includes('Dal vecchio Glifo sono arrivati 3 appunti'), `«Ripristina backup» su glifo.page apre il file del trasloco («${restored.slice(0, 120)}…»)`)
  await other.close()

  // Un link condiviso del vecchio indirizzo porta alla stessa nota su glifo.page.
  await old.goto(`${OLD}/Glifo/nota.html#AbCdEfGhIjKlMnOpQrStUv`)
  await old.waitForURL(`${NEW}/nota.html#AbCdEfGhIjKlMnOpQrStUv`, { timeout: 10000 }).then(
    () => check(true, 'dopo il trasloco i link condivisi vanno su glifo.page'),
    () => check(false, `dopo il trasloco i link condivisi vanno su glifo.page (è ${old.url()})`),
  )
  await context.close()
}

// ——— Prima del giorno dell'avviso, e sul sito nuovo, niente di tutto questo ———
{
  const context = await newBrowser()
  await context.clock.setFixedTime(new Date('2026-10-11T10:00:00'))
  await context.addInitScript(() => localStorage.setItem('glifo.tutorial.v1', 'visto'))
  const old = await context.newPage()
  await old.goto(`${OLD}/Glifo/`)
  await old.locator('.workspace').waitFor()
  check((await old.locator('.relocation-banner, dialog.relocation-page').count()) === 0, 'prima del giorno dell\'avviso il vecchio sito è come sempre')
  await context.clock.setFixedTime(AFTER_MOVE)
  const fresh = await context.newPage()
  await fresh.goto(`${NEW}/`)
  await fresh.locator('.workspace').waitFor()
  check((await fresh.locator('.relocation-banner, dialog.relocation-page').count()) === 0, 'glifo.page non ha né la fascia né la pagina del trasloco')
  await context.close()
}

await browser.close()
if (failures) {
  console.log(`\n${failures} controlli non riusciti`)
  process.exit(1)
}
console.log('\nTrasloco: tutto a posto')
