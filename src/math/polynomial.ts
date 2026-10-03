/**
 * I polinomi in una variabile con i coefficienti frazioni, dal grado 0 ([1, 0, 2] è 1 + 2x²): le
 * quattro operazioni, la divisione con il resto, il massimo comun divisore, la derivata, le radici
 * razionali (con Ruffini) e con la virgola (anche complesse), la scomposizione in fattori di primo e
 * di secondo grado e i fratti semplici (per le primitive delle funzioni razionali).
 */
import { Rational } from './exact'

export type Poly = Rational[]

const ZERO = Rational.int(0)
const ONE = Rational.int(1)

/** Senza gli zeri in fondo: il polinomio nullo è []. */
export function trim(p: Poly): Poly {
  let n = p.length
  while (n > 0 && p[n - 1].sign === 0) n--
  return n === p.length ? p : p.slice(0, n)
}

/** Il grado (−1 per il polinomio nullo). */
export const degree = (p: Poly): number => trim(p).length - 1

export function padd(a: Poly, b: Poly): Poly {
  const out: Poly = []
  for (let i = 0; i < Math.max(a.length, b.length); i++) out.push((a[i] ?? ZERO).add(b[i] ?? ZERO))
  return trim(out)
}

export function pscale(p: Poly, c: Rational): Poly {
  return trim(p.map((x) => x.mul(c)))
}

export const psub = (a: Poly, b: Poly): Poly => padd(a, pscale(b, Rational.int(-1)))

export function pmul(a: Poly, b: Poly): Poly {
  a = trim(a)
  b = trim(b)
  if (!a.length || !b.length) return []
  const out: Poly = Array.from({ length: a.length + b.length - 1 }, () => ZERO)
  a.forEach((x, i) => b.forEach((y, j) => (out[i + j] = out[i + j].add(x.mul(y)))))
  return trim(out)
}

export function ppow(p: Poly, k: number): Poly {
  let r: Poly = [ONE]
  for (let i = 0; i < k; i++) r = pmul(r, p)
  return r
}

/** a = q b + r, con il grado di r minore di quello di b. */
export function pdivmod(a: Poly, b: Poly): { q: Poly; r: Poly } {
  b = trim(b)
  if (!b.length) throw new RangeError('Divisione per il polinomio nullo')
  let r = trim([...a])
  const q: Poly = Array.from({ length: Math.max(0, r.length - b.length + 1) }, () => ZERO)
  const lead = b[b.length - 1]
  while (r.length >= b.length) {
    const k = r.length - b.length
    const c = r[r.length - 1].div(lead)
    q[k] = c
    const next = [...r]
    for (let i = 0; i < b.length; i++) next[i + k] = next[i + k].sub(c.mul(b[i]))
    // Il termine di grado più alto si annulla.
    next.pop()
    r = trim(next)
  }
  return { q: trim(q), r }
}

/** Con il primo coefficiente 1. */
export function monic(p: Poly): Poly {
  p = trim(p)
  return p.length ? pscale(p, ONE.div(p[p.length - 1])) : p
}

/** Il massimo comun divisore, con il primo coefficiente 1. */
export function pgcd(a: Poly, b: Poly): Poly {
  a = trim(a)
  b = trim(b)
  while (b.length) {
    const { r } = pdivmod(a, b)
    a = b
    b = r
  }
  return monic(a)
}

export function pderiv(p: Poly): Poly {
  return trim(p.slice(1).map((c, i) => c.mul(Rational.int(i + 1))))
}

export function pvalue(p: Poly, x: Rational): Rational {
  let y = ZERO
  for (let k = p.length - 1; k >= 0; k--) y = y.mul(x).add(p[k])
  return y
}

/**
 * I fattori senza quadrati con la loro molteplicità (Yun): x³ − x² = x² (x − 1) dà [x − 1, 1] e
 * [x, 2]. I fattori hanno il primo coefficiente 1.
 */
export function squareFree(p: Poly): { p: Poly; m: number }[] {
  const f = monic(p)
  if (f.length <= 1) return []
  const out: { p: Poly; m: number }[] = []
  const d = pderiv(f)
  const a0 = pgcd(f, d)
  let b = pdivmod(f, a0).q
  const c = pdivmod(d, a0).q
  let dd = psub(c, pderiv(b))
  for (let i = 1; degree(b) > 0 && i < 64; i++) {
    const a = pgcd(b, dd)
    if (degree(a) > 0) out.push({ p: a, m: i })
    const nb = pdivmod(b, a).q
    const nc = pdivmod(dd, a).q
    b = nb
    dd = psub(nc, pderiv(b))
  }
  return out
}

/** Le radici razionali di un polinomio a coefficienti frazioni (con la molteplicità), e quello che resta. */
export function rationalRoots(poly: Rational[]): { roots: Rational[]; rest: Rational[] } {
  let p = [...poly]
  const roots: Rational[] = []
  // Con i coefficienti interi: le radici sono ±(divisori del termine noto)/(divisori del primo coefficiente).
  const lcm = p.reduce((m, c) => {
    const g = (a: bigint, b: bigint): bigint => (b ? g(b, a % b) : a < 0n ? -a : a)
    return (m * c.d) / g(m, c.d)
  }, 1n)
  const ints = () => p.map((c) => (c.n * lcm) / c.d)
  const divisors = (n: bigint): bigint[] => {
    n = n < 0n ? -n : n
    if (n === 0n || n > 1000000n) return []
    const out: bigint[] = []
    for (let d = 1n; d * d <= n; d++) {
      if (n % d === 0n) {
        out.push(d)
        if (d * d !== n) out.push(n / d)
      }
    }
    return out
  }
  const deflate = (q: Rational[], x: Rational) => {
    // (q) / (t − x), con Ruffini.
    const out: Rational[] = Array.from({ length: q.length - 1 }, () => ZERO)
    let carry = ZERO
    for (let k = q.length - 1; k >= 1; k--) {
      carry = carry.mul(x).add(q[k])
      out[k - 1] = carry
    }
    return out
  }
  for (;;) {
    if (p.length <= 1) break
    if (p[0].sign === 0) {
      roots.push(ZERO)
      p = p.slice(1)
      continue
    }
    const c = ints()
    const candidates: Rational[] = []
    for (const a of divisors(c[0])) for (const b of divisors(c[c.length - 1])) for (const s of [1n, -1n]) candidates.push(new Rational(s * a, b))
    const root = candidates.find((x) => pvalue(p, x).sign === 0)
    if (!root) break
    roots.push(root)
    p = deflate(p, root)
  }
  return { roots, rest: p }
}

/** Le radici (anche complesse) di un polinomio con i coefficienti con la virgola: Durand–Kerner. */
export function numericRoots(coeffs: number[]): { re: number; im: number }[] {
  const n = coeffs.length - 1
  if (n < 1) return []
  const lead = coeffs[n]
  const a = coeffs.map((c) => c / lead)
  let z = Array.from({ length: n }, (_, k) => ({ re: Math.cos((2 * Math.PI * k) / n + 0.4) * 1.3, im: Math.sin((2 * Math.PI * k) / n + 0.4) * 1.3 }))
  const mul = (p: { re: number; im: number }, q: { re: number; im: number }) => ({ re: p.re * q.re - p.im * q.im, im: p.re * q.im + p.im * q.re })
  const evalAt = (x: { re: number; im: number }) => {
    let y = { re: 0, im: 0 }
    for (let k = n; k >= 0; k--) y = { re: mul(y, x).re + a[k], im: mul(y, x).im }
    return y
  }
  for (let it = 0; it < 500; it++) {
    let moved = 0
    z = z.map((zi, i) => {
      let d = { re: 1, im: 0 }
      z.forEach((zj, j) => {
        if (i !== j) d = mul(d, { re: zi.re - zj.re, im: zi.im - zj.im })
      })
      const f = evalAt(zi)
      const den = d.re * d.re + d.im * d.im
      if (!den) return zi
      const step = { re: (f.re * d.re + f.im * d.im) / den, im: (f.im * d.re - f.re * d.im) / den }
      moved = Math.max(moved, Math.hypot(step.re, step.im))
      return { re: zi.re - step.re, im: zi.im - step.im }
    })
    if (moved < 1e-15) break
  }
  return z.map((r) => ({ re: r.re, im: Math.abs(r.im) < 1e-9 * Math.max(1, Math.abs(r.re)) ? 0 : r.im }))
}

/** Una frazione vicina a x (con il denominatore fino a `most`), o null. */
export function fractionNear(x: number, most = 10000): Rational | null {
  if (!Number.isFinite(x)) return null
  // Le frazioni continue: le migliori approssimazioni.
  let [h0, h1, k0, k1] = [0, 1, 1, 0]
  let y = x
  for (let i = 0; i < 40; i++) {
    const a = Math.floor(y)
    ;[h0, h1] = [h1, a * h1 + h0]
    ;[k0, k1] = [k1, a * k1 + k0]
    if (k1 > most || Math.abs(h1) > 1e12) return null
    if (Math.abs(x - h1 / k1) <= 1e-9 * Math.max(1, Math.abs(x))) return new Rational(BigInt(h1), BigInt(k1))
    const f = y - a
    if (f < 1e-12) return null
    y = 1 / f
  }
  return null
}

/** Un fattore di primo o di secondo grado (con il primo coefficiente 1) e quante volte compare. */
export interface Factor {
  p: Poly
  m: number
}

/**
 * La scomposizione in fattori con i coefficienti frazioni: il primo coefficiente e i fattori di primo
 * grado (le radici razionali) e di secondo (senza radici razionali, come x² + 1 o x² − 2). Se resta un
 * fattore di grado più alto che non si spezza (x³ − 2), c'è anche lui.
 */
export function factorQ(p: Poly): { lead: Rational; factors: Factor[] } {
  p = trim(p)
  const lead = p[p.length - 1] ?? ONE
  const factors: Factor[] = []
  for (const { p: s, m } of squareFree(p)) {
    const { roots, rest } = rationalRoots(s)
    for (const r of roots) factors.push({ p: [r.neg(), ONE], m })
    let left = monic(trim(rest))
    while (left.length > 3) {
      const quadratic = rationalQuadratic(left)
      if (!quadratic) break
      factors.push({ p: quadratic, m })
      left = monic(pdivmod(left, quadratic).q)
    }
    if (left.length > 1) factors.push({ p: left, m })
  }
  return { lead, factors }
}

/** Un fattore di secondo grado con i coefficienti frazioni di un polinomio senza radici razionali, o null. */
function rationalQuadratic(p: Poly): Poly | null {
  const roots = numericRoots(p.map((c) => c.toNumber()))
  for (let i = 0; i < roots.length; i++) {
    for (let j = i + 1; j < roots.length; j++) {
      const [a, b] = [roots[i], roots[j]]
      // Due radici coniugate, o due reali: (x − a)(x − b) ha i coefficienti reali.
      const conjugate = Math.abs(a.re - b.re) < 1e-7 * Math.max(1, Math.abs(a.re)) && Math.abs(a.im + b.im) < 1e-7 * Math.max(1, Math.abs(a.im))
      if (!conjugate && (a.im !== 0 || b.im !== 0)) continue
      const s = fractionNear(-(a.re + b.re))
      const q = fractionNear(a.re * b.re - a.im * b.im)
      if (!s || !q) continue
      const candidate: Poly = [q, s, ONE]
      if (!pdivmod(p, candidate).r.length) return candidate
    }
  }
  return null
}

/** Un fratto semplice: `num` / `factor`^k, con il grado di `num` minore di quello di `factor`. */
export interface PartialFraction {
  factor: Poly
  k: number
  num: Poly
}

/**
 * N/D come polinomio più fratti semplici: A/(x − a)^k e (Bx + C)/(x² + px + q)^k. Null se il
 * denominatore ha un fattore di grado più alto di 2 che non si spezza con le frazioni.
 */
export function partialFractions(N: Poly, D: Poly): { poly: Poly; parts: PartialFraction[] } | null {
  const { q, r } = pdivmod(N, D)
  if (!r.length) return { poly: q, parts: [] }
  const { lead, factors } = factorQ(D)
  if (factors.some((f) => f.p.length > 3)) return null
  const Dm = monic(D)
  const n = Dm.length - 1
  // Le incognite: i coefficienti dei numeratori, per ogni fattore e ogni potenza fino alla molteplicità.
  const unknowns: { factor: Poly; k: number; j: number; column: Poly }[] = []
  for (const f of factors) {
    for (let k = 1; k <= f.m; k++) {
      const rest = pdivmod(Dm, ppow(f.p, k)).q
      for (let j = 0; j < f.p.length - 1; j++) unknowns.push({ factor: f.p, k, j, column: pmul([...Array(j).fill(ZERO), ONE], rest) })
    }
  }
  if (unknowns.length !== n) return null
  // r / lead = Σ c · colonna: i coefficienti dei gradi da 0 a n − 1.
  const target = pscale(r, ONE.div(lead))
  const rows: Rational[][] = Array.from({ length: n }, (_, i) => [...unknowns.map((u) => u.column[i] ?? ZERO), target[i] ?? ZERO])
  const solution = solveLinear(rows)
  if (!solution) return null
  const parts: PartialFraction[] = []
  for (const f of factors) {
    for (let k = 1; k <= f.m; k++) {
      const num = trim(unknowns.map((u, i) => ({ u, c: solution[i] })).filter(({ u }) => u.factor === f.p && u.k === k).map(({ c }) => c))
      if (num.length) parts.push({ factor: f.p, k, num })
    }
  }
  return { poly: q, parts }
}

/** Le soluzioni di un sistema quadrato con le frazioni (righe [a₁ … aₙ | b]), o null se non è determinato. */
function solveLinear(rows: Rational[][]): Rational[] | null {
  const m = rows.map((r) => [...r])
  const n = m.length
  for (let col = 0; col < n; col++) {
    const pivot = m.findIndex((r, i) => i >= col && r[col].sign !== 0)
    if (pivot < 0) return null
    ;[m[col], m[pivot]] = [m[pivot], m[col]]
    const p = m[col][col]
    m[col] = m[col].map((x) => x.div(p))
    for (let i = 0; i < n; i++) {
      if (i === col || m[i][col].sign === 0) continue
      const f = m[i][col]
      m[i] = m[i].map((x, j) => x.sub(f.mul(m[col][j])))
    }
  }
  return m.map((r) => r[n])
}
