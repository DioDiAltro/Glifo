import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it } from 'vitest'
import { BoardStore, fromRecord, IdbBoards, MemoryBoards, openBoardDatabase } from '../src/board/store'
import type { Stroke } from '../src/board/strokes'

const stroke = (id: string, extra: Partial<Stroke> = {}): Stroke => ({
  id,
  t: 1000,
  color: 'ink',
  size: 3.2,
  pen: true,
  points: [10.5, 20.25, 0.5, 30.75, 40.5, 0.25],
  ...extra,
})

let count = 0
const opened: BoardStore[] = []
/** Una «scheda» con il suo database (ogni test il suo, da nome diverso): `share` per aprirne un'altra sullo stesso. */
function storeFor(name = `db${++count}`): BoardStore {
  const store = new BoardStore(async () => new IdbBoards(await openBoardDatabase(indexedDB, name)))
  opened.push(store)
  return store
}

afterEach(() => {
  for (const s of opened.splice(0)) s.close()
})

describe('lavagna: il salvataggio in IndexedDB', () => {
  it('salva, toglie e rilegge i tratti di una nota, con la vista', async () => {
    const boards = storeFor()
    expect(await boards.persistent()).toBe(true)
    await boards.change('n1', { put: [stroke('a'), stroke('b', { color: 'red', t: 2000 })] })
    await boards.change('n2', { put: [stroke('c')] })
    await boards.change('n1', { remove: ['a'] })
    await boards.saveView('n1', { x: 5, y: -10, zoom: 2 })
    const data = await boards.load('n1')
    expect(data.strokes).toEqual([stroke('b', { color: 'red', t: 2000 })])
    expect(data.view).toEqual({ x: 5, y: -10, zoom: 2 })
    expect((await boards.load('n2')).strokes.map((s) => s.id)).toEqual(['c'])
    expect(await boards.load('vuota')).toEqual({ strokes: [], view: null })
  })

  it('una nota eliminata si porta via la sua lavagna; le altre restano', async () => {
    const boards = storeFor()
    await boards.change('n1', { put: [stroke('a')] })
    await boards.saveView('n1', { x: 1, y: 1, zoom: 1 })
    await boards.change('n2', { put: [stroke('b')] })
    await boards.saveView('n3', { x: 0, y: 0, zoom: 3 })
    expect((await boards.prune(() => new Set(['n2']))).sort()).toEqual(['n1', 'n3'])
    expect(await boards.load('n1')).toEqual({ strokes: [], view: null })
    expect((await boards.load('n2')).strokes).toHaveLength(1)
    await boards.remove(['n2'])
    expect((await boards.load('n2')).strokes).toEqual([])
  })

  it('se la nota cambia id la lavagna va con lei; se si sdoppia ce l\'hanno tutte e due', async () => {
    const boards = storeFor()
    await boards.change('vecchio', { put: [stroke('a'), stroke('b')] })
    await boards.saveView('vecchio', { x: 3, y: 4, zoom: 1.5 })
    await boards.move('vecchio', 'nuovo')
    expect((await boards.load('vecchio')).strokes).toEqual([])
    const moved = await boards.load('nuovo')
    expect(moved.strokes.map((s) => s.id).sort()).toEqual(['a', 'b'])
    expect(moved.view).toEqual({ x: 3, y: 4, zoom: 1.5 })
    await boards.copy('nuovo', 'copia')
    expect((await boards.load('nuovo')).strokes).toHaveLength(2)
    expect((await boards.load('copia')).strokes).toHaveLength(2)
    expect(await boards.drawn(['nuovo', 'copia', 'vecchio', 'altra'])).toBe(2)
  })

  it('il backup ha le lavagne con i punti in una stringa, e le rimette su note con id nuovi', async () => {
    const boards = storeFor()
    await boards.change('n1', { put: [stroke('a', { points: [1.234, 5.678, 0.1234, 9, 10, 1] })] })
    await boards.saveView('n1', { x: 0, y: 50, zoom: 1 })
    await boards.saveView('n2', { x: 0, y: 0, zoom: 1 })
    const backup = await boards.exportBoards(['n1', 'n2'])
    // Solo le lavagne con qualcosa scritto.
    expect(backup.map((b) => b.note)).toEqual(['n1'])
    expect(backup[0].strokes[0].points).toBe('1.23 5.68 0.123 9 10 1')
    const json = JSON.parse(JSON.stringify(backup))
    let n = 0
    expect(await boards.importBoard('rifatta', json[0], () => `id${++n}`)).toBe(1)
    const back = await boards.load('rifatta')
    expect(back.strokes).toEqual([{ id: 'id1', t: 1000, color: 'ink', size: 3.2, pen: true, points: [1.23, expect.closeTo(5.68, 5), expect.closeTo(0.123, 5), 9, 10, 1] }])
    expect(back.view).toEqual({ x: 0, y: 50, zoom: 1 })
    // Un backup rovinato non rompe niente.
    expect(await boards.importBoard('x', { strokes: [{ points: 'a b c' }, null, 3] }, () => 'z')).toBe(0)
    expect(await boards.importBoard('x', 'niente', () => 'z')).toBe(0)
  })

  it('le altre schede sanno quale lavagna è cambiata', async () => {
    const a = storeFor('condiviso')
    const b = storeFor('condiviso')
    const heard: string[][] = []
    b.onChange((notes) => heard.push(notes))
    await a.change('n1', { put: [stroke('a')] })
    await a.remove(['n9'])
    await new Promise((r) => setTimeout(r, 50))
    expect(heard).toEqual([['n1'], ['n9']])
    // E leggono quello che ha scritto la prima.
    expect((await b.load('n1')).strokes.map((s) => s.id)).toEqual(['a'])
  })

  it('senza IndexedDB la lavagna funziona lo stesso, in memoria, e lo dice', async () => {
    const boards = new BoardStore(() => Promise.reject(new Error('no')))
    opened.push(boards)
    expect(await boards.persistent()).toBe(false)
    await boards.change('n1', { put: [stroke('a')] })
    expect((await boards.load('n1')).strokes).toHaveLength(1)
    await boards.move('n1', 'n2')
    expect(await boards.drawn(['n1', 'n2'])).toBe(1)
    expect(await new MemoryBoards().notes()).toEqual([])
  })

  it('l\'evidenziatore si salva, si rilegge e va nel backup', async () => {
    const boards = storeFor()
    await boards.change('n1', { put: [stroke('h', { color: 'yellow', size: 18, highlight: true }), stroke('p')] })
    const back = await boards.load('n1')
    expect(back.strokes.find((s) => s.id === 'h')).toMatchObject({ color: 'yellow', size: 18, highlight: true })
    expect(back.strokes.find((s) => s.id === 'p')).not.toHaveProperty('highlight')
    const backup = JSON.parse(JSON.stringify(await boards.exportBoards(['n1'])))
    expect(backup[0].strokes.map((s: { highlight?: boolean }) => s.highlight ?? false).sort()).toEqual([false, true])
    let n = 0
    await boards.importBoard('rifatta', backup[0], () => `id${++n}`)
    expect((await boards.load('rifatta')).strokes.filter((s) => s.highlight).map((s) => s.color)).toEqual(['yellow'])
    // Un evidenziatore con un colore che non c'è diventa giallo; una penna con un colore da evidenziatore, nera.
    expect(fromRecord({ id: 'x', color: 'nero', highlight: true, points: [1, 2, 0.5] })).toMatchObject({ color: 'yellow', highlight: true })
    expect(fromRecord({ id: 'y', color: 'pink', points: [1, 2, 0.5] })).toMatchObject({ color: 'ink' })
  })

  it('un tratto salvato male si sistema o si scarta', () => {
    expect(fromRecord({ id: 'a', t: 'x', color: 'viola', size: -1, pen: 'sì', points: [1, 2, 0.5, 3] })).toEqual({
      id: 'a',
      t: 0,
      color: 'ink',
      size: 3.2,
      pen: false,
      points: [1, 2, 0.5],
    })
    expect(fromRecord({ id: 'a', points: [] })).toBeNull()
    expect(fromRecord({ id: 'a', points: [1, Number.NaN, 0.5] })).toBeNull()
    expect(fromRecord({ points: [1, 2, 3] })).toBeNull()
    expect(fromRecord(null)).toBeNull()
  })
})
