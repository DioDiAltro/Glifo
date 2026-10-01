import type { FoldersStore } from '../store/folders'
import type { NotesStore } from '../store/notes'
import type { Account } from './space'
import { supabaseBackendFor } from './supabase'
import { SyncEngine, SyncError, type Prefs, type SyncBackend, type SyncHooks, type SyncState } from './sync'

/** Com'è andata l'ultima sincronizzazione, per il pulsante dell'account. */
export type SyncStatus =
  | { kind: 'idle'; at: number | null }
  | { kind: 'syncing' }
  | { kind: 'offline' }
  | { kind: 'auth' }
  | { kind: 'quota'; message: string }
  | { kind: 'error' }

/** Ogni quanto si controllano le novità mentre Glifo è aperto e in primo piano. */
const INTERVAL = 60_000

function withLock<T>(name: string, run: () => Promise<T>): Promise<T> {
  // Una scheda alla volta: le altre aspettano il loro turno.
  const locks = typeof navigator !== 'undefined' ? navigator.locks : undefined
  return locks ? locks.request(name, run) : run()
}

/**
 * Decide quando sincronizzare: all'avvio, quando si torna su Glifo, quando torna la rete,
 * poco dopo ogni modifica e ogni minuto. Senza rete non si ferma niente: le modifiche
 * aspettano e partono dopo.
 */
export class AccountSync {
  status: SyncStatus = { kind: 'idle', at: null }
  private readonly engine: SyncEngine
  private timer = 0
  private interval = 0
  private stopped = false
  private listeners = new Set<(status: SyncStatus) => void>()

  constructor(
    readonly account: Account,
    deps: {
      notes: NotesStore
      folders: FoldersStore
      state: SyncState
      prefs: Prefs
      hooks: SyncHooks
      backend?: SyncBackend
    },
  ) {
    this.engine = new SyncEngine({
      ...deps,
      backend: deps.backend ?? supabaseBackendFor(account.userId),
      lock: (run) => withLock(`glifo-sync-${account.userId}`, run),
    })
  }

  start(): void {
    void this.syncNow()
    window.addEventListener('online', () => void this.syncNow())
    document.addEventListener('visibilitychange', () => {
      // Tornando su Glifo si scaricano le novità; lasciandolo si manda quello che resta.
      if (document.visibilityState === 'visible' || this.engine.hasPending()) void this.syncNow()
    })
    this.interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') void this.syncNow()
    }, INTERVAL)
  }

  /** Basta sincronizzare (per esempio uscendo dall'account, mentre la pagina si ricarica). */
  stop(): void {
    this.stopped = true
    clearTimeout(this.timer)
    clearInterval(this.interval)
  }

  /** Dopo una modifica: sincronizza fra qualche secondo (e aspetta ancora se se ne fanno altre). */
  schedule(delay = 3000): void {
    if (this.stopped) return
    clearTimeout(this.timer)
    this.timer = window.setTimeout(() => void this.syncNow(), delay)
  }

  async syncNow(): Promise<void> {
    clearTimeout(this.timer)
    if (this.stopped) return
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      this.setStatus({ kind: 'offline' })
      return
    }
    this.setStatus({ kind: 'syncing' })
    try {
      await this.engine.sync()
      this.setStatus({ kind: 'idle', at: Date.now() })
    } catch (err) {
      const kind = err instanceof SyncError ? err.kind : 'server'
      if (kind !== 'offline') console.warn('Sincronizzazione non riuscita:', err)
      if (kind === 'offline') this.setStatus({ kind: 'offline' })
      else if (kind === 'auth') this.setStatus({ kind: 'auth' })
      else if (kind === 'quota') this.setStatus({ kind: 'quota', message: (err as Error).message })
      else this.setStatus({ kind: 'error' })
    }
  }

  /** Ci sono modifiche fatte qui che l'account non ha ancora? */
  hasPending(): boolean {
    return this.engine.hasPending()
  }

  onStatus(listener: (status: SyncStatus) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private setStatus(status: SyncStatus): void {
    this.status = status
    for (const listener of this.listeners) listener(status)
  }
}
