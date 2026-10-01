import { describe, expect, it } from 'vitest'
import { findSchemaBlock, findSchemaBlocks, schemaBlockAtLine, schemaBlockText } from '../src/schema/blocks'
import { labelHtml } from '../src/schema/label'
import { parseSchema, SchemaError, serializeSchema, type Schema } from '../src/schema/model'

const sample: Schema = {
  nodes: [
    { id: 'a', shape: 'rounded', x: 40, y: 60, w: 140, h: 56, text: 'Ipotesi', color: 'blue', size: 'm', rot: 0 },
    { id: 'b', shape: 'rhombus', x: 300.4, y: 60, w: 120, h: 80, text: 'Vale $x > 0$?', color: 'default', size: 'l', rot: 0 },
  ],
  edges: [
    { id: 'e1', from: 'a', to: 'b', text: 'quindi', color: 'default', size: 'm', route: 'orthogonal', arrows: 'end', dashed: false, points: [] },
    { id: 'e2', from: 'b', to: 'a', text: '', color: 'red', size: 's', route: 'straight', arrows: 'both', dashed: true, points: [[200.6, 10]] },
  ],
}

describe('il formato degli schemi', () => {
  it('scrive una forma o una freccia per riga, senza i valori normali, e si rilegge uguale', () => {
    const json = serializeSchema(sample)
    expect(json.split('\n')).toEqual([
      '{"v":1,"nodes":[',
      '{"id":"a","shape":"rounded","x":40,"y":60,"w":140,"h":56,"text":"Ipotesi","color":"blue"},',
      '{"id":"b","shape":"rhombus","x":300,"y":60,"w":120,"h":80,"text":"Vale $x > 0$?","size":"l"}',
      '],"edges":[',
      '{"id":"e1","from":"a","to":"b","text":"quindi"},',
      '{"id":"e2","from":"b","to":"a","color":"red","size":"s","route":"straight","arrows":"both","dashed":true,"points":[[201,10]]}',
      ']}',
    ])
    const again = parseSchema(json)
    expect(again.nodes[1]).toEqual({ ...sample.nodes[1], x: 300 })
    expect(again.edges[1]).toEqual({ ...sample.edges[1], points: [[201, 10]] })
    expect(serializeSchema(again)).toBe(json)
    expect(serializeSchema({ nodes: [], edges: [] })).toBe('{"v":1,"nodes":[],"edges":[]}')
  })

  it('quello che non va si corregge o si toglie', () => {
    const schema = parseSchema(
      JSON.stringify({
        nodes: [
          { id: 'a', shape: 'stella', x: 'qui', y: 1e9, w: -5, text: 42, color: 'fucsia', size: 'xl' },
          { id: 'a', shape: 'ellipse' },
          { shape: 'text' },
          'non una forma',
        ],
        edges: [
          { from: 'a', to: 'nessuno' },
          { id: 'x', from: 'a', to: 'a~2', route: 'curva', arrows: 'tante', dashed: 'sì', points: [[1, 2], [3], 'no', [Infinity, 1]] },
        ],
      }),
    )
    expect(schema.nodes.map((n) => n.id)).toEqual(['a', 'a~2', 'n1'])
    expect(schema.nodes[0]).toEqual({ id: 'a', shape: 'rect', x: 0, y: 100000, w: 10, h: 60, text: '', color: 'default', size: 'm', rot: 0 })
    expect(schema.edges).toEqual([
      { id: 'x', from: 'a', to: 'a~2', text: '', color: 'default', size: 'm', route: 'orthogonal', arrows: 'end', dashed: false, points: [[1, 2]] },
    ])
  })

  it('le forme nuove si rileggono, e solo quelle con un verso si girano', () => {
    const json = serializeSchema({
      nodes: [
        { id: 'f', shape: 'arrow', x: 0, y: 0, w: 60, h: 130, text: 'Poi', color: 'default', size: 'm', rot: 1 },
        { id: 'd', shape: 'cylinder', x: 0, y: 200, w: 100, h: 90, text: 'Dati', color: 'gray', size: 'm', rot: 0 },
      ],
      edges: [],
    })
    expect(json).toContain('{"id":"f","shape":"arrow","x":0,"y":0,"w":60,"h":130,"text":"Poi","rot":1}')
    expect(json).toContain('{"id":"d","shape":"cylinder","x":0,"y":200,"w":100,"h":90,"text":"Dati","color":"gray"}')
    expect(parseSchema(json).nodes.map((n) => [n.shape, n.rot])).toEqual([
      ['arrow', 1],
      ['cylinder', 0],
    ])
    // Un verso su una forma che non ne ha, o un verso che non esiste, non conta.
    const odd = parseSchema('{"nodes":[{"id":"a","shape":"rect","rot":2},{"id":"b","shape":"triangle","rot":7},{"id":"c","shape":"doubleArrow","rot":3}]}')
    expect(odd.nodes.map((n) => n.rot)).toEqual([0, 0, 3])
  })

  it('un blocco che non è uno schema dà un errore da mostrare', () => {
    expect(() => parseSchema('{rotto')).toThrow(SchemaError)
    expect(() => parseSchema('[1,2]')).toThrow(SchemaError)
    expect(parseSchema('{}')).toEqual({ nodes: [], edges: [] })
  })
})

describe('i blocchi ```schema nella nota', () => {
  const note = [
    '# Appunti', // 0
    '', // 1
    '```schema', // 2
    '{"v":1}', // 3
    '```', // 4
    'testo', // 5
    '````markdown', // 6
    '```schema', // 7  (dentro un altro blocco: non conta)
    '{}', // 8
    '```', // 9
    '````', // 10
    '  ~~~ Schema', // 11 (rientrato, con le tilde)
    '~~~', // 12
    '```schema', // 13 (non chiuso)
    '{"a":1}', // 14
  ].join('\n')

  it('li trova con le posizioni, anche rientrati, ma non dentro altri blocchi di codice', () => {
    const blocks = findSchemaBlocks(note)
    expect(blocks.map((b) => [b.line, b.source, b.closed])).toEqual([
      [2, '{"v":1}', true],
      [11, '', true],
      [13, '{"a":1}', false],
    ])
    const [first] = blocks
    expect(note.slice(first.from, first.to)).toBe('```schema\n{"v":1}\n```')
    expect(note.slice(first.contentFrom, first.contentTo)).toBe('{"v":1}')
    expect(blocks[2].to).toBe(note.length)
  })

  it('si ritrovano dalla riga o dal contenuto', () => {
    expect(schemaBlockAtLine(note, 2)?.source).toBe('{"v":1}')
    expect(schemaBlockAtLine(note, 3)).toBeNull()
    const twice = `${schemaBlockText('{"v":1}')}\n\n${schemaBlockText('{"v":1}')}\n`
    const second = findSchemaBlocks(twice)[1]
    expect(findSchemaBlock(twice, '{"v":1}', second.from + 5)?.from).toBe(second.from)
    expect(findSchemaBlock(twice, '{"v":2}', 0)).toBeNull()
  })
})

describe('il testo delle forme', () => {
  it('le formule si disegnano, il resto resta testo', () => {
    const html = labelHtml('Se $x^2 > 0$\nallora <b>sì</b> e costa 5\\$')
    expect(html).toContain('class="katex"')
    expect(html.startsWith('Se <span')).toBe(true)
    expect(html).toContain('<br>allora &lt;b&gt;sì&lt;/b&gt; e costa 5$')
    expect(labelHtml('<img src=x onerror=alert(1)>')).toBe('&lt;img src=x onerror=alert(1)&gt;')
  })
})
