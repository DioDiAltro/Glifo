import type { SpellLanguage } from './engine'
import type { SpellRequest } from './service'
import { normalizeWord } from './words'

/**
 * Lato pagina del correttore: parla con il worker, ricorda le parole già
 * controllate e avvisa l'editor quando cambia il dizionario personale.
 */

interface Backend {
  request(req: SpellRequest): Promise<unknown>
  dispose(): void
}

/** Il worker non è partito (es. pagina ospitata dove i worker non sono ammessi). */
class WorkerUnavailable extends Error {}

function workerBackend(): Backend {
  const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
  const pending = new Map<number, { resolve(value: unknown): void; reject(err: Error): void }>()
  let nextId = 1
  let answered = false

  worker.addEventListener('message', (ev: MessageEvent<{ id: number; value?: unknown; error?: string }>) => {
    answered = true
    const p = pending.get(ev.data.id)
    if (!p) return
    pending.delete(ev.data.id)
    if (ev.data.error !== undefined) p.reject(new Error(ev.data.error))
    else p.resolve(ev.data.value)
  })
  worker.addEventListener('error', (ev) => {
    ev.preventDefault()
    const err = answered ? new Error(ev.message || 'Errore del correttore') : new WorkerUnavailable()
    for (const p of pending.values()) p.reject(err)
    pending.clear()
  })

  return {
    request: (req) =>
      new Promise((resolve, reject) => {
        const id = nextId++
        pending.set(id, { resolve, reject })
        worker.postMessage({ id, req })
      }),
    dispose: () => worker.terminate(),
  }
}

/** Ripiego senza worker: stesso correttore, caricato nella pagina solo se serve. */
function pageBackend(): Backend {
  const service = import('./service').then((m) => m.createSpellService())
  return {
    request: async (req) => (await service)(req),
    dispose() {},
  }
}

export interface SpellClientOptions {
  /** Lingue da usare; la prima è quella principale. */
  languages: SpellLanguage[]
  personal: string[]
  onError?(err: Error): void
}

export class SpellClient {
  private backend: Backend
  private readonly ready: Promise<void>
  private readonly results = new Map<string, boolean>()
  private readonly inFlight = new Set<string>()
  private readonly listeners = new Set<() => void>()
  /** Cresce a ogni cambio del dizionario personale: i risultati vecchi si scartano. */
  private generation = 0
  private failed = false

  constructor(private readonly options: SpellClientOptions) {
    try {
      this.backend = workerBackend()
    } catch {
      this.backend = pageBackend()
    }
    this.ready = this.start()
    this.ready.catch(() => {})
  }

  private async start(): Promise<void> {
    const init: SpellRequest = { type: 'init', languages: this.options.languages, personal: this.options.personal }
    try {
      try {
        await this.backend.request(init)
      } catch (err) {
        if (!(err instanceof WorkerUnavailable)) throw err
        this.backend.dispose()
        this.backend = pageBackend()
        await this.backend.request(init)
      }
    } catch (err) {
      this.failed = true
      this.options.onError?.(err instanceof Error ? err : new Error(String(err)))
      throw err
    }
  }

  /** true o false se la parola è già stata controllata, undefined se non ancora. */
  status(word: string): boolean | undefined {
    return this.results.get(normalizeWord(word))
  }

  /** Controlla le parole mai viste; restituisce true se sono arrivati risultati nuovi. */
  async check(words: string[]): Promise<boolean> {
    if (this.failed) return false
    const fresh = [...new Set(words.map(normalizeWord))].filter((w) => !this.results.has(w) && !this.inFlight.has(w))
    if (!fresh.length) return false
    const generation = this.generation
    for (const w of fresh) this.inFlight.add(w)
    try {
      await this.ready
      const wrong = new Set((await this.backend.request({ type: 'check', words: fresh })) as string[])
      if (generation !== this.generation) return false
      for (const w of fresh) this.results.set(w, !wrong.has(w))
      return true
    } catch {
      // Correttore non disponibile: semplicemente non si segna nulla.
      return false
    } finally {
      for (const w of fresh) this.inFlight.delete(w)
    }
  }

  async suggest(word: string): Promise<string[]> {
    try {
      await this.ready
      return (await this.backend.request({ type: 'suggest', word })) as string[]
    } catch {
      return []
    }
  }

  /** Aggiorna il dizionario personale e fa ricontrollare tutto. */
  setPersonalWords(words: string[]): void {
    this.generation++
    this.results.clear()
    this.ready
      .then(() => this.backend.request({ type: 'personal', words }))
      .then(
        () => this.notify(),
        () => {},
      )
  }

  /** Avvisa quando le parole vanno ricontrollate; restituisce la funzione per smettere. */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify(): void {
    for (const listener of this.listeners) listener()
  }

  dispose(): void {
    this.listeners.clear()
    this.backend.dispose()
  }
}
