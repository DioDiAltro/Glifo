/**
 * Gli schemi stile draw.io dentro le note: un blocco ```schema con un JSON piccolo, che dice
 * quali forme ci sono, dove, con che testo e che colore, e quali frecce le collegano.
 * I colori hanno un nome: nel tema chiaro e in quello scuro diventano colori diversi.
 */

export const SHAPES = ['rect', 'rounded', 'ellipse', 'rhombus', 'text'] as const
export type ShapeKind = (typeof SHAPES)[number]
export const COLORS = ['default', 'blue', 'green', 'yellow', 'red', 'purple', 'gray'] as const
export type ColorName = (typeof COLORS)[number]
export const TEXT_SIZES = ['s', 'm', 'l'] as const
export type TextSize = (typeof TEXT_SIZES)[number]
/** Freccia dritta o ad angolo retto. */
export const ROUTES = ['straight', 'orthogonal'] as const
export type EdgeRoute = (typeof ROUTES)[number]
/** Punta alla fine, a tutte e due le estremità o nessuna (una linea). */
export const ARROWS = ['end', 'both', 'none'] as const
export type EdgeArrows = (typeof ARROWS)[number]

export interface SchemaNode {
  id: string
  shape: ShapeKind
  x: number
  y: number
  w: number
  h: number
  /** Il testo, anche con formule tra `$…$`. */
  text: string
  color: ColorName
  size: TextSize
}

export interface SchemaEdge {
  id: string
  from: string
  to: string
  text: string
  color: ColorName
  size: TextSize
  route: EdgeRoute
  arrows: EdgeArrows
  dashed: boolean
  /** I punti per cui passa la freccia, se li si è spostati. */
  points: [number, number][]
}

export interface Schema {
  nodes: SchemaNode[]
  edges: SchemaEdge[]
}

export type NodeLook = Pick<SchemaNode, 'shape' | 'text' | 'color' | 'size'>
export type EdgeLook = Pick<SchemaEdge, 'text' | 'color' | 'size' | 'route' | 'arrows' | 'dashed'>

export const DEFAULT_EDGE: EdgeLook = { text: '', color: 'default', size: 'm', route: 'orthogonal', arrows: 'end', dashed: false }

/** Le misure delle forme nuove. */
export const SHAPE_SIZE: Record<ShapeKind, [number, number]> = {
  rect: [120, 60],
  rounded: [120, 60],
  ellipse: [120, 70],
  rhombus: [120, 80],
  text: [100, 40],
}

export const FONT_SIZE: Record<TextSize, number> = { s: 12, m: 14, l: 18 }

export const SHAPE_NAMES: Record<ShapeKind, string> = {
  rect: 'Rettangolo',
  rounded: 'Rettangolo arrotondato',
  ellipse: 'Ellisse',
  rhombus: 'Rombo',
  text: 'Testo',
}

export const COLOR_NAMES: Record<ColorName, string> = {
  default: 'Normale',
  blue: 'Blu',
  green: 'Verde',
  yellow: 'Giallo',
  red: 'Rosso',
  purple: 'Viola',
  gray: 'Grigio',
}

export type Theme = 'light' | 'dark'

export interface Swatch {
  fill: string
  stroke: string
}

/** Riempimento e bordo di ogni colore, nei due temi (gli stessi toni dell'interfaccia). */
export const PALETTE: Record<Theme, Record<ColorName, Swatch>> = {
  light: {
    default: { fill: '#ffffff', stroke: '#4a5068' },
    blue: { fill: '#e8ebff', stroke: '#4f46e5' },
    green: { fill: '#e3f6ea', stroke: '#15803d' },
    yellow: { fill: '#fff3d6', stroke: '#b45309' },
    red: { fill: '#fde7ea', stroke: '#c62845' },
    purple: { fill: '#f3e8ff', stroke: '#7c3aed' },
    gray: { fill: '#eef0f4', stroke: '#676d82' },
  },
  dark: {
    default: { fill: '#1b1f2b', stroke: '#9aa0b5' },
    blue: { fill: '#23264a', stroke: '#8b8cf8' },
    green: { fill: '#14301f', stroke: '#4ade80' },
    yellow: { fill: '#33270f', stroke: '#fbbf24' },
    red: { fill: '#3a1a21', stroke: '#ff7a90' },
    purple: { fill: '#2c1f45', stroke: '#c4b5fd' },
    gray: { fill: '#232733', stroke: '#9aa0b5' },
  },
}

/** Il colore del testo. */
export const INK: Record<Theme, string> = { light: '#1c2030', dark: '#e4e6ee' }

const MAX_NODES = 500
const MAX_EDGES = 1000
const MAX_TEXT = 2000
const MAX_POINTS = 50
const MAX_COORD = 100_000

export class SchemaError extends Error {}

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)

function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback
}

function num(value: unknown, min: number, max: number, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.slice(0, MAX_TEXT) : ''
}

/** Un id che non c'è ancora tra quelli usati. */
function uniqueId(wanted: unknown, used: Set<string>, prefix: string): string {
  const base = typeof wanted === 'string' && wanted ? wanted.slice(0, 40) : null
  let id = base ?? `${prefix}1`
  for (let n = 2; used.has(id); n++) id = base ? `${base}~${n}` : `${prefix}${n}`
  used.add(id)
  return id
}

function point(value: unknown): [number, number] | null {
  if (!Array.isArray(value) || value.length !== 2) return null
  const [x, y] = value
  if (typeof x !== 'number' || typeof y !== 'number' || !Number.isFinite(x) || !Number.isFinite(y)) return null
  return [num(x, -MAX_COORD, MAX_COORD, 0), num(y, -MAX_COORD, MAX_COORD, 0)]
}

/**
 * Lo schema scritto nella nota. I valori sconosciuti diventano quelli normali, le frecce che
 * non collegano due forme si tolgono; se non è proprio uno schema, SchemaError.
 */
export function parseSchema(source: string): Schema {
  let data: unknown
  try {
    data = JSON.parse(source)
  } catch {
    throw new SchemaError('Lo schema non si riesce a leggere: il testo del blocco è stato cambiato a mano?')
  }
  if (!isRecord(data)) throw new SchemaError('Questo blocco non contiene uno schema.')
  const used = new Set<string>()
  const nodes: SchemaNode[] = []
  for (const raw of Array.isArray(data.nodes) ? data.nodes.slice(0, MAX_NODES) : []) {
    if (!isRecord(raw)) continue
    const shape = oneOf(raw.shape, SHAPES, 'rect')
    const [w, h] = SHAPE_SIZE[shape]
    nodes.push({
      id: uniqueId(raw.id, used, 'n'),
      shape,
      x: num(raw.x, -MAX_COORD, MAX_COORD, 0),
      y: num(raw.y, -MAX_COORD, MAX_COORD, 0),
      w: num(raw.w, 10, 5000, w),
      h: num(raw.h, 10, 5000, h),
      text: text(raw.text),
      color: oneOf(raw.color, COLORS, 'default'),
      size: oneOf(raw.size, TEXT_SIZES, 'm'),
    })
  }
  const ids = new Set(nodes.map((n) => n.id))
  const edges: SchemaEdge[] = []
  for (const raw of Array.isArray(data.edges) ? data.edges.slice(0, MAX_EDGES) : []) {
    if (!isRecord(raw) || !ids.has(raw.from as string) || !ids.has(raw.to as string)) continue
    edges.push({
      id: uniqueId(raw.id, used, 'e'),
      from: raw.from as string,
      to: raw.to as string,
      text: text(raw.text),
      color: oneOf(raw.color, COLORS, DEFAULT_EDGE.color),
      size: oneOf(raw.size, TEXT_SIZES, DEFAULT_EDGE.size),
      route: oneOf(raw.route, ROUTES, DEFAULT_EDGE.route),
      arrows: oneOf(raw.arrows, ARROWS, DEFAULT_EDGE.arrows),
      dashed: raw.dashed === true,
      points: (Array.isArray(raw.points) ? raw.points.slice(0, MAX_POINTS) : []).map(point).filter((p): p is [number, number] => p !== null),
    })
  }
  return { nodes, edges }
}

const round = (n: number) => Math.round(n)

/**
 * Il JSON da mettere nella nota: una forma o una freccia per riga, senza i valori normali,
 * così il blocco resta corto e si legge anche fuori da Glifo.
 */
export function serializeSchema(schema: Schema): string {
  const nodes = schema.nodes.map((n) => {
    const out: Record<string, unknown> = { id: n.id, shape: n.shape, x: round(n.x), y: round(n.y), w: round(n.w), h: round(n.h) }
    if (n.text) out.text = n.text
    if (n.color !== 'default') out.color = n.color
    if (n.size !== 'm') out.size = n.size
    return JSON.stringify(out)
  })
  const edges = schema.edges.map((e) => {
    const out: Record<string, unknown> = { id: e.id, from: e.from, to: e.to }
    if (e.text) out.text = e.text
    if (e.color !== DEFAULT_EDGE.color) out.color = e.color
    if (e.size !== DEFAULT_EDGE.size) out.size = e.size
    if (e.route !== DEFAULT_EDGE.route) out.route = e.route
    if (e.arrows !== DEFAULT_EDGE.arrows) out.arrows = e.arrows
    if (e.dashed) out.dashed = true
    if (e.points.length) out.points = e.points.map(([x, y]) => [round(x), round(y)])
    return JSON.stringify(out)
  })
  const list = (items: string[]) => (items.length ? `[\n${items.join(',\n')}\n]` : '[]')
  return `{"v":1,"nodes":${list(nodes)},"edges":${list(edges)}}`
}
