import { newId } from './ids'
import { readItem, readJson, removeItem, storageKeys, writeItem, writeJson } from './storage'

export interface NoteMeta {
  id: string
  title: string
  createdAt: number
  updatedAt: number
  /** La cartella che contiene la nota; assente o null: fuori da ogni cartella. */
  folderId?: string | null
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

/**
 * Gli id delle note create prima delle cartelle cominciano con l'ora di creazione (8 cifre
 * in base 36): serve a ridare una data alle note recuperate.
 */
function createdAtFromId(id: string): number | null {
  const time = parseInt(id.slice(0, 8), 36)
  return time > Date.UTC(2020, 0, 1) && time <= Date.now() ? time : null
}

/** La chiave di localStorage riguarda le note (l'elenco o il testo di una nota)? */
export function isNotesKey(key: string): boolean {
  return key === INDEX_KEY || key.startsWith(NOTE_PREFIX)
}

/** L'id della nota se la chiave è quella del suo testo, altrimenti null. */
export function noteIdOfKey(key: string): string | null {
  return key.startsWith(NOTE_PREFIX) ? key.slice(NOTE_PREFIX.length) || null : null
}

/**
 * Le note salvate nel browser. Glifo può essere aperto in più schede insieme (o nell'app
 * installata e nel browser): ogni modifica all'elenco parte da quello salvato, non dalla
 * copia della scheda, così nessuna scheda cancella il lavoro di un'altra.
 */
export class NotesStore {
  private index: NoteMeta[] = []
  /** Quante note sono tornate nell'elenco all'avvio (vedi `reload`). */
  readonly recovered: number

  constructor() {
    this.recovered = this.reload()
  }

  /**
   * Rilegge l'elenco salvato, che un'altra scheda può aver cambiato. Toglie le voci senza
   * testo (salvataggi interrotti) e rimette quelle che mancano ma il cui testo è ancora
   * salvato: le versioni di Glifo fino a settembre 2026, aperte in due schede, potevano
   * riscrivere l'elenco una sopra l'altra. Restituisce quante note ha recuperato.
   */
  reload(): number {
    const saved = new Set(storageKeys(NOTE_PREFIX).map((k) => k.slice(NOTE_PREFIX.length)).filter(Boolean))
    const stored = this.readIndex()
    const index = stored.filter((n) => saved.has(n.id))
    const known = new Set(index.map((n) => n.id))
    const now = Date.now()
    let recovered = 0
    for (const id of saved) {
      if (known.has(id)) continue
      const content = readItem(NOTE_PREFIX + id) ?? ''
      // In cima all'elenco, così si ritrovano subito.
      index.push({ id, title: deriveTitle(content), createdAt: createdAtFromId(id) ?? now, updatedAt: now })
      recovered++
    }
    this.index = index
    if (recovered || index.length !== stored.length) writeJson(INDEX_KEY, index)
    return recovered
  }

  /** Note dalla più recente alla meno recente. */
  list(): NoteMeta[] {
    return [...this.index].sort((a, b) => b.updatedAt - a.updatedAt)
  }

  /** I dati della nota senza il testo. */
  meta(id: string): NoteMeta | null {
    return this.index.find((n) => n.id === id) ?? null
  }

  get(id: string): Note | null {
    const meta = this.index.find((n) => n.id === id)
    const content = meta ? readItem(NOTE_PREFIX + id) : null
    return meta && content !== null ? { ...meta, content } : null
  }

  create(content = '', folderId: string | null = null): Note {
    const now = Date.now()
    const note: Note = { id: newId(), title: deriveTitle(content), createdAt: now, updatedAt: now, folderId, content }
    // Prima il testo e poi l'elenco: chi legge a metà vede una nota da recuperare, non una voce vuota.
    writeItem(NOTE_PREFIX + note.id, content)
    this.change((index) => [...index, { id: note.id, title: note.title, createdAt: now, updatedAt: now, folderId }])
    return note
  }

  /** Salva il contenuto; restituisce false se il browser ha rifiutato il salvataggio. */
  save(id: string, content: string): boolean {
    const now = Date.now()
    const title = deriveTitle(content)
    const okContent = writeItem(NOTE_PREFIX + id, content)
    const okIndex = this.change((index) => {
      if (index.some((n) => n.id === id)) return index.map((n) => (n.id === id ? { ...n, title, updatedAt: now } : n))
      // Eliminata in un'altra scheda mentre qui la si stava scrivendo: torna nell'elenco,
      // così il testo appena scritto non va perso.
      const known = this.index.find((n) => n.id === id)
      const createdAt = known?.createdAt ?? createdAtFromId(id) ?? now
      return [...index, { id, title, createdAt, updatedAt: now, folderId: known?.folderId ?? null }]
    })
    return okContent && okIndex
  }

  /** Sposta la nota in una cartella (null: fuori da ogni cartella). */
  move(id: string, folderId: string | null): void {
    this.change((index) => index.map((n) => (n.id === id ? { ...n, folderId } : n)))
  }

  /** Sposta tutte le note di una cartella, per esempio prima di eliminarla. */
  moveAll(from: string, to: string | null): void {
    this.change((index) => index.map((n) => (n.folderId === from ? { ...n, folderId: to } : n)))
  }

  remove(id: string): void {
    // Prima il testo e poi l'elenco: chi legge a metà non la scambia per una nota da recuperare.
    removeItem(NOTE_PREFIX + id)
    this.change((index) => index.filter((n) => n.id !== id))
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
    return this.list().flatMap((m) => this.get(m.id) ?? [])
  }

  /** L'elenco salvato, senza voci malformate o ripetute. */
  private readIndex(): NoteMeta[] {
    const raw = readJson<unknown>(INDEX_KEY, [])
    if (!Array.isArray(raw)) return []
    const seen = new Set<string>()
    return raw.filter((n): n is NoteMeta => {
      const id = typeof n === 'object' && n !== null ? (n as { id?: unknown }).id : undefined
      if (typeof id !== 'string' || seen.has(id)) return false
      seen.add(id)
      return true
    })
  }

  /** Cambia l'elenco partendo da quello salvato, che un'altra scheda può aver aggiornato. */
  private change(update: (index: NoteMeta[]) => NoteMeta[]): boolean {
    this.index = update(this.readIndex())
    return writeJson(INDEX_KEY, this.index)
  }
}
