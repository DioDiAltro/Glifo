/**
 * Il disegno di un grafico in SVG: griglia, assi con le frecce e i numeri, le curve, i punti.
 * Lo stesso disegno serve all'anteprima (con i colori del tema) e alle immagini nei file .md.
 */
import { withWorkLimit } from '../math/evaluate'
import { lineAcross, regionEdges, sampleArea, sampleFunction, sampleImplicit, sampleParametric, sampleRegion, ticks, type Polyline, type Viewport } from './plot'
import { contourLevels, solutionCurves } from './ode'
import { GRAPH_WORK, type GraphItem, type GraphSpec } from './spec'

export interface Palette {
  /** Lo sfondo (null: trasparente, si vede quello dell'anteprima). */
  surface: string | null
  /** Il colore dietro i numeri, per staccarli dalla griglia. */
  halo: string
  grid: string
  gridMinor: string
  axis: string
  text: string
  /** I colori delle curve, nell'ordine (vedi la skill dataviz: validati per i due temi). */
  series: readonly string[]
  /** Quanto si vede il colore delle aree degli integrali: una velatura, la griglia resta visibile. */
  area: number
  /** Le linee della griglia sulle superfici 3D: un velo scuro sopra il loro colore. */
  mesh: string
}

export const PALETTES: Record<'light' | 'dark', Palette> = {
  light: {
    surface: null,
    halo: '#f7f8fb',
    grid: '#d9dce6',
    gridMinor: '#eceef3',
    axis: '#4a5068',
    text: '#5b6178',
    series: ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948'],
    area: 0.18,
    mesh: 'rgba(24, 28, 44, 0.3)',
  },
  dark: {
    surface: null,
    halo: '#12151c',
    grid: '#2c3140',
    gridMinor: '#1d212c',
    axis: '#a3a9bd',
    text: '#9aa0b5',
    series: ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300', '#9085e9', '#e66767'],
    area: 0.28,
    mesh: 'rgba(0, 0, 0, 0.4)',
  },
}

/** Il colore di ogni riga: le curve nell'ordine delle righe, i punti con l'inchiostro del testo. */
export function itemColors(items: readonly GraphItem[], palette: Palette): string[] {
  return items.map((item) => (item.kind === 'point' || item.kind === 'point3' ? palette.axis : palette.series[Math.max(0, item.slot) % palette.series.length]))
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString()

function path(line: Polyline): string {
  let d = `M${f1(line[0])} ${f1(line[1])}`
  for (let i = 2; i < line.length; i += 2) d += `L${f1(line[i])} ${f1(line[i + 1])}`
  return d
}

/** La punta di una freccia da (ax, ay) a (bx, by), in pixel. */
function arrow(ax: number, ay: number, bx: number, by: number): string {
  const len = Math.hypot(bx - ax, by - ay) || 1
  const ux = (bx - ax) / len
  const uy = (by - ay) / len
  const size = Math.min(12, len)
  const cx = bx - ux * size
  const cy = by - uy * size
  return `M${f1(bx)} ${f1(by)}L${f1(cx - uy * 5)} ${f1(cy + ux * 5)}L${f1(cx + uy * 5)} ${f1(cy - ux * 5)}Z`
}

/**
 * Il campo di direzioni di y' = f(x, y): un trattino con la pendenza in ogni punto di una griglia, e
 * le soluzioni dai punti iniziali (in pixel).
 */
function slopeField(item: Extract<GraphItem, { kind: 'slopes' }>, vp: Viewport, sx: (x: number) => number, sy: (y: number) => number): { segments: string; solutions: Polyline[] } {
  const { width: W, height: H } = vp
  const step = Math.max(22, Math.min(36, Math.min(W, H) / 13))
  const cols = Math.max(1, Math.floor(W / step))
  const rows = Math.max(1, Math.floor(H / step))
  const ox = (W - (cols - 1) * step) / 2
  const oy = (H - (rows - 1) * step) / 2
  const kx = sx(1) - sx(0)
  const ky = sy(1) - sy(0)
  let segments = ''
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const px = ox + i * step
      const py = oy + j * step
      const x = vp.x0 + (px / W) * (vp.x1 - vp.x0)
      const y = vp.y1 - (py / H) * (vp.y1 - vp.y0)
      const m = item.f(x, y)
      if (!Number.isFinite(m)) continue
      const dx = kx
      const dy = m * ky
      const len = Math.hypot(dx, dy) || 1
      const half = (0.32 * step) / len
      segments += `M${f1(px - dx * half)} ${f1(py - dy * half)}L${f1(px + dx * half)} ${f1(py + dy * half)}`
    }
  }
  const solutions = item.starts.flatMap(([x0, y0]) => solutionCurves(item.f, x0, y0, vp)).map((curve) => curve.flatMap(([x, y]) => [sx(x), sy(y)]))
  return { segments, solutions }
}

/** La punta che dice il verso di una curva con il nome, a metà del suo intervallo. */
function orientation(item: Extract<GraphItem, { kind: 'parametric' }>, sx: (x: number) => number, sy: (y: number) => number): string | null {
  const [t0, t1] = item.t
  const tm = (t0 + t1) / 2
  const h = (t1 - t0) * 1e-3 || 1e-3
  const [ax, ay] = [sx(item.fx(tm - h)), sy(item.fy(tm - h))]
  const [bx, by] = [sx(item.fx(tm + h)), sy(item.fy(tm + h))]
  const len = Math.hypot(bx - ax, by - ay)
  if (!(len > 1e-9) || ![ax, ay, bx, by].every(Number.isFinite)) return null
  const ux = (bx - ax) / len
  const uy = (by - ay) / len
  const [cx, cy] = [(ax + bx) / 2, (ay + by) / 2]
  return arrow(cx - ux * 8, cy - uy * 8, cx + ux * 7, cy + uy * 7)
}

/**
 * Le frecce di un campo, su una griglia: lunghe secondo quanto vale il campo (con la radice, così si
 * vedono anche quelle piccole), mai più lunghe dello spazio tra due frecce.
 */
function fieldArrows(F: (x: number, y: number) => [number, number], vp: Viewport, sx: (x: number) => number, sy: (y: number) => number): { shafts: string; tips: string } {
  const { width: W, height: H } = vp
  const step = Math.max(28, Math.min(46, Math.min(W, H) / 10))
  const cols = Math.max(1, Math.floor(W / step))
  const rows = Math.max(1, Math.floor(H / step))
  const ox = (W - (cols - 1) * step) / 2
  const oy = (H - (rows - 1) * step) / 2
  const kx = sx(1) - sx(0)
  const ky = sy(1) - sy(0)
  const samples: { px: number; py: number; vx: number; vy: number; m: number }[] = []
  let max = 0
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const px = ox + i * step
      const py = oy + j * step
      const x = vp.x0 + (px / W) * (vp.x1 - vp.x0)
      const y = vp.y1 - (py / H) * (vp.y1 - vp.y0)
      const [fx, fy] = F(x, y)
      const vx = fx * kx
      const vy = fy * ky
      const m = Math.hypot(vx, vy)
      if (!Number.isFinite(m)) continue
      max = Math.max(max, m)
      samples.push({ px, py, vx, vy, m })
    }
  }
  let shafts = ''
  let tips = ''
  if (!(max > 0)) return { shafts, tips }
  for (const { px, py, vx, vy, m } of samples) {
    if (m < max * 1e-9) continue
    const len = Math.max(5, 0.82 * step * Math.sqrt(m / max))
    const ux = vx / m
    const uy = vy / m
    const [ax, ay] = [px - (ux * len) / 2, py - (uy * len) / 2]
    const [bx, by] = [px + (ux * len) / 2, py + (uy * len) / 2]
    const head = Math.min(6, len * 0.45)
    shafts += `M${f1(ax)} ${f1(ay)}L${f1(bx - ux * head * 0.8)} ${f1(by - uy * head * 0.8)}`
    const [cx, cy] = [bx - ux * head, by - uy * head]
    tips += `M${f1(bx)} ${f1(by)}L${f1(cx - uy * 2.8)} ${f1(cy + ux * 2.8)}L${f1(cx + uy * 2.8)} ${f1(cy - ux * 2.8)}Z`
  }
  return { shafts, tips }
}

/** Il colore di un'area (#rrggbb) con la sua trasparenza, per le legende. */
export function areaColor(color: string, palette: Palette): string {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16))
  return `rgba(${r}, ${g}, ${b}, ${palette.area})`
}

export function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

const SUBSCRIPT: Record<string, string> = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' }

/** Il nome di un punto come testo: P_1 → P₁. */
export function pointName(name: string): string {
  const [base, sub] = name.split('_')
  if (!sub) return base
  return base + (/^\d+$/.test(sub) ? sub.split('').map((c) => SUBSCRIPT[c]).join('') : `_${sub}`)
}

export interface DrawOptions {
  /** Per gli id dentro l'SVG (il ritaglio): diversi per ogni grafico della pagina. */
  id: string
  /** Il nome da leggere per chi non vede il disegno. */
  title?: string
}

/** Il grafico nella finestra `vp`, come testo SVG. */
export function graphSvg(spec: GraphSpec, vp: Viewport, palette: Palette, options: DrawOptions): string {
  return withWorkLimit(GRAPH_WORK, () => drawGraph(spec, vp, palette, options))
}

function drawGraph(spec: GraphSpec, vp: Viewport, palette: Palette, options: DrawOptions): string {
  const { width: W, height: H } = vp
  const sx = (x: number) => ((x - vp.x0) / (vp.x1 - vp.x0)) * W
  const sy = (y: number) => ((vp.y1 - y) / (vp.y1 - vp.y0)) * H
  const out: string[] = []
  const clip = `${options.id}-clip`
  out.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" class="graph-svg" role="img"${options.title ? ` aria-label="${escapeXml(options.title)}"` : ''} font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">`,
    `<defs><clipPath id="${clip}"><rect width="${W}" height="${H}"/></clipPath></defs>`,
  )
  if (palette.surface) out.push(`<rect width="${W}" height="${H}" fill="${palette.surface}"/>`)

  // Griglia
  const tx = ticks(vp.x0, vp.x1, W, spec.trig)
  const ty = ticks(vp.y0, vp.y1, H)
  const vertical = (xs: number[]) => xs.map((x) => `M${f1(sx(x))} 0V${H}`).join('')
  const horizontal = (ys: number[]) => ys.map((y) => `M0 ${f1(sy(y))}H${W}`).join('')
  out.push(`<path d="${vertical(tx.minor)}${horizontal(ty.minor)}" stroke="${palette.gridMinor}" stroke-width="1" fill="none"/>`)
  out.push(`<path d="${vertical(tx.major.map((t) => t.value))}${horizontal(ty.major.map((t) => t.value))}" stroke="${palette.grid}" stroke-width="1" fill="none"/>`)

  // Le aree degli integrali e le zone, sotto gli assi e le curve
  const colors = itemColors(spec.items, palette)
  const areas: string[] = []
  spec.items.forEach((item, i) => {
    let pieces: Polyline[] = []
    if (item.kind === 'area') pieces = sampleArea(item.f, item.from, item.to, vp)
    else if (item.kind === 'region' && !item.same) pieces = sampleRegion(item.M, vp)
    else if (item.kind === 'polygon') pieces = [item.points.flatMap((p) => [sx(p[0]), sy(p[1])])]
    else if (item.kind === 'angle') {
      const arc = angleArc(item, sx, sy)
      if (arc) areas.push(`<path d="${arc.sector}" fill="${colors[i]}" data-area="${i}"/>`)
      return
    } else return
    if (pieces.length) areas.push(`<path d="${pieces.map((p) => `${path(p)}Z`).join('')}" fill="${colors[i]}" data-area="${i}"/>`)
  })
  if (areas.length) out.push(`<g clip-path="url(#${clip})" fill-opacity="${palette.area}" stroke="none">${areas.join('')}</g>`)

  // Assi: dove c'è lo zero; se è fuori, i numeri vanno sul bordo.
  const ax = sx(0)
  const ay = sy(0)
  const xAxis = ay >= 0 && ay <= H
  const yAxis = ax >= 0 && ax <= W
  const axisPaths: string[] = []
  if (xAxis) axisPaths.push(`M0 ${f1(ay)}H${W - 2}`)
  if (yAxis) axisPaths.push(`M${f1(ax)} ${H}V2`)
  if (axisPaths.length) out.push(`<path d="${axisPaths.join('')}" stroke="${palette.axis}" stroke-width="1.25" fill="none"/>`)
  const arrows: string[] = []
  if (xAxis) arrows.push(`M${W} ${f1(ay)}l-9 -4v8z`)
  if (yAxis) arrows.push(`M${f1(ax)} 0l-4 9h8z`)
  if (arrows.length) out.push(`<path d="${arrows.join('')}" fill="${palette.axis}"/>`)

  // Numeri sulle tacche (i loro rettangoli in `taken`: i nomi dei punti li evitano)
  const labels: string[] = []
  const taken: Box[] = []
  const halo = `stroke="${palette.halo}" stroke-width="3" stroke-linejoin="round" paint-order="stroke"`
  const below = !xAxis ? (vp.y1 <= 0 ? 16 : H - 6) : ay > H - 20 ? ay - 6 : ay + 15
  for (const t of tx.major) {
    const x = sx(t.value)
    if (x < 8 || x > W - 22 || (t.value === 0 && yAxis)) continue
    labels.push(`<text x="${f1(x)}" y="${f1(below)}" text-anchor="middle">${escapeXml(t.label)}</text>`)
    taken.push(textBox(x, below, 'middle', 6.5 * t.label.length, 11.5))
    if (xAxis) labels.push(`<path d="M${f1(x)} ${f1(ay - 3)}v6" stroke="${palette.axis}"/>`)
  }
  const leftSide = !yAxis ? vp.x1 <= 0 : ax < 34
  const lx = !yAxis ? (vp.x1 <= 0 ? W - 6 : 6) : leftSide ? ax + 7 : ax - 7
  const anchor = !yAxis ? (vp.x1 <= 0 ? 'end' : 'start') : leftSide ? 'start' : 'end'
  for (const t of ty.major) {
    const y = sy(t.value)
    if (y < 18 || y > H - 8 || (t.value === 0 && (xAxis || yAxis))) continue
    const label = spec.gauss ? imaginaryLabel(t.label) : t.label
    labels.push(`<text x="${f1(lx)}" y="${f1(y + 4)}" text-anchor="${anchor}">${escapeXml(label)}</text>`)
    taken.push(textBox(lx, y + 4, anchor, 6.5 * label.length, 11.5))
    if (yAxis) labels.push(`<path d="M${f1(ax - 3)} ${f1(y)}h6" stroke="${palette.axis}"/>`)
  }
  out.push(`<g font-size="11.5" fill="${palette.text}" ${halo}>${labels.join('')}</g>`)

  // Le curve, ritagliate sul riquadro
  const curves: string[] = []
  /** Le linee disegnate (in pixel): i nomi dei punti non ci vanno sopra. */
  const drawn: Polyline[] = []
  /** I valori delle curve di livello, e i punti iniziali delle soluzioni delle equazioni differenziali. */
  const levelLabels: { x: number; y: number; text: string }[] = []
  const startDots: string[] = []
  const dashed: string[] = []
  /** Le punte dei vettori. */
  const heads: string[] = []
  spec.items.forEach((item, i) => {
    const color = colors[i]
    let lines: Polyline[] = []
    // Una curva che un'altra riga disegna già (l'integrale su γ con γ nel blocco).
    if (item.same && item.kind !== 'region') return
    if (item.kind === 'function' || (item.kind === 'area' && item.curve)) {
      const s = sampleFunction(item.f, vp)
      lines = s.lines
      for (const p of s.poles) dashed.push(`M${f1(sx(p))} 0V${H}`)
    } else if (item.kind === 'implicit') lines = sampleImplicit(item.F, vp)
    else if (item.kind === 'region' && !item.same) {
      // Il bordo della zona: tratteggiato dove non ne fa parte (< e >).
      for (const edge of regionEdges(item, vp)) {
        if (edge.lines.length) curves.push(`<path d="${edge.lines.map(path).join('')}" stroke="${color}" stroke-width="2"${edge.strict ? ' stroke-dasharray="6 4"' : ''} data-item="${i}"/>`)
        drawn.push(...edge.lines)
      }
    }
    else if (item.kind === 'parametric') {
      lines = item.straight ? lineAcross(item.fx, item.fy, vp) : sampleParametric(item.fx, item.fy, item.t, vp)
      // Il verso della curva: una punta a metà, dove va t.
      if (item.arrow) {
        const head = orientation(item, sx, sy)
        if (head) heads.push(`<path d="${head}" fill="${color}"/>`)
      }
    } else if (item.kind === 'field') {
      const { shafts, tips } = fieldArrows(item.F, vp, sx, sy)
      if (shafts) curves.push(`<path d="${shafts}" stroke="${color}" stroke-width="1.6" data-item="${i}"/>`)
      if (tips) heads.push(`<path d="${tips}" fill="${color}"/>`)
    } else if (item.kind === 'contour') {
      // Le curve di livello, più chiare quelle basse; i valori scritti su alcune.
      const levels = contourLevels(item.F, vp)
      levels.forEach(({ value, lines: polylines }, k) => {
        if (!polylines.length) return
        const opacity = levels.length > 1 ? 0.35 + (0.65 * k) / (levels.length - 1) : 1
        curves.push(`<path d="${polylines.map(path).join('')}" stroke="${color}" stroke-width="1.5" stroke-opacity="${Math.round(opacity * 100) / 100}" data-item="${i}"/>`)
        drawn.push(...polylines)
        // Il valore su un punto della curva più lunga dove non copre i numeri degli assi o altri valori.
        const longest = polylines.reduce((a, b) => (b.length > a.length ? b : a))
        const width = 6 * value.length + 4
        for (const t of [0.25, 0.5, 0.75, 0.125, 0.375, 0.625, 0.875]) {
          const m = Math.floor((longest.length / 2) * t) * 2
          const [x, y] = [longest[m], longest[m + 1]]
          if (x < 10 || x > W - 10 || y < 12 || y > H - 6) continue
          const box = textBox(x, y + 4, 'middle', width, 10.5)
          if (taken.some((b) => box[0] < b[2] + 3 && b[0] < box[2] + 3 && box[1] < b[3] + 3 && b[1] < box[3] + 3)) continue
          taken.push(box)
          levelLabels.push({ x, y, text: value })
          break
        }
      })
    } else if (item.kind === 'slopes') {
      const { segments, solutions } = slopeField(item, vp, sx, sy)
      if (segments) curves.push(`<path d="${segments}" stroke="${color}" stroke-width="1.3" stroke-opacity="0.55" data-item="${i}"/>`)
      if (solutions.length) curves.push(`<path d="${solutions.map(path).join('')}" stroke="${color}" stroke-width="2.5" data-item="${i}"/>`)
      drawn.push(...solutions)
      for (const [x0, y0] of item.starts) startDots.push(`<circle cx="${f1(sx(x0))}" cy="${f1(sy(y0))}" r="4" fill="${color}" stroke="${palette.halo}" stroke-width="2" paint-order="stroke"/>`)
    }
    else if (item.kind === 'vertical') lines = [[sx(item.x), -2, sx(item.x), H + 2]]
    else if (item.kind === 'vector') {
      // La linea finisce alla base della punta: la punta la disegna dopo, piena.
      const [ax, ay, bx, by] = [sx(item.from[0]), sy(item.from[1]), sx(item.to[0]), sy(item.to[1])]
      const len = Math.hypot(bx - ax, by - ay)
      if (len > 0.5) {
        const k = len > 14 ? (len - 10) / len : 1
        lines = [[ax, ay, ax + (bx - ax) * k, ay + (by - ay) * k]]
        heads.push(`<path d="${arrow(ax, ay, bx, by)}" fill="${color}"/>`)
      }
    }
    else if (item.kind === 'segment') lines = [[sx(item.a[0]), sy(item.a[1]), sx(item.b[0]), sy(item.b[1])]]
    else if (item.kind === 'polygon') {
      const ring = item.points.flatMap((p) => [sx(p[0]), sy(p[1])])
      lines = [[...ring, ring[0], ring[1]]]
    } else if (item.kind === 'angle') {
      const arc = angleArc(item, sx, sy)
      if (arc) curves.push(`<path d="${arc.edge}" stroke="${color}" stroke-width="2" data-item="${i}"/>`)
    } else if (item.kind === 'complex' && item.arrows) {
      // Un numero complesso: la freccia dall'origine.
      for (const z of item.values) {
        const [ax, ay, bx, by] = [sx(0), sy(0), sx(z.re), sy(z.im)]
        const len = Math.hypot(bx - ax, by - ay)
        if (len <= 0.5) continue
        const k = len > 14 ? (len - 10) / len : 1
        lines.push([ax, ay, ax + (bx - ax) * k, ay + (by - ay) * k])
        heads.push(`<path d="${arrow(ax, ay, bx, by)}" fill="${color}"/>`)
      }
    }
    // Un asintoto: tratteggiato e più sottile.
    if (lines.length) curves.push(`<path d="${lines.map(path).join('')}" stroke="${color}"${item.dashed ? ' stroke-width="1.75" stroke-dasharray="7 5"' : ''} data-item="${i}"/>`)
    drawn.push(...lines)
  })
  out.push(`<g clip-path="url(#${clip})" fill="none" stroke-linecap="round" stroke-linejoin="round">`)
  if (dashed.length) out.push(`<path d="${dashed.join('')}" stroke="${palette.axis}" stroke-width="1" stroke-dasharray="5 5" opacity="0.7"/>`)
  out.push(`<g stroke-width="2.5">${curves.join('')}</g>${heads.join('')}</g>`)

  // I nomi degli assi e l'origine O (disegnati alla fine, sopra a tutto)
  const names: string[] = []
  const math = `font-style="italic" font-family="'KaTeX_Math', 'Times New Roman', serif" font-size="16" fill="${palette.axis}" ${halo}`
  // Nel piano di Gauss gli assi sono la parte reale e quella immaginaria.
  const [xName, yName] = spec.gauss ? ['Re', 'Im'] : ['x', 'y']
  const axisFont = spec.gauss ? math.replace('font-style="italic" ', '').replace("'KaTeX_Math'", "'KaTeX_Main'") : math
  if (xAxis) {
    const y = ay > 24 ? ay - 9 : ay + 20
    names.push(`<text x="${W - 6}" y="${f1(y)}" text-anchor="end" ${axisFont}>${xName}</text>`)
    taken.push(textBox(W - 6, y, 'end', 9 * xName.length, 16))
  }
  if (yAxis) {
    names.push(`<text x="${f1(ax + 9)}" y="14" ${axisFont}>${yName}</text>`)
    taken.push(textBox(ax + 9, 14, 'start', 9 * yName.length, 16))
  }
  // Un punto con il nome nell'origine (A = (0, 0)) prende il posto della O.
  const named = spec.items.some((item) => item.kind === 'point' && item.name && Math.abs(sx(item.x) - ax) < 1 && Math.abs(sy(item.y) - ay) < 1)
  if (xAxis && yAxis && !named) {
    const y = ay + 16 > H - 2 ? ay - 6 : ay + 16
    names.push(`<text x="${f1(ax - 6)}" y="${f1(y)}" text-anchor="end" ${math.replace('font-style="italic" ', '')}>O</text>`)
    taken.push(textBox(ax - 6, y, 'end', 12, 16))
  }
  /** Il nome di un punto (o di un vettore) dove non copre niente, dalla parte di `away` se si può. */
  const nameAt = (x: number, y: number, name: string, away: [number, number] | null) => {
    const spot = nameSpot(x, y, away, nameWidth(name), { W, H, ax: xAxis || yAxis ? ax : NaN, ay, xAxis, yAxis }, taken, drawn)
    return `<text x="${f1(spot.x)}" y="${f1(spot.y)}" text-anchor="${spot.anchor}" font-style="italic" font-family="'KaTeX_Math', 'Times New Roman', serif" font-size="16" fill="${palette.text}" ${halo}>${escapeXml(name)}</text>`
  }

  // Punti, con il nome
  const points: string[] = [...startDots]
  for (const { x, y, text } of levelLabels) {
    points.push(`<text x="${f1(x)}" y="${f1(y + 4)}" text-anchor="middle" font-size="10.5" fill="${palette.text}" ${halo}>${escapeXml(text)}</text>`)
  }
  // I punti delle intersezioni: pallini del colore della riga; gli angoli con l'ampiezza.
  spec.items.forEach((item, i) => {
    if (item.kind === 'points') {
      for (const p of item.points) {
        const x = sx(p[0])
        const y = sy(p[1])
        if (x < -5 || x > W + 5 || y < -5 || y > H + 5) continue
        points.push(`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" fill="${colors[i]}" stroke="${palette.halo}" stroke-width="2" paint-order="stroke" data-item="${i}"/>`)
      }
    } else if (item.kind === 'angle') {
      const arc = angleArc(item, sx, sy)
      if (!arc) return
      points.push(`<text x="${f1(arc.label[0])}" y="${f1(arc.label[1] + 4)}" text-anchor="middle" font-size="12" fill="${palette.text}" ${halo}>${escapeXml(arc.text)}</text>`)
      taken.push(textBox(arc.label[0], arc.label[1] + 4, 'middle', 6.6 * arc.text.length, 12))
    }
  })
  // I numeri complessi senza freccia (le radici, le soluzioni): pallini del colore della riga.
  spec.items.forEach((item, i) => {
    if (item.kind !== 'complex') return
    for (const z of item.arrows ? [] : item.values) {
      const x = sx(z.re)
      const y = sy(z.im)
      if (x < -5 || x > W + 5 || y < -5 || y > H + 5) continue
      points.push(`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" fill="${colors[i]}" stroke="${palette.halo}" stroke-width="2" paint-order="stroke" data-item="${i}"/>`)
    }
    const tip = item.values[0]
    if (item.name && tip) {
      const x = sx(tip.re)
      const y = sy(tip.im)
      if (x < -5 || x > W + 5 || y < -5 || y > H + 5) return
      // Con la freccia il nome va oltre la punta.
      points.push(nameAt(x, y, pointName(item.name), item.arrows ? direction(sx(0), sy(0), x, y) : null))
    }
  })
  spec.items.forEach((item, i) => {
    if (item.kind !== 'point') return
    const x = sx(item.x)
    const y = sy(item.y)
    if (x < -5 || x > W + 5 || y < -5 || y > H + 5) return
    points.push(`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" fill="${colors[i]}" stroke="${palette.halo}" stroke-width="2" paint-order="stroke"/>`)
    if (item.name) points.push(nameAt(x, y, pointName(item.name), awayFrom(spec.items, x, y, sx, sy)))
  })
  // I nomi dei vettori, vicino alla punta.
  spec.items.forEach((item) => {
    if (item.kind !== 'vector' || !item.name) return
    const x = sx(item.to[0])
    const y = sy(item.to[1])
    if (x < -5 || x > W + 5 || y < -5 || y > H + 5) return
    // Oltre la punta della freccia.
    points.push(nameAt(x, y, pointName(item.name.replace(/⃗$/, '')), direction(sx(item.from[0]), sy(item.from[1]), x, y)))
  })
  out.push(points.join(''))

  out.push(names.join(''))
  out.push('</svg>')
  return out.join('')
}

/**
 * Da che parte scrivere il nome di un punto (in pixel, lunghezza 1): lontano dalle figure di cui è
 * un vertice (fuori dal triangolo, fuori dall'angolo, oltre la fine del segmento). Null se non ce
 * ne sono: allora va in alto a destra.
 */
function awayFrom(
  items: readonly GraphItem[],
  x: number,
  y: number,
  sx: (x: number) => number,
  sy: (y: number) => number,
): [number, number] | null {
  let ux = 0
  let uy = 0
  const near = (p: readonly number[]) => Math.abs(sx(p[0]) - x) < 0.75 && Math.abs(sy(p[1]) - y) < 0.75
  /** Aggiunge la direzione da (fx, fy) verso il punto. */
  const push = (fx: number, fy: number) => {
    const len = Math.hypot(x - fx, y - fy)
    if (len < 0.5) return
    ux += (x - fx) / len
    uy += (y - fy) / len
  }
  for (const item of items) {
    if (item.kind === 'polygon' && item.points.some(near)) {
      const n = item.points.length
      push(item.points.reduce((t, p) => t + sx(p[0]), 0) / n, item.points.reduce((t, p) => t + sy(p[1]), 0) / n)
    } else if (item.kind === 'segment') {
      if (near(item.a)) push(sx(item.b[0]), sy(item.b[1]))
      else if (near(item.b)) push(sx(item.a[0]), sy(item.a[1]))
    } else if (item.kind === 'angle' && near(item.vertex)) {
      // Dalla parte opposta alla bisettrice.
      const da = Math.hypot(sx(item.a[0]) - x, sy(item.a[1]) - y) || 1
      const db = Math.hypot(sx(item.b[0]) - x, sy(item.b[1]) - y) || 1
      push(x + (sx(item.a[0]) - x) / da + (sx(item.b[0]) - x) / db, y + (sy(item.a[1]) - y) / da + (sy(item.b[1]) - y) / db)
    }
  }
  const len = Math.hypot(ux, uy)
  return len < 0.3 ? null : [ux / len, uy / len]
}

/** Un rettangolo occupato da una scritta, in pixel: x0, y0, x1, y1. */
type Box = [number, number, number, number]

/** Il rettangolo di una scritta che parte da (x, y) (y è la riga di base), allineata con `anchor`. */
function textBox(x: number, y: number, anchor: string, width: number, size: number): Box {
  const x0 = anchor === 'start' ? x : anchor === 'end' ? x - width : x - width / 2
  return [x0, y - 0.75 * size, x0 + width, y + 0.2 * size]
}

/** Quanto è largo il nome di un punto (16 px, corsivo): le lettere a pedice sono più strette. */
function nameWidth(name: string): number {
  return [...name].reduce((w, c, i) => w + (i === 0 ? 11 : /[₀-₉]/.test(c) ? 7 : 9), 0)
}

/** La direzione (lunghezza 1) da (ax, ay) a (bx, by); null se sono lo stesso punto. */
function direction(ax: number, ay: number, bx: number, by: number): [number, number] | null {
  const len = Math.hypot(bx - ax, by - ay)
  return len < 0.5 ? null : [(bx - ax) / len, (by - ay) / len]
}

/** La linea da (x0, y0) a (x1, y1) passa nel rettangolo? (Liang–Barsky) */
function crossesBox(x0: number, y0: number, x1: number, y1: number, b: Box): boolean {
  let t0 = 0
  let t1 = 1
  const dx = x1 - x0
  const dy = y1 - y0
  const sides: [number, number][] = [[-dx, x0 - b[0]], [dx, b[2] - x0], [-dy, y0 - b[1]], [dy, b[3] - y0]]
  for (const [p, q] of sides) {
    if (p === 0) {
      if (q < 0) return false
      continue
    }
    const t = q / p
    if (p < 0) t0 = Math.max(t0, t)
    else t1 = Math.min(t1, t)
    if (t0 > t1) return false
  }
  return true
}

interface Frame {
  W: number
  H: number
  ax: number
  ay: number
  xAxis: boolean
  yAxis: boolean
}

/**
 * Dove scrivere il nome di un punto: prova le otto direzioni intorno e sceglie quella più vicina ad
 * `away` (o in alto a destra) che non copre altre scritte, le linee disegnate e gli assi e che resta
 * nel riquadro. Il rettangolo scelto va in `taken`.
 */
function nameSpot(
  x: number,
  y: number,
  away: [number, number] | null,
  width: number,
  frame: Frame,
  taken: Box[],
  drawn: readonly Polyline[],
): { x: number; y: number; anchor: string } {
  const [px, py] = away ?? [0.71, -0.71]
  const pad = 4
  // Solo i pezzi di linea vicini al punto.
  const near: number[] = []
  for (const line of drawn) {
    for (let i = 0; i + 3 < line.length; i += 2) {
      const [x0, y0, x1, y1] = [line[i], line[i + 1], line[i + 2], line[i + 3]]
      if (Math.max(x0, x1) < x - 60 || Math.min(x0, x1) > x + 60 || Math.max(y0, y1) < y - 60 || Math.min(y0, y1) > y + 60) continue
      near.push(x0, y0, x1, y1)
    }
  }
  let best = { x, y, anchor: 'start', box: [x, y, x, y] as Box, score: -Infinity }
  for (let k = 0; k < 8; k++) {
    const t = (-k * Math.PI) / 4
    const ux = Math.round(Math.cos(t) * 100) / 100
    const uy = Math.round(Math.sin(t) * 100) / 100
    const anchor = ux > 0.38 ? 'start' : ux < -0.38 ? 'end' : 'middle'
    const tx = x + 10 * ux
    // y è la riga di base del testo: sotto il punto il nome scende di tutta la sua altezza.
    const ty = y + 10 * uy + (uy > 0.38 ? 12 : uy < -0.38 ? -1 : 5)
    const box = textBox(tx, ty, anchor, width, 16)
    let score = ux * px + uy * py
    if (box[0] < 2 || box[2] > frame.W - 2 || box[1] < 2 || box[3] > frame.H - 2) score -= 4
    for (const b of taken) if (box[0] < b[2] + pad && b[0] < box[2] + pad && box[1] < b[3] + pad && b[1] < box[3] + pad) score -= 3
    for (let i = 0; i < near.length; i += 4) {
      if (crossesBox(near[i], near[i + 1], near[i + 2], near[i + 3], box)) {
        score -= 1.5
        break
      }
    }
    if (frame.xAxis && box[1] < frame.ay && box[3] > frame.ay) score -= 1
    if (frame.yAxis && box[0] < frame.ax && box[2] > frame.ax) score -= 1
    if (score > best.score) best = { x: tx, y: ty, anchor, box, score }
  }
  taken.push(best.box)
  return best
}

/**
 * L'arco di un angolo nel suo vertice (in pixel): il settore da colorare, il bordo (un quadratino
 * per l'angolo retto) e dove scrivere l'ampiezza.
 */
function angleArc(
  item: Extract<GraphItem, { kind: 'angle' }>,
  sx: (x: number) => number,
  sy: (y: number) => number,
): { sector: string; edge: string; label: [number, number]; text: string } | null {
  const vx = sx(item.vertex[0])
  const vy = sy(item.vertex[1])
  const ax = sx(item.a[0]) - vx
  const ay = sy(item.a[1]) - vy
  const bx = sx(item.b[0]) - vx
  const by = sy(item.b[1]) - vy
  const la = Math.hypot(ax, ay)
  const lb = Math.hypot(bx, by)
  if (la < 1 || lb < 1) return null
  const r = Math.max(10, Math.min(26, 0.45 * Math.min(la, lb)))
  const ta = Math.atan2(ay, ax)
  let delta = Math.atan2(by, bx) - ta
  while (delta <= -Math.PI) delta += 2 * Math.PI
  while (delta > Math.PI) delta -= 2 * Math.PI
  const at = (t: number, radius: number): [number, number] => [vx + radius * Math.cos(t), vy + radius * Math.sin(t)]
  const [x0, y0] = at(ta, r)
  const [x1, y1] = at(ta + delta, r)
  const sweep = delta > 0 ? 1 : 0
  const mid = ta + delta / 2
  const round = Math.round(item.degrees * 10) / 10
  const text = `${String(round).replace('.', ',')}°`
  // L'ampiezza sulla bisettrice, lontano quanto basta perché la scritta non tocchi i lati.
  const w = 6.6 * text.length + 4
  const h = 14
  const extent = (t: number) => (Math.abs(Math.sin(t)) * w) / 2 + (Math.abs(Math.cos(t)) * h) / 2
  const sine = Math.sin(Math.abs(delta) / 2)
  const far = sine > 0.01 ? (Math.max(extent(ta), extent(ta + delta)) + 2) / sine : Infinity
  const label = at(mid, Math.min(Math.max(r + 14, far), r + 70))
  // L'angolo retto: un quadratino.
  if (Math.abs(item.degrees - 90) < 1e-6) {
    const s = Math.min(r, 14)
    const ua = [ax / la, ay / la]
    const ub = [bx / lb, by / lb]
    const p1 = [vx + s * ua[0], vy + s * ua[1]]
    const p2 = [vx + s * (ua[0] + ub[0]), vy + s * (ua[1] + ub[1])]
    const p3 = [vx + s * ub[0], vy + s * ub[1]]
    const edge = `M${f1(p1[0])} ${f1(p1[1])}L${f1(p2[0])} ${f1(p2[1])}L${f1(p3[0])} ${f1(p3[1])}`
    return { sector: `M${f1(vx)} ${f1(vy)}L${f1(p1[0])} ${f1(p1[1])}L${f1(p2[0])} ${f1(p2[1])}L${f1(p3[0])} ${f1(p3[1])}Z`, edge, label, text }
  }
  const arc = `A${f1(r)} ${f1(r)} 0 0 ${sweep} ${f1(x1)} ${f1(y1)}`
  return { sector: `M${f1(vx)} ${f1(vy)}L${f1(x0)} ${f1(y0)}${arc}Z`, edge: `M${f1(x0)} ${f1(y0)}${arc}`, label, text }
}

/** Il numero di una tacca dell'asse immaginario: 2 → 2i, 1 → i, −1 → −i. */
export function imaginaryLabel(label: string): string {
  if (label === '1') return 'i'
  if (label === '−1' || label === '-1') return '−i'
  return `${label}i`
}

/** La descrizione per chi non vede il disegno: «Grafico di y = x^2 e y = 2x». */
export function graphTitle(spec: GraphSpec): string {
  const labels = spec.items.filter((i) => i.kind !== 'point').map((i) => i.label)
  return labels.length ? `Grafico di ${labels.join(' e ')}` : 'Grafico'
}
