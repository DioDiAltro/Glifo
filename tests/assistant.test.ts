import { afterEach, describe, expect, it, vi } from 'vitest'
import { askAi, jsonIn } from '../src/ai/assistant'
import { aiSettingsOf } from '../src/ai/services'
import { DEFAULT_SETTINGS } from '../src/store/settings'

const r = String.raw

function apiResponse(payload: unknown, extra: Record<string, unknown> = {}) {
  return new Response(
    JSON.stringify({
      id: 'msg_test',
      type: 'message',
      role: 'assistant',
      model: 'claude-opus-5-5',
      content: [{ type: 'text', text: JSON.stringify(payload) }],
      stop_reason: 'end_turn',
      stop_sequence: null,
      usage: { input_tokens: 10, output_tokens: 20 },
      ...extra,
    }),
    { status: 200, headers: { 'content-type': 'application/json' } },
  )
}

afterEach(() => vi.unstubAllGlobals())

describe('assistente AI', () => {
  it('chiede una risposta strutturata e la valida con KaTeX', async () => {
    const fetchMock = vi.fn(async () =>
      apiResponse({
        answers: [
          { latex: r`$\infty$`, description: 'Il simbolo di infinito.' },
          { latex: r`\frac{1}{`, description: 'Una formula sbagliata.' },
        ],
        note: '',
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    const result = await askAi("come faccio l'infinito?", { apiKey: 'sk-test', model: 'claude-opus-5-5' })
    expect(result.answers[0]).toEqual({ latex: r`\infty`, description: 'Il simbolo di infinito.', error: null })
    expect(result.answers[1].error).toBeTruthy()

    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(String(url)).toContain('/v1/messages')
    const headers = new Headers(init.headers)
    expect(headers.get('x-api-key')).toBe('sk-test')
    expect(headers.get('anthropic-dangerous-direct-browser-access')).toBe('true')
    expect(headers.get('anthropic-beta')).toContain('server-side-fallback-2026-07-01')
    const body = JSON.parse(String(init.body))
    expect(body.model).toBe('claude-opus-5-5')
    expect(body.fallbacks).toBe('default')
    expect(body.output_config.effort).toBe('low')
    expect(body.output_config.format.type).toBe('json_schema')
    expect(body.messages[0].content).toBe("come faccio l'infinito?")
  })

  it('con Haiku non manda i parametri che quel modello non accetta', async () => {
    const fetchMock = vi.fn(async () => apiResponse({ answers: [{ latex: r`\alpha`, description: 'alfa' }], note: '' }))
    vi.stubGlobal('fetch', fetchMock)
    await askAi('alfa', { apiKey: 'sk-test', model: 'claude-haiku-4-5' })
    const init = (fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1]
    const body = JSON.parse(String(init.body))
    expect(body.fallbacks).toBeUndefined()
    expect(body.output_config.effort).toBeUndefined()
    expect(new Headers(init.headers).get('anthropic-beta') ?? '').not.toContain('server-side-fallback')
  })

  it('gestisce il rifiuto del modello', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => apiResponse({ answers: [], note: '' }, { stop_reason: 'refusal', content: [] })))
    await expect(askAi('x', { apiKey: 'sk-test', model: 'claude-opus-5-5' })).rejects.toThrow(/non può rispondere/)
  })

  it('spiega gli errori di autenticazione in italiano', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify({ type: 'error', error: { type: 'authentication_error', message: 'invalid x-api-key' } }), { status: 401, headers: { 'content-type': 'application/json' } })),
    )
    await expect(askAi('x', { apiKey: 'sk-bad', model: 'claude-opus-5-5' })).rejects.toThrow(/chiave API non è valida/)
  })

  it('senza chiave non fa richieste', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    await expect(askAi('x', { apiKey: '', model: 'claude-opus-5-5' })).rejects.toThrow(/chiave API/)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})

/** Una risposta nella «lingua» di OpenAI (/chat/completions). */
function chatResponse(content: string, model = 'gemini-flash-lite-latest') {
  return new Response(JSON.stringify({ id: 'x', object: 'chat.completion', model, choices: [{ index: 0, message: { role: 'assistant', content }, finish_reason: 'stop' }] }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}

const ANSWER = JSON.stringify({ answers: [{ latex: r`\infty`, description: 'Infinito.' }], note: '' })

describe('assistente AI con gli altri servizi (la «lingua» di OpenAI)', () => {
  it('Gemini: la chiave, lo schema della risposta e il modello che ha risposto', async () => {
    const fetchMock = vi.fn(async () => chatResponse(ANSWER))
    vi.stubGlobal('fetch', fetchMock)
    const settings = aiSettingsOf({ ...DEFAULT_SETTINGS, aiService: 'gemini', aiKeys: { gemini: 'AIza-test' } })
    const result = await askAi('infinito', settings)
    expect(result.answers).toEqual([{ latex: r`\infty`, description: 'Infinito.', error: null }])
    expect(result.model).toBe('gemini-flash-lite-latest')
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions')
    expect(new Headers(init.headers).get('authorization')).toBe('Bearer AIza-test')
    const body = JSON.parse(String(init.body))
    expect(body.model).toBe('gemini-flash-lite-latest')
    expect(body.response_format.type).toBe('json_schema')
    expect(body.messages.map((m: { role: string }) => m.role)).toEqual(['system', 'user'])
    expect(body.messages[1].content).toBe('infinito')
  })

  it('se il servizio non accetta lo schema si chiede un oggetto JSON, e la risposta si legge anche tra ```json', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ error: { message: 'response_format json_schema not supported' } }), { status: 400 }))
      .mockResolvedValueOnce(chatResponse('Ecco:\n```json\n' + ANSWER + '\n```', 'qwen/qwen3-8b'))
    vi.stubGlobal('fetch', fetchMock)
    const result = await askAi('infinito', { service: 'openrouter', apiKey: 'sk-or-test', model: 'qwen/qwen3-8b', baseUrl: 'https://openrouter.ai/api/v1' })
    expect(result.answers[0].latex).toBe(r`\infty`)
    expect(result.model).toBe('qwen/qwen3-8b')
    expect(fetchMock).toHaveBeenCalledTimes(2)
    const second = JSON.parse(String((fetchMock.mock.calls[1] as unknown as [string, RequestInit])[1].body))
    expect(second.response_format).toEqual({ type: 'json_object' })
    expect(new Headers((fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].headers).get('x-title')).toBe('Glifo')
  })

  it('Ollama: senza chiave, sul computer; il ragionamento (<think>) non conta', async () => {
    const fetchMock = vi.fn(async () => chatResponse('<think>Vediamo… {non è questo}</think>' + ANSWER, 'qwen3'))
    vi.stubGlobal('fetch', fetchMock)
    const result = await askAi('infinito', aiSettingsOf({ ...DEFAULT_SETTINGS, aiService: 'ollama' }))
    expect(result.answers[0].latex).toBe(r`\infty`)
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('http://localhost:11434/v1/chat/completions')
    expect(new Headers(init.headers).get('authorization')).toBeNull()
    expect(JSON.parse(String(init.body)).model).toBe('qwen3')
  })

  it('spiega gli errori in italiano, e senza chiave (o senza indirizzo) non fa richieste', async () => {
    const answer = (status: number) => vi.fn(async () => new Response(JSON.stringify({ error: { message: 'no' } }), { status }))
    const gemini = { service: 'gemini' as const, apiKey: 'k', model: 'gemini-flash-lite-latest', baseUrl: '' }
    vi.stubGlobal('fetch', answer(401))
    await expect(askAi('x', gemini)).rejects.toThrow(/chiave di Gemini non è valida/)
    vi.stubGlobal('fetch', answer(429))
    await expect(askAi('x', gemini)).rejects.toThrow(/Troppe richieste/)
    vi.stubGlobal('fetch', answer(404))
    await expect(askAi('x', { service: 'ollama', apiKey: '', model: 'llama9', baseUrl: '' })).rejects.toThrow(/ollama pull llama9/)
    vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new TypeError('Failed to fetch'))))
    await expect(askAi('x', { service: 'ollama', apiKey: '', model: 'qwen3', baseUrl: '' })).rejects.toThrow(/Ollama non risponde/)
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    await expect(askAi('x', { ...gemini, apiKey: '' })).rejects.toThrow(/serve una chiave/)
    await expect(askAi('x', { service: 'compatible', apiKey: '', model: 'm', baseUrl: '' })).rejects.toThrow(/indirizzo/)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('dalle impostazioni: per ogni servizio la sua chiave, il modello scelto (o quello di partenza) e l\'indirizzo', () => {
    expect(aiSettingsOf({ ...DEFAULT_SETTINGS, apiKey: 'sk-ant', model: 'claude-sonnet-5-5' })).toEqual({ service: 'anthropic', apiKey: 'sk-ant', model: 'claude-sonnet-5-5', baseUrl: '' })
    const s = { ...DEFAULT_SETTINGS, aiService: 'compatible', aiKeys: { compatible: ' k ' }, aiModels: { compatible: 'gpt-x' }, aiUrls: { compatible: 'https://api.example.com/v1' } }
    expect(aiSettingsOf(s)).toEqual({ service: 'compatible', apiKey: 'k', model: 'gpt-x', baseUrl: 'https://api.example.com/v1' })
    expect(aiSettingsOf({ ...DEFAULT_SETTINGS, aiService: 'openrouter' })).toMatchObject({ model: 'openrouter/free', baseUrl: 'https://openrouter.ai/api/v1', apiKey: '' })
    // Un servizio che non c'è più: Anthropic.
    expect(aiSettingsOf({ ...DEFAULT_SETTINGS, aiService: 'boh' }).service).toBe('anthropic')
  })

  it('l\'oggetto JSON si trova anche con del testo attorno', () => {
    expect(jsonIn('Certo! {"a": 1} Spero aiuti.')).toEqual({ a: 1 })
    expect(jsonIn('niente')).toBeNull()
  })
})
