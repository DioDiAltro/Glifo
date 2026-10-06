// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { renderMarkdown } from '../src/render/markdown'
import { schemaBlocks } from '../src/editor/schemaBlocks'
import { hydrateSchemas } from '../src/schema/preview'

// CodeMirror misura il testo sullo schermo: in jsdom bastano misure vuote.
Range.prototype.getClientRects = () => [] as unknown as DOMRectList
Range.prototype.getBoundingClientRect = () => new DOMRect()

const schema = '{"v":1,"nodes":[\n{"id":"a","shape":"rect","x":0,"y":0,"w":120,"h":60,"text":"A <b>"}\n],"edges":[]}'
const note = `# Titolo\n\nprima\n\n\`\`\`schema\n${schema}\n\`\`\`\n\ndopo`

let view: EditorView | null = null
afterEach(() => {
  view?.destroy()
  view = null
  document.body.replaceChildren()
})

describe('gli schemi nell\'anteprima', () => {
  it('il blocco ```schema lascia il posto al disegno, con la sua riga e il suo testo', () => {
    const host = document.createElement('div')
    host.innerHTML = renderMarkdown(note)
    const block = host.querySelector<HTMLElement>('.schema-block')!
    expect(block.dataset.line).toBe('4')
    // Come il testo del blocco nella nota (senza l'a capo finale): così lo si ritrova.
    expect(block.dataset.schema).toBe(schema)
    expect(host.querySelector('pre')).toBeNull()
    // Il testo dello schema non diventa HTML.
    expect(host.querySelector('b')).toBeNull()
  })

  it('uno schema che non si legge mostra perché, uno vuoto lo dice', async () => {
    const host = document.createElement('div')
    host.innerHTML = renderMarkdown('```schema\n{rotto\n```\n\n```schema\n{"v":1,"nodes":[],"edges":[]}\n```\n')
    document.body.append(host)
    hydrateSchemas(host, { theme: 'light', surface: '#fff' })
    const [broken, empty] = host.querySelectorAll<HTMLElement>('.schema-block')
    await vi.waitFor(() => expect(broken.querySelector('.schema-error')?.textContent).toContain('non si riesce a leggere'))
    await vi.waitFor(() => expect(empty.classList.contains('is-empty')).toBe(true))
    expect(empty.querySelector('.schema-edit')?.textContent).toBe('Modifica')
  })
})

describe('gli schemi nell\'editor del testo', () => {
  function setup(doc: string, onEdit = vi.fn()) {
    const parent = document.createElement('div')
    document.body.append(parent)
    view = new EditorView({ parent, state: EditorState.create({ doc, extensions: schemaBlocks(onEdit) }) })
    return { view, onEdit }
  }

  it('il blocco diventa una riga «Schema» con «Modifica», che dice riga e testo', () => {
    const { view, onEdit } = setup(note)
    const row = view.dom.querySelector<HTMLElement>('.cm-schema')!
    expect(row.textContent).toContain('Schema · 1 forma, 0 frecce')
    row.querySelector('button')!.click()
    expect(onEdit).toHaveBeenCalledWith('schema', 4, schema)
  })

  it('si cancella tutto insieme e si aggiorna quando cambia; quello non chiuso resta testo', () => {
    const { view } = setup(note)
    const start = view.state.doc.toString().indexOf('```schema')
    const end = view.state.doc.toString().indexOf('```\n\ndopo') + 3
    // Il blocco è un pezzo unico: Backspace subito dopo lo toglie tutto.
    let atomic = false
    for (const set of view.state.facet(EditorView.atomicRanges)) set(view).between(start, end, (from, to) => void (atomic ||= from === start && to === end))
    expect(atomic).toBe(true)
    // Cambiare il testo prima non lo ridisegna; cambiare il contenuto sì.
    view.dispatch({ changes: { from: 2, insert: 'Nuovo ' } })
    expect(view.dom.querySelector('.cm-schema')!.textContent).toContain('1 forma')
    const content = view.state.doc.toString().indexOf('{"v":1')
    view.dispatch({ changes: { from: content, to: content + schema.length, insert: '{"v":1,"nodes":[],"edges":[]}' } })
    expect(view.dom.querySelector('.cm-schema')!.textContent).toContain('0 forme')
    view.dispatch({ changes: { from: view.state.doc.length, insert: '\n\n```schema\n{' } })
    expect(view.dom.querySelectorAll('.cm-schema')).toHaveLength(1)
  })
})
