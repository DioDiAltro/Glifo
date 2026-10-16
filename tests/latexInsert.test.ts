import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { EditorState } from '@codemirror/state'
import { describe, expect, it } from 'vitest'
import { formulaInsertion } from '../src/editor/latexInsert'
import { mathMarkdown } from '../src/editor/mathSyntax'
import { fullyParsed } from './support/editorState'

/** Il testo dopo l'inserimento: `|` nel documento è il cursore. */
function insert(doc: string, formulas: string[]): string {
  const at = doc.indexOf('|')
  const state = fullyParsed(
    EditorState.create({ doc: doc.replace('|', ''), selection: { anchor: at }, extensions: [markdown({ base: markdownLanguage, extensions: [mathMarkdown] })] }),
  )
  const next = state.update(formulaInsertion(state, formulas)).state
  const cursor = next.selection.main.head
  return next.doc.sliceString(0, cursor) + '|' + next.doc.sliceString(cursor)
}

describe('le formule della lavagna nella nota', () => {
  it('su una riga vuota: un blocco $$ su righe proprie', () => {
    expect(insert('Integrale:\n|\nFine', ['\\int_0^1 x^2 dx=\\frac{1}{3}'])).toBe('Integrale:\n$$\n\\int_0^1 x^2 dx=\\frac{1}{3}\n$$|\nFine')
  })

  it('dentro una riga con del testo: tra $ e $, staccata dalle parole', () => {
    expect(insert('Quindi| vale.', ['x^2'])).toBe('Quindi $x^2$| vale.')
    expect(insert('Quindi |e basta', ['x^2'])).toBe('Quindi $x^2$ |e basta')
  })

  it('più formule: un blocco ciascuna, anche in mezzo al testo', () => {
    expect(insert('|', ['a=1', 'b=2'])).toBe('$$\na=1\n$$\n\n$$\nb=2\n$$|')
    expect(insert('Ecco| qui', ['a=1', 'b=2'])).toBe('Ecco\n\n$$\na=1\n$$\n\n$$\nb=2\n$$\n\n| qui')
  })

  it('dentro una formula va così com\'è', () => {
    expect(insert('$$\ny = |\n$$', ['x^2'])).toBe('$$\ny = x^2|\n$$')
  })
})
