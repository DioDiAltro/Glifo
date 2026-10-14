import { afterEach, describe, expect, it, vi } from 'vitest'
import { LocalAbort, LocalLlm, localErrorMessage, type WorkerLike } from '../src/ai/local'
import {
  catalogFrom,
  CONTEXT_TOKENS,
  downloadSize,
  GLIFO_ERROR,
  LOCAL_MODELS,
  localModel,
  modelName,
  modelOf,
  modelsInBrowser,
  modelVariant,
  webllmId,
  type FromWorker,
  type ToWorker,
} from '../src/ai/localModels'

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

/**
 * I modelli di WebLLM con cui si chatta e che leggono almeno 4096 token, ma che non sono nell'elenco, con il
 * perché. Un modello nuovo di WebLLM fa fallire il test qui sotto finché non si decide: nell'elenco
 * (src/ai/localModels.ts) o qui.
 */
const LEFT_OUT: Record<string, string> = {
  'Qwen2.5-3B-Instruct': 'licenza solo per la ricerca (Qwen Research License): non va con Glifo a pagamento',
  'Qwen2.5-Coder-3B-Instruct': 'licenza solo per la ricerca (Qwen Research License)',
  'stablelm-2-zephyr-1_6b': 'licenza non commerciale, o con l\'abbonamento di Stability AI',
  'WizardMath-7B-V1.1': 'licenza non chiara (forse solo per la ricerca)',
  'DeepSeek-R1-Distill-Qwen-7B': 'ragiona sempre a lungo (<think>): in 4096 token non resta posto per la spiegazione',
  'DeepSeek-R1-Distill-Llama-8B': 'ragiona sempre a lungo (<think>)',
  'Ministral-3-3B-Reasoning-2512': 'ragiona sempre a lungo',
  'Ministral-3-3B-Base-2512': 'modello base: non è fatto per chattare',
  'gemma-2-2b-jpn-it': 'fatto per il giapponese',
}

describe('i modelli nel browser', () => {
  it('l\'elenco diviso dalle prove con Glifo (14 ottobre 2026): consigliati, sconsigliati, non certificati e, nelle avanzate, gli altri', () => {
    const ids = (group: string) => LOCAL_MODELS.filter((m) => m.group === group).map((m) => m.id)
    expect(ids('recommended')).toEqual(['Qwen3-1.7B', 'Qwen3.5-2B', 'Qwen3-4B', 'Qwen3.5-4B', 'Qwen3-8B', 'Qwen3.5-9B'])
    expect(ids('discouraged')).toEqual(['Qwen3-0.6B', 'Qwen3.5-0.8B', 'Llama-3.2-1B-Instruct'])
    expect(ids('other')).toEqual([
      'Llama-3.2-3B-Instruct',
      'Llama-3.1-8B-Instruct',
      'Hermes-3-Llama-3.2-3B',
      'Hermes-3-Llama-3.1-8B',
      'gemma-2-2b-it',
      'gemma-2-9b-it',
      'Phi-4-mini-instruct',
      'Ministral-3-3B-Instruct-2512-BF16',
      'Mistral-7B-Instruct-v0.3',
      'Qwen2.5-1.5B-Instruct',
      'Qwen2.5-7B-Instruct',
    ])
    expect(ids('all')).toContain('Llama-3.1-70B-Instruct')
    // Senza compressione: nelle avanzate, con il nome che lo dice.
    expect(localModel('Qwen3-0.6B-q0')).toMatchObject({ name: 'Qwen3 0.6B (senza compressione)', group: 'all', f16: { id: 'Qwen3-0.6B-q0f16-MLC' }, f32: { id: 'Qwen3-0.6B-q0f32-MLC' } })
    expect(LOCAL_MODELS.filter((m) => m.group === 'recommended').map((m) => m.label)).toEqual([
      'Qwen3 1.7B, consigliato',
      'Qwen3.5 2B',
      'Qwen3 4B',
      'Qwen3.5 4B, più bravo',
      'Qwen3 8B, il più bravo, per schede grafiche potenti',
      'Qwen3.5 9B',
    ])
    expect(new Set(LOCAL_MODELS.map((m) => m.id)).size).toBe(LOCAL_MODELS.length)
  })

  it('i nomi di WebLLM a 16 o a 32 bit, la memoria letta da WebLLM, chi sa chiedere i conti e chi ragiona', () => {
    expect(webllmId('Qwen3-1.7B', true)).toBe('Qwen3-1.7B-q4f16_1-MLC')
    expect(webllmId('Qwen3-0.6B', false)).toBe('Qwen3-0.6B-q4f32_1-MLC')
    // Un modello che WebLLM ha solo a 16 bit, su una scheda che non sa fare quei conti: non si può.
    expect(webllmId('Mistral-7B-Instruct-v0.2', true)).toBe('Mistral-7B-Instruct-v0.2-q4f16_1-MLC')
    expect(webllmId('Mistral-7B-Instruct-v0.2', false)).toBeNull()
    expect(modelVariant(localModel('Qwen3-1.7B'), true)).toEqual({ id: 'Qwen3-1.7B-q4f16_1-MLC', vram: 2037 })
    // Un nome che non c'è (impostazioni vecchie): quello consigliato.
    expect(localModel('Llama').id).toBe('Qwen3-1.7B')
    expect(modelName('Qwen3-4B-q4f16_1-MLC')).toBe('Qwen3 4B')
    expect(modelName('Llama-3.2-1B-Instruct-q4f32_1-MLC')).toBe('Llama 3.2 1B')
    // Un modello che non è più nell'elenco: il nome di WebLLM, senza la quantizzazione.
    expect(modelName('Vecchio-2B-q4f16_1-MLC')).toBe('Vecchio 2B')
    expect(modelOf('Qwen3-0.6B-q0f16-MLC')?.id).toBe('Qwen3-0.6B-q0')
    const flags = (id: string) => {
      const m = localModel(id)
      return [m.tools, m.thinking, m.license]
    }
    expect(flags('Qwen3-4B')).toEqual([true, true, 'apache'])
    expect(flags('Qwen3.5-2B')).toEqual([true, true, 'apache'])
    expect(flags('Hermes-3-Llama-3.1-8B')).toEqual([true, false, 'llama3.1'])
    expect(flags('Llama-3.2-3B-Instruct')).toEqual([false, false, 'llama3.2'])
    expect(flags('gemma-2-2b-it')).toEqual([false, false, 'gemma'])
  })

  it('ogni modello e ogni variante esistono in WebLLM, con almeno 4096 token e la memoria di WebLLM', async () => {
    const { prebuiltAppConfig } = await import('@mlc-ai/web-llm')
    const known = new Map(prebuiltAppConfig.model_list.map((m) => [m.model_id, m]))
    for (const m of LOCAL_MODELS) {
      expect(m.f16 ?? m.f32, m.id).not.toBeNull()
      for (const v of [m.f16, m.f32]) {
        if (!v) continue
        const entry = known.get(v.id)
        expect(entry, v.id).toBeDefined()
        expect(entry!.overrides?.context_window_size ?? 0, v.id).toBeGreaterThanOrEqual(CONTEXT_TOKENS)
        expect(v.vram).toBe(Math.round(entry!.vram_required_MB ?? 0))
      }
    }
  })

  it('ogni modello di WebLLM con cui si chatta è nell\'elenco, o lasciato fuori con il perché', async () => {
    const { prebuiltAppConfig } = await import('@mlc-ai/web-llm')
    const listed = new Set(LOCAL_MODELS.flatMap((m) => [m.f16?.id, m.f32?.id]))
    const missing = prebuiltAppConfig.model_list
      .filter((m) => !m.model_type && (m.overrides?.context_window_size ?? 0) >= CONTEXT_TOKENS && !listed.has(m.model_id))
      .map((m) => m.model_id.replace(/-q\d(?:f16|f32)(?:_1)?-MLC$/, ''))
      .filter((base) => !(base in LEFT_OUT))
    expect(missing).toEqual([])
    // E quelli lasciati fuori ci sono ancora (se WebLLM li toglie, si toglie la riga).
    const bases = new Set(prebuiltAppConfig.model_list.map((m) => m.model_id.replace(/-q\d(?:f16|f32)(?:_1)?-MLC(?:-1k)?$/, '')))
    for (const base of Object.keys(LEFT_OUT)) expect(bases.has(base), base).toBe(true)
  })

  it('l\'elenco dai modelli di WebLLM: le varianti, quelli senza compressione, niente contesti corti né famiglie sconosciute', () => {
    const models = catalogFrom([
      { id: 'Qwen3-1.7B-q4f16_1-MLC', vram: 2037, context: 4096 },
      { id: 'Qwen3-1.7B-q4f32_1-MLC', vram: 2635, context: 4096 },
      { id: 'Qwen3-0.6B-q0f16-MLC', vram: 2220, context: 4096 },
      { id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC', vram: 879, context: 4096 },
      { id: 'Phi-3.5-mini-instruct-q4f16_1-MLC-1k', vram: 2520, context: 1024 },
      { id: 'gemma-2-2b-it-q4f16_1-MLC', vram: 1895, context: 2048 },
      { id: 'Sconosciuto-1B-q4f16_1-MLC', vram: 900, context: 4096 },
    ])
    expect(models.map((m) => [m.id, m.group, m.f16?.id ?? null, m.f32?.id ?? null])).toEqual([
      ['Qwen3-1.7B', 'recommended', 'Qwen3-1.7B-q4f16_1-MLC', 'Qwen3-1.7B-q4f32_1-MLC'],
      ['Qwen3-0.6B', 'discouraged', 'Qwen3-0.6B-q0f16-MLC', null],
      ['Llama-3.2-1B-Instruct', 'discouraged', 'Llama-3.2-1B-Instruct-q4f16_1-MLC', null],
    ])
    // Solo senza compressione: è il modello stesso, con il suo nome e il suo gruppo.
    expect(models[1].name).toBe('Qwen3 0.6B')
  })
})

describe('quanto pesa un modello da scaricare', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('dall\'elenco dei pezzi su Hugging Face, chiesto una volta; senza rete si riprova la volta dopo', async () => {
    const fetch = vi.fn(async (url: string) => {
      if (url.endsWith('/Qwen3-4B-q4f16_1-MLC/resolve/main/tensor-cache.json')) {
        return new Response(JSON.stringify({ records: [{ dataPath: 'a.bin', nbytes: 1_500_000_000 }, { dataPath: 'b.bin', nbytes: 700_000_000 }] }))
      }
      throw new TypeError('Failed to fetch')
    })
    vi.stubGlobal('fetch', fetch)
    expect(await downloadSize('Qwen3-4B-q4f16_1-MLC')).toBe(2_200_000_000)
    expect(await downloadSize('Qwen3-4B-q4f16_1-MLC')).toBe(2_200_000_000)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch.mock.calls[0][0]).toBe('https://huggingface.co/mlc-ai/Qwen3-4B-q4f16_1-MLC/resolve/main/tensor-cache.json')
    expect(await downloadSize('Qwen3-8B-q4f16_1-MLC')).toBeNull()
    expect(await downloadSize('Qwen3-8B-q4f16_1-MLC')).toBeNull()
    expect(fetch).toHaveBeenCalledTimes(3)
  })
})

describe('i modelli già scaricati', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('senza Cache Storage: niente', async () => {
    expect(await modelsInBrowser()).toEqual([])
  })

  it('quanto pesano, anche a metà o non più nell\'elenco, dall\'elenco dei pezzi (senza leggerli)', async () => {
    const small = 'https://huggingface.co/mlc-ai/Qwen3-0.6B-q4f32_1-MLC/resolve/main/'
    const big = 'https://huggingface.co/mlc-ai/Qwen3-4B-q4f16_1-MLC/resolve/main/'
    const old = 'https://huggingface.co/mlc-ai/Vecchio-2B-q4f16_1-MLC/resolve/main/'
    const stored = new Map<string, { json?: unknown; length?: string }>([
      // Prima un modello che non è più nell'elenco: va in fondo.
      [`${old}tensor-cache.json`, { json: { records: [{ dataPath: 'params_shard_0.bin', nbytes: 50_000_000 }] } }],
      [`${old}params_shard_0.bin`, {}],
      [`${big}tensor-cache.json`, { json: { records: [{ dataPath: 'params_shard_0.bin' }, { dataPath: 'params_shard_1.bin' }] } }],
      // Del 4B solo il primo pezzo: è scaricato a metà. Il suo elenco non ha `nbytes`: vale il file.
      [`${big}params_shard_0.bin`, { length: '1200000000' }],
      [`${small}tensor-cache.json`, { json: { records: [{ dataPath: 'params_shard_0.bin', nbytes: 300_000_000 }, { dataPath: 'params_shard_1.bin', nbytes: 100_000_000 }] } }],
      [`${small}params_shard_0.bin`, {}],
      [`${small}params_shard_1.bin`, {}],
    ])
    const cache = {
      match: async (url: string) => {
        const entry = stored.get(url)
        return entry ? { json: async () => entry.json, headers: new Headers(entry.length ? { 'content-length': entry.length } : {}) } : undefined
      },
      keys: async () => [...stored.keys()].map((url) => ({ url })),
    }
    const opened: string[] = []
    vi.stubGlobal('caches', {
      has: async (name: string) => name === 'webllm/model',
      open: async (name: string) => {
        opened.push(name)
        return cache
      },
    })
    // Nell'ordine dell'elenco: prima i consigliati.
    expect(await modelsInBrowser()).toEqual([
      { id: 'Qwen3-4B', name: 'Qwen3 4B', webllm: ['Qwen3-4B-q4f16_1-MLC'], bytes: 1_200_000_000, complete: false },
      { id: 'Qwen3-0.6B', name: 'Qwen3 0.6B', webllm: ['Qwen3-0.6B-q4f32_1-MLC'], bytes: 400_000_000, complete: true },
      { id: 'Vecchio-2B-q4f16_1-MLC', name: 'Vecchio 2B', webllm: ['Vecchio-2B-q4f16_1-MLC'], bytes: 50_000_000, complete: true },
    ])
    // Le due varianti dello stesso modello sono una riga sola.
    stored.set('https://huggingface.co/mlc-ai/Qwen3-0.6B-q4f16_1-MLC/resolve/main/tensor-cache.json', { json: { records: [{ dataPath: 'p.bin', nbytes: 5 }] } })
    expect((await modelsInBrowser())[1]).toEqual({ id: 'Qwen3-0.6B', name: 'Qwen3 0.6B', webllm: ['Qwen3-0.6B-q4f32_1-MLC', 'Qwen3-0.6B-q4f16_1-MLC'], bytes: 400_000_000, complete: true })
    // Se WebLLM non ha mai aperto la sua cache, non la si crea per guardarci dentro.
    opened.length = 0
    vi.stubGlobal('caches', { has: async () => false, open: async (name: string) => (opened.push(name), cache) })
    expect(await modelsInBrowser()).toEqual([])
    expect(opened).toEqual([])
  })
})

describe('la pagina e il worker di WebLLM', () => {
  it('carica il modello una volta sola, con l\'avanzamento, e risponde pezzo per pezzo', async () => {
    const { worker, received } = fakeWorker((msg, send) => {
      if (msg.type === 'load') {
        send({ id: msg.id, type: 'progress', progress: 0.5, text: 'Fetching param cache[1/2]' })
        send({ id: msg.id, type: 'done', value: webllmId(msg.model, true) ?? '' })
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
    // Il nome di WebLLM di un modello senza compressione comincia come quello dell'altro: si carica davvero.
    expect(await llm.load('Qwen3-0.6B-q0')).toBe('Qwen3-0.6B-q0f16-MLC')
    expect(await llm.load('Qwen3-0.6B')).toBe('Qwen3-0.6B-q4f16_1-MLC')
    expect(await llm.load('Qwen3-0.6B')).toBe('Qwen3-0.6B-q4f16_1-MLC')
    expect(received.filter((m) => m.type === 'load').map((m) => (m as { model: string }).model)).toEqual(['Qwen3-1.7B', 'Qwen3-0.6B-q0', 'Qwen3-0.6B'])
  })

  it('«Togli» manda al worker le varianti da togliere; se una è quella caricata, va ricaricata', async () => {
    const { worker, received } = fakeWorker((msg, send) => {
      if (msg.type === 'load') send({ id: msg.id, type: 'done', value: webllmId(msg.model, true) ?? '' })
      else if (msg.type === 'remove') send({ id: msg.id, type: 'done', value: '' })
    })
    const llm = new LocalLlm(() => worker)
    await llm.load('Qwen3-4B')
    await llm.remove(['Qwen3-4B-q4f16_1-MLC', 'Qwen3-4B-q4f32_1-MLC'])
    expect(received.at(-1)).toMatchObject({ type: 'remove', models: ['Qwen3-4B-q4f16_1-MLC', 'Qwen3-4B-q4f32_1-MLC'] })
    expect(llm.loaded).toBeNull()
    await llm.load('Qwen3-4B')
    expect(received.filter((m) => m.type === 'load')).toHaveLength(2)
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
    expect(localErrorMessage(GLIFO_ERROR, 'needs-f16 Mistral 7B v0.2')).toBe(
      'Mistral 7B v0.2 ha bisogno di una scheda grafica che sa fare i conti a 16 bit, e questa non li sa fare: scegli un altro modello nelle impostazioni.',
    )
  })
})
