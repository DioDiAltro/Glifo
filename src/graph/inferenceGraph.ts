/**
 * I test d'ipotesi nei grafici: la densità della statistica sotto H₀ (normale, t, χ²) con la regione di
 * rifiuto colorata e la statistica calcolata tratteggiata: si vede se cade dentro.
 */
import { chiSquareTest, hypothesisTest, type TestResult } from '../math/inference'
import { formatNumber } from '../math/format'
import type { MathNode } from '../math/parse'
import type { Sheet } from '../math/sheet'
import type { GraphItem } from './spec'
import { distributionExtent } from './statsGraph'

export const isTestLine = (main: MathNode): boolean => main.k === 'fn' && !main.pow && (main.name === 'htest' || main.name === 'chisq')

const number = (v: number) => formatNumber(v, { comma: true, decimal: true, digits: 5 })?.tex ?? String(v)

export function testItems(main: MathNode, line: number, slot: number, sheet: Sheet): { items: GraphItem[]; colors: number } | null {
  if (!isTestLine(main) || main.k !== 'fn') return null
  const ctx = sheet.inferenceContext()
  const t: TestResult = main.name === 'chisq' ? chiSquareTest(main.args, ctx) : hypothesisTest(main.args, ctx)
  const [lo, hi] = distributionExtent(t.dist)
  // La statistica deve vedersi anche se è lontana.
  const extent: [number, number] = [Math.min(lo, t.statistic - 0.5), Math.max(hi, t.statistic + 0.5)]
  const f = (x: number) => t.dist.pdf(x)
  const items: GraphItem[] = [{ kind: 'function', line, label: t.distTex, slot, f, extent }]
  t.reject.forEach(([a, b], k) => {
    const from = Math.max(a, extent[0])
    const to = Math.min(b, extent[1])
    if (to <= from) return
    const value = t.dist.cdf(Math.min(b, 1e300)) - (Number.isFinite(a) ? t.dist.cdf(a) : 0)
    items.push({ kind: 'area', line, label: k === 0 ? `\\text{rifiuto } (\\alpha = ${number(t.alpha)})` : '', slot: slot + 1, f, from, to, value, curve: false, extent })
  })
  items.push({ kind: 'vertical', line, label: `${t.symbol} = ${number(t.statistic)}`, slot: slot + 2, x: t.statistic, dashed: true })
  return { items, colors: 3 }
}
