import { describe, expect, it } from 'vitest'
import { Sheet } from '../src/math/sheet'
import { parseMath } from '../src/math/parse'
import { toLatex } from '../src/math/latex'
import { exactNear } from '../src/math/several'
import { toLatex as latexOf } from '../src/math/latex'
import { toNode } from '../src/math/symbolic'
import { formulaGraph, parseGraph, type GraphItem } from '../src/graph/spec'

const r = String.raw

/** Il risultato dell'ultima formula, con le formule prima come definizioni. */
function text(...formulas: string[]): string | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last?.text ?? null
}

const kinds = (items: GraphItem[]) => items.map((i) => (i.kind === 'point' ? `point ${i.name}` : i.kind))

describe('i limiti in più variabili', () => {
  it('si scrivono con le variabili tra parentesi, e si riscrivono uguali', () => {
    const node = parseMath(r`\lim_{(x, y) \to (0, 0)} \frac{x y}{x^2 + y^2}`)
    expect(node).toMatchObject({ k: 'lim', vars: ['x', 'y'], to: { k: 'tuple' } })
    expect(toLatex(node)).toBe(r`\lim_{\left(x, y\right) \to \left(0, 0\right)} \frac{xy}{x^{2} + y^{2}}`)
    expect(() => parseMath(r`\lim_{(x, y) \to 0} x y`)).toThrow('Il punto ha 2 coordinate')
  })

  it('non esiste: due cammini (rette o parabole) con valori diversi', () => {
    expect(text(r`\lim_{(x, y) \to (0, 0)} \frac{x y}{x^2 + y^2} =`)).toBe('non esiste (lungo y = 0 vale 0, lungo y = x vale 1/2)')
    expect(text(r`\lim_{(x, y) \to (0, 0)} \frac{x^2 - y^2}{x^2 + y^2} =`)).toBe('non esiste (lungo y = 0 vale 1, lungo x = 0 vale −1)')
    // Lungo le rette sempre 0, lungo la parabola no.
    expect(text(r`\lim_{(x, y) \to (0, 0)} \frac{x^2 y}{x^4 + y^2} =`)).toBe('non esiste (lungo y = 0 vale 0, lungo y = x² vale 1/2)')
    expect(text(r`\lim_{(x, y) \to (0, 0)} \frac{x y^2}{x^2 + y^4} =`)).toBe('non esiste (lungo y = 0 vale 0, lungo x = y² vale 1/2)')
  })

  it('esiste: il valore (tutto attorno al punto), anche infinito, anche in tre variabili', () => {
    expect(text(r`\lim_{(x, y) \to (0, 0)} \frac{x^2 y}{x^2 + y^2} =`)).toBe('0')
    expect(text(r`\lim_{(x, y) \to (0, 0)} \frac{\sin(x^2 + y^2)}{x^2 + y^2} =`)).toBe('1')
    expect(text(r`\lim_{(x, y) \to (1, 2)} x^2 + y =`)).toBe('3')
    expect(text(r`\lim_{(x, y) \to (0, 0)} \frac{1}{x^2 + y^2} =`)).toBe('+∞')
    expect(text(r`\lim_{(x, y, z) \to (0, 0, 0)} \frac{x y z}{x^2 + y^2 + z^2} =`)).toBe('0')
  })
})

describe('i punti critici', () => {
  it("con la natura dall'hessiana: minimi, massimi, selle", () => {
    expect(text(r`\operatorname{critici}(x^3 + y^3 - 3 x y) =`)).toBe('(0, 0) punto di sella; (1, 1) minimo relativo, f = −1')
    expect(text(r`f(x, y) = x^4 + y^4 - 4xy`, r`\nabla f = 0 \Rightarrow`)).toBe('(−1, −1) minimo relativo, f = −2; (0, 0) punto di sella; (1, 1) minimo relativo, f = −2')
    expect(text(r`f(x, y) = x^2 + y^2 - 2x`, r`\operatorname{critici}(f) =`)).toBe('(1, 0) minimo relativo, f = −1')
    expect(text(r`\operatorname{critici}(x e^{-x^2 - y^2}) =`)).toBe('(−√2/2, 0) minimo relativo, f = −(√2e^(−1/2))/2; (√2/2, 0) massimo relativo, f = (√2e^(−1/2))/2')
    expect(text(r`\operatorname{critici}(x^2 + y^2 + z^2 - 2x + 4z) =`)).toBe('(1, 0, −2) minimo relativo, f = −5')
    // \operatorname{estremi} con una funzione di due variabili: i suoi punti critici.
    expect(text(r`\operatorname{estremi}(x^2 y - y) =`)).toBe('(−1, 0) punto di sella; (1, 0) punto di sella')
  })

  it('i casi dubbi e quelli con infiniti punti critici', () => {
    expect(text(r`\operatorname{critici}(x^4 + y^4) =`)).toBe("(0, 0) da studiare (l'hessiana ha determinante 0)")
    expect(text(r`\operatorname{critici}((x - y)^2) =`)).toBe('infiniti punti critici')
    expect(text(r`\operatorname{critici}(x + y) =`)).toBe('nessun punto critico')
  })
})

describe('gli estremi vincolati e assoluti', () => {
  it('con i moltiplicatori di Lagrange, anche in tre variabili', () => {
    expect(text(r`\operatorname{lagrange}(x + y, x^2 + y^2 = 1) =`)).toBe('max √2 in (√2/2, √2/2); min −√2 in (−√2/2, −√2/2)')
    expect(text(r`\operatorname{lagrange}(x + y + z, x^2 + y^2 + z^2 = 3) =`)).toBe('max 3 in (1, 1, 1); min −3 in (−1, −1, −1)')
    expect(text(r`\max_{x^2 + y^2 = 1} (x + y) =`)).toBe('√2 in (√2/2, √2/2)')
    expect(text(r`\min_{x^2 + y^2 = 1} x y =`)).toBe('−1/2 in (−√2/2, √2/2) e (√2/2, −√2/2)')
    // Su un vincolo che non è limitato: solo i punti candidati.
    expect(text(r`\operatorname{lagrange}(x y, x + y = 2) =`)).toBe("candidati (l'insieme non è limitato): (1, 1), f = 1")
  })

  it('su un insieme chiuso e limitato: dentro, sul bordo e negli spigoli', () => {
    expect(text(r`\operatorname{estremi}(x^2 + y^2 - x, x^2 + y^2 \le 1) =`)).toBe('max 2 in (−1, 0); min −1/4 in (1/2, 0)')
    expect(text(r`\max_{x \ge 0, y \ge 0, x + y \le 1} (x y) =`)).toBe('1/4 in (1/2, 1/2)')
    expect(text(r`D = \{(x, y) : 0 \le x \le 1, 0 \le y \le 2\}`, r`\operatorname{estremi}(x^2 - x y + y, D) =`)).toBe('max 2 in (0, 2); min 0 in (0, 0)')
    // Il massimo si usa dopo, come un numero.
    expect(text(r`M = \max_{x^2 + y^2 = 1} (x + y) =`, r`M^2 =`)).toBe('2')
  })

  it('i numeri riconosciuti: frazioni, radici, multipli di π', () => {
    const shown = (v: number) => {
      const e = exactNear(v)
      return e && latexOf(toNode(e))
    }
    expect(shown(0.75)).toBe(r`\frac{3}{4}`)
    expect(shown(Math.SQRT1_2)).toBe(r`\frac{\sqrt{2}}{2}`)
    expect(shown(1 + Math.sqrt(3))).toBe(r`\sqrt{3} + 1`)
    expect(shown(Math.PI / 3)).toBe(r`\frac{\pi}{3}`)
    expect(shown(Math.E)).toBeNull()
  })
})

describe('il polinomio di Taylor in più variabili', () => {
  it('nel punto (a, b), dal grado più basso', () => {
    expect(text(r`\operatorname{taylor}(e^{x + y}, (0, 0), 2) =`)).toBe('1 + x + y + x²/2 + xy + y²/2')
    expect(text(r`f(x, y) = \sin(x) \cos(y)`, r`\operatorname{taylor}(f, (0, 0), 3) =`)).toBe('x − x³/6 − (xy²)/2')
    expect(text(r`\operatorname{taylor}(x^2 y + 3y, (1, 2), 2) =`)).toBe('8 + 4(x − 1) + 4(y − 2) + 2(x − 1)² + 2(x − 1)(y − 2)')
    expect(text(r`\operatorname{taylor}(\ln(1 + x + y), (0, 0), 2) =`)).toBe('x + y − x²/2 − xy − y²/2')
  })
})

describe('nei grafici', () => {
  it('i punti critici sulle curve di livello (M, m, S), anche nel pannello', () => {
    const spec = parseGraph(r`\operatorname{critici}(x^3 + y^3 - 3 x y)`)
    expect(spec.dim).toBe(2)
    expect(kinds(spec.items)).toEqual(['contour', 'point m', 'point S'])
    expect(kinds(formulaGraph(r`\operatorname{estremi}(x^2 y - y)`)?.items ?? [])).toEqual(['contour', 'point S_1', 'point S_2'])
    // Con una variabile resta lo studio di funzione.
    expect(kinds(formulaGraph(r`\operatorname{estremi}(x^3 - 3x)`)?.items ?? [])).toEqual(['function', 'point M', 'point m'])
  })

  it('gli estremi vincolati con la curva del vincolo, quelli assoluti con l\'insieme colorato', () => {
    expect(kinds(parseGraph(r`\operatorname{lagrange}(x + y, x^2 + y^2 = 1)`).items)).toEqual(['contour', 'implicit', 'point M', 'point m'])
    expect(kinds(parseGraph(r`\max_{x \ge 0, y \ge 0, x + y \le 1} (x y)`).items)).toEqual(['contour', 'region', 'point M'])
  })
})
