// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { alignBoxes, distributeBoxes, type Box } from '../src/schema/arrange'
import { crc32, withDensity } from '../src/schema/image'
import { lanesHtml, tableHtml } from '../src/schema/label'
import { fieldLine, insideLanes, joinTable, laneAt, laneHeadFor, laneNames, parseSchema, parseTable, serializeSchema, SHAPES, splitTable, tableField, tableHeight, tableText } from '../src/schema/model'
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
    expect(TEMPLATES.map((t) => t.name)).toEqual(['Diagramma di flusso', 'Mappa concettuale', 'Albero', 'Ciclo', 'Linea del tempo', 'Processo con le corsie', 'Schema E-R', 'Tabelle'])
    for (const t of TEMPLATES) {
      const json = serializeSchema(t.schema)
      const again = parseSchema(json)
      expect(again, t.name).toEqual(t.schema)
      expect(new Set(again.nodes.map((n) => n.id)).size, t.name).toBe(again.nodes.length)
      for (const [i, a] of again.nodes.entries()) {
        expect(SHAPES).toContain(a.shape)
        // Le forme di un processo stanno sopra le corsie (ognuna nella sua), non sulla fascia dei nomi.
        if (a.shape === 'lanes') {
          const count = laneNames(a.text).length
          for (const b of again.nodes.slice(i + 1)) {
            expect(insideLanes(a, b), `${t.name}: ${b.id} nelle corsie`).toBe(true)
            expect(b.y, `${t.name}: ${b.id} sotto i nomi`).toBeGreaterThan(a.y + laneHeadFor(14))
            const lane = (x: number) => Math.floor(((x - a.x) / a.w) * count)
            expect(lane(b.x), `${t.name}: ${b.id} in una corsia sola`).toBe(lane(b.x + b.w - 1))
          }
          continue
        }
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

  it('nell\'editor la tabella si scrive in due parti, il nome e i campi, e torna un testo solo', () => {
    expect(splitTable('Esame\nPK Matricola\nVoto')).toEqual({ name: 'Esame', fields: 'PK Matricola\nVoto' })
    expect(splitTable('Solo il nome')).toEqual({ name: 'Solo il nome', fields: '' })
    expect(splitTable('')).toEqual({ name: '', fields: '' })
    expect(joinTable('Esame', 'PK Matricola\nVoto')).toBe('Esame\nPK Matricola\nVoto')
    // Le righe vuote lasciate in fondo (un Invio di troppo) non diventano campi; quelle in mezzo restano.
    expect(joinTable('Esame', 'PK Matricola\n\nVoto\n\n  \n')).toBe('Esame\nPK Matricola\n\nVoto')
    expect(joinTable('Esame', '\n')).toBe('Esame')
    expect(joinTable('', '')).toBe('')
    for (const text of ['Esame\nPK Matricola\nVoto', 'Solo il nome', '\nSenza nome']) {
      const { name, fields } = splitTable(text)
      expect(joinTable(name, fields)).toBe(text)
    }
  })

  it('un campo: PK, FK o tutte e due davanti, il nome e, dopo i due punti, il tipo', () => {
    const field = (pk: boolean, fk: boolean, name: string, type: string, start: number) => ({ pk, fk, name, type, start })
    expect(tableField('PK Matricola')).toEqual(field(true, false, 'Matricola', '', 3))
    expect(tableField('  fk   Corso di laurea')).toEqual(field(false, true, 'Corso di laurea', '', 7))
    expect(tableField('PK FK Matricola: CHAR(6)')).toEqual(field(true, true, 'Matricola', 'CHAR(6)', 6))
    expect(tableField('fk pk Corso :  decimal(8, 2) ')).toEqual(field(true, true, 'Corso', 'decimal(8, 2)', 6))
    expect(tableField('Voto')).toEqual(field(false, false, 'Voto', '', 0))
    // «PK» da solo è una chiave ancora senza nome; attaccato al nome è un nome.
    expect(tableField('PK')).toEqual(field(true, false, '', '', 2))
    expect(tableField('PKey')).toEqual(field(false, false, 'PKey', '', 0))
    // I due punti dentro una formula non fanno un tipo.
    expect(tableField('Rapporto $a:b$')).toEqual(field(false, false, 'Rapporto $a:b$', '', 0))
  })

  it('la riga di un campo e il testo di una tabella tornano come erano', () => {
    for (const line of ['PK Matricola', 'PK FK Matricola: CHAR(6)', 'FK Corso', 'Voto: INTEGER', 'Nome']) {
      expect(fieldLine(tableField(line))).toBe(line)
    }
    expect(fieldLine({ pk: false, fk: true, name: 'Corso', type: '  ' })).toBe('FK Corso')
    const text = 'Esame\nPK FK Matricola: CHAR(6)\nPK FK Corso\nVoto: INTEGER'
    const table = parseTable(text)
    expect(table.name).toBe('Esame')
    expect(table.fields.map((f) => [f.pk, f.fk, f.name, f.type])).toEqual([
      [true, true, 'Matricola', 'CHAR(6)'],
      [true, true, 'Corso', ''],
      [false, false, 'Voto', 'INTEGER'],
    ])
    expect(tableText(table)).toBe(text)
    expect(parseTable('Solo il nome').fields).toEqual([])
    // Scritti in un altro ordine o in minuscolo, tornano nella forma solita.
    expect(tableText(parseTable('Esame\nfk pk Corso :INTEGER'))).toBe('Esame\nPK FK Corso: INTEGER')
  })

  it('nel disegno della tabella PK e FK stanno insieme e il tipo è a destra', () => {
    const box = document.createElement('div')
    box.innerHTML = tableHtml('Esame\nPK FK Matricola: CHAR(6)\nVoto: INTEGER', 14)
    const rows = [...box.children[1].children] as HTMLElement[]
    expect(rows.map((r) => [...r.children].map((c) => c.textContent))).toEqual([
      ['PK FK', 'Matricola', 'CHAR(6)'],
      ['', 'Voto', 'INTEGER'],
    ])
    expect(rows[0].querySelector('u')?.textContent).toBe('Matricola')
    // Con una chiave doppia la colonna di PK e FK è più larga.
    expect((rows[0].children[0] as HTMLElement).style.width).toBe('4.2em')
  })
})

describe('le corsie', () => {
  const lanes = { x: 0, y: 0, w: 600, h: 400, text: 'Cliente\nVendite\nMagazzino', rot: 0 as const, size: 'm' as const }

  it('un nome per riga, in colonne (0) o in righe (1); gli altri versi tornano in colonne', () => {
    expect(laneNames('Cliente\nVendite')).toEqual(['Cliente', 'Vendite'])
    const read = (rot: number) => parseSchema(`{"v":1,"nodes":[{"id":"c","shape":"lanes","x":0,"y":0,"w":600,"h":400,"text":"A\\nB","rot":${rot}}],"edges":[]}`).nodes[0].rot
    expect([read(0), read(1), read(2), read(3)]).toEqual([0, 1, 0, 0])
  })

  it('il punto dice quale corsia e se è sulla fascia dei nomi', () => {
    const head = laneHeadFor(14)
    expect(laneAt(lanes, 300, head / 2)).toEqual({ lane: 1, head: true })
    expect(laneAt(lanes, 550, 200)).toEqual({ lane: 2, head: false })
    expect(laneAt(lanes, 700, 200)).toBeNull()
    // In righe: la fascia è a sinistra e le corsie vanno dall'alto in basso.
    expect(laneAt({ ...lanes, rot: 1 }, 10, 390)).toEqual({ lane: 2, head: true })
    expect(laneAt({ ...lanes, rot: 1 }, 300, 50)).toEqual({ lane: 0, head: false })
  })

  it('una forma sta nelle corsie se ci sta il suo centro', () => {
    expect(insideLanes(lanes, { x: 250, y: 100, w: 140, h: 60 })).toBe(true)
    expect(insideLanes(lanes, { x: 560, y: 100, w: 140, h: 60 })).toBe(false)
  })

  it('i nomi in HTML sono testo (con le formule), uno per parte della fascia', () => {
    const html = lanesHtml('Cliente\n<b>Vendite</b>\n$x^2$', 14, false)
    const host = document.createElement('div')
    host.innerHTML = html
    expect(host.firstElementChild!.children).toHaveLength(3)
    expect(host.querySelector('b')).toBeNull()
    expect(host.textContent).toContain('<b>Vendite</b>')
    expect(host.querySelector('.katex')).not.toBeNull()
    // In righe i nomi si leggono dal basso in alto.
    expect(lanesHtml('A\nB', 14, true)).toContain('writing-mode:vertical-rl')
  })
})
