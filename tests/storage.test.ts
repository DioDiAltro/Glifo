// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { migrateKeyPrefix } from '../src/store/storage'

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
