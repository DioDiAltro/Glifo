/**
 * I conti delle tabelle: ogni cella con una formula vale quanto la sua formula, con le celle che
 * usa calcolate prima (una volta sola). Una formula che usa il proprio risultato, anche passando
 * da altre celle, è un riferimento circolare: #RIF!. Il formato del risultato viene da quello che
 * la formula usa (vedi `addFormat` e le altre in format.ts), se la cella non ne ha uno suo.
 */
import { formulaBody, FormulaError, isFormula, parseFormula, type FormulaNode, type Ref } from './formula'
import { addFormat, divFormat, GENERAL, mulFormat, readInput, tidy, type Format } from './format'
import { callFunction, compareValues, power, toNumber, toText, type Arg, type Ctx, type RangeArg, type Res } from './functions'
import type { SheetModel } from './model'
import { cellName } from './refs'
import { isError, sheetError, type SheetError, type Value } from './values'

export interface CellResult {
  value: Value
  format: Format
  /** La cella ha una formula. */
  formula: boolean
}

const EMPTY: CellResult = { value: null, format: GENERAL, formula: false }

/** Il risultato di una formula non può essere più lungo di così (i testi uniti con &). */
const MAX_TEXT = 32767
/** Quante formule una dentro l'altra (A1 usa A2, che usa A3…) prima di fermarsi. */
const MAX_DEPTH = 1000

export class SheetEvaluator {
  private readonly memo = new Map<number, CellResult>()
  private readonly visiting = new Set<number>()
  private readonly trees = new Map<number, FormulaNode | FormulaError>()
  private readonly rows: number
  private readonly cols: number
  private readonly ctx: Ctx
  private depth = 0
  private warm = false

  constructor(private readonly model: SheetModel) {
    this.rows = model.cells.length
    this.cols = Math.max(0, ...model.cells.map((r) => r.length))
    this.ctx = {
      scalar: (node) => this.evaluate(node),
      arg: (node): Arg => {
        if (node.t === 'range') return this.range(node.from, node.to)
        if (node.t === 'ref') return this.range(node.ref, node.ref)
        return { kind: 'scalar', res: this.evaluate(node) }
      },
    }
  }

  private key(row: number, col: number): number {
    return row * 100_000 + col
  }

  /**
   * Il valore della cella (da 0), con il suo formato. La prima volta si calcolano tutte, dall'alto:
   * le formule usano quasi sempre celle sopra, già pronte, e le catene restano corte.
   */
  result(row: number, col: number): CellResult {
    if (!this.warm) {
      this.warm = true
      this.all()
    }
    return this.cell(row, col)
  }

  private cell(row: number, col: number): CellResult {
    if (row < 0 || col < 0 || row >= this.rows || col >= this.cols) return EMPTY
    const key = this.key(row, col)
    const known = this.memo.get(key)
    if (known) return known
    const cell = this.model.cells[row]?.[col]
    if (!cell) return EMPTY
    let result: CellResult
    if (!isFormula(cell.input)) {
      const { value, format } = readInput(cell.input)
      result = { value, format: cell.format ?? format, formula: false }
    } else {
      if (this.visiting.has(key)) {
        // Non si ricorda: il valore lo decide la cella che ha chiuso il giro.
        return { value: sheetError('#RIF!', `Riferimento circolare: ${cellName(row, col)} usa il proprio risultato`), format: GENERAL, formula: true }
      }
      if (this.depth >= MAX_DEPTH) {
        return { value: sheetError('#RIF!', 'Troppe formule una dentro l\'altra'), format: GENERAL, formula: true }
      }
      this.visiting.add(key)
      this.depth++
      try {
        const res = this.formula(key, cell.input)
        // Come in Excel: =A1 con A1 vuota fa 0.
        result = { value: res.v === null ? 0 : res.v, format: cell.format ?? res.f, formula: true }
      } finally {
        this.visiting.delete(key)
        this.depth--
      }
    }
    this.memo.set(key, result)
    return result
  }

  /** Il messaggio di errore della formula della cella, se non si legge. */
  syntaxError(row: number, col: number): string | null {
    const cell = this.model.cells[row]?.[col]
    if (!cell || !isFormula(cell.input)) return null
    const tree = this.tree(this.key(row, col), cell.input)
    return tree instanceof FormulaError ? tree.message : null
  }

  /** Tutte le celle, riga per riga (calcolate dall'alto: così le catene di formule restano corte). */
  all(): CellResult[][] {
    this.warm = true
    const out: CellResult[][] = []
    for (let r = 0; r < this.rows; r++) {
      const row: CellResult[] = []
      for (let c = 0; c < this.cols; c++) row.push(this.cell(r, c))
      out.push(row)
    }
    return out
  }

  private tree(key: number, input: string): FormulaNode | FormulaError {
    let tree = this.trees.get(key)
    if (!tree) {
      try {
        tree = parseFormula(formulaBody(input))
      } catch (err) {
        if (!(err instanceof FormulaError)) throw err
        tree = err
      }
      this.trees.set(key, tree)
    }
    return tree
  }

  private formula(key: number, input: string): Res {
    const tree = this.tree(key, input)
    if (tree instanceof FormulaError) return { v: sheetError('#ERRORE!', tree.message), f: GENERAL }
    return this.evaluate(tree)
  }

  private range(from: Ref, to: Ref): RangeArg {
    const top = Math.min(from.row, to.row)
    const bottom = Math.max(from.row, to.row)
    const left = Math.min(from.col, to.col)
    const right = Math.max(from.col, to.col)
    const res = (r: number, c: number): Res => {
      const cell = this.cell(r, c)
      return { v: cell.value, f: cell.format }
    }
    return {
      kind: 'range',
      rows: bottom - top + 1,
      cols: right - left + 1,
      at: (r, c) => res(top + r, left + c),
      used: () => {
        const out: Res[] = []
        for (let r = top; r <= Math.min(bottom, this.rows - 1); r++) for (let c = left; c <= Math.min(right, this.cols - 1); c++) out.push(res(r, c))
        return out
      },
    }
  }

  private evaluate(node: FormulaNode): Res {
    switch (node.t) {
      case 'num':
      case 'str':
      case 'bool':
        return { v: node.v, f: GENERAL }
      case 'err':
        return { v: sheetError(node.v), f: GENERAL }
      case 'missing':
        return { v: null, f: GENERAL }
      case 'name':
        return { v: sheetError('#NOME?', `Non conosco il nome «${node.name}»: le funzioni vogliono le parentesi, i testi le virgolette`), f: GENERAL }
      case 'ref': {
        const cell = this.cell(node.ref.row, node.ref.col)
        return { v: cell.value, f: cell.format }
      }
      case 'range':
        return { v: sheetError('#VALORE!', 'Un intervallo come A1:B5 va dentro una funzione, come SOMMA(A1:B5)'), f: GENERAL }
      case 'neg': {
        const a = this.evaluate(node.a)
        const n = isError(a.v) ? a.v : toNumber(a.v)
        return isError(n) ? { v: n, f: GENERAL } : { v: -n, f: a.f }
      }
      case 'pct': {
        const a = this.evaluate(node.a)
        const n = isError(a.v) ? a.v : toNumber(a.v)
        if (isError(n)) return { v: n, f: GENERAL }
        return { v: tidy(n / 100), f: { kind: 'percent', decimals: node.a.t === 'num' ? node.a.decimals : 0 } }
      }
      case 'call':
        return callFunction(node.name, node.args, this.ctx)
      case 'bin':
        return this.binary(node.op, node.a, node.b)
    }
  }

  private binary(op: string, left: FormulaNode, right: FormulaNode): Res {
    const a = this.evaluate(left)
    const b = this.evaluate(right)
    if (isError(a.v)) return { v: a.v, f: GENERAL }
    if (isError(b.v)) return { v: b.v, f: GENERAL }
    const av = a.v as Exclude<Value, SheetError>
    const bv = b.v as Exclude<Value, SheetError>
    if (op === '&') {
      const text = (toText(av) as string) + (toText(bv) as string)
      return text.length > MAX_TEXT ? { v: sheetError('#VALORE!', 'Il testo è troppo lungo'), f: GENERAL } : { v: text, f: GENERAL }
    }
    if (op === '=' || op === '<>' || op === '<' || op === '>' || op === '<=' || op === '>=') {
      const d = compareValues(av, bv)
      const v = op === '=' ? d === 0 : op === '<>' ? d !== 0 : op === '<' ? d < 0 : op === '>' ? d > 0 : op === '<=' ? d <= 0 : d >= 0
      return { v, f: GENERAL }
    }
    const x = toNumber(av)
    if (isError(x)) return { v: x, f: GENERAL }
    const y = toNumber(bv)
    if (isError(y)) return { v: y, f: GENERAL }
    switch (op) {
      case '+':
        return number(x + y, addFormat(a.f, b.f))
      case '-':
        return number(x - y, addFormat(a.f, b.f))
      case '*':
        return number(x * y, mulFormat(a.f, b.f))
      case '/':
        return y === 0 ? { v: sheetError('#DIV/0!'), f: GENERAL } : number(x / y, divFormat(a.f, b.f))
      default:
        return power(x, y)
    }
  }
}

function number(n: number, f: Format): Res {
  return Number.isFinite(n) ? { v: tidy(n), f } : { v: sheetError('#NUM!', 'Il risultato è troppo grande'), f: GENERAL }
}

/** I risultati di tutte le celle della tabella. */
export function evaluateSheet(model: SheetModel): CellResult[][] {
  return new SheetEvaluator(model).all()
}
