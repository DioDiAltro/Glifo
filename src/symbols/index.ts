import type { Category, CategoryId, SymbolEntry } from './types'
import { greek } from './data/greek'
import { operators, relations } from './data/operators'
import { arrows } from './data/arrows'
import { sets, logic } from './data/setsLogic'
import { bigops, calculus, functions, fractions } from './data/calculus'
import { delimiters, accents, fonts, text, structures } from './data/layout'
import { misc, chemistry } from './data/misc'

export type { Category, CategoryId, SymbolEntry, SymbolForm } from './types'

/** Categorie nell'ordine in cui appaiono nel pannello laterale. */
export const CATEGORIES: Category[] = [
  { id: 'greek', label: 'Lettere greche', icon: String.raw`\alpha` },
  { id: 'fractions', label: 'Frazioni, potenze, radici', icon: String.raw`\tfrac{a}{b}` },
  { id: 'operators', label: 'Operatori', icon: String.raw`\pm` },
  { id: 'relations', label: 'Relazioni', icon: String.raw`\leq` },
  { id: 'arrows', label: 'Frecce', icon: String.raw`\Rightarrow` },
  { id: 'sets', label: 'Insiemi', icon: String.raw`\in` },
  { id: 'logic', label: 'Logica', icon: String.raw`\forall` },
  { id: 'bigops', label: 'Sommatorie e produttorie', icon: String.raw`\textstyle\sum` },
  { id: 'calculus', label: 'Analisi', icon: String.raw`\textstyle\int` },
  { id: 'functions', label: 'Funzioni', icon: String.raw`\sin` },
  { id: 'delimiters', label: 'Parentesi', icon: String.raw`\langle\,\rangle` },
  { id: 'accents', label: 'Accenti e decorazioni', icon: String.raw`\vec{v}` },
  { id: 'fonts', label: 'Stili delle lettere', icon: String.raw`\mathbb{R}` },
  { id: 'structures', label: 'Matrici e sistemi', icon: String.raw`\left(\begin{smallmatrix}a&b\\c&d\end{smallmatrix}\right)` },
  { id: 'text', label: 'Testo e spazi', icon: String.raw`\text{Aa}` },
  { id: 'misc', label: 'Varie', icon: String.raw`\ldots` },
  { id: 'chemistry', label: 'Chimica', icon: String.raw`\ce{H2O}` },
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
