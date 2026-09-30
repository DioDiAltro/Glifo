import { loadModule, type HunspellInstance } from '@farscrl/hunspell-wasm'
import { editDistance } from '../search/normalize'
import { GLOSSARY } from './glossary'
import { normalizeWord } from './words'

/**
 * Il correttore: Hunspell (lo stesso di LibreOffice e Firefox) compilato in
 * WebAssembly, con i dizionari italiano e inglese, più il glossario tecnico
 * e le parole aggiunte dallo studente.
 */

export type SpellLanguage = 'it' | 'en'

export interface DictionaryData {
  aff: Uint8Array
  dic: Uint8Array
}

/** Articoli, preposizioni e parole che si elidono davanti a una vocale. */
const ELISIONS = new Set(
  "l' un' dell' all' dall' nell' sull' coll' quest' quell' bell' sant' d' c' s' m' t' v' n' tutt' senz' anch' com' dov' cos' quand'".split(' '),
)

/** Errori comuni per cui il dizionario non propone la forma giusta. */
const COMMON_FIXES: Record<string, string[]> = {
  "e'": ['è'],
  "E'": ['È'],
  pò: ["po'"],
  Pò: ["Po'"],
  "qual'è": ['qual è'],
  "Qual'è": ['Qual è'],
}

function lower(word: string): string {
  return word.toLocaleLowerCase('it')
}

function capitalize(word: string): string {
  return word.charAt(0).toLocaleUpperCase('it') + word.slice(1)
}

/**
 * Cerca la parola nel glossario come fa Hunspell con le maiuscole: «parola»
 * vale anche per «Parola» e «PAROLA», «Cauchy» anche per «CAUCHY».
 */
function inGlossary(word: string): boolean {
  if (GLOSSARY.has(word)) return true
  const low = lower(word)
  const upper = word === word.toLocaleUpperCase('it')
  if (word !== capitalize(low) && !upper) return false
  return GLOSSARY.has(low) || (upper && GLOSSARY.has(capitalize(low)))
}

export class SpellEngine {
  /** Parole aggiunte dallo studente, in minuscolo: valgono con qualunque maiuscola. */
  private personal: ReadonlySet<string> = new Set()

  private constructor(private readonly dictionaries: { lang: SpellLanguage; hunspell: HunspellInstance }[]) {}

  /** Carica i dizionari delle lingue indicate (la prima è quella principale). */
  static async create(languages: SpellLanguage[], load: (lang: SpellLanguage) => Promise<DictionaryData>): Promise<SpellEngine> {
    const [factory, files] = await Promise.all([loadModule(), Promise.all(languages.map(load))])
    const dictionaries = files.map((data, i) => {
      const aff = factory.mountBuffer(data.aff, `${languages[i]}.aff`)
      const dic = factory.mountBuffer(data.dic, `${languages[i]}.dic`)
      const hunspell = factory.create(aff, dic)
      // Hunspell ha già letto i file: le copie in memoria non servono più.
      factory.unmount(aff)
      factory.unmount(dic)
      return { lang: languages[i], hunspell }
    })
    return new SpellEngine(dictionaries)
  }

  setPersonalWords(words: string[]): void {
    this.personal = new Set(words.map((w) => lower(normalizeWord(w))))
  }

  isCorrect(raw: string): boolean {
    const word = normalizeWord(raw)
    if (this.personal.has(lower(word)) || inGlossary(word)) return true
    if (this.dictionaries.some((d) => d.hunspell.spell(word))) return true
    // Elisione che il dizionario non conosce («l'Hôpital»): conta la parola dopo l'apostrofo.
    const cut = word.indexOf("'")
    if (cut > 0 && cut < word.length - 1 && ELISIONS.has(lower(word.slice(0, cut + 1)))) {
      return this.isCorrect(word.slice(cut + 1))
    }
    return false
  }

  /** Le parole sbagliate tra quelle date. */
  misspelled(words: string[]): string[] {
    return words.filter((w) => !this.isCorrect(w))
  }

  /**
   * Correzioni proposte, dalla più vicina alla parola scritta; a parità di
   * distanza vengono prima quelle della lingua principale.
   */
  suggest(raw: string, max = 6): string[] {
    const word = normalizeWord(raw)
    // Le lettere accentate italiane in inglese non ci sono: inutile cercare correzioni lì.
    const italianOnly = /[àèéìíòóùú]/i.test(word)
    const candidates = this.dictionaries
      .filter((d) => !(italianOnly && d.lang === 'en'))
      .flatMap((d, lang) =>
        d.hunspell.suggest(word).map((text, rank) => ({ text, lang, rank, distance: editDistance(lower(word), lower(text), 50) })),
      )
    candidates.sort((a, b) => a.distance - b.distance || a.lang - b.lang || a.rank - b.rank)
    const out = [...(COMMON_FIXES[word] ?? [])]
    for (const c of candidates) if (c.text !== word && !out.includes(c.text)) out.push(c.text)
    return out.slice(0, max)
  }
}
