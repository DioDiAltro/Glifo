import 'katex/dist/katex.min.css'
import './styles/app.css'
import { redo, undo } from '@codemirror/commands'
import { EditorSelection } from '@codemirror/state'
import welcomeNote from './welcome.md?raw'
import { MarkdownEditor } from './editor/editor'
import { addToGraphBlock, formulaAtCursor, insertGraphBlock, setGraphLabels } from './editor/graphInsert'
import { blockMoveTransaction } from './editor/moveBlock'
import type { BlockKind, MoveDir } from './render/blockMove'
import { deriveTitle, noteIdsInBrowser, NotesStore, type Note } from './store/notes'
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
import { downloadText, fileNameFor, openMarkdownFiles, saveMarkdownFile, type OpenedFile } from './store/files'
import { findFencedBlocks, findSchemaBlock, findSchemaBlocks, schemaBlockAtLine, schemaBlockText } from './schema/blocks'
import { graphImagesFor, graphsForFile, graphsFromFile } from './graph/file'
import { remapGraphLines, renameGraphScope } from './graph/preview'
import { schemasForFile, schemasFromFile } from './schema/file'
import { parseSchema, SchemaError, serializeSchema, type Schema } from './schema/model'
import { findSheetBlock, findSheetBySource } from './spreadsheet/blocks'
import { dataRange } from './graph/tableGraph'
import { planRange } from './graph/planBlock'
import { sheetsForFile, sheetsFromFile } from './spreadsheet/file'
import { emptySheet, parseSheet, serializeSheet, sheetBlockText, type SheetModel } from './spreadsheet/model'
import { BLOCK_NAMES } from './ui/moveButtons'
import { loadPaneSizes, savePaneSizes } from './store/layout'
import { migrateKeyPrefix, storageAvailable } from './store/storage'
import { ICONS, h, icon } from './ui/dom'
import { confirmDialog, openHelpDialog, openSettingsDialog, openTouchLogDialog, promptDialog } from './ui/dialogs'
import { aiActivity } from './ui/aiActivity'
import { openCommentsDialog } from './ui/comments'
import { inClaudeViewer } from './host'
import { accountOffMessage, type Site } from './site'
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
  setSharedCopy,
  sharedLinks,
  shareNote,
  signInWithGoogle,
  signOut,
  supabaseBackendFor,
  unshareNote,
  verifyCode,
} from './account/supabase'
import { openShareDialog } from './share/dialog'
import { SyncError, type LocalChange } from './account/sync'
import { AccountButton, confirmAccountDeletion, openAccountDialog, openLoginDialog, type SignedIn } from './ui/account'
import { logoMark } from './ui/logo'
import { NotesPanel } from './ui/notesPanel'
import { Preview } from './ui/preview'
import { PaneResizer } from './ui/resize'
import { SidePanel, type PanelView } from './ui/sidePanel'
import { dismissToast, toast } from './ui/toast'
import { loadPart, PartNotLoaded, watchSiteUpdates } from './ui/siteUpdate'
import { leaveNotice, takeNotice } from './ui/notice'
import { createToolbar } from './ui/toolbar'
import { openTutorial, showTutorialHint, tutorialSeen } from './ui/tutorial'
import { Board } from './board/board'
import { touchLog } from './board/touchlog'
import { BoardStore } from './board/store'
import { newStrokeId } from './board/strokes'

/** Quale Glifo è (src/site.ts): nella build per claude.ai e sul sito di prova l'account è spento. */
declare const __GLIFO_SITE__: Site
/** La versione di Glifo (il commit pubblicato e quando, vedi vite.config.ts). */
declare const __GLIFO_VERSION__: string

// Il registro dei tocchi della lavagna, se era acceso, riprende da qui (src/board/touchlog.ts).
touchLog.resume()

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

/** A che punto è il salvataggio della nota aperta (sulla pagina, `data-save`: lo guardano le prove nel browser). */
function saveState(state: 'salvato' | 'da-salvare' | 'non-salvato'): void {
  document.documentElement.dataset.save = state
}
saveState('salvato')

const viewButtons = new Map<ViewMode, HTMLButtonElement>()
/** Le viste a parole, per il registro dei tocchi. */
const VIEW_NAMES: Record<ViewMode, string> = { editor: 'Editor', split: 'Diviso', preview: 'Anteprima', board: 'Lavagna' }
const viewSwitch = h(
  'div',
  { class: 'view-switch', attrs: { role: 'radiogroup', 'aria-label': 'Vista' } },
  ([
    ['editor', 'Editor', ICONS.edit],
    ['split', 'Diviso', ICONS.split],
    ['preview', 'Anteprima', ICONS.eye],
    ['board', 'Lavagna', ICONS.board],
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
// Nella build per claude.ai, dentro claude.ai (la demo e le prove della grafica, vedi CLAUDE.md) e
// sul sito di prova su Cloudflare Pages l'account è spento, così gli appunti veri non si toccano:
// Accedi e Condividi si vedono come sul sito, ma la finestra di accesso spiega che lì non si entra.
const accountOff = __GLIFO_SITE__ !== 'online' || inClaudeViewer()
const ACCOUNT_OFF = accountOffMessage(inClaudeViewer() ? 'claude' : __GLIFO_SITE__)

/**
 * Apre o chiude la barra laterale: è il logo, come nella barra laterale di Gemini, e sta nello
 * stesso punto da aperta (in cima alla barra) e da chiusa (sopra il testo).
 */
const sidebarToggle = (label: string, className: string) =>
  h('button', {
    class: `logo-toggle ${className}`,
    title: label,
    attrs: { type: 'button', 'aria-label': label, 'aria-controls': 'notes-panel' },
    on: { click: () => setPanels({ notesOpen: !settings.notesOpen }) },
    html: logoMark(),
  })
const sideOpen = sidebarToggle('Apri la barra laterale', 'side-open')

// Non c'è più una barra in alto. In cima alla barra laterale il logo e il nome, e subito sotto
// gli appunti; in fondo i pulsanti della nota, l'account e le impostazioni, come nell'app di Claude.
const sidebarTop = h('div', { class: 'side-top' }, sidebarToggle('Chiudi la barra laterale', 'side-close'), h('span', { class: 'brand-name' }, 'Glifo'))
// Accanto ad «Apri .md» e «Salva .md», in fondo all'elenco, solo con l'icona; da lì anche la
// stampa e il PDF.
const shareButton = h(
  'button',
  {
    class: 'btn btn-small share-button',
    title: 'Condividi la nota con un link, o stampala',
    attrs: { type: 'button', 'aria-label': 'Condividi' },
    on: { click: () => openShare() },
  },
  icon(ICONS.share, 15),
)

// In fondo, come nell'app di Claude: l'account, poi i «Commenti», «Come si usa» e le impostazioni
// (anche il tema). I commenti stanno qui, lontano dagli strumenti della nota.
const helpButton = h(
  'button',
  { class: 'icon-button side-help', title: 'Come si usa', attrs: { type: 'button', 'aria-label': 'Come si usa' }, on: { click: () => openGuide() } },
  icon(ICONS.help),
)
const feedbackButton = h(
  'button',
  {
    class: 'icon-button side-feedback',
    title: 'Commenti: leggi quelli di chi prova Glifo e scrivi il tuo',
    attrs: { type: 'button', 'aria-label': 'Commenti' },
    on: { click: () => openComments() },
  },
  icon(ICONS.message),
)
const sidebarBottom = h(
  'div',
  { class: 'side-profile' },
  accountButton.el,
  feedbackButton,
  helpButton,
  h(
    'button',
    { class: 'icon-button', title: 'Impostazioni', attrs: { type: 'button', 'aria-label': 'Impostazioni' }, on: { click: () => openSettings() } },
    icon(ICONS.settings),
  ),
)

const editorHost = h('div', { class: 'editor-host' })
const preview = new Preview({
  onToggleTask: (line) => toggleTask(line),
  onJumpToLine: (line) => jumpToLine(line),
  onEditSchema: (line, source) => void openSchema(line, source),
  onEditSheet: (line, hash) => void openSheet(line, { hash }),
  onAddToGraph: (line, text) => addToGraphBlock(editor.view, line, text),
  onGraphLabels: (line, labels) => setGraphLabels(editor.view, line, labels),
  onMoveBlock: (kind, line, hash, dir) => moveBlockInNote(kind, line, hash, dir),
  onUndo: (again) => void (again ? redo : undo)(editor.view),
  scope: () => active.id,
})

// La lavagna di ogni nota (src/board), per scrivere a mano: accanto al testo al posto
// dell'anteprima, o a tutto schermo. Resta su questo dispositivo, non va nella nota.
const boards = new BoardStore()
const board = new Board({
  store: boards,
  confirmClear: () =>
    confirmDialog({
      title: 'Pulire la lavagna?',
      message: 'Si cancella tutto quello che è scritto sulla lavagna di questa nota.',
      note: 'Se cambi idea, la freccia «Annulla» della lavagna (o Ctrl+Z) lo fa tornare.',
      confirmLabel: 'Pulisci',
      danger: true,
    }),
  openLog: () => openTouchLogDialog(),
  warn: (message) => toast(message, 'error'),
})

const editor = new MarkdownEditor(editorHost, active.content, {
  onDocChange: (doc) => {
    saveState('da-salvare')
    scheduleSave()
    preview.update(doc)
    warmEditors(doc)
  },
  onScroll: (line, fraction) => {
    if (settings.view === 'split') preview.syncTo(line, fraction)
  },
  onSave: () => void saveToFile(),
  onFocusSearch: () => focusSymbolSearch(),
  onEditSchema: (line, source) => void openSchema(line, source),
  onEditSheet: (line, source) => void openSheet(line, { source }),
  // Spostato uno schema o un grafico (anche con Annulla o Ripeti): gli slider dei grafici lo seguono, e
  // l'anteprima si ridisegna subito (uno slider che si muove da solo scriverebbe ancora alla riga di prima).
  onBlockMoved: (map) => {
    remapGraphLines(active.id, map)
    preview.update(editor.getDoc(), true)
  },
})
editor.setAutoWrap(settings.autoWrap)
// Dopo le frecce di schemi e grafici l'anteprima resta ferma; tornando all'editor lo segue di nuovo.
for (const type of ['pointerdown', 'wheel', 'keydown', 'touchstart'] as const) {
  editorHost.addEventListener(type, () => preview.release(), { capture: true, passive: true })
}

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
  isDark: () => isDark(),
  openSettings: () => openSettings(),
  toast,
  closePanel: () => setPanels({ symbolsOpen: false }),
  // Il pulsante ✨ si fa più sotto, con la barra: qui basta che ci sia quando l'AI comincia.
  aiActivity: { start: () => aiWork.start() },
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

const editorPane = h('section', { class: 'editor-pane', attrs: { id: 'editor-pane' } }, editorHost)

// Una riga sola sopra il testo, con i pulsanti volanti: a sinistra la barra laterale (quando è
// chiusa) e la formattazione, al centro le viste, a destra gli inserimenti e i simboli, vicino al
// loro pannello. Quanto ci sta lo decide `fitBar`.
// «Spiega con l'AI» (src/ui/aiPanel.ts): solo l'icona, dopo $$; il pannello va al posto dei simboli.
const aiToggle = h(
  'button',
  {
    class: 'tool ai-toggle',
    title: 'Spiega con l\'AI: scegli nella nota cosa farti spiegare',
    attrs: { type: 'button', 'aria-label': 'Spiega con l\'AI' },
    on: { mousedown: (ev) => ev.preventDefault(), click: () => togglePanel('ai') },
  },
  icon(ICONS.sparkles, 17),
)
// Mentre l'AI lavora il pulsante sfuma i colori; se finisce con il pannello AI che non si vede, un pallino.
const aiWork = aiActivity(aiToggle, () => settings.symbolsOpen && sidePanel.view === 'ai')
const tools = createToolbar(editor, { onSchema: () => void openSchema(null), onSheet: () => void openSheet(null), onGraph: () => insertGraph(), explain: aiToggle })
const floatTools = h('div', { class: 'float-tools' }, tools.format)
const floatRight = h(
  'div',
  { class: 'float-right' },
  tools.insert,
  h(
    'button',
    {
      class: 'icon-button float-button symbols-toggle',
      title: 'Mostra/nascondi i simboli',
      attrs: { type: 'button', 'aria-label': 'Mostra o nascondi il pannello dei simboli' },
      on: { click: () => togglePanel('symbols') },
    },
    icon(ICONS.panel),
    h('span', { class: 'symbols-toggle-label' }, 'Simboli'),
  ),
)
const floatBar = h(
  'div',
  { class: 'float-bar' },
  h('div', { class: 'float-left' }, sideOpen, floatTools),
  viewSwitch,
  floatRight,
)
const backdrop = h('div', { class: 'backdrop', on: { click: () => setPanels({ notesOpen: false, symbolsOpen: false }) } })
// I bordi tra le sezioni: trascinandoli se ne cambiano le misure, ricordate su questo dispositivo.
const resizer = new PaneResizer(
  { notes: notesPanel.el, editor: editorPane, preview: preview.el, board: board.el, symbols: sidePanel.el },
  loadPaneSizes(),
  (changes) => savePaneSizes(changes),
)
notesPanel.el.prepend(sidebarTop)
notesPanel.foot.append(shareButton)
notesPanel.el.append(sidebarBottom)
// Testo e anteprima (o la lavagna), con sopra i pulsanti volanti.
const content = h('div', { class: 'content' }, floatBar, editorPane, resizer.splitHandle, preview.el, board.el)

/** Le misure fisse della riga sopra il testo, in pixel. */
const BAR = {
  /** I margini della riga e gli spazi tra le sue tre parti. */
  gaps: 36,
  /** Le viste con le scritte e solo con le icone. */
  pill: { labels: 378, icons: 128 },
  /** Il pulsante dei simboli con la scritta e solo con l'icona. */
  symbols: { label: 100, icon: 40 },
  /** Il pulsante per riaprire la barra laterale, con lo spazio accanto. */
  sideOpen: 40,
}

/**
 * Quanto posto c'è nella riga sopra il testo. Largo: le viste al centro, con le scritte. Medio:
 * al centro, solo icone. Stretto: tutti i pulsanti della barra a sinistra (scorrono) e le viste a
 * destra, accanto ai simboli. Le viste stanno al centro se ai loro lati ci stanno la
 * formattazione (a sinistra) e gli inserimenti con i simboli (a destra).
 */
function fitBar(): void {
  const room = content.clientWidth - BAR.gaps
  const left = tools.format.scrollWidth + (settings.notesOpen ? 0 : BAR.sideOpen)
  const fits = (pill: number, symbols: number) => 2 * Math.max(left, tools.insert.scrollWidth + 6 + symbols) + pill <= room
  const fit = fits(BAR.pill.labels, BAR.symbols.label) ? 'wide' : fits(BAR.pill.icons, BAR.symbols.icon) ? 'medium' : 'narrow'
  floatBar.dataset.fit = fit
  if (fit === 'narrow' && tools.insert.parentElement !== floatTools) floatTools.append(tools.insert)
  if (fit !== 'narrow' && tools.insert.parentElement !== floatRight) floatRight.prepend(tools.insert)
}
new ResizeObserver(() => fitBar()).observe(content)
const workspace = h(
  'main',
  { class: 'workspace' },
  notesPanel.el,
  resizer.notesHandle,
  content,
  resizer.symbolsHandle,
  sidePanel.el,
  backdrop,
)
const app = h('div', { class: 'app' }, workspace)
app.dataset.panel = 'symbols'
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
  root.style.setProperty('--editor-font-size', `${settings.fontSize}px`)
  // Gli schemi e la lavagna hanno i colori del tema: si ridisegnano.
  preview.setTheme(isDark() ? 'dark' : 'light')
  board.setTheme(isDark() ? 'dark' : 'light')
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
  touchLog.add(`vista dell'app: ${VIEW_NAMES[mode]}`)
  updateSettings({ view: mode })
  app.dataset.view = mode
  for (const [m, b] of viewButtons) b.setAttribute('aria-checked', String(m === mode))
  fitBar()
  resizer.refresh()
  if (mode === 'board') board.show(active.id)
  else board.hide()
  // Nella vista divisa l'anteprima segue l'editor che scorre; nella vista Anteprima resta dov'è.
  preview.setFollow(mode === 'split')
  preview.release()
  if (mode === 'split' || mode === 'preview') preview.update(editor.getDoc(), true)
  if (mode === 'preview') (document.activeElement as HTMLElement | null)?.blur()
  // Sulla lavagna si scrive a mano: il fuoco va lì, e su tablet e telefono non si apre la tastiera.
  else if (mode === 'board') {
    if (focus) board.focus()
  } else if (focus) editor.focus()
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
  sidePanel.setOpen(settings.symbolsOpen)
  fitBar()
  aiShown()
}

/** Il pannello a destra mostra i simboli o «Spiega con l'AI»: il pulsante della vista che si vede lo chiude, l'altro cambia vista. */
function togglePanel(view: PanelView): void {
  if (settings.symbolsOpen && sidePanel.view === view) {
    setPanels({ symbolsOpen: false })
    return
  }
  showPanelView(view)
  if (!settings.symbolsOpen) setPanels({ symbolsOpen: true })
}

function showPanelView(view: PanelView): void {
  sidePanel.setView(view)
  app.dataset.panel = view
  aiShown()
}

/** Il pannello AI si vede (aperto, con la vista ✨): il pallino del pulsante se ne va. */
function aiShown(): void {
  if (settings.symbolsOpen && sidePanel.view === 'ai') aiWork.seen()
}

function focusSymbolSearch(): void {
  showPanelView('symbols')
  if (!settings.symbolsOpen) setPanels({ symbolsOpen: true })
  sidePanel.focusSearch()
}

/**
 * «Come si usa»: il tutorial, e da lì la guida con tutte le scorciatoie. `first`: si è aperto da
 * solo, la prima volta. Chiuso quello, o la guida, un fumetto dice dove si rivede.
 */
function openGuide(first = false): void {
  const pointToGuide = () => showTutorialHint({ help: helpButton, toggle: sideOpen })
  openTutorial({
    dark: isDark(),
    onShortcuts: () => openHelpDialog().addEventListener('close', pointToGuide),
    onClose: first ? pointToGuide : undefined,
  })
}

/** La pagina «Commenti» (src/ui/comments.ts): dentro claude.ai non si leggono e non partono. */
function openComments(): void {
  const inClaude = __GLIFO_SITE__ === 'claude' || inClaudeViewer()
  openCommentsDialog({
    off: inClaude ? 'Dentro claude.ai i commenti non si vedono: aprili dal sito di Glifo.' : undefined,
    feedback: {
      site: inClaude ? 'claude' : __GLIFO_SITE__,
      version: __GLIFO_VERSION__,
      off: inClaude ? 'Dentro claude.ai i messaggi non partono: mandalo dal sito di Glifo.' : undefined,
    },
  })
}

function openSettings(): void {
  openSettingsDialog({
    settings,
    onChange: (next) => updateSettings(next),
    personalWords: loadPersonalWords(),
    onPersonalWordsChange: (words) => setPersonalWords(words),
    onBackup: () => void backup(),
    onRestore: () => void restore(),
    accountEmail: account?.email,
  })
}

applyTheme()
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme)
// Le lavagne rimaste senza nota (eliminata in un'altra scheda, su un altro dispositivo, o uscendo
// dall'account) si tolgono. Solo se le note si leggono davvero dal browser: in memoria non ci sono tutte.
if (storageAvailable()) window.setTimeout(() => void boards.prune(noteIdsInBrowser).catch(() => {}), 2000)
if (notesOverlay.matches) settings.notesOpen = false
if (narrow.matches) {
  settings.symbolsOpen = false
  if (settings.view === 'split') settings.view = 'editor'
}
setPanels({})
setView(settings.view, false)
// La prima volta il tutorial (se nel frattempo non si è aperta un'altra finestra).
if (!tutorialSeen()) {
  window.setTimeout(() => {
    if (!document.querySelector('dialog[open]')) openGuide(true)
  }, 400)
}

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
    saveState('salvato')
    return
  }
  active.content = content
  const ok = store.save(active.id, content)
  active.title = deriveTitle(content)
  document.title = `${active.title} · Glifo`
  saveState(ok ? 'salvato' : 'non-salvato')
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
  warmEditors(note.content)
  // «Spiega con l'AI»: l'elenco è dell'altra nota, la spiegazione di prima non c'entra più.
  sidePanel.aiPanel.reset()
  // Un'altra nota: l'anteprima torna a seguire l'editor (dopo le frecce era rimasta ferma).
  preview.release()
  preview.update(note.content, true)
  if (settings.view === 'board') board.show(id)
  document.title = `${note.title} · Glifo`
  saveState('salvato')
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
  // Con la nota se ne va la sua lavagna.
  void boards.remove([id]).catch(() => {})
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

// ——— Grafici di funzione ———

/** Il pulsante «Grafico»: con il cursore su una funzione ($f(x) = …$) la disegna, se no prepara un blocco da scrivere. */
function insertGraph(): void {
  const formula = formulaAtCursor(editor.view)
  insertGraphBlock(editor.view, formula?.tex ?? null, formula?.to)
}

// ——— Spostare schemi e grafici (le frecce ↑ ↓ dell'anteprima, come le celle di Colab) ———

/**
 * Sposta lo schema o il grafico alla riga `line` (con l'impronta `hash`) oltre il blocco vicino: una
 * modifica del testo come le altre, che Ctrl+Z annulla in un passo. La riga dove è finito, o null.
 */
function moveBlockInNote(kind: BlockKind, line: number, hash: string, dir: MoveDir): number | null {
  const result = blockMoveTransaction(editor.view.state, line, hash, dir)
  if (!result.ok) {
    const what = BLOCK_NAMES[kind].The
    if (result.reason === 'structure') toast(`${what} non si può spostare da qui senza cambiare il resto della nota (per esempio due elenchi diventerebbero uno solo).`)
    else if (result.reason === 'guard') toast('Lo spostamento non è riuscito: la nota è rimasta com\'era.', 'error')
    // 'edge' e 'stale': niente da dire (in cima, in fondo, o l'anteprima si sta ridisegnando).
    return null
  }
  if (result.tr) editor.view.dispatch(result.tr)
  return result.move.line
}

// ——— Gli editor degli schemi e delle tabelle: si caricano solo quando servono ———

/**
 * Se un editor tarda ad arrivare (la prima volta che serve, con la rete occupata per esempio dal modello di
 * «Spiegami»), un avviso dice che lo si sta aprendo: prima il clic non mostrava niente e quelli dopo non
 * facevano niente. `done` lo toglie.
 */
function loadingEditor(what: string): { done: () => void } {
  let shown: HTMLElement | null = null
  const timer = window.setTimeout(() => (shown = toast(`Apro ${what}…`, 'info', { sticky: true })), 400)
  return {
    done: () => {
      clearTimeout(timer)
      if (shown) dismissToast(shown)
      shown = null
    },
  }
}

/**
 * Se la nota ha uno schema o una tabella, il suo editor si carica appena il browser è libero (8 ottobre
 * 2026): così «Modifica» lo apre subito anche con la rete occupata, e anche se intanto il sito si è
 * aggiornato e i file della versione vecchia non ci sono più (src/ui/siteUpdate.ts). Se non arriva, niente
 * avvisi: al clic ci riprova `loadPart`, che dice perché.
 */
const warmed = { schema: false, tabella: false }
function warmEditors(text: string): void {
  for (const kind of ['schema', 'tabella'] as const) {
    if (warmed[kind] || !navigator.onLine || !text.includes('```' + kind)) continue
    warmed[kind] = true
    const load = () => void (kind === 'schema' ? import('./schema/editor') : import('./spreadsheet/editor')).catch(() => {})
    // Safari non ha requestIdleCallback.
    if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(load, { timeout: 5000 })
    else setTimeout(load, 2000)
  }
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
  const loading = loadingEditor('l\'editor degli schemi')
  try {
    const { openSchemaEditor } = await loadPart(() => import('./schema/editor'), 'l\'editor degli schemi')
    loading.done()
    await openSchemaEditor({
      schema,
      theme: isDark() ? 'dark' : 'light',
      // Il titolo di adesso (quello salvato arriva un attimo dopo aver scritto).
      title: deriveTitle(editor.getDoc()),
      onSave: (next) => {
        block = saveSchemaBlock(block, near, next)
        if (block) near = block.from
      },
    })
  } catch (err) {
    if (!(err instanceof PartNotLoaded)) toast('L\'editor degli schemi non si è aperto: riprova.', 'error')
  } finally {
    loading.done()
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

// ——— Tabelle con le formule (come Excel) ———

let sheetOpen = false

/**
 * Apre l'editor delle tabelle: per una nuova (dal pulsante della barra) o per quella del blocco alla
 * riga `line`, con quel testo o quell'impronta (se intanto il testo prima è cambiato, la si cerca
 * vicino). L'editor si carica solo adesso.
 */
async function openSheet(line: number | null, match?: { source?: string; hash?: string }): Promise<void> {
  if (sheetOpen) return
  // Una tabella nuova ha l'intestazione: la prima riga con i titoli delle colonne.
  let sheet: SheetModel = { ...emptySheet(), header: true }
  /** Il blocco nella nota: si ritrova dal suo testo, vicino a dove era. */
  let block: { source: string; from: number } | null = null
  let near = editor.view.state.selection.main.head
  if (line !== null) {
    const found = findSheetBlock(editor.getDoc(), line, match)
    if (!found) return
    sheet = parseSheet(found.source)
    block = { source: found.source, from: found.from }
    near = found.from
  }
  sheetOpen = true
  const loading = loadingEditor('l\'editor delle tabelle')
  try {
    const { openSheetEditor } = await loadPart(() => import('./spreadsheet/editor'), 'l\'editor delle tabelle')
    loading.done()
    await openSheetEditor({
      sheet,
      onSave: (next) => {
        block = saveSheetBlock(block, near, next)
        if (block) near = block.from
      },
      onChart: (next, lines) => {
        block = saveSheetBlock(block, near, next)
        if (block) placeChart(block, lines)
      },
      title: active.title,
    })
  } catch (err) {
    if (!(err instanceof PartNotLoaded)) toast('L\'editor delle tabelle non si è aperto: riprova.', 'error')
  } finally {
    loading.done()
    sheetOpen = false
  }
  editor.focus()
}

/**
 * Mette la tabella nella nota: al posto del suo blocco o, se è nuova, su righe sue dopo quella del
 * cursore. Una tabella nuova vuota non si mette; svuotata, il blocco resta (la riga «Tabella · vuota»
 * si cancella come le altre). È una modifica come le altre: Ctrl+Z nel testo la annulla.
 */
function saveSheetBlock(block: { source: string; from: number } | null, near: number, sheet: SheetModel): { source: string; from: number } | null {
  const view = editor.view
  const doc = view.state.doc.toString()
  const source = serializeSheet(sheet)
  const current = block ? findSheetBySource(doc, block.source, block.from) : null
  if (current) {
    // Nella voce di un elenco le righe del blocco hanno il rientro della riga ```.
    const indent = /^[ \t]*/.exec(doc.slice(current.from))![0]
    const text = indent && source ? source.split('\n').map((l) => indent + l).join('\n') : source
    if (current.source !== text) {
      // Il blocco vuoto non ha righe dentro: si aggiunge anche l'a capo, e svuotandolo lo si toglie.
      const empty = current.contentFrom === current.contentTo
      const changes = empty
        ? { from: current.contentFrom, insert: text ? `${text}\n` : '' }
        : { from: current.contentFrom, to: text ? current.contentTo : current.contentTo + 1, insert: text }
      view.dispatch({ changes, userEvent: 'input' })
      const updated = findSheetBySource(view.state.doc.toString(), text, current.from)
      return updated ? { source: updated.source, from: updated.from } : null
    }
    return { source: current.source, from: current.from }
  }
  if (!source) return null
  const line = view.state.doc.lineAt(Math.min(near, view.state.doc.length))
  const atEmptyLine = !line.text.trim()
  const from = atEmptyLine ? line.from : line.to
  const prefix = atEmptyLine ? '' : '\n\n'
  const insert = `${prefix}${sheetBlockText(source)}\n`
  view.dispatch({ changes: { from, insert }, selection: EditorSelection.cursor(from + insert.length), userEvent: 'input' })
  if (block) toast('La tabella non era più al suo posto nella nota: l\'ho rimessa qui.')
  return { source, from: from + prefix.length }
}

/** Che grafico di una tabella è un blocco: dei dati (riga dati:), il Gantt o il reticolo; null se è altro. */
function tableChartKind(source: string): 'dati' | 'gantt' | 'reticolo' | null {
  return planRange(source)?.kind ?? (dataRange(source) !== null ? 'dati' : null)
}

/**
 * Il grafico della tabella (`block`), con le righe `lines`, subito sotto di lei: un blocco ```grafico
 * nuovo o, se tra i grafici della tabella che la seguono ce n'è già uno dello stesso tipo (dei dati,
 * il Gantt o il reticolo), quello rifatto. Il nuovo va dopo quelli che ci sono.
 */
function placeChart(block: { source: string; from: number }, lines: string[]): void {
  const view = editor.view
  const doc = view.state.doc.toString()
  const table = findSheetBySource(doc, block.source, block.from)
  if (!table) return
  // Nella voce di un elenco il grafico ha il rientro della tabella.
  const indent = /^[ \t]*/.exec(doc.slice(table.from))![0]
  const body = lines.map((l) => indent + l).join('\n')
  const kind = tableChartKind(lines.join('\n'))
  let end = table.to
  for (const next of findFencedBlocks(doc, 'grafico').filter((g) => g.from >= table.to)) {
    const nextKind = tableChartKind(next.source)
    if (!next.closed || doc.slice(end, next.from).trim() || !nextKind) break
    if (nextKind === kind) {
      view.dispatch({ changes: { from: next.contentFrom, to: next.contentTo, insert: body }, selection: EditorSelection.cursor(next.contentFrom), scrollIntoView: true, userEvent: 'input' })
      return
    }
    end = next.to
  }
  const insert = `\n\n${indent}\`\`\`grafico\n${body}\n${indent}\`\`\``
  view.dispatch({ changes: { from: end, insert }, selection: EditorSelection.cursor(end + insert.length), scrollIntoView: true, userEvent: 'input' })
}

// ——— File ———

async function openFiles(): Promise<void> {
  const files = await openMarkdownFiles()
  if (!files.length) return
  flushSave()
  let last: Note | null = null
  const folderId = currentFolderId()
  const notes: string[] = []
  for (const f of files) {
    // Un file di Excel o un .csv diventa una nota con le sue tabelle.
    if (f.bytes || /\.(csv|tsv)$/i.test(f.name)) {
      const table = await tablesNote(f)
      if (!table) continue
      last = store.create(table.text, folderId)
      if (table.note) notes.push(table.note)
      continue
    }
    // Gli schemi e i grafici salvati come immagini e le tabelle salvate con i risultati (vedi
    // saveToFile) tornano blocchi da modificare.
    last = store.create(sheetsFromFile(graphsFromFile(schemasFromFile(f.content))), folderId)
    if (f.handle) fileHandles.set(last.id, f.handle)
  }
  changedHere()
  if (!last) return
  switchTo(last.id)
  toast([files.length === 1 ? `Aperto «${files[0].name}»` : `Aperti ${files.length} file`, ...notes].join('. '))
}

/**
 * La nota di un file di Excel (.xlsx) o .csv: il nome del file come titolo e una tabella con le
 * formule per ogni foglio che ha delle celle (con il suo nome, se sono più di uno). `note`: quello che
 * c'è da sapere (le formule rimaste valori, le righe lasciate fuori). Null se il file non si apre.
 */
async function tablesNote(f: OpenedFile): Promise<{ text: string; note?: string } | null> {
  try {
    const { baseName, xlsxSheets } = await loadPart(() => import('./spreadsheet/xlsx'), 'la parte che apre i file Excel')
    const block = (model: SheetModel) => sheetBlockText(serializeSheet(model))
    const title = `# ${baseName(f.name)}\n\n`
    if (!f.bytes) {
      const { csvToSheet } = await loadPart(() => import('./spreadsheet/csv'), 'la parte che apre i file .csv')
      const { model, cut } = csvToSheet(f.content)
      return { text: `${title}${block(model)}\n`, ...(cut && { note: 'Le righe in più sono rimaste fuori' }) }
    }
    const sheets = xlsxSheets(f.bytes).filter((sheet) => sheet.model.cells.length)
    if (!sheets.length) {
      toast(`«${f.name}» non ha celle da aprire.`, 'error')
      return null
    }
    const parts = sheets.map((sheet) => (sheets.length > 1 ? `## ${sheet.name}\n\n${block(sheet.model)}\n` : `${block(sheet.model)}\n`))
    const values = sheets.reduce((n, sheet) => n + sheet.valuesOnly, 0)
    const note = [
      values ? `${values === 1 ? 'Una formula usa' : `${values} formule usano`} funzioni o fogli che Glifo non ha: ${values === 1 ? 'resta il suo valore' : 'restano i loro valori'}` : '',
      sheets.some((sheet) => sheet.cut) ? 'Le righe in più sono rimaste fuori' : '',
    ].filter(Boolean).join('. ')
    return { text: title + parts.join('\n'), ...(note && { note }) }
  } catch (err) {
    if (!(err instanceof PartNotLoaded)) toast(err instanceof Error && err.name === 'XlsxError' ? err.message : `«${f.name}» non si riesce ad aprire.`, 'error')
    return null
  }
}

/**
 * Il testo per il file .md: ogni tabella diventa una tabella di Markdown con i risultati, ogni schema
 * e ogni grafico un'immagine, così si vedono anche in VS Code e negli altri programmi (il loro testo
 * resta nel file, nascosto). Se qualcosa non si riesce a disegnare (o maxGraph non si carica), il
 * file si salva lo stesso, con i blocchi di codice.
 */
async function markdownForFile(text: string): Promise<string> {
  // Le tabelle diventano tabelle di Markdown con i risultati (le formule restano nascoste nel file).
  let out = findFencedBlocks(text, 'tabella').length ? sheetsForFile(text) : text
  if (findFencedBlocks(out, 'grafico').length) {
    try {
      out = graphsForFile(out, graphImagesFor(out))
    } catch {
      // I grafici restano blocchi ```grafico.
    }
  }
  if (!findSchemaBlocks(out).length) return out
  try {
    const { schemaImage } = await import('./schema/graph')
    return schemasForFile(out, schemaImage)
  } catch {
    return out
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

async function backup(): Promise<void> {
  flushSave()
  const notes = store.exportAll()
  // Anche le lavagne con qualcosa scritto: stanno solo in questo browser.
  const drawings = await boards.exportBoards(notes.map((n) => n.id)).catch(() => [])
  const data = JSON.stringify(
    {
      app: 'glifo',
      version: 1,
      exportedAt: new Date().toISOString(),
      notes,
      folders: folders.list(),
      dictionary: loadPersonalWords(),
      ...(drawings.length ? { boards: drawings } : {}),
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
      const data = JSON.parse(await file.text()) as {
        notes?: { id?: unknown; content?: unknown; folderId?: unknown }[]
        folders?: unknown
        dictionary?: unknown
        boards?: unknown
      }
      const notes = (data.notes ?? []).filter((n): n is { id?: unknown; content: string; folderId?: unknown } => typeof n.content === 'string')
      if (!notes.length) throw new Error('nessuna nota')
      flushSave()
      // Le cartelle del backup: si usano quelle che hanno già lo stesso nome, le altre si creano.
      const folderIds = new Map<string, string>()
      for (const f of Array.isArray(data.folders) ? (data.folders as { id?: unknown; name?: unknown }[]) : []) {
        if (typeof f?.id !== 'string' || typeof f.name !== 'string') continue
        const folder = folders.byName(f.name) ?? folders.create(f.name)
        if (folder) folderIds.set(f.id, folder.id)
      }
      // Le note tornano con un id nuovo: le lavagne del backup vanno su quelle ricreate.
      const noteIds = new Map<string, string>()
      for (const n of notes) {
        const created = store.create(n.content, (typeof n.folderId === 'string' && folderIds.get(n.folderId)) || null)
        if (typeof n.id === 'string') noteIds.set(n.id, created.id)
      }
      for (const b of Array.isArray(data.boards) ? (data.boards as { note?: unknown }[]) : []) {
        const to = typeof b?.note === 'string' ? noteIds.get(b.note) : undefined
        if (to) await boards.importBoard(to, b, newStrokeId).catch(() => 0)
      }
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
    // La lavagna segue la nota che ha cambiato id; dopo un conflitto ce l'hanno tutte e due le versioni.
    void (r.conflict ? boards.copy(r.from, r.to) : boards.move(r.from, r.to)).catch(() => {})
    // Gli slider spostati vanno con chi scrive (in un conflitto, con la sua copia).
    renameGraphScope(r.from, r.to)
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
        preview.rescope()
      }
    }
    if (r.conflict) {
      toast(`«${store.meta(r.to)?.title ?? 'Una nota'}» è cambiata anche su un altro dispositivo: ora ci sono tutte e due le versioni.`)
    }
  }
  for (const id of change.restored) {
    toast(`«${store.meta(id)?.title ?? 'Una nota'}» era stata eliminata qui, ma su un altro dispositivo è cambiata: è tornata tra gli appunti.`)
  }
  if (change.removed.length) void boards.remove(change.removed).catch(() => {})
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
      document.title = `${note.title} · Glifo`
    }
  }
  dropStarter()
  if (settings.view === 'board') board.show(active.id)
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
  if (accountOff) {
    // La finestra si vede com'è sul sito, ma non si entra.
    const off = () => Promise.reject(new Error(ACCOUNT_OFF))
    openLoginDialog({ sendCode: off, verifyCode: off, withGoogle: off, onSignedIn: () => {} })
    return
  }
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
      const moved = adoptGuestNotes(account.userId, welcomeNote, (from, to) => void boards.move(from, to).catch(() => {}))
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

/** «Condividi»: la nota aperta con un link, una fotografia che si apre anche senza account (src/share). */
function openShare(): void {
  flushSave()
  const noteId = active.id
  const user = account
  openShareDialog({
    noteId,
    note: () => {
      const content = noteId === active.id ? editor.getDoc() : (store.get(noteId)?.content ?? '')
      return { title: deriveTitle(content), content }
    },
    server:
      user && sync
        ? {
            prepare: async () => {
              flushSave()
              await sync.syncNow()
            },
            get: async (id) => (await sharedLinks(user.userId, id))[0] ?? null,
            share: (note, allowCopy) => shareNote(user.userId, note, allowCopy),
            setCopy: (id, allowCopy) => setSharedCopy(user.userId, id, allowCopy),
            unshare: (id) => unshareNote(user.userId, id),
          }
        : null,
    onLogin: () => openAccount(),
    // Dentro claude.ai la stampa non è disponibile.
    onPrint: inClaudeViewer() ? undefined : () => printNote(),
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
    const links = await sharedLinks(account.userId)
    const date = new Date().toISOString().slice(0, 10)
    await downloadText(`glifo-dati-account-${date}.json`, accountDataFile(data, account, login, new Date(), links), 'application/json')
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
  await boards.remove(store.list().map((n) => n.id)).catch(() => {})
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
    // Le lavagne delle note che cambiano id le seguono, prima di ricaricare.
    const renamed: [string, string][] = []
    if (add) adoptGuestNotes(user.userId, welcomeNote, (from, to) => renamed.push([from, to]))
    await Promise.all(renamed.map(([from, to]) => boards.move(from, to).catch(() => {})))
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
  const pending = sync.hasPending()
  // Le lavagne stanno solo in questo browser, non nell'account: uscendo si tolgono con le note.
  const noteIds = store.list().map((n) => n.id)
  const drawn = await boards.drawn(noteIds).catch(() => 0)
  if (pending || drawn) {
    const ok = await confirmDialog({
      title: 'Uscire lo stesso?',
      message: [
        pending
          ? 'Alcune modifiche non sono ancora arrivate nell\'account, per esempio perché manca la connessione. Se esci ora, da questo browser si perdono.'
          : '',
        drawn === 1 ? 'La lavagna di una nota sta solo in questo browser, non nell\'account: uscendo si elimina.' : '',
        drawn > 1 ? `Le lavagne di ${drawn} note stanno solo in questo browser, non nell'account: uscendo si eliminano.` : '',
      ]
        .filter(Boolean)
        .join(' '),
      confirmLabel: 'Esci lo stesso',
      cancelLabel: 'Resta',
      danger: true,
    })
    if (!ok) return
  }
  unloading = true
  sync.stop()
  await boards.remove(noteIds).catch(() => {})
  await signOut()
  // Prima si esce e poi si tolgono le note: le altre schede se ne accorgono subito.
  setCurrentAccount(null)
  forgetAccount(account.userId)
  reloadPage()
}

/** Ricarica la pagina senza salvare più niente: le note giuste si caricano all'avvio. */
function reloadPage(): void {
  unloading = true
  sync?.stop()
  location.reload()
}

/** Ricarica per la versione nuova di Glifo (src/ui/siteUpdate.ts): questa volta la nota si salva prima. */
function reloadForUpdate(): void {
  flushSave()
  if (store.get(active.id)?.content !== editor.getDoc()) {
    toast('Prima salva la nota come file .md: il browser non ha più spazio per tenerla.', 'error')
    return
  }
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

// L'editor degli schemi o delle tabelle della nota aperta, pronto prima del clic.
warmEditors(active.content)
// Se il sito si aggiorna con la pagina aperta, Glifo lo dice, con «Ricarica» (dentro claude.ai non c'è un sito).
if (__GLIFO_SITE__ !== 'claude' && !inClaudeViewer()) watchSiteUpdates({ reload: reloadForUpdate, busy: () => schemaOpen || sheetOpen })

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
  // Esc chiude la lavagna a tutto schermo, anche se il fuoco non è lì.
  if (ev.key === 'Escape' && board.isFull && !document.querySelector('dialog[open]')) {
    ev.preventDefault()
    board.setFull(false)
  } else if (mod && !ev.shiftKey && !ev.altKey && ev.key.toLowerCase() === 'k') {
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
