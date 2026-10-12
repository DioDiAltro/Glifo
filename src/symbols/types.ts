import type { Text } from '../i18n'

/*
 * I testi che si vedono (nomi, etichette, note) sono getter: danno la lingua di Glifo quando si
 * leggono, così nelle prove `setLangForTests` cambia lingua anche ai simboli già creati.
 */

export type CategoryId =
  | 'greek'
  | 'operators'
  | 'relations'
  | 'arrows'
  | 'sets'
  | 'logic'
  | 'bigops'
  | 'calculus'
  | 'functions'
  | 'fractions'
  | 'delimiters'
  | 'accents'
  | 'fonts'
  | 'structures'
  | 'text'
  | 'misc'
  | 'chemistry'

export interface Category {
  id: CategoryId
  /** Nome mostrato nell'interfaccia. */
  readonly label: string
  /** Formula TeX usata come icona della categoria. */
  icon: string
}

/** Una variante di inserimento di un simbolo (es. `\sum` oppure `\sum_{}^{}`). */
export interface SymbolForm {
  /** TeX inserito nel documento. `#` indica un segnaposto (raggiungibile con Tab). */
  readonly tex: string
  /** Breve etichetta della variante, es. "con estremi". */
  readonly label?: string
  /** TeX usato per l'anteprima quando diverso da `tex` (i `#` diventano ⋯). */
  readonly preview?: string
}

export interface SymbolEntry {
  /** Identificatore univoco. */
  id: string
  /** Comando principale, es. `\sum`. Serve per i suggerimenti mentre si scrive. */
  readonly cmd: string
  /** Nome nella lingua di Glifo. */
  readonly name: string
  /** Il nome nelle due lingue, [italiano, inglese]: la ricerca li conosce tutti e due. */
  names: Text
  category: CategoryId
  /** Parole chiave per la ricerca (italiano e inglese, anche frasi). */
  keywords: string[]
  /**
   * Le stesse parole chiave divise per lingua, [italiano, inglese]: la ricerca le trova tutte, ma a
   * parità vince la lingua di Glifo.
   */
  keywordsByLang: readonly [it: string[], en: string[]]
  /** Varianti di inserimento (almeno una). */
  forms: SymbolForm[]
  /** Carattere Unicode equivalente, per la ricerca inversa (es. "∞"). */
  unicode?: string
  /** Popolarità 0–10, usata per ordinare i risultati. */
  weight: number
  /** Se inserito fuori da una formula, preferisce un blocco `$$ … $$`. */
  display?: boolean
  /** Altri nomi di comando che attivano il suggerimento (senza `\`). */
  aliases: string[]
  /** Suggerimento extra mostrato nell'interfaccia. */
  readonly note?: string
  /** Frammento valido solo dentro una formula più ampia (es. `\right)`, `&`). */
  fragment?: boolean
  /** Variante proposta per prima quando il comando è scritto per intero (es. \sum → \sum_{}^{}). */
  preferredForm?: number
}
