import { afterEach, describe, expect, it, vi } from 'vitest'
import { askAi } from '../src/ai/assistant'

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
