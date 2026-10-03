/**
 * L'analisi in più variabili: i limiti (lungo le rette e le parabole, poi tutto attorno al punto), i
 * punti critici con la loro natura (con l'hessiana), i massimi e i minimi vincolati (i moltiplicatori di
 * Lagrange) e assoluti su un insieme chiuso e limitato (dentro, sul bordo e negli spigoli). I punti si
 * trovano con i numeri (Newton da tanti punti di partenza) e poi si riconoscono esatti (frazioni, radici,
 * multipli di π), controllando con le lettere che lo siano davvero.
 */
import { compile, EMPTY_SCOPE, scopeWith, type Compiled } from './evaluate'
import { Rational } from './exact'
import { formatNumber, type FormatOptions, type FormattedResult } from './format'
import { nameLatex, toLatex } from './latex'
import { severalLimit, type LimitValue } from './limits'
import { namesIn, type MathNode } from './parse'
import { fractionNear } from './polynomial'
import { add, derive, exOf, mul, num, plainText, pow, sub, subst, sym, symbols, tidy, toNode, type Ex, type SymbolScope } from './symbolic'

const R = (n: number | bigint, d: number | bigint = 1) => new Rational(BigInt(n), BigInt(d))
const HALF = R(1, 2)
const COORDS = ['x', 'y', 'z']

// ——— La funzione e i numeri ———

/** Una funzione di più variabili: f della nota (f(x, y) = …), o un'espressione in x, y (e z). */
export interface Several {
  f: Ex
  vars: string[]
  name: string | null
}

export function severalOf(node: MathNode, scope: SymbolScope, alsoUsed: ReadonlySet<string> = new Set()): Several | null {
  try {
    if (node.k === 'name' && scope.fns.has(node.name)) {
      const def = scope.fns.get(node.name)!
      if (def.params.length < 2 || def.params.length > 3) return null
      const f = exOf({ k: 'apply', name: node.name, args: def.params.map((p) => ({ k: 'name', name: p })), primes: 0 }, scope, def.params)
      return { f, vars: def.params, name: node.name }
    }
    const f = exOf(node, scope, COORDS)
    const free = symbols(f).filter((s) => s !== 'π' && s !== 'e')
    if (free.some((s) => !COORDS.includes(s))) return null
    // Le variabili: quelle di f, e quelle del vincolo (f = x su x² + y² = 1 è una funzione di x e y).
    const vars = COORDS.filter((c) => free.includes(c) || alsoUsed.has(c))
    return vars.length >= 2 ? { f, vars, name: null } : null
  } catch {
    return null
  }
}

function compiled(e: Ex, vars: string[]): Compiled | null {
  try {
    return compile(toNode(e), scopeWith(EMPTY_SCOPE, vars))
  } catch {
    return null
  }
}

/** p ↦ e(p), con le variabili `vars`. */
function numeric(e: Ex, vars: string[]): ((p: number[]) => number) | null {
  const c = compiled(e, vars)
  if (!c) return null
  const point: Record<string, number> = {}
  return (p) => {
    vars.forEach((v, i) => (point[v] = p[i]))
    try {
      return c(point)
    } catch {
      return NaN
    }
  }
}

function valueOf(e: Ex): number {
  const t = tidy(e)
  if (t.t === 'num') return t.v.toNumber()
  const f = compiled(t, [])
  if (!f) return NaN
  try {
    return f({})
  } catch {
    return NaN
  }
}

/** Zero davvero: con le lettere, o (con π e le radici dentro le funzioni) con tutte le cifre. */
function isZero(e: Ex): boolean {
  const t = tidy(e)
  if (t.t === 'num') return t.v.sign === 0
  const v = valueOf(t)
  return Number.isFinite(v) && Math.abs(v) < 1e-12
}

const SQUARE_FREE = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17, 19, 21, 22, 23, 26, 29, 30]

/** Il numero esatto vicino a v: una frazione, a + b√d, un multiplo di π; null se non lo si riconosce. */
export function exactNear(v: number): Ex | null {
  if (!Number.isFinite(v)) return null
  if (Math.abs(v) < 1e-11) return num(0)
  const f = fractionNear(v, 1000)
  if (f) return num(f)
  for (const d of SQUARE_FREE) {
    const root = Math.sqrt(d)
    for (const q of [1, 2, 3, 4, 6, 8, 9, 12]) {
      for (let k = 1; k <= 24; k++) {
        for (const s of [1, -1]) {
          const a = fractionNear(v - ((s * k) / q) * root, 100)
          if (a && Math.abs(a.toNumber() + ((s * k) / q) * root - v) < 1e-10 * Math.max(1, Math.abs(v))) {
            return add(num(a), mul(num(R(s * k, q)), pow(num(d), num(HALF))))
          }
        }
      }
    }
  }
  const p = fractionNear(v / Math.PI, 24)
  return p ? mul(num(p), sym('π')) : null
}

/** Una coordinata: esatta (se riconosciuta e controllata) e con la virgola. */
interface Coord {
  exact: Ex | null
  v: number
}

function coordShown(c: Coord, style: FormatOptions): { tex: string; text: string } {
  if (c.exact) {
    const n = toNode(c.exact, style.decimal)
    return { tex: toLatex(n), text: plainText(n) }
  }
  return formatNumber(c.v, { ...style, decimal: true, digits: 6 }) ?? { tex: String(c.v), text: String(c.v) }
}

function pointShown(p: Coord[], style: FormatOptions): { tex: string; text: string } {
  const cs = p.map((c) => coordShown(c, style))
  const sep = cs.some((c) => c.text.includes(',')) ? '; ' : ', '
  return { tex: `\\left(${cs.map((c) => c.tex).join(sep)}\\right)`, text: `(${cs.map((c) => c.text).join(sep)})` }
}

/**
 * Le soluzioni di F(p) = 0 (tante equazioni quante incognite) con Newton, partendo dai punti di una
 * griglia; le soluzioni diverse trovate, ripulite con qualche passo in più.
 */
function newtonAll(F: (p: number[]) => number[], n: number, grid: number[]): number[][] {
  const found: number[][] = []
  const starts: number[][] = [[]]
  for (let i = 0; i < n; i++) starts.splice(0, starts.length, ...starts.flatMap((s) => grid.map((g) => [...s, g])))
  for (const start of starts) {
    let p = [...start]
    for (let it = 0; it < 60; it++) {
      const Fp = F(p)
      if (!Fp.every(Number.isFinite)) break
      if (Math.max(...Fp.map(Math.abs)) < 1e-15) break
      const J = p.map((_, j) => {
        const h = 1e-7 * Math.max(1, Math.abs(p[j]))
        const q = [...p]
        q[j] += h
        return F(q).map((v, i) => (v - Fp[i]) / h)
      })
      const step = solveLinear(Fp.map((_, i) => p.map((_, j) => J[j][i])), Fp.map((v) => -v))
      if (!step) break
      // Newton smorzato: passi non troppo lunghi (dove f si appiattisce il gradiente è quasi zero, ma lì
      // non ci sono punti critici), e se il passo intero peggiora se ne fa metà.
      const size = Math.max(...Fp.map(Math.abs))
      const length = Math.max(...step.map(Math.abs))
      let k = Math.min(1, Math.max(1, ...p.map(Math.abs)) / length)
      for (let half = 0; half < 8; half++) {
        const q = p.map((v, i) => v + k * step[i])
        const Fq = F(q)
        if (Fq.every(Number.isFinite) && Math.max(...Fq.map(Math.abs)) < size) break
        k /= 2
      }
      p = p.map((v, i) => v + k * step[i])
      if (Math.max(...step.map(Math.abs)) * k < 1e-15 * Math.max(1, ...p.map(Math.abs))) break
    }
    const Fp = F(p)
    if (!Fp.every(Number.isFinite) || Math.max(...Fp.map(Math.abs)) > 1e-10 || p.some((v) => Math.abs(v) > 1e4)) continue
    if (!found.some((q) => q.every((v, i) => Math.abs(v - p[i]) < 1e-6 * Math.max(1, Math.abs(v))))) found.push(p)
  }
  return found
}

/** A x = b con l'eliminazione di Gauss (con il pivot più grande); null se A è singolare. */
function solveLinear(A: number[][], b: number[]): number[] | null {
  const n = b.length
  const M = A.map((row, i) => [...row, b[i]])
  for (let c = 0; c < n; c++) {
    let best = c
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[best][c])) best = r
    if (!(Math.abs(M[best][c]) > 1e-300)) return null
    ;[M[c], M[best]] = [M[best], M[c]]
    for (let r = 0; r < n; r++) {
      if (r === c) continue
      const k = M[r][c] / M[c][c]
      for (let j = c; j <= n; j++) M[r][j] -= k * M[c][j]
    }
  }
  const x = M.map((row, i) => row[n] / row[i])
  return x.every(Number.isFinite) ? x : null
}

const GRID = [-7, -3, -1.3, -0.4, 0.5, 1.2, 2.6, 6]
const GRID4 = [-4, -1.2, 0.4, 1.7, 5]

/**
 * Il punto esatto (se le coordinate si riconoscono e `check` lo conferma con le lettere), se no con la
 * virgola.
 */
function exactPoint(p: number[], check: (at: Ex[]) => boolean): Coord[] {
  const guess = p.map(exactNear)
  if (guess.every((g) => g) && check(guess as Ex[])) return guess.map((g) => ({ exact: g, v: valueOf(g!) }))
  // Dove Newton si avvicina piano (x⁴ + y⁴ in 0) le cifre sono meno: una frazione semplice vicina, se torna.
  const coarse = p.map((v) => {
    for (let q = 1; q <= 12; q++) if (Math.abs(v - Math.round(v * q) / q) < 1e-4) return num(R(Math.round(v * q), q))
    return null
  })
  if (coarse.every((g) => g) && check(coarse as Ex[])) return coarse.map((g) => ({ exact: g, v: valueOf(g!) }))
  return p.map((v) => ({ exact: null, v }))
}

/** e nel punto (con le lettere al posto delle variabili). */
function at(e: Ex, vars: string[], point: Ex[]): Ex {
  return tidy(vars.reduce((acc, v, i) => subst(acc, v, point[i]), e))
}

function valueAt(f: Ex, vars: string[], p: Coord[]): Coord {
  if (p.every((c) => c.exact)) {
    const exact = at(f, vars, p.map((c) => c.exact!))
    const v = valueOf(exact)
    // Solo se è scritto in modo semplice: un numero, una radice, un multiplo di π.
    if (Number.isFinite(v)) return { exact: toLatex(toNode(exact)).length < 60 ? exact : exactNear(v), v }
  }
  const fn = numeric(f, vars)
  const v = fn ? fn(p.map((c) => c.v)) : NaN
  return { exact: exactNear(v), v }
}

/** Più righe una sotto l'altra (i risultati lunghi non escono dalla pagina). */
function stacked(parts: { tex: string; text: string }[], textSep = '; '): FormattedResult {
  const tex = parts.length > 1 ? `\\begin{array}{l} ${parts.map((p) => p.tex).join(' \\\\ ')} \\end{array}` : parts[0].tex
  return { tex, text: parts.map((p) => p.text).join(textSep), rich: true }
}

// ——— I limiti ———

/** Il cammino x = a + v₀ t^{k₀}, y = b + v₁ t^{k₁} come curva: y = x, y = x², x = y², la retta… */
function pathLabel(vars: string[], point: number[], v: number[], power: number[]): { tex: string; text: string } {
  const shift = (i: number) => {
    const a = fractionNear(point[i], 1000)
    return a && a.sign ? sub(sym(vars[i]), num(a)) : sym(vars[i])
  }
  const shown = (lhs: string, e: Ex) => {
    const n = toNode(tidy(e))
    return { tex: `${nameLatex(lhs)} = ${toLatex(n)}`, text: `${lhs} = ${plainText(n)}` }
  }
  if (vars.length === 2) {
    const [x, y] = vars
    const b = fractionNear(point[1], 1000) ?? R(0)
    const a = fractionNear(point[0], 1000) ?? R(0)
    if (v[0] === 0) return shown(x, num(a))
    if (v[1] === 0) return shown(y, num(b))
    // y − b = (v₁/v₀^{k₁/k₀}) (x − a)^{k₁/k₀}: con le potenze dei cammini (1, 2, 3).
    if (power[0] === 1) return shown(y, add(num(b), mul(num(R(v[1]).div(R(v[0]).powInt(BigInt(power[1])))), pow(shift(0), num(power[1])))))
    return shown(x, add(num(a), mul(num(R(v[0]).div(R(v[1]).powInt(BigInt(power[0])))), pow(shift(1), num(power[0])))))
  }
  // Nello spazio: la curva con il parametro t.
  const items = vars.map((_, i) => {
    const a = fractionNear(point[i], 1000) ?? R(0)
    return add(num(a), mul(num(R(v[i])), pow(sym('t'), num(power[i]))))
  })
  const nodes = items.map((e) => toNode(tidy(e)))
  return {
    tex: `\\left(${vars.map(nameLatex).join(', ')}\\right) = \\left(${nodes.map(toLatex).join(', ')}\\right)`,
    text: `(${vars.join(', ')}) = (${nodes.map(plainText).join(', ')})`,
  }
}

function limitShown(value: LimitValue, style: FormatOptions): { tex: string; text: string } {
  if (value.k === 'infinity') return value.sign > 0 ? { tex: '+\\infty', text: '+∞' } : { tex: '-\\infty', text: '−∞' }
  if (value.k === 'none') return { tex: '\\nexists', text: 'non esiste' }
  const exact = exactNear(value.v)
  if (exact) {
    const n = toNode(exact, style.decimal)
    return { tex: toLatex(n), text: plainText(n) }
  }
  return formatNumber(value.v, { ...style, decimal: true, digits: 9 }) ?? { tex: String(value.v), text: String(value.v) }
}

/**
 * \lim_{(x, y) \to (a, b)} f: il valore (esatto se lo si riconosce), +∞, o «non esiste» con due cammini
 * che danno valori diversi. Null se non si riesce a dire.
 */
export function severalLimitShown(node: Extract<MathNode, { k: 'lim' }>, scope: SymbolScope, real: (n: MathNode) => number, style: FormatOptions): { shown: FormattedResult; value: number | null } | null {
  const vars = node.vars!
  if (node.to.k !== 'tuple') return null
  const point = node.to.items.map(real)
  if (!point.every(Number.isFinite)) return null
  let f: Ex
  try {
    f = exOf(node.body, scope, vars)
  } catch {
    return null
  }
  const fn = numeric(f, vars)
  if (!fn) return null
  // Continua nel punto: il valore lì, esatto.
  const there = fn(point)
  const exactPoint = point.map(exactNear)
  const found = severalLimit(fn, point, (v, power) => pathLabel(vars, point, v, power))
  if (!found) return null
  if (found.value.k === 'value' && Number.isFinite(there) && Math.abs(there - found.value.v) < 1e-9 * Math.max(1, Math.abs(there)) && exactPoint.every((e) => e)) {
    const exact = at(f, vars, exactPoint as Ex[])
    if (Math.abs(valueOf(exact) - there) < 1e-9 * Math.max(1, Math.abs(there))) {
      const n = toNode(exact, style.decimal)
      return { shown: { tex: toLatex(n), text: plainText(n) }, value: there }
    }
  }
  if (found.value.k === 'none') {
    if (!found.paths.length) return { shown: { tex: '\\nexists \\quad \\text{(dipende da come ci si avvicina)}', text: 'non esiste (dipende da come ci si avvicina)' }, value: null }
    const parts = found.paths.map((p) => {
      const v = limitShown(p.value, style)
      return p.value.k === 'none'
        ? { tex: `\\text{lungo } ${p.label.tex} \\text{ non esiste}`, text: `lungo ${p.label.text} non esiste` }
        : { tex: `\\text{lungo } ${p.label.tex} \\text{ vale } ${v.tex}`, text: `lungo ${p.label.text} vale ${v.text}` }
    })
    const rows = stacked(parts)
    return {
      shown: { tex: `\\nexists:\\ ${rows.tex}`, text: `non esiste (${parts.map((p) => p.text).join(', ')})`, rich: true },
      value: null,
    }
  }
  const shown = limitShown(found.value, style)
  return { shown, value: found.value.k === 'value' ? found.value.v : null }
}

// ——— I punti critici ———

type Kind = 'min' | 'max' | 'saddle' | 'degenerate'

interface Critical {
  at: Coord[]
  value: Coord
  kind: Kind
}

const KIND_TEXT: Record<Kind, string> = {
  min: 'minimo relativo',
  max: 'massimo relativo',
  saddle: 'punto di sella',
  degenerate: "da studiare (l'hessiana ha determinante 0)",
}

/** Il determinante di una matrice di numeri (2×2 o 3×3). */
function det(M: number[][]): number {
  if (M.length === 2) return M[0][0] * M[1][1] - M[0][1] * M[1][0]
  return M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0])
}

/** La natura del punto dai minori principali dell'hessiana (Sylvester). */
function kindOf(H: Ex[][], vars: string[], p: Coord[]): Kind {
  const values = H.map((row) =>
    row.map((h) => {
      if (p.every((c) => c.exact)) {
        const e = at(h, vars, p.map((c) => c.exact!))
        return isZero(e) ? 0 : valueOf(e)
      }
      const fn = numeric(h, vars)
      return fn ? fn(p.map((c) => c.v)) : NaN
    }),
  )
  const scale = Math.max(1, ...values.flat().map(Math.abs))
  const zero = (v: number) => Math.abs(v) < 1e-9 * scale * scale
  const minors = values.map((_, k) => (k === 0 ? values[0][0] : det(values.slice(0, k + 1).map((row) => row.slice(0, k + 1)))))
  const D = minors[minors.length - 1]
  if (zero(D)) return 'degenerate'
  if (minors.every((m) => m > 0)) return 'min'
  if (minors.every((m, k) => (k % 2 === 0 ? m < 0 : m > 0))) return 'max'
  return 'saddle'
}

/** I punti dove il gradiente è zero e la loro natura; `infinite` se sono infiniti (su una curva, come per (x − y)²). */
export function criticalPoints(s: Several): { points: Critical[]; infinite: boolean } | null {
  const { f, vars } = s
  const grad = vars.map((v) => tidy(derive(f, v)))
  const gs = grad.map((g) => numeric(g, vars))
  if (gs.some((g) => !g)) return null
  const G = (p: number[]) => gs.map((g) => g!(p))
  // Dove f si appiattisce (x e^{−x² − y²} lontano dall'origine) il gradiente è quasi zero ma non si
  // annulla: un vero zero ha le derivate che cambiano segno attorno (o è zero davvero).
  const crosses = (p: number[]) =>
    G(p).every((v, i) => {
      if (v === 0) return true
      const signs = new Set<number>([Math.sign(v)])
      for (let j = 0; j < p.length; j++) {
        for (const d of [1e-3, -1e-3]) {
          const q = [...p]
          q[j] += d * Math.max(1, Math.abs(p[j]))
          signs.add(Math.sign(G(q)[i]))
        }
      }
      return signs.size > 1 || signs.has(0)
    })
  const found = newtonAll(G, vars.length, vars.length === 2 ? GRID : GRID.filter((_, i) => i % 2 === 0)).filter(crosses)
  const H = vars.map((a) => vars.map((b) => tidy(derive(derive(f, a), b))))
  const points: Critical[] = []
  let infinite = false
  for (const p of found.sort((a, b) => a[0] - b[0] || a[1] - b[1] || (a[2] ?? 0) - (b[2] ?? 0))) {
    const coords = exactPoint(p, (point) => grad.every((g) => isZero(at(g, vars, point))))
    // Lo stesso punto trovato da più partenze (con le cifre un po' diverse): una volta sola.
    if (points.some((q) => q.at.every((c, i) => Math.abs(c.v - coords[i].v) < 1e-6 * Math.max(1, Math.abs(c.v))))) continue
    const kind = kindOf(H, vars, coords)
    // Con l'hessiana singolare: altri punti critici vicinissimi, lungo una curva?
    if (kind === 'degenerate') {
      for (const d of [[1e-3, 0, 0], [0, 1e-3, 0], [1e-3, 1e-3, 0], [1e-3, -1e-3, 0], [0, 0, 1e-3]]) {
        if (d.slice(0, p.length).every((v) => v === 0)) continue
        const q = p.map((v, i) => v + d[i])
        if (Math.max(...G(q).map(Math.abs)) < 1e-12) infinite = true
      }
    }
    points.push({ at: coords, value: valueAt(f, vars, coords), kind })
  }
  return { points, infinite: infinite || points.length > 12 }
}

/** I punti critici scritti uno dopo l'altro: (0, 0) punto di sella; (1, 1) minimo relativo, f = −1. */
export function criticalShown(s: Several, style: FormatOptions): FormattedResult | null {
  const found = criticalPoints(s)
  if (!found) return null
  const name = s.name ?? 'f'
  if (found.infinite) return { tex: '\\text{infiniti punti critici}', text: 'infiniti punti critici' }
  if (!found.points.length) return { tex: '\\text{nessun punto critico}', text: 'nessun punto critico' }
  const parts = found.points.map((c) => {
    const p = pointShown(c.at, style)
    const v = coordShown(c.value, style)
    const extreme = c.kind === 'min' || c.kind === 'max'
    return {
      tex: `${p.tex}\\ \\text{${KIND_TEXT[c.kind]}}${extreme ? `,\\ ${nameLatex(name)} = ${v.tex}` : ''}`,
      text: `${p.text} ${KIND_TEXT[c.kind]}${extreme ? `, ${name} = ${v.text}` : ''}`,
    }
  })
  return stacked(parts)
}

// ——— Gli estremi vincolati e assoluti ———

/** Un vincolo G(p) ≤ 0 (o = 0), con G come espressione. */
interface Constraint {
  G: Ex
  equal: boolean
}

/** I vincoli di una condizione: x^2 + y^2 \le 1, 0 \le x \le 1, x + y = 1, anche con le virgole o in un insieme. */
export function constraintsOf(node: MathNode, scope: SymbolScope, vars: string[], sets: ReadonlyMap<string, MathNode>): Constraint[] | null {
  if (node.k === 'name' && sets.has(node.name)) return constraintsOf(sets.get(node.name)!, scope, vars, sets)
  if (node.k === 'set') return constraintsOf(node.cond, scope, vars, sets)
  if (node.k === 'and') {
    const all = node.items.map((n) => constraintsOf(n, scope, vars, sets))
    return all.every((c) => c) ? (all as Constraint[][]).flat() : null
  }
  if (node.k === 'in' && node.a.k === 'name') {
    const v = sym(node.a.name)
    try {
      return [
        { G: tidy(sub(exOf(node.lo, scope, vars), v)), equal: false },
        { G: tidy(sub(v, exOf(node.hi, scope, vars))), equal: false },
      ]
    } catch {
      return null
    }
  }
  if (node.k !== 'rel') return null
  const out: Constraint[] = []
  try {
    for (let i = 0; i < node.ops.length; i++) {
      const a = exOf(node.items[i], scope, vars)
      const b = exOf(node.items[i + 1], scope, vars)
      const op = node.ops[i]
      if (op === '=') out.push({ G: tidy(sub(a, b)), equal: true })
      else if (op === '<' || op === '<=') out.push({ G: tidy(sub(a, b)), equal: false })
      else if (op === '>' || op === '>=') out.push({ G: tidy(sub(b, a)), equal: false })
      else return null
    }
  } catch {
    return null
  }
  return out
}

interface Candidate {
  at: Coord[]
  value: Coord
}

/** I punti di G = 0 dove f è stazionaria sul vincolo (Lagrange), e quelli dove il vincolo non è liscio. */
function lagrangePoints(f: Ex, G: Ex, vars: string[], inside: (p: number[]) => boolean): Candidate[] {
  const fg = vars.map((v) => tidy(derive(f, v)))
  const gg = vars.map((v) => tidy(derive(G, v)))
  const out: number[][] = []
  const gn = numeric(G, vars)
  const dn = gg.map((g) => numeric(g, vars))
  if (!gn || dn.some((d) => !d)) return []
  if (vars.length === 2) {
    // f_x G_y − f_y G_x = 0 e G = 0 (senza il moltiplicatore).
    const cross = numeric(tidy(sub(mul(fg[0], gg[1]), mul(fg[1], gg[0]))), vars)
    if (!cross) return []
    out.push(...newtonAll((p) => [cross(p), gn(p)], 2, GRID))
  } else {
    const fn = fg.map((g) => numeric(g, vars))
    if (fn.some((g) => !g)) return []
    // ∇f = λ ∇G e G = 0, con λ come quarta incognita.
    const sols = newtonAll((p) => [...fn.map((g, i) => g!(p.slice(0, 3)) - p[3] * dn[i]!(p.slice(0, 3))), gn(p.slice(0, 3))], 4, GRID4)
    out.push(...sols.map((p) => p.slice(0, 3)))
  }
  // Dove ∇G = 0 sul vincolo: anche quelli sono candidati.
  for (const p of newtonAll((q) => dn.map((d) => d!(q)), vars.length, GRID)) if (Math.abs(gn(p)) < 1e-9) out.push(p)
  const unique: number[][] = []
  for (const p of out) if (inside(p) && !unique.some((q) => q.every((v, i) => Math.abs(v - p[i]) < 1e-6 * Math.max(1, Math.abs(v))))) unique.push(p)
  return unique.map((p) => {
    const coords = exactPoint(p, (point) => isZero(at(G, vars, point)) && (vars.length !== 2 || isZero(at(sub(mul(fg[0], gg[1]), mul(fg[1], gg[0])), vars, point))))
    return { at: coords, value: valueAt(f, vars, coords) }
  })
}

/** Il vincolo (o l'insieme) è limitato? Lontano, in tutte le direzioni, i vincoli non valgono. */
function bounded(constraints: Constraint[], vars: string[]): boolean {
  const gs = constraints.map((c) => ({ g: numeric(c.G, vars), equal: c.equal }))
  if (gs.some((g) => !g.g)) return false
  for (const r of [1e2, 1e3]) {
    for (let i = 0; i < 64; i++) {
      const t = (2 * Math.PI * (i + 0.3)) / 64
      const dirs = vars.length === 2 ? [[Math.cos(t), Math.sin(t)]] : [0.3, 1.1, 1.9, 2.7].map((phi) => [Math.sin(phi) * Math.cos(t), Math.sin(phi) * Math.sin(t), Math.cos(phi)])
      for (const u of dirs) {
        const p = u.map((c) => r * c)
        // Lontano un punto che sta nell'insieme (o un vincolo che cambia segno): non è limitato.
        if (gs.every(({ g, equal }) => (equal ? true : g!(p) <= 0)) && gs.some(({ equal }) => !equal)) return false
        for (const { g, equal } of gs) if (equal && Math.abs(g!(p)) < 1e-6 * r * r) return false
      }
    }
    // Per un vincolo uguale: G non cambia segno lontano.
    for (const { g, equal } of gs) {
      if (!equal) continue
      const signs = new Set<number>()
      for (let i = 0; i < 64; i++) {
        const t = (2 * Math.PI * (i + 0.3)) / 64
        const p = vars.length === 2 ? [r * Math.cos(t), r * Math.sin(t)] : [r * Math.cos(t), r * Math.sin(t), 0.37 * r]
        signs.add(Math.sign(g!(p)))
        if (vars.length === 3) signs.add(Math.sign(g!([r * Math.cos(t), r * Math.sin(t), -0.37 * r])))
      }
      if (signs.size > 1) return false
    }
  }
  return true
}

/** I candidati per gli estremi: dentro (i punti critici), su ogni pezzo del bordo (Lagrange) e negli spigoli. */
function candidates(s: Several, constraints: Constraint[]): Candidate[] | null {
  const { f, vars } = s
  const gs = constraints.map((c) => numeric(c.G, vars))
  if (gs.some((g) => !g)) return null
  const tolerance = 1e-9
  const ok = (p: number[], skip: number[] = []) =>
    constraints.every((c, i) => skip.includes(i) || (c.equal ? Math.abs(gs[i]!(p)) < tolerance : gs[i]!(p) <= tolerance))
  const out: Candidate[] = []
  const equalities = constraints.map((c, i) => (c.equal ? i : -1)).filter((i) => i >= 0)
  if (!equalities.length) {
    // Dentro: i punti critici (dove tutti i vincoli valgono).
    const inner = criticalPoints(s)
    if (!inner) return null
    for (const c of inner.points) if (ok(c.at.map((x) => x.v))) out.push({ at: c.at, value: c.value })
  }
  // Su ogni pezzo del bordo (G = 0), dove gli altri vincoli valgono.
  const pieces = equalities.length ? equalities : constraints.map((_, i) => i)
  if (equalities.length > 1) return null
  for (const i of pieces) out.push(...lagrangePoints(f, constraints[i].G, vars, (p) => ok(p, [i]) && Math.abs(gs[i]!(p)) < 1e-7))
  // Gli spigoli: due pezzi del bordo insieme (nel piano).
  if (!equalities.length && vars.length === 2) {
    for (let i = 0; i < constraints.length; i++) {
      for (let j = i + 1; j < constraints.length; j++) {
        for (const p of newtonAll((q) => [gs[i]!(q), gs[j]!(q)], 2, GRID)) {
          if (!ok(p, [i, j])) continue
          const coords = exactPoint(p, (point) => isZero(at(constraints[i].G, vars, point)) && isZero(at(constraints[j].G, vars, point)))
          out.push({ at: coords, value: valueAt(f, vars, coords) })
        }
      }
    }
  }
  // Senza i doppioni.
  const unique: Candidate[] = []
  for (const c of out) if (!unique.some((u) => u.at.every((x, i) => Math.abs(x.v - c.at[i].v) < 1e-7 * Math.max(1, Math.abs(x.v))))) unique.push(c)
  return unique.sort((a, b) => a.at[0].v - b.at[0].v || a.at[1].v - b.at[1].v)
}

/**
 * Il massimo e il minimo di f su un vincolo (Lagrange) o su un insieme chiuso e limitato (dentro, sul
 * bordo, negli spigoli): `which` dice quali mostrare. Se il vincolo non è limitato, i punti candidati.
 */
export function extremaShown(s: Several, constraints: Constraint[], which: 'max' | 'min' | 'both', style: FormatOptions): { shown: FormattedResult; value: number | null } | null {
  const found = extremaOf(s, constraints)
  if (!found) return null
  const { list } = found
  const name = s.name ?? 'f'
  const fx = s.name ? `${nameLatex(name)}` : 'f'
  if (!list.length) return { shown: { tex: '\\text{nessun punto candidato}', text: 'nessun punto candidato' }, value: null }
  if (!found.bounded) {
    const parts = list.map((c) => {
      const p = pointShown(c.at, style)
      const v = coordShown(c.value, style)
      return { tex: `${p.tex},\\ ${fx} = ${v.tex}`, text: `${p.text}, ${name} = ${v.text}` }
    })
    const rows = stacked([{ tex: "\\text{candidati (l'insieme non è limitato):}", text: '' }, ...parts])
    return {
      shown: { tex: rows.tex, text: `candidati (l'insieme non è limitato): ${parts.map((p) => p.text).join('; ')}`, rich: true },
      value: null,
    }
  }
  const best = (sign: 1 | -1) => {
    const where = sign > 0 ? found.max : found.min
    const target = where[0].value.v
    const v = coordShown(where[0].value, style)
    const ps = where.map((c) => pointShown(c.at, style))
    return {
      v: target,
      tex: `${v.tex}\\ \\text{in}\\ ${ps.map((p) => p.tex).join('\\text{ e }')}`,
      text: `${v.text} in ${ps.map((p) => p.text).join(' e ')}`,
    }
  }
  if (which !== 'both') {
    const b = best(which === 'max' ? 1 : -1)
    return { shown: { tex: b.tex, text: b.text, rich: true }, value: b.v }
  }
  const M = best(1)
  const m = best(-1)
  return { shown: stacked([{ tex: `\\max = ${M.tex}`, text: `max ${M.text}` }, { tex: `\\min = ${m.tex}`, text: `min ${m.text}` }]), value: null }
}

/** I candidati, se l'insieme è limitato, e tra loro i punti di massimo e di minimo. */
export function extremaOf(s: Several, constraints: Constraint[]): { list: Candidate[]; bounded: boolean; max: Candidate[]; min: Candidate[] } | null {
  const list = candidates(s, constraints)
  if (!list) return null
  const pick = (sign: 1 | -1) => {
    if (!list.length) return []
    const values = list.map((c) => c.value.v)
    const target = sign > 0 ? Math.max(...values) : Math.min(...values)
    return list.filter((c) => Math.abs(c.value.v - target) <= 1e-9 * Math.max(1, Math.abs(target)))
  }
  return { list, bounded: bounded(constraints, s.vars), max: pick(1), min: pick(-1) }
}

/** Il vincolo di \operatorname{lagrange}(f, g = c) o di \max_{…} f, e le variabili insieme a quelle di f. */
export function optimumOf(fNode: MathNode, where: MathNode, scope: SymbolScope, sets: ReadonlyMap<string, MathNode>): { s: Several; constraints: Constraint[] } | null {
  const domain = where.k === 'name' && sets.has(where.name) ? sets.get(where.name)! : where
  const s = severalOf(fNode, scope, namesIn(domain))
  if (!s) return null
  const constraints = constraintsOf(where, scope, s.vars, sets)
  if (!constraints || !constraints.length) return null
  // Le variabili dei vincoli devono essere quelle di f.
  if (constraints.some((c) => symbols(c.G).some((v) => v !== 'π' && v !== 'e' && !s.vars.includes(v)))) return null
  return { s, constraints }
}

