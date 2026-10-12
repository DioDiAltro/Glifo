import { texts } from '../i18n'
import type { Category, CategoryId, SymbolEntry } from './types'
import { greek } from './data/greek'
import { operators, relations } from './data/operators'
import { arrows } from './data/arrows'
import { sets, logic } from './data/setsLogic'
import { bigops, calculus, functions, fractions } from './data/calculus'
import { delimiters, accents, fonts, text, structures } from './data/layout'
import { misc, chemistry } from './data/misc'

export type { Category, CategoryId, SymbolEntry, SymbolForm } from './types'

/** I nomi delle categorie. */
const LABELS = texts({
  greek: ['Lettere greche', 'Greek letters'],
  fractions: ['Frazioni, potenze, radici', 'Fractions, powers, roots'],
  operators: ['Operatori', 'Operators'],
  relations: ['Relazioni', 'Relations'],
  arrows: ['Frecce', 'Arrows'],
  sets: ['Insiemi', 'Sets'],
  logic: ['Logica', 'Logic'],
  bigops: ['Sommatorie e produttorie', 'Sums and products'],
  calculus: ['Analisi', 'Calculus'],
  functions: ['Funzioni', 'Functions'],
  delimiters: ['Parentesi', 'Brackets'],
  accents: ['Accenti e decorazioni', 'Accents and decorations'],
  fonts: ['Stili delle lettere', 'Letter styles'],
  structures: ['Matrici e sistemi', 'Matrices and systems'],
  text: ['Testo e spazi', 'Text and spaces'],
  misc: ['Varie', 'Miscellaneous'],
  chemistry: ['Chimica', 'Chemistry'],
})

/** Una categoria: il nome è un getter, nella lingua di Glifo quando si mostra. */
const cat = (id: CategoryId, icon: string): Category => ({
  id,
  icon,
  get label() {
    return LABELS[id]
  },
})

/** Categorie nell'ordine in cui appaiono nel pannello laterale. */
export const CATEGORIES: Category[] = [
  cat('greek', String.raw`\alpha`),
  cat('fractions', String.raw`\tfrac{a}{b}`),
  cat('operators', String.raw`\pm`),
  cat('relations', String.raw`\leq`),
  cat('arrows', String.raw`\Rightarrow`),
  cat('sets', String.raw`\in`),
  cat('logic', String.raw`\forall`),
  cat('bigops', String.raw`\textstyle\sum`),
  cat('calculus', String.raw`\textstyle\int`),
  cat('functions', String.raw`\sin`),
  cat('delimiters', String.raw`\langle\,\rangle`),
  cat('accents', String.raw`\vec{v}`),
  cat('fonts', String.raw`\mathbb{R}`),
  cat('structures', String.raw`\left(\begin{smallmatrix}a&b\\c&d\end{smallmatrix}\right)`),
  cat('text', String.raw`\text{Aa}`),
  cat('misc', String.raw`\ldots`),
  cat('chemistry', String.raw`\ce{H2O}`),
]

export const SYMBOLS: SymbolEntry[] = [
  ...greek,
  ...fractions,
  ...operators,
  ...relations,
  ...arrows,
  ...sets,
  ...logic,
  ...bigops,
  ...calculus,
  ...functions,
  ...delimiters,
  ...accents,
  ...fonts,
  ...structures,
  ...text,
  ...misc,
  ...chemistry,
]

const byId = new Map(SYMBOLS.map((s) => [s.id, s]))

export function symbolById(id: string): SymbolEntry | undefined {
  return byId.get(id)
}

export function symbolsInCategory(id: CategoryId): SymbolEntry[] {
  return SYMBOLS.filter((s) => s.category === id)
}

/**
 * Nomi di comando (senza `\`) con cui un simbolo può essere richiamato
 * scrivendo, es. `sum` per `\sum`, `pmatrix` per le matrici.
 */
export function commandNames(entry: SymbolEntry): string[] {
  const names: string[] = []
  const m = /^\\([a-zA-Z]+)/.exec(entry.cmd)
  if (m) names.push(m[1])
  for (const a of entry.aliases) if (!names.includes(a)) names.push(a)
  return names
}
