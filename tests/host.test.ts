import { afterEach, describe, expect, it, vi } from 'vitest'
import { askAi } from '../src/ai/assistant'

const r = String.raw

afterEach(() => vi.unstubAllGlobals())

describe('demo dentro claude.ai', () => {
  it('senza chiave usa Claude tramite il visualizzatore', async () => {
    const json = vi.fn(async (_prompt: string, _opts?: unknown) => ({
      answers: [{ latex: r`\xrightarrow{n \to \infty}`, description: 'Freccia con scritto sopra.' }],
      note: '',
    }))
    vi.stubGlobal('window', { claude: { use: async (name: string) => (name === 'sample' ? { json } : null) } })
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const result = await askAi('freccia con scritto sopra n → ∞', { apiKey: '', model: 'claude-opus-5-5' })
    expect(result.answers).toEqual([{ latex: r`\xrightarrow{n \to \infty}`, description: 'Freccia con scritto sopra.', error: null }])
    expect(fetchMock).not.toHaveBeenCalled()
    const [prompt, opts] = json.mock.calls[0]
    expect(prompt).toContain('freccia con scritto sopra')
    expect(prompt).toContain('"\\\\infty"') // esempio JSON con la barra rovesciata raddoppiata
    expect(opts).toMatchObject({ modelTier: 'quick' })
  })
})
