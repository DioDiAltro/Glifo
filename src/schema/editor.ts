/**
 * L'editor degli schemi, a tutto schermo e stile draw.io: le forme a sinistra, il foglio in
 * mezzo e, a destra, l'aspetto di quello che è selezionato. Si apre da una nota e ci salva lo
 * schema.
 */
import {
  Cell,
  Clipboard,
  InternalEvent,
  UndoManager,
  eventUtils,
  gestureUtils,
  styleUtils,
  type CellState,
  type ConnectionHandler,
  type Graph,
  type InternalMouseEvent,
  type PanningHandler,
} from '@maxgraph/core'
import { confirmDialog } from '../ui/dialogs'
import { ICONS, h, icon } from '../ui/dom'
import { cellText, createEdgeCell, createGraph, edgeLook, edgeStyle, loadSchema, nodeLook, nodeStyle, readSchema, type Look } from './graph'
import {
  ARROWS,
  COLOR_NAMES,
  COLORS,
  DEFAULT_EDGE,
  FONT_SIZE,
  PALETTE,
  ROUTES,
  SHAPE_NAMES,
  SHAPE_SIZE,
  SHAPES,
  TEXT_SIZES,
  serializeSchema,
  type EdgeArrows,
  type EdgeLook,
  type EdgeRoute,
  type NodeLook,
  type Schema,
  type ShapeKind,
  type TextSize,
  type Theme,
} from './model'

export interface SchemaEditorOptions {
  schema: Schema
  theme: Theme
  /** Mette lo schema nella nota: con «Fatto» e con Ctrl+S (che lascia aperto l'editor). */
  onSave(schema: Schema): void
}

/** Apre l'editor; la promessa si risolve quando lo si chiude. */
export function openSchemaEditor(options: SchemaEditorOptions): Promise<void> {
  return new Promise((resolve) => {
    new SchemaEditor(options, resolve)
  })
}

const PATHS = {
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  redo: '<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>',
  zoomIn: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M8 11h6M11 8v6"/>',
  zoomOut: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M8 11h6"/>',
  fit: '<path d="M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4"/>',
  grid: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16"/>',
  rect: '<rect x="3" y="6" width="18" height="12"/>',
  rounded: '<rect x="3" y="6" width="18" height="12" rx="4"/>',
  ellipse: '<ellipse cx="12" cy="12" rx="9" ry="6.5"/>',
  rhombus: '<path d="m12 3 9 9-9 9-9-9z"/>',
  text: '<path d="M5 7V5h14v2M12 5v14M9 19h6"/>',
  straight: '<path d="M4 19 20 5"/>',
  orthogonal: '<path d="M4 19h8V5h8"/>',
  end: '<path d="M4 12h15M14 7l5 5-5 5"/>',
  both: '<path d="M5 12h14M9 7l-5 5 5 5M15 7l5 5-5 5"/>',
  none: '<path d="M4 12h16"/>',
  dashed: '<path d="M3 12h4M10 12h4M17 12h4"/>',
  arrow: '<path d="M12 3.5 19 12h-4.5v8.5h-5V12H5z" fill="currentColor" stroke="none"/>',
} as const

const ROUTE_NAMES: Record<EdgeRoute, string> = { straight: 'Dritta', orthogonal: 'Ad angolo retto' }
const ARROW_NAMES: Record<EdgeArrows, string> = { end: 'Punta alla fine', both: 'Punte alle due estremità', none: 'Senza punte' }
const SIZE_NAMES: Record<TextSize, string> = { s: 'Testo piccolo', m: 'Testo normale', l: 'Testo grande' }

type Direction = 'up' | 'right' | 'down' | 'left'
const DIRECTIONS: Direction[] = ['up', 'right', 'down', 'left']
/** Lo spazio tra una forma e quella che si aggiunge cliccando una freccia blu. */
const GAP = 60
const MIN_SCALE = 0.25
const MAX_SCALE = 4
const ACCENT = '#6366f1'

class SchemaEditor {
  private readonly dialog: HTMLDialogElement
  private readonly wrap: HTMLElement
  private readonly canvas: HTMLElement
  private readonly format: HTMLElement
  private readonly arrows: HTMLElement
  private readonly textInput: HTMLTextAreaElement
  private readonly empty: HTMLElement
  private readonly zoomLabel: HTMLButtonElement
  private readonly undoButton: HTMLButtonElement
  private readonly redoButton: HTMLButtonElement
  private readonly gridButton: HTMLButtonElement
  private readonly status: HTMLElement
  private readonly graph: Graph
  private readonly look: Look
  private readonly undo = new UndoManager()
  private readonly connection: ConnectionHandler
  private readonly panning: PanningHandler | undefined
  /** Lo schema com'è nella nota: per sapere se ci sono modifiche da salvare. */
  private saved: string
  /** L'aspetto delle frecce nuove: quello scelto per ultimo. */
  private edgeDefaults: EdgeLook = DEFAULT_EDGE
  private hovered: CellState | null = null
  /** L'ultimo tocco era con un dito o una penna: senza «passare sopra», le frecce blu stanno attorno alla forma selezionata. */
  private touch = false
  private editing: Cell | null = null
  private grid = true
  private spaceDown = false
  private closed = false
  private statusTimer = 0
  private readonly cleanups: (() => void)[] = []

  constructor(
    private readonly options: SchemaEditorOptions,
    private readonly resolve: () => void,
  ) {
    const button = (label: string, paths: string, run: () => void, extra = '') =>
      h(
        'button',
        { class: `icon-button ${extra}`.trim(), title: label, attrs: { type: 'button', 'aria-label': label }, on: { click: () => run() } },
        icon(paths, 18),
      )
    this.undoButton = button('Annulla (Ctrl+Z)', PATHS.undo, () => this.runUndo(false))
    this.redoButton = button('Ripeti (Ctrl+Y)', PATHS.redo, () => this.runUndo(true))
    this.gridButton = button('Griglia', PATHS.grid, () => this.setGrid(!this.grid), 'schema-toggle')
    this.zoomLabel = h(
      'button',
      { class: 'schema-zoom', title: 'Zoom al 100%', attrs: { type: 'button', 'aria-label': 'Zoom al 100%' }, on: { click: () => this.zoomTo(1) } },
      '100%',
    )
    this.status = h('span', { class: 'schema-status', attrs: { 'aria-live': 'polite' } })
    const bar = h(
      'header',
      { class: 'schema-bar' },
      h('h2', { class: 'schema-title' }, 'Schema'),
      h(
        'div',
        { class: 'schema-tools', attrs: { role: 'toolbar', 'aria-label': 'Strumenti dello schema' } },
        this.undoButton,
        this.redoButton,
        h('span', { class: 'toolbar-sep', attrs: { 'aria-hidden': 'true' } }),
        button('Riduci lo zoom', PATHS.zoomOut, () => this.zoomTo(this.graph.view.scale / 1.25)),
        this.zoomLabel,
        button('Aumenta lo zoom', PATHS.zoomIn, () => this.zoomTo(this.graph.view.scale * 1.25)),
        button('Adatta alla finestra', PATHS.fit, () => this.fit()),
        h('span', { class: 'toolbar-sep', attrs: { 'aria-hidden': 'true' } }),
        this.gridButton,
        button('Elimina la selezione (Canc)', ICONS.trash, () => this.deleteSelection()),
      ),
      h('div', { class: 'schema-spacer' }),
      this.status,
      h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => void this.requestClose() } }, 'Chiudi'),
      h('button', { class: 'btn btn-primary', attrs: { type: 'button' }, on: { click: () => this.finish() } }, 'Fatto'),
    )

    const palette = h(
      'aside',
      { class: 'schema-shapes', attrs: { 'aria-label': 'Forme' } },
      h('h3', {}, 'Forme'),
      SHAPES.map((shape) =>
        h(
          'button',
          {
            class: 'schema-shape',
            title: `${SHAPE_NAMES[shape]}: trascinala sul foglio o cliccala`,
            attrs: { type: 'button', 'data-shape': shape },
            on: { click: () => this.addShape(shape) },
          },
          icon(PATHS[shape], 22),
          h('span', {}, SHAPE_NAMES[shape]),
        ),
      ),
    )

    this.canvas = h('div', { class: 'schema-canvas', attrs: { tabindex: 0, 'aria-label': 'Foglio dello schema' } })
    this.arrows = h(
      'div',
      { class: 'schema-arrows', attrs: { hidden: true } },
      DIRECTIONS.map((dir) =>
        h(
          'button',
          {
            class: `schema-arrow schema-arrow-${dir}`,
            title: 'Trascina per collegare; clicca per aggiungere una forma collegata',
            attrs: { type: 'button', tabindex: -1, 'aria-hidden': 'true', 'data-dir': dir },
            on: { pointerdown: (ev) => this.arrowDown(ev, dir) },
          },
          icon(PATHS.arrow, 16),
        ),
      ),
    )
    this.textInput = h('textarea', {
      class: 'schema-text',
      attrs: { hidden: true, rows: 1, 'aria-label': 'Testo (le formule tra $…$)', spellcheck: 'false' },
    })
    this.empty = h(
      'p',
      { class: 'schema-empty' },
      'Trascina qui una forma dal pannello a sinistra, o cliccala.',
      h('br'),
      'Poi passa sopra una forma e trascina una freccia blu per collegarla a un\'altra.',
    )
    this.wrap = h('div', { class: 'schema-canvas-wrap' }, this.canvas, this.arrows, this.textInput, this.empty)
    this.format = h('aside', { class: 'schema-format', attrs: { 'aria-label': 'Aspetto' } })

    this.dialog = h(
      'dialog',
      { class: 'schema-editor', attrs: { 'aria-label': 'Editor dello schema' } },
      bar,
      h('div', { class: 'schema-main' }, palette, this.wrap, this.format),
    )
    document.body.append(this.dialog)
    this.dialog.showModal()

    try {
      this.look = { theme: options.theme, surface: getComputedStyle(this.canvas).backgroundColor }
      this.graph = createGraph(this.canvas, true)
      InternalEvent.disableContextMenu(this.canvas)
      this.connection = this.graph.getPlugin<ConnectionHandler>('ConnectionHandler')!
      this.panning = this.graph.getPlugin<PanningHandler>('PanningHandler')
      this.setUpConnections()
      this.setUpPanning()

      loadSchema(this.graph, options.schema, this.look)
      this.saved = serializeSchema(readSchema(this.graph))
      this.setUpUndo()
      this.setUpEvents()
      for (const item of palette.querySelectorAll<HTMLElement>('.schema-shape')) this.makeDraggable(item, item.dataset.shape as ShapeKind)
      this.setGrid(true)
      this.fit()
      this.refresh()
      this.canvas.focus()
    } catch (err) {
      // Se qualcosa va storto la finestra non resta aperta a metà: chi l'ha aperta lo dice.
      this.dialog.remove()
      throw err
    }
  }

  // ——— Collegamenti: le frecce blu attorno alla forma sotto il puntatore ———

  private setUpConnections(): void {
    const { connection, graph } = this
    // Le frecce si cominciano solo dalle frecce blu: trascinando una forma la si sposta.
    connection.isValidSource = () => false
    connection.createTarget = true
    connection.factoryMethod = () => createEdgeCell({ ...this.edgeDefaults, text: '' }, this.look)
    // Lasciando la freccia nel vuoto nasce una forma uguale, ma senza testo, già selezionata.
    const createTarget = connection.createTargetVertex.bind(connection)
    connection.createTargetVertex = (evt, source) => {
      const clone = createTarget(evt, source)
      const value: NodeLook = Object.freeze({ ...nodeLook(source), text: '' })
      clone.setValue(value)
      clone.setStyle(nodeStyle(value, this.look))
      return clone
    }
    connection.selectCells = (edge, target) => graph.setSelectionCell(target ?? edge)
    // La freccia che si sta tirando e la forma d'arrivo: nel viola di Glifo (non nel verde di maxGraph).
    connection.marker.validColor = ACCENT
    connection.marker.invalidColor = '#c62845'
    connection.getEdgeColor = ((valid: boolean) => (valid ? ACCENT : '#c62845')) as unknown as ConnectionHandler['getEdgeColor']
    connection.getEdgeWidth = () => 2
  }

  private showArrows(state: CellState): void {
    this.hovered = state
    const { x, y, width, height } = state
    const place = (dir: Direction, left: number, top: number) => {
      const el = this.arrows.querySelector<HTMLElement>(`[data-dir="${dir}"]`)!
      el.style.left = `${left}px`
      el.style.top = `${top}px`
    }
    // Col dito le frecce sono più grandi: un po' più lontane, per non coprire le maniglie.
    const gap = this.touch ? 28 : 18
    place('up', x + width / 2, y - gap)
    place('down', x + width / 2, y + height + gap)
    place('left', x - gap, y + height / 2)
    place('right', x + width + gap, y + height / 2)
    this.arrows.hidden = false
  }

  private hideArrows(): void {
    this.hovered = null
    this.arrows.hidden = true
    if (this.touch) this.arrowsForSelection()
  }

  /** Sugli schermi touch: le frecce blu attorno alla forma selezionata, se è una sola. */
  private arrowsForSelection(): void {
    const cells = this.graph.getSelectionCells()
    const state = cells.length === 1 && cells[0].isVertex() && !this.editing ? this.graph.view.getState(cells[0]) : null
    if (state) this.showArrows(state)
  }

  /** Il puntatore è ancora vicino alla forma con le frecce (o sopra le frecce)? */
  private nearHovered(me: InternalMouseEvent): boolean {
    const s = this.hovered
    if (!s) return false
    const margin = 34
    return me.getGraphX() >= s.x - margin && me.getGraphX() <= s.x + s.width + margin && me.getGraphY() >= s.y - margin && me.getGraphY() <= s.y + s.height + margin
  }

  private arrowDown(ev: PointerEvent, dir: Direction): void {
    const state = this.hovered
    if (!state || ev.button !== 0) return
    ev.preventDefault()
    ev.stopPropagation()
    this.stopEditing(true)
    this.hideArrows()
    const start = styleUtils.convertPoint(this.canvas, ev.clientX, ev.clientY)
    // Come draw.io: si comincia subito un collegamento; se il puntatore non si muove era un clic.
    this.connection.start(state, start.x, start.y)
    this.graph.isMouseDown = true
    this.graph.isMouseTrigger = eventUtils.isMouseEvent(ev)
    const up = (e: PointerEvent) => {
      if (e.pointerId !== ev.pointerId) return
      window.removeEventListener('pointerup', up, true)
      window.removeEventListener('pointercancel', up, true)
      const click = e.type === 'pointerup' && Math.hypot(e.clientX - ev.clientX, e.clientY - ev.clientY) < 6
      if (click || e.type === 'pointercancel') {
        this.connection.reset()
        this.graph.isMouseDown = false
      }
      if (click) this.addConnected(state.cell, dir)
    }
    window.addEventListener('pointerup', up, true)
    window.addEventListener('pointercancel', up, true)
  }

  /** Clic su una freccia blu: una forma uguale (senza testo) da quella parte, collegata. */
  private addConnected(source: Cell, dir: Direction): void {
    const geometry = source.getGeometry()
    if (!geometry) return
    const { graph } = this
    const dx = dir === 'right' ? geometry.width + GAP : dir === 'left' ? -(geometry.width + GAP) : 0
    const dy = dir === 'down' ? geometry.height + GAP : dir === 'up' ? -(geometry.height + GAP) : 0
    let x = geometry.x + dx
    let y = geometry.y + dy
    // Se lì c'è già una forma, si va un po' più in là.
    for (let i = 0; i < 8 && this.overlaps(x, y, geometry.width, geometry.height); i++) {
      if (dx) y += geometry.height + GAP / 2
      else x += geometry.width + GAP / 2
    }
    const value: NodeLook = Object.freeze({ ...nodeLook(source), text: '' })
    let added: Cell | null = null
    graph.batchUpdate(() => {
      added = graph.insertVertex({ position: [x, y], size: [geometry.width, geometry.height], value, style: nodeStyle(value, this.look) })
      graph.addEdge(createEdgeCell({ ...this.edgeDefaults, text: '' }, this.look), graph.getDefaultParent(), source, added)
    })
    if (added) graph.setSelectionCell(added)
  }

  /** Un riquadro (in coordinate dello schema) toccherebbe una forma che c'è già, a meno di `margin`? */
  private overlaps(x: number, y: number, w: number, h: number, margin = 10): boolean {
    return this.graph
      .getDefaultParent()
      .getChildren()
      .some((cell) => {
        const g = cell.isVertex() ? cell.getGeometry() : null
        return !!g && x < g.x + g.width + margin && x + w + margin > g.x && y < g.y + g.height + margin && y + h + margin > g.y
      })
  }

  // ——— Forme dal pannello ———

  private makeDraggable(item: HTMLElement, shape: ShapeKind): void {
    const [w, h] = SHAPE_SIZE[shape]
    const preview = document.createElement('div')
    preview.className = `schema-drag-preview schema-drag-${shape}`
    preview.style.width = `${w}px`
    preview.style.height = `${h}px`
    gestureUtils.makeDraggable(item, this.graph, (_graph, _evt, _target, x, y) => this.addShape(shape, x, y), preview, -w / 2, -h / 2, true, true)
  }

  /** Aggiunge una forma; senza posizione, al centro di quello che si vede. */
  private addShape(shape: ShapeKind, x?: number, y?: number): void {
    const [w, h] = SHAPE_SIZE[shape]
    if (x === undefined || y === undefined) {
      const center = this.toSchema(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2)
      x = this.graph.snap(center.x - w / 2)
      y = this.graph.snap(center.y - h / 2)
      // Una dopo l'altra non finiscono una sopra l'altra: si scende finché c'è posto per una freccia.
      for (let i = 0; i < 30 && this.overlaps(x, y, w, h, GAP); i++) y += this.graph.getGridSize() * 2
    }
    // Un testo vuoto non si vedrebbe: nasce con «Testo», che si sostituisce scrivendo.
    const value: NodeLook = Object.freeze({ shape, text: shape === 'text' ? 'Testo' : '', color: 'default', size: 'm' })
    const cell = this.graph.insertVertex({ position: [x, y], size: [w, h], value, style: nodeStyle(value, this.look) })
    this.graph.setSelectionCell(cell)
    this.canvas.focus()
  }

  // ——— Testo: un riquadro sopra la forma o la freccia ———

  private startEditing(cell: Cell, initial?: string): void {
    const state = this.graph.view.getState(cell)
    if (!state) return
    this.stopEditing(true)
    this.editing = cell
    this.hideArrows()
    const scale = this.graph.view.scale
    const look = cell.isEdge() ? edgeLook(cell) : nodeLook(cell)
    const fontSize = Math.max(11, FONT_SIZE[look.size] * scale)
    const input = this.textInput
    input.value = initial ?? cellText(cell)
    input.style.fontSize = `${fontSize}px`
    if (cell.isVertex()) {
      input.style.left = `${state.x}px`
      input.style.top = `${state.y}px`
      input.style.width = `${Math.max(80, state.width)}px`
      input.style.minHeight = `${Math.max(30, state.height)}px`
    } else {
      const width = 160
      const cx = state.absoluteOffset.x
      const cy = state.absoluteOffset.y
      input.style.left = `${cx - width / 2}px`
      input.style.top = `${cy - fontSize}px`
      input.style.width = `${width}px`
      input.style.minHeight = `${fontSize * 2}px`
    }
    input.hidden = false
    this.fitTextInput()
    input.focus()
    if (initial === undefined) input.select()
    else input.setSelectionRange(input.value.length, input.value.length)
  }

  private fitTextInput(): void {
    const input = this.textInput
    input.style.height = 'auto'
    input.style.height = `${input.scrollHeight}px`
  }

  private stopEditing(apply: boolean): void {
    const cell = this.editing
    if (!cell) return
    this.editing = null
    this.textInput.hidden = true
    if (apply && this.textInput.value !== cellText(cell)) this.setText(cell, this.textInput.value)
    this.canvas.focus()
    if (this.touch) this.hideArrows()
  }

  private setText(cell: Cell, text: string): void {
    const value = cell.isEdge() ? { ...edgeLook(cell), text } : { ...nodeLook(cell), text }
    this.graph.getDataModel().setValue(cell, Object.freeze(value))
  }

  // ——— Aspetto: colore, forma, testo, frecce ———

  private update(cells: Cell[], patch: Partial<NodeLook & EdgeLook>): void {
    const model = this.graph.getDataModel()
    this.graph.batchUpdate(() => {
      for (const cell of cells) {
        if (cell.isVertex()) {
          const { shape, color, size } = patch
          const value: NodeLook = Object.freeze({ ...nodeLook(cell), ...(shape && { shape }), ...(color && { color }), ...(size && { size }) })
          model.setValue(cell, value)
          model.setStyle(cell, nodeStyle(value, this.look))
        } else if (cell.isEdge()) {
          const before = edgeLook(cell)
          const { color, size, route, arrows, dashed } = patch
          const value: EdgeLook = Object.freeze({
            ...before,
            ...(color && { color }),
            ...(size && { size }),
            ...(route && { route }),
            ...(arrows && { arrows }),
            ...(dashed !== undefined && { dashed }),
          })
          model.setValue(cell, value)
          model.setStyle(cell, edgeStyle(value, this.look))
          // Cambiando il tipo di linea, i punti di passaggio di prima non servono più.
          const geometry = cell.getGeometry()
          if (route && route !== before.route && geometry?.points?.length) {
            const clean = geometry.clone()
            clean.points = []
            model.setGeometry(cell, clean)
          }
        }
      }
    })
    const { route, arrows, dashed, color } = patch
    if (cells.some((c) => c.isEdge()) && (route || arrows || dashed !== undefined || color)) {
      this.edgeDefaults = { ...this.edgeDefaults, ...(route && { route }), ...(arrows && { arrows }), ...(dashed !== undefined && { dashed }), ...(color && { color }) }
    }
  }

  private renderFormat(): void {
    const cells = this.graph.getSelectionCells()
    const nodes = cells.filter((c) => c.isVertex())
    const edges = cells.filter((c) => c.isEdge())
    const looks = [...nodes.map(nodeLook), ...edges.map(edgeLook)]
    /** Il valore comune a tutta la selezione, se c'è. */
    const same = <K extends keyof (NodeLook & EdgeLook)>(list: Partial<NodeLook & EdgeLook>[], key: K) =>
      list.length && list.every((l) => l[key] === list[0][key]) ? list[0][key] : undefined

    if (!cells.length) {
      this.format.replaceChildren(
        h('p', { class: 'schema-format-hint' }, 'Seleziona una forma o una freccia per cambiarne colore e aspetto.'),
        h(
          'ul',
          { class: 'schema-help' },
          h('li', {}, 'Doppio clic su una forma per scriverci dentro, anche formule tra ', h('code', {}, '$…$'), '.'),
          h('li', {}, 'Passa sopra una forma: trascina una freccia blu per collegarla, cliccala per aggiungerne una collegata.'),
          h('li', {}, 'Rotellina per spostarti, Ctrl + rotellina per lo zoom; tieni premuto spazio per trascinare il foglio.'),
          h('li', {}, h('kbd', {}, 'Ctrl'), ' ', h('kbd', {}, 'Z'), ' annulla, ', h('kbd', {}, 'Canc'), ' elimina, ', h('kbd', {}, 'Ctrl'), ' ', h('kbd', {}, 'D'), ' duplica.'),
        ),
      )
      return
    }

    const sections: HTMLElement[] = []
    const color = same(looks, 'color')
    sections.push(
      this.section(
        'Colore',
        COLORS.map((c) => {
          const swatch = PALETTE[this.look.theme][c]
          return this.choice(COLOR_NAMES[c], color === c, () => this.update(cells, { color: c }), h('span', { class: 'schema-swatch', style: { background: swatch.fill, borderColor: swatch.stroke } }))
        }),
      ),
    )
    if (nodes.length) {
      const shape = same(nodes.map(nodeLook), 'shape')
      sections.push(this.section('Forma', SHAPES.map((s) => this.choice(SHAPE_NAMES[s], shape === s, () => this.update(nodes, { shape: s }), icon(PATHS[s], 18)))))
    }
    const size = same(looks, 'size')
    sections.push(
      this.section(
        'Testo',
        TEXT_SIZES.map((s) => this.choice(SIZE_NAMES[s], size === s, () => this.update(cells, { size: s }), h('span', { class: `schema-size schema-size-${s}` }, 'A'))),
      ),
    )
    if (edges.length) {
      const edgeLooks = edges.map(edgeLook)
      const route = same(edgeLooks, 'route')
      const arrows = same(edgeLooks, 'arrows')
      const dashed = same(edgeLooks, 'dashed')
      sections.push(
        this.section('Linea', [
          ...ROUTES.map((r) => this.choice(ROUTE_NAMES[r], route === r, () => this.update(edges, { route: r }), icon(PATHS[r], 18))),
          this.choice('Tratteggiata', dashed === true, () => this.update(edges, { dashed: dashed !== true }), icon(PATHS.dashed, 18)),
        ]),
        this.section('Punte', ARROWS.map((a) => this.choice(ARROW_NAMES[a], arrows === a, () => this.update(edges, { arrows: a }), icon(PATHS[a], 18)))),
      )
    }
    sections.push(
      h(
        'div',
        { class: 'schema-format-actions' },
        cells.length === 1
          ? h('button', { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => this.startEditing(cells[0]) } }, 'Modifica il testo')
          : null,
        h('button', { class: 'btn btn-small btn-danger-quiet', attrs: { type: 'button' }, on: { click: () => this.deleteSelection() } }, 'Elimina'),
      ),
    )
    this.format.replaceChildren(...sections)
  }

  private section(title: string, items: HTMLElement[]): HTMLElement {
    return h('section', { class: 'schema-format-section' }, h('h3', {}, title), h('div', { class: 'schema-choices' }, items))
  }

  private choice(label: string, pressed: boolean, run: () => void, content: Node): HTMLElement {
    return h(
      'button',
      {
        class: 'schema-choice',
        title: label,
        attrs: { type: 'button', 'aria-label': label, 'aria-pressed': String(pressed) },
        on: {
          click: () => {
            run()
            this.canvas.focus()
          },
        },
      },
      content,
    )
  }

  // ——— Annulla, selezione, eliminazione ———

  private setUpUndo(): void {
    const { graph, undo } = this
    const record = (_sender: unknown, evt: { getProperty(name: string): unknown }) =>
      undo.undoableEditHappened(evt.getProperty('edit') as Parameters<UndoManager['undoableEditHappened']>[0])
    graph.getDataModel().addListener(InternalEvent.UNDO, record)
    graph.getView().addListener(InternalEvent.UNDO, record)
    // Dopo Annulla e Ripeti si vede selezionato quello che è cambiato.
    const select = (_sender: unknown, evt: { getProperty(name: string): unknown }) => {
      const edit = evt.getProperty('edit') as { changes: unknown[] }
      graph.setSelectionCells(graph.getSelectionCellsForChanges(edit.changes))
    }
    undo.addListener(InternalEvent.UNDO, select)
    undo.addListener(InternalEvent.REDO, select)
  }

  private runUndo(redo: boolean): void {
    this.stopEditing(true)
    if (redo ? this.undo.canRedo() : this.undo.canUndo()) {
      if (redo) this.undo.redo()
      else this.undo.undo()
    }
  }

  private deleteSelection(): void {
    const cells = this.graph.getSelectionCells()
    if (cells.length) this.graph.removeCells(cells, true)
  }

  private duplicate(): void {
    const cells = this.graph.getSelectionCells()
    if (!cells.length) return
    const copies = this.graph.moveCells(cells, 20, 20, true)
    this.graph.setSelectionCells(copies)
  }

  // ——— Zoom, spostamento e griglia ———

  /** Da un punto del foglio (in pixel) alle coordinate dello schema. */
  private toSchema(x: number, y: number): { x: number; y: number } {
    const { scale, translate } = this.graph.view
    return { x: x / scale - translate.x, y: y / scale - translate.y }
  }

  /** Zoom tenendo fermo il punto (x, y) del foglio, di solito quello sotto il puntatore. */
  private zoomTo(scale: number, x = this.canvas.clientWidth / 2, y = this.canvas.clientHeight / 2): void {
    const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale))
    const p = this.toSchema(x, y)
    this.stopEditing(true)
    this.graph.view.scaleAndTranslate(next, x / next - p.x, y / next - p.y)
  }

  private panBy(dx: number, dy: number): void {
    const { scale, translate } = this.graph.view
    this.graph.view.setTranslate(translate.x + dx / scale, translate.y + dy / scale)
  }

  /** Tutto lo schema in vista, al massimo al 100%. */
  private fit(): void {
    const { graph, canvas } = this
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    if (!graph.getDefaultParent().getChildCount() || !width || !height) {
      graph.view.scaleAndTranslate(1, 40, 40)
      return
    }
    const { scale, translate } = graph.view
    const b = graph.getGraphBounds()
    const x = b.x / scale - translate.x
    const y = b.y / scale - translate.y
    const w = b.width / scale
    const h = b.height / scale
    const margin = 40
    const next = Math.min(1, Math.max(MIN_SCALE, Math.min((width - 2 * margin) / w, (height - 2 * margin) / h)))
    graph.view.scaleAndTranslate(next, (width / next - w) / 2 - x, (height / next - h) / 2 - y)
  }

  private setGrid(on: boolean): void {
    this.grid = on
    this.graph.setGridEnabled(on)
    this.gridButton.setAttribute('aria-pressed', String(on))
    this.canvas.classList.toggle('has-grid', on)
    this.drawGrid()
  }

  private drawGrid(): void {
    const { scale, translate } = this.graph.view
    const size = this.graph.getGridSize() * scale
    this.canvas.style.backgroundSize = `${size}px ${size}px`
    this.canvas.style.backgroundPosition = `${translate.x * scale}px ${translate.y * scale}px`
    this.zoomLabel.textContent = `${Math.round(scale * 100)}%`
  }

  private setUpPanning(): void {
    const panning = this.panning
    if (!panning) return
    // Tasto destro, spazio + trascinamento o, sugli schermi touch, un dito sul foglio vuoto.
    const isTrigger = panning.isPanningTrigger.bind(panning)
    panning.isPanningTrigger = (me) => {
      const evt = me.getEvent()
      return this.spaceDown || isTrigger(me) || (eventUtils.isTouchEvent(evt) && !me.getState())
    }
    panning.isForcePanningEvent = () => this.spaceDown
  }

  // ——— Eventi ———

  private setUpEvents(): void {
    const { graph, canvas, dialog } = this
    graph.getDataModel().addListener(InternalEvent.CHANGE, () => this.refresh())
    graph.getSelectionModel().addListener(InternalEvent.CHANGE, () => {
      this.renderFormat()
      if (this.touch) this.hideArrows()
    })
    canvas.addEventListener('pointerdown', (ev) => (this.touch = ev.pointerType !== 'mouse'), true)
    const viewChanged = () => {
      this.drawGrid()
      this.hideArrows()
    }
    graph.getView().addListener(InternalEvent.SCALE, viewChanged)
    graph.getView().addListener(InternalEvent.TRANSLATE, viewChanged)
    graph.getView().addListener(InternalEvent.SCALE_AND_TRANSLATE, viewChanged)

    graph.addMouseListener({
      mouseDown: () => this.hideArrows(),
      mouseMove: (_sender: unknown, me: InternalMouseEvent) => {
        if (graph.isMouseDown || this.editing || this.connection.isConnecting()) return
        const state = me.getState()
        if (state?.cell.isVertex()) {
          if (state !== this.hovered) this.showArrows(state)
        } else if (!this.nearHovered(me)) {
          this.hideArrows()
        }
      },
      mouseUp: () => {},
    })
    graph.addListener(InternalEvent.DOUBLE_CLICK, (_sender: unknown, evt: { getProperty(name: string): unknown; consume(): void }) => {
      const cell = evt.getProperty('cell') as Cell | null
      const event = evt.getProperty('event') as MouseEvent
      if (cell) {
        this.startEditing(cell)
      } else {
        // Doppio clic sul foglio vuoto: un rettangolo arrotondato da scrivere.
        const p = this.toSchema(...this.canvasPoint(event))
        const [w, h] = SHAPE_SIZE.rounded
        this.addShape('rounded', graph.snap(p.x - w / 2), graph.snap(p.y - h / 2))
        const added = graph.getSelectionCell()
        if (added) this.startEditing(added)
      }
      evt.consume()
    })
    canvas.addEventListener('pointerleave', (ev) => {
      if (!this.arrows.contains(ev.relatedTarget as Node)) this.hideArrows()
    })
    this.arrows.addEventListener('pointerleave', (ev) => {
      if (!canvas.contains(ev.relatedTarget as Node)) this.hideArrows()
    })
    canvas.addEventListener(
      'wheel',
      (ev) => {
        ev.preventDefault()
        if (ev.ctrlKey || ev.metaKey) {
          const [x, y] = this.canvasPoint(ev)
          this.zoomTo(this.graph.view.scale * Math.exp(-ev.deltaY / 300), x, y)
        } else {
          this.panBy(ev.shiftKey && !ev.deltaX ? -ev.deltaY : -ev.deltaX, ev.shiftKey && !ev.deltaX ? 0 : -ev.deltaY)
        }
      },
      { passive: false },
    )

    const input = this.textInput
    input.addEventListener('input', () => this.fitTextInput())
    input.addEventListener('blur', () => this.stopEditing(true))
    input.addEventListener('keydown', (ev) => {
      ev.stopPropagation()
      if (ev.key === 'Escape' || (ev.key === 'Enter' && (ev.ctrlKey || ev.metaKey)) || ev.key === 'Tab') {
        ev.preventDefault()
        this.stopEditing(true)
      }
    })

    dialog.addEventListener('cancel', (ev) => ev.preventDefault())
    dialog.addEventListener('keydown', (ev) => this.onKey(ev))
    const keyUp = (ev: KeyboardEvent) => {
      if (ev.key === ' ') this.setSpace(false)
    }
    const blur = () => this.setSpace(false)
    window.addEventListener('keyup', keyUp)
    window.addEventListener('blur', blur)
    this.cleanups.push(() => {
      window.removeEventListener('keyup', keyUp)
      window.removeEventListener('blur', blur)
    })
  }

  private canvasPoint(ev: MouseEvent): [number, number] {
    const p = styleUtils.convertPoint(this.canvas, ev.clientX, ev.clientY)
    return [p.x, p.y]
  }

  private setSpace(down: boolean): void {
    this.spaceDown = down
    this.canvas.classList.toggle('is-panning', down)
  }

  private onKey(ev: KeyboardEvent): void {
    const target = ev.target as HTMLElement
    if (target.closest('textarea, input, select')) return
    const mod = ev.ctrlKey || ev.metaKey
    const key = ev.key.toLowerCase()
    const { graph } = this
    const handled = (): void => {
      ev.preventDefault()
      ev.stopPropagation()
    }
    if (ev.key === 'Escape') {
      handled()
      graph.clearSelection()
      return
    }
    if (mod && key === 's') {
      handled()
      this.save()
      return
    }
    // Sui pulsanti, Invio e spazio li premono.
    if (target.closest('button') && (ev.key === 'Enter' || ev.key === ' ')) return
    if (mod && key === 'z') {
      handled()
      this.runUndo(ev.shiftKey)
    } else if (mod && key === 'y') {
      handled()
      this.runUndo(true)
    } else if (mod && key === 'a') {
      handled()
      graph.selectAll()
    } else if (mod && key === 'c') {
      handled()
      if (!graph.isSelectionEmpty()) Clipboard.copy(graph)
    } else if (mod && key === 'x') {
      handled()
      if (!graph.isSelectionEmpty()) Clipboard.cut(graph)
    } else if (mod && key === 'v') {
      handled()
      if (!Clipboard.isEmpty()) graph.setSelectionCells(Clipboard.paste(graph) ?? [])
    } else if (mod && key === 'd') {
      handled()
      this.duplicate()
    } else if (mod && (key === '+' || key === '=')) {
      handled()
      this.zoomTo(graph.view.scale * 1.25)
    } else if (mod && key === '-') {
      handled()
      this.zoomTo(graph.view.scale / 1.25)
    } else if (mod && key === '0') {
      handled()
      this.zoomTo(1)
    } else if (mod || ev.altKey) {
      return
    } else if (ev.key === 'Delete' || ev.key === 'Backspace') {
      handled()
      this.deleteSelection()
    } else if (ev.key.startsWith('Arrow')) {
      handled()
      const step = ev.shiftKey ? graph.getGridSize() : 1
      const dx = ev.key === 'ArrowLeft' ? -step : ev.key === 'ArrowRight' ? step : 0
      const dy = ev.key === 'ArrowUp' ? -step : ev.key === 'ArrowDown' ? step : 0
      const cells = graph.getSelectionCells().filter((c) => c.isVertex())
      if (cells.length) graph.moveCells(cells, dx, dy)
      else this.panBy(-dx * 20, -dy * 20)
    } else if (ev.key === ' ') {
      handled()
      if (!ev.repeat) this.setSpace(true)
    } else if (ev.key === 'Enter' || ev.key === 'F2') {
      const cell = graph.getSelectionCell()
      if (cell) {
        handled()
        this.startEditing(cell)
      }
    } else if (ev.key.length === 1 && !ev.isComposing && graph.getSelectionCount() === 1) {
      // Come in draw.io: scrivendo con una forma selezionata, il testo si sostituisce.
      handled()
      this.startEditing(graph.getSelectionCell(), ev.key)
    }
  }

  // ——— Stato, salvataggio e chiusura ———

  private refresh(): void {
    this.undoButton.disabled = !this.undo.canUndo()
    this.redoButton.disabled = !this.undo.canRedo()
    this.empty.hidden = this.graph.getDefaultParent().getChildCount() > 0
    if (this.closed) return
    this.renderFormat()
    // Sugli schermi touch le frecce blu seguono la forma selezionata (anche quando la si sposta).
    if (this.touch) this.hideArrows()
  }

  private current(): Schema {
    this.stopEditing(true)
    return readSchema(this.graph)
  }

  /** Salva nella nota e resta qui (Ctrl+S). */
  private save(): void {
    const schema = this.current()
    this.options.onSave(schema)
    this.saved = serializeSchema(schema)
    this.status.textContent = 'Salvato nella nota'
    clearTimeout(this.statusTimer)
    this.statusTimer = window.setTimeout(() => (this.status.textContent = ''), 2500)
  }

  private finish(): void {
    const schema = this.current()
    if (serializeSchema(schema) !== this.saved) this.options.onSave(schema)
    this.close()
  }

  private async requestClose(): Promise<void> {
    if (serializeSchema(this.current()) !== this.saved) {
      const ok = await confirmDialog({
        title: 'Chiudere senza salvare?',
        message: 'Le ultime modifiche allo schema non sono ancora nella nota.',
        confirmLabel: 'Chiudi senza salvare',
        cancelLabel: 'Torna allo schema',
        danger: true,
      })
      if (!ok) {
        this.canvas.focus()
        return
      }
    }
    this.close()
  }

  private close(): void {
    if (this.closed) return
    this.closed = true
    clearTimeout(this.statusTimer)
    for (const cleanup of this.cleanups) cleanup()
    this.graph.destroy()
    this.dialog.close()
    this.dialog.remove()
    this.resolve()
  }
}
