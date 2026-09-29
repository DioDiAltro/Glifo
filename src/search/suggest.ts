import { SYMBOLS, commandNames, type SymbolEntry } from '../symbols'
import { normalizeText } from './normalize'

export type MatchKind = 'exact' | 'prefix' | 'keyword' | 'contains' | 'fuzzy' | 'popular'

export interface Suggestion {
  entry: SymbolEntry
  score: number
  kind: MatchKind
}

interface SuggestIndex {
  entry: SymbolEntry
  names: string[]
  /** Parole chiave normalizzate e anche "incollate" (per ogni → perogni). */
  keys: string[]
}

let index: SuggestIndex[] | null = null

function getIndex(): SuggestIndex[] {
  return (index ??= SYMBOLS.map((entry) => {
    const keys = new Set<string>()
    for (const k of [entry.name, ...entry.keywords]) {
      const n = normalizeText(k)
      if (!n) continue
      keys.add(n.replace(/ /g, ''))
      for (const w of n.split(' ')) if (w.length >= 3) keys.add(w)
    }
    return { entry, names: commandNames(entry), keys: [...keys] }
  }))
}

function isSubsequence(needle: string, hay: string): boolean {
  let i = 0
  for (const ch of hay) if (ch === needle[i]) i++
  return i === needle.length
}

/**
 * Suggerimenti per il comando che si sta scrivendo dopo `\`.
 * Esempio: `su` → \sum, \sup, \subset…; funziona anche con parole
 * italiane (`\infinito` → \infty, `\radice` → \sqrt).
 */
export function suggestCommands(prefix: string, limit = 40): Suggestion[] {
  const items = getIndex()
  if (!prefix) {
    return items
      .filter((it) => it.entry.weight >= 8 && it.entry.cmd.startsWith('\\'))
      .map((it) => ({ entry: it.entry, score: it.entry.weight, kind: 'popular' as const }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }

  const lower = prefix.toLowerCase()
  const norm = normalizeText(prefix)
  const out: Suggestion[] = []
  for (const it of items) {
    const w = it.entry.weight
    const acc: { best: Suggestion | null } = { best: null }
    const consider = (score: number, kind: MatchKind) => {
      if (!acc.best || score > acc.best.score) acc.best = { entry: it.entry, score, kind }
    }
    it.names.forEach((name, i) => {
      // I nomi alternativi (es. \rvert per il valore assoluto) contano un po' meno.
      const alias = i > 0 ? 15 : 0
      if (name === prefix) consider(1000 + w - alias, 'exact')
      else if (name.startsWith(prefix)) consider(600 + w * 5 - (name.length - prefix.length) * 2 - alias, 'prefix')
      else if (name.toLowerCase().startsWith(lower)) consider(520 + w * 5 - (name.length - prefix.length) * 2 - alias, 'prefix')
      else if (prefix.length >= 2 && name.toLowerCase().includes(lower)) consider(200 + w * 3 - alias, 'contains')
      else if (prefix.length >= 4 && isSubsequence(lower, name.toLowerCase())) consider(80 + w - alias, 'fuzzy')
    })
    if (norm.length >= 3) {
      for (const k of it.keys) {
        if (k === norm) consider(420 + w * 3, 'keyword')
        else if (k.startsWith(norm)) consider(320 + w * 3, 'keyword')
      }
    }
    if (acc.best) out.push(acc.best)
  }
  return out
    .sort((a, b) => b.score - a.score || b.entry.weight - a.entry.weight || a.entry.cmd.length - b.entry.cmd.length)
    .slice(0, limit)
}
