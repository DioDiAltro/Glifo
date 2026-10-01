/**
 * Allineare e distribuire le forme selezionate, come in PowerPoint: solo i conti, sui
 * riquadri delle forme (l'editor poi le sposta). Le frecce seguono da sole.
 */

export interface Box {
  x: number
  y: number
  w: number
  h: number
}

export type Alignment = 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom'

export interface Position {
  x: number
  y: number
}

/** Dove va ogni riquadro per allinearsi al bordo (o al centro) di tutta la selezione. */
export function alignBoxes(boxes: Box[], how: Alignment): Position[] {
  const left = Math.min(...boxes.map((b) => b.x))
  const right = Math.max(...boxes.map((b) => b.x + b.w))
  const top = Math.min(...boxes.map((b) => b.y))
  const bottom = Math.max(...boxes.map((b) => b.y + b.h))
  return boxes.map((b) => {
    switch (how) {
      case 'left':
        return { x: left, y: b.y }
      case 'center':
        return { x: (left + right) / 2 - b.w / 2, y: b.y }
      case 'right':
        return { x: right - b.w, y: b.y }
      case 'top':
        return { x: b.x, y: top }
      case 'middle':
        return { x: b.x, y: (top + bottom) / 2 - b.h / 2 }
      case 'bottom':
        return { x: b.x, y: bottom - b.h }
    }
  })
}

/**
 * Lo stesso spazio tra un riquadro e il successivo, in orizzontale (`x`) o in verticale (`y`):
 * il primo e l'ultimo restano dove sono, quelli in mezzo si spostano (nel loro ordine).
 */
export function distributeBoxes(boxes: Box[], axis: 'x' | 'y'): Position[] {
  const start = (b: Box) => (axis === 'x' ? b.x : b.y)
  const size = (b: Box) => (axis === 'x' ? b.w : b.h)
  const out = boxes.map((b) => ({ x: b.x, y: b.y }))
  if (boxes.length < 3) return out
  const order = boxes.map((_, i) => i).sort((a, b) => start(boxes[a]) + size(boxes[a]) / 2 - (start(boxes[b]) + size(boxes[b]) / 2))
  const first = boxes[order[0]]
  const last = boxes[order[order.length - 1]]
  const total = boxes.reduce((sum, b) => sum + size(b), 0)
  const gap = (start(last) + size(last) - start(first) - total) / (boxes.length - 1)
  let at = start(first)
  for (const i of order) {
    out[i][axis] = at
    at += size(boxes[i]) + gap
  }
  return out
}
