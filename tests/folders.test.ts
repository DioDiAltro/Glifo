// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { FoldersStore, cleanFolderName, groupByFolder, loadClosedFolders, saveClosedFolders, type Folder } from '../src/store/folders'
import { NotesStore, type NoteMeta } from '../src/store/notes'

beforeEach(() => localStorage.clear())

const names = (store: FoldersStore) => store.list().map((f) => f.name)

describe('cartelle', () => {
  it('si creano, si rinominano e si eliminano', () => {
    const folders = new FoldersStore()
    const analisi = folders.create('  Analisi   1 ')!
    expect(analisi.name).toBe('Analisi 1')
    expect(folders.rename(analisi.id, 'Analisi matematica 1')).toBe(true)
    expect(new FoldersStore().get(analisi.id)?.name).toBe('Analisi matematica 1')
    folders.remove(analisi.id)
    expect(new FoldersStore().list()).toEqual([])
  })

  it('in ordine alfabetico, con i numeri in ordine naturale', () => {
    const folders = new FoldersStore()
    for (const n of ['Fisica 1', 'analisi 10', 'Analisi 2', 'Chimica']) folders.create(n)
    expect(names(folders)).toEqual(['Analisi 2', 'analisi 10', 'Chimica', 'Fisica 1'])
  })

  it('niente nomi vuoti o doppi (maiuscole e accenti non contano)', () => {
    const folders = new FoldersStore()
    const perche = folders.create('Perché')!
    expect(folders.create('   ')).toBeNull()
    expect(folders.create('perche')).toBeNull()
    expect(folders.nameTaken('PERCHÉ')).toBe(true)
    expect(folders.nameTaken('perché', perche.id)).toBe(false)
    const altra = folders.create('Altra')!
    expect(folders.rename(altra.id, 'perche')).toBe(false)
    expect(folders.byName('ALTRA')?.id).toBe(altra.id)
    expect(cleanFolderName('x'.repeat(100))).toHaveLength(60)
  })

  it('due schede non si cancellano le cartelle a vicenda', () => {
    const schedaA = new FoldersStore()
    const schedaB = new FoldersStore()
    schedaA.create('Analisi 1')
    schedaB.create('Fisica 1')
    expect(names(new FoldersStore())).toEqual(['Analisi 1', 'Fisica 1'])
    schedaB.reload()
    expect(names(schedaB)).toEqual(['Analisi 1', 'Fisica 1'])
  })

  it('le cartelle chiuse si ricordano su questo dispositivo', () => {
    saveClosedFolders(new Set(['a', 'b']))
    expect([...loadClosedFolders()]).toEqual(['a', 'b'])
  })
})

describe('note nelle cartelle', () => {
  it('una nota si crea in una cartella, si sposta e resta lì quando si salva', () => {
    const notes = new NotesStore()
    const nota = notes.create('# Limiti', 'analisi')
    expect(notes.meta(nota.id)?.folderId).toBe('analisi')
    notes.save(nota.id, '# Limiti notevoli')
    expect(new NotesStore().meta(nota.id)?.folderId).toBe('analisi')
    notes.move(nota.id, 'fisica')
    expect(new NotesStore().meta(nota.id)?.folderId).toBe('fisica')
    notes.move(nota.id, null)
    expect(new NotesStore().meta(nota.id)?.folderId).toBeNull()
  })

  it('eliminando una cartella le sue note restano, fuori dalle cartelle', () => {
    const folders = new FoldersStore()
    const notes = new NotesStore()
    const analisi = folders.create('Analisi 1')!
    const uno = notes.create('# Uno', analisi.id)
    const due = notes.create('# Due', analisi.id)
    const altra = notes.create('# Altra', 'fisica')
    notes.moveAll(analisi.id, null)
    folders.remove(analisi.id)
    const dopo = new NotesStore()
    expect([uno, due].map((n) => dopo.meta(n.id)?.folderId)).toEqual([null, null])
    expect(dopo.meta(altra.id)?.folderId).toBe('fisica')
  })

  it('una nota eliminata altrove e salvata qui torna nella sua cartella', () => {
    const schedaA = new NotesStore()
    const nota = schedaA.create('# Appunti', 'analisi')
    const schedaB = new NotesStore()
    schedaA.remove(nota.id)
    schedaB.save(nota.id, '# Appunti\n\ntesto')
    expect(new NotesStore().meta(nota.id)?.folderId).toBe('analisi')
  })

  it('le note nuove hanno id unici anche tra dispositivi', () => {
    const notes = new NotesStore()
    const ids = new Set(Array.from({ length: 50 }, () => notes.create('x').id))
    expect(ids.size).toBe(50)
  })
})

describe('elenco diviso per cartelle', () => {
  const folder = (id: string, name: string): Folder => ({ id, name, createdAt: 0, updatedAt: 0 })
  const note = (id: string, title: string, folderId: string | null = null): NoteMeta => ({ id, title, createdAt: 0, updatedAt: 0, folderId })
  const folders = [folder('a', 'Analisi 1'), folder('f', 'Fisica 1'), folder('v', 'Vuota')]
  const notes = [
    note('1', 'Limiti', 'a'),
    note('2', 'Derivate', 'a'),
    note('3', 'Moto', 'f'),
    note('4', 'Idee sparse'),
    note('5', 'Cartella sparita', 'x'),
  ]
  const view = (filter = '') => {
    const { groups, loose } = groupByFolder(notes, folders, filter)
    return { groups: groups.map((g) => `${g.folder.name}: ${g.notes.map((n) => n.title).join(', ')}`), loose: loose.map((n) => n.title) }
  }

  it('prima le cartelle, anche vuote, poi le note fuori', () => {
    expect(view()).toEqual({
      groups: ['Analisi 1: Limiti, Derivate', 'Fisica 1: Moto', 'Vuota: '],
      loose: ['Idee sparse', 'Cartella sparita'],
    })
  })

  it('il filtro cerca nei titoli e nei nomi delle cartelle', () => {
    expect(view('deriv')).toEqual({ groups: ['Analisi 1: Derivate'], loose: [] })
    expect(view('fisica')).toEqual({ groups: ['Fisica 1: Moto'], loose: [] })
    expect(view('idee')).toEqual({ groups: [], loose: ['Idee sparse'] })
  })
})
