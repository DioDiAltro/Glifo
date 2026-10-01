// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { alignBoxes, distributeBoxes, type Box } from '../src/schema/arrange'
import { crc32, withDensity } from '../src/schema/image'
import { tableHtml } from '../src/schema/label'
import { parseSchema, serializeSchema, SHAPES, tableHeight } from '../src/schema/model'
import { TEMPLATES } from '../src/schema/templates'

const boxes: Box[] = [
  { x: 10, y: 0, w: 100, h: 40 },
  { x: 300, y: 50, w: 60, h: 80 },
  { x: 120, y: 200, w: 140, h: 20 },
]

describe('allineare e distribuire', () => {
  it('allinea ai bordi e al centro di tutta la selezione', () => {
    expect(alignBoxes(boxes, 'left')).toEqual([
      { x: 10, y: 0 },
      { x: 10, y: 50 },
      { x: 10, y: 200 },
    ])
    expect(alignBoxes(boxes, 'right').map((p, i) => p.x + boxes[i].w)).toEqual([360, 360, 360])
    // Il centro della selezione (da 10 a 360) è 185.
    expect(alignBoxes(boxes, 'center').map((p, i) => p.x + boxes[i].w / 2)).toEqual([185, 185, 185])
    expect(alignBoxes(boxes, 'top').map((p) => p.y)).toEqual([0, 0, 0])
    expect(alignBoxes(boxes, 'bottom').map((p, i) => p.y + boxes[i].h)).toEqual([220, 220, 220])
    expect(alignBoxes(boxes, 'middle').map((p, i) => p.y + boxes[i].h / 2)).toEqual([110, 110, 110])
    // Allineando in orizzontale non cambia l'altezza, e viceversa.
    expect(alignBoxes(boxes, 'left').map((p) => p.y)).toEqual([0, 50, 200])
    expect(alignBoxes(boxes, 'top').map((p) => p.x)).toEqual([10, 300, 120])
  })

  it('distribuisce con lo stesso spazio tra una forma e l\'altra; il primo e l\'ultimo restano', () => {
    const across = distributeBoxes(boxes, 'x')
    // In ordine: 10–110, poi quella larga 140, poi 300–360. Spazio libero: 350 − 300 = 50, cioè 25 e 25.
    expect(across).toEqual([
      { x: 10, y: 0 },
      { x: 300, y: 50 },
      { x: 135, y: 200 },
    ])
    const down = distributeBoxes(boxes, 'y')
    expect(down.map((p) => p.x)).toEqual([10, 300, 120])
    const ys = down.map((p, i) => [p.y, p.y + boxes[i].h]).sort((a, b) => a[0] - b[0])
    expect(ys[1][0] - ys[0][1]).toBeCloseTo(ys[2][0] - ys[1][1])
    expect(ys[0][0]).toBe(0)
    expect(ys[2][1]).toBe(220)
    // Con due forme non c'è niente da distribuire.
    expect(distributeBoxes(boxes.slice(0, 2), 'x')).toEqual([
      { x: 10, y: 0 },
      { x: 300, y: 50 },
    ])
  })
})

describe('i modelli pronti', () => {
  it('sono schemi validi, che si salvano e si rileggono uguali, senza forme una sopra l\'altra', () => {
    expect(TEMPLATES.map((t) => t.name)).toEqual(['Diagramma di flusso', 'Mappa concettuale', 'Albero', 'Ciclo', 'Linea del tempo', 'Schema E-R', 'Tabelle'])
    for (const t of TEMPLATES) {
      const json = serializeSchema(t.schema)
      const again = parseSchema(json)
      expect(again, t.name).toEqual(t.schema)
      expect(new Set(again.nodes.map((n) => n.id)).size, t.name).toBe(again.nodes.length)
      for (const [i, a] of again.nodes.entries()) {
        expect(SHAPES).toContain(a.shape)
        for (const b of again.nodes.slice(i + 1)) {
          const apart = a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y
          expect(apart, `${t.name}: ${a.id} e ${b.id}`).toBe(true)
        }
      }
      expect(again.nodes.length, t.name).toBeGreaterThanOrEqual(3)
      expect(again.edges.length, t.name).toBeGreaterThanOrEqual(2)
    }
  })
})

describe('le immagini PNG', () => {
  /** I pezzi del PNG: nome, dati e se il CRC torna. */
  function chunks(png: Uint8Array) {
    const view = new DataView(png.buffer, png.byteOffset)
    const out: { type: string; data: Uint8Array; crcOk: boolean }[] = []
    for (let at = 8; at < png.length; ) {
      const length = view.getUint32(at)
      const type = String.fromCharCode(...png.subarray(at + 4, at + 8))
      const data = png.subarray(at + 8, at + 8 + length)
      out.push({ type, data, crcOk: view.getUint32(at + 8 + length) === crc32(png.subarray(at + 4, at + 8 + length)) })
      at += 12 + length
    }
    return out
  }

  it('il CRC-32 è quello dei PNG', () => {
    const bytes = (s: string) => Uint8Array.from(s, (c) => c.charCodeAt(0))
    // Il valore di controllo dello standard, e quello del pezzo finale di ogni PNG.
    expect(crc32(bytes('123456789'))).toBe(0xcbf43926)
    expect(crc32(bytes('IEND'))).toBe(0xae426082)
  })

  it('dicono quanti pixel hanno per pollice, così Word le mette alla misura giusta', () => {
    // Un PNG di un pixel.
    const tiny = Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='), (c) => c.charCodeAt(0))
    const dense = withDensity(tiny, 2)
    const list = chunks(dense)
    expect(list.map((c) => c.type)).toEqual(['IHDR', 'pHYs', 'IDAT', 'IEND'])
    expect(list.every((c) => c.crcOk)).toBe(true)
    const phys = new DataView(list[1].data.buffer, list[1].data.byteOffset)
    // 192 punti per pollice (96 × 2) sono 7559 per metro.
    expect([phys.getUint32(0), phys.getUint32(4), list[1].data[8]]).toEqual([7559, 7559, 1])
    // Se c'è già, non se ne aggiunge un altro.
    expect(withDensity(dense, 2)).toBe(dense)
  })
})

describe('basi di dati e frecce curve', () => {
  it('le forme E-R, le frecce curve e il testo vicino a un capo si salvano e si rileggono', () => {
    const json = serializeSchema({
      nodes: [
        { id: 'a', shape: 'identifier', x: 0, y: 0, w: 110, h: 20, text: 'Matricola', color: 'default', size: 'm', rot: 2 },
        { id: 'b', shape: 'table', x: 200, y: 0, w: 170, h: 82, text: 'Studente\\nPK Matricola', color: 'blue', size: 'm', rot: 0 },
      ],
      edges: [{ id: 'e', from: 'a', to: 'b', text: '(0,N)', color: 'default', size: 'm', route: 'curved', arrows: 'none', dashed: false, points: [], at: 'end' }],
    })
    expect(json).toContain('{"id":"e","from":"a","to":"b","text":"(0,N)","route":"curved","arrows":"none","at":"end"}')
    const again = parseSchema(json)
    expect(again.nodes.map((n) => [n.shape, n.rot])).toEqual([
      ['identifier', 2],
      ['table', 0],
    ])
    expect(again.edges[0]).toMatchObject({ route: 'curved', at: 'end' })
    // Un pallino ha il nome a destra (0) o a sinistra (2): gli altri versi non valgono.
    const odd = parseSchema('{"nodes":[{"id":"a","shape":"attribute","rot":1},{"id":"b","shape":"attribute","rot":3}],"edges":[{"from":"a","to":"b","at":"altrove"}]}')
    expect(odd.nodes.map((n) => n.rot)).toEqual([0, 0])
    expect(odd.edges[0].at).toBe('middle')
  })

  it('la tabella ha il nome in alto e un campo per riga; PK si sottolinea, FK si segna', () => {
    const html = tableHtml('Esame\nPK Matricola\nFK Corso\nVoto <b>', 14)
    const box = document.createElement('div')
    box.innerHTML = html
    const [title, body] = box.children
    expect(title.textContent).toBe('Esame')
    const rows = [...body.children].map((r) => r.textContent)
    expect(rows).toEqual(['PKMatricola', 'FKCorso', 'Voto <b>'])
    expect(body.querySelector('u')?.textContent).toBe('Matricola')
    // Il testo resta testo, e le righe hanno l'altezza con cui la forma disegna la fascia.
    expect(box.querySelector('b')).toBeNull()
    expect((title as HTMLElement).style.height).toBe('28px')
    expect(tableHeight('Esame\nPK Matricola\nFK Corso\nVoto', 'm')).toBe(28 + 3 * 22 + 10)
    expect(tableHeight('Solo il nome', 'l')).toBe(36 + 29 + 10)
  })
})
