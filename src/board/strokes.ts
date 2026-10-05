/**
 * La lavagna (src/board): i tratti scritti a mano, come vettori. Ogni tratto è una fila di punti
 * con la pressione, nelle coordinate della lavagna (pixel con l'ingrandimento al 100%): così si
 * possono spostare, ingrandire, cancellare a pezzi e disegnare con i colori di ogni tema.
 */

/** I colori della lavagna: nomi e non codici, così ogni tema ha i suoi (vedi ink.ts). */
export type InkColor = 'ink' | 'blue' | 'red' | 'green'
export const INK_COLORS: readonly InkColor[] = ['ink', 'blue', 'red', 'green']
/** I colori degli evidenziatori (anche questi con i codici di ogni tema in ink.ts). */
export type HighlightColor = 'yellow' | 'green' | 'pink' | 'blue'
export const HIGHLIGHT_COLORS: readonly HighlightColor[] = ['yellow', 'green', 'pink', 'blue']

export interface Stroke {
  id: string
  /**
   * Quando è stato scritto: i tratti si disegnano in quest'ordine. I pezzi di un tratto cancellato
   * a metà tengono il suo, così restano sotto quelli scritti dopo.
   */
  t: number
  /** Un colore di INK_COLORS, o di HIGHLIGHT_COLORS per l'evidenziatore. */
  color: InkColor | HighlightColor
  /** Lo spessore (il diametro con la pressione a metà), in unità della lavagna. */
  size: number
  /** true: la pressione è quella della penna; false (dito, mouse): la si simula dalla velocità. */
  pen: boolean
  /** x, y e pressione (da 0 a 1) di ogni punto, uno dopo l'altro. */
  points: number[]
  /** Evidenziatore: trasparente, sempre sotto la scrittura, spesso uguale dall'inizio alla fine. */
  highlight?: boolean
}

export interface Box {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

export interface Pt {
  x: number
  y: number
}

/** Prima i tratti scritti prima; a parità di momento decide l'id, così l'ordine è lo stesso in ogni scheda. */
export function compareStrokes(a: Stroke, b: Stroke): number {
  return a.t - b.t || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
}

/** Un id nuovo per un tratto: casuale, così due schede non ne creano mai due uguali. */
export function newStrokeId(): string {
  const c = globalThis.crypto
  if (c?.randomUUID) return c.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

/** Il rettangolo che contiene il tratto, con il suo spessore. */
export function strokeBox(s: Stroke): Box {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (let i = 0; i + 1 < s.points.length; i += 3) {
    const x = s.points[i]
    const y = s.points[i + 1]
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (y < minY) minY = y
    if (y > maxY) maxY = y
  }
  // Con la pressione al massimo il tratto arriva a circa 0,8 volte lo spessore dal centro.
  const pad = s.size
  return { minX: minX - pad, minY: minY - pad, maxX: maxX + pad, maxY: maxY + pad }
}

export function boxesTouch(a: Box, b: Box): boolean {
  return a.minX <= b.maxX && b.minX <= a.maxX && a.minY <= b.maxY && b.minY <= a.maxY
}

/** La distanza del punto p dal segmento a→b. */
export function segmentDistance(p: Pt, a: Pt, b: Pt): number {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len2 = dx * dx + dy * dy
  const t = len2 ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2)) : 0
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy))
}

type Span = [number, number]

/** Dove `lo < α + β·t < hi`, come intervallo di t (anche infinito), oppure null. */
function linearSpan(alpha: number, beta: number, lo: number, hi: number): Span | null {
  if (beta === 0) return lo < alpha && alpha < hi ? [-Infinity, Infinity] : null
  const t1 = (lo - alpha) / beta
  const t2 = (hi - alpha) / beta
  return [Math.min(t1, t2), Math.max(t1, t2)]
}

/** Dove il punto a + t·d è dentro il cerchio di centro c e raggio r, oppure null. */
function circleSpan(a: Pt, d: Pt, c: Pt, r: number): Span | null {
  const fx = a.x - c.x
  const fy = a.y - c.y
  const qa = d.x * d.x + d.y * d.y
  const qb = 2 * (d.x * fx + d.y * fy)
  const qc = fx * fx + fy * fy - r * r
  if (qa === 0) return qc < 0 ? [-Infinity, Infinity] : null
  const disc = qb * qb - 4 * qa * qc
  if (disc <= 0) return null
  const root = Math.sqrt(disc)
  return [(-qb - root) / (2 * qa), (-qb + root) / (2 * qa)]
}

function intersect(a: Span | null, b: Span | null): Span | null {
  if (!a || !b) return null
  const lo = Math.max(a[0], b[0])
  const hi = Math.min(a[1], b[1])
  return lo < hi ? [lo, hi] : null
}

/**
 * La parte del segmento a→b che passa sotto la gomma, cioè a distanza minore di `r` dal
 * segmento e0→e1 (la «capsula» che la gomma spazza muovendosi): l'intervallo [t0, t1] delle
 * posizioni sul segmento (0 è a, 1 è b), oppure null se la gomma non lo tocca.
 */
export function capsuleSpan(a: Pt, b: Pt, e0: Pt, e1: Pt, r: number): Span | null {
  const d = { x: b.x - a.x, y: b.y - a.y }
  const spans: Span[] = []
  for (const c of [e0, e1]) {
    const s = circleSpan(a, d, c, r)
    if (s) spans.push(s)
  }
  // La fascia tra i due cerchi: si proietta sulla direzione della gomma e le si misura la distanza.
  const ex = e1.x - e0.x
  const ey = e1.y - e0.y
  const elen2 = ex * ex + ey * ey
  if (elen2 > 0) {
    const elen = Math.sqrt(elen2)
    const along = linearSpan((a.x - e0.x) * ex + (a.y - e0.y) * ey, d.x * ex + d.y * ey, 0, elen2)
    const across = linearSpan(((a.x - e0.x) * ey - (a.y - e0.y) * ex) / elen, (d.x * ey - d.y * ex) / elen, -r, r)
    const band = intersect(along, across)
    if (band) spans.push(band)
  }
  if (!spans.length) return null
  // La capsula è convessa: la parte della retta che ci sta dentro è un intervallo solo, l'unione di questi.
  const lo = Math.max(0, Math.min(...spans.map((s) => s[0])))
  const hi = Math.min(1, Math.max(...spans.map((s) => s[1])))
  return lo < hi ? [lo, hi] : null
}

function point(points: number[], i: number): Pt {
  return { x: points[i * 3], y: points[i * 3 + 1] }
}

/** Il punto (con la pressione) a metà strada t tra il punto i e il successivo. */
function between(points: number[], i: number, t: number): number[] {
  const a = i * 3
  const b = a + 3
  return [0, 1, 2].map((k) => points[a + k] + (points[b + k] - points[a + k]) * t)
}

function pieceLength(piece: number[]): number {
  let len = 0
  for (let i = 3; i + 1 < piece.length; i += 3) len += Math.hypot(piece[i] - piece[i - 3], piece[i + 1] - piece[i - 2])
  return len
}

/**
 * Passa la gomma (un cerchio di raggio `r` che va da e0 a e1) su un tratto. Restituisce null se
 * non lo tocca, altrimenti i pezzi che restano (nessuno se lo cancella tutto), come file di punti:
 * il tratto si taglia esattamente dove entra e dove esce la gomma. I pezzi più corti del loro
 * spessore, che sembrerebbero puntini, vanno via con il resto.
 */
export function eraseStroke(s: Stroke, e0: Pt, e1: Pt, r: number): number[][] | null {
  const pts = s.points
  const n = Math.floor(pts.length / 3)
  if (!n) return []
  // Il bordo del tratto è a circa metà spessore dalla sua linea.
  const reach = r + s.size / 2
  if (n === 1) return segmentDistance(point(pts, 0), e0, e1) < reach ? [] : null
  const pieces: number[][] = []
  let current: number[] = []
  let touched = false
  for (let i = 0; i < n - 1; i++) {
    const span = capsuleSpan(point(pts, i), point(pts, i + 1), e0, e1, reach)
    if (!span) {
      if (!current.length) current.push(...pts.slice(i * 3, i * 3 + 3))
      current.push(...pts.slice(i * 3 + 3, i * 3 + 6))
      continue
    }
    touched = true
    const [t0, t1] = span
    if (t0 > 0) {
      if (!current.length) current.push(...pts.slice(i * 3, i * 3 + 3))
      current.push(...between(pts, i, t0))
    }
    if (current.length) pieces.push(current)
    current = []
    if (t1 < 1) current.push(...between(pts, i, t1), ...pts.slice(i * 3 + 3, i * 3 + 6))
  }
  if (current.length) pieces.push(current)
  if (!touched) return null
  return pieces.filter((p) => p.length >= 6 && pieceLength(p) >= s.size)
}

/** I nuovi tratti fatti con i pezzi rimasti: stesso colore, spessore e momento (e, se lo era, evidenziatore). */
export function piecesOf(s: Stroke, pieces: number[][], newId: () => string = newStrokeId): Stroke[] {
  return pieces.map((points) => ({ id: newId(), t: s.t, color: s.color, size: s.size, pen: s.pen, points, ...(s.highlight ? { highlight: true } : {}) }))
}

/**
 * La gomma «a linea intera»: se la gomma (un cerchio di raggio `r` che va da e0 a e1) tocca il
 * tratto anche in un punto solo, va via tutto.
 */
export function strokeTouched(s: Stroke, e0: Pt, e1: Pt, r: number): boolean {
  const pts = s.points
  const n = Math.floor(pts.length / 3)
  if (!n) return false
  const reach = r + s.size / 2
  if (n === 1) return segmentDistance(point(pts, 0), e0, e1) < reach
  for (let i = 0; i < n - 1; i++) if (capsuleSpan(point(pts, i), point(pts, i + 1), e0, e1, reach)) return true
  return false
}

/**
 * La gomma «dove passa» si allarga quando la si muove veloce, come in Microsoft Whiteboard: ferma o
 * lenta è com'è, poi cresce fino a tre volte. `speed` in pixel dello schermo al millisecondo.
 */
export function eraserGrowth(speed: number): number {
  return 1 + Math.min(2, Math.max(0, (speed - 0.3) / 0.6))
}

/** Arrotonda i numeri di un tratto (due decimali le coordinate, tre la pressione): pesa meno da salvare. */
export function roundPoints(points: number[]): number[] {
  return points.map((v, i) => (i % 3 === 2 ? Math.round(v * 1000) / 1000 : Math.round(v * 100) / 100))
}
