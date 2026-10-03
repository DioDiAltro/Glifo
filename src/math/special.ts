/**
 * Le funzioni speciali della probabilità: ln Γ, la gamma e la beta incomplete (la serie e la frazione
 * continua di Lentz dei libri di calcolo numerico, con circa 14 cifre giuste), la normale standard Φ e
 * il suo quantile Φ⁻¹. Senza altri moduli: le usano i conti (Φ(1{,}96)) e le distribuzioni.
 */
const EPS = 1e-16
const TINY = 1e-300

const LANCZOS = [
  0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
  12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
]

/** ln Γ(x), per x > 0. */
export function logGamma(x: number): number {
  if (x < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - logGamma(1 - x)
  // Per gli interi piccoli il fattoriale esatto.
  if (Number.isInteger(x) && x <= 30) {
    let r = 1
    for (let i = 2; i < x; i++) r *= i
    return Math.log(r)
  }
  const z = x - 1
  let a = LANCZOS[0]
  for (let i = 1; i < 9; i++) a += LANCZOS[i] / (z + i)
  const t = z + 7.5
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(a)
}

/** ln C(n, k). */
export function logChoose(n: number, k: number): number {
  return logGamma(n + 1) - logGamma(k + 1) - logGamma(n - k + 1)
}

function gammaSeries(a: number, x: number): number {
  let ap = a
  let del = 1 / a
  let sum = del
  for (let n = 0; n < 100000; n++) {
    ap++
    del *= x / ap
    sum += del
    if (Math.abs(del) < Math.abs(sum) * EPS) break
  }
  return sum * Math.exp(-x + a * Math.log(x) - logGamma(a))
}

function gammaFraction(a: number, x: number): number {
  let b = x + 1 - a
  let c = 1 / TINY
  let d = 1 / b
  let h = d
  for (let i = 1; i < 100000; i++) {
    const an = -i * (i - a)
    b += 2
    d = an * d + b
    if (Math.abs(d) < TINY) d = TINY
    c = b + an / c
    if (Math.abs(c) < TINY) c = TINY
    d = 1 / d
    const del = d * c
    h *= del
    if (Math.abs(del - 1) < EPS) break
  }
  return Math.exp(-x + a * Math.log(x) - logGamma(a)) * h
}

/** P(a, x) = γ(a, x)/Γ(a): la gamma incompleta regolarizzata (dal basso). */
export function gammaP(a: number, x: number): number {
  if (!(x > 0)) return 0
  if (x === Infinity) return 1
  return x < a + 1 ? gammaSeries(a, x) : 1 - gammaFraction(a, x)
}

/** Q(a, x) = 1 − P(a, x), precisa anche quando è piccola. */
export function gammaQ(a: number, x: number): number {
  if (!(x > 0)) return 1
  if (x === Infinity) return 0
  return x < a + 1 ? 1 - gammaSeries(a, x) : gammaFraction(a, x)
}

function betaFraction(a: number, b: number, x: number): number {
  const qab = a + b
  const qap = a + 1
  const qam = a - 1
  let c = 1
  let d = 1 - (qab * x) / qap
  if (Math.abs(d) < TINY) d = TINY
  d = 1 / d
  let h = d
  for (let m = 1; m <= 100000; m++) {
    const m2 = 2 * m
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2))
    d = 1 + aa * d
    if (Math.abs(d) < TINY) d = TINY
    c = 1 + aa / c
    if (Math.abs(c) < TINY) c = TINY
    d = 1 / d
    h *= d * c
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2))
    d = 1 + aa * d
    if (Math.abs(d) < TINY) d = TINY
    c = 1 + aa / c
    if (Math.abs(c) < TINY) c = TINY
    d = 1 / d
    const del = d * c
    h *= del
    if (Math.abs(del - 1) < EPS) break
  }
  return h
}

/** I_x(a, b): la beta incompleta regolarizzata. */
export function betaI(a: number, b: number, x: number): number {
  if (!(x > 0)) return 0
  if (x >= 1) return 1
  const front = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log1p(-x))
  if (x < (a + 1) / (a + b + 2)) return (front * betaFraction(a, b, x)) / a
  return 1 - (front * betaFraction(b, a, 1 - x)) / b
}

/** Φ(z): la funzione di ripartizione della normale standard. */
export function normalCdf(z: number): number {
  if (Number.isNaN(z)) return NaN
  const tail = 0.5 * gammaQ(0.5, (z * z) / 2)
  return z < 0 ? tail : 1 - tail
}

/** 1 − Φ(z), precisa anche nella coda. */
export function normalSf(z: number): number {
  return normalCdf(-z)
}

/** Φ⁻¹(p): il quantile della normale standard. */
export function normalQuantile(p: number): number {
  if (!(p > 0)) return p === 0 ? -Infinity : NaN
  if (!(p < 1)) return p === 1 ? Infinity : NaN
  return solveCdf(normalCdf, (z) => Math.exp((-z * z) / 2) / Math.sqrt(2 * Math.PI), p, -40, 40, 0)
}

/**
 * Il x con F(x) = p (F crescente e continua) tra lo e hi: Newton finché va, se no a metà
 * (bisezione), fino all'ultima cifra.
 */
export function solveCdf(F: (x: number) => number, f: (x: number) => number, p: number, lo: number, hi: number, guess: number): number {
  let x = Math.min(Math.max(guess, lo), hi)
  for (let i = 0; i < 300; i++) {
    const y = F(x) - p
    if (y === 0) return x
    if (y < 0) lo = x
    else hi = x
    const slope = f(x)
    let next = slope > 0 ? x - y / slope : NaN
    if (!(next > lo && next < hi)) next = Number.isFinite(lo) && Number.isFinite(hi) ? (lo + hi) / 2 : NaN
    if (Number.isNaN(next)) next = Number.isFinite(lo) ? (hi === Infinity ? Math.max(2 * lo, lo + 1) : (lo + hi) / 2) : Math.min(2 * hi, hi - 1)
    if (Math.abs(next - x) <= 1e-15 * Math.max(1, Math.abs(x))) return next
    x = next
    if (Number.isFinite(lo) && Number.isFinite(hi) && hi - lo <= 1e-15 * Math.max(1, Math.abs(lo), Math.abs(hi))) return x
  }
  return x
}
