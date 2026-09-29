import type { NotesStore } from '../store/notes'
import { ICONS, clear, formatDate, h, icon } from './dom'

export interface NotesPanelDeps {
  store: NotesStore
  onSelect(id: string): void
  onCreate(): void
  onDelete(id: string): void
  onOpenFiles(): void
  onSaveFile(): void
}

/** Elenco degli appunti salvati nel browser. */
export class NotesPanel {
  readonly el: HTMLElement
  private readonly list: HTMLElement
  private readonly filterInput: HTMLInputElement
  private activeId: string | null = null

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
          'button',
          { class: 'icon-button', title: 'Nuova nota', attrs: { type: 'button', 'aria-label': 'Nuova nota' }, on: { click: () => deps.onCreate() } },
          icon(ICONS.plus),
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
    this.activeId = activeId
    const filter = this.filterInput.value.trim().toLowerCase()
    clear(this.list)
    const notes = this.deps.store.list().filter((n) => !filter || n.title.toLowerCase().includes(filter))
    if (!notes.length) {
      this.list.append(h('li', { class: 'notes-empty' }, filter ? 'Nessun appunto trovato.' : 'Nessun appunto.'))
      return
    }
    for (const n of notes) {
      const active = n.id === activeId
      this.list.append(
        h(
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
        ),
      )
    }
  }
}
