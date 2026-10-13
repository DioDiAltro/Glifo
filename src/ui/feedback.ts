/**
 * «Scrivi un commento» (8 ottobre 2026): chi prova Glifo scrive un problema, un'idea o altro. La finestra
 * si apre dal fumetto in fondo alla barra laterale (non dalla barra sopra il testo, dove ci sono gli
 * strumenti della nota), con in cima il link alla pagina «Domande frequenti e commenti» (faq.html), e da
 * quella pagina (comments.ts). Il messaggio va nella tabella `feedback` di Supabase con la sola chiave
 * pubblica, senza il client e senza l'accesso, come la lettura delle note condivise; chi fa Glifo li
 * legge tutti nella dashboard (supabase/README.md, «Commenti»). Chi scrive sceglie se farlo vedere a
 * tutti nella pagina, con un nome se vuole; l'email non si vede mai. Dal sito di prova partono sempre
 * privati: il database è quello vero, e una prova non deve comparire su glifo.page. Con il messaggio
 * vanno il sito, la versione di Glifo e il browser con la misura della finestra; mai le note. Quello che
 * si scrive resta finché non parte, anche chiudendo la finestra.
 */
import { SUPABASE_KEY, SUPABASE_URL } from '../account/config'
import { rich, texts } from '../i18n'
import type { Site } from '../site'
import { dialogShell } from './dialogs'
import { h } from './dom'
import { faqLink, privacyLink } from './links'
import { toast } from './toast'

const T = texts({
  writeSomething: ['Scrivi qualcosa prima di mandarlo.', 'Write something before sending it.'],
  messageTooLong: (max: number) => [`Il messaggio è troppo lungo: al massimo ${max} caratteri.`, `The message is too long: ${max} characters at most.`],
  nameTooLong: (max: number) => [`Il nome è troppo lungo: al massimo ${max} caratteri.`, `The name is too long: ${max} characters at most.`],
  badEmail: ['L\'email non sembra giusta: controllala, o lasciala vuota.', 'That email doesn\'t look right: check it, or leave it empty.'],
  offline: [
    'Senza connessione il messaggio non parte: riprova quando sei di nuovo in rete. Quello che hai scritto resta qui.',
    'Your message can\'t be sent while offline: try again when you\'re back online. What you wrote stays here.',
  ],
  tooMany: ['Sono arrivati troppi messaggi in poco tempo: riprova tra un po\'.', 'Too many messages arrived in a short time: try again in a little while.'],
  notSent: ['Il messaggio non è partito: riprova tra poco.', 'The message wasn\'t sent: try again in a moment.'],
  aProblem: ['Un problema', 'A problem'],
  anIdea: ['Un\'idea', 'An idea'],
  other: ['Altro', 'Other'],
  whatAbout: ['Di cosa si tratta', 'What it\'s about'],
  messagePlaceholder: ['Se è un problema, di\' anche cosa stavi facendo.', 'If it\'s a problem, also say what you were doing.'],
  anonymous: ['Anonimo', 'Anonymous'],
  emailPlaceholder: ['nome@esempio.it', 'name@example.com'],
  send: ['Manda', 'Send'],
  sending: ['Mando…', 'Sending…'],
  thanks: ['Grazie! Il messaggio è arrivato.', 'Thanks! Your message was received.'],
  intro: [
    'Un problema, un\'idea, una cosa che ti è piaciuta: il messaggio arriva a chi fa Glifo e, se vuoi, si vede nella pagina dei commenti.',
    'A problem, an idea, something you liked: your message goes to the Glifo team and, if you want, it shows up on the feedback page.',
  ],
  message: ['Il messaggio', 'Message'],
  name: ['Il tuo nome (facoltativo)', 'Your name (optional)'],
  email: ['La tua email, se vuoi una risposta (facoltativa)', 'Your email, if you want a reply (optional)'],
  visible: ['Fallo vedere a tutti nella pagina dei commenti', 'Show it to everyone on the feedback page'],
  help: [
    'Nella pagina dei commenti si vedono il messaggio, il nome e la data; l\'email la legge solo chi fa Glifo. Con il messaggio arrivano anche la versione di Glifo e il browser, per capire i problemi: mai le tue note. Come trattiamo i tuoi dati: {privacy}.',
    'The feedback page shows your message, your name and the date; only the Glifo team reads your email. Along with your message we also receive the Glifo version and your browser, to help understand problems: never your notes. How we handle your data: {privacy}.',
  ],
  cancel: ['Annulla', 'Cancel'],
  title: ['Scrivi un commento', 'Write a comment'],
  // `faq`: il link alla pagina «Domande frequenti e commenti».
  checkFaq: [
    'Prima di scrivere, guarda se la risposta c\'è già: {faq}.',
    'Before writing, see whether the answer is already there: {faq}.',
  ],
  testSite: [
    'Dal sito di prova i commenti partono sempre privati: li legge solo chi fa Glifo e nella pagina non si vedono.',
    'From the test site, comments are always sent privately: only the Glifo team reads them, and they don\'t appear on the page.',
  ],
  inClaude: [
    'Dentro claude.ai i messaggi non partono: mandalo dal sito di Glifo.',
    'Messages can\'t be sent from inside claude.ai: send yours from the Glifo website.',
  ],
})

export type FeedbackKind = 'problema' | 'idea' | 'altro'

/** Una riga della tabella `feedback` (supabase/migrations, «commenti»). */
export interface FeedbackRow {
  kind: FeedbackKind
  message: string
  /** Il nome che si vede con il commento; senza, «Anonimo». */
  author: string | null
  email: string | null
  /** Si vede nella pagina «Domande frequenti e commenti»; se no lo legge solo chi fa Glifo. */
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
  if (!message) return { problem: T.writeSomething, field: 'message' }
  if (message.length > MESSAGE_MAX) return { problem: T.messageTooLong(MESSAGE_MAX), field: 'message' }
  // Su una riga sola, come vuole il database: a capo e tabulazioni diventano spazi.
  const author = input.author.replace(/\p{Cc}/gu, ' ').replace(/\s+/g, ' ').trim()
  if (author.length > AUTHOR_MAX) return { problem: T.nameTooLong(AUTHOR_MAX), field: 'author' }
  const email = input.email.trim()
  if (email && (email.length > EMAIL_MAX || !EMAIL.test(email))) return { problem: T.badEmail, field: 'email' }
  return {
    kind: input.kind,
    message,
    author: author || null,
    email: email || null,
    // Dal sito di prova mai pubblico: il database è quello vero, e la pagina dei commenti è una sola.
    visible: info.site === 'prova' ? false : input.visible,
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

/** Dentro claude.ai: perché il messaggio non parte, al posto di «Manda». */
export function feedbackOffInClaude(): string {
  return T.inClaude
}

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
    throw new FeedbackError(T.offline)
  }
  if (response.ok) return
  const error = (await response.json().catch(() => null)) as { hint?: string } | null
  if (error?.hint === 'quota') throw new FeedbackError(T.tooMany)
  throw new FeedbackError(T.notSent)
}

export interface FeedbackDeps {
  site: Site
  /** La versione di Glifo (`__GLIFO_VERSION__`). */
  version: string
  /** Dove i messaggi non partono (dentro claude.ai): il motivo, al posto di «Manda». */
  off?: string
  /** Il tipo già scelto (la scheda aperta nella pagina dei commenti), se non c'è un testo a metà. */
  kind?: FeedbackKind
  /** In cima il link alle domande frequenti: dal fumetto di Glifo (nella pagina ci sono già). */
  faq?: boolean
  /** Quando il commento è arrivato. */
  onSent?: (row: FeedbackRow) => void
  /** Per le prove. */
  send?: (row: FeedbackRow) => Promise<void>
}

const KINDS: [FeedbackKind, string][] = [
  ['problema', T.aProblem],
  ['idea', T.anIdea],
  ['altro', T.other],
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
    { class: 'segmented feedback-kinds', attrs: { role: 'radiogroup', 'aria-label': T.whatAbout } },
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
      placeholder: T.messagePlaceholder,
      autofocus: true,
    },
    on: { input: () => ((draft.message = message.value), (error.hidden = true)) },
  })
  message.value = draft.message
  const author = h('input', {
    class: 'prompt-input',
    attrs: { type: 'text', autocomplete: 'nickname', maxlength: AUTHOR_MAX, placeholder: T.anonymous },
    on: { input: () => ((draft.author = author.value), (error.hidden = true)) },
  })
  author.value = draft.author
  const email = h('input', {
    class: 'prompt-input',
    attrs: { type: 'email', autocomplete: 'email', maxlength: EMAIL_MAX, placeholder: T.emailPlaceholder },
    on: { input: () => ((draft.email = email.value), (error.hidden = true)) },
  })
  email.value = draft.email
  const visible = h('input', {
    attrs: { type: 'checkbox', checked: draft.visible },
    on: { change: () => (draft.visible = visible.checked) },
  })
  const testSite = deps.site === 'prova'
  const error = h('p', { class: 'prompt-error', attrs: { role: 'alert', hidden: true } })
  const submit = h('button', { class: 'btn btn-primary', attrs: { type: 'submit', disabled: !!deps.off } }, T.send)
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
          submit.textContent = T.sending
          send(row).then(
            () => {
              draft = { ...draft, kind: 'altro', message: '' }
              dialog.close()
              toast(T.thanks)
              deps.onSent?.(row)
            },
            (err: unknown) => {
              submit.disabled = false
              submit.textContent = T.send
              showError(err instanceof FeedbackError ? err.message : T.notSent)
            },
          )
        },
      },
    },
    deps.faq && !deps.off ? h('p', { class: 'feedback-faq' }, ...rich(T.checkFaq, { faq: faqLink() })) : null,
    h('p', { class: 'feedback-intro' }, T.intro),
    kinds,
    h('label', { class: 'prompt-label' }, h('span', {}, T.message), message),
    h('label', { class: 'prompt-label' }, h('span', {}, T.name), author),
    h('label', { class: 'prompt-label' }, h('span', {}, T.email), email),
    testSite
      ? h('p', { class: 'feedback-test-site' }, T.testSite)
      : h('label', { class: 'check feedback-visible' }, visible, h('span', {}, T.visible)),
    h('p', { class: 'field-help' }, ...rich(T.help, { privacy: privacyLink() })),
    deps.off ? h('p', { class: 'feedback-off' }, deps.off) : null,
    error,
    h(
      'div',
      { class: 'dialog-actions' },
      h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => dialog.close() } }, T.cancel),
      submit,
    ),
  )
  const dialog = dialogShell(T.title, [form], 'dialog-feedback')
  dialog.showModal()
  message.focus()
  return dialog
}
