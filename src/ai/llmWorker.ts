/**
 * Il worker del modello nel browser: WebLLM (MLC) fa girare un Qwen3 sulla scheda grafica con WebGPU,
 * fuori dalla pagina, così mentre scrive l'editor non si blocca. Parla con src/ai/local.ts (i messaggi
 * sono `ToWorker` e `FromWorker`). La prima volta WebLLM scarica il modello da Hugging Face e la sua
 * libreria da GitHub e li tiene nella Cache Storage del browser: dopo funziona anche offline.
 */
import { deleteChatConfigInCache, deleteModelAllInfoInCache, deleteModelWasmInCache, MLCEngine, prebuiltAppConfig } from '@mlc-ai/web-llm'
import { GLIFO_ERROR, modelUrl, webllmId, type FromWorker, type ToWorker } from './localModels'

const scope = self as unknown as { postMessage(msg: FromWorker): void; addEventListener(type: 'message', fn: (ev: MessageEvent<ToWorker>) => void): void }
const post = (msg: FromWorker) => scope.postMessage(msg)

class GlifoError extends Error {
  override name = GLIFO_ERROR
}

let engine: MLCEngine | null = null
/** Il modello caricato (nome per WebLLM). */
let loaded = ''

interface Gpu {
  requestAdapter(): Promise<{ features: { has(name: string): boolean } } | null>
}

/** C'è una scheda grafica da usare con WebGPU? E sa fare i conti a 16 bit (i modelli q4f16 sono più leggeri)? */
async function shaderF16(): Promise<boolean> {
  const gpu = (navigator as Navigator & { gpu?: Gpu }).gpu
  if (!gpu) {
    throw new GlifoError('Questo browser non ha WebGPU, che serve per far girare il modello sul dispositivo: prova con Chrome o Edge aggiornati, su un computer.')
  }
  const adapter = await gpu.requestAdapter()
  if (!adapter) throw new GlifoError('WebGPU c\'è, ma non trova una scheda grafica da usare su questo dispositivo.')
  return adapter.features.has('shader-f16')
}

async function load(id: number, model: string): Promise<string> {
  const name = webllmId(model, await shaderF16())
  if (!prebuiltAppConfig.model_list.some((m) => m.model_id === name)) throw new GlifoError(`Il modello ${name} non c'è in questa versione di WebLLM.`)
  engine ??= new MLCEngine()
  engine.setInitProgressCallback((r) => post({ id, type: 'progress', progress: r.progress, text: r.text }))
  if (loaded !== name) {
    loaded = ''
    await engine.reload(name)
    loaded = name
  }
  return name
}

async function chat(id: number, msg: Extract<ToWorker, { type: 'chat' }>): Promise<string> {
  if (!engine || !loaded) throw new GlifoError('Il modello non è ancora pronto.')
  const stream = await engine.chat.completions.create({
    messages: msg.messages,
    stream: true,
    max_tokens: msg.options.maxTokens ?? 900,
    // Come consigliano per i Qwen3 senza ragionamento.
    temperature: msg.options.temperature ?? 0.7,
    top_p: 0.8,
    // Senza il ragionamento (<think>): più veloce, e i conti li fa comunque il motore di Glifo.
    extra_body: { enable_thinking: false },
  })
  let text = ''
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content
    if (!delta) continue
    text += delta
    post({ id, type: 'delta', text: delta })
  }
  return text
}

async function remove(model: string): Promise<void> {
  const cache = await caches.open('webllm/model')
  for (const f16 of [true, false]) {
    const name = webllmId(model, f16)
    if (loaded === name) {
      await engine?.unload()
      loaded = ''
    }
    try {
      // Senza l'elenco dei pezzi nel browser, WebLLM lo scaricherebbe per sapere cosa togliere.
      if (await cache.match(new URL('tensor-cache.json', modelUrl(name)).href)) await deleteModelAllInfoInCache(name)
      else {
        await deleteModelWasmInCache(name)
        await deleteChatConfigInCache(name)
      }
    } catch {
      // Quella variante non era nel browser.
    }
  }
}

scope.addEventListener('message', (ev) => {
  const msg = ev.data
  if (msg.type === 'stop') {
    void engine?.interruptGenerate()
    return
  }
  const run = msg.type === 'load' ? load(msg.id, msg.model) : msg.type === 'chat' ? chat(msg.id, msg) : remove(msg.model).then(() => '')
  run.then(
    (value) => post({ id: msg.id, type: 'done', value }),
    (err: unknown) => {
      const e = err instanceof Error ? err : new Error(String(err))
      post({ id: msg.id, type: 'error', name: e.name, message: e.message })
    },
  )
})
