/**
 * I nomi delle celle, come in Excel: la colonna con le lettere (A, B, …, Z, AA, AB…) e la riga con il
 * numero, da 1. Nel codice righe e colonne contano da 0: B2 è { row: 1, col: 1 }.
 */

export interface CellAddress {
  row: number
  col: number
}

/** Le lettere della colonna `col` (da 0): 0 → A, 25 → Z, 26 → AA. */
export function colName(col: number): string {
  let n = col + 1
  let s = ''
  while (n > 0) {
    const r = (n - 1) % 26
    s = String.fromCharCode(65 + r) + s
    n = Math.floor((n - 1) / 26)
  }
  return s
}

/** Il numero della colonna (da 0) dalle sue lettere: A → 0, AA → 26. */
export function colIndex(letters: string): number {
  let n = 0
  for (const ch of letters.toUpperCase()) n = n * 26 + (ch.charCodeAt(0) - 64)
  return n - 1
}

/** Il nome della cella: (1, 1) → B2. */
export function cellName(row: number, col: number): string {
  return colName(col) + (row + 1)
}

/** La cella dal suo nome (anche con i $ di Excel); null se non è il nome di una cella. */
export function parseCellName(name: string): CellAddress | null {
  const m = /^\$?([A-Za-z]{1,3})\$?([1-9]\d{0,6})$/.exec(name.trim())
  if (!m) return null
  return { row: Number(m[2]) - 1, col: colIndex(m[1]) }
}

/** Il nome di un rettangolo di celle: B2:D5, o B2 se è una cella sola. */
export function rangeName(top: number, left: number, bottom: number, right: number): string {
  const a = cellName(top, left)
  return top === bottom && left === right ? a : `${a}:${cellName(bottom, right)}`
}
