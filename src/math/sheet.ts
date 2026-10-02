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
import { compile, EMPTY_SCOPE, scopeWith, withWorkLimit, type Scope, type UserFunction } from './evaluate'
import { evaluateExact, type ExactFunction, type ExactScope, type Rational } from './exact'
import { formatNumber, formatRational, type FormattedResult } from './format'
import { children, namesIn, parseMath, type MathNode } from './parse'

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
      const m = /^\\(q?quad\b|[{}])/.exec(tex.slice(i))
      if (m?.[1] === '{') depth++
      else if (m?.[1] === '}') depth--
      else if (m && depth === 0) {
        pieces.push(tex.slice(start, i))
        start = i + m[0].length
      }
      i += m ? m[0].length - 1 : 1
      continue
    }
    if (c === '(' || c === '[' || c === '{') depth++
    else if (c === ')' || c === ']' || c === '}') depth--
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

/** Il valore di una formula: un numero reale (anche esatto, una frazione) o complesso (anche esatto). */
type Value = { float: number; exact: Rational | null } | { complex: Complex; exactComplex: GaussRational | null }

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
  readonly definitions: Definition[] = []

  /**
   * `fixed`: i numeri con un valore diverso da quello scritto (gli slider dei grafici). Valgono in
   * tutto il foglio: quello che li usa (b = 2a, f(x) = a x^2) segue.
   */
  constructor(private readonly fixed?: ReadonlyMap<string, number>) {}

  /** Lo stato di adesso, per calcolare un'espressione con le definizioni fatte fin qui. */
  scope(): Scope {
    return { vars: EMPTY_SCOPE.vars, consts: new Map(this.consts), fns: new Map(this.fns), sets: new Map(this.sets) }
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

  /**
   * Legge una formula della nota: ricorda le definizioni che contiene e, se finisce con «=»,
   * restituisce il risultato (null se non si sa calcolare).
   */
  add(tex: string): FormattedResult | null {
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

  /** Ricorda una definizione (a = 2, f(x) = x^2); altro non conta. */
  define(src: string): void {
    const node = parseCached(src)
    if (!node || node.k !== 'rel' || node.ops.length !== 1 || node.ops[0] !== '=') return
    const target = definitionTarget(node.items[0])
    if (!target) return
    const value = node.items[1]
    this.record(target, value, src)
  }

  private record(target: { name: string; params: string[] | null }, value: MathNode, source: string, known?: Value): void {
    const { name, params } = target
    const uses = namesIn(value, new Set(), new Set(params ?? []))
    this.definitions.push({ name, params, source: source.trim(), value, uses })
    this.consts.delete(name)
    this.exactConsts.delete(name)
    this.fns.delete(name)
    this.exactFns.delete(name)
    this.sets.delete(name)
    this.complexConsts.delete(name)
    this.exactComplexConsts.delete(name)
    this.complexFns.delete(name)
    this.exactComplexFns.delete(name)
    if (!params && value.k === 'set') {
      this.sets.set(name, value)
      return
    }
    if (params) {
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
    let result: Value | null = forced !== undefined ? { float: forced, exact: null } : known ?? this.evaluate(value)
    // Senza un valore reale (z = 1 + 2i): un numero complesso.
    if (!result || ('float' in result && !Number.isFinite(result.float))) result = this.evaluateComplex(value)
    if (!result) return
    if ('float' in result) {
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
      const item = items[i]
      if (!item) continue
      const style = styleOf(item)
      const result = this.evaluate(item)
      const real = result && (result.exact ? formatRational(result.exact, style) : formatNumber(result.float, { ...style, decimal: true }))
      // Senza un valore reale: con i numeri complessi (1 + 2i, \sqrt{-4}, \ln(-1)).
      const found = real ? { shown: real, value: result } : this.showComplex(item, style)
      if (!found) continue
      if (target && !target.params && found.value) this.record(target, item, `${target.name} = ${src.slice(src.indexOf('=') + 1)}`, found.value)
      return found.shown
    }
    return null
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
