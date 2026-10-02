import { syntaxTree } from '@codemirror/language'
import { EditorSelection } from '@codemirror/state'
import type { EditorView } from '@codemirror/view'
import { formulaGraph, formulaGraphLine, graphBlockText, graphNames } from '../graph/spec'
import { sheetBefore } from './calcResults'
import { mathRegionAt } from './mathContext'

/**
 * La formula sotto il cursore, se è una funzione da disegnare (y = …, f(x) = …) o un integrale (la
 * sua area): la riga per il blocco ```grafico e le definizioni della nota scritte prima, che usa.
 */
export function formulaAtCursor(view: EditorView): { tex: string; defs: string[]; to: number } | null {
  const { state } = view
  const head = state.selection.main.head
  const region = mathRegionAt(state, head)
  if (!region || !region.closed || head < region.contentFrom || head > region.contentTo) return null
  const tex = formulaGraphLine(region.tex)
  const defs = sheetBefore(state, region.from).definitionsFor(graphNames(tex))
  return formulaGraph(tex, defs) ? { tex, defs, to: region.to } : null
}

/**
 * Mette un blocco ```grafico nella nota, su righe sue dopo quella del cursore (o della formula, o
 * del blocco di codice in cui si trova). Con `line` il grafico è già pronto e il cursore va dopo;
 * senza, il blocco ha `y = ` e il cursore resta lì, per scrivere la funzione.
 */
export function insertGraphBlock(view: EditorView, line: string | null, after?: number): void {
  const { state } = view
  let pos = after ?? state.selection.main.head
  // Mai dentro un altro blocco di codice (o un altro grafico): dopo.
  for (let node = syntaxTree(state).resolveInner(pos, -1); node.parent; node = node.parent) {
    if (node.name === 'FencedCode' || node.name === 'BlockMath') pos = Math.max(pos, node.to)
  }
  const anchor = state.doc.lineAt(pos)
  const empty = !anchor.text.trim()
  const from = empty ? anchor.from : anchor.to
  // Una riga vuota prima del blocco (se la riga vuota del cursore non ce l'ha già sopra).
  const above = empty && anchor.number > 1 ? state.doc.line(anchor.number - 1).text.trim() : ''
  const prefix = empty ? (above ? '\n' : '') : '\n\n'
  const body = line ?? 'y = '
  const insert = `${prefix}${graphBlockText([body])}\n`
  const cursor = line === null ? from + prefix.length + '```grafico\n'.length + body.length : from + insert.length
  view.dispatch({
    changes: { from, insert },
    selection: EditorSelection.cursor(Math.min(cursor, state.doc.length + insert.length)),
    scrollIntoView: true,
    userEvent: 'input',
  })
  view.focus()
}

/**
 * «Aggiungi lo slider per k» nell'anteprima: le righe `text` (k = 1) all'inizio del blocco
 * ```grafico che apre alla riga `line` (da 0). Se lì non c'è più quel blocco, niente.
 */
export function addToGraphBlock(view: EditorView, line: number, text: string): boolean {
  const { doc } = view.state
  if (!text || line < 0 || line >= doc.lines) return false
  const fence = doc.line(line + 1)
  const m = /^([ \t]*)(?:`{3,}|~{3,})[ \t]*grafico[ \t]*$/.exec(fence.text)
  if (!m) return false
  const lines = text.split('\n').map((t) => m[1] + t)
  const changes =
    line + 1 < doc.lines ? { from: doc.line(line + 2).from, insert: lines.join('\n') + '\n' } : { from: fence.to, insert: '\n' + lines.join('\n') }
  view.dispatch({ changes, userEvent: 'input' })
  return true
}
