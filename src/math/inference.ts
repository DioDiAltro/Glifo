/**
 * La statistica inferenziale: gli intervalli di confidenza (della media con σ nota o no, di una
 * proporzione, della varianza) e i test d'ipotesi (z e t sulla media, sulla proporzione, χ² sulla varianza,
 * il confronto di due medie con Welch, il χ² di adattamento e di indipendenza), con il p-value, la regione di
 * rifiuto e la decisione. I dati possono essere un vettore della nota (x = (…)) o le statistiche scritte
 * (\bar{x} = 12, s = 2, n = 25); l'ipotesi alternativa si scrive come una relazione (\mu > 10).
 */
import { makeDistribution, type Distribution } from './distributions'
import { MathError } from './evaluate'
import type { FormattedResult } from './format'
import type { MathNode } from './parse'
import { normalQuantile } from './special'

export interface InferenceContext {
  number(node: MathNode): number
  /** Un vettore di dati (x = (…) nella nota, o scritto); null se non lo è. */
  data(node: MathNode): number[] | null
  /** Una matrice (una tabella di contingenza); null se non lo è. */
  matrix(node: MathNode): number[][] | null
}

type Op = '>' | '<' | '!='

/** Quello che dicono gli argomenti: i campioni, le statistiche scritte, il livello, l'ipotesi. */
interface Given {
  samples: number[][]
  mean?: number
  sd?: number
  sigma?: number
  n?: number
  phat?: number
  s2?: number
  level?: number
  hypothesis?: { param: 'mu' | 'p' | 'var' | 'diff'; op: Op; value: number }
}

const nameOf = (n: MathNode): string | null => (n.k === 'name' ? n.name : null)
const squared = (n: MathNode): string | null => (n.k === 'bin' && n.op === '^' && n.b.k === 'num' && n.b.v === 2 ? nameOf(n.a) : null)

function opOf(op: string): Op | '=' | null {
  if (op === '>' || op === '>=') return '>'
  if (op === '<' || op === '<=') return '<'
  if (op === '!=') return '!='
  if (op === '=') return '='
  return null
}

function given(args: MathNode[], ctx: InferenceContext): Given {
  const g: Given = { samples: [] }
  for (const a of args) {
    if (a.k === 'rel' && a.items.length === 2 && a.ops.length === 1) {
      const [l, r] = a.items
      const op = opOf(a.ops[0])
      const name = nameOf(l)
      const sq = squared(l)
      if (!op) throw new MathError('Qui va = , >, < o \\ne')
      // Due medie: \mu_1 > \mu_2.
      if (name && /^μ_?1$/.test(name) && nameOf(r) && /^μ_?2$/.test(nameOf(r)!)) {
        g.hypothesis = { param: 'diff', op: op === '=' ? '!=' : op, value: 0 }
        continue
      }
      const value = ctx.number(r)
      if (op === '=') {
        if (name === 'x̄' || name === 'm') g.mean = value
        else if (name === 's') g.sd = value
        else if (sq === 's' || sq === 'S') g.s2 = value
        else if (name === 'σ') g.sigma = value
        else if (sq === 'σ') g.sigma = Math.sqrt(value)
        else if (name === 'n') g.n = value
        else if (name === 'p̂') g.phat = value
        else if (name === 'μ' || name === 'μ_0') g.hypothesis = { param: 'mu', op: '!=', value }
        else if (name === 'p' || name === 'p_0') g.hypothesis = { param: 'p', op: '!=', value }
        else if (sq === 'σ_0') g.hypothesis = { param: 'var', op: '!=', value }
        else throw new MathError(`Non so che cosa sia ${name ?? 'questo'}: si scrive \\bar{x} = …, s = …, \\sigma = …, n = …, \\hat{p} = …`)
        continue
      }
      // L'ipotesi alternativa: \mu > 10, p < 0{,}5, \sigma^2 \ne 4.
      if (name === 'μ' || name === 'μ_0') g.hypothesis = { param: 'mu', op, value }
      else if (name === 'p' || name === 'p_0') g.hypothesis = { param: 'p', op, value }
      else if (sq === 'σ' || sq === 'σ_0') g.hypothesis = { param: 'var', op, value }
      else if (name === 'σ' || name === 'σ_0') g.hypothesis = { param: 'var', op, value: value * value }
      else throw new MathError("L'ipotesi si scrive come \\mu > 10, p < 0{,}5 o \\sigma^2 \\ne 4")
      continue
    }
    const data = a.k === 'num' || a.k === 'post' ? null : ctx.data(a)
    if (data) {
      g.samples.push(data)
      continue
    }
    const v = ctx.number(a)
    if (!(v > 0 && v < 1)) throw new MathError('Il livello si scrive come 0{,}95 (o 95\\%), α come 0{,}05')
    g.level = v
  }
  return g
}

const SUPER: Record<string, string> = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }

/** Un numero con `sig` cifre significative, con la virgola; i piccolissimi con la potenza di 10. */
function num(v: number, sig = 6): { tex: string; text: string } {
  if (!Number.isFinite(v)) return { tex: v > 0 ? '+\\infty' : '-\\infty', text: v > 0 ? '+∞' : '−∞' }
  if (v === 0) return { tex: '0', text: '0' }
  if (Math.abs(v) < 1e-4) {
    const [m, e] = v.toExponential(2).split('e')
    const mant = m.replace(/0+$/, '').replace(/\.$/, '')
    const exp = String(Number(e))
    return { tex: `${mant.replace('.', '{,}')} \\cdot 10^{${exp}}`, text: `${mant.replace('.', ',').replace('-', '−')}·10${[...exp].map((c) => SUPER[c]).join('')}` }
  }
  let s = v.toPrecision(sig)
  if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '')
  return { tex: s.replace('.', '{,}'), text: s.replace('.', ',').replace('-', '−') }
}

function meanOf(x: number[]): number {
  return x.reduce((s, v) => s + v, 0) / x.length
}

function sampleVariance(x: number[]): number {
  const m = meanOf(x)
  return x.reduce((s, v) => s + (v - m) ** 2, 0) / (x.length - 1)
}

/** Le statistiche di un campione: dai dati o scritte. */
function summary(g: Given): { n: number; mean: number; s2: number | null } {
  const x = g.samples[0]
  if (x) {
    if (x.length < 2) throw new MathError('Servono almeno due dati')
    return { n: x.length, mean: meanOf(x), s2: sampleVariance(x) }
  }
  if (g.n === undefined || !(g.n >= 2)) throw new MathError('Manca n, il numero dei dati (n = 25)')
  const s2 = g.s2 ?? (g.sd !== undefined ? g.sd ** 2 : null)
  if (g.mean === undefined) return { n: g.n, mean: NaN, s2 }
  return { n: g.n, mean: g.mean, s2 }
}

/** Il livello di confidenza: 0,95 (scritto come 0,95 o come α = 0,05). */
const confidence = (g: Given) => {
  const l = g.level ?? 0.95
  return l < 0.5 ? 1 - l : l
}
/** Il livello di significatività: 0,05 (scritto come 0,05 o come la confidenza 0,95). */
const significance = (g: Given) => {
  const a = g.level ?? 0.05
  return a > 0.5 ? 1 - a : a
}

const percent = (p: number) => `${num(p * 100, 4).text}%`
const percentTex = (p: number) => `${num(p * 100, 4).tex}\\%`

// ——— Gli intervalli di confidenza ———

export function confidenceShown(args: MathNode[], ctx: InferenceContext): FormattedResult {
  const g = given(args, ctx)
  const level = confidence(g)
  const alpha = 1 - level
  // Una proporzione: \hat{p} ± z √(\hat{p}(1 − \hat{p})/n).
  if (g.phat !== undefined) {
    if (!(g.n && g.n > 0)) throw new MathError('Manca n, il numero delle prove (n = 100)')
    const z = normalQuantile(1 - alpha / 2)
    const E = z * Math.sqrt((g.phat * (1 - g.phat)) / g.n)
    return interval('\\hat{p}', g.phat, E, level, { tex: `z_{${num(1 - alpha / 2, 4).tex}} = ${num(z, 5).tex}`, text: `z = ${num(z, 5).text}` })
  }
  const s = summary(g)
  if (!Number.isFinite(s.mean)) throw new MathError('Manca la media: i dati, o \\bar{x} = …')
  // σ nota: z; se no t con n − 1 gradi di libertà.
  if (g.sigma !== undefined) {
    const z = normalQuantile(1 - alpha / 2)
    return interval('\\bar{x}', s.mean, (z * g.sigma) / Math.sqrt(s.n), level, { tex: `z_{${num(1 - alpha / 2, 4).tex}} = ${num(z, 5).tex}`, text: `z = ${num(z, 5).text}` })
  }
  if (s.s2 === null) throw new MathError('Manca la deviazione standard: s = … (o \\sigma = … se è nota)')
  const t = makeDistribution('student', [s.n - 1]).quantile(1 - alpha / 2)
  return interval('\\bar{x}', s.mean, (t * Math.sqrt(s.s2)) / Math.sqrt(s.n), level, { tex: `t_{${num(1 - alpha / 2, 4).tex}}(${s.n - 1}) = ${num(t, 5).tex}`, text: `t(${s.n - 1}) = ${num(t, 5).text}` })
}

function interval(center: string, c: number, E: number, level: number, q: { tex: string; text: string }): FormattedResult {
  const [lo, hi] = [num(c - E), num(c + E)]
  const [m, e] = [num(c), num(E, 4)]
  return {
    tex: `\\left[${lo.tex};\\ ${hi.tex}\\right]\\quad (${percentTex(level)}:\\ ${center} = ${m.tex},\\ E = ${e.tex},\\ ${q.tex})`,
    text: `[${lo.text}; ${hi.text}] (${percent(level)}: ${m.text} ± ${e.text}, ${q.text})`,
  }
}

/** L'intervallo di confidenza della varianza: [(n − 1)s²/χ²_{1−α/2}, (n − 1)s²/χ²_{α/2}]. */
export function varianceConfidenceShown(args: MathNode[], ctx: InferenceContext): FormattedResult {
  const g = given(args, ctx)
  const s = summary(g)
  if (s.s2 === null) throw new MathError('Manca la varianza campionaria: i dati, o s^2 = …')
  const level = confidence(g)
  const alpha = 1 - level
  const chi = makeDistribution('chi2', [s.n - 1])
  const [a, b] = [chi.quantile(1 - alpha / 2), chi.quantile(alpha / 2)]
  const [lo, hi] = [num(((s.n - 1) * s.s2) / a), num(((s.n - 1) * s.s2) / b)]
  const s2 = num(s.s2)
  return {
    tex: `\\sigma^2 \\in \\left[${lo.tex};\\ ${hi.tex}\\right]\\quad (${percentTex(level)}:\\ s^2 = ${s2.tex},\\ \\chi^2(${s.n - 1}))`,
    text: `σ² ∈ [${lo.text}; ${hi.text}] (${percent(level)}: s² = ${s2.text}, χ²(${s.n - 1}))`,
  }
}

// ——— I test d'ipotesi ———

/** Un test fatto: la statistica, la sua distribuzione sotto H₀, le ipotesi, il p-value, la regione di rifiuto. */
export interface TestResult {
  statistic: number
  symbol: string
  symbolText: string
  dist: Distribution
  distTex: string
  distText: string
  op: Op
  alpha: number
  p: number
  /** La regione di rifiuto: dove la statistica fa rifiutare H₀. */
  reject: [number, number][]
  h0: { tex: string; text: string }
  h1: { tex: string; text: string }
  /** Due code, ma non simmetriche (χ²). */
  twoTails?: [number, number]
}

const OP_TEX: Record<Op, string> = { '>': '>', '<': '<', '!=': '\\ne' }
const OP_TEXT: Record<Op, string> = { '>': '>', '<': '<', '!=': '≠' }

function pValue(d: Distribution, T: number, op: Op, symmetric: boolean): number {
  if (op === '>') return d.sf(T)
  if (op === '<') return d.cdf(T)
  if (symmetric) return Math.min(1, 2 * d.sf(Math.abs(T)))
  return Math.min(1, 2 * Math.min(d.cdf(T), d.sf(T)))
}

function rejection(d: Distribution, op: Op, alpha: number, symmetric: boolean): [number, number][] {
  if (op === '>') return [[d.quantile(1 - alpha), Infinity]]
  if (op === '<') return [[-Infinity, d.quantile(alpha)]]
  if (symmetric) {
    const q = d.quantile(1 - alpha / 2)
    return [
      [-Infinity, -q],
      [q, Infinity],
    ]
  }
  return [
    [d.lo, d.quantile(alpha / 2)],
    [d.quantile(1 - alpha / 2), Infinity],
  ]
}

const paramTex: Record<'mu' | 'p' | 'var' | 'diff', [string, string]> = { mu: ['\\mu', 'μ'], p: ['p', 'p'], var: ['\\sigma^2', 'σ²'], diff: ['\\mu_1', 'μ₁'] }

export function hypothesisTest(args: MathNode[], ctx: InferenceContext): TestResult {
  const g = given(args, ctx)
  const alpha = significance(g)
  const h = g.hypothesis
  // Due campioni: le medie con Welch.
  if (g.samples.length === 2 || h?.param === 'diff') {
    const [x, y] = g.samples
    if (!x || !y) throw new MathError('Per confrontare due medie servono due vettori di dati')
    const op = h?.op ?? '!='
    const [n1, n2] = [x.length, y.length]
    const [v1, v2] = [sampleVariance(x) / n1, sampleVariance(y) / n2]
    const T = (meanOf(x) - meanOf(y)) / Math.sqrt(v1 + v2)
    const df = (v1 + v2) ** 2 / (v1 ** 2 / (n1 - 1) + v2 ** 2 / (n2 - 1))
    const dist = makeDistribution('student', [df])
    return {
      statistic: T, symbol: 't', symbolText: 't', dist, distTex: `t(${num(df, 4).tex})`, distText: `t(${num(df, 4).text}), Welch`, op, alpha,
      p: pValue(dist, T, op, true), reject: rejection(dist, op, alpha, true),
      h0: { tex: '\\mu_1 = \\mu_2', text: 'μ₁ = μ₂' }, h1: { tex: `\\mu_1 ${OP_TEX[op]} \\mu_2`, text: `μ₁ ${OP_TEXT[op]} μ₂` },
    }
  }
  if (!h) throw new MathError("Manca l'ipotesi: \\mu = 10 (o \\mu > 10), p = 0{,}5, \\sigma^2 = 4")
  const [pt, px] = paramTex[h.param]
  const hyp = { h0: { tex: `${pt} = ${num(h.value).tex}`, text: `${px} = ${num(h.value).text}` }, h1: { tex: `${pt} ${OP_TEX[h.op]} ${num(h.value).tex}`, text: `${px} ${OP_TEXT[h.op]} ${num(h.value).text}` } }
  if (h.param === 'p') {
    if (g.phat === undefined || !g.n) throw new MathError('Per una proporzione servono \\hat{p} = … e n = …')
    const T = (g.phat - h.value) / Math.sqrt((h.value * (1 - h.value)) / g.n)
    const dist = makeDistribution('normal', [0, 1])
    return { statistic: T, symbol: 'z', symbolText: 'z', dist, distTex: 'N(0, 1)', distText: 'N(0, 1)', op: h.op, alpha, p: pValue(dist, T, h.op, true), reject: rejection(dist, h.op, alpha, true), ...hyp }
  }
  const s = summary(g)
  if (h.param === 'var') {
    if (s.s2 === null) throw new MathError('Per la varianza servono i dati, o s^2 = … e n = …')
    const T = ((s.n - 1) * s.s2) / h.value
    const dist = makeDistribution('chi2', [s.n - 1])
    return {
      statistic: T, symbol: '\\chi^2', symbolText: 'χ²', dist, distTex: `\\chi^2(${s.n - 1})`, distText: `χ²(${s.n - 1})`, op: h.op, alpha,
      p: pValue(dist, T, h.op, false), reject: rejection(dist, h.op, alpha, false), ...hyp,
    }
  }
  if (!Number.isFinite(s.mean)) throw new MathError('Manca la media: i dati, o \\bar{x} = …')
  if (g.sigma !== undefined) {
    const T = (s.mean - h.value) / (g.sigma / Math.sqrt(s.n))
    const dist = makeDistribution('normal', [0, 1])
    return { statistic: T, symbol: 'z', symbolText: 'z', dist, distTex: 'N(0, 1)', distText: 'N(0, 1)', op: h.op, alpha, p: pValue(dist, T, h.op, true), reject: rejection(dist, h.op, alpha, true), ...hyp }
  }
  if (s.s2 === null) throw new MathError('Manca la deviazione standard: s = … (o \\sigma = … se è nota)')
  const T = (s.mean - h.value) / Math.sqrt(s.s2 / s.n)
  const dist = makeDistribution('student', [s.n - 1])
  return {
    statistic: T, symbol: 't', symbolText: 't', dist, distTex: `t(${s.n - 1})`, distText: `t(${s.n - 1})`, op: h.op, alpha,
    p: pValue(dist, T, h.op, true), reject: rejection(dist, h.op, alpha, true), ...hyp,
  }
}

/** Il χ² di adattamento (osservate e attese, o le probabilità) o di indipendenza (una tabella). */
export function chiSquareTest(args: MathNode[], ctx: InferenceContext): TestResult {
  const levelArg = args.find((a) => a.k === 'num' || a.k === 'post')
  const alpha = levelArg ? significance({ samples: [], level: ctx.number(levelArg) }) : 0.05
  const rest = args.filter((a) => a !== levelArg)
  let T = 0
  let df: number
  let h0: { tex: string; text: string }
  const table = rest.length === 1 ? ctx.matrix(rest[0]) : null
  if (table && table.length > 1 && table[0].length > 1) {
    const rows = table.map((r) => r.reduce((s, v) => s + v, 0))
    const cols = table[0].map((_, j) => table.reduce((s, r) => s + r[j], 0))
    const total = rows.reduce((s, v) => s + v, 0)
    table.forEach((r, i) =>
      r.forEach((o, j) => {
        const e = (rows[i] * cols[j]) / total
        T += (o - e) ** 2 / e
      }),
    )
    df = (table.length - 1) * (table[0].length - 1)
    h0 = { tex: '\\text{le due variabili sono indipendenti}', text: 'le due variabili sono indipendenti' }
  } else {
    const [o, e0] = rest.map((a) => ctx.data(a))
    if (!o || !e0 || o.length !== e0.length || o.length < 2) throw new MathError('Servono le frequenze osservate e quelle attese (o le probabilità), della stessa lunghezza')
    const n = o.reduce((s, v) => s + v, 0)
    const sum = e0.reduce((s, v) => s + v, 0)
    // Le probabilità (che sommano a 1) diventano le frequenze attese.
    const e = Math.abs(sum - 1) < 1e-9 ? e0.map((p) => p * n) : e0
    o.forEach((v, i) => (T += (v - e[i]) ** 2 / e[i]))
    df = o.length - 1
    h0 = { tex: '\\text{i dati seguono le frequenze attese}', text: 'i dati seguono le frequenze attese' }
  }
  const dist = makeDistribution('chi2', [df])
  return {
    statistic: T, symbol: '\\chi^2', symbolText: 'χ²', dist, distTex: `\\chi^2(${df})`, distText: `χ²(${df})`, op: '>', alpha,
    p: dist.sf(T), reject: [[dist.quantile(1 - alpha), Infinity]], h0, h1: { tex: '\\text{no}', text: 'no' },
  }
}

/** Il risultato di un test: le ipotesi, la statistica, il p-value e la decisione. */
export function testShown(t: TestResult): FormattedResult {
  const T = num(t.statistic, 5)
  const p = num(t.p, 4)
  const a = num(t.alpha, 3)
  const rejected = t.p < t.alpha
  const decision = rejected ? { tex: '\\text{si rifiuta } H_0', text: 'si rifiuta H₀' } : { tex: '\\text{non si rifiuta } H_0', text: 'non si rifiuta H₀' }
  const region = t.reject
    .map(([lo, hi]) => (lo === -Infinity ? { tex: `${t.symbol} < ${num(hi, 5).tex}`, text: `${t.symbolText} < ${num(hi, 5).text}` } : { tex: `${t.symbol} > ${num(lo, 5).tex}`, text: `${t.symbolText} > ${num(lo, 5).text}` }))
  const hypothesisTex = t.h1.text === 'no' ? `H_0:\\ ${t.h0.tex}` : `H_0:\\ ${t.h0.tex},\\quad H_1:\\ ${t.h1.tex}`
  const hypothesisText = t.h1.text === 'no' ? `H₀: ${t.h0.text}` : `H₀: ${t.h0.text}, H₁: ${t.h1.text}`
  return {
    tex: `\\begin{array}{l} ${hypothesisTex} \\\\ ${t.symbol} = ${T.tex}\\ \\ (${t.distTex}),\\quad \\text{rifiuto per } ${region.map((r) => r.tex).join(' \\text{ o } ')} \\\\ p = ${p.tex} ${rejected ? '<' : '\\ge'} \\alpha = ${a.tex}:\\ ${decision.tex} \\end{array}`,
    text: `${t.symbolText} = ${T.text} (${t.distText}); p = ${p.text} ${rejected ? '<' : '≥'} α = ${a.text}: ${decision.text} (${hypothesisText}; rifiuto per ${region.map((r) => r.text).join(' o ')})`,
    rich: true,
  }
}
