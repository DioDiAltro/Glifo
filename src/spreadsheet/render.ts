/**
 * La tabella nell'anteprima della nota: i risultati delle formule nel formato delle celle, i numeri
 * a destra, i testi con il loro Markdown (grassetto, formule $…$). Passando sopra una cella con una
 * formula si vede la formula, sopra un errore cosa è successo.
 */
import { escapeHtml } from '../render/katex'
import { SheetEvaluator, type CellResult } from './evaluate'
import { formatNumber } from './format'
import { parseSheet, sheetSize, type SheetModel } from './model'
import { cellName } from './refs'
import { isError } from './values'

/** Il testo di una cella come si scrive nella nota (`inline` lo passa dal Markdown in linea). */
export type InlineRenderer = (text: string) => string

/** La colonna ha numeri: la prima cella piena sotto l'intestazione è un numero. */
function numericColumns(model: SheetModel, results: CellResult[][], cols: number): boolean[] {
  return Array.from({ length: cols }, (_, c) => {
    for (let r = model.header ? 1 : 0; r < results.length; r++) {
      const v = results[r]?.[c]?.value
      if (v !== null && v !== undefined) return typeof v === 'number'
    }
    return false
  })
}

/** L'HTML della tabella del blocco (senza il riquadro attorno). */
export function sheetHtml(source: string, inline: InlineRenderer): string {
  const model = parseSheet(source)
  const { rows, cols } = sheetSize(model)
  if (!rows) return '<p class="sheet-empty">Tabella vuota</p>'
  const evaluator = new SheetEvaluator(model)
  const results = Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => evaluator.result(r, c)))
  const numeric = numericColumns(model, results, cols)

  const cellHtml = (r: number, c: number, tag: 'td' | 'th'): string => {
    const cell = model.cells[r]?.[c]
    const res = results[r][c]
    const classes: string[] = []
    let content = ''
    let title = res.formula && cell ? `${cellName(r, c)}: ${cell.input}` : ''
    const v = res.value
    if (isError(v)) {
      classes.push('sheet-error')
      content = escapeHtml(v.error)
      title = title ? `${title}\n${v.message}` : v.message
    } else if (typeof v === 'number') {
      classes.push('sheet-num')
      content = escapeHtml(formatNumber(v, res.format))
    } else if (typeof v === 'boolean') {
      classes.push('sheet-bool')
      content = v ? 'VERO' : 'FALSO'
    } else if (typeof v === 'string') {
      // Il testo scritto ha il suo Markdown; quello che esce da una formula si mostra com'è.
      content = res.formula ? escapeHtml(v) : inline(v)
    }
    if (tag === 'th' && !classes.length && numeric[c]) classes.push('sheet-num')
    const align = model.align[c]
    if (align) classes.push(`sheet-${align}`)
    if (cell?.bold && content) content = `<strong>${content}</strong>`
    return `<${tag}${classes.length ? ` class="${classes.join(' ')}"` : ''}${title ? ` title="${escapeHtml(title)}"` : ''}>${content}</${tag}>`
  }

  const row = (r: number, tag: 'td' | 'th') => `<tr>${Array.from({ length: cols }, (_, c) => cellHtml(r, c, tag)).join('')}</tr>`
  let html = '<table class="sheet-table">'
  let start = 0
  if (model.header) {
    html += `<thead>${row(0, 'th')}</thead>`
    start = 1
  }
  if (start < rows) {
    html += '<tbody>'
    for (let r = start; r < rows; r++) html += row(r, 'td')
    html += '</tbody>'
  }
  return `${html}</table>`
}

/**
 * La tabella come tabella di Markdown, con i risultati al posto delle formule: per i file .md, che
 * così si leggono anche fuori da Glifo. Markdown vuole sempre l'intestazione: senza, fa da
 * intestazione la prima riga.
 */
export function sheetMarkdown(source: string): string {
  const model = parseSheet(source)
  const { rows, cols } = sheetSize(model)
  if (!rows) return ''
  const evaluator = new SheetEvaluator(model)
  const results = Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => evaluator.result(r, c)))
  const numeric = numericColumns({ ...model, header: true }, results, cols)
  const text = (r: number, c: number) => {
    const res = results[r][c]
    const v = res.value
    let s = isError(v) ? v.error : typeof v === 'number' ? formatNumber(v, res.format) : typeof v === 'boolean' ? (v ? 'VERO' : 'FALSO') : (v ?? '')
    s = s.replace(/\|/g, '\\|')
    return s && model.cells[r]?.[c]?.bold ? `**${s}**` : s
  }
  const line = (cells: string[]) => `| ${cells.join(' | ')} |`
  const lines = [line(Array.from({ length: cols }, (_, c) => text(0, c)))]
  lines.push(line(Array.from({ length: cols }, (_, c) => {
    const a = model.align[c] ?? (numeric[c] ? 'right' : null)
    return a === 'center' ? ':---:' : a === 'right' ? '---:' : a === 'left' ? ':---' : '---'
  })))
  for (let r = 1; r < rows; r++) lines.push(line(Array.from({ length: cols }, (_, c) => text(r, c))))
  return lines.join('\n')
}
