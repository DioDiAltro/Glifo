/**
 * I conti con le lettere: le derivate scritte come formula (anche parziali), il gradiente, la
 * divergenza, il rotore, il laplaciano, l'hessiana e la jacobiana, con le semplificazioni che
 * servono a leggerle (2x, non 2·x^1 + 0). Un'espressione diventa una somma di termini, ognuno una
 * frazione per un prodotto di potenze (`Ex`); poi torna un'espressione (`MathNode`) da scrivere in
 * LaTeX o da calcolare con i numeri.
 */
import { compile, EMPTY_SCOPE, fnLabel, MathError, UndefinedName } from './evaluate'
import { ExactUnavailable, Rational } from './exact'
import { children, namesIn, productPower, type MathNode } from './parse'
import { asFraction, polyEx, primitive } from './primitive'
import { squareFree as squareFreeFactors } from './polynomial'
import { toLatex } from './latex'

export type Ex =
  | { t: 'num'; v: Rational }
  | { t: 'sym'; name: string }
  | { t: 'add'; terms: Ex[] }
  /** c · f₁ · f₂ · …: i fattori non sono numeri né prodotti, e le potenze della stessa base sono unite. */
  | { t: 'mul'; c: Rational; factors: Ex[] }
  | { t: 'pow'; base: Ex; exp: Ex }
  | { t: 'fn'; name: string; args: Ex[]; base?: Ex }
  | { t: 'cases'; rows: { value: Ex; cond: MathNode | null }[] }
  /** ∫ da `from` a `to` di `body` in `v`: serve per le funzioni integrali, F(x) = ∫_0^x … */
  | { t: 'int'; v: string; from: Ex; to: Ex; body: Ex }
  /** Σ di `body` per `v` da `from` a `to`. */
  | { t: 'sum'; v: string; from: Ex; to: Ex; body: Ex }
  /** Quello che con le lettere non si tratta (un fattoriale, un integrale doppio…): resta com'è. */
  | { t: 'node'; node: MathNode }

/** Le definizioni della nota che servono ai conti con le lettere. */
export interface SymbolScope {
  /** I numeri definiti: il valore esatto (a = 2) o null (a = \sqrt{2}: resta la lettera). */
  consts: ReadonlyMap<string, Rational | null>
  /** Le funzioni definite, anche quelle con valori vettori (F(x, y) = (-y, x)). */
  fns: ReadonlyMap<string, { params: string[]; body: MathNode }>
}

const R = (n: number | bigint, d: number | bigint = 1) => new Rational(BigInt(n), BigInt(d))
const ZERO = R(0)
const ONE = R(1)
const HALF = R(1, 2)

export const num = (v: Rational | number): Ex => ({ t: 'num', v: typeof v === 'number' ? R(v) : v })
export const sym = (name: string): Ex => ({ t: 'sym', name })

const isNum = (x: Ex, v?: number): x is Extract<Ex, { t: 'num' }> => x.t === 'num' && (v === undefined || (x.v.d === 1n && x.v.n === BigInt(v)))

// ——— Il confronto: una chiave per ogni espressione ———

const keys = new WeakMap<Ex, string>()

/** Una chiave uguale per le espressioni uguali (dopo le semplificazioni): per raccogliere i termini simili. */
export function key(x: Ex): string {
  const hit = keys.get(x)
  if (hit !== undefined) return hit
  let k: string
  switch (x.t) {
    case 'num':
      k = `${x.v.n}/${x.v.d}`
      break
    case 'sym':
      k = `$${x.name}`
      break
    case 'add':
      k = `(+${x.terms.map(key).join(',')})`
      break
    case 'mul':
      k = `(*${x.c.n}/${x.c.d},${x.factors.map(key).join(',')})`
      break
    case 'pow':
      k = `(^${key(x.base)},${key(x.exp)})`
      break
    case 'fn':
      k = `(${x.name}${x.base ? '_' + key(x.base) : ''}:${x.args.map(key).join(',')})`
      break
    case 'cases':
      k = `(cases ${x.rows.map((r) => `${key(r.value)}|${JSON.stringify(r.cond)}`).join(';')})`
      break
    case 'int':
    case 'sum':
      k = `(${x.t} ${x.v},${key(x.from)},${key(x.to)},${key(x.body)})`
      break
    case 'node':
      k = `#${JSON.stringify(x.node)}`
      break
  }
  keys.set(x, k)
  return k
}

/** L'espressione cambia con `v`? */
export function dependsOn(x: Ex, v: string): boolean {
  switch (x.t) {
    case 'num':
      return false
    case 'sym':
      return x.name === v
    case 'add':
      return x.terms.some((t) => dependsOn(t, v))
    case 'mul':
      return x.factors.some((f) => dependsOn(f, v))
    case 'pow':
      return dependsOn(x.base, v) || dependsOn(x.exp, v)
    case 'fn':
      return x.args.some((a) => dependsOn(a, v)) || (!!x.base && dependsOn(x.base, v))
    case 'cases':
      return x.rows.some((r) => dependsOn(r.value, v) || (!!r.cond && namesIn(r.cond).has(v)))
    case 'int':
    case 'sum':
      return dependsOn(x.from, v) || dependsOn(x.to, v) || (x.v !== v && dependsOn(x.body, v))
    case 'node':
      return namesIn(x.node).has(v)
  }
}

/** Le lettere libere, nell'ordine in cui compaiono. */
export function symbols(x: Ex, out: string[] = []): string[] {
  const visit = (e: Ex, bound: ReadonlySet<string>): void => {
    switch (e.t) {
      case 'num':
        return
      case 'sym':
        if (!bound.has(e.name) && !out.includes(e.name)) out.push(e.name)
        return
      case 'add':
        return e.terms.forEach((t) => visit(t, bound))
      case 'mul':
        return e.factors.forEach((f) => visit(f, bound))
      case 'pow':
        visit(e.base, bound)
        return visit(e.exp, bound)
      case 'fn':
        e.args.forEach((a) => visit(a, bound))
        if (e.base) visit(e.base, bound)
        return
      case 'cases':
        for (const r of e.rows) {
          visit(r.value, bound)
          if (r.cond) for (const n of namesIn(r.cond, new Set(), bound)) if (!out.includes(n)) out.push(n)
        }
        return
      case 'int':
      case 'sum':
        visit(e.from, bound)
        visit(e.to, bound)
        return visit(e.body, new Set([...bound, e.v]))
      case 'node':
        for (const n of namesIn(e.node, new Set(), bound)) if (!out.includes(n)) out.push(n)
    }
  }
  visit(x, new Set())
  return out
}

// ——— Le forme normali: somme, prodotti, potenze, funzioni ———

/** Il numero davanti e il resto: 3x² → [3, x²]; un numero da solo → [n, null]. */
function split(x: Ex): [Rational, Ex | null] {
  if (x.t === 'num') return [x.v, null]
  if (x.t === 'mul') return [x.c, x.factors.length === 1 ? x.factors[0] : { t: 'mul', c: ONE, factors: x.factors }]
  return [ONE, x]
}

export function add(...xs: Ex[]): Ex {
  let constant = ZERO
  const order: string[] = []
  const groups = new Map<string, { c: Rational; rest: Ex }>()
  const visit = (x: Ex): void => {
    if (x.t === 'add') return x.terms.forEach(visit)
    const [c, rest] = split(x)
    if (!rest) {
      constant = constant.add(c)
      return
    }
    const k = key(rest)
    const group = groups.get(k)
    if (group) group.c = group.c.add(c)
    else {
      groups.set(k, { c, rest })
      order.push(k)
    }
  }
  xs.forEach(visit)
  const terms: Ex[] = []
  for (const k of order) {
    const { c, rest } = groups.get(k)!
    if (c.sign !== 0) terms.push(c.n === 1n && c.d === 1n ? rest : mul(num(c), rest))
  }
  // I numeri in fondo: 2x + 3.
  if (constant.sign !== 0) terms.push(num(constant))
  if (!terms.length) return num(0)
  return terms.length === 1 ? terms[0] : { t: 'add', terms }
}

export const neg = (x: Ex): Ex => mul(num(-1), x)
export const sub = (a: Ex, b: Ex): Ex => add(a, neg(b))

export function mul(...xs: Ex[]): Ex {
  let c = ONE
  const order: string[] = []
  const groups = new Map<string, { base: Ex; exp: Ex }>()
  const visit = (x: Ex): void => {
    if (x.t === 'num') {
      c = c.mul(x.v)
      return
    }
    if (x.t === 'mul') {
      c = c.mul(x.c)
      return x.factors.forEach(visit)
    }
    const [base, exp] = x.t === 'pow' ? [x.base, x.exp] : [x, num(1)]
    const k = key(base)
    const group = groups.get(k)
    // Gli esponenti con le lettere sviluppati: e^{a} e^{−(a)} = 1.
    if (group) group.exp = group.exp.t === 'num' && exp.t === 'num' ? add(group.exp, exp) : expand(add(group.exp, exp))
    else {
      groups.set(k, { base, exp })
      order.push(k)
    }
  }
  xs.forEach(visit)
  if (c.sign === 0) return num(0)
  const factors: Ex[] = []
  for (const k of order) {
    const { base, exp } = groups.get(k)!
    const p = pow(base, exp)
    if (p.t === 'num') c = c.mul(p.v)
    else if (p.t === 'mul') {
      c = c.mul(p.c)
      factors.push(...p.factors)
    } else factors.push(p)
  }
  if (c.sign === 0) return num(0)
  if (!factors.length) return num(c)
  if (c.n === 1n && c.d === 1n && factors.length === 1) return factors[0]
  return { t: 'mul', c, factors: sortFactors(factors) }
}

/** L'ordine dei fattori come nei libri: 2√3 x y² sin x e^x. */
function sortFactors(factors: Ex[]): Ex[] {
  const rank = (f: Ex): number => {
    const base = f.t === 'pow' ? f.base : f
    if (base.t === 'num') return 0
    if (base.t === 'sym') return base.name === 'e' && f.t === 'pow' ? 4 : base.name === 'π' ? 1 : 2
    if (base.t === 'add') return 3
    return 4
  }
  const name = (f: Ex): string => {
    const base = f.t === 'pow' ? f.base : f
    return base.t === 'sym' ? base.name : ''
  }
  return factors
    .map((f, i) => ({ f, i }))
    .sort((a, b) => rank(a.f) - rank(b.f) || (rank(a.f) === 2 ? name(a.f).localeCompare(name(b.f)) : 0) || a.i - b.i)
    .map((x) => x.f)
}

/** Fuori dalla radice i quadrati: √(k² m) = k √m (m senza quadrati). Null se i numeri sono troppo grandi. */
function squareFree(n: bigint): { k: bigint; m: bigint } | null {
  if (n > 10n ** 12n) return null
  let m = n
  let k = 1n
  for (let f = 2n; f * f <= m; f++) {
    while (m % (f * f) === 0n) {
      m /= f * f
      k *= f
    }
  }
  return { k, m }
}

function exactRoot(n: bigint, q: number): bigint | null {
  if (n < 0n) {
    if (q % 2 === 0) return null
    const r = exactRoot(-n, q)
    return r === null ? null : -r
  }
  const guess = BigInt(Math.round(Math.pow(Number(n), 1 / q)))
  for (const r of [guess - 1n, guess, guess + 1n]) if (r >= 0n && r ** BigInt(q) === n) return r
  return null
}

/** r^e con le frazioni, se si può: 4^{1/2} = 2, 8^{1/2} = 2√2; null se resta una potenza. */
function numPow(r: Rational, e: Rational): Ex | null {
  try {
    if (e.isInteger) return num(r.powInt(e.n))
    if (e.d > 64n) return null
    const q = Number(e.d)
    const n = exactRoot(r.n, q)
    const d = exactRoot(r.d, q)
    if (n !== null && d !== null) return num(new Rational(n, d).powInt(e.n))
    // Le radici quadrate: √8 = 2√2, √(1/2) = √2/2.
    if (q === 2 && r.sign > 0) {
      const p = r.powInt(e.n)
      const split = squareFree(p.n * p.d)
      if (!split || split.m === 1n) return null
      return { t: 'mul', c: new Rational(split.k, p.d), factors: [{ t: 'pow', base: num(new Rational(split.m)), exp: num(HALF) }] }
    }
    return null
  } catch (err) {
    if (err instanceof ExactUnavailable) return null
    throw err
  }
}

export function pow(b: Ex, e: Ex): Ex {
  if (e.t === 'num') {
    if (e.v.sign === 0) return num(1)
    if (e.v.n === 1n && e.v.d === 1n) return b
    if (b.t === 'num') {
      const exact = numPow(b.v, e.v)
      if (exact) return exact
    }
    // (x²)³ = x⁶; ma √(x²) resta così (è |x|). Con una base positiva sempre: √(e^{2x}) = eˣ.
    // Anche con le radici dispari, che si scambiano con le potenze (∛(x²)² = x^{4/3}), e dentro una radice
    // pari, dove la base è positiva (∛√x = x^{1/6}); √(x²) no.
    const oddRoot = b.t === 'pow' && b.exp.t === 'num' && (b.exp.v.d % 2n === 0n || e.v.d % 2n === 1n)
    if (b.t === 'pow' && (e.v.isInteger || oddRoot || (b.base.t === 'sym' && b.base.name === 'e') || (b.base.t === 'num' && b.base.v.sign > 0))) return pow(b.base, mul(b.exp, e))
    if (b.t === 'mul' && e.v.isInteger) return mul(numPow(b.c, e.v) ?? num(1), ...b.factors.map((f) => pow(f, e)))
  }
  if (isNum(b, 1)) return num(1)
  if (isNum(b, 0) && e.t === 'num' && e.v.sign > 0) return num(0)
  // e^{\ln u} = u, e^{3 \ln u} = u³
  if (b.t === 'sym' && b.name === 'e' && e.t === 'fn' && e.name === 'ln') return e.args[0]
  if (b.t === 'sym' && b.name === 'e' && e.t === 'mul' && e.factors.length === 1 && e.factors[0].t === 'fn' && e.factors[0].name === 'ln') return pow(e.factors[0].args[0], num(e.c))
  return { t: 'pow', base: b, exp: e }
}

/** sin(kπ) e cos(kπ) per i multipli di π/6 e π/4: i valori esatti. */
function trigOfPi(name: 'sin' | 'cos', a: Ex): Ex | null {
  let k: Rational
  if (a.t === 'sym' && a.name === 'π') k = ONE
  else if (a.t === 'mul' && a.factors.length === 1 && a.factors[0].t === 'sym' && a.factors[0].name === 'π') k = a.c
  else if (isNum(a, 0)) k = ZERO
  else return null
  // I multipli dispari di π/4: ±√2/2.
  const quarters = k.mul(R(4))
  if (quarters.isInteger && quarters.n % 2n !== 0n) {
    const quadrant = Number(((quarters.n % 8n) + 8n) % 8n) >> 1
    const sinSign = quadrant < 2 ? 1 : -1
    const cosSign = quadrant === 0 || quadrant === 3 ? 1 : -1
    return mul(num(R(name === 'sin' ? sinSign : cosSign, 2)), pow(num(2), num(HALF)))
  }
  // I multipli di π/6 (30°): dalla tabella, con il coseno come seno spostato di 90°.
  const sixths = k.mul(R(6))
  if (!sixths.isInteger) return null
  const m = Number(((sixths.n % 12n) + 12n) % 12n)
  const deg = ((name === 'sin' ? m * 30 : m * 30 + 90) % 360 + 360) % 360
  const root3 = (c: Rational) => mul(num(c), pow(num(3), num(HALF)))
  const table: Record<number, Ex> = {
    0: num(0),
    30: num(HALF),
    60: root3(HALF),
    90: num(1),
    120: root3(HALF),
    150: num(HALF),
    180: num(0),
    210: num(R(-1, 2)),
    240: root3(R(-1, 2)),
    270: num(-1),
    300: root3(R(-1, 2)),
    330: num(R(-1, 2)),
  }
  return table[deg] ?? null
}

const INVERSE_TRIG: Record<string, (x: number) => number> = { arcsin: Math.asin, arccos: Math.acos, arctan: Math.atan }

/** arcsin, arccos e arctan dei valori delle tabelle (1/2, √2/2, √3…): i multipli di π. */
function inverseTrigOfPi(name: string, a: Ex): Ex | null {
  if (symbols(a).length) return null
  let x: number
  try {
    x = floatOf(a)
  } catch {
    return null
  }
  const angle = INVERSE_TRIG[name](x)
  if (!Number.isFinite(angle)) return null
  for (const q of [1, 2, 3, 4, 6, 12]) {
    const p = Math.round((angle / Math.PI) * q)
    if (Math.abs(angle - (p * Math.PI) / q) < 1e-12) return mul(num(R(p, q)), sym('π'))
  }
  return null
}

/** Un'espressione che non è mai negativa (dove esiste): eˣ, x², √x, x² + 1, cosh x, |x|. */
function nonNegative(x: Ex): boolean {
  switch (x.t) {
    case 'num':
      return x.v.sign >= 0
    case 'sym':
      return x.name === 'π' || x.name === 'e'
    case 'pow':
      if (x.base.t === 'sym' && x.base.name === 'e') return true
      if (x.base.t === 'num' && x.base.v.sign > 0) return true
      // x², x^{-2}, x^{2/3}; √x e x^{3/2} esistono solo per x ≥ 0.
      if (x.exp.t === 'num' && (x.exp.v.n % 2n === 0n || x.exp.v.d % 2n === 0n)) return true
      return nonNegative(x.base)
    case 'mul':
      return x.c.sign > 0 && x.factors.every(nonNegative)
    case 'add':
      return x.terms.every(nonNegative)
    case 'fn':
      return x.name === 'abs' || x.name === 'cosh'
    default:
      return false
  }
}

export function fn(name: string, args: Ex[], base?: Ex): Ex {
  const a = args[0]
  switch (name) {
    case 'sqrt':
      return pow(a, num(HALF))
    case 'exp':
      return pow(sym('e'), a)
    case 'ln':
      if (isNum(a, 1)) return num(0)
      if (a.t === 'sym' && a.name === 'e') return num(1)
      if (a.t === 'pow' && a.base.t === 'sym' && a.base.name === 'e') return a.exp
      break
    case 'sin':
    case 'cos': {
      const exact = trigOfPi(name, a)
      if (exact) return exact
      break
    }
    case 'tan': {
      const s = trigOfPi('sin', a)
      const c = trigOfPi('cos', a)
      if (s && c && !isNum(c, 0)) return mul(s, pow(c, num(-1)))
      break
    }
    case 'arcsin':
    case 'arccos':
    case 'arctan': {
      const exact = inverseTrigOfPi(name, a)
      if (exact) return exact
      break
    }
    case 'sinh':
    case 'tanh':
    case 'arsinh':
    case 'artanh':
      if (isNum(a, 0)) return num(0)
      break
    case 'cosh':
      if (isNum(a, 0)) return num(1)
      break
    case 'abs':
      if (a.t === 'num') return num(a.v.abs())
      // |e^x| = e^x, |x² + 1| = x² + 1.
      if (nonNegative(a)) return a
      break
    case 'sgn':
      if (a.t === 'num') return num(a.v.sign)
      break
  }
  return base ? { t: 'fn', name, args, base } : { t: 'fn', name, args }
}

/** Mette `value` al posto della lettera `name` (e semplifica di nuovo). */
export function subst(x: Ex, name: string, value: Ex): Ex {
  const s = (e: Ex) => subst(e, name, value)
  switch (x.t) {
    case 'num':
      return x
    case 'sym':
      return x.name === name ? value : x
    case 'add':
      return add(...x.terms.map(s))
    case 'mul':
      return mul(num(x.c), ...x.factors.map(s))
    case 'pow':
      return pow(s(x.base), s(x.exp))
    case 'fn':
      return fn(x.name, x.args.map(s), x.base && s(x.base))
    case 'cases':
      if (x.rows.some((r) => r.cond && namesIn(r.cond).has(name))) throw new MathError('Le condizioni di una funzione a tratti restano con le lettere')
      return { t: 'cases', rows: x.rows.map((r) => ({ value: s(r.value), cond: r.cond })) }
    case 'int':
    case 'sum':
      return { ...x, from: s(x.from), to: s(x.to), body: x.v === name ? x.body : s(x.body) }
    case 'node':
      if (namesIn(x.node).has(name)) throw new MathError('Questa parte non si sa scrivere con le lettere')
      return x
  }
}

// ——— Le derivate ———

/** La derivata di `x` rispetto a `v`. */
export function derive(x: Ex, v: string): Ex {
  if (!dependsOn(x, v)) return num(0)
  switch (x.t) {
    case 'num':
      return num(0)
    case 'sym':
      return num(x.name === v ? 1 : 0)
    case 'add':
      return add(...x.terms.map((t) => derive(t, v)))
    case 'mul':
      // La regola del prodotto: (fg)' = f'g + fg'.
      return add(...x.factors.map((f, i) => mul(num(x.c), ...x.factors.slice(0, i), derive(f, v), ...x.factors.slice(i + 1))))
    case 'pow': {
      const { base, exp } = x
      if (!dependsOn(exp, v)) return mul(exp, pow(base, add(exp, num(-1))), derive(base, v))
      if (!dependsOn(base, v)) return mul(x, fn('ln', [base]), derive(exp, v))
      // u^w = e^{w ln u}: (u^w)' = u^w (w' ln u + w u'/u).
      return mul(x, add(mul(derive(exp, v), fn('ln', [base])), mul(exp, derive(base, v), pow(base, num(-1)))))
    }
    case 'fn':
      return deriveFn(x, v)
    case 'cases':
      return { t: 'cases', rows: x.rows.map((r) => ({ value: derive(r.value, v), cond: r.cond })) }
    case 'int': {
      // La funzione integrale: d/dx ∫_a^{b(x)} g(t) dt = g(b(x)) b'(x) − g(a(x)) a'(x).
      if (x.v !== v && dependsOn(x.body, v)) throw new MathError('La derivata di un integrale che dipende dalla variabile anche dentro non si sa fare')
      return sub(mul(subst(x.body, x.v, x.to), derive(x.to, v)), mul(subst(x.body, x.v, x.from), derive(x.from, v)))
    }
    case 'sum':
      if (dependsOn(x.from, v) || dependsOn(x.to, v)) throw new MathError('La derivata di una somma con gli estremi che cambiano non si sa fare')
      return { t: 'sum', v: x.v, from: x.from, to: x.to, body: derive(x.body, v) }
    case 'node':
      throw new MathError('Questa derivata non si sa fare con le lettere')
  }
}

function deriveFn(x: Extract<Ex, { t: 'fn' }>, v: string): Ex {
  if (x.args.length !== 1) throw new MathError(`Non so fare la derivata di ${fnLabel(x.name)}`)
  const u = x.args[0]
  const square = pow(u, num(2))
  const oneMinus = add(num(1), neg(square))
  let outer: Ex
  switch (x.name) {
    case 'sin':
      outer = fn('cos', [u])
      break
    case 'cos':
      outer = neg(fn('sin', [u]))
      break
    case 'tan':
      outer = pow(fn('cos', [u]), num(-2))
      break
    case 'cot':
      outer = neg(pow(fn('sin', [u]), num(-2)))
      break
    case 'sec':
      outer = mul(fn('sec', [u]), fn('tan', [u]))
      break
    case 'csc':
      outer = neg(mul(fn('csc', [u]), fn('cot', [u])))
      break
    case 'arcsin':
      outer = pow(oneMinus, num(R(-1, 2)))
      break
    case 'arccos':
      outer = neg(pow(oneMinus, num(R(-1, 2))))
      break
    case 'arctan':
      outer = pow(add(num(1), square), num(-1))
      break
    case 'arccot':
      outer = neg(pow(add(num(1), square), num(-1)))
      break
    case 'sinh':
      outer = fn('cosh', [u])
      break
    case 'cosh':
      outer = fn('sinh', [u])
      break
    case 'tanh':
      outer = pow(fn('cosh', [u]), num(-2))
      break
    case 'coth':
      outer = neg(pow(fn('sinh', [u]), num(-2)))
      break
    case 'arsinh':
      outer = pow(add(square, num(1)), num(R(-1, 2)))
      break
    case 'arcosh':
      outer = pow(add(square, num(-1)), num(R(-1, 2)))
      break
    case 'artanh':
      outer = pow(oneMinus, num(-1))
      break
    case 'ln':
      outer = pow(u, num(-1))
      break
    case 'log':
      outer = pow(mul(u, fn('ln', [x.base!])), num(-1))
      break
    case 'abs':
      outer = fn('sgn', [u])
      break
    case 'sgn':
    case 'floor':
    case 'ceil':
    case 'round':
      return num(0)
    default:
      throw new MathError(`Non so fare la derivata di ${fnLabel(x.name)}`)
  }
  return mul(outer, derive(u, v))
}

// ——— Dalle formule alle espressioni, e ritorno ———

/** Le operazioni con i campi di vettori. */
export const VECTOR_OPS = new Set(['grad', 'div', 'curl', 'lap', 'hess', 'jac'])

/** Le funzioni che si fanno solo con le lettere: il polinomio di Taylor. */
export const SYMBOLIC_FNS = new Set(['taylor', 'maclaurin'])

/** Le funzioni che con le lettere restano come sono (le derivate non si sanno fare, ma si scrivono). */
const KNOWN_FUNCTIONS = new Set([
  'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'arcsin', 'arccos', 'arctan', 'arccot', 'sinh', 'cosh', 'tanh', 'coth',
  'arsinh', 'arcosh', 'artanh', 'ln', 'abs', 'sgn', 'floor', 'ceil', 'round', 'max', 'min',
])

const MAX_DEPTH = 40

/** Le coordinate di un campo: (x, y) o (x, y, z). */
export function coordinates(n: number): string[] {
  return ['x', 'y', 'z'].slice(0, n)
}

class Converter {
  private depth = 0
  private inlined = 0
  /** Le lettere che qui sono variabili (quelle delle derivate, le coordinate), anche se la nota le definisce come numeri. */
  private variables = new Set<string>()

  constructor(private readonly scope: SymbolScope) {}

  /** Un'espressione dove `variables` restano lettere (i parametri di una curva), anche se la nota li definisce. */
  scalarWith(node: MathNode, variables: Iterable<string>): Ex {
    return this.withVariables(variables, () => this.scalar(node))
  }

  /** Converte con alcune lettere che restano variabili. */
  private withVariables<T>(names: Iterable<string>, run: () => T, keep = true): T {
    const saved = this.variables
    this.variables = new Set([...(keep ? saved : []), ...names])
    try {
      return run()
    } finally {
      this.variables = saved
    }
  }

  /** Un'espressione con un numero come valore. */
  scalar(node: MathNode, locals: ReadonlyMap<string, Ex> = new Map()): Ex {
    if (++this.depth > 800) throw new MathError('L\'espressione è troppo lunga')
    try {
      return this.convert(node, locals)
    } finally {
      this.depth--
    }
  }

  private convert(node: MathNode, locals: ReadonlyMap<string, Ex>): Ex {
    const s = (n: MathNode) => this.scalar(n, locals)
    switch (node.k) {
      case 'num':
        return num(Rational.decimal(node.text))
      case 'name': {
        const local = locals.get(node.name)
        if (local) return local
        if (node.name === 'π' || node.name === 'e' || this.variables.has(node.name)) return sym(node.name)
        if (this.scope.consts.has(node.name)) {
          const value = this.scope.consts.get(node.name)
          return value ? num(value) : sym(node.name)
        }
        const f = this.scope.fns.get(node.name)
        if (f) {
          // f da sola vuol dire f(x, y): la funzione con le sue variabili.
          if (isVectorBody(f.body)) throw new MathError(`${node.name} è un campo di vettori: qui va un numero`)
          return this.inline(node.name, f.params.map(sym))
        }
        return sym(node.name)
      }
      case 'neg':
        return neg(s(node.a))
      case 'bin': {
        if (node.cross) throw new MathError('Il prodotto vettoriale dà un vettore: qui va un numero')
        const split = productPower(node, (n) => this.scope.fns.has(n) && !locals.has(n) && !this.variables.has(n))
        if (split) return s(split)
        const a = s(node.a)
        const b = s(node.b)
        switch (node.op) {
          case '+':
            return add(a, b)
          case '-':
            return sub(a, b)
          case '*':
            return mul(a, b)
          case '/':
            return mul(a, pow(b, num(-1)))
          case '^':
            return pow(a, b)
        }
        break
      }
      case 'fn':
        return this.fnNode(node, locals)
      case 'apply': {
        const f = this.scope.fns.get(node.name)
        if (!f || locals.has(node.name) || this.variables.has(node.name)) {
          // a(x + 1) con a un numero, x(x + 1) con x la variabile: un prodotto.
          if (node.primes) throw new MathError(`${node.name} non è una funzione definita`)
          if ((this.scope.consts.has(node.name) || locals.has(node.name) || this.variables.has(node.name)) && node.args.length === 1) return mul(s({ k: 'name', name: node.name }), s(node.args[0]))
          throw new UndefinedName(node.name)
        }
        if (f.params.length !== node.args.length) throw new MathError(`${node.name} vuole ${f.params.length === 1 ? 'un valore' : `${f.params.length} valori`}`)
        if (isVectorBody(f.body)) throw new MathError(`${node.name} è un campo di vettori: qui va un numero`)
        const args = node.args.map(s)
        if (!node.primes) return this.inline(node.name, args)
        if (f.params.length !== 1) throw new MathError(`La derivata ${node.name}' si sa fare solo per le funzioni di una variabile: per le altre ci sono le derivate parziali`)
        let d = this.inline(node.name, f.params.map(sym))
        for (let i = 0; i < node.primes; i++) d = derive(d, f.params[0])
        return subst(d, f.params[0], args[0])
      }
      case 'post': {
        const a = s(node.a)
        if (node.op === '%') return mul(a, num(R(1, 100)))
        if (node.op === '°') return mul(a, sym('π'), num(R(1, 180)))
        return { t: 'node', node }
      }
      case 'abs':
        return fn('abs', [s(node.a)])
      case 'floor':
      case 'ceil':
        return fn(node.k, [s(node.a)])
      case 'big':
        if (node.op === 'sum') {
          const inner = new Map(locals)
          inner.delete(node.v)
          return { t: 'sum', v: node.v, from: s(node.from), to: s(node.to), body: this.scalar(node.body, inner) }
        }
        return { t: 'node', node }
      case 'int': {
        const inner = new Map(locals)
        inner.delete(node.v)
        return { t: 'int', v: node.v, from: s(node.from), to: s(node.to), body: this.scalar(node.body, inner) }
      }
      case 'prim': {
        // \int f(x) \, dx: una primitiva (senza la costante).
        const inner = new Map(locals)
        inner.delete(node.v)
        const body = this.withVariables([node.v], () => this.scalar(node.body, inner))
        const F = primitive(body, node.v)
        if (!F) throw new MathError('Non so trovare la primitiva di questa funzione')
        return F
      }
      case 'cases':
        return { t: 'cases', rows: node.rows.map((r) => ({ value: s(r.value), cond: r.cond })) }
      case 'diff':
        return this.derivative(node, locals)
      case 'tuple':
      case 'matrix':
        throw new MathError('È un vettore: qui va un numero')
      case 'binom':
      case 'mint':
      case 'lint':
      case 'sint':
      case 'lim':
        return { t: 'node', node }
      default:
        throw new MathError('Questa espressione non si sa scrivere con le lettere')
    }
    throw new MathError('Espressione non valida')
  }

  /** f(a, b): il corpo di f con a e b al posto delle sue variabili. */
  private inline(name: string, args: Ex[]): Ex {
    const f = this.scope.fns.get(name)!
    if (++this.inlined > MAX_DEPTH) throw new MathError(`${name} usa sé stessa`)
    try {
      // Dentro f valgono le sue variabili, non quelle di fuori.
      return this.withVariables([], () => this.scalar(f.body, new Map(f.params.map((p, i) => [p, args[i]]))), false)
    } finally {
      this.inlined--
    }
  }

  private fnNode(node: Extract<MathNode, { k: 'fn' }>, locals: ReadonlyMap<string, Ex>): Ex {
    const s = (n: MathNode) => this.scalar(n, locals)
    if (VECTOR_OPS.has(node.name)) {
      const value = this.operator(node, locals)
      if (Array.isArray(value)) throw new MathError(node.name === 'grad' ? 'Il gradiente è un vettore: qui va un numero' : 'Qui va un numero, non un vettore')
      return value
    }
    if (SYMBOLIC_FNS.has(node.name)) return this.taylor(node, locals)
    let out: Ex
    if (node.name === 'log' && node.base) out = mul(fn('ln', [s(node.args[0])]), pow(fn('ln', [s(node.base)]), num(-1)))
    else if (node.name === 'lg') out = mul(fn('ln', [s(node.args[0])]), pow(fn('ln', [num(10)]), num(-1)))
    else if (node.name === 'root') out = pow(s(node.args[0]), pow(s(node.base!), num(-1)))
    else if (node.name === 'log' || node.name === 'ln') out = fn('ln', [s(node.args[0])])
    else if (node.name === 'sqrt' || node.name === 'exp') out = fn(node.name, [s(node.args[0])])
    else if (KNOWN_FUNCTIONS.has(node.name)) out = fn(node.name, node.args.map(s))
    else return { t: 'node', node }
    return node.pow ? pow(out, s(node.pow)) : out
  }

  /**
   * Il polinomio di Taylor di f di ordine n in x₀: \operatorname{taylor}(f(x), x_0, n), o
   * \operatorname{maclaurin}(f(x), n) in 0. Le potenze dalla più bassa, come nei libri.
   */
  private taylor(node: Extract<MathNode, { k: 'fn' }>, locals: ReadonlyMap<string, Ex>): Ex {
    const maclaurin = node.name === 'maclaurin'
    const usage = maclaurin ? '\\operatorname{maclaurin}(f(x), n)' : '\\operatorname{taylor}(f(x), x_0, n)'
    if (node.args.length !== (maclaurin ? 2 : 3)) throw new MathError(`Si scrive ${usage}`)
    const [fn, center, order] = maclaurin ? [node.args[0], null, node.args[1]] : node.args
    const nEx = this.scalar(order, locals)
    if (nEx.t !== 'num' || !nEx.v.isInteger || nEx.v.sign < 0 || nEx.v.n > 20n) throw new MathError('L\'ordine del polinomio è un numero intero da 0 a 20')
    const n = Number(nEx.v.n)
    const a = center ? this.scalar(center, locals) : num(0)
    if (symbols(a).some((s) => s !== 'π' && s !== 'e')) throw new MathError('Il punto del polinomio di Taylor è un numero')
    // La variabile: x, o l'unica lettera della funzione.
    let f = this.withVariables(['x'], () => this.scalar(fn, locals))
    const free = symbols(f).filter((s) => s !== 'π' && s !== 'e')
    const v = free.includes('x') || !free.length ? 'x' : free.length === 1 ? free[0] : null
    if (!v) throw new MathError(`Di quale variabile? La funzione ne ha più di una (${free.join(', ')})`)
    const shift = isNum(a, 0) ? sym(v) : sub(sym(v), a)
    const terms: Ex[] = []
    let factorial = ONE
    for (let k = 0; k <= n; k++) {
      if (k > 0) {
        f = derive(f, v)
        factorial = factorial.mul(new Rational(BigInt(k)))
      }
      const c = mul(subst(f, v, a), num(new Rational(1n, 1n).div(factorial)))
      if (!isNum(c, 0)) terms.push(mul(c, pow(shift, num(k))))
    }
    if (!terms.length) return num(0)
    // Dalla potenza più bassa: un nodo già scritto, che le semplificazioni non riordinano.
    let out = node0(terms[0])
    for (const t of terms.slice(1)) out = isNegative(t) ? { k: 'bin', op: '-', a: out, b: node0(neg(t)) } : { k: 'bin', op: '+', a: out, b: node0(t) }
    return { t: 'node', node: out }
  }

  /** \frac{\partial^2 f}{\partial x \partial y}, \frac{d}{dx}(…), f nel punto: \frac{\partial f}{\partial x}(1, 2). */
  private derivative(node: Extract<MathNode, { k: 'diff' }>, locals: ReadonlyMap<string, Ex>): Ex {
    const at = this.atPoint(node.body)
    if (at) {
      let d = this.inline(at.name, at.params.map(sym))
      for (const v of node.vars) d = derive(d, v)
      return at.params.reduce((e, p, i) => subst(e, p, at.args[i]), d)
    }
    const bare = node.body.k === 'name' ? node.body.name : null
    if (bare && !locals.has(bare) && !this.scope.fns.has(bare) && !node.vars.includes(bare)) throw new UndefinedName(bare)
    let body = this.withVariables(node.vars, () => this.scalar(node.body, locals))
    for (const v of node.vars) body = derive(body, v)
    return body
  }

  /**
   * Una funzione definita calcolata in un punto (f(1, 2), con numeri): sotto una derivata vuol dire
   * «la derivata di f, in quel punto». Null se non lo è.
   */
  private atPoint(node: MathNode): { name: string; params: string[]; args: Ex[] } | null {
    if (node.k !== 'apply' || node.primes) return null
    const f = this.scope.fns.get(node.name)
    if (!f || f.params.length !== node.args.length) return null
    const args = node.args.map((a) => this.scalar(a))
    if (args.some((a) => symbols(a).some((n) => n !== 'π' && n !== 'e'))) return null
    return { name: node.name, params: f.params, args }
  }

  /** Il valore di un vettore: (P, Q), un campo definito (F, F(x, y)), il gradiente, il rotore. */
  vector(node: MathNode, locals: ReadonlyMap<string, Ex> = new Map()): { value: Ex[]; vars: string[] } {
    if (node.k === 'tuple') return { value: node.items.map((n) => this.scalar(n, locals)), vars: coordinates(node.items.length) }
    if (node.k === 'matrix' && node.rows.every((r) => r.length === 1)) return { value: node.rows.map((r) => this.scalar(r[0], locals)), vars: coordinates(node.rows.length) }
    if (node.k === 'name' || (node.k === 'apply' && !node.primes)) {
      const field = this.scope.fns.get(fieldName(node.name, this.scope))
      if (field && isVectorBody(field.body)) {
        const body = vectorItems(field.body)
        if (node.k === 'name') return { value: body.map((n) => this.scalar(n, new Map(field.params.map((p) => [p, sym(p)])))), vars: field.params }
        if (node.args.length !== field.params.length) throw new MathError(`${node.name} vuole ${field.params.length} valori`)
        const args = node.args.map((a) => this.scalar(a, locals))
        const inner = new Map(field.params.map((p, i) => [p, args[i]]))
        return { value: body.map((n) => this.scalar(n, inner)), vars: field.params }
      }
    }
    if (node.k === 'fn' && (node.name === 'grad' || node.name === 'curl')) {
      const value = this.operator(node, locals)
      if (Array.isArray(value) && !value.some((v) => Array.isArray(v))) return { value: value as Ex[], vars: coordinates(value.length) }
    }
    throw new MathError('Qui va un campo di vettori: (P, Q), oppure F definito come F(x, y) = (…)')
  }

  /** Gradiente, divergenza, rotore, laplaciano, hessiana e jacobiana. */
  operator(node: Extract<MathNode, { k: 'fn' }>, locals: ReadonlyMap<string, Ex>): Ex | Ex[] | Ex[][] {
    return this.withVariables(['x', 'y', 'z'], () => this.operatorValue(node, locals))
  }

  private operatorValue(node: Extract<MathNode, { k: 'fn' }>, locals: ReadonlyMap<string, Ex>): Ex | Ex[] | Ex[][] {
    if (node.args.length !== 1) throw new MathError(`${operatorName(node.name)} vuole una funzione sola`)
    const arg = node.args[0]
    if (node.name === 'grad' || node.name === 'lap' || node.name === 'hess') {
      const { f, vars, at } = this.scalarField(arg, locals)
      let value: Ex | Ex[] | Ex[][]
      if (node.name === 'grad') value = vars.map((v) => derive(f, v))
      else if (node.name === 'lap') value = add(...vars.map((v) => derive(derive(f, v), v)))
      else value = vars.map((a) => vars.map((b) => derive(derive(f, a), b)))
      return at ? atValues(value, vars, at) : value
    }
    // \operatorname{div} F(1, 2, 3): la divergenza nel punto.
    const point = arg.k === 'apply' ? this.fieldAtPoint(arg) : null
    const { value: F, vars } = point ? point.field : this.vector(arg, locals)
    let value: Ex | Ex[] | Ex[][]
    if (node.name === 'div') {
      if (F.length !== vars.length) throw new MathError('La divergenza vuole tante componenti quante variabili')
      value = add(...F.map((c, i) => derive(c, vars[i])))
    } else if (node.name === 'jac') value = F.map((c) => vars.map((v) => derive(c, v)))
    else if (F.length === 2) value = sub(derive(F[1], vars[0]), derive(F[0], vars[1]))
    else if (F.length === 3) {
      const [P, Q, R3] = F
      const [x, y, z] = vars
      value = [sub(derive(R3, y), derive(Q, z)), sub(derive(P, z), derive(R3, x)), sub(derive(Q, x), derive(P, y))]
    } else throw new MathError('Il rotore si fa per i campi del piano e dello spazio')
    return point ? atValues(value, vars, point.args) : value
  }

  /** Il campo F di F(1, 2, 3) (con i numeri: il punto dove calcolare), o null. */
  private fieldAtPoint(node: Extract<MathNode, { k: 'apply' }>): { field: { value: Ex[]; vars: string[] }; args: Ex[] } | null {
    const field = this.scope.fns.get(fieldName(node.name, this.scope))
    if (!field || !isVectorBody(field.body) || node.args.length !== field.params.length) return null
    const args = node.args.map((a) => this.scalar(a))
    if (args.some((a) => symbols(a).some((n) => n !== 'π' && n !== 'e'))) return null
    return { field: this.vector({ k: 'name', name: node.name }), args }
  }

  /** La funzione di un gradiente o di un laplaciano: f (con le sue variabili), f(1, 2) (in un punto) o un'espressione in x, y, z. */
  private scalarField(node: MathNode, locals: ReadonlyMap<string, Ex>): { f: Ex; vars: string[]; at: Ex[] | null } {
    const point = this.atPoint(node)
    if (point) return { f: this.inline(point.name, point.params.map(sym)), vars: point.params, at: point.args }
    if (node.k === 'name' && this.scope.fns.has(node.name) && !locals.has(node.name)) {
      const f = this.scope.fns.get(node.name)!
      return { f: this.scalar(node, locals), vars: f.params, at: null }
    }
    if (node.k === 'apply' && node.args.every((a) => a.k === 'name')) {
      return { f: this.scalar(node, locals), vars: node.args.map((a) => (a as { name: string }).name), at: null }
    }
    const f = this.scalar(node, locals)
    const free = symbols(f).filter((n) => n !== 'π' && n !== 'e')
    const vars = free.includes('z') ? ['x', 'y', 'z'] : free.some((n) => n === 'x' || n === 'y') ? ['x', 'y'] : free
    if (!vars.length) throw new MathError('Manca la funzione: scrivi le variabili, come \\nabla (x^2 + y^2)')
    return { f, vars, at: null }
  }
}

/** Il nome di un campo definito: \vec{F} usa F, se è definito così. */
function fieldName(name: string, scope: SymbolScope): string {
  if (scope.fns.has(name)) return name
  const plain = name.replace(/⃗/g, '')
  return scope.fns.has(plain) ? plain : name
}

/** Un corpo con i valori vettori: (P, Q, R) o un vettore colonna. */
export function isVectorBody(node: MathNode): boolean {
  return (node.k === 'tuple' && node.items.length >= 2) || (node.k === 'matrix' && node.rows.length >= 2 && node.rows.every((r) => r.length === 1))
}

function vectorItems(node: MathNode): MathNode[] {
  return node.k === 'tuple' ? node.items : node.k === 'matrix' ? node.rows.map((r) => r[0]) : [node]
}

function operatorName(name: string): string {
  return { grad: 'Il gradiente', div: 'La divergenza', curl: 'Il rotore', lap: 'Il laplaciano', hess: 'L\'hessiana', jac: 'La jacobiana' }[name] ?? name
}

/** Un valore (numero, vettore o matrice) con i numeri del punto al posto delle variabili. */
function atValues(value: Ex | Ex[] | Ex[][], vars: string[], args: Ex[]): Ex | Ex[] | Ex[][] {
  const at = (e: Ex) => vars.reduce((x, v, i) => subst(x, v, args[i]), e)
  if (!Array.isArray(value)) return at(value)
  return (value as (Ex | Ex[])[]).map((row) => (Array.isArray(row) ? row.map(at) : at(row))) as Ex[] | Ex[][]
}

/** C'è qualcosa da fare con le lettere: una derivata (f'(x), \frac{d}{dx}, \partial), un gradiente, una divergenza…? */
export function hasCalculus(node: MathNode): boolean {
  let found = false
  const visit = (n: MathNode): void => {
    if (found) return
    if (n.k === 'diff' || n.k === 'prim' || (n.k === 'apply' && n.primes > 0) || (n.k === 'fn' && (VECTOR_OPS.has(n.name) || SYMBOLIC_FNS.has(n.name)))) {
      found = true
      return
    }
    for (const c of children(n)) visit(c)
  }
  visit(node)
  return found
}

/**
 * Il valore con le lettere di una formula con derivate e operatori: un'espressione, un vettore
 * (tuple) o una matrice, da scrivere (se restano lettere) o da calcolare con i numeri.
 */
export function symbolicValue(node: MathNode, scope: SymbolScope, decimal = false): MathNode {
  const c = new Converter(scope)
  if (node.k === 'fn' && VECTOR_OPS.has(node.name)) return valueNode(c.operator(node, new Map()), decimal)
  if ((node.k === 'name' || (node.k === 'apply' && !node.primes)) && isField(node.name, scope)) return valueNode(c.vector(node).value, decimal)
  if (node.k === 'tuple') return { k: 'tuple', items: node.items.map((n) => toNode(c.scalar(n), decimal)) }
  return toNode(c.scalar(node), decimal)
}

/** Le funzioni con tutte le derivate dove sono definite: per de l'Hôpital (|x|, ⌊x⌋ e i tratti no). */
const SMOOTH_FUNCTIONS = new Set([
  'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'arcsin', 'arccos', 'arctan', 'arccot', 'sinh', 'cosh', 'tanh', 'coth', 'arsinh', 'arcosh', 'artanh', 'ln', 'log',
])

function smooth(x: Ex): boolean {
  switch (x.t) {
    case 'num':
    case 'sym':
      return true
    case 'add':
      return x.terms.every(smooth)
    case 'mul':
      return x.factors.every(smooth)
    case 'pow':
      return smooth(x.base) && smooth(x.exp)
    case 'fn':
      return SMOOTH_FUNCTIONS.has(x.name) && x.args.every(smooth) && (!x.base || smooth(x.base))
    default:
      return false
  }
}

/** Il valore con i numeri di un'espressione senza lettere (solo π ed e). */
function floatOf(x: Ex): number {
  return compile(toNode(x), EMPTY_SCOPE)({})
}

/** Zero o no, nel punto: con le frazioni è sicuro; con i numeri solo se è chiaramente diverso da zero (null se non si sa). */
function zeroAt(x: Ex): boolean | null {
  if (x.t === 'num') return x.v.sign === 0
  const value = floatOf(x)
  return Number.isFinite(value) && Math.abs(value) > 1e-9 ? false : null
}

/**
 * Il limite in un punto di una frazione che lì fa 0/0, con le derivate fatte con le lettere (de
 * l'Hôpital, cioè i polinomi di Taylor): al primo ordine in cui il denominatore non si annulla, il
 * rapporto delle derivate. Esatto, anche dove con i numeri le cifre si perdono ((\tan x − x)/x³ fa
 * 1/3). Null se non si sa così: il punto all'infinito, funzioni non lisce (|x|, ⌊x⌋), un limite
 * infinito, derivate che nel punto non danno un numero; allora restano i numeri.
 */
export function zeroOverZero(body: MathNode, v: string, to: MathNode, scope: SymbolScope): { value: number; exact: Rational | null } | null {
  if (body.k !== 'bin' || body.op !== '/') return null
  try {
    const c = new Converter(scope)
    const a = c.scalar(to)
    const constant = (x: Ex, extra?: string) => symbols(x).every((s) => s === 'π' || s === 'e' || s === extra)
    if (!constant(a)) return null
    let f = c.scalarWith(body.a, [v])
    let g = c.scalarWith(body.b, [v])
    if (!smooth(f) || !smooth(g) || !constant(f, v) || !constant(g, v)) return null
    for (let k = 0; k <= 8; k++) {
      if (k) {
        f = derive(f, v)
        g = derive(g, v)
        // Le derivate si allungano a ogni passo: oltre un certo punto, meglio i numeri.
        if (key(f).length + key(g).length > 20000) return null
      }
      const top = zeroAt(subst(f, v, a))
      const bottom = zeroAt(subst(g, v, a))
      if (top === null || bottom === null) return null
      if (!bottom) {
        // Al primo passo non è 0/0 (basta la funzione nel punto).
        if (!k) return null
        const q = tidy(mul(subst(f, v, a), pow(subst(g, v, a), num(-1))))
        const value = floatOf(q)
        return Number.isFinite(value) ? { value, exact: q.t === 'num' ? q.v : null } : null
      }
      // Il numeratore si annulla meno volte del denominatore: va all'infinito (lo dicono i numeri).
      if (!top) return null
    }
    return null
  } catch {
    return null
  }
}

/**
 * Per un integrale definito: la primitiva della funzione e gli estremi con le lettere (null per ±∞);
 * null se la primitiva non si trova. Che F(b) − F(a) sia giusto (F continua tra gli estremi) lo
 * controlla chi chiama, con i numeri.
 */
export function definiteParts(node: Extract<MathNode, { k: 'int' }>, scope: SymbolScope): { F: Ex; a: Ex | null; b: Ex | null } | null {
  const infinite = (n: MathNode) => n.k === 'infty' || (n.k === 'neg' && n.a.k === 'infty') || (n.k === 'bin' && n.op === '+' && n.b.k === 'infty')
  try {
    const c = new Converter(scope)
    const F = primitive(c.scalarWith(node.body, [node.v]), node.v)
    if (!F) return null
    return { F, a: infinite(node.from) ? null : c.scalar(node.from), b: infinite(node.to) ? null : c.scalar(node.to) }
  } catch {
    return null
  }
}

/**
 * La funzione di una variabile di \operatorname{studio}(f): una f della nota (con la sua variabile), f(x)
 * o un'espressione (nella x, o nell'unica lettera che ha); `name` per scriverla (f se non ha un nome).
 */
export function functionOf(node: MathNode, scope: SymbolScope): { f: Ex; v: string; name: string } | null {
  const c = new Converter(scope)
  try {
    const named = node.k === 'name' || (node.k === 'apply' && !node.primes && node.args.length === 1 && node.args[0].k === 'name')
    const def = named ? scope.fns.get((node as { name: string }).name) : undefined
    if (def && (node.k === 'name' || node.k === 'apply')) {
      if (def.params.length !== 1 || isVectorBody(def.body)) return null
      const v = node.k === 'apply' ? (node.args[0] as { name: string }).name : def.params[0]
      return { f: c.scalarWith({ k: 'apply', name: node.name, args: [{ k: 'name', name: v }], primes: 0 }, [v]), v, name: node.name }
    }
    const f = c.scalarWith(node, ['x'])
    const free = symbols(f).filter((s) => s !== 'π' && s !== 'e')
    const v = free.includes('x') || !free.length ? 'x' : free.length === 1 ? free[0] : null
    if (!v) return null
    return { f: v === 'x' ? f : c.scalarWith(node, [v]), v, name: 'f' }
  } catch {
    return null
  }
}

/** La derivata di `body` rispetto a `v`, con le lettere `variables` che restano variabili (i parametri di una curva). */
export function partialDerivative(body: MathNode, v: string, variables: string[], scope: SymbolScope): MathNode {
  return toNode(derive(new Converter(scope).scalarWith(body, variables), v))
}

function isField(name: string, scope: SymbolScope): boolean {
  const f = scope.fns.get(fieldName(name, scope))
  return !!f && isVectorBody(f.body)
}

/** La formula usa le derivate, gli operatori dei campi o i campi definiti in un punto (F(1, 2))? */
export function needsSymbols(node: MathNode, scope: SymbolScope): boolean {
  let found = false
  const visit = (n: MathNode): void => {
    if (found) return
    if (n.k === 'diff' || n.k === 'prim' || (n.k === 'apply' && n.primes > 0) || (n.k === 'fn' && (VECTOR_OPS.has(n.name) || SYMBOLIC_FNS.has(n.name)))) found = true
    else if ((n.k === 'apply' || n.k === 'name') && isField(n.name, scope)) found = true
    else children(n).forEach(visit)
  }
  visit(node)
  return found
}

/**
 * La formula con le derivate e gli operatori già fatti con le lettere (dove si può: il resto lo fanno
 * i numeri), e con i campi in un punto al posto di F(1, 2): così si calcola come le altre.
 */
export function expandCalculus(node: MathNode, scope: SymbolScope, decimal = false): MathNode {
  const c = new Converter(scope)
  const attempt = (n: MathNode, run: () => MathNode): MathNode => {
    try {
      return run()
    } catch {
      return mapNode(n, visit)
    }
  }
  const visit = (n: MathNode): MathNode => {
    if (n.k === 'diff' || n.k === 'prim' || (n.k === 'apply' && n.primes > 0) || (n.k === 'fn' && SYMBOLIC_FNS.has(n.name))) return attempt(n, () => toNode(c.scalar(n), decimal))
    if (n.k === 'fn' && VECTOR_OPS.has(n.name)) return attempt(n, () => valueNode(c.operator(n, new Map()), decimal))
    if (n.k === 'apply' && !n.primes && isField(n.name, scope)) return attempt(n, () => valueNode(c.vector(n).value, decimal))
    return mapNode(n, visit)
  }
  return visit(node)
}

/** L'espressione con le lettere di una formula (le `variables` restano lettere anche se la nota le definisce). */
export function exOf(node: MathNode, scope: SymbolScope, variables: Iterable<string> = []): Ex {
  return new Converter(scope).scalarWith(node, variables)
}

/** Lo stesso nodo con i figli cambiati da `f`. */
export function mapNode(n: MathNode, f: (c: MathNode) => MathNode): MathNode {
  switch (n.k) {
    case 'num':
    case 'name':
    case 'infty':
      return n
    case 'neg':
    case 'post':
    case 'abs':
    case 'floor':
    case 'ceil':
      return { ...n, a: f(n.a) }
    case 'bin':
      return { ...n, a: f(n.a), b: f(n.b) }
    case 'fn':
      return { ...n, args: n.args.map(f), ...(n.pow && { pow: f(n.pow) }), ...(n.base && { base: f(n.base) }) }
    case 'apply':
      return { ...n, args: n.args.map(f) }
    case 'binom':
      return { ...n, n: f(n.n), r: f(n.r) }
    case 'big':
    case 'int':
      return { ...n, from: f(n.from), to: f(n.to), body: f(n.body) }
    case 'mint':
      return { ...n, domain: f(n.domain), body: f(n.body) }
    case 'set':
      return { ...n, cond: f(n.cond) }
    case 'cases':
      return { ...n, rows: n.rows.map((r) => ({ value: f(r.value), cond: r.cond && f(r.cond) })) }
    case 'matrix':
      return { ...n, rows: n.rows.map((r) => r.map(f)) }
    case 'tuple':
    case 'rel':
    case 'and':
    case 'or':
      return { ...n, items: n.items.map(f) }
    case 'in':
      return { ...n, a: f(n.a), lo: f(n.lo), hi: f(n.hi) }
    case 'diff':
    case 'lint':
    case 'sint':
    case 'prim':
      return { ...n, body: f(n.body) }
    case 'lim':
      return { ...n, to: f(n.to), body: f(n.body) }
    case 'prob':
      return { ...n, event: f(n.event), given: n.given && f(n.given) }
    case 'expect':
      return { ...n, a: f(n.a) }
    case 'dist':
      return { ...n, params: n.params.map(f) }
  }
}

/**
 * Una relazione lineare F = 0 nelle incognite: i coefficienti delle incognite e il termine noto,
 * [a₁, …, aₙ, c] con a₁x₁ + … + aₙxₙ = c; null se non è lineare (o i coefficienti non sono frazioni).
 */
export function linearCoefficients(F: MathNode, unknowns: string[], scope: SymbolScope): Rational[] | null {
  try {
    const f = new Converter(scope).scalarWith(F, unknowns)
    const row: Rational[] = []
    for (const u of unknowns) {
      const d = derive(f, u)
      if (d.t !== 'num') return null
      row.push(d.v)
    }
    let c = f
    for (const u of unknowns) c = subst(c, u, num(0))
    return c.t === 'num' ? [...row, c.v.neg()] : null
  } catch {
    return null
  }
}

/** I valori di un campo di vettori (F, (P, Q), \nabla f) con le lettere, e le sue variabili. */
export function symbolicField(node: MathNode, scope: SymbolScope): { value: MathNode[]; vars: string[] } {
  const { value, vars } = new Converter(scope).vector(node)
  return { value: value.map((e) => toNode(e)), vars }
}

function valueNode(value: Ex | Ex[] | Ex[][], decimal: boolean): MathNode {
  if (!Array.isArray(value)) return toNode(value, decimal)
  if (value.length && Array.isArray(value[0])) return { k: 'matrix', rows: (value as Ex[][]).map((r) => r.map((e) => toNode(e, decimal))) }
  return { k: 'tuple', items: (value as Ex[]).map((e) => toNode(e, decimal)) }
}

// ——— Di nuovo una formula, da scrivere come nei libri ———

const NUM = (v: number | bigint): MathNode => ({ k: 'num', v: Number(v), text: String(v), comma: false })
const NAME = (name: string): MathNode => ({ k: 'name', name })
const times = (a: MathNode, b: MathNode): MathNode => ({ k: 'bin', op: '*', a, b, implicit: true })
const product = (xs: MathNode[]): MathNode => xs.reduce((a, b) => times(a, b))

/** Come si scrivono i numeri: con le frazioni o (`decimal`, se chi scrive usa i decimali) con la virgola. */
let decimals = false

/** Il numero con la virgola, se le cifre finiscono (3/5 = 0,6); se no null. */
function decimalText(r: Rational): string | null {
  let d = r.d
  let twos = 0
  let fives = 0
  while (d % 2n === 0n) {
    d /= 2n
    twos++
  }
  while (d % 5n === 0n) {
    d /= 5n
    fives++
  }
  if (d !== 1n) return null
  const digits = Math.max(twos, fives)
  const scaled = (r.n < 0n ? -r.n : r.n) * 10n ** BigInt(digits) / r.d
  const text = scaled.toString().padStart(digits + 1, '0')
  return digits ? `${text.slice(0, -digits)}.${text.slice(-digits)}` : text
}

function rationalNode(r: Rational): MathNode {
  const n = r.n < 0n ? -r.n : r.n
  const text = decimals && r.d !== 1n ? decimalText(r) : null
  const out: MathNode = text
    ? { k: 'num', v: Number(text), text, comma: true }
    : r.d === 1n
      ? NUM(n)
      : { k: 'bin', op: '/', a: NUM(n), b: NUM(r.d), frac: true }
  return r.n < 0n ? { k: 'neg', a: out } : out
}

/** Il segno meno davanti: −3x è negativo, così nelle somme si scrive con il −. */
function isNegative(x: Ex): boolean {
  return (x.t === 'num' && x.v.sign < 0) || (x.t === 'mul' && x.c.sign < 0)
}

/** Una potenza con l'esponente negativo (che va sotto la frazione): x^{-2} → x^2. */
function denominatorPart(f: Ex): Ex | null {
  if (f.t !== 'pow' || f.exp.t !== 'num' || f.exp.v.sign >= 0) return null
  // e^{-x} resta così, come nei libri.
  if (f.base.t === 'sym' && f.base.name === 'e') return null
  return pow(f.base, num(f.exp.v.neg()))
}

/** Di nuovo una formula; con `decimal` i numeri con la virgola (se chi scrive li usa). */
export function toNode(x: Ex, decimal = false): MathNode {
  const saved = decimals
  decimals = decimal
  try {
    const out = node(tidy(x))
    // Una funzione razionale scritta più semplice, se lo è: −1/(x²(1/x² + 1)) = −1/(x² + 1).
    const simpler = rationalForm(x)
    if (simpler) {
      const other = node(tidy(simpler))
      if (toLatex(other).length < toLatex(out).length) return other
    }
    return out
  } finally {
    decimals = saved
  }
}

/**
 * Una funzione razionale di una lettera come N/D: il numeratore sviluppato (con i fattori comuni
 * fuori), il denominatore come prodotto di potenze di fattori senza quadrati ((x² − 1)³). Null se non lo è.
 */
function rationalForm(x: Ex): Ex | null {
  if (x.t !== 'mul' && x.t !== 'add') return null
  const letters = symbols(x).filter((n) => n !== 'π' && n !== 'e')
  if (letters.length !== 1) return null
  const v = letters[0]
  const r = asFraction(x, v)
  if (!r || r.D.length <= 1) return null
  const lead = r.D[r.D.length - 1]
  let N = polyEx(r.N.map((c) => c.div(lead)), v)
  if (N.t === 'add' && N.terms.every(isNegative)) {
    const positive = add(...N.terms.map(neg))
    N = mul(num(-1), (positive.t === 'add' ? commonMonomial(positive) : null) ?? positive)
  } else if (N.t === 'add') N = commonMonomial(N) ?? N
  const D = mul(...squareFreeFactors(r.D).map(({ p, m }) => pow(polyEx(p, v), num(m))))
  return mul(N, pow(D, num(-1)))
}

// ——— In ordine, come nei libri ———

/** Le frazioni sommate con un denominatore solo, e i polinomi dal grado più alto. */
export function tidy(x: Ex): Ex {
  const together = combine(x)
  if (together.t === 'add') return factorOut(together)
  if (together.t === 'mul' && together.factors.some((f) => f.t === 'add')) {
    return { ...together, factors: together.factors.map((f) => (f.t === 'add' ? lead(ordered(f)) : f)) }
  }
  return together
}

/** Prima un termine con il più, se c'è: 1 − x², non −x² + 1. */
function lead(x: Ex): Ex {
  if (x.t !== 'add' || !isNegative(x.terms[0])) return x
  const i = x.terms.findIndex((t) => !isNegative(t))
  return i < 0 ? x : { t: 'add', terms: [x.terms[i], ...x.terms.filter((_, j) => j !== i)] }
}

/**
 * Fuori il fattore che hanno tutti i termini, se non è un polinomio (un esponenziale, un seno, una
 * somma): e^{-x} − x e^{-x} = (1 − x) e^{-x}.
 */
function factorOut(x: Extract<Ex, { t: 'add' }>): Ex {
  const factorsOf = (t: Ex): Ex[] => (t.t === 'mul' ? t.factors : t.t === 'num' ? [] : [t])
  const exponent = (f: Ex): [Ex, Rational | null] => (f.t === 'pow' && f.exp.t === 'num' && f.exp.v.sign > 0 ? [f.base, f.exp.v] : [f, null])
  const common: Ex[] = []
  for (const f of factorsOf(x.terms[0])) {
    if (degree(f) !== null) continue
    const [base, k] = exponent(f)
    let least = k
    let same = true
    const everywhere = x.terms.slice(1).every((t) =>
      factorsOf(t).some((g) => {
        const [b, j] = exponent(g)
        if (key(b) !== key(base)) return false
        if (k === null || j === null) return k === null && j === null
        if (j.cmp(k) !== 0) same = false
        if (j.cmp(least!) < 0) least = j
        return true
      }),
    )
    // Potenze diverse di una somma restano separate: 2(x + 1)^{5/2}/5 − 2(x + 1)^{3/2}/3.
    if (everywhere && (same || base.t !== 'add')) common.push(least ? pow(base, num(least)) : f)
  }
  if (!common.length) return lead(ordered(x))
  const factor = mul(...common)
  const rest = add(...x.terms.map((t) => mul(t, pow(factor, num(-1)))))
  const inner = rest.t === 'add' ? lead(ordered(rest)) : rest
  const parts = factor.t === 'mul' ? factor.factors : [factor]
  // Il numero davanti è quello di tutti e due: cos x (sin x + ln x/2) − sin x cos x = (cos x ln x)/2.
  const c = (factor.t === 'mul' ? factor.c : ONE).mul(inner.t === 'mul' ? inner.c : ONE)
  if (inner.t === 'num') return mul(factor, inner)
  return { t: 'mul', c, factors: sortFactors([...parts, ...(inner.t === 'mul' ? inner.factors : [inner])]) }
}

/** Il grado di un monomio (3x²y → 3), o null se non è un monomio. */
function degree(x: Ex): number | null {
  if (x.t === 'num') return 0
  if (x.t === 'sym') return x.name === 'π' || x.name === 'e' ? 0 : 1
  if (x.t === 'pow') return x.base.t === 'sym' && x.exp.t === 'num' && x.exp.v.isInteger && x.exp.v.sign > 0 ? Number(x.exp.v.n) : null
  if (x.t === 'mul') {
    let total = 0
    for (const f of x.factors) {
      const d = degree(f)
      if (d === null) return null
      total += d
    }
    return total
  }
  return null
}

/** Un polinomio dal grado più alto (x² + 4x + 1, x + y + z); le altre somme come vengono. */
function ordered(x: Extract<Ex, { t: 'add' }>): Ex {
  const degrees = x.terms.map(degree)
  const letters = (t: Ex) => symbols(t).join('')
  const polynomial = x.terms
    .map((t, i) => ({ t, d: degrees[i], i }))
    .filter((e) => e.d !== null)
    .sort((a, b) => b.d! - a.d! || letters(a.t).localeCompare(letters(b.t)) || a.i - b.i)
    .map((e) => e.t)
  // Con altri termini (ln x, √(…)): il polinomio tutto insieme, dove comincia (x + 1 + √(x² + 1)).
  const first = degrees.findIndex((d) => d !== null)
  if (first < 0) return x
  const others = x.terms.filter((_, i) => degrees[i] === null)
  const before = x.terms.slice(0, first).length
  return { t: 'add', terms: [...others.slice(0, before), ...polynomial, ...others.slice(before)] }
}

/** Sviluppa i prodotti e le potenze delle somme: (x + 1)² → x² + 2x + 1. */
export function expand(x: Ex): Ex {
  switch (x.t) {
    case 'add':
      return add(...x.terms.map(expand))
    case 'mul': {
      let terms: Ex[] = [num(x.c)]
      for (const f of x.factors) {
        const e = expand(f)
        const parts = e.t === 'add' ? e.terms : [e]
        terms = terms.flatMap((a) => parts.map((b) => mul(a, b)))
        if (terms.length > 400) return x
      }
      return add(...terms)
    }
    case 'pow':
      if (x.base.t === 'add' && x.exp.t === 'num' && x.exp.v.isInteger && x.exp.v.sign > 0 && x.exp.v.n <= 8n) {
        // Termine per termine: mul di due somme uguali tornerebbe la potenza.
        const base = expand(x.base)
        const parts = base.t === 'add' ? base.terms : [base]
        let terms: Ex[] = [num(1)]
        for (let i = 0n; i < x.exp.v.n; i++) {
          const next = add(...terms.flatMap((a) => parts.map((b) => expand(mul(a, b)))))
          terms = next.t === 'add' ? next.terms : [next]
          if (terms.length > 400) return x
        }
        return add(...terms)
      }
      return x
    default:
      return x
  }
}

/** I fattori al denominatore di un termine: le potenze con l'esponente intero negativo (non e^{-x}). */
function denominators(t: Ex): { base: Ex; k: Rational }[] {
  const factors = t.t === 'mul' ? t.factors : [t]
  const out: { base: Ex; k: Rational }[] = []
  for (const f of factors) {
    if (f.t !== 'pow' || f.exp.t !== 'num' || f.exp.v.sign >= 0 || (f.base.t === 'sym' && f.base.name === 'e')) continue
    // Anche le radici sotto: 1/√(x² − 4) e x²/(x² − 4)^{3/2} hanno lo stesso denominatore.
    if (f.exp.v.isInteger || f.base.t === 'add' || f.base.t === 'sym') out.push({ base: f.base, k: f.exp.v.neg() })
  }
  return out
}

/** Il numero e la potenza della variabile che i termini di un polinomio hanno in comune: 2x³ + 6x = 2x(x² + 3). */
function commonMonomial(x: Extract<Ex, { t: 'add' }>): Ex | null {
  const letters = symbols(x).filter((n) => n !== 'π' && n !== 'e')
  if (letters.length !== 1 || x.terms.some((t) => degree(t) === null)) return null
  const v = sym(letters[0])
  let n = 0n
  let d = 1n
  let least = Infinity
  const gcd = (a: bigint, b: bigint): bigint => (b ? gcd(b, a % b) : a < 0n ? -a : a)
  for (const t of x.terms) {
    const c = t.t === 'num' ? t.v : t.t === 'mul' ? t.c : ONE
    n = gcd(n, c.n)
    d = (d * c.d) / gcd(d, c.d)
    least = Math.min(least, degree(t)!)
  }
  const g = new Rational(n || 1n, d)
  if (g.n === 1n && g.d === 1n && !least) return null
  const factor = mul(num(g), pow(v, num(least)))
  const rest = add(...x.terms.map((t) => mul(t, pow(factor, num(-1)))))
  return { t: 'mul', c: g, factors: sortFactors([...(least ? [pow(v, num(least))] : []), rest]) }
}

/**
 * Una somma con delle frazioni con un denominatore solo, se il numeratore viene semplice:
 * 1/(x + 1) − x/(x + 1)² = 1/(x + 1)², come si fa nelle derivate dei quozienti.
 */
function combine(x: Ex): Ex {
  if (x.t !== 'add') return x
  const parts = x.terms.map(denominators)
  if (!parts.some((d) => d.length)) return x
  // Denominatori diversi con logaritmi e arcotangenti: meglio i termini separati (come nelle primitive).
  const below = new Set(parts.map((d) => d.map(({ base, k }) => `${key(base)}^${k.n}/${k.d}`).join('*')))
  const transcendental = (e: Ex): boolean => e.t === 'fn' || (e.t === 'pow' && (transcendental(e.base) || e.exp.t !== 'num')) || (e.t === 'mul' && e.factors.some(transcendental)) || (e.t === 'add' && e.terms.some(transcendental))
  if (below.size > 1 && x.terms.some(transcendental)) return x
  const common = new Map<string, { base: Ex; k: Rational }>()
  for (const { base, k } of parts.flat()) {
    const before = common.get(key(base))
    if (!before || before.k.cmp(k) < 0) common.set(key(base), { base, k })
  }
  const D = mul(...[...common.values()].map(({ base, k }) => pow(base, num(k))))
  const numerator = expand(add(...x.terms.map((t) => mul(t, D))))
  const size = numerator.t === 'add' ? numerator.terms.length : 1
  if (size > x.terms.length * 4 || denominators(numerator).length) return x
  // −x² − 1 sopra: meglio −(x² + 1); 2x³ + 6x: 2x(x² + 3).
  if (numerator.t === 'add' && numerator.terms.every(isNegative)) {
    const positive = add(...numerator.terms.map(neg))
    return mul(num(-1), (positive.t === 'add' ? commonMonomial(positive) : null) ?? positive, pow(D, num(-1)))
  }
  const factored = numerator.t === 'add' ? commonMonomial(numerator) : null
  return mul(factored ?? numerator, pow(D, num(-1)))
}

/** Una somma dentro una potenza o una funzione, in ordine: √(1 − x²), e^{x² + 2x}. */
function inOrder(x: Ex): Ex {
  return x.t === 'add' ? lead(ordered(x)) : x
}

/** Un termine come formula, già semplificato (per i polinomi di Taylor, che restano in ordine). */
function node0(x: Ex): MathNode {
  return node(tidy(x))
}

function node(x: Ex): MathNode {
  switch (x.t) {
    case 'num':
      return rationalNode(x.v)
    case 'sym':
      return NAME(x.name)
    case 'add': {
      let out = node(x.terms[0])
      for (const t of x.terms.slice(1)) {
        if (isNegative(t)) out = { k: 'bin', op: '-', a: out, b: node(neg(t)) }
        else out = { k: 'bin', op: '+', a: out, b: node(t) }
      }
      return out
    }
    case 'mul': {
      if (x.c.sign < 0) return { k: 'neg', a: node(mul(num(x.c.neg()), ...x.factors)) }
      const top: MathNode[] = []
      const bottom: MathNode[] = []
      const decimal = decimals && x.c.d !== 1n ? decimalText(x.c) : null
      if (decimal) top.push({ k: 'num', v: Number(decimal), text: decimal, comma: true })
      else {
        if (x.c.n !== 1n) top.push(NUM(x.c.n))
        if (x.c.d !== 1n) bottom.push(NUM(x.c.d))
      }
      for (const f of x.factors) {
        const below = denominatorPart(f)
        if (below) bottom.push(node(below))
        else top.push(node(f))
      }
      const numerator = top.length ? product(top) : NUM(1)
      return bottom.length ? { k: 'bin', op: '/', a: numerator, b: product(bottom), frac: true } : numerator
    }
    case 'pow': {
      const below = denominatorPart(x)
      if (below) return { k: 'bin', op: '/', a: NUM(1), b: node(below), frac: true }
      const base = node(inOrder(x.base))
      if (x.exp.t === 'num' && x.exp.v.n === 1n && x.exp.v.d === 2n) return { k: 'fn', name: 'sqrt', args: [base] }
      if (x.exp.t === 'num' && x.exp.v.n === 1n && x.exp.v.d > 2n) return { k: 'fn', name: 'root', args: [base], base: NUM(x.exp.v.d) }
      // sin² x come nei libri.
      if (x.base.t === 'fn' && x.exp.t === 'num' && x.exp.v.isInteger && x.exp.v.sign > 0 && base.k === 'fn') return { ...base, pow: NUM(x.exp.v.n) }
      return { k: 'bin', op: '^', a: base, b: node(inOrder(x.exp)) }
    }
    case 'fn': {
      const args = x.args.map((a) => node(inOrder(a)))
      if (x.name === 'abs') return { k: 'abs', a: args[0] }
      if (x.name === 'floor' || x.name === 'ceil') return { k: x.name, a: args[0] }
      return { k: 'fn', name: x.name, args, ...(x.base && { base: node(x.base) }) }
    }
    case 'cases':
      return { k: 'cases', rows: x.rows.map((r) => ({ value: node(r.value), cond: r.cond })) }
    case 'int':
      return { k: 'int', v: x.v, from: node(x.from), to: node(x.to), body: node(x.body) }
    case 'sum':
      return { k: 'big', op: 'sum', v: x.v, from: node(x.from), to: node(x.to), body: node(x.body) }
    case 'node':
      return x.node
  }
}

// ——— Il testo semplice (per chi non vede la formula disegnata) ———

const SUPERSCRIPTS: Record<string, string> = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }

/** Un'espressione come testo: 2x cos(x²), (x + 1)/(x − 1), √x. */
export function plainText(node: MathNode): string {
  const p = (n: MathNode, min: number): string => {
    const s = plainText(n)
    return precedence(n) < min ? `(${s})` : s
  }
  switch (node.k) {
    case 'num':
      return node.text.replace('.', ',')
    case 'name':
      return node.name
    case 'neg':
      return `−${p(node.a, 2)}`
    case 'bin':
      switch (node.op) {
        case '+':
          return `${plainText(node.a)} + ${p(node.b, 1.5)}`
        case '-':
          return `${plainText(node.a)} − ${p(node.b, 1.5)}`
        case '*': {
          const a = p(node.a, 2)
          const b = p(node.b, 2)
          // Prima del nome di una funzione uno spazio: x² ln(x), 2 sin(x).
          return node.implicit && !/^\d/.test(b) ? `${a}${/^[A-Za-z]{2}/.test(b) ? ' ' : ''}${b}` : `${a} · ${b}`
        }
        case '/':
          return `${p(node.a, 3)}/${p(node.b, 3)}`
        case '^': {
          const exp = plainText(node.b)
          const sup = /^-?\d+$/.test(exp) ? [...exp].map((c) => SUPERSCRIPTS[c]).join('') : null
          return `${p(node.a, 4)}${sup ?? `^(${exp})`}`
        }
      }
      break
    case 'fn': {
      const inner = node.args.map(plainText).join(', ')
      const atom = node.args[0].k === 'name' || node.args[0].k === 'num'
      if (node.name === 'sqrt') return `√${atom ? inner : `(${inner})`}`
      if (node.name === 'root') {
        const index = plainText(node.base!)
        const mark = index === '3' ? '∛' : index === '4' ? '∜' : /^\d+$/.test(index) ? `${[...index].map((c) => SUPERSCRIPTS[c]).join('')}√` : `(${index})√`
        return `${mark}${atom ? inner : `(${inner})`}`
      }
      const pow = node.pow ? [...plainText(node.pow)].map((c) => SUPERSCRIPTS[c] ?? c).join('') : ''
      // ln|x|, come si scrive.
      if (node.args.length === 1 && node.args[0].k === 'abs') return `${node.name}${pow}${inner}`
      return `${node.name}${pow}(${inner})`
    }
    case 'abs':
      return `|${plainText(node.a)}|`
    case 'tuple':
      return `(${node.items.map(plainText).join(', ')})`
    case 'matrix':
      return `(${node.rows.map((r) => r.map(plainText).join('  ')).join(' ; ')})`
    case 'apply':
      return `${node.name}${"'".repeat(node.primes)}(${node.args.map(plainText).join(', ')})`
    default:
      break
  }
  return '…'
}

function precedence(n: MathNode): number {
  if (n.k === 'bin') return n.op === '+' || n.op === '-' ? 1 : n.op === '^' ? 4 : n.op === '/' ? 2.5 : 2
  if (n.k === 'neg') return 1.5
  if (n.k === 'num') return n.v < 0 ? 1.5 : 5
  return 5
}
