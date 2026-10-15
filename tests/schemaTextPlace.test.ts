// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { openSchemaEditor } from '../src/schema/editor'
import { nodeStyle } from '../src/schema/graph'
import { defaultPlace, parseSchema, placeAxes, serializeSchema, textPlaces, type NodeLook, type Schema } from '../src/schema/model'

/**
 * Dove sta il testo in una forma: in alto, a metà o in basso, a sinistra, al centro o a destra (come in
 * draw.io). Il titolo del contenitore sta sopra o sotto; tabelle, corsie e pallini hanno il loro posto.
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

afterEach(() => {
  document.querySelector<HTMLButtonElement>('dialog.schema-editor .schema-bar .btn-primary')?.click()
  document.body.replaceChildren()
  localStorage.clear()
})

const LOOK = { theme: 'light' as const, surface: '#ffffff' }

describe('il posto del testo nella nota', () => {
  it('si salva solo se non è quello solito della forma, e si rilegge', () => {
    const schema = parseSchema(
      JSON.stringify({
        nodes: [
          { id: 'a', shape: 'rect', x: 0, y: 0, w: 120, h: 60, text: 'A', place: 'top-left' },
          { id: 'b', shape: 'rect', x: 0, y: 100, w: 120, h: 60, text: 'B' },
          { id: 'c', shape: 'container', x: 200, y: 0, w: 300, h: 200, text: 'C', place: 'bottom-right' },
          { id: 'd', shape: 'container', x: 600, y: 0, w: 300, h: 200, text: 'D' },
        ],
        edges: [],
      }),
    )
    expect(schema.nodes.map((n) => n.place)).toEqual(['top-left', 'center', 'bottom-right', 'top-left'])
    const json = serializeSchema(schema)
    expect(json).toContain('"text":"A","place":"top-left"}')
    expect(json).toContain('"text":"B"}')
    expect(json).toContain('"text":"C","place":"bottom-right"}')
    // Il contenitore in alto a sinistra è quello solito: non si scrive.
    expect(json).toContain('"text":"D"}')
    expect(parseSchema(json)).toEqual(schema)
  })

  it('un posto che la forma non ha diventa quello solito', () => {
    const read = (shape: string, place: string) => parseSchema(JSON.stringify({ nodes: [{ id: 'n', shape, place }], edges: [] })).nodes[0].place
    // Il titolo del contenitore non sta a metà; le tabelle e i pallini hanno il testo sempre allo stesso posto.
    expect(read('container', 'center')).toBe('top-left')
    expect(read('container', 'left')).toBe('top-left')
    expect(read('table', 'top-left')).toBe('center')
    expect(read('attribute', 'right')).toBe('center')
    expect(read('ellipse', 'sotto')).toBe('center')
    expect(read('ellipse', 'bottom')).toBe('bottom')
  })

  it('quali posti ha ogni forma', () => {
    expect(textPlaces('rect')).toHaveLength(9)
    expect(textPlaces('container')).toEqual(['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right'])
    expect(textPlaces('table')).toEqual([])
    expect(textPlaces('lanes')).toEqual([])
    expect(textPlaces('identifier')).toEqual([])
    expect([defaultPlace('rect'), defaultPlace('container')]).toEqual(['center', 'top-left'])
    expect(placeAxes('bottom-left')).toEqual({ vertical: 'bottom', horizontal: 'left' })
    expect(placeAxes('top')).toEqual({ vertical: 'top', horizontal: 'center' })
    expect(placeAxes('right')).toEqual({ vertical: 'middle', horizontal: 'right' })
  })

  it('nel disegno il testo va nel posto scelto; il titolo del contenitore in basso ha lo spazio sotto', () => {
    const look = (patch: Partial<NodeLook>): NodeLook => ({ shape: 'rect', text: 'A', color: 'default', size: 'm', rot: 0, place: 'center', ...patch })
    expect(nodeStyle(look({ place: 'top-right' }), LOOK)).toMatchObject({ verticalAlign: 'top', align: 'right' })
    expect(nodeStyle(look({}), LOOK)).toMatchObject({ verticalAlign: 'middle', align: 'center' })
    const bottom = nodeStyle(look({ shape: 'container', place: 'bottom' }), LOOK)
    expect(bottom).toMatchObject({ verticalAlign: 'bottom', align: 'center', spacingTop: 0 })
    expect(bottom.spacingBottom).toBeGreaterThan(0)
    // Le tabelle mettono il nome in alto e i campi sotto da sole.
    expect(nodeStyle(look({ shape: 'table' }), LOOK)).toMatchObject({ verticalAlign: 'top' })
  })
})

describe('il posto del testo nell\'editor', () => {
  function open(source = '{"v":1,"nodes":[],"edges":[]}') {
    const saved: Schema[] = []
    void openSchemaEditor({ schema: parseSchema(source), theme: 'light', title: 'Appunti', onSave: (schema) => saved.push(schema) })
    const dialog = document.querySelector<HTMLDialogElement>('dialog.schema-editor')!
    const format = dialog.querySelector<HTMLElement>('.schema-format')!
    const preset = (id: string) => dialog.querySelector<HTMLButtonElement>(`.schema-shape[data-preset="${id}"]`)!
    const inFormat = (label: string) => format.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!
    const places = () => [...format.querySelectorAll<HTMLButtonElement>('.schema-place-section button')].map((b) => [b.title, b.getAttribute('aria-pressed')])
    const done = () => [...dialog.querySelectorAll<HTMLButtonElement>('button')].find((b) => b.textContent?.trim() === 'Fatto')!.click()
    return { dialog, saved, format, preset, inFormat, places, done }
  }

  it('una forma: nove posti in un quadrato, quello scelto resta premuto e si salva', () => {
    const { saved, format, preset, inFormat, places, done } = open()
    preset('rect').click()
    expect(format.querySelector('.schema-place-section h3')?.textContent).toBe('Posizione del testo')
    expect(places().map(([title]) => title)).toEqual([
      'Testo in alto a sinistra',
      'Testo in alto al centro',
      'Testo in alto a destra',
      'Testo a metà, a sinistra',
      'Testo al centro',
      'Testo a metà, a destra',
      'Testo in basso a sinistra',
      'Testo in basso al centro',
      'Testo in basso a destra',
    ])
    expect(places().find(([, pressed]) => pressed === 'true')?.[0]).toBe('Testo al centro')
    inFormat('Testo in alto a sinistra').click()
    expect(places().find(([, pressed]) => pressed === 'true')?.[0]).toBe('Testo in alto a sinistra')
    done()
    expect(saved[0].nodes[0]).toMatchObject({ shape: 'rect', place: 'top-left' })
  })

  it('il contenitore: il titolo sopra o sotto; cambiando forma il posto scelto resta, se la forma nuova lo ha', () => {
    const { saved, preset, inFormat, places, done } = open()
    preset('container').click()
    expect(places().map(([title]) => title)).toEqual([
      'Testo in alto a sinistra',
      'Testo in alto al centro',
      'Testo in alto a destra',
      'Testo in basso a sinistra',
      'Testo in basso al centro',
      'Testo in basso a destra',
    ])
    inFormat('Testo in basso a destra').click()
    // Diventa un rettangolo: il testo resta in basso a destra.
    inFormat('Rettangolo').click()
    expect(places().find(([, pressed]) => pressed === 'true')?.[0]).toBe('Testo in basso a destra')
    // Un rettangolo con il testo al centro, che diventa contenitore, ha il titolo dove lo hanno i contenitori.
    preset('rect').click()
    inFormat('Contenitore').click()
    expect(places().find(([, pressed]) => pressed === 'true')?.[0]).toBe('Testo in alto a sinistra')
    done()
    expect(saved[0].nodes.map((n) => [n.shape, n.place])).toEqual([
      ['container', 'top-left'],
      ['rect', 'bottom-right'],
    ])
  })

  it('le tabelle non hanno la scelta, e nemmeno una selezione con una tabella dentro', () => {
    const { format, preset, dialog } = open()
    preset('table').click()
    expect(format.querySelector('.schema-place-section')).toBeNull()
    preset('rect').click()
    dialog.querySelector('.schema-canvas')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', ctrlKey: true, bubbles: true, cancelable: true }))
    // Una tabella tra le forme scelte: niente posto in comune.
    expect(format.querySelector('.schema-place-section')).toBeNull()
  })
})
