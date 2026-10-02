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
 *     a = 2                       un numero da usare nelle altre righe (con uno slider)
 *     a \in [0, 5]                da dove a dove va lo slider di a (anche 0 \le a \le 5)
 *     x \in [-5, 5]               la parte da mostrare (anche -1 \le y \le 3)
 *     % commento                  non conta
 *
 * Le righe possono usare anche le definizioni scritte prima nella nota (`$a = 2$`, `$f(x) = …$`).
 * Ogni numero scritto con le cifre che il grafico usa (a = 2, non b = 2a, che segue a) ha uno
 * slider sotto il grafico: `parseGraph` con `values` rifà il grafico con quei valori al posto di
 * quelli scritti, senza cambiare la nota.
 */
import { compile, compileCondition, EMPTY_SCOPE, errorMessage, MathError, scopeWith, UndefinedName, withWorkLimit, type Compiled, type Scope, type UserFunction } from '../math/evaluate'
import { nameLatex, toLatex } from '../math/latex'
import { children, namesIn, parseMath, parseStatement, tokenize, type MathNode } from '../math/parse'
import { Sheet } from '../math/sheet'

export type Range = [number, number]

interface ItemBase {
  /** La riga del blocco (da 0), per i messaggi. */
  line: number
  /** Cosa scrivere nella legenda, in LaTeX. */
  label: string
  /**
   * Il colore delle curve, nell'ordine delle righe (-1 per i punti). Contano anche le righe
   * sbagliate: così i colori non cambiano mentre si corregge o si muove uno slider.
   */
  slot: number
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
  /** I numeri che mancano, con la riga da aggiungere al blocco per averli con uno slider (k = 1). */
  add?: { name: string; line: string }[]
}

/** Un numero del grafico, con il suo slider. */
export interface GraphSlider {
  name: string
  /** Quello scritto nella nota o nel blocco (o quello dato a parseGraph al suo posto). */
  value: number
  /** Da dove a dove va: scritto nel blocco (a \in [0, 5]) o, se no, da −10 a 10. */
  range: Range
  /** Gli estremi in LaTeX, da scrivere accanto (2\pi, non 6,28). */
  ends: [string, string]
  /** Di quanto si muove: di 1 i numeri che contano i termini di una somma. */
  step: number
  /** Conta i termini di una somma (n in \sum_{k=0}^{n}): solo numeri interi. */
  integer: boolean
}

export interface GraphSpec {
  items: GraphItem[]
  errors: GraphError[]
  /** La parte da mostrare, se scritta nel blocco. */
  x: Range | null
  y: Range | null
  /** Ci sono seni e coseni: sull'asse x le tacche con π. */
  trig: boolean
  sliders: GraphSlider[]
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
const AXES: readonly string[] = ['x', 'y', 't', 'θ']

/**
 * `a \in [0, 5]` o `0 \le a \le 5`: da dove a dove va un nome. Per x e y è la parte da mostrare,
 * per t e θ l'intervallo delle curve con un parametro, per gli altri numeri lo slider.
 */
function rangeLine(node: MathNode): { name: string; lo: MathNode; hi: MathNode } | null {
  if (node.k === 'in') return node.a.k === 'name' ? { name: node.a.name, lo: node.lo, hi: node.hi } : null
  if (node.k !== 'rel' || node.items.length !== 3 || node.items[1].k !== 'name') return null
  const name = node.items[1].name
  if (node.ops.every((op) => op === '<' || op === '<=')) return { name, lo: node.items[0], hi: node.items[2] }
  if (node.ops.every((op) => op === '>' || op === '>=')) return { name, lo: node.items[2], hi: node.items[0] }
  return null
}

/** Un numero scritto con le cifre (2, -\frac{1}{2}, 2\pi): non usa altri nomi. */
function onlyDigits(names: Iterable<string>): boolean {
  for (const n of names) if (n !== 'π' && n !== 'e') return false
  return true
}

/** Lo slider di un numero, se il blocco non dice da dove a dove: da −10 a 10 (di più se il numero è più grande). */
function defaultRange(value: number, integer: boolean): Range {
  const size = Math.abs(value) <= 10 ? 10 : 10 ** Math.ceil(Math.log10(Math.abs(value)))
  return integer && value >= 0 ? [0, size] : [-size, size]
}

/** Il passo dello slider: tra 100 e 1000 posizioni. */
function sliderStep(range: Range): number {
  return 10 ** Math.floor(Math.log10((range[1] - range[0]) / 100))
}

/**
 * Il numero scritto a mano accanto allo slider (2, −1,5, 3/4, \pi/2, 2pi): null se non è un
 * numero. Quelli che contano i termini di una somma si arrotondano all'intero.
 */
export function typedSliderValue(text: string, slider: Pick<GraphSlider, 'integer'>): number | null {
  // Mentre si scrive 3,5, «3,» vale già 3.
  const src = text.trim().replace(/[,.]$/, '')
  if (!src) return null
  let value: number
  try {
    value = withWorkLimit(GRAPH_WORK, () => compile(parseMath(src), EMPTY_SCOPE, { calc: true })({}))
  } catch {
    return null
  }
  if (!Number.isFinite(value)) return null
  return slider.integer ? Math.round(value) : value
}

/**
 * Lo slider allargato fino a un valore scritto a mano fuori da dove va (a = 15, con a da −10 a 10):
 * l'estremo nuovo è sul passo, e se lo slider diventa molto più lungo il passo cresce (tra 100 e
 * 1000 posizioni, come gli altri).
 */
export function widenSlider(range: Range, step: number, value: number, integer: boolean): { range: Range; step: number } {
  const [lo, hi] = range
  if (value >= lo && value <= hi) return { range, step }
  const s = integer ? 1 : Math.max(step, sliderStep([Math.min(lo, value), Math.max(hi, value)]))
  const down = (v: number) => Number((Math.floor(v / s + 1e-9) * s).toPrecision(12))
  const up = (v: number) => Number((Math.ceil(v / s - 1e-9) * s).toPrecision(12))
  // Con un passo nuovo anche l'altro estremo va sul passo: lo slider arriva fino in fondo.
  const again = s !== step
  return { range: [value < lo || again ? down(Math.min(lo, value)) : lo, value > hi || again ? up(Math.max(hi, value)) : hi], step: s }
}

/** I nomi che contano i termini di una somma o di un prodotto (\sum_{k=0}^{n}): i loro slider vanno di 1. */
function termCounters(node: MathNode, out: Set<string>): void {
  if (node.k === 'big') {
    namesIn(node.from, out)
    namesIn(node.to, out)
  }
  for (const child of children(node)) termCounters(child, out)
}

/** Una riga che sembra un punto ((1, 2), P = (1, 2), P(1, 2)): non ha un colore suo. */
function looksLikePoint(main: MathNode): boolean {
  if (main.k === 'tuple') return !dependsOn(main, 't') && !dependsOn(main, 'θ')
  if (main.k === 'rel' && main.ops.length === 1 && main.items[0].k === 'name' && main.items[1].k === 'tuple') return looksLikePoint(main.items[1])
  return main.k === 'apply' && main.args.length === 2
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

function define(def: Definition, cond: MathNode | null, scope: Scope, consts: Map<string, number>, fns: Map<string, UserFunction>, values?: ReadonlyMap<string, number>): void {
  if (!def.params) {
    if (cond) throw new MathError('Un numero non ha condizioni')
    const value = values?.get(def.name) ?? compile(def.value, scope, { calc: true })({})
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
 * che le righe possono usare; `values` i numeri con un valore diverso da quello scritto (gli slider).
 */
export function parseGraph(source: string, defs: readonly string[] = [], values?: ReadonlyMap<string, number>): GraphSpec {
  return withWorkLimit(GRAPH_WORK, () => readGraph(source, defs, values))
}

/** I passi di somme e integrali per leggere un grafico, e per ogni disegno: oltre, le curve si fermano. */
export const GRAPH_WORK = 5e6

function readGraph(source: string, defs: readonly string[], values?: ReadonlyMap<string, number>): GraphSpec {
  const sheet = new Sheet(values)
  for (const d of defs) sheet.define(d)
  const spec: GraphSpec = { items: [], errors: [], x: null, y: null, trig: false, sliders: [] }
  const fail = (l: { line: number; text: string }, err: unknown): GraphError => {
    const error = { line: l.line, text: l.text, message: errorMessage(err) }
    spec.errors.push(error)
    return error
  }
  /** I nomi definiti nella nota o nel blocco (anche quelli che non hanno un valore, come 1/0). */
  const defined = new Set(sheet.definitions.map((d) => d.name))
  /** Le righe con un nome che non c'è: alla fine, la riga da aggiungere per ognuno (k = 1). */
  const undefinedIn: { error: GraphError; line: Line }[] = []
  const failLine = (l: Line, err: unknown) => {
    if (err instanceof UndefinedName && defined.has(err.missing)) {
      fail(l, new MathError(`${err.missing} non ha un valore: controlla la sua definizione`))
      return
    }
    const error = fail(l, err)
    if (err instanceof UndefinedName) undefinedIn.push({ error, line: l })
  }

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
    if (def) {
      pending.set(l, def)
      defined.add(def.name)
    } else drawn.push(l)
  }
  for (let progress = true; progress && pending.size; ) {
    progress = false
    for (const [l, def] of pending) {
      // Prima quelle che usa, se sono nel blocco: le definizioni del blocco valgono più di quelle della nota.
      const uses = namesIn(def.value, new Set(), new Set(def.params ?? []))
      if ([...pending.values()].some((other) => other.name !== def.name && uses.has(other.name))) continue
      try {
        define(def, l.cond, scope(), consts, fns, values)
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
      define(def, l.cond, scope(), consts, fns, values)
    } catch (err) {
      failLine(l, reaches(def.name, def.name, new Set()) ? new MathError(`${def.name} usa sé stessa (anche attraverso un'altra definizione)`) : err)
    }
  }

  // Poi le righe da disegnare, nell'ordine in cui sono scritte, e quelle che dicono da dove a dove.
  const ranges = new Map<Axis, Range>()
  const sliderRanges = new Map<string, { range: Range; ends: [string, string]; line: Line }>()
  drawn.sort((a, b) => a.line - b.line)
  let slot = 0
  for (const l of drawn) {
    const r = rangeLine(l.main)
    if (r) {
      try {
        const range: Range = [constantValue(r.lo, scope()), constantValue(r.hi, scope())]
        if (!(Number.isFinite(range[0]) && Number.isFinite(range[1]) && range[1] > range[0])) {
          const example = AXES.includes(r.name) ? 'x \\in [-5, 5]' : `${nameLatex(r.name)} \\in [0, 5]`
          throw new MathError(`Servono due estremi, dal più piccolo al più grande: ${example}`)
        }
        if (AXES.includes(r.name)) ranges.set(r.name as Axis, range)
        if (r.name !== 'x' && r.name !== 'y') sliderRanges.set(r.name, { range, ends: [toLatex(r.lo), toLatex(r.hi)], line: l })
      } catch (err) {
        failLine(l, err)
      }
      continue
    }
    try {
      const item = itemFor(l, scope(), slot)
      if (item.kind !== 'point') slot++
      spec.items.push(item)
    } catch (err) {
      if (!looksLikePoint(l.main)) slot++
      failLine(l, err)
    }
  }
  spec.x = ranges.get('x') ?? null
  spec.y = ranges.get('y') ?? null
  const functions = spec.items.filter((i) => i.kind === 'function')
  spec.trig = functions.some((i) => trig.has(i.line)) || (functions.length > 0 && defs.some((d) => /\\?(sin|cos|tan|tg)\b/.test(d)))
  for (const item of spec.items) {
    if (item.kind === 'parametric') item.t = ranges.get(item.param) ?? item.t
  }

  // Gli slider: i numeri scritti con le cifre (nella nota o nel blocco) che il grafico usa, anche
  // attraverso le altre definizioni (f(x) = a x^2 usa a).
  const blockDefs = new Map<string, { def: Definition; line: number }>()
  for (const l of lines) {
    const def = definitionOf(l.main)
    if (def) blockDefs.set(def.name, { def, line: l.line })
  }
  const noteDefs = new Map<string, number>()
  sheet.definitions.forEach((d, i) => noteDefs.set(d.name, i))
  const lastNoteDef = (name: string) => sheet.definitions[noteDefs.get(name) ?? -1]
  const usesOf = (name: string): Set<string> => {
    const b = blockDefs.get(name)
    if (b) return namesIn(b.def.value, new Set(), new Set(b.def.params ?? []))
    return new Set(sheet.definitions.filter((d) => d.name === name).flatMap((d) => [...d.uses]))
  }
  const isNumber = (name: string): boolean => {
    if (!consts.has(name)) return false
    const b = blockDefs.get(name)?.def ?? lastNoteDef(name)
    return !!b && !b.params && onlyDigits(usesOf(name))
  }
  const used = new Set<string>()
  for (const l of drawn) {
    namesIn(l.main, used)
    if (l.cond) namesIn(l.cond, used)
  }
  for (const queue = [...used]; queue.length; ) {
    for (const u of usesOf(queue.pop()!)) {
      if (!used.has(u)) {
        used.add(u)
        queue.push(u)
      }
    }
  }
  const counters = new Set<string>()
  for (const l of lines) termCounters(l.main, counters)
  for (const d of sheet.definitions) termCounters(d.value, counters)
  const order = (name: string) => (blockDefs.has(name) ? 1e6 + blockDefs.get(name)!.line : noteDefs.get(name) ?? 0)
  spec.sliders = [...used]
    .filter(isNumber)
    .sort((a, b) => order(a) - order(b))
    .map((name) => {
      const value = consts.get(name)!
      const integer = counters.has(name)
      const written = sliderRanges.get(name)
      const range = written?.range ?? defaultRange(value, integer)
      return { name, value, range, ends: written?.ends ?? [String(range[0]), String(range[1])], step: integer ? 1 : sliderStep(range), integer }
    })
  // Un intervallo per un nome che non è un numero da muovere.
  for (const [name, r] of sliderRanges) {
    if (isNumber(name) || name === 't' || name === 'θ') continue
    const def = blockDefs.get(name)?.def ?? lastNoteDef(name)
    if (fns.has(name) || def?.params) failLine(r.line, new MathError(`${name} è una funzione: lo slider è per i numeri, come a = 2`))
    else if (def && !onlyDigits(usesOf(name))) failLine(r.line, new MathError(`${name} si calcola da altri numeri: lo slider è per quelli scritti con le cifre, come a = 2`))
    else failLine(r.line, new UndefinedName(name))
  }

  // I nomi che mancano: la riga da aggiungere al blocco per averli, con uno slider (k = 1, o
  // l'inizio dell'intervallo scritto, se 1 è fuori).
  for (const { error, line } of undefinedIn) {
    const missing = missingNumbers(line, scope()).filter((name) => !defined.has(name))
    if (!missing.length || missing.length > 6 || hasWord(line.text)) continue
    error.add = missing.map((name) => {
      const r = sliderRanges.get(name)
      const value = !r || (r.range[0] <= 1 && r.range[1] >= 1) ? '1' : r.ends[0]
      return { name, line: `${nameLatex(name)} = ${value}` }
    })
  }
  spec.errors.sort((a, b) => a.line - b.line)
  return spec
}

/** Quattro lettere attaccate (velocita): è una parola scritta senza \text, non quattro numeri da muovere. */
function hasWord(text: string): boolean {
  let run = 0
  let end = -1
  for (const t of tokenize(text)) {
    run = t.k === 'name' && /^[a-zA-Z]$/.test(t.v) ? (t.pos === end ? run + 1 : 1) : 0
    if (run >= 4) return true
    end = t.end
  }
  return false
}

/**
 * I numeri che mancano in una riga (non definiti né nella nota né nel blocco): i nomi da soli e
 * quelli davanti a una parentesi con un'espressione (k(x - 1) è un prodotto); g(x) invece è una
 * funzione, e uno slider non serve.
 */
function missingNumbers(l: Line, scope: Scope): string[] {
  const out = new Set<string>()
  const known = (name: string, bound: ReadonlySet<string>) =>
    bound.has(name) || AXES.includes(name) || name === 'π' || name === 'e' || scope.consts.has(name) || scope.fns.has(name)
  const visit = (n: MathNode, bound: ReadonlySet<string>): void => {
    if (n.k === 'name') {
      if (!known(n.name, bound)) out.add(n.name)
      return
    }
    if (n.k === 'apply') {
      const product = !n.primes && n.args.length === 1 && n.args[0].k !== 'name'
      if (product && !known(n.name, bound)) out.add(n.name)
    }
    if (n.k === 'big' || n.k === 'int') {
      visit(n.from, bound)
      visit(n.to, bound)
      visit(n.body, new Set([...bound, n.v]))
      return
    }
    for (const child of children(n)) visit(child, bound)
  }
  const def = definitionOf(l.main)
  const polar = l.main.k === 'rel' && l.main.items[0].k === 'name' && l.main.items[0].name === 'r' && dependsOn(l.main.items[1], 'θ')
  if (def) visit(def.value, new Set(def.params ?? []))
  else if (polar) visit((l.main as Extract<MathNode, { k: 'rel' }>).items[1], new Set())
  else visit(l.main, new Set())
  if (l.cond) visit(l.cond, new Set(def?.params ?? []))
  return [...out]
}

function itemFor(l: Line, scope: Scope, slot: number): GraphItem {
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
      return { kind: 'parametric', line, label, slot, param, t: [0, 2 * Math.PI], fx: (t) => ((v[param] = t), fx(v)), fy: (t) => ((v[param] = t), fy(v)) }
    }
    if (cond) throw new MathError('Un punto non ha condizioni')
    const [x, y] = coords.map((n) => compile(n, scope)({}))
    if (!Number.isFinite(x) || !Number.isFinite(y)) throw new MathError('Le coordinate del punto non sono numeri')
    return { kind: 'point', line, label: name ? nameLatex(name) : '', slot: -1, x, y, name }
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
      return { kind: 'function', line, label, slot, f: (x) => fn.call([x]) }
    }
    // y = f(x)
    if (lhs.k === 'name' && lhs.name === 'y' && !dependsOn(rhs, 'y')) {
      const inner = scopeWith(scope, ['x'])
      const f = restrict(compile(rhs, inner), cond, inner)
      const v = { x: 0 }
      return { kind: 'function', line, label, slot, f: (x) => ((v.x = x), f(v)) }
    }
    // x = 3: retta verticale
    if (lhs.k === 'name' && lhs.name === 'x' && !dependsOn(rhs, 'y') && !dependsOn(rhs, 'x')) {
      if (cond) throw new MathError('Una retta verticale non ha condizioni')
      const x = compile(rhs, scope)({})
      if (!Number.isFinite(x)) throw new MathError('x non è un numero')
      return { kind: 'vertical', line, label, slot, x }
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
        slot,
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
      slot,
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
    return { kind: 'function', line, label: `${nameLatex(main.name)}(${nameLatex(fn.params[0])})`, slot, f: (x) => fn.call([x]) }
  }
  // Un'espressione da sola: è y = …
  if (!dependsOn(main, 'x')) throw new MathError('Manca la x: per una retta orizzontale scrivi y = 3')
  const inner = scopeWith(scope, ['x'])
  const f = restrict(compile(main, inner), cond, inner)
  const v = { x: 0 }
  return { kind: 'function', line, label: `y = ${toLatex(main)}${condLabel(cond)}`, slot, f: (x) => ((v.x = x), f(v)) }
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
