/**
 * I risultati dopo «=», come nelle Note matematiche dell'iPad: in una formula che finisce con
 * «=» (`$3 \cdot 4 =$`) compare il risultato, più chiaro; con il cursore lì Tab lo scrive nella
 * formula (e passa oltre), e lo stesso fa un clic. Le formule si leggono dall'alto in basso, con le
 * definizioni scritte prima ($a = 2$, $f(x) = x^2$): cambiando un numero, i risultati seguono.
 * Finché non si scrivono, i risultati non sono nel testo: anteprima e file .md restano come sono.
 *
 * Quando il risultato lo scrive chi prende appunti (`$\int_0^1 x^2 \, dx = \frac{1}{3}$`), dopo la
 * formula compare il controllo: ✓ se è giusto, ✗ con il valore giusto se è sbagliato. Il ✗ aspetta
 * che il cursore esca dalla formula, per non comparire a metà di quello che si sta scrivendo.
 */
import { syntaxTree } from '@codemirror/language'
import { EditorSelection, type EditorState, type Range } from '@codemirror/state'
import { Decoration, EditorView, ViewPlugin, WidgetType, type DecorationSet, type ViewUpdate } from '@codemirror/view'
import type { FormattedResult } from '../math/format'
import { Sheet, type EqualityCheck } from '../math/sheet'
import { checkTitle } from '../render/check'
import { renderTex } from '../render/katex'
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
  /** Una matrice, un vettore…: si mostra disegnato (con KaTeX) invece che come testo. */
  rich?: boolean
}

/** Il controllo di una formula con il risultato scritto (vedi `Sheet.read`), da mostrare dopo di lei. */
export interface CalcCheck extends EqualityCheck {
  /** L'inizio della formula (con il $) e la fine, dopo il $ che chiude: lì va il segno. */
  from: number
  to: number
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

/** I risultati delle formule che finiscono con «=» e i controlli di quelle con il risultato scritto, fino a `to`. */
export function calcOutcomes(state: EditorState, to: number): { results: CalcResult[]; checks: CalcCheck[] } {
  const sheet = new Sheet()
  const results: CalcResult[] = []
  const checks: CalcCheck[] = []
  for (const region of formulasUntil(state, to)) {
    const { result, check } = sheet.read(region.tex)
    if (check) checks.push({ ...check, from: region.from, to: region.to })
    if (!result) continue
    // Subito dopo l'«=» (gli spazi in fondo alla formula non contano).
    let pos = region.contentTo
    while (pos > region.contentFrom && /\s/.test(state.sliceDoc(pos - 1, pos))) pos--
    results.push({ pos, contentTo: region.contentTo, to: region.to, tex: result.tex, text: result.text, ...(result.rich && { rich: true }) })
  }
  return { results, checks }
}

/** I risultati delle formule che finiscono con «=», fino a `to`. */
export function calcResults(state: EditorState, to: number): CalcResult[] {
  return calcOutcomes(state, to).results
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
    return other.result.text === this.result.text && other.result.tex === this.result.tex && other.hint === this.hint
  }

  toDOM(view: EditorView): HTMLElement {
    const span = document.createElement('span')
    span.className = 'cm-calc-result'
    // Una matrice si legge meglio disegnata; il testo resta per chi non vede.
    const drawn = this.result.rich ? renderTex(this.result.tex) : null
    if (drawn && !drawn.error) {
      span.innerHTML = drawn.html
      span.classList.add('is-rich')
      span.setAttribute('aria-label', this.result.text)
    } else span.textContent = this.result.text
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

/** Il valore giusto, disegnato con KaTeX se è una formula (una matrice, 4πR³/3), se no come testo. */
function valueNode(value: FormattedResult): HTMLElement {
  const span = document.createElement('span')
  span.className = 'cm-calc-check-value'
  const drawn = value.rich ? renderTex(value.tex) : null
  if (drawn && !drawn.error) span.innerHTML = drawn.html
  else span.textContent = value.text
  return span
}

class CheckWidget extends WidgetType {
  constructor(readonly check: CalcCheck) {
    super()
  }

  override eq(other: CheckWidget): boolean {
    return other.check.ok === this.check.ok && other.check.rounded === this.check.rounded && other.check.value?.tex === this.check.value?.tex
  }

  toDOM(): HTMLElement {
    const span = document.createElement('span')
    span.className = `cm-calc-check ${this.check.ok ? 'is-ok' : 'is-wrong'}`
    span.title = checkTitle(this.check)
    span.setAttribute('aria-label', span.title)
    span.append(this.check.ok ? '✓' : '✗')
    if (!this.check.ok && this.check.value) span.append(' fa ', valueNode(this.check.value))
    return span
  }

  override ignoreEvent(): boolean {
    return true
  }
}

class CalcPlugin {
  results: CalcResult[] = []
  checks: CalcCheck[] = []
  decorations: DecorationSet = Decoration.none

  constructor(view: EditorView) {
    this.compute(view)
  }

  update(u: ViewUpdate): void {
    if (u.docChanged || u.viewportChanged || syntaxTree(u.startState) !== syntaxTree(u.state)) this.compute(u.view)
    else if (u.selectionSet) this.decorate(u.view)
  }

  private compute(view: EditorView): void {
    const { results, checks } = calcOutcomes(view.state, Math.min(view.state.doc.length, view.viewport.to + 2000))
    this.results = results
    this.checks = checks
    this.decorate(view)
  }

  private decorate(view: EditorView): void {
    const sel = view.state.selection.main
    const ranges: Range<Decoration>[] = this.results.map((r) => {
      const hint = sel.empty && sel.head >= r.pos && sel.head <= r.contentTo
      return Decoration.widget({ widget: new ResultWidget(r, hint), side: 1 }).range(r.pos)
    })
    for (const c of this.checks) {
      // Il ✗ solo fuori dalla formula: mentre la si scrive il risultato può essere a metà.
      if (!c.ok && sel.head > c.from && sel.head < c.to) continue
      ranges.push(Decoration.widget({ widget: new CheckWidget(c), side: 1 }).range(c.to))
    }
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
