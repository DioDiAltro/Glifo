/**
 * Lo studio di funzione, come in Analisi 1: dominio, simmetrie, intersezioni con gli assi, segno,
 * limiti agli estremi del dominio e asintoti, derivata prima (crescenza, massimi e minimi), derivata
 * seconda (concavità e flessi). I punti sono esatti quando si può (le radici dei polinomi, i valori
 * riconosciuti: π/4, e, ln 2, √2), se no con le cifre. Le funzioni periodiche si studiano in un periodo.
 */
import { nearFraction } from './complex'
import { compile, EMPTY_SCOPE, scopeWith, type Scope } from './evaluate'
import { Rational } from './exact'
import { formatNumber, formatRational, type FormatOptions, type FormattedResult } from './format'
import { nameLatex, toLatex } from './latex'
import { limit, type LimitValue } from './limits'
import { splitRoot, surdText } from './linear'
import { numericRoots, rationalRoots, trim, type Poly } from './polynomial'
import { asFraction } from './primitive'
import { breaks, periodOf, scanRoots } from './solve'
import { add, dependsOn, derive, expand, fn, mul, num, plainText, pow, sub, subst, sym, symbols, tidy, toNode, type Ex } from './symbolic'

/** Un numero (un punto dell'asse x, un valore): con l'espressione esatta se c'è, e come si scrive. */
export interface Value {
  v: number
  ex: Ex | null
  tex: string
  text: string
  /** Un punto dove la funzione di sicuro non c'è (un denominatore nullo, il logaritmo di 0). */
  excluded?: boolean
}

/** Un intervallo: gli estremi (null per ∓∞) e se ne fanno parte. */
export interface Span {
  lo: Value | null
  hi: Value | null
  loIn: boolean
  hiIn: boolean
}

/** Un massimo, un minimo o un flesso; `note` se lì la derivata non c'è (punto angoloso, cuspide) o, in un flesso, se è zero. */
export interface Special {
  kind: 'max' | 'min' | 'flex'
  x: Value
  y: Value
  note?: 'punto angoloso' | 'cuspide' | 'tangente verticale' | 'tangente orizzontale'
}

export interface Asymptote {
  kind: 'vertical' | 'horizontal' | 'oblique'
  /** La retta: x = a (verticale) o y = m x + q. */
  a?: number
  m?: number
  q?: number
  tex: string
  text: string
}

export interface Study {
  /** La variabile (x) e la funzione con i numeri. */
  v: string
  F: (x: number) => number
  /** Il periodo, se è periodica: allora si studia in [0, T]. */
  period: Value | null
  domain: Span[]
  parity: 'pari' | 'dispari' | null
  zeros: Value[]
  /** f(0), se 0 è nel dominio. */
  y0: Value | null
  positive: Span[]
  negative: Span[]
  limits: FormattedResult[]
  asymptotes: Asymptote[]
  d1: Ex | null
  increasing: Span[]
  decreasing: Span[]
  extrema: Special[]
  d2: Ex | null
  convex: Span[]
  concave: Span[]
  flexes: Special[]
}

const R = (n: number | bigint, d: number | bigint = 1) => new Rational(BigInt(n), BigInt(d))
const same = (a: number, b: number) => Math.abs(a - b) <= 1e-8 * Math.max(1, Math.abs(a), Math.abs(b))

// ——— I numeri: esatti o con le cifre ———

/** Il valore di un'espressione senza variabili (numeri, π, e), scritto come nei libri. */
function exact(ex: Ex, options: FormatOptions): Value {
  const node = toNode(ex)
  let v = NaN
  try {
    v = compile(node, EMPTY_SCOPE)({})
  } catch {
    // Resta NaN.
  }
  if (ex.t === 'num') return { v, ex, ...formatRational(ex.v, options) }
  return { v, ex, tex: toLatex(node), text: plainText(node) }
}

/** Un numero come costante nota, se lo è: frazione, radice, multiplo di π o di e, potenza di e, logaritmo. */
function recognizeEx(v: number): Ex | null {
  if (!Number.isFinite(v)) return null
  if (Math.abs(v) < 1e-12) return num(0)
  const frac = nearFraction(v, 1000)
  if (frac) return num(R(frac.p, frac.q))
  const sq = nearFraction(v * v, 100)
  if (sq && sq.p > 0 && !nearFraction(Math.abs(v), 100)) return mul(num(Math.sign(v)), pow(num(R(sq.p, sq.q)), num(R(1, 2))))
  const pi = nearFraction(v / Math.PI, 24)
  if (pi) return mul(num(R(pi.p, pi.q)), sym('π'))
  if (v > 0) {
    const l = nearFraction(Math.log(v), 4)
    if (l && Math.abs(l.p) <= 12) return pow(sym('e'), num(R(l.p, l.q)))
  }
  const E = Math.exp(v)
  const lnOf = Number.isFinite(E) ? nearFraction(E, 100) : null
  if (lnOf && lnOf.p > 0) return fn('ln', [num(R(lnOf.p, lnOf.q))])
  const em = nearFraction(v / Math.E, 24)
  if (em) return mul(num(R(em.p, em.q)), sym('e'))
  return null
}

/** Un numero trovato con i numeri: riconosciuto se si può, se no con le cifre. */
function numeric(v: number, options: FormatOptions): Value {
  const ex = recognizeEx(v)
  if (ex) {
    const value = exact(ex, options)
    if (same(value.v, v)) return { ...value, v }
  }
  const shown = formatNumber(v, { ...options, decimal: true, digits: 9 })
  return { v, ex: null, tex: shown?.tex ?? String(v), text: shown?.text ?? String(v) }
}

/** La funzione con i numeri. */
function compiled(e: Ex, v: string, scope: Scope): (x: number) => number {
  try {
    // Come nei risultati: tan(π/2) non esiste (non è un numero enorme).
    const c = compile(toNode(e), scopeWith(scope, [v]), { calc: true })
    const vars: Record<string, number> = {}
    return (x) => ((vars[v] = x), c(vars))
  } catch {
    return () => NaN
  }
}

// ——— Le radici ———

/** Le radici reali di un polinomio con le frazioni: razionali, a ± b√m, o con le cifre. */
function polyRoots(N: Poly, options: FormatOptions): Value[] {
  const out: Value[] = []
  const { roots, rest } = rationalRoots(trim(N))
  for (const r of roots) out.push(exact(num(r), options))
  const p = trim(rest)
  if (p.length === 3) {
    const [c, b, a] = p
    const delta = b.mul(b).sub(R(4).mul(a).mul(c))
    const split = delta.sign > 0 ? splitRoot(delta) : null
    if (split) {
      const center = b.neg().div(a.mul(R(2)))
      const k = split.k.div(a.mul(R(2))).abs()
      for (const s of [-1, 1]) {
        const coef = k.mul(R(s))
        const ex = add(num(center), mul(num(coef), pow(num(R(split.m)), num(R(1, 2)))))
        const shown = surdText(center, coef, split.m)
        out.push({ v: center.toNumber() + s * k.toNumber() * Math.sqrt(Number(split.m)), ex, tex: shown.tex, text: shown.text })
      }
    }
  } else if (p.length > 3) {
    for (const z of numericRoots(p.map((c) => c.toNumber()))) if (z.im === 0) out.push(numeric(z.re, options))
  }
  return out
}

/** Le funzioni che si annullano solo dove si annulla il loro argomento. */
const ZERO_WITH_ARGUMENT = new Set(['abs', 'arctan', 'sinh', 'tanh', 'arsinh', 'artanh', 'arcsin', 'sgn'])

/** Dove `e` si annulla, in `window`: esatto per i fattori polinomiali, se no con i numeri. */
function zerosOf(e: Ex, v: string, scope: Scope, options: FormatOptions, window: [number, number]): Value[] {
  const out: Value[] = []
  const push = (p: Value) => {
    if (Number.isFinite(p.v) && p.v >= window[0] - 1e-9 && p.v <= window[1] + 1e-9 && !out.some((q) => same(q.v, p.v))) out.push(p)
  }
  const visit = (x: Ex): void => {
    if (!dependsOn(x, v)) return
    if (x.t === 'mul') return x.factors.forEach(visit)
    if (x.t === 'pow') {
      // c^u e 1/u non si annullano mai.
      if (!dependsOn(x.base, v)) return
      if (x.exp.t === 'num') {
        if (x.exp.v.sign > 0) visit(x.base)
        return
      }
    }
    if (x.t === 'fn') {
      if (ZERO_WITH_ARGUMENT.has(x.name)) return visit(x.args[0])
      if (x.name === 'ln') return visit(sub(x.args[0], num(1)))
      if (x.name === 'cosh') return
    }
    const r = asFraction(x, v)
    if (r) return polyRoots(r.N, options).forEach(push)
    const G = compiled(x, v, scope)
    for (const z of scanRoots(G, window[0], window[1], 20000)) {
      // Non dove i numeri diventano così piccoli da fare 0 (e^{-x^2} per x grande).
      const d = 1e-3 * Math.max(1, Math.abs(z))
      if (G(z - d) === 0 && G(z + d) === 0) continue
      push(numeric(z, options))
      if (out.length > 40) break
    }
  }
  visit(tidy(e))
  return out.sort((a, b) => a.v - b.v)
}

/**
 * Le espressioni che dicono dove finisce il dominio (denominatori, radicandi, argomenti dei
 * logaritmi) e dove la funzione ha un angolo (|u|): dove si annullano può cambiare tutto.
 */
function boundaries(e: Ex, v: string, out: { ex: Ex; excluded: boolean }[]): void {
  if (!dependsOn(e, v)) return
  const put = (ex: Ex, excluded: boolean) => out.push({ ex, excluded })
  switch (e.t) {
    case 'add':
      return e.terms.forEach((t) => boundaries(t, v, out))
    case 'mul':
      return e.factors.forEach((f) => boundaries(f, v, out))
    case 'pow': {
      const { base, exp } = e
      // 1/u e u^w: dove u = 0 non c'è; √u sì (√0 = 0).
      if (dependsOn(base, v) && dependsOn(exp, v)) put(base, true)
      else if (dependsOn(base, v) && exp.t === 'num' && exp.v.sign < 0) put(base, true)
      else if (dependsOn(base, v) && exp.t === 'num' && exp.v.d % 2n === 0n) put(base, false)
      boundaries(base, v, out)
      boundaries(exp, v, out)
      return
    }
    case 'fn': {
      const u = e.args[0]
      switch (e.name) {
        case 'ln':
          put(u, true)
          break
        case 'abs':
        case 'sgn':
          put(u, false)
          break
        case 'arcsin':
        case 'arccos':
          put(sub(u, num(1)), false)
          put(add(u, num(1)), false)
          break
        case 'artanh':
          put(sub(u, num(1)), true)
          put(add(u, num(1)), true)
          break
        case 'arcosh':
          put(sub(u, num(1)), false)
          break
        case 'tan':
        case 'sec':
          put(fn('cos', [u]), true)
          break
        case 'cot':
        case 'csc':
          put(fn('sin', [u]), true)
          break
      }
      for (const a of e.args) boundaries(a, v, out)
      return
    }
    default:
      return
  }
}

/** I punti dove il dominio o la funzione possono cambiare, in ordine e senza doppioni. */
function cutsOf(e: Ex, G: (x: number) => number, v: string, scope: Scope, options: FormatOptions, window: [number, number]): Value[] {
  const exprs: { ex: Ex; excluded: boolean }[] = []
  boundaries(e, v, exprs)
  const out: Value[] = []
  const push = (p: Value) => {
    if (p.v <= window[0] + 1e-12 || p.v >= window[1] - 1e-12) return
    const before = out.find((q) => same(q.v, p.v))
    if (before) before.excluded ||= p.excluded
    else out.push(p)
  }
  for (const { ex, excluded } of exprs) for (const p of zerosOf(ex, v, scope, options, window)) push({ ...p, excluded })
  // Quello che la formula non dice (o non si riconosce): dove la funzione smette di esistere o salta.
  // Non dove i numeri diventano solo troppo grandi (e^{1/x} vicino a 0): lì la funzione c'è.
  const [a, b] = [Number.isFinite(window[0]) ? window[0] : -100, Number.isFinite(window[1]) ? window[1] : 100]
  for (const x of breaks(G, a, b, 20000)) {
    const d = 1e-6 * Math.max(1, Math.abs(x))
    const [l, r] = [G(x - d), G(x + d)]
    if (Number.isNaN(l) !== Number.isNaN(r) || (Number.isFinite(l) && Number.isFinite(r))) push(numeric(x, options))
  }
  return out.sort((p, q) => p.v - q.v)
}

// ——— Gli intervalli ———

/** Un punto dentro l'intervallo (lo, hi), anche con gli estremi infiniti. */
function inside(lo: number, hi: number): number {
  if (Number.isFinite(lo) && Number.isFinite(hi)) return (lo + hi) / 2
  if (Number.isFinite(lo)) return lo + 1 + Math.abs(lo) * 0.1
  if (Number.isFinite(hi)) return hi - 1 - Math.abs(hi) * 0.1
  return 0.37
}

const defined = (y: number) => Number.isFinite(y)

/** Il dominio in `window`: gli intervalli dove la funzione esiste. */
function domainOf(G: (x: number) => number, cuts: Value[], window: [number, number], options: FormatOptions): Span[] {
  const ends: (Value | null)[] = [Number.isFinite(window[0]) ? numeric(window[0], options) : null, ...cuts, Number.isFinite(window[1]) ? numeric(window[1], options) : null]
  const at = (p: Value | null) => !!p && !p.excluded && defined(G(p.v))
  const spans: Span[] = []
  let current: Span | null = null
  for (let i = 0; i + 1 < ends.length; i++) {
    const [lo, hi] = [ends[i], ends[i + 1]]
    // Un numero troppo grande (e^{1/x} vicino a 0) c'è: non c'è solo dove il conto non ha senso.
    const piece = !Number.isNaN(G(inside(lo?.v ?? -Infinity, hi?.v ?? Infinity)))
    if (piece) {
      if (!current) current = { lo, hi, loIn: at(lo), hiIn: at(hi) }
      else {
        current.hi = hi
        current.hiIn = at(hi)
      }
      // Il punto dopo: se la funzione lì non c'è, l'intervallo finisce.
      if (i + 1 < ends.length - 1 && !at(hi)) {
        spans.push(current)
        current = null
      }
    } else {
      if (current) spans.push(current)
      current = null
      // Un punto da solo (√(−x²) esiste solo in 0).
      if (i + 1 < ends.length - 1 && at(hi) && Number.isNaN(G(inside(hi!.v, ends[i + 2]?.v ?? Infinity)))) spans.push({ lo: hi, hi, loIn: true, hiIn: true })
    }
  }
  if (current) spans.push(current)
  return spans
}

/** x è nel dominio? */
function inDomain(x: number, domain: Span[]): boolean {
  return domain.some((s) => (s.lo === null || x > s.lo.v || (s.loIn && same(x, s.lo.v))) && (s.hi === null || x < s.hi.v || (s.hiIn && same(x, s.hi.v))))
}

/**
 * Dove G è positiva e dove negativa, dentro il dominio, tagliando nei punti `cuts`. Con `value` (il
 * segno della funzione) gli estremi ci sono se lì G ha quel segno; con `trend` (crescenza, concavità)
 * gli intervalli sono aperti e continuano oltre un punto dove il segno non cambia (x³ cresce sempre).
 */
function signs(G: (x: number) => number, cuts: Value[], domain: Span[], mode: 'value' | 'trend'): { positive: Span[]; negative: Span[] } {
  const positive: Span[] = []
  const negative: Span[] = []
  for (const s of domain) {
    if (s.lo && s.hi && same(s.lo.v, s.hi.v)) continue
    const lo = s.lo?.v ?? -Infinity
    const hi = s.hi?.v ?? Infinity
    const ends: (Value | null)[] = [s.lo, ...cuts.filter((c) => c.v > lo + 1e-12 && c.v < hi - 1e-12), s.hi]
    let last: { sign: number; span: Span } | null = null
    for (let i = 0; i + 1 < ends.length; i++) {
      const [a, b] = [ends[i], ends[i + 1]]
      const y = G(inside(a?.v ?? -Infinity, b?.v ?? Infinity))
      const sign = !Number.isNaN(y) && y !== 0 ? Math.sign(y) : 0
      const edge = (p: Value | null, isEnd: boolean) => {
        if (!p || mode === 'trend' || !isEnd) return false
        const g = G(p.v)
        return defined(g) && Math.sign(g) === sign
      }
      const hiIn = edge(b, i + 1 === ends.length - 1 && s.hiIn)
      // Lo stesso segno anche oltre il punto in mezzo: un intervallo solo.
      const g = a ? G(a.v) : NaN
      const through = !!last && last.sign === sign && sign !== 0 && (mode === 'trend' || (defined(g) && Math.sign(g) === sign))
      if (through) {
        last!.span.hi = b
        last!.span.hiIn = hiIn
        continue
      }
      if (!sign) {
        last = null
        continue
      }
      const span: Span = { lo: a, hi: b, loIn: edge(a, i === 0 && s.loIn), hiIn }
      ;(sign > 0 ? positive : negative).push(span)
      last = { sign, span }
    }
  }
  return { positive, negative }
}

// ——— Come si scrivono ———

const LE = (closed: boolean): [string, string] => (closed ? ['\\le', '≤'] : ['<', '<'])

function spanText(s: Span, x: string): FormattedResult {
  const name = nameLatex(x)
  if (!s.lo && !s.hi) return { tex: `${name} \\in \\mathbb{R}`, text: `${x} ∈ ℝ` }
  if (s.lo && s.hi && same(s.lo.v, s.hi.v)) return { tex: `${name} = ${s.lo.tex}`, text: `${x} = ${s.lo.text}` }
  if (!s.lo) return { tex: `${name} ${LE(s.hiIn)[0]} ${s.hi!.tex}`, text: `${x} ${LE(s.hiIn)[1]} ${s.hi!.text}` }
  if (!s.hi) return { tex: `${name} ${s.loIn ? '\\ge' : '>'} ${s.lo.tex}`, text: `${x} ${s.loIn ? '≥' : '>'} ${s.lo.text}` }
  return {
    tex: `${s.lo.tex} ${LE(s.loIn)[0]} ${name} ${LE(s.hiIn)[0]} ${s.hi.tex}`,
    text: `${s.lo.text} ${LE(s.loIn)[1]} ${x} ${LE(s.hiIn)[1]} ${s.hi.text}`,
  }
}

/** Gli intervalli uniti con «o»: x < −1 ∨ x > 1; tutto tranne dei punti: x ≠ 0; tutto: «ogni x» con `every`. */
export function spansText(spans: Span[], x: string, every = false): FormattedResult {
  if (!spans.length) return { tex: '\\text{nessun } ' + nameLatex(x), text: `nessun ${x}` }
  const name = nameLatex(x)
  if (every && spans.length === 1 && !spans[0].lo && !spans[0].hi) return { tex: `\\text{ogni } ${name}`, text: `ogni ${x}` }
  const gaps: Value[] = []
  const whole =
    !spans[0].lo &&
    !spans[spans.length - 1].hi &&
    spans.every((s, i) => {
      if (i === 0) return true
      const before = spans[i - 1]
      if (!before.hi || !s.lo || !same(before.hi.v, s.lo.v) || before.hiIn || s.loIn) return false
      gaps.push(s.lo)
      return true
    })
  if (whole && !gaps.length) return { tex: `${name} \\in \\mathbb{R}`, text: `${x} ∈ ℝ` }
  if (whole) return { tex: gaps.map((g) => `${name} \\ne ${g.tex}`).join(',\\ '), text: gaps.map((g) => `${x} ≠ ${g.text}`).join(', ') }
  const parts = spans.map((s) => spanText(s, x))
  return { tex: parts.map((p) => p.tex).join(' \\lor '), text: parts.map((p) => p.text).join(' ∨ ') }
}

/** Un limite scritto: \lim_{x \to 0^+} f(x) = +∞. */
function limitText(head: string, headText: string, value: LimitValue, options: FormatOptions): FormattedResult {
  const shown =
    value.k === 'infinity'
      ? value.sign > 0
        ? { tex: '+\\infty', text: '+∞' }
        : { tex: '-\\infty', text: '−∞' }
      : value.k === 'value'
        ? numeric(value.v, options)
        : { tex: '\\nexists', text: 'non esiste' }
  return { tex: `${head} = ${shown.tex}`, text: `${headText} = ${shown.text}` }
}

// ——— Lo studio ———

/** Lo studio di f nella variabile v; null se f non si sa calcolare. */
export function study(f: Ex, v: string, scope: Scope, options: FormatOptions, name = 'f'): Study | null {
  const F = compiled(f, v, scope)
  // Periodica (seno, coseno): si studia in un periodo.
  const T = dependsOn(f, v) ? periodOf(F) && smallestPeriod(F) : null
  const window: [number, number] = T ? [0, T] : [-Infinity, Infinity]
  const scan: [number, number] = T ? window : [-100, 100]
  const cuts = cutsOf(f, F, v, scope, options, window)
  const domain = domainOf(F, cuts, window, options)
  if (!domain.length) return null
  const period = T ? exact(mul(num(R(Math.round(T / Math.PI))), sym('π')), options) : null

  // Simmetrie.
  let parity: Study['parity'] = null
  {
    let even = 0
    let odd = 0
    let tested = 0
    for (const s of [0.37, 0.81, 1.53, 2.27, 3.9, 0.11, 5.3]) {
      const [a, b] = [F(s), F(-s)]
      if (!defined(a) && !defined(b)) continue
      if (defined(a) !== defined(b)) {
        tested = -100
        break
      }
      tested++
      if (same(a, b)) even++
      if (same(a, -b)) odd++
    }
    if (tested >= 3 && even === tested && odd < tested) parity = 'pari'
    else if (tested >= 3 && odd === tested && even < tested) parity = 'dispari'
  }

  // Intersezioni con gli assi e segno.
  const zeros = zerosOf(f, v, scope, options, scan).filter((z) => {
    const scale = Math.max(1, ...[-0.1, 0.1].map((d) => Math.abs(F(z.v + d))).filter(Number.isFinite))
    return inDomain(z.v, domain) && Math.abs(F(z.v)) <= 1e-7 * scale
  })
  const y0 = inDomain(0, domain) ? valueAt(f, v, num(0), F(0), options) : null
  const { positive, negative } = signs(F, merge(zeros, cuts), domain, 'value')

  // Limiti agli estremi del dominio e asintoti.
  const limits: FormattedResult[] = []
  const asymptotes: Asymptote[] = []
  const fx = `${nameLatex(name)}(${nameLatex(v)})`
  const fxText = `${name}(${v})`
  const vertical = new Set<number>()
  const slants: { m: number; q: number; tex: string; text: string; side: 1 | -1 }[] = []
  for (const s of domain) {
    if (s.lo && s.hi && same(s.lo.v, s.hi.v)) continue
    const sides: [Value | null, boolean, 1 | -1][] = [
      [s.lo, s.loIn, 1],
      [s.hi, s.hiIn, -1],
    ]
    for (const [p, closedEnd, side] of sides) {
      if (p && closedEnd) continue
      if (!p && T) continue
      const at = p ? p.v : side > 0 ? -Infinity : Infinity
      const value = limit(F, at, p ? side : 0)
      const to = p ? `${p.tex}^{${side > 0 ? '+' : '-'}}` : side > 0 ? '-\\infty' : '+\\infty'
      const toText = p ? `${p.text}${side > 0 ? '⁺' : '⁻'}` : side > 0 ? '−∞' : '+∞'
      // Nei punti dove i periodi si ripetono (0 e T) niente limite: la funzione continua.
      if (T && p && (same(p.v, 0) || same(p.v, T))) continue
      limits.push(limitText(`\\lim_{${nameLatex(v)} \\to ${to}} ${fx}`, `lim ${v}→${toText} ${fxText}`, value, options))
      if (p && value.k === 'infinity' && !vertical.has(p.v)) {
        vertical.add(p.v)
        // In una funzione periodica si ripete a ogni periodo.
        const every = period ? { tex: ` + k${period.tex}`, text: ` + k${period.text}` } : { tex: '', text: '' }
        asymptotes.push({ kind: 'vertical', a: p.v, tex: `${nameLatex(v)} = ${p.tex}${every.tex}`, text: `${v} = ${p.text}${every.text}` })
      }
      if (!p) {
        const line = slantAt(F, at, v, options)
        if (line) slants.push({ ...line, side })
      }
    }
  }
  // Lo stesso asintoto da tutte e due le parti si scrive una volta: y = 0 (x → ±∞).
  for (const line of slants) {
    const twin = slants.find((o) => o !== line && same(o.m, line.m) && same(o.q, line.q))
    if (twin && line.side > 0) continue
    const where = twin ? ['\\pm\\infty', '±∞'] : line.side > 0 ? ['-\\infty', '−∞'] : ['+\\infty', '+∞']
    asymptotes.push({ kind: line.m === 0 ? 'horizontal' : 'oblique', m: line.m, q: line.q, tex: `y = ${line.tex}\\ (${nameLatex(v)} \\to ${where[0]})`, text: `y = ${line.text} (${v} → ${where[1]})` })
  }

  // La derivata prima: crescenza, massimi e minimi.
  let d1: Ex | null = null
  let d2: Ex | null = null
  try {
    d1 = derive(f, v)
    d2 = derive(d1, v)
  } catch {
    // Senza derivate (un fattoriale, una funzione a tratti): solo la prima parte.
  }
  const increasing: Span[] = []
  const decreasing: Span[] = []
  const extrema: Special[] = []
  const convex: Span[] = []
  const concave: Span[] = []
  const flexes: Special[] = []
  if (d1) {
    const F1 = compiled(d1, v, scope)
    const critical = merge(zerosOf(d1, v, scope, options, scan), cutsOf(d1, F1, v, scope, options, window), cuts)
    const s1 = signs(F1, critical, domain, 'trend')
    increasing.push(...s1.positive)
    decreasing.push(...s1.negative)
    const edges = T ? [0, T] : []
    extrema.push(...specials(F, F1, F1, critical, domain, f, v, options, 'extrema', edges))
    if (d2) {
      const F2 = compiled(d2, v, scope)
      const bends = merge(zerosOf(d2, v, scope, options, scan), cutsOf(d2, F2, v, scope, options, window), critical)
      const s2 = signs(F2, bends, domain, 'trend')
      convex.push(...s2.positive)
      concave.push(...s2.negative)
      flexes.push(...specials(F, F2, F1, bends, domain, f, v, options, 'flexes', edges))
    }
  }
  return { v, F, period, domain, parity, zeros, y0, positive, negative, limits, asymptotes, d1, increasing, decreasing, extrema, d2, convex, concave, flexes }
}

/** Il periodo più piccolo tra π/2, π e 2π (tan x ha π, non 2π). */
function smallestPeriod(F: (x: number) => number): number | null {
  const probes = [0.3, 1.7, -2.4, 4.1, 0.9, -0.6, 2.2, 0.05]
  for (const T of [Math.PI / 2, Math.PI, 2 * Math.PI]) {
    let tested = 0
    const ok = probes.every((x) => {
      const [a, b] = [F(x), F(x + T)]
      if (!defined(a) && !defined(b)) return true
      if (defined(a) !== defined(b)) return false
      tested++
      return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a))
    })
    if (ok && tested >= 4) return T
  }
  return null
}

/** I punti di più elenchi, in ordine e senza doppioni (vince il primo, che di solito è esatto). */
function merge(...lists: Value[][]): Value[] {
  const out: Value[] = []
  for (const list of lists) for (const p of list) if (!out.some((q) => same(q.v, p.v))) out.push(p)
  return out.sort((a, b) => a.v - b.v)
}

/** f nel punto: esatta (con il punto esatto), se no con le cifre. */
function valueAt(f: Ex, v: string, x: Ex | null, y: number, options: FormatOptions): Value {
  if (x) {
    try {
      const plain = subst(f, v, x)
      if (!symbols(plain).some((n) => n !== 'π' && n !== 'e')) {
        // Come viene o sviluppato ((−2 − √2)² e^{…} = (6 + 4√2) e^{…}): il più corto.
        const values = [tidy(plain), tidy(expand(plain))].map((e) => exact(e, options)).filter((w) => same(w.v, y))
        const value = values.sort((a, b) => a.text.length - b.text.length)[0]
        if (value && value.tex.length < 80) return { ...value, v: y }
      }
    } catch {
      // Con le cifre.
    }
  }
  return numeric(y, options)
}

/** y = m x + q, l'asintoto orizzontale (m = 0) o obliquo verso `at` (±∞), se c'è. */
function slantAt(F: (x: number) => number, at: number, v: string, options: FormatOptions): { m: number; q: number; tex: string; text: string } | null {
  const L = limit(F, at, 0)
  if (L.k === 'value') {
    const q = numeric(L.v, options)
    return { m: 0, q: L.v, tex: q.tex, text: q.text }
  }
  if (L.k !== 'infinity') return null
  const M = limit((x) => F(x) / x, at, 0)
  if (M.k !== 'value' || Math.abs(M.v) < 1e-9) return null
  const m = numeric(M.v, options)
  const Q = limit((x) => F(x) - m.v * x, at, 0)
  if (Q.k !== 'value') return null
  if (Math.abs(Q.v) < 1e-7) Q.v = 0
  const mx = m.text === '1' ? v : m.text === '−1' ? `−${v}` : `${m.text}${v}`
  const mxTex = m.tex === '1' ? nameLatex(v) : m.tex === '-1' ? `-${nameLatex(v)}` : `${m.tex}${nameLatex(v)}`
  if (Math.abs(Q.v) < 1e-12) return { m: M.v, q: 0, tex: mxTex, text: mx }
  const neg = Q.v < 0
  const qAbs = numeric(Math.abs(Q.v), options)
  return { m: M.v, q: Q.v, tex: `${mxTex} ${neg ? '-' : '+'} ${qAbs.tex}`, text: `${mx} ${neg ? '−' : '+'} ${qAbs.text}` }
}

/**
 * I massimi e i minimi (dove la derivata cambia segno, anche negli estremi chiusi del dominio) o i
 * flessi (dove cambia segno la derivata seconda e c'è la tangente). `G` è la derivata che cambia
 * segno, `slope` la derivata prima (per dire dove non c'è); `edges` gli estremi del periodo, che non
 * sono estremi del dominio.
 */
function specials(
  F: (x: number) => number,
  G: (x: number) => number,
  slope: (x: number) => number,
  points: Value[],
  domain: Span[],
  f: Ex,
  v: string,
  options: FormatOptions,
  what: 'extrema' | 'flexes',
  edges: number[],
): Special[] {
  const out: Special[] = []
  const sideSign = (x: number, dir: 1 | -1, limitTo: number): number => {
    // Il segno di G subito accanto a x, prima del punto dopo.
    const step = Math.min(1e-3 * Math.max(1, Math.abs(x)), Math.abs(limitTo - x) / 2)
    const y = G(x + dir * step)
    return defined(y) && Math.abs(y) > 1e-12 ? Math.sign(y) : 0
  }
  /** Com'è la tangente in x: c'è, è verticale, o da una parte e dall'altra è diversa. */
  const tangent = (x: number, left: boolean, right: boolean): Special['note'] | 'ok' => {
    const l = left ? limit(slope, x, -1) : null
    const r = right ? limit(slope, x, 1) : null
    const sides = [l, r].filter((t): t is LimitValue => !!t)
    if (sides.every((t) => t.k === 'value') && (sides.length < 2 || Math.abs((sides[0] as { v: number }).v - (sides[1] as { v: number }).v) <= 1e-5 * Math.max(1, Math.abs((sides[0] as { v: number }).v)))) return 'ok'
    if (sides.every((t) => t.k === 'infinity')) {
      const [a, b] = sides as { k: 'infinity'; sign: 1 | -1 }[]
      return !b || a.sign === b.sign ? 'tangente verticale' : 'cuspide'
    }
    return 'punto angoloso'
  }
  for (const s of domain) {
    if (s.lo && s.hi && same(s.lo.v, s.hi.v)) continue
    const lo = s.lo?.v ?? -Infinity
    const hi = s.hi?.v ?? Infinity
    const inner = points.filter((p) => p.v > lo + 1e-12 && p.v < hi - 1e-12)
    const all = [s.lo, ...inner, s.hi]
    for (let i = 0; i < all.length; i++) {
      const p = all[i]
      if (!p) continue
      const isLo = i === 0
      const isHi = i === all.length - 1
      if ((isLo && !s.loIn) || (isHi && !s.hiIn)) continue
      // In una funzione periodica 0 e T sono lo stesso punto, dentro il dominio: si guarda una volta, in 0.
      const periodStart = edges.length > 0 && isLo && same(p.v, edges[0])
      if (isHi && edges.some((e) => same(e, p.v))) continue
      if (!defined(F(p.v))) continue
      const before = periodStart ? sideSign(edges[1], -1, all[all.length - 2]?.v ?? edges[0]) : isLo ? 0 : sideSign(p.v, -1, all[i - 1]?.v ?? -Infinity)
      const after = isHi ? 0 : sideSign(p.v, 1, all[i + 1]?.v ?? Infinity)
      let kind: Special['kind'] | null = null
      if (what === 'extrema') {
        if (isLo && !periodStart) kind = after > 0 ? 'min' : after < 0 ? 'max' : null
        else if (isHi) kind = before > 0 ? 'max' : before < 0 ? 'min' : null
        else if (before > 0 && after < 0) kind = 'max'
        else if (before < 0 && after > 0) kind = 'min'
      } else if ((periodStart || (!isLo && !isHi)) && before && after && before !== after) kind = 'flex'
      if (!kind) continue
      const shape = periodStart ? 'ok' : tangent(p.v, !isLo, !isHi)
      // Un flesso vuole la tangente (anche verticale): in un punto angoloso no.
      if (kind === 'flex' && shape !== 'ok' && shape !== 'tangente verticale') continue
      const special: Special = { kind, x: p, y: valueAt(f, v, p.ex, F(p.v), options) }
      if (shape !== 'ok' && !isLo && !isHi) special.note = shape
      // Un flesso dove la derivata è zero: a tangente orizzontale (come x³ in 0).
      else if (kind === 'flex' && Math.abs(slope(p.v)) <= 1e-9) special.note = 'tangente orizzontale'
      out.push(special)
    }
  }
  return out
}

// ——— Il risultato nella nota ———

function pointText(p: Special): FormattedResult {
  // Con i decimali con la virgola le coordinate si separano con il punto e virgola.
  const sep = /[0-9]\{,\}/.test(p.x.tex + p.y.tex) ? ';\\ ' : ', '
  const note = p.note ? { tex: `\\ \\text{(${p.note})}`, text: ` (${p.note})` } : { tex: '', text: '' }
  return { tex: `\\left(${p.x.tex}${sep}${p.y.tex}\\right)${note.tex}`, text: `(${p.x.text}; ${p.y.text})${note.text}` }
}

function list(items: FormattedResult[], none: string): FormattedResult {
  if (!items.length) return { tex: `\\text{${none}}`, text: none }
  return { tex: items.map((i) => i.tex).join(',\\ '), text: items.map((i) => i.text).join(', ') }
}

/** «crescente per x < −1 ∨ x > 1»: se è lunga, le parti con «o» vanno a capo (∨ x > 1 sotto). */
function phrase(words: string, spans: FormattedResult): FormattedResult[] {
  // Dopo una parola KaTeX spazia il meno come una sottrazione («per − 1»): tra graffe è il segno del numero.
  const tex = spans.tex.split(' \\lor ').map((t) => t.replace(/^-/, '{-}'))
  const text = spans.text.split(' ∨ ')
  if (tex.length === 1 || words.length + spans.text.length <= 32) return [{ tex: `\\text{${words} } ${tex.join(' \\lor ')}`, text: `${words} ${spans.text}` }]
  return tex.map((t, i) => (i ? { tex: `\\qquad \\lor\\ ${t}`, text: `∨ ${text[i]}` } : { tex: `\\text{${words} } ${t}`, text: `${words} ${text[0]}` }))
}

/** Le righe dello studio: [titolo, righe]; ogni informazione su una riga sua, così la tabella non si allarga. */
export function studyRows(s: Study, name: string, options: FormatOptions): [string, FormattedResult[]][] {
  const x = s.v
  const X = nameLatex(x)
  const fx = `${nameLatex(name)}(${X})`
  const rows: [string, FormattedResult[]][] = []
  const kindName = (a: Asymptote) => (a.kind === 'vertical' ? 'verticale' : a.kind === 'horizontal' ? 'orizzontale' : 'obliquo')
  // Il dominio (in un periodo, con + kT).
  let domain = spansText(s.domain, x)
  if (s.period) {
    const T = s.period
    const holes = s.domain.flatMap((d, i) => (i > 0 && d.lo && !d.loIn ? [d.lo] : []))
    const whole = s.domain.length === holes.length + 1
    if (whole) {
      domain = holes.length
        ? { tex: holes.map((h) => `${X} \\ne ${h.tex} + k${T.tex}`).join(',\\ '), text: holes.map((h) => `${x} ≠ ${h.text} + k${T.text}`).join(', ') }
        : { tex: `${X} \\in \\mathbb{R}`, text: `${x} ∈ ℝ` }
    }
    rows.push(['Periodo', [{ tex: `${T.tex}\\ \\text{(si studia in } [0, ${T.tex}]\\text{)}`, text: `${T.text} (si studia in [0, ${T.text}])` }]])
  }
  rows.push(['Dominio', [domain]])
  if (s.parity) rows.push(['Simmetria', [{ tex: `\\text{${s.parity}}`, text: s.parity }]])
  const cross: FormattedResult[] = []
  if (s.y0) cross.push({ tex: `${nameLatex(name)}(0) = ${s.y0.tex}`, text: `${name}(0) = ${s.y0.text}` })
  cross.push(s.zeros.length ? { tex: `\\text{zeri: } ${s.zeros.map((z) => `${X} = ${z.tex}`).join(',\\ ')}`, text: `zeri: ${s.zeros.map((z) => `${x} = ${z.text}`).join(', ')}` } : { tex: '\\text{nessuno zero}', text: 'nessuno zero' })
  rows.push(['Intersezioni', cross])
  const sign: FormattedResult[] = []
  for (const [spans, op] of [
    [s.positive, '>'],
    [s.negative, '<'],
  ] as const) {
    if (!spans.length) continue
    const t = spansText(spans, x, true)
    const lines = phrase('per', t)
    sign.push(...lines.map((l, i) => (i ? l : { tex: `${fx} ${op} 0\\ ${l.tex}`, text: `${name}(${x}) ${op} 0 ${l.text}` })))
  }
  rows.push(['Segno', sign.length ? sign : [{ tex: `${fx} = 0`, text: `${name}(${x}) = 0` }]])
  if (s.limits.length) rows.push(['Limiti', s.limits])
  rows.push(['Asintoti', s.asymptotes.length ? s.asymptotes.map((a) => ({ tex: `${a.tex}\\ \\text{${kindName(a)}}`, text: `${a.text} ${kindName(a)}` })) : [{ tex: '\\text{nessuno}', text: 'nessuno' }]])
  if (s.d1) {
    const node = toNode(s.d1, options.decimal)
    rows.push(['Derivata', [{ tex: `${nameLatex(name)}'(${X}) = ${toLatex(node)}`, text: `${name}'(${x}) = ${plainText(node)}` }]])
    const parts: FormattedResult[] = []
    for (const [spans, word] of [
      [s.increasing, 'crescente'],
      [s.decreasing, 'decrescente'],
    ] as const) {
      if (!spans.length) continue
      parts.push(...phrase(`${word} per`, spansText(spans, x, true)))
    }
    if (s.d1.t === 'num' && s.d1.v.sign === 0) parts.push({ tex: '\\text{costante}', text: 'costante' })
    if (parts.length) rows.push(['Crescenza', parts])
    rows.push(['Massimi e minimi', s.extrema.length ? s.extrema.map((e) => ({ tex: `\\text{${e.kind === 'max' ? 'massimo' : 'minimo'} } ${pointText(e).tex}`, text: `${e.kind === 'max' ? 'massimo' : 'minimo'} ${pointText(e).text}` })) : [{ tex: '\\text{nessuno}', text: 'nessuno' }]])
  }
  if (s.d2) {
    const node = toNode(s.d2, options.decimal)
    rows.push(['Derivata seconda', [{ tex: `${nameLatex(name)}''(${X}) = ${toLatex(node)}`, text: `${name}''(${x}) = ${plainText(node)}` }]])
    const parts: FormattedResult[] = []
    for (const [spans, word] of [
      [s.convex, 'convessa'],
      [s.concave, 'concava'],
    ] as const) {
      if (!spans.length) continue
      parts.push(...phrase(`${word} per`, spansText(spans, x, true)))
    }
    if (s.d2.t === 'num' && s.d2.v.sign === 0) parts.push({ tex: '\\text{né convessa né concava (è una retta)}', text: 'né convessa né concava (è una retta)' })
    if (parts.length) rows.push(['Concavità', parts])
    rows.push(['Flessi', s.flexes.length ? s.flexes.map(pointText) : [{ tex: '\\text{nessuno}', text: 'nessuno' }]])
  }
  return rows
}

/**
 * Lo studio come elenco stretto (sta anche nell'anteprima affiancata): il titolo in grassetto con
 * l'informazione accanto, se è corta; se no il titolo da solo e le informazioni sotto, una per riga.
 */
export function studyTable(rows: [string, FormattedResult[]][]): FormattedResult {
  const lines: string[] = []
  for (const [title, items] of rows) {
    const head = `\\textbf{${title}:}`
    if (items.length === 1 && title.length + items[0].text.length <= 34) lines.push(`${head}\\ ${items[0].tex}`)
    else lines.push(head, ...items.map((r) => `\\quad ${r.tex}`))
  }
  return {
    tex: `\\begin{array}{l} ${lines.join(' \\\\ ')} \\end{array}`,
    // Le righe che continuano la precedente (∨ x > 1) senza il punto e virgola.
    text: rows.map(([title, items]) => `${title}: ${items.map((r, i) => (i ? (r.text.startsWith('∨') ? ' ' : '; ') : '') + r.text).join('')}`).join('. '),
    rich: true,
  }
}

/** Il risultato di \operatorname{dominio}, \operatorname{asintoti}, \operatorname{estremi}, \operatorname{flessi}, \operatorname{zeri}. */
export function studyPart(s: Study, part: string, options: FormatOptions): FormattedResult | null {
  const x = s.v
  switch (part) {
    case 'domain':
      return spansText(s.domain, x)
    case 'asymptotes':
      return list(s.asymptotes.map((a) => ({ tex: `${a.tex}\\ \\text{${a.kind === 'vertical' ? 'verticale' : a.kind === 'horizontal' ? 'orizzontale' : 'obliquo'}}`, text: `${a.text} ${a.kind === 'vertical' ? 'verticale' : a.kind === 'horizontal' ? 'orizzontale' : 'obliquo'}` })), 'nessuno')
    case 'extrema':
      return list(s.extrema.map((e) => ({ tex: `\\text{${e.kind === 'max' ? 'massimo' : 'minimo'} } ${pointText(e).tex}`, text: `${e.kind === 'max' ? 'massimo' : 'minimo'} ${pointText(e).text}` })), 'nessuno')
    case 'flexes':
      return list(s.flexes.map(pointText), 'nessuno')
    case 'zeros':
      return s.zeros.length ? { tex: s.zeros.map((z) => `${nameLatex(x)} = ${z.tex}`).join(' \\lor '), text: s.zeros.map((z) => `${x} = ${z.text}`).join(' ∨ ') } : { tex: '\\text{nessuno}', text: 'nessuno' }
  }
  void options
  return null
}
