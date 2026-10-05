import { segmentDistance, type Pt } from './strokes'

/**
 * Le figure precise della lavagna, come in Microsoft Whiteboard e nelle Note dell'iPad: da un tratto
 * fatto a mano la figura più vicina (linea, freccia, spezzata, triangolo, rettangolo, quadrato, rombo,
 * quadrilatero, pentagono, esagono, ellisse, cerchio), raddrizzata dove è quasi dritta. Le coordinate
 * sono quelle della lavagna; le misure minime sono in pixel dello schermo (`unit`: quante unità della
 * lavagna fa un pixel, cioè 1 / ingrandimento).
 *
 * Come si riconosce: il tratto si ricampiona a passi uguali; i vertici sono quelli di Douglas–Peucker
 * dove il tratto gira davvero di colpo (un angolo, non una curva); con almeno tre angoli e il tratto
 * chiuso è un poligono, senza angoli e chiuso un'ellisse; aperto, una linea, una freccia o una spezzata.
 */

export type PolygonKind = 'triangle' | 'rectangle' | 'square' | 'diamond' | 'quadrilateral' | 'pentagon' | 'hexagon'

export type Shape =
  | { kind: 'line'; a: Pt; b: Pt }
  /** La freccia va da `a` alla punta `b`; `head` è quanto sono lunghe le due alette. */
  | { kind: 'arrow'; a: Pt; b: Pt; head: number }
  | { kind: 'polyline'; points: Pt[] }
  /** I vertici, in ordine, senza ripetere il primo. */
  | { kind: PolygonKind; points: Pt[] }
  /** `angle`: la direzione di `rx`, in radianti. */
  | { kind: 'ellipse' | 'circle'; c: Pt; rx: number; ry: number; angle: number }

export type ShapeKind = Shape['kind']

/** I nomi delle figure, per il registro dei tocchi. */
export const SHAPE_NAMES: Record<ShapeKind, string> = {
  line: 'linea',
  arrow: 'freccia',
  polyline: 'spezzata',
  triangle: 'triangolo',
  rectangle: 'rettangolo',
  square: 'quadrato',
  diamond: 'rombo',
  quadrilateral: 'quadrilatero',
  pentagon: 'pentagono',
  hexagon: 'esagono',
  ellipse: 'ellisse',
  circle: 'cerchio',
}

export interface RecognizeOptions {
  /** Quante unità della lavagna fa un pixel dello schermo (1 / ingrandimento). */
  unit?: number
  /**
   * Per le forme automatiche: solo figure chiare e abbastanza grandi, perché la scrittura resti com'è
   * (niente spezzate: Z, N, L e V sono lettere).
   */
  strict?: boolean
}

const DEG = Math.PI / 180
/** Quanti punti, a passi uguali, per riconoscere un tratto. */
const SAMPLES = 96
/** Le alette della freccia, rispetto all'asta. */
const ARROW_ANGLE = 30 * DEG
/**
 * Un angolo vero gira quasi tutto vicino al vertice: almeno questa parte della svolta tra i lati,
 * dentro una finestra larga `CORNER_WINDOW` della figura (gli angoli a mano sono un po' arrotondati).
 * Misurati su tanti tratti simulati, con il tremolio e gli angoli arrotondati.
 */
const SHARP = 0.55
const CORNER_WINDOW = 0.12

// ——— Un po' di geometria ———

const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y)
const angleOf = (a: Pt, b: Pt) => Math.atan2(b.y - a.y, b.x - a.x)

/** Quanto gira la direzione passando da a→b a b→c, tra 0 e π. */
function turn(a: Pt, b: Pt, c: Pt): number {
  let d = Math.abs(angleOf(b, c) - angleOf(a, b))
  if (d > Math.PI) d = 2 * Math.PI - d
  return d
}

function rotate(p: Pt, c: Pt, angle: number, scale = 1): Pt {
  const cos = Math.cos(angle) * scale
  const sin = Math.sin(angle) * scale
  const dx = p.x - c.x
  const dy = p.y - c.y
  return { x: c.x + dx * cos - dy * sin, y: c.y + dx * sin + dy * cos }
}

function centroid(points: Pt[]): Pt {
  let x = 0
  let y = 0
  for (const p of points) {
    x += p.x
    y += p.y
  }
  return { x: x / points.length, y: y / points.length }
}

function pathLength(points: Pt[]): number {
  let len = 0
  for (let i = 1; i < points.length; i++) len += dist(points[i - 1], points[i])
  return len
}

/** `n` punti a passi uguali lungo il tratto. */
function resample(points: Pt[], n: number): Pt[] {
  const total = pathLength(points)
  if (!total) return [points[0]]
  const step = total / (n - 1)
  const out: Pt[] = [points[0]]
  let walked = 0
  let i = 1
  let prev = points[0]
  for (let k = 1; k < n - 1; k++) {
    const target = k * step
    while (i < points.length && walked + dist(prev, points[i]) < target) {
      walked += dist(prev, points[i])
      prev = points[i]
      i++
    }
    if (i >= points.length) break
    const d = dist(prev, points[i])
    const t = d ? (target - walked) / d : 0
    out.push({ x: prev.x + (points[i].x - prev.x) * t, y: prev.y + (points[i].y - prev.y) * t })
  }
  out.push(points[points.length - 1])
  return out
}

/** Douglas–Peucker sui punti `idx` (indici di `points`, in ordine): gli indici dei vertici tenuti. */
function simplify(points: Pt[], idx: number[], eps: number): number[] {
  const keep = new Set([0, idx.length - 1])
  const stack: [number, number][] = [[0, idx.length - 1]]
  while (stack.length) {
    const [lo, hi] = stack.pop()!
    let far = -1
    let best = eps
    for (let k = lo + 1; k < hi; k++) {
      const d = segmentDistance(points[idx[k]], points[idx[lo]], points[idx[hi]])
      if (d > best) {
        best = d
        far = k
      }
    }
    if (far < 0) continue
    keep.add(far)
    stack.push([lo, far], [far, hi])
  }
  return [...keep].sort((a, b) => a - b).map((k) => idx[k])
}

/** La distanza media dei punti dal poligono (chiuso) o dalla spezzata (aperta). */
function polylineError(points: Pt[], verts: Pt[], closed: boolean): number {
  let sum = 0
  const edges = closed ? verts.length : verts.length - 1
  for (const p of points) {
    let best = Infinity
    for (let e = 0; e < edges; e++) best = Math.min(best, segmentDistance(p, verts[e], verts[(e + 1) % verts.length]))
    sum += best
  }
  return sum / points.length
}

// ——— Gli angoli del tratto ———

/**
 * I vertici del tratto (indici dei punti ricampionati): quelli di Douglas–Peucker dove il tratto gira
 * davvero di colpo. Una curva fatta bene gira poco alla volta e non ne ha; un angolo disegnato a mano
 * gira quasi tutto in un tratto breve. Per un tratto chiuso gli indici girano intorno.
 */
function corners(res: Pt[], closed: boolean, diag: number): number[] {
  const n = res.length
  const eps = 0.04 * diag
  let verts: number[]
  if (closed) {
    let far = 0
    for (let i = 1; i < n; i++) if (dist(res[0], res[i]) > dist(res[0], res[far])) far = i
    const first = simplify(res, range(0, far), eps)
    const second = simplify(res, [...range(far, n - 1), 0], eps)
    verts = [...first, ...second.slice(1, -1)]
  } else {
    verts = simplify(res, range(0, n - 1), eps)
  }
  // La finestra in cui un angolo deve girare: una parte della figura (gli angoli fatti a mano sono
  // un po' arrotondati), non della strada fatta.
  const spacing = pathLength(res) / (n - 1)
  const w = Math.max(2, Math.min(Math.floor(n / 8), Math.round((CORNER_WINDOW * diag) / spacing)))
  const at = (i: number) => (closed ? res[((i % n) + n) % n] : res[Math.max(0, Math.min(n - 1, i))])
  // Toglie un vertice alla volta, il meno netto, finché quelli rimasti sono tutti angoli veri.
  for (;;) {
    const m = verts.length
    let worst = -1
    let worstScore = Infinity
    const from = closed ? 0 : 1
    const to = closed ? m : m - 1
    for (let k = from; k < to; k++) {
      const prev = res[verts[(k - 1 + m) % m]]
      const here = res[verts[k]]
      const next = res[verts[(k + 1) % m]]
      const chord = turn(prev, here, next)
      const local = turn(at(verts[k] - w), here, at(verts[k] + w))
      const sharp = chord >= 30 * DEG && local >= Math.max(25 * DEG, SHARP * chord)
      const score = sharp ? Infinity : local
      if (score < worstScore) {
        worstScore = score
        worst = k
      }
    }
    if (worst < 0 || worstScore === Infinity || verts.length <= (closed ? 0 : 2)) break
    verts.splice(worst, 1)
  }
  return verts
}

function range(from: number, to: number): number[] {
  const out: number[] = []
  for (let i = from; i <= to; i++) out.push(i)
  return out
}

// ——— Raddrizzare ———

/** Un angolo vicino all'orizzontale, alla verticale o a 45° diventa esatto. */
export function snapAngle(angle: number): number {
  const step = 45 * DEG
  const nearest = Math.round(angle / step) * step
  const off = Math.abs(angle - nearest)
  const axis = Math.round(nearest / step) % 2 === 0
  return off <= (axis ? 6 : 4) * DEG ? nearest : angle
}

/** La linea da `a` a `b`, raddrizzata intorno al punto `pivot` (di solito il punto di mezzo). */
function straightLine(a: Pt, b: Pt, pivot: Pt): { a: Pt; b: Pt } {
  const angle = angleOf(a, b)
  const snapped = snapAngle(angle)
  if (snapped === angle) return { a, b }
  return { a: rotate(a, pivot, snapped - angle), b: rotate(b, pivot, snapped - angle) }
}

/** Il poligono girato intorno al suo centro di quanto serve perché il lato (o la diagonale) `ref` sia orizzontale o verticale, se ci manca poco. */
function alignPolygon(points: Pt[], refs: [number, number][], tolerance = 7 * DEG): Pt[] {
  let best = Infinity
  for (const [i, j] of refs) {
    const a = angleOf(points[i], points[j])
    const off = a - Math.round(a / (90 * DEG)) * 90 * DEG
    if (Math.abs(off) < Math.abs(best)) best = off
  }
  if (Math.abs(best) > tolerance || best === 0) return points
  const c = centroid(points)
  return points.map((p) => rotate(p, c, -best))
}

/** Tutti i lati di un poligono di `n` vertici, come coppie di indici. */
const sides = (n: number): [number, number][] => range(0, n - 1).map((i) => [i, (i + 1) % n] as [number, number])

function interiorAngle(points: Pt[], i: number): number {
  const n = points.length
  return Math.PI - turn(points[(i - 1 + n) % n], points[i], points[(i + 1) % n])
}

function triangle(points: Pt[]): Pt[] {
  let tri = points
  // Un angolo quasi retto diventa retto: resta il lato più lungo dei due, l'altro gli si mette di traverso.
  for (let i = 0; i < 3; i++) {
    if (Math.abs(interiorAngle(tri, i) - 90 * DEG) > 8 * DEG) continue
    const v = tri[i]
    const p = tri[(i + 2) % 3]
    const q = tri[(i + 1) % 3]
    const [long, short] = dist(v, p) >= dist(v, q) ? [p, q] : [q, p]
    const u = { x: (long.x - v.x) / dist(v, long), y: (long.y - v.y) / dist(v, long) }
    // Dalla parte dove era il lato corto.
    const side = Math.sign(u.x * (short.y - v.y) - u.y * (short.x - v.x)) || 1
    const len = dist(v, short)
    const fixed = { x: v.x - side * u.y * len, y: v.y + side * u.x * len }
    tri = tri.map((pt) => (pt === short ? fixed : pt))
    break
  }
  return alignPolygon(tri, sides(3), 6 * DEG)
}

function quadrilateral(points: Pt[]): { kind: PolygonKind; points: Pt[] } {
  const angles = range(0, 3).map((i) => interiorAngle(points, i))
  const rectLike = angles.every((a) => Math.abs(a - 90 * DEG) <= 14 * DEG)
  // Rombo: le diagonali quasi perpendicolari che si tagliano a metà.
  const d1 = angleOf(points[0], points[2])
  const d2 = angleOf(points[1], points[3])
  let between = Math.abs(d1 - d2) % Math.PI
  if (between > Math.PI / 2) between = Math.PI - between
  const m1 = { x: (points[0].x + points[2].x) / 2, y: (points[0].y + points[2].y) / 2 }
  const m2 = { x: (points[1].x + points[3].x) / 2, y: (points[1].y + points[3].y) / 2 }
  const longest = Math.max(dist(points[0], points[2]), dist(points[1], points[3]))
  const diamondLike = Math.abs(between - 90 * DEG) <= 14 * DEG && dist(m1, m2) <= 0.12 * longest
  // Tutti e due (un rombo quasi quadrato): decide come è messo, con i lati o con le diagonali in piedi.
  let edges = 0
  for (let i = 0; i < 4; i++) {
    const a = angleOf(points[i], points[(i + 1) % 4])
    edges += Math.abs(a - Math.round(a / (90 * DEG)) * 90 * DEG) / 4
  }
  if (rectLike && !(diamondLike && edges > 22.5 * DEG)) {
    // Rettangolo: la direzione media dei lati (a meno di 90°), le misure medie dei lati opposti.
    let s = 0
    let c = 0
    for (let i = 0; i < 4; i++) {
      const a = angleOf(points[i], points[(i + 1) % 4])
      s += Math.sin(4 * a)
      c += Math.cos(4 * a)
    }
    let angle = Math.atan2(s, c) / 4
    if (Math.abs(angle) <= 7 * DEG) angle = 0
    const center = centroid(points)
    const u = { x: Math.cos(angle), y: Math.sin(angle) }
    // Le misure lungo le due direzioni: la media dei lati che vanno da quella parte.
    let along = 0
    let across = 0
    for (let i = 0; i < 4; i++) {
      const p = points[i]
      const q = points[(i + 1) % 4]
      const dx = q.x - p.x
      const dy = q.y - p.y
      along += Math.abs(dx * u.x + dy * u.y) / 2
      across += Math.abs(-dx * u.y + dy * u.x) / 2
    }
    const square = Math.abs(along - across) <= 0.12 * Math.max(along, across)
    if (square) along = across = (along + across) / 2
    const hw = along / 2
    const hh = across / 2
    const corner = (sx: number, sy: number): Pt => ({ x: center.x + sx * hw * u.x - sy * hh * u.y, y: center.y + sx * hw * u.y + sy * hh * u.x })
    return { kind: square ? 'square' : 'rectangle', points: [corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)] }
  }
  if (diamondLike) {
    const center = { x: (m1.x + m2.x) / 2, y: (m1.y + m2.y) / 2 }
    let angle = d1
    const off = angle - Math.round(angle / (90 * DEG)) * 90 * DEG
    if (Math.abs(off) <= 7 * DEG) angle -= off
    const p = dist(points[0], points[2]) / 2
    const q = dist(points[1], points[3]) / 2
    const u = { x: Math.cos(angle), y: Math.sin(angle) }
    // Il secondo vertice dalla stessa parte di prima.
    const side = Math.sign(u.x * (points[1].y - center.y) - u.y * (points[1].x - center.x)) || 1
    const v = { x: -u.y * side, y: u.x * side }
    return {
      kind: 'diamond',
      points: [
        { x: center.x - u.x * p, y: center.y - u.y * p },
        { x: center.x + v.x * q, y: center.y + v.y * q },
        { x: center.x + u.x * p, y: center.y + u.y * p },
        { x: center.x - v.x * q, y: center.y - v.y * q },
      ],
    }
  }
  return { kind: 'quadrilateral', points: alignPolygon(points, sides(4), 5 * DEG) }
}

/** Pentagoni ed esagoni quasi regolari diventano regolari; con un lato quasi orizzontale, orizzontale. */
function manySided(points: Pt[]): Pt[] {
  const n = points.length
  const center = centroid(points)
  const lengths = range(0, n - 1).map((i) => dist(points[i], points[(i + 1) % n]))
  const mean = lengths.reduce((a, b) => a + b, 0) / n
  const regularAngle = Math.PI - (2 * Math.PI) / n
  const regular = lengths.every((l) => Math.abs(l - mean) <= 0.2 * mean) && range(0, n - 1).every((i) => Math.abs(interiorAngle(points, i) - regularAngle) <= 15 * DEG)
  let out = points
  if (regular) {
    const radius = points.reduce((s, p) => s + dist(p, center), 0) / n
    const start = angleOf(center, points[0])
    // Nello stesso verso in cui è stato disegnato.
    const area = range(0, n - 1).reduce((s, i) => s + points[i].x * points[(i + 1) % n].y - points[(i + 1) % n].x * points[i].y, 0)
    const dir = Math.sign(area) || 1
    out = range(0, n - 1).map((i) => {
      const a = start + (dir * 2 * Math.PI * i) / n
      return { x: center.x + radius * Math.cos(a), y: center.y + radius * Math.sin(a) }
    })
  }
  return alignPolygon(out, sides(n), 6 * DEG)
}

// ——— L'ellisse ———

interface EllipseFit {
  c: Pt
  rx: number
  ry: number
  angle: number
  /** La distanza media dei punti dall'ellisse. */
  error: number
}

/** L'ellisse più vicina ai punti: la direzione con le componenti principali, i semiassi con i minimi quadrati. */
function fitEllipse(points: Pt[]): EllipseFit | null {
  const c = centroid(points)
  let sxx = 0
  let syy = 0
  let sxy = 0
  for (const p of points) {
    const dx = p.x - c.x
    const dy = p.y - c.y
    sxx += dx * dx
    syy += dy * dy
    sxy += dx * dy
  }
  const angle = 0.5 * Math.atan2(2 * sxy, sxx - syy)
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  // A·x² + B·y² = 1 nel sistema dell'ellisse.
  let s40 = 0
  let s22 = 0
  let s04 = 0
  let s20 = 0
  let s02 = 0
  const local = points.map((p) => {
    const dx = p.x - c.x
    const dy = p.y - c.y
    return { x: dx * cos + dy * sin, y: -dx * sin + dy * cos }
  })
  for (const { x, y } of local) {
    const x2 = x * x
    const y2 = y * y
    s40 += x2 * x2
    s22 += x2 * y2
    s04 += y2 * y2
    s20 += x2
    s02 += y2
  }
  const det = s40 * s04 - s22 * s22
  if (Math.abs(det) < 1e-12) return null
  const A = (s20 * s04 - s02 * s22) / det
  const B = (s40 * s02 - s22 * s20) / det
  if (!(A > 0 && B > 0)) return null
  const rx = 1 / Math.sqrt(A)
  const ry = 1 / Math.sqrt(B)
  let error = 0
  for (const p of local) {
    const rho = Math.hypot(p.x, p.y)
    const r = Math.sqrt(A * p.x * p.x + B * p.y * p.y)
    error += r ? Math.abs(rho - rho / r) : 0
  }
  return { c, rx, ry, angle, error: error / points.length }
}

function ellipseShape(fit: EllipseFit): Shape {
  const { c } = fit
  let { rx, ry, angle } = fit
  if (Math.abs(rx - ry) <= 0.12 * Math.max(rx, ry)) {
    const r = (rx + ry) / 2
    return { kind: 'circle', c, rx: r, ry: r, angle: 0 }
  }
  // Quasi diritta: diritta (con rx sempre orizzontale).
  const off = angle - Math.round(angle / (90 * DEG)) * 90 * DEG
  if (Math.abs(off) <= 8 * DEG) {
    const quarter = Math.round(angle / (90 * DEG))
    if (quarter % 2 !== 0) [rx, ry] = [ry, rx]
    angle = 0
  }
  return { kind: 'ellipse', c, rx, ry, angle }
}

// ——— Riconoscere ———

/**
 * La figura precisa più vicina al tratto (punti della lavagna), oppure null se non somiglia a una
 * figura (la scrittura, una curva qualsiasi) o è troppo piccola.
 */
export function recognize(raw: Pt[], opts: RecognizeOptions = {}): Shape | null {
  const unit = opts.unit ?? 1
  const strict = opts.strict ?? false
  const pts = raw.filter((p, i) => i === 0 || p.x !== raw[i - 1].x || p.y !== raw[i - 1].y)
  if (pts.length < 2) return null
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const p of pts) {
    minX = Math.min(minX, p.x)
    minY = Math.min(minY, p.y)
    maxX = Math.max(maxX, p.x)
    maxY = Math.max(maxY, p.y)
  }
  const diag = Math.hypot(maxX - minX, maxY - minY)
  if (diag < (strict ? 36 : 20) * unit) return null
  const length = pathLength(pts)
  let res = resample(pts, SAMPLES)
  let near = -1
  for (let i = Math.floor(res.length * 0.6); i < res.length; i++) if (near < 0 || dist(res[i], res[0]) < dist(res[near], res[0])) near = i
  // Chiuso: alla fine torna vicino all'inizio; quello che va oltre è poco (un «a» col gambo non è un cerchio).
  const closed = near >= 0.85 * (res.length - 1) && dist(res[near], res[0]) <= Math.max((strict ? 0.08 : 0.12) * length, 6 * unit)
  if (closed) {
    if (near < res.length - 1) res = resample(res.slice(0, near + 1), SAMPLES)
    return closedShape(res, diag, unit, strict)
  }
  return openShape(res, diag, unit, strict)
}

function closedShape(res: Pt[], diag: number, unit: number, strict: boolean): Shape | null {
  // Con le forme automatiche una figura chiusa piccola è una lettera (una o, una a).
  if (strict && diag < 60 * unit) return null
  const verts = corners(res, true, diag).map((i) => res[i])
  if (verts.length >= 3 && verts.length <= 6) {
    const error = polylineError(res, verts, true) / diag
    if (error <= (strict ? 0.022 : 0.03)) {
      if (verts.length === 3) return { kind: 'triangle', points: triangle(verts) }
      if (verts.length === 4) return quadrilateral(verts)
      return { kind: verts.length === 5 ? 'pentagon' : 'hexagon', points: manySided(verts) }
    }
  }
  if (verts.length <= 2) {
    const fit = fitEllipse(res)
    // Troppo schiacciata non è un'ellisse disegnata apposta.
    if (fit && Math.min(fit.rx, fit.ry) >= 0.12 * Math.max(fit.rx, fit.ry) && fit.error / diag <= (strict ? 0.025 : 0.035)) return ellipseShape(fit)
  }
  return null
}

function openShape(res: Pt[], diag: number, unit: number, strict: boolean): Shape | null {
  const n = res.length
  const first = res[0]
  const last = res[n - 1]
  const length = pathLength(res)
  const chord = dist(first, last)
  let dev = 0
  for (const p of res) dev = Math.max(dev, segmentDistance(p, first, last))
  if (chord >= (strict ? 0.93 : 0.9) * length && dev <= (strict ? 0.07 : 0.1) * chord && chord >= (strict ? 40 : 20) * unit) {
    const mid = { x: (first.x + last.x) / 2, y: (first.y + last.y) / 2 }
    return { kind: 'line', ...straightLine(first, last, mid) }
  }
  const verts = corners(res, false, diag)
  if (verts.length < 3) return null
  const arrow = arrowOf(res, verts, unit, strict)
  if (arrow) return arrow
  if (strict || verts.length > 7) return null
  // Spezzata: ogni lato quasi dritto.
  for (let k = 0; k + 1 < verts.length; k++) {
    const a = res[verts[k]]
    const b = res[verts[k + 1]]
    for (let i = verts[k]; i <= verts[k + 1]; i++) if (segmentDistance(res[i], a, b) > Math.max(0.035 * diag, 2 * unit)) return null
  }
  return { kind: 'polyline', points: straightPolyline(verts.map((i) => res[i])) }
}

/** I lati quasi orizzontali o verticali diventano esatti (si sposta il vertice dove finiscono). */
function straightPolyline(points: Pt[]): Pt[] {
  const out = points.map((p) => ({ ...p }))
  for (let i = 1; i < out.length; i++) {
    const a = out[i - 1]
    const angle = angleOf(a, out[i])
    const snapped = snapAngle(angle)
    if (snapped !== angle && Math.round(snapped / (45 * DEG)) % 2 === 0) out[i] = rotate(out[i], a, snapped - angle)
  }
  return out
}

/**
 * Una freccia fatta in un tratto solo: l'asta dritta fino alla punta, poi le alette che tornano
 * indietro restando vicino alla punta.
 */
function arrowOf(res: Pt[], verts: number[], unit: number, strict: boolean): Shape | null {
  if (verts.length > 6) return null
  const tail = res[0]
  const tipIndex = verts[1]
  const tip = res[tipIndex]
  const shaft = dist(tail, tip)
  if (shaft < (strict ? 40 : 24) * unit) return null
  for (let i = 0; i <= tipIndex; i++) if (segmentDistance(res[i], tail, tip) > 0.05 * shaft) return null
  const u = { x: (tip.x - tail.x) / shaft, y: (tip.y - tail.y) / shaft }
  let reach = 0
  let back = 0
  let side = 0
  for (let i = tipIndex + 1; i < res.length; i++) {
    const dx = res[i].x - tip.x
    const dy = res[i].y - tip.y
    const d = Math.hypot(dx, dy)
    if (d > 0.45 * shaft) return null
    reach = Math.max(reach, d)
    back = Math.max(back, -(dx * u.x + dy * u.y))
    side = Math.max(side, Math.abs(dx * u.y - dy * u.x))
  }
  // Le alette tornano indietro verso la coda e si aprono di lato (tornare indietro sulla linea non è una freccia).
  if (reach < Math.max(0.03 * shaft, 6 * unit) || back < 0.5 * reach || side < 0.3 * reach) return null
  // Le alette sono dritte (una curva vicino alla punta, come in una «h», non è una freccia).
  for (let k = 1; k + 1 < verts.length; k++) {
    const a = res[verts[k]]
    const b = res[verts[k + 1]]
    for (let i = verts[k]; i <= verts[k + 1]; i++) if (segmentDistance(res[i], a, b) > Math.max(0.06 * shaft, 3 * unit)) return null
  }
  const line = straightLine(tail, tip, tail)
  // Le alette lunghe come sono state disegnate (non più di un terzo dell'asta).
  return { kind: 'arrow', a: line.a, b: line.b, head: Math.min(0.35 * shaft, reach) }
}

// ——— Disegnare e regolare ———

/** I punti da unire per disegnare la figura (le figure chiuse finiscono dove cominciano). */
export function shapePoints(shape: Shape): Pt[] {
  switch (shape.kind) {
    case 'line':
      return [shape.a, shape.b]
    case 'arrow': {
      const back = angleOf(shape.b, shape.a)
      const barb = (s: number): Pt => ({ x: shape.b.x + shape.head * Math.cos(back + s * ARROW_ANGLE), y: shape.b.y + shape.head * Math.sin(back + s * ARROW_ANGLE) })
      return [shape.a, shape.b, barb(1), shape.b, barb(-1)]
    }
    case 'polyline':
      return shape.points
    case 'ellipse':
    case 'circle': {
      const steps = 72
      const out: Pt[] = []
      for (let i = 0; i <= steps; i++) {
        const t = (2 * Math.PI * i) / steps
        const x = shape.rx * Math.cos(t)
        const y = shape.ry * Math.sin(t)
        out.push({ x: shape.c.x + x * Math.cos(shape.angle) - y * Math.sin(shape.angle), y: shape.c.y + x * Math.sin(shape.angle) + y * Math.cos(shape.angle) })
      }
      out[steps] = { ...out[0] }
      return out
    }
    default:
      return [...shape.points, shape.points[0]]
  }
}

function shapeCenter(shape: Shape): Pt {
  switch (shape.kind) {
    case 'line':
    case 'arrow':
      return { x: (shape.a.x + shape.b.x) / 2, y: (shape.a.y + shape.b.y) / 2 }
    case 'ellipse':
    case 'circle':
      return shape.c
    default:
      return centroid(shape.points)
  }
}

/**
 * Dopo che il tratto è diventato una figura, la penna ancora giù la regola: era in `anchor`, ora è in
 * `pointer`. Linee, frecce e spezzate seguono la penna con l'ultimo punto (e si raddrizzano ancora);
 * le figure chiuse si ingrandiscono e girano intorno al centro (e tornano diritte se ci manca poco).
 */
export function adjustShape(shape: Shape, anchor: Pt, pointer: Pt): Shape {
  const dx = pointer.x - anchor.x
  const dy = pointer.y - anchor.y
  switch (shape.kind) {
    case 'line':
    case 'arrow': {
      const moved = { x: shape.b.x + dx, y: shape.b.y + dy }
      if (dist(shape.a, moved) < 1e-6) return shape
      return { ...shape, ...straightLine(shape.a, moved, shape.a) }
    }
    case 'polyline': {
      const points = shape.points.slice()
      const lastIndex = points.length - 1
      points[lastIndex] = { x: points[lastIndex].x + dx, y: points[lastIndex].y + dy }
      const a = points[lastIndex - 1]
      const angle = angleOf(a, points[lastIndex])
      const snapped = snapAngle(angle)
      if (snapped !== angle && Math.round(snapped / (45 * DEG)) % 2 === 0) points[lastIndex] = rotate(points[lastIndex], a, snapped - angle)
      return { kind: 'polyline', points }
    }
    default: {
      const c = shapeCenter(shape)
      const from = dist(c, anchor)
      const to = dist(c, pointer)
      if (from < 1e-6 || to < 1e-6) return shape
      const scale = Math.min(8, Math.max(0.1, to / from))
      const angle = angleOf(c, pointer) - angleOf(c, anchor)
      if ('c' in shape) {
        let total = shape.kind === 'circle' ? 0 : shape.angle + angle
        const off = total - Math.round(total / (90 * DEG)) * 90 * DEG
        if (Math.abs(off) <= 6 * DEG) total -= off
        return { ...shape, rx: shape.rx * scale, ry: shape.ry * scale, angle: total }
      }
      const points = shape.points.map((p) => rotate(p, c, angle, scale))
      // Tornano diritti se ci manca poco: rettangoli, quadrati e rombi di più, gli altri poligoni appena.
      const refs: [number, number][] = shape.kind === 'diamond' ? [[0, 2], [1, 3]] : sides(points.length)
      const firm = shape.kind === 'rectangle' || shape.kind === 'square' || shape.kind === 'diamond'
      return { kind: shape.kind, points: alignPolygon(points, refs, (firm ? 6 : 4) * DEG) }
    }
  }
}
