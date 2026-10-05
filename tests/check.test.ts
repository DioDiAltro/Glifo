import { describe, expect, it } from 'vitest'
import { Sheet } from '../src/math/sheet'

const r = String.raw

/** Il controllo dell'ultima formula (✓, ✓≈ se arrotondata, ✗ con il valore giusto), con le formule prima come definizioni. */
function check(...formulas: string[]): string | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.read(f)
  const c = last?.check
  if (!c) return null
  return c.ok ? (c.rounded ? '✓≈' : '✓') : `✗ ${c.value?.text}`
}

describe('il controllo delle uguaglianze scritte (✓/✗)', () => {
  it('un integrale con il risultato scritto: giusto o sbagliato, con quello giusto', () => {
    expect(check(r`\int_0^1 x^2 \, dx = \frac{1}{3}`)).toBe('✓')
    expect(check(r`\int_0^1 x^2 \, dx = \frac{1}{2}`)).toBe('✗ 1/3')
    expect(check(r`\int_0^{\pi} \sin x \, dx = 2`)).toBe('✓')
    expect(check(r`\int_0^1 \frac{1}{1 + x^2} \, dx = \frac{\pi}{4}`)).toBe('✓')
  })

  it('con le lettere: il volume della sfera', () => {
    expect(check(r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx = \frac{4}{3} \pi R^3`)).toBe('✓')
    expect(check(r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx = \frac{2}{3} \pi R^3`)).toBe('✗ (4πR³)/3')
    expect(check(r`\int_0^{2\pi} \int_0^{\pi} \int_0^R \rho^2 \sin\varphi \, d\rho \, d\varphi \, d\theta = \frac{4}{3} \pi R^3`)).toBe('✓')
    // Con un nome davanti: il nome si definisce e il resto si controlla.
    expect(check(r`V = \int_{-R}^{R} \pi (R^2 - x^2) \, dx = \frac{4}{3} \pi R^3`)).toBe('✓')
  })

  it('i conti con i numeri, anche scritti al contrario', () => {
    expect(check('2 + 2 = 4')).toBe('✓')
    expect(check('2 + 2 = 5')).toBe('✗ 4')
    expect(check('5 = 2 + 2')).toBe('✗ 4')
    expect(check(r`\binom{5}{2} = 10`)).toBe('✓')
  })

  it('i numeri con la virgola: arrotondati o troncati alle cifre scritte', () => {
    expect(check(r`\sqrt{2} = 1{,}414`)).toBe('✓≈')
    expect(check(r`\sqrt{2} = 1{,}415`)).toBe('✗ 1,414213…')
    expect(check(r`\pi = 3{,}1415`)).toBe('✓≈')
    expect(check(r`\pi \approx 3{,}14`)).toBe('✓≈')
    expect(check(r`\frac{1}{4} = 0{,}25`)).toBe('✓')
    expect(check(r`\frac{1}{3} = 0{,}33`)).toBe('✓≈')
    // Un intero è esatto: non è √2 arrotondato.
    expect(check(r`\sqrt{2} = 1`)).toBe('✗ 1,414213…')
    // Con ≈ un'altra approssimazione non si giudica.
    expect(check(r`\pi \approx \frac{22}{7}`)).toBeNull()
  })

  it('i risultati scritti da Glifo (con Tab) tornano giusti', () => {
    expect(check(r`\int_0^1 e^x \, dx = e - 1 \approx 1{,}718281\ldots`)).toBe('✓≈')
    expect(check(r`\int_0^1 \int_0^1 e^{-x^2 y^2} \, dy \, dx = 0{,}905940\ldots`)).toBe('✓≈')
    expect(check('R = 2', r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx = \frac{32\pi}{3} \approx 33{,}510321\ldots`)).toBe('✓≈')
  })

  it('ogni risultato di Glifo, scritto con Tab, torna giusto (anche troncato, anche dentro un\'espressione)', () => {
    const cases: string[][] = [
      [r`|1 + i| =`],
      [r`\arg(1 + 2i) =`],
      [r`2 e^{i \pi / 3} =`],
      [r`\ln(-1) =`],
      [r`\cos(i) =`],
      [r`\sqrt{i} + 1 =`],
      [r`\int_0^1 e^{-x^2} \, dx =`],
      [r`\int_0^{\infty} e^{-x^2} \, dx =`],
      [r`\sum_{n=1}^{\infty} \frac{1}{n^3} =`],
      [r`\frac{d}{dx} x^x =`],
      [r`\int x e^x \, dx =`],
      [r`X \sim N(0, 1)`, r`P(X \le 1{,}5) =`],
      [r`A = \begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix}`, r`A^{-1} =`],
      [r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx =`],
      [r`10^{-7} \cdot 1{,}234567 =`],
    ]
    for (const formulas of cases) {
      const sheet = new Sheet()
      for (const f of formulas.slice(0, -1)) sheet.add(f)
      const last = formulas[formulas.length - 1]
      const result = sheet.read(last).result
      expect(result, last).not.toBeNull()
      const again = new Sheet()
      for (const f of formulas.slice(0, -1)) again.add(f)
      const check = again.read(`${last} ${result!.tex}`).check
      expect(check?.ok, `${last} ${result!.tex}`).toBe(true)
    }
  })

  it('una catena: ogni passaggio deve valere quanto il primo; le parti che non si leggono si saltano', () => {
    expect(check(r`\int_0^1 x^2 \, dx = \left[\frac{x^3}{3}\right]_0^1 = \frac{1}{3}`)).toBe('✓')
    expect(check(r`\int_0^1 x^2 \, dx = \frac{1^3}{3} - \frac{0^3}{3} = \frac{1}{3}`)).toBe('✓')
    expect(check(r`\int_0^1 x^2 \, dx = \frac{1}{3} = 0{,}5`)).toBe('✗ 1/3')
  })

  it('la primitiva tra gli estremi, scritta in tanti modi, è un passaggio della catena', () => {
    expect(check(r`\int_0^1 x^2 \, dx = \left[\frac{x^3}{2}\right]_0^1 = \frac{1}{2}`)).toBe('✗ 1/3')
    expect(check(r`\int_0^2 x \, dx = \Big[\frac{x^2}{2}\Big]_0^2 = 2`)).toBe('✓')
    expect(check(r`\int_0^{\pi} \sin x \, dx = \left. -\cos x \right|_0^{\pi} = 2`)).toBe('✓')
    expect(check(r`\int_1^e \frac{1}{x} \, dx = [\ln x]_1^e = 1`)).toBe('✓')
    expect(check(r`\int_0^1 x^2 \, dx = \frac{x^3}{3} \Big|_0^1 = \frac{1}{3}`)).toBe('✓')
    expect(check(r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx = \pi \left[R^2 x - \frac{x^3}{3}\right]_{-R}^{R} = \frac{4}{3} \pi R^3`)).toBe('✓')
  })

  it('i ragionamenti con le frecce non si controllano', () => {
    expect(check(r`2 \cdot 3 = 6 \Rightarrow x = 2`)).toBeNull()
    expect(check(r`x^2 = 4 \Rightarrow x = \pm 2`)).toBeNull()
    expect(check(r`x^2 = 4 \iff x = 2 \lor x = -2`)).toBeNull()
  })

  it('i risultati che Glifo mostra come formule: Laplace, Taylor, gli insiemi, φ, i polinomi', () => {
    expect(check(r`\mathcal{L}\{t\} = \frac{1}{s^2}`)).toBe('✓')
    expect(check(r`\mathcal{L}\{t\} = \frac{1}{s}`)).toBe('✗ 1/s²')
    expect(check(r`\operatorname{taylor}(\sin x, 0, 3) = x - \frac{x^3}{6}`)).toBe('✓')
    expect(check(r`\varphi(12) = 4`)).toBe('✓')
    expect(check(r`\varphi(12) = 6`)).toBe('✗ 4')
    expect(check(r`\gcd(12, 18) = 6`)).toBe('✓')
    expect(check(r`A = \{3, 1, 2\}`, r`B = \{2, 5\}`, r`A \cup B = \{5, 3, 2, 1\}`)).toBe('✓')
    expect(check(r`A = \{3, 1, 2\}`, r`B = \{2, 5\}`, r`A \cap B = \{1\}`)).toBe('✗ {2}')
    expect(check(r`\nabla (x^2 y) = (2xy, x^2)`)).toBe('✓')
    expect(check(r`\nabla (x^2 y) = (2x, x^2)`)).toBe('✗ (2xy, x²)')
  })

  it('le definizioni e le equazioni non si controllano', () => {
    expect(check('a = 2')).toBeNull()
    // In una dimostrazione per assurdo.
    expect(check('1 = 2')).toBeNull()
    expect(check(r`f(x) = x^2 + 1`)).toBeNull()
    expect(check('x^2 - 5x + 6 = 0')).toBeNull()
    expect(check(r`\sin^2 x + \cos^2 x = 1`)).toBeNull()
  })

  it('in a = 3 + 4 = 7 (il risultato scritto con Tab) a resta definita', () => {
    expect(check('a = 3 + 4 = 7')).toBe('✓')
    expect(check('a = 3 + 4 = 8')).toBe('✗ 7')
    const sheet = new Sheet()
    sheet.add('a = 3 + 4 = 7')
    expect(sheet.add('2a =')?.text).toBe('14')
  })

  it('le funzioni della nota, le derivate e le primitive', () => {
    expect(check(r`f(x) = x^2`, 'f(3) = 9')).toBe('✓')
    expect(check(r`f(x) = x^2`, "f'(3) = 6")).toBe('✓')
    expect(check(r`f(x) = x^2`, "f'(x) = 2x")).toBe('✓')
    expect(check(r`f(x) = x^2`, "f'(x) = x")).toBe('✗ 2x')
    expect(check(r`\frac{d}{dx} \sin x = \cos x`)).toBe('✓')
    expect(check(r`\int x^2 \, dx = \frac{x^3}{3} + c`)).toBe('✓')
    expect(check(r`\int x^2 \, dx = x^3 + c`)).toBe('✗ x³/3 + c')
    // Il valore in π o in i: non è una funzione con la variabile π (una volta lo diventava).
    expect(check(r`f(x) = \sin x`, r`f(\pi) = 0`)).toBe('✓')
    expect(check('f(z) = z^2 + 1', 'f(i) = 0')).toBe('✓')
    expect(check('f(z) = z^2 + 1', 'f(i) = 1')).toBe('✗ 0')
    expect(check(r`y'' + y = 0, \; y(0) = 1, \; y'(0) = 0`, r`y(\pi) = -1`)).toBe('✓')
    expect(check(r`y' = y, \; y(0) = 1`, r`y(1) = 2{,}718`)).toBe('✓≈')
  })

  it('limiti, serie e infiniti', () => {
    expect(check(r`\lim_{x \to 0} \frac{\sin x}{x} = 1`)).toBe('✓')
    expect(check(r`\lim_{x \to 0} \frac{\sin x}{x} = 0`)).toBe('✗ 1')
    expect(check(r`\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}`)).toBe('✓')
    expect(check(r`\lim_{x \to 0^+} \frac{1}{x} = +\infty`)).toBe('✓')
    expect(check(r`\lim_{x \to 0^+} \frac{1}{x} = 0`)).toBe('✗ +∞')
  })

  it('numeri complessi, matrici e probabilità', () => {
    expect(check('(1 + i)^2 = 2i')).toBe('✓')
    expect(check(r`e^{i\pi} + 1 = 0`)).toBe('✓')
    // La forma polare con l'angolo troncato: l'errore nell'angolo pesa √10 volte.
    expect(check(r`w = 3 - i = \sqrt{10}\,e^{-i\,0{,}321750554\ldots}`)).toBe('✓≈')
    expect(check(r`w = 3 - i = \sqrt{10}\,e^{-i\,0{,}33}`)).toMatch(/^✗/)
    expect(check(r`\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}^{-1} = \begin{pmatrix} -2 & 1 \\ \frac{3}{2} & -\frac{1}{2} \end{pmatrix}`)).toBe('✓')
    expect(check(r`A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}`, r`\det A = 2`)).toBe('✗ −2')
    expect(check(r`\begin{vmatrix} 1 & 2 \\ 3 & 4 \end{vmatrix} = -2`)).toBe('✓')
    expect(check(r`A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}`, r`A^2 = \begin{pmatrix} 7 & 10 \\ 15 & 22 \end{pmatrix}`)).toBe('✓')
    expect(check(r`A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}`, r`A^2 = \begin{pmatrix} 7 & 10 \\ 15 & 20 \end{pmatrix}`)).toMatch(/^✗/)
    expect(check('(1, 2) + (3, 4) = (4, 6)')).toBe('✓')
    expect(check(r`X \sim B(10, 0{,}3)`, r`P(X = 3) = 0{,}2668`)).toBe('✓≈')
  })
})
