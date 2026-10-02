import { describe, expect, it } from 'vitest'
import { Rational } from '../src/math/exact'
import { determinant, EXACT, FLOAT, image, inverse, kernel, rref } from '../src/math/linear'
import { toLatex } from '../src/math/latex'
import { parseMath } from '../src/math/parse'
import { Sheet, splitPieces } from '../src/math/sheet'
import { formulaGraph, parseGraph } from '../src/graph/spec'

const r = String.raw
const A = r`A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}`
const B = r`B = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}`

/** Il risultato dopo l'ultima formula: com'è scritto nell'editor e in LaTeX. */
function result(...formulas: string[]): { text: string; tex: string; rich?: boolean } | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last
}

const text = (...formulas: string[]) => result(...formulas)?.text ?? null
const q = (n: number, d = 1) => new Rational(BigInt(n), BigInt(d))

describe('vettori e matrici: come si scrivono', () => {
  it('le matrici con pmatrix e bmatrix; vmatrix è il determinante', () => {
    const m = parseMath(r`\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}`)
    expect(m.k === 'matrix' && m.rows.length).toBe(2)
    expect(toLatex(m)).toBe(r`\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}`)
    expect(parseMath(r`\begin{bmatrix} 1 & 2 \end{bmatrix}`).k).toBe('matrix')
    const det = parseMath(r`\begin{vmatrix} 1 & 2 \\ 3 & 4 \end{vmatrix}`)
    expect(det.k === 'fn' && det.name).toBe('det')
    expect(() => parseMath(r`\begin{pmatrix} 1 & 2 \\ 3 \end{pmatrix}`)).toThrow('lunghezze diverse')
  })

  it('il prodotto scalare con le parentesi angolari, la trasposta con ^T e ^\\top', () => {
    const dot = parseMath(r`\langle u, v \rangle`)
    expect(dot.k === 'fn' && dot.name).toBe('dot')
    expect(toLatex(dot)).toBe(r`\langle u, v \rangle`)
    expect(toLatex(parseMath(r`A^\top`))).toBe('A^{T}')
    // La virgola dentro ⟨ ⟩ non divide la formula in due definizioni.
    expect(splitPieces(r`\langle u, v \rangle =`)).toHaveLength(1)
  })
})

describe('vettori e matrici: i conti nella nota', () => {
  it('determinante, inversa (con le frazioni), trasposta, potenze, traccia, rango', () => {
    expect(text(A, r`\det A =`)).toBe('3')
    expect(text(A, '|A| =')).toBe('3')
    expect(result(A, 'A^{-1} =')?.tex).toBe(r`\begin{pmatrix} \frac{2}{3} & -\frac{1}{3} \\ -\frac{1}{3} & \frac{2}{3} \end{pmatrix}`)
    expect(result(A, 'A^{-1} =')?.rich).toBe(true)
    expect(text(A, 'A^T =')).toBe('(2  1 ; 1  2)')
    expect(text(A, 'A^2 =')).toBe('(5  4 ; 4  5)')
    expect(text(A, 'A^{-1} A =')).toBe('(1  0 ; 0  1)')
    expect(text(A, 'I_2 - A =')).toBe('(−1  −1 ; −1  −1)')
    expect(text(A, r`\operatorname{tr} A =`)).toBe('4')
    expect(text(B, r`\operatorname{rank} B =`)).toBe('2')
    expect(text(B, r`\det B =`)).toBe('0')
    expect(text(r`\begin{vmatrix} 1 & 2 \\ 3 & 4 \end{vmatrix} =`)).toBe('−2')
    // Con i decimali: le cifre.
    expect(text(r`C = \begin{pmatrix} 0{,}5 & 1 \\ 2 & 3 \end{pmatrix}`, 'C^{-1} =')).toBe('(−6  2 ; 4  −1)')
    expect(text(r`M = \begin{pmatrix} \pi & 0 \\ 0 & 1 \end{pmatrix}`, r`\det M =`)).toBe('3,141592…')
  })

  it('una matrice senza inversa non ha il risultato', () => {
    expect(text(r`\begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}^{-1} =`)).toBeNull()
  })

  it('riduzione a scala, nucleo, immagine e loro dimensioni', () => {
    expect(text(B, r`\operatorname{rref}(B) =`)).toBe('(1  0  −1 ; 0  1  2 ; 0  0  0)')
    expect(text(B, r`\ker B =`)).toBe('span{(1 ; −2 ; 1)}')
    expect(text(B, r`\operatorname{Im} B =`)).toBe('span{(1 ; 4 ; 7), (2 ; 5 ; 8)}')
    expect(text(B, r`\dim \ker B =`)).toBe('1')
    expect(text(A, r`\ker A =`)).toBe('{0}')
  })

  it('vettori: somme, prodotto scalare e vettoriale, norma, matrice per vettore', () => {
    const uv = ['u = (1, 2, 3)', 'v = (4, 5, 6)']
    expect(text(...uv, r`u \cdot v =`)).toBe('32')
    expect(text(...uv, r`\langle u, v \rangle =`)).toBe('32')
    expect(text(...uv, r`u \times v =`)).toBe('(−3, 6, −3)')
    expect(text('u = (3, 4)', r`\|u\| =`)).toBe('5')
    expect(text('u = (1, 1)', '|u| =')).toBe('1,414213…')
    expect(text('u = (1, 2)', 'v = (3, 4)', 'u + 2v =')).toBe('(7, 10)')
    expect(text(A, 'v = (1, 2)', 'A v =')).toBe('(4, 5)')
  })

  it('autovalori e autovettori, anche complessi o ripetuti', () => {
    expect(text(A, r`\operatorname{autovalori}(A) =`)).toBe('λ₁ = 1; λ₂ = 3')
    expect(text(A, r`\operatorname{autovettori}(A) =`)).toBe('λ₁ = 1: (−1 ; 1); λ₂ = 3: (1 ; 1)')
    expect(text(r`R = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}`, r`\operatorname{autovalori}(R) =`)).toBe('λ₁ = −i; λ₂ = i')
    expect(text(r`D = \begin{pmatrix} 2 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{pmatrix}`, r`\operatorname{autovettori}(D) =`)).toBe(
      'λ₁ = 2 (×2): (1 ; 0 ; 0), (0 ; 1 ; 0); λ₂ = 3: (0 ; 0 ; 1)',
    )
    // Un blocco di Jordan: λ = 1 due volte, ma un autovettore solo.
    expect(text(r`S = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}`, r`\operatorname{autovettori}(S) =`)).toBe('λ = 1 (×2): (1 ; 0)')
    expect(text(r`N = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}`, r`\operatorname{autovalori}(N) =`)).toBe('λ₁ = −0,372281…; λ₂ = 5,372281…')
  })

  it('il polinomio caratteristico', () => {
    expect(text(A, r`\det(A - \lambda I) =`)).toBe('λ^2 − 4λ + 3')
    expect(result(A, r`\det(A - \lambda I) =`)?.tex).toBe(r`\lambda^{2} - 4\lambda + 3`)
    expect(text(B, r`\det(B - t I) =`)).toBe('−t^3 + 15t^2 + 18t')
  })

  it('una matrice definita con il risultato si usa dopo', () => {
    expect(text(A, 'C = A^2 =', r`\det C =`)).toBe('9')
  })
})

describe('gli algoritmi', () => {
  it('con le frazioni sono esatti', () => {
    const m = [
      [q(1), q(2)],
      [q(3), q(4)],
    ]
    expect(determinant(EXACT, m).cmp(q(-2))).toBe(0)
    expect(inverse(EXACT, m).flat().map((x) => `${x.n}/${x.d}`)).toEqual(['-2/1', '1/1', '3/2', '-1/2'])
    expect(rref(EXACT, m).pivots).toEqual([0, 1])
  })

  it('con la virgola il pivot è il più grande, e i resti piccolissimi sono zero', () => {
    const m = [
      [1e-20, 1],
      [1, 1],
    ]
    expect(determinant(FLOAT, m)).toBeCloseTo(-1, 12)
    const singular = [
      [1, 2],
      [2, 4 + 1e-14],
    ]
    expect(rref(FLOAT, singular).pivots).toEqual([0])
    expect(kernel(FLOAT, singular)).toHaveLength(1)
    expect(image(FLOAT, singular)).toHaveLength(1)
    // Un resto di 10⁻¹¹ (più grande degli errori di un conto solo) sotto la tolleranza: il rango è 1.
    const almost = [
      [Math.PI, Math.PI],
      [1, 1 + 1e-11],
    ]
    expect(rref(FLOAT, almost).pivots).toEqual([0])
  })
})

describe('i vettori nei grafici', () => {
  const defs = ['u = (1, 2)', 'v = (3, -1)', r`A = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}`, 'P = (2, 2)', 'w = (1, 2, 3)']

  it('i vettori della nota sono frecce, con le componenti nella legenda', () => {
    const spec = parseGraph('u\nv\nu + v', defs)
    expect(spec.items.map((i) => [i.kind, i.label])).toEqual([
      ['vector', 'u = \\left(1, 2\\right)'],
      ['vector', 'v = \\left(3, -1\\right)'],
      ['vector', 'u + v = \\left(4, 1\\right)'],
    ])
    expect(parseGraph('A u', defs).items[0]).toMatchObject({ kind: 'vector', to: [-2, 1, 0] })
  })

  it('un nome con la maiuscola è un punto; con tre componenti il grafico è 3D; una matrice non si disegna', () => {
    expect(parseGraph('P', defs).items[0]).toMatchObject({ kind: 'point', x: 2, y: 2 })
    const space = parseGraph('w', defs)
    expect(space.dim).toBe(3)
    expect(space.items[0]).toMatchObject({ kind: 'vector', to: [1, 2, 3] })
    expect(parseGraph('A', defs).errors[0].message).toBe('Una matrice non si disegna: disegna i vettori, come A v')
  })

  it('nel pannello: la freccia di un vettore', () => {
    expect(formulaGraph('u + v', defs)?.items.map((i) => i.kind)).toEqual(['vector'])
    expect(formulaGraph('v = (3, -1)')?.items.map((i) => i.kind)).toEqual(['vector'])
    expect(formulaGraph('P = (1, 2)')?.items.map((i) => i.kind)).toEqual(['point'])
  })

  it('nel blocco: con la minuscola un vettore, con la maiuscola un punto', () => {
    expect(parseGraph('v = (3, -1)').items[0]).toMatchObject({ kind: 'vector', to: [3, -1, 0], name: 'v' })
    expect(parseGraph('u_1 = (1, 2, 2)').items[0]).toMatchObject({ kind: 'vector', to: [1, 2, 2] })
    expect(parseGraph('P = (1, 2)').items[0]).toMatchObject({ kind: 'point', x: 1, y: 2 })
  })
})
