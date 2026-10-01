/**
 * I risultati dopo «=», come nelle Note matematiche dell'iPad: in una formula che finisce con
 * «=» (`$3 \cdot 4 =$`) compare il risultato, più chiaro; con il cursore lì Tab lo scrive nella
 * formula (e passa oltre), e lo stesso fa un clic. Le formule si leggono dall'alto in basso, con le
 * definizioni scritte prima ($a = 2$, $f(x) = x^2$): cambiando un numero, i risultati seguono.
 * Finché non si scrivono, i risultati non sono nel testo: anteprima e file .md restano come sono.
 */
import { syntaxTree } from '@codemirror/language'
import { EditorSelection, type EditorState, type Range } from '@codemirror/state'
import { Decoration, EditorView, ViewPlugin, WidgetType, type DecorationSet, type ViewUpdate } from '@codemirror/view'
import { Sheet } from '../math/sheet'
import { regionFromNode, type MathRegion } from './mathContext'

export interface CalcResult {
  /** Subito dopo l'«=»: dove va il risultato. */
  pos: number
  /** La fine del contenuto della formula (prima del $ che chiude). */
  contentTo: number
  /** La fine della formula, dopo il $ che chiude. */
  to: number
  /** Il risultato in LaTeX (da scrivere) e come testo (da mostrare). */
  tex: string
  text: string
}

/** Le formule chiuse dall'inizio del testo fino a `to`, nell'ordine. */
export function formulasUntil(state: EditorState, to: number): MathRegion[] {
  const out: MathRegion[] = []
  syntaxTree(state).iterate({
    from: 0,
    to,
    enter: (node) => {
      if (node.name !== 'InlineMath' && node.name !== 'BlockMath') return
      const region = regionFromNode(state, node.node)
      if (region.closed) out.push(region)
      return false
    },
  })
  return out
}

/** Le definizioni scritte nelle formule prima di `pos` (per i grafici e i calcoli lì). */
export function sheetBefore(state: EditorState, pos: number): Sheet {
  const sheet = new Sheet()
  for (const region of formulasUntil(state, pos)) {
    if (region.to <= pos) sheet.add(region.tex)
  }
  return sheet
}

/** I risultati delle formule che finiscono con «=», fino a `to`. */
export function calcResults(state: EditorState, to: number): CalcResult[] {
  const sheet = new Sheet()
  const results: CalcResult[] = []
  for (const region of formulasUntil(state, to)) {
    const result = sheet.add(region.tex)
    if (!result) continue
    // Subito dopo l'«=» (gli spazi in fondo alla formula non contano).
    let pos = region.contentTo
    while (pos > region.contentFrom && /\s/.test(state.sliceDoc(pos - 1, pos))) pos--
    results.push({ pos, contentTo: region.contentTo, to: region.to, tex: result.tex, text: result.text })
  }
  return results
}

/** Scrive il risultato nella formula, al posto degli spazi dopo l'«=», e mette il cursore dopo la formula. */
export function insertResult(view: EditorView, r: CalcResult): void {
  const trailing = view.state.sliceDoc(r.pos, r.contentTo)
  // In un blocco $$ su più righe l'a capo prima della chiusura resta.
  const to = trailing.includes('\n') ? r.pos : r.contentTo
  const insert = ` ${r.tex}`
  const end = r.to + insert.length - (to - r.pos)
  view.dispatch({
    changes: { from: r.pos, to, insert },
    selection: EditorSelection.cursor(end),
    scrollIntoView: true,
    userEvent: 'input',
  })
}

class ResultWidget extends WidgetType {
  constructor(
    readonly result: CalcResult,
    readonly hint: boolean,
  ) {
    super()
  }

  override eq(other: ResultWidget): boolean {
    return other.result.text === this.result.text && other.hint === this.hint
  }

  toDOM(view: EditorView): HTMLElement {
    const span = document.createElement('span')
    span.className = 'cm-calc-result'
    span.textContent = this.result.text
    span.title = 'Calcolato da Glifo: Tab (o un clic) lo scrive nella formula'
    if (this.hint) {
      const key = document.createElement('kbd')
      key.textContent = 'Tab'
      span.append(key)
    }
    span.addEventListener('mousedown', (ev) => {
      ev.preventDefault()
      // Il risultato di adesso: intanto il testo può essere cambiato.
      const pos = view.posAtDOM(span)
      const r = view.plugin(calcPlugin)?.results.find((x) => x.pos === pos)
      if (r) insertResult(view, r)
      view.focus()
    })
    return span
  }

  override ignoreEvent(): boolean {
    return true
  }
}

class CalcPlugin {
  results: CalcResult[] = []
  decorations: DecorationSet = Decoration.none

  constructor(view: EditorView) {
    this.compute(view)
  }

  update(u: ViewUpdate): void {
    if (u.docChanged || u.viewportChanged || syntaxTree(u.startState) !== syntaxTree(u.state)) this.compute(u.view)
    else if (u.selectionSet) this.decorate(u.view)
  }

  private compute(view: EditorView): void {
    this.results = calcResults(view.state, Math.min(view.state.doc.length, view.viewport.to + 2000))
    this.decorate(view)
  }

  private decorate(view: EditorView): void {
    const sel = view.state.selection.main
    const ranges: Range<Decoration>[] = this.results.map((r) => {
      const hint = sel.empty && sel.head >= r.pos && sel.head <= r.contentTo
      return Decoration.widget({ widget: new ResultWidget(r, hint), side: 1 }).range(r.pos)
    })
    this.decorations = Decoration.set(ranges, true)
  }
}

export const calcPlugin = ViewPlugin.fromClass(CalcPlugin, { decorations: (p) => p.decorations })

/** Tab con il cursore dopo l'«=» di una formula con il risultato: lo scrive. */
export function acceptCalcResult(view: EditorView): boolean {
  const sel = view.state.selection.main
  if (!sel.empty) return false
  const r = view.plugin(calcPlugin)?.results.find((x) => sel.head >= x.pos && sel.head <= x.contentTo)
  if (!r) return false
  insertResult(view, r)
  return true
}
