/**
 * Il pannello «Spiega con l'AI» (src/ui/aiPanel.ts): quello che si può spiegare nella nota, in ordine. I
 * conti (le formule con un risultato di Glifo, come per «Spiegami») e i grafici. Le formule si leggono
 * dall'alto in basso con le definizioni scritte prima, come i risultati della nota: un foglio solo,
 * una formula alla volta.
 */
import { ensureSyntaxTree, syntaxTree } from '@codemirror/language'
import type { EditorState } from '@codemirror/state'
import { explainTarget, formulaNames, type ExplainTarget } from '../ai/explain'
import { graphNames } from '../graph/spec'
import { calculationRequest, Sheet, solveRequest } from '../math/sheet'
import { findFencedBlocks } from '../schema/blocks'
import { formulasUntil } from './calcResults'
import { hasCalculation } from './explainInsert'

export type SubjectKind = 'conto' | 'grafico'

export interface NoteSubject {
  kind: SubjectKind
  /** Dove sta nella nota: la formula con i $, il blocco con le righe ```. */
  from: number
  to: number
  /** La formula (senza i $) o il testo del blocco: per ritrovarla se intanto la nota cambia. */
  source: string
  /** Il conto, con il risultato di Glifo. */
  target?: ExplainTarget
  /** Le definizioni della nota che il grafico usa. */
  defs?: string[]
}

/** Quanto si aspetta che CodeMirror legga tutta la nota, in millisecondi: oltre, si va con quello che ha letto. */
const PARSE_MS = 200

export function subjectsIn(state: EditorState): NoteSubject[] {
  // L'albero completo: quello dello stato può essere solo l'inizio (vedi tests/support/editorState.ts).
  const tree = ensureSyntaxTree(state, state.doc.length, PARSE_MS) ?? syntaxTree(state)
  const formulas = formulasUntil(state, state.doc.length, tree)
  const graphs = findFencedBlocks(state.doc.toString(), 'grafico').filter((b) => b.closed && b.source.trim())
  const out: NoteSubject[] = []
  const sheet = new Sheet()
  let next = 0
  // I grafici prima di `pos`, con le definizioni scritte fin lì.
  const graphsBefore = (pos: number) => {
    for (; next < graphs.length && graphs[next].from < pos; next++) {
      const b = graphs[next]
      let defs: string[] = []
      try {
        defs = sheet.definitionsFor(graphNames(b.source))
      } catch {
        defs = []
      }
      out.push({ kind: 'grafico', from: b.from, to: b.to, source: b.source, defs })
    }
  }
  for (const region of formulas) {
    graphsBefore(region.from)
    const tex = region.tex.trim()
    if (!hasCalculation(tex)) {
      try {
        sheet.add(tex)
      } catch {
        // Una formula che Glifo non legge non definisce niente.
      }
      continue
    }
    // explainTarget legge la formula nel foglio (come `add`): una definizione con «=» vale per quelle dopo.
    let target: ExplainTarget | null = null
    try {
      const defs = sheet.definitionsFor(formulaNames(solveRequest(tex) ?? calculationRequest(tex) ?? tex))
      target = explainTarget(tex, sheet, defs)
    } catch {
      target = null
    }
    if (target) out.push({ kind: 'conto', from: region.from, to: region.to, source: tex, target })
  }
  graphsBefore(Infinity)
  return out
}
