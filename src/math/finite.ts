/**
 * Gli insiemi scritti elemento per elemento: A = \{1, 2, 3\}, anche con i puntini (\{1, 2, \ldots, 10\}).
 * Unione, intersezione, differenza (anche simmetrica, A \triangle B), prodotto cartesiano (A \times B,
 * A^2), insieme delle parti (\mathcal{P}(A), 2^A), complementare (A^c, \overline{A}: rispetto a U, o a Ω)
 * e quanti elementi ha un insieme (|A|, \#A); con lo spazio Ω, la probabilità classica P(A) = |A|/|Ω|.
 */
import { Rational } from './exact'
import type { FormattedResult } from './format'
import { toLatex } from './latex'
import type { MathNode } from './parse'
import { exOf, key, plainText, tidy, type SymbolScope } from './symbolic'

export interface FiniteContext {
  /** Gli insiemi della nota (A = \{1, 2, 3\}). */
  sets: ReadonlyMap<string, MathNode>
  symbols: SymbolScope
  /** Se il nome è una funzione definita nella nota: allora P(A) e \mathcal{P}(A) sono la funzione. */
  isFunction: (name: string) => boolean
}

/** Un elemento: la chiave per riconoscere quelli uguali (1/2 e 0,5), come si scrive e, se è un numero, il valore. */
interface Elem {
  key: string
  node: MathNode
  num: number | null
  /** Se è una coppia (o una terna): le coordinate. */
  tuple?: Elem[]
  /** Se è un insieme (nell'insieme delle parti): i suoi elementi. */
  set?: Elem[]
}

export class FiniteError extends Error {}

/** Più elementi di così non si elencano (l'insieme delle parti di un insieme di 12 elementi ne ha 4096). */
const MOST = 5000

const EMPTY: MathNode = { k: 'set', vars: null, cond: { k: 'and', items: [] } }

const isEllipsis = (n: MathNode) => n.k === 'name' && n.name === '…'

function numberNode(r: Rational): MathNode {
  const v = r.toNumber()
  return r.isInteger ? { k: 'num', v, text: String(r.n), comma: false } : { k: 'bin', op: '/', a: numberNode(new Rational(r.n)), b: numberNode(new Rational(r.d)), frac: true }
}

/** Un elemento scritto nell'insieme: un numero, una lettera, una coppia, un altro insieme. */
function elemOf(node: MathNode, ctx: FiniteContext): Elem {
  if (node.k === 'tuple') {
    const items = node.items.map((n) => elemOf(n, ctx))
    return tupleElem(items)
  }
  const inner = literal(node, ctx)
  if (inner) return setElem(inner)
  let k: string
  let num: number | null = null
  try {
    const e = tidy(exOf(node, ctx.symbols))
    k = key(e)
    if (e.t === 'num') num = e.v.toNumber()
  } catch {
    k = toLatex(node)
  }
  return { key: k, node, num }
}

function tupleElem(items: Elem[]): Elem {
  return { key: `(${items.map((i) => i.key).join(',')})`, node: { k: 'tuple', items: items.map((i) => i.node) }, num: null, tuple: items }
}

function setElem(items: Elem[]): Elem {
  const sorted = ordered(items)
  return { key: `{${[...sorted.map((i) => i.key)].sort().join(',')}}`, node: setNode(sorted), num: null, set: sorted }
}

/** Il nodo di un insieme scritto: per tenerlo come definizione (C = A \cup B). */
function setNode(items: Elem[]): MathNode {
  if (!items.length) return EMPTY
  return { k: 'set', vars: null, cond: items.length === 1 ? items[0].node : { k: 'and', items: items.map((i) => i.node) } }
}

/** Senza i doppioni, in ordine se sono tutti numeri. */
function ordered(items: Elem[]): Elem[] {
  const seen = new Set<string>()
  const out = items.filter((i) => !seen.has(i.key) && seen.add(i.key))
  if (out.every((i) => i.num !== null)) out.sort((a, b) => a.num! - b.num!)
  return out
}

/** \{1, 2, \ldots, 10\}: i numeri che mancano, con il passo dei primi due (o 1). */
function expandDots(items: MathNode[], ctx: FiniteContext): MathNode[] {
  const at = items.findIndex(isEllipsis)
  if (at < 0) return items
  if (at === 0 || at === items.length - 1 || items.filter(isEllipsis).length > 1) throw new FiniteError('I puntini vanno tra due elementi: \\{1, 2, \\ldots, 10\\}')
  const value = (n: MathNode) => {
    const e = tidy(exOf(n, ctx.symbols))
    if (e.t !== 'num') throw new FiniteError('Con i puntini servono dei numeri: \\{1, 2, \\ldots, 10\\}')
    return e.v
  }
  const last = value(items[at - 1])
  const end = value(items[at + 1])
  const step = at >= 2 ? last.sub(value(items[at - 2])) : Rational.int(end.cmp(last) >= 0 ? 1 : -1)
  if (step.sign === 0 || end.sub(last).div(step).sign < 0 || !end.sub(last).div(step).isInteger) {
    throw new FiniteError(`Con il passo ${plainText(numberNode(step))} da ${plainText(numberNode(last))} non si arriva a ${plainText(numberNode(end))}`)
  }
  const count = end.sub(last).div(step).toNumber()
  if (count > MOST) throw new FiniteError(`Sono più di ${MOST} elementi`)
  const middle: MathNode[] = []
  for (let k = 1; k < count; k++) middle.push(numberNode(last.add(step.mul(Rational.int(k)))))
  return [...items.slice(0, at), ...middle, ...items.slice(at + 1)]
}

/** Gli elementi di un insieme scritto (\{1, 2, 3\}); null se è un insieme con una condizione (\{x : x > 0\}). */
function literal(node: MathNode, ctx: FiniteContext): Elem[] | null {
  if (node.k === 'name' && node.name === '∅') return []
  if (node.k !== 'set' || node.vars) return null
  const items = node.cond.k === 'and' ? node.cond.items : [node.cond]
  if (items.some((i) => i.k === 'rel' || i.k === 'and' || i.k === 'or' || i.k === 'in')) return null
  return ordered(expandDots(items, ctx).map((i) => elemOf(i, ctx)))
}

const has = (set: Elem[], e: Elem) => set.some((x) => x.key === e.key)

function powerset(set: Elem[]): Elem[] {
  if (set.length > 12) throw new FiniteError(`L'insieme delle parti avrebbe 2^${set.length} elementi: troppi da elencare`)
  // Prima i sottoinsiemi più piccoli, ognuno con gli elementi nell'ordine dell'insieme.
  const out: Elem[] = []
  const pick = (from: number, size: number, chosen: Elem[]) => {
    if (chosen.length === size) {
      out.push(setElem(chosen))
      return
    }
    for (let i = from; i < set.length; i++) pick(i + 1, size, [...chosen, set[i]])
  }
  for (let size = 0; size <= set.length; size++) pick(0, size, [])
  return out
}

function product(a: Elem[], b: Elem[], flatten: boolean): Elem[] {
  if (a.length * b.length > MOST) throw new FiniteError(`Il prodotto cartesiano avrebbe ${a.length * b.length} elementi: troppi da elencare`)
  return a.flatMap((x) => b.map((y) => tupleElem(flatten && x.tuple ? [...x.tuple, y] : [x, y])))
}

/** L'insieme universo per il complementare e la probabilità: U o Ω, se la nota li ha. */
function universe(ctx: FiniteContext, what: string): Elem[] {
  for (const name of ['U', 'Ω']) {
    const node = ctx.sets.get(name)
    const set = node && literal(node, ctx)
    if (set) return set
  }
  throw new FiniteError(`Per ${what} serve l'insieme universo: scrivi prima U = \\{…\\} (o Ω)`)
}

const isComplementMark = (n: MathNode) => n.k === 'name' && (n.name === 'c' || n.name === 'C' || n.name === '∁')

/** Il valore di un'espressione con gli insiemi; null se non è un insieme scritto elemento per elemento. */
function setValue(node: MathNode, ctx: FiniteContext, depth = 0): Elem[] | null {
  if (depth > 40) return null
  const sub = (n: MathNode) => setValue(n, ctx, depth + 1)
  switch (node.k) {
    case 'set':
      return literal(node, ctx)
    case 'name': {
      if (node.name === '∅') return []
      // \overline{A}: il complementare.
      if (node.name.length === 2 && (node.name[1] === '̄' || node.name[1] === '̅')) {
        const set = sub({ k: 'name', name: node.name[0] })
        return set && universe(ctx, 'il complementare').filter((e) => !has(set, e))
      }
      const def = ctx.sets.get(node.name)
      return def ? literal(def, ctx) : null
    }
    case 'bin': {
      if (node.op === '^') {
        // A^c, A^{\complement}: il complementare; A^2 = A \times A; 2^A: l'insieme delle parti.
        if (node.a.k === 'num' && node.a.v === 2) {
          const set = sub(node.b)
          return set && powerset(set)
        }
        const set = sub(node.a)
        if (!set) return null
        if (isComplementMark(node.b)) return universe(ctx, 'il complementare').filter((e) => !has(set, e))
        if (node.b.k === 'num' && Number.isInteger(node.b.v) && node.b.v >= 1 && node.b.v <= 4) {
          let out = set
          for (let k = 1; k < node.b.v; k++) out = product(out, set, k > 1)
          return out
        }
        return null
      }
      // \complement A, \complement_U A.
      if (node.op === '*' && node.implicit && node.a.k === 'name' && node.a.name === '∁') {
        const set = sub(node.b)
        return set && universe(ctx, 'il complementare').filter((e) => !has(set, e))
      }
      // A \triangle B: la differenza simmetrica (\triangle si legge come il triangolo della geometria).
      if (node.op === '*' && node.implicit && node.b.k === 'fn' && node.b.name === 'triangle' && node.b.args.length === 1) {
        const a = sub(node.a)
        const b = a && sub(node.b.args[0])
        return a && b && ordered([...a.filter((e) => !has(b, e)), ...b.filter((e) => !has(a, e))])
      }
      if (!node.cup && !node.cap && !node.setminus && !node.cross && node.op !== '-') return null
      const a = sub(node.a)
      const b = a && sub(node.b)
      if (!a || !b) return null
      if (node.cup) return ordered([...a, ...b])
      if (node.cap) return a.filter((e) => has(b, e))
      if (node.cross) return product(a, b, node.a.k === 'bin' && !!node.a.cross)
      return a.filter((e) => !has(b, e))
    }
    case 'fn': {
      if (node.args.length !== 1 || node.pow) return null
      if (node.name === 'powerset') {
        const set = sub(node.args[0])
        return set && powerset(set)
      }
      return null
    }
    case 'apply': {
      if (node.name !== '𝒫' || node.args.length !== 1 || node.primes || ctx.isFunction('𝒫')) return null
      const set = sub(node.args[0])
      return set && powerset(set)
    }
    default:
      return null
  }
}

/** Quanti elementi ha un'espressione con gli insiemi (|A|, \#A, \operatorname{card}(A)); null se non lo è. */
function countOf(node: MathNode, ctx: FiniteContext): number | null {
  // |\mathcal{P}(A)| = 2^{|A|} e |A \times B| = |A| \cdot |B|, senza elencarli.
  if ((node.k === 'fn' && node.name === 'powerset' && node.args.length === 1) || (node.k === 'apply' && node.name === '𝒫' && node.args.length === 1 && !ctx.isFunction('𝒫'))) {
    const n = countOf(node.args[0], ctx)
    return n === null ? null : 2 ** n
  }
  if (node.k === 'bin' && node.cross) {
    const a = countOf(node.a, ctx)
    const b = a === null ? null : countOf(node.b, ctx)
    return a === null || b === null ? null : a * b
  }
  return setValue(node, ctx)?.length ?? null
}

/** Quello che si vede di un elemento: \{1, 2\}, (1, a), \frac{1}{2}. */
function elemTex(e: Elem): string {
  if (e.set) return setTex(e.set)
  if (e.tuple) return `\\left(${e.tuple.map(elemTex).join(', ')}\\right)`
  return toLatex(e.node)
}

function elemText(e: Elem): string {
  if (e.set) return setText(e.set)
  if (e.tuple) return `(${e.tuple.map(elemText).join(', ')})`
  return plainText(e.node)
}

/** Gli insiemi lunghi: i primi elementi, i puntini e quanti sono. */
const SHOWN = 60

function setTex(items: Elem[]): string {
  if (!items.length) return '\\emptyset'
  const shown = items.length > SHOWN ? [...items.slice(0, SHOWN - 1).map(elemTex), '\\ldots'] : items.map(elemTex)
  return `\\left\\{${shown.join(', ')}\\right\\}`
}

function setText(items: Elem[]): string {
  if (!items.length) return '∅'
  const shown = items.length > SHOWN ? [...items.slice(0, SHOWN - 1).map(elemText), '…'] : items.map(elemText)
  return `{${shown.join(', ')}}`
}

/** Se nell'espressione c'è un insieme scritto elemento per elemento (o uno della nota): solo allora si prova. */
function involvesSets(node: MathNode, ctx: FiniteContext): boolean {
  switch (node.k) {
    case 'set':
      return !node.vars
    case 'name':
      return node.name === '∅' || node.name === '𝒫' || node.name === '∁' || (ctx.sets.has(node.name) && !!literal(ctx.sets.get(node.name)!, ctx)) || (node.name.length === 2 && ctx.sets.has(node.name[0]))
    case 'bin':
      return involvesSets(node.a, ctx) || involvesSets(node.b, ctx)
    case 'abs':
      return involvesSets(node.a, ctx)
    case 'fn':
      return node.args.some((a) => involvesSets(a, ctx))
    case 'apply':
      return (node.name === '𝒫' || node.name === 'P') && node.args.some((a) => involvesSets(a, ctx))
    case 'prob':
      return involvesSets(node.event, ctx) || (!!node.given && involvesSets(node.given, ctx))
    default:
      return false
  }
}

export type FiniteResult = { set: MathNode; shown: FormattedResult } | { count: Rational }

/**
 * Il risultato di un'espressione con gli insiemi scritti elemento per elemento: un insieme (A \cup B), o un
 * numero (|A|, la probabilità P(A) con lo spazio Ω). Null se l'espressione è altro.
 */
export function finiteValue(node: MathNode, ctx: FiniteContext): FiniteResult | null {
  if (!involvesSets(node, ctx)) return null
  // |A|, \#A, \operatorname{card}(A).
  const counted = node.k === 'abs' ? node.a : node.k === 'fn' && node.name === 'card' && node.args.length === 1 && !node.pow ? node.args[0] : null
  if (counted) {
    const n = countOf(counted, ctx)
    return n === null ? null : { count: Rational.int(n) }
  }
  // P(A) = |A| / |Ω|, P(A \mid B) = |A \cap B| / |B|.
  if ((node.k === 'apply' && node.name === 'P' && node.args.length === 1 && !node.primes && !ctx.isFunction('P')) || node.k === 'prob') {
    const event = node.k === 'prob' ? node.event : node.args[0]
    const a = setValue(event, ctx)
    if (!a) return null
    const omega = universe(ctx, 'la probabilità')
    if (a.some((e) => !has(omega, e))) throw new FiniteError("L'evento ha elementi che non sono in Ω")
    if (node.k === 'prob' && node.given) {
      const b = setValue(node.given, ctx)
      if (!b) return null
      if (!b.length) throw new FiniteError("La condizione è l'insieme vuoto")
      return { count: new Rational(BigInt(a.filter((e) => has(b, e)).length), BigInt(b.length)) }
    }
    if (!omega.length) throw new FiniteError('Ω è vuoto')
    return { count: new Rational(BigInt(a.length), BigInt(omega.length)) }
  }
  const set = setValue(node, ctx)
  if (!set) return null
  return { set: setNode(set), shown: { tex: setTex(set), text: setText(set) } }
}

/** L'insieme scritto che vale un'espressione (A \cup B), per tenerlo come definizione (C = A \cup B); null se è altro. */
export function finiteSetOf(node: MathNode, ctx: FiniteContext): MathNode | null {
  if (node.k === 'set') return null
  try {
    if (!involvesSets(node, ctx)) return null
    const set = setValue(node, ctx)
    return set && setNode(set)
  } catch {
    return null
  }
}
