/**
 * Divide il testo in parole da controllare. Salta quello che non è prosa:
 * indirizzi web e di posta, percorsi e nomi di file, identificatori come
 * «HashMap» o «nome_variabile», sigle in maiuscolo, parole attaccate a
 * cifre, comandi come `\alpha` scritti fuori da una formula.
 */

export interface WordRange {
  from: number
  to: number
  word: string
}

/** Forma usata per i confronti: accenti composti (NFC) e apostrofo dritto. */
export function normalizeWord(word: string): string {
  return word.normalize('NFC').replace(/’/g, "'")
}

const CHUNK = /\S+/g
/** Lettere (anche accentate) con apostrofi interni: «l'insieme», «c'è», «po'». */
const WORD = /\p{L}[\p{L}\p{M}]*(?:['’]\p{L}[\p{L}\p{M}]*)*['’]?/gu
const EDGE_PUNCTUATION = /^[\p{P}\p{S}]+|[\p{P}\p{S}]+$/gu
/** Pezzi di testo che non sono prosa: URL, e-mail, percorsi, codice. */
const NOT_PROSE = /:\/\/|^www\.|[@/_#=<>{}|&~^]|[\p{L}\d]\.[\p{L}\d]/u
const QUOTES = new Set(["'", '’', '‘', '"', '“', '«'])

/** «Parola» o «parola», anche dopo un apostrofo («dell'Università»); non «HashMap» o «LaTeX». */
function isProseCase(word: string): boolean {
  return word.split(/['’]/).every((part) => part.slice(1) === part.slice(1).toLowerCase())
}

function isUpperCase(word: string): boolean {
  return word === word.toUpperCase() && word !== word.toLowerCase()
}

/** Parole del testo `text`, con le posizioni spostate di `offset`. */
export function findWords(text: string, offset = 0): WordRange[] {
  const out: WordRange[] = []
  for (const chunk of text.matchAll(CHUNK)) {
    const raw = chunk[0]
    // La barra rovesciata si controlla prima di togliere la punteggiatura ai bordi: `\alpha`.
    if (raw.includes('\\') || NOT_PROSE.test(raw.replace(EDGE_PUNCTUATION, ''))) continue
    for (const m of raw.matchAll(WORD)) {
      let word = m[0]
      const start = m.index
      const before = raw[start - 1] ?? ''
      // L'apostrofo finale fa parte della parola solo nei troncamenti corti
      // («po'», «di'», «e'»), non quando chiude una citazione tra apici.
      if (/['’]$/.test(word) && (word.length > 4 || QUOTES.has(before))) word = word.slice(0, -1)
      const after = raw[start + word.length] ?? ''
      if (/\d/.test(before) || /\d/.test(after)) continue
      if (word.length < 2 || isUpperCase(word) || !isProseCase(word)) continue
      out.push({ from: offset + chunk.index + start, to: offset + chunk.index + start + word.length, word })
    }
  }
  return out
}
