import { describe, expect, it } from 'vitest'
import { compileDomain, insideIntervals } from '../src/math/domain'
import { EMPTY_SCOPE, errorMessage, type Scope } from '../src/math/evaluate'
import { formatNumber } from '../src/math/format'
import { toLatex } from '../src/math/latex'
import { parseMath, parseStatement } from '../src/math/parse'
import { Sheet } from '../src/math/sheet'

const r = String.raw

/** Il risultato mostrato dopo l'ultima formula, con le formule prima come definizioni. */
function result(...formulas: string[]): string | null {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.add(f)
  return last?.text ?? null
}

function parseError(src: string): string {
  try {
    parseStatement(src)
  } catch (err) {
    return errorMessage(err)
  }
  return ''
}

/** Lo scope con gli insiemi definiti nelle formule `defs` (D = \{…\}). */
function scopeWithSets(...defs: string[]): Scope {
  const sheet = new Sheet()
  for (const d of defs) sheet.define(d)
  return sheet.scope()
}

describe('gli integrali doppi e tripli: come si scrivono', () => {
  it('\\iint e \\iiint con il dominio sotto e i differenziali alla fine', () => {
    for (const [src, vars] of [
      [r`\iint_D f \, dx \, dy`, ['x', 'y']],
      [r`\iint_D x y \, dA`, ['x', 'y']],
      [r`\iint_{[0,1]^2} e^{x+y} \, d(x, y)`, ['x', 'y']],
      [r`\iint_D x \, dy \, dx`, ['y', 'x']],
      [r`\iiint_E 1 \, dV`, ['x', 'y', 'z']],
      [r`\iiint_E z \, dx \, dy \, dz`, ['x', 'y', 'z']],
    ] as const) {
      const node = parseMath(src)
      expect(node.k, src).toBe('mint')
      if (node.k === 'mint') expect(node.vars, src).toEqual(vars)
    }
    // Senza la funzione: ∬_D dA è l'area di D.
    const area = parseMath(r`\iint_D dA`)
    expect(area.k === 'mint' && area.body).toEqual({ k: 'num', v: 1, text: '1', comma: false })
  })

  it('i differenziali che mancano o sono troppi lo dicono', () => {
    expect(parseError(r`\iint_{[0,1]^2} x \, dx`)).toBe(r`Alla fine dell'integrale doppio va dx \, dy (o dA)`)
    expect(parseError(r`\iint_{x^2 + y^2 \le 1} x \, dx \, dy \, dz`)).toBe(r`Alla fine dell'integrale doppio va dx \, dy (o dA)`)
  })

  it('gli insiemi: {(x, y) : …}, con | o \\mid o \\colon, anche dentro l\'integrale', () => {
    for (const src of [r`\{(x, y) : x^2 + y^2 \le 1\}`, r`\{(x, y) \mid x^2 + y^2 \le 1\}`, r`\{(x,y) \colon x^2 + y^2 \le 1\}`]) {
      const node = parseMath(src)
      expect(node.k, src).toBe('set')
      if (node.k === 'set') expect(node.vars).toEqual(['x', 'y'])
    }
    expect(toLatex(parseMath(r`\{(x,y) : 0 \le x \le 1, 0 \le y \le x\}`))).toBe(r`\left\{ (x, y) : 0 \le x \le 1,\; 0 \le y \le x \right\}`)
  })

  it('in LaTeX: i rettangoli con le quadre e il ×, le somme tra parentesi', () => {
    expect(toLatex(parseMath(r`\iint_{[0,1] × [0,2]} x \, dx \, dy`))).toBe(r`\iint_{[0, 1] \times [0, 2]} x \, dx \, dy`)
    expect(toLatex(parseMath(r`\iint_{[0,1]^2} (x + y) \, dA`))).toBe(r`\iint_{[0, 1]^{2}} \left(x + y\right) \, dx \, dy`)
    expect(toLatex(parseMath(r`\int_0^1 (x + 1) \, dx`))).toBe(r`\int_{0}^{1} \left(x + 1\right) \, dx`)
    // Un integrale dentro l'altro non va tra parentesi.
    expect(toLatex(parseMath(r`\int_0^1 \int_0^x x y \, dy \, dx`))).toBe(r`\int_{0}^{1} \int_{0}^{x} xy \, dy \, dx`)
  })
})

describe('gli integrali doppi e tripli: i valori nella nota', () => {
  it('su rettangoli e parallelepipedi', () => {
    expect(result(r`\iint_{[0,1] \times [0,2]} x y \, dx \, dy =`)).toBe('1')
    expect(result(r`\iint_{[0,1] × [0,2]} x \, dx \, dy =`)).toBe('1')
    expect(result(r`\iint_{[0,1]^2} e^{x+y} \, d(x, y) =`)).toBe('2,952492…')
    expect(result(r`\iiint_{[0,1]^3} x y z \, dV =`)).toBe('0,125')
  })

  it('su domini scritti con le disuguaglianze, o con il nome di un insieme', () => {
    expect(result(r`\iint_{x^2 + y^2 \le 1} 1 \, dx \, dy =`)).toBe('3,141592…')
    expect(result(r`D = \{(x, y) : x^2 + y^2 \le 1\}`, r`\iint_D dA =`)).toBe('3,141592…')
    expect(result(r`\iint_{x^2 + y^2 \le 1} (x^2 + y^2) \, dx \, dy =`)).toBe('1,570796…')
    expect(result(r`D = \{0 \le x \le 1, 0 \le y \le x\}`, r`\iint_D x y \, dx \, dy =`)).toBe('0,125')
    expect(result(r`D = \{(u, v) \mid u^2 + v^2 < 4\}`, r`\iint_D u^2 \, du \, dv =`)).toBe('12,566371…')
    expect(result(r`\iiint_{x^2+y^2+z^2 \le 1} dV =`)).toBe('4,188790…')
    expect(result(r`E = \{(x,y,z) : x \ge 0, y \ge 0, z \ge 0, x + y + z \le 1\}`, r`\iiint_E 1 \, dx \, dy \, dz =`)).toBe('0,166666…')
    expect(result(r`\iiint_{x^2 + y^2 \le 1, 0 \le z \le 2} 1 \, dV =`)).toBe('6,283185…')
  })

  it('uno dentro l\'altro, anche in coordinate polari e sferiche: esatti, con le primitive', () => {
    expect(result(r`\int_0^1 \int_0^x x y \, dy \, dx =`)).toBe('1/8')
    expect(result(r`\int_0^{2\pi} \int_0^1 r \, dr \, d\theta =`)).toBe('π ≈ 3,141592…')
    expect(result(r`\int_0^{2\pi} \int_0^{\pi} \int_0^1 \rho^2 \sin\varphi \, d\rho \, d\varphi \, d\theta =`)).toBe('(4π)/3 ≈ 4,188790…')
    expect(result(r`\int_0^{\infty} \int_0^{\infty} e^{-x - y} \, dy \, dx =`)).toBe('1')
    // Senza primitiva, con i numeri.
    expect(result(r`\int_0^1 \int_0^1 e^{-x^2 y^2} \, dy \, dx =`)).toBe('0,905940…')
  })

  it('uno dentro l\'altro con le lettere: la sfera in coordinate sferiche, cilindriche e cartesiane', () => {
    const sphere = '(4πR³)/3'
    expect(result(r`\int_0^{2\pi} \int_0^{\pi} \int_0^R \rho^2 \sin\varphi \, d\rho \, d\varphi \, d\theta =`)).toBe(sphere)
    expect(result(r`\int_0^{2\pi} \int_0^R \int_{-\sqrt{R^2 - r^2}}^{\sqrt{R^2 - r^2}} r \, dz \, dr \, d\theta =`)).toBe(sphere)
    expect(result(r`\int_{-R}^{R} \int_{-\sqrt{R^2 - x^2}}^{\sqrt{R^2 - x^2}} \int_{-\sqrt{R^2 - x^2 - y^2}}^{\sqrt{R^2 - x^2 - y^2}} dz \, dy \, dx =`)).toBe(sphere)
    expect(result('R = 2', r`\int_0^{2\pi} \int_0^{\pi} \int_0^R \rho^2 \sin\varphi \, d\rho \, d\varphi \, d\theta =`)).toBe('(32π)/3 ≈ 33,510321…')
    expect(result(r`\int_0^{2\pi} \int_0^R r \, dr \, d\theta =`)).toBe('πR²')
    expect(result(r`\int_0^{2\pi} \int_0^{\pi} R^2 \sin\varphi \, d\varphi \, d\theta =`)).toBe('4πR²')
    expect(result(r`\int_0^a \int_0^b x y \, dy \, dx =`)).toBe('(a²b²)/4')
  })

  it('con un nome il valore si usa dopo', () => {
    expect(result(r`V = \iint_{[0,1]^2} (x + y) \, dA`, 'V =')).toBe('1')
    expect(result(r`A = \iint_{x^2 + y^2 \le 4} dA`, r`\frac{A}{\pi} =`)).toBe('4')
  })

  it('su un dominio non limitato non c\'è un valore', () => {
    expect(result(r`\iint_{y > x^2} 1 \, dA =`)).toBeNull()
    expect(result(r`\iint_{x^2 + y^2 \le 1 \text{ o } x \ge 0} 1 \, dA =`)).toBeNull()
  })
})

describe('i domini', () => {
  it('il margine: positivo dentro, negativo fuori; con le condizioni una per una', () => {
    const disk = compileDomain(parseMath(r`\{(x, y) : x^2 + y^2 \le 1, y \ge 0\}`), EMPTY_SCOPE, null)
    expect(disk.vars).toEqual(['x', 'y'])
    expect(disk.margin({ x: 0, y: 0.5 })).toBeGreaterThan(0)
    expect(disk.margin({ x: 0, y: -0.5 })).toBeLessThan(0)
    expect(disk.margin({ x: 2, y: 0.5 })).toBeLessThan(0)
    expect(disk.parts).toHaveLength(2)
    expect(disk.strictParts).toEqual([false, false])
    // Con «o» le condizioni non valgono tutte insieme.
    expect(compileDomain(parseMath(r`\{(x, y) : x < 0 \text{ o } y < 0\}`), EMPTY_SCOPE, null).parts).toBeNull()
    expect(compileDomain(parseMath(r`\{(x, y) : y > x^2, y \le 4\}`), EMPTY_SCOPE, null).strictParts).toEqual([true, false])
  })

  it('a strati: ogni variabile tra due estremi che usano quelle prima', () => {
    const domain = compileDomain(parseMath(r`\{(x, y) : 0 \le x \le 1, x^2 \le y \le x\}`), EMPTY_SCOPE, null)
    const layers = domain.layers!
    expect(layers.vars).toEqual(['x', 'y'])
    expect([layers.lo[0]({}), layers.hi[0]({})]).toEqual([0, 1])
    expect([layers.lo[1]({ x: 0.5 }), layers.hi[1]({ x: 0.5 })]).toEqual([0.25, 0.5])
    // L'ordine si trova da solo: y prima di x.
    expect(compileDomain(parseMath(r`\{(x, y) : y \le x \le 2, 0 \le y \le 1\}`), EMPTY_SCOPE, null).layers?.vars).toEqual(['y', 'x'])
    // x + y \le 1 non è una catena su una variabile: niente strati.
    expect(compileDomain(parseMath(r`\{(x, y) : x \ge 0, y \ge 0, x + y \le 1\}`), EMPTY_SCOPE, null).layers).toBeNull()
    // Un rettangolo è a strati.
    expect(compileDomain(parseMath(r`[0, 1] \times [2, 3]`), EMPTY_SCOPE, null).layers?.vars).toEqual(['x', 'y'])
  })

  it('il nome di un insieme definito prima', () => {
    const scope = scopeWithSets(r`D = \{(x, y) : x^2 + y^2 \le 4\}`)
    const domain = compileDomain(parseMath('D'), scope, null)
    expect(domain.margin({ x: 1, y: 1 })).toBeGreaterThan(0)
    expect(domain.margin({ x: 2, y: 1 })).toBeLessThan(0)
  })

  it('dove si è dentro lungo una linea, anche nei pezzi più corti di un passo', () => {
    expect(insideIntervals((t) => 1 - t * t, -2, 2)).toEqual([[expect.closeTo(-1, 9), expect.closeTo(1, 9)]])
    // Un pezzo lungo 0,01 tra 40 punti a distanza 0,1.
    const tiny = insideIntervals((t) => 0.005 - Math.abs(t - 0.333), -2, 2)
    expect(tiny).toHaveLength(1)
    expect(tiny[0][0]).toBeCloseTo(0.328, 6)
    expect(tiny[0][1]).toBeCloseTo(0.338, 6)
  })
})

describe('i risultati approssimati', () => {
  it('un numero corto resta com\'è, uno lungo ha i puntini', () => {
    expect(formatNumber(0.125, { comma: true, decimal: true, digits: 8 })?.text).toBe('0,125')
    expect(formatNumber((4 * Math.PI) / 3, { comma: true, decimal: true, digits: 8 })?.text).toBe('4,188790…')
    expect(formatNumber(1 / 6, { comma: true, decimal: true, digits: 7 })?.text).toBe('0,166666…')
  })
})
