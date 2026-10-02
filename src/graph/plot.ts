/**
 * I conti del disegno: dove calcolare le curve (con i salti e gli asintoti al posto giusto), che
 * parte del piano mostrare quando il blocco non lo dice, e dove mettere le tacche sugli assi.
 * Le coordinate sullo schermo vanno da (0, 0) in alto a sinistra a (width, height).
 */
import { withWorkLimit } from '../math/evaluate'
import { GRAPH_WORK, type GraphItem, type GraphSpec, type Range } from './spec'

export interface Viewport {
  x0: number
  x1: number
  y0: number
  y1: number
  width: number
  height: number
}

/** Una curva sullo schermo: [x0, y0, x1, y1, …]. */
export type Polyline = number[]

export interface Sampled {
  lines: Polyline[]
  /** Le x (del grafico) degli asintoti verticali trovati. */
  poles: number[]
}

const finite = Number.isFinite

function screen(vp: Viewport) {
  const kx = vp.width / (vp.x1 - vp.x0)
  const ky = vp.height / (vp.y1 - vp.y0)
  // Fuori dalla finestra si disegna fino a un po' oltre il bordo: il resto lo taglia il riquadro.
  const lim = vp.height * 3
  return {
    kx,
    ky,
    sx: (x: number) => (x - vp.x0) * kx,
    sy: (y: number) => Math.max(-lim, Math.min(vp.height + lim, (vp.y1 - y) * ky)),
  }
}

/** Dove finisce il dominio tra a (definita se `definedAtA`) e b: l'ultimo punto in cui la funzione c'è. */
function domainEdge(f: (x: number) => number, a: number, b: number, definedAtA: boolean): [number, number] | null {
  let good = definedAtA ? a : b
  let bad = definedAtA ? b : a
  let value = NaN
  for (let k = 0; k < 48; k++) {
    const m = (good + bad) / 2
    if (m === good || m === bad) break
    const y = f(m)
    if (finite(y)) {
      good = m
      value = y
    } else bad = m
  }
  return finite(value) ? [good, value] : null
}

/**
 * Tra due punti vicini con valori molto diversi: la funzione sale ripida (e si collega) o salta
 * (un asintoto, o un salto come nella parte intera)? Si dimezza l'intervallo seguendo il salto:
 * se resta grande anche quando l'intervallo è minuscolo, è un salto.
 */
function jump(f: (x: number) => number, xa: number, ya: number, xb: number, yb: number, ky: number) {
  for (let k = 0; k < 60; k++) {
    if (Math.abs(yb - ya) * ky < 1) return null
    const xm = (xa + xb) / 2
    if (xm === xa || xm === xb) break
    const ym = f(xm)
    if (!finite(ym)) break
    if (Math.abs(ym - ya) > Math.abs(yb - ym)) {
      xb = xm
      yb = ym
    } else {
      xa = xm
      ya = ym
    }
  }
  return { xa, ya, xb, yb }
}

/** Una funzione y = f(x), con i pezzi staccati dove non è definita o salta. */
export function sampleFunction(f: (x: number) => number, vp: Viewport): Sampled {
  const { sx, sy, ky } = screen(vp)
  const n = Math.max(240, Math.ceil(vp.width * 1.5))
  const dx = (vp.x1 - vp.x0) / n
  const span = vp.y1 - vp.y0
  const big = 1e4 * span + Math.max(Math.abs(vp.y0), Math.abs(vp.y1))
  const lines: Polyline[] = []
  const poles: number[] = []
  let line: Polyline | null = null
  const push = (x: number, y: number) => {
    if (!line) {
      line = []
      lines.push(line)
    }
    line.push(sx(x), sy(y))
  }
  const end = () => {
    line = null
  }
  /** Un asintoto, se non è già segnato lì (a meno di un pixel). */
  const pole = (x: number) => {
    if (!poles.some((p) => Math.abs(sx(p) - sx(x)) < 1)) poles.push(x)
  }
  let px = vp.x0
  let py = f(px)
  if (finite(py)) push(px, py)
  for (let i = 1; i <= n; i++) {
    const x = vp.x0 + i * dx
    const y = f(x)
    const a = finite(py)
    const b = finite(y)
    if (a && b) {
      if (Math.abs(y - py) * ky > 3) {
        const j = jump(f, px, py, x, y, ky)
        if (j) {
          push(j.xa, j.ya)
          end()
          if (Math.max(Math.abs(j.ya), Math.abs(j.yb)) > big) pole((j.xa + j.xb) / 2)
          push(j.xb, j.yb)
        }
      }
      push(x, y)
    } else if (a) {
      const edge = domainEdge(f, px, x, true)
      if (edge) push(edge[0], edge[1])
      end()
      // 1/x proprio in x = 0: infinito, un asintoto.
      if (Math.abs(y) === Infinity || (edge && Math.abs(edge[1]) > big)) pole(edge ? edge[0] : x)
    } else if (b) {
      const edge = domainEdge(f, px, x, false)
      if (edge) push(edge[0], edge[1])
      push(x, y)
      if (Math.abs(py) === Infinity || (edge && Math.abs(edge[1]) > big)) pole(edge ? edge[0] : px)
    }
    px = x
    py = y
  }
  return { lines: lines.filter((l) => l.length >= 4), poles }
}

/**
 * L'area tra la curva y = f(x) e l'asse x per x tra a e b (\int_a^b f(x) \, dx): i pezzi da
 * colorare, ognuno chiuso lungo l'asse, staccati dove la curva salta o non c'è.
 */
export function sampleArea(f: (x: number) => number, a: number, b: number, vp: Viewport): Polyline[] {
  const lo = Math.min(a, b)
  const hi = Math.max(a, b)
  const axis = screen(vp).sy(0)
  return sampleFunction((x) => (x >= lo && x <= hi ? f(x) : NaN), vp).lines.map((line) => [line[0], axis, ...line, line[line.length - 2], axis])
}

/** Una curva con un parametro t (o θ), più fitta dove i punti si allontanano. */
export function sampleParametric(fx: (t: number) => number, fy: (t: number) => number, t: Range, vp: Viewport): Polyline[] {
  const { sx, sy } = screen(vp)
  const n = 1200
  const lines: Polyline[] = []
  let line: Polyline | null = null
  const far = Math.max(vp.width, vp.height)
  let prev: [number, number] | null = null
  const add = (u: number, depth: number, before: number | null): void => {
    const x = fx(u)
    const y = fy(u)
    if (!finite(x) || !finite(y)) {
      line = null
      prev = null
      return
    }
    const p: [number, number] = [sx(x), sy(y)]
    if (prev && line) {
      const d = Math.hypot(p[0] - prev[0], p[1] - prev[1])
      if (d > 6 && depth < 6 && before !== null) {
        add((before + u) / 2, depth + 1, before)
        add(u, depth + 1, (before + u) / 2)
        return
      }
      if (d > far) line = null
    }
    if (!line) {
      line = []
      lines.push(line)
    }
    line.push(p[0], p[1])
    prev = p
  }
  let before: number | null = null
  for (let i = 0; i <= n; i++) {
    const u = t[0] + ((t[1] - t[0]) * i) / n
    add(u, 0, before)
    before = u
  }
  return lines.filter((l) => l.length >= 4)
}

/**
 * Una curva F(x, y) = 0 con i «quadrati in marcia»: la si cerca nei quadratini di una griglia
 * dove F cambia segno. Dove F salta (un asintoto) il cambio di segno non è la curva e non conta.
 */
export function sampleImplicit(F: (x: number, y: number) => number, vp: Viewport, cell = 4): Polyline[] {
  const nx = Math.ceil(vp.width / cell) + 2
  const ny = Math.ceil(vp.height / cell) + 2
  const dx = (vp.x1 - vp.x0) / (vp.width / cell)
  const dy = (vp.y1 - vp.y0) / (vp.height / cell)
  const gx = (i: number) => vp.x0 + (i - 1) * dx
  const gy = (j: number) => vp.y1 - (j - 1) * dy
  const values = new Float64Array((nx + 1) * (ny + 1))
  for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) values[j * (nx + 1) + i] = F(gx(i), gy(j))
  const { sx, sy } = screen(vp)
  const points = new Map<number, [number, number]>()
  const links = new Map<number, number[]>()
  /** Il punto sul lato tra due vertici della griglia (id del lato), o -1 se lì la curva non c'è. */
  const crossing = (i0: number, j0: number, i1: number, j1: number): number => {
    const vertical = i0 === i1
    const id = 2 * (j0 * (nx + 1) + i0) + (vertical ? 1 : 0)
    if (points.has(id)) return id
    const a = values[j0 * (nx + 1) + i0]
    const b = values[j1 * (nx + 1) + i1]
    const t = a / (a - b)
    const x = gx(i0) + (gx(i1) - gx(i0)) * t
    const y = gy(j0) + (gy(j1) - gy(j0)) * t
    const m = F(x, y)
    if (!finite(m) || Math.abs(m) > Math.max(Math.abs(a), Math.abs(b))) return -1
    points.set(id, [sx(x), sy(y)])
    return id
  }
  const link = (p: number, q: number) => {
    if (p < 0 || q < 0) return
    if (!links.has(p)) links.set(p, [])
    if (!links.has(q)) links.set(q, [])
    links.get(p)!.push(q)
    links.get(q)!.push(p)
  }
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const tl = values[j * (nx + 1) + i]
      const tr = values[j * (nx + 1) + i + 1]
      const bl = values[(j + 1) * (nx + 1) + i]
      const br = values[(j + 1) * (nx + 1) + i + 1]
      if (!finite(tl) || !finite(tr) || !finite(bl) || !finite(br)) continue
      const index = (tl > 0 ? 8 : 0) | (tr > 0 ? 4 : 0) | (br > 0 ? 2 : 0) | (bl > 0 ? 1 : 0)
      if (index === 0 || index === 15) continue
      const T = () => crossing(i, j, i + 1, j)
      const B = () => crossing(i, j + 1, i + 1, j + 1)
      const L = () => crossing(i, j, i, j + 1)
      const R = () => crossing(i + 1, j, i + 1, j + 1)
      switch (index) {
        case 1: case 14: link(L(), B()); break
        case 2: case 13: link(B(), R()); break
        case 3: case 12: link(L(), R()); break
        case 4: case 11: link(T(), R()); break
        case 6: case 9: link(T(), B()); break
        case 7: case 8: link(T(), L()); break
        case 5:
        case 10: {
          const center = F(gx(i) + dx / 2, gy(j) - dy / 2)
          // Il centro dice quali vertici sono uniti: le curve girano attorno agli altri due.
          if ((center > 0) === (index === 5)) {
            link(T(), L())
            link(B(), R())
          } else {
            link(T(), R())
            link(L(), B())
          }
          break
        }
      }
    }
  }
  // Unisce i pezzetti in linee: prima quelle con due estremi, poi gli anelli.
  const lines: Polyline[] = []
  const visited = new Set<number>()
  const walk = (start: number) => {
    const line: Polyline = []
    let prev = -1
    let at = start
    while (at >= 0 && !visited.has(at)) {
      visited.add(at)
      const p = points.get(at)!
      line.push(p[0], p[1])
      const next: number = (links.get(at) ?? []).find((q) => q !== prev && !visited.has(q)) ?? -1
      prev = at
      at = next
    }
    // Un anello si chiude sul primo punto.
    if ((links.get(start) ?? []).includes(prev) && line.length > 4) line.push(line[0], line[1])
    if (line.length >= 4) lines.push(line)
  }
  for (const [id, next] of links) if (next.length === 1 && !visited.has(id)) walk(id)
  for (const id of links.keys()) if (!visited.has(id)) walk(id)
  return lines
}

// ——— La parte da mostrare ———

/** Dove succede qualcosa a una funzione: zeri, massimi e minimi, salti, bordi del dominio. */
function features(f: (x: number) => number, a: number, b: number, n = 2000): number[] {
  const out: number[] = []
  let y2 = NaN
  let x1 = a
  let y1 = f(a)
  for (let i = 1; i <= n; i++) {
    const x = a + ((b - a) * i) / n
    const y = f(x)
    if (finite(y1) !== finite(y)) out.push(finite(y) ? x : x1)
    else if (finite(y)) {
      if ((y1 < 0 && y > 0) || (y1 > 0 && y < 0) || y === 0) out.push(x)
      if (finite(y2)) {
        const d1 = y1 - y2
        const d2 = y - y1
        const tiny = 1e-9 * Math.max(1, Math.abs(y1))
        if (Math.abs(d1) > tiny && Math.abs(d2) > tiny && d1 * d2 < 0) out.push(x1)
      }
    }
    y2 = y1
    x1 = x
    y1 = y
  }
  return out
}

/** La finestra di partenza, se il blocco non dice quale. */
export function chooseWindow(spec: GraphSpec, width: number, height: number): Viewport {
  return withWorkLimit(GRAPH_WORK, () => findWindow(spec, width, height))
}

function findWindow(spec: GraphSpec, width: number, height: number): Viewport {
  const items = spec.items
  // Anche le curve delle aree: la loro forma deve vedersi.
  const functions = items.filter((i): i is Extract<GraphItem, { kind: 'function' | 'area' }> => i.kind === 'function' || i.kind === 'area')
  const curves = items.filter((i) => i.kind === 'implicit' || i.kind === 'parametric')
  const xs: number[] = []
  const ys: number[] = []
  for (const item of items) {
    if (item.kind === 'point') {
      xs.push(item.x)
      ys.push(item.y)
    } else if (item.kind === 'vertical') xs.push(item.x)
    else if (item.kind === 'area') {
      // L'area intera, chiusa dall'asse x; verso un estremo infinito, un pezzo (\int_0^\infty: fino a 5).
      const lo = Math.min(item.from, item.to)
      const hi = Math.max(item.from, item.to)
      if (finite(lo)) xs.push(lo, finite(hi) ? hi : lo + 5)
      else if (finite(hi)) xs.push(hi - 5, hi)
      ys.push(0)
    } else if (item.kind === 'parametric') {
      for (let i = 0; i <= 400; i++) {
        const t = item.t[0] + ((item.t[1] - item.t[0]) * i) / 400
        const x = item.fx(t)
        const y = item.fy(t)
        if (finite(x) && finite(y) && Math.abs(x) < 1e6 && Math.abs(y) < 1e6) {
          xs.push(x)
          ys.push(y)
        }
      }
    } else if (item.kind === 'implicit') {
      const search: Viewport = { x0: -12, x1: 12, y0: -12, y1: 12, width: 240, height: 240 }
      for (const line of sampleImplicit(item.F, search, 2)) {
        for (let k = 0; k < line.length; k += 2) {
          xs.push(search.x0 + (line[k] / 240) * 24)
          ys.push(search.y1 - (line[k + 1] / 240) * 24)
        }
      }
    }
  }

  // x: dove succede qualcosa (con l'origine), con un po' di margine. Con un integrale (non da −∞
  // a +∞) conta la sua area, non quello che fanno le funzioni più in là.
  let x: Range
  if (spec.x) x = spec.x
  else {
    const area = items.some((i) => i.kind === 'area' && (finite(i.from) || finite(i.to)))
    const found: number[] = []
    if (!area) for (const f of functions) found.push(...features(f.f, -10, 10))
    let near = found
    if (found.length > 16) {
      if (spec.trig) near = []
      else near = [...found].sort((a, b) => Math.abs(a) - Math.abs(b)).slice(0, 16)
    }
    if (spec.trig && found.length > 8) {
      // Seni e coseni: due giri da una parte e dall'altra (e i punti scritti nel blocco).
      x = [Math.min(-2 * Math.PI - 0.4, ...xs.map((v) => v - 1)), Math.max(2 * Math.PI + 0.4, ...xs.map((v) => v + 1))]
    } else {
      const all = [0, ...near, ...xs]
      let lo = Math.min(...all)
      let hi = Math.max(...all)
      const pad = Math.max((hi - lo) * 0.2, 1)
      lo -= pad
      hi += pad
      if (hi - lo < 6) {
        const c = (lo + hi) / 2
        lo = c - 3
        hi = c + 3
      }
      x = [lo, hi]
    }
  }

  // y: dove stanno i valori, se possibile con le stesse unità dell'asse x.
  const square = ((x[1] - x[0]) * height) / width
  let y: Range
  let poles = false
  if (spec.y) y = spec.y
  else {
    const values = [...ys]
    for (const f of functions) {
      const s = sampleValues(f.f, x[0], x[1], 600)
      values.push(...s.values)
      poles ||= s.poles
    }
    y = chooseY(values, square, poles)
  }

  // Le curve (circonferenze, ellissi…) con le stesse unità sui due assi, se no si deformano.
  if (curves.length && !functions.length && !spec.x && !spec.y) [x, y] = sameUnits(x, ys.length ? [Math.min(...ys), Math.max(...ys)] : y, width, height)
  return { x0: x[0], x1: x[1], y0: y[0], y1: y[1], width, height }
}

/** I valori della funzione, e se ha asintoti verticali (cambia segno passando per valori enormi). */
function sampleValues(f: (x: number) => number, a: number, b: number, n: number): { values: number[]; poles: boolean } {
  const values: number[] = []
  const flips: number[] = []
  let prev = NaN
  for (let i = 0; i <= n; i++) {
    const y = f(a + ((b - a) * i) / n)
    if (!finite(y)) {
      prev = NaN
      continue
    }
    if (finite(prev) && prev * y < 0) flips.push(Math.min(Math.abs(prev), Math.abs(y)))
    values.push(y)
    prev = y
  }
  const sizes = values.map(Math.abs).sort((p, q) => p - q)
  const typical = sizes[Math.floor(sizes.length / 2)] ?? 0
  const poles = sizes.some((v) => v > 1e8) || flips.some((v) => v > 10 * typical + 1e-9)
  return { values, poles }
}

function chooseY(values: number[], square: number, poles: boolean): Range {
  if (!values.length) return [-square / 2, square / 2]
  const sorted = [...values].sort((a, b) => a - b)
  const at = (q: number) => sorted[Math.min(sorted.length - 1, Math.max(0, Math.round(q * (sorted.length - 1))))]
  let lo = sorted[0]
  let hi = sorted[sorted.length - 1]
  // Vicino agli asintoti i valori vanno all'infinito: contano quelli normali.
  if (poles || hi - lo > 50 * square) {
    lo = at(0.08)
    hi = at(0.92)
  }
  // L'asse x si vede, se non è troppo lontano.
  const span = hi - lo
  if (lo > 0 && lo <= Math.max(span, square) * 0.75) lo = 0
  if (hi < 0 && -hi <= Math.max(span, square) * 0.75) hi = 0
  const d = hi - lo
  if (d === 0) {
    const c = lo / 2
    const s = Math.max(square, Math.abs(lo) * 1.3)
    return [c - s / 2, c + s / 2]
  }
  if (d > 3 * square) {
    // Troppo alta: la finestra dove la curva passa più tempo (a parità, la più vicina all'asse x).
    const s = 3 * square
    let best = 0
    let bestCount = -1
    let bestDistance = Infinity
    for (let i = 0, j = 0; i < sorted.length; i++) {
      while (j + 1 < sorted.length && sorted[j + 1] - sorted[i] <= s * 0.9) j++
      const count = j - i + 1
      const distance = Math.abs(sorted[i] + s / 2)
      if (count > bestCount || (count === bestCount && distance < bestDistance)) {
        best = i
        bestCount = count
        bestDistance = distance
      }
    }
    let y0 = sorted[best] - 0.05 * s
    if (y0 > 0 && y0 < 0.3 * s) y0 = -0.05 * s
    if (y0 + s < 0 && -(y0 + s) < 0.3 * s) y0 = -0.95 * s
    return [y0, y0 + s]
  }
  if (d >= square / 1.6 && d <= square * 1.6) {
    const c = (lo + hi) / 2
    const s = Math.max(square, d * 1.12)
    return [c - s / 2, c + s / 2]
  }
  const pad = d * 0.1
  return [lo - pad, hi + pad]
}

/** Allarga una delle due dimensioni perché un'unità sia lunga uguale sui due assi. */
function sameUnits(x: Range, y: Range, width: number, height: number): [Range, Range] {
  let [x0, x1] = x
  let [y0, y1] = y
  const px = Math.max(1e-9, x1 - x0)
  const py = Math.max(1e-9, y1 - y0)
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  const sx = Math.max(px * 1.2, 2)
  const sy = Math.max(py * 1.2, 2)
  if (sx / width > sy / height) {
    const s = (sx * height) / width
    y0 = cy - s / 2
    y1 = cy + s / 2
    x0 = cx - sx / 2
    x1 = cx + sx / 2
  } else {
    const s = (sy * width) / height
    x0 = cx - s / 2
    x1 = cx + s / 2
    y0 = cy - sy / 2
    y1 = cy + sy / 2
  }
  return [
    [x0, x1],
    [y0, y1],
  ]
}

// ——— Le tacche sugli assi ———

export interface Ticks {
  major: { value: number; label: string }[]
  minor: number[]
}

const SUPERSCRIPT = '⁰¹²³⁴⁵⁶⁷⁸⁹'

/** Un numero per le tacche: con la virgola e il meno lungo (−0,5), le potenze di 10 per i molto grandi. */
export function tickLabel(v: number, step: number): string {
  if (v === 0) return '0'
  const minus = v < 0 ? '−' : ''
  const a = Math.abs(v)
  if (a >= 1e5 || a < 1e-3) {
    const exp = Math.floor(Math.log10(a))
    const mant = Number((a / 10 ** exp).toPrecision(3))
    const sup = String(Math.abs(exp))
      .split('')
      .map((c) => SUPERSCRIPT[Number(c)])
      .join('')
    return `${minus}${mant === 1 ? '' : `${String(mant).replace('.', ',')}·`}10${exp < 0 ? '⁻' : ''}${sup}`
  }
  const decimals = Math.max(0, -Math.floor(Math.log10(step) + 1e-9))
  return minus + a.toFixed(decimals).replace('.', ',')
}

/** Un multiplo di π come si scrive: π/2, 3π/4, −2π. */
function piLabel(k: number, d: number): string {
  if (k === 0) return '0'
  const g = gcd(Math.abs(k), d)
  const n = k / g
  const den = d / g
  const minus = n < 0 ? '−' : ''
  const num = Math.abs(n) === 1 ? 'π' : `${Math.abs(n)}π`
  return den === 1 ? minus + num : `${minus}${num}/${den}`
}

function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b]
  return a
}

export function ticks(lo: number, hi: number, pixels: number, pi = false): Ticks {
  const target = Math.max(2, pixels / 75)
  const span = hi - lo
  if (pi && span >= 2 && span <= 40 * Math.PI) {
    // Il passo (π/4, π/2, π, 2π, 4π) con il numero di tacche più vicino a quello voluto.
    let d = 1
    let best = Infinity
    for (const candidate of [4, 2, 1, 0.5, 0.25]) {
      const count = span / (Math.PI / candidate)
      const score = Math.abs(Math.log(count / target))
      if (count >= 2 && score < best) {
        best = score
        d = candidate
      }
    }
    const step = Math.PI / d
    const major: Ticks['major'] = []
    const minor: number[] = []
    for (let k = Math.ceil(lo / step); k * step <= hi + 1e-12; k++) {
      major.push({ value: k * step, label: d >= 1 ? piLabel(k, d) : piLabel(k / d, 1) })
    }
    const sub = step / 2
    for (let k = Math.ceil(lo / sub); k * sub <= hi; k++) if (k % 2) minor.push(k * sub)
    return { major, minor }
  }
  // Il passo 1, 2 o 5 (per una potenza di 10) che dà il numero di tacche più vicino a quello voluto.
  const mag = 10 ** Math.floor(Math.log10(span / target))
  let step = mag
  let best = Infinity
  for (const unit of [1, 2, 5, 10]) {
    const count = span / (unit * mag)
    const score = Math.abs(Math.log(count / target))
    if (count >= 2 && score < best) {
      best = score
      step = unit * mag
    }
  }
  const parts = Math.round(step / mag) === 2 ? 4 : 5
  const major: Ticks['major'] = []
  const minor: number[] = []
  for (let k = Math.ceil(lo / step - 1e-9); k * step <= hi + step * 1e-9; k++) {
    const value = Math.abs(k * step) < step * 1e-9 ? 0 : k * step
    major.push({ value, label: tickLabel(value, step) })
  }
  const sub = step / parts
  for (let k = Math.ceil(lo / sub - 1e-9); k * sub <= hi; k++) if (k % parts) minor.push(k * sub)
  return { major, minor }
}
