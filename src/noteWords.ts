import { lang } from './i18n'

/**
 * Le parole che si scrivono nelle note (GRAFICA.md, punto 6): quelle italiane di sempre valgono per
 * sempre e ci sono anche quelle inglesi, così una nota si legge uguale con Glifo in tutte e due le
 * lingue. I pulsanti scrivono le parole della lingua di Glifo. Qui i nomi dei blocchi: dentro il codice
 * un blocco si chiama sempre con il nome italiano (```graph è un `grafico`).
 */

/** I nomi dei blocchi di Glifo: l'italiano e l'inglese. */
const BLOCKS = { grafico: 'graph', tabella: 'table', schema: 'diagram' } as const

export type BlockKind = keyof typeof BLOCKS

const FROM_ENGLISH = new Map<string, string>(Object.entries(BLOCKS).map(([it, en]) => [en, it]))

/**
 * Il nome di un blocco di codice com'è dentro Glifo: la prima parola dopo ```, in minuscolo, con il nome
 * inglese dei blocchi di Glifo cambiato in quello italiano (```Graph → `grafico`, ```math → `math`).
 */
export function blockKind(info: string): string {
  const word = info.trim().split(/\s+/)[0].toLowerCase()
  return FROM_ENGLISH.get(word) ?? word
}

/** Il nome da scrivere nella nota per un blocco nuovo, nella lingua di Glifo: ```grafico o ```graph. */
export function blockWord(kind: BlockKind): string {
  return lang === 'it' ? kind : BLOCKS[kind]
}
