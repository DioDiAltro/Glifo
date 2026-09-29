/**
 * Regole per riconoscere le formule `$…$` e `$$…$$`, condivise da editor e
 * anteprima. Ricalcano quelle dell'anteprima Markdown di VS Code
 * (@vscode/markdown-it-katex), così gli appunti restano compatibili.
 */

const DOLLAR = 36
const BACKSLASH = 92

export interface InlineMathMatch {
  /** Posizione subito dopo il delimitatore di chiusura. */
  end: number
  /** `$$…$$` scritto in mezzo al testo: formula in modalità display. */
  display: boolean
  contentFrom: number
  contentTo: number
}

function isWordChar(code: number): boolean {
  return (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code === 95
}

function isSpace(code: number): boolean {
  return code === 32 || code === 9 || code === 10 || code === 13 || code === 12
}

/** `true` se il carattere in `pos` è preceduto da un numero dispari di `\`. */
export function isEscaped(src: string, pos: number): boolean {
  let n = 0
  for (let i = pos - 1; i >= 0 && src.charCodeAt(i) === BACKSLASH; i--) n++
  return n % 2 === 1
}

function findUnescaped(src: string, needle: string, from: number, max: number): number {
  let i = from
  for (;;) {
    const m = src.indexOf(needle, i)
    if (m < 0 || m + needle.length > max) return -1
    if (!isEscaped(src, m)) return m
    i = m + needle.length
  }
}

/** Prova a leggere una formula in linea che inizia in `pos`. */
export function matchInlineMath(src: string, pos: number, max = src.length): InlineMathMatch | null {
  if (src.charCodeAt(pos) !== DOLLAR) return null
  const prev = pos > 0 ? src.charCodeAt(pos - 1) : -1
  if (prev === DOLLAR || prev === BACKSLASH) return null

  if (src.charCodeAt(pos + 1) === DOLLAR) {
    // $$ … $$ in mezzo al testo
    if (src.charCodeAt(pos + 2) === DOLLAR) return null
    const start = pos + 2
    const close = findUnescaped(src, '$$', start, max)
    if (close < 0 || close === start) return null
    const before = src.charCodeAt(close - 1)
    if (before === DOLLAR || before === BACKSLASH) return null
    if (src.charCodeAt(close + 2) === DOLLAR) return null
    return { end: close + 2, display: true, contentFrom: start, contentTo: close }
  }

  // $ … $: l'apertura non può seguire una lettera o una cifra ("costa 5$")
  if (prev !== -1 && !isSpace(prev) && isWordChar(prev)) return null
  const start = pos + 1
  const close = findUnescaped(src, '$', start, max)
  if (close < 0 || close === start) return null
  // …e la chiusura non può essere seguita da lettere o cifre ("$5 e $10")
  const next = close + 1 < src.length ? src.charCodeAt(close + 1) : -1
  if (next === DOLLAR) return null
  if (next !== -1 && !isSpace(next) && isWordChar(next)) return null
  return { end: close + 1, display: false, contentFrom: start, contentTo: close }
}

function countOccurrences(s: string, needle: string): number {
  let n = 0
  for (let i = s.indexOf(needle); i >= 0; i = s.indexOf(needle, i + needle.length)) n++
  return n
}

export type BlockOpen =
  | { kind: 'none' }
  | { kind: 'single'; contentFrom: number; contentTo: number; closeFrom: number }
  | { kind: 'multi'; contentFrom: number }

/**
 * Analizza una riga che inizia (in `pos`) con `$$`: formula a blocco su una
 * sola riga (`$$ x $$`), inizio di un blocco su più righe, oppure niente
 * (in quel caso è una formula in linea).
 */
export function analyzeBlockOpen(text: string, pos: number): BlockOpen {
  if (text.charCodeAt(pos) !== DOLLAR || text.charCodeAt(pos + 1) !== DOLLAR) return { kind: 'none' }
  const restFrom = pos + 2
  const rest = text.slice(restFrom)
  const count = countOccurrences(rest, '$$')
  if (count === 0) return { kind: 'multi', contentFrom: restFrom }
  const trimmed = rest.replace(/\s+$/, '')
  if (count === 1 && trimmed.endsWith('$$')) {
    const closeFrom = restFrom + trimmed.length - 2
    return { kind: 'single', contentFrom: restFrom, contentTo: closeFrom, closeFrom }
  }
  return { kind: 'none' }
}

/** Cerca la chiusura `$$` di un blocco in una riga successiva (-1 se assente). */
export function findBlockClose(text: string, from: number): number {
  const trimmed = text.replace(/\s+$/, '')
  // Come in VS Code: se la riga termina con $$ vale quello, altrimenti il primo $$.
  if (trimmed.length - 2 >= from && trimmed.endsWith('$$')) return trimmed.length - 2
  return text.indexOf('$$', from)
}
