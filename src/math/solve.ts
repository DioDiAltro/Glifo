/**
 * Le equazioni, le disequazioni e i sistemi risolti: si scrivono nella nota con ⇒ alla fine
 * (`$x^2 - 5x + 6 = 0 \Rightarrow$` dà x = 2 ∨ x = 3). I polinomi si risolvono con le frazioni e le
 * radici esatte (fino al secondo grado, e le radici razionali oltre); le altre equazioni con i
 * numeri, cercando dove la funzione cambia segno (e, se è periodica, con + 2kπ); le disequazioni
 * guardando il segno tra un punto critico e l'altro; i sistemi lineari con la riduzione a scala.
 */
import { compile, MathError, scopeWith, type Scope } from './evaluate'
import { Rational } from './exact'
import { formatNumber, formatRational, type FormatOptions, type FormattedResult } from './format'
import { nameLatex } from './latex'
import { FLOAT, polynomialIn, rref, splitRoot, surdText, type LinearScope } from './linear'
import { isStandardUnknown, linearSystem, matrixEquation, parametricRows, parametricSystem } from './linsys'
import { numericRoots, rationalRoots } from './polynomial'
import { recognize } from './limits'
import { namesIn, type MathNode, type RelOp } from './parse'
import { piMultiple } from './complex'
import { linearCoefficients, type SymbolScope } from './symbolic'

export interface SolveScope {
  real: Scope
  linear: LinearScope
  symbols: SymbolScope
  /** I nomi definiti nella nota (non sono incognite). */
  defined: (name: string) => boolean
}

/** Una relazione F op 0 (F = sinistra − destra). */
interface Relation {
  F: MathNode
  op: RelOp
}

const minus = (a: MathNode, b: MathNode): MathNode => (b.k === 'num' && b.v === 0 ? a : { k: 'bin', op: '-', a, b })

/** Le relazioni di una formula: a < f(x) ≤ b sono due, f(x) > 0 e g(x) > 0 (un sistema) tante. */
function relationsOf(node: MathNode): Relation[] | null {
  if (node.k === 'rel') {
    const out: Relation[] = []
    for (let i = 0; i < node.ops.length; i++) out.push({ F: minus(node.items[i], node.items[i + 1]), op: node.ops[i] })
    return out
  }
  if (node.k === 'cases' && node.rows.every((r) => !r.cond && r.value.k === 'rel')) return node.rows.flatMap((r) => relationsOf(r.value)!)
  if (node.k === 'and') {
    const all = node.items.map(relationsOf)
    return all.every((r) => r) ? all.flat() as Relation[] : null
  }
  return null
}

/** Le incognite: i nomi che la nota non definisce (x prima, poi y, z e gli altri in ordine). */
function unknownsOf(relations: Relation[], scope: SolveScope): string[] {
  const names = new Set<string>()
  for (const r of relations) namesIn(r.F, names)
  const out = [...names].filter((n) => !scope.defined(n) && !['π', 'e', 'i'].includes(n))
  const rank = (n: string) => ['x', 'y', 'z', 't'].indexOf(n)
  return out.sort((a, b) => (rank(a) < 0 ? 9 : rank(a)) - (rank(b) < 0 ? 9 : rank(b)) || a.localeCompare(b))
}

/**
 * Risolve le relazioni di `node` (un'equazione, una disequazione, un sistema in `cases` o con le
 * virgole); null se non è una richiesta che si sa risolvere.
 */
export function solve(nodes: MathNode[], scope: SolveScope, options: FormatOptions): FormattedResult | null {
  // A x = b con la matrice: Rouché–Capelli.
  if (nodes.length === 1) {
    const shown = matrixEquation(nodes[0], scope, options)
    if (shown) return shown
  }
  const relations: Relation[] = []
  for (const n of nodes) {
    const r = relationsOf(n)
    if (!r) return null
    relations.push(...r)
  }
  if (!relations.length) return null
  const unknowns = unknownsOf(relations, scope)
  if (!unknowns.length) return null
  const equations = relations.every((r) => r.op === '=')
  // Un sistema lineare con un parametro (x + k y = 1, k x + y = 1): la discussione al variare di k.
  const standard = unknowns.filter(isStandardUnknown)
  const params = unknowns.filter((u) => !isStandardUnknown(u))
  if (equations && standard.length && params.length === 1) {
    const rows = parametricRows(
      relations.map((r) => r.F),
      standard,
      params[0],
      scope.linear,
    )
    const shown = rows && parametricSystem(rows, standard, params[0], options)
    if (shown) return shown
  }
  if (unknowns.length === 1) {
    const x = unknowns[0]
    if (relations.length === 1 && equations) return equation(relations[0].F, x, scope, options)
    if (relations.every((r) => r.op !== '=' && r.op !== '!=' && r.op !== '≈')) return inequality(relations, x, scope, options)
    if (equations) return system(relations, unknowns, scope, options)
    return null
  }
  if (equations) return system(relations, unknowns, scope, options)
  return null
}

// ——— Le equazioni in una incognita ———

/** Una soluzione: esatta (una frazione, a ± b√m) o con la virgola. */
type Root = { exact: Rational; v: number } | { v: number; tex: string; text: string }

function rootText(r: Root, options: FormatOptions): FormattedResult {
  if ('exact' in r) return formatRational(r.exact, options)
  return { tex: r.tex, text: r.text }
}

/** Una radice con la virgola, riconosciuta se si può (π/6, ln 2, √2). */
function numericRoot(v: number, options: FormatOptions): Root {
  const known = Math.abs(v) < 1e-12 ? { tex: '0', text: '0' } : piMultiple(v) ?? recognize(v, options) ?? cubeRoot(v, options) ?? formatNumber(v, { ...options, decimal: true, digits: 9 })
  return { v, tex: known?.tex ?? String(v), text: known?.text ?? String(v) }
}

/** Una radice cubica di una frazione semplice (x^3 = 2: ∛2), con le cifre. */
function cubeRoot(v: number, options: FormatOptions): FormattedResult | null {
  const cube = v ** 3
  for (let q = 1; q <= 100; q++) {
    const p = Math.round(cube * q)
    if (Math.abs(cube - p / q) > 1e-9 * Math.max(1, Math.abs(cube)) || Math.round(Math.cbrt(p / q)) ** 3 === p / q) continue
    const digits = formatNumber(v, { ...options, decimal: true, digits: 9 })
    const inside = q === 1 ? String(p) : `\\frac{${p}}{${q}}`
    const insideText = q === 1 ? String(p).replace('-', '−') : `${p}/${q}`
    return digits ? { tex: `\\sqrt[3]{${inside}} \\approx ${digits.tex}`, text: `∛${insideText} ≈ ${digits.text}` } : null
  }
  return null
}

/** La radice a ± b√m di un'equazione di secondo grado, con un denominatore solo: (1 ± √5)/2. */
function quadraticRoots(a: Rational, b: Rational, c: Rational, options: FormatOptions): { roots: Root[]; pm?: FormattedResult; complex?: FormattedResult } {
  const delta = b.mul(b).sub(Rational.int(4).mul(a).mul(c))
  const twoA = Rational.int(2).mul(a)
  const center = b.neg().div(twoA)
  if (delta.sign === 0) return { roots: [{ exact: center, v: center.toNumber() }] }
  const split = splitRoot(delta.abs())
  if (!split) return { roots: [] }
  // √|Δ| = k√m: le soluzioni sono center ± (k/2a)√m.
  const k = split.k.div(twoA).abs()
  if (split.m === 1n) {
    if (delta.sign < 0) return { roots: [], complex: pmText(center, k, 1n, options, true) }
    const r1 = center.sub(k)
    const r2 = center.add(k)
    return { roots: [r1, r2].sort((p, q) => p.cmp(q)).map((r) => ({ exact: r, v: r.toNumber() })) }
  }
  const shown = pmText(center, k, split.m, options, delta.sign < 0)
  if (delta.sign < 0) return { roots: [], complex: shown }
  const s = Math.sqrt(Number(split.m)) * k.toNumber()
  const root = (sign: bigint): Root => ({ v: center.toNumber() + Number(sign) * s, ...surdText(center, k.mul(new Rational(sign)), split.m) })
  return { roots: [root(-1n), root(1n)], pm: shown }
}

/** c ± k√m (o c ± k√m i con `imaginary`), con un denominatore solo. */
function pmText(c: Rational, k: Rational, m: bigint, options: FormatOptions, imaginary: boolean): FormattedResult {
  const g = (x: bigint, y: bigint): bigint => (y ? g(y, x % y) : x < 0n ? -x : x)
  const q = (c.d / g(c.d, k.d)) * k.d
  const top = (c.n * q) / c.d
  const coef = (k.n * q) / k.d
  const root = m === 1n ? '' : `\\sqrt{${m}}`
  const rootText = m === 1n ? '' : `√${m}`
  const i = imaginary ? (root ? '\\,i' : 'i') : ''
  const iText = imaginary ? 'i' : ''
  const coefTex = coef === 1n && (root || i) ? '' : String(coef)
  const right = `${coefTex}${root}${i}`
  const rightText = `${coef === 1n && (rootText || iText) ? '' : coef}${rootText}${iText}`
  const numTex = top === 0n ? `\\pm ${right}` : `${top} \\pm ${right}`
  const numText = top === 0n ? `±${rightText}` : `${String(top).replace('-', '−')} ± ${rightText}`
  void options
  if (q === 1n) return { tex: numTex, text: numText }
  return { tex: `\\frac{${numTex}}{${q}}`, text: `(${numText})/${q}` }
}

/** La funzione con i numeri, nell'incognita `x`. */
function numeric(F: MathNode, x: string, scope: SolveScope): (v: number) => number {
  const f = compile(F, scopeWith(scope.real, [x]), { calc: true })
  const vars: Record<string, number> = { [x]: 0 }
  return (v) => ((vars[x] = v), f(vars))
}

/** Le radici di f tra a e b: dove cambia segno (non per un asintoto) e dove tocca lo zero. */
export function scanRoots(f: (v: number) => number, a: number, b: number, n: number): number[] {
  const roots: number[] = []
  const h = (b - a) / n
  let x0 = a
  let y0 = f(x0)
  const push = (r: number) => {
    if (!roots.some((s) => Math.abs(s - r) <= 1e-7 * Math.max(1, Math.abs(r)))) roots.push(r)
  }
  for (let i = 1; i <= n; i++) {
    const x1 = a + i * h
    const y1 = f(x1)
    if (y0 === 0) push(x0)
    else if (Number.isFinite(y0) && Number.isFinite(y1) && Math.sign(y0) !== Math.sign(y1) && y1 !== 0) {
      // Bisezione; poi si controlla che sia uno zero e non un salto (1/x, tan x).
      let lo = x0
      let hi = x1
      let flo = y0
      for (let k = 0; k < 80; k++) {
        const m = (lo + hi) / 2
        const fm = f(m)
        if (!Number.isFinite(fm)) break
        if (Math.sign(fm) === Math.sign(flo)) {
          lo = m
          flo = fm
        } else hi = m
      }
      const r = (lo + hi) / 2
      const fr = Math.abs(f(r))
      if (Number.isFinite(fr) && fr <= 1e-6 * Math.max(1, Math.abs(y0), Math.abs(y1))) push(r)
    } else if (i > 1 && Number.isFinite(y0) && Number.isFinite(y1)) {
      // Uno zero che non cambia segno ((x − 1)^2): un minimo di |f| che arriva a zero.
      const yPrev = f(x0 - h)
      if (Number.isFinite(yPrev) && Math.abs(y0) < Math.abs(yPrev) && Math.abs(y0) < Math.abs(y1)) {
        let lo = x0 - h
        let hi = x1
        for (let k = 0; k < 100; k++) {
          const m1 = lo + (hi - lo) / 3
          const m2 = hi - (hi - lo) / 3
          if (Math.abs(f(m1)) < Math.abs(f(m2))) hi = m2
          else lo = m1
        }
        const r = (lo + hi) / 2
        if (Math.abs(f(r)) <= 1e-12 * Math.max(1, Math.abs(yPrev))) push(r)
      }
    }
    x0 = x1
    y0 = y1
  }
  return roots.sort((p, q) => p - q)
}

/** Il periodo della funzione (2π o π), se lo è: allora le soluzioni si scrivono con + 2kπ. */
export function periodOf(f: (v: number) => number): number | null {
  const probes = [0.3, 1.7, -2.4, 4.1, 0.9, -0.6, 2.2]
  for (const P of [2 * Math.PI, Math.PI]) {
    let ok = true
    let tested = 0
    for (const x of probes) {
      const a = f(x)
      const b = f(x + P)
      const c = f(x + 3 * P)
      if (!Number.isFinite(a)) continue
      tested++
      if (!(Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a)) && Math.abs(a - c) <= 1e-8 * Math.max(1, Math.abs(a)))) ok = false
    }
    // Non costante (una costante è periodica, ma senza soluzioni da elencare con kπ).
    if (ok && tested >= 4 && probes.some((x) => Math.abs(f(x) - f(probes[0])) > 1e-9)) return P
  }
  return null
}

const OR = (parts: FormattedResult[]): FormattedResult => ({ tex: parts.map((p) => p.tex).join(' \\lor '), text: parts.map((p) => p.text).join(' ∨ ') })

function equation(F: MathNode, x: string, scope: SolveScope, options: FormatOptions): FormattedResult | null {
  const name = nameLatex(x)
  const eq = (value: FormattedResult): FormattedResult => ({ tex: `${name} = ${value.tex}`, text: `${x} = ${value.text}` })
  // Un polinomio: con le frazioni e le radici.
  const poly = polynomialIn(F, x, scope.linear, 12)
  if (poly) {
    const degree = poly.length - 1
    if (degree === 0) return poly[0].sign === 0 ? { tex: `\\forall ${name} \\in \\mathbb{R}`, text: `ogni ${x} (è un'identità)` } : { tex: '\\nexists', text: 'nessuna soluzione (impossibile)' }
    const { roots: rational, rest } = rationalRoots(poly)
    const roots: Root[] = rational.map((r) => ({ exact: r, v: r.toNumber() }))
    let pm: FormattedResult | undefined
    let complex: FormattedResult | undefined
    if (rest.length === 3) {
      const q = quadraticRoots(rest[2], rest[1], rest[0], options)
      roots.push(...q.roots.filter((r) => 'exact' in r))
      pm = q.pm
      complex = q.complex
    } else if (rest.length === 2) {
      const r = rest[0].neg().div(rest[1])
      roots.push({ exact: r, v: r.toNumber() })
    } else if (rest.length > 3) {
      for (const z of numericRoots(rest.map((c) => c.toNumber()))) if (z.im === 0) roots.push(numericRoot(z.re, options))
    }
    // Le radici uguali una volta sola (con «doppia»).
    const distinct: { root: Root; times: number }[] = []
    for (const r of roots.sort((p, q) => p.v - q.v)) {
      const same = distinct.find((d) => Math.abs(d.root.v - r.v) <= 1e-9 * Math.max(1, Math.abs(r.v)))
      if (same) same.times++
      else distinct.push({ root: r, times: 1 })
    }
    const parts = distinct.map(({ root, times }) => {
      const shown = eq(rootText(root, options))
      return times > 1 ? { tex: `${shown.tex}\\ \\text{(${times === 2 ? 'doppia' : times === 3 ? 'tripla' : `${times} volte`})}`, text: `${shown.text} (${times === 2 ? 'doppia' : times === 3 ? 'tripla' : `${times} volte`})` } : shown
    })
    if (pm) parts.push(eq(pm))
    if (!parts.length) {
      if (complex) return { tex: `\\nexists\\ \\text{in } \\mathbb{R} \\quad \\left(\\text{in } \\mathbb{C}\\text{: } ${name} = ${complex.tex}\\right)`, text: `nessuna soluzione reale (in ℂ: ${x} = ${complex.text})` }
      return { tex: '\\nexists\\ \\text{in } \\mathbb{R}', text: 'nessuna soluzione reale' }
    }
    return OR(parts)
  }
  // Con i numeri: dove la funzione si annulla.
  const f = numeric(F, x, scope)
  const period = periodOf(f)
  if (period) {
    let base = scanRoots(f, 0, period, 4000).filter((r) => r < period - 1e-9)
    let P = period
    // Le soluzioni che si ripetono ogni mezzo periodo: sin x = 0 è x = kπ.
    while (base.length > 1 && base.length % 2 === 0) {
      const half = P / 2
      const first = base.filter((r) => r < half - 1e-9)
      const shifted = first.map((r) => r + half)
      if (first.length * 2 === base.length && shifted.every((s) => base.some((r) => Math.abs(r - s) < 1e-7))) {
        base = first
        P = half
      } else break
    }
    if (!base.length) return { tex: '\\nexists', text: 'nessuna soluzione' }
    const k = piMultiple(P)
    const step = k ? (k.tex === '\\pi' ? 'k\\pi' : k.tex === '2\\pi' ? '2k\\pi' : `k \\cdot ${k.tex}`) : `k \\cdot ${formatNumber(P, options)?.tex}`
    const stepText = k ? (k.text === 'π' ? 'kπ' : k.text === '2π' ? '2kπ' : `k·${k.text}`) : `k·${formatNumber(P, options)?.text}`
    const parts = base.map((r) => {
      const root = rootText(numericRoot(r, options), options)
      const zero = Math.abs(r) < 1e-12
      return { tex: `${name} = ${zero ? step : `${root.tex} + ${step}`}`, text: `${x} = ${zero ? stepText : `${root.text} + ${stepText}`}` }
    })
    return OR(parts)
  }
  const roots = scanRoots(f, -100, 100, 20000)
  if (!roots.length) return { tex: '\\nexists\\ \\text{tra } -100 \\text{ e } 100', text: 'nessuna soluzione tra −100 e 100' }
  if (roots.length > 8) throw new MathError('Troppe soluzioni da elencare')
  return OR(roots.map((r) => eq(rootText(numericRoot(r, options), options))))
}

// ——— Le disequazioni ———

function holds(op: RelOp, v: number): boolean {
  switch (op) {
    case '<':
      return v < 0
    case '<=':
      return v <= 0
    case '>':
      return v > 0
    case '>=':
      return v >= 0
    default:
      return false
  }
}

/** I punti dove la funzione non esiste o salta (gli asintoti, il bordo del dominio). */
export function breaks(f: (v: number) => number, a: number, b: number, n: number): number[] {
  const out: number[] = []
  const h = (b - a) / n
  let prev = f(a)
  for (let i = 1; i <= n; i++) {
    const x = a + i * h
    const y = f(x)
    const defined = Number.isFinite(y)
    if (defined !== Number.isFinite(prev) || (defined && Number.isFinite(prev) && Math.sign(y) !== Math.sign(prev) && Math.abs(y - prev) > 1e3 * Math.max(1, Math.min(Math.abs(y), Math.abs(prev))))) {
      // Il bordo, con la bisezione.
      let lo = x - h
      let hi = x
      const left = Number.isFinite(prev)
      for (let k = 0; k < 60; k++) {
        const m = (lo + hi) / 2
        const ok = Number.isFinite(f(m))
        if (defined !== Number.isFinite(prev) ? ok === left : Math.sign(f(m)) === Math.sign(prev)) lo = m
        else hi = m
      }
      out.push((lo + hi) / 2)
    }
    prev = y
  }
  return out
}

function inequality(relations: Relation[], x: string, scope: SolveScope, options: FormatOptions): FormattedResult | null {
  const fs = relations.map((r) => ({ f: numeric(r.F, x, scope), op: r.op, F: r.F }))
  // I punti critici: gli zeri (esatti, se è un polinomio) e i salti di ognuna.
  const critical: Root[] = []
  const add = (r: Root) => {
    if (!critical.some((c) => Math.abs(c.v - r.v) <= 1e-8 * Math.max(1, Math.abs(r.v)))) critical.push(r)
  }
  for (const { f, F } of fs) {
    const poly = polynomialIn(F, x, scope.linear, 12)
    if (poly && poly.length > 1) {
      const { roots, rest } = rationalRoots(poly)
      for (const r of roots) add({ exact: r, v: r.toNumber() })
      if (rest.length === 3) {
        const q = quadraticRoots(rest[2], rest[1], rest[0], options)
        for (const r of q.roots) add(r)
      } else if (rest.length > 3) for (const z of numericRoots(rest.map((c) => c.toNumber()))) if (z.im === 0) add(numericRoot(z.re, options))
      else if (rest.length === 2) {
        const r = rest[0].neg().div(rest[1])
        add({ exact: r, v: r.toNumber() })
      }
    } else for (const r of scanRoots(f, -100, 100, 20000)) add(numericRoot(r, options))
    for (const b of breaks(f, -100, 100, 20000)) add(numericRoot(b, options))
  }
  critical.sort((p, q) => p.v - q.v)
  const ok = (v: number) => fs.every(({ f, op }) => {
    const y = f(v)
    return Number.isFinite(y) && holds(op, y)
  })
  // Gli intervalli tra un punto critico e l'altro (e oltre il primo e l'ultimo), e i punti critici.
  const pts = critical.map((c) => c.v)
  const sample = (i: number): number => {
    if (!pts.length) return 0
    if (i === 0) return pts[0] - 1 - Math.abs(pts[0]) * 0.1
    if (i === pts.length) return pts[pts.length - 1] + 1 + Math.abs(pts[pts.length - 1]) * 0.1
    return (pts[i - 1] + pts[i]) / 2
  }
  const inside = Array.from({ length: pts.length + 1 }, (_, i) => ok(sample(i)))
  const at = pts.map((p) => ok(p))
  if (inside.every((v) => v) && at.every((v) => v)) return { tex: `\\forall ${nameLatex(x)} \\in \\mathbb{R}`, text: `ogni ${x}` }
  if (inside.every((v) => !v) && at.every((v) => !v)) return { tex: '\\nexists', text: 'nessuna soluzione' }
  // Tutti tranne alcuni punti: x ≠ 1.
  if (inside.every((v) => v)) {
    const out = critical.filter((_, i) => !at[i]).map((c) => rootText(c, options))
    return { tex: out.map((o) => `${nameLatex(x)} \\ne ${o.tex}`).join(' \\land '), text: out.map((o) => `${x} ≠ ${o.text}`).join(' ∧ ') }
  }
  // Gli intervalli uniti: da dove comincia a dove finisce, con il bordo dentro o fuori.
  const parts: FormattedResult[] = []
  const name = nameLatex(x)
  let i = 0
  while (i <= pts.length) {
    if (!inside[i]) {
      // Un punto isolato dove vale (x^2 \le 0: x = 0).
      if (i < pts.length && at[i] && !inside[i + 1]) {
        const c = rootText(critical[i], options)
        parts.push({ tex: `${name} = ${c.tex}`, text: `${x} = ${c.text}` })
      }
      i++
      continue
    }
    const start = i
    while (i < pts.length && at[i] && inside[i + 1]) i++
    const end = i
    const lo = start === 0 ? null : { root: rootText(critical[start - 1], options), closed: at[start - 1] }
    const hi = end === pts.length ? null : { root: rootText(critical[end], options), closed: at[end] }
    const le = (closed: boolean) => (closed ? ['\\le', '≤'] : ['<', '<'])
    if (!lo && hi) parts.push({ tex: `${name} ${le(hi.closed)[0]} ${hi.root.tex}`, text: `${x} ${le(hi.closed)[1]} ${hi.root.text}` })
    else if (lo && !hi) parts.push({ tex: `${name} ${lo.closed ? '\\ge' : '>'} ${lo.root.tex}`, text: `${x} ${lo.closed ? '≥' : '>'} ${lo.root.text}` })
    else if (lo && hi) parts.push({ tex: `${lo.root.tex} ${le(lo.closed)[0]} ${name} ${le(hi.closed)[0]} ${hi.root.tex}`, text: `${lo.root.text} ${le(lo.closed)[1]} ${x} ${le(hi.closed)[1]} ${hi.root.text}` })
    i = end + 1
    // Il punto critico dopo l'intervallo, se ci sta da solo, lo prende il giro dopo.
    if (end < pts.length && at[end] && !inside[end + 1]) i = end + 1
  }
  return parts.length ? OR(parts) : null
}

// ——— I sistemi ———

function system(relations: Relation[], unknowns: string[], scope: SolveScope, options: FormatOptions): FormattedResult | null {
  if (unknowns.length > 4) return null
  // Lineare: i coefficienti delle incognite e il termine noto, con le frazioni.
  const rows: Rational[][] = []
  for (const r of relations) {
    const row = linearCoefficients(r.F, unknowns, scope.symbols)
    if (!row) break
    rows.push(row)
  }
  if (rows.length === relations.length) return linearSystem(rows, unknowns, options)
  if (relations.length !== unknowns.length) return null
  return newtonSystem(relations, unknowns, scope, options)
}

/** Un sistema non lineare: Newton da tanti punti di partenza; le soluzioni diverse trovate. */
function newtonSystem(relations: Relation[], unknowns: string[], scope: SolveScope, options: FormatOptions): FormattedResult | null {
  const n = unknowns.length
  if (n > 3) return null
  const inner = scopeWith(scope.real, unknowns)
  const fs = relations.map((r) => compile(r.F, inner, { calc: true }))
  const at = (p: number[]) => {
    const v = Object.fromEntries(unknowns.map((u, i) => [u, p[i]]))
    return fs.map((f) => f(v))
  }
  const found: number[][] = []
  const starts: number[][] = []
  const grid = [-7, -3, -1.3, -0.4, 0.5, 1.2, 2.6, 6]
  const build = (prefix: number[]) => {
    if (prefix.length === n) starts.push(prefix)
    else for (const g of grid) build([...prefix, g])
  }
  build([])
  for (const start of starts) {
    let p = [...start]
    for (let it = 0; it < 60; it++) {
      const F = at(p)
      if (!F.every(Number.isFinite)) break
      if (Math.max(...F.map(Math.abs)) < 1e-13) break
      // La jacobiana con le differenze finite.
      const J = unknowns.map((_, j) => {
        const h = 1e-6 * Math.max(1, Math.abs(p[j]))
        const q = [...p]
        q[j] += h
        return at(q).map((v, i) => (v - F[i]) / h)
      })
      const A = F.map((_, i) => [...unknowns.map((_, j) => J[j][i]), -F[i]])
      const { r, pivots } = rref(FLOAT, A)
      if (pivots.length < n) break
      const step = r.slice(0, n).map((row) => row[n])
      p = p.map((v, i) => v + step[i])
    }
    const F = at(p)
    if (F.every(Number.isFinite) && Math.max(...F.map(Math.abs)) < 1e-9 && p.every((v) => Math.abs(v) < 1e6)) {
      if (!found.some((q) => q.every((v, i) => Math.abs(v - p[i]) < 1e-6 * Math.max(1, Math.abs(v))))) found.push(p)
    }
  }
  if (!found.length) return { tex: '\\nexists\\ \\text{(non ne ho trovate)}', text: 'nessuna soluzione trovata' }
  found.sort((p, q) => p[0] - q[0] || (p[1] ?? 0) - (q[1] ?? 0))
  const parts = found.map((p) => {
    const values = p.map((v) => rootText(numericRoot(v, options), options))
    // Con i decimali con la virgola le coordinate si separano con il punto e virgola.
    const sep = values.some((v) => v.text.includes(',')) ? '; ' : ', '
    return {
      tex: unknowns.length === 1 ? `${nameLatex(unknowns[0])} = ${values[0].tex}` : `\\left(${unknowns.map(nameLatex).join(', ')}\\right) = \\left(${values.map((v) => v.tex).join(sep)}\\right)`,
      text: unknowns.length === 1 ? `${unknowns[0]} = ${values[0].text}` : `(${unknowns.join(', ')}) = (${values.map((v) => v.text).join(sep)})`,
    }
  })
  return OR(parts)
}

