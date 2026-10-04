import type { NotesStore } from '../store/notes'
import type { FoldersStore } from '../store/folders'
import { readJson, writeJson } from '../store/storage'

// Le righe come le restituiscono sync_pull e sync_push (vedi supabase/README.md).

export interface NoteRow {
  id: string
  folder_id: string | null
  title: string
  content: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  revision: number
}

export interface FolderRow {
  id: string
  name: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  revision: number
}

export interface SettingsRow {
  settings: Record<string, unknown>
  dictionary: unknown
  updated_at: string
  revision: number
}

export interface PullResult {
  cursor: string
  folders: FolderRow[]
  notes: NoteRow[]
  settings: SettingsRow | null
}

type Status = 'ok' | 'conflict' | 'rejected'

export interface PushResult {
  folders: { id: string; status: Status; row: FolderRow | null }[]
  notes: { id: string; status: Status; row: NoteRow | null }[]
  settings: { status: Status; row: SettingsRow | null } | null
}

interface FolderChange {
  id: string
  base_revision: number | null
  name: string
  created_at?: string
  updated_at: string
  deleted_at: string | null
}

interface NoteChange {
  id: string
  base_revision: number | null
  folder_id: string | null
  title: string
  content: string
  created_at?: string
  updated_at: string
  deleted_at: string | null
}

interface SettingsChange {
  base_revision: number | null
  settings?: Record<string, unknown>
  dictionary?: string[]
  updated_at: string
}

export interface PushChanges {
  folders: FolderChange[]
  notes: NoteChange[]
  settings?: SettingsChange
}

/** Il server dell'account: in Glifo è Supabase, nei test un Postgres in memoria. */
export interface SyncBackend {
  pull(since: string | null): Promise<PullResult>
  push(changes: PushChanges): Promise<PushResult>
}

/** Perché la sincronizzazione non è riuscita. */
export type SyncErrorKind = 'offline' | 'auth' | 'quota' | 'server'

export class SyncError extends Error {
  constructor(
    readonly kind: SyncErrorKind,
    message: string,
    /** Il suggerimento (hint) del database, per esempio «quota» o «missing». */
    readonly hint?: string,
  ) {
    super(message)
  }
}

/** Le impostazioni e il dizionario personale che vanno con l'account. */
export interface Prefs {
  read(): Record<string, unknown>
  apply(values: Record<string, unknown>): void
  words(): string[]
  applyWords(words: string[]): void
}

/** Cosa è cambiato nel browser: la pagina aggiorna l'elenco e, se serve, la nota aperta. */
export interface LocalChange {
  /** Note arrivate o cambiate dall'account. */
  updated: string[]
  /** Note tolte perché eliminate nell'account. */
  removed: string[]
  /**
   * La versione di qui è passata a un'altra nota: dopo un conflitto (`conflict`), oppure perché
   * l'id era già usato in un altro account.
   */
  replaced: { from: string; to: string; conflict: boolean }[]
  /** Note eliminate qui ma cambiate su un altro dispositivo: sono tornate. */
  restored: string[]
  folders: boolean
  settings: boolean
  words: boolean
}

export interface SyncHooks {
  /** Subito prima di toccare le note: salva quello che si sta scrivendo. */
  flush(): void
  /** Subito dopo, nello stesso momento: aggiorna la pagina. */
  changed(change: LocalChange): void
}

interface StateData {
  /** Da dove riparte sync_pull (null: dall'inizio). */
  cursor: string | null
  settingsRev: number | null
  /** Impostazioni cambiate qui e non ancora mandate. */
  settingsDirty: string[]
  wordsDirty: boolean
  /** Primo accesso: se l'account ha già delle impostazioni, valgono quelle. */
  adopt: boolean
}

const EMPTY_STATE: StateData = { cursor: null, settingsRev: null, settingsDirty: [], wordsDirty: false, adopt: false }

/** A che punto è la sincronizzazione di un account in questo browser. */
export class SyncState {
  constructor(private readonly key: string) {}

  read(): StateData {
    const raw = readJson<Partial<StateData> | null>(this.key, null)
    return { ...EMPTY_STATE, ...(typeof raw === 'object' && raw !== null ? raw : {}) }
  }

  update(change: (state: StateData) => Partial<StateData>): void {
    const state = this.read()
    writeJson(this.key, { ...state, ...change(state) })
  }

  /** Impostazioni cambiate qui: vanno mandate all'account. */
  settingsChanged(keys: string[]): void {
    if (keys.length) this.update((s) => ({ settingsDirty: [...new Set([...s.settingsDirty, ...keys])] }))
  }

  wordsChanged(): void {
    this.update(() => ({ wordsDirty: true }))
  }
}

/** Quante note al massimo per richiesta, e quanto testo (il server accetta al massimo 1 MB per nota). */
const BATCH_NOTES = 100
const BATCH_BYTES = 2_000_000

const iso = (ms: number) => new Date(ms).toISOString()
const ms = (value: string) => Date.parse(value)
const sameWords = (a: string[], b: string[]) => a.length === b.length && a.every((w, i) => w === b[i])
const toWords = (value: unknown): string[] => (Array.isArray(value) ? value.filter((w): w is string => typeof w === 'string') : [])

function noChange(): LocalChange {
  return { updated: [], removed: [], replaced: [], restored: [], folders: false, settings: false, words: false }
}

function isEmpty(change: LocalChange): boolean {
  return (
    !change.updated.length &&
    !change.removed.length &&
    !change.replaced.length &&
    !change.restored.length &&
    !change.folders &&
    !change.settings &&
    !change.words
  )
}

/**
 * Sincronizza le note di un account tra questo browser e il server: prima manda le modifiche
 * fatte qui, poi scarica quelle fatte altrove. Non si perde mai testo: se la stessa nota è
 * cambiata in due posti restano tutte e due le versioni, e una nota eliminata qui ma cambiata
 * altrove torna.
 */
export class SyncEngine {
  private running: Promise<LocalChange> | null = null
  private rerun = false

  constructor(
    private readonly deps: {
      notes: NotesStore
      folders: FoldersStore
      state: SyncState
      backend: SyncBackend
      prefs: Prefs
      hooks: SyncHooks
      /** Una sola scheda alla volta sincronizza lo stesso account. */
      lock?: <T>(run: () => Promise<T>) => Promise<T>
    },
  ) {}

  /** Sincronizza; se una sincronizzazione è già in corso, ne fa un'altra subito dopo. */
  sync(): Promise<LocalChange> {
    if (this.running) {
      this.rerun = true
      return this.running
    }
    const run = async () => {
      const total = noChange()
      try {
        do {
          this.rerun = false
          const change = await (this.deps.lock ?? ((fn) => fn()))(() => this.cycle())
          merge(total, change)
        } while (this.rerun)
        return total
      } finally {
        this.running = null
      }
    }
    this.running = run()
    return this.running
  }

  /** Ci sono modifiche fatte qui che l'account non ha ancora? */
  hasPending(): boolean {
    const { notes, folders, state } = this.deps
    const s = state.read()
    return !!(notes.changed().length || notes.deleted().length || folders.changed().length || folders.deleted().length || s.settingsDirty.length || s.wordsDirty)
  }

  private async cycle(): Promise<LocalChange> {
    const total = noChange()
    // Le altre schede possono aver cambiato qualcosa: si parte da quello salvato.
    this.deps.notes.reload()
    this.deps.folders.reload()
    await this.pushAll(total)
    await this.pullAll(total)
    return total
  }

  // ——— Mandare ———

  private async pushAll(total: LocalChange): Promise<void> {
    // A ogni giro partono le modifiche rimaste (anche quelle nate da un conflitto). Il limite
    // evita di girare all'infinito se qualcosa va storto.
    for (let round = 0; round < 50; round++) {
      const changes = this.collect()
      if (!changes.folders.length && !changes.notes.length && !changes.settings) return
      const result = await this.deps.backend.push(changes)
      this.deps.hooks.flush()
      const change = noChange()
      this.applyFolders(changes.folders, result.folders, change)
      this.applyNotes(changes.notes, result.notes, change)
      if (changes.settings && result.settings) this.applySettings(changes.settings, result.settings, change)
      this.announce(change, total)
    }
  }

  private collect(): PushChanges {
    const { notes, folders, state, prefs } = this.deps
    const changes: PushChanges = { folders: [], notes: [] }
    for (const f of folders.changed()) {
      changes.folders.push({
        id: f.id,
        base_revision: f.rev ?? null,
        name: f.name,
        created_at: iso(f.createdAt),
        updated_at: iso(f.updatedAt),
        deleted_at: null,
      })
    }
    for (const d of folders.deleted()) {
      changes.folders.push({ id: d.id, base_revision: d.rev, name: '', updated_at: iso(d.at), deleted_at: iso(d.at) })
    }
    let bytes = 0
    for (const d of notes.deleted()) {
      changes.notes.push({ id: d.id, base_revision: d.rev, folder_id: null, title: '', content: '', updated_at: iso(d.at), deleted_at: iso(d.at) })
    }
    for (const n of notes.changed()) {
      if (changes.notes.length >= BATCH_NOTES || (changes.notes.length && bytes + n.content.length > BATCH_BYTES)) break
      bytes += n.content.length
      changes.notes.push({
        id: n.id,
        base_revision: n.rev ?? null,
        folder_id: n.folderId ?? null,
        title: n.title,
        content: n.content,
        created_at: iso(n.createdAt),
        updated_at: iso(n.updatedAt),
        deleted_at: null,
      })
    }
    const s = state.read()
    if (s.settingsDirty.length || s.wordsDirty) {
      const settings: SettingsChange = { base_revision: s.settingsRev, updated_at: iso(Date.now()) }
      if (s.settingsDirty.length) settings.settings = prefs.read()
      if (s.wordsDirty) settings.dictionary = prefs.words()
      changes.settings = settings
    }
    return changes
  }

  private applyFolders(sent: FolderChange[], results: PushResult['folders'], change: LocalChange): void {
    const { folders, notes } = this.deps
    for (const [i, item] of sent.entries()) {
      const result = results[i]
      if (!result || result.id !== item.id) continue
      const row = result.row
      const deleting = item.deleted_at !== null
      if (result.status === 'ok' && row) {
        if (deleting) folders.forgetDeletion(item.id)
        else folders.markSynced(item.id, row.revision, { name: item.name })
      } else if (result.status === 'conflict' && row) {
        if (row.deleted_at && !deleting) {
          // Eliminata altrove ma cambiata qui: torna, partendo dalla versione eliminata.
          folders.rebase(item.id, row.revision)
        } else {
          // Rinominata altrove (o eliminata qui ma rinominata altrove): vale quella dell'account.
          folders.applyRemote(remoteFolder(row))
          change.folders = true
        }
      } else if (result.status === 'rejected') {
        if (deleting) {
          folders.forgetDeletion(item.id)
        } else {
          // L'id è già di un altro account: la cartella prende un id nuovo, e le note la seguono.
          const next = folders.rekey(item.id)
          if (next) notes.moveAll(item.id, next)
          change.folders = true
        }
      }
    }
  }

  private applyNotes(sent: NoteChange[], results: PushResult['notes'], change: LocalChange): void {
    const { notes } = this.deps
    for (const [i, item] of sent.entries()) {
      const result = results[i]
      if (!result || result.id !== item.id) continue
      const row = result.row
      const deleting = item.deleted_at !== null
      if (result.status === 'ok' && row) {
        if (deleting) notes.forgetDeletion(item.id)
        else if (notes.markSynced(item.id, row.revision, { content: item.content, folderId: item.folder_id }, row.folder_id)) change.updated.push(item.id)
      } else if (result.status === 'conflict' && row) {
        if (deleting) {
          // Eliminata qui ma cambiata altrove: vince chi l'ha cambiata, e la nota torna.
          if (!row.deleted_at) {
            notes.applyRemote(remoteNote(row))
            change.restored.push(item.id)
          } else {
            notes.forgetDeletion(item.id)
          }
        } else if (row.deleted_at) {
          // Eliminata altrove ma cambiata qui: resta, e all'account torna questa versione.
          notes.rebase(item.id, row.revision)
        } else {
          const local = notes.get(item.id)
          if (local && local.content !== row.content) {
            // Cambiata in due posti: la versione di qui diventa una nota a parte.
            const copy = notes.create(local.content, local.folderId ?? null, { conflict: true })
            change.replaced.push({ from: item.id, to: copy.id, conflict: true })
          }
          notes.applyRemote(remoteNote(row))
          change.updated.push(item.id)
        }
      } else if (result.status === 'rejected') {
        if (deleting) {
          notes.forgetDeletion(item.id)
        } else {
          const next = notes.rekey(item.id)
          if (next) change.replaced.push({ from: item.id, to: next, conflict: false })
        }
      }
    }
  }

  private applySettings(sent: SettingsChange, result: NonNullable<PushResult['settings']>, change: LocalChange): void {
    const { state, prefs } = this.deps
    const row = result.row
    if (!row) return
    if (result.status === 'ok') {
      const current = prefs.read()
      state.update((s) => ({
        settingsRev: row.revision,
        // Resta da mandare solo quello che è cambiato ancora mentre si mandava.
        settingsDirty: s.settingsDirty.filter((key) => !sent.settings || sent.settings[key] !== current[key]),
        wordsDirty: s.wordsDirty && !(sent.dictionary && sameWords(sent.dictionary, prefs.words())),
        adopt: false,
      }))
      return
    }
    if (result.status !== 'conflict') return
    // Cambiate anche altrove: valgono quelle dell'account, tranne quelle cambiate qui.
    const s = state.read()
    const keep = s.adopt ? [] : s.settingsDirty
    const server = typeof row.settings === 'object' && row.settings !== null ? row.settings : {}
    const incoming = Object.fromEntries(Object.entries(server).filter(([key]) => !keep.includes(key)))
    if (Object.keys(incoming).length) {
      prefs.apply(incoming)
      change.settings = true
    }
    const words = s.wordsDirty ? [...new Set([...toWords(row.dictionary), ...prefs.words()])] : toWords(row.dictionary)
    if (!sameWords(words, prefs.words())) {
      prefs.applyWords(words)
      change.words = true
    }
    const wordsDirty = s.wordsDirty && !sameWords(words, toWords(row.dictionary))
    state.update(() => ({ settingsRev: row.revision, settingsDirty: keep, wordsDirty, adopt: false }))
  }

  // ——— Scaricare ———

  private async pullAll(total: LocalChange): Promise<void> {
    const { state, backend } = this.deps
    let since = state.read().cursor
    let result = await backend.pull(since)
    // Il cursore del server è tornato indietro (database ripristinato): si riparte da capo.
    if (since && BigInt(result.cursor) < BigInt(since)) {
      since = null
      result = await backend.pull(null)
    }
    this.deps.hooks.flush()
    const change = noChange()
    this.pullFolders(result.folders, since === null, change)
    this.pullNotes(result.notes, since === null, change)
    if (result.settings) this.pullSettings(result.settings, change)
    state.update(() => ({ cursor: result.cursor }))
    this.announce(change, total)
  }

  private pullFolders(rows: FolderRow[], full: boolean, change: LocalChange): void {
    const { folders } = this.deps
    const pending = new Set(folders.deleted().map((d) => d.id))
    for (const row of rows) {
      const local = folders.get(row.id)
      if (row.deleted_at) {
        if (local && !local.dirty) {
          folders.removeRemote(row.id)
          change.folders = true
        } else if (!local) {
          folders.forgetDeletion(row.id)
        }
      } else if (local ? !local.dirty && (local.rev ?? 0) < row.revision : !pending.has(row.id)) {
        folders.applyRemote(remoteFolder(row))
        change.folders = true
      }
    }
    if (full) {
      // Scaricando tutto: le cartelle già sincronizzate che l'account non ha più sono state eliminate.
      const present = new Set(rows.map((r) => r.id))
      for (const f of folders.list()) {
        if (f.rev !== undefined && !f.dirty && !present.has(f.id)) {
          folders.removeRemote(f.id)
          change.folders = true
        }
      }
    }
  }

  private pullNotes(rows: NoteRow[], full: boolean, change: LocalChange): void {
    const { notes } = this.deps
    const pending = new Set(notes.deleted().map((d) => d.id))
    for (const row of rows) {
      const local = notes.meta(row.id)
      if (row.deleted_at) {
        if (local && !local.dirty) {
          notes.removeRemote(row.id)
          change.removed.push(row.id)
        } else if (!local) {
          notes.forgetDeletion(row.id)
        }
      } else if (local ? !local.dirty && (local.rev ?? 0) < row.revision : !pending.has(row.id)) {
        notes.applyRemote(remoteNote(row))
        change.updated.push(row.id)
      }
    }
    if (full) {
      const present = new Set(rows.map((r) => r.id))
      for (const n of notes.list()) {
        if (n.rev !== undefined && !n.dirty && !present.has(n.id)) {
          notes.removeRemote(n.id)
          change.removed.push(n.id)
        }
      }
    }
  }

  private pullSettings(row: SettingsRow, change: LocalChange): void {
    const { state, prefs } = this.deps
    const s = state.read()
    // Con modifiche da mandare si aspetta: al prossimo invio il server risponde con un conflitto e si uniscono.
    if (s.settingsDirty.length || s.wordsDirty || (s.settingsRev ?? 0) >= row.revision) return
    const server = typeof row.settings === 'object' && row.settings !== null ? row.settings : {}
    if (Object.keys(server).length) {
      prefs.apply(server)
      change.settings = true
    }
    const words = toWords(row.dictionary)
    if (!sameWords(words, prefs.words())) {
      prefs.applyWords(words)
      change.words = true
    }
    state.update(() => ({ settingsRev: row.revision, adopt: false }))
  }

  private announce(change: LocalChange, total: LocalChange): void {
    if (isEmpty(change)) return
    this.deps.hooks.changed(change)
    merge(total, change)
  }
}

function merge(total: LocalChange, change: LocalChange): void {
  total.updated.push(...change.updated)
  total.removed.push(...change.removed)
  total.replaced.push(...change.replaced)
  total.restored.push(...change.restored)
  total.folders ||= change.folders
  total.settings ||= change.settings
  total.words ||= change.words
}

function remoteNote(row: NoteRow) {
  return {
    id: row.id,
    content: row.content,
    folderId: row.folder_id,
    createdAt: ms(row.created_at),
    updatedAt: ms(row.updated_at),
    rev: row.revision,
  }
}

function remoteFolder(row: FolderRow) {
  return { id: row.id, name: row.name, createdAt: ms(row.created_at), updatedAt: ms(row.updated_at), rev: row.revision }
}
