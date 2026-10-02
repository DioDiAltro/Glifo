import { describe, expect, it } from 'vitest'
import { toLatex } from '../src/math/latex'
import { parseMath } from '../src/math/parse'
import { Sheet } from '../src/math/sheet'
import { symbolicValue } from '../src/math/symbolic'
import { staticGraphSvg } from '../src/graph/picture'
import { formulaGraph, parseGraph, type GraphItem } from '../src/graph/spec'
import { PALETTES } from '../src/graph/svg'

const r = String.raw
const light = { ...PALETTES.light, surface: '#ffffff', halo: '#ffffff' }

/** Il risultato dopo l'ultima formula, con le formule prima come definizioni. */
function result(...formulas: string[]): { text: string; tex: string; rich?: boolean } | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last
}

const tex = (...formulas: string[]) => result(...formulas)?.tex ?? null
const text = (...formulas: string[]) => result(...formulas)?.text ?? null

const circle = r`\gamma(t) = (\cos t, \sin t), \; t \in [0, 2\pi]`
const sphere = r`S(u, v) = (\sin v \cos u, \sin v \sin u, \cos v), \; u \in [0, 2\pi], \; v \in [0, \pi]`

describe('le derivate: come si scrivono', () => {
  it('\\frac{d}{dx}, \\frac{\\partial^2 f}{\\partial x \\partial y}, \\partial_x f, la funzione in un punto', () => {
    const d = parseMath(r`\frac{d}{dx} x^2`)
    expect(d).toMatchObject({ k: 'diff', vars: ['x'], partial: false })
    expect(parseMath(r`\frac{\partial^2 f}{\partial x \partial y}`)).toMatchObject({ k: 'diff', vars: ['x', 'y'], partial: true, body: { k: 'name', name: 'f' } })
    expect(parseMath(r`\frac{d^2 f}{dx^2}`)).toMatchObject({ k: 'diff', vars: ['x', 'x'] })
    expect(parseMath(r`\partial_x \partial_y f`)).toMatchObject({ k: 'diff', vars: ['x', 'y'] })
    expect(parseMath(r`\frac{\partial f}{\partial x}(1, 2)`)).toMatchObject({ k: 'diff', body: { k: 'apply', name: 'f' } })
    // Una frazione qualsiasi resta una frazione.
    expect(parseMath(r`\frac{d}{x}`)).toMatchObject({ k: 'bin', op: '/' })
    expect(toLatex(parseMath(r`\frac{\partial^2 f}{\partial x^2}`))).toBe(r`\frac{\partial^{2} f}{\partial x^{2}}`)
    expect(toLatex(d)).toBe(r`\frac{d}{dx} x^{2}`)
  })

  it('\\nabla: gradiente, divergenza, rotore e laplaciano; anche con i nomi (grad, div, rot)', () => {
    expect(parseMath(r`\nabla f`)).toMatchObject({ k: 'fn', name: 'grad', nabla: true })
    expect(parseMath(r`\nabla \cdot F`)).toMatchObject({ k: 'fn', name: 'div' })
    expect(parseMath(r`\nabla \times F`)).toMatchObject({ k: 'fn', name: 'curl' })
    expect(parseMath(r`\nabla^2 f`)).toMatchObject({ k: 'fn', name: 'lap' })
    expect(parseMath(r`\operatorname{rot} F`)).toMatchObject({ k: 'fn', name: 'curl' })
    expect(parseMath(r`\operatorname{div} F`)).toMatchObject({ k: 'fn', name: 'div' })
    expect(toLatex(parseMath(r`\nabla \cdot F`))).toBe(r`\nabla \cdot F`)
    // \div resta la divisione.
    expect(parseMath(r`6 \div 3`)).toMatchObject({ k: 'bin', op: '/' })
  })

  it('gli integrali di linea e di superficie', () => {
    expect(parseMath(r`\oint_\gamma F \cdot dr`)).toMatchObject({ k: 'lint', curve: 'γ', closed: true, ds: false, body: { k: 'name', name: 'F' } })
    expect(parseMath(r`\int_C f \, ds`)).toMatchObject({ k: 'lint', curve: 'C', ds: true })
    expect(parseMath(r`\int_\gamma \vec{F} \cdot d\vec{r}`)).toMatchObject({ k: 'lint', ds: false })
    // Le forme differenziali, anche tra parentesi.
    const form = parseMath(r`\oint_\gamma (-y \, dx + x \, dy)`)
    expect(form).toMatchObject({ k: 'lint', form: true, body: { k: 'tuple' } })
    expect(toLatex(form)).toBe(r`\oint_{\gamma} \left(-y \, dx + x \, dy\right)`)
    expect(parseMath(r`\int_\gamma y \, dx - x \, dy`)).toMatchObject({ k: 'lint', form: true })
    expect(parseMath(r`\iint_S F \cdot d\mathbf{S}`)).toMatchObject({ k: 'sint', surface: 'S', dS: false })
    expect(parseMath(r`\iint_S F \cdot n \, dS`)).toMatchObject({ k: 'sint', dS: false, body: { k: 'name', name: 'F' } })
    expect(parseMath(r`\oiint_S 1 \, dS`)).toMatchObject({ k: 'sint', closed: true, dS: true })
    // Gli integrali doppi restano doppi.
    expect(parseMath(r`\iint_D x y \, dA`)).toMatchObject({ k: 'mint' })
  })
})

describe('le derivate scritte come formula', () => {
  it("f'(x), f''(x) e f'(2)", () => {
    expect(tex('f(x) = x^3', "f'(x) =")).toBe('3x^{2}')
    expect(result('f(x) = x^3', "f'(x) =")?.rich).toBe(true)
    expect(text('f(x) = x^3 + 2x^2 - 5', "f''(x) =")).toBe('6x + 4')
    expect(text('f(x) = x^3', "f'(2) =")).toBe('12')
    // Nei multipli di π i valori esatti: cos(π/3) = 1/2, cos(π/4) = √2/2.
    expect(text(r`f(x) = \sin x`, r`f'(\frac{\pi}{3}) =`)).toBe('1/2')
    expect(text(r`f(x) = \sin x`, r`f'(\frac{\pi}{4}) =`)).toBe('0,707106…')
    expect(text(r`f(x) = \cos x`, r`f'(\frac{3\pi}{4}) =`)).toBe('−0,707106…')
  })

  it('le regole: prodotto, quoziente (con un denominatore solo), catena, potenze', () => {
    expect(tex(r`\frac{d}{dx} \sin x \cos x =`)).toBe(r`\cos^{2} x - \sin^{2} x`)
    expect(tex(r`\frac{d}{dx} (x^2 + 1)^3 =`)).toBe(r`6x\left(x^{2} + 1\right)^{2}`)
    expect(tex(r`\frac{d}{dx} e^{-x^2} =`)).toBe('-2xe^{-x^{2}}')
    expect(tex(r`\frac{d}{dx} \ln(x^2 + 1) =`)).toBe(r`\frac{2x}{x^{2} + 1}`)
    expect(tex(r`\frac{d}{dx} \sqrt{x} =`)).toBe(r`\frac{1}{2\sqrt{x}}`)
    expect(tex(r`\frac{d}{dx} \frac{x}{x + 1} =`)).toBe(r`\frac{1}{\left(x + 1\right)^{2}}`)
    expect(tex(r`f(x) = \frac{x^2 - 1}{x + 2}`, "f'(x) =")).toBe(r`\frac{x^{2} + 4x + 1}{\left(x + 2\right)^{2}}`)
    expect(tex(r`\frac{d}{dx} \frac{x}{x^2 + 1} =`)).toBe(r`\frac{1 - x^{2}}{\left(x^{2} + 1\right)^{2}}`)
    expect(tex(r`f(x) = x e^{-x}`, "f'(x) =")).toBe(r`\left(1 - x\right)e^{-x}`)
    expect(tex(r`\frac{d}{dx} x^x =`)).toBe(r`x^{x}\left(\ln x + 1\right)`)
    expect(tex(r`\frac{d}{dx} \tan x =`)).toBe(r`\frac{1}{\cos^{2} x}`)
    expect(tex(r`\frac{d}{dx} \arctan x =`)).toBe(r`\frac{1}{x^{2} + 1}`)
    expect(tex(r`\frac{d^2}{dx^2} \sin x =`)).toBe(r`-\sin x`)
  })

  it('la funzione integrale, i decimali come li scrive chi prende appunti, niente risultato senza la funzione', () => {
    expect(tex(r`F(x) = \int_0^x e^{-t^2} \, dt`, "F'(x) =")).toBe('e^{-x^{2}}')
    expect(tex(r`f(x) = 0{,}3 x^2`, "f'(x) =")).toBe('0{,}6x')
    // y non è una funzione definita: non c'è un risultato (non 0).
    expect(result(r`\frac{dy}{dx} =`)).toBeNull()
  })

  it('una definizione con la derivata si usa dopo', () => {
    expect(text('f(x) = x^3', "g(x) = f'(x) + 1", 'g(2) =')).toBe('13')
    expect(text('f(x) = x^3', "a = f'(1)", 'a + 1 =')).toBe('4')
  })
})

describe('i conti con le lettere', () => {
  const none = { consts: new Map(), fns: new Map() }
  const value = (src: string) => toLatex(symbolicValue(parseMath(src), none))
  it('seno e coseno esatti nei multipli di π/6 e π/4', () => {
    expect(value(r`\sin \frac{\pi}{6}`)).toBe(r`\frac{1}{2}`)
    expect(value(r`\cos \frac{2\pi}{3}`)).toBe(r`-\frac{1}{2}`)
    expect(value(r`\sin \frac{\pi}{3}`)).toBe(r`\frac{\sqrt{3}}{2}`)
    expect(value(r`\cos \frac{\pi}{4}`)).toBe(r`\frac{\sqrt{2}}{2}`)
    expect(value(r`\sin \frac{5\pi}{4}`)).toBe(r`-\frac{\sqrt{2}}{2}`)
    expect(value(r`\cos \pi`)).toBe('-1')
  })

  it('le radici dei numeri semplificate, le potenze unite', () => {
    expect(value(r`\sqrt{8}`)).toBe(r`2\sqrt{2}`)
    expect(value(r`x^2 \cdot x^3`)).toBe('x^{5}')
    expect(value(r`\frac{2x}{2}`)).toBe('x')
    expect(value(r`x + x + y - y`)).toBe('2x')
  })
})

describe('le derivate parziali e gli operatori dei campi', () => {
  const f = r`f(x, y) = x^2 y + \sin(x y)`
  it('derivate parziali, anche miste e in un punto', () => {
    expect(tex(f, r`\frac{\partial f}{\partial x} =`)).toBe(r`2xy + y\cos\left(xy\right)`)
    expect(tex(f, r`\frac{\partial^2 f}{\partial x \partial y} =`)).toBe(r`2x + \cos\left(xy\right) - xy\sin\left(xy\right)`)
    expect(text('f(x, y) = x^2 y', r`\frac{\partial f}{\partial x}(1, 2) =`)).toBe('4')
    expect(text(r`\partial_x (x^2 y) =`)).toBe('2xy')
  })

  it('gradiente, divergenza, rotore (nel piano un numero), laplaciano', () => {
    expect(tex('f(x, y) = x^2 + y^2', r`\nabla f =`)).toBe(r`\left(2x, 2y\right)`)
    expect(text('f(x, y) = x^2 + y^2', r`\nabla f(1, 2) =`)).toBe('(2, 4)')
    expect(text('f(x, y, z) = x y z', r`\operatorname{grad} f =`)).toBe('(yz, xz, xy)')
    const F = 'F(x, y, z) = (x y, y z, z x)'
    expect(text(F, r`\nabla \cdot F =`)).toBe('x + y + z')
    expect(text(F, r`\nabla \times F =`)).toBe('(−y, −z, −x)')
    expect(text('F(x, y) = (-y, x)', r`\operatorname{rot} F =`)).toBe('2')
    expect(text('f(x, y) = x^2 y^3', r`\nabla^2 f =`)).toBe('6x²y + 2y³')
    // Un'espressione: le variabili sono x, y (e z).
    expect(tex(r`\nabla (x^2 + y^2) =`)).toBe(r`\left(2x, 2y\right)`)
  })

  it("l'hessiana e la jacobiana, anche in un punto (e il determinante)", () => {
    expect(tex('f(x, y) = x^2 y^3', r`\operatorname{Hess} f =`)).toBe(r`\begin{pmatrix} 2y^{3} & 6xy^{2} \\ 6xy^{2} & 6x^{2}y \end{pmatrix}`)
    expect(text('f(x, y) = x^2 y^3', r`\operatorname{Hess} f(1, 1) =`)).toBe('(2  6 ; 6  6)')
    expect(text('f(x, y) = x^2 y^3', r`\det \operatorname{Hess} f(1, 1) =`)).toBe('−24')
    expect(tex('F(x, y) = (x^2 y, x + y)', r`\operatorname{jac} F =`)).toBe(r`\begin{pmatrix} 2xy & x^{2} \\ 1 & 1 \end{pmatrix}`)
  })

  it('i campi definiti: in un punto, e definiti con il gradiente', () => {
    expect(text('F(x, y) = (-y, x)', 'F(1, 2) =')).toBe('(−2, 1)')
    expect(text('f(x, y) = x y', r`G(x, y) = \nabla f`, 'G(2, 3) =')).toBe('(3, 2)')
  })
})

describe('gli integrali di linea e di superficie', () => {
  it('il lavoro di un campo, anche scritto come forma, e la lunghezza di una curva', () => {
    expect(text(circle, 'F(x, y) = (-y, x)', r`\oint_\gamma F \cdot dr =`)).toBe('6,283185…')
    expect(text(circle, r`\oint_\gamma (-y \, dx + x \, dy) =`)).toBe('6,283185…')
    expect(text(circle, r`\int_\gamma 1 \, ds =`)).toBe('6,283185…')
    expect(text(r`\gamma(t) = (t, t^2), \; 0 \le t \le 1`, r`\int_\gamma x \, ds =`)).toBe('0,848361…')
    expect(text(r`\gamma(t) = (t, t^2), \; t \in [0, 1]`, 'F(x, y) = (y, -x)', r`\int_\gamma F \cdot dr =`)).toBe('−0,333333…')
    // Nello spazio: l'elica.
    expect(text(r`\gamma(t) = (\cos t, \sin t, t), \; t \in [0, 2\pi]`, r`\int_\gamma (x^2 + y^2 + z^2) \, ds =`)).toBe('125,817757…')
  })

  it('il gradiente: il lavoro dipende solo dagli estremi', () => {
    expect(text('f(x, y) = x^2 + y^2', r`\gamma(t) = (t, 2t), \; t \in [0, 1]`, r`\int_\gamma \nabla f \cdot dr =`)).toBe('5')
  })

  it("l'area di una superficie e il flusso (su una superficie chiusa verso fuori)", () => {
    expect(text(sphere, r`\iint_S 1 \, dS =`)).toBe('12,566370…')
    // Con questi parametri S_u × S_v va verso dentro; \oiint prende sempre la normale verso fuori.
    expect(text(sphere, 'F(x, y, z) = (x, y, z)', r`\iint_S F \cdot d\mathbf{S} =`)).toBe('−12,566370…')
    expect(text(sphere, 'F(x, y, z) = (x, y, z)', r`\oiint_S F \cdot d\mathbf{S} =`)).toBe('12,566370…')
  })

  it("senza l'intervallo del parametro, o con una curva che non c'è, niente risultato", () => {
    expect(result(r`\gamma(t) = (\cos t, \sin t)`, r`\int_\gamma 1 \, ds =`)).toBeNull()
    expect(result(r`\int_C 1 \, ds =`)).toBeNull()
  })

  it("l'intervallo resta nella definizione (per i grafici)", () => {
    const sheet = new Sheet()
    sheet.add(circle)
    expect(sheet.definitionsFor(['γ'])).toEqual([r`\gamma(t) = (\cos t, \sin t), \; t \in [0, 2\pi]`])
  })
})

const item = <K extends GraphItem['kind']>(items: GraphItem[], kind: K) => items.find((i) => i.kind === kind) as Extract<GraphItem, { kind: K }>

describe('i campi e le curve nei grafici', () => {
  it('un campo di vettori: una freccia in ogni punto, anche (-y, x) da solo', () => {
    const spec = parseGraph('F(x, y) = (-y, x)')
    expect(spec.dim).toBe(2)
    const field = item(spec.items, 'field')
    expect(field.F(1, 2)).toEqual([-2, 1])
    expect(parseGraph('(x, -y)').items[0].kind).toBe('field')
    const svg = staticGraphSvg(spec, 640, 400, light, { id: 'g' })
    const arrows = svg.match(/<path d="([^"]+)" stroke="[^"]+" stroke-width="1.6" data-item="0"\/>/)?.[1] ?? ''
    expect(arrows.split('M').length - 1).toBeGreaterThan(100)
  })

  it('il gradiente di f (del blocco o della nota) nel piano, non in 3D', () => {
    const block = parseGraph('f(x, y) = x^2 - y^2\n\\nabla f')
    expect(block.dim).toBe(2)
    expect(item(block.items, 'field').F(1, 1)).toEqual([2, -2])
    const note = parseGraph('\\nabla f', ['f(x, y) = x y'])
    expect(note.items[0]).toMatchObject({ kind: 'field', label: r`\nabla f = \left(y, x\right)` })
  })

  it('una curva con il nome ha il suo intervallo e la freccia del verso', () => {
    const spec = parseGraph(r`\gamma(t) = (\cos t, 2\sin t), \; t \in [0, \pi]`)
    const curve = item(spec.items, 'parametric')
    expect(curve.arrow).toBe(true)
    expect(curve.t[1]).toBeCloseTo(Math.PI, 9)
    expect(curve.fy(Math.PI / 2)).toBeCloseTo(2, 9)
    const svg = staticGraphSvg(spec, 640, 400, light, { id: 'g' })
    // La punta del verso è un triangolo pieno del colore della curva.
    expect(svg).toMatch(/<path d="M[\d. ]+L[\d. ]+L[\d. ]+Z" fill="#2a78d6"\/>/)
  })

  it("un integrale di linea: la curva e il campo, con il valore; se la curva ha una riga sua, non si ridisegna", () => {
    const own = parseGraph(['F(x, y) = (-y, x)', circle, r`\oint_\gamma F \cdot dr`].join('\n'))
    expect(own.errors).toEqual([])
    expect(own.items.map((i) => [i.kind, !!i.same])).toEqual([
      ['field', false],
      ['parametric', false],
      ['parametric', true],
    ])
    expect(own.items[2].label).toBe(r`\oint_{\gamma} F \cdot d\mathbf{r} = 6{,}283185\ldots`)
    // Il colore della curva della sua riga.
    expect(own.items[2].slot).toBe(own.items[1].slot)
    const note = parseGraph(r`\int_\gamma F \cdot dr`, ['F(x, y) = (y, -x)', r`\gamma(t) = (t, t^2), \; t \in [0, 1]`])
    expect(note.items.map((i) => i.kind)).toEqual(['parametric', 'field'])
    expect(note.items[0].label).toBe(r`\int_{\gamma} F \cdot d\mathbf{r} = -0{,}333333\ldots`)
  })

  it('nello spazio: un campo, una curva con il verso, il flusso attraverso una superficie', () => {
    expect(parseGraph('F(x, y, z) = (-y, x, 1)').items[0]).toMatchObject({ kind: 'field3' })
    const helix = parseGraph(r`\gamma(t) = (\cos t, \sin t, t / 4), \; t \in [0, 4\pi]`)
    expect(helix.dim).toBe(3)
    expect(helix.items[0]).toMatchObject({ kind: 'curve3', arrow: true })
    const flux = parseGraph([sphere, 'F(x, y, z) = (x, y, z)', r`\oiint_S F \cdot d\mathbf{S}`].join('\n'))
    expect(flux.dim).toBe(3)
    expect(flux.items.map((i) => i.kind)).toEqual(['patch', 'field3', 'patch'])
    expect(flux.items[2].label).toBe(r`\oiint_{S} F \cdot d\mathbf{S} = 12{,}566370\ldots`)
  })

  it('nel pannello: un campo, una curva, un integrale di linea', () => {
    expect(formulaGraph('F(x, y) = (-y, x)')?.items.map((i) => i.kind)).toEqual(['field'])
    expect(formulaGraph(circle)?.items.map((i) => i.kind)).toEqual(['parametric'])
    const defs = ['F(x, y) = (-y, x)', circle]
    expect(formulaGraph(r`\oint_\gamma F \cdot dr`, defs)?.items.map((i) => i.kind)).toEqual(['parametric', 'field'])
  })

  it('una derivata in un grafico si calcola con i numeri', () => {
    const spec = parseGraph(r`y = \frac{d}{dx} x^3`)
    const f = item(spec.items, 'function').f
    expect(f(2)).toBeCloseTo(12, 6)
  })
})
