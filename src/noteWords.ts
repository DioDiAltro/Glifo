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

// ——— Le righe dei grafici: titolo:, asse x:, dati:, pareggio:, gantt:, reticolo:, inizio: ———

/**
 * Le parole all'inizio delle righe di un blocco ```grafico che non sono formule: il titolo e i nomi
 * degli assi (src/graph/spec.ts), i numeri di una tabella e il punto di pareggio (src/graph/tableGraph.ts),
 * il diagramma di Gantt, il reticolo e la data d'inizio (src/graph/planBlock.ts). Ognuna con la parola
 * italiana, che è anche il suo nome dentro il codice, e quella inglese (`gantt` è uguale).
 */
const GRAPH_KEYS = {
  titolo: 'title',
  'asse x': 'x axis',
  'asse y': 'y axis',
  'asse z': 'z axis',
  dati: 'data',
  pareggio: 'break-even',
  gantt: 'gantt',
  reticolo: 'network',
  inizio: 'start',
} as const

export type GraphKey = keyof typeof GRAPH_KEYS

/** La lingua di una parola scritta nella nota (`Lang` di src/i18n.ts). */
type WordLang = typeof lang

/**
 * Come si può scrivere ogni parola, senza badare alle maiuscole: in italiano come sempre (anche
 * `assex:`), in inglese anche con il trattino o attaccata (`x-axis:`, `breakeven:`).
 */
const GRAPH_KEY_FORMS: readonly [key: GraphKey, it: string, en: string][] = [
  ['titolo', 'titolo', 'title'],
  ['asse x', 'asse\\s*x', 'x\\s*-?\\s*axis'],
  ['asse y', 'asse\\s*y', 'y\\s*-?\\s*axis'],
  ['asse z', 'asse\\s*z', 'z\\s*-?\\s*axis'],
  ['dati', 'dati', 'data'],
  ['pareggio', 'pareggio', 'break[\\s-]?even'],
  ['gantt', 'gantt', 'gantt'],
  ['reticolo', 'reticolo', 'network'],
  ['inizio', 'inizio', 'start'],
]

/** Una di quelle righe: la parola (un gruppo per forma, prima l'italiano e poi l'inglese), i due punti e il resto. */
const GRAPH_KEY_LINE = new RegExp(`^(?:${GRAPH_KEY_FORMS.map(([, it, en]) => `(${it})|(${en})`).join('|')})\\s*:\\s*(.*)$`, 'i')

/**
 * Una riga di un grafico che comincia con una di queste parole, in italiano o in inglese (`titolo: …`,
 * `X axis: …`, `data: A8:D13`): la parola com'è dentro Glifo, la lingua in cui è scritta e il testo dopo
 * i due punti. Null se la riga è altro (una formula).
 */
export function parseGraphKey(text: string): { key: GraphKey; lang: WordLang; value: string } | null {
  const m = GRAPH_KEY_LINE.exec(text.trim())
  if (!m) return null
  // La forma trovata: due gruppi per parola, prima l'italiano e poi l'inglese.
  const group = m.findIndex((g, i) => i > 0 && g !== undefined) - 1
  return { key: GRAPH_KEY_FORMS[group >> 1][0], lang: group % 2 ? 'en' : 'it', value: m[m.length - 1].trim() }
}

/** La parola da scrivere nella nota: nella lingua di Glifo (`dati` o `data`) o, se si dice, in `language`. */
export function graphKeyWord(key: GraphKey, language: WordLang = lang): string {
  return language === 'it' ? key : GRAPH_KEYS[key]
}

/**
 * Una riga da scrivere in un blocco ```grafico, con la parola nella lingua di Glifo: `graphKeyLine('dati',
 * 'A8:D13')` è `dati: A8:D13` in italiano e `data: A8:D13` in inglese. Una riga che c'è già si riscrive
 * nella sua lingua, `language` (quella di `parseGraphKey`).
 */
export function graphKeyLine(key: GraphKey, value: string, language: WordLang = lang): string {
  return `${graphKeyWord(key, language)}: ${value}`
}
