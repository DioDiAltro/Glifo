import 'katex/dist/katex.min.css'
import './styles/app.css'
import { EditorSelection } from '@codemirror/state'
import welcomeNote from './welcome.md?raw'
import { MarkdownEditor } from './editor/editor'
import { deriveTitle, NotesStore, type Note } from './store/notes'
import { loadSettings, saveSettings, type Settings, type ViewMode } from './store/settings'
import { downloadText, fileNameFor, openMarkdownFiles, saveMarkdownFile } from './store/files'
import { storageAvailable } from './store/storage'
import { ICONS, h, icon } from './ui/dom'
import { confirmDialog, openHelpDialog, openSettingsDialog } from './ui/dialogs'
import { inClaudeViewer } from './host'
import { NotesPanel } from './ui/notesPanel'
import { Preview } from './ui/preview'
import { SidePanel } from './ui/sidePanel'
import { toast } from './ui/toast'
import { createToolbar } from './ui/toolbar'

const settings: Settings = loadSettings()
const store = new NotesStore()
const fileHandles = new Map<string, FileSystemFileHandle>()
const narrow = window.matchMedia('(max-width: 900px)')
/** Sotto questa larghezza l'elenco degli appunti si apre sopra l'editor. */
const notesOverlay = window.matchMedia('(max-width: 1250px)')

// ——— Nota attiva ———

function initialNote(): Note {
  if (!store.list().length) return store.create(welcomeNote)
  const id = store.activeId
  return (id && store.get(id)) || store.get(store.list()[0].id)!
}

let active: Note = initialNote()
store.activeId = active.id
let saveTimer = 0
let saveWarningShown = false

// ——— Struttura della pagina ———

const titleEl = h('span', { class: 'doc-title' }, active.title)
const statusEl = h('span', { class: 'doc-status', attrs: { 'aria-live': 'polite' } }, 'Salvato')

const viewButtons = new Map<ViewMode, HTMLButtonElement>()
const viewSwitch = h(
  'div',
  { class: 'view-switch', attrs: { role: 'radiogroup', 'aria-label': 'Vista' } },
  ([
    ['editor', 'Editor', ICONS.edit],
    ['split', 'Diviso', ICONS.split],
    ['preview', 'Anteprima', ICONS.eye],
  ] as const).map(([mode, label, paths]) => {
    const b = h(
      'button',
      {
        class: 'view-button',
        title: label,
        attrs: { type: 'button', role: 'radio', 'aria-label': label },
        on: { click: () => setView(mode) },
      },
      icon(paths, 16),
      h('span', { class: 'view-label' }, label),
    )
    viewButtons.set(mode, b)
    return b
  }),
)

const themeButton = h('button', {
  class: 'icon-button',
  title: 'Tema chiaro/scuro',
  attrs: { type: 'button', 'aria-label': 'Cambia tema' },
  on: { click: () => toggleTheme() },
})

const topbar = h(
  'header',
  { class: 'topbar' },
  h(
    'button',
    {
      class: 'icon-button',
      title: 'Mostra/nascondi gli appunti',
      attrs: { type: 'button', 'aria-label': 'Mostra o nascondi l\'elenco degli appunti' },
      on: { click: () => setPanels({ notesOpen: !settings.notesOpen }) },
    },
    icon(ICONS.sidebar),
  ),
  h(
    'div',
    { class: 'brand' },
    h('span', { class: 'brand-mark', attrs: { 'aria-hidden': 'true' } }, 'Σ'),
    h('span', { class: 'brand-name' }, 'Matherdown'),
  ),
  h('div', { class: 'doc-info' }, titleEl, statusEl),
  h('div', { class: 'topbar-spacer' }),
  viewSwitch,
  h(
    'div',
    { class: 'topbar-actions' },
    h(
      'button',
      { class: 'icon-button', title: 'Nuova nota', attrs: { type: 'button', 'aria-label': 'Nuova nota' }, on: { click: () => createNote() } },
      icon(ICONS.plus),
    ),
    h(
      'button',
      {
        class: 'icon-button hide-narrow',
        title: 'Stampa o salva in PDF',
        // Dentro claude.ai la stampa non è disponibile.
        attrs: { type: 'button', 'aria-label': 'Stampa o salva in PDF', hidden: inClaudeViewer() },
        on: { click: () => printNote() },
      },
      icon(ICONS.print),
    ),
    themeButton,
    h(
      'button',
      { class: 'icon-button', title: 'Come si usa', attrs: { type: 'button', 'aria-label': 'Guida' }, on: { click: () => openHelpDialog() } },
      icon(ICONS.help),
    ),
    h(
      'button',
      { class: 'icon-button', title: 'Impostazioni', attrs: { type: 'button', 'aria-label': 'Impostazioni' }, on: { click: () => openSettings() } },
      icon(ICONS.settings),
    ),
    h(
      'button',
      {
        class: 'icon-button symbols-toggle',
        title: 'Mostra/nascondi i simboli',
        attrs: { type: 'button', 'aria-label': 'Mostra o nascondi il pannello dei simboli' },
        on: { click: () => setPanels({ symbolsOpen: !settings.symbolsOpen }) },
      },
      icon(ICONS.panel),
      h('span', { class: 'symbols-toggle-label' }, 'Simboli'),
    ),
  ),
)

const editorHost = h('div', { class: 'editor-host' })
const preview = new Preview({
  onToggleTask: (line) => toggleTask(line),
  onJumpToLine: (line) => jumpToLine(line),
})

const editor = new MarkdownEditor(editorHost, active.content, {
  onDocChange: (doc) => {
    statusEl.textContent = 'Modifiche non salvate…'
    scheduleSave()
    preview.update(doc)
  },
  onScroll: (line, fraction) => {
    if (settings.view === 'split') preview.syncTo(line, fraction)
  },
  onSave: () => void saveToFile(),
  onFocusSearch: () => focusSymbolSearch(),
})
editor.setAutoWrap(settings.autoWrap)

const sidePanel = new SidePanel({
  editor,
  settings: () => settings,
  openSettings: () => openSettings(),
  toast,
})

const notesPanel = new NotesPanel({
  store,
  onSelect: (id) => switchTo(id),
  onCreate: () => createNote(),
  onDelete: (id) => void deleteNote(id),
  onOpenFiles: () => void openFiles(),
  onSaveFile: () => void saveToFile(),
})

const editorPane = h('section', { class: 'editor-pane' }, createToolbar(editor), editorHost)
const backdrop = h('div', { class: 'backdrop', on: { click: () => setPanels({ notesOpen: false, symbolsOpen: false }) } })
const workspace = h('main', { class: 'workspace' }, notesPanel.el, editorPane, preview.el, sidePanel.el, backdrop)
const app = h('div', { class: 'app' }, topbar, workspace)
document.getElementById('app')!.replaceWith(app)

preview.update(active.content, true)
notesPanel.refresh(active.id)

// ——— Impostazioni, tema e viste ———

function applyTheme(): void {
  const root = document.documentElement
  if (settings.theme === 'auto') delete root.dataset.theme
  else root.dataset.theme = settings.theme
  const dark = settings.theme === 'dark' || (settings.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  themeButton.replaceChildren(icon(dark ? ICONS.sun : ICONS.moon))
  root.style.setProperty('--editor-font-size', `${settings.fontSize}px`)
}

function toggleTheme(): void {
  const dark = settings.theme === 'dark' || (settings.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  updateSettings({ theme: dark ? 'light' : 'dark' })
}

function updateSettings(next: Partial<Settings>): void {
  Object.assign(settings, next)
  saveSettings(settings)
  applyTheme()
  editor.setAutoWrap(settings.autoWrap)
}

function setView(mode: ViewMode, focus = true): void {
  updateSettings({ view: mode })
  app.dataset.view = mode
  for (const [m, b] of viewButtons) b.setAttribute('aria-checked', String(m === mode))
  if (mode !== 'editor') preview.update(editor.getDoc(), true)
  if (mode === 'preview') (document.activeElement as HTMLElement | null)?.blur()
  else if (focus) editor.focus()
}

function setPanels(next: Partial<Pick<Settings, 'notesOpen' | 'symbolsOpen'>>): void {
  // Sugli schermi piccoli i pannelli si sovrappongono: uno alla volta.
  if (narrow.matches) {
    if (next.notesOpen) next.symbolsOpen = false
    if (next.symbolsOpen) next.notesOpen = false
  }
  updateSettings(next)
  app.classList.toggle('notes-open', settings.notesOpen)
  app.classList.toggle('symbols-open', settings.symbolsOpen)
}

function focusSymbolSearch(): void {
  if (!settings.symbolsOpen) setPanels({ symbolsOpen: true })
  sidePanel.focusSearch()
}

function openSettings(): void {
  openSettingsDialog({
    settings,
    onChange: (next) => updateSettings(next),
    onBackup: () => backup(),
    onRestore: () => void restore(),
  })
}

applyTheme()
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme)
if (notesOverlay.matches) settings.notesOpen = false
if (narrow.matches) {
  settings.symbolsOpen = false
  if (settings.view === 'split') settings.view = 'editor'
}
setPanels({})
setView(settings.view, false)

// ——— Salvataggio ———

function scheduleSave(): void {
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = window.setTimeout(flushSave, 500)
}

function flushSave(): void {
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = 0
  const content = editor.getDoc()
  if (content === active.content) {
    statusEl.textContent = 'Salvato'
    return
  }
  active.content = content
  const ok = store.save(active.id, content)
  active.title = deriveTitle(content)
  titleEl.textContent = active.title
  document.title = `${active.title} · Matherdown`
  statusEl.textContent = ok ? 'Salvato' : 'Non salvato!'
  if (!ok && !saveWarningShown) {
    saveWarningShown = true
    toast(
      storageAvailable()
        ? 'Spazio del browser esaurito: salva la nota come file .md per non perderla.'
        : 'Questo browser non permette di salvare: usa «Salva .md» per non perdere gli appunti.',
      'error',
    )
  }
  notesPanel.refresh(active.id)
}

window.addEventListener('beforeunload', () => flushSave())
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') flushSave()
})

// ——— Gestione delle note ———

function switchTo(id: string): void {
  if (id === active.id) {
    if (notesOverlay.matches) setPanels({ notesOpen: false })
    return
  }
  flushSave()
  loadNote(id)
}

/** Carica una nota nell'editor (senza salvare quella precedente). */
function loadNote(id: string): void {
  const note = store.get(id)
  if (!note) return
  active = note
  store.activeId = id
  editor.setDoc(note.content)
  preview.update(note.content, true)
  titleEl.textContent = note.title
  document.title = `${note.title} · Matherdown`
  statusEl.textContent = 'Salvato'
  notesPanel.refresh(id)
  if (notesOverlay.matches) setPanels({ notesOpen: false })
  editor.focus()
}

function createNote(content = '# Nuovi appunti\n\n'): void {
  flushSave()
  const note = store.create(content)
  switchTo(note.id)
  // Seleziona il titolo, così si può scrivere subito quello vero.
  if (content.startsWith('# Nuovi appunti')) {
    editor.view.dispatch({ selection: EditorSelection.single(2, 15) })
  }
}

async function deleteNote(id: string): Promise<void> {
  const note = store.get(id)
  if (!note) return
  const ok = await confirmDialog({
    title: 'Eliminare la nota?',
    message: `«${note.title}» verrà eliminata da questo browser. L'operazione non si può annullare.`,
    confirmLabel: 'Elimina',
    danger: true,
  })
  if (!ok) return
  if (id === active.id) {
    // Annulla un eventuale salvataggio in sospeso della nota eliminata.
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = 0
  } else {
    flushSave()
  }
  store.remove(id)
  fileHandles.delete(id)
  if (id === active.id) {
    const next = store.list()[0] ?? store.create('# Nuovi appunti\n\n')
    loadNote(next.id)
  }
  notesPanel.refresh(active.id)
}

function toggleTask(line: number): void {
  const doc = editor.view.state.doc
  if (line < 0 || line >= doc.lines) return
  const l = doc.line(line + 1)
  const m = /^(\s*(?:[-*+]|\d+[.)])\s+\[)([ xX])(\])/.exec(l.text)
  if (!m) return
  const pos = l.from + m[1].length
  editor.view.dispatch({ changes: { from: pos, to: pos + 1, insert: m[2] === ' ' ? 'x' : ' ' }, userEvent: 'input' })
}

function jumpToLine(line: number): void {
  if (settings.view === 'preview') setView('split')
  const doc = editor.view.state.doc
  const l = doc.line(Math.min(doc.lines, Math.max(1, line + 1)))
  editor.view.dispatch({ selection: EditorSelection.cursor(l.from), scrollIntoView: true })
  editor.focus()
}

// ——— File ———

async function openFiles(): Promise<void> {
  const files = await openMarkdownFiles()
  if (!files.length) return
  flushSave()
  let last: Note | null = null
  for (const f of files) {
    last = store.create(f.content)
    if (f.handle) fileHandles.set(last.id, f.handle)
  }
  if (last) switchTo(last.id)
  toast(files.length === 1 ? `Aperto «${files[0].name}»` : `Aperti ${files.length} file`)
}

async function saveToFile(): Promise<void> {
  flushSave()
  const handle = fileHandles.get(active.id)
  const result = await saveMarkdownFile(fileNameFor(active.title), editor.getDoc(), handle)
  if (result === null) return
  if (result) {
    fileHandles.set(active.id, result)
    toast(`Salvato su «${result.name}»`)
  } else {
    toast('File .md scaricato')
  }
}

function printNote(): void {
  preview.update(editor.getDoc(), true)
  window.print()
}

function backup(): void {
  flushSave()
  const data = JSON.stringify({ app: 'matherdown', version: 1, exportedAt: new Date().toISOString(), notes: store.exportAll() }, null, 2)
  const date = new Date().toISOString().slice(0, 10)
  void downloadText(`matherdown-backup-${date}.json`, data, 'application/json')
}

async function restore(): Promise<void> {
  const input = h('input', { attrs: { type: 'file', accept: '.json,application/json' } })
  input.addEventListener('change', async () => {
    const file = input.files?.[0]
    if (!file) return
    try {
      const data = JSON.parse(await file.text()) as { notes?: { content?: unknown }[] }
      const notes = (data.notes ?? []).filter((n): n is { content: string } => typeof n.content === 'string')
      if (!notes.length) throw new Error('nessuna nota')
      flushSave()
      for (const n of notes) store.create(n.content)
      notesPanel.refresh(active.id)
      toast(`Ripristinati ${notes.length} appunti`)
    } catch {
      toast('Il file non sembra un backup di Matherdown.', 'error')
    }
  })
  input.click()
}

// ——— Scorciatoie globali ———

window.addEventListener('keydown', (ev) => {
  // Se l'editor ha già gestito il tasto, non ripetere l'azione.
  if (ev.defaultPrevented) return
  const mod = ev.ctrlKey || ev.metaKey
  if (mod && !ev.shiftKey && !ev.altKey && ev.key.toLowerCase() === 'k') {
    ev.preventDefault()
    focusSymbolSearch()
  } else if (mod && !ev.shiftKey && !ev.altKey && ev.key.toLowerCase() === 's') {
    ev.preventDefault()
    void saveToFile()
  }
})

document.title = `${active.title} · Matherdown`
// Su telefoni e tablet non apriamo la tastiera appena si carica la pagina.
if (window.matchMedia('(pointer: fine)').matches) editor.focus()
