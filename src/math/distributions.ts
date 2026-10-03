/**
 * Le distribuzioni di probabilità delle variabili aleatorie (X \sim B(10, 0{,}3)): Bernoulli,
 * binomiale, Poisson, geometrica, ipergeometrica (discrete); normale, esponenziale, uniforme, t di
 * Student, χ², F di Fisher, Gamma (continue). Per ognuna la densità (o la probabilità di un valore),
 * la funzione di ripartizione, i quantili, la media e la varianza; con i parametri esatti (frazioni)
 * anche le probabilità esatte, dove si può: una frazione, o una frazione per e^{−λ} (Poisson,
 * esponenziale).
 *
 * Le funzioni speciali (la gamma e la beta incomplete, Φ) sono in `special.ts`.
 */
import { MathError } from './evaluate'
import { Rational } from './exact'
import { betaI, gammaP, gammaQ, logChoose, logGamma, normalCdf, normalQuantile, normalSf, solveCdf } from './special'

// ——— I valori esatti ———

/** c + Σ coef · e^{−rate}: le probabilità esatte (una frazione, o con e^{−λ} per Poisson ed esponenziale). */
export interface ExpSum {
  c: Rational
  terms: { coef: Rational; rate: Rational }[]
}

export const expSum = (c: Rational, terms: ExpSum['terms'] = []): ExpSum => ({ c, terms })

export function subtractExp(a: ExpSum, b: ExpSum): ExpSum {
  const terms = a.terms.map((t) => ({ ...t }))
  for (const t of b.terms) {
    const same = terms.find((u) => u.rate.cmp(t.rate) === 0)
    if (same) same.coef = same.coef.sub(t.coef)
    else terms.push({ coef: t.coef.neg(), rate: t.rate })
  }
  return { c: a.c.sub(b.c), terms: terms.filter((t) => t.coef.sign !== 0) }
}

export function addExp(a: ExpSum, b: ExpSum): ExpSum {
  return subtractExp(a, { c: b.c.neg(), terms: b.terms.map((t) => ({ coef: t.coef.neg(), rate: t.rate })) })
}

export function expSumValue(s: ExpSum): number {
  return s.terms.reduce((sum, t) => sum + t.coef.toNumber() * Math.exp(-t.rate.toNumber()), s.c.toNumber())
}

const ONE = Rational.int(1)
const ZERO = Rational.int(0)

function choose(n: number, k: number): bigint {
  if (k < 0 || k > n) return 0n
  k = Math.min(k, n - k)
  let r = 1n
  for (let i = 1; i <= k; i++) r = (r * BigInt(n - k + i)) / BigInt(i)
  return r
}

function factorialBig(n: number): bigint {
  let r = 1n
  for (let i = 2; i <= n; i++) r *= BigInt(i)
  return r
}

// ——— Le distribuzioni ———

export type Family =
  | 'bernoulli'
  | 'binomial'
  | 'poisson'
  | 'geometric'
  | 'hypergeometric'
  | 'normal'
  | 'exponential'
  | 'uniform'
  | 'student'
  | 'chi2'
  | 'fisher'
  | 'gamma'

/** Come si scrive ogni distribuzione (nella legenda e nei messaggi), e quanti parametri vuole. */
export const FAMILIES: Record<Family, { tex: string; params: number; example: string; discrete: boolean }> = {
  bernoulli: { tex: '\\operatorname{Be}', params: 1, example: '\\operatorname{Be}(0{,}5)', discrete: true },
  binomial: { tex: 'B', params: 2, example: 'B(10, 0{,}3)', discrete: true },
  poisson: { tex: '\\operatorname{Po}', params: 1, example: '\\operatorname{Po}(3)', discrete: true },
  geometric: { tex: '\\operatorname{Geom}', params: 1, example: '\\operatorname{Geom}(0{,}2)', discrete: true },
  hypergeometric: { tex: '\\operatorname{H}', params: 3, example: '\\operatorname{H}(50, 10, 5)', discrete: true },
  normal: { tex: 'N', params: 2, example: 'N(0, 1)', discrete: false },
  exponential: { tex: '\\operatorname{Exp}', params: 1, example: '\\operatorname{Exp}(2)', discrete: false },
  uniform: { tex: 'U', params: 2, example: 'U(0, 1)', discrete: false },
  student: { tex: 't', params: 1, example: 't(10)', discrete: false },
  chi2: { tex: '\\chi^2', params: 1, example: '\\chi^2(3)', discrete: false },
  fisher: { tex: 'F', params: 2, example: 'F(3, 10)', discrete: false },
  gamma: { tex: '\\Gamma', params: 2, example: '\\Gamma(2, 1)', discrete: false },
}

export interface Distribution {
  family: Family
  /** I parametri con la virgola, nell'ordine in cui si scrivono. */
  params: number[]
  /** Gli stessi esatti (frazioni), dove lo sono. */
  exact: (Rational | null)[]
  discrete: boolean
  /** Il più piccolo e il più grande valore possibile (anche ±∞). */
  lo: number
  hi: number
  /** La densità (continue) o la probabilità di un valore (discrete). */
  pdf(x: number): number
  /** P(X ≤ x). */
  cdf(x: number): number
  /** P(X > x), precisa anche quando è piccola. */
  sf(x: number): number
  /** Il quantile: il più piccolo x con P(X ≤ x) ≥ p. */
  quantile(p: number): number
  /** NaN se non esiste (t con un grado di libertà), ∞ se è infinita. */
  mean: number
  variance: number
  exactMean: Rational | null
  exactVariance: Rational | null
  /** P(X ≤ x) esatta (per le discrete x è un intero); null se non si sa. */
  exactCdf(x: Rational): ExpSum | null
  /** P(X = k) esatta (solo le discrete); null se non si sa. */
  exactPmf(k: number): ExpSum | null
}

const invalid = (message: string): never => {
  throw new MathError(message)
}

function integerParam(v: number, what: string, min: number): number {
  if (!Number.isInteger(v) || v < min) invalid(`${what} è un numero intero${min > 0 ? ' positivo' : ' (0 o più)'}`)
  return v
}

function probabilityParam(v: number): number {
  if (!(v >= 0 && v <= 1)) invalid('La probabilità p va da 0 a 1')
  return v
}

function positiveParam(v: number, what: string): number {
  if (!(v > 0) || !Number.isFinite(v)) invalid(`${what} è un numero positivo`)
  return v
}

/** Le parti comuni delle distribuzioni discrete sugli interi: quantile e funzione di ripartizione dai valori. */
function discreteQuantile(d: Pick<Distribution, 'cdf' | 'lo' | 'hi'>, p: number): number {
  if (!(p >= 0 && p <= 1)) return NaN
  let lo = Number.isFinite(d.lo) ? d.lo : -1
  if (d.cdf(lo) >= p - 1e-12) return lo
  let hi = Number.isFinite(d.hi) ? d.hi : Math.max(lo + 1, 1)
  while (d.cdf(hi) < p - 1e-12) {
    if (hi >= 1e15) return Infinity
    hi = hi * 2 + 1
  }
  // Il primo intero tra lo (escluso) e hi con F ≥ p.
  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2)
    if (d.cdf(mid) >= p - 1e-12) hi = mid
    else lo = mid
  }
  return hi
}

function continuousQuantile(d: Pick<Distribution, 'cdf' | 'pdf' | 'lo' | 'hi' | 'mean'>, p: number): number {
  if (!(p >= 0 && p <= 1)) return NaN
  if (p === 0) return d.lo
  if (p === 1) return d.hi
  const guess = Number.isFinite(d.mean) ? d.mean : Number.isFinite(d.lo) ? d.lo + 1 : 0
  return solveCdf((x) => d.cdf(x), (x) => d.pdf(x), p, d.lo, d.hi, guess)
}

/** La parte intera di x (con gli errori della virgola: 2,9999999 conta come 3). */
const snapFloor = (x: number): number => {
  const r = Math.round(x)
  return Math.abs(x - r) < 1e-9 ? r : Math.floor(x)
}

/** La distribuzione con i suoi parametri (già calcolati); `exact` gli stessi come frazioni, dove lo sono. */
export function makeDistribution(family: Family, params: number[], exact: (Rational | null)[] = params.map(() => null)): Distribution {
  const info = FAMILIES[family]
  if (params.length !== info.params) {
    invalid(`${info.params === 1 ? 'Questa distribuzione vuole un parametro' : `Questa distribuzione vuole ${info.params} parametri`}: X \\sim ${info.example}`)
  }
  const base = { family, params, exact, discrete: info.discrete }
  const noExact = () => null
  switch (family) {
    case 'bernoulli': {
      const p = probabilityParam(params[0])
      const P = exact[0]
      return {
        ...base,
        lo: 0,
        hi: 1,
        pdf: (x) => (x === 0 ? 1 - p : x === 1 ? p : 0),
        cdf: (x) => (x < 0 ? 0 : x < 1 ? 1 - p : 1),
        sf: (x) => (x < 0 ? 1 : x < 1 ? p : 0),
        quantile: (q) => (!(q >= 0 && q <= 1) ? NaN : q <= 1 - p + 1e-12 ? 0 : 1),
        mean: p,
        variance: p * (1 - p),
        exactMean: P,
        exactVariance: P && P.mul(ONE.sub(P)),
        exactCdf: (x) => (P ? expSum(x.sign < 0 ? ZERO : x.cmp(ONE) < 0 ? ONE.sub(P) : ONE) : null),
        exactPmf: (k) => (P ? expSum(k === 0 ? ONE.sub(P) : k === 1 ? P : ZERO) : null),
      }
    }
    case 'binomial': {
      const n = integerParam(params[0], 'n (le prove)', 0)
      const p = probabilityParam(params[1])
      const P = exact[1]
      const pmf = (k: number): number => {
        if (!Number.isInteger(k) || k < 0 || k > n) return 0
        if (p === 0) return k === 0 ? 1 : 0
        if (p === 1) return k === n ? 1 : 0
        return Math.exp(logChoose(n, k) + k * Math.log(p) + (n - k) * Math.log1p(-p))
      }
      const sum = (from: number, to: number): number => {
        let s = 0
        for (let k = from; k <= to; k++) s += pmf(k)
        return s
      }
      const cdf = (x: number): number => {
        const k = snapFloor(x)
        if (k < 0) return 0
        if (k >= n) return 1
        if (n <= 2000) return k < n / 2 ? sum(0, k) : 1 - sum(k + 1, n)
        return betaI(n - k, k + 1, 1 - p)
      }
      const sf = (x: number): number => {
        const k = snapFloor(x)
        if (k < 0) return 1
        if (k >= n) return 0
        if (n <= 2000) return k >= n / 2 ? sum(k + 1, n) : 1 - sum(0, k)
        return betaI(k + 1, n - k, p)
      }
      const exactPmf = (k: number): ExpSum | null => {
        if (!P || n > 400) return null
        if (!Number.isInteger(k) || k < 0 || k > n) return expSum(ZERO)
        return expSum(new Rational(choose(n, k)).mul(P.powInt(BigInt(k))).mul(ONE.sub(P).powInt(BigInt(n - k))))
      }
      const d = {
        ...base,
        lo: 0,
        hi: n,
        pdf: pmf,
        cdf,
        sf,
        mean: n * p,
        variance: n * p * (1 - p),
        exactMean: P && Rational.int(n).mul(P),
        exactVariance: P && Rational.int(n).mul(P).mul(ONE.sub(P)),
        exactPmf,
        exactCdf: (x: Rational): ExpSum | null => {
          if (!P || n > 400) return null
          const k = Number(x.floor().n)
          if (k < 0) return expSum(ZERO)
          if (k >= n) return expSum(ONE)
          let s = ZERO
          for (let j = 0; j <= k; j++) s = s.add(exactPmf(j)!.c)
          return expSum(s)
        },
      }
      return { ...d, quantile: (q) => discreteQuantile(d, q) }
    }
    case 'poisson': {
      const lambda = positiveParam(params[0], 'λ')
      const L = exact[0]
      const pmf = (k: number): number => (!Number.isInteger(k) || k < 0 ? 0 : Math.exp(k * Math.log(lambda) - lambda - logGamma(k + 1)))
      const d = {
        ...base,
        lo: 0,
        hi: Infinity,
        pdf: pmf,
        cdf: (x: number) => {
          const k = snapFloor(x)
          return k < 0 ? 0 : gammaQ(k + 1, lambda)
        },
        sf: (x: number) => {
          const k = snapFloor(x)
          return k < 0 ? 1 : gammaP(k + 1, lambda)
        },
        mean: lambda,
        variance: lambda,
        exactMean: L,
        exactVariance: L,
        exactPmf: (k: number): ExpSum | null => {
          if (!L || k > 200) return null
          if (!Number.isInteger(k) || k < 0) return expSum(ZERO)
          return expSum(ZERO, [{ coef: L.powInt(BigInt(k)).div(new Rational(factorialBig(k))), rate: L }])
        },
        exactCdf: (x: Rational): ExpSum | null => {
          if (!L) return null
          const k = Number(x.floor().n)
          if (k < 0) return expSum(ZERO)
          if (k > 200) return null
          let s = ZERO
          let term = ONE
          for (let j = 0; j <= k; j++) {
            if (j > 0) term = term.mul(L).div(Rational.int(j))
            s = s.add(term)
          }
          return expSum(ZERO, [{ coef: s, rate: L }])
        },
      }
      return { ...d, quantile: (q) => discreteQuantile(d, q) }
    }
    case 'geometric': {
      // Il numero di prove fino al primo successo compreso: 1, 2, 3…
      const p = probabilityParam(params[0])
      if (p === 0) invalid('Con p = 0 il successo non arriva mai: p va da 0 (escluso) a 1')
      const P = exact[0]
      const q = 1 - p
      const d = {
        ...base,
        lo: 1,
        hi: Infinity,
        pdf: (k: number) => (!Number.isInteger(k) || k < 1 ? 0 : Math.pow(q, k - 1) * p),
        cdf: (x: number) => {
          const k = snapFloor(x)
          return k < 1 ? 0 : -Math.expm1(k * Math.log1p(-p))
        },
        sf: (x: number) => {
          const k = snapFloor(x)
          return k < 1 ? 1 : Math.pow(q, k)
        },
        mean: 1 / p,
        variance: q / (p * p),
        exactMean: P && ONE.div(P),
        exactVariance: P && ONE.sub(P).div(P.mul(P)),
        exactPmf: (k: number): ExpSum | null => {
          if (!P || k > 2000) return null
          if (!Number.isInteger(k) || k < 1) return expSum(ZERO)
          return expSum(ONE.sub(P).powInt(BigInt(k - 1)).mul(P))
        },
        exactCdf: (x: Rational): ExpSum | null => {
          if (!P) return null
          const k = Number(x.floor().n)
          if (k < 1) return expSum(ZERO)
          if (k > 2000) return null
          return expSum(ONE.sub(ONE.sub(P).powInt(BigInt(k))))
        },
      }
      return { ...d, quantile: (r) => discreteQuantile(d, r) }
    }
    case 'hypergeometric': {
      // H(N, K, n): N oggetti, K «buoni», se ne prendono n senza rimetterli.
      const N = integerParam(params[0], 'N (gli oggetti)', 1)
      const K = integerParam(params[1], 'K (gli oggetti «buoni»)', 0)
      const n = integerParam(params[2], 'n (le estrazioni)', 0)
      if (K > N || n > N) invalid('In H(N, K, n) i «buoni» K e le estrazioni n sono al massimo N')
      const lo = Math.max(0, n - (N - K))
      const hi = Math.min(n, K)
      const pmf = (k: number): number => (!Number.isInteger(k) || k < lo || k > hi ? 0 : Math.exp(logChoose(K, k) + logChoose(N - K, n - k) - logChoose(N, n)))
      const sum = (from: number, to: number) => {
        let s = 0
        for (let k = Math.max(from, lo); k <= Math.min(to, hi); k++) s += pmf(k)
        return s
      }
      const exactPmf = (k: number): ExpSum | null => {
        if (N > 5000) return null
        if (!Number.isInteger(k) || k < lo || k > hi) return expSum(ZERO)
        return expSum(new Rational(choose(K, k) * choose(N - K, n - k), choose(N, n)))
      }
      const d = {
        ...base,
        lo,
        hi,
        pdf: pmf,
        cdf: (x: number) => {
          const k = snapFloor(x)
          return k < lo ? 0 : k >= hi ? 1 : sum(lo, k)
        },
        sf: (x: number) => {
          const k = snapFloor(x)
          return k < lo ? 1 : k >= hi ? 0 : sum(k + 1, hi)
        },
        mean: (n * K) / N,
        variance: N > 1 ? (((n * K) / N) * (1 - K / N) * (N - n)) / (N - 1) : 0,
        exactMean: new Rational(BigInt(n * K), BigInt(N)),
        exactVariance:
          N > 1
            ? new Rational(BigInt(n * K), BigInt(N))
                .mul(new Rational(BigInt(N - K), BigInt(N)))
                .mul(new Rational(BigInt(N - n), BigInt(N - 1)))
            : ZERO,
        exactPmf,
        exactCdf: (x: Rational): ExpSum | null => {
          if (N > 5000) return null
          const k = Number(x.floor().n)
          let s = ZERO
          for (let j = lo; j <= Math.min(k, hi); j++) s = s.add(exactPmf(j)!.c)
          return expSum(s)
        },
      }
      return { ...d, quantile: (q) => discreteQuantile(d, q) }
    }
    case 'normal': {
      // N(μ, σ²): il secondo parametro è la varianza, come nei libri.
      const mu = params[0]
      const s2 = positiveParam(params[1], 'La varianza σ²')
      const s = Math.sqrt(s2)
      if (!Number.isFinite(mu)) invalid('La media μ è un numero')
      return {
        ...base,
        lo: -Infinity,
        hi: Infinity,
        pdf: (x) => Math.exp(-((x - mu) ** 2) / (2 * s2)) / (s * Math.sqrt(2 * Math.PI)),
        cdf: (x) => normalCdf((x - mu) / s),
        sf: (x) => normalSf((x - mu) / s),
        quantile: (p) => mu + s * normalQuantile(p),
        mean: mu,
        variance: s2,
        exactMean: exact[0],
        exactVariance: exact[1],
        exactCdf: (x) => (exact[0] && x.cmp(exact[0]) === 0 ? expSum(new Rational(1n, 2n)) : null),
        exactPmf: noExact,
      }
    }
    case 'exponential': {
      const lambda = positiveParam(params[0], 'λ')
      const L = exact[0]
      return {
        ...base,
        lo: 0,
        hi: Infinity,
        pdf: (x) => (x < 0 ? 0 : lambda * Math.exp(-lambda * x)),
        cdf: (x) => (x <= 0 ? 0 : -Math.expm1(-lambda * x)),
        sf: (x) => (x <= 0 ? 1 : Math.exp(-lambda * x)),
        quantile: (p) => (!(p >= 0 && p <= 1) ? NaN : -Math.log1p(-p) / lambda),
        mean: 1 / lambda,
        variance: 1 / (lambda * lambda),
        exactMean: L && ONE.div(L),
        exactVariance: L && ONE.div(L.mul(L)),
        exactCdf: (x) => (!L ? null : x.sign <= 0 ? expSum(ZERO) : expSum(ONE, [{ coef: ONE.neg(), rate: L.mul(x) }])),
        exactPmf: noExact,
      }
    }
    case 'uniform': {
      const [a, b] = params
      if (!(a < b)) invalid('In U(a, b) va a < b')
      const [A, B] = exact
      const width = b - a
      return {
        ...base,
        lo: a,
        hi: b,
        pdf: (x) => (x < a || x > b ? 0 : 1 / width),
        cdf: (x) => (x <= a ? 0 : x >= b ? 1 : (x - a) / width),
        sf: (x) => (x <= a ? 1 : x >= b ? 0 : (b - x) / width),
        quantile: (p) => (!(p >= 0 && p <= 1) ? NaN : a + p * width),
        mean: (a + b) / 2,
        variance: (width * width) / 12,
        exactMean: A && B && A.add(B).div(Rational.int(2)),
        exactVariance: A && B && B.sub(A).mul(B.sub(A)).div(Rational.int(12)),
        exactCdf: (x) => (!A || !B ? null : expSum(x.cmp(A) <= 0 ? ZERO : x.cmp(B) >= 0 ? ONE : x.sub(A).div(B.sub(A)))),
        exactPmf: noExact,
      }
    }
    case 'student': {
      const nu = positiveParam(params[0], 'I gradi di libertà')
      const c = Math.exp(logGamma((nu + 1) / 2) - logGamma(nu / 2)) / Math.sqrt(nu * Math.PI)
      const tail = (t: number) => 0.5 * betaI(nu / 2, 0.5, nu / (nu + t * t))
      const d = {
        ...base,
        lo: -Infinity,
        hi: Infinity,
        pdf: (t: number) => c * Math.pow(1 + (t * t) / nu, -(nu + 1) / 2),
        cdf: (t: number) => (t === 0 ? 0.5 : t < 0 ? tail(t) : 1 - tail(t)),
        sf: (t: number) => (t === 0 ? 0.5 : t > 0 ? tail(t) : 1 - tail(t)),
        mean: nu > 1 ? 0 : NaN,
        variance: nu > 2 ? nu / (nu - 2) : nu > 1 ? Infinity : NaN,
        exactMean: nu > 1 ? ZERO : null,
        exactVariance: nu > 2 && exact[0] ? exact[0].div(exact[0].sub(Rational.int(2))) : null,
        exactCdf: (x: Rational) => (x.sign === 0 ? expSum(new Rational(1n, 2n)) : null),
        exactPmf: noExact,
      }
      return { ...d, quantile: (p) => continuousQuantile(d, p) }
    }
    case 'chi2': {
      const k = positiveParam(params[0], 'I gradi di libertà')
      const logC = -(k / 2) * Math.LN2 - logGamma(k / 2)
      const d = {
        ...base,
        lo: 0,
        hi: Infinity,
        pdf: (x: number) => (x < 0 ? 0 : x === 0 ? (k < 2 ? Infinity : k === 2 ? 0.5 : 0) : Math.exp(logC + (k / 2 - 1) * Math.log(x) - x / 2)),
        cdf: (x: number) => gammaP(k / 2, x / 2),
        sf: (x: number) => gammaQ(k / 2, x / 2),
        mean: k,
        variance: 2 * k,
        exactMean: exact[0],
        exactVariance: exact[0] && exact[0].mul(Rational.int(2)),
        exactCdf: noExact,
        exactPmf: noExact,
      }
      return { ...d, quantile: (p) => continuousQuantile(d, p) }
    }
    case 'fisher': {
      const d1 = positiveParam(params[0], 'I gradi di libertà')
      const d2 = positiveParam(params[1], 'I gradi di libertà')
      const logB = logGamma(d1 / 2) + logGamma(d2 / 2) - logGamma((d1 + d2) / 2)
      const d = {
        ...base,
        lo: 0,
        hi: Infinity,
        pdf: (x: number) =>
          x <= 0 ? 0 : Math.exp((d1 / 2) * Math.log(d1) + (d2 / 2) * Math.log(d2) + (d1 / 2 - 1) * Math.log(x) - ((d1 + d2) / 2) * Math.log(d2 + d1 * x) - logB),
        cdf: (x: number) => (x <= 0 ? 0 : betaI(d1 / 2, d2 / 2, (d1 * x) / (d1 * x + d2))),
        sf: (x: number) => (x <= 0 ? 1 : betaI(d2 / 2, d1 / 2, d2 / (d2 + d1 * x))),
        mean: d2 > 2 ? d2 / (d2 - 2) : NaN,
        variance: d2 > 4 ? (2 * d2 * d2 * (d1 + d2 - 2)) / (d1 * (d2 - 2) ** 2 * (d2 - 4)) : NaN,
        exactMean: d2 > 2 && exact[1] ? exact[1].div(exact[1].sub(Rational.int(2))) : null,
        exactVariance: null,
        exactCdf: noExact,
        exactPmf: noExact,
      }
      return { ...d, quantile: (p) => continuousQuantile(d, p) }
    }
    case 'gamma': {
      // Γ(α, λ): la forma α e il tasso λ (la media è α/λ).
      const alpha = positiveParam(params[0], 'La forma α')
      const lambda = positiveParam(params[1], 'Il tasso λ')
      const logC = alpha * Math.log(lambda) - logGamma(alpha)
      const [A, L] = exact
      const d = {
        ...base,
        lo: 0,
        hi: Infinity,
        pdf: (x: number) => (x < 0 ? 0 : x === 0 ? (alpha < 1 ? Infinity : alpha === 1 ? lambda : 0) : Math.exp(logC + (alpha - 1) * Math.log(x) - lambda * x)),
        cdf: (x: number) => gammaP(alpha, lambda * x),
        sf: (x: number) => gammaQ(alpha, lambda * x),
        mean: alpha / lambda,
        variance: alpha / (lambda * lambda),
        exactMean: A && L && A.div(L),
        exactVariance: A && L && A.div(L.mul(L)),
        exactCdf: noExact,
        exactPmf: noExact,
      }
      return { ...d, quantile: (p) => continuousQuantile(d, p) }
    }
  }
}

/** Un intervallo di valori di X: gli estremi (anche ±∞, con la frazione se è esatto) e se ne fanno parte. */
export interface End {
  v: number
  exact: Rational | null
  closed: boolean
}

export interface Interval {
  lo: End
  hi: End
}

/** Per le discrete: i valori interi dell'intervallo, dal primo all'ultimo (anche ±∞). */
function integerRange(i: Interval): [number, number] {
  const first = (e: End): number => {
    if (e.v === -Infinity) return -Infinity
    const r = Math.round(e.v)
    if (Math.abs(e.v - r) < 1e-9) return e.closed ? r : r + 1
    return Math.ceil(e.v)
  }
  const last = (e: End): number => {
    if (e.v === Infinity) return Infinity
    const r = Math.round(e.v)
    if (Math.abs(e.v - r) < 1e-9) return e.closed ? r : r - 1
    return Math.floor(e.v)
  }
  return [first(i.lo), last(i.hi)]
}

/** P(X ∈ intervallo), con i numeri. */
export function intervalProbability(d: Distribution, i: Interval): number {
  if (d.discrete) {
    const [a, b] = integerRange(i)
    if (a > b) return 0
    const below = a === -Infinity ? 0 : d.cdf(a - 1)
    if (b === Infinity) return a === -Infinity ? 1 : d.sf(a - 1)
    // Due code: si sottrae dalla parte più precisa.
    if (a !== -Infinity && d.cdf(a - 1) > 0.5) return Math.max(0, d.sf(a - 1) - d.sf(b))
    return Math.max(0, d.cdf(b) - below)
  }
  const { lo, hi } = i
  if (!(hi.v > lo.v)) return 0
  if (lo.v === -Infinity) return d.cdf(hi.v)
  if (hi.v === Infinity) return d.sf(lo.v)
  if (d.cdf(lo.v) > 0.5) return Math.max(0, d.sf(lo.v) - d.sf(hi.v))
  return Math.max(0, d.cdf(hi.v) - d.cdf(lo.v))
}

/** P(X ∈ intervallo) esatta, o null. */
export function exactIntervalProbability(d: Distribution, i: Interval): ExpSum | null {
  const cdfAt = (x: number, exact: Rational | null): ExpSum | null => {
    if (x === Infinity) return expSum(ONE)
    if (x === -Infinity) return expSum(ZERO)
    if (d.discrete) return d.exactCdf(Rational.int(x))
    return exact && d.exactCdf(exact)
  }
  if (d.discrete) {
    const [a, b] = integerRange(i)
    if (a > b) return expSum(ZERO)
    // Un valore solo: la sua probabilità (anche dove la funzione di ripartizione è troppo lunga).
    if (a === b) return d.exactPmf(a)
    const hi = cdfAt(b, null)
    const lo = cdfAt(a === -Infinity ? -Infinity : a - 1, null)
    return hi && lo && subtractExp(hi, lo)
  }
  if (!(i.hi.v > i.lo.v)) return expSum(ZERO)
  const hi = cdfAt(i.hi.v, i.hi.exact)
  const lo = cdfAt(i.lo.v, i.lo.exact)
  return hi && lo && subtractExp(hi, lo)
}
