/**
 * I sistemi lineari. Con le incognite scritte (x + y = 3, x − y = 1) la riduzione a scala; con la matrice
 * (A x = b) Rouché–Capelli: una soluzione, infinite (con i parametri t, s…) o nessuna, con i ranghi; con
 * un parametro (x + k y = 1, k x + y = 1) la discussione al variare del parametro: i valori dove il rango
 * cambia sono le radici dei minori (i loro determinanti, polinomi nel parametro).
 */
import { MathError } from './evaluate'
import { Rational } from './exact'
import { formatNumber, formatRational, type FormatOptions, type FormattedResult } from './format'
import { nameLatex, toLatex } from './latex'
import { EXACT, evaluateLinear, FLOAT, polynomialIn, rref, type LinearScope, type Mat } from './linear'
import { namesIn, type MathNode } from './parse'
import { degree, numericRoots, padd, pdivmod, pgcd, pmul, psub, pvalue, rationalRoots, trim, type Poly } from './polynomial'
import { add, mapNode, mul, num, plainText, pow, sym, tidy, toNode, type Ex } from './symbolic'

const ZERO = Rational.int(0)
const ONE = Rational.int(1)

/** Le soluzioni di un sistema lineare dalle righe [a₁, …, aₙ, c] (a₁x₁ + … + aₙxₙ = c), con le frazioni. */
export function linearSystem(rows: Rational[][], unknowns: string[], options: FormatOptions): FormattedResult {
  const { r, pivots } = rref(EXACT, rows)
  const n = unknowns.length
  // Una riga 0 = c (c ≠ 0): impossibile.
  if (r.some((row) => row.slice(0, n).every((c) => c.sign === 0) && row[n].sign !== 0)) return { tex: '\\nexists\\ \\text{(impossibile)}', text: 'nessuna soluzione (impossibile)' }
  const parts: FormattedResult[] = []
  const free = unknowns.filter((_, j) => !pivots.includes(j))
  pivots.forEach((col, i) => {
    // x = c − a y − b z (le variabili libere restano).
    const terms: { tex: string; text: string; neg: boolean }[] = []
    const c = r[i][n]
    if (c.sign !== 0 || free.length === 0) terms.push({ ...formatRational(c.abs(), options), neg: c.sign < 0 })
    unknowns.forEach((u, j) => {
      if (pivots.includes(j)) return
      const a = r[i][j].neg()
      if (a.sign === 0) return
      const abs = a.abs()
      const coef = abs.n === 1n && abs.d === 1n ? { tex: '', text: '' } : formatRational(abs, options)
      terms.push({ tex: `${coef.tex}${nameLatex(u)}`, text: `${coef.text}${u}`, neg: a.sign < 0 })
    })
    const tex = terms.map((t, k) => (k === 0 ? `${t.neg ? '-' : ''}${t.tex}` : ` ${t.neg ? '-' : '+'} ${t.tex}`)).join('') || '0'
    const text = terms.map((t, k) => (k === 0 ? `${t.neg ? '−' : ''}${t.text}` : ` ${t.neg ? '−' : '+'} ${t.text}`)).join('') || '0'
    parts.push({ tex: `${nameLatex(unknowns[col])} = ${tex}`, text: `${unknowns[col]} = ${text}` })
  })
  const shown = { tex: parts.map((p) => p.tex).join(',\\ '), text: parts.map((p) => p.text).join(', ') }
  if (!free.length) return shown
  return { tex: `${shown.tex} \\quad \\text{(${free.join(', ')} qualsiasi)}`, text: `${shown.text} (${free.join(', ')} qualsiasi: infinite soluzioni)` }
}

// ——— A x = b ———

/** I nomi dei parametri delle soluzioni infinite: t, s, u, v, w. */
const PARAMS = ['t', 's', 'u', 'v', 'w', 'r']

/** Un vettore come (1, 0, 2), con il punto e virgola se ci sono i decimali con la virgola. */
export function vectorText(values: Rational[], options: FormatOptions): FormattedResult {
  const parts = values.map((v) => formatRational(v, options))
  const sep = parts.some((p) => p.text.includes(',')) ? '; ' : ', '
  return { tex: `\\left(${parts.map((p) => p.tex).join(sep)}\\right)`, text: `(${parts.map((p) => p.text).join(sep)})` }
}

/**
 * A x = b con la matrice A e il vettore b (o 0): Rouché–Capelli. Una soluzione (x = (…)), infinite
 * (x = (…) + t(…) + s(…), ∞¹, ∞²…) o nessuna, con i ranghi di A e della matrice completa (A|b).
 */
export function matrixSystem(A: Mat<Rational>, b: Rational[], x: string, options: FormatOptions): FormattedResult {
  const m = A.length
  const n = A[0].length
  if (b.length !== m) throw new MathError(`A ha ${m} righe: il vettore dei termini noti ha ${m} componenti`)
  const { r, pivots } = rref(EXACT, A.map((row, i) => [...row, b[i]]))
  const rankA = pivots.filter((p) => p < n).length
  const rankAb = pivots.length
  const X = nameLatex(x)
  if (rankA < rankAb) {
    return {
      tex: `\\nexists\\ \\text{(rango } A = ${rankA}\\text{, rango } (A|b) = ${rankAb}\\text{)}`,
      text: `nessuna soluzione (rango A = ${rankA}, rango (A|b) = ${rankAb})`,
    }
  }
  const free = Array.from({ length: n }, (_, j) => j).filter((j) => !pivots.includes(j))
  const particular: Rational[] = Array.from({ length: n }, () => ZERO)
  pivots.forEach((p, i) => (particular[p] = r[i][n]))
  const base = vectorText(particular, options)
  if (!free.length) return { tex: `${X} = ${base.tex}`, text: `${x} = ${base.text}` }
  const directions = free.map((f) => {
    const v: Rational[] = Array.from({ length: n }, () => ZERO)
    v[f] = ONE
    pivots.forEach((p, i) => (v[p] = r[i][f].neg()))
    // Con i numeri interi, se si può: (−1/2, 1) diventa (−1, 2).
    const lcm = v.reduce((l, c) => (l * c.d) / gcd(l, c.d), 1n)
    return v.map((c) => c.mul(new Rational(lcm)))
  })
  const zero = particular.every((c) => c.sign === 0)
  const terms = directions.map((d, i) => {
    const t = vectorText(d, options)
    return { tex: `${PARAMS[i]}${t.tex}`, text: `${PARAMS[i]}${t.text}` }
  })
  const k = free.length
  // Su due righe (disegnate): le soluzioni e quante sono, così non escono dalla pagina.
  return {
    tex: `\\begin{array}{l} ${X} = ${zero ? '' : `${base.tex} + `}${terms.map((t) => t.tex).join(' + ')} \\\\ \\infty^{${k}}\\ \\text{soluzioni (rango ${rankA})} \\end{array}`,
    text: `${x} = ${zero ? '' : `${base.text} + `}${terms.map((t) => t.text).join(' + ')} (∞${superscript(k)} soluzioni, rango ${rankA})`,
    rich: true,
  }
}

function gcd(a: bigint, b: bigint): bigint {
  if (a < 0n) a = -a
  if (b < 0n) b = -b
  while (b) [a, b] = [b, a % b]
  return a
}

const SUPERSCRIPTS = '⁰¹²³⁴⁵⁶⁷⁸⁹'
const superscript = (n: number) => String(n).split('').map((c) => SUPERSCRIPTS[Number(c)]).join('')

// ——— Con un parametro ———

/** Il determinante di una matrice di polinomi (Bareiss: le divisioni sono esatte). */
export function polyDeterminant(M: Poly[][]): Poly {
  const n = M.length
  if (!n) return [ONE]
  const a = M.map((row) => row.map(trim))
  let sign = ONE
  let prev: Poly = [ONE]
  for (let k = 0; k < n - 1; k++) {
    if (!a[k][k].length) {
      const i = a.findIndex((row, i) => i > k && row[k].length > 0)
      if (i < 0) return []
      ;[a[i], a[k]] = [a[k], a[i]]
      sign = sign.neg()
    }
    for (let i = k + 1; i < n; i++) {
      for (let j = k + 1; j < n; j++) {
        const value = psub(pmul(a[i][j], a[k][k]), pmul(a[i][k], a[k][j]))
        a[i][j] = trim(pdivmod(value, prev).q)
      }
    }
    prev = a[k][k]
  }
  return trim(a[n - 1][n - 1].map((c) => c.mul(sign)))
}

/** Le scelte di `k` indici tra 0 e n − 1. */
function choices(n: number, k: number): number[][] {
  const out: number[][] = []
  const go = (start: number, picked: number[]) => {
    if (picked.length === k) {
      out.push(picked)
      return
    }
    for (let i = start; i < n; i++) go(i + 1, [...picked, i])
  }
  go(0, [])
  return out
}

/** Il massimo comun divisore dei minori r × r: dove si annulla, il rango è più piccolo di r. */
export function minorsGcd(M: Poly[][], r: number): Poly {
  if (r === 0) return [ONE]
  let g: Poly = []
  for (const rows of choices(M.length, r)) {
    for (const cols of choices(M[0].length, r)) {
      const d = polyDeterminant(rows.map((i) => cols.map((j) => M[i][j])))
      g = g.length ? pgcd(g, d) : trim(d)
      if (degree(g) === 0) return [ONE]
    }
  }
  return g
}

/** Il polinomio come espressione con le lettere (per scriverlo bene, anche nelle frazioni). */
function polyEx(p: Poly, k: string): Ex {
  return add(...p.map((c, i) => mul(num(c), pow(sym(k), num(i)))))
}

function exText(e: Ex): FormattedResult {
  const node = toNode(tidy(e))
  return { tex: toLatex(node), text: plainText(node) }
}

const rankAt = (rows: Rational[][], n: number): { a: number; ab: number } => {
  const { pivots } = rref(EXACT, rows)
  return { a: pivots.filter((p) => p < n).length, ab: pivots.length }
}

/** Un valore speciale del parametro: esatto (una frazione) o con la virgola. */
interface Special {
  exact: Rational | null
  v: number
  shown: FormattedResult
}

/**
 * Un sistema lineare con un parametro: `rows` sono [a₁(k), …, aₙ(k), c(k)] (polinomi in k). La
 * soluzione per quasi tutti i valori di k e, a parte, per quelli dove il rango di A o della matrice
 * completa cambia. Null se non serve (il parametro non cambia niente) o è troppo grande.
 */
export function parametricSystem(rows: Poly[][], unknowns: string[], k: string, options: FormatOptions): FormattedResult | null {
  const m = rows.length
  const n = unknowns.length
  if (n > 5 || m > 6) return null
  const A = rows.map((row) => row.slice(0, n))
  const at = (x: Rational) => rows.map((row) => row.map((p) => pvalue(p, x)))
  // Il rango «di solito»: il più grande in qualche valore qualsiasi.
  let generic = { a: 0, ab: 0 }
  for (const x of [new Rational(22n, 7n), new Rational(-31n, 13n), new Rational(57n, 11n)]) {
    const r = rankAt(at(x), n)
    if (r.ab > generic.ab || (r.ab === generic.ab && r.a > generic.a)) generic = r
  }
  // I valori dove il rango scende: le radici dei minori.
  const special: Special[] = []
  const addRoots = (p: Poly) => {
    if (degree(p) < 1) return
    const { roots, rest } = rationalRoots(trim(p))
    for (const r of roots) if (!special.some((s) => s.exact && s.exact.cmp(r) === 0)) special.push({ exact: r, v: r.toNumber(), shown: formatRational(r, options) })
    if (rest.length > 2) {
      for (const z of numericRoots(rest.map((c) => c.toNumber()))) {
        if (Math.abs(z.im) > 1e-9 || special.some((s) => Math.abs(s.v - z.re) < 1e-9)) continue
        const shown = formatNumber(z.re, { ...options, decimal: true, digits: 9 })
        if (shown) special.push({ exact: null, v: z.re, shown })
      }
    }
  }
  addRoots(minorsGcd(A, generic.a))
  addRoots(minorsGcd(rows, generic.ab))
  special.sort((p, q) => p.v - q.v)
  const K = nameLatex(k)
  const lines: FormattedResult[] = []
  // Il caso generale.
  const except = special.map((s) => ({ tex: `${K} \\ne ${s.shown.tex}`, text: `${k} ≠ ${s.shown.text}` }))
  const head = except.length ? { tex: except.map((e) => e.tex).join(',\\ '), text: except.map((e) => e.text).join(', ') } : { tex: `\\forall ${K}`, text: `per ogni ${k}` }
  let general: FormattedResult
  if (generic.a < generic.ab) general = { tex: '\\nexists\\ \\text{(impossibile)}', text: 'nessuna soluzione (impossibile)' }
  else if (generic.a === n) {
    // Una soluzione sola: con Cramer, su n righe che vanno bene per quasi tutti i k.
    const pick = choices(m, n).find((rs) => polyDeterminant(rs.map((i) => A[i])).length > 0)
    if (!pick) return null
    const D = polyDeterminant(pick.map((i) => A[i]))
    const parts = unknowns.map((u, j) => {
      const Dj = polyDeterminant(pick.map((i) => A[i].map((c, col) => (col === j ? rows[i][n] : c))))
      const g = pgcd(Dj.length ? Dj : D, D)
      // Il denominatore con il primo coefficiente 1: (a + 1)/2, non −(−a − 1)/2.
      const lead = pdivmod(D, g).q.at(-1)!
      const top = Dj.length ? pdivmod(Dj, g).q.map((c) => c.div(lead)) : []
      const bottom = pdivmod(D, g).q.map((c) => c.div(lead))
      const value = top.length ? exText(mul(polyEx(top, k), pow(polyEx(bottom, k), num(-1)))) : { tex: '0', text: '0' }
      return { tex: `${nameLatex(u)} = ${value.tex}`, text: `${u} = ${value.text}` }
    })
    general = { tex: parts.map((p) => p.tex).join(',\\ '), text: parts.map((p) => p.text).join(', ') }
  } else {
    const free = n - generic.a
    general = { tex: `\\infty^{${free}}\\ \\text{soluzioni}`, text: `∞${superscript(free)} soluzioni` }
  }
  lines.push({ tex: `${head.tex}:\\ ${general.tex}`, text: `${head.text}: ${general.text}` })
  // I valori speciali, uno per uno.
  for (const s of special) {
    let shown: FormattedResult
    if (s.exact) shown = linearSystem(at(s.exact), unknowns, options)
    else {
      const { pivots } = rref(
        FLOAT,
        rows.map((row) => row.map((p) => p.reduce((sum, c, i) => sum + c.toNumber() * s.v ** i, 0))),
      )
      const a = pivots.filter((p) => p < n).length
      shown = a < pivots.length ? { tex: '\\nexists\\ \\text{(impossibile)}', text: 'nessuna soluzione (impossibile)' } : { tex: `\\infty^{${n - a}}\\ \\text{soluzioni}`, text: `∞${superscript(n - a)} soluzioni` }
    }
    lines.push({ tex: `${K} = ${s.shown.tex}:\\ ${shown.tex}`, text: `${k} = ${s.shown.text}: ${shown.text}` })
  }
  // Il parametro non cambia niente: allora non è un parametro (lo risolve il sistema come le altre incognite).
  if (!special.length && generic.a !== n) return null
  return { tex: `\\begin{array}{l} ${lines.map((l) => l.tex).join(' \\\\ ')} \\end{array}`, text: lines.map((l) => l.text).join('; '), rich: true }
}

// ——— Dalle formule ———

/** Le incognite di solito: x, y, z, w, t (anche con un pedice, x_1). Le altre lettere sono parametri. */
export const isStandardUnknown = (name: string): boolean => /^(x|y|z|w|t)(_.+)?$/.test(name)

/** Il nodo con i nomi di `values` sostituiti dai numeri. */
function substitute(node: MathNode, values: ReadonlyMap<string, number>): MathNode {
  const visit = (n: MathNode): MathNode => {
    if (n.k === 'name' && values.has(n.name)) {
      const v = values.get(n.name)!
      return { k: 'num', v, text: String(v), comma: false }
    }
    // k(x + y) con k il parametro: un prodotto.
    if (n.k === 'apply' && values.has(n.name) && !n.primes && n.args.length === 1) return { k: 'bin', op: '*', a: visit({ k: 'name', name: n.name }), b: visit(n.args[0]), implicit: true }
    return mapNode(n, visit)
  }
  return visit(node)
}

/**
 * Le righe [a₁(k), …, aₙ(k), c(k)] di un sistema lineare nelle incognite con un parametro k: le
 * relazioni F = 0 (F = sinistra − destra). Null se non è lineare nelle incognite o i coefficienti non
 * sono polinomi in k.
 */
export function parametricRows(relations: MathNode[], unknowns: string[], k: string, scope: LinearScope): Poly[][] | null {
  const poly = (node: MathNode, values: Map<string, number>): Poly | null => {
    const p = polynomialIn(substitute(node, values), k, scope, 8)
    return p && trim(p)
  }
  const zeros = () => new Map(unknowns.map((u) => [u, 0]))
  const same = (a: Poly, b: Poly) => a.length === b.length && a.every((c, i) => c.cmp(b[i]) === 0)
  const rows: Poly[][] = []
  for (const F of relations) {
    const base = poly(F, zeros())
    if (!base) return null
    const coefficients: Poly[] = []
    for (const u of unknowns) {
      const one = poly(F, new Map([...zeros(), [u, 1]]))
      const two = poly(F, new Map([...zeros(), [u, 2]]))
      if (!one || !two) return null
      const c = trim(psub(one, base))
      // Lineare: con 2 al posto di 1 il termine raddoppia.
      if (!same(trim(psub(two, base)), trim(c.map((x) => x.mul(Rational.int(2)))))) return null
      coefficients.push(c)
    }
    // Niente prodotti tra le incognite (x y): con due incognite a 1 i termini si sommano.
    for (let i = 0; i < unknowns.length; i++) {
      for (let j = i + 1; j < unknowns.length; j++) {
        const both = poly(F, new Map([...zeros(), [unknowns[i], 1], [unknowns[j], 1]]))
        if (!both || !same(trim(psub(both, base)), trim(padd(coefficients[i], coefficients[j])))) return null
      }
    }
    rows.push([...coefficients, trim(base.map((x) => x.neg()))])
  }
  return rows
}

/**
 * A x = b (o A x = 0) con A una matrice: Rouché–Capelli. Se A ha un parametro (una lettera che la
 * nota non definisce), la discussione al variare del parametro, con le incognite x_1, x_2…
 */
export function matrixEquation(node: MathNode, scope: { linear: LinearScope; defined: (name: string) => boolean }, options: FormatOptions): FormattedResult | null {
  if (node.k !== 'rel' || node.ops.length !== 1 || node.ops[0] !== '=') return null
  const [lhs, rhs] = node.items
  if (lhs.k !== 'bin' || lhs.op !== '*' || lhs.cross || lhs.b.k !== 'name' || scope.defined(lhs.b.name)) return null
  const x = lhs.b.name
  let A: ReturnType<typeof evaluateLinear<Rational>> | null = null
  try {
    A = evaluateLinear(lhs.a, scope.linear, EXACT)
  } catch {
    A = null
  }
  const known = (n: MathNode): Rational[] | null => {
    try {
      const v = evaluateLinear(n, scope.linear, EXACT)
      if (v.k === 'scalar' && v.v.sign === 0) return []
      if (v.k === 'matrix' && v.m[0].length === 1) return v.m.map((r) => r[0])
    } catch {
      // Non si sa calcolare: niente.
    }
    return null
  }
  if (A && A.k === 'matrix' && !A.tuple) {
    const b = known(rhs)
    if (!b) return null
    return matrixSystem(A.m, b.length ? b : A.m.map(() => ZERO), x, options)
  }
  // Con un parametro: la matrice scritta, con una lettera che la nota non definisce.
  if (lhs.a.k !== 'matrix') return null
  const letters = [...namesIn(lhs.a), ...namesIn(rhs)].filter((n) => n !== x && !scope.defined(n) && !['π', 'e'].includes(n))
  const params = [...new Set(letters)]
  if (params.length !== 1) return null
  const k = params[0]
  const entries = (n: MathNode): MathNode[] | null => {
    if (n.k === 'tuple') return n.items
    if (n.k === 'matrix' && n.rows.every((r) => r.length === 1)) return n.rows.map((r) => r[0])
    if (n.k === 'num' && n.v === 0) return lhs.a.k === 'matrix' ? lhs.a.rows.map(() => n) : null
    return null
  }
  const b = entries(rhs)
  const rows = lhs.a.rows
  if (!b || b.length !== rows.length) return null
  const out: Poly[][] = []
  for (let i = 0; i < rows.length; i++) {
    const row: Poly[] = []
    for (const c of [...rows[i], b[i]]) {
      const p = polynomialIn(c, k, scope.linear, 8)
      if (!p) return null
      row.push(trim(p))
    }
    out.push(row)
  }
  const n = rows[0].length
  return parametricSystem(out, Array.from({ length: n }, (_, j) => `${x}_${j + 1}`), k, options)
}
