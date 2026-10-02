import { describe, expect, it } from 'vitest'
import { compile, EMPTY_SCOPE, errorMessage, scopeWith } from '../src/math/evaluate'
import { toLatex } from '../src/math/latex'
import { parseMath, parseStatement } from '../src/math/parse'
import { calculationRequest, Sheet, splitPieces } from '../src/math/sheet'

const r = String.raw

/** Il valore dell'espressione, con x (e le altre variabili) come detto. */
function value(src: string, vars: Record<string, number> = {}): number {
  return compile(parseMath(src), scopeWith(EMPTY_SCOPE, Object.keys(vars)))(vars)
}

function error(src: string): string {
  try {
    compile(parseMath(src), scopeWith(EMPTY_SCOPE, ['x']))({ x: 1 })
  } catch (err) {
    return errorMessage(err)
  }
  return ''
}

/** Il risultato mostrato dopo l'ultima formula, con le formule prima come definizioni. */
function result(...formulas: string[]): string | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last?.tex ?? null
}

describe('le espressioni, scritte in LaTeX o come in una calcolatrice', () => {
  it('fa i conti di base, con le precedenze giuste', () => {
    expect(value('2 + 3 \\cdot 4')).toBe(14)
    expect(value('(2 + 3) \\cdot 4')).toBe(20)
    expect(value('-x^2', { x: 3 })).toBe(-9)
    expect(value('2^3^{}'.replace('^{}', ''))).toBe(8)
    expect(value('6 : 3')).toBe(2)
    expect(value('7 \\div 2')).toBe(3.5)
    expect(value('3 \\times 4')).toBe(12)
    expect(value('2*x', { x: 5 })).toBe(10)
    expect(value('1/2x', { x: 4 })).toBe(2)
  })

  it('legge le potenze come il LaTeX (una cifra sola senza graffe), e come una calcolatrice dove il LaTeX non ha senso', () => {
    expect(value('x^23', { x: 3 })).toBe(27)
    expect(value('x^{23}', { x: 1 })).toBe(1)
    expect(value('x^-1', { x: 2 })).toBe(0.5)
    expect(value('2^(x+1)', { x: 1 })).toBe(4)
    expect(value('e^{-x^2}', { x: 0 })).toBe(1)
    expect(value('e^x', { x: 1 })).toBeCloseTo(Math.E, 12)
    expect(value('x^{\\frac{1}{3}}', { x: -8 })).toBeCloseTo(-2, 12)
    expect(value('x^{2/3}', { x: -8 })).toBeCloseTo(4, 12)
  })

  it('moltiplica senza segno come nelle formule', () => {
    expect(value('2x', { x: 3 })).toBe(6)
    expect(value('2\\pi', {})).toBeCloseTo(2 * Math.PI, 12)
    expect(value('(x+1)(x-1)', { x: 2 })).toBe(3)
    expect(value('x(x+1)', { x: 2 })).toBe(6)
    expect(value('ab', { a: 2, b: 5 })).toBe(10)
    expect(value('x\\sin x', { x: 1 })).toBeCloseTo(Math.sin(1), 12)
  })

  it('capisce frazioni, radici e valori assoluti', () => {
    expect(value('\\frac{1}{2}')).toBe(0.5)
    expect(value('\\frac12')).toBe(0.5)
    expect(value('\\dfrac{x}{4}', { x: 2 })).toBe(0.5)
    expect(value('\\sqrt{16}')).toBe(4)
    expect(value('\\sqrt x', { x: 9 })).toBe(3)
    expect(value('\\sqrt[3]{-8}')).toBeCloseTo(-2, 12)
    expect(value('sqrt(x)', { x: 25 })).toBe(5)
    expect(value('|x - 3|', { x: 1 })).toBe(2)
    expect(value('||x|-1|', { x: -3 })).toBe(2)
    expect(value('|x||x|', { x: -2 })).toBe(4)
    expect(value(r`\left| x \right|`, { x: -5 })).toBe(5)
    expect(value(r`\lvert x \rvert`, { x: -5 })).toBe(5)
    expect(value(r`\lfloor x \rfloor`, { x: 2.7 })).toBe(2)
  })

  it('sa le funzioni con e senza parentesi: \\sin 2x è sin(2x), \\sin x \\cos x è sin(x)·cos(x)', () => {
    expect(value('\\sin 2x', { x: 1 })).toBeCloseTo(Math.sin(2), 12)
    expect(value('\\sin x \\cos x', { x: 1 })).toBeCloseTo(Math.sin(1) * Math.cos(1), 12)
    expect(value('\\sin^2 x + \\cos^2 x', { x: 0.7 })).toBeCloseTo(1, 12)
    expect(value('\\sin(x)^2', { x: 0.7 })).toBeCloseTo(Math.sin(0.7) ** 2, 12)
    expect(value('\\sin^{-1} 1')).toBeCloseTo(Math.PI / 2, 12)
    expect(value('sin(pi/2)')).toBe(1)
    expect(value('\\ln x^2', { x: Math.E })).toBeCloseTo(2, 12)
    expect(value('\\ln |x|', { x: -Math.E })).toBeCloseTo(1, 12)
    expect(value('\\sin \\cos x', { x: 0 })).toBeCloseTo(Math.sin(1), 12)
  })

  it('conosce i nomi italiani e quelli dei libri', () => {
    expect(value('\\operatorname{sen} x', { x: 1 })).toBeCloseTo(Math.sin(1), 12)
    expect(value('sen x', { x: 1 })).toBeCloseTo(Math.sin(1), 12)
    expect(value('\\tg x', { x: 1 })).toBeCloseTo(Math.tan(1), 12)
    expect(value('tg(x)', { x: 1 })).toBeCloseTo(Math.tan(1), 12)
    expect(value('\\arctg x', { x: 1 })).toBeCloseTo(Math.PI / 4, 12)
    expect(value('\\operatorname{settsinh} x', { x: 1 })).toBeCloseTo(Math.asinh(1), 12)
    expect(value('\\operatorname{sgn}(x)', { x: -3 })).toBe(-1)
  })

  it('il logaritmo senza base è quello naturale, come in Analisi', () => {
    expect(value('\\log e')).toBeCloseTo(1, 12)
    expect(value('\\ln e')).toBeCloseTo(1, 12)
    expect(value('\\log_2 8')).toBeCloseTo(3, 12)
    expect(value('\\log_{10} 1000')).toBeCloseTo(3, 12)
    expect(value('\\lg 100')).toBeCloseTo(2, 12)
    expect(value('\\mathrm{e}')).toBeCloseTo(Math.E, 12)
  })

  it('legge i decimali con la virgola e le migliaia con i punti', () => {
    expect(value('0,5x', { x: 4 })).toBe(2)
    expect(value('2{,}5')).toBe(2.5)
    expect(value('2.5')).toBe(2.5)
    expect(value('2.500.000')).toBe(2500000)
    expect(value('1\\,000')).toBe(1000)
    expect(value('\\frac{1,5}{3}')).toBe(0.5)
    // Tra parentesi la virgola separa: (1,2) è un punto.
    expect(parseMath('(1,2)')).toMatchObject({ k: 'tuple' })
  })

  it('fattoriali, coefficienti binomiali, percentuali e gradi', () => {
    expect(value('5!')).toBe(120)
    expect(value('(2+1)!')).toBe(6)
    expect(value('\\binom{5}{2}')).toBe(10)
    expect(value('20\\% \\cdot 150')).toBeCloseTo(30, 12)
    expect(value('\\sin 30^\\circ')).toBeCloseTo(0.5, 12)
    expect(value('\\cos 60^{\\circ}')).toBeCloseTo(0.5, 12)
    expect(value('\\max(1, 2, 7)')).toBe(7)
    expect(value('\\min\\{3, 4\\}')).toBe(3)
  })

  it('somme, prodotti e integrali', () => {
    expect(value('\\sum_{k=1}^{10} k')).toBe(55)
    expect(value('\\sum_{k=1}^{n} k^2', { n: 3 })).toBe(14)
    expect(value('\\prod_{k=1}^{5} k')).toBe(120)
    expect(value('\\sum_{k=0}^{3} \\binom{3}{k}')).toBe(8)
    expect(value('\\int_0^1 x^2 \\, dx')).toBeCloseTo(1 / 3, 10)
    expect(value('\\int_0^{\\pi} \\sin t \\, \\mathrm{d}t')).toBeCloseTo(2, 10)
    expect(value('\\int_0^{\\infty} e^{-x} dx')).toBeCloseTo(1, 8)
    expect(value('\\int_{-\\infty}^{+\\infty} e^{-x^2} dx')).toBeCloseTo(Math.sqrt(Math.PI), 8)
    expect(value('\\int_0^1 \\frac{1}{\\sqrt{x}} dx')).toBeCloseTo(2, 4)
  })

  it('le funzioni a tratti con \\begin{cases}', () => {
    const f = r`\begin{cases} x^2 & \text{se } x < 0 \\ x, & \text{altrimenti} \end{cases}`
    expect(value(f, { x: -2 })).toBe(4)
    expect(value(f, { x: 3 })).toBe(3)
    expect(value(r`\begin{cases} 1 & x \ge 0 \end{cases}`, { x: -1 })).toBeNaN()
  })

  it('fuori dal dominio il valore non c\'è', () => {
    expect(value('\\sqrt{x}', { x: -1 })).toBeNaN()
    expect(value('\\ln x', { x: -1 })).toBeNaN()
    expect(value('\\frac{1}{x}', { x: 0 })).toBe(Infinity)
  })

  it('le condizioni: catene, intervalli, «e» e «o»', () => {
    const cond = (src: string, x: number) => {
      const { cond } = parseStatement(`y = 1, ${src}`)
      return compile({ k: 'cases', rows: [{ value: { k: 'num', v: 1, text: '1', comma: false }, cond }] }, scopeWith(EMPTY_SCOPE, ['x']))({ x })
    }
    expect(cond('0 \\le x \\le 2', 1)).toBe(1)
    expect(cond('0 \\le x \\le 2', 3)).toBeNaN()
    expect(cond('x \\in [0, 2]', 2)).toBe(1)
    expect(cond('x \\in [0, 2)', 2)).toBeNaN()
    expect(cond('x \\in ]0, 2[', 0)).toBeNaN()
    expect(cond('x \\in [1, +\\infty)', 100)).toBe(1)
    expect(cond('x < -1 \\lor x > 1', 2)).toBe(1)
    expect(cond('x > 0 \\text{ e } x < 1', 0.5)).toBe(1)
    expect(cond('x \\ne 0', 0)).toBeNaN()
    expect(parseStatement('y = x^2 \\quad \\text{per } x > 0').cond).toMatchObject({ k: 'rel', ops: ['>'] })
    expect(parseStatement('y = x^2 \\{x > 0\\}').cond).toMatchObject({ k: 'rel' })
  })

  it('spiega gli errori in italiano', () => {
    expect(error('\\frac{1}{')).toMatch(/Manca il denominatore/)
    expect(error('x^')).toMatch(/Manca l'esponente/)
    expect(error('(x + 1')).toMatch(/Manca la parentesi \)/)
    expect(error('x + 1)')).toMatch(/parentesi «\)» di troppo/)
    expect(error('\\lim_{x \\to 0} x')).toMatch(/limiti/)
    expect(error('2 3')).toMatch(/Due numeri di seguito/)
    expect(error('q + 1')).toBe('q non è definita')
    expect(error('x +')).toMatch(/Manca qualcosa dopo \+/)
    expect(error('\\sin')).toMatch(/Manca l'argomento di sin/)
    expect(error('x^2^3')).toMatch(/Due esponenti/)
    expect(error('\\pm 1')).toMatch(/due valori/)
  })
})

describe('il foglio: definizioni e risultati dopo «=»', () => {
  it('riconosce le formule che chiedono un risultato', () => {
    expect(calculationRequest('3 + 4 =')).toBe('3 + 4 ')
    expect(calculationRequest('3 + 4 = \\,')).toBe('3 + 4 ')
    expect(calculationRequest('\\sqrt 2 \\approx')).toBe('\\sqrt 2 ')
    expect(calculationRequest('x \\le')).toBeNull()
    expect(calculationRequest('x <=')).toBeNull()
    expect(calculationRequest('=')).toBeNull()
    expect(calculationRequest('3 + 4 = 7')).toBeNull()
    // Per non avere il risultato: ={}
    expect(calculationRequest('f(x) ={}')).toBeNull()
  })

  it('divide più definizioni nella stessa formula, non i decimali', () => {
    expect(splitPieces('a = 2, \\quad b = 0,5')).toEqual(['a = 2', ' b = 0,5'])
    expect(splitPieces('f(x, y) = x')).toEqual(['f(x, y) = x'])
    expect(splitPieces('a = 1;\\, b = 2')).toEqual(['a = 1', '\\, b = 2'])
  })

  it('calcola con le definizioni scritte prima', () => {
    expect(result('a = 2', 'b = a + 1', 'a + b =')).toBe('5')
    expect(result('f(x) = x^2 + 1', 'f(3) =')).toBe('10')
    expect(result('g(x, y) = x y', 'g(2, 5) =')).toBe('10')
    expect(result('x = 3 \\quad x^2 =')).toBe('9')
    expect(result('a := 4', '2a =')).toBe('8')
    expect(result('\\Delta = 9', '\\sqrt{\\Delta} =')).toBe('3')
  })

  it('a = 3 + 4 = mostra 7 e definisce a', () => {
    const sheet = new Sheet()
    expect(sheet.add('a = 3 + 4 =')?.tex).toBe('7')
    expect(sheet.add('2a =')?.tex).toBe('14')
  })

  it('una definizione nuova prende il posto della vecchia, dal punto in cui è scritta', () => {
    expect(result('a = 2', 'b = a + 1', 'a = 10', 'b =')).toBe('3')
    expect(result('a = 2', 'a = 10', 'a =')).toBe('10')
    // y diventa un'espressione con x: non è più un numero.
    expect(result('y = 3', 'y = 2x + 1', 'y =')).toBeNull()
  })

  it('le frazioni restano frazioni; un conto con i decimali dà decimali, con la virgola come sono scritti', () => {
    expect(result('\\frac{1}{3} + \\frac{1}{6} =')).toBe('\\frac{1}{2}')
    expect(result('\\frac{2}{3} - 1 =')).toBe('-\\frac{1}{3}')
    expect(result('\\frac{1}{3} =')).toBe('0{,}333333\\ldots')
    expect(result('\\frac{6}{4} =')).toBe('1{,}5')
    expect(result('0{,}1 + 0{,}2 =')).toBe('0{,}3')
    expect(result('0,1 + 0,2 =')).toBe('0{,}3')
    expect(result('0.1 + 0.2 =')).toBe('0.3')
    expect(result('2{,}5 \\cdot 4 =')).toBe('10')
  })

  it('i numeri che non finiscono hanno i puntini; grandi e piccoli con le potenze di 10', () => {
    expect(result('\\sqrt{2} =')).toBe('1{,}414213\\ldots')
    expect(result('\\pi =')).toBe('3{,}141592\\ldots')
    expect(result('\\sqrt{16} =')).toBe('4')
    expect(result('2^{10} =')).toBe('1024')
    expect(result('30! =')).toBe('2{,}652528\\ldots \\cdot 10^{32}')
    expect(result('e = 1{,}6 \\cdot 10^{-19}', '2e =')).toBe('3{,}2 \\cdot 10^{-19}')
    expect(result('\\frac{1}{7000} =')).toBe('0{,}000142857\\ldots')
  })

  it('i resti della virgola mobile non si vedono: sin π = 0', () => {
    expect(result('\\sin \\pi =')).toBe('0')
    expect(result('\\cos \\frac{\\pi}{3} =')).toBe('0{,}5')
    expect(result('\\sqrt{2} \\cdot \\sqrt{8} =')).toBe('4')
    expect(result('\\tan \\frac{\\pi}{2} =')).toBeNull()
  })

  it('derivate e integrali', () => {
    expect(result('f(x) = x^3', "f'(2) =")).toBe('12')
    expect(result('f(x) = x^3', "f''(2) =")).toBe('12')
    expect(result('\\int_0^1 x^2 \\, dx =')).toBe('0{,}333333\\ldots')
    expect(result('\\int_0^{\\pi} \\sin x \\, dx =')).toBe('2')
    expect(result('\\sum_{k=1}^{100} k =')).toBe('5050')
    expect(result('\\sum_{k=1}^{3} \\frac{1}{k} =')).toBe('\\frac{11}{6}')
  })

  it('le somme enormi non bloccano la pagina: senza risultato', () => {
    const start = Date.now()
    expect(result('\\sum_{i=1}^{100000} \\sum_{j=1}^{100000} 1 =')).toBeNull()
    expect(result('\\sum_{k=1}^{10^{9}} k =')).toBeNull()
    expect(result('\\binom{10^{9}}{5 \\cdot 10^{8}} =')).toBeNull()
    expect(Date.now() - start).toBeLessThan(3000)
    // Quelle normali sì, anche annidate.
    expect(result('\\sum_{i=1}^{10} \\sum_{j=1}^{i} j =')).toBe('220')
  })

  it('senza un risultato sicuro non mostra niente', () => {
    expect(result('x + 1 =')).toBeNull()
    // Nei reali √−1 non c'è: il risultato sono le due radici complesse.
    expect(result('\\sqrt{-1} =')).toBe('i;\\ -i')
    expect(result('\\frac{1}{0} =')).toBeNull()
    expect(result('\\lim_{x \\to 0} \\frac{\\sin x}{x} =')).toBeNull()
    expect(result('3 + 4 = 7')).toBeNull()
  })

  it('in una catena di uguali usa l\'ultima parte che si sa calcolare', () => {
    expect(result('\\int_0^2 x \\, dx = \\left[\\frac{x^2}{2}\\right]_0^2 =')).toBe('2')
    expect(result('(a+b)^2 = 3^2 =')).toBe('9')
  })

  it('dà ai grafici le definizioni che servono, anche indirette, nell\'ordine in cui sono scritte', () => {
    const sheet = new Sheet()
    for (const f of ['a = 2', 'c = 7', 'f(x) = a x^2', 'g(x) = x', 'a = 3']) sheet.add(f)
    expect(sheet.definitionsFor(['f'])).toEqual(['a = 2', 'f(x) = a x^2', 'a = 3'])
  })
})

describe('le espressioni riscritte in LaTeX', () => {
  const tex = (src: string) => toLatex(parseMath(src))
  it('come si scrivono a mano', () => {
    expect(tex('sqrt(x)/2')).toBe('\\frac{\\sqrt{x}}{2}')
    expect(tex('2x + 1')).toBe('2x + 1')
    expect(tex('2*3')).toBe('2 \\cdot 3')
    expect(tex('sin(x)^2')).toBe('\\sin^{2} x')
    expect(tex('\\sin(2x)')).toBe('\\sin\\left(2x\\right)')
    expect(tex('(x+1)^2')).toBe('\\left(x + 1\\right)^{2}')
    expect(tex('-x^2')).toBe('-x^{2}')
    expect(tex('0,5x')).toBe('0{,}5x')
    expect(tex('\\alpha_1 + x_0')).toBe('\\alpha_{1} + x_{0}')
    expect(tex('\\bar{x}')).toBe('\\bar{x}')
    expect(tex("f'(x)")).toBe("f'(x)")
    expect(tex('g(\\frac{1}{2})')).toBe('g\\left(\\frac{1}{2}\\right)')
    expect(tex('x - (y - 1)')).toBe('x - \\left(y - 1\\right)')
    expect(tex('\\log_2 x')).toBe('\\log_{2} x')
    expect(tex('|x|')).toBe('\\left|x\\right|')
  })
})
