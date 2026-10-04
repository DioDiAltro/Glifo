import { describe, expect, it } from 'vitest'
import { Rational } from '../src/math/exact'
import { parseMath } from '../src/math/parse'
import { factorQ, partialFractions, squareFree } from '../src/math/polynomial'
import { Sheet } from '../src/math/sheet'
import { add, expand, key, mul, num, pow, sym } from '../src/math/symbolic'
import { formulaGraph, parseGraph, type GraphItem } from '../src/graph/spec'

const r = String.raw
const R = (n: number) => Rational.int(n)

/** Il risultato dopo l'ultima formula (com'è scritto nell'editor), con le formule prima come definizioni. */
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

describe('le primitive', () => {
  it('gli integrali immediati, con la costante', () => {
    expect(text(r`\int x^2 \, dx =`)).toBe('x³/3 + c')
    expect(tex(r`\int x^2 \, dx =`)).toBe(r`\frac{x^{3}}{3} + c`)
    expect(text(r`\int \frac{1}{x} \, dx =`)).toBe('ln|x| + c')
    expect(tex(r`\int \frac{1}{x} \, dx =`)).toBe(r`\ln\left|x\right| + c`)
    expect(text(r`\int e^{2x} \, dx =`)).toBe('e^(2x)/2 + c')
    expect(text(r`\int \sin(3x) \, dx =`)).toBe('−cos(3x)/3 + c')
    expect(text(r`\int 2^x \, dx =`)).toBe('2^(x)/ln(2) + c')
    expect(text(r`\int x^n \, dx =`)).toBe('x^(n + 1)/(n + 1) + c')
    expect(text(r`\int a x^2 + b \, dx =`)).toBe('(ax³)/3 + bx + c')
    expect(text(r`\int \tan x \, dx =`)).toBe('−ln|cos(x)| + c')
    expect(text(r`\int \frac{1}{1 + x^2} \, dx =`)).toBe('arctan(x) + c')
    expect(text(r`\int \frac{1}{\sqrt{4 - x^2}} \, dx =`)).toBe('arcsin(x/2) + c')
    expect(text(r`\int \frac{1}{\sqrt{x^2 + 1}} \, dx =`)).toBe('ln(x + √(x² + 1)) + c')
    expect(text(r`\int |x| \, dx =`)).toBe('(x|x|)/2 + c')
  })

  it('il dx anche nel numeratore, come nei libri', () => {
    expect(parseMath(r`\int \frac{x \, dx}{x^2 + 4}`)).toMatchObject({ k: 'prim', v: 'x', body: { k: 'bin', op: '/', a: { k: 'name', name: 'x' } } })
    expect(text(r`\int \frac{dx}{1 + x^2} =`)).toBe('arctan(x) + c')
    expect(text(r`\int \frac{x \, dx}{x^2 + 4} =`)).toBe('ln(x² + 4)/2 + c')
    expect(text(r`\int_0^1 \frac{dx}{1 + x^2} =`)).toBe('π/4 ≈ 0,785398…')
  })

  it('per sostituzione, anche con l\'inversa (x = eᵗ, x² = t − 1)', () => {
    expect(text(r`\int x e^{x^2} \, dx =`)).toBe('e^(x²)/2 + c')
    expect(text(r`\int (x+1) e^{x^2 + 2x} \, dx =`)).toBe('e^(x² + 2x)/2 + c')
    expect(text(r`\int \frac{\ln x}{x} \, dx =`)).toBe('ln²(x)/2 + c')
    expect(text(r`\int \frac{1}{x \ln x} \, dx =`)).toBe('ln|ln(x)| + c')
    expect(text(r`\int \cos x \, e^{\sin x} \, dx =`)).toBe('e^(sin(x)) + c')
    expect(text(r`\int \frac{e^x}{1 + e^{2x}} \, dx =`)).toBe('arctan(e^(x)) + c')
    expect(text(r`\int x^3 \sqrt{x^2 + 1} \, dx =`)).toBe('(x² + 1)^(5/2)/5 − (x² + 1)^(3/2)/3 + c')
    expect(text(r`\int \frac{\sqrt{x^2 - 1}}{x} \, dx =`)).toBe('√(x² − 1) − arctan(√(x² − 1)) + c')
    expect(text(r`\int \sin(\ln x) \, dx =`)).toBe('(x(sin(ln(x)) − cos(ln(x))))/2 + c')
    expect(text(r`\int \frac{1}{1 + e^x} \, dx =`)).toBe('x − ln(e^(x) + 1) + c')
  })

  it('per parti', () => {
    expect(text(r`\int x e^x \, dx =`)).toBe('(x − 1)e^(x) + c')
    expect(tex(r`\int x e^x \, dx =`)).toBe(r`\left(x - 1\right)e^{x} + c`)
    expect(text(r`\int x^2 e^x \, dx =`)).toBe('(x² − 2x + 2)e^(x) + c')
    expect(text(r`\int x \sin x \, dx =`)).toBe('sin(x) − x cos(x) + c')
    expect(text(r`\int x^2 \cos x \, dx =`)).toBe('x² sin(x) + 2x cos(x) − 2 sin(x) + c')
    expect(text(r`\int \ln x \, dx =`)).toBe('x ln(x) − x + c')
    expect(text(r`\int x \ln x \, dx =`)).toBe('(x² ln(x))/2 − x²/4 + c')
    expect(text(r`\int \ln^2 x \, dx =`)).toBe('x ln²(x) − 2x ln(x) + 2x + c')
    expect(text(r`\int \arctan x \, dx =`)).toBe('x arctan(x) − ln(x² + 1)/2 + c')
    expect(text(r`\int \arcsin x \, dx =`)).toBe('x arcsin(x) + √(1 − x²) + c')
    expect(text(r`\int e^x \sin x \, dx =`)).toBe('((sin(x) − cos(x))e^(x))/2 + c')
    expect(text(r`\int \frac{x}{\cos^2 x} \, dx =`)).toBe('x tan(x) + ln|cos(x)| + c')
  })

  it('le funzioni razionali, con i fratti semplici', () => {
    expect(text(r`\int \frac{1}{x^2 - 1} \, dx =`)).toBe('ln|(x − 1)/(x + 1)|/2 + c')
    expect(text(r`\int \frac{x}{x^2 + 1} \, dx =`)).toBe('ln(x² + 1)/2 + c')
    expect(text(r`\int \frac{1}{x^2 + 2x + 5} \, dx =`)).toBe('arctan((x + 1)/2)/2 + c')
    expect(text(r`\int \frac{1}{x^2 + x + 1} \, dx =`)).toBe('(2√3 arctan((√3(2x + 1))/3))/3 + c')
    expect(text(r`\int \frac{1}{x(x+1)^2} \, dx =`)).toBe('1/(x + 1) + ln|x/(x + 1)| + c')
    // x(x + 1) con x la variabile è un prodotto, non una funzione x.
    expect(text(r`\int \frac{1}{x(x+1)} \, dx =`)).toBe('ln|x/(x + 1)| + c')
    expect(text(r`\int \frac{1}{(x^2+1)^2} \, dx =`)).toBe('x/(2(x² + 1)) + arctan(x)/2 + c')
    expect(text(r`\int \frac{x^3 + 1}{x^2 - 4} \, dx =`)).toBe('x²/2 + (9 ln|x − 2|)/4 + (7 ln|x + 2|)/4 + c')
    expect(text(r`\int \frac{1}{x^3 + 1} \, dx =`)).toBe('ln|x + 1|/3 − ln(x² − x + 1)/6 + (√3 arctan((√3(2x − 1))/3))/3 + c')
  })

  it('seno, coseno e le funzioni iperboliche', () => {
    expect(text(r`\int \sin^2 x \, dx =`)).toBe('x/2 − sin(2x)/4 + c')
    expect(text(r`\int \cos^3 x \, dx =`)).toBe('sin(x) − sin³(x)/3 + c')
    expect(text(r`\int \sin x \cos x \, dx =`)).toBe('sin²(x)/2 + c')
    expect(text(r`\int \tan^2 x \, dx =`)).toBe('tan(x) − x + c')
    expect(text(r`\int \sin^4 x \, dx =`)).toBe('(3x)/8 − sin(2x)/4 + sin(4x)/32 + c')
    expect(text(r`\int \sin(3x) \cos(2x) \, dx =`)).toBe('−cos(5x)/10 − cos(x)/2 + c')
    expect(text(r`\int \frac{1}{\cos x} \, dx =`)).toBe('ln|tan(x/2 + π/4)| + c')
    expect(text(r`\int \frac{1}{\sin x} \, dx =`)).toBe('ln|tan(x/2)| + c')
    expect(text(r`\int \frac{1}{1 + \cos x} \, dx =`)).toBe('tan(x/2) + c')
    expect(text(r`\int \cosh^2 x \, dx =`)).toBe('x/2 + sinh(2x)/4 + c')
  })

  it('le radici', () => {
    expect(text(r`\int \sqrt{1 - x^2} \, dx =`)).toBe('(x√(1 − x²))/2 + arcsin(x)/2 + c')
    expect(text(r`\int x \sqrt{x + 1} \, dx =`)).toBe('(2(x + 1)^(5/2))/5 − (2(x + 1)^(3/2))/3 + c')
    expect(text(r`\int \frac{\sqrt{x}}{1 + x} \, dx =`)).toBe('2√x − 2 arctan(√x) + c')
    expect(text(r`\int \frac{1}{\sqrt{x} + \sqrt[3]{x}} \, dx =`)).toBe('6⁶√x − 3∛x + 2√x − 6 ln(⁶√x + 1) + c')
  })

  it('quelle che non si scrivono con le funzioni elementari non hanno risultato (e non bloccano)', () => {
    const start = Date.now()
    expect(text(r`\int e^{-x^2} \, dx =`)).toBeNull()
    expect(text(r`\int \frac{\sin x}{x} \, dx =`)).toBeNull()
    expect(text(r`\int \sqrt{1 + x^3} \, dx =`)).toBeNull()
    expect(text(r`\int e^{x^2} \sin x \, dx =`)).toBeNull()
    expect(Date.now() - start).toBeLessThan(2000)
  })

  it('con le lettere nei coefficienti (numeri positivi): le radici e le frazioni di secondo grado', () => {
    expect(tex(r`\int \sqrt{R^2 - x^2} \, dx =`)).toBe(r`\frac{x\sqrt{R^{2} - x^{2}}}{2} + \frac{R^{2}\arcsin\left(\frac{x}{R}\right)}{2} + c`)
    expect(tex(r`\int \frac{1}{\sqrt{R^2 - x^2}} \, dx =`)).toBe(r`\arcsin\left(\frac{x}{R}\right) + c`)
    expect(tex(r`\int \frac{1}{x^2 + a^2} \, dx =`)).toBe(r`\frac{\arctan\left(\frac{x}{a}\right)}{a} + c`)
  })

  it('si definisce e si usa dopo; la costante cambia nome se la c c\'è già', () => {
    expect(text(r`F(x) = \int x e^x \, dx`, 'F(1) =')).toBe('0')
    expect(text(r`F(x) = \int x e^x \, dx`, "F'(x) =")).toBe('xe^(x)')
    expect(text(r`\int c x \, dx =`)).toBe('(cx²)/2 + k')
  })
})

describe('gli integrali definiti', () => {
  it('il valore esatto con la primitiva', () => {
    expect(text(r`\int_0^1 x^2 \, dx =`)).toBe('1/3')
    expect(text(r`\int_0^1 x e^x \, dx =`)).toBe('1')
    expect(text(r`\int_1^2 \frac{1}{x} \, dx =`)).toBe('ln(2) ≈ 0,693147…')
    expect(text(r`\int_0^{\pi} \sin^2 x \, dx =`)).toBe('π/2 ≈ 1,570796…')
    expect(text(r`\int_0^1 \arctan x \, dx =`)).toBe('π/4 − ln(2)/2 ≈ 0,438824…')
    expect(tex(r`\int_0^1 \arctan x \, dx =`)).toBe(r`\frac{\pi}{4} - \frac{\ln 2}{2} \approx 0{,}438824\ldots`)
    expect(text(r`\int_0^1 \sqrt{1 - x^2} \, dx =`)).toBe('π/4 ≈ 0,785398…')
    expect(text(r`\int_0^{\pi} x \sin x \, dx =`)).toBe('π ≈ 3,141592…')
    expect(text(r`\int_0^{\pi/2} \sin^3 x \cos x \, dx =`)).toBe('1/4')
    expect(text(r`\int_1^e \ln x \, dx =`)).toBe('1')
    expect(text(r`\int_0^{2\pi} \sin x \, dx =`)).toBe('0')
    // Con i decimali, le cifre.
    expect(text(r`\int_0^{0{,}5} x^2 \, dx =`)).toBe('0,0416666…')
  })

  it('gli impropri: il valore o +∞ se divergono', () => {
    expect(text(r`\int_0^{\infty} e^{-x} \, dx =`)).toBe('1')
    expect(text(r`\int_{-\infty}^{\infty} \frac{1}{1 + x^2} \, dx =`)).toBe('π ≈ 3,141592…')
    expect(text(r`\int_1^{\infty} \frac{1}{x^2} \, dx =`)).toBe('1')
    expect(text(r`\int_1^{\infty} \frac{1}{x} \, dx =`)).toBe('+∞')
    expect(text(r`\int_0^1 \frac{1}{x} \, dx =`)).toBe('+∞')
    expect(text(r`\int_0^1 \frac{1}{\sqrt{x}} \, dx =`)).toBe('2')
    expect(text(r`\int_0^1 \ln x \, dx =`)).toBe('−1')
    // Con un punto dove la funzione esplode in mezzo, F(1) − F(−1) = −2 sarebbe sbagliato: niente risultato.
    expect(text(r`\int_{-1}^{1} \frac{1}{x^2} \, dx =`)).toBeNull()
  })

  it('con le lettere: la funzione integrale e i parametri', () => {
    expect(text(r`\int_0^x t^2 \, dt =`)).toBe('x³/3')
    // Le lettere sono numeri positivi (da 1 a x l'integrale c'è solo per x > 0).
    expect(text(r`\int_1^x \frac{1}{t} \, dt =`)).toBe('ln(x)')
    expect(text(r`\int_0^1 a x \, dx =`)).toBe('a/2')
    expect(text(r`f(x) = a x^2`, r`\int_0^1 f(x) \, dx =`)).toBe('a/3')
    expect(text(r`\int_0^{L} \sin\left(\frac{\pi x}{L}\right) \, dx =`)).toBe('(2L)/π')
  })

  it('con le lettere: il volume della sfera e del cono, l\'area del cerchio', () => {
    expect(tex(r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx =`)).toBe(r`\frac{4\pi R^{3}}{3}`)
    expect(tex(r`2 \int_0^R \pi (R^2 - x^2) \, dx =`)).toBe(r`\frac{4\pi R^{3}}{3}`)
    expect(text(r`\int_0^h \pi \left(\frac{r x}{h}\right)^2 \, dx =`)).toBe('(πhr²)/3')
    // √(R²) = R: il raggio è positivo.
    expect(text(r`\int_{-R}^{R} 2 \sqrt{R^2 - x^2} \, dx =`)).toBe('πR²')
    // Con il numero al posto della lettera, il valore esatto.
    expect(text('R = 2', r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx =`)).toBe('(32π)/3 ≈ 33,510321…')
  })

  it('con le lettere: gli impropri e il valor medio', () => {
    expect(text(r`\int_0^{\infty} \lambda e^{-\lambda t} \, dt =`)).toBe('1')
    expect(text(r`\int_0^{\infty} t \lambda e^{-\lambda t} \, dt =`)).toBe('1/λ')
    expect(text(r`\int_R^{\infty} \frac{G M m}{r^2} \, dr =`)).toBe('(GmM)/R')
    expect(text(r`\int_0^{\infty} \frac{1}{x^2 + a^2} \, dx =`)).toBe('π/(2a)')
    expect(tex(r`\frac{1}{b - a} \int_a^b x^2 \, dx =`)).toBe(r`\frac{a^{2} + ab + b^{2}}{3}`)
    // Converge solo per p > 1: dipende dalla lettera, niente risultato.
    expect(text(r`\int_1^{\infty} \frac{1}{x^p} \, dx =`)).toBeNull()
  })

  it('dentro un\'espressione, con i numeri: il valore esatto', () => {
    expect(text(r`\int_0^1 x \, dx + \int_0^1 x^2 \, dx =`)).toBe('5/6')
    expect(text(r`\frac{1}{\pi} \int_0^{\pi} \sin x \, dx =`)).toBe('2/π ≈ 0,636619…')
  })

  it('il valore si usa dopo, esatto', () => {
    expect(text(r`I = \int_0^1 x^2 \, dx =`, '3I =')).toBe('1')
  })
})

describe('le correzioni', () => {
  it('\\pi (R^2 - x^2) è π per (R² − x²) anche con le lettere, come con i numeri', () => {
    expect(text(r`\int_0^R \pi (R^2 - x^2) \, dx =`)).toBe('(2πR³)/3')
  })

  it('con le lettere un integrale che diverge non ha risultato: F(a) − F(−a) = −2/a sarebbe sbagliato', () => {
    expect(text(r`\int_{-a}^{a} \frac{1}{x^2} \, dx =`)).toBeNull()
  })

  it('la variabile di un integrale resta variabile anche se la nota la definisce come numero', () => {
    expect(text('t = 5', r`F(x) = \int_0^x t^2 \, dt`, "F'(x) =")).toBe('x²')
    expect(text('t = 5', r`\frac{d}{dx} \int_0^x t^2 \, dt =`)).toBe('x²')
  })

  it('a(x + 1)^2 con a un numero è a · (x + 1)², non (a(x + 1))²', () => {
    expect(text('a = 3', 'x = 1', 'a(x+1)^2 =')).toBe('12')
    // Anche con la virgola (a non è una frazione): 4√2, non 8.
    expect(text(r`a = \sqrt{2}`, 'x = 1', 'a(x+1)^2 =')).toBe('5,656854…')
    expect(text(r`\int x(x+1)^2 \, dx =`)).toBe('x⁴/4 + (2x³)/3 + x²/2 + c')
    // Con una funzione è il quadrato del suo valore.
    expect(text('f(x) = x + 1', 'f(2)^2 =')).toBe('9')
  })

  it('uno spazio scritto (\\,) chiude l\'argomento di una funzione', () => {
    expect(parseMath(r`\cos x \, e^{\sin x}`)).toMatchObject({ k: 'bin', op: '*', a: { k: 'fn', name: 'cos', args: [{ k: 'name', name: 'x' }] } })
    // Senza lo spazio vale la regola del LaTeX: l'argomento continua.
    expect(parseMath(r`\cos x e^{\sin x}`)).toMatchObject({ k: 'fn', name: 'cos', args: [{ k: 'bin', op: '*' }] })
  })

  it('le potenze delle somme si sviluppano (prima la ricorsione non finiva)', () => {
    const x = sym('x')
    const square = expand(pow(add(x, num(1)), num(2)))
    expect(key(square)).toBe(key(add(pow(x, num(2)), mul(num(2), x), num(1))))
  })
})

describe('i polinomi', () => {
  it('i fattori senza quadrati, la scomposizione e i fratti semplici', () => {
    // x³ + 2x² + x = x (x + 1)²
    const D = [R(0), R(1), R(2), R(1)]
    expect(squareFree(D).map(({ p, m }) => `${p.map((c) => c.toNumber())}:${m}`)).toEqual(['0,1:1', '1,1:2'])
    const parts = partialFractions([R(1)], D)!
    expect(parts.parts.map((p) => `${p.factor.map((c) => c.toNumber())}^${p.k}:${p.num.map((c) => c.toNumber())}`)).toEqual(['0,1^1:1', '1,1^1:-1', '1,1^2:-1'])
    // x⁴ + 5x² + 4 = (x² + 1)(x² + 4): i fattori di secondo grado con le frazioni.
    const { factors } = factorQ([R(4), R(0), R(5), R(0), R(1)])
    expect(factors.map((f) => f.p.map((c) => c.toNumber()).join(',')).sort()).toEqual(['1,0,1', '4,0,1'])
  })
})

describe('nei grafici', () => {
  it('una primitiva si disegna (con c = 0)', () => {
    const spec = parseGraph(r`\int \cos x \, dx`)
    expect(spec.errors).toEqual([])
    const f = (spec.items[0] as Extract<GraphItem, { kind: 'function' }>).f
    expect(f(Math.PI / 2)).toBeCloseTo(1, 9)
    // Nel pannello della formula.
    expect(formulaGraph(r`\int x e^x \, dx`)).not.toBeNull()
  })
})
