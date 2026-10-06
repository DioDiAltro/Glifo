/**
 * L'editor delle tabelle, a tutto schermo come quello degli schemi e fatto come Excel: la griglia
 * con le lettere delle colonne e i numeri delle righe, la casella con il nome della cella e la barra
 * della formula, i tasti di Excel (frecce, Invio, Tab, F2, F4, Canc, Ctrl+C/X/V/Z/Y/B/D/R/A),
 * i formati (euro, percentuale, punti delle migliaia, decimali), il grassetto, le righe e le colonne
 * da aggiungere e togliere (le formule si aggiustano), la somma automatica, la maniglia per
 * riempire, i suggerimenti delle funzioni mentre si scrive e i modelli pronti.
 *
 * Mentre si scrive una formula, un clic su una cella (o le frecce, subito dopo un operatore) ne
 * scrive il nome, come in Excel; le celle usate dalla formula si colorano. Menu e messaggi stanno
 * dentro la finestra dell'editor, che è modale.
 */
import { confirmDialog } from '../ui/dialogs'
import { h, icon, ICONS } from '../ui/dom'
import { SheetEvaluator, type CellResult } from './evaluate'
import { decimalsOf, formatValue, generalNumber, GENERAL, MAX_DECIMALS, readInput, sameFormat, type Format } from './format'
import { formulaRefs, isFormula, normalizeFormula, tokenize } from './formula'
import { allFunctions, lookupFunction, type FunctionSpec } from './functions'
import { MAX_COLS, MAX_ROWS, parseSheet, serializeSheet, sheetSize, type SheetCell, type SheetModel } from './model'
import {
  autoSum,
  clearRange,
  clipFromText,
  cloneSheet,
  copyRange,
  deleteCols,
  deleteRows,
  fillRange,
  getCell,
  insertCols,
  insertRows,
  pasteClip,
  rangeToTsv,
  setCell,
  type CellRange,
  type Clip,
} from './ops'
import { cellName, colName, parseCellName, rangeName } from './refs'
import { TEMPLATES } from './templates'
import { isError } from './values'

export interface SheetEditorOptions {
  sheet: SheetModel
  /** Mette la tabella nella nota: con «Fatto» e con Ctrl+S (che lascia aperto l'editor). */
  onSave(sheet: SheetModel): void
}

/** Apre l'editor; la promessa si risolve quando lo si chiude. */
export function openSheetEditor(options: SheetEditorOptions): Promise<void> {
  return new Promise((resolve) => {
    new SheetEditor(options, resolve)
  })
}

const PATHS = {
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  redo: '<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  templates: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><path d="M17 14v6M14 17h6"/>',
  rows: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9.5h18M3 14.5h18"/>',
  cols: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/>',
} as const

/** Quante righe e colonne vuote si vedono dopo la tabella, per continuare a scrivere. */
const EXTRA_ROWS = 6
const EXTRA_COLS = 2
const MIN_ROWS = 20
const MIN_COLS = 8
/** I colori dei riferimenti della formula che si sta scrivendo (come in Excel). */
const REF_COLORS = 6

interface Snapshot {
  model: SheetModel
  active: { row: number; col: number }
  anchor: { row: number; col: number }
}

interface Editing {
  row: number
  col: number
  /** «Invio»: si è cominciato scrivendo, le frecce confermano e si spostano (o scelgono una cella nella formula). */
  enter: boolean
  /** Il riferimento scritto con le frecce o con il mouse: le frecce lo cambiano. */
  point: { from: number; to: number; row: number; col: number; anchor: { row: number; col: number } } | null
}

interface MenuEntry {
  label: string
  keys?: string
  run(): void
  disabled?: boolean
}

type Move = 'down' | 'up' | 'right' | 'left' | null

class SheetEditor {
  private model: SheetModel
  private results: CellResult[][] = []
  private saved: string
  private closed = false
  private undoStack: Snapshot[] = []
  private redoStack: Snapshot[] = []
  private active = { row: 0, col: 0 }
  private anchor = { row: 0, col: 0 }
  private rows = MIN_ROWS
  private cols = MIN_COLS
  private editing: Editing | null = null
  private clip: { clip: Clip; text: string } | null = null
  private drag: { kind: 'cells' | 'rows' | 'cols' | 'fill' | 'point'; pointer: number } | null = null
  private fillTarget: CellRange | null = null
  private suggestions: { list: FunctionSpec[]; index: number; from: number; to: number; input: HTMLInputElement } | null = null
  private statusTimer = 0
  private menu: HTMLElement | null = null
  /** Dove si è cominciato a andare avanti con Tab: Invio torna lì, una riga sotto (come Excel). */
  private tabColumn: number | null = null
  private measure: CanvasRenderingContext2D | null = null
  private readonly cleanups: (() => void)[] = []

  private readonly dialog: HTMLDialogElement
  private readonly grid: HTMLElement
  private readonly canvas: HTMLElement
  private readonly table: HTMLTableElement
  private readonly cellInput: HTMLInputElement
  private readonly bar: HTMLInputElement
  private readonly address: HTMLInputElement
  private readonly hint: HTMLElement
  private readonly status: HTMLElement
  private readonly handle: HTMLElement
  private readonly suggest: HTMLElement
  private readonly undoButton: HTMLButtonElement
  private readonly redoButton: HTMLButtonElement
  private readonly headerButton: HTMLButtonElement
  private readonly boldButton: HTMLButtonElement

  constructor(
    private readonly options: SheetEditorOptions,
    private readonly resolve: () => void,
  ) {
    this.model = cloneSheet(options.sheet)
    this.saved = serializeSheet(this.model)

    const iconButton = (label: string, paths: string, run: () => void, extra = '') =>
      h(
        'button',
        { class: `icon-button ${extra}`.trim(), title: label, attrs: { type: 'button', 'aria-label': label }, on: { click: () => this.toolbarRun(run) } },
        icon(paths, 18),
      )
    const textButton = (text: string, label: string, run: () => void, extra = '') =>
      h('button', { class: `sheet-tool ${extra}`.trim(), title: label, attrs: { type: 'button', 'aria-label': label }, on: { click: () => this.toolbarRun(run) } }, text)
    const sep = () => h('span', { class: 'toolbar-sep', attrs: { 'aria-hidden': 'true' } })

    this.undoButton = iconButton('Annulla (Ctrl+Z)', PATHS.undo, () => this.runUndo(false))
    this.redoButton = iconButton('Ripeti (Ctrl+Y)', PATHS.redo, () => this.runUndo(true))
    this.boldButton = iconButton('Grassetto (Ctrl+B)', ICONS.bold, () => this.toggleBold(), 'sheet-toggle')
    this.headerButton = textButton('Intestazione', 'La prima riga è l\'intestazione della tabella', () => this.toggleHeader(), 'sheet-toggle')
    this.status = h('span', { class: 'schema-status', attrs: { 'aria-live': 'polite' } })

    const bar = h(
      'header',
      { class: 'schema-bar sheet-bar' },
      h('h2', { class: 'schema-title' }, 'Tabella'),
      h(
        'div',
        { class: 'schema-tools sheet-tools', attrs: { role: 'toolbar', 'aria-label': 'Strumenti della tabella' } },
        this.undoButton,
        this.redoButton,
        sep(),
        textButton('Σ', 'Somma automatica: la somma dei numeri sopra (o a sinistra)', () => this.runAutoSum(), 'sheet-sigma'),
        textButton('€', 'Euro: 1.234,50 €', () => this.toggleFormat('euro')),
        textButton('%', 'Percentuale: 22%', () => this.toggleFormat('percent')),
        textButton('000', 'Numero con i punti delle migliaia: 1.234,50', () => this.toggleFormat('number')),
        textButton('←,0', 'Meno decimali', () => this.changeDecimals(-1)),
        textButton(',00→', 'Più decimali', () => this.changeDecimals(1)),
        sep(),
        this.boldButton,
        this.headerButton,
        sep(),
        this.menuButton('Righe', 'Aggiungi o togli righe', PATHS.rows, () => this.rowEntries()),
        this.menuButton('Colonne', 'Aggiungi o togli colonne', PATHS.cols, () => this.colEntries()),
      ),
      h('div', { class: 'schema-spacer' }),
      this.status,
      this.menuButton('Modelli', 'Tabelle pronte da cui partire', PATHS.templates, () =>
        TEMPLATES.map((t) => ({ label: t.name, run: () => void this.applyTemplate(t.source) })),
      ),
      h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => void this.requestClose() } }, 'Chiudi'),
      h('button', { class: 'btn btn-primary', attrs: { type: 'button' }, on: { click: () => this.finish() } }, 'Fatto'),
    )

    this.address = h('input', {
      class: 'sheet-address',
      attrs: { type: 'text', 'aria-label': 'Cella scelta (scrivi un nome come D10 per andarci)', spellcheck: 'false', autocomplete: 'off' },
    })
    this.bar = h('input', {
      class: 'sheet-formula',
      attrs: { type: 'text', 'aria-label': 'Contenuto della cella: un numero, un testo o una formula che comincia con =', spellcheck: 'false', autocomplete: 'off' },
    })
    this.hint = h('div', { class: 'sheet-hint', attrs: { 'aria-live': 'polite' } })
    const formulaBar = h('div', { class: 'sheet-formula-bar' }, this.address, h('span', { class: 'sheet-fx', attrs: { 'aria-hidden': 'true' } }, 'fx'), this.bar)

    this.table = h('table', { class: 'sheet-grid', attrs: { role: 'grid', 'aria-label': 'Celle della tabella' } })
    this.cellInput = h('input', {
      class: 'sheet-cell-input',
      attrs: { type: 'text', hidden: true, 'aria-label': 'Contenuto della cella', spellcheck: 'false', autocomplete: 'off' },
    })
    this.handle = h('div', { class: 'sheet-handle', title: 'Trascina per riempire le celle vicine', attrs: { 'aria-hidden': 'true' } })
    this.canvas = h('div', { class: 'sheet-canvas' }, this.table, this.handle, this.cellInput)
    this.grid = h('div', { class: 'sheet-grid-wrap', attrs: { tabindex: 0, 'aria-label': 'Tabella: le frecce scelgono la cella, scrivi per riempirla' } }, this.canvas)
    this.suggest = h('ul', { class: 'sheet-suggest', attrs: { role: 'listbox', hidden: true, 'aria-label': 'Funzioni' } })

    this.dialog = h(
      'dialog',
      { class: 'sheet-editor', attrs: { 'aria-label': 'Editor della tabella' } },
      bar,
      formulaBar,
      this.hint,
      this.grid,
      this.suggest,
    )
    document.body.append(this.dialog)
    this.dialog.showModal()
    this.listen()
    this.recalc()
    this.render()
    this.select(0, 0)
    this.grid.focus({ preventScroll: true })
  }

  // ——— Calcoli e disegno ———

  private recalc(): void {
    this.results = new SheetEvaluator(this.model).all()
  }

  private result(row: number, col: number): CellResult {
    return this.results[row]?.[col] ?? { value: null, format: GENERAL, formula: false }
  }

  private cell(row: number, col: number): SheetCell | undefined {
    return getCell(this.model, row, col)
  }

  /** Quante righe e colonne si vedono: la tabella, un po' di spazio dopo, e la cella scelta. */
  private fitSize(): void {
    const size = sheetSize(this.model)
    this.rows = Math.min(MAX_ROWS, Math.max(MIN_ROWS, size.rows + EXTRA_ROWS, this.active.row + 2, this.anchor.row + 2))
    this.cols = Math.min(MAX_COLS, Math.max(MIN_COLS, size.cols + EXTRA_COLS, this.active.col + 2, this.anchor.col + 2))
  }

  /** La larghezza di ogni colonna, dal testo più lungo (come il doppio clic sul bordo in Excel). */
  private widths(): number[] {
    const widths: number[] = []
    for (let c = 0; c < this.cols; c++) {
      let chars = 0
      for (let r = 0; r < this.rows; r++) {
        const res = this.result(r, c)
        if (res.value === null) continue
        chars = Math.max(chars, formatValue(res.value, res.format).length)
      }
      widths.push(Math.min(320, Math.max(88, 18 + chars * 8.2)))
    }
    return widths
  }

  private render(): void {
    this.fitSize()
    const widths = this.widths()
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    let html = `<colgroup><col class="sheet-col-head">${widths.map((w) => `<col style="width:${Math.round(w)}px">`).join('')}</colgroup>`
    html += `<thead><tr><th class="sheet-corner" title="Scegli tutta la tabella"></th>`
    for (let c = 0; c < this.cols; c++) html += `<th class="sheet-colhead" data-c="${c}" scope="col">${colName(c)}</th>`
    html += '</tr></thead><tbody>'
    for (let r = 0; r < this.rows; r++) {
      const header = r === 0 && this.model.header
      html += `<tr><th class="sheet-rowhead" data-r="${r}" scope="row">${r + 1}</th>`
      for (let c = 0; c < this.cols; c++) {
        const cell = this.cell(r, c)
        const res = this.result(r, c)
        const v = res.value
        const classes: string[] = []
        if (header) classes.push('is-header')
        if (cell?.bold) classes.push('is-bold')
        if (typeof v === 'number') classes.push('is-num')
        else if (isError(v)) classes.push('is-error')
        else if (typeof v === 'boolean') classes.push('is-bool')
        const align = this.model.align[c]
        if (align) classes.push(`is-${align}`)
        const text = v === null ? '' : formatValue(v, res.format)
        const title = isError(v) ? ` title="${esc(v.message)}"` : ''
        html += `<td id="sheet-${r}-${c}" data-r="${r}" data-c="${c}"${classes.length ? ` class="${classes.join(' ')}"` : ''}${title}>${esc(text)}</td>`
      }
      html += '</tr>'
    }
    html += '</tbody>'
    this.table.innerHTML = html
    this.table.style.width = `${44 + widths.reduce((s, w) => s + w, 0)}px`
    this.paint()
  }

  private range(): CellRange {
    return {
      top: Math.min(this.anchor.row, this.active.row),
      left: Math.min(this.anchor.col, this.active.col),
      bottom: Math.max(this.anchor.row, this.active.row),
      right: Math.max(this.anchor.col, this.active.col),
    }
  }

  private td(row: number, col: number): HTMLTableCellElement | null {
    return this.table.querySelector<HTMLTableCellElement>(`#sheet-${row}-${col}`)
  }

  /** La selezione, i nomi di righe e colonne scelte, la maniglia, i riferimenti della formula. */
  private paint(): void {
    for (const el of this.table.querySelectorAll('.is-selected, .is-active, .is-in, [data-ref]')) {
      el.classList.remove('is-selected', 'is-active', 'is-in')
      el.removeAttribute('data-ref')
    }
    const r = this.range()
    const many = r.top !== r.bottom || r.left !== r.right
    for (let row = r.top; row <= Math.min(r.bottom, this.rows - 1); row++) {
      for (let col = r.left; col <= Math.min(r.right, this.cols - 1); col++) if (many) this.td(row, col)?.classList.add('is-selected')
      this.table.querySelector(`.sheet-rowhead[data-r="${row}"]`)?.classList.add('is-in')
    }
    for (let col = r.left; col <= Math.min(r.right, this.cols - 1); col++) this.table.querySelector(`.sheet-colhead[data-c="${col}"]`)?.classList.add('is-in')
    const active = this.td(this.active.row, this.active.col)
    active?.classList.add('is-active')
    this.grid.setAttribute('aria-activedescendant', active?.id ?? '')
    // Le celle usate dalla formula che si sta scrivendo, colorate.
    if (this.editing) {
      formulaRefs(this.editValue()).forEach((ref, i) => {
        for (let row = ref.top; row <= Math.min(ref.bottom, this.rows - 1); row++) {
          for (let col = ref.left; col <= Math.min(ref.right, this.cols - 1); col++) this.td(row, col)?.setAttribute('data-ref', String(i % REF_COLORS))
        }
      })
    }
    this.placeHandle()
    this.fillTarget = null
    this.updateBar()
    this.updateButtons()
  }

  private placeHandle(): void {
    const r = this.range()
    const corner = this.td(r.bottom, r.right)
    if (!corner || this.editing) {
      this.handle.hidden = true
      return
    }
    const base = this.canvas.getBoundingClientRect()
    const box = corner.getBoundingClientRect()
    this.handle.hidden = false
    this.handle.style.left = `${box.right - base.left - 4}px`
    this.handle.style.top = `${box.bottom - base.top - 4}px`
  }

  /** La casella del nome e la barra della formula seguono la cella scelta (se non si sta scrivendo). */
  private updateBar(): void {
    const r = this.range()
    if (document.activeElement !== this.address) this.address.value = rangeName(r.top, r.left, r.bottom, r.right)
    if (!this.editing) {
      this.bar.value = this.cell(this.active.row, this.active.col)?.input ?? ''
      this.showHint()
    }
  }

  private updateButtons(): void {
    this.undoButton.disabled = !this.undoStack.length
    this.redoButton.disabled = !this.redoStack.length
    this.headerButton.setAttribute('aria-pressed', String(this.model.header))
    this.boldButton.setAttribute('aria-pressed', String(!!this.cell(this.active.row, this.active.col)?.bold))
  }

  /** Sotto la barra: l'aiuto della funzione che si sta scrivendo, o cosa non va nella cella. */
  private showHint(): void {
    if (this.editing) {
      const input = this.activeInput()
      const call = currentCall(input.value, input.selectionStart ?? input.value.length)
      const spec = call ? lookupFunction(call) : undefined
      if (spec) {
        this.hint.replaceChildren(h('strong', {}, `${spec.name}(${spec.args})`), ` — ${spec.help}`)
        return
      }
      this.hint.textContent = input.value.trimStart().startsWith('=')
        ? 'Clicca una cella (o usa le frecce dopo un operatore) per scriverne il nome; F4 mette il $. Invio conferma, Esc annulla.'
        : 'Invio conferma e va sotto, Tab va a destra, Esc annulla. Una formula comincia con =.'
      return
    }
    const v = this.result(this.active.row, this.active.col).value
    if (isError(v)) {
      this.hint.replaceChildren(h('strong', { class: 'sheet-hint-error' }, v.error), ` — ${v.message}`)
      return
    }
    this.hint.textContent = 'Scrivi un numero (anche 1,50 € o 22%), un testo o una formula che comincia con =, come =B2*C2 o =SOMMA(B2:B5).'
  }

  // ——— Selezione ———

  private select(row: number, col: number, extend = false): void {
    this.tabColumn = null
    row = Math.max(0, Math.min(MAX_ROWS - 1, row))
    col = Math.max(0, Math.min(MAX_COLS - 1, col))
    this.active = { row, col }
    if (!extend) this.anchor = { row, col }
    if (row >= this.rows - 1 || col >= this.cols - 1) this.render()
    else this.paint()
    this.td(row, col)?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  private selectRange(r: CellRange): void {
    this.anchor = { row: r.top, col: r.left }
    this.active = { row: r.bottom, col: r.right }
    this.paint()
  }

  /** Ctrl+freccia: fino in fondo ai dati, come Excel. */
  private jump(dr: number, dc: number): { row: number; col: number } {
    const filled = (r: number, c: number) => this.result(r, c).value !== null || !!this.cell(r, c)
    let { row, col } = this.active
    const size = sheetSize(this.model)
    const limitRow = Math.max(size.rows, 1) - 1
    const limitCol = Math.max(size.cols, 1) - 1
    const inside = (r: number, c: number) => r >= 0 && c >= 0 && r <= Math.max(limitRow, this.active.row) && c <= Math.max(limitCol, this.active.col)
    const next = () => ({ r: row + dr, c: col + dc })
    if (!inside(next().r, next().c)) return { row: Math.max(0, row), col: Math.max(0, col) }
    const startFilled = filled(row, col) && filled(next().r, next().c)
    if (startFilled) {
      while (inside(next().r, next().c) && filled(next().r, next().c)) {
        row += dr
        col += dc
      }
    } else {
      row += dr
      col += dc
      while (inside(row, col) && !filled(row, col) && inside(row + dr, col + dc)) {
        row += dr
        col += dc
      }
    }
    return { row, col }
  }

  // ——— Modifiche ———

  private snapshot(): Snapshot {
    return { model: cloneSheet(this.model), active: { ...this.active }, anchor: { ...this.anchor } }
  }

  /** Una modifica: si ricorda com'era (per Annulla), si fa, si ricalcola e si ridisegna. */
  private mutate(fn: () => void): void {
    const before = this.snapshot()
    const text = serializeSheet(this.model)
    fn()
    if (serializeSheet(this.model) === text && this.model.header === before.model.header) {
      this.paint()
      return
    }
    this.undoStack.push(before)
    if (this.undoStack.length > 200) this.undoStack.shift()
    this.redoStack = []
    this.recalc()
    this.render()
  }

  private runUndo(redo: boolean): void {
    if (this.editing) this.cancelEdit()
    const from = redo ? this.redoStack : this.undoStack
    const to = redo ? this.undoStack : this.redoStack
    const snap = from.pop()
    if (!snap) return
    to.push(this.snapshot())
    this.model = snap.model
    this.active = snap.active
    this.anchor = snap.anchor
    this.recalc()
    this.render()
  }

  private setInput(row: number, col: number, input: string): void {
    const old = this.cell(row, col)
    const text = isFormula(input) ? normalizeFormula(input) : input.trim()
    setCell(this.model, row, col, text || old?.format ? { ...(old ?? {}), input: text } : undefined)
  }

  private toggleBold(): void {
    const r = this.range()
    const on = !this.cell(this.active.row, this.active.col)?.bold
    this.mutate(() => {
      for (let row = r.top; row <= r.bottom; row++) {
        for (let col = r.left; col <= r.right; col++) {
          const cell = this.cell(row, col)
          if (cell?.input) setCell(this.model, row, col, { ...cell, bold: on || undefined })
        }
      }
    })
  }

  private toggleHeader(): void {
    this.mutate(() => {
      this.model.header = !this.model.header
    })
  }

  /** Il formato che si vede adesso nella cella (quello scelto o quello che viene dal contenuto). */
  private shownFormat(row: number, col: number): Format {
    return this.cell(row, col)?.format ?? this.result(row, col).format
  }

  /**
   * Il formato scelto per la cella: se è quello che la cella avrebbe comunque (per esempio € per
   * «1,50 €» o per =B2*C2 con il prezzo in euro) non si scrive.
   */
  private setFormat(row: number, col: number, format: Format | undefined): void {
    const cell = this.cell(row, col)
    if (!cell?.input) return
    const next: SheetCell = { ...cell }
    delete next.format
    if (format) {
      setCell(this.model, row, col, next)
      const natural = isFormula(next.input) ? new SheetEvaluator(this.model).result(row, col).format : readInput(next.input).format
      if (!sameFormat(natural, format)) next.format = format
    }
    setCell(this.model, row, col, next)
  }

  private toggleFormat(kind: 'euro' | 'percent' | 'number'): void {
    const r = this.range()
    const current = this.shownFormat(this.active.row, this.active.col)
    const off = current.kind === kind
    this.mutate(() => {
      for (let row = r.top; row <= r.bottom; row++) {
        for (let col = r.left; col <= r.right; col++) {
          const decimals = kind === 'percent' ? 0 : 2
          this.setFormat(row, col, off ? GENERAL : { kind, decimals })
        }
      }
    })
  }

  private changeDecimals(delta: number): void {
    const r = this.range()
    this.mutate(() => {
      for (let row = r.top; row <= r.bottom; row++) {
        for (let col = r.left; col <= r.right; col++) {
          const v = this.result(row, col).value
          if (typeof v !== 'number') continue
          const f = this.shownFormat(row, col)
          const now = f.kind === 'general' ? (generalNumber(v).split(',')[1]?.replace(/E.*/, '').length ?? 0) : decimalsOf(f)
          const decimals = Math.max(0, Math.min(MAX_DECIMALS, now + delta))
          this.setFormat(row, col, f.kind === 'general' ? { kind: 'number', decimals } : { kind: f.kind, decimals })
        }
      }
    })
  }

  private runAutoSum(): void {
    if (this.editing) this.commitEdit(null)
    const { row, col } = this.active
    const formula = autoSum(this.results, row, col)
    if (!formula) {
      this.say('Sopra e a sinistra non ci sono numeri da sommare: scrivi tu =SOMMA(…)')
      return
    }
    this.mutate(() => this.setInput(row, col, formula))
  }

  private async applyTemplate(source: string): Promise<void> {
    if (sheetSize(this.model).rows) {
      const ok = await confirmDialog({
        title: 'Sostituire la tabella?',
        message: 'Al posto di quello che c\'è adesso arriva il modello.',
        note: 'Se cambi idea, Annulla (Ctrl+Z) la riporta com\'era.',
        confirmLabel: 'Sostituisci',
      })
      if (!ok) {
        this.grid.focus()
        return
      }
    }
    this.mutate(() => {
      this.model = parseSheet(source)
    })
    this.select(0, 0)
    this.grid.focus()
  }

  // ——— Righe e colonne ———

  private rowEntries(): MenuEntry[] {
    const r = this.range()
    const n = r.bottom - r.top + 1
    const some = n === 1 ? 'la riga' : `le ${n} righe`
    const add = n === 1 ? 'una riga' : `${n} righe`
    return [
      { label: `Aggiungi ${add} sopra`, run: () => this.mutate(() => insertRows(this.model, r.top, n)) },
      {
        label: `Aggiungi ${add} sotto`,
        run: () => {
          this.mutate(() => insertRows(this.model, r.bottom + 1, n))
          this.select(r.bottom + 1, this.active.col)
        },
      },
      { label: `Elimina ${some} ${rangeLabel(r.top, r.bottom, true)}`, run: () => this.mutate(() => deleteRows(this.model, r.top, n)) },
    ]
  }

  private colEntries(): MenuEntry[] {
    const r = this.range()
    const n = r.right - r.left + 1
    const some = n === 1 ? 'la colonna' : `le ${n} colonne`
    const add = n === 1 ? 'una colonna' : `${n} colonne`
    return [
      { label: `Aggiungi ${add} a sinistra`, run: () => this.mutate(() => insertCols(this.model, r.left, n)) },
      {
        label: `Aggiungi ${add} a destra`,
        run: () => {
          this.mutate(() => insertCols(this.model, r.right + 1, n))
          this.select(this.active.row, r.right + 1)
        },
      },
      { label: `Elimina ${some} ${rangeLabel(r.left, r.right, false)}`, run: () => this.mutate(() => deleteCols(this.model, r.left, n)) },
    ]
  }

  // ——— Scrivere nelle celle ———

  private activeInput(): HTMLInputElement {
    return document.activeElement === this.bar ? this.bar : this.cellInput
  }

  private editValue(): string {
    return this.activeInput().value
  }

  /**
   * Comincia a scrivere nella cella scelta: con `initial` (il tasto premuto) al posto di quello che
   * c'era, come in Excel; senza, con il contenuto e il cursore in fondo (F2, doppio clic).
   */
  private startEdit(initial?: string, inBar = false): void {
    if (this.editing) return
    const { row, col } = this.active
    this.anchor = { ...this.active }
    this.editing = { row, col, enter: initial !== undefined, point: null }
    const value = initial ?? this.cell(row, col)?.input ?? ''
    this.cellInput.value = value
    this.bar.value = value
    const box = this.td(row, col)
    if (box && !inBar) {
      const base = this.canvas.getBoundingClientRect()
      const rect = box.getBoundingClientRect()
      this.cellInput.style.left = `${rect.left - base.left}px`
      this.cellInput.style.top = `${rect.top - base.top}px`
      this.cellInput.style.minWidth = `${rect.width}px`
      this.cellInput.style.height = `${rect.height}px`
      this.cellInput.hidden = false
      this.fitCellInput()
      this.cellInput.focus({ preventScroll: true })
      this.cellInput.setSelectionRange(value.length, value.length)
    } else {
      this.bar.focus()
      this.bar.setSelectionRange(value.length, value.length)
    }
    this.paint()
    this.afterTyping()
  }

  /** La casella della cella si allarga con quello che si scrive (misurato con il suo carattere). */
  private fitCellInput(): void {
    const input = this.cellInput
    const ctx = (this.measure ??= document.createElement('canvas').getContext('2d'))
    let width = input.value.length * 8.6
    if (ctx) {
      ctx.font = getComputedStyle(input).font
      width = ctx.measureText(input.value).width
    }
    input.style.width = `${Math.max(parseFloat(input.style.minWidth) || 80, Math.ceil(width) + 26)}px`
  }

  /** Conferma quello che si è scritto e (con `move`) passa alla cella vicina. */
  private commitEdit(move: Move, key?: 'tab' | 'enter'): void {
    const editing = this.editing
    if (!editing) return
    const value = this.editValue()
    this.closeSuggestions()
    this.editing = null
    this.cellInput.hidden = true
    if ((this.cell(editing.row, editing.col)?.input ?? '') !== (isFormula(value) ? normalizeFormula(value) : value.trim())) {
      this.mutate(() => this.setInput(editing.row, editing.col, value))
    } else {
      this.paint()
    }
    this.active = { row: editing.row, col: editing.col }
    this.anchor = { ...this.active }
    if (move) this.moveBy(move, key)
    else this.paint()
    this.grid.focus({ preventScroll: true })
  }

  private cancelEdit(): void {
    if (!this.editing) return
    this.closeSuggestions()
    this.editing = null
    this.cellInput.hidden = true
    this.paint()
    this.grid.focus({ preventScroll: true })
  }

  private moveBy(move: Move, key?: 'tab' | 'enter'): void {
    const d = { down: [1, 0], up: [-1, 0], right: [0, 1], left: [0, -1] }[move ?? 'down']
    if (key === 'tab') {
      const start = this.tabColumn ?? this.active.col
      this.select(this.active.row, this.active.col + d[1])
      this.tabColumn = start
      return
    }
    if (key === 'enter' && move === 'down' && this.tabColumn !== null) {
      this.select(this.active.row + 1, this.tabColumn)
      return
    }
    this.select(this.active.row + d[0], this.active.col + d[1])
  }

  /** Dopo ogni tasto mentre si scrive: le due caselle uguali, le celle della formula colorate, i suggerimenti. */
  private afterTyping(source?: HTMLInputElement): void {
    if (!this.editing) return
    const input = source ?? this.activeInput()
    const other = input === this.bar ? this.cellInput : this.bar
    other.value = input.value
    if (!this.cellInput.hidden) this.fitCellInput()
    this.paint()
    this.updateSuggestions(input)
    this.showHint()
  }

  /** La formula è in un punto dove ci va il nome di una cella (dopo =, (, ;, un operatore). */
  private pointable(input: HTMLInputElement): boolean {
    const value = input.value
    if (!value.trimStart().startsWith('=')) return false
    const at = input.selectionStart ?? value.length
    if (at !== (input.selectionEnd ?? at)) return false
    if (this.editing?.point && this.editing.point.to === at) return true
    const before = value.slice(0, at).trimEnd()
    return /[=(;,+\-*/^&<>:]$/.test(before)
  }

  /** Scrive (o cambia) il riferimento alla cella nella formula, al posto del cursore. */
  private pointAt(input: HTMLInputElement, row: number, col: number, extend = false): void {
    const editing = this.editing
    if (!editing) return
    const value = input.value
    const point = editing.point
    const anchor = extend && point ? point.anchor : { row, col }
    const text = extend ? rangeName(Math.min(anchor.row, row), Math.min(anchor.col, col), Math.max(anchor.row, row), Math.max(anchor.col, col)) : cellName(row, col)
    const from = point ? point.from : (input.selectionStart ?? value.length)
    const to = point ? point.to : from
    input.value = value.slice(0, from) + text + value.slice(to)
    input.setSelectionRange(from + text.length, from + text.length)
    editing.point = { from, to: from + text.length, row, col, anchor }
    this.afterTyping(input)
  }

  /** F4: il $ sul riferimento dove c'è il cursore (A1 → $A$1 → A$1 → $A1 → A1). */
  private cycleDollar(input: HTMLInputElement): void {
    const value = input.value
    if (!isFormula(value)) return
    const start = value.indexOf('=') + 1
    const at = (input.selectionStart ?? value.length) - start
    let tokens
    try {
      tokens = tokenize(value.slice(start))
    } catch {
      return
    }
    const ref = tokens.find((t) => t.k === 'ref' && t.from <= at && at <= t.to)
    if (!ref || ref.k !== 'ref') return
    const r = ref.ref
    const next = r.colAbs && r.rowAbs ? [false, true] : !r.colAbs && r.rowAbs ? [true, false] : r.colAbs && !r.rowAbs ? [false, false] : [true, true]
    const text = `${next[0] ? '$' : ''}${colName(r.col)}${next[1] ? '$' : ''}${r.row + 1}`
    input.value = value.slice(0, start + ref.from) + text + value.slice(start + ref.to)
    const end = start + ref.from + text.length
    input.setSelectionRange(end, end)
    if (this.editing) this.editing.point = null
    this.afterTyping(input)
  }

  // ——— Suggerimenti delle funzioni ———

  private updateSuggestions(input: HTMLInputElement): void {
    const value = input.value
    const at = input.selectionStart ?? value.length
    const m = /(^|[=(;,+\-*/^&<>\s])([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ.0-9]*)$/.exec(value.slice(0, at))
    if (!value.trimStart().startsWith('=') || !m || /^[A-Za-z]{1,3}\d+$/.test(m[2])) {
      this.closeSuggestions()
      return
    }
    const word = m[2].toUpperCase()
    const list = allFunctions()
      .filter((f) => f.name.startsWith(word) || f.aliases?.some((a) => a.startsWith(word)))
      .sort((a, b) => Number(!a.name.startsWith(word)) - Number(!b.name.startsWith(word)) || a.name.length - b.name.length)
      .slice(0, 8)
    if (!list.length || (list.length === 1 && list[0].name === word)) {
      this.closeSuggestions()
      return
    }
    this.suggestions = { list, index: 0, from: at - m[2].length, to: at, input }
    this.suggest.replaceChildren(
      ...list.map((f, i) =>
        h(
          'li',
          {
            class: 'sheet-suggest-item',
            attrs: { role: 'option', 'aria-selected': String(i === 0), id: `sheet-suggest-${i}` },
            on: {
              mousedown: (ev) => {
                ev.preventDefault()
                if (this.suggestions) this.suggestions.index = i
                this.acceptSuggestion()
              },
            },
          },
          h('strong', {}, f.name),
          h('span', {}, f.help),
        ),
      ),
    )
    const box = input.getBoundingClientRect()
    const host = this.dialog.getBoundingClientRect()
    this.suggest.style.left = `${Math.max(8, Math.min(box.left - host.left, host.width - 360))}px`
    this.suggest.style.top = `${box.bottom - host.top + 4}px`
    this.suggest.hidden = false
    input.setAttribute('aria-activedescendant', 'sheet-suggest-0')
  }

  private moveSuggestion(delta: number): void {
    const s = this.suggestions
    if (!s) return
    s.index = (s.index + delta + s.list.length) % s.list.length
    this.suggest.querySelectorAll('li').forEach((li, i) => li.setAttribute('aria-selected', String(i === s.index)))
    s.input.setAttribute('aria-activedescendant', `sheet-suggest-${s.index}`)
  }

  private acceptSuggestion(): void {
    const s = this.suggestions
    if (!s) return
    const name = s.list[s.index].name
    const value = s.input.value
    const after = value.slice(s.to)
    const insert = after.startsWith('(') ? name : `${name}(`
    s.input.value = value.slice(0, s.from) + insert + after
    const caret = s.from + insert.length + (after.startsWith('(') ? 1 : 0)
    s.input.setSelectionRange(caret, caret)
    if (this.editing) this.editing.point = null
    this.closeSuggestions()
    this.afterTyping(s.input)
  }

  private closeSuggestions(): void {
    this.suggestions?.input.removeAttribute('aria-activedescendant')
    this.suggestions = null
    this.suggest.hidden = true
  }

  // ——— Appunti ———

  private copy(cut: boolean): string {
    const r = this.range()
    const text = rangeToTsv(this.model, this.results, r)
    this.clip = { clip: copyRange(this.model, r), text }
    if (cut) this.mutate(() => clearRange(this.model, r))
    const n = (r.bottom - r.top + 1) * (r.right - r.left + 1)
    this.say(`${cut ? 'Tagliat' : 'Copiat'}${n === 1 ? 'a 1 cella' : `e ${n} celle`}`)
    return text
  }

  private paste(text: string): void {
    const clip = this.clip && text.replace(/\r\n/g, '\n') === this.clip.text ? this.clip.clip : clipFromText(text)
    if (!clip.rows) return
    const target = this.range()
    let placed: CellRange | null = null
    this.mutate(() => {
      placed = pasteClip(this.model, clip, target)
    })
    if (placed) this.selectRange(placed)
  }

  private async menuCopy(cut: boolean): Promise<void> {
    const text = this.copy(cut)
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Gli appunti del sistema non si possono usare: resta la copia dentro Glifo.
    }
  }

  private async menuPaste(): Promise<void> {
    let text: string | null = null
    try {
      text = await navigator.clipboard.readText()
    } catch {
      text = null
    }
    if (text === null) {
      if (!this.clip) {
        this.say('Per incollare da fuori usa Ctrl+V (⌘V sul Mac)')
        return
      }
      text = this.clip.text
    }
    this.paste(text)
  }

  // ——— Riempire con la maniglia, Ctrl+D e Ctrl+R ———

  private fill(direction: 'down' | 'right'): void {
    const r = this.range()
    const source = direction === 'down' ? { ...r, bottom: r.top } : { ...r, right: r.left }
    if ((direction === 'down' && r.bottom === r.top) || (direction === 'right' && r.right === r.left)) {
      // Una cella sola: si copia quella sopra (o a sinistra), come Excel.
      const from = direction === 'down' ? { ...r, top: r.top - 1, bottom: r.top - 1 } : { ...r, left: r.left - 1, right: r.left - 1 }
      if (from.top < 0 || from.left < 0) return
      this.mutate(() => fillRange(this.model, from, { ...r, top: from.top, left: from.left }, direction))
      return
    }
    this.mutate(() => fillRange(this.model, source, r, direction))
  }

  // ——— Menu ———

  private menuButton(label: string, title: string, paths: string, entries: () => MenuEntry[]): HTMLButtonElement {
    const button = h(
      'button',
      { class: 'btn sheet-menu-button', title, attrs: { type: 'button', 'aria-haspopup': 'menu', 'aria-expanded': 'false' } },
      icon(paths, 16),
      label,
      icon(PATHS.chevron, 14),
    )
    button.addEventListener('click', () => {
      if (this.editing) this.commitEdit(null)
      const box = button.getBoundingClientRect()
      this.openMenu(entries(), box.left, box.bottom + 4, button)
    })
    return button
  }

  private openMenu(entries: MenuEntry[], x: number, y: number, opener?: HTMLElement): void {
    this.closeMenu()
    const host = this.dialog.getBoundingClientRect()
    const items = entries.map((e) =>
      h(
        'button',
        {
          class: 'sheet-menu-item',
          attrs: { type: 'button', role: 'menuitem', disabled: !!e.disabled },
          on: {
            click: () => {
              this.closeMenu()
              e.run()
              if (!this.editing && !this.dialog.querySelector('dialog[open]')) this.grid.focus({ preventScroll: true })
            },
          },
        },
        h('span', {}, e.label),
        e.keys ? h('kbd', {}, e.keys) : null,
      ),
    )
    const menu = h('div', { class: 'sheet-menu', attrs: { role: 'menu' } }, items)
    this.dialog.append(menu)
    const w = menu.offsetWidth
    const hgt = menu.offsetHeight
    menu.style.left = `${Math.max(8, Math.min(x - host.left, host.width - w - 8))}px`
    menu.style.top = `${Math.max(8, Math.min(y - host.top, host.height - hgt - 8))}px`
    this.menu = menu
    opener?.setAttribute('aria-expanded', 'true')
    menu.addEventListener('keydown', (ev) => {
      const list = [...menu.querySelectorAll<HTMLButtonElement>('.sheet-menu-item:not([disabled])')]
      const i = list.indexOf(document.activeElement as HTMLButtonElement)
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
        ev.preventDefault()
        list[(i + (ev.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length]?.focus()
      } else if (ev.key === 'Escape') {
        ev.preventDefault()
        ev.stopPropagation()
        this.closeMenu()
        ;(opener ?? this.grid).focus()
      }
    })
    menu.querySelector<HTMLButtonElement>('.sheet-menu-item:not([disabled])')?.focus()
    const close = (ev: PointerEvent) => {
      if (!menu.contains(ev.target as Node) && ev.target !== opener && !opener?.contains(ev.target as Node)) this.closeMenu()
    }
    window.addEventListener('pointerdown', close, true)
    menu.addEventListener('menu-close', () => {
      window.removeEventListener('pointerdown', close, true)
      opener?.setAttribute('aria-expanded', 'false')
    })
  }

  private closeMenu(): void {
    if (!this.menu) return
    this.menu.dispatchEvent(new Event('menu-close'))
    this.menu.remove()
    this.menu = null
  }

  private contextEntries(): MenuEntry[] {
    const mac = /Mac|iPhone|iPad/.test(navigator.platform)
    const k = (key: string) => (mac ? `⌘${key}` : `Ctrl+${key}`)
    return [
      { label: 'Taglia', keys: k('X'), run: () => void this.menuCopy(true) },
      { label: 'Copia', keys: k('C'), run: () => void this.menuCopy(false) },
      { label: 'Incolla', keys: k('V'), run: () => void this.menuPaste() },
      { label: 'Svuota le celle', keys: 'Canc', run: () => this.mutate(() => clearRange(this.model, this.range())) },
      { label: 'Riempi in basso', keys: k('D'), run: () => this.fill('down') },
      { label: 'Riempi a destra', keys: k('R'), run: () => this.fill('right') },
      ...this.rowEntries(),
      ...this.colEntries(),
    ]
  }

  // ——— Messaggi, salvare e chiudere ———

  private say(message: string): void {
    this.status.textContent = message
    clearTimeout(this.statusTimer)
    this.statusTimer = window.setTimeout(() => (this.status.textContent = ''), 3000)
  }

  private toolbarRun(run: () => void): void {
    if (this.editing) this.commitEdit(null)
    run()
    if (!this.editing && !this.menu) this.grid.focus({ preventScroll: true })
  }

  private current(): SheetModel {
    if (this.editing) this.commitEdit(null)
    return this.model
  }

  /** Salva nella nota e resta qui (Ctrl+S). */
  private save(): void {
    const model = this.current()
    this.options.onSave(cloneSheet(model))
    this.saved = serializeSheet(model)
    this.say('Salvato nella nota')
  }

  private finish(): void {
    const model = this.current()
    if (serializeSheet(model) !== this.saved) this.options.onSave(cloneSheet(model))
    this.close()
  }

  private async requestClose(): Promise<void> {
    if (serializeSheet(this.current()) !== this.saved) {
      const ok = await confirmDialog({
        title: 'Chiudere senza salvare?',
        message: 'Le ultime modifiche alla tabella non sono ancora nella nota.',
        confirmLabel: 'Chiudi senza salvare',
        cancelLabel: 'Torna alla tabella',
        danger: true,
      })
      if (!ok) {
        this.grid.focus()
        return
      }
    }
    this.close()
  }

  private close(): void {
    if (this.closed) return
    this.closed = true
    clearTimeout(this.statusTimer)
    this.closeMenu()
    for (const cleanup of this.cleanups) cleanup()
    this.dialog.close()
    this.dialog.remove()
    this.resolve()
  }

  // ——— Eventi ———

  private listen(): void {
    const dialog = this.dialog
    dialog.addEventListener('cancel', (ev) => ev.preventDefault())
    this.grid.addEventListener('keydown', (ev) => this.gridKey(ev))
    for (const input of [this.cellInput, this.bar]) {
      input.addEventListener('keydown', (ev) => this.inputKey(ev, input))
      input.addEventListener('input', () => {
        if (!this.editing) this.startEditFromBar()
        if (this.editing) this.editing.point = null
        this.afterTyping(input)
      })
      input.addEventListener('click', () => {
        if (this.editing) {
          this.editing.point = null
          this.editing.enter = false
          this.updateSuggestions(input)
          this.showHint()
        }
      })
    }
    this.bar.addEventListener('focus', () => {
      if (!this.editing) this.startEditFromBar()
    })
    this.address.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault()
        const [a, b] = this.address.value.split(':')
        const from = parseCellName(a ?? '')
        const to = b ? parseCellName(b) : from
        if (from && to) {
          this.anchor = from
          this.select(to.row, to.col, true)
          this.grid.focus()
        } else {
          this.say('Scrivi il nome di una cella, come D10, o di un intervallo, come B2:D5')
        }
      } else if (ev.key === 'Escape') {
        ev.preventDefault()
        this.grid.focus()
      }
    })
    this.address.addEventListener('blur', () => this.updateBar())

    this.table.addEventListener('pointerdown', (ev) => this.pointerDown(ev))
    this.table.addEventListener('dblclick', (ev) => {
      const td = (ev.target as HTMLElement).closest<HTMLElement>('td[data-r]')
      if (!td || this.editing) return
      this.select(Number(td.dataset.r), Number(td.dataset.c))
      this.startEdit()
    })
    this.table.addEventListener('contextmenu', (ev) => {
      ev.preventDefault()
      const target = (ev.target as HTMLElement).closest<HTMLElement>('td[data-r], th[data-r], th[data-c]')
      if (target && !this.editing) {
        const r = this.range()
        const row = target.dataset.r !== undefined ? Number(target.dataset.r) : this.active.row
        const col = target.dataset.c !== undefined ? Number(target.dataset.c) : this.active.col
        const inside = row >= r.top && row <= r.bottom && col >= r.left && col <= r.right
        if (!inside && target.tagName === 'TD') this.select(row, col)
      }
      this.openMenu(this.contextEntries(), ev.clientX, ev.clientY)
    })
    this.handle.addEventListener('pointerdown', (ev) => {
      ev.preventDefault()
      ev.stopPropagation()
      this.handle.setPointerCapture(ev.pointerId)
      this.drag = { kind: 'fill', pointer: ev.pointerId }
    })
    const move = (ev: PointerEvent) => this.pointerMove(ev)
    const up = (ev: PointerEvent) => this.pointerUp(ev)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    const resize = () => {
      if (this.editing) this.cancelEdit()
      this.placeHandle()
    }
    window.addEventListener('resize', resize)

    const copy = (ev: ClipboardEvent) => {
      if (this.editing || !this.inGrid(ev)) return
      ev.preventDefault()
      ev.clipboardData?.setData('text/plain', this.copy(ev.type === 'cut'))
    }
    const paste = (ev: ClipboardEvent) => {
      if (this.editing || !this.inGrid(ev)) return
      ev.preventDefault()
      this.paste(ev.clipboardData?.getData('text/plain') ?? '')
    }
    dialog.addEventListener('copy', copy)
    dialog.addEventListener('cut', copy)
    dialog.addEventListener('paste', paste)
    this.cleanups.push(() => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      window.removeEventListener('resize', resize)
    })
  }

  private inGrid(ev: Event): boolean {
    return this.grid.contains(ev.target as Node) || ev.target === this.grid
  }

  private startEditFromBar(): void {
    this.startEdit(undefined, true)
  }

  private cellAt(ev: PointerEvent): { row: number; col: number } | null {
    const el = document.elementFromPoint(ev.clientX, ev.clientY)?.closest<HTMLElement>('td[data-r]')
    return el && this.table.contains(el) ? { row: Number(el.dataset.r), col: Number(el.dataset.c) } : null
  }

  private pointerDown(ev: PointerEvent): void {
    if (ev.button !== 0) return
    const target = ev.target as HTMLElement
    this.closeMenu()
    const td = target.closest<HTMLElement>('td[data-r]')
    const rowHead = target.closest<HTMLElement>('.sheet-rowhead')
    const colHead = target.closest<HTMLElement>('.sheet-colhead')
    const touch = ev.pointerType === 'touch'
    if (td) {
      const row = Number(td.dataset.r)
      const col = Number(td.dataset.c)
      // Mentre si scrive una formula: il clic scrive il nome della cella.
      if (this.editing && (row !== this.editing.row || col !== this.editing.col)) {
        const input = this.activeInput()
        if (this.pointable(input)) {
          ev.preventDefault()
          this.pointAt(input, row, col)
          this.drag = { kind: 'point', pointer: ev.pointerId }
          return
        }
        this.commitEdit(null)
      } else if (this.editing) {
        return
      }
      // Sul telefono un tocco sulla cella già scelta comincia a scriverci.
      if (touch && row === this.active.row && col === this.active.col && this.anchor.row === row && this.anchor.col === col) {
        // Senza i clic del mouse che seguono il tocco: porterebbero il fuoco via dalla casella.
        ev.preventDefault()
        this.startEdit()
        return
      }
      ev.preventDefault()
      this.select(row, col, ev.shiftKey)
      this.grid.focus({ preventScroll: true })
      if (!touch) this.drag = { kind: 'cells', pointer: ev.pointerId }
      return
    }
    if (this.editing) this.commitEdit(null)
    if (rowHead) {
      ev.preventDefault()
      const row = Number(rowHead.dataset.r)
      if (!ev.shiftKey) this.anchor = { row, col: 0 }
      this.active = { row, col: this.cols - 1 }
      this.paint()
      this.grid.focus({ preventScroll: true })
      this.drag = { kind: 'rows', pointer: ev.pointerId }
    } else if (colHead) {
      ev.preventDefault()
      const col = Number(colHead.dataset.c)
      if (!ev.shiftKey) this.anchor = { row: 0, col }
      this.active = { row: this.rows - 1, col }
      this.paint()
      this.grid.focus({ preventScroll: true })
      this.drag = { kind: 'cols', pointer: ev.pointerId }
    } else if (target.closest('.sheet-corner')) {
      ev.preventDefault()
      this.selectAll()
      this.grid.focus({ preventScroll: true })
    }
  }

  private pointerMove(ev: PointerEvent): void {
    const drag = this.drag
    if (!drag || drag.pointer !== ev.pointerId) return
    if (drag.kind === 'rows' || drag.kind === 'cols') {
      const head = document.elementFromPoint(ev.clientX, ev.clientY)?.closest<HTMLElement>(drag.kind === 'rows' ? '.sheet-rowhead' : '.sheet-colhead')
      if (!head) return
      if (drag.kind === 'rows') this.active = { row: Number(head.dataset.r), col: this.active.col }
      else this.active = { row: this.active.row, col: Number(head.dataset.c) }
      this.paint()
      return
    }
    const at = this.cellAt(ev)
    if (!at) return
    if (drag.kind === 'cells') {
      if (at.row !== this.active.row || at.col !== this.active.col) {
        this.active = at
        this.paint()
      }
    } else if (drag.kind === 'point') {
      const input = this.activeInput()
      if (this.editing?.point) this.pointAt(input, at.row, at.col, true)
    } else if (drag.kind === 'fill') {
      this.showFill(at)
    }
  }

  private pointerUp(ev: PointerEvent): void {
    const drag = this.drag
    if (!drag || drag.pointer !== ev.pointerId) return
    this.drag = null
    if (drag.kind === 'fill' && this.fillTarget) {
      const source = this.range()
      const target = this.fillTarget
      const direction = target.bottom > source.bottom ? 'down' : 'right'
      this.mutate(() => fillRange(this.model, source, target, direction))
      this.selectRange(target)
    } else if (drag.kind === 'point') {
      this.activeInput().focus({ preventScroll: true })
    } else {
      this.paint()
    }
  }

  /** Il rettangolo che la maniglia riempirebbe: verso il basso o verso destra, fino alla cella sotto il puntatore. */
  private showFill(at: { row: number; col: number }): void {
    const r = this.range()
    for (const el of this.table.querySelectorAll('.is-fill')) el.classList.remove('is-fill')
    const down = at.row - r.bottom
    const right = at.col - r.right
    if (down <= 0 && right <= 0) {
      this.fillTarget = null
      return
    }
    this.fillTarget = down >= right ? { ...r, bottom: at.row } : { ...r, right: at.col }
    const t = this.fillTarget
    for (let row = t.top; row <= t.bottom; row++) for (let col = t.left; col <= t.right; col++) this.td(row, col)?.classList.add('is-fill')
  }

  private selectAll(): void {
    const size = sheetSize(this.model)
    this.anchor = { row: 0, col: 0 }
    this.active = { row: Math.max(0, size.rows - 1), col: Math.max(0, size.cols - 1) }
    this.paint()
  }

  private gridKey(ev: KeyboardEvent): void {
    if (ev.target !== this.grid || this.editing) return
    const mod = ev.ctrlKey || ev.metaKey
    const key = ev.key
    const lower = key.toLowerCase()
    const arrows: Record<string, [number, number]> = { ArrowDown: [1, 0], ArrowUp: [-1, 0], ArrowRight: [0, 1], ArrowLeft: [0, -1] }
    if (arrows[key]) {
      ev.preventDefault()
      const [dr, dc] = arrows[key]
      const to = mod ? this.jump(dr, dc) : { row: this.active.row + dr, col: this.active.col + dc }
      this.select(to.row, to.col, ev.shiftKey)
      return
    }
    if (mod && !ev.altKey) {
      if (lower === 'z' || lower === 'y') {
        ev.preventDefault()
        this.runUndo(lower === 'y' || ev.shiftKey)
      } else if (lower === 'b') {
        ev.preventDefault()
        this.toggleBold()
      } else if (lower === 'd') {
        ev.preventDefault()
        this.fill('down')
      } else if (lower === 'r') {
        ev.preventDefault()
        this.fill('right')
      } else if (lower === 'a') {
        ev.preventDefault()
        this.selectAll()
      } else if (lower === 's') {
        ev.preventDefault()
        this.save()
      } else if (key === 'Home') {
        ev.preventDefault()
        this.select(0, 0, ev.shiftKey)
      } else if (key === 'End') {
        ev.preventDefault()
        const size = sheetSize(this.model)
        this.select(Math.max(0, size.rows - 1), Math.max(0, size.cols - 1), ev.shiftKey)
      }
      return
    }
    switch (key) {
      case 'Enter':
        ev.preventDefault()
        this.moveBy(ev.shiftKey ? 'up' : 'down', 'enter')
        return
      case 'Tab':
        ev.preventDefault()
        this.moveBy(ev.shiftKey ? 'left' : 'right', 'tab')
        return
      case 'F2':
        ev.preventDefault()
        this.startEdit()
        return
      case 'Delete':
      case 'Backspace':
        ev.preventDefault()
        this.mutate(() => clearRange(this.model, this.range()))
        return
      case 'Home':
        ev.preventDefault()
        this.select(this.active.row, 0, ev.shiftKey)
        return
      case 'PageDown':
      case 'PageUp':
        ev.preventDefault()
        this.select(this.active.row + (key === 'PageDown' ? 15 : -15), this.active.col, ev.shiftKey)
        return
      case 'Escape':
        ev.preventDefault()
        if (this.anchor.row !== this.active.row || this.anchor.col !== this.active.col) this.select(this.active.row, this.active.col)
        return
      case 'ContextMenu': {
        ev.preventDefault()
        const box = this.td(this.active.row, this.active.col)?.getBoundingClientRect()
        if (box) this.openMenu(this.contextEntries(), box.left + 8, box.bottom)
        return
      }
    }
    if (key === 'F10' && ev.shiftKey) {
      ev.preventDefault()
      const box = this.td(this.active.row, this.active.col)?.getBoundingClientRect()
      if (box) this.openMenu(this.contextEntries(), box.left + 8, box.bottom)
      return
    }
    // Un carattere qualsiasi: si comincia a scrivere nella cella, al posto di quello che c'era.
    if (key.length === 1 && !ev.altKey) {
      ev.preventDefault()
      this.startEdit(key)
    }
  }

  private inputKey(ev: KeyboardEvent, input: HTMLInputElement): void {
    ev.stopPropagation()
    if (ev.isComposing) return
    if (!this.editing) this.startEditFromBar()
    const editing = this.editing
    if (!editing) return
    const s = this.suggestions
    if (s && (ev.key === 'ArrowDown' || ev.key === 'ArrowUp')) {
      ev.preventDefault()
      this.moveSuggestion(ev.key === 'ArrowDown' ? 1 : -1)
      return
    }
    if (s && (ev.key === 'Tab' || (ev.key === 'Enter' && !ev.shiftKey))) {
      ev.preventDefault()
      this.acceptSuggestion()
      return
    }
    const mod = ev.ctrlKey || ev.metaKey
    switch (ev.key) {
      case 'Enter':
        ev.preventDefault()
        this.commitEdit(ev.shiftKey ? 'up' : 'down', 'enter')
        return
      case 'Tab':
        ev.preventDefault()
        this.commitEdit(ev.shiftKey ? 'left' : 'right', 'tab')
        return
      case 'Escape':
        ev.preventDefault()
        if (s) this.closeSuggestions()
        else this.cancelEdit()
        return
      case 'F4':
        ev.preventDefault()
        this.cycleDollar(input)
        return
      case 'F2':
        ev.preventDefault()
        editing.enter = !editing.enter
        editing.point = null
        return
    }
    if (mod && ev.key.toLowerCase() === 's') {
      ev.preventDefault()
      this.save()
      return
    }
    const arrows: Record<string, [number, number]> = { ArrowDown: [1, 0], ArrowUp: [-1, 0], ArrowRight: [0, 1], ArrowLeft: [0, -1] }
    const arrow = arrows[ev.key]
    if (arrow && editing.enter && input === this.cellInput && !mod) {
      // Nella formula, dopo un operatore, le frecce scelgono la cella; altrimenti confermano e si spostano.
      if (this.pointable(input)) {
        ev.preventDefault()
        const from = editing.point ?? { row: editing.row, col: editing.col }
        const row = Math.max(0, from.row + arrow[0])
        const col = Math.max(0, from.col + arrow[1])
        this.pointAt(input, row, col, ev.shiftKey && !!editing.point)
        this.td(row, col)?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
        return
      }
      ev.preventDefault()
      const move: Move = arrow[0] > 0 ? 'down' : arrow[0] < 0 ? 'up' : arrow[1] > 0 ? 'right' : 'left'
      this.commitEdit(move)
    }
  }
}

/** Il nome della funzione dentro le cui parentesi c'è il cursore (per l'aiuto), o null. */
function currentCall(value: string, at: number): string | null {
  if (!value.trimStart().startsWith('=')) return null
  const text = value.slice(0, at)
  const stack: (string | null)[] = []
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '"') quoted = !quoted
    if (quoted) continue
    if (ch === '(') {
      const m = /([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ.0-9]*)\s*$/.exec(text.slice(0, i))
      stack.push(m ? m[1].toUpperCase() : null)
    } else if (ch === ')') {
      stack.pop()
    }
  }
  return stack[stack.length - 1] ?? null
}

/** «(riga 3)», «(righe 3–5)», «(colonna B)»… */
function rangeLabel(from: number, to: number, rows: boolean): string {
  const name = (i: number) => (rows ? String(i + 1) : colName(i))
  if (from === to) return `(${rows ? 'riga' : 'colonna'} ${name(from)})`
  return `(${rows ? 'righe' : 'colonne'} ${name(from)}–${name(to)})`
}

