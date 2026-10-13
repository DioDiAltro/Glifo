/**
 * Lato pagina del modello nel browser: parla con il worker di WebLLM (src/ai/llmWorker.ts), che si
 * avvia solo la prima volta che serve (con il worker si scaricano anche i 6 MB di WebLLM). Il worker
 * tiene il modello caricato sulla scheda grafica tra una spiegazione e l'altra.
 */
import { texts } from '../i18n'
import { GLIFO_ERROR, localModel, variantsOf, type ChatMessage, type ChatOptions, type FromWorker, type GlifoErrorCode, type LoadProgress, type ToWorker } from './localModels'

export type { ChatMessage, ChatOptions, LoadProgress } from './localModels'

// I messaggi per chi usa Glifo: anche quelli degli errori del worker, che manda solo un codice (vedi GLIFO_ERROR).
const T = texts({
  noWebgpu: [
    'Questo browser non ha WebGPU, che serve per far girare il modello sul dispositivo: prova con Chrome o Edge aggiornati, su un computer.',
    'This browser doesn\'t have WebGPU, which is needed to run the model on your device: try an up-to-date Chrome or Edge, on a computer.',
  ],
  noGpu: ['WebGPU c\'è, ma non trova una scheda grafica da usare su questo dispositivo.', 'WebGPU is there, but it can\'t find a graphics card to use on this device.'],
  unknownModel: (model: string) => [`Il modello ${model} non c'è in questa versione di WebLLM.`, `The model ${model} isn't in this version of WebLLM.`],
  needsF16: (model: string) => [
    `${model} ha bisogno di una scheda grafica che sa fare i conti a 16 bit, e questa non li sa fare: scegli un altro modello nelle impostazioni.`,
    `${model} needs a graphics card that can do 16-bit math, and this one can't: choose another model in Settings.`,
  ],
  notReady: ['Il modello non è ancora pronto.', 'The model isn\'t ready yet.'],
  tooLong: [
    'La spiegazione è diventata troppo lunga per il modello nel browser: riprova, o scegli un modello più grande nelle impostazioni.',
    'The explanation got too long for the model in your browser: try again, or choose a bigger model in Settings.',
  ],
  noSpace: [
    'Nel browser non c\'è abbastanza spazio per il modello: liberane un po\' o scegli un modello più piccolo nelle impostazioni.',
    'There isn\'t enough space in the browser for the model: free some up or choose a smaller model in Settings.',
  ],
  offline: [
    'Non riesco a scaricare il modello: serve la connessione, almeno la prima volta (poi resta nel browser e funziona anche offline).',
    'Can\'t download the model: you need a connection, at least the first time (then it stays in the browser and works offline too).',
  ],
  gpuTooSmall: [
    'La scheda grafica non ce la fa con questo modello: scegli un modello più piccolo nelle impostazioni.',
    'The graphics card can\'t handle this model: choose a smaller model in Settings.',
  ],
  needsWebgpu: [
    'Il modello nel browser ha bisogno di WebGPU, che qui non funziona: prova con Chrome o Edge aggiornati, su un computer.',
    'The model in your browser needs WebGPU, which doesn\'t work here: try an up-to-date Chrome or Edge, on a computer.',
  ],
  stopped: (reason: string) => [`Il modello nel browser si è fermato: ${reason}`, `The model in your browser stopped: ${reason}`],
  unknownError: ['errore sconosciuto', 'unknown error'],
  workerFailed: ['il worker non è partito', 'the worker didn\'t start'],
  cancelled: ['Annullato', 'Cancelled'],
})

/** Il messaggio di un errore del worker (un codice, vedi `GLIFO_ERROR`); null se il codice non si conosce. */
function glifoError(message: string): string | null {
  const space = message.indexOf(' ')
  const code = (space < 0 ? message : message.slice(0, space)) as GlifoErrorCode
  const detail = space < 0 ? '' : message.slice(space + 1)
  switch (code) {
    case 'no-webgpu':
      return T.noWebgpu
    case 'no-gpu':
      return T.noGpu
    case 'unknown-model':
      return T.unknownModel(detail)
    case 'not-ready':
      return T.notReady
    case 'needs-f16':
      return T.needsF16(detail)
    default:
      return null
  }
}

/** Il messaggio per chi usa Glifo, dall'errore di WebLLM o del browser, nella lingua di Glifo. */
export function localErrorMessage(name: string, message: string): string {
  // Un errore del worker con un messaggio che non è un codice (un worker di prima): com'è.
  if (name === GLIFO_ERROR) return glifoError(message) ?? message
  if (name === 'ContextWindowSizeExceededError' || /context window/i.test(message)) return T.tooLong
  if (name === 'QuotaExceededError' || /quota|storage.*(full|exceed)/i.test(message)) return T.noSpace
  if (/failed to fetch|networkerror|network error|load failed|fetch.*fail/i.test(message)) return T.offline
  if (/device.*lost|out of memory|oom\b|allocat|exceeds.*(limit|max)|maxStorageBufferBindingSize/i.test(message)) return T.gpuTooSmall
  if (/webgpu|navigator\.gpu|adapter/i.test(message)) return T.needsWebgpu
  return T.stopped(message || name || T.unknownError)
}

/** Fermato con «Annulla». */
export class LocalAbort extends Error {
  constructor() {
    super(T.cancelled)
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
      const err = new Error(localErrorMessage('', (ev as ErrorEvent).message || T.workerFailed))
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
    const chosen = localModel(model)
    if (this.loaded && variantsOf(chosen).includes(this.loaded)) return this.loaded
    this.loaded = null
    this.loaded = await this.request((n) => ({ type: 'load', id: n, model: chosen.id }), { onProgress })
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

  /** Toglie un modello da questo browser (i pesi, la libreria e la configurazione): le sue varianti, con i nomi per WebLLM. */
  async remove(models: string[]): Promise<void> {
    await this.request((n) => ({ type: 'remove', id: n, models }))
    if (this.loaded && models.includes(this.loaded)) this.loaded = null
  }
}

/** Uno solo per tutta la pagina: il modello resta caricato tra una spiegazione e l'altra. */
let shared: LocalLlm | null = null
export function localLlm(): LocalLlm {
  return (shared ??= new LocalLlm())
}
