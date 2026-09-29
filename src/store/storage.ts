/**
 * Piccolo involucro attorno a localStorage: se il browser lo blocca
 * (navigazione privata, anteprime…) l'app continua a funzionare in memoria.
 */
const memory = new Map<string, string>()
let available: boolean | null = null

function hasLocalStorage(): boolean {
  if (available !== null) return available
  try {
    const k = '__glifo_test__'
    localStorage.setItem(k, '1')
    localStorage.removeItem(k)
    available = true
  } catch {
    available = false
  }
  return available
}

export function storageAvailable(): boolean {
  return hasLocalStorage()
}

export function readItem(key: string): string | null {
  if (hasLocalStorage()) {
    try {
      return localStorage.getItem(key)
    } catch {
      /* continua con la memoria */
    }
  }
  return memory.get(key) ?? null
}

/** Restituisce false se non è stato possibile salvare (es. spazio esaurito). */
export function writeItem(key: string, value: string): boolean {
  memory.set(key, value)
  if (!hasLocalStorage()) return false
  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

export function removeItem(key: string): void {
  memory.delete(key)
  if (!hasLocalStorage()) return
  try {
    localStorage.removeItem(key)
  } catch {
    /* niente da fare */
  }
}

export function readJson<T>(key: string, fallback: T): T {
  const raw = readItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJson(key: string, value: unknown): boolean {
  return writeItem(key, JSON.stringify(value))
}

/**
 * Il progetto prima si chiamava "Matherdown": sposta i dati salvati con le
 * vecchie chiavi sotto quelle nuove, così nessun appunto va perso dopo il
 * cambio di nome. Va chiamata all'avvio, prima di leggere note e impostazioni.
 */
export function migrateKeyPrefix(oldPrefix: string, newPrefix: string): void {
  if (!hasLocalStorage()) return
  try {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k?.startsWith(oldPrefix)) keys.push(k)
    }
    for (const k of keys) {
      const target = newPrefix + k.slice(oldPrefix.length)
      const value = localStorage.getItem(k)
      if (value !== null && localStorage.getItem(target) === null) localStorage.setItem(target, value)
    }
    // Si cancella solo dopo aver copiato tutto: se lo spazio finisce a metà,
    // i vecchi dati restano e la copia riprende al prossimo avvio.
    for (const k of keys) localStorage.removeItem(k)
  } catch {
    /* i vecchi dati restano dove sono */
  }
}
