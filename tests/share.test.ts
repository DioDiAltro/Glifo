import { describe, expect, it } from 'vitest'
import { accountDataFile } from '../src/account/export'
import type { PullResult } from '../src/account/sync'
import {
  parseLink,
  parseSharedNote,
  readSharedNote,
  sha256Hex,
  ShareReadError,
  shareUrl,
  snapshotWhen,
  tokenFromHash,
  type SharedLink,
} from '../src/share/link'
import { SUPABASE_KEY, SUPABASE_URL } from '../src/account/config'

const TOKEN = 'bzZTjRxTS4yCE_7LcXOtbg'

describe('il link di una nota condivisa', () => {
  it('sta accanto all\'app, con il codice dopo «#»', () => {
    expect(shareUrl(TOKEN, 'https://diodialtro.github.io/Glifo/')).toBe(`https://diodialtro.github.io/Glifo/nota.html#${TOKEN}`)
    expect(shareUrl(TOKEN, 'https://diodialtro.github.io/Glifo/index.html?x=1#y')).toBe(`https://diodialtro.github.io/Glifo/nota.html#${TOKEN}`)
    expect(shareUrl(TOKEN, 'http://localhost:4173/')).toBe(`http://localhost:4173/nota.html#${TOKEN}`)
  })

  it('il codice si legge dopo «#», solo se è fatto bene', () => {
    expect(tokenFromHash(`#${TOKEN}`)).toBe(TOKEN)
    expect(tokenFromHash(`#${TOKEN}%20`)).toBe(TOKEN)
    expect(tokenFromHash(`#  ${TOKEN}\n`)).toBe(TOKEN)
    expect(tokenFromHash('')).toBeNull()
    expect(tokenFromHash('#')).toBeNull()
    expect(tokenFromHash(`#${TOKEN.slice(1)}`)).toBeNull()
    expect(tokenFromHash(`#${TOKEN}x`)).toBeNull()
    expect(tokenFromHash('#code=abc')).toBeNull()
    expect(tokenFromHash('#%E0%A4%A')).toBeNull()
  })

  it('legge il link e la nota come arrivano dal database', () => {
    expect(
      parseLink({
        token: TOKEN,
        note_id: 'n1',
        title: 'Limiti',
        allow_copy: false,
        created_at: '2026-10-04T08:00:00Z',
        updated_at: '2026-10-04T09:00:00Z',
        content_hash: 'abc',
      }),
    ).toEqual({ token: TOKEN, noteId: 'n1', title: 'Limiti', allowCopy: false, createdAt: Date.parse('2026-10-04T08:00:00Z'), updatedAt: Date.parse('2026-10-04T09:00:00Z'), contentHash: 'abc' })
    expect(parseLink(null)).toBeNull()
    expect(parseLink({ token: TOKEN })).toBeNull()
    expect(parseSharedNote({ title: 'Limiti', content: '# Limiti', allow_copy: true, updated_at: '2026-10-04T09:00:00Z' })).toEqual({
      title: 'Limiti',
      content: '# Limiti',
      allowCopy: true,
      updatedAt: Date.parse('2026-10-04T09:00:00Z'),
    })
    expect(parseSharedNote(null)).toBeNull()
    expect(parseSharedNote({ title: 'senza testo' })).toBeNull()
  })

  it('SHA-256 come content_hash del database (sui byte UTF-8 del testo)', async () => {
    expect(await sha256Hex('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
    // I tipi di Node non ci sono nei test: il modulo si importa con un nome composto al momento.
    const nodeCrypto = (await import(/* @vite-ignore */ ['node', 'crypto'].join(':'))) as {
      createHash(algorithm: string): { update(text: string, encoding: string): { digest(encoding: string): string } }
    }
    const text = '# Limiti\n\nè $\\int x^2 \\, dx$ ∮'
    expect(await sha256Hex(text)).toBe(nodeCrypto.createHash('sha256').update(text, 'utf8').digest('hex'))
  })

  it('dice quando è stata fatta la fotografia', () => {
    const now = new Date(2026, 9, 4, 15, 0)
    expect(snapshotWhen(new Date(2026, 9, 4, 9, 5).getTime(), now)).toBe('di oggi alle 09:05')
    expect(snapshotWhen(new Date(2026, 9, 3, 21, 30).getTime(), now)).toBe('di ieri alle 21:30')
    expect(snapshotWhen(new Date(2026, 8, 3, 12, 0).getTime(), now)).toBe('del 3 settembre')
    expect(snapshotWhen(new Date(2026, 8, 1, 12, 0).getTime(), now)).toBe('dell\'1 settembre')
    expect(snapshotWhen(new Date(2026, 8, 8, 12, 0).getTime(), now)).toBe('dell\'8 settembre')
    expect(snapshotWhen(new Date(2026, 8, 11, 12, 0).getTime(), now)).toBe('dell\'11 settembre')
    expect(snapshotWhen(new Date(2025, 11, 18, 12, 0).getTime(), now)).toBe('del 18 dicembre 2025')
  })
})

describe('aprire una nota condivisa (anche senza account)', () => {
  function fakeFetch(respond: () => Response | Promise<Response>) {
    const calls: { url: string; init: RequestInit }[] = []
    const impl = (async (url: string, init: RequestInit) => {
      calls.push({ url, init })
      return respond()
    }) as unknown as typeof fetch
    return { impl, calls }
  }

  it('chiede la nota con la sola chiave pubblica, senza l\'accesso salvato', async () => {
    const f = fakeFetch(() => Response.json({ title: 'Limiti', content: '# Limiti', allow_copy: false, updated_at: '2026-10-04T09:00:00Z' }))
    const note = await readSharedNote(TOKEN, f.impl)
    expect(note).toEqual({ title: 'Limiti', content: '# Limiti', allowCopy: false, updatedAt: Date.parse('2026-10-04T09:00:00Z') })
    expect(f.calls).toHaveLength(1)
    expect(f.calls[0].url).toBe(`${SUPABASE_URL}/rest/v1/rpc/shared_note`)
    expect(f.calls[0].init.method).toBe('POST')
    expect(f.calls[0].init.headers).toEqual({ apikey: SUPABASE_KEY, 'Content-Type': 'application/json' })
    expect(JSON.parse(String(f.calls[0].init.body))).toEqual({ token: TOKEN })
  })

  it('un link tolto dà null; senza rete o con un errore del server, un errore da mostrare', async () => {
    expect(await readSharedNote(TOKEN, fakeFetch(() => Response.json(null)).impl)).toBeNull()
    await expect(readSharedNote(TOKEN, fakeFetch(() => Promise.reject(new TypeError('Failed to fetch'))).impl)).rejects.toMatchObject({
      kind: 'offline',
    })
    const failed = readSharedNote(TOKEN, fakeFetch(() => new Response('{}', { status: 500 })).impl)
    await expect(failed).rejects.toBeInstanceOf(ShareReadError)
    await expect(failed).rejects.toMatchObject({ kind: 'server' })
  })
})

describe('«Scarica i miei dati» con i link', () => {
  const data: PullResult = { cursor: '1', folders: [], notes: [], settings: null }
  const link: SharedLink = {
    token: TOKEN,
    noteId: 'n1',
    title: 'Limiti',
    allowCopy: true,
    createdAt: Date.parse('2026-10-04T08:00:00Z'),
    updatedAt: Date.parse('2026-10-04T09:00:00Z'),
    contentHash: 'abc',
  }

  it('ci sono i link, scritti per intero', () => {
    const file = JSON.parse(accountDataFile(data, { userId: 'u1', email: 'anna@example.com' }, undefined, new Date('2026-10-04T10:00:00Z'), [link], 'https://diodialtro.github.io/Glifo/'))
    expect(file.sharedLinks).toEqual([
      { noteId: 'n1', title: 'Limiti', link: `https://diodialtro.github.io/Glifo/nota.html#${TOKEN}`, allowCopy: true, createdAt: link.createdAt, updatedAt: link.updatedAt },
    ])
  })

  it('senza link, l\'elenco è vuoto', () => {
    expect(JSON.parse(accountDataFile(data, { userId: 'u1', email: 'anna@example.com' })).sharedLinks).toEqual([])
  })
})
