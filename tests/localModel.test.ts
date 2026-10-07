import { afterEach, describe, expect, it, vi } from 'vitest'
import { LocalAbort, LocalLlm, localErrorMessage, type WorkerLike } from '../src/ai/local'
import { GLIFO_ERROR, LOCAL_MODELS, localModel, modelInBrowser, modelName, webllmId, type FromWorker, type ToWorker } from '../src/ai/localModels'

/** Un worker finto: tiene i messaggi ricevuti e risponde con `reply`. */
function fakeWorker(reply: (msg: ToWorker, send: (m: FromWorker) => void) => void) {
  const listeners: Record<string, ((ev: Event) => void)[]> = {}
  const received: ToWorker[] = []
  const send = (data: FromWorker) => queueMicrotask(() => listeners.message?.forEach((fn) => fn({ data } as unknown as Event)))
  const worker: WorkerLike & { fail(message: string): void } = {
    postMessage: (msg: ToWorker) => {
      received.push(msg)
      reply(msg, send)
    },
    addEventListener: (type: string, fn: (ev: Event) => void) => {
      ;(listeners[type] ??= []).push(fn)
    },
    terminate: () => {},
    fail: (message: string) => listeners.error?.forEach((fn) => fn({ message, preventDefault() {} } as unknown as Event)),
  } as never
  return { worker, received }
}

describe('i modelli nel browser', () => {
  it('i Qwen3 piccoli, con i nomi di WebLLM a 16 o a 32 bit', () => {
    expect(LOCAL_MODELS.map((m) => m.id)).toEqual(['Qwen3-0.6B', 'Qwen3-1.7B', 'Qwen3-4B'])
    expect(webllmId('Qwen3-1.7B', true)).toBe('Qwen3-1.7B-q4f16_1-MLC')
    expect(webllmId('Qwen3-0.6B', false)).toBe('Qwen3-0.6B-q4f32_1-MLC')
    // Un nome che non c'è (impostazioni vecchie): quello consigliato.
    expect(localModel('Llama').id).toBe('Qwen3-1.7B')
    expect(modelName('Qwen3-4B-q4f16_1-MLC')).toBe('Qwen3 4B')
  })

  it('i nomi esistono in WebLLM', async () => {
    const { prebuiltAppConfig } = await import('@mlc-ai/web-llm')
    const known = new Set(prebuiltAppConfig.model_list.map((m) => m.model_id))
    for (const m of LOCAL_MODELS) for (const f16 of [true, false]) expect(known.has(webllmId(m.id, f16)), webllmId(m.id, f16)).toBe(true)
  })
})

describe('il modello già scaricato', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('c\'è se nella Cache Storage di WebLLM ci sono l\'elenco dei pezzi e tutti i pezzi', async () => {
    const base = 'https://huggingface.co/mlc-ai/Qwen3-1.7B-q4f16_1-MLC/resolve/main/'
    const stored = new Map<string, unknown>([
      [`${base}tensor-cache.json`, { records: [{ dataPath: 'params_shard_0.bin' }, { dataPath: 'params_shard_1.bin' }] }],
      [`${base}params_shard_0.bin`, 'pezzo'],
    ])
    const cache = {
      match: async (url: string) => (stored.has(url) ? { json: async () => stored.get(url) } : undefined),
      keys: async () => [...stored.keys()].map((url) => ({ url })),
    }
    vi.stubGlobal('caches', { open: async (name: string) => (name === 'webllm/model' ? cache : { match: async () => undefined, keys: async () => [] }) })
    expect(await modelInBrowser('Qwen3-1.7B')).toBe(false)
    stored.set(`${base}params_shard_1.bin`, 'pezzo')
    expect(await modelInBrowser('Qwen3-1.7B')).toBe(true)
    expect(await modelInBrowser('Qwen3-4B')).toBe(false)
  })

  it('senza Cache Storage: non c\'è', async () => {
    expect(await modelInBrowser('Qwen3-1.7B')).toBe(false)
  })
})

describe('la pagina e il worker di WebLLM', () => {
  it('carica il modello una volta sola, con l\'avanzamento, e risponde pezzo per pezzo', async () => {
    const { worker, received } = fakeWorker((msg, send) => {
      if (msg.type === 'load') {
        send({ id: msg.id, type: 'progress', progress: 0.5, text: 'Fetching param cache[1/2]' })
        send({ id: msg.id, type: 'done', value: `${msg.model}-q4f16_1-MLC` })
      } else if (msg.type === 'chat') {
        send({ id: msg.id, type: 'delta', text: 'Cia' })
        send({ id: msg.id, type: 'delta', text: 'o' })
        send({ id: msg.id, type: 'done', value: 'Ciao' })
      }
    })
    const start = vi.fn(() => worker)
    const llm = new LocalLlm(start)
    const progress: number[] = []
    expect(await llm.load('Qwen3-1.7B', (p) => progress.push(p.progress))).toBe('Qwen3-1.7B-q4f16_1-MLC')
    expect(progress).toEqual([0.5])
    expect(await llm.load('Qwen3-1.7B')).toBe('Qwen3-1.7B-q4f16_1-MLC')
    expect(received.filter((m) => m.type === 'load')).toHaveLength(1)
    const deltas: string[] = []
    expect(await llm.chat([{ role: 'user', content: 'ciao' }], { maxTokens: 10 }, (t) => deltas.push(t))).toBe('Ciao')
    expect(deltas).toEqual(['Cia', 'o'])
    expect(received.at(-1)).toMatchObject({ type: 'chat', messages: [{ role: 'user', content: 'ciao' }], options: { maxTokens: 10 } })
    expect(start).toHaveBeenCalledTimes(1)
  })

  it('«Annulla» ferma il modello; gli errori arrivano in italiano', async () => {
    const { worker, received } = fakeWorker((msg, send) => {
      if (msg.type === 'load') send({ id: msg.id, type: 'error', name: 'Error', message: 'Failed to fetch' })
    })
    const llm = new LocalLlm(() => worker)
    await expect(llm.load('Qwen3-4B')).rejects.toThrow(/serve la connessione/)
    const controller = new AbortController()
    const answer = llm.chat([{ role: 'user', content: 'ciao' }], {}, undefined, controller.signal)
    controller.abort()
    await expect(answer).rejects.toBeInstanceOf(LocalAbort)
    expect(received.at(-1)).toEqual({ type: 'stop' })
  })

  it('se il worker non parte, le richieste in corso finiscono con un errore e il prossimo giro ne parte un altro', async () => {
    const workers: ReturnType<typeof fakeWorker>[] = []
    const llm = new LocalLlm(() => {
      const w = fakeWorker(() => {})
      workers.push(w)
      return w.worker
    })
    const loading = llm.load('Qwen3-1.7B')
    ;(workers[0].worker as unknown as { fail(m: string): void }).fail('Unexpected token')
    await expect(loading).rejects.toThrow(/si è fermato: Unexpected token/)
    void llm.load('Qwen3-1.7B').catch(() => {})
    expect(workers).toHaveLength(2)
  })

  it('i messaggi per chi usa Glifo', () => {
    expect(localErrorMessage(GLIFO_ERROR, 'Questo browser non ha WebGPU…')).toBe('Questo browser non ha WebGPU…')
    expect(localErrorMessage('QuotaExceededError', 'The quota has been exceeded.')).toMatch(/abbastanza spazio/)
    expect(localErrorMessage('Error', 'Device was lost')).toMatch(/modello più piccolo/)
    expect(localErrorMessage('Error', 'NetworkError when attempting to fetch resource.')).toMatch(/connessione/)
    expect(localErrorMessage('Error', 'Cannot find adapter that matches the request')).toMatch(/WebGPU/)
    expect(localErrorMessage('ContextWindowSizeExceededError', 'Prompt tokens exceed context window size: number of prompt tokens: 4500; context window size: 4096')).toMatch(/troppo lunga/)
    expect(localErrorMessage('Error', 'boh')).toBe('Il modello nel browser si è fermato: boh')
  })
})
