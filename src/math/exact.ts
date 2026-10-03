/**
 * I conti esatti con le frazioni: 1/3 + 1/6 = 1/2 e 0,1 + 0,2 = 0,3 (non 0,30000000000000004).
 * Valgono per le quattro operazioni, le potenze intere, le radici che vengono esatte (√16 = 4),
 * fattoriali, coefficienti binomiali e somme; quando serve altro (π, sin, log…) `ExactUnavailable`
 * dice di usare i conti con la virgola mobile di `evaluate.ts`.
 */
import { spend } from './evaluate'
import { productPower, type MathNode } from './parse'

export class ExactUnavailable extends Error {}

const unavailable = (): never => {
  throw new ExactUnavailable()
}

function bigGcd(a: bigint, b: bigint): bigint {
  if (a < 0n) a = -a
  if (b < 0n) b = -b
  while (b) [a, b] = [b, a % b]
  return a
}

/** Numeri più lunghi di così non si tengono esatti (e i conti restano veloci). */
const MAX_BITS = 4000

export class Rational {
  readonly n: bigint
  readonly d: bigint

  constructor(n: bigint, d: bigint = 1n) {
    if (d === 0n) unavailable()
    if (d < 0n) {
      n = -n
      d = -d
    }
    const g = bigGcd(n, d)
    this.n = g > 1n ? n / g : n
    this.d = g > 1n ? d / g : d
    if (this.n.toString(16).length * 4 > MAX_BITS || this.d.toString(16).length * 4 > MAX_BITS) unavailable()
  }

  static int(n: number | bigint): Rational {
    return new Rational(BigInt(n))
  }

  /** Da un numero scritto in decimale ("2.5", "0.125"). */
  static decimal(text: string): Rational {
    const [int, frac = ''] = text.split('.')
    return new Rational(BigInt(int + frac || '0'), 10n ** BigInt(frac.length))
  }

  get isInteger(): boolean {
    return this.d === 1n
  }

  get sign(): number {
    return this.n > 0n ? 1 : this.n < 0n ? -1 : 0
  }

  add(o: Rational): Rational {
    return new Rational(this.n * o.d + o.n * this.d, this.d * o.d)
  }

  sub(o: Rational): Rational {
    return new Rational(this.n * o.d - o.n * this.d, this.d * o.d)
  }

  mul(o: Rational): Rational {
    return new Rational(this.n * o.n, this.d * o.d)
  }

  div(o: Rational): Rational {
    if (o.n === 0n) unavailable()
    return new Rational(this.n * o.d, this.d * o.n)
  }

  neg(): Rational {
    return new Rational(-this.n, this.d)
  }

  abs(): Rational {
    return this.n < 0n ? this.neg() : this
  }

  cmp(o: Rational): number {
    const a = this.n * o.d
    const b = o.n * this.d
    return a < b ? -1 : a > b ? 1 : 0
  }

  floor(): Rational {
    const q = this.n / this.d
    return Rational.int(this.n < 0n && q * this.d !== this.n ? q - 1n : q)
  }

  ceil(): Rational {
    return this.neg().floor().neg()
  }

  /** La potenza con esponente intero. */
  powInt(e: bigint): Rational {
    if (e < 0n) {
      if (this.n === 0n) unavailable()
      return new Rational(this.d, this.n).powInt(-e)
    }
    const bits = (this.n < 0n ? -this.n : this.n).toString(2).length + this.d.toString(2).length
    if (Number(e) * bits > MAX_BITS) unavailable()
    return new Rational(this.n ** e, this.d ** e)
  }

  toNumber(): number {
    return Number(this.n) / Number(this.d)
  }
}

/** La radice k-esima intera di n, se n è una potenza k-esima esatta. */
function exactRoot(n: bigint, k: number): bigint | null {
  if (n < 0n) {
    if (k % 2 === 0) return null
    const r = exactRoot(-n, k)
    return r === null ? null : -r
  }
  if (n < 2n) return n
  const K = BigInt(k)
  // Newton sugli interi, partendo da una stima dall'alto.
  let x = 1n << BigInt(Math.ceil(n.toString(2).length / k) + 1)
  for (;;) {
    const y = ((K - 1n) * x + n / x ** (K - 1n)) / K
    if (y >= x) break
    x = y
  }
  return x ** K === n ? x : null
}

function root(r: Rational, k: number): Rational {
  if (!Number.isInteger(k) || k < 2 || k > 64) unavailable()
  const n = exactRoot(r.n, k)
  const d = exactRoot(r.d, k)
  if (n === null || d === null) unavailable()
  return new Rational(n!, d!)
}

function toBigInt(r: Rational): bigint {
  if (!r.isInteger) unavailable()
  return r.n
}

function factorialExact(r: Rational): Rational {
  const n = toBigInt(r)
  if (n < 0n || n > 500n) unavailable()
  let p = 1n
  for (let i = 2n; i <= n; i++) p *= i
  return new Rational(p)
}

function binomExact(nr: Rational, kr: Rational): Rational {
  const n = toBigInt(nr)
  const k = toBigInt(kr)
  if (n < 0n || n > 2000n) unavailable()
  if (k < 0n || k > n) return Rational.int(0)
  const m = k < n - k ? k : n - k
  let p = 1n
  for (let i = 1n; i <= m; i++) p = (p * (n - m + i)) / i
  return new Rational(p)
}

/** Una funzione definita, per i conti esatti: il corpo da calcolare con i suoi valori. */
export interface ExactFunction {
  params: string[]
  body: MathNode
  scope: ExactScope
}

export interface ExactScope {
  consts: ReadonlyMap<string, Rational | null>
  fns: ReadonlyMap<string, ExactFunction | null>
}

/** Il valore esatto di un'espressione, o `ExactUnavailable`. */
export function evaluateExact(node: MathNode, scope: ExactScope, locals: ReadonlyMap<string, Rational> = new Map()): Rational {
  const ev = (n: MathNode, l = locals) => evaluateExact(n, scope, l)
  switch (node.k) {
    case 'num':
      return Rational.decimal(node.text)
    case 'name': {
      const local = locals.get(node.name)
      if (local) return local
      const value = scope.consts.get(node.name)
      return value ?? unavailable()
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
        case '^': {
          if (b.isInteger) return a.powInt(b.n)
          // 8^{1/3} = 2, (4/9)^{1/2} = 2/3: solo se la radice viene esatta.
          if (b.d > 64n) unavailable()
          return root(a, Number(b.d)).powInt(b.n)
        }
      }
      break
    }
    case 'fn': {
      if (node.pow) {
        const p = ev(node.pow)
        if (!p.isInteger) unavailable()
        return ev({ ...node, pow: undefined }).powInt(p.n)
      }
      const args = node.args.map((a) => ev(a))
      const one = () => (args.length === 1 ? args[0] : unavailable())
      switch (node.name) {
        case 'sqrt':
          return root(one(), 2)
        case 'root': {
          const k = ev(node.base!)
          if (!k.isInteger) unavailable()
          return root(one(), Number(k.n))
        }
        case 'abs':
          return one().abs()
        case 'sgn':
          return Rational.int(one().sign)
        case 'floor':
          return one().floor()
        case 'ceil':
          return one().ceil()
        case 'max':
        case 'min':
          if (!args.length) unavailable()
          return args.reduce((p, q) => ((node.name === 'max' ? p.cmp(q) >= 0 : p.cmp(q) <= 0) ? p : q))
        case 'gcd':
        case 'lcm': {
          if (args.length < 2) unavailable()
          const ints = args.map(toBigInt)
          if (node.name === 'gcd') return new Rational(ints.reduce(bigGcd))
          return new Rational(ints.reduce((p, q) => (p === 0n || q === 0n ? 0n : (p * q < 0n ? -p * q : p * q) / bigGcd(p, q))))
        }
      }
      return unavailable()
    }
    case 'apply': {
      if (node.primes) unavailable()
      if (!locals.has(node.name) && scope.fns.has(node.name)) {
        const fn = scope.fns.get(node.name)
        if (!fn || fn.params.length !== node.args.length) unavailable()
        const bound = new Map<string, Rational>()
        fn!.params.forEach((p, i) => bound.set(p, ev(node.args[i])))
        return evaluateExact(fn!.body, fn!.scope, bound)
      }
      if (node.args.length !== 1) unavailable()
      return ev({ k: 'name', name: node.name }).mul(ev(node.args[0]))
    }
    case 'post': {
      const a = ev(node.a)
      if (node.op === '!') return factorialExact(a)
      if (node.op === '%') return a.div(Rational.int(100))
      return unavailable()
    }
    case 'abs':
      return ev(node.a).abs()
    case 'floor':
      return ev(node.a).floor()
    case 'ceil':
      return ev(node.a).ceil()
    case 'binom':
      return binomExact(ev(node.n), ev(node.r))
    case 'big': {
      const from = toBigInt(ev(node.from))
      const to = toBigInt(ev(node.to))
      if (to - from > 2000n) unavailable()
      let r = Rational.int(node.op === 'sum' ? 0 : 1)
      const inner = new Map(locals)
      for (let k = from; k <= to; k++) {
        if (!spend(1)) unavailable()
        inner.set(node.v, new Rational(k))
        const term = ev(node.body, inner)
        r = node.op === 'sum' ? r.add(term) : r.mul(term)
      }
      return r
    }
    case 'cases': {
      for (const row of node.rows) {
        if (!row.cond || conditionExact(row.cond, scope, locals)) return ev(row.value)
      }
      return unavailable()
    }
  }
  return unavailable()
}

function conditionExact(node: MathNode, scope: ExactScope, locals: ReadonlyMap<string, Rational>): boolean {
  switch (node.k) {
    case 'rel': {
      const items = node.items.map((n) => evaluateExact(n, scope, locals))
      return node.ops.every((op, i) => {
        const c = items[i].cmp(items[i + 1])
        switch (op) {
          case '<':
            return c < 0
          case '<=':
            return c <= 0
          case '>':
            return c > 0
          case '>=':
            return c >= 0
          case '=':
          case '≈':
            return c === 0
          case '!=':
            return c !== 0
        }
        return false
      })
    }
    case 'and':
      return node.items.every((n) => conditionExact(n, scope, locals))
    case 'or':
      return node.items.some((n) => conditionExact(n, scope, locals))
  }
  return unavailable()
}
