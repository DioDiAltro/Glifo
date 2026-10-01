import { describe, expect, it } from 'vitest'
import { accountDataFile } from '../src/account/export'
import type { PullResult } from '../src/account/sync'

const row = { created_at: '2026-09-01T08:00:00Z', updated_at: '2026-09-02T09:30:00Z', deleted_at: null, revision: 1 }

const data: PullResult = {
  cursor: '42',
  folders: [
    { ...row, id: 'f1', name: 'Analisi 1' },
    { ...row, id: 'f2', name: '', deleted_at: '2026-09-03T00:00:00Z' },
  ],
  notes: [
    { ...row, id: 'n1', folder_id: 'f1', title: 'Limiti', content: '# Limiti\n\n$\\lim_{x \\to 0}$' },
    { ...row, id: 'n2', folder_id: null, title: '', content: '', deleted_at: '2026-09-03T00:00:00Z' },
  ],
  settings: { settings: { theme: 'dark', fontSize: 17 }, dictionary: ['Lagrangiana'], updated_at: row.updated_at, revision: 3 },
}

describe('«Scarica i miei dati»', () => {
  const login = { providers: ['email', 'google'], profile: { full_name: 'Anna Rossi', avatar_url: 'https://example.com/anna.png' } }
  const file = JSON.parse(accountDataFile(data, { userId: 'u1', email: 'anna@example.com' }, login, new Date('2026-09-30T20:00:00Z')))

  it('ha l\'account, le note e le cartelle, senza quelle eliminate', () => {
    expect(file.account).toEqual({ id: 'u1', email: 'anna@example.com', ...login })
    expect(file.exportedAt).toBe('2026-09-30T20:00:00.000Z')
    expect(file.notes).toEqual([
      { id: 'n1', title: 'Limiti', createdAt: Date.parse(row.created_at), updatedAt: Date.parse(row.updated_at), folderId: 'f1', content: '# Limiti\n\n$\\lim_{x \\to 0}$' },
    ])
    expect(file.folders).toEqual([{ id: 'f1', name: 'Analisi 1', createdAt: Date.parse(row.created_at), updatedAt: Date.parse(row.updated_at) }])
  })

  it('ha impostazioni e dizionario dell\'account', () => {
    expect(file.settings).toEqual({ theme: 'dark', fontSize: 17 })
    expect(file.dictionary).toEqual(['Lagrangiana'])
  })

  it('ha la forma del backup, così «Ripristina backup» lo rilegge', () => {
    expect(file).toMatchObject({ app: 'glifo', version: 1 })
    for (const note of file.notes) expect(typeof note.content).toBe('string')
    expect(file.folders.map((f: { id: string }) => f.id)).toContain(file.notes[0].folderId)
  })

  it('funziona anche con un account appena creato, senza impostazioni', () => {
    const empty = JSON.parse(accountDataFile({ cursor: '1', folders: [], notes: [], settings: null }, { userId: 'u2', email: 'b@example.com' }))
    expect(empty).toMatchObject({ account: { providers: [], profile: {} }, notes: [], folders: [], settings: {}, dictionary: [] })
  })
})
