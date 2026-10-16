import { afterEach, describe, expect, it, vi } from 'vitest'
import { ENGINE_BYTES, READER_DOWNLOAD, READER_FILES, readerFileUrl, type FromReader, type ToReader } from '../src/ai/formulaModel'
import { FormulaReader, readerBytes, readerInBrowser, removeReader, type WorkerLike } from '../src/ai/formulaReader'

afterEach(() => vi.unstubAllGlobals())

/** Una Cache Storage finta con il lettore: i file di `urls` (gli indirizzi completi). */
function readerCache(urls: string[]) {
  const deleted: string[] = []
  const cache = { match: async (url: string) => (urls.includes(url) ? new Response('') : undefined), keys: async () => urls.map((url) => ({ url })) }
  vi.stubGlobal('caches', {
    has: async (name: string) => name === 'glifo-lettore' && !deleted.length,
    open: async () => cache,
    delete: async (name: string) => deleted.push(name) > 0,
  })
  return deleted
}

/** Un worker finto che risponde come src/ai/formulaWorker.ts. */
function fakeWorker() {
  const listeners: ((ev: { data: FromReader }) => void)[] = []
  const sent: ToReader[] = []
  const worker = {
    terminated: false,
    sent,
    postMessage(msg: ToReader) {
      sent.push(msg)
      const answer = (data: FromReader) => queueMicrotask(() => listeners.forEach((l) => l({ data })))
      if (msg.type === 'load') {
        answer({ id: msg.id, type: 'progress', loaded: 50, total: 100 })
        answer({ id: msg.id, type: 'done' })
      } else if (msg.pixels.length === 1) answer({ id: msg.id, type: 'done', text: 'x ^ { 2 }', ms: 900 })
    },
    addEventListener(type: string, fn: (ev: { data: FromReader }) => void) {
      if (type === 'message') listeners.push(fn)
    },
    terminate() {
      worker.terminated = true
    },
  }
  return worker
}

const hubFiles = READER_FILES.map((f) => readerFileUrl(f.name))

describe('il lettore della lavagna nel browser', () => {
  it('quanto pesa: le misure note dei file nella sua cache (0 se non c\'è)', async () => {
    readerCache([...hubFiles, 'https://glifo.page/assets/ort-wasm-simd-threaded-x.wasm'])
    expect(await readerBytes()).toBe(READER_DOWNLOAD)
    readerCache([hubFiles[0], hubFiles[1]])
    expect(await readerBytes()).toBe(READER_FILES[0].bytes + READER_FILES[1].bytes)
    readerCache([])
    expect(await readerBytes()).toBe(0)
    vi.stubGlobal('caches', undefined)
    expect(await readerBytes()).toBe(0)
    expect(ENGINE_BYTES).toBe(READER_DOWNLOAD - READER_FILES.reduce((n, f) => n + f.bytes, 0))
  })

  it('è tutto nel browser solo con il modello e la libreria', async () => {
    vi.stubGlobal('location', { href: 'https://glifo.page/' })
    const engine = async () => {
      const urls: string[] = []
      vi.stubGlobal('caches', { has: async () => true, open: async () => ({ match: async (url: string) => (urls.push(url), undefined) }) })
      await readerInBrowser()
      return urls[0]
    }
    const engineUrl = await engine()
    expect(engineUrl).toMatch(/^https:\/\/glifo\.page\/.*ort-wasm-simd-threaded.*\.wasm$/)
    readerCache([...hubFiles, engineUrl])
    expect(await readerInBrowser()).toBe(true)
    readerCache(hubFiles)
    expect(await readerInBrowser()).toBe(false)
  })

  it('«Togli» svuota la cache del lettore', async () => {
    const deleted = readerCache(hubFiles)
    await removeReader()
    expect(deleted).toEqual(['glifo-lettore'])
    expect(await readerBytes()).toBe(0)
  })

  it('carica una volta, legge, e fermato rifiuta quello che aspettava', async () => {
    const worker = fakeWorker()
    const reader = new FormulaReader(() => worker as unknown as WorkerLike)
    const seen: number[] = []
    await reader.load((p) => seen.push(p.loaded / p.total))
    expect(reader.ready).toBe(true)
    expect(seen).toEqual([0.5])
    await reader.load()
    expect(worker.sent.filter((m) => m.type === 'load')).toHaveLength(1)
    expect(await reader.read(new Float32Array(1))).toEqual({ text: 'x ^ { 2 }', ms: 900 })
    // Una lettura che non finisce (il worker finto non risponde) e intanto il lettore si toglie.
    const waiting = reader.read(new Float32Array(2))
    reader.stop()
    await expect(waiting).rejects.toThrow('Il lettore è stato tolto da questo browser.')
    expect(worker.terminated).toBe(true)
    expect(reader.ready).toBe(false)
  })
})
