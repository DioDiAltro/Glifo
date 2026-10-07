/**
 * Il «foglio» di una nota, come nelle Note matematiche dell'iPad: le formule si leggono dall'alto
 * in basso; `$a = 2$` definisce a, `$f(x) = x^2$` definisce f, e una formula che finisce con «=»
 * (`$f(3) + a =$`) ha il suo risultato. I grafici usano le stesse definizioni.
 */
import {
  allRoots,
  compileComplex,
  evaluateExactComplex,
  formatComplex,
  formatGauss,
  formatList,
  GaussRational,
  piMultiple,
  type Complex,
  type ComplexFunction,
  type ComplexScope,
  type ExactComplexScope,
} from './complex'
import { numericPartials } from './calculus'
import { bound, compile, EMPTY_SCOPE, isCounter, MathError, scopeWith, withWorkLimit, type Scope, type UserFunction, type VectorFunction } from './evaluate'
import { limit, recognize, seriesSum, type LimitValue } from './limits'
import { solve } from './solve'
import { compileOde, odeOf, odeSolution, primed, type Ode, type OdeFunction } from './differential'
import { differentialRequest, solveDifferential } from './odesolve'
import { criticalShown, extremaShown, optimumOf, severalLimitShown, severalOf } from './several'
import { conicOf, quadricOf } from './conics'
import { powerSeriesOf, powerSeriesShown } from './powerseries'
import { fourierProblem, fourierShown } from './fourier'
import { inverseLaplaceShown, laplaceShown } from './laplace'
import { NUMERICAL, numericalShown, type NumericContext } from './numerical'
import { chiSquareTest, confidenceShown, hypothesisTest, testShown, varianceConfidenceShown, type InferenceContext } from './inference'
import { arithmeticShown, solveCongruences } from './arithmetic'
import { finiteSetOf, finiteValue, type FiniteContext } from './finite'
import { logicShown } from './logic'
import {
  EXACT,
  FLOAT,
  eigenvalues,
  eigenvectors,
  evaluateLinear,
  formatEigenvalues,
  formatLinear,
  formatPolynomial,
  polynomialIn,
  type Eigenvalue,
  characteristicPolynomial,
  image,
  kernel,
  type Field,
  type Lin,
  type LinearScope,
  type LinearValue,
  type Mat,
  dataOf,
} from './linear'
import { evaluateExact, ExactUnavailable, Rational, type ExactFunction, type ExactScope } from './exact'
import { expSumValue, type Distribution } from './distributions'
import { distributionOf, randomScope } from './probability'
import { correlation, DATA_FUNCTIONS, regression } from './statistics'
import { decimalShown, fractionShown, frequencyTable, modesShown, probabilityShown, quartilesShown, regressionShown, summaryRows } from './statsShown'
import { cartesianEquations, diagonalize, gramSchmidtShown, independence, parametricRank, signature } from './spaces'
import { mapNode } from './symbolic'
import { trim as trimPoly, type Poly } from './polynomial'
import { formatNumber, formatRational, type FormattedResult } from './format'
import { toLatex } from './latex'
import { children, namesIn, parseMath, type MathNode } from './parse'
import { definiteIntegral } from './definite'
import { study, studyPart, studyRows, studyTable } from './study'
import { cancelLinear, definiteParts, definiteValue, derive, exOf, expandCalculus, functionOf, isVectorBody, needsSymbols, partialDerivative, plainText, symbolicValue, symbols, tidy, toNode, zeroOverZero, type Ex, type SymbolScope } from './symbolic'

export interface Definition {
  name: string
  /** Le variabili, se è una funzione (f(x) = …); null se è un numero (a = …). */
  params: string[] | null
  /** Il testo della definizione (a = 2, f(x) = x^2), per rifarla altrove (nei grafici). */
  source: string
  /** Quello a destra dell'uguale. */
  value: MathNode
  /** I nomi che usa. */
  uses: Set<string>
}

/** Il controllo di un'uguaglianza scritta con il risultato (\int_0^1 x^2 \, dx = \frac{1}{3}): giusta o sbagliata. */
export interface EqualityCheck {
  ok: boolean
  /** Giusta con le cifre scritte (\sqrt{2} = 1{,}414): arrotondata o troncata, non esatta. */
  rounded?: boolean
  /** Quando è sbagliata: il valore giusto, scritto come i risultati. */
  value?: FormattedResult
}

/** Quello che Glifo dice di una formula: il risultato dopo «=» (o ⇒) e il controllo dell'uguaglianza scritta. */
export interface SheetLine {
  result: FormattedResult | null
  check: EqualityCheck | null
}

/** Una formula che finisce con «=» (o con ≈): il testo prima. */
const TRAILING_EQUALS = /(?<![<>!:\\])(=|\\approx|≈)(?:\s|\\[,;:! ]|\\q?quad\b)*$/

/** Una formula che finisce con ⇒ (o ⇔): l'equazione, la disequazione o il sistema da risolvere. */
const SOLVE_REQUEST = /(?:\\(?:Rightarrow|implies|Longrightarrow|iff|Leftrightarrow|Longleftrightarrow)|⇒|⇔)(?:\s|\\[,;:! ]|\\q?quad\b)*$/

export function solveRequest(tex: string): string | null {
  const m = SOLVE_REQUEST.exec(tex)
  if (!m) return null
  const body = tex.slice(0, m.index)
  return body.trim() ? body : null
}

export function calculationRequest(tex: string): string | null {
  const m = TRAILING_EQUALS.exec(tex)
  if (!m) return null
  const body = tex.slice(0, m.index)
  return body.trim() ? body : null
}

/** Lo studio di funzione e le sue parti: \operatorname{studio}, \operatorname{dominio}, \operatorname{asintoti}… */
const STUDY = new Set(['study', 'domain', 'asymptotes', 'extrema', 'flexes', 'zeros'])

/** Le funzioni dell'algebra lineare che si mostrano a modo loro. */
const SPACES = new Set(['diagonalize', 'gramschmidt', 'signature', 'independent', 'matrixof', 'equations'])

/** La statistica inferenziale: gli intervalli di confidenza e i test. */
const INFERENCE = new Set(['ci', 'civar', 'htest', 'chisq'])

/** Le funzioni della statistica dei dati che si mostrano a modo loro (le mode, i quartili, la tabella…). */
const STATISTICS = new Set([...DATA_FUNCTIONS, 'cov', 'corr', 'quartiles', 'regression', 'summary', 'frequencies'])

/** I passi di somme e integrali per ogni risultato: abbastanza per i conti veri, non per bloccare la pagina. */
const WORK = 2e6
/** I valori delle lettere per controllare un risultato con le lettere: positivi, in tre modi diversi. */
const CHECK_VALUES: ((i: number, n: number) => number)[] = [(i) => 1.3 + 0.37 * i, (i, n) => 2.2 + 0.37 * (n - 1 - i), (i) => 0.71 + 0.83 * i]

const parsed = new Map<string, MathNode | null>()

/** Legge un pezzo di formula, con una piccola memoria: mentre si scrive le formule sono sempre quelle. */
function parseCached(src: string): MathNode | null {
  const hit = parsed.get(src)
  if (hit !== undefined) return hit
  let node: MathNode | null
  try {
    node = parseMath(src)
  } catch {
    node = null
  }
  if (parsed.size > 3000) parsed.delete(parsed.keys().next().value!)
  parsed.set(src, node)
  return node
}

/**
 * Divide una formula dove ci sono più definizioni (`a = 2, \quad b = 3`): alle virgole e ai punti
 * e virgola fuori dalle parentesi (non a quelle tra due cifre, che sono decimali) e a \quad.
 */
export function splitPieces(tex: string): string[] {
  const pieces: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < tex.length; i++) {
    const c = tex[i]
    if (c === '\\') {
      const m = /^\\(q?quad\b|[{}]|langle\b|rangle\b)/.exec(tex.slice(i))
      if (m?.[1] === '{' || m?.[1] === 'langle') depth++
      else if (m?.[1] === '}' || m?.[1] === 'rangle') depth--
      else if (m && depth === 0) {
        pieces.push(tex.slice(start, i))
        start = i + m[0].length
      }
      i += m ? m[0].length - 1 : 1
      continue
    }
    if (c === '(' || c === '[' || c === '{' || c === '⟨') depth++
    else if (c === ')' || c === ']' || c === '}' || c === '⟩') depth--
    else if (depth === 0 && (c === ';' || (c === ',' && !(/\d/.test(tex[i - 1] ?? '') && /\d/.test(tex[i + 1] ?? ''))))) {
      pieces.push(tex.slice(start, i))
      start = i + 1
    }
  }
  pieces.push(tex.slice(start))
  return pieces.filter((p) => p.trim())
}

/** Le parti di una catena a = b = c, divise agli uguali fuori dalle parentesi. */
export function splitEquals(tex: string): string[] {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < tex.length; i++) {
    const c = tex[i]
    if (c === '\\') {
      i++
      continue
    }
    if (c === '(' || c === '[' || c === '{') depth++
    else if (c === ')' || c === ']' || c === '}') depth--
    else if (c === '=' && depth === 0 && !'<>!:'.includes(tex[i - 1] ?? '')) {
      parts.push(tex.slice(start, i))
      start = i + 1
    }
  }
  parts.push(tex.slice(start))
  return parts.filter((p) => p.trim())
}

/** Il nome definito a sinistra dell'uguale: una variabile (a) o una funzione (f(x, y)). */
function definitionTarget(node: MathNode): { name: string; params: string[] | null } | null {
  if (node.k === 'name') return node.name === 'π' ? null : { name: node.name, params: null }
  if (node.k === 'apply' && !node.primes && node.args.length && node.args.every((a) => a.k === 'name')) {
    const params = node.args.map((a) => (a as { name: string }).name)
    // f(\pi) = 0, f(i) = 0: il valore in un numero (da controllare), non una funzione con la variabile π.
    if (new Set(params).size !== params.length || params.some((p) => p === 'π' || p === 'e' || p === 'i')) return null
    return { name: node.name, params }
  }
  return null
}

function walk(node: MathNode, visit: (n: MathNode) => void): void {
  visit(node)
  for (const child of children(node)) walk(child, visit)
}

/** Le cifre da mostrare: come le ha scritte chi prende appunti (virgola o punto), frazioni o decimali. */
function styleOf(node: MathNode): { comma: boolean; decimal: boolean; digits: number } {
  let comma: boolean | null = null
  let decimal = false
  let digits = 12
  walk(node, (n) => {
    if (n.k === 'num' && n.text.includes('.')) {
      decimal = true
      comma ??= n.comma
    }
    // Integrali e derivate si calcolano con meno cifre sicure; i doppi e i tripli ancora meno.
    if (n.k === 'int' || (n.k === 'apply' && n.primes)) digits = Math.min(digits, 9)
    if (n.k === 'mint') digits = Math.min(digits, n.vars.length === 2 ? 8 : 7)
  })
  // Una frazione da sola (\frac{1}{3} =) si vuole in decimali.
  const bare = node.k === 'neg' ? node.a : node
  const single = bare.k === 'bin' && bare.op === '/' && bare.a.k === 'num' && bare.b.k === 'num'
  return { comma: comma ?? true, decimal: decimal || single, digits }
}

/** Come si scrive il risultato di un limite o di una serie. */
function limitText(value: LimitValue, style: ReturnType<typeof styleOf>, exact: Rational | null): FormattedResult | null {
  if (value.k === 'infinity') return value.sign > 0 ? { tex: '+\\infty', text: '+∞' } : { tex: '-\\infty', text: '−∞' }
  if (value.k === 'none') {
    const side = (v: LimitValue | undefined) => (v ? limitText(v, style, null) : null)
    const left = side(value.left)
    const right = side(value.right)
    if (left && right && value.left!.k !== 'none' && value.right!.k !== 'none') {
      return { tex: `\\nexists \\quad \\text{(da sinistra } ${left.tex}\\text{, da destra } ${right.tex}\\text{)}`, text: `non esiste (da sinistra ${left.text}, da destra ${right.text})` }
    }
    return { tex: '\\nexists', text: 'non esiste' }
  }
  if (exact) return formatRational(exact, style)
  return recognize(value.v, style) ?? formatNumber(value.v, { ...style, decimal: true, digits: 9 })
}

/** Il valore di una formula: un numero reale (anche esatto, una frazione), complesso (anche esatto) o una matrice. */
type Value = { float: number; exact: Rational | null } | { complex: Complex; exactComplex: GaussRational | null } | { linear: LinearValue }

/**
 * Il risultato di una parte di formula: come si mostra e, se è un numero, un numero complesso o una
 * matrice, il suo valore; `set` se è un insieme scritto elemento per elemento; `item` è la parte come
 * è stata calcolata; `loose` se il valore viene da un metodo con meno cifre sicure (limiti, serie, Newton).
 */
interface Found {
  shown: FormattedResult
  value: Value | null
  item: MathNode
  set?: MathNode | null
  loose?: boolean
  /** Una tabella, un elenco, una descrizione (lo studio di funzione, un test): non si confronta. */
  table?: boolean
}

/** 1,414213\ldots (come nei risultati di Glifo) o 1,414...: i puntini dopo le cifre non contano. */
function withoutDots(tex: string): string {
  return tex.replace(/(\d)(?:\\[lc]?dots\b|…|\.\.\.)/g, '$1')
}

/** Un numero scritto e basta (2, −0,5, \frac{1}{3}, ∞): il risultato, non un conto da fare. */
function isLiteral(node: MathNode): boolean {
  const n = node.k === 'neg' ? node.a : node
  return n.k === 'num' || n.k === 'infty' || (n.k === 'bin' && n.op === '/' && n.a.k === 'num' && n.b.k === 'num')
}

/**
 * Le cifre dopo la virgola di un numero scritto con la virgola (1{,}414 → 3; 2{,}5 \cdot 10^{-3} → 4),
 * per accettarlo arrotondato o troncato; null se non è un numero con la virgola.
 */
function writtenDecimals(node: MathNode): number | null {
  const n = node.k === 'neg' ? node.a : node
  const decimals = (m: MathNode) => (m.k === 'num' && m.text.includes('.') ? m.text.length - m.text.indexOf('.') - 1 : null)
  if (n.k === 'num') return decimals(n)
  // 2{,}5 \cdot 10^{-3}
  if (n.k === 'bin' && n.op === '*' && n.b.k === 'bin' && n.b.op === '^' && n.b.a.k === 'num' && n.b.a.v === 10) {
    const d = decimals(n.a)
    const e = n.b.b.k === 'num' ? n.b.b.v : n.b.b.k === 'neg' && n.b.b.a.k === 'num' ? -n.b.b.a.v : null
    return d !== null && e !== null && Number.isInteger(e) ? d - e : null
  }
  return null
}

/** Una formula con una freccia (x^2 = 4 \Rightarrow x = \pm 2): un ragionamento, non un'uguaglianza da controllare. */
const IMPLICATION = /\\(?:Rightarrow|implies|Longrightarrow|Leftarrow|impliedby|Longleftarrow|iff|Leftrightarrow|Longleftrightarrow)\b|[⇒⇐⇔]/

/**
 * Le parti di un'uguaglianza (a = b = c, anche con ≈) e i segni tra loro. Se la formula intera non
 * si legge, le parti si leggono una per una; una parte che non si legge può essere la primitiva tra
 * gli estremi (`bracket`, \left[\frac{x^3}{3}\right]_0^1), se no l'uguaglianza non si controlla.
 */
function chainOf(src: string, bracket: (part: string, variable: string | null) => MathNode | null): { items: MathNode[]; ops: ('=' | '≈')[] } | null {
  const isChain = (n: MathNode | null): n is Extract<MathNode, { k: 'rel' }> => n?.k === 'rel' && n.ops.every((op) => op === '=' || op === '≈')
  const node = parseCached(src)
  if (node) return isChain(node) ? { items: node.items, ops: node.ops as ('=' | '≈')[] } : null
  const parts = splitEquals(src)
  if (parts.length < 2) return null
  const read = parts.map(parseCached)
  // La variabile della primitiva: quella dell'integrale della catena, se c'è.
  const integral = read.find((n) => n?.k === 'int')
  const variable = integral?.k === 'int' ? integral.v : null
  const items: MathNode[] = []
  const ops: ('=' | '≈')[] = []
  for (let i = 0; i < parts.length; i++) {
    if (items.length) ops.push('=')
    const n = read[i] ?? bracket(parts[i], variable)
    if (!n) return null
    if (isChain(n)) {
      items.push(...n.items)
      ops.push(...(n.ops as ('=' | '≈')[]))
    } else items.push(n)
  }
  return { items, ops }
}

/** Un gruppo di LaTeX: tra graffe (fino a tre livelli), un comando (\pi) o un carattere. */
const GROUP = String.raw`(\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}|\\[a-zA-Z]+|[^\s{}\\^_])`
/** Gli estremi dopo la parentesi: _a^b o ^b_a, fino alla fine. */
const LIMITS = new RegExp(String.raw`^\s*(?:_\s*${GROUP}\s*\^\s*${GROUP}|\^\s*${GROUP}\s*_\s*${GROUP})\s*$`)
/** Le parentesi della primitiva tra gli estremi: \left[ … \right], \Big[ … \Big], \left. … \right|, [ … ], … \Big|. */
const BRACKETS: [RegExp | null, RegExp][] = [
  [/\\left\s*\[/, /\\right\s*\]/g],
  [/\\left\s*\./, /\\right\s*\|/g],
  [/\\[Bb]igg?l?\s*\[/, /\\[Bb]igg?r?\s*\]/g],
  [/\[/, /\]/g],
  [null, /\\(?:[Bb]igg?r?|right)\s*\|/g],
]

/**
 * \left[\frac{x^3}{3}\right]_0^1 e gli altri modi di scriverla: la primitiva, gli estremi in basso e in
 * alto e quello che la moltiplica davanti (\pi \left[…\right]_0^1); null se la parte non è così.
 */
export function bracketParts(src: string): { factor: string; body: string; from: string; to: string } | null {
  for (const [open, close] of BRACKETS) {
    const start = open ? open.exec(src) : null
    if (open && !start) continue
    let last: RegExpExecArray | null = null
    for (const m of src.matchAll(close)) last = m as RegExpExecArray
    if (!last || (start && last.index < start.index + start[0].length)) continue
    const limits = LIMITS.exec(src.slice(last.index + last[0].length))
    if (!limits) continue
    const body = src.slice(start ? start.index + start[0].length : 0, last.index)
    const strip = (g: string) => (g.startsWith('{') ? g.slice(1, -1) : g)
    const [from, to] = limits[1] !== undefined ? [limits[1], limits[2]] : [limits[4], limits[3]]
    if (body.trim()) return { factor: start ? src.slice(0, start.index) : '', body, from: strip(from), to: strip(to) }
  }
  return null
}

/** Due numeri uguali a meno degli errori dei conti con la virgola (`tol`, relativo). */
function close(a: number, b: number, tol: number): boolean {
  return Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b))
}

/**
 * Il numero scritto con `decimals` cifre dopo la virgola va bene per `value`? true se è proprio
 * quello, 'rounded' se è arrotondato o troncato lì (\sqrt{2} = 1{,}414, \pi = 3{,}1415), false se no.
 */
function digitsMatch(value: number, written: number, decimals: number, tol: number): boolean | 'rounded' {
  const err = tol * Math.max(1, Math.abs(value))
  const diff = Math.abs(value - written)
  if (diff <= err) return true
  const unit = 10 ** -decimals
  if (diff <= unit / 2 + err) return 'rounded'
  // Troncato: le cifre scritte sono le prime del valore (stesso segno, più piccolo in valore assoluto).
  const sameSign = written === 0 || Math.sign(written) === Math.sign(value)
  const below = Math.abs(value) - Math.abs(written)
  return sameSign && below >= -err && below < unit + err ? 'rounded' : false
}

/**
 * Gli elementi da confrontare uno a uno: due numeri (o formule) sono una coppia; due vettori o due
 * matrici della stessa forma, una coppia per elemento. false se le forme sono diverse, null se non si sa.
 */
function pairUp(result: MathNode, written: MathNode): [MathNode, MathNode][] | false | null {
  const shape = (n: MathNode): { cells: MathNode[]; rows: number; cols: number } | null =>
    n.k === 'tuple' ? { cells: n.items, rows: n.items.length, cols: 1 } : n.k === 'matrix' ? { cells: n.rows.flat(), rows: n.rows.length, cols: n.rows[0]?.length ?? 0 } : null
  const a = shape(result)
  const b = shape(written)
  if (!a && !b) return [[result, written]]
  // Un vettore e un nome (= v) o un numero: non si sa.
  if (!a || !b) return null
  const vector = (x: { rows: number; cols: number }) => x.rows === 1 || x.cols === 1
  const same = (a.rows === b.rows && a.cols === b.cols) || (vector(a) && vector(b) && a.cells.length === b.cells.length)
  return same ? a.cells.map((c, i) => [c, b.cells[i]]) : false
}

/** Due matrici (o due numeri) uguali con le frazioni. */
function sameExactLinear(a: LinearValue, b: LinearValue): boolean {
  const [x, y] = [a.exact, b.exact]
  if (x?.k === 'scalar' && y?.k === 'scalar') return x.v.cmp(y.v) === 0
  return x?.k === 'matrix' && y?.k === 'matrix' && x.m.length === y.m.length && x.m.every((row, i) => row.length === y.m[i].length && row.every((v, j) => v.cmp(y.m[i][j]) === 0))
}

/**
 * Gli elementi di due matrici (o vettori, o numeri) da confrontare uno a uno; false se hanno forme
 * diverse, null se non si sa (un sottospazio, l'identità, un vettore riga e uno colonna).
 */
function linearCells(a: LinearValue, b: LinearValue): [number[], number[]] | false | null {
  const [x, y] = [a.float, b.float]
  if (x.k === 'scalar' && y.k === 'scalar') return [[x.v], [y.v]]
  if (x.k !== 'matrix' || y.k !== 'matrix') return null
  if (x.m.length === y.m.length && (x.m[0]?.length ?? 0) === (y.m[0]?.length ?? 0)) return [x.m.flat(), y.m.flat()]
  const vector = (m: Mat<number>) => m.length === 1 || m[0]?.length === 1
  return vector(x.m) && vector(y.m) && x.m.flat().length === y.m.flat().length ? null : false
}

/** Un'impronta corta di un testo (cyrb53): per riconoscere lo stesso stato del foglio. */
function fingerprint(text: string): string {
  let h1 = 0xdeadbeef
  let h2 = 0x41c6ce57
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i)
    h1 = Math.imul(h1 ^ c, 2654435761)
    h2 = Math.imul(h2 ^ c, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36)
}

/**
 * I controlli già fatti, per non rifarli a ogni tasto (l'editor rilegge la nota a ogni modifica, e un
 * integrale triplo può chiedere un decimo di secondo): dipendono dalla formula e da quello che la
 * nota ha definito prima (`Sheet.state`).
 */
const checks = new Map<string, EqualityCheck | null>()

export class Sheet {
  /** L'impronta di quello che la nota ha definito fin qui: cambia a ogni definizione. */
  private state = ''
  private consts = new Map<string, number>()
  private exactConsts = new Map<string, Rational | null>()
  private fns = new Map<string, UserFunction>()
  private exactFns = new Map<string, ExactFunction | null>()
  /** Gli insiemi definiti ($D = \{(x, y) : x^2 + y^2 \le 1\}$), per gli integrali doppi e tripli. */
  private sets = new Map<string, MathNode>()
  /** I numeri complessi definiti ($z = 1 + 2i$): quelli con la parte immaginaria (gli altri sono in `consts`). */
  private complexConsts = new Map<string, Complex>()
  private exactComplexConsts = new Map<string, GaussRational | null>()
  /** Le funzioni, per calcolarle anche con i numeri complessi (f(z) = z^2 + i). */
  private complexFns = new Map<string, ComplexFunction>()
  private exactComplexFns = new Map<string, { params: string[]; body: MathNode; scope: ExactComplexScope }>()
  /** Le matrici e i vettori definiti ($A = \begin{pmatrix} … \end{pmatrix}$, $v = (1, 2, 3)$). */
  private linearValues = new Map<string, LinearValue>()
  /** Le funzioni come sono scritte (anche quelle con i valori vettori), per i conti con le lettere. */
  private bodies = new Map<string, { params: string[]; body: MathNode }>()
  /** Le curve, le superfici e i campi ($\gamma(t) = (\cos t, \sin t)$, $F(x, y) = (-y, x)$). */
  private vfns = new Map<string, VectorFunction>()
  /** Le variabili aleatorie ($X \sim B(10, 0{,}3)$). */
  private randomVars = new Map<string, Distribution>()
  /** Le matrici e i vettori con una lettera che la nota non definisce ($A = \begin{pmatrix} 1 & k \\ … \end{pmatrix}$): si scrivono al loro posto. */
  private symbolicNodes = new Map<string, MathNode>()
  private randomCache: ReturnType<typeof randomScope> | null = null
  /** L'ultima funzione definita: una condizione subito dopo ($t \in [0, 2\pi]$) dice dove variano i suoi parametri. */
  private lastFunction: Definition | null = null
  /**
   * L'ultima equazione differenziale (y' = x - y, y'' = -y): le condizioni iniziali subito dopo
   * (y(0) = 1, y'(0) = 0) la risolvono; finché non ci sono tutte, quelle date.
   */
  private lastOde: { ode: Ode; definition: Definition; x0: number | null; Y0: (number | undefined)[] } | null = null
  private symbols: SymbolScope | null = null
  readonly definitions: Definition[] = []

  /**
   * `fixed`: i numeri con un valore diverso da quello scritto (gli slider dei grafici). Valgono in
   * tutto il foglio: quello che li usa (b = 2a, f(x) = a x^2) segue.
   */
  constructor(private readonly fixed?: ReadonlyMap<string, number>) {
    if (fixed?.size) this.touch(JSON.stringify([...fixed]))
  }

  /** Una definizione nuova (o cambiata): l'impronta dello stato cambia. */
  private touch(text: string): void {
    this.state = fingerprint(`${this.state}\u0000${text}`)
  }

  /** Lo stato di adesso, per calcolare un'espressione con le definizioni fatte fin qui. */
  scope(): Scope {
    return { vars: EMPTY_SCOPE.vars, consts: new Map(this.consts), fns: new Map(this.fns), sets: new Map(this.sets), vfns: new Map(this.vfns), random: this.random() }
  }

  /** Le variabili aleatorie definite fin qui, per i conti; undefined se non ce ne sono. */
  private random(): ReturnType<typeof randomScope> | undefined {
    if (!this.randomVars.size) return undefined
    return (this.randomCache ??= randomScope(new Map(this.randomVars)))
  }

  /** Le variabili aleatorie definite fin qui, con la loro distribuzione (per i grafici). */
  randomVariables(): Map<string, Distribution> {
    return new Map(this.randomVars)
  }

  /** Lo stato di adesso per i conti con le lettere (le derivate, il gradiente…); si rifà a ogni definizione. */
  symbolScope(): SymbolScope {
    if (this.symbols) return this.symbols
    const consts = new Map<string, Rational | null>()
    for (const name of this.consts.keys()) consts.set(name, this.exactConsts.get(name) ?? null)
    this.symbols = { consts, fns: new Map(this.bodies) }
    return this.symbols
  }

  private exactScope(): ExactScope {
    return { consts: new Map(this.exactConsts), fns: new Map(this.exactFns), random: this.random() }
  }

  /** Lo stato di adesso per i conti con i numeri complessi: i numeri reali e quelli complessi. */
  complexScope(): ComplexScope {
    const consts = new Map<string, Complex>()
    for (const [name, value] of this.consts) consts.set(name, { re: value, im: 0 })
    for (const [name, value] of this.complexConsts) consts.set(name, value)
    return { vars: EMPTY_SCOPE.vars, consts, fns: new Map(this.complexFns) }
  }

  private exactComplexScope(): ExactComplexScope {
    const consts = new Map<string, GaussRational | null>()
    for (const [name, value] of this.exactConsts) consts.set(name, value && GaussRational.real(value))
    for (const name of this.consts.keys()) if (!consts.has(name)) consts.set(name, null)
    for (const [name, value] of this.exactComplexConsts) consts.set(name, value)
    return { consts, fns: new Map(this.exactComplexFns) }
  }

  /** I numeri complessi definiti fin qui (per i grafici nel piano di Gauss). */
  complexValues(): ReadonlyMap<string, Complex> {
    return new Map(this.complexConsts)
  }

  /** Lo stato di adesso per i conti con vettori e matrici. */
  linearScope(): LinearScope {
    return { real: this.scope(), exactReals: new Map(this.exactConsts), values: new Map(this.linearValues) }
  }

  /**
   * Legge una formula della nota: ricorda le definizioni che contiene e, se finisce con «=»,
   * restituisce il risultato (null se non si sa calcolare).
   */
  add(tex: string): FormattedResult | null {
    return this.read(tex).result
  }

  /**
   * Come `add`, e in più il controllo delle uguaglianze scritte per intero: in
   * `\int_0^1 x^2 \, dx = \frac{1}{3}` Glifo calcola l'integrale e dice se il risultato scritto è
   * giusto (✓) o sbagliato (✗, con quello giusto). Una definizione ($a = 2$) non si controlla.
   */
  read(tex: string): SheetLine {
    // x^2 - 5x + 6 = 0 \Rightarrow: le soluzioni.
    const equations = solveRequest(tex)
    if (equations !== null) return { result: this.solveAll(equations), check: null }
    if (!tex.includes('=') && !tex.includes('≈') && !tex.includes('\\approx') && !tex.includes('\\coloneq') && !/\\sim\b|∼/.test(tex)) return { result: null, check: null }
    let check: EqualityCheck | null = null
    try {
      const request = calculationRequest(tex)
      const pieces = splitPieces(request ?? tex)
      const last = request === null ? null : pieces.pop() ?? null
      for (const piece of pieces) {
        const found = this.defineOrCheck(piece)
        // Con più uguaglianze (f(1) = 2, \quad f(2) = 5) conta la prima sbagliata.
        if (found && (!check || (check.ok && (!found.ok || found.rounded)))) check = found
      }
      return { result: last === null ? null : this.calculate(last), check }
    } catch {
      // Una formula che non si riesce a calcolare (troppo grande, troppo annidata) non ha risultato.
      return { result: null, check }
    }
  }

  /** Le soluzioni di un'equazione, di una disequazione o di un sistema (anche con le virgole o in \begin{cases}). */
  private solveAll(src: string): FormattedResult | null {
    const nodes = splitPieces(src).map(parseCached)
    if (!nodes.length || nodes.some((n) => !n)) return null
    const style = styleOf(nodes[0]!)
    // \nabla f = 0: i punti critici di f, con la loro natura.
    const only = nodes.length === 1 ? nodes[0]! : null
    if (only?.k === 'rel' && only.ops.length === 1 && only.ops[0] === '=' && only.items[0].k === 'fn' && only.items[0].name === 'grad' && only.items[1].k === 'num' && only.items[1].v === 0) {
      try {
        const s = severalOf(only.items[0].args[0], this.symbolScope())
        return s && withWorkLimit(WORK, () => criticalShown(s, style))
      } catch {
        return null
      }
    }
    // Le congruenze (3x \equiv 2 \pmod{5}), anche più insieme o in \begin{cases}: con il teorema cinese del resto.
    const congruences = only?.k === 'cases' && only.rows.every((r) => !r.cond) ? only.rows.map((r) => r.value) : (nodes as MathNode[])
    if (congruences.every((n) => n.k === 'congr')) {
      try {
        return withWorkLimit(WORK, () => solveCongruences(congruences, this.symbolScope()))
      } catch {
        return null
      }
    }
    // Un'equazione differenziale (y'' + y = 0), anche con le condizioni o un sistema: con la formula.
    const ode = differentialRequest(nodes as MathNode[], (name) => this.fns.has(name) || this.vfns.has(name) || this.consts.has(name))
    if (ode) {
      try {
        return withWorkLimit(WORK, () => solveDifferential(ode, this.symbolScope(), style.decimal))
      } catch {
        return null
      }
    }
    try {
      return withWorkLimit(WORK, () =>
        solve(
          nodes.map((n) => this.prepare(this.inline(n!))),
          {
            real: this.scope(),
            linear: this.linearScope(),
            symbols: this.symbolScope(),
            defined: (name) =>
              this.consts.has(name) || this.complexConsts.has(name) || this.linearValues.has(name) || this.fns.has(name) || this.vfns.has(name) || this.randomVars.has(name),
          },
          style,
        ),
      )
    } catch {
      return null
    }
  }

  /**
   * Ricorda una definizione (a = 2, f(x) = x^2) o, subito dopo una curva o una superficie, dove
   * variano i suoi parametri (t \in [0, 2\pi]); altro non conta.
   */
  define(src: string): void {
    const pieces = splitPieces(src)
    if (pieces.length > 1) {
      for (const piece of pieces) this.define(piece)
      return
    }
    const node = parseCached(src) ?? parseCached(withoutDots(src))
    if (node) this.defineNode(node, src)
  }

  /** Ricorda la definizione (o la condizione su una curva, un'equazione differenziale) scritta in `node`: false se non lo è. */
  private defineNode(node: MathNode, src: string): boolean {
    const defined = this.defineHere(node, src)
    if (defined) this.touch(src)
    return defined
  }

  private defineHere(node: MathNode, src: string): boolean {
    if (this.lastFunction && this.attachDomain(node, src)) return true
    if (this.lastOde && this.attachInitial(node, src)) return true
    // y' = x - y, y'' + y = 0: un'equazione differenziale; con le condizioni iniziali y diventa una funzione.
    const ode = odeOf(node, (name) => this.fns.has(name) || this.vfns.has(name))
    if (ode) {
      const own = [ode.x, ...Array.from({ length: ode.order + 1 }, (_, k) => primed(ode.y, k))]
      const definition: Definition = { name: ode.y, params: [ode.x], source: src.trim(), value: ode.f, uses: namesIn(ode.f, new Set(), new Set(own)) }
      this.definitions.push(definition)
      this.lastOde = { ode, definition, x0: null, Y0: Array(ode.order).fill(undefined) }
      this.lastFunction = null
      return true
    }
    // X \sim B(10, 0{,}3): una variabile aleatoria.
    if (node.k === 'dist') {
      this.defineRandom(node, src)
      return true
    }
    // a = 2, f(x) = x^2; anche in una catena: in a = 3 + 4 = 7 (il risultato scritto con Tab) a è 3 + 4.
    if (node.k !== 'rel' || node.ops[0] !== '=' || !node.ops.every((op) => op === '=' || op === '≈')) return false
    const target = definitionTarget(node.items[0])
    if (!target) return false
    this.record(target, node.items[1], src)
    return true
  }

  /**
   * Una parte di una formula senza «=» in fondo: una definizione, o un'uguaglianza con il risultato
   * scritto da controllare (✓/✗). In una catena con un nome davanti (V = \int … = \frac{4}{3}\pi R^3)
   * il nome si definisce e il resto si controlla.
   */
  private defineOrCheck(piece: string): EqualityCheck | null {
    const src = withoutDots(piece)
    const node = parseCached(src)
    const defined = !!node && this.defineNode(node, src)
    if (defined && !(node.k === 'rel' && node.items.length > 2)) return null
    if (!defined && IMPLICATION.test(src)) return null
    const key = `${this.state}\u0001${src}`
    const known = checks.get(key)
    if (known !== undefined) return known
    let check: EqualityCheck | null
    try {
      check = this.checkPiece(src, node, defined)
    } catch {
      check = null
    }
    if (checks.size > 3000) checks.delete(checks.keys().next().value!)
    checks.set(key, check)
    return check
  }

  /** Il controllo di una parte (vedi defineOrCheck): `defined` se è una catena con un nome davanti, già definito. */
  private checkPiece(src: string, node: MathNode | null, defined: boolean): EqualityCheck | null {
    if (defined && node?.k === 'rel') return this.checkChain(node.items.slice(1), (node.ops as ('=' | '≈')[]).slice(1))
    const chain = chainOf(src, (part, variable) => this.bracketValue(part, variable))
    if (!chain) return null
    // V = \left[…\right]_0^1 = …: il nome davanti non è un conto (la definizione non si legge per intero).
    if (definitionTarget(chain.items[0]) && chain.ops[0] === '=') return this.checkChain(chain.items.slice(1), chain.ops.slice(1))
    return this.checkChain(chain.items, chain.ops)
  }

  /**
   * \left[\frac{x^3}{3}\right]_0^1: la primitiva calcolata negli estremi, F(1) − F(0), come formula. La
   * variabile è l'unica lettera di F, o quella dell'integrale della catena (`variable`), o x.
   */
  private bracketValue(part: string, variable: string | null): MathNode | null {
    const parts = bracketParts(part)
    if (!parts) return null
    const F = parseCached(parts.body)
    const a = parseCached(parts.from)
    const b = parseCached(parts.to)
    const factor = parts.factor.trim() ? parseCached(parts.factor) : null
    if (!F || !a || !b || (parts.factor.trim() && !factor)) return null
    const letters = this.freeNames(F)
    const v = letters.length === 1 ? letters[0] : variable && letters.includes(variable) ? variable : letters.includes('x') ? 'x' : null
    if (!v) return null
    const at = (to: MathNode): MathNode => {
      const visit = (n: MathNode): MathNode => (n.k === 'name' && n.name === v ? to : mapNode(n, visit))
      return visit(F)
    }
    const difference: MathNode = { k: 'bin', op: '-', a: at(b), b: at(a) }
    return factor ? { k: 'bin', op: '*', a: factor, b: difference } : difference
  }

  /**
   * Il controllo di una catena a = b = c: la domanda è la prima parte che Glifo sa calcolare e che non
   * è un numero scritto e basta (\int_0^1 x^2 \, dx); le altre devono valere quanto lei. Null se non
   * c'è niente da confrontare (x^2 - 5x + 6 = 0 è un'equazione, non un conto).
   */
  private checkChain(items: (MathNode | null)[], ops: ('=' | '≈')[]): EqualityCheck | null {
    if (items.length < 2) return null
    // 1 = 2 in una dimostrazione per assurdo: non c'è un conto da controllare.
    const integer = (n: MathNode | null) => {
      const m = n?.k === 'neg' ? n.a : n
      return !m || (m.k === 'num' && !m.text.includes('.'))
    }
    if (items.every(integer)) return null
    const order = [...items.keys()].filter((i) => items[i]).sort((a, b) => Number(isLiteral(items[a]!)) - Number(isLiteral(items[b]!)) || a - b)
    let q = -1
    let found: Found | null = null
    for (const i of order) {
      try {
        found = this.resultOf(items[i]!)
      } catch {
        found = null
      }
      if (found) {
        q = i
        break
      }
    }
    if (!found) return null
    let compared = false
    let rounded = false
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (i === q || !item) continue
      // Con ≈ si controllano solo le cifre scritte (\pi \approx 3{,}14), non un'altra approssimazione (22/7).
      const approx = (i > q ? ops[i - 1] : ops[i]) === '≈'
      let same: boolean | 'rounded' | null
      try {
        same = this.sameAs(found, items[q]!, item, approx)
      } catch {
        same = null
      }
      if (same === null) continue
      if (!same) return { ok: false, value: found.shown }
      compared = true
      if (same === 'rounded') rounded = true
    }
    return compared ? { ok: true, ...(rounded && { rounded: true }) } : null
  }

  /**
   * La parte scritta vale quanto la domanda (`question`, calcolata in `found`)? true, 'rounded' (con
   * le cifre scritte), false, o null se non si sa confrontare. Con le lettere (il volume della sfera,
   * 4πR³/3) si confrontano i valori per tre scelte di numeri positivi, come in `checked`.
   */
  private sameAs(found: Found, question: MathNode, written: MathNode, approx: boolean): boolean | 'rounded' | null {
    if (written.k === 'rel' || written.k === 'and' || written.k === 'or' || written.k === 'cases' || (written.k === 'set' && !found.set)) return null
    const tol = found.loose ? 1e-7 : 1e-9
    // +∞ e −∞ (un limite, un integrale improprio che diverge).
    const infinite = found.shown.tex === '+\\infty' ? 1 : found.shown.tex === '-\\infty' ? -1 : 0
    if (infinite) {
      const sign = written.k === 'infty' ? 1 : written.k === 'neg' && written.a.k === 'infty' ? -1 : 0
      return approx ? null : sign === infinite
    }
    const value = found.value
    if (value) {
      // Il valore giusto e quello scritto, numero per numero: un numero, le due parti di un numero
      // complesso, gli elementi di una matrice.
      let target: number[]
      let read: (n: MathNode) => number[] | null
      if ('float' in value) {
        const w = this.evaluate(written) ?? this.realOf(written)
        if (!w) return null
        if (value.exact && w.exact && value.exact.cmp(w.exact) === 0) return true
        const decimals = writtenDecimals(written)
        if (decimals !== null) return digitsMatch(value.float, w.float, decimals, tol)
        target = [value.float]
        read = (n) => {
          const r = this.evaluate(n) ?? this.realOf(n)
          return r && [r.float]
        }
      } else if ('complex' in value) {
        const w = this.evaluateComplex(written)
        if (!w) return null
        const [a, b] = [value.exactComplex, w.exactComplex]
        if (a && b && a.re.cmp(b.re) === 0 && a.im.cmp(b.im) === 0) return true
        target = [value.complex.re, value.complex.im]
        read = (n) => {
          const r = this.evaluateComplex(n)
          return r && [r.complex.re, r.complex.im]
        }
      } else {
        const w = this.evaluateLinear(written)
        if (!w) return null
        if (sameExactLinear(value.linear, w)) return true
        const cells = linearCells(value.linear, w)
        if (!cells) return cells
        target = cells[0]
        read = (n) => {
          const r = this.evaluateLinear(n)
          const c = r && linearCells(value.linear, r)
          return c ? c[1] : null
        }
      }
      const got = read(written)
      if (!got || got.length !== target.length) return null
      const slack = this.writtenSlack(written, read, got)
      // Con ≈ si controllano solo le cifre scritte.
      if (approx && !slack) return null
      let rounded = false
      for (let i = 0; i < target.length; i++) {
        const diff = target[i] - got[i]
        if (Math.abs(diff) <= tol * Math.max(1, Math.abs(target[i]), Math.abs(got[i]))) continue
        if (!slack || diff < slack[i][0] || diff > slack[i][1]) return false
        rounded = true
      }
      return rounded ? 'rounded' : true
    }
    // Senza un valore: un insieme, una primitiva o un risultato con le lettere (4πR³/3, 2x, 1/s²).
    if (approx || found.table) return null
    if (found.set) {
      const w = finiteValue(written, this.finiteContext())
      return w && 'set' in w ? w.shown.text === found.shown.text : null
    }
    if (question.k === 'prim') return this.samePrimitive(question, written)
    return this.sameFormula(found.shown, written, tol)
  }

  /** Il valore reale di una parte che `evaluate` non sa fare (un limite, una probabilità), con il resto di Glifo. */
  private realOf(node: MathNode): { float: number; exact: Rational | null } | null {
    if (isLiteral(node)) return null
    const found = this.resultOf(node)
    if (found?.value && 'float' in found.value) return found.value
    if (found?.value && 'complex' in found.value && Math.abs(found.value.complex.im) <= 1e-12 * Math.max(1, Math.abs(found.value.complex.re))) {
      return { float: found.value.complex.re, exact: found.value.exactComplex?.isReal ? found.value.exactComplex.re : null }
    }
    return null
  }

  /**
   * Quanto può differire il valore vero da quello della parte scritta per le ultime cifre dei suoi numeri
   * con la virgola (arrotondati o troncati, come 1{,}414213\ldots): per ogni numero, le cifre che mancano
   * valgono tra −½ e 1 unità dell'ultima scritta, e si vede di quanto cambia il valore (in
   * \sqrt{10}\,e^{-i\,0{,}321750554} un errore nell'angolo pesa √10 volte). Per ogni numero del valore,
   * la differenza ammessa [da, a]; null se non ci sono numeri con la virgola.
   */
  private writtenSlack(written: MathNode, read: (n: MathNode) => number[] | null, got: number[]): [number, number][] | null {
    const literals: Extract<MathNode, { k: 'num' }>[] = []
    walk(written, (n) => {
      if (n.k === 'num' && n.text.includes('.')) literals.push(n)
    })
    if (!literals.length || literals.length > 12) return null
    const range = got.map((): [number, number] => [0, 0])
    for (const lit of literals) {
      const unit = 10 ** -(lit.text.length - lit.text.indexOf('.') - 1)
      const visit = (n: MathNode): MathNode => (n === lit ? { ...lit, v: lit.v + unit, text: String(lit.v + unit) } : mapNode(n, visit))
      const moved = read(visit(written))
      if (!moved || moved.length !== got.length) return null
      moved.forEach((m, i) => {
        // Quanto cambia il valore per un'unità in più nell'ultima cifra; con un po' di margine (non è una retta).
        const step = m - got[i]
        const margin = 0.02 * Math.abs(step)
        range[i][0] += Math.min(-0.5 * step, step) - margin
        range[i][1] += Math.max(-0.5 * step, step) + margin
      })
    }
    return range
  }

  /** La formula compilata con le `letters` come variabili (con le derivate già fatte), o null. */
  private compileWith(node: MathNode, letters: string[]): ((vars: Record<string, number>) => number) | null {
    const scope = scopeWith(this.scope(), letters)
    try {
      return compile(this.prepare(node), scope, { calc: true })
    } catch {
      try {
        return compile(toNode(exOf(node, this.symbolScope())), scope, { calc: true })
      } catch {
        return null
      }
    }
  }

  /**
   * Se la parte usa una funzione che la nota non definisce (f(x)) e che non è una delle `letters` (x(x + 1)
   * è un prodotto); nemmeno π, e o un numero della nota davanti a una parentesi: \pi \left(\frac{2R^3}{3}\right)
   * è un prodotto.
   */
  private callsUnknown(node: MathNode, letters: readonly string[]): boolean {
    let unknown = false
    walk(node, (n) => {
      if (n.k !== 'apply' || this.fns.has(n.name) || this.vfns.has(n.name) || this.bodies.has(n.name) || letters.includes(n.name)) return
      if (n.name === 'π' || n.name === 'e' || this.consts.has(n.name)) return
      unknown = true
    })
    return unknown
  }

  /** Una primitiva scritta (\int x^2 \, dx = \frac{x^3}{3} + c) è giusta se la sua derivata, fatta con i numeri, è la funzione. */
  private samePrimitive(question: Extract<MathNode, { k: 'prim' }>, written: MathNode): boolean | null {
    const v = question.v
    const own = [...new Set([v, ...this.freeNames(question.body)])]
    if (this.callsUnknown(written, own)) return null
    const letters = [...new Set([...own, ...this.freeNames(written)])]
    const f = this.compileWith(question.body, letters)
    const F = this.compileWith(written, letters)
    if (!f || !F) return null
    const derivative = (vars: Record<string, number>) => {
      const x = vars[v]
      const h = 1e-4 * Math.max(1, Math.abs(x))
      return (F({ ...vars, [v]: x + h }) - F({ ...vars, [v]: x - h })) / (2 * h)
    }
    return this.samplesAgree(letters, f, derivative, 1e-5)
  }

  /**
   * Il risultato di Glifo, scritto come formula (`shown`: 4πR³/3, 2x, (2x, 2y), φ(12) = 4), e la parte
   * scritta valgono lo stesso? Con le lettere, per tre scelte di numeri positivi al posto delle lettere;
   * i vettori e le matrici elemento per elemento. Null se il risultato non è una formula (una tabella).
   */
  private sameFormula(shown: FormattedResult, written: MathNode, tol: number): boolean | null {
    if (/\\(?:text|quad|qquad|nexists|;)/.test(shown.tex)) return null
    const result = parseCached(shown.tex)
    if (!result || result.k === 'rel' || result.k === 'and' || result.k === 'or' || result.k === 'set' || result.k === 'cases') return null
    const pairs = pairUp(result, written)
    if (!pairs) return pairs
    let all = true
    for (const [r, w] of pairs) {
      const same = this.sameScalar(r, w, tol)
      if (same === false) return false
      if (same === null) all = false
    }
    return all ? true : null
  }

  /** Un elemento del risultato di Glifo (`result`) e quello scritto: uguali, diversi o null se non si sa. */
  private sameScalar(result: MathNode, written: MathNode, tol: number): boolean | null {
    const own = this.freeNames(result)
    if (this.callsUnknown(written, own)) return null
    const letters = [...new Set([...own, ...this.freeNames(written)])]
    if (!letters.length) {
      const a = this.evaluate(result)
      const b = this.evaluate(written)
      if (!a || !b) return null
      if (a.exact && b.exact) return a.exact.cmp(b.exact) === 0
      const decimals = writtenDecimals(written)
      return decimals === null ? close(a.float, b.float, tol) : !!digitsMatch(a.float, b.float, decimals, tol)
    }
    const a = this.compileWith(result, letters)
    const b = this.compileWith(written, letters)
    return a && b ? this.samplesAgree(letters, a, b, 1e-7) : null
  }

  /** Le due funzioni delle lettere valgono lo stesso nelle tre scelte di `CHECK_VALUES`? Null se non si calcolano mai. */
  private samplesAgree(letters: string[], a: (vars: Record<string, number>) => number, b: (vars: Record<string, number>) => number, tol: number): boolean | null {
    let compared = false
    for (const sample of CHECK_VALUES) {
      const vars: Record<string, number> = {}
      letters.forEach((name, i) => (vars[name] = sample(i, letters.length)))
      let x = NaN
      let y = NaN
      try {
        x = withWorkLimit(WORK, () => a(vars))
        y = withWorkLimit(WORK, () => b(vars))
      } catch {
        // Non si calcola in questo punto: si prova il prossimo.
      }
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue
      if (!close(x, y, tol)) return false
      compared = true
    }
    return compared ? true : null
  }

  /** y(0) = 1 dopo y' = …: la soluzione, con Runge–Kutta, come funzione (y(2) = …). */
  private attachInitial(node: MathNode, src: string): boolean {
    const last = this.lastOde!
    const { ode } = last
    const at = node.k === 'rel' && node.ops.length === 1 && node.ops[0] === '=' ? node.items[0] : null
    if (!at || at.k !== 'apply' || at.name !== ode.y || at.args.length !== 1 || at.primes >= ode.order || last.Y0[at.primes] !== undefined) return false
    const x0 = this.evaluate(at.args[0])
    const y0 = this.evaluate((node as Extract<MathNode, { k: 'rel' }>).items[1])
    if (!x0 || !y0 || !Number.isFinite(x0.float) || !Number.isFinite(y0.float) || (last.x0 !== null && last.x0 !== x0.float)) return false
    let F: OdeFunction
    try {
      F = compileOde(ode, this.scope())
    } catch {
      return false
    }
    last.x0 = x0.float
    last.Y0[at.primes] = y0.float
    last.definition.source = `${last.definition.source}, \\; ${src.trim().replace(/^(\\[,;:! ]|\\q?quad\b|\s)+/, '')}`
    // y'' = -y con solo y(0) = 0: aspetta y'(0).
    if (last.Y0.some((v) => v === undefined)) return true
    const start = last.x0
    const Y0 = last.Y0 as number[]
    this.consts.delete(ode.y)
    // Passi di un millesimo: le cifre che si mostrano sono giuste.
    const solution = odeSolution(F, start, Y0, 1e-3)
    this.fns.set(ode.y, { params: [ode.x], call: ([x]) => solution(x) })
    this.lastOde = null
    this.symbols = null
    return true
  }

  /** t \in [0, 2\pi], 0 \le t \le 1: l'intervallo di un parametro dell'ultima curva o superficie. */
  private attachDomain(node: MathNode, src: string): boolean {
    const last = this.lastFunction!
    const f = this.vfns.get(last.name)
    if (!f || !last.params) return false
    let found = false
    const visit = (n: MathNode): void => {
      if (n.k === 'and') return n.items.forEach(visit)
      let bound: { v: string; lo: MathNode; hi: MathNode } | null = null
      if (n.k === 'in' && n.a.k === 'name') bound = { v: n.a.name, lo: n.lo, hi: n.hi }
      else if (n.k === 'rel' && n.items.length === 3 && n.items[1].k === 'name' && n.ops.every((op) => op === '<' || op === '<=')) {
        bound = { v: n.items[1].name, lo: n.items[0], hi: n.items[2] }
      }
      const i = bound ? f.params.indexOf(bound.v) : -1
      if (!bound || i < 0) return
      const lo = this.evaluate(bound.lo)
      const hi = this.evaluate(bound.hi)
      if (!lo || !hi || !('float' in lo) || !('float' in hi) || !(hi.float > lo.float)) return
      f.domain[i] = [lo.float, hi.float]
      found = true
    }
    visit(node)
    // Il grafico rifà le definizioni dal loro testo: anche l'intervallo.
    if (found) last.source = `${last.source}, \\; ${src.trim().replace(/^(\\[,;:! ]|\\q?quad\b|\s)+/, '')}`
    return found
  }

  /** X \sim B(10, 0{,}3): la variabile aleatoria, con i parametri calcolati (esatti, se lo sono). */
  private defineRandom(node: Extract<MathNode, { k: 'dist' }>, src: string): void {
    this.forget(node.v)
    this.definitions.push({ name: node.v, params: null, source: src.trim(), value: node, uses: namesIn(node) })
    this.lastFunction = null
    try {
      const d = distributionOf(node, (n) => {
        const r = this.evaluate(this.prepare(n))
        if (!r || !Number.isFinite(r.float)) throw new MathError('Un parametro della distribuzione non è un numero')
        return { v: r.float, exact: r.exact }
      })
      this.randomVars.set(node.v, d)
    } catch {
      // Parametri sbagliati (p = 1,5): la variabile resta non definita.
    }
    this.randomCache = null
  }

  /** Dimentica quello che il nome voleva dire prima (una nuova definizione lo cambia). */
  private forget(name: string): void {
    this.symbols = null
    this.symbolicNodes.delete(name)
    this.randomVars.delete(name)
    this.randomCache = null
    this.bodies.delete(name)
    this.vfns.delete(name)
    this.consts.delete(name)
    this.exactConsts.delete(name)
    this.fns.delete(name)
    this.exactFns.delete(name)
    this.sets.delete(name)
    this.complexConsts.delete(name)
    this.exactComplexConsts.delete(name)
    this.complexFns.delete(name)
    this.exactComplexFns.delete(name)
    this.linearValues.delete(name)
  }

  private record(target: { name: string; params: string[] | null }, value: MathNode, source: string, known?: Value): void {
    this.touch(source)
    const { name, params } = target
    const uses = namesIn(value, new Set(), new Set(params ?? []))
    const definition = { name, params, source: source.trim(), value, uses }
    // C = A \cup B: l'insieme che viene, scritto elemento per elemento.
    const finite = !params && value.k !== 'set' ? finiteSetOf(value, this.finiteContext()) : null
    this.definitions.push(definition)
    this.lastFunction = params ? definition : null
    this.forget(name)
    if (!params && (value.k === 'set' || finite)) {
      this.sets.set(name, finite ?? value)
      return
    }
    try {
      this.store(name, params, value, known)
    } finally {
      // Quello che la definizione ha cambiato vale anche per i conti con le lettere.
      this.symbols = null
    }
  }

  private store(name: string, params: string[] | null, value: MathNode, known?: Value): void {
    if (params) {
      // Con le derivate e il gradiente già fatti con le lettere: g(x) = f'(x), F(x, y) = \nabla f.
      const body = this.prepare(value, params)
      this.bodies.set(name, { params, body })
      if (isVectorBody(body)) {
        this.vfns.set(name, this.vectorFunction(params, body))
        return
      }
      value = body
      this.complexFns.set(name, { params, body: value, scope: this.complexScope() })
      this.exactComplexFns.set(name, { params, body: value, scope: this.exactComplexScope() })
      try {
        const body = compile(value, scopeWith(this.scope(), params), { calc: true })
        this.fns.set(name, {
          params,
          call: params.length === 1 ? (args) => body({ [params[0]]: args[0] }) : (args) => body(Object.fromEntries(params.map((p, i) => [p, args[i]]))),
        })
        this.exactFns.set(name, { params, body: value, scope: this.exactScope() })
      } catch {
        // Usa nomi che non ci sono: la funzione resta non definita.
      }
      return
    }
    const forced = this.fixed?.get(name)
    if (!known) value = this.prepare(value)
    let result: Value | null = forced !== undefined ? { float: forced, exact: null } : known ?? this.evaluate(value)
    // Senza un valore reale (z = 1 + 2i): un numero complesso; o una matrice, un vettore.
    if (!result || ('float' in result && !Number.isFinite(result.float))) result = this.evaluateComplex(value)
    if (!result) {
      const linear = this.evaluateLinear(value)
      if (linear?.float.k === 'scalar') {
        if (Number.isFinite(linear.float.v)) result = { float: linear.float.v, exact: linear.exact?.k === 'scalar' ? linear.exact.v : null }
      } else if (linear) result = { linear }
    }
    if (!result) {
      // Una matrice o un vettore con un parametro (k): si tiene com'è scritto, per i conti al variare di k.
      if (value.k === 'matrix' || value.k === 'tuple') this.symbolicNodes.set(name, value)
      return
    }
    if ('linear' in result) {
      // Matrici, vettori e figure (rette, circonferenze…): per le formule dopo.
      if (result.linear.float.k !== 'scalar' && result.linear.float.k !== 'identity') this.linearValues.set(name, result.linear)
    } else if ('float' in result) {
      this.consts.set(name, result.float)
      this.exactConsts.set(name, result.exact)
    } else if (result.complex.im === 0) {
      this.consts.set(name, result.complex.re)
      this.exactConsts.set(name, result.exactComplex?.isReal ? result.exactComplex.re : null)
    } else {
      this.complexConsts.set(name, result.complex)
      this.exactComplexConsts.set(name, result.exactComplex)
    }
  }

  /**
   * La formula con le derivate e gli operatori dei campi già fatti con le lettere, dove si può
   * (`params`: le variabili di una funzione, che restano lettere).
   */
  private prepare(node: MathNode, params: string[] = [], decimal = styleOf(node).decimal || this.usesDecimals(node)): MathNode {
    const scope = { ...this.symbolScope() }
    if (!needsSymbols(node, scope)) return node
    if (params.length) scope.consts = new Map([...scope.consts].filter(([n]) => !params.includes(n)))
    try {
      return withWorkLimit(WORK, () => expandCalculus(node, scope, decimal))
    } catch {
      return node
    }
  }

  /** Le funzioni che la formula usa sono scritte con i decimali (f(x) = 0{,}3 x^2)? Allora anche il risultato. */
  private usesDecimals(node: MathNode, seen = new Set<string>()): boolean {
    for (const name of namesIn(node)) {
      const body = this.bodies.get(name)
      if (!body || seen.has(name)) continue
      seen.add(name)
      if (styleOf(body.body).decimal || this.usesDecimals(body.body, seen)) return true
    }
    return false
  }

  /** Una curva, una superficie o un campo: i valori, le derivate (con le lettere, se si può) e gli intervalli. */
  private vectorFunction(params: string[], body: MathNode): VectorFunction {
    const items = body.k === 'tuple' ? body.items : body.k === 'matrix' ? body.rows.map((r) => r[0]) : []
    const inner = scopeWith(this.scope(), params)
    const parts = items.map((c) => {
      try {
        return compile(c, inner, { calc: true })
      } catch {
        return () => NaN
      }
    })
    const vars = (args: number[]) => Object.fromEntries(params.map((p, i) => [p, args[i]]))
    const call = (args: number[]) => {
      const v = vars(args)
      return parts.map((c) => c(v))
    }
    const numeric = numericPartials(call, params.length)
    const scope = this.symbolScope()
    const partials = params.map((p, k) => {
      try {
        const derivatives = items.map((c) => compile(partialDerivative(c, p, params, scope), inner, { calc: true }))
        return (args: number[]) => {
          const v = vars(args)
          return derivatives.map((d) => d(v))
        }
      } catch {
        return numeric[k]
      }
    })
    return { params, call, partials, domain: params.map(() => null) }
  }

  private evaluate(node: MathNode): { float: number; exact: Rational | null } | null {
    let float: number
    try {
      float = withWorkLimit(WORK, () => compile(node, this.scope(), { calc: true })({}))
    } catch {
      return null
    }
    let exact: Rational | null = null
    try {
      exact = withWorkLimit(WORK, () => evaluateExact(node, this.exactScope()))
    } catch {
      // Senza frazioni (π, sin…) o troppo grande: va bene il risultato con la virgola.
    }
    return { float: exact ? exact.toNumber() : float, exact }
  }

  /** Il valore con i numeri complessi (anche esatto, con le frazioni), o null. */
  private evaluateComplex(node: MathNode): { complex: Complex; exactComplex: GaussRational | null } | null {
    let complex: Complex
    try {
      complex = withWorkLimit(WORK, () => compileComplex(node, this.complexScope())({}))
    } catch {
      return null
    }
    if (!Number.isFinite(complex.re) || !Number.isFinite(complex.im)) return null
    let exact: GaussRational | null = null
    try {
      exact = withWorkLimit(WORK, () => evaluateExactComplex(node, this.exactComplexScope()))
    } catch {
      // Con e, π, radici…: va bene il risultato con la virgola.
    }
    return { complex: exact ? exact.toComplex() : complex, exactComplex: exact }
  }

  /** Il valore con vettori e matrici (con le frazioni, se si può), o null. */
  private evaluateLinear(node: MathNode): LinearValue | null {
    const scope = this.linearScope()
    let float: LinearValue['float']
    try {
      float = withWorkLimit(WORK, () => evaluateLinear(node, scope, FLOAT))
    } catch {
      return null
    }
    let exact: LinearValue['exact'] = null
    try {
      exact = withWorkLimit(WORK, () => evaluateLinear(node, scope, EXACT))
    } catch {
      // Con π, le radici…: va bene con la virgola.
    }
    return { exact, float }
  }

  /**
   * Il risultato con vettori e matrici: una matrice, un vettore, un sottospazio (\ker A), gli
   * autovalori e gli autovettori, il polinomio caratteristico (\det(A - \lambda I)).
   */
  private showLinear(item: MathNode, style: ReturnType<typeof styleOf>): { shown: FormattedResult; value: Value | null } | null {
    if (item.k === 'fn' && (item.name === 'eig' || item.name === 'eigvec') && item.args.length === 1) {
      const A = this.evaluateLinear(item.args[0])
      if (!A || A.float.k !== 'matrix') return null
      let values: Eigenvalue[]
      try {
        values = withWorkLimit(WORK, () => eigenvalues(this.linearScope(), A))
      } catch {
        return null
      }
      if (!values.length) return null
      const vectors =
        item.name === 'eigvec'
          ? (e: Eigenvalue): FormattedResult | null => {
              const basis = eigenvectors(A, e)
              if (!basis.length) return null
              const shown = e.exact
                ? (basis as Mat<Rational>[]).map((m) => formatLinear(EXACT, { k: 'matrix', m, tuple: false }, style))
                : (basis as Mat<number>[]).map((m) => formatLinear(FLOAT, { k: 'matrix', m, tuple: false }, style))
              if (shown.some((v) => !v)) return null
              return { tex: shown.map((v) => v!.tex).join(',\ '), text: shown.map((v) => v!.text).join(', ') }
            }
          : undefined
      return { shown: formatEigenvalues(values, style, vectors), value: null }
    }
    const value = this.evaluateLinear(item)
    if (value && !(value.float.k === 'scalar' && !Number.isFinite(value.float.v))) {
      const shown = value.exact ? formatLinear(EXACT, value.exact, style) : formatLinear(FLOAT, value.float, style)
      if (!shown) return null
      const result: Value =
        value.float.k === 'scalar' ? { float: value.float.v, exact: value.exact?.k === 'scalar' ? value.exact.v : null } : { linear: value }
      return { shown, value: result }
    }
    // Il polinomio caratteristico: un determinante con una sola variabile libera (λ).
    const scope = this.linearScope()
    const free = [...namesIn(item)].filter(
      (n) => !scope.values.has(n) && !this.consts.has(n) && !this.complexConsts.has(n) && !this.fns.has(n) && !['π', 'e', 'I', 'T'].includes(n) && !/^I_\d$/.test(n),
    )
    let det = false
    walk(item, (n) => (det ||= (n.k === 'fn' && n.name === 'det') || n.k === 'matrix'))
    if (free.length !== 1 || !det) return null
    const poly = withWorkLimit(WORK, () => polynomialIn(item, free[0], scope))
    return poly ? { shown: formatPolynomial(poly, free[0], style), value: null } : null
  }

  /** Il risultato con i numeri complessi: tutte le radici di una radice da sola, l'argomento come multiplo di π. */
  private showComplex(item: MathNode, style: ReturnType<typeof styleOf>): { shown: FormattedResult; value: Value | null } | null {
    const roots = (() => {
      try {
        return withWorkLimit(WORK, () => allRoots(item, this.complexScope()))
      } catch {
        return null
      }
    })()
    if (roots && roots.length > 1) {
      const shown = roots.map((r) => formatComplex(r, { ...style, decimal: true }))
      return shown.every((r) => r) ? { shown: formatList(shown as FormattedResult[]), value: null } : null
    }
    const value = this.evaluateComplex(item)
    if (!value) return null
    if (item.k === 'fn' && item.name === 'arg' && !item.pow) {
      const pi = piMultiple(value.complex.re)
      if (pi) return { shown: pi, value }
    }
    const shown = value.exactComplex ? formatGauss(value.exactComplex, style) : formatComplex(value.complex, style)
    return shown ? { shown, value } : null
  }

  /** La formula con le matrici con un parametro scritte al posto del loro nome. */
  private inline(node: MathNode): MathNode {
    if (!this.symbolicNodes.size) return node
    const visit = (n: MathNode): MathNode => (n.k === 'name' && this.symbolicNodes.has(n.name) ? this.symbolicNodes.get(n.name)! : mapNode(n, visit))
    return visit(node)
  }

  /** Il risultato di «… =»: dell'ultima parte che si sa calcolare (in a = 3 + 4 = anche a diventa 7). */
  private calculate(src: string): FormattedResult | null {
    // Una formula della logica (p \land q \Rightarrow p, \operatorname{verità}(…)): la tavola di verità.
    const logic = logicShown(src)
    if (logic) return logic
    const node = parseCached(src)
    let items: (MathNode | null)[]
    if (node) items = node.k === 'rel' && node.ops.every((op) => op === '=' || op === '≈') ? node.items : [node]
    // Se una parte della catena non si legge (\left[\frac{x^2}{2}\right]_0^2), si provano le altre.
    else items = splitEquals(src).map(parseCached)
    const target = items.length > 1 && items[0] ? definitionTarget(items[0]) : null
    for (let i = items.length - 1; i >= (target ? 1 : 0); i--) {
      const item = items[i]
      if (!item) continue
      const found = this.resultOf(item)
      if (!found) continue
      if (target && !target.params && (found.set || found.value)) {
        const source = `${target.name} = ${src.slice(src.indexOf('=') + 1)}`
        if (found.set) this.record(target, found.set, source)
        else this.record(target, found.item, source, found.value!)
      }
      return found.shown
    }
    return null
  }

  /** Il risultato di una parte di formula (vedi `Found`), o null se Glifo non lo sa calcolare. */
  private resultOf(node: MathNode): Found | null {
    let item = this.inline(node)
    const style = styleOf(item)
    // Un limite o una serie: il valore (riconosciuto, se si può), l'infinito o «non esiste».
    const limitShown = this.showLimit(item, style)
    if (limitShown) return { shown: limitShown.shown, value: limitShown.value, item, loose: true }
    // Gli insiemi scritti elemento per elemento: unione, intersezione, parti, quanti elementi, P(A) con Ω.
    const finite = this.showFinite(item, style)
    if (finite) return { shown: finite.shown, value: finite.value, set: finite.set, item }
    // L'aritmetica e i polinomi: i fattori primi, i divisori, la divisione con il resto, Ruffini, le basi…
    // (\varphi(n), se φ non è una funzione della nota, è la funzione di Eulero).
    const totient = item.k === 'apply' && item.name === 'φ' && item.args.length === 1 && !item.primes && !this.fns.has('φ') ? item.args : null
    const arithmetic = this.showArithmetic(totient ? { k: 'fn', name: 'totient', args: totient } : item)
    if (arithmetic) return { shown: arithmetic, value: null, item }
    // La statistica inferenziale: gli intervalli di confidenza e i test d'ipotesi.
    if (item.k === 'fn' && INFERENCE.has(item.name) && !item.pow) {
      const node = item
      try {
        const ctx = this.inferenceContext()
        const shown =
          node.name === 'ci'
            ? confidenceShown(node.args, ctx)
            : node.name === 'civar'
              ? varianceConfidenceShown(node.args, ctx)
              : testShown(node.name === 'chisq' ? chiSquareTest(node.args, ctx) : hypothesisTest(node.args, ctx))
        if (shown) return { shown, value: null, item, table: true }
      } catch {
        // Gli argomenti non vanno.
      }
      return null
    }
    // Il calcolo numerico: la tabella dei passi, il polinomio interpolante, le matrici LU, Jacobi…
    if (item.k === 'fn' && NUMERICAL.has(item.name) && !item.pow) {
      const node = item
      try {
        const shown = withWorkLimit(WORK, () => numericalShown(node, this.numericContext(style)))
        if (shown) return { shown, value: null, item, table: true }
      } catch {
        // Non si fa (gli argomenti non vanno).
      }
      return null
    }
    // La trasformata di Laplace e l'antitrasformata.
    if (item.k === 'fn' && (item.name === 'laplace' || item.name === 'ilaplace') && item.args.length >= 1 && item.args.length <= 2 && !item.pow) {
      const args = item.args
      const inverse = item.name === 'ilaplace'
      try {
        const shown = withWorkLimit(WORK, () => (inverse ? inverseLaplaceShown(args, this.symbolScope()) : laplaceShown(args, this.symbolScope())))
        if (shown) return { shown, value: null, item }
      } catch {
        // Non è nella tabella.
      }
      return null
    }
    // La serie di Fourier: i coefficienti con le lettere e la serie.
    if (item.k === 'fn' && item.name === 'fourier' && item.args.length >= 1 && item.args.length <= 2 && !item.pow) {
      const args = item.args
      try {
        const shown = withWorkLimit(WORK, () => {
          const problem = fourierProblem(args, this.symbolScope(), this.scope())
          return problem && fourierShown(problem)
        })
        if (shown) return { shown, value: null, item, table: true }
      } catch {
        // Non è una funzione di cui si fa la serie.
      }
      return null
    }
    // Le coniche e le quadriche: il tipo, la forma canonica, gli elementi.
    if (item.k === 'fn' && (item.name === 'conic' || item.name === 'quadric') && item.args.length === 1) {
      const [equation] = item.args
      const conic = item.name === 'conic'
      try {
        const shown = withWorkLimit(WORK, () => (conic ? conicOf(equation, this.symbolScope())?.shown : quadricOf(equation, this.symbolScope())))
        if (shown) return { shown, value: null, item, table: true }
      } catch {
        // Non è un'equazione di secondo grado.
      }
      return null
    }
    // In più variabili: i punti critici, gli estremi vincolati (Lagrange) e assoluti su un insieme.
    const several = this.showSeveral(item, style)
    if (several) return several.value === null ? { shown: several.shown, value: null, item, table: true } : { shown: several.shown, value: { float: several.value, exact: null }, item, loose: true }
    // Lo studio di funzione (\operatorname{studio}(f)), o una sua parte.
    if (item.k === 'fn' && STUDY.has(item.name) && item.args.length === 1) {
      const shown = this.showStudy(item, style)
      return shown ? { shown, value: null, item, table: true } : null
    }
    // L'algebra lineare: diagonalizzare, Gram–Schmidt, la segnatura, il rango con un parametro…
    const spaces = this.showSpaces(item, style)
    if (spaces) return { shown: spaces, value: null, item, table: true }
    // La probabilità, il valore atteso, la varianza di una variabile aleatoria; la statistica dei dati.
    const chance = this.showRandom(item, style) ?? this.showStatistics(item, style)
    if (chance) return { shown: chance.shown, value: chance.value, item, ...(!chance.value && { table: true }) }
    // Un integrale definito con la primitiva: il valore esatto, gli impropri, la funzione integrale;
    // uno dentro l'altro, dentro un'espressione e con le lettere (il volume della sfera, 4πR³/3).
    const integral = this.showIntegral(item, style) ?? this.showDefinite(item, style)
    if (integral) return { shown: integral.shown, value: integral.value, item }
    // Le derivate e gli operatori dei campi con le lettere: se restano variabili, il risultato è una formula.
    if (needsSymbols(item, this.symbolScope())) {
      const decimal = style.decimal || this.usesDecimals(item)
      // Una derivata, un gradiente, un polinomio di Taylor, una primitiva da soli: già scritti come vanno.
      const indefinite = item.k === 'prim' ? item : null
      const single = item.k === 'diff' || item.k === 'fn' || item.k === 'prim' || (item.k === 'apply' && item.primes > 0)
      item = this.prepare(item, [], decimal)
      if (this.freeNames(item).length) {
        const shown = single ? this.showSymbolic(item, decimal, false) : this.showSymbolic(item, decimal)
        // \int f(x) \, dx: la primitiva più la costante.
        if (shown && indefinite) return { shown: this.plusConstant(shown, indefinite), value: null, item }
        return shown ? { shown, value: null, item } : null
      }
    }
    const result = this.evaluate(item)
    const real = result && (result.exact ? formatRational(result.exact, style) : formatNumber(result.float, { ...style, decimal: true }))
    // Senza un valore reale: con i numeri complessi (1 + 2i, \sqrt{-4}, \ln(-1)), o con vettori e matrici.
    const found = real ? { shown: real, value: result } : this.showComplex(item, style) ?? this.showLinear(item, style)
    return found ? { shown: found.shown, value: found.value, item } : null
  }

  /** Se la nota definisce il nome (un numero, una funzione, un vettore, una variabile aleatoria). */
  private isDefined(name: string): boolean {
    return this.consts.has(name) || this.complexConsts.has(name) || this.linearValues.has(name) || this.fns.has(name) || this.vfns.has(name) || this.randomVars.has(name)
  }

  private showArithmetic(item: MathNode): FormattedResult | null {
    try {
      return withWorkLimit(WORK, () => arithmeticShown(item, this.symbolScope()))
    } catch {
      return null
    }
  }

  /** Quello che serve al calcolo numerico: le funzioni di una variabile, i numeri, le matrici, le equazioni differenziali. */
  numericContext(style: ReturnType<typeof styleOf>): NumericContext {
    const scope = this.scope()
    return {
      style,
      number: (node) => {
        const v = bound(this.prepare(node), scope)({})
        if (!Number.isFinite(v)) throw new MathError('Qui va un numero')
        return v
      },
      fn: (node) => {
        let body = node.k === 'rel' && node.ops.length === 1 && node.ops[0] === '=' ? ({ k: 'bin', op: '-', a: node.items[0], b: node.items[1] } as MathNode) : node
        let v: string
        const named = (node.k === 'name' || (node.k === 'apply' && node.args.length === 1 && node.args[0].k === 'name')) && this.bodies.get(node.name)
        if (named && named.params.length === 1) {
          body = named.body
          v = named.params[0]
        } else {
          const free = this.freeNames(body)
          if (free.length > 1) return null
          v = free[0] ?? 'x'
        }
        const f = compile(this.prepare(body, [v]), scopeWith(scope, [v]), { calc: true })
        const vars: Record<string, number> = {}
        let df: ((x: number) => number) | null = null
        try {
          const d = compile(toNode(tidy(derive(exOf(body, this.symbolScope(), [v]), v))), scopeWith(scope, [v]), { calc: true })
          df = (x) => ((vars[v] = x), d(vars))
        } catch {
          df = null
        }
        return { v, f: (x) => ((vars[v] = x), f(vars)), df }
      },
      matrix: (node) => {
        const value = this.evaluateLinear(node)
        if (!value || value.float.k !== 'matrix') return null
        return { exact: value.exact?.k === 'matrix' ? value.exact.m : null, float: value.float.m }
      },
      ode: (eq, start) => {
        const ode = odeOf(eq, (name) => this.fns.has(name) || this.vfns.has(name))
        if (!ode || ode.order !== 1) return null
        const F = compileOde(ode, scope)
        if (start.k !== 'rel' || start.ops.length !== 1 || start.ops[0] !== '=' || start.items[0].k !== 'apply' || start.items[0].name !== ode.y || start.items[0].args.length !== 1) return null
        const x0 = bound(this.prepare(start.items[0].args[0]), scope)({})
        const y0 = bound(this.prepare(start.items[1]), scope)({})
        return { f: (x, y) => F(x, [y]), x: ode.x, y: ode.y, x0, y0 }
      },
    }
  }

  /** Quello che serve alla statistica inferenziale: i numeri, i vettori di dati, le tabelle. */
  inferenceContext(): InferenceContext {
    const scope = this.scope()
    const matrixOf = (node: MathNode) => {
      const value = this.evaluateLinear(node)
      return value?.float.k === 'matrix' ? value.float.m : null
    }
    return {
      number: (node) => {
        const v = bound(this.prepare(node), scope)({})
        if (!Number.isFinite(v)) throw new MathError('Qui va un numero')
        return v
      },
      data: (node) => {
        const m = matrixOf(node)
        return m && m[0].length === 1 && m.length > 1 ? m.map((r) => r[0]) : null
      },
      matrix: matrixOf,
    }
  }

  private finiteContext(): FiniteContext {
    return { sets: this.sets, symbols: this.symbolScope(), isFunction: (name) => this.fns.has(name) || this.vfns.has(name) }
  }

  /** Un'espressione con gli insiemi scritti elemento per elemento: l'insieme che viene, o un numero (|A|, P(A)). */
  private showFinite(item: MathNode, style: ReturnType<typeof styleOf>): { shown: FormattedResult; value: Value | null; set: MathNode | null } | null {
    try {
      const found = withWorkLimit(WORK, () => finiteValue(item, this.finiteContext()))
      if (!found) return null
      if ('count' in found) return { shown: formatRational(found.count, style), value: { float: found.count.toNumber(), exact: found.count }, set: null }
      return { shown: found.shown, value: null, set: found.set }
    } catch {
      return null
    }
  }

  /**
   * Il risultato di un limite (\lim_{x \to 0} \frac{\sin x}{x} = 1) o di una serie
   * (\sum_{n=1}^{\infty} \frac{1}{n^2} = π²/6 ≈ 1,644934…); null se la formula è altro.
   */
  private showLimit(item: MathNode, style: ReturnType<typeof styleOf>): { shown: FormattedResult; value: Value | null } | null {
    const series = item.k === 'big' && item.op === 'sum' && (item.to.k === 'infty' || (item.to.k === 'bin' && item.to.op === '+' && item.to.b.k === 'infty'))
    if (item.k !== 'lim' && !series) return null
    // In più variabili: lungo le rette e le parabole, poi tutto attorno al punto.
    if (item.k === 'lim' && item.vars) {
      try {
        const found = withWorkLimit(WORK, () => severalLimitShown(item, this.symbolScope(), (n) => compile(this.prepare(n), this.scope(), { calc: true })({}), style))
        return found && { shown: found.shown, value: found.value === null ? null : { float: found.value, exact: null } }
      } catch {
        return null
      }
    }
    let value: LimitValue
    let exact: Rational | null = null
    let power: FormattedResult | null = null
    try {
      value = withWorkLimit(WORK, () => {
        const scope = this.scope()
        if (item.k === 'lim') {
          const node = this.prepare(item.body)
          const body = compile(node, scopeWith(scope, [item.v]), { calc: true })
          const to = bound(item.to, scope)({})
          // 0/0 in un punto: con le derivate esatte, anche dove le cifre dei numeri non bastano.
          const exactly = Number.isFinite(to) ? zeroOverZero(item.body, item.v, item.to, this.symbolScope()) : null
          if (exactly) {
            exact = exactly.exact
            return { k: 'value', v: exactly.value }
          }
          const v: Record<string, number> = {}
          const found = limit((x) => ((v[item.v] = x), body(v)), to, item.side, isCounter(item.v) && !Number.isFinite(to))
          // Dove la funzione è continua il valore esatto: \lim_{x 	o 2} x^2 = 4.
          if (found.k === 'value' && Number.isFinite(to)) exact = this.exactAt(node, item.v, item.to, found.v)
          return found
        }
        const big = item as Extract<MathNode, { k: 'big' }>
        const start = bound(big.from, scope)({})
        // Con una lettera libera (x): una serie di potenze, con il raggio e l'insieme di convergenza.
        const powers = powerSeriesOf(big, Math.ceil(start - 1e-9), this.symbolScope(), (name) => this.isDefined(name))
        if (powers) {
          power = powerSeriesShown(powers, style)
          return { k: 'none' }
        }
        const body = compile(this.prepare(big.body), scopeWith(scope, [big.v]), { calc: true })
        const v: Record<string, number> = {}
        return seriesSum((n) => ((v[big.v] = n), body(v)), Math.ceil(start - 1e-9))
      })
    } catch {
      return null
    }
    if (power) return { shown: power, value: null }
    const shown = limitText(value, style, exact)
    const result: Value | null = value.k === 'value' ? { float: value.v, exact } : null
    return shown ? { shown, value: result } : null
  }

  /**
   * L'analisi in più variabili: \operatorname{critici}(f) (e \operatorname{estremi}(f) con f di due o tre
   * variabili), \operatorname{lagrange}(f, g = c), \operatorname{estremi}(f, D), \max_{…} f e \min_{…} f.
   */
  private showSeveral(item: MathNode, style: ReturnType<typeof styleOf>): { shown: FormattedResult; value: number | null } | null {
    if (item.k !== 'fn' || item.pow) return null
    const critical = item.name === 'critical' || (item.name === 'extrema' && item.args.length === 1)
    const optimum = ((item.name === 'max' || item.name === 'min') && item.base && item.args.length === 1) || ((item.name === 'lagrange' || item.name === 'extrema') && item.args.length === 2)
    if (!critical && !optimum) return null
    try {
      return withWorkLimit(WORK, () => {
        const symbols = this.symbolScope()
        if (critical) {
          const s = severalOf(item.args[0], symbols)
          const shown = s && criticalShown(s, style)
          return shown && { shown, value: null }
        }
        const where = item.base ?? item.args[1]
        const problem = optimumOf(item.args[0], where, symbols, this.sets)
        if (!problem) return null
        return extremaShown(problem.s, problem.constraints, item.name === 'max' ? 'max' : item.name === 'min' ? 'min' : 'both', style)
      })
    } catch {
      return null
    }
  }

  /** Lo studio di funzione, tutto (una tabella) o una parte (il dominio, gli asintoti…). */
  private showStudy(item: Extract<MathNode, { k: 'fn' }>, style: ReturnType<typeof styleOf>): FormattedResult | null {
    try {
      return withWorkLimit(WORK, () => {
        const target = functionOf(item.args[0], this.symbolScope())
        if (!target) return null
        const s = study(target.f, target.v, this.scope(), style, target.name)
        if (!s) return null
        if (item.name === 'study') return studyTable(studyRows(s, target.name, style))
        const part = studyPart(s, item.name, style)
        return part && { ...part, rich: true }
      })
    } catch {
      return null
    }
  }

  /**
   * L'algebra lineare che si mostra a modo suo: diagonalizzare (P e D), Gram–Schmidt, la segnatura di una
   * forma quadratica, la dipendenza lineare, la matrice di un'applicazione lineare (e il suo nucleo e la sua
   * immagine), il rango di una matrice con un parametro.
   */
  private showSpaces(item: MathNode, style: ReturnType<typeof styleOf>): FormattedResult | null {
    if (item.k !== 'fn' || item.pow) return null
    const [arg] = item.args
    try {
      return withWorkLimit(WORK, () => {
        if (item.name === 'rank' && item.args.length === 1) return this.parametricRank(arg, style)
        // \ker f, \operatorname{Im} f con f un'applicazione lineare: della sua matrice.
        if ((item.name === 'ker' || item.name === 'im') && item.args.length === 1 && arg.k === 'name' && this.bodies.get(arg.name)?.params.length) {
          const m = this.mapMatrix(arg.name)
          return formatLinear(EXACT, { k: 'span', basis: item.name === 'ker' ? kernel(EXACT, m) : image(EXACT, m) }, style)
        }
        if (!SPACES.has(item.name)) return null
        switch (item.name) {
          case 'diagonalize': {
            const A = this.evaluateLinear(arg)
            return A ? diagonalize(this.linearScope(), A, style) : null
          }
          case 'gramschmidt':
          case 'independent': {
            const vectors = this.exactVectors(item.args)
            if (!vectors) return null
            if (item.name === 'gramschmidt') return gramSchmidtShown(vectors, style)
            const names = item.args.length === vectors.length ? item.args.map((a, i) => (a.k === 'name' ? a.name : `v_${i + 1}`)) : vectors.map((_, i) => `v_${i + 1}`)
            return independence(vectors, names, style)
          }
          case 'signature': {
            const A = arg.k === 'name' && this.bodies.get(arg.name)?.params.length ? this.formMatrix(arg.name) : null
            const value = A ? { exact: { k: 'matrix' as const, m: A, tuple: false }, float: { k: 'matrix' as const, m: A.map((r) => r.map((c) => c.toNumber())), tuple: false } } : this.evaluateLinear(arg)
            if (!value || value.exact?.k !== 'matrix') return null
            const m = value.exact.m
            if (!m.every((row, i) => row.every((x, j) => x.cmp(m[j][i]) === 0))) throw new MathError('La segnatura è delle matrici simmetriche')
            const poly = characteristicPolynomial(this.linearScope(), value)
            return poly ? signature(poly) : null
          }
          case 'equations': {
            // Le equazioni cartesiane di un sottospazio (U = \operatorname{span}(…), o \ker A, U^\perp…).
            const value = this.evaluateLinear(arg)?.exact
            if (!value) return null
            const basis = value.k === 'span' ? value.basis : value.k === 'matrix' && value.m[0].length === 1 ? [value.m] : null
            if (!basis) throw new MathError('Le equazioni sono di un sottospazio: \\operatorname{equazioni}(U)')
            const n = basis[0]?.length ?? 0
            if (!n) return null
            return cartesianEquations(basis.map((b) => b.map((r) => r[0])), n, style)
          }
          case 'matrixof': {
            if (arg.k !== 'name' || !this.bodies.get(arg.name)?.params.length) return null
            const body = this.bodies.get(arg.name)!.body
            const m = body.k === 'tuple' || body.k === 'matrix' ? this.mapMatrix(arg.name) : this.formMatrix(arg.name)
            return formatLinear(EXACT, { k: 'matrix', m, tuple: false }, style)
          }
        }
        return null
      })
    } catch {
      return null
    }
  }

  /** I vettori: scritti uno per uno, le colonne di una matrice, o una base di uno span. */
  private exactVectors(args: MathNode[]): Rational[][] | null {
    const values = args.map((a) => this.evaluateLinear(a)?.exact)
    if (values.some((v) => !v)) return null
    if (values.length === 1) {
      const v = values[0]!
      if (v.k === 'span') return v.basis.map((b) => b.map((r) => r[0]))
      if (v.k === 'matrix' && v.m[0].length > 1) return v.m[0].map((_, j) => v.m.map((r) => r[j]))
    }
    if (!values.every((v) => v!.k === 'matrix' && v!.m[0].length === 1)) return null
    return values.map((v) => (v as Extract<Lin<Rational>, { k: 'matrix' }>).m.map((r) => r[0]))
  }

  /** I valori esatti della funzione `name` (le componenti, se è un vettore) nel punto `point`. */
  private functionAt(name: string, point: Rational[]): Rational[] {
    const { params, body } = this.bodies.get(name)!
    const locals = new Map(params.map((p, i) => [p, point[i]]))
    const parts = body.k === 'tuple' ? body.items : body.k === 'matrix' ? body.rows.map((r) => r[0]) : [body]
    return parts.map((c) => evaluateExact(c, this.exactScope(), locals))
  }

  /** La matrice di un'applicazione lineare f(x, y) = (…): in colonna le immagini dei vettori della base. */
  private mapMatrix(name: string): Mat<Rational> {
    const n = this.bodies.get(name)!.params.length
    const unit = (j: number, c = 1) => Array.from({ length: n }, (_, i) => Rational.int(i === j ? c : 0))
    const zero = this.functionAt(name, Array.from({ length: n }, () => Rational.int(0)))
    if (zero.some((c) => c.sign !== 0)) throw new MathError(`${name} non è lineare: ${name}(0) non è 0`)
    const columns = Array.from({ length: n }, (_, j) => this.functionAt(name, unit(j)))
    columns.forEach((col, j) => {
      const twice = this.functionAt(name, unit(j, 2))
      if (twice.some((c, i) => c.cmp(col[i].mul(Rational.int(2))) !== 0)) throw new MathError(`${name} non è lineare`)
    })
    return columns[0].map((_, i) => columns.map((col) => col[i]))
  }

  /** La matrice (simmetrica) di una forma quadratica q(x, y) = x^2 + 4xy + y^2. */
  private formMatrix(name: string): Mat<Rational> {
    const n = this.bodies.get(name)!.params.length
    const q = (point: number[]) => this.functionAt(name, point.map((c) => Rational.int(c)))[0]
    const e = (i: number, c = 1) => Array.from({ length: n }, (_, k) => (k === i ? c : 0))
    const half = new Rational(1n, 2n)
    for (let i = 0; i < n; i++) if (q(e(i, 2)).cmp(q(e(i)).mul(Rational.int(4))) !== 0) throw new MathError(`${name} non è una forma quadratica`)
    return Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => (i === j ? q(e(i)) : q(e(i).map((c, k) => (k === j ? 1 : c))).sub(q(e(i))).sub(q(e(j))).mul(half))),
    )
  }

  /** Il rango di una matrice con un parametro (una lettera che la nota non definisce). */
  private parametricRank(arg: MathNode, style: ReturnType<typeof styleOf>): FormattedResult | null {
    if (arg.k !== 'matrix') return null
    const free = [...namesIn(arg)].filter((n) => !this.consts.has(n) && !this.linearValues.has(n) && !['π', 'e'].includes(n))
    if (free.length !== 1) return null
    const k = free[0]
    const scope = this.linearScope()
    const M: Poly[][] = []
    for (const row of arg.rows) {
      const cells: Poly[] = []
      for (const c of row) {
        const p = polynomialIn(c, k, scope, 8)
        if (!p) return null
        cells.push(trimPoly(p))
      }
      M.push(cells)
    }
    return parametricRank(M, k, style)
  }

  /** P(X \le 3), E[X], \operatorname{Var}(X), \operatorname{quantile}(X, 0{,}95): esatti, se si può. */
  private showRandom(item: MathNode, style: ReturnType<typeof styleOf>): { shown: FormattedResult; value: Value | null } | null {
    const random = this.random()
    if (!random) return null
    let kind: 'prob' | 'mean' | 'variance' | 'sd' | 'quantile' | null = null
    let arg: MathNode | null = null
    if (item.k === 'prob') kind = 'prob'
    else if (item.k === 'expect') [kind, arg] = ['mean', item.a]
    else if (item.k === 'apply' && item.name === 'E' && !this.fns.has('E') && item.args.length === 1 && random.involves(item.args[0])) [kind, arg] = ['mean', item.args[0]]
    else if (item.k === 'fn' && !item.pow && item.args.length && random.involves(item.args[0])) {
      if ((item.name === 'var' || item.name === 'sd' || item.name === 'mean') && item.args.length === 1) [kind, arg] = [item.name === 'var' ? 'variance' : item.name, item.args[0]]
      else if (item.name === 'quantile' || item.name === 'percentile') kind = 'quantile'
    }
    if (!kind) return null
    try {
      return withWorkLimit(WORK, () => {
        const v = compile(item, this.scope(), { calc: true })({})
        if (kind === 'prob') {
          const exact = random.exactProbability(item as Extract<MathNode, { k: 'prob' }>, this.exactScope(), this.scope())
          const shown = probabilityShown(exact, v, style)
          return shown && { shown, value: { float: exact ? expSumValue(exact) : v, exact: exact && !exact.terms.length ? exact.c : null } }
        }
        if (kind !== 'quantile') {
          const exact = random.exactMoment(arg!, kind, this.exactScope())
          if (exact) return { shown: fractionShown(exact, style), value: { float: exact.toNumber(), exact } }
          if (Number.isNaN(v)) return { shown: { tex: '\\nexists', text: 'non esiste' }, value: null }
          if (v === Infinity) return { shown: { tex: '+\\infty', text: '+∞' }, value: null }
        }
        const shown = decimalShown(v, style)
        return shown && { shown, value: { float: v, exact: null } }
      })
    } catch {
      return null
    }
  }

  /** La statistica dei dati: media, mediana, mode, quartili, retta di regressione, la tabella delle frequenze, il riassunto. */
  private showStatistics(item: MathNode, style: ReturnType<typeof styleOf>): { shown: FormattedResult; value: Value | null } | null {
    // \bar{x}: la media dei dati x.
    if (item.k === 'name' && item.name.endsWith('\u0304') && this.linearValues.has(item.name.slice(0, -1))) {
      item = { k: 'fn', name: 'mean', args: [{ k: 'name', name: item.name.slice(0, -1) }] }
    }
    if (item.k !== 'fn' || item.pow || !STATISTICS.has(item.name)) return null
    try {
      return withWorkLimit(WORK, () => {
        // I numeri: \operatorname{media}(x), \operatorname{Var}(x, f), \operatorname{corr}(x, y).
        if ((DATA_FUNCTIONS.has(item.name) && item.name !== 'mode') || item.name === 'cov' || item.name === 'corr') {
          const value = this.evaluateLinear(item)
          if (!value || value.float.k !== 'scalar') return null
          if (value.exact?.k === 'scalar') return { shown: fractionShown(value.exact.v, style), value: { float: value.exact.v.toNumber(), exact: value.exact.v } }
          const shown = decimalShown(value.float.v, style)
          return shown && { shown, value: { float: value.float.v, exact: null } }
        }
        const values = item.args.map((a) => this.evaluateLinear(a))
        if (!values.length || values.some((v) => !v)) return null
        const names = item.args.map((a) => (a.k === 'name' ? a.name : null))
        if (values.every((v) => v!.exact)) {
          try {
            return this.statisticsShown(EXACT, values.map((v) => v!.exact!), item.name, names, style)
          } catch (e) {
            if (!(e instanceof ExactUnavailable)) throw e
          }
        }
        return this.statisticsShown(FLOAT, values.map((v) => v!.float), item.name, names, style)
      })
    } catch {
      return null
    }
  }

  private statisticsShown<T>(F: Field<T>, args: Lin<T>[], name: string, names: (string | null)[], style: ReturnType<typeof styleOf>): { shown: FormattedResult; value: Value | null } | null {
    switch (name) {
      case 'mode':
        return { shown: modesShown(F, dataOf(args), style), value: null }
      case 'quartiles':
        return { shown: quartilesShown(F, dataOf(args), style), value: null }
      case 'frequencies':
        return { shown: frequencyTable(F, dataOf(args), style), value: null }
      case 'summary':
        return { shown: studyTable(summaryRows(F, dataOf(args), style)), value: null }
      case 'regression': {
        const [x, y] = args
        if (args.length !== 2 || x.k !== 'matrix' || y.k !== 'matrix') throw new MathError('Si scrive \\operatorname{regressione}(x, y), con x e y due vettori di dati')
        const xs = x.m.map((r) => r[0])
        const ys = y.m.map((r) => r[0])
        const r = correlation(FLOAT, xs.map((v) => F.toNumber(v)), ys.map((v) => F.toNumber(v)))
        return { shown: regressionShown(F, regression(F, xs, ys), r, [names[0] ?? 'x', names[1] ?? 'y'], style), value: null }
      }
    }
    return null
  }

  /** La primitiva con la costante: + c (o + k, + C se la c c'è già). */
  private plusConstant(shown: FormattedResult, node: MathNode): FormattedResult {
    const used = namesIn(node)
    const c = ['c', 'k', 'C'].find((n) => !used.has(n) && !this.consts.has(n) && !this.fns.has(n)) ?? 'c'
    return { ...shown, tex: `${shown.tex} + ${c}`, text: `${shown.text} + ${c}` }
  }

  /**
   * Un integrale definito con la primitiva: il valore esatto (\int_0^1 \frac{dx}{1 + x^2} = π/4), gli
   * integrali impropri (+∞ se divergono) e, con le lettere negli estremi, la funzione integrale
   * (\int_0^x t^2 \, dt = x³/3). Null se la primitiva non si trova: allora l'integrale con i numeri.
   */
  private showIntegral(item: MathNode, style: ReturnType<typeof styleOf>): { shown: FormattedResult; value: Value | null } | null {
    if (item.k !== 'int' || item.body.k === 'int') return null
    try {
      return withWorkLimit(WORK, () => {
        const parts = definiteParts(item, this.symbolScope())
        if (!parts) return null
        const { F, a, b } = parts
        const v = item.v
        const letters = (e: Ex | null) => (e ? this.freeNames(toNode(e)) : [])
        // Con le lettere lo fa showDefinite, che controlla il risultato con i numeri.
        if ([...letters(F).filter((n) => n !== v), ...letters(a), ...letters(b)].length) return null
        const scope = this.scope()
        const A = bound(item.from, scope)({})
        const B = bound(item.to, scope)({})
        const body = compile(item.body, scopeWith(scope, [v]), { calc: true })
        const vars: Record<string, number> = {}
        const f = (x: number) => ((vars[v] = x), body(vars))
        let numeric = NaN
        try {
          numeric = compile(item, scope, { calc: true })({})
        } catch {
          // Si decide con la primitiva.
        }
        const found = definiteIntegral(F, v, f, a, b, A, B, numeric, scope)
        if (!found) return null
        if (found.value.k === 'infinity') return { shown: found.value.sign > 0 ? { tex: '+\\infty', text: '+∞' } : { tex: '-\\infty', text: '−∞' }, value: null }
        if (found.value.k !== 'value') return null
        const x = found.value.v
        const exact = found.exact && !symbols(found.exact).some((n) => n !== 'π' && n !== 'e') ? found.exact : null
        if (exact?.t === 'num') return { shown: formatRational(exact.v, style), value: { float: x, exact: exact.v } }
        if (exact && !style.decimal) {
          const node = toNode(exact)
          const tex = toLatex(node)
          const digits = formatNumber(x, { ...style, decimal: true })
          if (tex && digits && tex.length < 160) return { shown: { tex: `${tex} \\approx ${digits.tex}`, text: `${plainText(node)} ≈ ${digits.text}`, rich: true }, value: { float: x, exact: null } }
        }
        const shown = (style.decimal ? null : recognize(x, style)) ?? formatNumber(x, { ...style, decimal: true, digits: 9 })
        return shown ? { shown, value: { float: x, exact: null } } : null
      })
    } catch {
      return null
    }
  }

  /**
   * Gli integrali definiti con le primitive dove non basta showIntegral: uno dentro l'altro (\int_0^{2\pi}
   * \int_0^{\pi} \int_0^R \rho^2 \sin\varphi \, d\rho \, d\varphi \, d\theta = 4πR³/3), dentro
   * un'espressione (2 \int_0^R …) e con le lettere, che sono numeri positivi (un raggio, un'altezza):
   * \int_{-R}^{R} \pi (R^2 - x^2) \, dx = 4πR³/3. Il risultato si controlla con i numeri (`checked`).
   */
  private showDefinite(item: MathNode, style: ReturnType<typeof styleOf>): { shown: FormattedResult; value: Value | null } | null {
    let integrals = 0
    walk(item, (n) => {
      if (n.k === 'int') integrals++
    })
    if (!integrals) return null
    try {
      return withWorkLimit(WORK, () => {
        // Le lettere della formula, poi anche quelle delle funzioni della nota che usa (f(x) = a x^2).
        let letters = this.freeNames(item)
        let value = definiteValue(item, this.symbolScope(), new Set(letters))
        const more = value ? this.freeNames(toNode(value)).filter((n) => !letters.includes(n)) : []
        if (more.length) {
          letters = [...letters, ...more]
          value = definiteValue(item, this.symbolScope(), new Set(letters))
        }
        // Un integrale solo con i numeri lo fa showIntegral (con gli impropri e i salti della primitiva).
        if (!value || (!letters.length && item.k === 'int' && item.body.k !== 'int')) return null
        const float = this.checked(item, value, letters)
        if (float === null) return null
        if (letters.length) {
          // La forma più corta: (a + b)/2, non (b²/2 − a²/2)/(b − a).
          const best = [value, tidy(value), cancelLinear(value)].map((x) => toNode(x, style.decimal)).map((n) => ({ n, tex: toLatex(n) })).reduce((a, b) => (b.tex && (!a.tex || b.tex.length < a.tex.length) ? b : a))
          return best.tex ? { shown: { tex: best.tex, text: plainText(best.n), rich: true }, value: null } : null
        }
        if (value.t === 'num') return { shown: formatRational(value.v, style), value: { float, exact: value.v } }
        if (!style.decimal && !symbols(value).some((n) => n !== 'π' && n !== 'e')) {
          const node = toNode(value)
          const tex = toLatex(node)
          const digits = formatNumber(float, { ...style, decimal: true })
          if (tex && digits && tex.length < 160) return { shown: { tex: `${tex} \\approx ${digits.tex}`, text: `${plainText(node)} ≈ ${digits.text}`, rich: true }, value: { float, exact: null } }
        }
        const shown = (style.decimal ? null : recognize(float, style)) ?? formatNumber(float, { ...style, decimal: true, digits: 9 })
        return shown ? { shown, value: { float, exact: null } } : null
      })
    } catch {
      return null
    }
  }

  /**
   * Il valore trovato con le primitive torna con l'integrale fatto con i numeri? Con le lettere, per tre
   * scelte di valori positivi: dove l'integrale con i numeri non c'è (diverge) non deve esserci nemmeno
   * il valore trovato. Il valore con i numeri (con le lettere, quello della prima scelta), o null.
   */
  private checked(item: MathNode, value: Ex, letters: string[]): number | null {
    const scope = scopeWith(this.scope(), letters)
    let found: (vars: Record<string, number>) => number
    let numeric: (vars: Record<string, number>) => number
    try {
      found = compile(toNode(value), scope)
      // Con le funzioni della nota che hanno lettere (f(x) = a x^2), la formula con le funzioni scritte dentro.
      try {
        numeric = compile(item, scope, { calc: true })
      } catch {
        numeric = compile(toNode(exOf(item, this.symbolScope())), scope, { calc: true })
      }
    } catch {
      return null
    }
    const close = (a: number, b: number) => Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(b))
    const n = letters.length
    let first: number | null = null
    for (const sample of n ? CHECK_VALUES : [() => 0]) {
      const vars: Record<string, number> = {}
      letters.forEach((name, i) => (vars[name] = sample(i, n)))
      let a = NaN
      let b = NaN
      try {
        a = found(vars)
        b = withWorkLimit(WORK, () => numeric(vars))
      } catch {
        // Uno dei due non si calcola: lo dice il confronto qui sotto.
      }
      if (!Number.isFinite(a) && !Number.isFinite(b)) continue
      if (!Number.isFinite(a) || !Number.isFinite(b) || !close(a, b)) return null
      first ??= a
    }
    return first
  }

  /** Il valore esatto della funzione nel punto, se c'è e torna con il limite trovato con i numeri. */
  private exactAt(body: MathNode, v: string, to: MathNode, near: number): Rational | null {
    try {
      const point = evaluateExact(to, this.exactScope())
      const value = evaluateExact(body, this.exactScope(), new Map([[v, point]]))
      return Math.abs(value.toNumber() - near) <= 1e-6 * Math.max(1, Math.abs(near)) ? value : null
    } catch {
      return null
    }
  }

  /** Le lettere che la formula usa e che la nota non definisce (le variabili di un risultato con le lettere). */
  private freeNames(node: MathNode): string[] {
    return [...namesIn(node)].filter(
      (n) =>
        !this.consts.has(n) &&
        !this.complexConsts.has(n) &&
        !this.linearValues.has(n) &&
        !this.fns.has(n) &&
        !this.vfns.has(n) &&
        !this.bodies.has(n) &&
        !this.sets.has(n) &&
        !this.randomVars.has(n) &&
        !['π', 'e', 'i'].includes(n),
    )
  }

  /** Un risultato con le lettere (2x, (2x, 2y), la matrice hessiana), semplificato e disegnato. */
  private showSymbolic(node: MathNode, decimal: boolean, simplify = true): FormattedResult | null {
    let value = node
    try {
      if (simplify || needsSymbols(node, this.symbolScope())) value = withWorkLimit(WORK, () => symbolicValue(node, this.symbolScope(), decimal))
    } catch {
      // Una parte che non si semplifica si mostra com'è, ma non una derivata che non si è saputa fare.
      if (needsSymbols(node, this.symbolScope())) return null
    }
    const tex = toLatex(value)
    return tex ? { tex, text: plainText(value), rich: true } : null
  }

  /**
   * Due espressioni valgono lo stesso? Per i passaggi delle spiegazioni (src/ai/explain.ts): ogni
   * passaggio è una catena a = b = c in cui nessuna parte è per forza un conto da fare ((x + 1)^2 e
   * x^2 + 2x + 1, \pi \left[R^2 x - \frac{x^3}{3}\right]_{-R}^{R} e \frac{4\pi R^3}{3}). Con le lettere
   * si confrontano i valori per tre scelte di numeri positivi, come nei controlli; la primitiva tra
   * gli estremi è la differenza (`variable`: la variabile dell'integrale, se si sa). true, false, o
   * null se una delle due non si sa calcolare (una primitiva senza estremi, un'equazione, un insieme).
   */
  same(a: string, b: string, variable: string | null = null): boolean | null {
    const read = (src: string): MathNode | null => {
      const clean = withoutDots(src.trim())
      return this.bracketValue(clean, variable) ?? parseCached(clean)
    }
    const x = read(a)
    const y = read(b)
    if (!x || !y) return null
    const value = (n: MathNode) => !['rel', 'and', 'or', 'set', 'cases', 'prim'].includes(n.k)
    if (!value(x) || !value(y)) return null
    const letters = [...new Set([...this.freeNames(x), ...this.freeNames(y)])]
    if (this.callsUnknown(x, letters) || this.callsUnknown(y, letters)) return null
    try {
      if (!letters.length) {
        const p = this.evaluate(x) ?? this.realOf(x)
        const q = this.evaluate(y) ?? this.realOf(y)
        if (!p || !q) return null
        return p.exact && q.exact ? p.exact.cmp(q.exact) === 0 : close(p.float, q.float, 1e-9)
      }
      const f = this.compileWith(x, letters)
      const g = this.compileWith(y, letters)
      return f && g ? this.samplesAgree(letters, f, g, 1e-7) : null
    } catch {
      return null
    }
  }

  /** Le definizioni che servono a questi nomi (anche attraverso altre definizioni), in ordine. */
  definitionsFor(names: Iterable<string>): string[] {
    const wanted = new Set(names)
    for (let changed = true; changed; ) {
      changed = false
      for (const d of this.definitions) {
        if (!wanted.has(d.name)) continue
        for (const u of d.uses) {
          if (!wanted.has(u)) {
            wanted.add(u)
            changed = true
          }
        }
      }
    }
    return this.definitions.filter((d) => wanted.has(d.name)).map((d) => d.source)
  }
}
