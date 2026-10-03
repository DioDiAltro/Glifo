import { describe, expect, it } from 'vitest'
import { Sheet } from '../src/math/sheet'
import { polyDeterminant } from '../src/math/linsys'
import { Rational } from '../src/math/exact'

const r = String.raw

/** Il risultato dell'ultima formula, con le formule prima come definizioni. */
function text(...formulas: string[]): string | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last?.text ?? null
}

describe('A x = b (Rouché–Capelli)', () => {
  it('una soluzione, infinite con i parametri, nessuna', () => {
    const A = r`A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}`
    expect(text(A, r`b = (5, 6)`, r`A x = b \Rightarrow`)).toBe('x = (−4, 9/2)')
    expect(text(r`A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \end{pmatrix}`, r`b = (1, 2)`, r`A x = b \Rightarrow`)).toBe('x = (1, 0, 0) + t(−2, 1, 0) + s(−3, 0, 1) (∞² soluzioni, rango 1)')
    expect(text(r`A = \begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}`, r`b = (1, 3)`, r`A x = b \Rightarrow`)).toBe('nessuna soluzione (rango A = 1, rango (A|b) = 2)')
    expect(text(r`A = \begin{pmatrix} 1 & 1 & 1 \\ 1 & -1 & 0 \end{pmatrix}`, r`A x = 0 \Rightarrow`)).toBe('x = t(−1, −1, 2) (∞¹ soluzioni, rango 2)')
  })
})

describe('i sistemi con un parametro', () => {
  it('la discussione al variare di k: il caso generale e i valori dove il rango cambia', () => {
    expect(text(r`\begin{cases} x + k y = 1 \\ k x + y = 1 \end{cases} \Rightarrow`)).toBe(
      'k ≠ −1, k ≠ 1: x = 1/(k + 1), y = 1/(k + 1); k = −1: nessuna soluzione (impossibile); k = 1: x = 1 − y (y qualsiasi: infinite soluzioni)',
    )
    expect(text(r`\begin{cases} x + y + z = 1 \\ x + k y + z = 1 \\ x + y + k z = 1 \end{cases} \Rightarrow`)).toBe(
      'k ≠ 1: x = 1, y = 0, z = 0; k = 1: x = 1 − y − z (y, z qualsiasi: infinite soluzioni)',
    )
    expect(text(r`k x = 1 \Rightarrow`)).toBe('k ≠ 0: x = 1/k; k = 0: nessuna soluzione (impossibile)')
  })

  it('il denominatore senza segni strani: (a + 1)/2, non −(−a − 1)/2', () => {
    expect(text(r`x + y = a, x - y = 1 \Rightarrow`)).toBe('per ogni a: x = a/2 + 1/2, y = a/2 − 1/2')
  })

  it('con la matrice: A x = b con un parametro, il rango e il determinante', () => {
    expect(text(r`A = \begin{pmatrix} 1 & k \\ k & 4 \end{pmatrix}`, r`A x = (1, 2) \Rightarrow`)).toBe(
      'k ≠ −2, k ≠ 2: x_1 = 2/(k + 2), x_2 = 1/(k + 2); k = −2: nessuna soluzione (impossibile); k = 2: x_1 = 1 − 2x_2 (x_2 qualsiasi: infinite soluzioni)',
    )
    expect(text(r`A = \begin{pmatrix} 1 & k \\ 2 & 4 \end{pmatrix}`, r`\operatorname{rank}(A) =`)).toBe('2 per k ≠ 2; 1 per k = 2')
    expect(text(r`A = \begin{pmatrix} 1 & k \\ 2 & 4 \end{pmatrix}`, r`\det A =`)).toBe('−2k + 4')
  })

  it('i sistemi di prima restano come prima', () => {
    expect(text(r`\begin{cases} x + y + z = 1 \\ x - y = 0 \end{cases} \Rightarrow`)).toBe('x = 1/2 − 1/2z, y = 1/2 − 1/2z (z qualsiasi: infinite soluzioni)')
    expect(text(r`a + b = 3, a - b = 1 \Rightarrow`)).toBe('a = 2, b = 1')
  })

  it('il determinante di una matrice di polinomi (Bareiss)', () => {
    const p = (...c: number[]) => c.map((x) => Rational.int(x))
    // det [[1, k], [k, 4]] = 4 − k²
    expect(polyDeterminant([[p(1), p(0, 1)], [p(0, 1), p(4)]]).map((c) => c.toNumber())).toEqual([4, 0, -1])
  })
})

describe('autovalori, diagonalizzazione, forme quadratiche', () => {
  it('diagonalizzare: P e D, con P ortogonale se A è simmetrica; o perché non si può', () => {
    expect(text(r`A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}`, r`\operatorname{diagonalizza}(A) =`)).toBe('P = (−1  1 ; 1  1), D = (1  0 ; 0  3); ortogonale: P = (−√2/2  √2/2 ; √2/2  √2/2)')
    expect(text(r`A = \begin{pmatrix} 1 & 2 \\ 3 & 2 \end{pmatrix}`, r`\operatorname{diagonalizza}(A) =`)).toBe('P = (−1  2 ; 1  3), D = (−1  0 ; 0  4)')
    expect(text(r`A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}`, r`\operatorname{diagonalizza}(A) =`)).toBe('non è diagonalizzabile: λ = 1 ha molteplicità algebrica 2 e geometrica 1')
    expect(text(r`A = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}`, r`\operatorname{diagonalizza}(A) =`)).toBe('non è diagonalizzabile nei reali: ha autovalori complessi')
  })

  it('la segnatura di una matrice simmetrica o di una forma quadratica, e la sua matrice', () => {
    expect(text(r`A = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}`, r`\operatorname{segnatura}(A) =`)).toBe('indefinita: (n₊, n₋, n₀) = (1, 1, 0)')
    expect(text(r`q(x, y, z) = x^2 + y^2 + z^2 + xy`, r`\operatorname{segnatura}(q) =`)).toBe('definita positiva: (n₊, n₋, n₀) = (3, 0, 0)')
    expect(text(r`q(x, y) = x^2 + 2xy + y^2`, r`\operatorname{segnatura}(q) =`)).toBe('semidefinita positiva: (n₊, n₋, n₀) = (1, 0, 1)')
    expect(text(r`q(x, y) = x^2 + 4xy + y^2`, r`\operatorname{matrice}(q) =`)).toBe('(1  2 ; 2  1)')
  })
})

describe('spazi vettoriali e applicazioni lineari', () => {
  it('Gram–Schmidt, con i vettori ortonormali esatti', () => {
    expect(text(r`u = (1, 1, 0)`, r`v = (1, 0, 1)`, r`w = (0, 1, 1)`, r`\operatorname{gramschmidt}(u, v, w) =`)).toBe(
      'u₁ = (1, 1, 0), u₂ = (1/2, −1/2, 1), u₃ = (−2/3, 2/3, 2/3); ortonormali: e₁ = (√2/2, √2/2, 0), e₂ = (√6/6, −√6/6, √6/3), e₃ = (−√3/3, √3/3, √3/3)',
    )
  })

  it('la dipendenza lineare, con la relazione (il primo coefficiente positivo)', () => {
    expect(text(r`u = (1, 2, 3)`, r`v = (2, 4, 6)`, r`w = (0, 1, 1)`, r`\operatorname{indipendenti}(u, v, w) =`)).toBe('no: 2u − v = 0')
    expect(text(r`u = (1, 0, 0)`, r`v = (0, 1, 0)`, r`\operatorname{indipendenti}(u, v) =`)).toBe('sì: sono linearmente indipendenti')
  })

  it('le applicazioni lineari: la matrice, il nucleo, l\'immagine', () => {
    const f = r`f(x, y, z) = (x + y, y - z)`
    expect(text(f, r`\operatorname{matrice}(f) =`)).toBe('(1  1  0 ; 0  1  −1)')
    expect(text(f, r`\ker f =`)).toBe('span{(−1 ; 1 ; 1)}')
    expect(text(f, r`\operatorname{Im} f =`)).toBe('span{(1 ; 0), (1 ; 1)}')
  })

  it('i sottospazi: somma, intersezione, complemento ortogonale, equazioni, proiezione', () => {
    const U = r`U = \operatorname{span}((1, 0, 0), (0, 1, 0))`
    const W = r`W = \operatorname{span}((0, 1, 0), (0, 0, 1))`
    expect(text(U, W, r`U \cap W =`)).toBe('span{(0 ; 1 ; 0)}')
    expect(text(U, W, r`U + W =`)).toBe('span{(1 ; 0 ; 0), (0 ; 1 ; 0), (0 ; 0 ; 1)}')
    expect(text(U, W, r`\dim(U \cap W) =`)).toBe('1')
    const V = r`V = \operatorname{span}((1, 0, 1), (0, 1, 1))`
    expect(text(V, r`\operatorname{equazioni}(V) =`)).toBe('x + y − z = 0')
    expect(text(V, r`V^\perp =`)).toBe('span{(−1 ; −1 ; 1)}')
    expect(text(r`v = (1, 2, 3)`, U, r`\operatorname{proiezione}(v, U) =`)).toBe('(1, 2, 0)')
    expect(text(r`A = \begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}`, r`\operatorname{equazioni}(\ker A) =`)).toBe('x + 2y = 0')
  })
})
