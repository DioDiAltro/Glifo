import 'katex/dist/katex.min.css'
import '../styles/app.css'
import { accountSpace, currentAccount } from '../account/space'
import { hydrateGraphs } from '../graph/preview'
import { renderMarkdown } from '../render/markdown'
import { NEW_ORIGIN, relocationPhase } from '../relocation'
import { hydrateSchemas } from '../schema/preview'
import { NotesStore } from '../store/notes'
import { loadSettings } from '../store/settings'
import { storageAvailable } from '../store/storage'
import { h, icon, ICONS } from '../ui/dom'
import { logoMark } from '../ui/logo'
import { leaveNotice } from '../ui/notice'
import { toast } from '../ui/toast'
import { lang, rich, texts } from '../i18n'
import { readSharedNote, ShareReadError, snapshotWhen, tokenFromHash, type SharedNote } from './link'

const T = texts({
  sharedNote: ['Nota condivisa', 'Shared note'],
  saveCopy: ['Salva una copia', 'Save a copy'],
  opening: ['Apro la nota…', 'Opening the note…'],
  theSharedNote: ['La nota condivisa', 'The shared note'],
  openGlifo: ['Apri Glifo', 'Open Glifo'],
  footer: [
    'È una fotografia della nota, condivisa con un link da chi l\'ha scritta. Glifo è un posto dove prendere appunti con le formule. {privacy}',
    'This is a snapshot of the note, shared with a link by the person who wrote it. Glifo is a place to take notes with formulas. {privacy}',
  ],
  retry: ['Riprova', 'Try again'],
  incomplete: [
    'Questo link non è completo: chiedi a chi te l\'ha mandato di copiarlo di nuovo.',
    'This link is incomplete: ask the person who sent it to you to copy it again.',
  ],
  failed: ['Non è stato possibile aprire la nota: riprova tra poco.', 'Couldn\'t open the note: try again in a moment.'],
  gone: [
    'Questo link non funziona più: chi l\'ha condiviso l\'ha tolto, oppure ha eliminato la nota.',
    'This link no longer works: the person who shared it removed it, or deleted the note.',
  ],
  // `when`: quando è stata fatta (snapshotWhen, link.ts: «di oggi alle 10:32» / «from today at 10:32 AM»).
  snapshot: (when: string) => [`Fotografia ${when}`, `Snapshot ${when}`],
  noStorage: [
    'Questo browser non lascia salvare gli appunti (per esempio in una finestra anonima).',
    'This browser doesn\'t allow saving notes (for example in a private window).',
  ],
  savedAccount: ['Copia salvata tra i tuoi appunti: arriva anche nell\'account.', 'Copy saved to your notes: it will reach your account too.'],
  savedHere: ['Copia salvata tra i tuoi appunti, in questo browser.', 'Copy saved to your notes, in this browser.'],
})

/**
 * La pagina di una nota condivisa (nota.html#codice): la fotografia della nota in sola lettura,
 * anche senza account, e «Salva una copia» se chi l'ha condivisa lo consente. La nota è di
 * un'altra persona: il Markdown passa dalla pulizia più severa (renderMarkdown con `untrusted`).
 */

// Dal giorno del trasloco il vecchio indirizzo manda i link al nuovo: la nota è la stessa, perché sta
// nell'account di chi l'ha condivisa (src/relocation.ts).
if (relocationPhase(location.origin, new Date()) === 'moved') location.replace(`${NEW_ORIGIN}/nota.html${location.hash}`)

// La lingua della pagina, come nell'app (main.ts): nota.html è scritta in italiano.
document.documentElement.lang = lang
document.title = `${T.sharedNote} · Glifo`

const settings = loadSettings()
const systemDark = window.matchMedia('(prefers-color-scheme: dark)')
const isDark = () => settings.theme === 'dark' || (settings.theme === 'auto' && systemDark.matches)
if (settings.theme !== 'auto') document.documentElement.dataset.theme = settings.theme

const title = h('h1', { class: 'shared-title' }, T.sharedNote)
const when = h('span', { class: 'shared-when' })
const saveButton = h(
  'button',
  { class: 'btn', attrs: { type: 'button', hidden: true }, on: { click: () => saveCopy() } },
  icon(ICONS.copy, 16),
  h('span', {}, T.saveCopy),
)
const status = h('div', { class: 'shared-status', attrs: { role: 'status', 'aria-live': 'polite' } }, T.opening)
const body = h('article', { class: 'markdown-body shared-body', attrs: { 'aria-label': T.theSharedNote, hidden: true } })

document.getElementById('app')!.replaceChildren(
  h(
    'header',
    { class: 'shared-top' },
    h(
      'a',
      { class: 'brand', attrs: { href: './', title: T.openGlifo } },
      h('span', { class: 'brand-mark', attrs: { 'aria-hidden': 'true' }, html: logoMark() }),
      h('span', { class: 'brand-name' }, 'Glifo'),
    ),
    h('div', { class: 'shared-info' }, title, when),
    h('div', { class: 'shared-actions' }, saveButton, h('a', { class: 'btn btn-primary', attrs: { href: './' } }, T.openGlifo)),
  ),
  h('main', { class: 'shared-main' }, status, body),
  h(
    'footer',
    { class: 'shared-foot' },
    ...rich(T.footer, { privacy: h('a', { attrs: { href: './privacy.html' } }, 'Privacy') }),
  ),
)

let note: SharedNote | null = null

function draw(): void {
  if (!note) return
  body.innerHTML = renderMarkdown(note.content, { untrusted: true })
  // Il fondo su cui stanno schemi e grafici: quello della pagina (la nota è trasparente).
  const look = { theme: isDark() ? ('dark' as const) : ('light' as const), surface: getComputedStyle(document.body).backgroundColor }
  hydrateSchemas(body, look)
  hydrateGraphs(body, look)
}

function showProblem(message: string, retry = false): void {
  status.replaceChildren(
    h('p', {}, message),
    ...(retry ? [h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => void load() } }, T.retry)] : []),
  )
  status.classList.add('is-problem')
}

async function load(): Promise<void> {
  status.classList.remove('is-problem')
  status.textContent = T.opening
  const token = tokenFromHash(location.hash)
  if (!token) return showProblem(T.incomplete)
  try {
    note = await readSharedNote(token)
  } catch (err) {
    return showProblem(err instanceof ShareReadError ? err.message : T.failed, true)
  }
  if (!note) {
    return showProblem(T.gone)
  }
  const name = note.title || T.sharedNote
  document.title = `${name} · Glifo`
  title.textContent = name
  when.textContent = T.snapshot(snapshotWhen(note.updatedAt))
  saveButton.hidden = !note.allowCopy
  status.hidden = true
  body.hidden = false
  draw()
}

/** «Salva una copia»: una nota nuova tra i propri appunti (dell'account, se c'è), poi si apre Glifo. */
function saveCopy(): void {
  if (!note?.allowCopy) return
  if (!storageAvailable()) {
    toast(T.noStorage, 'error')
    return
  }
  const account = currentAccount()
  const notes = account ? accountSpace(account.userId).notes : new NotesStore()
  const copy = notes.create(note.content)
  notes.activeId = copy.id
  leaveNotice(account ? T.savedAccount : T.savedHere)
  location.href = './'
}

// Cambiando il tema del sistema (con il tema «automatico») si ridisegnano schemi e grafici.
systemDark.addEventListener('change', () => {
  if (settings.theme === 'auto') draw()
})
window.addEventListener('hashchange', () => void load())
void load()
