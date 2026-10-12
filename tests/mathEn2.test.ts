import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { setLangForTests } from '../src/i18n'
import { compileComplex, EMPTY_COMPLEX_SCOPE } from '../src/math/complex'
import { makeDistribution } from '../src/math/distributions'
import { EMPTY_SCOPE } from '../src/math/evaluate'
import { Rational } from '../src/math/exact'
import { finiteValue } from '../src/math/finite'
import { fourierProblem, fourierShown } from '../src/math/fourier'
import { chiSquareTest, confidenceShown, hypothesisTest } from '../src/math/inference'
import { EXACT, evaluateLinear, FLOAT, surdText } from '../src/math/linear'
import { matrixSystem } from '../src/math/linsys'
import { parseLogic, truthTable } from '../src/math/logic'
import { parseMath, type MathNode } from '../src/math/parse'
import { pdivmod } from '../src/math/polynomial'
import { randomScope } from '../src/math/probability'
import { Sheet } from '../src/math/sheet'
import { dataStatistic, statistic } from '../src/math/statistics'

/**
 * I conti in inglese, la parte B di src/math (matrici e sistemi, numeri complessi, statistica e
 * probabilità, coniche, aritmetica, logica e insiemi, polinomi, Fourier, Laplace, serie di potenze): i
 * risultati con le parole, gli errori e i numeri con il punto. I numeri che il foglio scrive come nella
 * formula (la virgola o il punto di chi prende appunti) qui hanno il punto scritto nella formula; senza,
 * la scelta è del foglio (src/math/sheet.ts). I nomi delle funzioni nelle formule restano italiani.
 */

const r = String.raw

/** Il risultato dell'ultima formula, con le formule prima come definizioni. */
function result(...formulas: string[]): { text: string; tex: string } | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last
}

const text = (...formulas: string[]) => result(...formulas)?.text ?? null
const tex = (...formulas: string[]) => result(...formulas)?.tex ?? null

/** Gli argomenti di una funzione scritta: \operatorname{test}(…). */
const args = (src: string) => (parseMath(src) as Extract<MathNode, { k: 'fn' }>).args

const q = (n: number) => Rational.int(n)

beforeEach(() => setLangForTests('en'))
afterEach(() => setLangForTests('it'))

describe('i conti in inglese (parte B)', () => {
  it("l'aritmetica: i risultati con le parole", () => {
    expect(text(r`\operatorname{primo}(97) =`)).toBe('yes, 97 is prime')
    expect(tex(r`\operatorname{primo}(97) =`)).toBe(r`\text{yes, } 97 \text{ is prime}`)
    expect(text(r`\operatorname{divisori}(12) =`)).toBe('1, 2, 3, 4, 6, 12 (6 divisors)')
    expect(tex(r`\operatorname{divisori}(12) =`)).toBe(r`1,\ 2,\ 3,\ 4,\ 6,\ 12\quad (6\ \text{divisors})`)
    expect(text(r`\operatorname{divisori}(1) =`)).toBe('1 (1 divisor)')
    expect(text(r`\operatorname{euclide}(252, 198) =`)).toBe('252 = 1 · 198 + 54; 198 = 3 · 54 + 36; 54 = 1 · 36 + 18; 36 = 2 · 18; gcd = 18')
    expect(text(r`\operatorname{bezout}(252, 198) =`)).toBe('gcd = 18 = 252 · 4 + 198 · (−5)')
    expect(text(r`\operatorname{diofantea}(4x + 6y = 5) =`)).toBe('no integer solutions: gcd(4, 6) = 2 does not divide 5')
    expect(text(r`\operatorname{divisione}(17, 5) =`)).toBe('17 = 5 · 3 + 2 (quotient 3, remainder 2)')
    expect(text(r`\operatorname{inverso}(4, 6) =`)).toBe('does not exist (gcd(4, 6) = 2)')
    expect(text(r`\operatorname{scomponi}(x^2 + x + 1) =`)).toBe('x² + x + 1 (irreducible over ℚ)')
    // Le congruenze.
    expect(text(r`6x \equiv 4 \pmod{10} \Rightarrow`)).toBe('x ≡ 4 (mod 5), i.e. x ≡ 4, 9 (mod 10)')
    expect(tex(r`6x \equiv 4 \pmod{10} \Rightarrow`)).toBe(r`x \equiv 4 \pmod{5},\ \text{i.e. } x \equiv 4, 9 \pmod{10}`)
    expect(text(r`x^2 \equiv 3 \pmod{8} \Rightarrow`)).toBe('no solution')
    expect(text(r`x \equiv 2 \pmod{4}, \; x \equiv 3 \pmod{6} \Rightarrow`)).toBe('no solution (the congruences are incompatible)')
    expect(text(r`x \equiv 0 \pmod{1} \Rightarrow`)).toBe('every integer x')
  })

  it('i numeri complessi: gli errori e i numeri con il punto', () => {
    expect(() => compileComplex(parseMath('(1, 2)'), EMPTY_COMPLEX_SCOPE)).toThrow("A pair of values (a, b) doesn't belong here")
    expect(() => compileComplex({ k: 'tuple', items: [] }, EMPTY_COMPLEX_SCOPE)).toThrow('The parentheses are empty')
    expect(() => compileComplex(parseMath('x > 1'), EMPTY_COMPLEX_SCOPE)).toThrow('An expression goes here, not a condition')
    expect(text(r`\sqrt{-2.25} =`)).toBe('1.5i; −1.5i')
    expect(text(r`z = 1.5 + 2i`, r`z^2 =`)).toBe('−7/4 + 6i')
  })

  it('le coniche e le quadriche, con l’angolo con il punto', () => {
    expect(text(r`\operatorname{conica}(x^2 + 4y^2 = 4) =`)).toBe('ellipse; x²/4 + y² = 1; C = (0, 0), a = 2, b = 1; F₁ = (−√3, 0), F₂ = (√3, 0); e = √3/2')
    expect(text(r`\operatorname{conica}(x^2 - y^2 = 1) =`)).toBe(
      'rectangular hyperbola; x² − y² = 1; C = (0, 0), e = √2; F₁ = (−√2, 0), F₂ = (√2, 0); asymptotes: y = x, y = −x',
    )
    expect(text(r`\operatorname{conica}(y = x^2 - 2x) =`)).toBe(
      'parabola with a vertical axis; y = x² − 2x; canonical form: (x − 1)² = y + 1; V = (1, −1), F = (1, −3/4); directrix y = −5/4, axis x = 1',
    )
    expect(text(r`\operatorname{conica}(x^2 + y^2 = -1) =`)).toBe('imaginary ellipse: no real points')
    // Gli assi ruotati di un angolo che non è un multiplo di π/12: le cifre con il punto.
    expect(text(r`\operatorname{conica}(2x^2 + xy + y^2 = 1) =`)).toBe('ellipse; X²/2/(√2 + 3) + Y²/2/(3 − √2) = 1; (axes rotated by θ = 0.3927)')
    expect(tex(r`\operatorname{conica}(2x^2 + xy + y^2 = 1) =`)).toContain(r`\text{(axes rotated by } \theta = 0.3927\text{)}`)
    expect(text(r`\operatorname{quadrica}(x^2 + y^2 - z^2 = 1) =`)).toBe('hyperboloid of one sheet (hyperbolic); x² + y² − z² = 1')
    expect(text(r`\operatorname{quadrica}(x^2 + y^2 + z^2 = 4) =`)).toBe('sphere; x² + y² + z² = 4; C = (0, 0, 0), r = 2')
    expect(text(r`\operatorname{quadrica}(x^2 + y^2 = z) =`)).toBe('elliptic paraboloid; z = x² + y²')
  })

  it('le distribuzioni: gli errori, con gli esempi con il punto', () => {
    expect(() => makeDistribution('binomial', [10])).toThrow('This distribution takes 2 parameters: X \\sim B(10, 0.3)')
    expect(() => makeDistribution('bernoulli', [])).toThrow('This distribution takes one parameter: X \\sim \\operatorname{Be}(0.5)')
    expect(() => makeDistribution('binomial', [2.5, 0.3])).toThrow('n (the number of trials) must be a whole number (0 or more)')
    expect(() => makeDistribution('binomial', [10, 2])).toThrow('The probability p goes from 0 to 1')
    expect(() => makeDistribution('normal', [0, -1])).toThrow('The variance σ² must be a positive number')
    expect(() => makeDistribution('hypergeometric', [5, 6, 2])).toThrow('In H(N, K, n) the “good” items K and the draws n are at most N')
    expect(() => makeDistribution('uniform', [2, 1])).toThrow('In U(a, b), a must be less than b')
    expect(() => makeDistribution('student', [0])).toThrow('The degrees of freedom must be a positive number')
    expect(makeDistribution('binomial', [10, 0.3]).mean).toBe(3)
  })

  it('gli insiemi scritti elemento per elemento: gli errori', () => {
    const ctx = { sets: new Map(), symbols: { consts: new Map(), fns: new Map() }, isFunction: () => false }
    expect(() => finiteValue(parseMath(r`\{1, 2, \ldots\}`), ctx)).toThrow('The dots go between two elements: \\{1, 2, \\ldots, 10\\}')
    expect(() => finiteValue(parseMath(r`\{1, 3, \ldots, 10\}`), ctx)).toThrow("With a step of 2 you can't get from 3 to 10")
    expect(() => finiteValue(parseMath(r`\{1, 2\}^c`), ctx)).toThrow('The complement needs the universal set: first write U = \\{…\\} (or Ω)')
    expect(() => finiteValue(parseMath(r`P(\{1, 2\})`), ctx)).toThrow('The probability needs the universal set: first write U = \\{…\\} (or Ω)')
    expect(text(r`A = \{1, 2, 3\}`, r`B = \{3, 4\}`, r`A \cup B =`)).toBe('{1, 2, 3, 4}')
  })

  it('la serie di Fourier: pari e dispari, i coefficienti con il punto, gli errori', () => {
    expect(text(r`\operatorname{fourier}(x) =`)).toBe('a₀ = 0; aₙ = 0 (the function is odd); bₙ = (2(−1)^(n + 1))/n; x ~ Σ_{n≥1} (2(−1)^(n + 1))/n sin(nx)')
    expect(text(r`\operatorname{fourier}(x^2) =`)).toBe('a₀ = (2π²)/3; aₙ = (4(−1)^(n))/n²; bₙ = 0 (the function is even); x² ~ π²/3 + Σ_{n≥1} (4(−1)^(n))/n² cos(nx)')
    expect(text(r`\operatorname{fourier}(x + 1) =`)).toContain('aₙ = 0 (the function minus 1 is odd)')
    expect(tex(r`\operatorname{fourier}(x + 1) =`)).toContain(r`\text{(the function minus }1\text{ is odd)}`)
    // Quando i coefficienti con le lettere non si trovano, i primi con le cifre.
    expect(text(r`\operatorname{fourier}(e^{x^2}) =`)).toBe('a₀ ≈ 2079.9241; a₁, a₂, a₃ ≈ −2006.7097; 1828.0610; −1604.6087; b₁, b₂, b₃ ≈ 0; 0; 0')
    const sheet = new Sheet()
    expect(() => fourierShown(fourierProblem([parseMath('n^2')], sheet.symbolScope(), sheet.scope())!)).toThrow("For the Fourier series the variable can't be n")
  })

  it("la statistica inferenziale: gli intervalli e i test con la decisione, con il punto", () => {
    const data = r`x = (12.1, 11.8, 12.4, 12.0, 11.6, 12.3, 12.2, 11.9)`
    // Con il punto per i decimali, gli estremi si separano con la virgola.
    expect(text(data, r`\operatorname{ic}(x, 0.95) =`)).toBe('[11.8143, 12.2607] (95%: 12.0375 ± 0.2232, t(7) = 2.3646)')
    expect(tex(data, r`\operatorname{ic}(x, 0.95) =`)).toBe(r`\left[11.8143,\ 12.2607\right]\quad (95\%:\ \bar{x} = 12.0375,\ E = 0.2232,\ t_{0.975}(7) = 2.3646)`)
    expect(text(data, r`\operatorname{icvarianza}(x, 0.95) =`)).toBe('σ² ∈ [0.031147, 0.295141] (95%: s² = 0.07125, χ²(7))')
    expect(text(r`\operatorname{test}(\bar{x} = 10.5, s = 2, n = 30, \mu > 10) =`)).toBe(
      't = 1.3693 (t(29)); p = 0.09071 ≥ α = 0.05: fail to reject H₀ (H₀: μ = 10, H₁: μ > 10; reject if t > 1.6991)',
    )
    expect(tex(r`\operatorname{test}(\bar{x} = 10.5, s = 2, n = 30, \mu > 10) =`)).toBe(
      r`\begin{array}{l} H_0:\ \mu = 10,\quad H_1:\ \mu > 10 \\ t = 1.3693\ \ (t(29)),\quad \text{reject if } t > 1.6991 \\ p = 0.09071 \ge \alpha = 0.05:\ \text{fail to reject } H_0 \end{array}`,
    )
    expect(text(r`\operatorname{test}(\bar{x} = 10.5, \sigma = 2, n = 30, \mu \ne 10, 0.05) =`)).toBe(
      'z = 1.3693 (N(0, 1)); p = 0.1709 ≥ α = 0.05: fail to reject H₀ (H₀: μ = 10, H₁: μ ≠ 10; reject if z < −1.96 or z > 1.96)',
    )
    expect(text(r`\operatorname{chiquadro}((18, 22, 20, 40), (0.25, 0.25, 0.25, 0.25)) =`)).toBe(
      'χ² = 12.32 (χ²(3)); p = 0.006364 < α = 0.05: reject H₀ (H₀: the data follow the expected frequencies; reject if χ² > 7.8147)',
    )
    expect(text(r`M = \begin{pmatrix} 20 & 30 \\ 30 & 20 \end{pmatrix}`, r`\operatorname{chiquadro}(M) =`)).toBe(
      'χ² = 4 (χ²(1)); p = 0.0455 < α = 0.05: reject H₀ (H₀: the two variables are independent; reject if χ² > 3.8415)',
    )
  })

  it('la statistica inferenziale: gli errori, con gli esempi con il punto', () => {
    const ctx = new Sheet().inferenceContext()
    expect(() => hypothesisTest(args(r`\operatorname{test}(\bar{x} = 10, s = 2, n = 30)`), ctx)).toThrow(
      'The hypothesis is missing: \\mu = 10 (or \\mu > 10), p = 0.5, \\sigma^2 = 4',
    )
    expect(() => confidenceShown(args(r`\operatorname{ic}(\bar{x} = 10, s = 2, n = 30, 2)`), ctx)).toThrow('Write the level as 0.95 (or 95\\%), α as 0.05')
    expect(() => hypothesisTest(args(r`\operatorname{test}(q = 3, \mu > 1)`), ctx)).toThrow("I don't know what q is: write")
    expect(() => confidenceShown(args(r`\operatorname{ic}(s = 2, n = 30)`), ctx)).toThrow('The mean is missing: the data, or \\bar{x} = …')
    expect(() => chiSquareTest(args(r`\operatorname{chiquadro}((1, 2), (1, 2, 3))`), ctx)).toThrow(
      'You need the observed and the expected frequencies (or the probabilities), of the same length',
    )
  })

  it('la trasformata di Laplace (senza parole né decimali)', () => {
    expect(text(r`\mathcal{L}\{t^2\} =`)).toBe('2/s³')
    expect(text(r`\mathcal{L}^{-1}\{\frac{1}{s^2 + 1}\} =`)).toBe('sin(t)')
  })

  it('vettori, matrici e geometria: i risultati, gli errori e i numeri con il punto', () => {
    expect(text(r`r = \operatorname{retta}((0, 0), (1, 1))`, r`C = \operatorname{circonferenza}((5, 0), 1)`, r`\operatorname{intersezione}(r, C) =`)).toBe('∅ (no points)')
    const sheet = new Sheet()
    sheet.add(r`A = \begin{pmatrix} 1 & 2 & 3 \end{pmatrix}`)
    sheet.add(r`B = \begin{pmatrix} 1 & 2 \end{pmatrix}`)
    const scope = sheet.linearScope()
    const error = (src: string) => () => evaluateLinear(parseMath(src), scope, EXACT)
    expect(error(r`\begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}^{-1}`)).toThrow('The matrix is not invertible: the determinant is 0')
    expect(error(r`\begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix} - (1, 2, 3)`)).toThrow('Only matrices of the same size can be subtracted (2 × 2 and 3 × 1)')
    expect(error(r`\begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix} + 2`)).toThrow("You can't add a number and a matrix: is the I missing (A - \\lambda I)?")
    expect(error(r`\operatorname{rango}(2)`)).toThrow('The rank needs a matrix')
    expect(error('A B')).toThrow(
      'To multiply two matrices, the number of columns of the first (3) must equal the number of rows of the second (1)',
    )
    expect(error(r`\operatorname{piano}((0, 0, 0), (1, 1, 1), (2, 2, 2))`)).toThrow('The three points are collinear: infinitely many planes pass through them')
    expect(() => evaluateLinear(parseMath(r`\operatorname{quartili}((1, 2))`), scope, FLOAT)).toThrow(
      'Ask for this one on its own, with “=” at the end: \\operatorname{quartili}(x) =',
    )
    expect(text(r`\operatorname{angolo}((1, 0), (1, 2.0)) =`)).toBe('63.434948…°')
    expect(text(r`\operatorname{autovalori}(\begin{pmatrix} 1.5 & 0 \\ 0 & 2 \end{pmatrix}) =`)).toBe('λ₁ = 1.5; λ₂ = 2')
    // Una frazione con il denominatore grande, scritta da sola: con il punto.
    expect(surdText(new Rational(1n, 3000000n), q(0), 2n).text).toBe('3.333333… · 10⁻⁷')
  })

  it('i sistemi lineari: i risultati con le parole e gli errori', () => {
    const A = r`A = \begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}`
    expect(text(A, r`A x = (1, 2) \Rightarrow`)).toBe('no solution (rank A = 1, rank (A|b) = 2)')
    expect(tex(A, r`A x = (1, 2) \Rightarrow`)).toBe(r`\nexists\ \text{(rank } A = 1\text{, rank } (A|b) = 2\text{)}`)
    expect(text(A, r`A x = (1, 1) \Rightarrow`)).toBe('x = (1, 0) + t(−1, 1) (∞¹ solutions, rank 1)')
    expect(tex(A, r`A x = (1, 1) \Rightarrow`)).toBe(r`\begin{array}{l} x = \left(1, 0\right) + t\left(-1, 1\right) \\ \infty^{1}\ \text{solutions (rank 1)} \end{array}`)
    expect(text(r`x + y = 1, \; x + y = 2 \Rightarrow`)).toBe('no solution (inconsistent)')
    expect(text(r`x + y + z = 1, \; x - y = 0 \Rightarrow`)).toBe('x = 1/2 − 1/2z, y = 1/2 − 1/2z (z arbitrary: infinitely many solutions)')
    expect(text(r`x + k y = 1, \; k x + y = 1 \Rightarrow`)).toBe(
      'k ≠ −1, k ≠ 1: x = 1/(k + 1), y = 1/(k + 1); k = −1: no solution (inconsistent); k = 1: x = 1 − y (y arbitrary: infinitely many solutions)',
    )
    expect(() => matrixSystem([[q(1), q(2)], [q(3), q(4)]], [q(1)], 'x', { comma: false, decimal: false })).toThrow(
      'A has 2 rows: the vector of constants must have 2 components',
    )
  })

  it('la logica: la tavola di verità con T e F, e gli errori', () => {
    expect(text(r`\operatorname{verità}(p \land q) =`)).toBe('true in 1 case out of 4; p ∧ q: T F F F')
    expect(tex(r`\operatorname{verità}(p \land q) =`)).toContain(r`\mathrm{T} & \mathrm{F} & \mathbf{F}`)
    expect(tex(r`\operatorname{verità}(p \land q) =`)).toContain(r`\text{true in 1 case out of 4}`)
    expect(text(r`p \lor \lnot p =`)).toBe('tautology (always true); p ∨ ¬p: T T')
    expect(text(r`(p \Rightarrow q) \Leftrightarrow (\lnot q \Rightarrow \lnot p) =`)).toBe('tautology: the two formulas are equivalent; p ⇒ q ⇔ ¬q ⇒ ¬p: T T T T')
    expect(text(r`p \land \lnot p =`)).toBe('contradiction (always false); p ∧ ¬p: F F')
    expect(text(r`\operatorname{fnd}(p \land \lnot p) =`)).toBe('⊥ (always false)')
    expect(text(r`\operatorname{fnc}(p \lor \lnot p) =`)).toBe('⊤ (always true)')
    expect(() => parseLogic(r`p \land`)).toThrow('The formula is unfinished')
    expect(() => parseLogic(r`p \foo q`)).toThrow('\\foo is not a connective')
    expect(() => truthTable(parseLogic('a b c d e f g'))).toThrow('With 7 letters the table would have 128 rows: too many')
  })

  it('i polinomi: la divisione per il polinomio nullo', () => {
    expect(() => pdivmod([q(1)], [])).toThrow('Division by the zero polynomial')
  })

  it('le serie di potenze: il raggio e gli estremi a parole', () => {
    expect(text(r`\sum_{n=1}^{\infty} \frac{x^n}{n} =`)).toBe('R = 1; converges for x ∈ [−1, 1) (converges at x = −1, does not converge at x = 1)')
    expect(tex(r`\sum_{n=1}^{\infty} \frac{x^n}{n} =`)).toBe(
      r`R = 1,\ \text{converges for } x \in \left[-1, 1\right)\ \text{(converges at } x = -1\text{, does not converge at } x = 1\text{)}`,
    )
    expect(text(r`\sum_{n=0}^{\infty} \frac{x^n}{n!} =`)).toBe('R = +∞; converges for every real x')
    expect(text(r`\sum_{n=0}^{\infty} n! x^n =`)).toBe('R = 0; converges only at x = 0')
  })

  it('le variabili aleatorie: gli errori, con gli esempi con il punto', () => {
    expect(() => randomScope(new Map()).quantile('X', () => 0.5)).toThrow('X is not a random variable: first X \\sim N(0, 1)')
    const vars = randomScope(new Map([['X', makeDistribution('binomial', [10, 0.3])]]))
    const event = { k: 'prob', event: parseMath('Y < 3'), given: null } as Extract<MathNode, { k: 'prob' }>
    expect(() => vars.probability(event, EMPTY_SCOPE, {})).toThrow('The event has no random variable: first $X \\sim B(10, 0.3)$, then P(X \\le 3)')
    expect(text(r`X \sim B(10, 0.3)`, r`P(X \le 3.5) =`)).toBe('0.649610…')
  })

  it('la statistica dei dati: gli errori, i risultati e i numeri con il punto', () => {
    expect(() => dataStatistic('quantile', [1])).toThrow('Write \\operatorname{quantile}(x, 0.9), with x the data')
    expect(() => dataStatistic('quantile', [1, 2, 3, 1.5])).toThrow('The order of a quantile goes from 0 to 1 (0.25 is the first quartile)')
    expect(() => statistic(FLOAT, 'mode', { values: [1, 2], weights: null })).toThrow('There is no mode: the values all have the same frequency')
    expect(() => statistic(FLOAT, 'mode', { values: [1, 1, 2, 2, 3], weights: null })).toThrow(
      'There is more than one mode: ask for them on their own, \\operatorname{moda}(x) =',
    )
    expect(() => statistic(FLOAT, 'mean', { values: [], weights: null })).toThrow('There is no data')
    expect(text(r`\operatorname{media}(1.5, 2.5, 4) =`)).toBe('2.666666…')
  })

  it('come si scrivono i risultati della statistica: le parole, con il punto', () => {
    expect(text(r`\operatorname{moda}((1, 2, 3)) =`)).toBe('none: the values all have the same frequency')
    expect(text(r`\operatorname{moda}((1, 1, 2, 2, 3)) =`)).toBe('1 and 2')
    expect(tex(r`\operatorname{moda}((1, 1, 2, 2, 3)) =`)).toBe(r`1\text{ and } 2`)
    expect(text(r`\operatorname{quartili}((1.5, 2, 3, 4)) =`)).toBe('Q₁ = 1.875; Q₂ = 2.5; Q₃ = 3.25')
    expect(text(r`\operatorname{frequenze}((2.5, 3, 3, 5)) =`)).toBe('2.5: 1 (0.25; 0.25); 3: 2 (0.5; 0.75); 5: 1 (0.25; 1); total 4')
    expect(tex(r`\operatorname{frequenze}((2.5, 3, 3, 5)) =`)).toBe(
      r`\begin{array}{r|r|r|r} \text{value} & \text{freq.} & \text{relative} & \text{cumulative} \\ \hline 2.5 & 1 & 0.25 & 0.25 \\ 3 & 2 & 0.5 & 0.75 \\ 5 & 1 & 0.25 & 1 \\ \hline \text{total} & 4 & 1 & \end{array}`,
    )
    expect(text(r`\operatorname{statistiche}((2.5, 3, 3, 5)) =`)).toBe(
      'n: 4. Mean: 3.375. Median: 3. Mode: 3. Minimum and maximum: 2.5, 5. Range: 2.5. Quartiles: Q₁ = 2.875; Q₂ = 3; Q₃ = 3.5. ' +
        'Interquartile range: 0.625. Variance: 0.921875. Standard deviation: 0.960143…. Sample variance (n − 1): 1.229166…. ' +
        'Sample standard deviation: 1.108677…',
    )
    expect(text(r`\operatorname{regressione}((1, 2, 3.5), (2, 4, 5)) =`)).toBe('y = 1.157894…x + 1.157894… (r = 0.953820…)')
  })

  it('la lingua si legge quando si chiede il risultato (anche per la spiegazione con l’AI)', () => {
    const sheet = new Sheet()
    expect(sheet.add(r`\operatorname{primo}(97) =`)?.text).toBe('yes, 97 is prime')
    setLangForTests('it')
    expect(sheet.add(r`\operatorname{primo}(97) =`)?.text).toBe('sì, 97 è primo')
    expect(() => makeDistribution('binomial', [10])).toThrow('Questa distribuzione vuole 2 parametri: X \\sim B(10, 0{,}3)')
    setLangForTests('en')
    expect(sheet.add(r`\operatorname{primo}(97) =`)?.text).toBe('yes, 97 is prime')
  })
})
