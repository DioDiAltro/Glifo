/**
 * Il calcolo numerico nei grafici: la funzione con lo zero trovato (bisezione, Newton, secanti), g con
 * la retta y = x e il punto fisso, i dati con il polinomio interpolante o dei minimi quadrati, la funzione
 * della quadratura, i punti di Eulero (o Heun, Runge–Kutta) con la soluzione vera.
 */
import type { MathNode } from '../math/parse'
import { isPlottedNumerical, numericalPlot } from '../math/numerical'
import type { Sheet } from '../math/sheet'
import { nameLatex } from '../math/latex'
import type { GraphItem } from './spec'

export const isNumericalLine = (main: MathNode): boolean => isPlottedNumerical(main)

export function numericalItems(main: MathNode, line: number, slot: number, sheet: Sheet): { items: GraphItem[]; colors: number } | null {
  if (!isNumericalLine(main)) return null
  const plot = numericalPlot(main, sheet.numericContext({ comma: true, decimal: true, digits: 12 }))
  if (!plot) return null
  const items: GraphItem[] = plot.curves.map((c, k) => ({ kind: 'function', line, label: c.label, slot: slot + k, f: c.f, ...(c.dashed && { dashed: true }), ...(c.extent && { extent: c.extent }) }))
  for (const p of plot.points) items.push({ kind: 'point', line, label: p.name ? nameLatex(p.name) : '', slot: -1, x: p.x, y: p.y, name: p.name })
  return { items, colors: Math.max(1, plot.curves.length) }
}
