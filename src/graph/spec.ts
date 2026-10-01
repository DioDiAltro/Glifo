/**
 * Un blocco ```grafico della nota: una riga per ogni cosa da disegnare, scritta come una formula.
 *
 *     y = x^2 - 1                 una funzione (anche solo x^2 - 1)
 *     f(x) = \frac{1}{x}          una funzione con un nome (che le altre righe possono usare)
 *     y = \sqrt{x}, 0 \le x \le 4 solo dove vale la condizione
 *     x = 2                       una retta verticale
 *     x^2 + y^2 = 4               una curva qualsiasi in x e y
 *     r = 1 + \cos\theta          in coordinate polari
 *     (\cos t, \sin t)            una curva con un parametro t
 *     P = (1, 2)                  un punto (anche P(1, 2) o solo (1, 2))
 *     a = 2                       un numero da usare nelle altre righe
 *     x \in [-5, 5]               la parte da mostrare (anche -1 \le y \le 3)
 *     % commento                  non conta
 *
 * Le righe possono usare anche le definizioni scritte prima nella nota (`$a = 2$`, `$f(x) = …$`).
 */
import { compile, compileCondition, errorMessage, MathError, scopeWith, withWorkLimit, type Compiled, type Scope, type UserFunction } from '../math/evaluate'
import { nameLatex, toLatex } from '../math/latex'
import { children, namesIn, parseStatement, type MathNode } from '../math/parse'
import { Sheet } from '../math/sheet'

export type Range = [number, number]

interface ItemBase {
  /** La riga del blocco (da 0), per i messaggi. */
  line: number
  /** Cosa scrivere nella legenda, in LaTeX. */
  label: string
}

export type GraphItem =
  | (ItemBase & { kind: 'function'; f: (x: number) => number })
  | (ItemBase & { kind: 'vertical'; x: number })
  | (ItemBase & { kind: 'implicit'; F: (x: number, y: number) => number })
  | (ItemBase & { kind: 'parametric'; fx: (t: number) => number; fy: (t: number) => number; param: 't' | 'θ'; t: Range })
  | (ItemBase & { kind: 'point'; x: number; y: number; name: string | null })

export interface GraphError {
  line: number
  text: string
  message: string
}

export interface GraphSpec {
  items: GraphItem[]
  errors: GraphError[]
  /** La parte da mostrare, se scritta nel blocco. */
  x: Range | null
  y: Range | null
  /** Ci sono seni e coseni: sull'asse x le tacche con π. */
  trig: boolean
}

const TRIG_FUNCTIONS = new Set(['sin', 'cos', 'tan', 'cot', 'sec', 'csc'])

/** Le righe del blocco, con quelle di un \begin{cases} … \end{cases} unite in una. */
export function blockLines(source: string): { line: number; text: string }[] {
  const out: { line: number; text: string }[] = []
  const lines = source.split('\n')
  for (let i = 0; i < lines.length; i++) {
    let text = lines[i]
    const start = i
    while (/\\begin\{d?cases\}/.test(text) && !/\\end\{d?cases\}/.test(text) && i + 1 < lines.length) text += '\n' + lines[++i]
    const trimmed = text.trim()
    if (!trimmed || trimmed.startsWith('%') || trimmed.startsWith('//')) continue
    out.push({ line: start, text: trimmed })
  }
  return out
}

function usesTrig(node: MathNode): boolean {
  if (node.k === 'fn' && TRIG_FUNCTIONS.has(node.name)) return true
  return children(node).some(usesTrig)
}

function dependsOn(node: MathNode, name: string): boolean {
  return namesIn(node).has(name)
}

/** Il valore di un'espressione senza variabili (un estremo, una coordinata). */
function constantValue(node: MathNode, scope: Scope): number {
  if (node.k === 'infty') return Infinity
  if (node.k === 'neg' && node.a.k === 'infty') return -Infinity
  return compile(node, scope)({})
}

type Axis = 'x' | 'y' | 't' | 'θ'

/** `x \in [a, b]` o `a \le x \le b`: la parte da mostrare (o l'intervallo di t e θ). */
function windowLine(node: MathNode, scope: Scope): { axis: Axis; range: Range } | null {
  const axisOf = (n: MathNode) => (n.k === 'name' && ['x', 'y', 't', 'θ'].includes(n.name) ? (n.name as Axis) : null)
  let axis: Axis | null = null
  let lo: MathNode | null = null
  let hi: MathNode | null = null
  if (node.k === 'in') {
    axis = axisOf(node.a)
    lo = node.lo
    hi = node.hi
  } else if (node.k === 'rel' && node.items.length === 3) {
    axis = axisOf(node.items[1])
    if (node.ops.every((op) => op === '<' || op === '<=')) [lo, hi] = [node.items[0], node.items[2]]
    else if (node.ops.every((op) => op === '>' || op === '>=')) [lo, hi] = [node.items[2], node.items[0]]
    else axis = null
  }
  if (!axis || !lo || !hi) return null
  return { axis, range: [constantValue(lo, scope), constantValue(hi, scope)] }
}

interface Definition {
  name: string
  params: string[] | null
  value: MathNode
}

/** a = 2 o f(x) = …: una riga che definisce un nome (le coordinate x e y no, sono rette). */
function definitionOf(node: MathNode): Definition | null {
  if (node.k !== 'rel' || node.ops.length !== 1 || node.ops[0] !== '=') return null
  const [lhs, value] = node.items
  if (value.k === 'tuple') return null
  if (lhs.k === 'name') {
    if (lhs.name === 'x' || lhs.name === 'y' || lhs.name === 'π') return null
    // r = 1 + \cos\theta è una curva in coordinate polari, r = 2 un numero.
    if (lhs.name === 'r' && dependsOn(value, 'θ')) return null
    return { name: lhs.name, params: null, value }
  }
  if (lhs.k === 'apply' && !lhs.primes && lhs.args.length && lhs.args.every((a) => a.k === 'name')) {
    const params = lhs.args.map((a) => (a as { name: string }).name)
    if (new Set(params).size === params.length) return { name: lhs.name, params, value }
  }
  return null
}

/** Una condizione, come funzione: fuori dal suo dominio la curva non c'è. */
function restrict(f: Compiled, cond: MathNode | null, scope: Scope): Compiled {
  if (!cond) return f
  const ok = compileCondition(cond, scope)
  return (v) => (ok(v) ? f(v) : NaN)
}

function condLabel(cond: MathNode | null): string {
  return cond ? `, \\quad ${toLatex(cond)}` : ''
}

interface Line {
  line: number
  text: string
  main: MathNode
  cond: MathNode | null
}

function define(def: Definition, cond: MathNode | null, scope: Scope, consts: Map<string, number>, fns: Map<string, UserFunction>): void {
  if (!def.params) {
    if (cond) throw new MathError('Un numero non ha condizioni')
    const value = compile(def.value, scope, { calc: true })({})
    if (!Number.isFinite(value)) throw new MathError(`${def.name} non è un numero`)
    fns.delete(def.name)
    consts.set(def.name, value)
    return
  }
  const params = def.params
  const inner = scopeWith(scope, params)
  const body = restrict(compile(def.value, inner), cond, inner)
  consts.delete(def.name)
  fns.set(def.name, {
    params,
    call: params.length === 1 ? (args) => body({ [params[0]]: args[0] }) : (args) => body(Object.fromEntries(params.map((p, i) => [p, args[i]]))),
  })
}

/**
 * Legge il blocco: `defs` sono le definizioni scritte prima nella nota (vedi Sheet.definitionsFor),
 * che le righe possono usare.
 */
export function parseGraph(source: string, defs: readonly string[] = []): GraphSpec {
  return withWorkLimit(GRAPH_WORK, () => readGraph(source, defs))
}

/** I passi di somme e integrali per leggere un grafico, e per ogni disegno: oltre, le curve si fermano. */
export const GRAPH_WORK = 5e6

function readGraph(source: string, defs: readonly string[]): GraphSpec {
  const sheet = new Sheet()
  for (const d of defs) sheet.define(d)
  const spec: GraphSpec = { items: [], errors: [], x: null, y: null, trig: false }
  const fail = (l: { line: number; text: string }, err: unknown) => spec.errors.push({ line: l.line, text: l.text, message: errorMessage(err) })

  const lines: Line[] = []
  /** Le righe con seni e coseni: se sono funzioni di x, sull'asse x le tacche con π. */
  const trig = new Set<number>()
  for (const l of blockLines(source)) {
    try {
      const { main, cond } = parseStatement(l.text)
      lines.push({ ...l, main, cond })
      if (usesTrig(main)) trig.add(l.line)
    } catch (err) {
      fail(l, err)
    }
  }

  // Prima le definizioni (a = 2, f(x) = …), in qualsiasi ordine: ognuna appena ha quello che le serve.
  const consts = new Map(sheet.scope().consts)
  const fns = new Map(sheet.scope().fns)
  const scope = (): Scope => ({ vars: new Set(), consts, fns })
  const pending = new Map<Line, Definition>()
  const drawn: Line[] = []
  for (const l of lines) {
    const def = definitionOf(l.main)
    if (def) pending.set(l, def)
    else drawn.push(l)
  }
  for (let progress = true; progress && pending.size; ) {
    progress = false
    for (const [l, def] of pending) {
      // Prima quelle che usa, se sono nel blocco: le definizioni del blocco valgono più di quelle della nota.
      const uses = namesIn(def.value, new Set(), new Set(def.params ?? []))
      if ([...pending.values()].some((other) => other.name !== def.name && uses.has(other.name))) continue
      try {
        define(def, l.cond, scope(), consts, fns)
      } catch {
        // Riprova dopo le altre: forse usa qualcosa definito più sotto.
        continue
      }
      pending.delete(l)
      progress = true
      // Le funzioni di una variabile si disegnano.
      if (def.params?.length === 1) drawn.push(l)
    }
  }
  // Quelle rimaste: o sbagliate, o in un giro (f usa g che usa f).
  const waiting = new Map([...pending.values()].map((d) => [d.name, d]))
  const reaches = (from: string, target: string, seen: Set<string>): boolean => {
    const def = waiting.get(from)
    if (!def) return false
    for (const n of namesIn(def.value, new Set(), new Set(def.params ?? []))) {
      if (n === target) return true
      if (!seen.has(n)) {
        seen.add(n)
        if (reaches(n, target, seen)) return true
      }
    }
    return false
  }
  for (const [l, def] of pending) {
    try {
      define(def, l.cond, scope(), consts, fns)
    } catch (err) {
      fail(l, reaches(def.name, def.name, new Set()) ? new MathError(`${def.name} usa sé stessa (anche attraverso un'altra definizione)`) : err)
    }
  }

  // Poi le righe da disegnare, nell'ordine in cui sono scritte.
  const ranges = new Map<Axis, Range>()
  drawn.sort((a, b) => a.line - b.line)
  for (const l of drawn) {
    try {
      const window = windowLine(l.main, scope())
      if (window) {
        const [lo, hi] = window.range
        if (!(Number.isFinite(lo) && Number.isFinite(hi) && hi > lo)) throw new MathError('Servono due estremi, dal più piccolo al più grande: x \\in [-5, 5]')
        ranges.set(window.axis, window.range)
        continue
      }
      spec.items.push(itemFor(l, scope()))
    } catch (err) {
      fail(l, err)
    }
  }
  spec.x = ranges.get('x') ?? null
  spec.y = ranges.get('y') ?? null
  const functions = spec.items.filter((i) => i.kind === 'function')
  spec.trig = functions.some((i) => trig.has(i.line)) || (functions.length > 0 && defs.some((d) => /\\?(sin|cos|tan|tg)\b/.test(d)))
  for (const item of spec.items) {
    if (item.kind === 'parametric') item.t = ranges.get(item.param) ?? item.t
  }
  spec.errors.sort((a, b) => a.line - b.line)
  return spec
}

function itemFor(l: Line, scope: Scope): GraphItem {
  const { main, cond, line } = l

  // Un punto: (1, 2), P = (1, 2), P(1, 2). Con t (o θ) è una curva con un parametro.
  let coords: MathNode[] | null = null
  let name: string | null = null
  if (main.k === 'tuple') coords = main.items
  else if (main.k === 'rel' && main.ops.length === 1 && main.ops[0] === '=' && main.items[0].k === 'name' && main.items[1].k === 'tuple') {
    coords = main.items[1].items
    name = main.items[0].name
  } else if (main.k === 'apply' && !scope.fns.has(main.name) && main.args.length === 2) {
    coords = main.args
    name = main.name
  }
  if (coords) {
    if (coords.length !== 2) throw new MathError('Un punto ha due coordinate: (x, y)')
    const param = coords.some((n) => dependsOn(n, 'θ')) ? 'θ' : 't'
    if (coords.some((n) => dependsOn(n, param))) {
      const inner = scopeWith(scope, [param])
      const fx = restrict(compile(coords[0], inner), cond, inner)
      const fy = compile(coords[1], inner)
      const v: Record<string, number> = { [param]: 0 }
      const label = `${name ? `${nameLatex(name)} = ` : ''}${toLatex({ k: 'tuple', items: coords })}${condLabel(cond)}`
      return { kind: 'parametric', line, label, param, t: [0, 2 * Math.PI], fx: (t) => ((v[param] = t), fx(v)), fy: (t) => ((v[param] = t), fy(v)) }
    }
    if (cond) throw new MathError('Un punto non ha condizioni')
    const [x, y] = coords.map((n) => compile(n, scope)({}))
    if (!Number.isFinite(x) || !Number.isFinite(y)) throw new MathError('Le coordinate del punto non sono numeri')
    return { kind: 'point', line, label: name ? nameLatex(name) : '', x, y, name }
  }

  if (main.k === 'rel') {
    if (main.ops.length !== 1 || main.ops[0] !== '=') {
      if (main.ops.every((op) => op === '=')) throw new MathError('In una riga va un\'uguaglianza sola')
      if (!dependsOn(main, 'y')) throw new MathError('Una condizione da sola non si disegna: per la parte da mostrare scrivi x \\in [a, b]')
      throw new MathError('Le zone (con < e >) non si sanno ancora colorare: scrivi un\'uguaglianza')
    }
    const [lhs, rhs] = main.items
    const label = `${toLatex(main)}${condLabel(cond)}`
    // f(x) = … (già definita): la curva è la funzione, con la sua variabile.
    if (lhs.k === 'apply' && lhs.args.length === 1 && scope.fns.get(lhs.name)?.params.length === 1) {
      const fn = scope.fns.get(lhs.name)!
      return { kind: 'function', line, label, f: (x) => fn.call([x]) }
    }
    // y = f(x)
    if (lhs.k === 'name' && lhs.name === 'y' && !dependsOn(rhs, 'y')) {
      const inner = scopeWith(scope, ['x'])
      const f = restrict(compile(rhs, inner), cond, inner)
      const v = { x: 0 }
      return { kind: 'function', line, label, f: (x) => ((v.x = x), f(v)) }
    }
    // x = 3: retta verticale
    if (lhs.k === 'name' && lhs.name === 'x' && !dependsOn(rhs, 'y') && !dependsOn(rhs, 'x')) {
      if (cond) throw new MathError('Una retta verticale non ha condizioni')
      const x = compile(rhs, scope)({})
      if (!Number.isFinite(x)) throw new MathError('x non è un numero')
      return { kind: 'vertical', line, label, x }
    }
    // r = f(θ): coordinate polari
    if (lhs.k === 'name' && lhs.name === 'r' && dependsOn(rhs, 'θ')) {
      const inner = scopeWith(scope, ['θ'])
      const r = restrict(compile(rhs, inner), cond, inner)
      const v = { θ: 0 }
      return {
        kind: 'parametric',
        line,
        label,
        param: 'θ',
        t: [0, 2 * Math.PI],
        fx: (t) => ((v.θ = t), r(v) * Math.cos(t)),
        fy: (t) => ((v.θ = t), r(v) * Math.sin(t)),
      }
    }
    // Una curva qualsiasi: sinistra - destra = 0
    if (!dependsOn(main, 'x') && !dependsOn(main, 'y')) throw new MathError('Mancano x e y: cosa disegno?')
    const xy = scopeWith(scope, ['x', 'y'])
    const left = compile(lhs, xy)
    const right = compile(rhs, xy)
    const ok = cond ? compileCondition(cond, xy) : null
    const v = { x: 0, y: 0 }
    return {
      kind: 'implicit',
      line,
      label,
      F: (x, y) => {
        v.x = x
        v.y = y
        return ok && !ok(v) ? NaN : left(v) - right(v)
      },
    }
  }

  if (main.k === 'in' || main.k === 'and' || main.k === 'or') throw new MathError('Una condizione da sola non si disegna: per la parte da mostrare scrivi x \\in [a, b]')
  // f: una funzione definita (nella nota o nel blocco), da sola.
  if (main.k === 'name' && scope.fns.has(main.name)) {
    const fn = scope.fns.get(main.name)!
    if (fn.params.length !== 1) throw new MathError(`${main.name} ha ${fn.params.length} variabili: si disegnano le funzioni di una`)
    return { kind: 'function', line, label: `${nameLatex(main.name)}(${nameLatex(fn.params[0])})`, f: (x) => fn.call([x]) }
  }
  // Un'espressione da sola: è y = …
  if (!dependsOn(main, 'x')) throw new MathError('Manca la x: per una retta orizzontale scrivi y = 3')
  const inner = scopeWith(scope, ['x'])
  const f = restrict(compile(main, inner), cond, inner)
  const v = { x: 0 }
  return { kind: 'function', line, label: `y = ${toLatex(main)}${condLabel(cond)}`, f: (x) => ((v.x = x), f(v)) }
}

/** I nomi che il blocco usa: quelli da cercare tra le definizioni della nota. */
export function graphNames(source: string): Set<string> {
  const names = new Set<string>()
  for (const l of blockLines(source)) {
    try {
      const { main, cond } = parseStatement(l.text)
      namesIn(main, names)
      if (cond) namesIn(cond, names)
    } catch {
      // Una riga sbagliata non usa niente.
    }
  }
  for (const c of ['x', 'y', 't', 'θ', 'π']) names.delete(c)
  return names
}

/**
 * La formula è una funzione (o una curva) da disegnare? `y = …` o `f(x) = …` con la x, `r = …` con
 * θ, un'equazione in x e y. Se sì, il suo grafico (con le definizioni della nota `defs`).
 */
export function formulaGraph(tex: string, defs: readonly string[] = []): GraphSpec | null {
  const text = tex.trim()
  if (!text || text.includes('\n')) return null
  let main: MathNode
  try {
    main = parseStatement(text).main
  } catch {
    return null
  }
  if (main.k !== 'rel' || main.ops.length !== 1 || main.ops[0] !== '=') return null
  const [lhs, rhs] = main.items
  const all = namesIn(main)
  const plottable =
    (lhs.k === 'name' && lhs.name === 'y' && namesIn(rhs).has('x')) ||
    (lhs.k === 'apply' && !lhs.primes && lhs.args.length === 1 && lhs.args[0].k === 'name' && namesIn(rhs).has(lhs.args[0].name)) ||
    (lhs.k === 'name' && lhs.name === 'r' && namesIn(rhs).has('θ')) ||
    (all.has('x') && all.has('y') && !(lhs.k === 'name' && (lhs.name === 'x' || lhs.name === 'y')))
  if (!plottable) return null
  const spec = parseGraph(text, defs)
  return spec.errors.length || spec.items.length !== 1 ? null : spec
}

/** Il blocco da mettere nella nota. */
export function graphBlockText(lines: readonly string[]): string {
  return '```grafico\n' + lines.join('\n') + '\n```'
}
