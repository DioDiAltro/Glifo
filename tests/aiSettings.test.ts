// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { openSettingsDialog } from '../src/ui/dialogs'
import { DEFAULT_SETTINGS, type Settings } from '../src/store/settings'

// jsdom non ha le finestre modali.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.open = true
}
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  this.open = false
  this.dispatchEvent(new Event('close'))
}

afterEach(() => document.body.replaceChildren())

function open(settings: Partial<Settings> = {}): { changes: Partial<Settings>[]; section: HTMLElement } {
  const changes: Partial<Settings>[] = []
  openSettingsDialog({
    settings: { ...DEFAULT_SETTINGS, ...settings },
    onChange: (next) => changes.push(next),
    personalWords: [],
    onPersonalWordsChange: (words) => words,
    onBackup: () => {},
    onRestore: () => {},
  })
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
