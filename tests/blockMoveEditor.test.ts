// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { history, redo, undo } from '@codemirror/commands'
import { EditorSelection, EditorState, type Transaction } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { blockMoveTransaction, blockMoves } from '../src/editor/moveBlock'
import { schemaBlocks } from '../src/editor/schemaBlocks'
import { contentHash, fenceName, type MoveDir } from '../src/render/blockMove'
import { parseBlocks } from '../src/render/markdown'

// CodeMirror misura il testo sullo schermo: in jsdom bastano misure vuote.
Range.prototype.getClientRects = () => [] as unknown as DOMRectList
Range.prototype.getBoundingClientRect = () => new DOMRect()

const S1 = '```schema\n{"nodes":[{"id":"a","text":"A","x":0,"y":0}],"edges":[]}\n```'
const S2 = '```schema\n{"nodes":[{"id":"b","text":"B","x":0,"y":0}],"edges":[]}\n```'
const G = '```grafico\ny = x\n```'

const create = (doc: string, cursor = 0) => EditorState.create({ doc, selection: EditorSelection.cursor(cursor), extensions: [history(), schemaBlocks(() => {})] })

function fences(doc: string) {
  return parseBlocks(doc).filter((t) => t.type === 'fence' && ['schema', 'grafico'].includes(fenceName(t)))
}

/** Sposta l'`nth` blocco: lo stato dopo, o il motivo per cui non si sposta. */
function move(state: EditorState, dir: MoveDir, nth = 0) {
  const f = fences(state.doc.toString())[nth]
  const r = blockMoveTransaction(state, f.map![0], contentHash(f.content), dir)
  return r
}

function run(state: EditorState, command: typeof undo): EditorState {
  let next = state
  command({ state, dispatch: (tr: Transaction) => (next = tr.state) })
  return next
}

describe('spostare schemi e grafici nell\'editor', () => {
  it('la protezione degli schemi lascia passare lo spostamento, anche con schemi attaccati', () => {
    const docs = [
      `${S1}\nPara\n${G}\n${S2}\n`,
      `${S1}\n\n${S2}\n`,
      `Testo\n\n${S1}\n\n${S2}`,
      `- a\n  ${S1.replace(/\n/g, '\n  ')}\n  ${S2.replace(/\n/g, '\n  ')}\n- b\n`,
      `${G}\n${S1}\nPara\n`,
      `Para\n${S1}\nAltro\n`,
    ]
    let moved = 0
    for (const doc of docs) {
      fences(doc).forEach((_, nth) => {
        for (const dir of ['up', 'down'] as MoveDir[]) {
          // Scritto qualcosa subito prima: Annulla toglie solo lo spostamento.
          const typed = create(doc).update({ changes: { from: doc.length, insert: 'z' }, userEvent: 'input.type' }).state
          const r = move(typed, dir, nth)
          if (!r.ok) {
            expect(r.reason, `${JSON.stringify(doc)} ${nth} ${dir}`).toBe('edge')
            continue
          }
          moved++
          expect(r.tr!.newDoc.toString()).toBe(r.move.text)
          expect(run(r.tr!.state, undo).doc.toString()).toBe(typed.doc.toString())
        }
      })
    }
    expect(moved).toBeGreaterThan(8)
  })

  it('ogni spostamento è un passo di Annulla, e Ripeti lo rifà', () => {
    const doc = `A\n\n${S1}\n\nB\n\nC\n`
    const one = move(create(doc), 'down')
    if (!one.ok) throw new Error(one.reason)
    const two = move(one.tr!.state, 'down')
    if (!two.ok) throw new Error(two.reason)
    let state = two.tr!.state
    expect(state.doc.toString()).toBe(`A\n\nB\n\nC\n\n${S1}\n`)
    state = run(state, undo)
    expect(state.doc.toString()).toBe(one.move.text)
    state = run(state, undo)
    expect(state.doc.toString()).toBe(doc)
    state = run(state, redo)
    expect(state.doc.toString()).toBe(one.move.text)
  })

  it('quello che si scrive dopo, anche proprio accanto, non si unisce allo spostamento', () => {
    const doc = `A\n\n${G}\n\nB\n`
    const r = move(create(doc), 'up')
    if (!r.ok) throw new Error(r.reason)
    const moved = r.tr!.state
    // Subito prima di «A», dove finisce il testo inserito dallo spostamento: senza isolateHistory si unirebbe.
    const at = r.move.skippedNewFrom
    const typed = moved.update({ changes: { from: at, insert: 'z' }, userEvent: 'input.type' }).state
    expect(typed.doc.sliceString(at, at + 2)).toBe('zA')
    expect(run(typed, undo).doc.toString()).toBe(r.move.text)
  })

  it('il cursore nel blocco scavalcato resta sulla stessa lettera; quello nel blocco lo segue', () => {
    const doc = `Primo paragrafo\n\n${G}\n`
    const r = move(create(doc, 6), 'up')
    if (!r.ok) throw new Error(r.reason)
    const state = r.tr!.state
    const head = state.selection.main.head
    expect(state.doc.sliceString(head, head + 9)).toBe('paragrafo')

    const inside = doc.indexOf('y = x')
    const r2 = move(create(doc, inside), 'up')
    if (!r2.ok) throw new Error(r2.reason)
    const h2 = r2.tr!.state.selection.main.head
    expect(r2.tr!.state.doc.sliceString(h2, h2 + 5)).toBe('y = x')
  })

  it('con un blocco sulla riga del marcatore più sopra lo spostamento non è rifiutato', () => {
    // findSchemaBlocks non vede «1. ```grafico» e sbaglia le coppie di ```: la protezione degli schemi
    // annullava lo spostamento («Lo spostamento non è riuscito»).
    for (const doc of [
      '1. ```grafico\n   y = x\n   ```\n2. Esercizio\n\n```grafico\ny = 2x\n```\n\n```schema\n{"nodes":[]}\n```\n',
      '- ```python\n  print(1)\n  ```\n\nTesto\n\n```grafico\ny = 2x\n```\n\n```schema\n{"nodes":[]}\n```\n',
    ]) {
      const nth = fences(doc).findIndex((f) => f.content === 'y = 2x\n')
      const r = move(create(doc), 'down', nth)
      expect(r.ok, JSON.stringify(doc)).toBe(true)
      if (r.ok) expect(r.tr!.newDoc.toString()).toBe(r.move.text)
    }
  })

  it('scendendo, il cursore alla fine del blocco scavalcato resta lì (e non finisce dopo la ``` del grafico)', () => {
    for (const doc of ['A\n\n```grafico\ny = x\n```\n\nPara\n', '# Prova\n\n```grafico\ny = x\n```\n\nIl grafico è una retta', 'A\n\n```grafico\ny = x\n```\n\n- uno\n- due\n\nZ\n']) {
      const end = doc.includes('- due') ? doc.indexOf('- due') + 5 : doc.replace(/\n$/, '').length
      const r = move(create(doc, end), 'down')
      if (!r.ok) throw new Error(r.reason)
      const state = r.tr!.state
      const head = state.selection.main.head
      expect(state.doc.sliceString(head - 3, head), JSON.stringify(doc)).toBe(doc.slice(end - 3, end))
      // Scrivendo lì il grafico resta chiuso.
      const typed = state.update({ changes: { from: head, insert: '**g**' } }).state.doc.toString()
      expect(fences(typed).map((f) => f.content)).toEqual(['y = x\n'])
    }
  })

  it('il cursore sulle righe vuote fra i due blocchi resta fra i due, e scrivendo lì non si rompe niente', () => {
    const docs: [string, MoveDir, number][] = []
    // Con tre righe vuote e con una sola (il caso più comune).
    for (const gap of ['\n\n\n\n', '\n\n']) {
      docs.push(
        [`# C\n\n\`\`\`grafico\ny = x\n\`\`\`${gap}\`\`\`grafico\ny = x^2\n\`\`\`\n`, 'down', 0],
        [`# C\n\n\`\`\`grafico\ny = x\n\`\`\`${gap}\`\`\`grafico\ny = x^2\n\`\`\`\n`, 'up', 1],
        [`# C\n\n\`\`\`grafico\ny = x\n\`\`\`${gap}Un paragrafo\n`, 'down', 0],
        [`# C\n\n\`\`\`grafico\ny = x\n\`\`\`${gap}- voce\n- altra\n`, 'down', 0],
        [`# C\n\nUn paragrafo${gap}\`\`\`grafico\ny = x\n\`\`\`\n`, 'up', 0],
      )
    }
    for (const [doc, dir, nth] of docs) {
      // Sulla riga vuota di mezzo.
      const lines = doc.split('\n')
      const first = lines.findIndex((l, i) => l === '' && i > 1 && lines[i - 1] !== '')
      const blanks = lines.slice(first).findIndex((l) => l !== '')
      const middle = first + Math.floor((blanks - 1) / 2)
      const at = lines.slice(0, middle).reduce((n, l) => n + l.length + 1, 0)
      const r = move(create(doc, at), dir, nth)
      if (!r.ok) throw new Error(r.reason)
      const state = r.tr!.state
      const head = state.selection.main.head
      expect(state.doc.lineAt(head).text, JSON.stringify(doc)).toBe('')
      const typed = state.update({ changes: { from: head, insert: 'x' } }).state.doc.toString()
      expect(fences(typed).length, typed).toBe(fences(doc).length)
      expect(typed.includes('- voce') === doc.includes('- voce')).toBe(true)
    }
  })

  it('il blocco selezionato con l\'a capo (Maiusc+↓ sulle sue righe) resta selezionato', () => {
    for (const gap of ['\n\n', '\n\n\n\n']) {
      for (const dir of ['down', 'up'] as MoveDir[]) {
        const doc = dir === 'down' ? `# C\n\n${G}\n${gap.slice(1)}Para\n\nAltro\n` : `# C\n\nPara${gap}${G}\nAltro\n`
        const from = doc.indexOf('```grafico')
        const to = from + G.length + 1
        for (const [anchor, head] of [[from, to], [to, from]]) {
          const r = move(EditorState.create({ doc, selection: EditorSelection.single(anchor, head), extensions: [history(), schemaBlocks(() => {})] }), dir)
          if (!r.ok) throw new Error(r.reason)
          const s = r.tr!.state.selection.main
          expect(r.tr!.state.doc.sliceString(s.from, s.to), `${JSON.stringify(doc)} ${dir}`).toBe(`${G}\n`)
        }
      }
    }
  })

  it('una selezione che prende tutti e due i blocchi (anche Ctrl+A) li prende ancora', () => {
    const all = '```grafico\ny = x\n```\n\nPara\n'
    const r = move(EditorState.create({ doc: all, selection: EditorSelection.single(0, all.length), extensions: [history(), schemaBlocks(() => {})] }), 'down')
    if (!r.ok) throw new Error(r.reason)
    const sel = r.tr!.state.selection.main
    expect([sel.from, sel.to]).toEqual([0, r.tr!.state.doc.length])

    const doc = '# T\n\n```grafico\ny = x\n```\n\nPara\n\nAltro\n'
    const from = doc.indexOf('```grafico')
    const to = doc.indexOf('Para') + 4
    const r2 = move(EditorState.create({ doc, selection: EditorSelection.single(from, to), extensions: [history(), schemaBlocks(() => {})] }), 'down')
    if (!r2.ok) throw new Error(r2.reason)
    const s2 = r2.tr!.state.selection.main
    const picked = r2.tr!.state.doc.sliceString(s2.from, s2.to)
    expect(picked).toBe('Para\n\n```grafico\ny = x\n```')
  })

  it('Annulla e Ripeti dicono di nuovo come si sono spostate le righe (gli slider seguono)', () => {
    const maps: ((l: number) => number)[] = []
    const doc = `A\n\n${G}\n\nB\n\n${G.replace('y = x', 'y = 2')}\n`
    const view = new EditorView({
      state: EditorState.create({ doc, extensions: [history(), schemaBlocks(() => {}), blockMoves((map) => maps.push(map))] }),
      parent: document.body,
    })
    const r = move(view.state, 'down')
    if (!r.ok) throw new Error(r.reason)
    view.dispatch(r.tr!)
    undo(view)
    redo(view)
    // Il grafico va dalla riga 2 alla 4 e B dalla 6 alla 2; Annulla li rimette, Ripeti di nuovo.
    expect(maps.length).toBe(3)
    expect([maps[0](2), maps[0](6)]).toEqual([4, 2])
    expect([maps[1](4), maps[1](2)]).toEqual([2, 6])
    expect([maps[2](2), maps[2](6)]).toEqual([4, 2])
    view.destroy()
  })

  it('due blocchi uguali: niente modifica', () => {
    const doc = `${G}\n\n${G}\n`
    const r = move(create(doc), 'down')
    expect(r.ok && r.tr).toBe(null)
    expect(r.ok && r.move.line).toBe(4)
  })
})
