/**
 * Le variabili aleatorie della nota. `$X \sim B(10, 0{,}3)$` la definisce; poi P(X \le 3),
 * P(2 < X \le 5), P(X > 3 \mid X > 1), E[X], E[X^2], \operatorname{Var}(X), \operatorname{sqm}(X),
 * \operatorname{quantile}(X, 0{,}95).
 *
 * L'evento diventa un insieme di intervalli di valori di X (con gli estremi esatti, se lo sono) e la
 * probabilità viene dalla funzione di ripartizione, anche esatta (una frazione, o con e^{−λ}). Le
 * condizioni più complicate (|X - 5| < 2) si guardano valore per valore (discrete) o cercando dove
 * cambiano (continue).
 */
import { bound, compile, compileCondition, integrate, MathError, scopeWith, type Compiled, type CompileOptions, type RandomScope, type Scope, type Vars } from './evaluate'
import { evaluateExact, Rational, type ExactScope } from './exact'
import {
  addExp,
  exactIntervalProbability,
  expSum,
  intervalProbability,
  makeDistribution,
  type Distribution,
  type End,
  type ExpSum,
  type Family,
  type Interval,
} from './distributions'
import { fractionNear } from './polynomial'
import { namesIn, type MathNode, type RelOp } from './parse'

const NEG_INF: End = { v: -Infinity, exact: null, closed: false }
const POS_INF: End = { v: Infinity, exact: null, closed: false }
const ALL: Interval[] = [{ lo: NEG_INF, hi: POS_INF }]

// ——— Gli insiemi di valori ———

/** L'intersezione di due intervalli (null se è vuota). */
function meet(a: Interval, b: Interval): Interval | null {
  const lo = a.lo.v > b.lo.v ? a.lo : b.lo.v > a.lo.v ? b.lo : { ...a.lo, closed: a.lo.closed && b.lo.closed }
  const hi = a.hi.v < b.hi.v ? a.hi : b.hi.v < a.hi.v ? b.hi : { ...a.hi, closed: a.hi.closed && b.hi.closed }
  return nonEmpty(lo, hi) ? { lo, hi } : null
}

function nonEmpty(lo: End, hi: End): boolean {
  return lo.v < hi.v || (lo.v === hi.v && lo.closed && hi.closed && Number.isFinite(lo.v))
}

/** Gli intervalli in ordine, uniti dove si toccano. */
function normalize(list: Interval[]): Interval[] {
  const sorted = list.filter((i) => nonEmpty(i.lo, i.hi)).sort((p, q) => p.lo.v - q.lo.v || Number(q.lo.closed) - Number(p.lo.closed))
  const out: Interval[] = []
  for (const i of sorted) {
    const last = out[out.length - 1]
    if (last && (i.lo.v < last.hi.v || (i.lo.v === last.hi.v && (i.lo.closed || last.hi.closed)))) {
      if (i.hi.v > last.hi.v || (i.hi.v === last.hi.v && i.hi.closed)) last.hi = i.hi
    } else out.push({ lo: i.lo, hi: i.hi })
  }
  return out
}

function intersect(a: Interval[], b: Interval[]): Interval[] {
  const out: Interval[] = []
  for (const i of a) {
    for (const j of b) {
      const m = meet(i, j)
      if (m) out.push(m)
    }
  }
  return normalize(out)
}

function complement(a: Interval[]): Interval[] {
  const out: Interval[] = []
  let lo: End = NEG_INF
  for (const i of normalize(a)) {
    const hi: End = { ...i.lo, closed: !i.lo.closed }
    if (nonEmpty(lo, hi)) out.push({ lo, hi })
    lo = { ...i.hi, closed: !i.hi.closed }
  }
  if (lo.v < Infinity) out.push({ lo, hi: POS_INF })
  return out
}

const point = (e: Omit<End, 'closed'>): Interval[] => [{ lo: { ...e, closed: true }, hi: { ...e, closed: true } }]

const FLIP: Record<RelOp, RelOp> = { '<': '>', '<=': '>=', '>': '<', '>=': '<=', '=': '=', '!=': '!=', '≈': '≈' }

/** Come si legge l'evento: la variabile e i valori delle espressioni senza di lei. */
interface EventContext {
  X: string
  value(node: MathNode): Omit<End, 'closed'>
}

/** L'evento come intervalli di valori di X; null se non è scritto con X da sola (|X - 5| < 2). */
function eventSet(node: MathNode, ctx: EventContext): Interval[] | null {
  const isX = (n: MathNode) => n.k === 'name' && n.name === ctx.X
  const mentions = (n: MathNode) => namesIn(n).has(ctx.X)
  switch (node.k) {
    case 'and':
    case 'or': {
      let set: Interval[] = node.k === 'and' ? ALL : []
      for (const item of node.items) {
        const s = eventSet(item, ctx)
        if (!s) return null
        set = node.k === 'and' ? intersect(set, s) : normalize([...set, ...s])
      }
      return set
    }
    case 'in': {
      if (!isX(node.a) || mentions(node.lo) || mentions(node.hi)) return null
      return normalize([{ lo: { ...ctx.value(node.lo), closed: !node.loOpen }, hi: { ...ctx.value(node.hi), closed: !node.hiOpen } }])
    }
    case 'rel': {
      let set = ALL
      for (let i = 0; i < node.ops.length; i++) {
        const [a, b] = [node.items[i], node.items[i + 1]]
        const x = isX(a) ? b : isX(b) ? a : null
        if (!x || mentions(x)) return null
        const op = isX(a) ? node.ops[i] : FLIP[node.ops[i]]
        const c = ctx.value(x)
        let s: Interval[]
        switch (op) {
          case '<':
          case '<=':
            s = [{ lo: NEG_INF, hi: { ...c, closed: op === '<=' } }]
            break
          case '>':
          case '>=':
            s = [{ lo: { ...c, closed: op === '>=' }, hi: POS_INF }]
            break
          case '!=':
            s = complement(point(c))
            break
          default:
            s = point(c)
        }
        set = intersect(set, normalize(s))
      }
      return set
    }
  }
  return null
}

/** Un estremo trovato con i numeri: la frazione, se è vicinissimo a una semplice (3, 1/2, 7/4). */
function endAt(v: number): Omit<End, 'closed'> {
  const r = Number.isFinite(v) ? fractionNear(v, 1000) : null
  return r && Math.abs(r.toNumber() - v) <= 1e-9 * Math.max(1, Math.abs(v)) ? { v: r.toNumber(), exact: r } : { v, exact: null }
}

/**
 * L'evento cercato valore per valore: per le discrete i valori dove vale (fino a dove la probabilità
 * che resta è trascurabile: allora `truncated`), per le continue i punti dove smette o comincia a valere.
 */
function scanSet(holds: (x: number) => boolean, d: Distribution): { set: Interval[]; truncated: boolean } {
  if (d.discrete) {
    const last = Number.isFinite(d.hi) ? d.hi : Math.max(d.quantile(1 - 1e-17), d.lo) + 20
    if (last - d.lo > 1e6) throw new MathError('Troppi valori da guardare uno per uno: scrivi l\'evento con X da sola (X \\le 3)')
    const set: Interval[] = []
    for (let k = d.lo; k <= last; k++) {
      if (!holds(k)) continue
      const prev = set[set.length - 1]
      if (prev && prev.hi.v === k - 1) prev.hi = { v: k, exact: Rational.int(k), closed: true }
      else set.push({ lo: { v: k, exact: Rational.int(k), closed: true }, hi: { v: k, exact: Rational.int(k), closed: true } })
    }
    return { set, truncated: !Number.isFinite(d.hi) }
  }
  const a = Number.isFinite(d.lo) ? d.lo : d.quantile(1e-15)
  const b = Number.isFinite(d.hi) ? d.hi : d.quantile(1 - 1e-15)
  const n = 4000
  const xs = Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n)
  const truth = xs.map(holds)
  const set: Interval[] = []
  let start: End | null = truth[0] ? NEG_INF : null
  for (let i = 0; i < n; i++) {
    if (truth[i] === truth[i + 1]) continue
    // Dove cambia, a metà finché si può.
    let [lo, hi] = [xs[i], xs[i + 1]]
    for (let k = 0; k < 60; k++) {
      const m = (lo + hi) / 2
      if (holds(m) === truth[i]) lo = m
      else hi = m
    }
    const end: End = { ...endAt((lo + hi) / 2), closed: true }
    if (truth[i]) {
      set.push({ lo: start!, hi: end })
      start = null
    } else start = end
  }
  if (start) set.push({ lo: start, hi: POS_INF })
  return { set: normalize(set), truncated: false }
}

// ——— Le variabili aleatorie ———

/** L'evento come intervalli, con i numeri (le variabili `v`: la x di un grafico, la k di una somma). */
function numericSet(event: MathNode, X: string, d: Distribution, scope: Scope, options: CompileOptions, cache: Map<MathNode, Compiled>, v: Vars): Interval[] {
  const ctx: EventContext = {
    X,
    value: (n) => {
      let f = cache.get(n)
      if (!f) cache.set(n, (f = bound(n, scope, options)))
      return { v: f(v), exact: null }
    },
  }
  const simple = eventSet(event, ctx)
  if (simple) return simple
  const holds = compileCondition(event, scopeWith(scope, [X]), options)
  return scanSet((x) => holds({ ...v, [X]: x }), d).set
}

/** Le variabili che l'espressione usa, tra quelle definite. */
function randomNames(node: MathNode, vars: ReadonlyMap<string, Distribution>): string[] {
  return [...namesIn(node)].filter((n) => vars.has(n))
}

function oneVariable(nodes: (MathNode | null)[], vars: ReadonlyMap<string, Distribution>): string {
  const names = new Set(nodes.flatMap((n) => (n ? randomNames(n, vars) : [])))
  if (names.size > 1) throw new MathError('Con due variabili aleatorie insieme non so ancora calcolare: scrivine una sola')
  const [X] = names
  if (!X) throw new MathError('Nell\'evento manca la variabile aleatoria: prima $X \\sim B(10, 0{,}3)$, poi P(X \\le 3)')
  return X
}

/** La somma delle probabilità degli intervalli, con i numeri. */
function setProbability(d: Distribution, set: Interval[]): number {
  return set.reduce((sum, i) => sum + intervalProbability(d, i), 0)
}

function exactSetProbability(d: Distribution, set: Interval[]): ExpSum | null {
  let total: ExpSum = expSum(Rational.int(0))
  for (const i of set) {
    const p = exactIntervalProbability(d, i)
    if (!p) return null
    total = addExp(total, p)
  }
  return total
}

/** a/b per due probabilità esatte: una frazione, o un termine solo con e^{−r} (l'esponenziale «senza memoria»). */
function divideExp(a: ExpSum, b: ExpSum): ExpSum | null {
  if (b.terms.length === 0) {
    if (b.c.sign === 0) return null
    return { c: a.c.div(b.c), terms: a.terms.map((t) => ({ coef: t.coef.div(b.c), rate: t.rate })) }
  }
  if (a.c.sign === 0 && b.c.sign === 0 && a.terms.length === 1 && b.terms.length === 1) {
    const coef = a.terms[0].coef.div(b.terms[0].coef)
    const rate = a.terms[0].rate.sub(b.terms[0].rate)
    return rate.sign === 0 ? expSum(coef) : expSum(Rational.int(0), [{ coef, rate }])
  }
  return null
}

/** Il valore di g(X) per X = x, con le altre variabili `v`. */
function compileOf(node: MathNode, X: string, scope: Scope, options: CompileOptions): (x: number, v: Vars) => number {
  const f = compile(node, scopeWith(scope, [X]), options)
  return (x, v) => f({ ...v, [X]: x })
}

/** E[g(X)] con i numeri: la somma sui valori (discrete) o l'integrale con la densità (continue). */
function numericExpectation(d: Distribution, g: (x: number) => number): number {
  if (d.discrete) {
    const last = Number.isFinite(d.hi) ? d.hi : Math.max(d.quantile(1 - 1e-17), d.lo) + 40
    if (last - d.lo > 1e6) return NaN
    let sum = 0
    for (let k = d.lo; k <= last; k++) {
      const p = d.pdf(k)
      if (p > 0) sum += g(k) * p
    }
    return sum
  }
  const lo = d.lo
  const hi = d.hi
  // Per le continue si spezza attorno alla media: l'integrale vede bene dove c'è la densità.
  const mid = Number.isFinite(d.mean) ? d.mean : d.quantile(0.5)
  const f = (x: number) => {
    const p = d.pdf(x)
    return p === 0 ? 0 : g(x) * p
  }
  return integrate(f, lo, mid, 1e-12) + integrate(f, mid, hi, 1e-12)
}

/**
 * g(X) = a X² + b X + c con a, b, c frazioni? Si guarda il valore esatto in qualche punto (e se non è
 * così, o non si sa calcolare esatto, null).
 */
function quadraticIn(node: MathNode, X: string, scope: ExactScope): [Rational, Rational, Rational] | null {
  const at = (x: number) => evaluateExact(node, scope, new Map([[X, Rational.int(x)]]))
  try {
    const [g0, g1, g2] = [at(0), at(1), at(2)]
    const two = Rational.int(2)
    const a = g2.sub(g1.mul(two)).add(g0).div(two)
    const b = g1.sub(g0).sub(a)
    for (const x of [-3, 5, 7]) {
      const r = Rational.int(x)
      if (at(x).cmp(a.mul(r).mul(r).add(b.mul(r)).add(g0)) !== 0) return null
    }
    return [a, b, g0]
  } catch {
    return null
  }
}

export type MomentKind = 'mean' | 'variance' | 'sd'

/** Lo stato delle variabili aleatorie definite nella nota, per i conti con i numeri e per quelli esatti. */
export function randomScope(vars: ReadonlyMap<string, Distribution>): RandomScope & {
  /** Con `numeric` (lo stato per i conti con i numeri) anche gli eventi come |X − 5| < 2, per le discrete con pochi valori. */
  exactProbability(node: Extract<MathNode, { k: 'prob' }>, scope: ExactScope, numeric?: Scope): ExpSum | null
  exactMoment(node: MathNode, kind: MomentKind, scope: ExactScope): Rational | null
  distribution(name: string): Distribution | undefined
} {
  const dist = (X: string) => vars.get(X)!
  return {
    has: (name) => vars.has(name),
    distribution: (name) => vars.get(name),
    involves: (node) => randomNames(node, vars).length > 0,
    event(node, scope) {
      const X = oneVariable([node.event], vars)
      return { X, set: numericSet(node.event, X, dist(X), scope, {}, new Map(), {}) }
    },
    probability(node, scope, options) {
      const X = oneVariable([node.event, node.given], vars)
      const d = dist(X)
      const values = new Map<MathNode, Compiled>()
      const setOf = (event: MathNode, v: Vars): Interval[] => numericSet(event, X, d, scope, options, values, v)
      return (v) => {
        const event = setOf(node.event, v)
        if (!node.given) return setProbability(d, event)
        const given = setOf(node.given, v)
        const pb = setProbability(d, given)
        if (!(pb > 0)) return NaN
        return setProbability(d, intersect(event, given)) / pb
      }
    },
    exactProbability(node, scope, numeric) {
      const X = oneVariable([node.event, node.given], vars)
      const d = dist(X)
      const setOf = (event: MathNode): Interval[] | null => {
        const simple = exactEventSet(event)
        if (simple || !numeric || !d.discrete || !Number.isFinite(d.hi)) return simple
        // Valore per valore: con pochi valori possibili la somma esatta.
        try {
          const holds = compileCondition(event, scopeWith(numeric, [X]), { calc: true })
          return scanSet((x) => holds({ [X]: x }), d).set
        } catch {
          return null
        }
      }
      const exactEventSet = (event: MathNode): Interval[] | null => {
        const ctx: EventContext = {
          X,
          value: (n) => {
            if (n.k === 'infty' || (n.k === 'neg' && n.a.k === 'infty')) return { v: n.k === 'infty' ? Infinity : -Infinity, exact: null }
            const exact = evaluateExact(n, scope)
            return { v: exact.toNumber(), exact }
          },
        }
        try {
          return eventSet(event, ctx)
        } catch {
          return null
        }
      }
      const event = setOf(node.event)
      if (!event) return null
      try {
        if (!node.given) return exactSetProbability(d, event)
        const given = setOf(node.given)
        if (!given) return null
        const a = exactSetProbability(d, intersect(event, given))
        const b = exactSetProbability(d, given)
        return a && b && divideExp(a, b)
      } catch {
        return null
      }
    },
    moment(node, kind, scope, options) {
      const names = randomNames(node, vars)
      if (!names.length) {
        const f = compile(node, scope, options)
        return kind === 'mean' ? f : () => 0
      }
      const X = oneVariable([node], vars)
      const d = dist(X)
      if (node.k === 'name') {
        const m = kind === 'mean' ? d.mean : kind === 'variance' ? d.variance : Math.sqrt(d.variance)
        return () => m
      }
      const g = compileOf(node, X, scope, options)
      return (v) => {
        const mean = numericExpectation(d, (x) => g(x, v))
        if (kind === 'mean') return mean
        const second = numericExpectation(d, (x) => g(x, v) ** 2)
        const variance = Math.max(0, second - mean * mean)
        return kind === 'variance' ? variance : Math.sqrt(variance)
      }
    },
    exactMoment(node, kind, scope) {
      const names = randomNames(node, vars)
      if (!names.length) {
        try {
          return kind === 'mean' ? evaluateExact(node, scope) : Rational.int(0)
        } catch {
          return null
        }
      }
      if (names.length > 1) return null
      const d = dist(names[0])
      const coefficients = node.k === 'name' ? [Rational.int(0), Rational.int(1), Rational.int(0)] : quadraticIn(node, names[0], scope)
      if (!coefficients || !d.exactMean) return null
      const [a, b, c] = coefficients as [Rational, Rational, Rational]
      const m = d.exactMean
      // E[aX² + bX + c] = a(Var + E²) + bE + c; Var(bX + c) = b² Var.
      if (kind === 'mean') {
        if (a.sign === 0) return b.mul(m).add(c)
        return d.exactVariance ? a.mul(d.exactVariance.add(m.mul(m))).add(b.mul(m)).add(c) : null
      }
      if (a.sign !== 0 || !d.exactVariance) return null
      const variance = b.mul(b).mul(d.exactVariance)
      if (kind === 'variance') return variance
      try {
        return exactSqrt(variance)
      } catch {
        return null
      }
    },
    quantile(name, p) {
      const d = vars.get(name)
      if (!d) throw new MathError(`${name} non è una variabile aleatoria: prima ${name} \\sim N(0, 1)`)
      return (v) => d.quantile(p(v))
    },
  }
}

function exactSqrt(r: Rational): Rational | null {
  const root = (n: bigint): bigint | null => {
    if (n < 0n) return null
    if (n < 2n) return n
    let x = BigInt(Math.floor(Math.sqrt(Number(n))))
    while (x * x > n) x--
    while ((x + 1n) * (x + 1n) <= n) x++
    return x * x === n ? x : null
  }
  const n = root(r.n)
  const d = root(r.d)
  return n !== null && d !== null ? new Rational(n, d) : null
}

/**
 * La distribuzione di `X \sim …` con i parametri calcolati: `value` dà il valore di un parametro (con
 * la virgola e, se si può, esatto).
 */
export function distributionOf(node: Extract<MathNode, { k: 'dist' }>, value: (n: MathNode) => { v: number; exact: Rational | null }): Distribution {
  const params = node.params.map(value)
  return makeDistribution(node.family as Family, params.map((p) => p.v), params.map((p) => p.exact))
}
