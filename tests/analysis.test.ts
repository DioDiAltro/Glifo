import { describe, expect, it } from 'vitest'
import { factorial } from '../src/math/evaluate'
import { toLatex } from '../src/math/latex'
import { parseMath } from '../src/math/parse'
import { Sheet } from '../src/math/sheet'
import { staticGraphSvg } from '../src/graph/picture'
import { formulaGraph, parseGraph, type GraphItem } from '../src/graph/spec'
import { PALETTES } from '../src/graph/svg'

const r = String.raw
const light = { ...PALETTES.light, surface: '#ffffff', halo: '#ffffff' }

/** Il risultato dopo l'ultima formula (com'è scritto nell'editor), con le formule prima come definizioni. */
function text(...formulas: string[]): string | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last?.text ?? null
}

describe('i limiti', () => {
  it('si scrivono con \\lim e \\to, anche da destra e da sinistra', () => {
    expect(parseMath(r`\lim_{x \to 0^+} \frac{1}{x}`)).toMatchObject({ k: 'lim', v: 'x', side: 1 })
    expect(parseMath(r`\lim_{x \to 0^{-}} x`)).toMatchObject({ k: 'lim', side: -1 })
    expect(toLatex(parseMath(r`\lim_{x \to +\infty} \frac{1}{x}`))).toBe(r`\lim_{x \to +\infty} \frac{1}{x}`)
    // Il limite prende anche i termini dopo che usano la variabile.
    expect(parseMath(r`\lim_{x \to \infty} \sqrt{x^2 + x} - x`)).toMatchObject({ k: 'lim', body: { k: 'bin', op: '-' } })
  })

  it('le forme 0/0 e ∞/∞, con il valore riconosciuto', () => {
    expect(text(r`\lim_{x \to 0} \frac{\sin x}{x} =`)).toBe('1')
    expect(text(r`\lim_{x \to 0} \frac{1 - \cos x}{x^2} =`)).toBe('1/2')
    expect(text(r`\lim_{x \to 1} \frac{x^2 - 1}{x - 1} =`)).toBe('2')
    expect(text(r`\lim_{x \to \infty} \frac{3x^2 + 1}{x^2 - 5} =`)).toBe('3')
    expect(text(r`\lim_{x \to \infty} \sqrt{x^2 + x} - x =`)).toBe('1/2')
    expect(text(r`\lim_{x \to +\infty} (1 + \frac{1}{x})^x =`)).toBe('e ≈ 2,718281…')
    expect(text(r`\lim_{x \to \infty} \arctan x =`)).toBe('π/2 ≈ 1,570796…')
    expect(text(r`\lim_{x \to 2} x^2 + 1 =`)).toBe('5')
  })

  it('0/0 con le derivate esatte (de l\'Hôpital), anche dove con i numeri le cifre si perdono', () => {
    expect(text(r`\lim_{x \to 0} \frac{\tan x - x}{x^3} =`)).toBe('1/3')
    // Con i numeri qui veniva +∞: cos x − 1 + x²/2 si cancella quasi tutto.
    expect(text(r`\lim_{x \to 0} \frac{\cos x - 1 + \frac{x^2}{2}}{x^4} =`)).toBe('1/24')
    expect(text(r`\lim_{x \to 0} \frac{e^x - 1 - x}{x^2} =`)).toBe('1/2')
    expect(text(r`\lim_{x \to 0} \frac{\ln(\cos x)}{x^2} =`)).toBe('−1/2')
    expect(text(r`\lim_{x \to \frac{\pi}{2}} \frac{\cos x}{x - \frac{\pi}{2}} =`)).toBe('−1')
    expect(text(r`\lim_{x \to 0} \frac{2^x - 1}{x} =`)).toBe('ln 2 ≈ 0,693147…')
    expect(text('f(x) = x^3 - 8', r`\lim_{x \to 2} \frac{f(x)}{x - 2} =`)).toBe('12')
    expect(text(r`L = \lim_{x \to 0} \frac{\tan x - x}{x^3} =`, '3L =')).toBe('1')
    // Dove non si può (|x|, ⌊x⌋, l'infinito) restano i numeri.
    expect(text(r`\lim_{x \to 0} \frac{x}{x^3} =`)).toBe('+∞')
    expect(text(r`\lim_{x \to 0} \frac{\lfloor x \rfloor}{x} =`)).toBe('non esiste (da sinistra +∞, da destra 0)')
  })

  it('quelli che vanno piano: x ln x, x^x, sin x / x all\'infinito', () => {
    expect(text(r`\lim_{x \to 0^+} x \ln x =`)).toBe('0')
    expect(text(r`\lim_{x \to 0^+} x^x =`)).toBe('1')
    expect(text(r`\lim_{x \to \infty} \frac{\sin x}{x} =`)).toBe('0')
  })

  it("l'infinito, e quando non esiste (da sinistra e da destra diversi, o oscilla)", () => {
    expect(text(r`\lim_{x \to 0^+} \frac{1}{x} =`)).toBe('+∞')
    expect(text(r`\lim_{x \to 0^-} \frac{1}{x} =`)).toBe('−∞')
    expect(text(r`\lim_{x \to 0} \frac{1}{x^2} =`)).toBe('+∞')
    expect(text(r`\lim_{x \to \infty} \ln x =`)).toBe('+∞')
    expect(text(r`\lim_{x \to 0} \frac{1}{x} =`)).toBe('non esiste (da sinistra −∞, da destra +∞)')
    expect(text(r`\lim_{x \to 0} \frac{|x|}{x} =`)).toBe('non esiste (da sinistra −1, da destra 1)')
    expect(text(r`\lim_{x \to 0} \sin \frac{1}{x} =`)).toBe('non esiste')
    // Dove la funzione esiste solo da una parte, quella.
    expect(text(r`\lim_{x \to 0} \sqrt{x} =`)).toBe('0')
  })

  it('le successioni, anche con il fattoriale; il valore si usa dopo', () => {
    expect(text(r`\lim_{n \to \infty} (1 + \frac{1}{n})^n =`)).toBe('e ≈ 2,718281…')
    expect(text(r`\lim_{n \to \infty} (-1)^n =`)).toBe('non esiste')
    expect(text(r`\lim_{n \to \infty} \frac{n!}{n^n} =`)).toBe('0')
    expect(text(r`L = \lim_{x \to 0} \frac{\sin x}{x} =`, 'L + 1 =')).toBe('2')
  })

  it('il fattoriale di un numero grande è infinito (non «non un numero»)', () => {
    expect(factorial(1000)).toBe(Infinity)
    expect(factorial(800.5)).toBe(Infinity)
    expect(factorial(5)).toBe(120)
  })
})

describe('le serie', () => {
  it('le somme riconosciute: π²/6, ln 2, π/4, e', () => {
    expect(text(r`\sum_{n=1}^{\infty} \frac{1}{n^2} =`)).toBe('π²/6 ≈ 1,644934…')
    expect(text(r`\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n} =`)).toBe('ln 2 ≈ 0,693147…')
    expect(text(r`\sum_{n=0}^{\infty} \frac{(-1)^n}{2n + 1} =`)).toBe('π/4 ≈ 0,785398…')
    expect(text(r`\sum_{n=0}^{\infty} \frac{1}{n!} =`)).toBe('e ≈ 2,718281…')
    expect(text(r`\sum_{n=0}^{\infty} \frac{1}{2^n} =`)).toBe('2')
    expect(text(r`\sum_{n=1}^{\infty} \frac{n}{2^n} =`)).toBe('2')
    expect(text(r`\sum_{n=1}^{\infty} \frac{1}{n^3} =`)).toBe('1,202056…')
  })

  it('quelle che divergono o non convergono', () => {
    expect(text(r`\sum_{n=1}^{\infty} \frac{1}{n} =`)).toBe('+∞')
    expect(text(r`\sum_{n=1}^{\infty} \frac{1}{\sqrt{n}} =`)).toBe('+∞')
    expect(text(r`\sum_{n=1}^{\infty} 1 =`)).toBe('+∞')
    expect(text(r`\sum_{n=1}^{\infty} (-1)^n =`)).toBe('non esiste')
  })
})

describe('i polinomi di Taylor', () => {
  it('dalla potenza più bassa, anche in un punto diverso da 0', () => {
    expect(text(r`\operatorname{taylor}(\sin x, 0, 5) =`)).toBe('x − x³/6 + x⁵/120')
    expect(text(r`\operatorname{taylor}(e^x, 0, 3) =`)).toBe('1 + x + x²/2 + x³/6')
    expect(text(r`\operatorname{maclaurin}(\cos x, 4) =`)).toBe('1 − x²/2 + x⁴/24')
    expect(text(r`\operatorname{taylor}(\ln x, 1, 3) =`)).toBe('x − 1 − (x − 1)²/2 + (x − 1)³/3')
    expect(text(r`f(x) = \frac{1}{1 - x}`, r`\operatorname{taylor}(f(x), 0, 4) =`)).toBe('1 + x + x² + x³ + x⁴')
  })

  it('si definisce e si usa dopo, anche in un grafico', () => {
    expect(text(r`T(x) = \operatorname{taylor}(\sin x, 0, 3)`, 'T(1) =')).toBe('5/6')
    const spec = parseGraph(r`y = \operatorname{taylor}(\sin x, 0, 5)`)
    expect(spec.errors).toEqual([])
    const f = (spec.items[0] as Extract<GraphItem, { kind: 'function' }>).f
    expect(f(1)).toBeCloseTo(1 - 1 / 6 + 1 / 120, 12)
  })

  it('da solo, nel grafico e nel pannello, con la funzione da cui viene (una volta sola)', () => {
    const labels = (spec: { items: GraphItem[] } | null) => spec?.items.map((i) => i.label)
    expect(labels(parseGraph(r`\operatorname{taylor}(\sin x, 0, 5)`))).toEqual([r`y = \sin x`, r`y = x - \frac{x^{3}}{6} + \frac{x^{5}}{120}`])
    expect(labels(formulaGraph(r`\operatorname{taylor}(e^x, 0, 2)`))).toEqual([r`y = e^{x}`, r`y = 1 + x + \frac{x^{2}}{2}`])
    // Se un'altra riga disegna già la funzione, no.
    expect(labels(parseGraph('y = \\sin x\n' + r`\operatorname{taylor}(\sin x, 0, 3)`))).toEqual([r`y = \sin x`, r`y = x - \frac{x^{3}}{6}`])
    expect(labels(parseGraph('f(x) = e^x\n' + r`\operatorname{taylor}(f(x), 0, 1)`))).toEqual([r`f(x) = e^{x}`, 'y = 1 + x'])
    expect(labels(parseGraph(r`\operatorname{taylor}(\cos x, 0, 2)` + '\n' + r`\operatorname{taylor}(\cos x, 0, 4)`))).toEqual([
      r`y = \cos x`,
      r`y = 1 - \frac{x^{2}}{2}`,
      r`y = 1 - \frac{x^{2}}{2} + \frac{x^{4}}{24}`,
    ])
  })
})

describe('le equazioni, le disequazioni e i sistemi risolti (con ⇒)', () => {
  it('di primo e secondo grado, con le radici esatte e le soluzioni complesse', () => {
    expect(text(r`x^2 - 5x + 6 = 0 \Rightarrow`)).toBe('x = 2 ∨ x = 3')
    expect(text(r`x^2 - x - 1 = 0 \Rightarrow`)).toBe('x = (1 ± √5)/2')
    expect(text(r`x^2 - 4x + 4 = 0 \Rightarrow`)).toBe('x = 2 (doppia)')
    expect(text(r`x^2 + 2x + 5 = 0 \Rightarrow`)).toBe('nessuna soluzione reale (in ℂ: x = −1 ± 2i)')
    expect(text(r`2x + 3 = 7 \implies`)).toBe('x = 2')
    expect(text(r`\frac{x - 1}{x + 2} = 3 \Rightarrow`)).toBe('x = −7/2')
    expect(text('a = 2', r`a x = 6 \Rightarrow`)).toBe('x = 3')
  })

  it('di grado più alto, identità e impossibili', () => {
    expect(text(r`x^3 - 6x^2 + 11x - 6 = 0 \Rightarrow`)).toBe('x = 1 ∨ x = 2 ∨ x = 3')
    expect(text(r`x^4 - 5x^2 + 4 = 0 \Rightarrow`)).toBe('x = −2 ∨ x = −1 ∨ x = 1 ∨ x = 2')
    expect(text(r`x^3 = 2 \Rightarrow`)).toBe('x = ∛2 ≈ 1,259921…')
    expect(text(r`x^2 + 1 = x^2 + 1 \Rightarrow`)).toBe("ogni x (è un'identità)")
    expect(text(r`x + 1 = x \Rightarrow`)).toBe('nessuna soluzione (impossibile)')
  })

  it('goniometriche (con + 2kπ), esponenziali, logaritmiche, con i numeri', () => {
    expect(text(r`\sin x = \frac{1}{2} \Rightarrow`)).toBe('x = π/6 + 2kπ ∨ x = 5π/6 + 2kπ')
    expect(text(r`\sin x = 0 \Rightarrow`)).toBe('x = kπ')
    expect(text(r`\cos x = 0 \Rightarrow`)).toBe('x = π/2 + kπ')
    expect(text(r`\tan x = 1 \Rightarrow`)).toBe('x = π/4 + kπ')
    expect(text(r`e^x = 2 \Rightarrow`)).toBe('x = ln 2 ≈ 0,693147…')
    expect(text(r`\ln x = 1 \Rightarrow`)).toBe('x = e ≈ 2,718281…')
    expect(text(r`\cos x = x \Rightarrow`)).toBe('x = 0,739085…')
  })

  it('le disequazioni: intervalli uniti, estremi dentro e fuori, punti esclusi', () => {
    expect(text(r`x^2 - 4 > 0 \Rightarrow`)).toBe('x < −2 ∨ x > 2')
    expect(text(r`x^2 - 4 \le 0 \Rightarrow`)).toBe('−2 ≤ x ≤ 2')
    expect(text(r`\frac{x - 1}{x + 2} \ge 0 \Rightarrow`)).toBe('x < −2 ∨ x ≥ 1')
    expect(text(r`-1 < 2x + 1 \le 3 \Rightarrow`)).toBe('−1 < x ≤ 1')
    expect(text(r`|x - 1| < 2 \Rightarrow`)).toBe('−1 < x < 3')
    expect(text(r`\sqrt{x} > 2 \Rightarrow`)).toBe('x > 4')
    expect(text(r`x^2 - x - 1 > 0 \Rightarrow`)).toBe('x < (1 − √5)/2 ∨ x > (1 + √5)/2')
    expect(text(r`x^2 + 1 > 0 \Rightarrow`)).toBe('ogni x')
    expect(text(r`x^2 < 0 \Rightarrow`)).toBe('nessuna soluzione')
    expect(text(r`x^2 \le 0 \Rightarrow`)).toBe('x = 0')
    expect(text(r`(x - 1)^2 > 0 \Rightarrow`)).toBe('x ≠ 1')
  })

  it('i sistemi: lineari (anche indeterminati e impossibili) e non lineari', () => {
    expect(text(r`x + y = 3, \; x - y = 1 \Rightarrow`)).toBe('x = 2, y = 1')
    expect(text(r`\begin{cases} 2x + y = 5 \\ x - y = 1 \end{cases} \Rightarrow`)).toBe('x = 2, y = 1')
    expect(text(r`x + y = 3, \; 2x + 2y = 6 \Rightarrow`)).toBe('x = 3 − y (y qualsiasi: infinite soluzioni)')
    expect(text(r`x + y = 3, \; x + y = 4 \Rightarrow`)).toBe('nessuna soluzione (impossibile)')
    expect(text(r`\begin{cases} x + y + z = 6 \\ x - y = 0 \\ x + z = 4 \end{cases} \Rightarrow`)).toBe('x = 2, y = 2, z = 2')
    expect(text(r`\begin{cases} x^2 + y^2 = 25 \\ x - y = 1 \end{cases} \Rightarrow`)).toBe('(x, y) = (−3, −4) ∨ (x, y) = (4, 3)')
  })
})

describe('le equazioni differenziali', () => {
  it('nella nota: la soluzione con la condizione iniziale, come funzione', () => {
    expect(text(r`y' = y, \; y(0) = 1`, 'y(1) =')).toBe('2,718281…')
    // y = x − 1 + 2e^{−x}
    expect(text(r`y' = x - y, \; y(0) = 1`, 'y(2) =')).toBe('1,270670…')
    const sheet = new Sheet()
    sheet.add(r`y' = -2 x y, \; y(0) = 1`)
    expect(sheet.definitionsFor(['y'])).toEqual([r`y' = -2 x y, \; y(0) = 1`])
    // Nel grafico, y (o y(x)) è la soluzione della nota: una curva nel piano, non una superficie.
    for (const line of ['y', 'y(x)']) {
      const spec = parseGraph(line, [r`y' = x - y, \; y(0) = 1`])
      expect(spec.dim).toBe(2)
      expect((spec.items[0] as Extract<GraphItem, { kind: 'function' }>).f(1)).toBeCloseTo(2 / Math.E, 9)
    }
  })

  it('del secondo ordine e oltre, anche scritte in un altro modo, con le condizioni anche in formule diverse', () => {
    expect(text(r`y'' = -y, \; y(0) = 0, \; y'(0) = 1`, 'y(1) =')).toBe('0,841470…')
    expect(text(r`y'' + y = 0, \; y(0) = 1, \; y'(0) = 0`, r`y(\pi) =`)).toBe('−1')
    // y = e^{−x}(\cos 2x + \frac{1}{2}\sin 2x)
    expect(text(r`y'' + 2y' + 5y = 0, \; y(0) = 1, \; y'(0) = 0`, 'y(1) =')).toBe('0,0141640…')
    expect(text(r`y''' = 0, \; y(0) = 1, \; y'(0) = 1, \; y''(0) = 2`, 'y(1) =')).toBe('3')
    expect(text(r`y' + y = x, \; y(0) = 1`, 'y(2) =')).toBe('1,270670…')
    expect(text(r`y'' = -y`, 'y(0) = 0', "y'(0) = 1", "y'(1) =")).toBe('0,540302…')
    expect(text(r`y'' = -y, \; y(0) = 0, \; y'(0) = 1`, r`\int_0^{\pi} y(x) \, dx =`)).toBe('2')
    // x'' = -k x: la variabile è il tempo.
    expect(text('k = 4', r`x'' = -k x, \; x(0) = 1, \; x'(0) = 0`, r`x(\pi) =`)).toBe('1')
    // Oltre dove la soluzione scappa all'infinito (1/(1 − x)) non c'è.
    expect(text(r`y' = y^2, \; y(0) = 1`, 'y(0{,}5) =')).toBe('2')
    expect(text(r`y' = y^2, \; y(0) = 1`, 'y(2) =')).toBeNull()
    // Un punto con l'apice resta un punto.
    expect(text(r`A' = (1, 2)`, "A' =")).toBe('(1, 2)')
  })

  it('nei grafici di ordine più alto: la soluzione di ogni gruppo di condizioni', () => {
    const spec = parseGraph(r`y'' = -y, \; y(0) = 0, \; y'(0) = 1, \; y(0) = 1, \; y'(0) = 0`)
    expect(spec.errors).toEqual([])
    expect(spec.items.map((i) => [i.kind, i.label])).toEqual([
      ['function', r`y'' = -y, \; y(0) = 0, \; y'(0) = 1`],
      ['function', r`y'' = -y, \; y(0) = 1, \; y'(0) = 0`],
    ])
    const [sin, cos] = spec.items as Extract<GraphItem, { kind: 'function' }>[]
    expect(sin.f(Math.PI / 2)).toBeCloseTo(1, 9)
    expect(cos.f(-2)).toBeCloseTo(Math.cos(-2), 9)
    expect(formulaGraph(r`y'' + y = 0, \; y(0) = 1, \; y'(0) = 0`)?.items.map((i) => i.kind)).toEqual(['function'])
    expect(parseGraph(r`y'' = -y`).errors[0].message).toBe("Per disegnare la soluzione servono le condizioni iniziali, come y(0) = 1, \\; y'(0) = 0")
    expect(parseGraph(r`y'' = -y, \; y(0) = 0`).errors[0].message).toBe("Servono 2 condizioni iniziali, come y(0) = 1, \\; y'(0) = 0")
    expect(parseGraph(r`(y')^2 = y, \; y(0) = 1`).errors[0].message).toBe("La derivata più alta deve comparire al primo grado: scrivi y' = …")
  })

  it('nei grafici: il campo di direzioni e le soluzioni dai punti iniziali', () => {
    const spec = parseGraph(r`y' = x - y, \; y(0) = 1, \; y(0) = -2`)
    expect(spec.errors).toEqual([])
    const slopes = spec.items[0] as Extract<GraphItem, { kind: 'slopes' }>
    expect(slopes.kind).toBe('slopes')
    expect(slopes.starts).toEqual([[0, 1], [0, -2]])
    expect(slopes.f(2, 1)).toBe(1)
    const svg = staticGraphSvg(spec, 640, 400, light, { id: 'g' })
    // I trattini velati e le due soluzioni.
    expect(svg).toContain('stroke-opacity="0.55"')
    expect(svg.match(/<circle [^>]*r="4"/g)?.length).toBe(2)
  })
})

describe('le curve di livello', () => {
  it('di una funzione del blocco o di un\'espressione, con i valori scritti', () => {
    const spec = parseGraph(r`\operatorname{livelli}(x^2 + 2y^2)`)
    expect(spec.dim).toBe(2)
    expect(spec.items[0]).toMatchObject({ kind: 'contour', label: r`\operatorname{livelli}\left(x^{2} + 2y^{2}\right)` })
    const svg = staticGraphSvg(spec, 640, 400, light, { id: 'g' })
    expect(svg.match(/stroke-opacity="[\d.]+" data-item="0"/g)!.length).toBeGreaterThan(5)
    expect(svg).toMatch(/font-size="10.5"[^>]*>\d+<\/text>/)
    const withGradient = parseGraph('f(x, y) = x^2 - y^2\n\\operatorname{livelli}(f)\n\\nabla f')
    expect(withGradient.dim).toBe(2)
    expect(withGradient.items.map((i) => i.kind)).toEqual(['contour', 'field'])
    // Nel pannello della formula.
    expect(formulaGraph(r`\operatorname{livelli}(f)`, ['f(x, y) = x^2 - y^2'])?.items.map((i) => i.kind)).toEqual(['contour'])
  })
})
