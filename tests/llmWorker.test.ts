import { afterEach, describe, expect, it, vi } from 'vitest'
import { GLIFO_ERROR, type FromWorker, type ToWorker } from '../src/ai/localModels'

// WebLLM finto: il motore tiene il modello caricato e le richieste, e risponde con un testo solo.
const engine = vi.hoisted(() => ({
  reloads: [] as string[],
  requests: [] as Record<string, unknown>[],
  removed: [] as string[],
}))
vi.mock('@mlc-ai/web-llm', async (importOriginal) => {
  const real = await importOriginal<typeof import('@mlc-ai/web-llm')>()
  class MLCEngine {
    setInitProgressCallback() {}
    async reload(name: string) {
      engine.reloads.push(name)
    }
    async unload() {}
    interruptGenerate() {}
    chat = {
      completions: {
        create: async (request: Record<string, unknown>) => {
          engine.requests.push(request)
          return (async function* () {
            yield { choices: [{ delta: { content: '1. Fatto.' } }] }
          })()
        },
      },
    }
  }
  return {
    prebuiltAppConfig: real.prebuiltAppConfig,
    MLCEngine,
    deleteModelAllInfoInCache: async (name: string) => void engine.removed.push(`tutto ${name}`),
    deleteModelWasmInCache: async (name: string) => void engine.removed.push(`wasm ${name}`),
    deleteChatConfigInCache: async (name: string) => void engine.removed.push(`config ${name}`),
  }
})

afterEach(() => vi.unstubAllGlobals())

/** Un messaggio per il worker senza il numero, che mette `ask`. */
type Request<T = Extract<ToWorker, { id: number }>> = T extends unknown ? Omit<T, 'id'> : never

/** Il worker vero, in un ambito finto, con una scheda grafica che sa (o no) fare i conti a 16 bit. */
async function worker(f16: boolean) {
  const posted: FromWorker[] = []
  let onMessage: ((ev: MessageEvent<ToWorker>) => void) | null = null
  vi.stubGlobal('self', {
    postMessage: (msg: FromWorker) => posted.push(msg),
    addEventListener: (type: string, fn: (ev: MessageEvent<ToWorker>) => void) => {
      if (type === 'message') onMessage = fn
    },
  })
  vi.stubGlobal('navigator', { gpu: { requestAdapter: async () => ({ features: { has: (name: string) => f16 && name === 'shader-f16' } }) } })
  vi.resetModules()
  await import('../src/ai/llmWorker')
  let next = 1
  /** Manda un messaggio e aspetta la risposta finale (done o error). */
  const ask = async (msg: Request) => {
    const id = next++
    onMessage!({ data: { ...msg, id } as ToWorker } as MessageEvent<ToWorker>)
    return vi.waitFor(() => {
      const done = posted.find((p) => p.id === id && (p.type === 'done' || p.type === 'error'))
      if (!done) throw new Error('ancora niente')
      return done
    })
  }
  return { ask }
}

describe('il worker con i modelli dell\'elenco', () => {
  it('carica la variante giusta e spegne il ragionamento solo ai modelli che ce l\'hanno', async () => {
    const { ask } = await worker(true)
    expect(await ask({ type: 'load', model: 'Qwen3-1.7B' })).toMatchObject({ type: 'done', value: 'Qwen3-1.7B-q4f16_1-MLC' })
    expect(await ask({ type: 'chat', messages: [{ role: 'user', content: 'ciao' }], options: {} })).toMatchObject({ type: 'done', value: '1. Fatto.' })
    expect(engine.requests.at(-1)).toMatchObject({ extra_body: { enable_thinking: false }, temperature: 0.7, top_p: 0.8 })
    // Llama non ha il ragionamento: niente <think></think> vuoto nella sua risposta.
    expect(await ask({ type: 'load', model: 'Llama-3.2-1B-Instruct' })).toMatchObject({ type: 'done', value: 'Llama-3.2-1B-Instruct-q4f16_1-MLC' })
    await ask({ type: 'chat', messages: [{ role: 'user', content: 'ciao' }], options: {} })
    expect(engine.requests.at(-1)).not.toHaveProperty('extra_body')
    expect(engine.reloads).toEqual(['Qwen3-1.7B-q4f16_1-MLC', 'Llama-3.2-1B-Instruct-q4f16_1-MLC'])
  })

  it('senza i conti a 16 bit la variante a 32; un modello che c\'è solo a 16 bit non parte, con un codice', async () => {
    const { ask } = await worker(false)
    expect(await ask({ type: 'load', model: 'Qwen3-0.6B' })).toMatchObject({ type: 'done', value: 'Qwen3-0.6B-q4f32_1-MLC' })
    expect(await ask({ type: 'load', model: 'Mistral-7B-Instruct-v0.2' })).toEqual({ id: 2, type: 'error', name: GLIFO_ERROR, message: 'needs-f16 Mistral 7B v0.2' })
  })

  it('«Togli» toglie le varianti che gli si dicono', async () => {
    const elenco = 'https://huggingface.co/mlc-ai/Qwen3-4B-q4f16_1-MLC/resolve/main/tensor-cache.json'
    vi.stubGlobal('caches', { open: async () => ({ match: async (url: string) => (url === elenco ? {} : undefined) }) })
    const { ask } = await worker(true)
    expect(await ask({ type: 'remove', models: ['Qwen3-4B-q4f16_1-MLC', 'Qwen3-4B-q4f32_1-MLC'] })).toMatchObject({ type: 'done' })
    // Con l'elenco dei pezzi nel browser tutto; senza, la libreria e la configurazione.
    expect(engine.removed).toEqual(['tutto Qwen3-4B-q4f16_1-MLC', 'wasm Qwen3-4B-q4f32_1-MLC', 'config Qwen3-4B-q4f32_1-MLC'])
  })
})
