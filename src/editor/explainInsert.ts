/**
 * «Spiegami» nell'editor (src/ui/explainPanel.ts): la formula sotto il cursore da spiegare e, quando
 * chi scrive vuole tenere la spiegazione, i passaggi nella nota, dopo il blocco della formula.
 */
import { syntaxTree } from '@codemirror/language'
import { EditorSelection, type EditorState, type Text } from '@codemirror/state'
import type { EditorView } from '@codemirror/view'
import { explainTarget, formulaNames, type Explanation, type ExplainTarget } from '../ai/explain'
import { calculationRequest, solveRequest } from '../math/sheet'
import { formulasUntil, sheetBefore } from './calcResults'
import { mathRegionAt, type MathRegion } from './mathContext'

/** Una formula con un «=» o un ⇒: le altre non hanno un conto da spiegare. */
export function hasCalculation(tex: string): boolean {
  return /=|\\(?:Rightarrow|implies|iff|Leftrightarrow)\b|[⇒⇔≈]|\\approx/.test(tex)
}

/** La formula chiusa in cui è il cursore, se ha un conto da spiegare. */
export function regionToExplain(state: EditorState): MathRegion | null {
  const head = state.selection.main.head
  const region = mathRegionAt(state, head)
  if (!region || !region.closed || head < region.contentFrom || head > region.contentTo) return null
  return hasCalculation(region.tex) ? region : null
}

/** Cosa c'è da spiegare nella formula: il conto di Glifo, con le definizioni scritte prima nella nota. */
export function targetAt(state: EditorState, region: MathRegion): ExplainTarget | null {
  const tex = region.tex.trim()
  const sheet = sheetBefore(state, region.from)
  const defs = sheet.definitionsFor(formulaNames(solveRequest(tex) ?? calculationRequest(tex) ?? tex))
  return explainTarget(tex, sheet, defs)
}

/** I passaggi come elenco numerato della nota: la frase e la formula in linea (che la nota poi controlla). */
export function explanationMarkdown(e: Explanation): string {
  return e.steps
    .map((s, i) => {
      const text = s.text.replace(/\s*[:.]\s*$/, '')
      const formula = s.formula ? `$${s.formula}$` : ''
      return `${i + 1}. ${text}${text && formula ? ': ' : ''}${formula}`
    })
    .join('\n')
}

/**
 * Mette la spiegazione nella nota dopo il blocco (paragrafo, elenco, formula a blocco) della formula
 * spiegata: la stessa, la più vicina a `near` (nel frattempo la nota può essere cambiata). false se la
 * formula non c'è più.
 */
export function insertExplanation(view: EditorView, markdown: string, tex: string, near: number): boolean {
  const { state } = view
  let found: MathRegion | null = null
  for (const r of formulasUntil(state, state.doc.length)) {
    if (r.tex.trim() === tex && (!found || Math.abs(r.to - near) < Math.abs(found.to - near))) found = r
  }
  if (!found) return false
  insertAfterBlock(view, markdown, found.from, found.to)
  return true
}

/**
 * Mette la spiegazione dopo il blocco (un grafico, un paragrafo…) che contiene il testo spiegato: quello
 * più vicino a `near`, se nella nota c'è più volte. false se il testo non c'è più.
 */
export function insertAfterText(view: EditorView, markdown: string, text: string, near: number): boolean {
  const doc = view.state.doc.toString()
  let best = -1
  if (text) {
    for (let i = doc.indexOf(text); i >= 0; i = doc.indexOf(text, i + 1)) {
      if (best < 0 || Math.abs(i - near) < Math.abs(best - near)) best = i
    }
  }
  if (best < 0) return false
  insertAfterBlock(view, markdown, best, best + text.length)
  return true
}

/** Dopo il blocco di primo livello che contiene da `from` a `to`: non a metà paragrafo o dentro un elenco. */
function insertAfterBlock(view: EditorView, markdown: string, from: number, to: number): void {
  const { state } = view
  let block = syntaxTree(state).resolveInner(from, 1)
  while (block.parent && block.parent.name !== 'Document') block = block.parent
  const end = block.parent ? Math.max(block.to, to) : to
  const line = state.doc.lineAt(end)
  // Una riga vuota prima; dopo, se il testo continua subito (senza, sarebbe la coda dell'ultimo passaggio).
  const insert = `\n\n${markdown}${nextLineText(state.doc, line.number).trim() ? '\n' : ''}`
  const cursor = line.to + 2 + markdown.length
  view.dispatch({
    changes: { from: line.to, insert },
    selection: EditorSelection.cursor(cursor),
    scrollIntoView: true,
    userEvent: 'input',
  })
  view.focus()
}

function nextLineText(doc: Text, line: number): string {
  return line < doc.lines ? doc.line(line + 1).text : ''
}
