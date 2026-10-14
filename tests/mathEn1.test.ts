import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { setLangForTests } from '../src/i18n'
import { Sheet } from '../src/math/sheet'
import { parseMath, parseStatement } from '../src/math/parse'
import { compile, EMPTY_SCOPE, errorMessage } from '../src/math/evaluate'
import { toLatex } from '../src/math/latex'
import { checkHtml, checkTitle } from '../src/render/check'

/**
 * I conti in inglese (la parte A di src/math): i risultati con le parole, gli errori, lo studio di
 * funzione e i numeri con il punto. In italiano resta tutto come prima (lo dicono le altre prove).
 */

const r = String.raw

/** Quello che Glifo dice dell'ultima formula, con le formule prima come definizioni. */
function line(...formulas: string[]) {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.read(f)
  return last
}

/** Il risultato dell'ultima formula, com'è scritto nell'editor. */
const text = (...formulas: string[]) => line(...formulas)?.result?.text ?? null

/** Il risultato senza la tabella dei passi (che nel testo viene dopo). */
const verdict = (...formulas: string[]) => text(...formulas)?.split(' (steps:')[0] ?? null

/** Il messaggio di quando la formula non si legge. */
function readError(src: string): string | null {
  try {
    parseMath(src)
    return null
  } catch (err) {
    return errorMessage(err)
  }
}

/** Il messaggio di quando la formula si legge ma non si calcola. */
function calcError(src: string): string | null {
  try {
    compile(parseMath(src), EMPTY_SCOPE, { calc: true })({})
    return null
  } catch (err) {
    return errorMessage(err)
  }
}

/** Le righe dello studio di funzione: { Domain: '…', Sign: '…' }. */
function study(...formulas: string[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const row of (text(...formulas) ?? '').split('. ')) {
    const i = row.indexOf(': ')
    if (i > 0) out[row.slice(0, i)] = row.slice(i + 2)
  }
  return out
}

beforeEach(() => setLangForTests('en'))
afterEach(() => setLangForTests('it'))

describe('i numeri con il punto', () => {
  it('quando li sceglie Glifo', () => {
    expect(text(r`\sqrt{2} =`)).toBe('1.414213…')
    expect(line(r`\sqrt{2} =`)?.result?.tex).toBe(r`1.414213\ldots`)
    expect(text(r`1/3 =`)).toBe('0.333333…')
    expect(text(r`\frac{1}{3} =`)).toBe('0.333333…')
    expect(text(r`\pi =`)).toBe('3.141592…')
    // I decimali dei conti con le lettere.
    expect(text(r`f(x) = 0.3 x^2`, r`f'(x) =`)).toBe('0.6x')
    expect(line(r`f(x) = 0.3 x^2`, r`f'(x) =`)?.result?.tex).toBe('0.6x')
  })

  it('come li ha scritti chi prende appunti', () => {
    expect(text(r`0{,}5 + 1 =`)).toBe('1,5')
    expect(line(r`0{,}5 + 1 =`)?.result?.tex).toBe('1{,}5')
    expect(text(r`0.5 + 1 =`)).toBe('1.5')
  })

  it('in italiano con la virgola, come prima', () => {
    setLangForTests('it')
    expect(text(r`\sqrt{2} =`)).toBe('1,414213…')
    expect(text(r`1/3 =`)).toBe('0,333333…')
    expect(text(r`f(x) = 0.3 x^2`, r`f'(x) =`)).toBe('0,6x')
    expect(text(r`0.5 + 1 =`)).toBe('1.5')
  })

  it('nel calcolo numerico, con le coordinate separate dalla virgola', () => {
    expect(verdict(r`\operatorname{bisezione}(x^3 - x - 2, [1, 2]) =`)).toBe('x ≈ 1.521380424 (20 steps, (b − a)/2 < 10⁻⁶)')
    expect(line(r`\operatorname{bisezione}(x^3 - x - 2, [1, 2]) =`)?.result?.tex).toContain(r`1 & 1 & 2 & 1.5 & -0.125`)
    expect(verdict(r`\operatorname{newton}(x^3 - x - 2, 1.5) =`)).toBe('x ≈ 1.5213797068 (3 steps)')
    expect(verdict(r`\operatorname{jacobi}(\begin{pmatrix} 4 & 1 \\ 1 & 3 \end{pmatrix}, (1, 2)) =`)).toBe(
      'ρ(B) ≈ 0.2887: converges (diagonally dominant), x ≈ (0.090909091, 0.63636364)',
    )
  })
})

describe('i controlli delle uguaglianze', () => {
  it('giusto, arrotondato o sbagliato con il valore giusto', () => {
    expect(line(r`\sqrt{2} = 1.414`)?.check).toEqual({ ok: true, rounded: true })
    expect(line(r`\sqrt{2} = 1.5`)?.check).toEqual({ ok: false, value: { tex: r`1.414213\ldots`, text: '1.414213…' } })
    expect(line(r`\int_0^1 x^2 \, dx = 0.5`)?.check).toEqual({ ok: false, value: { tex: r`\frac{1}{3}`, text: '1/3' } })
  })

  it('in una formula su più righe (\\\\) il ✗ dice la riga sbagliata', () => {
    const check = line(r`6^3 = 216 \\ 324 - 216 = 216 \\ 216 * 2 =`)!.check!
    expect(check).toMatchObject({ ok: false, line: 2 })
    expect(checkTitle(check)).toBe('Wrong according to Glifo on line 2: the correct value is 108')
    expect(checkHtml(check)).toContain('✗ line 2: should be')
  })

  it('nella lingua di quando si controlla (anche la stessa formula già controllata)', () => {
    setLangForTests('it')
    expect(line(r`\sqrt{3} = 1.8`)?.check?.value?.text).toBe('1,732050…')
    setLangForTests('en')
    expect(line(r`\sqrt{3} = 1.8`)?.check?.value?.text).toBe('1.732050…')
  })
})

describe('gli errori', () => {
  it('di lettura', () => {
    expect(readError('(1 + 2')).toBe('Missing the closing )')
    expect(readError('x^')).toBe('Missing the exponent after ^')
    expect(readError('2 3')).toBe('Two numbers in a row: is an operation missing?')
    expect(readError('')).toBe('The expression is empty')
    expect(readError(r`\foo`)).toBe(r`I can't calculate \foo`)
    expect(readError(')')).toBe('Something is missing before “)”')
    expect(readError(r`\frac{1}`)).toBe(r`Missing the denominator of \frac`)
    expect(readError(r`\int_0 x \, dx`)).toBe(r`An integral needs both bounds, e.g. \int_0^1, or none: \int x \, dx`)
    expect(readError(r`X \sim Q(3)`)).toMatch(/^I don't know the distribution “Q”: for example B\(n, p\)/)
    // Gli esempi con i decimali dell'inglese.
    expect(readError(r`X \sim B`)).toBe(r`The distribution is missing its parameters: X \sim B(10, 0.3)`)
  })

  it('nella lingua di quando succedono', () => {
    setLangForTests('it')
    expect(readError('(1 + 2')).toBe('Manca la parentesi )')
    expect(readError(r`X \sim B`)).toBe(r`Mancano i parametri della distribuzione: X \sim B(10, 0{,}3)`)
    setLangForTests('en')
    expect(readError('(1 + 2')).toBe('Missing the closing )')
  })

  it('di calcolo', () => {
    expect(calcError('a + 1')).toBe('a is not defined')
    expect(calcError(r`\nabla (x^2 + y^2)`)).toBe('The gradient is a vector: calculate it in the note, with “=”')
    expect(calcError(r`\max_{x > 0}(2)`)).toBe(r`The maximum over a set is written on its own: \max_{…} f =`)
    expect(errorMessage(new Error('?'))).toBe('Invalid expression')
  })
})

describe('i risultati con le parole', () => {
  it('limiti ed equazioni', () => {
    expect(text(r`\lim_{x \to 0} \frac{1}{x} =`)).toBe('does not exist (from the left −∞, from the right +∞)')
    expect(line(r`\lim_{x \to 0} \frac{1}{x} =`)?.result?.tex).toBe(r`\nexists \quad \text{(from the left } -\infty\text{, from the right } +\infty\text{)}`)
    expect(text(r`\lim_{x \to 0} \sin \frac{1}{x} =`)).toBe('does not exist')
    expect(text(r`x^2 - 4x + 4 = 0 \Rightarrow`)).toBe('x = 2 (double)')
    expect(text(r`x^2 + 2x + 5 = 0 \Rightarrow`)).toBe('no real solution (in ℂ: x = −1 ± 2i)')
    // «inconsistent», come nei sistemi (src/math/linsys.ts).
    expect(text(r`x + 1 = x \Rightarrow`)).toBe('no solution (inconsistent)')
    expect(text(r`x + 1 = x + 1 \Rightarrow`)).toBe("all x (it's an identity)")
    expect(text(r`x^2 < 0 \Rightarrow`)).toBe('no solution')
  })

  it('in più variabili', () => {
    expect(text(r`\operatorname{critici}(x^2 - y^2) =`)).toBe('(0, 0) saddle point')
    expect(text(r`\operatorname{critici}(x^2 + y^2) =`)).toBe('(0, 0) local minimum, f = 0')
    expect(text(r`\lim_{(x, y) \to (0, 0)} \frac{x y}{x^2 + y^2} =`)).toBe('does not exist (along y = 0 it is 0, along y = x it is 1/2)')
    expect(text(r`\operatorname{lagrange}(x + y, x^2 + y^2 = 1) =`)).toBe('max √2 at (√2/2, √2/2); min −√2 at (−√2/2, −√2/2)')
  })

  it('gli spazi vettoriali', () => {
    expect(text(r`A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}`, r`\operatorname{diagonalizza}(A) =`)).toBe(
      'not diagonalizable: λ = 1 has algebraic multiplicity 2 and geometric multiplicity 1',
    )
    expect(text(r`A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}`, r`\operatorname{diagonalizza}(A) =`)).toContain('; orthogonal: P = ')
    expect(text(r`q(x, y, z) = x^2 + y^2 + z^2 + xy`, r`\operatorname{segnatura}(q) =`)).toBe('positive definite: (n₊, n₋, n₀) = (3, 0, 0)')
    expect(text(r`u = (1, 0, 0)`, r`v = (0, 1, 0)`, r`\operatorname{indipendenti}(u, v) =`)).toBe('yes: they are linearly independent')
    expect(text(r`\operatorname{gramschmidt}((1, 1, 0), (1, 0, 1), (2, 1, 1)) =`)).toBe(
      'u₁ = (1, 1, 0), u₂ = (1/2, −1/2, 1); orthonormal: e₁ = (√2/2, √2/2, 0), e₂ = (√6/6, −√6/6, √6/3); (one vector depends on the previous ones)',
    )
  })

  it('le equazioni di tutto lo spazio, con \\text scritto bene (prima la \\t era una tabulazione)', () => {
    const U = r`U = \operatorname{span}((1, 0), (0, 1))`
    expect(line(U, r`\operatorname{equazioni}(U) =`)?.result).toEqual({ tex: r`\text{none: it is the whole space}`, text: 'none: it is the whole space' })
    setLangForTests('it')
    expect(line(U, r`\operatorname{equazioni}(U) =`)?.result).toEqual({ tex: r`\text{nessuna: è tutto lo spazio}`, text: 'nessuna: è tutto lo spazio' })
  })

  it('le equazioni differenziali e il calcolo numerico', () => {
    expect(text(r`y'' + y = 0, y(0) = 0, y(\pi) = 0 \Rightarrow`)).toBe('y = c sin(x) (infinitely many solutions)')
    expect(text(r`y' = y^2 \Rightarrow`)).toBe('y = 1/(c − x) (and y = 0)')
    expect(text(r`\operatorname{trapezi}(e^{x^2}, [0, 1], 4) =`)).toBe('≈ 1.490678862 (trapezoidal, n = 4; error ≈ 0.028)')
    expect(text(r`\operatorname{rettangoli}(x^2, [0, 1], 10) =`)).toBe('≈ 0.3325 (midpoint, n = 10; error ≈ 0.000833)')
    expect(text(r`\operatorname{interpola}((0, 1), (1, 3), (2, 2)) =`)).toBe('p(x) = −(3/2)x² + (7/2)x + 1 (degree ≤ 2)')
    expect(verdict(r`\operatorname{eulero}(y' = y, y(0) = 1, 0.1, 10) =`)).toBe('y(1) ≈ 2.59374246 (Euler; error ≈ 0.125)')
    expect(verdict(r`\operatorname{puntofisso}(x + 1, 1) =`)).toBe("doesn't converge: the iterates don't settle")
  })
})

describe('lo studio di funzione', () => {
  it('tutte le righe', () => {
    const s = study(r`f(x) = \frac{x^2 + 1}{x}`, r`\operatorname{studio}(f) =`)
    expect(s.Domain).toBe('x ≠ 0')
    expect(s.Symmetry).toBe('odd')
    expect(s.Intercepts).toBe('no zeros')
    expect(s.Sign).toBe('f(x) > 0 for x > 0; f(x) < 0 for x < 0')
    expect(s.Limits).toBe('lim x→−∞ f(x) = −∞; lim x→0⁻ f(x) = −∞; lim x→0⁺ f(x) = +∞; lim x→+∞ f(x) = +∞')
    expect(s.Asymptotes).toBe('vertical x = 0; oblique y = x (x → ±∞)')
    expect(s.Derivative).toBe("f'(x) = (x² − 1)/x²")
    expect(s.Monotonicity).toBe('increasing for x < −1 ∨ x > 1; decreasing for −1 < x < 0 ∨ 0 < x < 1')
    expect(s['Maxima and minima']).toBe('maximum (−1, −2); minimum (1, 2)')
    expect(s['Second derivative']).toBe("f''(x) = 2/x³")
    expect(s.Concavity).toBe('convex for x > 0; concave for x < 0')
    expect(s['Inflection points']).toBe('none')
    expect(line(r`\operatorname{studio}(\frac{x^2 + 1}{x}) =`)?.result?.tex).toContain(r`\textbf{Asymptotes:} \\ \quad \text{vertical } x = 0 \\ \quad \text{oblique } y = x\ (x \to \pm\infty)`)
  })

  it('la tangente, il periodo, la retta, i decimali', () => {
    expect(study(r`\operatorname{studio}(|x|) =`)['Maxima and minima']).toBe('minimum (0, 0) (corner point)')
    expect(study(r`\operatorname{studio}(|x|) =`).Concavity).toBe('neither convex nor concave (it is a line)')
    expect(study(r`\operatorname{studio}(x^3) =`)['Inflection points']).toBe('(0, 0) (horizontal tangent)')
    expect(study(r`\operatorname{studio}(x^3) =`).Monotonicity).toBe('increasing for all x')
    expect(study(r`\operatorname{studio}(\sin x) =`).Period).toBe('2π (studied on [0, 2π])')
    expect(study(r`\operatorname{studio}(\sqrt{x^2 - 4}) =`).Intercepts).toBe('zeros: x = −2, x = 2')
    expect(study(r`\operatorname{studio}(\sqrt{x^2 - 4}) =`).Symmetry).toBe('even')
    expect(study(r`\operatorname{studio}(0.5 x^2 - x) =`)['Maxima and minima']).toBe('minimum (1, −0.5)')
  })

  it('le sue parti', () => {
    expect(text(r`\operatorname{asintoti}(\frac{x^2 + 1}{x}) =`)).toBe('vertical x = 0, oblique y = x (x → ±∞)')
    expect(text(r`\operatorname{estremi}(x^3 - 3x) =`)).toBe('maximum (−1, 2), minimum (1, −2)')
    expect(text(r`\operatorname{flessi}(x) =`)).toBe('none')
    expect(text(r`\operatorname{zeri}(x^2 + 1) =`)).toBe('none')
    expect(text(r`\operatorname{dominio}(\ln x) =`)).toBe('x > 0')
  })

  it('in italiano come prima', () => {
    setLangForTests('it')
    const s = study(r`f(x) = \frac{x^2 + 1}{x}`, r`\operatorname{studio}(f) =`)
    expect(s.Asintoti).toBe('x = 0 verticale; y = x (x → ±∞) obliquo')
    expect(s['Massimi e minimi']).toBe('massimo (−1; −2); minimo (1; 2)')
  })
})

describe('le formule che Glifo riscrive', () => {
  it('«altrimenti» e «o» nella lingua di Glifo, e si rileggono', () => {
    const cases = parseMath(r`\begin{cases} x & x > 0 \\ -x & \text{altrimenti} \end{cases}`)
    expect(toLatex(cases)).toBe(r`\begin{cases} x & x > 0 \\ -x & \text{otherwise} \end{cases}`)
    expect(parseMath(toLatex(cases))).toEqual(cases)
    const cond = parseStatement(r`y = x \text{ per } x < 0 \text{ o } x > 1`).cond!
    expect(toLatex(cond)).toBe(r`x < 0\ \text{or}\ x > 1`)
    expect(parseStatement(`y = x \\text{ per } ${toLatex(cond)}`).cond).toEqual(cond)
    setLangForTests('it')
    expect(toLatex(cases)).toBe(r`\begin{cases} x & x > 0 \\ -x & \text{altrimenti} \end{cases}`)
  })
})
