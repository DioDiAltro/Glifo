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
  type SelectionHandler,
} from '@maxgraph/core'
import { confirmDialog } from '../ui/dialogs'
import { ICONS, h, icon } from '../ui/dom'
import { openMenu, type MenuEntry } from '../ui/menu'
import { toast } from '../ui/toast'
import { downloadBlob, downloadText, fileNameFor } from '../store/files'
import {
  cellText,
  createEdgeCell,
  createGraph,
  edgeLook,
  edgeStyle,
  edgeTextAt,
  insertSchema,
  loadSchema,
  nodeLook,
  nodeStyle,
  readSchema,
  schemaImage,
  withTextAt,
  type Look,
} from './graph'
import { svgToPng } from './image'
import { TEMPLATES, type Template } from './templates'
import { alignBoxes, distributeBoxes, type Alignment, type Box, type Position } from './arrange'
import {
  ARROWS,
  COLOR_NAMES,
  COLORS,
  DB_SHAPES,
  DEFAULT_EDGE,
  DOT_SHAPES,
  FONT_SIZE,
  INK,
  PALETTE,
  ROTATABLE,
  ROUTES,
  SHAPE_NAMES,
  SHAPE_SIZE,
  SHAPES,
  TEXT_AT,
  TEXT_SIZES,
  joinTable,
  serializeSchema,
  splitTable,
  tableField,
  tableHeight,
  tableMetrics,
  type EdgeArrows,
  type EdgeLook,
  type EdgeRoute,
  type NodeLook,
  type Rotation,
  type Schema,
  type ShapeKind,
  type TextAt,
  type TextSize,
  type Theme,
} from './model'

export interface SchemaEditorOptions {
  schema: Schema
  theme: Theme
  /** Il titolo della nota: dà il nome alle immagini scaricate. */
  title?: string
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
  rotate: '<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4.5v5h-5"/>',
  templates: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><path d="M17 14v6M14 17h6"/>',
  straight: '<path d="M4 19 20 5"/>',
  orthogonal: '<path d="M4 19h8V5h8"/>',
  end: '<path d="M4 12h15M14 7l5 5-5 5"/>',
  both: '<path d="M5 12h14M9 7l-5 5 5 5M15 7l5 5-5 5"/>',
  none: '<path d="M4 12h16"/>',
  dashed: '<path d="M3 12h4M10 12h4M17 12h4"/>',
  curved: '<path d="M4 19c0-9 16-5 16-14"/>',
  atStart: '<path d="M3 12h18"/><rect x="4" y="8.5" width="7" height="7" rx="1.5" fill="currentColor" stroke="none"/>',
  atMiddle: '<path d="M3 12h18"/><rect x="8.5" y="8.5" width="7" height="7" rx="1.5" fill="currentColor" stroke="none"/>',
  atEnd: '<path d="M3 12h18"/><rect x="13" y="8.5" width="7" height="7" rx="1.5" fill="currentColor" stroke="none"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  handle: '<path d="M12 3.5 19 12h-4.5v8.5h-5V12H5z" fill="currentColor" stroke="none"/>',
  distributeX: '<rect x="3" y="7" width="4" height="10" rx="1"/><rect x="10" y="7" width="4" height="10" rx="1"/><rect x="17" y="7" width="4" height="10" rx="1"/>',
  distributeY: '<rect x="7" y="3" width="10" height="4" rx="1"/><rect x="7" y="10" width="10" height="4" rx="1"/><rect x="7" y="17" width="10" height="4" rx="1"/>',
} as const

const ALIGN: { how: Alignment; label: string; paths: string }[] = [
  { how: 'left', label: 'Allinea a sinistra', paths: '<path d="M4 3v18"/><rect x="7" y="6" width="10" height="4" rx="1"/><rect x="7" y="14" width="14" height="4" rx="1"/>' },
  { how: 'center', label: 'Allinea al centro', paths: '<path d="M12 3v3M12 10v4M12 18v3"/><rect x="6" y="6" width="12" height="4" rx="1"/><rect x="4" y="14" width="16" height="4" rx="1"/>' },
  { how: 'right', label: 'Allinea a destra', paths: '<path d="M20 3v18"/><rect x="7" y="6" width="10" height="4" rx="1"/><rect x="3" y="14" width="14" height="4" rx="1"/>' },
  { how: 'top', label: 'Allinea in alto', paths: '<path d="M3 4h18"/><rect x="6" y="7" width="4" height="10" rx="1"/><rect x="14" y="7" width="4" height="14" rx="1"/>' },
  { how: 'middle', label: 'Allinea in mezzo', paths: '<path d="M3 12h3M10 12h4M18 12h3"/><rect x="6" y="6" width="4" height="12" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>' },
  { how: 'bottom', label: 'Allinea in basso', paths: '<path d="M3 20h18"/><rect x="6" y="7" width="4" height="10" rx="1"/><rect x="14" y="3" width="4" height="14" rx="1"/>' },
]

/** Le forme nel pannello e tra le scelte dell'aspetto. */
const SHAPE_ICONS: Record<ShapeKind, string> = {
  rect: '<rect x="3" y="6" width="18" height="12"/>',
  rounded: '<rect x="3" y="6" width="18" height="12" rx="4"/>',
  ellipse: '<ellipse cx="12" cy="12" rx="9" ry="6.5"/>',
  rhombus: '<path d="m12 3 9 9-9 9-9-9z"/>',
  parallelogram: '<path d="M7.5 6H21l-4.5 12H3z"/>',
  hexagon: '<path d="M7.5 5.5h9L21 12l-4.5 6.5h-9L3 12z"/>',
  triangle: '<path d="M12 4.5 21 19H3z"/>',
  cloud: '<path d="M7 18.5a4 4 0 0 1-.4-8 5.5 5.5 0 0 1 10.6-1.3 4.6 4.6 0 0 1 .3 9.3z"/>',
  document: '<path d="M4 5h16v12.5c-2.7-1.6-5.3 1.6-8 0s-5.3-1.6-8 0z"/>',
  cylinder: '<ellipse cx="12" cy="6.5" rx="7.5" ry="2.5"/><path d="M4.5 6.5v11c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-11"/>',
  note: '<path d="M4 4h11.5L20 8.5V20H4z"/><path d="M15.5 4v4.5H20"/>',
  arrow: '<path d="M3 9h10.5V5l7.5 7-7.5 7v-4H3z"/>',
  doubleArrow: '<path d="m2.5 12 5.5-6v3.5h8V6l5.5 6-5.5 6v-3.5H8V18z"/>',
  text: '<path d="M5 7V5h14v2M12 5v14M9 19h6"/>',
  weakEntity: '<rect x="3" y="6" width="18" height="12"/><rect x="5.5" y="8.5" width="13" height="7"/>',
  identifyingRelation: '<path d="m12 3 9 9-9 9-9-9z"/><path d="m12 6.6 5.4 5.4-5.4 5.4-5.4-5.4z"/>',
  keyAttribute: '<ellipse cx="12" cy="12" rx="9" ry="6.5"/><path d="M8.5 14h7"/>',
  multiAttribute: '<ellipse cx="12" cy="12" rx="9.5" ry="7"/><ellipse cx="12" cy="12" rx="6.5" ry="4"/>',
  derivedAttribute: '<ellipse cx="12" cy="12" rx="9" ry="6.5" stroke-dasharray="3 2.4"/>',
  attribute: '<circle cx="6" cy="12" r="3"/><path d="M12 12h9"/>',
  identifier: '<circle cx="6" cy="12" r="3" fill="currentColor"/><path d="M12 12h9"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9h18M7 13h10M7 16.5h7"/>',
}

/** Una voce del pannello delle forme: che forma nasce, con che nome e che testo. */
interface Preset {
  id: string
  shape: ShapeKind
  name: string
  text: string
  size?: [number, number]
}

/** Le forme di sempre: una voce per forma. Un testo vuoto non si vedrebbe: «Testo» nasce scritto. */
const BASE_PRESETS: Preset[] = SHAPES.filter((s) => !DB_SHAPES.includes(s)).map((s) => ({ id: s, shape: s, name: SHAPE_NAMES[s], text: s === 'text' ? 'Testo' : '' }))

/** Basi di dati: diagrammi E-R (Chen, e Atzeni con i pallini) e tabelle, con un testo da sostituire. */
const DB_PRESETS: Preset[] = [
  { id: 'entity', shape: 'rect', name: 'Entità', text: 'Entità' },
  { id: 'weakEntity', shape: 'weakEntity', name: 'Entità debole', text: 'Entità' },
  { id: 'relation', shape: 'rhombus', name: 'Relazione', text: 'Relazione' },
  { id: 'identifyingRelation', shape: 'identifyingRelation', name: 'Relazione identificante', text: 'Relazione' },
  { id: 'attributeEllipse', shape: 'ellipse', name: 'Attributo', text: 'Attributo', size: [110, 50] },
  { id: 'keyAttribute', shape: 'keyAttribute', name: 'Attributo chiave', text: 'Codice' },
  { id: 'multiAttribute', shape: 'multiAttribute', name: 'Attributo multivalore', text: 'Attributo' },
  { id: 'derivedAttribute', shape: 'derivedAttribute', name: 'Attributo derivato', text: 'Attributo' },
  { id: 'attribute', shape: 'attribute', name: 'Attributo (pallino)', text: 'Attributo' },
  { id: 'identifier', shape: 'identifier', name: 'Identificatore (pallino pieno)', text: 'Codice' },
  { id: 'table', shape: 'table', name: 'Tabella', text: 'Tabella\nPK Codice\nNome' },
  { id: 'database', shape: 'cylinder', name: 'Database', text: 'Database' },
]

/** I gruppi del pannello: «Basi di dati» parte chiuso; quelli aperti si ricordano su questo dispositivo. */
const GROUPS_KEY = 'glifo.schema.groups'
type GroupId = 'forme' | 'db'

function loadGroups(): Record<GroupId, boolean> {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(GROUPS_KEY) ?? '{}')
    const open = typeof saved === 'object' && saved !== null ? (saved as Record<string, unknown>) : {}
    return { forme: open.forme !== false, db: open.db === true }
  } catch {
    return { forme: true, db: false }
  }
}

/** Le linee che toccano queste forme nascono senza punte, come nei libri di basi di dati. */
const ER_LINE_SHAPES: readonly ShapeKind[] = DB_SHAPES.filter((s) => s !== 'table')

const ROUTE_NAMES: Record<EdgeRoute, string> = { straight: 'Dritta', orthogonal: 'Ad angolo retto', curved: 'Curva' }
const AT_NAMES: Record<TextAt, string> = { start: 'Testo all\'inizio della freccia', middle: 'Testo a metà della freccia', end: 'Testo alla fine della freccia' }
const AT_ICONS: Record<TextAt, string> = { start: PATHS.atStart, middle: PATHS.atMiddle, end: PATHS.atEnd }
const ARROW_NAMES: Record<EdgeArrows, string> = { end: 'Punta alla fine', both: 'Punte alle due estremità', none: 'Senza punte' }
const SIZE_NAMES: Record<TextSize, string> = { s: 'Testo piccolo', m: 'Testo normale', l: 'Testo grande' }

type Direction = 'up' | 'right' | 'down' | 'left'
const DIRECTIONS: Direction[] = ['up', 'right', 'down', 'left']
/** Lo spazio tra una forma e quella che si aggiunge cliccando una freccia blu. */
const GAP = 60
const MIN_SCALE = 0.25
const MAX_SCALE = 4
const INVALID = '#c62845'
const BIG_ARROWS: readonly ShapeKind[] = ['arrow', 'doubleArrow']

class SchemaEditor {
  private readonly dialog: HTMLDialogElement
  private readonly wrap: HTMLElement
  private readonly canvas: HTMLElement
  private readonly format: HTMLElement
  private readonly arrows: HTMLElement
  private readonly textInput: HTMLTextAreaElement
  /** Le tabelle si scrivono com'è disegnate: il nome nella fascia in alto, i campi sotto. */
  private readonly tableText: HTMLElement
  private readonly tableName: HTMLInputElement
  private readonly tableFields: HTMLTextAreaElement
  /** La larghezza (in pixel) del riquadro della tabella: si allarga se una riga non ci sta. */
  private tableWidth = 0
  private readonly empty: HTMLElement
  private readonly zoomLabel: HTMLButtonElement
  private readonly undoButton: HTMLButtonElement
  private readonly redoButton: HTMLButtonElement
  private readonly gridButton: HTMLButtonElement
  private readonly status: HTMLElement
  private readonly graph: Graph
  private readonly look: Look
  /** Il colore di Glifo nel tema aperto: per quello che si trascina e le frecce da collegare. */
  private readonly accent: string
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
  /** Si sta scrivendo una tabella (nome e campi), non nel riquadro unico. */
  private editingTable = false
  /** Cambia solo il testo: il pannello dell'aspetto resta com'è (vedi setText). */
  private keepFormat = false
  private grid = true
  private spaceDown = false
  private closed = false
  private statusTimer = 0
  private readonly cleanups: (() => void)[] = []
  /** I gruppi aperti nel pannello delle forme. */
  private readonly groups = loadGroups()
  private readonly paletteItems: [HTMLElement, Preset][] = []

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
      this.menuButton('Modelli', 'Modelli pronti da aggiungere allo schema', PATHS.templates, () =>
        TEMPLATES.map((t) => ({ label: t.name, run: () => this.insertTemplate(t) })),
      ),
      this.menuButton('Scarica', 'Lo schema come immagine, da usare fuori da Glifo', ICONS.download, () => [
        { label: 'Immagine PNG', run: () => void this.exportImage('png') },
        { label: 'Immagine SVG', run: () => void this.exportImage('svg') },
        { label: 'Copia come immagine', run: () => void this.exportImage('copy') },
      ]),
      h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => void this.requestClose() } }, 'Chiudi'),
      h('button', { class: 'btn btn-primary', attrs: { type: 'button' }, on: { click: () => this.finish() } }, 'Fatto'),
    )

    const palette = h(
      'aside',
      { class: 'schema-shapes', attrs: { 'aria-label': 'Forme' } },
      this.paletteGroup('forme', 'Forme', BASE_PRESETS),
      this.paletteGroup('db', 'Basi di dati', DB_PRESETS),
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
          icon(PATHS.handle, 16),
        ),
      ),
    )
    this.textInput = h('textarea', {
      class: 'schema-text',
      attrs: { hidden: true, rows: 1, 'aria-label': 'Testo (le formule tra $…$)', spellcheck: 'false' },
    })
    this.tableName = h('input', {
      class: 'schema-table-name',
      attrs: { type: 'text', 'aria-label': 'Nome della tabella', placeholder: 'Nome della tabella', spellcheck: 'false', autocomplete: 'off' },
    })
    // Senza a capo automatici: ogni riga è un campo, come nella tabella disegnata.
    this.tableFields = h('textarea', {
      class: 'schema-table-fields',
      attrs: {
        rows: 1,
        wrap: 'off',
        'aria-label': 'Campi della tabella, uno per riga: PK davanti alla chiave primaria, FK davanti a quelle esterne',
        placeholder: 'Un campo per riga',
        spellcheck: 'false',
      },
    })
    this.tableText = h('div', { class: 'schema-table-text', attrs: { hidden: true } }, this.tableName, this.tableFields)
    this.empty = h(
      'div',
      { class: 'schema-empty' },
      h(
        'p',
        {},
        'Trascina qui una forma dal pannello a sinistra, o cliccala.',
        h('br'),
        'Poi passa sopra una forma e trascina una freccia blu per collegarla a un\'altra.',
      ),
      h('p', {}, 'Oppure comincia da un modello:'),
      h(
        'div',
        { class: 'schema-templates' },
        TEMPLATES.map((t) => h('button', { class: 'btn btn-small', title: t.hint, attrs: { type: 'button' }, on: { click: () => this.insertTemplate(t) } }, t.name)),
      ),
    )
    this.wrap = h('div', { class: 'schema-canvas-wrap' }, this.canvas, this.arrows, this.textInput, this.tableText, this.empty)
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
      const css = getComputedStyle(this.canvas)
      this.look = { theme: options.theme, surface: css.backgroundColor }
      this.accent = css.getPropertyValue('--accent').trim() || '#4f46e5'
      this.graph = createGraph(this.canvas, true)
      InternalEvent.disableContextMenu(this.canvas)
      this.connection = this.graph.getPlugin<ConnectionHandler>('ConnectionHandler')!
      this.panning = this.graph.getPlugin<PanningHandler>('PanningHandler')
      this.setUpConnections()
      this.setUpMovePreview()
      this.setUpPanning()

      loadSchema(this.graph, options.schema, this.look)
      this.saved = serializeSchema(readSchema(this.graph))
      this.setUpUndo()
      this.setUpEvents()
      for (const [item, preset] of this.paletteItems) this.makeDraggable(item, preset)
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
    connection.factoryMethod = (source, target) => createEdgeCell(this.newEdgeLook(source, target), this.look)
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
    connection.marker.validColor = this.accent
    connection.marker.invalidColor = INVALID
    connection.getEdgeColor = ((valid: boolean) => (valid ? this.accent : INVALID)) as unknown as ConnectionHandler['getEdgeColor']
    connection.getEdgeWidth = () => 2
  }

  /**
   * Il riquadro che segue le forme trascinate: maxGraph lo fa nero e sottile, che sul tema scuro
   * non si vede. Qui è nel colore di Glifo, più spesso e un po' colorato dentro.
   */
  private setUpMovePreview(): void {
    const selection = this.graph.getPlugin<SelectionHandler>('SelectionHandler')
    if (!selection) return
    selection.previewColor = this.accent
    const create = selection.createPreviewShape.bind(selection)
    selection.createPreviewShape = (bounds) => {
      const shape = create(bounds)
      shape.strokeWidth = 2
      shape.fill = this.accent
      shape.fillOpacity = 15
      return shape
    }
  }

  /** L'aspetto di una freccia nuova: quello scelto per ultimo, ma senza punte se tocca una forma E-R. */
  private newEdgeLook(...ends: (Cell | null | undefined)[]): EdgeLook {
    const er = ends.some((c) => c?.isVertex() && ER_LINE_SHAPES.includes(nodeLook(c).shape))
    return { ...this.edgeDefaults, text: '', ...(er && { arrows: 'none' as const }) }
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
      graph.addEdge(createEdgeCell(this.newEdgeLook(source, added), this.look), graph.getDefaultParent(), source, added)
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

  /** Un gruppo del pannello delle forme, con il titolo che lo apre e lo chiude. */
  private paletteGroup(id: GroupId, title: string, presets: Preset[]): HTMLElement {
    const items = presets.map((preset) => {
      const item = h(
        'button',
        {
          class: 'schema-shape',
          title: `${preset.name}: trascinala sul foglio o cliccala`,
          // data-shape solo sulle forme di sempre: nelle basi di dati entità e relazione sono rettangolo e rombo.
          attrs: { type: 'button', 'data-preset': preset.id, ...(id === 'forme' && { 'data-shape': preset.shape }) },
          on: { click: () => this.addShape(preset) },
        },
        icon(SHAPE_ICONS[preset.shape], 22),
        h('span', {}, preset.name),
      )
      this.paletteItems.push([item, preset])
      return item
    })
    const head = h(
      'button',
      { class: 'schema-group-head', attrs: { type: 'button', 'aria-expanded': String(this.groups[id]) } },
      h('span', {}, title),
      icon(PATHS.chevron, 14),
    )
    const group = h('section', { class: `schema-group${this.groups[id] ? '' : ' is-collapsed'}`, attrs: { 'data-group': id } }, head, h('div', { class: 'schema-group-items' }, items))
    head.addEventListener('click', () => {
      this.groups[id] = !this.groups[id]
      group.classList.toggle('is-collapsed', !this.groups[id])
      head.setAttribute('aria-expanded', String(this.groups[id]))
      try {
        localStorage.setItem(GROUPS_KEY, JSON.stringify(this.groups))
      } catch {
        // Senza memoria del browser si riparte dai gruppi di sempre.
      }
      if (id === 'db') this.renderFormat()
    })
    return group
  }

  /** La misura di una forma nuova di quella voce (le tabelle sono alte quanto i loro campi). */
  private presetSize(preset: Preset): [number, number] {
    const [w, h] = preset.size ?? SHAPE_SIZE[preset.shape]
    return [w, preset.shape === 'table' ? tableHeight(preset.text, 'm') : h]
  }

  private makeDraggable(item: HTMLElement, preset: Preset): void {
    const [w, h] = this.presetSize(preset)
    const preview = document.createElement('div')
    preview.className = `schema-drag-preview schema-drag-${preset.shape}`
    preview.style.width = `${w}px`
    preview.style.height = `${h}px`
    const source = gestureUtils.makeDraggable(item, this.graph, (_graph, _evt, _target, x, y) => this.addShape(preset, x, y), preview, -w / 2, -h / 2, true, true)
    // Finché non arriva sul foglio, la forma che segue il puntatore sta nella finestra dell'editor:
    // maxGraph la metterebbe nella pagina, che è sotto (la finestra è modale) e non si vedrebbe.
    const startDrag = source.startDrag.bind(source)
    source.startDrag = (evt) => {
      startDrag(evt)
      const el = source.dragElement
      if (!el) return
      // Nascosta finché maxGraph, al primo movimento, non la mette sotto il puntatore.
      el.style.visibility = 'hidden'
      this.dialog.append(el)
    }
  }

  /** Aggiunge una forma; senza posizione, al centro di quello che si vede. */
  private addShape(preset: Preset, x?: number, y?: number): void {
    const [w, h] = this.presetSize(preset)
    if (x === undefined || y === undefined) {
      const center = this.toSchema(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2)
      ;[x, y] = this.freeSpot(this.graph.snap(center.x - w / 2), this.graph.snap(center.y - h / 2), w, h)
    }
    const value: NodeLook = Object.freeze({ shape: preset.shape, text: preset.text, color: 'default', size: 'm', rot: 0 })
    const cell = this.graph.insertVertex({ position: [x, y], size: [w, h], value, style: nodeStyle(value, this.look) })
    this.graph.setSelectionCell(cell)
    this.reveal(cell)
    this.canvas.focus()
  }

  /**
   * Un posto libero per una forma nuova, a partire da (x, y): una dopo l'altra non finiscono una
   * sopra l'altra. Si scende finché c'è posto per una freccia, poi si prova una colonna più in là.
   */
  private freeSpot(x: number, y: number, w: number, h: number): [number, number] {
    const step = this.graph.getGridSize() * 2
    for (let column = 0; column < 6; column++) {
      for (let row = 0; row < 40; row++) {
        const [cx, cy] = [x + column * (w + GAP), y + row * step]
        if (!this.overlaps(cx, cy, w, h, GAP)) return [cx, cy]
      }
    }
    return [x, y]
  }

  /** Se una forma è fuori dal foglio che si vede, il foglio si sposta per mostrarla. */
  private reveal(cell: Cell): void {
    const state = this.graph.view.getState(cell)
    if (!state) return
    const margin = 24
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
    const dx = state.x < margin ? margin - state.x : state.x + state.width > width - margin ? width - margin - state.x - state.width : 0
    const dy = state.y < margin ? margin - state.y : state.y + state.height > height - margin ? height - margin - state.y - state.height : 0
    if (dx || dy) this.panBy(dx, dy)
  }

  // ——— Modelli e menu ———

  /** Un pulsante della barra che apre un menu (dentro la finestra, se no resterebbe sotto). */
  private menuButton(label: string, title: string, paths: string, entries: () => MenuEntry[]): HTMLButtonElement {
    const button = h(
      'button',
      { class: 'btn btn-small schema-menu-button', title, attrs: { type: 'button', 'aria-haspopup': 'menu', 'aria-expanded': 'false' } },
      icon(paths, 16),
      h('span', {}, label),
    )
    button.addEventListener('click', (ev) => {
      this.stopEditing(true)
      openMenu(button, entries(), label, ev.detail === 0, this.dialog)
    })
    return button
  }

  /**
   * Lo schema come immagine (chiara su bianco, come su un foglio): PNG o SVG da scaricare, o PNG
   * da incollare altrove. Quello che si vede nell'editor, anche se non è ancora nella nota.
   */
  private async exportImage(kind: 'png' | 'svg' | 'copy'): Promise<void> {
    const schema = this.current()
    if (!schema.nodes.length) {
      toast('Lo schema è vuoto: non c\'è ancora niente da salvare come immagine.')
      return
    }
    const svg = schemaImage(schema)
    const name = (ext: string) => fileNameFor(this.options.title ? `${this.options.title} schema` : 'schema', ext)
    try {
      if (kind === 'svg') {
        await downloadText(name('.svg'), svg, 'image/svg+xml')
        toast('Immagine SVG scaricata')
      } else if (kind === 'png') {
        downloadBlob(name('.png'), await svgToPng(svg))
        toast('Immagine PNG scaricata')
      } else {
        if (typeof ClipboardItem === 'undefined' || !navigator.clipboard?.write) {
          toast('Questo browser non sa copiare le immagini: scaricala come PNG.', 'error')
          return
        }
        // Safari vuole l'immagine (anche solo promessa) subito, durante il clic.
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': svgToPng(svg) })])
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
    this.canvas.focus()
  }

  /** Aggiunge un modello: sul foglio vuoto e basta, altrimenti a destra di quello che c'è. */
  private insertTemplate(template: Template): void {
    this.stopEditing(true)
    const { graph } = this
    const boxes = graph
      .getDefaultParent()
      .getChildren()
      .filter((c) => c.isVertex())
      .map((c) => c.getGeometry())
      .filter((g) => g !== null)
    const left = Math.min(...template.schema.nodes.map((n) => n.x))
    const top = Math.min(...template.schema.nodes.map((n) => n.y))
    let dx = -left
    let dy = -top
    if (boxes.length) {
      dx += graph.snap(Math.max(...boxes.map((g) => g.x + g.width)) + GAP * 2)
      dy += graph.snap(Math.min(...boxes.map((g) => g.y)))
    }
    const added = insertSchema(graph, template.schema, this.look, { dx, dy })
    // Accanto a uno schema che c'era già, il modello resta selezionato: lo si sposta tutto insieme.
    if (boxes.length) graph.setSelectionCells(added.filter((c) => c.isVertex()))
    else graph.clearSelection()
    this.fit()
    this.canvas.focus()
  }

  // ——— Testo: un riquadro sopra la forma o la freccia ———

  /**
   * Comincia a scrivere nella forma o nella freccia. `initial`: il tasto premuto con la forma
   * selezionata, che prende il posto del testo (nelle tabelle solo del nome). `at`: il punto del
   * doppio clic sul foglio, che nelle tabelle dice se si cambia il nome o un campo.
   */
  private startEditing(cell: Cell, initial?: string, at?: [number, number]): void {
    const state = this.graph.view.getState(cell)
    if (!state) return
    this.stopEditing(true)
    this.editing = cell
    this.hideArrows()
    if (cell.isVertex() && nodeLook(cell).shape === 'table') {
      this.startTable(cell, state, initial, at)
      return
    }
    const input = this.textInput
    input.value = initial ?? cellText(cell)
    input.hidden = false
    this.placeText()
    input.focus()
    if (initial === undefined) input.select()
    else input.setSelectionRange(input.value.length, input.value.length)
  }

  /** Il riquadro del testo sopra quello che si sta scrivendo, della misura giusta (anche dopo aver spostato il foglio). */
  private placeText(): void {
    const cell = this.editing
    const state = cell && this.graph.view.getState(cell)
    if (!cell || !state) return
    if (this.editingTable) {
      this.placeTable(state, nodeLook(cell))
      return
    }
    const scale = this.graph.view.scale
    const look = cell.isEdge() ? edgeLook(cell) : nodeLook(cell)
    const fontSize = Math.max(11, FONT_SIZE[look.size] * scale)
    const input = this.textInput
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
    this.fitTextInput()
  }

  private fitTextInput(): void {
    const input = this.textInput
    input.style.height = 'auto'
    input.style.height = `${input.scrollHeight}px`
  }

  /** La tabella si scrive com'è disegnata: il nome nella fascia in alto, i campi sotto, uno per riga. */
  private startTable(cell: Cell, state: CellState, initial?: string, at?: [number, number]): void {
    const look = nodeLook(cell)
    const { name, fields } = splitTable(look.text)
    this.editingTable = true
    this.tableName.value = initial ?? name
    this.tableFields.value = fields
    this.tableText.hidden = false
    this.placeText()
    // Doppio clic su un campo: si cambia quello; altrimenti (e con Invio, F2 o scrivendo) il nome.
    const row = at ? this.tableRowAt(state, look, fields, at[1]) : -1
    if (row >= 0) {
      this.selectField(row)
      return
    }
    const input = this.tableName
    input.focus()
    if (initial === undefined) input.select()
    else input.setSelectionRange(input.value.length, input.value.length)
  }

  /** Il riquadro della tabella sopra la tabella, con le sue misure e i suoi colori, allo zoom di adesso. */
  private placeTable(state: CellState, look: NodeLook): void {
    const scale = this.graph.view.scale
    const font = FONT_SIZE[look.size]
    // Come nelle altre forme il testo non scende sotto gli 11 pixel: allora il riquadro è più grande della tabella.
    const k = Math.max(scale, 11 / font)
    const { head, row } = tableMetrics(look.size)
    const swatch = PALETTE[this.look.theme][look.color]
    const box = this.tableText
    // Il bordo (2 pixel) sta fuori dalla tabella: dentro, nome e campi sono proprio dove sono disegnati.
    box.style.left = `${state.x - 2}px`
    box.style.top = `${state.y - 2}px`
    box.style.fontSize = `${font * k}px`
    box.style.setProperty('--table-head', `${head * k}px`)
    box.style.setProperty('--table-row', `${row * k}px`)
    box.style.setProperty('--table-pad', `${5 * k}px`)
    box.style.setProperty('--table-fill', swatch.fill)
    box.style.setProperty('--table-stroke', swatch.stroke)
    box.style.setProperty('--table-ink', INK[this.look.theme])
    this.tableWidth = (state.width / scale) * k + 4
    this.fitTableText()
  }

  /** Il riquadro della tabella cresce con i campi, e si allarga se un nome non ci sta. */
  private fitTableText(): void {
    const { tableText: box, tableName: name, tableFields: fields } = this
    box.style.width = `${this.tableWidth}px`
    fields.style.height = 'auto'
    fields.style.height = `${fields.scrollHeight}px`
    const extra = Math.max(fields.scrollWidth - fields.clientWidth, name.scrollWidth - name.clientWidth)
    if (extra > 0) box.style.width = `${this.tableWidth + extra + 12}px`
  }

  /** Il campo all'altezza `y` (sul foglio) della tabella; -1 sulla fascia del nome. */
  private tableRowAt(state: CellState, look: NodeLook, fields: string, y: number): number {
    const { head, row } = tableMetrics(look.size)
    const local = (y - state.y) / this.graph.view.scale
    if (!Number.isFinite(local) || local < head) return -1
    const count = fields.split('\n').length
    return Math.max(0, Math.min(count - 1, Math.floor((local - head - 5) / row)))
  }

  /** Nei campi della tabella: seleziona il nome del campo `i` (senza «PK» o «FK»), pronto da riscrivere. */
  private selectField(i: number): void {
    const fields = this.tableFields
    const lines = fields.value.split('\n')
    const line = Math.max(0, Math.min(i, lines.length - 1))
    const from = lines.slice(0, line).reduce((n, l) => n + l.length + 1, 0)
    fields.focus()
    fields.setSelectionRange(from + tableField(lines[line]).start, from + lines[line].length)
  }

  private stopEditing(apply: boolean): void {
    const cell = this.editing
    if (!cell) return
    const text = this.editingTable ? joinTable(this.tableName.value, this.tableFields.value) : this.textInput.value
    this.editing = null
    this.editingTable = false
    this.textInput.hidden = true
    this.tableText.hidden = true
    if (apply && text !== cellText(cell)) this.setText(cell, text)
    this.canvas.focus()
    if (this.touch) this.hideArrows()
  }

  /**
   * I tasti uguali in ogni riquadro di testo: Esc e Ctrl+Invio finiscono di scrivere, Ctrl+S salva
   * nella nota (altrimenti il browser aprirebbe «Salva pagina con nome»). Vero se il tasto era suo.
   */
  private textKey(ev: KeyboardEvent): boolean {
    const mod = ev.ctrlKey || ev.metaKey
    if (ev.key === 'Escape' || (ev.key === 'Enter' && mod)) {
      ev.preventDefault()
      this.stopEditing(true)
      return true
    }
    if (mod && ev.key.toLowerCase() === 's') {
      ev.preventDefault()
      this.save()
      return true
    }
    return false
  }

  /** Nella tabella: Invio, Tab e ↓ dal nome vanno ai campi; ↑ dalla prima riga e Maiusc+Tab tornano al nome. */
  private setUpTableText(): void {
    const { tableText: box, tableName: name, tableFields: fields } = this
    name.addEventListener('keydown', (ev) => {
      ev.stopPropagation()
      if (ev.isComposing || this.textKey(ev)) return
      if (ev.key === 'Enter' || ev.key === 'ArrowDown' || (ev.key === 'Tab' && !ev.shiftKey)) {
        ev.preventDefault()
        this.selectField(0)
      } else if (ev.key === 'Tab') {
        ev.preventDefault()
        this.stopEditing(true)
      }
    })
    fields.addEventListener('keydown', (ev) => {
      ev.stopPropagation()
      if (ev.isComposing || this.textKey(ev)) return
      const firstLine = !fields.value.slice(0, fields.selectionStart).includes('\n')
      if ((ev.key === 'Tab' && ev.shiftKey) || (ev.key === 'ArrowUp' && firstLine && !ev.shiftKey)) {
        ev.preventDefault()
        name.focus()
        if (ev.key === 'Tab') name.select()
        else name.setSelectionRange(name.value.length, name.value.length)
      } else if (ev.key === 'Tab') {
        ev.preventDefault()
        this.stopEditing(true)
      }
    })
    name.addEventListener('input', () => this.fitTableText())
    fields.addEventListener('input', () => this.fitTableText())
    // Si smette di scrivere uscendo dalla tabella, non passando dal nome ai campi.
    box.addEventListener('focusout', (ev) => {
      if (!box.contains(ev.relatedTarget as Node | null)) this.stopEditing(true)
    })
    // Un clic sul bordo del riquadro lascia il cursore dov'era.
    box.addEventListener('mousedown', (ev) => {
      if (ev.target === box) ev.preventDefault()
    })
  }

  private setText(cell: Cell, text: string): void {
    const value = cell.isEdge() ? { ...edgeLook(cell), text } : { ...nodeLook(cell), text }
    // Il pannello dell'aspetto non dipende dal testo, e non si rifà: si finisce di scrivere anche
    // cliccando una sua scelta (un colore…), che rifacendolo sparirebbe sotto il puntatore.
    this.keepFormat = true
    try {
      this.graph.batchUpdate(() => {
        this.graph.getDataModel().setValue(cell, Object.freeze(value))
        this.fitTable(cell)
      })
    } finally {
      this.keepFormat = false
    }
  }

  /** Una tabella è alta quanto il nome più i suoi campi, uno per riga. */
  private fitTable(cell: Cell): void {
    const look = nodeLook(cell)
    const geometry = cell.getGeometry()
    if (!cell.isVertex() || look.shape !== 'table' || !geometry) return
    const height = tableHeight(look.text, look.size)
    if (geometry.height === height) return
    const fitted = geometry.clone()
    fitted.height = height
    this.graph.getDataModel().setGeometry(cell, fitted)
  }

  // ——— Aspetto: colore, forma, testo, frecce ———

  private update(cells: Cell[], patch: Partial<NodeLook & EdgeLook>): void {
    const model = this.graph.getDataModel()
    this.graph.batchUpdate(() => {
      for (const cell of cells) {
        if (cell.isVertex()) {
          const before = nodeLook(cell)
          const { shape, color, size } = patch
          // Il verso resta tra forme dello stesso tipo (le due frecce grandi, i due pallini); le altre ripartono dritte.
          const same = (kinds: readonly ShapeKind[]) => !!shape && kinds.includes(shape) && kinds.includes(before.shape)
          const keepRot = !shape || shape === before.shape || same(BIG_ARROWS) || same(DOT_SHAPES)
          const value: NodeLook = Object.freeze({
            ...before,
            ...(shape && { shape }),
            ...(color && { color }),
            ...(size && { size }),
            rot: keepRot ? before.rot : 0,
          })
          model.setValue(cell, value)
          model.setStyle(cell, nodeStyle(value, this.look))
          // Ancora della misura con cui è nata, prende quella della forma nuova (un pallino non diventa un'ellisse minuscola).
          const geometry = cell.getGeometry()
          const [oldW, oldH] = SHAPE_SIZE[before.shape]
          if (shape && shape !== before.shape && geometry && Math.round(geometry.width) === oldW && Math.round(geometry.height) === oldH) {
            const [w, h] = SHAPE_SIZE[shape]
            const resized = geometry.clone()
            resized.x += (geometry.width - w) / 2
            resized.y += (geometry.height - h) / 2
            resized.width = w
            resized.height = h
            model.setGeometry(cell, resized)
          }
          this.fitTable(cell)
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

  /** Il testo delle frecce all'inizio, a metà o alla fine (per esempio le cardinalità vicino alle entità). */
  private setTextAt(edges: Cell[], at: TextAt): void {
    const model = this.graph.getDataModel()
    this.graph.batchUpdate(() => {
      for (const edge of edges) {
        const geometry = edge.getGeometry()
        if (geometry && edgeTextAt(edge) !== at) model.setGeometry(edge, withTextAt(geometry, at))
      }
    })
  }

  /** Sposta le forme dove dicono i conti di `arrange.ts` (le frecce le seguono). */
  private arrange(nodes: Cell[], place: (boxes: Box[]) => Position[]): void {
    const model = this.graph.getDataModel()
    const boxes = nodes.map((c) => {
      const g = c.getGeometry()!
      return { x: g.x, y: g.y, w: g.width, h: g.height }
    })
    const next = place(boxes)
    this.graph.batchUpdate(() => {
      nodes.forEach((cell, i) => {
        const geometry = cell.getGeometry()!
        if (Math.abs(geometry.x - next[i].x) < 0.01 && Math.abs(geometry.y - next[i].y) < 0.01) return
        const moved = geometry.clone()
        moved.x = next[i].x
        moved.y = next[i].y
        model.setGeometry(cell, moved)
      })
    })
  }

  /** Gira di un quarto di giro, attorno al centro, le forme che hanno un verso. */
  private rotate(cells: Cell[]): void {
    const model = this.graph.getDataModel()
    this.graph.batchUpdate(() => {
      for (const cell of cells) {
        const look = nodeLook(cell)
        const geometry = cell.getGeometry()
        if (!cell.isVertex() || !geometry || !ROTATABLE.includes(look.shape)) continue
        // Il pallino passa dall'altra parte del nome; le altre forme girano di un quarto.
        const dot = DOT_SHAPES.includes(look.shape)
        const rot = (dot ? (look.rot === 2 ? 0 : 2) : (look.rot + 1) % 4) as Rotation
        const value: NodeLook = Object.freeze({ ...look, rot })
        model.setValue(cell, value)
        model.setStyle(cell, nodeStyle(value, this.look))
        if (dot) continue
        // Il riquadro gira con la forma: larghezza e altezza si scambiano.
        const turned = geometry.clone()
        turned.x += (geometry.width - geometry.height) / 2
        turned.y += (geometry.height - geometry.width) / 2
        turned.width = geometry.height
        turned.height = geometry.width
        model.setGeometry(cell, turned)
      }
    })
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
          h('li', {}, 'Per sceglierne più di una (e allinearle): trascina un riquadro sul foglio vuoto, oppure ', h('kbd', {}, 'Maiusc'), ' + clic.'),
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
      const shapes = nodes.map((n) => nodeLook(n).shape)
      const shape = same(nodes.map(nodeLook), 'shape')
      // Le forme dei database solo a chi le usa: gruppo aperto nel pannello, o una già selezionata.
      const kinds = this.groups.db || shapes.some((s) => DB_SHAPES.includes(s)) ? SHAPES : SHAPES.filter((s) => !DB_SHAPES.includes(s))
      sections.push(this.section('Forma', kinds.map((s) => this.choice(SHAPE_NAMES[s], shape === s, () => this.update(nodes, { shape: s }), icon(SHAPE_ICONS[s], 18)))))
      if (shapes.every((s) => ROTATABLE.includes(s))) {
        const label = shapes.every((s) => DOT_SHAPES.includes(s)) ? 'Il nome dall\'altra parte del pallino' : 'Gira di un quarto (in senso orario)'
        sections.push(this.section('Verso', [this.action(label, () => this.rotate(nodes), icon(PATHS.rotate, 18))]))
      }
      if (nodes.length >= 2) {
        sections.push(this.section('Allinea', ALIGN.map((a) => this.action(a.label, () => this.arrange(nodes, (boxes) => alignBoxes(boxes, a.how)), icon(a.paths, 18)))))
      }
      if (nodes.length >= 3) {
        sections.push(
          this.section('Distribuisci', [
            this.action('Distribuisci in orizzontale (stesso spazio tra le forme)', () => this.arrange(nodes, (boxes) => distributeBoxes(boxes, 'x')), icon(PATHS.distributeX, 18)),
            this.action('Distribuisci in verticale (stesso spazio tra le forme)', () => this.arrange(nodes, (boxes) => distributeBoxes(boxes, 'y')), icon(PATHS.distributeY, 18)),
          ]),
        )
      }
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
      const ats = edges.map(edgeTextAt)
      const at = ats.every((a) => a === ats[0]) ? ats[0] : undefined
      sections.push(this.section('Posizione del testo', TEXT_AT.map((a) => this.choice(AT_NAMES[a], at === a, () => this.setTextAt(edges, a), icon(AT_ICONS[a], 18)))))
    }
    if (cells.length === 1 && nodes.length === 1 && nodeLook(nodes[0]).shape === 'table') {
      sections.push(
        h(
          'p',
          { class: 'schema-format-hint' },
          'Doppio clic sul nome della tabella o su un campo per cambiarlo. I campi sono uno per riga: Invio ne comincia uno nuovo. Scrivi «PK» davanti alla chiave primaria (si sottolinea) e «FK» davanti a quelle esterne.',
        ),
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

  /** Un pulsante del pannello che fa qualcosa (non una scelta che resta premuta). */
  private action(label: string, run: () => void, content: Node): HTMLElement {
    const button = this.choice(label, false, run, content)
    button.removeAttribute('aria-pressed')
    return button
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
      // Spostando il foglio (con la rotellina) mentre si scrive, il riquadro del testo lo segue.
      this.placeText()
    }
    graph.getView().addListener(InternalEvent.SCALE, viewChanged)
    graph.getView().addListener(InternalEvent.TRANSLATE, viewChanged)
    graph.getView().addListener(InternalEvent.SCALE_AND_TRANSLATE, viewChanged)

    graph.addMouseListener({
      mouseDown: () => {
        // Un clic sul foglio finisce di scrivere: maxGraph ferma il clic, e il riquadro del testo non perderebbe il cursore.
        this.stopEditing(true)
        this.hideArrows()
      },
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
        // Nelle tabelle conta dove: sul nome o su un campo.
        this.startEditing(cell, undefined, this.canvasPoint(event))
      } else {
        // Doppio clic sul foglio vuoto: un rettangolo arrotondato da scrivere.
        const p = this.toSchema(...this.canvasPoint(event))
        const [w, h] = SHAPE_SIZE.rounded
        this.addShape(BASE_PRESETS.find((preset) => preset.shape === 'rounded')!, graph.snap(p.x - w / 2), graph.snap(p.y - h / 2))
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
      if (ev.isComposing || this.textKey(ev)) return
      if (ev.key === 'Tab') {
        ev.preventDefault()
        this.stopEditing(true)
      }
    })
    this.setUpTableText()

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
    // I tasti nei menu (frecce, Esc) sono per il menu, non per il foglio.
    if (target.closest('textarea, input, select, .tool-menu')) return
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
    if (!this.keepFormat) this.renderFormat()
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
