/**
 * Le equazioni differenziali risolte con la formula, come a lezione: si scrivono con ⇒ alla fine
 * (`$y'' + y = 0 \Rightarrow$` dà y = c₁ cos x + c₂ sin x). Si riconoscono le lineari a coefficienti
 * costanti (con le radici del polinomio caratteristico e la soluzione particolare con il metodo di
 * somiglianza, o con la variazione delle costanti), quelle di Eulero, le lineari del primo ordine (con
 * il fattore integrante), quelle a variabili separabili e di Bernoulli, e i sistemi lineari di due
 * equazioni (per eliminazione). Con le condizioni dopo l'equazione (y(0) = 1, y'(0) = 0) è il problema
 * di Cauchy; con le condizioni in due punti il problema ai limiti. Ogni soluzione si controlla con i
 * numeri prima di mostrarla.
 */
import { compile, EMPTY_SCOPE, scopeWith, type Compiled } from './evaluate'
import { Rational } from './exact'
import { GaussRational } from './complex'
import type { FormattedResult } from './format'
import { nameLatex, toLatex } from './latex'
import { namesIn, type MathNode } from './parse'
import { factorQ, padd, pmul, pscale, type Poly } from './polynomial'
import { asFraction, linear, polyEx, primitive } from './primitive'
import { add, dependsOn, derive, exOf, expand, fn, mapNode, mul, neg, num, plainText, pow, sub, subst, sym, symbols, tidy, toNode, type Ex, type SymbolScope } from './symbolic'
import { primed, withPrimes } from './differential'

const R = (n: number | bigint, d: number | bigint = 1) => new Rational(BigInt(n), BigInt(d))
const ZERO = R(0)
const ONE = R(1)
const HALF = R(1, 2)
const G1 = GaussRational.real(ONE)

const isZero = (e: Ex) => e.t === 'num' && e.v.sign === 0
const isZeroG = (g: GaussRational) => g.re.sign === 0 && g.im.sign === 0
const inv = (e: Ex) => pow(e, num(-1))
const exp = (e: Ex) => pow(sym('e'), e)

/** y', y'': una funzione cercata con i suoi apici. */
const PRIMED = /^([A-Za-z])('+)$/

// ——— La richiesta ———

export interface DifferentialRequest {
  /** Le equazioni (una per funzione cercata), con le derivate come nomi: y', y''. */
  equations: MathNode[]
  /** Le condizioni: y(0) = 1, y'(0) = 0, y(π) = 0. */
  conditions: MathNode[]
  /** Le funzioni cercate (y; in un sistema x e y) e la variabile (x, o t). */
  unknowns: string[]
  x: string
}

/** Le parti di una richiesta, anche le righe di \begin{cases}. */
function pieces(nodes: MathNode[]): MathNode[] {
  return nodes.flatMap((n) => (n.k === 'cases' && n.rows.every((r) => !r.cond) ? n.rows.map((r) => r.value) : n.k === 'and' ? n.items : [n]))
}

/**
 * Un'equazione differenziale (o un sistema) con le sue condizioni, da risolvere con la formula; null
 * se la richiesta è altro. `isDefined`: le funzioni della nota (\frac{df}{dx} con f definita resta una derivata).
 */
export function differentialRequest(nodes: MathNode[], isDefined: (name: string) => boolean): DifferentialRequest | null {
  let x: string | null = null
  const written = pieces(nodes).map((n) => {
    const w = withPrimes(n, isDefined, true)
    x ??= w.x
    return w.node
  })
  const equations: MathNode[] = []
  const conditions: MathNode[] = []
  const unknowns: string[] = []
  for (const n of written) {
    if (n.k !== 'rel' || n.ops.length !== 1 || n.ops[0] !== '=') return null
    const [lhs, rhs] = n.items
    const letters = [...namesIn(n)].map((name) => PRIMED.exec(name)?.[1]).filter((l): l is string => !!l)
    if (lhs.k === 'apply' && lhs.args.length === 1 && !letters.length) {
      conditions.push(n)
      continue
    }
    if (!letters.length || rhs.k === 'tuple' || lhs.k === 'tuple') return null
    for (const l of letters) if (!unknowns.includes(l)) unknowns.push(l)
    equations.push(n)
  }
  if (!equations.length || equations.length !== unknowns.length || unknowns.length > 2) return null
  if (conditions.some((c) => !unknowns.includes(((c as Extract<MathNode, { k: 'rel' }>).items[0] as Extract<MathNode, { k: 'apply' }>).name))) return null
  const names = new Set(equations.flatMap((e) => [...namesIn(e)]))
  const variable = x ?? (unknowns.includes('x') || (names.has('t') && !names.has('x')) ? 't' : 'x')
  if (unknowns.includes(variable)) return null
  return { equations, conditions, unknowns, x: variable }
}

// ——— Le famiglie di soluzioni ———

/** Un gruppo di termini c_k · f_k con un fattore comune (e^{αx} con le radici complesse), o senza. */
interface Group {
  outer: Ex | null
  /** Le funzioni intere (con il fattore comune) e le loro costanti. */
  terms: { c: string; f: Ex }[]
}

/** Una funzione cercata lineare nelle costanti: i gruppi e la parte senza costanti. */
interface Shape {
  groups: Group[]
  particular: Ex
}

interface Family {
  names: string[]
  x: string
  constants: string[]
  /** Il valore di ogni funzione, con le costanti come lettere (vuoto se resta la forma implicita). */
  values: Ex[]
  /** Come si mostra ogni funzione, se la famiglia è lineare nelle costanti. */
  shapes: Shape[] | null
  /** y = ±(…): nei valori c'è il segno più. */
  pm: boolean
  /** Le soluzioni costanti che la formula non dà (y = 0 per y' = y²). */
  singular: Ex[]
  /** G(y) = F(x) + c (le separabili): per le condizioni, e da mostrare se y non si sa esplicitare. */
  implicit: { G: Ex; F: Ex } | null
}

const constantNames = (n: number): string[] => (n === 1 ? ['c'] : Array.from({ length: n }, (_, k) => `c_${k + 1}`))

function shapeValue(s: Shape): Ex {
  return add(...s.groups.flatMap((g) => g.terms.map((t) => mul(sym(t.c), t.f))), s.particular)
}

function linearFamily(names: string[], x: string, constants: string[], shapes: Shape[]): Family {
  return { names, x, constants, values: shapes.map(shapeValue), shapes, pm: false, singular: [], implicit: null }
}

// ——— I numeri, per controllare ———

const SAMPLES = [0.37, 0.83, 1.37, 2.13, -0.43, -1.21, 3.7, 0.13, -2.9, 5.3, 0.61, -0.07, 2.9, -4.6]

/** Le lettere libere di un'espressione, tranne quelle date (e π, e). */
function freeLetters(xs: Ex[], except: string[]): string[] {
  const out: string[] = []
  for (const x of xs) for (const s of symbols(x)) if (!except.includes(s) && s !== 'π' && s !== 'e' && !out.includes(s)) out.push(s)
  return out
}

function compiled(e: Ex, vars: string[]): Compiled | null {
  try {
    return compile(toNode(e), scopeWith(EMPTY_SCOPE, vars))
  } catch {
    return null
  }
}

/** Il valore di un'espressione senza lettere (NaN se ne ha, o se non esiste). */
function valueOf(e: Ex): number {
  if (e.t === 'num') return e.v.toNumber()
  const f = compiled(e, [])
  if (!f) return NaN
  try {
    return f({})
  } catch {
    return NaN
  }
}

/** Il valore con le lettere libere (i parametri) a numeri fissi: per sapere se un'espressione è zero. */
function probe(e: Ex): number {
  if (e.t === 'num') return e.v.toNumber()
  const letters = freeLetters([e], [])
  const f = compiled(e, letters)
  if (!f) return NaN
  const point: Record<string, number> = {}
  letters.forEach((n, k) => (point[n] = 0.73 + 0.29 * k))
  try {
    return f(point)
  } catch {
    return NaN
  }
}

/** Le due espressioni sono la stessa funzione delle lettere `vars`? Con i numeri, in alcuni punti. */
function sameFunction(a: Ex, b: Ex, vars: string[]): boolean {
  const others = freeLetters([a, b], vars)
  const fa = compiled(a, [...vars, ...others])
  const fb = compiled(b, [...vars, ...others])
  if (!fa || !fb) return false
  let good = 0
  for (let i = 0; i < SAMPLES.length; i++) {
    const point: Record<string, number> = {}
    vars.forEach((v, k) => (point[v] = SAMPLES[(i + 3 * k) % SAMPLES.length]))
    others.forEach((v, k) => (point[v] = 0.7 + 0.31 * k))
    const p = fa(point)
    const q = fb(point)
    if (!Number.isFinite(p) || !Number.isFinite(q)) continue
    if (Math.abs(p - q) > 1e-8 * Math.max(1, Math.abs(q))) return false
    good++
  }
  return good >= 3
}

/**
 * La famiglia risolve le equazioni `F` (sinistra − destra, con y, y', …)? Con i numeri: le derivate dei
 * valori in alcuni punti, con le costanti a caso.
 */
function satisfies(F: Ex[], family: Family): boolean {
  const { names, x, values } = family
  if (!values.length) return true
  const letters = F.flatMap((f) => symbols(f))
  const order = (u: string) => Math.max(0, ...letters.map((s) => PRIMED.exec(s)).map((m) => (m && m[1] === u ? m[2].length : 0)))
  const unknownNames = names.flatMap((u) => Array.from({ length: order(u) + 1 }, (_, k) => primed(u, k)))
  const others = freeLetters([...F, ...values], [x, ...unknownNames])
  const vars = [x, ...others]
  const derivatives: { name: string; f: Compiled }[] = []
  try {
    names.forEach((u, i) => {
      let d = values[i]
      for (let k = 0; k <= order(u); k++) {
        if (k) d = derive(d, x)
        const f = compiled(d, vars)
        if (!f) throw new Error()
        derivatives.push({ name: primed(u, k), f })
      }
    })
  } catch {
    return false
  }
  const residuals = F.map((f) => compiled(f, [...vars, ...unknownNames]))
  if (residuals.some((r) => !r)) return false
  // Una soluzione può valere solo in una parte (y = (x/2 + c)² per y' = √y vale dove x/2 + c ≥ 0):
  // basta che torni nella maggior parte dei punti; una formula sbagliata non torna quasi mai.
  let good = 0
  let bad = 0
  SAMPLES.forEach((t, trial) => {
    const point: Record<string, number> = {}
    others.forEach((c, k) => (point[c] = 0.7 + 0.31 * k - 0.2 * (trial % 3)))
    point[x] = t
    let scale = 1
    for (const d of derivatives) {
      const v = d.f(point)
      if (!Number.isFinite(v)) return
      point[d.name] = v
      scale = Math.max(scale, Math.abs(v))
    }
    for (const r of residuals) {
      const v = r!(point)
      if (!Number.isFinite(v)) return
      if (Math.abs(v) > 1e-6 * scale) {
        bad++
        return
      }
    }
    good++
  })
  return good >= 3 && bad * 2 <= good
}

// ——— Le lineari a coefficienti costanti ———

/** Una radice del polinomio caratteristico: reale (`im` null) o la coppia α ± iβ, con la molteplicità. */
interface Root {
  re: Ex
  im: Ex | null
  value: number
  m: number
}

/** √d/2 (d > 0), con le radici semplificate. */
const halfRoot = (d: Rational) => mul(num(HALF), pow(num(d), num(HALF)))

/** Le radici del polinomio caratteristico (fattori di primo e secondo grado); null se resta altro. */
function characteristicRoots(p: Poly): Root[] | null {
  const roots: Root[] = []
  for (const f of factorQ(p).factors) {
    if (f.p.length === 2) {
      const r = f.p[0].neg().div(f.p[1])
      roots.push({ re: num(r), im: null, value: r.toNumber(), m: f.m })
    } else if (f.p.length === 3) {
      // λ² + sλ + q: (−s ± √Δ)/2.
      const [q, s] = f.p
      const delta = s.mul(s).sub(q.mul(R(4)))
      const center = s.neg().div(R(2))
      if (delta.sign > 0) {
        const h = halfRoot(delta)
        const hv = Math.sqrt(delta.toNumber()) / 2
        roots.push({ re: add(num(center), neg(h)), im: null, value: center.toNumber() - hv, m: f.m })
        roots.push({ re: add(num(center), h), im: null, value: center.toNumber() + hv, m: f.m })
      } else roots.push({ re: num(center), im: halfRoot(delta.neg()), value: center.toNumber(), m: f.m })
    } else return null
  }
  // Le reali dalla più piccola in valore assoluto (c₁ + c₂e^{−x}; c₁eˣ + c₂e^{−x}), poi le complesse.
  return roots.sort((a, b) => (a.im ? 1 : 0) - (b.im ? 1 : 0) || Math.abs(a.value) - Math.abs(b.value) || b.value - a.value)
}

/**
 * Le soluzioni dell'equazione omogenea, con le costanti: x^j e^{rx} per le radici reali, e^{αx}(x^j cos βx,
 * x^j sin βx) per le complesse. Per le equazioni di Eulero (`euler`) x^r, ln x e cos(β ln x).
 */
function homogeneousGroups(roots: Root[], x: string, constants: string[], euler: boolean): Group[] {
  const X = sym(x)
  const L = euler ? fn('ln', [X]) : X
  const power = (r: Ex) => (isZero(r) ? num(1) : euler ? pow(X, r) : exp(mul(r, X)))
  const groups: Group[] = []
  let k = 0
  for (const root of roots) {
    if (!root.im) {
      for (let j = 0; j < root.m; j++) groups.push({ outer: null, terms: [{ c: constants[k++], f: mul(pow(L, num(j)), power(root.re)) }] })
      continue
    }
    const outer = isZero(root.re) ? null : power(root.re)
    const arg = mul(root.im, L)
    const terms: Group['terms'] = []
    for (let j = 0; j < root.m; j++) {
      const front = mul(outer ?? num(1), pow(L, num(j)))
      terms.push({ c: constants[k++], f: mul(front, fn('cos', [arg])) }, { c: constants[k++], f: mul(front, fn('sin', [arg])) })
    }
    groups.push({ outer, terms })
  }
  return groups
}

const factorial = (n: number): Rational => {
  let r = 1n
  for (let i = 2n; i <= BigInt(n); i++) r *= i
  return new Rational(r)
}

/** Il secondo membro come somma di x^k e^{(α + iβ)x} con i coefficienti complessi (i seni e i coseni sono due esponenziali). */
interface Wave {
  alpha: Rational
  beta: Rational
  k: number
  c: GaussRational
}
type Waves = Map<string, Wave>

function addWave(m: Waves, w: Wave): void {
  const key = `${w.alpha.n}/${w.alpha.d}|${w.beta.n}/${w.beta.d}|${w.k}`
  const old = m.get(key)
  const c = old ? old.c.add(w.c) : w.c
  if (isZeroG(c)) m.delete(key)
  else m.set(key, { ...w, c })
}

function waves(list: Wave[]): Waves {
  const out: Waves = new Map()
  for (const w of list) addWave(out, w)
  return out
}

function wavesProduct(a: Waves, b: Waves): Waves {
  const out: Waves = new Map()
  for (const p of a.values()) for (const q of b.values()) addWave(out, { alpha: p.alpha.add(q.alpha), beta: p.beta.add(q.beta), k: p.k + q.k, c: p.c.mul(q.c) })
  return out
}

/** b se `e` è b·x (b una frazione); null se è altro. */
function slope(e: Ex, x: string): Rational | null {
  if (e.t === 'sym' && e.name === x) return ONE
  if (e.t === 'mul' && e.factors.length === 1 && e.factors[0].t === 'sym' && e.factors[0].name === x) return e.c
  return null
}

/** Un fattore come somma di esponenziali complesse: x^k, e^{ax}, cos bx, sin bx, cosh, sinh; null se è altro. */
function waveOf(f: Ex, x: string): Waves | null {
  const wave = (alpha: Rational, beta: Rational, k: number, c: GaussRational): Wave => ({ alpha, beta, k, c })
  if (f.t === 'sym' && f.name === x) return waves([wave(ZERO, ZERO, 1, G1)])
  if (f.t === 'pow' && f.base.t === 'sym' && f.base.name === 'e') {
    const a = slope(f.exp, x)
    return a && waves([wave(a, ZERO, 0, G1)])
  }
  if (f.t === 'pow' && f.exp.t === 'num' && f.exp.v.isInteger && f.exp.v.sign > 0 && f.exp.v.n <= 12n) {
    if (f.base.t === 'sym' && f.base.name === x) return waves([wave(ZERO, ZERO, Number(f.exp.v.n), G1)])
    const base = waveOf(f.base, x)
    if (!base) return null
    let out = base
    for (let i = 1n; i < f.exp.v.n; i++) out = wavesProduct(out, base)
    return out
  }
  if (f.t === 'fn' && f.args.length === 1) {
    const b = slope(f.args[0], x)
    if (!b) return null
    const h = GaussRational.real(HALF)
    const ih = new GaussRational(ZERO, HALF)
    switch (f.name) {
      case 'cos':
        return waves([wave(ZERO, b, 0, h), wave(ZERO, b.neg(), 0, h)])
      case 'sin':
        return waves([wave(ZERO, b, 0, ih.neg()), wave(ZERO, b.neg(), 0, ih)])
      case 'cosh':
        return waves([wave(b, ZERO, 0, h), wave(b.neg(), ZERO, 0, h)])
      case 'sinh':
        return waves([wave(b, ZERO, 0, h), wave(b.neg(), ZERO, 0, h.neg())])
    }
  }
  return null
}

/** Un termine del secondo membro come K · (esponenziali complesse), con K senza x; null se è altro. */
function termWaves(t: Ex, x: string): { K: Ex; W: Waves } | null {
  let K: Ex = num(t.t === 'mul' ? t.c : ONE)
  let W = waves([{ alpha: ZERO, beta: ZERO, k: 0, c: G1 }])
  for (let f of t.t === 'mul' ? t.factors : [t]) {
    if (!dependsOn(f, x)) {
      K = mul(K, f)
      continue
    }
    // e^{2x + 1} = e · e^{2x}
    if (f.t === 'pow' && f.base.t === 'sym' && f.base.name === 'e' && f.exp.t === 'add') {
      const rest = f.exp.terms.filter((u) => !dependsOn(u, x))
      if (rest.length) {
        K = mul(K, exp(add(...rest)))
        f = exp(add(...f.exp.terms.filter((u) => dependsOn(u, x))))
      }
    }
    const w = waveOf(f, x)
    if (!w) return null
    W = wavesProduct(W, w)
  }
  return { K, W }
}

/**
 * Il metodo di somiglianza per L[y] = x^k e^{μx} (L con i coefficienti `a`): y = x^s e^{μx} Q(x), con s la
 * molteplicità di μ come radice e Q di grado k. Restituisce s e i coefficienti di Q.
 */
function similar(a: Rational[], mu: GaussRational, k: number): { s: number; q: GaussRational[] } | null {
  const n = a.length - 1
  // P_j = p^{(j)}(μ)/j!: L[e^{μx} u] = e^{μx} Σ P_j u^{(j)}.
  const P: GaussRational[] = []
  for (let j = 0; j <= n; j++) {
    let s = GaussRational.real(ZERO)
    for (let m = j; m <= n; m++) s = s.add(GaussRational.real(a[m].mul(factorial(m).div(factorial(j).mul(factorial(m - j))))).mul(mu.powInt(BigInt(m - j))))
    P.push(s)
  }
  const s = P.findIndex((c) => !isZeroG(c))
  if (s < 0) return null
  // u = Σ q_i x^{s+i}: il coefficiente di x^d in L_μ[x^{s+i}] è P_{s+i−d} (s+i)!/d!; dal grado più alto.
  const q: GaussRational[] = Array.from({ length: k + 1 }, () => GaussRational.real(ZERO))
  for (let d = k; d >= 0; d--) {
    let rhs = d === k ? G1 : GaussRational.real(ZERO)
    for (let i = d + 1; i <= k; i++) {
      const j = s + i - d
      if (j < P.length) rhs = rhs.sub(q[i].mul(P[j]).mul(GaussRational.real(factorial(s + i).div(factorial(d)))))
    }
    q[d] = rhs.div(P[s].mul(GaussRational.real(factorial(s + d).div(factorial(d)))))
  }
  return { s, q }
}

/** La soluzione particolare per una somma di esponenziali complesse (con i seni e i coseni di nuovo reali). */
function similarSolution(a: Rational[], W: Waves, x: string): Ex | null {
  const X = sym(x)
  const parts: Ex[] = []
  for (const w of W.values()) {
    // Con un secondo membro reale ogni e^{(α+iβ)x} ha la sua coniugata: si prende due volte la parte reale.
    if (w.beta.sign < 0) continue
    const sol = similar(a, new GaussRational(w.alpha, w.beta), w.k)
    if (!sol) return null
    const Rq = sol.q.map((q) => q.mul(w.c))
    // x^s Q(x) tutto sviluppato: (x²/4 − x/4) eˣ, non x(x/4 − 1/4) eˣ.
    const re = expand(mul(pow(X, num(sol.s)), polyEx(Rq.map((r) => r.re), x)))
    const im = expand(mul(pow(X, num(sol.s)), polyEx(Rq.map((r) => r.im), x)))
    const front = w.alpha.sign ? exp(mul(num(w.alpha), X)) : num(1)
    if (w.beta.sign === 0) parts.push(mul(front, re))
    else {
      const arg = mul(num(w.beta), X)
      parts.push(mul(num(2), front, sub(mul(re, fn('cos', [arg])), mul(im, fn('sin', [arg])))))
    }
  }
  return add(...parts)
}

/** Il wronskiano di due funzioni nel punto x₀. */
function wronskianAt(phi: Ex[], x: string, x0: Ex): Ex {
  const [f, g] = phi
  return tidy(subst(sub(mul(f, derive(g, x)), mul(derive(f, x), g)), x, x0))
}

/** La variazione delle costanti (secondo ordine): y_p = −φ₁ ∫ φ₂ r/(a₂W) + φ₂ ∫ φ₁ r/(a₂W). */
function variation(phi: Ex[], W: Ex, a2: Ex, r: Ex, x: string): Ex | null {
  const den = inv(mul(a2, W))
  const I1 = primitive(tidy(mul(num(-1), phi[1], r, den)), x)
  const I2 = I1 && primitive(tidy(mul(phi[0], r, den)), x)
  if (!I1 || !I2) return null
  return add(mul(phi[0], I1), mul(phi[1], I2))
}

/** La soluzione particolare con i coefficienti costanti: la somiglianza per i termini che si prestano, se no la variazione delle costanti. */
function constantParticular(a: Rational[], g: Ex, x: string, basis: Ex[]): Ex | null {
  if (isZero(g)) return num(0)
  const expanded = expand(g)
  const parts: Ex[] = []
  const rest: Ex[] = []
  for (const t of expanded.t === 'add' ? expanded.terms : [expanded]) {
    const tw = termWaves(t, x)
    const y = tw && similarSolution(a, tw.W, x)
    if (tw && y) parts.push(expand(mul(tw.K, y)))
    else rest.push(t)
  }
  if (rest.length) {
    if (a.length !== 3) return null
    // Il wronskiano con Abel: W(x) = W(0) e^{−(a₁/a₂)x}.
    const W0 = wronskianAt(basis, x, num(0))
    if (isZero(W0)) return null
    const W = mul(W0, exp(mul(num(a[1].div(a[2]).neg()), sym(x))))
    const v = variation(basis, W, num(a[2]), add(...rest), x)
    if (!v) return null
    parts.push(v)
  }
  return add(...parts)
}

// ——— Le lineari ———

/** e^P con i logaritmi semplificati e senza i valori assoluti: e^{ln|x|} = x (il segno va nella costante). */
function expOf(P: Ex): Ex {
  const factors: Ex[] = []
  const rest: Ex[] = []
  for (const t of P.t === 'add' ? P.terms : [P]) {
    const c = t.t === 'mul' && t.factors.length === 1 ? t.c : t.t === 'fn' ? ONE : null
    const f = t.t === 'mul' && t.factors.length === 1 ? t.factors[0] : t
    if (c && f.t === 'fn' && f.name === 'ln') factors.push(pow(unAbs(f.args[0]), num(c)))
    else rest.push(t)
  }
  return mul(...factors, rest.length ? exp(add(...rest)) : num(1))
}

/** L'argomento senza il valore assoluto: |x| → x. */
const unAbs = (e: Ex): Ex => (e.t === 'fn' && e.name === 'abs' ? e.args[0] : e)

/** a₁ y' + a₀ y = g con il fattore integrante: y = c/μ + (1/μ) ∫ g μ/a₁, con μ = e^{∫a₀/a₁}. */
function firstOrderShape(a1: Ex, a0: Ex, g: Ex, x: string, c: string): Shape | null {
  const p = tidy(mul(a0, inv(a1)))
  const q = tidy(mul(g, inv(a1)))
  const P = isZero(p) ? num(0) : primitive(p, x)
  if (!P) return null
  const mu = expOf(P)
  const h = tidy(inv(mu))
  let particular: Ex = num(0)
  if (!isZero(q)) {
    const I = primitive(tidy(mul(q, mu)), x)
    if (!I) return null
    particular = tidy(mul(h, I))
  }
  return { groups: [{ outer: null, terms: [{ c, f: h }] }], particular }
}

/** a_n y^{(n)} + … + a₀ y = g: la soluzione generale come combinazione delle costanti. */
function linearShape(a: Ex[], g: Ex, x: string, constants: string[]): Shape | null {
  const n = a.length - 1
  const X = sym(x)
  if (a.every((c) => c.t === 'num')) {
    const p = a.map((c) => (c as Extract<Ex, { t: 'num' }>).v)
    const roots = characteristicRoots(p)
    if (!roots) return null
    const groups = homogeneousGroups(roots, x, constants, false)
    const particular = constantParticular(p, g, x, groups.flatMap((gr) => gr.terms.map((t) => t.f)))
    return particular && { groups, particular: tidy(particular) }
  }
  // y'' + ω² y = g con ω una lettera (l'oscillatore armonico): cos ωx e sin ωx (con −ω²: e^{±ωx}).
  if (n === 2 && isZero(a[1]) && !dependsOn(a[0], x) && !dependsOn(a[2], x)) {
    const w = squareRoot(tidy(mul(a[0], inv(a[2]))))
    if (w) {
      const arg = mul(w.root, X)
      const fns = w.sign > 0 ? [fn('cos', [arg]), fn('sin', [arg])] : [exp(arg), exp(neg(arg))]
      let particular: Ex = num(0)
      if (!isZero(g)) {
        // Senza y' il wronskiano è costante.
        const v = variation(fns, wronskianAt(fns, x, num(0)), a[2], g, x)
        if (!v) return null
        particular = v
      }
      return { groups: fns.map((f, k) => ({ outer: null, terms: [{ c: constants[k], f }] })), particular: tidy(particular) }
    }
  }
  // Di Eulero: a_k = c_k x^k, con y = x^r.
  const euler = a.map((c, k) => tidy(mul(c, pow(X, num(-k)))))
  if (n >= 2 && euler.every((c) => c.t === 'num')) {
    const c = euler.map((e) => (e as Extract<Ex, { t: 'num' }>).v)
    let p: Poly = []
    let falling: Poly = [ONE]
    for (let k = 0; k <= n; k++) {
      p = padd(p, pscale(falling, c[k]))
      falling = pmul(falling, [R(-k), ONE])
    }
    const roots = characteristicRoots(p)
    if (!roots) return null
    const groups = homogeneousGroups(roots, x, constants, true)
    let particular: Ex = num(0)
    if (!isZero(g)) {
      if (n !== 2) return null
      const basis = groups.flatMap((gr) => gr.terms.map((t) => t.f))
      // Abel: W(x) = W(1) x^{−c₁/c₂}.
      const W1 = wronskianAt(basis, x, num(1))
      if (isZero(W1)) return null
      const v = variation(basis, mul(W1, pow(X, num(c[1].div(c[2]).neg()))), a[2], g, x)
      if (!v) return null
      particular = v
    }
    return { groups, particular: tidy(particular) }
  }
  if (n === 1) return firstOrderShape(a[1], a[0], g, x, constants[0])
  // Senza la y (x y'' + y' = 0): con z = y' è del primo ordine, poi si integra.
  if (n === 2 && isZero(a[0])) {
    const z = firstOrderShape(a[2], a[1], g, x, constants[0])
    if (!z) return null
    const H = primitive(z.groups[0].terms[0].f, x)
    const Zp = isZero(z.particular) ? num(0) : primitive(z.particular, x)
    if (!H || !Zp) return null
    return {
      groups: [
        { outer: null, terms: [{ c: constants[0], f: tidy(H) }] },
        { outer: null, terms: [{ c: constants[1], f: num(1) }] },
      ],
      particular: tidy(Zp),
    }
  }
  return null
}

/**
 * r = ±m² con le lettere (ω², 4k², k/m): m e il segno, con le lettere positive come nei libri
 * (√(k/m) per m x'' + k x = 0); null se r non è un prodotto di lettere.
 */
function squareRoot(r: Ex): { root: Ex; sign: number } | null {
  const c = r.t === 'mul' ? r.c : ONE
  const factors = r.t === 'mul' ? r.factors : r.t === 'pow' || r.t === 'sym' ? [r] : []
  if (!factors.length || c.sign === 0) return null
  const base = (f: Ex) => (f.t === 'pow' ? f.base : f)
  if (factors.some((f) => base(f).t !== 'sym' || (f.t === 'pow' && (f.exp.t !== 'num' || !f.exp.v.isInteger)))) return null
  const size = mul(num(c.abs()), ...factors)
  // Tutti quadrati (ω², 4k²): la radice si scrive senza √.
  const even = factors.every((f) => f.t === 'pow' && f.exp.t === 'num' && f.exp.v.n % 2n === 0n)
  const root = even ? mul(pow(num(c.abs()), num(HALF)), ...factors.map((f) => pow(base(f), num((f as Extract<Ex, { t: 'pow' }>).exp.t === 'num' ? ((f as Extract<Ex, { t: 'pow' }>).exp as Extract<Ex, { t: 'num' }>).v.div(R(2)) : ONE)))) : { t: 'pow' as const, base: size, exp: num(HALF) }
  return { root, sign: c.sign }
}

/** F = Σ a_k y^{(k)} − g, se F è lineare in y, y', …; null se no. */
function linearParts(F: Ex, Y: string[]): { a: Ex[]; g: Ex } | null {
  const a: Ex[] = []
  for (const v of Y) {
    let d: Ex
    try {
      d = tidy(derive(F, v))
    } catch {
      return null
    }
    if (Y.some((w) => dependsOn(d, w))) return null
    a.push(d)
  }
  if (isZero(a[a.length - 1])) return null
  let rest = F
  for (const v of Y) rest = subst(rest, v, num(0))
  return { a, g: tidy(neg(rest)) }
}

// ——— Le separabili e quelle di Bernoulli ———

/** e^{a + b} come e^a e^b, per separare le variabili. */
const splitExp = (f: Ex): Ex[] => (f.t === 'pow' && f.base.t === 'sym' && f.base.name === 'e' && f.exp.t === 'add' ? f.exp.terms.map(exp) : [f])

/** h(x, y) = f(x) g(y), se si può; null se no. */
function separate(h: Ex, x: string, y: string): { f: Ex; g: Ex } | null {
  const fx: Ex[] = [num(h.t === 'mul' ? h.c : ONE)]
  const gy: Ex[] = []
  let mixed = false
  for (const f of (h.t === 'mul' ? h.factors : h.t === 'num' ? [] : [h]).flatMap(splitExp)) {
    if (dependsOn(f, y) && dependsOn(f, x)) mixed = true
    else if (dependsOn(f, y)) gy.push(f)
    else fx.push(f)
  }
  if (h.t === 'num') return { f: h, g: num(1) }
  if (!mixed) return { f: tidy(mul(...fx)), g: tidy(mul(...gy)) }
  // Con i numeri: h(x, y) = h(x, y₀) h(x₀, y)/h(x₀, y₀).
  for (const x0 of [1, 0, 2, -1]) {
    for (const y0 of [1, 0, 2, -1]) {
      const k = subst(subst(h, x, num(x0)), y, num(y0))
      const kv = valueOf(k)
      if (!Number.isFinite(kv) || Math.abs(kv) < 1e-9) continue
      const f = tidy(subst(h, y, num(y0)))
      const g = tidy(mul(subst(h, x, num(x0)), inv(k)))
      return sameFunction(mul(f, g), h, [x, y]) ? { f, g } : null
    }
  }
  return null
}

/** Le radici di g(y) (le soluzioni costanti), se g è una funzione razionale con le frazioni. */
function constantRoots(g: Ex, y: string): Ex[] {
  const frac = asFraction(g, y)
  if (!frac || !frac.N.length) return []
  const out: { e: Ex; v: number }[] = []
  for (const f of factorQ(frac.N).factors) {
    if (f.p.length === 2) {
      const r = f.p[0].neg().div(f.p[1])
      out.push({ e: num(r), v: r.toNumber() })
    } else if (f.p.length === 3) {
      const [q, s] = f.p
      const delta = s.mul(s).sub(q.mul(R(4)))
      if (delta.sign <= 0) continue
      const center = s.neg().div(R(2))
      const h = halfRoot(delta)
      out.push({ e: add(num(center), neg(h)), v: center.toNumber() - Math.sqrt(delta.toNumber()) / 2 })
      out.push({ e: add(num(center), h), v: center.toNumber() + Math.sqrt(delta.toNumber()) / 2 })
    }
  }
  return out.sort((a, b) => a.v - b.v).map((r) => r.e)
}

/** Il coefficiente e il logaritmo di un termine A ln|w|; null se è altro. */
function logPart(t: Ex): { A: Rational; arg: Ex } | null {
  const A = t.t === 'mul' && t.factors.length === 1 ? t.c : ONE
  const f = t.t === 'mul' && t.factors.length === 1 ? t.factors[0] : t
  return f.t === 'fn' && f.name === 'ln' ? { A, arg: unAbs(f.args[0]) } : null
}

/** w = (a₁y + b₁)/(a₂y + b₂), con a₁ e a₂ non nulli; null se è altro. */
function mobius(w: Ex, y: string): { r1: Ex; r2: Ex } | null {
  const top: Ex[] = [num(w.t === 'mul' ? w.c : ONE)]
  const bottom: Ex[] = []
  for (const f of w.t === 'mul' ? w.factors : [w]) {
    if (f.t === 'pow' && f.exp.t === 'num' && f.exp.v.sign < 0) bottom.push(pow(f.base, num(f.exp.v.neg())))
    else top.push(f)
  }
  const N = linear(tidy(mul(...top)), y)
  const D = linear(tidy(mul(...bottom)), y)
  if (!N || !D) return null
  return { r1: tidy(neg(mul(N.b, inv(N.a)))), r2: tidy(neg(mul(D.b, inv(D.a)))) }
}

/** L'inversa di una funzione elementare: tan → arctan… */
const INVERSE: Record<string, string> = { arctan: 'tan', arcsin: 'sin', arccos: 'cos', tan: 'arctan', sin: 'arcsin', artanh: 'tanh', arsinh: 'sinh', tanh: 'artanh', sinh: 'arsinh' }

/**
 * y da G(y) = F(x) + c, nelle forme dei libri (la costante cambia nome quando si moltiplica o si fa
 * l'esponenziale: ln|y| = x + c dà y = c eˣ); null se non si sa, e resta la forma implicita.
 */
function invert(G: Ex, F: Ex, y: string): { value: Ex; pm: boolean } | null {
  const c = sym('c')
  const terms = (G.t === 'add' ? G.terms : [G]).filter((t) => dependsOn(t, y))
  let A: Rational
  let u: Ex
  if (terms.length === 2) {
    // ln|y| − ln|y − 1| = ln|y/(y − 1)| (la logistica).
    const [p, q] = terms.map(logPart)
    if (!p || !q || p.A.add(q.A).sign !== 0) return null
    A = p.A
    u = fn('ln', [mul(p.arg, inv(q.arg))])
  } else if (terms.length === 1) {
    const t = terms[0]
    A = t.t === 'mul' ? t.c : ONE
    u = t.t === 'mul' ? mul(...t.factors) : t
  } else return null
  const T = tidy(mul(num(ONE.div(A)), F))
  const plus = add(T, c)
  // w(y) = value: con w lineare (a y + b) o fatta di funzioni che si invertono (ln y, e^y, √y).
  const solved = (w: Ex, value: Ex): Ex | null => {
    const lin = linear(w, y)
    return lin ? sub(mul(value, inv(lin.a)), mul(lin.b, inv(lin.a))) : solveFor(w, value, y)
  }
  if (u.t === 'fn' && u.name === 'ln') {
    const w = unAbs(u.args[0])
    const E = expOf(T)
    const lin = linear(w, y)
    // |a y + b| = C e^T: y = c e^T − b/a.
    if (lin) return { value: sub(mul(c, E), mul(lin.b, inv(lin.a))), pm: false }
    // ln|ln y| = x + c: ln y = c eˣ, y = e^{c eˣ}.
    const inner = !mobius(w, y) && solveFor(w, mul(c, E), y)
    if (inner) return { value: inner, pm: false }
    // (y − r₁)/(y − r₂) = C e^T: y = r₂ + (r₁ − r₂)/(1 + c e^T), o anche r₁ + (r₂ − r₁)/(1 + c e^{−T}):
    // quella con lo 0 fuori, come nei libri (la logistica: y = 1/(1 + c e^{−x})).
    const m = mobius(w, y)
    if (!m) return null
    const [r1, r2, e] = isZero(m.r1) ? [m.r2, m.r1, expOf(neg(T))] : [m.r1, m.r2, E]
    return { value: add(r2, mul(sub(r1, r2), inv(add(num(1), mul(c, e))))), pm: false }
  }
  if (u.t === 'pow' && u.exp.t === 'num' && !(u.base.t === 'sym' && u.base.name === 'e')) {
    const n = u.exp.v
    const value = solved(u.base, pow(plus, num(ONE.div(n))))
    return value && { value, pm: n.n % 2n === 0n }
  }
  if (u.t === 'sym' || u.t === 'add') {
    const value = solved(u, plus)
    return value && { value, pm: false }
  }
  if (u.t === 'pow' && u.base.t === 'sym' && u.base.name === 'e') {
    const value = solved(u.exp, fn('ln', [plus]))
    return value && { value, pm: false }
  }
  if (u.t === 'fn' && u.args.length === 1 && INVERSE[u.name]) {
    const value = solved(u.args[0], fn(INVERSE[u.name], [plus]))
    return value && { value, pm: false }
  }
  return null
}

/** y' = h(x, y) = f(x) g(y): ∫ dy/g = ∫ f dx + c, poi y se si sa ricavare. */
function separableFamily(h: Ex, y: string, x: string): Family | null {
  const split = separate(h, x, y)
  if (!split || isZero(split.g) || !dependsOn(split.g, y)) return null
  const G = primitive(tidy(inv(split.g)), y)
  const F = isZero(split.f) ? num(0) : primitive(split.f, x)
  if (!G || !F) return null
  const explicit = invert(G, F, y)
  const singular = constantRoots(split.g, y)
  const family: Family = { names: [y], x, constants: ['c'], values: explicit ? [explicit.value] : [], shapes: null, pm: !!explicit?.pm, singular: [], implicit: { G, F } }
  // Le soluzioni costanti che la formula dà già (con un valore di c) non si ripetono.
  family.singular = singular.filter((r) => {
    if (!explicit) return true
    const s = cauchy(family, [{ i: 0, j: 0, x0: num(R(1, 2)), v: r }])
    return !(s && s !== 'none' && 'values' in s && sameFunction(s.values[0], r, [x]))
  })
  return family
}

/** Le potenze di y nei termini di h: h = Σ coef · y^n; null se y compare in altro modo. */
function yPowers(h: Ex, y: string): Map<string, { n: Rational; coef: Ex }> | null {
  const out = new Map<string, { n: Rational; coef: Ex }>()
  const e = expand(h)
  for (const t of e.t === 'add' ? e.terms : [e]) {
    let n = ZERO
    const rest: Ex[] = [num(t.t === 'mul' ? t.c : ONE)]
    for (const f of t.t === 'mul' ? t.factors : [t]) {
      if (f.t === 'num') rest.push(f)
      else if (f.t === 'sym' && f.name === y) n = n.add(ONE)
      else if (f.t === 'pow' && f.base.t === 'sym' && f.base.name === y && f.exp.t === 'num') n = n.add(f.exp.v)
      else if (dependsOn(f, y)) return null
      else rest.push(f)
    }
    const key = `${n.n}/${n.d}`
    const old = out.get(key)
    out.set(key, { n, coef: add(old?.coef ?? num(0), mul(...rest)) })
  }
  return out
}

/** y' = P y + Q y^n (Bernoulli): con z = y^{1−n} è lineare, z' = (1 − n)(P z + Q). */
function bernoulliFamily(h: Ex, y: string, x: string): Family | null {
  const powers = yPowers(h, y)
  if (!powers || powers.size !== 2 || !powers.has('1/1')) return null
  const other = [...powers.entries()].find(([k]) => k !== '1/1')![1]
  const n = other.n
  if (n.sign === 0) return null
  const m = ONE.sub(n)
  const P = powers.get('1/1')!.coef
  const shape = linearShape([tidy(neg(mul(num(m), P))), num(1)], tidy(mul(num(m), other.coef)), x, ['c'])
  if (!shape) return null
  const value = pow(shapeValue(shape), num(ONE.div(m)))
  return { names: [y], x, constants: ['c'], values: [value], shapes: null, pm: m.n % 2n === 0n, singular: n.sign > 0 ? [num(0)] : [], implicit: null }
}

// ——— Una equazione, un sistema ———

const minus = (n: Extract<MathNode, { k: 'rel' }>): MathNode => ({ k: 'bin', op: '-', a: n.items[0], b: n.items[1] })

/** L'ordine della derivata più alta di `u` nelle equazioni. */
function orderOf(nodes: MathNode[], u: string): number {
  let order = 0
  for (const n of nodes) for (const name of namesIn(n)) {
    const m = PRIMED.exec(name)
    if (m && m[1] === u) order = Math.max(order, m[2].length)
  }
  return order
}

/** La famiglia delle soluzioni di un'equazione (e le equazioni come espressioni, per il controllo). */
function scalarFamily(eq: Extract<MathNode, { k: 'rel' }>, y: string, x: string, scope: SymbolScope): { family: Family; F: Ex[] } | null {
  const order = orderOf([eq], y)
  if (order < 1 || order > 8) return null
  const Y = Array.from({ length: order + 1 }, (_, k) => primed(y, k))
  let F: Ex
  try {
    F = tidy(exOf(minus(eq), scope, [x, ...Y]))
  } catch {
    return null
  }
  const lin = linearParts(F, Y)
  if (lin) {
    const constants = constantNames(order)
    const shape = linearShape(lin.a, lin.g, x, constants)
    return shape && { family: linearFamily([y], x, constants, [shape]), F: [F] }
  }
  if (order !== 1) return null
  // y' = h(x, y): la derivata deve comparire al primo grado.
  const a1 = tidy(derive(F, Y[1]))
  if (dependsOn(a1, Y[1]) || isZero(a1)) return null
  const h = tidy(neg(mul(subst(F, Y[1], num(0)), inv(a1))))
  const family = separableFamily(h, y, x) ?? bernoulliFamily(h, y, x)
  return family && { family, F: [F] }
}

/** Un sistema lineare di due equazioni a coefficienti costanti: X' = A X + f, per eliminazione. */
function systemFamily(eqs: Extract<MathNode, { k: 'rel' }>[], names: string[], t: string, scope: SymbolScope): { family: Family; F: Ex[] } | null {
  if (names.length !== 2 || names.some((u) => orderOf(eqs, u) !== 1)) return null
  const vars = [...names, ...names.map((u) => primed(u, 1))]
  let F: Ex[]
  try {
    F = eqs.map((e) => tidy(exOf(minus(e), scope, [t, ...vars])))
  } catch {
    return null
  }
  // M X' + K X = b(t), con M e K di numeri.
  const coef = (f: Ex, v: string): Rational | null => {
    const d = tidy(derive(f, v))
    return d.t === 'num' ? d.v : null
  }
  const M: Rational[][] = []
  const K: Rational[][] = []
  const b: Ex[] = []
  for (const f of F) {
    const m = names.map((u) => coef(f, primed(u, 1)))
    const k = names.map((u) => coef(f, u))
    if (m.some((v) => !v) || k.some((v) => !v)) return null
    M.push(m as Rational[])
    K.push(k as Rational[])
    let rest = f
    for (const v of vars) rest = subst(rest, v, num(0))
    b.push(tidy(neg(rest)))
  }
  const det = M[0][0].mul(M[1][1]).sub(M[0][1].mul(M[1][0]))
  if (det.sign === 0) return null
  const Minv = [
    [M[1][1].div(det), M[0][1].neg().div(det)],
    [M[1][0].neg().div(det), M[0][0].div(det)],
  ]
  // A = −M⁻¹K, f = M⁻¹b.
  const A = [0, 1].map((i) => [0, 1].map((j) => Minv[i][0].mul(K[0][j]).add(Minv[i][1].mul(K[1][j])).neg()))
  const f = [0, 1].map((i) => tidy(add(mul(num(Minv[i][0]), b[0]), mul(num(Minv[i][1]), b[1]))))
  const constants = ['c_1', 'c_2']
  const [[a, bb], [c, d]] = A
  // Disaccoppiato: ognuna da sola.
  if (bb.sign === 0 && c.sign === 0) {
    const shapes = [0, 1].map((i) => linearShape([num(A[i][i].neg()), num(1)], f[i], t, [constants[i]]))
    if (shapes.some((s) => !s)) return null
    return { family: linearFamily(names, t, constants, shapes as Shape[]), F }
  }
  // La prima incognita che dipende dall'altra si trova con un'equazione del secondo ordine; l'altra di conseguenza.
  const first = bb.sign !== 0 ? 0 : 1
  const [p, q, r, s] = first === 0 ? [a, bb, c, d] : [d, c, bb, a]
  const [f1, f2] = first === 0 ? f : [f[1], f[0]]
  // u' = p u + q v + f₁, v' = r u + s v + f₂: u'' − (p + s) u' + (ps − qr) u = q f₂ − s f₁ + f₁'.
  const forcing = tidy(add(mul(num(q), f2), mul(num(s.neg()), f1), derive(f1, t)))
  const main = linearShape([num(p.mul(s).sub(q.mul(r))), num(p.add(s).neg()), num(1)], forcing, t, constants)
  if (!main) return null
  // v = (u' − p u − f₁)/q, termine per termine.
  const other = (e: Ex) => tidy(mul(sub(derive(e, t), add(mul(num(p), e), f1)), num(ONE.div(q))))
  const otherTerm = (e: Ex) => tidy(mul(sub(derive(e, t), mul(num(p), e)), num(ONE.div(q))))
  const second: Shape = {
    groups: main.groups.map((g) => ({ outer: g.outer, terms: g.terms.map((term) => ({ c: term.c, f: otherTerm(term.f) })) })),
    particular: other(main.particular),
  }
  const shapes = first === 0 ? [main, second] : [second, main]
  return { family: linearFamily(names, t, constants, shapes), F }
}

// ——— Le condizioni ———

interface Condition {
  /** Quale funzione (l'indice), quale derivata, in che punto e il valore. */
  i: number
  j: number
  x0: Ex
  v: Ex
}

/** Risolve c in V(c) = target, se c compare una volta sola (o linearmente). */
function solveFor(V: Ex, target: Ex, c: string, depth = 0): Ex | null {
  if (depth > 16 || !dependsOn(V, c)) return null
  if (V.t === 'sym') return target
  let d: Ex
  try {
    d = tidy(derive(V, c))
  } catch {
    return null
  }
  if (!dependsOn(d, c) && !isZero(d)) return tidy(mul(sub(target, subst(V, c, num(0))), inv(d)))
  switch (V.t) {
    case 'add': {
      const inner = V.terms.filter((t) => dependsOn(t, c))
      if (inner.length !== 1) return null
      return solveFor(inner[0], tidy(sub(target, add(...V.terms.filter((t) => !dependsOn(t, c))))), c, depth + 1)
    }
    case 'mul': {
      const inner = V.factors.filter((f) => dependsOn(f, c))
      if (inner.length !== 1) return null
      return solveFor(inner[0], tidy(mul(target, inv(mul(num(V.c), ...V.factors.filter((f) => !dependsOn(f, c)))))), c, depth + 1)
    }
    case 'pow':
      if (!dependsOn(V.exp, c)) return solveFor(V.base, tidy(pow(target, inv(V.exp))), c, depth + 1)
      if (V.base.t === 'sym' && V.base.name === 'e') return solveFor(V.exp, tidy(fn('ln', [target])), c, depth + 1)
      return null
    case 'fn': {
      if (V.args.length !== 1) return null
      const back = V.name === 'ln' ? exp(target) : INVERSE[V.name] ? fn(INVERSE[V.name], [target]) : null
      return back && solveFor(V.args[0], tidy(back), c, depth + 1)
    }
    default:
      return null
  }
}

/** Il sistema lineare nelle costanti (con le espressioni): i valori, null se è impossibile. Le costanti libere restano lettere. */
function solveConstants(rows: Ex[][], rhs: Ex[], constants: string[]): Map<string, Ex> | null | 'none' {
  const m = rows.length
  const n = constants.length
  const A = rows.map((row, i) => [...row, rhs[i]])
  const pivots: number[] = []
  let r = 0
  for (let col = 0; col < n && r < m; col++) {
    let best = -1
    let size = 1e-10
    for (let i = r; i < m; i++) {
      const v = Math.abs(probe(A[i][col]))
      if (Number.isNaN(v)) return null
      if (v > size) {
        best = i
        size = v
      }
    }
    if (best < 0) continue
    ;[A[r], A[best]] = [A[best], A[r]]
    const p = A[r][col]
    for (let j = col; j <= n; j++) A[r][j] = tidy(mul(A[r][j], inv(p)))
    for (let i = 0; i < m; i++) {
      if (i === r || isZero(A[i][col])) continue
      const k = A[i][col]
      for (let j = col; j <= n; j++) A[i][j] = tidy(sub(A[i][j], mul(k, A[r][j])))
    }
    pivots.push(col)
    r++
  }
  for (let i = r; i < m; i++) {
    const v = probe(A[i][n])
    if (Number.isNaN(v)) return null
    if (Math.abs(v) > 1e-9) return 'none'
  }
  const out = new Map<string, Ex>()
  pivots.forEach((col, i) => {
    let e = A[i][n]
    for (let j = 0; j < n; j++) if (!pivots.includes(j)) e = sub(e, mul(A[i][j], sym(constants[j])))
    out.set(constants[col], tidy(e))
  })
  return out
}

/** La derivata j-esima del valore nel punto x₀. */
function valueAt(value: Ex, x: string, j: number, x0: Ex): Ex {
  let d = value
  for (let k = 0; k < j; k++) d = derive(d, x)
  return tidy(subst(d, x, x0))
}

type Solved = { values: Ex[]; free: string[] } | { implicit: { G: Ex; F: Ex } } | 'none'

/** La soluzione con le condizioni: le costanti trovate (quelle libere restano), o nessuna soluzione. */
function cauchy(family: Family, conds: Condition[]): Solved | null {
  const { x, constants } = family
  if (family.shapes) {
    const rows: Ex[][] = []
    const rhs: Ex[] = []
    for (const k of conds) {
      const at = valueAt(family.values[k.i], x, k.j, k.x0)
      rows.push(constants.map((c) => tidy(derive(at, c))))
      let zero = at
      for (const c of constants) zero = subst(zero, c, num(0))
      rhs.push(tidy(sub(k.v, zero)))
    }
    const found = solveConstants(rows, rhs, constants)
    if (found === 'none' || !found) return found
    const values = family.values.map((v) => {
      let e = v
      for (const [c, value] of found) e = subst(e, c, value)
      return tidy(e)
    })
    return { values, free: constants.filter((c) => !found.has(c)) }
  }
  // Una costante sola: una condizione, sulla funzione.
  if (conds.length !== 1 || conds[0].j !== 0) return null
  const { x0, v } = conds[0]
  // Una soluzione costante: y = y₀.
  if (family.singular.some((s) => sameFunction(s, v, []))) return { values: [v], free: [] }
  if (family.values.length) {
    const negative = family.pm && probe(v) < 0
    const value = negative ? neg(family.values[0]) : family.values[0]
    // Senza semplificare: c deve restare in un posto solo.
    const c = solveFor(subst(value, x, x0), v, 'c')
    if (c && Number.isFinite(probe(c))) {
      const solution = tidy(subst(value, 'c', c))
      if (Math.abs(probe(subst(solution, x, x0)) - probe(v)) <= 1e-9 * Math.max(1, Math.abs(probe(v)))) return { values: [solution], free: [] }
    }
  }
  // G(y) = F(x) + c: c = G(y₀) − F(x₀).
  if (!family.implicit) return null
  const { G, F } = family.implicit
  const c = tidy(sub(subst(G, family.names[0], v), subst(F, x, x0)))
  if (!Number.isFinite(probe(c))) return null
  return { implicit: { G, F: tidy(add(F, c)) } }
}

// ——— Come si mostra ———

const ZERO_NODE: MathNode = { k: 'num', v: 0, text: '0', comma: false }

const negate = (n: MathNode): MathNode => (n.k === 'neg' ? n.a : { k: 'neg', a: n })

/** I termini di una somma: a − b + c dà a, −b, c. */
function termsOf(n: MathNode): MathNode[] {
  if (n.k === 'bin' && n.op === '+') return [...termsOf(n.a), ...termsOf(n.b)]
  if (n.k === 'bin' && n.op === '-') return [...termsOf(n.a), ...termsOf(n.b).map(negate)]
  return [n]
}

/** I termini uno dopo l'altro, con il meno dove serve: c₁ cos x − c₂ sin x. */
function sumNode(terms: MathNode[]): MathNode {
  const list = terms.filter((t) => !(t.k === 'num' && t.v === 0))
  if (!list.length) return ZERO_NODE
  let out = list[0]
  for (const t of list.slice(1)) out = t.k === 'neg' ? { k: 'bin', op: '-', a: out, b: t.a } : { k: 'bin', op: '+', a: out, b: t }
  return out
}

/** e^{x(√2 + 1)} come nei libri: e^{(√2 + 1)x}. */
function tidyExponents(n: MathNode): MathNode {
  const sum = (m: MathNode) => m.k === 'bin' && (m.op === '+' || m.op === '-')
  if (n.k === 'bin' && n.op === '^' && n.a.k === 'name' && n.a.name === 'e' && n.b.k === 'bin' && n.b.op === '*' && n.b.a.k === 'name' && sum(n.b.b)) {
    return { ...n, b: { ...n.b, a: n.b.b, b: n.b.a } }
  }
  if (n.k === 'bin') return { ...n, a: tidyExponents(n.a), b: tidyExponents(n.b) }
  if (n.k === 'neg') return { ...n, a: tidyExponents(n.a) }
  if (n.k === 'fn') return { ...n, args: n.args.map(tidyExponents) }
  return n
}

/** Una costante della soluzione: c, c₁, c₂… */
const isConstantName = (n: MathNode) => n.k === 'name' && /^c(_\d+)?$/.test(n.name)

/**
 * Le somme dentro la formula come nei libri: la costante in fondo (tan(x + c)) e un termine con il più
 * davanti (1/(c − x), 1/(1 − x)). La somma di fuori (`top`) resta com'è.
 */
function arrange(n: MathNode, top = true): MathNode {
  if (n.k === 'bin' && (n.op === '+' || n.op === '-')) {
    const terms = termsOf(n).map((t) => arrange(t, false))
    if (top) return sumNode(terms)
    const ordered = [...terms.filter((t) => !isConstantName(t)), ...terms.filter(isConstantName)]
    const plus = ordered.findIndex((t) => t.k !== 'neg')
    if (ordered[0]?.k === 'neg' && plus > 0) ordered.unshift(...ordered.splice(plus, 1))
    return sumNode(ordered)
  }
  return mapNode(n, (c) => arrange(c, false))
}

/** ωx e √(k/m) t, non xω: la variabile dopo le lettere greche e le radici. */
function variableLast(n: MathNode): MathNode {
  const constant = (m: MathNode) => (m.k === 'name' && /^\p{Script=Greek}/u.test(m.name)) || (m.k === 'fn' && m.name === 'sqrt')
  if (n.k === 'bin' && n.op === '*' && n.a.k === 'name' && /^[xt]$/.test(n.a.name) && constant(n.b)) return { ...n, a: n.b, b: n.a }
  return mapNode(n, variableLast)
}

const nodeOf = (e: Ex, decimal: boolean): MathNode => arrange(variableLast(tidyExponents(toNode(e, decimal))))

/** Una funzione lineare nelle costanti: i gruppi (c₁ eˣ, e^{−x}(c₁ cos 2x + c₂ sin 2x)) e la parte senza costanti. */
function shapeNode(shape: Shape, decimal: boolean): MathNode {
  const terms: MathNode[] = []
  for (const g of shape.groups) {
    if (!g.outer || g.terms.length < 2) {
      for (const t of g.terms) terms.push(nodeOf(tidy(mul(sym(t.c), t.f)), decimal))
      continue
    }
    const inner = sumNode(g.terms.flatMap((t) => termsOf(nodeOf(tidy(mul(sym(t.c), t.f, inv(g.outer!))), decimal))))
    terms.push({ k: 'bin', op: '*', a: nodeOf(g.outer, decimal), b: inner, implicit: true })
  }
  if (!isZero(shape.particular)) terms.push(...particularTerms(shape.particular, decimal))
  return sumNode(terms)
}

/** Il grado di un monomio in x (3x² → 2), o null se non lo è. */
function monomialDegree(t: Ex, x: string): number | null {
  const factors = t.t === 'mul' ? t.factors : t.t === 'num' ? [] : [t]
  let d = 0
  for (const f of factors) {
    if (f.t === 'sym' && f.name === x) d += 1
    else if (f.t === 'pow' && f.base.t === 'sym' && f.base.name === x && f.exp.t === 'num' && f.exp.v.isInteger && f.exp.v.sign > 0) d += Number(f.exp.v.n)
    else if (dependsOn(f, x)) return null
  }
  return d
}

/** La soluzione particolare: un polinomio dal grado più alto (−2x² + 2x − 3), il resto come viene. */
function particularTerms(p: Ex, decimal: boolean): MathNode[] {
  const x = symbols(p).find((s) => s !== 'π' && s !== 'e')
  if (p.t === 'add' && x && p.terms.every((t) => monomialDegree(t, x) !== null) && symbols(p).length === 1) {
    const sorted = [...p.terms].sort((a, b) => monomialDegree(b, x)! - monomialDegree(a, x)!)
    return sorted.map((t) => nodeOf(t, decimal))
  }
  return termsOf(nodeOf(p, decimal))
}

const SUBSCRIPTS = '₀₁₂₃₄₅₆₇₈₉'

/** Il testo, con c₁ invece di c_1. */
function textOf(n: MathNode): string {
  return plainText(n).replace(/(?<![A-Za-z])([A-Za-z])_(\d+)/g, (_, l: string, d: string) => l + [...d].map((ch) => SUBSCRIPTS[Number(ch)]).join(''))
}

/** u = …, v = … */
function equalities(names: string[], rhs: MathNode[], pm = false): FormattedResult {
  return {
    tex: names.map((u, i) => `${nameLatex(u)} = ${pm ? '\\pm ' : ''}${toLatex(rhs[i])}`).join(',\\quad '),
    text: names.map((u, i) => `${u} = ${pm ? '±' : ''}${textOf(rhs[i])}`).join(', '),
    rich: true,
  }
}

/** Le soluzioni costanti in più: (e y = 0). */
function withSingular(shown: FormattedResult, y: string, singular: Ex[], decimal: boolean): FormattedResult {
  if (!singular.length) return shown
  const nodes = singular.map((s) => nodeOf(s, decimal))
  return {
    ...shown,
    tex: `${shown.tex} \\quad \\left(\\text{e } ${nodes.map((n) => `${nameLatex(y)} = ${toLatex(n)}`).join(',\\ ')}\\right)`,
    text: `${shown.text} (e ${nodes.map((n) => `${y} = ${textOf(n)}`).join(', ')})`,
  }
}

function implicitShown(G: Ex, F: Ex, decimal: boolean): FormattedResult {
  const lhs = nodeOf(G, decimal)
  const rhs = arrange(nodeOf(F, decimal), false)
  return { tex: `${toLatex(lhs)} = ${toLatex(rhs)}`, text: `${textOf(lhs)} = ${textOf(rhs)}`, rich: true }
}

/** La famiglia senza condizioni: l'integrale generale. */
function generalShown(family: Family, decimal: boolean): FormattedResult {
  if (family.shapes) return equalities(family.names, family.shapes.map((s) => shapeNode(s, decimal)))
  if (!family.values.length) return withSingular(implicitShown(family.implicit!.G, add(family.implicit!.F, sym('c')), decimal), family.names[0], family.singular, decimal)
  const shown = equalities(family.names, family.values.map((v) => nodeOf(v, decimal)), family.pm)
  return withSingular(shown, family.names[0], family.singular, decimal)
}

/** Con le condizioni: la soluzione, quelle con le costanti rimaste (problema ai limiti), o nessuna. */
function solvedShown(family: Family, solved: Solved, decimal: boolean): FormattedResult {
  if (solved === 'none') return { tex: '\\text{nessuna soluzione}', text: 'nessuna soluzione' }
  if ('implicit' in solved) return implicitShown(solved.implicit.G, solved.implicit.F, decimal)
  if (!solved.free.length) return equalities(family.names, solved.values.map((v) => nodeOf(v, decimal)))
  // Le costanti libere con i nomi di nuovo in ordine: c se è una, c₁, c₂ se sono più.
  const names = constantNames(solved.free.length)
  const shapes: Shape[] = solved.values.map((v) => {
    const terms = solved.free.map((c, k) => ({ c: names[k], f: tidy(derive(v, c)) }))
    let rest = v
    for (const c of solved.free) rest = subst(rest, c, num(0))
    return { groups: terms.map((t) => ({ outer: null, terms: [t] })), particular: tidy(rest) }
  })
  const shown = equalities(family.names, shapes.map((s) => shapeNode(s, decimal)))
  return { ...shown, tex: `${shown.tex} \\quad \\left(\\text{infinite soluzioni}\\right)`, text: `${shown.text} (infinite soluzioni)` }
}

/**
 * Risolve un'equazione differenziale (o un sistema) con la formula: l'integrale generale, o la soluzione
 * con le condizioni. Null se non si sa (le equazioni non lineari di ordine più alto, gli integrali che
 * non hanno una primitiva elementare…).
 */
export function solveDifferential(request: DifferentialRequest, scope: SymbolScope, decimal: boolean): FormattedResult | null {
  const eqs = request.equations as Extract<MathNode, { k: 'rel' }>[]
  const found = request.unknowns.length === 1 ? scalarFamily(eqs[0], request.unknowns[0], request.x, scope) : systemFamily(eqs, request.unknowns, request.x, scope)
  if (!found || !satisfies(found.F, found.family)) return null
  const { family } = found
  if (!request.conditions.length) return generalShown(family, decimal)
  const conds: Condition[] = []
  try {
    for (const c of request.conditions as Extract<MathNode, { k: 'rel' }>[]) {
      const at = c.items[0] as Extract<MathNode, { k: 'apply' }>
      conds.push({ i: family.names.indexOf(at.name), j: at.primes, x0: tidy(exOf(at.args[0], scope)), v: tidy(exOf(c.items[1], scope)) })
    }
  } catch {
    return null
  }
  const solved = cauchy(family, conds)
  if (!solved) return null
  if (solved !== 'none' && 'values' in solved && !satisfies(found.F, { ...family, values: solved.values })) return null
  return solvedShown(family, solved, decimal)
}
