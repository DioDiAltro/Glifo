/**
 * La serie di Fourier di una funzione su un intervallo [a, b] (di solito [−π, π]), anche a tratti:
 * i coefficienti a₀, aₙ, bₙ con le lettere (gli integrali con n come lettera, poi sin(kπn) = 0 e
 * cos(kπn) = (−1)^{kn}), controllati con gli integrali fatti con i numeri, e la serie. Nei grafici la
 * somma parziale S_N con i coefficienti fatti con i numeri.
 */
import { compile, EMPTY_SCOPE, integrate, MathError, scopeWith, type Scope } from './evaluate'
import { Rational } from './exact'
import type { FormattedResult } from './format'
import { toLatex } from './latex'
import type { MathNode } from './parse'
import { asFraction, polyEx, primitive } from './primitive'
import { trim } from './polynomial'
import { add, dependsOn, exOf, expand, fn, mul, neg, num, plainText, pow, sub, subst, sym, symbols, tidy, toNode, type Ex, type SymbolScope } from './symbolic'

/** Un pezzo della funzione: l'espressione e dove vale. */
interface Piece {
  f: Ex
  lo: Ex
  hi: Ex
  /** Gli stessi estremi con i numeri, per metterli in ordine. */
  a: number
  b: number
}

export interface FourierProblem {
  /** La variabile (x o t) e la funzione con i numeri (per i coefficienti numerici e il grafico). */
  v: string
  pieces: Piece[]
  /** I tratti con i numeri: dove valgono e la funzione. */
  numeric: { a: number; b: number; g: (x: number) => number }[]
  a: number
  b: number
  /** L'intervallo con le lettere: [−π, π]. */
  lo: Ex
  hi: Ex
  F: (x: number) => number
  /** Come si scrive la funzione (f(x), o l'espressione). */
  label: MathNode
}

const value = (e: Ex) => compile(toNode(e), EMPTY_SCOPE)({})

/** Gli estremi di una condizione di un tratto: −π < x < 0, 0 \le x < π, x < 0, x \ge 1. */
function boundsOf(cond: MathNode, v: string, scope: SymbolScope, lo: Ex, hi: Ex): { lo: Ex; hi: Ex } | null {
  if (cond.k !== 'rel') return null
  const items = cond.items
  const isVar = (n: MathNode) => n.k === 'name' && n.name === v
  if (items.length === 3 && isVar(items[1]) && cond.ops.every((o) => o === '<' || o === '<=')) return { lo: exOf(items[0], scope), hi: exOf(items[2], scope) }
  if (items.length === 3 && isVar(items[1]) && cond.ops.every((o) => o === '>' || o === '>=')) return { lo: exOf(items[2], scope), hi: exOf(items[0], scope) }
  if (items.length !== 2) return null
  const [l, r] = items
  const op = cond.ops[0]
  if (isVar(l) && (op === '<' || op === '<=')) return { lo, hi: exOf(r, scope) }
  if (isVar(l) && (op === '>' || op === '>=')) return { lo: exOf(r, scope), hi }
  if (isVar(r) && (op === '<' || op === '<=')) return { lo: exOf(l, scope), hi }
  if (isVar(r) && (op === '>' || op === '>=')) return { lo, hi: exOf(l, scope) }
  return null
}

/**
 * La funzione e l'intervallo di \operatorname{fourier}(f), \operatorname{fourier}(f, [a, b]),
 * \operatorname{fourier}(f, T) (il periodo: l'intervallo [−T/2, T/2]). Null se non si capisce.
 */
export function fourierProblem(args: MathNode[], scope: SymbolScope, numeric: Scope): FourierProblem | null {
  const [what, where] = args
  // La funzione: un'espressione in una lettera, o il nome di una funzione della nota (anche a tratti).
  let body: MathNode = what
  let v: string | null = null
  let label: MathNode = what
  const named = what.k === 'name' ? scope.fns.get(what.name) : what.k === 'apply' && what.args.length === 1 && what.args[0].k === 'name' ? scope.fns.get(what.name) : undefined
  if (named && named.params.length === 1) {
    body = named.body
    v = named.params[0]
    label = what.k === 'name' ? { k: 'apply', name: what.name, args: [{ k: 'name', name: v }], primes: 0 } : what
  }
  let lo: Ex = neg(sym('π'))
  let hi: Ex = sym('π')
  if (where?.k === 'tuple' && where.items.length === 2) {
    lo = exOf(where.items[0], scope)
    hi = exOf(where.items[1], scope)
  } else if (where) {
    const T = exOf(where, scope)
    lo = mul(num(new Rational(-1n, 2n)), T)
    hi = mul(num(new Rational(1n, 2n)), T)
  }
  const a = value(lo)
  const b = value(hi)
  if (!(Number.isFinite(a) && Number.isFinite(b) && a < b)) return null
  const rows = body.k === 'cases' ? body.rows : [{ value: body, cond: null }]
  if (!v) {
    const letters = new Set<string>()
    for (const r of rows) for (const s of symbols(exOf(r.value, scope))) if (s !== 'π' && s !== 'e') letters.add(s)
    if (letters.size > 1) return null
    v = [...letters][0] ?? 'x'
  }
  const x = v
  // I tratti: ognuno con i suoi estremi; «altrimenti» prende quello che resta.
  const pieces: Piece[] = []
  let rest: MathNode | null = null
  for (const r of rows) {
    if (!r.cond) {
      rest = r.value
      continue
    }
    const bounds = boundsOf(r.cond, x, scope, lo, hi)
    if (!bounds) return null
    const p = { f: exOf(r.value, scope, [x]), lo: bounds.lo, hi: bounds.hi, a: value(bounds.lo), b: value(bounds.hi) }
    // Solo la parte dentro [a, b].
    if (p.a < a) Object.assign(p, { lo, a })
    if (p.b > b) Object.assign(p, { hi, b })
    if (p.b > p.a) pieces.push(p)
  }
  pieces.sort((p, q) => p.a - q.a)
  if (rest) {
    const f = exOf(rest, scope, [x])
    let at = { e: lo, v: a }
    const gaps: Piece[] = []
    for (const p of pieces) {
      if (p.a > at.v + 1e-12) gaps.push({ f, lo: at.e, hi: p.lo, a: at.v, b: p.a })
      if (p.b > at.v) at = { e: p.hi, v: p.b }
    }
    if (b > at.v + 1e-12) gaps.push({ f, lo: at.e, hi, a: at.v, b })
    pieces.push(...gaps)
    pieces.sort((p, q) => p.a - q.a)
  }
  if (!pieces.length) return null
  // |x| e |x − 1|: il tratto si divide dove cambia segno quello che c'è dentro.
  for (let i = 0; i < pieces.length; i++) {
    const split = splitAbs(pieces[i], x)
    if (split) {
      pieces.splice(i, 1, ...split)
      i--
    }
  }
  const compiled = pieces.map((p) => {
    const g = compile(toNode(p.f), scopeWith(numeric, [x]))
    const vars: Record<string, number> = {}
    return { a: p.a, b: p.b, g: (t: number) => ((vars[x] = t), g(vars)) }
  })
  // Fuori dai tratti la funzione vale 0; poi si ripete con il periodo b − a.
  const F = (t: number) => {
    const u = a + ((((t - a) % (b - a)) + (b - a)) % (b - a))
    const piece = compiled.find((p) => u >= p.a && u < p.b) ?? compiled.find((p) => u >= p.a && u <= p.b)
    return piece ? piece.g(u) : 0
  }
  return { v: x, pieces, numeric: compiled, a, b, lo, hi, F, label }
}

/** Il primo |u| con u di primo grado in x: u. */
function absOf(e: Ex, x: string): Ex | null {
  if (e.t === 'fn' && e.name === 'abs' && e.args.length === 1 && dependsOn(e.args[0], x)) return e.args[0]
  const kids = e.t === 'add' ? e.terms : e.t === 'mul' ? e.factors : e.t === 'pow' ? [e.base, e.exp] : e.t === 'fn' ? e.args : []
  for (const k of kids) {
    const found = absOf(k, x)
    if (found) return found
  }
  return null
}

/** Lo stesso con |u| al posto di u (segno +1) o di −u (segno −1). */
function withoutAbs(e: Ex, u: Ex, sign: 1 | -1): Ex {
  const walk = (x: Ex): Ex => {
    switch (x.t) {
      case 'add':
        return add(...x.terms.map(walk))
      case 'mul':
        return mul(num(x.c), ...x.factors.map(walk))
      case 'pow':
        return pow(walk(x.base), walk(x.exp))
      case 'fn':
        if (x.name === 'abs' && x.args.length === 1 && tidy(sub(x.args[0], u)).t === 'num' && (tidy(sub(x.args[0], u)) as { v: Rational }).v.sign === 0) return sign > 0 ? u : neg(u)
        return fn(x.name, x.args.map(walk), x.base && walk(x.base))
      default:
        return x
    }
  }
  return walk(e)
}

/** Un tratto con |u| dentro, diviso dove u = 0 (se è dentro il tratto); null se non serve. */
function splitAbs(piece: Piece, x: string): Piece[] | null {
  const u = absOf(piece.f, x)
  if (!u) return null
  const g = compile(toNode(u), scopeWith(EMPTY_SCOPE, [x]))
  const at = (t: number) => g({ [x]: t })
  // u di primo grado: la radice esatta.
  const u0 = at(0)
  const slope = at(1) - u0
  if (!(Math.abs(slope) > 1e-12)) return null
  const root = -u0 / slope
  const exact = tidy(mul(neg(subst(u, x, num(0))), pow(sub(subst(u, x, num(1)), subst(u, x, num(0))), num(-1))))
  const parts: Piece[] = []
  if (root > piece.a + 1e-12 && root < piece.b - 1e-12) {
    parts.push({ f: withoutAbs(piece.f, u, at((piece.a + root) / 2) >= 0 ? 1 : -1), lo: piece.lo, hi: exact, a: piece.a, b: root })
    parts.push({ f: withoutAbs(piece.f, u, at((root + piece.b) / 2) >= 0 ? 1 : -1), lo: exact, hi: piece.hi, a: root, b: piece.b })
  } else parts.push({ ...piece, f: withoutAbs(piece.f, u, at((piece.a + piece.b) / 2) >= 0 ? 1 : -1) })
  return parts
}

/** I coefficienti con i numeri: a_k = (1/L) ∫ f cos(kωx), b_k = (1/L) ∫ f sin(kωx) (con a₀ come gli altri). */
export function numericCoefficients(p: FourierProblem, N: number): { a: number[]; b: number[] } {
  const L = (p.b - p.a) / 2
  const w = Math.PI / L
  const a: number[] = []
  const b: number[] = []
  const integral = (h: (t: number) => number) => p.numeric.reduce((s, piece) => s + integrate((t) => piece.g(t) * h(t), piece.a, piece.b, 1e-10), 0)
  for (let k = 0; k <= N; k++) {
    a.push(integral((t) => Math.cos(k * w * t)) / L)
    b.push(k ? integral((t) => Math.sin(k * w * t)) / L : 0)
  }
  return { a, b }
}

/** La somma parziale S_N(x) = a₀/2 + Σ_{k=1}^{N} (a_k cos kωx + b_k sin kωx). */
export function partialSum(p: FourierProblem, N: number): (x: number) => number {
  const { a, b } = numericCoefficients(p, N)
  const w = (2 * Math.PI) / (p.b - p.a)
  return (x) => {
    let s = a[0] / 2
    for (let k = 1; k <= N; k++) s += a[k] * Math.cos(k * w * x) + b[k] * Math.sin(k * w * x)
    return s
  }
}

// ——— Con le lettere ———

/** sin(kπn) = 0 e cos(kπn) = (−1)^{kn} con n intero; il resto com'è. */
function atIntegers(e: Ex, n: string): Ex {
  const walk = (x: Ex): Ex => {
    switch (x.t) {
      case 'add':
        return add(...x.terms.map(walk))
      case 'mul':
        return mul(num(x.c), ...x.factors.map(walk))
      case 'pow':
        return pow(walk(x.base), walk(x.exp))
      case 'fn': {
        const args = x.args.map(walk)
        if ((x.name === 'sin' || x.name === 'cos') && args.length === 1) {
          // L'argomento è (q n + r)π con q e r interi: sin = 0, cos = (−1)^{qn + r}.
          const ratio = asFraction(expand(mul(args[0], pow(sym('π'), num(-1)))), n)
          const D = ratio && trim(ratio.D)
          const N = ratio && trim(ratio.N)
          if (ratio && D!.length === 1 && N!.length <= 2) {
            const [r, q] = [N![0] ?? Rational.int(0), N![1] ?? Rational.int(0)].map((c) => c.div(D![0]))
            if (r.isInteger && q.isInteger && q.sign !== 0) {
              if (x.name === 'sin') return num(0)
              const sign = r.n % 2n === 0n ? 1 : -1
              return q.n % 2n === 0n ? num(sign) : mul(num(sign), pow(num(-1), sym(n)))
            }
          }
        }
        return fn(x.name, args, x.base && walk(x.base))
      }
      default:
        return x
    }
  }
  return walk(e)
}

const isTrig = (e: Ex): e is Extract<Ex, { t: 'fn' }> => e.t === 'fn' && (e.name === 'sin' || e.name === 'cos') && e.args.length === 1 && !e.base

/**
 * I prodotti di seni e coseni come somme (sin A cos B = [sin(A + B) + sin(A − B)]/2, cos² A = [1 + cos 2A]/2):
 * così ogni termine si integra per parti, anche con n come lettera.
 */
export function linearTrig(e: Ex, depth = 0): Ex {
  const t = expand(e)
  const terms = t.t === 'add' ? t.terms : [t]
  return add(
    ...terms.map((term) => {
      const c = term.t === 'mul' ? term.c : Rational.int(1)
      const flat: Ex[] = []
      for (const f of term.t === 'mul' ? term.factors : [term]) {
        if (f.t === 'pow' && isTrig(f.base) && f.exp.t === 'num' && f.exp.v.isInteger && f.exp.v.n >= 2n && f.exp.v.n <= 4n) {
          for (let k = 0n; k < f.exp.v.n; k++) flat.push(f.base)
        } else flat.push(f)
      }
      const trig = flat.map((f, i) => (isTrig(f) ? i : -1)).filter((i) => i >= 0)
      if (trig.length < 2 || depth > 6) return mul(num(c), ...flat)
      const [i, j] = trig
      const [P, Q] = [flat[i] as Extract<Ex, { t: 'fn' }>, flat[j] as Extract<Ex, { t: 'fn' }>]
      const [A, B] = [P.args[0], Q.args[0]]
      const half = num(new Rational(1n, 2n))
      const plus = add(A, B)
      const minus = sub(A, B)
      const combo =
        P.name === 'sin' && Q.name === 'sin'
          ? mul(half, sub(fn('cos', [minus]), fn('cos', [plus])))
          : P.name === 'cos' && Q.name === 'cos'
            ? mul(half, add(fn('cos', [minus]), fn('cos', [plus])))
            : P.name === 'sin'
              ? mul(half, add(fn('sin', [plus]), fn('sin', [minus])))
              : mul(half, sub(fn('sin', [plus]), fn('sin', [minus])))
      return linearTrig(mul(num(c), ...flat.filter((_, k) => k !== i && k !== j), combo), depth + 1)
    }),
  )
}

/**
 * Le frazioni in n unite in una sola: (−1)^n (1/(n + 1) + 1/(1 − n)) = 2(−1)^n/(1 − n²). I fattori senza n
 * (π, e^π) e i segni (−1)^n restano fuori. Null se non è così.
 */
function oneFraction(e: Ex, n: string): Ex | null {
  if (e.t !== 'mul') return null
  const outside = e.factors.filter((f) => !dependsOn(f, n) || (f.t === 'pow' && f.base.t === 'num' && f.base.v.n === -1n && f.base.v.d === 1n))
  const inside = e.factors.filter((f) => !outside.includes(f))
  if (!inside.length) return null
  const frac = asFraction(expand(mul(...inside)), n)
  if (!frac) return null
  let [N, D] = [trim(frac.N), trim(frac.D)]
  if (!N.length || !D.length) return null
  // Il denominatore con il primo coefficiente positivo: n² − 1, non 1 − n².
  if (D[D.length - 1].sign < 0) [N, D] = [N.map((c) => c.neg()), D.map((c) => c.neg())]
  return mul(num(e.c), ...outside, polyEx(N, n), pow(polyEx(D, n), num(-1)))
}

/** La forma più corta tra quella raccolta, quella sviluppata (dove i termini uguali si tolgono) e con le frazioni unite. */
function simplest(e: Ex, n?: string): Ex {
  const size = (x: Ex) => plainText(toNode(x)).length
  const attempt = (make: () => Ex | null): Ex | null => {
    try {
      const c = make()
      return c && tidy(c)
    } catch {
      return null
    }
  }
  const base = [tidy(e), attempt(() => expand(e))].filter((c): c is Ex => !!c)
  const candidates = [...base, ...base.map((c) => (n ? attempt(() => oneFraction(c, n)) : null)).filter((c): c is Ex => !!c)]
  return candidates.reduce((best, c) => (size(c) < size(best) ? c : best))
}

/** ∫_lo^hi g dx con le lettere (n compresa), dalla primitiva; null se non si trova. */
function definite(g: Ex, v: string, lo: Ex, hi: Ex): Ex | null {
  const G = primitive(linearTrig(g), v)
  if (!G) return null
  return sub(subst(G, v, hi), subst(G, v, lo))
}

/** Un coefficiente con le lettere: (1/L) Σ ∫ f · base(kωx) sui tratti, con n intero. */
function symbolicCoefficient(p: FourierProblem, base: 'cos' | 'sin' | null, n: Ex): Ex | null {
  const L = mul(num(new Rational(1n, 2n)), sub(p.hi, p.lo))
  const w = mul(sym('π'), pow(L, num(-1)))
  const parts: Ex[] = []
  for (const piece of p.pieces) {
    const g = base ? mul(piece.f, fn(base, [mul(n, w, sym(p.v))])) : piece.f
    const I = definite(g, p.v, piece.lo, piece.hi)
    if (!I) return null
    parts.push(I)
  }
  const total = mul(pow(L, num(-1)), add(...parts))
  return signsUp(simplest(n.t === 'sym' ? atIntegers(tidy(total), n.name) : total, n.t === 'sym' ? n.name : undefined))
}

/** −(−1)^n diventa (−1)^{n+1}: 2(−1)^{n+1}/n, come nei libri. */
function signsUp(e: Ex): Ex {
  const walk = (x: Ex): Ex => {
    if (x.t === 'add') return add(...x.terms.map(walk))
    if (x.t !== 'mul') return x
    const at = x.factors.findIndex((f) => f.t === 'pow' && f.base.t === 'num' && f.base.v.n === -1n && f.base.v.d === 1n)
    if (x.c.sign >= 0 || at < 0) return x
    const p = x.factors[at] as Extract<Ex, { t: 'pow' }>
    const flipped: Ex = { t: 'pow', base: num(-1), exp: add(p.exp, num(1)) }
    return { t: 'mul', c: x.c.neg(), factors: x.factors.map((f, i) => (i === at ? flipped : f)) }
  }
  return walk(e)
}

const isZero = (e: Ex) => e.t === 'num' && e.v.sign === 0

function shown(e: Ex): { tex: string; text: string } {
  const node = toNode(e)
  return { tex: toLatex(node), text: plainText(node) }
}

const close = (a: number, b: number) => Number.isFinite(a) && Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(b))

/**
 * La formula generale di un coefficiente e quelli a parte (dove la formula divide per zero o non vale,
 * come a₁ per x sin x), controllati con i numeri; null se la formula non torna.
 */
function withSpecials(p: FourierProblem, c: Ex | null, which: 'cos' | 'sin', list: number[]): { c: Ex; specials: { k: number; c: Ex }[] } | null {
  if (!c) return null
  const f = compile(toNode(c), scopeWith(EMPTY_SCOPE, ['n']))
  const at = (k: number) => f({ n: k })
  if (![5, 6].every((k) => close(at(k), list[k]))) return null
  const specials: { k: number; c: Ex }[] = []
  for (const k of [1, 2, 3, 4]) {
    if (close(at(k), list[k])) continue
    let ck: Ex | null
    try {
      ck = symbolicCoefficient(p, which, num(k))
    } catch {
      ck = null
    }
    if (!ck || !close(value(ck), list[k])) return null
    specials.push({ k, c: ck })
  }
  // Se la formula non dipende da n (0) e quello a parte vale lo stesso, non serve scriverlo.
  const constant = !dependsOn(c, 'n') ? value(c) : null
  return { c, specials: specials.filter((s) => constant === null || !close(value(s.c), constant)) }
}

/**
 * La serie di Fourier: a₀, aₙ, bₙ con le lettere (o i primi con i numeri, se le lettere non bastano) e la
 * serie scritta, con a parte i coefficienti dove la formula generale non vale (x sin x: a₁).
 */
export function fourierShown(p: FourierProblem): FormattedResult | null {
  if (p.v === 'n') throw new MathError('Per la serie di Fourier la variabile non può essere n')
  const numbers = numericCoefficients(p, 6)
  const attempt = (f: () => Ex | null) => {
    try {
      return f()
    } catch {
      return null
    }
  }
  const a0 = attempt(() => symbolicCoefficient(p, null, num(0)))
  const A = withSpecials(p, attempt(() => symbolicCoefficient(p, 'cos', sym('n'))), 'cos', numbers.a)
  const B = withSpecials(p, attempt(() => symbolicCoefficient(p, 'sin', sym('n'))), 'sin', numbers.b)
  if (!a0 || !close(value(a0), numbers.a[0]) || !A || !B) {
    // Con i numeri: i primi coefficienti.
    const list = (c: number[], from: number) => c.slice(from, 4).map((x) => (Math.abs(x) < 1e-10 ? '0' : x.toFixed(4).replace('.', ',').replace('-', '−')))
    return {
      tex: `a_0 \\approx ${list(numbers.a, 0)[0]},\\ a_1, a_2, a_3 \\approx ${list(numbers.a, 1).join(';\\ ')},\\ b_1, b_2, b_3 \\approx ${list(numbers.b, 1).join(';\\ ')}`,
      text: `a₀ ≈ ${list(numbers.a, 0)[0]}; a₁, a₂, a₃ ≈ ${list(numbers.a, 1).join('; ')}; b₁, b₂, b₃ ≈ ${list(numbers.b, 1).join('; ')}`,
    }
  }
  const omega = tidy(mul(sym('π'), pow(mul(num(new Rational(1n, 2n)), sub(p.hi, p.lo)), num(-1))))
  const arg = (k: Ex) => shown(tidy(mul(omega, k, sym(p.v))))
  const SUB = '₀₁₂₃₄'
  // Dove la formula generale non vale: n ≥ 2, oppure n ≠ 2.
  const except = (ks: number[]) => {
    if (!ks.length) return { tex: '', text: '' }
    const fromStart = ks.every((k, i) => k === i + 1)
    return fromStart
      ? { tex: `\\ (n \\ge ${ks.length + 1})`, text: ` (n ≥ ${ks.length + 1})` }
      : { tex: `\\ (n \\ne ${ks.join(', ')})`, text: ` (n ≠ ${ks.join(', ')})` }
  }
  const aSpecial = A.specials.map((s) => s.k)
  const bSpecial = B.specials.map((s) => s.k)
  const half = tidy(mul(num(new Rational(1n, 2n)), a0))
  // bₙ = 0: il prolungamento periodico è pari; aₙ = 0: è dispari se anche a₀ = 0, se no lo è tolto a₀/2
  // (x + 1 meno 1). Su un intervallo simmetrico, [−L, L], vale per la funzione; su [0, 2π] no.
  const who = isZero(tidy(add(p.lo, p.hi))) ? 'la funzione' : 'il prolungamento periodico'
  const parity = (c: Ex, specials: { c: Ex }[], what: 'pari' | 'dispari') => {
    if (!isZero(c) || !specials.every((s) => isZero(s.c))) return { tex: '', text: '' }
    const words = `${who} è ${what}`
    if (what === 'pari' || isZero(half)) return { tex: `\\text{(${words})}`, text: ` (${words})` }
    const k = shown(half)
    return { tex: `\\text{(${who} meno }${k.tex}\\text{ è dispari)}`, text: ` (${who} meno ${k.text} è dispari)` }
  }
  const odd = parity(A.c, A.specials, 'dispari')
  const even = parity(B.c, B.specials, 'pari')
  const texParts = [
    `a_0 = ${shown(a0).tex}`,
    ...A.specials.map((s) => `a_{${s.k}} = ${shown(s.c).tex}`),
    `a_n = ${shown(A.c).tex}${except(aSpecial).tex}`,
    ...B.specials.map((s) => `b_{${s.k}} = ${shown(s.c).tex}`),
    `b_n = ${shown(B.c).tex}${except(bSpecial).tex}`,
  ]
  // Nella formula disegnata pari e dispari vanno su una riga loro, sotto la serie: accanto ai
  // coefficienti la riga sarebbe troppo lunga.
  const remarks = [odd, even].filter((r) => r.tex).map((r) => ` \\\\ ${r.tex}`).join('')
  const textParts = [
    `a₀ = ${shown(a0).text}`,
    ...A.specials.map((s) => `a${SUB[s.k]} = ${shown(s.c).text}`),
    `aₙ = ${shown(A.c).text}${except(aSpecial).text}${odd.text}`,
    ...B.specials.map((s) => `b${SUB[s.k]} = ${shown(s.c).text}`),
    `bₙ = ${shown(B.c).text}${except(bSpecial).text}${even.text}`,
  ]
  // La serie: a₀/2, i termini a parte, Σ (aₙ cos(nωx) + bₙ sin(nωx)), senza i termini nulli.
  const wrap = (e: Ex) => {
    const s = shown(e)
    return e.t === 'add' ? { tex: `\\left(${s.tex}\\right)`, text: `(${s.text})` } : s
  }
  const term = (c: Ex, which: 'cos' | 'sin', k: Ex) => {
    const t = arg(k)
    const f = { tex: `\\${which}\\left(${t.tex}\\right)`, text: `${which}(${t.text})` }
    // Con il coefficiente 1 o −1: «sin(x)», «−cos(2x)».
    if (c.t === 'num' && c.v.d === 1n && (c.v.n === 1n || c.v.n === -1n)) return c.v.n > 0n ? f : { tex: `-${f.tex}`, text: `−${f.text}` }
    const w = wrap(c)
    return { tex: `${w.tex} ${f.tex}`, text: `${w.text} ${f.text}` }
  }
  // I termini con il meno davanti: «1 − 1/2 cos(x)», non «1 + −1/2 cos(x)».
  const joined = (parts: { tex: string; text: string }[], key: 'tex' | 'text') => {
    const minus = key === 'tex' ? '-' : '−'
    return parts.map((t, i) => (i === 0 ? t[key] : t[key].startsWith(minus) ? ` ${minus} ${t[key].slice(minus.length)}` : ` + ${t[key]}`)).join('')
  }
  const skipped = [...new Set([...aSpecial, ...bSpecial])].sort((x, y) => x - y)
  const head = [
    ...(isZero(half) ? [] : [shown(half)]),
    ...skipped.flatMap((k) => {
      const ak = A.specials.find((s) => s.k === k)?.c ?? tidy(subst(A.c, 'n', num(k)))
      const bk = B.specials.find((s) => s.k === k)?.c ?? tidy(subst(B.c, 'n', num(k)))
      return [...(isZero(ak) ? [] : [term(ak, 'cos', num(k))]), ...(isZero(bk) ? [] : [term(bk, 'sin', num(k))])]
    }),
  ]
  const inside = [...(isZero(A.c) ? [] : [term(A.c, 'cos', sym('n'))]), ...(isZero(B.c) ? [] : [term(B.c, 'sin', sym('n'))])]
  // Con un termine solo il meno va davanti alla somma: «π − Σ 2/n sin(nx)», non «π + Σ −2/n sin(nx)».
  const negative = inside.length === 1 && inside[0].tex.startsWith('-') && inside[0].text.startsWith('−')
  const body = negative ? [{ tex: inside[0].tex.slice(1), text: inside[0].text.slice(1) }] : inside
  const fromStart = skipped.every((k, i) => k === i + 1)
  const lower = fromStart
    ? { tex: `n=${skipped.length + 1}`, text: `n≥${skipped.length + 1}` }
    : { tex: `\\substack{n=1 \\\\ n \\ne ${skipped.join(', ')}}`, text: `n≥1, n≠${skipped.join(', ')}` }
  const sigma = body.length
    ? {
        tex: `${negative ? '-' : ''}\\sum_{${lower.tex}}^{\\infty} ${body.length > 1 ? `\\left(${joined(body, 'tex')}\\right)` : body[0].tex}`,
        text: `${negative ? '−' : ''}Σ_{${lower.text}} ${body.length > 1 ? `(${joined(body, 'text')})` : body[0].text}`,
      }
    : null
  const all = [...head, ...(sigma ? [sigma] : [])]
  const series = { tex: joined(all, 'tex') || '0', text: joined(all, 'text') || '0' }
  const label = { tex: toLatex(p.label), text: plainText(p.label) }
  return {
    tex: `\\begin{array}{l} ${texParts.join(',\\quad ')} \\\\ ${label.tex} \\sim ${series.tex}${remarks} \\end{array}`,
    text: `${textParts.join('; ')}; ${label.text} ~ ${series.text}`,
    rich: true,
  }
}
