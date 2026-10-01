import { readJson, writeJson } from './storage'

/**
 * Le misure delle sezioni, che si cambiano trascinando i bordi. Valgono per questo
 * dispositivo (non vanno nell'account): ogni schermo ha le sue.
 */
export interface PaneSizes {
  /** Larghezza dell'elenco degli appunti, in pixel. */
  notesWidth: number
  /** Larghezza del pannello dei simboli, in pixel. */
  symbolsWidth: number
  /** Nella vista divisa, la parte del posto che va al testo (il resto è dell'anteprima). */
  editorShare: number
}

export interface SizeLimits {
  min: number
  max: number
  /** La misura di partenza, che torna con un doppio clic sul bordo. */
  initial: number
}

export const NOTES_WIDTH: SizeLimits = { min: 200, max: 480, initial: 250 }
export const SYMBOLS_WIDTH: SizeLimits = { min: 280, max: 640, initial: 348 }
export const EDITOR_SHARE: SizeLimits = { min: 0.15, max: 0.85, initial: 0.5 }

export const PANE_LIMITS: Record<keyof PaneSizes, SizeLimits> = {
  notesWidth: NOTES_WIDTH,
  symbolsWidth: SYMBOLS_WIDTH,
  editorShare: EDITOR_SHARE,
}

export const LAYOUT_KEY = 'glifo.layout.v1'

/** Una misura salvata, riportata dentro i limiti (quella di partenza, se non è un numero). */
export function validSize(value: unknown, limits: SizeLimits): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return limits.initial
  return Math.min(limits.max, Math.max(limits.min, value))
}

function stored(): Record<string, unknown> {
  const saved = readJson<unknown>(LAYOUT_KEY, {})
  return typeof saved === 'object' && saved !== null && !Array.isArray(saved) ? (saved as Record<string, unknown>) : {}
}

export function loadPaneSizes(): PaneSizes {
  const saved = stored()
  return {
    notesWidth: validSize(saved.notesWidth, NOTES_WIDTH),
    symbolsWidth: validSize(saved.symbolsWidth, SYMBOLS_WIDTH),
    editorShare: validSize(saved.editorShare, EDITOR_SHARE),
  }
}

/**
 * Salva solo le misure cambiate, sopra quelle già salvate: se Glifo è aperto anche in
 * un'altra finestra, quelle cambiate lì restano.
 */
export function savePaneSizes(changes: Partial<PaneSizes>): void {
  writeJson(LAYOUT_KEY, { ...stored(), ...changes })
}
