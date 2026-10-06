import { describe, expect, it } from 'vitest'
import {
  centerOn,
  copyStrokes,
  handleScale,
  insideLasso,
  keepInside,
  lassoed,
  MAX_SIZE,
  moveBox,
  recolor,
  selectionBox,
  shareInside,
  strokeAt,
  transformStrokes,
} from '../src/board/selection'
import { compareStrokes, type Pt, type Stroke } from '../src/board/strokes'

/** Un tratto per i punti dati (x, y), con la pressione a metà. */
function stroke(id: string, pts: [number, number][], extra: Partial<Stroke> = {}): Stroke {
  return { id, t: 1, color: 'ink', size: 2, pen: false, points: pts.flatMap(([x, y]) => [x, y, 0.5]), ...extra }
}

/** Un tratto dritto da (x0, y) a (x1, y), un punto ogni 5. */
const row = (id: string, x0: number, x1: number, y: number, extra: Partial<Stroke> = {}) =>
  stroke(id, Array.from({ length: Math.round((x1 - x0) / 5) + 1 }, (_, i) => [x0 + i * 5, y] as [number, number]), extra)

const square = (x0: number, y0: number, x1: number, y1: number): Pt[] => [
  { x: x0, y: y0 },
  { x: x1, y: y0 },
  { x: x1, y: y1 },
  { x: x0, y: y1 },
]

/** Un lazo a mano: un giro (o più) intorno a (cx, cy), con i raggi rx e ry. */
const loop = (cx: number, cy: number, rx: number, ry: number, turns = 1, n = 60): Pt[] =>
  Array.from({ length: Math.round(n * turns) }, (_, i) => ({ x: cx + rx * Math.cos((i / n) * 2 * Math.PI), y: cy + ry * Math.sin((i / n) * 2 * Math.PI) }))

let next = 0
const ids = () => `n${++next}`

describe('lavagna: la selezione', () => {
  it('sa se un punto è dentro il lazo, anche concavo, chiuso da solo o fatto due volte', () => {
    const sq = square(0, 0, 100, 100)
    expect(insideLasso({ x: 50, y: 50 }, sq)).toBe(true)
    expect(insideLasso({ x: 150, y: 50 }, sq)).toBe(false)
    expect(insideLasso({ x: 50, y: -1 }, sq)).toBe(false)
    // Una «C»: dentro il braccio sì, nella bocca no.
    const c = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 30 },
      { x: 30, y: 30 },
      { x: 30, y: 70 },
      { x: 100, y: 70 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ]
    expect(insideLasso({ x: 15, y: 50 }, c)).toBe(true)
    expect(insideLasso({ x: 70, y: 50 }, c)).toBe(false)
    // Il lazo che non torna all'inizio si chiude da solo.
    expect(insideLasso({ x: 50, y: 50 }, loop(50, 50, 40, 40, 0.85))).toBe(true)
    // Due giri: quello che è dentro resta dentro (con la regola pari-dispari sarebbe fuori).
    expect(insideLasso({ x: 50, y: 50 }, loop(50, 50, 40, 40, 2))).toBe(true)
    // Un otto: dentro tutti e due gli anelli.
    const eight = Array.from({ length: 80 }, (_, i) => {
      const a = (i / 80) * 2 * Math.PI
      return { x: 100 + 80 * Math.sin(a), y: 50 + 30 * Math.sin(a) * Math.cos(a) }
    })
    expect(insideLasso({ x: 50, y: 50 }, eight)).toBe(true)
    expect(insideLasso({ x: 150, y: 50 }, eight)).toBe(true)
    expect(insideLasso({ x: 100, y: 90 }, eight)).toBe(false)
  })

  it('misura quanta parte del tratto sta dentro, anche i lati lunghi delle figure', () => {
    const sq = square(0, 0, 100, 100)
    expect(shareInside(row('a', 10, 90, 50), sq)).toBe(1)
    expect(shareInside(row('a', 150, 250, 50), sq)).toBe(0)
    expect(shareInside(row('a', 50, 150, 50), sq)).toBeCloseTo(0.5, 1)
    // Una figura: solo i due estremi, a metà dentro.
    expect(shareInside(stroke('f', [[50, 50], [150, 50]], { shape: true }), sq)).toBeCloseTo(0.5, 1)
    // Un puntino (un punto solo, o tutti uguali).
    expect(shareInside(stroke('p', [[20, 20]]), sq)).toBe(1)
    expect(shareInside(stroke('p', [[20, 20], [20, 20]]), sq)).toBe(1)
    expect(shareInside(stroke('p', [[120, 20]]), sq)).toBe(0)
  })

  it('il lazo prende i tratti che ci stanno dentro almeno per metà', () => {
    const inside = row('dentro', 20, 80, 40)
    const half = row('metà', 60, 150, 60) // 40 su 90 dentro: meno di metà
    const most = row('quasi', 30, 120, 80) // 70 su 90 dentro
    const out = row('fuori', 200, 300, 50)
    const dot = stroke('punto', [[50, 20]])
    const got = lassoed([inside, half, most, out, dot], square(0, 0, 100, 100)).map((s) => s.id)
    expect(got).toEqual(['dentro', 'quasi', 'punto'])
    // Un lazo di due punti non prende niente.
    expect(lassoed([inside], [{ x: 0, y: 0 }, { x: 100, y: 100 }])).toEqual([])
    // Un lazo a mano intorno a una parola.
    const word = [row('c', 100, 120, 200), row('i', 125, 130, 200), row('a', 135, 160, 205), row('o', 165, 185, 200)]
    expect(lassoed([...word, out], loop(142, 202, 60, 25)).map((s) => s.id)).toEqual(['c', 'i', 'a', 'o'])
  })

  it('toccando si prende la linea che si vede sopra: la scrittura prima degli evidenziatori, poi la più recente', () => {
    const marker = row('evidenziatore', 0, 100, 50, { highlight: true, color: 'yellow', size: 18, t: 5 })
    const old = row('vecchia', 0, 100, 50, { t: 1 })
    const recent = row('nuova', 0, 100, 51, { t: 2 })
    const sorted = [marker, old, recent].sort(compareStrokes)
    expect(strokeAt(sorted, { x: 50, y: 50 }, 4)?.id).toBe('nuova')
    // Lontano dalla scrittura ma sull'evidenziatore (largo 18).
    expect(strokeAt(sorted, { x: 50, y: 59 }, 4)?.id).toBe('evidenziatore')
    expect(strokeAt(sorted, { x: 50, y: 80 }, 4)).toBeNull()
    // Il raggio conta dal bordo: metà spessore (1) più r.
    expect(strokeAt([old], { x: 50, y: 54.5 }, 4)?.id).toBe('vecchia')
    expect(strokeAt([old], { x: 50, y: 55.5 }, 4)).toBeNull()
  })

  it('il riquadro della selezione arriva fin dove arriva l\'inchiostro', () => {
    const a = row('a', 0, 100, 0, { size: 4 }) // penna: 0,75 × 4 = 3
    const b = stroke('b', [[50, 40], [60, 80]], { shape: true, size: 6 }) // figura: 3
    expect(selectionBox([a, b])).toEqual({ minX: -3, minY: -3, maxX: 103, maxY: 83 })
    expect(selectionBox([])).toBeNull()
  })

  it('sposta e ingrandisce i tratti (anche lo spessore) facendone di nuovi, con lo stesso momento', () => {
    const s = stroke('s', [[10, 10], [30, 20]], { t: 7, color: 'red', size: 4, shape: true, pen: true })
    const [moved] = transformStrokes([s], { dx: 5, dy: -5, scale: 1, origin: { x: 0, y: 0 } }, ids)
    expect(moved.points).toEqual([15, 5, 0.5, 35, 15, 0.5])
    expect(moved).toMatchObject({ t: 7, color: 'red', size: 4, shape: true, pen: true })
    expect(moved.id).not.toBe('s')
    // Il doppio attorno a (10, 10), poi giù di 1.
    const [big] = transformStrokes([s], { dx: 0, dy: 1, scale: 2, origin: { x: 10, y: 10 } }, ids)
    expect(big.points).toEqual([10, 11, 0.5, 50, 31, 0.5])
    expect(big.size).toBe(8)
    // Lo spessore non supera quello che si salva.
    expect(transformStrokes([s], { dx: 0, dy: 0, scale: 100, origin: { x: 0, y: 0 } }, ids)[0].size).toBe(MAX_SIZE)
    // Il riquadro segue gli stessi conti.
    expect(moveBox({ minX: 10, minY: 10, maxX: 30, maxY: 20 }, { dx: 0, dy: 1, scale: 2, origin: { x: 10, y: 10 } })).toEqual({ minX: 10, minY: 11, maxX: 50, maxY: 31 })
  })

  it('le copie hanno id nuovi e stanno sopra il resto, nell\'ordine di prima', () => {
    const a = row('a', 0, 20, 0, { t: 3 })
    const b = row('b', 0, 20, 10, { t: 1, highlight: true, color: 'pink' })
    const copies = copyStrokes([a, b], 10, 20, 1000, ids)
    expect(copies.map((s) => s.points.slice(0, 2))).toEqual([
      [10, 30],
      [10, 20],
    ])
    expect(copies[0].t).toBe(1000)
    expect(copies[1].t).toBeGreaterThan(1000)
    expect(copies[0]).toMatchObject({ highlight: true, color: 'pink' })
    expect(copies.every((s) => s.id !== 'a' && s.id !== 'b')).toBe(true)
  })

  it('cambia colore solo ai tratti del tipo giusto, e solo a quelli che cambiano', () => {
    const black = row('nero', 0, 20, 0)
    const red = row('rosso', 0, 20, 10, { color: 'red' })
    const marker = row('evidenziatore', 0, 20, 20, { highlight: true, color: 'green' })
    const ink = recolor([black, red, marker], 'red', false, ids)
    expect(ink.before.map((s) => s.id)).toEqual(['nero'])
    expect(ink.after[0]).toMatchObject({ color: 'red', t: 1 })
    expect(ink.after[0].id).not.toBe('nero')
    const marked = recolor([black, red, marker], 'yellow', true, ids)
    expect(marked.before.map((s) => s.id)).toEqual(['evidenziatore'])
    expect(marked.after[0]).toMatchObject({ color: 'yellow', highlight: true })
    // Un colore che non è di quel tipo non cambia niente.
    expect(recolor([black], 'yellow', false, ids).before).toEqual([])
  })

  it('la maniglia ingrandisce lungo la diagonale, tra il minimo e il massimo', () => {
    const o = { x: 0, y: 0 }
    const c = { x: 100, y: 50 }
    expect(handleScale(o, c, { x: 200, y: 100 }, 0.1, 10)).toBeCloseTo(2)
    expect(handleScale(o, c, { x: 50, y: 25 }, 0.1, 10)).toBeCloseTo(0.5)
    // Di traverso conta solo quanto va lungo la diagonale.
    expect(handleScale(o, c, { x: 100, y: 50 + 200 }, 0.1, 10)).toBeCloseTo(1 + (200 * 50) / 12500)
    expect(handleScale(o, c, { x: -50, y: -50 }, 0.1, 10)).toBe(0.1)
    expect(handleScale(o, c, { x: 5000, y: 0 }, 0.1, 10)).toBe(10)
    expect(handleScale(o, o, { x: 5, y: 5 }, 0.1, 10)).toBe(1)
    expect(centerOn({ minX: 0, minY: 0, maxX: 20, maxY: 10 }, { x: 100, y: 100 })).toEqual({ dx: 90, dy: 95 })
  })

  it('quello che si incolla resta dentro la vista, se ci sta', () => {
    const view = { minX: 0, minY: 0, maxX: 400, maxY: 300 }
    // Esce a sinistra e in basso: rientra a 8 dai bordi.
    expect(keepInside({ minX: -45, minY: 250, maxX: 155, maxY: 320 }, view, 8)).toEqual({ dx: 53, dy: -28 })
    expect(keepInside({ minX: 380, minY: -10, maxX: 420, maxY: 10 }, view, 8)).toEqual({ dx: -28, dy: 18 })
    // Dentro: niente.
    expect(keepInside({ minX: 50, minY: 50, maxX: 100, maxY: 100 }, view, 8)).toEqual({ dx: 0, dy: 0 })
    // Più largo della vista: in quella direzione resta dov'è.
    expect(keepInside({ minX: -100, minY: 280, maxX: 500, maxY: 320 }, view, 8)).toEqual({ dx: 0, dy: -28 })
  })
})
