/**
 * I file .csv delle tabelle: una riga di testo per riga, le celle separate da un carattere. L'Excel
 * italiano li scrive con il punto e virgola e la virgola dei decimali (1.234,50); quelli inglesi con
 * la virgola e il punto dei decimali (1,234.50); alcuni programmi con il tabulatore. Leggendo si
 * capisce da solo il separatore (`csvDelimiter`) e come sono scritti i numeri (`csvNumbers`): nella
 * nota vanno all'italiana, come sempre. Scrivendo si fa come l'Excel della lingua di Glifo: in
 * italiano punto e virgola e 1.234,50 €, in inglese virgola e €1,234.50; i valori come si vedono
 * nella tabella (i risultati delle formule, non le formule: un .csv non le ha), e il BOM perché Excel
 * legga bene le lettere accentate e il simbolo dell'euro.
 */
import { usesDecimalComma } from '../i18n'
import { SheetEvaluator } from './evaluate'
import { formatValue, italianNumber, readNumber, shownStyle } from './format'
import { emptySheet, MAX_COLS, MAX_ROWS, sheetSize, type SheetCell, type SheetModel } from './model'
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

/** Le cifre di un numero senza il segno, l'euro e la percentuale: «-1.234,50 €» → «1.234,50». */
function digitsOf(field: string): string {
  return field
    .replace(/\s/g, '')
    .replace(/^[-−–+]?€?[-−–+]?/, '')
    .replace(/(€|eur|euro|%)$/i, '')
}

/** Si legge in un modo solo: un numero scritto all'italiana (3,5; 1.234,5; 1.234.567) o all'inglese (3.5; 1,234.5; 1,234,567). */
const ITALIAN_ONLY = /^\d{1,3}(?:\.\d{3})+,\d+$|^\d{1,3}(?:\.\d{3}){2,}$|^\d*,\d+$/
const ENGLISH_ONLY = /^\d{1,3}(?:,\d{3})+\.\d+$|^\d{1,3}(?:,\d{3}){2,}$|^\d*\.\d+$/
/** 1.234 e 1,234: le migliaia in una lingua, i decimali nell'altra. */
const AMBIGUOUS = /^[1-9]\d{0,2}[.,]\d{3}$/

/**
 * Come sono scritti i numeri del file: all'italiana (1.234,5) o all'inglese (1,234.5). Contano i
 * numeri che si leggono in un modo solo (3,5 o 3.5; 1.234,5 o 1,234.5); se non ce ne sono (o ce ne
 * sono tanti dei due modi), decide il separatore: il punto e virgola è dell'Excel italiano, la
 * virgola di quello inglese; con il tabulatore la lingua di Glifo.
 */
export function csvNumbers(rows: readonly string[][], delimiter: string): 'it' | 'en' {
  let italian = 0
  let english = 0
  for (const row of rows.slice(0, 500)) {
    for (const field of row) {
      const digits = digitsOf(field.trim())
      if (!digits || AMBIGUOUS.test(digits)) continue
      if (ITALIAN_ONLY.test(digits)) italian++
      else if (ENGLISH_ONLY.test(digits)) english++
    }
  }
  if (italian !== english) return italian > english ? 'it' : 'en'
  if (delimiter === ';') return 'it'
  if (delimiter === ',') return 'en'
  return usesDecimalComma() ? 'it' : 'en'
}

/** Una cella del file: i numeri restano numeri (all'italiana, come nella nota); i testi che sembrerebbero formule o numeri restano testi. */
function csvCell(value: string, english: boolean): SheetCell | undefined {
  if (!value) return textCell(value)
  const number = english ? italianNumber(value) : readNumber(value) ? value : null
  return number ? { input: number } : textCell(value)
}

/** La tabella di un .csv; `cut` se era troppo grande e una parte è rimasta fuori. */
export function csvToSheet(text: string): { model: SheetModel; cut: boolean } {
  const delimiter = csvDelimiter(text)
  const rows = parseCsv(text, delimiter)
  while (rows.length && rows[rows.length - 1].every((f) => !f.trim())) rows.pop()
  const model = emptySheet()
  const cut = rows.length > MAX_ROWS || rows.some((r) => r.length > MAX_COLS)
  const english = csvNumbers(rows, delimiter) === 'en'
  for (const fields of rows.slice(0, MAX_ROWS)) {
    model.cells.push(fields.slice(0, MAX_COLS).map((f) => csvCell(f.trim(), english)))
  }
  // La prima riga è l'intestazione se è tutta di testo e sotto ci sono altre righe.
  const first = model.cells[0] ?? []
  if (model.cells.length > 1 && first.some((c) => c?.input) && first.every((c) => !c || !readNumber(c.input))) model.header = true
  return { model, cut }
}

/** Una cella del .csv: tra virgolette se ha il separatore, le virgolette o un a capo. */
function field(text: string, delimiter: string): string {
  return text.includes(delimiter) || /["\r\n]/.test(text) || /^\s|\s$/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

/**
 * La tabella come .csv per l'Excel della lingua di Glifo: i valori come si vedono, con il punto e
 * virgola in italiano e la virgola in inglese.
 */
export function sheetToCsv(model: SheetModel): string {
  const style = shownStyle()
  const delimiter = style.english ? ',' : ';'
  const sheet = new SheetEvaluator(model)
  const { rows, cols } = sheetSize(model)
  const lines: string[] = []
  for (let r = 0; r < rows; r++) {
    const cells: string[] = []
    for (let c = 0; c < cols; c++) {
      const res = sheet.result(r, c)
      cells.push(field(formatValue(res.value, res.format, style), delimiter))
    }
    lines.push(cells.join(delimiter))
  }
  return `﻿${lines.join('\r\n')}\r\n`
}
