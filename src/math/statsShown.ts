/**
 * Come si scrivono i risultati della probabilità e della statistica: le frazioni con il loro valore
 * (3/8 = 0,375, 25/72 ≈ 0,347222…), le probabilità con e^{−λ} (9e⁻³/2 ≈ 0,224041…), le mode, i
 * quartili, la retta di regressione, la tabella delle frequenze e il riassunto dei dati.
 */
import { texts } from '../i18n'
import { expSumValue, type ExpSum } from './distributions'
import { Rational } from './exact'
import { formatNumber, formatRational, type FormatOptions, type FormattedResult } from './format'
import { nameLatex, toLatex } from './latex'
import type { Field } from './linear'
import { count, deviation, mean, median, modes, quantile, sorted, variance, type Data } from './statistics'
import { add, mul, num, plainText, pow, sym, tidy, toNode } from './symbolic'

const T = texts({
  noMode: ['nessuna: i valori hanno tutti la stessa frequenza', 'none: the values all have the same frequency'],
  /** Tra le ultime due mode: «5 e 7». */
  and: ['e', 'and'],
  // Le colonne della tabella delle frequenze.
  value: ['valore', 'value'],
  frequency: ['freq.', 'freq.'],
  relative: ['relativa', 'relative'],
  cumulative: ['cumulata', 'cumulative'],
  total: ['totale', 'total'],
  // Le righe del riassunto dei dati.
  mean: ['Media', 'Mean'],
  median: ['Mediana', 'Median'],
  mode: ['Moda', 'Mode'],
  minMax: ['Minimo e massimo', 'Minimum and maximum'],
  range: ['Campo di variazione', 'Range'],
  quartiles: ['Quartili', 'Quartiles'],
  iqr: ['Scarto interquartile', 'Interquartile range'],
  variance: ['Varianza', 'Variance'],
  deviation: ['Scarto quadratico medio', 'Standard deviation'],
  sampleVariance: ['Varianza campionaria (n − 1)', 'Sample variance (n − 1)'],
  sampleDeviation: ['Deviazione standard campionaria', 'Sample standard deviation'],
})

/** Una frazione con il suo valore: 3/8 = 0,375, 25/72 ≈ 0,347222…; con i decimali (o se è intera) solo il numero. */
export function fractionShown(r: Rational, style: FormatOptions): FormattedResult {
  const decimal = formatRational(r, { ...style, decimal: true })
  if (r.isInteger || style.decimal || r.d > 1000000n) return decimal
  // Un decimale corto (2,1, 0,25) basta; se no la frazione con il suo valore.
  const approx = decimal.text.includes('…')
  if (!approx && decimal.text.replace(/^[−-]?\d+[,.]?/, '').length <= 2) return decimal
  const fraction = formatRational(r, { ...style, decimal: false })
  return { tex: `${fraction.tex} ${approx ? '\\approx' : '='} ${decimal.tex}`, text: `${fraction.text} ${approx ? '≈' : '='} ${decimal.text}` }
}

/** Un numero calcolato con la virgola, con le cifre giuste. */
export function decimalShown(v: number, style: FormatOptions): FormattedResult | null {
  return formatNumber(v, { ...style, decimal: true, digits: 10 })
}

/** Il numero esatto (frazione) o con la virgola, secondo il campo. */
export function valueShown<T>(F: Field<T>, v: T, style: FormatOptions): FormattedResult {
  return F.exact ? fractionShown(v as unknown as Rational, style) : decimalShown(v as unknown as number, style) ?? { tex: '\\text{?}', text: '?' }
}

/** Solo il numero (frazione o decimale), senza il valore accanto: per le tabelle. */
function plainValue<T>(F: Field<T>, v: T, style: FormatOptions): FormattedResult {
  if (!F.exact) return decimalShown(v as unknown as number, style) ?? { tex: '\\text{?}', text: '?' }
  const r = v as unknown as Rational
  const decimal = formatRational(r, { ...style, decimal: true })
  return decimal.text.includes('…') && !style.decimal ? formatRational(r, { ...style, decimal: false }) : decimal
}

/** Una probabilità: esatta (frazione, o con e^{−λ}) con il suo valore, o con la virgola. */
export function probabilityShown(exact: ExpSum | null, v: number, style: FormatOptions): FormattedResult | null {
  if (exact && !exact.terms.length) return fractionShown(exact.c, style)
  const value = decimalShown(exact ? expSumValue(exact) : v, style)
  if (!exact || !value) return value
  const ex = tidy(add(num(exact.c), ...exact.terms.map((t) => mul(num(t.coef), pow(sym('e'), num(t.rate.neg()))))))
  const node = toNode(ex)
  return { tex: `${toLatex(node)} \\approx ${value.tex}`, text: `${plainText(node)} ≈ ${value.text}` }
}

/** Le mode: «5», «5 e 7», o nessuna. */
export function modesShown<T>(F: Field<T>, d: Data<T>, style: FormatOptions): FormattedResult {
  const m = modes(F, d)
  if (!m.length) return { tex: `\\text{${T.noMode}}`, text: T.noMode }
  const shown = m.map((v) => plainValue(F, v, style))
  const last = shown.length - 1
  return {
    tex: shown.map((s, i) => (i === 0 ? s.tex : i === last ? `\\text{ ${T.and} } ${s.tex}` : `,\\ ${s.tex}`)).join(''),
    text: shown.map((s, i) => (i === 0 ? s.text : i === last ? ` ${T.and} ${s.text}` : `, ${s.text}`)).join(''),
  }
}

const SUB = ['₀', '₁', '₂', '₃', '₄']

/** I quartili: Q₁ = 3,5; Q₂ = 6; Q₃ = 7. */
export function quartilesShown<T>(F: Field<T>, d: Data<T>, style: FormatOptions): FormattedResult {
  const parts = [1, 2, 3].map((k) => {
    const q = plainValue(F, quantile(F, d, F.div(F.int(k), F.int(4))), style)
    return { tex: `Q_{${k}} = ${q.tex}`, text: `Q${SUB[k]} = ${q.text}` }
  })
  return { tex: parts.map((p) => p.tex).join(',\\ '), text: parts.map((p) => p.text).join('; ') }
}

/** Un coefficiente della retta, con poche cifre: 0,6, 2,2, 0,333333… */
function coefficient<T>(F: Field<T>, v: T, style: FormatOptions): { value: number; shown: FormattedResult } {
  const value = F.toNumber(v)
  const shown = F.exact ? formatRational(v as unknown as Rational, { ...style, decimal: true }) : formatNumber(value, { ...style, decimal: true, digits: 8 })
  return { value, shown: shown ?? { tex: '0', text: '0' } }
}

/** La retta di regressione: y = 0,6x + 2,2, con il coefficiente di correlazione r. */
export function regressionShown<T>(F: Field<T>, ab: { a: T; b: T }, r: number, names: [string, string], style: FormatOptions): FormattedResult {
  const [xn, yn] = names
  const b = coefficient(F, ab.b, style)
  const a = coefficient(F, ab.a, style)
  const x = nameLatex(xn)
  const slope = b.value === 0 ? null : b.value === 1 ? { tex: x, text: xn } : b.value === -1 ? { tex: `-${x}`, text: `−${xn}` } : { tex: `${b.shown.tex}${x}`, text: `${b.shown.text}${xn}` }
  let tex = `${nameLatex(yn)} = `
  let text = `${yn} = `
  if (slope) {
    tex += slope.tex
    text += slope.text
    if (a.value !== 0) {
      const abs = a.value < 0 ? { tex: a.shown.tex.replace(/^-/, ''), text: a.shown.text.replace(/^−/, '') } : a.shown
      tex += ` ${a.value < 0 ? '-' : '+'} ${abs.tex}`
      text += ` ${a.value < 0 ? '−' : '+'} ${abs.text}`
    }
  } else {
    tex += a.shown.tex
    text += a.shown.text
  }
  const rs = formatNumber(r, { ...style, decimal: true, digits: 10 })
  if (rs) {
    tex += `\\quad (r = ${rs.tex})`
    text += ` (r = ${rs.text})`
  }
  return { tex, text }
}

/** Un decimale corto (le frequenze relative): al massimo quattro cifre dopo la virgola. */
function short(v: number, comma: boolean): string {
  const s = String(Math.round(v * 10000) / 10000)
  return comma ? s.replace('.', ',') : s
}

/** La tabella delle frequenze: i valori, le frequenze assolute, relative e relative cumulate. */
export function frequencyTable<T>(F: Field<T>, d: Data<T>, style: FormatOptions): FormattedResult {
  const values = sorted(F, d)
  const n = values.length
  const groups: { v: T; k: number }[] = []
  for (const v of values) {
    const last = groups[groups.length - 1]
    if (last && F.cmp(last.v, v) === 0) last.k++
    else groups.push({ v, k: 1 })
  }
  const comma = style.comma
  const sep = comma ? '{,}' : '.'
  let cumulated = 0
  const rows = groups.map((g) => {
    cumulated += g.k
    const value = plainValue(F, g.v, style)
    const f = short(g.k / n, comma)
    const c = short(cumulated / n, comma)
    return { tex: `${value.tex} & ${g.k} & ${f.replace(',', sep)} & ${c.replace(',', sep)}`, text: `${value.text}: ${g.k} (${f}; ${c})` }
  })
  const head = [T.value, T.frequency, T.relative, T.cumulative].map((h) => `\\text{${h}}`).join(' & ')
  return {
    tex: `\\begin{array}{r|r|r|r} ${head} \\\\ \\hline ${rows.map((r) => r.tex).join(' \\\\ ')} \\\\ \\hline \\text{${T.total}} & ${n} & 1 & \\end{array}`,
    text: `${rows.map((r) => r.text).join('; ')}; ${T.total} ${n}`,
    rich: true,
  }
}

/** Il riassunto dei dati: le righe (titolo e valore), da mettere in tabella come lo studio di funzione. */
export function summaryRows<T>(F: Field<T>, d: Data<T>, style: FormatOptions): [string, FormattedResult[]][] {
  const v = (x: T) => plainValue(F, x, style)
  const s = sorted(F, d)
  const rows: [string, FormattedResult[]][] = []
  const n = count(F, d)
  rows.push(['n', [v(n)]])
  rows.push([T.mean, [v(mean(F, d))]])
  rows.push([T.median, [v(median(F, d))]])
  rows.push([T.mode, [modesShown(F, d, style)]])
  rows.push([T.minMax, [{ tex: `${v(s[0]).tex},\\ ${v(s[s.length - 1]).tex}`, text: `${v(s[0]).text}, ${v(s[s.length - 1]).text}` }]])
  rows.push([T.range, [v(F.sub(s[s.length - 1], s[0]))]])
  rows.push([T.quartiles, [quartilesShown(F, d, style)]])
  const q1 = quantile(F, d, F.div(F.one(), F.int(4)))
  const q3 = quantile(F, d, F.div(F.int(3), F.int(4)))
  rows.push([T.iqr, [v(F.sub(q3, q1))]])
  rows.push([T.variance, [v(variance(F, d, false))]])
  rows.push([T.deviation, [deviationShown(F, d, false, style)]])
  if (F.toNumber(n) > 1) {
    rows.push([T.sampleVariance, [v(variance(F, d, true))]])
    rows.push([T.sampleDeviation, [deviationShown(F, d, true, style)]])
  }
  return rows
}

/** Lo scarto quadratico medio: esatto se la radice viene esatta, se no con la virgola. */
function deviationShown<T>(F: Field<T>, d: Data<T>, sample: boolean, style: FormatOptions): FormattedResult {
  try {
    return plainValue(F, deviation(F, d, sample), style)
  } catch {
    const shown = decimalShown(Math.sqrt(F.toNumber(variance(F, d, sample))), style)
    return shown ?? { tex: '\\text{?}', text: '?' }
  }
}
