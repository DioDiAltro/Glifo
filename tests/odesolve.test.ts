import { describe, expect, it } from 'vitest'
import { Sheet } from '../src/math/sheet'
import { odeOf } from '../src/math/differential'
import { parseMath } from '../src/math/parse'
import { staticGraphSvg } from '../src/graph/picture'
import { formulaGraph, parseGraph, type GraphItem } from '../src/graph/spec'
import { PALETTES } from '../src/graph/svg'

const r = String.raw
const light = { ...PALETTES.light, surface: '#ffffff', halo: '#ffffff' }

/** Il risultato dell'ultima formula, con le formule prima come definizioni. */
function result(...formulas: string[]): { text: string; tex: string } | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last
}

const text = (...formulas: string[]) => result(...formulas)?.text ?? null

describe('le lineari a coefficienti costanti', () => {
  it("l'omogenea: radici reali distinte, doppie, complesse, irrazionali, di ordine più alto", () => {
    expect(text(r`y'' - 3y' + 2y = 0 \Rightarrow`)).toBe('y = c₁e^(x) + c₂e^(2x)')
    expect(text(r`y'' - 2y' + y = 0 \Rightarrow`)).toBe('y = c₁e^(x) + c₂xe^(x)')
    expect(text(r`y'' + y = 0 \Rightarrow`)).toBe('y = c₁ cos(x) + c₂ sin(x)')
    expect(result(r`y'' + 2y' + 5y = 0 \Rightarrow`)?.tex).toBe(r`y = e^{-x}\left(c_{1}\cos\left(2x\right) + c_{2}\sin\left(2x\right)\right)`)
    expect(result(r`y'' - 2y = 0 \Rightarrow`)?.tex).toBe(r`y = c_{1}e^{\sqrt{2}x} + c_{2}e^{-\sqrt{2}x}`)
    expect(text(r`y'' + y' = x \Rightarrow`)).toBe('y = c₁ + c₂e^(−x) + x²/2 − x')
    expect(text(r`y'''' - y = 0 \Rightarrow`)).toBe('y = c₁e^(x) + c₂e^(−x) + c₃ cos(x) + c₄ sin(x)')
    expect(text(r`y''' - y = 0 \Rightarrow`)).toBe('y = c₁e^(x) + e^(−x/2)(c₂ cos((√3x)/2) + c₃ sin((√3x)/2))')
  })

  it('la soluzione particolare con il metodo di somiglianza, anche in risonanza', () => {
    expect(text(r`y'' + y = x^2 \Rightarrow`)).toBe('y = c₁ cos(x) + c₂ sin(x) + x² − 2')
    expect(text(r`y'' - y' - 2y = 4x^2 \Rightarrow`)).toBe('y = c₁e^(−x) + c₂e^(2x) − 2x² + 2x − 3')
    expect(text(r`y'' - 3y' + 2y = e^{x} \Rightarrow`)).toBe('y = c₁e^(x) + c₂e^(2x) − xe^(x)')
    expect(text(r`y'' + y = \sin x \Rightarrow`)).toBe('y = c₁ cos(x) + c₂ sin(x) − (x cos(x))/2')
    expect(text(r`y'' + 2y' + y = e^{-x} \Rightarrow`)).toBe('y = c₁e^(−x) + c₂xe^(−x) + (x²e^(−x))/2')
    expect(text(r`y'' - y = x e^{x} \Rightarrow`)).toBe('y = c₁e^(x) + c₂e^(−x) + (x²/4 − x/4)e^(x)')
    expect(text(r`y'' + 2y' + 2y = e^{-x} \sin x \Rightarrow`)).toBe('y = e^(−x)(c₁ cos(x) + c₂ sin(x)) − (xe^(−x) cos(x))/2')
    // I prodotti di seni e coseni come somme: sin² x = (1 − cos 2x)/2.
    expect(text(r`y'' + y = \sin^2 x \Rightarrow`)).toBe('y = c₁ cos(x) + c₂ sin(x) + cos(2x)/6 + 1/2')
    expect(text(r`y'' - 4y = e^{2x + 1} \Rightarrow`)).toBe('y = c₁e^(2x) + c₂e^(−2x) + (xe^(2x + 1))/4')
  })

  it('la variazione delle costanti quando la somiglianza non va', () => {
    expect(text(r`y'' + y = \tan x \Rightarrow`)).toBe('y = c₁ cos(x) + c₂ sin(x) + (cos(x) ln|(sin(x) − 1)/(sin(x) + 1)|)/2')
  })

  it("con i parametri: l'oscillatore armonico, la caduta di un grave", () => {
    expect(result(r`y'' + \omega^2 y = 0 \Rightarrow`)?.tex).toBe(r`y = c_{1}\cos\left(\omega x\right) + c_{2}\sin\left(\omega x\right)`)
    expect(text(r`\ddot{x} + \omega^2 x = 0 \Rightarrow`)).toBe('x = c₁ cos(ωt) + c₂ sin(ωt)')
    expect(text(r`y'' - k^2 y = 0 \Rightarrow`)).toBe('y = c₁e^(kx) + c₂e^(−kx)')
    expect(result(r`m x'' + k x = 0 \Rightarrow`)?.tex).toBe(r`x = c_{1}\cos\left(\sqrt{\frac{k}{m}}t\right) + c_{2}\sin\left(\sqrt{\frac{k}{m}}t\right)`)
    expect(text(r`y'' = -g \Rightarrow`)).toBe('y = c₁ + c₂x − (gx²)/2')
    expect(text(r`y'' + \omega^2 y = 0, \; y(0) = 1, \; y'(0) = 0 \Rightarrow`)).toBe('y = cos(ωx)')
  })
})

describe('le altre equazioni del primo e del secondo ordine', () => {
  it('lineari del primo ordine con il fattore integrante', () => {
    expect(text(r`y' + y = x \Rightarrow`)).toBe('y = ce^(−x) + x − 1')
    expect(text(r`y' + \frac{y}{x} = x^2 \Rightarrow`)).toBe('y = c/x + x³/4')
    expect(text(r`y' + 2x y = x \Rightarrow`)).toBe('y = ce^(−x²) + 1/2')
    expect(text(r`y' + y \tan x = \cos x \Rightarrow`)).toBe('y = c cos(x) + x cos(x)')
    expect(text(r`y' - 2y = e^{2x} \Rightarrow`)).toBe('y = ce^(2x) + xe^(2x)')
  })

  it('a variabili separabili, con le soluzioni costanti che la formula non dà', () => {
    expect(text(r`y' = x y \Rightarrow`)).toBe('y = ce^(x²/2)')
    expect(text(r`y' = y(1 - y) \Rightarrow`)).toBe('y = 1/(ce^(−x) + 1) (e y = 0)')
    expect(text(r`y' = y^2 \Rightarrow`)).toBe('y = 1/(c − x) (e y = 0)')
    expect(text(r`y' = \frac{x}{y} \Rightarrow`)).toBe('y = ±√(x² + c)')
    expect(text(r`y' = 1 + y^2 \Rightarrow`)).toBe('y = tan(x + c)')
    expect(text(r`y' = e^{x - y} \Rightarrow`)).toBe('y = ln(e^(x) + c)')
    expect(text(r`y' = x y + x \Rightarrow`)).toBe('y = ce^(x²/2) − 1')
    expect(text(r`y' = \frac{2x}{y^2} \Rightarrow`)).toBe('y = ∛(3x² + c)')
    expect(text(r`y' = y \ln y \Rightarrow`)).toBe('y = e^(ce^(x))')
    expect(text(r`y' = \sqrt{y} \Rightarrow`)).toBe('y = (x/2 + c)²')
  })

  it('di Bernoulli, di Eulero, e senza la y (si abbassa l\'ordine)', () => {
    expect(text(r`y' + \frac{y}{x} = x y^2 \Rightarrow`)).toBe('y = 1/(cx − x²) (e y = 0)')
    expect(text(r`y' - y = x y^3 \Rightarrow`)).toBe('y = ±1/√(ce^(−2x) − x + 1/2) (e y = 0)')
    expect(text(r`x^2 y'' + x y' - y = 0 \Rightarrow`)).toBe('y = c₁x + c₂/x')
    expect(text(r`x^2 y'' - 2x y' + 2y = x^3 \Rightarrow`)).toBe('y = c₁x + c₂x² + x³/2')
    expect(text(r`x y'' + y' = 0 \Rightarrow`)).toBe('y = c₁ ln|x| + c₂')
  })

  it("le derivate scritte in ogni modo: dy/dx, il punto sopra, y'(x)", () => {
    expect(text(r`\frac{dy}{dx} = -2y \Rightarrow`)).toBe('y = ce^(−2x)')
    expect(text(r`\ddot{x} + x = 0 \Rightarrow`)).toBe('x = c₁ cos(t) + c₂ sin(t)')
    expect(text(r`y'(x) = 2 y(x) \Rightarrow`)).toBe('y = ce^(2x)')
    expect(text(r`y' = 0{,}5 y \Rightarrow`)).toBe('y = ce^(0,5x)')
    // Le costanti della nota valgono anche qui.
    expect(text(r`k = 2`, r`y' = k y \Rightarrow`)).toBe('y = ce^(2x)')
  })

  it('le equazioni che non si sanno risolvere con la formula non hanno risultato', () => {
    expect(text(r`y'' = y'^2 + y^3 \Rightarrow`)).toBeNull()
    expect(text(r`y' = x + y^2 \Rightarrow`)).toBeNull()
  })
})

describe('il problema di Cauchy e i problemi ai limiti', () => {
  it('le costanti dalle condizioni iniziali', () => {
    expect(text(r`y' = y, \; y(0) = 1 \Rightarrow`)).toBe('y = e^(x)')
    expect(text(r`y'' + y = 0, \; y(0) = 1, \; y'(0) = 0 \Rightarrow`)).toBe('y = cos(x)')
    expect(text(r`y'' - 3y' + 2y = 0, \; y(0) = 0, \; y'(0) = 1 \Rightarrow`)).toBe('y = e^(2x) − e^(x)')
    expect(text(r`y'' - 4y' + 4y = 0, \; y(0) = 1, \; y'(0) = 0 \Rightarrow`)).toBe('y = (1 − 2x)e^(2x)')
    expect(text(r`y'' + y = e^{x}, \; y(0) = 0, \; y'(0) = 0 \Rightarrow`)).toBe('y = e^(x)/2 − cos(x)/2 − sin(x)/2')
    expect(text(r`y' = y + e^{x}, \; y(0) = 2 \Rightarrow`)).toBe('y = (x + 2)e^(x)')
  })

  it('le non lineari: la costante da una condizione, il ramo giusto della radice, le soluzioni costanti', () => {
    expect(text(r`y' = y^2, \; y(0) = 1 \Rightarrow`)).toBe('y = 1/(1 − x)')
    expect(text(r`y' = y(1 - y), \; y(0) = \frac{1}{2} \Rightarrow`)).toBe('y = 1/(e^(−x) + 1)')
    expect(text(r`y' = \frac{x}{y}, \; y(0) = -2 \Rightarrow`)).toBe('y = −√(x² + 4)')
    expect(text(r`y' = y^2, \; y(0) = 0 \Rightarrow`)).toBe('y = 0')
  })

  it('ai limiti: una soluzione, nessuna o infinite', () => {
    expect(text(r`y'' + y = 0, \; y(0) = 0, \; y(\frac{\pi}{2}) = 1 \Rightarrow`)).toBe('y = sin(x)')
    expect(text(r`y'' + y = 0, \; y(0) = 0, \; y(\pi) = 1 \Rightarrow`)).toBe('nessuna soluzione')
    expect(text(r`y'' + y = 0, \; y(0) = 0, \; y(\pi) = 0 \Rightarrow`)).toBe('y = c sin(x) (infinite soluzioni)')
  })
})

describe('i sistemi', () => {
  it('lineari di due equazioni, anche con il termine noto e le condizioni', () => {
    expect(text(r`x' = y, \; y' = -x \Rightarrow`)).toBe('x = c₁ cos(t) + c₂ sin(t), y = −c₁ sin(t) + c₂ cos(t)')
    expect(text(r`\begin{cases} x' = x + 2y \\ y' = 2x + y \end{cases} \Rightarrow`)).toBe('x = c₁e^(−t) + c₂e^(3t), y = −c₁e^(−t) + c₂e^(3t)')
    expect(text(r`x' = x - y, \; y' = x + y \Rightarrow`)).toBe('x = e^(t)(c₁ cos(t) + c₂ sin(t)), y = e^(t)(c₁ sin(t) − c₂ cos(t))')
    expect(text(r`x' = -y + t, \; y' = x \Rightarrow`)).toBe('x = c₁ cos(t) + c₂ sin(t) + 1, y = c₁ sin(t) − c₂ cos(t) + t')
    expect(text(r`x' = y, \; y' = -x, \; x(0) = 1, \; y(0) = 0 \Rightarrow`)).toBe('x = cos(t), y = −sin(t)')
    expect(text(r`x' = x + y, \; y' = 4x + y, \; x(0) = 1, \; y(0) = 0 \Rightarrow`)).toBe('x = e^(−t)/2 + e^(3t)/2, y = e^(3t) − e^(−t)')
  })
})

describe('nei grafici', () => {
  const kinds = (items: GraphItem[]) => items.map((i) => i.kind)

  it('il ritratto di fase di un sistema: le direzioni, le traiettorie, i punti di equilibrio', () => {
    const spec = parseGraph(r`x' = y, \; y' = -\sin x, \; x(0) = 1, \; y(0) = 0`)
    expect(spec.errors).toEqual([])
    expect(spec.dim).toBe(2)
    const [item] = spec.items
    expect(item).toMatchObject({ kind: 'phase', starts: [[1, 0]] })
    if (item.kind !== 'phase') throw new Error()
    expect(item.F(0, 2)).toEqual([2, -0])
    const svg = staticGraphSvg(spec, 640, 400, light, { id: 'g' })
    // Il punto iniziale pieno, i punti di equilibrio nel riquadro, (0, 0) e (π, 0), vuoti.
    expect(svg.match(/<circle [^>]*r="4\.5"/g)?.length).toBe(2)
    expect(svg.match(/<circle [^>]*r="4"/g)?.length).toBe(1)
    // Anche scritto in \begin{cases}, e senza condizioni (le traiettorie le sceglie il disegno).
    expect(kinds(parseGraph(r`\begin{cases} x' = x + 2y \\ y' = 2x + y \end{cases}`).items)).toEqual(['phase'])
    expect(kinds(formulaGraph(r`x' = y, \; y' = -x`)?.items ?? [])).toEqual(['phase'])
  })

  it('con il tempo nelle equazioni o con una condizione sola, cosa manca', () => {
    expect(parseGraph(r`x' = y, \; y' = -x + t`).errors[0].message).toBe("Il ritratto di fase è dei sistemi autonomi: x' e y' senza t")
    expect(parseGraph(r`x' = y, \; y' = -x, \; x(0) = 1`).errors[0].message).toBe('Per ogni traiettoria servono tutte e due le condizioni, come x(0) = 1, \\; y(0) = 0')
  })

  it('dy/dx come y\', anche nei grafici (il campo di direzioni)', () => {
    expect(odeOf(parseMath(r`\frac{dy}{dx} = x - y`))).toMatchObject({ y: 'y', x: 'x', order: 1 })
    expect(odeOf(parseMath(r`\frac{dy}{dt} = -y`))).toMatchObject({ y: 'y', x: 't' })
    expect(kinds(parseGraph(r`\frac{dy}{dx} = x - y, \; y(0) = 1`).items)).toEqual(['slopes'])
    // Una funzione della nota resta la sua derivata.
    expect(odeOf(parseMath(r`y = \frac{df}{dx}`), (name) => name === 'f')).toBeNull()
  })
})
