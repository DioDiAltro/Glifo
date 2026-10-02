import { describe, expect, it } from 'vitest'
import { Sheet } from '../src/math/sheet'
import { staticGraphSvg } from '../src/graph/picture'
import { formulaGraph, parseGraph, type GraphItem } from '../src/graph/spec'
import { PALETTES } from '../src/graph/svg'

const r = String.raw
const light = { ...PALETTES.light, surface: '#ffffff', halo: '#ffffff' }

/** Il risultato dopo l'ultima formula, con le formule prima come definizioni. */
function result(...formulas: string[]): { text: string; tex: string } | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last
}

const text = (...formulas: string[]) => result(...formulas)?.text ?? null

/** Un triangolo rettangolo in A: AB = 4, AC = 3, BC = 5. */
const pts = ['A = (0, 0)', 'B = (4, 0)', 'C = (0, 3)']
const square = ['A = (0, 0)', 'B = (2, 0)', 'C = (2, 2)', 'D = (0, 2)']

describe('la geometria: i conti nella nota', () => {
  it('lunghezze dei segmenti (con le radici esatte), distanze tra punti, il vettore da A a B', () => {
    expect(text(...pts, r`\overline{AB} =`)).toBe('4')
    expect(text(...pts, r`\overline{BC} =`)).toBe('5')
    expect(text(...pts, 'd(A, B) =')).toBe('4')
    expect(text(...pts, r`\operatorname{distanza}(A, B) =`)).toBe('4')
    expect(text(...pts, r`\operatorname{segmento}(B, C) =`)).toBe('5')
    expect(text('A = (0, 0)', 'B = (1, 1)', r`\overline{AB} =`)).toBe('√2 ≈ 1,414213…')
    expect(result('A = (0, 0)', 'B = (2, 2)', r`\overline{AB} =`)?.tex).toBe(r`2\sqrt{2} \approx 2{,}828427\ldots`)
    expect(text(...pts, 'M = \\operatorname{medio}(B, C)', r`\overline{AM} =`)).toBe('5/2')
    // Il perimetro come somma dei lati.
    expect(text(...pts, r`\overline{AB} + \overline{BC} + \overline{CA} =`)).toBe('12')
    expect(text('A = (1, 2)', 'B = (4, 6)', r`\overrightarrow{AB} =`)).toBe('(3, 4)')
    expect(text(...pts, r`\vec{AB} =`)).toBe('(4, 0)')
    expect(text(...pts, r`|\overrightarrow{BC}| =`)).toBe('5')
  })

  it('punto medio, baricentro, la retta per due punti (anche verticale, anche nello spazio)', () => {
    expect(text('A = (1, 2)', 'B = (3, 4)', r`\operatorname{medio}(A, B) =`)).toBe('(2, 3)')
    expect(text(...pts, r`\operatorname{baricentro}(A, B, C) =`)).toBe('(4/3, 1)')
    expect(text('A = (1, 2)', 'B = (3, 6)', r`\operatorname{retta}(A, B) =`)).toBe('y = 2x')
    expect(text('A = (1, 2)', 'B = (3, 6)', r`\overleftrightarrow{AB} =`)).toBe('y = 2x')
    expect(text('A = (1, 2)', 'B = (1, 6)', r`\operatorname{retta}(A, B) =`)).toBe('x = 1')
    expect(text('A = (1, 2, 3)', 'B = (4, 6, 3)', r`\operatorname{retta}(A, B) =`)).toBe('(x, y, z) = (1, 2, 3) + t(3, 4, 0)')
  })

  it('triangoli e poligoni: area e perimetro', () => {
    expect(text(...pts, r`\triangle ABC =`)).toBe('6')
    expect(text(...pts, r`\operatorname{area}(A, B, C) =`)).toBe('6')
    expect(text(...pts, r`\operatorname{area}(\triangle ABC) =`)).toBe('6')
    expect(text(...pts, r`\operatorname{perimetro}(\triangle ABC) =`)).toBe('12')
    expect(text(...square, r`\operatorname{poligono}(A, B, C, D) =`)).toBe('4')
    expect(text(...square, r`\operatorname{perimetro}(\operatorname{poligono}(A, B, C, D)) =`)).toBe('8')
  })

  it('gli angoli in gradi: tra tre punti e tra due vettori', () => {
    expect(text(...pts, r`\widehat{BAC} =`)).toBe('90°')
    expect(text(...pts, r`\angle ABC =`)).toBe('36,869897…°')
    expect(text(...pts, r`\measuredangle ABC =`)).toBe('36,869897…°')
    expect(text('u = (1, 0)', 'v = (1, 1)', r`\operatorname{angolo}(u, v) =`)).toBe('45°')
  })

  it('circonferenze: con il centro e il raggio, o per tre punti', () => {
    expect(text('O = (1, 2)', r`\operatorname{circonferenza}(O, 3) =`)).toBe('(x − 1)² + (y − 2)² = 9')
    expect(text(...pts, r`\operatorname{circonferenza}(A, B, C) =`)).toBe('(x − 2)² + (y − 3/2)² = 25/4')
  })

  it('le distanze di un punto da una retta e da un piano; il piano per tre punti', () => {
    const line = ['P = (0, 0)', 'A = (1, 0)', 'B = (0, 1)', r`r = \operatorname{retta}(A, B)`]
    expect(text(...line, 'd(P, r) =')).toBe('√2/2 ≈ 0,707106…')
    expect(text('A = (1, 2)', 'B = (3, 6)', r`r = \operatorname{retta}(A, B)`, 'P = (0, 0)', 'd(P, r) =')).toBe('0')
    const space = ['A = (1, 0, 0)', 'B = (0, 1, 0)', 'C = (0, 0, 1)']
    expect(text(...space, r`\operatorname{piano}(A, B, C) =`)).toBe('x + y + z = 1')
    expect(text(...space, r`p = \operatorname{piano}(A, B, C)`, 'O = (0, 0, 0)', 'd(O, p) =')).toBe('√3/3 ≈ 0,577350…')
  })

  it('le intersezioni: due rette, una retta e una circonferenza (con le radici esatte)', () => {
    const cross = ['A = (0, 0)', 'B = (2, 2)', 'C = (0, 2)', 'D = (2, 0)']
    expect(text(...cross, r`\operatorname{intersezione}(\overleftrightarrow{AB}, \overleftrightarrow{CD}) =`)).toBe('(1, 1)')
    const circle = (a: string, b: string, radius: number) => [`A = ${a}`, `B = ${b}`, 'O = (0, 0)', r`r = \operatorname{retta}(A, B)`, `c = \\operatorname{circonferenza}(O, ${radius})`]
    expect(text(...circle('(0, 0)', '(1, 0)', 2), r`\operatorname{intersezione}(r, c) =`)).toBe('(−2, 0); (2, 0)')
    expect(text(...circle('(0, 0)', '(1, 1)', 2), r`\operatorname{intersezione}(r, c) =`)).toBe('(−√2, −√2); (√2, √2)')
    // y = x + 1 e x² + y² = 4: x = (−1 ± √7)/2.
    const mixed = result(...circle('(0, 1)', '(1, 2)', 2), r`\operatorname{intersezione}(r, c) =`)
    expect(mixed?.text).toBe('((−1 − √7)/2, (1 − √7)/2); ((−1 + √7)/2, (1 + √7)/2)')
    expect(mixed?.tex).toBe(r`\left(\frac{-1 - \sqrt{7}}{2}, \frac{1 - \sqrt{7}}{2}\right);\ \left(\frac{-1 + \sqrt{7}}{2}, \frac{1 + \sqrt{7}}{2}\right)`)
    // Una retta lontana dalla circonferenza: nessun punto. Due rette parallele: nessun risultato.
    expect(text(...circle('(0, 5)', '(1, 5)', 2), r`\operatorname{intersezione}(r, c) =`)).toBe('∅ (nessun punto)')
    expect(text('A = (0, 0)', 'B = (1, 0)', 'C = (0, 1)', 'D = (1, 1)', r`\operatorname{intersezione}(\overleftrightarrow{AB}, \overleftrightarrow{CD}) =`)).toBeNull()
  })
})

const triangle = r`A = (0, 0)
B = (4, 0)
C = (1, 3)
\triangle ABC
\widehat{BAC}
M = \operatorname{medio}(B, C)
\overline{AM}`

/** Le coordinate in pixel dei punti con il nome e delle loro scritte, dal disegno. */
function names(svg: string): Map<string, { cx: number; cy: number; x: number; y: number; anchor: string }> {
  const out = new Map<string, { cx: number; cy: number; x: number; y: number; anchor: string }>()
  const re = /<circle cx="([\d.-]+)" cy="([\d.-]+)" r="4.5"[^>]*\/><text x="([\d.-]+)" y="([\d.-]+)" text-anchor="(\w+)"[^>]*>([A-Z])<\/text>/g
  for (const m of svg.matchAll(re)) out.set(m[6], { cx: Number(m[1]), cy: Number(m[2]), x: Number(m[3]), y: Number(m[4]), anchor: m[5] })
  return out
}

describe('la geometria nei grafici', () => {
  it('triangolo, angolo, punto medio e segmento, con le misure nella legenda', () => {
    const spec = parseGraph(triangle)
    expect(spec.errors).toEqual([])
    expect(spec.dim).toBe(2)
    expect(spec.items.map((i) => i.kind)).toEqual(['point', 'point', 'point', 'polygon', 'angle', 'point', 'segment'])
    expect(spec.items[3].label).toBe(r`\triangle ABC,\ \text{area} = 6`)
    const angle = spec.items[4] as Extract<GraphItem, { kind: 'angle' }>
    expect(angle.degrees).toBeCloseTo(71.565051, 5)
    expect(spec.items[5]).toMatchObject({ kind: 'point', x: 2.5, y: 1.5, name: 'M' })
    expect(spec.items[6].label).toBe(r`\overline{AM} = \frac{\sqrt{34}}{2} \approx 2{,}915475\ldots`)
  })

  it('rette e circonferenze per i punti, le intersezioni come punti', () => {
    const lines = parseGraph(r`A = (0, 0)
B = (2, 2)
C = (0, 2)
D = (2, 0)
r = \operatorname{retta}(A, B)
s = \overleftrightarrow{CD}
P = \operatorname{intersezione}(r, s)`)
    expect(lines.errors).toEqual([])
    expect(lines.items.map((i) => i.kind)).toEqual(['point', 'point', 'point', 'point', 'parametric', 'parametric', 'point'])
    expect(lines.items[4].label).toBe(r`r = \operatorname{retta}\left(A, B\right): y = x`)
    expect(lines.items[6]).toMatchObject({ x: 1, y: 1, name: 'P' })
    const circle = parseGraph(r`A = (1, 0)
B = (0, 2)
C = (-1, 0)
\operatorname{circonferenza}(A, B, C)`)
    expect(circle.items[3]).toMatchObject({ kind: 'implicit' })
    const cut = parseGraph(r`A = (-2, -1)
B = (2, 1)
O = (0, 0)
r = \operatorname{retta}(A, B)
c = \operatorname{circonferenza}(O, 1)
\operatorname{intersezione}(r, c)`)
    const points = cut.items.find((i) => i.kind === 'points') as Extract<GraphItem, { kind: 'points' }>
    expect(points.points.map((p) => [p[0], p[1]].map((v) => Math.round(v * 1e6) / 1e6))).toEqual([
      [-0.894427, -0.447214],
      [0.894427, 0.447214],
    ])
  })

  it('\\overline{AB} è un segmento, non il coniugato: il grafico resta nel piano (o nello spazio)', () => {
    const flat = parseGraph('A = (0, 0)\nB = (3, 1)\n\\overline{AB}')
    expect(flat.gauss).toBeFalsy()
    expect(flat.items.map((i) => i.kind)).toEqual(['point', 'point', 'segment'])
    const space = parseGraph(r`A = (1, 0, 0)
B = (0, 1, 0)
C = (0, 0, 1)
\operatorname{piano}(A, B, C)
\triangle ABC
\overline{AB}`)
    expect(space.errors).toEqual([])
    expect(space.dim).toBe(3)
    expect(space.items.map((i) => i.kind)).toEqual(['point3', 'point3', 'point3', 'implicit3', 'polygon', 'segment'])
    // Il coniugato di un numero complesso resta il piano di Gauss.
    expect(parseGraph('z = 1 + i\n\\overline{z}').gauss).toBe(true)
  })

  it('i punti della nota usati da una figura si disegnano anche loro, con il nome', () => {
    const defs = ['A = (0, 0)', 'B = (3, 1)', 'C = (1, 2)', r`r = \operatorname{retta}(B, C)`]
    const spec = parseGraph('\\overline{AB}\n\\overrightarrow{AC}\nr', defs)
    expect(spec.items.map((i) => [i.kind, i.kind === 'point' ? i.name : null, !!i.fromNote])).toEqual([
      ['segment', null, false],
      ['vector', null, false],
      ['parametric', null, false],
      ['point', 'A', true],
      ['point', 'B', true],
      ['point', 'C', true],
    ])
    // Nel pannello della formula: il triangolo con i suoi vertici.
    expect(formulaGraph(r`\triangle ABC`, defs)?.items.map((i) => i.kind)).toEqual(['polygon', 'point', 'point', 'point'])
    // Un punto definito nel blocco, o che il blocco disegna già (una riga con solo il nome), non si ripete.
    expect(parseGraph('A = (0, 0)\n\\overline{AB}', defs).items.filter((i) => i.kind === 'point').length).toBe(2)
    const points = parseGraph('B\n\\overline{AB}', defs).items.filter((i) => i.kind === 'point')
    expect(points.map((i) => i.kind === 'point' && i.name)).toEqual(['B', 'A'])
  })

  it('nel disegno i nomi dei vertici stanno fuori dal triangolo e lontano dai numeri degli assi', () => {
    const svg = staticGraphSvg(parseGraph(triangle), 640, 400, light, { id: 'g' })
    const at = names(svg)
    const a = at.get('A')!
    const b = at.get('B')!
    const c = at.get('C')!
    // A è nell'origine: il nome a sinistra, sotto; la O dell'origine non c'è (sarebbe sopra la A).
    expect(a.anchor).toBe('end')
    expect(a.y).toBeGreaterThan(a.cy)
    expect(svg).not.toContain('>O</text>')
    // B è sull'asse x: sopra, dove non ci sono i numeri delle tacche.
    expect(b.y).toBeLessThan(b.cy)
    expect(b.anchor).toBe('start')
    // C è il vertice in alto: il nome sopra.
    expect(c.y).toBeLessThan(c.cy)
    expect(svg).toContain('>71,6°</text>')
  })

  it("l'angolo retto è un quadratino, gli altri un arco", () => {
    const spec = parseGraph(r`A = (0, 0)
B = (3, 0)
C = (0, 2)
\triangle ABC
\widehat{BAC}
\widehat{ABC}`)
    const svg = staticGraphSvg(spec, 640, 400, light, { id: 'g' })
    const edge = (i: number) => svg.match(new RegExp(`<path d="([^"]+)" stroke="[^"]+" stroke-width="2" data-item="${i}"/>`))?.[1] ?? ''
    expect(edge(4)).toMatch(/^M[\d. ]+L[\d. ]+L[\d. ]+$/)
    expect(edge(5)).toContain('A')
    expect(svg).toContain('>90°</text>')
    expect(svg).toContain('>33,7°</text>')
  })
})
