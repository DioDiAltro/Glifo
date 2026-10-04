import 'katex/dist/katex.min.css'
import '../styles/app.css'
import { accountSpace, currentAccount } from '../account/space'
import { hydrateGraphs } from '../graph/preview'
import { renderMarkdown } from '../render/markdown'
import { hydrateSchemas } from '../schema/preview'
import { NotesStore } from '../store/notes'
import { loadSettings } from '../store/settings'
import { storageAvailable } from '../store/storage'
import { h, icon, ICONS } from '../ui/dom'
import { logoMark } from '../ui/logo'
import { leaveNotice } from '../ui/notice'
import { toast } from '../ui/toast'
import { readSharedNote, ShareReadError, snapshotWhen, tokenFromHash, type SharedNote } from './link'

/**
 * La pagina di una nota condivisa (nota.html#codice): la fotografia della nota in sola lettura,
 * anche senza account, e «Salva una copia» se chi l'ha condivisa lo consente. La nota è di
 * un'altra persona: il Markdown passa dalla pulizia più severa (renderMarkdown con `untrusted`).
 */

const settings = loadSettings()
const systemDark = window.matchMedia('(prefers-color-scheme: dark)')
const isDark = () => settings.theme === 'dark' || (settings.theme === 'auto' && systemDark.matches)
if (settings.theme !== 'auto') document.documentElement.dataset.theme = settings.theme

const title = h('h1', { class: 'shared-title' }, 'Nota condivisa')
const when = h('span', { class: 'shared-when' })
const saveButton = h(
  'button',
  { class: 'btn', attrs: { type: 'button', hidden: true }, on: { click: () => saveCopy() } },
  icon(ICONS.copy, 16),
  h('span', {}, 'Salva una copia'),
)
const status = h('div', { class: 'shared-status', attrs: { role: 'status', 'aria-live': 'polite' } }, 'Apro la nota…')
const body = h('article', { class: 'markdown-body shared-body', attrs: { 'aria-label': 'La nota condivisa', hidden: true } })

document.getElementById('app')!.replaceChildren(
  h(
    'header',
    { class: 'shared-top' },
    h(
      'a',
      { class: 'brand', attrs: { href: './', title: 'Apri Glifo' } },
      h('span', { class: 'brand-mark', attrs: { 'aria-hidden': 'true' }, html: logoMark() }),
      h('span', { class: 'brand-name' }, 'Glifo'),
    ),
    h('div', { class: 'shared-info' }, title, when),
    h('div', { class: 'shared-actions' }, saveButton, h('a', { class: 'btn btn-primary', attrs: { href: './' } }, 'Apri Glifo')),
  ),
  h('main', { class: 'shared-main' }, status, body),
  h(
    'footer',
    { class: 'shared-foot' },
    'È una fotografia della nota, condivisa con un link da chi l\'ha scritta. Glifo è un posto dove prendere appunti con le formule. ',
    h('a', { attrs: { href: './privacy.html' } }, 'Privacy'),
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
    ...(retry ? [h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => void load() } }, 'Riprova')] : []),
  )
  status.classList.add('is-problem')
}

async function load(): Promise<void> {
  status.classList.remove('is-problem')
  status.textContent = 'Apro la nota…'
  const token = tokenFromHash(location.hash)
  if (!token) return showProblem('Questo link non è completo: chiedi a chi te l\'ha mandato di copiarlo di nuovo.')
  try {
    note = await readSharedNote(token)
  } catch (err) {
    return showProblem(err instanceof ShareReadError ? err.message : 'Non è stato possibile aprire la nota: riprova tra poco.', true)
  }
  if (!note) {
    return showProblem('Questo link non funziona più: chi l\'ha condiviso l\'ha tolto, oppure ha eliminato la nota.')
  }
  const name = note.title || 'Nota condivisa'
  document.title = `${name} · Glifo`
  title.textContent = name
  when.textContent = `Fotografia ${snapshotWhen(note.updatedAt)}`
  saveButton.hidden = !note.allowCopy
  status.hidden = true
  body.hidden = false
  draw()
}

/** «Salva una copia»: una nota nuova tra i propri appunti (dell'account, se c'è), poi si apre Glifo. */
function saveCopy(): void {
  if (!note?.allowCopy) return
  if (!storageAvailable()) {
    toast('Questo browser non lascia salvare gli appunti (per esempio in una finestra anonima).', 'error')
    return
  }
  const account = currentAccount()
  const notes = account ? accountSpace(account.userId).notes : new NotesStore()
  const copy = notes.create(note.content)
  notes.activeId = copy.id
  leaveNotice(account ? 'Copia salvata tra i tuoi appunti: arriva anche nell\'account.' : 'Copia salvata tra i tuoi appunti, in questo browser.')
  location.href = './'
}

// Cambiando il tema del sistema (con il tema «automatico») si ridisegnano schemi e grafici.
systemDark.addEventListener('change', () => {
  if (settings.theme === 'auto') draw()
})
window.addEventListener('hashchange', () => void load())
void load()
