import 'katex/dist/katex.min.css'
import './styles/app.css'
import { EditorSelection } from '@codemirror/state'
import welcomeNote from './welcome.md?raw'
import { MarkdownEditor } from './editor/editor'
import { deriveTitle, NotesStore, type Note } from './store/notes'
import { cleanFolderName, FOLDER_NAME_MAX, FoldersStore } from './store/folders'
import { addPersonalWord, DICTIONARY_KEY, loadPersonalWords, savePersonalWords } from './store/dictionary'
import {
  ACCOUNT_SETTINGS,
  accountSettings,
  isAccountSetting,
  loadSettings,
  saveSettings,
  SETTINGS_KEY,
  sharedSettings,
  validAccountSettings,
  type Settings,
  type ViewMode,
} from './store/settings'
import { downloadText, fileNameFor, openMarkdownFiles, saveMarkdownFile } from './store/files'
import { findSchemaBlock, findSchemaBlocks, schemaBlockAtLine, schemaBlockText } from './schema/blocks'
import { schemasForFile, schemasFromFile } from './schema/file'
import { parseSchema, SchemaError, serializeSchema, type Schema } from './schema/model'
import { loadPaneSizes, savePaneSizes } from './store/layout'
import { migrateKeyPrefix, storageAvailable } from './store/storage'
import { ICONS, h, icon } from './ui/dom'
import { confirmDialog, openHelpDialog, openSettingsDialog, promptDialog } from './ui/dialogs'
import { inClaudeViewer } from './host'
import { SpellClient } from './spell/client'
import type { SpellLanguage } from './spell/engine'
import { AccountSync } from './account/controller'
import {
  accountSpace,
  adoptGuestNotes,
  currentAccount,
  forgetAccount,
  guestNoteCount,
  knowsAccount,
  setCurrentAccount,
} from './account/space'
import { accountDataFile } from './account/export'
import {
  currentSession,
  deleteAccount as deleteAccountOnServer,
  loginDetails,
  sendCode,
  signInWithGoogle,
  signOut,
  supabaseBackendFor,
  verifyCode,
} from './account/supabase'
import { SyncError, type LocalChange } from './account/sync'
import { AccountButton, confirmAccountDeletion, openAccountDialog, openLoginDialog, type SignedIn } from './ui/account'
import { logoMark } from './ui/logo'
import { NotesPanel } from './ui/notesPanel'
import { Preview } from './ui/preview'
import { PaneResizer } from './ui/resize'
import { SidePanel } from './ui/sidePanel'
import { toast } from './ui/toast'
import { createToolbar } from './ui/toolbar'

// Il progetto si chiamava Matherdown: recupera gli appunti salvati con il vecchio nome.
migrateKeyPrefix('matherdown.', 'glifo.')

const settings: Settings = loadSettings()
// Con l'account le note stanno in uno spazio a parte, e gli appunti di prima restano dove sono.
const account = currentAccount()
const space = account ? accountSpace(account.userId) : null
const store = space?.notes ?? new NotesStore()
const folders = space?.folders ?? new FoldersStore()
const sync =
  account && space
    ? new AccountSync(account, {
        notes: store,
        folders,
        state: space.state,
        prefs: {
          read: () => accountSettings(settings),
          apply: (values) => updateSettings(validAccountSettings(values), true),
          words: () => loadPersonalWords(),
          applyWords: (words) => setPersonalWords(words, true),
        },
        hooks: { flush: () => flushSave(), changed: (change) => applyAccountChange(change) },
      })
    : null
/** La pagina si sta ricaricando (si entra o si esce dall'account): non si salva più niente. */
let unloading = false
const fileHandles = new Map<string, FileSystemFileHandle>()
const narrow = window.matchMedia('(max-width: 900px)')
/** Sotto questa larghezza l'elenco degli appunti si apre sopra l'editor. */
const notesOverlay = window.matchMedia('(max-width: 1250px)')

// ——— Nota attiva ———

/** Nell'account appena aperto: una nota vuota, che va all'account solo se la si scrive. */
const STARTER = '# Nuovi appunti\n\n'

function initialNote(): Note {
  if (!store.list().length) return account ? store.create(STARTER, null, { local: true }) : store.create(welcomeNote)
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

const accountButton = new AccountButton(() => openAccount())

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
    h('span', { class: 'brand-mark', attrs: { 'aria-hidden': 'true' }, html: logoMark() }),
    h('span', { class: 'brand-name' }, 'Glifo'),
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
    accountButton.el,
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
  onEditSchema: (line, source) => void openSchema(line, source),
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
  onEditSchema: (line, source) => void openSchema(line, source),
})
editor.setAutoWrap(settings.autoWrap)

// ——— Controllo ortografico ———

let spell: SpellClient | null = null
let spellKey = ''

/** Avvia, riavvia (se cambiano le lingue) o spegne il correttore secondo le impostazioni. */
function applySpellcheck(): void {
  const key = settings.spellcheck ? settings.spellLanguages : ''
  if (key === spellKey) return
  spellKey = key
  spell?.dispose()
  spell = null
  if (!settings.spellcheck) {
    editor.setSpellcheck(null)
    return
  }
  const languages: SpellLanguage[] = settings.spellLanguages === 'it+en' ? ['it', 'en'] : [settings.spellLanguages]
  const client = new SpellClient({
    languages,
    personal: loadPersonalWords(),
    onError: () => toast('Controllo ortografico non disponibile: non è stato possibile caricare il dizionario.', 'error'),
  })
  spell = client
  editor.setSpellcheck({
    client,
    addWord: (word) => {
      client.setPersonalWords(addPersonalWord(word))
      wordsChangedHere()
    },
  })
}

/** `fromAccount`: arrivate dall'account, quindi non vanno rimandate. */
function setPersonalWords(words: string[], fromAccount = false): string[] {
  const saved = savePersonalWords(words)
  spell?.setPersonalWords(saved)
  if (!fromAccount) wordsChangedHere()
  return saved
}

function wordsChangedHere(): void {
  if (!space || !sync) return
  space.state.wordsChanged()
  sync.schedule()
}

const sidePanel = new SidePanel({
  editor,
  settings: () => settings,
  openSettings: () => openSettings(),
  toast,
})

const notesPanel = new NotesPanel({
  store,
  folders,
  onSelect: (id) => switchTo(id),
  onCreate: (folderId) => createNote(undefined, folderId),
  onDelete: (id) => void deleteNote(id),
  onMove: (id, folderId) => moveNote(id, folderId),
  onCreateFolder: (moveNoteId) => void createFolder(moveNoteId),
  onRenameFolder: (id) => void renameFolder(id),
  onDeleteFolder: (id) => void deleteFolder(id),
  onOpenFiles: () => void openFiles(),
  onSaveFile: () => void saveToFile(),
})

const editorPane = h(
  'section',
  { class: 'editor-pane', attrs: { id: 'editor-pane' } },
  createToolbar(editor, { onSchema: () => void openSchema(null) }),
  editorHost,
)
const backdrop = h('div', { class: 'backdrop', on: { click: () => setPanels({ notesOpen: false, symbolsOpen: false }) } })
// I bordi tra le sezioni: trascinandoli se ne cambiano le misure, ricordate su questo dispositivo.
const resizer = new PaneResizer(
  { notes: notesPanel.el, editor: editorPane, preview: preview.el, symbols: sidePanel.el },
  loadPaneSizes(),
  (changes) => savePaneSizes(changes),
)
const workspace = h(
  'main',
  { class: 'workspace' },
  notesPanel.el,
  resizer.notesHandle,
  editorPane,
  resizer.splitHandle,
  preview.el,
  resizer.symbolsHandle,
  sidePanel.el,
  backdrop,
)
const app = h('div', { class: 'app' }, topbar, workspace)
document.getElementById('app')!.replaceWith(app)

preview.update(active.content, true)
notesPanel.refresh(active.id)
if (store.recovered) {
  toast(
    store.recovered === 1
      ? 'Recuperato un appunto che non compariva nell\'elenco'
      : `Recuperati ${store.recovered} appunti che non comparivano nell'elenco`,
  )
}

// ——— Impostazioni, tema e viste ———

function isDark(): boolean {
  return settings.theme === 'dark' || (settings.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
}

function applyTheme(): void {
  const root = document.documentElement
  if (settings.theme === 'auto') delete root.dataset.theme
  else root.dataset.theme = settings.theme
  themeButton.replaceChildren(icon(isDark() ? ICONS.sun : ICONS.moon))
  root.style.setProperty('--editor-font-size', `${settings.fontSize}px`)
  // Gli schemi hanno i colori del tema: si ridisegnano.
  preview.setTheme(isDark() ? 'dark' : 'light')
}

function toggleTheme(): void {
  updateSettings({ theme: isDark() ? 'light' : 'dark' })
}

/** `fromAccount`: arrivate dall'account, quindi non vanno rimandate. */
function updateSettings(next: Partial<Settings>, fromAccount = false): void {
  const changed = (Object.keys(next) as (keyof Settings)[]).filter((key) => settings[key] !== next[key])
  Object.assign(settings, next)
  saveSettings(next)
  applyTheme()
  editor.setAutoWrap(settings.autoWrap)
  applySpellcheck()
  const forAccount = changed.filter(isAccountSetting)
  if (!fromAccount && space && sync && forAccount.length) {
    space.state.settingsChanged(forAccount)
    sync.schedule()
  }
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
    personalWords: loadPersonalWords(),
    onPersonalWordsChange: (words) => setPersonalWords(words),
    onBackup: () => backup(),
    onRestore: () => void restore(),
    accountEmail: account?.email,
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
  if (unloading) return
  const content = editor.getDoc()
  if (content === active.content) {
    statusEl.textContent = 'Salvato'
    return
  }
  active.content = content
  const ok = store.save(active.id, content)
  active.title = deriveTitle(content)
  titleEl.textContent = active.title
  document.title = `${active.title} · Glifo`
  statusEl.textContent = ok ? 'Salvato' : 'Non salvato!'
  changedHere()
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

/** Dopo una modifica fatta qui: con l'account, fra poco si sincronizza. */
function changedHere(): void {
  sync?.schedule()
}

/** Carica una nota nell'editor (senza salvare quella precedente). */
function loadNote(id: string, focus = true): void {
  const note = store.get(id)
  if (!note) return
  active = note
  store.activeId = id
  editor.setDoc(note.content)
  preview.update(note.content, true)
  titleEl.textContent = note.title
  document.title = `${note.title} · Glifo`
  statusEl.textContent = 'Salvato'
  notesPanel.refresh(id)
  if (!focus) return
  if (notesOverlay.matches) setPanels({ notesOpen: false })
  editor.focus()
}

/** La cartella della nota aperta, se esiste ancora: le note nuove vanno lì. */
function currentFolderId(): string | null {
  return folders.get(store.meta(active.id)?.folderId)?.id ?? null
}

function createNote(content = '# Nuovi appunti\n\n', folderId = currentFolderId()): void {
  flushSave()
  const note = store.create(content, folderId)
  changedHere()
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
    message: account
      ? `«${note.title}» verrà eliminata da tutti i tuoi dispositivi. L'operazione non si può annullare.`
      : `«${note.title}» verrà eliminata da questo browser. L'operazione non si può annullare.`,
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
  changedHere()
  if (id === active.id) {
    const next = store.list()[0] ?? store.create('# Nuovi appunti\n\n')
    loadNote(next.id)
  }
  notesPanel.refresh(active.id)
}

// ——— Cartelle ———

function moveNote(id: string, folderId: string | null): void {
  store.move(id, folderId)
  changedHere()
  notesPanel.refresh(active.id)
}

/** Il problema del nome scelto per una cartella, oppure null se va bene. */
function folderNameProblem(name: string, exceptId?: string): string | null {
  if (!cleanFolderName(name)) return 'Scrivi un nome per la cartella.'
  if (folders.nameTaken(name, exceptId)) return 'C\'è già una cartella con questo nome.'
  return null
}

async function createFolder(moveNoteId?: string): Promise<void> {
  const name = await promptDialog({
    title: 'Nuova cartella',
    label: 'Nome della cartella',
    confirmLabel: 'Crea',
    maxLength: FOLDER_NAME_MAX,
    check: (value) => folderNameProblem(value),
  })
  if (name === null) return
  const folder = folders.create(name)
  if (!folder) {
    // Nel frattempo un'altra scheda ha creato una cartella con lo stesso nome.
    toast('C\'è già una cartella con questo nome.', 'error')
    return
  }
  if (moveNoteId) store.move(moveNoteId, folder.id)
  changedHere()
  notesPanel.refresh(active.id)
}

async function renameFolder(id: string): Promise<void> {
  const folder = folders.get(id)
  if (!folder) return
  const name = await promptDialog({
    title: 'Rinomina la cartella',
    label: 'Nome della cartella',
    confirmLabel: 'Rinomina',
    value: folder.name,
    maxLength: FOLDER_NAME_MAX,
    check: (value) => folderNameProblem(value, id),
  })
  if (name === null) return
  if (!folders.rename(id, name)) toast('C\'è già una cartella con questo nome.', 'error')
  changedHere()
  notesPanel.refresh(active.id)
}

async function deleteFolder(id: string): Promise<void> {
  const folder = folders.get(id)
  if (!folder) return
  const count = store.list().filter((n) => n.folderId === id).length
  const ok = await confirmDialog({
    title: 'Eliminare la cartella?',
    message:
      count === 0
        ? `La cartella «${folder.name}» è vuota.`
        : `La cartella «${folder.name}» verrà eliminata, ma ${count === 1 ? 'la sua nota resta' : `le sue ${count} note restano`}: ${count === 1 ? 'la trovi' : 'le trovi'} fuori dalle cartelle.`,
    confirmLabel: 'Elimina cartella',
    danger: true,
  })
  if (!ok) return
  // Prima si spostano le note e poi si toglie la cartella: nessuna nota resta in una cartella che non c'è.
  store.moveAll(id, null)
  folders.remove(id)
  changedHere()
  notesPanel.refresh(active.id)
}

// ——— Altre schede ———
// Glifo può essere aperto in più schede insieme, o nell'app installata e nel browser:
// quando un'altra salva, qui si aggiornano l'elenco, la nota aperta, le impostazioni e il dizionario.

if (storageAvailable()) {
  window.addEventListener('storage', (ev) => {
    if (unloading) return
    // Un'altra scheda è entrata o uscita dall'account: si riparte con le note giuste. Si
    // controlla a ogni cambiamento, perché le note dell'account che si lascia spariscono
    // una alla volta, e qui non si deve ricreare niente al loro posto. Uscendo, quello che
    // non era ancora salvato qui resta fuori dall'account che si lascia.
    if (currentAccount()?.userId !== account?.userId) {
      if (!account) flushSave()
      reloadPage()
      return
    }
    // Senza chiave: un'altra scheda ha svuotato tutto.
    const key = ev.key
    if (key === null || store.ownsKey(key)) notesChangedElsewhere(key && store.noteIdOfKey(key), ev.newValue)
    if (key === null || folders.ownsKey(key)) {
      folders.reload()
      notesPanel.refresh(active.id)
    }
    if (key === null || key === SETTINGS_KEY) {
      Object.assign(settings, sharedSettings(loadSettings()))
      applyTheme()
      editor.setAutoWrap(settings.autoWrap)
      applySpellcheck()
    }
    if (key === null || key === DICTIONARY_KEY) spell?.setPersonalWords(loadPersonalWords())
  })
}

function notesChangedElsewhere(changedId: string | null, content: string | null): void {
  store.reload()
  const unsavedHere = editor.getDoc() !== active.content
  if (!store.get(active.id)) {
    // La nota aperta qui è stata eliminata altrove. Se qui ci sono modifiche non salvate
    // si salvano (la nota torna nell'elenco e il testo non si perde), altrimenti si passa a un'altra.
    if (unsavedHere) {
      flushSave()
    } else {
      const title = active.title
      fileHandles.delete(active.id)
      loadNote((store.list()[0] ?? store.create('# Nuovi appunti\n\n')).id)
      toast(`«${title}» è stata eliminata in un'altra finestra`)
    }
  } else if (changedId === active.id && content !== null && content !== active.content && !unsavedHere) {
    // Modificata altrove: si mostra il testo nuovo. Se qui ci sono modifiche non ancora salvate
    // restano queste, che vengono salvate tra un attimo.
    active.content = content
    active.title = deriveTitle(content)
    editor.applyExternalDoc(content)
    preview.update(content)
    titleEl.textContent = active.title
    document.title = `${active.title} · Glifo`
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

// ——— Schemi (stile draw.io) ———

let schemaOpen = false

/**
 * Apre l'editor degli schemi: per uno nuovo (dal pulsante della barra) o per quello del blocco
 * alla riga `line` (con quel testo: se intanto il testo prima è cambiato, lo si cerca vicino).
 * L'editor si carica solo adesso, con maxGraph.
 */
async function openSchema(line: number | null, source?: string): Promise<void> {
  if (schemaOpen) return
  let schema: Schema = { nodes: [], edges: [] }
  /** Il blocco nella nota: si ritrova dal suo testo, vicino a dove era. */
  let block: { source: string; from: number } | null = null
  let near = editor.view.state.selection.main.head
  if (line !== null) {
    const doc = editor.getDoc()
    let found = schemaBlockAtLine(doc, line)
    if (source !== undefined && found?.source !== source) {
      const lineStart = editor.view.state.doc.line(Math.min(editor.view.state.doc.lines, line + 1)).from
      found = findSchemaBlock(doc, source, lineStart)
    }
    if (!found) return
    try {
      schema = parseSchema(found.source)
    } catch (err) {
      toast(err instanceof SchemaError ? err.message : 'Questo schema non si può aprire.', 'error')
      return
    }
    block = { source: found.source, from: found.from }
    near = found.from
  }
  schemaOpen = true
  try {
    const { openSchemaEditor } = await import('./schema/editor')
    await openSchemaEditor({
      schema,
      theme: isDark() ? 'dark' : 'light',
      onSave: (next) => {
        block = saveSchemaBlock(block, near, next)
        if (block) near = block.from
      },
    })
  } catch {
    toast('L\'editor degli schemi non si è aperto: riprova.', 'error')
  } finally {
    schemaOpen = false
  }
  editor.focus()
}

/**
 * Mette lo schema nella nota: al posto del suo blocco o, se è nuovo, su righe sue dopo quella
 * del cursore. Uno schema senza forme toglie il blocco. È una modifica come le altre: Ctrl+Z
 * nel testo la annulla.
 */
function saveSchemaBlock(block: { source: string; from: number } | null, near: number, schema: Schema): { source: string; from: number } | null {
  const view = editor.view
  const doc = view.state.doc.toString()
  const json = serializeSchema(schema)
  const empty = schema.nodes.length === 0
  const current = block ? findSchemaBlock(doc, block.source, block.from) : null
  if (current) {
    if (empty) {
      const to = doc[current.to] === '\n' ? current.to + 1 : current.to
      view.dispatch({ changes: { from: current.from, to }, userEvent: 'delete' })
      return null
    }
    if (current.source !== json) view.dispatch({ changes: { from: current.contentFrom, to: current.contentTo, insert: json }, userEvent: 'input' })
    return { source: json, from: current.from }
  }
  if (empty) return null
  const line = view.state.doc.lineAt(Math.min(near, view.state.doc.length))
  const atEmptyLine = !line.text.trim()
  const from = atEmptyLine ? line.from : line.to
  const prefix = atEmptyLine ? '' : '\n\n'
  const insert = `${prefix}${schemaBlockText(json)}\n`
  view.dispatch({ changes: { from, insert }, selection: EditorSelection.cursor(from + insert.length), userEvent: 'input' })
  if (block) toast('Lo schema non era più al suo posto nella nota: l\'ho rimesso qui.')
  return { source: json, from: from + prefix.length }
}

// ——— File ———

async function openFiles(): Promise<void> {
  const files = await openMarkdownFiles()
  if (!files.length) return
  flushSave()
  let last: Note | null = null
  const folderId = currentFolderId()
  for (const f of files) {
    // Gli schemi salvati come immagini (vedi saveToFile) tornano blocchi da modificare.
    last = store.create(schemasFromFile(f.content), folderId)
    if (f.handle) fileHandles.set(last.id, f.handle)
  }
  changedHere()
  if (last) switchTo(last.id)
  toast(files.length === 1 ? `Aperto «${files[0].name}»` : `Aperti ${files.length} file`)
}

/**
 * Il testo per il file .md: ogni schema diventa un'immagine, così si vede anche in VS Code e
 * negli altri programmi (il suo JSON resta nel file, nascosto). Se maxGraph non si carica, il
 * file si salva lo stesso, con gli schemi come blocchi di codice.
 */
async function markdownForFile(text: string): Promise<string> {
  if (!findSchemaBlocks(text).length) return text
  try {
    const { schemaImage } = await import('./schema/graph')
    return schemasForFile(text, schemaImage)
  } catch {
    return text
  }
}

async function saveToFile(): Promise<void> {
  flushSave()
  const handle = fileHandles.get(active.id)
  const text = editor.getDoc()
  const result = await saveMarkdownFile(fileNameFor(active.title), () => markdownForFile(text), handle)
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
  const data = JSON.stringify(
    {
      app: 'glifo',
      version: 1,
      exportedAt: new Date().toISOString(),
      notes: store.exportAll(),
      folders: folders.list(),
      dictionary: loadPersonalWords(),
    },
    null,
    2,
  )
  const date = new Date().toISOString().slice(0, 10)
  void downloadText(`glifo-backup-${date}.json`, data, 'application/json')
}

async function restore(): Promise<void> {
  const input = h('input', { attrs: { type: 'file', accept: '.json,application/json' } })
  input.addEventListener('change', async () => {
    const file = input.files?.[0]
    if (!file) return
    try {
      const data = JSON.parse(await file.text()) as { notes?: { content?: unknown; folderId?: unknown }[]; folders?: unknown; dictionary?: unknown }
      const notes = (data.notes ?? []).filter((n): n is { content: string; folderId?: unknown } => typeof n.content === 'string')
      if (!notes.length) throw new Error('nessuna nota')
      flushSave()
      // Le cartelle del backup: si usano quelle che hanno già lo stesso nome, le altre si creano.
      const folderIds = new Map<string, string>()
      for (const f of Array.isArray(data.folders) ? (data.folders as { id?: unknown; name?: unknown }[]) : []) {
        if (typeof f?.id !== 'string' || typeof f.name !== 'string') continue
        const folder = folders.byName(f.name) ?? folders.create(f.name)
        if (folder) folderIds.set(f.id, folder.id)
      }
      for (const n of notes) store.create(n.content, (typeof n.folderId === 'string' && folderIds.get(n.folderId)) || null)
      if (Array.isArray(data.dictionary)) {
        setPersonalWords([...loadPersonalWords(), ...data.dictionary.filter((w): w is string => typeof w === 'string')])
      }
      changedHere()
      notesPanel.refresh(active.id)
      toast(`Ripristinati ${notes.length} appunti`)
    } catch {
      toast('Il file non sembra un backup di Glifo.', 'error')
    }
  })
  input.click()
}

// ——— Account ———

/** Cambiamenti arrivati dall'account (o nati da un conflitto): si aggiornano elenco e nota aperta. */
function applyAccountChange(change: LocalChange): void {
  folders.reload()
  for (const r of change.replaced) {
    const handle = fileHandles.get(r.from)
    if (handle) {
      fileHandles.set(r.to, handle)
      fileHandles.delete(r.from)
    }
    // Chi stava scrivendo continua sulla sua versione, che ora è una nota a parte.
    if (r.from === active.id) {
      const note = store.get(r.to)
      if (note) {
        active = note
        store.activeId = note.id
      }
    }
    if (r.conflict) {
      toast(`«${store.meta(r.to)?.title ?? 'Una nota'}» è cambiata anche su un altro dispositivo: ora ci sono tutte e due le versioni.`)
    }
  }
  for (const id of change.restored) {
    toast(`«${store.meta(id)?.title ?? 'Una nota'}» era stata eliminata qui, ma su un altro dispositivo è cambiata: è tornata tra gli appunti.`)
  }
  if (change.removed.includes(active.id)) {
    const title = active.title
    fileHandles.delete(active.id)
    loadNote((store.list()[0] ?? store.create(STARTER, null, { local: true })).id, false)
    toast(`«${title}» è stata eliminata su un altro dispositivo`)
  } else if (change.updated.includes(active.id) || change.restored.includes(active.id)) {
    // Prima di cambiare le note si è salvato quello che c'era nell'editor: qui non c'è niente da perdere.
    const note = store.get(active.id)
    if (note && note.content !== active.content && editor.getDoc() === active.content) {
      active = note
      editor.applyExternalDoc(note.content)
      preview.update(note.content)
      titleEl.textContent = note.title
      document.title = `${note.title} · Glifo`
    }
  }
  dropStarter()
  notesPanel.refresh(active.id)
}

/** La nota vuota di partenza non serve più, se dall'account sono arrivate le altre. */
function dropStarter(): void {
  const meta = store.meta(active.id)
  if (!meta || meta.rev !== undefined || meta.dirty || editor.getDoc() !== STARTER || store.list().length < 2) return
  store.removeRemote(active.id)
  loadNote(store.list()[0].id, false)
}

function openAccount(): void {
  if (!account || !sync) {
    openLoginDialog({ sendCode, verifyCode, withGoogle: startGoogleSignIn, onSignedIn: (user) => completeSignIn(user) })
    return
  }
  openAccountDialog({
    email: account.email,
    status: sync.status,
    onStatus: (listener) => sync.onStatus(listener),
    syncNow: () => {
      flushSave()
      void sync.syncNow()
    },
    guestCount: guestNoteCount(welcomeNote),
    onAdoptGuest: () => {
      flushSave()
      const moved = adoptGuestNotes(account.userId, welcomeNote)
      store.reload()
      folders.reload()
      notesPanel.refresh(active.id)
      void sync.syncNow()
      return moved
    },
    onRelogin: () =>
      openLoginDialog({
        email: account.email,
        lockEmail: true,
        sendCode,
        verifyCode,
        withGoogle: startGoogleSignIn,
        onSignedIn: (user) => completeSignIn(user),
      }),
    onSignOut: () => void signOutAccount(),
    onDownload: () => downloadAccountData(),
    onDelete: () => void deleteAccount(),
  })
}

const OAUTH_KEY = 'glifo.oauth'

/** Accesso con Google: si salva tutto e si va sulla pagina di Google; al ritorno ci pensa il codice in fondo. */
async function startGoogleSignIn(): Promise<void> {
  flushSave()
  try {
    sessionStorage.setItem(OAUTH_KEY, 'google')
  } catch {
    /* senza sessionStorage al ritorno l'avviso sarà quello generico */
  }
  await signInWithGoogle()
}

/** Cosa dire se un'operazione sull'account non riesce (`action`: «scaricare i dati»…). */
function accountProblem(err: unknown, action: string): string {
  const kind = err instanceof SyncError ? err.kind : 'server'
  if (kind === 'offline') return `Per ${action} serve la connessione.`
  if (kind === 'auth') return `L'accesso è scaduto: accedi di nuovo, poi riprova a ${action}.`
  return `Non è stato possibile ${action}: riprova tra poco.`
}

/** «Scarica i miei dati»: prima si manda quello che manca, poi si scarica dal server tutto l'account. */
async function downloadAccountData(): Promise<void> {
  if (!account || !sync) return
  flushSave()
  await sync.syncNow()
  try {
    const data = await supabaseBackendFor(account.userId).pull(null)
    const login = await loginDetails().catch(() => undefined)
    const date = new Date().toISOString().slice(0, 10)
    await downloadText(`glifo-dati-account-${date}.json`, accountDataFile(data, account, login), 'application/json')
  } catch (err) {
    toast(accountProblem(err, 'scaricare i dati'), 'error')
  }
}

/** Elimina l'account sul server e poi, come uscendo, lo toglie da questo browser. */
async function deleteAccount(): Promise<void> {
  if (!account || !sync) return
  if (!(await confirmAccountDeletion({ email: account.email, onDownload: () => downloadAccountData() }))) return
  try {
    await deleteAccountOnServer(account.userId)
  } catch (err) {
    toast(accountProblem(err, 'eliminare l\'account'), 'error')
    return
  }
  unloading = true
  sync.stop()
  await signOut()
  setCurrentAccount(null)
  forgetAccount(account.userId)
  leaveNotice('Account eliminato: sul server non resta niente. Qui ci sono gli appunti fuori dall\'account.')
  reloadPage()
}

/** Accesso fatto: la prima volta in questo browser si chiede se portare nell'account gli appunti che ci sono. */
async function completeSignIn(user: SignedIn): Promise<void> {
  if (account?.userId === user.userId) {
    // Accesso rinnovato: si riprende a sincronizzare.
    void sync?.syncNow()
    return
  }
  flushSave()
  if (!knowsAccount(user.userId)) {
    const count = guestNoteCount(welcomeNote)
    const add =
      count > 0 &&
      (await confirmDialog({
        title: 'Aggiungere gli appunti di questo browser?',
        message:
          count === 1
            ? 'In questo browser c\'è un appunto. Vuoi aggiungerlo al tuo account? Così lo ritrovi anche sugli altri dispositivi.'
            : `In questo browser ci sono ${count} appunti. Vuoi aggiungerli al tuo account? Così li ritrovi anche sugli altri dispositivi.`,
        note: count === 1 ? 'Se lo lasci qui, lo ritrovi quando esci dall\'account.' : 'Se li lasci qui, li ritrovi quando esci dall\'account.',
        confirmLabel: count === 1 ? 'Aggiungilo all\'account' : 'Aggiungili all\'account',
        cancelLabel: 'No, lasciali qui',
      }))
    // Da qui la pagina si ricarica: niente deve tornare tra gli appunti di questo browser.
    unloading = true
    if (add) adoptGuestNotes(user.userId, welcomeNote)
    // Se l'account ha già delle impostazioni valgono quelle, altrimenti vanno all'account quelle di qui.
    accountSpace(user.userId).state.update(() => ({
      adopt: true,
      settingsDirty: [...ACCOUNT_SETTINGS],
      wordsDirty: loadPersonalWords().length > 0,
    }))
  }
  setCurrentAccount({ userId: user.userId, email: user.email })
  reloadPage()
}

async function signOutAccount(): Promise<void> {
  if (!account || !sync) return
  flushSave()
  await sync.syncNow()
  if (sync.hasPending()) {
    const ok = await confirmDialog({
      title: 'Uscire lo stesso?',
      message:
        'Alcune modifiche non sono ancora arrivate nell\'account, per esempio perché manca la connessione. Se esci ora, da questo browser si perdono.',
      confirmLabel: 'Esci lo stesso',
      cancelLabel: 'Resta',
      danger: true,
    })
    if (!ok) return
  }
  unloading = true
  sync.stop()
  await signOut()
  // Prima si esce e poi si tolgono le note: le altre schede se ne accorgono subito.
  setCurrentAccount(null)
  forgetAccount(account.userId)
  reloadPage()
}

const NOTICE_KEY = 'glifo.notice'

/** Un avviso da mostrare dopo aver ricaricato la pagina (resta solo in questa scheda). */
function leaveNotice(message: string): void {
  try {
    sessionStorage.setItem(NOTICE_KEY, message)
  } catch {
    /* sessionStorage non disponibile: niente avviso */
  }
}

function takeNotice(): string | null {
  try {
    const message = sessionStorage.getItem(NOTICE_KEY)
    sessionStorage.removeItem(NOTICE_KEY)
    return message
  } catch {
    return null
  }
}

/** Ricarica la pagina senza salvare più niente: le note giuste si caricano all'avvio. */
function reloadPage(): void {
  unloading = true
  sync?.stop()
  location.reload()
}

if (sync && account) {
  sync.onStatus((status) => accountButton.show({ email: account.email, status }))
  accountButton.show({ email: account.email, status: sync.status })
  sync.start()
}

// Un avviso lasciato prima di ricaricare la pagina (per esempio «account eliminato»).
const notice = takeNotice()
if (notice) toast(notice)

// Ritorno dal link nell'email o dalla pagina di Google.
if (/[?&#](code|access_token|error_description)=/.test(location.search + location.hash)) {
  const hadError = /error_description=/.test(location.search + location.hash)
  let viaGoogle = false
  try {
    viaGoogle = sessionStorage.getItem(OAUTH_KEY) === 'google'
    sessionStorage.removeItem(OAUTH_KEY)
  } catch {
    /* sessionStorage non disponibile */
  }
  void currentSession()
    .then((user) => {
      history.replaceState(null, '', location.pathname)
      // Il primo accesso, o un account diverso da quello aperto (per esempio un altro account
      // Google): si passa a quello. Le note dell'account di prima restano nel suo spazio.
      if (user && user.userId !== account?.userId) return completeSignIn(user)
      if (user) return void sync?.syncNow()
      // Il link vale solo nel browser in cui si è chiesta l'email (per esempio non sul
      // telefono, se l'ha chiesta il computer), e aprendolo si consuma.
      toast(
        viaGoogle
          ? 'L\'accesso con Google non è stato completato: riprova da «Accedi».'
          : hadError
            ? 'Il link per entrare non è valido o è già stato usato: chiedi un\'altra email da «Accedi».'
            : 'Il link va aperto nel browser in cui hai chiesto di entrare. Chiedi un\'altra email da lì: poi apri il link in quel browser, oppure copialo e incollalo nella finestra di Glifo.',
        'error',
      )
    })
    .catch(() => toast('Non è stato possibile completare l\'accesso: riprova da «Accedi».', 'error'))
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

document.title = `${active.title} · Glifo`
// Su telefoni e tablet non apriamo la tastiera appena si carica la pagina.
if (window.matchMedia('(pointer: fine)').matches) editor.focus()
