/**
 * Quanto spazio occupa Glifo in questo browser, per Impostazioni → Dati (GRAFICA.md, punto 3): gli
 * appunti in localStorage, misurati qui, e il totale che dice il browser, con le lavagne (IndexedDB), i
 * modelli di «Spiegami» e i file per usare Glifo senza rete (Cache Storage). Lavagne e modelli si
 * misurano nei loro moduli (src/board/store.ts, src/ai/localModels.ts).
 */
import { numberLocale } from '../i18n'
import { readItem, storageKeys } from './storage'

/**
 * Gli appunti, le cartelle, le impostazioni e il resto che Glifo tiene in localStorage (le chiavi
 * `glifo.*`, anche quelle degli altri account entrati in questo browser): i byte del testo in UTF-8,
 * come in un file.
 */
export function notesBytes(): number {
  const encoder = new TextEncoder()
  let total = 0
  for (const prefix of ['glifo.', 'matherdown.']) {
    for (const key of storageKeys(prefix)) total += encoder.encode(key).length + encoder.encode(readItem(key) ?? '').length
  }
  return total
}

/** Quanto usa Glifo e quanto gli lascia il browser, se lo dice (`navigator.storage.estimate`). */
export async function storageEstimate(): Promise<{ usage: number; quota: number } | null> {
  try {
    const estimate = await navigator.storage?.estimate?.()
    if (typeof estimate?.usage !== 'number') return null
    return { usage: estimate.usage, quota: estimate.quota ?? 0 }
  } catch {
    return null
  }
}

const UNITS: readonly [size: number, unit: string][] = [
  [1e9, 'GB'],
  [1e6, 'MB'],
  [1e3, 'kB'],
]

/**
 * Una grandezza da leggere: «12 kB», «1,2 MB», «2,3 GB» (in inglese con il punto). Una cifra dopo la
 * virgola sotto il 10, nessuna sopra; con multipli di 1000, come le grandezze dei modelli.
 */
export function formatBytes(bytes: number): string {
  for (const [size, unit] of UNITS) {
    const value = bytes / size
    if (value < 1 && unit !== 'kB') continue
    const digits = value < 10 && unit !== 'kB' ? 1 : 0
    const rounded = Number(value.toFixed(digits))
    // 999 600 byte non sono «1000 kB»: si passa all'unità sopra.
    if (rounded >= 1000 && unit !== 'GB') return formatBytes(size * 1000)
    const shown = unit === 'kB' && bytes > 0 ? Math.max(1, rounded) : rounded
    return `${new Intl.NumberFormat(numberLocale(), { maximumFractionDigits: digits }).format(shown)} ${unit}`
  }
  return '0 kB'
}
