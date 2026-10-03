/**
 * Il calcolo delle espressioni lette da `parse.ts`. Un'espressione diventa una funzione JavaScript
 * (`compile`), veloce da chiamare migliaia di volte per disegnare un grafico. Si lavora con i
 * numeri reali: dove una funzione non è definita (√-1, log 0, 1/0) il risultato è NaN o ±∞.
 */
import { compileLineIntegral, compileSurfaceIntegral } from './calculus'
import { limit, seriesSum, severalLimit, type LimitValue } from './limits'
import { compileMultiple } from './domain'
import { MathSyntaxError, productPower, type MathNode } from './parse'
import { normalCdf, normalQuantile } from './special'
import type { Distribution, Interval } from './distributions'
import { dataStatistic, DATA_FUNCTIONS } from './statistics'

export type Vars = Record<string, number>
export type Compiled = (v: Vars) => number
type Condition = (v: Vars) => boolean

/** Una funzione definita nella nota o nel grafico, come f(x) = x^2. */
export interface UserFunction {
  params: string[]
  call(args: number[]): number
}

/**
 * Una funzione con i valori vettori: una curva (γ(t) = (\cos t, \sin t)), una superficie
 * (S(u, v) = (…)) o un campo (F(x, y) = (-y, x)).
 */
export interface VectorFunction {
  params: string[]
  call(args: number[]): number[]
  /** Le derivate rispetto a ogni parametro (γ'(t), S_u e S_v), componente per componente. */
  partials: ((args: number[]) => number[])[]
  /** Dove variano i parametri ([0, 2π] per γ(t), t ∈ [0, 2π]); null se non è scritto. */
  domain: ([number, number] | null)[]
}

/** Cosa vogliono dire i nomi dove si calcola l'espressione. */
export interface Scope {
  /** Le variabili libere, lette al momento del calcolo (x nei grafici, i parametri delle funzioni). */
  vars: ReadonlySet<string>
  /** I numeri definiti (a = 2). */
  consts: ReadonlyMap<string, number>
  /** Le funzioni definite (f(x) = …). */
  fns: ReadonlyMap<string, UserFunction>
  /** Gli insiemi definiti (D = \{(x, y) : x^2 + y^2 \le 1\}), per gli integrali doppi e tripli. */
  sets?: ReadonlyMap<string, MathNode>
  /** Le curve, le superfici e i campi definiti, per gli integrali di linea e di superficie. */
  vfns?: ReadonlyMap<string, VectorFunction>
  /** Le variabili aleatorie definite (X \sim B(10, 0{,}3)), per P(…), E[…] e \operatorname{Var}(…). */
  random?: RandomScope
}

/** Le variabili aleatorie della nota: le probabilità e i valori attesi li calcola `probability.ts`. */
export interface RandomScope {
  has(name: string): boolean
  /** L'espressione usa una variabile aleatoria. */
  involves(node: MathNode): boolean
  probability(node: Extract<MathNode, { k: 'prob' }>, scope: Scope, options: CompileOptions): Compiled
  /** E[g(X)], \operatorname{Var}(g(X)) o lo scarto quadratico medio. */
  moment(node: MathNode, kind: 'mean' | 'variance' | 'sd', scope: Scope, options: CompileOptions): Compiled
  quantile(name: string, p: Compiled): Compiled
  distribution(name: string): Distribution | undefined
  /** L'evento di P(…) come intervalli di valori della variabile (per colorarlo nei grafici). */
  event(node: Extract<MathNode, { k: 'prob' }>, scope: Scope): { X: string; set: Interval[] }
}

const NO_RANDOM = 'Prima va definita la variabile aleatoria, per esempio $X \\sim B(10, 0{,}3)$'

export interface CompileOptions {
  /**
   * Per i risultati dopo «=»: i resti dei conti con la virgola mobile diventano 0 (sin π è 0, non
   * 1,2·10⁻¹⁶), e tan(π/2) non è un numero enorme ma «non definito».
   */
  calc?: boolean
}

/** Un'espressione che non si può calcolare: un nome sconosciuto, una funzione usata male… */
export class MathError extends Error {}

/** Un nome che non è definito da nessuna parte (i grafici propongono uno slider per lui). */
export class UndefinedName extends MathError {
  constructor(readonly missing: string) {
    super(`${nameLabel(missing)} non è definita`)
  }
}

export const EMPTY_SCOPE: Scope = { vars: new Set(), consts: new Map(), fns: new Map() }

/**
 * Il lavoro che resta a somme e integrali (un passo di una somma, un punto di un integrale):
 * finito quello, il risultato non c'è (NaN), invece di bloccare la pagina con una somma enorme.
 */
let work = Infinity

/** Fa `run` con al massimo `limit` passi di somme e integrali. */
export function withWorkLimit<T>(limit: number, run: () => T): T {
  const saved = work
  work = limit
  try {
    return run()
  } finally {
    work = saved
  }
}

/** Consuma `n` passi: false se il lavoro è finito. */
export function spend(n: number): boolean {
  work -= n
  return work >= 0
}

export function scopeWith(scope: Scope, vars: string[]): Scope {
  return { ...scope, vars: new Set([...scope.vars, ...vars]) }
}

// ——— Funzioni ———

const LANCZOS = [
  0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
  12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
]

export function gamma(z: number): number {
  if (Number.isInteger(z) && z <= 0) return NaN
  // Oltre 171 è più grande del più grande numero che si scrive (e i conti darebbero ∞ · 0).
  if (z > 171.62) return Infinity
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z))
  if (Number.isInteger(z) && z <= 171) {
    let r = 1
    for (let i = 2; i < z; i++) r *= i
    return r
  }
  z -= 1
  let x = LANCZOS[0]
  for (let i = 1; i < 9; i++) x += LANCZOS[i] / (z + i)
  const t = z + 7.5
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x
}

export function factorial(n: number): number {
  return n < 0 && Number.isInteger(n) ? NaN : gamma(n + 1)
}

export function binomial(n: number, k: number): number {
  if (Number.isInteger(n) && Number.isInteger(k)) {
    if (k < 0 || (n >= 0 && k > n)) return 0
    if (n >= 0 && Math.min(k, n - k) <= 1e5) {
      let r = 1
      const m = Math.min(k, n - k)
      for (let i = 1; i <= m; i++) r = (r * (n - m + i)) / i
      return Math.round(r)
    }
  }
  return gamma(n + 1) / (gamma(k + 1) * gamma(n - k + 1))
}

/** Il denominatore dispari di un esponente come 1/3 o 2/5 (0 se non lo è): serve per (-8)^{1/3} = -2. */
function oddDenominator(b: number): number {
  for (let q = 3; q <= 99; q += 2) {
    const p = b * q
    if (Math.abs(p - Math.round(p)) < 1e-9) return q
  }
  return 0
}

export function power(a: number, b: number): number {
  if (a >= 0 || Number.isInteger(b) || !Number.isFinite(b)) return Math.pow(a, b)
  const q = oddDenominator(b)
  if (!q) return NaN
  const r = Math.pow(-a, b)
  return Math.round(b * q) % 2 === 0 ? r : -r
}

function gcd2(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  if (!Number.isInteger(a) || !Number.isInteger(b)) return NaN
  while (b) [a, b] = [b, a % b]
  return a
}

/** Le funzioni con un solo argomento. */
const UNARY: Record<string, (x: number) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  cot: (x) => 1 / Math.tan(x),
  sec: (x) => 1 / Math.cos(x),
  csc: (x) => 1 / Math.sin(x),
  arcsin: Math.asin,
  arccos: Math.acos,
  arctan: Math.atan,
  arccot: (x) => Math.PI / 2 - Math.atan(x),
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  coth: (x) => 1 / Math.tanh(x),
  arsinh: Math.asinh,
  arcosh: Math.acosh,
  artanh: Math.atanh,
  ln: Math.log,
  // Come nei libri di Analisi, log senza base è il logaritmo naturale.
  log: Math.log,
  lg: Math.log10,
  exp: Math.exp,
  sqrt: Math.sqrt,
  abs: Math.abs,
  sgn: Math.sign,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
}

const TRIG = new Set(['sin', 'cos', 'tan', 'cot', 'sec', 'csc'])

/** Il nome di una funzione come si scrive in LaTeX, per i messaggi. */
export function fnLabel(name: string): string {
  return name === 'abs' || name === 'sgn' || name === 'floor' || name === 'ceil' || name === 'round' || name === 'root' ? name : `\\${name}`
}

// ——— Derivate e integrali (numerici) ———

/** La derivata n-esima di una funzione di una variabile, con le differenze finite a 5 punti. */
export function derivative(f: (x: number) => number, order: number): (x: number) => number {
  if (order <= 0) return f
  if (order === 1) {
    return (x) => {
      const h = 1e-3 * Math.max(1, Math.abs(x))
      return (f(x - 2 * h) - 8 * f(x - h) + 8 * f(x + h) - f(x + 2 * h)) / (12 * h)
    }
  }
  if (order === 2) {
    return (x) => {
      const h = 2e-3 * Math.max(1, Math.abs(x))
      return (-f(x - 2 * h) + 16 * f(x - h) - 30 * f(x) + 16 * f(x + h) - f(x + 2 * h)) / (12 * h * h)
    }
  }
  return derivative(derivative(f, 2), order - 2)
}

const GK_X = [
  0.991455371120812639206854697526329, 0.949107912342758524526189684047851, 0.864864423359769072789712788640926,
  0.741531185599394439863864773280788, 0.586087235467691130294144845693013, 0.405845151377397166906606412076961,
  0.207784955007898467600689403773245,
]
const GK_W = [
  0.02293532201052922496373200805897, 0.063092092629978553290700663189204, 0.104790010322250183839876322541518,
  0.140653259715525918745189590510238, 0.16900472663926790282658342659855, 0.190350578064785409913256402421014,
  0.204432940075298892414161999234649, 0.209482141084727828012999174891714,
]
const G_W = [0.129484966168869693270611432679082, 0.27970539148927666790146777142378, 0.381830050505118944950369775488975, 0.417959183673469387755102040816327]

function kronrod(f: (x: number) => number, a: number, b: number): { value: number; error: number } {
  if (!spend(15)) return { value: NaN, error: 0 }
  const c = (a + b) / 2
  const h = (b - a) / 2
  const fc = f(c)
  let k = fc * GK_W[7]
  let g = fc * G_W[3]
  for (let j = 0; j < 7; j++) {
    const dx = h * GK_X[j]
    const sum = f(c - dx) + f(c + dx)
    k += GK_W[j] * sum
    if (j % 2 === 1) g += G_W[(j - 1) / 2] * sum
  }
  return { value: k * h, error: Math.abs((k - g) * h) }
}

/**
 * L'integrale di f da a a b (anche con estremi infiniti), o NaN se non converge. `tolerance`:
 * l'errore relativo che basta (gli integrali doppi e tripli ne chiedono meno a quelli di fuori).
 */
export function integrate(f: (x: number) => number, a: number, b: number, tolerance = 1e-11): number {
  if (Number.isNaN(a) || Number.isNaN(b)) return NaN
  if (a === b) return 0
  if (a > b) return -integrate(f, b, a, tolerance)
  if (a === -Infinity && b === Infinity) return integrate((t) => { const d = 1 - t * t; return f(t / d) * (1 + t * t) / (d * d) }, -1, 1, tolerance)
  if (b === Infinity) return integrate((t) => f(a + t / (1 - t)) / ((1 - t) * (1 - t)), 0, 1, tolerance)
  if (a === -Infinity) return integrate((t) => f(b - (1 - t) / t) / (t * t), 0, 1, tolerance)
  const parts = [{ a, b, ...kronrod(f, a, b) }]
  for (let n = 0; n < 2000; n++) {
    let total = 0
    let error = 0
    let worst = 0
    for (let i = 0; i < parts.length; i++) {
      total += parts[i].value
      error += parts[i].error
      if (parts[i].error > parts[worst].error) worst = i
    }
    if (!Number.isFinite(total)) return NaN
    if (error <= Math.max(1e-13, tolerance * Math.abs(total))) return total
    const p = parts[worst]
    const m = (p.a + p.b) / 2
    parts.splice(worst, 1, { a: p.a, b: m, ...kronrod(f, p.a, m) }, { a: m, b: p.b, ...kronrod(f, m, p.b) })
  }
  return NaN
}

// ——— Compilazione ———

function constant(n: number): Compiled {
  return () => n
}

function isConstant(node: MathNode, scope: Scope): boolean {
  switch (node.k) {
    case 'num':
      return true
    case 'name':
      return !scope.vars.has(node.name)
    case 'neg':
      return isConstant(node.a, scope)
    case 'bin':
      return isConstant(node.a, scope) && isConstant(node.b, scope)
    default:
      return false
  }
}

/** Il nome come si scrive (per i messaggi): x_0 → x₀ resta x_0, che si capisce. */
export function nameLabel(name: string): string {
  return name
}

export function compile(node: MathNode, scope: Scope, options: CompileOptions = {}): Compiled {
  const calc = !!options.calc
  const c = (n: MathNode, s: Scope = scope): Compiled => compile(n, s, options)
  switch (node.k) {
    case 'num':
      return constant(node.v)
    case 'name': {
      const name = node.name
      if (scope.vars.has(name)) return (v) => v[name]
      const value = scope.consts.get(name)
      if (value !== undefined) return constant(value)
      if (name === 'π') return constant(Math.PI)
      if (name === 'e') return constant(Math.E)
      if (scope.fns.has(name)) throw new MathError(`${name} è una funzione: scrivi ${name}(x)`)
      throw new UndefinedName(name)
    }
    case 'neg': {
      const a = c(node.a)
      return (v) => -a(v)
    }
    case 'bin': {
      const split = productPower(node, (n) => !scope.vars.has(n) && scope.fns.has(n))
      if (split) return c(split)
      const a = c(node.a)
      const b = c(node.b)
      switch (node.op) {
        case '+':
          return calc ? (v) => snapSum(a(v), b(v)) : (v) => a(v) + b(v)
        case '-':
          return calc ? (v) => snapSum(a(v), -b(v)) : (v) => a(v) - b(v)
        case '*':
          return (v) => a(v) * b(v)
        case '/':
          return (v) => a(v) / b(v)
        case '^': {
          if (isConstant(node.b, scope)) {
            const e = b({})
            if (e === 2) return (v) => {
              const x = a(v)
              return x * x
            }
            if (Number.isInteger(e)) return (v) => Math.pow(a(v), e)
            const q = oddDenominator(e)
            if (!q) return (v) => Math.pow(a(v), e)
            const even = Math.round(e * q) % 2 === 0
            return (v) => {
              const x = a(v)
              if (x >= 0) return Math.pow(x, e)
              const r = Math.pow(-x, e)
              return even ? r : -r
            }
          }
          return (v) => power(a(v), b(v))
        }
      }
      break
    }
    case 'fn':
      return compileFunction(node, scope, options)
    case 'apply':
      return compileApply(node, scope, options)
    case 'post': {
      const a = c(node.a)
      if (node.op === '!') return (v) => factorial(a(v))
      if (node.op === '%') return (v) => a(v) / 100
      return (v) => (a(v) * Math.PI) / 180
    }
    case 'abs': {
      const a = c(node.a)
      return (v) => Math.abs(a(v))
    }
    case 'floor': {
      const a = c(node.a)
      return (v) => Math.floor(a(v) + (calc ? 1e-12 : 0))
    }
    case 'ceil': {
      const a = c(node.a)
      return (v) => Math.ceil(a(v) - (calc ? 1e-12 : 0))
    }
    case 'binom': {
      const n = c(node.n)
      const r = c(node.r)
      return (v) => binomial(n(v), r(v))
    }
    case 'big': {
      const from = bound(node.from, scope, options)
      const to = bound(node.to, scope, options)
      const inner = scopeWith(scope, [node.v])
      const body = c(node.body, inner)
      const index = node.v
      const sum = node.op === 'sum'
      return (v) => {
        const lo = from(v)
        const hi = to(v)
        // Una serie: \sum_{n=1}^{\infty}.
        if (sum && hi === Infinity && Number.isFinite(lo)) {
          const local = { ...v }
          return limitNumber(seriesSum((n) => ((local[index] = n), body(local)), Math.ceil(lo - 1e-9)))
        }
        if (!Number.isFinite(lo) || !Number.isFinite(hi)) return NaN
        const start = Math.ceil(lo - 1e-9)
        const end = Math.floor(hi + 1e-9)
        if (end - start > 1e6) return NaN
        const local = { ...v }
        let r = sum ? 0 : 1
        for (let k = start; k <= end; k++) {
          if (!spend(1)) return NaN
          local[index] = k
          r = sum ? r + body(local) : r * body(local)
        }
        return r
      }
    }
    case 'int': {
      const from = bound(node.from, scope, options)
      const to = bound(node.to, scope, options)
      const body = c(node.body, scopeWith(scope, [node.v]))
      const index = node.v
      return (v) => {
        const local = { ...v }
        return integrate((t) => {
          local[index] = t
          return body(local)
        }, from(v), to(v))
      }
    }
    case 'mint':
      return compileMultiple(node, scope, options)
    case 'prim':
      throw new MathError('Non so trovare la primitiva di questa funzione')
    case 'diff':
      return compileDerivative(node, scope, options)
    case 'lim': {
      // In più variabili: lungo le rette e le parabole, poi tutto attorno al punto.
      if (node.vars) {
        const vars = node.vars
        const body = c(node.body, scopeWith(scope, vars))
        const point = node.to.k === 'tuple' ? node.to.items.map((t) => bound(t, scope, options)) : []
        return (v) => {
          const local = { ...v }
          const at = (p: number[]) => {
            vars.forEach((name, i) => (local[name] = p[i]))
            return body(local)
          }
          const found = severalLimit(at, point.map((t) => t(v)), () => ({ tex: '', text: '' }))
          return found ? limitNumber(found.value) : NaN
        }
      }
      const to = bound(node.to, scope, options)
      const body = c(node.body, scopeWith(scope, [node.v]))
      const index = node.v
      return (v) => {
        const local = { ...v }
        return limitNumber(limit((x) => ((local[index] = x), body(local)), to(v), node.side, isCounter(index) && !Number.isFinite(to(v))))
      }
    }
    case 'lint':
      return compileLineIntegral(node, scope, options)
    case 'sint':
      return compileSurfaceIntegral(node, scope, options)
    case 'set':
      throw new MathError('Un insieme non è un numero: si usa sotto un integrale, \\iint_D')
    case 'prob':
      if (!scope.random) throw new MathError(NO_RANDOM)
      return scope.random.probability(node, scope, options)
    case 'expect':
      if (!scope.random) throw new MathError(NO_RANDOM)
      return scope.random.moment(node.a, 'mean', scope, options)
    case 'dist':
      throw new MathError(`${node.v} \\sim … definisce la variabile aleatoria: scrivila in una formula da sola`)
    case 'cases': {
      const rows = node.rows.map((r) => ({ value: c(r.value), cond: r.cond ? compileCondition(r.cond, scope, options) : null }))
      return (v) => {
        for (const row of rows) if (!row.cond || row.cond(v)) return row.value(v)
        return NaN
      }
    }
    case 'tuple':
      throw new MathError(node.items.length ? 'Una coppia di valori (a, b) non va qui' : 'Le parentesi sono vuote')
    case 'infty':
      throw new MathError('∞ non è un numero: si usa solo negli intervalli')
    case 'rel':
    case 'in':
    case 'and':
    case 'or':
      throw new MathError('Qui va un\'espressione, non una condizione')
  }
  throw new MathError('Espressione non valida')
}

/** Il valore di un limite come numero: ±∞, o NaN se non c'è. */
function limitNumber(value: LimitValue): number {
  return value.k === 'value' ? value.v : value.k === 'infinity' ? value.sign * Infinity : NaN
}

/** n, k, m: i nomi dei numeri interi (\lim_{n \to \infty} è una successione). */
export function isCounter(name: string): boolean {
  return /^[nkm](_.+)?$/.test(name)
}

/** Un estremo di somma o integrale (o di una disuguaglianza): può essere ±∞. */
export function bound(node: MathNode, scope: Scope, options: CompileOptions = {}): Compiled {
  if (node.k === 'infty') return constant(Infinity)
  if (node.k === 'neg' && node.a.k === 'infty') return constant(-Infinity)
  if (node.k === 'bin' && node.op === '+' && node.b.k === 'infty') return constant(Infinity)
  return compile(node, scope, options)
}

/** Nei conti, a + b che si annullano (quasi) del tutto fanno 0: è il resto della virgola mobile. */
function snapSum(a: number, b: number): number {
  const s = a + b
  return Math.abs(s) < 1e-13 * Math.max(Math.abs(a), Math.abs(b)) ? 0 : s
}

/** Una derivata con i numeri (le differenze finite), dove le lettere non bastano: nei grafici, f'(x) di un integrale… */
function compileDerivative(node: Extract<MathNode, { k: 'diff' }>, scope: Scope, options: CompileOptions): Compiled {
  let body = node.body
  let at: { params: string[]; point: Compiled[] } | null = null
  // \frac{\partial f}{\partial x}: f con le sue variabili; \frac{\partial f}{\partial x}(1, 2): nel punto.
  const user = (body.k === 'name' || body.k === 'apply') && !scope.vars.has(body.name) ? scope.fns.get(body.name) : undefined
  if (user && (body.k === 'name' || (body.k === 'apply' && !body.primes && body.args.length === user.params.length && body.args.every((a) => isConstant(a, scope))))) {
    if (body.k === 'apply') at = { params: user.params, point: body.args.map((a) => compile(a, scope, options)) }
    body = { k: 'apply', name: body.name, args: user.params.map((p) => ({ k: 'name', name: p })), primes: 0 }
  }
  const vars = node.vars
  const inner = scopeWith(scope, at ? at.params : vars)
  let g = compile(body, inner, options)
  for (const x of vars) {
    const f = g
    g = (v) => {
      const x0 = v[x]
      const h = 1e-3 * Math.max(1, Math.abs(x0))
      const value = (t: number) => f({ ...v, [x]: t })
      return (value(x0 - 2 * h) - 8 * value(x0 - h) + 8 * value(x0 + h) - value(x0 + 2 * h)) / (12 * h)
    }
  }
  const derivative = g
  if (at) {
    const { params, point } = at
    return (v) => derivative({ ...v, ...Object.fromEntries(params.map((p, i) => [p, point[i](v)])) })
  }
  // Le variabili della derivata: quelle del grafico, o i numeri definiti (la derivata in quel punto).
  const fixed: Record<string, number> = {}
  for (const x of vars) {
    if (scope.vars.has(x)) continue
    const value = scope.consts.get(x)
    if (value === undefined) throw new UndefinedName(x)
    fixed[x] = value
  }
  return Object.keys(fixed).length ? (v) => derivative({ ...v, ...fixed }) : derivative
}

/** Le operazioni con i campi danno vettori o vanno fatte con le lettere: si calcolano nella nota. */
const FIELD_OPERATIONS: Record<string, string> = {
  grad: 'Il gradiente è un vettore',
  curl: 'Il rotore è un vettore (nel piano un numero)',
  hess: 'L\'hessiana è una matrice',
  jac: 'La jacobiana è una matrice',
  div: 'La divergenza',
  lap: 'Il laplaciano',
}

function compileFunction(node: Extract<MathNode, { k: 'fn' }>, scope: Scope, options: CompileOptions): Compiled {
  if (FIELD_OPERATIONS[node.name]) throw new MathError(`${FIELD_OPERATIONS[node.name]}: si calcola nella nota, con «=»`)
  const random = compileRandomFunction(node, scope, options)
  if (random) return random
  const args = node.args.map((a) => compile(a, scope, options))
  const pow = node.pow ? compile(node.pow, scope, options) : null
  const name = node.name
  const label = fnLabel(name)
  const one = () => {
    if (args.length !== 1) throw new MathError(`${label} vuole un solo valore`)
    return args[0]
  }
  let f: Compiled
  if (name === 'log' && node.base) {
    const base = compile(node.base, scope, options)
    const a = one()
    f = (v) => Math.log(a(v)) / Math.log(base(v))
  } else if (name === 'root') {
    const index = compile(node.base!, scope, options)
    const a = one()
    f = (v) => {
      const n = index(v)
      const x = a(v)
      if (x < 0 && Number.isInteger(n) && n % 2 !== 0) return -Math.pow(-x, 1 / n)
      return Math.pow(x, 1 / n)
    }
  } else if (name === 'mod') {
    // Il resto della divisione, sempre tra 0 e il divisore (−7 \bmod 3 = 2).
    if (args.length !== 2) throw new MathError('Si scrive a \\bmod n')
    const [a, n] = args
    f = (v) => {
      const m = n(v)
      const x = a(v)
      return x - m * Math.floor(x / m)
    }
  } else if (name === 'max' || name === 'min') {
    if (node.base) throw new MathError(`Il ${name === 'max' ? 'massimo' : 'minimo'} su un insieme si scrive da solo: ${label}_{…} f =`)
    if (!args.length) throw new MathError(`${label} vuole almeno un valore`)
    const pick = name === 'max' ? Math.max : Math.min
    f = (v) => pick(...args.map((a) => a(v)))
  } else if (name === 'comb' || name === 'combrep' || name === 'disp' || name === 'disprep') {
    // C_{n,k} = \binom{n}{k}, C'_{n,k} = \binom{n + k - 1}{k}, D_{n,k} = n!/(n − k)!, D'_{n,k} = n^k.
    if (args.length !== 2) throw new MathError(`${name.startsWith('comb') ? 'C' : 'D'}_{n,k} vuole due numeri`)
    const [n, k] = args
    f = (v) => {
      const N = n(v)
      const K = k(v)
      if (name === 'comb') return binomial(N, K)
      if (name === 'combrep') return binomial(N + K - 1, K)
      if (name === 'disprep') return Math.pow(N, K)
      if (!Number.isInteger(N) || !Number.isInteger(K) || K < 0 || K > N) return K > N ? 0 : NaN
      let r = 1
      for (let i = 0; i < K; i++) r *= N - i
      return r
    }
  } else if (name === 'normq') {
    const a = one()
    f = (v) => normalQuantile(a(v))
  } else if (DATA_FUNCTIONS.has(name)) {
    // La statistica di numeri scritti uno per uno: \operatorname{media}(2, 3, 5).
    f = (v) => dataStatistic(name, args.map((a) => a(v)))
  } else if (name === 'gcd' || name === 'lcm') {
    if (args.length < 2) throw new MathError(`${label} vuole almeno due numeri`)
    f = (v) => {
      const xs = args.map((a) => Math.round(a(v)))
      if (name === 'gcd') return xs.reduce(gcd2)
      return xs.reduce((p, q) => Math.abs(p * q) / gcd2(p, q))
    }
  } else {
    const fn = UNARY[name]
    if (!fn) throw new MathError(`Non so calcolare ${label}`)
    const a = one()
    if (options.calc && TRIG.has(name)) {
      f = (v) => {
        const x = a(v)
        const r = fn(x)
        // sin π = 0 e tan(π/2) non esiste, anche se la virgola mobile dice altro.
        if (Math.abs(r) < 4e-16 * Math.max(1, Math.abs(x))) return 0
        if (Math.abs(r) > 1e15) return NaN
        return r
      }
    } else f = (v) => fn(a(v))
  }
  if (!pow) return f
  return (v) => power(f(v), pow(v))
}

/** \operatorname{Var}(X), \operatorname{sqm}(X), \operatorname{quantile}(X, 0{,}95) con X una variabile aleatoria; null se è altro. */
function compileRandomFunction(node: Extract<MathNode, { k: 'fn' }>, scope: Scope, options: CompileOptions): Compiled | null {
  const random = scope.random
  if (!random || !node.args.length || !random.involves(node.args[0])) return null
  const name = node.name
  if ((name === 'var' || name === 'sd' || name === 'mean') && node.args.length === 1) {
    const f = random.moment(node.args[0], name === 'var' ? 'variance' : name, scope, options)
    if (!node.pow) return f
    const pow = compile(node.pow, scope, options)
    return (v) => power(f(v), pow(v))
  }
  if ((name === 'quantile' || name === 'percentile') && node.args.length === 2 && node.args[0].k === 'name') {
    const p = compile(node.args[1], scope, options)
    return random.quantile(node.args[0].name, name === 'percentile' ? (v) => p(v) / 100 : p)
  }
  if (name === 'var' || name === 'sd' || name === 'quantile' || name === 'percentile') {
    throw new MathError(`Si scrive ${name === 'quantile' ? '\\operatorname{quantile}(X, 0{,}95)' : '\\operatorname{Var}(X)'}, con X la variabile aleatoria`)
  }
  return null
}

function compileApply(node: Extract<MathNode, { k: 'apply' }>, scope: Scope, options: CompileOptions): Compiled {
  const user = scope.vars.has(node.name) ? undefined : scope.fns.get(node.name)
  if (user) {
    if (node.args.length !== user.params.length) {
      const n = user.params.length
      throw new MathError(`${node.name} vuole ${n === 1 ? 'un valore' : `${n} valori`}: ${node.name}(${user.params.join(', ')})`)
    }
    const args = node.args.map((a) => compile(a, scope, options))
    if (node.primes) {
      if (args.length !== 1) throw new MathError(`La derivata ${node.name}${"'".repeat(node.primes)} si sa fare solo per funzioni di una variabile`)
      const d = derivative((x) => user.call([x]), node.primes)
      const a = args[0]
      return (v) => d(a(v))
    }
    if (args.length === 1) {
      const a = args[0]
      return (v) => user.call([a(v)])
    }
    return (v) => user.call(args.map((a) => a(v)))
  }
  if (node.primes) throw new MathError(`${node.name} non è una funzione definita`)
  // Φ(z): la funzione di ripartizione della normale standard; E(X): il valore atteso.
  if (node.name === 'Φ' && !scope.consts.has('Φ') && node.args.length === 1) {
    const a = compile(node.args[0], scope, options)
    return (v) => normalCdf(a(v))
  }
  if (node.name === 'E' && !scope.consts.has('E') && node.args.length === 1 && scope.random?.involves(node.args[0])) {
    return scope.random.moment(node.args[0], 'mean', scope, options)
  }
  // a(x + 1): se a è un numero è un prodotto.
  const isNumber = scope.vars.has(node.name) || scope.consts.has(node.name) || node.name === 'π' || node.name === 'e'
  if (!isNumber) throw new UndefinedName(node.name)
  if (node.args.length !== 1) throw new MathError(`${node.name} è un numero: ${node.name}(…) vuole un solo valore`)
  const a = compile({ k: 'name', name: node.name }, scope, options)
  const b = compile(node.args[0], scope, options)
  return (v) => a(v) * b(v)
}

/** Una condizione (x > 0, 0 ≤ x ≤ 2, x ∈ [0, 1], … e/o …). */
export function compileCondition(node: MathNode, scope: Scope, options: CompileOptions = {}): Condition {
  switch (node.k) {
    case 'rel': {
      if (!node.ops.length) return () => true
      const items = node.items.map((n) => bound(n, scope, options))
      const ops = node.ops
      return (v) => {
        let left = items[0](v)
        for (let i = 0; i < ops.length; i++) {
          const right = items[i + 1](v)
          if (!compare(left, ops[i], right)) return false
          left = right
        }
        return true
      }
    }
    case 'in': {
      const a = compile(node.a, scope, options)
      const lo = bound(node.lo, scope, options)
      const hi = bound(node.hi, scope, options)
      const { loOpen, hiOpen } = node
      return (v) => {
        const x = a(v)
        const l = lo(v)
        const h = hi(v)
        return (loOpen ? x > l : x >= l) && (hiOpen ? x < h : x <= h)
      }
    }
    case 'and': {
      const items = node.items.map((n) => compileCondition(n, scope, options))
      return (v) => items.every((f) => f(v))
    }
    case 'or': {
      const items = node.items.map((n) => compileCondition(n, scope, options))
      return (v) => items.some((f) => f(v))
    }
    default:
      throw new MathError('Qui va una condizione, per esempio x > 0')
  }
}

function compare(a: number, op: string, b: number): boolean {
  switch (op) {
    case '<':
      return a < b
    case '<=':
      return a <= b
    case '>':
      return a > b
    case '>=':
      return a >= b
    case '=':
    case '≈':
      return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b))
    case '!=':
      return Math.abs(a - b) > 1e-9 * Math.max(1, Math.abs(a), Math.abs(b))
  }
  return false
}

/** Il messaggio di un errore di lettura o di calcolo, in italiano. */
export function errorMessage(err: unknown): string {
  if (err instanceof MathError || err instanceof MathSyntaxError) return err.message
  return 'Espressione non valida'
}
