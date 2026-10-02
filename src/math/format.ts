/**
 * I risultati scritti come in un quaderno italiano: la virgola per i decimali, le frazioni quando
 * il conto è fatto di frazioni, e i puntini quando le cifre continuano (√2 = 1,414213…).
 * Ogni risultato ha due forme: `tex` da mettere nella formula, `text` da mostrare nell'editor.
 */
import { Rational } from './exact'

export interface FormattedResult {
  tex: string
  text: string
  /** Da mostrare disegnato (una matrice, un vettore): nell'editor con KaTeX invece che come testo. */
  rich?: boolean
}

export interface FormatOptions {
  /** I decimali con la virgola (0{,}5) invece che con il punto. */
  comma: boolean
  /** Una frazione esatta come numero decimale (0,75) invece che come frazione (3/4). */
  decimal: boolean
  /** Le cifre significative di cui ci si fida (12, meno per integrali e derivate). */
  digits?: number
}

/** Quante cifre dopo la virgola si mostrano (almeno 6 cifre significative per i numeri piccoli). */
const DECIMALS = 6

const SUPERSCRIPT: Record<string, string> = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }

/**
 * Un numero dalle sue cifre significative: `digits` senza zeri in fondo, il valore è
 * 0,d₁d₂d₃… × 10^point (point = quante cifre stanno prima della virgola).
 */
interface Digits {
  negative: boolean
  digits: string
  point: number
  /** Le cifre continuano oltre quelle scritte. */
  more: boolean
}

function fromNumber(v: number, significant: number): Digits {
  const abs = Math.abs(v)
  const [mantissa, exp] = abs.toExponential(significant - 1).split('e')
  // Un numero che è (quasi) uno corto, come 0,125, si scrive corto; se no le cifre continuano e gli
  // zeri in fondo restano: 4,188790… (non 4,18879, che sembrerebbe esatto).
  const short = Number(abs.toExponential(Math.max(0, significant - 3)))
  const exact = Math.abs(short - abs) <= abs * 10 ** -significant
  const raw = mantissa.replace('.', '')
  return { negative: v < 0, digits: (exact ? raw.replace(/0+$/, '') : raw) || '0', point: Number(exp) + 1, more: !exact }
}

/** Le prime cifre decimali esatte di una frazione (con `more` se non finisce lì). */
function fromRational(r: Rational, significant: number): Digits {
  const negative = r.n < 0n
  let n = negative ? -r.n : r.n
  const d = r.d
  const int = n / d
  n %= d
  let digits = int === 0n ? '' : int.toString()
  let point = digits.length
  while (n !== 0n && digits.replace(/^0+/, '').length < significant) {
    n *= 10n
    const q = n / d
    n %= d
    if (!digits && q === 0n) point--
    else digits += q.toString()
  }
  return { negative, digits: digits.replace(/0+$/, '') || '0', point: digits ? point : 0, more: n !== 0n }
}

function decimalSeparator(comma: boolean, tex: boolean): string {
  return comma ? (tex ? '{,}' : ',') : '.'
}

/** Il numero in cifre: normale, oppure come a · 10ⁿ se è molto grande o molto piccolo. */
function writeDigits(d: Digits, options: FormatOptions): FormattedResult {
  if (d.digits === '0') return { tex: '0', text: '0' }
  const sign = d.negative ? '-' : ''
  const textSign = d.negative ? '−' : ''
  const sepTex = decimalSeparator(options.comma, true)
  const sepText = decimalSeparator(options.comma, false)
  const scientific = d.point > 21 || d.point < -5 || (d.point > 15 && d.digits.length > d.point)
  if (scientific) {
    const exp = d.point - 1
    let frac = d.digits.slice(1)
    let more = d.more
    if (frac.length > DECIMALS) {
      frac = frac.slice(0, DECIMALS)
      more = true
    }
    const dots = more ? '\\ldots' : ''
    const mant = d.digits[0] + (frac ? sepTex + frac : '')
    const mantText = d.digits[0] + (frac ? sepText + frac : '')
    const supText = String(exp).split('').map((c) => SUPERSCRIPT[c]).join('')
    return { tex: `${sign}${mant}${dots} \\cdot 10^{${exp}}`, text: `${textSign}${mantText}${more ? '…' : ''} · 10${supText}` }
  }
  let int: string
  let frac: string
  if (d.point <= 0) {
    int = '0'
    frac = '0'.repeat(-d.point) + d.digits
  } else {
    int = d.digits.slice(0, d.point).padEnd(d.point, '0')
    frac = d.digits.slice(d.point)
  }
  // Almeno 6 cifre significative dopo la virgola per i numeri piccoli (0,000142857…).
  const keep = d.point <= 0 ? -d.point + DECIMALS : DECIMALS
  let more = d.more
  if (frac.length > keep) {
    frac = frac.slice(0, keep)
    more = true
  }
  const dots = more ? '\\ldots' : ''
  return {
    tex: `${sign}${int}${frac ? sepTex + frac : ''}${dots}`,
    text: `${textSign}${int}${frac ? sepText + frac : ''}${more ? '…' : ''}`,
  }
}

/** Un risultato calcolato con la virgola mobile; null se non è un numero (non definito, infinito). */
export function formatNumber(v: number, options: FormatOptions): FormattedResult | null {
  if (!Number.isFinite(v)) return null
  if (v === 0) return { tex: '0', text: '0' }
  const significant = options.digits ?? 12
  const d = fromNumber(v, significant)
  // Le cifre oltre quelle affidabili non si conoscono: se ne restano, continuano.
  if (d.digits.length >= significant && d.digits.length > Math.max(d.point, 0)) d.more = true
  return writeDigits(d, options)
}

/** Un risultato esatto: un intero, una frazione o (con `decimal`) le sue cifre. */
export function formatRational(r: Rational, options: FormatOptions): FormattedResult {
  if (r.isInteger) {
    const s = r.n.toString()
    const digits = s.replace('-', '')
    if (digits.length <= 21) return { tex: s, text: s.replace('-', '−') }
    return writeDigits({ negative: r.n < 0n, digits: digits.replace(/0+$/, ''), point: digits.length, more: false }, options)
  }
  if (options.decimal || r.d > 1000000n) return writeDigits(fromRational(r, 16), options)
  const negative = r.n < 0n
  const n = (negative ? -r.n : r.n).toString()
  const d = r.d.toString()
  return { tex: `${negative ? '-' : ''}\\frac{${n}}{${d}}`, text: `${negative ? '−' : ''}${n}/${d}` }
}
