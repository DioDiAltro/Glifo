import { FoldersStore } from '../store/folders'
import { NotesStore, type Note } from '../store/notes'
import { readJson, removeItem, storageKeys, writeJson } from '../store/storage'
import { SyncState } from './sync'

const ACCOUNT_KEY = 'glifo.account.v1'

/** L'account con cui si è entrati in questo browser. */
export interface Account {
  userId: string
  email: string
}

export function currentAccount(): Account | null {
  const raw = readJson<unknown>(ACCOUNT_KEY, null)
  if (typeof raw !== 'object' || raw === null) return null
  const { userId, email } = raw as Partial<Account>
  return typeof userId === 'string' && userId && typeof email === 'string' ? { userId, email } : null
}

export function setCurrentAccount(account: Account | null): void {
  if (account) writeJson(ACCOUNT_KEY, account)
  else removeItem(ACCOUNT_KEY)
}

/** Se questa chiave cambia in un'altra scheda, si è entrati o usciti dall'account. */
export function isAccountKey(key: string): boolean {
  return key === ACCOUNT_KEY
}

const prefixOf = (userId: string) => `u.${userId}.`

/** Note, cartelle e sincronizzazione di un account in questo browser: stanno a parte dagli altri appunti. */
export function accountSpace(userId: string) {
  const space = prefixOf(userId)
  return {
    notes: new NotesStore({ space, trackDeletions: true }),
    folders: new FoldersStore({ space, trackDeletions: true }),
    state: new SyncState(`glifo.${space}sync.v1`),
  }
}

/** In questo browser ci sono già le note dell'account? (No la prima volta che si entra qui.) */
export function knowsAccount(userId: string): boolean {
  return storageKeys(`glifo.${prefixOf(userId)}`).length > 0
}

/** Toglie da questo browser le note dell'account (nell'account restano). */
export function forgetAccount(userId: string): void {
  for (const key of storageKeys(`glifo.${prefixOf(userId)}`)) removeItem(key)
}

/**
 * La nota di benvenuto mai toccata: non è un appunto da portare nell'account. Anche quella
 * di una versione precedente di Glifo, con un testo un po' diverso.
 */
export function isWelcome(note: Note, welcome: string): boolean {
  const title = welcome.split('\n', 1)[0]
  return note.content === welcome || (note.content.startsWith(title + '\n') && note.updatedAt === note.createdAt)
}

/** Quanti appunti di questo browser sono fuori dall'account e si possono aggiungere. */
export function guestNoteCount(welcome: string): number {
  const guest = new NotesStore()
  return guest.list().filter((n) => {
    const note = guest.get(n.id)
    return note && !isWelcome(note, welcome)
  }).length
}

/**
 * Porta nell'account gli appunti di questo browser, con le loro cartelle: da qui in poi si
 * sincronizzano, e fuori dall'account non restano. Restituisce quante note ha portato.
 * `renamed`: una nota ha dovuto cambiare id (quelle di prima delle cartelle non hanno un UUID),
 * così la sua lavagna la segue.
 */
export function adoptGuestNotes(userId: string, welcome: string, renamed?: (from: string, to: string) => void): number {
  const guest = new NotesStore()
  const guestFolders = new FoldersStore()
  const { notes, folders } = accountSpace(userId)
  // Una cartella con lo stesso nome di una dell'account diventa quella.
  const folderIds = new Map<string, string>()
  for (const f of guestFolders.list()) {
    const target = folders.byName(f.name) ?? folders.create(f.name)
    if (target) folderIds.set(f.id, target.id)
  }
  const activeId = guest.activeId
  let moved = 0
  for (const meta of guest.list()) {
    const note = guest.get(meta.id)
    if (!note || isWelcome(note, welcome)) continue
    // Prima la copia nell'account, poi si toglie da qui: se qualcosa si interrompe, al massimo resta doppia.
    const id = notes.adopt({
      id: note.id,
      content: note.content,
      folderId: (note.folderId && folderIds.get(note.folderId)) || null,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    })
    // La nota aperta resta aperta, se nell'account non ce n'era già una.
    if (meta.id === activeId && !notes.activeId) notes.activeId = id
    if (id !== note.id) renamed?.(note.id, id)
    guest.remove(note.id)
    moved++
  }
  for (const f of guestFolders.list()) if (folderIds.has(f.id)) guestFolders.remove(f.id)
  return moved
}
