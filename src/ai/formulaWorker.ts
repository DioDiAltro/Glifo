/**
 * Il worker del lettore delle formule della lavagna: pix2text-mfr con onnxruntime-web (WebAssembly, sul
 * processore, un thread solo), fuori dalla pagina, così mentre legge la lavagna non si blocca. Parla con
 * src/ai/formulaReader.ts (i messaggi sono `ToReader` e `FromReader` di src/ai/formulaModel.ts). La prima
 * volta scarica il modello da Hugging Face e la libreria dal sito di Glifo e li tiene nella Cache Storage
 * (`READER_CACHE`): dopo funziona anche offline.
 *
 * Come il worker di «Spiegami» non scrive testi: i suoi errori sono codici che la pagina scrive nella sua lingua.
 */
import * as ort from 'onnxruntime-web/wasm'
import { IMAGE_SIZE, READER_CACHE, READER_DOWNLOAD, READER_FILES, readerFileUrl, type FromReader, type ReaderErrorCode, type ToReader } from './formulaModel'
import { greedy, lastArgmax, textOf, vocabularyFrom, type Vocabulary } from './formulaTokens'

const scope = self as unknown as { postMessage(msg: FromReader): void; addEventListener(type: 'message', fn: (ev: MessageEvent<ToReader>) => void): void; location: Location }
const post = (msg: FromReader) => scope.postMessage(msg)

class ReaderError extends Error {
  constructor(
    readonly code: ReaderErrorCode,
    detail = '',
  ) {
    super(detail || code)
  }
}

interface Model {
  encoder: ort.InferenceSession
  decoder: ort.InferenceSession
  vocabulary: Vocabulary
}

let model: Promise<Model> | null = null

/** Un file dalla cache del lettore o, la prima volta, dalla rete (e poi nella cache); `onBytes` conta quello che arriva. */
async function cached(url: string, onBytes: (n: number) => void): Promise<ArrayBuffer> {
  const cache = await caches.open(READER_CACHE)
  const hit = await cache.match(url)
  if (hit) {
    const data = await hit.arrayBuffer()
    onBytes(data.byteLength)
    return data
  }
  let res: Response
  try {
    res = await fetch(url)
  } catch (err) {
    throw new ReaderError('offline', String(err))
  }
  if (!res.ok || !res.body) throw new ReaderError('offline', `${res.status} ${url}`)
  const parts: Uint8Array[] = []
  const reader = res.body.getReader()
  for (;;) {
    let chunk: ReadableStreamReadResult<Uint8Array>
    try {
      chunk = await reader.read()
    } catch (err) {
      throw new ReaderError('offline', String(err))
    }
    if (chunk.done) break
    parts.push(chunk.value)
    onBytes(chunk.value.byteLength)
  }
  const data = new Uint8Array(parts.reduce((n, p) => n + p.byteLength, 0))
  let at = 0
  for (const p of parts) {
    data.set(p, at)
    at += p.byteLength
  }
  try {
    await cache.put(url, new Response(data, { headers: { 'content-type': 'application/octet-stream' } }))
  } catch (err) {
    if (err instanceof DOMException && err.name === 'QuotaExceededError') throw new ReaderError('no-space', err.message)
    throw err
  }
  return data.buffer
}

/** Scarica (la prima volta) e prepara il modello; l'avanzamento va alla pagina con `id`. */
async function load(id: number, engine: string): Promise<Model> {
  let loaded = 0
  let shown = 0
  const count = (n: number) => {
    loaded += n
    const now = Date.now()
    if (now - shown < 150) return
    shown = now
    post({ id, type: 'progress', loaded: Math.min(loaded, READER_DOWNLOAD), total: READER_DOWNLOAD })
  }
  const [wasm, tokenizer, decoder, encoder] = await Promise.all([
    cached(new URL(engine, scope.location.href).href, count),
    ...READER_FILES.map((f) => cached(readerFileUrl(f.name), count)),
  ])
  post({ id, type: 'progress', loaded: READER_DOWNLOAD, total: READER_DOWNLOAD })
  ort.env.wasm.wasmBinary = wasm
  // Senza le intestazioni COOP/COEP il browser non dà la memoria condivisa: un thread solo.
  ort.env.wasm.numThreads = 1
  const options: ort.InferenceSession.SessionOptions = { executionProviders: ['wasm'], graphOptimizationLevel: 'all' }
  const vocabulary = vocabularyFrom(JSON.parse(new TextDecoder().decode(tokenizer)) as Parameters<typeof vocabularyFrom>[0])
  return {
    encoder: await ort.InferenceSession.create(new Uint8Array(encoder), options),
    decoder: await ort.InferenceSession.create(new Uint8Array(decoder), options),
    vocabulary,
  }
}

/** Legge una formula: l'immagine dà gli stati del codificatore, poi un token alla volta il più probabile. */
async function read(pixels: Float32Array): Promise<{ text: string; ms: number }> {
  if (!model) throw new ReaderError('not-ready')
  const m = await model
  const start = performance.now()
  const image = new ort.Tensor('float32', pixels, [1, 3, IMAGE_SIZE, IMAGE_SIZE])
  const hidden = (await m.encoder.run({ pixel_values: image })).last_hidden_state
  const ids = await greedy(async (sofar) => {
    const input = new ort.Tensor('int64', BigInt64Array.from(sofar, (n) => BigInt(n)), [1, sofar.length])
    const logits = (await m.decoder.run({ input_ids: input, encoder_hidden_states: hidden })).logits
    const data = logits.data as Float32Array
    return lastArgmax(data, data.length / sofar.length)
  })
  return { text: textOf(ids, m.vocabulary), ms: Math.round(performance.now() - start) }
}

scope.addEventListener('message', (ev) => {
  const msg = ev.data
  const run: Promise<{ text?: string; ms?: number }> = msg.type === 'load' ? (model ??= load(msg.id, msg.engine)).then(() => ({})) : read(msg.pixels)
  run.then(
    (value) => post({ id: msg.id, type: 'done', ...value }),
    (err: unknown) => {
      // Uno scaricamento fallito si riprova dall'inizio (i file già arrivati restano nella cache).
      if (msg.type === 'load') model = null
      const code = err instanceof ReaderError ? err.code : 'failed'
      post({ id: msg.id, type: 'error', code, detail: err instanceof Error ? err.message : String(err) })
    },
  )
})
