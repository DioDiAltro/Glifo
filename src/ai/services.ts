/**
 * I servizi di AI che si possono usare con la propria chiave (deciso il 5 ottobre 2026, vedi
 * ABBONAMENTI.md, «I modelli e le chiavi API»): Anthropic, con la sua «lingua», e quelli che parlano
 * quella di OpenAI. Gemini ha un piano gratuito senza carta di credito (la chiave si fa in Google AI
 * Studio); OpenRouter dà con una chiave sola tanti modelli, anche gratis; Ollama fa girare i modelli
 * aperti sul proprio computer. La chiave resta nel browser e il testo va direttamente al servizio.
 */
import { texts } from '../i18n'
import type { Settings } from '../store/settings'

// Solo quello che si vede nelle impostazioni (src/ui/dialogs.ts): i nomi nell'elenco e la chiave da scrivere.
const T = texts({
  gemini: ['Google Gemini (gratis con una chiave di AI Studio)', 'Google Gemini (free with an AI Studio key)'],
  openrouter: ['OpenRouter (tanti modelli, anche gratis)', 'OpenRouter (many models, some free)'],
  ollama: ['Ollama (sul tuo computer)', 'Ollama (on your computer)'],
  compatible: ['Un altro servizio compatibile con OpenAI', 'Another OpenAI-compatible service'],
  compatibleKey: ['la chiave del servizio', 'the service\'s key'],
})

export type AiServiceId = 'anthropic' | 'gemini' | 'openrouter' | 'ollama' | 'compatible'

export interface AiService {
  id: AiServiceId
  /** Come si chiama nell'elenco delle impostazioni. */
  label: string
  /** Come si chiama nelle frasi («la chiave di …»). */
  name: string
  /** L'indirizzo dell'API compatibile con OpenAI (senza /chat/completions); vuoto: lo scrive chi lo usa. */
  url: string
  /** Il modello che si usa se non se ne sceglie un altro, e quelli da proporre. */
  model: string
  models: string[]
  /** Dove si fa la chiave. */
  keyUrl?: string
  keyPlaceholder: string
  /** Senza chiave non si parte (Ollama, sul proprio computer, non ne ha bisogno). */
  needsKey: boolean
}

export const AI_SERVICES: readonly AiService[] = [
  { id: 'anthropic', label: 'Anthropic (Claude)', name: 'Anthropic', url: '', model: 'claude-opus-5-5', models: [], keyUrl: 'https://console.anthropic.com/settings/keys', keyPlaceholder: 'sk-ant-…', needsKey: true },
  {
    id: 'gemini',
    get label() { return T.gemini },
    name: 'Gemini',
    url: 'https://generativelanguage.googleapis.com/v1beta/openai',
    model: 'gemini-flash-lite-latest',
    models: ['gemini-flash-lite-latest', 'gemini-flash-latest'],
    keyUrl: 'https://aistudio.google.com/apikey',
    keyPlaceholder: 'AIza…',
    needsKey: true,
  },
  {
    id: 'openrouter',
    get label() { return T.openrouter },
    name: 'OpenRouter',
    url: 'https://openrouter.ai/api/v1',
    model: 'openrouter/free',
    models: ['openrouter/free', 'qwen/qwen3-8b'],
    keyUrl: 'https://openrouter.ai/keys',
    keyPlaceholder: 'sk-or-…',
    needsKey: true,
  },
  { id: 'ollama', get label() { return T.ollama }, name: 'Ollama', url: 'http://localhost:11434/v1', model: 'qwen3', models: ['qwen3', 'gemma3', 'llama3.2'], keyPlaceholder: '', needsKey: false },
  { id: 'compatible', get label() { return T.compatible }, name: 'il servizio', url: '', model: '', models: [], get keyPlaceholder() { return T.compatibleKey }, needsKey: false },
]

export function aiService(id: string | undefined): AiService {
  return AI_SERVICES.find((s) => s.id === id) ?? AI_SERVICES[0]
}

/** Quello che serve per fare una domanda con il servizio scelto nelle impostazioni (vedi askAi). */
export function aiSettingsOf(s: Settings): { service: AiServiceId; apiKey: string; model: string; baseUrl: string } {
  const service = aiService(s.aiService)
  if (service.id === 'anthropic') return { service: 'anthropic', apiKey: s.apiKey, model: s.model, baseUrl: s.apiBaseUrl }
  return {
    service: service.id,
    apiKey: s.aiKeys?.[service.id]?.trim() ?? '',
    model: s.aiModels?.[service.id]?.trim() || service.model,
    baseUrl: s.aiUrls?.[service.id]?.trim() || service.url,
  }
}
