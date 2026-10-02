/**
 * Gli integrali di linea e di superficie, con i numeri: sulla curva γ(t) = (…), t ∈ [a, b] o sulla
 * superficie S(u, v) = (…), u ∈ [a, b], v ∈ [c, d] definite nella nota, di una funzione (ds, dS) o di
 * un campo (il lavoro F · dr e il flusso F · n dS, con il verso dato dai parametri).
 */
import { compile, integrate, MathError, scopeWith, type Compiled, type CompileOptions, type Scope, type VectorFunction } from './evaluate'
import type { MathNode } from './parse'

const COORDS = ['x', 'y', 'z']

/** La curva o la superficie con quel nome (anche \vec{r} per r), con i suoi intervalli. */
function shape(scope: Scope, name: string, params: number): VectorFunction {
  const what = params === 1 ? 'curva' : 'superficie'
  const example = params === 1 ? '\\gamma(t) = (\\cos t, \\sin t), \\; t \\in [0, 2\\pi]' : 'S(u, v) = (u, v, u v), \\; u \\in [0, 1], \\; v \\in [0, 1]'
  const f = scope.vfns?.get(name) ?? scope.vfns?.get(name.replace(/⃗/g, ''))
  if (!f) throw new MathError(`${name} non è una ${what}: scrivila prima nella nota, come ${example}`)
  if (f.params.length !== params) throw new MathError(`${name} non è una ${what}: ${params === 1 ? 'ha un parametro' : 'ha due parametri'}, come ${example}`)
  const missing = f.params.find((_, i) => !f.domain[i])
  if (missing) throw new MathError(`Manca dove varia ${missing}: scrivilo dopo ${name}, come ${missing} \\in [0, 1]`)
  return f
}

function dimension(f: VectorFunction, args: number[]): number {
  const n = f.call(args).length
  if (n !== 2 && n !== 3) throw new MathError('I punti hanno due o tre coordinate')
  return n
}

/** I valori di un campo da calcolare nei punti della curva o della superficie. */
function fieldOn(body: MathNode, scope: Scope, dims: number, options: CompileOptions): (p: number[]) => number[] {
  const name = body.k === 'name' || (body.k === 'apply' && !body.primes) ? body.name : null
  const field = name ? (scope.vfns?.get(name) ?? scope.vfns?.get(name.replace(/⃗/g, ''))) : undefined
  if (field) {
    const order = argumentOrder(field.params, dims)
    return (p) => field.call(order.map((i) => p[i]))
  }
  if (body.k === 'tuple') {
    const inner = scopeWith(scope, COORDS.slice(0, dims))
    const parts = body.items.map((c) => compile(c, inner, options))
    return (p) => {
      const v = { x: p[0], y: p[1], z: p[2] ?? 0 }
      return parts.map((c) => c(v))
    }
  }
  throw new MathError('Qui va un campo di vettori: F (definito come F(x, y) = (…)) o (P, Q)')
}

/** I valori di una funzione nei punti: f (definita con le sue variabili) o un'espressione in x, y, z. */
function scalarOn(body: MathNode, scope: Scope, dims: number, options: CompileOptions): (p: number[]) => number {
  const name = body.k === 'name' ? body.name : null
  const user = name && !scope.consts.has(name) ? scope.fns.get(name) : undefined
  if (user) {
    const order = argumentOrder(user.params, dims)
    return (p) => user.call(order.map((i) => p[i]))
  }
  const inner = scopeWith(scope, COORDS.slice(0, dims))
  const f = compile(body, inner, options)
  return (p) => f({ x: p[0], y: p[1], z: p[2] ?? 0 })
}

/** Quale coordinata va a ogni variabile: F(x, y, z) per nome, le altre nell'ordine. */
function argumentOrder(params: string[], dims: number): number[] {
  if (params.length > dims) throw new MathError(`Qui i punti hanno ${dims} coordinate, ma la funzione ne vuole ${params.length}`)
  const byName = params.map((p) => COORDS.indexOf(p))
  return byName.every((i) => i >= 0 && i < dims) ? byName : params.map((_, i) => i)
}

const dot = (a: number[], b: number[]) => a.reduce((s, x, i) => s + x * (b[i] ?? 0), 0)

/** ∫_γ f ds e ∫_γ F · dr. */
export function compileLineIntegral(node: Extract<MathNode, { k: 'lint' }>, scope: Scope, options: CompileOptions): Compiled {
  const curve = shape(scope, node.curve, 1)
  const [a, b] = curve.domain[0]!
  const dims = dimension(curve, [(a + b) / 2])
  const speed = curve.partials[0]
  if (node.ds) {
    const f = scalarOn(node.body, scope, dims, options)
    return () => integrate((t) => f(curve.call([t])) * Math.hypot(...speed([t])), a, b, 1e-10)
  }
  const F = fieldOn(node.body, scope, dims, options)
  return () => integrate((t) => dot(F(curve.call([t])), speed([t])), a, b, 1e-10)
}

/** ∬_S f dS e il flusso ∬_S F · n dS, con n = S_u × S_v. */
export function compileSurfaceIntegral(node: Extract<MathNode, { k: 'sint' }>, scope: Scope, options: CompileOptions): Compiled {
  const surface = shape(scope, node.surface, 2)
  const [[u0, u1], [v0, v1]] = surface.domain as [number, number][]
  const dims = dimension(surface, [(u0 + u1) / 2, (v0 + v1) / 2])
  if (dims !== 3) throw new MathError('Una superficie ha punti con tre coordinate')
  const [Su, Sv] = surface.partials
  const normal = (u: number, v: number): number[] => {
    const a = Su([u, v])
    const b = Sv([u, v])
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
  }
  let g: (u: number, v: number) => number
  if (node.dS) {
    const f = scalarOn(node.body, scope, 3, options)
    g = (u, v) => f(surface.call([u, v])) * Math.hypot(...normal(u, v))
  } else {
    const F = fieldOn(node.body, scope, 3, options)
    // Su una superficie chiusa (\oiint) il flusso è verso fuori, comunque siano messi i parametri.
    const sign = node.closed ? outward(surface, normal, [u0, u1], [v0, v1]) : 1
    g = (u, v) => sign * dot(F(surface.call([u, v])), normal(u, v))
  }
  return () => integrate((u) => integrate((v) => g(u, v), v0, v1, 1e-10), u0, u1, 1e-9)
}

/** 1 se la normale S_u × S_v di una superficie chiusa va verso fuori, −1 se va verso dentro. */
function outward(surface: VectorFunction, normal: (u: number, v: number) => number[], [u0, u1]: number[], [v0, v1]: number[]): number {
  const n = 12
  const grid: [number, number][] = []
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) grid.push([u0 + ((i + 0.5) / n) * (u1 - u0), v0 + ((j + 0.5) / n) * (v1 - v0)])
  const points = grid.map(([u, v]) => surface.call([u, v]))
  const center = [0, 1, 2].map((k) => points.reduce((s, p) => s + p[k], 0) / points.length)
  let total = 0
  grid.forEach(([u, v], i) => {
    const N = normal(u, v)
    const d = points[i].map((c, k) => c - center[k])
    if (N.every(Number.isFinite) && d.every(Number.isFinite)) total += dot(N, d)
  })
  return total < 0 ? -1 : 1
}

/** Le derivate di una curva o di una superficie con le differenze finite, quando le formule non bastano. */
export function numericPartials(call: (args: number[]) => number[], params: number): ((args: number[]) => number[])[] {
  return Array.from({ length: params }, (_, k) => (args: number[]) => {
    const h = 1e-4 * Math.max(1, Math.abs(args[k]))
    const at = (d: number) => call(args.map((a, i) => (i === k ? a + d : a)))
    const [m2, m1, p1, p2] = [at(-2 * h), at(-h), at(h), at(2 * h)]
    return m1.map((_, i) => (m2[i] - 8 * m1[i] + 8 * p1[i] - p2[i]) / (12 * h))
  })
}
