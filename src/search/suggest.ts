import { lang, type Lang } from '../i18n'
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
  /** Nome e parole chiave di ogni lingua, normalizzati e anche "incollati" (per ogni → perogni). */
  keys: Record<Lang, string[]>
}

/**
 * Una parola che c'è solo nell'altra lingua conta meno: con Glifo in italiano `\res` propone ancora
 * \rho (resistività) prima di una parola inglese che comincia così, e in inglese il contrario. La parola
 * intera dell'altra lingua (420 − 150) resta sotto l'inizio di una parola della lingua di Glifo (320).
 */
const OTHER_LANGUAGE = 150

function keysOf(texts: readonly string[]): string[] {
  const keys = new Set<string>()
  for (const k of texts) {
    const n = normalizeText(k)
    if (!n) continue
    keys.add(n.replace(/ /g, ''))
    for (const w of n.split(' ')) if (w.length >= 3) keys.add(w)
  }
  return [...keys]
}

let index: SuggestIndex[] | null = null

function getIndex(): SuggestIndex[] {
  return (index ??= SYMBOLS.map((entry) => ({
    entry,
    names: commandNames(entry),
    // Le due lingue: `\infinito` e `\infinity` trovano tutti e due \infty.
    keys: {
      it: keysOf([entry.names[0], ...entry.keywordsByLang[0]]),
      en: keysOf([entry.names[1], ...entry.keywordsByLang[1]]),
    },
  })))
}

function isSubsequence(needle: string, hay: string): boolean {
  let i = 0
  for (const ch of hay) if (ch === needle[i]) i++
  return i === needle.length
}

/**
 * Suggerimenti per il comando che si sta scrivendo dopo `\`.
 * Esempio: `su` → \sum, \sup, \subset…; funziona anche con parole
 * italiane e inglesi (`\infinito` e `\infinity` → \infty, `\radice` e
 * `\root` → \sqrt).
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
      for (const l of ['it', 'en'] as const) {
        const other = l === lang ? 0 : OTHER_LANGUAGE
        for (const k of it.keys[l]) {
          if (k === norm) consider(420 + w * 3 - other, 'keyword')
          else if (k.startsWith(norm)) consider(320 + w * 3 - other, 'keyword')
        }
      }
    }
    if (acc.best) out.push(acc.best)
  }
  return out
    .sort((a, b) => b.score - a.score || b.entry.weight - a.entry.weight || a.entry.cmd.length - b.entry.cmd.length)
    .slice(0, limit)
}
