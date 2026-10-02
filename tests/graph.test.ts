import { describe, expect, it } from 'vitest'
import { chooseWindow, sampleFunction, sampleImplicit, sampleParametric, tickLabel, ticks, type Viewport } from '../src/graph/plot'
import { formulaGraph, graphNames, parseGraph, typedSliderValue, widenSlider, type GraphItem } from '../src/graph/spec'
import { graphSvg, itemColors, PALETTES } from '../src/graph/svg'

const r = String.raw

function only<K extends GraphItem['kind']>(src: string, kind: K, defs: string[] = []): Extract<GraphItem, { kind: K }> {
  const spec = parseGraph(src, defs)
  expect(spec.errors).toEqual([])
  expect(spec.items).toHaveLength(1)
  expect(spec.items[0].kind).toBe(kind)
  return spec.items[0] as Extract<GraphItem, { kind: K }>
}

const VIEW: Viewport = { x0: -5, x1: 5, y0: -5, y1: 5, width: 500, height: 500 }

describe('il blocco ```grafico: una riga per ogni cosa da disegnare', () => {
  it('riconosce funzioni, rette verticali, curve, punti, curve con parametro e in coordinate polari', () => {
    expect(only('y = x^2', 'function').f(3)).toBe(9)
    expect(only('x^2 - 1', 'function').label).toBe('y = x^{2} - 1')
    expect(only('f(x) = \\frac{1}{x}', 'function').f(4)).toBe(0.25)
    expect(only('g(t) = 2t', 'function').f(3)).toBe(6)
    expect(only('x = 2', 'vertical').x).toBe(2)
    expect(only('x^2 + y^2 = 4', 'implicit').F(2, 0)).toBe(0)
    expect(only('P = (1, 2)', 'point')).toMatchObject({ x: 1, y: 2, name: 'P' })
    expect(only('A(3, -1)', 'point')).toMatchObject({ x: 3, y: -1, name: 'A' })
    expect(only('(0,5; 2)', 'point')).toMatchObject({ x: 0.5, y: 2, name: null })
    const circle = only('(\\cos t, \\sin t)', 'parametric')
    expect(circle.fx(0)).toBe(1)
    expect(circle.t).toEqual([0, 2 * Math.PI])
    const cardioid = only('r = 1 + \\cos\\theta', 'parametric')
    expect(cardioid.fx(0)).toBe(2)
  })

  it('le condizioni limitano il dominio', () => {
    const f = only('y = x^2, 0 \\le x \\le 2', 'function')
    expect(f.f(1)).toBe(1)
    expect(f.f(3)).toBeNaN()
    expect(only('y = x \\quad \\text{per } x > 0', 'function').f(-1)).toBeNaN()
    expect(only('y = x \\{x < 0\\}', 'function').f(1)).toBeNaN()
  })

  it('le definizioni valgono in tutto il blocco, anche scritte dopo; le funzioni definite si disegnano', () => {
    const spec = parseGraph('y = a x^2 + f(x)\na = 2\nf(x) = x + b\nb = 1')
    expect(spec.errors).toEqual([])
    expect(spec.items.map((i) => i.kind)).toEqual(['function', 'function'])
    expect((spec.items[0] as Extract<GraphItem, { kind: 'function' }>).f(1)).toBe(4)
  })

  it('usa le definizioni della nota, e quelle del blocco hanno la precedenza', () => {
    expect(only('y = a x', 'function', ['a = 3']).f(2)).toBe(6)
    expect(only('f', 'function', ['f(x) = x^3']).f(2)).toBe(8)
    const spec = parseGraph('a = 10\ny = a', ['a = 3'])
    expect((spec.items[0] as Extract<GraphItem, { kind: 'function' }>).f(0)).toBe(10)
    // g usa la f del blocco, anche se nella nota c'è un'altra f e g è scritta prima.
    const both = parseGraph('g(x) = f(x) + 1\nf(x) = x^2', ['f(x) = x'])
    expect(both.errors).toEqual([])
    expect((both.items.find((i) => i.line === 0) as Extract<GraphItem, { kind: 'function' }>).f(3)).toBe(10)
  })

  it('la parte da mostrare: x \\in [a, b] e a \\le y \\le b', () => {
    const spec = parseGraph('y = x\nx \\in [-1, 3]\n-2 \\le y \\le 2')
    expect(spec.x).toEqual([-1, 3])
    expect(spec.y).toEqual([-2, 2])
    expect(parseGraph('(\\cos t, \\sin t)\nt \\in [0, \\pi]').items[0]).toMatchObject({ t: [0, Math.PI] })
  })

  it('le funzioni a tratti si possono scrivere su più righe', () => {
    const f = only(r`f(x) = \begin{cases}` + '\n' + r`x^2 & x < 0 \\` + '\n' + r`x & x \ge 0` + '\n' + r`\end{cases}`, 'function')
    expect(f.f(-2)).toBe(4)
    expect(f.f(3)).toBe(3)
  })

  it('i commenti non contano; le righe sbagliate dicono perché, e le altre si disegnano lo stesso', () => {
    const spec = parseGraph('% la parabola\ny = x^2\ny = x^\n\ny = q x\nx > 0\nf(x) = f(x) + 1\ny = 3 < x')
    expect(spec.items).toHaveLength(1)
    expect(spec.errors.map((e) => [e.line, e.message])).toEqual([
      [2, 'Manca l\'esponente dopo ^'],
      [4, 'q non è definita'],
      [5, 'Una condizione da sola non si disegna: per la parte da mostrare scrivi x \\in [a, b]'],
      [6, 'f usa sé stessa (anche attraverso un\'altra definizione)'],
      [7, 'Le zone (con < e >) non si sanno ancora colorare: scrivi un\'uguaglianza'],
    ])
  })

  it('una costante senza x non si disegna, e lo dice', () => {
    expect(parseGraph('3').errors[0].message).toMatch(/Manca la x/)
    expect(parseGraph('x \\in [5, 1]').errors[0].message).toMatch(/dal più piccolo al più grande/)
  })

  it('sa quali nomi cercare tra le definizioni della nota', () => {
    expect([...graphNames('y = a x + f(x)\nb = 2\nP = (c, 1)')].sort()).toEqual(['P', 'a', 'b', 'c', 'f'])
  })

  it('sa se una formula della nota è una funzione da disegnare (per il pannello e il pulsante «Grafico»)', () => {
    expect(formulaGraph('y = x^2')).not.toBeNull()
    expect(formulaGraph('f(x) = \\sin x')).not.toBeNull()
    expect(formulaGraph('x^2 + y^2 = 1')).not.toBeNull()
    expect(formulaGraph('f(x) = a x', ['a = 2'])).not.toBeNull()
    expect(formulaGraph('f(x) = a x')).toBeNull()
    expect(formulaGraph('a = 2')).toBeNull()
    expect(formulaGraph('x = 3')).toBeNull()
    expect(formulaGraph('y = 3')).toBeNull()
    expect(formulaGraph('\\int_0^1 x \\, dx')).toBeNull()
  })
})

describe('gli slider: i numeri del grafico', () => {
  const fn = (spec: ReturnType<typeof parseGraph>, i = 0) => spec.items[i] as Extract<GraphItem, { kind: 'function' }>

  it('ogni numero scritto con le cifre che il grafico usa ha il suo slider, da −10 a 10', () => {
    const spec = parseGraph('y = a x^2 + b', ['a = 2', 'b = 2a', 'c = 5'])
    expect(spec.sliders).toEqual([{ name: 'a', value: 2, range: [-10, 10], ends: ['-10', '10'], step: 0.1, integer: false }])
    // Anche attraverso le funzioni, e quelli scritti nel blocco.
    expect(parseGraph('f(x)\nk = -\\frac{1}{2}', ['a = 3', 'f(x) = a x + k']).sliders.map((s) => [s.name, s.value])).toEqual([
      ['a', 3],
      ['k', -0.5],
    ])
    // Un numero che il grafico non usa non ha lo slider.
    expect(parseGraph('y = x\nc = 5').sliders).toEqual([])
    // Un numero grande ha uno slider più lungo.
    expect(parseGraph('y = v x', ['v = 50']).sliders[0]).toMatchObject({ range: [-100, 100], step: 1 })
  })

  it('il blocco dice da dove a dove va: a \\in [0, 5] o 0 \\le a \\le 5', () => {
    const spec = parseGraph('y = a x\na \\in [0, 2\\pi]', ['a = 2'])
    expect(spec.errors).toEqual([])
    expect(spec.sliders[0]).toMatchObject({ name: 'a', range: [0, 2 * Math.PI], ends: ['0', '2\\pi'], step: 0.01 })
    expect(parseGraph('y = a x\n0 \\le a \\le 5\na = 1').sliders[0]).toMatchObject({ range: [0, 5], value: 1 })
    expect(parseGraph('y = a x\na \\in [5, 0]\na = 1').errors[0].message).toMatch(/dal più piccolo al più grande: a \\in \[0, 5\]/)
    // Solo per i numeri scritti con le cifre.
    expect(parseGraph('y = b x\nb \\in [0, 1]', ['a = 1', 'b = 2a']).errors[0].message).toMatch(/b si calcola da altri numeri/)
    expect(parseGraph('f(x)\nf \\in [0, 1]', ['f(x) = x']).errors[0].message).toMatch(/f è una funzione/)
  })

  it('con i valori degli slider il grafico cambia, e quello che li usa segue', () => {
    const defs = ['a = 2', 'b = 2a', 'f(x) = a x^2']
    expect(fn(parseGraph('y = b + f(x)', defs, new Map([['a', 3]]))).f(1)).toBe(9)
    expect(fn(parseGraph('y = b + f(x)', defs)).f(1)).toBe(6)
    // Anche i numeri scritti nel blocco.
    expect(fn(parseGraph('k = 1\ny = k x', [], new Map([['k', -2]]))).f(3)).toBe(-6)
    // Lo slider resta quello scritto: il valore nuovo è solo per questo disegno.
    expect(parseGraph('y = a x', ['a = 2'], new Map([['a', 7]])).sliders[0]).toMatchObject({ value: 7, range: [-10, 10] })
  })

  it('i numeri che contano i termini di una somma vanno di 1', () => {
    const spec = parseGraph('T(x)', ['n = 3', 'T(x) = \\sum_{k=0}^{n} \\frac{x^k}{k!}'])
    expect(spec.sliders[0]).toMatchObject({ name: 'n', range: [0, 10], step: 1, integer: true })
    expect(fn(parseGraph('T(x)', ['n = 3', 'T(x) = \\sum_{k=0}^{n} \\frac{x^k}{k!}'], new Map([['n', 1]]))).f(2)).toBe(3)
  })

  it('il valore si può scrivere a mano: con la virgola, come frazione, con π; i contatori interi', () => {
    const real = { integer: false }
    expect(['1,5', '0.25', '−2', '1/3', '\\pi/2', '2pi', '\\sqrt{2}', '3,'].map((t) => typedSliderValue(t, real))).toEqual([
      1.5,
      0.25,
      -2,
      1 / 3,
      Math.PI / 2,
      2 * Math.PI,
      Math.SQRT2,
      3,
    ])
    // Non sono numeri: vuoto, lettere, 1/0, un nome.
    expect(['', '  ', 'abc', '1/0', 'a + 1', '-'].map((t) => typedSliderValue(t, real))).toEqual([null, null, null, null, null, null])
    expect(typedSliderValue('2,6', { integer: true })).toBe(3)
  })

  it('un valore scritto fuori dallo slider lo allarga, con gli estremi sul passo', () => {
    expect(widenSlider([-3, 3], 0.01, 1, false)).toEqual({ range: [-3, 3], step: 0.01 })
    expect(widenSlider([-3, 3], 0.01, 5, false)).toEqual({ range: [-3, 5], step: 0.01 })
    expect(widenSlider([-3, 3], 0.01, 3.07, false)).toEqual({ range: [-3, 3.07], step: 0.01 })
    // 0,07 / 0,01 con la virgola mobile fa 7,000000000000001: l'estremo resta 0,07, non 0,08.
    expect(widenSlider([-1, 0.05], 0.01, 0.07, false)).toEqual({ range: [-1, 0.07], step: 0.01 })
    expect(widenSlider([-0.05, 1], 0.01, -0.07, false)).toEqual({ range: [-0.07, 1], step: 0.01 })
    // L'altro estremo resta com'è scritto (2π), se il passo non cambia.
    expect(widenSlider([0, 2 * Math.PI], 0.01, -1, false)).toEqual({ range: [-1, 2 * Math.PI], step: 0.01 })
    // Molto più lungo: il passo cresce, e tutti e due gli estremi vanno sul passo nuovo.
    expect(widenSlider([-3, 3], 0.01, -7.123, false)).toEqual({ range: [-7.2, 3], step: 0.1 })
    expect(widenSlider([-3, 3], 0.01, 1000, false)).toEqual({ range: [-10, 1000], step: 10 })
    expect(widenSlider([0, 10], 1, 25, true)).toEqual({ range: [0, 25], step: 1 })
  })

  it('i colori restano quelli delle righe, anche quando una riga non si può disegnare', () => {
    const colors = (values?: Map<string, number>) =>
      parseGraph('y = b x\ny = x', ['a = 1', 'b = \\frac{1}{a}'], values).items.map((i) => [i.line, i.slot])
    expect(colors()).toEqual([
      [0, 0],
      [1, 1],
    ])
    // Con a = 0, b = 1/0 non c'è: la retta y = x resta del suo colore, e l'errore lo dice (senza proporre uno slider per b).
    expect(colors(new Map([['a', 0]]))).toEqual([[1, 1]])
    const moved = parseGraph('y = b x\ny = x', ['a = 1', 'b = \\frac{1}{a}'], new Map([['a', 0]]))
    expect(itemColors(moved.items, PALETTES.light)).toEqual([PALETTES.light.series[1]])
    const error = moved.errors[0]
    expect(error.message).toBe('b non ha un valore: controlla la sua definizione')
    expect(error.add).toBeUndefined()
  })

  it('un nome che manca: la riga da aggiungere al blocco per averlo con uno slider', () => {
    const add = (src: string, defs: string[] = []) => parseGraph(src, defs).errors.map((e) => e.add?.map((a) => a.line))
    expect(add('y = kx + 1')).toEqual([['k = 1']])
    expect(add('y = a x^2 + b x + c')).toEqual([['a = 1', 'b = 1', 'c = 1']])
    // k(x - 1) è un prodotto; g(x) una funzione, che uno slider non risolve.
    expect(add('y = k(x - 1)')).toEqual([['k = 1']])
    expect(add('y = g(x)')).toEqual([undefined])
    // Dentro le funzioni del blocco e della nota, e nel nome con l'indice.
    expect(add('f(x) = m x\nf(x)')).toEqual([['m = 1'], undefined])
    expect(add("y = f'(x_0)(x - x_0) + f(x_0)", ['f(x) = x^2'])).toEqual([['x_{0} = 1']])
    // Se 1 è fuori dall'intervallo scritto, si parte dall'inizio; la riga dell'intervallo ha lo stesso pulsante.
    expect(add('y = k x\nk \\in [5, 10]')).toEqual([['k = 5'], ['k = 5']])
    // Una parola sbagliata non diventa sette slider.
    expect(add('y = velocita x')).toEqual([undefined])
    // Con la riga aggiunta, il grafico c'è.
    const fixed = parseGraph('k = 1\ny = kx + 1')
    expect(fixed.errors).toEqual([])
    expect(fixed.sliders.map((s) => s.name)).toEqual(['k'])
  })
})

describe('il disegno delle curve', () => {
  it('1/x si stacca all\'asintoto, che è segnato', () => {
    const s = sampleFunction((x) => 1 / x, VIEW)
    expect(s.lines).toHaveLength(2)
    expect(s.poles).toHaveLength(1)
    expect(Math.abs(s.poles[0])).toBeLessThan(1e-6)
  })

  it('la parte intera fa i gradini, senza righe verticali e senza asintoti', () => {
    const s = sampleFunction(Math.floor, VIEW)
    // Dieci gradini (più, al bordo destro, il punto x = 5).
    expect(s.lines.length).toBeGreaterThanOrEqual(10)
    expect(s.poles).toEqual([])
    for (const line of s.lines) {
      const ys = line.filter((_, i) => i % 2 === 1)
      expect(Math.max(...ys) - Math.min(...ys)).toBeLessThan(1e-6)
    }
  })

  it('la radice comincia proprio dove comincia il dominio', () => {
    const s = sampleFunction(Math.sqrt, VIEW)
    expect(s.lines).toHaveLength(1)
    // Il primo punto è x = 0 (al centro, 250 px).
    expect(s.lines[0][0]).toBeCloseTo(250, 3)
  })

  it('una funzione ripida ma continua resta un pezzo solo', () => {
    expect(sampleFunction((x) => Math.atan(1000 * x), VIEW).lines).toHaveLength(1)
    expect(sampleFunction((x) => x * x * x, VIEW).lines).toHaveLength(1)
  })

  it('la circonferenza è una linea chiusa, con i punti sulla curva', () => {
    const lines = sampleImplicit((x, y) => x * x + y * y - 4, VIEW)
    expect(lines).toHaveLength(1)
    const line = lines[0]
    expect(line.slice(0, 2)).toEqual(line.slice(-2))
    for (let i = 0; i < line.length; i += 2) {
      const x = (line[i] / 500) * 10 - 5
      const y = 5 - (line[i + 1] / 500) * 10
      expect(Math.abs(Math.hypot(x, y) - 2)).toBeLessThan(0.02)
    }
  })

  it('una curva implicita con un asintoto non lo attraversa con una riga', () => {
    // y = 1/x scritta come y - 1/x = 0: due rami, niente segmento verticale in x = 0.
    const lines = sampleImplicit((x, y) => y - 1 / x, VIEW)
    expect(lines).toHaveLength(2)
    for (const line of lines) {
      const xs = line.filter((_, i) => i % 2 === 0)
      expect(Math.min(...xs) > 251 || Math.max(...xs) < 249).toBe(true)
    }
  })

  it('le curve con parametro seguono la forma, anche dove corrono', () => {
    const lines = sampleParametric(Math.cos, Math.sin, [0, 2 * Math.PI], VIEW)
    expect(lines).toHaveLength(1)
    expect(lines[0].length).toBeGreaterThan(400)
  })
})

describe('la parte da mostrare, scelta da Glifo', () => {
  const window = (src: string, w = 600, h = 375) => chooseWindow(parseGraph(src), w, h)

  it('mette dentro l\'origine e quello che succede alla funzione', () => {
    const v = window('y = x^2 - 4')
    expect(v.x0).toBeLessThan(-2)
    expect(v.x1).toBeGreaterThan(2)
    expect(v.y0).toBeLessThan(-4)
    const far = window('y = (x - 10)^2')
    expect(far.x0).toBeLessThanOrEqual(0)
    expect(far.x1).toBeGreaterThan(10)
  })

  it('seni e coseni: due giri per parte', () => {
    const v = window('y = \\sin x')
    expect(v.x0).toBeCloseTo(-2 * Math.PI - 0.4, 6)
    expect(v.x1).toBeCloseTo(2 * Math.PI + 0.4, 6)
    expect(v.y0).toBeLessThan(-1)
    expect(v.y1).toBeGreaterThan(1)
  })

  it('le circonferenze restano rotonde: stesse unità sui due assi', () => {
    const v = window('x^2 + y^2 = 9', 600, 300)
    expect((v.x1 - v.x0) / 600).toBeCloseTo((v.y1 - v.y0) / 300, 6)
    expect(v.y0).toBeLessThan(-3)
    expect(v.y1).toBeGreaterThan(3)
  })

  it('vicino agli asintoti non insegue i valori infiniti', () => {
    const v = window('y = \\tan x')
    expect(v.y1 - v.y0).toBeLessThan(15)
  })

  it('una funzione piccola si vede lo stesso (la densità della normale)', () => {
    const v = window('y = \\frac{1}{\\sqrt{2\\pi}} e^{-\\frac{x^2}{2}}')
    expect(v.y1).toBeLessThan(1)
    expect(v.y0).toBeLessThanOrEqual(0)
  })

  it('rispetta quella scritta nel blocco', () => {
    expect(window('y = x\nx \\in [1, 2]\ny \\in [0, 5]')).toMatchObject({ x0: 1, x1: 2, y0: 0, y1: 5 })
  })
})

describe('le tacche sugli assi', () => {
  it('scrive i numeri all\'italiana', () => {
    expect(tickLabel(0.5, 0.5)).toBe('0,5')
    expect(tickLabel(-2, 1)).toBe('−2')
    expect(tickLabel(200000, 100000)).toBe('2·10⁵')
    expect(tickLabel(0.0002, 0.0001)).toBe('2·10⁻⁴')
  })

  it('con i seni le tacche sono multipli di π', () => {
    const t = ticks(-7, 7, 900, true)
    expect(t.major.map((m) => m.label)).toEqual(['−2π', '−3π/2', '−π', '−π/2', '0', 'π/2', 'π', '3π/2', '2π'])
  })

  it('passi di 1, 2 o 5', () => {
    expect(ticks(-4.2, 4.2, 300).major.map((m) => m.value)).toEqual([-4, -2, 0, 2, 4])
    expect(ticks(0, 1, 600).major.map((m) => m.label)).toContain('0,5')
  })
})

describe('il disegno in SVG', () => {
  it('ha assi, numeri, curve e punti, e i testi non diventano codice', () => {
    const spec = parseGraph('y = x^2\nP_1 = (1, 1)')
    const svg = graphSvg(spec, chooseWindow(spec, 600, 375), PALETTES.light, { id: 'g', title: 'Grafico di <y>' })
    expect(svg.startsWith('<svg')).toBe(true)
    expect(svg).toContain('aria-label="Grafico di &lt;y&gt;"')
    expect(svg).toContain('stroke="#2a78d6"')
    expect(svg).toContain('<circle')
    expect(svg).toContain('P₁')
    expect(svg).toContain('>x</text>')
    expect(svg).toContain('>O</text>')
    expect(svg).toContain('clip-path="url(#g-clip)"')
  })
})
