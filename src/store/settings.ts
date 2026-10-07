import type { ExplainTone } from '../ai/explain'
import { DEFAULT_LOCAL_MODEL } from '../ai/localModels'
import { readJson, writeJson } from './storage'

export type Theme = 'auto' | 'light' | 'dark'
/** Le viste: il testo, il testo con l'anteprima, l'anteprima, il testo con la lavagna (src/board). */
export type ViewMode = 'editor' | 'split' | 'preview' | 'board'
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
  /** Il servizio dell'assistente: Anthropic o uno che parla la «lingua» di OpenAI (vedi src/ai/services.ts). */
  aiService: string
  /** Per gli altri servizi: la chiave, il modello e l'indirizzo di ognuno (restano nel browser). */
  aiKeys: Record<string, string>
  aiModels: Record<string, string>
  aiUrls: Record<string, string>
  /**
   * «Spiegami» (src/ai/explain.ts, in prova): il modello che gira nel browser (src/ai/localModels.ts;
   * resta su questo dispositivo, come il modello scaricato) e il tono delle spiegazioni.
   */
  localModel: string
  explainTone: ExplainTone
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
  aiService: 'anthropic',
  aiKeys: {},
  aiModels: {},
  aiUrls: {},
  localModel: DEFAULT_LOCAL_MODEL,
  explainTone: 'professore',
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

/**
 * Le impostazioni che vanno con l'account, su ogni dispositivo. Le altre dipendono dallo
 * schermo (vista e pannelli), e le chiavi API con il proxy e il servizio dell'assistente (che può
 * essere Ollama, su un computer solo) restano in questo browser.
 */
export const ACCOUNT_SETTINGS = ['theme', 'autoWrap', 'spellcheck', 'spellLanguages', 'fontSize', 'model'] as const satisfies readonly (keyof Settings)[]

export function isAccountSetting(key: string): boolean {
  return (ACCOUNT_SETTINGS as readonly string[]).includes(key)
}

export function accountSettings(s: Settings): Record<string, unknown> {
  return Object.fromEntries(ACCOUNT_SETTINGS.map((key) => [key, s[key]]))
}

/** Le impostazioni arrivate dall'account, tenendo solo i valori che questa versione di Glifo conosce. */
export function validAccountSettings(values: Record<string, unknown>): Partial<Settings> {
  const out: Partial<Settings> = {}
  const { theme, autoWrap, spellcheck, spellLanguages, fontSize, model } = values
  if (theme === 'auto' || theme === 'light' || theme === 'dark') out.theme = theme
  if (typeof autoWrap === 'boolean') out.autoWrap = autoWrap
  if (typeof spellcheck === 'boolean') out.spellcheck = spellcheck
  const language = SPELL_LANGUAGES.find((l) => l.id === spellLanguages)
  if (language) out.spellLanguages = language.id
  if (typeof fontSize === 'number' && fontSize >= 13 && fontSize <= 22) out.fontSize = Math.round(fontSize)
  const aiModel = AI_MODELS.find((m) => m.id === model)
  if (aiModel) out.model = aiModel.id
  return out
}

/** Le impostazioni da prendere quando cambiano in un'altra scheda (tema, correttore, chiave API…). */
export function sharedSettings(s: Settings): Partial<Settings> {
  const shared: Partial<Settings> = { ...s }
  for (const key of WINDOW_ONLY) delete shared[key]
  return shared
}
