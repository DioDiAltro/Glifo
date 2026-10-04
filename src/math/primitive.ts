/**
 * Le primitive (gli integrali indefiniti) con le lettere, come si fanno a lezione: gli integrali
 * immediati, la linearità, la sostituzione, l'integrazione per parti, i fratti semplici delle
 * funzioni razionali, le potenze di seno e coseno, le radici. Ogni primitiva trovata si controlla
 * derivandola (con i numeri, in alcuni punti): se non torna, non si mostra.
 */
import { compile, EMPTY_SCOPE, scopeWith } from './evaluate'
import { Rational } from './exact'
import { degree, padd, partialFractions, pdivmod, pgcd, pmul, ppow, pscale, trim, type PartialFraction, type Poly } from './polynomial'
import { add, assumePositive, dependsOn, derive, expand, fn, key, mul, neg, num, pow, sub, subst, sym, symbols, toNode, type Ex } from './symbolic'

const R = (n: number | bigint, d: number | bigint = 1) => new Rational(BigInt(n), BigInt(d))
const ONE = R(1)
const HALF = R(1, 2)

const isZero = (e: Ex) => e.t === 'num' && e.v.sign === 0
const isConst = (e: Ex, v: string) => !dependsOn(e, v)
const inv = (e: Ex) => pow(e, num(-1))
const half = (e: Ex) => mul(num(HALF), e)
const sqrt = (e: Ex) => pow(e, num(HALF))
const ln = (e: Ex) => fn('ln', [e])
const lnAbs = (e: Ex) => fn('ln', [fn('abs', [e])])
const square = (e: Ex) => pow(e, num(2))

/** Quanti tentativi restano per una primitiva: le strade sbagliate non devono bloccare la pagina. */
let budget = 0
/** Le primitive già cercate in questa ricerca (anche quelle che non si trovano). */
let seen = new Map<string, Ex | null>()
/** Le lettere che sono numeri positivi (un raggio): √(R² − x²) ha la primitiva con arcsin(x/R). */
let positive: ReadonlySet<string> = new Set()

/**
 * Una primitiva di `f` rispetto a `v` (senza la costante), controllata derivandola; null se non si sa
 * trovare. Le lettere `positiveLetters` sono numeri positivi (se non si dice: tutte tranne `v`).
 */
export function primitive(f: Ex, v: string, positiveLetters?: ReadonlySet<string>): Ex | null {
  const saved = budget
  const savedSeen = seen
  const savedPositive = positive
  budget = 1500
  seen = new Map()
  positive = positiveLetters ?? new Set(symbols(f).filter((n) => n !== v && n !== 'π' && n !== 'e'))
  try {
    const found = integrate(f, v, 0)
    if (!found) return null
    const F = distribute(found)
    const nicer = combineLogs(F)
    if (nicer !== F && verified(nicer, f, v)) return nicer
    return verified(F, f, v) ? F : null
  } catch {
    return null
  } finally {
    budget = saved
    seen = savedSeen
    positive = savedPositive
  }
}

function integrate(f: Ex, v: string, depth: number): Ex | null {
  const k = `${v}|${key(f)}`
  if (seen.has(k)) return seen.get(k)!
  // Mentre si cerca, la stessa primitiva non si cerca dentro sé stessa.
  seen.set(k, null)
  const F = search(f, v, depth)
  seen.set(k, F)
  return F
}

function search(f: Ex, v: string, depth: number): Ex | null {
  if (--budget < 0 || depth > 12) return null
  if (isConst(f, v)) return mul(f, sym(v))
  // Le costanti fuori: ∫ c f = c ∫ f.
  if (f.t === 'mul') {
    const outside = f.factors.filter((x) => isConst(x, v))
    if (outside.length || !(f.c.n === 1n && f.c.d === 1n)) {
      const F = integrate(mul(...f.factors.filter((x) => !isConst(x, v))), v, depth)
      return F && mul(num(f.c), ...outside, F)
    }
  }
  return (
    table(f, v) ??
    rational(f, v) ??
    terms(f, v, depth) ??
    quadraticRoot(f, v) ??
    substitution(f, v, depth) ??
    byParts(f, v, depth) ??
    trig(f, v, depth) ??
    radicals(f, v, depth) ??
    exponentials(f, v, depth) ??
    hyperbolic(f, v, depth) ??
    weierstrass(f, v) ??
    safely(() => quadraticRootLetters(f, v) ?? rationalLetters(f, v))
  )
}

/** Una strada che non deve fermare la ricerca: se qualcosa non si sa fare, null. */
function safely(run: () => Ex | null): Ex | null {
  try {
    return run()
  } catch {
    return null
  }
}

// ——— Gli strumenti ———

/** a v + b, se `e` lo è (a ≠ 0, a e b costanti). */
export function linear(e: Ex, v: string): { a: Ex; b: Ex } | null {
  if (isConst(e, v)) return null
  let a: Ex
  try {
    a = derive(e, v)
  } catch {
    return null
  }
  if (!isConst(a, v) || isZero(a)) return null
  const b = subst(e, v, num(0))
  return isZero(expand(sub(e, add(mul(a, sym(v)), b)))) ? { a, b } : null
}

/** Un nome nuovo per la variabile di una sostituzione. */
function fresh(...xs: Ex[]): string {
  const used = new Set(xs.flatMap((x) => symbols(x)))
  return ['t', 'u', 'w', 's', 'τ', 'ξ'].find((n) => !used.has(n)) ?? 'ζ'
}

const compareKeys = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)

function bigGcd(a: bigint, b: bigint): bigint {
  if (a < 0n) a = -a
  if (b < 0n) b = -b
  while (b) [a, b] = [b, a % b]
  return a
}

/**
 * La stessa espressione in una forma fissa: le somme con i termini in ordine e senza il fattore
 * comune (4x + 2 = 2(2x + 1)), così le parti uguali si riconoscono e si semplificano.
 */
function canon(e: Ex): Ex {
  switch (e.t) {
    case 'add': {
      const s = add(...e.terms.map(canon))
      if (s.t !== 'add') return s
      const rest = (t: Ex): Ex => (t.t === 'mul' ? (t.factors.length === 1 ? t.factors[0] : { t: 'mul', c: ONE, factors: t.factors }) : t)
      const coef = (t: Ex): Rational => (t.t === 'num' ? t.v : t.t === 'mul' ? t.c : ONE)
      const sorted = [...s.terms].sort((a, b) => (a.t === 'num' ? 1 : 0) - (b.t === 'num' ? 1 : 0) || compareKeys(key(rest(a)), key(rest(b))))
      let n = 0n
      let d = 1n
      for (const t of sorted) {
        const c = coef(t)
        n = bigGcd(n, c.n)
        d = (d * c.d) / bigGcd(d, c.d)
      }
      let g = new Rational(n || 1n, d)
      if (coef(sorted[0]).sign < 0) g = g.neg()
      const inner: Ex = { t: 'add', terms: sorted.map((t) => mul(num(ONE.div(g)), t)) }
      return mul(num(g), inner)
    }
    case 'mul':
      return mul(num(e.c), ...e.factors.map(canon))
    case 'pow':
      return pow(canon(e.base), canon(e.exp))
    case 'fn':
      return fn(e.name, e.args.map(canon), e.base && canon(e.base))
    default:
      return e
  }
}

/**
 * `e` con `t` al posto di `u`: anche le potenze (x⁴ = t² con u = x², e^{2x} = t² con u = eˣ, e^{x+1} = e·t).
 */
function replace(e: Ex, u: Ex, t: Ex, v: string): Ex {
  const uk = key(u)
  const [ub, ue] = u.t === 'pow' ? [u.base, u.exp] : [u, num(1)]
  const ubk = key(ub)
  const visit = (x: Ex): Ex => {
    if (key(x) === uk) return t
    const [xb, xe] = x.t === 'pow' ? [x.base, x.exp] : [x, num(1)]
    if ((x.t === 'pow' || u.t === 'pow') && key(xb) === ubk) {
      const ratio = mul(xe, inv(ue))
      if (ratio.t === 'num' && ratio.v.isInteger) return pow(t, ratio)
      if (!isConst(ue, v) && isConst(xb, v)) {
        try {
          const k = mul(derive(xe, v), inv(derive(ue, v)))
          if (k.t === 'num' && k.v.isInteger) {
            const rest = expand(sub(xe, mul(k, ue)))
            if (isConst(rest, v)) return mul(pow(xb, rest), pow(t, k))
          }
        } catch {
          // Niente da fare: si continua dentro.
        }
      }
    }
    switch (x.t) {
      case 'add':
        return add(...x.terms.map(visit))
      case 'mul':
        return mul(num(x.c), ...x.factors.map(visit))
      case 'pow':
        return pow(visit(x.base), visit(x.exp))
      case 'fn':
        return fn(x.name, x.args.map(visit), x.base && visit(x.base))
      default:
        return x
    }
  }
  return visit(e)
}

/** arctan(tan u) = u (a meno di una costante): dopo le sostituzioni t = tan u e t = tan(u/2). */
function simplifyInverse(e: Ex): Ex {
  switch (e.t) {
    case 'add':
      return add(...e.terms.map(simplifyInverse))
    case 'mul':
      return mul(num(e.c), ...e.factors.map(simplifyInverse))
    case 'pow':
      return pow(simplifyInverse(e.base), simplifyInverse(e.exp))
    case 'fn': {
      const args = e.args.map(simplifyInverse)
      const a = args[0]
      if (e.name === 'arctan' && a?.t === 'fn' && a.name === 'tan') return a.args[0]
      return fn(e.name, args, e.base)
    }
    default:
      return e
  }
}

// ——— Gli integrali immediati ———

/** Le primitive delle funzioni elementari di a v + b (la tabella degli integrali immediati). */
function table(f: Ex, v: string): Ex | null {
  if (f.t === 'sym') return f.name === v ? half(square(f)) : null
  if (f.t === 'pow') {
    const { base, exp } = f
    if (isConst(exp, v)) {
      const L = linear(base, v)
      if (!L) return null
      // (a v + b)^{-1}: il logaritmo.
      if (exp.t === 'num' && exp.v.n === -1n && exp.v.d === 1n) return mul(inv(L.a), lnAbs(base))
      const e1 = add(exp, num(1))
      return mul(inv(L.a), inv(e1), pow(base, e1))
    }
    if (isConst(base, v)) {
      const L = linear(exp, v)
      if (!L) return null
      const lnBase = base.t === 'sym' && base.name === 'e' ? num(1) : ln(base)
      return mul(f, inv(mul(L.a, lnBase)))
    }
    return null
  }
  if (f.t !== 'fn' || f.args.length !== 1) return null
  const u = f.args[0]
  const L = linear(u, v)
  if (!L) return null
  const k = inv(L.a)
  const oneMinus = sub(num(1), square(u))
  switch (f.name) {
    case 'sin':
      return mul(k, neg(fn('cos', [u])))
    case 'cos':
      return mul(k, fn('sin', [u]))
    case 'tan':
      return mul(k, neg(lnAbs(fn('cos', [u]))))
    case 'cot':
      return mul(k, lnAbs(fn('sin', [u])))
    case 'sec':
      return mul(k, lnAbs(fn('tan', [add(half(u), mul(num(R(1, 4)), sym('π')))])))
    case 'csc':
      return mul(k, lnAbs(fn('tan', [half(u)])))
    case 'sinh':
      return mul(k, fn('cosh', [u]))
    case 'cosh':
      return mul(k, fn('sinh', [u]))
    case 'tanh':
      return mul(k, ln(fn('cosh', [u])))
    case 'coth':
      return mul(k, lnAbs(fn('sinh', [u])))
    case 'ln':
      return mul(k, sub(mul(u, ln(u)), u))
    case 'arctan':
      return mul(k, sub(mul(u, fn('arctan', [u])), half(ln(add(num(1), square(u))))))
    case 'arccot':
      return mul(k, add(mul(u, fn('arccot', [u])), half(ln(add(num(1), square(u))))))
    case 'arcsin':
      return mul(k, add(mul(u, fn('arcsin', [u])), sqrt(oneMinus)))
    case 'arccos':
      return mul(k, sub(mul(u, fn('arccos', [u])), sqrt(oneMinus)))
    case 'arsinh':
      return mul(k, sub(mul(u, fn('arsinh', [u])), sqrt(add(square(u), num(1)))))
    case 'arcosh':
      return mul(k, sub(mul(u, fn('arcosh', [u])), sqrt(sub(square(u), num(1)))))
    case 'artanh':
      return mul(k, add(mul(u, fn('artanh', [u])), half(ln(oneMinus))))
    case 'abs':
      return mul(k, half(mul(u, fn('abs', [u]))))
    case 'sgn':
      return mul(k, fn('abs', [u]))
  }
  return null
}

// ——— Le funzioni razionali: i fratti semplici ———

interface Fraction {
  N: Poly
  D: Poly
}

/** N/D ridotta ai minimi termini. */
function reduce(r: Fraction): Fraction {
  if (!trim(r.N).length) return { N: [], D: [ONE] }
  const g = pgcd(r.N, r.D)
  if (degree(g) <= 0) return r
  return { N: pdivmod(r.N, g).q, D: pdivmod(r.D, g).q }
}

/** L'espressione come quoziente di due polinomi in v con i coefficienti frazioni, o null. */
export function asFraction(e: Ex, v: string): Fraction | null {
  switch (e.t) {
    case 'num':
      return { N: [e.v], D: [ONE] }
    case 'sym':
      return e.name === v ? { N: [R(0), ONE], D: [ONE] } : null
    case 'add': {
      let acc: Fraction = { N: [], D: [ONE] }
      for (const t of e.terms) {
        const r = asFraction(t, v)
        if (!r) return null
        acc = reduce({ N: padd(pmul(acc.N, r.D), pmul(r.N, acc.D)), D: pmul(acc.D, r.D) })
      }
      return acc
    }
    case 'mul': {
      let acc: Fraction = { N: [e.c], D: [ONE] }
      for (const x of e.factors) {
        const r = asFraction(x, v)
        if (!r) return null
        acc = reduce({ N: pmul(acc.N, r.N), D: pmul(acc.D, r.D) })
      }
      return acc
    }
    case 'pow': {
      if (e.exp.t !== 'num' || !e.exp.v.isInteger) return null
      const k = Number(e.exp.v.n)
      if (Math.abs(k) > 24) return null
      const r = asFraction(e.base, v)
      if (!r) return null
      if (k >= 0) return { N: ppow(r.N, k), D: ppow(r.D, k) }
      if (!trim(r.N).length) return null
      return reduce({ N: ppow(r.D, -k), D: ppow(r.N, -k) })
    }
    default:
      return null
  }
}

/** Un polinomio (dal grado 0) come espressione in v. */
export function polyEx(p: Poly, v: string): Ex {
  return add(...p.map((c, k) => mul(num(c), pow(sym(v), num(k)))))
}

function polyIntegral(p: Poly, v: string): Ex {
  return add(...p.map((c, k) => mul(num(c.div(R(k + 1))), pow(sym(v), num(k + 1)))))
}

function rational(f: Ex, v: string): Ex | null {
  const r = asFraction(f, v)
  if (!r) return null
  if (degree(r.D) <= 0) return polyIntegral(pscale(r.N, ONE.div(r.D[0])), v)
  const pf = partialFractions(r.N, r.D)
  if (!pf) return null
  const out: Ex[] = [polyIntegral(pf.poly, v)]
  for (const part of pf.parts) {
    const F = fractionIntegral(part, v)
    if (!F) return null
    out.push(F)
  }
  return add(...out)
}

/** ∫ dx/(x² + px + q): con l'arcotangente (Δ < 0) o con il logaritmo (Δ > 0). */
function inverseQuadratic(p: Rational, q: Rational, x: Ex): Ex | null {
  const disc = p.mul(p).sub(q.mul(R(4)))
  const shift = add(x, num(p.div(R(2))))
  if (disc.sign < 0) {
    const s = sqrt(num(disc.neg()))
    // (x + p/2)/(s/2) se s o p/2 sono interi (arctan((x + 1)/2), arctan((x + 1)/√2)); se no (2x + p)/s.
    const arg = s.t === 'num' || p.div(R(2)).isInteger ? mul(inv(half(s)), shift) : mul(inv(s), add(mul(num(2), x), num(p)))
    return mul(num(2), inv(s), fn('arctan', [arg]))
  }
  if (disc.sign > 0) {
    const s = sqrt(num(disc))
    const h = half(s)
    return mul(inv(s), lnAbs(mul(sub(shift, h), inv(add(shift, h)))))
  }
  return null
}

/** ∫ A/(x − a)^k e ∫ (Bx + C)/(x² + px + q)^k. */
function fractionIntegral({ factor, k, num: top }: PartialFraction, v: string): Ex | null {
  const x = sym(v)
  if (factor.length === 2) {
    const A = top[0]
    const base = add(x, num(factor[0]))
    if (k === 1) return mul(num(A), lnAbs(base))
    return mul(num(A.div(R(1 - k))), pow(base, num(R(1 - k))))
  }
  const [q, p] = factor
  const C = top[0] ?? R(0)
  const B = top[1] ?? R(0)
  const Q = add(square(x), mul(num(p), x), num(q))
  const disc = p.mul(p).sub(q.mul(R(4)))
  // Bx + C = (B/2)(2x + p) + (C − Bp/2).
  const C1 = C.sub(B.mul(p).div(R(2)))
  const I1 = C1.sign ? inverseQuadratic(p, q, x) : num(0)
  if (!I1) return null
  if (k === 1) return add(mul(num(B.div(R(2))), disc.sign < 0 ? ln(Q) : lnAbs(Q)), mul(num(C1), I1))
  if (disc.sign >= 0) return null
  // t = x + p/2, a² = q − p²/4: I_k = t/(2a²(k−1)Q^{k−1}) + (2k−3)/(2a²(k−1)) I_{k−1}.
  const a2 = q.sub(p.mul(p).div(R(4)))
  const t = add(x, num(p.div(R(2))))
  const I = (j: number): Ex => {
    if (j === 1) return I1
    const c = ONE.div(a2.mul(R(2 * (j - 1))))
    return add(mul(num(c), t, pow(Q, num(R(1 - j)))), mul(num(c.mul(R(2 * j - 3))), I(j - 1)))
  }
  return add(mul(num(B.div(R(2 * (1 - k)))), pow(Q, num(R(1 - k)))), mul(num(C1), I(k)))
}

// ——— Somme, sostituzione, per parti ———

/** Termine per termine: la somma, o il prodotto sviluppato ((x + 1)² x, (x² + 1)/x). */
function terms(f: Ex, v: string, depth: number): Ex | null {
  const each = (e: Ex): Ex | null => {
    if (e.t !== 'add') return null
    const parts: Ex[] = []
    for (const t of e.terms) {
      const F = integrate(t, v, depth + 1)
      if (!F) return null
      parts.push(F)
    }
    return add(...parts)
  }
  const direct = each(f)
  if (direct) return direct
  if (f.t !== 'mul' && f.t !== 'pow' && f.t !== 'add') return null
  const e = expand(f)
  return key(e) !== key(f) ? each(e) : null
}

/** Le espressioni da provare come nuova variabile: gli argomenti delle funzioni, le basi delle potenze, gli esponenziali. */
function candidates(f: Ex, v: string): Ex[] {
  const found = new Map<string, Ex>()
  const put = (u: Ex) => {
    if (isConst(u, v) || (u.t === 'sym' && u.name === v) || linear(u, v)) return
    if (!found.has(key(u))) found.set(key(u), u)
  }
  const visit = (e: Ex): void => {
    if (isConst(e, v)) return
    switch (e.t) {
      case 'add':
        return e.terms.forEach(visit)
      case 'mul':
        return e.factors.forEach(visit)
      case 'pow':
        if (isConst(e.base, v)) {
          put(e.exp)
          put(e)
        } else {
          put(e.base)
          // √x come nuova variabile (anche da 1/√x).
          if (e.exp.t === 'num' && !e.exp.v.isInteger) put(e.exp.v.sign < 0 ? pow(e.base, num(e.exp.v.neg())) : e)
        }
        visit(e.base)
        visit(e.exp)
        return
      case 'fn':
        for (const a of e.args) put(a)
        put(e)
        return e.args.forEach(visit)
    }
  }
  visit(f)
  // Prima le più semplici: eˣ prima di e^{2x}.
  return [...found.values()].sort((a, b) => key(a).length - key(b).length)
}

/** La sostituzione t = u(x) quando c'è anche u'(x): ∫ g(u) u' dx = ∫ g(t) dt. */
function substitution(f: Ex, v: string, depth: number): Ex | null {
  const g = canon(f)
  for (const u0 of candidates(g, v)) {
    const u = canon(u0)
    let du: Ex
    try {
      du = canon(derive(u, v))
    } catch {
      continue
    }
    if (isZero(du)) continue
    const t = fresh(f)
    let inner = replace(canon(mul(g, inv(du))), u, sym(t), v)
    // Resta la x: dalla t con l'inversa (x² = t − 1 se t = x² + 1, x = eᵗ se t = ln x).
    if (!isConst(inner, v)) inner = canon(withInverse(inner, u, v, sym(t)) ?? inner)
    if (!isConst(inner, v)) continue
    const G = integrate(inner, t, depth + 1)
    const F = G && subst(G, t, u)
    // Una sostituzione vale dove si inverte: si controlla qui, per provare le altre se non va.
    if (F && verified(F, f, v)) return F
  }
  return null
}

/**
 * `e` (con t = u(x)) senza la x, dove si può invertire: x = eᵗ per t = ln x, x = ln t per t = eˣ,
 * x = t² per t = √x; con t = a xᵏ + b solo le potenze xᵐ con m multiplo di k. Null se no.
 */
function withInverse(e: Ex, u: Ex, v: string, t: Ex): Ex | null {
  const L = (x: Ex) => linear(x, v)
  let back: Ex | null = null
  if (u.t === 'fn' && u.name === 'ln') {
    const l = L(u.args[0])
    back = l && mul(sub(pow(sym('e'), t), l.b), inv(l.a))
  } else if (u.t === 'pow' && isConst(u.base, v)) {
    const l = L(u.exp)
    back = l && u.base.t === 'sym' && u.base.name === 'e' ? mul(sub(ln(t), l.b), inv(l.a)) : null
  } else if (u.t === 'pow' && u.exp.t === 'num' && !u.exp.v.isInteger && u.exp.v.n === 1n && L(u.base)) {
    // t = (a x + b)^{1/n}: x = (tⁿ − b)/a.
    const l = L(u.base)!
    back = mul(sub(pow(t, num(Number(u.exp.v.d))), l.b), inv(l.a))
  }
  if (back) return subst(e, v, back)
  // t = a xᵏ + b: xᵐ = ((t − b)/a)^{m/k}.
  const r = asFraction(expand(u), v)
  if (!r || degree(r.D) !== 0) return null
  const N = pscale(r.N, ONE.div(r.D[0]))
  const powers = N.map((c, k) => (c.sign ? k : -1)).filter((k) => k > 0)
  if (powers.length !== 1) return null
  const k = powers[0]
  const w = mul(sub(t, num(N[0] ?? R(0))), inv(num(N[k])))
  const swap = (x: Ex): Ex => {
    const [b, m] = x.t === 'pow' ? [x.base, x.exp] : [x, num(1)]
    if (b.t === 'sym' && b.name === v && m.t === 'num' && m.v.isInteger && m.v.n % BigInt(k) === 0n) return pow(w, num(m.v.div(R(k))))
    switch (x.t) {
      case 'add':
        return add(...x.terms.map(swap))
      case 'mul':
        return mul(num(x.c), ...x.factors.map(swap))
      case 'pow':
        return pow(swap(x.base), swap(x.exp))
      case 'fn':
        return fn(x.name, x.args.map(swap), x.base && swap(x.base))
      default:
        return x
    }
  }
  return swap(e)
}

/** e^{av+b}, c^{av+b}, sin, cos, sinh, cosh di a v + b: si integrano quante volte si vuole. */
function repeatable(T: Ex, v: string): boolean {
  if (T.t === 'pow') return isConst(T.base, v) && !!linear(T.exp, v)
  return T.t === 'fn' && ['sin', 'cos', 'sinh', 'cosh'].includes(T.name) && !!linear(T.args[0], v)
}

/** ln, arctan, arcsin… (anche ln²): per parti si derivano. */
function logLike(T: Ex): boolean {
  const base = T.t === 'pow' && T.exp.t === 'num' && T.exp.v.isInteger && T.exp.v.sign > 0 ? T.base : T
  return base.t === 'fn' && ['ln', 'arctan', 'arccot', 'arcsin', 'arccos', 'arsinh', 'arcosh', 'artanh'].includes(base.name)
}

/** Un polinomio in v, o una potenza di v (√x, 1/x²): la parte che per parti si integra (o si deriva). */
function algebraic(x: Ex, v: string): boolean {
  if (x.t === 'pow' && x.base.t === 'sym' && x.base.name === v) return isConst(x.exp, v)
  const r = asFraction(x, v)
  return !!r && degree(r.D) <= 0
}

/** Per parti: P(x) e^x, P(x) sin x (più volte), P(x) ln x, x arctan x; e^{ax} sin(bx) con la formula. */
function byParts(f: Ex, v: string, depth: number): Ex | null {
  const factors = f.t === 'mul' ? f.factors : [f]
  const closed = expSinCos(factors, v)
  if (closed) return closed
  const poly = factors.filter((x) => algebraic(x, v))
  const rest = factors.filter((x) => !algebraic(x, v))
  if (rest.length !== 1) return null
  const T = rest[0]
  const P = mul(...poly)
  if (repeatable(T, v)) {
    const Pf = asFraction(P, v)
    if (!Pf || degree(Pf.D) > 0) return null
    let G: Ex | null = T
    let Pk = P
    const out: Ex[] = []
    for (let i = 0, sign = 1; i < 25 && !isZero(Pk); i++, sign = -sign) {
      G = G && integrate(G, v, depth + 1)
      if (!G) return null
      out.push(mul(num(sign), Pk, G))
      Pk = derive(Pk, v)
    }
    return isZero(Pk) ? add(...out) : null
  }
  if (logLike(T)) {
    // Si deriva T (ln, arctan…): ∫ P T = Q T − ∫ Q T', con Q = ∫ P.
    const Q = integrate(P, v, depth + 1)
    if (!Q) return null
    const rest2 = integrate(expand(mul(Q, derive(T, v))), v, depth + 1)
    return rest2 && sub(mul(Q, T), rest2)
  }
  // Si integra T (x/cos² x): ∫ P T = P G − ∫ P' G, con G = ∫ T e P un polinomio.
  const Pf = asFraction(P, v)
  if (!Pf || degree(Pf.D) > 0 || degree(Pf.N) < 1) return null
  const G = integrate(T, v, depth + 1)
  if (!G) return null
  const rest3 = integrate(expand(mul(derive(P, v), G)), v, depth + 1)
  return rest3 && sub(mul(P, G), rest3)
}

/** ∫ e^{αx+β} sin(γx+δ) e ∫ e^{αx+β} cos(γx+δ), con la formula (due volte per parti). */
function expSinCos(factors: Ex[], v: string): Ex | null {
  if (factors.length !== 2) return null
  const E = factors.find((x) => x.t === 'pow' && isConst(x.base, v) && linear(x.exp, v))
  const S = factors.find((x) => x.t === 'fn' && (x.name === 'sin' || x.name === 'cos') && linear(x.args[0], v))
  if (!E || !S || E.t !== 'pow' || S.t !== 'fn') return null
  const base = E.base
  const alpha = mul(derive(E.exp, v), base.t === 'sym' && base.name === 'e' ? num(1) : ln(base))
  const u = S.args[0]
  const gamma = derive(u, v)
  const den = inv(add(square(alpha), square(gamma)))
  const s = fn('sin', [u])
  const c = fn('cos', [u])
  return S.name === 'sin' ? mul(E, den, sub(mul(alpha, s), mul(gamma, c))) : mul(E, den, add(mul(alpha, c), mul(gamma, s)))
}

// ——— Le funzioni goniometriche ———

const TRIG = new Set(['sin', 'cos', 'tan', 'cot', 'sec', 'csc'])

/**
 * Prodotti di potenze di seno e coseno (anche tangente, secante…) dello stesso a x + b: con un
 * esponente dispari t = cos o t = sin, con tutti pari le formule di bisezione o t = tan; con angoli
 * diversi le formule di Werner.
 */
function trig(f: Ex, v: string, depth: number): Ex | null {
  const factors = f.t === 'mul' ? f.factors : [f]
  const items: { name: string; arg: Ex; k: number }[] = []
  for (const x of factors) {
    const [b, e] = x.t === 'pow' ? [x.base, x.exp] : [x, num(1)]
    if (b.t !== 'fn' || !TRIG.has(b.name) || e.t !== 'num' || !e.v.isInteger) return null
    items.push({ name: b.name, arg: b.args[0], k: Number(e.v.n) })
  }
  if (!items.length) return null
  const arg = items[0].arg
  if (items.some((i) => key(i.arg) !== key(arg))) return werner(items, v, depth)
  const L = linear(arg, v)
  if (!L) return null
  let m = 0
  let n = 0
  for (const { name, k } of items) {
    if (name === 'sin') m += k
    else if (name === 'cos') n += k
    else if (name === 'tan') (m += k), (n -= k)
    else if (name === 'cot') (m -= k), (n += k)
    else if (name === 'sec') n -= k
    else m -= k
  }
  const a = inv(L.a)
  if (m === 0 && n === -1) return mul(a, lnAbs(fn('tan', [add(half(arg), mul(num(R(1, 4)), sym('π')))])))
  if (m === -1 && n === 0) return mul(a, lnAbs(fn('tan', [half(arg)])))
  const t = fresh(f)
  const T = sym(t)
  const oneMinus = sub(num(1), square(T))
  const via = (g: Ex, back: Ex): Ex | null => {
    const G = integrate(g, t, depth + 1)
    return G && simplifyInverse(subst(G, t, back))
  }
  const odd = (k: number) => k % 2 !== 0
  // t = sin: cos^n = cos^{n−1} cos, con cos² = 1 − t².
  if (odd(n) && (n > 0 || !odd(m))) return via(mul(a, pow(T, num(m)), pow(oneMinus, num(R(n - 1, 2)))), fn('sin', [arg]))
  // t = cos.
  if (odd(m)) return via(mul(num(-1), a, pow(T, num(n)), pow(oneMinus, num(R(m - 1, 2)))), fn('cos', [arg]))
  if (m >= 0 && n >= 0) {
    // Tutti pari: sin² = (1 − cos 2u)/2, cos² = (1 + cos 2u)/2.
    const c = fn('cos', [mul(num(2), arg)])
    const g = expand(mul(pow(half(sub(num(1), c)), num(m / 2)), pow(half(add(num(1), c)), num(n / 2))))
    // Dal termine noto alle potenze più alte di cos 2u: x/2 − sin(2x)/4, come nei libri.
    const power = (t: Ex) => (t.t === 'mul' ? t.factors : [t]).reduce((k, f) => (f.t === 'pow' && f.exp.t === 'num' ? k + Number(f.exp.v.n) : f.t === 'fn' ? k + 1 : k), 0)
    const parts = (g.t === 'add' ? g.terms : [g]).slice().sort((a, b) => power(a) - power(b))
    const out: Ex[] = []
    for (const t of parts) {
      const F = integrate(t, v, depth + 1)
      if (!F) return null
      out.push(F)
    }
    return add(...out)
  }
  // Pari con esponenti negativi: t = tan u, sin^m cos^n du = t^m (1 + t²)^{−(m+n)/2 − 1} dt.
  return via(mul(a, pow(T, num(m)), pow(add(num(1), square(T)), num(-(m + n) / 2 - 1))), fn('tan', [arg]))
}

/** sin A cos B, sin A sin B, cos A cos B con angoli diversi: le formule di Werner. */
function werner(items: { name: string; arg: Ex; k: number }[], v: string, depth: number): Ex | null {
  if (items.length !== 2 || items.some((i) => i.k !== 1 || (i.name !== 'sin' && i.name !== 'cos'))) return null
  if (!linear(items[0].arg, v) || !linear(items[1].arg, v)) return null
  const [p, q] = items[0].name === 'sin' || items[1].name === 'cos' ? items : [items[1], items[0]]
  const plus = add(p.arg, q.arg)
  const minus = sub(p.arg, q.arg)
  let g: Ex
  if (p.name === 'sin' && q.name === 'cos') g = half(add(fn('sin', [plus]), fn('sin', [minus])))
  else if (p.name === 'sin') g = half(sub(fn('cos', [minus]), fn('cos', [plus])))
  else g = half(add(fn('cos', [minus]), fn('cos', [plus])))
  return integrate(g, v, depth + 1)
}

/** Funzioni razionali di sin u e cos u: t = tan(u/2), sin u = 2t/(1 + t²), cos u = (1 − t²)/(1 + t²). */
function weierstrass(f: Ex, v: string): Ex | null {
  let arg: Ex | null = null
  let ok = true
  const look = (e: Ex): void => {
    if (!ok || isConst(e, v)) return
    if (e.t === 'fn' && (e.name === 'sin' || e.name === 'cos' || e.name === 'tan')) {
      if (!arg) arg = e.args[0]
      else if (key(arg) !== key(e.args[0])) ok = false
      return
    }
    if (e.t === 'add') e.terms.forEach(look)
    else if (e.t === 'mul') e.factors.forEach(look)
    else if (e.t === 'pow' && e.exp.t === 'num' && e.exp.v.isInteger) look(e.base)
    else ok = false
  }
  look(f)
  if (!ok || !arg) return null
  const L = linear(arg, v)
  if (!L) return null
  const t = fresh(f)
  const T = sym(t)
  const den = inv(add(num(1), square(T)))
  const sin = mul(num(2), T, den)
  const cos = mul(sub(num(1), square(T)), den)
  const swap = (e: Ex): Ex => {
    switch (e.t) {
      case 'add':
        return add(...e.terms.map(swap))
      case 'mul':
        return mul(num(e.c), ...e.factors.map(swap))
      case 'pow':
        return pow(swap(e.base), e.exp)
      case 'fn':
        if (e.name === 'sin') return sin
        if (e.name === 'cos') return cos
        if (e.name === 'tan') return mul(sin, inv(cos))
        return e
      default:
        return e
    }
  }
  const g = mul(swap(f), num(2), den, inv(L.a))
  if (!isConst(g, v)) return null
  const G = rational(g, t)
  return G && simplifyInverse(subst(G, t, fn('tan', [half(arg)])))
}

// ——— Radici ed esponenziali ———

function lcm(a: number, b: number): number {
  const g = (x: number, y: number): number => (y ? g(y, x % y) : x)
  return (a / g(a, b)) * b
}

/** Le radici di a x + b (√(x + 1), ∛x): t = (a x + b)^{1/n} e diventa una funzione razionale. */
function radicals(f: Ex, v: string, depth: number): Ex | null {
  const g = canon(f)
  let base: Ex | null = null
  let n = 1
  let ok = true
  const look = (e: Ex): void => {
    if (!ok || isConst(e, v)) return
    if (e.t === 'pow' && e.exp.t === 'num' && !e.exp.v.isInteger && linear(e.base, v)) {
      if (!base) base = e.base
      else if (key(base) !== key(e.base)) ok = false
      if (e.exp.v.d > 12n) ok = false
      else n = lcm(n, Number(e.exp.v.d))
      return
    }
    if (e.t === 'add') e.terms.forEach(look)
    else if (e.t === 'mul') e.factors.forEach(look)
    else if (e.t === 'pow') look(e.base)
    else if (e.t === 'fn') e.args.forEach(look)
  }
  look(g)
  if (!ok || !base || n === 1) return null
  const L = linear(base, v)!
  const t = fresh(f)
  const T = sym(t)
  const bk = key(base as Ex)
  const x = mul(sub(pow(T, num(n)), L.b), inv(L.a))
  const swap = (e: Ex): Ex => {
    if (e.t === 'pow' && key(e.base) === bk) return pow(T, mul(e.exp, num(n)))
    if (key(e) === bk) return pow(T, num(n))
    switch (e.t) {
      case 'sym':
        return e.name === v ? x : e
      case 'add':
        return add(...e.terms.map(swap))
      case 'mul':
        return mul(num(e.c), ...e.factors.map(swap))
      case 'pow':
        return pow(swap(e.base), swap(e.exp))
      case 'fn':
        return fn(e.name, e.args.map(swap), e.base && swap(e.base))
      default:
        return e
    }
  }
  const h = mul(swap(g), num(n), pow(T, num(n - 1)), inv(L.a))
  if (!isConst(h, v)) return null
  const G = integrate(h, t, depth + 1)
  return G && subst(G, t, pow(base, num(R(1, n))))
}

/** Funzioni razionali di e^{kx}: t = e^{gx} (g il massimo comun divisore dei k), dx = dt/(g t). */
function exponentials(f: Ex, v: string, depth: number): Ex | null {
  const rates: Rational[] = []
  let ok = true
  const look = (e: Ex): void => {
    if (!ok || isConst(e, v)) return
    if (e.t === 'pow' && e.base.t === 'sym' && e.base.name === 'e') {
      const L = linear(e.exp, v)
      if (!L || L.a.t !== 'num') ok = false
      else rates.push(L.a.v)
      return
    }
    if (e.t === 'add') e.terms.forEach(look)
    else if (e.t === 'mul') e.factors.forEach(look)
    else if (e.t === 'pow' && e.exp.t === 'num' && e.exp.v.isInteger) look(e.base)
    else ok = false
  }
  look(f)
  if (!ok || !rates.length) return null
  let n = 0n
  let d = 1n
  for (const r of rates) {
    n = bigGcd(n, r.n)
    d = (d * r.d) / bigGcd(d, r.d)
  }
  const g = new Rational(n, d)
  const t = fresh(f)
  const T = sym(t)
  const swap = (e: Ex): Ex => {
    switch (e.t) {
      case 'add':
        return add(...e.terms.map(swap))
      case 'mul':
        return mul(num(e.c), ...e.factors.map(swap))
      case 'pow': {
        if (e.base.t === 'sym' && e.base.name === 'e' && !isConst(e.exp, v)) {
          const L = linear(e.exp, v)!
          return mul(pow(e.base, L.b), pow(T, num((L.a as Extract<Ex, { t: 'num' }>).v.div(g))))
        }
        return pow(swap(e.base), e.exp)
      }
      default:
        return e
    }
  }
  const h = mul(swap(f), inv(mul(num(g), T)))
  if (!isConst(h, v)) return null
  const G = rational(h, t) ?? integrate(h, t, depth + 1)
  return G && subst(G, t, pow(sym('e'), mul(num(g), sym(v))))
}

/** Le radici di un polinomio di secondo grado: 1/√(a² − x²), √(1 − x²), 1/√(x² + 1), (px + q)/√(…). */
function quadraticRoot(f: Ex, v: string): Ex | null {
  const factors = f.t === 'mul' ? f.factors : [f]
  const roots = factors.filter((x) => x.t === 'pow' && x.exp.t === 'num' && x.exp.v.d === 2n && Math.abs(Number(x.exp.v.n)) === 1)
  if (roots.length !== 1) return null
  const root = roots[0] as Extract<Ex, { t: 'pow' }>
  const Qf = asFraction(root.base, v)
  if (!Qf || degree(Qf.D) !== 0 || degree(Qf.N) !== 2) return null
  const Q = pscale(Qf.N, ONE.div(Qf.D[0]))
  const [g, b, a] = Q
  const others = mul(...factors.filter((x) => x !== root))
  const P = asFraction(others, v)
  if (!P || degree(P.D) !== 0) return null
  const lin = pscale(P.N, ONE.div(P.D[0]))
  const x = sym(v)
  const sq = sqrt(root.base)
  // a(x + h)² + δ, con w = x + h.
  const h = b.div(a.mul(R(2)))
  const delta = g.sub(b.mul(b).div(a.mul(R(4))))
  const w = add(x, num(h))
  /** ∫ dx/√Q. */
  const inverseRoot = (): Ex | null => {
    if (a.sign < 0) {
      if (delta.sign <= 0) return null
      const k = sqrt(num(delta.div(a.neg())))
      return mul(inv(sqrt(num(a.neg()))), fn('arcsin', [mul(w, inv(k))]))
    }
    const ra = sqrt(num(a))
    const inside = add(mul(ra, w), sq)
    return mul(inv(ra), delta.sign > 0 ? ln(inside) : lnAbs(inside))
  }
  if (root.exp.t === 'num' && root.exp.v.sign < 0) {
    if (degree(lin) > 1) return null
    const [q0, p0] = [lin[0] ?? R(0), lin[1] ?? R(0)]
    // (p x + q)/√Q = (p/(2a)) Q'/√Q + (q − p b/(2a))/√Q.
    const out: Ex[] = []
    if (p0.sign) out.push(mul(num(p0.div(a)), sq))
    const rest = q0.sub(p0.mul(b).div(a.mul(R(2))))
    if (rest.sign) {
      const I = inverseRoot()
      if (!I) return null
      out.push(mul(num(rest), I))
    }
    return add(...out)
  }
  if (degree(lin) > 0) return null
  const c = lin[0] ?? R(0)
  // ∫ √Q: (w √Q)/2 più la parte con l'arcoseno o il logaritmo.
  let extra: Ex
  if (a.sign < 0) {
    if (delta.sign <= 0) return null
    const ra = sqrt(num(a.neg()))
    const k2 = delta.div(a.neg())
    extra = mul(num(k2.div(R(2))), ra, fn('arcsin', [mul(w, inv(sqrt(num(k2))))]))
  } else {
    const ra = sqrt(num(a))
    const inside = add(mul(ra, w), sq)
    const s = delta.div(a)
    extra = mul(num(s.div(R(2))), ra, delta.sign > 0 ? ln(inside) : lnAbs(inside))
  }
  return mul(num(c), add(half(mul(w, sq)), extra))
}

// ——— Con le lettere nei coefficienti ———

/** a v² + b v + c, se `e` lo è (a ≠ 0; a, b e c senza v, anche con le lettere). */
function quadraticIn(e: Ex, v: string): { a: Ex; b: Ex; c: Ex } | null {
  if (isConst(e, v)) return null
  let d1: Ex
  let d2: Ex
  try {
    d1 = derive(e, v)
    d2 = derive(d1, v)
  } catch {
    return null
  }
  if (!isConst(d2, v) || isZero(d2)) return null
  const a = half(d2)
  const b = subst(d1, v, num(0))
  const c = subst(e, v, num(0))
  return isZero(expand(sub(e, add(mul(a, square(sym(v))), mul(b, sym(v)), c)))) ? { a, b, c } : null
}

/**
 * Il segno di un'espressione senza la variabile: dai numeri, con le lettere positive (e le altre, come
 * le variabili degli integrali di fuori, anche negative). Null se cambia.
 */
function signOf(e: Ex): 1 | -1 | null {
  const letters = symbols(e).filter((n) => n !== 'π' && n !== 'e')
  let f: (vars: Record<string, number>) => number
  try {
    f = compile(toNode(e), scopeWith(EMPTY_SCOPE, letters))
  } catch {
    return null
  }
  let sign = 0
  for (const [start, other] of [[1.3, 0.37], [0.71, -0.53], [2.9, -1.7]]) {
    const vars: Record<string, number> = {}
    letters.forEach((n, i) => (vars[n] = positive.has(n) ? start + 0.37 * i : other + 0.29 * i))
    const value = f(vars)
    if (!Number.isFinite(value) || Math.abs(value) < 1e-12) return null
    const s = value > 0 ? 1 : -1
    if (sign && s !== sign) return null
    sign = s
  }
  return sign as 1 | -1
}

/**
 * Le radici di secondo grado con le lettere: √(R² − x²) = (x√(R² − x²))/2 + (R²/2) arcsin(x/R),
 * 1/√(R² − x²) = arcsin(x/R), √(x² + a²); anche con le variabili di fuori (√(R² − x² − y²) in y).
 */
function quadraticRootLetters(f: Ex, v: string): Ex | null {
  const factors = f.t === 'mul' ? f.factors : [f]
  const roots = factors.filter((x) => x.t === 'pow' && x.exp.t === 'num' && x.exp.v.d === 2n && Math.abs(Number(x.exp.v.n)) === 1)
  if (roots.length !== 1) return null
  const root = roots[0] as Extract<Ex, { t: 'pow' }>
  const Q = quadraticIn(root.base, v)
  if (!Q || !symbols(root.base).some((n) => n !== v && n !== 'π' && n !== 'e')) return null
  // Fuori dalla radice p v + q.
  const rest = factors.filter((x) => x !== root)
  let p = num(0)
  let q = num(f.t === 'mul' ? f.c : ONE)
  if (rest.length) {
    const lin = linear(mul(q, ...rest), v)
    if (!lin) return null
    ;({ a: p, b: q } = lin)
  }
  const { a, b, c } = Q
  const sa = signOf(a)
  if (!sa) return null
  const sq = sqrt(root.base)
  // a(v + h)² + δ, con w = v + h.
  const h = mul(b, inv(mul(num(2), a)))
  const delta = sub(c, mul(b, b, inv(mul(num(4), a))))
  const w = add(sym(v), h)
  const ra = sqrt(sa < 0 ? neg(a) : a)
  const logOf = (inside: Ex) => (signOf(delta) === 1 ? ln(inside) : lnAbs(inside))
  let F: Ex
  if (root.exp.t === 'num' && root.exp.v.sign < 0) {
    // (p v + q)/√Q = (p/(2a)) Q'/√Q + (q − p b/(2a))/√Q.
    const r = expand(sub(q, mul(p, b, inv(mul(num(2), a)))))
    const inverse = sa < 0 ? mul(inv(ra), fn('arcsin', [mul(w, inv(sqrt(mul(delta, inv(neg(a))))))])) : mul(inv(ra), logOf(add(mul(ra, w), sq)))
    F = add(mul(p, inv(a), sq), isZero(r) ? num(0) : mul(r, inverse))
  } else {
    if (!isZero(p)) return null
    const s = mul(delta, inv(sa < 0 ? neg(a) : a))
    const extra = sa < 0 ? mul(half(s), ra, fn('arcsin', [mul(w, inv(sqrt(s)))])) : mul(half(s), ra, logOf(add(mul(ra, w), sq)))
    F = mul(q, add(half(mul(w, sq)), extra))
  }
  return assumePositive(F, positive)
}

/** ∫ (p v + q)/(a v² + b v + c) con le lettere: 1/(x² + a²) = arctan(x/a)/a. */
function rationalLetters(f: Ex, v: string): Ex | null {
  const factors = f.t === 'mul' ? f.factors : [f]
  const below = factors.filter((x) => x.t === 'pow' && x.exp.t === 'num' && x.exp.v.n === -1n && x.exp.v.d === 1n && dependsOn(x.base, v))
  if (below.length !== 1) return null
  const Qx = (below[0] as Extract<Ex, { t: 'pow' }>).base
  const Q = quadraticIn(Qx, v)
  if (!Q || !symbols(Qx).some((n) => n !== v && n !== 'π' && n !== 'e')) return null
  const rest = factors.filter((x) => x !== below[0])
  let p = num(0)
  let q = num(f.t === 'mul' ? f.c : ONE)
  if (rest.length) {
    const lin = linear(mul(q, ...rest), v)
    if (!lin) return null
    ;({ a: p, b: q } = lin)
  }
  const { a, b, c } = Q
  const disc = sub(mul(b, b), mul(num(4), a, c))
  const sd = signOf(disc)
  if (!sd) return null
  // p v + q = (p/(2a))(2a v + b) + (q − p b/(2a)).
  const out: Ex[] = [mul(p, inv(mul(num(2), a)), sd < 0 && signOf(a) === 1 ? ln(Qx) : lnAbs(Qx))]
  const r = expand(sub(q, mul(p, b, inv(mul(num(2), a)))))
  if (!isZero(r)) {
    const u = add(mul(num(2), a, sym(v)), b)
    const s = sqrt(sd < 0 ? neg(disc) : disc)
    out.push(sd < 0 ? mul(r, num(2), inv(s), fn('arctan', [mul(u, inv(s))])) : mul(r, inv(s), lnAbs(mul(sub(u, s), inv(add(u, s))))))
  }
  return assumePositive(add(...out), positive)
}

/**
 * Prodotti di potenze di sinh e cosh (anche tanh) dello stesso a x + b, come per seno e coseno:
 * cosh² − sinh² = 1, cosh² = (1 + cosh 2u)/2. Se no, come esponenziali.
 */
function hyperbolic(f: Ex, v: string, depth: number): Ex | null {
  return hyperbolicPowers(f, v, depth) ?? hyperbolicExp(f, v, depth)
}

function hyperbolicPowers(f: Ex, v: string, depth: number): Ex | null {
  const factors = f.t === 'mul' ? f.factors : [f]
  let arg: Ex | null = null
  let m = 0
  let n = 0
  for (const x of factors) {
    const [b, e] = x.t === 'pow' ? [x.base, x.exp] : [x, num(1)]
    if (b.t !== 'fn' || !['sinh', 'cosh', 'tanh'].includes(b.name) || e.t !== 'num' || !e.v.isInteger) return null
    if (arg && key(arg) !== key(b.args[0])) return null
    arg = b.args[0]
    const k = Number(e.v.n)
    if (b.name === 'sinh') m += k
    else if (b.name === 'cosh') n += k
    else (m += k), (n -= k)
  }
  if (!arg) return null
  const L = linear(arg, v)
  if (!L) return null
  const a = inv(L.a)
  const t = fresh(f)
  const T = sym(t)
  const via = (g: Ex, back: Ex): Ex | null => {
    const G = integrate(g, t, depth + 1)
    return G && subst(G, t, back)
  }
  const odd = (k: number) => k % 2 !== 0
  // t = sinh u: cosh² = 1 + t².
  if (odd(n) && (n > 0 || !odd(m))) return via(mul(a, pow(T, num(m)), pow(add(num(1), square(T)), num(R(n - 1, 2)))), fn('sinh', [arg]))
  // t = cosh u: sinh² = t² − 1.
  if (odd(m)) return via(mul(a, pow(T, num(n)), pow(sub(square(T), num(1)), num(R(m - 1, 2)))), fn('cosh', [arg]))
  if (m >= 0 && n >= 0) {
    const c = fn('cosh', [mul(num(2), arg)])
    const g = expand(mul(pow(half(sub(c, num(1))), num(m / 2)), pow(half(add(c, num(1))), num(n / 2))))
    const power = (x: Ex) => (x.t === 'mul' ? x.factors : [x]).reduce((k, y) => (y.t === 'pow' && y.exp.t === 'num' ? k + Number(y.exp.v.n) : y.t === 'fn' ? k + 1 : k), 0)
    const out: Ex[] = []
    for (const x of (g.t === 'add' ? g.terms : [g]).slice().sort((p, q) => power(p) - power(q))) {
      const F = integrate(x, v, depth + 1)
      if (!F) return null
      out.push(F)
    }
    return add(...out)
  }
  // t = tanh u: sinh^m cosh^n du = t^m (1 − t²)^{−(m+n)/2 − 1} dt.
  return via(mul(a, pow(T, num(m)), pow(sub(num(1), square(T)), num(-(m + n) / 2 - 1))), fn('tanh', [arg]))
}

/** sinh, cosh e tanh come esponenziali, se in un altro modo non va. */
function hyperbolicExp(f: Ex, v: string, depth: number): Ex | null {
  let found = false
  const swap = (e: Ex): Ex => {
    switch (e.t) {
      case 'add':
        return add(...e.terms.map(swap))
      case 'mul':
        return mul(num(e.c), ...e.factors.map(swap))
      case 'pow':
        return pow(swap(e.base), swap(e.exp))
      case 'fn': {
        const args = e.args.map(swap)
        if (e.name === 'sinh' || e.name === 'cosh' || e.name === 'tanh') {
          found = true
          const p = pow(sym('e'), args[0])
          const m = pow(sym('e'), neg(args[0]))
          if (e.name === 'sinh') return half(sub(p, m))
          if (e.name === 'cosh') return half(add(p, m))
          return mul(sub(p, m), inv(add(p, m)))
        }
        return fn(e.name, args, e.base)
      }
      default:
        return e
    }
  }
  const g = swap(f)
  return found ? integrate(expand(g), v, depth + 1) : null
}

// ——— Il risultato ———

/**
 * I numeri davanti alle somme: 2(√x − arctan √x) = 2√x − 2 arctan √x; dentro le funzioni e le potenze
 * solo il segno, −(x³ − 1) = 1 − x³ (arctan((x + 1)/2) resta così).
 */
function distribute(e: Ex, inside = false): Ex {
  const d = (x: Ex) => distribute(x, true)
  switch (e.t) {
    case 'add':
      return add(...e.terms.map((t) => distribute(t, inside)))
    case 'mul': {
      const factors = e.factors.map(d)
      const sign = e.c.abs().n === 1n && e.c.d === 1n
      if (factors.length === 1 && factors[0].t === 'add' && (!inside || sign)) return add(...factors[0].terms.map((t) => distribute(mul(num(e.c), t), inside)))
      return mul(num(e.c), ...factors)
    }
    case 'pow':
      return pow(d(e.base), d(e.exp))
    case 'fn':
      return fn(e.name, e.args.map(d), e.base && d(e.base))
    default:
      return e
  }
}

/** c ln|A| − c ln|B| = c ln|A/B|: i logaritmi con lo stesso coefficiente insieme, come nei libri. */
function combineLogs(F: Ex): Ex {
  if (F.t !== 'add') return F
  const groups = new Map<string, { c: Rational; abs: boolean; parts: { arg: Ex; sign: number }[] }>()
  const rest: Ex[] = []
  for (const t of F.terms) {
    const c = t.t === 'mul' ? t.c : ONE
    const factors = t.t === 'mul' ? t.factors : [t]
    const log = factors.length === 1 && factors[0].t === 'fn' && factors[0].name === 'ln' ? factors[0] : null
    if (!log || log.t !== 'fn') {
      rest.push(t)
      continue
    }
    const inner = log.args[0]
    const abs = inner.t === 'fn' && inner.name === 'abs'
    const arg = abs ? (inner as Extract<Ex, { t: 'fn' }>).args[0] : inner
    const size = c.abs()
    const k = `${size.n}/${size.d}:${abs}`
    const group = groups.get(k) ?? { c: size, abs, parts: [] }
    group.parts.push({ arg, sign: c.sign })
    groups.set(k, group)
  }
  if (![...groups.values()].some((g) => g.parts.length > 1)) return F
  const out = [...rest]
  for (const g of groups.values()) {
    if (g.parts.length === 1) {
      const [p] = g.parts
      out.push(mul(num(p.sign < 0 ? g.c.neg() : g.c), g.abs ? lnAbs(p.arg) : ln(p.arg)))
      continue
    }
    // Il segno davanti quello del primo termine con il più, se c'è.
    const lead = g.parts.some((p) => p.sign > 0) ? 1 : -1
    const arg = mul(...g.parts.map((p) => (p.sign === lead ? p.arg : inv(p.arg))))
    out.push(mul(num(lead > 0 ? g.c : g.c.neg()), g.abs ? lnAbs(arg) : ln(arg)))
  }
  return add(...out)
}

const SAMPLES = [0.37, 0.83, 1.37, 2.13, -0.43, -1.21, 3.7, 0.13, -2.9, 5.3, 0.61, -0.07, 7.9, -4.6]

/** F' = f? Con i numeri, in alcuni punti (e valori a caso per le altre lettere). */
function verified(F: Ex, f: Ex, v: string): boolean {
  let dF: Ex
  try {
    dF = derive(F, v)
  } catch {
    return false
  }
  const others = [...new Set([...symbols(f), ...symbols(F)])].filter((n) => n !== v && n !== 'π' && n !== 'e')
  const scope = scopeWith(EMPTY_SCOPE, [v, ...others])
  let a: (vars: Record<string, number>) => number
  let b: (vars: Record<string, number>) => number
  try {
    a = compile(toNode(dF), scope)
    b = compile(toNode(f), scope)
  } catch {
    return false
  }
  // Le altre lettere crescenti e, se così la funzione quasi non esiste, decrescenti: √(R² − x² − y²) in y
  // esiste solo se R è più grande di x.
  for (const order of others.length > 1 ? [1, -1] : [1]) {
    const point: Record<string, number> = {}
    others.forEach((n, i) => (point[n] = 1.3 + 0.37 * (order > 0 ? i : others.length - 1 - i)))
    let good = 0
    for (const x of SAMPLES) {
      point[v] = x
      const p = a(point)
      const q = b(point)
      if (!Number.isFinite(p) && !Number.isFinite(q)) continue
      if (!Number.isFinite(p) || !Number.isFinite(q)) return false
      if (Math.abs(p - q) > 1e-7 * Math.max(1, Math.abs(q))) return false
      good++
    }
    if (good >= 2) return true
  }
  return false
}
