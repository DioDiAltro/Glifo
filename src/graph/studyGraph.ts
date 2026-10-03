/**
 * Lo studio di funzione nei grafici: \operatorname{studio}(f) disegna la funzione con gli asintoti
 * tratteggiati e i punti notevoli (massimi M, minimi m, flessi F); \operatorname{asintoti}(f) solo la
 * funzione e gli asintoti, \operatorname{estremi}(f) e \operatorname{flessi}(f) i loro punti.
 */
import { MathError, type Scope } from '../math/evaluate'
import { nameLatex, toLatex } from '../math/latex'
import type { MathNode } from '../math/parse'
import { study, type Special } from '../math/study'
import { functionOf, type SymbolScope } from '../math/symbolic'
import type { GraphItem } from './spec'

/** Le parti dello studio che si disegnano. */
export const STUDY_GRAPH = new Set(['study', 'asymptotes', 'extrema', 'flexes', 'zeros'])

/** I nomi dei punti: M per i massimi, m per i minimi, F per i flessi (con il numero se sono più di uno). */
function names(points: Special[], kind: Special['kind'], letter: string): Map<Special, string> {
  const same = points.filter((p) => p.kind === kind)
  return new Map(same.map((p, i) => [p, same.length > 1 ? `${letter}_${i + 1}` : letter]))
}

/** Gli elementi del grafico per una riga \operatorname{studio}(f) (o una sua parte); null se la riga è altro. */
export function studyItems(
  main: MathNode,
  line: number,
  slot: number,
  scope: Scope,
  symbols: SymbolScope,
  /** Un'altra riga disegna già la funzione (f(x) = … nel blocco): qui solo asintoti e punti. */
  drawn = false,
): { items: GraphItem[]; colors: number } | null {
  if (main.k !== 'fn' || !STUDY_GRAPH.has(main.name)) return null
  if (main.args.length !== 1) throw new MathError('Si scrive \\operatorname{studio}(f), con f una funzione di una variabile')
  const target = functionOf(main.args[0], symbols)
  if (!target) throw new MathError('Qui va una funzione di una variabile: \\operatorname{studio}(f)')
  const s = study(target.f, target.v, scope, { comma: true, decimal: false }, target.name)
  if (!s) throw new MathError('Questa funzione non esiste in nessun punto')
  const arg = main.args[0]
  const label = arg.k === 'name' ? `${nameLatex(target.name)}(${nameLatex(target.v)})` : `y = ${toLatex(arg)}`
  const items: GraphItem[] = drawn ? [] : [{ kind: 'function', line, label, slot, f: s.F }]
  let colors = drawn ? 0 : 1
  const asymptoteSlot = drawn ? slot : slot + 1
  const part = main.name
  if (part === 'study' || part === 'asymptotes') {
    for (const a of s.asymptotes) {
      // Le verticali di una funzione periodica le segna già il disegno (tratteggiate) a ogni periodo.
      if (a.kind === 'vertical' && s.period) continue
      if (a.kind === 'vertical') items.push({ kind: 'vertical', line, label: a.tex, slot: asymptoteSlot, x: a.a!, dashed: true })
      else {
        const [m, q] = [a.m!, a.q!]
        items.push({ kind: 'function', line, label: a.tex, slot: asymptoteSlot, f: (x) => m * x + q, dashed: true })
      }
    }
    if (items.some((i) => i.dashed)) colors++
  }
  const points: Special[] = []
  if (part === 'study' || part === 'extrema') points.push(...s.extrema)
  if (part === 'study' || part === 'flexes') points.push(...s.flexes)
  const named = new Map([...names(points, 'max', 'M'), ...names(points, 'min', 'm'), ...names(points, 'flex', 'F')])
  for (const p of points) {
    const name = named.get(p)!
    const what = p.kind === 'max' ? 'massimo' : p.kind === 'min' ? 'minimo' : 'flesso'
    items.push({ kind: 'point', line, label: `${nameLatex(name)}\\ \\text{(${what})}`, slot: -1, x: p.x.v, y: s.F(p.x.v), name })
  }
  if (part === 'zeros') for (const z of s.zeros) items.push({ kind: 'point', line, label: `${nameLatex(target.v)} = ${z.tex}`, slot: -1, x: z.v, y: 0, name: null })
  return { items, colors }
}
