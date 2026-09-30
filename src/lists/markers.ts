/**
 * I marcatori degli elenchi, gli stessi per l'editor e per l'anteprima:
 *
 *   -  *  +  •  .            puntati
 *   1.  1)  (1)              numeri
 *   a)  (a)  a.  A)  (A)     lettere
 *   i)  (i)  i.  I)  (I)     numeri romani
 *   es)  oss)  NB)           etichette (da 2 a 6 lettere), mostrate così come sono scritte
 *
 * Una lettera come «i», «v» o «x» può essere sia una lettera sia un numero
 * romano: si decide guardando l'elemento precedente (vedi `resolveMarker`).
 */

export type MarkerKind = 'bullet' | 'number' | 'letter' | 'roman' | 'label'
/** "1." · "1)" · "(1)" */
export type MarkerStyle = 'dot' | 'paren' | 'parens'

export interface Marker {
  kind: MarkerKind
  /** Il marcatore com'è scritto: "-", "1)", "(a)", "ii)", "es)". */
  text: string
  /** Numeri, lettere e romani: il valore (a = 1, iv = 4); 0 per puntati ed etichette. */
  value: number
  /** Solo numeri, lettere e romani. */
  style: MarkerStyle | null
  upper: boolean
  /** Una lettera che è anche un numero romano (i, v, x): il valore come romano. */
  romanValue: number | null
}

export interface ListLine extends Marker {
  /** Colonna del marcatore (una tabulazione porta al multiplo di 4 successivo). */
  indent: number
  /** Caratteri di rientro prima del marcatore. */
  indentLength: number
  /** Posizione (in caratteri) dove inizia il testo: dopo marcatore, spazi ed eventuale casella. */
  contentStart: number
  /** Colonna del testo. */
  contentColumn: number
  /** Casella delle cose da fare («[ ]» o «[x]»), se c'è. */
  task: string | null
}

const ROMAN: [number, string][] = [
  [10, 'x'],
  [9, 'ix'],
  [5, 'v'],
  [4, 'iv'],
  [1, 'i'],
]

export function toRoman(value: number): string {
  let out = ''
  for (const [n, s] of ROMAN) {
    while (value >= n) {
      out += s
      value -= n
    }
  }
  return out
}

/** Valore di un numero romano scritto con i, v, x (fino a 39); null se non è valido. */
export function romanValue(text: string): number | null {
  const lower = text.toLowerCase()
  if (!/^[ivx]{1,6}$/.test(lower) || (text !== lower && text !== text.toUpperCase())) return null
  let value = 0
  for (let i = 0; i < lower.length; i++) {
    const n = lower[i] === 'x' ? 10 : lower[i] === 'v' ? 5 : 1
    const next = lower[i + 1] === 'x' ? 10 : lower[i + 1] === 'v' ? 5 : lower[i + 1] ? 1 : 0
    value += n < next ? -n : n
  }
  return value > 0 && value < 40 && toRoman(value) === lower ? value : null
}

/** 1 → a, 26 → z, 27 → aa (come le colonne di un foglio di calcolo). */
function toLetters(value: number): string {
  let out = ''
  for (let n = Math.max(1, value); n > 0; n = Math.floor((n - 1) / 26)) out = String.fromCharCode(97 + ((n - 1) % 26)) + out
  return out
}

function wrap(style: MarkerStyle, s: string): string {
  return style === 'dot' ? `${s}.` : style === 'paren' ? `${s})` : `(${s})`
}

/** Un marcatore numerato (numero, lettera o romano) con il valore dato. */
export function numbered(kind: 'number' | 'letter' | 'roman', value: number, style: MarkerStyle, upper = false): Marker {
  const base = kind === 'number' ? String(value) : kind === 'letter' ? toLetters(value) : toRoman(value)
  const s = upper ? base.toUpperCase() : base
  const single = kind === 'letter' && s.length === 1 ? romanValue(s) : null
  return { kind, text: wrap(style, s), value, style, upper: upper && kind !== 'number', romanValue: single }
}

export function bullet(text: string): Marker {
  return { kind: 'bullet', text, value: 0, style: null, upper: false, romanValue: null }
}

export function label(text: string): Marker {
  return { kind: 'label', text, value: 0, style: null, upper: false, romanValue: null }
}

const BULLET = /^(?:[-*+•]|\.(?=[ \t]))/
const NUMBER = /^(\d{1,9})([.)])|^\((\d{1,9})\)/
const WORD_PAREN = /^(\p{L}{1,6})\)/u
const IN_PARENS = /^\(([a-zA-Z]{1,6})\)/
const LOWER_DOT = /^([a-z]{1,6})\./

/** Il marcatore all'inizio di `s` (senza rientro), seguito da uno spazio o dalla fine della riga. */
export function readMarker(s: string): Marker | null {
  const m = parseMarkerText(s)
  if (!m) return null
  const after = s.charAt(m.text.length)
  return after === '' || after === ' ' || after === '\t' ? m : null
}

function parseMarkerText(s: string): Marker | null {
  const b = BULLET.exec(s)
  if (b) return bullet(b[0])
  const n = NUMBER.exec(s)
  if (n) return n[1] ? numbered('number', Number(n[1]), n[2] === '.' ? 'dot' : 'paren') : numbered('number', Number(n[3]), 'parens')
  const p = IN_PARENS.exec(s)
  if (p) return lettersMarker(p[1], 'parens')
  const d = LOWER_DOT.exec(s)
  if (d) return lettersMarker(d[1], 'dot')
  const w = WORD_PAREN.exec(s)
  if (w) return lettersMarker(w[1], 'paren') ?? (w[1].length >= 2 ? label(w[0]) : null)
  return null
}

/** Lettera singola o numero romano; null se non è né l'una né l'altro. */
function lettersMarker(letters: string, style: MarkerStyle): Marker | null {
  const upper = letters === letters.toUpperCase()
  if (/^[a-zA-Z]$/.test(letters)) return numbered('letter', letters.toLowerCase().charCodeAt(0) - 96, style, upper)
  const roman = romanValue(letters)
  return roman === null ? null : numbered('roman', roman, style, upper)
}

function column(text: string, end: number, start = 0, startColumn = 0): number {
  let col = startColumn
  for (let i = start; i < end; i++) col = text[i] === '\t' ? col + 4 - (col % 4) : col + 1
  return col
}

/** La riga come elemento di un elenco; null se non inizia con un marcatore. */
export function parseListLine(text: string): ListLine | null {
  const indentLength = /^[ \t]*/.exec(text)![0].length
  const marker = readMarker(text.slice(indentLength))
  if (!marker) return null
  let pos = indentLength + marker.text.length
  while (text[pos] === ' ' || text[pos] === '\t') pos++
  let task: string | null = null
  const box = /^\[[ xX]\](?=[ \t]|$)/.exec(text.slice(pos))
  if (box) {
    task = box[0]
    pos += box[0].length
    while (text[pos] === ' ' || text[pos] === '\t') pos++
  }
  const indent = column(text, indentLength)
  return {
    ...marker,
    indent,
    indentLength,
    contentStart: pos,
    contentColumn: column(text, pos, indentLength, indent),
    task,
  }
}

/**
 * Lettera o numero romano? Una «i» dopo una «h)» è una lettera; da sola, o
 * dopo un altro romano, è un numero romano (lo stesso per «v» e «x»).
 */
export function resolveMarker(m: Marker, previous: Marker | null): Marker {
  if (m.kind !== 'letter' || m.romanValue === null) return m
  const asRoman = numbered('roman', m.romanValue, m.style!, m.upper)
  if (previous && previous.style === m.style && previous.upper === m.upper) {
    if (previous.kind === 'roman' && previous.value === m.romanValue - 1) return asRoman
    if (previous.kind === 'letter' && previous.value === m.value - 1) return m
  }
  return m.romanValue === 1 ? asRoman : m
}

/**
 * Il marcatore che segue: 1) → 2), a) → b), ii) → iii); puntati ed etichette
 * restano uguali. Con `previous` (anche null) il marcatore viene prima deciso
 * tra lettera e romano; senza, si considera già deciso.
 */
export function nextMarker(m: Marker, previous?: Marker | null): Marker {
  const r = previous === undefined ? m : resolveMarker(m, previous)
  if (r.kind === 'bullet' || r.kind === 'label') return r
  return numbered(r.kind, r.value + 1, r.style!, r.upper)
}

/** Lo stesso tipo di marcatore (già deciso), dal primo valore: 3) → 1), c) → a). */
export function firstMarker(m: Marker): Marker {
  if (m.kind === 'bullet' || m.kind === 'label') return m
  return numbered(m.kind, 1, m.style!, m.upper)
}

/** Lo stesso tipo di marcatore con un altro valore. */
export function withValue(m: Marker, value: number): Marker {
  if (m.kind === 'bullet' || m.kind === 'label') return m
  return numbered(m.kind, value, m.style!, m.upper)
}

/**
 * Il marcatore per un sotto-elenco nuovo, come nei programmi di scrittura:
 * numeri → lettere → numeri romani → numeri; i puntati restano uguali,
 * sotto un'etichetta si usa il trattino.
 */
export function childMarker(m: Marker): Marker {
  switch (m.kind) {
    case 'number':
      return numbered('letter', 1, m.style!)
    case 'letter':
      return numbered('roman', 1, m.style!, m.upper)
    case 'roman':
      return numbered('number', 1, m.style!)
    case 'bullet':
      return m
    case 'label':
      return bullet('-')
  }
}

/** Due marcatori stanno nello stesso elenco se sono dello stesso tipo e forma. */
export function sameList(a: Marker, b: Marker): boolean {
  if (a.kind !== b.kind) return false
  if (a.kind === 'label') return true
  if (a.kind === 'bullet') return bulletGroup(a.text) === bulletGroup(b.text)
  return a.style === b.style && a.upper === b.upper
}

/** «•» e «.» sono lo stesso puntato (il pallino). */
export function bulletGroup(text: string): string {
  return text === '.' ? '•' : text
}
