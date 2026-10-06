/**
 * Le funzioni delle formule, con i nomi dell'Excel italiano (SOMMA, MEDIA, SE, CERCA.VERT, RATA…)
 * e, per chi li conosce, anche quelli inglesi (SUM, AVERAGE, IF…). Ognuna ha la sua riga di aiuto,
 * che l'editor mostra mentre si scrive. Si comportano come in Excel: SOMMA salta i testi delle
 * celle, un errore passa al risultato, CERCA.VERT senza FALSO cerca il valore più vicino.
 */
import type { FormulaNode } from './formula'
import { addFormat, formatNumber, GENERAL, mulFormat, parseFormatCode, readNumber, roundTo, tidy, withCents, type Format } from './format'
import { isError, sheetError, type SheetError, type Value } from './values'

/** Un valore con il suo formato. */
export interface Res {
  v: Value
  f: Format
}

/** Un rettangolo di celle (A1:B5, o una cella sola scritta come argomento). */
export interface RangeArg {
  kind: 'range'
  rows: number
  cols: number
  /** La cella (da 0, dentro il rettangolo). */
  at(r: number, c: number): Res
  /** Le celle che possono avere qualcosa: quelle fuori dalla tabella sono vuote e si saltano. */
  used(): Res[]
}

export interface ScalarArg {
  kind: 'scalar'
  res: Res
}

export type Arg = RangeArg | ScalarArg

/** Quello che serve alle funzioni per calcolare i loro argomenti. */
export interface Ctx {
  /** Il valore dell'argomento (un intervallo dove serve un valore è #VALORE!). */
  scalar(node: FormulaNode): Res
  /** L'argomento come intervallo (le celle scritte direttamente, A1 e A1:B5) o come valore. */
  arg(node: FormulaNode): Arg
}

export interface FunctionSpec {
  name: string
  aliases?: string[]
  /** Gli argomenti, per l'aiuto: «numero1; [numero2]; …». */
  args: string
  help: string
  min: number
  max: number
  run(args: FormulaNode[], ctx: Ctx): Res
}

// ——— Valori ———

const ok = (v: Value, f: Format = GENERAL): Res => ({ v, f })
const fail = (code: SheetError['error'], message?: string): Res => ({ v: sheetError(code, message), f: GENERAL })
const num = (n: number, f: Format = GENERAL): Res => (Number.isFinite(n) ? { v: tidy(n), f } : fail('#NUM!'))

/** Un testo che è un numero (anche «1,5 €» o «22%»), come quando Excel fa i conti con i testi. */
function textNumber(s: string): number | null {
  return readNumber(s)?.value ?? null
}

/** Il numero di un valore, come lo vuole Excel per i conti: vuoto = 0, VERO = 1, testo numerico = il numero. */
export function toNumber(v: Value): number | SheetError {
  if (v === null) return 0
  if (typeof v === 'number') return v
  if (typeof v === 'boolean') return v ? 1 : 0
  if (typeof v === 'string') {
    if (!v.trim()) return sheetError('#VALORE!', 'Un testo vuoto non è un numero')
    return textNumber(v) ?? sheetError('#VALORE!', `«${v}» è un testo, non un numero`)
  }
  return v
}

/** VERO o FALSO di un valore: i numeri diversi da 0 sono VERO, i testi VERO e FALSO valgono come le parole. */
export function toBool(v: Value): boolean | SheetError {
  if (v === null) return false
  if (typeof v === 'boolean') return v
  if (typeof v === 'number') return v !== 0
  if (typeof v === 'string') {
    const u = v.trim().toUpperCase()
    if (u === 'VERO' || u === 'TRUE') return true
    if (u === 'FALSO' || u === 'FALSE') return false
    return sheetError('#VALORE!', `«${v}» non è né VERO né FALSO`)
  }
  return v
}

/** Il testo di un valore, come lo unisce & (i numeri nel formato generale, all'italiana). */
export function toText(v: Value): string | SheetError {
  if (v === null) return ''
  if (typeof v === 'string') return v
  if (typeof v === 'boolean') return v ? 'VERO' : 'FALSO'
  if (typeof v === 'number') return formatNumber(v, GENERAL)
  return v
}

/**
 * Confronta due valori come Excel: i numeri tra loro, i testi senza badare alle maiuscole, e tra
 * tipi diversi numeri < testi < VERO/FALSO. La cella vuota vale 0 o "" a seconda dell'altro.
 */
export function compareValues(a: Exclude<Value, SheetError>, b: Exclude<Value, SheetError>): number {
  if (a === null) a = typeof b === 'string' ? '' : typeof b === 'boolean' ? false : 0
  if (b === null) b = typeof a === 'string' ? '' : typeof a === 'boolean' ? false : 0
  const rank = (v: number | string | boolean) => (typeof v === 'number' ? 0 : typeof v === 'string' ? 1 : 2)
  const ra = rank(a)
  const rb = rank(b)
  if (ra !== rb) return ra - rb
  if (typeof a === 'string') return a.localeCompare(b as string, 'it', { sensitivity: 'base' })
  return Number(a) - Number(b)
}

// ——— Argomenti ———

class Stop {
  constructor(readonly res: Res) {}
}

function stopOn<T>(v: T | SheetError): T {
  if (isError(v)) throw new Stop({ v, f: GENERAL })
  return v
}

/** Il numero dell'argomento (un errore ferma la funzione). */
function numberArg(node: FormulaNode | undefined, ctx: Ctx, fallback?: number): number {
  if (!node || node.t === 'missing') {
    if (fallback === undefined) throw new Stop(fail('#VALORE!', 'Manca un argomento'))
    return fallback
  }
  const res = ctx.scalar(node)
  return stopOn(toNumber(stopOn(res.v)))
}

function boolArg(node: FormulaNode | undefined, ctx: Ctx, fallback: boolean): boolean {
  if (!node || node.t === 'missing') return fallback
  return stopOn(toBool(stopOn(ctx.scalar(node).v)))
}

function textArg(node: FormulaNode | undefined, ctx: Ctx, fallback = ''): string {
  if (!node || node.t === 'missing') return fallback
  return stopOn(toText(stopOn(ctx.scalar(node).v)))
}

function rangeArg(node: FormulaNode | undefined, ctx: Ctx): RangeArg {
  const arg = node && node.t !== 'missing' ? ctx.arg(node) : null
  if (arg?.kind !== 'range') throw new Stop(fail('#VALORE!', 'Qui ci vuole un intervallo di celle, come A1:B5'))
  return arg
}

/**
 * I numeri degli argomenti, come per SOMMA: negli intervalli solo le celle con un numero (testi,
 * VERO/FALSO e celle vuote si saltano), scritti direttamente anche i testi numerici e VERO/FALSO.
 * Un errore ferma la funzione. Con i numeri anche il formato (per il risultato).
 */
function numbersOf(args: FormulaNode[], ctx: Ctx): { values: number[]; format: Format | null } {
  const values: number[] = []
  let format: Format | null = null
  const take = (n: number, f: Format) => {
    values.push(n)
    format = format ? addFormat(format, f) : f
  }
  for (const node of args) {
    if (node.t === 'missing') continue
    const arg = ctx.arg(node)
    if (arg.kind === 'range') {
      for (const cell of arg.used()) {
        if (isError(cell.v)) throw new Stop({ v: cell.v, f: GENERAL })
        if (typeof cell.v === 'number') take(cell.v, cell.f)
      }
    } else {
      take(stopOn(toNumber(stopOn(arg.res.v))), arg.res.f)
    }
  }
  return { values, format }
}

/** Tutti i valori degli argomenti (per CONTA.VALORI, E, O…): gli intervalli cella per cella. */
function valuesOf(args: FormulaNode[], ctx: Ctx, withEmpty = false): Res[] {
  const out: Res[] = []
  for (const node of args) {
    if (node.t === 'missing') continue
    const arg = ctx.arg(node)
    if (arg.kind === 'scalar') out.push(arg.res)
    else if (withEmpty) for (let r = 0; r < arg.rows; r++) for (let c = 0; c < arg.cols; c++) out.push(arg.at(r, c))
    else out.push(...arg.used())
  }
  return out
}

// ——— I criteri di CONTA.SE e SOMMA.SE: ">10", "<>0", "mele", "a*" ———

function wildcard(pattern: string): RegExp {
  let re = ''
  for (let i = 0; i < pattern.length; i++) {
    const ch = pattern[i]
    if (ch === '~' && i + 1 < pattern.length) re += pattern[++i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    else if (ch === '*') re += '.*'
    else if (ch === '?') re += '.'
    else re += ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
  return new RegExp(`^${re}$`, 'is')
}

/** Il test di un criterio, come in Excel. */
function criterion(crit: Value): (v: Value) => boolean {
  if (isError(crit)) return () => false
  if (typeof crit === 'number' || typeof crit === 'boolean') return (v) => v === crit
  if (crit === null) return (v) => v === null || v === ''
  const m = /^(<=|>=|<>|<|>|=)?([\s\S]*)$/.exec(crit)!
  const op = m[1] ?? '='
  const operand = m[2]
  const n = operand.trim() ? textNumber(operand.trim()) : null
  if (n !== null) {
    return (v) => {
      if (typeof v !== 'number') return op === '<>'
      const d = v - n
      return op === '=' ? d === 0 : op === '<>' ? d !== 0 : op === '<' ? d < 0 : op === '>' ? d > 0 : op === '<=' ? d <= 0 : d >= 0
    }
  }
  if (!operand) return op === '<>' ? (v) => v !== null && v !== '' : op === '=' ? (v) => v === null || v === '' : () => false
  const upper = operand.toUpperCase()
  if (upper === 'VERO' || upper === 'FALSO') {
    const b = upper === 'VERO'
    return (v) => (op === '<>' ? v !== b : op === '=' ? v === b : false)
  }
  if (op === '=' || op === '<>') {
    const re = wildcard(operand)
    return (v) => {
      const hit = typeof v === 'string' && re.test(v)
      return op === '=' ? hit : !hit
    }
  }
  return (v) => {
    if (typeof v !== 'string') return false
    const d = v.localeCompare(operand, 'it', { sensitivity: 'base' })
    return op === '<' ? d < 0 : op === '>' ? d > 0 : op === '<=' ? d <= 0 : d >= 0
  }
}

/** Il valore cercato è uguale a quello della cella (per le ricerche esatte: testi con * e ?). */
function matches(wanted: Value, v: Value): boolean {
  if (typeof wanted === 'string') return typeof v === 'string' && wildcard(wanted).test(v)
  return v === wanted
}

// ——— Le funzioni ———

const FUNCTIONS: FunctionSpec[] = []

function define(spec: FunctionSpec): void {
  FUNCTIONS.push(spec)
}

const MANY = Infinity

/** Una funzione di un numero solo, con il formato del risultato. */
function unary(name: string, aliases: string[], args: string, help: string, fn: (x: number) => number | SheetError, keepFormat = false): void {
  define({
    name,
    aliases,
    args,
    help,
    min: 1,
    max: 1,
    run: ([a], ctx) => {
      const res = ctx.scalar(a)
      const x = stopOn(toNumber(stopOn(res.v)))
      const y = fn(x)
      return isError(y) ? ok(y) : num(y, keepFormat ? res.f : GENERAL)
    },
  })
}

// Matematica

define({
  name: 'SOMMA',
  aliases: ['SUM'],
  args: 'numero1; [numero2]; …',
  help: 'La somma dei numeri (anche di intervalli come B2:B10)',
  min: 1,
  max: MANY,
  run: (args, ctx) => {
    const { values, format } = numbersOf(args, ctx)
    return num(values.reduce((s, x) => s + x, 0), format ?? GENERAL)
  },
})

define({
  name: 'MEDIA',
  aliases: ['AVERAGE'],
  args: 'numero1; [numero2]; …',
  help: 'La media dei numeri',
  min: 1,
  max: MANY,
  run: (args, ctx) => {
    const { values, format } = numbersOf(args, ctx)
    if (!values.length) return fail('#DIV/0!', 'Non ci sono numeri di cui fare la media')
    return num(values.reduce((s, x) => s + x, 0) / values.length, withCents(format ?? GENERAL))
  },
})

define({
  name: 'MIN',
  args: 'numero1; [numero2]; …',
  help: 'Il numero più piccolo',
  min: 1,
  max: MANY,
  run: (args, ctx) => {
    const { values, format } = numbersOf(args, ctx)
    return num(values.length ? Math.min(...values) : 0, format ?? GENERAL)
  },
})

define({
  name: 'MAX',
  args: 'numero1; [numero2]; …',
  help: 'Il numero più grande',
  min: 1,
  max: MANY,
  run: (args, ctx) => {
    const { values, format } = numbersOf(args, ctx)
    return num(values.length ? Math.max(...values) : 0, format ?? GENERAL)
  },
})

define({
  name: 'PRODOTTO',
  aliases: ['PRODUCT'],
  args: 'numero1; [numero2]; …',
  help: 'Il prodotto dei numeri',
  min: 1,
  max: MANY,
  run: (args, ctx) => {
    let format: Format | null = null
    let product = 1
    let any = false
    for (const node of args) {
      if (node.t === 'missing') continue
      const arg = ctx.arg(node)
      const cells = arg.kind === 'range' ? arg.used().filter((c) => typeof c.v === 'number' || isError(c.v)) : [arg.res]
      for (const cell of cells) {
        const x = stopOn(toNumber(stopOn(cell.v)))
        product *= x
        format = format ? mulFormat(format, cell.f) : cell.f
        any = true
      }
    }
    return num(any ? product : 0, format ?? GENERAL)
  },
})

const roundSpec = (name: string, aliases: string[], help: string, mode: 'round' | 'up' | 'down', min = 2) =>
  define({
    name,
    aliases,
    args: min === 2 ? 'numero; cifre' : 'numero; [cifre]',
    help,
    min,
    max: 2,
    run: ([a, digits], ctx) => {
      const res = ctx.scalar(a)
      const x = stopOn(toNumber(stopOn(res.v)))
      const d = Math.trunc(numberArg(digits, ctx, 0))
      return num(roundTo(x, d, mode), res.f)
    },
  })
roundSpec('ARROTONDA', ['ROUND'], 'Arrotonda al numero di decimali dato (il 5 va su)', 'round')
roundSpec('ARROTONDA.PER.ECC', ['ROUNDUP'], 'Arrotonda per eccesso, lontano da zero', 'up')
roundSpec('ARROTONDA.PER.DIF', ['ROUNDDOWN'], 'Arrotonda per difetto, verso zero', 'down')
roundSpec('TRONCA', ['TRUNC'], 'Toglie i decimali dopo le cifre date, senza arrotondare', 'down', 1)

unary('INT', [], 'numero', 'La parte intera, arrotondando verso il basso', (x) => Math.floor(x), true)
unary('ASS', ['ABS'], 'numero', 'Il valore assoluto', (x) => Math.abs(x), true)
unary('RADQ', ['SQRT'], 'numero', 'La radice quadrata', (x) => (x < 0 ? sheetError('#NUM!', 'La radice quadrata di un numero negativo non c\'è') : Math.sqrt(x)))
unary('EXP', [], 'numero', 'e elevato al numero', (x) => Math.exp(x))
unary('LN', [], 'numero', 'Il logaritmo naturale', (x) => (x <= 0 ? sheetError('#NUM!', 'Il logaritmo si fa solo dei numeri positivi') : Math.log(x)))
unary('LOG10', [], 'numero', 'Il logaritmo in base 10', (x) => (x <= 0 ? sheetError('#NUM!', 'Il logaritmo si fa solo dei numeri positivi') : Math.log10(x)))
unary('SEGNO', ['SIGN'], 'numero', '1 se positivo, −1 se negativo, 0 se zero', (x) => Math.sign(x))

define({
  name: 'LOG',
  args: 'numero; [base]',
  help: 'Il logaritmo nella base data (10 se non la scrivi)',
  min: 1,
  max: 2,
  run: ([a, b], ctx) => {
    const x = numberArg(a, ctx)
    const base = numberArg(b, ctx, 10)
    if (x <= 0 || base <= 0 || base === 1) return fail('#NUM!', 'Il logaritmo vuole numeri positivi e una base diversa da 1')
    return num(Math.log(x) / Math.log(base))
  },
})

define({
  name: 'POTENZA',
  aliases: ['POWER'],
  args: 'base; esponente',
  help: 'La base elevata all\'esponente (come ^)',
  min: 2,
  max: 2,
  run: ([a, b], ctx) => power(numberArg(a, ctx), numberArg(b, ctx)),
})

define({
  name: 'RESTO',
  aliases: ['MOD'],
  args: 'dividendo; divisore',
  help: 'Il resto della divisione (con il segno del divisore)',
  min: 2,
  max: 2,
  run: ([a, b], ctx) => {
    const n = numberArg(a, ctx)
    const d = numberArg(b, ctx)
    if (d === 0) return fail('#DIV/0!')
    return num(n - d * Math.floor(n / d))
  },
})

define({
  name: 'PI.GRECO',
  aliases: ['PI'],
  args: '',
  help: 'Il numero π = 3,14159…',
  min: 0,
  max: 0,
  run: () => num(Math.PI),
})

/** a^b come in Excel: 0^0 non si può, le radici dei negativi neanche. */
export function power(a: number, b: number): Res {
  if (a === 0 && b === 0) return fail('#NUM!', '0 elevato a 0 non si può calcolare')
  if (a === 0 && b < 0) return fail('#DIV/0!')
  const y = a ** b
  if (Number.isNaN(y)) return fail('#NUM!', 'La potenza di un numero negativo con un esponente con la virgola non c\'è')
  return num(y)
}

// Statistica

function sorted(args: FormulaNode[], ctx: Ctx): { values: number[]; format: Format } {
  const { values, format } = numbersOf(args, ctx)
  return { values: values.sort((a, b) => a - b), format: format ?? GENERAL }
}

define({
  name: 'MEDIANA',
  aliases: ['MEDIAN'],
  args: 'numero1; [numero2]; …',
  help: 'Il valore centrale dei numeri messi in ordine',
  min: 1,
  max: MANY,
  run: (args, ctx) => {
    const { values, format } = sorted(args, ctx)
    if (!values.length) return fail('#NUM!', 'Non ci sono numeri')
    const mid = values.length >> 1
    return num(values.length % 2 ? values[mid] : (values[mid - 1] + values[mid]) / 2, withCents(format))
  },
})

define({
  name: 'MODA',
  aliases: ['MODE', 'MODA.SNGL', 'MODE.SNGL'],
  args: 'numero1; [numero2]; …',
  help: 'Il numero che compare più volte',
  min: 1,
  max: MANY,
  run: (args, ctx) => {
    const { values, format } = numbersOf(args, ctx)
    const counts = new Map<number, number>()
    let best: number | null = null
    let bestCount = 1
    for (const x of values) {
      const c = (counts.get(x) ?? 0) + 1
      counts.set(x, c)
      if (c > bestCount) {
        best = x
        bestCount = c
      }
    }
    return best === null ? fail('#N/D', 'Nessun numero compare più di una volta') : num(best, format ?? GENERAL)
  },
})

const kth = (name: string, aliases: string[], help: string, largest: boolean) =>
  define({
    name,
    aliases,
    args: 'intervallo; k',
    help,
    min: 2,
    max: 2,
    run: ([a, b], ctx) => {
      const { values, format } = sorted([a], ctx)
      const k = Math.ceil(numberArg(b, ctx))
      if (k < 1 || k > values.length) return fail('#NUM!', `k deve stare tra 1 e ${values.length}`)
      return num(largest ? values[values.length - k] : values[k - 1], format)
    },
  })
kth('GRANDE', ['LARGE'], 'Il k-esimo numero più grande', true)
kth('PICCOLO', ['SMALL'], 'Il k-esimo numero più piccolo', false)

const spread = (name: string, aliases: string[], help: string, sample: boolean, root: boolean) =>
  define({
    name,
    aliases,
    args: 'numero1; [numero2]; …',
    help,
    min: 1,
    max: MANY,
    run: (args, ctx) => {
      const { values, format } = numbersOf(args, ctx)
      const n = values.length
      if (n < (sample ? 2 : 1)) return fail('#DIV/0!', sample ? 'Servono almeno due numeri' : 'Non ci sono numeri')
      const mean = values.reduce((s, x) => s + x, 0) / n
      const variance = values.reduce((s, x) => s + (x - mean) ** 2, 0) / (sample ? n - 1 : n)
      return root ? num(Math.sqrt(variance), withCents(format ?? GENERAL)) : num(variance)
    },
  })
spread('DEV.ST', ['DEV.ST.C', 'STDEV', 'STDEV.S'], 'La deviazione standard di un campione (divide per n − 1)', true, true)
spread('DEV.ST.P', ['DEV.ST.POP', 'STDEVP', 'STDEV.P'], 'La deviazione standard di tutta la popolazione (divide per n)', false, true)
spread('VAR', ['VAR.C', 'VAR.S'], 'La varianza di un campione (divide per n − 1)', true, false)
spread('VAR.P', ['VAR.POP', 'VARP'], 'La varianza di tutta la popolazione (divide per n)', false, false)

// Contare

define({
  name: 'CONTA.NUMERI',
  aliases: ['COUNT'],
  args: 'valore1; [valore2]; …',
  help: 'Quante celle contengono un numero',
  min: 1,
  max: MANY,
  run: (args, ctx) => {
    let count = 0
    for (const node of args) {
      if (node.t === 'missing') continue
      const arg = ctx.arg(node)
      if (arg.kind === 'range') count += arg.used().filter((c) => typeof c.v === 'number').length
      else if (typeof arg.res.v === 'number' || (typeof arg.res.v === 'string' && textNumber(arg.res.v) !== null)) count++
    }
    return num(count)
  },
})

define({
  name: 'CONTA.VALORI',
  aliases: ['COUNTA'],
  args: 'valore1; [valore2]; …',
  help: 'Quante celle non sono vuote',
  min: 1,
  max: MANY,
  run: (args, ctx) => num(valuesOf(args, ctx).filter((c) => c.v !== null).length),
})

define({
  name: 'CONTA.VUOTE',
  aliases: ['COUNTBLANK'],
  args: 'intervallo',
  help: 'Quante celle sono vuote',
  min: 1,
  max: 1,
  run: ([a], ctx) => {
    const range = rangeArg(a, ctx)
    const filled = range.used().filter((c) => c.v !== null && c.v !== '').length
    return num(range.rows * range.cols - filled)
  },
})

define({
  name: 'CONTA.SE',
  aliases: ['COUNTIF'],
  args: 'intervallo; criterio',
  help: 'Quante celle rispettano il criterio, come ">10" o "mele"',
  min: 2,
  max: 2,
  run: ([a, b], ctx) => {
    const range = rangeArg(a, ctx)
    const test = criterion(stopOn(ctx.scalar(b).v))
    let count = 0
    for (let r = 0; r < range.rows; r++) for (let c = 0; c < range.cols; c++) if (test(range.at(r, c).v)) count++
    return num(count)
  },
})

/** Le celle di `sums` (o di `range`) dove `range` rispetta il criterio. */
function conditional(args: FormulaNode[], ctx: Ctx): { values: number[]; format: Format | null } {
  const [a, b, c] = args
  const range = rangeArg(a, ctx)
  const sums = c && c.t !== 'missing' ? rangeArg(c, ctx) : range
  const test = criterion(stopOn(ctx.scalar(b).v))
  const values: number[] = []
  let format: Format | null = null
  for (let r = 0; r < range.rows; r++) {
    for (let col = 0; col < range.cols; col++) {
      if (!test(range.at(r, col).v)) continue
      const cell = sums.at(r, col)
      if (isError(cell.v)) throw new Stop({ v: cell.v, f: GENERAL })
      if (typeof cell.v !== 'number') continue
      values.push(cell.v)
      format = format ? addFormat(format, cell.f) : cell.f
    }
  }
  return { values, format }
}

define({
  name: 'SOMMA.SE',
  aliases: ['SUMIF'],
  args: 'intervallo; criterio; [int_somma]',
  help: 'La somma delle celle che rispettano il criterio (o di quelle accanto, in int_somma)',
  min: 2,
  max: 3,
  run: (args, ctx) => {
    const { values, format } = conditional(args, ctx)
    return num(values.reduce((s, x) => s + x, 0), format ?? GENERAL)
  },
})

define({
  name: 'MEDIA.SE',
  aliases: ['AVERAGEIF'],
  args: 'intervallo; criterio; [int_media]',
  help: 'La media delle celle che rispettano il criterio',
  min: 2,
  max: 3,
  run: (args, ctx) => {
    const { values, format } = conditional(args, ctx)
    if (!values.length) return fail('#DIV/0!', 'Nessuna cella rispetta il criterio')
    return num(values.reduce((s, x) => s + x, 0) / values.length, withCents(format ?? GENERAL))
  },
})

define({
  name: 'SOMMA.PRODOTTO',
  aliases: ['SUMPRODUCT'],
  args: 'matrice1; [matrice2]; …',
  help: 'Moltiplica le celle corrispondenti degli intervalli e somma i prodotti',
  min: 1,
  max: MANY,
  run: (args, ctx) => {
    const ranges = args.map((a) => rangeArg(a, ctx))
    const { rows, cols } = ranges[0]
    if (ranges.some((r) => r.rows !== rows || r.cols !== cols)) return fail('#VALORE!', 'Gli intervalli devono essere grandi uguali')
    let total = 0
    let format: Format | null = null
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let product = 1
        let f: Format | null = null
        for (const range of ranges) {
          const cell = range.at(r, c)
          if (isError(cell.v)) throw new Stop({ v: cell.v, f: GENERAL })
          product *= typeof cell.v === 'number' ? cell.v : 0
          f = f ? mulFormat(f, cell.f) : cell.f
        }
        total += product
        if (f) format = format ? addFormat(format, f) : f
      }
    }
    return num(total, format ?? GENERAL)
  },
})

// Logica

define({
  name: 'SE',
  aliases: ['IF'],
  args: 'test; se_vero; [se_falso]',
  help: 'Se il test è VERO dà il secondo valore, altrimenti il terzo: =SE(B2>=6; "promosso"; "bocciato")',
  min: 2,
  max: 3,
  run: ([test, yes, no], ctx) => {
    const t = stopOn(toBool(stopOn(ctx.scalar(test).v)))
    const branch = t ? yes : no
    if (!branch) return ok(t ? true : false)
    if (branch.t === 'missing') return num(0)
    return ctx.scalar(branch)
  },
})

define({
  name: 'SE.ERRORE',
  aliases: ['IFERROR'],
  args: 'valore; valore_se_errore',
  help: 'Il valore, o l\'altro se il primo è un errore (come #DIV/0!)',
  min: 2,
  max: 2,
  run: ([a, b], ctx) => {
    const res = ctx.scalar(a)
    return isError(res.v) ? (b.t === 'missing' ? num(0) : ctx.scalar(b)) : res
  },
})

define({
  name: 'E',
  aliases: ['AND'],
  args: 'logico1; [logico2]; …',
  help: 'VERO se tutti i test sono VERI',
  min: 1,
  max: MANY,
  run: (args, ctx) => ok(logical(args, ctx).every(Boolean)),
})

define({
  name: 'O',
  aliases: ['OR'],
  args: 'logico1; [logico2]; …',
  help: 'VERO se almeno un test è VERO',
  min: 1,
  max: MANY,
  run: (args, ctx) => ok(logical(args, ctx).some(Boolean)),
})

function logical(args: FormulaNode[], ctx: Ctx): boolean[] {
  const out: boolean[] = []
  for (const node of args) {
    if (node.t === 'missing') continue
    const arg = ctx.arg(node)
    if (arg.kind === 'range') {
      for (const cell of arg.used()) {
        if (isError(cell.v)) throw new Stop({ v: cell.v, f: GENERAL })
        if (typeof cell.v === 'number' || typeof cell.v === 'boolean') out.push(Boolean(cell.v))
      }
    } else {
      out.push(stopOn(toBool(stopOn(arg.res.v))))
    }
  }
  if (!out.length) throw new Stop(fail('#VALORE!', 'Non ci sono valori VERO o FALSO'))
  return out
}

define({
  name: 'NON',
  aliases: ['NOT'],
  args: 'logico',
  help: 'Il contrario: VERO diventa FALSO e FALSO diventa VERO',
  min: 1,
  max: 1,
  run: ([a], ctx) => ok(!boolArg(a, ctx, false)),
})

define({ name: 'VERO', aliases: ['TRUE'], args: '', help: 'Il valore VERO', min: 0, max: 0, run: () => ok(true) })
define({ name: 'FALSO', aliases: ['FALSE'], args: '', help: 'Il valore FALSO', min: 0, max: 0, run: () => ok(false) })

const isSpec = (name: string, aliases: string[], help: string, test: (v: Value) => boolean) =>
  define({ name, aliases, args: 'valore', help, min: 1, max: 1, run: ([a], ctx) => ok(test(ctx.scalar(a).v)) })
isSpec('VAL.ERRORE', ['ISERROR'], 'VERO se il valore è un errore', (v) => isError(v))
isSpec('VAL.NUMERO', ['ISNUMBER'], 'VERO se il valore è un numero', (v) => typeof v === 'number')
isSpec('VAL.TESTO', ['ISTEXT'], 'VERO se il valore è un testo', (v) => typeof v === 'string')
isSpec('VAL.VUOTO', ['ISBLANK'], 'VERO se la cella è vuota', (v) => v === null)

// Cercare

define({
  name: 'CERCA.VERT',
  aliases: ['VLOOKUP'],
  args: 'valore; tabella; indice; [intervallo]',
  help: 'Cerca il valore nella prima colonna della tabella e dà quello della colonna indice; con FALSO solo se è uguale',
  min: 3,
  max: 4,
  run: ([a, b, c, d], ctx) => lookup(a, b, c, d, ctx, false),
})

define({
  name: 'CERCA.ORIZZ',
  aliases: ['HLOOKUP'],
  args: 'valore; tabella; indice; [intervallo]',
  help: 'Come CERCA.VERT, ma cerca nella prima riga e dà quello della riga indice',
  min: 3,
  max: 4,
  run: ([a, b, c, d], ctx) => lookup(a, b, c, d, ctx, true),
})

function lookup(a: FormulaNode, b: FormulaNode, c: FormulaNode, d: FormulaNode | undefined, ctx: Ctx, across: boolean): Res {
  const wanted = stopOn(ctx.scalar(a).v)
  const table = rangeArg(b, ctx)
  const index = Math.trunc(numberArg(c, ctx))
  const approximate = boolArg(d, ctx, true)
  const length = across ? table.cols : table.rows
  const width = across ? table.rows : table.cols
  if (index < 1) return fail('#VALORE!', 'L\'indice parte da 1')
  if (index > width) return fail('#RIF!', `La tabella ha solo ${width} ${across ? 'righe' : 'colonne'}`)
  const key = (i: number) => (across ? table.at(0, i) : table.at(i, 0)).v
  const pick = (i: number) => (across ? table.at(index - 1, i) : table.at(i, index - 1))
  const found = approximate ? nearest(wanted, length, key) : exact(wanted, length, key)
  return found === null ? fail('#N/D', `«${toText(wanted)}» non c'è nella ${across ? 'prima riga' : 'prima colonna'}`) : pick(found)
}

function exact(wanted: Value, length: number, key: (i: number) => Value): number | null {
  for (let i = 0; i < length; i++) if (matches(wanted, key(i))) return i
  return null
}

/** Il più grande che non supera il valore, nella colonna in ordine crescente (come Excel con VERO). */
function nearest(wanted: Value, length: number, key: (i: number) => Value): number | null {
  if (isError(wanted)) return null
  let found: number | null = null
  for (let i = 0; i < length; i++) {
    const v = key(i)
    if (v === null || isError(v) || typeof v !== typeof wanted) continue
    if (compareValues(v, wanted as Exclude<Value, SheetError>) <= 0) found = i
    else break
  }
  return found
}

define({
  name: 'CONFRONTA',
  aliases: ['MATCH'],
  args: 'valore; intervallo; [tipo]',
  help: 'In che posizione c\'è il valore (tipo 0: uguale; 1: il più grande che non lo supera)',
  min: 2,
  max: 3,
  run: ([a, b, c], ctx) => {
    const wanted = stopOn(ctx.scalar(a).v)
    const range = rangeArg(b, ctx)
    const type = Math.sign(numberArg(c, ctx, 1))
    const length = range.rows === 1 ? range.cols : range.rows
    if (range.rows > 1 && range.cols > 1) return fail('#N/D', 'CONFRONTA cerca in una riga o in una colonna')
    const key = (i: number) => (range.rows === 1 ? range.at(0, i) : range.at(i, 0)).v
    let found: number | null
    if (type === 0) found = exact(wanted, length, key)
    else if (type > 0) found = nearest(wanted, length, key)
    else {
      found = null
      for (let i = 0; i < length; i++) {
        const v = key(i)
        if (v === null || isError(v) || typeof v !== typeof wanted) continue
        if (compareValues(v, wanted as Exclude<Value, SheetError>) >= 0) found = i
        else break
      }
    }
    return found === null ? fail('#N/D', `«${toText(wanted)}» non c'è`) : num(found + 1)
  },
})

define({
  name: 'INDICE',
  aliases: ['INDEX'],
  args: 'intervallo; riga; [colonna]',
  help: 'Il valore della cella alla riga e alla colonna date dentro l\'intervallo',
  min: 2,
  max: 3,
  run: ([a, b, c], ctx) => {
    const range = rangeArg(a, ctx)
    let row = Math.trunc(numberArg(b, ctx))
    let col = Math.trunc(numberArg(c, ctx, 0))
    // Una riga sola: il secondo argomento è la colonna.
    if (range.rows === 1 && (!c || c.t === 'missing')) {
      col = row
      row = 1
    }
    if (!col) col = 1
    if (row < 1 || col < 1 || row > range.rows || col > range.cols) return fail('#RIF!', 'La cella è fuori dall\'intervallo')
    return range.at(row - 1, col - 1)
  },
})

// Testo

define({
  name: 'CONCATENA',
  aliases: ['CONCATENATE', 'CONCAT'],
  args: 'testo1; [testo2]; …',
  help: 'Unisce i testi (come &)',
  min: 1,
  max: MANY,
  run: (args, ctx) => ok(valuesOf(args, ctx).map((c) => stopOn(toText(stopOn(c.v)))).join('')),
})

define({
  name: 'LUNGHEZZA',
  aliases: ['LEN'],
  args: 'testo',
  help: 'Quanti caratteri ha il testo',
  min: 1,
  max: 1,
  run: ([a], ctx) => num([...textArg(a, ctx)].length),
})

const textSpec = (name: string, aliases: string[], help: string, fn: (s: string) => string) =>
  define({ name, aliases, args: 'testo', help, min: 1, max: 1, run: ([a], ctx) => ok(fn(textArg(a, ctx))) })
textSpec('MAIUSC', ['UPPER'], 'Il testo in maiuscolo', (s) => s.toLocaleUpperCase('it'))
textSpec('MINUSC', ['LOWER'], 'Il testo in minuscolo', (s) => s.toLocaleLowerCase('it'))
textSpec('ANNULLA.SPAZI', ['TRIM'], 'Toglie gli spazi in più', (s) => s.trim().replace(/ {2,}/g, ' '))

define({
  name: 'SINISTRA',
  aliases: ['LEFT'],
  args: 'testo; [quanti]',
  help: 'I primi caratteri del testo',
  min: 1,
  max: 2,
  run: ([a, b], ctx) => {
    const n = numberArg(b, ctx, 1)
    if (n < 0) return fail('#VALORE!')
    return ok([...textArg(a, ctx)].slice(0, Math.trunc(n)).join(''))
  },
})

define({
  name: 'DESTRA',
  aliases: ['RIGHT'],
  args: 'testo; [quanti]',
  help: 'Gli ultimi caratteri del testo',
  min: 1,
  max: 2,
  run: ([a, b], ctx) => {
    const n = Math.trunc(numberArg(b, ctx, 1))
    if (n < 0) return fail('#VALORE!')
    const chars = [...textArg(a, ctx)]
    return ok(n ? chars.slice(-n).join('') : '')
  },
})

define({
  name: 'STRINGA.ESTRAI',
  aliases: ['MID'],
  args: 'testo; inizio; quanti',
  help: 'I caratteri del testo a partire dalla posizione inizio',
  min: 3,
  max: 3,
  run: ([a, b, c], ctx) => {
    const start = Math.trunc(numberArg(b, ctx))
    const n = Math.trunc(numberArg(c, ctx))
    if (start < 1 || n < 0) return fail('#VALORE!')
    return ok([...textArg(a, ctx)].slice(start - 1, start - 1 + n).join(''))
  },
})

define({
  name: 'TESTO',
  aliases: ['TEXT'],
  args: 'valore; formato',
  help: 'Il numero scritto come testo nel formato dato, come "0,00 €" o "0%"',
  min: 2,
  max: 2,
  run: ([a, b], ctx) => {
    const x = numberArg(a, ctx)
    const format = parseFormatCode(textArg(b, ctx))
    return format ? ok(formatNumber(x, format)) : fail('#VALORE!', 'Formato sconosciuto: si scrive come "0,00", "0,00 €" o "0%"')
  },
})

define({
  name: 'VALORE',
  aliases: ['VALUE'],
  args: 'testo',
  help: 'Il numero scritto in un testo, come "1,5" o "22%"',
  min: 1,
  max: 1,
  run: ([a], ctx) => {
    const res = ctx.scalar(a)
    if (typeof res.v === 'number') return res
    const read = readNumber(textArg(a, ctx))
    return read ? num(read.value, read.format) : fail('#VALORE!', 'Il testo non è un numero')
  },
})

// Matematica finanziaria (i soldi che escono sono negativi, come in Excel)

const EURO: Format = { kind: 'euro', decimals: 2 }

/** Il valore futuro con rata costante: la formula di Excel. */
function futureValue(rate: number, n: number, payment: number, present: number, type: number): number {
  if (rate === 0) return -(present + payment * n)
  const g = (1 + rate) ** n
  return -(present * g + (payment * (1 + rate * type) * (g - 1)) / rate)
}

function paymentOf(rate: number, n: number, present: number, future: number, type: number): number {
  if (rate === 0) return -(present + future) / n
  const g = (1 + rate) ** n
  return -(rate * (present * g + future)) / ((1 + rate * type) * (g - 1))
}

function interestOf(rate: number, period: number, n: number, present: number, future: number, type: number): number {
  const payment = paymentOf(rate, n, present, future, type)
  if (type === 1 && period === 1) return 0
  // Il debito dopo period − 1 rate, per il tasso.
  const before = type === 1 ? futureValue(rate, period - 2, payment, present, 1) - payment : futureValue(rate, period - 1, payment, present, 0)
  return before * rate
}

/** Gli argomenti comuni: tasso, periodi e i facoltativi (valore futuro, tipo 0 o 1). */
function loanArgs(args: FormulaNode[], ctx: Ctx, from: number): { future: number; type: number } {
  const future = numberArg(args[from], ctx, 0)
  const type = numberArg(args[from + 1], ctx, 0) ? 1 : 0
  return { future, type }
}

define({
  name: 'RATA',
  aliases: ['PMT'],
  args: 'tasso; periodi; va; [vf]; [tipo]',
  help: 'La rata costante di un prestito (negativa: sono soldi che escono); il tasso è quello di ogni periodo',
  min: 3,
  max: 5,
  run: (args, ctx) => {
    const rate = numberArg(args[0], ctx)
    const n = numberArg(args[1], ctx)
    const present = numberArg(args[2], ctx)
    const { future, type } = loanArgs(args, ctx, 3)
    if (n === 0) return fail('#NUM!', 'I periodi non possono essere 0')
    return num(paymentOf(rate, n, present, future, type), EURO)
  },
})

define({
  name: 'VA',
  aliases: ['PV'],
  args: 'tasso; periodi; rata; [vf]; [tipo]',
  help: 'Il valore attuale di una serie di rate costanti',
  min: 3,
  max: 5,
  run: (args, ctx) => {
    const rate = numberArg(args[0], ctx)
    const n = numberArg(args[1], ctx)
    const payment = numberArg(args[2], ctx)
    const { future, type } = loanArgs(args, ctx, 3)
    if (rate === 0) return num(-(payment * n + future), EURO)
    const g = (1 + rate) ** n
    return num(-((payment * (1 + rate * type) * (g - 1)) / rate + future) / g, EURO)
  },
})

define({
  name: 'VAL.FUT',
  aliases: ['FV'],
  args: 'tasso; periodi; rata; [va]; [tipo]',
  help: 'Il valore futuro di un investimento con rate costanti e tasso costante',
  min: 3,
  max: 5,
  run: (args, ctx) => {
    const rate = numberArg(args[0], ctx)
    const n = numberArg(args[1], ctx)
    const payment = numberArg(args[2], ctx)
    const present = numberArg(args[3], ctx, 0)
    const type = numberArg(args[4], ctx, 0) ? 1 : 0
    return num(futureValue(rate, n, payment, present, type), EURO)
  },
})

const periodSpec = (name: string, aliases: string[], help: string, principal: boolean) =>
  define({
    name,
    aliases,
    args: 'tasso; periodo; periodi; va; [vf]; [tipo]',
    help,
    min: 4,
    max: 6,
    run: (args, ctx) => {
      const rate = numberArg(args[0], ctx)
      const period = numberArg(args[1], ctx)
      const n = numberArg(args[2], ctx)
      const present = numberArg(args[3], ctx)
      const { future, type } = loanArgs(args, ctx, 4)
      if (period < 1 || period > n) return fail('#NUM!', 'Il periodo deve stare tra 1 e il numero dei periodi')
      const interest = interestOf(rate, period, n, present, future, type)
      return num(principal ? paymentOf(rate, n, present, future, type) - interest : interest, EURO)
    },
  })
periodSpec('INTERESSI', ['IPMT'], 'La quota interessi della rata di quel periodo', false)
periodSpec('P.RATA', ['PPMT'], 'La quota capitale della rata di quel periodo', true)

define({
  name: 'VAN',
  aliases: ['NPV'],
  args: 'tasso; valore1; [valore2]; …',
  help: 'Il valore attuale netto dei flussi, il primo alla fine del primo periodo',
  min: 2,
  max: MANY,
  run: ([rate, ...rest], ctx) => {
    const r = numberArg(rate, ctx)
    const { values } = numbersOf(rest, ctx)
    if (r === -1) return fail('#DIV/0!')
    return num(values.reduce((s, x, i) => s + x / (1 + r) ** (i + 1), 0), EURO)
  },
})

define({
  name: 'TIR.COST',
  aliases: ['IRR'],
  args: 'valori; [ipotesi]',
  help: 'Il tasso interno di rendimento dei flussi (il primo di solito è l\'investimento, negativo)',
  min: 1,
  max: 2,
  run: ([a, b], ctx) => {
    const { values } = numbersOf([a], ctx)
    if (!values.some((x) => x > 0) || !values.some((x) => x < 0)) return fail('#NUM!', 'Servono flussi positivi e negativi')
    const rate = irr(values, numberArg(b, ctx, 0.1))
    return rate === null ? fail('#NUM!', 'Il tasso non si trova') : num(rate, { kind: 'percent', decimals: 2 })
  },
})

/** Il tasso che annulla il valore attuale: Newton dall'ipotesi, poi bisezione se non basta. */
function irr(values: number[], guess: number): number | null {
  const npv = (r: number) => values.reduce((s, x, i) => s + x / (1 + r) ** i, 0)
  const slope = (r: number) => values.reduce((s, x, i) => s - (i * x) / (1 + r) ** (i + 1), 0)
  let r = guess
  for (let k = 0; k < 100; k++) {
    const f = npv(r)
    const d = slope(r)
    if (!Number.isFinite(f) || !Number.isFinite(d) || d === 0) break
    const next = r - f / d
    if (next <= -1) break
    if (Math.abs(next - r) < 1e-12) return next
    r = next
  }
  let lo = -0.9999
  let hi = 10
  let flo = npv(lo)
  if (flo * npv(hi) > 0) return null
  for (let k = 0; k < 300; k++) {
    const mid = (lo + hi) / 2
    const fm = npv(mid)
    if (Math.abs(fm) < 1e-10 || hi - lo < 1e-14) return mid
    if (flo * fm < 0) hi = mid
    else {
      lo = mid
      flo = fm
    }
  }
  return (lo + hi) / 2
}

define({
  name: 'AMMORT.COST',
  aliases: ['SLN'],
  args: 'costo; valore_residuo; vita_utile',
  help: 'La quota di ammortamento a quote costanti di ogni periodo',
  min: 3,
  max: 3,
  run: ([a, b, c], ctx) => {
    const cost = numberArg(a, ctx)
    const salvage = numberArg(b, ctx)
    const life = numberArg(c, ctx)
    if (life === 0) return fail('#DIV/0!')
    return num((cost - salvage) / life, EURO)
  },
})

// ——— Elenco e nomi ———

const BY_NAME = new Map<string, FunctionSpec>()
for (const spec of FUNCTIONS) {
  BY_NAME.set(spec.name, spec)
  for (const alias of spec.aliases ?? []) BY_NAME.set(alias, spec)
}

/** La funzione con questo nome (italiano o inglese, maiuscole o minuscole). */
export function lookupFunction(name: string): FunctionSpec | undefined {
  return BY_NAME.get(name.toUpperCase())
}

/** Tutte le funzioni, in ordine alfabetico (per i suggerimenti e l'aiuto). */
export function allFunctions(): readonly FunctionSpec[] {
  return [...FUNCTIONS].sort((a, b) => a.name.localeCompare(b.name, 'it'))
}

/** Calcola la funzione: controlla quanti argomenti ha e ferma il calcolo al primo errore. */
export function callFunction(name: string, args: FormulaNode[], ctx: Ctx): Res {
  const spec = lookupFunction(name)
  if (!spec) return fail('#NOME?', `Non conosco la funzione ${name}`)
  if (args.length < spec.min || args.length > spec.max) {
    const count = spec.min === spec.max ? `${spec.min}` : spec.max === MANY ? `almeno ${spec.min}` : `da ${spec.min} a ${spec.max}`
    return fail('#VALORE!', `${spec.name} vuole ${count} argoment${spec.max === 1 && spec.min === 1 ? 'o' : 'i'}: ${spec.name}(${spec.args})`)
  }
  try {
    return spec.run(args, ctx)
  } catch (err) {
    if (err instanceof Stop) return err.res
    throw err
  }
}

