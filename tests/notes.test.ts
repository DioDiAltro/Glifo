// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NotesStore } from '../src/store/notes'

beforeEach(() => localStorage.clear())
afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

const titles = (store: NotesStore) => store.list().map((n) => n.title).sort()

describe('Glifo aperto in due schede', () => {
  it('una nota creata in una scheda non sparisce quando l\'altra salva', () => {
    const uno = new NotesStore().create('# Uno')
    const schedaA = new NotesStore()
    const schedaB = new NotesStore()
    schedaA.create('# Due')
    schedaB.save(uno.id, '# Uno modificato')
    expect(titles(new NotesStore())).toEqual(['Due', 'Uno modificato'])
    expect(titles(schedaB)).toEqual(['Due', 'Uno modificato'])
  })

  it('una nota eliminata in una scheda non ricompare quando l\'altra salva', () => {
    const first = new NotesStore()
    const uno = first.create('# Uno')
    const due = first.create('# Due')
    const schedaA = new NotesStore()
    const schedaB = new NotesStore()
    schedaA.remove(due.id)
    schedaB.save(uno.id, '# Uno modificato')
    expect(titles(new NotesStore())).toEqual(['Uno modificato'])
  })

  it('reload vede le modifiche fatte nell\'altra scheda', () => {
    const schedaA = new NotesStore()
    const schedaB = new NotesStore()
    const nota = schedaA.create('# Nuova')
    expect(schedaB.get(nota.id)).toBeNull()
    expect(schedaB.reload()).toBe(0)
    expect(schedaB.get(nota.id)?.content).toBe('# Nuova')
    schedaA.remove(nota.id)
    schedaB.reload()
    expect(schedaB.list()).toEqual([])
  })

  it('se la nota era stata eliminata altrove, salvarla la rimette nell\'elenco', () => {
    const schedaA = new NotesStore()
    const nota = schedaA.create('# Appunti')
    const schedaB = new NotesStore()
    schedaA.remove(nota.id)
    expect(schedaB.save(nota.id, '# Appunti\n\ntesto scritto intanto')).toBe(true)
    const riaperta = new NotesStore().get(nota.id)
    expect(riaperta?.content).toBe('# Appunti\n\ntesto scritto intanto')
    expect(riaperta?.createdAt).toBe(nota.createdAt)
  })
})

describe('note rimaste fuori dall\'elenco', () => {
  it('all\'avvio tornano nell\'elenco, in cima', () => {
    vi.setSystemTime(Date.UTC(2026, 8, 10))
    const vecchia = new NotesStore().create('# Vecchia')
    // Come dopo il problema delle due schede: il testo c'è, la voce nell'elenco no.
    const id = Date.UTC(2026, 8, 1).toString(36) + 'abc123'
    localStorage.setItem('glifo.note.v1.' + id, '# Persa\n\ntesto')
    vi.setSystemTime(Date.UTC(2026, 8, 20))
    const store = new NotesStore()
    expect(store.recovered).toBe(1)
    expect(store.list()[0]).toMatchObject({ id, title: 'Persa', createdAt: Date.UTC(2026, 8, 1), updatedAt: Date.UTC(2026, 8, 20) })
    expect(store.get(id)?.content).toBe('# Persa\n\ntesto')
    expect(store.get(vecchia.id)?.content).toBe('# Vecchia')
    // Il recupero resta salvato: al riavvio non c'è più niente da recuperare.
    expect(new NotesStore().recovered).toBe(0)
  })

  it('le voci senza testo spariscono anche dall\'elenco salvato', () => {
    localStorage.setItem('glifo.notes.v1', JSON.stringify([{ id: 'x', title: 'Fantasma', createdAt: 1, updatedAt: 1 }]))
    const store = new NotesStore()
    expect(store.list()).toEqual([])
    expect(localStorage.getItem('glifo.notes.v1')).toBe('[]')
  })

  it('un elenco salvato male non blocca l\'avvio', () => {
    localStorage.setItem('glifo.notes.v1', '{"non":"un elenco"}')
    localStorage.setItem('glifo.note.v1.abc', 'testo')
    const store = new NotesStore()
    expect(store.list().map((n) => n.id)).toEqual(['abc'])
  })
})

describe('chiavi delle note', () => {
  it('riconosce elenco e testi delle note', () => {
    const store = new NotesStore()
    expect(store.ownsKey('glifo.notes.v1')).toBe(true)
    expect(store.ownsKey('glifo.note.v1.abc')).toBe(true)
    expect(store.ownsKey('glifo.settings.v1')).toBe(false)
    expect(store.noteIdOfKey('glifo.note.v1.abc')).toBe('abc')
    expect(store.noteIdOfKey('glifo.notes.v1')).toBeNull()
  })

  it('le note di un account stanno a parte da quelle senza account', () => {
    const ospite = new NotesStore()
    const account = new NotesStore({ space: 'u.123.' })
    ospite.create('# Di questo browser')
    const nota = account.create('# Dell\'account')
    expect(new NotesStore().list().map((n) => n.title)).toEqual(['Di questo browser'])
    expect(new NotesStore({ space: 'u.123.' }).list().map((n) => n.title)).toEqual(['Dell\'account'])
    expect(account.ownsKey(`glifo.u.123.note.v1.${nota.id}`)).toBe(true)
    expect(ospite.ownsKey(`glifo.u.123.note.v1.${nota.id}`)).toBe(false)
    expect(account.ownsKey('glifo.note.v1.abc')).toBe(false)
  })
})

describe('spazio del browser esaurito', () => {
  it('la nota nuova resta nell\'elenco di questa scheda, e il salvataggio segnala l\'errore', () => {
    const store = new NotesStore()
    const prima = store.create('# Prima')
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Spazio esaurito', 'QuotaExceededError')
    })
    const seconda = store.create('# Seconda')
    expect(store.save(prima.id, '# Prima modificata')).toBe(false)
    expect(titles(store)).toEqual(['Prima modificata', 'Seconda'])
    expect(store.get(seconda.id)?.content).toBe('# Seconda')
  })
})
