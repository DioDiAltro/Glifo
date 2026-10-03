/**
 * La probabilità e la statistica nei grafici. `X \sim B(10, 0{,}3)` disegna le probabilità dei valori
 * come barre (una variabile continua la sua densità); `P(X \le 1)` colora l'area sotto la densità (o le
 * barre dei valori dell'evento) con il valore nella legenda. Con i dati della nota o del blocco:
 * \operatorname{istogramma}(x) (anche con il numero di classi, o i loro estremi in un vettore),
 * \operatorname{barre}(x) (le frequenze di ogni valore; con le frequenze già contate, barre(v, f)),
 * \operatorname{dispersione}(x, y) e \operatorname{regressione}(x, y), i punti con la retta.
 */
import type { Distribution } from '../math/distributions'
import { compile, MathError, type Scope } from '../math/evaluate'
import { formatNumber } from '../math/format'
import { nameLatex, toLatex } from '../math/latex'
import { evaluateLinear, FLOAT, type LinearScope } from '../math/linear'
import type { MathNode } from '../math/parse'
import { correlation, regression } from '../math/statistics'
import type { GraphItem, Range } from './spec'

/** Le righe della statistica dei dati che si disegnano. */
export const STATS_GRAPH = new Set(['histogram', 'barchart', 'scatter', 'regression'])

interface Line {
  line: number
  main: MathNode
}

const number = (v: number) => formatNumber(v, { comma: true, decimal: true, digits: 9 })

/** Dove sta quasi tutta la probabilità: da lì a lì si guarda la distribuzione. */
export function distributionExtent(d: Distribution): Range {
  if (d.discrete) {
    const hi = Number.isFinite(d.hi) ? d.hi : Math.max(d.quantile(0.9995), d.lo + 3)
    return [d.lo - 1, hi + 1]
  }
  const lo = Number.isFinite(d.lo) ? d.lo : d.quantile(0.0005)
  const hi = Number.isFinite(d.hi) ? d.hi : d.quantile(0.9995)
  const pad = (hi - lo) * 0.08
  return [lo - pad, hi + pad]
}

/** Come si scrive la distribuzione nella legenda, dai suoi numeri: X \sim B(10, 0{,}3). */
const FAMILY_TEX: Record<Distribution['family'], string> = {
  bernoulli: '\\operatorname{Be}', binomial: 'B', poisson: '\\operatorname{Po}', geometric: '\\operatorname{Geom}', hypergeometric: '\\operatorname{H}',
  normal: '\\mathcal{N}', exponential: '\\operatorname{Exp}', uniform: '\\mathcal{U}', student: 't', chi2: '\\chi^2', fisher: 'F', gamma: '\\Gamma',
}

function distributionLabel(X: string, d: Distribution): string {
  const params = d.params.map((p) => number(p)?.tex ?? String(p))
  // Con i decimali con la virgola i parametri si separano con il punto e virgola: B(10; 0,3).
  return `${nameLatex(X)} \\sim ${FAMILY_TEX[d.family]}(${params.join(params.some((p) => p.includes('{,}')) ? ';\\ ' : ', ')})`
}

/** Le barre delle probabilità dei valori di una variabile discreta (solo i valori dove vale `keep`, se c'è). */
function pmfBars(d: Distribution, keep?: (k: number) => boolean): { x0: number; x1: number; y: number }[] {
  const [lo, hi] = distributionExtent(d)
  const bars: { x0: number; x1: number; y: number }[] = []
  for (let k = Math.max(d.lo, Math.ceil(lo)); k <= Math.min(Math.floor(hi), d.lo + 2000); k++) {
    if (keep && !keep(k)) continue
    const y = d.pdf(k)
    if (y > 0) bars.push({ x0: k - 0.35, x1: k + 0.35, y })
  }
  return bars
}

/** I numeri di un vettore della nota o del blocco (i dati). */
function dataOf(node: MathNode, linear: LinearScope, what: string): number[] {
  const value = evaluateLinear(node, linear, FLOAT)
  if (value.k !== 'matrix' || value.m[0].length !== 1) throw new MathError(`${what}: i dati vanno in un vettore, $x = (2, 3, 5, 7)$`)
  return value.m.map((r) => r[0])
}

/** Il numero di classi di un istogramma (la regola di Sturges: 1 + log₂ n). */
function sturges(n: number): number {
  return Math.max(1, Math.ceil(1 + Math.log2(n)))
}

/** Delle barre che coprono da a a b in `k` classi uguali (con estremi «tondi», se si può). */
function classes(values: number[], k: number): number[] {
  const lo = Math.min(...values)
  const hi = Math.max(...values)
  if (lo === hi) return [lo - 0.5, lo + 0.5]
  const width = (hi - lo) / k
  // Una larghezza tonda (1, 2, 5, 10…) se non cambia troppo il numero di classi.
  const step = 10 ** Math.floor(Math.log10(width))
  const round = [1, 2, 2.5, 5, 10].map((m) => m * step).find((w) => w >= width * 0.999) ?? width
  const start = Math.floor(lo / round) * round
  const edges = [start]
  while (edges[edges.length - 1] <= hi) edges.push(edges[edges.length - 1] + round)
  return edges.length - 1 <= k + 1 ? edges : Array.from({ length: k + 1 }, (_, i) => lo + i * width)
}

/** Gli elementi per una riga della probabilità o della statistica; null se la riga è altro. */
export function statisticsItems(l: Line, slot: number, scope: Scope, linear: LinearScope, drawnBefore: ReadonlySet<string>): { items: GraphItem[]; colors: number } | null {
  const main = l.main
  const random = scope.random
  const line = l.line
  // X \sim B(10, 0{,}3): le probabilità dei valori (o la densità).
  if (main.k === 'dist') {
    const d = random?.distribution(main.v)
    if (!d) throw new MathError('Questa distribuzione non si può fare: controlla i parametri')
    const label = toLatex(main)
    const extent = distributionExtent(d)
    if (d.discrete) return { items: [{ kind: 'bars', line, label, slot, bars: pmfBars(d), extent }], colors: 1 }
    return { items: [{ kind: 'function', line, label, slot, f: (x) => d.pdf(x), extent }], colors: 1 }
  }
  // P(X \le 1): l'area sotto la densità, o le barre dei valori dell'evento.
  if (main.k === 'prob') {
    if (!random) throw new MathError('Prima va definita la variabile aleatoria, per esempio $X \\sim B(10, 0{,}3)$')
    const { X, set } = random.event(main, scope)
    const d = random.distribution(X)!
    const value = compile(main, scope, { calc: true })({})
    const shown = number(value)
    const label = `${toLatex(main)}${shown ? ` = ${shown.tex}` : ''}`
    const extent = distributionExtent(d)
    const own = !drawnBefore.has(X)
    const items: GraphItem[] = []
    if (d.discrete) {
      const inside = (k: number) => set.some((i) => (i.lo.v < k || (i.lo.v === k && i.lo.closed)) && (k < i.hi.v || (k === i.hi.v && i.hi.closed)))
      // Le altre barre della distribuzione (se nessun'altra riga la disegna), poi quelle dell'evento, colorate.
      if (own) items.push({ kind: 'bars', line, label: distributionLabel(X, d), slot, bars: pmfBars(d, (k) => !inside(k)), extent })
      items.push({ kind: 'bars', line, label, slot: slot + items.length, bars: pmfBars(d, inside), extent })
      return { items, colors: items.length }
    }
    if (own) items.push({ kind: 'function', line, label: distributionLabel(X, d), slot, f: (x) => d.pdf(x), extent })
    const areaSlot = slot + items.length
    set.forEach((i, n) => {
      items.push({ kind: 'area', line, label: n === 0 ? label : '', slot: areaSlot, f: (x) => d.pdf(x), from: i.lo.v, to: i.hi.v, value, curve: false, extent })
    })
    if (!set.length) items.push({ kind: 'area', line, label, slot: areaSlot, f: (x) => d.pdf(x), from: 0, to: 0, value, curve: false, extent })
    return { items, colors: items.length ? (own ? 2 : 1) : 0 }
  }
  if (main.k !== 'fn' || !STATS_GRAPH.has(main.name)) return null
  const args = main.args
  const written = toLatex(main)
  switch (main.name) {
    case 'histogram': {
      if (!args.length || args.length > 2) throw new MathError('Si scrive \\operatorname{istogramma}(x), o con il numero di classi: \\operatorname{istogramma}(x, 5)')
      const values = dataOf(args[0], linear, 'L\'istogramma')
      let edges: number[]
      if (args.length === 2) {
        const second = evaluateLinear(args[1], linear, FLOAT)
        if (second.k === 'scalar') {
          const k = Math.round(second.v)
          if (!(k >= 1 && k <= 200)) throw new MathError('Le classi sono da 1 a 200')
          edges = classes(values, k)
        } else if (second.k === 'matrix' && second.m[0].length === 1) {
          edges = second.m.map((r) => r[0]).sort((a, b) => a - b)
          if (edges.length < 2) throw new MathError('Gli estremi delle classi sono almeno due')
        } else throw new MathError('Dopo i dati va il numero di classi (5) o i loro estremi in un vettore')
      } else edges = classes(values, sturges(values.length))
      const counts = edges.slice(1).map(() => 0)
      for (const v of values) {
        // Ogni classe è [a, b), l'ultima [a, b].
        let i = edges.findIndex((e, j) => j > 0 && (v < e || (j === edges.length - 1 && v <= e))) - 1
        if (i < 0 && v === edges[0]) i = 0
        if (i >= 0 && v >= edges[0]) counts[i]++
      }
      const widths = edges.slice(1).map((e, i) => e - edges[i])
      // Con le classi larghe diverse l'altezza è la densità (frequenza relativa / larghezza): l'area conta.
      const uneven = widths.some((w) => Math.abs(w - widths[0]) > 1e-9 * Math.abs(widths[0]))
      const bars = counts.map((c, i) => ({ x0: edges[i], x1: edges[i + 1], y: uneven ? c / values.length / widths[i] : c }))
      const extent: Range = [edges[0] - widths[0] * 0.5, edges[edges.length - 1] + widths[widths.length - 1] * 0.5]
      return { items: [{ kind: 'bars', line, label: uneven ? `${written}\\ \\text{(densità)}` : written, slot, bars, extent }], colors: 1 }
    }
    case 'barchart': {
      if (!args.length || args.length > 2) throw new MathError('Si scrive \\operatorname{barre}(x), o con le frequenze: \\operatorname{barre}(v, f)')
      const values = dataOf(args[0], linear, 'Il diagramma a barre')
      const groups = new Map<number, number>()
      if (args.length === 2) {
        const f = dataOf(args[1], linear, 'Il diagramma a barre')
        if (f.length !== values.length) throw new MathError('I valori e le frequenze vanno in due vettori lunghi uguali')
        values.forEach((v, i) => groups.set(v, (groups.get(v) ?? 0) + f[i]))
      } else for (const v of values) groups.set(v, (groups.get(v) ?? 0) + 1)
      const keys = [...groups.keys()].sort((a, b) => a - b)
      const gap = keys.slice(1).reduce((m, k, i) => Math.min(m, k - keys[i]), Infinity)
      const half = (Number.isFinite(gap) ? gap : 1) * 0.35
      const bars = keys.map((k) => ({ x0: k - half, x1: k + half, y: groups.get(k)! }))
      const extent: Range = [keys[0] - 3 * half, keys[keys.length - 1] + 3 * half]
      return { items: [{ kind: 'bars', line, label: written, slot, bars, extent }], colors: 1 }
    }
    case 'scatter':
    case 'regression': {
      if (args.length !== 2) throw new MathError(`Si scrive \\operatorname{${main.name === 'scatter' ? 'dispersione' : 'regressione'}}(x, y), con x e y due vettori di dati`)
      const xs = dataOf(args[0], linear, 'I dati')
      const ys = dataOf(args[1], linear, 'I dati')
      if (xs.length !== ys.length) throw new MathError('Le due serie di dati vanno in due vettori lunghi uguali')
      const points: [number, number, number][] = xs.map((x, i) => [x, ys[i], 0])
      const lo = Math.min(...xs)
      const hi = Math.max(...xs)
      const pad = (hi - lo) * 0.15 || 1
      const extent: Range = [lo - pad, hi + pad]
      const dots: GraphItem = { kind: 'points', line, label: main.name === 'scatter' ? written : `(${toLatex(args[0])}, ${toLatex(args[1])})`, slot, points, data: true, extent }
      if (main.name === 'scatter') return { items: [dots], colors: 1 }
      const { a, b } = regression(FLOAT, xs, ys)
      const r = correlation(FLOAT, xs, ys)
      const yName = args[1].k === 'name' ? nameLatex(args[1].name) : 'y'
      const xName = args[0].k === 'name' ? nameLatex(args[0].name) : 'x'
      const bs = number(b)?.tex ?? String(b)
      const as = number(Math.abs(a))?.tex ?? String(Math.abs(a))
      const rs = number(r)?.tex ?? String(r)
      const fit = `${yName} = ${bs}${xName}${a === 0 ? '' : ` ${a < 0 ? '-' : '+'} ${as}`}\\quad (r = ${rs})`
      return { items: [dots, { kind: 'function', line, label: fit, slot: slot + 1, f: (x) => a + b * x, extent }], colors: 2 }
    }
  }
  return null
}
