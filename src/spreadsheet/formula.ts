/**
 * Le formule delle tabelle, come nell'Excel italiano: cominciano con =, i numeri hanno la virgola,
 * gli argomenti si separano con il punto e virgola: =SE(B2>100; B2*0,9; B2). Qui la lettura (i pezzi
 * e l'albero) e le modifiche al testo che servono all'editor: i nomi in maiuscolo, i riferimenti che
 * si spostano quando si copia una formula o si aggiunge una riga.
 */
import { lookupFunction } from './functions'
import { colIndex, colName } from './refs'
import { ERROR_NAMES, type ErrorCode } from './values'

export interface Ref {
  row: number
  col: number
  /** Con il $ (B$2, $B$2): copiando la formula non cambia. */
  rowAbs: boolean
  colAbs: boolean
}

export type BinOp = '+' | '-' | '*' | '/' | '^' | '&' | '=' | '<>' | '<' | '>' | '<=' | '>='

export type FormulaNode =
  | { t: 'num'; v: number; decimals: number }
  | { t: 'str'; v: string }
  | { t: 'bool'; v: boolean }
  | { t: 'err'; v: ErrorCode }
  | { t: 'ref'; ref: Ref }
  | { t: 'range'; from: Ref; to: Ref }
  | { t: 'neg'; a: FormulaNode }
  | { t: 'pct'; a: FormulaNode }
  | { t: 'bin'; op: BinOp; a: FormulaNode; b: FormulaNode }
  | { t: 'call'; name: string; args: FormulaNode[] }
  | { t: 'name'; name: string }
  | { t: 'missing' }

export class FormulaError extends Error {}

export type Token =
  | { k: 'num'; v: number; decimals: number; from: number; to: number }
  | { k: 'str'; v: string; from: number; to: number }
  | { k: 'err'; v: ErrorCode; from: number; to: number }
  | { k: 'ref'; ref: Ref; from: number; to: number }
  | { k: 'name'; v: string; from: number; to: number }
  | { k: 'op'; v: string; from: number; to: number }
  | { k: '(' | ')' | 'sep' | ':'; from: number; to: number }

/** Una cella con una formula: comincia con = e c'è qualcosa dopo. */
export function isFormula(input: string): boolean {
  const s = input.trimStart()
  return s.startsWith('=') && s.trim().length > 1
}

const REF = /^(\$?)([A-Za-z]{1,3})(\$?)([1-9]\d{0,6})(?![A-Za-z0-9_.À-ÖØ-öø-ÿ(])/
const NAME = /^[A-Za-zÀ-ÖØ-öø-ÿ_][A-Za-z0-9_.À-ÖØ-öø-ÿ]*/
const NUMBER = /^(?:\d+(?:[.,]\d+)?|[.,]\d+)(?:[eE][-+]?\d+)?/
/** I simboli che si scrivono con la tastiera dei telefoni o si copiano dai libri. */
const UNICODE_OPS: Record<string, string> = { '×': '*', '·': '*', '÷': '/', '−': '-', '–': '-', '≤': '<=', '≥': '>=', '≠': '<>' }
const ERRORS_BY_LENGTH = Object.keys(ERROR_NAMES).sort((a, b) => b.length - a.length)
const OPERATORS = new Set(['+', '-', '*', '/', '^', '&', '=', '<', '>', '%', '<=', '>=', '<>'])

/** I pezzi della formula (senza l'= iniziale), con la loro posizione nel testo. */
export function tokenize(src: string): Token[] {
  const tokens: Token[] = []
  /** L'ultimo pezzo chiude un valore (un numero, una cella, una parentesi, un %). */
  const isValue = () => {
    const last = tokens[tokens.length - 1]
    return !!last && (['num', 'str', 'err', 'ref', 'name', ')'].includes(last.k) || (last.k === 'op' && last.v === '%'))
  }
  let i = 0
  while (i < src.length) {
    const ch = src[i]
    if (/\s/.test(ch)) {
      i++
      continue
    }
    const rest = src.slice(i)
    // La virgola dopo un valore separa gli argomenti (come in inglese): =SOMMA(A1,B1). Altrimenti è la virgola dei decimali.
    const number = (ch === ',' || ch === '.') && isValue() ? null : NUMBER.exec(rest)
    if (number && /[\d.,]/.test(ch)) {
      const text = number[0]
      const dec = /[.,](\d+)/.exec(text.split(/[eE]/)[0])
      tokens.push({ k: 'num', v: Number(text.replace(',', '.')), decimals: dec ? dec[1].length : 0, from: i, to: i + text.length })
      i += text.length
      continue
    }
    if (ch === '"') {
      let j = i + 1
      let value = ''
      for (;;) {
        if (j >= src.length) throw new FormulaError('Manca la virgoletta " che chiude il testo')
        if (src[j] === '"') {
          if (src[j + 1] === '"') {
            value += '"'
            j += 2
            continue
          }
          break
        }
        value += src[j++]
      }
      tokens.push({ k: 'str', v: value, from: i, to: j + 1 })
      i = j + 1
      continue
    }
    if (ch === '#') {
      const name = ERRORS_BY_LENGTH.find((e) => rest.toUpperCase().startsWith(e))
      if (!name) throw new FormulaError(`Non conosco l'errore «${rest.split(/[\s;,)]/)[0]}»`)
      tokens.push({ k: 'err', v: ERROR_NAMES[name], from: i, to: i + name.length })
      i += name.length
      continue
    }
    const ref = REF.exec(rest)
    if (ref) {
      tokens.push({
        k: 'ref',
        ref: { row: Number(ref[4]) - 1, col: colIndex(ref[2]), colAbs: !!ref[1], rowAbs: !!ref[3] },
        from: i,
        to: i + ref[0].length,
      })
      i += ref[0].length
      continue
    }
    const name = NAME.exec(rest)
    if (name) {
      tokens.push({ k: 'name', v: name[0], from: i, to: i + name[0].length })
      i += name[0].length
      continue
    }
    const two = src.slice(i, i + 2)
    if (two === '<=' || two === '>=' || two === '<>') {
      tokens.push({ k: 'op', v: two, from: i, to: i + 2 })
      i += 2
      continue
    }
    const op = UNICODE_OPS[ch] ?? ch
    if (OPERATORS.has(op)) {
      tokens.push({ k: 'op', v: op, from: i, to: i + 1 })
    } else if (ch === '(' || ch === ')' || ch === ':') {
      tokens.push({ k: ch, from: i, to: i + 1 })
    } else if (ch === ';' || ch === ',') {
      tokens.push({ k: 'sep', from: i, to: i + 1 })
    } else if (ch === '$') {
      throw new FormulaError('Dopo il $ ci vuole il nome di una cella, come $B$2')
    } else {
      throw new FormulaError(`Il simbolo «${ch}» non si può usare nelle formule`)
    }
    i++
  }
  return tokens
}

const COMPARE = new Set(['=', '<>', '<', '>', '<=', '>='])

class Parser {
  private i = 0
  constructor(private readonly tokens: Token[]) {}

  parse(): FormulaNode {
    if (!this.tokens.length) throw new FormulaError('Dopo l\'= manca la formula')
    const node = this.comparison()
    const extra = this.tokens[this.i]
    if (extra) {
      if (extra.k === ')') throw new FormulaError('C\'è una parentesi chiusa di troppo')
      throw new FormulaError(`Manca un operatore prima di «${this.text(extra)}»`)
    }
    return node
  }

  private text(t: Token): string {
    switch (t.k) {
      case 'num':
      case 'str':
      case 'err':
      case 'name':
      case 'op':
        return String(t.v)
      case 'ref':
        return colName(t.ref.col) + (t.ref.row + 1)
      case 'sep':
        return ';'
      default:
        return t.k
    }
  }

  private peekOp(ops: (op: string) => boolean): string | null {
    const t = this.tokens[this.i]
    return t?.k === 'op' && ops(t.v) ? t.v : null
  }

  private comparison(): FormulaNode {
    let node = this.concat()
    for (let op = this.peekOp((o) => COMPARE.has(o)); op; op = this.peekOp((o) => COMPARE.has(o))) {
      this.i++
      node = { t: 'bin', op: op as BinOp, a: node, b: this.concat() }
    }
    return node
  }

  private concat(): FormulaNode {
    let node = this.additive()
    while (this.peekOp((o) => o === '&')) {
      this.i++
      node = { t: 'bin', op: '&', a: node, b: this.additive() }
    }
    return node
  }

  private additive(): FormulaNode {
    let node = this.multiplicative()
    for (let op = this.peekOp((o) => o === '+' || o === '-'); op; op = this.peekOp((o) => o === '+' || o === '-')) {
      this.i++
      node = { t: 'bin', op: op as BinOp, a: node, b: this.multiplicative() }
    }
    return node
  }

  private multiplicative(): FormulaNode {
    let node = this.power()
    for (let op = this.peekOp((o) => o === '*' || o === '/'); op; op = this.peekOp((o) => o === '*' || o === '/')) {
      this.i++
      node = { t: 'bin', op: op as BinOp, a: node, b: this.power() }
    }
    return node
  }

  /** Come in Excel, ^ si fa da sinistra: 2^3^2 = 64. */
  private power(): FormulaNode {
    let node = this.percent()
    while (this.peekOp((o) => o === '^')) {
      this.i++
      node = { t: 'bin', op: '^', a: node, b: this.percent() }
    }
    return node
  }

  private percent(): FormulaNode {
    let node = this.unary()
    while (this.peekOp((o) => o === '%')) {
      this.i++
      node = { t: 'pct', a: node }
    }
    return node
  }

  /** Come in Excel il meno davanti si fa prima della potenza: -2^2 = 4. */
  private unary(): FormulaNode {
    const op = this.peekOp((o) => o === '-' || o === '+')
    if (op) {
      this.i++
      const a = this.unary()
      return op === '-' ? { t: 'neg', a } : a
    }
    return this.range()
  }

  private range(): FormulaNode {
    const start = this.tokens[this.i]
    const node = this.primary()
    if (this.tokens[this.i]?.k !== ':') return node
    this.i++
    const end = this.tokens[this.i]
    if (start.k !== 'ref' || end?.k !== 'ref') throw new FormulaError('Un intervallo si scrive con due celle, come A1:B5')
    this.i++
    return { t: 'range', from: start.ref, to: end.ref }
  }

  private primary(): FormulaNode {
    const t = this.tokens[this.i]
    if (!t) throw new FormulaError('La formula è incompleta: manca qualcosa alla fine')
    this.i++
    switch (t.k) {
      case 'num':
        return { t: 'num', v: t.v, decimals: t.decimals }
      case 'str':
        return { t: 'str', v: t.v }
      case 'err':
        return { t: 'err', v: t.v }
      case 'ref':
        return { t: 'ref', ref: t.ref }
      case 'name': {
        const upper = t.v.toUpperCase()
        if (this.tokens[this.i]?.k === '(') return this.call(upper)
        if (upper === 'VERO' || upper === 'TRUE') return { t: 'bool', v: true }
        if (upper === 'FALSO' || upper === 'FALSE') return { t: 'bool', v: false }
        return { t: 'name', name: t.v }
      }
      case '(': {
        const node = this.comparison()
        if (this.tokens[this.i]?.k !== ')') throw new FormulaError('Manca una parentesi chiusa )')
        this.i++
        return node
      }
      default:
        throw new FormulaError(`Non mi aspettavo «${this.text(t)}» qui`)
    }
  }

  private call(name: string): FormulaNode {
    this.i++ // (
    const args: FormulaNode[] = []
    if (this.tokens[this.i]?.k === ')') {
      this.i++
      return { t: 'call', name: lookupFunction(name)?.name ?? name, args }
    }
    for (;;) {
      const t = this.tokens[this.i]
      if (!t) throw new FormulaError(`Manca la parentesi chiusa ) di ${name}`)
      args.push(t.k === 'sep' || t.k === ')' ? { t: 'missing' } : this.comparison())
      const next = this.tokens[this.i]
      if (next?.k === 'sep') {
        this.i++
        continue
      }
      if (next?.k === ')') {
        this.i++
        break
      }
      if (!next) throw new FormulaError(`Manca la parentesi chiusa ) di ${name}`)
      throw new FormulaError(`Tra gli argomenti di ${name} ci vuole il punto e virgola ;`)
    }
    return { t: 'call', name: lookupFunction(name)?.name ?? name, args }
  }
}

/** L'albero della formula (il testo dopo l'=). Lancia FormulaError con la spiegazione se non si legge. */
export function parseFormula(src: string): FormulaNode {
  return new Parser(tokenize(src)).parse()
}

/** Il testo della formula senza l'= (e gli spazi prima). */
export function formulaBody(input: string): string {
  return input.trimStart().slice(1)
}

// ——— Modifiche al testo delle formule ———

function refText(ref: Ref): string {
  return `${ref.colAbs ? '$' : ''}${colName(ref.col)}${ref.rowAbs ? '$' : ''}${ref.row + 1}`
}

/**
 * Riscrive i riferimenti della formula (l'input intero, con l'=) lasciando il resto com'è. `map` dà
 * il riferimento nuovo, o null se la cella non c'è più (diventa #RIF!); per un intervallo riceve
 * anche l'altro capo. Se la formula non si legge resta com'è.
 */
function rewriteRefs(input: string, map: (ref: Ref) => Ref | null, mapRange?: (from: Ref, to: Ref) => [Ref, Ref] | null): string {
  if (!isFormula(input)) return input
  const start = input.indexOf('=') + 1
  const body = input.slice(start)
  let tokens: Token[]
  try {
    tokens = tokenize(body)
  } catch {
    return input
  }
  let out = ''
  let pos = 0
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    if (t.k !== 'ref') continue
    const colon = tokens[i + 1]
    const other = tokens[i + 2]
    if (mapRange && colon?.k === ':' && other?.k === 'ref') {
      const next = mapRange(t.ref, other.ref)
      out += body.slice(pos, t.from) + (next ? `${refText(next[0])}:${refText(next[1])}` : '#RIF!')
      pos = other.to
      i += 2
      continue
    }
    const next = map(t.ref)
    out += body.slice(pos, t.from) + (next ? refText(next) : '#RIF!')
    pos = t.to
  }
  return input.slice(0, start) + out + body.slice(pos)
}

/**
 * La formula copiata `rows` righe più giù e `cols` colonne più a destra, come quando in Excel si
 * copia o si trascina una cella: B2*C2 copiata una riga sotto diventa B3*C3, $B$2 resta. Una cella
 * che finirebbe fuori dal foglio diventa #RIF!.
 */
export function shiftFormula(input: string, rows: number, cols: number): string {
  if (!rows && !cols) return input
  return rewriteRefs(input, (ref) => {
    const row = ref.rowAbs ? ref.row : ref.row + rows
    const col = ref.colAbs ? ref.col : ref.col + cols
    return row < 0 || col < 0 ? null : { ...ref, row, col }
  })
}

/**
 * Le formule dopo aver aggiunto (`count` > 0) o tolto (`count` < 0) righe o colonne a partire da
 * `at` (da 0), come fa Excel: i riferimenti dopo si spostano (anche quelli con il $), quelli alle
 * celle tolte diventano #RIF!, gli intervalli si allungano o si accorciano.
 */
export function adjustFormula(input: string, axis: 'row' | 'col', at: number, count: number): string {
  if (!count) return input
  const key = axis
  const moved = (ref: Ref, value: number): Ref => ({ ...ref, [key]: value })
  if (count > 0) {
    const shift = (ref: Ref) => (ref[key] >= at ? moved(ref, ref[key] + count) : ref)
    return rewriteRefs(input, shift, (a, b) => [shift(a), shift(b)])
  }
  const gone = -count
  const end = at + gone
  return rewriteRefs(
    input,
    (ref) => (ref[key] < at ? ref : ref[key] >= end ? moved(ref, ref[key] - gone) : null),
    (a, b) => {
      const [lo, hi] = a[key] <= b[key] ? [a, b] : [b, a]
      if (lo[key] >= at && hi[key] < end) return null
      const first = lo[key] < at ? lo : lo[key] >= end ? moved(lo, lo[key] - gone) : moved(lo, at)
      const last = hi[key] < at ? hi : hi[key] >= end ? moved(hi, hi[key] - gone) : moved(hi, at - 1)
      return a[key] <= b[key] ? [first, last] : [last, first]
    },
  )
}

/**
 * La formula con i nomi in maiuscolo, come la riscrive Excel: =somma(b2:b5) → =SOMMA(B2:B5); i
 * nomi inglesi delle funzioni diventano quelli italiani (SUM → SOMMA). Il resto resta com'è.
 */
export function normalizeFormula(input: string): string {
  if (!isFormula(input)) return input
  const lead = input.indexOf('=')
  const body = input.slice(lead + 1)
  let tokens: Token[]
  try {
    tokens = tokenize(body)
  } catch {
    return input.trim()
  }
  let out = ''
  let pos = 0
  tokens.forEach((t, i) => {
    let text: string | null = null
    if (t.k === 'ref') text = body.slice(t.from, t.to).toUpperCase()
    else if (t.k === 'name') {
      const upper = t.v.toUpperCase()
      if (tokens[i + 1]?.k === '(') text = lookupFunction(upper)?.name ?? upper
      else if (['VERO', 'FALSO', 'TRUE', 'FALSE'].includes(upper)) text = upper === 'TRUE' ? 'VERO' : upper === 'FALSE' ? 'FALSO' : upper
    }
    if (text === null) return
    out += body.slice(pos, t.from) + text
    pos = t.to
  })
  return `=${(out + body.slice(pos)).trim()}`
}

/** I riferimenti della formula, con la loro posizione nel testo (l'input intero): per colorarli nell'editor. */
export function formulaRefs(input: string): { from: number; to: number; top: number; left: number; bottom: number; right: number }[] {
  if (!input.trimStart().startsWith('=')) return []
  const start = input.indexOf('=') + 1
  let tokens: Token[]
  try {
    tokens = tokenize(input.slice(start))
  } catch {
    return []
  }
  const found: { from: number; to: number; top: number; left: number; bottom: number; right: number }[] = []
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    if (t.k !== 'ref') continue
    const other = tokens[i + 1]?.k === ':' ? tokens[i + 2] : undefined
    if (other?.k === 'ref') {
      found.push({
        from: start + t.from,
        to: start + other.to,
        top: Math.min(t.ref.row, other.ref.row),
        left: Math.min(t.ref.col, other.ref.col),
        bottom: Math.max(t.ref.row, other.ref.row),
        right: Math.max(t.ref.col, other.ref.col),
      })
      i += 2
    } else {
      found.push({ from: start + t.from, to: start + t.to, top: t.ref.row, left: t.ref.col, bottom: t.ref.row, right: t.ref.col })
    }
  }
  return found
}
