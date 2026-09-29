import { SYMBOLS, commandNames, type SymbolEntry } from '../symbols'
import { STOPWORDS, editDistance, normalizeText, stem, words } from './normalize'

export interface SearchResult {
  entry: SymbolEntry
  score: number
}

interface IndexedEntry {
  entry: SymbolEntry
  /** Parole (normalizzate) di nome, parole chiave e nomi di comando. */
  tokens: string[]
  stems: Set<string>
  /** Frasi delle parole chiave: normalizzate e senza parole vuote. */
  phrases: { raw: string; stripped: string; size: number; isName: boolean }[]
  /** Nomi di comando in minuscolo, es. "infty". */
  commands: string[]
}

let index: IndexedEntry[] | null = null

function stripStopwords(ws: string[]): string[] {
  return ws.filter((w) => !STOPWORDS.has(w) && !(w.length === 1 && !/\d/.test(w)))
}

function buildIndex(): IndexedEntry[] {
  return SYMBOLS.map((entry) => {
    const phraseSources = [entry.name, ...entry.keywords]
    const tokenSet = new Set<string>()
    const phrases: IndexedEntry['phrases'] = []
    phraseSources.forEach((src, i) => {
      const ws = words(src)
      for (const w of ws) tokenSet.add(w)
      if (ws.length) {
        const stripped = stripStopwords(ws)
        phrases.push({ raw: ws.join(' '), stripped: stripped.join(' '), size: Math.max(stripped.length, 1), isName: i === 0 })
      }
    })
    const commands = commandNames(entry).map((c) => c.toLowerCase())
    for (const c of commands) tokenSet.add(c)
    const tokens = [...tokenSet]
    return { entry, tokens, stems: new Set(tokens.map(stem)), phrases, commands }
  })
}

function getIndex(): IndexedEntry[] {
  return (index ??= buildIndex())
}

/** Quanto una parola della ricerca somiglia a una parola del simbolo (0 = per niente). */
function tokenScore(q: string, item: IndexedEntry): number {
  let best = 0
  const qStem = stem(q)
  for (const t of item.tokens) {
    let s = 0
    if (t === q) s = 3
    else if (q.length >= 3 && t.startsWith(q)) s = 2 + q.length / t.length / 2
    else if (qStem.length >= 4 && stem(t) === qStem) s = 2.6
    else if (q.length >= 5 && t.length >= 4 && q.startsWith(t)) s = 1.6
    else if (q.length >= 5 && editDistance(q, t, q.length >= 10 ? 2 : 1) <= (q.length >= 10 ? 2 : 1)) s = 1.2
    if (s > best) best = s
    if (best === 3) break
  }
  return best
}

/** Cerca `phrase` come sequenza di parole intere dentro `text`. */
function containsPhrase(text: string, phrase: string): boolean {
  if (!phrase) return false
  return ` ${text} `.includes(` ${phrase} `)
}

/**
 * Ricerca "a parole": capisce frasi come "come faccio il simbolo
 * dell'infinito", nomi inglesi, comandi (`\infty` o `infty`) e anche il
 * simbolo stesso incollato (`∞`).
 */
export function searchSymbols(query: string, limit = 30): SearchResult[] {
  const q = query.trim()
  if (!q) return []
  const items = getIndex()
  const scores = new Map<SymbolEntry, number>()
  const add = (entry: SymbolEntry, s: number) => scores.set(entry, (scores.get(entry) ?? 0) + s)

  // 1. Comandi scritti esplicitamente: \infty
  for (const m of q.matchAll(/\\([a-zA-Z]+)/g)) {
    const name = m[1]
    for (const it of items) {
      if (it.commands.includes(name.toLowerCase())) add(it.entry, commandNames(it.entry).includes(name) ? 40 : 30)
      else if (it.commands.some((c) => c.startsWith(name.toLowerCase()))) add(it.entry, 12)
    }
  }

  // 2. Simboli Unicode incollati: ∞ → \infty
  const symbolChars = [...q].filter((ch) => {
    if ('<>=+*/|~%&$#'.includes(ch)) return true
    if (ch.charCodeAt(0) <= 127) return false
    // Le lettere accentate (è, à…) non sono simboli.
    return !/^[a-zA-Z]/.test(ch.normalize('NFD')) && !/[’‘“”«»]/.test(ch)
  })
  if (symbolChars.length) {
    for (const it of items) {
      const u = it.entry.unicode
      if (u && symbolChars.some((ch) => u === ch || (u.length > 1 && u.includes(ch)))) add(it.entry, u === q ? 50 : 25)
    }
  }

  // 3. Parole (italiano o inglese)
  const allWords = words(q.replace(/\\[a-zA-Z]+/g, ' '))
  let qWords = stripStopwords(allWords)
  if (!qWords.length) qWords = allWords
  if (qWords.length) {
    const rawQuery = allWords.join(' ')
    const strippedQuery = qWords.join(' ')
    for (const it of items) {
      let sum = 0
      let matched = 0
      for (const w of qWords) {
        const s = tokenScore(w, it)
        if (s > 0) {
          matched++
          sum += s
        }
      }
      if (!matched) continue
      const coverage = matched / qWords.length
      let phraseBonus = 0
      for (const p of it.phrases) {
        let b = 0
        if (p.raw === rawQuery || (p.stripped && p.stripped === strippedQuery)) {
          b = 4 + p.size * 1.5
          if (p.raw === rawQuery) b += 1.5
          if (p.isName && (p.raw === rawQuery || p.raw === strippedQuery)) b += 1.5
        }
        else if (p.raw.length >= 4 && containsPhrase(rawQuery, p.raw)) b = 2 + p.size * 1.5
        else if (p.stripped.length >= 4 && containsPhrase(strippedQuery, p.stripped)) b = 2 + p.size * 1.5
        if (b > phraseBonus) phraseBonus = b
      }
      add(it.entry, sum * (0.5 + coverage) + phraseBonus + it.entry.weight * 0.25 + (coverage === 1 ? 1 : 0))
    }
  }

  const sorted = [...scores.entries()]
    .map(([entry, score]) => ({ entry, score }))
    .sort((a, b) => b.score - a.score || b.entry.weight - a.entry.weight)
  // Scarta i risultati molto più deboli del migliore (somiglianze casuali).
  const best = sorted[0]?.score ?? 0
  return sorted.filter((r) => r.score >= best * 0.35).slice(0, limit)
}

/** `true` se il primo risultato è nettamente migliore degli altri. */
export function isConfidentAnswer(results: SearchResult[]): boolean {
  if (!results.length) return false
  const [first, second] = results
  if (first.score < 8) return false
  return !second || first.score >= second.score * 1.25
}

export { normalizeText }
