/**
 * Le tabelle nella nota: un blocco ```tabella con una riga di testo per ogni riga della tabella,
 * le celle separate da |, come le tabelle di Markdown. Quello che c'è nelle celle è quello che si
 * scrive in Excel: numeri, testi, formule.
 *
 * ```tabella
 * | Prodotto | Quantità | Prezzo | Totale |
 * | --- | ---: | ---: | ---: |
 * | Penne | 10 | 1,50 € | =B2*C2 |
 * | Quaderni | 5 | 2,00 € | =B3*C3 |
 * | **Totale** | | | **=SOMMA(D2:D3)** |
 * ```
 *
 * La riga con i trattini dopo la prima dice che la prima riga è l'intestazione (e come allineare le
 * colonne); non conta tra le righe: Penne è la riga 2, come in Excel. Il grassetto si scrive come in
 * Markdown, il formato tra graffe in fondo alla cella quando non si capisce già da quello che c'è
 * scritto: =D3/D5 {0,0%} (vedi `formatCode`). Il carattere | dentro una cella si scrive \|.
 */
import { formatCode, parseFormatCode, type Format } from './format'

export interface SheetCell {
  /** Quello che si scrive nella cella: un numero, un testo o una formula che comincia con =. */
  input: string
  bold?: boolean
  /** Il formato scelto per la cella; senza, quello che si capisce dal contenuto. */
  format?: Format
}

export type Align = 'left' | 'center' | 'right'

export interface SheetModel {
  /** Le righe, ognuna con le sue celle (quelle che mancano sono vuote). */
  cells: (SheetCell | undefined)[][]
  /** La prima riga è l'intestazione. */
  header: boolean
  /** L'allineamento scelto per le colonne (dalla riga con i trattini); null: secondo il contenuto. */
  align: (Align | null)[]
}

/** Quante righe e colonne al massimo: le tabelle delle note sono piccole. */
export const MAX_ROWS = 2000
export const MAX_COLS = 200

export function emptySheet(): SheetModel {
  return { cells: [], header: false, align: [] }
}

const DELIMITER_CELL = /^:?-{3,}:?$/

/** Le celle di una riga di testo: tolte la | in testa e in fondo, divise dove c'è una | senza \ davanti. */
export function splitRow(line: string): string[] {
  let s = line.trim()
  if (s.startsWith('|')) s = s.slice(1)
  if (s.endsWith('|') && !s.endsWith('\\|')) s = s.slice(0, -1)
  const cells: string[] = []
  let current = ''
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (ch === '\\' && s[i + 1] === '|') {
      current += '\\|'
      i++
    } else if (ch === '|') {
      cells.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  cells.push(current)
  return cells.map((c) => c.trim())
}

/** La riga con i trattini di Markdown (| --- | ---: |), che dice che sopra c'è l'intestazione. */
export function isDelimiterRow(line: string): boolean {
  const cells = splitRow(line)
  return line.includes('-') && cells.every((c) => DELIMITER_CELL.test(c.replace(/\s+/g, '')))
}

function alignOf(cell: string): Align | null {
  const c = cell.replace(/\s+/g, '')
  const left = c.startsWith(':')
  const right = c.endsWith(':')
  return left && right ? 'center' : right ? 'right' : left ? 'left' : null
}

/** Il formato scritto in fondo alla cella tra graffe (non scappate con \{). */
const FORMAT_TAG = /(^|[^\\])\{([^{}]*)\}$/
const BOLD = /^\*\*((?:(?!\*\*)[\s\S])+)\*\*$/

/** Una cella dal suo testo nel blocco. */
export function parseCell(text: string): SheetCell | undefined {
  let s = text.trim()
  let format: Format | undefined
  const tag = FORMAT_TAG.exec(s)
  if (tag) {
    const parsed = parseFormatCode(tag[2])
    if (parsed) {
      format = parsed
      s = s.slice(0, tag.index + tag[1].length).trim()
    }
  }
  let bold = false
  const b = BOLD.exec(s)
  if (b) {
    bold = true
    s = b[1].trim()
  }
  const input = s.replace(/\\\|/g, '|').replace(/\\\{/g, '{')
  if (!input && !format) return undefined
  return { input, ...(bold && input && { bold }), ...(format && { format }) }
}

/** La tabella dal testo del blocco (senza le righe ```). */
export function parseSheet(source: string): SheetModel {
  const lines = source.split('\n').filter((l) => l.trim())
  const model = emptySheet()
  lines.forEach((line, i) => {
    if (i === 1 && isDelimiterRow(line)) {
      model.header = true
      model.align = splitRow(line).map(alignOf)
      return
    }
    if (model.cells.length >= MAX_ROWS) return
    model.cells.push(splitRow(line).slice(0, MAX_COLS).map(parseCell))
  })
  return model
}

/** Quante righe e colonne servono: fino all'ultima cella con qualcosa dentro. */
export function sheetSize(model: SheetModel): { rows: number; cols: number } {
  let rows = 0
  let cols = 0
  model.cells.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (!cell) return
      rows = Math.max(rows, r + 1)
      cols = Math.max(cols, c + 1)
    })
  })
  return { rows, cols }
}

/** Il testo di una cella nel blocco. */
export function serializeCell(cell: SheetCell | undefined): string {
  if (!cell) return ''
  let s = cell.input.replace(/\s*\r?\n\s*/g, ' ').trim().replace(/\|/g, '\\|')
  // Un testo che finisce con un formato tra graffe resterebbe un formato: la graffa si scappa.
  const tag = FORMAT_TAG.exec(s)
  if (tag && parseFormatCode(tag[2])) s = `${s.slice(0, tag.index + tag[1].length)}\\${s.slice(tag.index + tag[1].length)}`
  if (cell.bold && s) s = `**${s}**`
  if (cell.format) s = `${s} {${formatCode(cell.format)}}`.trim()
  return s
}

/** Il testo del blocco: una riga per riga, tutte con lo stesso numero di celle. Vuota: «». */
export function serializeSheet(model: SheetModel): string {
  const { rows, cols } = sheetSize(model)
  if (!rows) return ''
  const width = Math.max(cols, 1)
  const line = (cells: string[]) => `| ${cells.join(' | ')} |`
  const lines: string[] = []
  for (let r = 0; r < rows; r++) {
    const row = model.cells[r] ?? []
    lines.push(line(Array.from({ length: width }, (_, c) => serializeCell(row[c]))))
    if (r === 0 && model.header) {
      lines.push(line(Array.from({ length: width }, (_, c) => {
        const a = model.align[c] ?? null
        return a === 'center' ? ':---:' : a === 'right' ? '---:' : a === 'left' ? ':---' : '---'
      })))
    }
  }
  return lines.join('\n')
}

/** Il blocco da mettere nella nota. */
export function sheetBlockText(source: string): string {
  return '```tabella\n' + source + (source ? '\n' : '') + '```'
}
