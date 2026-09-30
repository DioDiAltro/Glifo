import { describe, expect, it } from 'vitest'
import { EditorSelection, EditorState, type TransactionSpec } from '@codemirror/state'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { fullyParsed } from './support/editorState'
import { mathMarkdown } from '../src/editor/mathSyntax'
import { wordsToCheck } from '../src/editor/spellcheck'
import {
  LIST_STYLES,
  applyListStyle,
  continueList,
  deleteListMarker,
  indentListItems,
  noIndentedCode,
  outdentListItems,
} from '../src/editor/lists'
import type { CommandTarget } from '../src/editor/placeholders'

/** «|» è il cursore (all'inizio se manca); «‹» e «›» delimitano una selezione. */
function setup(src: string): CommandTarget {
  let doc = src
  let anchor: number
  let head: number
  if (src.includes('‹')) {
    anchor = src.indexOf('‹')
    doc = src.replace('‹', '')
    head = doc.indexOf('›')
    doc = doc.replace('›', '')
  } else {
    anchor = head = Math.max(0, src.indexOf('|'))
    doc = src.replace('|', '')
  }
  let state = fullyParsed(
    EditorState.create({
      doc,
      selection: EditorSelection.single(anchor, head),
      extensions: [markdown({ base: markdownLanguage, extensions: [mathMarkdown, noIndentedCode] })],
    }),
  )
  return {
    get state() {
      return state
    },
    dispatch: (...specs: TransactionSpec[]) => {
      state = state.update(...specs).state
    },
  }
}

/** Il testo dopo il comando, con il cursore; false se il comando non si applica. */
function run(src: string, cmd: (t: CommandTarget) => boolean): string | false {
  const t = setup(src)
  if (!cmd(t)) return false
  const doc = t.state.doc.toString()
  const head = t.state.selection.main.head
  return doc.slice(0, head) + '|' + doc.slice(head)
}

const lines = (...l: string[]) => l.join('\n')

describe('Invio negli elenchi', () => {
  it('continua con il marcatore successivo', () => {
    expect(run('1) qualcosa|', continueList)).toBe('1) qualcosa\n2) |')
    expect(run('a) uno|', continueList)).toBe('a) uno\nb) |')
    expect(run('(ii) due|', continueList)).toBe('(ii) due\n(iii) |')
    expect(run('h) otto\ni) nove|', continueList)).toBe('h) otto\ni) nove\nj) |')
    expect(run('i) uno|', continueList)).toBe('i) uno\nii) |')
    expect(run('    es) esempio|', continueList)).toBe('    es) esempio\n    es) |')
    expect(run('- punto|', continueList)).toBe('- punto\n- |')
    expect(run('- [x] fatto|', continueList)).toBe('- [x] fatto\n- [ ] |')
  })

  it('porta nel nuovo elemento il testo dopo il cursore e rinumera quelli che seguono', () => {
    expect(run('1) prima| dopo', continueList)).toBe('1) prima\n2) |dopo')
    expect(run(lines('a) uno|', 'b) due', '   i) figlio', 'c) tre'), continueList)).toBe(
      lines('a) uno', 'b) |', 'c) due', '   i) figlio', 'd) tre'),
    )
  })

  it('su un elemento vuoto torna al livello di sopra, o chiude l\'elenco', () => {
    expect(run(lines('1) a', '   a) b', '   b) |'), continueList)).toBe(lines('1) a', '   a) b', '2) |'))
    expect(run(lines('1) a', '2) |'), continueList)).toBe(lines('1) a', '', '|'))
  })

  it('non interviene nel codice, nel marcatore o fuori dagli elenchi', () => {
    expect(run(lines('```', '- a|', '```'), continueList)).toBe(false)
    expect(run('|- a', continueList)).toBe(false)
    expect(run('testo|', continueList)).toBe(false)
  })
})

describe('Tab e Maiusc+Tab negli elenchi', () => {
  it('Tab annida sotto l\'elemento precedente, allineato al suo testo', () => {
    expect(run(lines('1) qualcosa', '2) |'), indentListItems)).toBe(lines('1) qualcosa', '   a) |'))
    expect(run(lines('a) uno', 'b) |due'), indentListItems)).toBe(lines('a) uno', '   i) |due'))
    expect(run(lines('es) questo', 'es) |'), indentListItems)).toBe(lines('es) questo', '    - |'))
    expect(run(lines('- a', '- |b'), indentListItems)).toBe(lines('- a', '  - |b'))
  })

  it('si aggiunge in fondo ai figli che ci sono già', () => {
    expect(run(lines('1) qualcosa', '    es) questo', '2) |'), indentListItems)).toBe(lines('1) qualcosa', '    es) questo', '    es) |'))
    expect(run(lines('1) A', '   a) x', '2) |'), indentListItems)).toBe(lines('1) A', '   a) x', '   b) |'))
  })

  it('sposta anche i figli e rinumera gli elementi che seguono', () => {
    expect(run(lines('1) A', '2) |B', '   a) b1', '3) C'), indentListItems)).toBe(lines('1) A', '   a) |B', '      a) b1', '2) C'))
  })

  it('con più righe selezionate le sposta tutte', () => {
    expect(run(lines('1) A', '‹2) B', '3) C›', '4) D'), indentListItems)).toBe(lines('1) A', '   a) B', '   b) C|', '2) D'))
  })

  it('il primo elemento non si sposta; fuori dagli elenchi Tab fa il solito', () => {
    expect(run('1) solo|', indentListItems)).toBe('1) solo|')
    expect(run('testo|', indentListItems)).toBe(false)
  })

  it('Maiusc+Tab riporta al livello di sopra', () => {
    expect(run(lines('1) A', '   a) x', '   b) y|', '   c) z', '2) B'), outdentListItems)).toBe(
      lines('1) A', '   a) x', '2) y|', '   a) z', '3) B'),
    )
    expect(run(lines('- a', '  - b|'), outdentListItems)).toBe(lines('- a', '- b|'))
    expect(run('1) A|', outdentListItems)).toBe('1) A|')
  })

  it('l\'esempio del quaderno si scrive tutto da tastiera', () => {
    const t = setup('|')
    const type = (text: string) => {
      const pos = t.state.selection.main.head
      t.dispatch({ changes: { from: pos, insert: text }, selection: { anchor: pos + text.length } })
    }
    const enter = () => continueList(t) || type('\n')
    type('1) qualcosa')
    enter()
    indentListItems(t) // 2) → a)
    // Cambia il marcatore a mano: «a) » diventa «es) »
    deleteListMarker(t)
    type('es) questo')
    enter()
    indentListItems(t) // es) → -, sotto «es)»: poi a mano «i)»
    deleteListMarker(t)
    type('i) di questo, ii) di questo')
    enter()
    outdentListItems(t) // torna al livello di «es)»
    deleteListMarker(t)
    type('- questo però')
    enter()
    indentListItems(t)
    deleteListMarker(t)
    type('a) del però, b) del però')
    expect(t.state.doc.toString()).toBe(
      lines('1) qualcosa', '   es) questo', '       i) di questo, ii) di questo', '   - questo però', '     a) del però, b) del però'),
    )
  })
})

describe('Backspace e menu degli elenchi', () => {
  it('Backspace subito dopo il marcatore lo toglie', () => {
    expect(run('   a) |testo', deleteListMarker)).toBe('   |testo')
    expect(run('- [ ] |x', deleteListMarker)).toBe('|x')
    expect(run('- te|sto', deleteListMarker)).toBe(false)
  })

  const style = (label: string) => LIST_STYLES.find((s) => s.label === label)!.style
  const apply = (src: string, label: string) => {
    const t = setup(src)
    applyListStyle(t, style(label))
    return t.state.doc.toString()
  }

  it('trasforma le righe selezionate nel tipo di elenco scelto', () => {
    expect(apply('‹uno\ndue\n\ntre›', 'Lettere')).toBe('a) uno\nb) due\n\nc) tre')
    expect(apply('‹1) uno\n2) due›', 'Numeri romani')).toBe('i) uno\nii) due')
    expect(apply('‹1) uno\n   a) due\n2) tre\n   a) quattro›', 'Trattini')).toBe('- uno\n   - due\n- tre\n   - quattro')
    expect(apply('comp|ito', 'Cose da fare')).toBe('- [ ] compito')
    expect(apply('es) uno', 'Esempi')).toBe('uno')
    expect(apply('‹a) uno\nb) due›', 'Lettere')).toBe('uno\ndue')
  })

  it('continua la numerazione dell\'elenco sopra', () => {
    expect(apply('a) uno\n|due', 'Lettere')).toBe('a) uno\nb) due')
  })

  it('il correttore non controlla i marcatori', () => {
    const t = setup('ii) testo\niii) altro\nes) esempio')
    expect(wordsToCheck(t.state, 0, t.state.doc.length).map((w) => w.word)).toEqual(['testo', 'altro', 'esempio'])
  })
})
