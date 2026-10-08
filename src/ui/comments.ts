/**
 * La pagina «Commenti» (8 ottobre 2026), dal fumetto in fondo alla barra laterale: quello che chi
 * prova Glifo ha scritto e ha scelto di far vedere a tutti, diviso in problemi, idee e altro, così
 * prima di scrivere si guarda se qualcuno l'ha già detto. Si legge dalla tabella `feedback` di
 * Supabase con la sola chiave pubblica, come le note condivise: il database dà solo i commenti
 * visibili e solo tipo, nome, testo, data e la risposta di chi fa Glifo (migrazione «commenti
 * pubblici»), mai l'email, il sito, la versione o il browser. «Scrivi un commento» apre la finestra
 * di feedback.ts; dentro claude.ai i commenti non si leggono e non partono.
 */
import { SUPABASE_KEY, SUPABASE_URL } from '../account/config'
import { dialogShell } from './dialogs'
import { h } from './dom'
import { openFeedbackDialog, type FeedbackDeps, type FeedbackKind } from './feedback'

/** Un commento come lo vede chiunque nella pagina. */
export interface PublicComment {
  id: string
  created_at: string
  kind: FeedbackKind
  author: string | null
  message: string
  reply: string | null
}

/** Le sole colonne che il database lascia leggere a tutti. */
export const PUBLIC_COLUMNS = 'id,created_at,kind,author,message,reply'
/** Quanti commenti si caricano, i più recenti. */
export const COMMENTS_MAX = 300

const TABS: { kind: FeedbackKind; label: string; empty: string }[] = [
  { kind: 'problema', label: 'Problemi', empty: 'Nessun problema, per ora.' },
  { kind: 'idea', label: 'Idee', empty: 'Nessuna idea, per ora.' },
  { kind: 'altro', label: 'Altro', empty: 'Ancora niente, qui.' },
]
const KINDS = new Set<unknown>(TABS.map((tab) => tab.kind))

/** Perché i commenti non si vedono, già detto per la pagina. */
export class CommentsError extends Error {}

function isComment(row: unknown): row is PublicComment {
  if (!row || typeof row !== 'object') return false
  const r = row as Record<string, unknown>
  return (
    typeof r.id === 'string' &&
    typeof r.created_at === 'string' &&
    KINDS.has(r.kind) &&
    typeof r.message === 'string' &&
    (r.author === null || typeof r.author === 'string') &&
    (r.reply === null || typeof r.reply === 'string')
  )
}

/** I commenti visibili, dal più recente: finisce con l'elenco, se no lancia un `CommentsError`. */
export async function loadComments(fetchImpl: typeof fetch = (...args) => fetch(...args)): Promise<PublicComment[]> {
  let response: Response
  try {
    response = await fetchImpl(`${SUPABASE_URL}/rest/v1/feedback?select=${PUBLIC_COLUMNS}&order=created_at.desc&limit=${COMMENTS_MAX}`, {
      headers: { apikey: SUPABASE_KEY },
      cache: 'no-store',
      signal: typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(20_000) : undefined,
    })
  } catch {
    throw new CommentsError(
      navigator.onLine === false
        ? 'Senza connessione i commenti non si vedono: riprova quando sei di nuovo in rete.'
        : 'Non riesco a caricare i commenti: controlla la connessione e riprova.',
    )
  }
  const rows: unknown = response.ok ? await response.json().catch(() => null) : null
  if (!Array.isArray(rows)) throw new CommentsError('Non riesco a caricare i commenti: riprova tra poco.')
  return rows.filter(isComment)
}

/** Quando è arrivato: «oggi alle 17:29», «ieri alle 9:05», «8 ottobre» o, di un altro anno, «8 ottobre 2025». */
export function commentDate(iso: string, now: Date): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const day = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  const time = date.toLocaleTimeString('it-IT', { hour: 'numeric', minute: '2-digit' })
  const days = Math.round((day(now) - day(date)) / 86_400_000)
  if (days === 0) return `oggi alle ${time}`
  if (days === 1) return `ieri alle ${time}`
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: date.getFullYear() === now.getFullYear() ? undefined : 'numeric',
  })
}

function commentItem(comment: PublicComment, now: Date): HTMLLIElement {
  return h(
    'li',
    { class: 'comment' },
    h(
      'div',
      { class: 'comment-head' },
      h('span', { class: comment.author ? 'comment-author' : 'comment-author is-anonymous' }, comment.author ?? 'Anonimo'),
      h('time', { attrs: { datetime: comment.created_at } }, commentDate(comment.created_at, now)),
    ),
    h('p', { class: 'comment-text' }, comment.message),
    comment.reply
      ? h('div', { class: 'comment-reply' }, h('span', { class: 'comment-reply-label' }, 'Risposta di chi fa Glifo'), h('p', {}, comment.reply))
      : null,
  )
}

export interface CommentsDeps {
  /** Per scrivere un commento (feedback.ts): sito, versione e, dentro claude.ai, perché non parte. */
  feedback: FeedbackDeps
  /** Dove i commenti non si leggono (dentro claude.ai): il motivo, al posto dell'elenco. */
  off?: string
  /** Per le prove. */
  load?: () => Promise<PublicComment[]>
  now?: () => Date
}

/** La scheda aperta l'ultima volta, finché la pagina resta aperta. */
let lastTab: FeedbackKind = 'problema'

export function openCommentsDialog(deps: CommentsDeps): HTMLDialogElement {
  const load = deps.load ?? (() => loadComments())
  let comments: PublicComment[] | null = null
  let state: { text: string; retry?: boolean } | null = null
  let ticket = 0

  const counts = new Map<FeedbackKind, HTMLElement>()
  const tabs = h(
    'div',
    { class: 'segmented comments-tabs', attrs: { role: 'radiogroup', 'aria-label': 'Quali commenti' } },
    TABS.map(({ kind, label }) => {
      const count = h('span', { class: 'comments-count' })
      counts.set(kind, count)
      return h(
        'label',
        {},
        h('input', {
          attrs: { type: 'radio', name: 'comments-tab', value: kind, checked: kind === lastTab },
          on: {
            change: () => {
              lastTab = kind
              render()
            },
          },
        }),
        h('span', {}, label, count),
      )
    }),
  )
  const body = h('div', { class: 'comments-body', attrs: { 'aria-live': 'polite' } })

  function render(): void {
    for (const { kind } of TABS) {
      const n = comments?.filter((c) => c.kind === kind).length
      counts.get(kind)!.textContent = n === undefined ? '' : String(n)
    }
    if (state || !comments) {
      body.replaceChildren(h('p', { class: 'comments-state' }, state?.text ?? 'Carico i commenti…'))
      if (state?.retry) body.append(h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => refresh() } }, 'Riprova'))
      return
    }
    const tab = TABS.find((t) => t.kind === lastTab)!
    const shown = comments.filter((c) => c.kind === tab.kind)
    const now = deps.now?.() ?? new Date()
    body.replaceChildren(
      shown.length
        ? h('ol', { class: 'comments-list', attrs: { 'aria-label': tab.label } }, shown.map((c) => commentItem(c, now)))
        : h('p', { class: 'comments-state' }, tab.empty, ' Se hai qualcosa da dire, scrivilo tu.'),
    )
    if (comments.length >= COMMENTS_MAX) body.append(h('p', { class: 'comments-more' }, `Qui ci sono i ${COMMENTS_MAX} commenti più recenti.`))
  }

  function refresh(): void {
    const mine = ++ticket
    state = null
    comments = null
    render()
    load().then(
      (list) => {
        if (mine !== ticket) return
        comments = list
        render()
      },
      (err: unknown) => {
        if (mine !== ticket) return
        state = { text: err instanceof CommentsError ? err.message : 'Non riesco a caricare i commenti: riprova tra poco.', retry: true }
        render()
      },
    )
  }

  function write(): void {
    openFeedbackDialog({
      ...deps.feedback,
      kind: lastTab,
      onSent: (row) => {
        deps.feedback.onSent?.(row)
        if (!row.visible || deps.off) return
        lastTab = row.kind
        tabs.querySelector<HTMLInputElement>(`input[value="${row.kind}"]`)!.checked = true
        refresh()
      },
    })
  }

  const dialog = dialogShell(
    'Commenti',
    [
      h('p', { class: 'comments-intro' }, 'Problemi, idee e altro da chi prova Glifo: guarda se qualcuno l\'ha già scritto, se no scrivilo tu.'),
      tabs,
      body,
      h(
        'div',
        { class: 'dialog-actions' },
        h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => dialog.close() } }, 'Chiudi'),
        h('button', { class: 'btn btn-primary comments-write', attrs: { type: 'button' }, on: { click: write } }, 'Scrivi un commento'),
      ),
    ],
    'dialog-comments',
  )
  if (deps.off) {
    state = { text: deps.off }
    render()
  } else refresh()
  dialog.showModal()
  return dialog
}
