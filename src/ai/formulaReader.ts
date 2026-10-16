/**
 * Lato pagina del lettore delle formule della lavagna: parla con il worker di src/ai/formulaWorker.ts, che
 * si avvia solo la prima volta che serve e tiene il modello pronto tra una lettura e l'altra.
 */
import engineUrl from 'onnxruntime-web/ort-wasm-simd-threaded.wasm?url'
import { texts } from '../i18n'
import { READER_CACHE, READER_FILES, readerFileUrl, type FromReader, type ReaderErrorCode, type ToReader } from './formulaModel'

const T = texts({
  offline: [
    'Non riesco a scaricare il lettore: serve la connessione, almeno la prima volta (poi resta nel browser e funziona anche offline).',
    'Can\'t download the reader: you need a connection, at least the first time (then it stays in the browser and works offline too).',
  ],
  noSpace: ['Nel browser non c\'è abbastanza spazio per il lettore: liberane un po\' e riprova.', 'There isn\'t enough space in the browser for the reader: free some up and try again.'],
  notReady: ['Il lettore non è ancora pronto.', 'The reader isn\'t ready yet.'],
  stopped: (reason: string) => [`Il lettore si è fermato: ${reason}`, `The reader stopped: ${reason}`],
  workerFailed: ['il worker non è partito', 'the worker didn\'t start'],
})

/** Il messaggio di un errore del lettore, nella lingua di Glifo. */
export function readerErrorMessage(code: ReaderErrorCode, detail: string): string {
  if (code === 'offline') return T.offline
  if (code === 'no-space') return T.noSpace
  if (code === 'not-ready') return T.notReady
  return T.stopped(detail)
}

/** Il worker vero; nei test si può dare un altro oggetto con la stessa forma. */
export type WorkerLike = Pick<Worker, 'postMessage' | 'addEventListener' | 'terminate'>

export interface ReadProgress {
  loaded: number
  total: number
}

interface Pending {
  resolve(value: { text: string; ms: number }): void
  reject(err: Error): void
  onProgress?(p: ReadProgress): void
}

export class FormulaReader {
  private worker: WorkerLike | null = null
  private readonly pending = new Map<number, Pending>()
  private nextId = 1
  /** Il modello è pronto nel worker. */
  ready = false

  constructor(private readonly start: () => WorkerLike = () => new Worker(new URL('./formulaWorker.ts', import.meta.url), { type: 'module' })) {}

  private ensure(): WorkerLike {
    if (this.worker) return this.worker
    const worker = this.start()
    worker.addEventListener('message', (ev: Event) => this.receive((ev as MessageEvent<FromReader>).data))
    worker.addEventListener('error', (ev: Event) => {
      ev.preventDefault?.()
      const err = new Error(T.stopped((ev as ErrorEvent).message || T.workerFailed))
      for (const p of this.pending.values()) p.reject(err)
      this.pending.clear()
      this.worker?.terminate()
      this.worker = null
      this.ready = false
    })
    this.worker = worker
    return worker
  }

  private receive(msg: FromReader): void {
    const p = this.pending.get(msg.id)
    if (!p) return
    if (msg.type === 'progress') {
      p.onProgress?.({ loaded: msg.loaded, total: msg.total })
      return
    }
    this.pending.delete(msg.id)
    if (msg.type === 'done') p.resolve({ text: msg.text ?? '', ms: msg.ms ?? 0 })
    else p.reject(new Error(readerErrorMessage(msg.code, msg.detail)))
  }

  private request(build: (id: number) => ToReader, onProgress?: (p: ReadProgress) => void, transfer: Transferable[] = []): Promise<{ text: string; ms: number }> {
    const worker = this.ensure()
    const id = this.nextId++
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, onProgress })
      worker.postMessage(build(id), transfer)
    })
  }

  /** Scarica il modello (la prima volta) e lo prepara. */
  async load(onProgress?: (p: ReadProgress) => void): Promise<void> {
    if (this.ready) return
    await this.request((id) => ({ type: 'load', id, engine: engineUrl }), onProgress)
    this.ready = true
  }

  /** Il LaTeX della formula nell'immagine (come la scrive il modello: va pulito con `tidyLatex`) e quanto ci ha messo. */
  read(pixels: Float32Array): Promise<{ text: string; ms: number }> {
    return this.request((id) => ({ type: 'read', id, pixels }), undefined, [pixels.buffer])
  }
}

/** Uno solo per tutta la pagina: il modello resta pronto tra una lettura e l'altra. */
let shared: FormulaReader | null = null
export function formulaReader(): FormulaReader {
  return (shared ??= new FormulaReader())
}

/** Il lettore è già tutto in questo browser? Lo dice la sua cache, senza scaricare niente. */
export async function readerInBrowser(): Promise<boolean> {
  try {
    if (typeof caches === 'undefined' || !(await caches.has(READER_CACHE))) return false
    const cache = await caches.open(READER_CACHE)
    const urls = [new URL(engineUrl, location.href).href, ...READER_FILES.map((f) => readerFileUrl(f.name))]
    for (const url of urls) if (!(await cache.match(url))) return false
    return true
  } catch {
    return false
  }
}
