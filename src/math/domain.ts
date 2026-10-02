/**
 * I domini degli integrali doppi e tripli (\iint_D f \, dx \, dy) e delle zone dei grafici: un
 * insieme ({(x, y) : x^2 + y^2 \le 1}), delle disuguaglianze (0 \le y \le x), un rettangolo
 * ([0, 1] \times [0, 2]) o il nome di un insieme definito prima. Un dominio diventa un «margine»:
 * un numero positivo dentro e negativo fuori (per y > x^2 è y − x^2; con più condizioni il più
 * piccolo, con «o» il più grande).
 *
 * Si integra una variabile alla volta, dentro la scatola che contiene il dominio; per l'ultima si
 * cercano gli intervalli dove si è dentro (dove il margine cambia segno, dimezzando) e lì si
 * integra la funzione, che così non ha salti.
 */
import { bound, compile, integrate, MathError, scopeWith, spend, type Compiled, type CompileOptions, type Scope, type Vars } from './evaluate'
import { namesIn, type MathNode } from './parse'

export interface Domain {
  /** Le variabili del dominio, nell'ordine: x e y (o x, y e z, o quelle scritte nell'insieme). */
  vars: string[]
  /** Positivo dentro il dominio, negativo fuori, NaN dove le condizioni non si calcolano. */
  margin: Compiled
  /**
   * Le condizioni una per una (il margine è il più piccolo), se il dominio le vuole tutte insieme
   * (senza «o»): servono a disegnare i solidi con gli spigoli netti. Null se c'è un «o».
   */
  parts: Compiled[] | null
  /** Per ogni condizione di `parts`, se è stretta (< e >): il suo bordo è tratteggiato. */
  strictParts: boolean[] | null
  /** Gli intervalli, se è un rettangolo (o un parallelepipedo): lì non serve cercare i bordi. */
  box: [number, number][] | null
  /** Tutte le disuguaglianze sono strette (< e >): il bordo non è del dominio (nei grafici è tratteggiato). */
  strict: boolean
  /** Le variabili una dentro l'altra, se il dominio è scritto così (vedi Layers): null se no. */
  layers: Layers | null
}

/**
 * Un dominio «normale»: le variabili da fuori a dentro, ognuna tra due estremi che usano solo
 * quelle prima (0 \le x \le 1, x^2 \le y \le x, o gli estremi di \int \int). Serve a disegnare
 * i solidi faccia per faccia. Dove l'estremo di sopra è più piccolo di quello di sotto il dominio
 * è vuoto: `hi` lì vale come `lo`.
 */
export interface Layers {
  vars: string[]
  lo: Compiled[]
  hi: Compiled[]
}

interface Margin {
  margin: Compiled
  strict: boolean
  /** Le condizioni una per una, se valgono tutte insieme (vedi Domain.parts). */
  parts: Compiled[] | null
  /** Quali di quelle sono strette. */
  strictParts: boolean[] | null
}

/** Il minimo (o il massimo) dei margini: dentro tutte le condizioni (o almeno una). */
function combine(parts: Margin[], pick: 'min' | 'max'): Margin {
  const fs = parts.map((p) => p.margin)
  const strict = parts.every((p) => p.strict)
  if (fs.length === 1) return parts[0]
  const together = pick === 'min' && parts.every((p) => p.parts)
  return {
    strict,
    parts: together ? parts.flatMap((p) => p.parts!) : null,
    strictParts: together ? parts.flatMap((p) => p.strictParts!) : null,
    margin:
      pick === 'min'
        ? (v) => {
            let m = Infinity
            for (const f of fs) m = Math.min(m, f(v))
            return m
          }
        : (v) => {
            let m = -Infinity
            for (const f of fs) m = Math.max(m, f(v))
            return m
          },
  }
}

/**
 * Come si calcolano i due lati di una disuguaglianza: di solito con i numeri reali; nel piano di
 * Gauss con i numeri complessi (|z - 1| \le 2), vedi src/graph/gauss.ts.
 */
export type SideCompiler = (node: MathNode) => Compiled

/** Il margine di una condizione: per a ≤ b è b − a, per una catena a < b < c il più piccolo dei due. */
function marginOf(node: MathNode, scope: Scope, options: CompileOptions, side?: SideCompiler): Margin {
  const sideOf = (n: MathNode, s: Scope) => (side ? side(n) : bound(n, s, options))
  switch (node.k) {
    case 'rel': {
      if (node.ops.some((op) => op === '=' || op === '≈')) throw new MathError('Con «=» il dominio è una curva, senza area: usa ≤ o ≥')
      const items = node.items.map((n) => sideOf(n, scope))
      const parts: Margin[] = node.ops.map((op, i) => {
        const a = items[i]
        const b = items[i + 1]
        if (op === '!=') return { strict: true, margin: (v: Vars) => Math.abs(b(v) - a(v)), parts: null, strictParts: null }
        const below = op === '<' || op === '<='
        const margin: Compiled = below ? (v) => b(v) - a(v) : (v) => a(v) - b(v)
        const strict = op === '<' || op === '>'
        return { strict, margin, parts: [margin], strictParts: [strict] }
      })
      return combine(parts, 'min')
    }
    case 'in': {
      const a = side ? side(node.a) : compile(node.a, scope, options)
      const lo = sideOf(node.lo, scope)
      const hi = sideOf(node.hi, scope)
      const above: Compiled = (v) => a(v) - lo(v)
      const below: Compiled = (v) => hi(v) - a(v)
      return { strict: node.loOpen && node.hiOpen, margin: (v) => Math.min(above(v), below(v)), parts: [above, below], strictParts: [node.loOpen, node.hiOpen] }
    }
    case 'and':
      return combine(
        node.items.map((n) => marginOf(n, scope, options, side)),
        'min',
      )
    case 'or':
      return combine(
        node.items.map((n) => marginOf(n, scope, options, side)),
        'max',
      )
    case 'set':
      return marginOf(node.cond, node.vars ? scopeWith(scope, node.vars) : scope, options, side)
    case 'name': {
      const set = scope.sets?.get(node.name)
      if (set) return marginOf(set, scope, options, side)
      break
    }
  }
  throw new MathError('Qui va un dominio: un insieme o delle disuguaglianze, es. x^2 + y^2 \\le 1')
}

/** Il valore di un estremo di un rettangolo (2, \pi, a). */
function constantOf(node: MathNode, scope: Scope): number {
  const v = bound(node, scope)({})
  if (Number.isNaN(v)) throw new MathError('Gli estremi del rettangolo non sono numeri')
  return v
}

/** [0, 1] \times [0, 2], [0, 1]^2: gli intervalli di un rettangolo (o di un parallelepipedo). */
function rectangleOf(node: MathNode, scope: Scope): [number, number][] | null {
  if (node.k === 'tuple' && node.items.length === 2) return [[constantOf(node.items[0], scope), constantOf(node.items[1], scope)]]
  if (node.k === 'bin' && node.op === '*') {
    const a = rectangleOf(node.a, scope)
    const b = a && rectangleOf(node.b, scope)
    return a && b ? [...a, ...b] : null
  }
  if (node.k === 'bin' && node.op === '^') {
    const side = rectangleOf(node.a, scope)
    const n = side?.length === 1 ? constantOf(node.b, scope) : NaN
    if (side && (n === 2 || n === 3)) return Array.from({ length: n }, () => side[0])
  }
  return null
}

/** Il nome di un insieme, fino alla sua definizione (D, o E definito come D). */
function resolve(node: MathNode, scope: Scope): MathNode {
  for (let n = node, depth = 0; depth < 20; depth++) {
    if (n.k !== 'name') return n
    const set = scope.sets?.get(n.name)
    if (!set) return n
    n = set
  }
  throw new MathError('L\'insieme è definito con sé stesso')
}

/** Le condizioni del dominio una per una (con gli «e», gli insiemi e i loro nomi aperti), o null se c'è altro (un «o»). */
function conditionsOf(node: MathNode, scope: Scope, depth = 0): MathNode[] | null {
  const n = resolve(node, scope)
  if (depth > 20) return null
  if (n.k === 'rel' || n.k === 'in') return [n]
  if (n.k === 'set') return conditionsOf(n.cond, scope, depth + 1)
  if (n.k !== 'and') return null
  const out: MathNode[] = []
  for (const item of n.items) {
    const c = conditionsOf(item, scope, depth + 1)
    if (!c) return null
    out.push(...c)
  }
  return out
}

/** Tutti gli ordini delle variabili, cominciando da quello scritto. */
function orders(names: string[]): string[][] {
  if (names.length <= 1) return [names]
  return names.flatMap((first, i) => orders(names.filter((_, j) => j !== i)).map((rest) => [first, ...rest]))
}

/**
 * Il dominio come variabili una dentro l'altra (vedi Layers), se ogni condizione è una catena
 * con una variabile da sola (a \le x \le b, x \in [a, b], y \ge x^2) e c'è un ordine in cui ogni
 * variabile ha un estremo sotto e uno sopra che usano solo quelle prima. Null se no.
 */
function layersOf(node: MathNode, scope: Scope, names: string[], options: CompileOptions): Layers | null {
  const conditions = conditionsOf(node, scope)
  if (!conditions) return null
  // Ogni disuguaglianza come «piccolo ≤ grande».
  const pairs: [MathNode, MathNode][] = []
  for (const c of conditions) {
    if (c.k === 'in') pairs.push([c.lo, c.a], [c.a, c.hi])
    else if (c.k === 'rel') {
      for (let i = 0; i < c.ops.length; i++) {
        const op = c.ops[i]
        if (op === '<' || op === '<=') pairs.push([c.items[i], c.items[i + 1]])
        else if (op === '>' || op === '>=') pairs.push([c.items[i + 1], c.items[i]])
        else return null
      }
    }
  }
  const variable = (n: MathNode) => (n.k === 'name' && names.includes(n.name) ? n.name : null)
  const inner = scopeWith(scope, names)
  for (const order of orders(names)) {
    const before = (name: string, n: MathNode) => {
      const uses = namesIn(n)
      const k = order.indexOf(name)
      return order.every((other, j) => j < k || !uses.has(other))
    }
    const lows = new Map<string, MathNode[]>(order.map((n) => [n, []]))
    const highs = new Map<string, MathNode[]>(order.map((n) => [n, []]))
    let ok = true
    for (const [small, big] of pairs) {
      const up = variable(big)
      const down = variable(small)
      if (up && before(up, small)) lows.get(up)!.push(small)
      else if (down && before(down, big)) highs.get(down)!.push(big)
      else {
        ok = false
        break
      }
    }
    if (!ok || order.some((n) => !lows.get(n)!.length || !highs.get(n)!.length)) continue
    const pick = (list: MathNode[], which: 'max' | 'min'): Compiled => {
      const fs = list.map((n) => bound(n, inner, options))
      if (fs.length === 1) return fs[0]
      return which === 'max' ? (v) => Math.max(...fs.map((f) => f(v))) : (v) => Math.min(...fs.map((f) => f(v)))
    }
    const lo = order.map((n) => pick(lows.get(n)!, 'max'))
    const hi = order.map((n, i) => {
      const top = pick(highs.get(n)!, 'min')
      return (v: Vars) => Math.max(lo[i](v), top(v))
    })
    return { vars: order, lo, hi }
  }
  return null
}

/** Le variabili x, y, z che la condizione usa, nell'ordine. */
function axesIn(node: MathNode, scope: Scope): string[] {
  const names = namesIn(node)
  return ['x', 'y', 'z'].filter((a) => names.has(a) && !scope.consts.has(a))
}

/**
 * Il dominio scritto in `node`. `vars`: le variabili che l'integrale dice (dx dy, dV), che valgono
 * se l'insieme non dice le sue; se neanche quelle, x, y (e z se c'è). `side`: come calcolare i lati
 * delle disuguaglianze, se non con i numeri reali (allora le variabili sono `vars`).
 */
export function compileDomain(node: MathNode, scope: Scope, vars: string[] | null, options: CompileOptions = {}, side?: SideCompiler): Domain {
  const target = resolve(node, scope)
  if (side) {
    const names = vars ?? ['x', 'y']
    const { margin, strict, parts, strictParts } = marginOf(target, scope, options, side)
    return { vars: names, margin, box: null, strict, parts, strictParts, layers: null }
  }
  const rectangle = rectangleOf(target, scope)
  if (rectangle) {
    const names = vars ?? ['x', 'y', 'z'].slice(0, rectangle.length)
    if (names.length !== rectangle.length) throw new MathError(`Il rettangolo ha ${rectangle.length} lati, l'integrale ${names.length} variabili`)
    const at = names.map((n) => n)
    const parts: Compiled[] = rectangle.flatMap(([lo, hi], i) => [(v: Vars) => v[at[i]] - lo, (v: Vars) => hi - v[at[i]]])
    return {
      vars: names,
      box: rectangle,
      strict: false,
      parts,
      strictParts: parts.map(() => false),
      layers: { vars: names, lo: rectangle.map(([lo]) => () => lo), hi: rectangle.map(([lo, hi]) => () => Math.max(lo, hi)) },
      margin: (v) => {
        let m = Infinity
        rectangle.forEach(([lo, hi], i) => (m = Math.min(m, v[at[i]] - lo, hi - v[at[i]])))
        return m
      },
    }
  }
  const own = target.k === 'set' ? target.vars : null
  const names = own ?? vars ?? axesIn(target, scope)
  if (vars && own && own.length !== vars.length) throw new MathError(`L'insieme ha ${own.length} variabili, l'integrale ${vars.length}`)
  if (names.length < 1) throw new MathError('Nel dominio mancano le variabili, es. x^2 + y^2 \\le 1')
  const { margin, strict, parts, strictParts } = marginOf(target, scopeWith(scope, names), options)
  return { vars: names, margin, box: null, strict, parts, strictParts, layers: layersOf(target, scope, names, options) }
}

/**
 * Le parti di [lo, hi] dove g ≥ 0: si guarda in 40 punti e si cerca ogni bordo dimezzando. Una
 * parte più corta della distanza tra due punti (vicino a un vertice del dominio) si trova lo stesso:
 * si cerca il punto dove g è più grande e, se è dentro, i bordi attorno a lui.
 */
export function insideIntervals(g: (t: number) => number, lo: number, hi: number, samples = 40): [number, number][] {
  if (!spend(samples)) return []
  const inside = (m: number) => m >= 0
  const ts: number[] = []
  const values: number[] = []
  for (let i = 0; i <= samples; i++) {
    const t = lo + ((hi - lo) * i) / samples
    ts.push(t)
    values.push(g(t))
  }
  const edge = (a: number, b: number, inA: boolean) => {
    for (let k = 0; k < 46; k++) {
      const m = (a + b) / 2
      if (m === a || m === b) break
      if (inside(g(m)) === inA) a = m
      else b = m
    }
    return (a + b) / 2
  }
  const out: [number, number][] = []
  let start: number | null = inside(values[0]) ? lo : null
  for (let i = 1; i <= samples; i++) {
    if (inside(values[i]) === inside(values[i - 1])) continue
    const t = edge(ts[i - 1], ts[i], inside(values[i - 1]))
    if (inside(values[i])) start = t
    else if (start !== null) {
      out.push([start, t])
      start = null
    }
  }
  if (start !== null) out.push([start, hi])
  // Il punto più dentro: se nessuna parte trovata lo contiene, la parte attorno a lui.
  const best = bestAlong(g, lo, hi, samples, values)
  if (inside(best.m) && !out.some(([a, b]) => best.t >= a && best.t <= b)) {
    const step = (hi - lo) / samples
    const left = Math.max(lo, best.t - step)
    const right = Math.min(hi, best.t + step)
    const a = inside(g(left)) ? left : edge(best.t, left, true)
    const b = inside(g(right)) ? right : edge(best.t, right, true)
    out.push([a, b])
    out.sort((p, q) => p[0] - q[0])
  }
  return out
}

/**
 * Il punto di [lo, hi] dove g è più grande: il migliore tra `samples` punti (i valori, se già
 * calcolati, in `values`), poi la sezione aurea attorno a lui.
 */
function bestAlong(g: (t: number) => number, lo: number, hi: number, samples: number, values?: number[]): { t: number; m: number } {
  let t = lo
  let m = -Infinity
  const h = (hi - lo) / samples
  for (let i = 0; i <= samples; i++) {
    const u = lo + h * i
    const value = values ? values[i] : g(u)
    if (value > m) {
      m = value
      t = u
    }
  }
  let a = Math.max(lo, t - h)
  let b = Math.min(hi, t + h)
  const r = (Math.sqrt(5) - 1) / 2
  let c = b - r * (b - a)
  let d = a + r * (b - a)
  let mc = g(c)
  let md = g(d)
  for (let k = 0; k < 30; k++) {
    if (!(mc <= md)) {
      b = d
      d = c
      md = mc
      c = b - r * (b - a)
      mc = g(c)
    } else {
      a = c
      c = d
      mc = md
      d = a + r * (b - a)
      md = g(d)
    }
  }
  for (const [u, value] of [[c, mc], [d, md]]) {
    if (value > m) {
      m = value
      t = u
    }
  }
  return { t, m }
}

/**
 * La scatola che contiene il dominio (null se non è limitato, [] se è vuoto): si guarda dove il
 * margine è positivo su una griglia, prima vicino all'origine e poi più in là.
 */
export function boundingBox(domain: Domain, v: Vars): [number, number][] | null {
  if (domain.box) return domain.box
  const n = domain.vars.length
  const scan = (R: number) => {
    const steps = n === 1 ? 400 : n === 2 ? 80 : 30
    const h = (2 * R) / steps
    const lo = Array<number>(n).fill(Infinity)
    const hi = Array<number>(n).fill(-Infinity)
    const index = Array<number>(n).fill(0)
    let found = false
    const total = (steps + 1) ** n
    if (!spend(total)) return null
    for (let k = 0; k < total; k++) {
      let rest = k
      for (let i = 0; i < n; i++) {
        index[i] = rest % (steps + 1)
        rest = Math.floor(rest / (steps + 1))
        v[domain.vars[i]] = -R + index[i] * h
      }
      if (!(domain.margin(v) >= 0)) continue
      found = true
      for (let i = 0; i < n; i++) {
        const c = -R + index[i] * h
        if (c < lo[i]) lo[i] = c
        if (c > hi[i]) hi[i] = c
      }
    }
    if (!found) return null
    const touches = lo.some((c) => c <= -R + h / 2) || hi.some((c) => c >= R - h / 2)
    return { box: lo.map((c, i) => [c - h, hi[i] + h] as [number, number]), touches }
  }
  let found = scan(10) ?? scan(1)
  if (!found) return []
  if (found.touches) {
    found = scan(100)
    if (!found || found.touches) return null
  }
  return found.box
}

/** Quanto bastano precisi gli integrali: quelli di fuori un po' meno di quello dell'ultima variabile. */
const TOLERANCE = [1e-10, 1e-10, 1e-11]

/**
 * L'integrale di g da a a b con x = a + (b − a)(1 − cos θ)/2: vicino ai bordi i punti si fanno
 * più fitti, e una funzione che lì va a zero come una radice (la lunghezza di una corda di un
 * cerchio) diventa liscia, così l'integrale converge subito.
 */
function integrateEdges(g: (x: number) => number, a: number, b: number, tolerance: number): number {
  const half = (b - a) / 2
  return integrate((theta) => g(a + half * (1 - Math.cos(theta))) * half * Math.sin(theta), 0, Math.PI, tolerance)
}

/** L'integrale di f sul dominio (con le altre variabili in `v`): NaN se il dominio non è limitato. */
export function integrateDomain(domain: Domain, f: Compiled, v: Vars): number {
  const box = boundingBox(domain, v)
  if (!box) return NaN
  if (!box.length) return 0
  const { vars, margin } = domain
  const n = vars.length
  /** Il margine più grande sulle variabili da `k` in poi, con quelle prima fissate in v: positivo se lì c'è il dominio. */
  const reach = (k: number): number => {
    if (k === n) return margin(v)
    const name = vars[k]
    const [lo, hi] = box[k]
    if (k === n - 1) {
      return bestAlong(
        (t) => {
          v[name] = t
          return margin(v)
        },
        lo,
        hi,
        24,
      ).m
    }
    // Due variabili (la y e la z per una x): per ognuna di poche y il meglio sulla z, e si stringe sulla y.
    return bestAlong(
      (t) => {
        v[name] = t
        return reach(k + 1)
      },
      lo,
      hi,
      12,
    ).m
  }
  const level = (k: number): number => {
    const name = vars[k]
    const [lo, hi] = box[k]
    const value = (t: number) => {
      v[name] = t
      return k < n - 1 ? level(k + 1) : f(v)
    }
    if (domain.box) return integrate(value, lo, hi, TOLERANCE[k + 3 - n])
    // Solo dove c'è il dominio per questa variabile (con quelle prima fissate): lì la funzione non salta.
    let total = 0
    const inside = (t: number) => {
      v[name] = t
      return reach(k + 1)
    }
    for (const [a, b] of insideIntervals(inside, lo, hi)) total += integrateEdges(value, a, b, TOLERANCE[k + 3 - n])
    return total
  }
  return level(0)
}

/** \iint_D f \, dx \, dy e \iiint_E f \, dV: il dominio e la funzione, calcolati con le altre variabili. */
export function compileMultiple(node: Extract<MathNode, { k: 'mint' }>, scope: Scope, options: CompileOptions): Compiled {
  const domain = compileDomain(node.domain, scope, node.vars, options)
  if (domain.vars.length !== node.vars.length) throw new MathError(`Il dominio ha ${domain.vars.length} variabili, l'integrale ${node.vars.length}`)
  // Le variabili dell'integrale sono quelle del dominio, anche se si chiamano diversamente (dA in un insieme di u e v).
  const rename = new Map(node.vars.map((name, i) => [name, domain.vars[i]]))
  const body = compile(renameVars(node.body, rename), scopeWith(scope, domain.vars), options)
  return (v) => integrateDomain(domain, body, { ...v })
}

/** Il corpo con le variabili rinominate (x → u), se l'integrale e l'insieme le chiamano in modo diverso. */
export function renameVars(node: MathNode, rename: ReadonlyMap<string, string>): MathNode {
  if ([...rename].every(([a, b]) => a === b)) return node
  return JSON.parse(JSON.stringify(node), (_key, value: unknown) => {
    const n = value as MathNode | null
    if (n && typeof n === 'object' && (n.k === 'name' || n.k === 'apply') && rename.has(n.name)) return { ...n, name: rename.get(n.name) }
    return value
  }) as MathNode
}
