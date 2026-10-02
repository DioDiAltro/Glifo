/**
 * Le equazioni differenziali ordinarie: y' = f(x, y), y'' = f(x, y, y'), … e anche scritte in un
 * altro modo (y'' + 2y' + 5y = 0, y' + y = x), se la derivata più alta compare al primo grado. Si
 * risolvono con i numeri (Runge–Kutta del quarto ordine) dalle condizioni iniziali y(x₀), y'(x₀), …
 */
import { compile, MathError, scopeWith, type Scope } from './evaluate'
import { namesIn, type MathNode } from './parse'

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

/** L'equazione differenziale della riga (y'' = -y, y' + y = x); null se è altro. */
export function odeOf(main: MathNode): Ode | null {
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
  const x = y === 'x' || (names.has('t') && !names.has('x')) ? 't' : 'x'
  if (x === y) return null
  const top = primed(y, order)
  if (lhs.k === 'name' && lhs.name === top && !namesIn(rhs).has(top)) return { y, x, order, f: rhs, explicit: true }
  return { y, x, order, f: { k: 'bin', op: '-', a: lhs, b: rhs }, explicit: false }
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
