import { groupByFolder, loadClosedFolders, saveClosedFolders, type Folder, type FoldersStore } from '../store/folders'
import type { NoteMeta, NotesStore } from '../store/notes'
import { ICONS, clear, formatDate, h, icon } from './dom'
import { openMenu, type MenuEntry } from './menu'

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

/** Elenco degli appunti salvati nel browser, divisi per cartelle. */
export class NotesPanel {
  readonly el: HTMLElement
  private readonly list: HTMLElement
  private readonly filterInput: HTMLInputElement
  private activeId: string | null = null
  /** Le cartelle chiuse (ricordate su questo dispositivo). */
  private readonly closed = loadClosedFolders()

  constructor(private readonly deps: NotesPanelDeps) {
    this.filterInput = h('input', {
      class: 'notes-filter',
      attrs: { type: 'search', placeholder: 'Filtra gli appunti…', 'aria-label': 'Filtra gli appunti' },
      on: { input: () => this.refresh(this.activeId) },
    })
    this.list = h('ul', { class: 'notes-list', attrs: { role: 'list' } })
    this.el = h(
      'aside',
      { class: 'notes-panel', attrs: { 'aria-label': 'I tuoi appunti' } },
      h(
        'div',
        { class: 'notes-head' },
        h('h2', {}, 'Appunti'),
        h(
          'div',
          { class: 'notes-head-actions' },
          h(
            'button',
            {
              class: 'icon-button',
              title: 'Nuova cartella',
              attrs: { type: 'button', 'aria-label': 'Nuova cartella' },
              on: { click: () => deps.onCreateFolder() },
            },
            icon(ICONS.folderPlus),
          ),
          h(
            'button',
            { class: 'icon-button', title: 'Nuova nota', attrs: { type: 'button', 'aria-label': 'Nuova nota' }, on: { click: () => deps.onCreate() } },
            icon(ICONS.plus),
          ),
        ),
      ),
      this.filterInput,
      this.list,
      h(
        'div',
        { class: 'notes-foot' },
        h('button', { class: 'btn btn-small', attrs: { type: 'button' }, title: 'Apri uno o più file .md dal computer', on: { click: () => deps.onOpenFiles() } }, icon(ICONS.open, 14), 'Apri .md'),
        h('button', { class: 'btn btn-small', attrs: { type: 'button' }, title: 'Salva la nota come file .md (Ctrl+S)', on: { click: () => deps.onSaveFile() } }, icon(ICONS.download, 14), 'Salva .md'),
      ),
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
      this.list.append(h('li', { class: 'notes-empty' }, filtering ? 'Nessun appunto trovato.' : 'Nessun appunto.'))
      return
    }
    for (const g of groups) this.list.append(this.folderItem(g.folder, g.notes, filtering))
    for (const n of loose) this.list.append(this.noteItem(n))
  }

  private folderItem(folder: Folder, notes: NoteMeta[], filtering: boolean): HTMLLIElement {
    // Filtrando si vede tutto quello che corrisponde, anche nelle cartelle chiuse.
    const open = filtering || !this.closed.has(folder.id)
    const hasActive = notes.some((n) => n.id === this.activeId)
    const count = `${notes.length} ${notes.length === 1 ? 'nota' : 'note'}`
    const menuButton: HTMLButtonElement = h(
      'button',
      {
        class: 'icon-button folder-menu',
        title: 'Azioni della cartella',
        attrs: { type: 'button', 'aria-label': `Azioni della cartella ${folder.name}`, 'aria-haspopup': 'menu', 'aria-expanded': 'false' },
        on: {
          click: (ev) =>
            openMenu(
              menuButton,
              [
                { label: 'Nuova nota qui', run: () => this.deps.onCreate(folder.id) },
                { label: 'Rinomina', run: () => this.deps.onRenameFolder(folder.id) },
                'sep',
                { label: 'Elimina cartella', danger: true, run: () => this.deps.onDeleteFolder(folder.id) },
              ],
              `Cartella ${folder.name}`,
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
            title: open ? 'Chiudi la cartella' : 'Apri la cartella',
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
            notes.length ? notes.map((n) => this.noteItem(n)) : h('li', { class: 'notes-empty folder-empty' }, 'Cartella vuota'),
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
        title: 'Sposta in una cartella',
        attrs: { type: 'button', 'aria-label': `Sposta ${n.title} in una cartella`, 'aria-haspopup': 'menu', 'aria-expanded': 'false' },
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
        h('span', { class: 'note-date' }, formatDate(n.updatedAt)),
      ),
      moveButton,
      h(
        'button',
        {
          class: 'icon-button note-delete',
          title: 'Elimina',
          attrs: { type: 'button', 'aria-label': `Elimina ${n.title}` },
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
    if (current) entries.push({ label: 'Fuori dalle cartelle', run: () => this.deps.onMove(note.id, null) })
    if (entries.length) entries.push('sep')
    entries.push({ label: 'Nuova cartella…', run: () => this.deps.onCreateFolder(note.id) })
    openMenu(anchor, entries, `Sposta ${note.title}`, fromKeyboard)
  }

  private toggle(id: string): void {
    if (!this.closed.delete(id)) this.closed.add(id)
    saveClosedFolders(this.closed)
    this.refresh(this.activeId)
    // L'elenco è stato ridisegnato: il fuoco torna sulla cartella (utile da tastiera).
    for (const b of this.list.querySelectorAll<HTMLElement>('[data-folder]')) if (b.dataset.folder === id) b.focus()
  }
}
