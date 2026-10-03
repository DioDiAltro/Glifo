/**
 * La statistica dei dati: media, mediana, moda, varianza e scarto quadratico medio (della
 * popolazione, dividendo per n, e campionari, per n − 1), quantili e quartili (come QUARTILE.INC di
 * Excel e R: la posizione (n − 1)p tra i dati in ordine, con l'interpolazione), campo di variazione,
 * covarianza, correlazione e retta di regressione.
 *
 * I dati sono un vettore della nota ($x = (2, 3, 5, 7)$) o numeri scritti uno per uno, con le
 * frequenze in un secondo vettore se ci sono (\operatorname{media}(x, f)). Si fanno con le frazioni
 * (esatti) o con la virgola, come i conti con vettori e matrici (`Field`).
 */
import { MathError } from './evaluate'
import type { Field } from './linear'

/** Le funzioni dei dati che danno un numero. */
export const DATA_FUNCTIONS = new Set(['mean', 'median', 'mode', 'var', 'svar', 'sd', 'ssd', 'range', 'quantile', 'percentile'])

/** I dati, con le frequenze (o i pesi) se ci sono. */
export interface Data<T> {
  values: T[]
  weights: T[] | null
}

const fail = (message: string): never => {
  throw new MathError(message)
}

function check<T>(d: Data<T>): void {
  if (!d.values.length) fail('Non ci sono dati')
  if (d.weights && d.weights.length !== d.values.length) fail('I valori e le frequenze vanno in due vettori lunghi uguali')
}

/** Quanti sono i dati: n, o la somma delle frequenze. */
export function count<T>(F: Field<T>, d: Data<T>): T {
  return d.weights ? d.weights.reduce((s, w) => F.add(s, w), F.zero()) : F.int(d.values.length)
}

export function mean<T>(F: Field<T>, d: Data<T>): T {
  check(d)
  let sum = F.zero()
  d.values.forEach((x, i) => (sum = F.add(sum, d.weights ? F.mul(d.weights[i], x) : x)))
  const n = count(F, d)
  if (F.isZero(n, 0)) fail('Le frequenze sono tutte zero')
  return F.div(sum, n)
}

/** La varianza: Σ(x − media)²/n, o /(n − 1) quella campionaria. */
export function variance<T>(F: Field<T>, d: Data<T>, sample: boolean): T {
  const m = mean(F, d)
  let sum = F.zero()
  d.values.forEach((x, i) => {
    const dx = F.sub(x, m)
    const sq = F.mul(dx, dx)
    sum = F.add(sum, d.weights ? F.mul(d.weights[i], sq) : sq)
  })
  const n = count(F, d)
  const divisor = sample ? F.sub(n, F.one()) : n
  if (F.toNumber(divisor) <= 0) fail('La varianza campionaria vuole almeno due dati')
  return F.div(sum, divisor)
}

export function deviation<T>(F: Field<T>, d: Data<T>, sample: boolean): T {
  return F.sqrt(variance(F, d, sample))
}

/** I dati in ordine, ripetuti tante volte quanto dice la loro frequenza (che deve essere un intero). */
export function sorted<T>(F: Field<T>, d: Data<T>): T[] {
  check(d)
  const out: T[] = []
  d.values.forEach((x, i) => {
    const times = d.weights ? F.integer(d.weights[i]) : 1
    if (times === null || times < 0) fail('Per la mediana e i quantili le frequenze sono numeri interi')
    if (out.length + times! > 1e6) fail('Troppi dati')
    for (let k = 0; k < times!; k++) out.push(x)
  })
  if (!out.length) fail('Non ci sono dati')
  return out.sort((a, b) => F.cmp(a, b))
}

/** Il quantile di ordine p (da 0 a 1): la posizione (n − 1)p tra i dati in ordine, come QUARTILE.INC. */
export function quantile<T>(F: Field<T>, d: Data<T>, p: T): T {
  const pv = F.toNumber(p)
  if (!(pv >= 0 && pv <= 1)) fail('L\'ordine del quantile va da 0 a 1 (0{,}25 è il primo quartile)')
  const s = sorted(F, d)
  const h = F.mul(F.int(s.length - 1), p)
  const lo = F.integer(h) ?? Math.floor(F.toNumber(h))
  if (lo >= s.length - 1) return s[s.length - 1]
  const frac = F.sub(h, F.int(lo))
  return F.add(s[lo], F.mul(frac, F.sub(s[lo + 1], s[lo])))
}

export function median<T>(F: Field<T>, d: Data<T>): T {
  return quantile(F, d, F.div(F.one(), F.int(2)))
}

/** Le mode: i valori più frequenti; nessuna se tutti i valori hanno la stessa frequenza (e sono più di uno). */
export function modes<T>(F: Field<T>, d: Data<T>): T[] {
  check(d)
  const groups: { v: T; w: T }[] = []
  d.values.forEach((x, i) => {
    const w = d.weights ? d.weights[i] : F.one()
    const same = groups.find((g) => F.cmp(g.v, x) === 0)
    if (same) same.w = F.add(same.w, w)
    else groups.push({ v: x, w })
  })
  let best = groups[0].w
  for (const g of groups) if (F.cmp(g.w, best) > 0) best = g.w
  const top = groups.filter((g) => F.cmp(g.w, best) === 0)
  if (top.length === groups.length && groups.length > 1) return []
  return top.map((g) => g.v).sort((a, b) => F.cmp(a, b))
}

/** Il campo di variazione: il più grande meno il più piccolo. */
export function range<T>(F: Field<T>, d: Data<T>): T {
  const s = sorted(F, { values: d.values, weights: null })
  return F.sub(s[s.length - 1], s[0])
}

function paired<T>(x: T[], y: T[]): void {
  if (x.length !== y.length) fail('Le due serie di dati vanno in due vettori lunghi uguali')
  if (x.length < 2) fail('Servono almeno due coppie di dati')
}

/** La covarianza: Σ(x − x̄)(y − ȳ)/n (o /(n − 1), campionaria). */
export function covariance<T>(F: Field<T>, x: T[], y: T[], sample = false): T {
  paired(x, y)
  const mx = mean(F, { values: x, weights: null })
  const my = mean(F, { values: y, weights: null })
  let sum = F.zero()
  x.forEach((xi, i) => (sum = F.add(sum, F.mul(F.sub(xi, mx), F.sub(y[i], my)))))
  return F.div(sum, F.int(sample ? x.length - 1 : x.length))
}

/** Il coefficiente di correlazione di Pearson r. */
export function correlation<T>(F: Field<T>, x: T[], y: T[]): T {
  const sxy = covariance(F, x, y)
  const sxx = covariance(F, x, x)
  const syy = covariance(F, y, y)
  if (F.isZero(sxx, 1e-300) || F.isZero(syy, 1e-300)) fail('Con dati tutti uguali la correlazione non c\'è')
  return F.div(sxy, F.sqrt(F.mul(sxx, syy)))
}

/** La retta di regressione y = a + b x (i minimi quadrati). */
export function regression<T>(F: Field<T>, x: T[], y: T[]): { a: T; b: T } {
  const sxy = covariance(F, x, y)
  const sxx = covariance(F, x, x)
  if (F.isZero(sxx, 1e-300)) fail('Con le x tutte uguali la retta di regressione non c\'è')
  const b = F.div(sxy, sxx)
  const a = F.sub(mean(F, { values: y, weights: null }), F.mul(b, mean(F, { values: x, weights: null })))
  return { a, b }
}

/** Una funzione dei dati che dà un numero (media, mediana…); `p` per quantile e percentile. */
export function statistic<T>(F: Field<T>, name: string, d: Data<T>, p?: T): T {
  switch (name) {
    case 'mean':
      return mean(F, d)
    case 'median':
      return median(F, d)
    case 'mode': {
      const m = modes(F, d)
      if (m.length !== 1) fail(m.length ? 'Ci sono più mode: chiedile da sole, \\operatorname{moda}(x) =' : 'Non c\'è una moda: i valori hanno tutti la stessa frequenza')
      return m[0]
    }
    case 'var':
      return variance(F, d, false)
    case 'svar':
      return variance(F, d, true)
    case 'sd':
      return deviation(F, d, false)
    case 'ssd':
      return deviation(F, d, true)
    case 'range':
      return range(F, d)
    case 'quantile':
    case 'percentile': {
      if (p === undefined) return fail(`Manca l'ordine: \\operatorname{${name}}(x, ${name === 'quantile' ? '0{,}9' : '90'})`)
      return quantile(F, d, name === 'percentile' ? F.div(p, F.int(100)) : p)
    }
  }
  return fail(`Non so calcolare ${name}`)
}

/** I numeri con la virgola, per i conti come \operatorname{media}(2, 3, 5). */
const NUMBERS: Field<number> = {
  exact: false,
  zero: () => 0,
  one: () => 1,
  int: (n) => n,
  num: (_text, value) => value,
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  neg: (a) => -a,
  size: Math.abs,
  isZero: (a, tolerance) => Math.abs(a) <= tolerance,
  toNumber: (a) => a,
  sqrt: Math.sqrt,
  fromFloat: (x) => x,
  integer: (a) => (Number.isInteger(a) ? a : null),
  cmp: (a, b) => a - b,
}

/** La statistica di numeri scritti uno per uno (per quantile e percentile l'ultimo è l'ordine). */
export function dataStatistic(name: string, values: number[]): number {
  if (name === 'quantile' || name === 'percentile') {
    if (values.length < 2) fail(`Si scrive \\operatorname{${name}}(x, ${name === 'quantile' ? '0{,}9' : '90'}), con x i dati`)
    return statistic(NUMBERS, name, { values: values.slice(0, -1), weights: null }, values[values.length - 1])
  }
  return statistic(NUMBERS, name, { values, weights: null })
}
