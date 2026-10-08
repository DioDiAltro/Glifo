/**
 * «Mandaci un commento» (8 ottobre 2026): chi prova Glifo scrive un problema, un'idea o altro dal
 * pulsante in fondo alla barra laterale (non nella barra sopra il testo, dove ci sono gli strumenti
 * della nota). Il messaggio va nella tabella `feedback` di Supabase con la sola chiave pubblica, senza
 * il client e senza l'accesso, come la lettura delle note condivise: il browser li scrive soltanto, chi
 * fa Glifo li legge nella dashboard (supabase/README.md, «Commenti»). Con il messaggio vanno il sito,
 * la versione di Glifo e il browser con la misura della finestra; mai le note. Quello che si scrive
 * resta finché non parte, anche chiudendo la finestra.
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
  email: string | null
  site: Site
  version: string
  browser: string
}

/** Come nel database: al massimo 4000 caratteri di testo e 254 di email. */
export const MESSAGE_MAX = 4000
const EMAIL_MAX = 254
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/** Il commento da mandare, oppure il problema da dire nella finestra e il campo da correggere. */
export function feedbackRow(
  input: { kind: FeedbackKind; message: string; email: string },
  info: { site: Site; version: string; browser: string },
): FeedbackRow | { problem: string; field: 'message' | 'email' } {
  const message = input.message.trim()
  if (!message) return { problem: 'Scrivi qualcosa prima di mandarlo.', field: 'message' }
  if (message.length > MESSAGE_MAX) return { problem: `Il messaggio è troppo lungo: al massimo ${MESSAGE_MAX} caratteri.`, field: 'message' }
  const email = input.email.trim()
  if (email && (email.length > EMAIL_MAX || !EMAIL.test(email))) return { problem: 'L\'email non sembra giusta: controllala, o lasciala vuota.', field: 'email' }
  return { kind: input.kind, message, email: email || null, site: info.site, version: info.version.slice(0, 64), browser: info.browser.slice(0, 512) }
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
  /** Per le prove. */
  send?: (row: FeedbackRow) => Promise<void>
}

const KINDS: [FeedbackKind, string][] = [
  ['problema', 'Un problema'],
  ['idea', 'Un\'idea'],
  ['altro', 'Altro'],
]

/** Quello che si stava scrivendo: resta se si chiude la finestra prima di mandarlo. */
let draft: { kind: FeedbackKind; message: string; email: string } = { kind: 'altro', message: '', email: '' }

export function openFeedbackDialog(deps: FeedbackDeps): HTMLDialogElement {
  const send = deps.send ?? ((row: FeedbackRow) => sendFeedback(row))
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
  const email = h('input', {
    class: 'prompt-input',
    attrs: { type: 'email', autocomplete: 'email', maxlength: EMAIL_MAX, placeholder: 'nome@esempio.it' },
    on: { input: () => ((draft.email = email.value), (error.hidden = true)) },
  })
  email.value = draft.email
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
            const field = row.field === 'email' ? email : message
            field.focus()
            return
          }
          submit.disabled = true
          submit.textContent = 'Mando…'
          send(row).then(
            () => {
              draft = { kind: 'altro', message: '', email: '' }
              dialog.close()
              toast('Grazie! Il messaggio è arrivato.')
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
    h('p', { class: 'feedback-intro' }, 'Un problema, un\'idea, una cosa che ti è piaciuta: il messaggio arriva a chi fa Glifo.'),
    kinds,
    h('label', { class: 'prompt-label' }, h('span', {}, 'Il messaggio'), message),
    h('label', { class: 'prompt-label' }, h('span', {}, 'La tua email, se vuoi una risposta (facoltativa)'), email),
    h(
      'p',
      { class: 'field-help' },
      'Con il messaggio arrivano anche la versione di Glifo e il browser, per capire i problemi: mai le tue note. Come trattiamo i tuoi dati: ',
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
  const dialog = dialogShell('Mandaci un commento', [form], 'dialog-feedback')
  dialog.showModal()
  message.focus()
  return dialog
}
