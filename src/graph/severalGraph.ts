/**
 * L'analisi in più variabili nei grafici: i punti critici sulle curve di livello di f (M i massimi, m i
 * minimi, S le selle), e gli estremi vincolati e assoluti con il vincolo (la curva, o l'insieme
 * colorato) e i punti di massimo e di minimo.
 */
import { compile, MathError, scopeWith, type Scope } from '../math/evaluate'
import { toLatex } from '../math/latex'
import type { MathNode } from '../math/parse'
import { criticalPoints, extremaOf, optimumOf, severalOf, type Several } from '../math/several'
import { toNode, type SymbolScope } from '../math/symbolic'
import type { GraphItem } from './spec'

/** Le righe che disegna questo modulo: \operatorname{critici}(f), \operatorname{lagrange}(f, g = c), \operatorname{estremi}(f, D), \max_{…} f. */
export function isSeveralLine(main: MathNode): boolean {
  if (main.k !== 'fn') return false
  return main.name === 'critical' || main.name === 'lagrange' || (main.name === 'extrema' && main.args.length === 2) || ((main.name === 'max' || main.name === 'min') && !!main.base)
}

/** \operatorname{estremi}(f) con f di due variabili: i suoi punti critici (con una variabile è lo studio di funzione). */
function criticalLine(main: Extract<MathNode, { k: 'fn' }>, symbols: SymbolScope): boolean {
  return main.name === 'critical' || (main.name === 'extrema' && main.args.length === 1 && (severalOf(main.args[0], symbols)?.vars.length ?? 0) >= 2)
}

function surface(s: Several, scope: Scope): (x: number, y: number) => number {
  const f = compile(toNode(s.f), scopeWith(scope, s.vars))
  const v: Record<string, number> = {}
  return (x, y) => {
    v[s.vars[0]] = x
    v[s.vars[1]] = y
    return f(v)
  }
}

/** I nomi dei punti: M, M₁, M₂… se sono più d'uno. */
const named = (base: string, k: number, n: number) => (n > 1 ? `${base}_${k + 1}` : base)

export function severalItems(
  main: MathNode,
  line: number,
  slot: number,
  scope: Scope,
  symbols: SymbolScope,
  sets: ReadonlyMap<string, MathNode>,
): { items: GraphItem[]; colors: number } | null {
  if (main.k !== 'fn' || !(isSeveralLine(main) || criticalLine(main, symbols))) return null
  const critical = criticalLine(main, symbols)
  const problem = critical ? null : optimumOf(main.args[0], main.base ?? main.args[1], symbols, sets)
  const s = critical ? severalOf(main.args[0], symbols) : problem?.s
  if (!s) throw new MathError('Qui va una funzione di due variabili, come x^2 + y^2 o f della nota')
  if (s.vars.length !== 2) throw new MathError('Nel grafico vanno le funzioni di due variabili (si vedono le curve di livello)')
  const F = surface(s, scope)
  const label = s.name ? `${s.name}(${s.vars.join(', ')})` : toLatex(main.args[0])
  const items: GraphItem[] = [{ kind: 'contour', line, label: `\\text{livelli di } ${label}`, slot, F }]
  let colors = 1
  if (critical) {
    const found = criticalPoints(s)
    if (!found || found.infinite) return { items, colors }
    const groups = { max: found.points.filter((p) => p.kind === 'max'), min: found.points.filter((p) => p.kind === 'min'), saddle: found.points.filter((p) => p.kind === 'saddle') }
    const what = { max: ['M', 'massimo'], min: ['m', 'minimo'], saddle: ['S', 'sella'] } as const
    for (const kind of ['max', 'min', 'saddle'] as const) {
      groups[kind].forEach((p, k) => {
        const name = named(what[kind][0], k, groups[kind].length)
        items.push({ kind: 'point', line, label: `${name}\\ \\text{(${what[kind][1]})}`, slot: -1, x: p.at[0].v, y: p.at[1].v, name })
      })
    }
    return { items, colors }
  }
  const { constraints } = problem!
  // Il vincolo: la curva g = c, o l'insieme dove valgono le disuguaglianze.
  const gs = constraints.map((c) => {
    const g = compile(toNode(c.G), scopeWith(scope, s.vars))
    const v: Record<string, number> = {}
    return (x: number, y: number) => {
      v[s.vars[0]] = x
      v[s.vars[1]] = y
      return g(v)
    }
  })
  const where = main.base ?? main.args[1]
  if (constraints.some((c) => c.equal)) items.push({ kind: 'implicit', line, label: toLatex(where), slot: slot + 1, F: gs[0] })
  else items.push({ kind: 'region', line, label: toLatex(where), slot: slot + 1, M: (x, y) => Math.min(...gs.map((g) => -g(x, y))), strict: false, parts: null })
  colors++
  const found = extremaOf(s, constraints)
  if (!found || !found.bounded) return { items, colors }
  const which = main.name === 'max' ? ['max'] : main.name === 'min' ? ['min'] : ['max', 'min']
  for (const kind of which as ('max' | 'min')[]) {
    const list = found[kind]
    list.forEach((p, k) => {
      const name = named(kind === 'max' ? 'M' : 'm', k, list.length)
      items.push({ kind: 'point', line, label: `${name}\\ \\text{(${kind === 'max' ? 'massimo' : 'minimo'})}`, slot: -1, x: p.at[0].v, y: p.at[1].v, name })
    })
  }
  return { items, colors }
}
