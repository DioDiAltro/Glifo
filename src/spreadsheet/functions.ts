/**
 * Le funzioni delle formule, con i nomi dell'Excel italiano (SOMMA, MEDIA, SE, CERCA.VERT, RATA…)
 * e, per chi li conosce, anche quelli inglesi (SUM, AVERAGE, IF…). Ognuna ha la sua riga di aiuto,
 * che l'editor mostra mentre si scrive, nella lingua di Glifo: in inglese con il nome dell'Excel
 * inglese (`ENGLISH_NAMES`, `shownName`). Si comportano come in Excel: SOMMA salta i testi delle
 * celle, un errore passa al risultato, CERCA.VERT senza FALSO cerca il valore più vicino.
 */
import { lang, texts } from '../i18n'
import type { FormulaNode } from './formula'
import { addFormat, booleanText, formatNumber, GENERAL, mulFormat, parseTextFormat, readNumber, roundTo, tidy, withCents, type Format } from './format'
import { isError, sheetError, type SheetError, type Value } from './values'

const T = texts({
  emptyText: ['Un testo vuoto non è un numero', 'Empty text isn\'t a number'],
  notNumber: (text: string) => [`«${text}» è un testo, non un numero`, `“${text}” is text, not a number`],
  notBoolean: (text: string) => [`«${text}» non è né VERO né FALSO`, `“${text}” is neither TRUE nor FALSE`],
  missingArg: ['Manca un argomento', 'An argument is missing'],
  needRange: ['Qui ci vuole un intervallo di celle, come A1:B5', 'This needs a range of cells, like A1:B5'],
  noMean: ['Non ci sono numeri di cui fare la media', 'There are no numbers to average'],
  negativeRoot: ['La radice quadrata di un numero negativo non c\'è', 'A negative number has no square root'],
  positiveLog: ['Il logaritmo si fa solo dei numeri positivi', 'The logarithm is only defined for positive numbers'],
  logBase: ['Il logaritmo vuole numeri positivi e una base diversa da 1', 'The logarithm needs positive numbers and a base other than 1'],
  zeroToZero: ['0 elevato a 0 non si può calcolare', '0 to the power of 0 can\'t be calculated'],
  negativePower: [
    'La potenza di un numero negativo con un esponente con la virgola non c\'è',
    'A negative number can\'t be raised to a power with decimals',
  ],
  noNumbers: ['Non ci sono numeri', 'There are no numbers'],
  noRepeat: ['Nessun numero compare più di una volta', 'No number appears more than once'],
  kRange: (n: number) => [`k deve stare tra 1 e ${n}`, `k must be between 1 and ${n}`],
  twoNumbers: ['Servono almeno due numeri', 'At least two numbers are needed'],
  noMatch: ['Nessuna cella rispetta il criterio', 'No cell meets the criterion'],
  sameSize: ['Gli intervalli devono essere grandi uguali', 'The ranges must be the same size'],
  noBooleans: ['Non ci sono valori VERO o FALSO', 'There are no TRUE or FALSE values'],
  indexFromOne: ['L\'indice parte da 1', 'The index starts at 1'],
  tableHasOnly: (n: number, rows: boolean) => [
    `La tabella ha solo ${n} ${rows ? 'righe' : 'colonne'}`,
    `The table has only ${n} ${rows ? (n === 1 ? 'row' : 'rows') : n === 1 ? 'column' : 'columns'}`,
  ],
  notInFirst: (text: string, row: boolean) => [
    `«${text}» non c'è nella ${row ? 'prima riga' : 'prima colonna'}`,
    `“${text}” isn't in the first ${row ? 'row' : 'column'}`,
  ],
  oneLine: ['CONFRONTA cerca in una riga o in una colonna', 'MATCH looks in a single row or column'],
  notThere: (text: string) => [`«${text}» non c'è`, `“${text}” isn't there`],
  outside: ['La cella è fuori dall\'intervallo', 'The cell is outside the range'],
  unknownFormat: ['Formato sconosciuto: si scrive come "0,00", "0,00 €" o "0%"', 'Unknown format: write it like "0.00", "€0.00" or "0%"'],
  notANumber: ['Il testo non è un numero', 'The text isn\'t a number'],
  zeroPeriods: ['I periodi non possono essere 0', 'The number of periods can\'t be 0'],
  periodRange: ['Il periodo deve stare tra 1 e il numero dei periodi', 'The period must be between 1 and the number of periods'],
  mixedFlows: ['Servono flussi positivi e negativi', 'Both positive and negative cash flows are needed'],
  noRate: ['Il tasso non si trova', 'The rate can\'t be found'],
  unknownFunction: (name: string) => [`Non conosco la funzione ${name}`, `Unknown function ${name}`],
  argCount: (name: string, min: number, max: number, args: string) => {
    const it = min === max ? `${min}` : max === Infinity ? `almeno ${min}` : `da ${min} a ${max}`
    const en = min === max ? `${min}` : max === Infinity ? `at least ${min}` : `${min} to ${max}`
    return [
      `${name} vuole ${it} argoment${max === 1 && min === 1 ? 'o' : 'i'}: ${name}(${args})`,
      `${name} takes ${en} ${max === 1 && min === 1 ? 'argument' : 'arguments'}: ${name}(${args})`,
    ]
  },
})

/** Gli argomenti delle funzioni, per l'aiuto: separati come si scrivono, con «;» in italiano e «,» in inglese. */
const ARGS = texts({
  numbers: ['numero1; [numero2]; …', 'number1, [number2], …'],
  number: ['numero', 'number'],
  numberDigits: ['numero; cifre', 'number, digits'],
  numberMaybeDigits: ['numero; [cifre]', 'number, [digits]'],
  numberBase: ['numero; [base]', 'number, [base]'],
  power: ['base; esponente', 'base, exponent'],
  division: ['dividendo; divisore', 'dividend, divisor'],
  rangeK: ['intervallo; k', 'range, k'],
  values: ['valore1; [valore2]; …', 'value1, [value2], …'],
  range: ['intervallo', 'range'],
  criterion: ['intervallo; criterio', 'range, criterion'],
  sumIf: ['intervallo; criterio; [int_somma]', 'range, criterion, [sum_range]'],
  averageIf: ['intervallo; criterio; [int_media]', 'range, criterion, [average_range]'],
  arrays: ['matrice1; [matrice2]; …', 'array1, [array2], …'],
  ifArgs: ['test; se_vero; [se_falso]', 'test, value_if_true, [value_if_false]'],
  ifError: ['valore; valore_se_errore', 'value, value_if_error'],
  logicals: ['logico1; [logico2]; …', 'logical1, [logical2], …'],
  logical: ['logico', 'logical'],
  value: ['valore', 'value'],
  lookup: ['valore; tabella; indice; [intervallo]', 'value, table, index, [range_lookup]'],
  match: ['valore; intervallo; [tipo]', 'value, range, [match_type]'],
  index: ['intervallo; riga; [colonna]', 'range, row, [column]'],
  texts: ['testo1; [testo2]; …', 'text1, [text2], …'],
  text: ['testo', 'text'],
  textCount: ['testo; [quanti]', 'text, [num_chars]'],
  mid: ['testo; inizio; quanti', 'text, start, num_chars'],
  format: ['valore; formato', 'value, format'],
  payment: ['tasso; periodi; va; [vf]; [tipo]', 'rate, nper, pv, [fv], [type]'],
  presentValue: ['tasso; periodi; rata; [vf]; [tipo]', 'rate, nper, pmt, [fv], [type]'],
  futureValue: ['tasso; periodi; rata; [va]; [tipo]', 'rate, nper, pmt, [pv], [type]'],
  period: ['tasso; periodo; periodi; va; [vf]; [tipo]', 'rate, per, nper, pv, [fv], [type]'],
  npv: ['tasso; valore1; [valore2]; …', 'rate, value1, [value2], …'],
  irr: ['valori; [ipotesi]', 'values, [guess]'],
  depreciation: ['costo; valore_residuo; vita_utile', 'cost, salvage, life'],
})

type Params = keyof typeof ARGS

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
  /** Il nome nell'Excel italiano: quello che si scrive nella nota. */
  name: string
  aliases?: string[]
  /** Gli argomenti, per l'aiuto, nella lingua di Glifo: «numero1; [numero2]; …». */
  readonly args: string
  /** La riga di aiuto, nella lingua di Glifo. */
  readonly help: string
  min: number
  max: number
  run(args: FormulaNode[], ctx: Ctx): Res
}

/** Una funzione da definire: gli argomenti (la voce di ARGS) e l'aiuto nelle due lingue, letti quando si mostrano. */
interface Definition extends Omit<FunctionSpec, 'args' | 'help'> {
  params: Params | null
  text: { readonly help: string }
}

// ——— Valori ———

const ok = (v: Value, f: Format = GENERAL): Res => ({ v, f })
const fail = (code: SheetError['error'], message?: string): Res => ({ v: sheetError(code, message), f: GENERAL })
const num = (n: number, f: Format = GENERAL): Res => (Number.isFinite(n) ? { v: tidy(n), f } : fail('#NUM!'))

/**
 * Un testo che è un numero (anche «1,5 €» o «22%»), come quando Excel fa i conti con i testi. Si legge
 * come nella nota, uguale in tutte e due le lingue.
 */
function textNumber(s: string): number | null {
  return readNumber(s)?.value ?? null
}

/** Il numero di un valore, come lo vuole Excel per i conti: vuoto = 0, VERO = 1, testo numerico = il numero. */
export function toNumber(v: Value): number | SheetError {
  if (v === null) return 0
  if (typeof v === 'number') return v
  if (typeof v === 'boolean') return v ? 1 : 0
  if (typeof v === 'string') {
    if (!v.trim()) return sheetError('#VALORE!', T.emptyText)
    return textNumber(v) ?? sheetError('#VALORE!', T.notNumber(v))
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
    return sheetError('#VALORE!', T.notBoolean(v))
  }
  return v
}

/** Il testo di un valore, come lo unisce & (i numeri nel formato generale, come si mostrano: 1,5 in italiano, 1.5 in inglese). */
export function toText(v: Value): string | SheetError {
  if (v === null) return ''
  if (typeof v === 'string') return v
  if (typeof v === 'boolean') return booleanText(v)
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
    if (fallback === undefined) throw new Stop(fail('#VALORE!', T.missingArg))
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
  if (arg?.kind !== 'range') throw new Stop(fail('#VALORE!', T.needRange))
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

/** Il test di un criterio, come in Excel (VERO e FALSO anche con i nomi inglesi, TRUE e FALSE). */
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
  if (upper === 'VERO' || upper === 'FALSO' || upper === 'TRUE' || upper === 'FALSE') {
    const b = upper === 'VERO' || upper === 'TRUE'
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

function define(definition: Definition): void {
  const { params, text, ...spec } = definition
  FUNCTIONS.push(
    Object.defineProperties(spec, {
      args: { get: () => (params ? ARGS[params] : ''), enumerable: true },
      help: { get: () => text.help, enumerable: true },
    }) as FunctionSpec,
  )
}

const MANY = Infinity

/** Una funzione di un numero solo, con il formato del risultato. */
function unary(name: string, aliases: string[], text: Definition['text'], fn: (x: number) => number | SheetError, keepFormat = false): void {
  define({
    name,
    aliases,
    params: 'number',
    text,
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
  params: 'numbers',
  text: texts({ help: ['La somma dei numeri (anche di intervalli come B2:B10)', 'The sum of the numbers (also of ranges like B2:B10)'] }),
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
  params: 'numbers',
  text: texts({ help: ['La media dei numeri', 'The mean of the numbers'] }),
  min: 1,
  max: MANY,
  run: (args, ctx) => {
    const { values, format } = numbersOf(args, ctx)
    if (!values.length) return fail('#DIV/0!', T.noMean)
    return num(values.reduce((s, x) => s + x, 0) / values.length, withCents(format ?? GENERAL))
  },
})

define({
  name: 'MIN',
  params: 'numbers',
  text: texts({ help: ['Il numero più piccolo', 'The smallest number'] }),
  min: 1,
  max: MANY,
  run: (args, ctx) => {
    const { values, format } = numbersOf(args, ctx)
    return num(values.length ? Math.min(...values) : 0, format ?? GENERAL)
  },
})

define({
  name: 'MAX',
  params: 'numbers',
  text: texts({ help: ['Il numero più grande', 'The largest number'] }),
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
  params: 'numbers',
  text: texts({ help: ['Il prodotto dei numeri', 'The product of the numbers'] }),
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

const roundSpec = (name: string, aliases: string[], text: Definition['text'], mode: 'round' | 'up' | 'down', min = 2) =>
  define({
    name,
    aliases,
    params: min === 2 ? 'numberDigits' : 'numberMaybeDigits',
    text,
    min,
    max: 2,
    run: ([a, digits], ctx) => {
      const res = ctx.scalar(a)
      const x = stopOn(toNumber(stopOn(res.v)))
      const d = Math.trunc(numberArg(digits, ctx, 0))
      return num(roundTo(x, d, mode), res.f)
    },
  })
roundSpec('ARROTONDA', ['ROUND'], texts({ help: ['Arrotonda al numero di decimali dato (il 5 va su)', 'Rounds to the given number of decimals (5 rounds up)'] }), 'round')
roundSpec('ARROTONDA.PER.ECC', ['ROUNDUP'], texts({ help: ['Arrotonda per eccesso, lontano da zero', 'Rounds up, away from zero'] }), 'up')
roundSpec('ARROTONDA.PER.DIF', ['ROUNDDOWN'], texts({ help: ['Arrotonda per difetto, verso zero', 'Rounds down, toward zero'] }), 'down')
roundSpec('TRONCA', ['TRUNC'], texts({ help: ['Toglie i decimali dopo le cifre date, senza arrotondare', 'Drops the decimals after the given digits, without rounding'] }), 'down', 1)

unary('INT', [], texts({ help: ['La parte intera, arrotondando verso il basso', 'The integer part, rounding down'] }), (x) => Math.floor(x), true)
unary('ASS', ['ABS'], texts({ help: ['Il valore assoluto', 'The absolute value'] }), (x) => Math.abs(x), true)
unary('RADQ', ['SQRT'], texts({ help: ['La radice quadrata', 'The square root'] }), (x) => (x < 0 ? sheetError('#NUM!', T.negativeRoot) : Math.sqrt(x)))
unary('EXP', [], texts({ help: ['e elevato al numero', 'e raised to the number'] }), (x) => Math.exp(x))
unary('LN', [], texts({ help: ['Il logaritmo naturale', 'The natural logarithm'] }), (x) => (x <= 0 ? sheetError('#NUM!', T.positiveLog) : Math.log(x)))
unary('LOG10', [], texts({ help: ['Il logaritmo in base 10', 'The base-10 logarithm'] }), (x) => (x <= 0 ? sheetError('#NUM!', T.positiveLog) : Math.log10(x)))
unary('SEGNO', ['SIGN'], texts({ help: ['1 se positivo, −1 se negativo, 0 se zero', '1 if positive, −1 if negative, 0 if zero'] }), (x) => Math.sign(x))

define({
  name: 'LOG',
  params: 'numberBase',
  text: texts({ help: ['Il logaritmo nella base data (10 se non la scrivi)', 'The logarithm in the given base (10 if you leave it out)'] }),
  min: 1,
  max: 2,
  run: ([a, b], ctx) => {
    const x = numberArg(a, ctx)
    const base = numberArg(b, ctx, 10)
    if (x <= 0 || base <= 0 || base === 1) return fail('#NUM!', T.logBase)
    return num(Math.log(x) / Math.log(base))
  },
})

define({
  name: 'POTENZA',
  aliases: ['POWER'],
  params: 'power',
  text: texts({ help: ['La base elevata all\'esponente (come ^)', 'The base raised to the exponent (like ^)'] }),
  min: 2,
  max: 2,
  run: ([a, b], ctx) => power(numberArg(a, ctx), numberArg(b, ctx)),
})

define({
  name: 'RESTO',
  aliases: ['MOD'],
  params: 'division',
  text: texts({ help: ['Il resto della divisione (con il segno del divisore)', 'The remainder of the division (with the sign of the divisor)'] }),
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
  params: null,
  text: texts({ help: ['Il numero π = 3,14159…', 'The number π = 3.14159…'] }),
  min: 0,
  max: 0,
  run: () => num(Math.PI),
})

/** a^b come in Excel: 0^0 non si può, le radici dei negativi neanche. */
export function power(a: number, b: number): Res {
  if (a === 0 && b === 0) return fail('#NUM!', T.zeroToZero)
  if (a === 0 && b < 0) return fail('#DIV/0!')
  const y = a ** b
  if (Number.isNaN(y)) return fail('#NUM!', T.negativePower)
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
  params: 'numbers',
  text: texts({ help: ['Il valore centrale dei numeri messi in ordine', 'The middle value of the numbers in order'] }),
  min: 1,
  max: MANY,
  run: (args, ctx) => {
    const { values, format } = sorted(args, ctx)
    if (!values.length) return fail('#NUM!', T.noNumbers)
    const mid = values.length >> 1
    return num(values.length % 2 ? values[mid] : (values[mid - 1] + values[mid]) / 2, withCents(format))
  },
})

define({
  name: 'MODA',
  aliases: ['MODE', 'MODA.SNGL', 'MODE.SNGL'],
  params: 'numbers',
  text: texts({ help: ['Il numero che compare più volte', 'The number that appears most often'] }),
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
    return best === null ? fail('#N/D', T.noRepeat) : num(best, format ?? GENERAL)
  },
})

const kth = (name: string, aliases: string[], text: Definition['text'], largest: boolean) =>
  define({
    name,
    aliases,
    params: 'rangeK',
    text,
    min: 2,
    max: 2,
    run: ([a, b], ctx) => {
      const { values, format } = sorted([a], ctx)
      const k = Math.ceil(numberArg(b, ctx))
      if (k < 1 || k > values.length) return fail('#NUM!', T.kRange(values.length))
      return num(largest ? values[values.length - k] : values[k - 1], format)
    },
  })
kth('GRANDE', ['LARGE'], texts({ help: ['Il k-esimo numero più grande', 'The k-th largest number'] }), true)
kth('PICCOLO', ['SMALL'], texts({ help: ['Il k-esimo numero più piccolo', 'The k-th smallest number'] }), false)

const spread = (name: string, aliases: string[], text: Definition['text'], sample: boolean, root: boolean) =>
  define({
    name,
    aliases,
    params: 'numbers',
    text,
    min: 1,
    max: MANY,
    run: (args, ctx) => {
      const { values, format } = numbersOf(args, ctx)
      const n = values.length
      if (n < (sample ? 2 : 1)) return fail('#DIV/0!', sample ? T.twoNumbers : T.noNumbers)
      const mean = values.reduce((s, x) => s + x, 0) / n
      const variance = values.reduce((s, x) => s + (x - mean) ** 2, 0) / (sample ? n - 1 : n)
      return root ? num(Math.sqrt(variance), withCents(format ?? GENERAL)) : num(variance)
    },
  })
spread(
  'DEV.ST',
  ['DEV.ST.C', 'STDEV', 'STDEV.S'],
  texts({ help: ['La deviazione standard di un campione (divide per n − 1)', 'The standard deviation of a sample (divides by n − 1)'] }),
  true,
  true,
)
spread(
  'DEV.ST.P',
  ['DEV.ST.POP', 'STDEVP', 'STDEV.P'],
  texts({ help: ['La deviazione standard di tutta la popolazione (divide per n)', 'The standard deviation of the whole population (divides by n)'] }),
  false,
  true,
)
spread('VAR', ['VAR.C', 'VAR.S'], texts({ help: ['La varianza di un campione (divide per n − 1)', 'The variance of a sample (divides by n − 1)'] }), true, false)
spread('VAR.P', ['VAR.POP', 'VARP'], texts({ help: ['La varianza di tutta la popolazione (divide per n)', 'The variance of the whole population (divides by n)'] }), false, false)

// Contare

define({
  name: 'CONTA.NUMERI',
  aliases: ['COUNT'],
  params: 'values',
  text: texts({ help: ['Quante celle contengono un numero', 'How many cells contain a number'] }),
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
  params: 'values',
  text: texts({ help: ['Quante celle non sono vuote', 'How many cells aren\'t empty'] }),
  min: 1,
  max: MANY,
  run: (args, ctx) => num(valuesOf(args, ctx).filter((c) => c.v !== null).length),
})

define({
  name: 'CONTA.VUOTE',
  aliases: ['COUNTBLANK'],
  params: 'range',
  text: texts({ help: ['Quante celle sono vuote', 'How many cells are empty'] }),
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
  params: 'criterion',
  text: texts({ help: ['Quante celle rispettano il criterio, come ">10" o "mele"', 'How many cells meet the criterion, like ">10" or "apples"'] }),
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
  params: 'sumIf',
  text: texts({
    help: [
      'La somma delle celle che rispettano il criterio (o di quelle accanto, in int_somma)',
      'The sum of the cells that meet the criterion (or of the ones next to them, in sum_range)',
    ],
  }),
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
  params: 'averageIf',
  text: texts({ help: ['La media delle celle che rispettano il criterio', 'The mean of the cells that meet the criterion'] }),
  min: 2,
  max: 3,
  run: (args, ctx) => {
    const { values, format } = conditional(args, ctx)
    if (!values.length) return fail('#DIV/0!', T.noMatch)
    return num(values.reduce((s, x) => s + x, 0) / values.length, withCents(format ?? GENERAL))
  },
})

define({
  name: 'SOMMA.PRODOTTO',
  aliases: ['SUMPRODUCT'],
  params: 'arrays',
  text: texts({ help: ['Moltiplica le celle corrispondenti degli intervalli e somma i prodotti', 'Multiplies the matching cells of the ranges and adds up the products'] }),
  min: 1,
  max: MANY,
  run: (args, ctx) => {
    const ranges = args.map((a) => rangeArg(a, ctx))
    const { rows, cols } = ranges[0]
    if (ranges.some((r) => r.rows !== rows || r.cols !== cols)) return fail('#VALORE!', T.sameSize)
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
  params: 'ifArgs',
  text: texts({
    help: [
      'Se il test è VERO dà il secondo valore, altrimenti il terzo: =SE(B2>=6; "promosso"; "bocciato")',
      'If the test is TRUE it gives the second value, otherwise the third: =IF(B2>=6, "passed", "failed")',
    ],
  }),
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
  params: 'ifError',
  text: texts({ help: ['Il valore, o l\'altro se il primo è un errore (come #DIV/0!)', 'The value, or the other one if the first is an error (like #DIV/0!)'] }),
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
  params: 'logicals',
  text: texts({ help: ['VERO se tutti i test sono VERI', 'TRUE if all the tests are TRUE'] }),
  min: 1,
  max: MANY,
  run: (args, ctx) => ok(logical(args, ctx).every(Boolean)),
})

define({
  name: 'O',
  aliases: ['OR'],
  params: 'logicals',
  text: texts({ help: ['VERO se almeno un test è VERO', 'TRUE if at least one test is TRUE'] }),
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
  if (!out.length) throw new Stop(fail('#VALORE!', T.noBooleans))
  return out
}

define({
  name: 'NON',
  aliases: ['NOT'],
  params: 'logical',
  text: texts({ help: ['Il contrario: VERO diventa FALSO e FALSO diventa VERO', 'The opposite: TRUE becomes FALSE and FALSE becomes TRUE'] }),
  min: 1,
  max: 1,
  run: ([a], ctx) => ok(!boolArg(a, ctx, false)),
})

define({ name: 'VERO', aliases: ['TRUE'], params: null, text: texts({ help: ['Il valore VERO', 'The value TRUE'] }), min: 0, max: 0, run: () => ok(true) })
define({ name: 'FALSO', aliases: ['FALSE'], params: null, text: texts({ help: ['Il valore FALSO', 'The value FALSE'] }), min: 0, max: 0, run: () => ok(false) })

const isSpec = (name: string, aliases: string[], text: Definition['text'], test: (v: Value) => boolean) =>
  define({ name, aliases, params: 'value', text, min: 1, max: 1, run: ([a], ctx) => ok(test(ctx.scalar(a).v)) })
isSpec('VAL.ERRORE', ['ISERROR'], texts({ help: ['VERO se il valore è un errore', 'TRUE if the value is an error'] }), (v) => isError(v))
isSpec('VAL.NUMERO', ['ISNUMBER'], texts({ help: ['VERO se il valore è un numero', 'TRUE if the value is a number'] }), (v) => typeof v === 'number')
isSpec('VAL.TESTO', ['ISTEXT'], texts({ help: ['VERO se il valore è un testo', 'TRUE if the value is text'] }), (v) => typeof v === 'string')
isSpec('VAL.VUOTO', ['ISBLANK'], texts({ help: ['VERO se la cella è vuota', 'TRUE if the cell is empty'] }), (v) => v === null)

// Cercare

define({
  name: 'CERCA.VERT',
  aliases: ['VLOOKUP'],
  params: 'lookup',
  text: texts({
    help: [
      'Cerca il valore nella prima colonna della tabella e dà quello della colonna indice; con FALSO solo se è uguale',
      'Looks for the value in the first column of the table and gives the one in column index; with FALSE only an exact match',
    ],
  }),
  min: 3,
  max: 4,
  run: ([a, b, c, d], ctx) => lookup(a, b, c, d, ctx, false),
})

define({
  name: 'CERCA.ORIZZ',
  aliases: ['HLOOKUP'],
  params: 'lookup',
  text: texts({
    help: [
      'Come CERCA.VERT, ma cerca nella prima riga e dà quello della riga indice',
      'Like VLOOKUP, but looks in the first row and gives the one in row index',
    ],
  }),
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
  if (index < 1) return fail('#VALORE!', T.indexFromOne)
  if (index > width) return fail('#RIF!', T.tableHasOnly(width, across))
  const key = (i: number) => (across ? table.at(0, i) : table.at(i, 0)).v
  const pick = (i: number) => (across ? table.at(index - 1, i) : table.at(i, index - 1))
  const found = approximate ? nearest(wanted, length, key) : exact(wanted, length, key)
  return found === null ? fail('#N/D', T.notInFirst(String(toText(wanted)), across)) : pick(found)
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
  params: 'match',
  text: texts({
    help: [
      'In che posizione c\'è il valore (tipo 0: uguale; 1: il più grande che non lo supera)',
      'The position of the value (type 0: equal; 1: the largest one that doesn\'t exceed it)',
    ],
  }),
  min: 2,
  max: 3,
  run: ([a, b, c], ctx) => {
    const wanted = stopOn(ctx.scalar(a).v)
    const range = rangeArg(b, ctx)
    const type = Math.sign(numberArg(c, ctx, 1))
    const length = range.rows === 1 ? range.cols : range.rows
    if (range.rows > 1 && range.cols > 1) return fail('#N/D', T.oneLine)
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
    return found === null ? fail('#N/D', T.notThere(String(toText(wanted)))) : num(found + 1)
  },
})

define({
  name: 'INDICE',
  aliases: ['INDEX'],
  params: 'index',
  text: texts({ help: ['Il valore della cella alla riga e alla colonna date dentro l\'intervallo', 'The value of the cell at the given row and column inside the range'] }),
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
    if (row < 1 || col < 1 || row > range.rows || col > range.cols) return fail('#RIF!', T.outside)
    return range.at(row - 1, col - 1)
  },
})

// Testo

define({
  name: 'CONCATENA',
  aliases: ['CONCATENATE', 'CONCAT'],
  params: 'texts',
  text: texts({ help: ['Unisce i testi (come &)', 'Joins the texts (like &)'] }),
  min: 1,
  max: MANY,
  run: (args, ctx) => ok(valuesOf(args, ctx).map((c) => stopOn(toText(stopOn(c.v)))).join('')),
})

define({
  name: 'LUNGHEZZA',
  aliases: ['LEN'],
  params: 'text',
  text: texts({ help: ['Quanti caratteri ha il testo', 'How many characters the text has'] }),
  min: 1,
  max: 1,
  run: ([a], ctx) => num([...textArg(a, ctx)].length),
})

const textSpec = (name: string, aliases: string[], text: Definition['text'], fn: (s: string) => string) =>
  define({ name, aliases, params: 'text', text, min: 1, max: 1, run: ([a], ctx) => ok(fn(textArg(a, ctx))) })
textSpec('MAIUSC', ['UPPER'], texts({ help: ['Il testo in maiuscolo', 'The text in uppercase'] }), (s) => s.toLocaleUpperCase('it')) // non si traduce: il nome della funzione
textSpec('MINUSC', ['LOWER'], texts({ help: ['Il testo in minuscolo', 'The text in lowercase'] }), (s) => s.toLocaleLowerCase('it'))
textSpec('ANNULLA.SPAZI', ['TRIM'], texts({ help: ['Toglie gli spazi in più', 'Removes the extra spaces'] }), (s) => s.trim().replace(/ {2,}/g, ' '))

define({
  name: 'SINISTRA',
  aliases: ['LEFT'],
  params: 'textCount',
  text: texts({ help: ['I primi caratteri del testo', 'The first characters of the text'] }),
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
  params: 'textCount',
  text: texts({ help: ['Gli ultimi caratteri del testo', 'The last characters of the text'] }),
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
  params: 'mid',
  text: texts({ help: ['I caratteri del testo a partire dalla posizione inizio', 'The characters of the text from position start'] }),
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
  name: 'TESTO', // non si traduce: il nome della funzione
  aliases: ['TEXT'],
  params: 'format',
  text: texts({ help: ['Il numero scritto come testo nel formato dato, come "0,00 €" o "0%"', 'The number written as text in the given format, like "0.00" or "0%"'] }),
  min: 2,
  max: 2,
  run: ([a, b], ctx) => {
    const x = numberArg(a, ctx)
    // Il formato si scrive all'italiana o all'inglese; il testo esce nella lingua di Glifo, come si mostrano i numeri.
    const format = parseTextFormat(textArg(b, ctx))
    return format ? ok(formatNumber(x, format)) : fail('#VALORE!', T.unknownFormat)
  },
})

define({
  name: 'VALORE',
  aliases: ['VALUE'],
  params: 'text',
  text: texts({ help: ['Il numero scritto in un testo, come "1,5" o "22%"', 'The number written in a text, like "1.5" or "22%"'] }),
  min: 1,
  max: 1,
  run: ([a], ctx) => {
    const res = ctx.scalar(a)
    if (typeof res.v === 'number') return res
    const read = readNumber(textArg(a, ctx))
    return read ? num(read.value, read.format) : fail('#VALORE!', T.notANumber)
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
  params: 'payment',
  text: texts({
    help: [
      'La rata costante di un prestito (negativa: sono soldi che escono); il tasso è quello di ogni periodo',
      'The constant payment of a loan (negative: it\'s money going out); the rate is the one for each period',
    ],
  }),
  min: 3,
  max: 5,
  run: (args, ctx) => {
    const rate = numberArg(args[0], ctx)
    const n = numberArg(args[1], ctx)
    const present = numberArg(args[2], ctx)
    const { future, type } = loanArgs(args, ctx, 3)
    if (n === 0) return fail('#NUM!', T.zeroPeriods)
    return num(paymentOf(rate, n, present, future, type), EURO)
  },
})

define({
  name: 'VA',
  aliases: ['PV'],
  params: 'presentValue',
  text: texts({ help: ['Il valore attuale di una serie di rate costanti', 'The present value of a series of constant payments'] }),
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
  params: 'futureValue',
  text: texts({ help: ['Il valore futuro di un investimento con rate costanti e tasso costante', 'The future value of an investment with constant payments and a constant rate'] }),
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

const periodSpec = (name: string, aliases: string[], text: Definition['text'], principal: boolean) =>
  define({
    name,
    aliases,
    params: 'period',
    text,
    min: 4,
    max: 6,
    run: (args, ctx) => {
      const rate = numberArg(args[0], ctx)
      const period = numberArg(args[1], ctx)
      const n = numberArg(args[2], ctx)
      const present = numberArg(args[3], ctx)
      const { future, type } = loanArgs(args, ctx, 4)
      if (period < 1 || period > n) return fail('#NUM!', T.periodRange)
      const interest = interestOf(rate, period, n, present, future, type)
      return num(principal ? paymentOf(rate, n, present, future, type) - interest : interest, EURO)
    },
  })
periodSpec('INTERESSI', ['IPMT'], texts({ help: ['La quota interessi della rata di quel periodo', 'The interest part of the payment for that period'] }), false)
periodSpec('P.RATA', ['PPMT'], texts({ help: ['La quota capitale della rata di quel periodo', 'The principal part of the payment for that period'] }), true)

define({
  name: 'VAN',
  aliases: ['NPV'],
  params: 'npv',
  text: texts({ help: ['Il valore attuale netto dei flussi, il primo alla fine del primo periodo', 'The net present value of the cash flows, the first at the end of the first period'] }),
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
  params: 'irr',
  text: texts({
    help: [
      'Il tasso interno di rendimento dei flussi (il primo di solito è l\'investimento, negativo)',
      'The internal rate of return of the cash flows (the first is usually the investment, negative)',
    ],
  }),
  min: 1,
  max: 2,
  run: ([a, b], ctx) => {
    const { values } = numbersOf([a], ctx)
    if (!values.some((x) => x > 0) || !values.some((x) => x < 0)) return fail('#NUM!', T.mixedFlows)
    const rate = irr(values, numberArg(b, ctx, 0.1))
    return rate === null ? fail('#NUM!', T.noRate) : num(rate, { kind: 'percent', decimals: 2 })
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
  params: 'depreciation',
  text: texts({ help: ['La quota di ammortamento a quote costanti di ogni periodo', 'The straight-line depreciation for each period'] }),
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

/**
 * Il nome di ogni funzione nell'Excel inglese: quello scritto nei file (anche dall'Excel italiano) e
 * quello che Glifo mostra e scrive in inglese.
 */
export const ENGLISH_NAMES: Record<string, string> = {
  'AMMORT.COST': 'SLN',
  'ANNULLA.SPAZI': 'TRIM',
  ARROTONDA: 'ROUND',
  'ARROTONDA.PER.DIF': 'ROUNDDOWN',
  'ARROTONDA.PER.ECC': 'ROUNDUP',
  ASS: 'ABS',
  'CERCA.ORIZZ': 'HLOOKUP',
  'CERCA.VERT': 'VLOOKUP',
  CONCATENA: 'CONCATENATE',
  CONFRONTA: 'MATCH',
  'CONTA.NUMERI': 'COUNT',
  'CONTA.SE': 'COUNTIF',
  'CONTA.VALORI': 'COUNTA',
  'CONTA.VUOTE': 'COUNTBLANK',
  DESTRA: 'RIGHT',
  'DEV.ST': 'STDEV',
  'DEV.ST.P': 'STDEVP',
  E: 'AND',
  EXP: 'EXP',
  FALSO: 'FALSE',
  GRANDE: 'LARGE',
  INDICE: 'INDEX',
  INT: 'INT',
  INTERESSI: 'IPMT',
  LN: 'LN',
  LOG: 'LOG',
  LOG10: 'LOG10',
  LUNGHEZZA: 'LEN',
  MAIUSC: 'UPPER',
  MAX: 'MAX',
  MEDIA: 'AVERAGE',
  'MEDIA.SE': 'AVERAGEIF',
  MEDIANA: 'MEDIAN',
  MIN: 'MIN',
  MINUSC: 'LOWER',
  MODA: 'MODE',
  NON: 'NOT',
  O: 'OR',
  'P.RATA': 'PPMT',
  'PI.GRECO': 'PI',
  PICCOLO: 'SMALL',
  POTENZA: 'POWER',
  PRODOTTO: 'PRODUCT',
  RADQ: 'SQRT',
  RATA: 'PMT',
  RESTO: 'MOD',
  SE: 'IF',
  'SE.ERRORE': 'IFERROR',
  SEGNO: 'SIGN',
  SINISTRA: 'LEFT',
  SOMMA: 'SUM',
  'SOMMA.PRODOTTO': 'SUMPRODUCT',
  'SOMMA.SE': 'SUMIF',
  'STRINGA.ESTRAI': 'MID',
  TESTO: 'TEXT',
  'TIR.COST': 'IRR',
  TRONCA: 'TRUNC',
  VA: 'PV',
  'VAL.ERRORE': 'ISERROR',
  'VAL.FUT': 'FV',
  'VAL.NUMERO': 'ISNUMBER',
  'VAL.TESTO': 'ISTEXT',
  'VAL.VUOTO': 'ISBLANK',
  VALORE: 'VALUE',
  VAN: 'NPV',
  VAR: 'VAR',
  'VAR.P': 'VARP',
  VERO: 'TRUE',
}

const BY_NAME = new Map<string, FunctionSpec>()
for (const spec of FUNCTIONS) {
  BY_NAME.set(spec.name, spec)
  for (const alias of spec.aliases ?? []) BY_NAME.set(alias, spec)
}

/** La funzione con questo nome (italiano o inglese, maiuscole o minuscole). */
export function lookupFunction(name: string): FunctionSpec | undefined {
  return BY_NAME.get(name.toUpperCase())
}

/** Il nome della funzione nell'Excel inglese: SOMMA → SUM. */
export function englishName(spec: FunctionSpec): string {
  return ENGLISH_NAMES[spec.name] ?? spec.name
}

/**
 * Il nome di una funzione da mostrare nella lingua di Glifo: in italiano com'è scritto, in inglese
 * quello dell'Excel inglese (SOMMA → SUM). Un nome che non è una funzione resta com'è.
 */
export function shownName(name: string): string {
  if (lang === 'it') return name
  const spec = lookupFunction(name)
  return spec ? englishName(spec) : name
}

/** Tutte le funzioni, in ordine alfabetico (per i suggerimenti e l'aiuto). */
export function allFunctions(): readonly FunctionSpec[] {
  return [...FUNCTIONS].sort((a, b) => a.name.localeCompare(b.name, 'it'))
}

/** Calcola la funzione: controlla quanti argomenti ha e ferma il calcolo al primo errore. */
export function callFunction(name: string, args: FormulaNode[], ctx: Ctx): Res {
  const spec = lookupFunction(name)
  if (!spec) return fail('#NOME?', T.unknownFunction(name))
  if (args.length < spec.min || args.length > spec.max) {
    return fail('#VALORE!', T.argCount(shownName(spec.name), spec.min, spec.max, spec.args))
  }
  try {
    return spec.run(args, ctx)
  } catch (err) {
    if (err instanceof Stop) return err.res
    throw err
  }
}
