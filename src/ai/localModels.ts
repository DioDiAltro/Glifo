/**
 * I modelli che girano nel browser, con WebLLM sulla scheda grafica (WebGPU), per le spiegazioni
 * (src/ai/explain.ts). Si scaricano da Hugging Face la prima volta e poi restano nel browser (nella Cache
 * Storage, come li tiene WebLLM): niente chiave, niente costi, e la nota non esce dal dispositivo.
 *
 * L'elenco è ragionato (13 ottobre 2026, GRAFICA.md punto 4) e diviso dalle prove con Glifo (14 ottobre):
 * i consigliati e gli sconsigliati sono provati con Glifo; i non certificati no, e quelli meno adatti
 * (versioni di prima, per il codice, quasi solo in inglese) stanno nelle avanzate. Ci sono solo i modelli
 * di WebLLM con cui si chatta, che leggono almeno 4096 token
 * e hanno una licenza che va bene anche con Glifo a pagamento: quelli lasciati fuori, con il perché, sono
 * in tests/localModel.test.ts. La memoria e il contesto li dice WebLLM (`__WEBLLM_MODELS__`, da
 * vite.config.ts), il peso l'elenco dei pezzi del modello (tensor-cache.json): non si scrivono a mano.
 *
 * Qui l'elenco, i nomi e i messaggi tra la pagina e il worker: WebLLM sta nel worker
 * (src/ai/llmWorker.ts), che si carica solo quando serve.
 */
import { texts } from '../i18n'

// Le etichette dei consigliati nelle impostazioni (src/ui/settings.ts).
const T = texts({
  recommended: ['consigliato', 'recommended'],
  better: ['più bravo', 'more capable'],
  best: ['il più bravo, per schede grafiche potenti', 'the most capable, for powerful graphics cards'],
  uncompressed: ['senza compressione', 'uncompressed'],
})

/** Quello che la pagina sa dei modelli di WebLLM: il nome, la memoria della scheda grafica (MB) e il contesto (token). */
export interface WebllmModel {
  id: string
  vram: number
  context: number
}

declare const __WEBLLM_MODELS__: WebllmModel[]

/** Il contesto delle spiegazioni (src/ai/explain.ts): i modelli che leggono meno token non ci sono. */
export const CONTEXT_TOKENS = 4096

/**
 * Dove sta il modello nell'elenco: consigliato o sconsigliato (provati con Glifo, GRAFICA.md punto 4), o non
 * certificato, tra quelli che si vedono sempre (`other`) o nelle avanzate (`all`).
 */
export type ModelGroup = 'recommended' | 'discouraged' | 'other' | 'all'

export type LicenseId = 'apache' | 'mit' | 'llama2' | 'llama3' | 'llama3.1' | 'llama3.2' | 'gemma'

const LLAMA = 'https://github.com/meta-llama/llama-models/blob/main/models'

/**
 * Le licenze dei modelli, con dove leggerle e la scritta che chiedono di mostrare (in inglese, com'è nella
 * licenza): «Built with Llama» per i Llama 3.1 e 3.2, l'avviso per Gemma.
 */
export const MODEL_LICENSES: Readonly<Record<LicenseId, { name: string; url: string; notice?: string }>> = {
  apache: { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0' },
  mit: { name: 'MIT', url: 'https://opensource.org/license/mit' },
  llama2: { name: 'Llama 2 Community License', url: `${LLAMA}/llama2/LICENSE` },
  llama3: { name: 'Meta Llama 3 Community License', url: `${LLAMA}/llama3/LICENSE`, notice: 'Built with Meta Llama 3' },
  'llama3.1': { name: 'Llama 3.1 Community License', url: `${LLAMA}/llama3_1/LICENSE`, notice: 'Built with Llama' },
  'llama3.2': { name: 'Llama 3.2 Community License', url: `${LLAMA}/llama3_2/LICENSE`, notice: 'Built with Llama' },
  gemma: {
    name: 'Gemma Terms of Use',
    url: 'https://ai.google.dev/gemma/terms',
    notice: 'Gemma is provided under and subject to the Gemma Terms of Use found at ai.google.dev/gemma/terms',
  },
}

/** Una riga dell'elenco: il nome di WebLLM senza la quantizzazione e quello che WebLLM non dice. */
interface Family {
  base: string
  name: string
  group: ModelGroup
  license: LicenseId
  /** Per i consigliati: come va rispetto agli altri. */
  hint?: 'recommended' | 'better' | 'best'
  /** Sa chiedere i conti al motore con <tool_call> (src/ai/tools.ts): i Qwen dal 2.5 in poi e gli Hermes. */
  tools?: true
  /** Ragiona (<think>) se non glielo si spegne: i Qwen3 e i Qwen3.5 (`enable_thinking` nel worker). */
  thinking?: true
  /** Scrive quasi solo in inglese. */
  english?: true
}

const FAMILIES: readonly Family[] = [
  // Consigliati: provati con Glifo il 14 ottobre 2026, arrivano al risultato (GRAFICA.md punto 4).
  { base: 'Qwen3-1.7B', name: 'Qwen3 1.7B', group: 'recommended', hint: 'recommended', license: 'apache', tools: true, thinking: true },
  { base: 'Qwen3.5-2B', name: 'Qwen3.5 2B', group: 'recommended', license: 'apache', tools: true, thinking: true },
  { base: 'Qwen3-4B', name: 'Qwen3 4B', group: 'recommended', license: 'apache', tools: true, thinking: true },
  { base: 'Qwen3.5-4B', name: 'Qwen3.5 4B', group: 'recommended', hint: 'better', license: 'apache', tools: true, thinking: true },
  { base: 'Qwen3-8B', name: 'Qwen3 8B', group: 'recommended', hint: 'best', license: 'apache', tools: true, thinking: true },
  { base: 'Qwen3.5-9B', name: 'Qwen3.5 9B', group: 'recommended', license: 'apache', tools: true, thinking: true },
  // Sconsigliati: provati con Glifo, non sono mai arrivati al risultato.
  { base: 'Qwen3-0.6B', name: 'Qwen3 0.6B', group: 'discouraged', license: 'apache', tools: true, thinking: true },
  { base: 'Qwen3.5-0.8B', name: 'Qwen3.5 0.8B', group: 'discouraged', license: 'apache', tools: true, thinking: true },
  { base: 'Llama-3.2-1B-Instruct', name: 'Llama 3.2 1B', group: 'discouraged', license: 'llama3.2' },
  // Non certificati: i più nuovi delle altre famiglie, che scrivono anche in italiano.
  { base: 'Llama-3.2-3B-Instruct', name: 'Llama 3.2 3B', group: 'other', license: 'llama3.2' },
  { base: 'Llama-3.1-8B-Instruct', name: 'Llama 3.1 8B', group: 'other', license: 'llama3.1' },
  { base: 'Hermes-3-Llama-3.2-3B', name: 'Hermes 3 3B', group: 'other', license: 'llama3.2', tools: true },
  { base: 'Hermes-3-Llama-3.1-8B', name: 'Hermes 3 8B', group: 'other', license: 'llama3.1', tools: true },
  { base: 'gemma-2-2b-it', name: 'Gemma 2 2B', group: 'other', license: 'gemma' },
  { base: 'gemma-2-9b-it', name: 'Gemma 2 9B', group: 'other', license: 'gemma' },
  { base: 'Phi-4-mini-instruct', name: 'Phi-4 mini', group: 'other', license: 'mit' },
  { base: 'Ministral-3-3B-Instruct-2512-BF16', name: 'Ministral 3 3B', group: 'other', license: 'apache' },
  { base: 'Mistral-7B-Instruct-v0.3', name: 'Mistral 7B v0.3', group: 'other', license: 'apache' },
  { base: 'Qwen2.5-1.5B-Instruct', name: 'Qwen2.5 1.5B', group: 'other', license: 'apache', tools: true },
  { base: 'Qwen2.5-7B-Instruct', name: 'Qwen2.5 7B', group: 'other', license: 'apache', tools: true },
  // Non certificati, nelle avanzate: le versioni di prima, quelli per il codice o per i conti, quelli quasi solo in inglese.
  { base: 'Qwen2.5-0.5B-Instruct', name: 'Qwen2.5 0.5B', group: 'all', license: 'apache', tools: true },
  { base: 'Qwen2.5-Coder-0.5B-Instruct', name: 'Qwen2.5 Coder 0.5B', group: 'all', license: 'apache', tools: true },
  { base: 'Qwen2.5-Coder-1.5B-Instruct', name: 'Qwen2.5 Coder 1.5B', group: 'all', license: 'apache', tools: true },
  { base: 'Qwen2.5-Coder-7B-Instruct', name: 'Qwen2.5 Coder 7B', group: 'all', license: 'apache', tools: true },
  { base: 'Qwen2.5-Math-1.5B-Instruct', name: 'Qwen2.5 Math 1.5B', group: 'all', license: 'apache', english: true },
  { base: 'Qwen2-0.5B-Instruct', name: 'Qwen2 0.5B', group: 'all', license: 'apache' },
  { base: 'Qwen2-1.5B-Instruct', name: 'Qwen2 1.5B', group: 'all', license: 'apache' },
  { base: 'Qwen2-7B-Instruct', name: 'Qwen2 7B', group: 'all', license: 'apache' },
  { base: 'Qwen2-Math-1.5B-Instruct', name: 'Qwen2 Math 1.5B', group: 'all', license: 'apache', english: true },
  { base: 'Qwen2-Math-7B-Instruct', name: 'Qwen2 Math 7B', group: 'all', license: 'apache', english: true },
  { base: 'Llama-3.1-70B-Instruct', name: 'Llama 3.1 70B', group: 'all', license: 'llama3.1' },
  { base: 'Llama-3-8B-Instruct', name: 'Llama 3 8B', group: 'all', license: 'llama3', english: true },
  { base: 'Llama-3-70B-Instruct', name: 'Llama 3 70B', group: 'all', license: 'llama3', english: true },
  { base: 'Llama-2-7b-chat-hf', name: 'Llama 2 7B', group: 'all', license: 'llama2', english: true },
  { base: 'Llama-2-13b-chat-hf', name: 'Llama 2 13B', group: 'all', license: 'llama2', english: true },
  { base: 'Hermes-2-Pro-Llama-3-8B', name: 'Hermes 2 Pro 8B', group: 'all', license: 'llama3', tools: true },
  { base: 'Hermes-2-Theta-Llama-3-8B', name: 'Hermes 2 Theta 8B', group: 'all', license: 'llama3', tools: true },
  { base: 'Hermes-2-Pro-Mistral-7B', name: 'Hermes 2 Pro 7B', group: 'all', license: 'apache', tools: true },
  { base: 'OpenHermes-2.5-Mistral-7B', name: 'OpenHermes 2.5 7B', group: 'all', license: 'apache' },
  { base: 'NeuralHermes-2.5-Mistral-7B', name: 'NeuralHermes 2.5 7B', group: 'all', license: 'apache' },
  { base: 'Mistral-7B-Instruct-v0.2', name: 'Mistral 7B v0.2', group: 'all', license: 'apache' },
  { base: 'gemma3-1b-it', name: 'Gemma 3 1B', group: 'all', license: 'gemma', english: true },
  { base: 'gemma-2b-it', name: 'Gemma 1 2B', group: 'all', license: 'gemma', english: true },
  { base: 'Phi-3.5-mini-instruct', name: 'Phi-3.5 mini', group: 'all', license: 'mit' },
  { base: 'Phi-3-mini-4k-instruct', name: 'Phi-3 mini', group: 'all', license: 'mit', english: true },
  { base: 'SmolLM2-135M-Instruct', name: 'SmolLM2 135M', group: 'all', license: 'apache', english: true },
  { base: 'SmolLM2-360M-Instruct', name: 'SmolLM2 360M', group: 'all', license: 'apache', english: true },
  { base: 'SmolLM2-1.7B-Instruct', name: 'SmolLM2 1.7B', group: 'all', license: 'apache', english: true },
  { base: 'OLMo-2-0425-1B-Instruct', name: 'OLMo 2 1B', group: 'all', license: 'apache', english: true },
  { base: 'OLMo-2-1124-7B-Instruct', name: 'OLMo 2 7B', group: 'all', license: 'apache', english: true },
]

/** Una variante per WebLLM: il suo nome e la memoria della scheda grafica che chiede (MB). */
export interface ModelVariant {
  id: string
  vram: number
}

export interface LocalModel {
  /** Il nome nelle impostazioni (salvato in `localModel`): quello di WebLLM senza la quantizzazione, «Qwen3-1.7B». */
  id: string
  /** Il nome breve («Qwen3 1.7B») e quello nell'elenco delle impostazioni («Qwen3 1.7B, consigliato»). */
  name: string
  readonly label: string
  group: ModelGroup
  license: LicenseId
  /** Sa chiedere i conti al motore: senza, Glifo gli dà i conti già fatti (src/ai/explain.ts). */
  tools: boolean
  /** Ha il ragionamento (<think>), che il worker spegne. */
  thinking: boolean
  /** Scrive quasi solo in inglese. */
  english: boolean
  /** Le varianti: con i conti a 16 bit, più leggera, se la scheda li sa fare (shader-f16), e a 32 bit. */
  f16: ModelVariant | null
  f32: ModelVariant | null
}

/** I nomi di WebLLM: «Qwen3-1.7B-q4f16_1-MLC», il modello, la quantizzazione dei pesi e quella dei conti. */
const WEBLLM_NAME = /^(.+)-(q\d)(f16|f32)(?:_1)?-MLC$/

/**
 * L'elenco dai modelli di WebLLM: per ogni riga di `FAMILIES` le varianti con i pesi a 4 bit (q4, le
 * solite) e, se ci sono, quelle senza compressione (q0, più pesanti, nelle avanzate). Una riga senza
 * varianti (WebLLM l'ha tolta) non c'è.
 */
export function catalogFrom(webllm: readonly WebllmModel[]): LocalModel[] {
  const variants = new Map<string, { f16: ModelVariant | null; f32: ModelVariant | null }>()
  for (const m of webllm) {
    const parts = WEBLLM_NAME.exec(m.id)
    if (!parts || m.context < CONTEXT_TOKENS) continue
    const key = `${parts[1]} ${parts[2]}`
    const entry = variants.get(key) ?? { f16: null, f32: null }
    entry[parts[3] as 'f16' | 'f32'] = { id: m.id, vram: m.vram }
    variants.set(key, entry)
  }
  const out: LocalModel[] = []
  for (const f of FAMILIES) {
    const quants = [...variants.keys()].filter((k) => k.startsWith(`${f.base} `)).map((k) => k.slice(f.base.length + 1))
    // Prima i pesi a 4 bit; un modello che non li ha (Llama 3.1 70B, a 3 bit) usa quelli che ha.
    quants.sort((a, b) => (a === 'q4' ? -1 : b === 'q4' ? 1 : b.localeCompare(a)))
    quants.forEach((quant, i) => {
      const own = i === 0
      const hint = own ? f.hint : undefined
      out.push({
        id: own ? f.base : `${f.base}-${quant}`,
        name: own ? f.name : `${f.name} (${T.uncompressed})`,
        get label() {
          return hint ? `${this.name}, ${T[hint]}` : this.name
        },
        group: own ? f.group : 'all',
        license: f.license,
        tools: f.tools ?? false,
        thinking: f.thinking ?? false,
        english: f.english ?? false,
        ...variants.get(`${f.base} ${quant}`)!,
      })
    })
  }
  return out
}

export const LOCAL_MODELS: readonly LocalModel[] = catalogFrom(__WEBLLM_MODELS__)

export const DEFAULT_LOCAL_MODEL = 'Qwen3-1.7B'

export function localModel(id: string): LocalModel {
  return LOCAL_MODELS.find((m) => m.id === id) ?? LOCAL_MODELS.find((m) => m.id === DEFAULT_LOCAL_MODEL)!
}

/** La variante da usare: quella a 16 bit se la scheda sa fare quei conti (shader-f16), se no quella a 32; null se non c'è. */
export function modelVariant(model: LocalModel, f16: boolean): ModelVariant | null {
  return f16 ? (model.f16 ?? model.f32) : model.f32
}

/** Il nome per WebLLM del modello delle impostazioni; null se la scheda non può farlo girare (solo a 16 bit). */
export function webllmId(id: string, f16: boolean): string | null {
  return modelVariant(localModel(id), f16)?.id ?? null
}

/** I nomi per WebLLM delle varianti di un modello. */
export function variantsOf(model: LocalModel): string[] {
  return [model.f16?.id, model.f32?.id].filter((v): v is string => !!v)
}

/** Il modello dell'elenco che ha questa variante per WebLLM; null se non c'è più. */
export function modelOf(webllm: string): LocalModel | null {
  return LOCAL_MODELS.find((m) => m.f16?.id === webllm || m.f32?.id === webllm) ?? null
}

/** Il nome breve da mostrare sopra la spiegazione: «Qwen3 1.7B». */
export function modelName(webllm: string): string {
  return modelOf(webllm)?.name ?? webllm.replace(/-q\d\w*-MLC$/, '').replace(/-/g, ' ')
}

/** Dove WebLLM tiene i pesi di un modello (le chiavi della sua Cache Storage partono da qui). */
export function modelUrl(webllm: string): string {
  return `https://huggingface.co/mlc-ai/${webllm}/resolve/main/`
}

interface Gpu {
  requestAdapter(): Promise<{ features: { has(name: string): boolean } } | null>
}

let f16Check: Promise<boolean | null> | null = null

/**
 * La scheda grafica di questo browser sa fare i conti a 16 bit (shader-f16)? Lo chiede a WebGPU, come il
 * worker, per mostrare nelle impostazioni la memoria della variante giusta. null: non si sa (niente WebGPU).
 */
export function gpuF16(): Promise<boolean | null> {
  f16Check ??= (async () => {
    try {
      const gpu = (globalThis.navigator as (Navigator & { gpu?: Gpu }) | undefined)?.gpu
      const adapter = gpu ? await gpu.requestAdapter() : null
      return adapter ? adapter.features.has('shader-f16') : null
    } catch {
      return null
    }
  })()
  return f16Check
}

interface TensorCache {
  records?: { dataPath: string; nbytes?: number }[]
}

const sizes = new Map<string, Promise<number | null>>()

/**
 * Quanto si scarica di un modello (i byte dei suoi pezzi), dal suo elenco dei pezzi su Hugging Face: un file
 * piccolo, chiesto una volta per pagina. null se non arriva (offline): si riprova la volta dopo.
 */
export function downloadSize(webllm: string): Promise<number | null> {
  let size = sizes.get(webllm)
  if (!size) {
    size = fetch(new URL('tensor-cache.json', modelUrl(webllm)).href)
      .then((r) => (r.ok ? (r.json() as Promise<TensorCache>) : null))
      .then((list) => {
        const bytes = (list?.records ?? []).reduce((n, r) => n + (Number(r.nbytes) || 0), 0)
        return bytes > 0 ? bytes : null
      })
      .catch(() => null)
      .then((bytes) => {
        if (bytes === null) sizes.delete(webllm)
        return bytes
      })
    sizes.set(webllm, size)
  }
  return size
}

/** Un modello che è (anche solo in parte) in questo browser, con quanto pesa: Impostazioni → AI e → Dati. */
export interface DownloadedModel {
  /** Il nome nelle impostazioni (`LocalModel.id`) e quello breve; per un modello che non è più nell'elenco, quelli di WebLLM. */
  id: string
  name: string
  /** Le varianti per WebLLM che ci sono: «Togli» toglie queste. */
  webllm: string[]
  /** I byte dei pezzi già scaricati. */
  bytes: number
  /** Ci sono tutti i pezzi: le spiegazioni funzionano anche offline. */
  complete: boolean
}

const MODEL_LIST = /^https:\/\/huggingface\.co\/mlc-ai\/([^/]+)\/resolve\/main\/tensor-cache\.json$/

/**
 * I modelli di «Spiegami» in questo browser, anche quelli scaricati a metà o che non sono più nell'elenco,
 * con quanto pesano, nell'ordine dell'elenco. Come guarda WebLLM (`hasModelInCache`): l'elenco dei pezzi di
 * ogni variante, tensor-cache.json, dice quali sono e quanto pesa ognuno (`nbytes`), così non si legge
 * niente di grosso. Senza caricare WebLLM: serve alle impostazioni.
 */
export async function modelsInBrowser(): Promise<DownloadedModel[]> {
  if (typeof caches === 'undefined') return []
  try {
    // `open` creerebbe la cache vuota: se WebLLM non l'ha mai aperta, non c'è niente.
    if (typeof caches.has === 'function' && !(await caches.has('webllm/model'))) return []
    const cache = await caches.open('webllm/model')
    const urls = (await cache.keys()).map((r) => r.url)
    const stored = new Set(urls)
    const found = new Map<string, DownloadedModel>()
    for (const url of urls) {
      const webllm = MODEL_LIST.exec(url)?.[1]
      const list = webllm ? await cache.match(url) : undefined
      if (!webllm || !list) continue
      const records = ((await list.json()) as TensorCache).records ?? []
      let here = 0
      let bytes = 0
      for (const record of records) {
        const part = new URL(record.dataPath, modelUrl(webllm)).href
        if (!stored.has(part)) continue
        here++
        // Senza `nbytes` (un elenco vecchio) vale quello che dice il file salvato.
        bytes += record.nbytes ?? (Number((await cache.match(part))?.headers?.get('content-length')) || 0)
      }
      const model = modelOf(webllm)
      const id = model?.id ?? webllm
      const entry = found.get(id) ?? { id, name: model?.name ?? modelName(webllm), webllm: [], bytes: 0, complete: false }
      entry.webllm.push(webllm)
      entry.bytes += bytes
      if (records.length > 0 && here === records.length) entry.complete = true
      found.set(id, entry)
    }
    const order = (m: DownloadedModel) => {
      const i = LOCAL_MODELS.findIndex((l) => l.id === m.id)
      return i < 0 ? LOCAL_MODELS.length : i
    }
    return [...found.values()].sort((a, b) => order(a) - order(b))
  } catch {
    // Cache Storage non disponibile (pagina privata, permessi): come se non ci fosse niente.
    return []
  }
}

// ——— I messaggi tra la pagina (src/ai/local.ts) e il worker (src/ai/llmWorker.ts) ———

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatOptions {
  maxTokens?: number
  temperature?: number
}

export interface LoadProgress {
  /** Da 0 a 1. */
  progress: number
  /** Cosa sta facendo WebLLM (in inglese): si mostra solo la percentuale. */
  text: string
}

/** I messaggi verso il worker: `load` con il nome delle impostazioni, `remove` con quelli per WebLLM. */
export type ToWorker =
  | { type: 'load'; id: number; model: string }
  | { type: 'chat'; id: number; messages: ChatMessage[]; options: ChatOptions }
  | { type: 'remove'; id: number; models: string[] }
  | { type: 'stop' }

/** I messaggi dal worker: `done` porta il nome del modello per WebLLM (load) o il testo intero (chat). */
export type FromWorker =
  | { id: number; type: 'progress'; progress: number; text: string }
  | { id: number; type: 'delta'; text: string }
  | { id: number; type: 'done'; value?: string }
  | { id: number; type: 'error'; name: string; message: string }

/**
 * Gli errori che il worker riconosce da sé (WebGPU che manca, il modello che non c'è): hanno questo nome
 * e, al posto del messaggio, un codice di `GlifoErrorCode` (con il modello dopo uno spazio, se serve).
 * Nel worker la lingua scelta in Glifo non si sa (lì `localStorage` non c'è, e `lang` di src/i18n.ts
 * sarebbe quella del browser): il messaggio lo scrive la pagina, nella sua lingua (`localErrorMessage`
 * in src/ai/local.ts). Anche i messaggi per il modello si preparano nella pagina (src/ai/explain.ts).
 */
export const GLIFO_ERROR = 'GlifoError'

/** `needs-f16`: il modello c'è solo con i conti a 16 bit, e la scheda grafica non li sa fare. */
export type GlifoErrorCode = 'no-webgpu' | 'no-gpu' | 'unknown-model' | 'not-ready' | 'needs-f16'

/** Il messaggio di un errore del worker: il codice, e dopo uno spazio quello che serve (il modello). */
export function glifoErrorMessage(code: GlifoErrorCode, detail = ''): string {
  return detail ? `${code} ${detail}` : code
}
