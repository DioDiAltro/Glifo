/**
 * L'aritmetica dei numeri interi e i polinomi: i fattori primi (360 = 2³ · 3² · 5), i divisori, se un
 * numero è primo, la divisione con il resto, l'algoritmo di Euclide e l'identità di Bézout, l'inverso
 * modulo n, la funzione di Eulero, le equazioni diofantee, le congruenze (anche i sistemi, con il teorema
 * cinese del resto), le basi (binario, esadecimale); per i polinomi la scomposizione in fattori, lo
 * sviluppo, la divisione con il resto, la regola di Ruffini (con la tabella), il mcd e il mcm.
 */
import { modInverse, modPow, Rational } from './exact'
import type { FormattedResult } from './format'
import { toLatex } from './latex'
import type { MathNode } from './parse'
import { factorQ, pdivmod, pgcd, pmul, trim, type Poly } from './polynomial'
import { asFraction, polyEx } from './primitive'
import { add, exOf, expand, mul, num, plainText, pow, sym, symbols, tidy, toNode, type Ex, type SymbolScope } from './symbolic'

const R = (n: number | bigint, d: number | bigint = 1) => new Rational(BigInt(n), BigInt(d))
const ZERO = R(0)
const ONE = R(1)

const SUPER = '⁰¹²³⁴⁵⁶⁷⁸⁹'
const SUB = '₀₁₂₃₄₅₆₇₈₉'
const sup = (n: number) => [...String(n)].map((d) => SUPER[Number(d)]).join('')
const sub = (n: number) => [...String(n)].map((d) => SUB[Number(d)]).join('')

const abs = (n: bigint) => (n < 0n ? -n : n)
/** Il resto tra 0 e m − 1, anche per i negativi. */
const mod = (a: bigint, m: bigint) => ((a % m) + m) % m
/** Come si scrive un intero nel testo: con il segno meno vero. */
const int = (n: bigint) => String(n).replace('-', '−')
/** Tra parentesi se è negativo: 5 · (−3). */
const factorTex = (n: bigint) => (n < 0n ? `(${n})` : `${n}`)
const factorText = (n: bigint) => (n < 0n ? `(${int(n)})` : `${n}`)

export function gcd(a: bigint, b: bigint): bigint {
  a = abs(a)
  b = abs(b)
  while (b) [a, b] = [b, a % b]
  return a
}

/** a x + b y = mcd(a, b): i coefficienti di Bézout (con l'algoritmo di Euclide esteso). */
function bezout(a: bigint, b: bigint): { g: bigint; x: bigint; y: bigint } {
  let [r0, r1, s0, s1, t0, t1] = [a, b, 1n, 0n, 0n, 1n]
  while (r1) {
    const q = r0 / r1
    ;[r0, r1] = [r1, r0 - q * r1]
    ;[s0, s1] = [s1, s0 - q * s1]
    ;[t0, t1] = [t1, t0 - q * t1]
  }
  return r0 < 0n ? { g: -r0, x: -s0, y: -t0 } : { g: r0, x: s0, y: t0 }
}

/** Un numero intero, se il valore lo è (12, −5, 2^{10}); null se no. */
function integerOf(node: MathNode, scope: SymbolScope): bigint | null {
  try {
    const e = tidy(exOf(node, scope))
    return e.t === 'num' && e.v.isInteger ? e.v.n : null
  } catch {
    return null
  }
}

// ——— I numeri interi ———

/** I fattori primi con l'esponente, per |n| ≤ 10¹⁴ (con le divisioni fino alla radice). */
export function primeFactors(n: bigint): { p: bigint; e: number }[] | null {
  n = abs(n)
  if (n > 10n ** 14n) return null
  const out: { p: bigint; e: number }[] = []
  const take = (p: bigint) => {
    let e = 0
    while (n % p === 0n) {
      n /= p
      e++
    }
    if (e) out.push({ p, e })
  }
  take(2n)
  take(3n)
  for (let p = 5n; p * p <= n; p += 6n) {
    take(p)
    take(p + 2n)
  }
  if (n > 1n) out.push({ p: n, e: 1 })
  return out
}

const SMALL_PRIMES = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n]

/** Se n è primo, anche grande (Miller–Rabin con le basi che bastano fino a 3·10²⁴). */
export function isPrime(n: bigint): boolean {
  if (n < 2n) return false
  for (const p of SMALL_PRIMES) {
    if (n === p) return true
    if (n % p === 0n) return false
  }
  let d = n - 1n
  let s = 0
  while (d % 2n === 0n) {
    d /= 2n
    s++
  }
  witness: for (const a of SMALL_PRIMES) {
    let x = modPow(a, d, n)
    if (x === 1n || x === n - 1n) continue
    for (let r = 1; r < s; r++) {
      x = (x * x) % n
      if (x === n - 1n) continue witness
    }
    return false
  }
  return true
}

function factorsShown(n: bigint): FormattedResult | null {
  if (abs(n) < 2n) return { tex: String(n), text: int(n) }
  const f = primeFactors(n)
  if (!f) return null
  const sign = n < 0n
  return {
    tex: `${sign ? '-' : ''}${f.map(({ p, e }) => (e > 1 ? `${p}^{${e}}` : `${p}`)).join(' \\cdot ')}`,
    text: `${sign ? '−' : ''}${f.map(({ p, e }) => (e > 1 ? `${p}${sup(e)}` : `${p}`)).join(' · ')}`,
  }
}

export function divisors(n: bigint): bigint[] | null {
  const f = primeFactors(n)
  if (!f) return null
  let out = [1n]
  for (const { p, e } of f) {
    const next: bigint[] = []
    for (const d of out) for (let k = 0, q = 1n; k <= e; k++, q *= p) next.push(d * q)
    out = next
  }
  return out.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
}

/** La funzione di Eulero: quanti numeri da 1 a n sono primi con n. */
export function totient(n: bigint): bigint | null {
  if (n < 1n) return null
  const f = primeFactors(n)
  if (!f) return null
  return f.reduce((acc, { p }) => (acc / p) * (p - 1n), n)
}

const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function toBase(n: bigint, b: number): string {
  if (n === 0n) return '0'
  let m = abs(n)
  let out = ''
  const B = BigInt(b)
  while (m > 0n) {
    out = DIGITS[Number(m % B)] + out
    m /= B
  }
  return (n < 0n ? '-' : '') + out
}

/** L'algoritmo di Euclide passo per passo, fino al massimo comun divisore. */
function euclidShown(a: bigint, b: bigint): FormattedResult | null {
  if (a === 0n && b === 0n) return null
  let [x, y] = [abs(a), abs(b)]
  if (x < y) [x, y] = [y, x]
  const tex: string[] = []
  const text: string[] = []
  while (y) {
    const q = x / y
    const r = x % y
    tex.push(r ? `${x} = ${q} \\cdot ${y} + ${r}` : `${x} = ${q} \\cdot ${y}`)
    text.push(r ? `${x} = ${q} · ${y} + ${r}` : `${x} = ${q} · ${y}`)
    ;[x, y] = [y, r]
  }
  tex.push(`\\gcd(${a}, ${b}) = ${x}`)
  text.push(`mcd = ${x}`)
  return { tex: `\\begin{array}{l} ${tex.join(' \\\\ ')} \\end{array}`, text: text.join('; '), rich: true }
}

// ——— Le congruenze ———

/** a x ≡ b (mod m): le soluzioni x ≡ r (mod n); null se non ce ne sono. */
function linearCongruence(a: bigint, b: bigint, m: bigint): { r: bigint; n: bigint } | null {
  const g = gcd(a, m)
  if (g === 0n) return mod(b, m) === 0n ? { r: 0n, n: 1n } : null
  if (mod(b, g) !== 0n) return null
  const n = m / g
  const inv = modInverse(a / g, n)
  return inv === null ? null : { r: mod((b / g) * inv, n), n }
}

/** x ≡ r₁ (mod n₁) e x ≡ r₂ (mod n₂): una congruenza sola (il teorema cinese del resto, anche con i moduli non primi tra loro). */
function combine(p: { r: bigint; n: bigint }, q: { r: bigint; n: bigint }): { r: bigint; n: bigint } | null {
  // p.r + p.n t ≡ q.r (mod q.n)
  const t = linearCongruence(p.n, q.r - p.r, q.n)
  if (!t) return null
  const n = (p.n / gcd(p.n, q.n)) * q.n
  return { r: mod(p.r + p.n * t.r, n), n }
}

/** I coefficienti interi (dal grado 0) di un polinomio nella lettera x; null se non sono interi. */
function integerPoly(F: Ex, x: string): bigint[] | null {
  const frac = asFraction(F, x)
  if (!frac || trim(frac.D).length !== 1) return null
  const coeffs = trim(frac.N).map((c) => c.div(frac.D[0]))
  return coeffs.every((c) => c.isInteger) ? coeffs.map((c) => c.n) : null
}

const NONE: FormattedResult = { tex: '\\text{nessuna soluzione}', text: 'nessuna soluzione' }

/**
 * Le congruenze di una richiesta con ⇒ (3x \equiv 2 \pmod{5}, anche più insieme): la soluzione
 * x ≡ r (mod n), o «nessuna soluzione»; quelle di grado più alto (x^2 \equiv 1 \pmod{8}) provando tutti i
 * resti. Null se non sono congruenze in una incognita.
 */
export function solveCongruences(nodes: MathNode[], scope: SymbolScope): FormattedResult | null {
  if (!nodes.length || nodes.some((n) => n.k !== 'congr')) return null
  let x: string | null = null
  const polys: { c: bigint[]; m: bigint }[] = []
  for (const n of nodes as Extract<MathNode, { k: 'congr' }>[]) {
    let F: Ex
    try {
      F = expand(exOf({ k: 'bin', op: '-', a: n.a, b: n.b }, scope))
    } catch {
      return null
    }
    const m = integerOf(n.m, scope)
    const letters = symbols(F).filter((s) => s !== 'π' && s !== 'e')
    if (m === null || m < 1n || letters.length !== 1 || (x && letters[0] !== x)) return null
    x = letters[0]
    const c = integerPoly(F, x)
    if (!c) return null
    polys.push({ c, m })
  }
  const name = x!
  if (polys.some((p) => p.c.length > 2)) {
    // Di grado più alto: tutti i resti, una congruenza sola con il modulo non troppo grande.
    if (polys.length > 1 || polys[0].m > 100000n) return null
    const { c, m } = polys[0]
    const roots: bigint[] = []
    for (let r = 0n; r < m; r++) {
      let v = 0n
      for (let k = c.length - 1; k >= 0; k--) v = (v * r + c[k]) % m
      if (v === 0n) roots.push(r)
    }
    if (!roots.length) return NONE
    return { tex: `${name} \\equiv ${roots.join(', ')} \\pmod{${m}}`, text: `${name} ≡ ${roots.join(', ')} (mod ${m})` }
  }
  let acc: { r: bigint; n: bigint } = { r: 0n, n: 1n }
  for (const { c, m } of polys) {
    const sol = linearCongruence(c[1] ?? 0n, -(c[0] ?? 0n), m)
    if (!sol) return NONE
    const next = combine(acc, sol)
    if (!next) return { tex: '\\text{nessuna soluzione (le congruenze non sono compatibili)}', text: 'nessuna soluzione (le congruenze non sono compatibili)' }
    acc = next
  }
  const { r, n } = acc
  if (n === 1n) return { tex: `\\text{ogni } ${name} \\in \\mathbb{Z}`, text: `ogni ${name} intero` }
  // Una congruenza sola con il modulo diviso (6x ≡ 4 mod 10 → x ≡ 4 mod 5): anche i resti modulo 10.
  const m = polys.length === 1 ? polys[0].m : n
  if (m !== n && m / n <= 12n) {
    const all = Array.from({ length: Number(m / n) }, (_, k) => r + BigInt(k) * n)
    return {
      tex: `${name} \\equiv ${r} \\pmod{${n}},\\ \\text{cioè } ${name} \\equiv ${all.join(', ')} \\pmod{${m}}`,
      text: `${name} ≡ ${r} (mod ${n}), cioè ${name} ≡ ${all.join(', ')} (mod ${m})`,
    }
  }
  return { tex: `${name} \\equiv ${r} \\pmod{${n}}`, text: `${name} ≡ ${r} (mod ${n})` }
}

/** I coefficienti di a x + b y + c (interi, anche dopo aver tolto i denominatori); null se non è di primo grado. */
function linearIn(F: Ex, vars: string[]): bigint[] | null {
  const coeffs = vars.map(() => ZERO)
  let constant = ZERO
  for (const t of F.t === 'add' ? F.terms : [F]) {
    if (t.t === 'num') constant = constant.add(t.v)
    else if (t.t === 'sym' && vars.includes(t.name)) coeffs[vars.indexOf(t.name)] = coeffs[vars.indexOf(t.name)].add(ONE)
    else if (t.t === 'mul' && t.factors.length === 1 && t.factors[0].t === 'sym' && vars.includes(t.factors[0].name)) {
      const k = vars.indexOf(t.factors[0].name)
      coeffs[k] = coeffs[k].add(t.c)
    } else return null
  }
  const all = [...coeffs, constant]
  let den = 1n
  for (const c of all) den = (den * c.d) / gcd(den, c.d)
  return all.map((c) => (c.n * den) / c.d)
}

/** a + s k, scritto bene: 4 + 5k, −1 − 3k, k. */
function lineInK(a: bigint, s: bigint, text: boolean): string {
  const k = abs(s) === 1n ? 'k' : `${abs(s)}k`
  const minus = text ? '−' : '-'
  if (a === 0n) return s < 0n ? `${minus}${k}` : k
  return `${text ? int(a) : a} ${s < 0n ? minus : '+'} ${k}`
}

/** a x + b y = c negli interi: tutte le soluzioni, x = x₀ + (b/d) k, y = y₀ − (a/d) k. */
function diophantineShown(node: MathNode, scope: SymbolScope): FormattedResult | null {
  if (node.k !== 'rel' || node.ops.length !== 1 || node.ops[0] !== '=') return null
  let F: Ex
  try {
    F = expand(exOf({ k: 'bin', op: '-', a: node.items[0], b: node.items[1] }, scope))
  } catch {
    return null
  }
  const vars = symbols(F).filter((s) => s !== 'π' && s !== 'e').sort()
  if (vars.length !== 2) return null
  const coeffs = linearIn(F, vars)
  if (!coeffs) return null
  const [a, b, k] = coeffs
  const c = -k
  if (a === 0n || b === 0n) return null
  const { g, x: s } = bezout(a, b)
  if (mod(c, g) !== 0n) {
    return {
      tex: `\\text{nessuna soluzione intera: } \\gcd(${abs(a)}, ${abs(b)}) = ${g} \\text{ non divide } ${c}`,
      text: `nessuna soluzione intera: mcd(${abs(a)}, ${abs(b)}) = ${g} non divide ${int(c)}`,
    }
  }
  // La soluzione con x il più piccolo possibile tra 0 e |b|/d − 1, e il passo di x positivo.
  const sx = abs(b) / g
  const x0 = mod(s * (c / g), sx)
  const y0 = (c - a * x0) / b
  const sy = b > 0n ? -a / g : a / g
  const [u, v] = vars
  return {
    tex: `\\begin{cases} ${u} = ${lineInK(x0, sx, false)} \\\\ ${v} = ${lineInK(y0, sy, false)} \\end{cases} \\quad k \\in \\mathbb{Z}`,
    text: `${u} = ${lineInK(x0, sx, true)}, ${v} = ${lineInK(y0, sy, true)} (k ∈ ℤ)`,
    rich: true,
  }
}

// ——— I polinomi ———

/** Un polinomio in una lettera con i coefficienti frazioni: la lettera e i coefficienti (dal grado 0). */
function polynomialOf(node: MathNode, scope: SymbolScope): { v: string; p: Poly } | null {
  let e: Ex
  try {
    e = expand(exOf(node, scope))
  } catch {
    return null
  }
  const letters = symbols(e).filter((s) => s !== 'π' && s !== 'e')
  if (letters.length !== 1) return null
  const frac = asFraction(e, letters[0])
  if (!frac || trim(frac.D).length !== 1) return null
  return { v: letters[0], p: trim(frac.N.map((c) => c.div(frac.D[0]))) }
}

function polyShown(p: Poly, v: string): { tex: string; text: string } {
  const n = toNode(tidy(polyEx(p.length ? p : [ZERO], v)))
  return { tex: toLatex(n), text: plainText(n) }
}

function numShown(r: Rational): { tex: string; text: string } {
  const n = toNode({ t: 'num', v: r })
  return { tex: toLatex(n), text: plainText(n) }
}

/** Il polinomio con i coefficienti interi primi tra loro e il primo positivo, e per quanto si è moltiplicato. */
function primitivePart(p: Poly): { p: Poly; k: Rational } {
  let den = 1n
  for (const c of p) den = (den * c.d) / gcd(den, c.d)
  let g = 0n
  for (const c of p) g = gcd(g, (c.n * den) / c.d)
  let k = new Rational(den, g || 1n)
  if (p[p.length - 1].mul(k).sign < 0) k = k.neg()
  return { p: p.map((c) => c.mul(k)), k }
}

/** Un fattore della scomposizione: come si scrive, quante volte c'è, se è una somma (allora va tra parentesi). */
interface Part {
  tex: string
  text: string
  m: number
  sum: boolean
  /** Per metterli in ordine: il grado, poi le lettere da sole prima, poi il termine noto (x − 1 prima di x + 1, x − 2 prima di x − 3). */
  deg: number
  known?: Rational
}

/** Una somma di monomi scritta nell'ordine dato, con i segni: x − 2y, a² + ab + b². */
function sumShown(terms: { c: Rational; mono: Ex }[]): { tex: string; text: string } {
  const live = terms.filter((t) => t.c.sign !== 0)
  let tex = ''
  let text = ''
  live.forEach(({ c, mono }, i) => {
    const n = toNode(tidy(mul(num(c.abs()), mono)))
    const negative = c.sign < 0
    tex += i === 0 ? (negative ? '-' : '') : negative ? ' - ' : ' + '
    text += i === 0 ? (negative ? '−' : '') : negative ? ' − ' : ' + '
    tex += toLatex(n)
    text += plainText(n)
  })
  return live.length ? { tex, text } : { tex: '0', text: '0' }
}

/** Le potenze di più lettere: x^2 y. */
const monomial = (powers: [string, number][]): Ex => mul(...powers.filter(([, k]) => k > 0).map(([l, k]) => pow(sym(l), num(k))))

/** Un polinomio in una lettera (dal grado 0) come fattore, dal grado più alto: x² − 3x + 2. */
function polyPart(p: Poly, v: string, m: number): Part {
  const terms = p.map((c, i) => ({ c, mono: monomial([[v, i]]) })).reverse()
  const live = p.filter((c) => c.sign !== 0).length
  return { ...sumShown(terms), m, sum: live > 1, deg: p.length - 1, known: p[0] }
}

/**
 * I fattori di un polinomio in una lettera (con le frazioni); quelli di grado 4 o più che restano si provano
 * anche con t = x^k, se ci sono solo le potenze multiple di k: x⁶ − 5x³ + 6 = (x³ − 2)(x³ − 3).
 */
function factorsOf(p: Poly, depth = 0): { lead: Rational; factors: { p: Poly; m: number }[] } {
  const { lead, factors } = factorQ(trim(p))
  const out: { p: Poly; m: number }[] = []
  for (const f of factors) {
    let k = 0
    f.p.forEach((c, i) => {
      if (c.sign !== 0) k = Number(gcd(BigInt(k), BigInt(i)))
    })
    if (f.p.length <= 4 || k < 2 || depth > 3) {
      out.push(f)
      continue
    }
    // In t = x^k: ogni fattore g(t) torna g(x^k), e si scompone ancora.
    const inT = factorsOf(f.p.filter((_, i) => i % k === 0), depth + 1)
    if (inT.factors.length < 2 && inT.factors.every((g) => g.m === 1)) {
      out.push(f)
      continue
    }
    for (const g of inT.factors) {
      const back: Poly = Array.from({ length: (g.p.length - 1) * k + 1 }, (_, i) => (i % k === 0 ? g.p[i / k] : ZERO))
      for (const h of factorsOf(back, depth + 1).factors) out.push({ p: h.p, m: h.m * g.m * f.m })
    }
  }
  return { lead, factors: out }
}

/** I fattori di un polinomio in una lettera, con i coefficienti interi; c è quello che resta davanti. */
function univariateParts(p: Poly, v: string): { c: Rational; parts: Part[] } {
  const { lead, factors } = factorsOf(p)
  let c = lead
  const parts = factors.map((f) => {
    const prim = primitivePart(f.p)
    c = c.div(prim.k.powInt(BigInt(f.m)))
    return polyPart(prim.p, v, f.m)
  })
  return { c, parts }
}

/** I coefficienti di un polinomio omogeneo in u e v (c_k per u^k v^{d−k}) e il grado d; null se non lo è. */
function homogeneous(e: Ex, u: string, v: string): { c: Rational[]; d: number } | null {
  const powers: { k: number; j: number; c: Rational }[] = []
  for (const t of e.t === 'add' ? e.terms : [e]) {
    const term = termPowers(t)
    if (!term || Object.keys(term.powers).some((l) => l !== u && l !== v)) return null
    powers.push({ k: term.powers[u] ?? 0, j: term.powers[v] ?? 0, c: term.c })
  }
  const d = powers.length ? powers[0].k + powers[0].j : 0
  if (!powers.length || powers.some((p) => p.k + p.j !== d) || d > 24) return null
  const c = Array.from({ length: d + 1 }, () => ZERO)
  for (const p of powers) c[p.k] = c[p.k].add(p.c)
  return { c, d }
}

/**
 * I fattori di un polinomio omogeneo in due lettere (i prodotti notevoli): a² − b² = (a − b)(a + b),
 * x² + 2xy + y² = (x + y)². Si scompone in t = u/v e si torna a u e v. Prima la lettera che lascia
 * il segno più davanti (x² − a² = (x − a)(x + a)).
 */
function homogeneousParts(e: Ex, letters: string[]): { c: Rational; parts: Part[] } | null {
  let best: { c: Rational; parts: Part[] } | null = null
  for (const [u, v] of [letters, [...letters].reverse()]) {
    const h = homogeneous(e, u, v)
    if (!h) return null
    const p = trim(h.c)
    const { lead, factors } = factorQ(p)
    let c = lead
    const parts: Part[] = factors.map((f) => {
      const prim = primitivePart(f.p)
      c = c.div(prim.k.powInt(BigInt(f.m)))
      const e = prim.p.length - 1
      const terms = prim.p.map((k, i) => ({ c: k, mono: monomial([[u, i], [v, e - i]]) })).reverse()
      const live = prim.p.filter((k) => k.sign !== 0).length
      return { ...sumShown(terms), m: f.m, sum: live > 1, deg: e, known: prim.p[0] }
    })
    // v^{d − grado in t}: quello che manca al grado.
    const missing = h.d - (p.length - 1)
    if (missing > 0) parts.push({ ...sumShown([{ c: ONE, mono: sym(v) }]), m: missing, sum: false, deg: 1 })
    if (c.sign > 0) return { c, parts }
    best ??= { c, parts }
  }
  return best
}

/** Un monomio: il coefficiente e le potenze delle lettere; null se non lo è. */
function termPowers(t: Ex): { c: Rational; powers: Record<string, number> } | null {
  if (t.t === 'num') return { c: t.v, powers: {} }
  const c = t.t === 'mul' ? t.c : ONE
  const powers: Record<string, number> = {}
  for (const f of t.t === 'mul' ? t.factors : [t]) {
    const base = f.t === 'pow' ? f.base : f
    const exp = f.t === 'pow' ? f.exp : num(1)
    if (base.t !== 'sym' || exp.t !== 'num' || !exp.v.isInteger || exp.v.sign < 0) return null
    powers[base.name] = (powers[base.name] ?? 0) + Number(exp.v.n)
  }
  return { c, powers }
}

/**
 * La scomposizione in fattori: prima il raccoglimento (il mcd dei coefficienti e le lettere comuni), poi
 * quello che resta, se è in una lettera (2x² − 2 = 2(x − 1)(x + 1)) o omogeneo in due (a² − b²).
 */
function factorShown(e: Ex, letters: string[]): FormattedResult | null {
  const terms = (e.t === 'add' ? e.terms : [e]).map(termPowers)
  if (!terms.length || terms.some((t) => !t)) return null
  // Il raccoglimento totale: il mcd dei coefficienti (con il segno del primo termine) e le lettere comuni.
  let den = 1n
  let g = 0n
  for (const t of terms) den = (den * t!.c.d) / gcd(den, t!.c.d)
  for (const t of terms) g = gcd(g, (t!.c.n * den) / t!.c.d)
  const common = letters.map((l) => [l, Math.min(...terms.map((t) => t!.powers[l] ?? 0))] as [string, number])
  const factorOut = new Rational(g || 1n, den)
  let c = factorOut
  const parts: Part[] = common.filter(([, k]) => k > 0).map(([l, k]) => ({ ...sumShown([{ c: ONE, mono: sym(l) }]), m: k, sum: false, deg: 0 }))
  const rest = expand(add(...terms.map((t) => mul(num(t!.c.div(factorOut)), monomial(letters.map((l, i) => [l, (t!.powers[l] ?? 0) - common[i][1]] as [string, number]))))))
  const left = symbols(rest).filter((s) => s !== 'π' && s !== 'e').sort()
  let inner: { c: Rational; parts: Part[] } | null = null
  if (left.length === 1) {
    const frac = asFraction(rest, left[0])
    if (frac && trim(frac.D).length === 1) inner = univariateParts(frac.N.map((k) => k.div(frac.D[0])), left[0])
  } else if (left.length === 2) inner = homogeneousParts(rest, left)
  if (inner) {
    c = c.mul(inner.c)
    parts.push(...inner.parts)
  } else if (left.length) {
    const n = toNode(tidy(rest))
    parts.push({ tex: toLatex(n), text: plainText(n), m: 1, sum: rest.t === 'add', deg: 99 })
  } else c = c.mul(rest.t === 'num' ? rest.v : ONE)
  if (!parts.length) return null
  const order = (r?: Rational) => (r ? Math.abs(r.toNumber()) + (r.sign > 0 ? 0.5 : 0) : 0)
  parts.sort((a, b) => a.deg - b.deg || Number(a.sum) - Number(b.sum) || order(a.known) - order(b.known))
  const alone = parts.length === 1 && parts[0].m === 1 && c.cmp(ONE) === 0
  const shown = parts.map(({ tex, text, m, sum }) => {
    const wrap = sum && !alone
    const t = wrap ? `\\left(${tex}\\right)` : tex
    const x = wrap ? `(${text})` : text
    return { tex: m > 1 ? `${t}^{${m}}` : t, text: m > 1 ? `${x}${sup(m)}` : x }
  })
  const k = numShown(c)
  const constant = c.cmp(ONE) === 0 ? { tex: '', text: '' } : c.cmp(R(-1)) === 0 ? { tex: '-', text: '−' } : { tex: k.tex, text: c.isInteger ? k.text : `(${k.text})` }
  // In una lettera, di secondo o terzo grado senza radici frazioni: non si scompone (con le frazioni).
  const irreducible = alone && letters.length === 1 && parts[0].deg >= 2 && parts[0].deg <= 3
  return {
    tex: `${constant.tex}${shown.map((f) => f.tex).join('')}${irreducible ? '\\quad (\\text{irriducibile in } \\mathbb{Q})' : ''}`,
    text: `${constant.text}${shown.map((f) => f.text).join('')}${irreducible ? ' (irriducibile in ℚ)' : ''}`,
  }
}

/** La divisione con il resto: di numeri interi (17 = 5 · 3 + 2) o di polinomi (quoziente e resto). */
function divisionShown(a: MathNode, b: MathNode, scope: SymbolScope): FormattedResult | null {
  const n = integerOf(a, scope)
  const d = integerOf(b, scope)
  if (n !== null && d !== null) {
    if (d === 0n) return null
    // Il resto tra 0 e |d| − 1.
    const r = mod(n, abs(d))
    const q = (n - r) / d
    return { tex: `${n} = ${d} \\cdot ${factorTex(q)} + ${r}`, text: `${int(n)} = ${int(d)} · ${factorText(q)} + ${r} (quoziente ${int(q)}, resto ${r})` }
  }
  const P = polynomialOf(a, scope)
  const D = polynomialOf(b, scope)
  if (!P || !D || P.v !== D.v || !D.p.length) return null
  const { q, r } = pdivmod(P.p, D.p)
  const Q = polyShown(q, P.v)
  const Rm = polyShown(r, P.v)
  return { tex: `Q(${P.v}) = ${Q.tex},\\quad R(${P.v}) = ${Rm.tex}`, text: `Q(${P.v}) = ${Q.text}, R(${P.v}) = ${Rm.text}`, rich: true }
}

/** La regola di Ruffini per P(x) : (x − a) (o : (bx − a)): la tabella, il quoziente e il resto. */
function ruffiniShown(a: MathNode, b: MathNode, scope: SymbolScope): FormattedResult | null {
  const P = polynomialOf(a, scope)
  if (!P || P.p.length < 2) return null
  let root: Rational
  let lead = ONE
  let e: Ex
  try {
    e = tidy(exOf(b, scope))
  } catch {
    return null
  }
  // \operatorname{ruffini}(P, x - 2), \operatorname{ruffini}(P, 2x - 1) o \operatorname{ruffini}(P, 2).
  if (e.t === 'num') root = e.v
  else {
    const D = polynomialOf(b, scope)
    if (!D || D.v !== P.v || D.p.length !== 2) return null
    lead = D.p[1]
    root = D.p[0].neg().div(lead)
  }
  const coeffs = [...P.p].reverse()
  const products: Rational[] = [ZERO]
  const sums: Rational[] = [coeffs[0]]
  for (let i = 1; i < coeffs.length; i++) {
    products.push(sums[i - 1].mul(root))
    sums.push(coeffs[i].add(products[i]))
  }
  const cell = (r: Rational) => numShown(r).tex
  const n = coeffs.length
  const table = [
    `& ${coeffs.map(cell).join(' & ')}`,
    `${cell(root)} & ${products.map((p, i) => (i === 0 ? '' : cell(p))).join(' & ')}`,
    `\\hline & ${sums.map(cell).join(' & ')}`,
  ].join(' \\\\ ')
  // Dividendo per bx − a il quoziente di Ruffini va diviso per b.
  const quotient = polyShown([...sums.slice(0, -1)].reverse().map((c) => c.div(lead)), P.v)
  const remainder = numShown(sums[n - 1])
  return {
    tex: `\\begin{array}{c|${'c'.repeat(n - 1)}|c} ${table} \\end{array}\\qquad Q(${P.v}) = ${quotient.tex},\\ R = ${remainder.tex}`,
    text: `Q(${P.v}) = ${quotient.text}, R = ${remainder.text}`,
    rich: true,
  }
}

/** Le funzioni di questo modulo, con i nomi di parse.ts. */
export const ARITHMETIC = new Set(['factor', 'divisors', 'isprime', 'division', 'ruffini', 'expandpoly', 'modinv', 'base', 'binary', 'hex', 'totient', 'diophantine', 'bezout', 'euclid', 'gcd', 'lcm'])

/**
 * Le funzioni dell'aritmetica e dei polinomi: \operatorname{fattori}, \operatorname{divisori},
 * \operatorname{primo}, \operatorname{divisione}, \operatorname{ruffini}, \operatorname{sviluppa},
 * \operatorname{inverso}(a, n), \operatorname{base}(n, b), \operatorname{binario}, \operatorname{esadecimale},
 * \operatorname{totiente}, \operatorname{diofantea}, \operatorname{bezout}, \operatorname{euclide}, e il mcd e
 * il mcm dei polinomi. Null se la formula è altro (il mcd di numeri lo calcola il conto di sempre).
 */
export function arithmeticShown(node: MathNode, scope: SymbolScope): FormattedResult | null {
  if (node.k !== 'fn' || node.pow || !ARITHMETIC.has(node.name)) return null
  const [a, b] = node.args
  const one = node.args.length === 1
  const two = node.args.length === 2
  switch (node.name) {
    case 'factor': {
      if (!one) return null
      const n = integerOf(a, scope)
      if (n !== null) return factorsShown(n)
      try {
        const e = expand(exOf(a, scope))
        const letters = symbols(e).filter((s) => s !== 'π' && s !== 'e').sort()
        return letters.length ? factorShown(e, letters) : null
      } catch {
        return null
      }
    }
    case 'divisors': {
      const n = one ? integerOf(a, scope) : null
      if (n === null || n === 0n) return null
      const ds = divisors(n)
      return ds && { tex: `${ds.join(',\\ ')}\\quad (${ds.length}\\ \\text{divisori})`, text: `${ds.join(', ')} (${ds.length} divisori)` }
    }
    case 'isprime': {
      const n = one ? integerOf(a, scope) : null
      if (n === null) return null
      if (isPrime(n)) return { tex: `\\text{sì, } ${n} \\text{ è primo}`, text: `sì, ${n} è primo` }
      const f = n >= 2n ? factorsShown(n) : null
      return f ? { tex: `\\text{no: } ${n} = ${f.tex}`, text: `no: ${n} = ${f.text}` } : { tex: '\\text{no}', text: 'no' }
    }
    case 'totient': {
      const n = one ? integerOf(a, scope) : null
      const phi = n === null ? null : totient(n)
      return phi === null ? null : { tex: String(phi), text: String(phi) }
    }
    case 'division':
      return two ? divisionShown(a, b, scope) : null
    case 'ruffini':
      return two ? ruffiniShown(a, b, scope) : null
    case 'expandpoly': {
      if (!one) return null
      // Con una lettera sola: dal grado più alto, senza raccogliere niente.
      const P = polynomialOf(a, scope)
      if (P) return { ...polyShown(P.p, P.v), rich: true }
      try {
        const n = toNode(tidy(expand(exOf(a, scope))))
        return { tex: toLatex(n), text: plainText(n), rich: true }
      } catch {
        return null
      }
    }
    case 'modinv': {
      const x = two ? integerOf(a, scope) : null
      const m = two ? integerOf(b, scope) : null
      if (x === null || m === null || m < 2n) return null
      const inv = modInverse(x, m)
      return inv === null
        ? { tex: `\\nexists\\ (\\gcd(${x}, ${m}) = ${gcd(x, m)})`, text: `non esiste (mcd(${x}, ${m}) = ${gcd(x, m)})` }
        : { tex: `${inv}\\quad (${x} \\cdot ${inv} \\equiv 1 \\pmod{${m}})`, text: `${inv} (${x} · ${inv} ≡ 1 mod ${m})` }
    }
    case 'base':
    case 'binary':
    case 'hex': {
      const n = node.name === 'base' ? (two ? integerOf(a, scope) : null) : one ? integerOf(a, scope) : null
      const base = node.name === 'binary' ? 2 : node.name === 'hex' ? 16 : Number(integerOf(b, scope) ?? NaN)
      if (n === null || !(base >= 2 && base <= 36)) return null
      const digits = toBase(n, base)
      return { tex: `\\left(${digits.replace('-', '-\\,')}\\right)_{${base}}`, text: `(${digits.replace('-', '−')})${sub(base)}` }
    }
    case 'diophantine':
      return one ? diophantineShown(a, scope) : null
    case 'bezout': {
      const x = two ? integerOf(a, scope) : null
      const y = two ? integerOf(b, scope) : null
      if (x === null || y === null || (x === 0n && y === 0n)) return null
      const { g, x: s, y: t } = bezout(x, y)
      return {
        tex: `\\gcd(${x}, ${y}) = ${g} = ${factorTex(x)} \\cdot ${factorTex(s)} + ${factorTex(y)} \\cdot ${factorTex(t)}`,
        text: `mcd = ${g} = ${factorText(x)} · ${factorText(s)} + ${factorText(y)} · ${factorText(t)}`,
      }
    }
    case 'euclid': {
      const x = two ? integerOf(a, scope) : null
      const y = two ? integerOf(b, scope) : null
      return x === null || y === null ? null : euclidShown(x, y)
    }
    case 'gcd':
    case 'lcm': {
      // Il mcd e il mcm di polinomi (con i numeri ci pensa il calcolo di sempre).
      if (!two || node.args.every((x) => integerOf(x, scope) !== null)) return null
      const P = polynomialOf(a, scope)
      const Q = polynomialOf(b, scope)
      if (!P || !Q || P.v !== Q.v) return null
      const g = pgcd(P.p, Q.p)
      const out = node.name === 'gcd' ? g : pdivmod(pmul(P.p, Q.p), g).q
      if (trim(out).length <= 1) return { tex: '1', text: '1' }
      return factorShown(expand(polyEx(primitivePart(trim(out)).p, P.v)), [P.v])
    }
    default:
      return null
  }
}
