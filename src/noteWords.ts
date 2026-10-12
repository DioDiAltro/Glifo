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

// ——— Le parole delle formule ———

/**
 * I nomi delle funzioni che si scrivono nelle formule (\operatorname{studio}(f) =, \operatorname{ic}(x, 0{,}95) =):
 * il nome italiano e quello inglese. Il lettore delle formule li conosce tutti e due, con Glifo in tutte
 * e due le lingue: `FUNCTION_NAMES` in src/math/parse.ts prende da qui i nomi inglesi, la logica
 * (src/math/logic.ts) quelli della tavola di verità. Chi scrive nella nota (i risultati, i messaggi, la
 * guida, i simboli del pannello) usa il nome della lingua di Glifo: `functionWord`, `localizeTex`.
 * Qui ci sono solo i nomi che cambiano: quelli uguali nelle due lingue (taylor, fourier, test, base,
 * newton…) no, e nemmeno le notazioni italiane delle funzioni (sen, tg, arcsen), che nel pannello dei
 * simboli sono simboli a sé. Un nome inglese non dev'essere già un'altra cosa: un comando del LaTeX
 * (\prime, \bar, \matrix: per questo isprime, barchart, matrixof) o un'altra funzione (midpoint è il punto
 * medio, la regola del punto medio è rectangles).
 */
const FUNCTIONS: ReadonlyMap<string, string> = new Map(Object.entries({
  // Lo studio di funzione, tutto o una parte.
  studio: 'study', dominio: 'domain', asintoti: 'asymptotes', estremi: 'extrema', massimi: 'maxima', minimi: 'minima',
  flessi: 'inflections', zeri: 'zeros',
  // La geometria.
  retta: 'line', circonferenza: 'circle', cerchio: 'circle', medio: 'midpoint', puntomedio: 'midpoint', baricentro: 'centroid',
  perimetro: 'perimeter', piano: 'plane', intersezione: 'intersection', distanza: 'distance', segmento: 'segment',
  poligono: 'polygon', triangolo: 'triangle', angolo: 'angle',
  // Le matrici e l'algebra lineare.
  rango: 'rank', rg: 'rank', traccia: 'trace', scala: 'rref', autovalori: 'eigenvalues', autovettori: 'eigenvectors',
  diagonalizza: 'diagonalize', ortonormalizza: 'orthonormalize', segnatura: 'signature', indipendenti: 'independent',
  matrice: 'matrixof', equazioni: 'equations', proiezione: 'projection',
  // Le operazioni con i campi.
  gradiente: 'gradient', divergenza: 'divergence', rotore: 'curl', rot: 'curl', laplaciano: 'laplacian', hessiana: 'hessian',
  jacobiana: 'jacobian',
  // Analisi 2 e l'antitrasformata di Laplace.
  critici: 'critical', stazionari: 'stationary', vincolati: 'constrained', conica: 'conic', quadrica: 'quadric',
  antilaplace: 'ilaplace',
  // Il calcolo numerico.
  bisezione: 'bisection', secanti: 'secant', secante: 'secant', puntofisso: 'fixedpoint', interpola: 'interpolate',
  interpolazione: 'interpolate', minimiquadrati: 'leastsquares', rettangoli: 'rectangles', trapezi: 'trapezoid',
  norma: 'norm', condizionamento: 'cond', eulero: 'euler',
  // La statistica inferenziale.
  ic: 'ci', icvarianza: 'civar', icvar: 'civar', chiquadro: 'chisq',
  // L'aritmetica, i polinomi e gli insiemi.
  mcd: 'gcd', mcm: 'lcm', totiente: 'totient', diofantea: 'diophantine', euclide: 'euclid', fattori: 'factor',
  scomponi: 'factor', fattorizza: 'factor', divisori: 'divisors', primo: 'isprime', divisione: 'division',
  sviluppa: 'expand', inverso: 'modinv', binario: 'binary', esadecimale: 'hex', parti: 'powerset', cardinalita: 'card',
  'cardinalità': 'card', segno: 'sign',
  // Le curve di livello, nei grafici.
  livelli: 'contour', livello: 'contour',
  // La statistica dei dati (le varianze e gli scarti campionari con .s, come VAR.S e STDEV.S di Excel).
  media: 'mean', mediana: 'median', moda: 'mode', varianza: 'variance', varc: 'var.s', 'var.c': 'var.s', sqm: 'sd', ds: 'sd',
  devst: 'stdev.p', 'dev.st': 'stdev.p', 'dev.st.p': 'stdev.p', sqmc: 'stdev.s', dsc: 'stdev.s', sdc: 'stdev.s',
  devstc: 'stdev.s', 'dev.st.c': 'stdev.s', 'dev.st.s': 'stdev.s', quartili: 'quartiles', covarianza: 'covariance',
  correlazione: 'correlation', regressione: 'regression', statistiche: 'summary', statistica: 'summary',
  riassunto: 'summary', frequenze: 'frequencies', frequenza: 'frequency', campo: 'range', istogramma: 'histogram',
  barre: 'barchart', dispersione: 'scatter',
  // La logica (src/math/logic.ts): la tavola di verità e le forme normali.
  'verità': 'truth', tavola: 'truthtable', fnd: 'dnf', fnc: 'cnf',
}))

/** I nomi delle funzioni che cambiano: [italiano, inglese]. */
export function functionWordPairs(): [it: string, en: string][] {
  return [...FUNCTIONS]
}

/** Il nome di una funzione (dato quello italiano) da scrivere nella nota, nella lingua di Glifo: studio o study. */
export function functionWord(italian: string): string {
  return lang === 'it' ? italian : (FUNCTIONS.get(italian) ?? italian)
}

/**
 * Le parole di \text{…} che il lettore delle formule conosce (src/math/parse.ts), per quello che fanno:
 * legano un'espressione alla sua condizione (y = x^2 \text{ per } x > 0), uniscono o separano due
 * condizioni, dicono il caso che resta in \begin{cases}. L'italiano e l'inglese.
 */
export const TEXT_WORDS = {
  condition: { se: 'if', per: 'for', con: 'with', quando: 'when', dove: 'where' },
  and: { e: 'and', ed: 'and' },
  or: { o: 'or', oppure: 'or' },
  otherwise: { altrimenti: 'otherwise', 'negli altri casi': 'otherwise', altrove: 'elsewhere' },
} as const satisfies Record<string, Readonly<Record<string, string>>>

const TEXTS: ReadonlyMap<string, string> = new Map(Object.values(TEXT_WORDS).flatMap((words) => Object.entries(words)))

/** Una parola di \text{…} (data quella italiana) da scrivere nella formula, nella lingua di Glifo: altrimenti o otherwise. */
export function textWord(italian: string): string {
  return lang === 'it' ? italian : (TEXTS.get(italian) ?? italian)
}

/**
 * Il TeX di un simbolo del pannello (src/symbols, scritto con le parole italiane) come va scritto nella
 * nota: con Glifo in inglese i nomi delle funzioni (\operatorname{studio} → \operatorname{study}) e le
 * parole di \text{…} che il lettore conosce (\text{ se } → \text{ if }) diventano inglesi. Il resto resta
 * com'è, e con Glifo in italiano tutto.
 */
export function localizeTex(tex: string): string {
  if (lang === 'it') return tex
  return tex
    .replace(/\\operatorname(\*?)\{([^{}]*)\}/g, (all, star: string, name: string) => {
      const english = FUNCTIONS.get(name)
      return english ? `\\operatorname${star}{${english}}` : all
    })
    .replace(/\\(text|textrm|mbox)\{(\s*)([^{}]*?)(\s*)\}/g, (all, command: string, before: string, word: string, after: string) => {
      const english = TEXTS.get(word)
      return english ? `\\${command}{${before}${english}${after}}` : all
    })
}
