import { describe, expect, it } from 'vitest'
import { Sheet } from '../src/math/sheet'
import { formulaGraph, parseGraph, type GraphItem } from '../src/graph/spec'

const r = String.raw

/** Il risultato dell'ultima formula, con le formule prima come definizioni. */
function result(...formulas: string[]) {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last
}

const text = (...formulas: string[]) => result(...formulas)?.text ?? null
/** La conclusione, senza i passi (che nel testo vengono dopo). */
const verdict = (...formulas: string[]) => text(...formulas)?.split(' (passi:')[0] ?? null

const kinds = (items: GraphItem[]) => items.map((i) => (i.kind === 'point' ? `point ${i.name ?? ''}`.trim() : i.dashed ? `${i.kind} tratteggiata` : i.kind))

describe('gli zeri di una funzione', () => {
  it('bisezione, con la tabella dei passi', () => {
    expect(verdict(r`\operatorname{bisezione}(x^3 - x - 2, [1, 2]) =`)).toBe('x ≈ 1,521380424 (20 passi, (b − a)/2 < 10⁻⁶)')
    expect(result(r`\operatorname{bisezione}(x^3 - x - 2, [1, 2]) =`)?.tex).toContain(r`\begin{array}{c|cccc} k & a_k & b_k & c_k & f(c_k) \\ \hline 1 & 1 & 2 & 1{,}5 & -0{,}125`)
    // Con la tolleranza scritta.
    expect(verdict(r`\operatorname{bisezione}(x^2 - 2, 0, 2, 10^{-3}) =`)).toBe('x ≈ 1,415039063 (11 passi, (b − a)/2 < 0,001)')
    // Se f(a) e f(b) hanno lo stesso segno non si fa.
    expect(text(r`\operatorname{bisezione}(x^2 + 1, [0, 1]) =`)).toBeNull()
  })

  it('Newton (anche con un\'equazione o una funzione della nota), secanti, punto fisso', () => {
    expect(verdict(r`\operatorname{newton}(x^3 - x - 2, 1.5) =`)).toBe('x ≈ 1,5213797068 (3 passi)')
    expect(verdict(r`\operatorname{newton}(x^2 = 2, 1) =`)).toBe('x ≈ 1,41421356237 (5 passi)')
    expect(verdict(r`f(x) = e^{-x} - x`, r`\operatorname{newton}(f, 0) =`)).toBe('x ≈ 0,56714329041 (4 passi)')
    expect(verdict(r`\operatorname{secanti}(\cos x - x, 0, 1) =`)).toBe('x ≈ 0,739085133215')
    expect(verdict(r`\operatorname{puntofisso}(\cos x, 1) =`)).toBe("x* ≈ 0,739085133245 (|g'(x*)| ≈ 0,6736 < 1)")
  })
})

describe('interpolazione e minimi quadrati', () => {
  it('il polinomio per i punti, anche da due vettori', () => {
    expect(text(r`\operatorname{interpola}((0, 1), (1, 3), (2, 2)) =`)).toBe('p(x) = −(3/2)x² + (7/2)x + 1 (grado ≤ 2)')
    expect(text(r`x = (0, 1, 2, 3)`, r`y = (1, 2, 0, 4)`, r`\operatorname{interpola}(x, y) =`)).toBe('p(x) = (3/2)x³ − 6x² + (11/2)x + 1 (grado ≤ 3)')
  })

  it('la retta e il polinomio dei minimi quadrati, con la somma dei quadrati dei residui', () => {
    expect(text(r`\operatorname{minimiquadrati}((0, 1), (1, 3), (2, 2), (3, 5)) =`)).toBe('p(x) = (11/10)x + 11/10 (Σ r² = 2,7)')
    expect(text(r`\operatorname{minimiquadrati}((0, 1), (1, 3), (2, 2), (3, 5), 2) =`)).toBe('p(x) = (1/4)x² + (7/20)x + 27/20 (Σ r² = 2,45)')
  })
})

describe('le formule di quadratura', () => {
  it("trapezi, Simpson e punto medio, con l'errore", () => {
    expect(text(r`\operatorname{trapezi}(e^{x^2}, [0, 1], 4) =`)).toBe('≈ 1,490678862 (trapezi, n = 4; errore ≈ 0,028)')
    expect(text(r`\operatorname{simpson}(e^{x^2}, [0, 1], 4) =`)).toBe('≈ 1,46371076 (Simpson, n = 4; errore ≈ 0,00106)')
    expect(text(r`\operatorname{rettangoli}(x^2, [0, 1], 10) =`)).toBe('≈ 0,3325 (punto medio, n = 10; errore ≈ 0,000833)')
    // Simpson vuole un numero pari di sottointervalli.
    expect(text(r`\operatorname{simpson}(x^2, [0, 1], 3) =`)).toBeNull()
  })
})

describe('le matrici', () => {
  const A = r`A = \begin{pmatrix} 2 & 1 & 1 \\ 4 & 3 & 3 \\ 8 & 7 & 9 \end{pmatrix}`

  it('LU (con il pivot se serve) e Cholesky', () => {
    expect(text(A, r`\operatorname{lu}(A) =`)).toBe('L = (1  0  0 ; 2  1  0 ; 4  3  1), U = (2  1  1 ; 0  1  1 ; 0  0  2)')
    expect(text(r`B = \begin{pmatrix} 0 & 1 \\ 1 & 1 \end{pmatrix}`, r`\operatorname{lu}(B) =`)).toBe('(PA = LU) P = (0  1 ; 1  0), L = (1  0 ; 0  1), U = (1  1 ; 0  1)')
    expect(text(r`C = \begin{pmatrix} 4 & 2 \\ 2 & 3 \end{pmatrix}`, r`\operatorname{cholesky}(C) =`)).toBe('L = (2  0 ; 1  1,41421) (A = L Lᵀ)')
  })

  it('le norme e il numero di condizionamento', () => {
    const M = r`M = \begin{pmatrix} 1 & -2 \\ 3 & 4 \end{pmatrix}`
    expect(text(M, r`\operatorname{norma}(M, 1) =`)).toBe('6')
    expect(text(M, r`\operatorname{norma}(M, \infty) =`)).toBe('7')
    expect(text(M, r`\operatorname{norma}(M) =`)).toBe('≈ 5,116672736')
    expect(text(r`v = (3, -4)`, r`\operatorname{norma}(v) =`)).toBe('5')
    const N = r`N = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}`
    expect(text(N, r`\operatorname{cond}(N) =`)).toBe('K₂(A) ≈ 14,933034')
    expect(text(N, r`\operatorname{cond}(N, \infty) =`)).toBe('K∞(A) ≈ 21')
  })

  it('Jacobi e Gauss–Seidel, con il raggio spettrale', () => {
    const sys = [r`A = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}`, r`b = (1, 2)`]
    expect(verdict(...sys, r`\operatorname{jacobi}(A, b) =`)).toBe('ρ(B) ≈ 0,4082: converge (a diagonale dominante), x ≈ (0,1; 0,6)')
    expect(verdict(...sys, r`\operatorname{gaussseidel}(A, b) =`)).toBe('ρ(B) ≈ 0,1667: converge (a diagonale dominante), x ≈ (0,1; 0,6)')
    expect(verdict(r`A = \begin{pmatrix} 1 & 3 \\ 2 & 1 \end{pmatrix}`, r`b = (1, 2)`, r`\operatorname{jacobi}(A, b, 5) =`)).toBe('ρ(B) ≈ 2,449: non converge (ρ(B) ≥ 1)')
  })
})

describe('le equazioni differenziali', () => {
  it("Eulero, Heun e Runge–Kutta, con l'errore", () => {
    expect(verdict(r`\operatorname{eulero}(y' = x + y, y(0) = 1, 0.1, 5) =`)).toBe('y(0,5) ≈ 1,72102 (Eulero; errore ≈ 0,0764)')
    expect(verdict(r`\operatorname{rk4}(y' = x + y, y(0) = 1, 0.1, 5) =`)).toBe('y(0,5) ≈ 1,797441277 (Runge–Kutta 4; errore ≈ 1,26·10⁻⁶)')
    expect(verdict(r`\operatorname{heun}(y' = -2y, y(0) = 1, 0.1, 10) =`)).toBe('y(1) ≈ 0,1374480313 (Heun; errore ≈ 0,00211)')
  })
})

describe('nei grafici', () => {
  it('lo zero sulla curva, il punto fisso, i dati con il polinomio, i passi di Eulero', () => {
    expect(kinds(parseGraph(r`\operatorname{newton}(x^3 - x - 2, 1.5)`).items)).toEqual(['function', 'point x^*'])
    expect(kinds(parseGraph(r`\operatorname{puntofisso}(\cos x, 1)`).items)).toEqual(['function', 'function tratteggiata', 'point x^*'])
    expect(kinds(parseGraph(r`\operatorname{interpola}((0, 1), (1, 3), (2, 2))`).items)).toEqual(['function', 'point', 'point', 'point'])
    const euler = parseGraph(r`\operatorname{eulero}(y' = x + y, y(0) = 1, 0.1, 2)`).items
    expect(kinds(euler)).toEqual(['function', 'point', 'point', 'point'])
    expect(kinds(formulaGraph(r`\operatorname{bisezione}(x^2 - 2, [0, 2])`)?.items ?? [])).toEqual(['function', 'point x^*'])
  })
})
