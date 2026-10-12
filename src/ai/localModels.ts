/**
 * I modelli che girano nel browser, con WebLLM sulla scheda grafica (WebGPU): i Qwen3 piccoli, per le
 * spiegazioni (src/ai/explain.ts). Si scaricano da Hugging Face la prima volta e poi restano nel
 * browser (nella Cache Storage, come li tiene WebLLM): niente chiave, niente costi, e la nota non esce
 * dal dispositivo. Qui solo l'elenco, i nomi e i messaggi tra la pagina e il worker: WebLLM sta nel
 * worker (src/ai/llmWorker.ts), che si carica solo quando serve.
 */
import { texts } from '../i18n'

// Le etichette dell'elenco nelle impostazioni (src/ui/dialogs.ts) e quanto si scarica.
const T = texts({
  lightest: ['Qwen3 0.6B, il più leggero', 'Qwen3 0.6B, the lightest'],
  recommended: ['Qwen3 1.7B, consigliato', 'Qwen3 1.7B, recommended'],
  best: ['Qwen3 4B, il più bravo ma pesante', 'Qwen3 4B, the most capable but heavy'],
  /** I gigabyte, con la virgola in italiano e il punto in inglese. */
  about: (gb: number) => [`circa ${String(gb).replace('.', ',')} GB`, `about ${gb} GB`],
})

export interface LocalModel {
  /** Il nome nelle impostazioni (salvato in `localModel`). */
  id: string
  /** Il nome breve («Qwen3 1.7B») e quello nell'elenco delle impostazioni. */
  name: string
  label: string
  /** Quanto si scarica la prima volta, a parole. */
  size: string
}

export const LOCAL_MODELS: readonly LocalModel[] = [
  { id: 'Qwen3-0.6B', name: 'Qwen3 0.6B', get label() { return T.lightest }, get size() { return T.about(0.4) } },
  { id: 'Qwen3-1.7B', name: 'Qwen3 1.7B', get label() { return T.recommended }, get size() { return T.about(1) } },
  { id: 'Qwen3-4B', name: 'Qwen3 4B', get label() { return T.best }, get size() { return T.about(2.3) } },
]

export const DEFAULT_LOCAL_MODEL = 'Qwen3-1.7B'

export function localModel(id: string): LocalModel {
  return LOCAL_MODELS.find((m) => m.id === id) ?? LOCAL_MODELS.find((m) => m.id === DEFAULT_LOCAL_MODEL)!
}

/** Il nome per WebLLM: i pesi a 4 bit con i conti a 16 bit se la scheda li sa fare (shader-f16), se no a 32. */
export function webllmId(id: string, f16: boolean): string {
  return `${localModel(id).id}-${f16 ? 'q4f16_1' : 'q4f32_1'}-MLC`
}

/** Il nome breve da mostrare sopra la spiegazione: «Qwen3 1.7B». */
export function modelName(webllm: string): string {
  return webllm.replace(/-q\d\w*-MLC$/, '').replace(/-/g, ' ')
}

/** Dove WebLLM tiene i pesi di un modello (le chiavi della sua Cache Storage partono da qui). */
export function modelUrl(webllm: string): string {
  return `https://huggingface.co/mlc-ai/${webllm}/resolve/main/`
}

/**
 * Il modello è già in questo browser? Come fa WebLLM (`hasModelInCache`): c'è l'elenco dei pezzi,
 * tensor-cache.json, e ci sono tutti i pezzi. Senza caricare WebLLM: serve alle impostazioni.
 */
export async function modelInBrowser(id: string): Promise<boolean> {
  if (typeof caches === 'undefined') return false
  try {
    const cache = await caches.open('webllm/model')
    for (const f16 of [true, false]) {
      const base = modelUrl(webllmId(id, f16))
      const list = await cache.match(new URL('tensor-cache.json', base).href)
      if (!list) continue
      const records = ((await list.json()) as { records?: { dataPath: string }[] }).records ?? []
      const keys = new Set((await cache.keys()).map((r) => r.url))
      if (records.length && records.every((r) => keys.has(new URL(r.dataPath, base).href))) return true
    }
  } catch {
    // Cache Storage non disponibile (pagina privata, permessi): come se non ci fosse.
  }
  return false
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

/** I messaggi verso il worker. */
export type ToWorker =
  | { type: 'load'; id: number; model: string }
  | { type: 'chat'; id: number; messages: ChatMessage[]; options: ChatOptions }
  | { type: 'remove'; id: number; model: string }
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

export type GlifoErrorCode = 'no-webgpu' | 'no-gpu' | 'unknown-model' | 'not-ready'

/** Il messaggio di un errore del worker: il codice, e dopo uno spazio quello che serve (il modello). */
export function glifoErrorMessage(code: GlifoErrorCode, detail = ''): string {
  return detail ? `${code} ${detail}` : code
}
