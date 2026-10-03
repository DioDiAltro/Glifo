/**
 * Il calcolo numerico come nei corsi, con la tabella dei passi: gli zeri (bisezione, Newton, secanti, punto
 * fisso), l'interpolazione (il polinomio per i punti) e i minimi quadrati, le formule di quadratura
 * (rettangoli, trapezi, Simpson) con l'errore, la fattorizzazione LU (con il pivot quando serve) e quella di
 * Cholesky, le norme e il numero di condizionamento, i metodi di Jacobi e Gauss–Seidel (con il raggio
 * spettrale), le equazioni differenziali con Eulero, Heun e Runge–Kutta.
 */
import { MathError, integrate } from './evaluate'
import { Rational } from './exact'
import type { FormatOptions, FormattedResult } from './format'
import { formatRational } from './format'
import { toLatex } from './latex'
import { exactNear } from './several'
import { plainText, toNode } from './symbolic'
import type { MathNode } from './parse'
import { numericRoots } from './polynomial'
import { odeSolution } from './differential'

export interface OneVariable {
  f: (x: number) => number
  /** La derivata (con le lettere, se si è potuta fare). */
  df: ((x: number) => number) | null
  v: string
}

export interface NumericContext {
  /** Una funzione di una variabile: un'espressione, il nome di una funzione della nota, un'equazione (f = g). */
  fn(node: MathNode): OneVariable | null
  number(node: MathNode): number
  /** Una matrice o un vettore colonna: con le frazioni (null se non si può) e con la virgola. */
  matrix(node: MathNode): { exact: Rational[][] | null; float: number[][] } | null
  /** Un'equazione differenziale del primo ordine y' = f(x, y) e la condizione y(x₀) = y₀. */
  ode(eq: MathNode, start: MathNode): { f: (x: number, y: number) => number; x: string; y: string; x0: number; y0: number } | null
  style: FormatOptions
}

/** Un intervallo con un po' di margine da tutte e due le parti. */
const padded = (a: number, b: number): [number, number] => {
  const m = Math.max(0.25 * (b - a), 0.5)
  return [a - m, b + m]
}

/** Quello da disegnare: le curve (f, il polinomio, la soluzione) e i punti (lo zero, i dati, i passi). */
export interface Plot {
  /** `extent`: la parte dell'asse x da mostrare (l'intervallo, i dati, i passi). */
  curves: { label: string; f: (x: number) => number; dashed?: boolean; extent?: [number, number] }[]
  points: { x: number; y: number; name: string | null }[]
}

// ——— Come si scrivono i numeri ———

const SUPER: Record<string, string> = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }

/** Un numero con `sig` cifre significative (senza gli zeri in fondo); i piccolissimi con la potenza di 10. */
function numberShown(v: number, sig = 10): { tex: string; text: string } {
  if (!Number.isFinite(v)) return { tex: '\\text{?}', text: '?' }
  if (v === 0) return { tex: '0', text: '0' }
  const a = Math.abs(v)
  if (a < 1e-4 || a >= 1e10) {
    const [m, e] = v.toExponential(Math.min(sig, 4) - 1).split('e')
    const mantissa = m.includes('.') ? m.replace(/0+$/, '').replace(/\.$/, '') : m
    const exp = String(Number(e))
    const power = { tex: `10^{${exp}}`, text: `10${[...exp].map((c) => SUPER[c]).join('')}` }
    // 1·10⁻⁶ si scrive 10⁻⁶.
    if (mantissa === '1' || mantissa === '-1') return { tex: `${mantissa === '-1' ? '-' : ''}${power.tex}`, text: `${mantissa === '-1' ? '−' : ''}${power.text}` }
    return {
      tex: `${mantissa.replace('.', '{,}')} \\cdot ${power.tex}`,
      text: `${mantissa.replace('.', ',').replace('-', '−')}·${power.text}`,
    }
  }
  let s = v.toPrecision(sig)
  if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '')
  return { tex: s.replace('.', '{,}'), text: s.replace('.', ',').replace('-', '−') }
}

/** Una tabella: le intestazioni e le righe (troppe righe: le prime, i puntini e le ultime). */
function table(head: string[], rows: { tex: string; text: string }[][], most = 14): { tex: string; text: string } {
  let shown = rows
  let cut = false
  if (rows.length > most) {
    shown = [...rows.slice(0, most - 4), ...rows.slice(-3)]
    cut = true
  }
  const line = (r: { tex: string }[]) => r.map((c) => c.tex).join(' & ')
  const body = shown.map(line)
  if (cut) body.splice(most - 4, 0, head.map(() => '\\vdots').join(' & '))
  return {
    tex: `\\begin{array}{c|${'c'.repeat(head.length - 1)}} ${head.join(' & ')} \\\\ \\hline ${body.join(' \\\\ ')} \\end{array}`,
    text: rows.map((r) => r.map((c) => c.text).join(' ')).join('; '),
  }
}

const k = (i: number) => ({ tex: String(i), text: String(i) })

/** Il risultato: la tabella e sotto la conclusione. */
function withTable(t: { tex: string; text: string }, end: { tex: string; text: string }): FormattedResult {
  return { tex: `\\begin{array}{l} ${t.tex} \\\\[0.4em] ${end.tex} \\end{array}`, text: `${end.text} (passi: ${t.text})`, rich: true }
}

// ——— Gli zeri ———

/** Il valore di una tolleranza scritta (10^{-6}), o quella di sempre. */
function toleranceOf(ctx: NumericContext, node: MathNode | undefined, fallback: number): number {
  if (!node) return fallback
  const t = ctx.number(node)
  if (!(t > 0 && t < 1)) throw new MathError('La tolleranza è un numero piccolo, come 10^{-6}')
  return t
}

function intervalOf(ctx: NumericContext, args: MathNode[]): { a: number; b: number; rest: MathNode[] } {
  const [where, ...rest] = args
  if (where?.k === 'tuple' && where.items.length === 2) return { a: ctx.number(where.items[0]), b: ctx.number(where.items[1]), rest }
  if (args.length >= 2) return { a: ctx.number(args[0]), b: ctx.number(args[1]), rest: args.slice(2) }
  throw new MathError('Qui va l\'intervallo, come [1, 2]')
}

function bisection(ctx: NumericContext, args: MathNode[], plot?: Plot): FormattedResult {
  const g = ctx.fn(args[0])
  if (!g) throw new MathError('Qui va una funzione di una variabile')
  const { a: a0, b: b0, rest } = intervalOf(ctx, args.slice(1))
  const tol = toleranceOf(ctx, rest[0], 1e-6)
  let [a, b] = [Math.min(a0, b0), Math.max(a0, b0)]
  let fa = g.f(a)
  const fb = g.f(b)
  if (!(fa * fb < 0)) throw new MathError('Per la bisezione f(a) e f(b) devono avere segno opposto')
  const rows: { tex: string; text: string }[][] = []
  let c = (a + b) / 2
  for (let i = 1; i <= 200; i++) {
    c = (a + b) / 2
    const fc = g.f(c)
    rows.push([k(i), numberShown(a), numberShown(b), numberShown(c), numberShown(fc, 4)])
    if (fc === 0 || (b - a) / 2 < tol) break
    if (fa * fc < 0) b = c
    else {
      a = c
      fa = fc
    }
  }
  plot?.curves.push({ label: toLatex(args[0]), f: g.f, extent: padded(Math.min(a0, b0), Math.max(a0, b0)) })
  plot?.points.push({ x: c, y: 0, name: `${g.v}^*` })
  const t = table(['k', 'a_k', 'b_k', 'c_k', 'f(c_k)'], rows)
  const x = numberShown(c)
  const tolShown = numberShown(tol)
  return withTable(t, { tex: `${g.v} \\approx ${x.tex}\\quad \\text{(${rows.length} passi, } \\tfrac{b - a}{2} < ${tolShown.tex}\\text{)}`, text: `${g.v} ≈ ${x.text} (${rows.length} passi, (b − a)/2 < ${tolShown.text})` })
}

/** La derivata: con le lettere, o con le differenze finite. */
const derivative = (g: OneVariable) => g.df ?? ((x: number) => (g.f(x + 1e-6) - g.f(x - 1e-6)) / 2e-6)

function newton(ctx: NumericContext, args: MathNode[], plot?: Plot): FormattedResult {
  const g = ctx.fn(args[0])
  if (!g || args.length < 2) throw new MathError('Si scrive \\operatorname{newton}(f, x_0)')
  const tol = toleranceOf(ctx, args[2], 1e-10)
  const df = derivative(g)
  let x = ctx.number(args[1])
  const rows: { tex: string; text: string }[][] = []
  let converged = false
  for (let i = 0; i < 60; i++) {
    const fx = g.f(x)
    const d = df(x)
    rows.push([k(i), numberShown(x, 12), numberShown(fx, 4), numberShown(d, 6)])
    if (fx === 0) {
      converged = true
      break
    }
    if (!Number.isFinite(fx) || !Number.isFinite(d) || d === 0) throw new MathError(`In x = ${numberShown(x).text} la derivata è zero: Newton si ferma (prova un altro punto di partenza)`)
    const next = x - fx / d
    if (Math.abs(next - x) <= tol * Math.max(1, Math.abs(next))) {
      rows.push([k(i + 1), numberShown(next, 12), numberShown(g.f(next), 4), numberShown(df(next), 6)])
      x = next
      converged = true
      break
    }
    x = next
    if (Math.abs(x) > 1e12) break
  }
  if (!converged) throw new MathError('Newton non converge da questo punto di partenza')
  plot?.curves.push({ label: toLatex(args[0]), f: g.f, extent: padded(Math.min(x, ctx.number(args[1])), Math.max(x, ctx.number(args[1]))) })
  plot?.points.push({ x, y: 0, name: `${g.v}^*` })
  const t = table(['k', 'x_k', 'f(x_k)', "f'(x_k)"], rows)
  const xs = numberShown(x, 12)
  return withTable(t, { tex: `${g.v} \\approx ${xs.tex}\\quad \\text{(${rows.length - 1} passi)}`, text: `${g.v} ≈ ${xs.text} (${rows.length - 1} passi)` })
}

function secant(ctx: NumericContext, args: MathNode[], plot?: Plot): FormattedResult {
  const g = ctx.fn(args[0])
  if (!g || args.length < 3) throw new MathError('Si scrive \\operatorname{secanti}(f, x_0, x_1)')
  const tol = toleranceOf(ctx, args[3], 1e-10)
  let [x0, x1] = [ctx.number(args[1]), ctx.number(args[2])]
  const rows: { tex: string; text: string }[][] = [
    [k(0), numberShown(x0, 12), numberShown(g.f(x0), 4)],
    [k(1), numberShown(x1, 12), numberShown(g.f(x1), 4)],
  ]
  let converged = false
  for (let i = 2; i < 80; i++) {
    const [f0, f1] = [g.f(x0), g.f(x1)]
    if (f1 === f0) break
    const x2 = x1 - (f1 * (x1 - x0)) / (f1 - f0)
    rows.push([k(i), numberShown(x2, 12), numberShown(g.f(x2), 4)])
    if (Math.abs(x2 - x1) <= tol * Math.max(1, Math.abs(x2))) {
      x1 = x2
      converged = true
      break
    }
    ;[x0, x1] = [x1, x2]
  }
  if (!converged) throw new MathError('Il metodo delle secanti non converge da questi punti')
  plot?.curves.push({ label: toLatex(args[0]), f: g.f, extent: padded(Math.min(x1, ctx.number(args[1])), Math.max(x1, ctx.number(args[1]))) })
  plot?.points.push({ x: x1, y: 0, name: `${g.v}^*` })
  const t = table(['k', 'x_k', 'f(x_k)'], rows)
  const xs = numberShown(x1, 12)
  return withTable(t, { tex: `${g.v} \\approx ${xs.tex}`, text: `${g.v} ≈ ${xs.text}` })
}

function fixedPoint(ctx: NumericContext, args: MathNode[], plot?: Plot): FormattedResult {
  const g = ctx.fn(args[0])
  if (!g || args.length < 2) throw new MathError('Si scrive \\operatorname{puntofisso}(g, x_0): x_{k+1} = g(x_k)')
  const tol = toleranceOf(ctx, args[2], 1e-10)
  let x = ctx.number(args[1])
  const rows: { tex: string; text: string }[][] = [[k(0), numberShown(x, 12)]]
  let converged = false
  for (let i = 1; i <= 300; i++) {
    const next = g.f(x)
    rows.push([k(i), numberShown(next, 12)])
    if (!Number.isFinite(next) || Math.abs(next) > 1e12) break
    if (Math.abs(next - x) <= tol * Math.max(1, Math.abs(next))) {
      x = next
      converged = true
      break
    }
    x = next
  }
  const t = table(['k', 'x_k'], rows)
  if (!converged) {
    return withTable(t, { tex: '\\text{non converge: le iterate non si fermano}', text: 'non converge: le iterate non si fermano' })
  }
  plot?.curves.push({ label: toLatex(args[0]), f: g.f, extent: padded(x - 1, x + 1) }, { label: 'y = x', f: (t) => t, dashed: true })
  plot?.points.push({ x, y: x, name: `${g.v}^*` })
  // |g'(x*)| < 1: il punto fisso attrae.
  const slope = Math.abs(derivative(g)(x))
  const xs = numberShown(x, 12)
  const s = numberShown(slope, 4)
  return withTable(t, {
    tex: `${g.v}^* \\approx ${xs.tex}\\quad (|g'(${g.v}^*)| \\approx ${s.tex} < 1)`,
    text: `${g.v}* ≈ ${xs.text} (|g'(${g.v}*)| ≈ ${s.text} < 1)`,
  })
}

// ——— Interpolazione e minimi quadrati ———

/** I punti: (0, 1), (1, 3), … oppure due vettori x e y. Con le frazioni se si può. */
function pointsOf(ctx: NumericContext, args: MathNode[]): { exact: [Rational, Rational][] | null; float: [number, number][] } {
  if (args.length === 2 && args.every((a) => a.k !== 'tuple' || a.items.length !== 2)) {
    const X = ctx.matrix(args[0])
    const Y = ctx.matrix(args[1])
    if (X && Y && X.float.length === Y.float.length && X.float[0]?.length === 1 && Y.float[0]?.length === 1) {
      return {
        exact: X.exact && Y.exact ? X.exact.map((row, i) => [row[0], Y.exact![i][0]] as [Rational, Rational]) : null,
        float: X.float.map((row, i) => [row[0], Y.float[i][0]] as [number, number]),
      }
    }
  }
  const pairs = args.map((a) => {
    const m = ctx.matrix(a)
    if (!m || m.float.length !== 2 || m.float[0].length !== 1) throw new MathError('I punti si scrivono (x, y): (0, 1), (1, 3), (2, 2)')
    return m
  })
  return {
    exact: pairs.every((p) => p.exact) ? pairs.map((p) => [p.exact![0][0], p.exact![1][0]] as [Rational, Rational]) : null,
    float: pairs.map((p) => [p.float[0][0], p.float[1][0]] as [number, number]),
  }
}

/** Il polinomio (coefficienti dal grado 0) che passa per i punti: con le differenze divise di Newton. */
function interpolating<T>(xs: T[], ys: T[], ops: { sub(a: T, b: T): T; div(a: T, b: T): T; mul(a: T, b: T): T; add(a: T, b: T): T; zero: T; one: T }): T[] {
  const n = xs.length
  const coef = [...ys]
  for (let j = 1; j < n; j++) for (let i = n - 1; i >= j; i--) coef[i] = ops.div(ops.sub(coef[i], coef[i - 1]), ops.sub(xs[i], xs[i - j]))
  // Dalla forma di Newton ai coefficienti: Horner sui nodi.
  let poly: T[] = [coef[n - 1]]
  for (let i = n - 2; i >= 0; i--) {
    const next: T[] = Array.from({ length: poly.length + 1 }, () => ops.zero)
    for (let d = 0; d < poly.length; d++) {
      next[d + 1] = ops.add(next[d + 1], poly[d])
      next[d] = ops.sub(next[d], ops.mul(poly[d], xs[i]))
    }
    next[0] = ops.add(next[0], coef[i])
    poly = next
  }
  return poly
}

const RATIONAL_OPS = { sub: (a: Rational, b: Rational) => a.sub(b), div: (a: Rational, b: Rational) => a.div(b), mul: (a: Rational, b: Rational) => a.mul(b), add: (a: Rational, b: Rational) => a.add(b), zero: Rational.int(0), one: Rational.int(1) }
const NUMBER_OPS = { sub: (a: number, b: number) => a - b, div: (a: number, b: number) => a / b, mul: (a: number, b: number) => a * b, add: (a: number, b: number) => a + b, zero: 0, one: 1 }

/** Un polinomio con i coefficienti frazioni, dal grado più alto: −(3/2)x² + (7/2)x + 1. */
function exactPolynomial(p: Rational[]): { tex: string; text: string } {
  const terms: { tex: string; text: string; neg: boolean }[] = []
  for (let d = p.length - 1; d >= 0; d--) {
    const c = p[d]
    if (c.sign === 0) continue
    const a = c.abs()
    const power = d === 0 ? { tex: '', text: '' } : d === 1 ? { tex: 'x', text: 'x' } : { tex: `x^{${d}}`, text: `x${[...String(d)].map((ch) => SUPER[ch]).join('')}` }
    const one = a.cmp(Rational.int(1)) === 0 && d > 0
    const coef = one ? { tex: '', text: '' } : a.isInteger ? { tex: String(a.n), text: String(a.n) } : { tex: `\\frac{${a.n}}{${a.d}}`, text: d > 0 ? `(${a.n}/${a.d})` : `${a.n}/${a.d}` }
    terms.push({ tex: `${coef.tex}${power.tex}`, text: `${coef.text}${power.text}`, neg: c.sign < 0 })
  }
  if (!terms.length) return { tex: '0', text: '0' }
  return {
    tex: terms.map((t, i) => (i === 0 ? (t.neg ? '-' : '') : t.neg ? ' - ' : ' + ') + t.tex).join(''),
    text: terms.map((t, i) => (i === 0 ? (t.neg ? '−' : '') : t.neg ? ' − ' : ' + ') + t.text).join(''),
  }
}

/** Un polinomio con i coefficienti con la virgola, dal grado più alto. */
function floatPolynomial(p: number[], v: string): { tex: string; text: string } {
  const terms: { tex: string; text: string; neg: boolean }[] = []
  for (let d = p.length - 1; d >= 0; d--) {
    const c = p[d]
    if (Math.abs(c) < 1e-12) continue
    const a = numberShown(Math.abs(c), 6)
    const power = d === 0 ? { tex: '', text: '' } : d === 1 ? { tex: v, text: v } : { tex: `${v}^{${d}}`, text: `${v}${[...String(d)].map((ch) => SUPER[ch]).join('')}` }
    const one = Math.abs(Math.abs(c) - 1) < 1e-12 && d > 0
    terms.push({ tex: `${one ? '' : a.tex}${power.tex}`, text: `${one ? '' : a.text}${power.text}`, neg: c < 0 })
  }
  if (!terms.length) return { tex: '0', text: '0' }
  return {
    tex: terms.map((t, i) => (i === 0 ? (t.neg ? '-' : '') : t.neg ? ' - ' : ' + ') + t.tex).join(''),
    text: terms.map((t, i) => (i === 0 ? (t.neg ? '−' : '') : t.neg ? ' − ' : ' + ') + t.text).join(''),
  }
}

/** I punti dei dati e una curva, nel disegno. */
function plotData(plot: Plot | undefined, pts: [number, number][], p: number[], label: string): void {
  if (!plot) return
  for (const [x, y] of pts) plot.points.push({ x, y, name: null })
  const xs = pts.map((q) => q[0])
  plot.curves.push({ label, f: (x) => p.reduce((s, c, i) => s + c * x ** i, 0), extent: padded(Math.min(...xs), Math.max(...xs)) })
}

function interpolation(ctx: NumericContext, args: MathNode[], plot?: Plot): FormattedResult {
  const pts = pointsOf(ctx, args)
  const xs = pts.float.map((p) => p[0])
  if (new Set(xs).size !== xs.length) throw new MathError('Due punti hanno la stessa x: non c\'è un polinomio che passa per tutti')
  const degree = pts.float.length - 1
  if (pts.exact) {
    const p = interpolating(pts.exact.map((q) => q[0]), pts.exact.map((q) => q[1]), RATIONAL_OPS)
    plotData(plot, pts.float, p.map((c) => c.toNumber()), 'p(x)')
    const shown = exactPolynomial(p)
    return { tex: `p(x) = ${shown.tex}`, text: `p(x) = ${shown.text} (grado ≤ ${degree})`, rich: true }
  }
  const p = interpolating(xs, pts.float.map((q) => q[1]), NUMBER_OPS)
  plotData(plot, pts.float, p, 'p(x)')
  const shown = floatPolynomial(p, 'x')
  return { tex: `p(x) = ${shown.tex}`, text: `p(x) = ${shown.text} (grado ≤ ${degree})`, rich: true }
}

/** Il sistema A c = b risolto con Gauss (con il pivot); null se è singolare. */
function solveLinear<T>(A: T[][], b: T[], ops: typeof RATIONAL_OPS | typeof NUMBER_OPS, size: (x: T) => number): T[] | null {
  const n = A.length
  const M = A.map((row, i) => [...row, b[i]]) as T[][]
  const o = ops as unknown as { sub(a: T, b: T): T; div(a: T, b: T): T; mul(a: T, b: T): T }
  for (let c = 0; c < n; c++) {
    let p = c
    for (let r = c + 1; r < n; r++) if (size(M[r][c]) > size(M[p][c])) p = r
    if (size(M[p][c]) < 1e-14) return null
    ;[M[c], M[p]] = [M[p], M[c]]
    for (let r = 0; r < n; r++) {
      if (r === c) continue
      const f = o.div(M[r][c], M[c][c])
      for (let j = c; j <= n; j++) M[r][j] = o.sub(M[r][j], o.mul(f, M[c][j]))
    }
  }
  return M.map((row, i) => o.div(row[n], M[i][i]))
}

function leastSquares(ctx: NumericContext, args: MathNode[], plot?: Plot): FormattedResult {
  const last = args[args.length - 1]
  // L'ultimo numero da solo è il grado (1 se non c'è: la retta).
  const lastIsDegree = args.length >= 2 && last.k === 'num'
  const degree = lastIsDegree ? ctx.number(last) : 1
  const pts = pointsOf(ctx, lastIsDegree ? args.slice(0, -1) : args)
  if (!(Number.isInteger(degree) && degree >= 0 && degree < pts.float.length)) throw new MathError('Il grado va da 0 al numero dei punti meno 1')
  const m = degree + 1
  const normal = <T>(points: [T, T][], ops: typeof RATIONAL_OPS | typeof NUMBER_OPS, size: (x: T) => number) => {
    const o = ops as unknown as { add(a: T, b: T): T; mul(a: T, b: T): T; zero: T; one: T }
    const pow = (x: T, e: number) => {
      let r = o.one
      for (let i = 0; i < e; i++) r = o.mul(r, x)
      return r
    }
    const A: T[][] = Array.from({ length: m }, (_, i) => Array.from({ length: m }, (_, j) => points.reduce((s, [x]) => o.add(s, pow(x, i + j)), o.zero)))
    const b: T[] = Array.from({ length: m }, (_, i) => points.reduce((s, [x, y]) => o.add(s, o.mul(pow(x, i), y)), o.zero))
    return solveLinear(A, b, ops, size)
  }
  const residual = (p: number[]) => pts.float.reduce((s, [x, y]) => s + (y - p.reduce((acc, c, i) => acc + c * x ** i, 0)) ** 2, 0)
  if (pts.exact) {
    const p = normal(pts.exact, RATIONAL_OPS, (x) => Math.abs(x.toNumber()))
    if (!p) throw new MathError('I punti non bastano per questo grado')
    plotData(plot, pts.float, p.map((c) => c.toNumber()), 'p(x)')
    const shown = exactPolynomial(p)
    const r = numberShown(residual(p.map((c) => c.toNumber())), 6)
    return { tex: `p(x) = ${shown.tex}\\quad (\\textstyle\\sum r_i^2 = ${r.tex})`, text: `p(x) = ${shown.text} (Σ r² = ${r.text})`, rich: true }
  }
  const p = normal(pts.float, NUMBER_OPS, Math.abs)
  if (!p) throw new MathError('I punti non bastano per questo grado')
  plotData(plot, pts.float, p, 'p(x)')
  const shown = floatPolynomial(p, 'x')
  const r = numberShown(residual(p), 6)
  return { tex: `p(x) = ${shown.tex}\\quad (\\textstyle\\sum r_i^2 = ${r.tex})`, text: `p(x) = ${shown.text} (Σ r² = ${r.text})`, rich: true }
}

// ——— Le formule di quadratura ———

function quadrature(ctx: NumericContext, args: MathNode[], rule: 'midpoint' | 'trapezoid' | 'simpson', plot?: Plot): FormattedResult {
  const g = ctx.fn(args[0])
  if (!g) throw new MathError('Qui va una funzione di una variabile')
  const { a, b, rest } = intervalOf(ctx, args.slice(1))
  plot?.curves.push({ label: toLatex(args[0]), f: g.f, extent: padded(Math.min(a, b), Math.max(a, b)) })
  const n = rest[0] ? ctx.number(rest[0]) : rule === 'simpson' ? 4 : 4
  if (!(Number.isInteger(n) && n >= 1 && n <= 100000)) throw new MathError('Il numero dei sottointervalli è un intero positivo')
  if (rule === 'simpson' && n % 2) throw new MathError('Per Simpson i sottointervalli devono essere in numero pari')
  const h = (b - a) / n
  let s = 0
  if (rule === 'midpoint') for (let i = 0; i < n; i++) s += g.f(a + (i + 0.5) * h)
  else if (rule === 'trapezoid') {
    s = (g.f(a) + g.f(b)) / 2
    for (let i = 1; i < n; i++) s += g.f(a + i * h)
  } else {
    s = g.f(a) + g.f(b)
    for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * g.f(a + i * h)
    s /= 3
  }
  const value = s * h
  const exact = integrate(g.f, a, b)
  const v = numberShown(value, 10)
  const e = numberShown(Math.abs(value - exact), 3)
  const name = { midpoint: 'punto medio', trapezoid: 'trapezi', simpson: 'Simpson' }[rule]
  return {
    tex: `\\approx ${v.tex}\\quad \\text{(${name}, n = ${n}; errore } \\approx ${e.tex}\\text{)}`,
    text: `≈ ${v.text} (${name}, n = ${n}; errore ≈ ${e.text})`,
    rich: true,
  }
}

// ——— Le matrici ———

function matrixShown(m: (Rational | number)[][], style: FormatOptions): { tex: string; text: string } {
  const cell = (x: Rational | number) => (typeof x === 'number' ? numberShown(Math.abs(x) < 1e-13 ? 0 : x, 6) : formatRational(x, style))
  const cells = m.map((row) => row.map(cell))
  return {
    tex: `\\begin{pmatrix} ${cells.map((row) => row.map((c) => c.tex).join(' & ')).join(' \\\\ ')} \\end{pmatrix}`,
    text: `(${cells.map((row) => row.map((c) => c.text).join('  ')).join(' ; ')})`,
  }
}

function squareOf(ctx: NumericContext, node: MathNode): { exact: Rational[][] | null; float: number[][] } {
  const A = ctx.matrix(node)
  if (!A || !A.float.length || A.float.some((r) => r.length !== A.float.length)) throw new MathError('Qui va una matrice quadrata')
  return A
}

/** La fattorizzazione LU (Doolittle), con lo scambio di righe solo quando un pivot è zero: PA = LU. */
function lu(ctx: NumericContext, args: MathNode[]): FormattedResult {
  const A = squareOf(ctx, args[0])
  const n = A.float.length
  type T = Rational | number
  const exact = !!A.exact
  const M: T[][] = (A.exact ?? A.float).map((r) => [...r])
  const zero = (x: T) => (typeof x === 'number' ? Math.abs(x) < 1e-13 : x.sign === 0)
  const sub = (a: T, b: T) => (typeof a === 'number' ? a - (b as number) : a.sub(b as Rational))
  const mul = (a: T, b: T) => (typeof a === 'number' ? a * (b as number) : a.mul(b as Rational))
  const div = (a: T, b: T) => (typeof a === 'number' ? a / (b as number) : a.div(b as Rational))
  const ZERO: T = exact ? Rational.int(0) : 0
  const ONE: T = exact ? Rational.int(1) : 1
  const L: T[][] = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? ONE : ZERO)))
  const perm = Array.from({ length: n }, (_, i) => i)
  let swapped = false
  for (let c = 0; c < n; c++) {
    if (zero(M[c][c])) {
      const r = M.findIndex((row, i) => i > c && !zero(row[c]))
      if (r < 0) throw new MathError('La matrice è singolare: non ha la fattorizzazione LU')
      ;[M[c], M[r]] = [M[r], M[c]]
      ;[perm[c], perm[r]] = [perm[r], perm[c]]
      for (let j = 0; j < c; j++) [L[c][j], L[r][j]] = [L[r][j], L[c][j]]
      swapped = true
    }
    for (let r = c + 1; r < n; r++) {
      const f = div(M[r][c], M[c][c])
      L[r][c] = f
      for (let j = c; j < n; j++) M[r][j] = sub(M[r][j], mul(f, M[c][j]))
    }
  }
  const P = perm.map((p) => Array.from({ length: n }, (_, j) => (j === p ? ONE : ZERO)))
  const parts = [...(swapped ? [{ name: 'P', m: P }] : []), { name: 'L', m: L }, { name: 'U', m: M }]
  const shown = parts.map((p) => ({ name: p.name, ...matrixShown(p.m, ctx.style) }))
  return {
    tex: `${swapped ? '\\text{(PA = LU)}\\ ' : ''}${shown.map((s) => `${s.name} = ${s.tex}`).join(',\\quad ')}`,
    text: `${swapped ? '(PA = LU) ' : ''}${shown.map((s) => `${s.name} = ${s.text}`).join(', ')}`,
    rich: true,
  }
}

/** Cholesky: A = L Lᵀ, con A simmetrica e definita positiva. */
function cholesky(ctx: NumericContext, args: MathNode[]): FormattedResult {
  const A = squareOf(ctx, args[0]).float
  const n = A.length
  for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) if (Math.abs(A[i][j] - A[j][i]) > 1e-12) throw new MathError('Per Cholesky la matrice deve essere simmetrica')
  const L = Array.from({ length: n }, () => Array(n).fill(0) as number[])
  for (let j = 0; j < n; j++) {
    let d = A[j][j]
    for (let k2 = 0; k2 < j; k2++) d -= L[j][k2] ** 2
    if (d <= 1e-14) throw new MathError('La matrice non è definita positiva: Cholesky non si fa')
    L[j][j] = Math.sqrt(d)
    for (let i = j + 1; i < n; i++) {
      let s = A[i][j]
      for (let k2 = 0; k2 < j; k2++) s -= L[i][k2] * L[j][k2]
      L[i][j] = s / L[j][j]
    }
  }
  const shown = matrixShown(L, ctx.style)
  return { tex: `L = ${shown.tex}\\quad (A = L L^{T})`, text: `L = ${shown.text} (A = L Lᵀ)`, rich: true }
}

/** Gli autovalori di una matrice simmetrica (Jacobi). */
function symmetricEigenvalues(S: number[][]): number[] {
  const n = S.length
  const a = S.map((r) => [...r])
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += a[i][j] ** 2
    if (off < 1e-24) break
    for (let p = 0; p < n; p++) {
      for (let q = p + 1; q < n; q++) {
        if (Math.abs(a[p][q]) < 1e-300) continue
        const theta = (a[q][q] - a[p][p]) / (2 * a[p][q])
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1))
        const c = 1 / Math.sqrt(t * t + 1)
        const s = t * c
        for (let r = 0; r < n; r++) {
          const [arp, arq] = [a[r][p], a[r][q]]
          a[r][p] = c * arp - s * arq
          a[r][q] = s * arp + c * arq
        }
        for (let r = 0; r < n; r++) {
          const [apr, aqr] = [a[p][r], a[q][r]]
          a[p][r] = c * apr - s * aqr
          a[q][r] = s * apr + c * aqr
        }
      }
    }
  }
  return a.map((r, i) => r[i])
}

const transposeOf = (m: number[][]) => m[0].map((_, j) => m.map((r) => r[j]))
const product = (a: number[][], b: number[][]) => a.map((r) => b[0].map((_, j) => r.reduce((s, x, k2) => s + x * b[k2][j], 0)))

function inverseOf(m: number[][]): number[][] {
  const n = m.length
  const cols = Array.from({ length: n }, (_, j) => solveLinear(m, m.map((_, i) => (i === j ? 1 : 0)), NUMBER_OPS, Math.abs))
  if (cols.some((c) => !c)) throw new MathError('La matrice è singolare: il condizionamento è infinito')
  return m.map((_, i) => cols.map((c) => c![i]))
}

type NormKind = 1 | 2 | 'inf' | 'F'

function normKind(ctx: NumericContext, node: MathNode | undefined): NormKind {
  if (!node) return 2
  if (node.k === 'infty') return 'inf'
  if (node.k === 'name' && (node.name === 'F' || node.name === 'f')) return 'F'
  const p = ctx.number(node)
  if (p === 1 || p === 2) return p
  throw new MathError('La norma è 1, 2, \\infty o F (Frobenius)')
}

function normOf(m: number[][], p: NormKind): number {
  const vector = m[0].length === 1
  if (vector) {
    const v = m.map((r) => Math.abs(r[0]))
    if (p === 1) return v.reduce((s, x) => s + x, 0)
    if (p === 'inf') return Math.max(...v)
    return Math.sqrt(v.reduce((s, x) => s + x * x, 0))
  }
  if (p === 1) return Math.max(...m[0].map((_, j) => m.reduce((s, r) => s + Math.abs(r[j]), 0)))
  if (p === 'inf') return Math.max(...m.map((r) => r.reduce((s, x) => s + Math.abs(x), 0)))
  if (p === 'F') return Math.sqrt(m.reduce((s, r) => s + r.reduce((t, x) => t + x * x, 0), 0))
  return Math.sqrt(Math.max(...symmetricEigenvalues(product(transposeOf(m), m))))
}

const NORM_TEX: Record<string, string> = { 1: '1', 2: '2', inf: '\\infty', F: 'F' }
const NORM_TEXT: Record<string, string> = { 1: '₁', 2: '₂', inf: '∞', F: 'F' }

function norm(ctx: NumericContext, args: MathNode[]): FormattedResult {
  const A = ctx.matrix(args[0])
  if (!A) throw new MathError('Qui va un vettore o una matrice')
  const p = normKind(ctx, args[1])
  const v = normOf(A.float, p)
  // Le norme 1 e ∞ con le frazioni restano esatte.
  if (A.exact && (p === 1 || p === 'inf')) {
    const m = A.exact
    const vector = m[0].length === 1
    const abs = (x: Rational) => x.abs()
    const sums = vector ? (p === 1 ? [m.reduce((s, r) => s.add(abs(r[0])), Rational.int(0))] : m.map((r) => abs(r[0]))) : p === 1 ? m[0].map((_, j) => m.reduce((s, r) => s.add(abs(r[j])), Rational.int(0))) : m.map((r) => r.reduce((s, x) => s.add(abs(x)), Rational.int(0)))
    const best = sums.reduce((a, b) => (b.cmp(a) > 0 ? b : a))
    const shown = formatRational(best, ctx.style)
    return { tex: shown.tex, text: shown.text }
  }
  // La norma 2 di un vettore (o quella di Frobenius) con le frazioni: la radice esatta, se si riconosce.
  const exact = A.exact && (p === 2 || p === 'F') && (A.exact[0].length === 1 || p === 'F') ? exactNear(v) : null
  if (exact) {
    const n = toNode(exact)
    return { tex: toLatex(n), text: plainText(n) }
  }
  const shown = numberShown(v, 10)
  return { tex: `\\approx ${shown.tex}`, text: `≈ ${shown.text}` }
}

function condition(ctx: NumericContext, args: MathNode[]): FormattedResult {
  const A = squareOf(ctx, args[0]).float
  const p = normKind(ctx, args[1])
  const c = normOf(A, p) * normOf(inverseOf(A), p)
  const shown = numberShown(c, 8)
  return { tex: `K_{${NORM_TEX[p]}}(A) \\approx ${shown.tex}`, text: `K${NORM_TEXT[p]}(A) ≈ ${shown.text}` }
}

/** Il raggio spettrale: con il polinomio caratteristico (Faddeev–LeVerrier) e le sue radici. */
function spectralRadius(B: number[][]): number {
  const n = B.length
  // c_k del polinomio caratteristico det(λI − B) = λⁿ + c₁λⁿ⁻¹ + … + cₙ.
  let M = B.map((r) => r.map(() => 0))
  const c: number[] = [1]
  for (let k2 = 1; k2 <= n; k2++) {
    const prev = c[k2 - 1]
    M = product(B, M).map((r, i) => r.map((x, j) => x + (i === j ? prev : 0)))
    const AM = product(B, M)
    c.push(-AM.reduce((s, r, i) => s + r[i], 0) / k2)
  }
  const roots = numericRoots([...c].reverse())
  return Math.max(...roots.map((r) => Math.hypot(r.re, r.im)))
}

function iterative(ctx: NumericContext, args: MathNode[], method: 'jacobi' | 'gaussseidel'): FormattedResult {
  if (args.length < 2) throw new MathError(`Si scrive \\operatorname{${method === 'jacobi' ? 'jacobi' : 'gaussseidel'}}(A, b), anche con x_0 e il numero dei passi`)
  const A = squareOf(ctx, args[0]).float
  const n = A.length
  const bm = ctx.matrix(args[1])
  if (!bm || bm.float.length !== n || bm.float[0].length !== 1) throw new MathError(`b è un vettore di ${n} numeri`)
  const b = bm.float.map((r) => r[0])
  let x: number[] = Array(n).fill(0)
  let steps = 0
  if (args[2]) {
    const x0 = ctx.matrix(args[2])
    if (x0 && x0.float.length === n && x0.float[0].length === 1) x = x0.float.map((r) => r[0])
    else steps = ctx.number(args[2])
  }
  if (args[3]) steps = ctx.number(args[3])
  if (A.some((r, i) => r[i] === 0)) throw new MathError('Sulla diagonale c\'è uno zero: il metodo non si può usare')
  // La matrice d'iterazione: Jacobi B = −D⁻¹(L + U), Gauss–Seidel B = −(D + L)⁻¹U.
  const lower = A.map((r, i) => r.map((v, j) => (j < i || (method === 'gaussseidel' && j === i) ? v : 0)))
  const upper = A.map((r, i) => r.map((v, j) => (j > i ? v : 0)))
  const B =
    method === 'jacobi'
      ? A.map((r, i) => r.map((v, j) => (i === j ? 0 : -v / A[i][i])))
      : product(inverseOf(lower), upper).map((r) => r.map((v) => -v))
  const rho = spectralRadius(B)
  const dominant = A.every((r, i) => Math.abs(r[i]) > r.reduce((s, v, j) => (j === i ? s : s + Math.abs(v)), 0))
  const rows: { tex: string; text: string }[][] = [[k(0), ...x.map((v) => numberShown(v, 8))]]
  const most = steps > 0 ? Math.min(steps, 500) : 500
  for (let it = 1; it <= most; it++) {
    const next = [...x]
    for (let i = 0; i < n; i++) {
      let s = b[i]
      for (let j = 0; j < n; j++) if (j !== i) s -= A[i][j] * (method === 'gaussseidel' ? next[j] : x[j])
      next[i] = s / A[i][i]
    }
    const change = Math.max(...next.map((v, i) => Math.abs(v - x[i])))
    x = next
    rows.push([k(it), ...x.map((v) => numberShown(v, 8))])
    if (!steps && change < 1e-10) break
    if (!x.every(Number.isFinite) || Math.max(...x.map(Math.abs)) > 1e12) break
  }
  const head = ['k', ...x.map((_, i) => `x_{${i + 1}}`)]
  const t = table(head, rows, 12)
  const r = numberShown(rho, 4)
  const why = dominant ? 'a diagonale dominante' : rho < 1 ? 'ρ(B) < 1' : 'ρ(B) ≥ 1'
  const verdict = rho < 1 ? `converge (${why})` : 'non converge (ρ(B) ≥ 1)'
  const last = x.map((v) => numberShown(v, 8))
  return withTable(t, {
    tex: `\\rho(B) \\approx ${r.tex}:\\ \\text{${verdict}}${rho < 1 ? `,\\ x \\approx \\left(${last.map((v) => v.tex).join(';\\ ')}\\right)` : ''}`,
    text: `ρ(B) ≈ ${r.text}: ${verdict}${rho < 1 ? `, x ≈ (${last.map((v) => v.text).join('; ')})` : ''}`,
  })
}

// ——— Le equazioni differenziali ———

function odeMethod(ctx: NumericContext, args: MathNode[], method: 'euler' | 'heun' | 'rk4', plot?: Plot): FormattedResult {
  if (args.length < 3) throw new MathError('Si scrive \\operatorname{eulero}(y\' = x + y, y(0) = 1, h, n)')
  const problem = ctx.ode(args[0], args[1])
  if (!problem) throw new MathError('Qui va un\'equazione del primo ordine, come y\' = x + y, e la condizione y(0) = 1')
  const h = ctx.number(args[2])
  const n = args[3] ? ctx.number(args[3]) : 10
  if (!(h > 0) || !(Number.isInteger(n) && n >= 1 && n <= 10000)) throw new MathError('Il passo h è positivo e i passi n sono un intero')
  const { f, x0, y0 } = problem
  const rows: { tex: string; text: string }[][] = []
  let [x, y] = [x0, y0]
  rows.push([k(0), numberShown(x, 8), numberShown(y, 10)])
  plot?.points.push({ x, y, name: null })
  for (let i = 1; i <= n; i++) {
    if (method === 'euler') y = y + h * f(x, y)
    else if (method === 'heun') {
      const k1 = f(x, y)
      const k2 = f(x + h, y + h * k1)
      y = y + (h / 2) * (k1 + k2)
    } else {
      const k1 = f(x, y)
      const k2 = f(x + h / 2, y + (h / 2) * k1)
      const k3 = f(x + h / 2, y + (h / 2) * k2)
      const k4 = f(x + h, y + h * k3)
      y = y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4)
    }
    x = x0 + i * h
    rows.push([k(i), numberShown(x, 8), numberShown(y, 10)])
    plot?.points.push({ x, y, name: null })
  }
  // Il valore «vero» con passi molto più piccoli (Runge–Kutta), per l'errore.
  let [xt, yt] = [x0, y0]
  const fine = 200
  const hh = h / fine
  for (let i = 0; i < n * fine; i++) {
    const k1 = f(xt, yt)
    const k2 = f(xt + hh / 2, yt + (hh / 2) * k1)
    const k3 = f(xt + hh / 2, yt + (hh / 2) * k2)
    const k4 = f(xt + hh, yt + hh * k3)
    yt += (hh / 6) * (k1 + 2 * k2 + 2 * k3 + k4)
    xt = x0 + (i + 1) * hh
  }
  // Nel disegno la soluzione «vera» (Runge–Kutta con il passo piccolo) e i punti del metodo.
  plot?.curves.push({ label: `${problem.y}(${problem.x})`, f: odeSolution((xx, Y) => f(xx, Y[0]), x0, [y0], Math.min(0.01, h / 10)), extent: padded(x0, x) })
  const t = table(['k', `${problem.x}_k`, `${problem.y}_k`], rows)
  const name = { euler: 'Eulero', heun: 'Heun', rk4: 'Runge–Kutta 4' }[method]
  const yv = numberShown(y, 10)
  const err = numberShown(Math.abs(y - yt), 3)
  const xe = numberShown(x, 8)
  return withTable(t, {
    tex: `${problem.y}(${xe.tex}) \\approx ${yv.tex}\\quad \\text{(${name}; errore } \\approx ${err.tex}\\text{)}`,
    text: `${problem.y}(${xe.text}) ≈ ${yv.text} (${name}; errore ≈ ${err.text})`,
  })
}

/** Le funzioni di questo modulo, con i nomi di parse.ts. */
export const NUMERICAL = new Set(['bisection', 'newton', 'secant', 'fixedpoint', 'interpolate', 'leastsquares', 'midpoint', 'trapezoid', 'simpson', 'lu', 'cholesky', 'norm', 'cond', 'jacobi', 'gaussseidel', 'euler', 'heun', 'rk4'])

export function numericalShown(node: MathNode, ctx: NumericContext, plot?: Plot): FormattedResult | null {
  if (node.k !== 'fn' || node.pow || !NUMERICAL.has(node.name)) return null
  const args = node.args
  switch (node.name) {
    case 'bisection':
      return bisection(ctx, args, plot)
    case 'newton':
      return newton(ctx, args, plot)
    case 'secant':
      return secant(ctx, args, plot)
    case 'fixedpoint':
      return fixedPoint(ctx, args, plot)
    case 'interpolate':
      return interpolation(ctx, args, plot)
    case 'leastsquares':
      return leastSquares(ctx, args, plot)
    case 'midpoint':
    case 'trapezoid':
    case 'simpson':
      return quadrature(ctx, args, node.name, plot)
    case 'lu':
      return lu(ctx, args)
    case 'cholesky':
      return cholesky(ctx, args)
    case 'norm':
      return norm(ctx, args)
    case 'cond':
      return condition(ctx, args)
    case 'jacobi':
    case 'gaussseidel':
      return iterative(ctx, args, node.name)
    case 'euler':
    case 'heun':
    case 'rk4':
      return odeMethod(ctx, args, node.name, plot)
    default:
      return null
  }
}

/** Le funzioni che hanno un disegno: gli zeri, i dati, la quadratura, le equazioni differenziali. */
const PLOTTED = new Set(['bisection', 'newton', 'secant', 'fixedpoint', 'interpolate', 'leastsquares', 'midpoint', 'trapezoid', 'simpson', 'euler', 'heun', 'rk4'])

export const isPlottedNumerical = (node: MathNode): boolean => node.k === 'fn' && !node.pow && PLOTTED.has(node.name)

/** Il disegno di una riga del calcolo numerico; null se non ne ha uno (LU, le norme…). */
export function numericalPlot(node: MathNode, ctx: NumericContext): Plot | null {
  if (!isPlottedNumerical(node)) return null
  const plot: Plot = { curves: [], points: [] }
  numericalShown(node, ctx, plot)
  return plot
}
