/**
 * Prova il flusso principale in un browser vero:
 *   npm run build && npm run test:e2e
 *
 * Serve Chromium: `npx playwright-core install chromium`, oppure indica un
 * Chromium già installato con la variabile CHROMIUM_PATH.
 */
import { chromium } from 'playwright-core'
import { preview } from 'vite'
import MarkdownIt from 'markdown-it'
import { readFileSync } from 'node:fs'
import { strFromU8, unzipSync } from 'fflate'

const server = await preview({ preview: { port: 4174, strictPort: true }, logLevel: 'error' })
const url = server.resolvedUrls.local[0]
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
// Il tutorial della prima apertura ha la sua prova (con `firstVisit`): nelle altre pagine è già
// visto. Anche browser.newPage passa da browser.newContext.
const tutorialSeen = () => {
  try {
    localStorage.setItem('glifo.tutorial.v1', 'visto')
  } catch {}
}
const plainContext = browser.newContext.bind(browser)
browser.newContext = async (options) => {
  const context = await plainContext(options)
  await context.addInitScript(tutorialSeen)
  return context
}
/** Una pagina come alla prima apertura di Glifo, con il tutorial. */
const firstVisit = async (options) => (await plainContext(options)).newPage()
/** Il tema si cambia nelle impostazioni (in fondo alla barra laterale). */
async function chooseTheme(page, label) {
  await page.locator('.side-profile button[aria-label="Impostazioni"]').click()
  await page.locator('dialog .segmented label', { hasText: label }).click()
  await page.keyboard.press('Escape')
}
let failures = 0
const check = (ok, msg) => {
  console.log(`${ok ? '✓' : '✗'} ${msg}`)
  if (!ok) failures++
}

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(url)
  await page.waitForSelector('.cm-editor')

  // Nuova nota vuota su cui lavorare
  await page.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await page.keyboard.type('Prova\n\n')
  // L'ultima riga che contiene una formula
  const line = () => page.locator('.cm-line', { hasText: '$' }).last()

  // \su → suggerimenti con anteprima → clic su \sum_{}^{}
  await page.keyboard.type('$\\su')
  await page.waitForSelector('.sug-list')
  check((await page.locator('.sug-title').first().innerText()).toLowerCase().includes('sommatoria'), 'i suggerimenti propongono la sommatoria')
  await page
    .locator('.sug-list .sym-card', { has: page.locator('code.sym-code', { hasText: /^\\sum_\{\}\^\{\}$/ }) })
    .first()
    .click()
  await page.keyboard.type('n=0')
  await page.keyboard.press('Tab')
  await page.keyboard.type('\\infty')
  await page.keyboard.press('Tab')
  await page.keyboard.type(' a_n')
  check((await line().innerText()) === '$\\sum_{n=0}^{\\infty} a_n$', 'segnaposto e Tab compongono la formula')
  check((await page.locator('.formula-render .katex').count()) > 0, 'l\'anteprima della formula è disegnata')

  // Parola italiana dopo la barra
  await page.keyboard.press('End')
  await page.keyboard.type('\n\n$\\radice')
  await page.waitForSelector('.sug-list')
  await page.keyboard.press('Tab')
  await page.keyboard.type('2')
  check((await line().innerText()) === '$\\sqrt{2}$', '\\radice + Tab inserisce \\sqrt{}')

  // Ricerca a parole
  await page.keyboard.press('Control+k')
  await page.keyboard.type("come faccio il simbolo dell'infinito")
  await page.waitForSelector('.answer-card')
  check((await page.locator('.answer-card code').first().innerText()) === '\\infty', 'la ricerca risponde \\infty')

  // Anteprima Markdown
  await page.waitForTimeout(300)
  check((await page.locator('.markdown-body .katex').count()) >= 2, 'l\'anteprima Markdown disegna le formule')

  // Controllo ortografico: solo la parola sbagliata, non formule, codice e cognomi
  await page.keyboard.press('Escape')
  await page.locator('.cm-content').click()
  await page.keyboard.press('Control+End')
  await page.keyboard.insertText('\n\nIl teorema di Cauchy vale perchè $x_{sbagliato}$ e `codicex` ')
  await page.waitForSelector('.cm-misspelled', { timeout: 10000 })
  const misspelled = () => page.locator('.cm-misspelled').allInnerTexts()
  check(JSON.stringify(await misspelled()) === '["perchè"]', `sottolinea solo «perchè» (${await misspelled()})`)
  await page.locator('.cm-misspelled').first().click()
  await page.waitForSelector('.spell-suggestion')
  check((await page.locator('.spell-suggestion').first().innerText()) === 'perché', 'propone «perché»')
  await page.locator('.spell-suggestion').first().click()
  await page.waitForTimeout(200)
  check((await page.locator('.cm-line', { hasText: 'Cauchy' }).innerText()).includes('vale perché $'), 'la correzione sostituisce la parola')
  check((await misspelled()).length === 0, 'dopo la correzione non resta niente di sottolineato')

  // Parola nuova aggiunta al dizionario personale
  await page.keyboard.press('Control+End')
  await page.keyboard.insertText('Sgrunfio ')
  await page.waitForSelector('.cm-misspelled', { timeout: 10000 })
  await page.locator('.cm-misspelled', { hasText: 'Sgrunfio' }).click()
  await page.locator('.spell-add').click()
  await page.waitForFunction(() => !document.querySelector('.cm-misspelled'), null, { timeout: 5000 })
  const personal = await page.evaluate(() => localStorage.getItem('glifo.dictionary.v1'))
  check(personal === '["Sgrunfio"]', '«Aggiungi al dizionario» salva la parola e toglie la sottolineatura')

  // Da tastiera: Ctrl+. apre le correzioni della parola sotto il cursore
  await page.keyboard.press('Control+End')
  await page.keyboard.insertText('piu ')
  await page.waitForSelector('.cm-misspelled', { timeout: 10000 })
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('Control+.')
  await page.waitForSelector('.spell-suggestion:focus', { timeout: 5000 })
  await page.keyboard.press('Enter')
  await page.waitForTimeout(200)
  const fixed = await page.locator('.cm-line', { hasText: 'Sgrunfio' }).innerText()
  check(fixed.endsWith('Sgrunfio più '), `Ctrl+. e Invio correggono «piu» in «più» (${JSON.stringify(fixed.slice(-16))})`)

  // Dalle impostazioni si spegne e si riaccende; con «Solo italiano» l'inglese è segnato
  await page.keyboard.press('Control+End')
  await page.keyboard.insertText('however ')
  await page.waitForTimeout(500)
  check((await misspelled()).length === 0, 'con italiano e inglese «however» va bene')
  await page.locator('button[aria-label="Impostazioni"]').click()
  const settingsDialog = page.locator('dialog.dialog-settings')
  await settingsDialog.locator('select').filter({ has: page.locator('option[value="it+en"]') }).selectOption('it')
  await page.waitForSelector('.cm-misspelled', { timeout: 10000 })
  check(JSON.stringify(await misspelled()) === '["however"]', `con «Solo italiano» «however» è sottolineato (${await misspelled()})`)
  await settingsDialog.getByText('Sottolinea in rosso').click()
  await page.waitForTimeout(300)
  check((await misspelled()).length === 0, 'spegnendo il controllo le sottolineature spariscono')
  await settingsDialog.getByText('Sottolinea in rosso').click()
  await page.waitForSelector('.cm-misspelled', { timeout: 10000 })
  check((await misspelled()).length === 1, 'riaccendendolo tornano')
  await settingsDialog.locator('select').filter({ has: page.locator('option[value="it+en"]') }).selectOption('it+en')
  await settingsDialog.locator('.dialog-head .icon-button').click()

  // Elenchi di ogni tipo, uno dentro l'altro, scritti con Invio, Tab, Maiusc+Tab e Backspace
  await page.locator('.cm-content').click()
  await page.keyboard.press('Control+End')
  await page.keyboard.press('Enter')
  await page.keyboard.press('Enter')
  const keys = async (...steps) => {
    for (const s of steps) await (s.startsWith('⌨') ? page.keyboard.press(s.slice(1)) : page.keyboard.type(s))
  }
  await keys('1) qualcosa', '⌨Enter', '⌨Tab', '⌨Backspace', 'es) questo', '⌨Enter', '⌨Tab', '⌨Backspace', 'i) di questo')
  await keys('⌨Enter', '⌨Shift+Tab', '⌨Backspace', '- questo però', '⌨Enter', '⌨Tab', 'dettaglio')
  await keys('⌨Enter', '⌨Enter', '⌨Enter', 'secondo punto')
  const written = await page.evaluate(() => {
    const lines = [...document.querySelectorAll('.cm-line')].map((l) => l.textContent)
    return lines.slice(lines.indexOf('1) qualcosa')).join('\n')
  })
  check(
    written === ['1) qualcosa', '   es) questo', '       i) di questo', '   - questo però', '     - dettaglio', '2) secondo punto'].join('\n'),
    `Invio, Tab e Maiusc+Tab compongono l'elenco annidato (${JSON.stringify(written)})`,
  )
  await page.waitForTimeout(400)
  const outline = await page.evaluate(() => {
    const top = [...document.querySelectorAll('.markdown-body ol.ol-decimal-paren')].find((ol) => ol.textContent.includes('qualcosa'))
    if (!top) return null
    return {
      items: top.children.length,
      label: top.querySelector('ul.ul-labels > li')?.getAttribute('style'),
      roman: !!top.querySelector('ul.ul-labels ol.ol-lower-roman-paren'),
      dashes: !!top.querySelector('ul.ul-dash ul.ul-dash'),
    }
  })
  check(
    outline?.items === 2 && outline.label?.includes('es)') && outline.roman && outline.dashes,
    `l'anteprima disegna l'elenco annidato con 1), es), i) e i trattini (${JSON.stringify(outline)})`,
  )

  // Eliminazione della nota, con conferma dentro la pagina
  await page.keyboard.press('Escape')
  const before = await page.locator('.note-item').count()
  await page.locator('.note-item', { hasText: 'Prova' }).hover()
  await page.locator('.note-item', { hasText: 'Prova' }).locator('.note-delete').click()
  await page.locator('dialog.dialog-confirm .btn-danger').click()
  await page.waitForTimeout(200)
  check((await page.locator('.note-item').count()) === before - 1, 'la nota viene eliminata dopo la conferma')

  // Cartelle: si crea, ci si sposta una nota, le note nuove ci finiscono dentro, si rinomina, si elimina
  const newFolder = async (tab, name) => {
    await tab.locator('.notes-head button[aria-label="Nuova cartella"]').click()
    await tab.locator('dialog.dialog-prompt input').fill(name)
    await tab.keyboard.press('Enter')
  }
  const folderNamed = (tab, name) => tab.locator('.folder', { has: tab.locator('.folder-name', { hasText: new RegExp(`^${name}$`) }) })
  const menuItem = (tab, label) => tab.locator('.tool-menu .tool-menu-item', { hasText: label })
  await newFolder(page, 'Analisi 1')
  const analisi = folderNamed(page, 'Analisi 1')
  const loose = page.locator('.notes-list > .note-item').first()
  const looseTitle = await loose.locator('.note-title').innerText()
  await loose.hover()
  await loose.locator('.note-move').click()
  await menuItem(page, 'Analisi 1').click()
  check((await analisi.locator('.note-title').allInnerTexts()).join() === looseTitle, `«Sposta in una cartella» mette la nota nella cartella (${looseTitle})`)
  await analisi.locator('.note-open').first().click()
  await page.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await page.keyboard.type('Nella cartella')
  await page.waitForTimeout(700)
  check((await analisi.locator('.note-title').allInnerTexts()).includes('Nella cartella'), 'la nota nuova va nella cartella della nota aperta')
  await newFolder(page, 'analisi 1')
  check(await page.locator('dialog.dialog-prompt .prompt-error').isVisible(), 'due cartelle non possono avere lo stesso nome')
  await page.locator('dialog.dialog-prompt button', { hasText: 'Annulla' }).click()
  await analisi.locator('.folder-head').hover()
  await analisi.locator('.folder-menu').click()
  await menuItem(page, 'Rinomina').click()
  await page.locator('dialog.dialog-prompt input').fill('Analisi matematica 1')
  await page.keyboard.press('Enter')
  const renamed = folderNamed(page, 'Analisi matematica 1')
  check(await renamed.waitFor({ timeout: 5000 }).then(() => true, () => false), 'la cartella si rinomina')
  await renamed.locator('.folder-toggle').click()
  check((await renamed.locator('.note-item').count()) === 0, 'la cartella si chiude')
  await renamed.locator('.folder-toggle').click()
  check((await renamed.locator('.note-item').count()) === 2, 'e si riapre')
  const notesBefore = await page.locator('.note-item').count()
  await renamed.locator('.folder-head').hover()
  await renamed.locator('.folder-menu').click()
  await menuItem(page, 'Elimina cartella').click()
  await page.locator('dialog.dialog-confirm .btn-danger').click()
  const folderGone = await page.waitForFunction(() => !document.querySelector('.folder'), null, { timeout: 5000 }).then(() => true, () => false)
  check(folderGone && (await page.locator('.note-item').count()) === notesBefore, 'eliminando la cartella le sue note restano')
  // Da tastiera: Invio apre il menu con il fuoco sulla prima voce, Esc lo chiude e torna al pulsante
  await page.locator('.note-item .note-move').first().focus()
  await page.keyboard.press('Enter')
  const inMenu = await page.evaluate(() => document.activeElement?.classList.contains('tool-menu-item'))
  await page.keyboard.press('Escape')
  const backOnButton = await page.evaluate(
    () => document.activeElement?.classList.contains('note-move') && !document.querySelector('.tool-menu:not([hidden])'),
  )
  check(inMenu && backOnButton, 'il menu «Sposta in una cartella» si usa anche da tastiera')

  // Due schede aperte insieme (o l'app installata e il browser): non si cancellano le note a vicenda
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const openTab = async () => {
    const tab = await context.newPage()
    tab.on('pageerror', (e) => errors.push(e.message))
    await tab.goto(url)
    await tab.waitForSelector('.cm-editor')
    return tab
  }
  const tabA = await openTab()
  const tabB = await openTab()
  const editorText = (tab) => tab.evaluate(() => document.querySelector('.cm-content').textContent)
  const waitFor = (tab, fn, arg) => tab.waitForFunction(fn, arg, { timeout: 5000 }).then(() => true, () => false)
  // In cima alla nota, dove la scheda B la sta guardando (l'editor disegna solo le righe visibili)
  await tabA.locator('.cm-content').click()
  await tabA.keyboard.press('Control+Home')
  await tabA.keyboard.type('Scritto nella scheda A\n\n')
  check(
    await waitFor(
      tabB,
      () =>
        document.querySelector('.cm-content').textContent.startsWith('Scritto nella scheda A') &&
        document.title === 'Scritto nella scheda A · Glifo' &&
        document.querySelector('.note-item.is-active .note-title')?.textContent === 'Scritto nella scheda A',
    ),
    'la nota aperta anche in un\'altra scheda si aggiorna da sola, titolo compreso',
  )
  await tabB.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await tabB.keyboard.type('Nota della scheda B')
  await tabB.waitForTimeout(800)
  await tabA.keyboard.type(', e ancora A')
  await tabA.waitForTimeout(800)
  check((await tabA.locator('.note-item', { hasText: 'Nota della scheda B' }).count()) === 1, 'l\'elenco della scheda A mostra la nota creata in B')
  const tabC = await openTab()
  const titlesC = await tabC.locator('.note-title').allInnerTexts()
  check(titlesC.includes('Nota della scheda B') && titlesC.length === 2, `riaprendo Glifo ci sono tutte e due le note (${titlesC})`)
  check((await editorText(tabB)).includes('Nota della scheda B'), 'la scheda B è rimasta sulla sua nota')

  // Ctrl+Z subito dopo il cambio di nota non riporta il testo della nota di prima
  await tabC.locator('.note-item:not(.is-active) .note-open').first().click()
  const opened = await editorText(tabC)
  await tabC.keyboard.press('Control+z')
  await tabC.waitForTimeout(700)
  check((await editorText(tabC)) === opened, 'Ctrl+Z dopo il cambio di nota non riporta la nota di prima')

  // La nota aperta in B viene eliminata in C: B passa a un'altra nota
  const noteB = tabC.locator('.note-item', { hasText: 'Nota della scheda B' })
  await noteB.hover()
  await noteB.locator('.note-delete').click()
  await tabC.locator('dialog.dialog-confirm .btn-danger').click()
  check(
    await waitFor(tabB, () => !document.title.includes('Nota della scheda B')),
    'se la nota aperta viene eliminata in un\'altra scheda, si passa a un\'altra nota',
  )
  check((await tabB.locator('.note-item').count()) === 1, 'e sparisce anche dall\'elenco')
  await newFolder(tabA, 'Fisica 1')
  check(
    await waitFor(tabB, () => [...document.querySelectorAll('.folder-name')].some((el) => el.textContent === 'Fisica 1')),
    'la cartella creata in una scheda compare nell\'altra',
  )
  await context.close()

  // Sezioni: si allargano e si stringono trascinando il bordo, e le misure restano su questo dispositivo
  const layout = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  layout.on('pageerror', (e) => errors.push(e.message))
  await layout.goto(url)
  await layout.waitForSelector('.cm-editor')
  const widths = () =>
    layout.evaluate(() => {
      const width = (selector) => Math.round(document.querySelector(selector).getBoundingClientRect().width)
      return { notes: width('.notes-panel'), editor: width('.editor-pane'), preview: width('.preview-pane'), symbols: width('.symbols-panel') }
    })
  const edge = (name) => layout.getByRole('separator', { name })
  const notesEdge = edge('Larghezza dell\'elenco degli appunti')
  const splitEdge = edge('Divisione tra testo e anteprima')
  const symbolsEdge = edge('Larghezza del pannello dei simboli')
  const dragEdge = async (handle, dx) => {
    const box = await handle.boundingBox()
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await layout.mouse.move(x, y)
    await layout.mouse.down()
    for (let i = 1; i <= 4; i++) await layout.mouse.move(x + (dx * i) / 4, y)
    await layout.mouse.up()
  }
  const start = await widths()
  check(
    start.notes === 270 && start.symbols === 348 && Math.abs(start.editor - start.preview) <= 1,
    `all'inizio le sezioni hanno le misure di partenza (${JSON.stringify(start)})`,
  )
  // La freccia è quella a destra e sinistra (↔), anche mentre si trascina sopra il resto della pagina
  const cursorOf = (selector) => layout.evaluate((s) => getComputedStyle(document.querySelector(s)).cursor, selector)
  const edgeBox = await notesEdge.boundingBox()
  await layout.mouse.move(edgeBox.x + edgeBox.width / 2, edgeBox.y + 100)
  const cursors = [await cursorOf('.resize-notes'), await cursorOf('.resize-split'), await cursorOf('.resize-symbols')]
  await layout.mouse.down()
  await layout.mouse.move(edgeBox.x + 40, edgeBox.y + 100)
  cursors.push(await cursorOf('.cm-content'), await cursorOf('.side-top'))
  await layout.mouse.move(edgeBox.x + edgeBox.width / 2, edgeBox.y + 100)
  await layout.mouse.up()
  check(cursors.every((cursor) => cursor === 'ew-resize'), `sui bordi la freccia è quella a destra e sinistra (${cursors})`)
  await layout.locator('.cm-content').click()
  await dragEdge(notesEdge, 80)
  await dragEdge(splitEdge, -100)
  await dragEdge(symbolsEdge, -60)
  const dragged = await widths()
  check(dragged.notes === 350 && dragged.symbols === 408, `trascinando i bordi si allargano l'elenco e i simboli (${JSON.stringify(dragged)})`)
  check(dragged.preview - dragged.editor > 150, `e si sposta il bordo tra testo e anteprima (${JSON.stringify(dragged)})`)
  check(await layout.evaluate(() => !!document.activeElement?.closest('.cm-editor')), 'dopo aver trascinato si continua a scrivere nel testo')
  const savedSettings = await layout.evaluate(() => localStorage.getItem('glifo.settings.v1') ?? '')
  check(!savedSettings.includes('Width'), 'le misure non finiscono tra le impostazioni dell\'account')
  await layout.reload()
  await layout.waitForSelector('.cm-editor')
  check(JSON.stringify(await widths()) === JSON.stringify(dragged), 'riaprendo Glifo le misure restano')

  // Dove i pannelli si aprono sopra il testo, i bordi non ci sono e i pannelli hanno la loro misura
  await layout.setViewportSize({ width: 1100, height: 800 })
  check(
    !(await notesEdge.isVisible()) && (await splitEdge.isVisible()) && (await symbolsEdge.isVisible()) && (await widths()).notes === 270,
    'sotto i 1250 pixel l\'elenco degli appunti si apre sopra il testo, senza bordo',
  )
  await layout.setViewportSize({ width: 800, height: 800 })
  check(!(await splitEdge.isVisible()) && !(await symbolsEdge.isVisible()), 'sul telefono e sui tablet in verticale non ci sono bordi da trascinare')
  await layout.setViewportSize({ width: 1440, height: 900 })
  check(JSON.stringify(await widths()) === JSON.stringify(dragged), 'tornando largo le misure sono quelle scelte')

  // Da tastiera, e con i pannelli più larghi possibile testo e anteprima restano leggibili
  await symbolsEdge.focus()
  await layout.keyboard.press('ArrowLeft')
  check((await widths()).symbols === 424, 'con la freccia a sinistra il pannello dei simboli si allarga')
  await notesEdge.focus()
  await layout.keyboard.press('End')
  await symbolsEdge.focus()
  await layout.keyboard.press('End')
  const widest = await widths()
  check(
    widest.notes === 480 && widest.editor >= 219 && widest.preview >= 219,
    `allargando tutto, testo e anteprima restano larghi almeno 220 pixel (${JSON.stringify(widest)})`,
  )
  await layout.setViewportSize({ width: 1300, height: 900 })
  const shrunk = await widths()
  check(
    shrunk.editor >= 219 && shrunk.preview >= 219 && shrunk.notes + shrunk.editor + shrunk.preview + shrunk.symbols <= 1301,
    `se la finestra si stringe, si stringono i pannelli e non il testo (${JSON.stringify(shrunk)})`,
  )
  await layout.setViewportSize({ width: 1440, height: 900 })

  // Doppio clic: la misura di partenza
  const notesBox = await notesEdge.boundingBox()
  await layout.mouse.dblclick(notesBox.x + notesBox.width / 2, notesBox.y + notesBox.height / 2)
  const saved = await layout.evaluate(() => JSON.parse(localStorage.getItem('glifo.layout.v1')))
  check((await widths()).notes === 270 && saved.notesWidth === 270, `con un doppio clic sul bordo l'elenco torna largo 270 pixel (${JSON.stringify(saved)})`)

  // L'app installata si chiama «Glifo», e le sue icone sono disegnate dal simbolo di adesso (∮)
  const installed = await layout.evaluate(async () => {
    const manifest = await (await fetch(document.querySelector('link[rel="manifest"]').href)).json()
    const pixels = async (src, size) => {
      const img = new Image()
      img.src = src
      await img.decode()
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = size
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, size, size)
      return { width: img.naturalWidth, data: ctx.getImageData(0, 0, size, size).data }
    }
    const icons = []
    for (const icon of manifest.icons) {
      const size = Number(icon.sizes.split('x')[0])
      const png = await pixels(icon.src, size)
      // Quella che Android ritaglia ha lo sfondo fino agli angoli: con il favicon si confrontano le altre.
      let diff = 0
      if (icon.purpose !== 'maskable') {
        const svg = await pixels('favicon.svg', size)
        for (let i = 0; i < png.data.length; i++) diff += Math.abs(png.data[i] - svg.data[i])
        diff /= png.data.length
      }
      icons.push({ src: icon.src, ok: png.width === size && diff < 1 })
    }
    const apple = await pixels(document.querySelector('link[rel="apple-touch-icon"]').href, 180)
    icons.push({ src: 'apple-touch-icon', ok: apple.width === 180 })
    return { name: manifest.name, shortName: manifest.short_name, icons, mark: !!document.querySelector('.side-top .logo-toggle svg path') && !document.querySelector('.side-top .logo-toggle svg rect') }
  })
  check(installed.name === 'Glifo' && installed.shortName === 'Glifo', `l'app installata si chiama «Glifo» (${installed.name})`)
  check(
    installed.icons.every((icon) => icon.ok) && installed.mark,
    `le icone sono il simbolo di adesso, e nella barra laterale c'è solo il ∮ (${JSON.stringify(installed.icons)})`,
  )
  await layout.close()

  // Schemi stile draw.io: forme, frecce che le collegano, testo con formule, colori; nella nota
  // come blocco ```schema, disegnati nell'anteprima, da riaprire e modificare
  const sp = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  sp.on('pageerror', (e) => errors.push(e.message))
  await sp.goto(url)
  await sp.waitForSelector('.cm-editor')
  await sp.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await sp.keyboard.press('Control+a')
  await sp.keyboard.type('# Schemi\n\nPrima\n')
  const schemaEditor = sp.locator('dialog.schema-editor[open]')
  await sp.locator('.editor-toolbar button[aria-label^="Schema"]').click()
  await schemaEditor.waitFor()
  check(await sp.locator('.schema-empty').isVisible(), 'il pulsante «Schema» apre l\'editor, con le istruzioni sul foglio vuoto')
  const labelsOnCanvas = () =>
    sp.evaluate(() =>
      [...document.querySelectorAll('.schema-canvas foreignObject > div > div > div')].map((d) => {
        const r = d.getBoundingClientRect()
        return { text: d.textContent, x: r.x + r.width / 2, y: r.y + r.height / 2 }
      }),
    )
  // Due forme dal pannello: scrivendo con la forma selezionata si mette il testo
  await sp.locator('.schema-shape[data-shape="rounded"]').click()
  await sp.keyboard.type('Ipotesi')
  await sp.keyboard.press('Escape')
  await sp.locator('.schema-shape[data-shape="rhombus"]').click()
  await sp.keyboard.type('Vale $x>0$?')
  await sp.keyboard.press('Escape')
  let shapes = await labelsOnCanvas()
  const ipotesi = shapes.find((l) => l.text === 'Ipotesi')
  const rombo = shapes.find((l) => l.text.startsWith('Vale'))
  check(!!ipotesi && !!rombo && Math.abs(rombo.y - ipotesi.y) > 60, `le forme nuove non finiscono una sopra l'altra (${JSON.stringify(shapes)})`)
  check((await sp.locator('.schema-canvas .katex').count()) > 0, 'la formula nella forma è disegnata con KaTeX')
  // Collegamento: si passa sopra la prima forma e si trascina la freccia blu sul rombo
  await sp.mouse.move(ipotesi.x, ipotesi.y)
  const downArrow = await sp.locator('.schema-arrow-down').boundingBox()
  await sp.mouse.move(downArrow.x + downArrow.width / 2, downArrow.y + downArrow.height / 2)
  await sp.mouse.down()
  await sp.mouse.move(rombo.x, rombo.y, { steps: 8 })
  await sp.mouse.up()
  // Clic sulla freccia destra del rombo: una forma collegata, da scrivere e colorare
  await sp.mouse.move(rombo.x, rombo.y)
  const rightArrow = await sp.locator('.schema-arrow-right').boundingBox()
  await sp.mouse.click(rightArrow.x + rightArrow.width / 2, rightArrow.y + rightArrow.height / 2)
  await sp.keyboard.type('Tesi')
  await sp.keyboard.press('Escape')
  await sp.locator('.schema-format button[aria-label="Verde"]').click()
  // Una forma trascinata dal pannello finisce dove la si lascia
  const canvasBox = await sp.locator('.schema-canvas').boundingBox()
  const ellipseItem = await sp.locator('.schema-shape[data-shape="ellipse"]').boundingBox()
  await sp.mouse.move(ellipseItem.x + 30, ellipseItem.y + 15)
  await sp.mouse.down()
  await sp.mouse.move(canvasBox.x + 150, canvasBox.y + 120, { steps: 10 })
  await sp.mouse.up()
  await sp.keyboard.type('Quarta')
  await sp.keyboard.press('Escape')
  shapes = await labelsOnCanvas()
  check(shapes.length === 4, `con la freccia blu e trascinando dal pannello le forme diventano 4 (${shapes.length})`)
  // Annulla e Ripeti
  await sp.locator('button[aria-label="Annulla (Ctrl+Z)"]').click()
  const undone = (await labelsOnCanvas()).length
  await sp.keyboard.press('Control+y')
  check(undone === 3 && (await labelsOnCanvas()).length === 4, 'Annulla e Ripeti funzionano anche negli schemi')
  await sp.locator('dialog.schema-editor .btn-primary', { hasText: 'Fatto' }).click()
  await schemaEditor.waitFor({ state: 'detached' })
  const savedNote = () =>
    sp.evaluate(() => {
      for (let i = 0; i < localStorage.length; i++) {
        const value = localStorage.getItem(localStorage.key(i))
        if (value?.startsWith('# Schemi')) return value
      }
      return ''
    })
  await sp.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  const block = /```schema\n([\s\S]*?)\n```/.exec(await savedNote())
  const savedSchema = block ? JSON.parse(block[1]) : { nodes: [], edges: [] }
  const tesi = savedSchema.nodes.find((n) => n.text === 'Tesi')
  check(
    savedSchema.nodes.length === 4 &&
      savedSchema.edges.length === 2 &&
      tesi?.color === 'green' &&
      savedSchema.nodes.some((n) => n.text === 'Vale $x>0$?'),
    `«Fatto» mette lo schema nella nota, con forme, frecce, testi e colori (${block?.[1].length ?? 0} caratteri)`,
  )
  check(
    (await sp.locator('.cm-schema').innerText()).includes('4 forme, 2 frecce'),
    'nel testo il blocco diventa una riga «Schema · 4 forme, 2 frecce» con «Modifica»',
  )
  // Nell'anteprima: il disegno, con i testi dentro (anche se lo schema non comincia in alto a sinistra)
  await sp.waitForSelector('.preview-pane .schema-block > svg')
  const drawing = await sp.evaluate(() => {
    const block = document.querySelector('.preview-pane .schema-block')
    const svg = block.querySelector('svg').getBoundingClientRect()
    const within = (r, box) => r.width > 0 && r.left >= box.left - 1 && r.right <= box.right + 1 && r.top >= box.top - 1 && r.bottom <= box.bottom + 1
    // Un testo si vede solo dentro il suo foreignObject (che lo taglia) e dentro il disegno.
    const labels = [...block.querySelectorAll('foreignObject')].map((fo) => [fo.getBoundingClientRect(), fo.querySelector('div > div > div').getBoundingClientRect()])
    const inside = labels.every(([fo, text]) => within(text, fo) && within(text, svg))
    return { labels: labels.length, inside, katex: !!block.querySelector('.katex') }
  })
  check(drawing.labels === 4 && drawing.inside && drawing.katex, `l'anteprima disegna lo schema con i suoi testi e la formula (${JSON.stringify(drawing)})`)
  // Si riapre dall'anteprima; Ctrl+S salva senza chiudere
  await sp.locator('.preview-pane .schema-block').hover()
  await sp.locator('.preview-pane .schema-edit').click()
  await schemaEditor.waitFor()
  check((await labelsOnCanvas()).length === 4, '«Modifica» nell\'anteprima riapre lo schema')
  const free = await sp.locator('.schema-canvas').boundingBox()
  await sp.mouse.dblclick(free.x + free.width - 120, free.y + free.height - 100)
  await sp.keyboard.type('Quinta')
  await sp.keyboard.press('Escape')
  await sp.keyboard.press('Control+s')
  await sp.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  check((await savedNote()).includes('"text":"Quinta"') && (await schemaEditor.count()) === 1, 'Ctrl+S mette lo schema nella nota e l\'editor resta aperto')
  await sp.locator('dialog.schema-editor button', { hasText: 'Chiudi' }).click()
  await schemaEditor.waitFor({ state: 'detached' })
  check((await sp.locator('dialog.dialog-confirm').count()) === 0, 'dopo aver salvato si chiude senza domande')
  check(((await savedNote()).match(/```schema/g) ?? []).length === 1, 'nella nota resta un solo schema, aggiornato')
  // Ctrl+Z nel testo riporta lo schema di prima
  await sp.locator('.cm-line').first().click()
  await sp.keyboard.press('Control+z')
  await sp.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  check(!(await savedNote()).includes('Quinta') && (await savedNote()).includes('"text":"Tesi"'), 'Ctrl+Z nel testo annulla l\'ultima modifica dello schema')
  // Con il tema scuro lo schema si ridisegna con i suoi colori
  const lightFill = await sp.locator('.preview-pane .schema-block > svg').innerHTML()
  await chooseTheme(sp, 'Scuro')
  await sp.waitForFunction((before) => {
    const svg = document.querySelector('.preview-pane .schema-block > svg')
    return svg && svg.innerHTML !== before && svg.innerHTML.includes('#1b1f2b')
  }, lightFill, { timeout: 10000 })
  check(true, 'cambiando tema lo schema si ridisegna con i colori scuri')
  // Sul tema scuro si vede quello che si trascina: la forma presa dal pannello già sopra il
  // pannello, e il riquadro che segue una forma spostata (maxGraph lo farebbe nero)
  await sp.locator('.preview-pane .schema-block').hover()
  await sp.locator('.preview-pane .schema-edit').click()
  await schemaEditor.waitFor()
  const accent = await sp.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim())
  // Si prende la forma dal suo nome e si scende sui nomi delle altre
  const ellipseName = await sp.locator('.schema-shape[data-shape="ellipse"] span').boundingBox()
  await sp.mouse.move(ellipseName.x + 10, ellipseName.y + ellipseName.height / 2)
  await sp.mouse.down()
  await sp.mouse.move(ellipseName.x + 40, ellipseName.y + 60, { steps: 6 })
  const overPalette = await sp.evaluate(() => {
    const el = document.querySelector('.schema-drag-preview')
    return {
      inDialog: !!el && el.parentElement === document.querySelector('dialog.schema-editor'),
      visible: !!el && getComputedStyle(el).visibility === 'visible',
      selected: getSelection().toString(),
    }
  })
  check(
    overPalette.inDialog && overPalette.visible && overPalette.selected === '',
    `la forma presa dal pannello si vede già sopra il pannello, senza selezionare i nomi (${JSON.stringify(overPalette)})`,
  )
  const sheet = await sp.locator('.schema-canvas').boundingBox()
  await sp.mouse.move(sheet.x + sheet.width - 120, sheet.y + sheet.height - 100, { steps: 8 })
  await sp.mouse.up()
  await sp.keyboard.type('Sesta')
  await sp.keyboard.press('Escape')
  check((await labelsOnCanvas()).length === 5, 'lasciata sul foglio, la forma si aggiunge')
  // Via il testo e la forma
  await sp.keyboard.press('Control+z')
  await sp.keyboard.press('Control+z')
  const tesiOnCanvas = (await labelsOnCanvas()).find((l) => l.text === 'Tesi')
  await sp.mouse.move(tesiOnCanvas.x, tesiOnCanvas.y)
  await sp.mouse.down()
  await sp.mouse.move(tesiOnCanvas.x + 120, tesiOnCanvas.y + 80, { steps: 8 })
  const movePreview = await sp.evaluate(() =>
    [...document.querySelectorAll('.schema-canvas svg rect[stroke-dasharray]')].map((r) => ({
      stroke: r.getAttribute('stroke'),
      width: r.getAttribute('stroke-width'),
      fill: r.getAttribute('fill'),
    })),
  )
  await sp.mouse.up()
  check(
    movePreview.some((r) => r.stroke === accent && r.width === '2' && r.fill === accent) && !movePreview.some((r) => r.stroke === 'black'),
    `spostando una forma, il riquadro che la segue è nel colore di Glifo e si vede sul tema scuro (${JSON.stringify(movePreview)})`,
  )
  await sp.keyboard.press('Control+z')
  await sp.locator('dialog.schema-editor button', { hasText: 'Chiudi' }).click()
  await schemaEditor.waitFor({ state: 'detached' })
  check((await sp.locator('dialog.dialog-confirm').count()) === 0, 'annullando le prove lo schema resta com\'era')

  // «Salva .md»: nel file ogni schema è un'immagine (che VS Code mostra) con il suo JSON nascosto
  // in un commento; riaprendo il file con Glifo torna lo schema da modificare
  const noteBefore = await savedNote()
  await sp.evaluate(() => {
    window.showSaveFilePicker = async () => ({
      name: 'schemi.md',
      createWritable: async () => ({ write: async (text) => (window.savedFile = text), close: async () => {} }),
    })
  })
  await sp.locator('button', { hasText: 'Salva .md' }).click()
  await sp.waitForFunction(() => typeof window.savedFile === 'string', null, { timeout: 10000 })
  const mdFile = await sp.evaluate(() => window.savedFile)
  const picture = /^!\[Schema\]\(data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+)\)\n<!-- glifo-schema/m.exec(mdFile)
  const pictureSvg = picture ? Buffer.from(picture[1], 'base64').toString('utf8') : ''
  check(
    !!picture && !mdFile.includes('```schema') && mdFile.startsWith('# Schemi'),
    `nel file .md lo schema è un'immagine con il JSON in un commento (${mdFile.length} caratteri)`,
  )
  check(
    pictureSvg.includes('>Tesi<') && pictureSvg.includes('<math') && !pictureSvg.includes('katex-html') && pictureSvg.includes('fill="#ffffff"') && !pictureSvg.includes('#1b1f2b'),
    'l\'immagine ha i testi, le formule in MathML e i colori chiari anche col tema scuro',
  )
  // Come la mostra l'anteprima di VS Code: markdown-it con l'HTML e le immagini data:image/…;
  const vsMd = new MarkdownIt({ html: true })
  const validateLink = vsMd.validateLink
  vsMd.validateLink = (link) => validateLink(link) || /^data:image\/.*?;/.test(link)
  const vscode = await browser.newPage()
  await vscode.setContent(
    `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self' https: data:">${vsMd.render(mdFile)}`,
  )
  const inVscode = await vscode.evaluate(async () => {
    const img = document.querySelector('img')
    await img?.decode().catch(() => {})
    return { width: img?.naturalWidth ?? 0, json: document.body.innerText.includes('"nodes"') }
  })
  await vscode.close()
  check(inVscode.width > 100 && !inVscode.json, `in VS Code si vede il disegno e non il JSON (${JSON.stringify(inVscode)})`)
  await sp.evaluate((text) => {
    window.showOpenFilePicker = async () => [{ getFile: async () => new File([text], 'schemi.md') }]
  }, mdFile)
  await sp.locator('button', { hasText: 'Apri .md' }).click()
  // Si aspetta la nota nuova: il file si legge dopo il clic, e la nota di prima ha già uno schema ed è salvata.
  const schemiNotes = () =>
    [...Array(localStorage.length).keys()].map((i) => localStorage.getItem(localStorage.key(i))).filter((v) => v?.startsWith('# Schemi'))
  await sp
    .waitForFunction(
      () =>
        [...Array(localStorage.length).keys()].filter((i) => localStorage.getItem(localStorage.key(i))?.startsWith('# Schemi')).length === 2 &&
        document.querySelectorAll('.cm-schema').length === 1 &&
        document.documentElement.dataset.save === 'salvato',
      null,
      { timeout: 5000 },
    )
    .catch(() => {})
  const reopenedNotes = await sp.evaluate(schemiNotes)
  check(
    reopenedNotes.length === 2 && reopenedNotes.every((v) => v === noteBefore),
    'riaprendo il file con Glifo lo schema torna un blocco da modificare, uguale a prima',
  )
  // Gli schemi funzionano anche offline: editor e maxGraph sono tra i file dell'app installata
  const precache = await sp.evaluate(() => fetch('sw.js').then((r) => r.text()))
  check(/assets\/graph-[\w-]+\.js/.test(precache) && /assets\/editor-[\w-]+\.js/.test(precache), 'l\'editor degli schemi è tra i file salvati per usarlo offline')
  await sp.close()

  // Su tablet e telefono non si «passa sopra»: le frecce blu stanno attorno alla forma toccata
  const touch = await browser.newPage({ viewport: { width: 1024, height: 768 }, hasTouch: true, isMobile: true })
  touch.on('pageerror', (e) => errors.push(e.message))
  await touch.goto(url)
  await touch.waitForSelector('.cm-editor')
  await touch.locator('.editor-toolbar button[aria-label^="Schema"]').tap()
  await touch.waitForSelector('dialog.schema-editor[open]')
  await touch.locator('.schema-shape[data-shape="rect"]').tap()
  await touch.locator('dialog.schema-editor .schema-canvas').tap({ position: { x: 20, y: 20 } })
  const touchShape = await touch.evaluate(() => {
    const r = document.querySelector('.schema-canvas svg rect').getBoundingClientRect()
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
  })
  await touch.touchscreen.tap(touchShape.x, touchShape.y)
  const arrowsAfterTap = await touch.locator('.schema-arrows').isVisible()
  const touchArrow = arrowsAfterTap ? await touch.locator('.schema-arrow-right').boundingBox() : null
  if (touchArrow) await touch.touchscreen.tap(touchArrow.x + touchArrow.width / 2, touchArrow.y + touchArrow.height / 2)
  await touch.locator('dialog.schema-editor .btn-primary', { hasText: 'Fatto' }).tap()
  await touch.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  const touchSchema = await touch.evaluate(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const m = /```schema\n([\s\S]*?)\n```/.exec(localStorage.getItem(localStorage.key(i)) ?? '')
      if (m) return JSON.parse(m[1])
    }
    return { nodes: [], edges: [] }
  })
  check(
    arrowsAfterTap && touchSchema.nodes.length === 2 && touchSchema.edges.length === 1,
    `col dito: toccando una forma compaiono le frecce blu, e toccandone una si aggiunge una forma collegata (${touchSchema.nodes.length} forme, ${touchSchema.edges.length} frecce)`,
  )
  await touch.close()

  // Schemi, passo 2: forme nuove (anche girate), modelli pronti, allineare e distribuire,
  // scaricare o copiare lo schema come immagine
  const s2context = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true })
  await s2context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(url).origin })
  const s2 = await s2context.newPage()
  s2.on('pageerror', (e) => errors.push(e.message))
  await s2.goto(url)
  await s2.waitForSelector('.cm-editor')
  await s2.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await s2.keyboard.press('Control+a')
  await s2.keyboard.type('# Forme nuove\n')
  const editor2 = s2.locator('dialog.schema-editor[open]')
  await s2.locator('.editor-toolbar button[aria-label^="Schema"]').click()
  await editor2.waitFor()
  const paletteCount = await s2.locator('.schema-shape[data-shape]').count()
  check(paletteCount === 15, `nel pannello ci sono 15 forme, con cilindro, nuvola, frecce grandi, corsie… (${paletteCount})`)
  const canvasTexts = () => s2.evaluate(() => [...document.querySelectorAll('.schema-canvas foreignObject')].map((f) => f.textContent))
  await s2.locator('.schema-templates button', { hasText: 'Diagramma di flusso' }).click()
  const flowTexts = await canvasTexts()
  await s2.keyboard.press('Control+z')
  const afterUndo = (await canvasTexts()).length
  check(
    flowTexts.includes('Va bene?') && flowTexts.includes('Leggi i dati') && afterUndo === 0 && (await s2.locator('.schema-empty').isVisible()),
    `dal foglio vuoto «Diagramma di flusso» disegna il modello, e un solo Annulla lo toglie (${flowTexts.length} testi, poi ${afterUndo})`,
  )
  // La freccia grande si gira di un quarto: larghezza e altezza si scambiano
  await s2.locator('.schema-shape[data-shape="arrow"]').click()
  await s2.locator('.schema-format button[aria-label^="Gira di un quarto"]').click()
  // Il menu «Modelli» aggiunge un modello accanto a quello che c'è, già selezionato
  await s2.locator('.schema-menu-button', { hasText: 'Modelli' }).click()
  const menuInDialog = await s2.evaluate(() => !!document.querySelector('dialog.schema-editor .tool-menu'))
  await s2.locator('.tool-menu-item', { hasText: 'Ciclo' }).click()
  await s2.locator('.schema-format button[aria-label^="Distribuisci in verticale"]').click()
  await s2.locator('.schema-format button[aria-label="Allinea a sinistra"]').click()
  // Maiusc + clic aggiunge una forma alla selezione: con due compare «Allinea» (non «Distribuisci»)
  await s2.keyboard.press('Escape')
  const phaseAt = (text) =>
    s2.evaluate((t) => {
      const fo = [...document.querySelectorAll('.schema-canvas foreignObject')].find((f) => f.textContent === t)
      const r = fo.querySelector('div > div > div').getBoundingClientRect()
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
    }, text)
  const fase1 = await phaseAt('Fase 1')
  const fase3 = await phaseAt('Fase 3')
  await s2.mouse.click(fase1.x, fase1.y)
  await s2.keyboard.down('Shift')
  await s2.mouse.click(fase3.x, fase3.y)
  await s2.keyboard.up('Shift')
  const twoSelected = await s2.locator('.schema-format h3').allInnerTexts()
  check(
    twoSelected.some((t) => /allinea/i.test(t)) && !twoSelected.some((t) => /distribuisci/i.test(t)),
    `Maiusc + clic aggiunge una forma alla selezione, e con due si possono allineare (${twoSelected})`,
  )
  await s2.keyboard.press('Escape')
  await s2.keyboard.press('Control+s')
  await s2.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  const s2schema = await s2.evaluate(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const value = localStorage.getItem(localStorage.key(i)) ?? ''
      const m = value.startsWith('# Forme nuove') && /```schema\n([\s\S]*?)\n```/.exec(value)
      if (m) return JSON.parse(m[1])
    }
    return { nodes: [], edges: [] }
  })
  const bigArrow = s2schema.nodes.find((n) => n.shape === 'arrow')
  check(bigArrow?.rot === 1 && bigArrow.w === 60 && bigArrow.h === 130, `girata, la freccia grande punta in giù e il riquadro si gira con lei (${JSON.stringify(bigArrow)})`)
  const phases = s2schema.nodes.filter((n) => /^Fase \d$/.test(n.text ?? '')).sort((a, b) => a.y - b.y)
  const gaps = phases.slice(1).map((n, i) => n.y - (phases[i].y + phases[i].h))
  check(
    menuInDialog &&
      phases.length === 4 &&
      s2schema.edges.length === 4 &&
      phases.every((n) => n.x === phases[0].x) &&
      Math.min(...gaps) > 0 &&
      Math.max(...gaps) - Math.min(...gaps) <= 1,
    `il menu «Modelli» aggiunge il ciclo; «Distribuisci in verticale» e «Allinea a sinistra» mettono le fasi in colonna con lo stesso spazio (${JSON.stringify(gaps)})`,
  )
  // Scaricare come PNG (fitto il doppio, con la sua risoluzione scritta dentro) e come SVG
  const pngDownload = s2.waitForEvent('download')
  await s2.locator('.schema-menu-button', { hasText: 'Scarica' }).click()
  await s2.locator('.tool-menu-item', { hasText: 'Immagine PNG' }).click()
  const pngFile = await pngDownload
  const pngBytes = readFileSync(await pngFile.path())
  const pngChunks = []
  for (let at = 8; at < pngBytes.length; at += 12 + pngBytes.readUInt32BE(at)) pngChunks.push(pngBytes.toString('latin1', at + 4, at + 8))
  const svgDownload = s2.waitForEvent('download')
  await s2.locator('.schema-menu-button', { hasText: 'Scarica' }).click()
  await s2.locator('.tool-menu-item', { hasText: 'Immagine SVG' }).click()
  const svgFile = await svgDownload
  const svgText = readFileSync(await svgFile.path(), 'utf8')
  const svgWidth = Number(/^<svg[^>]*\swidth="(\d+)"/.exec(svgText)?.[1] ?? 0)
  check(
    pngFile.suggestedFilename() === 'Forme-nuove-schema.png' && pngBytes.toString('latin1', 1, 4) === 'PNG' && pngChunks[1] === 'pHYs' && pngBytes.readUInt32BE(16) === svgWidth * 2,
    `«Scarica → Immagine PNG» dà un PNG nitido col nome della nota (${pngFile.suggestedFilename()}, ${pngBytes.readUInt32BE(16)} px, ${pngChunks.slice(0, 3)})`,
  )
  check(svgFile.suggestedFilename() === 'Forme-nuove-schema.svg' && svgText.includes('Fase 3') && svgText.includes('fill="#ffffff"'), '«Immagine SVG» dà lo schema chiaro su bianco')
  await s2.locator('.schema-menu-button', { hasText: 'Scarica' }).click()
  await s2.locator('.tool-menu-item', { hasText: 'Copia come immagine' }).click()
  await s2.waitForFunction(() => [...document.querySelectorAll('dialog.schema-editor .toast')].some((t) => t.textContent.startsWith('Immagine copiata')), null, { timeout: 5000 })
  const clipboardTypes = await s2.evaluate(async () => (await navigator.clipboard.read()).flatMap((item) => item.types))
  check(clipboardTypes.includes('image/png'), `«Copia come immagine» mette il PNG negli appunti, e il messaggio si vede sopra l'editor (${clipboardTypes})`)
  await s2.locator('dialog.schema-editor .btn-primary', { hasText: 'Fatto' }).click()
  await editor2.waitFor({ state: 'detached' })
  await s2.waitForSelector('.preview-pane .schema-block > svg')
  const previewTexts = await s2.evaluate(() => [...document.querySelectorAll('.preview-pane .schema-block foreignObject')].map((f) => f.textContent))
  check(previewTexts.includes('Fase 4'), 'nell\'anteprima lo schema si vede con le forme nuove')
  await s2context.close()

  // I processi con le corsie: il modello mette le corsie dietro alle forme; le corsie si prendono dalla
  // fascia dei nomi e si portano dietro le forme che hanno sopra; un clic dentro una corsia è come sul
  // foglio vuoto; i nomi si cambiano nel pannello. Nella nota le corsie vanno per prime.
  {
    const lp = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    lp.on('pageerror', (e) => errors.push(e.message))
    await lp.goto(url)
    await lp.waitForSelector('.cm-editor')
    await lp.locator('.notes-head button[aria-label="Nuova nota"]').click()
    await lp.keyboard.press('Control+a')
    await lp.keyboard.type('# Processo\n')
    const laneEditor = lp.locator('dialog.schema-editor[open]')
    await lp.locator('.editor-toolbar button[aria-label^="Schema"]').click()
    await laneEditor.waitFor()
    await lp.locator('.schema-templates button', { hasText: 'Processo con le corsie' }).click()
    const textBox = (text) => lp.locator('dialog.schema-editor .schema-canvas div', { hasText: new RegExp(`^${text}$`) }).last().boundingBox()
    const head = await textBox('Vendite')
    const fattura = await textBox('Emette la fattura')
    // Dentro una corsia, lontano dalle forme: niente si seleziona.
    await lp.mouse.click(head.x + head.width / 2, head.y + 520)
    const bodySelects = await lp.locator('.schema-lanes-section').count()
    await lp.mouse.move(head.x + head.width / 2, head.y + head.height / 2)
    await lp.mouse.down()
    await lp.mouse.move(head.x + head.width / 2 + 60, head.y + head.height / 2 + 40, { steps: 8 })
    await lp.mouse.up()
    const laneNames = await lp.locator('.schema-lane-name').evaluateAll((els) => els.map((e) => e.value))
    const headAfter = await textBox('Vendite')
    const fatturaAfter = await textBox('Emette la fattura')
    const moved = [headAfter.x - head.x, headAfter.y - head.y, fatturaAfter.x - fattura.x, fatturaAfter.y - fattura.y].map(Math.round)
    check(
      bodySelects === 0 && laneNames.join('|') === 'Cliente|Vendite|Magazzino|Amministrazione' && moved[0] > 20 && moved[0] === moved[2] && moved[1] === moved[3],
      `le corsie si prendono dalla fascia dei nomi e spostandole le forme del processo vengono con loro (${JSON.stringify({ bodySelects, laneNames, moved })})`,
    )
    await lp.locator('.schema-lanes-section button', { hasText: 'Aggiungi corsia' }).click()
    const added = lp.locator('.schema-lane-name').nth(4)
    await added.fill('Fornitore')
    await added.press('Enter')
    await lp.locator('dialog.schema-editor .btn-primary', { hasText: 'Fatto' }).click()
    await laneEditor.waitFor({ state: 'detached' })
    await lp.waitForFunction(() => [...Array(localStorage.length).keys()].some((i) => localStorage.getItem(localStorage.key(i))?.includes('Amministrazione\\nFornitore')), null, { timeout: 5000 }).catch(() => {})
    const laneNote = await lp.evaluate(() => {
      for (let i = 0; i < localStorage.length; i++) {
        const value = localStorage.getItem(localStorage.key(i))
        if (value?.startsWith('# Processo')) return value
      }
      return ''
    })
    const firstNode = /"nodes":\[\n(\{[^\n]*\})/.exec(laneNote)?.[1] ?? ''
    await lp.waitForSelector('.preview-pane .schema-block > svg')
    const laneTexts = await lp.evaluate(() => [...document.querySelectorAll('.preview-pane .schema-block foreignObject')].map((f) => f.textContent).join('|'))
    check(
      firstNode.includes('"shape":"lanes"') && firstNode.includes('Amministrazione\\nFornitore') && laneTexts.includes('Fornitore') && laneTexts.includes('Registra l\'incasso'),
      `nella nota le corsie vanno per prime (dietro), con la corsia aggiunta, e l'anteprima le disegna (${firstNode.slice(0, 120)})`,
    )
    await lp.close()
  }

  // Frecce curve e basi di dati: il gruppo «Basi di dati» (che si ricorda aperto), pallini, tabelle,
  // linee E-R senza punte, testo della freccia vicino a un capo, il modello «Schema E-R»
  const db = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  db.on('pageerror', (e) => errors.push(e.message))
  await db.goto(url)
  await db.waitForSelector('.cm-editor')
  await db.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await db.keyboard.press('Control+a')
  await db.keyboard.type('# Basi di dati\n')
  const dbEditor = db.locator('dialog.schema-editor[open]')
  await db.locator('.editor-toolbar button[aria-label^="Schema"]').click()
  await dbEditor.waitFor()
  const tableItem = db.locator('.schema-shape[data-preset="table"]')
  const closedAtFirst = !(await tableItem.isVisible())
  await db.locator('.schema-group[data-group="db"] .schema-group-head').click()
  check(closedAtFirst && (await tableItem.isVisible()), '«Basi di dati» parte chiuso e si apre con un clic')
  // Un pallino: cliccando la sua freccia blu ne nasce un altro, collegato da una linea senza punte
  await db.locator('.schema-shape[data-preset="attribute"]').click()
  const dot = await db.evaluate(() => {
    const fo = [...document.querySelectorAll('.schema-canvas foreignObject')].find((f) => f.textContent === 'Attributo')
    const r = fo.querySelector('div > div > div').getBoundingClientRect()
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
  })
  await db.mouse.move(dot.x, dot.y)
  const dotArrow = await db.locator('.schema-arrow-down').boundingBox()
  await db.mouse.click(dotArrow.x + dotArrow.width / 2, dotArrow.y + dotArrow.height / 2)
  await db.keyboard.type('Nome')
  await db.keyboard.press('Escape')
  // Il nome dall'altra parte del pallino
  await db.locator('.schema-format button[aria-label="Il nome dall\'altra parte del pallino"]').click()
  // Una tabella si scrive com'è disegnata: il nome nella fascia in alto, i campi sotto, uno per riga.
  // Scrivendo con la tabella selezionata cambia solo il nome; Invio passa ai campi, col primo nome selezionato.
  const tableEditing = () =>
    db.evaluate(() => {
      const box = document.querySelector('.schema-table-text')
      const name = box.querySelector('.schema-table-name')
      const fields = box.querySelector('.schema-table-fields')
      const active = document.activeElement
      return {
        open: !box.hidden,
        single: !document.querySelector('.schema-text').hidden,
        name: name.value,
        fields: fields.value,
        focus: active === name ? 'name' : active === fields ? 'fields' : '',
        selected: active === name || active === fields ? active.value.slice(active.selectionStart, active.selectionEnd) : '',
        nameBottom: Math.round(name.getBoundingClientRect().bottom),
        fieldsTop: Math.round(fields.getBoundingClientRect().top),
        align: [getComputedStyle(name).textAlign, getComputedStyle(fields).textAlign],
      }
    })
  await tableItem.click()
  await db.keyboard.type('Studente')
  const typedName = await tableEditing()
  await db.keyboard.press('Enter')
  const toFields = await tableEditing()
  await db.keyboard.type('Matricola')
  await db.keyboard.press('Control+End')
  // Un Invio di troppo in fondo non diventa un campo vuoto. Si finisce cliccando un colore: si
  // salvano il testo e il colore (prima il pannello si rifaceva e il clic andava perso).
  await db.keyboard.type('\nCognome\nFK Corso\n\n')
  await db.locator('.schema-format button[aria-label="Blu"]').click()
  const blueTable = await db.evaluate(() => ({
    open: !document.querySelector('.schema-table-text').hidden,
    blue: document.querySelector('.schema-format button[aria-label="Blu"]')?.getAttribute('aria-pressed'),
  }))
  check(
    typedName.open &&
      !typedName.single &&
      typedName.focus === 'name' &&
      typedName.name === 'Studente' &&
      typedName.fields === 'PK Codice\nNome' &&
      typedName.nameBottom <= typedName.fieldsTop &&
      typedName.align.join() === 'center,left',
    `la tabella si scrive in due parti, il nome in alto e i campi sotto, e scrivendo cambia solo il nome (${JSON.stringify(typedName)})`,
  )
  check(toFields.focus === 'fields' && toFields.selected === 'Codice', `Invio dal nome passa ai campi, col nome del primo selezionato (${JSON.stringify(toFields)})`)
  const tableLabel = await db.evaluate(() => {
    const fo = [...document.querySelectorAll('.schema-canvas foreignObject')].find((f) => f.textContent.startsWith('Studente'))
    return { underlined: fo?.querySelector('u')?.textContent ?? '', fk: !!fo && fo.textContent.includes('FKCorso') }
  })
  check(
    !blueTable.open && blueTable.blue === 'true' && tableLabel.underlined === 'Matricola',
    `un clic su un colore mentre si scrive salva il testo e cambia anche il colore (${JSON.stringify(blueTable)})`,
  )
  // Doppio clic su un campo: si cambia quello. Ctrl+S mentre si scrive salva nella nota (senza, il
  // browser aprirebbe «Salva pagina con nome»); un clic sul foglio finisce di scrivere.
  const rowAt = (text) =>
    db.evaluate((text) => {
      const fo = [...document.querySelectorAll('.schema-canvas foreignObject')].find((f) => f.textContent.startsWith('Studente'))
      const r = [...fo.querySelectorAll('div')].find((d) => d.textContent === text).getBoundingClientRect()
      return { x: r.x + 40, y: r.y + r.height / 2 }
    }, text)
  const nomeRow = await rowAt('Nome')
  await db.mouse.dblclick(nomeRow.x, nomeRow.y)
  const onRow = await tableEditing()
  await db.evaluate(() => window.addEventListener('keydown', (e) => e.key === 's' && (window.__ctrlS = e), true))
  await db.keyboard.press('Control+s')
  const ctrlS = await db.evaluate(() => ({ prevented: window.__ctrlS?.defaultPrevented, status: document.querySelector('.schema-status').textContent }))
  const afterSave = await tableEditing()
  check(
    onRow.focus === 'fields' && onRow.selected === 'Nome' && ctrlS.prevented && ctrlS.status === 'Salvato nella nota' && !afterSave.open,
    `doppio clic su un campo seleziona quello, e Ctrl+S mentre si scrive salva nella nota (${JSON.stringify({ ...ctrlS, selected: onRow.selected })})`,
  )
  const head = await rowAt('Studente')
  await db.mouse.dblclick(head.x, head.y)
  const onName = await tableEditing()
  const dbSheet = await db.locator('dialog.schema-editor .schema-canvas').boundingBox()
  await db.mouse.click(dbSheet.x + 15, dbSheet.y + 15)
  check(
    onName.focus === 'name' && onName.selected === 'Studente' && !(await tableEditing()).open,
    `doppio clic sul nome seleziona il nome, e un clic sul foglio finisce di scrivere (${JSON.stringify(onName)})`,
  )
  // Tutte le frecce curve, con il testo alla fine
  await db.keyboard.press('Escape')
  await db.keyboard.press('Control+a')
  await db.locator('.schema-format button[aria-label="Curva"]').click()
  await db.locator('.schema-format button[aria-label="Testo alla fine della freccia"]').click()
  const curvedPath = await db.evaluate(() => [...document.querySelectorAll('.schema-canvas svg path')].some((p) => /Q/.test(p.getAttribute('d') ?? '')))
  await db.keyboard.press('Escape')
  // Il modello «Schema E-R» dal menu
  await db.locator('.schema-menu-button', { hasText: 'Modelli' }).click()
  await db.locator('.tool-menu-item', { hasText: 'Schema E-R' }).click()
  await db.locator('dialog.schema-editor .btn-primary', { hasText: 'Fatto' }).click()
  await dbEditor.waitFor({ state: 'detached' })
  await db.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  const dbSchema = await db.evaluate(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const value = localStorage.getItem(localStorage.key(i)) ?? ''
      const m = value.startsWith('# Basi di dati') && /```schema\n([\s\S]*?)\n```/.exec(value)
      if (m) return JSON.parse(m[1])
    }
    return { nodes: [], edges: [] }
  })
  const dots = dbSchema.nodes.filter((n) => n.shape === 'attribute')
  const dotLine = dbSchema.edges.find((e) => dots.some((d) => d.id === e.from) && dots.some((d) => d.id === e.to))
  check(
    dots.length >= 2 && dotLine?.arrows === 'none' && dots.some((d) => d.text === 'Nome' && d.rot === 2),
    `una linea tra attributi nasce senza punte, e il nome passa dall'altra parte del pallino (${JSON.stringify(dotLine)})`,
  )
  const studente = dbSchema.nodes.find((n) => n.shape === 'table')
  check(
    studente?.h === 28 + 4 * 22 + 10 && tableLabel.underlined === 'Matricola' && tableLabel.fk,
    `la tabella si allunga con i campi, sottolinea la chiave primaria e segna quella esterna (${studente?.h}, ${JSON.stringify(tableLabel)})`,
  )
  check(
    curvedPath && dotLine?.route === 'curved' && dotLine?.at === 'end',
    `«Curva» disegna la freccia morbida e il testo si sposta alla fine (${dotLine?.route}, ${dotLine?.at})`,
  )
  const cardinalities = dbSchema.edges.filter((e) => e.text === '(0,N)')
  check(
    cardinalities.length === 2 && cardinalities.every((e) => e.arrows === 'none') && dbSchema.nodes.some((n) => n.shape === 'identifier' && n.text === 'Matricola'),
    'il modello «Schema E-R» mette entità, relazione, cardinalità e attributi a pallino',
  )
  await db.waitForSelector('.preview-pane .schema-block > svg')
  const dbPreview = await db.evaluate(() => [...document.querySelectorAll('.preview-pane .schema-block foreignObject')].map((f) => f.textContent))
  await db.locator('.preview-pane .schema-block').hover()
  await db.locator('.preview-pane .schema-edit').click()
  await dbEditor.waitFor()
  check(
    dbPreview.includes('Corso') && (await tableItem.isVisible()),
    'l\'anteprima disegna le forme dei database, e riaprendo l\'editor «Basi di dati» è ancora aperto',
  )
  // Il pannello «Tabella»: il tipo, «Aggiungi campo» (Invio sull'ultimo ne aggiunge un altro), la ×,
  // PK ed FK insieme; Ctrl+S da un campo del pannello salva nella nota, un clic sul foglio conferma.
  const studenteHead = await rowAt('Studente')
  await db.mouse.click(studenteHead.x, studenteHead.y)
  // Il nome cambiato sul foglio si vede subito nel pannello; e dal pannello torna com'era.
  await db.mouse.dblclick(studenteHead.x, studenteHead.y)
  await db.keyboard.type('Allievo')
  await db.keyboard.press('Escape')
  const titleFromSheet = await db.locator('.schema-table-section .schema-table-title').inputValue()
  await db.locator('.schema-table-section .schema-table-title').fill('Studente')
  await db.keyboard.press('Enter')
  const fieldRow = (i) => db.locator('.schema-table-section .schema-field').nth(i)
  const panelRows = () =>
    db.evaluate(() =>
      [...document.querySelectorAll('.schema-table-section .schema-field')].map((r) =>
        [r.children[0].getAttribute('aria-pressed') === 'true' ? 'PK' : '', r.children[1].getAttribute('aria-pressed') === 'true' ? 'FK' : '', r.children[2].value, r.children[3].value].join('|'),
      ),
    )
  const panelBefore = await panelRows()
  await fieldRow(0).locator('.schema-field-type').fill('CHAR(6)')
  await db.keyboard.press('Enter')
  const afterEnter = await db.evaluate(() => document.activeElement?.value)
  await db.locator('.schema-table-section .schema-field-add').click()
  await db.keyboard.type('Email')
  await db.keyboard.press('Enter')
  const added = await panelRows()
  await fieldRow(5).locator('.schema-field-remove').click()
  await fieldRow(3).locator('.schema-field-key').first().click()
  await fieldRow(1).locator('.schema-field-type').fill('VARCHAR(30)')
  await db.evaluate(() => window.addEventListener('keydown', (e) => e.key === 's' && (window.__panelS = e), true))
  await db.keyboard.press('Control+s')
  const panelSave = await db.evaluate(() => ({ prevented: window.__panelS?.defaultPrevented, status: document.querySelector('.schema-status').textContent }))
  await fieldRow(2).locator('.schema-field-type').fill('VARCHAR(40)')
  // Un clic sulla tabella stessa: resta selezionata (il pannello non si rifà), ma il campo si conferma.
  const studenteAgain = await rowAt('Studente')
  await db.mouse.click(studenteAgain.x, studenteAgain.y)
  const committedByClick = await db.evaluate(() => [...document.querySelectorAll('.schema-canvas foreignObject')].some((f) => f.textContent.includes('VARCHAR(40)')))
  check(
    titleFromSheet === 'Allievo' && committedByClick,
    `il pannello segue la tabella scritta sul foglio, e un clic sul foglio (anche sulla tabella) conferma subito un campo del pannello (${titleFromSheet}, ${committedByClick})`,
  )
  check(
    panelBefore.join() === 'PK||Matricola|,||Nome|,||Cognome|,|FK|Corso|' &&
      afterEnter === 'Nome' &&
      added.slice(4).join() === '||Email|,||Campo|' &&
      panelSave.prevented &&
      panelSave.status === 'Salvato nella nota',
    `nel pannello si danno i tipi, si aggiungono e si tolgono i campi, e Ctrl+S salva nella nota (${JSON.stringify({ panelBefore, afterEnter, added, panelSave })})`,
  )
  // Il codice SQL: si sceglie il database, si scarica; Glifo si ricorda la scelta.
  await db.locator('.schema-menu-button', { hasText: 'Scarica' }).click()
  await db.locator('.tool-menu-item', { hasText: 'Codice SQL' }).click()
  await db.locator('dialog.dialog-sql select').selectOption('postgresql')
  const [sqlDownload] = await Promise.all([db.waitForEvent('download'), db.locator('dialog.dialog-sql button', { hasText: 'Scarica .sql' }).click()])
  const sqlFile = readFileSync(await sqlDownload.path(), 'utf8')
  await db.keyboard.press('Escape')
  await db.locator('dialog.dialog-sql').waitFor({ state: 'detached' })
  await db.locator('.schema-menu-button', { hasText: 'Scarica' }).click()
  await db.locator('.tool-menu-item', { hasText: 'Codice SQL' }).click()
  const remembered = await db.locator('dialog.dialog-sql select').inputValue()
  await db.keyboard.press('Escape')
  await db.locator('dialog.dialog-sql').waitFor({ state: 'detached' })
  check(
    sqlDownload.suggestedFilename() === 'Basi-di-dati-tabelle.sql' &&
      sqlFile.startsWith('-- Tabelle per PostgreSQL') &&
      sqlFile.includes('CREATE TABLE Studente (\n  Matricola CHAR(6) NOT NULL,') &&
      sqlFile.includes('  PRIMARY KEY (Matricola, Corso)') &&
      sqlFile.includes('«Studente.Corso» è una chiave esterna, ma non si capisce di quale tabella') &&
      remembered === 'postgresql',
    `«Scarica» → «Codice SQL delle tabelle» scarica il codice per il database scelto, e lo ricorda (${sqlDownload.suggestedFilename()}: ${JSON.stringify(sqlFile.slice(0, 400))})`,
  )
  await db.locator('dialog.schema-editor .btn-primary', { hasText: 'Fatto' }).click()
  await dbEditor.waitFor({ state: 'detached' })
  await db.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  const studenteText = await db.evaluate(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const value = localStorage.getItem(localStorage.key(i)) ?? ''
      const m = value.startsWith('# Basi di dati') && /```schema\n([\s\S]*?)\n```/.exec(value)
      if (m) return JSON.parse(m[1]).nodes.find((n) => n.shape === 'table')?.text
    }
    return ''
  })
  check(
    studenteText === 'Studente\nPK Matricola: CHAR(6)\nNome: VARCHAR(30)\nCognome: VARCHAR(40)\nPK FK Corso\nEmail',
    `nella nota la tabella ha i tipi e PK FK, anche il tipo confermato con un clic sul foglio (${JSON.stringify(studenteText)})`,
  )
  // Col cursore subito dopo la riga dello schema, «Titolo» va su una riga nuova: prima la riga ```
  // diventava «## ```» e lo schema tornava testo. (Scrivere sul bordo lo provano i test unitari.)
  await db.locator('.cm-content').click()
  await db.keyboard.press('Control+End')
  await db.keyboard.press('ArrowLeft')
  await db.locator('.editor-toolbar button[aria-label="Titolo (## )"]').click()
  await db.keyboard.type('Dopo lo schema')
  await db.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  const besideText = await db.evaluate(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const value = localStorage.getItem(localStorage.key(i)) ?? ''
      if (value.startsWith('# Basi di dati')) return value
    }
    return ''
  })
  check(
    (await db.locator('.cm-editor .cm-schema').count()) === 1 && /\n```\n## Dopo lo schema\n?$/.test(besideText),
    `col cursore subito dopo uno schema, «Titolo» va su una riga nuova e lo schema resta (${JSON.stringify(besideText.slice(-40))})`,
  )
  await db.close()

  // Calcoli e grafici: il risultato dopo «=» (Tab lo scrive), il grafico della formula nel pannello e
  // nella nota, il disegno nell'anteprima (legenda, coordinate, trascinare e ingrandire), i file .md
  const gp = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  gp.on('pageerror', (e) => errors.push(e.message))
  await gp.goto(url)
  await gp.waitForSelector('.cm-editor')
  await gp.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await gp.keyboard.press('Control+a')
  await gp.keyboard.type('# Grafici\n\nSia $a = 3$ e $f(x) = x^2 - a$. Poi $f(4) =')
  await gp.waitForSelector('.cm-calc-result')
  await gp.waitForFunction(() => document.querySelector('.markdown-body .calc-result'), null, { timeout: 5000 })
  const ghost = await gp.locator('.cm-calc-result').innerText()
  const previewResult = await gp.locator('.markdown-body .calc-result').innerText()
  check(
    ghost.startsWith('13') && ghost.includes('Tab') && previewResult.includes('13'),
    `dopo «=» il risultato si vede nell'editor (con Tab) e nell'anteprima (${JSON.stringify({ ghost, previewResult })})`,
  )
  await gp.keyboard.press('Tab')
  const calcLine = await gp.locator('.cm-line', { hasText: 'Poi' }).innerText()
  // Dopo la formula c'è il segno del controllo (✓), che non è nel testo.
  const calcText = calcLine.replace(/\s*✓\s*$/, '')
  check(calcText.endsWith('$f(4) = 13$') && (await gp.locator('.cm-calc-result').count()) === 0, `Tab scrive il risultato nella formula (${JSON.stringify(calcLine)})`)
  await gp.waitForFunction(() => document.querySelector('.markdown-body .calc-check.is-ok'), null, { timeout: 5000 })
  check(
    (await gp.locator('.cm-calc-check.is-ok').count()) === 1 && /✓\s*$/.test(calcLine),
    'scritto il risultato, Glifo lo controlla: ✓ nell\'editor e nell\'anteprima',
  )
  // Con il cursore su f(x) = x^2 - a il pannello ne mostra il grafico; «Inserisci il grafico» lo mette nella nota
  // (Ctrl+Inizio e giù: Inizio da solo, con le righe che vanno a capo, va all'inizio della riga visibile.)
  await gp.keyboard.press('Control+Home')
  await gp.keyboard.press('ArrowDown')
  await gp.keyboard.press('ArrowDown')
  for (let i = 0; i < 24; i++) await gp.keyboard.press('ArrowRight')
  await gp.waitForSelector('.formula-graph:not([hidden]) svg', { timeout: 5000 })
  await gp.locator('.formula-graph-insert').click()
  await gp.waitForSelector('.preview-pane .graph-block svg.graph-svg', { timeout: 5000 })
  const graphNote = () =>
    gp.evaluate(() => {
      for (let i = 0; i < localStorage.length; i++) {
        const value = localStorage.getItem(localStorage.key(i)) ?? ''
        if (value.startsWith('# Grafici')) return value
      }
      return ''
    })
  await gp.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  const legend = await gp.locator('.preview-pane .graph-legend').innerText()
  check(
    (await graphNote()).includes('$f(4) = 13$\n\n```grafico\nf(x) = x^2 - a\n```\n') && legend.includes('f(x)'),
    `«Inserisci il grafico» mette la funzione in un blocco sotto la formula, e l'anteprima la disegna (${JSON.stringify(legend)})`,
  )
  // Passando sopra la curva: le coordinate del punto
  const onCurve = await gp.evaluate(() => {
    const path = document.querySelector('.preview-pane .graph-block path[data-item="0"]')
    const p = path.getPointAtLength(path.getTotalLength() / 2)
    const m = path.getScreenCTM()
    return { x: p.x * m.a + m.e, y: p.y * m.d + m.f }
  })
  await gp.mouse.move(onCurve.x, onCurve.y)
  await gp.waitForSelector('.preview-pane .graph-tip:not([hidden])', { timeout: 5000 })
  const tip = await gp.locator('.preview-pane .graph-tip').innerText()
  check(/^\(−?\d+(,\d+)?; −?\d+(,\d+)?\)$/.test(tip), `passando sopra la curva si vedono le coordinate (${tip})`)
  // Trascinare sposta il grafico; + lo ingrandisce; il pulsante con la freccia torna alla vista di partenza
  const graphBox = await gp.locator('.preview-pane .graph-canvas').boundingBox()
  await gp.mouse.move(graphBox.x + graphBox.width / 2, graphBox.y + graphBox.height / 2)
  await gp.mouse.down()
  await gp.mouse.move(graphBox.x + graphBox.width / 2 + 120, graphBox.y + graphBox.height / 2 + 30, { steps: 5 })
  await gp.mouse.up()
  const resetButton = gp.locator('.preview-pane .graph-block [data-action="reset"]')
  await resetButton.waitFor({ state: 'visible', timeout: 5000 })
  const pannedSvg = await gp.locator('.preview-pane .graph-canvas svg').innerHTML()
  await gp.locator('.preview-pane .graph-block [data-action="in"]').click()
  await gp.waitForFunction((before) => document.querySelector('.preview-pane .graph-canvas svg')?.innerHTML !== before, pannedSvg, { timeout: 5000 })
  await resetButton.click()
  await gp.waitForFunction(() => document.querySelector('.preview-pane .graph-block [data-action="reset"]')?.hidden, null, { timeout: 5000 })
  check(true, 'il grafico si trascina e si ingrandisce, e torna alla vista di partenza')
  // «Scarica» → «Immagine PNG»: il grafico come figura chiara su bianco
  await gp.locator('.preview-pane .graph-block').first().hover()
  await gp.locator('.preview-pane .graph-block [data-action="image"]').first().click()
  const [graphDownload] = await Promise.all([
    gp.waitForEvent('download', { timeout: 10000 }),
    gp.locator('.tool-menu[aria-label="Scarica il grafico"] .tool-menu-item', { hasText: 'Immagine PNG' }).click(),
  ])
  const png = readFileSync(await graphDownload.path())
  check(
    graphDownload.suggestedFilename() === 'grafico.png' && png.subarray(1, 4).toString() === 'PNG' && png.readUInt32BE(16) === 1280,
    `«Scarica» dà il grafico come immagine PNG larga 1280 pixel (${graphDownload.suggestedFilename()}, ${png.length} byte)`,
  )
  // Lo slider di a ($a = 3$ nella nota): con le frecce il grafico cambia e la nota no; ▶ lo muove da
  // solo; la freccia lo riporta al valore scritto
  const slider = gp.locator('.preview-pane .graph-block').first().locator('.graph-slider')
  const sliderValue = () => slider.locator('.graph-slider-value').inputValue()
  check((await slider.count()) === 1 && (await sliderValue()) === '3', `sotto il grafico c'è lo slider di a, con il valore scritto (${await sliderValue()})`)
  const curvePath = () => gp.evaluate(() => document.querySelector('.preview-pane .graph-block path[data-item="0"]')?.getAttribute('d'))
  const writtenCurve = await curvePath()
  const noteBeforeSlider = await graphNote()
  await slider.locator('.graph-slider-input').focus()
  for (let i = 0; i < 5; i++) await gp.keyboard.press('ArrowRight')
  await gp.waitForFunction((d) => document.querySelector('.preview-pane .graph-block path[data-item="0"]')?.getAttribute('d') !== d, writtenCurve, { timeout: 5000 })
  const slid = await sliderValue()
  check(slid === '3,5' && (await graphNote()) === noteBeforeSlider, `con lo slider il grafico cambia e la nota resta com'è (${slid})`)
  await slider.locator('[data-action="play"]').click()
  await gp.waitForFunction(() => document.querySelector('.preview-pane .graph-slider-value')?.value !== '3,5', null, { timeout: 5000 })
  await slider.locator('[data-action="play"]').click()
  await slider.locator('[data-action="written"]').click()
  await gp.waitForFunction((d) => document.querySelector('.preview-pane .graph-block path[data-item="0"]')?.getAttribute('d') === d, writtenCurve, { timeout: 5000 })
  check((await sliderValue()) === '3', '▶ muove lo slider da solo, e la freccia lo riporta al valore scritto')
  // Il valore si può scrivere: un clic sulla casella, il numero nuovo prende il posto di quello di
  // prima, Invio; un valore fuori dallo slider lo allarga; la freccia rimette anche gli estremi
  const sliderMax = () => slider.locator('.graph-slider-input').getAttribute('max')
  await slider.locator('.graph-slider-value').click()
  await gp.keyboard.type('-1,5')
  await gp.keyboard.press('Enter')
  await gp.waitForFunction((d) => document.querySelector('.preview-pane .graph-block path[data-item="0"]')?.getAttribute('d') !== d, writtenCurve, { timeout: 5000 })
  const typed = await sliderValue()
  check(typed === '−1,5' && (await graphNote()) === noteBeforeSlider, `il valore si scrive accanto allo slider, e la nota resta com'è (${typed})`)
  await slider.locator('.graph-slider-value').click()
  await gp.keyboard.type('25')
  await gp.keyboard.press('Enter')
  const widened = [await sliderValue(), await sliderMax()]
  check(widened.join(' ') === '25 25', `un valore scritto fuori dallo slider lo allarga (${widened.join(', ')})`)
  await slider.locator('[data-action="written"]').click()
  await gp.waitForFunction((d) => document.querySelector('.preview-pane .graph-block path[data-item="0"]')?.getAttribute('d') === d, writtenCurve, { timeout: 5000 })
  check((await sliderValue()) === '3' && (await sliderMax()) === '10', 'la freccia rimette il valore e gli estremi scritti')
  // Il pulsante «Grafico» lontano da una formula prepara un blocco con «y = » da completare
  await gp.locator('.cm-content').click()
  await gp.keyboard.press('Control+End')
  await gp.locator('.editor-toolbar button[aria-label^="Grafico"]').click()
  await gp.keyboard.type('\\sin x')
  await gp.waitForFunction(() => document.querySelectorAll('.preview-pane .graph-block svg.graph-svg').length === 2, null, { timeout: 5000 })
  const piTicks = await gp.locator('.preview-pane .graph-block').nth(1).locator('svg text', { hasText: 'π' }).count()
  await gp.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  check(
    (await graphNote()).endsWith('```\n\n```grafico\ny = \\sin x\n```\n') && piTicks >= 2,
    `il pulsante «Grafico» prepara il blocco e \\sin x ha le tacche in π (${JSON.stringify({ piTicks, note: (await graphNote()).slice(-60) })})`,
  )
  // Un nome che manca (k non è definita): «Aggiungi lo slider per k» scrive k = 1 nel blocco, e lo slider c'è
  await gp.keyboard.press('Control+End')
  await gp.locator('.editor-toolbar button[aria-label^="Grafico"]').click()
  await gp.keyboard.type('k(x - 1)')
  await gp.locator('.preview-pane .graph-add-slider').click({ timeout: 5000 })
  await gp.waitForFunction(() => document.querySelectorAll('.preview-pane .graph-block')[2]?.querySelector('.graph-slider'), null, { timeout: 5000 })
  await gp.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  check(
    (await graphNote()).endsWith('```grafico\nk = 1\ny = k(x - 1)\n```\n') && !(await gp.locator('.preview-pane .graph-errors').count()),
    `«Aggiungi lo slider per k» scrive k = 1 nel blocco (${JSON.stringify((await graphNote()).slice(-40))})`,
  )
  // «Salva .md»: ogni grafico è un'immagine con il suo testo nascosto; «Apri .md» lo riporta
  await gp.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  await gp.evaluate(() => {
    window.showSaveFilePicker = async () => ({
      name: 'grafici.md',
      createWritable: async () => ({ write: async (text) => (window.savedFile = text), close: async () => {} }),
    })
  })
  await gp.locator('button', { hasText: 'Salva .md' }).click()
  await gp.waitForFunction(() => typeof window.savedFile === 'string', null, { timeout: 10000 })
  const graphFile = await gp.evaluate(() => window.savedFile)
  const graphPictures = [...graphFile.matchAll(/^!\[Grafico\]\(data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+)\)\n<!-- glifo-grafico/gm)]
  const firstGraphSvg = graphPictures.length ? Buffer.from(graphPictures[0][1], 'base64').toString('utf8') : ''
  check(
    graphPictures.length === 3 && !graphFile.includes('```grafico') && firstGraphSvg.includes('<math') && firstGraphSvg.includes('fill="#ffffff"'),
    `nel file .md i grafici sono immagini con la legenda, e il testo nascosto (${graphPictures.length})`,
  )
  const vsGraphs = new MarkdownIt({ html: true })
  const validateGraphLink = vsGraphs.validateLink
  vsGraphs.validateLink = (link) => validateGraphLink(link) || /^data:image\/.*?;/.test(link)
  const vscodeGraphs = await browser.newPage()
  await vscodeGraphs.setContent(`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self' https: data:">${vsGraphs.render(graphFile)}`)
  const graphImages = await vscodeGraphs.evaluate(async () => {
    const imgs = [...document.querySelectorAll('img')]
    await Promise.all(imgs.map((img) => img.decode().catch(() => {})))
    return { widths: imgs.map((img) => img.naturalWidth), text: document.body.innerText.includes('\\sin x') }
  })
  await vscodeGraphs.close()
  check(graphImages.widths.length === 3 && graphImages.widths.every((w) => w >= 600) && !graphImages.text, `in VS Code si vedono i grafici e non il loro testo (${JSON.stringify(graphImages)})`)
  await gp.evaluate((text) => {
    window.showOpenFilePicker = async () => [{ getFile: async () => new File([text], 'grafici.md') }]
  }, graphFile)
  await gp.locator('button', { hasText: 'Apri .md' }).click()
  await gp.waitForFunction(
    () => [...Array(localStorage.length).keys()].filter((i) => localStorage.getItem(localStorage.key(i))?.startsWith('# Grafici')).length === 2,
    null,
    { timeout: 10000 },
  )
  const reopened = await gp.evaluate(() =>
    [...Array(localStorage.length).keys()].map((i) => localStorage.getItem(localStorage.key(i))).filter((v) => v?.startsWith('# Grafici')),
  )
  check(reopened[0] === reopened[1], 'riaprendo il file i grafici tornano blocchi ```grafico, come prima')
  // Un integrale: il risultato dopo «=», la sua area nel pannello e, con «Inserisci il grafico», nella nota
  await gp.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await gp.keyboard.press('Control+a')
  await gp.keyboard.type('# Area\n\nVale $\\int_0^2 x^2 \\, dx =')
  await gp.waitForSelector('.cm-calc-result')
  await gp.waitForSelector('.formula-graph:not([hidden]) svg path[data-area]', { timeout: 5000 })
  await gp.locator('.formula-graph-insert').click()
  await gp.waitForSelector('.preview-pane .graph-block .graph-swatch.is-area', { timeout: 5000 })
  await gp.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  const areaLegend = await gp.locator('.preview-pane .graph-legend').innerText()
  const areaNote = await gp.evaluate(() =>
    [...Array(localStorage.length).keys()].map((i) => localStorage.getItem(localStorage.key(i)) ?? '').find((v) => v.startsWith('# Area')),
  )
  check(
    areaNote?.includes('```grafico\n\\int_0^2 x^2 \\, dx\n```') && areaLegend.includes('2,666666') && (await gp.locator('.preview-pane .graph-block path[data-area]').count()) === 1,
    `un integrale ha la sua area nel pannello e nella nota, con il valore nella legenda (${JSON.stringify({ areaLegend, note: areaNote?.slice(-50) })})`,
  )
  // Un grafico 3D: la superficie della formula nel pannello e, con «Inserisci il grafico», nella
  // nota; trascinandolo si gira, il pulsante con la freccia lo riporta com'era.
  await gp.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await gp.keyboard.press('Control+a')
  await gp.keyboard.type('# Superficie\n\nLa sella $z = x^2 - y^2$')
  await gp.keyboard.press('ArrowLeft')
  await gp.waitForSelector('.formula-graph:not([hidden]) svg.graph-3d', { timeout: 5000 })
  await gp.locator('.formula-graph-insert').click()
  await gp.waitForSelector('.preview-pane .graph-block.is-space svg.graph-3d', { timeout: 5000 })
  await gp.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  const spaceNote = await gp.evaluate(() =>
    [...Array(localStorage.length).keys()].map((i) => localStorage.getItem(localStorage.key(i)) ?? '').find((v) => v.startsWith('# Superficie')),
  )
  const spaceCanvas = gp.locator('.preview-pane .graph-block.is-space .graph-canvas')
  const spaceBefore = await spaceCanvas.innerHTML()
  const spaceBox = await spaceCanvas.boundingBox()
  await gp.mouse.move(spaceBox.x + spaceBox.width / 2, spaceBox.y + spaceBox.height / 2)
  await gp.mouse.down()
  await gp.mouse.move(spaceBox.x + spaceBox.width / 2 + 80, spaceBox.y + spaceBox.height / 2 + 20, { steps: 6 })
  await gp.mouse.up()
  const spaceReset = gp.locator('.preview-pane .graph-block.is-space [data-action="reset"]')
  await gp.waitForFunction(() => !document.querySelector('.preview-pane .graph-block.is-space [data-action="reset"]')?.hidden, null, { timeout: 5000 })
  const turned = (await spaceCanvas.innerHTML()) !== spaceBefore
  await spaceReset.click()
  await gp.waitForFunction((before) => document.querySelector('.preview-pane .graph-block.is-space .graph-canvas')?.innerHTML === before, spaceBefore, { timeout: 5000 })
  check(
    spaceNote?.includes('```grafico\nz = x^2 - y^2\n```') && turned && (await gp.locator('.preview-pane .graph-block.is-space .graph-swatch.is-surface').count()) === 1,
    `una superficie si disegna in 3D, nel pannello e nella nota, e si gira trascinandola (${JSON.stringify({ turned, note: spaceNote?.slice(-40) })})`,
  )
  // Un integrale doppio: il risultato dopo «=», il volume sotto la superficie nel pannello e, con
  // «Inserisci il grafico», nella nota; una disuguaglianza è una zona con il bordo tratteggiato.
  await gp.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await gp.keyboard.press('Control+a')
  await gp.keyboard.type('# Volume\n\nVale $\\iint_{x^2 + y^2 \\le 1} (2 - x^2 - y^2) \\, dA =')
  await gp.waitForSelector('.cm-calc-result')
  const volumeResult = await gp.locator('.cm-calc-result').first().innerText()
  await gp.waitForSelector('.formula-graph:not([hidden]) svg.graph-3d', { timeout: 5000 })
  await gp.locator('.formula-graph-insert').click()
  await gp.waitForSelector('.preview-pane .graph-block.is-space .graph-swatch.is-surface', { timeout: 5000 })
  await gp.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  const volumeLegend = await gp.locator('.preview-pane .graph-legend').innerText()
  const volumeNote = await gp.evaluate(() =>
    [...Array(localStorage.length).keys()].map((i) => localStorage.getItem(localStorage.key(i)) ?? '').find((v) => v.startsWith('# Volume')),
  )
  await gp.locator('.cm-content').click()
  await gp.keyboard.press('Control+End')
  await gp.keyboard.type('\n\nLa zona $y > x^2$')
  await gp.keyboard.press('ArrowLeft')
  await gp.waitForSelector('.formula-graph:not([hidden]) svg path[data-area]', { timeout: 5000 })
  const dashed = await gp.locator('.formula-graph svg path[stroke-dasharray]').count()
  check(
    volumeResult.includes('4,712389') &&
      volumeNote?.includes('```grafico\n\\iint_{x^2 + y^2 \\le 1} (2 - x^2 - y^2) \\, dA\n```') &&
      volumeLegend.includes('4,712389') &&
      dashed === 1,
    `un integrale doppio ha il valore e il volume, nel pannello e nella nota; y > x^2 è una zona tratteggiata (${JSON.stringify({ volumeResult, volumeLegend, dashed, note: volumeNote?.slice(-70) })})`,
  )
  // I numeri complessi: il risultato dopo «=», il numero nel piano di Gauss nel pannello (con le sue
  // forme sotto) e, con «Inserisci il grafico», nella nota.
  await gp.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await gp.keyboard.press('Control+a')
  await gp.keyboard.type('# Complessi\n\nVale $(1 + 2i)(3 - i) =')
  await gp.waitForSelector('.cm-calc-result')
  const complexResult = await gp.locator('.cm-calc-result').first().innerText()
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nIl numero $1 + i$')
  await gp.keyboard.press('ArrowLeft')
  await gp.waitForSelector('.formula-graph:not([hidden]) .formula-graph-caption:not([hidden])', { timeout: 5000 })
  const gaussAxes = await gp.locator('.formula-graph svg text').evaluateAll((els) => els.map((e) => e.textContent))
  const caption = await gp.locator('.formula-graph-caption').innerText()
  await gp.locator('.formula-graph-insert').click()
  await gp.waitForSelector('.preview-pane .graph-block .graph-legend', { timeout: 5000 })
  await gp.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  const complexNote = await gp.evaluate(() =>
    [...Array(localStorage.length).keys()].map((i) => localStorage.getItem(localStorage.key(i)) ?? '').find((v) => v.startsWith('# Complessi')),
  )
  check(
    complexResult.includes('5 + 5i') && gaussAxes.includes('Re') && gaussAxes.includes('Im') && caption.includes('π') && complexNote?.includes('```grafico\n1 + i\n```'),
    `un numero complesso ha il risultato, il piano di Gauss nel pannello con le sue forme e nella nota (${JSON.stringify({ complexResult, caption, note: complexNote?.slice(-40) })})`,
  )
  // Le matrici: l'inversa con le frazioni, disegnata nell'editor (KaTeX); un vettore nel pannello è una freccia.
  await gp.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await gp.keyboard.press('Control+a')
  await gp.keyboard.type('# Matrici\n\nSia $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$, allora $A^{-1} =')
  await gp.waitForSelector('.cm-calc-result.is-rich .katex', { timeout: 5000 })
  const inverse = await gp.locator('.cm-calc-result.is-rich').first().getAttribute('aria-label')
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nIl vettore $v = (2, 1)$')
  await gp.keyboard.press('ArrowLeft')
  await gp.waitForSelector('.formula-graph:not([hidden]) svg', { timeout: 5000 })
  const arrows = await gp.locator('.formula-graph svg path[fill]:not([fill="none"])').count()
  check(inverse === '(2/3  −1/3 ; −1/3  2/3)' && arrows > 0, `l'inversa di una matrice ha le frazioni ed è disegnata; un vettore è una freccia (${JSON.stringify({ inverse, arrows })})`)
  // La geometria: l'area del triangolo dopo «=»; nel pannello il triangolo con i vertici della nota
  // (con il nome) e, con «Inserisci il grafico», nella nota con l'area nella legenda.
  await gp.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await gp.keyboard.press('Control+a')
  await gp.keyboard.type("# Geometria\n\nSiano $A = (0, 0)$, $B = (4, 0)$ e $C = (1, 3)$: l'area è $\\triangle ABC =")
  await gp.waitForSelector('.cm-calc-result')
  const triangleArea = await gp.locator('.cm-calc-result').first().innerText()
  await gp.waitForSelector('.formula-graph:not([hidden]) svg path[data-area]', { timeout: 5000 })
  const vertexNames = await gp.locator('.formula-graph svg text').evaluateAll((els) => els.map((e) => e.textContent))
  await gp.locator('.formula-graph-insert').click()
  await gp.waitForSelector('.preview-pane .graph-block .graph-legend', { timeout: 5000 })
  await gp.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
  const triangleLegend = await gp.locator('.preview-pane .graph-legend').innerText()
  const triangleNote = await gp.evaluate(() =>
    [...Array(localStorage.length).keys()].map((i) => localStorage.getItem(localStorage.key(i)) ?? '').find((v) => v.startsWith('# Geometria')),
  )
  check(
    triangleArea.replace('Tab', '') === '6' &&
      ['A', 'B', 'C'].every((n) => vertexNames.includes(n)) &&
      triangleLegend.includes('area') &&
      triangleNote?.includes('```grafico\n\\triangle ABC\n```'),
    `un triangolo ha l'area, e nel grafico i vertici con il nome (${JSON.stringify({ triangleArea, vertexNames, triangleLegend, note: triangleNote?.slice(-40) })})`,
  )
  // Le derivate con le lettere (disegnate nell'editor), il gradiente e il lavoro lungo una curva;
  // nel pannello il campo con le frecce e la curva con il verso.
  await gp.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await gp.keyboard.press('Control+a')
  await gp.keyboard.type("# Campi\n\nSia $f(x) = x^3$: $f'(x) =")
  await gp.waitForSelector('.cm-calc-result.is-rich .katex', { timeout: 5000 })
  const derivative = await gp.locator('.cm-calc-result.is-rich').first().getAttribute('aria-label')
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nIl campo $F(x, y) = (-y, x)$ e la curva $\\gamma(t) = (\\cos t, \\sin t), \\; t \\in [0, 2\\pi]$. Il lavoro: $\\oint_\\gamma F \\cdot dr =')
  await gp.waitForFunction(() => [...document.querySelectorAll('.cm-calc-result')].some((e) => e.textContent?.includes('6,283185')), null, { timeout: 5000 })
  await gp.waitForSelector('.formula-graph:not([hidden]) svg path[stroke-width="1.6"]', { timeout: 5000 })
  const fieldArrows = await gp.locator('.formula-graph svg path[stroke-width="1.6"]').count()
  const workLegend = await gp.locator('.formula-graph-caption, .formula-graph').first().innerText()
  check(
    derivative === '3x²' && fieldArrows > 0,
    `una derivata ha il risultato con le lettere, e il lavoro lungo una curva il valore e il campo nel pannello (${JSON.stringify({ derivative, fieldArrows, workLegend: workLegend.slice(0, 80) })})`,
  )
  // Analisi: un limite dopo «=», le soluzioni di un'equazione dopo ⇒ e, nel pannello, il campo di
  // direzioni di un'equazione differenziale con la soluzione dal punto iniziale.
  await gp.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await gp.keyboard.press('Control+a')
  await gp.keyboard.type('# Analisi\n\nIl limite $\\lim_{x \\to 0} \\frac{\\sin x}{x} =')
  await gp.waitForSelector('.cm-calc-result', { timeout: 5000 })
  const limitResult = await gp.locator('.cm-calc-result').first().innerText()
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nLe soluzioni: $x^2 - 5x + 6 = 0 \\Rightarrow')
  await gp.waitForFunction(() => [...document.querySelectorAll('.cm-calc-result')].some((e) => e.textContent?.includes('x = 2 ∨ x = 3')), null, { timeout: 5000 })
  await gp.keyboard.press('End')
  await gp.keyboard.type("\n\nL'equazione $y' = x - y, \\; y(0) = 1$")
  await gp.keyboard.press('ArrowLeft')
  await gp.waitForSelector('.formula-graph:not([hidden]) svg [stroke-opacity="0.55"]', { timeout: 5000 })
  const startDots = await gp.locator('.formula-graph svg circle[r="4"]').count()
  check(
    limitResult.replace('Tab', '') === '1' && startDots === 1,
    `un limite ha il risultato, un'equazione le soluzioni e un'equazione differenziale il campo di direzioni (${JSON.stringify({ limitResult, startDots })})`,
  )
  // Il polinomio di Taylor: dalla potenza più bassa e, nel pannello, con la funzione da cui viene.
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nTaylor: $\\operatorname{taylor}(\\sin x, 0, 3) =')
  // Il risultato con le lettere è disegnato (KaTeX): il testo è nell'aria-label.
  await gp.waitForFunction(() => [...document.querySelectorAll('.cm-calc-result')].some((e) => e.getAttribute('aria-label') === 'x − x³/6'), null, { timeout: 5000 })
  await gp.waitForSelector('.formula-graph:not([hidden]) svg [data-item="1"]', { timeout: 5000 })
  const taylorCurves = await gp.locator('.formula-graph svg path[data-item]').evaluateAll((els) => new Set(els.map((e) => e.getAttribute('data-item'))).size)
  check(taylorCurves === 2, `il polinomio di Taylor ha il risultato e nel pannello la funzione e il polinomio (${taylorCurves} curve)`)
  // Le primitive: la funzione con la costante e, nel pannello, il grafico; un integrale definito esatto.
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nPer parti: $\\int x e^x \\, dx =')
  await gp.waitForFunction(() => [...document.querySelectorAll('.cm-calc-result')].some((e) => e.getAttribute('aria-label') === '(x − 1)e^(x) + c'), null, { timeout: 5000 })
  await gp.waitForSelector('.formula-graph:not([hidden]) svg path[data-item]', { timeout: 5000 })
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nEsatto: $\\int_0^1 \\frac{dx}{1 + x^2} =')
  const exactIntegral = await gp
    .waitForFunction(() => [...document.querySelectorAll('.cm-calc-result')].map((e) => e.getAttribute('aria-label') ?? '').find((t) => t.startsWith('π/4')), null, { timeout: 5000 })
    .then((h) => h.jsonValue())
  check(exactIntegral === 'π/4 ≈ 0,785398…', `una primitiva ha la costante e il grafico nel pannello, un integrale definito il valore esatto (${exactIntegral})`)
  // Lo studio di funzione: le righe nella nota e, nel pannello, gli asintoti tratteggiati e i punti notevoli.
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nStudio: $\\operatorname{studio}(\\frac{x^2 + 1}{x}) =')
  const studyRows = await gp
    .waitForFunction(() => [...document.querySelectorAll('.cm-calc-result')].map((e) => e.getAttribute('aria-label') ?? '').find((t) => t.startsWith('Dominio')), null, { timeout: 8000 })
    .then((h) => h.jsonValue())
  // Un asintoto verticale è largo zero: per Playwright non «si vede», quindi basta che ci sia.
  await gp.waitForSelector('.formula-graph:not([hidden]) svg path[stroke-dasharray="7 5"]', { state: 'attached', timeout: 5000 })
  const asymptotes = await gp.locator('.formula-graph svg path[stroke-dasharray="7 5"]').count()
  const namedPoints = await gp.locator('.formula-graph svg text').evaluateAll((els) => els.map((e) => e.textContent).filter((t) => t === 'M' || t === 'm'))
  check(
    studyRows.includes('Asintoti: x = 0 verticale; y = x (x → ±∞) obliquo') && studyRows.includes('massimo (−1; −2); minimo (1; 2)') && asymptotes === 2 && namedPoints.length === 2,
    `lo studio di funzione ha le righe e nel pannello gli asintoti tratteggiati e i punti (${JSON.stringify({ studyRows: studyRows.slice(0, 60), asymptotes, namedPoints })})`,
  )
  // La probabilità: una variabile aleatoria, P(…) esatta e, nel pannello, le barre con l'evento colorato
  // (i risultati scritti come testo hanno il testo, quelli disegnati l'aria-label).
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nLa binomiale $X \\sim B(4, \\frac{1}{2})$ e $P(X \\le 1) =')
  const probability = await gp
    .waitForFunction(() => [...document.querySelectorAll('.cm-calc-result')].map((e) => (e.getAttribute('aria-label') ?? e.textContent ?? '').replace(/Tab$/, '')).find((t) => t.startsWith('5/16')), null, { timeout: 8000 })
    .then((h) => h.jsonValue())
  await gp.waitForSelector('.formula-graph:not([hidden]) svg path[data-area]', { state: 'attached', timeout: 5000 })
  const barGroups = await gp.locator('.formula-graph svg path[data-area]').count()
  // I dati: la media e i quartili.
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nI dati $x = (2, 3, 5, 7, 7, 9)$ e $\\operatorname{quartili}(x) =')
  const quartiles = await gp
    .waitForFunction(() => [...document.querySelectorAll('.cm-calc-result')].map((e) => (e.getAttribute('aria-label') ?? e.textContent ?? '').replace(/Tab$/, '')).find((t) => t.startsWith('Q₁')), null, { timeout: 8000 })
    .then((h) => h.jsonValue())
  check(
    probability === '5/16 = 0,3125' && barGroups === 2 && quartiles === 'Q₁ = 3,5; Q₂ = 6; Q₃ = 7',
    `la probabilità è esatta, con le barre nel pannello, e i dati hanno i quartili (${JSON.stringify({ probability, barGroups, quartiles })})`,
  )
  // L'algebra lineare: un sistema con un parametro discusso al variare di k, e una matrice diagonalizzata.
  const resultText = (prefix) =>
    gp
      .waitForFunction((p) => [...document.querySelectorAll('.cm-calc-result')].map((e) => (e.getAttribute('aria-label') ?? e.textContent ?? '').replace(/Tab$/, '')).find((t) => t.startsWith(p)), prefix, { timeout: 8000 })
      .then((h) => h.jsonValue())
  // In una nota nuova: in quella di prima x è il vettore dei dati.
  await gp.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await gp.keyboard.press('Control+a')
  await gp.keyboard.type('# Algebra lineare\n\nIl sistema $x + k y = 1, \\; k x + y = 1 \\Rightarrow')
  const discussion = await resultText('k ≠')
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nLa matrice $M = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$ e $\\operatorname{diagonalizza}(M) =')
  const diagonal = await resultText('P =')
  check(
    discussion.startsWith('k ≠ −1, k ≠ 1: x = 1/(k + 1)') && diagonal.startsWith('P = (−1  1 ; 1  1), D = (1  0 ; 0  3)'),
    `un sistema con un parametro si discute al variare di k, e una matrice si diagonalizza (${JSON.stringify({ discussion: discussion.slice(0, 50), diagonal: diagonal.slice(0, 50) })})`,
  )
  // Le equazioni differenziali con la formula, e il ritratto di fase di un sistema nel pannello.
  await gp.keyboard.press('End')
  await gp.keyboard.type("\n\nL'oscillatore smorzato $y'' + 2y' + 5y = 0 \\Rightarrow")
  const ode = await resultText('y = e^(−x)')
  await gp.keyboard.press('End')
  await gp.keyboard.type("\n\nIl pendolo $x' = y, \\; y' = -\\sin x")
  await gp.waitForSelector('.formula-graph:not([hidden]) svg circle[r="4.5"]', { state: 'attached', timeout: 5000 })
  const equilibria = await gp.locator('.formula-graph svg circle[r="4.5"]').count()
  check(
    ode === 'y = e^(−x)(c₁ cos(2x) + c₂ sin(2x))' && equilibria >= 1,
    `un'equazione differenziale si risolve con la formula, e un sistema ha il ritratto di fase con i punti di equilibrio (${JSON.stringify({ ode, equilibria })})`,
  )
  // In più variabili: i punti critici con la loro natura e, nel pannello, le curve di livello con i punti.
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nI punti critici $\\operatorname{critici}(x^3 + y^3 - 3xy) =')
  const critical = await resultText('(0, 0)')
  await gp.waitForFunction(() => [...document.querySelectorAll('.formula-graph:not([hidden]) svg text')].some((t) => t.textContent === 'S'), null, { timeout: 5000 })
  const pointNames = await gp.locator('.formula-graph svg text').evaluateAll((els) => els.map((e) => e.textContent).filter((t) => t === 'S' || t === 'm'))
  check(
    critical === '(0, 0) punto di sella; (1, 1) minimo relativo, f = −1' && pointNames.length === 2,
    `i punti critici hanno la loro natura, e nel pannello si vedono sulle curve di livello (${JSON.stringify({ critical, pointNames })})`,
  )
  // Una conica: il tipo e gli elementi, e nel pannello la curva con il centro e i fuochi.
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nLa conica $\\operatorname{conica}(x^2 + 4y^2 = 4) =')
  const conic = await resultText('ellisse')
  await gp.waitForFunction(() => [...document.querySelectorAll('.formula-graph:not([hidden]) svg text')].some((t) => t.textContent === 'C'), null, { timeout: 5000 })
  check(conic.startsWith('ellisse; x²/4 + y² = 1; C = (0, 0)'), `una conica ha il tipo, la forma canonica e gli elementi, e il centro nel pannello (${JSON.stringify(conic.slice(0, 40))})`)
  // I polinomi e la logica: una scomposizione e una tavola di verità (disegnata con KaTeX).
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nScomposto $\\operatorname{scomponi}(a^2 - b^2) =')
  const factored = await resultText('(a')
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nIl modus ponens $(p \\Rightarrow q) \\land p \\Rightarrow q =')
  const truth = await resultText('tautologia')
  const table = await gp.locator('.cm-calc-result.is-rich .katex').last().evaluate((e) => e.querySelectorAll('.mord').length)
  check(
    factored === '(a − b)(a + b)' && truth.startsWith('tautologia') && table > 20,
    `un polinomio si scompone e una formula della logica ha la tavola di verità (${JSON.stringify({ factored, truth: truth.slice(0, 30), table })})`,
  )
  // Una serie di potenze, la trasformata di Laplace e la serie di Fourier con la somma nel pannello.
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nLa serie $\\sum_{n=1}^{\\infty} \\frac{x^n}{n} =')
  const power = await resultText('R = 1')
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nLaplace $\\mathcal{L}\\{t e^{-t}\\} =')
  const laplace = await resultText('1/(s')
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nFourier $\\operatorname{fourier}(x^2) =')
  const fourier = await resultText('a₀')
  await gp.waitForSelector('.formula-graph:not([hidden]) svg path', { state: 'attached', timeout: 5000 })
  check(
    power.startsWith('R = 1; converge per x ∈ [−1, 1)') && laplace === '1/(s + 1)²' && fourier.startsWith('a₀ = (2π²)/3; aₙ = (4(−1)^(n))/n²'),
    `una serie di potenze ha il raggio, Laplace la trasformata e Fourier i coefficienti con il grafico (${JSON.stringify({ power: power.slice(0, 30), laplace, fourier: fourier.slice(0, 30) })})`,
  )
  // Il calcolo numerico: Newton con la tabella dei passi e lo zero nel pannello.
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nNewton $\\operatorname{newton}(x^2 = 2, 1) =')
  const newton = await resultText('x ≈ 1,41421356237')
  await gp.waitForFunction(() => [...document.querySelectorAll('.formula-graph:not([hidden]) svg text')].some((t) => t.textContent?.startsWith('x')), null, { timeout: 5000 })
  check(newton.startsWith('x ≈ 1,41421356237 (5 passi)'), `Newton ha la tabella dei passi e lo zero nel pannello (${JSON.stringify(newton.slice(0, 40))})`)
  // Un test d'ipotesi: la decisione, e nel pannello la regione di rifiuto colorata.
  await gp.keyboard.press('End')
  await gp.keyboard.type('\n\nIl test $\\operatorname{test}(\\bar{x} = 10.5, s = 2, n = 30, \\mu > 10) =')
  const test = await resultText('t = 1,3693')
  await gp.waitForSelector('.formula-graph:not([hidden]) svg path[data-area]', { state: 'attached', timeout: 5000 })
  check(test.includes('non si rifiuta H₀'), `un test d'ipotesi ha il p-value e la decisione, con la regione di rifiuto nel pannello (${JSON.stringify(test.slice(0, 50))})`)
  await gp.close()

  // Spostare schemi e grafici con le frecce ↑ ↓ dell'anteprima, come le celle di Colab: il blocco salta
  // quello vicino, la freccia resta sotto il puntatore con il fuoco, Ctrl+Z lo riporta (anche
  // dall'anteprima), gli slider lo seguono, sopra una definizione che usa c'è un avviso; sul telefono
  // le frecce si vedono sempre, in stampa no. Tutto in un blocco: i nomi restano qui.
  {
    const schemaJson = '{"v":1,"nodes":[{"id":"a","shape":"rect","x":0,"y":0,"w":140,"h":60,"text":"Ipotesi"},{"id":"b","shape":"rect","x":220,"y":0,"w":140,"h":60,"text":"Tesi"}],"edges":[{"id":"e","source":"a","target":"b"}]}'
    const start = `# Spostare\n\nPrimo paragrafo.\n\n$a = 2$\n\n\`\`\`grafico\ny = a x\n\`\`\`\n\nSecondo paragrafo.\n\n\`\`\`schema\n${schemaJson}\n\`\`\`\n`
    const setNote = async (page, text) => {
      await page.locator('.cm-content').click()
      await page.keyboard.press('Control+a')
      await page.keyboard.insertText(text)
    }
    /** La nota salvata (dopo ogni spostamento si aspetta il salvataggio). */
    const savedNote = async (page) => {
      await page.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
      return page.evaluate(() => {
        for (let i = 0; i < localStorage.length; i++) {
          const value = localStorage.getItem(localStorage.key(i)) ?? ''
          if (value.startsWith('# Spostare')) return value
        }
        return ''
      })
    }
    const focusedArrow = (page) =>
      page.evaluate(() => {
        const a = document.activeElement
        return a?.classList.contains('block-move') ? `${a.closest('[data-line]')?.dataset.line} ${a.dataset.dir}${a.getAttribute('aria-disabled') === 'true' ? ' spenta' : ''}` : String(a?.className)
      })
    const mv = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    mv.on('pageerror', (e) => errors.push(e.message))
    await mv.goto(url)
    await mv.waitForSelector('.cm-editor')
    await mv.locator('.notes-head button[aria-label="Nuova nota"]').click()
    await setNote(mv, start)
    await mv.waitForSelector('.preview-pane .graph-block svg.graph-svg', { timeout: 5000 })
    await mv.waitForSelector('.preview-pane .schema-block .schema-preview-tools .block-move', { timeout: 10000 })
    const graphArrow = (dir) => mv.locator(`.preview-pane .graph-block .block-move[data-dir="${dir}"]`)
    const toolsOpacity = () => mv.evaluate(() => getComputedStyle(document.querySelector('.preview-pane .graph-tools')).opacity)
    check((await toolsOpacity()) === '0', 'le frecce del grafico si vedono solo passandoci sopra')
    // Lo slider di a portato a 3,5: dopo lo spostamento resta così.
    await mv.locator('.preview-pane .graph-slider-value').click()
    await mv.keyboard.type('3,5')
    await mv.keyboard.press('Enter')
    await mv.locator('.preview-pane .graph-block .graph-stage').hover()
    await mv.waitForFunction(() => getComputedStyle(document.querySelector('.preview-pane .graph-tools')).opacity === '1', null, { timeout: 5000 })
    const y0 = (await graphArrow('down').boundingBox()).y
    await graphArrow('down').click()
    const once = await savedNote(mv)
    const y1 = (await graphArrow('down').boundingBox()).y
    check(
      once === start.replace('```grafico\ny = a x\n```\n\nSecondo paragrafo.', 'Secondo paragrafo.\n\n```grafico\ny = a x\n```'),
      `↓ porta il grafico dopo il paragrafo che lo segue (${JSON.stringify(once.slice(0, 90))})`,
    )
    const afterOnce = await focusedArrow(mv)
    check(Math.abs(y1 - y0) < 2 && afterOnce === '8 down', `la freccia resta sotto il puntatore, con il fuoco (${JSON.stringify({ y0, y1, afterOnce })})`)
    const slid = await mv.locator('.preview-pane .graph-slider-value').inputValue()
    check(slid === '3,5', `lo slider segue il grafico spostato (${slid})`)
    await graphArrow('down').click()
    const twice = await savedNote(mv)
    const afterTwice = await focusedArrow(mv)
    check(twice.endsWith('```\n\n```grafico\ny = a x\n```\n') && afterTwice === '12 down spenta', `di nuovo ↓: il grafico va sotto lo schema, in fondo, e la freccia si spegne tenendo il fuoco (${afterTwice})`)
    // Due clic veloci su ↑ dello schema: due spostamenti, e il doppio clic non apre lo schema.
    await mv.locator('.preview-pane .schema-block').hover()
    await mv.locator('.preview-pane .schema-block .block-move[data-dir="up"]').dblclick()
    const schemaUp = await savedNote(mv)
    check(
      schemaUp.indexOf('```schema') < schemaUp.indexOf('$a = 2$') &&
        (await mv.locator('dialog.schema-editor[open]').count()) === 0 &&
        (await mv.evaluate(() => document.querySelector('.app').dataset.view)) === 'split',
      'due clic sulla ↑ dello schema lo portano su di due blocchi, senza aprirlo',
    )
    // Ctrl+Z con il fuoco sulla freccia (dall'anteprima), poi nell'editor: uno spostamento alla volta.
    await mv.keyboard.press('Control+z')
    const undoPreview = await savedNote(mv)
    const oneUp = `# Spostare\n\nPrimo paragrafo.\n\n$a = 2$\n\n\`\`\`schema\n${schemaJson}\n\`\`\`\n\nSecondo paragrafo.\n\n\`\`\`grafico\ny = a x\n\`\`\`\n`
    const afterUndo = await focusedArrow(mv)
    check(undoPreview === oneUp && afterUndo === '6 up', `Ctrl+Z dall'anteprima annulla l'ultimo spostamento, e il fuoco resta sulla freccia (${afterUndo})`)
    await mv.locator('.cm-content').click()
    for (let i = 0; i < 3; i++) await mv.keyboard.press('Control+z')
    check((await savedNote(mv)) === start, 'Ctrl+Z nell\'editor riporta tutto com\'era, uno spostamento alla volta')
    // Portato sopra $a = 2$, il grafico non ha più a: c'è l'avviso.
    await mv.locator('.preview-pane .graph-block .graph-stage').hover()
    await graphArrow('up').click()
    check(
      await mv.waitForFunction(() => [...document.querySelectorAll('.toast')].some((t) => t.textContent.includes('sopra la definizione di a')), null, { timeout: 5000 }).then(() => true, () => false),
      'portato sopra la definizione che usa, il grafico avvisa',
    )
    // Due elenchi che diventerebbero uno: la nota resta com'è, con l'avviso.
    const lists = '# Spostare\n\n1) a\n2) b\n\n```grafico\ny = x\n```\n\n3) c\n'
    await setNote(mv, lists)
    // Il grafico della nota nuova (prima c'è ancora quello di prima, alla riga 6).
    await mv.waitForSelector('.preview-pane .graph-block[data-line="5"] .block-move', { timeout: 5000 })
    await mv.locator('.preview-pane .graph-block .graph-stage').hover()
    await graphArrow('up').click()
    check(
      (await mv.waitForFunction(() => [...document.querySelectorAll('.toast')].some((t) => t.textContent.includes('due elenchi diventerebbero uno')), null, { timeout: 5000 }).then(() => true, () => false)) &&
        (await savedNote(mv)) === lists,
      'se due elenchi diventerebbero uno solo il grafico non si sposta, e lo dice',
    )
    // In stampa niente frecce né «Modifica».
    await setNote(mv, start)
    await mv.waitForSelector('.preview-pane .schema-block .schema-preview-tools .block-move', { timeout: 10000 })
    await mv.emulateMedia({ media: 'print' })
    const printed = await mv.evaluate(() => [...document.querySelectorAll('.preview-pane .block-move-group, .preview-pane .schema-preview-tools')].map((el) => getComputedStyle(el).display))
    check(printed.length === 3 && printed.every((d) => d === 'none'), `in stampa le frecce e «Modifica» non ci sono (${printed})`)
    await mv.emulateMedia({ media: 'screen' })
    // Nella vista Anteprima l'anteprima non torna dov'è l'editor quando si ridisegna (prima una casella
    // spuntata in fondo la riportava in cima).
    const long = `# Spostare\n\n${Array.from({ length: 60 }, (_, i) => `Riga ${i + 1} della nota, con un po' di testo.`).join('\n\n')}\n\n- [ ] da fare\n`
    await setNote(mv, long)
    await mv.keyboard.press('Control+Home')
    await mv.waitForTimeout(200)
    await mv.locator('.view-button[aria-label="Anteprima"]').click()
    await mv.waitForSelector('.preview-pane .task-checkbox')
    await mv.evaluate(() => (document.querySelector('.preview-pane').scrollTop = 1e6))
    const bottom = await mv.evaluate(() => document.querySelector('.preview-pane').scrollTop)
    await mv.locator('.preview-pane .task-checkbox').click()
    await mv.waitForFunction(() => document.querySelector('.preview-pane .task-checkbox')?.checked, null, { timeout: 5000 })
    await mv.waitForTimeout(300)
    const kept = await mv.evaluate(() => document.querySelector('.preview-pane').scrollTop)
    check(bottom > 500 && Math.abs(kept - bottom) < 5, `nella vista Anteprima, spuntata una casella, l'anteprima resta dov'è (${bottom} → ${kept})`)
    // Due grafici con lo stesso slider: dopo ↓ e Ctrl+Z ognuno ha il suo valore (prima l'altro prendeva il 5).
    const twin = '# Spostare\n\n$a = 2$\n\n```grafico\ny = a x\n```\n\n```grafico\ny = a x^2\n```\n'
    await mv.locator('.view-button[aria-label="Diviso"]').click()
    await setNote(mv, twin)
    await mv.waitForSelector('.preview-pane .graph-block[data-line="8"] .graph-slider-value', { timeout: 5000 })
    const sliders = () => mv.evaluate(() => [...document.querySelectorAll('.preview-pane .graph-block')].map((b) => `${b.dataset.graph}: ${b.querySelector('.graph-slider-value')?.value}`).join(' | '))
    await mv.locator('.preview-pane .graph-block[data-line="4"] .graph-slider-value').click()
    await mv.keyboard.press('Control+a')
    await mv.keyboard.type('5')
    await mv.keyboard.press('Enter')
    await mv.locator('.preview-pane .graph-block[data-line="4"] .graph-stage').hover()
    await mv.locator('.preview-pane .graph-block[data-line="4"] .block-move[data-dir="down"]').click()
    await savedNote(mv)
    const twinMoved = await sliders()
    await mv.keyboard.press('Control+z')
    await savedNote(mv)
    const twinBack = await sliders()
    check(
      twinMoved === 'y = a x^2: 2 | y = a x: 5' && twinBack === 'y = a x: 5 | y = a x^2: 2',
      `lo slider segue il grafico anche con Ctrl+Z, e non passa all'altro (${twinMoved} → ${twinBack})`,
    )
    // Lo slider spostato resta alla sua nota: spostando un grafico in un'altra nota non cambia.
    await mv.locator('.notes-head button[aria-label="Nuova nota"]').click()
    await setNote(mv, `# Altra\n\n\`\`\`grafico\ny = x\n\`\`\`\n\n${Array.from({ length: 40 }, (_, i) => `Riga ${i + 1} dell'altra nota.`).join('\n\n')}\n`)
    await mv.waitForSelector('.preview-pane .graph-block[data-line="2"] .block-move', { timeout: 5000 })
    await mv.locator('.preview-pane .graph-block .graph-stage').hover()
    await mv.locator('.preview-pane .graph-block .block-move[data-dir="down"]').click()
    await mv.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
    await mv.locator('.note-item', { hasText: 'Spostare' }).first().locator('.note-open').click()
    await mv.waitForSelector('.preview-pane .graph-block[data-line="4"] .graph-slider-value', { timeout: 5000 })
    check((await sliders()) === 'y = a x: 5 | y = a x^2: 2', `gli slider di una nota non cambiano spostando un grafico in un'altra (${await sliders()})`)
    // Dopo uno spostamento, aperta un'altra nota l'anteprima torna a seguire l'editor e la mostra dall'inizio.
    const longNote = (title) => `# ${title}\n\n${Array.from({ length: 40 }, (_, i) => `Paragrafo ${i + 1} con un po' di testo.`).join('\n\n')}\n\n- [ ] casella\n\n\`\`\`grafico\ny = x\n\`\`\`\n`
    await setNote(mv, longNote('Spostare lunga'))
    await mv.waitForSelector('.preview-pane .graph-block[data-line="84"] .block-move', { timeout: 5000 })
    await mv.locator('.cm-content').press('Control+Home')
    await mv.locator('.preview-pane .graph-block .graph-stage').scrollIntoViewIfNeeded()
    await mv.locator('.preview-pane .graph-block .graph-stage').hover()
    await mv.locator('.preview-pane .graph-block .block-move[data-dir="up"]').click()
    await mv.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
    // Dopo lo spostamento l'anteprima resta lì anche se si ridisegna (una casella spuntata), finché non si torna all'editor.
    const stayed = await mv.evaluate(() => document.querySelector('.preview-pane').scrollTop)
    await mv.locator('.preview-pane .task-checkbox').click()
    await mv.waitForFunction(() => document.querySelector('.preview-pane .task-checkbox')?.checked, null, { timeout: 5000 })
    await mv.waitForTimeout(300)
    const still = await mv.evaluate(() => document.querySelector('.preview-pane').scrollTop)
    check(stayed > 1000 && Math.abs(still - stayed) < 5, `dopo lo spostamento l'anteprima resta ferma, anche ridisegnandosi, e non torna dov'è l'editor (${stayed} → ${still})`)
    await mv.locator('.note-item', { hasText: 'Altra' }).first().locator('.note-open').click()
    await mv.waitForTimeout(400)
    const followed = await mv.evaluate(() => document.querySelector('.preview-pane').scrollTop)
    check(followed < 100, `aperta un'altra nota, l'anteprima segue di nuovo l'editor dall'inizio (${followed})`)
    // Il segno per il lettore di schermo non allunga la pagina: un link a una nota a piè di pagina scorre solo
    // l'anteprima, e l'app resta ferma (prima saliva tutta e non tornava giù).
    await setNote(mv, `# Spostare\n\nVedi la nota[^1].\n\n${Array.from({ length: 80 }, (_, i) => `Paragrafo ${i + 1}.`).join('\n\n')}\n\n[^1]: La nota a piè di pagina.\n`)
    await mv.waitForSelector('.preview-pane .footnote-ref a', { timeout: 5000 })
    await mv.locator('.preview-pane .footnote-ref a').first().click()
    await mv.waitForTimeout(300)
    const pageScroll = await mv.evaluate(() => [document.scrollingElement.scrollTop, document.scrollingElement.scrollHeight - innerHeight])
    check(pageScroll[0] === 0 && pageScroll[1] <= 1, `un link interno dell'anteprima non fa salire l'app (${pageScroll})`)
    // Un grafico che si muove da solo, spostato e poi riportato con Ctrl+Z nell'editor: l'altro grafico resta fermo.
    await setNote(mv, twin)
    await mv.waitForSelector('.preview-pane .graph-block[data-line="8"] .graph-slider-value', { timeout: 5000 })
    await mv.locator('.preview-pane .graph-block[data-line="4"] [data-action="play"]').click()
    await mv.locator('.preview-pane .graph-block[data-line="4"] .graph-stage').hover()
    await mv.locator('.preview-pane .graph-block[data-line="4"] .block-move[data-dir="down"]').click()
    await savedNote(mv)
    await mv.locator('.cm-content').click()
    await mv.keyboard.press('Control+z')
    await savedNote(mv)
    await mv.waitForTimeout(700)
    const playing = await mv.evaluate(() =>
      [...document.querySelectorAll('.preview-pane .graph-block')].map((b) => `${b.dataset.graph}: ${b.querySelector('[data-action="play"]')?.getAttribute('aria-label')?.startsWith('Ferma') ? 'si muove' : b.querySelector('.graph-slider-value')?.value}`).join(' | '),
    )
    check(playing.startsWith('y = a x: si muove') && playing.endsWith('y = a x^2: 2'), `Ctrl+Z nell'editor riporta lo slider che si muove al suo grafico, e l'altro resta fermo (${playing})`)
    await mv.locator('.preview-pane .graph-block[data-line="4"] [data-action="play"]').click()
    // In cima alla nota, nella vista Anteprima, due clic veloci sulla ↑ non aprono lo schema (lì il blocco non può restare fermo).
    await mv.locator('.view-button[aria-label="Diviso"]').click()
    await setNote(mv, `# Spostare\n\nPrimo.\n\nSecondo.\n\n\`\`\`schema\n${schemaJson}\n\`\`\`\n`)
    await mv.waitForSelector('.preview-pane .schema-block[data-line="6"] .block-move', { timeout: 10000 })
    await mv.locator('.view-button[aria-label="Anteprima"]').click()
    await mv.locator('.preview-pane .schema-block').hover()
    await mv.locator('.preview-pane .schema-block .block-move[data-dir="up"]').dblclick()
    await mv.waitForTimeout(400)
    check(
      (await mv.locator('dialog.schema-editor[open]').count()) === 0 && (await mv.evaluate(() => document.querySelector('.app').dataset.view)) === 'preview',
      'in cima alla nota un doppio clic sulla ↑ non apre lo schema e resta nella vista Anteprima',
    )
    await mv.locator('.view-button[aria-label="Diviso"]').click()
    // L'editor degli schemi a tutto schermo ha ancora la sua barra (Annulla, zoom, Griglia), visibile.
    await mv.locator('.preview-pane .schema-block').hover()
    await mv.locator('.preview-pane .schema-edit').click()
    await mv.waitForSelector('dialog.schema-editor[open]')
    const editorBar = await mv.evaluate(() => {
      const bar = document.querySelector('dialog.schema-editor .schema-tools')
      return `${getComputedStyle(bar).opacity} ${getComputedStyle(bar).position}`
    })
    await mv.locator('dialog.schema-editor .btn-primary', { hasText: 'Fatto' }).click()
    await mv.waitForSelector('dialog.schema-editor[open]', { state: 'detached', timeout: 5000 }).catch(() => {})
    check(editorBar.startsWith('1 ') && !editorBar.endsWith('absolute') && (await mv.locator('dialog.schema-editor[open]').count()) === 0, `l'editor degli schemi ha la sua barra e «Fatto» lo chiude (${editorBar})`)
    await mv.close()

    // Sul telefono le frecce si vedono sempre, sotto il disegno, e un tocco sposta.
    const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })
    const mp = await phone.newPage()
    mp.on('pageerror', (e) => errors.push(e.message))
    await mp.goto(url)
    await mp.waitForSelector('.cm-editor')
    await setNote(mp, start)
    await mp.locator('.view-button[aria-label="Anteprima"]').click()
    await mp.waitForSelector('.preview-pane .schema-block .schema-preview-tools .block-move', { timeout: 10000 })
    const phoneTools = await mp.evaluate(() => {
      const out = []
      for (const sel of ['.graph-block', '.schema-block']) {
        const block = document.querySelector(`.preview-pane ${sel}`)
        const tools = block.querySelector('.graph-tools, .schema-preview-tools')
        const arrow = block.querySelector('.block-move[data-dir="down"]').getBoundingClientRect()
        const drawing = block.querySelector('svg').getBoundingClientRect()
        out.push(getComputedStyle(tools).opacity === '1' && arrow.top >= drawing.bottom - 1)
      }
      return out
    })
    check(phoneTools.every(Boolean), `sul telefono le frecce si vedono sempre, sotto il grafico e sotto lo schema (${phoneTools})`)
    await mp.locator('.preview-pane .graph-block .block-move[data-dir="down"]').tap()
    const tapped = await savedNote(mp)
    check(tapped.indexOf('Secondo paragrafo.') < tapped.indexOf('```grafico'), 'e un tocco sulla ↓ sposta il grafico')
    await phone.close()
    // Con l'anteprima più stretta che l'app permette, i pulsanti del grafico (frecce comprese) restano dentro.
    const narrow = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    await narrow.addInitScript(() => localStorage.setItem('glifo.layout.v1', JSON.stringify({ editorShare: 0.85 })))
    const np = await narrow.newPage()
    np.on('pageerror', (e) => errors.push(e.message))
    await np.goto(url)
    await np.waitForSelector('.cm-editor')
    await setNote(np, start)
    // Il grafico della nota scritta adesso (prima c'è ancora quello della nota di benvenuto).
    await np.waitForSelector('.preview-pane .graph-block[data-line="6"] .block-move', { timeout: 5000 })
    await np.locator('.preview-pane .graph-block[data-line="6"] .graph-stage').hover()
    await np.waitForFunction(() => getComputedStyle(document.querySelector('.preview-pane .graph-tools')).opacity === '1', null, { timeout: 5000 })
    const inside = await np.evaluate(() => {
      const box = document.querySelector('.preview-pane .markdown-body').getBoundingClientRect()
      return [...document.querySelectorAll('.preview-pane .graph-tools button:not([hidden])')].every((b) => {
        const r = b.getBoundingClientRect()
        return r.left >= box.left && r.right <= box.right && document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)?.closest('button') === b
      })
    })
    check(inside, 'con l\'anteprima stretta i pulsanti del grafico restano dentro e si possono premere')
    await narrow.close()
  }

  // Le tabelle con le formule, come Excel: il pulsante apre l'editor, si scrive con Tab e Invio, le
  // formule fanno i conti all'italiana (euro, SOMMA), il suggerimento scrive la funzione e il clic
  // sulle celle il loro nome; «Fatto» mette nella nota un blocco ```tabella, che nel testo è una riga
  // con «Modifica» e nell'anteprima la tabella con i risultati; si riapre dall'anteprima, Ctrl+Z
  // annulla, le frecce la spostano, e nel file .md è una tabella con i risultati (le formule restano
  // nascoste) che riaprendo il file torna un blocco. Tutto in un blocco: i nomi restano qui.
  {
    const tp = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    tp.on('pageerror', (e) => errors.push(e.message))
    await tp.goto(url)
    await tp.waitForSelector('.cm-editor')
    await tp.locator('.notes-head button[aria-label="Nuova nota"]').click()
    await tp.keyboard.press('Control+a')
    await tp.keyboard.type('# Tabelle\n\nLa spesa:\n')
    const sheetEditor = tp.locator('dialog.sheet-editor[open]')
    // Le due tabelle sono in un pulsante solo, con il menu: con le formule o di testo.
    const newSheet = async () => {
      await tp.locator('.editor-toolbar button[aria-label="Tabella"]').click()
      await tp.locator('.tool-menu-item', { hasText: 'Tabella con le formule' }).click()
      await sheetEditor.waitFor()
    }
    await newSheet()
    // Playwright scrive il tabulatore come testo: Tab e Invio vanno premuti.
    const typeRow = async (cells) => {
      for (let i = 0; i < cells.length; i++) {
        if (cells[i]) await tp.keyboard.type(cells[i])
        await tp.keyboard.press(i < cells.length - 1 ? 'Tab' : 'Enter')
      }
    }
    await typeRow(['Prodotto', 'Quantità', 'Prezzo', 'Totale'])
    await typeRow(['Penne', '10', '1,50 €', '=b2*c2'])
    await typeRow(['Quaderni', '5', '2,40 €', '=B3*C3'])
    await tp.keyboard.type('Totale')
    for (let i = 0; i < 3; i++) await tp.keyboard.press('Tab')
    await tp.keyboard.type('=som')
    const suggested = await tp.locator('.sheet-suggest-item strong').allTextContents()
    await tp.keyboard.press('Tab')
    const d2 = await tp.locator('#sheet-1-3').boundingBox()
    const d3 = await tp.locator('#sheet-2-3').boundingBox()
    await tp.mouse.move(d2.x + d2.width / 2, d2.y + d2.height / 2)
    await tp.mouse.down()
    await tp.mouse.move(d3.x + d3.width / 2, d3.y + d3.height / 2, { steps: 4 })
    await tp.mouse.up()
    const pointed = await tp.locator('.sheet-cell-input').inputValue()
    const colored = await tp.locator('.sheet-grid td[data-ref]').count()
    await tp.keyboard.type(')')
    await tp.keyboard.press('Enter')
    const grid = await tp.evaluate(() =>
      [0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => document.querySelector(`#sheet-${r}-${c}`)?.textContent)),
    )
    check(
      JSON.stringify(grid) ===
        JSON.stringify([
          ['Prodotto', 'Quantità', 'Prezzo', 'Totale'],
          ['Penne', '10', '1,50 €', '15,00 €'],
          ['Quaderni', '5', '2,40 €', '12,00 €'],
          ['Totale', '', '', '27,00 €'],
        ]) &&
        suggested[0] === 'SOMMA' &&
        pointed === '=SOMMA(D2:D3' &&
        colored === 2,
      `nella tabella si scrive come in Excel: Tab, Invio, le formule in euro, il suggerimento SOMMA e le celle scelte con il mouse (${JSON.stringify({ grid, suggested, pointed, colored })})`,
    )
    await tp.locator('#sheet-3-3').click()
    const formula = await tp.locator('.sheet-formula').inputValue()
    const address = await tp.locator('.sheet-address').inputValue()
    // Un errore spiega cosa è successo; Ctrl+Z lo toglie.
    await tp.locator('#sheet-1-4').click()
    await tp.keyboard.type('=D2/B5')
    await tp.keyboard.press('Enter')
    await tp.locator('#sheet-1-4').click()
    const errorHint = await tp.locator('.sheet-hint').textContent()
    await tp.keyboard.press('Control+z')
    const undone = await tp.locator('#sheet-1-4').textContent()
    check(
      formula === '=SOMMA(D2:D3)' && address === 'D4' && errorHint.includes('#DIV/0!') && errorHint.includes('Divisione per zero') && undone === '',
      `la barra mostra la formula, un errore dice cosa non va e Ctrl+Z lo toglie (${JSON.stringify({ formula, address, errorHint, undone })})`,
    )
    await tp.locator('.sheet-bar button', { hasText: 'Fatto' }).click()
    await sheetEditor.waitFor({ state: 'detached' })
    await tp.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
    const tableNote = () =>
      tp.evaluate(() => {
        for (let i = 0; i < localStorage.length; i++) {
          const value = localStorage.getItem(localStorage.key(i))
          if (value?.startsWith('# Tabelle')) return value
        }
        return ''
      })
    const block = [
      '```tabella',
      '| Prodotto | Quantità | Prezzo | Totale |',
      '| --- | --- | --- | --- |',
      '| Penne | 10 | 1,50 € | =B2*C2 |',
      '| Quaderni | 5 | 2,40 € | =B3*C3 |',
      '| Totale |  |  | =SOMMA(D2:D3) |',
      '```',
    ].join('\n')
    const saved = await tableNote()
    const widget = await tp.locator('.cm-schema[data-kind="tabella"]').textContent()
    const previewCells = await tp.locator('.sheet-block td').allTextContents()
    const previewHead = await tp.locator('.sheet-block th').allTextContents()
    check(
      saved.includes(`La spesa:\n${block}`) &&
        widget.includes('Tabella · 4 righe, 4 colonne · Prodotto, Quantità, Prezzo, Totale') &&
        previewHead.join('|') === 'Prodotto|Quantità|Prezzo|Totale' &&
        previewCells.includes('27,00 €'),
      `«Fatto» mette nella nota il blocco \`\`\`tabella, nel testo una riga con «Modifica» e nell'anteprima la tabella con i risultati (${JSON.stringify({ saved, widget, previewCells })})`,
    )
    // Dall'anteprima si riapre; cambiato un numero, i conti si rifanno; Ctrl+Z nel testo torna indietro.
    await tp.locator('.sheet-block').hover()
    await tp.locator('.sheet-block .sheet-edit').click()
    await sheetEditor.waitFor()
    await tp.locator('#sheet-1-1').click()
    await tp.keyboard.type('20')
    await tp.keyboard.press('Enter')
    await tp.locator('.sheet-bar button', { hasText: 'Fatto' }).click()
    await sheetEditor.waitFor({ state: 'detached' })
    const cellsShown = (text) => tp.waitForFunction((t) => [...document.querySelectorAll('.sheet-block td')].some((td) => td.textContent === t), text, { timeout: 3000 }).catch(() => {})
    await cellsShown('42,00 €')
    const changed = await tp.locator('.sheet-block td').allTextContents()
    await tp.keyboard.press('Control+z')
    await cellsShown('27,00 €')
    const back = await tp.locator('.sheet-block td').allTextContents()
    check(
      changed.includes('42,00 €') && changed.includes('20') && back.includes('27,00 €'),
      `riaperta dall'anteprima la tabella si cambia e si ricalcola, e Ctrl+Z la riporta com'era (${JSON.stringify({ changed, back })})`,
    )
    // Le frecce la spostano sopra il paragrafo
    await tp.locator('.sheet-block').hover()
    await tp.locator('.sheet-block .block-move[data-dir="up"]').click()
    await tp.waitForFunction(() => document.documentElement.dataset.save === 'salvato', null, { timeout: 5000 })
    const movedNote = await tableNote()
    check(movedNote.indexOf('```tabella') < movedNote.indexOf('La spesa:'), 'le frecce spostano la tabella nella nota')
    await tp.keyboard.press('Control+z')
    // Nel file .md la tabella con i risultati; aprendolo torna il blocco con le formule
    await tp.evaluate(() => {
      window.showSaveFilePicker = async () => ({
        name: 'tabelle.md',
        createWritable: async () => ({ write: async (text) => (window.savedFile = text), close: async () => {} }),
      })
    })
    await tp.locator('button', { hasText: 'Salva .md' }).click()
    await tp.waitForFunction(() => typeof window.savedFile === 'string', null, { timeout: 10000 })
    const sheetFile = await tp.evaluate(() => window.savedFile)
    const vscode = await browser.newPage()
    await vscode.setContent(new MarkdownIt({ html: true }).render(sheetFile))
    const shown = await vscode.evaluate(() => ({ cells: [...document.querySelectorAll('td')].map((td) => td.textContent), text: document.body.innerText }))
    await vscode.close()
    check(
      !sheetFile.includes('```tabella') && sheetFile.includes('<!-- glifo-tabella') && shown.cells.includes('15,00 €') && !shown.text.includes('=B2*C2'),
      `nel file .md la tabella ha i risultati, che si vedono anche fuori da Glifo, e le formule restano nascoste (${JSON.stringify(shown.cells)})`,
    )
    await tp.evaluate((text) => {
      window.showOpenFilePicker = async () => [{ getFile: async () => new File([text], 'tabelle.md') }]
    }, sheetFile)
    await tp.locator('button', { hasText: 'Apri .md' }).click()
    await tp.waitForFunction(
      (text) => [...Array(localStorage.length).keys()].map((i) => localStorage.getItem(localStorage.key(i))).filter((v) => v?.includes(text)).length >= 2,
      block,
      { timeout: 5000 },
    )
    check(true, 'aprendo il file .md la tabella torna un blocco ```tabella con le formule')
    // I modelli pronti: il piano di ammortamento si azzera all'ultimo anno; chiudendo senza salvare la nota non cambia
    await newSheet()
    await tp.locator('.sheet-bar button', { hasText: 'Modelli' }).click()
    await tp.locator('.sheet-menu-item', { hasText: 'Piano di ammortamento' }).click()
    const rata = await tp.locator('#sheet-3-1').textContent()
    const residuo = await tp.locator('#sheet-10-3').textContent()
    await tp.locator('.sheet-bar button', { hasText: 'Chiudi' }).click()
    await tp.locator('dialog[open] button', { hasText: 'Chiudi senza salvare' }).click()
    await sheetEditor.waitFor({ state: 'detached' })
    check(rata === '2.373,96 €' && residuo === '0,00 €', `il modello «Piano di ammortamento» fa i conti con RATA (${rata}, ${residuo})`)
    // Il grafico del punto di pareggio: dal modello, «Grafico» (anche da una cella dei costi) mette
    // sotto la tabella il blocco ```grafico con i dati e il pareggio; nell'anteprima le linee, le aree e
    // il punto con le sue coordinate. Di nuovo «Grafico» rifà lo stesso blocco, non ne aggiunge un altro.
    await tp.locator('.notes-head button[aria-label="Nuova nota"]').click()
    await tp.keyboard.press('Control+a')
    await tp.keyboard.type('# Pareggio\n\n')
    await newSheet()
    await tp.locator('.sheet-bar button', { hasText: 'Modelli' }).click()
    await tp.locator('.sheet-menu-item', { hasText: 'Punto di pareggio' }).click()
    await tp.locator('#sheet-1-1').click()
    await tp.locator('.sheet-bar button', { hasText: 'Grafico' }).click()
    await sheetEditor.waitFor({ state: 'detached' })
    const chartNote = () =>
      tp.evaluate(() => {
        for (let i = 0; i < localStorage.length; i++) {
          const value = localStorage.getItem(localStorage.key(i))
          if (value?.startsWith('# Pareggio')) return value
        }
        return ''
      })
    const chartBlock = '```grafico\ntitolo: Punto di pareggio\nasse x: Quantità\nasse y: €\ndati: A8:D13\npareggio: Ricavi, Costi totali\n```'
    await tp.waitForFunction((text) => [...Array(localStorage.length).keys()].some((i) => localStorage.getItem(localStorage.key(i))?.includes(text)), chartBlock, { timeout: 5000 })
    await tp.waitForSelector('.preview-pane .graph-block .graph-legend', { timeout: 10000 })
    const chartLegend = (await tp.locator('.preview-pane .graph-block .graph-legend').textContent()) ?? ''
    const chartMarks = await tp.locator('.preview-pane .graph-block svg [data-item]').count()
    const chartText = await chartNote()
    check(
      chartText.indexOf('```tabella') < chartText.indexOf(chartBlock) && chartLegend.includes('(2.000; 20.000,00 €)') && chartMarks > 10,
      `«Grafico» mette sotto la tabella il diagramma del punto di pareggio, con le linee, le aree e il punto (${JSON.stringify({ chartLegend, chartMarks })})`,
    )
    await tp.locator('.cm-schema[data-kind="tabella"] button', { hasText: 'Modifica' }).click()
    await sheetEditor.waitFor()
    await tp.locator('#sheet-9-0').click()
    await tp.locator('.sheet-bar button', { hasText: 'Grafico' }).click()
    await sheetEditor.waitFor({ state: 'detached' })
    await tp.waitForTimeout(400)
    const chartsAgain = ((await chartNote()).match(/```grafico/g) ?? []).length
    check(chartsAgain === 1, `di nuovo «Grafico» rifà lo stesso grafico, non ne aggiunge un altro (${chartsAgain})`)
    // «File»: la tabella come file di Excel (le formule in inglese, con i risultati) e come .csv per
    // l'Excel italiano; un .xlsx aperto con «Apri .md» diventa una nota con la tabella e le formule.
    await tp.locator('.cm-schema[data-kind="tabella"] button', { hasText: 'Modifica' }).click()
    await sheetEditor.waitFor()
    await tp.locator('.sheet-bar button', { hasText: 'File' }).click()
    const [xlsxDownload] = await Promise.all([tp.waitForEvent('download'), tp.locator('.sheet-menu-item', { hasText: 'Scarica come Excel' }).click()])
    const xlsxBytes = readFileSync(await xlsxDownload.path())
    const xlsxSheet = strFromU8(unzipSync(new Uint8Array(xlsxBytes))['xl/worksheets/sheet1.xml'])
    await tp.locator('.sheet-bar button', { hasText: 'File' }).click()
    const [csvDownload] = await Promise.all([tp.waitForEvent('download'), tp.locator('.sheet-menu-item', { hasText: 'Scarica come .csv' }).click()])
    const csvText = readFileSync(await csvDownload.path(), 'utf8')
    check(
      xlsxDownload.suggestedFilename() === 'Pareggio.xlsx' && xlsxSheet.includes('<f>$B$1+$B$2*A9</f><v>12000</v>') && csvDownload.suggestedFilename() === 'Pareggio.csv' && csvText.includes('\r\n2000;12.000 €;20.000,00 €;20.000,00 €;0,00 €\r\n'),
      `«File» scarica la tabella come Excel, con le formule in inglese e i risultati, e come .csv con il punto e virgola (${csvText.split('\r\n')[10]})`,
    )
    // Un .csv al posto della tabella (prima si chiede, e Annulla la riporta com'era).
    await tp.locator('.sheet-bar button', { hasText: 'File' }).click()
    const [csvChooser] = await Promise.all([tp.waitForEvent('filechooser'), tp.locator('.sheet-menu-item', { hasText: 'Apri un file Excel' }).click()])
    await csvChooser.setFiles({ name: 'voti.csv', mimeType: 'text/csv', buffer: Buffer.from('Studente;Voto\nAnna;8\nLuca;7,5\n') })
    await tp.locator('dialog[open] button', { hasText: 'Sostituisci' }).click()
    await tp.waitForFunction(() => document.querySelector('#sheet-2-1')?.textContent === '7,5', null, { timeout: 5000 })
    const csvHint = (await tp.locator('.sheet-hint').textContent()) ?? ''
    await tp.keyboard.press('Control+z')
    const csvUndone = await tp.locator('#sheet-0-1').textContent()
    check(csvHint.includes('voti.csv') && csvUndone === '12.000 €', `un .csv si apre al posto della tabella, e Annulla la riporta com'era (${JSON.stringify({ csvHint, csvUndone })})`)
    await tp.locator('.sheet-bar button', { hasText: 'Chiudi' }).click()
    await tp.locator('dialog[open] button', { hasText: 'Chiudi senza salvare' }).click().catch(() => {})
    await sheetEditor.waitFor({ state: 'detached' })
    await tp.evaluate((bytes) => {
      window.showOpenFilePicker = async () => [{ getFile: async () => new File([new Uint8Array(bytes)], 'Pareggio.xlsx') }]
    }, [...xlsxBytes])
    await tp.locator('button', { hasText: 'Apri .md' }).click()
    await tp.waitForFunction(
      () => [...Array(localStorage.length).keys()].map((i) => localStorage.getItem(localStorage.key(i))).filter((v) => v?.includes('=$B$1+$B$2*A9')).length >= 2,
      null,
      { timeout: 5000 },
    )
    check(true, 'un file di Excel aperto con «Apri .md» diventa una nota con la tabella e le formule in italiano')
    // Il diagramma di Gantt e il reticolo: dal modello «Diagramma di Gantt», «Grafico» chiede quale
    // fare; il Gantt va sotto la tabella con le barre e il percorso critico, il reticolo dopo di lui.
    await tp.locator('.notes-head button[aria-label="Nuova nota"]').click()
    await tp.keyboard.press('Control+a')
    await tp.keyboard.type('# Progetto\n\n')
    await newSheet()
    await tp.locator('.sheet-bar button', { hasText: 'Modelli' }).click()
    await tp.locator('.sheet-menu-item', { hasText: 'Diagramma di Gantt' }).click()
    await tp.locator('.sheet-bar button', { hasText: 'Grafico' }).click()
    await tp.locator('.sheet-menu-item', { hasText: 'Diagramma di Gantt' }).click()
    await sheetEditor.waitFor({ state: 'detached' })
    await tp.waitForSelector('.preview-pane .graph-block.is-gantt .plan-task', { timeout: 10000 })
    const ganttTasks = await tp.locator('.preview-pane .graph-block.is-gantt .plan-task').count()
    const ganttNotes = (await tp.locator('.preview-pane .graph-block.is-gantt .plan-notes').textContent()) ?? ''
    await tp.locator('.cm-schema[data-kind="tabella"] button', { hasText: 'Modifica' }).click()
    await sheetEditor.waitFor()
    await tp.locator('.sheet-bar button', { hasText: 'Grafico' }).click()
    await tp.locator('.sheet-menu-item', { hasText: 'Reticolo' }).click()
    await sheetEditor.waitFor({ state: 'detached' })
    await tp.waitForSelector('.preview-pane .graph-block.is-network .plan-task', { timeout: 10000 })
    await tp
      .waitForFunction(() => [...Array(localStorage.length).keys()].some((i) => localStorage.getItem(localStorage.key(i))?.includes('reticolo: A1:E9')), null, { timeout: 5000 })
      .catch(() => {})
    const projectText = await tp.evaluate(() => {
      for (let i = 0; i < localStorage.length; i++) {
        const value = localStorage.getItem(localStorage.key(i))
        if (value?.startsWith('# Progetto')) return value
      }
      return ''
    })
    const ganttAt = projectText.indexOf('```grafico\ntitolo: Diagramma di Gantt\ngantt: A1:E9\n```')
    const networkAt = projectText.indexOf('```grafico\ntitolo: Reticolo del progetto\nreticolo: A1:E9\n```')
    check(
      ganttTasks === 8 && ganttNotes.includes('Percorso critico: A → B → D → F → G') && ganttNotes.includes('23 giorni') && projectText.indexOf('```tabella') < ganttAt && ganttAt < networkAt,
      `«Grafico» sulle attività fa il diagramma di Gantt con il percorso critico e poi il reticolo, uno dopo l'altro sotto la tabella (${JSON.stringify({ ganttTasks, ganttNotes, ganttAt, networkAt })})`,
    )
    await tp.close()
    // Sul telefono: un tocco sceglie la cella, un altro ci scrive
    const phoneSheet = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
    phoneSheet.on('pageerror', (e) => errors.push(e.message))
    await phoneSheet.goto(url)
    await phoneSheet.waitForSelector('.cm-editor')
    await phoneSheet.locator('.cm-content').click()
    await phoneSheet.keyboard.press('Control+a')
    await phoneSheet.keyboard.insertText(`# Telefono\n\n${block}\n`)
    await phoneSheet.locator('.cm-schema button', { hasText: 'Modifica' }).tap()
    await phoneSheet.locator('dialog.sheet-editor[open]').waitFor()
    await phoneSheet.locator('#sheet-1-1').tap()
    await phoneSheet.locator('#sheet-1-1').tap()
    const editing = await phoneSheet.evaluate(() => document.activeElement?.classList.contains('sheet-cell-input'))
    const fits = await phoneSheet.evaluate(() => document.querySelector('.sheet-bar').scrollWidth <= window.innerWidth + 1)
    check(editing && fits, `sul telefono la barra sta nello schermo e un secondo tocco sulla cella comincia a scriverci (${JSON.stringify({ editing, fits })})`)
    // La tastiera che si apre accorcia la finestra: prima la scrittura si chiudeva, e la tastiera con lei.
    await phoneSheet.setViewportSize({ width: 390, height: 460 })
    await phoneSheet.waitForTimeout(100)
    const typing = await phoneSheet.evaluate(() => {
      const input = document.querySelector('.sheet-cell-input')
      return document.activeElement === input && !input.hidden && getComputedStyle(input).fontSize
    })
    await phoneSheet.keyboard.insertText('0')
    await phoneSheet.keyboard.press('Enter')
    const total = await phoneSheet.locator('#sheet-1-3').textContent()
    check(typing === '16px' && total === '150,00 €', `sul telefono si scrive nella cella anche dopo che la tastiera si è aperta, con i caratteri da 16px che l'iPhone non ingrandisce (${JSON.stringify({ typing, total })})`)
    await phoneSheet.close()
  }

  // La lavagna: accanto al testo al posto dell'anteprima, una per nota, salvata su questo
  // dispositivo. Penna e dita sono simulate come le manda il browser (Chrome DevTools Protocol):
  // pointerType «pen» con la pressione, e i tocchi delle dita. Tutto in un blocco: i nomi restano qui.
  {
    const lb = await browser.newContext({ viewport: { width: 1440, height: 900 }, hasTouch: true })
    const lp = await lb.newPage()
    lp.on('pageerror', (e) => errors.push(e.message))
    await lp.goto(url)
    await lp.waitForSelector('.cm-editor')
    await lp.locator('.notes-head button[aria-label="Nuova nota"]').click()
    await lp.keyboard.type('Lavagna di prova')
    await lp.locator('.view-button[aria-label="Lavagna"]').click()
    await lp.waitForSelector('.board-pane[data-loaded="true"]')
    const cdp = await lb.newCDPSession(lp)
    const boardPane = lp.locator('.board-pane')
    const strokeCount = async () => Number(await boardPane.getAttribute('data-strokes'))
    const stage = await lp.locator('.board-stage').boundingBox()
    /** Un tratto con la penna (o il mouse): punti [x, y, pressione] sulla pagina. */
    const penStroke = async (points, { pointerType = 'pen', button = 'left' } = {}) => {
      const buttons = button === 'right' ? 2 : 1
      const send = (type, [x, y, force], pressed = true) =>
        cdp.send('Input.dispatchMouseEvent', { type, x, y, button, buttons: pressed ? buttons : 0, clickCount: 1, pointerType, force })
      await send('mousePressed', points[0])
      for (const p of points.slice(1)) await send('mouseMoved', p)
      await send('mouseReleased', points.at(-1), false)
    }
    const touch = (type, points) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: points.map(([x, y], i) => ({ x, y, id: i + 1 })) })
    /** Una riga orizzontale sulla lavagna, a `dy` pixel dall'alto, con la pressione `p`. */
    const row = (dy, p, from = 40, to = 300) => Array.from({ length: 14 }, (_, i) => [stage.x + from + ((to - from) * i) / 13, stage.y + dy, p])
    /** Il colore della lavagna in un punto della pagina. */
    const inkAt = (x, y) =>
      lp.evaluate(([x, y]) => {
        const c = document.querySelector('.board-canvas')
        const r = c.getBoundingClientRect()
        const k = c.width / r.width
        const d = c.getContext('2d').getImageData(Math.round((x - r.left) * k), Math.round((y - r.top) * k), 1, 1).data
        return d[0] + d[1] + d[2]
      }, [x, y])
    /** I tratti salvati in IndexedDB per una nota: colore, penna e pressioni. */
    const savedStrokes = (page, note) =>
      page.evaluate(
        (note) =>
          new Promise((resolve, reject) => {
            const open = indexedDB.open('glifo-lavagne')
            open.onerror = () => reject(open.error)
            open.onsuccess = () => {
              const db = open.result
              const req = db.transaction('strokes', 'readonly').objectStore('strokes').getAll(IDBKeyRange.bound([note], [note, []]))
              req.onerror = () => reject(req.error)
              req.onsuccess = () => {
                db.close()
                resolve(req.result.map((r) => ({ color: r.color, pen: r.pen, pressures: Array.from(r.points).filter((_, i) => i % 3 === 2) })))
              }
            }
          }),
        note,
      )
    const boardLayout = await lp.evaluate(() => {
      const box = (s) => document.querySelector(s)?.getBoundingClientRect()
      const editor = box('.editor-pane')
      const board = box('.board-pane')
      const inside = (el) => {
        const r = el.getBoundingClientRect()
        return r.left >= board.left - 1 && r.right <= board.right + 1 && r.top >= board.top - 1 && r.bottom <= board.bottom + 1
      }
      return {
        side: editor.width > 200 && board.width > 200 && Math.abs(editor.right - board.left) < 2,
        noPreview: getComputedStyle(document.querySelector('.preview-pane')).display === 'none',
        handle: getComputedStyle(document.querySelector('.resize-split')).display !== 'none',
        handleLabel: document.querySelector('.resize-split').getAttribute('aria-label'),
        // Gli strumenti stanno dentro la lavagna, sotto la fascia dei pulsanti volanti.
        tools: [...document.querySelectorAll('.board-tools, .board-history, .board-zoom')].every(inside) && box('.board-tools').top >= box('.float-bar').bottom,
        fit: document.querySelector('.float-bar').dataset.fit,
        checked: document.querySelector('.view-button[aria-checked="true"]').getAttribute('aria-label'),
        focus: document.activeElement === document.querySelector('.board-stage'),
      }
    })
    check(
      boardLayout.side && boardLayout.noPreview && boardLayout.handle && boardLayout.handleLabel === 'Divisione tra testo e lavagna' && boardLayout.tools && boardLayout.fit === 'medium' && boardLayout.checked === 'Lavagna' && boardLayout.focus,
      `la vista «Lavagna» la apre accanto al testo, al posto dell'anteprima, con il bordo per allargarla (${JSON.stringify(boardLayout)})`,
    )
    // Con la penna lo spessore segue la pressione: piano una riga sottile, forte una spessa.
    await penStroke(row(140, 0.15))
    await penStroke(row(200, 0.95))
    const note1 = await boardPane.getAttribute('data-note')
    const saved1 = await savedStrokes(lp, note1)
    const thick = async (dy) => {
      let n = 0
      for (let y = dy - 6; y <= dy + 6; y += 0.5) if ((await inkAt(stage.x + 170, stage.y + y)) < 400) n++
      return n
    }
    const [thin, strong] = [await thick(140), await thick(200)]
    check(
      (await strokeCount()) === 2 &&
        saved1.length === 2 &&
        saved1.every((s) => s.pen && s.color === 'ink') &&
        saved1.some((s) => Math.max(...s.pressures) < 0.3) &&
        saved1.some((s) => Math.min(...s.pressures) > 0.85) &&
        strong > thin * 1.5 &&
        thin > 0,
      `la penna scrive, con la pressione: piano sottile, forte spesso; i tratti sono salvati nel browser (${JSON.stringify({ thin, strong, saved: saved1.map((s) => [s.pen, s.pressures.length]) })})`,
    )
    // Un colore; la gomma taglia le righe dove passa (col mouse, e con la gomma della penna).
    await lp.locator('.board-color[data-color="red"]').click()
    await penStroke(row(260, 0.5))
    await lp.locator('.board-button[aria-label="Gomma"]').click()
    await penStroke(Array.from({ length: 8 }, (_, i) => [stage.x + 120, stage.y + 110 + i * 15, 0.5]), { pointerType: 'mouse' })
    const afterErase = await strokeCount()
    await lp.locator('.board-button[aria-label="Penna"]').click()
    // La penna col tasto laterale cancella, anche con la penna scelta. Parte a 40 pixel dalla riga di
    // sopra: la gomma «Dove passa» veloce si allarga fino a tre volte (33 pixel), e i movimenti di
    // questa prova a volte arrivano quasi insieme, cioè velocissimi; da 30 pixel a volte la tagliava.
    await penStroke(Array.from({ length: 8 }, (_, i) => [stage.x + 240, stage.y + 240 + i * 8, 0.5]), { button: 'right' })
    const colors = (await savedStrokes(lp, note1)).map((s) => s.color).sort()
    check(
      afterErase === 5 &&
        (await strokeCount()) === 6 &&
        colors.join() === 'ink,ink,ink,ink,red,red' &&
        (await inkAt(stage.x + 120, stage.y + 140)) > 600 &&
        (await inkAt(stage.x + 80, stage.y + 140)) < 400 &&
        (await inkAt(stage.x + 160, stage.y + 140)) < 400,
      `la gomma cancella dove passa e taglia le righe in due, anche quella in fondo alla penna; il rosso resta rosso (${JSON.stringify({ afterErase, colors })})`,
    )
    // Annulla e Ripeti, con i pulsanti e da tastiera (spento il pulsante, il fuoco resta sulla lavagna).
    const undoBtn = lp.locator('.board-button[aria-label="Annulla"]')
    for (let i = 0; i < 5; i++) await undoBtn.click()
    const allUndone = await strokeCount()
    await lp.keyboard.press('Control+Y')
    const redoOne = await strokeCount()
    await lp.keyboard.press('Control+Shift+Z')
    const redoTwo = await strokeCount()
    await lp.keyboard.press('Control+Z')
    check(
      allUndone === 0 && redoOne === 1 && redoTwo === 2 && (await strokeCount()) === 1 && (await undoBtn.isEnabled()),
      `Annulla e Ripeti, anche con Ctrl+Z, Ctrl+Y e Ctrl+Maiusc+Z (${JSON.stringify({ allUndone, redoOne, redoTwo })})`,
    )
    for (let i = 0; i < 4; i++) await lp.keyboard.press('Control+Y')
    const drawn = await strokeCount()
    // Pulisci, con la conferma; Ctrl+Z la riporta.
    await lp.locator('.board-button[aria-label="Pulisci la lavagna"]').click()
    await lp.locator('dialog .btn-danger', { hasText: 'Pulisci' }).click()
    await lp.waitForFunction(() => document.querySelector('.board-pane').dataset.strokes === '0', null, { timeout: 3000 }).catch(() => {})
    const cleared = await strokeCount()
    await lp.keyboard.press('Control+Z')
    check(drawn === 6 && cleared === 0 && (await strokeCount()) === 6, `«Pulisci» chiede conferma e cancella tutto; Ctrl+Z lo fa tornare (${JSON.stringify({ drawn, cleared })})`)
    // Con la penna vista un dito solo non fa niente (è quasi sempre la mano appoggiata): non scrive e
    // non sposta. Due dita spostano la lavagna e la ingrandiscono. Prima si lascia passare il tempo in
    // cui un tocco, appena alzata la penna, vale come la mano.
    await lp.waitForTimeout(600)
    const inkBefore = await inkAt(stage.x + 80, stage.y + 140)
    await touch('touchStart', [[stage.x + 200, stage.y + 400]])
    for (let i = 1; i <= 8; i++) await touch('touchMove', [[stage.x + 200, stage.y + 400 + i * 10]])
    await touch('touchEnd', [])
    await lp.waitForTimeout(100)
    const oneFinger = { strokes: await strokeCount(), there: await inkAt(stage.x + 80, stage.y + 140), zoom: await lp.locator('.board-zoom-level').textContent() }
    await touch('touchStart', [[stage.x + 200, stage.y + 400]])
    await touch('touchStart', [[stage.x + 200, stage.y + 400], [stage.x + 300, stage.y + 400]])
    for (let i = 1; i <= 8; i++) await touch('touchMove', [[stage.x + 200, stage.y + 400 + i * 10], [stage.x + 300, stage.y + 400 + i * 10]])
    await touch('touchEnd', [])
    await lp.waitForTimeout(100)
    const moved = { strokes: await strokeCount(), before: inkBefore, there: await inkAt(stage.x + 80, stage.y + 140), below: await inkAt(stage.x + 80, stage.y + 220) }
    await touch('touchStart', [[stage.x + 150, stage.y + 500]])
    await touch('touchStart', [[stage.x + 150, stage.y + 500], [stage.x + 250, stage.y + 500]])
    for (let i = 1; i <= 8; i++) await touch('touchMove', [[stage.x + 150 - i * 6, stage.y + 500], [stage.x + 250 + i * 6, stage.y + 500]])
    await touch('touchEnd', [])
    await lp.waitForTimeout(100)
    const zoomed = await lp.locator('.board-zoom-level').textContent()
    check(
      oneFinger.strokes === 6 &&
        oneFinger.there < 400 &&
        oneFinger.zoom === '100%' &&
        moved.strokes === 6 &&
        moved.before < 400 &&
        moved.there > 600 &&
        moved.below < 400 &&
        Number.parseInt(zoomed) > 150 &&
        (await strokeCount()) === 6,
      `con la penna, un dito solo non scrive e non sposta; due dita spostano la lavagna e la ingrandiscono (${JSON.stringify({ oneFinger, moved, zoomed })})`,
    )
    // Il palmo appoggiato mentre si scrive con la penna non scrive e non sposta niente.
    await lp.locator('.board-zoom-level').click()
    await lp.waitForTimeout(100)
    const beforePalm = await inkAt(stage.x + 80, stage.y + 140)
    await penStroke(row(320, 0.5).slice(0, 2))
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: stage.x + 40, y: stage.y + 360, button: 'left', buttons: 1, clickCount: 1, pointerType: 'pen', force: 0.5 })
    await touch('touchStart', [[stage.x + 250, stage.y + 450]])
    for (let i = 1; i <= 6; i++) {
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: stage.x + 40 + i * 20, y: stage.y + 360, button: 'left', buttons: 1, pointerType: 'pen', force: 0.5 })
      await touch('touchMove', [[stage.x + 250 + i * 15, stage.y + 450 + i * 10]])
    }
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: stage.x + 160, y: stage.y + 360, button: 'left', buttons: 0, clickCount: 1, pointerType: 'pen', force: 0 })
    for (let i = 1; i <= 4; i++) await touch('touchMove', [[stage.x + 340 + i * 10, stage.y + 510]])
    await touch('touchEnd', [])
    await lp.waitForTimeout(100)
    const palm = { strokes: await strokeCount(), beforePalm, after: await inkAt(stage.x + 80, stage.y + 140), zoom: await lp.locator('.board-zoom-level').textContent() }
    check(
      palm.strokes === 8 && palm.beforePalm < 400 && palm.after < 400 && palm.zoom === '100%',
      `il palmo appoggiato mentre si scrive con la penna non scrive e non sposta la lavagna (${JSON.stringify(palm)})`,
    )
    // La mano che si appoggia appena alzata la penna, anche con due punti di contatto che si
    // allargano, non sposta e non ingrandisce la lavagna.
    const zoomText = () => lp.locator('.board-zoom-level').textContent()
    await penStroke(row(380, 0.5).slice(0, 3))
    await touch('touchStart', [[stage.x + 300, stage.y + 450]])
    await touch('touchStart', [[stage.x + 300, stage.y + 450], [stage.x + 340, stage.y + 470]])
    for (let i = 1; i <= 6; i++) await touch('touchMove', [[stage.x + 300 + i * 8, stage.y + 450 + i * 6], [stage.x + 340 + i * 14, stage.y + 470 + i * 9]])
    await touch('touchEnd', [])
    await lp.waitForTimeout(100)
    const afterPen = { strokes: await strokeCount(), ink: await inkAt(stage.x + 80, stage.y + 140), zoom: await zoomText() }
    // Due dita lontane dalla penna ingrandiscono; se il sistema annulla il tocco (l'iPad lo fa
    // quando capisce che era il palmo), la lavagna torna com'era.
    await lp.waitForTimeout(600)
    await touch('touchStart', [[stage.x + 150, stage.y + 500]])
    await touch('touchStart', [[stage.x + 150, stage.y + 500], [stage.x + 250, stage.y + 500]])
    // Le dita che si muovono appena (la mano che si posa trema) non cambiano niente.
    await touch('touchMove', [[stage.x + 147, stage.y + 501], [stage.x + 253, stage.y + 502]])
    const trembling = await zoomText()
    for (let i = 1; i <= 6; i++) await touch('touchMove', [[stage.x + 150 - i * 8, stage.y + 500], [stage.x + 250 + i * 8, stage.y + 500]])
    const pinching = await zoomText()
    await touch('touchCancel', [])
    await lp.waitForTimeout(100)
    const cancelled = { zoom: await zoomText(), ink: await inkAt(stage.x + 80, stage.y + 140) }
    check(
      afterPen.strokes === 9 &&
        afterPen.ink < 400 &&
        afterPen.zoom === '100%' &&
        trembling === '100%' &&
        Number.parseInt(pinching) > 150 &&
        cancelled.zoom === '100%' &&
        cancelled.ink < 400,
      `la mano appena alzata la penna non sposta e non ingrandisce, nemmeno le dita che tremano appena; un tocco annullato dal sistema riporta la lavagna com'era (${JSON.stringify({ afterPen, trembling, pinching, cancelled })})`,
    )
    // La mano sui pulsanti mentre si scrive (o appena dopo) non li preme; un dito, dopo, sì.
    const zoomIn = await lp.locator('.board-zoom .board-button[aria-label="Ingrandisci"]').boundingBox()
    const zoomInAt = [zoomIn.x + zoomIn.width / 2, zoomIn.y + zoomIn.height / 2]
    const tap = async (at) => {
      await touch('touchStart', [at])
      await touch('touchEnd', [])
    }
    const pen = (type, x, y) =>
      cdp.send('Input.dispatchMouseEvent', { type, x: stage.x + x, y: stage.y + y, button: 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1, pointerType: 'pen', force: 0.5 })
    await pen('mousePressed', 40, 440)
    await pen('mouseMoved', 70, 440)
    await tap(zoomInAt)
    await pen('mouseMoved', 100, 440)
    await pen('mouseReleased', 100, 440)
    await tap(zoomInAt)
    await lp.waitForTimeout(100)
    const palmButtons = await zoomText()
    await lp.waitForTimeout(600)
    await tap(zoomInAt)
    await lp.waitForTimeout(100)
    const fingerButton = await zoomText()
    check(
      palmButtons === '100%' && fingerButton === '125%' && (await strokeCount()) === 10,
      `la mano sui pulsanti mentre si scrive con la penna, o appena dopo, non li preme; un dito, dopo, sì (${JSON.stringify({ palmButtons, fingerButton })})`,
    )
    await lp.locator('.board-zoom-level').click()
    await lp.locator('.board-stage').focus()
    await lp.keyboard.press('Control+Z')
    await lp.keyboard.press('Control+Z')
    // Sull'iPad i tocchi sulla lavagna non devono selezionare le parole, aprire la lente o far
    // partire Scribble: il browser li riceve già annullati (i tratti arrivano dai puntatori). Sulla
    // lavagna e sui pulsanti non si seleziona niente, e Safari non accende il riquadro grigio.
    await lp.evaluate(() => {
      window.__touches = []
      for (const type of ['touchstart', 'touchmove', 'touchend']) document.addEventListener(type, (ev) => window.__touches.push(`${type}:${ev.defaultPrevented}`))
    })
    const middle = [stage.x + stage.width / 2, stage.y + stage.height / 2]
    await touch('touchStart', [middle])
    await touch('touchMove', [[middle[0] + 20, middle[1] + 10]])
    await touch('touchEnd', [])
    const noSelect = await lp.evaluate(() => {
      const css = getComputedStyle(document.querySelector('.board-pane'))
      return { touches: window.__touches, select: css.userSelect || css.webkitUserSelect, highlight: css.webkitTapHighlightColor }
    })
    check(
      noSelect.touches.join() === 'touchstart:true,touchmove:true,touchend:true' && noSelect.select === 'none' && noSelect.highlight === 'rgba(0, 0, 0, 0)' && (await strokeCount()) === 8,
      `i tocchi sulla lavagna non selezionano niente e non fanno partire Scribble (${JSON.stringify(noSelect)})`,
    )
    // Ogni nota ha la sua lavagna: in un'altra nota è vuota, tornando c'è ancora.
    await lp.locator('.notes-head button[aria-label="Nuova nota"]').click()
    await lp.waitForSelector('.board-pane[data-loaded="true"]')
    const otherNote = await boardPane.getAttribute('data-note')
    const emptyOther = await strokeCount()
    await penStroke(row(140, 0.5))
    await lp.locator('.note-item', { hasText: 'Lavagna di prova' }).click()
    await lp.waitForSelector(`.board-pane[data-note="${note1}"][data-loaded="true"]`)
    check(otherNote !== note1 && emptyOther === 0 && (await strokeCount()) === 8, `ogni nota ha la sua lavagna (${JSON.stringify({ emptyOther })})`)
    // Si salva: ricaricando la pagina c'è tutto, con la vista «Lavagna».
    await lp.reload()
    await lp.waitForSelector('.board-pane[data-loaded="true"]')
    check(
      (await lp.evaluate(() => document.querySelector('.app').dataset.view)) === 'board' && (await strokeCount()) === 8 && (await inkAt(stage.x + 80, stage.y + 140)) < 400,
      'ricaricando la pagina la lavagna c\'è ancora, salvata nel browser',
    )
    // Due schede sulla stessa nota: quello che si scrive in una compare nell'altra.
    const tabB = await lb.newPage()
    tabB.on('pageerror', (e) => errors.push(e.message))
    await tabB.goto(url)
    await tabB.waitForSelector('.board-pane[data-loaded="true"]')
    await penStroke(row(420, 0.6))
    await tabB.waitForFunction(() => document.querySelector('.board-pane').dataset.strokes === '9', null, { timeout: 3000 }).catch(() => {})
    check((await tabB.locator('.board-pane').getAttribute('data-strokes')) === '9', 'con Glifo aperto in due schede, quello che si scrive sulla lavagna in una compare nell\'altra')
    await tabB.close()
    // Tema scuro: la lavagna è scura e si scrive in chiaro.
    await lp.emulateMedia({ colorScheme: 'dark' })
    await lp.waitForTimeout(200)
    const darkPaper = await inkAt(stage.x + 390, stage.y + 600)
    const darkInk = await inkAt(stage.x + 80, stage.y + 140)
    check(darkPaper < 150 && darkInk > 600, `nel tema scuro la lavagna è scura e i tratti chiari (${JSON.stringify({ darkPaper, darkInk })})`)
    await lp.emulateMedia({ colorScheme: 'light' })
    // A tutto schermo copre la finestra, e sul computer chiede al browser lo schermo intero; il
    // resto dell'app, sotto, è nascosto. Esc la riporta com'era.
    await lp.evaluate(() => {
      window.__fullscreenCalls = 0
      const original = Element.prototype.requestFullscreen
      Element.prototype.requestFullscreen = function (...args) {
        window.__fullscreenCalls++
        return original.apply(this, args)
      }
    })
    const underBoard = () =>
      lp.evaluate(() => ['.editor-pane', '.notes-panel', '.float-bar', '.board-pane'].map((s) => getComputedStyle(document.querySelector(s)).visibility).join())
    await lp.locator('.board-button[aria-label="Schermo intero"]').click()
    await lp.waitForTimeout(300)
    const fullBox = await boardPane.boundingBox()
    const fullUnder = await underBoard()
    const fullCalls = await lp.evaluate(() => window.__fullscreenCalls)
    // Stampando con la lavagna a tutto schermo si stampa la nota, come sempre.
    await lp.emulateMedia({ media: 'print' })
    const fullPrint = await lp.evaluate(() => getComputedStyle(document.querySelector('.editor-pane')).visibility)
    await lp.emulateMedia({ media: 'screen' })
    await lp.keyboard.press('Escape')
    await lp.waitForTimeout(300)
    const backBox = await boardPane.boundingBox()
    const backUnder = await underBoard()
    check(
      fullBox.x === 0 &&
        fullBox.y === 0 &&
        fullBox.width === 1440 &&
        fullBox.height === 900 &&
        fullCalls === 1 &&
        fullUnder === 'hidden,hidden,hidden,visible' &&
        fullPrint === 'visible' &&
        backBox.width < 800 &&
        backUnder === 'visible,visible,visible,visible' &&
        !(await lp.evaluate(() => document.fullscreenElement)),
      `«Schermo intero» allarga la lavagna a tutta la finestra e nasconde il resto, Esc la riporta accanto al testo (${JSON.stringify({ fullBox, fullCalls, fullUnder, fullPrint, backBox, backUnder })})`,
    )
    // Eliminando la nota si elimina anche la sua lavagna.
    await lp.locator('.note-item', { hasText: 'Lavagna di prova' }).hover()
    await lp.locator('.note-item', { hasText: 'Lavagna di prova' }).locator('.note-delete').click()
    await lp.locator('dialog .btn-danger', { hasText: 'Elimina' }).click()
    await lp.waitForTimeout(300)
    check((await savedStrokes(lp, note1)).length === 0 && (await savedStrokes(lp, otherNote)).length === 1, 'eliminando una nota si elimina anche la sua lavagna, le altre restano')
    // Nella stampa la lavagna non c'è.
    await lp.emulateMedia({ media: 'print' })
    check((await lp.evaluate(() => getComputedStyle(document.querySelector('.board-pane')).display)) === 'none', 'la lavagna non va nella stampa')
    await lp.emulateMedia({ media: 'screen' })
    // Il backup (in Impostazioni) porta anche le lavagne, con i punti in una stringa; «Ripristina
    // backup» le rimette sulle note ricreate, che hanno un id nuovo.
    await lp.locator('.side-profile button[aria-label="Impostazioni"]').click()
    const [backupFile] = await Promise.all([lp.waitForEvent('download'), lp.locator('dialog button', { hasText: 'Scarica backup' }).click()])
    const backupData = JSON.parse(readFileSync(await backupFile.path(), 'utf8'))
    const backupBoards = (backupData.boards ?? []).map((b) => ({ note: b.note, strokes: b.strokes.length, points: typeof b.strokes[0]?.points }))
    const [chooser] = await Promise.all([lp.waitForEvent('filechooser'), lp.locator('dialog button', { hasText: 'Ripristina backup' }).click()])
    await chooser.setFiles(await backupFile.path())
    await lp.locator('.toast', { hasText: 'Ripristinati' }).waitFor()
    await lp.keyboard.press('Escape')
    await lp.locator('.note-item', { hasText: 'Nuovi appunti' }).first().click()
    await lp.waitForSelector('.board-pane[data-loaded="true"]')
    const restoredNote = await boardPane.getAttribute('data-note')
    check(
      JSON.stringify(backupBoards) === JSON.stringify([{ note: otherNote, strokes: 1, points: 'string' }]) && restoredNote !== otherNote && (await strokeCount()) === 1,
      `il backup porta anche le lavagne, e ripristinandolo tornano sulle note ricreate (${JSON.stringify({ backupBoards, restoredNote })})`,
    )
    await lb.close()
    // Sull'iPad (Safari si presenta come un Mac, con lo schermo touch) «Schermo intero» non chiede
    // lo schermo intero al browser: Safari ne usciva mentre si scriveva, prendendo i tocchi della
    // penna per una tastiera finta. La lavagna copre la finestra, e sotto il resto è nascosto.
    const ipadContext = await browser.newContext({
      viewport: { width: 1180, height: 820 },
      hasTouch: true,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
    })
    await ipadContext.addInitScript(() => {
      Object.defineProperty(Navigator.prototype, 'maxTouchPoints', { get: () => 5 })
      window.__fullscreenCalls = 0
      const original = Element.prototype.requestFullscreen
      Element.prototype.requestFullscreen = function (...args) {
        window.__fullscreenCalls++
        return original.apply(this, args)
      }
    })
    const ip = await ipadContext.newPage()
    ip.on('pageerror', (e) => errors.push(e.message))
    await ip.goto(url)
    await ip.waitForSelector('.cm-editor')
    await ip.locator('.view-button[aria-label="Lavagna"]').click()
    await ip.waitForSelector('.board-pane[data-loaded="true"]')
    await ip.locator('.board-button[aria-label="Schermo intero"]').click()
    await ip.waitForTimeout(300)
    const ipadFull = await ip.evaluate(() => {
      const r = document.querySelector('.board-pane').getBoundingClientRect()
      return {
        calls: window.__fullscreenCalls,
        browserFull: Boolean(document.fullscreenElement),
        covers: r.left === 0 && r.top === 0 && r.width === innerWidth && r.height === innerHeight,
        under: ['.editor-pane', '.notes-panel'].map((s) => getComputedStyle(document.querySelector(s)).visibility).join(),
      }
    })
    await ip.locator('.board-button[aria-label="Esci dallo schermo intero"]').click()
    await ip.waitForTimeout(200)
    const ipadBack = await ip.evaluate(() => ['.editor-pane', '.notes-panel'].map((s) => getComputedStyle(document.querySelector(s)).visibility).join())
    check(
      ipadFull.calls === 0 && !ipadFull.browserFull && ipadFull.covers && ipadFull.under === 'hidden,hidden' && ipadBack === 'visible,visible',
      `sull'iPad «Schermo intero» copre la finestra senza lo schermo intero del browser, e nasconde quello che c'è sotto (${JSON.stringify({ ipadFull, ipadBack })})`,
    )
    await ipadContext.close()
    // Il registro dei tocchi: si accende nelle impostazioni, annota penna, dita, la mano e quello che
    // fa il browser (senza il testo delle note); il pallino rosso sulla lavagna lo apre, con «Copia»
    // e «Scarica» per mandarlo a Claude. Resta acceso ricaricando la pagina.
    const logContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, hasTouch: true, acceptDownloads: true })
    await logContext.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(url).origin })
    const rp = await logContext.newPage()
    rp.on('pageerror', (e) => errors.push(e.message))
    await rp.goto(url)
    await rp.waitForSelector('.cm-editor')
    await rp.locator('.notes-head button[aria-label="Nuova nota"]').click()
    await rp.keyboard.type('Teorema segretissimo')
    await rp.locator('.view-button[aria-label="Lavagna"]').click()
    await rp.waitForSelector('.board-pane[data-loaded="true"]')
    const logDot = rp.locator('.board-button[aria-label="Registro dei tocchi"]')
    const dotBefore = await logDot.isVisible()
    await rp.locator('.side-profile button[aria-label="Impostazioni"]').click()
    await rp.locator('dialog .touch-log label.check').click()
    const settingsStatus = await rp.locator('dialog .touch-log-status').textContent()
    await rp.keyboard.press('Escape')
    const dotAfter = await logDot.isVisible()
    const rstage = await rp.locator('.board-stage').boundingBox()
    const rcdp = await logContext.newCDPSession(rp)
    const rtouch = (type, points) => rcdp.send('Input.dispatchTouchEvent', { type, touchPoints: points.map(([x, y], i) => ({ x, y, id: i + 1 })) })
    const rpen = (type, x, y, force = 0.5) =>
      rcdp.send('Input.dispatchMouseEvent', { type, x: rstage.x + x, y: rstage.y + y, button: 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1, pointerType: 'pen', force })
    // La penna scrive; intanto la mano si appoggia sulla lavagna e tocca «Ingrandisci».
    const zoomBox = await rp.locator('.board-zoom .board-button[aria-label="Ingrandisci"]').boundingBox()
    await rpen('mousePressed', 60, 200, 0.3)
    for (let i = 1; i <= 8; i++) await rpen('mouseMoved', 60 + i * 15, 200 + (i % 2) * 4, 0.3 + i * 0.05)
    await rtouch('touchStart', [[rstage.x + 260, rstage.y + 330]])
    await rtouch('touchEnd', [])
    await rtouch('touchStart', [[zoomBox.x + zoomBox.width / 2, zoomBox.y + zoomBox.height / 2]])
    await rtouch('touchEnd', [])
    await rpen('mouseReleased', 180, 200, 0)
    // Poi si scrive nel testo e si seleziona: nel registro solo dove e quanto, non il testo.
    await rp.locator('.view-button[aria-label="Diviso"]').click()
    await rp.locator('.cm-content').click()
    await rp.keyboard.press('Control+End')
    await rp.keyboard.type(' riservato')
    await rp.keyboard.press('Control+a')
    await rp.waitForTimeout(400)
    await rp.locator('.view-button[aria-label="Lavagna"]').click()
    await rp.waitForSelector('.board-pane[data-loaded="true"]')
    await logDot.click()
    await rp.locator('dialog.dialog-touch-log textarea').fill('la mano ha toccato Ingrandisci')
    await rp.locator('dialog.dialog-touch-log button', { hasText: 'Copia' }).click()
    const copied = await rp.evaluate(() => navigator.clipboard.readText())
    const [logFile] = await Promise.all([rp.waitForEvent('download'), rp.locator('dialog.dialog-touch-log button', { hasText: 'Scarica' }).click()])
    const logName = logFile.suggestedFilename()
    const logText = readFileSync(await logFile.path(), 'utf8')
    const has = (s) => copied.includes(s)
    const logOk = {
      dot: !dotBefore && dotAfter,
      status: settingsStatus,
      head: copied.startsWith('Registro dei tocchi di Glifo\nCopiato: ') && has('Dispositivo: ') && has('Cosa è successo: la mano ha toccato Ingrandisci'),
      pen: /penna \d+ giù \(\d+,\d+\) p 0\.30 · lavagna/.test(copied) && /penna \d+ muove ×\d+ .* p 0\.\d\d–0\.\d\d/.test(copied) && has('→ penna: scrive') && /tratto: \d+ punti, pressione/.test(copied),
      palm: /dito \d+ giù .* · lavagna/.test(copied) && has('→ mano (la penna sta scrivendo)') && has('→ clic della mano ignorato · strumenti della lavagna: «Ingrandisci»'),
      browser: has('touchstart') && has('· annullato') && has("vista dell'app: Diviso") && has('fuoco: editor') && /scrittura: insertText ×\d+, \d+ caratteri · editor/.test(copied) && /selezione: \d+ caratteri · editor/.test(copied),
      mark: has('segno: premuto il pallino del registro'),
      secret: !/segretissimo|riservato|Teorema/.test(copied),
      file: /^glifo-registro-\d{4}-\d{2}-\d{2}-\d{4}\.txt$/.test(logName) && logText.startsWith('Registro dei tocchi di Glifo') && logText.includes('→ mano'),
    }
    check(
      Object.values(logOk).every((v) => v === true || typeof v === 'string') && logOk.status.startsWith('Sta registrando'),
      `il registro dei tocchi annota penna, mano e browser senza il testo delle note, e si copia e si scarica (${JSON.stringify(logOk)})`,
    )
    if (!logOk.pen || !logOk.palm || !logOk.browser) console.log(copied.split('\n').slice(0, 80).join('\n'))
    // Ricaricando resta acceso; «Svuota» lo ricomincia, e spento il pallino sparisce.
    await rp.keyboard.press('Escape')
    await rp.reload()
    await rp.waitForSelector('.board-pane[data-loaded="true"]')
    const afterReload = { dot: await logDot.isVisible(), resumed: await rp.evaluate(() => JSON.parse(localStorage.getItem('glifo.registro.v1')).lines.some((l) => l.includes('pagina aperta: il registro riprende'))) }
    await logDot.click()
    await rp.locator('dialog.dialog-touch-log button', { hasText: 'Svuota' }).click()
    const emptied = await rp.evaluate(() => JSON.parse(localStorage.getItem('glifo.registro.v1')).lines.length)
    await rp.locator('dialog.dialog-touch-log label.check').click()
    await rp.keyboard.press('Escape')
    const off = { dot: await logDot.isVisible(), saved: await rp.evaluate(() => JSON.parse(localStorage.getItem('glifo.registro.v1')).on) }
    check(
      afterReload.dot && afterReload.resumed && emptied <= 3 && !off.dot && off.saved === false,
      `il registro resta acceso ricaricando la pagina, «Svuota» lo ricomincia e spento il pallino sparisce (${JSON.stringify({ afterReload, emptied, off })})`,
    )
    await logContext.close()
    // Sul telefono la lavagna prende il posto del testo, e un dito scrive (finché non si usa una penna).
    // Largo 360 pixel, come tanti Android: la barra della lavagna ci sta tutta, anche con il lazo.
    const phoneBoard = await browser.newContext({ viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true })
    const pb = await phoneBoard.newPage()
    pb.on('pageerror', (e) => errors.push(e.message))
    await pb.goto(url)
    await pb.waitForSelector('.cm-editor')
    await pb.locator('.view-button[aria-label="Lavagna"]').tap()
    await pb.waitForSelector('.board-pane[data-loaded="true"]')
    const pcdp = await phoneBoard.newCDPSession(pb)
    const ptouch = (type, points) => pcdp.send('Input.dispatchTouchEvent', { type, touchPoints: points.map(([x, y], i) => ({ x, y, id: i + 1 })) })
    await ptouch('touchStart', [[60, 300]])
    for (let i = 1; i <= 10; i++) await ptouch('touchMove', [[60 + i * 20, 300 + i * 5]])
    await ptouch('touchEnd', [])
    await pb.waitForTimeout(100)
    const phoneLayout = await pb.evaluate(() => {
      const board = document.querySelector('.board-pane').getBoundingClientRect()
      const fits = [...document.querySelectorAll('.board-tools, .board-history, .board-zoom, .view-switch')].every((el) => {
        const r = el.getBoundingClientRect()
        return r.left >= 0 && r.right <= innerWidth && el.scrollWidth <= el.clientWidth + 1
      })
      return {
        full: board.left === 0 && board.width === innerWidth && board.bottom === innerHeight,
        noEditor: getComputedStyle(document.querySelector('.editor-pane')).display === 'none',
        noFormat: [...document.querySelectorAll('.float-bar .editor-toolbar')].every((t) => !t.offsetParent),
        fits,
        strokes: document.querySelector('.board-pane').dataset.strokes,
        scroll: document.documentElement.scrollWidth <= innerWidth,
      }
    })
    check(
      phoneLayout.full && phoneLayout.noEditor && phoneLayout.noFormat && phoneLayout.fits && phoneLayout.strokes === '1' && phoneLayout.scroll,
      `sul telefono la lavagna prende il posto del testo, gli strumenti stanno nello schermo e il dito scrive (${JSON.stringify(phoneLayout)})`,
    )
    // Il lazo col dito (senza penna il dito scrive, e con il lazo seleziona): prende la riga, e il menu
    // della selezione sta nello schermo, su due righe (le azioni sopra, i colori sotto).
    await pb.locator('.board-button[aria-label="Selezione"]').tap()
    const loopAround = Array.from({ length: 30 }, (_, i) => [160 + 150 * Math.cos((i / 28) * 2 * Math.PI), 325 + 70 * Math.sin((i / 28) * 2 * Math.PI)])
    await ptouch('touchStart', [loopAround[0]])
    for (const q of loopAround.slice(1)) await ptouch('touchMove', [q])
    await ptouch('touchEnd', [])
    await pb.waitForTimeout(100)
    const phoneSelection = await pb.evaluate(() => {
      const menu = document.querySelector('.board-sel-menu')
      if (!menu) return { selected: document.querySelector('.board-pane').dataset.selected, menu: false }
      const r = menu.getBoundingClientRect()
      const items = [...menu.querySelectorAll('.board-sel-item')].map((b) => b.getBoundingClientRect())
      const colors = menu.querySelector('.board-sel-colors').getBoundingClientRect()
      return {
        selected: document.querySelector('.board-pane').dataset.selected,
        inside: r.left >= 0 && r.right <= innerWidth,
        oneRow: items.every((b) => Math.abs(b.top - items[0].top) < 1),
        colorsBelow: colors.top >= items[0].bottom - 1,
      }
    })
    check(
      phoneSelection.selected === '1' && phoneSelection.inside && phoneSelection.oneRow && phoneSelection.colorsBelow,
      `sul telefono il lazo col dito prende la riga, e il menu della selezione sta nello schermo con i colori sotto (${JSON.stringify(phoneSelection)})`,
    )
    await phoneBoard.close()
    // Gli strumenti: l'evidenziatore (trasparente, sempre sotto la scrittura), lo spessore della penna,
    // la gomma «Linea intera» che toccando un punto toglie tutta la linea e quella «Dove passa» che,
    // mossa veloce, si allarga. Cambiando strumento la barra non si sposta; le scelte restano
    // ricaricando la pagina.
    const toolsContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, hasTouch: true })
    const tp = await toolsContext.newPage()
    tp.on('pageerror', (e) => errors.push(e.message))
    await tp.goto(url)
    await tp.waitForSelector('.cm-editor')
    await tp.locator('.notes-head button[aria-label="Nuova nota"]').click()
    await tp.keyboard.type('Strumenti della lavagna')
    await tp.locator('.view-button[aria-label="Lavagna"]').click()
    await tp.waitForSelector('.board-pane[data-loaded="true"]')
    const tcdp = await toolsContext.newCDPSession(tp)
    const tpane = tp.locator('.board-pane')
    const tcount = async () => Number(await tpane.getAttribute('data-strokes'))
    const tstage = await tp.locator('.board-stage').boundingBox()
    /** Un tratto: punti [x, y] sulla lavagna; `pause` ms tra un movimento e l'altro. */
    const tstroke = async (points, { pointerType = 'pen', pause = 0 } = {}) => {
      const send = (type, [x, y], pressed = true) =>
        tcdp.send('Input.dispatchMouseEvent', { type, x: tstage.x + x, y: tstage.y + y, button: 'left', buttons: pressed ? 1 : 0, clickCount: 1, pointerType, force: 0.5 })
      await send('mousePressed', points[0])
      for (const q of points.slice(1)) {
        await send('mouseMoved', q)
        if (pause) await tp.waitForTimeout(pause)
      }
      await send('mouseReleased', points.at(-1), false)
    }
    const across = (y, from = 40, to = 330) => Array.from({ length: 16 }, (_, i) => [from + ((to - from) * i) / 15, y])
    const down = (x, from, to, step) => Array.from({ length: Math.round((to - from) / step) + 1 }, (_, i) => [x, from + i * step])
    /** Il colore della lavagna in un punto (sulla lavagna): [r, g, b]. */
    const rgbAt = (x, y) =>
      tp.evaluate(([x, y]) => {
        const c = document.querySelector('.board-canvas')
        const r = c.getBoundingClientRect()
        const k = c.width / r.width
        return [...c.getContext('2d').getImageData(Math.round((x - r.left) * k), Math.round((y - r.top) * k), 1, 1).data].slice(0, 3)
      }, [tstage.x + x, tstage.y + y])
    const sum = async (x, y) => (await rgbAt(x, y)).reduce((a, b) => a + b, 0)
    /** Aspetta che la lavagna abbia ridisegnato: la gomma e Annulla ridisegnano al fotogramma dopo. */
    const painted = () => tp.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(() => done()))))
    /** Quanto è spessa la riga a `dy` (pixel scuri in verticale). */
    const thickness = async (dy) => {
      let n = 0
      for (let y = dy - 8; y <= dy + 8; y += 0.5) if ((await sum(185, y)) < 400) n++
      return n
    }
    /** Quanto è largo il buco della gomma nella riga a `dy` attorno a `x` (pixel di carta). */
    const gap = async (x, dy) => {
      let n = 0
      for (let i = x - 45; i <= x + 45; i++) if ((await sum(i, dy)) > 600) n++
      return n
    }
    const tsaved = (note) =>
      tp.evaluate(
        (note) =>
          new Promise((resolve, reject) => {
            const open = indexedDB.open('glifo-lavagne')
            open.onerror = () => reject(open.error)
            open.onsuccess = () => {
              const db = open.result
              const req = db.transaction('strokes', 'readonly').objectStore('strokes').getAll(IDBKeyRange.bound([note], [note, []]))
              req.onerror = () => reject(req.error)
              req.onsuccess = () => {
                db.close()
                resolve(req.result.map((r) => ({ color: r.color, size: r.size, highlight: r.highlight === true })))
              }
            }
          }),
        note,
      )
    const gommaX = () => tp.locator('.board-button[aria-label="Gomma"]').evaluate((b) => Math.round(b.getBoundingClientRect().x))
    const toolsAt = { pen: await gommaX() }
    // Una riga scritta, poi l'evidenziatore giallo sopra (più largo) e uno verde sotto.
    await tstroke(across(150))
    await tp.locator('.board-button[aria-label="Evidenziatore"]').click()
    toolsAt.highlight = await gommaX()
    await tstroke(across(150, 30, 340))
    await tp.locator('.board-color[data-highlight="green"]').click()
    await tstroke(across(205, 30, 340))
    await painted()
    const [inkOver, yellow, green] = [await rgbAt(185, 150), await rgbAt(185, 143), await rgbAt(185, 205)]
    const tnote = await tpane.getAttribute('data-note')
    const marked = (await tsaved(tnote)).filter((s) => s.highlight)
    check(
      inkOver.reduce((a, b) => a + b, 0) < 250 &&
        yellow[0] > 200 && yellow[0] - yellow[2] > 60 && yellow[2] > 100 &&
        green[1] > green[0] + 30 && green[1] > green[2] + 20 &&
        marked.map((s) => s.color).sort().join() === 'green,yellow' &&
        marked.every((s) => s.size === 18),
      `l'evidenziatore è trasparente e sta sotto la scrittura anche se fatto dopo; giallo e verde (${JSON.stringify({ inkOver, yellow, green, marked })})`,
    )
    // Lo spessore della penna: il pulsante con il pallino apre il menu; spessa, poi fine.
    await tp.locator('.board-button[aria-label="Penna"]').click()
    await tp.locator('.board-size').click()
    const penMenu = await tp.locator('.board-menu').textContent()
    // Subito sotto la barra: accanto al testo la lavagna ha sopra la fascia dei pulsanti volanti, e il
    // menu finiva 48 pixel più giù.
    const menuGap = await tp.evaluate(() => document.querySelector('.board-menu').getBoundingClientRect().top - document.querySelector('.board-tools').getBoundingClientRect().bottom)
    await tp.locator('.board-menu-option', { hasText: 'spessa' }).click()
    const menuClosed = (await tp.locator('.board-menu').count()) === 0
    await tstroke(across(265))
    await tp.locator('.board-size').click()
    await tp.locator('.board-menu-option', { hasText: 'fine' }).click()
    await tstroke(across(320))
    await painted()
    const [thickLine, thinLine] = [await thickness(265), await thickness(320)]
    const penSizes = (await tsaved(tnote)).filter((s) => !s.highlight).map((s) => s.size).sort((a, b) => a - b)
    check(
      penMenu.startsWith('Spessore') && menuGap >= 0 && menuGap <= 12 && menuClosed && thickLine > thinLine * 1.8 && thinLine > 0 && penSizes.join() === '2,3.2,5.5',
      `lo spessore della penna si sceglie dal menu, che si apre subito sotto la barra: fine, media, spessa (${JSON.stringify({ penMenu, menuGap, thickLine, thinLine, penSizes })})`,
    )
    // La gomma «Linea intera»: il pulsante del modo apre solo i modi, quello della misura solo le
    // grandezze, la gomma premuta di nuovo tutti e due. Poi toccando un punto va via tutta la riga spessa.
    await tp.locator('.board-button[aria-label="Gomma"]').click()
    toolsAt.eraser = await gommaX()
    const menuText = async () => ((await tp.locator('.board-menu').count()) ? await tp.locator('.board-menu').textContent() : '')
    await tp.locator('.board-mode').click()
    const modeMenu = await menuText()
    await tp.locator('.board-size').click()
    const sizeMenu = await menuText()
    await tp.locator('.board-button[aria-label="Gomma"]').click()
    const bothMenu = await menuText()
    await tp.keyboard.press('Escape')
    const escClosed = (await menuText()) === ''
    await tp.locator('.board-mode').click()
    await tp.locator('.board-menu-option', { hasText: 'Linea intera' }).click()
    const before = await tcount()
    await tstroke([[60, 265]], { pointerType: 'mouse' })
    await painted()
    const afterTap = { strokes: await tcount(), start: await sum(60, 265), middle: await sum(185, 265), end: await sum(320, 265), thin: await sum(185, 320) }
    await tp.keyboard.press('Control+Z')
    await painted()
    const undone = { strokes: await tcount(), middle: await sum(185, 265) }
    check(
      modeMenu.includes('Come cancella') && !modeMenu.includes('Grandezza') &&
        sizeMenu.includes('Grandezza') && !sizeMenu.includes('Come cancella') &&
        bothMenu.includes('Come cancella') && bothMenu.includes('Grandezza') && escClosed &&
        (await tpane.getAttribute('data-eraser')) === 'stroke' &&
        afterTap.strokes === before - 1 && afterTap.start > 600 && afterTap.middle > 600 && afterTap.end > 600 && afterTap.thin < 600 &&
        undone.strokes === before && undone.middle < 400,
      `la gomma «Linea intera» toccando un punto toglie tutta la riga e le altre restano; Ctrl+Z la rimette (${JSON.stringify({ modeMenu, sizeMenu, bothMenu, before, afterTap, undone })})`,
    )
    // La gomma «Dove passa»: piano cancella poco, veloce si allarga (passi lunghi, perché la velocità
    // è la media degli ultimi movimenti).
    await tp.locator('.board-mode').click()
    await tp.locator('.board-menu-option', { hasText: 'Dove passa' }).click()
    await tp.locator('.board-button[aria-label="Penna"]').click()
    await tp.locator('.board-size').click()
    await tp.locator('.board-menu-option', { hasText: 'media' }).click()
    await tstroke(across(400))
    await tp.locator('.board-button[aria-label="Gomma"]').click()
    await tstroke(down(110, 380, 420, 2), { pointerType: 'mouse', pause: 25 })
    await tstroke(down(250, 280, 520, 40), { pointerType: 'mouse' })
    await painted()
    const [slowGap, fastGap] = [await gap(110, 400), await gap(250, 400)]
    check(
      slowGap > 8 && fastGap > slowGap * 1.8,
      `la gomma «Dove passa» cancella dove passa e, mossa veloce, si allarga (${JSON.stringify({ slowGap, fastGap })})`,
    )
    // Cambiando strumento la barra resta ferma (anche con il lazo, che al posto dei colori ha «Tutto» e
    // «Incolla»); ricaricando la pagina restano lo spessore, il colore dell'evidenziatore e il modo della gomma.
    await tp.locator('.board-button[aria-label="Selezione"]').click()
    toolsAt.lasso = await gommaX()
    await tp.locator('.board-button[aria-label="Gomma"]').click()
    await tp.locator('.board-mode').click()
    await tp.locator('.board-menu-option', { hasText: 'Linea intera' }).click()
    await tp.locator('.board-button[aria-label="Penna"]').click()
    await tp.locator('.board-size').click()
    await tp.locator('.board-menu-option', { hasText: 'fine' }).click()
    await tp.reload()
    await tp.waitForSelector('.board-pane[data-loaded="true"]')
    const kept = {
      size: await tp.locator('.board-size').getAttribute('aria-label'),
      eraser: await tpane.getAttribute('data-eraser'),
      green: await tp.locator('.board-color[data-highlight="green"]').getAttribute('aria-pressed'),
      strokes: await tcount(),
    }
    check(
      toolsAt.pen === toolsAt.highlight && toolsAt.pen === toolsAt.eraser && toolsAt.pen === toolsAt.lasso &&
        kept.size === 'Spessore della penna: fine' && kept.eraser === 'stroke' && kept.green === 'true' && kept.strokes > 0,
      `cambiando strumento la barra non si sposta, e ricaricando restano spessore, colore e modo della gomma (${JSON.stringify({ toolsAt, kept })})`,
    )
    // Le figure precise: tenendo ferma la penna alla fine del tratto, la linea diventa dritta (e la
    // penna ancora giù la allunga); Annulla riporta il tratto a mano. Con le «Forme automatiche» le
    // figure diventano precise da sole, la scrittura no. In una nota nuova, con la lavagna vuota.
    await tp.locator('.notes-head button[aria-label="Nuova nota"]').click()
    await tp.keyboard.type('Figure precise')
    await tp.waitForSelector('.board-pane[data-loaded="true"][data-strokes="0"]')
    const fnote = await tpane.getAttribute('data-note')
    const fsaved = () =>
      tp.evaluate(
        (note) =>
          new Promise((resolve, reject) => {
            const open = indexedDB.open('glifo-lavagne')
            open.onerror = () => reject(open.error)
            open.onsuccess = () => {
              const db = open.result
              const req = db.transaction('strokes', 'readonly').objectStore('strokes').getAll(IDBKeyRange.bound([note], [note, []]))
              req.onerror = () => reject(req.error)
              req.onsuccess = () => {
                db.close()
                resolve(req.result.map((r) => ({ shape: r.shape === true, highlight: r.highlight === true, points: Array.from(r.points).map((v) => Math.round(v * 100) / 100) })))
              }
            }
          }),
        fnote,
      )
    /** Un tratto con la penna che alla fine resta ferma `hold` ms, poi (se ci sono) va ai punti `after`. */
    const penHold = async (points, hold, after = []) => {
      const send = (type, [x, y], pressed = true) =>
        tcdp.send('Input.dispatchMouseEvent', { type, x: tstage.x + x, y: tstage.y + y, button: 'left', buttons: pressed ? 1 : 0, clickCount: 1, pointerType: 'pen', force: 0.5 })
      await send('mousePressed', points[0])
      for (const q of points.slice(1)) await send('mouseMoved', q)
      if (hold) await tp.waitForTimeout(hold)
      for (const q of after) await send('mouseMoved', q)
      await send('mouseReleased', (after.length ? after : points).at(-1), false)
    }
    const wobbly = (x0, x1, y, n = 24) => Array.from({ length: n }, (_, i) => [x0 + ((x1 - x0) * i) / (n - 1), y + Math.sin(i * 1.3) * 3 + (i / (n - 1)) * 4])
    await penHold(wobbly(60, 330, 150), 800)
    await painted()
    const held = { shape: await tpane.getAttribute('data-shape'), saved: await fsaved() }
    const heldLine = held.saved[0]
    const lineY = heldLine?.points[1]
    const straight = {
      flat: heldLine?.shape && heldLine.points.length === 6 && heldLine.points[1] === heldLine.points[4],
      ink: Math.min(await sum(195, lineY - 1), await sum(195, lineY), await sum(195, lineY + 1)) < 400,
      paper: (await sum(195, Math.round(lineY) - 6)) > 600 && (await sum(195, Math.round(lineY) + 6)) > 600,
    }
    // La penna ancora giù dopo che la linea è diventata dritta: la allunga.
    await penHold(wobbly(60, 200, 230, 14), 800, [[230, 232], [260, 233], [300, 232]])
    await painted()
    const longer = (await fsaved()).find((s) => s.points[1] > 200)
    check(
      held.shape === 'line' && held.saved.length === 1 && Object.values(straight).every(Boolean) && longer?.shape && Math.abs(longer.points[3] - 300) < 4 && longer.points[1] === longer.points[4],
      `tenendo ferma la penna alla fine, la linea diventa dritta; con la penna ancora giù la si allunga (${JSON.stringify({ held: held.shape, straight, longer: longer?.points })})`,
    )
    // Annulla: prima torna il tratto a mano, poi va via anche quello; Ripeti rimette la figura.
    await tp.keyboard.press('Control+Z')
    const undoOnce = (await fsaved()).find((s) => s.points[1] > 200)
    await tp.keyboard.press('Control+Z')
    const undoTwice = await tcount()
    await tp.keyboard.press('Control+Y')
    await tp.keyboard.press('Control+Y')
    const redone = (await fsaved()).find((s) => s.points[1] > 200)
    check(
      undoOnce && !undoOnce.shape && undoOnce.points.length > 30 && undoTwice === 1 && redone?.shape === true,
      `Annulla toglie la figura e riporta il tratto fatto a mano, poi toglie anche quello; Ripeti rimette la figura (${JSON.stringify({ undoOnce: undoOnce && { shape: undoOnce.shape, n: undoOnce.points.length / 3 }, undoTwice, redone: redone?.shape })})`,
    )
    // Le forme automatiche, dal menu della penna (la penna premuta di nuovo).
    await tp.locator('.board-button[aria-label="Penna"]').click()
    await tp.locator('.board-menu-switch').click()
    const switched = { checked: await tp.locator('.board-menu-switch').getAttribute('aria-checked'), mode: await tpane.getAttribute('data-shapes'), open: (await tp.locator('.board-menu').count()) === 1 }
    await tp.keyboard.press('Escape')
    const rect = [[70, 300], [250, 303], [252, 420], [72, 418], [70, 301]].flatMap(([x, y], i, all) =>
      i === 0 ? [[x, y]] : Array.from({ length: 10 }, (_, k) => [all[i - 1][0] + ((x - all[i - 1][0]) * (k + 1)) / 10 + Math.sin(k) * 1.5, all[i - 1][1] + ((y - all[i - 1][1]) * (k + 1)) / 10 + Math.cos(k) * 1.5]),
    )
    await penHold(rect, 0)
    const autoRect = { shape: await tpane.getAttribute('data-shape'), saved: (await fsaved()).find((s) => s.points[1] > 280) }
    // Una parola scritta a mano, piccola: resta com'è.
    const word = Array.from({ length: 30 }, (_, i) => [300 + i * 1.6, 470 + Math.sin(i * 0.9) * 7])
    await penHold(word, 0)
    const written = (await fsaved()).find((s) => s.points[1] > 450)
    await tp.reload()
    await tp.waitForSelector('.board-pane[data-loaded="true"]')
    const keptAuto = await tpane.getAttribute('data-shapes')
    check(
      switched.checked === 'true' && switched.mode === 'auto' && switched.open &&
        autoRect.shape === 'rectangle' && autoRect.saved?.shape && autoRect.saved.points.length === 15 &&
        written && !written.shape && keptAuto === 'auto',
      `«Forme automatiche» nel menu della penna: il rettangolo fatto a mano diventa preciso da solo, la scrittura resta com'è, e ricaricando resta acceso (${JSON.stringify({ switched, autoRect: autoRect.shape, written: written && !written.shape, keptAuto })})`,
    )
    // L'evidenziatore tenuto fermo diventa una linea dritta (e resta evidenziatore).
    await tp.locator('.board-button[aria-label="Evidenziatore"]').click()
    await penHold(wobbly(60, 330, 520), 800)
    const marker = (await fsaved()).find((s) => s.highlight)
    check(marker?.shape === true && marker.points[1] === marker.points[4], `l'evidenziatore tenuto fermo diventa una linea dritta (${JSON.stringify(marker?.points)})`)
    // La selezione, come in Note di Apple. In una nota nuova, con le forme automatiche spente (le righe
    // dritte diventerebbero linee precise): tre righe scritte con la penna (spessore fine, 2).
    await tp.locator('.notes-head button[aria-label="Nuova nota"]').click()
    await tp.keyboard.type('Selezione')
    await tp.waitForSelector('.board-pane[data-loaded="true"][data-strokes="0"]')
    await tp.locator('.board-button[aria-label="Penna"]').click()
    await tp.locator('.board-button[aria-label="Penna"]').click()
    await tp.locator('.board-menu-switch').click()
    await tp.keyboard.press('Escape')
    const snote = await tpane.getAttribute('data-note')
    /** I tratti salvati della nota: colore, spessore e il primo punto, dall'alto in basso. */
    const ssaved = () =>
      tp.evaluate(
        (note) =>
          new Promise((resolve, reject) => {
            const open = indexedDB.open('glifo-lavagne')
            open.onerror = () => reject(open.error)
            open.onsuccess = () => {
              const db = open.result
              const req = db.transaction('strokes', 'readonly').objectStore('strokes').getAll(IDBKeyRange.bound([note], [note, []]))
              req.onerror = () => reject(req.error)
              req.onsuccess = () => {
                db.close()
                resolve(req.result.map((r) => ({ color: r.color, size: r.size, x: Math.round(r.points[0]), y: Math.round(r.points[1]) })).sort((a, b) => a.y - b.y || a.x - b.x))
              }
            }
          }),
        snote,
      )
    const selectedNow = async () => Number(await tpane.getAttribute('data-selected'))
    const firstPoints = async () => (await ssaved()).map((s) => [s.x, s.y])
    for (const y of [150, 200, 320]) await tstroke(across(y, 40, 300))
    // Il lazo intorno alle prime due: prese, con l'alone, il riquadro e il menu (sotto la barra).
    await tp.locator('.board-button[aria-label="Selezione"]').click()
    const ring = (cx, cy, rx, ry) => Array.from({ length: 36 }, (_, i) => [cx + rx * Math.cos((i / 34) * 2 * Math.PI), cy + ry * Math.sin((i / 34) * 2 * Math.PI)])
    const haloBefore = await rgbAt(185, 154)
    await tstroke(ring(170, 175, 175, 55))
    await painted()
    const lassoTaken = {
      shapes: await tpane.getAttribute('data-shapes'),
      selected: await selectedNow(),
      halo: await rgbAt(185, 154),
      haloBefore,
      menu: await tp.locator('.board-sel-menu[data-kind="selection"]').textContent().catch(() => ''),
      menuFree: await tp.evaluate(() => document.querySelector('.board-sel-menu').getBoundingClientRect().top >= document.querySelector('.board-tools').getBoundingClientRect().bottom),
    }
    check(
      lassoTaken.shapes === 'hold' && lassoTaken.selected === 2 &&
        lassoTaken.haloBefore.every((c) => c > 230) && lassoTaken.halo[2] - lassoTaken.halo[0] > 25 &&
        ['Taglia', 'Copia', 'Duplica', 'Elimina'].every((w) => lassoTaken.menu.includes(w)) && lassoTaken.menuFree,
      `il lazo intorno a due righe le prende: l'alone colorato e il menu con Taglia, Copia, Duplica ed Elimina, sotto la barra (${JSON.stringify(lassoTaken)})`,
    )
    // Trascinata si sposta (di 60 e 100); Annulla la rimette dov'era e resta selezionata, Ripeti la risposta.
    const rows = await firstPoints()
    await tstroke([[170, 175], [176, 181], [200, 220], [230, 275]], { pause: 16 })
    await painted()
    const dragged = { points: await firstPoints(), selected: await selectedNow(), oldPlace: await sum(185, 150), newPlace: await sum(245, 250) }
    await tp.keyboard.press('Control+Z')
    const undoneMove = { points: await firstPoints(), selected: await selectedNow() }
    await tp.keyboard.press('Control+Y')
    const redoneMove = { points: await firstPoints(), selected: await selectedNow() }
    // Il pallino nell'angolo in basso a destra (le righe vanno da 100 a 360, a 250 e 300; il riquadro
    // arriva 1,5 più in là e il pallino è a 6 pixel): tirato di metà diagonale, una volta e mezza.
    await tstroke([[366, 306], [380, 309], [430, 320], [497.5, 332.5]], { pause: 16 })
    const scaled = await ssaved()
    check(
      JSON.stringify(rows) === '[[40,150],[40,200],[40,320]]' &&
        JSON.stringify(dragged.points) === '[[100,250],[100,300],[40,320]]' && dragged.selected === 2 && dragged.oldPlace > 600 && dragged.newPlace < 400 &&
        JSON.stringify(undoneMove.points) === JSON.stringify(rows) && undoneMove.selected === 2 &&
        JSON.stringify(redoneMove.points) === JSON.stringify(dragged.points) && redoneMove.selected === 2 &&
        scaled.filter((s) => s.size === 3).length === 2 && scaled.some((s) => s.size === 2 && s.y === 320) && scaled.some((s) => s.size === 3 && s.y === 326),
      `trascinata la selezione si sposta, Annulla e Ripeti la tengono selezionata, il pallino nell'angolo la ingrandisce con lo spessore (${JSON.stringify({ rows, dragged, undoneMove, redoneMove, scaled })})`,
    )
    // Dal menu il colore; un tocco sulla selezione chiude il menu, un altro lo riapre; Copia e, toccando
    // un punto vuoto, «Incolla» lì (tutto dentro la vista: le righe sono larghe e il punto è vicino al
    // bordo); un tocco su una riga la prende; Duplica la copia un po' più in là; Taglia e «Incolla»
    // della barra la rimettono dov'era.
    await tp.locator('.board-sel-menu .board-color[data-recolor="red"]').click()
    const reds = (await ssaved()).filter((s) => s.color === 'red').length
    await tstroke([[200, 280]], { pointerType: 'mouse' })
    const menuAfterTap = await tp.locator('.board-sel-menu').count()
    await tstroke([[200, 280]], { pointerType: 'mouse' })
    const menuAfterTwo = await tp.locator('.board-sel-menu').count()
    await tp.locator('.board-sel-menu .board-sel-item', { hasText: 'Copia' }).click()
    const copiedSel = { menu: await tp.locator('.board-sel-menu').count(), selected: await selectedNow(), paste: await tp.locator('.board-paste').isEnabled() }
    await tstroke([[150, 560]], { pointerType: 'mouse' })
    const deselected = { selected: await selectedNow(), menu: await tp.locator('.board-sel-menu').count() }
    await tstroke([[150, 560]], { pointerType: 'mouse' })
    const pasteMenu = await tp.locator('.board-sel-menu[data-kind="paste"]').textContent().catch(() => '')
    await tp.locator('.board-sel-menu .board-sel-item', { hasText: 'Incolla' }).click()
    const pasted = (await ssaved()).filter((s) => s.y > 450)
    const pastedState = { strokes: await tcount(), selected: await selectedNow(), pasted }
    await tstroke([[60, 320]], { pointerType: 'mouse' })
    const tapped = { selected: await selectedNow(), menu: await tp.locator('.board-sel-menu[data-kind="selection"]').count() }
    await tp.locator('.board-sel-menu .board-sel-item', { hasText: 'Duplica' }).click()
    const duplicated = { strokes: await tcount(), selected: await selectedNow(), copy: (await ssaved()).find((s) => s.x === 60 && s.y === 340) }
    await tp.locator('.board-sel-menu .board-sel-item', { hasText: 'Taglia' }).click()
    const cut = { strokes: await tcount(), selected: await selectedNow() }
    await tp.locator('.board-paste').click()
    const backAgain = { strokes: await tcount(), selected: await selectedNow(), copy: (await ssaved()).find((s) => s.x === 60 && s.y === 340) }
    check(
      reds === 2 && menuAfterTap === 0 && menuAfterTwo === 1 &&
        copiedSel.menu === 0 && copiedSel.selected === 2 && copiedSel.paste &&
        deselected.selected === 0 && deselected.menu === 0 && pasteMenu === 'Incolla' &&
        pastedState.strokes === 5 && pastedState.selected === 2 && pasted.length === 2 && pasted.every((s) => s.color === 'red' && s.size === 3 && s.x >= 0) &&
        Math.abs((pasted[0].y + pasted[1].y) / 2 - 560) < 6 &&
        tapped.selected === 1 && tapped.menu === 1 &&
        duplicated.strokes === 6 && duplicated.selected === 1 && duplicated.copy &&
        cut.strokes === 5 && cut.selected === 0 && backAgain.strokes === 6 && backAgain.selected === 1 && backAgain.copy,
      `dal menu della selezione il colore, Copia e (toccando un punto vuoto) Incolla, Duplica e Taglia; un tocco su una riga la prende (${JSON.stringify({ reds, menuAfterTap, menuAfterTwo, copiedSel, deselected, pasteMenu, pastedState, tapped, duplicated, cut, backAgain })})`,
    )
    // Dalla tastiera: Ctrl+A prende tutto, Canc lo toglie, Ctrl+Z lo rimette (selezionato); le frecce
    // spostano e sono un passo solo da annullare; Esc toglie la selezione, e cambiando strumento va via.
    await tp.keyboard.press('Control+A')
    const all = await selectedNow()
    await tp.keyboard.press('Delete')
    const deleted = await tcount()
    await tp.keyboard.press('Control+Z')
    const restored = { strokes: await tcount(), selected: await selectedNow() }
    const beforeNudge = await firstPoints()
    await tp.keyboard.press('ArrowRight')
    await tp.keyboard.press('ArrowRight')
    await tp.keyboard.press('Shift+ArrowDown')
    const nudged = await firstPoints()
    await tp.keyboard.press('Control+Z')
    const unnudged = await firstPoints()
    await tp.keyboard.press('Escape')
    const escaped = await selectedNow()
    await tp.locator('.board-all').click()
    const allButton = await selectedNow()
    await tp.locator('.board-button[aria-label="Penna"]').click()
    const penAgain = { selected: await selectedNow(), tool: await tpane.getAttribute('data-tool'), menu: await tp.locator('.board-sel-menu').count() }
    check(
      all === 6 && deleted === 0 && restored.strokes === 6 && restored.selected === 6 &&
        JSON.stringify(nudged) === JSON.stringify(beforeNudge.map(([x, y]) => [x + 2, y + 10])) && JSON.stringify(unnudged) === JSON.stringify(beforeNudge) &&
        escaped === 0 && allButton === 6 && penAgain.selected === 0 && penAgain.tool === 'pen' && penAgain.menu === 0,
      `dalla tastiera Ctrl+A, Canc, Ctrl+Z, le frecce (un passo solo) ed Esc; «Tutto» prende tutto; con la penna la selezione va via (${JSON.stringify({ all, deleted, restored, nudged, unnudged, escaped, allButton, penAgain })})`,
    )
    await toolsContext.close()
  }
  // Niente barra in alto: in cima alla barra laterale il logo e subito gli appunti; in fondo
  // «Apri .md», «Salva .md» e «Condividi», poi l'account e le impostazioni; sopra il testo,
  // volanti, i simboli e le viste
  const side = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  side.on('pageerror', (e) => errors.push(e.message))
  await side.goto(url)
  await side.waitForSelector('.cm-editor')
  await side.waitForTimeout(500)
  // Una riga sola sopra il testo: formattazione a sinistra, viste al centro, inserimenti e
  // simboli a destra, senza sovrapporsi
  const rowLayout = () =>
    side.evaluate(() => {
      const box = (s) => document.querySelector(s).getBoundingClientRect()
      const bar = box('.float-bar')
      const pill = box('.float-bar .view-switch')
      const content = box('.content')
      const format = box('.editor-toolbar[aria-label="Formattazione"]')
      const insert = box('.editor-toolbar[aria-label="Inserisci"]')
      const symbols = box('.float-bar .symbols-toggle')
      const row = [...document.querySelectorAll('.float-bar .tool, .float-bar .view-button, .float-bar .symbols-toggle')]
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.width > 0)
      return {
        fit: document.querySelector('.float-bar').dataset.fit,
        oneRow: row.every((r) => r.top >= bar.top && r.bottom <= bar.bottom),
        centered: Math.abs(pill.left + pill.width / 2 - (content.left + content.width / 2)) < 2,
        apart: format.right <= pill.left && pill.right <= insert.left && insert.right <= symbols.left,
        symbolsRight: Math.abs(symbols.right - (bar.right - 10)) < 2,
        previewBelow: box('.preview-pane h1').top >= bar.bottom,
      }
    })
  const sideLayout = await side.evaluate(() => {
    const box = (s) => document.querySelector(s).getBoundingClientRect()
    const panel = document.querySelector('.notes-panel')
    return {
      topbar: !!document.querySelector('.topbar'),
      // Sotto il logo subito gli appunti: niente titolo della nota
      top: !document.querySelector('.doc-title, .doc-info') && box('.notes-head').top - box('.side-top').bottom < 4,
      // In fondo una riga sola, piena: «Apri .md» e «Salva .md» con icona e testo, larghi uguali,
      // e a destra l'icona di «Condividi»
      foot: (() => {
        const foot = box('.notes-foot')
        const buttons = [...panel.querySelectorAll('.notes-foot button')]
        const r = buttons.map((b) => b.getBoundingClientRect())
        return (
          buttons.map((b) => b.textContent || b.getAttribute('aria-label')).join('|') === 'Apri .md|Salva .md|Condividi' &&
          buttons.every((b) => b.querySelector('svg')) &&
          r.every((x) => Math.abs(x.top - r[0].top) < 1) &&
          Math.abs(r[0].left - (foot.left + 12)) < 1 &&
          Math.abs(r[2].right - (foot.right - 12)) < 1 &&
          Math.abs(r[0].width - r[1].width) < 1 &&
          r[2].width < 40 &&
          buttons.every((b) => b.scrollWidth <= b.clientWidth)
        )
      })(),
      bottom: ['Come si usa', 'Impostazioni'].every((l) => panel.querySelector(`.side-profile button[aria-label="${l}"]`)) && !!panel.querySelector('.side-profile .account-button'),
      profileAtBottom: Math.abs(box('.side-profile').bottom - box('.notes-panel').bottom) < 1,
      // Il tema si cambia solo nelle impostazioni
      noTheme: !document.querySelector('button[aria-label="Cambia tema"], .theme-toggle'),
      // Sotto «Accedi» la scritta si legge tutta
      subFits: [...panel.querySelectorAll('.account-name, .account-sub')].every((el) => el.scrollWidth <= el.clientWidth),
    }
  })
  check(
    !sideLayout.topbar && sideLayout.top && sideLayout.foot && sideLayout.bottom && sideLayout.profileAtBottom && sideLayout.noTheme && sideLayout.subFits,
    `la barra in alto non c'è: sotto il logo subito gli appunti; in fondo una riga piena con «Apri .md», «Salva .md» e l'icona di «Condividi», poi account, «Come si usa» e impostazioni; niente pulsante del tema (${JSON.stringify(sideLayout)})`,
  )
  const withPanels = await rowLayout()
  await side.locator('.symbols-toggle').click()
  const withoutSymbols = await rowLayout()
  await side.locator('.symbols-toggle').click()
  check(
    [withPanels, withoutSymbols].every((l) => l.oneRow && l.centered && l.apart && l.symbolsRight && l.previewBelow) &&
      withPanels.fit === 'medium' &&
      withoutSymbols.fit === 'wide',
    `sopra il testo una riga sola: le viste al centro, i simboli a destra, niente si sovrappone e l'anteprima comincia sotto (${JSON.stringify({ withPanels, withoutSymbols })})`,
  )
  // Il logo apre e chiude la barra laterale, e sta nello stesso punto da aperta e da chiusa
  // (con il puntatore lontano: sopra il logo il colore cambia)
  const logoAt = async (selector) => {
    await side.mouse.move(700, 500)
    await side.waitForTimeout(250)
    return side.evaluate((s) => {
      const el = document.querySelector(s)
      const r = el.getBoundingClientRect()
      return { x: r.left, y: r.top, w: r.width, logo: !!el.querySelector('svg path'), bg: getComputedStyle(el).backgroundColor, color: getComputedStyle(el).color }
    }, selector)
  }
  const openLogo = await logoAt('.side-close')
  await side.locator('.side-close').click()
  const closedSide = await side.evaluate(() => ({ open: document.querySelector('.app').classList.contains('notes-open'), button: !!document.querySelector('.side-open')?.offsetParent }))
  const closedLogo = await logoAt('.side-open')
  await side.locator('.side-open').click()
  check(
    !closedSide.open && closedSide.button && (await side.locator('.side-top').isVisible()),
    'chiusa la barra laterale, il logo sopra il testo la riapre',
  )
  check(
    openLogo.logo &&
      closedLogo.logo &&
      [openLogo, closedLogo].every((l) => l.bg === 'rgba(0, 0, 0, 0)' && l.color === 'rgb(79, 70, 229)') &&
      Math.abs(openLogo.x - closedLogo.x) < 1 &&
      Math.abs(openLogo.y - closedLogo.y) < 1 &&
      openLogo.w === 34,
    `il pulsante della barra laterale è il logo, solo il ∮ indaco senza quadrato, nello stesso punto da aperta e da chiusa (${JSON.stringify({ openLogo, closedLogo })})`,
  )
  // «Condividi», in fondo: senza account spiega che serve l'account, e da lì si stampa (o si salva in PDF)
  await side.evaluate(() => {
    window.print = () => (window.__stampato = true)
  })
  await side.locator('.notes-foot .share-button').click()
  await side.locator('dialog.dialog-share .share-print').click()
  await side.waitForTimeout(300)
  check(
    (await side.evaluate(() => window.__stampato === true)) && !(await side.locator('dialog.dialog-share').count()),
    'da «Condividi» si stampa la nota o la si salva in PDF, anche senza account',
  )
  await side.close()
  // Sul telefono la barra laterale si apre sopra il testo, e niente esce dallo schermo
  const phoneSide = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  phoneSide.on('pageerror', (e) => errors.push(e.message))
  await phoneSide.goto(url)
  await phoneSide.waitForSelector('.cm-editor')
  const phoneLayout = await phoneSide.evaluate(() => {
    const box = (s) => document.querySelector(s).getBoundingClientRect()
    const tools = box('.float-tools')
    const pill = box('.float-bar .view-switch')
    const symbols = box('.float-bar .symbols-toggle')
    return {
      wide: document.documentElement.scrollWidth,
      content: Math.round(box('.content').width),
      fit: document.querySelector('.float-bar').dataset.fit,
      apart: tools.right <= pill.left && pill.right <= symbols.left && symbols.right <= 390,
      scrolls: document.querySelector('.float-tools').scrollWidth > tools.width,
    }
  })
  check(
    phoneLayout.wide <= 390 && phoneLayout.content === 390 && phoneLayout.fit === 'narrow' && phoneLayout.apart && phoneLayout.scrolls,
    `sul telefono il testo è largo quanto lo schermo; nella riga in alto la barra scorre, le viste e i simboli stanno a destra (${JSON.stringify(phoneLayout)})`,
  )
  await phoneSide.locator('.side-open').tap()
  await phoneSide.waitForTimeout(300)
  const drawer = await phoneSide.evaluate(() => {
    const r = document.querySelector('.side-profile').getBoundingClientRect()
    return r.bottom <= innerHeight + 1 && r.top > 0 && !!document.elementFromPoint(r.left + 20, r.top + r.height / 2)?.closest('.account-button')
  })
  check(drawer, 'sul telefono la barra laterale si apre sopra il testo, con l\'account in fondo')
  await phoneSide.close()
  // La prima volta si apre il tutorial: pagine con un video e il testo, Indietro e Avanti, alla
  // fine «Inizia»; poi non si apre più da solo, ma da «Come si usa»
  const first = await firstVisit({ viewport: { width: 1280, height: 800 } })
  first.on('pageerror', (e) => errors.push(e.message))
  await first.goto(url)
  const tutorial = first.locator('dialog.dialog-tutorial')
  await tutorial.waitFor()
  const tutorialPage = () =>
    tutorial.evaluate((d) => ({
      step: d.querySelector('.tutorial-step').textContent,
      title: d.querySelector('.tutorial-title').textContent,
      video: d.querySelector('video').getAttribute('src'),
      back: !d.querySelector('.tutorial-foot .btn:not(.btn-primary)').hidden,
      next: d.querySelector('.tutorial-next').textContent,
    }))
  const page1 = await tutorialPage()
  await first.waitForFunction(() => document.querySelector('dialog.dialog-tutorial video')?.readyState >= 2, null, { timeout: 8000 }).catch(() => {})
  const playing = await tutorial.evaluate((d) => {
    const v = d.querySelector('video')
    return !v.error && v.readyState >= 2 && v.muted && v.loop
  })
  check(
    page1.step === '1 di 6' && !page1.back && page1.next === 'Avanti' && page1.video.endsWith('scrivere-chiaro.webm') && playing,
    `la prima volta si apre il tutorial, con il video che si vede (${JSON.stringify(page1)}, ${playing})`,
  )
  for (let i = 0; i < 5; i++) await tutorial.locator('.tutorial-next').click()
  const last = await tutorialPage()
  await tutorial.locator('.tutorial-foot .btn:not(.btn-primary)').click()
  const backOne = await tutorialPage()
  await first.keyboard.press('ArrowRight')
  const keyNext = await tutorialPage()
  check(
    last.step === '6 di 6' && last.next === 'Inizia' && last.back && backOne.step === '5 di 6' && keyNext.step === '6 di 6',
    `Avanti e Indietro (anche con le frecce) sfogliano le pagine, e l'ultima ha «Inizia» (${JSON.stringify({ last, backOne, keyNext })})`,
  )
  await tutorial.locator('.tutorial-next').click()
  await first.waitForTimeout(200)
  const closed = !(await tutorial.count())
  // Chiuso il tutorial della prima volta, un fumetto punta al «?» che lo riapre
  const hint = first.locator('.tutorial-hint.is-visible')
  await hint.waitFor({ timeout: 3000 })
  const pointing = await first.evaluate(() => {
    const bubble = document.querySelector('.tutorial-hint')
    const b = bubble.getBoundingClientRect()
    const help = document.querySelector('.side-help')
    const r = help.getBoundingClientRect()
    const tip = b.left + parseFloat(bubble.style.getPropertyValue('--arrow-x'))
    return {
      text: bubble.textContent,
      side: bubble.dataset.side,
      above: b.bottom <= r.top,
      tip: Math.abs(tip - (r.left + r.width / 2)) < 2,
      lit: help.classList.contains('is-pointed'),
      inside: b.left >= 0 && b.right <= innerWidth,
    }
  })
  check(
    pointing.text.includes('rivedere il tutorial') && pointing.side === 'above' && pointing.above && pointing.tip && pointing.lit && pointing.inside,
    `chiuso il tutorial, un fumetto punta al «?» in fondo alla barra laterale, che si illumina (${JSON.stringify(pointing)})`,
  )
  await first.locator('.cm-content').click()
  await first.waitForTimeout(400)
  check(
    !(await first.locator('.tutorial-hint').count()) && !(await first.locator('.side-help.is-pointed').count()),
    'con un clic altrove il fumetto se ne va',
  )
  await first.reload()
  await first.waitForSelector('.cm-editor')
  await first.waitForTimeout(900)
  check(closed && !(await first.locator('dialog.dialog-tutorial').count()), '«Inizia» chiude il tutorial, che poi non si apre più da solo')
  await first.locator('.side-help').click()
  await tutorial.locator('.tutorial-close').click()
  await first.waitForTimeout(500)
  check(!(await first.locator('.tutorial-hint').count()), 'aperto da «Come si usa» e chiuso con la x, il tutorial non lascia il fumetto (si sa già dov\'è)')
  await first.locator('.side-help').click()
  const again = await tutorialPage()
  await tutorial.locator('.tutorial-shortcuts').click()
  check(
    again.step === '1 di 6' && (await first.locator('dialog table.shortcuts').isVisible()),
    '«Come si usa» riapre il tutorial, e da lì si arriva a tutte le scorciatoie',
  )
  // Chiusa la guida con la x, il fumetto dice dove si rivede il tutorial; poi se ne va da solo
  await first.locator('dialog.dialog-help .dialog-head button[aria-label="Chiudi"]').click()
  await hint.waitFor({ timeout: 3000 })
  const shownAt = Date.now()
  await first.locator('.tutorial-hint').waitFor({ state: 'detached', timeout: 15000 })
  const lasted = Date.now() - shownAt
  check(lasted > 6000 && lasted < 11000, `chiuse le scorciatoie, il fumetto c'è e se ne va da solo dopo qualche secondo (${lasted} ms)`)
  await first.context().close()
  // Sul telefono la barra laterale è chiusa: il fumetto punta al logo che la apre
  const firstPhone = await firstVisit({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  firstPhone.on('pageerror', (e) => errors.push(e.message))
  await firstPhone.goto(url)
  await firstPhone.locator('dialog.dialog-tutorial .tutorial-close').tap()
  await firstPhone.locator('.tutorial-hint.is-visible').waitFor({ timeout: 3000 })
  const phoneHint = await firstPhone.evaluate(() => {
    const bubble = document.querySelector('.tutorial-hint')
    const b = bubble.getBoundingClientRect()
    const r = document.querySelector('.side-open').getBoundingClientRect()
    return { text: bubble.textContent, below: b.top >= r.bottom, inside: b.left >= 0 && b.right <= innerWidth, lit: document.querySelector('.side-open').classList.contains('is-pointed') }
  })
  check(
    phoneHint.text.includes('con il logo') && phoneHint.below && phoneHint.inside && phoneHint.lit,
    `sul telefono, a barra chiusa, il fumetto punta al logo che la apre (${JSON.stringify(phoneHint)})`,
  )
  await firstPhone.locator('.tutorial-hint-close').tap()
  await firstPhone.waitForTimeout(400)
  check(!(await firstPhone.locator('.tutorial-hint').count()), 'la x chiude il fumetto')
  await firstPhone.context().close()
  // Nel tema scuro i video sono quelli scuri
  const firstDark = await firstVisit({ viewport: { width: 1280, height: 800 }, colorScheme: 'dark' })
  await firstDark.goto(url)
  await firstDark.locator('dialog.dialog-tutorial').waitFor()
  const darkVideo = await firstDark.locator('dialog.dialog-tutorial video').getAttribute('src')
  check(darkVideo.endsWith('scrivere-scuro.webm'), `nel tema scuro il tutorial mostra i video scuri (${darkVideo})`)
  await firstDark.context().close()
  // Dentro claude.ai (la demo e le prove della grafica) Accedi e Condividi si vedono come sul
  // sito, ma l'accesso è spento: la finestra lo dice e non va da nessuna parte
  const viewer = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  viewer.on('pageerror', (e) => errors.push(e.message))
  const viewerRequests = []
  viewer.on('request', (r) => viewerRequests.push(r.url()))
  await viewer.addInitScript(() => {
    window.claude = { use: () => new Promise(() => {}) }
  })
  await viewer.goto(url)
  await viewer.waitForSelector('.cm-editor')
  const viewerButtons =
    (await viewer.locator('.account-button').isVisible()) &&
    (await viewer.locator('.share-button').isVisible()) &&
    (await viewer.locator('.side-profile button[aria-label="Impostazioni"]').isVisible())
  await viewer.locator('.share-button').click()
  // Dentro claude.ai la stampa non c'è
  const viewerPrint = await viewer.locator('dialog.dialog-share .share-print').count()
  await viewer.locator('dialog.dialog-share .btn-primary', { hasText: 'Accedi' }).click()
  const login = viewer.locator('dialog.dialog-login')
  await login.locator('.login-google').click()
  await login.locator('.prompt-error:not([hidden])').waitFor({ timeout: 3000 })
  const offMessage = await login.locator('.prompt-error').textContent()
  await login.locator('input[type="email"]').fill('prova@example.com')
  await login.locator('button[type="submit"]').click()
  await viewer.waitForTimeout(300)
  const stillEmail = (await login.locator('input[type="email"]').count()) === 1
  check(
    viewerButtons &&
      viewerPrint === 0 &&
      offMessage.includes('accesso è spento') &&
      stillEmail &&
      !viewerRequests.some((u) => /supabase|google/.test(u)) &&
      viewer.url().startsWith(url),
    `dentro claude.ai Accedi e Condividi si vedono, ma l'accesso è spento e la finestra lo dice (${JSON.stringify({ viewerButtons, offMessage, stillEmail })})`,
  )
  await viewer.close()

  check(errors.length === 0, `nessun errore nella pagina${errors.length ? ': ' + errors.join('; ') : ''}`)
} finally {
  await browser.close()
  await new Promise((resolve) => server.httpServer.close(resolve))
}

if (failures) {
  console.log(`\n${failures} controlli falliti`)
  process.exit(1)
}
console.log('\nTutto ok')
