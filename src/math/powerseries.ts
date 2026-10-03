/**
 * Le serie di potenze: \sum_{n=0}^{\infty} c_n (x − x_0)^{kn + j}, con una lettera che la nota non definisce.
 * Il raggio di convergenza con il criterio del rapporto (o della radice), sui logaritmi dei coefficienti
 * (così anche n! e n^n non escono dai numeri), e negli estremi la serie numerica che viene, provata con le
 * somme di limits.ts: l'insieme di convergenza, come [−1, 1).
 */
import { compile, EMPTY_SCOPE, scopeWith } from './evaluate'
import { Rational } from './exact'
import { formatNumber, type FormatOptions, type FormattedResult } from './format'
import { toLatex } from './latex'
import { limit, recognize, seriesSum } from './limits'
import type { MathNode } from './parse'
import { asFraction } from './primitive'
import { exactNear } from './several'
import { logGamma } from './special'
import { add, dependsOn, exOf, mul, neg, num, plainText, symbols, tidy, toNode, type Ex, type SymbolScope } from './symbolic'

export interface PowerSeries {
  /** La variabile (x) e quella della somma (n). */
  x: string
  n: string
  /** Il centro x₀, esatto. */
  center: Rational
  /** L'esponente di (x − x₀): k n + j. */
  k: number
  j: number
  /** log |c_n| e il segno di c_n. */
  logC: (n: number) => number
  signC: (n: number) => number
  start: number
}

/** Il valore di un pezzo del termine che non dipende da x, come funzione di n. */
function valueOf(e: Ex, n: string): (v: number) => number {
  const f = compile(toNode(e), scopeWith(EMPTY_SCOPE, [n]))
  const vars: Record<string, number> = {}
  return (v) => ((vars[n] = v), f(vars))
}

/** log |e| e il segno, pezzo per pezzo: i prodotti e le potenze con i logaritmi, i fattoriali con log Γ. */
function logParts(e: Ex, n: string): { log: (v: number) => number; sign: (v: number) => number } {
  switch (e.t) {
    case 'num': {
      const l = Math.log(Math.abs(e.v.toNumber()))
      const s = e.v.sign
      return { log: () => l, sign: () => s }
    }
    case 'mul': {
      const parts = [logParts(num(e.c), n), ...e.factors.map((f) => logParts(f, n))]
      return { log: (v) => parts.reduce((s, p) => s + p.log(v), 0), sign: (v) => parts.reduce((s, p) => s * p.sign(v), 1) }
    }
    case 'pow': {
      const exp = valueOf(e.exp, n)
      const base = logParts(e.base, n)
      return {
        log: (v) => exp(v) * base.log(v),
        sign: (v) => {
          const s = base.sign(v)
          if (s >= 0) return s
          const p = exp(v)
          return Number.isInteger(p) ? (Math.abs(p) % 2 === 1 ? -1 : 1) : NaN
        },
      }
    }
    case 'node':
      // n!, (2n)!: con log Γ, senza calcolarli.
      if (e.node.k === 'post' && e.node.op === '!') {
        const arg = valueOf(exOf(e.node.a, { consts: new Map(), fns: new Map() }, [n]), n)
        return { log: (v) => logGamma(arg(v) + 1), sign: () => 1 }
      }
      break
  }
  const f = valueOf(e, n)
  return { log: (v) => Math.log(Math.abs(f(v))), sign: (v) => Math.sign(f(v)) }
}

/**
 * La serie come serie di potenze: il termine è c_n (a x + b)^{kn + j} con c_n senza x; null se non lo è
 * (x dentro un seno, x^{n²}, più termini con x…).
 */
export function powerSeriesOf(big: Extract<MathNode, { k: 'big' }>, start: number, scope: SymbolScope, isDefined: (name: string) => boolean): PowerSeries | null {
  if (big.op !== 'sum') return null
  const n = big.v
  let body: Ex
  try {
    body = exOf(big.body, scope, [n])
  } catch {
    return null
  }
  const free = symbols(body).filter((s) => s !== n && s !== 'π' && s !== 'e' && !isDefined(s))
  if (free.length !== 1) return null
  const x = free[0]
  const factors = body.t === 'mul' ? body.factors : [body]
  const c = body.t === 'mul' ? body.c : Rational.int(1)
  const withX = factors.filter((f) => dependsOn(f, x))
  if (withX.length !== 1) return null
  const xf = withX[0]
  const base = xf.t === 'pow' ? xf.base : xf
  const exp = xf.t === 'pow' ? xf.exp : num(1)
  if (dependsOn(base, n) || dependsOn(exp, x)) return null
  // L'esponente k n + j, con k intero positivo.
  const e = asFraction(exp, n)
  if (!e || e.D.length !== 1 || e.N.length !== 2) return null
  const [jr, kr] = e.N.map((q) => q.div(e.D[0]))
  if (!kr.isInteger || kr.sign <= 0 || !jr.isInteger) return null
  // La base a x + b: il centro −b/a, e a^{kn + j} va nei coefficienti.
  const lin = asFraction(base, x)
  if (!lin || lin.D.length !== 1 || lin.N.length !== 2) return null
  const [b, a] = lin.N.map((q) => q.div(lin.D[0]))
  if (a.sign === 0) return null
  const rest = mul(num(c), ...factors.filter((f) => f !== xf), { t: 'pow', base: num(a), exp })
  let parts: ReturnType<typeof logParts>
  try {
    parts = logParts(rest, n)
  } catch {
    return null
  }
  if (!Number.isFinite(start)) return null
  return { x, n, center: b.neg().div(a), k: Number(kr.n), j: Number(jr.n), logC: parts.log, signC: parts.sign, start }
}

/** Il raggio di convergenza: con il rapporto |c_{n+1}/c_n| (o la radice |c_n|^{1/n}) all'infinito. */
export function radius(s: PowerSeries): number | null {
  const ratio = (v: number) => Math.exp(s.logC(v + 1) - s.logC(v))
  let L = limit(ratio, Infinity, 0, true)
  if (L.k === 'none') L = limit((v) => Math.exp(s.logC(v) / v), Infinity, 0, true)
  if (L.k === 'infinity') return 0
  if (L.k !== 'value' || !Number.isFinite(L.v)) return null
  if (Math.abs(L.v) < 1e-9) return Infinity
  if (L.v < 0) return null
  return L.v ** (-1 / s.k)
}

/** Se la serie converge in x = x₀ + d (d = ±R): la serie dei numeri c_n d^{kn + j}. */
function convergesAt(s: PowerSeries, d: number): boolean | null {
  const log = Math.log(Math.abs(d))
  const term = (v: number) => {
    const p = s.k * v + s.j
    const sign = s.signC(v) * (d < 0 && Math.abs(p) % 2 === 1 ? -1 : 1)
    return sign * Math.exp(s.logC(v) + p * log)
  }
  const sum = seriesSum(term, s.start)
  if (sum.k === 'value') return true
  return false
}

function shownOf(e: Ex, style: FormatOptions): { tex: string; text: string } {
  const n = toNode(tidy(e), style.decimal)
  return { tex: toLatex(n), text: plainText(n) }
}

/** Un multiplo semplice di e o di π (2e, π/2), con la tolleranza dei limiti fatti con i numeri. */
function nearConstant(v: number): { tex: string; text: string } | null {
  for (const [c, tex, text] of [[Math.E, 'e', 'e'], [Math.PI, '\\pi', 'π']] as const) {
    for (let q = 1; q <= 12; q++) {
      const p = Math.round((v / c) * q)
      if (p < 1 || p > 60 || Math.abs((p / q) * c - v) > 1e-8 * v) continue
      const g = gcdInt(p, q)
      const [a, b] = [p / g, q / g]
      const top = a === 1 ? tex : `${a}${tex}`
      const topText = a === 1 ? text : `${a}${text}`
      return b === 1 ? { tex: top, text: topText } : { tex: `\\frac{${top}}{${b}}`, text: `${topText}/${b}` }
    }
  }
  return null
}

const gcdInt = (a: number, b: number): number => (b ? gcdInt(b, a % b) : a)

/**
 * Il risultato di una serie di potenze: il raggio e l'insieme di convergenza (R = 1; converge per
 * x ∈ [−1, 1)). Null se il raggio non si trova.
 */
export function powerSeriesShown(s: PowerSeries, style: FormatOptions): FormattedResult | null {
  const R = radius(s)
  if (R === null) return null
  const x = s.x
  const center = shownOf(num(s.center), style)
  if (R === Infinity) return { tex: `R = +\\infty,\\ \\text{converge per ogni } ${x} \\in \\mathbb{R}`, text: `R = +∞; converge per ogni ${x} reale` }
  if (R === 0) return { tex: `R = 0,\\ \\text{converge solo in } ${x} = ${center.tex}`, text: `R = 0; converge solo in ${x} = ${center.text}` }
  // Il raggio esatto, se si riconosce (1, 1/2, √2): anche se il limite si è fermato a 1,0000001 (con i logaritmi).
  const near = Number(R.toPrecision(7))
  const known = exactNear(R) ?? (Math.abs(near - R) <= 1e-6 * R ? exactNear(near) : null)
  const value = known ? compile(toNode(known), EMPTY_SCOPE)({}) : R
  // Se no una costante nota (e, π, ln 2), o il suo inverso (1/e): scritta così, con le cifre accanto.
  const digits = formatNumber(R, { ...style, decimal: true }) ?? { tex: String(R), text: String(R) }
  const plain = (r: FormattedResult | null) => r && { tex: r.tex.split(' \\approx')[0], text: r.text.split(' ≈')[0] }
  const direct = known ? null : plain(recognize(R, style)) ?? nearConstant(R)
  const inverse = known || direct ? null : plain(recognize(1 / R, style)) ?? nearConstant(1 / R)
  const Rshown: { tex: string; text: string } = known
    ? shownOf(known, style)
    : direct ?? (inverse ? { tex: `\\frac{1}{${inverse.tex}}`, text: `1/${inverse.text}` } : digits)
  const radiusTex = `R = ${Rshown.tex}${!known && (direct || inverse) ? ` \\approx ${digits.tex}` : ''}`
  const radiusText = `R = ${Rshown.text}${!known && (direct || inverse) ? ` ≈ ${digits.text}` : ''}`
  // Gli estremi: x₀ ± R (esatti se il raggio lo è).
  const ends = known
    ? [shownOf(add(num(s.center), neg(known)), style), shownOf(add(num(s.center), known), style)]
    : s.center.sign === 0
      ? [{ tex: `-${Rshown.tex}`, text: `−${Rshown.text}` }, Rshown]
      : [
          { tex: `${center.tex} - ${Rshown.tex}`, text: `${center.text} − ${Rshown.text}` },
          { tex: `${center.tex} + ${Rshown.tex}`, text: `${center.text} + ${Rshown.text}` },
        ]
  const left = convergesAt(s, -value)
  const right = convergesAt(s, value)
  if (left === null || right === null) {
    return { tex: `${radiusTex},\\ \\text{converge per } |${x} - ${center.tex}| < ${Rshown.tex}`, text: `${radiusText}; converge per |${x} − ${center.text}| < ${Rshown.text}` }
  }
  const open = left ? '[' : '('
  const close = right ? ']' : ')'
  const extremes = (tex: boolean) => {
    const what = (ok: boolean) => (ok ? 'converge' : 'non converge')
    const at = (i: number) => (tex ? ends[i].tex : ends[i].text)
    return tex
      ? `\\text{(in } ${x} = ${at(0)} \\text{ ${what(left)}, in } ${x} = ${at(1)} \\text{ ${what(right)})}`
      : `(in ${x} = ${at(0)} ${what(left)}, in ${x} = ${at(1)} ${what(right)})`
  }
  return {
    tex: `${radiusTex},\\ \\text{converge per } ${x} \\in \\left${open}${ends[0].tex}, ${ends[1].tex}\\right${close}\\ ${extremes(true)}`,
    text: `${radiusText}; converge per ${x} ∈ ${open}${ends[0].text}, ${ends[1].text}${close} ${extremes(false)}`,
  }
}
