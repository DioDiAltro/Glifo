/**
 * I valori delle celle delle tabelle (i blocchi ```tabella): numeri, testi, VERO/FALSO, errori come
 * in Excel (#DIV/0!, #VALORE!…) o niente. Gli errori hanno anche una frase che spiega cosa è successo.
 */

export type ErrorCode = '#DIV/0!' | '#N/D' | '#VALORE!' | '#RIF!' | '#NOME?' | '#NUM!' | '#ERRORE!'

export interface SheetError {
  readonly error: ErrorCode
  /** Cosa è successo, in italiano: si legge passando sopra la cella. */
  readonly message: string
}

/** null è la cella vuota. */
export type Value = number | string | boolean | SheetError | null

const MESSAGES: Record<ErrorCode, string> = {
  '#DIV/0!': 'Divisione per zero',
  '#N/D': 'Il valore cercato non c\'è',
  '#VALORE!': 'Un valore non è del tipo giusto (per esempio un testo dove serve un numero)',
  '#RIF!': 'Il riferimento non è valido',
  '#NOME?': 'Nome sconosciuto',
  '#NUM!': 'Il numero non è valido',
  '#ERRORE!': 'La formula non si legge',
}

export function sheetError(error: ErrorCode, message = MESSAGES[error]): SheetError {
  return { error, message }
}

export function isError(v: unknown): v is SheetError {
  return typeof v === 'object' && v !== null && 'error' in v
}

/** Gli errori scritti nelle formule, anche con il nome inglese di Excel. */
export const ERROR_NAMES: Record<string, ErrorCode> = {
  '#DIV/0!': '#DIV/0!',
  '#N/D': '#N/D',
  '#N/A': '#N/D',
  '#VALORE!': '#VALORE!',
  '#VALUE!': '#VALORE!',
  '#RIF!': '#RIF!',
  '#REF!': '#RIF!',
  '#NOME?': '#NOME?',
  '#NAME?': '#NOME?',
  '#NUM!': '#NUM!',
  '#ERRORE!': '#ERRORE!',
  '#ERROR!': '#ERRORE!',
}
