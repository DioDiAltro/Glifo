import { texts } from '../i18n'
import { groupByFolder, loadClosedFolders, saveClosedFolders, type Folder, type FoldersStore } from '../store/folders'
import type { NoteMeta, NotesStore } from '../store/notes'
import { ICONS, clear, formatDate, h, icon } from './dom'
import { openMenu, type MenuEntry } from './menu'

const T = texts({
  filterPlaceholder: ['Filtra gli appunti…', 'Filter notes…'],
  filter: ['Filtra gli appunti', 'Filter notes'],
  openFilesTitle: ['Apri uno o più file .md dal computer', 'Open one or more .md files from your computer'],
  openFiles: ['Apri .md', 'Open .md'],
  saveFileTitle: ['Salva la nota come file .md (Ctrl+S)', 'Save the note as a .md file (Ctrl+S)'],
  saveFile: ['Salva .md', 'Save .md'],
  sidebar: ['Barra laterale', 'Sidebar'],
  notes: ['Appunti', 'Notes'],
  newFolder: ['Nuova cartella', 'New folder'],
  newNote: ['Nuova nota', 'New note'],
  noneFound: ['Nessun appunto trovato.', 'No notes found.'],
  none: ['Nessun appunto.', 'No notes.'],
  noteCount: (n: number) => [`${n} ${n === 1 ? 'nota' : 'note'}`, `${n} ${n === 1 ? 'note' : 'notes'}`],
  folderActions: ['Azioni della cartella', 'Folder actions'],
  folderActionsFor: (name: string) => [`Azioni della cartella ${name}`, `Actions for folder ${name}`],
  newNoteHere: ['Nuova nota qui', 'New note here'],
  rename: ['Rinomina', 'Rename'],
  deleteFolder: ['Elimina cartella', 'Delete folder'],
  folderMenu: (name: string) => [`Cartella ${name}`, `Folder ${name}`],
  collapseFolder: ['Chiudi la cartella', 'Collapse folder'],
  expandFolder: ['Apri la cartella', 'Expand folder'],
  emptyFolder: ['Cartella vuota', 'Empty folder'],
  moveToFolder: ['Sposta in una cartella', 'Move to a folder'],
  moveNoteToFolder: (title: string) => [`Sposta ${title} in una cartella`, `Move ${title} to a folder`],
  conflictTitle: [
    'La versione di questo dispositivo, tenuta quando la nota è cambiata anche su un altro',
    'The version from this device, kept when the note also changed on another one',
  ],
  conflict: ['copia in conflitto', 'conflicted copy'],
  delete: ['Elimina', 'Delete'],
  deleteNote: (title: string) => [`Elimina ${title}`, `Delete ${title}`],
  noFolder: ['Fuori dalle cartelle', 'No folder'],
  newFolderMenu: ['Nuova cartella…', 'New folder…'],
  moveNote: (title: string) => [`Sposta ${title}`, `Move ${title}`],
})

export interface NotesPanelDeps {
  store: NotesStore
  folders: FoldersStore
  onSelect(id: string): void
  /** Nuova nota: nella cartella indicata, altrimenti in quella della nota aperta. */
  onCreate(folderId?: string | null): void
  onDelete(id: string): void
  onMove(id: string, folderId: string | null): void
  /** Nuova cartella; se c'è `moveNoteId`, ci sposta subito quella nota. */
  onCreateFolder(moveNoteId?: string): void
  onRenameFolder(id: string): void
  onDeleteFolder(id: string): void
  onOpenFiles(): void
  onSaveFile(): void
}

/**
 * Elenco degli appunti salvati nel browser, divisi per cartelle. È il centro della barra laterale:
 * main.ts ci mette sopra il logo, in `foot` il pulsante «Condividi» e sotto l'account.
 */
export class NotesPanel {
  readonly el: HTMLElement
  /** La riga in fondo all'elenco: «Apri .md», «Salva .md» (e da main.ts l'icona di «Condividi»). */
  readonly foot: HTMLElement
  private readonly list: HTMLElement
  private readonly filterInput: HTMLInputElement
  private activeId: string | null = null
  /** Le cartelle chiuse (ricordate su questo dispositivo). */
  private readonly closed = loadClosedFolders()

  constructor(private readonly deps: NotesPanelDeps) {
    this.filterInput = h('input', {
      class: 'notes-filter',
      attrs: { type: 'search', placeholder: T.filterPlaceholder, 'aria-label': T.filter },
      on: { input: () => this.refresh(this.activeId) },
    })
    this.list = h('ul', { class: 'notes-list', attrs: { role: 'list' } })
    this.foot = h(
      'div',
      { class: 'notes-foot' },
      h('button', { class: 'btn btn-small', attrs: { type: 'button' }, title: T.openFilesTitle, on: { click: () => deps.onOpenFiles() } }, icon(ICONS.open, 14), T.openFiles),
      h('button', { class: 'btn btn-small', attrs: { type: 'button' }, title: T.saveFileTitle, on: { click: () => deps.onSaveFile() } }, icon(ICONS.download, 14), T.saveFile),
    )
    this.el = h(
      'aside',
      { class: 'notes-panel', attrs: { id: 'notes-panel', 'aria-label': T.sidebar } },
      h(
        'div',
        { class: 'notes-head' },
        h('h2', {}, T.notes),
        h(
          'div',
          { class: 'notes-head-actions' },
          h(
            'button',
            {
              class: 'icon-button',
              title: T.newFolder,
              attrs: { type: 'button', 'aria-label': T.newFolder },
              on: { click: () => deps.onCreateFolder() },
            },
            icon(ICONS.folderPlus),
          ),
          h(
            'button',
            { class: 'icon-button', title: T.newNote, attrs: { type: 'button', 'aria-label': T.newNote }, on: { click: () => deps.onCreate() } },
            icon(ICONS.plus),
          ),
        ),
      ),
      this.filterInput,
      this.list,
      this.foot,
    )
  }

  refresh(activeId: string | null): void {
    // Quando si apre un'altra nota, la sua cartella si apre: così la si vede nell'elenco.
    if (activeId && activeId !== this.activeId) {
      const folderId = this.deps.store.meta(activeId)?.folderId
      if (folderId && this.closed.delete(folderId)) saveClosedFolders(this.closed)
    }
    this.activeId = activeId
    const filter = this.filterInput.value
    const filtering = filter.trim() !== ''
    const { groups, loose } = groupByFolder(this.deps.store.list(), this.deps.folders.list(), filter)
    clear(this.list)
    if (!groups.length && !loose.length) {
      this.list.append(h('li', { class: 'notes-empty' }, filtering ? T.noneFound : T.none))
      return
    }
    for (const g of groups) this.list.append(this.folderItem(g.folder, g.notes, filtering))
    for (const n of loose) this.list.append(this.noteItem(n))
  }

  private folderItem(folder: Folder, notes: NoteMeta[], filtering: boolean): HTMLLIElement {
    // Filtrando si vede tutto quello che corrisponde, anche nelle cartelle chiuse.
    const open = filtering || !this.closed.has(folder.id)
    const hasActive = notes.some((n) => n.id === this.activeId)
    const count = T.noteCount(notes.length)
    const menuButton: HTMLButtonElement = h(
      'button',
      {
        class: 'icon-button folder-menu',
        title: T.folderActions,
        attrs: { type: 'button', 'aria-label': T.folderActionsFor(folder.name), 'aria-haspopup': 'menu', 'aria-expanded': 'false' },
        on: {
          click: (ev) =>
            openMenu(
              menuButton,
              [
                { label: T.newNoteHere, run: () => this.deps.onCreate(folder.id) },
                { label: T.rename, run: () => this.deps.onRenameFolder(folder.id) },
                'sep',
                { label: T.deleteFolder, danger: true, run: () => this.deps.onDeleteFolder(folder.id) },
              ],
              T.folderMenu(folder.name),
              ev.detail === 0,
            ),
        },
      },
      icon(ICONS.more, 16),
    )
    return h(
      'li',
      { class: `folder${open ? ' is-open' : ''}${hasActive && !open ? ' has-active' : ''}` },
      h(
        'div',
        { class: 'folder-head' },
        h(
          'button',
          {
            class: 'folder-toggle',
            title: open ? T.collapseFolder : T.expandFolder,
            data: { folder: folder.id },
            attrs: { type: 'button', 'aria-expanded': String(open), 'aria-label': `${folder.name}, ${count}` },
            on: { click: () => this.toggle(folder.id) },
          },
          icon(ICONS.chevron, 14),
          icon(ICONS.folder, 16),
          h('span', { class: 'folder-name' }, folder.name),
          h('span', { class: 'folder-count', attrs: { 'aria-hidden': 'true' } }, String(notes.length)),
        ),
        menuButton,
      ),
      open
        ? h(
            'ul',
            { class: 'folder-notes', attrs: { role: 'list' } },
            notes.length ? notes.map((n) => this.noteItem(n)) : h('li', { class: 'notes-empty folder-empty' }, T.emptyFolder),
          )
        : null,
    )
  }

  private noteItem(n: NoteMeta): HTMLLIElement {
    const active = n.id === this.activeId
    const moveButton: HTMLButtonElement = h(
      'button',
      {
        class: 'icon-button note-move',
        title: T.moveToFolder,
        attrs: { type: 'button', 'aria-label': T.moveNoteToFolder(n.title), 'aria-haspopup': 'menu', 'aria-expanded': 'false' },
        on: { click: (ev) => this.openMoveMenu(moveButton, n, ev.detail === 0) },
      },
      icon(ICONS.folderMove, 15),
    )
    return h(
      'li',
      { class: `note-item${active ? ' is-active' : ''}` },
      h(
        'button',
        {
          class: 'note-open',
          attrs: { type: 'button', 'aria-current': active ? 'true' : undefined },
          on: { click: () => this.deps.onSelect(n.id) },
        },
        h('span', { class: 'note-title' }, n.title),
        h(
          'span',
          { class: 'note-date' },
          formatDate(n.updatedAt),
          n.conflict
            ? h(
                'span',
                { class: 'note-badge', title: T.conflictTitle },
                T.conflict,
              )
            : null,
        ),
      ),
      moveButton,
      h(
        'button',
        {
          class: 'icon-button note-delete',
          title: T.delete,
          attrs: { type: 'button', 'aria-label': T.deleteNote(n.title) },
          on: { click: () => this.deps.onDelete(n.id) },
        },
        icon(ICONS.trash, 15),
      ),
    )
  }

  private openMoveMenu(anchor: HTMLButtonElement, note: NoteMeta, fromKeyboard: boolean): void {
    const current = this.deps.folders.get(note.folderId)?.id ?? null
    const entries: MenuEntry[] = this.deps.folders
      .list()
      .filter((f) => f.id !== current)
      .map((f) => ({ label: f.name, run: () => this.deps.onMove(note.id, f.id) }))
    if (current) entries.push({ label: T.noFolder, run: () => this.deps.onMove(note.id, null) })
    if (entries.length) entries.push('sep')
    entries.push({ label: T.newFolderMenu, run: () => this.deps.onCreateFolder(note.id) })
    openMenu(anchor, entries, T.moveNote(note.title), fromKeyboard)
  }

  private toggle(id: string): void {
    if (!this.closed.delete(id)) this.closed.add(id)
    saveClosedFolders(this.closed)
    this.refresh(this.activeId)
    // L'elenco è stato ridisegnato: il fuoco torna sulla cartella (utile da tastiera).
    for (const b of this.list.querySelectorAll<HTMLElement>('[data-folder]')) if (b.dataset.folder === id) b.focus()
  }
}
