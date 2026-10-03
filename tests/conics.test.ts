import { describe, expect, it } from 'vitest'
import { Sheet } from '../src/math/sheet'
import { formulaGraph, parseGraph, type GraphItem } from '../src/graph/spec'

const r = String.raw

/** Il risultato dell'ultima formula, con le formule prima come definizioni. */
function text(...formulas: string[]): string | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last?.text ?? null
}

const kinds = (items: GraphItem[]) => items.map((i) => (i.kind === 'point' ? `point ${i.name}` : i.dashed ? `${i.kind} tratteggiata` : i.kind))

describe('le coniche', () => {
  it("l'ellisse e la circonferenza: la forma canonica, il centro, i semiassi, i fuochi, l'eccentricità", () => {
    expect(text(r`\operatorname{conica}(x^2 + 4y^2 = 4) =`)).toBe('ellisse; x²/4 + y² = 1; C = (0, 0), a = 2, b = 1; F₁ = (−√3, 0), F₂ = (√3, 0); e = √3/2')
    expect(text(r`\operatorname{conica}(4x^2 + 9y^2 - 8x - 36y + 4 = 0) =`)).toBe('ellisse; (x − 1)²/9 + (y − 2)²/4 = 1; C = (1, 2), a = 3, b = 2; F₁ = (1 − √5, 2), F₂ = (1 + √5, 2); e = √5/3')
    expect(text(r`\operatorname{conica}(x^2 + y^2 - 2x + 4y = 4) =`)).toBe('circonferenza; (x − 1)² + (y + 2)² = 9; C = (1, −2), r = 3')
  })

  it("l'iperbole con gli asintoti, anche equilatera e con l'asse verticale", () => {
    expect(text(r`\operatorname{conica}(\frac{x^2}{9} - \frac{y^2}{16} = 1) =`)).toBe('iperbole; x²/9 − y²/16 = 1; C = (0, 0), e = 5/3; F₁ = (−5, 0), F₂ = (5, 0); asintoti: y = (4x)/3, y = −(4x)/3')
    expect(text(r`\operatorname{conica}(y^2 - x^2 = 4) =`)).toBe('iperbole equilatera; y²/4 − x²/4 = 1; C = (0, 0), e = √2; F₁ = (0, −2√2), F₂ = (0, 2√2); asintoti: y = x, y = −x')
  })

  it('la parabola: vertice, fuoco, direttrice, asse', () => {
    expect(text(r`\operatorname{conica}(y = x^2 - 4x + 3) =`)).toBe("parabola con l'asse verticale; y = x² − 4x + 3; forma canonica: (x − 2)² = y + 1; V = (2, −1), F = (2, −3/4); direttrice y = −5/4, asse x = 2")
    expect(text(r`\operatorname{conica}(x = y^2) =`)).toBe("parabola con l'asse orizzontale; x = y²; forma canonica: y² = x; V = (0, 0), F = (1/4, 0); direttrice x = −1/4, asse y = 0")
  })

  it('con il termine in xy: negli assi ruotati', () => {
    expect(text(r`\operatorname{conica}(x y = 1) =`)).toBe('iperbole; X²/2 − Y²/2 = 1; (gli assi ruotati di θ = π/4)')
    expect(text(r`\operatorname{conica}(x^2 + x y + y^2 = 3) =`)).toBe('ellisse; X²/2 + Y²/6 = 1; (gli assi ruotati di θ = π/4)')
    expect(text(r`\operatorname{conica}(x^2 - 2xy + y^2 - x - y = 0) =`)).toBe('parabola; Y² = (√2/2)X; (gli assi ruotati di θ = π/4)')
  })

  it('le degeneri e quelle senza punti', () => {
    expect(text(r`\operatorname{conica}(x^2 - y^2 = 0) =`)).toBe('conica degenere: due rette incidenti; y = x, y = −x')
    expect(text(r`\operatorname{conica}(x^2 + y^2 = 0) =`)).toBe('conica degenere: un punto solo; (0, 0)')
    expect(text(r`\operatorname{conica}(x^2 + y^2 = -1) =`)).toBe('ellisse immaginaria: nessun punto reale')
    // Di primo grado: non è una conica.
    expect(text(r`\operatorname{conica}(x + y = 1) =`)).toBeNull()
  })
})

describe('le quadriche', () => {
  it('il tipo e la forma canonica', () => {
    expect(text(r`\operatorname{quadrica}(x^2 + y^2 + z^2 = 4) =`)).toBe('sfera; x² + y² + z² = 4; C = (0, 0, 0), r = 2')
    expect(text(r`\operatorname{quadrica}(\frac{x^2}{4} + \frac{y^2}{9} + z^2 = 1) =`)).toBe('ellissoide; x²/4 + y²/9 + z² = 1')
    expect(text(r`\operatorname{quadrica}(x^2 + y^2 - z^2 = 1) =`)).toBe('iperboloide a una falda (iperbolico); x² + y² − z² = 1')
    expect(text(r`\operatorname{quadrica}(x^2 - y^2 - z^2 = 1) =`)).toBe('iperboloide a due falde (ellittico); x² − y² − z² = 1')
    expect(text(r`\operatorname{quadrica}(z = x^2 + y^2) =`)).toBe('paraboloide ellittico; z = x² + y²')
    expect(text(r`\operatorname{quadrica}(z = x^2 - y^2) =`)).toBe('paraboloide iperbolico (a sella); z = x² − y²')
    expect(text(r`\operatorname{quadrica}(x^2 + y^2 = z^2) =`)).toBe('cono; x² + y² − z² = 0')
    expect(text(r`\operatorname{quadrica}(x^2 + y^2 = 1) =`)).toBe('cilindro circolare; x² + y² = 1')
    expect(text(r`\operatorname{quadrica}(z = x^2) =`)).toBe('cilindro parabolico')
    // Con i termini misti: dagli autovalori.
    expect(text(r`\operatorname{quadrica}(x y + y z + x z = 1) =`)).toBe('iperboloide a due falde (ellittico)')
  })
})

describe('nei grafici', () => {
  it('la conica con il centro, i fuochi, il vertice, gli asintoti e la direttrice tratteggiati', () => {
    expect(kinds(parseGraph(r`\operatorname{conica}(4x^2 + 9y^2 - 8x - 36y + 4 = 0)`).items)).toEqual(['implicit', 'point C', 'point F_1', 'point F_2'])
    expect(kinds(parseGraph(r`\operatorname{conica}(\frac{x^2}{9} - \frac{y^2}{16} = 1)`).items)).toEqual(['implicit', 'point C', 'point F_1', 'point F_2', 'function tratteggiata', 'function tratteggiata'])
    expect(kinds(parseGraph(r`\operatorname{conica}(y = x^2 - 4x + 3)`).items)).toEqual(['implicit', 'point F', 'point V', 'function tratteggiata'])
    expect(kinds(formulaGraph(r`\operatorname{conica}(x^2 + 4y^2 = 4)`)?.items ?? [])).toEqual(['implicit', 'point C', 'point F_1', 'point F_2'])
  })

  it('la quadrica è la sua superficie', () => {
    const spec = parseGraph(r`\operatorname{quadrica}(x^2 + y^2 - z^2 = 1)`)
    expect(spec.dim).toBe(3)
    expect(kinds(spec.items)).toEqual(['implicit3'])
  })
})
