/**
 * Prova l'account in un browser vero: accesso con il codice, appunti portati nell'account,
 * due dispositivi che si sincronizzano, un conflitto senza rete, le impostazioni, l'uscita,
 * i dati scaricati e l'account eliminato.
 *   npm run build && npm run test:e2e
 * Supabase è finto (scripts/fake-supabase.mjs), ma la sincronizzazione usa le vere migrazioni.
 */
import { readFile } from 'node:fs/promises'
import { chromium } from 'playwright-core'
import { preview } from 'vite'
import { CODE, createFakeSupabase } from './fake-supabase.mjs'

const server = await preview({ preview: { port: 4175, strictPort: true }, logLevel: 'error' })
const url = server.resolvedUrls.local[0]
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
const fake = await createFakeSupabase()
const EMAIL = 'studente@example.com'
let failures = 0
const check = (ok, msg) => {
  console.log(`${ok ? '✓' : '✗'} ${msg}`)
  if (!ok) failures++
}

/** Un dispositivo: un browser con il suo spazio, collegato al Supabase finto. */
async function device() {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  await fake.attach(context)
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(url)
  await page.waitForSelector('.cm-editor')
  return { context, page, errors }
}

const titles = (page) => page.locator('.note-title').allInnerTexts()
const editorText = (page) => page.evaluate(() => document.querySelector('.cm-content').innerText)
const accountState = (page) => page.evaluate(() => document.querySelector('.account-button').className)

async function waitFor(page, fn, arg, timeout = 10000) {
  try {
    await page.waitForFunction(fn, arg, { timeout, polling: 200 })
    return true
  } catch {
    return false
  }
}

async function poll(fn, timeout = 10000) {
  const end = Date.now() + timeout
  while (Date.now() < end) {
    if (await fn()) return true
    await new Promise((r) => setTimeout(r, 200))
  }
  return false
}

/** Come quando si torna su Glifo da un'altra app: si scaricano le novità. */
const comeBack = (page) => page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')))

async function typeAtEnd(page, text) {
  await page.locator('.cm-content').click()
  await page.keyboard.press('Control+End')
  await page.keyboard.type(text)
  await page.waitForTimeout(700)
}

/** Accesso con il codice; `answer`: cosa rispondere alla domanda sugli appunti del browser. */
async function login(page, answer = null) {
  await page.locator('.account-button').click()
  const dialog = page.locator('dialog.dialog-login')
  await dialog.locator('input[type=email]').fill(EMAIL)
  await dialog.locator('button[type=submit]').click()
  await dialog.locator('.login-code').fill(CODE)
  const reloaded = page.waitForEvent('load')
  await dialog.locator('button[type=submit]').click()
  if (answer) {
    const question = page.locator('dialog.dialog-confirm')
    await question.waitFor()
    await question.locator(answer === 'aggiungi' ? '.btn-primary' : '.btn:not(.btn-primary)').click()
  }
  await reloaded
  await page.waitForSelector('.cm-editor')
}

try {
  // ——— Il pc, prima senza account ———
  const pc = await device()
  check((await accountState(pc.page)).includes('is-guest'), 'senza account il pulsante dice «Accedi»')
  await pc.page.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await pc.page.keyboard.type('Appunti di prova')
  await typeAtEnd(pc.page, 'scritti prima di accedere')

  // Codice sbagliato: si resta nella finestra, con un messaggio.
  await pc.page.locator('.account-button').click()
  const dialog = pc.page.locator('dialog.dialog-login')
  check((await dialog.locator('a[href="privacy.html"]').count()) === 1, 'la finestra di accesso porta all\'informativa sulla privacy')
  await dialog.locator('input[type=email]').fill(EMAIL)
  await dialog.locator('button[type=submit]').click()
  await dialog.locator('.login-code').fill('000000')
  await dialog.locator('button[type=submit]').click()
  await dialog.locator('.prompt-error:not([hidden])').waitFor()
  check((await dialog.locator('.prompt-error').innerText()).includes('sbagliato'), 'un codice sbagliato viene segnalato')
  await dialog.locator('button', { hasText: 'Annulla' }).click()

  // Codice giusto, e la nota scritta prima va nell'account.
  await login(pc.page, 'aggiungi')
  check(await waitFor(pc.page, () => document.querySelector('.account-button').classList.contains('is-idle')), 'dopo l\'accesso il pc è sincronizzato')
  check(JSON.stringify(await titles(pc.page)) === '["Appunti di prova"]', `nell'account c'è la nota scritta prima (${await titles(pc.page)})`)
  check(
    await poll(async () => (await fake.notes(EMAIL)).some((n) => n.content.includes('scritti prima di accedere'))),
    'la nota è arrivata nell\'account',
  )

  // ——— Il telefono entra con lo stesso account ———
  const tel = await device()
  await login(tel.page)
  check(
    await waitFor(tel.page, () => [...document.querySelectorAll('.note-title')].map((t) => t.textContent).join() === 'Appunti di prova'),
    'sul telefono arrivano le note dell\'account (e la nota vuota di partenza sparisce)',
  )
  check((await editorText(tel.page)).includes('scritti prima di accedere'), 'e si apre quella nota')

  await typeAtEnd(tel.page, '\n\naggiunto dal telefono')
  check(
    await poll(async () => (await fake.notes(EMAIL)).some((n) => n.content.includes('aggiunto dal telefono'))),
    'la modifica fatta sul telefono arriva nell\'account da sola',
  )
  await comeBack(pc.page)
  check(
    await waitFor(pc.page, () => document.querySelector('.cm-content').innerText.includes('aggiunto dal telefono')),
    'tornando sul pc la nota aperta si aggiorna',
  )

  // ——— Conflitto: il pc scrive senza rete, intanto il telefono cambia la stessa nota ———
  await pc.context.setOffline(true)
  await typeAtEnd(pc.page, ' — scritto sul pc senza rete')
  check(await waitFor(pc.page, () => document.querySelector('.account-button').classList.contains('is-offline')), 'senza rete il pulsante dell\'account lo mostra')
  await typeAtEnd(tel.page, ' — scritto sul telefono')
  check(await poll(async () => (await fake.notes(EMAIL)).some((n) => n.content.includes('scritto sul telefono'))), 'il telefono manda la sua versione')
  await pc.context.setOffline(false)
  check(await waitFor(pc.page, () => document.querySelectorAll('.note-badge').length === 1), 'tornata la rete, sul pc ci sono tutte e due le versioni')
  check((await titles(pc.page)).length === 2, 'due note nell\'elenco')
  const pcText = await editorText(pc.page)
  check(pcText.includes('scritto sul pc senza rete') && !pcText.includes('scritto sul telefono'), 'sul pc si continua a scrivere sulla propria versione')
  check((await pc.page.locator('.note-item.is-active .note-badge').count()) === 1, 'ed è quella con l\'etichetta «copia in conflitto»')
  check((await pc.page.locator('.toast').allInnerTexts()).some((t) => t.includes('tutte e due le versioni')), 'un avviso spiega cosa è successo')
  await comeBack(tel.page)
  check(await waitFor(tel.page, () => document.querySelectorAll('.note-item').length === 2), 'la copia arriva anche sul telefono')

  // ——— Le impostazioni vanno con l'account ———
  await pc.page.locator('button[aria-label="Cambia tema"]').click()
  const theme = await pc.page.evaluate(() => document.documentElement.dataset.theme)
  check(
    await waitFor(
      tel.page,
      (wanted) => {
        document.dispatchEvent(new Event('visibilitychange'))
        return document.documentElement.dataset.theme === wanted
      },
      theme,
      15000,
    ),
    `il tema scelto sul pc arriva sul telefono (${theme})`,
  )

  // ——— Uscire dall'account ———
  await pc.page.locator('.account-button').click()
  const out = pc.page.waitForEvent('load')
  await pc.page.locator('dialog.dialog-account button', { hasText: 'Esci dall\'account' }).click()
  await out
  await pc.page.waitForSelector('.cm-editor')
  check((await accountState(pc.page)).includes('is-guest'), 'uscendo si torna senza account')
  check(JSON.stringify(await titles(pc.page)) === '["Benvenuto in Glifo"]', `restano solo gli appunti di prima (${await titles(pc.page)})`)
  const left = await pc.page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith('glifo.u.') || k.startsWith('glifo.auth')))
  check(left.length === 0, `nel browser non resta niente dell'account (${left})`)

  // Rientrando le note tornano.
  await login(pc.page)
  check(await waitFor(pc.page, () => document.querySelectorAll('.note-item').length === 2), 'rientrando, le note dell\'account tornano')

  // ——— Due schede dello stesso account ———
  const tab = await pc.context.newPage()
  tab.on('pageerror', (e) => pc.errors.push(e.message))
  await tab.goto(url)
  await tab.waitForSelector('.cm-editor')
  check(!(await accountState(tab)).includes('is-guest'), 'una seconda scheda è già dentro l\'account')
  await pc.page.waitForTimeout(500)
  await typeAtEnd(pc.page, ' — anche nella seconda scheda')
  check(
    await waitFor(tab, () => document.querySelector('.cm-content').innerText.includes('anche nella seconda scheda')),
    'la seconda scheda vede subito le modifiche',
  )
  // Si esce da una scheda: anche l'altra esce, e non ricrea niente dell'account.
  await pc.page.waitForTimeout(3500)
  await pc.page.locator('.account-button').click()
  const outAgain = tab.waitForEvent('load')
  await pc.page.locator('dialog.dialog-account button', { hasText: 'Esci dall\'account' }).click()
  await outAgain
  await tab.waitForSelector('.cm-editor')
  check((await accountState(tab)).includes('is-guest'), 'uscendo da una scheda esce anche l\'altra')
  await pc.page.waitForSelector('.cm-editor')
  const leftAgain = await tab.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith('glifo.u.') || k.startsWith('glifo.auth')))
  check(leftAgain.length === 0, `e nel browser non resta niente dell'account (${leftAgain})`)

  // ——— Il link nell'email, al posto del codice ———
  const tablet = await device()
  await tablet.page.locator('.account-button').click()
  const linkDialog = tablet.page.locator('dialog.dialog-login')
  await linkDialog.locator('input[type=email]').fill(EMAIL)
  await linkDialog.locator('button[type=submit]').click()
  await linkDialog.locator('.login-code').waitFor()
  await tablet.page.goto(fake.link())
  check(
    await waitFor(tablet.page, () => document.querySelector('.account-button') && !document.querySelector('.account-button').classList.contains('is-guest')),
    'aprendo il link nell\'email si entra nell\'account',
  )
  check(await waitFor(tablet.page, () => document.querySelectorAll('.note-item').length === 2), 'e arrivano le note')
  check(!(await tablet.page.evaluate(() => location.search)).includes('code='), 'il codice del link sparisce dall\'indirizzo')
  pc.errors.push(...tablet.errors)

  // Il link aperto su un altro dispositivo (il codice l'ha chiesto il tablet): non si entra,
  // ma un avviso spiega perché e suggerisce il codice.
  const altro = await device()
  await altro.page.goto(fake.link())
  check(
    await waitFor(altro.page, () => [...document.querySelectorAll('.toast')].some((t) => t.textContent.includes('nel browser in cui hai chiesto di entrare'))),
    'aprendo il link su un altro dispositivo, un avviso spiega come fare',
  )
  check((await accountState(altro.page)).includes('is-guest'), 'e non si entra nell\'account')
  pc.errors.push(...altro.errors)

  // Il link copiato dall'email e incollato nella finestra di Glifo, senza aprirlo.
  const portatile = await device()
  await portatile.page.locator('.account-button').click()
  const pasteDialog = portatile.page.locator('dialog.dialog-login')
  await pasteDialog.locator('input[type=email]').fill(EMAIL)
  await pasteDialog.locator('button[type=submit]').click()
  await pasteDialog.locator('.login-code').fill('https://diodialtro.github.io/Glifo/')
  await pasteDialog.locator('button[type=submit]').click()
  await pasteDialog.locator('.prompt-error:not([hidden])').waitFor()
  check(
    (await pasteDialog.locator('.prompt-error').innerText()).includes('Incolla qui il link'),
    'incollando un altro indirizzo, un messaggio dice cosa serve',
  )
  const pasted = portatile.page.waitForEvent('load')
  await pasteDialog.locator('.login-code').fill(` Sign in <${fake.emailLink()}>\n`)
  await pasteDialog.locator('button[type=submit]').click()
  await pasted
  await portatile.page.waitForSelector('.cm-editor')
  check(!(await accountState(portatile.page)).includes('is-guest'), 'incollando il link dell\'email nella finestra si entra')
  check(await waitFor(portatile.page, () => document.querySelectorAll('.note-item').length === 2), 'e arrivano le note')

  // ——— I tuoi dati: scaricarli, poi eliminare l'account ———
  await portatile.page.locator('.account-button').click()
  const accountDialog = portatile.page.locator('dialog.dialog-account')
  const downloading = portatile.page.waitForEvent('download')
  await accountDialog.locator('button', { hasText: 'Scarica i miei dati' }).click()
  const file = await downloading
  const exported = JSON.parse(await readFile(await file.path(), 'utf8'))
  check(file.suggestedFilename().startsWith('glifo-dati-account-'), `i dati si scaricano in un file (${file.suggestedFilename()})`)
  check(
    exported.account?.email === EMAIL && exported.notes.length === 2 && exported.notes.some((n) => n.content.includes('scritti prima di accedere')),
    'nel file ci sono l\'account e tutte le sue note',
  )
  check(exported.settings?.theme === theme, `e le impostazioni dell'account (${exported.settings?.theme})`)

  await accountDialog.locator('button', { hasText: 'Elimina account' }).click()
  const confirmDelete = portatile.page.locator('dialog.dialog-delete-account')
  await confirmDelete.waitFor()
  check(await confirmDelete.locator('button[type=submit]').isDisabled(), 'per eliminare l\'account bisogna prima scrivere «elimina»')
  await confirmDelete.locator('input').fill('Elimina')
  const deleted = portatile.page.waitForEvent('load')
  await confirmDelete.locator('button[type=submit]').click()
  await deleted
  await portatile.page.waitForSelector('.cm-editor')
  check((await accountState(portatile.page)).includes('is-guest'), 'eliminato l\'account, si torna senza account')
  check(
    await waitFor(portatile.page, () => [...document.querySelectorAll('.toast')].some((t) => t.textContent.includes('Account eliminato'))),
    'un avviso dice che l\'account è stato eliminato',
  )
  const leftAfterDelete = await portatile.page.evaluate(() =>
    Object.keys(localStorage).filter((k) => k.startsWith('glifo.u.') || k.startsWith('glifo.auth')),
  )
  check(leftAfterDelete.length === 0, `nel browser non resta niente dell'account (${leftAfterDelete})`)
  const counts = await fake.counts()
  check(counts.users === 0 && counts.notes === 0, `sul server non resta niente (${JSON.stringify(counts)})`)
  pc.errors.push(...portatile.errors)

  // ——— L'informativa sulla privacy ———
  const privacy = await altro.context.newPage()
  await privacy.goto(`${url}privacy.html`)
  check((await privacy.locator('h1').innerText()) === 'Informativa sulla privacy', 'l\'informativa sulla privacy si apre')
  await privacy.close()

  const errors = [...pc.errors, ...tel.errors]
  check(errors.length === 0, `nessun errore nella pagina${errors.length ? ': ' + errors.join('; ') : ''}`)
} finally {
  await browser.close()
  await fake.close()
  await new Promise((resolve) => server.httpServer.close(resolve))
}

if (failures) {
  console.log(`\n${failures} controlli falliti`)
  process.exit(1)
}
console.log('\nTutto ok')
