import type { SyncStatus } from '../account/controller'
import { dialogShell } from './dialogs'
import { ICONS, h, icon } from './dom'
import { privacyLink } from './links'

/** Chi è entrato, come lo restituisce il controllo del link o del codice. */
export interface SignedIn {
  userId: string
  email: string
}

const time = (ms: number) => new Date(ms).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })

export function statusText(status: SyncStatus): string {
  switch (status.kind) {
    case 'syncing':
      return 'Sincronizzazione in corso…'
    case 'idle':
      return status.at ? `Tutto sincronizzato (ultimo controllo alle ${time(status.at)}).` : 'Sincronizzazione in attesa.'
    case 'offline':
      return 'Senza connessione: le modifiche restano qui e partono quando torna la rete.'
    case 'auth':
      return 'L\'accesso è scaduto: accedi di nuovo per sincronizzare. Intanto le modifiche restano qui.'
    case 'quota':
      return status.message
    case 'error':
      return 'La sincronizzazione non è riuscita: riprovo tra poco. Le modifiche restano qui.'
  }
}

const messageOf = (err: unknown) => (err instanceof Error && err.message ? err.message : 'Qualcosa è andato storto: riprova.')

/** Il pulsante dell'account nella barra in alto: «Accedi», oppure lo stato della sincronizzazione. */
export class AccountButton {
  readonly el: HTMLButtonElement

  constructor(onClick: () => void) {
    this.el = h('button', { class: 'icon-button account-button', attrs: { type: 'button' }, on: { click: onClick } })
    this.show(null)
  }

  show(account: { email: string; status: SyncStatus } | null): void {
    if (!account) {
      this.el.className = 'icon-button account-button is-guest'
      this.el.title = 'Accedi per ritrovare gli appunti su ogni dispositivo'
      this.el.setAttribute('aria-label', 'Accedi all\'account')
      this.el.replaceChildren(icon(ICONS.user), h('span', { class: 'account-label' }, 'Accedi'))
      return
    }
    const { kind } = account.status
    const trouble = kind === 'offline' || kind === 'auth' || kind === 'quota' || kind === 'error'
    this.el.className = `icon-button account-button is-${kind}`
    this.el.title = `${account.email}: ${statusText(account.status)}`
    this.el.setAttribute('aria-label', `Account: ${statusText(account.status)}`)
    this.el.replaceChildren(icon(trouble ? ICONS.cloudOff : ICONS.cloud), h('span', { class: 'account-dot', attrs: { 'aria-hidden': 'true' } }))
  }
}

/**
 * Accesso via email, in due passi: l'indirizzo, poi il link (o il codice) dell'email.
 * `lockEmail`: per rientrare nello stesso account, l'indirizzo non si cambia.
 */
export function openLoginDialog(opts: {
  email?: string
  lockEmail?: boolean
  sendCode(email: string): Promise<void>
  verifyCode(email: string, code: string): Promise<SignedIn>
  onSignedIn(user: SignedIn): void | Promise<void>
}): void {
  let email = opts.email ?? ''
  let cooldown = 0
  const error = h('p', { class: 'prompt-error', attrs: { role: 'alert', hidden: true } })
  const body = h('div', { class: 'login' })
  const dialog = dialogShell('Accedi a Glifo', [body], 'dialog-login')
  dialog.addEventListener('close', () => clearInterval(cooldown))

  const showError = (message: string) => {
    error.textContent = message
    error.hidden = false
  }
  const busy = (button: HTMLButtonElement, label: string) => {
    button.disabled = true
    button.textContent = label
  }
  const cancel = () => h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => dialog.close() } }, 'Annulla')

  function emailStep(): void {
    error.hidden = true
    const input = h('input', {
      class: 'prompt-input',
      attrs: { type: 'email', value: email, autocomplete: 'email', spellcheck: 'false', readonly: opts.lockEmail },
    })
    const submit = h('button', { class: 'btn btn-primary', attrs: { type: 'submit' } }, 'Mandami l\'email')
    const form = h(
      'form',
      {
        class: 'prompt-form',
        on: {
          submit: (ev) => {
            ev.preventDefault()
            const value = input.value.trim()
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              showError('Scrivi il tuo indirizzo email.')
              input.focus()
              return
            }
            busy(submit, 'Invio…')
            opts.sendCode(value).then(
              () => {
                email = value
                codeStep()
              },
              (err: unknown) => {
                showError(messageOf(err))
                submit.disabled = false
                submit.textContent = 'Mandami l\'email'
              },
            )
          },
        },
      },
      h(
        'p',
        { class: 'login-intro' },
        'Con l\'account ritrovi gli stessi appunti su computer, tablet e telefono. Niente password: ti mandiamo un\'email per entrare.',
      ),
      h('label', { class: 'prompt-label' }, h('span', {}, 'Email'), input),
      error,
      h(
        'p',
        { class: 'field-help' },
        'Con l\'account gli appunti vengono salvati anche sui server di Supabase, in Europa. Come li trattiamo: ',
        privacyLink(),
        '.',
      ),
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
    const submit = h('button', { class: 'btn btn-primary', attrs: { type: 'submit' } }, 'Accedi')
    const resend = h('button', { class: 'link-button', attrs: { type: 'button' } })
    // Supabase manda al massimo un'email al minuto allo stesso indirizzo.
    let wait = 60
    const tick = () => {
      resend.disabled = wait > 0
      resend.textContent = wait > 0 ? `Mandamene un'altra (tra ${wait} s)` : 'Mandamene un\'altra'
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
      opts.sendCode(email).then(
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
              showError('Incolla qui il link che trovi nell\'email, oppure scrivi il codice se c\'è.')
              input.focus()
              return
            }
            busy(submit, 'Controllo…')
            opts
              .verifyCode(email, value)
              .then(async (user) => {
                await opts.onSignedIn(user)
                dialog.close()
              })
              .catch((err: unknown) => {
                showError(messageOf(err))
                submit.disabled = false
                submit.textContent = 'Accedi'
                input.select()
              })
          },
        },
      },
      h(
        'p',
        { class: 'login-intro' },
        'Ti abbiamo mandato un\'email a ',
        h('strong', {}, email),
        '. Aprila in questo browser e premi il link: entri subito.',
      ),
      h('label', { class: 'prompt-label' }, h('span', {}, 'Oppure incolla qui il link (o il codice, se c\'è)'), input),
      error,
      h('p', { class: 'field-help' }, 'Se il link si apre in un altro browser, per esempio sul telefono, copialo senza aprirlo e incollalo qui.'),
      h(
        'p',
        { class: 'field-help' },
        'Non è arrivata? Guarda anche nello spam. ',
        resend,
        opts.lockEmail
          ? null
          : [
              ' · ',
              h('button', { class: 'link-button', attrs: { type: 'button' }, on: { click: () => emailStep() } }, 'Cambia indirizzo'),
            ],
      ),
      h('div', { class: 'dialog-actions' }, cancel(), submit),
    )
    input.addEventListener('input', () => (error.hidden = true))
    body.replaceChildren(form)
    input.focus()
  }

  emailStep()
  dialog.showModal()
}

/** L'account con cui si è entrati: stato della sincronizzazione, appunti da aggiungere, uscita. */
export function openAccountDialog(opts: {
  email: string
  status: SyncStatus
  onStatus(listener: (status: SyncStatus) => void): () => void
  syncNow(): void
  /** Appunti di questo browser fuori dall'account. */
  guestCount: number
  onAdoptGuest(): number
  onRelogin(): void
  onSignOut(): void
  /** «Scarica i miei dati»: prepara il file e lo scarica (gli errori li mostra lei). */
  onDownload(): Promise<void>
  onDelete(): void
}): void {
  const statusEl = h('p', { class: 'account-status', attrs: { 'aria-live': 'polite' } })
  const syncButton = h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => opts.syncNow() } }, icon(ICONS.refresh, 15), 'Sincronizza ora')
  const relogin = h(
    'button',
    {
      class: 'btn btn-primary',
      attrs: { type: 'button' },
      on: {
        click: () => {
          dialog.close()
          opts.onRelogin()
        },
      },
    },
    'Accedi di nuovo',
  )
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
          h('legend', {}, 'Appunti di questo browser'),
          h(
            'p',
            { class: 'field-help' },
            opts.guestCount === 1
              ? 'In questo browser c\'è anche un appunto fuori dall\'account: lo ritrovi quando esci.'
              : `In questo browser ci sono anche ${opts.guestCount} appunti fuori dall'account: li ritrovi quando esci.`,
          ),
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
                    row.replaceChildren(h('p', { class: 'field-help' }, moved === 1 ? 'Aggiunto all\'account.' : `Aggiunti ${moved} appunti all'account.`))
                  },
                },
              },
              opts.guestCount === 1 ? 'Aggiungilo all\'account' : 'Aggiungili all\'account',
            ),
          ),
        )
      : null
  const download = h('button', { class: 'btn', attrs: { type: 'button' } }, icon(ICONS.download, 15), 'Scarica i miei dati')
  download.addEventListener('click', () => {
    download.disabled = true
    void opts.onDownload().finally(() => (download.disabled = false))
  })
  const dialog = dialogShell(
    'Account',
    [
      h(
        'fieldset',
        {},
        h('p', { class: 'account-email' }, 'Sei entrato come ', h('strong', {}, opts.email), '.'),
        statusEl,
        h('div', { class: 'button-row' }, syncButton, relogin),
      ),
      guest,
      h(
        'fieldset',
        {},
        h('legend', {}, 'Uscire'),
        h(
          'p',
          { class: 'field-help' },
          'Uscendo, le note dell\'account vengono tolte da questo browser: restano nell\'account e le ritrovi quando rientri.',
        ),
        h(
          'div',
          { class: 'button-row' },
          h(
            'button',
            {
              class: 'btn',
              attrs: { type: 'button' },
              on: {
                click: () => {
                  dialog.close()
                  opts.onSignOut()
                },
              },
            },
            'Esci dall\'account',
          ),
        ),
      ),
      h(
        'fieldset',
        {},
        h('legend', {}, 'I tuoi dati'),
        h(
          'p',
          { class: 'field-help' },
          'Puoi scaricare in un file tutto quello che c\'è nell\'account (note, cartelle, impostazioni e dizionario), oppure eliminarlo: dal server si cancella tutto, per sempre.',
        ),
        h(
          'div',
          { class: 'button-row' },
          download,
          h(
            'button',
            {
              class: 'btn btn-danger-quiet',
              attrs: { type: 'button' },
              on: {
                click: () => {
                  dialog.close()
                  opts.onDelete()
                },
              },
            },
            'Elimina account…',
          ),
        ),
        h('p', { class: 'field-help' }, 'Come trattiamo i tuoi dati: ', privacyLink(), '.'),
      ),
    ],
    'dialog-account',
  )
  render(opts.status)
  const unsubscribe = opts.onStatus(render)
  dialog.addEventListener('close', unsubscribe)
  dialog.showModal()
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
    const submit = h('button', { class: 'btn btn-danger', attrs: { type: 'submit', disabled: true } }, 'Elimina l\'account')
    input.addEventListener('input', () => (submit.disabled = input.value.trim().toLowerCase() !== 'elimina'))
    const download = h('button', { class: 'link-button', attrs: { type: 'button' } }, 'scarica i tuoi dati')
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
      h(
        'p',
        { class: 'confirm-message' },
        'Dal server si cancellano per sempre l\'account ',
        h('strong', {}, opts.email),
        ' e tutto quello che contiene: note, cartelle, impostazioni e dizionario. Non si può annullare.',
      ),
      h('p', { class: 'field-help' }, 'Se vuoi tenerne una copia, prima ', download, '. Gli appunti fuori dall\'account restano in questo browser.'),
      h(
        'p',
        { class: 'field-help' },
        'Sugli altri dispositivi dove sei entrato, l\'accesso scade entro un\'ora: lì premi «Esci dall\'account» per togliere le note anche da quel browser.',
      ),
      h('label', { class: 'prompt-label' }, h('span', {}, 'Per confermare scrivi «elimina»'), input),
      h(
        'div',
        { class: 'dialog-actions' },
        h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => dialog.close() } }, 'Annulla'),
        submit,
      ),
    )
    const dialog = dialogShell('Eliminare l\'account?', [form], 'dialog-delete-account')
    dialog.addEventListener('close', () => resolve(confirmed))
    dialog.showModal()
    input.focus()
  })
}
