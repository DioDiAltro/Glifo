/**
 * Piccolo involucro attorno a localStorage: se il browser lo blocca
 * (navigazione privata, anteprime…) l'app continua a funzionare in memoria.
 */
const memory = new Map<string, string>()
let available: boolean | null = null

function hasLocalStorage(): boolean {
  if (available !== null) return available
  try {
    const k = '__matherdown_test__'
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
