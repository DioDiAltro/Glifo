/**
 * Le immagini dei tratti presi con la Selezione, per il lettore delle formule (AI.md, punto 2): una formula
 * per riga, nero su bianco come una pagina stampata, senza gli evidenziatori. `formulaLines`, `paddedBox` e
 * `modelPixels` si provano senza browser; i canvas li fanno `lineImage` e `linePreview`.
 */
import { IMAGE_SIZE } from '../ai/formulaModel'
import { outlineSvg, shapeSvg, strokeOutline } from './ink'
import { strokeBox, type Box, type Stroke } from './strokes'

/** Il riquadro dei tratti, con il loro spessore. */
export function strokesBox(strokes: readonly Stroke[]): Box {
  const boxes = strokes.map(strokeBox)
  return {
    minX: Math.min(...boxes.map((b) => b.minX)),
    minY: Math.min(...boxes.map((b) => b.minY)),
    maxX: Math.max(...boxes.map((b) => b.maxX)),
    maxY: Math.max(...boxes.map((b) => b.maxY)),
  }
}

/**
 * I tratti di scrittura divisi in righe, dall'alto in basso. Un tratto va nella riga sopra se lo spazio
 * vuoto tra i due è meno di 0,8 volte l'altezza tipica di un tratto (la mediana): dentro una formula gli
 * spazi (sopra e sotto la linea di frazione, gli esponenti) sono più piccoli di una lettera, tra una
 * formula e l'altra di solito più grandi.
 */
export function formulaLines(strokes: readonly Stroke[]): Stroke[][] {
  const items = strokes.filter((s) => !s.highlight && s.points.length >= 3).map((s) => ({ s, box: strokeBox(s) }))
  if (!items.length) return []
  const heights = items.map((i) => i.box.maxY - i.box.minY).sort((a, b) => a - b)
  const gap = 0.8 * heights[Math.floor(heights.length / 2)]
  items.sort((a, b) => a.box.minY - b.box.minY)
  const lines: { strokes: Stroke[]; bottom: number }[] = []
  for (const { s, box } of items) {
    const line = lines.at(-1)
    if (line && box.minY - line.bottom < gap) {
      line.strokes.push(s)
      line.bottom = Math.max(line.bottom, box.maxY)
    } else lines.push({ strokes: [s], bottom: box.maxY })
  }
  const order = new Map(strokes.map((s, i) => [s, i]))
  return lines.map((l) => l.strokes.sort((a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0)))
}

/** Il riquadro di una riga con il margine bianco intorno: un sesto dell'altezza, come nella prova dei lettori. */
export function paddedBox(strokes: readonly Stroke[]): Box {
  const box = strokesBox(strokes)
  const m = Math.max(8, (box.maxY - box.minY) / 6)
  return { minX: box.minX - m, minY: box.minY - m, maxX: box.maxX + m, maxY: box.maxY + m }
}

/** Da RGBA (come `getImageData`) ai valori che il modello vuole: tre piani, rosso, verde e blu, da −1 a 1. */
export function modelPixels(rgba: ArrayLike<number>, size = IMAGE_SIZE): Float32Array {
  const n = size * size
  const out = new Float32Array(3 * n)
  for (let i = 0; i < n; i++) {
    for (let c = 0; c < 3; c++) out[c * n + i] = (rgba[4 * i + c] / 255) * 2 - 1
  }
  return out
}

/** Disegna i tratti in nero su bianco: il riquadro `box` riempie tutto il canvas (largo `width`, alto `height`). */
function draw(ctx: CanvasRenderingContext2D, strokes: readonly Stroke[], box: Box, width: number, height: number): void {
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)
  const sx = width / (box.maxX - box.minX)
  const sy = height / (box.maxY - box.minY)
  ctx.setTransform(sx, 0, 0, sy, -box.minX * sx, -box.minY * sy)
  ctx.fillStyle = '#000000'
  ctx.strokeStyle = '#000000'
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  for (const s of strokes) {
    if (s.shape) {
      ctx.lineWidth = s.size
      ctx.stroke(new Path2D(shapeSvg(s.points)))
    } else {
      const path = outlineSvg(strokeOutline(s))
      if (path) ctx.fill(new Path2D(path))
    }
  }
}

/** L'immagine di una riga per il modello: 384 × 384, con la scrittura stirata come fa il TrOCR. */
export function lineImage(strokes: readonly Stroke[]): Float32Array {
  const canvas = document.createElement('canvas')
  canvas.width = IMAGE_SIZE
  canvas.height = IMAGE_SIZE
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('canvas 2d')
  draw(ctx, strokes, paddedBox(strokes), IMAGE_SIZE, IMAGE_SIZE)
  return modelPixels(ctx.getImageData(0, 0, IMAGE_SIZE, IMAGE_SIZE).data)
}

/** La riga com'è scritta, piccola, per il pannello: con le sue proporzioni, alta `height` e larga al massimo `maxWidth`. */
export function linePreview(strokes: readonly Stroke[], height = 64, maxWidth = 520): HTMLCanvasElement {
  const box = paddedBox(strokes)
  const scale = Math.min(height / (box.maxY - box.minY), maxWidth / (box.maxX - box.minX))
  const w = Math.max(1, Math.round((box.maxX - box.minX) * scale))
  const h = Math.max(1, Math.round((box.maxY - box.minY) * scale))
  const dpr = Math.min(3, globalThis.devicePixelRatio || 1)
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(w * dpr)
  canvas.height = Math.round(h * dpr)
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
  const ctx = canvas.getContext('2d')
  if (ctx) draw(ctx, strokes, box, canvas.width, canvas.height)
  return canvas
}
