import { ensureSyntaxTree } from '@codemirror/language'
import type { EditorState } from '@codemirror/state'

/**
 * Lo stesso stato, con l'analisi del Markdown finita. `ensureSyntaxTree` completa l'analisi
 * ma non cambia l'albero che lo stato restituisce (è quello della prima analisi, che ha pochi
 * millisecondi e su un computer lento si ferma presto): come fa l'editor, si passa a uno
 * stato nuovo, che ha l'albero completo.
 */
export function fullyParsed(state: EditorState): EditorState {
  if (!ensureSyntaxTree(state, state.doc.length, 5000)) throw new Error('Analisi del Markdown non finita in 5 secondi')
  return state.update({}).state
}
