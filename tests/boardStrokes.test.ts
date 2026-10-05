import { describe, expect, it } from 'vitest'
import { capsuleSpan, compareStrokes, eraseStroke, piecesOf, roundPoints, segmentDistance, strokeBox, type Stroke } from '../src/board/strokes'

/** Un tratto dritto da (x0, y) a (x1, y), con un punto ogni `step`. */
function line(x0: number, x1: number, y = 0, step = 10): Stroke {
  const points: number[] = []
  for (let x = x0; x <= x1; x += step) points.push(x, y, 0.5)
  return { id: 'a', t: 1, color: 'ink', size: 2, pen: false, points }
}

const xs = (piece: number[]) => piece.filter((_, i) => i % 3 === 0)

describe('lavagna: la gomma', () => {
  it('trova la parte di un segmento sotto la gomma, anche con la gomma ferma (un cerchio)', () => {
    // Segmento orizzontale da (0, 0) a (100, 0), gomma ferma in (50, 0) con raggio 10.
    const still = capsuleSpan({ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 50, y: 0 }, { x: 50, y: 0 }, 10)!
    expect(still[0]).toBeCloseTo(0.4)
    expect(still[1]).toBeCloseTo(0.6)
    // La gomma che passa di traverso, da (30, -50) a (30, 50): taglia tra 20 e 40.
    const across = capsuleSpan({ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 30, y: -50 }, { x: 30, y: 50 }, 10)!
    expect(across[0]).toBeCloseTo(0.2)
    expect(across[1]).toBeCloseTo(0.4)
    // Lungo il segmento, da (20, 3) a (60, 3): copre da 20 − √91 a 60 + √91.
    const along = capsuleSpan({ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 20, y: 3 }, { x: 60, y: 3 }, 10)!
    expect(along[0]).toBeCloseTo((20 - Math.sqrt(91)) / 100)
    expect(along[1]).toBeCloseTo((60 + Math.sqrt(91)) / 100)
    // Lontano: niente.
    expect(capsuleSpan({ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 50, y: 30 }, { x: 80, y: 30 }, 10)).toBeNull()
    // Appena sfiorato (tangente): niente.
    expect(capsuleSpan({ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 50, y: 10 }, { x: 50, y: 10 }, 10)).toBeNull()
  })

  it('taglia un tratto in due dove passa nel mezzo, esattamente dove entra e dove esce', () => {
    const s = line(0, 100)
    // Raggio 9 più metà spessore (1) = 10 dalla linea.
    const pieces = eraseStroke(s, { x: 50, y: -40 }, { x: 50, y: 40 }, 9)!
    expect(pieces).toHaveLength(2)
    expect(xs(pieces[0])[0]).toBe(0)
    expect(xs(pieces[0]).at(-1)).toBeCloseTo(40)
    expect(xs(pieces[1])[0]).toBeCloseTo(60)
    expect(xs(pieces[1]).at(-1)).toBe(100)
    // La pressione dei punti nuovi è quella del tratto in quel punto.
    expect(pieces[0][pieces[0].length - 1]).toBeCloseTo(0.5)
  })

  it('taglia anche un tratto veloce, con i punti lontani: conta il segmento, non solo i punti', () => {
    // Due punti soli, a 0 e a 100: la gomma passa a 50, lontano da tutti e due.
    const s: Stroke = { id: 'a', t: 1, color: 'ink', size: 2, pen: false, points: [0, 0, 0.5, 100, 0, 0.5] }
    const pieces = eraseStroke(s, { x: 50, y: -40 }, { x: 50, y: 40 }, 9)!
    expect(pieces.map(xs)).toEqual([[0, expect.closeTo(40)], [expect.closeTo(60), 100]])
  })

  it('cancella la fine di un tratto, tutto un tratto o nulla', () => {
    const s = line(0, 100)
    const end = eraseStroke(s, { x: 100, y: -40 }, { x: 100, y: 40 }, 15)!
    expect(end).toHaveLength(1)
    expect(xs(end[0]).at(-1)).toBeCloseTo(84)
    expect(eraseStroke(s, { x: -50, y: 0 }, { x: 150, y: 0 }, 5)).toEqual([])
    expect(eraseStroke(s, { x: 0, y: 50 }, { x: 100, y: 50 }, 5)).toBeNull()
  })

  it('non lascia briciole: i pezzi più corti del loro spessore vanno via', () => {
    const s = line(0, 100)
    // La gomma copre quasi tutto, tranne un pezzetto all'inizio lungo 1.
    const pieces = eraseStroke(s, { x: 12, y: 0 }, { x: 100, y: 0 }, 10)!
    expect(pieces).toEqual([])
  })

  it('un puntino si cancella se la gomma lo tocca', () => {
    const dot: Stroke = { id: 'p', t: 1, color: 'red', size: 4, pen: true, points: [10, 10, 0.7] }
    expect(eraseStroke(dot, { x: 0, y: 0 }, { x: 0, y: 0 }, 13)).toEqual([])
    expect(eraseStroke(dot, { x: 0, y: 0 }, { x: 0, y: 0 }, 5)).toBeNull()
  })

  it('i pezzi tengono colore, spessore, penna e momento del tratto, con id nuovi', () => {
    const s: Stroke = { ...line(0, 100), color: 'blue', size: 3, pen: true, t: 42 }
    let n = 0
    const rest = piecesOf(s, eraseStroke(s, { x: 50, y: -40 }, { x: 50, y: 40 }, 9)!, () => `p${++n}`)
    expect(rest.map((p) => [p.id, p.color, p.size, p.pen, p.t])).toEqual([
      ['p1', 'blue', 3, true, 42],
      ['p2', 'blue', 3, true, 42],
    ])
  })
})

describe('lavagna: i tratti', () => {
  it('il rettangolo del tratto comprende il suo spessore', () => {
    expect(strokeBox({ ...line(0, 100, 5), size: 3 })).toEqual({ minX: -3, minY: 2, maxX: 103, maxY: 8 })
  })

  it("l'ordine è quello in cui sono stati scritti, a parità di momento decide l'id", () => {
    const a = { ...line(0, 10), id: 'b', t: 5 }
    const b = { ...line(0, 10), id: 'a', t: 5 }
    const c = { ...line(0, 10), id: 'z', t: 1 }
    expect([a, b, c].sort(compareStrokes).map((s) => s.id)).toEqual(['z', 'a', 'b'])
  })

  it('arrotonda le coordinate a due decimali e la pressione a tre', () => {
    expect(roundPoints([1.23456, 7.891011, 0.123456])).toEqual([1.23, 7.89, 0.123])
  })

  it('misura la distanza da un segmento', () => {
    expect(segmentDistance({ x: 5, y: 3 }, { x: 0, y: 0 }, { x: 10, y: 0 })).toBe(3)
    expect(segmentDistance({ x: 13, y: 4 }, { x: 0, y: 0 }, { x: 10, y: 0 })).toBe(5)
    expect(segmentDistance({ x: 3, y: 4 }, { x: 0, y: 0 }, { x: 0, y: 0 })).toBe(5)
  })
})
