// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { migrateKeyPrefix } from '../src/store/storage'
import { addPersonalWord, loadPersonalWords, savePersonalWords } from '../src/store/dictionary'
import { loadSettings, saveSettings, sharedSettings } from '../src/store/settings'

beforeEach(() => localStorage.clear())

describe('cambio di nome (Matherdown → Glifo)', () => {
  it('sposta note e impostazioni sulle nuove chiavi', () => {
    localStorage.setItem('matherdown.notes.v1', '[{"id":"a"}]')
    localStorage.setItem('matherdown.note.v1.a', '# Analisi 1')
    localStorage.setItem('matherdown.settings.v1', '{"theme":"dark"}')
    localStorage.setItem('altro', 'resta')

    migrateKeyPrefix('matherdown.', 'glifo.')

    expect(localStorage.getItem('glifo.notes.v1')).toBe('[{"id":"a"}]')
    expect(localStorage.getItem('glifo.note.v1.a')).toBe('# Analisi 1')
    expect(localStorage.getItem('glifo.settings.v1')).toBe('{"theme":"dark"}')
    expect(localStorage.getItem('matherdown.notes.v1')).toBeNull()
    expect(localStorage.getItem('altro')).toBe('resta')
  })

  it('non sovrascrive dati già presenti con il nuovo nome', () => {
    localStorage.setItem('glifo.settings.v1', '{"theme":"light"}')
    localStorage.setItem('matherdown.settings.v1', '{"theme":"dark"}')
    migrateKeyPrefix('matherdown.', 'glifo.')
    expect(localStorage.getItem('glifo.settings.v1')).toBe('{"theme":"light"}')
  })

  it('senza vecchi dati non fa nulla', () => {
    migrateKeyPrefix('matherdown.', 'glifo.')
    expect(localStorage.length).toBe(0)
  })
})

describe('dizionario personale', () => {
  it('salva le parole ripulite, senza doppioni e in ordine', () => {
    expect(savePersonalWords([' zeta ', 'Alfa', 'alfa', '', 'due parole', 'beta'])).toEqual(['Alfa', 'beta', 'zeta'])
    expect(loadPersonalWords()).toEqual(['Alfa', 'beta', 'zeta'])
    expect(addPersonalWord('Cauchy')).toEqual(['Alfa', 'beta', 'Cauchy', 'zeta'])
  })

  it('ignora dati salvati male', () => {
    localStorage.setItem('glifo.dictionary.v1', '{"non":"una lista"}')
    expect(loadPersonalWords()).toEqual([])
  })
})

describe('impostazioni con Glifo aperto in due schede', () => {
  it('ogni scheda salva solo quello che ha cambiato', () => {
    const schedaB = loadSettings()
    saveSettings({ theme: 'dark', apiKey: 'chiave' }) // cambiate nella scheda A
    saveSettings({ notesOpen: !schedaB.notesOpen }) // la scheda B chiude l'elenco
    expect(loadSettings()).toMatchObject({ theme: 'dark', apiKey: 'chiave', notesOpen: false })
  })

  it('dalle altre schede arrivano tema e correttore, non la vista né i pannelli', () => {
    const shared = sharedSettings({ ...loadSettings(), theme: 'dark', view: 'preview', notesOpen: false })
    expect(shared.theme).toBe('dark')
    expect(Object.keys(shared).filter((k) => ['view', 'notesOpen', 'symbolsOpen'].includes(k))).toEqual([])
  })

  it('impostazioni salvate male non bloccano l\'avvio', () => {
    localStorage.setItem('glifo.settings.v1', '"testo"')
    expect(loadSettings().theme).toBe('auto')
  })
})
