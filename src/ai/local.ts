/**
 * Lato pagina del modello nel browser: parla con il worker di WebLLM (src/ai/llmWorker.ts), che si
 * avvia solo la prima volta che serve (con il worker si scaricano anche i 6 MB di WebLLM). Il worker
 * tiene il modello caricato sulla scheda grafica tra una spiegazione e l'altra.
 */
import { GLIFO_ERROR, localModel, type ChatMessage, type ChatOptions, type FromWorker, type LoadProgress, type ToWorker } from './localModels'

export type { ChatMessage, ChatOptions, LoadProgress } from './localModels'

/** Il messaggio per chi usa Glifo, dall'errore di WebLLM o del browser. */
export function localErrorMessage(name: string, message: string): string {
  if (name === GLIFO_ERROR) return message
  if (name === 'ContextWindowSizeExceededError' || /context window/i.test(message)) {
    return 'La spiegazione è diventata troppo lunga per il modello nel browser: riprova, o scegli un modello più grande nelle impostazioni.'
  }
  if (name === 'QuotaExceededError' || /quota|storage.*(full|exceed)/i.test(message)) {
    return 'Nel browser non c\'è abbastanza spazio per il modello: liberane un po\' o scegli un modello più piccolo nelle impostazioni.'
  }
  if (/failed to fetch|networkerror|network error|load failed|fetch.*fail/i.test(message)) {
    return 'Non riesco a scaricare il modello: serve la connessione, almeno la prima volta (poi resta nel browser e funziona anche offline).'
  }
  if (/device.*lost|out of memory|oom\b|allocat|exceeds.*(limit|max)|maxStorageBufferBindingSize/i.test(message)) {
    return 'La scheda grafica non ce la fa con questo modello: scegli un modello più piccolo nelle impostazioni.'
  }
  if (/webgpu|navigator\.gpu|adapter/i.test(message)) {
    return 'Il modello nel browser ha bisogno di WebGPU, che qui non funziona: prova con Chrome o Edge aggiornati, su un computer.'
  }
  return `Il modello nel browser si è fermato: ${message || name || 'errore sconosciuto'}`
}

/** Fermato con «Annulla». */
export class LocalAbort extends Error {
  constructor() {
    super('Annullato')
    this.name = 'AbortError'
  }
}

interface Pending {
  resolve(value: string): void
  reject(err: Error): void
  onProgress?(p: LoadProgress): void
  onDelta?(text: string): void
}

/** Il worker vero; nei test (e nelle prove nel browser) si può dare un altro oggetto con la stessa forma. */
export type WorkerLike = Pick<Worker, 'postMessage' | 'addEventListener' | 'terminate'>

export class LocalLlm {
  private worker: WorkerLike | null = null
  private readonly pending = new Map<number, Pending>()
  private nextId = 1
  /** Il modello caricato (il nome per WebLLM, per esempio Qwen3-1.7B-q4f16_1-MLC), se c'è. */
  loaded: string | null = null

  constructor(private readonly start: () => WorkerLike = () => new Worker(new URL('./llmWorker.ts', import.meta.url), { type: 'module' })) {}

  private ensure(): WorkerLike {
    if (this.worker) return this.worker
    const worker = this.start()
    worker.addEventListener('message', (ev: Event) => this.receive((ev as MessageEvent<FromWorker>).data))
    worker.addEventListener('error', (ev: Event) => {
      ev.preventDefault?.()
      const err = new Error(localErrorMessage('', (ev as ErrorEvent).message || 'il worker non è partito'))
      for (const p of this.pending.values()) p.reject(err)
      this.pending.clear()
      this.worker?.terminate()
      this.worker = null
      this.loaded = null
    })
    this.worker = worker
    return worker
  }

  private receive(msg: FromWorker): void {
    const p = this.pending.get(msg.id)
    if (!p) return
    if (msg.type === 'progress') p.onProgress?.({ progress: msg.progress, text: msg.text })
    else if (msg.type === 'delta') p.onDelta?.(msg.text)
    else {
      this.pending.delete(msg.id)
      if (msg.type === 'done') p.resolve(msg.value ?? '')
      else p.reject(new Error(localErrorMessage(msg.name, msg.message)))
    }
  }

  private request(build: (id: number) => ToWorker, extra: Omit<Pending, 'resolve' | 'reject'> = {}): Promise<string> {
    const worker = this.ensure()
    const id = this.nextId++
    return new Promise<string>((resolve, reject) => {
      this.pending.set(id, { resolve, reject, ...extra })
      worker.postMessage(build(id))
    })
  }

  /** Scarica il modello (la prima volta) e lo carica sulla scheda grafica; restituisce il nome per WebLLM. */
  async load(model: string, onProgress?: (p: LoadProgress) => void): Promise<string> {
    const id = localModel(model).id
    if (this.loaded?.startsWith(`${id}-`)) return this.loaded
    this.loaded = null
    this.loaded = await this.request((n) => ({ type: 'load', id: n, model: id }), { onProgress })
    return this.loaded
  }

  /** Una risposta del modello caricato, pezzo per pezzo in `onDelta`. Con `signal` si ferma. */
  chat(messages: ChatMessage[], options: ChatOptions = {}, onDelta?: (text: string) => void, signal?: AbortSignal): Promise<string> {
    if (signal?.aborted) return Promise.reject(new LocalAbort())
    const answer = this.request((n) => ({ type: 'chat', id: n, messages, options }), { onDelta })
    if (!signal) return answer
    return new Promise<string>((resolve, reject) => {
      const stop = () => {
        this.worker?.postMessage({ type: 'stop' } satisfies ToWorker)
        reject(new LocalAbort())
      }
      signal.addEventListener('abort', stop, { once: true })
      answer.then(resolve, reject).finally(() => signal.removeEventListener('abort', stop))
    })
  }

  /** Toglie il modello da questo browser (i pesi, la libreria e la configurazione). */
  async remove(model: string): Promise<void> {
    const id = localModel(model).id
    await this.request((n) => ({ type: 'remove', id: n, model: id }))
    if (this.loaded?.startsWith(`${id}-`)) this.loaded = null
  }
}

/** Uno solo per tutta la pagina: il modello resta caricato tra una spiegazione e l'altra. */
let shared: LocalLlm | null = null
export function localLlm(): LocalLlm {
  return (shared ??= new LocalLlm())
}
