/**
 * I numeri delle tabelle all'italiana, come in Excel: si scrivono con la virgola (1,5), i punti
 * delle migliaia (1.000), in euro (1,50 €) o in percentuale (22%); si mostrano nel formato della
 * cella. I formati sono pochi: generale (come sono), numero con i decimali fissi e i punti delle
 * migliaia, euro e percentuale.
 */
import { ERROR_NAMES, sheetError, type Value } from './values'

export type Format =
  | { kind: 'general' }
  | { kind: 'number'; decimals: number }
  | { kind: 'euro'; decimals: number }
  | { kind: 'percent'; decimals: number }

export const GENERAL: Format = { kind: 'general' }
export const MAX_DECIMALS = 10

export function sameFormat(a: Format, b: Format): boolean {
  return a.kind === b.kind && (a.kind === 'general' || a.decimals === (b as { decimals: number }).decimals)
}

/** I decimali del formato (0 per quello generale). */
export function decimalsOf(f: Format): number {
  return f.kind === 'general' ? 0 : f.decimals
}

// ——— Leggere quello che si scrive in una cella ———

/** 1.234,5 (con i punti delle migliaia; il primo gruppo non comincia con 0). */
const GROUPED = /^[1-9]\d{0,2}(?:\.\d{3})+(?:,\d+)?$/
/** 1234,5 o ,5 */
const COMMA = /^\d+(?:,\d+)?$|^,\d+$/
/** 3.14 o .5: il punto come in inglese, quando non sono migliaia. */
const DOT = /^\d+\.\d+$|^\.\d+$/
const EXPONENT = /^\d+(?:[.,]\d+)?[eE][-+]?\d+$/

interface Unsigned {
  value: number
  /** Quante cifre dopo la virgola sono state scritte. */
  decimals: number
  /** Scritto con i punti delle migliaia. */
  grouped: boolean
}

function readUnsigned(s: string): Unsigned | null {
  if (GROUPED.test(s)) {
    const [int, dec = ''] = s.split(',')
    return { value: Number(int.replace(/\./g, '') + (dec ? `.${dec}` : '')), decimals: dec.length, grouped: true }
  }
  if (COMMA.test(s)) {
    const [int, dec = ''] = s.split(',')
    return { value: Number((int || '0') + (dec ? `.${dec}` : '')), decimals: dec.length, grouped: false }
  }
  if (DOT.test(s)) return { value: Number(s), decimals: s.length - s.indexOf('.') - 1, grouped: false }
  if (EXPONENT.test(s)) return { value: Number(s.replace(',', '.')), decimals: 0, grouped: false }
  return null
}

/** Un numero scritto in una cella, con il formato che fa capire: «1,50 €» è in euro con due decimali. */
export function readNumber(text: string): { value: number; format: Format } | null {
  let s = text.replace(/[  ]/g, ' ').trim()
  let sign = 1
  const takeSign = () => {
    if (/^[-−–]/.test(s)) {
      sign = -sign
      s = s.slice(1).trim()
    } else if (s.startsWith('+')) {
      s = s.slice(1).trim()
    }
  }
  takeSign()
  let euro = false
  let percent = false
  if (s.startsWith('€')) {
    euro = true
    s = s.slice(1).trim()
    takeSign()
  } else if (s.endsWith('€')) {
    euro = true
    s = s.slice(0, -1).trim()
  } else if (/\s(?:euro|eur)$/i.test(s)) {
    euro = true
    s = s.replace(/\s(?:euro|eur)$/i, '').trim()
  } else if (s.endsWith('%')) {
    percent = true
    s = s.slice(0, -1).trim()
  }
  const n = readUnsigned(s)
  if (!n || !Number.isFinite(n.value)) return null
  const value = sign * n.value
  const decimals = Math.min(n.decimals, MAX_DECIMALS)
  if (percent) return { value: tidy(value / 100), format: { kind: 'percent', decimals } }
  // Come Excel: 10 € senza decimali, 1,5 € con due.
  if (euro) return { value, format: { kind: 'euro', decimals: decimals > 0 ? Math.max(2, decimals) : 0 } }
  if (n.grouped) return { value, format: { kind: 'number', decimals } }
  return { value, format: GENERAL }
}

/**
 * Il valore di quello che si scrive in una cella che non è una formula: un numero (anche in euro o
 * in percentuale), VERO o FALSO, un errore come #N/D, o un testo. Con l'apostrofo davanti è
 * sempre testo, come in Excel: '0123.
 */
export function readInput(text: string): { value: Value; format: Format } {
  const s = text.trim()
  if (!s) return { value: null, format: GENERAL }
  if (s.startsWith("'")) return { value: s.slice(1), format: GENERAL }
  const upper = s.toUpperCase()
  if (upper === 'VERO') return { value: true, format: GENERAL }
  if (upper === 'FALSO') return { value: false, format: GENERAL }
  const number = readNumber(s)
  if (number) return number
  const error = ERROR_NAMES[upper]
  if (error) return { value: sheetError(error), format: GENERAL }
  return { value: s, format: GENERAL }
}

// ——— Arrotondare e scrivere i numeri ———

/** Toglie il rumore delle cifre binarie: 0,1 + 0,2 fa 0,3. */
export function tidy(x: number): number {
  return Number.isFinite(x) ? Number(x.toPrecision(15)) : x
}

function shift(x: number, digits: number): number {
  const [m, e] = x.toExponential().split('e')
  return Number(`${m}e${Number(e) + digits}`)
}

/** Arrotonda a `digits` decimali (anche negativi: le decine, le centinaia), il 5 lontano da zero, come Excel. */
export function roundTo(x: number, digits: number, mode: 'round' | 'up' | 'down' = 'round'): number {
  if (!Number.isFinite(x) || x === 0) return x
  const sign = Math.sign(x)
  const scaled = tidy(shift(Math.abs(tidy(x)), digits))
  const whole = mode === 'up' ? Math.ceil(scaled) : mode === 'down' ? Math.floor(scaled) : Math.round(scaled)
  return whole === 0 ? 0 : sign * shift(whole, -digits)
}

/** Le cifre intere con i punti delle migliaia: 1234567 → 1.234.567. */
function group(int: string): string {
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

/** Con `decimals` decimali fissi e i punti delle migliaia: 1.234,50. */
export function fixedNumber(x: number, decimals: number): string {
  const r = roundTo(x, decimals)
  if (Math.abs(r) >= 1e15) return generalNumber(r)
  const [int, dec] = Math.abs(r).toFixed(decimals).split('.')
  return `${r < 0 ? '-' : ''}${group(int)}${dec ? `,${dec}` : ''}`
}

/**
 * Il formato generale, come in Excel: al massimo 10 cifre significative, senza zeri in fondo e senza
 * i punti delle migliaia; i numeri molto grandi o molto piccoli con l'esponente (1,5E+12).
 */
export function generalNumber(x: number): string {
  if (x === 0 || Object.is(x, -0)) return '0'
  const abs = Math.abs(x)
  if (abs >= 1e11 || abs < 1e-6) {
    const [m, e] = x.toExponential(5).split('e')
    const exp = Number(e)
    return `${m.replace(/\.?0+$/, '').replace('.', ',')}E${exp < 0 ? '-' : '+'}${String(Math.abs(exp)).padStart(2, '0')}`
  }
  const r = Number.isInteger(x) ? x : Number(x.toPrecision(10))
  return String(r).replace('.', ',')
}

/** Il numero nel formato della cella. */
export function formatNumber(x: number, format: Format): string {
  if (!Number.isFinite(x)) return '#NUM!'
  switch (format.kind) {
    case 'general':
      return generalNumber(x)
    case 'number':
      return fixedNumber(x, format.decimals)
    case 'euro':
      return `${fixedNumber(x, format.decimals)} €`
    case 'percent':
      return `${fixedNumber(tidy(x * 100), format.decimals)}%`
  }
}

/** Il valore come si vede nella cella. */
export function formatValue(value: Value, format: Format): string {
  if (value === null) return ''
  if (typeof value === 'boolean') return value ? 'VERO' : 'FALSO'
  if (typeof value === 'string') return value
  if (typeof value === 'number') return formatNumber(value, format)
  return value.error
}

// ——— I formati scritti nella tabella ———

/**
 * Il codice del formato, come quelli di Excel: «0,00 €», «0%», «0,0», «generale». Si scrive tra
 * graffe dopo il contenuto della cella, quando il formato non si capisce già da quello che c'è
 * scritto: =B2/B5 {0,0%}.
 */
export function formatCode(f: Format): string {
  if (f.kind === 'general') return 'generale'
  const digits = `0${f.decimals > 0 ? `,${'0'.repeat(f.decimals)}` : ''}`
  if (f.kind === 'euro') return `${digits} €`
  if (f.kind === 'percent') return `${digits}%`
  return digits
}

/** Il formato dal suo codice; null se il codice non è uno di quelli. Accetta anche «#.##0,00 €» di Excel. */
export function parseFormatCode(code: string): Format | null {
  const s = code.trim().toLowerCase().replace(/\s+/g, ' ')
  if (s === 'generale' || s === 'general') return GENERAL
  if (s === '€' || s === 'euro') return { kind: 'euro', decimals: 2 }
  if (s === '%') return { kind: 'percent', decimals: 0 }
  const m = /^(€ ?)?(?:#\.##)?0(?:,(0{1,10}))?(?: ?(€|%))?$/.exec(s)
  if (!m || (m[1] && m[3])) return null
  const decimals = m[2]?.length ?? 0
  if (m[1] || m[3] === '€') return { kind: 'euro', decimals }
  if (m[3] === '%') return { kind: 'percent', decimals }
  return { kind: 'number', decimals }
}

// ——— Il formato dei risultati ———
// Le formule prendono il formato da quello che usano, come le unità di misura: euro più euro fa
// euro, euro per un numero fa euro, euro diviso euro è un numero (per la percentuale si sceglie il
// formato). Così =B2*C2 con il prezzo in euro è in euro senza doverlo dire.

const most = (a: Format, b: Format) => Math.max(decimalsOf(a), decimalsOf(b))

/** Il formato di a + b e di a − b (e di SOMMA, MEDIA, MIN, MAX). */
export function addFormat(a: Format, b: Format): Format {
  if (a.kind === 'euro' || b.kind === 'euro') {
    return { kind: 'euro', decimals: Math.max(a.kind === 'euro' ? a.decimals : 0, b.kind === 'euro' ? b.decimals : 0) }
  }
  if (a.kind === 'percent' && b.kind === 'percent') return { kind: 'percent', decimals: most(a, b) }
  if (a.kind === 'number' || b.kind === 'number') {
    return { kind: 'number', decimals: Math.max(a.kind === 'number' ? a.decimals : 0, b.kind === 'number' ? b.decimals : 0) }
  }
  return GENERAL
}

/** Gli euro che escono da una moltiplicazione, da una divisione o da una media hanno i centesimi. */
export function withCents(f: Format): Format {
  return f.kind === 'euro' && f.decimals < 2 ? { kind: 'euro', decimals: 2 } : f
}

/** Il formato di a × b. */
export function mulFormat(a: Format, b: Format): Format {
  if (a.kind === 'euro' && b.kind === 'euro') return GENERAL
  if (a.kind === 'euro') return withCents(a)
  if (b.kind === 'euro') return withCents(b)
  if (a.kind === 'percent' && b.kind === 'percent') return { kind: 'percent', decimals: most(a, b) }
  if (a.kind === 'number' && b.kind !== 'percent') return { kind: 'number', decimals: most(a, b) }
  if (b.kind === 'number' && a.kind !== 'percent') return { kind: 'number', decimals: most(a, b) }
  return GENERAL
}

/** Il formato di a ÷ b. */
export function divFormat(a: Format, b: Format): Format {
  if (a.kind === 'euro') return b.kind === 'euro' ? GENERAL : withCents(a)
  if (a.kind === 'percent') return b.kind === 'percent' ? GENERAL : a
  if (a.kind === 'number' && (b.kind === 'general' || b.kind === 'number')) return a
  return GENERAL
}
