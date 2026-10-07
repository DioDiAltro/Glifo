/**
 * I dati di una tabella per un grafico. Nel blocco ```grafico la riga `dati: A8:D13` prende i numeri
 * della tabella scritta prima del grafico nella nota, come i grafici di Excel: la prima colonna
 * dell'intervallo va sull'asse x, le altre sono le linee; la prima riga, se è di testo, ne dà i nomi.
 * I numeri sono quelli calcolati dalle formule, con il formato della colonna. Il pulsante «Grafico»
 * dell'editor delle tabelle sceglie le celle (`chartRange`) e scrive le righe del blocco
 * (`chartLines`), con `pareggio:` quando ci sono i ricavi e i costi totali.
 */
import { SheetEvaluator, type CellResult } from './evaluate'
import { GENERAL, type Format } from './format'
import { parseSheet, type SheetModel } from './model'
import type { CellRange } from './ops'
import { colIndex, colName, rangeName } from './refs'

export interface ChartTable {
  /** L'intervallo, come nella riga del blocco (A8:D13). */
  range: string
  /** I nomi delle colonne: il primo è quello dell'asse x ('' se la prima riga non è di testo). */
  names: string[]
  /** Le righe con un numero nella prima colonna: x e il valore di ogni linea (null se nella cella non c'è un numero). */
  rows: (number | null)[][]
  /** Il formato di ogni colonna (quello del suo primo numero), per scrivere i valori come nella tabella. */
  formats: Format[]
}

/** I dati per il grafico, o perché non ci sono (il messaggio sotto il grafico). */
export type ChartData = { table: ChartTable; error?: undefined } | { table?: undefined; error: string }

export const NO_TABLE = 'Prima del grafico, nella nota, non c\'è una tabella: i dati vengono dalla tabella scritta sopra'

const RANGE = /^\$?([A-Za-z]{1,3})\$?([1-9]\d{0,6})\s*:\s*\$?([A-Za-z]{1,3})\$?([1-9]\d{0,6})$/

/** Le celle di un intervallo scritto come in Excel (A8:D13, anche con i $ e al contrario); null se non lo è. */
export function parseRange(text: string): CellRange | null {
  const m = RANGE.exec(text.trim())
  if (!m) return null
  const [r1, c1, r2, c2] = [Number(m[2]) - 1, colIndex(m[1]), Number(m[4]) - 1, colIndex(m[3])]
  return { top: Math.min(r1, r2), left: Math.min(c1, c2), bottom: Math.max(r1, r2), right: Math.max(c1, c2) }
}

/** I dati dell'intervallo `range` della tabella `source` (il testo del blocco ```tabella; null se non c'è). */
export function chartData(source: string | null | undefined, range: string): ChartData {
  if (source == null) return { error: NO_TABLE }
  const r = parseRange(range)
  if (!r) return { error: 'Scrivi le celle dei dati come in Excel, per esempio dati: A8:D13' }
  return chartFrom(new SheetEvaluator(parseSheet(source)), r)
}

type Results = Pick<SheetEvaluator, 'result'>

const isNumber = (res: CellResult) => typeof res.value === 'number' && Number.isFinite(res.value)

function chartFrom(sheet: Results, r: CellRange): ChartData {
  if (r.right === r.left) return { error: 'Servono almeno due colonne: la prima con i numeri dell\'asse x, le altre con le linee' }
  const cols = r.right - r.left + 1
  const first = Array.from({ length: cols }, (_, c) => sheet.result(r.top, r.left + c))
  // La prima riga è quella dei nomi se non ha numeri e ha almeno un testo (come in Excel).
  const header = first.every((res) => !isNumber(res)) && first.some((res) => typeof res.value === 'string' && res.value.trim() !== '')
  const names = first.map((res, c) => {
    const text = header && typeof res.value === 'string' ? res.value.trim() : ''
    return text || (c ? `Colonna ${colName(r.left + c)}` : '')
  })
  const rows: (number | null)[][] = []
  const formats: (Format | null)[] = Array.from({ length: cols }, () => null)
  for (let row = header ? r.top + 1 : r.top; row <= r.bottom; row++) {
    const cells = Array.from({ length: cols }, (_, c) => sheet.result(row, r.left + c))
    if (!isNumber(cells[0])) continue
    rows.push(cells.map((res, c) => {
      if (!isNumber(res)) return null
      formats[c] ??= res.format
      return res.value as number
    }))
  }
  const xName = colName(r.left)
  if (rows.length < 2) return { error: `Nella prima colonna (${xName}) servono almeno due numeri: sono i valori dell'asse x` }
  if (!rows.some((row) => row.slice(1).some((v) => v !== null))) return { error: 'Nelle altre colonne servono dei numeri: sono le linee del grafico' }
  return { table: { range: rangeName(r.top, r.left, r.bottom, r.right), names, rows, formats: formats.map((f) => f ?? GENERAL) } }
}

// ——— Il pulsante «Grafico» dell'editor ———

/**
 * Il blocco di celle piene attorno alla cella (`row`, `col`), come la «zona corrente» di Excel: si
 * allarga finché accanto (anche in diagonale) c'è qualcosa.
 */
export function currentRegion(model: SheetModel, row: number, col: number): CellRange {
  const filled = (r: number, c: number) => r >= 0 && c >= 0 && !!model.cells[r]?.[c]
  const rowHas = (r: number, c0: number, c1: number) => {
    for (let c = Math.max(0, c0); c <= c1; c++) if (filled(r, c)) return true
    return false
  }
  const colHas = (c: number, r0: number, r1: number) => {
    for (let r = Math.max(0, r0); r <= r1; r++) if (filled(r, c)) return true
    return false
  }
  const region = { top: row, left: col, bottom: row, right: col }
  for (let grew = true; grew; ) {
    grew = false
    if (region.top > 0 && rowHas(region.top - 1, region.left - 1, region.right + 1)) [region.top, grew] = [region.top - 1, true]
    if (rowHas(region.bottom + 1, region.left - 1, region.right + 1)) [region.bottom, grew] = [region.bottom + 1, true]
    if (region.left > 0 && colHas(region.left - 1, region.top - 1, region.bottom + 1)) [region.left, grew] = [region.left - 1, true]
    if (colHas(region.right + 1, region.top - 1, region.bottom + 1)) [region.right, grew] = [region.right + 1, true]
  }
  return region
}

/**
 * Le celle da mettere nel grafico: quelle scelte o, con una cella sola, il blocco attorno a lei; se lì
 * non ci sono dati da disegnare (per esempio sulle celle dei costi e del prezzo), il primo blocco
 * della tabella che li ha.
 */
export function chartRange(model: SheetModel, selection: CellRange): CellRange {
  if (selection.top !== selection.bottom || selection.left !== selection.right) return selection
  const sheet = new SheetEvaluator(model)
  const here = currentRegion(model, selection.top, selection.left)
  if (chartFrom(sheet, here).table) return here
  const seen = new Set<string>()
  for (let r = 0; r < model.cells.length; r++) {
    const row = model.cells[r] ?? []
    for (let c = 0; c < row.length; c++) {
      if (!row[c] || seen.has(`${r},${c}`)) continue
      const region = currentRegion(model, r, c)
      for (let rr = region.top; rr <= region.bottom; rr++) for (let cc = region.left; cc <= region.right; cc++) seen.add(`${rr},${cc}`)
      if (chartFrom(sheet, region).table) return region
    }
  }
  return here
}

/** Le colonne dei ricavi e dei costi totali (per il punto di pareggio), e quelle del risultato. */
export const REVENUE = /^(ricavi|ricavo|fatturato|rt)\b/i
export const TOTAL_COST = /^(costi totali|costo totale|ct)\b/i
const RESULT = /^(utile|perdita|risultato|reddito)\b/i

/**
 * Le righe del blocco ```grafico per le celle `range`: i nomi degli assi, `dati:` e, se ci sono i
 * ricavi e i costi totali, il titolo e `pareggio:` (senza la colonna dell'utile in fondo, che le aree
 * del grafico mostrano già). O perché non si può fare.
 */
export function chartLines(model: SheetModel, range: CellRange): { lines: string[]; error?: undefined } | { lines?: undefined; error: string } {
  const sheet = new SheetEvaluator(model)
  let r = range
  let data = chartFrom(sheet, r)
  if (!data.table) return { error: data.error }
  const revenue = data.table.names.slice(1).find((n) => REVENUE.test(n))
  const cost = data.table.names.slice(1).find((n) => TOTAL_COST.test(n))
  const breakEven = !!revenue && !!cost
  if (breakEven) {
    let right = r.right
    while (right > r.left + 1 && RESULT.test(data.table.names[right - r.left])) right--
    if (right !== r.right) {
      r = { ...r, right }
      data = chartFrom(sheet, r)
      if (!data.table) return { error: data.error }
    }
  }
  const { names, formats } = data.table
  const lines: string[] = []
  if (breakEven) lines.push('titolo: Punto di pareggio')
  // Nei nomi degli assi le formule stanno tra $: un $ del testo non deve aprirne una.
  if (names[0]) lines.push(`asse x: ${names[0].replace(/\$/g, '')}`)
  if (formats.slice(1).every((f) => f.kind === 'euro')) lines.push('asse y: €')
  lines.push(`dati: ${data.table.range}`)
  if (breakEven) lines.push(`pareggio: ${revenue}, ${cost}`)
  return { lines }
}
