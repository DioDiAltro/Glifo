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

const data = r`x = (12.1, 11.8, 12.4, 12.0, 11.6, 12.3, 12.2, 11.9)`

describe('gli intervalli di confidenza', () => {
  it('della media: con la t (σ non nota) o con la z (σ nota), dai dati o dalle statistiche', () => {
    expect(text(data, r`\operatorname{ic}(x, 0.95) =`)).toBe('[11,8143; 12,2607] (95%: 12,0375 ± 0,2232, t(7) = 2,3646)')
    expect(text(r`\operatorname{ic}(\bar{x} = 12, s = 2, n = 25, 0.95) =`)).toBe('[11,1744; 12,8256] (95%: 12 ± 0,8256, t(24) = 2,0639)')
    expect(text(r`\operatorname{ic}(\bar{x} = 12, \sigma = 2, n = 25, 95\%) =`)).toBe('[11,216; 12,784] (95%: 12 ± 0,784, z = 1,96)')
    // Il livello si può scrivere anche come α.
    expect(text(r`\operatorname{ic}(\bar{x} = 12, \sigma = 2, n = 25, 0.05) =`)).toBe('[11,216; 12,784] (95%: 12 ± 0,784, z = 1,96)')
  })

  it('di una proporzione e della varianza', () => {
    expect(text(r`\operatorname{ic}(\hat{p} = 0.4, n = 100, 0.95) =`)).toBe('[0,303982; 0,496018] (95%: 0,4 ± 0,09602, z = 1,96)')
    expect(text(data, r`\operatorname{icvarianza}(x, 0.95) =`)).toBe('σ² ∈ [0,031147; 0,295141] (95%: s² = 0,07125, χ²(7))')
  })
})

describe("i test d'ipotesi", () => {
  it('sulla media, a una o due code, con la t o la z', () => {
    expect(text(r`\operatorname{test}(\bar{x} = 10.5, s = 2, n = 30, \mu > 10) =`)).toBe(
      't = 1,3693 (t(29)); p = 0,09071 ≥ α = 0,05: non si rifiuta H₀ (H₀: μ = 10, H₁: μ > 10; rifiuto per t > 1,6991)',
    )
    expect(text(r`\operatorname{test}(\bar{x} = 10.5, \sigma = 2, n = 30, \mu \ne 10, 0.05) =`)).toBe(
      'z = 1,3693 (N(0, 1)); p = 0,1709 ≥ α = 0,05: non si rifiuta H₀ (H₀: μ = 10, H₁: μ ≠ 10; rifiuto per z < −1,96 o z > 1,96)',
    )
    expect(text(data, r`\operatorname{test}(x, \mu = 12) =`)).toBe('t = 0,39736 (t(7)); p = 0,7029 ≥ α = 0,05: non si rifiuta H₀ (H₀: μ = 12, H₁: μ ≠ 12; rifiuto per t < −2,3646 o t > 2,3646)')
    expect(text(data, r`\operatorname{test}(x, \mu < 12.5, 0.01) =`)).toBe('t = −4,9008 (t(7)); p = 0,0008758 < α = 0,01: si rifiuta H₀ (H₀: μ = 12,5, H₁: μ < 12,5; rifiuto per t < −2,998)')
  })

  it('su una proporzione e sulla varianza', () => {
    expect(text(r`\operatorname{test}(\hat{p} = 0.55, n = 200, p > 0.5) =`)).toBe('z = 1,4142 (N(0, 1)); p = 0,07865 ≥ α = 0,05: non si rifiuta H₀ (H₀: p = 0,5, H₁: p > 0,5; rifiuto per z > 1,6449)')
    expect(text(r`\operatorname{test}(s^2 = 5, n = 20, \sigma^2 > 4) =`)).toBe('χ² = 23,75 (χ²(19)); p = 0,2059 ≥ α = 0,05: non si rifiuta H₀ (H₀: σ² = 4, H₁: σ² > 4; rifiuto per χ² > 30,144)')
  })

  it('due medie (Welch) e il χ² di adattamento e di indipendenza', () => {
    expect(text(r`x = (5.1, 4.9, 5.6, 5.8, 6.0)`, r`y = (4.2, 4.8, 4.5, 4.9, 4.4, 4.1)`, r`\operatorname{test}(x, y) =`)).toBe(
      't = 4,0572 (t(6,893), Welch); p = 0,004986 < α = 0,05: si rifiuta H₀ (H₀: μ₁ = μ₂, H₁: μ₁ ≠ μ₂; rifiuto per t < −2,3721 o t > 2,3721)',
    )
    expect(text(r`\operatorname{chiquadro}((18, 22, 20, 40), (0.25, 0.25, 0.25, 0.25)) =`)).toBe(
      'χ² = 12,32 (χ²(3)); p = 0,006364 < α = 0,05: si rifiuta H₀ (H₀: i dati seguono le frequenze attese; rifiuto per χ² > 7,8147)',
    )
    expect(text(r`M = \begin{pmatrix} 20 & 30 \\ 30 & 20 \end{pmatrix}`, r`\operatorname{chiquadro}(M) =`)).toBe(
      'χ² = 4 (χ²(1)); p = 0,0455 < α = 0,05: si rifiuta H₀ (H₀: le due variabili sono indipendenti; rifiuto per χ² > 3,8415)',
    )
  })

  it("senza l'ipotesi non c'è risultato", () => {
    expect(text(r`\operatorname{test}(\bar{x} = 10, s = 2, n = 30) =`)).toBeNull()
  })
})

describe('nei grafici', () => {
  const kinds = (items: GraphItem[]) => items.map((i) => (i.kind === 'area' ? `area ${i.from.toFixed(2)}..${i.to.toFixed(2)}` : i.kind === 'vertical' ? `vertical ${i.x.toFixed(3)}` : i.kind))

  it('la densità con la regione di rifiuto colorata e la statistica', () => {
    expect(kinds(parseGraph(r`\operatorname{test}(\bar{x} = 10.5, \sigma = 2, n = 30, \mu \ne 10)`).items)).toEqual(['function', 'area -3.82..-1.96', 'area 1.96..3.82', 'vertical 1.369'])
    const oneTail = parseGraph(r`\operatorname{test}(\bar{x} = 10.5, s = 2, n = 30, \mu > 10)`)
    expect(kinds(oneTail.items)).toEqual(['function', 'area 1.70..4.24', 'vertical 1.369'])
    // \bar{x} è la media: il piano è quello cartesiano, non quello di Gauss.
    expect(oneTail.gauss).toBeFalsy()
    expect(kinds(formulaGraph(r`\operatorname{chiquadro}((18, 22, 20, 40), (25, 25, 25, 25))`)?.items ?? [])).toEqual(['function', 'area 7.81..19.15', 'vertical 12.320'])
  })
})
