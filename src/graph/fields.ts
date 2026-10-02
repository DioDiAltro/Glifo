/**
 * I campi di vettori, le curve e le superfici con il nome e gli integrali di linea e di superficie
 * nei blocchi ```grafico:
 *
 *     F(x, y) = (-y, x)                               un campo: una freccia in ogni punto
 *     \nabla f                                        il gradiente di f, come campo
 *     \gamma(t) = (\cos t, \sin t), t \in [0, 2\pi]   una curva, con la freccia del verso
 *     S(u, v) = (…), u \in [0, 1], v \in [0, 1]      una superficie (in 3D)
 *     \oint_\gamma F \cdot dr                         la curva e il campo, con il lavoro nella legenda
 *     \iint_S F \cdot d\mathbf{S}                     la superficie e il campo, con il flusso
 *     \operatorname{livelli}(f)                       le curve di livello di f(x, y)
 *     y' = x - y, \; y(0) = 1                         il campo di direzioni e la soluzione da (0, 1)
 *     y'' = -y, \; y(0) = 0, \; y'(0) = 1              la soluzione (di ordine più alto: solo lei)
 *
 * Le curve, le superfici e i campi si definiscono come nella nota (vedi Sheet), anche lì.
 */
import { compileOde, initialConditions, odeOf, odeSolution } from '../math/differential'
import { compile, MathError, scopeWith, type Scope, type VectorFunction } from '../math/evaluate'
import { formatNumber } from '../math/format'
import { nameLatex, toLatex } from '../math/latex'
import { namesIn, type MathNode, type Statement } from '../math/parse'
import { isVectorBody, symbolicField, type SymbolScope } from '../math/symbolic'
import type { GraphItem, Range } from './spec'

interface Line extends Statement {
  line: number
  text: string
}

export interface FieldContext {
  scope: Scope
  symbols: SymbolScope
  /** I campi, le curve e le superfici che hanno una riga loro (il nome e la riga): un integrale non li ridisegna. */
  own: ReadonlyMap<string, number>
}

const TRIG = new Set(['sin', 'cos', 'tan'])
const COORDS = ['x', 'y', 'z']

/** F(x, y) = (-y, x), \gamma(t) = (…), F(x, y) = \nabla f: una definizione con i valori vettori. */
export function vectorDefinition(main: MathNode): { name: string; params: string[]; value: MathNode } | null {
  if (main.k !== 'rel' || main.ops.length !== 1 || main.ops[0] !== '=') return null
  const [lhs, value] = main.items
  if (lhs.k !== 'apply' || lhs.primes || !lhs.args.length || !lhs.args.every((a) => a.k === 'name')) return null
  if (!isVectorBody(value) && !(value.k === 'fn' && (value.name === 'grad' || value.name === 'curl'))) return null
  const params = lhs.args.map((a) => (a as { name: string }).name)
  return { name: lhs.name, params, value }
}

/** Il campo, la curva o la superficie definiti con quel nome (\vec{F} vale F). */
function shapeOf(scope: Scope, name: string): { name: string; f: VectorFunction } | null {
  for (const n of [name, name.replace(/⃗/g, '')]) {
    const f = scope.vfns?.get(n)
    if (f) return { name: n, f }
  }
  return null
}

/** Quante coordinate hanno i valori (2 o 3). */
function size(f: VectorFunction): number {
  const probe = f.params.map((_, i) => (f.domain[i] ? (f.domain[i]![0] + f.domain[i]![1]) / 2 : 0.37))
  return f.call(probe).length
}

/** Un campo di vettori: i parametri sono le coordinate (x, y) o (x, y, z). */
function isField(f: VectorFunction): boolean {
  const n = size(f)
  return f.params.length === n && f.params.every((p) => COORDS.slice(0, n).includes(p))
}

/** In quante dimensioni si disegna la riga (2 o 3), se è un campo, una curva, una superficie o un integrale; 0 se no. */
export function calculusDims(main: MathNode, ctx: Pick<FieldContext, 'scope' | 'symbols'>): number {
  const def = vectorDefinition(main)
  if (def) {
    if (isVectorBody(def.value)) {
      const n = def.value.k === 'tuple' ? def.value.items.length : (def.value as Extract<MathNode, { k: 'matrix' }>).rows.length
      return def.params.length === 2 && n === 3 && !def.params.every((p) => COORDS.includes(p)) ? 3 : n
    }
    return def.params.length === 3 ? 3 : 2
  }
  if (main.k === 'name') {
    const shape = shapeOf(ctx.scope, main.name)
    return shape ? (shape.f.params.length === 2 && !isField(shape.f) ? 3 : size(shape.f)) : 0
  }
  if (main.k === 'fn' && main.name === 'grad') return gradientDims(main, ctx.symbols)
  if (main.k === 'lint') {
    const shape = shapeOf(ctx.scope, main.curve)
    return shape ? size(shape.f) : 0
  }
  if (main.k === 'sint') return 3
  if (main.k === 'tuple' && fieldTuple(main)) return main.items.length
  if ((main.k === 'fn' && main.name === 'levels') || odeOf(main)) return 2
  return 0
}

function gradientDims(main: Extract<MathNode, { k: 'fn' }>, symbols: SymbolScope): number {
  const arg = main.args[0]
  const f = arg && arg.k === 'name' ? symbols.fns.get(arg.name) : undefined
  if (f) return f.params.length === 3 ? 3 : 2
  return arg && namesIn(arg).has('z') ? 3 : 2
}

/** (-y, x): una coppia in x e y (senza parametri come t) è un campo di vettori. */
function fieldTuple(main: Extract<MathNode, { k: 'tuple' }>): boolean {
  const names = namesIn(main)
  const n = main.items.length
  if (n !== 2 && n !== 3) return false
  if (['t', 'θ', 'u', 'v', 's', 'φ'].some((p) => names.has(p))) return false
  return COORDS.slice(0, n).some((c) => names.has(c))
}

/** Il campo come funzione delle coordinate, dai valori scritti con le lettere. */
function compiledField(items: MathNode[], vars: string[], scope: Scope): (p: number[]) => number[] {
  const inner = scopeWith(scope, vars)
  const parts = items.map((c) => compile(c, inner))
  const v: Record<string, number> = {}
  return (p) => {
    vars.forEach((name, i) => (v[name] = p[i]))
    return parts.map((c) => c(v))
  }
}

/** Il campo F di una funzione definita, con le coordinate al posto giusto (F(y, x) va bene). */
function fieldCall(f: VectorFunction): (p: number[]) => number[] {
  const order = f.params.map((p) => COORDS.indexOf(p))
  return (p) => f.call(order.map((i) => p[i]))
}

function fieldItem(line: number, label: string, slot: number, F: (p: number[]) => number[], dims: number, space: boolean): GraphItem {
  if (dims === 3) {
    if (!space) throw new MathError('Un campo con tre componenti va in un grafico 3D')
    return { kind: 'field3', line, label, slot, F: (x, y, z) => { const v = F([x, y, z]); return [v[0], v[1], v[2]] } }
  }
  if (space) return { kind: 'field3', line, label, slot, F: (x, y) => { const v = F([x, y]); return [v[0], v[1], 0] } }
  return { kind: 'field', line, label, slot, F: (x, y) => { const v = F([x, y]); return [v[0], v[1]] } }
}

/** Da dove a dove va un parametro non scritto: un giro se è dentro un seno o un coseno, se no da 0 a 1. */
function defaultRange(body: MathNode | undefined, param: string): Range {
  let trig = false
  const visit = (n: MathNode) => {
    if (n.k === 'fn' && TRIG.has(n.name) && n.args.some((a) => namesIn(a).has(param))) trig = true
    else if (n.k === 'fn' || n.k === 'bin' || n.k === 'neg' || n.k === 'tuple' || n.k === 'apply') {
      const kids = n.k === 'fn' || n.k === 'apply' ? n.args : n.k === 'bin' ? [n.a, n.b] : n.k === 'neg' ? [n.a] : n.items
      kids.forEach(visit)
    }
  }
  if (body) visit(body)
  return trig || param === 'θ' ? [0, 2 * Math.PI] : param === 'φ' ? [0, Math.PI] : [0, 1]
}

/** Una curva, una superficie o un campo definiti, da disegnare. */
function shapeItems(name: string, f: VectorFunction, label: string, line: number, slot: number, space: boolean, ctx: FieldContext): GraphItem {
  const n = size(f)
  if (isField(f)) return fieldItem(line, label, slot, fieldCall(f), n, space)
  const body = ctx.symbols.fns.get(name)?.body
  const range = (i: number): Range => f.domain[i] ?? defaultRange(body, f.params[i])
  if (f.params.length === 1) {
    const t = range(0)
    const at = (k: number) => (s: number) => f.call([s])[k] ?? 0
    if (n === 3 && !space) throw new MathError(`${name} è una curva nello spazio: va in un grafico 3D`)
    if (space) return { kind: 'curve3', line, label, slot, param: f.params[0], t, straight: false, arrow: true, fx: at(0), fy: at(1), fz: at(2) }
    return { kind: 'parametric', line, label, slot, param: 't', t, straight: false, arrow: true, fx: at(0), fy: at(1) }
  }
  if (f.params.length === 2 && n === 3) {
    if (!space) throw new MathError(`${name} è una superficie: va in un grafico 3D`)
    const at = (k: number) => (u: number, v: number) => f.call([u, v])[k]
    return { kind: 'patch', line, label, slot, params: [f.params[0], f.params[1]], u: range(0), v: range(1), fx: at(0), fy: at(1), fz: at(2) }
  }
  throw new MathError(`${name} non si sa disegnare: una curva ha un parametro, una superficie due, un campo le coordinate`)
}

/** La definizione come si scrive nella legenda: \gamma(t) = (\cos t, \sin t). */
function definitionLabel(name: string, ctx: FieldContext): string {
  const def = ctx.symbols.fns.get(name)
  if (!def) return nameLatex(name)
  return `${nameLatex(name)}(${def.params.map(nameLatex).join(', ')}) = ${toLatex(def.body)}`
}

/** Il valore di un integrale per la legenda (= 6,283185…), o «non si calcola». */
function valueLabel(node: MathNode, scope: Scope): string {
  let value = NaN
  try {
    value = compile(node, scope)({})
  } catch (err) {
    if (err instanceof MathError) throw err
  }
  const shown = formatNumber(value, { comma: true, decimal: true, digits: 9 })
  if (!shown) throw new MathError('L\'integrale non si riesce a calcolare')
  return `${toLatex(node)} = ${shown.tex}`
}

/**
 * Quello che disegna una riga con un campo, una curva o una superficie con il nome, un gradiente o
 * un integrale di linea o di superficie; null se la riga è altro. Un integrale disegna la curva (o
 * la superficie) e, se nessun'altra riga lo disegna, il campo: `colors` dice quanti colori usa.
 */
export function calculusItems(l: Line, ctx: FieldContext, slot: number, space: boolean): { items: GraphItem[]; colors: number; sameAs?: number } | null {
  const { main, line } = l
  const def = vectorDefinition(main)
  if (def) {
    const shape = shapeOf(ctx.scope, def.name)
    if (!shape) throw new MathError(`${def.name} non si riesce a calcolare`)
    const label = `${toLatex(main)}${l.cond ? `, \\; ${toLatex(l.cond)}` : ''}`
    return { items: [shapeItems(shape.name, shape.f, label, line, slot, space, ctx)], colors: 1 }
  }
  if (main.k === 'name') {
    const shape = shapeOf(ctx.scope, main.name)
    if (!shape) return null
    return { items: [shapeItems(shape.name, shape.f, definitionLabel(shape.name, ctx), line, slot, space, ctx)], colors: 1 }
  }
  if (main.k === 'fn' && main.name === 'grad') {
    const { value, vars } = symbolicField(main, ctx.symbols)
    const label = `${toLatex(main)} = ${toLatex({ k: 'tuple', items: value })}`
    return { items: [fieldItem(line, label, slot, compiledField(value, vars, ctx.scope), value.length, space)], colors: 1 }
  }
  if (main.k === 'tuple' && fieldTuple(main)) {
    const vars = COORDS.slice(0, main.items.length)
    return { items: [fieldItem(line, toLatex(main), slot, compiledField(main.items, vars, ctx.scope), main.items.length, space)], colors: 1 }
  }
  if (main.k === 'fn' && main.name === 'levels') {
    if (space) throw new MathError('Le curve di livello si disegnano nel piano: per la superficie scrivi solo f')
    if (main.args.length !== 1) throw new MathError('Si scrive \\operatorname{livelli}(f), con f una funzione di x e y')
    const arg = main.args[0]
    const user = arg.k === 'name' ? ctx.scope.fns.get(arg.name) : undefined
    let F: (x: number, y: number) => number
    if (user) {
      if (user.params.length !== 2) throw new MathError(`${arg.k === 'name' ? arg.name : 'f'} non è una funzione di due variabili`)
      const xFirst = user.params[0] !== 'y'
      F = (x, y) => user.call(xFirst ? [x, y] : [y, x])
    } else {
      const f = compiledField([arg], ['x', 'y'], ctx.scope)
      F = (x, y) => f([x, y])[0]
    }
    return { items: [{ kind: 'contour', line, label: toLatex(main), slot, F }], colors: 1 }
  }
  const ode = odeOf(main)
  if (ode) {
    if (space) throw new MathError('Le equazioni differenziali si disegnano nel piano')
    const F = compileOde(ode, ctx.scope)
    const conds = !l.cond ? [] : l.cond.k === 'and' ? l.cond.items : [l.cond]
    const starts = initialConditions(conds, ode, (n) => compile(n, ctx.scope)({}))
    const labelOf = (cs: readonly MathNode[]) => [toLatex(main), ...cs.map((c) => toLatex(c))].join(', \\; ')
    // Del primo ordine: il campo di direzioni, con le soluzioni dai punti iniziali.
    if (ode.order === 1) return { items: [{ kind: 'slopes', line, label: labelOf(conds), slot, f: (x, y) => F(x, [y]), starts: starts.map((s) => [s.x0, s.Y0[0]]) }], colors: 1 }
    // Di ordine più alto: la soluzione di ogni gruppo di condizioni, come una funzione.
    if (!starts.length) throw new MathError(`Per disegnare la soluzione servono le condizioni iniziali, come ${ode.y}(0) = 1, \\; ${ode.y}'(0) = 0`)
    return { items: starts.map((s, k) => ({ kind: 'function', line, label: labelOf(s.conds), slot: slot + k, f: odeSolution(F, s.x0, s.Y0) })), colors: starts.length }
  }
  if (main.k === 'lint') {
    const shape = shapeOf(ctx.scope, main.curve)
    if (!shape) throw new MathError(`${main.curve} non è una curva: scrivila prima, come \\gamma(t) = (\\cos t, \\sin t), \\; t \\in [0, 2\\pi]`)
    const curve = shapeItems(shape.name, shape.f, valueLabel(main, ctx.scope), line, slot, space, ctx)
    // La curva che un'altra riga disegna già: qui solo nella legenda, con il suo colore.
    const sameAs = ctx.own.get(shape.name)
    if (sameAs !== undefined) curve.same = true
    const field = main.ds ? null : bodyField(main.body, size(shape.f), line, slot + (sameAs === undefined ? 1 : 0), space, ctx)
    return { items: field ? [curve, field] : [curve], colors: (sameAs === undefined ? 1 : 0) + (field ? 1 : 0), sameAs }
  }
  if (main.k === 'sint') {
    const shape = shapeOf(ctx.scope, main.surface)
    if (!shape) throw new MathError(`${main.surface} non è una superficie: scrivila prima, come S(u, v) = (u, v, u v), \\; u \\in [0, 1], \\; v \\in [0, 1]`)
    const surface = shapeItems(shape.name, shape.f, valueLabel(main, ctx.scope), line, slot, space, ctx)
    const sameAs = ctx.own.get(shape.name)
    if (sameAs !== undefined) surface.same = true
    const field = main.dS ? null : bodyField(main.body, 3, line, slot + (sameAs === undefined ? 1 : 0), space, ctx)
    return { items: field ? [surface, field] : [surface], colors: (sameAs === undefined ? 1 : 0) + (field ? 1 : 0), sameAs }
  }
  return null
}

/** Il campo di un integrale (F, (P, Q), \nabla f), da disegnare con la curva; null se ha già una riga sua. */
function bodyField(body: MathNode, dims: number, line: number, slot: number, space: boolean, ctx: FieldContext): GraphItem | null {
  if (body.k === 'name') {
    const shape = shapeOf(ctx.scope, body.name)
    if (!shape || ctx.own.has(shape.name) || !isField(shape.f)) return null
    return fieldItem(line, definitionLabel(shape.name, ctx), slot, fieldCall(shape.f), size(shape.f), space)
  }
  if (body.k === 'tuple') {
    const vars = COORDS.slice(0, Math.max(dims, body.items.length))
    const items = vars.map((_, i) => body.items[i] ?? ({ k: 'num', v: 0, text: '0', comma: false } as MathNode))
    return fieldItem(line, toLatex({ k: 'tuple', items: body.items }), slot, compiledField(items, vars, ctx.scope), vars.length, space)
  }
  if (body.k === 'fn' && body.name === 'grad') {
    const { value, vars } = symbolicField(body, ctx.symbols)
    return fieldItem(line, `${toLatex(body)} = ${toLatex({ k: 'tuple', items: value })}`, slot, compiledField(value, vars, ctx.scope), value.length, space)
  }
  return null
}
