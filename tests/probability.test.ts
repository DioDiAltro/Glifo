import { describe, expect, it } from 'vitest'
import { Sheet } from '../src/math/sheet'
import { makeDistribution } from '../src/math/distributions'
import { betaI, gammaP, logGamma, normalCdf, normalQuantile } from '../src/math/special'
import { formulaGraph, parseGraph, type GraphItem } from '../src/graph/spec'
import { chooseWindow } from '../src/graph/plot'

const r = String.raw

/** Il risultato dell'ultima formula, con le formule prima come definizioni. */
function text(...formulas: string[]): string | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last?.text ?? null
}

const close = (a: number, b: number, tolerance = 1e-12) => expect(Math.abs(a - b)).toBeLessThan(tolerance * Math.max(1, Math.abs(b)))

describe('le funzioni speciali e le distribuzioni', () => {
  it('ln Γ, gamma e beta incomplete, Φ e Φ⁻¹ come nelle tavole', () => {
    close(logGamma(0.5), 0.5723649429247001)
    close(logGamma(101), 363.73937555556347)
    close(gammaP(2, 3), 1 - 4 * Math.exp(-3))
    close(betaI(2, 3, 0.4), 0.5248)
    close(normalCdf(1.96), 0.9750021048517795)
    close(normalCdf(-8), 6.22096057427178e-16, 1e-6)
    close(normalQuantile(0.975), 1.959963984540054)
    close(normalQuantile(0.05), -1.6448536269514729)
  })

  it('i quantili della t, del χ² e della F (con un estremo infinito la ricerca non si ferma prima)', () => {
    close(makeDistribution('student', [10]).quantile(0.975), 2.2281388519649385, 1e-10)
    close(makeDistribution('student', [10]).quantile(0.995), 3.169272672616951, 1e-10)
    close(makeDistribution('chi2', [3]).quantile(0.95), 7.814727903251178, 1e-10)
    close(makeDistribution('fisher', [3, 10]).quantile(0.95), 3.708264819, 1e-8)
    close(makeDistribution('gamma', [2, 1]).quantile(1 - 4 * Math.exp(-3)), 3, 1e-10)
  })

  it('le discrete: probabilità, funzione di ripartizione e quantili', () => {
    const b = makeDistribution('binomial', [10, 0.3])
    close(b.pdf(3), 0.266827932)
    close(b.cdf(3), 0.6496107184)
    expect(b.quantile(0.5)).toBe(3)
    const p = makeDistribution('poisson', [3])
    close(p.cdf(2), 8.5 * Math.exp(-3))
    expect(makeDistribution('geometric', [0.2]).quantile(0.5)).toBe(4)
    close(makeDistribution('hypergeometric', [50, 10, 5]).pdf(1), 913900 / 2118760, 1e-10)
  })

  it('i parametri sbagliati dicono cosa va', () => {
    expect(() => makeDistribution('binomial', [10, 1.5])).toThrow('La probabilità p va da 0 a 1')
    expect(() => makeDistribution('normal', [0, -1])).toThrow('La varianza σ²')
    expect(() => makeDistribution('uniform', [3, 1])).toThrow('a < b')
  })
})

describe('le variabili aleatorie nella nota', () => {
  it('la binomiale: le probabilità esatte (frazioni) o con le cifre', () => {
    expect(text(r`X \sim B(10, 0{,}3)`, r`P(X = 3) =`)).toBe('0,266827…')
    expect(text(r`X \sim B(10, 0{,}3)`, r`P(X \le 3) =`)).toBe('0,649610…')
    expect(text(r`X \sim B(3, \frac{1}{6})`, r`P(X = 1) =`)).toBe('25/72 ≈ 0,347222…')
    expect(text(r`X \sim B(4, \frac{1}{2})`, r`P(X = 2) =`)).toBe('3/8 = 0,375')
    expect(text(r`X \sim B(10, 0{,}5)`, r`P(X \ge 8 \lor X \le 2) =`)).toBe('7/64 = 0,109375')
    // Una condizione con X dentro un'espressione: valore per valore, ancora esatta.
    expect(text(r`X \sim B(10, 0{,}5)`, r`P(|X - 5| < 2) =`)).toBe('21/32 = 0,65625')
    expect(text(r`X \sim B(4, \frac{1}{2})`, r`P(X = 3 \mid X \ge 1) =`)).toBe('4/15 ≈ 0,266666…')
  })

  it('Poisson ed esponenziale: esatte con e^{−λ}; la normale con le cifre', () => {
    expect(text(r`X \sim \operatorname{Po}(3)`, r`P(X = 2) =`)).toBe('(9e^(−3))/2 ≈ 0,224041…')
    expect(text(r`X \sim \operatorname{Po}(3)`, r`P(X > 2) =`)).toBe('1 − (17e^(−3))/2 ≈ 0,576809…')
    expect(text(r`T \sim \operatorname{Exp}(2)`, r`P(T \le 1) =`)).toBe('1 − e^(−2) ≈ 0,864664…')
    // Senza memoria: P(T > 3 | T > 1) = P(T > 2).
    expect(text(r`T \sim \operatorname{Exp}(2)`, r`P(T > 3 \mid T > 1) =`)).toBe('e^(−4) ≈ 0,0183156…')
    expect(text(r`Z \sim N(0, 1)`, r`P(Z \le 1{,}96) =`)).toBe('0,975002…')
    expect(text(r`X \sim N(100, 15^2)`, r`P(X > 130) =`)).toBe('0,0227501…')
    expect(text(r`X \sim \mathcal{N}(0, 1)`, r`P(X > 0) =`)).toBe('0,5')
    expect(text(r`U \sim U(0, 4)`, r`P(1 \le U \le 2) =`)).toBe('0,25')
    expect(text(r`X \sim \operatorname{Geom}(\frac{1}{6})`, r`P(X > 3) =`)).toBe('125/216 ≈ 0,578703…')
  })

  it('il valore atteso e la varianza, anche di aX + b e di X²', () => {
    expect(text(r`X \sim B(10, 0{,}3)`, r`E[X] =`)).toBe('3')
    expect(text(r`X \sim B(10, 0{,}3)`, r`\operatorname{Var}(X) =`)).toBe('2,1')
    expect(text(r`X \sim B(10, 0{,}3)`, r`E(X) =`)).toBe('3')
    expect(text(r`X \sim B(10, 0{,}3)`, r`\mathbb{E}[X] =`)).toBe('3')
    expect(text(r`X \sim \operatorname{Po}(3)`, r`E[2X + 1] =`)).toBe('7')
    expect(text(r`X \sim \operatorname{Po}(3)`, r`\operatorname{Var}(2X + 1) =`)).toBe('12')
    expect(text(r`X \sim N(0, 1)`, r`E[X^2] =`)).toBe('1')
    expect(text(r`X \sim U(0, 1)`, r`E[\sqrt{X}] =`)).toBe('0,666666…')
    expect(text(r`X \sim \operatorname{Exp}(\frac{1}{3})`, r`E[X] =`)).toBe('3')
  })

  it('i quantili, Φ e Φ⁻¹, e i quantili come equazione', () => {
    expect(text(r`T \sim t(10)`, r`\operatorname{quantile}(T, 0{,}975) =`)).toBe('2,228138…')
    expect(text(r`Y \sim \chi^2(3)`, r`\operatorname{quantile}(Y, 0{,}95) =`)).toBe('7,814727…')
    expect(text(r`\Phi(1{,}96) =`)).toBe('0,975002…')
    expect(text(r`\Phi^{-1}(0{,}975) =`)).toBe('1,959963…')
    expect(text(r`X \sim N(0, 1)`, r`P(X \le q) = 0{,}95 \Rightarrow`)).toBe('q = 1,644853…')
  })

  it('tutti i modi di scrivere le distribuzioni e le probabilità', () => {
    for (const d of [r`B(10; 0,3)`, r`\operatorname{Bin}(10, 0{,}3)`, r`Bin(10, 0{,}3)`, r`\mathcal{B}(10, 0{,}3)`]) {
      expect(text(r`X \sim ${d}`, r`P(X = 0) =`)).toBe('0,0282475…')
    }
    expect(text(r`X \sim B(10, 0{,}3)`, r`\Pr(X \le 3) =`)).toBe('0,649610…')
    expect(text(r`X \sim B(10, 0{,}3)`, r`\mathbb{P}(X \le 3) =`)).toBe('0,649610…')
    expect(text(r`T \sim t_{10}`, r`P(T \le 2{,}228) =`)).toBe('0,974994…')
    expect(text(r`Y \sim \chi^2_3`, r`P(Y \le 7{,}815) =`)).toBe('0,950006…')
    expect(text(r`X \sim B(4, \frac{1}{2})`, r`P(X = 3 | X \ge 1) =`)).toBe('4/15 ≈ 0,266666…')
  })

  it('le probabilità nei conti: complementari, somme, con un nome', () => {
    expect(text(r`X \sim B(10, 0{,}3)`, r`1 - P(X \le 2) =`)).toBe('0,617217…')
    expect(text(r`X \sim B(10, 0{,}3)`, r`\sum_{k=0}^{3} P(X = k) =`)).toBe('0,649610…')
    expect(text(r`X \sim B(10, 0{,}3)`, r`p = P(X = 3)`, r`2p =`)).toBe('0,533655…')
    // Con i parametri sbagliati la variabile non c'è: niente risultato.
    expect(text(r`X \sim B(10, 1{,}5)`, r`P(X = 0) =`)).toBeNull()
  })
})

describe('il calcolo combinatorio', () => {
  it('combinazioni e disposizioni, semplici e con ripetizione (anche C_{10,3} con la virgola attaccata)', () => {
    expect(text(r`C_{10,3} =`)).toBe('120')
    expect(text(r`C_{10, 3} =`)).toBe('120')
    expect(text(r`D_{10,3} =`)).toBe('720')
    expect(text(r`D'_{10,3} =`)).toBe('1000')
    expect(text(r`C'_{10,3} =`)).toBe('220')
    expect(text(r`n = 7`, r`k = 2`, r`C_{n,k} =`)).toBe('21')
  })
})

describe('la statistica dei dati', () => {
  const x = r`x = (2, 3, 5, 7, 7, 9)`
  it('media, mediana, moda, varianza, scarto quadratico medio, quartili', () => {
    expect(text(x, r`\operatorname{media}(x) =`)).toBe('5,5')
    expect(text(x, r`\bar{x} =`)).toBe('5,5')
    expect(text(x, r`\operatorname{mediana}(x) =`)).toBe('6')
    expect(text(x, r`\operatorname{moda}(x) =`)).toBe('7')
    expect(text(r`x = (1, 2, 2, 3, 3, 4)`, r`\operatorname{moda}(x) =`)).toBe('2 e 3')
    expect(text(r`x = (1, 2, 3, 4)`, r`\operatorname{moda}(x) =`)).toBe('nessuna: i valori hanno tutti la stessa frequenza')
    expect(text(x, r`\operatorname{Var}(x) =`)).toBe('71/12 ≈ 5,916666…')
    expect(text(r`x = (2, 4, 4, 4, 5, 5, 7, 9)`, r`\operatorname{sqm}(x) =`)).toBe('2')
    expect(text(r`x = (2, 4, 4, 4, 5, 5, 7, 9)`, r`\operatorname{varc}(x) =`)).toBe('32/7 ≈ 4,571428…')
    expect(text(x, r`\operatorname{quartili}(x) =`)).toBe('Q₁ = 3,5; Q₂ = 6; Q₃ = 7')
    expect(text(r`x = (10, 20, 30, 40)`, r`\operatorname{quantile}(x, 0{,}9) =`)).toBe('37')
    expect(text(r`x = (10, 20, 30, 40)`, r`\operatorname{percentile}(x, 90) =`)).toBe('37')
    expect(text(x, r`\operatorname{campo}(x) =`)).toBe('7')
    expect(text(x, r`\max(x) =`)).toBe('9')
  })

  it('con le frequenze, con i decimali, con i numeri scritti uno per uno', () => {
    expect(text(r`v = (1, 2, 3)`, r`f = (5, 3, 2)`, r`\operatorname{media}(v, f) =`)).toBe('1,7')
    expect(text(r`x = (1{,}5; 2{,}3; 4)`, r`\operatorname{media}(x) =`)).toBe('2,6')
    expect(text(r`\operatorname{media}(2, 3, 5) =`)).toBe('10/3 ≈ 3,333333…')
    expect(text(r`\operatorname{Var}(2, 4, 4, 4, 5, 5, 7, 9) =`)).toBe('4')
  })

  it('due serie: covarianza, correlazione, retta di regressione', () => {
    const xy = [r`x = (1, 2, 3, 4, 5)`, r`y = (2, 4, 5, 4, 5)`]
    expect(text(...xy, r`\operatorname{regressione}(x, y) =`)).toBe('y = 0,6x + 2,2 (r = 0,774596…)')
    expect(text(...xy, r`\operatorname{corr}(x, y) =`)).toBe('0,774596…')
    expect(text(r`x = (1, 2, 3)`, r`y = (2, 4, 7)`, r`\operatorname{Cov}(x, y) =`)).toBe('5/3 ≈ 1,666666…')
  })

  it('la tabella delle frequenze e il riassunto', () => {
    expect(text(x, r`\operatorname{frequenze}(x) =`)).toBe('2: 1 (0,1667; 0,1667); 3: 1 (0,1667; 0,3333); 5: 1 (0,1667; 0,5); 7: 2 (0,3333; 0,8333); 9: 1 (0,1667; 1); totale 6')
    const summary = text(x, r`\operatorname{statistiche}(x) =`)!
    expect(summary).toContain('Media: 5,5')
    expect(summary).toContain('Mediana: 6')
    expect(summary).toContain('Varianza campionaria (n − 1): 7,1')
  })
})

describe('nei grafici', () => {
  const kinds = (spec: ReturnType<typeof parseGraph>) => spec.items.map((i) => `${i.kind}${i.kind === 'bars' ? ` ${i.bars.length}` : ''}`)

  it('una discreta: le barre; P(X ≤ 3): le barre dell\'evento colorate, le altre a parte', () => {
    const spec = parseGraph(r`X \sim B(10, 0{,}3)`)
    expect(kinds(spec)).toEqual(['bars 11'])
    const event = parseGraph(r`P(X \le 3)`, [r`X \sim B(10, 0{,}3)`])
    expect(event.errors).toEqual([])
    expect(kinds(event)).toEqual(['bars 7', 'bars 4'])
    expect(event.items[1].label).toBe(r`P(X \le 3) = 0{,}649610\ldots`)
    expect(event.items[0].label).toBe(r`X \sim B(10;\ 0{,}3)`)
  })

  it('una continua: la densità, e P(…) l\'area (in due pezzi per |Z| > 2), con la finestra attorno alla distribuzione', () => {
    const spec = parseGraph([r`Z \sim N(0, 1)`, r`P(|Z| > 2)`].join('\n'))
    expect(kinds(spec)).toEqual(['function', 'area', 'area'])
    const areas = spec.items.filter((i): i is Extract<GraphItem, { kind: 'area' }> => i.kind === 'area')
    expect(areas.map((a) => [a.from, a.to])).toEqual([
      [-Infinity, -2],
      [2, Infinity],
    ])
    const w = chooseWindow(parseGraph(r`X \sim N(100, 225)`), 600, 360)
    expect(w.x0).toBeGreaterThan(40)
    expect(w.x1).toBeLessThan(160)
  })

  it('i dati: istogramma, barre, regressione (nel piano anche con x e y)', () => {
    const data = [r`x = (2, 3, 5, 7, 7, 9, 12, 15, 4, 6)`]
    const hist = parseGraph(r`\operatorname{istogramma}(x)`, data)
    expect(hist.errors).toEqual([])
    const bars = (hist.items[0] as Extract<GraphItem, { kind: 'bars' }>).bars
    expect(bars.reduce((s, b) => s + b.y, 0)).toBe(10)
    const fit = parseGraph(r`\operatorname{regressione}(x, y)`, [r`x = (1, 2, 3, 4, 5)`, r`y = (2, 4, 5, 4, 5)`])
    expect(fit.dim).toBe(2)
    expect(kinds(fit)).toEqual(['points', 'function'])
    expect(fit.items[1].label).toBe(r`y = 0{,}6x + 2{,}2\quad (r = 0{,}774596\ldots)`)
  })

  it('nel pannello della formula', () => {
    expect(formulaGraph(r`P(X \le 3)`, [r`X \sim B(10, 0{,}3)`])).not.toBeNull()
    expect(formulaGraph(r`X \sim N(0, 1)`)).not.toBeNull()
  })
})

describe('le barre di «tali che» restano', () => {
  it('\\mid negli insiemi', () => {
    expect(text(r`\iint_{\{(x, y) \mid x^2 + y^2 \le 1\}} 1 \, dA =`)).toMatch(/^3,14159/)
  })
})
