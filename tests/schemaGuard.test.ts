import { describe, expect, it } from 'vitest'
import { EditorSelection, EditorState, type TransactionSpec } from '@codemirror/state'
import { toggleLinePrefix } from '../src/editor/insert'
import { LIST_STYLES, applyListStyle } from '../src/editor/lists'
import { schemaBlocks } from '../src/editor/schemaBlocks'
import { findSchemaBlocks } from '../src/schema/blocks'

const block = '```schema\n{"v":1,"nodes":[],"edges":[]}\n```'

/** «|» è il cursore. */
function setup(src: string) {
  let state = EditorState.create({
    doc: src.replace('|', ''),
    selection: EditorSelection.cursor(src.indexOf('|')),
    extensions: schemaBlocks(() => {}),
  })
  return {
    get state() {
      return state
    },
    dispatch: (...specs: TransactionSpec[]) => {
      state = state.update(...specs).state
    },
  }
}

type Target = ReturnType<typeof setup>

/** Il testo con il cursore (o la selezione tra ‹ e ›). */
function show(t: Target): string {
  const doc = t.state.doc.toString()
  const { from, to } = t.state.selection.main
  return from === to ? doc.slice(0, from) + '|' + doc.slice(from) : doc.slice(0, from) + '‹' + doc.slice(from, to) + '›' + doc.slice(to)
}

const schemas = (t: Target) => findSchemaBlocks(t.state.doc.toString()).filter((b) => b.closed).length
const heading = (t: Target) => toggleLinePrefix(t, '## ', /^#{1,6}\s+/)
const pos = (t: Target) => t.state.selection.main.head

describe('le righe di uno schema nel testo non si rompono', () => {
  it('«Titolo» col cursore subito dopo o subito prima dello schema mette il titolo su una riga nuova', () => {
    const after = setup(`testo\n\n${block}|\n\ndopo`)
    heading(after)
    expect(show(after)).toBe(`testo\n\n${block}\n## |\n\ndopo`)
    const before = setup(`testo\n\n|${block}`)
    heading(before)
    expect(show(before)).toBe(`testo\n\n## |\n${block}`)
    expect(schemas(after) + schemas(before)).toBe(2)
  })

  it('con tutto selezionato, «Titolo» cambia le righe di testo e lascia stare lo schema', () => {
    const t = setup(`testo\n${block}\ndopo`)
    t.dispatch({ selection: EditorSelection.range(0, t.state.doc.length) })
    heading(t)
    expect(t.state.doc.toString()).toBe(`## testo\n${block}\n## dopo`)
  })

  it('un elenco col cursore sul bordo dello schema comincia su una riga nuova', () => {
    const t = setup(`${block}|`)
    applyListStyle(t, LIST_STYLES.find((s) => s.label === 'Trattini')!.style)
    expect(show(t)).toBe(`${block}\n- |`)
  })

  it('scrivendo subito prima o subito dopo lo schema, il testo va su una riga sua', () => {
    const after = setup(`${block}|`)
    after.dispatch({ changes: { from: pos(after), insert: 'x' }, selection: EditorSelection.cursor(pos(after) + 1), userEvent: 'input.type' })
    expect(show(after)).toBe(`${block}\nx|`)
    const before = setup(`prima\n|${block}`)
    before.dispatch({ changes: { from: pos(before), insert: 'x' }, selection: EditorSelection.cursor(pos(before) + 1), userEvent: 'input.type' })
    expect(show(before)).toBe(`prima\nx|\n${block}`)
    // Il grassetto (o un'altra cosa che seleziona il testo inserito) resta selezionato.
    const bold = setup(`${block}|`)
    const at = pos(bold)
    bold.dispatch({ changes: { from: at, insert: '**grassetto**' }, selection: EditorSelection.range(at + 2, at + 11), userEvent: 'input' })
    expect(show(bold)).toBe(`${block}\n**‹grassetto›**`)
    expect(schemas(after) + schemas(before) + schemas(bold)).toBe(3)
  })

  it('⌫ e Canc non attaccano una riga di testo allo schema: il cursore passa oltre', () => {
    const back = setup(`testo\n|${block}`)
    back.dispatch({ changes: { from: pos(back) - 1, to: pos(back) }, userEvent: 'delete.backward' })
    expect(show(back)).toBe(`testo|\n${block}`)
    const forward = setup(`${block}|\ndopo`)
    forward.dispatch({ changes: { from: pos(forward), to: pos(forward) + 1 }, userEvent: 'delete.forward' })
    expect(show(forward)).toBe(`${block}\n|dopo`)
    // Una riga vuota invece si toglie.
    const empty = setup(`testo\n\n|${block}`)
    empty.dispatch({ changes: { from: pos(empty) - 1, to: pos(empty) }, userEvent: 'delete.backward' })
    expect(empty.state.doc.toString()).toBe(`testo\n${block}`)
    expect(schemas(back) + schemas(forward) + schemas(empty)).toBe(3)
  })

  it('lo schema si può togliere tutto, e l\'editor degli schemi lo cambia dentro', () => {
    const t = setup(`prima\n${block}\ndopo|`)
    const [b] = findSchemaBlocks(t.state.doc.toString())
    t.dispatch({ changes: { from: b.contentFrom, to: b.contentTo, insert: '{"v":1,"nodes":[{"id":"a"}],"edges":[]}' }, userEvent: 'input' })
    expect(schemas(t)).toBe(1)
    const [changed] = findSchemaBlocks(t.state.doc.toString())
    t.dispatch({ changes: { from: changed.from, to: changed.to }, userEvent: 'delete' })
    expect(t.state.doc.toString()).toBe('prima\n\ndopo')
  })

  it('le modifiche che non vengono da chi scrive (per esempio da un\'altra scheda) passano come sono', () => {
    const t = setup(`${block}|`)
    t.dispatch({ changes: { from: pos(t), insert: 'x' } })
    expect(t.state.doc.toString()).toBe(`${block}x`)
  })
})
