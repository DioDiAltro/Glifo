// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { schemaBlocks } from '../src/editor/schemaBlocks'
import { renderMarkdown } from '../src/render/markdown'
import { findSheetBlock } from '../src/spreadsheet/blocks'
import { hydrateSheets } from '../src/spreadsheet/preview'
import { graphImagesFor } from '../src/graph/file'
import { readChart } from '../src/graph/tableGraph'

// CodeMirror misura il testo sullo schermo: in jsdom bastano misure vuote.
Range.prototype.getClientRects = () => [] as unknown as DOMRectList
Range.prototype.getBoundingClientRect = () => new DOMRect()

const table = [
  '| Prodotto | Quantità | Prezzo | Totale |',
  '| --- | --- | --- | --- |',
  '| **Penne** | 10 | 1,50 € | =B2*C2 |',
  '| $x^2$ | 2 | 3 € | =B3*C3 |',
  '| <img src=x onerror="alert(1)"> | | | =SOMMA(D2:D3) |',
].join('\n')
const note = `# Spesa\n\nprima\n\n\`\`\`tabella\n${table}\n\`\`\`\n\ndopo`

let view: EditorView | null = null
afterEach(() => {
  view?.destroy()
  view = null
  document.body.replaceChildren()
})

describe('le tabelle nell\'anteprima', () => {
  it('il blocco ```tabella diventa la tabella con i risultati', () => {
    const host = document.createElement('div')
    host.innerHTML = renderMarkdown(note)
    const block = host.querySelector<HTMLElement>('.sheet-block')!
    expect(block.dataset.line).toBe('4')
    expect(block.dataset.hash).toMatch(/^[0-9a-f]{8}$/)
    expect(block.dataset.move).toBe('up down')
    expect(host.querySelector('pre')).toBeNull()
    const cells = [...block.querySelectorAll('td')].map((td) => td.textContent)
    expect(cells).toEqual(['Penne', '10', '1,50 €', '15,00 €', expect.stringContaining('x'), '2', '3 €', '6,00 €', '', '', '', '21,00 €'])
    expect(block.querySelector('th')?.textContent).toBe('Prodotto')
    // Il Markdown delle celle: grassetto e formule.
    expect(block.querySelector('td strong')?.textContent).toBe('Penne')
    expect(block.querySelector('td .katex')).not.toBeNull()
    // Passando sopra si vede la formula.
    expect(block.querySelectorAll('td')[3].getAttribute('title')).toBe('D2: =B2*C2')
  })

  it('l\'HTML scritto nelle celle passa dalla pulizia come il resto della nota', () => {
    const host = document.createElement('div')
    host.innerHTML = renderMarkdown(note)
    expect(host.querySelector('[onerror]')).toBeNull()
    expect(host.innerHTML).not.toContain('onerror')
  })

  it('nella propria nota ci sono «Modifica» e le frecce, nella pagina condivisa no', () => {
    const host = document.createElement('div')
    host.innerHTML = renderMarkdown(note)
    hydrateSheets(host)
    const tools = host.querySelector('.sheet-block .schema-preview-tools')!
    expect(tools.querySelector('.sheet-edit')?.textContent).toBe('Modifica')
    expect(tools.querySelectorAll('.block-move')).toHaveLength(2)
    expect(tools.querySelector('.block-move')?.getAttribute('aria-label')).toBe('Sposta la tabella più su nella nota')
    // Una seconda volta non si aggiungono.
    hydrateSheets(host)
    expect(host.querySelectorAll('.sheet-edit')).toHaveLength(1)
    const shared = document.createElement('div')
    shared.innerHTML = renderMarkdown(note, { untrusted: true })
    expect(shared.querySelector('.sheet-edit, .block-move')).toBeNull()
  })

  it('dall\'impronta dell\'anteprima si ritrova il blocco, anche se il testo prima è cambiato', () => {
    const host = document.createElement('div')
    host.innerHTML = renderMarkdown(note)
    const hash = host.querySelector<HTMLElement>('.sheet-block')!.dataset.hash!
    expect(findSheetBlock(note, 4, { hash })?.source).toBe(table)
    const moved = `Una riga in più\n\n${note}`
    expect(findSheetBlock(moved, 4, { hash })?.line).toBe(6)
    expect(findSheetBlock(note, 4, { hash: '00000000' })).toBeNull()
    expect(findSheetBlock(note, 4, { source: table })?.line).toBe(4)
    // Anche nella voce di un elenco, con il rientro.
    const item = `- voce\n\n  \`\`\`tabella\n  | =1+1 |\n  \`\`\``
    const itemHost = document.createElement('div')
    itemHost.innerHTML = renderMarkdown(item)
    const itemHash = itemHost.querySelector<HTMLElement>('.sheet-block')!.dataset.hash!
    expect(findSheetBlock(item, 2, { hash: itemHash })?.source).toBe('  | =1+1 |')
  })
})

describe('le tabelle nell\'editor del testo', () => {
  function setup(doc: string, onEdit = vi.fn()) {
    const parent = document.createElement('div')
    document.body.append(parent)
    view = new EditorView({ parent, state: EditorState.create({ doc, extensions: schemaBlocks(onEdit) }) })
    return { view, onEdit }
  }

  it('il blocco diventa una riga «Tabella» con le misure e i titoli, e «Modifica» dice riga e testo', () => {
    const { view, onEdit } = setup(note)
    const row = view.dom.querySelector<HTMLElement>('.cm-schema')!
    expect(row.dataset.kind).toBe('tabella')
    expect(row.textContent).toContain('Tabella · 4 righe, 4 colonne · Prodotto, Quantità, Prezzo, Totale')
    row.querySelector('button')!.click()
    expect(onEdit).toHaveBeenCalledWith('tabella', 4, table)
  })

  it('quello che si scrive subito dopo va su una riga sua', () => {
    const { view } = setup(note)
    const end = view.state.doc.toString().indexOf('```\n\ndopo') + 3
    view.dispatch({ changes: { from: end, insert: 'x' }, userEvent: 'input.type' })
    expect(view.state.doc.toString()).toContain('```\nx\n\ndopo')
  })

  it('una tabella vuota lo dice', () => {
    const { view } = setup('```tabella\n```')
    expect(view.dom.querySelector('.cm-schema')!.textContent).toContain('Tabella · vuota')
  })
})

describe('i grafici con i dati di una tabella della nota', () => {
  const data = [
    '| **Quantità** | **Costi totali** | **Ricavi** |',
    '| 0 | 12.000 € | =10*A2 {0 €} |',
    '| 2000 | =12000+4*A3 {0 €} | =10*A3 {0 €} |',
    '| 4000 | =12000+4*A4 {0 €} | =10*A4 {0 €} |',
  ].join('\n')
  const graph = '```grafico\ndati: A1:C4\npareggio: Ricavi, Costi totali\n```'

  it('il grafico prende i numeri dell\'ultima tabella prima di lui', () => {
    const host = document.createElement('div')
    host.innerHTML = renderMarkdown(`${graph}\n\n\`\`\`tabella\n| altro | 1 |\n\`\`\`\n\n\`\`\`tabella\n${data}\n\`\`\`\n\n${graph}\n\n\`\`\`grafico\ny = x\n\`\`\``)
    const blocks = [...host.querySelectorAll<HTMLElement>('.graph-block')]
    expect(blocks).toHaveLength(3)
    // Prima di ogni tabella: lo dice.
    expect(readChart(blocks[0])?.error).toMatch(/non c'è una tabella/)
    // Dopo due tabelle: quella subito sopra.
    expect(readChart(blocks[1])?.table?.names).toEqual(['Quantità', 'Costi totali', 'Ricavi'])
    expect(readChart(blocks[1])?.table?.rows).toEqual([[0, 12000, 0], [2000, 20000, 20000], [4000, 28000, 40000]])
    // Senza la riga dati: niente numeri.
    expect(blocks[2].dataset.table).toBeUndefined()
  })

  it('nel file .md l\'immagine del grafico ha il punto di pareggio', () => {
    const images = graphImagesFor(`\`\`\`tabella\n${data}\n\`\`\`\n\n${graph}`)
    const image = [...images.values()][0]
    expect(image).toContain('Punto di pareggio')
    expect(image).toContain('(2.000; 20.000 €)')
  })
})
