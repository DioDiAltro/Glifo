// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { contentHash, fenceClosed, fenceName, moveFencedBlock, type MoveDir } from '../src/render/blockMove'
import { parseBlocks, renderMarkdown } from '../src/render/markdown'

/** Gli schemi e i grafici del testo, come li vede lo spostamento. */
function blocks(text: string) {
  return parseBlocks(text).filter((t) => t.type === 'fence' && ['schema', 'grafico'].includes(fenceName(t)))
}

function apply(text: string, changes: { from: number; to: number; insert: string }[]): string {
  let out = text
  for (const c of [...changes].sort((a, b) => b.from - a.from)) out = out.slice(0, c.from) + c.insert + out.slice(c.to)
  return out
}

/** Sposta l'`nth` schema o grafico; le modifiche devono dare proprio il testo nuovo. */
function move(text: string, dir: MoveDir, nth = 0) {
  const block = blocks(text)[nth]
  const r = moveFencedBlock(text, block.map![0], contentHash(block.content), dir, parseBlocks)
  if (r.ok) expect(apply(text, r.changes)).toBe(r.text)
  return r
}

/** Le frecce dei blocchi nell'anteprima: data-move (null se manca). */
function hints(text: string): (string | null)[] {
  const host = document.createElement('div')
  host.innerHTML = renderMarkdown(text)
  return [...host.querySelectorAll<HTMLElement>('.graph-block, .schema-block')].map((b) => b.getAttribute('data-move'))
}

const back = (dir: MoveDir): MoveDir => (dir === 'up' ? 'down' : 'up')

describe('spostare schemi e grafici: il testo', () => {
  // [nome, testo, verso, atteso, riga nuova, righe vuote aggiunte, il ritorno ridà il testo, quale blocco]
  const cases: [string, string, MoveDir, string, number, boolean, boolean, number?][] = [
    ['su tra paragrafi', 'Primo\n\n```grafico\ny = x\n```\n\nSecondo\n', 'up', '```grafico\ny = x\n```\n\nPrimo\n\nSecondo\n', 0, false, true],
    ['giù tra paragrafi', 'Primo\n\n```grafico\ny = x\n```\n\nSecondo\n', 'down', 'Primo\n\nSecondo\n\n```grafico\ny = x\n```\n', 4, false, true],
    // Senza righe vuote Primo e Secondo diventerebbero un paragrafo solo.
    ['su, attaccato', 'Primo\n```grafico\ny = x\n```\nSecondo\n', 'up', '```grafico\ny = x\n```\nPrimo\n\nSecondo\n', 0, true, false],
    ['giù, attaccato', 'Primo\n```grafico\ny = x\n```\nSecondo\n', 'down', 'Primo\n\nSecondo\n\n```grafico\ny = x\n```\n', 4, true, false],
    // In una voce stretta non si aggiungono righe: l'elenco resta stretto.
    ['voce stretta', '- F\n  ```grafico\n  g\n  ```\n  ```schema\n  h\n  ```\n- G\n', 'down', '- F\n  ```schema\n  h\n  ```\n  ```grafico\n  g\n  ```\n- G\n', 4, false, true],
    // Il caso degli esercizi: si aggiungono le righe vuote (l'elenco diventa largo) e il grafico resta nella voce.
    [
      'esercizio',
      '1) Esercizio\n   ```grafico\n   y = x\n   ```\n   Si vede che…\n2) Altro\n',
      'down',
      '1) Esercizio\n\n   Si vede che…\n\n   ```grafico\n   y = x\n   ```\n2) Altro\n',
      4,
      true,
      false,
    ],
    // Le definizioni delle note e dei link restano attaccate al paragrafo che le usa.
    [
      'note su',
      'A[^1]\n\n[^1]: nota\n    seguito\n\n```grafico\ny\n```\n\n[a]: http://x\n\nB\n',
      'up',
      '```grafico\ny\n```\n\nA[^1]\n\n[^1]: nota\n    seguito\n\n[a]: http://x\n\nB\n',
      0,
      false,
      false,
    ],
    [
      'note giù',
      'A[^1]\n\n[^1]: nota\n    seguito\n\n```grafico\ny\n```\n\n[a]: http://x\n\nB\n',
      'down',
      'A[^1]\n\n[^1]: nota\n    seguito\n\n[a]: http://x\n\nB\n\n```grafico\ny\n```\n',
      9,
      false,
      false,
    ],
    ['commento', 'A\n\n<!-- c -->\n\n```grafico\ny\n```\n', 'up', '```grafico\ny\n```\n\nA\n\n<!-- c -->\n', 0, false, true],
    [
      'invisibili prima e dopo',
      '```grafico\ny\n```\n\n<!-- c -->\n\nA\n\n[r]: x\n\nB\n',
      'down',
      '<!-- c -->\n\nA\n\n[r]: x\n\n```grafico\ny\n```\n\nB\n',
      6,
      false,
      false,
    ],
    [
      'dentro la voce',
      '1) Esercizio\n\n   ```grafico\n   y = x\n   ```\n\n   Altro\n\n2) Due\n',
      'down',
      '1) Esercizio\n\n   Altro\n\n   ```grafico\n   y = x\n   ```\n\n2) Due\n',
      4,
      false,
      true,
    ],
    ['marcatore da solo', '-\n  ```grafico\n  y\n  ```\n  testo\n- b\n', 'down', '-\n  testo\n  ```grafico\n  y\n  ```\n- b\n', 2, false, true],
    ['senza a capo finale', 'A\n\n```grafico\ny = x\n```', 'up', '```grafico\ny = x\n```\n\nA', 0, false, true],
    // A seguita da --- diventerebbe un titolo.
    ['titolo sottolineato', 'A\n```grafico\ny\n```\n---\n', 'up', '```grafico\ny\n```\nA\n\n---\n', 0, true, false],
    // L'elenco comprende le righe vuote finali: restano tra i due.
    ['elenco con righe vuote', '- a\n- b\n\n\n```grafico\ny\n```\n', 'up', '```grafico\ny\n```\n\n\n- a\n- b\n', 0, false, true],
    ['rientro comodo', '1) Esercizio\n\n  Testo\n\n  ```grafico\n  y\n  ```\n', 'up', '1) Esercizio\n\n  ```grafico\n  y\n  ```\n\n  Testo\n', 2, false, true],
    ['tab', '-\tvoce\n\n\t```grafico\n\ty = x\n\t```\n\n\ttesto\n', 'down', '-\tvoce\n\n\ttesto\n\n\t```grafico\n\ty = x\n\t```\n', 4, false, true],
    ['quattro apici', 'A\n\n````grafico\n```\ny\n````\n', 'up', '````grafico\n```\ny\n````\n\nA\n', 0, false, true],
    ['tilde', 'A\n\n~~~grafico\ny\n~~~\n', 'up', '~~~grafico\ny\n~~~\n\nA\n', 0, false, true],
    // Un html di tipo 6 continua fino a una riga vuota: inghiottirebbe il grafico.
    ['html', '```grafico\ny = x\n```\n<div>\nfoo\n', 'down', '<div>\nfoo\n\n```grafico\ny = x\n```\n', 3, true, false],
    // «testo» diventerebbe una riga della tabella.
    ['tabella', '| a | b |\n|---|---|\n| 1 | 2 |\n```grafico\ny\n```\ntesto\n', 'up', '```grafico\ny\n```\n| a | b |\n|---|---|\n| 1 | 2 |\n\ntesto\n', 0, true, false],
    // Il grafico salta l'elenco intero; senza la riga vuota «testo» continuerebbe la voce b.
    ['elenco intero', '- a\n- b\n```grafico\ny\n```\ntesto\n', 'up', '```grafico\ny\n```\n- a\n- b\n\ntesto\n', 0, true, false],
    ['riferimento', 'Vedi [r].\n\n[r]: https://esempio.it\n```grafico\nf(x)=x\n```\n', 'up', '```grafico\nf(x)=x\n```\nVedi [r].\n\n[r]: https://esempio.it\n', 0, false, true],
    [
      'tra due schemi, su',
      '```schema\n{}\n```\nPara\n```grafico\ny\n```\n```schema\n{"a":1}\n```\n',
      'up',
      '```schema\n{}\n```\n```grafico\ny\n```\nPara\n```schema\n{"a":1}\n```\n',
      3,
      false,
      true,
      1,
    ],
    [
      'tra due schemi, giù',
      '```schema\n{}\n```\nPara\n```grafico\ny\n```\n```schema\n{"a":1}\n```\n',
      'down',
      '```schema\n{}\n```\nPara\n```schema\n{"a":1}\n```\n```grafico\ny\n```\n',
      7,
      false,
      true,
      1,
    ],
    ['sotto il titolo', '# Titolo\n\n```grafico\ny\n```\n', 'up', '```grafico\ny\n```\n\n# Titolo\n', 0, false, true],
    ['schema', 'A\n\n```schema\n{"v":1}\n```\n\nB\n', 'down', 'A\n\nB\n\n```schema\n{"v":1}\n```\n', 4, false, true],
  ]

  for (const [name, text, dir, expected, line, blankLines, roundTrip, nth] of cases) {
    it(name, () => {
      const r = move(text, dir, nth)
      expect(r.ok).toBe(true)
      if (!r.ok) return
      expect(r.text).toBe(expected)
      expect(r.line).toBe(line)
      expect(r.blankLines).toBe(blankLines)
      // Alla riga nuova c'è il blocco, chiuso e con lo stesso contenuto.
      const moved = parseBlocks(r.text).find((t) => t.type === 'fence' && t.map?.[0] === r.line)
      expect(moved?.content).toBe(blocks(text)[nth ?? 0].content)
      if (roundTrip) {
        const b = move(r.text, back(dir), blocks(r.text).findIndex((t) => t.map?.[0] === r.line))
        expect(b.ok && b.text).toBe(text)
      }
    })
  }

  it('due elenchi che diventerebbero uno: la nota resta com\'è', () => {
    const text = '1) a\n2) b\n\n```grafico\ny\n```\n\n3) c\n'
    expect(hints(text)).toEqual(['up down'])
    expect(move(text, 'up')).toEqual({ ok: false, reason: 'structure' })
    expect(move(text, 'down')).toEqual({ ok: false, reason: 'structure' })
  })

  it('in cima e in fondo non si va oltre', () => {
    expect(move('```grafico\ny\n```\n\nA\n', 'up')).toEqual({ ok: false, reason: 'edge' })
    expect(move('A\n\n```grafico\ny\n```\n', 'down')).toEqual({ ok: false, reason: 'edge' })
    // Il primo blocco della voce è sulla riga del marcatore: non si scavalca.
    expect(move('1) Esercizio\n\n   ```grafico\n   y = x\n   ```\n\n   Altro\n\n2) Due\n', 'up')).toEqual({ ok: false, reason: 'edge' })
    // Dopo un blocco non chiuso il grafico ne diventerebbe il testo.
    expect(move('```grafico\ny = x\n```\n```py\nnon chiuso\n', 'down')).toEqual({ ok: false, reason: 'edge' })
    expect(move('A\n\n```grafico\ny\n```\n\n$$\nx\n', 'down')).toEqual({ ok: false, reason: 'edge' })
  })

  it('non si scavalca HTML che il browser non chiude: il grafico sparirebbe dall\'anteprima', () => {
    for (const text of [
      '```grafico\ny = x\n```\n\n- voce\n  <!-- da finire\n\nTesto\n',
      '```grafico\ny = x\n```\n\n- voce\n  <script>\n\nTesto\n',
      '```grafico\ny = x\n```\n\n<div>\n<!-- da finire\n\nTesto\n',
      '```grafico\ny = x\n```\n\nUna <textarea> aperta\n\nTesto\n',
    ]) {
      expect(hints(text), JSON.stringify(text)).toEqual([''])
      expect(move(text, 'down')).toEqual({ ok: false, reason: 'edge' })
    }
    // Chiusi, scritti come codice tra apici o con la barra rovesciata, o dentro un commento chiuso, si scavalcano.
    for (const text of [
      '```grafico\ny = x\n```\n\n<!-- nota -->\n\nTesto\n',
      '```grafico\ny = x\n```\n\nIl tag `<script>` apre il codice.\n',
      '```grafico\ny = x\n```\n\n<div>\n<script>x()</script>\n</div>\n',
      '```grafico\ny = x\n```\n\nIl tag \\<script> serve per JavaScript.\n\nAltro\n',
      '```grafico\ny = x\n```\n\n<!-- vecchia versione:\n<script src="x.js">\n-->\n\nAltro\n',
      '```grafico\ny = x\n```\n\nTesto <!-- <script> --> qui.\n',
    ]) {
      expect(move(text, 'down').ok, JSON.stringify(text)).toBe(true)
      expect(hints(text), JSON.stringify(text)).toEqual(['down'])
    }
    expect(hints('Prima\n\n<!-- tolto: <style> -->\n\n```grafico\ny = x\n```\n\nAltro\n')).toEqual(['up down'])
  })

  it('le righe nuove tornano a quelle di prima (per Annulla)', () => {
    const text = 'A\n```grafico\ny\n```\nB\n\n- a\n- b\n'
    const r = move(text, 'down')
    if (!r.ok) throw new Error(r.reason)
    const lines = text.split('\n').length
    for (let l = 0; l < lines; l++) expect(r.unmapLine(r.mapLine(l)), `riga ${l}`).toBe(l)
  })

  it('due grafici uguali: il testo non cambia, il blocco passa alla riga dopo', () => {
    const text = '```grafico\ny\n```\n\n```grafico\ny\n```\n'
    const r = move(text, 'down')
    expect(r.ok && r.text).toBe(text)
    expect(r.ok && r.line).toBe(4)
  })

  it('il blocco si ritrova dalla riga e dall\'impronta', () => {
    const text = 'A\n\n```grafico\ny = x\n```\n\nB\n'
    const hash = contentHash('y = x\n')
    // Riga sbagliata (il testo prima è cambiato): c'è un solo grafico con quell'impronta.
    expect(moveFencedBlock(text, 0, hash, 'up', parseBlocks).ok).toBe(true)
    // Con due grafici uguali non si indovina.
    const two = 'A\n\n```grafico\ny = x\n```\n\nB\n\n```grafico\ny = x\n```\n'
    expect(moveFencedBlock(two, 1, hash, 'up', parseBlocks)).toEqual({ ok: false, reason: 'stale' })
    expect(moveFencedBlock(text, 2, contentHash('y = 2x\n'), 'up', parseBlocks)).toEqual({ ok: false, reason: 'stale' })
    expect(moveFencedBlock('A\r\n\r\n```grafico\r\ny = x\r\n```\r\n', 2, hash, 'up', parseBlocks)).toEqual({ ok: false, reason: 'stale' })
  })

  it('le righe di prima vanno al loro posto nuovo (gli slider dei grafici seguono)', () => {
    const text = 'Primo\n\n```grafico\ny = x\n```\n\nSecondo\n\n```grafico\ny = 2\n```\n'
    const r = move(text, 'down')
    if (!r.ok) throw new Error(r.reason)
    expect(r.mapLine(0)).toBe(0)
    expect(r.mapLine(2)).toBe(4)
    expect(r.mapLine(6)).toBe(2)
    expect(r.mapLine(8)).toBe(8)
    // Il cursore dentro il blocco lo segue.
    expect(r.text.slice(r.newFrom, r.newFrom + 10)).toBe('```grafico')
    expect(text.slice(r.oldFrom, r.oldTo)).toBe('```grafico\ny = x\n```')
  })

  it('l\'impronta è stabile e cambia con il contenuto', () => {
    expect(contentHash('y = x\n')).toBe(contentHash('y = x\n'))
    expect(contentHash('y = x\n')).not.toBe(contentHash('y = x \n'))
    expect(contentHash('')).toMatch(/^[0-9a-f]{8}$/)
  })
})

describe('spostare schemi e grafici: blocchi chiusi e aperti', () => {
  const closed = (text: string) => fenceClosed(blocks(text)[0])
  it('chiuso anche in fondo alla nota senza a capo', () => {
    expect(closed('```grafico\ny\n```')).toBe(true)
    expect(closed('```grafico\n```\n')).toBe(true)
    expect(closed('```grafico\ny\n\n```\n')).toBe(true)
  })
  it('aperto: senza chiusura, chiuso dalla fine della voce, chiusura troppo rientrata', () => {
    expect(closed('A\n\n```grafico\ny')).toBe(false)
    expect(closed('A\n\n```grafico\ny\n')).toBe(false)
    expect(closed('- voce\n  ```grafico\n  y = x\n- altra\n')).toBe(false)
    expect(closed('- a\n\n  ```grafico\n  y\n      ```\n- b\n')).toBe(false)
  })
})

describe('spostare schemi e grafici: le frecce nell\'anteprima', () => {
  it('accese verso dove si può andare', () => {
    expect(hints('```grafico\ny\n```\n')).toEqual([''])
    expect(hints('```grafico\ny\n```\n\nA\n')).toEqual(['down'])
    expect(hints('A\n\n```grafico\ny\n```\n')).toEqual(['up'])
    expect(hints('A\n\n```schema\n{}\n```\n\nB\n')).toEqual(['up down'])
    expect(hints('```grafico\ny = x\n```\n```py\nnon chiuso\n')).toEqual([''])
    expect(hints('A\n\n```grafico\ny\n```\n\n$$\nx\n')).toEqual(['up'])
    // Solo cose che non si vedono intorno: niente da scavalcare.
    expect(hints('[a]: http://x\n\n```grafico\ny\n```\n\n<!-- c -->\n')).toEqual([''])
  })

  it('niente frecce dove il blocco non si sposta', () => {
    for (const text of [
      '- ```grafico\n  y\n  ```\n- b\n',
      'A\n\n```grafico\ny',
      'A\n\n```grafico\ny\n',
      '- voce\n  ```grafico\n  y = x\n- altra\n',
      '- a\n\n  ```grafico\n  y\n      ```\n- b\n',
      '> A\n>\n> ```grafico\n> y\n> ```\n',
      'A[^1]\n\n[^1]: nota\n\n    ```grafico\n    y\n    ```\n',
    ]) expect(hints(text), JSON.stringify(text)).toEqual([null])
  })

  it('in una voce: data-move-in, e il primo blocco della voce resta fermo', () => {
    const host = document.createElement('div')
    host.innerHTML = renderMarkdown('1) Esercizio\n\n   ```grafico\n   y = x\n   ```\n\n   Altro\n\n2) Due\n')
    const block = host.querySelector<HTMLElement>('.graph-block')!
    expect(block.dataset.move).toBe('down')
    expect(block.dataset.moveIn).toBe('voce')
  })

  it('l\'impronta c\'è sempre, anche quando DOMPurify toglie data-graph', () => {
    const host = document.createElement('div')
    host.innerHTML = renderMarkdown('```grafico\ntitolo: a --> b\ny = x\n```\n', { untrusted: true })
    const block = host.querySelector<HTMLElement>('.graph-block')!
    expect(block.dataset.hash).toBe(contentHash('titolo: a --> b\ny = x\n'))
    expect(block.dataset.move).toBe('')
  })
})

describe('spostare schemi e grafici: tante note a caso', () => {
  const pieces = [
    'Paragrafo semplice.', 'Due righe\nattaccate.', '# Titolo', 'Titolo\n======', '- a\n- b', '1) uno\n2) due', 'a) primo\nb) secondo',
    '> citazione\n> due', '| a | b |\n|---|---|\n| 1 | 2 |', '$$\nx^2\n$$', '$a = 2$', '---', '<!-- commento -->', '[r]: http://x',
    'Nota[^1]', '[^1]: testo della nota', '<div>\nhtml\n</div>', '```py\nprint(1)\n```',
    '```grafico\ny = x\n```', '```grafico\ny = 2x\n```', '```schema\n{"nodes":[]}\n```',
    '- voce\n  ```grafico\n  y = x^2\n  ```\n  testo dopo', '1) Esercizio\n\n   ```grafico\n   y = 3\n   ```\n\n   Spiegazione',
    '- voce\n\n  testo\n\n  ```schema\n  {"a":1}\n  ```', '$$\nnon chiusa',
  ]
  let seed = 7
  const rnd = (n: number) => ((seed = (Math.imul(seed, 1103515245) + 12345) & 0x7fffffff), (seed >>> 8) % n)

  it('le frecce dicono il vero e il testo resta lo stesso, in un altro ordine', () => {
    let moved = 0
    for (let k = 0; k < 500; k++) {
      const n = 2 + rnd(6)
      const parts: string[] = []
      for (let i = 0; i < n; i++) parts.push(pieces[rnd(pieces.length)])
      let text = parts.map((p, i) => p + (i < n - 1 ? ['\n', '\n\n', '\n\n\n'][rnd(3)] : '')).join('')
      if (rnd(2)) text += '\n'
      const host = document.createElement('div')
      host.innerHTML = renderMarkdown(text)
      const shown = [...host.querySelectorAll<HTMLElement>('.graph-block, .schema-block')]
      for (const el of shown) {
        for (const dir of ['up', 'down'] as MoveDir[]) {
          const r = moveFencedBlock(text, Number(el.dataset.line), el.dataset.hash!, dir, parseBlocks)
          const lit = el.dataset.move?.split(' ').includes(dir) ?? false
          // Freccia accesa: si sposta (o, raramente, la rilettura trova che due elenchi si unirebbero).
          expect(r.ok || r.reason === 'structure', `${JSON.stringify(text)} riga ${el.dataset.line} ${dir}`).toBe(lit)
          if (!r.ok) continue
          moved++
          expect(apply(text, r.changes)).toBe(r.text)
          const words = (s: string) => s.split('\n').filter((l) => l.trim()).sort().join('\n')
          expect(words(r.text)).toBe(words(text))
          const at = parseBlocks(r.text).find((t) => t.type === 'fence' && t.map?.[0] === r.line)
          expect(at && contentHash(at.content)).toBe(el.dataset.hash)
          expect(r.mapLine(Number(el.dataset.line))).toBe(r.line)
          // E si torna indietro.
          expect(moveFencedBlock(r.text, r.line, el.dataset.hash!, back(dir), parseBlocks).ok).toBe(true)
        }
      }
    }
    expect(moved).toBeGreaterThan(300)
  }, 60_000)
})
