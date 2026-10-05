// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { accountSpace, adoptGuestNotes, currentAccount, forgetAccount, guestNoteCount, knowsAccount, setCurrentAccount } from '../src/account/space'
import { FoldersStore } from '../src/store/folders'
import { isUuid } from '../src/store/ids'
import { NotesStore } from '../src/store/notes'
import { validAccountSettings } from '../src/store/settings'

beforeEach(() => localStorage.clear())
afterEach(() => vi.useRealTimers())

const WELCOME = '# Benvenuto in Glifo\n\nnota di benvenuto'

describe('portare gli appunti di questo browser nell\'account', () => {
  it('sposta note e cartelle, con le loro date, e lascia la nota di benvenuto mai toccata', () => {
    const guest = new NotesStore()
    const guestFolders = new FoldersStore()
    guest.create(WELCOME)
    const analisi = guestFolders.create('Analisi 1')!
    const limiti = guest.create('# Limiti', analisi.id)
    const idee = guest.create('# Idee')
    guest.activeId = limiti.id
    expect(guestNoteCount(WELCOME)).toBe(2)

    expect(adoptGuestNotes('u1', WELCOME)).toBe(2)
    const { notes, folders } = accountSpace('u1')
    expect(notes.list().map((n) => n.title).sort()).toEqual(['Idee', 'Limiti'])
    const folder = folders.list()[0]
    expect(folder).toMatchObject({ name: 'Analisi 1', dirty: true })
    expect(notes.get(limiti.id)).toMatchObject({ folderId: folder.id, createdAt: limiti.createdAt, dirty: true })
    expect(notes.get(idee.id)?.folderId).toBeNull()
    expect(notes.activeId).toBe(limiti.id)

    // Fuori dall'account resta solo la nota di benvenuto.
    expect(new NotesStore().list().map((n) => n.title)).toEqual(['Benvenuto in Glifo'])
    expect(new FoldersStore().list()).toEqual([])
    expect(guestNoteCount(WELCOME)).toBe(0)
  })

  it('anche la nota di benvenuto di una versione precedente, mai toccata, resta fuori', () => {
    const guest = new NotesStore()
    guest.create('# Benvenuto in Glifo\n\nil testo di una volta')
    const toccata = guest.create('# Benvenuto in Glifo\n\nil testo di una volta')
    vi.setSystemTime(Date.now() + 60_000)
    guest.save(toccata.id, '# Benvenuto in Glifo\n\nci ho scritto i miei appunti')
    expect(guestNoteCount(WELCOME)).toBe(1)
    expect(adoptGuestNotes('u1', WELCOME)).toBe(1)
    expect(accountSpace('u1').notes.get(toccata.id)?.content).toContain('i miei appunti')
  })

  it('le note create prima delle cartelle ricevono un id nuovo (UUID)', () => {
    const vecchioId = Date.UTC(2026, 3, 1).toString(36) + 'abcd1234'
    localStorage.setItem('glifo.note.v1.' + vecchioId, '# Nota di aprile')
    new NotesStore().activeId = vecchioId
    const nuova = new NotesStore().create('# Nota di oggi')
    const renamed: [string, string][] = []
    adoptGuestNotes('u1', WELCOME, (from, to) => renamed.push([from, to]))
    const { notes } = accountSpace('u1')
    const nota = notes.list().find((n) => n.title === 'Nota di aprile')!
    expect(isUuid(nota.id)).toBe(true)
    expect(notes.activeId).toBe(nota.id)
    // Lo sa chi tiene le lavagne, che vanno con la nota; quella con un UUID resta com'è.
    expect(renamed).toEqual([[vecchioId, nota.id]])
    expect(notes.get(nuova.id)?.title).toBe('Nota di oggi')
  })

  it('una cartella con lo stesso nome di una dell\'account diventa quella', () => {
    const { folders } = accountSpace('u1')
    const esistente = folders.create('Fisica 1')!
    const guestFolders = new FoldersStore()
    const guest = new NotesStore()
    const moto = guest.create('# Moto', guestFolders.create('fisica 1')!.id)
    adoptGuestNotes('u1', WELCOME)
    const account = accountSpace('u1')
    expect(account.folders.list().map((f) => f.id)).toEqual([esistente.id])
    expect(account.notes.get(moto.id)?.folderId).toBe(esistente.id)
  })
})

describe('account in questo browser', () => {
  it('ricorda con quale account si è entrati', () => {
    expect(currentAccount()).toBeNull()
    setCurrentAccount({ userId: 'u1', email: 'anna@example.com' })
    expect(currentAccount()).toEqual({ userId: 'u1', email: 'anna@example.com' })
    localStorage.setItem('glifo.account.v1', '{"userId": 3}')
    expect(currentAccount()).toBeNull()
    setCurrentAccount(null)
    expect(localStorage.getItem('glifo.account.v1')).toBeNull()
  })

  it('uscendo si tolgono solo le note di quell\'account', () => {
    new NotesStore().create('# Senza account')
    accountSpace('u1').notes.create('# Di Anna')
    accountSpace('u2').notes.create('# Di Bruno')
    expect(knowsAccount('u1')).toBe(true)
    forgetAccount('u1')
    expect(knowsAccount('u1')).toBe(false)
    expect(accountSpace('u1').notes.list()).toEqual([])
    expect(accountSpace('u2').notes.list().map((n) => n.title)).toEqual(['Di Bruno'])
    expect(new NotesStore().list().map((n) => n.title)).toEqual(['Senza account'])
  })
})

describe('impostazioni arrivate dall\'account', () => {
  it('si prendono solo i valori validi', () => {
    expect(
      validAccountSettings({ theme: 'dark', fontSize: 40, spellLanguages: 'it', model: 'boh', apiKey: 'sk-ant-x', autoWrap: 'sì', spellcheck: false }),
    ).toEqual({ theme: 'dark', spellLanguages: 'it', spellcheck: false })
  })
})
