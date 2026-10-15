// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { InternalEvent, type Cell } from '@maxgraph/core'
import { schemaTopic } from '../src/ai/topics'
import { openSchemaEditor } from '../src/schema/editor'
import { createGraph, loadSchema, readSchema, withContents } from '../src/schema/graph'
import { parseSchema, serializeSchema, type Schema } from '../src/schema/model'
import { TEMPLATES } from '../src/schema/templates'

/**
 * I contenitori degli schemi: riquadri con il titolo in alto a sinistra, anche uno dentro l'altro (il
 * sistema informatico dentro quello informativo, dentro quello organizzativo). Stanno dietro alle altre
 * forme, dal più grande al più piccolo, e spostandoli vengono con loro le forme che hanno dentro.
 */

// jsdom non ha le finestre modali e il disegno su canvas.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.open = true
}
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  this.open = false
  this.dispatchEvent(new Event('close'))
}
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', { value: () => null, configurable: true })

const LOOK = { theme: 'light' as const, surface: '#ffffff' }

afterEach(() => {
  // «Fatto» chiude l'editor e toglie i suoi ascoltatori dalla finestra.
  document.querySelector<HTMLButtonElement>('dialog.schema-editor .schema-bar .btn-primary')?.click()
  document.body.replaceChildren()
  localStorage.clear()
})

/** Uno schema con i contenitori scritti dopo le forme, e il più piccolo prima del più grande. */
const MIXED = JSON.stringify({
  v: 1,
  nodes: [
    { id: 'server', shape: 'rect', x: 120, y: 140, w: 120, h: 60, text: 'Server' },
    { id: 'fuori', shape: 'rect', x: 600, y: 100, w: 120, h: 60, text: 'Fornitore' },
    { id: 'pc', shape: 'rect', x: 260, y: 140, w: 80, h: 60, text: 'PC' },
    { id: 'informatico', shape: 'container', x: 60, y: 100, w: 300, h: 130, text: 'Sistema informatico' },
    { id: 'organizzativo', shape: 'container', x: 0, y: 0, w: 420, h: 290, text: 'Sistema organizzativo' },
    { id: 'informativo', shape: 'container', x: 30, y: 50, w: 360, h: 210, text: 'Sistema informativo' },
  ],
  edges: [
    { id: 'e1', from: 'server', to: 'pc' },
    { id: 'e2', from: 'pc', to: 'fuori' },
  ],
})

function sheet(source = MIXED) {
  const container = document.createElement('div')
  document.body.append(container)
  const graph = createGraph(container, true)
  loadSchema(graph, parseSchema(source), LOOK)
  const cell = (id: string) => graph.getDataModel().getCell(id)!
  const ids = (cells: Cell[]) => cells.map((c) => c.getId()).sort()
  return { graph, cell, ids }
}

describe('i contenitori nel foglio', () => {
  it('stanno dietro alle altre forme, dal più grande al più piccolo, anche se nella nota erano dopo', () => {
    const { graph } = sheet()
    expect(readSchema(graph).nodes.map((n) => n.id)).toEqual(['organizzativo', 'informativo', 'informatico', 'server', 'fuori', 'pc'])
  })

  it('si portano dietro quello che hanno dentro, anche gli altri contenitori, e le frecce tra le forme che si spostano', () => {
    const { graph, cell, ids } = sheet()
    expect(ids(withContents(graph, [cell('organizzativo')]))).toEqual(['e1', 'informatico', 'informativo', 'organizzativo', 'pc', 'server'])
    expect(ids(withContents(graph, [cell('informatico')]))).toEqual(['e1', 'informatico', 'pc', 'server'])
    // Una forma che non è un contenitore va da sola.
    expect(ids(withContents(graph, [cell('server')]))).toEqual(['server'])
  })

  it('ingrandito più di quello che lo conteneva, un contenitore va dietro, nella stessa modifica da annullare', () => {
    const { graph, cell } = sheet()
    const edits: number[] = []
    graph.getDataModel().addListener(InternalEvent.UNDO, () => edits.push(1))
    const big = cell('informatico').getGeometry()!.clone()
    big.x = -20
    big.y = -20
    big.width = 500
    big.height = 340
    graph.resizeCells([cell('informatico')], [big], false)
    expect(readSchema(graph).nodes.slice(0, 3).map((n) => n.id)).toEqual(['informatico', 'organizzativo', 'informativo'])
    expect(edits).toHaveLength(1)
  })
})

describe('i contenitori nell\'editor', () => {
  function open(source = '{"v":1,"nodes":[],"edges":[]}') {
    const saved: Schema[] = []
    void openSchemaEditor({ schema: parseSchema(source), theme: 'light', title: 'Appunti', onSave: (schema) => saved.push(schema) })
    const dialog = document.querySelector<HTMLDialogElement>('dialog.schema-editor')!
    const preset = (id: string) => dialog.querySelector<HTMLButtonElement>(`.schema-shape[data-preset="${id}"]`)!
    const done = () => [...dialog.querySelectorAll<HTMLButtonElement>('button')].find((b) => b.textContent?.trim() === 'Fatto')!.click()
    const key = (key: string) => dialog.querySelector('.schema-canvas')!.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
    return { dialog, saved, preset, done, key, format: dialog.querySelector<HTMLElement>('.schema-format')! }
  }

  it('nel pannello delle forme, con il titolo da scrivere in alto a sinistra e il pannello che spiega come si usa', () => {
    const { dialog, saved, preset, done, key, format } = open()
    expect(preset('container').textContent).toBe('Contenitore')
    preset('rect').click()
    preset('container').click()
    expect(format.querySelector('.schema-container-section h3')?.textContent).toBe('Contenitore')
    expect(format.querySelector('.schema-container-section .schema-format-hint')?.textContent).toContain('si prende dal titolo o dal bordo')
    // Invio: si scrive il titolo, dov'è (a sinistra).
    key('Enter')
    const input = dialog.querySelector<HTMLTextAreaElement>('.schema-text')!
    expect(input.hidden).toBe(false)
    expect(input.style.textAlign).toBe('left')
    expect(input.value).toBe('Contenitore')
    input.value = 'Sistema informativo'
    done()
    // Aggiunto dopo il rettangolo, nella nota il contenitore va prima: si disegna dietro.
    expect(saved).toHaveLength(1)
    expect(saved[0].nodes.map((n) => [n.shape, n.text])).toEqual([
      ['container', 'Sistema informativo'],
      ['rect', ''],
    ])
  })

  it('aperto uno schema con i contenitori scritti dopo le forme, se non si cambia niente la nota resta com\'era', () => {
    const { saved, done } = open(MIXED)
    done()
    expect(saved).toHaveLength(0)
  })

  it('il modello «Contenitori»: tre sistemi uno dentro l\'altro', () => {
    const template = TEMPLATES.find((t) => t.id === 'contenitori')!
    expect(template.name).toBe('Contenitori')
    expect(template.hint).toBe('Insiemi uno dentro l\'altro, come il sistema informatico dentro quello informativo')
    expect(template.schema.nodes.map((n) => [n.shape, n.text])).toEqual([
      ['container', 'Sistema organizzativo'],
      ['container', 'Sistema informativo'],
      ['container', 'Sistema informatico'],
    ])
  })
})

describe('i contenitori spiegati all\'AI', () => {
  it('di ogni forma si dice in quale contenitore sta (il più piccolo)', () => {
    const lines = schemaTopic(serializeSchema(parseSchema(MIXED))).content.split('\n')
    expect(lines).toContain('- «Sistema informativo» (contenitore), dentro «Sistema organizzativo»')
    expect(lines).toContain('- «Sistema informatico» (contenitore), dentro «Sistema informativo»')
    expect(lines.find((l) => l.startsWith('- «Server»'))).toBe('- «Server» (rettangolo), dentro «Sistema informatico»')
    expect(lines.find((l) => l.startsWith('- «Fornitore»'))).toBe('- «Fornitore» (rettangolo)')
    expect(lines).toContain('- «Sistema organizzativo» (contenitore)')
  })
})
