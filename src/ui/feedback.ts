/**
 * «Scrivi un commento» (8 ottobre 2026): chi prova Glifo scrive un problema, un'idea o altro dalla
 * pagina «Commenti» (comments.ts), che si apre dal fumetto in fondo alla barra laterale (non dalla
 * barra sopra il testo, dove ci sono gli strumenti della nota). Il messaggio va nella tabella
 * `feedback` di Supabase con la sola chiave pubblica, senza il client e senza l'accesso, come la
 * lettura delle note condivise; chi fa Glifo li legge tutti nella dashboard (supabase/README.md,
 * «Commenti»). Chi scrive sceglie se farlo vedere a tutti nella pagina, con un nome se vuole; l'email
 * non si vede mai. Con il messaggio vanno il sito, la versione di Glifo e il browser con la misura
 * della finestra; mai le note. Quello che si scrive resta finché non parte, anche chiudendo la finestra.
 */
import { SUPABASE_KEY, SUPABASE_URL } from '../account/config'
import type { Site } from '../site'
import { dialogShell } from './dialogs'
import { h } from './dom'
import { privacyLink } from './links'
import { toast } from './toast'

export type FeedbackKind = 'problema' | 'idea' | 'altro'

/** Una riga della tabella `feedback` (supabase/migrations, «commenti»). */
export interface FeedbackRow {
  kind: FeedbackKind
  message: string
  /** Il nome che si vede con il commento; senza, «Anonimo». */
  author: string | null
  email: string | null
  /** Si vede nella pagina «Commenti»; se no lo legge solo chi fa Glifo. */
  visible: boolean
  site: Site
  version: string
  browser: string
}

/** Come nel database: al massimo 4000 caratteri di testo, 40 di nome e 254 di email. */
export const MESSAGE_MAX = 4000
export const AUTHOR_MAX = 40
const EMAIL_MAX = 254
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export interface FeedbackInput {
  kind: FeedbackKind
  message: string
  author: string
  email: string
  visible: boolean
}

/** Il commento da mandare, oppure il problema da dire nella finestra e il campo da correggere. */
export function feedbackRow(
  input: FeedbackInput,
  info: { site: Site; version: string; browser: string },
): FeedbackRow | { problem: string; field: 'message' | 'author' | 'email' } {
  const message = input.message.trim()
  if (!message) return { problem: 'Scrivi qualcosa prima di mandarlo.', field: 'message' }
  if (message.length > MESSAGE_MAX) return { problem: `Il messaggio è troppo lungo: al massimo ${MESSAGE_MAX} caratteri.`, field: 'message' }
  // Su una riga sola, come vuole il database: a capo e tabulazioni diventano spazi.
  const author = input.author.replace(/\p{Cc}/gu, ' ').replace(/\s+/g, ' ').trim()
  if (author.length > AUTHOR_MAX) return { problem: `Il nome è troppo lungo: al massimo ${AUTHOR_MAX} caratteri.`, field: 'author' }
  const email = input.email.trim()
  if (email && (email.length > EMAIL_MAX || !EMAIL.test(email))) return { problem: 'L\'email non sembra giusta: controllala, o lasciala vuota.', field: 'email' }
  return {
    kind: input.kind,
    message,
    author: author || null,
    email: email || null,
    visible: input.visible,
    site: info.site,
    version: info.version.slice(0, 64),
    browser: info.browser.slice(0, 512),
  }
}

/** Il browser e la finestra, per capire i problemi (la finestra lo dice, e l'informativa). */
export function browserInfo(): string {
  return `${navigator.userAgent} · finestra ${innerWidth}×${innerHeight}`.slice(0, 512)
}

/** Perché il commento non è partito, già detto per la finestra. */
export class FeedbackError extends Error {}

/** Manda il commento: finisce quando è arrivato, se no lancia un `FeedbackError`. */
export async function sendFeedback(row: FeedbackRow, fetchImpl: typeof fetch = (...args) => fetch(...args)): Promise<void> {
  let response: Response
  try {
    response = await fetchImpl(`${SUPABASE_URL}/rest/v1/feedback`, {
      method: 'POST',
      headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(row),
      signal: typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(20_000) : undefined,
    })
  } catch {
    throw new FeedbackError('Senza connessione il messaggio non parte: riprova quando sei di nuovo in rete. Quello che hai scritto resta qui.')
  }
  if (response.ok) return
  const error = (await response.json().catch(() => null)) as { hint?: string } | null
  if (error?.hint === 'quota') throw new FeedbackError('Sono arrivati troppi messaggi in poco tempo: riprova tra un po\'.')
  throw new FeedbackError('Il messaggio non è partito: riprova tra poco.')
}

export interface FeedbackDeps {
  site: Site
  /** La versione di Glifo (`__GLIFO_VERSION__`). */
  version: string
  /** Dove i messaggi non partono (dentro claude.ai): il motivo, al posto di «Manda». */
  off?: string
  /** Il tipo già scelto (la scheda aperta nella pagina «Commenti»), se non c'è un testo a metà. */
  kind?: FeedbackKind
  /** Quando il commento è arrivato. */
  onSent?: (row: FeedbackRow) => void
  /** Per le prove. */
  send?: (row: FeedbackRow) => Promise<void>
}

const KINDS: [FeedbackKind, string][] = [
  ['problema', 'Un problema'],
  ['idea', 'Un\'idea'],
  ['altro', 'Altro'],
]

/**
 * Quello che si stava scrivendo: resta se si chiude la finestra prima di mandarlo. Mandato il
 * commento, nome, email e la scelta di farlo vedere restano per il prossimo.
 */
let draft: FeedbackInput = { kind: 'altro', message: '', author: '', email: '', visible: true }

export function openFeedbackDialog(deps: FeedbackDeps): HTMLDialogElement {
  const send = deps.send ?? ((row: FeedbackRow) => sendFeedback(row))
  if (deps.kind && !draft.message.trim()) draft.kind = deps.kind
  const kinds = h(
    'div',
    { class: 'segmented feedback-kinds', attrs: { role: 'radiogroup', 'aria-label': 'Di cosa si tratta' } },
    KINDS.map(([value, label]) =>
      h(
        'label',
        {},
        h('input', {
          attrs: { type: 'radio', name: 'feedback-kind', value, checked: draft.kind === value },
          on: { change: () => (draft.kind = value) },
        }),
        h('span', {}, label),
      ),
    ),
  )
  const message = h('textarea', {
    class: 'feedback-message',
    attrs: {
      rows: 6,
      maxlength: MESSAGE_MAX,
      placeholder: 'Se è un problema, di\' anche cosa stavi facendo.',
      autofocus: true,
    },
    on: { input: () => ((draft.message = message.value), (error.hidden = true)) },
  })
  message.value = draft.message
  const author = h('input', {
    class: 'prompt-input',
    attrs: { type: 'text', autocomplete: 'nickname', maxlength: AUTHOR_MAX, placeholder: 'Anonimo' },
    on: { input: () => ((draft.author = author.value), (error.hidden = true)) },
  })
  author.value = draft.author
  const email = h('input', {
    class: 'prompt-input',
    attrs: { type: 'email', autocomplete: 'email', maxlength: EMAIL_MAX, placeholder: 'nome@esempio.it' },
    on: { input: () => ((draft.email = email.value), (error.hidden = true)) },
  })
  email.value = draft.email
  const visible = h('input', {
    attrs: { type: 'checkbox', checked: draft.visible },
    on: { change: () => (draft.visible = visible.checked) },
  })
  const error = h('p', { class: 'prompt-error', attrs: { role: 'alert', hidden: true } })
  const submit = h('button', { class: 'btn btn-primary', attrs: { type: 'submit', disabled: !!deps.off } }, 'Manda')
  const showError = (text: string) => {
    error.textContent = text
    error.hidden = false
  }
  const form = h(
    'form',
    {
      class: 'prompt-form feedback-form',
      on: {
        submit: (ev) => {
          ev.preventDefault()
          if (deps.off || submit.disabled) return
          const row = feedbackRow(draft, { site: deps.site, version: deps.version, browser: browserInfo() })
          if ('problem' in row) {
            showError(row.problem)
            const field = { message, author, email }[row.field]
            field.focus()
            return
          }
          submit.disabled = true
          submit.textContent = 'Mando…'
          send(row).then(
            () => {
              draft = { ...draft, kind: 'altro', message: '' }
              dialog.close()
              toast('Grazie! Il messaggio è arrivato.')
              deps.onSent?.(row)
            },
            (err: unknown) => {
              submit.disabled = false
              submit.textContent = 'Manda'
              showError(err instanceof FeedbackError ? err.message : 'Il messaggio non è partito: riprova tra poco.')
            },
          )
        },
      },
    },
    h('p', { class: 'feedback-intro' }, 'Un problema, un\'idea, una cosa che ti è piaciuta: il messaggio arriva a chi fa Glifo e, se vuoi, si vede nella pagina dei commenti.'),
    kinds,
    h('label', { class: 'prompt-label' }, h('span', {}, 'Il messaggio'), message),
    h('label', { class: 'prompt-label' }, h('span', {}, 'Il tuo nome (facoltativo)'), author),
    h('label', { class: 'prompt-label' }, h('span', {}, 'La tua email, se vuoi una risposta (facoltativa)'), email),
    h('label', { class: 'check feedback-visible' }, visible, h('span', {}, 'Fallo vedere a tutti nella pagina dei commenti')),
    h(
      'p',
      { class: 'field-help' },
      'Nella pagina dei commenti si vedono il messaggio, il nome e la data; l\'email la legge solo chi fa Glifo. Con il messaggio arrivano anche la versione di Glifo e il browser, per capire i problemi: mai le tue note. Come trattiamo i tuoi dati: ',
      privacyLink(),
      '.',
    ),
    deps.off ? h('p', { class: 'feedback-off' }, deps.off) : null,
    error,
    h(
      'div',
      { class: 'dialog-actions' },
      h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => dialog.close() } }, 'Annulla'),
      submit,
    ),
  )
  const dialog = dialogShell('Scrivi un commento', [form], 'dialog-feedback')
  dialog.showModal()
  message.focus()
  return dialog
}
