import type { SyncStatus } from '../account/controller'
import { dateLocale, lang, rich, texts } from '../i18n'
import { dialogShell } from './dialogs'
import { ICONS, h, icon } from './dom'
import { privacyLink } from './links'

const T = texts({
  // Lo stato della sincronizzazione, per intero e in poche parole.
  syncing: ['Sincronizzazione in corso…', 'Syncing…'],
  allSynced: (time: string) => [`Tutto sincronizzato (ultimo controllo alle ${time}).`, `Everything is synced (last checked at ${time}).`],
  syncWaiting: ['Sincronizzazione in attesa.', 'Waiting to sync.'],
  offline: [
    'Senza connessione: le modifiche restano qui e partono quando torna la rete.',
    'Offline: your changes stay here and will be sent when you\'re back online.',
  ],
  signInExpired: [
    'L\'accesso è scaduto: accedi di nuovo per sincronizzare. Intanto le modifiche restano qui.',
    'Your sign-in has expired: sign in again to sync. In the meantime, your changes stay here.',
  ],
  syncFailed: [
    'La sincronizzazione non è riuscita: riprovo tra poco. Le modifiche restano qui.',
    'Sync failed: I\'ll try again shortly. Your changes stay here.',
  ],
  somethingWrong: ['Qualcosa è andato storto: riprova.', 'Something went wrong: try again.'],
  shortSyncing: ['Sincronizzo…', 'Syncing…'],
  shortSynced: ['Sincronizzato', 'Synced'],
  shortWaiting: ['In attesa', 'Waiting'],
  shortOffline: ['Senza connessione', 'Offline'],
  shortExpired: ['Accesso scaduto', 'Sign-in expired'],
  shortQuota: ['Spazio esaurito', 'Out of space'],
  shortFailed: ['Sincronizzazione non riuscita', 'Sync failed'],
  // Il pulsante in fondo alla barra laterale, senza account.
  guestTitle: ['Accedi per ritrovare gli appunti su ogni dispositivo', 'Sign in to get your notes on every device'],
  guestLabel: ['Accedi all\'account', 'Sign in to your account'],
  signIn: ['Accedi', 'Sign in'],
  noAccount: ['Senza account', 'Not signed in'],
  // La finestra per entrare.
  loginTitle: ['Accedi a Glifo', 'Sign in to Glifo'],
  cancel: ['Annulla', 'Cancel'],
  sendEmail: ['Mandami l\'email', 'Email me a link'],
  google: ['Continua con Google', 'Continue with Google'],
  enterEmail: ['Scrivi il tuo indirizzo email.', 'Enter your email address.'],
  sending: ['Invio…', 'Sending…'],
  loginIntro: [
    'Con l\'account ritrovi gli stessi appunti su computer, tablet e telefono. Niente password: entri con Google o con un\'email.',
    'With an account, you get the same notes on your computer, tablet and phone. No password: sign in with Google or with an email.',
  ],
  orEmail: ['oppure con l\'email', 'or with email'],
  serversHelp: [
    'Con l\'account gli appunti vengono salvati anche sui server di Supabase, in Europa. Come li trattiamo: {privacy}.',
    'With an account, your notes are also saved on Supabase servers in Europe. How we handle them: {privacy}.',
  ],
  resendIn: (seconds: number) => [`Mandamene un'altra (tra ${seconds} s)`, `Send another one (in ${seconds} s)`],
  resend: ['Mandamene un\'altra', 'Send another one'],
  pasteLink: [
    'Incolla qui il link che trovi nell\'email, oppure scrivi il codice se c\'è.',
    'Paste the link from the email here, or type the code if there is one.',
  ],
  checking: ['Controllo…', 'Checking…'],
  emailSent: [
    'Ti abbiamo mandato un\'email a {email}. Aprila in questo browser e premi il link: entri subito.',
    'We sent an email to {email}. Open it in this browser and click the link: you\'ll be signed in right away.',
  ],
  orPaste: ['Oppure incolla qui il link (o il codice, se c\'è)', 'Or paste the link here (or the code, if there is one)'],
  otherBrowser: [
    'Se il link si apre in un altro browser, per esempio sul telefono, copialo senza aprirlo e incollalo qui.',
    'If the link opens in another browser, for example on your phone, copy it without opening it and paste it here.',
  ],
  notArrived: ['Non è arrivata? Guarda anche nello spam. {resend}', 'Didn\'t get it? Check your spam folder too. {resend}'],
  changeEmail: ['Cambia indirizzo', 'Change email'],
  // La sezione «Account» delle impostazioni.
  notSignedIn: ['Non sei entrato in un account.', 'You\'re not signed in.'],
  syncNow: ['Sincronizza ora', 'Sync now'],
  signInAgain: ['Accedi di nuovo', 'Sign in again'],
  guestNotes: ['Appunti di questo browser', 'Notes in this browser'],
  guestHelp: (n: number) => [
    n === 1
      ? 'In questo browser c\'è anche un appunto fuori dall\'account: lo ritrovi quando esci.'
      : `In questo browser ci sono anche ${n} appunti fuori dall'account: li ritrovi quando esci.`,
    n === 1
      ? 'This browser also has a note outside your account: you\'ll find it again when you sign out.'
      : `This browser also has ${n} notes outside your account: you'll find them again when you sign out.`,
  ],
  added: (n: number) => [
    n === 1 ? 'Aggiunto all\'account.' : `Aggiunti ${n} appunti all'account.`,
    n === 1 ? 'Added to your account.' : `Added ${n} notes to your account.`,
  ],
  addThem: (n: number) => [
    n === 1 ? 'Aggiungilo all\'account' : 'Aggiungili all\'account',
    n === 1 ? 'Add it to your account' : 'Add them to your account',
  ],
  downloadData: ['Scarica i miei dati', 'Download my data'],
  signedInAs: ['Sei entrato come {email}.', 'You\'re signed in as {email}.'],
  switchOrSignOut: ['Cambiare account o uscire', 'Switch account or sign out'],
  switchHelp: [
    'Cambiando account, note, cartelle e lavagne di questo account restano in questo browser: le ritrovi quando rientri. Uscendo si tolgono da qui, e le note restano nell\'account: è la scelta giusta su un computer che non è tuo.',
    'If you switch accounts, this account\'s notes, folders and whiteboards stay in this browser: you\'ll find them again when you come back. If you sign out, they\'re removed from here and the notes stay in your account: that\'s the right choice on a computer that isn\'t yours.',
  ],
  switchAccount: ['Cambia account', 'Switch account'],
  signOut: ['Esci dall\'account', 'Sign out'],
  yourData: ['I tuoi dati', 'Your data'],
  dataHelp: [
    'Puoi scaricare in un file tutto quello che c\'è nell\'account (note, cartelle, impostazioni e dizionario), oppure eliminarlo: dal server si cancella tutto, per sempre.',
    'You can download everything in your account to a file (notes, folders, settings and dictionary), or delete it: everything is erased from the server, forever.',
  ],
  deleteAccountButton: ['Elimina account…', 'Delete account…'],
  howWeHandle: ['Come trattiamo i tuoi dati: {privacy}.', 'How we handle your data: {privacy}.'],
  // La conferma prima di eliminare l'account.
  deleteAccount: ['Elimina l\'account', 'Delete account'],
  // La parola da scrivere per confermare.
  confirmWord: ['elimina', 'delete'],
  downloadYourData: ['scarica i tuoi dati', 'download your data'],
  deleteMessage: [
    'Dal server si cancellano per sempre l\'account {email} e tutto quello che contiene: note, cartelle, impostazioni e dizionario. Non si può annullare.',
    'The account {email} and everything in it will be erased from the server forever: notes, folders, settings and dictionary. This can\'t be undone.',
  ],
  keepCopy: [
    'Se vuoi tenerne una copia, prima {download}. Gli appunti fuori dall\'account restano in questo browser.',
    'If you want to keep a copy, {download} first. Notes outside your account stay in this browser.',
  ],
  otherDevices: [
    'Sugli altri dispositivi dove sei entrato, l\'accesso scade entro un\'ora: lì premi «Esci dall\'account» per togliere le note anche da quel browser.',
    'On other devices where you\'re signed in, access expires within an hour: there, press “Sign out” to remove the notes from that browser too.',
  ],
  typeToConfirm: (word: string) => [`Per confermare scrivi «${word}»`, `To confirm, type “${word}”`],
  deleteTitle: ['Eliminare l\'account?', 'Delete your account?'],
})

/** Chi è entrato, come lo restituisce il controllo del link o del codice. */
export interface SignedIn {
  userId: string
  email: string
}

// «09:05» in italiano, «9:05 AM» in inglese (americano).
const time = (ms: number) => new Date(ms).toLocaleTimeString(dateLocale(), { hour: lang === 'it' ? '2-digit' : 'numeric', minute: '2-digit' })

export function statusText(status: SyncStatus): string {
  switch (status.kind) {
    case 'syncing':
      return T.syncing
    case 'idle':
      return status.at ? T.allSynced(time(status.at)) : T.syncWaiting
    case 'offline':
      return T.offline
    case 'auth':
      return T.signInExpired
    case 'quota':
      return status.message
    case 'error':
      return T.syncFailed
  }
}

const messageOf = (err: unknown) => (err instanceof Error && err.message ? err.message : T.somethingWrong)

/** Lo stato della sincronizzazione in poche parole, sotto l'indirizzo. */
export function shortStatus(status: SyncStatus): string {
  switch (status.kind) {
    case 'syncing':
      return T.shortSyncing
    case 'idle':
      return status.at ? T.shortSynced : T.shortWaiting
    case 'offline':
      return T.shortOffline
    case 'auth':
      return T.shortExpired
    case 'quota':
      return T.shortQuota
    case 'error':
      return T.shortFailed
  }
}

/**
 * L'account in fondo alla barra laterale, come nell'app di Claude: il cerchio con l'iniziale,
 * l'indirizzo e lo stato della sincronizzazione; senza account, «Accedi».
 */
export class AccountButton {
  readonly el: HTMLButtonElement

  constructor(onClick: () => void) {
    this.el = h('button', { class: 'account-button', attrs: { type: 'button' }, on: { click: onClick } })
    this.show(null)
  }

  show(account: { email: string; status: SyncStatus } | null): void {
    if (!account) {
      this.el.className = 'account-button is-guest'
      this.el.title = T.guestTitle
      this.el.setAttribute('aria-label', T.guestLabel)
      this.el.replaceChildren(
        h('span', { class: 'account-avatar' }, icon(ICONS.user, 16)),
        h('span', { class: 'account-text' }, h('span', { class: 'account-name' }, T.signIn), h('span', { class: 'account-sub' }, T.noAccount)),
      )
      return
    }
    this.el.className = `account-button is-${account.status.kind}`
    this.el.title = `${account.email}: ${statusText(account.status)}`
    this.el.setAttribute('aria-label', `Account: ${statusText(account.status)}`)
    this.el.replaceChildren(
      h(
        'span',
        { class: 'account-avatar' },
        // Pallino dello stato: verde se è tutto sincronizzato, grigio senza rete, rosso se c'è un problema.
        (Array.from(account.email.trim())[0] ?? '?').toUpperCase(),
        h('span', { class: 'account-dot', attrs: { 'aria-hidden': 'true' } }),
      ),
      h('span', { class: 'account-text' }, h('span', { class: 'account-name' }, account.email), h('span', { class: 'account-sub' }, shortStatus(account.status))),
    )
  }
}

/** La «G» di Google, con i suoi colori (come chiedono le regole di Google per il pulsante). */
const GOOGLE_G =
  '<svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">' +
  '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
  '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
  '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
  '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>' +
  '</svg>'

/**
 * Accesso con Google, oppure via email in due passi: l'indirizzo, poi il link (o il codice)
 * dell'email.
 * `lockEmail`: per rientrare nello stesso account, l'indirizzo non si cambia.
 * `title` e `intro`: dopo «Cambia account» la finestra dice che cosa resta in questo browser.
 */
export function openLoginDialog(opts: {
  email?: string
  lockEmail?: boolean
  title?: string
  intro?: string
  /** Manda l'email; il controllo anti-robot, se chiede di cliccare, compare in `captcha`. */
  sendCode(email: string, captcha: HTMLElement): Promise<void>
  verifyCode(email: string, code: string): Promise<SignedIn>
  /** Va sulla pagina di Google (se non ci riesce, l'errore si mostra qui). */
  withGoogle(): Promise<void>
  onSignedIn(user: SignedIn): void | Promise<void>
}): void {
  let email = opts.email ?? ''
  let cooldown = 0
  const error = h('p', { class: 'prompt-error', attrs: { role: 'alert', hidden: true } })
  // Il posto del controllo anti-robot, nel passo che manda l'email.
  const captcha = h('div', { class: 'login-captcha' })
  const body = h('div', { class: 'login' })
  const dialog = dialogShell(opts.title ?? T.loginTitle, [body], 'dialog-login')
  dialog.addEventListener('close', () => clearInterval(cooldown))

  const showError = (message: string) => {
    error.textContent = message
    error.hidden = false
  }
  const busy = (button: HTMLButtonElement, label: string) => {
    button.disabled = true
    button.textContent = label
  }
  const cancel = () => h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => dialog.close() } }, T.cancel)

  function emailStep(): void {
    error.hidden = true
    const input = h('input', {
      class: 'prompt-input',
      attrs: { type: 'email', value: email, autocomplete: 'email', spellcheck: 'false', readonly: opts.lockEmail },
    })
    const submit = h('button', { class: 'btn btn-primary', attrs: { type: 'submit' } }, T.sendEmail)
    const logo = h('span', { class: 'google-logo' })
    logo.innerHTML = GOOGLE_G
    const google = h('button', { class: 'btn login-google', attrs: { type: 'button' } }, logo, T.google)
    google.addEventListener('click', () => {
      error.hidden = true
      google.disabled = true
      opts.withGoogle().catch((err: unknown) => {
        showError(messageOf(err))
        google.disabled = false
      })
    })
    const form = h(
      'form',
      {
        class: 'prompt-form',
        on: {
          submit: (ev) => {
            ev.preventDefault()
            const value = input.value.trim()
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              showError(T.enterEmail)
              input.focus()
              return
            }
            busy(submit, T.sending)
            opts.sendCode(value, captcha).then(
              () => {
                email = value
                codeStep()
              },
              (err: unknown) => {
                showError(messageOf(err))
                submit.disabled = false
                submit.textContent = T.sendEmail
              },
            )
          },
        },
      },
      h('p', { class: 'login-intro' }, opts.intro ?? T.loginIntro),
      google,
      h('p', { class: 'login-or' }, T.orEmail),
      h('label', { class: 'prompt-label' }, h('span', {}, 'Email'), input),
      error,
      h('p', { class: 'field-help' }, ...rich(T.serversHelp, { privacy: privacyLink() })),
      captcha,
      h('div', { class: 'dialog-actions' }, cancel(), submit),
    )
    input.addEventListener('input', () => (error.hidden = true))
    body.replaceChildren(form)
    input.focus()
  }

  function codeStep(): void {
    error.hidden = true
    const input = h('input', {
      class: 'prompt-input login-code',
      attrs: { type: 'text', autocomplete: 'one-time-code', autocapitalize: 'off', spellcheck: 'false' },
    })
    const submit = h('button', { class: 'btn btn-primary', attrs: { type: 'submit' } }, T.signIn)
    const resend = h('button', { class: 'link-button', attrs: { type: 'button' } })
    // Supabase manda al massimo un'email al minuto allo stesso indirizzo.
    let wait = 60
    const tick = () => {
      resend.disabled = wait > 0
      resend.textContent = wait > 0 ? T.resendIn(wait) : T.resend
      wait--
    }
    clearInterval(cooldown)
    tick()
    cooldown = window.setInterval(() => {
      tick()
      if (wait < 0) clearInterval(cooldown)
    }, 1000)
    resend.addEventListener('click', () => {
      resend.disabled = true
      opts.sendCode(email, captcha).then(
        () => codeStep(),
        (err: unknown) => {
          showError(messageOf(err))
          resend.disabled = false
        },
      )
    })
    const form = h(
      'form',
      {
        class: 'prompt-form',
        on: {
          submit: (ev) => {
            ev.preventDefault()
            const value = input.value.trim()
            if (!value) {
              showError(T.pasteLink)
              input.focus()
              return
            }
            busy(submit, T.checking)
            opts
              .verifyCode(email, value)
              .then(async (user) => {
                await opts.onSignedIn(user)
                dialog.close()
              })
              .catch((err: unknown) => {
                showError(messageOf(err))
                submit.disabled = false
                submit.textContent = T.signIn
                input.select()
              })
          },
        },
      },
      h('p', { class: 'login-intro' }, ...rich(T.emailSent, { email: h('strong', {}, email) })),
      h('label', { class: 'prompt-label' }, h('span', {}, T.orPaste), input),
      error,
      h('p', { class: 'field-help' }, T.otherBrowser),
      h(
        'p',
        { class: 'field-help' },
        ...rich(T.notArrived, { resend }),
        opts.lockEmail
          ? null
          : [
              ' · ',
              h('button', { class: 'link-button', attrs: { type: 'button' }, on: { click: () => emailStep() } }, T.changeEmail),
            ],
      ),
      captcha,
      h('div', { class: 'dialog-actions' }, cancel(), submit),
    )
    input.addEventListener('input', () => (error.hidden = true))
    body.replaceChildren(form)
    input.focus()
  }

  emailStep()
  dialog.showModal()
}

/** Cosa serve alla sezione «Account» delle impostazioni (src/ui/settings.ts), con chi è entrato. */
export interface AccountSectionDeps {
  email: string
  status: SyncStatus
  onStatus(listener: (status: SyncStatus) => void): () => void
  syncNow(): void
  /** Appunti di questo browser fuori dall'account. */
  guestCount: number
  onAdoptGuest(): number
  onRelogin(): void
  /** «Cambia account»: come uscire, ma gli appunti dell'account restano in questo browser. */
  onSwitch(): void
  onSignOut(): void
  /** «Scarica i miei dati»: prepara il file e lo scarica (gli errori li mostra lei). */
  onDownload(): Promise<void>
  onDelete(): void
}

/**
 * La sezione «Account» delle impostazioni con chi è entrato (fino al 13 ottobre 2026 era una finestra
 * sua): lo stato della sincronizzazione, gli appunti da aggiungere, il cambio di account e l'uscita, i
 * dati dell'account. `close` chiude le impostazioni prima delle azioni che aprono un'altra finestra o
 * ricaricano la pagina; `dispose` smette di seguire la sincronizzazione, quando le impostazioni si chiudono.
 */
export function accountSection(opts: AccountSectionDeps, close: () => void): { nodes: HTMLElement[]; dispose(): void } {
  const statusEl = h('p', { class: 'account-status', attrs: { 'aria-live': 'polite' } })
  const syncButton = h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => opts.syncNow() } }, icon(ICONS.refresh, 15), T.syncNow)
  // Le azioni che aprono un'altra finestra o ricaricano la pagina chiudono prima le impostazioni.
  const closing = (label: string, action: () => void, className = 'btn') =>
    h(
      'button',
      {
        class: className,
        attrs: { type: 'button' },
        on: {
          click: () => {
            close()
            action()
          },
        },
      },
      label,
    )
  const relogin = closing(T.signInAgain, () => opts.onRelogin(), 'btn btn-primary')
  const render = (status: SyncStatus) => {
    statusEl.textContent = statusText(status)
    statusEl.dataset.kind = status.kind
    syncButton.disabled = status.kind === 'syncing'
    relogin.hidden = status.kind !== 'auth'
  }
  const guest =
    opts.guestCount > 0
      ? h(
          'fieldset',
          {},
          h('legend', {}, T.guestNotes),
          h('p', { class: 'field-help' }, T.guestHelp(opts.guestCount)),
          h(
            'div',
            { class: 'button-row' },
            h(
              'button',
              {
                class: 'btn',
                attrs: { type: 'button' },
                on: {
                  click: (ev) => {
                    const moved = opts.onAdoptGuest()
                    const row = (ev.currentTarget as HTMLElement).parentElement!
                    row.replaceChildren(h('p', { class: 'field-help' }, T.added(moved)))
                  },
                },
              },
              T.addThem(opts.guestCount),
            ),
          ),
        )
      : null
  const download = h('button', { class: 'btn', attrs: { type: 'button' } }, icon(ICONS.download, 15), T.downloadData)
  download.addEventListener('click', () => {
    download.disabled = true
    void opts.onDownload().finally(() => (download.disabled = false))
  })
  const nodes = [
    h(
      'fieldset',
      { class: 'account-signed-in' },
      h('p', { class: 'account-email' }, ...rich(T.signedInAs, { email: h('strong', {}, opts.email) })),
      statusEl,
      h('div', { class: 'button-row' }, syncButton, relogin),
    ),
    guest,
    h(
      'fieldset',
      {},
      h('legend', {}, T.switchOrSignOut),
      h('p', { class: 'field-help' }, T.switchHelp),
      h('div', { class: 'button-row' }, closing(T.switchAccount, () => opts.onSwitch()), closing(T.signOut, () => opts.onSignOut())),
    ),
    h(
      'fieldset',
      {},
      h('legend', {}, T.yourData),
      h('p', { class: 'field-help' }, T.dataHelp),
      h('div', { class: 'button-row' }, download, closing(T.deleteAccountButton, () => opts.onDelete(), 'btn btn-danger-quiet')),
      h('p', { class: 'field-help' }, ...rich(T.howWeHandle, { privacy: privacyLink() })),
    ),
  ].filter((node): node is HTMLFieldSetElement => node !== null)
  render(opts.status)
  return { nodes, dispose: opts.onStatus(render) }
}

/**
 * La sezione «Account» senza account: cosa dà l'account e «Accedi», che chiude le impostazioni e apre
 * la finestra per entrare (dove l'account è spento, quella che dice perché lì non si entra).
 */
export function guestAccountSection(signIn: () => void, close: () => void): HTMLElement[] {
  return [
    h(
      'fieldset',
      { class: 'account-guest' },
      h('p', { class: 'account-email' }, T.notSignedIn),
      h('p', { class: 'field-help' }, T.loginIntro),
      h(
        'div',
        { class: 'button-row' },
        h(
          'button',
          {
            class: 'btn btn-primary',
            attrs: { type: 'button' },
            on: {
              click: () => {
                close()
                signIn()
              },
            },
          },
          icon(ICONS.user, 15),
          T.signIn,
        ),
      ),
    ),
  ]
}

/**
 * Conferma prima di eliminare l'account. Non si torna indietro, quindi bisogna scrivere
 * «elimina»; intanto si possono ancora scaricare i dati.
 */
export function confirmAccountDeletion(opts: { email: string; onDownload(): Promise<void> }): Promise<boolean> {
  return new Promise((resolve) => {
    let confirmed = false
    const input = h('input', {
      class: 'prompt-input',
      attrs: { type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' },
    })
    const submit = h('button', { class: 'btn btn-danger', attrs: { type: 'submit', disabled: true } }, T.deleteAccount)
    input.addEventListener('input', () => (submit.disabled = input.value.trim().toLowerCase() !== T.confirmWord))
    const download = h('button', { class: 'link-button', attrs: { type: 'button' } }, T.downloadYourData)
    download.addEventListener('click', () => {
      download.disabled = true
      void opts.onDownload().finally(() => (download.disabled = false))
    })
    const form = h(
      'form',
      {
        class: 'prompt-form',
        on: {
          submit: (ev) => {
            ev.preventDefault()
            if (submit.disabled) return
            confirmed = true
            dialog.close()
          },
        },
      },
      h('p', { class: 'confirm-message' }, ...rich(T.deleteMessage, { email: h('strong', {}, opts.email) })),
      h('p', { class: 'field-help' }, ...rich(T.keepCopy, { download })),
      h('p', { class: 'field-help' }, T.otherDevices),
      h('label', { class: 'prompt-label' }, h('span', {}, T.typeToConfirm(T.confirmWord)), input),
      h(
        'div',
        { class: 'dialog-actions' },
        h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => dialog.close() } }, T.cancel),
        submit,
      ),
    )
    const dialog = dialogShell(T.deleteTitle, [form], 'dialog-delete-account')
    dialog.addEventListener('close', () => resolve(confirmed))
    dialog.showModal()
    input.focus()
  })
}
