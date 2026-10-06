import { readJson, writeJson } from '../store/storage'
import { h, icon, ICONS } from '../ui/dom'
import { appleTouch } from './device'
import { BOARD_PALETTES, highlightName, inkName, outlineSvg, shapeSvg, strokeOutline, TOOL_SIZES, type BoardTheme, type SizeChoice } from './ink'
import {
  centerOn,
  copyStrokes,
  handleScale,
  IDENTITY,
  keepInside,
  lassoed,
  MAX_SIZE,
  moveBox,
  recolor,
  selectionBox,
  strokeAt,
  transformStrokes,
  type Transform,
} from './selection'
import { adjustShape, recognize, SHAPE_NAMES, shapePoints, type Shape } from './shapes'
import type { BoardChange, BoardStore, BoardView } from './store'
import { touchLog, where } from './touchlog'
import {
  boxesTouch,
  compareStrokes,
  eraserGrowth,
  eraseStroke,
  HIGHLIGHT_COLORS,
  INK_COLORS,
  newStrokeId,
  piecesOf,
  roundPoints,
  strokeBox,
  strokeTouched,
  type Box,
  type HighlightColor,
  type InkColor,
  type Pt,
  type Stroke,
} from './strokes'

/**
 * La lavagna: si scrive a mano accanto al testo (o a tutto schermo), con la penna, il dito o il
 * mouse. Una per nota, salvata su questo dispositivo (store.ts); non va nella nota.
 *
 * - Strumenti, come in Microsoft Whiteboard: la penna, l'evidenziatore (trasparente, sotto la
 *   scrittura) e la gomma, che cancella dove passa (e si allarga se la si muove veloce) o tocca una
 *   linea e la cancella tutta. Ognuno ha tre misure e ricorda colore, misura e modo (`PREFS_KEY`).
 * - Figure precise (shapes.ts): tenendo ferma la penna alla fine del tratto, la linea o la figura
 *   diventa precisa e, finché la penna è giù, la si regola; con le «Forme automatiche» succede da
 *   solo. Annulla riporta il tratto fatto a mano.
 * - Selezione, come in Note di Apple (selection.ts): con il lazo si disegna intorno a quello che si
 *   vuole prendere, o si tocca una linea; poi lo si trascina, lo si ingrandisce con il pallino
 *   nell'angolo e dal menu lo si taglia, copia, duplica, elimina o gli si cambia colore.
 * - Penna: lo spessore segue la pressione. Appena si usa una penna, Glifo se lo ricorda: da lì un
 *   dito solo non fa niente (è quasi sempre la mano appoggiata), due dita spostano e ingrandiscono.
 *   La mano che tocca mentre si scrive, o appena dopo, non conta: né sulla lavagna né sui pulsanti.
 * - Senza penna: un dito scrive, due dita spostano e ingrandiscono.
 * - Mouse: scrive col tasto sinistro; si sposta con la rotellina, con il tasto centrale o tenendo
 *   premuto lo spazio; Ctrl + rotellina ingrandisce.
 */

export interface BoardOptions {
  store: BoardStore
  /** «Pulisci»: chiede conferma. */
  confirmClear(): Promise<boolean>
  /** Un problema da dire (per esempio: la lavagna non si salva). */
  warn(message: string): void
  /** Apre il registro dei tocchi (il pallino rosso, che si vede quando registra: touchlog.ts). */
  openLog?(): void
}

type Tool = 'pen' | 'highlight' | 'eraser' | 'lasso'
/** Gli strumenti con tre misure (il lazo non ne ha). */
type SizedTool = Exclude<Tool, 'lasso'>
/** La gomma cancella dove passa («area») o tutta la linea che tocca («stroke»). */
type EraserMode = 'area' | 'stroke'

/** Un passo da annullare o ripetere: i tratti che ha tolto e quelli che ha messo. */
interface Step {
  removed: Stroke[]
  added: Stroke[]
  /** Ha messo la figura precisa al posto del tratto a mano del passo prima. */
  pair?: true
  /** I tratti selezionati prima e dopo (gli id): annullando o ripetendo, la selezione torna com'era. */
  selection?: { before: string[]; after: string[] }
}

interface DrawAction {
  kind: 'draw'
  pointer: number
  type: string
  stroke: Stroke
  started: number
  /** Quanta strada ha fatto sullo schermo, in pixel. */
  travel: number
  last: Pt
  /** Dove si è fermata la punta (sullo schermo): ferma per `HOLD_MS`, il tratto diventa una figura. */
  holdAt: Pt
  holdTimer: number
  /** La figura in cui è diventato: com'era (`base`), dov'era la punta (sulla lavagna) e com'è adesso. */
  snapped: { base: Shape; anchor: Pt; shape: Shape } | null
}

interface EraseAction {
  kind: 'erase'
  pointer: number
  type: string
  /** Dov'era la gomma (sulla lavagna). */
  last: Pt
  /** I tratti che c'erano prima e sono stati tolti (o tagliati), e quelli nuovi rimasti. */
  removed: Map<string, Stroke>
  added: Map<string, Stroke>
  mode: EraserMode
  /** Dov'era sullo schermo, quando (ms) e quanto andava veloce: la gomma «dove passa» si allarga. */
  screen: Pt
  time: number
  speed: number
  /** Il raggio di adesso, in pixel dello schermo. */
  radius: number
}

interface PanAction {
  kind: 'pan'
  pointer: number
  type: string
  last: Pt
  before: BoardView
}

interface PinchAction {
  kind: 'pinch'
  pointers: [number, number]
  type: 'touch'
  before: BoardView
  mid: Pt
  dist: number
  /** Le dita si sono mosse abbastanza: la vista le segue. */
  moving: boolean
}

/** Il lazo che si sta disegnando intorno a quello da selezionare. */
interface LassoAction {
  kind: 'lasso'
  pointer: number
  type: string
  /** Il giro del lazo, sulla lavagna. */
  points: Pt[]
  /** Dov'era sullo schermo e quanta strada ha fatto: poca, ed era un tocco. */
  last: Pt
  travel: number
  /** Toccando fuori ha tolto la selezione di prima: un tocco così non apre il menu per incollare. */
  cleared: boolean
}

/** La selezione trascinata (`move`) o ingrandita tirando il pallino nell'angolo (`scale`). */
interface MoveAction {
  kind: 'move'
  pointer: number
  type: string
  mode: 'move' | 'scale'
  /** Dove ha toccato, sulla lavagna e sullo schermo. */
  from: Pt
  screen: Pt
  /** Si è mosso abbastanza da non essere un tocco: i tratti si disegnano sopra, dove sono adesso. */
  moved: boolean
  transform: Transform
  /** Quanto la si può rimpicciolire e ingrandire. */
  limits: [number, number]
  /** Il menu della selezione era aperto: un tocco lo chiude, se no lo apre. */
  menuWasOpen: boolean
}

type Action = DrawAction | EraseAction | PanAction | PinchAction | LassoAction | MoveAction

/** Le azioni, a parole: per il registro dei tocchi. */
const ACTION_NAMES: Record<Action['kind'], string> = {
  draw: 'un tratto',
  erase: 'la gomma',
  pan: 'uno spostamento',
  pinch: 'un gesto con due dita',
  lasso: 'il lazo',
  move: 'la selezione che si sposta',
}

interface Finger extends Pt {
  /** Un dito (o il palmo) da non considerare finché non si alza: c'era la penna. */
  ignored: boolean
}

const ZOOM_MIN = 0.25
const ZOOM_MAX = 6
const HISTORY_MAX = 300
/** I quadretti, ogni tante unità della lavagna (circa 5 mm). */
const GRID = 24
/** Un tratto col dito così breve, quando arriva il secondo dito, era l'inizio dello spostamento. */
const YOUNG = { ms: 260, px: 26 }
/** Per così tanti millisecondi dopo che la penna si è alzata, un tocco è la mano che si appoggia. */
const PALM_MS = 500
/** Di quanti pixel si devono muovere le due dita prima che la lavagna le segua: la mano che si posa trema. */
const SLOP = 8
/** La punta ferma (entro `HOLD_SLOP` pixel) per tanto così alla fine di un tratto: diventa una figura precisa. */
const HOLD_MS = 550
const HOLD_SLOP = 6
/** Il lazo (o la selezione) mosso meno di così, in pixel, è un tocco. */
const TAP_PX = 6
/** Toccando col lazo si prende la linea a meno di tanti pixel (dal bordo); col mouse si mira meglio. */
const TAP_REACH = { touch: 12, mouse: 6 }
/** Il pallino nell'angolo della selezione: quanto è grande e da quanto lontano lo si prende (pixel). */
const HANDLE_R = 7
const HANDLE_REACH = { touch: 22, mouse: 11 }
/** Lo spazio tra i tratti selezionati e il riquadro tratteggiato (pixel). */
const SELECT_PAD = 6
/** Duplica e Incolla spostano la copia di tanto (pixel), così si vede che è un'altra. */
const COPY_SHIFT = 20
/** Le frecce spostano la selezione; quelle premute una dopo l'altra sono un passo solo da annullare. */
const NUDGE_MS = 1200
/** Su questo dispositivo: se si è usata una penna e l'ultimo colore. */
const PREFS_KEY = 'glifo.lavagna.v1'
const START: BoardView = { x: 0, y: 0, zoom: 1 }

const ICON = {
  pen: '<path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/><path d="M14.5 5.5l3 3"/>',
  eraser: '<path d="M8.5 20H20"/><path d="M5.6 15.6l7.8-7.8a2 2 0 0 1 2.8 0l2 2a2 2 0 0 1 0 2.8L12 18.8a4 4 0 0 1-5.6 0l-.8-.8a2 2 0 0 1 0-2.4z"/><path d="M9 12.2l4.8 4.8"/>',
  undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  redo: '<path d="M15 14l5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>',
  full: '<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>',
  exitFull: '<path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3"/>',
  minus: '<path d="M5 12h14"/>',
  highlight: '<path d="M13.5 3.5l7 7-6 6-7-7z"/><path d="M7.5 9.5l-3 6.5 3.5 3.5 6.5-3"/><path d="M3 21h9"/>',
  rec: '<circle cx="12" cy="12" r="6" fill="currentColor" stroke="none"/>',
  lasso: '<ellipse cx="12.5" cy="9.5" rx="8.5" ry="5.5" stroke-dasharray="3 2.4"/><path d="M7.4 14.3c-1.9 1-2.3 2.4-1.2 3.4 1 .9.9 2.2-.4 3.3"/>',
  all: '<rect x="4" y="4" width="16" height="16" rx="2.5" stroke-dasharray="3 2.6"/>',
  paste: '<rect x="5" y="4.5" width="14" height="16.5" rx="2"/><path d="M9 4.5V3h6v1.5M9 10h6M9 14h4"/>',
}

const clampZoom = (z: number) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z))

function validView(v: BoardView): BoardView {
  return { x: Number.isFinite(v.x) ? v.x : 0, y: Number.isFinite(v.y) ? v.y : 0, zoom: clampZoom(v.zoom || 1) }
}

/** I punti intermedi che il browser ha raccolto tra un evento e l'altro (la penna ne manda tanti). */
function coalesced(ev: PointerEvent): PointerEvent[] {
  const list = typeof ev.getCoalescedEvents === 'function' ? ev.getCoalescedEvents() : []
  return list.length ? list : [ev]
}

function pressureOf(ev: PointerEvent, pen: boolean): number {
  if (!pen) return 0.5
  const p = ev.pressure
  return Number.isFinite(p) && p > 0 ? Math.min(1, p) : 0.5
}

/** I punti di un tratto senza la pressione. */
function pointsOf(s: Stroke): Pt[] {
  const out: Pt[] = []
  for (let i = 0; i + 1 < s.points.length; i += 3) out.push({ x: s.points[i], y: s.points[i + 1] })
  return out
}

/** Un tratto in breve, per il registro dei tocchi: quanti punti, la pressione e quanto è durato. */
function strokeSummary(a: DrawAction): string {
  const p = a.stroke.points.filter((_, i) => i % 3 === 2)
  const pressure = a.stroke.pen ? `, pressione ${Math.min(...p).toFixed(2)}–${Math.max(...p).toFixed(2)}` : ''
  return `${p.length} punti${pressure}, ${Math.round(a.travel)} px in ${((performance.now() - a.started) / 1000).toFixed(2)} s`
}

/** La gomma in fondo alla penna, o la penna con il tasto laterale premuto. */
function penErases(ev: PointerEvent): boolean {
  return ev.button === 5 || ev.button === 2 || (ev.buttons & (32 | 2)) !== 0
}

interface Prefs {
  pen?: boolean
  /** Il colore della penna. */
  color?: InkColor
  /** Il colore dell'evidenziatore. */
  highlight?: HighlightColor
  /** La misura scelta per ogni strumento (0, 1 o 2: vedi TOOL_SIZES). */
  sizes?: Partial<Record<SizedTool, SizeChoice>>
  eraser?: EraserMode
  /** Forme automatiche: i tratti della penna che somigliano a una figura diventano precisi da soli. */
  shapes?: boolean
}

function loadPrefs(): Prefs {
  const raw = readJson<unknown>(PREFS_KEY, {})
  return typeof raw === 'object' && raw !== null ? (raw as Prefs) : {}
}

const sizeChoice = (v: unknown): SizeChoice => (v === 0 || v === 1 || v === 2 ? v : 1)

/** Le misure a parole: spessori per penna ed evidenziatore, grandezze per la gomma. */
const SIZE_NAMES: Record<SizedTool, readonly string[]> = {
  pen: ['fine', 'media', 'spessa'],
  highlight: ['fine', 'medio', 'largo'],
  eraser: ['piccola', 'media', 'grande'],
}
const TOOL_NAMES: Record<Tool, string> = { pen: 'penna', highlight: 'evidenziatore', eraser: 'gomma', lasso: 'selezione' }
const MODE_NAMES: Record<EraserMode, string> = { area: 'Dove passa', stroke: 'Linea intera' }
/** Il pallino delle tre misure (in px), nel pulsante e nel menu. */
const DOT_SIZES = [7, 11, 16] as const

/**
 * Gli appunti della lavagna (Copia e Taglia): restano finché la pagina è aperta, anche cambiando nota.
 * `shift`: di quanto spostare la prossima copia incollata (dopo Taglia la prima va dov'era).
 */
let clipboard: { strokes: Stroke[]; box: Box; shift: number } | null = null

export class Board {
  readonly el: HTMLElement
  private readonly stage: HTMLElement
  private readonly canvas: HTMLCanvasElement
  private readonly live: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly liveCtx: CanvasRenderingContext2D
  private readonly toolButtons = new Map<Tool, HTMLButtonElement>()
  private readonly colorButtons = new Map<InkColor, HTMLButtonElement>()
  private readonly highlightButtons = new Map<HighlightColor, HTMLButtonElement>()
  /**
   * I colori della penna, quelli dell'evidenziatore e il modo della gomma: stanno uno sopra l'altro e
   * si vede quello dello strumento scelto.
   */
  private readonly inkGroup: HTMLElement
  private readonly highlightGroup: HTMLElement
  private readonly modeButton: HTMLButtonElement
  /** La misura dello strumento: un pallino grande come il tratto; apre il menu. */
  private readonly sizeButton: HTMLButtonElement
  /** Con il lazo, al posto dei colori e della misura: «Tutto» (seleziona tutto) e «Incolla». */
  private readonly lassoGroup: HTMLElement
  private readonly allButton: HTMLButtonElement
  private readonly pasteButton: HTMLButtonElement
  private readonly toolsBar: HTMLElement
  /** Il menu aperto (misure, modo della gomma), se c'è. */
  private menu: HTMLElement | null = null
  /** Il pulsante sotto cui è aperto il menu. */
  private menuAnchor: HTMLElement | null = null
  private readonly undoButton: HTMLButtonElement
  private readonly redoButton: HTMLButtonElement
  private readonly clearButton: HTMLButtonElement
  private readonly fullButton: HTMLButtonElement
  private readonly logButton: HTMLButtonElement
  private readonly zoomLevel: HTMLButtonElement

  private note: string | null = null
  private shown = false
  private strokes = new Map<string, Stroke>()
  private sortedCache: Stroke[] | null = null
  private readonly paths = new Map<string, Path2D>()
  private readonly boxes = new Map<string, Box>()
  private undoStack: Step[] = []
  private redoStack: Step[] = []
  private view: BoardView = { ...START }
  /** La vista è cambiata da quando si è aperta la nota: quella salvata non si rimette. */
  private viewMoved = false
  private theme: BoardTheme = 'light'
  private tool: Tool = 'pen'
  private color: InkColor
  private highlightColor: HighlightColor
  private readonly sizes: Record<SizedTool, SizeChoice>
  private eraserMode: EraserMode
  private autoShapes: boolean
  private penMode: boolean
  private action: Action | null = null
  private readonly touches = new Map<number, Finger>()
  /** Dove disegnare il cerchio della gomma (sullo schermo), oppure null. */
  private cursor: Pt | null = null
  private spaceDown = false
  private size = { w: 0, h: 0, dpr: 1 }
  private frame = 0
  private liveFrame = 0
  private full = false
  private browserFull = false
  /** Cresce a ogni modifica fatta qui: una lettura del salvato partita prima è vecchia. */
  private version = 0
  private loadToken = 0
  /** Una lettura rimandata alla fine del tratto (o del gesto) che si sta facendo; `first`: è la prima. */
  private pendingLoad: { first: boolean } | null = null
  private viewTimer = 0
  private persistent = true
  private readonly warned = new Set<string>()
  /** L'ultimo tratto fatto col dito: se arriva subito la penna per la prima volta, era il palmo. */
  private lastTouchStep: { step: Step; at: number } | null = null
  /** L'ultima volta che la penna ha toccato la lavagna (performance.now()). */
  private lastPen = -Infinity
  /** I tocchi sui pulsanti cominciati mentre si scriveva con la penna: la mano, non un dito. */
  private readonly palmTaps = new Set<number>()
  /** Fino a quando un clic viene dalla mano appena alzata da un pulsante, e non vale. */
  private palmClickUntil = 0
  /** I tratti selezionati (con il lazo o toccandoli) e il loro riquadro, sulla lavagna. */
  private selection: { ids: Set<string>; box: Box } | null = null
  /** Il menu della selezione (Taglia, Copia…) o quello per incollare, se è aperto. */
  private selMenu: HTMLElement | null = null
  /** Dove si è toccato per incollare (sulla lavagna): il menu sta lì. */
  private selMenuAt: Pt | null = null
  /** L'ultimo spostamento con le frecce: quelli subito dopo si uniscono a lui in un passo solo. */
  private nudge: { step: Step; at: number } | null = null
  /** Dove si disegnano gli aloni della selezione, prima di metterli sulla lavagna (drawHalos). */
  private haloCanvas: HTMLCanvasElement | null = null

  constructor(private readonly opts: BoardOptions) {
    const prefs = loadPrefs()
    this.penMode = prefs.pen === true
    this.color = INK_COLORS.includes(prefs.color as InkColor) ? (prefs.color as InkColor) : 'ink'
    this.highlightColor = HIGHLIGHT_COLORS.includes(prefs.highlight as HighlightColor) ? (prefs.highlight as HighlightColor) : 'yellow'
    const sizes = typeof prefs.sizes === 'object' && prefs.sizes !== null ? prefs.sizes : {}
    this.sizes = { pen: sizeChoice(sizes.pen), highlight: sizeChoice(sizes.highlight), eraser: sizeChoice(sizes.eraser) }
    this.eraserMode = prefs.eraser === 'stroke' ? 'stroke' : 'area'
    this.autoShapes = prefs.shapes === true

    this.canvas = h('canvas', { class: 'board-canvas', attrs: { 'aria-hidden': 'true' } })
    this.live = h('canvas', { class: 'board-live', attrs: { 'aria-hidden': 'true' } })
    this.ctx = this.canvas.getContext('2d')!
    this.liveCtx = this.live.getContext('2d')!
    this.stage = h(
      'div',
      {
        class: 'board-stage',
        attrs: {
          tabindex: 0,
          role: 'application',
          'aria-roledescription': 'lavagna',
          'aria-label': 'Lavagna: scrivi con la penna, il dito o il mouse',
        },
      },
      this.canvas,
      this.live,
    )

    const button = (label: string, paths: string, onClick: () => void, title = label) =>
      h('button', { class: 'board-button', title, attrs: { type: 'button', 'aria-label': label }, on: { click: onClick } }, icon(paths, 18))
    // Lo strumento già scelto, premuto di nuovo, apre le sue misure (come in Microsoft Whiteboard).
    const toolButton = (tool: Tool, label: string, paths: string, title: string) => {
      const b = button(label, paths, () => (this.tool === tool ? this.toggleMenu(b) : this.setTool(tool)), title)
      b.setAttribute('aria-pressed', 'false')
      this.toolButtons.set(tool, b)
      return b
    }
    const sep = () => h('span', { class: 'board-sep', attrs: { 'aria-hidden': 'true' } })
    const colors = INK_COLORS.map((c) => {
      const b = h(
        'button',
        { class: 'board-color', attrs: { type: 'button', 'aria-pressed': 'false' }, data: { color: c }, on: { click: () => this.setColor(c) } },
        h('span', { class: 'board-swatch' }),
      )
      this.colorButtons.set(c, b)
      return b
    })
    const highlights = HIGHLIGHT_COLORS.map((c) => {
      const b = h(
        'button',
        { class: 'board-color is-highlight', attrs: { type: 'button', 'aria-pressed': 'false' }, data: { highlight: c }, on: { click: () => this.setHighlightColor(c) } },
        h('span', { class: 'board-swatch' }),
      )
      b.title = highlightName(c)
      b.setAttribute('aria-label', `Evidenziatore ${highlightName(c).toLowerCase()}`)
      this.highlightButtons.set(c, b)
      return b
    })
    this.inkGroup = h('div', { class: 'board-colors', attrs: { role: 'group', 'aria-label': 'Colore della penna' } }, colors)
    this.highlightGroup = h('div', { class: 'board-colors', attrs: { role: 'group', 'aria-label': 'Colore dell\'evidenziatore' } }, highlights)
    // I pulsanti con la freccia aprono il menu: per la gomma come cancella, scritto; per ogni
    // strumento la misura, un pallino grande come il tratto.
    this.modeButton = h(
      'button',
      { class: 'board-chip board-mode', attrs: { type: 'button', 'aria-haspopup': 'true' }, on: { click: () => this.toggleMenu(this.modeButton) } },
      h('span', { class: 'board-mode-label' }),
      icon(ICONS.chevronDown, 14),
    )
    this.sizeButton = h(
      'button',
      { class: 'board-chip board-size', attrs: { type: 'button', 'aria-haspopup': 'true' }, on: { click: () => this.toggleMenu(this.sizeButton) } },
      h('span', { class: 'board-size-dot' }),
      icon(ICONS.chevronDown, 14),
    )
    // Con il lazo: seleziona tutto e incolla (senza tastiera, sull'iPad).
    const chip = (cls: string, label: string, title: string, paths: string, onClick: () => void) =>
      h('button', { class: `board-chip ${cls}`, title, attrs: { type: 'button', 'aria-label': title }, on: { click: onClick } }, icon(paths, 16), h('span', {}, label))
    this.allButton = chip('board-all', 'Tutto', 'Seleziona tutto (Ctrl+A)', ICON.all, () => (this.selectAll(), this.focus()))
    this.pasteButton = chip('board-paste', 'Incolla', 'Incolla (Ctrl+V)', ICON.paste, () => (this.paste(), this.focus()))
    this.lassoGroup = h('div', { class: 'board-lasso', attrs: { role: 'group', 'aria-label': 'Selezione' } }, this.allButton, this.pasteButton)
    // Uno sopra l'altro, larghi quanto il più largo: cambiando strumento la barra resta uguale e i
    // pulsanti non si spostano sotto la penna (la barra sta al centro). La misura ha la sua colonna;
    // i pulsanti del lazo prendono il posto di tutte e due.
    const options = h('div', { class: 'board-options' }, this.inkGroup, this.highlightGroup, this.modeButton, this.lassoGroup, this.sizeButton)
    // Il pulsante premuto si spegne quando non c'è più niente da annullare: il fuoco torna alla
    // lavagna, così Ctrl+Z e Ctrl+Y continuano a funzionare.
    this.undoButton = button('Annulla', ICON.undo, () => (this.undo(), this.focus()), 'Annulla (Ctrl+Z)')
    this.redoButton = button('Ripeti', ICON.redo, () => (this.redo(), this.focus()), 'Ripeti (Ctrl+Y)')
    this.clearButton = button('Pulisci la lavagna', ICONS.trash, () => void this.clear(), 'Pulisci la lavagna: cancella tutto')
    this.fullButton = button('Schermo intero', ICON.full, () => this.setFull(!this.full))
    // Il registro dei tocchi sta registrando: il pallino rosso lo apre, e segna il momento.
    this.logButton = button(
      'Registro dei tocchi',
      ICON.rec,
      () => {
        touchLog.add('segno: premuto il pallino del registro')
        opts.openLog?.()
      },
      'Registro dei tocchi: sta registrando',
    )
    this.logButton.classList.add('board-log')
    this.logButton.hidden = !touchLog.on
    touchLog.onChange(() => (this.logButton.hidden = !touchLog.on))
    const tools = h(
      'div',
      { class: 'board-tools', attrs: { role: 'toolbar', 'aria-label': 'Strumenti della lavagna' } },
      toolButton('pen', 'Penna', ICON.pen, 'Penna (premuta di nuovo: lo spessore e le forme automatiche)'),
      toolButton('highlight', 'Evidenziatore', ICON.highlight, 'Evidenziatore: trasparente, sotto la scrittura'),
      toolButton('eraser', 'Gomma', ICON.eraser, 'Gomma (premuta di nuovo: come cancella e quanto è grande)'),
      toolButton('lasso', 'Selezione', ICON.lasso, 'Selezione: disegna intorno a quello che vuoi prendere (premuta di nuovo: come si usa)'),
      sep(),
      options,
      sep(),
      this.clearButton,
      this.fullButton,
      this.logButton,
    )
    this.toolsBar = tools
    // In basso a sinistra annulla e ripeti, a destra l'ingrandimento: in alto c'è posto anche
    // quando la lavagna è stretta, e sul telefono si arriva col pollice.
    const history = h('div', { class: 'board-history', attrs: { role: 'group', 'aria-label': 'Annulla e ripeti' } }, this.undoButton, this.redoButton)
    this.zoomLevel = h(
      'button',
      {
        class: 'board-zoom-level',
        title: 'Torna alla vista di partenza',
        attrs: { type: 'button', 'aria-label': 'Torna alla vista di partenza' },
        on: { click: () => this.setView({ ...START }) },
      },
      '100%',
    )
    const zoom = h(
      'div',
      { class: 'board-zoom' },
      button('Rimpicciolisci', ICON.minus, () => this.zoomBy(1 / 1.25)),
      this.zoomLevel,
      button('Ingrandisci', ICONS.plus, () => this.zoomBy(1.25)),
    )
    this.el = h(
      'section',
      { class: 'board-pane', attrs: { id: 'board-pane', 'aria-label': 'Lavagna' }, data: { strokes: '0', tool: 'pen', selected: '0' } },
      this.stage,
      tools,
      history,
      zoom,
    )

    const stage = this.stage
    stage.addEventListener('pointerdown', (ev) => this.onDown(ev))
    stage.addEventListener('pointermove', (ev) => this.onMove(ev))
    stage.addEventListener('pointerup', (ev) => this.onUp(ev, false))
    stage.addEventListener('pointercancel', (ev) => this.onUp(ev, true))
    stage.addEventListener('lostpointercapture', (ev) => this.onUp(ev, true))
    stage.addEventListener('pointerleave', () => {
      if (!this.action && this.cursor) {
        this.cursor = null
        this.scheduleLive()
      }
    })
    stage.addEventListener('wheel', (ev) => this.onWheel(ev), { passive: false })
    stage.addEventListener('contextmenu', (ev) => ev.preventDefault())
    // Safari (iPad e iPhone): senza questo la penna e le dita sulla lavagna selezionano le parole
    // vicine, aprono la lente o fanno partire Scribble, che scrive nel testo come con la tastiera.
    // I tratti arrivano lo stesso: sono gli eventi dei puntatori, qui sopra.
    for (const type of ['touchstart', 'touchmove', 'touchend', 'gesturestart', 'gesturechange'])
      stage.addEventListener(type, (ev) => ev.preventDefault(), { passive: false })
    // La mano appoggiata mentre si scrive non preme i pulsanti della lavagna (annulla, ingrandisci…).
    const el = this.el
    el.addEventListener(
      'pointerdown',
      (ev) => {
        if (ev.pointerType === 'touch' && !stage.contains(ev.target as Node) && this.penMode && this.penNear()) {
          this.palmTaps.add(ev.pointerId)
          touchLog.add('→ tocco su un pulsante con la penna vicina: è la mano, non vale come clic')
        }
      },
      true,
    )
    el.addEventListener(
      'pointerup',
      (ev) => {
        if (this.palmTaps.delete(ev.pointerId)) this.palmClickUntil = performance.now() + 400
      },
      true,
    )
    el.addEventListener('pointercancel', (ev) => this.palmTaps.delete(ev.pointerId), true)
    el.addEventListener(
      'click',
      (ev) => {
        if (performance.now() > this.palmClickUntil) return
        this.palmClickUntil = 0
        ev.preventDefault()
        ev.stopPropagation()
        touchLog.add(`→ clic della mano ignorato · ${where(ev.target)}`)
      },
      true,
    )
    this.el.addEventListener('keydown', (ev) => this.onKey(ev))
    this.el.addEventListener('keyup', (ev) => {
      if (ev.key === ' ') this.setSpace(false)
    })
    window.addEventListener('blur', () => this.setSpace(false))
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && this.browserFull) {
        this.browserFull = false
        touchLog.add('il browser è uscito dallo schermo intero: la lavagna torna com\'era')
        this.setFull(false)
      }
    })
    new ResizeObserver(() => this.resize()).observe(stage)
    opts.store.onChange((notes) => {
      if (this.note && notes.includes(this.note)) this.reload()
    })
    void opts.store.persistent().then((p) => (this.persistent = p))

    // Il menu delle misure si chiude toccando fuori, con Esc o scegliendo. Quello della selezione
    // anche, ma toccando la lavagna decide lei (toccare la selezione lo apre e lo chiude).
    document.addEventListener(
      'pointerdown',
      (ev) => {
        const target = ev.target as Node
        if (this.menu && !this.menu.contains(target) && !(ev.target as Element).closest?.('.board-chip, .board-tools .board-button[aria-pressed="true"]')) this.closeMenu()
        if (this.selMenu && !this.selMenu.contains(target) && !stage.contains(target)) this.closeSelMenu()
      },
      true,
    )

    if (this.penMode) this.el.dataset.pen = 'true'
    this.el.dataset.eraser = this.eraserMode
    this.el.dataset.shapes = this.autoShapes ? 'auto' : 'hold'
    this.setTool('pen')
    this.setColor(this.color, false)
    this.setHighlightColor(this.highlightColor, false)
    this.updateState()
  }

  // ——— Da fuori: quale nota, il tema, lo schermo intero ———

  /** Mostra la lavagna della nota (la carica se è un'altra). */
  show(note: string): void {
    if (!this.shown) touchLog.add('lavagna mostrata')
    this.shown = true
    if (note === this.note) {
      this.resize()
      return
    }
    this.cancelAction()
    this.clearSelection()
    this.note = note
    this.el.dataset.note = note
    this.strokes = new Map()
    this.sortedCache = null
    this.paths.clear()
    this.boxes.clear()
    this.undoStack = []
    this.redoStack = []
    this.lastTouchStep = null
    this.pendingLoad = null
    this.view = { ...START }
    this.viewMoved = false
    this.el.dataset.loaded = ''
    this.updateState()
    this.updateZoom()
    this.resize()
    this.render()
    this.load(true)
  }

  /** La lavagna non si vede più (si è passati a un'altra vista). */
  hide(): void {
    if (this.shown) touchLog.add('lavagna nascosta')
    this.shown = false
    this.cancelAction()
    this.clearSelection()
    this.setFull(false)
  }

  focus(): void {
    this.stage.focus({ preventScroll: true })
  }

  setTheme(theme: BoardTheme): void {
    this.theme = theme
    const palette = BOARD_PALETTES[theme]
    for (const [c, b] of this.colorButtons) {
      const name = inkName(c, theme)
      b.title = name
      b.setAttribute('aria-label', name)
      b.style.setProperty('--swatch', palette.ink[c])
    }
    for (const [c, b] of this.highlightButtons) b.style.setProperty('--swatch', palette.highlight[c])
    this.updateToolUi()
    this.render()
    this.renderLive()
  }

  get isFull(): boolean {
    return this.full
  }

  /**
   * A tutto schermo: la lavagna copre la finestra (il resto dell'app, sotto, si nasconde: vedi
   * `.board-full` in app.css) e, se il browser lo permette, lo schermo intero. Su iPad e iPhone no
   * (device.ts): lì Safari ne esce da solo mentre si scrive.
   */
  setFull(on: boolean): void {
    if (on === this.full) return
    this.full = on
    this.el.classList.toggle('is-full', on)
    document.documentElement.classList.toggle('board-full', on)
    const label = on ? 'Esci dallo schermo intero' : 'Schermo intero'
    this.fullButton.replaceChildren(icon(on ? ICON.exitFull : ICON.full, 18))
    this.fullButton.title = label
    this.fullButton.setAttribute('aria-label', label)
    const root = document.documentElement
    const browser = on && !document.fullscreenElement && !appleTouch() && typeof root.requestFullscreen === 'function'
    touchLog.add(`schermo intero della lavagna: ${on ? `sì, ${browser ? 'anche del browser' : 'senza quello del browser'}` : 'no'}`)
    if (browser) {
      root
        .requestFullscreen({ navigationUI: 'hide' })
        .then(() => {
          this.browserFull = this.full
          if (!this.full) void document.exitFullscreen().catch(() => {})
        })
        .catch(() => {
          /* dentro un'altra pagina o su iPhone: basta la lavagna sopra il resto */
        })
    } else if (!on && this.browserFull) {
      this.browserFull = false
      if (document.fullscreenElement) void document.exitFullscreen().catch(() => {})
    }
    if (this.shown) this.focus()
  }

  // ——— Strumenti ———

  private setTool(tool: Tool): void {
    if (tool !== this.tool) touchLog.add(`strumento: ${TOOL_NAMES[tool]}`)
    this.tool = tool
    this.el.dataset.tool = tool
    for (const [t, b] of this.toolButtons) b.setAttribute('aria-pressed', String(t === tool))
    if (tool !== 'eraser') this.cursor = null
    // Come in Note di Apple: prendendo un altro strumento la selezione si toglie.
    if (tool !== 'lasso') this.clearSelection()
    this.closeSelMenu()
    this.closeMenu()
    this.updateToolUi()
    this.scheduleLive()
  }

  private setColor(color: InkColor, pickPen = true): void {
    if (color !== this.color) touchLog.add(`colore della penna: ${inkName(color, this.theme).toLowerCase()}`)
    this.color = color
    for (const [c, b] of this.colorButtons) b.setAttribute('aria-pressed', String(c === color))
    if (pickPen) {
      this.setTool('pen')
      this.savePrefs({ color })
    }
    this.updateToolUi()
  }

  private setHighlightColor(color: HighlightColor, pick = true): void {
    if (color !== this.highlightColor) touchLog.add(`colore dell'evidenziatore: ${highlightName(color).toLowerCase()}`)
    this.highlightColor = color
    for (const [c, b] of this.highlightButtons) b.setAttribute('aria-pressed', String(c === color))
    if (pick) {
      this.setTool('highlight')
      this.savePrefs({ highlight: color })
    }
    this.updateToolUi()
  }

  private setSize(tool: SizedTool, choice: SizeChoice): void {
    touchLog.add(`misura ${TOOL_NAMES[tool] === 'gomma' ? 'della gomma' : `dell${tool === 'pen' ? 'a penna' : "'evidenziatore"}`}: ${SIZE_NAMES[tool][choice]}`)
    this.sizes[tool] = choice
    this.savePrefs({ sizes: { ...this.sizes } })
    this.updateToolUi()
    this.scheduleLive()
  }

  private setAutoShapes(on: boolean): void {
    touchLog.add(`forme automatiche: ${on ? 'accese' : 'spente'}`)
    this.autoShapes = on
    this.el.dataset.shapes = on ? 'auto' : 'hold'
    this.savePrefs({ shapes: on })
  }

  private setEraserMode(mode: EraserMode): void {
    touchLog.add(`gomma: ${MODE_NAMES[mode].toLowerCase()}`)
    this.eraserMode = mode
    this.el.dataset.eraser = mode
    this.savePrefs({ eraser: mode })
    this.updateToolUi()
    this.scheduleLive()
  }

  /**
   * I pulsanti dello strumento scelto: i colori e lo spessore della penna o dell'evidenziatore, o per
   * la gomma come cancella e quanto è grande.
   */
  private updateToolUi(): void {
    if (!this.sizeButton) return
    const tool = this.tool
    this.inkGroup.classList.toggle('is-off', tool !== 'pen')
    this.highlightGroup.classList.toggle('is-off', tool !== 'highlight')
    this.modeButton.classList.toggle('is-off', tool !== 'eraser')
    this.lassoGroup.classList.toggle('is-off', tool !== 'lasso')
    this.sizeButton.classList.toggle('is-off', tool === 'lasso')
    this.modeButton.querySelector('.board-mode-label')!.textContent = MODE_NAMES[this.eraserMode]
    this.modeButton.title = `Gomma: ${MODE_NAMES[this.eraserMode].toLowerCase()} (cambia come cancella)`
    this.modeButton.setAttribute('aria-label', this.modeButton.title)
    // Il lazo non ha misure: il pulsante (nascosto) resta com'era, così la barra non cambia.
    if (tool === 'lasso') {
      if (this.menu && this.menuAnchor) this.openMenu(this.menuAnchor)
      return
    }
    const name = SIZE_NAMES[tool][this.sizes[tool]]
    const label = tool === 'eraser' ? `Grandezza della gomma: ${name}` : `Spessore ${tool === 'pen' ? 'della penna' : "dell'evidenziatore"}: ${name}`
    this.sizeButton.title = label
    this.sizeButton.setAttribute('aria-label', label)
    const palette = BOARD_PALETTES[this.theme]
    this.sizeButton.style.setProperty('--dot', `${DOT_SIZES[this.sizes[tool]]}px`)
    this.sizeButton.style.setProperty('--swatch', tool === 'pen' ? palette.ink[this.color] : tool === 'highlight' ? palette.highlight[this.highlightColor] : 'transparent')
    this.sizeButton.classList.toggle('is-eraser', tool === 'eraser')
    if (this.menu && this.menuAnchor) this.openMenu(this.menuAnchor)
  }

  // ——— Il menu delle misure (e del modo della gomma) ———

  private toggleMenu(anchor: HTMLElement): void {
    if (this.menu && this.menuAnchor === anchor) return this.closeMenu()
    this.openMenu(anchor)
  }

  private closeMenu(): void {
    this.menu?.remove()
    this.menu = null
    this.menuAnchor = null
  }

  /**
   * Il menu sotto il pulsante: le tre misure dello strumento e, per la gomma, come cancella. Il
   * pulsante del modo apre solo i modi, quello della misura solo le misure, lo strumento premuto di
   * nuovo tutti e due.
   */
  private openMenu(anchor: HTMLElement): void {
    this.menu?.remove()
    const tool = this.tool
    if (tool === 'lasso') return this.openLassoHelp(anchor)
    const modes = tool === 'eraser' && anchor !== this.sizeButton
    const sizesToo = anchor !== this.modeButton
    const option = (label: string, pressed: boolean, pick: () => void, extra: Node | null = null, help = '') =>
      h(
        'button',
        {
          class: 'board-menu-option',
          attrs: { type: 'button', 'aria-pressed': String(pressed) },
          on: {
            click: () => {
              pick()
              this.closeMenu()
              this.focus()
            },
          },
        },
        extra,
        help ? h('span', { class: 'board-menu-text' }, h('strong', {}, label), h('small', {}, help)) : h('span', {}, label),
      )
    const parts: Node[] = []
    if (modes) {
      parts.push(
        h('p', { class: 'board-menu-title' }, 'Come cancella'),
        option(MODE_NAMES.area, this.eraserMode === 'area', () => this.setEraserMode('area'), null, 'Cancella solo dove passa; se la muovi veloce si allarga'),
        option(MODE_NAMES.stroke, this.eraserMode === 'stroke', () => this.setEraserMode('stroke'), null, 'Tocca una linea e la cancella tutta'),
      )
    }
    if (sizesToo) {
      parts.push(h('p', { class: 'board-menu-title' }, tool === 'eraser' ? 'Grandezza' : 'Spessore'))
      const sizes = h('div', { class: 'board-menu-sizes' })
      for (const choice of [0, 1, 2] as SizeChoice[]) {
        const dot = h('span', { class: 'board-size-dot' })
        dot.style.setProperty('--dot', `${DOT_SIZES[choice]}px`)
        sizes.append(option(SIZE_NAMES[tool][choice], this.sizes[tool] === choice, () => this.setSize(tool, choice), dot))
      }
      parts.push(sizes)
    }
    if (sizesToo && tool === 'pen') {
      // Le forme automatiche: l'interruttore lascia il menu aperto, nella posizione nuova.
      const toggle = h(
        'button',
        {
          class: 'board-menu-switch',
          attrs: { type: 'button', role: 'switch', 'aria-checked': String(this.autoShapes) },
          on: {
            click: () => {
              this.setAutoShapes(!this.autoShapes)
              this.openMenu(anchor)
              this.menu?.querySelector<HTMLElement>('.board-menu-switch')?.focus()
            },
          },
        },
        h('span', { class: 'board-menu-text' }, h('strong', {}, 'Forme automatiche'), h('small', {}, 'Linee e figure diventano precise da sole. Anche senza: alla fine del tratto tieni ferma la penna.')),
        h('span', { class: 'board-switch', attrs: { 'aria-hidden': 'true' } }),
      )
      parts.push(h('span', { class: 'board-menu-sep', attrs: { 'aria-hidden': 'true' } }), toggle)
    } else if (sizesToo && tool === 'highlight') {
      parts.push(h('p', { class: 'board-menu-hint' }, 'Alla fine del tratto tieni ferma la penna: la linea diventa dritta.'))
    }
    const menu = h('div', { class: `board-menu${tool === 'eraser' ? ' is-eraser' : ''}`, attrs: { role: 'group', 'aria-label': tool === 'eraser' ? 'Gomma' : tool === 'pen' ? 'Penna' : 'Evidenziatore' } }, parts)
    menu.style.setProperty('--swatch', this.sizeButton.style.getPropertyValue('--swatch'))
    this.showMenu(menu, anchor)
  }

  /** Il menu sotto il pulsante, dentro la lavagna (che lo posiziona dal bordo della parte dove si scrive). */
  private showMenu(menu: HTMLElement, anchor: HTMLElement): void {
    this.el.append(menu)
    this.menu = menu
    this.menuAnchor = anchor
    const pane = this.stage.getBoundingClientRect()
    const at = anchor.getBoundingClientRect()
    const width = menu.offsetWidth
    const left = Math.max(8, Math.min(pane.width - width - 8, at.left + at.width / 2 - pane.left - width / 2))
    menu.style.left = `${left}px`
    menu.style.top = `${at.bottom - pane.top + 8}px`
  }

  /** Il lazo premuto di nuovo: come si usa. */
  private openLassoHelp(anchor: HTMLElement): void {
    const menu = h(
      'div',
      { class: 'board-menu', attrs: { role: 'group', 'aria-label': 'Selezione' } },
      h('p', { class: 'board-menu-title' }, 'Selezione'),
      h(
        'p',
        { class: 'board-menu-hint' },
        'Disegna intorno a quello che vuoi prendere, o tocca una linea. Poi trascinalo per spostarlo, tira il pallino nell\'angolo per ingrandirlo e toccalo per il menu: taglia, copia, duplica, elimina e colore.',
      ),
    )
    this.showMenu(menu, anchor)
  }

  private savePrefs(changes: Prefs): void {
    writeJson(PREFS_KEY, { ...loadPrefs(), ...changes })
  }

  /** Che cosa fa lo strumento, per il registro dei tocchi. */
  private verb(tool: Tool): string {
    if (tool === 'lasso') return this.selection ? 'seleziona (c\'è una selezione)' : 'seleziona'
    return tool === 'pen' ? 'scrive' : tool === 'highlight' ? 'evidenzia' : `cancella (${MODE_NAMES[this.eraserMode].toLowerCase()})`
  }

  /** La penna sta scrivendo, o si è appena alzata: un tocco adesso è la mano che si appoggia. */
  private penNear(): boolean {
    return this.action?.type === 'pen' || performance.now() - this.lastPen < PALM_MS
  }

  /** Si è usata una penna: da qui un dito solo non fa niente, due dita spostano la lavagna, e il palmo non scrive. */
  private rememberPen(): void {
    if (this.penMode) return
    this.penMode = true
    this.el.dataset.pen = 'true'
    this.savePrefs({ pen: true })
    touchLog.add('→ prima penna su questo dispositivo: da ora un dito solo non fa niente')
    // Il tratto fatto col dito un attimo prima era il palmo, appoggiato prima della penna.
    const last = this.lastTouchStep
    if (last && performance.now() - last.at < 900 && this.undoStack[this.undoStack.length - 1] === last.step) {
      touchLog.add('→ tolto il tratto fatto un attimo prima col dito: era il palmo')
      this.undoStack.pop()
      // Diventato una figura: anche il passo prima, quello del tratto a mano, se ne va.
      if (last.step.pair && this.undoStack[this.undoStack.length - 1]?.added[0] === last.step.removed[0]) this.undoStack.pop()
      this.removeStrokes(last.step.added.map((s) => s.id))
      this.persist({ remove: last.step.added.map((s) => s.id) })
      this.render()
    }
    this.lastTouchStep = null
  }

  // ——— Puntatori ———

  /** La posizione dell'evento sullo schermo, rispetto alla lavagna (`r`: il suo riquadro, se già misurato). */
  private local(ev: MouseEvent, r: DOMRect = this.stage.getBoundingClientRect()): Pt {
    return { x: ev.clientX - r.left, y: ev.clientY - r.top }
  }

  private world(p: Pt): Pt {
    return { x: this.view.x + p.x / this.view.zoom, y: this.view.y + p.y / this.view.zoom }
  }

  private capture(ev: PointerEvent): void {
    try {
      this.stage.setPointerCapture(ev.pointerId)
    } catch {
      /* senza, il tratto finisce se il puntatore esce dalla lavagna */
    }
  }

  private onDown(ev: PointerEvent): void {
    if (!this.note) return
    ev.preventDefault()
    this.focus()
    const pos = this.local(ev)
    if (ev.pointerType === 'touch') return this.touchDown(ev, pos)
    if (ev.pointerType === 'pen') {
      this.lastPen = performance.now()
      this.rememberPen()
      // Le dita e il palmo appoggiati: non scrivono e non spostano niente finché non si alzano.
      this.dropTouches()
      if (this.action) return void touchLog.add(`→ penna ignorata: c'è già ${ACTION_NAMES[this.action.kind]}`)
      this.capture(ev)
      const tool = penErases(ev) ? 'eraser' : this.tool
      touchLog.add(`→ penna: ${this.verb(tool)}${penErases(ev) ? ' (gomma della penna)' : ''}`)
      return this.startTool(ev, pos, tool)
    }
    if (this.action) return void touchLog.add(`→ ${ev.pointerType} ignorato: c'è già ${ACTION_NAMES[this.action.kind]}`)
    if (ev.button === 1 || (ev.button === 0 && this.spaceDown)) {
      this.capture(ev)
      touchLog.add(`→ ${ev.pointerType}: sposta la lavagna`)
      this.startPan(ev.pointerId, ev.pointerType, pos)
    } else if (ev.button === 0) {
      this.capture(ev)
      touchLog.add(`→ ${ev.pointerType}: ${this.verb(this.tool)}`)
      this.startTool(ev, pos, this.tool)
    }
  }

  private touchDown(ev: PointerEvent, pos: Pt): void {
    // La mano che si appoggia mentre si scrive con la penna, o appena dopo: non conta finché non si alza.
    const palm = this.penMode && this.penNear()
    this.touches.set(ev.pointerId, { ...pos, ignored: palm })
    if (palm) {
      const why = this.action?.type === 'pen' ? 'la penna sta scrivendo' : `la penna si è alzata ${Math.round(performance.now() - this.lastPen)} ms fa`
      return void touchLog.add(`→ mano (${why}): non conta finché non si alza`)
    }
    const active = [...this.touches].filter(([, t]) => !t.ignored).map(([id]) => id)
    const a = this.action
    if (active.length === 1) {
      if (a) return void touchLog.add(`→ dito ignorato: c'è già ${ACTION_NAMES[a.kind]}`)
      this.capture(ev)
      // Con la penna un dito solo non fa niente: è quasi sempre il palmo. Si sposta con due dita.
      if (this.penMode) return void touchLog.add('→ un dito solo con la penna: non fa niente')
      touchLog.add(`→ un dito: ${this.verb(this.tool)}`)
      this.startTool(ev, pos, this.tool)
    } else if (active.length === 2) {
      if (a && a.type !== 'touch') return void touchLog.add(`→ secondo dito ignorato: c'è già ${ACTION_NAMES[a.kind]} (${a.type})`)
      // Il secondo dito: si sposta e si ingrandisce. Il tratto appena cominciato col primo era l'inizio del gesto.
      const young = a?.kind === 'draw' && !(performance.now() - a.started > YOUNG.ms || a.travel > YOUNG.px)
      touchLog.add(`→ due dita: spostano e ingrandiscono${young ? ' (il tratto appena cominciato col primo dito era l\'inizio del gesto: tolto)' : ''}`)
      if (a?.kind === 'draw') this.finishDraw(a, !young)
      else if (a?.kind === 'erase') this.finishErase(a)
      else if (a?.kind === 'pan') this.finishPan()
      // Il lazo o la selezione appena presa col primo dito: era l'inizio del gesto.
      else if (a?.kind === 'lasso' || a?.kind === 'move') this.cancelAction()
      this.capture(ev)
      this.startPinch(active as [number, number])
    } else {
      this.touches.get(ev.pointerId)!.ignored = true
      touchLog.add('→ terzo dito: non conta')
    }
  }

  private onMove(ev: PointerEvent): void {
    const a = this.action
    // Solo la penna che tocca: quella sospesa sopra (sugli iPad che la sentono) non conta.
    if (ev.pointerType === 'pen' && ev.buttons) this.lastPen = performance.now()
    if (ev.pointerType === 'touch') {
      const t = this.touches.get(ev.pointerId)
      if (!t || t.ignored) return
      Object.assign(t, this.local(ev))
      if (a?.kind === 'pinch' && a.pointers.includes(ev.pointerId)) return this.pinchMove(a)
    }
    if (!a || a.kind === 'pinch' || a.pointer !== ev.pointerId) {
      this.hover(ev)
      return
    }
    const rect = this.stage.getBoundingClientRect()
    if (a.kind === 'draw') {
      for (const e of coalesced(ev)) this.drawTo(a, this.local(e, rect), e)
      this.watchHold(a, this.local(ev, rect))
      this.scheduleLive()
    } else if (a.kind === 'erase') {
      for (const e of coalesced(ev)) this.eraseTo(a, this.local(e, rect), e.timeStamp)
      this.cursor = this.local(ev, rect)
      this.scheduleLive()
    } else if (a.kind === 'lasso') {
      for (const e of coalesced(ev)) this.lassoTo(a, this.local(e, rect))
      this.scheduleLive()
    } else if (a.kind === 'move') {
      this.moveTo(a, this.local(ev, rect))
    } else {
      const pos = this.local(ev)
      this.moveView((a.last.x - pos.x) / this.view.zoom, (a.last.y - pos.y) / this.view.zoom)
      a.last = pos
    }
  }

  /**
   * Con il mouse o la penna sospesa sopra: il cerchio della gomma segue il puntatore e, sopra la
   * selezione, la freccia dice che la si sposta (o, sul pallino, che la si ingrandisce).
   */
  private hover(ev: PointerEvent): void {
    if (ev.pointerType === 'touch') return
    const over = this.selection && !this.action ? this.selectionHit(this.local(ev), ev.pointerType) : null
    this.stage.classList.toggle('is-move', over === 'inside')
    this.stage.classList.toggle('is-resize', over === 'handle')
    const next = this.tool === 'eraser' ? this.local(ev) : null
    if (!next && !this.cursor) return
    this.cursor = next
    this.scheduleLive()
  }

  private onUp(ev: PointerEvent, cancelled: boolean): void {
    if (ev.pointerType === 'pen') this.lastPen = performance.now()
    if (ev.pointerType === 'touch') this.touches.delete(ev.pointerId)
    const a = this.action
    if (!a) return
    // Un tocco annullato dal sistema (sull'iPad, quando capisce che era il palmo): quello che
    // stava facendo si annulla, come se non fosse successo.
    const dropped = cancelled && a.type === 'touch'
    if (dropped && (a.kind === 'pinch' ? a.pointers.includes(ev.pointerId) : a.pointer === ev.pointerId))
      touchLog.add(`→ tocco annullato dal sistema: ${ACTION_NAMES[a.kind]} annullato, la lavagna torna com'era`)
    if (a.kind === 'pinch') {
      if (!a.pointers.includes(ev.pointerId)) return
      if (dropped) return this.cancelAction()
      this.finishPinch()
      // Il dito rimasto continua a spostare la lavagna.
      const rest = a.pointers.find((id) => id !== ev.pointerId)!
      const t = this.touches.get(rest)
      if (t && !t.ignored) this.startPan(rest, 'touch', t)
      return
    }
    if (a.pointer !== ev.pointerId) return
    if (dropped && a.kind !== 'draw') this.cancelAction()
    else if (a.kind === 'draw') this.finishDraw(a, !dropped)
    else if (a.kind === 'erase') this.finishErase(a)
    else if (a.kind === 'lasso') this.finishLasso(a)
    else if (a.kind === 'move') this.finishMove(a)
    else this.finishPan()
  }

  /** Un'azione è finita: se intanto un'altra scheda ha cambiato la lavagna, la si rilegge. */
  private ended(): void {
    const pending = this.pendingLoad
    if (!pending) return
    this.pendingLoad = null
    this.load(pending.first)
  }

  /** Arriva la penna: quello che stavano facendo dita o palmo si annulla, come se non fosse successo. */
  private dropTouches(): void {
    const fingers = [...this.touches.values()].filter((t) => !t.ignored).length
    for (const t of this.touches.values()) t.ignored = true
    const busy = this.action?.type === 'touch' ? this.action.kind : null
    if (fingers || busy) touchLog.add(`→ arriva la penna: ${fingers} ${fingers === 1 ? 'dito appoggiato non conta' : 'dita appoggiate non contano'} più${busy ? `, e ${ACTION_NAMES[busy]} si annulla` : ''}`)
    if (busy) this.cancelAction()
  }

  private cancelAction(): void {
    const a = this.action
    if (!a) return
    this.action = null
    if (a.kind === 'draw') clearTimeout(a.holdTimer)
    if (a.kind === 'erase') {
      this.removeStrokes(a.added.keys())
      this.addStrokes([...a.removed.values()])
      this.render()
    } else if (a.kind === 'pan' || a.kind === 'pinch') {
      this.setView(a.before, false)
      this.stage.classList.remove('is-panning')
    } else if (a.kind === 'move') {
      // La selezione torna dov'era (i tratti non sono ancora cambiati: si vedevano solo spostati).
      if (a.moved) this.render()
      if (a.menuWasOpen) this.openSelMenu()
    }
    this.cursor = null
    this.renderLive()
    this.ended()
  }

  // ——— Scrivere ———

  private startTool(ev: PointerEvent, pos: Pt, tool: Tool): void {
    this.closeMenu()
    if (tool === 'lasso') return this.startSelect(ev, pos)
    this.closeSelMenu()
    const w = this.world(pos)
    if (tool === 'eraser') {
      const radius = TOOL_SIZES.eraser[this.sizes.eraser]
      const a: EraseAction = {
        kind: 'erase',
        pointer: ev.pointerId,
        type: ev.pointerType,
        last: w,
        removed: new Map(),
        added: new Map(),
        mode: this.eraserMode,
        screen: pos,
        time: ev.timeStamp,
        speed: 0,
        radius,
      }
      this.action = a
      this.cursor = pos
      this.eraseTo(a, pos, ev.timeStamp)
      this.scheduleLive()
      return
    }
    const pen = ev.pointerType === 'pen'
    const highlight = tool === 'highlight'
    const stroke: Stroke = {
      id: newStrokeId(),
      t: Date.now(),
      color: highlight ? this.highlightColor : this.color,
      size: TOOL_SIZES[highlight ? 'highlight' : 'pen'][this.sizes[highlight ? 'highlight' : 'pen']],
      pen,
      points: [w.x, w.y, pressureOf(ev, pen)],
      ...(highlight ? { highlight: true } : {}),
    }
    const a: DrawAction = { kind: 'draw', pointer: ev.pointerId, type: ev.pointerType, stroke, started: performance.now(), travel: 0, last: pos, holdAt: pos, holdTimer: 0, snapped: null }
    a.holdTimer = window.setTimeout(() => this.holdShape(a), HOLD_MS)
    this.action = a
    this.scheduleLive()
  }

  /** La punta si è mossa: se è andata oltre `HOLD_SLOP`, si ricomincia ad aspettare che stia ferma. */
  private watchHold(a: DrawAction, pos: Pt): void {
    if (a.snapped || Math.hypot(pos.x - a.holdAt.x, pos.y - a.holdAt.y) < HOLD_SLOP) return
    a.holdAt = pos
    clearTimeout(a.holdTimer)
    a.holdTimer = window.setTimeout(() => this.holdShape(a), HOLD_MS)
  }

  /** La punta è ferma da `HOLD_MS`: se il tratto somiglia a una figura, diventa quella (e la penna la regola). */
  private holdShape(a: DrawAction): void {
    if (this.action !== a || a.snapped) return
    const shape = recognize(pointsOf(a.stroke), { unit: 1 / this.view.zoom })
    if (!shape) return void touchLog.add('→ punta ferma: il tratto non somiglia a una figura')
    const pts = a.stroke.points
    const anchor = { x: pts[pts.length - 3], y: pts[pts.length - 2] }
    a.snapped = { base: shape, anchor, shape }
    touchLog.add(`→ punta ferma: diventa ${SHAPE_NAMES[shape.kind]}`)
    this.scheduleLive()
  }

  private drawTo(a: DrawAction, pos: Pt, e: PointerEvent): void {
    // Già una figura: la penna la regola (la allunga, la gira, la ingrandisce).
    if (a.snapped) {
      a.snapped.shape = adjustShape(a.snapped.base, a.snapped.anchor, this.world(pos))
      return
    }
    const d = Math.hypot(pos.x - a.last.x, pos.y - a.last.y)
    // Punti quasi uguali non servono: pesano e basta.
    if (d < 0.75) return
    a.travel += d
    a.last = pos
    const w = this.world(pos)
    a.stroke.points.push(w.x, w.y, pressureOf(e, a.stroke.pen))
  }

  private finishDraw(a: DrawAction, keep: boolean): void {
    this.action = null
    clearTimeout(a.holdTimer)
    if (touchLog.on) touchLog.add(keep ? `tratto: ${strokeSummary(a)}` : 'tratto scartato')
    if (keep) {
      const s = { ...a.stroke, points: roundPoints(a.stroke.points) }
      // La figura: quella tenendo ferma la penna o, con le forme automatiche, quella che somiglia (solo la penna).
      const shape = a.snapped?.shape ?? (this.autoShapes && !s.highlight ? recognize(pointsOf(s), { unit: 1 / this.view.zoom, strict: true }) : null)
      const figure: Stroke | null = shape && {
        id: newStrokeId(),
        t: s.t,
        color: s.color,
        size: s.size,
        pen: s.pen,
        points: roundPoints(shapePoints(shape).flatMap((p) => [p.x, p.y, 0.5])),
        ...(s.highlight ? { highlight: true } : {}),
        shape: true,
      }
      const drawn = figure ?? s
      this.addStrokes([drawn])
      // Con la figura due passi: Annulla toglie prima la figura e rimette il tratto a mano, poi anche quello.
      if (figure) this.record({ removed: [], added: [s] })
      const step: Step = figure ? { removed: [s], added: [figure], pair: true } : { removed: [], added: [s] }
      this.record(step)
      if (shape) {
        this.el.dataset.shape = shape.kind
        touchLog.add(`figura (${a.snapped ? 'punta ferma' : 'forme automatiche'}): ${SHAPE_NAMES[shape.kind]}`)
      }
      this.lastTouchStep = a.type === 'touch' ? { step, at: performance.now() } : null
      this.persist({ put: [drawn] })
      if (this.frame) this.render()
      else this.paint(drawn)
    }
    this.renderLive()
    this.ended()
  }

  /** La gomma arriva in `pos` (sullo schermo) all'istante `time`: cancella lungo la strada fatta. */
  private eraseTo(a: EraseAction, pos: Pt, time: number): void {
    // Dove passa si allarga con la velocità (media degli ultimi movimenti, per non tremare).
    const speed = Math.hypot(pos.x - a.screen.x, pos.y - a.screen.y) / Math.max(1, time - a.time)
    a.speed = a.speed * 0.7 + speed * 0.3
    a.screen = pos
    a.time = time
    const base = TOOL_SIZES.eraser[this.sizes.eraser]
    a.radius = a.mode === 'area' ? base * eraserGrowth(a.speed) : base
    const p = this.world(pos)
    const r = a.radius / this.view.zoom
    const reach: Box = {
      minX: Math.min(a.last.x, p.x) - r,
      minY: Math.min(a.last.y, p.y) - r,
      maxX: Math.max(a.last.x, p.x) + r,
      maxY: Math.max(a.last.y, p.y) + r,
    }
    let changed = false
    for (const s of [...this.strokes.values()]) {
      if (!boxesTouch(this.boxOf(s), reach)) continue
      // Linea intera: basta toccarla, e va via tutta.
      if (a.mode === 'stroke') {
        if (!strokeTouched(s, a.last, p, r)) continue
        changed = true
        this.removeStrokes([s.id])
        a.removed.set(s.id, s)
        continue
      }
      const pieces = eraseStroke(s, a.last, p, r)
      if (!pieces) continue
      changed = true
      this.removeStrokes([s.id])
      if (a.added.has(s.id)) a.added.delete(s.id)
      else a.removed.set(s.id, s)
      const rest = piecesOf(s, pieces.map(roundPoints))
      this.addStrokes(rest)
      for (const piece of rest) a.added.set(piece.id, piece)
    }
    a.last = p
    if (changed) this.scheduleRender()
  }

  private finishErase(a: EraseAction): void {
    this.action = null
    if (a.type === 'touch') this.cursor = null
    const removed = [...a.removed.values()]
    const added = [...a.added.values()]
    touchLog.add(removed.length ? `gomma: ${removed.length} ${removed.length === 1 ? 'tratto toccato' : 'tratti toccati'}, ${added.length} ${added.length === 1 ? 'pezzo rimasto' : 'pezzi rimasti'}` : 'gomma: niente da cancellare')
    if (removed.length || added.length) {
      this.record({ removed, added })
      this.persist({ put: added, remove: removed.map((s) => s.id) })
      // La gomma della penna con il lazo: di quello che era selezionato resta quello che c'è ancora.
      this.pruneSelection()
    }
    this.renderLive()
    this.ended()
  }

  // ——— Selezionare (il lazo), spostare, ingrandire, copiare ———

  /** I tratti selezionati, nell'ordine in cui si disegnano. */
  private selected(): Stroke[] {
    const sel = this.selection
    return sel ? this.sorted().filter((s) => sel.ids.has(s.id)) : []
  }

  /** La parte della lavagna che si vede. */
  private visibleBox(): Box {
    const { x, y, zoom } = this.view
    return { minX: x, minY: y, maxX: x + this.size.w / zoom, maxY: y + this.size.h / zoom }
  }

  /** Il riquadro della selezione sullo schermo, con lo spazio intorno; com'è o spostato da `t`. */
  private screenBox(box: Box, t: Transform = IDENTITY): Box {
    const b = moveBox(box, t)
    const { x, y, zoom } = this.view
    return {
      minX: (b.minX - x) * zoom - SELECT_PAD,
      minY: (b.minY - y) * zoom - SELECT_PAD,
      maxX: (b.maxX - x) * zoom + SELECT_PAD,
      maxY: (b.maxY - y) * zoom + SELECT_PAD,
    }
  }

  /** Dove tocca il puntatore (sullo schermo): sul pallino dell'angolo, dentro la selezione o fuori. */
  private selectionHit(pos: Pt, type: string): 'handle' | 'inside' | null {
    const sel = this.selection
    if (!sel) return null
    const b = this.screenBox(sel.box)
    if (Math.hypot(pos.x - b.maxX, pos.y - b.maxY) <= (type === 'mouse' ? HANDLE_REACH.mouse : HANDLE_REACH.touch)) return 'handle'
    return pos.x >= b.minX && pos.x <= b.maxX && pos.y >= b.minY && pos.y <= b.maxY ? 'inside' : null
  }

  /** Seleziona questi tratti (nessuno: la selezione si toglie); `menu`: apre anche il menu, come dopo il lazo. */
  private select(list: Stroke[], menu = true): void {
    if (!list.length) return this.clearSelection()
    this.selection = { ids: new Set(list.map((s) => s.id)), box: selectionBox(list)! }
    this.el.dataset.selected = String(list.length)
    this.render()
    this.renderLive()
    if (menu) this.openSelMenu()
    else this.closeSelMenu()
  }

  private clearSelection(): void {
    this.closeSelMenu()
    if (!this.selection) return
    this.selection = null
    this.el.dataset.selected = '0'
    this.stage.classList.remove('is-move', 'is-resize')
    this.render()
    this.renderLive()
  }

  /** Dopo la gomma, Annulla o un'altra scheda: restano selezionati i tratti che ci sono ancora. */
  private pruneSelection(): void {
    const sel = this.selection
    if (!sel) return
    const list = [...sel.ids].map((id) => this.strokes.get(id)).filter((s): s is Stroke => !!s)
    if (list.length !== sel.ids.size) this.select(list, !!this.selMenu)
  }

  /**
   * Il lazo tocca la lavagna: sulla selezione la prende, per spostarla o (dal pallino nell'angolo)
   * ingrandirla; fuori la toglie e comincia un lazo nuovo.
   */
  private startSelect(ev: PointerEvent, pos: Pt): void {
    const sel = this.selection
    const hit = this.selectionHit(pos, ev.pointerType)
    if (sel && hit) {
      const menuWasOpen = this.selMenu?.dataset.kind === 'selection'
      this.closeSelMenu()
      // Ingrandendo: non più piccola di 16 pixel, e nessuno spessore oltre quello che si salva.
      const side = Math.max(sel.box.maxX - sel.box.minX, sel.box.maxY - sel.box.minY) * this.view.zoom
      const thickest = Math.max(...this.selected().map((s) => s.size))
      this.action = {
        kind: 'move',
        pointer: ev.pointerId,
        type: ev.pointerType,
        mode: hit === 'handle' ? 'scale' : 'move',
        from: this.world(pos),
        screen: pos,
        moved: false,
        transform: { ...IDENTITY, origin: { x: sel.box.minX, y: sel.box.minY } },
        limits: [Math.min(1, 16 / Math.max(1, side)), Math.max(1, Math.min(20, MAX_SIZE / thickest))],
        menuWasOpen,
      }
      touchLog.add(hit === 'handle' ? '→ sul pallino della selezione: la ingrandisce' : '→ sulla selezione: la sposta (o, toccandola, il menu)')
      return
    }
    const cleared = !!sel
    if (sel) touchLog.add('→ fuori dalla selezione: la toglie')
    this.clearSelection()
    this.action = { kind: 'lasso', pointer: ev.pointerId, type: ev.pointerType, points: [this.world(pos)], last: pos, travel: 0, cleared }
    this.scheduleLive()
  }

  private lassoTo(a: LassoAction, pos: Pt): void {
    const d = Math.hypot(pos.x - a.last.x, pos.y - a.last.y)
    if (d < 2) return
    a.travel += d
    a.last = pos
    a.points.push(this.world(pos))
  }

  private finishLasso(a: LassoAction): void {
    this.action = null
    if (a.travel < TAP_PX) {
      // Un tocco: la linea toccata; dove non c'è niente, «Incolla» (se si è copiato qualcosa).
      const p = a.points[0]
      const reach = (a.type === 'mouse' ? TAP_REACH.mouse : TAP_REACH.touch) / this.view.zoom
      const hit = strokeAt(this.sorted(), p, reach, (s) => this.boxOf(s))
      if (hit) {
        touchLog.add('lazo: toccata una linea, selezionata')
        this.select([hit])
      } else if (clipboard && !a.cleared) {
        touchLog.add('lazo: toccato un punto vuoto, il menu per incollare')
        this.openPasteMenu(p)
      } else touchLog.add('lazo: toccato un punto vuoto')
    } else {
      const got = lassoed(this.sorted(), a.points, (s) => this.boxOf(s))
      touchLog.add(`lazo: ${got.length ? `${got.length} ${got.length === 1 ? 'tratto preso' : 'tratti presi'}` : 'niente dentro'}`)
      this.select(got)
    }
    this.renderLive()
    this.ended()
  }

  /** La selezione segue il puntatore: spostata o, dal pallino, ingrandita (l'angolo opposto sta fermo). */
  private moveTo(a: MoveAction, pos: Pt): void {
    const sel = this.selection
    if (!sel) return
    if (!a.moved) {
      if (Math.hypot(pos.x - a.screen.x, pos.y - a.screen.y) < TAP_PX) return
      a.moved = true
      // Da qui i tratti presi si disegnano sopra, dove sono adesso (vedi render e renderLive).
      this.render()
    }
    const w = this.world(pos)
    const dx = w.x - a.from.x
    const dy = w.y - a.from.y
    if (a.mode === 'move') a.transform = { ...a.transform, dx, dy }
    else {
      const b = sel.box
      const corner = { x: b.maxX, y: b.maxY }
      const scale = handleScale(a.transform.origin, corner, { x: corner.x + dx, y: corner.y + dy }, a.limits[0], a.limits[1])
      a.transform = { ...a.transform, scale }
    }
    this.scheduleLive()
  }

  private finishMove(a: MoveAction): void {
    this.action = null
    const t = a.transform
    if (!a.moved || (!t.dx && !t.dy && t.scale === 1)) {
      // Un tocco sulla selezione: apre o chiude il menu.
      if (a.moved) this.render()
      else touchLog.add(`selezione: toccata, menu ${a.menuWasOpen ? 'chiuso' : 'aperto'}`)
      if (!a.menuWasOpen || a.moved) this.openSelMenu()
      this.renderLive()
      return this.ended()
    }
    const before = this.selected()
    touchLog.add(a.mode === 'move' ? `selezione: spostata di ${Math.round(t.dx)}, ${Math.round(t.dy)}` : `selezione: ingrandita al ${Math.round(t.scale * 100)}%`)
    this.replaceSelected(before, transformStrokes(before, t))
    this.ended()
  }

  /**
   * I tratti selezionati `before` diventano `after` (spostati, ingranditi, d'altro colore; `keep`: quelli
   * selezionati che restano com'erano): un passo da annullare, e la selezione resta.
   */
  private replaceSelected(before: Stroke[], after: Stroke[], keep: Stroke[] = []): void {
    const ids = (list: Stroke[]) => list.map((s) => s.id)
    const next = [...keep, ...after]
    this.record({ removed: before, added: after, selection: { before: ids(this.selected()), after: ids(next) } })
    this.removeStrokes(ids(before))
    this.addStrokes(after)
    this.persist({ put: after, remove: ids(before) })
    this.select(next)
  }

  private deleteSelection(verb = 'eliminata'): void {
    const list = this.selected()
    if (!list.length || this.action) return
    const ids = list.map((s) => s.id)
    touchLog.add(`selezione: ${verb} (${list.length} ${list.length === 1 ? 'tratto' : 'tratti'})`)
    this.record({ removed: list, added: [], selection: { before: ids, after: [] } })
    this.removeStrokes(ids)
    this.persist({ remove: ids })
    this.clearSelection()
  }

  /** Copia (o taglia) la selezione negli appunti della lavagna. */
  private copySelection(cut = false): void {
    const list = this.selected()
    if (!list.length || this.action || !this.selection) return
    // Dopo Taglia la prima copia incollata va dov'era; dopo Copia un po' spostata, per vederla.
    clipboard = { strokes: list.map((s) => ({ ...s, points: s.points.slice() })), box: this.selection.box, shift: cut ? 0 : 1 }
    if (cut) this.deleteSelection('tagliata')
    else {
      touchLog.add(`selezione: copiata (${list.length} ${list.length === 1 ? 'tratto' : 'tratti'})`)
      this.closeSelMenu()
    }
    this.updateState()
  }

  /**
   * Incolla gli appunti della lavagna: dove si è toccato (`at`), se no accanto all'originale (se si
   * vede, un po' più in là a ogni volta) o in mezzo alla vista. Quello incollato resta selezionato.
   */
  private paste(at?: Pt): void {
    const clip = clipboard
    if (!clip || this.action || !this.note) return
    const v = this.visibleBox()
    let move = at ? centerOn(clip.box, at) : null
    if (!move) {
      const d = (COPY_SHIFT * clip.shift) / this.view.zoom
      const cx = (clip.box.minX + clip.box.maxX) / 2 + d
      const cy = (clip.box.minY + clip.box.maxY) / 2 + d
      move = cx > v.minX && cx < v.maxX && cy > v.minY && cy < v.maxY ? { dx: d, dy: d } : centerOn(clip.box, { x: (v.minX + v.maxX) / 2, y: (v.minY + v.maxY) / 2 })
      clip.shift++
    }
    // Tutto dentro la vista, se ci sta.
    const fix = keepInside(moveBox(clip.box, { ...IDENTITY, ...move }), v, 8 / this.view.zoom)
    const copies = copyStrokes(clip.strokes, move.dx + fix.dx, move.dy + fix.dy, Date.now())
    touchLog.add(`incollati ${copies.length} ${copies.length === 1 ? 'tratto' : 'tratti'}`)
    this.addCopies(copies)
  }

  private duplicate(): void {
    const list = this.selected()
    if (!list.length || this.action) return
    const d = COPY_SHIFT / this.view.zoom
    touchLog.add(`selezione: duplicata (${list.length} ${list.length === 1 ? 'tratto' : 'tratti'})`)
    this.addCopies(copyStrokes(list, d, d, Date.now()))
  }

  /** Le copie (Incolla, Duplica) vanno sulla lavagna e diventano la selezione, con il lazo. */
  private addCopies(copies: Stroke[]): void {
    const before = this.selected().map((s) => s.id)
    if (this.tool !== 'lasso') this.setTool('lasso')
    this.record({ removed: [], added: copies, selection: { before, after: copies.map((s) => s.id) } })
    this.addStrokes(copies)
    this.persist({ put: copies })
    this.select(copies)
  }

  /** Un colore nuovo alla selezione: della penna alla scrittura, dell'evidenziatore agli evidenziatori. */
  private recolorSelection(color: InkColor | HighlightColor, highlight: boolean): void {
    const list = this.selected()
    if (!list.length || this.action) return
    const { before, after } = recolor(list, color, highlight)
    if (!before.length) return
    touchLog.add(`selezione: colore ${(highlight ? highlightName(color as HighlightColor) : inkName(color as InkColor, this.theme)).toLowerCase()} a ${before.length} ${before.length === 1 ? 'tratto' : 'tratti'}`)
    this.replaceSelected(before, after, list.filter((s) => !before.includes(s)))
  }

  private selectAll(): void {
    if (this.action || !this.strokes.size) return
    if (this.tool !== 'lasso') this.setTool('lasso')
    touchLog.add(`selezione: tutto (${this.strokes.size} tratti)`)
    this.select(this.sorted())
  }

  /** Le frecce spostano la selezione di un pixel (con Maiusc di dieci); quelle di seguito sono un passo solo. */
  private nudgeSelection(dx: number, dy: number): void {
    const list = this.selected()
    if (!list.length || this.action) return
    const ids = (l: Stroke[]) => l.map((s) => s.id)
    const after = transformStrokes(list, { ...IDENTITY, dx: dx / this.view.zoom, dy: dy / this.view.zoom })
    const top = this.undoStack[this.undoStack.length - 1]
    const merge = !!this.nudge && top === this.nudge.step && performance.now() - this.nudge.at < NUDGE_MS
    // Unito al passo prima: toglie gli originali e mette questi.
    const step: Step = merge
      ? { removed: top.removed, added: after, selection: { before: top.selection?.before ?? ids(list), after: ids(after) } }
      : { removed: list, added: after, selection: { before: ids(list), after: ids(after) } }
    if (merge) this.undoStack.pop()
    this.record(step)
    this.removeStrokes(ids(list))
    this.addStrokes(after)
    this.persist({ put: after, remove: ids(list) })
    this.nudge = { step, at: performance.now() }
    this.select(after, !!this.selMenu)
  }

  /** Il menu della selezione, sopra i tratti presi: Taglia, Copia, Duplica, Elimina e i colori. */
  private openSelMenu(): void {
    this.closeSelMenu()
    const list = this.selected()
    if (!list.length) return
    const run = (action: () => void) => () => {
      action()
      this.focus()
    }
    const item = (label: string, title: string, action: () => void, cls = '') =>
      h('button', { class: `board-sel-item${cls}`, title, attrs: { type: 'button' }, on: { click: run(action) } }, label)
    // I colori della penna se c'è scrittura (cambiano quella), se no quelli dell'evidenziatore.
    const highlight = list.every((s) => s.highlight)
    const kind = list.filter((s) => !!s.highlight === highlight)
    const current = kind.every((s) => s.color === kind[0].color) ? kind[0].color : null
    const palette = BOARD_PALETTES[this.theme]
    const colors = (highlight ? HIGHLIGHT_COLORS : INK_COLORS).map((c) => {
      const name = highlight ? highlightName(c as HighlightColor) : inkName(c as InkColor, this.theme)
      const b = h(
        'button',
        {
          class: `board-color${highlight ? ' is-highlight' : ''}`,
          title: name,
          attrs: { type: 'button', 'aria-label': `Colore: ${name.toLowerCase()}`, 'aria-pressed': String(c === current) },
          data: { recolor: c },
          on: { click: run(() => this.recolorSelection(c, highlight)) },
        },
        h('span', { class: 'board-swatch' }),
      )
      b.style.setProperty('--swatch', highlight ? palette.highlight[c as HighlightColor] : palette.ink[c as InkColor])
      return b
    })
    const menu = h(
      'div',
      { class: 'board-sel-menu', attrs: { role: 'toolbar', 'aria-label': `Selezione: ${list.length} ${list.length === 1 ? 'tratto' : 'tratti'}` }, data: { kind: 'selection' } },
      item('Taglia', 'Taglia (Ctrl+X)', () => this.copySelection(true)),
      item('Copia', 'Copia (Ctrl+C)', () => this.copySelection()),
      item('Duplica', 'Duplica (Ctrl+D)', () => this.duplicate()),
      item('Elimina', 'Elimina (Canc)', () => this.deleteSelection(), ' is-danger'),
      h('div', { class: 'board-sel-colors', attrs: { role: 'group', 'aria-label': 'Colore' } }, colors),
    )
    this.el.append(menu)
    this.selMenu = menu
    this.placeSelMenu()
  }

  /** Toccando col lazo dove non c'è niente: «Incolla» lì, come in Note di Apple. */
  private openPasteMenu(at: Pt): void {
    this.closeSelMenu()
    const button = h(
      'button',
      {
        class: 'board-sel-item',
        title: 'Incolla qui',
        attrs: { type: 'button' },
        on: {
          click: () => {
            this.closeSelMenu()
            this.paste(at)
            this.focus()
          },
        },
      },
      'Incolla',
    )
    const menu = h('div', { class: 'board-sel-menu', attrs: { role: 'toolbar', 'aria-label': 'Incolla' }, data: { kind: 'paste' } }, button)
    this.el.append(menu)
    this.selMenu = menu
    this.selMenuAt = at
    this.placeSelMenu()
  }

  private closeSelMenu(): void {
    this.selMenu?.remove()
    this.selMenu = null
    this.selMenuAt = null
  }

  /** Il menu sopra la selezione (sotto, se sopra c'è la barra; dentro, se non c'è posto): segue la vista. */
  private placeSelMenu(): void {
    const menu = this.selMenu
    if (!menu) return
    const at = this.selMenuAt
    let b: Box
    if (at) {
      const x = (at.x - this.view.x) * this.view.zoom
      const y = (at.y - this.view.y) * this.view.zoom
      b = { minX: x, minY: y, maxX: x, maxY: y }
    } else if (this.selection) b = this.screenBox(this.selection.box)
    else return this.closeSelMenu()
    const stage = this.stage.getBoundingClientRect()
    const top0 = this.toolsBar.getBoundingClientRect().bottom - stage.top + 8
    // In basso ci sono annulla, ripeti e l'ingrandimento.
    const bottom0 = this.size.h - 56
    const w = menu.offsetWidth
    const hgt = menu.offsetHeight
    let top = b.minY - hgt - 12
    if (top < top0) top = b.maxY + (at ? 12 : HANDLE_R + 10)
    if (top + hgt > bottom0) top = Math.max(top0, Math.min(bottom0 - hgt, b.minY + 8))
    menu.style.left = `${Math.max(8, Math.min(this.size.w - w - 8, (b.minX + b.maxX) / 2 - w / 2))}px`
    menu.style.top = `${top}px`
  }

  // ——— Spostare e ingrandire ———

  private startPan(pointer: number, type: string, pos: Pt): void {
    this.action = { kind: 'pan', pointer, type, last: { x: pos.x, y: pos.y }, before: { ...this.view } }
    this.stage.classList.add('is-panning')
  }

  private finishPan(): void {
    this.action = null
    touchLog.add(`vista: ingrandita al ${Math.round(this.view.zoom * 100)}%`)
    this.stage.classList.remove('is-panning')
    this.saveViewSoon()
    this.ended()
  }

  private startPinch(pointers: [number, number]): void {
    const [p, q] = pointers.map((id) => this.touches.get(id)!)
    this.action = {
      kind: 'pinch',
      pointers,
      type: 'touch',
      before: { ...this.view },
      mid: { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 },
      dist: Math.max(1, Math.hypot(p.x - q.x, p.y - q.y)),
      moving: false,
    }
  }

  private pinchMove(a: PinchAction): void {
    const p = this.touches.get(a.pointers[0])
    const q = this.touches.get(a.pointers[1])
    if (!p || !q) return
    const mid = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 }
    const dist = Math.max(1, Math.hypot(p.x - q.x, p.y - q.y))
    // Finché le dita si muovono appena la lavagna sta ferma: la mano che si posa trema un po'.
    if (!a.moving && Math.hypot(mid.x - a.mid.x, mid.y - a.mid.y) < SLOP && Math.abs(dist - a.dist) < SLOP) return
    if (!a.moving) touchLog.add('→ le dita si muovono: la lavagna le segue')
    a.moving = true
    const zoom = clampZoom((a.before.zoom * dist) / a.dist)
    // Il punto della lavagna che era sotto le dita resta sotto le dita.
    const wx = a.before.x + a.mid.x / a.before.zoom
    const wy = a.before.y + a.mid.y / a.before.zoom
    this.setView({ x: wx - mid.x / zoom, y: wy - mid.y / zoom, zoom }, false)
  }

  private finishPinch(): void {
    this.action = null
    touchLog.add(`vista: ingrandita al ${Math.round(this.view.zoom * 100)}%`)
    this.saveViewSoon()
    this.ended()
  }

  private onWheel(ev: WheelEvent): void {
    if (!this.note) return
    ev.preventDefault()
    const unit = ev.deltaMode === 1 ? 16 : ev.deltaMode === 2 ? this.size.h || 400 : 1
    const dx = ev.deltaX * unit
    const dy = ev.deltaY * unit
    // Ctrl + rotellina, e il pizzico sul touchpad (che arriva così): ingrandisce dove c'è il puntatore.
    if (ev.ctrlKey || ev.metaKey) return this.zoomAt(this.local(ev), Math.exp(-dy * 0.0025))
    const [mx, my] = ev.shiftKey && !dx ? [dy, 0] : [dx, dy]
    this.moveView(mx / this.view.zoom, my / this.view.zoom)
    this.saveViewSoon()
  }

  private zoomAt(pos: Pt, factor: number): void {
    const zoom = clampZoom(this.view.zoom * factor)
    const w = this.world(pos)
    this.setView({ x: w.x - pos.x / zoom, y: w.y - pos.y / zoom, zoom })
  }

  private zoomBy(factor: number): void {
    this.zoomAt({ x: this.size.w / 2, y: this.size.h / 2 }, factor)
  }

  private moveView(dx: number, dy: number): void {
    this.setView({ x: this.view.x + dx, y: this.view.y + dy, zoom: this.view.zoom }, false)
  }

  /** `save`: si ricorda la vista (per questa nota, su questo dispositivo). */
  private setView(view: BoardView, save = true): void {
    this.view = validView(view)
    this.viewMoved = true
    this.updateZoom()
    this.scheduleRender()
    // Il riquadro della selezione e il suo menu seguono la vista.
    if (this.selection || this.selMenu) this.scheduleLive()
    if (save) this.saveViewSoon()
  }

  private updateZoom(): void {
    this.zoomLevel.textContent = `${Math.round(this.view.zoom * 100)}%`
  }

  private saveViewSoon(): void {
    const note = this.note
    if (!note) return
    clearTimeout(this.viewTimer)
    this.viewTimer = window.setTimeout(() => {
      if (this.note === note) void this.opts.store.saveView(note, this.view).catch(() => {})
    }, 400)
  }

  private setSpace(down: boolean): void {
    this.spaceDown = down
    this.stage.classList.toggle('is-grab', down)
  }

  private onKey(ev: KeyboardEvent): void {
    const mod = ev.ctrlKey || ev.metaKey
    const key = ev.key.toLowerCase()
    // Esc chiude il menu delle misure (prima dello schermo intero), anche col fuoco sul pulsante
    // che l'ha aperto; il fuoco torna lì.
    if (ev.key === 'Escape' && this.menu) {
      ev.preventDefault()
      const anchor = this.menuAnchor
      this.closeMenu()
      anchor?.focus()
      return
    }
    // Esc toglie la selezione (o il menu per incollare), prima dello schermo intero.
    if (ev.key === 'Escape' && (this.selection || this.selMenu) && !this.action) {
      ev.preventDefault()
      this.clearSelection()
      this.focus()
      return
    }
    // Copia, taglia, incolla, duplica, seleziona tutto: solo se c'è da farlo (se no fa il browser).
    if (mod && !ev.altKey && !ev.shiftKey && 'cxvda'.includes(key) && key.length === 1 && !this.action) {
      const can = key === 'v' ? !!clipboard : key === 'a' ? this.strokes.size > 0 : !!this.selection
      if (!can) return
      ev.preventDefault()
      if (key === 'c') this.copySelection()
      else if (key === 'x') this.copySelection(true)
      else if (key === 'v') this.paste()
      else if (key === 'd') this.duplicate()
      else this.selectAll()
      return
    }
    if (mod && !ev.altKey && key === 'z') {
      ev.preventDefault()
      if (ev.shiftKey) this.redo()
      else this.undo()
      return
    }
    if (mod && !ev.altKey && key === 'y') {
      ev.preventDefault()
      this.redo()
      return
    }
    if (ev.key === 'Escape' && this.full) {
      ev.preventDefault()
      this.setFull(false)
      return
    }
    // Il resto solo sulla lavagna, non sui pulsanti (dove lo spazio li preme).
    if (ev.target !== this.stage || mod || ev.altKey) return
    if (ev.key === ' ') {
      ev.preventDefault()
      this.setSpace(true)
    } else if (ev.key === '+' || ev.key === '=') {
      ev.preventDefault()
      this.zoomBy(1.25)
    } else if (ev.key === '-') {
      ev.preventDefault()
      this.zoomBy(1 / 1.25)
    } else if (ev.key === '0') {
      ev.preventDefault()
      this.setView({ ...START })
    } else if ((ev.key === 'Delete' || ev.key === 'Backspace') && this.selection) {
      ev.preventDefault()
      this.deleteSelection()
    } else if (ev.key.startsWith('Arrow') && this.selection) {
      ev.preventDefault()
      const d = ev.shiftKey ? 10 : 1
      const [dx, dy] = { ArrowLeft: [-d, 0], ArrowRight: [d, 0], ArrowUp: [0, -d], ArrowDown: [0, d] }[ev.key] ?? [0, 0]
      this.nudgeSelection(dx, dy)
    }
  }

  // ——— I tratti, annulla e ripeti ———

  private boxOf(s: Stroke): Box {
    let box = this.boxes.get(s.id)
    if (!box) this.boxes.set(s.id, (box = strokeBox(s)))
    return box
  }

  private pathOf(s: Stroke): Path2D {
    let path = this.paths.get(s.id)
    if (!path) this.paths.set(s.id, (path = new Path2D(s.shape ? shapeSvg(s.points) : outlineSvg(strokeOutline(s)))))
    return path
  }

  /** Un tratto: il contorno pieno (perfect-freehand) o, per le figure, la linea larga quanto lo spessore. */
  private drawStroke(ctx: CanvasRenderingContext2D, s: Pick<Stroke, 'shape' | 'size'>, path: Path2D, color: string): void {
    if (s.shape) {
      ctx.strokeStyle = color
      ctx.lineWidth = s.size
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke(path)
    } else {
      ctx.fillStyle = color
      ctx.fill(path)
    }
  }

  private sorted(): Stroke[] {
    return (this.sortedCache ??= [...this.strokes.values()].sort(compareStrokes))
  }

  private addStrokes(list: Stroke[]): void {
    for (const s of list) this.strokes.set(s.id, s)
    this.changed()
  }

  private removeStrokes(ids: Iterable<string>): void {
    for (const id of ids) {
      this.strokes.delete(id)
      this.paths.delete(id)
      this.boxes.delete(id)
    }
    this.changed()
  }

  private changed(): void {
    this.sortedCache = null
    this.version++
    this.updateState()
  }

  private record(step: Step): void {
    this.undoStack.push(step)
    if (this.undoStack.length > HISTORY_MAX) this.undoStack.shift()
    this.redoStack = []
    this.updateState()
  }

  undo(): void {
    if (this.action) return
    const step = this.undoStack.pop()
    if (!step) return
    touchLog.add('annulla')
    this.redoStack.push(step)
    this.apply(step.added, step.removed)
    this.afterHistory(step.selection?.before)
  }

  redo(): void {
    if (this.action) return
    const step = this.redoStack.pop()
    if (!step) return
    touchLog.add('ripeti')
    this.undoStack.push(step)
    this.apply(step.removed, step.added)
    this.afterHistory(step.selection?.after)
  }

  /**
   * Dopo Annulla o Ripeti: se il passo era della selezione (spostata, copiata…), con il lazo torna
   * selezionato quello che lo era in quel momento; se no restano selezionati i tratti che ci sono ancora.
   */
  private afterHistory(ids: string[] | undefined): void {
    if (ids && this.tool === 'lasso') this.select(ids.map((id) => this.strokes.get(id)).filter((s): s is Stroke => !!s), false)
    else this.pruneSelection()
  }

  /** Toglie i tratti `remove` e mette `put`, qui e nel salvato. */
  private apply(remove: Stroke[], put: Stroke[]): void {
    this.lastTouchStep = null
    this.removeStrokes(remove.map((s) => s.id))
    this.addStrokes(put)
    this.persist({ put, remove: remove.map((s) => s.id) })
    this.render()
  }

  private async clear(): Promise<void> {
    if (!this.strokes.size || this.action) return
    const note = this.note
    if (!(await this.opts.confirmClear()) || note !== this.note || this.action) return
    const removed = [...this.strokes.values()]
    touchLog.add(`pulisci: ${removed.length} tratti tolti`)
    this.record({ removed, added: [] })
    this.apply(removed, [])
    this.clearSelection()
    this.focus()
  }

  private updateState(): void {
    this.el.dataset.strokes = String(this.strokes.size)
    this.undoButton.disabled = !this.undoStack.length
    this.redoButton.disabled = !this.redoStack.length
    this.clearButton.disabled = !this.strokes.size
    this.allButton.disabled = !this.strokes.size
    this.pasteButton.disabled = !clipboard
  }

  // ——— Salvare e leggere ———

  private persist(change: BoardChange): void {
    const note = this.note
    if (!note) return
    if (!this.persistent) this.warnOnce('memoria', 'Questo browser non permette di salvare la lavagna: quello che scrivi resta finché la pagina è aperta.')
    void this.opts.store.change(note, change).catch(() => this.warnOnce('spazio', 'La lavagna non è stata salvata: forse lo spazio del browser è finito.'))
  }

  private warnOnce(key: string, message: string): void {
    if (this.warned.has(key)) return
    this.warned.add(key)
    this.opts.warn(message)
  }

  /** Un'altra scheda ha cambiato la lavagna di questa nota. */
  private reload(): void {
    if (!this.note) return
    if (this.action) {
      this.pendingLoad ??= { first: false }
      return
    }
    this.load(false)
  }

  /**
   * Legge la lavagna salvata. Se intanto qui è cambiato qualcosa, la lettura è vecchia: se ne fa
   * un'altra, che vede anche quello appena salvato (IndexedDB fa le operazioni in ordine).
   */
  private load(first: boolean): void {
    const note = this.note
    if (!note) return
    const token = ++this.loadToken
    const version = this.version
    this.opts.store
      .load(note)
      .then((data) => {
        if (token !== this.loadToken || note !== this.note) return
        // Mentre si scrive (o si cancella) non si cambia niente sotto la penna: si rilegge alla fine.
        if (this.action) {
          this.pendingLoad = { first: first || !!this.pendingLoad?.first }
          return
        }
        if (this.version !== version) return this.load(first)
        const next = new Map(data.strokes.map((s) => [s.id, s]))
        for (const id of this.paths.keys()) if (!next.has(id)) this.paths.delete(id)
        for (const id of this.boxes.keys()) if (!next.has(id)) this.boxes.delete(id)
        this.strokes = next
        this.sortedCache = null
        if (first && data.view && !this.viewMoved) {
          this.view = validView(data.view)
          this.updateZoom()
        }
        this.el.dataset.loaded = 'true'
        this.updateState()
        this.pruneSelection()
        this.render()
      })
      .catch(() => {
        if (token !== this.loadToken) return
        this.el.dataset.loaded = 'true'
        this.warnOnce('lettura', 'Non è stato possibile leggere la lavagna di questa nota.')
      })
  }

  // ——— Disegnare ———

  private resize(): void {
    const r = this.stage.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const w = Math.round(r.width)
    const hgt = Math.round(r.height)
    if (w === this.size.w && hgt === this.size.h && dpr === this.size.dpr) return
    this.size = { w, h: hgt, dpr }
    for (const c of [this.canvas, this.live]) {
      c.width = Math.max(1, Math.round(w * dpr))
      c.height = Math.max(1, Math.round(hgt * dpr))
    }
    this.render()
    this.renderLive()
  }

  private scheduleRender(): void {
    if (!this.frame) this.frame = requestAnimationFrame(() => this.render())
  }

  private scheduleLive(): void {
    if (!this.liveFrame) this.liveFrame = requestAnimationFrame(() => this.renderLive())
  }

  private applyView(ctx: CanvasRenderingContext2D): void {
    const z = this.view.zoom * this.size.dpr
    ctx.setTransform(z, 0, 0, z, -this.view.x * z, -this.view.y * z)
  }

  private render(): void {
    if (this.frame) cancelAnimationFrame(this.frame)
    this.frame = 0
    if (!this.size.w || !this.size.h) return
    if ((window.devicePixelRatio || 1) !== this.size.dpr) return this.resize()
    const ctx = this.ctx
    const palette = BOARD_PALETTES[this.theme]
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = palette.paper
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawGrid(palette.grid)
    this.applyView(ctx)
    const visible = this.visibleBox()
    // La selezione che si sta spostando si disegna sopra, dove è adesso (renderLive).
    const a = this.action
    const moving = a?.kind === 'move' && a.moved ? this.selection?.ids : undefined
    const shown = this.sorted().filter((s) => !moving?.has(s.id) && boxesTouch(this.boxOf(s), visible))
    // Prima gli evidenziatori, trasparenti: la scrittura resta sopra, anche quella fatta prima.
    ctx.globalAlpha = palette.highlightAlpha
    for (const s of shown) if (s.highlight) this.drawStroke(ctx, s, this.pathOf(s), palette.highlight[s.color as HighlightColor])
    ctx.globalAlpha = 1
    if (this.selection && !moving) this.drawHalos(ctx, shown)
    for (const s of shown) if (!s.highlight) this.drawStroke(ctx, s, this.pathOf(s), palette.ink[s.color as InkColor])
  }

  /**
   * Intorno ai tratti selezionati un alone del colore della selezione, come in Note di Apple. Si
   * disegna a parte e tutto insieme: dove gli aloni si sovrappongono non diventa più scuro, e dentro
   * i tratti non c'è (l'evidenziatore resta giallo).
   */
  private drawHalos(ctx: CanvasRenderingContext2D, shown: Stroke[]): void {
    const sel = this.selection!
    const list = shown.filter((s) => sel.ids.has(s.id))
    if (!list.length) return
    const c = (this.haloCanvas ??= document.createElement('canvas'))
    if (c.width !== this.canvas.width || c.height !== this.canvas.height) {
      c.width = this.canvas.width
      c.height = this.canvas.height
    }
    const h = c.getContext('2d')
    if (!h) return
    const palette = BOARD_PALETTES[this.theme]
    const halo = 4 / this.view.zoom
    h.setTransform(1, 0, 0, 1, 0, 0)
    h.clearRect(0, 0, c.width, c.height)
    this.applyView(h)
    h.strokeStyle = h.fillStyle = palette.selection
    h.lineCap = 'round'
    h.lineJoin = 'round'
    for (const s of list) {
      const path = this.pathOf(s)
      h.lineWidth = s.shape ? s.size + 2 * halo : 2 * halo
      h.stroke(path)
      if (!s.shape) h.fill(path)
    }
    h.globalCompositeOperation = 'destination-out'
    for (const s of list) {
      const path = this.pathOf(s)
      if (s.shape) {
        h.lineWidth = s.size
        h.stroke(path)
      } else h.fill(path)
    }
    h.globalCompositeOperation = 'source-over'
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = palette.haloAlpha
    ctx.drawImage(c, 0, 0)
    ctx.restore()
  }

  /** Un tratto appena finito, sopra gli altri: non serve ridisegnare tutto (l'evidenziatore va sotto, quindi sì). */
  private paint(s: Stroke): void {
    if (!this.size.w || !this.size.h) return
    if (s.highlight) return this.render()
    this.applyView(this.ctx)
    this.drawStroke(this.ctx, s, this.pathOf(s), BOARD_PALETTES[this.theme].ink[s.color as InkColor])
  }

  private drawGrid(color: string): void {
    const { x, y, zoom } = this.view
    let step = GRID
    // Da lontano i quadretti sarebbero troppo fitti: se ne tiene uno ogni cinque.
    while (step * zoom < 9) step *= 5
    const ctx = this.ctx
    const dpr = this.size.dpr
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let gx = Math.ceil(x / step) * step; (gx - x) * zoom <= this.size.w; gx += step) {
      const sx = Math.round((gx - x) * zoom * dpr) + 0.5
      ctx.moveTo(sx, 0)
      ctx.lineTo(sx, this.canvas.height)
    }
    for (let gy = Math.ceil(y / step) * step; (gy - y) * zoom <= this.size.h; gy += step) {
      const sy = Math.round((gy - y) * zoom * dpr) + 0.5
      ctx.moveTo(0, sy)
      ctx.lineTo(this.canvas.width, sy)
    }
    ctx.stroke()
  }

  /** Sopra: il tratto che si sta scrivendo e il cerchio della gomma. */
  private renderLive(): void {
    if (this.liveFrame) cancelAnimationFrame(this.liveFrame)
    this.liveFrame = 0
    const ctx = this.liveCtx
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, this.live.width, this.live.height)
    if (!this.size.w || !this.size.h) return
    const palette = BOARD_PALETTES[this.theme]
    const a = this.action
    if (a?.kind === 'draw') {
      // Il tratto che si sta scrivendo o, tenuta ferma la punta, la figura in cui è diventato.
      const s = a.stroke
      const d = a.snapped ? shapeSvg(shapePoints(a.snapped.shape).flatMap((p) => [p.x, p.y, 0.5])) : outlineSvg(strokeOutline(s, false))
      if (d) {
        this.applyView(ctx)
        ctx.globalAlpha = s.highlight ? palette.highlightAlpha : 1
        this.drawStroke(ctx, { size: s.size, shape: !!a.snapped }, new Path2D(d), s.highlight ? palette.highlight[s.color as HighlightColor] : palette.ink[s.color as InkColor])
        ctx.globalAlpha = 1
      }
    }
    if (a?.kind === 'lasso' && a.points.length > 1) {
      // Il lazo, tratteggiato, con dentro appena colorato quello che prende.
      this.applyView(ctx)
      const zoom = this.view.zoom
      const path = new Path2D()
      path.moveTo(a.points[0].x, a.points[0].y)
      for (const p of a.points) path.lineTo(p.x, p.y)
      ctx.globalAlpha = 0.07
      ctx.fillStyle = palette.selection
      ctx.fill(path)
      ctx.globalAlpha = 1
      ctx.lineWidth = 1.5 / zoom
      ctx.lineJoin = 'round'
      ctx.setLineDash([6 / zoom, 5 / zoom])
      ctx.strokeStyle = palette.selection
      ctx.stroke(path)
      ctx.setLineDash([])
    }
    const sel = this.selection
    if (sel) {
      const t = a?.kind === 'move' ? a.transform : IDENTITY
      if (a?.kind === 'move' && a.moved) this.drawMoving(ctx, t)
      // Il riquadro tratteggiato e, nell'angolo in basso a destra, il pallino per ingrandire.
      const b = this.screenBox(sel.box, t)
      ctx.setTransform(this.size.dpr, 0, 0, this.size.dpr, 0, 0)
      ctx.lineWidth = 1.25
      ctx.strokeStyle = palette.selection
      ctx.setLineDash([5, 4])
      ctx.strokeRect(b.minX, b.minY, b.maxX - b.minX, b.maxY - b.minY)
      ctx.setLineDash([])
      ctx.beginPath()
      ctx.arc(b.maxX, b.maxY, HANDLE_R, 0, 2 * Math.PI)
      ctx.fillStyle = palette.selection
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = palette.paper
      ctx.stroke()
    }
    this.placeSelMenu()
    if (this.cursor) {
      // Il cerchio della gomma, grande com'è adesso; tratteggiato quando cancella le linee intere.
      const radius = a?.kind === 'erase' ? a.radius : TOOL_SIZES.eraser[this.sizes.eraser]
      ctx.setTransform(this.size.dpr, 0, 0, this.size.dpr, 0, 0)
      ctx.beginPath()
      ctx.arc(this.cursor.x, this.cursor.y, radius, 0, 2 * Math.PI)
      ctx.fillStyle = this.theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(28, 32, 48, 0.06)'
      ctx.fill()
      ctx.lineWidth = 1.25
      ctx.strokeStyle = this.theme === 'dark' ? 'rgba(232, 234, 241, 0.7)' : 'rgba(28, 32, 48, 0.55)'
      ctx.setLineDash(this.eraserMode === 'stroke' ? [3, 3] : [])
      ctx.stroke()
      ctx.setLineDash([])
    }
  }

  /** I tratti selezionati mentre si spostano o si ingrandiscono: sopra gli altri, con la trasformazione del canvas. */
  private drawMoving(ctx: CanvasRenderingContext2D, t: Transform): void {
    const palette = BOARD_PALETTES[this.theme]
    const z = this.view.zoom * this.size.dpr
    const k = t.scale
    ctx.setTransform(k * z, 0, 0, k * z, (t.origin.x * (1 - k) + t.dx - this.view.x) * z, (t.origin.y * (1 - k) + t.dy - this.view.y) * z)
    const list = this.selected()
    ctx.globalAlpha = palette.highlightAlpha
    for (const s of list) if (s.highlight) this.drawStroke(ctx, s, this.pathOf(s), palette.highlight[s.color as HighlightColor])
    ctx.globalAlpha = 1
    for (const s of list) if (!s.highlight) this.drawStroke(ctx, s, this.pathOf(s), palette.ink[s.color as InkColor])
  }
}
