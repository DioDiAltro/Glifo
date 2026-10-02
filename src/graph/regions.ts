/**
 * Le zone dei grafici. Nel piano: le disuguaglianze (y > x^2, x^2 + y^2 \le 4), gli insiemi
 * (D = \{(x, y) : …\}) e i domini degli integrali doppi; nello spazio: i solidi
 * (x^2 + y^2 + z^2 \le 1), i domini degli integrali tripli e il volume sotto la superficie di un
 * integrale doppio. Ogni zona è un «margine» (vedi src/math/domain.ts): positivo dentro, negativo
 * fuori. Un dominio scritto in coordinate polari (r e θ), cilindriche (r, θ, z) o sferiche
 * (ρ, θ, φ) si disegna dove sta nel piano o nello spazio.
 */
import { compileDomain, renameVars, type Domain, type Layers } from '../math/domain'
import { bound, compile, scopeWith, type Compiled, type Scope, type Vars } from '../math/evaluate'
import { namesIn, type MathNode } from '../math/parse'
import type { Vec3 } from './spec'

/** Un integrale doppio o triplo: \iint_D f \, dA, \int_0^1 \int_0^x f \, dy \, dx, anche con un nome (V = …). */
export interface Multiple {
  node: MathNode
  name: string | null
  dims: 2 | 3
}

/** Quanti \int uno dentro l'altro. */
function depth(node: MathNode): number {
  let d = 0
  for (let n = node; n.k === 'int'; n = n.body) d++
  return d
}

/** La riga è un integrale doppio o triplo (con il nome o il risultato scritto dopo, come per l'area)? */
export function multipleOf(main: MathNode): Multiple | null {
  const pick = (n: MathNode): Multiple | null => {
    if (n.k === 'mint') return { node: n, name: null, dims: n.vars.length === 3 ? 3 : 2 }
    const d = n.k === 'int' ? depth(n) : 0
    return d === 2 || d === 3 ? { node: n, name: null, dims: d } : null
  }
  // Se usa x, y o z che non integra, è una funzione di quelle, non un numero da disegnare.
  const plain = (n: MathNode) => !['x', 'y', 'z'].some((a) => namesIn(n).has(a))
  if (main.k === 'mint' || main.k === 'int') return plain(main) ? pick(main) : null
  if (main.k !== 'rel' || !main.ops.every((op) => op === '=' || op === '≈') || !main.items.every(plain)) return null
  const [first, second] = main.items
  const direct = pick(first)
  if (direct) return direct
  const named = first.k === 'name' ? pick(second) : null
  return named && first.k === 'name' ? { ...named, name: first.name } : null
}

export interface IntegralRegion {
  /** Le variabili, da fuori a dentro (x e y, r e θ…). */
  vars: string[]
  /** Positivo dentro il dominio. */
  margin: Compiled
  /** Le condizioni del dominio una per una (vedi Domain.parts), o null. */
  parts: Compiled[] | null
  strictParts: boolean[] | null
  /** Le variabili una dentro l'altra (vedi Layers), o null. */
  layers: Layers | null
  /** La funzione da integrare. */
  integrand: Compiled
}

/** Il dominio e la funzione di un integrale doppio o triplo (\iint_D o \int \int con gli estremi). */
export function integralRegion(node: MathNode, scope: Scope): IntegralRegion {
  if (node.k === 'mint') {
    const domain = compileDomain(node.domain, scope, node.vars)
    const rename = new Map(node.vars.map((name, i) => [name, domain.vars[i]]))
    const integrand = compile(renameVars(node.body, rename), scopeWith(scope, domain.vars))
    return { vars: domain.vars, margin: domain.margin, parts: domain.parts, strictParts: domain.strictParts, layers: domain.layers, integrand }
  }
  // \int_a^b \int_{g(x)}^{h(x)} f \, dy \, dx: per ogni variabile i suoi estremi, che possono usare quelle di fuori.
  const vars: string[] = []
  const limits: { lo: Compiled; hi: Compiled }[] = []
  let n: MathNode = node
  while (n.k === 'int') {
    const outer = scopeWith(scope, vars)
    limits.push({ lo: bound(n.from, outer), hi: bound(n.to, outer) })
    vars.push(n.v)
    n = n.body
  }
  // Ogni estremo è una condizione: t ≥ min(a, b) e t ≤ max(a, b).
  const parts: Compiled[] = vars.flatMap((name, i) => [
    (v: Vars) => v[name] - Math.min(limits[i].lo(v), limits[i].hi(v)),
    (v: Vars) => Math.max(limits[i].lo(v), limits[i].hi(v)) - v[name],
  ])
  return {
    vars,
    parts,
    strictParts: parts.map(() => false),
    layers: {
      vars,
      lo: limits.map(({ lo, hi }) => (v: Vars) => Math.min(lo(v), hi(v))),
      hi: limits.map(({ lo, hi }) => (v: Vars) => Math.max(lo(v), hi(v))),
    },
    integrand: compile(n, scopeWith(scope, vars)),
    margin: (v) => {
      let m = Infinity
      vars.forEach((name, i) => {
        const a = limits[i].lo(v)
        const b = limits[i].hi(v)
        m = Math.min(m, v[name] - Math.min(a, b), Math.max(a, b) - v[name])
      })
      return m
    },
  }
}

/** Il nome del raggio, se le variabili sono quelle polari (r o ρ, e θ). */
function radiusOf(vars: readonly string[]): string | undefined {
  return vars.find((n) => n === 'r' || n === 'ρ')
}

/**
 * Il margine nel piano xy di un dominio con le variabili `vars`: x e y direttamente, oppure r (o ρ)
 * e θ passando alle coordinate polari (θ con i suoi giri: il dominio può andare da −π a 3π). Null se
 * le variabili sono altre.
 */
export function planeMargin(vars: readonly string[], margin: Compiled): ((x: number, y: number) => number) | null {
  const v: Vars = {}
  const has = (n: string) => vars.includes(n)
  if (vars.length === 2 && has('x') && has('y')) {
    return (x, y) => {
      v.x = x
      v.y = y
      return margin(v)
    }
  }
  const r = radiusOf(vars)
  if (vars.length === 2 && r && has('θ')) {
    return (x, y) => {
      v[r] = Math.hypot(x, y)
      const theta = Math.atan2(y, x)
      let best = -Infinity
      for (const k of [-1, 0, 1, 2]) {
        v.θ = theta + 2 * Math.PI * k
        best = Math.max(best, margin(v))
      }
      return best
    }
  }
  return null
}

/**
 * Il margine nello spazio di un dominio con le variabili `vars`: x, y e z; r, θ e z (cilindriche);
 * ρ (o r), θ e φ (sferiche, con φ l'angolo dall'asse z). Null se le variabili sono altre.
 */
export function spaceMargin(vars: readonly string[], margin: Compiled): ((x: number, y: number, z: number) => number) | null {
  const v: Vars = {}
  const has = (n: string) => vars.includes(n)
  if (vars.length !== 3) return null
  if (has('x') && has('y') && has('z')) {
    return (x, y, z) => {
      v.x = x
      v.y = y
      v.z = z
      return margin(v)
    }
  }
  const r = radiusOf(vars)
  if (!r || !has('θ')) return null
  const turns = (set: (theta: number) => void) => {
    let best = -Infinity
    return (theta: number) => {
      best = -Infinity
      for (const k of [-1, 0, 1, 2]) {
        set(theta + 2 * Math.PI * k)
        best = Math.max(best, margin(v))
      }
      return best
    }
  }
  if (has('z')) {
    const around = turns((t) => (v.θ = t))
    return (x, y, z) => {
      v[r] = Math.hypot(x, y)
      v.z = z
      return around(Math.atan2(y, x))
    }
  }
  if (has('φ')) {
    const around = turns((t) => (v.θ = t))
    return (x, y, z) => {
      const rho = Math.hypot(x, y, z)
      v[r] = rho
      v.φ = rho > 0 ? Math.acos(Math.max(-1, Math.min(1, z / rho))) : 0
      return around(Math.atan2(y, x))
    }
  }
  return null
}

/**
 * Un solido a strati pronto da disegnare (vedi Layers): gli estremi delle variabili, il punto dello
 * spazio per i loro valori e l'angolo θ, che può fare un giro intero (lì due facce si toccano).
 */
export interface LayeredSolid extends Layers {
  point: (v: Vars) => Vec3
  angle: string | null
}

/**
 * Il punto dello spazio per le variabili di un dominio: x, y e z; r, θ e z (cilindriche); ρ (o r),
 * θ e φ (sferiche, φ dall'asse z). Null se le variabili sono altre.
 */
function spacePoint(vars: readonly string[]): ((v: Vars) => Vec3) | null {
  const has = (n: string) => vars.includes(n)
  if (vars.length !== 3) return null
  if (has('x') && has('y') && has('z')) return (v) => [v.x, v.y, v.z]
  const r = radiusOf(vars)
  if (!r || !has('θ')) return null
  if (has('z')) return (v) => [v[r] * Math.cos(v.θ), v[r] * Math.sin(v.θ), v.z]
  if (has('φ')) return (v) => [v[r] * Math.sin(v.φ) * Math.cos(v.θ), v[r] * Math.sin(v.φ) * Math.sin(v.θ), v[r] * Math.cos(v.φ)]
  return null
}

/** Il solido a strati di un dominio dello spazio, se le variabili si sanno disegnare. */
export function spaceLayers(layers: Layers | null): LayeredSolid | null {
  const point = layers && spacePoint(layers.vars)
  return layers && point ? { ...layers, point, angle: layers.vars.includes('θ') ? 'θ' : null } : null
}

/**
 * Il solido sotto la superficie di un integrale doppio in x e y, a strati: sopra il dominio, z tra
 * 0 e f(x, y) (sotto lo zero dove f è negativa). Null se il dominio non è a strati.
 */
export function volumeLayers(region: IntegralRegion): LayeredSolid | null {
  const base = region.layers
  if (!base || base.vars.length !== 2 || !base.vars.includes('x') || !base.vars.includes('y')) return null
  const f = region.integrand
  return {
    vars: [...base.vars, 'z'],
    lo: [...base.lo, (v) => Math.min(0, f(v))],
    hi: [...base.hi, (v) => Math.max(0, f(v))],
    point: (v) => [v.x, v.y, v.z],
    angle: null,
  }
}

/** Le condizioni di un dominio in x, y e z come funzioni dello spazio (null con altre variabili). */
export function spaceParts(vars: readonly string[], parts: Compiled[] | null): ((x: number, y: number, z: number) => number)[] | null {
  if (!parts || vars.length !== 3 || !['x', 'y', 'z'].every((a) => vars.includes(a))) return null
  return parts.map((part) => {
    const v: Vars = {}
    return (x, y, z) => {
      v.x = x
      v.y = y
      v.z = z
      return part(v)
    }
  })
}

/**
 * Le condizioni del solido sotto la superficie di un integrale doppio in x e y: quelle del
 * dominio, e 0 ≤ z ≤ f(x, y) se f non è mai negativa sul dominio (f ≤ z ≤ 0 se non è mai positiva).
 * Null se f cambia segno (allora il solido si disegna dal suo margine).
 */
export function volumeParts(region: IntegralRegion, box: { x: [number, number]; y: [number, number] }): ((x: number, y: number, z: number) => number)[] | null {
  if (!region.parts || region.vars.length !== 2 || !region.vars.includes('x') || !region.vars.includes('y')) return null
  const v: Vars = {}
  let positive = false
  let negative = false
  for (let j = 0; j <= 20; j++) {
    for (let i = 0; i <= 20; i++) {
      v.x = box.x[0] + ((box.x[1] - box.x[0]) * i) / 20
      v.y = box.y[0] + ((box.y[1] - box.y[0]) * j) / 20
      if (!(region.margin(v) >= 0)) continue
      const f = region.integrand(v)
      if (f > 0) positive = true
      if (f < 0) negative = true
    }
  }
  if (positive && negative) return null
  const sign = negative ? -1 : 1
  const at = (x: number, y: number) => {
    v.x = x
    v.y = y
  }
  const base = region.parts.map((part) => (x: number, y: number) => (at(x, y), part(v)))
  return [
    ...base.map((part) => (x: number, y: number) => part(x, y)),
    (x: number, y: number, z: number) => (at(x, y), sign * (region.integrand(v) - z)),
    (_x: number, _y: number, z: number) => sign * z,
  ]
}

/**
 * Il solido sotto la superficie di un integrale doppio in x e y: i punti sopra il dominio tra il
 * piano z = 0 e z = f(x, y) (sotto lo zero, dove f è negativa).
 */
export function volumeMargin(region: IntegralRegion): ((x: number, y: number, z: number) => number) | null {
  if (region.vars.length !== 2 || !region.vars.includes('x') || !region.vars.includes('y')) return null
  const base = planeMargin(region.vars, region.margin)!
  const v: Vars = {}
  return (x, y, z) => {
    v.x = x
    v.y = y
    const f = region.integrand(v)
    if (!Number.isFinite(f)) return NaN
    const height = f >= 0 ? Math.min(f - z, z) : Math.min(z - f, -z)
    return Math.min(base(x, y), height)
  }
}

/** La funzione da integrare non dipende dalle variabili (∬_D dA, l'area di D): il volume non serve. */
export function constantIntegrand(region: IntegralRegion): boolean {
  const v: Vars = {}
  const samples = [
    [0.31, -1.7, 0.6],
    [2.2, 0.4, -1.1],
    [-0.8, 1.3, 2.5],
  ]
  const values = samples.map((p) => {
    region.vars.forEach((name, i) => (v[name] = p[i]))
    return region.integrand(v)
  })
  return values.every((x) => x === values[0])
}

/** Una disuguaglianza (o più, o un insieme) nelle variabili `vars`: il suo margine, le condizioni una per una (e a strati) e se il bordo è escluso. */
export function inequalityMargin(node: MathNode, scope: Scope, vars: string[] | null): Domain {
  return compileDomain(node, scope, vars)
}

/** Una condizione di una zona del piano: positiva dentro; `strict` se il suo bordo non è della zona. */
export interface PlanePart {
  F: (x: number, y: number) => number
  strict: boolean
}

/** Le condizioni di un dominio in x e y come funzioni del piano, per disegnarne il bordo pezzo per pezzo (null con altre variabili). */
export function planeParts(domain: Pick<Domain, 'vars' | 'parts' | 'strictParts'>): PlanePart[] | null {
  const { vars, parts, strictParts } = domain
  if (!parts || !strictParts || parts.length > 16 || vars.length !== 2 || !vars.includes('x') || !vars.includes('y')) return null
  return parts.map((part, i) => {
    const v: Vars = {}
    return {
      strict: strictParts[i],
      F: (x, y) => {
        v.x = x
        v.y = y
        return part(v)
      },
    }
  })
}
