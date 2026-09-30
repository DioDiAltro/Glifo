import { DeletionLog, type Deletion } from './deletions'
import { newId } from './ids'
import type { NoteMeta, StoreOptions } from './notes'
import { readJson, writeJson } from './storage'

/** Una cartella di appunti (per ora un solo livello: niente cartelle dentro cartelle). */
export interface Folder {
  id: string
  name: string
  createdAt: number
  updatedAt: number
  /** Con l'account: la versione dell'account da cui parte la copia di questo browser. */
  rev?: number
  /** Ci sono modifiche che l'account non ha ancora. */
  dirty?: boolean
}

/** Una cartella come arriva dall'account. */
export interface RemoteFolder {
  id: string
  name: string
  createdAt: number
  updatedAt: number
  rev: number
}

/** Cartelle chiuse nell'elenco: vale solo per questo dispositivo. */
const CLOSED_KEY = 'glifo.folders.closed.v1'

export const FOLDER_NAME_MAX = 60

/** Il nome pulito (spazi in più tolti, lunghezza massima), oppure '' se è vuoto. */
export function cleanFolderName(name: string): string {
  return name.normalize('NFC').replace(/\s+/g, ' ').trim().slice(0, FOLDER_NAME_MAX).trim()
}

const sameName = (a: string, b: string) => a.localeCompare(b, 'it', { sensitivity: 'base' }) === 0

/**
 * Le cartelle salvate nel browser. Come per le note, ogni modifica parte dall'elenco
 * salvato e non dalla copia in memoria: Glifo può essere aperto in più schede.
 */
export class FoldersStore {
  private folders: Folder[] = []
  private readonly key: string
  private readonly deletions: DeletionLog | null

  constructor(opts: StoreOptions = {}) {
    const space = opts.space ?? ''
    this.key = `glifo.${space}folders.v1`
    this.deletions = opts.trackDeletions ? new DeletionLog(`glifo.${space}deleted-folders.v1`) : null
    this.reload()
  }

  /** La chiave di localStorage è quella di queste cartelle? Serve per l'evento `storage`. */
  ownsKey(key: string): boolean {
    return key === this.key
  }

  /** Rilegge le cartelle salvate (un'altra scheda può averle cambiate). */
  reload(): void {
    this.folders = this.read()
  }

  /** In ordine alfabetico, con i numeri in ordine naturale («Analisi 2» prima di «Analisi 10»). */
  list(): Folder[] {
    return [...this.folders].sort((a, b) => a.name.localeCompare(b.name, 'it', { sensitivity: 'base', numeric: true }))
  }

  get(id: string | null | undefined): Folder | null {
    return (id && this.folders.find((f) => f.id === id)) || null
  }

  /** La cartella con questo nome (maiuscole e accenti non contano), se c'è. */
  byName(name: string): Folder | null {
    const clean = cleanFolderName(name)
    return this.folders.find((f) => sameName(f.name, clean)) ?? null
  }

  /** Esiste già un'altra cartella con questo nome (maiuscole e accenti non contano)? */
  nameTaken(name: string, exceptId?: string): boolean {
    const clean = cleanFolderName(name)
    return this.folders.some((f) => f.id !== exceptId && sameName(f.name, clean))
  }

  /** Crea la cartella; null se il nome è vuoto o già usato. */
  create(name: string): Folder | null {
    const clean = cleanFolderName(name)
    if (!clean) return null
    const now = Date.now()
    const folder: Folder = { id: newId(), name: clean, createdAt: now, updatedAt: now, dirty: true }
    let created = false
    this.change((folders) => {
      if (folders.some((f) => sameName(f.name, clean))) return folders
      created = true
      return [...folders, folder]
    })
    return created ? folder : null
  }

  /** Cambia il nome; false se il nome è vuoto o già usato da un'altra cartella. */
  rename(id: string, name: string): boolean {
    const clean = cleanFolderName(name)
    if (!clean) return false
    let renamed = false
    this.change((folders) => {
      if (folders.some((f) => f.id !== id && sameName(f.name, clean))) return folders
      return folders.map((f) => {
        if (f.id !== id) return f
        renamed = true
        return { ...f, name: clean, updatedAt: Date.now(), dirty: true }
      })
    })
    return renamed
  }

  /** Toglie la cartella (le note vanno spostate prima, vedi `NotesStore.moveAll`). */
  remove(id: string): void {
    const folder = this.read().find((f) => f.id === id) ?? this.get(id)
    if (folder) this.deletions?.add({ id, rev: folder.rev ?? null, at: Date.now() })
    this.change((folders) => folders.filter((f) => f.id !== id))
  }

  // ——— Sincronizzazione con l'account ———

  /** Le cartelle con modifiche da mandare all'account. */
  changed(): Folder[] {
    return this.read().filter((f) => f.dirty)
  }

  /** Le cartelle eliminate da mandare all'account. */
  deleted(): Deletion[] {
    return this.deletions?.list() ?? []
  }

  /** La cartella mandata all'account ora è la sua versione `rev` (se il nome è cambiato ancora, resta da mandare). */
  markSynced(id: string, rev: number, sent: { name: string }): void {
    let found = false
    this.change((folders) =>
      folders.map((f) => {
        if (f.id !== id) return f
        found = true
        return { ...f, rev, dirty: f.name === sent.name ? undefined : true }
      }),
    )
    if (!found) this.deletions?.setRev(id, rev)
  }

  forgetDeletion(id: string): void {
    this.deletions?.forget(id)
  }

  /** Le modifiche di qui restano da mandare, ma partendo dalla versione `rev` dell'account. */
  rebase(id: string, rev: number): void {
    this.change((folders) => folders.map((f) => (f.id === id ? { ...f, rev, dirty: true } : f)))
  }

  /** Dà alla cartella un id nuovo; restituisce l'id nuovo, oppure null se la cartella non c'è. */
  rekey(id: string): string | null {
    if (!this.read().some((f) => f.id === id)) return null
    const next = newId()
    this.change((folders) => folders.map((f) => (f.id === id ? { ...f, id: next, rev: undefined, dirty: true } : f)))
    return next
  }

  /** Mette nel browser la cartella com'è nell'account, senza segnarla da mandare. */
  applyRemote(folder: RemoteFolder): void {
    const next: Folder = { ...folder }
    this.change((folders) => (folders.some((f) => f.id === folder.id) ? folders.map((f) => (f.id === folder.id ? next : f)) : [...folders, next]))
    this.deletions?.forget(folder.id)
  }

  /** Toglie dal browser una cartella eliminata nell'account, senza segnarla da mandare. */
  removeRemote(id: string): void {
    this.change((folders) => folders.filter((f) => f.id !== id))
    this.deletions?.forget(id)
  }

  private read(): Folder[] {
    const raw = readJson<unknown>(this.key, [])
    if (!Array.isArray(raw)) return []
    const seen = new Set<string>()
    return raw.filter((f): f is Folder => {
      const ok =
        typeof f === 'object' && f !== null && typeof (f as Folder).id === 'string' && typeof (f as Folder).name === 'string'
      if (!ok || seen.has((f as Folder).id)) return false
      seen.add((f as Folder).id)
      return true
    })
  }

  private change(update: (folders: Folder[]) => Folder[]): boolean {
    this.folders = update(this.read())
    return writeJson(this.key, this.folders)
  }
}

/** Le cartelle chiuse nell'elenco, su questo dispositivo. */
export function loadClosedFolders(): Set<string> {
  const ids = readJson<unknown>(CLOSED_KEY, [])
  return new Set(Array.isArray(ids) ? ids.filter((id): id is string => typeof id === 'string') : [])
}

export function saveClosedFolders(ids: Set<string>): void {
  writeJson(CLOSED_KEY, [...ids])
}

export interface FolderGroup {
  folder: Folder
  notes: NoteMeta[]
}

/**
 * Divide le note per cartella: prima le cartelle (anche vuote), poi le note fuori da ogni
 * cartella. Una nota la cui cartella non esiste più finisce tra quelle fuori.
 * Con un filtro restano le note il cui titolo lo contiene e le cartelle il cui nome lo
 * contiene (con tutte le loro note); le cartelle senza niente da mostrare spariscono.
 */
export function groupByFolder(
  notes: NoteMeta[],
  folders: Folder[],
  filter = '',
): { groups: FolderGroup[]; loose: NoteMeta[] } {
  const q = filter.trim().toLocaleLowerCase('it')
  const matches = (text: string) => !q || text.toLocaleLowerCase('it').includes(q)
  const byFolder = new Map<string, NoteMeta[]>(folders.map((f) => [f.id, []]))
  const loose: NoteMeta[] = []
  for (const n of notes) {
    const inFolder = n.folderId ? byFolder.get(n.folderId) : undefined
    if (inFolder) inFolder.push(n)
    else if (matches(n.title)) loose.push(n)
  }
  const groups: FolderGroup[] = []
  for (const folder of folders) {
    const all = byFolder.get(folder.id)!
    const shown = matches(folder.name) ? all : all.filter((n) => matches(n.title))
    if (!q || shown.length || matches(folder.name)) groups.push({ folder, notes: shown })
  }
  return { groups, loose }
}
