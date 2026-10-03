/**
 * Le coniche nei grafici con i loro elementi (\operatorname{conica}(x^2 + 4y^2 = 4)): la curva, il centro
 * C, i fuochi F₁ e F₂ (o F), il vertice V della parabola, e tratteggiati gli asintoti dell'iperbole e la
 * direttrice della parabola. Le quadriche (\operatorname{quadrica}(…)) sono la loro superficie.
 */
import { conicOf } from '../math/conics'
import { compile, MathError, scopeWith, type Scope } from '../math/evaluate'
import { toLatex } from '../math/latex'
import type { MathNode } from '../math/parse'
import type { SymbolScope } from '../math/symbolic'
import type { GraphItem } from './spec'

export const isConicLine = (main: MathNode): boolean => main.k === 'fn' && main.name === 'conic' && main.args.length === 1

/** \operatorname{quadrica}(…) nel grafico: la sua equazione (una superficie in x, y e z). */
export const quadricEquation = (main: MathNode): MathNode | null => (main.k === 'fn' && main.name === 'quadric' && main.args.length === 1 ? main.args[0] : null)

export function conicItems(main: MathNode, line: number, slot: number, scope: Scope, symbols: SymbolScope): { items: GraphItem[]; colors: number } | null {
  if (!isConicLine(main) || main.k !== 'fn') return null
  const eq = main.args[0]
  if (eq.k !== 'rel' || eq.ops.length !== 1 || eq.ops[0] !== '=') throw new MathError('Si scrive \\operatorname{conica}(x^2 + 4y^2 = 4)')
  const F = compile({ k: 'bin', op: '-', a: eq.items[0], b: eq.items[1] }, scopeWith(scope, ['x', 'y']))
  const v: Record<string, number> = {}
  const items: GraphItem[] = [
    {
      kind: 'implicit',
      line,
      label: toLatex(eq),
      slot,
      F: (x, y) => {
        v.x = x
        v.y = y
        return F(v)
      },
    },
  ]
  const info = conicOf(eq, symbols)
  const el = info?.elements
  if (!el) return { items, colors: 1 }
  const point = (name: string, [x, y]: [number, number]) => items.push({ kind: 'point', line, label: name, slot: -1, x, y, name })
  if (el.center) point('C', el.center)
  el.foci.forEach((f, k) => point(el.foci.length > 1 ? `F_${k + 1}` : 'F', f))
  if (el.kind === 'parabola') point('V', el.vertices[0])
  // Gli asintoti e la direttrice, tratteggiati e di un altro colore.
  for (const l of el.lines) {
    if (Math.abs(l.b) > 1e-12) items.push({ kind: 'function', line, label: l.label, slot: slot + 1, f: (x) => (l.c - l.a * x) / l.b, dashed: true })
    else items.push({ kind: 'vertical', line, label: l.label, slot: slot + 1, x: l.c / l.a, dashed: true })
  }
  return { items, colors: el.lines.length ? 2 : 1 }
}
