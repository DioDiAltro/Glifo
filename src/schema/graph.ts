/**
 * Il collegamento con maxGraph, il motore di draw.io: crea il foglio, ci mette lo schema, lo
 * rilegge e lo disegna in SVG per l'anteprima. Si carica solo quando una nota ha uno schema.
 */
import {
  Cell,
  ConnectionHandler,
  EdgeHandlerConfig,
  Geometry,
  Graph,
  HandleConfig,
  ImageExport,
  PanningHandler,
  Point,
  RubberBandHandler,
  SelectionCellsHandler,
  SelectionHandler,
  SvgCanvas2D,
  VertexHandlerConfig,
  type CellStyle,
} from '@maxgraph/core'
import { labelHtml } from './label'
import { DEFAULT_EDGE, FONT_SIZE, INK, PALETTE, type EdgeLook, type NodeLook, type Rotation, type Schema, type Theme } from './model'
import { registerShapes, SHAPE_STYLES } from './shapes'

export interface Look {
  theme: Theme
  /** Il colore su cui si disegna: fa da sfondo al testo delle frecce. */
  surface: string
}

const FONT_FAMILY = "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
const SVG_NS = 'http://www.w3.org/2000/svg'
/** Lo spazio attorno allo schema nell'anteprima e nelle immagini dei file .md. */
const PADDING = 8
const IMAGE_PADDING = 16

const COMPASS = ['east', 'south', 'west', 'north'] as const
type Compass = (typeof COMPASS)[number]

/** La direzione di maxGraph dopo `rot` quarti di giro in senso orario da `start`. */
function turn(start: Compass, rot: Rotation): Compass {
  return COMPASS[(COMPASS.indexOf(start) + rot) % 4]
}

/** Nel triangolo il testo sta verso il lato largo, lontano dalla punta. */
const TRIANGLE_TEXT: Record<Compass, CellStyle> = {
  north: { spacingTop: 30, spacingLeft: 12, spacingRight: 12 },
  east: { spacingRight: 30, spacingTop: 12, spacingBottom: 12 },
  south: { spacingBottom: 30, spacingLeft: 12, spacingRight: 12 },
  west: { spacingLeft: 30, spacingTop: 12, spacingBottom: 12 },
}

export function nodeStyle(v: NodeLook, look: Look): CellStyle {
  const swatch = PALETTE[look.theme][v.color]
  const base: CellStyle = {
    shape: 'rectangle',
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE[v.size],
    fontColor: INK[look.theme],
    whiteSpace: 'wrap',
    spacing: 6,
    fillColor: swatch.fill,
    strokeColor: swatch.stroke,
    strokeWidth: 1.5,
  }
  switch (v.shape) {
    case 'rounded':
      return { ...base, rounded: true }
    case 'ellipse':
      return { ...base, shape: 'ellipse', perimeter: 'ellipsePerimeter' }
    case 'rhombus':
      return { ...base, shape: 'rhombus', perimeter: 'rhombusPerimeter' }
    case 'parallelogram':
      return { ...base, shape: SHAPE_STYLES.parallelogram, spacingLeft: 14, spacingRight: 14 }
    case 'hexagon':
      return { ...base, shape: 'hexagon', perimeter: 'hexagonPerimeter', spacingLeft: 14, spacingRight: 14 }
    case 'triangle': {
      const direction = turn('north', v.rot)
      return { ...base, shape: 'triangle', perimeter: 'trianglePerimeter', direction, ...TRIANGLE_TEXT[direction] }
    }
    case 'cloud':
      return { ...base, shape: 'cloud', perimeter: 'ellipsePerimeter', spacing: 16 }
    case 'document':
      return { ...base, shape: SHAPE_STYLES.document, spacingBottom: 10 }
    case 'cylinder':
      return { ...base, shape: 'cylinder', spacingTop: 14 }
    case 'note':
      return { ...base, shape: SHAPE_STYLES.note, spacingRight: 8 }
    case 'arrow':
      return { ...base, shape: SHAPE_STYLES.arrow, direction: turn('east', v.rot) }
    case 'doubleArrow':
      return { ...base, shape: SHAPE_STYLES.doubleArrow, direction: turn('east', v.rot) }
    case 'text':
      // Solo testo: il colore va alle lettere.
      return { ...base, fillColor: 'none', strokeColor: 'none', fontColor: v.color === 'default' ? INK[look.theme] : swatch.stroke }
    default:
      return base
  }
}

export function edgeStyle(v: EdgeLook, look: Look): CellStyle {
  const style: CellStyle = {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE[v.size],
    fontColor: INK[look.theme],
    labelBackgroundColor: look.surface,
    strokeColor: PALETTE[look.theme][v.color].stroke,
    strokeWidth: 1.5,
    endArrow: v.arrows === 'none' ? 'none' : 'classic',
    startArrow: v.arrows === 'both' ? 'classic' : 'none',
    endSize: 8,
    startSize: 8,
    dashed: v.dashed,
  }
  if (v.route === 'orthogonal') Object.assign(style, { edgeStyle: 'orthogonalEdgeStyle', rounded: true, orthogonalLoop: true })
  return style
}

const isNodeLook = (v: unknown): v is NodeLook => typeof v === 'object' && v !== null && 'shape' in v
const isEdgeLook = (v: unknown): v is EdgeLook => typeof v === 'object' && v !== null && 'route' in v

/** Come appare una forma (il suo valore in maxGraph). Nessuno lo cambia: se ne mette uno nuovo. */
export function nodeLook(cell: Cell): NodeLook {
  const v: unknown = cell.getValue()
  return isNodeLook(v) ? v : { shape: 'rect', text: typeof v === 'string' ? v : '', color: 'default', size: 'm', rot: 0 }
}

export function edgeLook(cell: Cell): EdgeLook {
  const v: unknown = cell.getValue()
  return isEdgeLook(v) ? v : { ...DEFAULT_EDGE, text: typeof v === 'string' ? v : '' }
}

export function cellText(cell: Cell): string {
  return cell.isEdge() ? edgeLook(cell).text : nodeLook(cell).text
}

/** Una freccia nuova, come quelle che si disegnano trascinando. */
export function createEdgeCell(value: EdgeLook, look: Look): Cell {
  const edge = new Cell(Object.freeze({ ...value }), undefined, edgeStyle(value, look))
  edge.setEdge(true)
  const geometry = new Geometry()
  geometry.relative = true
  edge.setGeometry(geometry)
  return edge
}

let handlesStyled = false

/** Maniglie e selezione con il colore di Glifo (in maxGraph sono uguali per tutti i fogli). */
function styleHandles(): void {
  if (handlesStyled) return
  handlesStyled = true
  HandleConfig.fillColor = '#4f46e5'
  HandleConfig.strokeColor = '#ffffff'
  HandleConfig.size = 8
  VertexHandlerConfig.selectionColor = '#6366f1'
  VertexHandlerConfig.rotationEnabled = false
  EdgeHandlerConfig.selectionColor = '#6366f1'
  EdgeHandlerConfig.virtualBendsEnabled = true
  EdgeHandlerConfig.connectFillColor = '#4f46e5'
}

/**
 * Un foglio di maxGraph. `editable`: con selezione, spostamenti, collegamenti e selezione a
 * rettangolo; altrimenti serve solo a disegnare (anteprima).
 */
export function createGraph(container: HTMLElement, editable: boolean): Graph {
  registerShapes()
  if (editable) styleHandles()
  const plugins = editable ? [SelectionCellsHandler, ConnectionHandler, SelectionHandler, PanningHandler, RubberBandHandler] : []
  const graph = new Graph(container, undefined, plugins)
  graph.setHtmlLabels(true)
  // Il testo è sempre HTML preparato qui: formule con KaTeX, il resto con i caratteri speciali al sicuro.
  graph.getLabel = (cell) => (cell ? labelHtml(cellText(cell)) : '')
  graph.convertValueToString = (cell) => cellText(cell)
  graph.setTooltips(false)
  graph.setCellsEditable(false)
  graph.setAllowDanglingEdges(false)
  graph.setDropEnabled(false)
  graph.setSplitEnabled(false)
  graph.edgeLabelsMovable = false
  graph.vertexLabelsMovable = false
  if (!editable) {
    graph.setEnabled(false)
    return graph
  }
  graph.setConnectable(true)
  graph.setPanning(true)
  graph.setGridEnabled(true)
  graph.setGridSize(10)
  const selection = graph.getPlugin<SelectionHandler>('SelectionHandler')
  if (selection) selection.guidesEnabled = true
  return graph
}

/** Mette lo schema nel foglio, al posto di quello che c'era. */
export function loadSchema(graph: Graph, schema: Schema, look: Look): void {
  graph.batchUpdate(() => {
    graph.removeCells(graph.getChildCells(graph.getDefaultParent(), true, true), true)
    insertSchema(graph, schema, look, { keepIds: true })
  })
}

/**
 * Aggiunge lo schema a quello che c'è nel foglio, spostato di `dx`, `dy` (per i modelli).
 * Con `keepIds` le forme tengono i loro id, altrimenti maxGraph ne dà di nuovi.
 */
export function insertSchema(graph: Graph, schema: Schema, look: Look, { dx = 0, dy = 0, keepIds = false } = {}): Cell[] {
  const parent = graph.getDefaultParent()
  const cells = new Map<string, Cell>()
  const added: Cell[] = []
  graph.batchUpdate(() => {
    for (const n of schema.nodes) {
      const value: NodeLook = Object.freeze({ shape: n.shape, text: n.text, color: n.color, size: n.size, rot: n.rot })
      const id = keepIds ? n.id : undefined
      const vertex = graph.insertVertex({ parent, id, value, position: [n.x + dx, n.y + dy], size: [n.w, n.h], style: nodeStyle(value, look) })
      cells.set(n.id, vertex)
      added.push(vertex)
    }
    for (const e of schema.edges) {
      const value: EdgeLook = Object.freeze({ text: e.text, color: e.color, size: e.size, route: e.route, arrows: e.arrows, dashed: e.dashed })
      const id = keepIds ? e.id : undefined
      const edge = graph.insertEdge({ parent, id, value, source: cells.get(e.from), target: cells.get(e.to), style: edgeStyle(value, look) })
      const geometry = edge.getGeometry()
      if (geometry && e.points.length) geometry.points = e.points.map(([x, y]) => new Point(x + dx, y + dy))
      added.push(edge)
    }
  })
  return added
}

/** Lo schema disegnato nel foglio. */
export function readSchema(graph: Graph): Schema {
  const schema: Schema = { nodes: [], edges: [] }
  for (const cell of graph.getDefaultParent().getChildren()) {
    const id = cell.getId()
    const geometry = cell.getGeometry()
    if (!id || !geometry) continue
    if (cell.isVertex()) {
      schema.nodes.push({ id, ...nodeLook(cell), x: geometry.x, y: geometry.y, w: geometry.width, h: geometry.height })
    } else if (cell.isEdge()) {
      const from = cell.getTerminal(true)?.getId()
      const to = cell.getTerminal(false)?.getId()
      if (!from || !to) continue
      schema.edges.push({ id, from, to, ...edgeLook(cell), points: (geometry.points ?? []).map((p): [number, number] => [p.x, p.y]) })
    }
  }
  return schema
}

/** Ridisegna forme e frecce con i colori di `look` (per esempio se cambia il tema). */
export function restyle(graph: Graph, look: Look): void {
  const model = graph.getDataModel()
  graph.batchUpdate(() => {
    for (const cell of graph.getDefaultParent().getChildren()) {
      if (cell.isVertex()) model.setStyle(cell, nodeStyle(nodeLook(cell), look))
      else if (cell.isEdge()) model.setStyle(cell, edgeStyle(edgeLook(cell), look))
    }
  })
}

/**
 * Lo schema disegnato in SVG. `image`: un'immagine a sé, che si legge anche fuori da Glifo:
 * sfondo bianco, più margine e formule in MathML (gli stili di KaTeX lì non ci sono).
 */
function drawSchema(schema: Schema, look: Look, image: boolean): SVGSVGElement {
  const container = document.createElement('div')
  container.style.cssText = 'position:absolute;left:-10000px;top:0;width:100px;height:100px;overflow:hidden;visibility:hidden'
  document.body.append(container)
  const graph = createGraph(container, false)
  if (image) graph.getLabel = (cell) => (cell ? labelHtml(cellText(cell), true) : '')
  const padding = image ? IMAGE_PADDING : PADDING
  try {
    loadSchema(graph, schema, look)
    // Lo schema si sposta nell'angolo: i testi (in foreignObject) seguono solo così.
    const bounds = graph.getGraphBounds()
    graph.view.setTranslate(padding - Math.floor(bounds.x), padding - Math.floor(bounds.y))
    const width = Math.ceil(bounds.width + 2 * padding)
    const height = Math.ceil(bounds.height + 2 * padding)
    const svg = document.createElementNS(SVG_NS, 'svg')
    svg.setAttribute('xmlns', SVG_NS)
    svg.setAttribute('width', String(width))
    svg.setAttribute('height', String(height))
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    if (image) {
      const background = document.createElementNS(SVG_NS, 'rect')
      background.setAttribute('width', '100%')
      background.setAttribute('height', '100%')
      background.setAttribute('fill', look.surface)
      svg.append(background)
    }
    const state = graph.getView().getState(graph.getDefaultParent())
    if (state) new ImageExport().drawState(state, new SvgCanvas2D(svg, false))
    return svg
  } finally {
    graph.destroy()
    container.remove()
  }
}

/** Lo schema disegnato in SVG, per l'anteprima e la stampa. */
export function schemaSvg(schema: Schema, look: Look): string {
  return drawSchema(schema, look, false).outerHTML
}

/**
 * Lo schema come immagine SVG da mettere nei file .md, che VS Code e gli altri programmi sanno
 * mostrare: con i colori chiari su bianco, come su un foglio, qualunque sia il tema.
 */
export function schemaImage(schema: Schema): string {
  return new XMLSerializer().serializeToString(drawSchema(schema, { theme: 'light', surface: '#ffffff' }, true))
}
