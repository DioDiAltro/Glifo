/**
 * Il piano di Gauss: i numeri complessi nei grafici, con la parte reale in orizzontale e quella
 * immaginaria in verticale. Un numero (1 + 2i, w = e^{i\pi/3}) è una freccia dall'origine; le
 * radici n-esime (\sqrt[3]{8i}) sono più punti; con il parametro t è una curva (2e^{it}); le
 * equazioni in z sono curve se i due lati sono numeri reali (|z - i| = 2, \Re z = 1) e punti se no
 * (z^3 = 8i: le soluzioni); le disuguaglianze sono zone (|z| \le 1, \Re z > 0), come gli insiemi
 * \{z \in \mathbb{C} : …\}.
 */
import {
  abs,
  allRoots,
  compileComplex,
  complexScopeWith,
  exponentialForm,
  formatComplex,
  solveComplex,
  sub,
  type Complex,
  type ComplexScope,
  type ComplexVars,
} from '../math/complex'
import { compileDomain } from '../math/domain'
import { MathError, type Compiled } from '../math/evaluate'
import { nameLatex, toLatex } from '../math/latex'
import { children, namesIn, type MathNode } from '../math/parse'
import { planeParts } from './regions'
import type { GraphItem, Range } from './spec'

/** La variabile complessa dei grafici. */
const Z = 'z'

const STYLE = { comma: true, decimal: true, digits: 9 }

/** Le funzioni che hanno senso solo per i numeri complessi. */
const COMPLEX_FUNCTIONS = new Set(['re', 'im', 'arg', 'conj'])

/** Il coniugato scritto con l'accento: z̄. */
const BAR = '̄'

function isComplexValue(z: Complex): boolean {
  return z.im !== 0
}

/**
 * La riga parla di numeri complessi? Ha la i (se non è un numero definito), \Re, \Im, \arg, un
 * coniugato, un numero complesso definito prima, un insieme di z, o |…| con la z (e senza x e y).
 */
export function isComplexLine(node: MathNode, scope: ComplexScope, realNames: ReadonlySet<string>): boolean {
  const all = namesIn(node)
  const planar = all.has('x') || all.has('y')
  let found = false
  const visit = (n: MathNode, bound: ReadonlySet<string>): void => {
    if (found) return
    switch (n.k) {
      case 'name':
        if (bound.has(n.name)) return
        if (n.name === 'i' && !realNames.has('i')) found = true
        else if (n.name.endsWith(BAR) && n.name.length > 1) found = true
        else if (scope.consts.has(n.name) && isComplexValue(scope.consts.get(n.name)!)) found = true
        return
      case 'fn':
        // \overline{AB} con due punti (maiuscole) è un segmento, non il coniugato.
        if (COMPLEX_FUNCTIONS.has(n.name) && !(n.name === 'conj' && isSegmentNode(n.args[0]))) found = true
        break
      case 'abs':
        if (!planar && namesIn(n.a, new Set(), bound).has(Z) && !realNames.has(Z)) found = true
        break
      case 'big':
      case 'int':
        visit(n.from, bound)
        visit(n.to, bound)
        visit(n.body, new Set([...bound, n.v]))
        return
      case 'set':
        if (n.vars?.length === 1 && n.vars[0] === Z) found = true
        visit(n.cond, bound)
        return
    }
    for (const child of children(n)) visit(child, bound)
  }
  visit(node, new Set())
  return found
}

/** Due punti scritti attaccati (AB, con le maiuscole): \overline{AB} è un segmento. */
function isSegmentNode(n: MathNode | undefined): boolean {
  const upper = (m: MathNode) => m.k === 'name' && /^[A-Z](_.+)?$/.test(m.name)
  return !!n && n.k === 'bin' && n.op === '*' && !!n.implicit && upper(n.a) && upper(n.b)
}

/** Il nome di un insieme di z (D = \{z \in \mathbb{C} : |z| \le 1\}). */
function setNode(main: MathNode, sets: ReadonlyMap<string, MathNode> | undefined): MathNode | null {
  if (main.k === 'set') return main
  if (main.k === 'rel' && main.ops.length === 1 && main.ops[0] === '=' && main.items[0].k === 'name' && main.items[1].k === 'set') return main.items[1]
  if (main.k === 'name') return sets?.get(main.name) ?? null
  return null
}

/** Una disuguaglianza (o più): la riga è una zona. */
function isInequality(main: MathNode): boolean {
  if (main.k === 'rel') return main.ops.every((op) => op !== '=' && op !== '≈')
  return (main.k === 'and' || main.k === 'or') && main.items.every(isInequality)
}

/** Alcuni punti del piano dove guardare se un'espressione in z è reale. */
const SAMPLES: Complex[] = [
  { re: 0.31, im: 0.77 },
  { re: -1.23, im: 0.42 },
  { re: 2.07, im: -1.31 },
  { re: -0.58, im: -2.19 },
  { re: 3.3, im: 1.9 },
]

function realEverywhere(f: (z: Complex) => Complex): boolean {
  let seen = 0
  for (const z of SAMPLES) {
    const w = f(z)
    if (!Number.isFinite(w.re) || !Number.isFinite(w.im)) continue
    seen++
    if (Math.abs(w.im) > 1e-9 * (1 + Math.abs(w.re))) return false
  }
  return seen > 0
}

/** Un'espressione in z come funzione di un numero complesso. */
function inZ(node: MathNode, scope: ComplexScope): (z: Complex) => Complex {
  const f = compileComplex(node, complexScopeWith(scope, [Z]))
  const v: ComplexVars = { [Z]: { re: 0, im: 0 } }
  return (z) => {
    v[Z] = z
    return f(v)
  }
}

/** I due lati di una disuguaglianza nel piano di Gauss: numeri reali, funzioni di x = \Re z e y = \Im z. */
function realSide(scope: ComplexScope): (node: MathNode) => Compiled {
  return (node) => {
    const f = inZ(node, scope)
    if (!realEverywhere(f)) throw new MathError('Nelle disuguaglianze vanno numeri reali, come |z|, \\Re z, \\Im z o \\arg z')
    return (v) => f({ re: v.x, im: v.y }).re
  }
}

/** C'è un'esponenziale e^{…}: il numero è già scritto in forma esponenziale. */
function hasExponential(node: MathNode): boolean {
  if (node.k === 'bin' && node.op === '^' && node.a.k === 'name' && node.a.name === 'e') return true
  if (node.k === 'fn' && node.name === 'exp') return true
  return children(node).some(hasExponential)
}

/** Il numero come etichetta: com'è scritto, poi a + bi e ρe^{iθ} se dicono qualcosa di più. */
function valueLabel(node: MathNode, name: string | null, z: Complex): string {
  const written = toLatex(node)
  const parts = [name ? `${nameLatex(name)} = ${written}` : written]
  const plain = (tex: string) => tex.replace(/\\,|\s/g, '')
  const algebraic = formatComplex(z, STYLE)
  if (algebraic && plain(algebraic.tex) !== plain(written)) parts.push(algebraic.tex)
  const polar = hasExponential(node) ? null : exponentialForm(z, STYLE)
  if (polar && plain(polar.tex) !== plain(written) && (!algebraic || plain(polar.tex) !== plain(algebraic.tex))) parts.push(polar.tex)
  return parts.join(' = ')
}

/**
 * Una riga senza variabili che ha un valore solo con i numeri complessi (\sqrt[6]{-64}, \ln(-1)):
 * anche questa va nel piano di Gauss.
 */
export function onlyComplex(node: MathNode, real: (n: MathNode) => number, scope: ComplexScope): boolean {
  if (node.k === 'rel' || node.k === 'in' || node.k === 'and' || node.k === 'or' || node.k === 'tuple' || node.k === 'set') return false
  try {
    if (Number.isFinite(real(node))) return false
  } catch {
    // Senza un valore reale: si prova con i complessi.
  }
  try {
    const z = compileComplex(node, scope)({})
    return Number.isFinite(z.re) && Number.isFinite(z.im)
  } catch {
    return false
  }
}

export interface GaussLine {
  main: MathNode
  cond: MathNode | null
  line: number
}

/**
 * Quello che disegna una riga nel piano di Gauss. `scope`: i numeri (reali e complessi) e le
 * funzioni definiti; `sets`: gli insiemi; `t`: da dove a dove va il parametro delle curve.
 */
export function gaussItem(l: GaussLine, scope: ComplexScope, sets: ReadonlyMap<string, MathNode> | undefined, slot: number): GraphItem {
  const { main, cond, line } = l
  if (cond) throw new MathError('Nel piano di Gauss le condizioni vanno in un insieme: \\{z \\in \\mathbb{C} : |z| \\le 1, \\Re z > 0\\}')
  const label = toLatex(main)
  // Nelle equazioni e nelle disuguaglianze la z è sempre la variabile; in un'espressione da sola è
  // il numero z, se la nota lo definisce (z \bar{z}).
  const free = (n: MathNode) => namesIn(n).has(Z)
  const freeValue = (n: MathNode) => free(n) && !scope.consts.has(Z)

  // Un numero complesso definito (w = 1 + i): la freccia con il nome.
  if (main.k === 'rel' && main.ops.length === 1 && main.ops[0] === '=' && main.items[0].k === 'name' && main.items[1].k !== 'set') {
    const name = main.items[0].name
    const value = scope.consts.get(name)
    if (value && !freeValue(main.items[1])) return { kind: 'complex', line, label: valueLabel(main.items[1], name, value), slot, values: [value], name, arrows: true }
  }

  // Un insieme di z, o delle disuguaglianze: una zona.
  const set = setNode(main, sets)
  if (set || isInequality(main)) {
    const target = set ? (set.k === 'set' ? set.cond : set) : main
    const domain = compileDomain(target, { vars: new Set(), consts: new Map(), fns: new Map(), sets: sets ?? new Map() }, ['x', 'y'], {}, realSide(scope))
    const margin = domain.margin
    const v = { x: 0, y: 0 }
    const M = (x: number, y: number) => {
      v.x = x
      v.y = y
      return margin(v)
    }
    return { kind: 'region', line, label, slot, M, strict: domain.strict, parts: planeParts(domain) }
  }

  // Un'equazione in z: una curva se i due lati sono reali, se no le sue soluzioni.
  if (main.k === 'rel' && main.ops.length === 1 && main.ops[0] === '=' && (free(main.items[0]) || free(main.items[1]))) {
    const left = inZ(main.items[0], scope)
    const right = inZ(main.items[1], scope)
    const G = (z: Complex) => sub(left(z), right(z))
    if (realEverywhere(G)) return { kind: 'implicit', line, label, slot, F: (x, y) => G({ re: x, im: y }).re }
    const solutions = solveComplex(G)
    if (!solutions.length) throw new MathError('Non trovo soluzioni (con parte reale e immaginaria tra −32 e 32)')
    return { kind: 'complex', line, label, slot, values: solutions, name: null, arrows: false }
  }
  if (main.k === 'rel' || main.k === 'in' || main.k === 'and' || main.k === 'or') throw new MathError('Nel piano di Gauss si disegnano numeri, equazioni e disuguaglianze in z')
  if (freeValue(main)) throw new MathError('Con la z serve un\'equazione o una disuguaglianza, es. |z - i| = 2')

  // Con il parametro t (o θ): una curva, come 2e^{it}.
  const param = namesIn(main).has('t') && !scope.consts.has('t') ? 't' : namesIn(main).has('θ') && !scope.consts.has('θ') ? 'θ' : null
  if (param) {
    const f = compileComplex(main, complexScopeWith(scope, [param]))
    const v: ComplexVars = { [param]: { re: 0, im: 0 } }
    const at = (t: number) => {
      v[param] = { re: t, im: 0 }
      return f(v)
    }
    const t: Range = [0, 2 * Math.PI]
    return { kind: 'parametric', line, label, slot, param, t, fx: (s) => at(s).re, fy: (s) => at(s).im, straight: false }
  }

  // Un numero, o le radici n-esime di un numero.
  const roots = allRoots(main, scope)
  if (roots && roots.length > 1) return { kind: 'complex', line, label, slot, values: roots, name: null, arrows: false }
  const value = compileComplex(main, scope)({})
  if (!Number.isFinite(value.re) || !Number.isFinite(value.im)) throw new MathError('Non è un numero')
  // Il nome di un numero definito nella nota (z_1): la freccia ha il suo nome.
  const name = main.k === 'name' && scope.consts.has(main.name) ? main.name : null
  return { kind: 'complex', line, label: valueLabel(main, null, value), slot, values: [value], name, arrows: true }
}

/** Quanto è lontano dall'origine il numero più lontano: per scegliere la finestra. */
export function farthest(values: readonly Complex[]): number {
  return values.reduce((m, z) => Math.max(m, abs(z)), 0)
}
