/**
 * I grafici nell'anteprima. Il Markdown lascia un segnaposto con il testo del blocco e le
 * definizioni della nota che usa (vedi src/render/markdown.ts); qui diventa il disegno, con la
 * legenda e gli errori riga per riga. Il grafico si sposta trascinandolo, si ingrandisce con i
 * pulsanti (o con Ctrl + rotellina, o con due dita) e, passandoci sopra, dice le coordinate.
 */
import { escapeHtml, renderTex } from '../render/katex'
import type { Theme } from '../schema/model'
import { chooseWindow, type Viewport } from './plot'
import { parseGraph, type GraphSpec } from './spec'
import { graphSvg, graphTitle, itemColors, PALETTES, type Palette } from './svg'

export interface GraphLook {
  theme: Theme
  /** Lo sfondo dell'anteprima, dietro i numeri degli assi. */
  surface: string
}

type Window = Pick<Viewport, 'x0' | 'x1' | 'y0' | 'y1'>

const MAX_CACHE = 60
const specs = new Map<string, GraphSpec>()
/** I disegni già fatti: mentre si scrive altrove nella nota, il grafico non si rifà. */
const drawings = new Map<string, string>()
const windows = new Map<string, Window>()

function remember<T>(cache: Map<string, T>, key: string, make: () => T): T {
  let value = cache.get(key)
  if (value === undefined) {
    value = make()
    if (cache.size >= MAX_CACHE) cache.delete(cache.keys().next().value!)
    cache.set(key, value)
  }
  return value
}
/** Lo spostamento e lo zoom fatti a mano: restano finché il blocco resta uguale. */
const views = new Map<string, Window>()
let counter = 0

function specFor(key: string, source: string, defs: string[]): GraphSpec {
  return remember(specs, key, () => parseGraph(source, defs))
}

function readDefs(block: HTMLElement): string[] {
  try {
    const defs = JSON.parse(block.dataset.defs || '[]')
    return Array.isArray(defs) ? defs.filter((d): d is string => typeof d === 'string') : []
  } catch {
    return []
  }
}

/** Le misure del disegno: largo quanto l'anteprima (entro certi limiti), alto in proporzione. */
export function graphSize(available: number): { width: number; height: number } {
  const width = Math.round(Math.max(260, Math.min(720, available || 640)))
  return { width, height: Math.round(Math.max(200, Math.min(440, width * 0.62))) }
}

/** Una coordinata con la virgola, con tante cifre quante servono a quello zoom. */
function coord(v: number, step: number): string {
  const decimals = Math.max(0, Math.min(8, Math.ceil(-Math.log10(step))))
  let text = (Math.abs(v) < step / 2 ? 0 : v).toFixed(decimals)
  if (text.includes('.')) text = text.replace(/0+$/, '').replace(/\.$/, '')
  return text.replace('.', ',').replace('-', '−')
}

const ICON = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  reset: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>',
}

function toolButton(label: string, paths: string, action: string): string {
  return `<button type="button" class="icon-button graph-tool" data-action="${action}" title="${label}" aria-label="${label}"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg></button>`
}

class GraphView {
  private readonly spec: GraphSpec
  private readonly key: string
  private readonly palette: Palette
  private readonly theme: Theme
  private readonly colors: string[]
  private readonly id = `graph-${++counter}`
  private base: Window
  private view: Window
  private width: number
  private height: number
  private readonly frameEl: HTMLElement
  private readonly canvas: HTMLElement
  private readonly tip: HTMLElement
  private readonly dot: HTMLElement
  private readonly reset: HTMLButtonElement
  private frame = 0
  private drag: { x: number; y: number; view: Window } | null = null
  private readonly touches = new Map<number, { x: number; y: number }>()
  private pinch: { distance: number; center: { x: number; y: number }; view: Window } | null = null

  constructor(
    private readonly block: HTMLElement,
    look: GraphLook,
  ) {
    const source = block.dataset.graph ?? ''
    const defs = readDefs(block)
    this.key = `${source}\n\u0000${defs.join('\n')}`
    this.spec = specFor(this.key, source, defs)
    this.theme = look.theme
    this.palette = { ...PALETTES[look.theme], halo: look.surface || PALETTES[look.theme].halo }
    this.colors = itemColors(this.spec.items, this.palette)
    const size = graphSize(block.clientWidth)
    this.width = size.width
    this.height = size.height
    this.base = this.startWindow()
    this.view = views.get(this.key) ?? this.base

    // I pulsanti stanno sopra il disegno (e si vedono passandoci sopra); sui telefoni sotto, sempre.
    block.innerHTML = `<div class="graph-stage" style="max-width:${this.width}px"><div class="graph-frame"><div class="graph-canvas"></div><div class="graph-dot" hidden></div><div class="graph-tip" hidden></div></div><div class="graph-tools">${toolButton('Ingrandisci', ICON.plus, 'in')}${toolButton('Rimpicciolisci', ICON.minus, 'out')}${toolButton('Torna alla vista di partenza', ICON.reset, 'reset')}</div></div>${this.legendHtml()}${this.errorsHtml()}`
    const frame = block.querySelector<HTMLElement>('.graph-stage')!
    this.frameEl = frame
    this.canvas = block.querySelector<HTMLElement>('.graph-canvas')!
    this.tip = block.querySelector<HTMLElement>('.graph-tip')!
    this.dot = block.querySelector<HTMLElement>('.graph-dot')!
    this.reset = block.querySelector<HTMLButtonElement>('[data-action="reset"]')!
    this.render()

    frame.addEventListener('click', (ev) => {
      const action = (ev.target as HTMLElement).closest<HTMLElement>('[data-action]')?.dataset.action
      if (action === 'in') this.zoom(0.5)
      else if (action === 'out') this.zoom(2)
      else if (action === 'reset') this.setView(this.base)
    })
    // Il doppio clic sui pulsanti non deve portare all'editor (lo fa il doppio clic sul grafico).
    frame.querySelector('.graph-tools')!.addEventListener('dblclick', (ev) => ev.stopPropagation())
    this.canvas.addEventListener('pointerdown', (ev) => this.onDown(ev))
    this.canvas.addEventListener('pointermove', (ev) => this.onMove(ev))
    this.canvas.addEventListener('pointerup', (ev) => this.onUp(ev))
    this.canvas.addEventListener('pointercancel', (ev) => this.onUp(ev))
    this.canvas.addEventListener('pointerleave', () => this.hideTip())
    this.canvas.addEventListener('wheel', (ev) => this.onWheel(ev), { passive: false })
  }

  private legendHtml(): string {
    const rows = this.spec.items
      .map((item, i) => ({ item, color: this.colors[i] }))
      .filter(({ item }) => item.kind !== 'point' || item.name)
      .map(({ item, color }) => {
        const { html, error } = renderTex(item.label)
        const label = error ? `<code>${escapeHtml(item.label)}</code>` : html
        const swatch = item.kind === 'point' ? 'graph-swatch is-point' : 'graph-swatch'
        const coords = item.kind === 'point' ? ` <span class="graph-coords">${escapeHtml(`(${coord(item.x, 1e-3)}; ${coord(item.y, 1e-3)})`)}</span>` : ''
        return `<li><span class="${swatch}" style="--graph-color:${color}"></span>${label}${coords}</li>`
      })
    if (!rows.length && !this.spec.errors.length) {
      return '<p class="graph-hint">Scrivi nel blocco una funzione, una per riga: per esempio <code>y = x^2</code></p>'
    }
    return rows.length ? `<ul class="graph-legend">${rows.join('')}</ul>` : ''
  }

  private errorsHtml(): string {
    if (!this.spec.errors.length) return ''
    const first = Number(this.block.dataset.line)
    const rows = this.spec.errors.map((e) => {
      const where = Number.isFinite(first) ? `Riga ${first + e.line + 2}` : `Riga ${e.line + 1}`
      return `<li><strong>${where}</strong> <code>${escapeHtml(e.text)}</code> — ${escapeHtml(e.message)}</li>`
    })
    return `<ul class="graph-errors">${rows.join('')}</ul>`
  }

  /** L'anteprima è diventata più larga o più stretta: il disegno si rifà alla misura nuova. */
  resize(): void {
    const size = graphSize(this.block.clientWidth)
    if (Math.abs(size.width - this.width) < this.width * 0.06) return
    const moved = this.view !== this.base
    this.width = size.width
    this.height = size.height
    this.base = this.startWindow()
    if (!moved) this.view = this.base
    this.frameEl.style.maxWidth = `${this.width}px`
    this.hideTip()
    this.render()
  }

  private startWindow(): Window {
    return remember(windows, `${this.width}x${this.height}\n${this.key}`, () => {
      const { x0, x1, y0, y1 } = chooseWindow(this.spec, this.width, this.height)
      return { x0, x1, y0, y1 }
    })
  }

  private viewport(): Viewport {
    return { ...this.view, width: this.width, height: this.height }
  }

  private render(): void {
    const v = this.view
    const key = `${this.theme} ${this.palette.halo} ${this.width}x${this.height} ${v.x0} ${v.x1} ${v.y0} ${v.y1}\n${this.key}`
    const svg = remember(drawings, key, () => graphSvg(this.spec, this.viewport(), this.palette, { id: 'graph', title: graphTitle(this.spec) }))
    // Il disegno è fatto da Glifo: i testi sono già passati da escapeXml. Gli id (il ritaglio) diversi per ogni grafico.
    this.canvas.innerHTML = svg.replaceAll('graph-clip', `${this.id}-clip`)
    const moved = this.view !== this.base
    this.reset.hidden = !moved
    this.block.classList.toggle('is-moved', moved)
  }

  private setView(view: Window): void {
    this.view = view
    if (view === this.base) views.delete(this.key)
    else {
      if (views.size >= MAX_CACHE) views.delete(views.keys().next().value!)
      views.set(this.key, view)
    }
    this.hideTip()
    if (!this.frame) {
      this.frame = requestAnimationFrame(() => {
        this.frame = 0
        this.render()
      })
    }
  }

  /** Ingrandisce (factor < 1) o rimpicciolisce attorno a un punto (in pixel del disegno), di solito il centro. */
  private zoom(factor: number, at?: { x: number; y: number }): void {
    const v = this.view
    const px = at ? at.x / this.width : 0.5
    const py = at ? at.y / this.height : 0.5
    const cx = v.x0 + (v.x1 - v.x0) * px
    const cy = v.y1 - (v.y1 - v.y0) * py
    const w = (v.x1 - v.x0) * factor
    const h = (v.y1 - v.y0) * factor
    if (w < 1e-9 || w > 1e9 || h < 1e-9 || h > 1e9) return
    this.setView({ x0: cx - w * px, x1: cx + w * (1 - px), y0: cy - h * (1 - py), y1: cy + h * py })
  }

  /** La posizione del puntatore in pixel del disegno (che sullo schermo può essere più piccolo). */
  private local(ev: { clientX: number; clientY: number }): { x: number; y: number } {
    const r = this.canvas.getBoundingClientRect()
    return { x: ((ev.clientX - r.left) / (r.width || 1)) * this.width, y: ((ev.clientY - r.top) / (r.height || 1)) * this.height }
  }

  private onDown(ev: PointerEvent): void {
    if (ev.pointerType === 'touch') {
      this.touches.set(ev.pointerId, this.local(ev))
      if (this.touches.size === 2) {
        const [a, b] = [...this.touches.values()]
        this.pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y) || 1, center: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, view: this.view }
        this.canvas.setPointerCapture(ev.pointerId)
      }
      return
    }
    if (ev.button !== 0) return
    this.drag = { ...this.local(ev), view: this.view }
    this.canvas.setPointerCapture(ev.pointerId)
    this.canvas.classList.add('is-dragging')
  }

  private onMove(ev: PointerEvent): void {
    const p = this.local(ev)
    if (ev.pointerType === 'touch') {
      if (!this.touches.has(ev.pointerId)) return
      this.touches.set(ev.pointerId, p)
      if (this.pinch && this.touches.size === 2) {
        const [a, b] = [...this.touches.values()]
        const distance = Math.hypot(a.x - b.x, a.y - b.y) || 1
        const center = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
        const start = this.pinch
        const factor = start.distance / distance
        const v = start.view
        const w = (v.x1 - v.x0) * factor
        const h = (v.y1 - v.y0) * factor
        // Il punto sotto le dita all'inizio resta sotto le dita.
        const fx = start.center.x / this.width
        const fy = start.center.y / this.height
        const gx = v.x0 + (v.x1 - v.x0) * fx
        const gy = v.y1 - (v.y1 - v.y0) * fy
        const x0 = gx - w * (center.x / this.width)
        const y1 = gy + h * (center.y / this.height)
        this.setView({ x0, x1: x0 + w, y0: y1 - h, y1 })
      }
      return
    }
    if (this.drag) {
      const v = this.drag.view
      const dx = ((p.x - this.drag.x) / this.width) * (v.x1 - v.x0)
      const dy = ((p.y - this.drag.y) / this.height) * (v.y1 - v.y0)
      this.setView({ x0: v.x0 - dx, x1: v.x1 - dx, y0: v.y0 + dy, y1: v.y1 + dy })
      return
    }
    this.trace(p)
  }

  private onUp(ev: PointerEvent): void {
    if (ev.pointerType === 'touch') {
      this.touches.delete(ev.pointerId)
      if (this.touches.size < 2) this.pinch = null
      return
    }
    this.drag = null
    this.canvas.classList.remove('is-dragging')
  }

  private onWheel(ev: WheelEvent): void {
    // Con Ctrl (o pizzicando il touchpad) si ingrandisce il grafico; la rotellina da sola scorre la pagina.
    if (!ev.ctrlKey) return
    ev.preventDefault()
    this.zoom(Math.exp(Math.max(-1, Math.min(1, ev.deltaY * 0.01))), this.local(ev))
  }

  /** Il punto della curva più vicino al puntatore, con le sue coordinate. */
  private trace(p: { x: number; y: number }): void {
    const v = this.view
    const x = v.x0 + (p.x / this.width) * (v.x1 - v.x0)
    const ky = this.height / (v.y1 - v.y0)
    let best: { sx: number; sy: number; x: number; y: number; color: string } | null = null
    let bestDistance = 22
    this.spec.items.forEach((item, i) => {
      if (item.kind === 'function') {
        const y = item.f(x)
        if (!Number.isFinite(y)) return
        const sy = (v.y1 - y) * ky
        const d = Math.abs(sy - p.y)
        if (d < bestDistance) {
          bestDistance = d
          best = { sx: p.x, sy, x, y, color: this.colors[i] }
        }
      } else if (item.kind === 'point') {
        const sx = ((item.x - v.x0) / (v.x1 - v.x0)) * this.width
        const sy = (v.y1 - item.y) * ky
        const d = Math.hypot(sx - p.x, sy - p.y)
        if (d < Math.min(bestDistance, 14)) {
          bestDistance = d
          best = { sx, sy, x: item.x, y: item.y, color: this.colors[i] }
        }
      }
    })
    const found = best as { sx: number; sy: number; x: number; y: number; color: string } | null
    if (!found || found.sy < 0 || found.sy > this.height) {
      this.hideTip()
      return
    }
    const step = (v.x1 - v.x0) / this.width
    const r = this.canvas.getBoundingClientRect()
    const scale = (r.width || this.width) / this.width
    const left = found.sx * scale
    const top = found.sy * scale
    this.dot.hidden = false
    this.dot.style.cssText = `left:${left}px;top:${top}px;--graph-color:${found.color}`
    this.tip.hidden = false
    this.tip.textContent = `(${coord(found.x, step)}; ${coord(found.y, step * (v.y1 - v.y0) / (v.x1 - v.x0))})`
    const right = left > (r.width || this.width) - 140
    this.tip.style.cssText = `left:${right ? left - 10 : left + 10}px;top:${top < 34 ? top + 12 : top - 34}px;${right ? 'transform:translateX(-100%)' : ''}`
  }

  private hideTip(): void {
    this.tip.hidden = true
    this.dot.hidden = true
  }
}

/** I grafici disegnati, per rifarli quando cambia la larghezza dell'anteprima. */
const drawnViews = new Map<HTMLElement, GraphView>()
let resizer: ResizeObserver | null = null

/** Disegna i grafici dell'anteprima ancora da disegnare. */
export function hydrateGraphs(root: HTMLElement, look: GraphLook): void {
  // Quelli di prima che non sono più nella pagina non si seguono più.
  for (const block of drawnViews.keys()) {
    if (block.isConnected) continue
    resizer?.unobserve(block)
    drawnViews.delete(block)
  }
  if (!resizer && typeof ResizeObserver !== 'undefined') {
    resizer = new ResizeObserver((entries) => {
      for (const entry of entries) drawnViews.get(entry.target as HTMLElement)?.resize()
    })
  }
  for (const block of root.querySelectorAll<HTMLElement>('.graph-block:not([data-drawn])')) {
    block.dataset.drawn = ''
    try {
      drawnViews.set(block, new GraphView(block, look))
      resizer?.observe(block)
    } catch {
      block.innerHTML = '<p class="graph-errors">Il grafico non si riesce a disegnare.</p>'
    }
  }
}
