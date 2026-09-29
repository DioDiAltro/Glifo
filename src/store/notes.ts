import { readItem, readJson, removeItem, writeItem, writeJson } from './storage'

export interface NoteMeta {
  id: string
  title: string
  createdAt: number
  updatedAt: number
}

export interface Note extends NoteMeta {
  content: string
}

const INDEX_KEY = 'glifo.notes.v1'
const NOTE_PREFIX = 'glifo.note.v1.'
const ACTIVE_KEY = 'glifo.active.v1'

/** Titolo della nota: il primo titolo Markdown, altrimenti la prima riga. */
export function deriveTitle(content: string): string {
  const lines = content.split('\n')
  let inFence = false
  for (const raw of lines) {
    const line = raw.trim()
    if (/^(```|~~~)/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence || !line || line === '$$') continue
    const heading = /^#{1,6}\s+(.*?)\s*#*$/.exec(line)
    const text = (heading ? heading[1] : line)
      .replace(/[*_`~]/g, '')
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/^[-+>]\s*(\[[ xX]\]\s*)?/, '')
      .trim()
    if (text) return text.length > 60 ? `${text.slice(0, 57)}…` : text
  }
  return 'Senza titolo'
}

function newId(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

export class NotesStore {
  private index: NoteMeta[]

  constructor() {
    this.index = readJson<NoteMeta[]>(INDEX_KEY, [])
    // Scarta voci senza contenuto (es. salvataggi interrotti).
    this.index = this.index.filter((n) => readItem(NOTE_PREFIX + n.id) !== null)
  }

  /** Note dalla più recente alla meno recente. */
  list(): NoteMeta[] {
    return [...this.index].sort((a, b) => b.updatedAt - a.updatedAt)
  }

  get(id: string): Note | null {
    const meta = this.index.find((n) => n.id === id)
    if (!meta) return null
    return { ...meta, content: readItem(NOTE_PREFIX + id) ?? '' }
  }

  create(content = ''): Note {
    const now = Date.now()
    const note: Note = { id: newId(), title: deriveTitle(content), createdAt: now, updatedAt: now, content }
    this.index.push({ id: note.id, title: note.title, createdAt: now, updatedAt: now })
    this.persist(note.id, content)
    return note
  }

  /** Salva il contenuto; restituisce false se il browser ha rifiutato il salvataggio. */
  save(id: string, content: string): boolean {
    const meta = this.index.find((n) => n.id === id)
    if (!meta) return false
    meta.title = deriveTitle(content)
    meta.updatedAt = Date.now()
    return this.persist(id, content)
  }

  remove(id: string): void {
    this.index = this.index.filter((n) => n.id !== id)
    removeItem(NOTE_PREFIX + id)
    writeJson(INDEX_KEY, this.index)
  }

  get activeId(): string | null {
    return readItem(ACTIVE_KEY)
  }

  set activeId(id: string | null) {
    if (id) writeItem(ACTIVE_KEY, id)
    else removeItem(ACTIVE_KEY)
  }

  /** Tutte le note, per il backup. */
  exportAll(): Note[] {
    return this.list().map((m) => this.get(m.id)!)
  }

  private persist(id: string, content: string): boolean {
    const okContent = writeItem(NOTE_PREFIX + id, content)
    const okIndex = writeJson(INDEX_KEY, this.index)
    return okContent && okIndex
  }
}
