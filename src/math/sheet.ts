/**
 * Il «foglio» di una nota, come nelle Note matematiche dell'iPad: le formule si leggono dall'alto
 * in basso; `$a = 2$` definisce a, `$f(x) = x^2$` definisce f, e una formula che finisce con «=»
 * (`$f(3) + a =$`) ha il suo risultato. I grafici usano le stesse definizioni.
 */
import {
  allRoots,
  compileComplex,
  evaluateExactComplex,
  formatComplex,
  formatGauss,
  formatList,
  GaussRational,
  piMultiple,
  type Complex,
  type ComplexFunction,
  type ComplexScope,
  type ExactComplexScope,
} from './complex'
import { numericPartials } from './calculus'
import { bound, compile, EMPTY_SCOPE, isCounter, scopeWith, withWorkLimit, type Scope, type UserFunction, type VectorFunction } from './evaluate'
import { limit, recognize, seriesSum, type LimitValue } from './limits'
import { solve } from './solve'
import { compileOde, odeOf, odeSolution, primed, type Ode, type OdeFunction } from './differential'
import {
  EXACT,
  FLOAT,
  eigenvalues,
  eigenvectors,
  evaluateLinear,
  formatEigenvalues,
  formatLinear,
  formatPolynomial,
  polynomialIn,
  type Eigenvalue,
  type LinearScope,
  type LinearValue,
  type Mat,
} from './linear'
import { evaluateExact, type ExactFunction, type ExactScope, type Rational } from './exact'
import { formatNumber, formatRational, type FormattedResult } from './format'
import { toLatex } from './latex'
import { children, namesIn, parseMath, type MathNode } from './parse'
import { definiteIntegral } from './definite'
import { definiteParts, expandCalculus, isVectorBody, needsSymbols, partialDerivative, plainText, sub, subst, symbolicValue, symbols, toNode, zeroOverZero, type Ex, type SymbolScope } from './symbolic'

export interface Definition {
  name: string
  /** Le variabili, se è una funzione (f(x) = …); null se è un numero (a = …). */
  params: string[] | null
  /** Il testo della definizione (a = 2, f(x) = x^2), per rifarla altrove (nei grafici). */
  source: string
  /** Quello a destra dell'uguale. */
  value: MathNode
  /** I nomi che usa. */
  uses: Set<string>
}

/** Una formula che finisce con «=» (o con ≈): il testo prima. */
const TRAILING_EQUALS = /(?<![<>!:\\])(=|\\approx|≈)(?:\s|\\[,;:! ]|\\q?quad\b)*$/

/** Una formula che finisce con ⇒ (o ⇔): l'equazione, la disequazione o il sistema da risolvere. */
const SOLVE_REQUEST = /(?:\\(?:Rightarrow|implies|Longrightarrow|iff|Leftrightarrow|Longleftrightarrow)|⇒|⇔)(?:\s|\\[,;:! ]|\\q?quad\b)*$/

export function solveRequest(tex: string): string | null {
  const m = SOLVE_REQUEST.exec(tex)
  if (!m) return null
  const body = tex.slice(0, m.index)
  return body.trim() ? body : null
}

export function calculationRequest(tex: string): string | null {
  const m = TRAILING_EQUALS.exec(tex)
  if (!m) return null
  const body = tex.slice(0, m.index)
  return body.trim() ? body : null
}

/** I passi di somme e integrali per ogni risultato: abbastanza per i conti veri, non per bloccare la pagina. */
const WORK = 2e6

const parsed = new Map<string, MathNode | null>()

/** Legge un pezzo di formula, con una piccola memoria: mentre si scrive le formule sono sempre quelle. */
function parseCached(src: string): MathNode | null {
  const hit = parsed.get(src)
  if (hit !== undefined) return hit
  let node: MathNode | null
  try {
    node = parseMath(src)
  } catch {
    node = null
  }
  if (parsed.size > 3000) parsed.delete(parsed.keys().next().value!)
  parsed.set(src, node)
  return node
}

/**
 * Divide una formula dove ci sono più definizioni (`a = 2, \quad b = 3`): alle virgole e ai punti
 * e virgola fuori dalle parentesi (non a quelle tra due cifre, che sono decimali) e a \quad.
 */
export function splitPieces(tex: string): string[] {
  const pieces: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < tex.length; i++) {
    const c = tex[i]
    if (c === '\\') {
      const m = /^\\(q?quad\b|[{}]|langle\b|rangle\b)/.exec(tex.slice(i))
      if (m?.[1] === '{' || m?.[1] === 'langle') depth++
      else if (m?.[1] === '}' || m?.[1] === 'rangle') depth--
      else if (m && depth === 0) {
        pieces.push(tex.slice(start, i))
        start = i + m[0].length
      }
      i += m ? m[0].length - 1 : 1
      continue
    }
    if (c === '(' || c === '[' || c === '{' || c === '⟨') depth++
    else if (c === ')' || c === ']' || c === '}' || c === '⟩') depth--
    else if (depth === 0 && (c === ';' || (c === ',' && !(/\d/.test(tex[i - 1] ?? '') && /\d/.test(tex[i + 1] ?? ''))))) {
      pieces.push(tex.slice(start, i))
      start = i + 1
    }
  }
  pieces.push(tex.slice(start))
  return pieces.filter((p) => p.trim())
}

/** Le parti di una catena a = b = c, divise agli uguali fuori dalle parentesi. */
export function splitEquals(tex: string): string[] {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < tex.length; i++) {
    const c = tex[i]
    if (c === '\\') {
      i++
      continue
    }
    if (c === '(' || c === '[' || c === '{') depth++
    else if (c === ')' || c === ']' || c === '}') depth--
    else if (c === '=' && depth === 0 && !'<>!:'.includes(tex[i - 1] ?? '')) {
      parts.push(tex.slice(start, i))
      start = i + 1
    }
  }
  parts.push(tex.slice(start))
  return parts.filter((p) => p.trim())
}

/** Il nome definito a sinistra dell'uguale: una variabile (a) o una funzione (f(x, y)). */
function definitionTarget(node: MathNode): { name: string; params: string[] | null } | null {
  if (node.k === 'name') return node.name === 'π' ? null : { name: node.name, params: null }
  if (node.k === 'apply' && !node.primes && node.args.length && node.args.every((a) => a.k === 'name')) {
    const params = node.args.map((a) => (a as { name: string }).name)
    if (new Set(params).size !== params.length) return null
    return { name: node.name, params }
  }
  return null
}

function walk(node: MathNode, visit: (n: MathNode) => void): void {
  visit(node)
  for (const child of children(node)) walk(child, visit)
}

/** Le cifre da mostrare: come le ha scritte chi prende appunti (virgola o punto), frazioni o decimali. */
function styleOf(node: MathNode): { comma: boolean; decimal: boolean; digits: number } {
  let comma: boolean | null = null
  let decimal = false
  let digits = 12
  walk(node, (n) => {
    if (n.k === 'num' && n.text.includes('.')) {
      decimal = true
      comma ??= n.comma
    }
    // Integrali e derivate si calcolano con meno cifre sicure; i doppi e i tripli ancora meno.
    if (n.k === 'int' || (n.k === 'apply' && n.primes)) digits = Math.min(digits, 9)
    if (n.k === 'mint') digits = Math.min(digits, n.vars.length === 2 ? 8 : 7)
  })
  // Una frazione da sola (\frac{1}{3} =) si vuole in decimali.
  const bare = node.k === 'neg' ? node.a : node
  const single = bare.k === 'bin' && bare.op === '/' && bare.a.k === 'num' && bare.b.k === 'num'
  return { comma: comma ?? true, decimal: decimal || single, digits }
}

/** Come si scrive il risultato di un limite o di una serie. */
function limitText(value: LimitValue, style: ReturnType<typeof styleOf>, exact: Rational | null): FormattedResult | null {
  if (value.k === 'infinity') return value.sign > 0 ? { tex: '+\\infty', text: '+∞' } : { tex: '-\\infty', text: '−∞' }
  if (value.k === 'none') {
    const side = (v: LimitValue | undefined) => (v ? limitText(v, style, null) : null)
    const left = side(value.left)
    const right = side(value.right)
    if (left && right && value.left!.k !== 'none' && value.right!.k !== 'none') {
      return { tex: `\\nexists \\quad \\text{(da sinistra } ${left.tex}\\text{, da destra } ${right.tex}\\text{)}`, text: `non esiste (da sinistra ${left.text}, da destra ${right.text})` }
    }
    return { tex: '\\nexists', text: 'non esiste' }
  }
  if (exact) return formatRational(exact, style)
  return recognize(value.v, style) ?? formatNumber(value.v, { ...style, decimal: true, digits: 9 })
}

/** Il valore di una formula: un numero reale (anche esatto, una frazione), complesso (anche esatto) o una matrice. */
type Value = { float: number; exact: Rational | null } | { complex: Complex; exactComplex: GaussRational | null } | { linear: LinearValue }

export class Sheet {
  private consts = new Map<string, number>()
  private exactConsts = new Map<string, Rational | null>()
  private fns = new Map<string, UserFunction>()
  private exactFns = new Map<string, ExactFunction | null>()
  /** Gli insiemi definiti ($D = \{(x, y) : x^2 + y^2 \le 1\}$), per gli integrali doppi e tripli. */
  private sets = new Map<string, MathNode>()
  /** I numeri complessi definiti ($z = 1 + 2i$): quelli con la parte immaginaria (gli altri sono in `consts`). */
  private complexConsts = new Map<string, Complex>()
  private exactComplexConsts = new Map<string, GaussRational | null>()
  /** Le funzioni, per calcolarle anche con i numeri complessi (f(z) = z^2 + i). */
  private complexFns = new Map<string, ComplexFunction>()
  private exactComplexFns = new Map<string, { params: string[]; body: MathNode; scope: ExactComplexScope }>()
  /** Le matrici e i vettori definiti ($A = \begin{pmatrix} … \end{pmatrix}$, $v = (1, 2, 3)$). */
  private linearValues = new Map<string, LinearValue>()
  /** Le funzioni come sono scritte (anche quelle con i valori vettori), per i conti con le lettere. */
  private bodies = new Map<string, { params: string[]; body: MathNode }>()
  /** Le curve, le superfici e i campi ($\gamma(t) = (\cos t, \sin t)$, $F(x, y) = (-y, x)$). */
  private vfns = new Map<string, VectorFunction>()
  /** L'ultima funzione definita: una condizione subito dopo ($t \in [0, 2\pi]$) dice dove variano i suoi parametri. */
  private lastFunction: Definition | null = null
  /**
   * L'ultima equazione differenziale (y' = x - y, y'' = -y): le condizioni iniziali subito dopo
   * (y(0) = 1, y'(0) = 0) la risolvono; finché non ci sono tutte, quelle date.
   */
  private lastOde: { ode: Ode; definition: Definition; x0: number | null; Y0: (number | undefined)[] } | null = null
  private symbols: SymbolScope | null = null
  readonly definitions: Definition[] = []

  /**
   * `fixed`: i numeri con un valore diverso da quello scritto (gli slider dei grafici). Valgono in
   * tutto il foglio: quello che li usa (b = 2a, f(x) = a x^2) segue.
   */
  constructor(private readonly fixed?: ReadonlyMap<string, number>) {}

  /** Lo stato di adesso, per calcolare un'espressione con le definizioni fatte fin qui. */
  scope(): Scope {
    return { vars: EMPTY_SCOPE.vars, consts: new Map(this.consts), fns: new Map(this.fns), sets: new Map(this.sets), vfns: new Map(this.vfns) }
  }

  /** Lo stato di adesso per i conti con le lettere (le derivate, il gradiente…); si rifà a ogni definizione. */
  symbolScope(): SymbolScope {
    if (this.symbols) return this.symbols
    const consts = new Map<string, Rational | null>()
    for (const name of this.consts.keys()) consts.set(name, this.exactConsts.get(name) ?? null)
    this.symbols = { consts, fns: new Map(this.bodies) }
    return this.symbols
  }

  private exactScope(): ExactScope {
    return { consts: new Map(this.exactConsts), fns: new Map(this.exactFns) }
  }

  /** Lo stato di adesso per i conti con i numeri complessi: i numeri reali e quelli complessi. */
  complexScope(): ComplexScope {
    const consts = new Map<string, Complex>()
    for (const [name, value] of this.consts) consts.set(name, { re: value, im: 0 })
    for (const [name, value] of this.complexConsts) consts.set(name, value)
    return { vars: EMPTY_SCOPE.vars, consts, fns: new Map(this.complexFns) }
  }

  private exactComplexScope(): ExactComplexScope {
    const consts = new Map<string, GaussRational | null>()
    for (const [name, value] of this.exactConsts) consts.set(name, value && GaussRational.real(value))
    for (const name of this.consts.keys()) if (!consts.has(name)) consts.set(name, null)
    for (const [name, value] of this.exactComplexConsts) consts.set(name, value)
    return { consts, fns: new Map(this.exactComplexFns) }
  }

  /** I numeri complessi definiti fin qui (per i grafici nel piano di Gauss). */
  complexValues(): ReadonlyMap<string, Complex> {
    return new Map(this.complexConsts)
  }

  /** Lo stato di adesso per i conti con vettori e matrici. */
  linearScope(): LinearScope {
    return { real: this.scope(), exactReals: new Map(this.exactConsts), values: new Map(this.linearValues) }
  }

  /**
   * Legge una formula della nota: ricorda le definizioni che contiene e, se finisce con «=»,
   * restituisce il risultato (null se non si sa calcolare).
   */
  add(tex: string): FormattedResult | null {
    // x^2 - 5x + 6 = 0 \Rightarrow: le soluzioni.
    const equations = solveRequest(tex)
    if (equations !== null) return this.solveAll(equations)
    if (!tex.includes('=') && !tex.includes('≈') && !tex.includes('\\approx') && !tex.includes('\\coloneq')) return null
    try {
      const request = calculationRequest(tex)
      const pieces = splitPieces(request ?? tex)
      const last = request === null ? null : pieces.pop() ?? null
      for (const piece of pieces) this.define(piece)
      return last === null ? null : this.calculate(last)
    } catch {
      // Una formula che non si riesce a calcolare (troppo grande, troppo annidata) non ha risultato.
      return null
    }
  }

  /** Le soluzioni di un'equazione, di una disequazione o di un sistema (anche con le virgole o in \begin{cases}). */
  private solveAll(src: string): FormattedResult | null {
    const nodes = splitPieces(src).map(parseCached)
    if (!nodes.length || nodes.some((n) => !n)) return null
    const style = styleOf(nodes[0]!)
    try {
      return withWorkLimit(WORK, () =>
        solve(
          nodes.map((n) => this.prepare(n!)),
          {
            real: this.scope(),
            linear: this.linearScope(),
            symbols: this.symbolScope(),
            defined: (name) => this.consts.has(name) || this.complexConsts.has(name) || this.linearValues.has(name) || this.fns.has(name) || this.vfns.has(name),
          },
          style,
        ),
      )
    } catch {
      return null
    }
  }

  /**
   * Ricorda una definizione (a = 2, f(x) = x^2) o, subito dopo una curva o una superficie, dove
   * variano i suoi parametri (t \in [0, 2\pi]); altro non conta.
   */
  define(src: string): void {
    const pieces = splitPieces(src)
    if (pieces.length > 1) {
      for (const piece of pieces) this.define(piece)
      return
    }
    const node = parseCached(src)
    if (!node) return
    if (this.lastFunction && this.attachDomain(node, src)) return
    if (this.lastOde && this.attachInitial(node, src)) return
    // y' = x - y, y'' + y = 0: un'equazione differenziale; con le condizioni iniziali y diventa una funzione.
    const ode = odeOf(node)
    if (ode) {
      const own = [ode.x, ...Array.from({ length: ode.order + 1 }, (_, k) => primed(ode.y, k))]
      const definition: Definition = { name: ode.y, params: [ode.x], source: src.trim(), value: ode.f, uses: namesIn(ode.f, new Set(), new Set(own)) }
      this.definitions.push(definition)
      this.lastOde = { ode, definition, x0: null, Y0: Array(ode.order).fill(undefined) }
      this.lastFunction = null
      return
    }
    if (node.k !== 'rel' || node.ops.length !== 1 || node.ops[0] !== '=') return
    const target = definitionTarget(node.items[0])
    if (!target) return
    const value = node.items[1]
    this.record(target, value, src)
  }

  /** y(0) = 1 dopo y' = …: la soluzione, con Runge–Kutta, come funzione (y(2) = …). */
  private attachInitial(node: MathNode, src: string): boolean {
    const last = this.lastOde!
    const { ode } = last
    const at = node.k === 'rel' && node.ops.length === 1 && node.ops[0] === '=' ? node.items[0] : null
    if (!at || at.k !== 'apply' || at.name !== ode.y || at.args.length !== 1 || at.primes >= ode.order || last.Y0[at.primes] !== undefined) return false
    const x0 = this.evaluate(at.args[0])
    const y0 = this.evaluate((node as Extract<MathNode, { k: 'rel' }>).items[1])
    if (!x0 || !y0 || !Number.isFinite(x0.float) || !Number.isFinite(y0.float) || (last.x0 !== null && last.x0 !== x0.float)) return false
    let F: OdeFunction
    try {
      F = compileOde(ode, this.scope())
    } catch {
      return false
    }
    last.x0 = x0.float
    last.Y0[at.primes] = y0.float
    last.definition.source = `${last.definition.source}, \\; ${src.trim().replace(/^(\\[,;:! ]|\\q?quad\b|\s)+/, '')}`
    // y'' = -y con solo y(0) = 0: aspetta y'(0).
    if (last.Y0.some((v) => v === undefined)) return true
    const start = last.x0
    const Y0 = last.Y0 as number[]
    this.consts.delete(ode.y)
    // Passi di un millesimo: le cifre che si mostrano sono giuste.
    const solution = odeSolution(F, start, Y0, 1e-3)
    this.fns.set(ode.y, { params: [ode.x], call: ([x]) => solution(x) })
    this.lastOde = null
    this.symbols = null
    return true
  }

  /** t \in [0, 2\pi], 0 \le t \le 1: l'intervallo di un parametro dell'ultima curva o superficie. */
  private attachDomain(node: MathNode, src: string): boolean {
    const last = this.lastFunction!
    const f = this.vfns.get(last.name)
    if (!f || !last.params) return false
    let found = false
    const visit = (n: MathNode): void => {
      if (n.k === 'and') return n.items.forEach(visit)
      let bound: { v: string; lo: MathNode; hi: MathNode } | null = null
      if (n.k === 'in' && n.a.k === 'name') bound = { v: n.a.name, lo: n.lo, hi: n.hi }
      else if (n.k === 'rel' && n.items.length === 3 && n.items[1].k === 'name' && n.ops.every((op) => op === '<' || op === '<=')) {
        bound = { v: n.items[1].name, lo: n.items[0], hi: n.items[2] }
      }
      const i = bound ? f.params.indexOf(bound.v) : -1
      if (!bound || i < 0) return
      const lo = this.evaluate(bound.lo)
      const hi = this.evaluate(bound.hi)
      if (!lo || !hi || !('float' in lo) || !('float' in hi) || !(hi.float > lo.float)) return
      f.domain[i] = [lo.float, hi.float]
      found = true
    }
    visit(node)
    // Il grafico rifà le definizioni dal loro testo: anche l'intervallo.
    if (found) last.source = `${last.source}, \\; ${src.trim().replace(/^(\\[,;:! ]|\\q?quad\b|\s)+/, '')}`
    return found
  }

  private record(target: { name: string; params: string[] | null }, value: MathNode, source: string, known?: Value): void {
    const { name, params } = target
    const uses = namesIn(value, new Set(), new Set(params ?? []))
    const definition = { name, params, source: source.trim(), value, uses }
    this.definitions.push(definition)
    this.symbols = null
    this.lastFunction = params ? definition : null
    this.bodies.delete(name)
    this.vfns.delete(name)
    this.consts.delete(name)
    this.exactConsts.delete(name)
    this.fns.delete(name)
    this.exactFns.delete(name)
    this.sets.delete(name)
    this.complexConsts.delete(name)
    this.exactComplexConsts.delete(name)
    this.complexFns.delete(name)
    this.exactComplexFns.delete(name)
    this.linearValues.delete(name)
    if (!params && value.k === 'set') {
      this.sets.set(name, value)
      return
    }
    try {
      this.store(name, params, value, known)
    } finally {
      // Quello che la definizione ha cambiato vale anche per i conti con le lettere.
      this.symbols = null
    }
  }

  private store(name: string, params: string[] | null, value: MathNode, known?: Value): void {
    if (params) {
      // Con le derivate e il gradiente già fatti con le lettere: g(x) = f'(x), F(x, y) = \nabla f.
      const body = this.prepare(value, params)
      this.bodies.set(name, { params, body })
      if (isVectorBody(body)) {
        this.vfns.set(name, this.vectorFunction(params, body))
        return
      }
      value = body
      this.complexFns.set(name, { params, body: value, scope: this.complexScope() })
      this.exactComplexFns.set(name, { params, body: value, scope: this.exactComplexScope() })
      try {
        const body = compile(value, scopeWith(this.scope(), params), { calc: true })
        this.fns.set(name, {
          params,
          call: params.length === 1 ? (args) => body({ [params[0]]: args[0] }) : (args) => body(Object.fromEntries(params.map((p, i) => [p, args[i]]))),
        })
        this.exactFns.set(name, { params, body: value, scope: this.exactScope() })
      } catch {
        // Usa nomi che non ci sono: la funzione resta non definita.
      }
      return
    }
    const forced = this.fixed?.get(name)
    if (!known) value = this.prepare(value)
    let result: Value | null = forced !== undefined ? { float: forced, exact: null } : known ?? this.evaluate(value)
    // Senza un valore reale (z = 1 + 2i): un numero complesso; o una matrice, un vettore.
    if (!result || ('float' in result && !Number.isFinite(result.float))) result = this.evaluateComplex(value)
    if (!result) {
      const linear = this.evaluateLinear(value)
      if (linear?.float.k === 'scalar') {
        if (Number.isFinite(linear.float.v)) result = { float: linear.float.v, exact: linear.exact?.k === 'scalar' ? linear.exact.v : null }
      } else if (linear) result = { linear }
    }
    if (!result) return
    if ('linear' in result) {
      // Matrici, vettori e figure (rette, circonferenze…): per le formule dopo.
      if (result.linear.float.k !== 'scalar' && result.linear.float.k !== 'identity') this.linearValues.set(name, result.linear)
    } else if ('float' in result) {
      this.consts.set(name, result.float)
      this.exactConsts.set(name, result.exact)
    } else if (result.complex.im === 0) {
      this.consts.set(name, result.complex.re)
      this.exactConsts.set(name, result.exactComplex?.isReal ? result.exactComplex.re : null)
    } else {
      this.complexConsts.set(name, result.complex)
      this.exactComplexConsts.set(name, result.exactComplex)
    }
  }

  /**
   * La formula con le derivate e gli operatori dei campi già fatti con le lettere, dove si può
   * (`params`: le variabili di una funzione, che restano lettere).
   */
  private prepare(node: MathNode, params: string[] = [], decimal = styleOf(node).decimal || this.usesDecimals(node)): MathNode {
    const scope = { ...this.symbolScope() }
    if (!needsSymbols(node, scope)) return node
    if (params.length) scope.consts = new Map([...scope.consts].filter(([n]) => !params.includes(n)))
    try {
      return withWorkLimit(WORK, () => expandCalculus(node, scope, decimal))
    } catch {
      return node
    }
  }

  /** Le funzioni che la formula usa sono scritte con i decimali (f(x) = 0{,}3 x^2)? Allora anche il risultato. */
  private usesDecimals(node: MathNode, seen = new Set<string>()): boolean {
    for (const name of namesIn(node)) {
      const body = this.bodies.get(name)
      if (!body || seen.has(name)) continue
      seen.add(name)
      if (styleOf(body.body).decimal || this.usesDecimals(body.body, seen)) return true
    }
    return false
  }

  /** Una curva, una superficie o un campo: i valori, le derivate (con le lettere, se si può) e gli intervalli. */
  private vectorFunction(params: string[], body: MathNode): VectorFunction {
    const items = body.k === 'tuple' ? body.items : body.k === 'matrix' ? body.rows.map((r) => r[0]) : []
    const inner = scopeWith(this.scope(), params)
    const parts = items.map((c) => {
      try {
        return compile(c, inner, { calc: true })
      } catch {
        return () => NaN
      }
    })
    const vars = (args: number[]) => Object.fromEntries(params.map((p, i) => [p, args[i]]))
    const call = (args: number[]) => {
      const v = vars(args)
      return parts.map((c) => c(v))
    }
    const numeric = numericPartials(call, params.length)
    const scope = this.symbolScope()
    const partials = params.map((p, k) => {
      try {
        const derivatives = items.map((c) => compile(partialDerivative(c, p, params, scope), inner, { calc: true }))
        return (args: number[]) => {
          const v = vars(args)
          return derivatives.map((d) => d(v))
        }
      } catch {
        return numeric[k]
      }
    })
    return { params, call, partials, domain: params.map(() => null) }
  }

  private evaluate(node: MathNode): { float: number; exact: Rational | null } | null {
    let float: number
    try {
      float = withWorkLimit(WORK, () => compile(node, this.scope(), { calc: true })({}))
    } catch {
      return null
    }
    let exact: Rational | null = null
    try {
      exact = withWorkLimit(WORK, () => evaluateExact(node, this.exactScope()))
    } catch {
      // Senza frazioni (π, sin…) o troppo grande: va bene il risultato con la virgola.
    }
    return { float: exact ? exact.toNumber() : float, exact }
  }

  /** Il valore con i numeri complessi (anche esatto, con le frazioni), o null. */
  private evaluateComplex(node: MathNode): { complex: Complex; exactComplex: GaussRational | null } | null {
    let complex: Complex
    try {
      complex = withWorkLimit(WORK, () => compileComplex(node, this.complexScope())({}))
    } catch {
      return null
    }
    if (!Number.isFinite(complex.re) || !Number.isFinite(complex.im)) return null
    let exact: GaussRational | null = null
    try {
      exact = withWorkLimit(WORK, () => evaluateExactComplex(node, this.exactComplexScope()))
    } catch {
      // Con e, π, radici…: va bene il risultato con la virgola.
    }
    return { complex: exact ? exact.toComplex() : complex, exactComplex: exact }
  }

  /** Il valore con vettori e matrici (con le frazioni, se si può), o null. */
  private evaluateLinear(node: MathNode): LinearValue | null {
    const scope = this.linearScope()
    let float: LinearValue['float']
    try {
      float = withWorkLimit(WORK, () => evaluateLinear(node, scope, FLOAT))
    } catch {
      return null
    }
    let exact: LinearValue['exact'] = null
    try {
      exact = withWorkLimit(WORK, () => evaluateLinear(node, scope, EXACT))
    } catch {
      // Con π, le radici…: va bene con la virgola.
    }
    return { exact, float }
  }

  /**
   * Il risultato con vettori e matrici: una matrice, un vettore, un sottospazio (\ker A), gli
   * autovalori e gli autovettori, il polinomio caratteristico (\det(A - \lambda I)).
   */
  private showLinear(item: MathNode, style: ReturnType<typeof styleOf>): { shown: FormattedResult; value: Value | null } | null {
    if (item.k === 'fn' && (item.name === 'eig' || item.name === 'eigvec') && item.args.length === 1) {
      const A = this.evaluateLinear(item.args[0])
      if (!A || A.float.k !== 'matrix') return null
      let values: Eigenvalue[]
      try {
        values = withWorkLimit(WORK, () => eigenvalues(this.linearScope(), A))
      } catch {
        return null
      }
      if (!values.length) return null
      const vectors =
        item.name === 'eigvec'
          ? (e: Eigenvalue): FormattedResult | null => {
              const basis = eigenvectors(A, e)
              if (!basis.length) return null
              const shown = e.exact
                ? (basis as Mat<Rational>[]).map((m) => formatLinear(EXACT, { k: 'matrix', m, tuple: false }, style))
                : (basis as Mat<number>[]).map((m) => formatLinear(FLOAT, { k: 'matrix', m, tuple: false }, style))
              if (shown.some((v) => !v)) return null
              return { tex: shown.map((v) => v!.tex).join(',\ '), text: shown.map((v) => v!.text).join(', ') }
            }
          : undefined
      return { shown: formatEigenvalues(values, style, vectors), value: null }
    }
    const value = this.evaluateLinear(item)
    if (value && !(value.float.k === 'scalar' && !Number.isFinite(value.float.v))) {
      const shown = value.exact ? formatLinear(EXACT, value.exact, style) : formatLinear(FLOAT, value.float, style)
      if (!shown) return null
      const result: Value =
        value.float.k === 'scalar' ? { float: value.float.v, exact: value.exact?.k === 'scalar' ? value.exact.v : null } : { linear: value }
      return { shown, value: result }
    }
    // Il polinomio caratteristico: un determinante con una sola variabile libera (λ).
    const scope = this.linearScope()
    const free = [...namesIn(item)].filter(
      (n) => !scope.values.has(n) && !this.consts.has(n) && !this.complexConsts.has(n) && !this.fns.has(n) && !['π', 'e', 'I', 'T'].includes(n) && !/^I_\d$/.test(n),
    )
    let det = false
    walk(item, (n) => (det ||= (n.k === 'fn' && n.name === 'det') || n.k === 'matrix'))
    if (free.length !== 1 || !det) return null
    const poly = withWorkLimit(WORK, () => polynomialIn(item, free[0], scope))
    return poly ? { shown: formatPolynomial(poly, free[0], style), value: null } : null
  }

  /** Il risultato con i numeri complessi: tutte le radici di una radice da sola, l'argomento come multiplo di π. */
  private showComplex(item: MathNode, style: ReturnType<typeof styleOf>): { shown: FormattedResult; value: Value | null } | null {
    const roots = (() => {
      try {
        return withWorkLimit(WORK, () => allRoots(item, this.complexScope()))
      } catch {
        return null
      }
    })()
    if (roots && roots.length > 1) {
      const shown = roots.map((r) => formatComplex(r, { ...style, decimal: true }))
      return shown.every((r) => r) ? { shown: formatList(shown as FormattedResult[]), value: null } : null
    }
    const value = this.evaluateComplex(item)
    if (!value) return null
    if (item.k === 'fn' && item.name === 'arg' && !item.pow) {
      const pi = piMultiple(value.complex.re)
      if (pi) return { shown: pi, value }
    }
    const shown = value.exactComplex ? formatGauss(value.exactComplex, style) : formatComplex(value.complex, style)
    return shown ? { shown, value } : null
  }

  /** Il risultato di «… =»: dell'ultima parte che si sa calcolare (in a = 3 + 4 = anche a diventa 7). */
  private calculate(src: string): FormattedResult | null {
    const node = parseCached(src)
    let items: (MathNode | null)[]
    if (node) items = node.k === 'rel' && node.ops.every((op) => op === '=' || op === '≈') ? node.items : [node]
    // Se una parte della catena non si legge (\left[\frac{x^2}{2}\right]_0^2), si provano le altre.
    else items = splitEquals(src).map(parseCached)
    const target = items.length > 1 && items[0] ? definitionTarget(items[0]) : null
    for (let i = items.length - 1; i >= (target ? 1 : 0); i--) {
      let item = items[i]
      if (!item) continue
      const style = styleOf(item)
      // Un limite o una serie: il valore (riconosciuto, se si può), l'infinito o «non esiste».
      const limitShown = this.showLimit(item, style)
      if (limitShown) {
        if (target && !target.params && limitShown.value) this.record(target, item, `${target.name} = ${src.slice(src.indexOf('=') + 1)}`, limitShown.value)
        return limitShown.shown
      }
      // Un integrale definito con la primitiva: il valore esatto, gli impropri, la funzione integrale.
      const integral = this.showIntegral(item, style)
      if (integral) {
        if (target && !target.params && integral.value) this.record(target, item, `${target.name} = ${src.slice(src.indexOf('=') + 1)}`, integral.value)
        return integral.shown
      }
      // Le derivate e gli operatori dei campi con le lettere: se restano variabili, il risultato è una formula.
      if (needsSymbols(item, this.symbolScope())) {
        const decimal = style.decimal || this.usesDecimals(item)
        // Una derivata, un gradiente, un polinomio di Taylor, una primitiva da soli: già scritti come vanno.
        const indefinite = item.k === 'prim' ? item : null
        const single = item.k === 'diff' || item.k === 'fn' || item.k === 'prim' || (item.k === 'apply' && item.primes > 0)
        item = this.prepare(item, [], decimal)
        if (this.freeNames(item).length) {
          const shown = single ? this.showSymbolic(item, decimal, false) : this.showSymbolic(item, decimal)
          // \int f(x) \, dx: la primitiva più la costante.
          if (shown && indefinite) return this.plusConstant(shown, indefinite)
          if (shown) return shown
          continue
        }
      }
      const result = this.evaluate(item)
      const real = result && (result.exact ? formatRational(result.exact, style) : formatNumber(result.float, { ...style, decimal: true }))
      // Senza un valore reale: con i numeri complessi (1 + 2i, \sqrt{-4}, \ln(-1)), o con vettori e matrici.
      const found = real ? { shown: real, value: result } : this.showComplex(item, style) ?? this.showLinear(item, style)
      if (!found) continue
      if (target && !target.params && found.value) this.record(target, item, `${target.name} = ${src.slice(src.indexOf('=') + 1)}`, found.value)
      return found.shown
    }
    return null
  }

  /**
   * Il risultato di un limite (\lim_{x \to 0} \frac{\sin x}{x} = 1) o di una serie
   * (\sum_{n=1}^{\infty} \frac{1}{n^2} = π²/6 ≈ 1,644934…); null se la formula è altro.
   */
  private showLimit(item: MathNode, style: ReturnType<typeof styleOf>): { shown: FormattedResult; value: Value | null } | null {
    const series = item.k === 'big' && item.op === 'sum' && (item.to.k === 'infty' || (item.to.k === 'bin' && item.to.op === '+' && item.to.b.k === 'infty'))
    if (item.k !== 'lim' && !series) return null
    let value: LimitValue
    let exact: Rational | null = null
    try {
      value = withWorkLimit(WORK, () => {
        const scope = this.scope()
        if (item.k === 'lim') {
          const node = this.prepare(item.body)
          const body = compile(node, scopeWith(scope, [item.v]), { calc: true })
          const to = bound(item.to, scope)({})
          // 0/0 in un punto: con le derivate esatte, anche dove le cifre dei numeri non bastano.
          const exactly = Number.isFinite(to) ? zeroOverZero(item.body, item.v, item.to, this.symbolScope()) : null
          if (exactly) {
            exact = exactly.exact
            return { k: 'value', v: exactly.value }
          }
          const v: Record<string, number> = {}
          const found = limit((x) => ((v[item.v] = x), body(v)), to, item.side, isCounter(item.v) && !Number.isFinite(to))
          // Dove la funzione è continua il valore esatto: \lim_{x 	o 2} x^2 = 4.
          if (found.k === 'value' && Number.isFinite(to)) exact = this.exactAt(node, item.v, item.to, found.v)
          return found
        }
        const big = item as Extract<MathNode, { k: 'big' }>
        const body = compile(this.prepare(big.body), scopeWith(scope, [big.v]), { calc: true })
        const start = bound(big.from, scope)({})
        const v: Record<string, number> = {}
        return seriesSum((n) => ((v[big.v] = n), body(v)), Math.ceil(start - 1e-9))
      })
    } catch {
      return null
    }
    const shown = limitText(value, style, exact)
    const result: Value | null = value.k === 'value' ? { float: value.v, exact } : null
    return shown ? { shown, value: result } : null
  }

  /** La primitiva con la costante: + c (o + k, + C se la c c'è già). */
  private plusConstant(shown: FormattedResult, node: MathNode): FormattedResult {
    const used = namesIn(node)
    const c = ['c', 'k', 'C'].find((n) => !used.has(n) && !this.consts.has(n) && !this.fns.has(n)) ?? 'c'
    return { ...shown, tex: `${shown.tex} + ${c}`, text: `${shown.text} + ${c}` }
  }

  /**
   * Un integrale definito con la primitiva: il valore esatto (\int_0^1 \frac{dx}{1 + x^2} = π/4), gli
   * integrali impropri (+∞ se divergono) e, con le lettere negli estremi, la funzione integrale
   * (\int_0^x t^2 \, dt = x³/3). Null se la primitiva non si trova: allora l'integrale con i numeri.
   */
  private showIntegral(item: MathNode, style: ReturnType<typeof styleOf>): { shown: FormattedResult; value: Value | null } | null {
    if (item.k !== 'int' || item.body.k === 'int') return null
    try {
      return withWorkLimit(WORK, () => {
        const parts = definiteParts(item, this.symbolScope())
        if (!parts) return null
        const { F, a, b } = parts
        const v = item.v
        const letters = (e: Ex | null) => (e ? this.freeNames(toNode(e)) : [])
        // Con le lettere: F(b) − F(a) come formula.
        if ([...letters(F).filter((n) => n !== v), ...letters(a), ...letters(b)].length) {
          if (!a || !b) return null
          const node = toNode(sub(subst(F, v, b), subst(F, v, a)), style.decimal)
          const tex = toLatex(node)
          return tex ? { shown: { tex, text: plainText(node), rich: true }, value: null } : null
        }
        const scope = this.scope()
        const A = bound(item.from, scope)({})
        const B = bound(item.to, scope)({})
        const body = compile(item.body, scopeWith(scope, [v]), { calc: true })
        const vars: Record<string, number> = {}
        const f = (x: number) => ((vars[v] = x), body(vars))
        let numeric = NaN
        try {
          numeric = compile(item, scope, { calc: true })({})
        } catch {
          // Si decide con la primitiva.
        }
        const found = definiteIntegral(F, v, f, a, b, A, B, numeric, scope)
        if (!found) return null
        if (found.value.k === 'infinity') return { shown: found.value.sign > 0 ? { tex: '+\\infty', text: '+∞' } : { tex: '-\\infty', text: '−∞' }, value: null }
        if (found.value.k !== 'value') return null
        const x = found.value.v
        const exact = found.exact && !symbols(found.exact).some((n) => n !== 'π' && n !== 'e') ? found.exact : null
        if (exact?.t === 'num') return { shown: formatRational(exact.v, style), value: { float: x, exact: exact.v } }
        if (exact && !style.decimal) {
          const node = toNode(exact)
          const tex = toLatex(node)
          const digits = formatNumber(x, { ...style, decimal: true })
          if (tex && digits && tex.length < 160) return { shown: { tex: `${tex} \\approx ${digits.tex}`, text: `${plainText(node)} ≈ ${digits.text}`, rich: true }, value: { float: x, exact: null } }
        }
        const shown = (style.decimal ? null : recognize(x, style)) ?? formatNumber(x, { ...style, decimal: true, digits: 9 })
        return shown ? { shown, value: { float: x, exact: null } } : null
      })
    } catch {
      return null
    }
  }

  /** Il valore esatto della funzione nel punto, se c'è e torna con il limite trovato con i numeri. */
  private exactAt(body: MathNode, v: string, to: MathNode, near: number): Rational | null {
    try {
      const point = evaluateExact(to, this.exactScope())
      const value = evaluateExact(body, this.exactScope(), new Map([[v, point]]))
      return Math.abs(value.toNumber() - near) <= 1e-6 * Math.max(1, Math.abs(near)) ? value : null
    } catch {
      return null
    }
  }

  /** Le lettere che la formula usa e che la nota non definisce (le variabili di un risultato con le lettere). */
  private freeNames(node: MathNode): string[] {
    return [...namesIn(node)].filter(
      (n) =>
        !this.consts.has(n) &&
        !this.complexConsts.has(n) &&
        !this.linearValues.has(n) &&
        !this.fns.has(n) &&
        !this.vfns.has(n) &&
        !this.bodies.has(n) &&
        !this.sets.has(n) &&
        !['π', 'e', 'i'].includes(n),
    )
  }

  /** Un risultato con le lettere (2x, (2x, 2y), la matrice hessiana), semplificato e disegnato. */
  private showSymbolic(node: MathNode, decimal: boolean, simplify = true): FormattedResult | null {
    let value = node
    try {
      if (simplify || needsSymbols(node, this.symbolScope())) value = withWorkLimit(WORK, () => symbolicValue(node, this.symbolScope(), decimal))
    } catch {
      // Una parte che non si semplifica si mostra com'è, ma non una derivata che non si è saputa fare.
      if (needsSymbols(node, this.symbolScope())) return null
    }
    const tex = toLatex(value)
    return tex ? { tex, text: plainText(value), rich: true } : null
  }

  /** Le definizioni che servono a questi nomi (anche attraverso altre definizioni), in ordine. */
  definitionsFor(names: Iterable<string>): string[] {
    const wanted = new Set(names)
    for (let changed = true; changed; ) {
      changed = false
      for (const d of this.definitions) {
        if (!wanted.has(d.name)) continue
        for (const u of d.uses) {
          if (!wanted.has(u)) {
            wanted.add(u)
            changed = true
          }
        }
      }
    }
    return this.definitions.filter((d) => wanted.has(d.name)).map((d) => d.source)
  }
}
