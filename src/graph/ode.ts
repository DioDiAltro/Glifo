/**
 * Le curve di livello di una funzione di x e y e le soluzioni delle equazioni differenziali
 * y' = f(x, y) nei grafici: i livelli scelti con le tacche (numeri tondi), le soluzioni con
 * Runge–Kutta del quarto ordine, avanti e indietro dal punto iniziale finché restano nel riquadro.
 * Per i sistemi (x' = f(x, y), y' = g(x, y)) le traiettorie nel piano delle fasi e i punti di equilibrio.
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

/**
 * La traiettoria di x' = F(x, y) dal punto (x0, y0), nel piano delle fasi: avanti e indietro nel tempo,
 * con passi lunghi più o meno uguali sul disegno, finché esce dal riquadro, si ferma in un punto di
 * equilibrio o (un'orbita chiusa) torna al punto di partenza.
 */
export function phaseTrajectory(F: (x: number, y: number) => [number, number], x0: number, y0: number, vp: Viewport): [number, number][][] {
  const width = vp.x1 - vp.x0
  const height = vp.y1 - vp.y0
  const size = Math.hypot(width, height)
  // Il passo nel piano: circa 1/400 del riquadro.
  const ds = size / 400
  const out: [number, number][][] = []
  const rk4 = (x: number, y: number, h: number): [number, number] | null => {
    const k1 = F(x, y)
    const k2 = F(x + (h / 2) * k1[0], y + (h / 2) * k1[1])
    const k3 = F(x + (h / 2) * k2[0], y + (h / 2) * k2[1])
    const k4 = F(x + h * k3[0], y + h * k3[1])
    const nx = x + (h / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0])
    const ny = y + (h / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])
    return Number.isFinite(nx) && Number.isFinite(ny) ? [nx, ny] : null
  }
  for (const dir of [1, -1]) {
    const points: [number, number][] = [[x0, y0]]
    let [x, y] = [x0, y0]
    let travelled = 0
    for (let n = 0; n < 3000; n++) {
      const [fx, fy] = F(x, y)
      const speed = Math.hypot(fx, fy)
      // Un punto di equilibrio: la traiettoria ci arriva (o ne parte) senza muoversi più.
      if (!Number.isFinite(speed) || speed < 1e-9 * size) break
      const next = rk4(x, y, (dir * ds) / speed)
      if (!next) break
      travelled += Math.hypot(next[0] - x, next[1] - y)
      ;[x, y] = next
      points.push([x, y])
      if (x < vp.x0 - 0.05 * width || x > vp.x1 + 0.05 * width || y < vp.y0 - 0.05 * height || y > vp.y1 + 0.05 * height) break
      // Un'orbita chiusa: di nuovo vicino alla partenza dopo un giro.
      if (travelled > 20 * ds && Math.hypot(x - x0, y - y0) < 1.5 * ds) break
    }
    out.push(points)
    // Chiusa da una parte: dall'altra è la stessa.
    if (points.length > 20 && Math.hypot(x - x0, y - y0) < 1.5 * ds) break
  }
  return out
}

/** I punti di equilibrio (F = 0) nel riquadro: con Newton, partendo da una griglia di punti. */
export function equilibria(F: (x: number, y: number) => [number, number], vp: Viewport): [number, number][] {
  const width = vp.x1 - vp.x0
  const height = vp.y1 - vp.y0
  const found: [number, number][] = []
  for (let j = 0; j <= 6; j++) {
    for (let i = 0; i <= 6; i++) {
      let x = vp.x0 + (width * (i + 0.37)) / 7
      let y = vp.y0 + (height * (j + 0.41)) / 7
      for (let it = 0; it < 40; it++) {
        const [f, g] = F(x, y)
        if (!Number.isFinite(f) || !Number.isFinite(g)) break
        const h = 1e-6 * Math.max(1, Math.abs(x), Math.abs(y))
        const [fx, gx] = F(x + h, y)
        const [fy, gy] = F(x, y + h)
        const a = (fx - f) / h
        const b = (fy - f) / h
        const c = (gx - g) / h
        const d = (gy - g) / h
        const det = a * d - b * c
        if (!Number.isFinite(det) || Math.abs(det) < 1e-14) break
        const dx = (d * f - b * g) / det
        const dy = (a * g - c * f) / det
        x -= dx
        y -= dy
        if (Math.hypot(dx, dy) < 1e-12 * Math.max(1, Math.hypot(x, y))) break
      }
      const [f, g] = F(x, y)
      if (!(Math.hypot(f, g) < 1e-9)) continue
      if (x < vp.x0 || x > vp.x1 || y < vp.y0 || y > vp.y1) continue
      if (found.some(([p, q]) => Math.hypot(p - x, q - y) < 1e-6 * Math.max(width, height))) continue
      found.push([Math.abs(x) < 1e-12 ? 0 : x, Math.abs(y) < 1e-12 ? 0 : y])
    }
  }
  return found
}
