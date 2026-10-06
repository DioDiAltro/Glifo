/**
 * Le modifiche alle tabelle che fa l'editor, come in Excel: aggiungere e togliere righe e colonne
 * (le formule si aggiustano), copiare e incollare (le formule seguono la cella, il $ no), riempire
 * in basso o a destra (anche le serie: 1, 2 → 3, 4, 5), la somma automatica, gli appunti con Excel e
 * Fogli Google (testo con le tabulazioni). Lavorano su una copia della tabella (`cloneSheet`).
 */
import type { CellResult } from './evaluate'
import { formatValue } from './format'
import { adjustFormula, isFormula, shiftFormula } from './formula'
import { isDelimiterRow, MAX_COLS, MAX_ROWS, parseCell, splitRow, type SheetCell, type SheetModel } from './model'
import { rangeName } from './refs'

export interface CellRange {
  top: number
  left: number
  bottom: number
  right: number
}

export function cloneSheet(model: SheetModel): SheetModel {
  return {
    header: model.header,
    align: [...model.align],
    cells: model.cells.map((row) => row.map((c) => (c ? { ...c } : undefined))),
  }
}

export function getCell(model: SheetModel, row: number, col: number): SheetCell | undefined {
  return model.cells[row]?.[col]
}

/** Mette la cella (undefined la svuota). */
export function setCell(model: SheetModel, row: number, col: number, cell: SheetCell | undefined): void {
  const empty = !cell || (!cell.input && !cell.format)
  if (empty && !model.cells[row]?.[col]) return
  while (model.cells.length <= row) model.cells.push([])
  const line = model.cells[row]
  while (line.length <= col) line.push(undefined)
  line[col] = empty ? undefined : cell
}

/** Ogni cella con una formula, riscritta da `fn`. */
function mapFormulas(model: SheetModel, fn: (input: string) => string): void {
  for (const row of model.cells) {
    row.forEach((cell, c) => {
      if (cell && isFormula(cell.input)) row[c] = { ...cell, input: fn(cell.input) }
    })
  }
}

/** Aggiunge `count` righe vuote prima della riga `at` (da 0). */
export function insertRows(model: SheetModel, at: number, count = 1): void {
  if (model.cells.length > at) model.cells.splice(at, 0, ...Array.from({ length: count }, () => []))
  mapFormulas(model, (input) => adjustFormula(input, 'row', at, count))
}

/** Toglie `count` righe a partire dalla riga `at`. */
export function deleteRows(model: SheetModel, at: number, count = 1): void {
  model.cells.splice(at, count)
  mapFormulas(model, (input) => adjustFormula(input, 'row', at, -count))
  if (at === 0 && model.header) model.header = false
}

/** Aggiunge `count` colonne vuote prima della colonna `at`. */
export function insertCols(model: SheetModel, at: number, count = 1): void {
  for (const row of model.cells) if (row.length > at) row.splice(at, 0, ...Array.from({ length: count }, () => undefined))
  if (model.align.length > at) model.align.splice(at, 0, ...Array.from({ length: count }, () => null))
  mapFormulas(model, (input) => adjustFormula(input, 'col', at, count))
}

/** Toglie `count` colonne a partire dalla colonna `at`. */
export function deleteCols(model: SheetModel, at: number, count = 1): void {
  for (const row of model.cells) row.splice(at, count)
  model.align.splice(at, count)
  mapFormulas(model, (input) => adjustFormula(input, 'col', at, -count))
}

/** Svuota le celle del rettangolo. */
export function clearRange(model: SheetModel, r: CellRange): void {
  for (let row = r.top; row <= r.bottom; row++) for (let col = r.left; col <= r.right; col++) setCell(model, row, col, undefined)
}

/** Le celle copiate, con il punto da cui vengono (per spostare le formule incollandole). */
export interface Clip {
  rows: number
  cols: number
  cells: (SheetCell | undefined)[][]
  from: { row: number; col: number }
}

export function copyRange(model: SheetModel, r: CellRange): Clip {
  const cells: (SheetCell | undefined)[][] = []
  for (let row = r.top; row <= r.bottom; row++) {
    const line: (SheetCell | undefined)[] = []
    for (let col = r.left; col <= r.right; col++) {
      const cell = getCell(model, row, col)
      line.push(cell ? { ...cell } : undefined)
    }
    cells.push(line)
  }
  return { rows: r.bottom - r.top + 1, cols: r.right - r.left + 1, cells, from: { row: r.top, col: r.left } }
}

/**
 * Incolla le celle copiate a partire da (`row`, `col`): le formule si spostano come la cella. Se il
 * rettangolo scelto è un multiplo di quello copiato (una cella in tutta la colonna), lo ripete.
 * Il rettangolo dove sono finite.
 */
export function pasteClip(model: SheetModel, clip: Clip, target: CellRange): CellRange {
  const timesDown = Math.max(1, Math.floor((target.bottom - target.top + 1) / clip.rows))
  const timesAcross = Math.max(1, Math.floor((target.right - target.left + 1) / clip.cols))
  const rows = Math.min(clip.rows * timesDown, MAX_ROWS - target.top)
  const cols = Math.min(clip.cols * timesAcross, MAX_COLS - target.left)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const src = clip.cells[r % clip.rows][c % clip.cols]
      const row = target.top + r
      const col = target.left + c
      if (!src) {
        setCell(model, row, col, undefined)
        continue
      }
      const moved = isFormula(src.input) ? shiftFormula(src.input, row - (clip.from.row + (r % clip.rows)), col - (clip.from.col + (c % clip.cols))) : src.input
      setCell(model, row, col, { ...src, input: moved })
    }
  }
  return { top: target.top, left: target.left, bottom: target.top + rows - 1, right: target.left + cols - 1 }
}

/** Un numero scritto senza formati strani (per le serie): «5», «1,5». */
function plainNumber(input: string): number | null {
  const s = input.trim()
  return /^-?\d+(?:,\d+)?$/.test(s) ? Number(s.replace(',', '.')) : null
}

function writeNumber(x: number): string {
  return String(Number(x.toPrecision(15))).replace('.', ',')
}

/**
 * Riempie il rettangolo `target` partendo da `source` (le sue prime righe o colonne), verso il basso
 * o verso destra, come la maniglia di Excel: le formule si spostano, i testi si ripetono e due o più
 * numeri in fila continuano la serie (1, 2 → 3, 4…).
 */
export function fillRange(model: SheetModel, source: CellRange, target: CellRange, direction: 'down' | 'right'): void {
  const down = direction === 'down'
  const lanes = down ? source.right - source.left + 1 : source.bottom - source.top + 1
  const length = down ? source.bottom - source.top + 1 : source.right - source.left + 1
  const end = down ? target.bottom : target.right
  const start = down ? source.bottom + 1 : source.right + 1
  for (let lane = 0; lane < lanes; lane++) {
    const at = (i: number) => (down ? { row: source.top + i, col: source.left + lane } : { row: source.top + lane, col: source.left + i })
    const seeds = Array.from({ length }, (_, i) => getCell(model, at(i).row, at(i).col))
    const numbers = seeds.map((c) => (c && !c.format ? plainNumber(c.input) : null))
    const series = length >= 2 && numbers.every((n) => n !== null)
    const step = series ? ((numbers[length - 1] as number) - (numbers[0] as number)) / (length - 1) : 0
    for (let pos = start; pos <= end; pos++) {
      const i = pos - (down ? source.top : source.left)
      const seed = seeds[i % length]
      const dest = down ? { row: pos, col: source.left + lane } : { row: source.top + lane, col: pos }
      if (series) {
        setCell(model, dest.row, dest.col, { ...seeds[length - 1]!, input: writeNumber((numbers[0] as number) + step * i) })
        continue
      }
      if (!seed) {
        setCell(model, dest.row, dest.col, undefined)
        continue
      }
      const from = at(i % length)
      const input = isFormula(seed.input) ? shiftFormula(seed.input, dest.row - from.row, dest.col - from.col) : seed.input
      setCell(model, dest.row, dest.col, { ...seed, input })
    }
  }
}

/**
 * La somma automatica (Σ di Excel) per la cella: i numeri subito sopra, in fila, o se sopra non ce
 * ne sono quelli subito a sinistra. Null se non ci sono numeri vicini.
 */
export function autoSum(results: CellResult[][], row: number, col: number): string | null {
  const isNumber = (r: number, c: number) => typeof results[r]?.[c]?.value === 'number'
  if (row > 0 && isNumber(row - 1, col)) {
    let first = row - 1
    while (first > 0 && isNumber(first - 1, col)) first--
    return `=SOMMA(${rangeName(first, col, row - 1, col)})`
  }
  if (col > 0 && isNumber(row, col - 1)) {
    let left = col - 1
    while (left > 0 && isNumber(row, left - 1)) left--
    return `=SOMMA(${rangeName(row, left, row, col - 1)})`
  }
  return null
}

// ——— Gli appunti, con Excel e Fogli Google ———

/** Le celle come le copia Excel: i valori come si vedono, separati da tabulazioni e a capo. */
export function rangeToTsv(model: SheetModel, results: CellResult[][], r: CellRange): string {
  const lines: string[] = []
  for (let row = r.top; row <= r.bottom; row++) {
    const cells: string[] = []
    for (let col = r.left; col <= r.right; col++) {
      const res = results[row]?.[col]
      let text = res ? formatValue(res.value, res.format) : (getCell(model, row, col)?.input ?? '')
      if (/[\t\n"]/.test(text)) text = `"${text.replace(/"/g, '""')}"`
      cells.push(text)
    }
    lines.push(cells.join('\t'))
  }
  return lines.join('\n')
}

/** Il testo incollato (da Excel, da Fogli Google, da una tabella di testo) come righe di celle. */
export function parseTsv(text: string): string[][] {
  const src = text.replace(/\r\n?/g, '\n').replace(/\n$/, '')
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  for (let i = 0; i < src.length; i++) {
    const ch = src[i]
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') {
        cell += '"'
        i++
      } else if (ch === '"') {
        quoted = false
      } else {
        cell += ch
      }
    } else if (ch === '"' && !cell) {
      quoted = true
    } else if (ch === '\t') {
      row.push(cell)
      cell = ''
    } else if (ch === '\n') {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else {
      cell += ch
    }
  }
  row.push(cell)
  rows.push(row)
  return rows.map((r) => r.map((c) => c.replace(/\n/g, ' ').trim()))
}

/** Le celle da incollare dal testo: senza tabulazioni e con le | è una tabella di Markdown (anche con grassetto e formati). */
export function clipFromText(text: string): Clip {
  const lines = text.trim().split(/\r?\n/)
  let cells: (SheetCell | undefined)[][]
  if (!text.includes('\t') && lines.every((l) => l.trim().startsWith('|'))) {
    cells = lines.filter((l, i) => !(i === 1 && isDelimiterRow(l))).map((l) => splitRow(l).map(parseCell))
  } else {
    cells = parseTsv(text).map((r) => r.map((c) => (c ? { input: c } : undefined)))
  }
  const cols = Math.max(1, ...cells.map((r) => r.length))
  return { rows: cells.length, cols, cells: cells.map((r) => Array.from({ length: cols }, (_, c) => r[c])), from: { row: 0, col: 0 } }
}
