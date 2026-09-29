import { readJson, writeJson } from './storage'

export type Theme = 'auto' | 'light' | 'dark'
export type ViewMode = 'editor' | 'split' | 'preview'

export interface Settings {
  theme: Theme
  view: ViewMode
  /** Aggiunge i `$` quando si inserisce un simbolo fuori da una formula. */
  autoWrap: boolean
  fontSize: number
  notesOpen: boolean
  symbolsOpen: boolean
  /** Chiave API di Anthropic per l'assistente (resta nel browser). */
  apiKey: string
  model: string
  /** URL di un proxy compatibile con l'API di Anthropic (facoltativo). */
  apiBaseUrl: string
}

export const AI_MODELS = [
  { id: 'claude-opus-5-5', label: 'Claude Opus 5.5 (predefinito)' },
  { id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5' },
  { id: 'claude-haiku-4-5', label: 'Claude Haiku 4.5 (il più economico)' },
] as const

const KEY = 'glifo.settings.v1'

export const DEFAULT_SETTINGS: Settings = {
  theme: 'auto',
  view: 'split',
  autoWrap: true,
  fontSize: 16,
  notesOpen: true,
  symbolsOpen: true,
  apiKey: '',
  model: 'claude-opus-5-5',
  apiBaseUrl: '',
}

export function loadSettings(): Settings {
  return { ...DEFAULT_SETTINGS, ...readJson<Partial<Settings>>(KEY, {}) }
}

export function saveSettings(s: Settings): void {
  writeJson(KEY, s)
}
