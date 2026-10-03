/**
 * I numeri complessi: i conti con la i (1 + 2i, e^{i\pi/3}), il coniugato (\bar{z}, \overline{…}),
 * il modulo |z|, l'argomento \arg z (tra −π e π), le parti reale e immaginaria (\Re z, \Im z),
 * potenze, radici, esponenziale, logaritmo e funzioni trigonometriche. Si usano quando una formula
 * ha la i, un numero complesso definito prima (z = 1 + i) o non ha un valore reale (\sqrt{-4},
 * \ln(-1)): `evaluate.ts` resta per i numeri reali, che sono i più.
 *
 * Come per i reali, i conti con le frazioni sono esatti (`GaussRational`: \frac{1}{1 + i} fa
 * ½ − ½i), gli altri con la virgola mobile; e in fondo ci sono le forme da mostrare: a + bi,
 * ρe^{iθ} con le radici e i multipli di π riconosciuti (√2 e^{iπ/4}).
 */
import { binomial, factorial, integrate, MathError, spend, UndefinedName } from './evaluate'
import { ExactUnavailable, Rational } from './exact'
import { formatNumber, formatRational, type FormatOptions, type FormattedResult } from './format'
import { productPower, type MathNode } from './parse'

export interface Complex {
  re: number
  im: number
}

export const I: Complex = { re: 0, im: 1 }

export function complex(re: number, im = 0): Complex {
  return { re, im }
}

// ——— I conti ———

export function add(a: Complex, b: Complex): Complex {
  return { re: snapSum(a.re, b.re), im: snapSum(a.im, b.im) }
}

export function sub(a: Complex, b: Complex): Complex {
  return { re: snapSum(a.re, -b.re), im: snapSum(a.im, -b.im) }
}

export function mul(a: Complex, b: Complex): Complex {
  if (a.im === 0 && b.im === 0) return { re: a.re * b.re, im: 0 }
  return { re: snapSum(a.re * b.re, -a.im * b.im), im: snapSum(a.re * b.im, a.im * b.re) }
}

export function div(a: Complex, b: Complex): Complex {
  if (b.im === 0) return { re: a.re / b.re, im: a.im / b.re }
  // Con lo scambio di Smith: niente numeri enormi a metà conto.
  if (Math.abs(b.re) >= Math.abs(b.im)) {
    const r = b.im / b.re
    const d = b.re + b.im * r
    return { re: (a.re + a.im * r) / d, im: (a.im - a.re * r) / d }
  }
  const r = b.re / b.im
  const d = b.re * r + b.im
  return { re: (a.re * r + a.im) / d, im: (a.im * r - a.re) / d }
}

export function neg(a: Complex): Complex {
  return { re: -a.re, im: -a.im }
}

export function conj(a: Complex): Complex {
  return { re: a.re, im: -a.im }
}

export function abs(a: Complex): number {
  return Math.hypot(a.re, a.im)
}

/** L'argomento principale, tra −π (escluso) e π; non c'è per lo zero. */
export function arg(a: Complex): number {
  if (a.re === 0 && a.im === 0) return NaN
  return Math.atan2(a.im === 0 ? 0 : a.im, a.re)
}

/** Nei conti, a + b che si annullano (quasi) del tutto fanno 0: è il resto della virgola mobile. */
function snapSum(a: number, b: number): number {
  const s = a + b
  return Math.abs(s) < 1e-13 * Math.max(Math.abs(a), Math.abs(b)) ? 0 : s
}

/** Le parti piccolissime rispetto al numero sono resti della virgola mobile: e^{iπ} è −1, non −1 + 1,2·10⁻¹⁶i. */
function snap(z: Complex): Complex {
  const size = Math.max(Math.abs(z.re), Math.abs(z.im))
  return {
    re: Math.abs(z.re) < 4e-16 * size ? 0 : z.re,
    im: Math.abs(z.im) < 4e-16 * size ? 0 : z.im,
  }
}

export function exp(a: Complex): Complex {
  const m = Math.exp(a.re)
  if (a.im === 0) return { re: m, im: 0 }
  return snap({ re: m * Math.cos(a.im), im: m * Math.sin(a.im) })
}

/** Il logaritmo principale: ln|a| + i arg a. */
export function log(a: Complex): Complex {
  return { re: Math.log(abs(a)), im: arg(a) }
}

/** La potenza: con un esponente intero moltiplicando (così (1 + i)^{10} fa proprio 32i), se no e^{b ln a}. */
export function pow(a: Complex, b: Complex): Complex {
  if (b.im === 0 && Number.isInteger(b.re) && Math.abs(b.re) <= 1e6) {
    let n = Math.abs(b.re)
    let base = a
    let r: Complex = { re: 1, im: 0 }
    while (n > 0) {
      if (n % 2 === 1) r = mul(r, base)
      base = mul(base, base)
      n = Math.floor(n / 2)
    }
    return b.re < 0 ? div({ re: 1, im: 0 }, r) : r
  }
  if (a.re === 0 && a.im === 0) return b.re > 0 ? { re: 0, im: 0 } : { re: NaN, im: NaN }
  if (a.im === 0 && b.im === 0 && a.re > 0) return { re: Math.pow(a.re, b.re), im: 0 }
  return exp(mul(b, log(a)))
}

/** La radice quadrata principale (con la parte reale positiva). */
export function sqrt(a: Complex): Complex {
  if (a.im === 0) return a.re >= 0 ? { re: Math.sqrt(a.re), im: 0 } : { re: 0, im: Math.sqrt(-a.re) }
  const m = abs(a)
  const re = Math.sqrt((m + a.re) / 2)
  const im = Math.sqrt((m - a.re) / 2)
  return { re, im: a.im < 0 ? -im : im }
}

/**
 * Le n radici n-esime di a: ρ^{1/n} e^{i(θ + 2kπ)/n} per k = 0, …, n − 1, dalla principale. Per un
 * numero reale negativo e n dispari la principale è quella reale (∛−8 = −2, come nei reali).
 */
export function roots(a: Complex, n: number): Complex[] {
  if (!Number.isInteger(n) || n < 1 || n > 64) return []
  const m = Math.pow(abs(a), 1 / n)
  if (m === 0) return [{ re: 0, im: 0 }]
  const theta = arg(a)
  const out: Complex[] = []
  for (let k = 0; k < n; k++) {
    const t = (theta + 2 * Math.PI * k) / n
    out.push(snap({ re: m * Math.cos(t), im: m * Math.sin(t) }))
  }
  if (a.im === 0 && a.re < 0 && n % 2 === 1) {
    const real = out.findIndex((z) => z.im === 0)
    if (real > 0) out.unshift(...out.splice(real, 1))
  }
  return out
}

export function sin(a: Complex): Complex {
  if (a.im === 0) return { re: Math.sin(a.re), im: 0 }
  return snap({ re: Math.sin(a.re) * Math.cosh(a.im), im: Math.cos(a.re) * Math.sinh(a.im) })
}

export function cos(a: Complex): Complex {
  if (a.im === 0) return { re: Math.cos(a.re), im: 0 }
  return snap({ re: Math.cos(a.re) * Math.cosh(a.im), im: -Math.sin(a.re) * Math.sinh(a.im) })
}

export function sinh(a: Complex): Complex {
  return mul(I, neg(sin(mul(I, a))))
}

export function cosh(a: Complex): Complex {
  return cos(mul(I, a))
}

/** arcsin z = −i ln(iz + √(1 − z²)). */
export function asin(a: Complex): Complex {
  return mul(neg(I), log(add(mul(I, a), sqrt(sub({ re: 1, im: 0 }, mul(a, a))))))
}

/** arctan z = (i/2)(ln(1 − iz) − ln(1 + iz)). */
export function atan(a: Complex): Complex {
  const iz = mul(I, a)
  return mul({ re: 0, im: 0.5 }, sub(log(sub({ re: 1, im: 0 }, iz)), log(add({ re: 1, im: 0 }, iz))))
}

/** Vicino a un polo (tan π/2) la virgola mobile dà un numero enorme: lì la funzione non c'è. */
function pole(z: Complex): Complex {
  return abs(z) > 1e15 ? { re: NaN, im: NaN } : z
}

const UNARY: Record<string, (a: Complex) => Complex> = {
  sin,
  cos,
  tan: (a) => pole(div(sin(a), cos(a))),
  cot: (a) => pole(div(cos(a), sin(a))),
  sec: (a) => pole(div({ re: 1, im: 0 }, cos(a))),
  csc: (a) => pole(div({ re: 1, im: 0 }, sin(a))),
  sinh,
  cosh,
  tanh: (a) => div(sinh(a), cosh(a)),
  coth: (a) => div(cosh(a), sinh(a)),
  arcsin: asin,
  arccos: (a) => sub({ re: Math.PI / 2, im: 0 }, asin(a)),
  arctan: atan,
  arccot: (a) => sub({ re: Math.PI / 2, im: 0 }, atan(a)),
  arsinh: (a) => log(add(a, sqrt(add(mul(a, a), { re: 1, im: 0 })))),
  arcosh: (a) => log(add(a, mul(sqrt(add(a, { re: 1, im: 0 })), sqrt(sub(a, { re: 1, im: 0 }))))),
  artanh: (a) => mul({ re: 0.5, im: 0 }, sub(log(add({ re: 1, im: 0 }, a)), log(sub({ re: 1, im: 0 }, a)))),
  exp,
  ln: log,
  log,
  lg: (a) => div(log(a), { re: Math.LN10, im: 0 }),
  sqrt,
  abs: (a) => ({ re: abs(a), im: 0 }),
  arg: (a) => ({ re: arg(a), im: 0 }),
  re: (a) => ({ re: a.re, im: 0 }),
  im: (a) => ({ re: a.im, im: 0 }),
  conj,
  sgn: (a) => {
    const m = abs(a)
    return m === 0 ? { re: 0, im: 0 } : { re: a.re / m, im: a.im / m }
  },
}

/** Le funzioni che vogliono un numero reale (floor, max…): con una parte immaginaria non c'è il valore. */
const REAL_ONLY: Record<string, (xs: number[]) => number> = {
  floor: ([x]) => Math.floor(x),
  ceil: ([x]) => Math.ceil(x),
  round: ([x]) => Math.round(x),
  max: (xs) => Math.max(...xs),
  min: (xs) => Math.min(...xs),
}

// ——— Le espressioni ———

export type ComplexVars = Record<string, Complex>
export type ComplexCompiled = (v: ComplexVars) => Complex

/** Una funzione definita (f(z) = z^2 + 1): il corpo, da calcolare con i suoi valori. */
export interface ComplexFunction {
  params: string[]
  body: MathNode
  scope: ComplexScope
}

export interface ComplexScope {
  /** Le variabili libere (z nei grafici, i parametri delle funzioni, l'indice di una somma). */
  vars: ReadonlySet<string>
  /** I numeri definiti, reali o complessi (a = 2, z = 1 + i). */
  consts: ReadonlyMap<string, Complex>
  fns: ReadonlyMap<string, ComplexFunction>
}

export const EMPTY_COMPLEX_SCOPE: ComplexScope = { vars: new Set(), consts: new Map(), fns: new Map() }

export function complexScopeWith(scope: ComplexScope, vars: readonly string[]): ComplexScope {
  return { ...scope, vars: new Set([...scope.vars, ...vars]) }
}

const constant = (z: Complex): ComplexCompiled => () => z

/** z̄ (\bar{z}): il nome senza l'accento, se è definito. */
function conjugateOf(name: string): string | null {
  return name.length > 1 && name.endsWith('̄') ? name.slice(0, -1) : null
}

/** Un'espressione con i numeri complessi, come funzione JavaScript (come `compile` per i reali). */
export function compileComplex(node: MathNode, scope: ComplexScope): ComplexCompiled {
  const c = (n: MathNode, s: ComplexScope = scope) => compileComplex(n, s)
  switch (node.k) {
    case 'num':
      return constant({ re: node.v, im: 0 })
    case 'name':
      return compileName(node.name, scope)
    case 'neg': {
      const a = c(node.a)
      return (v) => neg(a(v))
    }
    case 'bin': {
      const split = productPower(node, (n) => !scope.vars.has(n) && scope.fns.has(n))
      if (split) return c(split)
      const a = c(node.a)
      const b = c(node.b)
      switch (node.op) {
        case '+':
          return (v) => add(a(v), b(v))
        case '-':
          return (v) => sub(a(v), b(v))
        case '*':
          return (v) => mul(a(v), b(v))
        case '/':
          return (v) => div(a(v), b(v))
        case '^':
          // e^{z}: l'esponenziale.
          if (node.a.k === 'name' && node.a.name === 'e' && !scope.vars.has('e') && !scope.consts.has('e')) return (v) => exp(b(v))
          return (v) => pow(a(v), b(v))
      }
      break
    }
    case 'fn':
      return compileFunction(node, scope)
    case 'apply':
      return compileApply(node, scope)
    case 'post': {
      const a = c(node.a)
      if (node.op === '!') return (v) => real(a(v), (x) => factorial(x))
      if (node.op === '%') return (v) => div(a(v), { re: 100, im: 0 })
      return (v) => mul(a(v), { re: Math.PI / 180, im: 0 })
    }
    case 'abs': {
      const a = c(node.a)
      return (v) => ({ re: abs(a(v)), im: 0 })
    }
    case 'floor':
    case 'ceil': {
      const a = c(node.a)
      const f = node.k === 'floor' ? Math.floor : Math.ceil
      return (v) => real(a(v), f)
    }
    case 'binom': {
      const n = c(node.n)
      const r = c(node.r)
      return (v) => {
        const a = n(v)
        const b = r(v)
        return a.im === 0 && b.im === 0 ? { re: binomial(a.re, b.re), im: 0 } : { re: NaN, im: NaN }
      }
    }
    case 'big': {
      const from = c(node.from)
      const to = c(node.to)
      const body = c(node.body, complexScopeWith(scope, [node.v]))
      const index = node.v
      const sum = node.op === 'sum'
      return (v) => {
        const lo = from(v)
        const hi = to(v)
        if (lo.im !== 0 || hi.im !== 0 || !Number.isFinite(lo.re) || !Number.isFinite(hi.re)) return { re: NaN, im: NaN }
        const start = Math.ceil(lo.re - 1e-9)
        const end = Math.floor(hi.re + 1e-9)
        if (end - start > 1e6) return { re: NaN, im: NaN }
        const local = { ...v }
        let r: Complex = { re: sum ? 0 : 1, im: 0 }
        for (let k = start; k <= end; k++) {
          if (!spend(1)) return { re: NaN, im: NaN }
          local[index] = { re: k, im: 0 }
          r = sum ? add(r, body(local)) : mul(r, body(local))
        }
        return r
      }
    }
    case 'int': {
      // Una funzione a valori complessi di una variabile reale: la parte reale e quella immaginaria.
      const from = node.from.k === 'infty' ? constant({ re: Infinity, im: 0 }) : c(node.from)
      const to = node.to.k === 'infty' ? constant({ re: Infinity, im: 0 }) : c(node.to)
      const body = c(node.body, complexScopeWith(scope, [node.v]))
      const index = node.v
      return (v) => {
        const a = from(v)
        const b = to(v)
        if (a.im !== 0 || b.im !== 0) return { re: NaN, im: NaN }
        const local = { ...v }
        const at = (t: number) => {
          local[index] = { re: t, im: 0 }
          return body(local)
        }
        return { re: integrate((t) => at(t).re, a.re, b.re), im: integrate((t) => at(t).im, a.re, b.re) }
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
  throw new MathError('Con i numeri complessi questo non si sa calcolare')
}

/** Un valore che deve essere reale: con una parte immaginaria non c'è. */
function real(z: Complex, f: (x: number) => number): Complex {
  return z.im === 0 ? { re: f(z.re), im: 0 } : { re: NaN, im: NaN }
}

function compileName(name: string, scope: ComplexScope): ComplexCompiled {
  if (scope.vars.has(name)) return (v) => v[name]
  const value = scope.consts.get(name)
  if (value !== undefined) return constant(value)
  if (name === 'i') return constant(I)
  if (name === 'π') return constant({ re: Math.PI, im: 0 })
  if (name === 'e') return constant({ re: Math.E, im: 0 })
  const base = conjugateOf(name)
  if (base && (scope.vars.has(base) || scope.consts.has(base))) {
    const z = compileName(base, scope)
    return (v) => conj(z(v))
  }
  if (scope.fns.has(name)) throw new MathError(`${name} è una funzione: scrivi ${name}(z)`)
  throw new UndefinedName(name)
}

function compileFunction(node: Extract<MathNode, { k: 'fn' }>, scope: ComplexScope): ComplexCompiled {
  const args = node.args.map((a) => compileComplex(a, scope))
  const pow2 = node.pow ? compileComplex(node.pow, scope) : null
  const name = node.name
  const one = () => {
    if (args.length !== 1) throw new MathError(`\\${name} vuole un solo valore`)
    return args[0]
  }
  let f: ComplexCompiled
  if (name === 'log' && node.base) {
    const base = compileComplex(node.base, scope)
    const a = one()
    f = (v) => div(log(a(v)), log(base(v)))
  } else if (name === 'root') {
    // Dentro un'espressione vale la radice principale (le altre le mostra il risultato, vedi `allRoots`).
    const index = compileComplex(node.base!, scope)
    const a = one()
    f = (v) => {
      const n = index(v)
      if (n.im !== 0 || !Number.isInteger(n.re)) return pow(a(v), div({ re: 1, im: 0 }, n))
      return roots(a(v), n.re)[0] ?? { re: NaN, im: NaN }
    }
  } else if (name in REAL_ONLY) {
    const g = REAL_ONLY[name]
    f = (v) => {
      const xs = args.map((a) => a(v))
      return xs.every((x) => x.im === 0) ? { re: g(xs.map((x) => x.re)), im: 0 } : { re: NaN, im: NaN }
    }
  } else {
    const g = UNARY[name]
    if (!g) throw new MathError(`Con i numeri complessi non so calcolare \\${name}`)
    const a = one()
    f = (v) => g(a(v))
  }
  if (!pow2) return f
  return (v) => pow(f(v), pow2(v))
}

function compileApply(node: Extract<MathNode, { k: 'apply' }>, scope: ComplexScope): ComplexCompiled {
  const user = scope.vars.has(node.name) ? undefined : scope.fns.get(node.name)
  if (user) {
    if (node.primes) throw new MathError('Le derivate con i numeri complessi non si sanno calcolare')
    if (node.args.length !== user.params.length) throw new MathError(`${node.name} vuole ${user.params.length === 1 ? 'un valore' : `${user.params.length} valori`}`)
    const args = node.args.map((a) => compileComplex(a, scope))
    const body = compileComplex(user.body, complexScopeWith(user.scope, user.params))
    return (v) => {
      const local: ComplexVars = {}
      user.params.forEach((p, i) => (local[p] = args[i](v)))
      return body(local)
    }
  }
  if (node.primes) throw new MathError(`${node.name} non è una funzione definita`)
  // a(x + 1), i(1 + i): se il nome è un numero è un prodotto.
  if (node.args.length !== 1) throw new UndefinedName(node.name)
  const a = compileName(node.name, scope)
  const b = compileComplex(node.args[0], scope)
  return (v) => mul(a(v), b(v))
}

/** La formula è una radice (\sqrt{…}, \sqrt[n]{…}) da sola: il risultato sono tutte le sue radici. */
export function allRoots(node: MathNode, scope: ComplexScope): Complex[] | null {
  if (node.k !== 'fn' || (node.name !== 'sqrt' && node.name !== 'root') || node.pow || node.args.length !== 1) return null
  const n = node.name === 'sqrt' ? 2 : compileComplex(node.base!, scope)({})
  const degree = typeof n === 'number' ? n : n.im === 0 ? n.re : NaN
  if (!Number.isInteger(degree) || degree < 2 || degree > 64) return null
  const w = compileComplex(node.args[0], scope)({})
  if (!Number.isFinite(w.re) || !Number.isFinite(w.im)) return null
  return roots(w, degree)
}

// ——— I conti esatti (con le frazioni) ———

/** Un numero complesso con parte reale e immaginaria frazioni: i conti con + − × ÷ restano esatti. */
export class GaussRational {
  constructor(
    readonly re: Rational,
    readonly im: Rational,
  ) {}

  static real(r: Rational): GaussRational {
    return new GaussRational(r, Rational.int(0))
  }

  get isReal(): boolean {
    return this.im.sign === 0
  }

  add(o: GaussRational): GaussRational {
    return new GaussRational(this.re.add(o.re), this.im.add(o.im))
  }

  sub(o: GaussRational): GaussRational {
    return new GaussRational(this.re.sub(o.re), this.im.sub(o.im))
  }

  mul(o: GaussRational): GaussRational {
    return new GaussRational(this.re.mul(o.re).sub(this.im.mul(o.im)), this.re.mul(o.im).add(this.im.mul(o.re)))
  }

  div(o: GaussRational): GaussRational {
    const d = o.re.mul(o.re).add(o.im.mul(o.im))
    if (d.sign === 0) throw new ExactUnavailable()
    return new GaussRational(this.re.mul(o.re).add(this.im.mul(o.im)).div(d), this.im.mul(o.re).sub(this.re.mul(o.im)).div(d))
  }

  neg(): GaussRational {
    return new GaussRational(this.re.neg(), this.im.neg())
  }

  conj(): GaussRational {
    return new GaussRational(this.re, this.im.neg())
  }

  powInt(e: bigint): GaussRational {
    if (e < 0n) return new GaussRational(Rational.int(1), Rational.int(0)).div(this.powInt(-e))
    if (e > 4096n) throw new ExactUnavailable()
    let r = new GaussRational(Rational.int(1), Rational.int(0))
    let base: GaussRational = this
    let n = e
    while (n > 0n) {
      if (n & 1n) r = r.mul(base)
      base = base.mul(base)
      n >>= 1n
    }
    return r
  }

  toComplex(): Complex {
    return { re: this.re.toNumber(), im: this.im.toNumber() }
  }
}

export interface ExactComplexScope {
  consts: ReadonlyMap<string, GaussRational | null>
  fns: ReadonlyMap<string, { params: string[]; body: MathNode; scope: ExactComplexScope } | null>
}

const unavailable = (): never => {
  throw new ExactUnavailable()
}

/** La radice quadrata esatta di una frazione non negativa, se c'è (|3 + 4i| = 5). */
function exactSqrt(r: Rational): Rational {
  if (r.sign < 0) unavailable()
  const root = (n: bigint): bigint => {
    if (n < 2n) return n
    let x = 1n << BigInt(Math.ceil(n.toString(2).length / 2) + 1)
    for (;;) {
      const y = (x + n / x) / 2n
      if (y >= x) break
      x = y
    }
    return x
  }
  const n = root(r.n)
  const d = root(r.d)
  if (n * n !== r.n || d * d !== r.d) unavailable()
  return new Rational(n, d)
}

/** Il valore esatto di un'espressione con i numeri complessi, o `ExactUnavailable`. */
export function evaluateExactComplex(node: MathNode, scope: ExactComplexScope, locals: ReadonlyMap<string, GaussRational> = new Map()): GaussRational {
  const ev = (n: MathNode, l = locals) => evaluateExactComplex(n, scope, l)
  switch (node.k) {
    case 'num':
      return GaussRational.real(Rational.decimal(node.text))
    case 'name': {
      const local = locals.get(node.name)
      if (local) return local
      const value = scope.consts.get(node.name)
      if (value) return value
      if (value === null) unavailable()
      if (node.name === 'i') return new GaussRational(Rational.int(0), Rational.int(1))
      const base = conjugateOf(node.name)
      if (base) return ev({ k: 'name', name: base }).conj()
      return unavailable()
    }
    case 'neg':
      return ev(node.a).neg()
    case 'bin': {
      const split = productPower(node, (n) => !locals.has(n) && scope.fns.has(n))
      if (split) return ev(split)
      const a = ev(node.a)
      const b = ev(node.b)
      switch (node.op) {
        case '+':
          return a.add(b)
        case '-':
          return a.sub(b)
        case '*':
          return a.mul(b)
        case '/':
          return a.div(b)
        case '^':
          if (!b.isReal || !b.re.isInteger) unavailable()
          return a.powInt(b.re.n)
      }
      break
    }
    case 'abs': {
      const a = ev(node.a)
      return GaussRational.real(exactSqrt(a.re.mul(a.re).add(a.im.mul(a.im))))
    }
    case 'fn': {
      if (node.args.length !== 1 || node.base) unavailable()
      let r: GaussRational
      const a = ev(node.args[0])
      switch (node.name) {
        case 'conj':
          r = a.conj()
          break
        case 're':
          r = GaussRational.real(a.re)
          break
        case 'im':
          r = GaussRational.real(a.im)
          break
        case 'abs':
          r = GaussRational.real(exactSqrt(a.re.mul(a.re).add(a.im.mul(a.im))))
          break
        default:
          return unavailable()
      }
      if (!node.pow) return r
      const p = ev(node.pow)
      if (!p.isReal || !p.re.isInteger) unavailable()
      return r.powInt(p.re.n)
    }
    case 'apply': {
      if (node.primes) unavailable()
      const fn = locals.has(node.name) ? undefined : scope.fns.get(node.name)
      if (fn) {
        if (fn.params.length !== node.args.length) unavailable()
        const bound = new Map<string, GaussRational>()
        fn.params.forEach((p, i) => bound.set(p, ev(node.args[i])))
        return evaluateExactComplex(fn.body, fn.scope, bound)
      }
      if (fn === null || node.args.length !== 1) unavailable()
      return ev({ k: 'name', name: node.name }).mul(ev(node.args[0]))
    }
    case 'post':
      if (node.op === '%') return ev(node.a).div(GaussRational.real(Rational.int(100)))
      return unavailable()
    case 'big': {
      const from = ev(node.from)
      const to = ev(node.to)
      if (!from.isReal || !to.isReal || !from.re.isInteger || !to.re.isInteger || to.re.n - from.re.n > 2000n) unavailable()
      let r = GaussRational.real(Rational.int(node.op === 'sum' ? 0 : 1))
      const inner = new Map(locals)
      for (let k = from.re.n; k <= to.re.n; k++) {
        if (!spend(1)) unavailable()
        inner.set(node.v, GaussRational.real(new Rational(k)))
        const term = ev(node.body, inner)
        r = node.op === 'sum' ? r.add(term) : r.mul(term)
      }
      return r
    }
  }
  return unavailable()
}

// ——— Come si scrivono ———

/** Una frazione p/q (q fino a `most`) vicina a x, se c'è. */
export function nearFraction(x: number, most: number): { p: number; q: number } | null {
  for (let q = 1; q <= most; q++) {
    const p = Math.round(x * q)
    if (Math.abs(x - p / q) <= 1e-10 * Math.max(1, Math.abs(x)) && Math.abs(p) <= 1e6) return { p, q }
  }
  return null
}

function gcdInt(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) [a, b] = [b, a % b]
  return a
}

export function fracTex(p: number, q: number, inner = ''): string {
  const sign = p < 0 ? '-' : ''
  const n = Math.abs(p)
  const top = inner ? (n === 1 ? inner : `${n}${inner}`) : String(n)
  return q === 1 ? `${sign}${top}` : `${sign}\\frac{${top}}{${q}}`
}

export function fracText(p: number, q: number, inner = ''): string {
  const sign = p < 0 ? '−' : ''
  const n = Math.abs(p)
  const top = inner ? (n === 1 ? inner : `${n}${inner}`) : String(n)
  return q === 1 ? `${sign}${top}` : `${sign}${top}/${q}`
}

/** Un angolo come multiplo di π (π/4, −2π/3), se lo è; se no null. */
export function piMultiple(theta: number): FormattedResult | null {
  if (!Number.isFinite(theta)) return null
  if (theta === 0) return { tex: '0', text: '0' }
  const f = nearFraction(theta / Math.PI, 24)
  if (!f) return null
  return { tex: fracTex(f.p, f.q, '\\pi'), text: fracText(f.p, f.q, 'π') }
}

/** Un numero positivo come radice (√2, 2√3, √2/2, 3), se il suo quadrato è una frazione semplice; se no null. */
export function surd(x: number): FormattedResult | null {
  if (!(x > 0) || !Number.isFinite(x)) return null
  const int = nearFraction(x, 1)
  if (int) return { tex: String(int.p), text: String(int.p) }
  const f = nearFraction(x * x, 100)
  if (!f || f.p > 1e5) return null
  // √(p/q) = √(p q)/q, poi fuori dalla radice i quadrati: √(k² m) = k √m.
  let m = f.p * f.q
  let k = 1
  for (let d = 2; d * d <= m; d++) {
    while (m % (d * d) === 0) {
      m /= d * d
      k *= d
    }
  }
  if (m === 1) return null
  const g = gcdInt(k, f.q)
  const p = k / g
  const q = f.q / g
  return { tex: fracTex(p, q, `\\sqrt{${m}}`), text: fracText(p, q, `√${m}`) }
}

/** Un numero reale scritto come nei risultati (vedi format.ts). */
function realPart(x: number, options: FormatOptions): FormattedResult | null {
  return formatNumber(x, { ...options, decimal: true })
}

/** La parte immaginaria con la i: i, −i, 2i, 1,5i (il segno a parte). */
function imaginary(value: FormattedResult): FormattedResult {
  if (value.tex === '1') return { tex: 'i', text: 'i' }
  if (value.tex.startsWith('\\frac')) return { tex: `${value.tex}\\,i`, text: `(${value.text})i` }
  return { tex: `${value.tex}\\,i`, text: `${value.text}i` }
}

/** a + bi dalle due parti già scritte (b senza segno). */
function join(re: FormattedResult | null, im: FormattedResult | null, negative: boolean): FormattedResult {
  if (!im) return re ?? { tex: '0', text: '0' }
  const i = imaginary(im)
  if (!re) return negative ? { tex: `-${i.tex}`, text: `−${i.text}` } : i
  return { tex: `${re.tex} ${negative ? '-' : '+'} ${i.tex}`, text: `${re.text} ${negative ? '−' : '+'} ${i.text}` }
}

/** Un numero complesso come risultato: a + bi, con le cifre come i numeri reali. */
export function formatComplex(z: Complex, options: FormatOptions): FormattedResult | null {
  if (!Number.isFinite(z.re) || !Number.isFinite(z.im)) return null
  const s = snap(z)
  const re = s.re === 0 ? null : realPart(s.re, options)
  const im = s.im === 0 ? null : realPart(Math.abs(s.im), options)
  if ((s.re !== 0 && !re) || (s.im !== 0 && !im)) return null
  return join(re, im, s.im < 0)
}

/** Un numero complesso esatto: con le frazioni (½ − ½i), o le sue cifre se si vogliono i decimali. */
export function formatGauss(g: GaussRational, options: FormatOptions): FormattedResult {
  const re = g.re.sign === 0 ? null : formatRational(g.re, options)
  const im = g.im.sign === 0 ? null : formatRational(g.im.abs(), options)
  return join(re, im, g.im.sign < 0)
}

/** Più numeri (le radici n-esime): separati dal punto e virgola, perché la virgola è dei decimali. */
export function formatList(values: FormattedResult[]): FormattedResult {
  return { tex: values.map((v) => v.tex).join(';\\ '), text: values.map((v) => v.text).join('; ') }
}

/**
 * La forma esponenziale ρe^{iθ}, con le radici e i multipli di π riconosciuti (√2 e^{iπ/4});
 * quando non lo sono, con le cifre (`options`).
 */
export function exponentialForm(z: Complex, options: FormatOptions): FormattedResult | null {
  const rho = abs(z)
  if (!Number.isFinite(rho)) return null
  if (rho === 0) return { tex: '0', text: '0' }
  const theta = arg(z)
  const r = surd(rho) ?? formatNumber(rho, { ...options, decimal: true })
  // L'angolo senza segno: e^{-i\frac{\pi}{4}}, non e^{i-\frac{\pi}{4}}.
  const t = piMultiple(Math.abs(theta)) ?? formatNumber(Math.abs(theta), { ...options, decimal: true })
  if (!r || !t) return null
  if (t.tex === '0') return r
  const rTex = r.tex === '1' ? '' : `${r.tex}\\,`
  const rText = r.text === '1' ? '' : r.text
  const sign = theta < 0 ? '-' : ''
  // Tra la i e le cifre uno spazio: e^{i\,0{,}46…}.
  const space = /^\d/.test(t.tex) ? '\\,' : ''
  return { tex: `${rTex}e^{${sign}i${space}${t.tex}}`, text: `${rText}e^(${theta < 0 ? '−' : ''}i${t.text})` }
}

// ——— Le equazioni ———

/**
 * Le soluzioni di G(z) = 0 con |Re z| e |Im z| fino a R: il metodo di Newton partendo dai punti di
 * una griglia, con le derivate fatte con le differenze (così va anche con \bar{z} e |z|). Le
 * soluzioni uguali si contano una volta; in ordine di argomento.
 */
export function solveComplex(G: (z: Complex) => Complex, R = 8, steps = 12): Complex[] {
  const F = (x: number, y: number) => G({ re: x, im: y })
  let scale = 1
  const starts: [number, number][] = []
  for (let j = 0; j <= steps; j++) {
    for (let i = 0; i <= steps; i++) {
      // Un po' fuori dalla griglia esatta: lo zero e gli assi sono spesso punti speciali.
      const x = -R + (2 * R * i) / steps + 0.0137 * R
      const y = -R + (2 * R * j) / steps + 0.0071 * R
      starts.push([x, y])
      const g = F(x, y)
      if (Number.isFinite(g.re) && Number.isFinite(g.im)) scale = Math.max(scale, abs(g))
    }
  }
  const found: Complex[] = []
  for (const [x0, y0] of starts) {
    let x = x0
    let y = y0
    let converged = false
    for (let it = 0; it < 60; it++) {
      if (!spend(1)) return found
      const g = F(x, y)
      if (!Number.isFinite(g.re) || !Number.isFinite(g.im)) break
      if (abs(g) <= 1e-14 * scale) {
        converged = true
        break
      }
      const h = 1e-7 * Math.max(1, Math.hypot(x, y))
      const gx = F(x + h, y)
      const gy = F(x, y + h)
      const a = (gx.re - g.re) / h
      const b = (gy.re - g.re) / h
      const c = (gx.im - g.im) / h
      const d = (gy.im - g.im) / h
      const det = a * d - b * c
      if (!det || !Number.isFinite(det)) break
      const dx = (d * g.re - b * g.im) / det
      const dy = (a * g.im - c * g.re) / det
      x -= dx
      y -= dy
      if (Math.abs(dx) + Math.abs(dy) <= 1e-13 * Math.max(1, Math.hypot(x, y))) {
        converged = true
        break
      }
    }
    if (!converged || Math.abs(x) > 4 * R || Math.abs(y) > 4 * R) continue
    const g = F(x, y)
    if (!(abs(g) <= 1e-8 * scale)) continue
    const z = snap({ re: x, im: y })
    const tiny = (v: number) => (Math.abs(v) < 1e-12 * Math.max(1, Math.hypot(x, y)) ? 0 : v)
    const clean = { re: tiny(z.re), im: tiny(z.im) }
    if (!found.some((f) => Math.hypot(f.re - clean.re, f.im - clean.im) <= 1e-6 * Math.max(1, abs(f)))) found.push(clean)
  }
  return found.sort((p, q) => {
    const a = arg(p)
    const b = arg(q)
    return (Number.isNaN(a) ? -4 : a < 0 ? a + 2 * Math.PI : a) - (Number.isNaN(b) ? -4 : b < 0 ? b + 2 * Math.PI : b)
  })
}
