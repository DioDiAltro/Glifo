/**
 * Le curve di livello di una funzione di x e y e le soluzioni delle equazioni differenziali
 * y' = f(x, y) nei grafici: i livelli scelti con le tacche (numeri tondi), le soluzioni con
 * Runge–Kutta del quarto ordine, avanti e indietro dal punto iniziale finché restano nel riquadro.
 */
import { sampleImplicit, ticks, type Polyline, type Viewport } from './plot'

/** I livelli (numeri tondi tra il più piccolo e il più grande valore nel riquadro) con le loro curve, in pixel. */
export function contourLevels(F: (x: number, y: number) => number, vp: Viewport): { value: string; lines: Polyline[] }[] {
  const values: number[] = []
  for (let j = 0; j <= 40; j++) {
    for (let i = 0; i <= 60; i++) {
      const v = F(vp.x0 + ((vp.x1 - vp.x0) * i) / 60, vp.y0 + ((vp.y1 - vp.y0) * j) / 40)
      if (Number.isFinite(v)) values.push(v)
    }
  }
  if (values.length < 10) return []
  // Senza i valori enormi vicino agli asintoti.
  values.sort((a, b) => a - b)
  const lo = values[Math.floor(values.length * 0.02)]
  const hi = values[Math.floor(values.length * 0.98)]
  if (!(hi > lo)) return []
  const levels = ticks(lo, hi, 75 * 9).major.filter((t) => t.value > lo && t.value < hi)
  return levels.map((t) => ({ value: t.label, lines: sampleImplicit((x, y) => F(x, y) - t.value, vp, 3) }))
}

/** La soluzione di y' = f(x, y) con y(x0) = y0, avanti e indietro: i punti (x, y) delle due parti. */
export function solutionCurves(f: (x: number, y: number) => number, x0: number, y0: number, vp: Viewport): [number, number][][] {
  const width = vp.x1 - vp.x0
  const height = vp.y1 - vp.y0
  const h = width / 500
  const out: [number, number][][] = []
  for (const dir of [1, -1]) {
    const points: [number, number][] = [[x0, y0]]
    let x = x0
    let y = y0
    for (let n = 0; n < 4000; n++) {
      const s = dir * h
      const k1 = f(x, y)
      const k2 = f(x + s / 2, y + (s / 2) * k1)
      const k3 = f(x + s / 2, y + (s / 2) * k2)
      const k4 = f(x + s, y + s * k3)
      const next = y + (s / 6) * (k1 + 2 * k2 + 2 * k3 + k4)
      if (!Number.isFinite(next)) break
      x += s
      y = next
      points.push([x, y])
      // Fuori dal riquadro (con un po' di margine): basta.
      if (x < vp.x0 - 0.05 * width || x > vp.x1 + 0.05 * width || y < vp.y0 - height || y > vp.y1 + height) break
    }
    out.push(points)
  }
  return out
}
