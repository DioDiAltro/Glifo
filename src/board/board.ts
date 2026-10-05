import { readJson, writeJson } from '../store/storage'
import { h, icon, ICONS } from '../ui/dom'
import { appleTouch } from './device'
import { BOARD_PALETTES, inkName, outlineSvg, PEN_SIZE, strokeOutline, type BoardTheme } from './ink'
import type { BoardChange, BoardStore, BoardView } from './store'
import { touchLog, where } from './touchlog'
import {
  boxesTouch,
  compareStrokes,
  eraseStroke,
  INK_COLORS,
  newStrokeId,
  piecesOf,
  roundPoints,
  strokeBox,
  type Box,
  type InkColor,
  type Pt,
  type Stroke,
} from './strokes'

/**
 * La lavagna: si scrive a mano accanto al testo (o a tutto schermo), con la penna, il dito o il
 * mouse. Una per nota, salvata su questo dispositivo (store.ts); non va nella nota.
 *
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

type Tool = 'pen' | 'eraser'

/** Un passo da annullare o ripetere: i tratti che ha tolto e quelli che ha messo. */
interface Step {
  removed: Stroke[]
  added: Stroke[]
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

type Action = DrawAction | EraseAction | PanAction | PinchAction

/** Le azioni, a parole: per il registro dei tocchi. */
const ACTION_NAMES: Record<Action['kind'], string> = { draw: 'un tratto', erase: 'la gomma', pan: 'uno spostamento', pinch: 'un gesto con due dita' }

interface Finger extends Pt {
  /** Un dito (o il palmo) da non considerare finché non si alza: c'era la penna. */
  ignored: boolean
}

/** Raggio della gomma sullo schermo, in pixel. */
export const ERASER_RADIUS = 11
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
  rec: '<circle cx="12" cy="12" r="6" fill="currentColor" stroke="none"/>',
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
  color?: InkColor
}

function loadPrefs(): Prefs {
  const raw = readJson<unknown>(PREFS_KEY, {})
  return typeof raw === 'object' && raw !== null ? (raw as Prefs) : {}
}

export class Board {
  readonly el: HTMLElement
  private readonly stage: HTMLElement
  private readonly canvas: HTMLCanvasElement
  private readonly live: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly liveCtx: CanvasRenderingContext2D
  private readonly toolButtons = new Map<Tool, HTMLButtonElement>()
  private readonly colorButtons = new Map<InkColor, HTMLButtonElement>()
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

  constructor(private readonly opts: BoardOptions) {
    const prefs = loadPrefs()
    this.penMode = prefs.pen === true
    this.color = INK_COLORS.includes(prefs.color as InkColor) ? (prefs.color as InkColor) : 'ink'

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
    const toolButton = (tool: Tool, label: string, paths: string, title: string) => {
      const b = button(label, paths, () => this.setTool(tool), title)
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
      toolButton('pen', 'Penna', ICON.pen, 'Penna'),
      toolButton('eraser', 'Gomma', ICON.eraser, 'Gomma: cancella dove passa'),
      sep(),
      h('div', { class: 'board-colors', attrs: { role: 'group', 'aria-label': 'Colore' } }, colors),
      sep(),
      this.clearButton,
      this.fullButton,
      this.logButton,
    )
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
      { class: 'board-pane', attrs: { id: 'board-pane', 'aria-label': 'Lavagna' }, data: { strokes: '0', tool: 'pen' } },
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

    if (this.penMode) this.el.dataset.pen = 'true'
    this.setTool('pen')
    this.setColor(this.color, false)
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
    if (tool !== this.tool) touchLog.add(`strumento: ${tool === 'pen' ? 'penna' : 'gomma'}`)
    this.tool = tool
    this.el.dataset.tool = tool
    for (const [t, b] of this.toolButtons) b.setAttribute('aria-pressed', String(t === tool))
    if (tool === 'pen') this.cursor = null
    this.scheduleLive()
  }

  private setColor(color: InkColor, pickPen = true): void {
    if (color !== this.color) touchLog.add(`colore: ${inkName(color, this.theme).toLowerCase()}`)
    this.color = color
    for (const [c, b] of this.colorButtons) b.setAttribute('aria-pressed', String(c === color))
    if (pickPen) {
      this.setTool('pen')
      this.savePrefs({ color })
    }
  }

  private savePrefs(changes: Prefs): void {
    writeJson(PREFS_KEY, { ...loadPrefs(), ...changes })
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
      touchLog.add(`→ penna: ${tool === 'pen' ? 'scrive' : penErases(ev) ? 'cancella (gomma della penna)' : 'cancella'}`)
      return this.startTool(ev, pos, tool)
    }
    if (this.action) return void touchLog.add(`→ ${ev.pointerType} ignorato: c'è già ${ACTION_NAMES[this.action.kind]}`)
    if (ev.button === 1 || (ev.button === 0 && this.spaceDown)) {
      this.capture(ev)
      touchLog.add(`→ ${ev.pointerType}: sposta la lavagna`)
      this.startPan(ev.pointerId, ev.pointerType, pos)
    } else if (ev.button === 0) {
      this.capture(ev)
      touchLog.add(`→ ${ev.pointerType}: ${this.tool === 'pen' ? 'scrive' : 'cancella'}`)
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
      touchLog.add(`→ un dito: ${this.tool === 'pen' ? 'scrive' : 'cancella'}`)
      this.startTool(ev, pos, this.tool)
    } else if (active.length === 2) {
      if (a && a.type !== 'touch') return void touchLog.add(`→ secondo dito ignorato: c'è già ${ACTION_NAMES[a.kind]} (${a.type})`)
      // Il secondo dito: si sposta e si ingrandisce. Il tratto appena cominciato col primo era l'inizio del gesto.
      const young = a?.kind === 'draw' && !(performance.now() - a.started > YOUNG.ms || a.travel > YOUNG.px)
      touchLog.add(`→ due dita: spostano e ingrandiscono${young ? ' (il tratto appena cominciato col primo dito era l\'inizio del gesto: tolto)' : ''}`)
      if (a?.kind === 'draw') this.finishDraw(a, !young)
      else if (a?.kind === 'erase') this.finishErase(a)
      else if (a?.kind === 'pan') this.finishPan()
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
      this.scheduleLive()
    } else if (a.kind === 'erase') {
      for (const e of coalesced(ev)) this.eraseTo(a, this.world(this.local(e, rect)))
      this.cursor = this.local(ev, rect)
      this.scheduleLive()
    } else {
      const pos = this.local(ev)
      this.moveView((a.last.x - pos.x) / this.view.zoom, (a.last.y - pos.y) / this.view.zoom)
      a.last = pos
    }
  }

  /** Con il mouse o la penna sospesa sopra: il cerchio della gomma segue il puntatore. */
  private hover(ev: PointerEvent): void {
    if (ev.pointerType === 'touch') return
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
    if (a.kind === 'erase') {
      this.removeStrokes(a.added.keys())
      this.addStrokes([...a.removed.values()])
      this.render()
    } else if (a.kind === 'pan' || a.kind === 'pinch') {
      this.setView(a.before, false)
      this.stage.classList.remove('is-panning')
    }
    this.cursor = null
    this.renderLive()
    this.ended()
  }

  // ——— Scrivere ———

  private startTool(ev: PointerEvent, pos: Pt, tool: Tool): void {
    const w = this.world(pos)
    if (tool === 'eraser') {
      const a: EraseAction = { kind: 'erase', pointer: ev.pointerId, type: ev.pointerType, last: w, removed: new Map(), added: new Map() }
      this.action = a
      this.cursor = pos
      this.eraseTo(a, w)
      this.scheduleLive()
      return
    }
    const pen = ev.pointerType === 'pen'
    const stroke: Stroke = { id: newStrokeId(), t: Date.now(), color: this.color, size: PEN_SIZE, pen, points: [w.x, w.y, pressureOf(ev, pen)] }
    this.action = { kind: 'draw', pointer: ev.pointerId, type: ev.pointerType, stroke, started: performance.now(), travel: 0, last: pos }
    this.scheduleLive()
  }

  private drawTo(a: DrawAction, pos: Pt, e: PointerEvent): void {
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
    if (touchLog.on) touchLog.add(keep ? `tratto: ${strokeSummary(a)}` : 'tratto scartato')
    if (keep) {
      const s = { ...a.stroke, points: roundPoints(a.stroke.points) }
      this.addStrokes([s])
      const step = { removed: [], added: [s] }
      this.record(step)
      this.lastTouchStep = a.type === 'touch' ? { step, at: performance.now() } : null
      this.persist({ put: [s] })
      if (this.frame) this.render()
      else this.paint(s)
    }
    this.renderLive()
    this.ended()
  }

  private eraseTo(a: EraseAction, p: Pt): void {
    const r = ERASER_RADIUS / this.view.zoom
    const reach: Box = {
      minX: Math.min(a.last.x, p.x) - r,
      minY: Math.min(a.last.y, p.y) - r,
      maxX: Math.max(a.last.x, p.x) + r,
      maxY: Math.max(a.last.y, p.y) + r,
    }
    let changed = false
    for (const s of [...this.strokes.values()]) {
      if (!boxesTouch(this.boxOf(s), reach)) continue
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
    }
    this.renderLive()
    this.ended()
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
    if (!path) this.paths.set(s.id, (path = new Path2D(outlineSvg(strokeOutline(s)))))
    return path
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
  }

  redo(): void {
    if (this.action) return
    const step = this.redoStack.pop()
    if (!step) return
    touchLog.add('ripeti')
    this.undoStack.push(step)
    this.apply(step.removed, step.added)
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
    this.focus()
  }

  private updateState(): void {
    this.el.dataset.strokes = String(this.strokes.size)
    this.undoButton.disabled = !this.undoStack.length
    this.redoButton.disabled = !this.redoStack.length
    this.clearButton.disabled = !this.strokes.size
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
    const { x, y, zoom } = this.view
    const visible: Box = { minX: x, minY: y, maxX: x + this.size.w / zoom, maxY: y + this.size.h / zoom }
    for (const s of this.sorted()) {
      if (!boxesTouch(this.boxOf(s), visible)) continue
      ctx.fillStyle = palette.ink[s.color]
      ctx.fill(this.pathOf(s))
    }
  }

  /** Un tratto appena finito, sopra gli altri: non serve ridisegnare tutto. */
  private paint(s: Stroke): void {
    if (!this.size.w || !this.size.h) return
    this.applyView(this.ctx)
    this.ctx.fillStyle = BOARD_PALETTES[this.theme].ink[s.color]
    this.ctx.fill(this.pathOf(s))
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
      const d = outlineSvg(strokeOutline(a.stroke, false))
      if (d) {
        this.applyView(ctx)
        ctx.fillStyle = palette.ink[a.stroke.color]
        ctx.fill(new Path2D(d))
      }
    }
    if (this.cursor) {
      ctx.setTransform(this.size.dpr, 0, 0, this.size.dpr, 0, 0)
      ctx.beginPath()
      ctx.arc(this.cursor.x, this.cursor.y, ERASER_RADIUS, 0, 2 * Math.PI)
      ctx.fillStyle = this.theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(28, 32, 48, 0.06)'
      ctx.fill()
      ctx.lineWidth = 1.25
      ctx.strokeStyle = this.theme === 'dark' ? 'rgba(232, 234, 241, 0.7)' : 'rgba(28, 32, 48, 0.55)'
      ctx.stroke()
    }
  }
}
