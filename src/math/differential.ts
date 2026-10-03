/**
 * Le equazioni differenziali ordinarie: y' = f(x, y), y'' = f(x, y, y'), … e anche scritte in un
 * altro modo (y'' + 2y' + 5y = 0, y' + y = x), se la derivata più alta compare al primo grado. Si
 * risolvono con i numeri (Runge–Kutta del quarto ordine) dalle condizioni iniziali y(x₀), y'(x₀), …
 */
import { compile, MathError, scopeWith, type Scope } from './evaluate'
import { children, namesIn, type MathNode } from './parse'
import { mapNode } from './symbolic'

export interface Ode {
  /** La funzione cercata (y) e la variabile (x, o t se c'è solo la t o se la funzione è x). */
  y: string
  x: string
  /** L'ordine: 1 per y', 2 per y''. */
  order: number
  /** y^{(n)} = f (`explicit`), o tutta l'equazione portata a sinistra (F = 0). */
  f: MathNode
  explicit: boolean
}

/** y con k apici: y, y', y''. */
export const primed = (y: string, k: number): string => y + "'".repeat(k)

/** Il punto sopra (ẋ) e i due punti (ẍ): le derivate rispetto al tempo. */
const DOT = String.fromCharCode(0x307)
const DDOT = String.fromCharCode(0x308)

/**
 * Le derivate scritte in un altro modo (\frac{dy}{dx}, \frac{d^2y}{dx^2}, ẋ, ẍ) come nomi con gli apici
 * (y', y''), e la variabile se si capisce da come sono scritte (dy/dt: t; ẋ: t). Le funzioni della nota
 * (`isDefined`) restano derivate. Con `applied` anche y'(x) e y(x) diventano y' e y.
 */
export function withPrimes(node: MathNode, isDefined: (name: string) => boolean = () => false, applied = false): { node: MathNode; x: string | null } {
  const letters = new Set<string>()
  let x: string | null = null
  const letter = (name: string) => /^[A-Za-z]$/.test(name) && !isDefined(name)
  const visit = (n: MathNode): void => {
    if (n.k === 'name') {
      const m = /^([A-Za-z])('+)$/.exec(n.name)
      if (m && letter(m[1])) letters.add(m[1])
      if (n.name.length === 2 && (n.name[1] === DOT || n.name[1] === DDOT) && letter(n.name[0])) {
        letters.add(n.name[0])
        x ??= 't'
      }
    } else if (n.k === 'diff' && !n.partial && n.body.k === 'name' && letter(n.body.name) && n.vars.every((v) => v === n.vars[0])) {
      letters.add(n.body.name)
      x ??= n.vars[0]
    } else if (applied && n.k === 'apply' && n.primes > 0 && letter(n.name)) letters.add(n.name)
    children(n).forEach(visit)
  }
  visit(node)
  if (!letters.size) return { node, x }
  // y'(x) + y(x) = 0: la variabile è quella tra parentesi.
  const args = (n: MathNode): void => {
    if (n.k === 'apply' && letters.has(n.name) && n.args.length === 1 && n.args[0].k === 'name' && !letters.has(n.args[0].name)) x ??= n.args[0].name
    children(n).forEach(args)
  }
  if (applied && !x) args(node)
  const rewrite = (n: MathNode): MathNode => {
    if (n.k === 'name' && n.name.length === 2 && letters.has(n.name[0])) {
      if (n.name[1] === DOT) return { k: 'name', name: primed(n.name[0], 1) }
      if (n.name[1] === DDOT) return { k: 'name', name: primed(n.name[0], 2) }
    }
    if (n.k === 'diff' && !n.partial && n.body.k === 'name' && letters.has(n.body.name) && n.vars.every((v) => v === n.vars[0])) return { k: 'name', name: primed(n.body.name, n.vars.length) }
    if (applied && x && n.k === 'apply' && letters.has(n.name) && n.args.length === 1 && n.args[0].k === 'name' && n.args[0].name === x) return { k: 'name', name: primed(n.name, n.primes) }
    return mapNode(n, rewrite)
  }
  return { node: rewrite(node), x }
}

/** L'equazione differenziale della riga (y'' = -y, y' + y = x, \frac{dy}{dx} = x y); null se è altro. */
export function odeOf(written: MathNode, isDefined?: (name: string) => boolean): Ode | null {
  const { node: main, x: variable } = withPrimes(written, isDefined)
  if (main.k !== 'rel' || main.ops.length !== 1 || main.ops[0] !== '=') return null
  const [lhs, rhs] = main.items
  // A' = (1, 2) è un punto, non un'equazione.
  if (lhs.k === 'tuple' || rhs.k === 'tuple' || rhs.k === 'matrix') return null
  const names = namesIn(main)
  let y: string | null = null
  let order = 0
  for (const n of names) {
    const m = /^([A-Za-z])('+)$/.exec(n)
    if (!m) continue
    // Due funzioni diverse (x' = y, y' = -x) sarebbero un sistema.
    if (y && m[1] !== y) return null
    y = m[1]
    order = Math.max(order, m[2].length)
  }
  if (!y) return null
  // x'' = -x: la variabile è il tempo t.
  const x = variable ?? (y === 'x' || (names.has('t') && !names.has('x')) ? 't' : 'x')
  if (x === y) return null
  const top = primed(y, order)
  if (lhs.k === 'name' && lhs.name === top && !namesIn(rhs).has(top)) return { y, x, order, f: rhs, explicit: true }
  return { y, x, order, f: { k: 'bin', op: '-', a: lhs, b: rhs }, explicit: false }
}

/** Un sistema di due equazioni del primo ordine (x' = y, y' = −x), con le condizioni (x(0) = 1, y(0) = 0). */
export interface OdeSystem {
  /** Le due funzioni cercate (x e y: gli assi del piano delle fasi) e la variabile (t). */
  names: [string, string]
  t: string
  /** Le derivate: x' = f[0], y' = f[1]. */
  f: [MathNode, MathNode]
  conds: MathNode[]
}

/**
 * Il sistema di una riga (x' = y, \; y' = -x, anche in \begin{cases}) con le sue condizioni; null se è
 * altro. Con x e y, la x va sull'asse orizzontale.
 */
export function systemOf(main: MathNode, cond: MathNode | null, isDefined?: (name: string) => boolean): OdeSystem | null {
  const all = [main, ...(cond ? (cond.k === 'and' ? cond.items : [cond]) : [])]
    .flatMap((n) => (n.k === 'cases' && n.rows.every((r) => !r.cond) ? n.rows.map((r) => r.value) : [n]))
    .map((n) => withPrimes(n, isDefined).node)
  const eqs: { u: string; f: MathNode }[] = []
  const conds: MathNode[] = []
  for (const n of all) {
    if (n.k !== 'rel' || n.ops.length !== 1 || n.ops[0] !== '=') return null
    const [lhs, rhs] = n.items
    const m = lhs.k === 'name' ? /^([A-Za-z])'$/.exec(lhs.name) : null
    if (m && ![...namesIn(rhs)].some((name) => name.includes("'"))) eqs.push({ u: m[1], f: rhs })
    else if (lhs.k === 'apply' && lhs.args.length === 1 && !lhs.primes) conds.push(n)
    else return null
  }
  if (eqs.length !== 2 || eqs[0].u === eqs[1].u) return null
  if (eqs[0].u === 'y' && eqs[1].u === 'x') eqs.reverse()
  const names: [string, string] = [eqs[0].u, eqs[1].u]
  if (conds.some((c) => !names.includes(((c as Extract<MathNode, { k: 'rel' }>).items[0] as Extract<MathNode, { k: 'apply' }>).name))) return null
  return { names, t: names.includes('t') ? 's' : 't', f: [eqs[0].f, eqs[1].f], conds }
}

/** I punti di partenza delle traiettorie: x(0) = 1, y(0) = 0 (anche più coppie una dopo l'altra). */
export function systemStarts(system: OdeSystem, value: (n: MathNode) => number): [number, number][] {
  const out: [number, number][] = []
  let current: (number | undefined)[] = [undefined, undefined]
  for (const c of system.conds as Extract<MathNode, { k: 'rel' }>[]) {
    const i = system.names.indexOf((c.items[0] as Extract<MathNode, { k: 'apply' }>).name)
    if (current[i] !== undefined) current = [undefined, undefined]
    current[i] = value(c.items[1])
    if (current.every((v) => v !== undefined)) {
      if (current.every((v) => Number.isFinite(v))) out.push(current as [number, number])
      current = [undefined, undefined]
    }
  }
  if (current.some((v) => v !== undefined)) throw new MathError(`Per ogni traiettoria servono tutte e due le condizioni, come ${system.names[0]}(0) = 1, \\; ${system.names[1]}(0) = 0`)
  return out
}

/** La derivata più alta in funzione di x e di Y = (y, y', …, y^{(n−1)}). */
export type OdeFunction = (x: number, Y: readonly number[]) => number

export function compileOde(ode: Ode, scope: Scope): OdeFunction {
  const names = Array.from({ length: ode.order + 1 }, (_, k) => primed(ode.y, k))
  const f = compile(ode.f, scopeWith(scope, [ode.x, ...names]), { calc: true })
  const v: Record<string, number> = {}
  const at = (x: number, Y: readonly number[]) => {
    v[ode.x] = x
    for (let k = 0; k < ode.order; k++) v[names[k]] = Y[k]
  }
  if (ode.explicit) return (x, Y) => (at(x, Y), f(v))
  // F = a y^{(n)} + b: la derivata più alta è −b/a.
  const top = names[ode.order]
  const parts = (x: number, Y: readonly number[]) => {
    at(x, Y)
    v[top] = 0
    const b = f(v)
    v[top] = 1
    return { a: f(v) - b, b }
  }
  // Al primo grado? Con 2 al posto di y^{(n)} deve venire 2a + b.
  for (const x of [0.3, 1.7, -0.6]) {
    const Y = names.slice(0, ode.order).map((_, k) => 0.4 + 0.3 * k - x / 5)
    const { a, b } = parts(x, Y)
    v[top] = 2
    const two = f(v)
    if ([a, b, two].every(Number.isFinite) && Math.abs(two - (2 * a + b)) > 1e-7 * Math.max(1, Math.abs(two))) {
      throw new MathError(`La derivata più alta deve comparire al primo grado: scrivi ${top} = …`)
    }
  }
  return (x, Y) => {
    const { a, b } = parts(x, Y)
    return -b / a
  }
}

/** Un passo di Runge–Kutta per Y' = (y', …, y^{(n−1)}, F(x, Y)). */
function step(F: OdeFunction, x: number, Y: readonly number[], h: number): number[] {
  const d = (t: number, Z: readonly number[]) => [...Z.slice(1), F(t, Z)]
  const k1 = d(x, Y)
  const k2 = d(x + h / 2, Y.map((y, i) => y + (h / 2) * k1[i]))
  const k3 = d(x + h / 2, Y.map((y, i) => y + (h / 2) * k2[i]))
  const k4 = d(x + h, Y.map((y, i) => y + h * k3[i]))
  return Y.map((y, i) => y + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]))
}

/**
 * La soluzione come funzione di x: i valori con il passo `h`, calcolati quando servono (avanti e
 * indietro da x0) e tenuti, così i grafici e gli integrali non rifanno i conti; in mezzo con le
 * derivate (Hermite). Dove la soluzione scappa all'infinito si ferma.
 */
export function odeSolution(F: OdeFunction, x0: number, Y0: readonly number[], h = 0.01): (x: number) => number {
  const sides = [1, -1].map((dir) => ({ dir, Ys: [[...Y0]], dead: false }))
  const slope = (x: number, Y: readonly number[]) => (Y.length > 1 ? Y[1] : F(x, Y))
  return (x) => {
    if (!Number.isFinite(x)) return NaN
    const side = x >= x0 ? sides[0] : sides[1]
    const k = Math.abs(x - x0) / h
    const i = Math.floor(k)
    while (side.Ys.length <= i + 1 && !side.dead && side.Ys.length < 200000) {
      const n = side.Ys.length - 1
      const next = step(F, x0 + side.dir * h * n, side.Ys[n], side.dir * h)
      if (!next.every(Number.isFinite) || Math.abs(next[0]) > 1e12) side.dead = true
      else side.Ys.push(next)
    }
    if (i + 1 >= side.Ys.length) return i < side.Ys.length && k === i ? side.Ys[i][0] : NaN
    const H = side.dir * h
    const [xa, xb] = [x0 + H * i, x0 + H * (i + 1)]
    const [A, B] = [side.Ys[i], side.Ys[i + 1]]
    const t = k - i
    const t2 = t * t
    const t3 = t2 * t
    return (2 * t3 - 3 * t2 + 1) * A[0] + (t3 - 2 * t2 + t) * H * slope(xa, A) + (-2 * t3 + 3 * t2) * B[0] + (t3 - t2) * H * slope(xb, B)
  }
}

/**
 * Le condizioni iniziali (y(0) = 1, y'(0) = 0, anche più gruppi uno dopo l'altro): per ogni gruppo
 * il punto x₀ e i valori di y, y', … fino all'ordine meno uno. `value` calcola un'espressione.
 */
export function initialConditions(conds: readonly MathNode[], ode: Ode, value: (n: MathNode) => number): { x0: number; Y0: number[]; conds: MathNode[] }[] {
  const example = ode.order === 1 ? `${ode.y}(0) = 1` : `${ode.y}(0) = 1, \\; ${ode.y}'(0) = 0`
  const groups: { x0: number; Y0: number[]; conds: MathNode[] }[] = []
  let current: { x0: number; Y0: (number | undefined)[]; conds: MathNode[] } | null = null
  for (const c of conds) {
    const at = c.k === 'rel' && c.ops.length === 1 && c.ops[0] === '=' ? c.items[0] : null
    if (!at || at.k !== 'apply' || at.name !== ode.y || at.args.length !== 1 || at.primes >= ode.order) {
      throw new MathError(`Dopo l'equazione vanno le condizioni iniziali, come ${example}`)
    }
    const x0 = value(at.args[0])
    const y0 = value((c as Extract<MathNode, { k: 'rel' }>).items[1])
    if (!Number.isFinite(x0) || !Number.isFinite(y0)) throw new MathError('Le condizioni iniziali sono numeri')
    if (!current || current.Y0[at.primes] !== undefined) {
      current = { x0, Y0: Array(ode.order).fill(undefined), conds: [] }
      groups.push(current as { x0: number; Y0: number[]; conds: MathNode[] })
    }
    if (current.x0 !== x0) throw new MathError(`Le condizioni iniziali vanno date nello stesso punto: ${example}`)
    current.Y0[at.primes] = y0
    current.conds.push(c)
  }
  for (const g of groups) {
    if (g.Y0.some((v) => v === undefined)) throw new MathError(`Servono ${ode.order} condizioni iniziali, come ${example}`)
  }
  return groups
}
