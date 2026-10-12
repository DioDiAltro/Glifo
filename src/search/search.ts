import { lang, type Lang } from '../i18n'
import { SYMBOLS, commandNames, type SymbolEntry } from '../symbols'
import { STOPWORDS, editDistance, normalizeText, singular, stem, words } from './normalize'

export interface SearchResult {
  entry: SymbolEntry
  score: number
}

/** Le lingue in cui c'è una parola o una frase del simbolo (i nomi dei comandi sono di tutte e due). */
type Langs = ReadonlySet<Lang>

const BOTH: Langs = new Set<Lang>(['it', 'en'])

/**
 * Una parola o una frase che c'è solo nell'altra lingua conta un po' meno: la ricerca trova con tutte e
 * due, ma a parità vince la lingua di Glifo.
 */
const OTHER_LANGUAGE = 0.9

interface Phrase {
  raw: string
  stripped: string
  /** Le stesse al singolare ("natural numbers" → "natural number"), per i plurali inglesi. */
  base: string
  baseStripped: string
  size: number
  isName: boolean
  langs: Langs
}

interface Token {
  word: string
  /** Il singolare e la radice, calcolati una volta sola. */
  singular: string
  stem: string
  langs: Langs
}

interface IndexedEntry {
  entry: SymbolEntry
  /** Parole (normalizzate) dei nomi, delle parole chiave e dei nomi di comando, con le loro lingue. */
  tokens: Token[]
  /** Frasi dei nomi e delle parole chiave: normalizzate e senza parole vuote. */
  phrases: Phrase[]
  /** Nomi di comando in minuscolo, es. "infty". */
  commands: string[]
}

let index: IndexedEntry[] | null = null

function stripStopwords(ws: string[]): string[] {
  return ws.filter((w) => !STOPWORDS.has(w) && !(w.length === 1 && !/\d/.test(w)))
}

const singulars = (ws: string[]) => ws.map(singular).join(' ')

/**
 * L'indice non dipende dalla lingua di Glifo: ha i nomi e le parole chiave delle due lingue, ognuno con
 * la sua; la lingua conta quando si cerca.
 */
function buildIndex(): IndexedEntry[] {
  return SYMBOLS.map((entry) => {
    const sources: { text: string; langs: Set<Lang>; isName: boolean }[] = []
    const addSource = (text: string, l: Lang, isName: boolean) => {
      const same = sources.find((s) => s.text === text && s.isName === isName)
      if (same) same.langs.add(l)
      else sources.push({ text, langs: new Set([l]), isName })
    }
    entry.names.forEach((name, i) => addSource(name, i ? 'en' : 'it', true))
    entry.keywordsByLang.forEach((list, i) => list.forEach((k) => addSource(k, i ? 'en' : 'it', false)))
    const langsOf = new Map<string, Langs>()
    const phrases: Phrase[] = []
    for (const { text, langs, isName } of sources) {
      const ws = words(text)
      for (const w of ws) langsOf.set(w, new Set([...(langsOf.get(w) ?? []), ...langs]))
      if (ws.length) {
        const stripped = stripStopwords(ws)
        phrases.push({
          raw: ws.join(' '),
          stripped: stripped.join(' '),
          base: singulars(ws),
          baseStripped: singulars(stripped),
          size: Math.max(stripped.length, 1),
          isName,
          langs,
        })
      }
    }
    const commands = commandNames(entry).map((c) => c.toLowerCase())
    for (const c of commands) langsOf.set(c, BOTH)
    const tokens = [...langsOf].map(([word, langs]) => ({ word, singular: singular(word), stem: stem(word), langs }))
    return { entry, tokens, phrases, commands }
  })
}

function getIndex(): IndexedEntry[] {
  return (index ??= buildIndex())
}

/** Quanto conta una parola o una frase: tutto nella lingua di Glifo, un po' meno nell'altra. */
const languageFactor = (langs: Langs) => (langs.has(lang) ? 1 : OTHER_LANGUAGE)

/** Quanto una parola della ricerca somiglia a una parola del simbolo (0 = per niente). */
function tokenScore(q: string, item: IndexedEntry): number {
  let best = 0
  const qStem = stem(q)
  const qSingular = singular(q)
  for (const token of item.tokens) {
    const t = token.word
    let s = 0
    if (t === q) s = 3
    // Il plurale inglese: "integrals" come "integral" (appena meno della parola esatta).
    else if (token.singular === qSingular) s = 2.9
    else if (q.length >= 3 && t.startsWith(q)) s = 2 + q.length / t.length / 2
    else if (qStem.length >= 4 && token.stem === qStem) s = 2.6
    else if (q.length >= 5 && t.length >= 4 && q.startsWith(t)) s = 1.6
    else if (q.length >= 5 && editDistance(q, t, q.length >= 10 ? 2 : 1) <= (q.length >= 10 ? 2 : 1)) s = 1.2
    s *= languageFactor(token.langs)
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
 * dell'infinito" o "how do I write infinity" (le due lingue, qualunque sia
 * quella di Glifo), comandi (`\infty` o `infty`) e anche il simbolo stesso
 * incollato (`∞`).
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
    const baseQuery = singulars(allWords)
    const baseStripped = singulars(qWords)
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
        // Le frasi si confrontano al singolare: "integrals" trova la frase "integral".
        let b = 0
        if (p.base === baseQuery || (p.baseStripped && p.baseStripped === baseStripped)) {
          b = 4 + p.size * 1.5
          if (p.raw === rawQuery) b += 1.5
          if (p.isName && (p.base === baseQuery || p.base === baseStripped)) b += 1.5
        }
        else if (p.raw.length >= 4 && containsPhrase(baseQuery, p.base)) b = 2 + p.size * 1.5
        else if (p.stripped.length >= 4 && containsPhrase(baseStripped, p.baseStripped)) b = 2 + p.size * 1.5
        b *= languageFactor(p.langs)
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
