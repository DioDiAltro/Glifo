import type { FoldersStore } from './folders'
import type { NotesStore } from './notes'

/** Una nota come sta nel file di backup (`backup` in main.ts, o «Scarica i miei dati») o arriva dal vecchio Glifo. */
interface BackupNote {
  id?: unknown
  content: string
  folderId?: unknown
  createdAt?: unknown
  updatedAt?: unknown
}

/** Quello che serve delle lavagne (BoardStore in src/board/store.ts). */
export interface RestoreBoards {
  drawn(notes: string[]): Promise<number>
  importBoard(note: string, board: unknown, newId: () => string): Promise<number>
}

/** Quante note sono state aggiunte, quante c'erano già e quante lavagne sono tornate. */
export interface Restored {
  added: number
  already: number
  boards: number
}

/** Le note del backup che si possono rimettere: senza nemmeno una, il file non è un backup di Glifo. */
export function backupNotes(data: unknown): BackupNote[] {
  const notes = (data as { notes?: unknown } | null)?.notes
  if (!Array.isArray(notes)) return []
  return notes.filter((n): n is BackupNote => typeof n === 'object' && n !== null && typeof (n as BackupNote).content === 'string')
}

/**
 * Rimette in `notes` gli appunti di un backup, o quelli portati dal vecchio Glifo. Una nota che c'è
 * già (stesso id e stesso testo) non si raddoppia: chi ha l'account, entrato sul sito nuovo, ha già
 * le note, e il backup rimette solo le lavagne. Le altre tornano con il loro id, se è libero, così le
 * lavagne le ritrovano e l'account le riconosce (stessa nota con lo stesso testo: niente copia); se con
 * quell'id qui c'è una nota diversa, quella del backup si aggiunge a parte. Una nota eliminata qui e
 * non ancora tolta dall'account torna. Le cartelle: si usano quelle che hanno già lo stesso nome, le
 * altre si creano. Una lavagna va sulla sua nota solo se lì non c'è già niente di scritto: ripristinare
 * due volte non raddoppia i tratti.
 */
export async function restoreBackup(
  data: unknown,
  deps: { notes: NotesStore; folders: FoldersStore; boards: RestoreBoards; newStrokeId: () => string; now?: number },
): Promise<Restored> {
  const { notes, folders, boards, newStrokeId } = deps
  const now = deps.now ?? Date.now()
  const folderIds = new Map<string, string>()
  const savedFolders = (data as { folders?: unknown }).folders
  for (const f of Array.isArray(savedFolders) ? (savedFolders as { id?: unknown; name?: unknown }[]) : []) {
    if (typeof f?.id !== 'string' || typeof f.name !== 'string') continue
    const folder = folders.byName(f.name) ?? folders.create(f.name)
    if (folder) folderIds.set(f.id, folder.id)
  }
  const deleted = new Set(notes.deleted().map((d) => d.id))
  const noteIds = new Map<string, string>()
  let added = 0
  let already = 0
  for (const n of backupNotes(data)) {
    const id = typeof n.id === 'string' ? n.id : ''
    const folderId = (typeof n.folderId === 'string' && folderIds.get(n.folderId)) || null
    const here = id ? notes.get(id) : null
    if (here && here.content === n.content) {
      noteIds.set(id, id)
      already++
      continue
    }
    if (!here && deleted.has(id)) notes.forgetDeletion(id)
    const to = here
      ? notes.create(n.content, folderId).id
      : notes.adopt({ id, content: n.content, folderId, createdAt: time(n.createdAt, now), updatedAt: time(n.updatedAt, now) })
    if (id) noteIds.set(id, to)
    added++
  }
  let restoredBoards = 0
  const savedBoards = (data as { boards?: unknown }).boards
  for (const b of Array.isArray(savedBoards) ? (savedBoards as { note?: unknown }[]) : []) {
    const to = typeof b?.note === 'string' ? noteIds.get(b.note) : undefined
    if (!to) continue
    try {
      if (await boards.drawn([to])) continue
      if (await boards.importBoard(to, b, newStrokeId)) restoredBoards++
    } catch {
      // Senza lavagne (per esempio IndexedDB non disponibile) le note tornano lo stesso.
    }
  }
  return { added, already, boards: restoredBoards }
}

/** Il messaggio dopo il ripristino. */
export function restoredMessage({ added, already, boards }: Restored): string {
  const drawings = boards === 1 ? '1 lavagna' : `${boards} lavagne`
  if (!added) {
    if (boards) return `Gli appunti c'erano già: ${boards === 1 ? 'rimessa' : 'rimesse'} ${drawings}`
    return 'Gli appunti del backup c\'erano già tutti'
  }
  let text = added === 1 ? 'Ripristinato 1 appunto' : `Ripristinati ${added} appunti`
  if (boards) text += ` e ${drawings}`
  if (already) text += already === 1 ? '; uno c\'era già' : `; ${already} c'erano già`
  return text
}

function time(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : fallback
}
