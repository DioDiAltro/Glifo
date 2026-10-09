// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { BoardStore, MemoryBoards } from '../src/board/store'
import { newStrokeId } from '../src/board/strokes'
import { FoldersStore } from '../src/store/folders'
import { NotesStore } from '../src/store/notes'
import { backupNotes, restoreBackup, restoredMessage } from '../src/store/restore'

const opened: BoardStore[] = []
function boardsFor(): BoardStore {
  const boards = new BoardStore(async () => new MemoryBoards())
  opened.push(boards)
  return boards
}

beforeEach(() => localStorage.clear())
afterEach(() => {
  for (const b of opened.splice(0)) b.close()
})

const ID_A = '0b6f2a52-3c1d-4e0f-9a7b-1c2d3e4f5a6b'
const ID_B = '1c7a3b63-4d2e-4f1a-8b8c-2d3e4f5a6b7c'
const ID_C = '2d8b4c74-5e3f-4a2b-9c9d-3e4f5a6b7c8d'

/** Un backup come quello che scrive «Scarica backup» (backup in main.ts). */
const backup = {
  app: 'glifo',
  version: 1,
  notes: [
    { id: ID_A, title: 'Limiti', createdAt: 1000, updatedAt: 3000, folderId: 'f1', content: '# Limiti\n\nlim x→0' },
    { id: ID_B, title: 'Derivate', createdAt: 2000, updatedAt: 4000, folderId: null, content: '# Derivate' },
  ],
  folders: [{ id: 'f1', name: 'Analisi' }],
  dictionary: ['Weierstrass'],
  boards: [{ note: ID_A, strokes: [{ t: 5, color: 'ink', size: 3, pen: true, points: '10 20 0.5 30 40 0.5' }] }],
}

describe('Ripristina backup', () => {
  it('le note tornano con il loro id, nella loro cartella e con le loro date', async () => {
    const notes = new NotesStore()
    const folders = new FoldersStore()
    const result = await restoreBackup(backup, { notes, folders, boards: boardsFor(), newStrokeId })
    expect(result).toEqual({ added: 2, already: 0, boards: 1 })
    const limiti = notes.get(ID_A)!
    expect(limiti.content).toBe('# Limiti\n\nlim x→0')
    expect(folders.list().find((f) => f.id === limiti.folderId)?.name).toBe('Analisi')
    expect([limiti.createdAt, limiti.updatedAt]).toEqual([1000, 3000])
    expect(notes.get(ID_B)?.folderId).toBeNull()
  })

  it('ripristinando due volte lo stesso backup le note e i tratti non raddoppiano', async () => {
    // Prima del 9 ottobre 2026 ogni ripristino aggiungeva tutte le note con un id nuovo.
    const notes = new NotesStore()
    const folders = new FoldersStore()
    const boards = boardsFor()
    await restoreBackup(backup, { notes, folders, boards, newStrokeId })
    const again = await restoreBackup(backup, { notes, folders, boards, newStrokeId })
    expect(again).toEqual({ added: 0, already: 2, boards: 0 })
    expect(notes.list()).toHaveLength(2)
    expect(folders.list()).toHaveLength(1)
    expect((await boards.load(ID_A)).strokes).toHaveLength(1)
    expect(restoredMessage(again)).toBe('Gli appunti del backup c\'erano già tutti')
  })

  it('con l\'account le note ci sono già: il backup rimette solo le lavagne, sulle note giuste', async () => {
    // Il trasloco su glifo.page: si entra con l'account, le note arrivano dall'account (stessi id),
    // le lavagne no (non vanno mai sul server) e arrivano dal backup del vecchio sito.
    const notes = new NotesStore({ space: 'u.utente-1.', trackDeletions: true })
    notes.applyRemote({ id: ID_A, content: '# Limiti\n\nlim x→0', folderId: null, createdAt: 1000, updatedAt: 3000, rev: 4 })
    notes.applyRemote({ id: ID_B, content: '# Derivate', folderId: null, createdAt: 2000, updatedAt: 4000, rev: 2 })
    const boards = boardsFor()
    const result = await restoreBackup(backup, { notes, folders: new FoldersStore({ space: 'u.utente-1.', trackDeletions: true }), boards, newStrokeId })
    expect(result).toEqual({ added: 0, already: 2, boards: 1 })
    expect(notes.list()).toHaveLength(2)
    // Le note dell'account restano com'erano: niente da mandare.
    expect(notes.changed()).toEqual([])
    expect((await boards.load(ID_A)).strokes).toHaveLength(1)
    expect(restoredMessage(result)).toBe('Gli appunti c\'erano già: rimessa 1 lavagna')
  })

  it('se con lo stesso id c\'è una nota diversa, quella del backup si aggiunge a parte', async () => {
    const notes = new NotesStore()
    notes.adopt({ id: ID_A, content: '# Limiti\n\nscritta dopo il backup', folderId: null, createdAt: 1000, updatedAt: 9000 })
    const boards = boardsFor()
    const result = await restoreBackup(backup, { notes, folders: new FoldersStore(), boards, newStrokeId })
    expect(result).toEqual({ added: 2, already: 0, boards: 1 })
    expect(notes.get(ID_A)?.content).toBe('# Limiti\n\nscritta dopo il backup')
    const copy = notes.list().find((n) => n.id !== ID_A && n.id !== ID_B)!
    expect(notes.get(copy.id)?.content).toBe('# Limiti\n\nlim x→0')
    // La lavagna del backup va sulla copia, non sulla nota che c'era.
    expect((await boards.load(copy.id)).strokes).toHaveLength(1)
    expect((await boards.load(ID_A)).strokes).toHaveLength(0)
  })

  it('una lavagna non va su una nota che ne ha già una', async () => {
    const notes = new NotesStore()
    const boards = boardsFor()
    notes.adopt({ id: ID_A, content: '# Limiti\n\nlim x→0', folderId: null, createdAt: 1000, updatedAt: 3000 })
    await boards.importBoard(ID_A, { strokes: [{ t: 9, color: 'red', size: 2, pen: false, points: '1 2 0.5 3 4 0.5' }] }, newStrokeId)
    const result = await restoreBackup(backup, { notes, folders: new FoldersStore(), boards, newStrokeId })
    expect(result.boards).toBe(0)
    expect((await boards.load(ID_A)).strokes.map((s) => s.color)).toEqual(['red'])
  })

  it('una nota eliminata qui, e non ancora tolta dall\'account, torna', async () => {
    const notes = new NotesStore({ space: 'u.utente-1.', trackDeletions: true })
    notes.applyRemote({ id: ID_B, content: '# Derivate', folderId: null, createdAt: 2000, updatedAt: 4000, rev: 2 })
    notes.remove(ID_B)
    expect(notes.deleted().map((d) => d.id)).toEqual([ID_B])
    await restoreBackup(backup, { notes, folders: new FoldersStore({ space: 'u.utente-1.', trackDeletions: true }), boards: boardsFor(), newStrokeId })
    expect(notes.get(ID_B)?.content).toBe('# Derivate')
    expect(notes.deleted()).toEqual([])
  })

  it('le note senza id o con un id vecchio (non UUID) tornano con un id nuovo', async () => {
    const notes = new NotesStore()
    const result = await restoreBackup(
      { notes: [{ content: '# Senza id' }, { id: 'lzx1abcd-vecchia', content: '# Vecchia' }, { id: ID_C, content: 3 }] },
      { notes, folders: new FoldersStore(), boards: boardsFor(), newStrokeId, now: 7000 },
    )
    expect(result).toEqual({ added: 2, already: 0, boards: 0 })
    expect(notes.list().map((n) => n.title).sort()).toEqual(['Senza id', 'Vecchia'])
    expect(notes.list().every((n) => n.updatedAt === 7000)).toBe(true)
  })

  it('un file senza note non è un backup', () => {
    expect(backupNotes(null)).toEqual([])
    expect(backupNotes({ notes: 'no' })).toEqual([])
    expect(backupNotes({ notes: [{ id: 'x' }] })).toEqual([])
    expect(backupNotes(backup)).toHaveLength(2)
  })

  it('il messaggio dice quante note e lavagne sono tornate e quante c\'erano già', () => {
    expect(restoredMessage({ added: 1, already: 0, boards: 0 })).toBe('Ripristinato 1 appunto')
    expect(restoredMessage({ added: 3, already: 0, boards: 2 })).toBe('Ripristinati 3 appunti e 2 lavagne')
    expect(restoredMessage({ added: 3, already: 1, boards: 0 })).toBe('Ripristinati 3 appunti; uno c\'era già')
    expect(restoredMessage({ added: 2, already: 4, boards: 1 })).toBe('Ripristinati 2 appunti e 1 lavagna; 4 c\'erano già')
    expect(restoredMessage({ added: 0, already: 5, boards: 3 })).toBe('Gli appunti c\'erano già: rimesse 3 lavagne')
  })
})
