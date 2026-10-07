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

/** La formula chiusa in cui è il cursore, se ha un «=» o un ⇒ (le altre non hanno un conto da spiegare). */
export function regionToExplain(state: EditorState): MathRegion | null {
  const head = state.selection.main.head
  const region = mathRegionAt(state, head)
  if (!region || !region.closed || head < region.contentFrom || head > region.contentTo) return null
  return /=|\\(?:Rightarrow|implies|iff|Leftrightarrow)\b|[⇒⇔≈]|\\approx/.test(region.tex) ? region : null
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
  // Il blocco di primo livello che contiene la formula: la spiegazione va dopo, non a metà paragrafo.
  let block = syntaxTree(state).resolveInner(found.from, 1)
  while (block.parent && block.parent.name !== 'Document') block = block.parent
  const end = block.parent ? Math.max(block.to, found.to) : found.to
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
  return true
}

function nextLineText(doc: Text, line: number): string {
  return line < doc.lines ? doc.line(line + 1).text : ''
}
