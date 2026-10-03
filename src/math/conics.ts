/**
 * Le coniche e le quadriche dall'equazione: il tipo (ellisse, circonferenza, iperbole, parabola, o
 * degenere), la forma canonica e gli elementi (centro, semiassi, fuochi, vertici, eccentricità,
 * asintoti, direttrice, asse). Con le matrici dei coefficienti, come a lezione: il determinante della
 * matrice completa dice se è degenere, quello della parte quadratica il tipo; gli autovalori la forma
 * canonica. I conti sono esatti (frazioni e radici) quando gli assi sono paralleli a quelli cartesiani.
 */
import { Rational } from './exact'
import type { FormattedResult } from './format'
import { nameLatex, toLatex } from './latex'
import type { MathNode } from './parse'
import { add, exOf, expand, mul, neg, num, plainText, pow, sub, sym, tidy, toNode, type Ex, type SymbolScope } from './symbolic'

const R = (n: number | bigint, d: number | bigint = 1) => new Rational(BigInt(n), BigInt(d))
const ZERO = R(0)
const HALF = R(1, 2)

/** I coefficienti di un polinomio di secondo grado nelle variabili: "2,0" → coefficiente di x². */
type Coefficients = Map<string, Rational>

/** Il polinomio (sinistra − destra) con i coefficienti frazioni, di grado al più 2 in `vars`; null se no. */
function coefficients(node: MathNode, vars: string[], scope: SymbolScope): Coefficients | null {
  if (node.k !== 'rel' || node.ops.length !== 1 || node.ops[0] !== '=') return null
  let F: Ex
  try {
    F = expand(exOf({ k: 'bin', op: '-', a: node.items[0], b: node.items[1] }, scope, vars))
  } catch {
    return null
  }
  const out: Coefficients = new Map()
  for (const t of F.t === 'add' ? F.terms : [F]) {
    const exps = vars.map(() => 0)
    let c = t.t === 'num' ? t.v : t.t === 'mul' ? t.c : R(1)
    for (const f of t.t === 'mul' ? t.factors : t.t === 'num' ? [] : [t]) {
      const base = f.t === 'pow' ? f.base : f
      const e = f.t === 'pow' ? f.exp : num(1)
      const i = base.t === 'sym' ? vars.indexOf(base.name) : -1
      if (i < 0 || e.t !== 'num' || !e.v.isInteger || e.v.sign < 0) return null
      exps[i] += Number(e.v.n)
    }
    if (exps.reduce((a, b) => a + b, 0) > 2) return null
    const key = exps.join(',')
    c = (out.get(key) ?? ZERO).add(c)
    out.set(key, c)
  }
  // Di secondo grado davvero.
  if (![...out.entries()].some(([k, v]) => v.sign !== 0 && k.split(',').reduce((a, b) => a + Number(b), 0) === 2)) return null
  return out
}

const at = (c: Coefficients, ...exps: number[]) => c.get(exps.join(',')) ?? ZERO

function det2(m: Rational[][]): Rational {
  return m[0][0].mul(m[1][1]).sub(m[0][1].mul(m[1][0]))
}

function det3(m: Rational[][]): Rational {
  return m[0][0]
    .mul(m[1][1].mul(m[2][2]).sub(m[1][2].mul(m[2][1])))
    .sub(m[0][1].mul(m[1][0].mul(m[2][2]).sub(m[1][2].mul(m[2][0]))))
    .add(m[0][2].mul(m[1][0].mul(m[2][1]).sub(m[1][1].mul(m[2][0]))))
}

const sqrt = (r: Rational | Ex): Ex => pow(r instanceof Rational ? num(r) : r, num(HALF))

interface Shown {
  tex: string
  text: string
}

const shownOf = (e: Ex): Shown => {
  // Le somme a ± c restano come sono scritte (tidy le riordinerebbe).
  const n = e.t === 'add' && e.terms.length === 2 && e.terms[0].t === 'num' ? sumNode(e.terms[0], e.terms[1]) : toNode(tidy(e))
  return { tex: toLatex(n), text: plainText(n) }
}

function sumNode(a: Ex, b: Ex): MathNode {
  const right = toNode(tidy(b))
  return right.k === 'neg' ? { k: 'bin', op: '-', a: toNode(a), b: right.a } : { k: 'bin', op: '+', a: toNode(a), b: right }
}

/** a ± c come nei libri: 1 + √5, non √5 + 1. */
function plusMinus(a: Rational, c: Ex, sign: 1 | -1): Ex {
  return a.sign === 0 ? (sign > 0 ? c : neg(c)) : { t: 'add', terms: [num(a), sign > 0 ? c : neg(c)] }
}

const point = (...cs: Ex[]): Shown => {
  const s = cs.map(shownOf)
  return { tex: `\\left(${s.map((c) => c.tex).join(', ')}\\right)`, text: `(${s.map((c) => c.text).join(', ')})` }
}

/** x − x₀ (o solo x se x₀ = 0). */
const shifted = (v: string, c: Rational): Ex => (c.sign === 0 ? sym(v) : sub(sym(v), num(c)))

/** (x − x₀)²/A²: il pezzo della forma canonica, con il quadrato fuori dalla frazione se A² = 1. */
function square(v: string, c: Rational, A2: Rational): Shown {
  const base = toNode(tidy(shifted(v, c)))
  const inner = c.sign === 0 ? toLatex(base) : `\\left(${toLatex(base)}\\right)`
  const innerText = c.sign === 0 ? plainText(base) : `(${plainText(base)})`
  if (A2.n === 1n && A2.d === 1n) return { tex: `${inner}^{2}`, text: `${innerText}²` }
  const den = shownOf(num(A2))
  return { tex: `\\frac{${inner}^{2}}{${den.tex}}`, text: `${innerText}²/${A2.d === 1n ? den.text : `(${den.text})`}` }
}

/** Il risultato su più righe: il tipo, la forma canonica, gli elementi. */
function rows(lines: Shown[]): FormattedResult {
  return {
    tex: lines.length > 1 ? `\\begin{array}{l} ${lines.map((l) => l.tex).join(' \\\\ ')} \\end{array}` : lines[0].tex,
    text: lines.map((l) => l.text).join('; '),
    rich: true,
  }
}

const words = (text: string): Shown => ({ tex: `\\text{${text}}`, text })

/** Una conica con gli assi paralleli a quelli cartesiani, per i grafici: gli elementi con i numeri. */
export interface ConicElements {
  kind: 'ellipse' | 'circle' | 'hyperbola' | 'parabola' | 'degenerate'
  center: [number, number] | null
  foci: [number, number][]
  vertices: [number, number][]
  /** Le rette tratteggiate: asintoti, direttrice (a x + b y = c). */
  lines: { a: number; b: number; c: number; label: string }[]
}

export interface ConicInfo {
  shown: FormattedResult
  elements: ConicElements | null
}

/**
 * La conica di un'equazione di secondo grado in x e y: il tipo, la forma canonica e gli elementi; null
 * se l'equazione non è di secondo grado (con le frazioni) in x e y.
 */
export function conicOf(node: MathNode, scope: SymbolScope, vars: [string, string] = ['x', 'y']): ConicInfo | null {
  const c = coefficients(node, vars, scope)
  if (!c) return null
  const [X, Y] = vars
  const a = at(c, 2, 0)
  const b = at(c, 1, 1)
  const cc = at(c, 0, 2)
  const d = at(c, 1, 0)
  const e = at(c, 0, 1)
  const f = at(c, 0, 0)
  const M = [
    [a, b.mul(HALF)],
    [b.mul(HALF), cc],
  ]
  const A = [
    [a, b.mul(HALF), d.mul(HALF)],
    [b.mul(HALF), cc, e.mul(HALF)],
    [d.mul(HALF), e.mul(HALF), f],
  ]
  const detM = det2(M)
  const detA = det3(A)
  if (b.sign !== 0) return rotatedConic(a, b, cc, detM, detA)
  // Gli assi paralleli a quelli cartesiani: a x² + c y² + d x + e y + f = 0.
  if (detM.sign !== 0) {
    // Centro: completando i quadrati.
    const x0 = d.neg().div(a.mul(R(2)))
    const y0 = e.neg().div(cc.mul(R(2)))
    // a (x − x₀)² + c (y − y₀)² = k
    const k = a.mul(x0).mul(x0).add(cc.mul(y0).mul(y0)).sub(f)
    if (k.sign === 0) {
      if (detM.sign > 0) return { shown: rows([words('conica degenere: un punto solo'), point(num(x0), num(y0))]), elements: null }
      // Due rette per il centro: y − y₀ = ±√(−a/c) (x − x₀).
      const m = sqrt(a.neg().div(cc))
      const lines = [add(num(y0), mul(m, shifted(X, x0))), add(num(y0), neg(mul(m, shifted(X, x0))))].map((l) => {
        const s = shownOf(l)
        return { tex: `${nameLatex(Y)} = ${s.tex}`, text: `${Y} = ${s.text}` }
      })
      return { shown: rows([words('conica degenere: due rette incidenti'), { tex: lines.map((l) => l.tex).join(',\\quad '), text: lines.map((l) => l.text).join(', ') }]), elements: null }
    }
    const A2 = k.div(a)
    const B2 = k.div(cc)
    const center = point(num(x0), num(y0))
    const centerNums: [number, number] = [x0.toNumber(), y0.toNumber()]
    if (A2.sign < 0 && B2.sign < 0) return { shown: rows([words('ellisse immaginaria: nessun punto reale')]), elements: null }
    if (A2.sign > 0 && B2.sign > 0) {
      if (A2.cmp(B2) === 0) {
        const r = shownOf(sqrt(A2))
        const canonical = { tex: `${square(X, x0, R(1)).tex} + ${square(Y, y0, R(1)).tex} = ${shownOf(num(A2)).tex}`, text: `${square(X, x0, R(1)).text} + ${square(Y, y0, R(1)).text} = ${shownOf(num(A2)).text}` }
        return {
          shown: rows([words('circonferenza'), canonical, { tex: `C = ${center.tex},\\ r = ${r.tex}`, text: `C = ${center.text}, r = ${r.text}` }]),
          elements: { kind: 'circle', center: centerNums, foci: [], vertices: [], lines: [] },
        }
      }
      // L'asse maggiore: lungo x se A² > B².
      const alongX = A2.cmp(B2) > 0
      const [big, small] = alongX ? [A2, B2] : [B2, A2]
      const focal = sqrt(big.sub(small))
      const canonical = { tex: `${square(X, x0, A2).tex} + ${square(Y, y0, B2).tex} = 1`, text: `${square(X, x0, A2).text} + ${square(Y, y0, B2).text} = 1` }
      const foci = alongX ? [point(plusMinus(x0, focal, -1), num(y0)), point(plusMinus(x0, focal, 1), num(y0))] : [point(num(x0), plusMinus(y0, focal, -1)), point(num(x0), plusMinus(y0, focal, 1))]
      const ecc = shownOf(mul(focal, pow(sqrt(big), num(-1))))
      const fv = Math.sqrt(big.toNumber() - small.toNumber())
      const av = Math.sqrt(A2.toNumber())
      const bv = Math.sqrt(B2.toNumber())
      return {
        shown: rows([
          words('ellisse'),
          canonical,
          { tex: `C = ${center.tex},\\ a = ${shownOf(sqrt(A2)).tex},\\ b = ${shownOf(sqrt(B2)).tex}`, text: `C = ${center.text}, a = ${shownOf(sqrt(A2)).text}, b = ${shownOf(sqrt(B2)).text}` },
          { tex: `F_{1} = ${foci[0].tex},\\ F_{2} = ${foci[1].tex}`, text: `F₁ = ${foci[0].text}, F₂ = ${foci[1].text}` },
          { tex: `e = ${ecc.tex}`, text: `e = ${ecc.text}` },
        ]),
        elements: {
          kind: 'ellipse',
          center: centerNums,
          foci: alongX ? [[centerNums[0] - fv, centerNums[1]], [centerNums[0] + fv, centerNums[1]]] : [[centerNums[0], centerNums[1] - fv], [centerNums[0], centerNums[1] + fv]],
          vertices: [[centerNums[0] - av, centerNums[1]], [centerNums[0] + av, centerNums[1]], [centerNums[0], centerNums[1] - bv], [centerNums[0], centerNums[1] + bv]],
          lines: [],
        },
      }
    }
    // Iperbole: il termine positivo è quello dell'asse trasverso.
    const alongX = A2.sign > 0
    const [pos, negative] = alongX ? [A2, B2.neg()] : [B2, A2.neg()]
    const focal = sqrt(pos.add(negative))
    const first = alongX ? square(X, x0, A2) : square(Y, y0, B2)
    const second = alongX ? square(Y, y0, B2.neg()) : square(X, x0, A2.neg())
    const canonical = { tex: `${first.tex} - ${second.tex} = 1`, text: `${first.text} − ${second.text} = 1` }
    const foci = alongX ? [point(plusMinus(x0, focal, -1), num(y0)), point(plusMinus(x0, focal, 1), num(y0))] : [point(num(x0), plusMinus(y0, focal, -1)), point(num(x0), plusMinus(y0, focal, 1))]
    const ecc = shownOf(mul(focal, pow(sqrt(pos), num(-1))))
    // Asintoti: y − y₀ = ±(b/a)(x − x₀), con a e b i semiassi lungo x e lungo y.
    const slope = sqrt((alongX ? B2.neg() : B2).div(alongX ? A2 : A2.neg()))
    const asymptotes = [mul(slope, shifted(X, x0)), neg(mul(slope, shifted(X, x0)))].map((l) => {
      const s = shownOf(add(num(y0), l))
      return { tex: `${nameLatex(Y)} = ${s.tex}`, text: `${Y} = ${s.text}` }
    })
    const ax = Math.sqrt(Math.abs(A2.toNumber()))
    const by = Math.sqrt(Math.abs(B2.toNumber()))
    const fv = Math.sqrt(pos.toNumber() + negative.toNumber())
    const m = by / ax
    return {
      shown: rows([
        words(pos.cmp(negative) === 0 ? 'iperbole equilatera' : 'iperbole'),
        canonical,
        { tex: `C = ${center.tex},\\ e = ${ecc.tex}`, text: `C = ${center.text}, e = ${ecc.text}` },
        { tex: `F_{1} = ${foci[0].tex},\\ F_{2} = ${foci[1].tex}`, text: `F₁ = ${foci[0].text}, F₂ = ${foci[1].text}` },
        { tex: `\\text{asintoti: } ${asymptotes.map((l) => l.tex).join(',\\quad ')}`, text: `asintoti: ${asymptotes.map((l) => l.text).join(', ')}` },
      ]),
      elements: {
        kind: 'hyperbola',
        center: centerNums,
        foci: alongX ? [[centerNums[0] - fv, centerNums[1]], [centerNums[0] + fv, centerNums[1]]] : [[centerNums[0], centerNums[1] - fv], [centerNums[0], centerNums[1] + fv]],
        vertices: alongX ? [[centerNums[0] - ax, centerNums[1]], [centerNums[0] + ax, centerNums[1]]] : [[centerNums[0], centerNums[1] - by], [centerNums[0], centerNums[1] + by]],
        // y = y₀ ± m (x − x₀): −m x + y = y₀ − m x₀.
        lines: [1, -1].map((s) => ({ a: -s * m, b: 1, c: centerNums[1] - s * m * centerNums[0], label: asymptotes[s > 0 ? 0 : 1].tex })),
      },
    }
  }
  // Una parabola (o degenere): a = 0 o c = 0.
  if (detA.sign === 0) return { shown: rows([words('conica degenere: rette parallele, una retta doppia o nessun punto')]), elements: null }
  // y = αx² + βx + γ (con c = 0) o x = αy² + βy + γ (con a = 0).
  const vertical = cc.sign === 0
  const [u, w] = vertical ? [X, Y] : [Y, X]
  const lin = vertical ? e : d
  if (lin.sign === 0) return { shown: rows([words('conica degenere: due rette parallele')]), elements: null }
  const alpha = (vertical ? a : cc).neg().div(lin)
  const beta = (vertical ? d : e).neg().div(lin)
  const gamma = f.neg().div(lin)
  const delta = beta.mul(beta).sub(R(4).mul(alpha).mul(gamma))
  const v1 = beta.neg().div(R(2).mul(alpha))
  const v2 = delta.neg().div(R(4).mul(alpha))
  const f2 = R(1).sub(delta).div(R(4).mul(alpha))
  const dir = R(1).add(delta).neg().div(R(4).mul(alpha))
  const pt = (p: Rational, q: Rational) => (vertical ? point(num(p), num(q)) : point(num(q), num(p)))
  const eq = shownOf(add(mul(num(alpha), pow(sym(u), num(2))), mul(num(beta), sym(u)), num(gamma)))
  // La forma canonica: (u − u_V)² = 2p (w − w_V), con 2p = 1/α.
  const shiftU = square(u, v1, R(1))
  const right = shownOf(mul(num(R(1).div(alpha)), shifted(w, v2)))
  return {
    shown: rows([
      words(vertical ? "parabola con l'asse verticale" : "parabola con l'asse orizzontale"),
      { tex: `${nameLatex(w)} = ${eq.tex}`, text: `${w} = ${eq.text}` },
      { tex: `\\text{forma canonica: } ${shiftU.tex} = ${right.tex}`, text: `forma canonica: ${shiftU.text} = ${right.text}` },
      { tex: `V = ${pt(v1, v2).tex},\\ F = ${pt(v1, f2).tex}`, text: `V = ${pt(v1, v2).text}, F = ${pt(v1, f2).text}` },
      {
        tex: `\\text{direttrice } ${nameLatex(w)} = ${shownOf(num(dir)).tex},\\ \\text{asse } ${nameLatex(u)} = ${shownOf(num(v1)).tex}`,
        text: `direttrice ${w} = ${shownOf(num(dir)).text}, asse ${u} = ${shownOf(num(v1)).text}`,
      },
    ]),
    elements: {
      kind: 'parabola',
      center: null,
      foci: [vertical ? [v1.toNumber(), f2.toNumber()] : [f2.toNumber(), v1.toNumber()]],
      vertices: [vertical ? [v1.toNumber(), v2.toNumber()] : [v2.toNumber(), v1.toNumber()]],
      lines: [vertical ? { a: 0, b: 1, c: dir.toNumber(), label: `${nameLatex(w)} = ${shownOf(num(dir)).tex}` } : { a: 1, b: 0, c: dir.toNumber(), label: `${nameLatex(w)} = ${shownOf(num(dir)).tex}` }],
    },
  }
}

/** Con il termine in xy: gli autovalori della parte quadratica danno la forma canonica (negli assi ruotati). */
function rotatedConic(a: Rational, b: Rational, c: Rational, detM: Rational, detA: Rational): ConicInfo {
  // Gli autovalori: (tr ± √(tr² − 4 det))/2.
  const tr = a.add(c)
  const disc = tr.mul(tr).sub(R(4).mul(detM))
  const root = sqrt(disc)
  const l1 = tidy(mul(num(HALF), add(num(tr), root)))
  const l2 = tidy(mul(num(HALF), sub(num(tr), root)))
  // L'angolo: tan 2θ = b/(a − c).
  const theta = a.cmp(c) === 0 ? Math.PI / 4 : Math.atan(b.toNumber() / a.sub(c).toNumber()) / 2
  const quarter = Math.round((theta / Math.PI) * 12)
  const angle = Math.abs(theta - (quarter * Math.PI) / 12) < 1e-12 ? shownOf(mul(num(R(quarter, 12)), sym('π'))) : { tex: `${theta.toFixed(4).replace('.', '{,}')}`, text: theta.toFixed(4).replace('.', ',') }
  const turned = { tex: `\\text{(gli assi ruotati di } \\theta = ${angle.tex}\\text{)}`, text: `(gli assi ruotati di θ = ${angle.text})` }
  const [X, Y] = ['X', 'Y']
  if (detM.sign === 0) {
    if (detA.sign === 0) return { shown: rows([words('conica degenere: rette parallele, una retta doppia o nessun punto')]), elements: null }
    // Parabola: λ Y² = 2p X con p = √(−det A/λ³).
    const lambda = tr
    const p = tidy(sqrt(detA.neg().div(lambda.mul(lambda).mul(lambda))))
    const twoP = shownOf(mul(num(2), p))
    const factor = /^[\d,]+$/.test(twoP.text) ? twoP.text : `(${twoP.text})`
    return { shown: rows([words('parabola'), { tex: `${Y}^{2} = ${twoP.tex} ${X}`, text: `${Y}² = ${factor}${X}` }, turned]), elements: null }
  }
  const k = detA.neg().div(detM)
  if (k.sign === 0) {
    return { shown: rows([words(detM.sign > 0 ? 'conica degenere: un punto solo' : 'conica degenere: due rette incidenti')]), elements: null }
  }
  // λ₁ X² + λ₂ Y² = k: X²/(k/λ₁) + Y²/(k/λ₂) = 1.
  const A2 = tidy(mul(num(k), pow(l1, num(-1))))
  const B2 = tidy(mul(num(k), pow(l2, num(-1))))
  const term = (v: string, d: Ex) => {
    const s = shownOf(d)
    return { tex: s.tex === '1' ? `${v}^{2}` : `\\frac{${v}^{2}}{${s.tex}}`, text: s.text === '1' ? `${v}²` : `${v}²/${s.text}` }
  }
  const a2 = Number(evaluateRough(A2))
  const b2 = Number(evaluateRough(B2))
  if (detM.sign > 0) {
    if (a2 < 0 && b2 < 0) return { shown: rows([words('ellisse immaginaria: nessun punto reale')]), elements: null }
    const t1 = term(X, A2)
    const t2 = term(Y, B2)
    return { shown: rows([words('ellisse'), { tex: `${t1.tex} + ${t2.tex} = 1`, text: `${t1.text} + ${t2.text} = 1` }, turned]), elements: null }
  }
  const [first, second] = a2 > 0 ? [term(X, A2), term(Y, neg(B2))] : [term(Y, B2), term(X, neg(A2))]
  return { shown: rows([words('iperbole'), { tex: `${first.tex} - ${second.tex} = 1`, text: `${first.text} − ${second.text} = 1` }, turned]), elements: null }
}

/** Il valore con la virgola di un'espressione senza lettere (radici comprese). */
function evaluateRough(e: Ex): number {
  switch (e.t) {
    case 'num':
      return e.v.toNumber()
    case 'add':
      return e.terms.reduce((s, t) => s + evaluateRough(t), 0)
    case 'mul':
      return e.factors.reduce((s, f) => s * evaluateRough(f), e.c.toNumber())
    case 'pow':
      return Math.pow(evaluateRough(e.base), evaluateRough(e.exp))
    default:
      return NaN
  }
}

// ——— Le quadriche ———

/** Gli autovalori (con la virgola) di una matrice simmetrica 3×3: Jacobi. */
function eigenvalues3(m: number[][]): number[] {
  const a = m.map((r) => [...r])
  for (let sweep = 0; sweep < 50; sweep++) {
    let off = 0
    for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) off += a[i][j] ** 2
    if (off < 1e-24) break
    for (let p = 0; p < 3; p++) {
      for (let q = p + 1; q < 3; q++) {
        if (Math.abs(a[p][q]) < 1e-300) continue
        const theta = (a[q][q] - a[p][p]) / (2 * a[p][q])
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1))
        const cs = 1 / Math.sqrt(t * t + 1)
        const sn = t * cs
        for (let k = 0; k < 3; k++) {
          const akp = a[k][p]
          const akq = a[k][q]
          a[k][p] = cs * akp - sn * akq
          a[k][q] = sn * akp + cs * akq
        }
        for (let k = 0; k < 3; k++) {
          const apk = a[p][k]
          const aqk = a[q][k]
          a[p][k] = cs * apk - sn * aqk
          a[q][k] = sn * apk + cs * aqk
        }
      }
    }
  }
  return [a[0][0], a[1][1], a[2][2]]
}

/**
 * La quadrica di un'equazione di secondo grado in x, y e z: il tipo (ellissoide, sfera, iperboloide a una
 * o a due falde, paraboloide ellittico o iperbolico, cono, cilindro, …) e la forma canonica quando gli
 * assi sono quelli cartesiani; null se l'equazione non è di secondo grado in x, y, z.
 */
export function quadricOf(node: MathNode, scope: SymbolScope): FormattedResult | null {
  const vars = ['x', 'y', 'z']
  const c = coefficients(node, vars, scope)
  if (!c) return null
  const q = (i: number, j: number) => {
    const e = [0, 0, 0]
    e[i]++
    e[j]++
    const v = at(c, ...e)
    return i === j ? v : v.mul(HALF)
  }
  const M = [0, 1, 2].map((i) => [0, 1, 2].map((j) => q(i, j)))
  const lin = [0, 1, 2].map((i) => {
    const e = [0, 0, 0]
    e[i] = 1
    return at(c, ...e)
  })
  const f = at(c, 0, 0, 0)
  const full = [...M.map((row, i) => [...row, lin[i].mul(HALF)]), [...lin.map((l) => l.mul(HALF)), f]]
  const det4 = determinant(full)
  const lambdas = eigenvalues3(M.map((r) => r.map((v) => v.toNumber())))
  const scale = Math.max(1, ...lambdas.map(Math.abs))
  const signs = lambdas.map((l) => (Math.abs(l) < 1e-9 * scale ? 0 : Math.sign(l)))
  const rank = signs.filter((s) => s !== 0).length
  const pos = signs.filter((s) => s > 0).length
  const neg0 = signs.filter((s) => s < 0).length
  const diagonal = [0, 1, 2].every((i) => [0, 1, 2].every((j) => i === j || M[i][j].sign === 0))
  let kind: string
  let canonical: Shown | null = null
  if (rank === 3) {
    // Il centro: M p = −lin/2; k = F nel centro = det(completa)/det(M).
    const k = det4.toNumber() / det3(M).toNumber()
    // λ₁X² + λ₂Y² + λ₃Z² + k = 0
    if (Math.abs(k) < 1e-12 * scale) {
      kind = pos === 3 || neg0 === 3 ? 'quadrica degenere: un punto solo' : 'cono'
      if (diagonal && kind === 'cono') canonical = coneCanonical(M, lin, vars)
    }
    else {
      const right = signs.map((s) => s * -Math.sign(k)).filter((s) => s > 0).length
      kind = right === 3 ? 'ellissoide' : right === 2 ? 'iperboloide a una falda (iperbolico)' : right === 1 ? 'iperboloide a due falde (ellittico)' : 'ellissoide immaginario: nessun punto reale'
      if (diagonal) canonical = centralCanonical(M, lin, f, vars)
      if (right === 3 && diagonal && M[0][0].cmp(M[1][1]) === 0 && M[1][1].cmp(M[2][2]) === 0) {
        // La sfera: il centro e il raggio.
        const centers = [0, 1, 2].map((i) => lin[i].neg().div(M[i][i].mul(R(2))))
        const r2 = [0, 1, 2].reduce((s, i) => s.add(centers[i].mul(centers[i])), ZERO).sub(f.div(M[0][0]))
        const C = point(...centers.map((v) => num(v)))
        const r = shownOf(sqrt(r2))
        const squares = [0, 1, 2].map((i) => square(vars[i], centers[i], R(1)))
        const sphere = { tex: `${squares.map((q) => q.tex).join(' + ')} = ${shownOf(num(r2)).tex}`, text: `${squares.map((q) => q.text).join(' + ')} = ${shownOf(num(r2)).text}` }
        return rows([words('sfera'), sphere, { tex: `C = ${C.tex},\\ r = ${r.tex}`, text: `C = ${C.text}, r = ${r.text}` }])
      }
    }
  } else if (rank === 2) {
    // Il termine lineare lungo la direzione dell'autovalore nullo: c'è (paraboloide) o no (cilindro).
    if (det4.sign !== 0) kind = pos === 2 || neg0 === 2 ? 'paraboloide ellittico' : 'paraboloide iperbolico (a sella)'
    else if (diagonal) {
      // Un cilindro: la conica nelle due variabili con l'autovalore, la terza è libera.
      const used = [0, 1, 2].filter((i) => M[i][i].sign !== 0)
      const centers = used.map((i) => lin[i].neg().div(M[i][i].mul(R(2))))
      const k = used.reduce((s, i, j) => s.add(M[i][i].mul(centers[j]).mul(centers[j])), ZERO).sub(f)
      const ratios = used.map((i) => k.div(M[i][i]))
      if (k.sign === 0) kind = pos === 2 || neg0 === 2 ? 'quadrica degenere: una retta' : 'quadrica degenere: due piani incidenti'
      else if (ratios.every((r) => r.sign < 0)) kind = 'nessun punto reale'
      else {
        kind = ratios.every((r) => r.sign > 0) ? (ratios[0].cmp(ratios[1]) === 0 ? 'cilindro circolare' : 'cilindro ellittico') : 'cilindro iperbolico'
        canonical = joinSigned(used.map((i, j) => ({ sq: square(vars[i], centers[j], ratios[j].abs()), sign: ratios[j].sign })), '1')
      }
    } else kind = pos === 2 || neg0 === 2 ? 'cilindro ellittico (o degenere)' : 'cilindro iperbolico (o due piani incidenti)'
    if (diagonal && det4.sign !== 0) canonical = paraboloidCanonical(M, lin, f, vars)
  } else {
    kind = det4.sign !== 0 ? 'cilindro parabolico' : 'quadrica degenere: due piani, un piano doppio o nessun punto'
    if (diagonal) {
      const i = [0, 1, 2].find((j) => M[j][j].sign !== 0)!
      const others = [0, 1, 2].filter((j) => j !== i && lin[j].sign !== 0)
      if (others.length === 1) kind = 'cilindro parabolico'
    }
  }
  return rows(canonical ? [words(kind), canonical] : [words(kind)])
}

/** Ellissoidi e iperboloidi con gli assi cartesiani: Σ (v − v₀)²/A² = ±1 (con il segno di ogni termine). */
function centralCanonical(M: Rational[][], lin: Rational[], f: Rational, vars: string[]): Shown {
  const centers = [0, 1, 2].map((i) => lin[i].neg().div(M[i][i].mul(R(2))))
  const k = [0, 1, 2].reduce((s, i) => s.add(M[i][i].mul(centers[i]).mul(centers[i])), ZERO).sub(f)
  const parts = [0, 1, 2].map((i) => ({ sq: square(vars[i], centers[i], k.div(M[i][i]).abs()), sign: k.div(M[i][i]).sign }))
  return joinSigned(parts, '1')
}

/** Paraboloidi con gli assi cartesiani: i due quadrati = la variabile del termine lineare. */
function paraboloidCanonical(M: Rational[][], lin: Rational[], f: Rational, vars: string[]): Shown {
  const i0 = [0, 1, 2].find((i) => M[i][i].sign === 0)!
  const others = [0, 1, 2].filter((i) => i !== i0)
  // a(x − x₀)² + b(y − y₀)² + l w + g = 0: w = −(a/l)(x − x₀)² − (b/l)(y − y₀)² − g/l
  const centers = others.map((i) => lin[i].neg().div(M[i][i].mul(R(2))))
  const g = f.sub(others.reduce((s, i, k) => s.add(M[i][i].mul(centers[k]).mul(centers[k])), ZERO))
  const l = lin[i0]
  const w0 = g.neg().div(l)
  const parts = others.map((i, k) => ({ sq: square(vars[i], centers[k], l.div(M[i][i]).neg().abs()), sign: M[i][i].neg().div(l).sign }))
  const left = joinSigned(parts, '')
  const w = shownOf(shifted(vars[i0], w0))
  return { tex: `${w.tex} = ${left.tex}`, text: `${w.text} = ${left.text}` }
}

/** Il cono con gli assi cartesiani: i quadrati positivi = quelli negativi. */
function coneCanonical(M: Rational[][], lin: Rational[], vars: string[]): Shown {
  const centers = [0, 1, 2].map((i) => lin[i].neg().div(M[i][i].mul(R(2))))
  // Con il segno che hanno di più a sinistra: x²/a² + y²/b² − z²/c² = 0.
  const positive = [0, 1, 2].filter((i) => M[i][i].sign > 0).length >= 2 ? 1 : -1
  const parts = [0, 1, 2].map((i) => ({ sq: square(vars[i], centers[i], R(1).div(M[i][i].abs())), sign: M[i][i].sign * positive }))
  return joinSigned(parts, '0')
}

function joinSigned(parts: { sq: Shown; sign: number }[], right: string): Shown {
  const ordered = [...parts.filter((p) => p.sign > 0), ...parts.filter((p) => p.sign < 0)]
  let tex = ''
  let text = ''
  ordered.forEach((p, k) => {
    if (k === 0) {
      tex += (p.sign < 0 ? '-' : '') + p.sq.tex
      text += (p.sign < 0 ? '−' : '') + p.sq.text
    } else {
      tex += ` ${p.sign < 0 ? '-' : '+'} ${p.sq.tex}`
      text += ` ${p.sign < 0 ? '−' : '+'} ${p.sq.text}`
    }
  })
  return right ? { tex: `${tex} = ${right}`, text: `${text} = ${right}` } : { tex, text }
}

/** Il determinante di una matrice di frazioni (sviluppo di Laplace, per le 4×4). */
function determinant(m: Rational[][]): Rational {
  if (m.length === 1) return m[0][0]
  if (m.length === 2) return det2(m)
  let out = ZERO
  for (let j = 0; j < m.length; j++) {
    if (m[0][j].sign === 0) continue
    const minor = m.slice(1).map((row) => row.filter((_, k) => k !== j))
    const term = m[0][j].mul(determinant(minor))
    out = j % 2 === 0 ? out.add(term) : out.sub(term)
  }
  return out
}
