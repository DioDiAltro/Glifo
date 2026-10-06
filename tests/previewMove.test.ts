// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { hydrateGraphs, remapLineKeys, renameGraphScope, renameScopeKeys } from '../src/graph/preview'
import { renderMarkdown } from '../src/render/markdown'
import { hydrateSchemas } from '../src/schema/preview'
import { Preview, type PreviewCallbacks } from '../src/ui/preview'

// In jsdom non c'è: dopo Annulla l'anteprima mostra il blocco tornato al suo posto.
Element.prototype.scrollIntoView ??= () => {}

const schema = '{"v":1,"nodes":[{"id":"a","shape":"rect","x":0,"y":0,"w":120,"h":60,"text":"A"}],"edges":[]}'
const note = `# Titolo\n\nPrimo\n\n\`\`\`grafico\ny = x\n\`\`\`\n\nSecondo\n\n\`\`\`schema\n${schema}\n\`\`\`\n`

function setup(onMoveBlock: PreviewCallbacks['onMoveBlock'] = () => null) {
  const calls = { edit: 0, jump: 0, moves: [] as unknown[][], undo: [] as boolean[] }
  const p = new Preview({
    onToggleTask: () => {},
    onJumpToLine: () => calls.jump++,
    onEditSchema: () => calls.edit++,
    onAddToGraph: () => {},
    onGraphLabels: () => {},
    onMoveBlock: (...args) => {
      calls.moves.push(args)
      return onMoveBlock(...args)
    },
    onUndo: (redo) => calls.undo.push(redo),
  })
  document.body.append(p.el)
  return { p, calls }
}

afterEach(() => {
  vi.useRealTimers()
  document.body.replaceChildren()
})

describe('le frecce di schemi e grafici nell\'anteprima', () => {
  it('il grafico ha ↑ ↓ dopo gli altri pulsanti; il clic dice blocco, riga, impronta e verso', () => {
    const { p, calls } = setup()
    p.update(note, true)
    const graph = p.el.querySelector<HTMLElement>('.graph-block')!
    const tools = [...graph.querySelectorAll<HTMLElement>('.graph-tools > *')].map((b) => b.dataset.action ?? b.className)
    expect(tools).toEqual(['in', 'out', 'reset', 'image', 'block-move-sep', 'block-move-group'])
    graph.querySelector<HTMLElement>('.block-move[data-dir="down"]')!.click()
    expect(calls.moves).toEqual([['grafico', 4, graph.dataset.hash, 'down']])
  })

  it('una freccia spenta non fa niente', () => {
    const { p, calls } = setup()
    p.update('```grafico\ny = x\n```\n\nA\n', true)
    const up = p.el.querySelector<HTMLElement>('.block-move[data-dir="up"]')!
    expect(up.getAttribute('aria-disabled')).toBe('true')
    expect(up.title).toBe('È già in cima alla nota')
    up.click()
    expect(calls.moves).toEqual([])
  })

  it('con un ridisegno in attesa il clic ridisegna e non sposta (righe vecchie)', () => {
    vi.useFakeTimers()
    const { p, calls } = setup()
    p.update(note, true)
    p.update(`Nuovo\n\n${note}`)
    p.el.querySelector<HTMLElement>('.graph-block .block-move[data-dir="down"]')!.click()
    expect(calls.moves).toEqual([])
    expect(p.el.querySelector<HTMLElement>('.graph-block')!.dataset.line).toBe('6')
  })

  it('dopo lo spostamento il fuoco torna sulla stessa freccia del blocco nella riga nuova', () => {
    const { p } = setup((_kind, _line, _hash, dir) => {
      // Come main.ts: la nota cambia e l'anteprima riceve il testo nuovo (con il solito ritardo).
      p.update(`# Titolo\n\nPrimo\n\nSecondo\n\n\`\`\`grafico\ny = x\n\`\`\`\n\n\`\`\`schema\n${schema}\n\`\`\`\n`)
      return dir === 'down' ? 6 : null
    })
    p.update(note, true)
    p.el.querySelector<HTMLElement>('.graph-block .block-move[data-dir="down"]')!.click()
    const graph = p.el.querySelector<HTMLElement>('.graph-block')!
    expect(graph.dataset.line).toBe('6')
    expect(document.activeElement).toBe(graph.querySelector('.block-move[data-dir="down"]'))
    expect(graph.classList.contains('just-moved')).toBe(true)
  })

  it('il doppio clic sulle frecce non apre lo schema e non porta all\'editor', async () => {
    const { p, calls } = setup()
    p.update(note, true)
    const block = p.el.querySelector<HTMLElement>('.schema-block')!
    await vi.waitFor(() => expect(block.querySelector('.schema-preview-tools .block-move')).not.toBeNull(), { timeout: 5000 })
    const arrow = block.querySelector<HTMLElement>('.block-move[data-dir="up"]')!
    arrow.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
    p.el.querySelector<HTMLElement>('.graph-block .block-move')!.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
    expect(calls.edit).toBe(0)
    expect(calls.jump).toBe(0)
    // «Modifica» resta e c'è anche lui nel gruppo in alto a destra.
    expect(block.querySelector('.schema-preview-tools .schema-edit')).not.toBeNull()
  })

  it('il doppio clic subito dopo una freccia, caduto sul blocco, non apre lo schema e non porta all\'editor', async () => {
    const { p, calls } = setup()
    p.update(note, true)
    const block = p.el.querySelector<HTMLElement>('.schema-block')!
    await vi.waitFor(() => expect(block.querySelector('.block-move')).not.toBeNull(), { timeout: 5000 })
    block.querySelector<HTMLElement>('.block-move[data-dir="up"]')!.click()
    block.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
    p.el.querySelector<HTMLElement>('.graph-block')!.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
    expect(calls.edit).toBe(0)
    expect(calls.jump).toBe(0)
  })

  it('se dopo lo spostamento il blocco non si vede (HTML non chiuso), lo spostamento si annulla', () => {
    const swallowed = '# Titolo\n\n<div>\n<!-- da finire\n\n```grafico\ny = x\n```\n'
    const { p, calls } = setup(() => {
      p.update(swallowed)
      return 5
    })
    p.update(note, true)
    p.el.querySelector<HTMLElement>('.graph-block .block-move[data-dir="down"]')!.click()
    expect(calls.undo).toEqual([false])
    expect(document.querySelector('.toast')?.textContent).toContain('lì non si vedrebbe')
  })

  it('se dopo lo spostamento il blocco è in un <details> chiuso, lo spostamento si annulla', () => {
    const inside = '# Titolo\n\n<details>\n<summary>Soluzione</summary>\n\n```grafico\ny = x\n```\n\nTesto.\n\n</details>\n'
    const { p, calls } = setup(() => {
      p.update(inside)
      return 5
    })
    p.update(note, true)
    p.el.querySelector<HTMLElement>('.graph-block .block-move[data-dir="down"]')!.click()
    expect(calls.undo).toEqual([false])
  })

  it('i <details> aperti restano aperti quando l\'anteprima si ridisegna, e dentro il grafico si sposta', () => {
    const inside = (after: boolean) =>
      `# E\n\n<details>\n<summary>Soluzione</summary>\n\n${after ? 'Spiegazione.\n\n' : ''}\`\`\`grafico\ny = x^2\n\`\`\`\n\n${after ? '' : 'Spiegazione.\n\n'}</details>\n\nAltro\n`
    const { p, calls } = setup(() => {
      p.update(inside(true))
      return 7
    })
    p.update(inside(false), true)
    p.el.querySelector('details')!.open = true
    p.el.querySelector<HTMLElement>('.graph-block .block-move[data-dir="down"]')!.click()
    expect(calls.moves.length).toBe(1)
    expect(calls.undo).toEqual([])
    expect(p.el.querySelector('details')!.open).toBe(true)
  })

  it('cambiato l\'id della nota (account), lo slider spostato resta anche scrivendo', () => {
    let scope = 'vecchio'
    const p = new Preview({
      onToggleTask: () => {},
      onJumpToLine: () => {},
      onEditSchema: () => {},
      onAddToGraph: () => {},
      onGraphLabels: () => {},
      onMoveBlock: () => null,
      onUndo: () => {},
      scope: () => scope,
    })
    document.body.append(p.el)
    const text = 'Testo\n\n```grafico\na = 2\ny = a x\n```\n'
    p.update(text, true)
    const field = () => p.el.querySelector<HTMLInputElement>('.graph-slider-value')!
    const slide = (value: string) => {
      field().focus()
      field().value = value
      field().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    }
    // Come applyAccountChange: gli slider passano all'id nuovo e l'anteprima si ridisegna.
    renameGraphScope('vecchio', 'nuovo')
    scope = 'nuovo'
    p.rescope()
    // Spostato subito dopo: senza il ridisegno finirebbe sotto l'id vecchio, e scrivendo si perderebbe.
    slide('3,5')
    p.update(text + 'x', true)
    expect(field().value).toBe('3,5')
  })

  it('Ctrl+Z con il fuoco su una freccia annulla nel testo; nelle caselle di testo no', () => {
    const { p, calls } = setup()
    p.update(note, true)
    const arrow = p.el.querySelector<HTMLElement>('.graph-block .block-move[data-dir="down"]')!
    arrow.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', ctrlKey: true, bubbles: true }))
    arrow.dispatchEvent(new KeyboardEvent('keydown', { key: 'Z', ctrlKey: true, shiftKey: true, bubbles: true }))
    arrow.dispatchEvent(new KeyboardEvent('keydown', { key: 'y', metaKey: true, bubbles: true }))
    const input = document.createElement('input')
    p.content.append(input)
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', ctrlKey: true, bubbles: true }))
    expect(calls.undo).toEqual([false, true, true])
  })

  it('scritto e annullato in un attimo: resta il testo giusto, non quello di mezzo', () => {
    vi.useFakeTimers()
    const { p } = setup()
    p.update('A\n', true)
    p.update('AB\n')
    p.update('A\n')
    vi.advanceTimersByTime(500)
    expect(p.content.textContent?.trim()).toBe('A')
  })

  it('nella pagina condivisa (senza editable) niente frecce', async () => {
    const host = document.createElement('div')
    document.body.append(host)
    host.innerHTML = renderMarkdown(note, { untrusted: true })
    const look = { theme: 'light' as const, surface: '#fff' }
    hydrateSchemas(host, look)
    hydrateGraphs(host, look)
    await vi.waitFor(() => expect(host.querySelector('.schema-preview-tools')).not.toBeNull(), { timeout: 5000 })
    expect(host.querySelector('.block-move')).toBeNull()
  })
})

describe('gli slider seguono il grafico spostato', () => {
  it('due grafici che si scambiano le righe si scambiano gli stati; le righe dopo si spostano', () => {
    const states = new Map<string, number>([
      ['A\u00002\u0000a\u00001', 10],
      ['A\u00008\u0000a\u00001', 20],
      ['A\u000012\u0000b\u00001', 30],
      ['senza riga', 40],
    ])
    remapLineKeys(states, 'A', (l) => (l === 2 ? 8 : l === 8 ? 2 : l >= 12 ? l + 1 : l))
    expect(Object.fromEntries(states)).toEqual({ 'A\u00008\u0000a\u00001': 10, 'A\u00002\u0000a\u00001': 20, 'A\u000013\u0000b\u00001': 30, 'senza riga': 40 })
  })

  it('se la nota cambia id (account, conflitto), i suoi slider la seguono', () => {
    const states = new Map<string, number>([
      ['vecchio\u00004\u0000a', 5],
      ['altra\u00004\u0000a', 7],
    ])
    renameScopeKeys(states, 'vecchio', 'nuovo')
    expect(Object.fromEntries(states)).toEqual({ 'nuovo\u00004\u0000a': 5, 'altra\u00004\u0000a': 7 })
  })

  it('gli slider delle altre note restano dove sono', () => {
    const states = new Map<string, number>([
      ['A\u00004\u0000a\u00002', 5],
      ['B\u00004\u0000a\u00002', 7],
    ])
    remapLineKeys(states, 'B', (l) => (l === 4 ? 0 : l))
    expect(Object.fromEntries(states)).toEqual({ 'A\u00004\u0000a\u00002': 5, 'B\u00000\u0000a\u00002': 7 })
  })
})
