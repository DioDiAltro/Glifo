import { readJson, writeJson } from './storage'

export type Theme = 'auto' | 'light' | 'dark'
export type ViewMode = 'editor' | 'split' | 'preview'
/** Lingue del controllo ortografico: la prima è quella principale. */
export type SpellLanguages = 'it+en' | 'it' | 'en'

export interface Settings {
  theme: Theme
  view: ViewMode
  /** Aggiunge i `$` quando si inserisce un simbolo fuori da una formula. */
  autoWrap: boolean
  /** Sottolinea le parole scritte male. */
  spellcheck: boolean
  spellLanguages: SpellLanguages
  fontSize: number
  notesOpen: boolean
  symbolsOpen: boolean
  /** Chiave API di Anthropic per l'assistente (resta nel browser). */
  apiKey: string
  model: string
  /** URL di un proxy compatibile con l'API di Anthropic (facoltativo). */
  apiBaseUrl: string
}

export const SPELL_LANGUAGES: { id: SpellLanguages; label: string }[] = [
  { id: 'it+en', label: 'Italiano e inglese' },
  { id: 'it', label: 'Solo italiano' },
  { id: 'en', label: 'Solo inglese' },
]

export const AI_MODELS = [
  { id: 'claude-opus-5-5', label: 'Claude Opus 5.5 (predefinito)' },
  { id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5' },
  { id: 'claude-haiku-4-5', label: 'Claude Haiku 4.5 (il più economico)' },
] as const

/** Chiave in localStorage: serve anche a riconoscere le modifiche fatte in un'altra scheda. */
export const SETTINGS_KEY = 'glifo.settings.v1'

/** Queste valgono solo per la finestra in cui si cambiano; le altre per tutte le schede. */
const WINDOW_ONLY: (keyof Settings)[] = ['view', 'notesOpen', 'symbolsOpen']

export const DEFAULT_SETTINGS: Settings = {
  theme: 'auto',
  view: 'split',
  autoWrap: true,
  spellcheck: true,
  spellLanguages: 'it+en',
  fontSize: 16,
  notesOpen: true,
  symbolsOpen: true,
  apiKey: '',
  model: 'claude-opus-5-5',
  apiBaseUrl: '',
}

function stored(): Partial<Settings> {
  const saved = readJson<unknown>(SETTINGS_KEY, {})
  return typeof saved === 'object' && saved !== null && !Array.isArray(saved) ? (saved as Partial<Settings>) : {}
}

export function loadSettings(): Settings {
  return { ...DEFAULT_SETTINGS, ...stored() }
}

/**
 * Salva solo i valori cambiati, sopra quelli già salvati: se Glifo è aperto anche in
 * un'altra scheda, le impostazioni cambiate lì non tornano come prima.
 */
export function saveSettings(changes: Partial<Settings>): void {
  writeJson(SETTINGS_KEY, { ...stored(), ...changes })
}

/** Le impostazioni da prendere quando cambiano in un'altra scheda (tema, correttore, chiave API…). */
export function sharedSettings(s: Settings): Partial<Settings> {
  const shared: Partial<Settings> = { ...s }
  for (const key of WINDOW_ONLY) delete shared[key]
  return shared
}
