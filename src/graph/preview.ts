/**
 * I grafici nell'anteprima. Il Markdown lascia un segnaposto con il testo del blocco e le
 * definizioni della nota che usa (vedi src/render/markdown.ts); qui diventa il disegno, con la
 * legenda e gli errori riga per riga. Il grafico si sposta trascinandolo, si ingrandisce con i
 * pulsanti (o con Ctrl + rotellina, o con due dita) e, passandoci sopra, dice le coordinate.
 *
 * Sotto il grafico, uno slider per ogni numero che usa (a = 2): trascinandolo il grafico cambia
 * subito, il valore si può anche scrivere (1,5, 1/3, \pi/2; fuori dallo slider, lo slider si
 * allarga), ▶ lo muove da solo, la freccia torna al valore scritto. La nota non cambia: il file .md
 * e la stampa usano i valori scritti. A un nome che manca (k non è definita) il pulsante
 * «Aggiungi lo slider per k» aggiunge k = 1 al blocco (lo fa src/ui/preview.ts).
 *
 * I grafici 3D (vedi view3d.ts) si girano trascinandoli, con il mouse o con un dito; + e − (o
 * Ctrl e la rotellina, o due dita) li avvicinano e li allontanano. Mentre si girano si disegnano con
 * meno quadretti, per seguire il mouse.
 *
 * Il pulsante «Scarica» dà il grafico come si vede adesso (con lo zoom, la rotazione e gli slider)
 * come figura chiara su bianco: PNG, SVG o copiato come immagine, con il titolo e i nomi degli assi
 * scritti nel blocco (`titolo: …`, `asse x: …`), che «Titolo e nomi degli assi…» aiuta a scrivere.
 */
import { formatNumber } from '../math/format'
import { nameLatex } from '../math/latex'
import { escapeHtml, renderTex } from '../render/katex'
import { svgToPng } from '../schema/image'
import type { Theme } from '../schema/model'
import { downloadBlob, downloadText, fileNameFor } from '../store/files'
import { dialogShell } from '../ui/dialogs'
import { h } from '../ui/dom'
import { openMenu } from '../ui/menu'
import { moveButtonsHtml } from '../ui/moveButtons'
import { toast } from '../ui/toast'
import { FIGURE_PALETTE, graphFigure } from './file'
import { labelHtml, labelPlain } from './labels'
import { chooseWindow, type Viewport } from './plot'
import { chooseBox, type Box } from './space'
import { parseGraph, typedSliderValue, widenSlider, type GraphError, type GraphSlider, type GraphSpec, type Range } from './spec'
import type { ChartData } from '../spreadsheet/chart'
import { readChart } from './tableGraph'
import { graphSvg, graphTitle, itemColors, PALETTES, pointName, type Palette } from './svg'
import { buildScene, DEFAULT_CAMERA, MAX_ELEVATION, sceneSvg, type Camera, type Quality, type Scene } from './view3d'

export interface GraphLook {
  theme: Theme
  /** Lo sfondo dell'anteprima, dietro i numeri degli assi. */
  surface: string
  /** La nota si può cambiare (non una nota condivisa): c'è «Titolo e nomi degli assi…». */
  editable?: boolean
  /** La nota mostrata (il suo id): gli slider spostati restano suoi. */
  scope?: string
}

/** Il titolo e i nomi degli assi da scrivere nel blocco (vuoto: la riga si toglie). */
export interface GraphLabels {
  title: string
  x: string
  y: string
  z?: string
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
/** Da dove si guardano i grafici 3D girati a mano. */
const cameras = new Map<string, Camera>()
/** Le scatole dei grafici 3D, come le finestre di quelli nel piano. */
const boxes = new Map<string, Box>()
/** Quanto si gira il grafico 3D per ogni pixel trascinato (in radianti). */
const TURN = 0.0105
/** Dopo quanto (in millisecondi) uno slider fermo conta come fermo, per rifare il 3D con tutti i quadretti. */
const SETTLE = 300
let counter = 0

interface SliderState {
  value: number
  playing: boolean
  /** Mentre si muove da solo: dove è (senza arrotondare al passo) e in che verso va. */
  pos: number
  dir: 1 | -1
  /** Allargato per un valore scritto fuori (a = 15, con a da −10 a 10): da dove a dove va adesso. */
  wide?: { range: Range; step: number }
}
/** Gli slider spostati (o che si muovono da soli): restano mentre l'anteprima si ridisegna. */
const sliderStates = new Map<string, SliderState>()

/**
 * Le chiavi della nota `scope` (`${nota}\u0000${riga}\u0000…`) passano alla riga nuova: prima si
 * tolgono tutte quelle che cambiano, poi si rimettono, così due grafici che si scambiano di posto non si
 * pestano. Le chiavi delle altre note restano.
 */
export function remapLineKeys<T>(states: Map<string, T>, scope: string, map: (line: number) => number): void {
  const prefix = `${scope}\u0000`
  const moved: [string, T][] = []
  for (const [key, state] of states) {
    if (!key.startsWith(prefix)) continue
    const cut = key.indexOf('\u0000', prefix.length)
    const line = cut > prefix.length ? Number(key.slice(prefix.length, cut)) : NaN
    if (!Number.isInteger(line) || map(line) === line) continue
    states.delete(key)
    moved.push([`${prefix}${map(line)}${key.slice(cut)}`, state])
  }
  for (const [key, state] of moved) states.set(key, state)
}

/** La nota ha cambiato id (con l'account, o in un conflitto chi scrive resta sulla sua copia): gli slider la seguono. */
export function renameGraphScope(from: string, to: string): void {
  renameScopeKeys(sliderStates, from, to)
}

/** Le chiavi della nota `from` passano alla nota `to`. */
export function renameScopeKeys<T>(states: Map<string, T>, from: string, to: string): void {
  const prefix = `${from}\u0000`
  for (const [key, state] of [...states]) {
    if (!key.startsWith(prefix)) continue
    states.delete(key)
    states.set(`${to}\u0000${key.slice(prefix.length)}`, state)
  }
}

/**
 * Uno schema o un grafico si è spostato nella nota `scope` (src/render/blockMove.ts), anche con Annulla
 * o Ripeti: gli slider seguono i grafici.
 */
export function remapGraphLines(scope: string, map: (line: number) => number): void {
  remapLineKeys(sliderStates, scope, map)
}
/** Quanto ci mette uno slider che si muove da solo ad andare da un estremo all'altro (secondi). */
const SWEEP = 5
/** Si sta stampando: i grafici con i valori scritti nella nota. */
let printing = false

function specFor(key: string, source: string, defs: string[], chart: ChartData | null): GraphSpec {
  return remember(specs, key, () => parseGraph(source, defs, undefined, chart))
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

/** Un punto del piano di Gauss come numero complesso: 1,5 + 2i, −i, 3. */
function complexCoord(x: number, y: number, xStep: number, yStep: number): string {
  const re = coord(x, xStep)
  const im = coord(Math.abs(y), yStep)
  if (im === '0') return re
  const i = im === '1' ? 'i' : `${im}i`
  if (re === '0' || re === '−0') return y < 0 ? `−${i}` : i
  return `${re} ${y < 0 ? '−' : '+'} ${i}`
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
  play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
  pause: '<path d="M9 6v12M15 6v12"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
}

function icon(paths: string): string {
  return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`
}

function toolButton(label: string, paths: string, action: string, extra = ''): string {
  return `<button type="button" class="icon-button graph-tool${extra}" data-action="${action}" title="${label}" aria-label="${label}">${icon(paths)}</button>`
}

/** Il valore di uno slider con la virgola, con le cifre del suo passo (o di più, per un valore scritto con più cifre). */
function sliderText(v: number, step: number): string {
  const base = step >= 1 ? 0 : Math.round(-Math.log10(step))
  let decimals = base
  while (decimals < base + 4 && Math.abs(Number(v.toFixed(decimals)) - v) > 1e-9 * Math.max(1, Math.abs(v))) decimals++
  let text = v.toFixed(decimals)
  if (text.includes('.')) text = text.replace(/0+$/, '').replace(/\.$/, '')
  if (text === '-0') text = '0'
  return text.replace('.', ',').replace('-', '−')
}

/** Il valore più vicino tra quelli dello slider (gli estremi, più un passo alla volta). */
function snap(v: number, [lo, hi]: Range, step: number): number {
  const k = Math.round((v - lo) / step)
  return Math.min(hi, Math.max(lo, Number((lo + k * step).toPrecision(12))))
}

/** Un estremo dello slider: come è scritto nel blocco (2\pi) o, se lo slider si è allargato, il numero. */
function endTex(slider: GraphSlider, range: Range, i: number): string {
  if (range[i] === slider.range[i]) return slider.ends[i]
  return formatNumber(range[i], { comma: true, decimal: true, digits: 6 })?.tex ?? String(range[i])
}

/**
 * La casella del valore: larga quanto il numero più lungo dello slider (−2,99 da −3 a 3), così
 * mentre lo si trascina la barra non si sposta; di più se ci si scrive un numero più lungo.
 */
function fitField(row: SliderRow): void {
  const width = `calc(${Math.max(row.chars, row.field.value.length) + 1}ch + 14px)`
  if (row.field.style.width !== width) row.field.style.width = width
}

/** «Aggiungi lo slider per k», «Aggiungi gli slider per a, b e c». */
function addLabel(add: NonNullable<GraphError['add']>): string {
  const names = add.map((a) => pointName(a.name))
  if (names.length === 1) return `Aggiungi lo slider per ${names[0]}`
  return `Aggiungi gli slider per ${names.slice(0, -1).join(', ')} e ${names[names.length - 1]}`
}

/** Il quadratino della legenda: una linea per le curve, un pallino per i punti, un riquadro per aree e superfici. */
function swatchClass(item: GraphSpec['items'][number]): string {
  const kind = item.kind
  if (item.dashed) return 'graph-swatch is-dashed'
  if (kind === 'point' || kind === 'point3' || kind === 'points' || kind === 'mark' || (kind === 'complex' && !item.arrows)) return 'graph-swatch is-point'
  if (kind === 'polygon') return 'graph-swatch is-region'
  if (kind === 'area' || kind === 'bars' || kind === 'gap') return 'graph-swatch is-area'
  if (kind === 'region') return 'graph-swatch is-region'
  if (kind === 'surface' || kind === 'implicit3' || kind === 'patch' || kind === 'solid') return 'graph-swatch is-surface'
  if (kind === 'field' || kind === 'field3' || kind === 'vector' || (kind === 'complex' && item.arrows)) return 'graph-swatch is-arrow'
  return 'graph-swatch'
}

function texHtml(tex: string): string {
  const { html, error } = renderTex(tex)
  return error ? escapeHtml(tex) : html
}

/** La parte da mostrare scritta nel blocco (x \in [a, b]), per vedere se è cambiata. */
function explicitWindow(spec: GraphSpec): string {
  return JSON.stringify([spec.x, spec.y, spec.z])
}

/** La misura delle figure scaricate: come le immagini dei file .md. */
const FIGURE_SIZE = { width: 640, height: 400 }

/**
 * La parte del piano da mostrare in un disegno largo `W` e alto `H` che contiene tutta quella vista
 * (`view`, in un disegno `w` × `h`), con lo stesso centro e la stessa forma (le unità dei due assi
 * restano nello stesso rapporto).
 */
export function containing(view: Window, w: number, h: number, W: number, H: number): Window {
  const ux = (view.x1 - view.x0) / w
  const uy = (view.y1 - view.y0) / h
  const s = Math.max((view.x1 - view.x0) / W, (view.y1 - view.y0) / ((uy / ux) * H))
  const cx = (view.x0 + view.x1) / 2
  const cy = (view.y0 + view.y1) / 2
  const halfX = (s * W) / 2
  const halfY = ((uy / ux) * s * H) / 2
  return { x0: cx - halfX, x1: cx + halfX, y0: cy - halfY, y1: cy + halfY }
}

function sameCamera(a: Camera, b: Camera): boolean {
  return a.az === b.az && a.el === b.el && a.zoom === b.zoom
}

interface SliderRow {
  slider: GraphSlider
  state: SliderState
  /** Dove si ricorda lo stato (vedi sliderStates). */
  key: string
  input: HTMLInputElement
  /** La casella dove si scrive il valore. */
  field: HTMLInputElement
  ends: HTMLElement[]
  play: HTMLButtonElement
  back: HTMLButtonElement
  /** Gli estremi e il passo mostrati, per rifarli solo quando cambiano. */
  shown: string
  /** Le cifre del numero più lungo dello slider (vedi fitField). */
  chars: number
  /** Mentre si scrive nella casella: il valore di prima (Esc lo rimette). */
  before: number | null
}

/** Da dove a dove va adesso uno slider (allargato, se si è scritto un valore fuori) e di quanto si muove. */
function travel(row: SliderRow): { range: Range; step: number } {
  return row.state.wide ?? row.slider
}

class GraphView {
  /** Il blocco come è scritto, con i valori scritti nella nota. */
  private readonly written: GraphSpec
  /** Quello disegnato adesso: con i valori degli slider. */
  private spec: GraphSpec
  /** I valori degli slider con cui è stato fatto `spec` ('' se sono quelli scritti). */
  private specValues = ''
  private readonly source: string
  private readonly defs: string[]
  /** I numeri della tabella sopra, per la riga `dati:`. */
  private readonly chart: ChartData | null
  private readonly key: string
  private readonly palette: Palette
  private readonly theme: Theme
  private colors: string[]
  private readonly id = `graph-${++counter}`
  private base: Window
  private view: Window
  /** La parte da mostrare scritta nel blocco, per la quale è stata scelta `base` (può usare uno slider). */
  private explicit: string
  private width: number
  private height: number
  private readonly frameEl: HTMLElement
  private readonly canvas: HTMLElement
  private readonly tip: HTMLElement
  private readonly dot: HTMLElement
  private readonly reset: HTMLButtonElement
  private readonly slidersEl: HTMLElement | null
  private readonly rows: SliderRow[] = []
  private readonly notes: HTMLElement
  private notesHtml = ''
  private frame = 0
  private animation = 0
  private lastTime = 0
  private drag: { x: number; y: number; view: Window } | null = null
  private readonly touches = new Map<number, { x: number; y: number }>()
  private pinch: { distance: number; center: { x: number; y: number }; view: Window; camera: Camera } | null = null
  /** Un grafico 3D: si gira invece di spostarsi. */
  private readonly space: boolean
  private box: Box | null = null
  private camera: Camera = DEFAULT_CAMERA
  /** Mentre si gira trascinando: da dove è partito il puntatore, e da dove si guardava. */
  private turn: { x: number; y: number; camera: Camera } | null = null
  /** I pezzi del grafico 3D già calcolati (con i valori degli slider e la qualità di adesso). */
  private scenes = new Map<string, Scene>()
  /** Quando si è mosso l'ultima volta uno slider: nel 3D, finché si muove, meno quadretti. */
  private slidAt = -Infinity
  private fineTimer = 0

  private readonly editable: boolean
  /** La nota del grafico: gli slider di una nota non passano a un'altra. */
  private readonly scope: string

  constructor(
    private readonly block: HTMLElement,
    look: GraphLook,
  ) {
    this.editable = !!look.editable
    this.scope = look.scope ?? ''
    this.source = block.dataset.graph ?? ''
    this.defs = readDefs(block)
    this.chart = readChart(block)
    this.key = `${this.source}\n\u0000${this.defs.join('\n')}${this.chart ? `\n\u0000${block.dataset.table}` : ''}`
    this.written = specFor(this.key, this.source, this.defs, this.chart)
    this.spec = this.written
    this.explicit = explicitWindow(this.written)
    this.theme = look.theme
    this.palette = { ...PALETTES[look.theme], halo: look.surface || PALETTES[look.theme].halo }
    this.colors = itemColors(this.spec.items, this.palette)
    const size = graphSize(block.clientWidth)
    this.width = size.width
    this.height = size.height
    this.space = this.written.dim === 3
    if (this.space) {
      this.box = this.startBox()
      this.camera = cameras.get(this.key) ?? DEFAULT_CAMERA
      block.classList.add('is-space')
    }
    this.base = this.space ? { x0: -1, x1: 1, y0: -1, y1: 1 } : this.startWindow()
    this.view = views.get(this.key) ?? this.base

    // I pulsanti stanno sopra il disegno (e si vedono passandoci sopra); sui telefoni sotto, sempre.
    const title = this.written.title ? `<div class="graph-title" style="max-width:${this.width}px">${labelHtml(this.written.title)}</div>` : ''
    block.innerHTML = `${title}<div class="graph-stage" style="max-width:${this.width}px"><div class="graph-frame"><div class="graph-canvas"></div><div class="graph-dot" hidden></div><div class="graph-tip" hidden></div></div><div class="graph-tools">${toolButton('Ingrandisci', ICON.plus, 'in')}${toolButton('Rimpicciolisci', ICON.minus, 'out')}${toolButton('Torna alla vista di partenza', ICON.reset, 'reset')}${toolButton('Scarica il grafico come immagine', ICON.download, 'image')}${this.editable && block.dataset.move !== undefined ? moveButtonsHtml('grafico', block.dataset.move, block.dataset.moveIn === 'voce') : ''}</div></div>${this.slidersHtml()}<div class="graph-notes"></div>`
    const frame = block.querySelector<HTMLElement>('.graph-stage')!
    this.frameEl = frame
    this.canvas = block.querySelector<HTMLElement>('.graph-canvas')!
    this.tip = block.querySelector<HTMLElement>('.graph-tip')!
    this.dot = block.querySelector<HTMLElement>('.graph-dot')!
    this.reset = block.querySelector<HTMLButtonElement>('[data-action="reset"]')!
    this.notes = block.querySelector<HTMLElement>('.graph-notes')!
    this.slidersEl = block.querySelector<HTMLElement>('.graph-sliders')
    this.setUpSliders()
    this.render()

    frame.addEventListener('click', (ev) => {
      const action = (ev.target as HTMLElement).closest<HTMLElement>('[data-action]')?.dataset.action
      if (action === 'in') this.zoom(0.5)
      else if (action === 'out') this.zoom(2)
      else if (action === 'reset') {
        if (this.space) this.setCamera(DEFAULT_CAMERA)
        else this.setView(this.base)
      } else if (action === 'image') this.openImageMenu((ev.target as HTMLElement).closest<HTMLElement>('[data-action]')!, ev.detail === 0)
    })
    // Il doppio clic sui pulsanti non deve portare all'editor (lo fa il doppio clic sul grafico).
    frame.querySelector('.graph-tools')!.addEventListener('dblclick', (ev) => ev.stopPropagation())
    this.canvas.addEventListener('pointerdown', (ev) => this.onDown(ev))
    this.canvas.addEventListener('pointermove', (ev) => this.onMove(ev))
    this.canvas.addEventListener('pointerup', (ev) => this.onUp(ev))
    this.canvas.addEventListener('pointercancel', (ev) => this.onUp(ev))
    this.canvas.addEventListener('pointerleave', () => this.hideTip())
    this.canvas.addEventListener('wheel', (ev) => this.onWheel(ev), { passive: false })
    if (this.rows.some((r) => r.state.playing)) this.animate()
  }

  private slidersHtml(): string {
    if (!this.written.sliders.length) return ''
    const rows = this.written.sliders.map((s, i) => {
      const name = escapeHtml(pointName(s.name))
      return (
        `<div class="graph-slider" data-index="${i}">` +
        toolButton(`Muovi ${name} da solo`, ICON.play, 'play', ' graph-play') +
        `<label class="graph-slider-label">${texHtml(nameLatex(s.name))} = <input type="text" class="graph-slider-value" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done" title="Scrivi il valore di ${name}" aria-label="Scrivi il valore di ${name}"></label>` +
        '<span class="graph-slider-end"></span>' +
        `<input type="range" class="graph-slider-input" aria-label="Valore di ${name}">` +
        '<span class="graph-slider-end"></span>' +
        toolButton(`Torna al valore scritto: ${name} = ${escapeHtml(sliderText(s.value, s.step))}`, ICON.reset, 'written', ' graph-slider-back') +
        '</div>'
      )
    })
    return `<div class="graph-sliders" style="max-width:${this.width}px">${rows.join('')}</div>`
  }

  private setUpSliders(): void {
    const el = this.slidersEl
    if (!el) return
    const line = this.block.dataset.line ?? ''
    this.written.sliders.forEach((slider, i) => {
      const row = el.querySelector<HTMLElement>(`.graph-slider[data-index="${i}"]`)!
      const key = `${this.scope}\u0000${line}\u0000${slider.name}\u0000${slider.value}\u0000${slider.range.join(' ')}\u0000${slider.step}`
      const state = sliderStates.get(key) ?? { value: slider.value, playing: false, pos: slider.value, dir: 1 }
      this.rows.push({
        slider,
        state,
        key,
        input: row.querySelector<HTMLInputElement>('.graph-slider-input')!,
        field: row.querySelector<HTMLInputElement>('.graph-slider-value')!,
        ends: [...row.querySelectorAll<HTMLElement>('.graph-slider-end')],
        play: row.querySelector<HTMLButtonElement>('[data-action="play"]')!,
        back: row.querySelector<HTMLButtonElement>('[data-action="written"]')!,
        shown: '',
        chars: 3,
        before: null,
      })
      this.showSlider(this.rows[i])
    })
    const rowOf = (ev: Event) => {
      const index = (ev.target as HTMLElement).closest<HTMLElement>('.graph-slider')?.dataset.index
      return index === undefined ? null : this.rows[Number(index)]
    }
    el.addEventListener('input', (ev) => {
      const row = rowOf(ev)
      if (!row) return
      if (ev.target === row.field) {
        // Mentre si scrive il grafico segue già; Invio (o uscire dalla casella) allarga lo slider, se serve.
        fitField(row)
        row.field.removeAttribute('aria-invalid')
        const value = typedSliderValue(row.field.value, row.slider)
        if (value !== null && value !== row.state.value) this.setSlider(row, value)
        return
      }
      // Trascinato a mano: smette di muoversi da solo.
      row.state.playing = false
      const { range, step } = travel(row)
      this.setSlider(row, snap(row.input.valueAsNumber, range, step))
    })
    el.addEventListener('focusin', (ev) => {
      const row = rowOf(ev)
      if (!row || ev.target !== row.field || row.before !== null) return
      row.before = row.state.value
      if (row.state.playing) {
        row.state.playing = false
        this.setSlider(row, row.state.value)
      }
      // Scrivendo si sostituisce il numero di prima.
      row.field.select()
    })
    el.addEventListener('focusout', (ev) => {
      const row = rowOf(ev)
      if (row && ev.target === row.field && row.before !== null) this.useField(row, true)
    })
    el.addEventListener('keydown', (ev) => {
      const row = rowOf(ev)
      if (!row || ev.target !== row.field || row.before === null) return
      if (ev.key === 'Enter') {
        ev.preventDefault()
        if (this.useField(row, false)) row.field.blur()
      } else if (ev.key === 'Escape') {
        ev.preventDefault()
        const before = row.before
        row.before = null
        row.field.removeAttribute('aria-invalid')
        this.setSlider(row, before)
        row.field.blur()
      }
    })
    el.addEventListener('click', (ev) => {
      const row = rowOf(ev)
      const action = (ev.target as HTMLElement).closest<HTMLElement>('[data-action]')?.dataset.action
      if (!row || !action) return
      if (action === 'written') {
        row.state.playing = false
        row.state.wide = undefined
        this.setSlider(row, row.slider.value)
      } else if (action === 'play') {
        const { state } = row
        state.playing = !state.playing
        if (state.playing) {
          const [lo, hi] = travel(row).range
          state.pos = Math.min(hi, Math.max(lo, state.value))
          if (state.pos >= hi) state.dir = -1
          else if (state.pos <= lo) state.dir = 1
          this.animate()
        }
        this.setSlider(row, state.value)
      }
    })
    // Il doppio clic sugli slider non deve portare all'editor.
    el.addEventListener('dblclick', (ev) => ev.stopPropagation())
  }

  /** Mostra lo slider com'è adesso: la posizione, il valore (quello scritto, mentre si stampa), i pulsanti. */
  private showSlider(row: SliderRow): void {
    const { slider, state, input, field, play, back } = row
    const { range, step } = travel(row)
    const shown = `${range[0]} ${range[1]} ${step}`
    if (shown !== row.shown) {
      row.shown = shown
      // Prima gli estremi, poi il valore: se no il browser lo terrebbe dentro quelli di prima.
      input.min = String(range[0])
      input.max = String(range[1])
      input.step = String(step)
      row.ends.forEach((end, i) => (end.innerHTML = texHtml(endTex(slider, range, i))))
      row.chars = Math.max(3, ...[range[0], range[1], range[0] + step, range[1] - step].map((v) => sliderText(v, step).length))
    }
    const value = printing ? slider.value : state.value
    const text = sliderText(value, step)
    input.value = String(value)
    input.setAttribute('aria-valuetext', text)
    // Mentre si scrive nella casella, resta quello che si sta scrivendo.
    if (row.before === null || printing) {
      field.value = text
      fitField(row)
    }
    // Nascosto ma al suo posto (vedi app.css): la barra non salta quando compare.
    const unchanged = state.value === slider.value && !state.wide
    back.disabled = unchanged
    back.classList.toggle('is-idle', unchanged)
    const pressed = String(state.playing)
    if (play.getAttribute('aria-pressed') === pressed) return
    const name = pointName(slider.name)
    const label = state.playing ? `Ferma ${name}` : `Muovi ${name} da solo`
    play.title = label
    play.setAttribute('aria-label', label)
    play.setAttribute('aria-pressed', pressed)
    play.innerHTML = icon(state.playing ? ICON.pause : ICON.play)
  }

  private setSlider(row: SliderRow, value: number): void {
    const { state } = row
    state.value = value
    if (!state.playing) state.pos = value
    if (value === row.slider.value && !state.playing && !state.wide) sliderStates.delete(row.key)
    else {
      if (sliderStates.size >= MAX_CACHE) sliderStates.delete(sliderStates.keys().next().value!)
      sliderStates.set(row.key, state)
    }
    this.showSlider(row)
    this.hideTip()
    if (this.space) {
      // Finito di muoverlo, il grafico 3D si rifà con tutti i quadretti.
      this.slidAt = performance.now()
      clearTimeout(this.fineTimer)
      this.fineTimer = window.setTimeout(() => this.schedule(), SETTLE + 20)
    }
    this.schedule()
  }

  /**
   * Usa il valore scritto nella casella (Invio, o uscendo dalla casella); se è fuori dallo slider,
   * lo slider si allarga fino a lì. Se non è un numero: con Invio la casella diventa rossa (false),
   * uscendo torna il valore di prima.
   */
  private useField(row: SliderRow, leaving: boolean): boolean {
    const typed = typedSliderValue(row.field.value, row.slider)
    if (typed === null && !leaving) {
      row.field.setAttribute('aria-invalid', 'true')
      return false
    }
    row.before = null
    row.field.removeAttribute('aria-invalid')
    const value = typed ?? row.state.value
    const { range, step } = travel(row)
    if (value < range[0] || value > range[1]) row.state.wide = widenSlider(range, step, value, row.slider.integer)
    this.setSlider(row, value)
    return true
  }

  /** Gli slider che si muovono da soli: avanti e indietro tra gli estremi, finché non si fermano. */
  private animate(): void {
    if (this.animation) return
    this.lastTime = 0
    const tick = (now: number) => {
      this.animation = 0
      // L'anteprima è stata ridisegnata: continua il grafico nuovo (lo stato è lo stesso).
      if (!this.block.isConnected) return
      const dt = this.lastTime ? Math.min(0.1, (now - this.lastTime) / 1000) : 0
      this.lastTime = now
      let moving = false
      for (const row of this.rows) {
        const { state } = row
        if (!state.playing) continue
        moving = true
        const { range, step } = travel(row)
        const [lo, hi] = range
        state.pos += (state.dir * (hi - lo) * dt) / SWEEP
        if (state.pos >= hi) {
          state.pos = hi
          state.dir = -1
        } else if (state.pos <= lo) {
          state.pos = lo
          state.dir = 1
        }
        const value = snap(state.pos, range, step)
        if (value !== state.value) this.setSlider(row, value)
      }
      if (moving) this.animation = requestAnimationFrame(tick)
    }
    this.animation = requestAnimationFrame(tick)
  }

  /** Il grafico con i valori degli slider (con quelli scritti, mentre si stampa). */
  private currentSpec(): GraphSpec {
    const values = new Map<string, number>()
    if (!printing) {
      for (const { slider, state } of this.rows) if (state.value !== slider.value) values.set(slider.name, state.value)
    }
    const signature = [...values].join(';')
    if (signature === this.specValues) return this.spec
    this.specValues = signature
    try {
      this.spec = values.size ? parseGraph(this.source, this.defs, values, this.chart) : this.written
    } catch {
      this.spec = this.written
    }
    this.colors = itemColors(this.spec.items, this.palette)
    // Se la parte da mostrare scritta nel blocco usa uno slider (x \in [0, L]), segue.
    const explicit = explicitWindow(this.spec)
    if (explicit !== this.explicit) {
      this.explicit = explicit
      if (this.space) this.box = this.startBox()
      else {
        const moved = this.view !== this.base
        this.base = this.startWindow()
        if (!moved) this.view = this.base
      }
    }
    return this.spec
  }

  private legendHtml(): string {
    const rows = this.spec.items
      .map((item, i) => ({ item, color: this.colors[i] }))
      .filter(({ item }) => (item.kind !== 'point' || item.name) && item.label !== '')
      .map(({ item, color }) => {
        const { html, error } = renderTex(item.label)
        const label = error ? `<code>${escapeHtml(item.label)}</code>` : html
        const coords =
          item.kind === 'point'
            ? `(${coord(item.x, 1e-3)}; ${coord(item.y, 1e-3)})`
            : item.kind === 'point3'
              ? `(${coord(item.x, 1e-3)}; ${coord(item.y, 1e-3)}; ${coord(item.z, 1e-3)})`
              : item.kind === 'mark'
                ? item.coords
                : ''
        return `<li><span class="${swatchClass(item)}" style="--graph-color:${color}"></span>${label}${coords ? ` <span class="graph-coords">${escapeHtml(coords)}</span>` : ''}</li>`
      })
    if (!rows.length && !this.spec.errors.length) {
      return '<p class="graph-hint">Scrivi nel blocco una funzione, una per riga: per esempio <code>y = x^2</code> (o <code>z = x^2 + y^2</code> per una superficie)</p>'
    }
    return rows.length ? `<ul class="graph-legend">${rows.join('')}</ul>` : ''
  }

  private errorsHtml(): string {
    if (!this.spec.errors.length) return ''
    const first = Number(this.block.dataset.line)
    const rows = this.spec.errors.map((e) => {
      const where = Number.isFinite(first) ? `Riga ${first + e.line + 2}` : `Riga ${e.line + 1}`
      const add = e.add ? ` <button type="button" class="btn btn-small graph-add-slider" data-add="${escapeHtml(e.add.map((a) => a.line).join('\n'))}">${escapeHtml(addLabel(e.add))}</button>` : ''
      return `<li><strong>${where}</strong> <code>${escapeHtml(e.text)}</code> — ${escapeHtml(e.message)}${add}</li>`
    })
    return `<ul class="graph-errors">${rows.join('')}</ul>`
  }

  /** Il menu di «Scarica»: il grafico come immagine e, nella propria nota, il titolo e i nomi degli assi. */
  private openImageMenu(anchor: HTMLElement, fromKeyboard: boolean): void {
    openMenu(
      anchor,
      [
        { label: 'Immagine PNG', run: () => void this.exportImage('png') },
        { label: 'Immagine SVG', run: () => void this.exportImage('svg') },
        { label: 'Copia come immagine', run: () => void this.exportImage('copy') },
        ...(this.editable ? ['sep' as const, { label: 'Titolo e nomi degli assi…', run: () => this.editLabels() }] : []),
      ],
      'Scarica il grafico',
      fromKeyboard,
    )
  }

  /**
   * Il grafico come si vede adesso (con lo zoom, la rotazione e i valori degli slider), come figura
   * chiara su bianco, con il titolo e la legenda (vedi graphFigure).
   */
  figure(): string {
    const spec = this.currentSpec()
    const { width, height } = FIGURE_SIZE
    const title = graphTitle(spec)
    if (this.space) return graphFigure(spec, sceneSvg(this.sceneFor(spec, 'fine'), spec, this.camera, FIGURE_PALETTE, { width, height, title }), width, height)
    // Senza zoom né spostamenti, la parte scelta da Glifo per quella misura; se no quella che si vede.
    const window = this.view === this.base ? chooseWindow(spec, width, height) : containing(this.view, this.width, this.height, width, height)
    return graphFigure(spec, graphSvg(spec, { ...window, width, height }, FIGURE_PALETTE, { id: 'figura', title }), width, height)
  }

  /** PNG o SVG da scaricare, o PNG da incollare altrove (Word, Google Docs, le slide). */
  private async exportImage(kind: 'png' | 'svg' | 'copy'): Promise<void> {
    if (!this.spec.items.length) {
      toast('Il grafico è vuoto: non c\'è ancora niente da salvare come immagine.')
      return
    }
    const svg = this.figure()
    const name = (ext: string) => fileNameFor(this.written.title ? labelPlain(this.written.title) : 'grafico', ext)
    // Due volte più fitta (1280 pixel di larghezza): si legge anche ingrandita, su un foglio o su una slide.
    const scale = 2
    try {
      if (kind === 'svg') {
        if (await downloadText(name('.svg'), svg, 'image/svg+xml')) toast('Immagine SVG scaricata')
      } else if (kind === 'png') {
        downloadBlob(name('.png'), await svgToPng(svg, scale))
        toast('Immagine PNG scaricata')
      } else {
        if (typeof ClipboardItem === 'undefined' || !navigator.clipboard?.write) {
          toast('Questo browser non sa copiare le immagini: scaricala come PNG.', 'error')
          return
        }
        // Safari vuole l'immagine (anche solo promessa) subito, durante il clic.
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': svgToPng(svg, scale) })])
        toast('Immagine copiata: incollala dove vuoi (Word, Google Docs, le slide…)')
      }
    } catch {
      toast(
        kind === 'copy'
          ? 'L\'immagine non si è riuscita a copiare (il browser l\'ha impedito?): scaricala come PNG.'
          : 'L\'immagine non si è riuscita a fare su questo browser: prova con l\'altro formato.',
        'error',
      )
    }
  }

  /**
   * «Titolo e nomi degli assi…»: una finestra con il titolo e i nomi (quelli scritti nel blocco);
   * con «Fatto» le righe `titolo: …` e `asse x: …` vanno nel blocco (lo fa src/ui/preview.ts, che
   * riceve l'evento `graph-labels`).
   */
  private editLabels(): void {
    const field = (label: string, value: string, placeholder: string) => {
      const input = h('input', { class: 'prompt-input', attrs: { type: 'text', value, placeholder, autocomplete: 'off', spellcheck: 'false' } })
      return { input, row: h('label', { class: 'prompt-label' }, h('span', {}, label), input) }
    }
    const axes = this.written.axes ?? {}
    const title = field('Titolo', this.written.title ?? '', 'per esempio: La caduta di un grave')
    const x = field('Nome dell\'asse x', axes.x ?? '', 'per esempio: tempo $t$ (s)')
    const y = field('Nome dell\'asse y', axes.y ?? '', 'per esempio: spazio $s$ (m)')
    const z = this.space ? field('Nome dell\'asse z', axes.z ?? '', 'per esempio: altezza $h$ (m)') : null
    const form = h(
      'form',
      {
        class: 'prompt-form graph-labels-form',
        on: {
          submit: (ev) => {
            ev.preventDefault()
            const one = (input: HTMLInputElement) => input.value.replace(/\s+/g, ' ').trim()
            const labels: GraphLabels = { title: one(title.input), x: one(x.input), y: one(y.input), ...(z && { z: one(z.input) }) }
            this.block.dispatchEvent(new CustomEvent<GraphLabels>('graph-labels', { bubbles: true, detail: labels }))
            dialog.close()
          },
        },
      },
      title.row,
      x.row,
      y.row,
      z?.row ?? null,
      h('p', { class: 'field-help' }, 'Le formule tra $, come nella nota. Si vedono nel grafico e nelle immagini; un campo vuoto toglie il suo nome.'),
      h(
        'div',
        { class: 'dialog-actions' },
        h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => dialog.close() } }, 'Annulla'),
        h('button', { class: 'btn btn-primary', attrs: { type: 'submit' } }, 'Fatto'),
      ),
    )
    const dialog = dialogShell('Titolo e nomi degli assi', [form], 'dialog-prompt')
    dialog.showModal()
    title.input.focus()
  }

  /** L'anteprima è diventata più larga o più stretta: il disegno si rifà alla misura nuova. */
  resize(): void {
    const size = graphSize(this.block.clientWidth)
    if (Math.abs(size.width - this.width) < this.width * 0.06) return
    const moved = this.view !== this.base
    this.width = size.width
    this.height = size.height
    if (!this.space) {
      this.base = this.startWindow()
      if (!moved) this.view = this.base
    }
    this.frameEl.style.maxWidth = `${this.width}px`
    const title = this.block.querySelector<HTMLElement>('.graph-title')
    if (title) title.style.maxWidth = `${this.width}px`
    if (this.slidersEl) this.slidersEl.style.maxWidth = `${this.width}px`
    this.hideTip()
    this.render()
  }

  /** Ridisegna subito (per la stampa, con i valori scritti, e dopo). */
  redraw(): void {
    if (this.frame) cancelAnimationFrame(this.frame)
    for (const row of this.rows) this.showSlider(row)
    this.render()
  }

  private startWindow(): Window {
    // Con gli slider spostati la parte da mostrare resta quella di partenza, se il blocco non la lega a uno slider.
    const spec = explicitWindow(this.spec) === explicitWindow(this.written) ? this.written : this.spec
    const make = () => {
      const { x0, x1, y0, y1 } = chooseWindow(spec, this.width, this.height)
      return { x0, x1, y0, y1 }
    }
    return spec === this.written ? remember(windows, `${this.width}x${this.height}\n${this.key}`, make) : make()
  }

  /** La scatola del grafico 3D: quella scelta per il blocco come è scritto, se gli slider non cambiano la parte da mostrare. */
  private startBox(): Box {
    const spec = explicitWindow(this.spec) === explicitWindow(this.written) ? this.written : this.spec
    return spec === this.written ? remember(boxes, this.key, () => chooseBox(spec)) : chooseBox(spec)
  }

  /** I pezzi del grafico 3D, calcolati una volta per valori degli slider, scatola e qualità. */
  private sceneFor(spec: GraphSpec, quality: Quality): Scene {
    const key = `${this.specValues}\u0000${JSON.stringify(this.box)}\u0000${quality}`
    let scene = this.scenes.get(key)
    if (!scene) {
      scene = buildScene(spec, this.box!, quality)
      if (this.scenes.size >= 4) this.scenes.delete(this.scenes.keys().next().value!)
      this.scenes.set(key, scene)
    }
    return scene
  }

  private setCamera(camera: Camera): void {
    this.camera = camera
    if (sameCamera(camera, DEFAULT_CAMERA)) cameras.delete(this.key)
    else {
      if (cameras.size >= MAX_CACHE) cameras.delete(cameras.keys().next().value!)
      cameras.set(this.key, camera)
    }
    this.schedule()
  }

  private viewport(): Viewport {
    return { ...this.view, width: this.width, height: this.height }
  }

  private schedule(): void {
    if (!this.frame) {
      this.frame = requestAnimationFrame(() => {
        this.frame = 0
        this.render()
      })
    }
  }

  private render(): void {
    this.frame = 0
    if (this.space) {
      this.renderSpace()
      return
    }
    const spec = this.currentSpec()
    const v = this.view
    const draw = () => graphSvg(spec, this.viewport(), this.palette, { id: 'graph', title: graphTitle(spec) })
    // I disegni con i valori scritti si ricordano; quelli con gli slider spostati cambiano di continuo.
    const key = `${this.theme} ${this.palette.halo} ${this.width}x${this.height} ${v.x0} ${v.x1} ${v.y0} ${v.y1}\n${this.key}`
    const svg = spec === this.written ? remember(drawings, key, draw) : draw()
    // Il disegno è fatto da Glifo: i testi sono già passati da escapeXml. Gli id (il ritaglio) diversi per ogni grafico.
    this.canvas.innerHTML = svg.replaceAll('graph-clip', `${this.id}-clip`)
    const notes = this.legendHtml() + this.errorsHtml()
    if (notes !== this.notesHtml) {
      this.notesHtml = notes
      this.notes.innerHTML = notes
    }
    const moved = this.view !== this.base
    this.reset.hidden = !moved
    this.block.classList.toggle('is-moved', moved)
  }

  /** Il grafico 3D: mentre si gira con meno quadretti, poi di nuovo con tutti. */
  private renderSpace(): void {
    const spec = this.currentSpec()
    const moving = this.rows.some((r) => r.state.playing) || performance.now() - this.slidAt < SETTLE
    const quality: Quality = this.turn || this.pinch || moving ? 'fast' : 'fine'
    const scene = this.sceneFor(spec, quality)
    this.canvas.innerHTML = sceneSvg(scene, spec, this.camera, this.palette, { width: this.width, height: this.height, title: graphTitle(spec) })
    const notes = this.legendHtml() + this.errorsHtml()
    if (notes !== this.notesHtml) {
      this.notesHtml = notes
      this.notes.innerHTML = notes
    }
    const moved = !sameCamera(this.camera, DEFAULT_CAMERA)
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
    this.schedule()
  }

  /** Ingrandisce (factor < 1) o rimpicciolisce attorno a un punto (in pixel del disegno), di solito il centro. */
  private zoom(factor: number, at?: { x: number; y: number }): void {
    if (this.space) {
      const zoom = this.camera.zoom / factor
      if (zoom >= 0.2 && zoom <= 12) this.setCamera({ ...this.camera, zoom })
      return
    }
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
        this.turn = null
        this.pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y) || 1, center: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, view: this.view, camera: this.camera }
        this.canvas.setPointerCapture(ev.pointerId)
      } else if (this.space && this.touches.size === 1) {
        // Nello spazio un dito solo gira il grafico.
        this.turn = { ...this.local(ev), camera: this.camera }
        this.canvas.setPointerCapture(ev.pointerId)
      }
      return
    }
    if (ev.button !== 0) return
    if (this.space) this.turn = { ...this.local(ev), camera: this.camera }
    else this.drag = { ...this.local(ev), view: this.view }
    this.canvas.setPointerCapture(ev.pointerId)
    this.canvas.classList.add('is-dragging')
  }

  /** Gira il grafico 3D seguendo il puntatore: in orizzontale attorno all'asse z, in verticale dall'alto o dal basso. */
  private turnTo(p: { x: number; y: number }): void {
    const start = this.turn!
    const az = start.camera.az - (p.x - start.x) * TURN
    const el = Math.max(-MAX_ELEVATION, Math.min(MAX_ELEVATION, start.camera.el + (p.y - start.y) * TURN))
    this.setCamera({ ...start.camera, az, el })
  }

  private onMove(ev: PointerEvent): void {
    const p = this.local(ev)
    if (ev.pointerType === 'touch') {
      if (!this.touches.has(ev.pointerId)) return
      this.touches.set(ev.pointerId, p)
      if (this.turn && this.touches.size === 1) {
        this.turnTo(p)
        return
      }
      if (this.pinch && this.touches.size === 2) {
        const [a, b] = [...this.touches.values()]
        const distance = Math.hypot(a.x - b.x, a.y - b.y) || 1
        const center = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
        const start = this.pinch
        const factor = start.distance / distance
        if (this.space) {
          const zoom = Math.max(0.2, Math.min(12, start.camera.zoom / factor))
          this.setCamera({ ...this.camera, zoom })
          return
        }
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
    if (this.turn) {
      this.turnTo(p)
      return
    }
    if (this.space) return
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
    const turning = !!this.turn || !!this.pinch
    if (ev.pointerType === 'touch') {
      this.touches.delete(ev.pointerId)
      if (this.touches.size < 2) this.pinch = null
      if (!this.touches.size) this.turn = null
    } else {
      this.drag = null
      this.turn = null
      this.canvas.classList.remove('is-dragging')
    }
    // Finito di girare: di nuovo con tutti i quadretti.
    if (this.space && turning && !this.turn && !this.pinch) this.schedule()
  }

  private onWheel(ev: WheelEvent): void {
    // Con Ctrl (o pizzicando il touchpad) si ingrandisce il grafico; la rotellina da sola scorre la pagina.
    if (!ev.ctrlKey) return
    ev.preventDefault()
    this.zoom(Math.exp(Math.max(-1, Math.min(1, ev.deltaY * 0.01))), this.local(ev))
  }

  /** Il punto della curva più vicino al puntatore, con le sue coordinate. */
  private trace(p: { x: number; y: number }): void {
    if (this.space) return
    const v = this.view
    const x = v.x0 + (p.x / this.width) * (v.x1 - v.x0)
    const ky = this.height / (v.y1 - v.y0)
    let best: { sx: number; sy: number; x: number; y: number; color: string; text?: string } | null = null
    let bestDistance = 22
    const sxOf = (px: number) => ((px - v.x0) / (v.x1 - v.x0)) * this.width
    this.spec.items.forEach((item, i) => {
      if (item.kind === 'series' || item.kind === 'mark') {
        // I dati di una tabella: il punto più vicino, con i valori scritti come nella tabella.
        const list = item.kind === 'series' ? item.points.map((pt, k) => ({ pt, text: item.texts[k] })) : [{ pt: [item.x, item.y] as [number, number], text: item.coords }]
        for (const { pt, text } of list) {
          const sx = sxOf(pt[0])
          const sy = (v.y1 - pt[1]) * ky
          const d = Math.hypot(sx - p.x, sy - p.y)
          if (d < Math.min(bestDistance, 16)) {
            bestDistance = d
            best = { sx, sy, x: pt[0], y: pt[1], color: this.colors[i], text }
          }
        }
        return
      }
      if (item.kind === 'function' || (item.kind === 'area' && item.curve)) {
        const y = item.f(x)
        if (!Number.isFinite(y)) return
        const sy = (v.y1 - y) * ky
        const d = Math.abs(sy - p.y)
        if (d < bestDistance) {
          bestDistance = d
          best = { sx: p.x, sy, x, y, color: this.colors[i] }
        }
      } else if (item.kind === 'point' || item.kind === 'complex') {
        for (const [px, py] of item.kind === 'point' ? [[item.x, item.y]] : item.values.map((z) => [z.re, z.im])) {
          const sx = ((px - v.x0) / (v.x1 - v.x0)) * this.width
          const sy = (v.y1 - py) * ky
          const d = Math.hypot(sx - p.x, sy - p.y)
          if (d < Math.min(bestDistance, 14)) {
            bestDistance = d
            best = { sx, sy, x: px, y: py, color: this.colors[i] }
          }
        }
      }
    })
    const found = best as { sx: number; sy: number; x: number; y: number; color: string; text?: string } | null
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
    const yStep = (step * (v.y1 - v.y0)) / (v.x1 - v.x0)
    // Nel piano di Gauss il punto è un numero complesso: 1,5 + 2i.
    this.tip.textContent = found.text ?? (this.spec.gauss ? complexCoord(found.x, found.y, step, yStep) : `(${coord(found.x, step)}; ${coord(found.y, yStep)})`)
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
let printWatched = false

/** Si stampa la nota: i grafici con i valori scritti, non con quelli degli slider; dopo, di nuovo come prima. */
function setPrinting(value: boolean): void {
  printing = value
  for (const [block, view] of drawnViews) if (block.isConnected) view.redraw()
}

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
  if (!printWatched) {
    printWatched = true
    window.addEventListener('beforeprint', () => setPrinting(true))
    window.addEventListener('afterprint', () => setPrinting(false))
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
