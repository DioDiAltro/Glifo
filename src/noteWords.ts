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
