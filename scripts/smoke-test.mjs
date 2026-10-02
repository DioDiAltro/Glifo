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

const server = await preview({ preview: { port: 4174, strictPort: true }, logLevel: 'error' })
const url = server.resolvedUrls.local[0]
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
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
        document.querySelector('.doc-title').textContent === 'Scritto nella scheda A',
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
    await waitFor(tabB, () => !document.querySelector('.doc-title').textContent.includes('Nota della scheda B')),
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
    start.notes === 250 && start.symbols === 348 && Math.abs(start.editor - start.preview) <= 1,
    `all'inizio le sezioni hanno le misure di partenza (${JSON.stringify(start)})`,
  )
  // La freccia è quella a destra e sinistra (↔), anche mentre si trascina sopra il resto della pagina
  const cursorOf = (selector) => layout.evaluate((s) => getComputedStyle(document.querySelector(s)).cursor, selector)
  const edgeBox = await notesEdge.boundingBox()
  await layout.mouse.move(edgeBox.x + edgeBox.width / 2, edgeBox.y + 100)
  const cursors = [await cursorOf('.resize-notes'), await cursorOf('.resize-split'), await cursorOf('.resize-symbols')]
  await layout.mouse.down()
  await layout.mouse.move(edgeBox.x + 40, edgeBox.y + 100)
  cursors.push(await cursorOf('.cm-content'), await cursorOf('.topbar'))
  await layout.mouse.move(edgeBox.x + edgeBox.width / 2, edgeBox.y + 100)
  await layout.mouse.up()
  check(cursors.every((cursor) => cursor === 'ew-resize'), `sui bordi la freccia è quella a destra e sinistra (${cursors})`)
  await layout.locator('.cm-content').click()
  await dragEdge(notesEdge, 80)
  await dragEdge(splitEdge, -100)
  await dragEdge(symbolsEdge, -60)
  const dragged = await widths()
  check(dragged.notes === 330 && dragged.symbols === 408, `trascinando i bordi si allargano l'elenco e i simboli (${JSON.stringify(dragged)})`)
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
    !(await notesEdge.isVisible()) && (await splitEdge.isVisible()) && (await symbolsEdge.isVisible()) && (await widths()).notes === 250,
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
  check((await widths()).notes === 250 && saved.notesWidth === 250, `con un doppio clic sul bordo l'elenco torna largo 250 pixel (${JSON.stringify(saved)})`)

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
    return { name: manifest.name, shortName: manifest.short_name, icons, mark: !!document.querySelector('.brand-mark svg circle') }
  })
  check(installed.name === 'Glifo' && installed.shortName === 'Glifo', `l'app installata si chiama «Glifo» (${installed.name})`)
  check(
    installed.icons.every((icon) => icon.ok) && installed.mark,
    `le icone e il marchio in alto sono il simbolo di adesso (${JSON.stringify(installed.icons)})`,
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
  await sp.waitForFunction(() => document.querySelector('.doc-status')?.textContent === 'Salvato', null, { timeout: 5000 })
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
  await sp.waitForSelector('.preview-pane .schema-block svg')
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
  await sp.waitForFunction(() => document.querySelector('.doc-status')?.textContent === 'Salvato', null, { timeout: 5000 })
  check((await savedNote()).includes('"text":"Quinta"') && (await schemaEditor.count()) === 1, 'Ctrl+S mette lo schema nella nota e l\'editor resta aperto')
  await sp.locator('dialog.schema-editor button', { hasText: 'Chiudi' }).click()
  await schemaEditor.waitFor({ state: 'detached' })
  check((await sp.locator('dialog.dialog-confirm').count()) === 0, 'dopo aver salvato si chiude senza domande')
  check(((await savedNote()).match(/```schema/g) ?? []).length === 1, 'nella nota resta un solo schema, aggiornato')
  // Ctrl+Z nel testo riporta lo schema di prima
  await sp.locator('.cm-line').first().click()
  await sp.keyboard.press('Control+z')
  await sp.waitForFunction(() => document.querySelector('.doc-status')?.textContent === 'Salvato', null, { timeout: 5000 })
  check(!(await savedNote()).includes('Quinta') && (await savedNote()).includes('"text":"Tesi"'), 'Ctrl+Z nel testo annulla l\'ultima modifica dello schema')
  // Con il tema scuro lo schema si ridisegna con i suoi colori
  const lightFill = await sp.locator('.preview-pane .schema-block svg').innerHTML()
  await sp.locator('button[aria-label="Cambia tema"]').click()
  await sp.waitForFunction((before) => {
    const svg = document.querySelector('.preview-pane .schema-block svg')
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
        document.querySelector('.doc-status')?.textContent === 'Salvato',
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
  await touch.waitForFunction(() => document.querySelector('.doc-status')?.textContent === 'Salvato', null, { timeout: 5000 })
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
  check(paletteCount === 14, `nel pannello ci sono 14 forme, con cilindro, nuvola, frecce grandi… (${paletteCount})`)
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
  await s2.waitForFunction(() => document.querySelector('.doc-status')?.textContent === 'Salvato', null, { timeout: 5000 })
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
  await s2.waitForSelector('.preview-pane .schema-block svg')
  const previewTexts = await s2.evaluate(() => [...document.querySelectorAll('.preview-pane .schema-block foreignObject')].map((f) => f.textContent))
  check(previewTexts.includes('Fase 4'), 'nell\'anteprima lo schema si vede con le forme nuove')
  await s2context.close()

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
  await db.waitForFunction(() => document.querySelector('.doc-status')?.textContent === 'Salvato', null, { timeout: 5000 })
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
  await db.waitForSelector('.preview-pane .schema-block svg')
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
  await db.waitForFunction(() => document.querySelector('.doc-status')?.textContent === 'Salvato', null, { timeout: 5000 })
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
  await db.waitForFunction(() => document.querySelector('.doc-status')?.textContent === 'Salvato', null, { timeout: 5000 })
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
  check(calcLine.endsWith('$f(4) = 13$') && (await gp.locator('.cm-calc-result').count()) === 0, `Tab scrive il risultato nella formula (${JSON.stringify(calcLine)})`)
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
  await gp.waitForFunction(() => document.querySelector('.doc-status')?.textContent === 'Salvato', null, { timeout: 5000 })
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
  await gp.waitForFunction(() => document.querySelector('.doc-status')?.textContent === 'Salvato', null, { timeout: 5000 })
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
  await gp.waitForFunction(() => document.querySelector('.doc-status')?.textContent === 'Salvato', null, { timeout: 5000 })
  check(
    (await graphNote()).endsWith('```grafico\nk = 1\ny = k(x - 1)\n```\n') && !(await gp.locator('.preview-pane .graph-errors').count()),
    `«Aggiungi lo slider per k» scrive k = 1 nel blocco (${JSON.stringify((await graphNote()).slice(-40))})`,
  )
  // «Salva .md»: ogni grafico è un'immagine con il suo testo nascosto; «Apri .md» lo riporta
  await gp.waitForFunction(() => document.querySelector('.doc-status')?.textContent === 'Salvato', null, { timeout: 5000 })
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
  await gp.close()

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
