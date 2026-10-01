/**
 * Il disegno di un grafico in SVG: griglia, assi con le frecce e i numeri, le curve, i punti.
 * Lo stesso disegno serve all'anteprima (con i colori del tema) e alle immagini nei file .md.
 */
import { withWorkLimit } from '../math/evaluate'
import { sampleFunction, sampleImplicit, sampleParametric, ticks, type Polyline, type Viewport } from './plot'
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
  },
  dark: {
    surface: null,
    halo: '#12151c',
    grid: '#2c3140',
    gridMinor: '#1d212c',
    axis: '#a3a9bd',
    text: '#9aa0b5',
    series: ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300', '#9085e9', '#e66767'],
  },
}

/** Il colore di ogni riga: le curve nell'ordine, i punti con l'inchiostro del testo. */
export function itemColors(items: readonly GraphItem[], palette: Palette): string[] {
  let n = 0
  return items.map((item) => (item.kind === 'point' ? palette.axis : palette.series[n++ % palette.series.length]))
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString()

function path(line: Polyline): string {
  let d = `M${f1(line[0])} ${f1(line[1])}`
  for (let i = 2; i < line.length; i += 2) d += `L${f1(line[i])} ${f1(line[i + 1])}`
  return d
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

  // Numeri sulle tacche
  const labels: string[] = []
  const halo = `stroke="${palette.halo}" stroke-width="3" stroke-linejoin="round" paint-order="stroke"`
  const below = !xAxis ? (vp.y1 <= 0 ? 16 : H - 6) : ay > H - 20 ? ay - 6 : ay + 15
  for (const t of tx.major) {
    const x = sx(t.value)
    if (x < 8 || x > W - 22 || (t.value === 0 && yAxis)) continue
    labels.push(`<text x="${f1(x)}" y="${f1(below)}" text-anchor="middle">${escapeXml(t.label)}</text>`)
    if (xAxis) labels.push(`<path d="M${f1(x)} ${f1(ay - 3)}v6" stroke="${palette.axis}"/>`)
  }
  const leftSide = !yAxis ? vp.x1 <= 0 : ax < 34
  const lx = !yAxis ? (vp.x1 <= 0 ? W - 6 : 6) : leftSide ? ax + 7 : ax - 7
  const anchor = !yAxis ? (vp.x1 <= 0 ? 'end' : 'start') : leftSide ? 'start' : 'end'
  for (const t of ty.major) {
    const y = sy(t.value)
    if (y < 18 || y > H - 8 || (t.value === 0 && (xAxis || yAxis))) continue
    labels.push(`<text x="${f1(lx)}" y="${f1(y + 4)}" text-anchor="${anchor}">${escapeXml(t.label)}</text>`)
    if (yAxis) labels.push(`<path d="M${f1(ax - 3)} ${f1(y)}h6" stroke="${palette.axis}"/>`)
  }
  out.push(`<g font-size="11.5" fill="${palette.text}" ${halo}>${labels.join('')}</g>`)

  // Le curve, ritagliate sul riquadro
  const colors = itemColors(spec.items, palette)
  const curves: string[] = []
  const dashed: string[] = []
  spec.items.forEach((item, i) => {
    const color = colors[i]
    let lines: Polyline[] = []
    if (item.kind === 'function') {
      const s = sampleFunction(item.f, vp)
      lines = s.lines
      for (const p of s.poles) dashed.push(`M${f1(sx(p))} 0V${H}`)
    } else if (item.kind === 'implicit') lines = sampleImplicit(item.F, vp)
    else if (item.kind === 'parametric') lines = sampleParametric(item.fx, item.fy, item.t, vp)
    else if (item.kind === 'vertical') lines = [[sx(item.x), -2, sx(item.x), H + 2]]
    if (lines.length) curves.push(`<path d="${lines.map(path).join('')}" stroke="${color}" data-item="${i}"/>`)
  })
  out.push(`<g clip-path="url(#${clip})" fill="none" stroke-linecap="round" stroke-linejoin="round">`)
  if (dashed.length) out.push(`<path d="${dashed.join('')}" stroke="${palette.axis}" stroke-width="1" stroke-dasharray="5 5" opacity="0.7"/>`)
  out.push(`<g stroke-width="2.5">${curves.join('')}</g></g>`)

  // Punti, con il nome
  const points: string[] = []
  spec.items.forEach((item, i) => {
    if (item.kind !== 'point') return
    const x = sx(item.x)
    const y = sy(item.y)
    if (x < -5 || x > W + 5 || y < -5 || y > H + 5) return
    points.push(`<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" fill="${colors[i]}" stroke="${palette.halo}" stroke-width="2" paint-order="stroke"/>`)
    if (item.name) {
      const right = x < W - 40
      points.push(`<text x="${f1(right ? x + 8 : x - 8)}" y="${f1(y < 22 ? y + 18 : y - 8)}" text-anchor="${right ? 'start' : 'end'}" font-style="italic" font-family="'KaTeX_Math', 'Times New Roman', serif" font-size="16" fill="${palette.text}" ${halo}>${escapeXml(pointName(item.name))}</text>`)
    }
  })
  out.push(points.join(''))

  // I nomi degli assi e l'origine O
  const names: string[] = []
  const math = `font-style="italic" font-family="'KaTeX_Math', 'Times New Roman', serif" font-size="16" fill="${palette.axis}" ${halo}`
  if (xAxis) names.push(`<text x="${W - 6}" y="${f1(ay > 24 ? ay - 9 : ay + 20)}" text-anchor="end" ${math}>x</text>`)
  if (yAxis) names.push(`<text x="${f1(ax + 9)}" y="14" ${math}>y</text>`)
  if (xAxis && yAxis) names.push(`<text x="${f1(ax - 6)}" y="${f1(ay + 16 > H - 2 ? ay - 6 : ay + 16)}" text-anchor="end" ${math.replace('font-style="italic" ', '')}>O</text>`)
  out.push(names.join(''))
  out.push('</svg>')
  return out.join('')
}

/** La descrizione per chi non vede il disegno: «Grafico di y = x^2 e y = 2x». */
export function graphTitle(spec: GraphSpec): string {
  const labels = spec.items.filter((i) => i.kind !== 'point').map((i) => i.label)
  return labels.length ? `Grafico di ${labels.join(' e ')}` : 'Grafico'
}
