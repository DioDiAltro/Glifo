import { readJson, writeJson } from './storage'

/** Parole che lo studente ha aggiunto al dizionario del controllo ortografico. */
const KEY = 'glifo.dictionary.v1'

/** Una parola per voce, senza spazi ai lati, senza doppioni, in ordine alfabetico. */
function tidy(words: string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const raw of words) {
    const word = raw.normalize('NFC').trim()
    const key = word.toLocaleLowerCase('it')
    if (!word || /\s/.test(word) || seen.has(key)) continue
    seen.add(key)
    out.push(word)
  }
  return out.sort((a, b) => a.localeCompare(b, 'it', { sensitivity: 'base' }))
}

export function loadPersonalWords(): string[] {
  const words = readJson<unknown>(KEY, [])
  return Array.isArray(words) ? tidy(words.filter((w): w is string => typeof w === 'string')) : []
}

/** Salva l'elenco e restituisce la versione ripulita. */
export function savePersonalWords(words: string[]): string[] {
  const clean = tidy(words)
  writeJson(KEY, clean)
  return clean
}

export function addPersonalWord(word: string): string[] {
  return savePersonalWords([...loadPersonalWords(), word])
}
