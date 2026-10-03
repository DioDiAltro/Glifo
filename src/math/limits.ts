/**
 * I limiti e le serie, con i numeri. Un limite si cerca avvicinandosi al punto sempre di più (con
 * l'estrapolazione di Richardson, che dai valori vicini ricava quello nel punto, anche per 0/0); una
 * serie con le somme accelerate: Eulero–Maclaurin per i termini con un segno solo, Cohen–Rodriguez
 * Villegas–Zagier per quelli a segni alterni. Poi il risultato si riconosce, se si può: 1, π²/6,
 * ln 2, e, √2.
 */
import { fracTex, fracText, nearFraction, surd } from './complex'
import { integrate, spend } from './evaluate'
import { formatNumber, type FormatOptions, type FormattedResult } from './format'

export type LimitValue =
  | { k: 'value'; v: number }
  | { k: 'infinity'; sign: 1 | -1 }
  /** Non c'è: oscilla, o da sinistra e da destra viene diverso. */
  | { k: 'none'; left?: LimitValue; right?: LimitValue }

const STEPS = 14

/** Il valore verso cui vanno i numeri `values`, presi con il passo che si dimezza (h = 2^{-k}). */
function towards(values: number[]): LimitValue {
  const n = values.length
  const last = values.slice(-6)
  if (last.every((v) => v === Infinity)) return { k: 'infinity', sign: 1 }
  if (last.every((v) => v === -Infinity)) return { k: 'infinity', sign: -1 }
  // Valori che crescono finché non superano il numero più grande che si scrive (x e^{-x} per x → −∞).
  const end = values[n - 1]
  if (end === Infinity || end === -Infinity) {
    const k = values.indexOf(end)
    const before = values.slice(Math.max(0, k - 3), k)
    if (values.slice(k).every((v) => v === end) && before.length >= 2 && before.every((v, i) => Number.isFinite(v) && Math.sign(v) === Math.sign(end) && (i === 0 || Math.abs(v) > Math.abs(before[i - 1])))) {
      return { k: 'infinity', sign: end > 0 ? 1 : -1 }
    }
  }
  if (!last.every(Number.isFinite)) return { k: 'none' }
  // Richardson: se la funzione è regolare in h, i valori corretti a ogni livello convergono in fretta.
  const table: number[][] = []
  for (let i = 0; i < n; i++) {
    table.push([values[i]])
    for (let j = 1; j <= i; j++) {
      const a = table[i][j - 1]
      const b = table[i - 1][j - 1]
      table[i].push(a + (a - b) / (2 ** j - 1))
    }
  }
  const diagonal = table.map((row, i) => row[Math.min(i, 8)])
  const L = diagonal[n - 1]
  const scale = Math.max(1, Math.abs(L))
  if (Number.isFinite(L) && Math.abs(L - diagonal[n - 2]) <= 1e-9 * scale && Math.abs(L - diagonal[n - 3]) <= 1e-8 * scale) return { k: 'value', v: L }
  // Che cresce senza fermarsi (anche piano, come un logaritmo): verso l'infinito.
  const steps = values.slice(-7).map((v, i, a) => (i ? v - a[i - 1] : 0)).slice(1)
  const sameSign = steps.every((d) => d > 0) || steps.every((d) => d < 0)
  if (sameSign && steps.slice(1).every((d, i) => Math.abs(d) >= 0.9 * Math.abs(steps[i])) && Math.abs(values[n - 1]) > 4) {
    return { k: 'infinity', sign: steps[0] > 0 ? 1 : -1 }
  }
  // Che si ferma, ma piano (x \ln x per x → 0): con Aitken.
  const aitken: number[] = []
  for (let i = 2; i < n; i++) {
    const d1 = values[i] - values[i - 1]
    const d2 = values[i] - 2 * values[i - 1] + values[i - 2]
    aitken.push(Math.abs(d2) < 1e-300 ? values[i] : values[i] - (d1 * d1) / d2)
  }
  const A = aitken[aitken.length - 1]
  if (Number.isFinite(A) && Math.abs(A - aitken[aitken.length - 2]) <= 1e-6 * Math.max(1, Math.abs(A)) && Math.abs(values[n - 1] - A) < 0.05 * Math.max(1, Math.abs(A))) {
    return { k: 'value', v: A }
  }
  return { k: 'none' }
}

/**
 * Quando i valori si avvicinano piano (x \ln x, x^x, \frac{\sin x}{x} per x → ∞): molto più vicino al
 * punto, dove si fermano (o crescono come un logaritmo).
 */
function slowly(values: number[]): LimitValue {
  const last = values.slice(-8)
  if (!last.every(Number.isFinite)) return { k: 'none' }
  const mean = last.reduce((s, v) => s + v, 0) / last.length
  if (last.every((v) => Math.abs(v - mean) <= 1e-8 * Math.max(1, Math.abs(mean)))) return { k: 'value', v: mean }
  const steps = last.map((v, i) => (i ? v - last[i - 1] : 0)).slice(1)
  const sameSign = steps.every((d) => d > 0) || steps.every((d) => d < 0)
  if (!sameSign) return { k: 'none' }
  const ratios = steps.slice(1).map((d, i) => d / steps[i])
  if (ratios.every((r) => r >= 0.9)) return Math.abs(last[last.length - 1]) > 4 ? { k: 'infinity', sign: steps[0] > 0 ? 1 : -1 } : { k: 'none' }
  // Passi che si accorciano sempre della stessa parte: la coda che manca, come una serie geometrica.
  const r = ratios[ratios.length - 1]
  if (!ratios.every((q) => q > 0 && q < 0.9)) return { k: 'none' }
  const L = last[last.length - 1] + (steps[steps.length - 1] * r) / (1 - r)
  const before = last[last.length - 2] + (steps[steps.length - 2] * ratios[ratios.length - 2]) / (1 - ratios[ratios.length - 2])
  return Math.abs(L - before) <= 1e-7 * Math.max(1, Math.abs(L)) ? { k: 'value', v: L } : { k: 'none' }
}

/** Il limite da una parte: x → a da destra (dir 1) o da sinistra (−1); per a = ±∞ da dentro. */
function oneSided(f: (x: number) => number, a: number, dir: 1 | -1): LimitValue {
  const at = (k: number) => {
    const h = 2 ** -k
    return Number.isFinite(a) ? f(a + dir * h) : f(Math.sign(a) / h)
  }
  const values: number[] = []
  for (let k = 1; k <= STEPS; k++) values.push(at(k))
  // Numeri troppo grandi per i conti (n! / n^n con n = 4096): bastano quelli prima.
  const broken = values.findIndex((v) => Number.isNaN(v))
  if (broken >= 7) return towards(values.slice(0, broken))
  const near = towards(values)
  if (near.k !== 'none') return near
  // Più vicino: fino a h = 2^{-48}, dove servono i valori che cambiano piano.
  const closer: number[] = []
  for (let k = STEPS + 1; k <= 48; k++) closer.push(at(k))
  return slowly(closer)
}

const close = (a: number, b: number) => Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(b))

/**
 * \lim_{x \to a} f(x): `side` 1 da destra (0^+), −1 da sinistra, 0 da tutte e due le parti (se f
 * esiste solo da una parte, come \sqrt{x} in 0, quella). `sequence`: n va all'infinito sui numeri
 * interi, ((-1)^n non ha limite).
 */
export function limit(f: (x: number) => number, a: number, side: -1 | 0 | 1, sequence = false): LimitValue {
  if (Number.isNaN(a)) return { k: 'none' }
  if (!Number.isFinite(a)) {
    const value = oneSided(f, a, a > 0 ? -1 : 1)
    if (!sequence || value.k === 'none') return value
    // Una successione: anche sui numeri dispari, se no (−1)^n sembrerebbe 1.
    const odd = oneSided((x) => f(x + Math.sign(a)), a, a > 0 ? -1 : 1)
    if (value.k === 'value' && odd.k === 'value' && close(value.v, odd.v)) return value
    if (value.k === 'infinity' && odd.k === 'infinity' && value.sign === odd.sign) return value
    return { k: 'none' }
  }
  if (side) return oneSided(f, a, side)
  const left = oneSided(f, a, -1)
  const right = oneSided(f, a, 1)
  const defined = (dir: 1 | -1) => [1, 2, 3, 4].some((k) => Number.isFinite(f(a + dir * 2 ** -k)))
  if (left.k === 'none' && !defined(-1)) return right
  if (right.k === 'none' && !defined(1)) return left
  if (left.k === 'value' && right.k === 'value' && close(left.v, right.v)) return { k: 'value', v: (left.v + right.v) / 2 }
  if (left.k === 'infinity' && right.k === 'infinity' && left.sign === right.sign) return left
  return { k: 'none', left, right }
}

/** Cohen, Rodriguez Villegas, Zagier: la somma di Σ (−1)^k b_k, con b_k > 0 (i primi `n` termini bastano). */
function alternating(b: number[]): number {
  const n = b.length
  let d = (3 + Math.sqrt(8)) ** n
  d = (d + 1 / d) / 2
  let p = -1
  let c = -d
  let s = 0
  for (let k = 0; k < n; k++) {
    c = p - c
    s += c * b[k]
    p = ((k + n) * (k - n) * p) / ((k + 0.5) * (k + 1))
  }
  return s / d
}

/** La derivata k-esima (fino alla quinta) con le differenze finite, per la coda di Eulero–Maclaurin. */
function derivatives(f: (x: number) => number, x: number, h: number): number[] {
  const at = (j: number) => f(x + j * h)
  const v = [-3, -2, -1, 0, 1, 2, 3].map(at)
  const d1 = (v[2] * -8 + v[1] + v[4] * 8 - v[5]) / (12 * h)
  const d3 = (-v[1] + 2 * v[2] - 2 * v[4] + v[5]) / (2 * h ** 3)
  const d5 = (-v[0] + 4 * v[1] - 5 * v[2] + 5 * v[4] - 4 * v[5] + v[6]) / (2 * h ** 5)
  return [d1, d3, d5]
}

/** \sum_{n = start}^{\infty} a_n: la somma, l'infinito o «non converge». */
export function seriesSum(term: (n: number) => number, start: number): LimitValue {
  if (!Number.isFinite(start)) return { k: 'none' }
  const a = (n: number) => term(start + n)
  // I termini devono andare a zero (e i segni dicono come sommarli).
  const head: number[] = []
  for (let k = 0; k < 64; k++) head.push(a(k))
  if (!head.every(Number.isFinite)) return { k: 'none' }
  const far = [1e3, 1e4, 1e5].map((k) => a(k))
  const big = Math.max(1e-300, ...head.slice(0, 8).map(Math.abs))
  const tail = head.slice(32)
  const signs = tail.map(Math.sign)
  const alternatingSigns = signs.every((s, i) => i === 0 || s === -signs[i - 1]) && signs.every((s) => s !== 0)
  if (far.some((t) => Number.isFinite(t) && Math.abs(t) > 1e-3 * big) || !far.some(Number.isFinite)) {
    // I termini non vanno a zero: con un segno solo all'infinito, se no non converge.
    const sign = Math.sign(far.find(Number.isFinite) ?? tail[tail.length - 1])
    if (!alternatingSigns && sign && far.every((t) => !Number.isFinite(t) || Math.sign(t) === sign)) return { k: 'infinity', sign: sign > 0 ? 1 : -1 }
    return { k: 'none' }
  }
  if (alternatingSigns) {
    // I primi termini come sono, poi i segni alterni accelerati.
    const skip = 32
    const prefix = head.slice(0, skip).reduce((s, t) => s + t, 0)
    const b: number[] = []
    for (let k = 0; k < 40; k++) b.push(Math.abs(a(skip + k)))
    if (!spend(80)) return { k: 'none' }
    return { k: 'value', v: prefix + Math.sign(a(skip)) * alternating(b) }
  }
  // Termini che si accorciano in fretta (1/2^n, 1/n!): si sommano finché contano.
  const ratio = Math.abs(head[63] / head[62])
  if (ratio < 0.95 || head[63] === 0) {
    let sum = 0
    for (let k = 0; k < 20000; k++) {
      const t = a(k)
      if (!Number.isFinite(t)) return { k: 'none' }
      sum += t
      if (k > 64 && Math.abs(t) <= 1e-18 * Math.max(1e-300, Math.abs(sum))) break
      if (k % 256 === 0 && !spend(256)) return { k: 'none' }
    }
    return { k: 'value', v: sum }
  }
  // Con un segno solo: i primi N termini e la coda con Eulero–Maclaurin, ∫ + f(N)/2 − f'(N)/12 + …
  const N = 40
  const f = (x: number) => term(start + x)
  let sum = 0
  for (let k = 0; k < N; k++) sum += a(k)
  const fN = f(N)
  const [d1, d3, d5] = derivatives(f, N, 0.25)
  const integral = integrate(f, N, Infinity, 1e-12)
  if (!Number.isFinite(integral) || Math.abs(integral) > 1e15) {
    // La coda non è finita (1/n): la serie va all'infinito con il segno dei termini.
    return { k: 'infinity', sign: fN >= 0 ? 1 : -1 }
  }
  if (![fN, d1, d3, d5].every(Number.isFinite)) return { k: 'none' }
  return { k: 'value', v: sum + integral + fN / 2 - d1 / 12 + d3 / 720 - d5 / 30240 }
}

/**
 * Un numero come costante nota, se lo è: una frazione, una radice (√2/2), un multiplo di π, di π², di
 * e o di ln 2 (le irrazionali con «≈» e le cifre). Null se no.
 */
export function recognize(x: number, options: FormatOptions): FormattedResult | null {
  if (!Number.isFinite(x)) return null
  const fraction = nearFraction(x, 1000)
  if (fraction) return { tex: fracTex(fraction.p, fraction.q), text: fracText(fraction.p, fraction.q) }
  const digits = formatNumber(x, { ...options, decimal: true, digits: 9 })
  if (!digits) return null
  const approx = (tex: string, text: string): FormattedResult => ({ tex: `${tex} \\approx ${digits.tex}`, text: `${text} ≈ ${digits.text}` })
  const root = surd(Math.abs(x))
  if (root && !/^\d+$/.test(root.text)) return approx(`${x < 0 ? '-' : ''}${root.tex}`, `${x < 0 ? '−' : ''}${root.text}`)
  const constants: [number, string, string][] = [
    [Math.PI, '\\pi', 'π'],
    [Math.PI ** 2, '\\pi^{2}', 'π²'],
    [Math.E, 'e', 'e'],
    [Math.LN2, '\\ln 2', 'ln 2'],
  ]
  for (const [c, tex, text] of constants) {
    const f = nearFraction(x / c, 24)
    if (f) return approx(fracTex(f.p, f.q, tex), fracText(f.p, f.q, text))
  }
  return null
}

/** Un cammino verso il punto: la curva (per dirla) e i punti al variare di t → 0. */
export interface LimitPath {
  /** Lungo la retta y = x, la parabola y = x², l'asse x… come formula (con le variabili). */
  label: { tex: string; text: string }
  value: LimitValue
}

export interface SeveralLimit {
  value: LimitValue
  /** Se non esiste: due cammini con valori diversi (o uno dove non esiste). */
  paths: LimitPath[]
}

const same = (a: LimitValue, b: LimitValue) =>
  (a.k === 'value' && b.k === 'value' && close(a.v, b.v)) || (a.k === 'infinity' && b.k === 'infinity' && a.sign === b.sign)

/**
 * Il limite di f in più variabili per (x, y) → (a, b): prima lungo le rette e le parabole per il punto
 * (se due cammini danno valori diversi il limite non esiste, e si dice quali), poi tutto attorno al
 * punto (in coordinate polari: f si avvicina al valore uniformemente?). `labels` scrive i cammini.
 */
export function severalLimit(
  f: (p: number[]) => number,
  point: number[],
  labels: (shift: number[], power: number[]) => { tex: string; text: string },
): SeveralLimit | null {
  const n = point.length
  if (n < 2 || n > 3 || !point.every(Number.isFinite)) return null
  // Le direzioni: gli assi, le bisettrici e qualche altra retta; poi le parabole (y = x², x = y²).
  const dirs: { v: number[]; power: number[] }[] = []
  const lines = n === 2 ? [[1, 0], [0, 1], [1, 1], [1, -1], [1, 2], [2, 1], [1, -3]] : [[1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0], [1, 0, 1], [0, 1, 1], [1, 1, 1], [1, -2, 1]]
  for (const v of lines) dirs.push({ v, power: v.map(() => 1) })
  const curves = n === 2 ? [[1, 1, 1, 2], [1, -1, 1, 2], [1, 1, 2, 1], [1, 1, 1, 3]] : [[1, 1, 1, 1, 2, 2], [1, 1, 1, 2, 1, 2]]
  for (const c of curves) dirs.push({ v: c.slice(0, n), power: c.slice(n) })
  const paths: LimitPath[] = []
  for (const d of dirs) {
    const along = (t: number) => f(point.map((a, i) => a + d.v[i] * Math.sign(t) ** d.power[i] * Math.abs(t) ** d.power[i]))
    const value = limit(along, 0, 0)
    paths.push({ label: labels(d.v, d.power), value })
    if (value.k === 'none') return { value: { k: 'none' }, paths: [paths[paths.length - 1]] }
    const other = paths.find((p) => !same(p.value, value))
    if (other) return { value: { k: 'none' }, paths: [other, paths[paths.length - 1]] }
  }
  const L = paths[0].value
  if (L.k === 'none') return null
  // Tutto attorno al punto: lo scarto più grande da L su una circonferenza (una sfera) sempre più piccola.
  const worst = (r: number): number => {
    let most = 0
    const steps = n === 2 ? 720 : 60
    for (let i = 0; i < steps; i++) {
      const theta = (2 * Math.PI * (i + 0.5)) / steps
      const around = n === 2 ? [[Math.cos(theta), Math.sin(theta)]] : Array.from({ length: 30 }, (_, j) => {
        const phi = (Math.PI * (j + 0.5)) / 30
        return [Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), Math.cos(phi)]
      })
      for (const u of around) {
        const v = f(point.map((a, k) => a + r * u[k]))
        if (Number.isNaN(v)) continue
        if (L.k === 'infinity') most = Math.max(most, Number.isFinite(v) ? 1 / Math.max(L.sign * v, 1e-300) : 0)
        else most = Math.max(most, Math.abs(v - L.v))
      }
    }
    return most
  }
  const radii = [1e-2, 1e-3, 1e-4, 1e-5]
  const gaps = radii.map(worst)
  const scale = L.k === 'value' ? Math.max(1, Math.abs(L.v)) : 1
  // Si avvicina: lo scarto va a zero (scende di almeno dieci volte, ed è piccolo).
  if (gaps[3] < 1e-3 * scale && gaps[3] <= gaps[0] / 10 + 1e-12) return { value: L, paths: [] }
  if (gaps[3] < 1e-9 * scale) return { value: L, paths: [] }
  // Resta lontano: il limite non esiste (dipende da come ci si avvicina).
  if (gaps[3] > 1e-2 * scale && gaps[3] >= gaps[2] * 0.5) return { value: { k: 'none' }, paths: [] }
  return null
}
