import { DeletionLog, type Deletion } from './deletions'
import { isUuid, newId } from './ids'
import { readItem, readJson, removeItem, storageKeys, writeItem, writeJson } from './storage'

export interface NoteMeta {
  id: string
  title: string
  createdAt: number
  updatedAt: number
  /** La cartella che contiene la nota; assente o null: fuori da ogni cartella. */
  folderId?: string | null
  /** Con l'account: la versione dell'account da cui parte la copia di questo browser. */
  rev?: number
  /** Ci sono modifiche che l'account non ha ancora. */
  dirty?: boolean
  /** Tenuta dopo un conflitto: nell'elenco ha un'etichetta finché non la si modifica. */
  conflict?: boolean
}

export interface Note extends NoteMeta {
  content: string
}

/** Una nota come arriva dall'account. */
export interface RemoteNote {
  id: string
  content: string
  folderId: string | null
  createdAt: number
  updatedAt: number
  rev: number
}

export interface StoreOptions {
  /** Dove stanno le chiavi: '' per gli appunti senza account, 'u.<id>.' per quelli di un account. */
  space?: string
  /** Segna le note eliminate, da mandare all'account. */
  trackDeletions?: boolean
}

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

/** Le chiavi del testo delle note, senza account (`glifo.note.v1.<id>`) e negli account (`glifo.u.<utente>.note.v1.<id>`). */
const NOTE_KEY = /^glifo\.(?:u\.[^.]+\.)?note\.v1\.(.+)$/

/**
 * Gli id di tutte le note salvate in questo browser, con e senza account: una lavagna (src/board)
 * senza la sua nota si può togliere.
 */
export function noteIdsInBrowser(): Set<string> {
  const ids = new Set<string>()
  for (const key of storageKeys('glifo.')) {
    const m = NOTE_KEY.exec(key)
    if (m) ids.add(m[1])
  }
  return ids
}

/**
 * Gli id delle note create prima delle cartelle cominciano con l'ora di creazione (8 cifre
 * in base 36): serve a ridare una data alle note recuperate.
 */
function createdAtFromId(id: string): number | null {
  const time = parseInt(id.slice(0, 8), 36)
  return time > Date.UTC(2020, 0, 1) && time <= Date.now() ? time : null
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
  private readonly indexKey: string
  private readonly notePrefix: string
  private readonly activeKey: string
  private readonly deletions: DeletionLog | null

  constructor(opts: StoreOptions = {}) {
    const space = opts.space ?? ''
    this.indexKey = `glifo.${space}notes.v1`
    this.notePrefix = `glifo.${space}note.v1.`
    this.activeKey = `glifo.${space}active.v1`
    this.deletions = opts.trackDeletions ? new DeletionLog(`glifo.${space}deleted-notes.v1`) : null
    this.recovered = this.reload()
  }

  /** La chiave di localStorage riguarda queste note (l'elenco o il testo di una nota)? */
  ownsKey(key: string): boolean {
    return key === this.indexKey || key.startsWith(this.notePrefix)
  }

  /** L'id della nota se la chiave è quella del suo testo, altrimenti null. */
  noteIdOfKey(key: string): string | null {
    return key.startsWith(this.notePrefix) ? key.slice(this.notePrefix.length) || null : null
  }

  /**
   * Rilegge l'elenco salvato, che un'altra scheda può aver cambiato. Toglie le voci senza
   * testo (salvataggi interrotti) e rimette quelle che mancano ma il cui testo è ancora
   * salvato: le versioni di Glifo fino a settembre 2026, aperte in due schede, potevano
   * riscrivere l'elenco una sopra l'altra. Restituisce quante note ha recuperato.
   */
  reload(): number {
    const saved = new Set(storageKeys(this.notePrefix).map((k) => k.slice(this.notePrefix.length)).filter(Boolean))
    const stored = this.readIndex()
    const index = stored.filter((n) => saved.has(n.id))
    const known = new Set(index.map((n) => n.id))
    const now = Date.now()
    let recovered = 0
    for (const id of saved) {
      if (known.has(id)) continue
      const content = readItem(this.notePrefix + id) ?? ''
      // In cima all'elenco, così si ritrovano subito.
      index.push({ id, title: deriveTitle(content), createdAt: createdAtFromId(id) ?? now, updatedAt: now, dirty: true })
      recovered++
    }
    this.index = index
    if (recovered || index.length !== stored.length) writeJson(this.indexKey, index)
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
    const content = meta ? readItem(this.notePrefix + id) : null
    return meta && content !== null ? { ...meta, content } : null
  }

  /**
   * Nuova nota. `local`: una nota vuota di partenza, che va all'account solo quando la si
   * modifica. `conflict`: la versione tenuta dopo un conflitto.
   */
  create(content = '', folderId: string | null = null, opts: { local?: boolean; conflict?: boolean } = {}): Note {
    const now = Date.now()
    const meta: NoteMeta = { id: newId(), title: deriveTitle(content), createdAt: now, updatedAt: now, folderId }
    if (!opts.local) meta.dirty = true
    if (opts.conflict) meta.conflict = true
    // Prima il testo e poi l'elenco: chi legge a metà vede una nota da recuperare, non una voce vuota.
    writeItem(this.notePrefix + meta.id, content)
    this.change((index) => [...index, meta])
    return { ...meta, content }
  }

  /**
   * Aggiunge una nota che arriva da fuori, per esempio dagli appunti di questo browser senza
   * account, con le sue date: è da mandare all'account. Se l'id non va bene (non è un UUID o
   * è già usato) ne prende uno nuovo, che restituisce.
   */
  adopt(note: { id: string; content: string; folderId: string | null; createdAt: number; updatedAt: number }): string {
    const id = isUuid(note.id) && !this.readIndex().some((n) => n.id === note.id) ? note.id : newId()
    writeItem(this.notePrefix + id, note.content)
    this.change((index) => [
      ...index,
      { id, title: deriveTitle(note.content), createdAt: note.createdAt, updatedAt: note.updatedAt, folderId: note.folderId, dirty: true },
    ])
    return id
  }

  /** Salva il contenuto; restituisce false se il browser ha rifiutato il salvataggio. */
  save(id: string, content: string): boolean {
    const now = Date.now()
    const title = deriveTitle(content)
    const okContent = writeItem(this.notePrefix + id, content)
    let revived = false
    const okIndex = this.change((index) => {
      if (index.some((n) => n.id === id)) {
        return index.map((n) => (n.id === id ? { ...n, title, updatedAt: now, dirty: true, conflict: undefined } : n))
      }
      // Eliminata in un'altra scheda mentre qui la si stava scrivendo: torna nell'elenco,
      // così il testo appena scritto non va perso.
      revived = true
      const known = this.index.find((n) => n.id === id)
      const createdAt = known?.createdAt ?? createdAtFromId(id) ?? now
      return [...index, { id, title, createdAt, updatedAt: now, folderId: known?.folderId ?? null, rev: known?.rev, dirty: true }]
    })
    if (revived) this.deletions?.forget(id)
    return okContent && okIndex
  }

  /** Sposta la nota in una cartella (null: fuori da ogni cartella). */
  move(id: string, folderId: string | null): void {
    this.change((index) => index.map((n) => (n.id === id ? { ...n, folderId, dirty: true } : n)))
  }

  /** Sposta tutte le note di una cartella, per esempio prima di eliminarla. */
  moveAll(from: string, to: string | null): void {
    this.change((index) => index.map((n) => (n.folderId === from ? { ...n, folderId: to, dirty: true } : n)))
  }

  remove(id: string): void {
    const meta = this.readIndex().find((n) => n.id === id) ?? this.meta(id)
    // Prima si segna l'eliminazione: se la scheda si chiude a metà, l'account la saprà comunque.
    if (meta) this.deletions?.add({ id, rev: meta.rev ?? null, at: Date.now() })
    // Poi il testo e l'elenco: chi legge a metà non la scambia per una nota da recuperare.
    removeItem(this.notePrefix + id)
    this.change((index) => index.filter((n) => n.id !== id))
  }

  get activeId(): string | null {
    return readItem(this.activeKey)
  }

  set activeId(id: string | null) {
    if (id) writeItem(this.activeKey, id)
    else removeItem(this.activeKey)
  }

  /** Tutte le note, per il backup. */
  exportAll(): Note[] {
    return this.list().flatMap((m) => {
      const note = this.get(m.id)
      if (!note) return []
      const { id, title, createdAt, updatedAt, folderId, content } = note
      return [{ id, title, createdAt, updatedAt, folderId, content }]
    })
  }

  // ——— Sincronizzazione con l'account ———

  /** Le note con modifiche da mandare all'account (dall'elenco salvato, il più aggiornato). */
  changed(): Note[] {
    return this.readIndex().flatMap((m) => {
      if (!m.dirty) return []
      const content = readItem(this.notePrefix + m.id)
      return content === null ? [] : [{ ...m, content }]
    })
  }

  /** Le note eliminate da mandare all'account. */
  deleted(): Deletion[] {
    return this.deletions?.list() ?? []
  }

  /**
   * La nota mandata all'account ora è la sua versione `rev`. Se intanto qui è cambiata
   * ancora (testo o cartella), resta da mandare, partendo da quella versione.
   */
  markSynced(id: string, rev: number, sent: { content: string; folderId: string | null }, storedFolderId = sent.folderId): boolean {
    const content = readItem(this.notePrefix + id)
    let found = false
    let moved = false
    this.change((index) =>
      index.map((n) => {
        if (n.id !== id) return n
        found = true
        // L'account può aver tolto la nota da una cartella che non conosce: vale la sua scelta,
        // a meno che qui la nota non sia stata spostata di nuovo.
        const folderUnchanged = (n.folderId ?? null) === sent.folderId
        moved = folderUnchanged && storedFolderId !== sent.folderId
        const clean = content === sent.content && folderUnchanged
        return { ...n, rev, folderId: folderUnchanged ? storedFolderId : n.folderId, dirty: clean ? undefined : true }
      }),
    )
    // Eliminata mentre la si mandava: l'eliminazione parte dalla versione appena salvata.
    if (!found) this.deletions?.setRev(id, rev)
    return moved
  }

  /** Le modifiche di qui restano da mandare, ma partendo dalla versione `rev` dell'account. */
  rebase(id: string, rev: number): void {
    this.change((index) => index.map((n) => (n.id === id ? { ...n, rev, dirty: true } : n)))
  }

  /**
   * Dà alla nota un id nuovo (un UUID), per esempio se quello vecchio è già usato nell'account.
   * Restituisce l'id nuovo, oppure null se la nota non c'è.
   */
  rekey(id: string): string | null {
    const content = readItem(this.notePrefix + id)
    if (content === null || !this.readIndex().some((n) => n.id === id)) return null
    const next = newId()
    writeItem(this.notePrefix + next, content)
    this.change((index) => index.map((n) => (n.id === id ? { ...n, id: next, rev: undefined, dirty: true } : n)))
    removeItem(this.notePrefix + id)
    if (this.activeId === id) this.activeId = next
    return next
  }

  /** L'account sa già dell'eliminazione (o la nota è tornata): non c'è più niente da mandare. */
  forgetDeletion(id: string): void {
    this.deletions?.forget(id)
  }

  /** Mette nel browser la nota com'è nell'account, senza segnarla da mandare. */
  applyRemote(note: RemoteNote): void {
    writeItem(this.notePrefix + note.id, note.content)
    const meta: NoteMeta = {
      id: note.id,
      title: deriveTitle(note.content),
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      folderId: note.folderId,
      rev: note.rev,
    }
    this.change((index) => (index.some((n) => n.id === note.id) ? index.map((n) => (n.id === note.id ? meta : n)) : [...index, meta]))
    this.deletions?.forget(note.id)
  }

  /** Toglie dal browser una nota eliminata nell'account, senza segnarla da mandare. */
  removeRemote(id: string): void {
    removeItem(this.notePrefix + id)
    this.change((index) => index.filter((n) => n.id !== id))
    this.deletions?.forget(id)
  }

  /** L'elenco salvato, senza voci malformate o ripetute. */
  private readIndex(): NoteMeta[] {
    const raw = readJson<unknown>(this.indexKey, [])
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
    return writeJson(this.indexKey, this.index)
  }
}
