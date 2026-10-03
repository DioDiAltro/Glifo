import { describe, expect, it } from 'vitest'
import { Sheet } from '../src/math/sheet'
import { parseMath } from '../src/math/parse'
import { toLatex } from '../src/math/latex'
import { formulaGraph, parseGraph, type GraphItem } from '../src/graph/spec'

const r = String.raw

/** Il risultato dell'ultima formula, con le formule prima come definizioni. */
function text(...formulas: string[]): string | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last?.text ?? null
}

const kinds = (items: GraphItem[]) => items.map((i) => (i.dashed ? `${i.kind} tratteggiata` : i.kind))

describe('le serie numeriche', () => {
  it('a segni alterni con i termini che vanno piano a zero: convergono (Leibniz)', () => {
    // Prima risultavano «non esiste»: 1/√n e 1/ln n calano poco tra 10³ e 10⁵.
    expect(text(r`\sum_{n=1}^{\infty} \frac{(-1)^n}{\sqrt{n}} =`)).toBe('−0,604898…')
    expect(text(r`\sum_{n=2}^{\infty} \frac{(-1)^n}{\ln n} =`)).toBe('0,924299…')
    // Con un segno solo divergono, e con i termini che non vanno a zero non converge.
    expect(text(r`\sum_{n=1}^{\infty} \frac{1}{\sqrt{n}} =`)).toBe('+∞')
    expect(text(r`\sum_{n=1}^{\infty} (-1)^n (1 + \frac{1}{n}) =`)).toBe('non esiste')
  })
})

describe('le serie di potenze', () => {
  it('il raggio e l\'insieme di convergenza, con gli estremi', () => {
    expect(text(r`\sum_{n=1}^{\infty} \frac{x^n}{n} =`)).toBe('R = 1; converge per x ∈ [−1, 1) (in x = −1 converge, in x = 1 non converge)')
    expect(text(r`\sum_{n=0}^{\infty} x^n =`)).toBe('R = 1; converge per x ∈ (−1, 1) (in x = −1 non converge, in x = 1 non converge)')
    expect(text(r`\sum_{n=1}^{\infty} \frac{(x-2)^n}{n 3^n} =`)).toBe('R = 3; converge per x ∈ [−1, 5) (in x = −1 converge, in x = 5 non converge)')
    expect(text(r`\sum_{n=1}^{\infty} \frac{(2x - 1)^n}{n^2} =`)).toBe('R = 1/2; converge per x ∈ [0, 1] (in x = 0 converge, in x = 1 converge)')
    expect(text(r`\sum_{n=0}^{\infty} (-1)^n \frac{x^{2n+1}}{2n+1} =`)).toBe('R = 1; converge per x ∈ [−1, 1] (in x = −1 converge, in x = 1 converge)')
    expect(text(r`\sum_{n=1}^{\infty} \frac{x^n}{\sqrt{n}} =`)).toBe('R = 1; converge per x ∈ [−1, 1) (in x = −1 converge, in x = 1 non converge)')
  })

  it('il raggio infinito, zero, o una costante nota (con i fattoriali e n^n)', () => {
    expect(text(r`\sum_{n=0}^{\infty} \frac{x^n}{n!} =`)).toBe('R = +∞; converge per ogni x reale')
    expect(text(r`\sum_{n=0}^{\infty} \frac{x^{2n}}{(2n)!} =`)).toBe('R = +∞; converge per ogni x reale')
    expect(text(r`\sum_{n=0}^{\infty} n! x^n =`)).toBe('R = 0; converge solo in x = 0')
    expect(text(r`\sum_{n=1}^{\infty} \frac{n^n}{n!} x^n =`)).toBe('R = 1/e ≈ 0,367879…; converge per x ∈ [−1/e, 1/e) (in x = −1/e converge, in x = 1/e non converge)')
    // Con x definita è una serie di numeri.
    expect(text('x = 1/2', r`\sum_{n=0}^{\infty} x^n =`)).toBe('2')
  })
})

describe('la serie di Fourier', () => {
  it('i coefficienti con le lettere, e se la funzione è pari o dispari', () => {
    expect(text(r`\operatorname{fourier}(x) =`)).toBe('a₀ = 0; aₙ = 0 (la funzione è dispari); bₙ = (2(−1)^(n + 1))/n; x ~ Σ_{n≥1} (2(−1)^(n + 1))/n sin(nx)')
    expect(text(r`\operatorname{fourier}(x^2) =`)).toBe('a₀ = (2π²)/3; aₙ = (4(−1)^(n))/n²; bₙ = 0 (la funzione è pari); x² ~ π²/3 + Σ_{n≥1} (4(−1)^(n))/n² cos(nx)')
    expect(text(r`\operatorname{fourier}(|x|) =`)).toBe('a₀ = π; aₙ = (2(−1)^(n) − 2)/(πn²); bₙ = 0 (la funzione è pari); |x| ~ π/2 + Σ_{n≥1} (2(−1)^(n) − 2)/(πn²) cos(nx)')
  })

  it('a tratti, su un altro intervallo, con i coefficienti a parte (x sin x: a₁)', () => {
    expect(text(r`f(x) = \begin{cases} -1 & -\pi < x < 0 \\ 1 & 0 \le x < \pi \end{cases}`, r`\operatorname{fourier}(f) =`)).toBe(
      'a₀ = 0; aₙ = 0 (la funzione è dispari); bₙ = (2 − 2(−1)^(n))/(πn); f(x) ~ Σ_{n≥1} (2 − 2(−1)^(n))/(πn) sin(nx)',
    )
    expect(text(r`\operatorname{fourier}(x \sin x) =`)).toBe('a₀ = 2; a₁ = −1/2; aₙ = (2(−1)^(n + 1))/(n² − 1) (n ≥ 2); bₙ = 0 (la funzione è pari); x sin(x) ~ 1 − 1/2 cos(x) + Σ_{n≥2} (2(−1)^(n + 1))/(n² − 1) cos(nx)')
    expect(text(r`\operatorname{fourier}(\cos(x)^2) =`)).toBe('a₀ = 1; a₂ = 1/2; aₙ = 0 (n ≠ 2); bₙ = 0 (la funzione è pari); cos(x)² ~ 1/2 + 1/2 cos(2x)')
    expect(text(r`g(t) = \begin{cases} t & 0 < t < 1 \\ 0 & \text{altrimenti} \end{cases}`, r`\operatorname{fourier}(g, [-1, 1]) =`)).toBe(
      'a₀ = 1/2; aₙ = ((−1)^(n) − 1)/(π²n²); bₙ = (−1)^(n + 1)/(πn); g(t) ~ 1/4 + Σ_{n≥1} (((−1)^(n) − 1)/(π²n²) cos(πnt) + (−1)^(n + 1)/(πn) sin(πnt))',
    )
    // Con il periodo: l'intervallo [−1, 1].
    expect(text(r`\operatorname{fourier}(x, 2) =`)).toBe('a₀ = 0; aₙ = 0 (la funzione è dispari); bₙ = (2(−1)^(n + 1))/(πn); x ~ Σ_{n≥1} (2(−1)^(n + 1))/(πn) sin(πnx)')
  })

  it('pari o dispari solo se lo è davvero: tolta la costante a₀/2, e su [0, 2π] il prolungamento periodico', () => {
    // Prima diceva «la funzione è dispari» anche per x + 1 e per x su [0, 2π].
    expect(text(r`\operatorname{fourier}(x + 1) =`)).toBe('a₀ = 2; aₙ = 0 (la funzione meno 1 è dispari); bₙ = (2(−1)^(n + 1))/n; x + 1 ~ 1 + Σ_{n≥1} (2(−1)^(n + 1))/n sin(nx)')
    expect(text(r`\operatorname{fourier}(x, [0, 2\pi]) =`)).toBe('a₀ = 2π; aₙ = 0 (il prolungamento periodico meno π è dispari); bₙ = −2/n; x ~ π − Σ_{n≥1} 2/n sin(nx)')
    expect(text(r`\operatorname{fourier}((x - \pi)^2, [0, 2\pi]) =`)).toBe('a₀ = (2π²)/3; aₙ = 4/n²; bₙ = 0 (il prolungamento periodico è pari); (x − π)² ~ π²/3 + Σ_{n≥1} 4/n² cos(nx)')
    // L'etichetta si vede anche nella formula disegnata con KaTeX, su una riga sua sotto la serie.
    expect(new Sheet().add(r`\operatorname{fourier}(x^2) =`)?.tex).toMatch(/b_n = 0 \\\\ .* \\\\ \\text\{\(la funzione è pari\)\} \\end\{array\}$/)
  })

  it('nella serie i segni meno al loro posto e niente coefficienti 1', () => {
    expect(text(r`\operatorname{fourier}(x^2, [0, 2\pi]) =`)).toBe('a₀ = (8π²)/3; aₙ = 4/n²; bₙ = −(4π)/n; x² ~ (4π²)/3 + Σ_{n≥1} (4/n² cos(nx) − (4π)/n sin(nx))')
    expect(text(r`\operatorname{fourier}(\sin x, [0, 2\pi]) =`)).toBe('a₀ = 0; aₙ = 0 (il prolungamento periodico è dispari); b₁ = 1; bₙ = 0 (n ≥ 2); sin(x) ~ sin(x)')
  })

  it('nel grafico la funzione ripetuta e la somma parziale, con lo slider intero per N', () => {
    const spec = parseGraph(`N = 5\n${r`\operatorname{fourier}(x, [-\pi, \pi], N)`}`)
    expect(kinds(spec.items)).toEqual(['function tratteggiata', 'function'])
    expect(spec.sliders).toMatchObject([{ name: 'N', value: 5, integer: true }])
    const S = spec.items[1] as Extract<GraphItem, { kind: 'function' }>
    // S₅(1) = 2(sin 1 − sin 2/2 + sin 3/3 − sin 4/4 + sin 5/5).
    const want = 2 * [1, 2, 3, 4, 5].reduce((s, k) => s + ((-1) ** (k + 1) * Math.sin(k)) / k, 0)
    expect(S.f(1)).toBeCloseTo(want, 6)
    expect(kinds(formulaGraph(r`\operatorname{fourier}(|x|)`)?.items ?? [])).toEqual(['function tratteggiata', 'function'])
  })
})

describe('la trasformata di Laplace', () => {
  it('con la tabella: potenze, esponenziali, seni e coseni, e i loro prodotti', () => {
    expect(text(r`\mathcal{L}\{t^2\} =`)).toBe('2/s³')
    expect(text(r`\mathcal{L}\{e^{3t}\} =`)).toBe('1/(s − 3)')
    expect(text(r`\mathcal{L}\{t e^{-t}\} =`)).toBe('1/(s + 1)²')
    expect(text(r`\mathcal{L}\{e^{-t} \sin(2t)\} =`)).toBe('2/(s² + 2s + 5)')
    expect(text(r`\mathcal{L}\{t \sin t\} =`)).toBe('2s/(s² + 1)²')
    expect(text(r`\mathcal{L}\{\sinh(3t)\} =`)).toBe('3/(s² − 9)')
    expect(text(r`\mathcal{L}\{\sin^2 t\} =`)).toBe('2/(s³ + 4s)')
    expect(text(r`\mathcal{L}\{3t^2 - 2e^{t} + 5\} =`)).toBe('6/s³ − 2/(s − 1) + 5/s')
    // Con le lettere: e^{at}, sin(ωt).
    expect(text(r`\mathcal{L}\{e^{at}\} =`)).toBe('1/(s − a)')
    expect(text(r`\mathcal{L}\{\sin(\omega t)\} =`)).toBe('ω/(s² + ω²)')
    expect(text(r`\operatorname{laplace}(\cos t) =`)).toBe('s/(s² + 1)')
  })

  it("l'antitrasformata con i fratti semplici", () => {
    expect(text(r`\mathcal{L}^{-1}\{\frac{1}{s^2+1}\} =`)).toBe('sin(t)')
    expect(text(r`\mathcal{L}^{-1}\{\frac{1}{s(s+1)}\} =`)).toBe('1 − e^(−t)')
    expect(text(r`\mathcal{L}^{-1}\{\frac{s+3}{s^2+2s+5}\} =`)).toBe('(cos(2t) + sin(2t))e^(−t)')
    expect(text(r`\mathcal{L}^{-1}\{\frac{1}{(s^2+1)^2}\} =`)).toBe('(sin(t) − t cos(t))/2')
    expect(text(r`\mathcal{L}^{-1}\{\frac{1}{s^2-2}\} =`)).toBe('(√2 sinh(√2t))/2')
    expect(text(r`\mathcal{L}^{-1}\{\frac{s}{(s+1)^2}\} =`)).toBe('(1 − t)e^(−t)')
  })

  it('si scrive come si legge, anche con la variabile dopo', () => {
    expect(toLatex(parseMath(r`\mathcal{L}\{t^2\}(s)`))).toBe(r`\mathcal{L}\left(t^{2}, s\right)`)
    expect(parseMath(r`\mathcal{L}^{-1}\{\frac{1}{s}\}(t)`)).toMatchObject({ k: 'fn', name: 'ilaplace', args: [{}, { k: 'name', name: 't' }] })
  })
})
