/**
 * Gli schemi stile draw.io dentro le note: un blocco ```schema con un JSON piccolo, che dice
 * quali forme ci sono, dove, con che testo e che colore, e quali frecce le collegano.
 * I colori hanno un nome: nel tema chiaro e in quello scuro diventano colori diversi.
 */

export const SHAPES = [
  'rect',
  'rounded',
  'ellipse',
  'rhombus',
  'parallelogram',
  'hexagon',
  'triangle',
  'cloud',
  'document',
  'cylinder',
  'note',
  'arrow',
  'doubleArrow',
  'text',
  // I processi con le corsie (chi fa cosa): un riquadro diviso in corsie, una per chi lavora
  'lanes',
  // Basi di dati: diagrammi E-R (Chen e, con i pallini, Atzeni) e tabelle
  'weakEntity',
  'identifyingRelation',
  'keyAttribute',
  'multiAttribute',
  'derivedAttribute',
  'attribute',
  'identifier',
  'table',
] as const
export type ShapeKind = (typeof SHAPES)[number]
/** Le forme solo per le basi di dati (entità, relazioni e attributi normali sono rettangolo, rombo, ellisse). */
export const DB_SHAPES: readonly ShapeKind[] = ['weakEntity', 'identifyingRelation', 'keyAttribute', 'multiAttribute', 'derivedAttribute', 'attribute', 'identifier', 'table']
/** Gli attributi «a pallino»: il verso dice da che parte sta il nome (0 a destra, 2 a sinistra). */
export const DOT_SHAPES: readonly ShapeKind[] = ['attribute', 'identifier']
/** Le forme che hanno un verso e si possono girare di un quarto di giro alla volta. */
export const ROTATABLE: readonly ShapeKind[] = ['triangle', 'arrow', 'doubleArrow', ...DOT_SHAPES]
/** Quarti di giro in senso orario: 0 è com'è nel pannello (freccia a destra, triangolo in su). */
export type Rotation = 0 | 1 | 2 | 3
export const COLORS = ['default', 'blue', 'green', 'yellow', 'red', 'purple', 'gray'] as const
export type ColorName = (typeof COLORS)[number]
export const TEXT_SIZES = ['s', 'm', 'l'] as const
export type TextSize = (typeof TEXT_SIZES)[number]
/** Freccia dritta, ad angolo retto o curva. */
export const ROUTES = ['straight', 'orthogonal', 'curved'] as const
export type EdgeRoute = (typeof ROUTES)[number]
/** Dove sta il testo di una freccia: vicino all'inizio, a metà o vicino alla fine (per le cardinalità). */
export const TEXT_AT = ['start', 'middle', 'end'] as const
export type TextAt = (typeof TEXT_AT)[number]
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
  /** Solo per le forme con un verso (ROTATABLE) e per le corsie (1: in righe), altrimenti 0. */
  rot: Rotation
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
  at: TextAt
}

export interface Schema {
  nodes: SchemaNode[]
  edges: SchemaEdge[]
}

export type NodeLook = Pick<SchemaNode, 'shape' | 'text' | 'color' | 'size' | 'rot'>
export type EdgeLook = Pick<SchemaEdge, 'text' | 'color' | 'size' | 'route' | 'arrows' | 'dashed'>

export const DEFAULT_EDGE: EdgeLook = { text: '', color: 'default', size: 'm', route: 'orthogonal', arrows: 'end', dashed: false }

/** Le misure delle forme nuove. */
export const SHAPE_SIZE: Record<ShapeKind, [number, number]> = {
  rect: [120, 60],
  rounded: [120, 60],
  ellipse: [120, 70],
  rhombus: [120, 80],
  parallelogram: [140, 60],
  hexagon: [130, 70],
  triangle: [100, 90],
  cloud: [140, 90],
  document: [120, 70],
  cylinder: [100, 90],
  note: [110, 90],
  arrow: [130, 60],
  doubleArrow: [150, 60],
  text: [100, 40],
  lanes: [660, 420],
  weakEntity: [130, 64],
  identifyingRelation: [140, 86],
  keyAttribute: [110, 50],
  multiAttribute: [120, 56],
  derivedAttribute: [110, 50],
  attribute: [110, 20],
  identifier: [110, 20],
  table: [170, 82],
}

export const FONT_SIZE: Record<TextSize, number> = { s: 12, m: 14, l: 18 }

/** Nella tabella: l'altezza della riga con il nome e quella di ogni campo, per una dimensione del testo in pixel. */
export function tableMetricsFor(fontSize: number): { head: number; row: number } {
  return { head: Math.round(fontSize * 2), row: Math.round(fontSize * 1.6) }
}

export function tableMetrics(size: TextSize): { head: number; row: number } {
  return tableMetricsFor(FONT_SIZE[size])
}

/** L'altezza che serve a una tabella con questo testo: il nome, poi un campo per riga. */
export function tableHeight(text: string, size: TextSize): number {
  const { head, row } = tableMetrics(size)
  return head + Math.max(1, text.split('\n').length - 1) * row + 10
}

/** Il testo di una tabella in due parti, come si scrive nell'editor: il nome (la prima riga) e i campi. */
export function splitTable(text: string): { name: string; fields: string } {
  const i = text.indexOf('\n')
  return i < 0 ? { name: text, fields: '' } : { name: text.slice(0, i), fields: text.slice(i + 1) }
}

/** Nome e campi di nuovo in un testo solo; le righe vuote lasciate in fondo non diventano campi. */
export function joinTable(name: string, fields: string): string {
  const rows = fields.trimEnd()
  return rows ? `${name}\n${rows}` : name
}

export interface TableField {
  /** Chiave primaria: «PK» all'inizio della riga (nel disegno, il nome sottolineato). */
  pk: boolean
  /** Chiave esterna: «FK»; con «PK» è una chiave primaria che è anche esterna (come in Esame). */
  fk: boolean
  name: string
  /** Il tipo, per l'SQL: dopo i due punti («Matricola: CHAR(6)»); '' se non c'è. */
  type: string
  /** Dove comincia il nome nella riga, dopo «PK» e «FK». */
  start: number
}

/** «PK» e «FK» all'inizio della riga, in qualsiasi ordine (anche da soli, con il nome ancora da scrivere). */
const FIELD_KEYS = /^\s*(?:(?:PK|FK)(?:\s+|$))*/i
/** Il nome e, dopo i due punti, il tipo; non nelle formule ($a:b$ resta un nome). */
const FIELD_TYPE = /^(.*?)\s*:\s*([^$]*?)\s*$/

/** Una riga dei campi: «PK», «FK» o tutte e due davanti, poi il nome e, dopo «:», il tipo. */
export function tableField(line: string): TableField {
  const keys = FIELD_KEYS.exec(line)![0]
  const rest = line.slice(keys.length)
  const typed = FIELD_TYPE.exec(rest)
  return {
    pk: /\bPK\b/i.test(keys),
    fk: /\bFK\b/i.test(keys),
    name: typed ? typed[1] : rest,
    type: typed ? typed[2] : '',
    start: keys.length,
  }
}

/** La riga di un campo, come la legge tableField. */
export function fieldLine(field: Pick<TableField, 'pk' | 'fk' | 'name' | 'type'>): string {
  const keys = `${field.pk ? 'PK ' : ''}${field.fk ? 'FK ' : ''}`
  const type = field.type.trim()
  return `${keys}${field.name}${type ? `: ${type}` : ''}`
}

export interface Table {
  name: string
  fields: TableField[]
}

/** Il testo di una tabella letto campo per campo. */
export function parseTable(text: string): Table {
  const { name, fields } = splitTable(text)
  return { name, fields: fields ? fields.split('\n').map(tableField) : [] }
}

/** Il testo di una tabella dal nome e dai campi. */
export function tableText(table: { name: string; fields: Pick<TableField, 'pk' | 'fk' | 'name' | 'type'>[] }): string {
  return joinTable(table.name, table.fields.map(fieldLine).join('\n'))
}

export const SHAPE_NAMES: Record<ShapeKind, string> = {
  rect: 'Rettangolo',
  rounded: 'Rettangolo arrotondato',
  ellipse: 'Ellisse',
  rhombus: 'Rombo',
  parallelogram: 'Parallelogramma',
  hexagon: 'Esagono',
  triangle: 'Triangolo',
  cloud: 'Nuvola',
  document: 'Documento',
  cylinder: 'Cilindro',
  note: 'Nota',
  arrow: 'Freccia grande',
  doubleArrow: 'Freccia doppia',
  text: 'Testo',
  lanes: 'Corsie',
  weakEntity: 'Entità debole',
  identifyingRelation: 'Relazione identificante',
  keyAttribute: 'Attributo chiave',
  multiAttribute: 'Attributo multivalore',
  derivedAttribute: 'Attributo derivato',
  attribute: 'Attributo (pallino)',
  identifier: 'Identificatore (pallino pieno)',
  table: 'Tabella',
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
 * Il verso, se la forma ne ha uno: i pallini hanno solo 0 (nome a destra) e 2 (a sinistra), le
 * corsie 0 (in colonne, i nomi in alto) e 1 (in righe, i nomi a sinistra).
 */
function rotation(shape: ShapeKind, value: unknown): Rotation {
  if (shape === 'lanes') return value === 1 ? 1 : 0
  if (!ROTATABLE.includes(shape) || ![1, 2, 3].includes(value as number)) return 0
  return DOT_SHAPES.includes(shape) && value !== 2 ? 0 : (value as Rotation)
}

// ——— Le corsie ———
// Un riquadro solo, diviso in parti uguali: in colonne (rot 0, i nomi in una fascia in alto) o in
// righe (rot 1, i nomi in una fascia a sinistra). Il testo ha un nome per riga, uno per corsia. Le
// forme del processo stanno sopra (non dentro: lo schema resta un elenco di forme), e spostando le
// corsie si spostano con loro (vedi l'editor).

/** I nomi delle corsie: uno per riga del testo (almeno una corsia). */
export function laneNames(text: string): string[] {
  const names = text.split('\n')
  return names.length ? names : ['']
}

/** Lo spessore della fascia con i nomi, per una dimensione del testo in pixel. */
export function laneHeadFor(fontSize: number): number {
  return Math.round(fontSize * 2.4)
}

/** La corsia nel punto (x, y) del riquadro (in coordinate dello schema) e se il punto è sulla fascia dei nomi; null se è fuori. */
export function laneAt(node: Pick<SchemaNode, 'x' | 'y' | 'w' | 'h' | 'text' | 'rot' | 'size'>, x: number, y: number): { lane: number; head: boolean } | null {
  if (x < node.x || y < node.y || x > node.x + node.w || y > node.y + node.h) return null
  const count = laneNames(node.text).length
  const head = laneHeadFor(FONT_SIZE[node.size])
  const rows = node.rot === 1
  const along = rows ? (y - node.y) / node.h : (x - node.x) / node.w
  const across = rows ? x - node.x : y - node.y
  return { lane: Math.max(0, Math.min(count - 1, Math.floor(along * count))), head: across <= head }
}

/** Il riquadro di una forma sta (con il suo centro) dentro le corsie. */
export function insideLanes(lanes: Pick<SchemaNode, 'x' | 'y' | 'w' | 'h'>, box: Pick<SchemaNode, 'x' | 'y' | 'w' | 'h'>): boolean {
  const cx = box.x + box.w / 2
  const cy = box.y + box.h / 2
  return cx > lanes.x && cx < lanes.x + lanes.w && cy > lanes.y && cy < lanes.y + lanes.h
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
      rot: rotation(shape, raw.rot),
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
      at: oneOf(raw.at, TEXT_AT, 'middle'),
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
    if (n.rot) out.rot = n.rot
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
    if (e.at !== 'middle') out.at = e.at
    return JSON.stringify(out)
  })
  const list = (items: string[]) => (items.length ? `[\n${items.join(',\n')}\n]` : '[]')
  return `{"v":1,"nodes":${list(nodes)},"edges":${list(edges)}}`
}
