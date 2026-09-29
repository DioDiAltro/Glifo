/**
 * Integrazione facoltativa con il visualizzatore di claude.ai, per quando
 * Glifo è pubblicato come demo (Artifact). Fuori da claude.ai
 * `window.claude` non esiste e tutte queste funzioni restituiscono null:
 * l'app usa i suoi percorsi normali.
 */

interface ClaudeRuntime {
  use(name: string): Promise<unknown>
}

export type ModelTier = 'quick' | 'default' | 'complex'

export interface HostSample {
  json(input: string, options?: { modelTier?: ModelTier; signal?: AbortSignal }): Promise<unknown>
}

export interface HostDownloads {
  save(request: { filename: string; data: string }): Promise<{ status: 'saved' | 'delivered' }>
}

/** Errore restituito dal visualizzatore: un oggetto semplice con un codice. */
export interface HostError {
  code: string
  message: string
}

export function isHostError(err: unknown): err is HostError {
  return typeof err === 'object' && err !== null && typeof (err as HostError).code === 'string'
}

function runtime(): ClaudeRuntime | null {
  const c = (window as unknown as { claude?: ClaudeRuntime }).claude
  return c && typeof c.use === 'function' ? c : null
}

/** La pagina è aperta dentro il visualizzatore di claude.ai. */
export function inClaudeViewer(): boolean {
  return typeof window !== 'undefined' && runtime() !== null
}

const cache = new Map<string, Promise<unknown>>()

function capability<T>(name: string): Promise<T | null> {
  const c = typeof window === 'undefined' ? null : runtime()
  if (!c) return Promise.resolve(null)
  let p = cache.get(name)
  if (!p) {
    p = c.use(name).then(
      (v) => v ?? null,
      () => null,
    )
    cache.set(name, p)
  }
  return p as Promise<T | null>
}

/** Chiedere a Claude con l'account di chi guarda la demo (niente chiave API). */
export function hostSample(): Promise<HostSample | null> {
  return capability<HostSample>('sample')
}

/** Salvare un file dalla demo (i download normali lì sono bloccati). */
export function hostDownloads(): Promise<HostDownloads | null> {
  return capability<HostDownloads>('downloads')
}
