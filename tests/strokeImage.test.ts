import { describe, expect, it } from 'vitest'
import { formulaLines, modelPixels, paddedBox, strokesBox } from '../src/board/strokeImage'
import type { Stroke } from '../src/board/strokes'

let n = 0
/** Un tratto della penna per i punti dati (pressione a metà). */
function stroke(points: [number, number][], extra: Partial<Stroke> = {}): Stroke {
  return { id: `s${n++}`, t: n, color: 'ink', size: 3.2, pen: true, points: points.flatMap(([x, y]) => [x, y, 0.5]), ...extra }
}

/** Una «lettera»: un tratto alto `h` che parte da (x, y). */
const letter = (x: number, y: number, h = 30) => stroke([[x, y], [x + 10, y + h / 2], [x, y + h]])

describe('le immagini dei tratti per il lettore delle formule', () => {
  it('due formule una sotto l\'altra sono due righe, dall\'alto in basso', () => {
    const second = [letter(40, 300), letter(70, 305), stroke([[100, 318], [130, 318]])]
    const first = [letter(40, 100), letter(70, 96), letter(100, 104)]
    const lines = formulaLines([...second, ...first])
    expect(lines).toHaveLength(2)
    expect(lines[0]).toEqual(first)
    expect(lines[1]).toEqual(second)
  })

  it('una frazione, gli esponenti e il segno di integrale restano nella stessa riga', () => {
    const numerator = letter(50, 100, 25)
    const bar = stroke([[40, 134], [80, 134]])
    const denominator = letter(50, 142, 25)
    const integral = stroke([[0, 90], [5, 130], [10, 170]])
    const exponent = letter(100, 80, 14)
    expect(formulaLines([numerator, bar, denominator, integral, exponent])).toEqual([[numerator, bar, denominator, integral, exponent]])
  })

  it('gli evidenziatori non sono scrittura e senza scrittura non ci sono righe', () => {
    const marker = stroke([[0, 0], [200, 0]], { highlight: true, color: 'yellow', size: 18 })
    const x = letter(10, 10)
    expect(formulaLines([marker, x])).toEqual([[x]])
    expect(formulaLines([marker])).toEqual([])
  })

  it('il margine bianco è un sesto dell\'altezza, almeno 8', () => {
    const tall = [stroke([[0, 0], [0, 120]])]
    const box = strokesBox(tall)
    const padded = paddedBox(tall)
    expect(box.minY - padded.minY).toBeCloseTo((box.maxY - box.minY) / 6)
    const flat = [stroke([[0, 0], [60, 0]])]
    expect(strokesBox(flat).minX - paddedBox(flat).minX).toBeCloseTo(8)
  })

  it('i pixel per il modello: tre piani (rosso, verde, blu) da −1 a 1', () => {
    // Due pixel per lato: bianco, nero, rosso, grigio.
    const rgba = [255, 255, 255, 255, 0, 0, 0, 255, 255, 0, 0, 255, 51, 51, 51, 255]
    const px = modelPixels(rgba, 2)
    expect([...px.slice(0, 4)].map((v) => +v.toFixed(3))).toEqual([1, -1, 1, -0.6])
    expect([...px.slice(4, 8)].map((v) => +v.toFixed(3))).toEqual([1, -1, -1, -0.6])
    expect([...px.slice(8, 12)].map((v) => +v.toFixed(3))).toEqual([1, -1, -1, -0.6])
  })
})
