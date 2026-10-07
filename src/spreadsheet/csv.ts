/**
 * I file .csv delle tabelle: una riga di testo per riga, le celle separate da un carattere. L'Excel
 * italiano li scrive con il punto e virgola e la virgola dei decimali (1.234,50); quelli inglesi con
 * la virgola e il punto dei decimali (1234.50); alcuni programmi con il tabulatore. Leggendo si
 * capisce da solo; scrivendo si fa come l'Excel italiano: punto e virgola, i valori come si vedono
 * nella tabella (i risultati delle formule, non le formule: un .csv non le ha), e il BOM perché
 * Excel legga bene le lettere accentate.
 */
import { SheetEvaluator } from './evaluate'
import { formatValue, readNumber } from './format'
import { emptySheet, MAX_COLS, MAX_ROWS, sheetSize, type SheetModel } from './model'
import { textCell } from './xlsx'

/** Il separatore delle celle: quello che c'è lo stesso numero di volte (e almeno una) nelle prime righe. */
export function csvDelimiter(text: string): ';' | ',' | '\t' {
  const lines = splitRecords(text, '\n').slice(0, 20).filter((l) => l.trim())
  let best: ';' | ',' | '\t' = ';'
  let bestScore = -1
  for (const d of [';', '\t', ','] as const) {
    const counts = lines.map((l) => splitRecords(l, d).length - 1)
    if (!counts.length || counts[0] === 0) continue
    const same = counts.filter((c) => c === counts[0]).length / counts.length
    const score = same * 10 + Math.min(counts[0], 9) / 10
    if (score > bestScore) {
      best = d
      bestScore = score
    }
  }
  return best
}

/** Divide il testo dove c'è `sep`, fuori dalle virgolette (le virgolette restano). */
function splitRecords(text: string, sep: string): string[] {
  const out: string[] = []
  let current = ''
  let quoted = false
  for (const ch of text) {
    if (ch === '"') quoted = !quoted
    if (ch === sep && !quoted) {
      out.push(current)
      current = ''
    } else current += ch
  }
  out.push(current)
  return out
}

/** Le righe e le celle di un .csv, come in RFC 4180: tra virgolette ci possono essere il separatore, gli a capo e "" per una virgoletta. */
export function parseCsv(text: string, delimiter = csvDelimiter(text)): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false
  const s = text.replace(/^﻿/, '')
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (quoted) {
      if (ch === '"') {
        if (s[i + 1] === '"') {
          field += '"'
          i++
        } else quoted = false
      } else field += ch
      continue
    }
    if (ch === '"' && !field.trim()) {
      quoted = true
      field = ''
    } else if (ch === delimiter) {
      row.push(field)
      field = ''
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && s[i + 1] === '\n') i++
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else field += ch
  }
  if (field || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

/** Un numero scritto all'inglese (1234.5, -0.25) diventa all'italiana; il resto resta com'è. */
function italian(value: string): string {
  return /^-?\d+\.\d+$/.test(value) ? value.replace('.', ',') : value
}

/** La tabella di un .csv; `cut` se era troppo grande e una parte è rimasta fuori. */
export function csvToSheet(text: string): { model: SheetModel; cut: boolean } {
  const delimiter = csvDelimiter(text)
  const rows = parseCsv(text, delimiter)
  while (rows.length && rows[rows.length - 1].every((f) => !f.trim())) rows.pop()
  const model = emptySheet()
  const cut = rows.length > MAX_ROWS || rows.some((r) => r.length > MAX_COLS)
  for (const fields of rows.slice(0, MAX_ROWS)) {
    // Con la virgola come separatore i numeri sono all'inglese, con il punto per i decimali.
    model.cells.push(fields.slice(0, MAX_COLS).map((f) => {
      const value = delimiter === ',' ? italian(f.trim()) : f.trim()
      // I numeri restano numeri; i testi che sembrerebbero formule restano testi.
      return value && readNumber(value) ? { input: value } : textCell(value)
    }))
  }
  // La prima riga è l'intestazione se è tutta di testo e sotto ci sono altre righe.
  const first = model.cells[0] ?? []
  if (model.cells.length > 1 && first.some((c) => c?.input) && first.every((c) => !c || !readNumber(c.input))) model.header = true
  return { model, cut }
}

/** Una cella del .csv: tra virgolette se ha il separatore, le virgolette o un a capo. */
function field(text: string): string {
  return /[";\r\n]/.test(text) || /^\s|\s$/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

/** La tabella come .csv per l'Excel italiano: i valori come si vedono, con il punto e virgola. */
export function sheetToCsv(model: SheetModel): string {
  const sheet = new SheetEvaluator(model)
  const { rows, cols } = sheetSize(model)
  const lines: string[] = []
  for (let r = 0; r < rows; r++) {
    const cells: string[] = []
    for (let c = 0; c < cols; c++) {
      const res = sheet.result(r, c)
      cells.push(field(formatValue(res.value, res.format)))
    }
    lines.push(cells.join(';'))
  }
  return `﻿${lines.join('\r\n')}\r\n`
}
