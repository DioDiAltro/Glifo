import { EditorSelection, type EditorState, type TransactionSpec } from '@codemirror/state'
import { mathContextAt } from './mathContext'

/**
 * Le formule lette dalla lavagna nella nota, dove c'è il cursore (AI.md, punto 2): una sola, in una riga
 * con del testo, va tra `$…$`; altrimenti ognuna in un blocco `$$` su righe proprie, come i simboli grandi
 * (`templateInsertion`). Dentro una formula o un blocco di codice va così com'è.
 */
export function formulaInsertion(state: EditorState, formulas: readonly string[]): TransactionSpec {
  const { from, to } = state.selection.main
  const ctx = mathContextAt(state, from)
  const textBefore = state.sliceDoc(state.doc.lineAt(from).from, from)
  const textAfter = state.sliceDoc(to, state.doc.lineAt(to).to)
  let insert: string
  if (ctx.inMath || ctx.inCode) insert = formulas.join(' ')
  else if (formulas.length === 1 && (textBefore.trim() || textAfter.trim())) {
    const lead = textBefore && !/\s$/.test(textBefore) ? ' ' : ''
    const tail = /^[\p{L}\p{N}]/u.test(textAfter) ? ' ' : ''
    insert = `${lead}$${formulas[0]}$${tail}`
  } else {
    const blocks = formulas.map((f) => `$$\n${f}\n$$`).join('\n\n')
    insert = (textBefore.trim() ? '\n\n' : '') + blocks + (textAfter.trim() ? '\n\n' : '')
  }
  return { changes: { from, to, insert }, selection: EditorSelection.cursor(from + insert.length), scrollIntoView: true, userEvent: 'input' }
}
