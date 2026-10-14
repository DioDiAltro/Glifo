// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { openSettingsDialog } from '../src/ui/settings'
import { DEFAULT_SETTINGS, type Settings } from '../src/store/settings'

// jsdom non ha le finestre modali.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.open = true
}
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  this.open = false
  this.dispatchEvent(new Event('close'))
}

// Le impostazioni chiedono a Hugging Face quanto pesa il modello scelto: qui mai davvero (come offline).
beforeEach(() => vi.stubGlobal('fetch', async () => new Response('', { status: 404 })))

afterEach(() => {
  document.body.replaceChildren()
  vi.unstubAllGlobals()
})

function open(settings: Partial<Settings> = {}): { changes: Partial<Settings>[]; section: HTMLElement } {
  const changes: Partial<Settings>[] = []
  // L'assistente e le spiegazioni sono nella sezione «AI».
  openSettingsDialog(
    {
      settings: { ...DEFAULT_SETTINGS, ...settings },
      onChange: (next) => changes.push(next),
      onLanguageChange: () => {},
      personalWords: [],
      onPersonalWordsChange: (words) => words,
      onBackup: () => {},
      onRestore: () => {},
    },
    'ai',
  )
  return { changes, section: document.querySelector<HTMLElement>('fieldset.ai-settings')! }
}

function choose(section: HTMLElement, service: string): void {
  const select = section.querySelector<HTMLSelectElement>('select')!
  select.value = service
  select.dispatchEvent(new Event('change'))
}

describe('le impostazioni dell\'assistente AI', () => {
  it('si sceglie il servizio: Anthropic, Gemini, OpenRouter, Ollama o un altro compatibile con OpenAI', () => {
    const { section } = open()
    const options = [...section.querySelector('select')!.options].map((o) => o.value)
    expect(options).toEqual(['anthropic', 'gemini', 'openrouter', 'ollama', 'compatible'])
    // Con Anthropic: la chiave sk-ant…, i modelli di Claude e il proxy nelle avanzate.
    expect(section.querySelector<HTMLInputElement>('#api-key')!.placeholder).toBe('sk-ant-…')
    expect(section.querySelector('details.advanced')).not.toBeNull()
  })

  it('con Gemini la sua chiave (dove farla, gratis) e il modello da scrivere, con le proposte', () => {
    const { section, changes } = open({ aiKeys: { gemini: 'AIza-vecchia' } })
    choose(section, 'gemini')
    expect(changes).toContainEqual({ aiService: 'gemini' })
    const key = section.querySelector<HTMLInputElement>('#api-key')!
    expect(key.placeholder).toBe('AIza…')
    expect(key.value).toBe('AIza-vecchia')
    expect(section.querySelector('a[href="https://aistudio.google.com/apikey"]')).not.toBeNull()
    expect([...section.querySelectorAll('datalist option')].map((o) => (o as HTMLOptionElement).value)).toContain('gemini-flash-lite-latest')
    key.value = ' AIza-nuova '
    key.dispatchEvent(new Event('change'))
    expect(changes).toContainEqual({ aiKeys: { gemini: 'AIza-nuova' } })
    expect(section.querySelector('details.advanced')).toBeNull()
  })

  it('con Ollama niente chiave, ma l\'indirizzo (sul computer) e come permettere le richieste da Glifo', () => {
    const { section, changes } = open()
    choose(section, 'ollama')
    expect(section.querySelector('#api-key')).toBeNull()
    const url = section.querySelector<HTMLInputElement>('input[type="url"]')!
    expect(url.placeholder).toBe('http://localhost:11434/v1')
    expect(section.textContent).toContain('OLLAMA_ORIGINS')
    const model = section.querySelector<HTMLInputElement>('input[list]')!
    model.value = 'gemma3'
    model.dispatchEvent(new Event('change'))
    expect(changes).toContainEqual({ aiModels: { ollama: 'gemma3' } })
  })
})

describe('le impostazioni delle spiegazioni (prova)', () => {
  function explainSection(settings: Partial<Settings> = {}) {
    const { changes } = open(settings)
    return { changes, section: document.querySelector<HTMLElement>('fieldset.explain-settings')! }
  }

  /** Hugging Face finto: l'elenco dei pezzi di Qwen3 1.7B (1,1 GB); degli altri modelli niente, come offline. */
  function huggingFace() {
    const fetch = vi.fn(async (url: string) =>
      url === 'https://huggingface.co/mlc-ai/Qwen3-1.7B-q4f16_1-MLC/resolve/main/tensor-cache.json'
        ? new Response(JSON.stringify({ records: [{ dataPath: 'a.bin', nbytes: 600_000_000 }, { dataPath: 'b.bin', nbytes: 500_000_000 }] }))
        : new Response('', { status: 404 }),
    )
    vi.stubGlobal('fetch', fetch)
    return fetch
  }

  /** Le righe del modello scelto: memoria, quanto si scarica (o quanto pesa qui), licenza. */
  function facts(section: HTMLElement): string[][] {
    return [...section.querySelectorAll('.model-facts dt')].map((dt) => [dt.textContent ?? '', dt.nextElementSibling?.textContent ?? ''])
  }

  function notes(section: HTMLElement): string[] {
    return [...section.querySelectorAll('.model-notes p')].map((p) => p.textContent ?? '')
  }

  it('l\'elenco ragionato, con la memoria; del modello scelto quanto si scarica e la licenza; il tono', async () => {
    huggingFace()
    const { section, changes } = explainSection()
    expect(section.querySelector('legend')?.textContent).toBe('Spiegazioni (prova)')
    const select = section.querySelector<HTMLSelectElement>('#local-model')!
    const groups = () => [...select.querySelectorAll('optgroup')].map((g) => g.label)
    // Tre gruppi, dalle prove con Glifo (14 ottobre 2026).
    expect(groups()).toEqual(['Consigliati, provati con Glifo', 'Sconsigliati: provati con Glifo, sbagliano spesso', 'Non certificati da Glifo'])
    expect([...select.querySelectorAll('optgroup')[0].querySelectorAll('option')].map((o) => o.textContent)).toEqual([
      'Qwen3 1.7B, consigliato (2 GB di memoria)',
      'Qwen3.5 2B (2,2 GB di memoria)',
      'Qwen3 4B (3,4 GB di memoria)',
      'Qwen3.5 4B, più bravo (3,9 GB di memoria)',
      'Qwen3 8B, il più bravo, per schede grafiche potenti (5,7 GB di memoria)',
      'Qwen3.5 9B (6,4 GB di memoria)',
    ])
    expect([...select.querySelectorAll('optgroup')[1].querySelectorAll('option')].map((o) => o.value)).toEqual(['Qwen3-0.6B', 'Qwen3.5-0.8B', 'Llama-3.2-1B-Instruct'])
    expect(select.value).toBe('Qwen3-1.7B')
    // Qui la Cache Storage non c'è: il modello si scaricherà, e quanto pesa lo dice Hugging Face.
    await vi.waitFor(() =>
      expect(facts(section)).toEqual([
        ['Memoria', 'circa 2 GB della scheda grafica'],
        ['Da scaricare', '1,1 GB, la prima volta che premi «Spiegami»'],
        ['Licenza', 'Apache 2.0'],
      ]),
    )
    expect(section.querySelector<HTMLAnchorElement>('.model-facts a')?.href).toBe('https://www.apache.org/licenses/LICENSE-2.0')
    // Un consigliato che sa chiedere i conti: nessun avviso.
    expect(notes(section)).toEqual([])
    await vi.waitFor(() => expect(section.querySelector('.models-here')?.textContent).toContain('Nessuno: il modello scelto si scarica la prima volta che premi «Spiegami».'))

    select.value = 'Llama-3.2-1B-Instruct'
    select.dispatchEvent(new Event('change'))
    expect(changes).toContainEqual({ localModel: 'Llama-3.2-1B-Instruct' })
    expect(facts(section)).toEqual([
      ['Memoria', 'circa 0,9 GB della scheda grafica'],
      ['Da scaricare', 'la prima volta che premi «Spiegami»'],
      ['Licenza', 'Llama 3.2 Community License'],
    ])
    // Uno sconsigliato: lo dice, con quando può servire.
    expect(notes(section)).toEqual([
      'Built with Llama',
      'Sconsigliato: nelle prove con Glifo non è mai arrivato al risultato. Va bene solo se gli altri non girano su questo computer.',
      'Non sa chiedere i conti al motore di Glifo: Glifo gli dà quelli già fatti e poi controlla i passaggi come sempre.',
    ])

    const tones = [...section.querySelectorAll<HTMLInputElement>('input[name="explain-tone"]')]
    expect(tones.map((t) => [t.value, t.checked])).toEqual([
      ['professore', true],
      ['semplice', false],
    ])
    tones[1].click()
    expect(changes).toContainEqual({ explainTone: 'semplice' })
  })

  it('con la casella delle avanzate, anche gli altri non certificati; quello scelto si vede sempre', async () => {
    huggingFace()
    const { section, changes } = explainSection({ localModel: 'SmolLM2-1.7B-Instruct' })
    const select = section.querySelector<HTMLSelectElement>('#local-model')!
    const all = section.querySelector<HTMLInputElement>('#all-models')!
    // Il modello scelto è nelle avanzate: la casella è già spuntata.
    expect(all.checked).toBe(true)
    expect(select.value).toBe('SmolLM2-1.7B-Instruct')
    const uncertified = () => [...([...select.querySelectorAll('optgroup')].find((g) => g.label === 'Non certificati da Glifo')?.querySelectorAll('option') ?? [])].map((o) => o.value)
    expect(uncertified().length).toBeGreaterThan(30)
    expect(notes(section)).toEqual([
      'Non certificato da Glifo: non è stato provato e può sbagliare di più.',
      'Non sa chiedere i conti al motore di Glifo: Glifo gli dà quelli già fatti e poi controlla i passaggi come sempre.',
      'Scrive quasi solo in inglese: in italiano può sbagliare di più.',
    ])
    // Togliendo la spunta, delle avanzate resta solo quello scelto, con gli altri non certificati.
    all.click()
    expect(uncertified()).toContain('SmolLM2-1.7B-Instruct')
    expect(uncertified()).toContain('Phi-4-mini-instruct')
    expect(uncertified()).not.toContain('Llama-3.1-70B-Instruct')
    expect(select.value).toBe('SmolLM2-1.7B-Instruct')
    select.value = 'Qwen3-4B'
    select.dispatchEvent(new Event('change'))
    expect(changes).toContainEqual({ localModel: 'Qwen3-4B' })
    all.click()
    all.click()
    expect(uncertified()).not.toContain('SmolLM2-1.7B-Instruct')
    // Gemma: l'avviso che chiede la sua licenza.
    all.click()
    select.value = 'gemma-2-2b-it'
    select.dispatchEvent(new Event('change'))
    expect(notes(section)[0]).toBe('Gemma is provided under and subject to the Gemma Terms of Use found at ai.google.dev/gemma/terms')
  })

  it('i modelli già in questo browser, ognuno con quanto pesa e «Togli»; per quello scelto Hugging Face non si chiama', async () => {
    const fetch = huggingFace()
    const base = 'https://huggingface.co/mlc-ai/Qwen3-4B-q4f16_1-MLC/resolve/main/'
    const stored = new Map<string, unknown>([
      [`${base}tensor-cache.json`, { records: [{ dataPath: 'params_shard_0.bin', nbytes: 2_300_000_000 }] }],
      [`${base}params_shard_0.bin`, 'pezzo'],
    ])
    const cache = {
      match: async (url: string) => (stored.has(url) ? { json: async () => stored.get(url), headers: new Headers() } : undefined),
      keys: async () => [...stored.keys()].map((url) => ({ url })),
    }
    vi.stubGlobal('caches', { has: async () => true, open: async () => cache })
    const { section } = explainSection({ localModel: 'Qwen3-4B' })
    const rows = () => [...section.querySelectorAll('.models-here .space-row')].map((r) => [r.querySelector('dt')?.textContent, r.querySelector('.space-size')?.textContent])
    await vi.waitFor(() => expect(rows()).toEqual([['Qwen3 4B, quello scelto', '2,3 GB']]))
    expect(facts(section)[1]).toEqual(['In questo browser', '2,3 GB: le spiegazioni funzionano anche offline'])
    expect(section.querySelector('.models-here button')?.getAttribute('aria-label')).toBe('Togli Qwen3 4B da questo browser')
    expect(fetch).not.toHaveBeenCalled()
  })
})
