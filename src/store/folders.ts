import { newId } from './ids'
import type { NoteMeta } from './notes'
import { readJson, writeJson } from './storage'

/** Una cartella di appunti (per ora un solo livello: niente cartelle dentro cartelle). */
export interface Folder {
  id: string
  name: string
  createdAt: number
  updatedAt: number
}

const FOLDERS_KEY = 'glifo.folders.v1'
/** Cartelle chiuse nell'elenco: vale solo per questo dispositivo. */
const CLOSED_KEY = 'glifo.folders.closed.v1'

export const FOLDER_NAME_MAX = 60

/** La chiave di localStorage è quella delle cartelle? Serve per l'evento `storage`. */
export function isFoldersKey(key: string): boolean {
  return key === FOLDERS_KEY
}

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

  constructor() {
    this.reload()
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
    const folder: Folder = { id: newId(), name: clean, createdAt: now, updatedAt: now }
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
        return { ...f, name: clean, updatedAt: Date.now() }
      })
    })
    return renamed
  }

  /** Toglie la cartella (le note vanno spostate prima, vedi `NotesStore.moveAll`). */
  remove(id: string): void {
    this.change((folders) => folders.filter((f) => f.id !== id))
  }

  private read(): Folder[] {
    const raw = readJson<unknown>(FOLDERS_KEY, [])
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
    return writeJson(FOLDERS_KEY, this.folders)
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
