import { describe, expect, it } from 'vitest'
import { Sheet } from '../src/math/sheet'
import { add, key, mul, neg, num, pow, sym } from '../src/math/symbolic'
import { formulaGraph, parseGraph, type GraphItem } from '../src/graph/spec'

const r = String.raw

/** Il risultato dopo l'ultima formula (com'è scritto nell'editor), con le formule prima come definizioni. */
function text(...formulas: string[]): string | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last?.text ?? null
}

/** Le righe dello studio: { Dominio: '…', Segno: '…' }. */
function study(...formulas: string[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const row of (text(...formulas) ?? '').split('. ')) {
    const i = row.indexOf(': ')
    if (i > 0) out[row.slice(0, i)] = row.slice(i + 2)
  }
  return out
}

describe('lo studio di funzione', () => {
  it('una funzione razionale: dominio, simmetria, segno, limiti, asintoti, derivate, massimi e minimi', () => {
    const s = study(r`f(x) = \frac{x^2 + 1}{x}`, r`\operatorname{studio}(f) =`)
    expect(s.Dominio).toBe('x ≠ 0')
    expect(s.Simmetria).toBe('dispari')
    expect(s.Intersezioni).toBe('nessuno zero')
    expect(s.Segno).toBe('f(x) > 0 per x > 0; f(x) < 0 per x < 0')
    expect(s.Limiti).toBe('lim x→−∞ f(x) = −∞; lim x→0⁻ f(x) = −∞; lim x→0⁺ f(x) = +∞; lim x→+∞ f(x) = +∞')
    expect(s.Asintoti).toBe('x = 0 verticale; y = x (x → ±∞) obliquo')
    expect(s.Derivata).toBe("f'(x) = (x² − 1)/x²")
    expect(s.Crescenza).toBe('crescente per x < −1 ∨ x > 1; decrescente per −1 < x < 0 ∨ 0 < x < 1')
    expect(s['Massimi e minimi']).toBe('massimo (−1; −2); minimo (1; 2)')
    expect(s['Derivata seconda']).toBe("f''(x) = 2/x³")
    expect(s.Concavità).toBe('convessa per x > 0; concava per x < 0')
    expect(s.Flessi).toBe('nessuno')
  })

  it('con l\'esponenziale e il logaritmo: i punti esatti (e, e^{3/2})', () => {
    const a = study(r`\operatorname{studio}(x e^{-x}) =`)
    expect(a.Limiti).toBe('lim x→−∞ f(x) = −∞; lim x→+∞ f(x) = 0')
    expect(a.Asintoti).toBe('y = 0 (x → +∞) orizzontale')
    expect(a.Derivata).toBe("f'(x) = (1 − x)e^(−x)")
    expect(a['Massimi e minimi']).toBe('massimo (1; e^(−1))')
    expect(a.Flessi).toBe('(2; 2e^(−2))')
    const b = study(r`\operatorname{studio}(\frac{\ln x}{x}) =`)
    expect(b.Dominio).toBe('x > 0')
    expect(b.Asintoti).toBe('x = 0 verticale; y = 0 (x → +∞) orizzontale')
    expect(b['Massimi e minimi']).toBe('massimo (e; e^(−1))')
    expect(b.Flessi).toBe('(e^(3/2); (3e^(−3/2))/2)')
  })

  it('le radici: il dominio con gli estremi, gli asintoti obliqui, i minimi agli estremi', () => {
    const s = study(r`\operatorname{studio}(\sqrt{x^2 - 4}) =`)
    expect(s.Dominio).toBe('x ≤ −2 ∨ x ≥ 2')
    expect(s.Simmetria).toBe('pari')
    expect(s.Asintoti).toBe('y = −x (x → −∞) obliquo; y = x (x → +∞) obliquo')
    expect(s['Massimi e minimi']).toBe('minimo (−2; 0); minimo (2; 0)')
    expect(s['Derivata seconda']).toBe("f''(x) = −4/(x² − 4)^(3/2)")
  })

  it('i punti angolosi, le cuspidi e i flessi a tangente verticale', () => {
    expect(study(r`\operatorname{studio}(|x^2 - 1|) =`)['Massimi e minimi']).toBe('minimo (−1; 0) (punto angoloso); massimo (0; 1); minimo (1; 0) (punto angoloso)')
    // Un punto angoloso non è un flesso, anche se la concavità cambia.
    expect(study(r`\operatorname{studio}(|x^2 - 1|) =`).Flessi).toBe('nessuno')
    expect(study(r`\operatorname{studio}(\sqrt[3]{x}) =`).Flessi).toBe('(0; 0) (tangente verticale)')
    expect(study(r`\operatorname{studio}(\sqrt[3]{x^2}) =`)['Massimi e minimi']).toBe('minimo (0; 0) (cuspide)')
  })

  it('i flessi a tangente orizzontale', () => {
    expect(text(r`\operatorname{flessi}(x^3) =`)).toBe('(0; 0) (tangente orizzontale)')
    const s = study(r`f(x) = \frac{x^3}{x^2 - 1}`, r`\operatorname{studio}(f) =`)
    expect(s.Asintoti).toBe('x = −1 verticale; x = 1 verticale; y = x (x → ±∞) obliquo')
    expect(s['Massimi e minimi']).toBe('massimo (−√3; −(3√3)/2); minimo (√3; (3√3)/2)')
    expect(s.Flessi).toBe('(0; 0) (tangente orizzontale)')
    // A tangente obliqua niente nota.
    expect(text(r`\operatorname{flessi}(x^3 + x) =`)).toBe('(0; 0)')
  })

  it('le funzioni periodiche si studiano in un periodo', () => {
    const t = study(r`\operatorname{studio}(\tan x) =`)
    expect(t.Periodo).toBe('π (si studia in [0, π])')
    expect(t.Dominio).toBe('x ≠ π/2 + kπ')
    expect(t.Asintoti).toBe('x = π/2 + kπ verticale')
    const c = study(r`\operatorname{studio}(\cos(2x)) =`)
    expect(c['Massimi e minimi']).toBe('massimo (0; 1); minimo (π/2; −1)')
    expect(study(r`\operatorname{studio}(\sin x + \cos x) =`)['Massimi e minimi']).toBe('massimo (π/4; √2); minimo ((5π)/4; −√2)')
  })

  it('le parti da sole: dominio, asintoti, estremi, flessi', () => {
    expect(text(r`\operatorname{dominio}(\ln(4 - x^2)) =`)).toBe('−2 < x < 2')
    expect(text(r`\operatorname{asintoti}(\frac{2x^2 + 1}{x - 1}) =`)).toBe('x = 1 verticale, y = 2x + 2 (x → ±∞) obliquo')
    expect(text(r`\operatorname{estremi}(x^4 - 2x^2) =`)).toBe('minimo (−1; −1), massimo (0; 0), minimo (1; −1)')
    expect(text(r`\operatorname{flessi}(x^4 - 6x^2) =`)).toBe('(−1; −5), (1; −5)')
  })

  it('nel disegno con KaTeX «per» non si attacca al numero prima (f(x) > 0 per …), e il meno dopo è un segno', () => {
    const tex = new Sheet().add(r`\operatorname{studio}(x^2 - 1) =`)?.tex ?? ''
    expect(tex).toContain(r`> 0\ \text{per }`)
    // «per −1 < x < 1», non «per − 1» come in una sottrazione.
    expect(tex).toContain(r`< 0\ \text{per } {-}1 < x < 1`)
    expect(new Sheet().add(r`\operatorname{studio}(\frac{x^3}{x^2 - 1}) =`)?.tex).toContain(r`\text{decrescente per } {-}\sqrt{3} < x`)
  })

  it('le costanti e le rette', () => {
    const s = study(r`\operatorname{studio}(3) =`)
    expect(s.Crescenza).toBe('costante')
    expect(s.Concavità).toBe('né convessa né concava (è una retta)')
  })

  it('il dominio: dove la funzione non c\'è anche se i numeri danno un valore, e dove i numeri sono solo grandi', () => {
    // arctan(1/0) con i numeri fa π/2, ma 1/0 non esiste.
    expect(text(r`\operatorname{dominio}(\arctan \frac{1}{x}) =`)).toBe('x ≠ 0')
    // e^{1/x} vicino a 0 supera il numero più grande che si scrive, ma c'è.
    expect(text(r`\operatorname{dominio}(e^{1/x}) =`)).toBe('x ≠ 0')
    expect(study(r`\operatorname{studio}(e^{1/x}) =`).Asintoti).toBe('x = 0 verticale; y = 1 (x → ±∞) orizzontale')
  })
})

describe('le correzioni che servono allo studio', () => {
  it('un limite che supera il numero più grande che si scrive è infinito', () => {
    expect(text(r`\lim_{x \to -\infty} x e^{-x} =`)).toBe('−∞')
  })

  it('e^{a} e^{−a} = 1 anche con le lettere nell\'esponente', () => {
    const a = add(sym('x'), num(1))
    expect(key(mul(pow(sym('e'), a), pow(sym('e'), neg(a))))).toBe(key(num(1)))
  })

  it('le derivate più semplici: radici dispari, frazioni con le radici, funzioni razionali', () => {
    expect(text(r`\frac{d}{dx} \sqrt[3]{x^2} =`)).toBe('2/(3∛x)')
    expect(text(r`\frac{d^2}{dx^2} \sqrt{x^2 - 4} =`)).toBe('−4/(x² − 4)^(3/2)')
    expect(text(r`\frac{d}{dx} \arctan \frac{1}{x} =`)).toBe('−1/(x² + 1)')
    expect(text(r`\frac{d^2}{dx^2} \frac{x}{x^2 - 1} =`)).toBe('(2x(x² + 3))/(x² − 1)³')
  })
})

describe('nei grafici', () => {
  it('la funzione con gli asintoti tratteggiati e i punti notevoli', () => {
    const spec = parseGraph(r`\operatorname{studio}(\frac{x^2 + 1}{x})`)
    expect(spec.errors).toEqual([])
    expect(spec.items.map((i) => `${i.kind}${i.dashed ? ' --' : ''}`)).toEqual(['function', 'vertical --', 'function --', 'point', 'point'])
    const points = spec.items.filter((i): i is Extract<GraphItem, { kind: 'point' }> => i.kind === 'point')
    expect(points.map((p) => [p.name, p.x, p.y])).toEqual([
      ['M', -1, -2],
      ['m', 1, 2],
    ])
    // Nel pannello della formula.
    expect(formulaGraph(r`\operatorname{studio}(x^3 - 3x)`)).not.toBeNull()
  })

  it('con la funzione già nel blocco non la ridisegna', () => {
    const spec = parseGraph(['f(x) = x e^{-x}', r`\operatorname{studio}(f)`].join('\n'))
    expect(spec.items.filter((i) => i.kind === 'function' && !i.dashed)).toHaveLength(1)
    expect(spec.items.filter((i) => i.kind === 'point').map((p) => (p as Extract<GraphItem, { kind: 'point' }>).name)).toEqual(['M', 'F'])
  })
})
