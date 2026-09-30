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
  await page.locator('.notes-head .icon-button').click()
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
