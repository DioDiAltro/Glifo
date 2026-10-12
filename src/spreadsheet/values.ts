/**
 * I valori delle celle delle tabelle (i blocchi ```tabella): numeri, testi, VERO/FALSO, errori come
 * in Excel (#DIV/0!, #VALORE!…) o niente. Gli errori hanno anche una frase che spiega cosa è successo.
 * Il codice dell'errore è sempre quello dell'Excel italiano (si scrive così nelle formule della nota);
 * con Glifo in inglese si mostra quello dell'Excel inglese (`errorName`).
 */
import { pick, texts } from '../i18n'

const T = texts({
  divZero: ['Divisione per zero', 'Division by zero'],
  notFound: ['Il valore cercato non c\'è', 'The value you\'re looking for isn\'t there'],
  wrongType: [
    'Un valore non è del tipo giusto (per esempio un testo dove serve un numero)',
    'A value is of the wrong type (for example text where a number is needed)',
  ],
  badRef: ['Il riferimento non è valido', 'The reference isn\'t valid'],
  unknownName: ['Nome sconosciuto', 'Unknown name'],
  badNumber: ['Il numero non è valido', 'The number isn\'t valid'],
  unreadable: ['La formula non si legge', 'The formula can\'t be read'],
})

export type ErrorCode = '#DIV/0!' | '#N/D' | '#VALORE!' | '#RIF!' | '#NOME?' | '#NUM!' | '#ERRORE!'

export interface SheetError {
  readonly error: ErrorCode
  /** Cosa è successo, nella lingua di Glifo: si legge passando sopra la cella. */
  readonly message: string
}

/** null è la cella vuota. */
export type Value = number | string | boolean | SheetError | null

function defaultMessage(error: ErrorCode): string {
  switch (error) {
    case '#DIV/0!':
      return T.divZero
    case '#N/D':
      return T.notFound
    case '#VALORE!':
      return T.wrongType
    case '#RIF!':
      return T.badRef
    case '#NOME?':
      return T.unknownName
    case '#NUM!':
      return T.badNumber
    case '#ERRORE!':
      return T.unreadable
  }
}

export function sheetError(error: ErrorCode, message = defaultMessage(error)): SheetError {
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

/** Gli errori come li scrive l'Excel inglese (#ERROR! come Fogli Google: Excel non l'ha). */
export const ENGLISH_ERRORS: Record<ErrorCode, string> = {
  '#DIV/0!': '#DIV/0!',
  '#N/D': '#N/A',
  '#VALORE!': '#VALUE!',
  '#RIF!': '#REF!',
  '#NOME?': '#NAME?',
  '#NUM!': '#NUM!',
  '#ERRORE!': '#ERROR!',
}

/** Il codice dell'errore da mostrare: #N/D in italiano, #N/A in inglese. */
export function errorName(error: ErrorCode): string {
  return pick([error, ENGLISH_ERRORS[error]])
}
