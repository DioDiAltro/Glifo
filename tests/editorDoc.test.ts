// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { redo, undo } from '@codemirror/commands'
import { MarkdownEditor } from '../src/editor/editor'

// CodeMirror misura il testo sullo schermo: in jsdom bastano misure vuote.
Range.prototype.getClientRects = () => [] as unknown as DOMRectList
Range.prototype.getBoundingClientRect = () => new DOMRect()

let editor: MarkdownEditor | null = null
afterEach(() => {
  editor?.view.destroy()
  editor = null
})

/** Editor con il testo dato; `changes` raccoglie i testi per cui l'editor chiede un salvataggio. */
function setup(doc: string) {
  const changes: string[] = []
  const host = document.createElement('div')
  document.body.append(host)
  editor = new MarkdownEditor(host, doc, {
    onDocChange: (d) => changes.push(d),
    onScroll: () => {},
    onSave: () => {},
    onFocusSearch: () => {},
    onEditSchema: () => {},
  })
  const type = (text: string, at = editor!.view.state.doc.length) =>
    editor!.view.dispatch({ changes: { from: at, insert: text }, selection: { anchor: at + text.length }, userEvent: 'input.type' })
  return { editor, changes, type }
}

describe('cambio di nota', () => {
  it('Annulla non riporta il testo della nota di prima', () => {
    const { editor, changes, type } = setup('# Nota A')
    type(' scritta')
    editor.setDoc('# Nota B')
    changes.length = 0
    undo(editor.view)
    expect(editor.getDoc()).toBe('# Nota B')
    expect(changes).toEqual([])
  })

  it('Annulla e Ripeti continuano a funzionare nella nota nuova', () => {
    const { editor, type } = setup('# Nota A')
    editor.setDoc('# Nota B')
    type(' con testo')
    undo(editor.view)
    expect(editor.getDoc()).toBe('# Nota B')
    redo(editor.view)
    expect(editor.getDoc()).toBe('# Nota B con testo')
  })
})

describe('testo salvato in un\'altra scheda', () => {
  it('arriva senza chiedere un salvataggio e lascia il cursore al suo posto', () => {
    const { editor, changes, type } = setup('uno due')
    type(' tre')
    changes.length = 0
    editor.applyExternalDoc('zero uno due tre')
    expect(editor.getDoc()).toBe('zero uno due tre')
    expect(editor.view.state.selection.main.head).toBe('zero uno due tre'.length)
    expect(changes).toEqual([])
  })

  it('Annulla toglie solo quello scritto in questa scheda', () => {
    const { editor, type } = setup('uno due')
    type(' tre')
    editor.applyExternalDoc('zero uno due tre')
    undo(editor.view)
    expect(editor.getDoc()).toBe('zero uno due')
  })
})
