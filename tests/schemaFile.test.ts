import { describe, expect, it, vi } from 'vitest'
import { schemasForFile, schemasFromFile } from '../src/schema/file'
import { parseSchema, type Schema } from '../src/schema/model'

const schema = '{"v":1,"nodes":[\n{"id":"a","shape":"rect","x":0,"y":0,"w":120,"h":60,"text":"A --> B <b>"},\n{"id":"b","shape":"rect","x":0,"y":100,"w":120,"h":60,"text":"x\\\\u003c"}\n],"edges":[]}'
const note = `# Titolo\n\nprima\n\n\`\`\`schema\n${schema}\n\`\`\`\n\ndopo\n`
const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><text>è</text></svg>'

/** L'SVG dentro l'immagine `data:` di una riga del file. */
function imageOf(file: string): string {
  const m = /!\[Schema\]\(data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+)\)/.exec(file)
  return m ? new TextDecoder().decode(Uint8Array.from(atob(m[1]), (c) => c.charCodeAt(0))) : ''
}

describe('gli schemi nei file .md', () => {
  it('nel file uno schema è un\'immagine con il JSON nascosto in un commento, e aprendolo torna com\'era', () => {
    const draw = vi.fn((_s: Schema) => svg)
    const file = schemasForFile(note, draw)
    expect(draw).toHaveBeenCalledOnce()
    expect(draw.mock.calls[0][0]).toEqual(parseSchema(schema))
    // Niente blocco di codice: VS Code mostra l'immagine e non il commento.
    expect(file).not.toContain('```')
    expect(file.startsWith('# Titolo\n\nprima\n\n![Schema](data:image/svg+xml;base64,')).toBe(true)
    expect(file.endsWith('\n-->\n\ndopo\n')).toBe(true)
    expect(imageOf(file)).toBe(svg)
    // Il commento finisce solo dove deve: «-->» nel testo di una forma non lo chiude.
    const comment = file.slice(file.indexOf('<!-- glifo-schema'))
    expect(comment.indexOf('-->')).toBe(comment.lastIndexOf('-->'))
    expect(JSON.parse(comment.slice(comment.indexOf('\n') + 1, comment.indexOf('\n-->')))).toEqual(JSON.parse(schema))
    expect(schemasFromFile(file)).toBe(note)
    // Anche se intanto un altro programma l'ha risalvato con gli a capo di Windows.
    expect(schemasFromFile(file.replace(/\n/g, '\r\n'))).toBe(note)
  })

  it('restano blocchi di codice quelli non chiusi, quelli che non si leggono e quelli che non si disegnano', () => {
    const broken = '```schema\n{rotto\n```\n\n```schema\n{"v":1,"nodes":[],"edges":[]}\n```\n\n```schema\n{"v":1'
    const file = schemasForFile(broken, () => svg)
    expect(file.startsWith('```schema\n{rotto\n```\n\n')).toBe(true)
    // Uno schema vuoto non ha niente da mostrare: solo il commento.
    expect(file).toContain('\n<!-- glifo-schema')
    expect(file).not.toContain('![Schema]')
    expect(file.endsWith('-->\n\n```schema\n{"v":1')).toBe(true)
    expect(schemasFromFile(file)).toBe(broken)
    const failing = () => {
      throw new Error('maxGraph non c\'è')
    }
    expect(schemasForFile(note, failing)).toBe(note)
  })

  it('negli elenchi e dentro altri blocchi di codice', () => {
    const nested = `- punto\n\n  \`\`\`schema\n  ${schema.replace(/\n/g, '\n  ')}\n  \`\`\`\n\n~~~\n\`\`\`schema\n{}\n\`\`\`\n~~~\n`
    const file = schemasForFile(nested, () => svg)
    expect(file).toContain('\n  ![Schema](data:')
    expect(file).toContain('\n  <!-- glifo-schema')
    expect(file).toContain('\n  -->\n')
    // Quello dentro il blocco ~~~ è un esempio scritto nella nota: non si tocca.
    expect(file.endsWith('~~~\n```schema\n{}\n```\n~~~\n')).toBe(true)
    expect(schemasFromFile(file)).toBe(nested)
    // E un commento come quelli di Glifo scritto dentro un blocco di codice resta lì.
    const example = '```\n<!-- glifo-schema\n{}\n-->\n```'
    expect(schemasFromFile(example)).toBe(example)
  })

  it('aprendo un file ritoccato altrove: righe vuote in mezzo, commenti a metà, immagini d\'altri', () => {
    const json = '{"v":1,"nodes":[],"edges":[]}'
    expect(schemasFromFile(`![Schema](data:image/svg+xml;base64,AAAA)\n\n<!-- glifo-schema\n${json}\n-->`)).toBe('```schema\n' + json + '\n```')
    // Un'immagine che non è subito prima non c'entra; un commento non chiuso resta testo.
    const other = `![Foto](data:image/svg+xml;base64,AAAA)\n\ntesto\n<!-- glifo-schema\n${json}\n-->`
    expect(schemasFromFile(other)).toBe(`![Foto](data:image/svg+xml;base64,AAAA)\n\ntesto\n\`\`\`schema\n${json}\n\`\`\``)
    const open = `<!-- glifo-schema\n${json}\n`
    expect(schemasFromFile(open)).toBe(open)
    expect(schemasFromFile('<!-- glifo-schema -->\ntesto')).toBe('<!-- glifo-schema -->\ntesto')
    // `\u003c` scritto apposta in un testo (nel JSON `\\u003c`) resta com'è.
    expect(schemasFromFile('<!-- glifo-schema\n["\\\\u003c","\\u003e"]\n-->')).toBe('```schema\n["\\\\u003c",">"]\n```')
  })
})
