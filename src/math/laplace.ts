/**
 * La trasformata di Laplace, \mathcal{L}\{f\}(s) = ∫_0^∞ f(t) e^{−st} dt, con la tabella: ogni termine
 * c t^k e^{αt} (1, sin βt o cos βt) dà la trasformata di 1, sin o cos, traslata in s − α e derivata k volte
 * rispetto a s (con il segno (−1)^k). Seni e coseni moltiplicati diventano somme, sinh e cosh esponenziali.
 * L'antitrasformata delle funzioni razionali in s con i fratti semplici. Tutte e due si controllano con i
 * numeri, con l'integrale fatto davvero.
 */
import { compile, EMPTY_SCOPE, integrate, scopeWith } from './evaluate'
import { Rational } from './exact'
import { linearTrig } from './fourier'
import type { FormattedResult } from './format'
import { toLatex } from './latex'
import { namesIn, type MathNode } from './parse'
import { numericRoots, partialFractions, pdivmod, trim, type Poly } from './polynomial'
import { asFraction, polyEx } from './primitive'
import { factoredPolynomial } from './arithmetic'
import { add, dependsOn, derive, exOf, expand, fn, mul, neg, num, plainText, pow, sub, subst, sym, symbols, tidy, toNode, type Ex, type SymbolScope } from './symbolic'

const R = (n: number | bigint, d: number | bigint = 1) => new Rational(BigInt(n), BigInt(d))
const ONE = R(1)
const HALF = R(1, 2)

const E = sym('e')
const exp = (x: Ex) => pow(E, x)

/** a t + b con a e b senza t: [a, b]; null se non è così. */
function linearIn(e: Ex, t: string): [Ex, Ex] | null {
  const a = tidy(derive(e, t))
  if (dependsOn(a, t)) return null
  const b = tidy(subst(e, t, num(0)))
  return [a, b]
}

/** sinh e cosh come esponenziali: sinh u = (e^u − e^{−u})/2. */
function hyperbolicToExp(e: Ex): Ex {
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
        if ((x.name === 'sinh' || x.name === 'cosh') && args.length === 1) {
          const [u] = args
          return mul(num(HALF), x.name === 'sinh' ? sub(exp(u), exp(neg(u))) : add(exp(u), exp(neg(u))))
        }
        if (x.name === 'exp' && args.length === 1) return exp(args[0])
        return fn(x.name, args, x.base && walk(x.base))
      }
      default:
        return x
    }
  }
  return walk(e)
}

/** La trasformata di un termine c t^k e^{αt} sin/cos(βt) (gli altri fattori senza t restano); null se il termine è altro. */
function termTransform(term: Ex, t: string, s: string): Ex | null {
  const c = term.t === 'mul' ? term.c : ONE
  const factors = term.t === 'mul' ? term.factors : term.t === 'num' ? [] : [term]
  const constant = term.t === 'num' ? term.v : c
  let k = 0
  let alpha: Ex = num(0)
  let shift: Ex = num(0)
  let trig: { name: 'sin' | 'cos'; beta: Ex } | null = null
  const others: Ex[] = []
  for (const f of factors) {
    if (!dependsOn(f, t)) {
      others.push(f)
      continue
    }
    // t^k
    if (f.t === 'sym' && f.name === t) {
      k += 1
      continue
    }
    if (f.t === 'pow' && f.base.t === 'sym' && f.base.name === t && f.exp.t === 'num' && f.exp.v.isInteger && f.exp.v.sign > 0) {
      k += Number(f.exp.v.n)
      continue
    }
    // e^{αt + γ}: e^γ è una costante.
    if (f.t === 'pow' && f.base.t === 'sym' && f.base.name === 'e') {
      const lin = linearIn(f.exp, t)
      if (!lin) return null
      alpha = add(alpha, lin[0])
      shift = add(shift, lin[1])
      continue
    }
    // sin(βt), cos(βt): uno solo (i prodotti sono già diventati somme).
    if (f.t === 'fn' && (f.name === 'sin' || f.name === 'cos') && f.args.length === 1 && !trig) {
      const lin = linearIn(f.args[0], t)
      if (!lin) return null
      const [beta, phase] = lin
      if (!(phase.t === 'num' && phase.v.sign === 0)) {
        // sin(βt + φ) = sin βt cos φ + cos βt sin φ.
        const rest = mul(num(constant), ...others, ...factors.filter((g) => g !== f && dependsOn(g, t)))
        const split =
          f.name === 'sin'
            ? add(mul(fn('sin', [mul(beta, sym(t))]), fn('cos', [phase])), mul(fn('cos', [mul(beta, sym(t))]), fn('sin', [phase])))
            : sub(mul(fn('cos', [mul(beta, sym(t))]), fn('cos', [phase])), mul(fn('sin', [mul(beta, sym(t))]), fn('sin', [phase])))
        return laplaceEx(mul(rest, split), t, s)
      }
      trig = { name: f.name, beta }
      continue
    }
    return null
  }
  const S = sym(s)
  // La trasformata di 1, sin βt, cos βt; poi s → s − α; poi (−1)^k d^k/ds^k.
  let F: Ex = !trig
    ? pow(S, num(-1))
    : trig.name === 'sin'
      ? mul(trig.beta, pow(add(pow(S, num(2)), pow(trig.beta, num(2))), num(-1)))
      : mul(S, pow(add(pow(S, num(2)), pow(trig.beta, num(2))), num(-1)))
  F = subst(F, s, sub(S, alpha))
  for (let i = 0; i < k; i++) F = neg(derive(F, s))
  return mul(num(constant), ...others, exp(shift), F)
}

/** Le trasformate dei termini di un'espressione in t; null se un termine non è nella tabella. */
function laplaceTerms(f: Ex, t: string, s: string): Ex[] | null {
  const e = linearTrig(hyperbolicToExp(f))
  const terms = e.t === 'add' ? e.terms : [e]
  const out: Ex[] = []
  for (const term of terms) {
    const F = termTransform(term, t, s)
    if (!F) return null
    out.push(F)
  }
  return out
}

function laplaceEx(f: Ex, t: string, s: string): Ex | null {
  const terms = laplaceTerms(f, t, s)
  return terms && add(...terms)
}

/** Una somma scritta termine per termine, con i segni: 6/s³ + 5/s − 2/(s − 1). */
function sumShown(terms: Ex[]): { tex: string; text: string } {
  const parts = terms.map((x) => shown(tidy(x))).filter((p) => p.text !== '0')
  let tex = ''
  let text = ''
  parts.forEach((p, i) => {
    const negative = p.text.startsWith('−')
    tex += i === 0 ? p.tex : negative ? ` - ${p.tex.replace(/^-/, '')}` : ` + ${p.tex}`
    text += i === 0 ? p.text : negative ? ` − ${p.text.slice(1)}` : ` + ${p.text}`
  })
  return parts.length ? { tex, text } : { tex: '0', text: '0' }
}

/** N/D con i coefficienti numeri: il numeratore in ordine, il denominatore scomposto (2/(s(s² + 4))). */
function fractionShown(F: Ex, s: string): { tex: string; text: string } | null {
  const frac = asFraction(expand(F), s)
  if (!frac) return null
  let [N, D] = [trim(frac.N), trim(frac.D)]
  if (!N.length || D.length < 2) return null
  // Il denominatore con il primo coefficiente 1.
  const lead = D[D.length - 1]
  ;[N, D] = [N.map((c) => c.div(lead)), D.map((c) => c.div(lead))]
  const top = shown(tidy(polyEx(N, s)))
  // Il denominatore scomposto o sviluppato, quello più corto: s² − 9, (s + 1)², s² + 2s + 5.
  const factored = factoredPolynomial(D, s)
  const plain = shown(tidy(polyEx(D, s)))
  const expanded = { ...plain, single: /^[^ ()]+$/.test(plain.text) }
  const bottom = expanded.text.length <= factored.text.length ? expanded : factored
  const topSingle = N.filter((c) => c.sign !== 0).length === 1 && !top.text.includes(' ')
  return {
    tex: `\\frac{${top.tex}}{${bottom.tex}}`,
    text: `${topSingle ? top.text : `(${top.text})`}/${bottom.single ? bottom.text : `(${bottom.text})`}`,
  }
}

/** Con una frazione sola, se i coefficienti sono numeri: (s + 3)/(s² + 2s + 5). */
function oneFraction(F: Ex, s: string): Ex | null {
  const frac = asFraction(expand(F), s)
  if (!frac) return null
  let [N, D] = [trim(frac.N), trim(frac.D)]
  if (!N.length || !D.length) return null
  if (D[D.length - 1].sign < 0) [N, D] = [N.map((c) => c.neg()), D.map((c) => c.neg())]
  const lead = D[D.length - 1]
  return mul(polyEx(N.map((c) => c.div(lead)), s), pow(polyEx(D.map((c) => c.div(lead)), s), num(-1)))
}

const size = (x: Ex) => plainText(toNode(x)).length

function shortest(...xs: (Ex | null)[]): Ex {
  const live = xs.filter((x): x is Ex => !!x).map((x) => tidy(x))
  return live.reduce((best, x) => (size(x) < size(best) ? x : best))
}

/** Se i due valgono lo stesso con i numeri (per le lettere in più dei valori qualsiasi). */
function sameNumbers(a: (v: number) => number, b: (v: number) => number, at: number[]): boolean {
  return at.every((v) => {
    const x = a(v)
    const y = b(v)
    return Number.isFinite(x) && Number.isFinite(y) && Math.abs(x - y) <= 1e-6 * Math.max(1, Math.abs(y))
  })
}

/** Un numero oltre la parte reale di ogni radice del denominatore: lì l'integrale converge. */
function beyondPoles(D: Poly): number {
  const roots = D.length > 1 ? numericRoots(D.map((c) => c.toNumber())) : []
  return Math.max(0, ...roots.map((r) => r.re))
}

/** ∫_0^∞ g(t) e^{−st} dt con i numeri. */
function numericLaplace(g: (t: number) => number, s: number): number {
  // Dove e^{−st} è già 0 anche g(t) e^{−st} lo è (e^{2t} non si calcola più, ma conta 0).
  return integrate((t) => {
    const w = Math.exp(-s * t)
    return w === 0 ? 0 : g(t) * w
  }, 0, Infinity, 1e-9)
}

function compiled(e: Ex, v: string): (x: number) => number {
  const f = compile(toNode(e), scopeWith(EMPTY_SCOPE, [v]))
  return (x) => f({ [v]: x })
}

function shown(e: Ex): { tex: string; text: string } {
  const n = toNode(e)
  return { tex: toLatex(n), text: plainText(n) }
}

/** Le lettere che non sono funzioni della nota: s(s + 1) è un prodotto. */
function letters(node: MathNode, scope: SymbolScope): string[] {
  return [...namesIn(node)].filter((name) => !scope.fns.has(name))
}

/** La lettera di un'espressione: quella che non è π, e né una della nota; `fallback` se non ce n'è. */
function letterOf(e: Ex, fallback: string): string | null {
  const free = symbols(e).filter((x) => x !== 'π' && x !== 'e')
  if (free.length > 1) return free.includes(fallback) ? fallback : null
  return free[0] ?? fallback
}

/**
 * \mathcal{L}\{f\}(s): la trasformata, controllata con i numeri; null se f non è nella tabella. `args`: la
 * funzione e, se c'è, la lettera della trasformata.
 */
export function laplaceShown(args: MathNode[], scope: SymbolScope): FormattedResult | null {
  const [what, variable] = args
  let body = what
  let t: string | null = null
  if (what.k === 'name' && scope.fns.has(what.name) && scope.fns.get(what.name)!.params.length === 1) {
    body = scope.fns.get(what.name)!.body
    t = scope.fns.get(what.name)!.params[0]
  }
  const f = exOf(body, scope, letters(body, scope))
  t ??= letterOf(f, 't')
  if (!t) return null
  const s = variable?.k === 'name' ? variable.name : t === 's' ? 'p' : 's'
  const terms = laplaceTerms(f, t, s)
  if (!terms) return null
  const F = add(...terms)
  const best = shortest(F, oneFraction(F, s))
  // Il controllo: con le lettere in più (a, ω) dei valori qualsiasi, per s abbastanza grande.
  const extra = symbols(f).filter((x) => x !== t && x !== 'π' && x !== 'e')
  if (extra.length === 0) {
    const g = compiled(f, t)
    const G = compiled(best, s)
    const frac = asFraction(expand(best), s)
    const right = frac ? beyondPoles(trim(frac.D)) : 10
    if (!sameNumbers(G, (v) => numericLaplace(g, v), [right + 2.5, right + 4])) return null
  }
  // Si scrive nel modo più corto: termine per termine, con una frazione sola, o come viene.
  // (Con i coefficienti numeri la frazione sola ha il denominatore in ordine e scomposto: meglio di quella di tidy.)
  const single = fractionShown(F, s)
  const candidates = [single ?? shown(best), sumShown(terms)]
  const out = candidates.reduce((a, b) => (b.text.length < a.text.length ? b : a))
  return { tex: out.tex, text: out.text, rich: true }
}

// ——— L'antitrasformata ———

/** La radice quadrata esatta di una frazione positiva, come espressione (√2, 3/2). */
const sqrtEx = (r: Rational): Ex => tidy(pow(num(r), num(HALF)))

/** L'antitrasformata di N/D con i fratti semplici; null se N/D non è una funzione razionale propria. */
function inverseRational(N: Poly, D: Poly, t: string): Ex | null {
  if (N.length >= D.length) {
    const { q } = pdivmod(N, D)
    if (trim(q).length) return null
  }
  const pf = partialFractions(N, D)
  if (!pf || trim(pf.poly).length) return null
  const T = sym(t)
  const out: Ex[] = []
  for (const part of pf.parts) {
    const factor = trim(part.factor)
    const k = part.k
    const numer = trim(part.num)
    if (factor.length === 2) {
      // A/(s − a)^k → A t^{k−1} e^{at}/(k − 1)!
      const a = factor[0].neg().div(factor[1])
      const A = (numer[0] ?? R(0)).div(factor[1].powInt(BigInt(k)))
      let fact = ONE
      for (let i = 2; i < k; i++) fact = fact.mul(R(i))
      out.push(mul(num(A.div(fact)), pow(T, num(k - 1)), exp(mul(num(a), T))))
      continue
    }
    if (factor.length !== 3) return null
    // (Bs + C)/((s − α)² ± β²)^k, con il primo coefficiente 1.
    const lead = factor[2]
    const [q, p] = [factor[0].div(lead), factor[1].div(lead)]
    const scale = lead.powInt(BigInt(k))
    const B = (numer[1] ?? R(0)).div(scale)
    const C = (numer[0] ?? R(0)).div(scale)
    const alpha = p.div(R(-2))
    const beta2 = q.sub(alpha.mul(alpha))
    const rest = C.add(B.mul(alpha))
    const ea = exp(mul(num(alpha), T))
    if (beta2.sign > 0) {
      const beta = sqrtEx(beta2)
      const bt = mul(beta, T)
      if (k === 1) {
        out.push(mul(ea, add(mul(num(B), fn('cos', [bt])), mul(num(rest), pow(beta, num(-1)), fn('sin', [bt])))))
        continue
      }
      if (k === 2) {
        // (s − α)/((s − α)² + β²)² → t sin βt/(2β); 1/((s − α)² + β²)² → (sin βt − βt cos βt)/(2β³).
        const first = mul(num(B), T, fn('sin', [bt]), pow(mul(num(2), beta), num(-1)))
        const second = mul(num(rest), sub(fn('sin', [bt]), mul(bt, fn('cos', [bt]))), pow(mul(num(2), pow(beta, num(3))), num(-1)))
        out.push(mul(ea, add(first, second)))
        continue
      }
      return null
    }
    if (beta2.sign < 0 && k === 1) {
      // Radici reali non frazioni: cosh e sinh.
      const beta = sqrtEx(beta2.neg())
      const bt = mul(beta, T)
      out.push(mul(ea, add(mul(num(B), fn('cosh', [bt])), mul(num(rest), pow(beta, num(-1)), fn('sinh', [bt])))))
      continue
    }
    return null
  }
  return add(...out)
}

/** \mathcal{L}^{-1}\{F\}(t): l'antitrasformata di una funzione razionale in s, controllata con i numeri. */
export function inverseLaplaceShown(args: MathNode[], scope: SymbolScope): FormattedResult | null {
  const [what, variable] = args
  const F = exOf(what, scope, letters(what, scope))
  const s = letterOf(F, 's')
  if (!s) return null
  const t = variable?.k === 'name' ? variable.name : s === 't' ? 'x' : 't'
  const frac = asFraction(expand(F), s)
  if (!frac) return null
  const f = inverseRational(trim(frac.N), trim(frac.D), t)
  if (!f) return null
  const best = tidy(f)
  // Il controllo: la trasformata con i numeri del risultato è F.
  const g = compiled(best, t)
  const G = compiled(F, s)
  const right = beyondPoles(trim(frac.D))
  if (!sameNumbers((v) => numericLaplace(g, v), G, [right + 2.5, right + 4])) return null
  const out = shown(best)
  return { tex: out.tex, text: out.text, rich: true }
}
