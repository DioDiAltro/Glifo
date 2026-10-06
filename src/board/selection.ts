import { HIGHLIGHT_COLORS, INK_COLORS, boxesTouch, compareStrokes, newStrokeId, roundPoints, strokeBox, strokeTouched, type Box, type HighlightColor, type InkColor, type Pt, type Stroke } from './strokes'

/**
 * La selezione della lavagna, come in Note di Apple: si disegna un lazo intorno a quello che si vuole
 * prendere (o si tocca una linea), poi i tratti presi si spostano, si ingrandiscono, cambiano colore,
 * si copiano o si eliminano. Qui i conti, senza la pagina: li usa board.ts.
 */

/** Spostare e ingrandire: il punto si allontana da `origin` di `scale` volte, poi si sposta di (dx, dy). */
export interface Transform {
  dx: number
  dy: number
  scale: number
  origin: Pt
}

export const IDENTITY: Transform = { dx: 0, dy: 0, scale: 1, origin: { x: 0, y: 0 } }

/** Quanto deve stare dentro il lazo un tratto, in lunghezza, per essere preso: almeno metà. */
export const LASSO_SHARE = 0.5

/** Lo spessore più grande che si salva (vedi `fromRecord` in store.ts): ingrandendo non lo si supera. */
export const MAX_SIZE = 190

const cross = (a: Pt, b: Pt, p: Pt) => (b.x - a.x) * (p.y - a.y) - (p.x - a.x) * (b.y - a.y)

/**
 * Il lazo (chiuso dall'ultimo punto al primo) gira intorno al punto? Si contano i giri, così anche
 * un lazo fatto due volte, o che si incrocia, prende quello che c'è dentro.
 */
export function insideLasso(p: Pt, lasso: readonly Pt[]): boolean {
  let winding = 0
  const n = lasso.length
  for (let i = 0; i < n; i++) {
    const a = lasso[i]
    const b = lasso[(i + 1) % n]
    if (a.y <= p.y) {
      if (b.y > p.y && cross(a, b, p) > 0) winding++
    } else if (b.y <= p.y && cross(a, b, p) < 0) winding--
  }
  return winding !== 0
}

/** Il rettangolo dei punti (senza spessore). */
export function pointsBox(points: readonly Pt[]): Box {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const p of points) {
    if (p.x < minX) minX = p.x
    if (p.x > maxX) maxX = p.x
    if (p.y < minY) minY = p.y
    if (p.y > maxY) maxY = p.y
  }
  return { minX, minY, maxX, maxY }
}

/**
 * Che parte del tratto, in lunghezza, sta dentro il lazo: da 0 a 1. I lati lunghi (le figure hanno
 * solo i vertici) si guardano a pezzi di `step`; un puntino è dentro o fuori.
 */
export function shareInside(s: Stroke, lasso: readonly Pt[], step = 4): number {
  const pts = s.points
  const n = Math.floor(pts.length / 3)
  if (!n) return 0
  let inside = 0
  let total = 0
  for (let i = 0; i + 1 < n; i++) {
    const ax = pts[i * 3]
    const ay = pts[i * 3 + 1]
    const bx = pts[i * 3 + 3]
    const by = pts[i * 3 + 4]
    const len = Math.hypot(bx - ax, by - ay)
    if (!len) continue
    const k = Math.max(1, Math.ceil(len / step))
    for (let j = 0; j < k; j++) {
      const t = (j + 0.5) / k
      if (insideLasso({ x: ax + (bx - ax) * t, y: ay + (by - ay) * t }, lasso)) inside += len / k
    }
    total += len
  }
  if (!total) return insideLasso({ x: pts[0], y: pts[1] }, lasso) ? 1 : 0
  return inside / total
}

/** I tratti presi dal lazo: quelli che ci stanno dentro almeno per metà (come in Note di Apple). */
export function lassoed(strokes: Iterable<Stroke>, lasso: readonly Pt[], boxOf: (s: Stroke) => Box = strokeBox): Stroke[] {
  if (lasso.length < 3) return []
  const area = pointsBox(lasso)
  const out: Stroke[] = []
  for (const s of strokes) if (boxesTouch(boxOf(s), area) && shareInside(s, lasso) >= LASSO_SHARE) out.push(s)
  return out
}

/**
 * Il tratto toccato in `p` (a meno di `r` dal suo bordo): quello che si vede sopra. La scrittura sta
 * sopra gli evidenziatori, e fra due tratti dello stesso tipo quello scritto dopo. `sorted`: nell'ordine
 * in cui si disegnano (compareStrokes).
 */
export function strokeAt(sorted: readonly Stroke[], p: Pt, r: number, boxOf: (s: Stroke) => Box = strokeBox): Stroke | null {
  const near: Box = { minX: p.x - r, minY: p.y - r, maxX: p.x + r, maxY: p.y + r }
  for (const highlight of [false, true]) {
    for (let k = sorted.length - 1; k >= 0; k--) {
      const s = sorted[k]
      if (!!s.highlight === highlight && boxesTouch(boxOf(s), near) && strokeTouched(s, p, p, r)) return s
    }
  }
  return null
}

/**
 * Il riquadro della selezione: fin dove arriva l'inchiostro (le figure e gli evidenziatori sono larghi
 * quanto lo spessore, la penna con la pressione un po' di più).
 */
export function selectionBox(strokes: readonly Stroke[]): Box | null {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const s of strokes) {
    const pad = s.size * (s.highlight || s.shape ? 0.5 : 0.75)
    for (let i = 0; i + 1 < s.points.length; i += 3) {
      const x = s.points[i]
      const y = s.points[i + 1]
      if (x - pad < minX) minX = x - pad
      if (x + pad > maxX) maxX = x + pad
      if (y - pad < minY) minY = y - pad
      if (y + pad > maxY) maxY = y + pad
    }
  }
  return minX <= maxX ? { minX, minY, maxX, maxY } : null
}

export function movePoint(p: Pt, t: Transform): Pt {
  return { x: t.origin.x + (p.x - t.origin.x) * t.scale + t.dx, y: t.origin.y + (p.y - t.origin.y) * t.scale + t.dy }
}

export function moveBox(b: Box, t: Transform): Box {
  const a = movePoint({ x: b.minX, y: b.minY }, t)
  const c = movePoint({ x: b.maxX, y: b.maxY }, t)
  return { minX: a.x, minY: a.y, maxX: c.x, maxY: c.y }
}

const roundSize = (size: number) => Math.min(MAX_SIZE, Math.max(0.2, Math.round(size * 100) / 100))

/**
 * I tratti spostati e ingranditi (anche lo spessore): tratti nuovi, con id nuovi e lo stesso momento,
 * così restano sotto o sopra gli stessi tratti di prima. Come per la gomma, si cambia un tratto
 * mettendone uno nuovo al posto del vecchio (le altre schede rileggono e non tengono il disegno vecchio).
 */
export function transformStrokes(strokes: readonly Stroke[], t: Transform, newId: () => string = newStrokeId): Stroke[] {
  return strokes.map((s) => {
    const points = s.points.slice()
    for (let i = 0; i + 1 < points.length; i += 3) {
      points[i] = t.origin.x + (points[i] - t.origin.x) * t.scale + t.dx
      points[i + 1] = t.origin.y + (points[i + 1] - t.origin.y) * t.scale + t.dy
    }
    return { ...s, id: newId(), points: roundPoints(points), size: t.scale === 1 ? s.size : roundSize(s.size * t.scale) }
  })
}

/**
 * Le copie dei tratti, spostate di (dx, dy), per Duplica e Incolla: id nuovi e un momento nuovo
 * (`now`), così stanno sopra quello che c'è già; fra loro l'ordine resta quello di prima.
 */
export function copyStrokes(strokes: readonly Stroke[], dx: number, dy: number, now: number, newId: () => string = newStrokeId): Stroke[] {
  return [...strokes].sort(compareStrokes).map((s, i) => transformStrokes([{ ...s, t: now + i / 1000 }], { ...IDENTITY, dx, dy }, newId)[0])
}

/**
 * Un altro colore ai tratti della penna (`highlight` false: un colore di INK_COLORS) o a quelli
 * dell'evidenziatore (true: di HIGHLIGHT_COLORS). Solo quelli che cambiano: com'erano e come diventano.
 */
export function recolor(
  strokes: readonly Stroke[],
  color: InkColor | HighlightColor,
  highlight: boolean,
  newId: () => string = newStrokeId,
): { before: Stroke[]; after: Stroke[] } {
  const valid = highlight ? HIGHLIGHT_COLORS.includes(color as HighlightColor) : INK_COLORS.includes(color as InkColor)
  const before = valid ? strokes.filter((s) => !!s.highlight === highlight && s.color !== color) : []
  return { before, after: before.map((s) => ({ ...s, id: newId(), color })) }
}

/**
 * Di quanto si ingrandisce tirando la maniglia: l'angolo `corner` del riquadro (quello opposto a
 * `origin`, che sta fermo) portato fino a `p`, misurato lungo la diagonale, tra `min` e `max`.
 */
export function handleScale(origin: Pt, corner: Pt, p: Pt, min: number, max: number): number {
  const dx = corner.x - origin.x
  const dy = corner.y - origin.y
  const len2 = dx * dx + dy * dy
  if (!len2) return 1
  const k = ((p.x - origin.x) * dx + (p.y - origin.y) * dy) / len2
  return Math.min(max, Math.max(min, k))
}

/** Lo spostamento che mette il centro del riquadro `box` nel punto `at`. */
export function centerOn(box: Box, at: Pt): { dx: number; dy: number } {
  return { dx: at.x - (box.minX + box.maxX) / 2, dy: at.y - (box.minY + box.maxY) / 2 }
}

/**
 * Quanto spostare ancora il riquadro `box` perché stia dentro `view`, ad almeno `margin` dai bordi: così
 * quello che si incolla si vede tutto. Se è più grande della vista, in quella direzione non si sposta.
 */
export function keepInside(box: Box, view: Box, margin: number): { dx: number; dy: number } {
  const axis = (lo: number, hi: number, min: number, max: number) => {
    if (hi - lo > max - min - 2 * margin) return 0
    if (lo < min + margin) return min + margin - lo
    if (hi > max - margin) return max - margin - hi
    return 0
  }
  return { dx: axis(box.minX, box.maxX, view.minX, view.maxX), dy: axis(box.minY, box.maxY, view.minY, view.maxY) }
}
