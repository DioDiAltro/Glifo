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
  /** Nome italiano mostrato nell'interfaccia. */
  label: string
  /** Formula TeX usata come icona della categoria. */
  icon: string
}

/** Una variante di inserimento di un simbolo (es. `\sum` oppure `\sum_{}^{}`). */
export interface SymbolForm {
  /** TeX inserito nel documento. `#` indica un segnaposto (raggiungibile con Tab). */
  tex: string
  /** Breve etichetta italiana della variante, es. "con estremi". */
  label?: string
  /** TeX usato per l'anteprima quando diverso da `tex` (i `#` diventano ⋯). */
  preview?: string
}

export interface SymbolEntry {
  /** Identificatore univoco. */
  id: string
  /** Comando principale, es. `\sum`. Serve per i suggerimenti mentre si scrive. */
  cmd: string
  /** Nome italiano. */
  name: string
  category: CategoryId
  /** Parole chiave per la ricerca (italiano e inglese, anche frasi). */
  keywords: string[]
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
  note?: string
  /** Frammento valido solo dentro una formula più ampia (es. `\right)`, `&`). */
  fragment?: boolean
  /** Variante proposta per prima quando il comando è scritto per intero (es. \sum → \sum_{}^{}). */
  preferredForm?: number
}
