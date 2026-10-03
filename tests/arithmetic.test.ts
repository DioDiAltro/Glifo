import { describe, expect, it } from 'vitest'
import { Sheet } from '../src/math/sheet'
import { parseMath, readBases } from '../src/math/parse'
import { toLatex } from '../src/math/latex'

const r = String.raw

/** Il risultato dell'ultima formula, con le formule prima come definizioni. */
function text(...formulas: string[]): string | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last?.text ?? null
}

function tex(...formulas: string[]): string | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last?.tex ?? null
}

describe("l'aritmetica dei numeri interi", () => {
  it('i fattori primi, i divisori, i numeri primi', () => {
    expect(text(r`\operatorname{fattori}(360) =`)).toBe('2³ · 3² · 5')
    expect(text(r`\operatorname{fattori}(-84) =`)).toBe('−2² · 3 · 7')
    expect(text(r`\operatorname{divisori}(12) =`)).toBe('1, 2, 3, 4, 6, 12 (6 divisori)')
    expect(text(r`\operatorname{primo}(97) =`)).toBe('sì, 97 è primo')
    expect(text(r`\operatorname{primo}(91) =`)).toBe('no: 91 = 7 · 13')
    // Anche grandi (Miller–Rabin).
    expect(text(r`\operatorname{primo}(1000000007) =`)).toBe('sì, 1000000007 è primo')
    expect(text(r`\operatorname{primo}(561) =`)).toBe('no: 561 = 3 · 11 · 17')
  })

  it('il resto, anche delle potenze grandi e dei negativi, e la divisione con il resto', () => {
    expect(text(r`17 \bmod 5 =`)).toBe('2')
    expect(text(r`-7 \bmod 3 =`)).toBe('2')
    expect(text(r`3^{1000} \bmod 7 =`)).toBe('4')
    expect(text(r`2^{10000} \bmod 13 =`)).toBe('3')
    expect(text(r`3^{-1} \bmod 7 =`)).toBe('5')
    expect(text(r`\operatorname{divisione}(17, 5) =`)).toBe('17 = 5 · 3 + 2 (quoziente 3, resto 2)')
    expect(text(r`\operatorname{divisione}(-17, 5) =`)).toBe('−17 = 5 · (−4) + 3 (quoziente −4, resto 3)')
  })

  it("Euclide, Bézout, l'inverso modulo n, la funzione di Eulero", () => {
    expect(text(r`\operatorname{euclide}(252, 198) =`)).toBe('252 = 1 · 198 + 54; 198 = 3 · 54 + 36; 54 = 1 · 36 + 18; 36 = 2 · 18; mcd = 18')
    expect(text(r`\operatorname{bezout}(240, 46) =`)).toBe('mcd = 2 = 240 · (−9) + 46 · 47')
    expect(text(r`\operatorname{inverso}(3, 7) =`)).toBe('5 (3 · 5 ≡ 1 mod 7)')
    expect(text(r`\operatorname{inverso}(4, 8) =`)).toBe('non esiste (mcd(4, 8) = 4)')
    expect(text(r`\operatorname{totiente}(12) =`)).toBe('4')
    // \varphi(n), se φ non è una funzione della nota.
    expect(text(r`\varphi(36) =`)).toBe('12')
    expect(text(r`\varphi(x) = x^2`, r`\varphi(3) =`)).toBe('9')
  })

  it('le equazioni diofantee', () => {
    expect(text(r`\operatorname{diofantea}(3x + 5y = 7) =`)).toBe('x = 4 + 5k, y = −1 − 3k (k ∈ ℤ)')
    expect(text(r`\operatorname{diofantea}(3x - 5y = 1) =`)).toBe('x = 2 + 5k, y = 1 + 3k (k ∈ ℤ)')
    expect(text(r`\operatorname{diofantea}(6x + 4y = 7) =`)).toBe('nessuna soluzione intera: mcd(6, 4) = 2 non divide 7')
  })

  it('le basi: (1011)_2 si legge, binario e esadecimale si scrivono', () => {
    expect(text(r`(1011)_2 =`)).toBe('11')
    expect(text(r`(FF)_{16} + 1 =`)).toBe('256')
    expect(text(r`\operatorname{binario}(11) =`)).toBe('(1011)₂')
    expect(text(r`\operatorname{esadecimale}(255) =`)).toBe('(FF)₁₆')
    expect(text(r`\operatorname{base}(100, 3) =`)).toBe('(10201)₃')
    // Le posizioni nel testo non cambiano (per gli errori), e con una cifra sola non è una base.
    expect(readBases(r`(1011)_2 + 1`)).toBe('11       + 1')
    expect(readBases(r`(x)_2 + (5)_3 + (12)_2`)).toBe(r`(x)_2 + (5)_3 + (12)_2`)
  })
})

describe('le congruenze', () => {
  it('lineari, anche con il modulo non primo con il coefficiente', () => {
    expect(text(r`3x \equiv 2 \pmod{5} \Rightarrow`)).toBe('x ≡ 4 (mod 5)')
    expect(text(r`6x \equiv 4 \pmod{10} \Rightarrow`)).toBe('x ≡ 4 (mod 5), cioè x ≡ 4, 9 (mod 10)')
    expect(text(r`2x \equiv 3 \pmod{4} \Rightarrow`)).toBe('nessuna soluzione')
    expect(text(r`x \equiv 3 \mod 5 \Rightarrow`)).toBe('x ≡ 3 (mod 5)')
  })

  it('i sistemi, con il teorema cinese del resto', () => {
    expect(text(r`x \equiv 2 \pmod{3}, \; x \equiv 3 \pmod{5}, \; x \equiv 2 \pmod{7} \Rightarrow`)).toBe('x ≡ 23 (mod 105)')
    expect(text(r`\begin{cases} x \equiv 1 \pmod 2 \\ x \equiv 2 \pmod 3 \end{cases} \Rightarrow`)).toBe('x ≡ 5 (mod 6)')
    expect(text(r`x \equiv 1 \pmod{4}, x \equiv 2 \pmod{6} \Rightarrow`)).toBe('nessuna soluzione (le congruenze non sono compatibili)')
  })

  it('di grado più alto: tutti i resti', () => {
    expect(text(r`x^2 \equiv 1 \pmod{8} \Rightarrow`)).toBe('x ≡ 1, 3, 5, 7 (mod 8)')
    expect(text(r`x^2 \equiv 2 \pmod{5} \Rightarrow`)).toBe('nessuna soluzione')
  })

  it('si scrivono come si leggono', () => {
    expect(toLatex(parseMath(r`x \equiv 3 \pmod{5}`))).toBe(r`x \equiv 3 \pmod{5}`)
    expect(toLatex(parseMath(r`17 \bmod 5`))).toBe(r`17 \bmod 5`)
    expect(() => parseMath(r`x \equiv 3`)).toThrow('Manca il modulo')
  })
})

describe('i polinomi', () => {
  it('la scomposizione in fattori', () => {
    expect(text(r`\operatorname{scomponi}(x^3 - x) =`)).toBe('x(x − 1)(x + 1)')
    expect(text(r`\operatorname{scomponi}(2x^2 - 2) =`)).toBe('2(x − 1)(x + 1)')
    expect(text(r`\operatorname{scomponi}(x^4 - 1) =`)).toBe('(x − 1)(x + 1)(x² + 1)')
    expect(text(r`\operatorname{scomponi}(6x^2 - 5x + 1) =`)).toBe('(2x − 1)(3x − 1)')
    expect(text(r`\operatorname{scomponi}(x^3 - 3x^2 + 3x - 1) =`)).toBe('(x − 1)³')
    expect(text(r`\operatorname{scomponi}(-x^2 + 1) =`)).toBe('−(x − 1)(x + 1)')
    expect(text(r`\operatorname{scomponi}(x^4 + x^2) =`)).toBe('x²(x² + 1)')
    expect(text(r`\operatorname{scomponi}(x^2 + 1) =`)).toBe('x² + 1 (irriducibile in ℚ)')
    expect(text(r`\operatorname{scomponi}(x^2 - 5x + 6) =`)).toBe('(x − 2)(x − 3)')
    // Con t = x³.
    expect(text(r`\operatorname{scomponi}(x^6 - 5x^3 + 6) =`)).toBe('(x³ − 2)(x³ − 3)')
  })

  it('con più lettere: il raccoglimento e i prodotti notevoli', () => {
    expect(text(r`\operatorname{scomponi}(a^2 - b^2) =`)).toBe('(a − b)(a + b)')
    expect(text(r`\operatorname{scomponi}(x^2 + 2xy + y^2) =`)).toBe('(x + y)²')
    expect(text(r`\operatorname{scomponi}(a^3 - b^3) =`)).toBe('(a − b)(a² + ab + b²)')
    expect(text(r`\operatorname{scomponi}(x^2 - a^2) =`)).toBe('(x − a)(x + a)')
    expect(text(r`\operatorname{scomponi}(4a^2 - 9b^2) =`)).toBe('(2a − 3b)(2a + 3b)')
    expect(text(r`\operatorname{scomponi}(x^2 - 5xy + 6y^2) =`)).toBe('(x − 2y)(x − 3y)')
    expect(text(r`\operatorname{scomponi}(x^3 y - x y^3) =`)).toBe('xy(x − y)(x + y)')
    expect(text(r`\operatorname{scomponi}(2ax + 4ay) =`)).toBe('2a(x + 2y)')
    expect(text(r`\operatorname{scomponi}(-2x^2 y + 2 y) =`)).toBe('−2y(x − 1)(x + 1)')
    expect(tex(r`\operatorname{scomponi}(a^4 - b^4) =`)).toBe(r`\left(a - b\right)\left(a + b\right)\left(a^{2} + b^{2}\right)`)
  })

  it('lo sviluppo, la divisione con il resto, Ruffini, mcd e mcm', () => {
    expect(text(r`\operatorname{sviluppa}((x + 1)^3) =`)).toBe('x³ + 3x² + 3x + 1')
    expect(text(r`\operatorname{sviluppa}((2x + 2)^2) =`)).toBe('4x² + 8x + 4')
    expect(text(r`\operatorname{sviluppa}((a + b)^2) =`)).toBe('a² + 2ab + b²')
    expect(text(r`\operatorname{divisione}(x^3 - 2x + 1, x - 1) =`)).toBe('Q(x) = x² + x − 1, R(x) = 0')
    expect(text(r`\operatorname{divisione}(x^3 + 1, x^2 + 1) =`)).toBe('Q(x) = x, R(x) = 1 − x')
    expect(text(r`\operatorname{ruffini}(x^3 - 2x + 1, x - 1) =`)).toBe('Q(x) = x² + x − 1, R = 0')
    expect(tex(r`\operatorname{ruffini}(x^3 - 2x + 1, x - 1) =`)).toContain(r`\begin{array}{c|ccc|c} & 1 & 0 & -2 & 1 \\ 1 &  & 1 & 1 & -1 \\ \hline & 1 & 1 & -1 & 0 \end{array}`)
    expect(text(r`\operatorname{ruffini}(2x^2 + x - 1, 2x - 1) =`)).toBe('Q(x) = x + 1, R = 0')
    expect(text(r`\operatorname{ruffini}(2x^3 - 3x^2 + 1, 2) =`)).toBe('Q(x) = 2x² + x + 2, R = 5')
    expect(text(r`\gcd(x^2 - 1, x^2 - 2x + 1) =`)).toBe('x − 1')
    expect(text(r`\operatorname{mcm}(x^2 - 1, x^2 - 2x + 1) =`)).toBe('(x − 1)²(x + 1)')
    // Con i numeri resta il calcolo di sempre.
    expect(text(r`\gcd(12, 18) =`)).toBe('6')
    expect(text(r`\operatorname{mcm}(4, 6) =`)).toBe('12')
  })
})

describe('gli insiemi scritti elemento per elemento', () => {
  const AB = [r`A = \{1, 2, 3\}`, r`B = \{2, 3, 4\}`]

  it('unione, intersezione, differenza, prodotto cartesiano, differenza simmetrica', () => {
    expect(text(...AB, r`A \cup B =`)).toBe('{1, 2, 3, 4}')
    expect(text(...AB, r`A \cap B =`)).toBe('{2, 3}')
    expect(text(...AB, r`A \setminus B =`)).toBe('{1}')
    expect(text(...AB, r`A \triangle B =`)).toBe('{1, 4}')
    expect(text(r`\{1, 2\} \times \{a, b\} =`)).toBe('{(1, a), (1, b), (2, a), (2, b)}')
    expect(text(r`A = \{1, 2\}`, r`A^2 =`)).toBe('{(1, 1), (1, 2), (2, 1), (2, 2)}')
    expect(text(r`\{1, 2\} \cap \{3\} =`)).toBe('∅')
    expect(text(r`\{3, 1, 2, 1\} \cup \emptyset =`)).toBe('{1, 2, 3}')
  })

  it("l'insieme delle parti, quanti elementi, il complementare", () => {
    expect(text(...AB, r`\mathcal{P}(A) =`)).toBe('{∅, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}')
    expect(text(r`A = \{1, 2\}`, r`2^A =`)).toBe('{∅, {1}, {2}, {1, 2}}')
    expect(text(...AB, r`|\mathcal{P}(A)| =`)).toBe('8')
    expect(text(...AB, r`|A \cup B| =`)).toBe('4')
    expect(text(...AB, r`\#A =`)).toBe('3')
    expect(text(...AB, r`\operatorname{card}(A \times B) =`)).toBe('9')
    expect(text(...AB, r`U = \{1, 2, \ldots, 6\}`, r`A^c =`)).toBe('{4, 5, 6}')
    expect(text(...AB, r`U = \{1, 2, \ldots, 6\}`, r`\overline{A} =`)).toBe('{4, 5, 6}')
    // Senza U il complementare non c'è.
    expect(text(...AB, r`A^c =`)).toBeNull()
  })

  it('con i puntini, e quelli che vengono dalle operazioni si usano dopo', () => {
    expect(text(r`\{2, 4, \ldots, 20\} =`)).toBe('{2, 4, 6, 8, 10, 12, 14, 16, 18, 20}')
    expect(text(...AB, r`C = A \cup B`, r`C \setminus A =`)).toBe('{4}')
    expect(text(...AB, r`n = |A| =`, r`n^2 =`)).toBe('9')
    expect(toLatex(parseMath(r`\mathcal{P}(A) \cup \emptyset`))).toBe(r`\mathcal{P}(A) \cup \emptyset`)
  })

  it('la probabilità classica con lo spazio Ω', () => {
    const dice = [r`\Omega = \{1, 2, 3, 4, 5, 6\}`, r`A = \{2, 4, 6\}`, r`B = \{4, 5, 6\}`]
    expect(text(...dice, r`P(A) =`)).toBe('1/2')
    expect(text(...dice, r`P(A \cap B) =`)).toBe('1/3')
    expect(text(...dice, r`P(A \mid B) =`)).toBe('2/3')
  })
})

describe('la logica', () => {
  it('la tavola di verità con le sottoformule, dalla riga con tutto vero', () => {
    expect(text(r`\operatorname{verità}(p \land q \Rightarrow r) =`)).toBe('vera in 7 casi su 8; p ∧ q ⇒ r: V F V V V V V V')
    expect(text(r`p \Rightarrow q =`)).toBe('vera in 3 casi su 4; p ⇒ q: V F V V')
    expect(tex(r`p \Rightarrow q =`)).toContain(r`\begin{array}{cc|c} p & q & p \Rightarrow q \\ \hline \mathrm{V} & \mathrm{V} & \mathbf{V}`)
  })

  it('tautologie, equivalenze e contraddizioni', () => {
    expect(text(r`\neg (p \land q) \Leftrightarrow \neg p \lor \neg q =`)).toBe('tautologia: le due formule sono equivalenti; ¬(p ∧ q) ⇔ ¬p ∨ ¬q: V V V V')
    expect(text(r`(p \Rightarrow q) \land p \Rightarrow q =`)).toBe('tautologia: la conclusione segue dalle premesse; (p ⇒ q) ∧ p ⇒ q: V V V V')
    expect(text(r`p \land \neg p =`)).toBe('contraddizione (sempre falsa); p ∧ ¬p: F F')
  })

  it("anche come nell'algebra di Boole, e le forme normali", () => {
    expect(text(r`\operatorname{verita}(A + B \overline{C}) =`)).toBe('vera in 5 casi su 8; A ∨ B ∧ ¬C: V V V V F V F F')
    expect(text(r`\operatorname{verità}(p_1 \lor p_2) =`)).toBe('vera in 3 casi su 4; p₁ ∨ p₂: V V V F')
    expect(text(r`\operatorname{fnd}(p \oplus q) =`)).toBe('(p ∧ ¬q) ∨ (¬p ∧ q)')
    expect(text(r`\operatorname{fnc}(p \oplus q) =`)).toBe('(¬p ∨ ¬q) ∧ (p ∨ q)')
  })

  it('non prende le formule che non sono di logica', () => {
    expect(text(r`A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}`, r`A^\top =`)).toBe('(1  3 ; 2  4)')
    expect(text(r`x \to 0 =`)).toBeNull()
    expect(text(r`2 + 3 =`)).toBe('5')
  })
})
