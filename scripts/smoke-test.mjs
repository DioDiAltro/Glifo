/**
 * Prova il flusso principale in un browser vero:
 *   npm run build && npm run test:e2e
 *
 * Serve Chromium: `npx playwright-core install chromium`, oppure indica un
 * Chromium già installato con la variabile CHROMIUM_PATH.
 */
import { chromium } from 'playwright-core'
import { preview } from 'vite'

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

  await layout.close()

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
