import { describe, expect, it } from 'vitest'
import { exponentialForm, piMultiple, roots, solveComplex, surd, type Complex } from '../src/math/complex'
import { toLatex } from '../src/math/latex'
import { parseMath } from '../src/math/parse'
import { Sheet } from '../src/math/sheet'
import { staticGraphSvg } from '../src/graph/picture'
import { chooseWindow, sampleImplicit } from '../src/graph/plot'
import { formulaGraph, parseGraph, type GraphItem } from '../src/graph/spec'
import { imaginaryLabel, PALETTES } from '../src/graph/svg'

const r = String.raw
const light = { ...PALETTES.light, surface: '#ffffff', halo: '#ffffff' }

/** Il risultato mostrato dopo l'ultima formula (com'è scritto nell'editor), con le formule prima come definizioni. */
function result(...formulas: string[]): string | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last?.text ?? null
}

function close(z: Complex, re: number, im: number): boolean {
  return Math.abs(z.re - re) < 1e-9 && Math.abs(z.im - im) < 1e-9
}

function item<K extends GraphItem['kind']>(source: string, kind: K, defs: string[] = []): Extract<GraphItem, { kind: K }> {
  const spec = parseGraph(source, defs)
  const found = spec.items.find((i) => i.kind === kind)
  if (!found) throw new Error(`${kind} non trovato in ${source}: ${JSON.stringify(spec.errors)}`)
  return found as Extract<GraphItem, { kind: K }>
}

describe('i numeri complessi: come si scrivono', () => {
  it('parte reale e immaginaria, argomento e coniugato', () => {
    for (const [src, latex] of [
      [r`\Re(2 - 3i)`, r`\operatorname{Re}\left(2 - 3i\right)`],
      [r`\operatorname{Im} z`, r`\operatorname{Im} z`],
      [r`\mathrm{Re}(z)`, r`\operatorname{Re} z`],
      [r`\arg z`, r`\arg z`],
      [r`\overline{1 + i}`, r`\overline{1 + i}`],
      [r`\bar{z}`, r`\bar{z}`],
    ]) {
      expect(toLatex(parseMath(src)), src).toBe(latex)
    }
  })

  it('un insieme di numeri complessi', () => {
    const set = parseMath(r`\{z \in \mathbb{C} : |z| \le 1\}`)
    expect(set.k === 'set' && set.vars).toEqual(['z'])
  })
})

describe('i numeri complessi: i conti nella nota', () => {
  it('le quattro operazioni, anche esatte con le frazioni', () => {
    expect(result('(1 + 2i)(3 - i) =')).toBe('5 + 5i')
    expect(result(r`\frac{1}{1 + i} =`)).toBe('1/2 − (1/2)i')
    expect(result('(1 + i)^{10} =')).toBe('32i')
    expect(result('i^2 =')).toBe('−1')
    expect(result(r`\sum_{k=0}^{3} i^k =`)).toBe('0')
    expect(result('0{,}5 + 1{,}5i =')).toBe('0,5 + 1,5i')
  })

  it('modulo, argomento (come multiplo di π, se lo è), parte reale e immaginaria, coniugato', () => {
    expect(result('|3 + 4i| =')).toBe('5')
    expect(result('|1 + i| =')).toBe('1,414213…')
    expect(result(r`\arg(1 + i) =`)).toBe('π/4')
    expect(result(r`\arg(-1) =`)).toBe('π')
    expect(result(r`\arg(-i) =`)).toBe('−π/2')
    expect(result(r`\arg(1 + 2i) =`)).toBe('1,107148…')
    expect(result(r`\Re(2 - 3i) =`)).toBe('2')
    expect(result(r`\operatorname{Im}(2 - 3i) =`)).toBe('−3')
    expect(result(r`\overline{1 + i} =`)).toBe('1 − i')
  })

  it('con i numeri definiti prima: z̄, z w, z/w', () => {
    expect(result('z = 1 + 2i', r`\bar{z} =`)).toBe('1 − 2i')
    expect(result('z = 1 + 2i', r`z \bar{z} =`)).toBe('5')
    expect(result('z = 1 + 2i', 'w = 3 - i', r`\frac{z}{w} =`)).toBe('1/10 + (7/10)i')
    expect(result('z = (1 + i)^2 =', 'z + 1 =')).toBe('1 + 2i')
    expect(result('f(z) = z^2 + 1', 'f(i) =')).toBe('0')
    expect(result('f(x) = x^2', 'f(i) =')).toBe('−1')
  })

  it('esponenziale, logaritmo e funzioni: e^{iπ} = −1', () => {
    expect(result(r`e^{i\pi} =`)).toBe('−1')
    expect(result(r`e^{i\pi} + 1 =`)).toBe('0')
    expect(result(r`\sqrt{2} e^{i\pi/4} =`)).toBe('1 + i')
    expect(result(r`2 e^{i \pi / 3} =`)).toBe('1 + 1,732050…i')
    expect(result(r`\ln(-1) =`)).toBe('3,141592…i')
    expect(result(r`\cos(i) =`)).toBe('1,543080…')
    // tan(π/2) non c'è, neanche nei complessi.
    expect(result(r`\tan \frac{\pi}{2} =`)).toBeNull()
  })

  it('una radice da sola dà tutte le radici; dentro un\'espressione la principale', () => {
    expect(result(r`\sqrt{-4} =`)).toBe('2i; −2i')
    expect(result(r`\sqrt[3]{8i} =`)).toBe('1,732050… + i; −1,732050… + i; −2i')
    // Come nei reali, la radice cubica di −8 è −2.
    expect(result(r`\sqrt[3]{-8} =`)).toBe('−2')
    expect(result(r`\sqrt{i} + 1 =`)).toBe('1,707106… + 0,707106…i')
  })

  it('le radici n-esime partono dalla principale', () => {
    const cube = roots({ re: 0, im: 8 }, 3)
    expect(cube).toHaveLength(3)
    expect(close(cube[0], Math.sqrt(3), 1)).toBe(true)
    expect(close(cube[2], 0, -2)).toBe(true)
    expect(close(roots({ re: -8, im: 0 }, 3)[0], -2, 0)).toBe(true)
  })
})

describe('le forme di un numero complesso', () => {
  it('radici e multipli di π riconosciuti', () => {
    expect(surd(Math.SQRT2)?.tex).toBe(r`\sqrt{2}`)
    expect(surd(2 * Math.sqrt(3))?.tex).toBe(r`2\sqrt{3}`)
    expect(surd(Math.SQRT1_2)?.tex).toBe(r`\frac{\sqrt{2}}{2}`)
    expect(surd(3)?.tex).toBe('3')
    expect(surd(Math.PI)).toBeNull()
    expect(piMultiple(Math.PI / 4)?.tex).toBe(r`\frac{\pi}{4}`)
    expect(piMultiple((-2 * Math.PI) / 3)?.tex).toBe(r`-\frac{2\pi}{3}`)
    expect(piMultiple(1)).toBeNull()
  })

  it('la forma esponenziale, con il segno dell\'angolo davanti alla i', () => {
    const style = { comma: true, decimal: true, digits: 9 }
    expect(exponentialForm({ re: 1, im: 1 }, style)?.tex).toBe(r`\sqrt{2}\,e^{i\frac{\pi}{4}}`)
    expect(exponentialForm({ re: 1, im: -1 }, style)?.tex).toBe(r`\sqrt{2}\,e^{-i\frac{\pi}{4}}`)
    expect(exponentialForm({ re: 0, im: 2 }, style)?.tex).toBe(r`2\,e^{i\frac{\pi}{2}}`)
    expect(exponentialForm({ re: 3, im: 4 }, style)?.tex).toBe(r`5\,e^{i\,0{,}927295218\ldots}`.replace('218', ''))
  })
})

describe('le equazioni con i numeri complessi', () => {
  it('le soluzioni, anche con il coniugato', () => {
    const cube = solveComplex((z) => ({ re: z.re ** 3 - 3 * z.re * z.im ** 2, im: 3 * z.re ** 2 * z.im - z.im ** 3 - 8 }))
    expect(cube).toHaveLength(3)
    expect(cube.some((z) => close(z, 0, -2))).toBe(true)
    // \bar{z} = z^2: 0, 1 e le altre due radici cubiche dell'unità.
    const conj = solveComplex((z) => ({ re: z.re - (z.re ** 2 - z.im ** 2), im: -z.im - 2 * z.re * z.im }))
    expect(conj).toHaveLength(4)
    expect(conj.some((z) => close(z, -0.5, Math.sqrt(3) / 2))).toBe(true)
  })
})

describe('il piano di Gauss nei grafici', () => {
  it('si usa quando c\'è la i, \\Re, \\Im, \\arg, il coniugato o |…| con la z', () => {
    for (const source of ['1 + 2i', '|z - i| = 2', r`\Re z > 0`, r`\arg z = \frac{\pi}{4}`, r`\sqrt[6]{-64}`, r`\{z \in \mathbb{C} : |z| \le 1\}`, '2e^{it}']) {
      expect(parseGraph(source).gauss, source).toBe(true)
    }
    for (const source of ['y = x^2', 'z = x^2 + y^2', r`\sum_{i=1}^{3} i x`]) expect(parseGraph(source).gauss, source).toBeFalsy()
    // Una i definita come numero non è l'unità immaginaria.
    expect(parseGraph('y = i x', ['i = 2']).gauss).toBeFalsy()
  })

  it('un numero è una freccia, con le sue forme nella legenda', () => {
    const one = item('1 + i', 'complex')
    expect(one.arrows).toBe(true)
    expect(one.values).toEqual([{ re: 1, im: 1 }])
    expect(one.label).toBe(r`1 + i = \sqrt{2}\,e^{i\frac{\pi}{4}}`)
    const named = item('w = 3 - i', 'complex')
    expect(named.name).toBe('w')
    expect(named.label).toBe(r`w = 3 - i = \sqrt{10}\,e^{-i\,0{,}321750554\ldots}`.replace('554', ''))
    // I numeri della nota: z_1 con il suo nome.
    expect(item('z_1', 'complex', ['z_1 = 1 + i']).name).toBe('z_1')
  })

  it('le radici n-esime e le soluzioni di un\'equazione sono punti', () => {
    const six = item(r`\sqrt[6]{-64}`, 'complex')
    expect(six.arrows).toBe(false)
    expect(six.values).toHaveLength(6)
    const solutions = item('z^3 = 8i', 'complex')
    expect(solutions.values).toHaveLength(3)
    expect(solutions.values.some((z) => close(z, 0, -2))).toBe(true)
  })

  it('le equazioni con i lati reali sono curve, le disuguaglianze zone', () => {
    const circle = item('|z - i| = 2', 'implicit')
    expect(circle.F(0, 3)).toBeCloseTo(0, 9)
    expect(circle.F(0, 1)).toBeLessThan(0)
    const disk = item(r`|z| \le 2`, 'region')
    expect(disk.M(1, 1)).toBeGreaterThan(0)
    expect(disk.M(2, 1)).toBeLessThan(0)
    const ring = item(r`1 < |z - 1| \le 2`, 'region')
    expect(ring.parts?.map((p) => p.strict)).toEqual([true, false])
    const set = item(r`D = \{z \in \mathbb{C} : |z| \le 1, \Im z \ge 0\}`, 'region')
    expect(set.M(0, 0.5)).toBeGreaterThan(0)
    expect(set.M(0, -0.5)).toBeLessThan(0)
    // Con la z definita nella nota (un numero complesso), nelle condizioni la z resta la variabile.
    expect(item(r`|z| \le 1`, 'region', ['z = 3 + i']).M(0, 0)).toBeGreaterThan(0)
  })

  it('una curva con il parametro t', () => {
    const arc = item(r`2e^{it}
t \in [0, \pi]`, 'parametric')
    expect(arc.t).toEqual([0, Math.PI])
    expect(arc.fx(Math.PI / 2)).toBeCloseTo(0, 9)
    expect(arc.fy(Math.PI / 2)).toBeCloseTo(2, 9)
  })

  it('arg z = π/4 è una semiretta: niente linea dove l\'argomento salta', () => {
    const ray = item(r`\arg z = \frac{\pi}{4}`, 'implicit')
    const vp = { x0: -3, x1: 3, y0: -3, y1: 3, width: 300, height: 300 }
    const ys = sampleImplicit(ray.F, vp).flatMap((l) => l.filter((_, k) => k % 2 === 1)).map((py) => vp.y1 - (py / vp.height) * (vp.y1 - vp.y0))
    expect(ys.length).toBeGreaterThan(0)
    expect(ys.every((y) => y > -0.05)).toBe(true)
    expect(Math.min(...sampleImplicit(ray.F, vp).flatMap((l) => l.filter((_, k) => k % 2 === 0)))).toBeGreaterThan(140)
  })

  it('gli assi sono Re e Im, con la i sulle tacche', () => {
    const spec = parseGraph('1 + 2i')
    const svg = staticGraphSvg(spec, 400, 300, light, { id: 'g' })
    expect(svg).toContain('>Re</text>')
    expect(svg).toContain('>Im</text>')
    expect(imaginaryLabel('1')).toBe('i')
    expect(imaginaryLabel('−1')).toBe('−i')
    expect(imaginaryLabel('2')).toBe('2i')
    const v = chooseWindow(spec, 400, 300)
    expect(v.x0).toBeLessThan(0)
    expect(v.y1).toBeGreaterThan(2)
    // Le stesse unità sui due assi.
    expect((v.x1 - v.x0) / 400).toBeCloseTo((v.y1 - v.y0) / 300, 9)
  })

  it('nel pannello: un numero, una radice, un\'equazione', () => {
    expect(formulaGraph('1 + i')?.items.map((i) => i.kind)).toEqual(['complex'])
    expect(formulaGraph(r`\sqrt[3]{8i}`)?.items.map((i) => i.kind)).toEqual(['complex'])
    expect(formulaGraph('|z - i| = 2')?.items.map((i) => i.kind)).toEqual(['implicit'])
    expect(formulaGraph('z = 1 + 2i')?.items.map((i) => i.kind)).toEqual(['complex'])
    expect(formulaGraph('z_1 z_2', ['z_1 = 1 + i', 'z_2 = 2 - i'])?.items.map((i) => i.kind)).toEqual(['complex'])
  })
})
