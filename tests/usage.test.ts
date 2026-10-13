// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { setLangForTests } from '../src/i18n'
import { formatBytes, notesBytes, storageEstimate } from '../src/store/usage'

afterEach(() => {
  localStorage.clear()
  setLangForTests('it')
  vi.unstubAllGlobals()
})

describe('lo spazio in questo browser (Impostazioni → Dati)', () => {
  it('le grandezze in kB, MB e GB, con la virgola in italiano e il punto in inglese', () => {
    expect(formatBytes(0)).toBe('0 kB')
    expect(formatBytes(80)).toBe('1 kB')
    expect(formatBytes(12_345)).toBe('12 kB')
    // 999 600 byte non sono «1000 kB».
    expect(formatBytes(999_600)).toBe('1 MB')
    expect(formatBytes(1_234_567)).toBe('1,2 MB')
    expect(formatBytes(45_600_000)).toBe('46 MB')
    expect(formatBytes(2_300_000_000)).toBe('2,3 GB')
    setLangForTests('en')
    expect(formatBytes(2_300_000_000)).toBe('2.3 GB')
    expect(formatBytes(1_234_567)).toBe('1.2 MB')
  })

  it('gli appunti sono le chiavi glifo.* di localStorage, contate in byte come in un file', () => {
    localStorage.setItem('glifo.note.v1.a', 'è')
    localStorage.setItem('altro', 'questa non è di Glifo')
    // «glifo.note.v1.a» sono 15 byte, «è» 2.
    expect(notesBytes()).toBe(17)
  })

  it('il totale lo dice il browser, quando lo sa', async () => {
    expect(await storageEstimate()).toBeNull()
    vi.stubGlobal('navigator', { storage: { estimate: async () => ({ usage: 1000, quota: 5000 }) } })
    expect(await storageEstimate()).toEqual({ usage: 1000, quota: 5000 })
    vi.stubGlobal('navigator', { storage: { estimate: async () => Promise.reject(new Error('no')) } })
    expect(await storageEstimate()).toBeNull()
  })
})
