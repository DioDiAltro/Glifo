import type { CategoryId, SymbolEntry, SymbolForm } from './types'

/** `String.raw`: permette di scrivere il TeX senza raddoppiare le barre rovesciate. */
export const r = String.raw

/** Variante: solo TeX, oppure [TeX, etichetta, anteprima]. */
export type FormSpec = string | [tex: string, label?: string, preview?: string]

export interface EntryOptions {
  /** Id esplicito (di default è il comando). */
  id?: string
  /** Carattere Unicode equivalente. */
  u?: string
  /** Popolarità 0–10 (default 3). */
  w?: number
  /** Varianti di inserimento (default: il comando stesso). */
  f?: FormSpec[]
  /** Anteprima della variante di default (quando `f` non è indicato). */
  p?: string
  /** Preferisce la modalità display fuori dalle formule. */
  d?: boolean
  /** Nomi di comando alternativi, separati da virgola. */
  a?: string
  /** Nota mostrata nell'interfaccia. */
  note?: string
  /** Frammento valido solo dentro una formula più ampia. */
  x?: boolean
  /** Indice della variante da proporre per prima a comando completo. */
  t?: number
}

function toForm(spec: FormSpec): SymbolForm {
  if (typeof spec === 'string') return { tex: spec }
  const [tex, label, preview] = spec
  const form: SymbolForm = { tex }
  if (label) form.label = label
  if (preview) form.preview = preview
  return form
}

function splitList(list: string | undefined): string[] {
  return (list ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

/**
 * Crea una funzione compatta per definire i simboli di una categoria:
 * `g(r`\alpha`, 'alfa', 'alfa, alpha', { u: 'α', w: 9 })`.
 */
export function category(cat: CategoryId) {
  return (cmd: string, name: string, keywords: string, o: EntryOptions = {}): SymbolEntry => {
    const forms = o.f ? o.f.map(toForm) : [toForm(o.p ? [cmd, undefined, o.p] : cmd)]
    const entry: SymbolEntry = {
      id: o.id ?? cmd,
      cmd,
      name,
      category: cat,
      keywords: splitList(keywords),
      forms,
      weight: o.w ?? 3,
      aliases: splitList(o.a),
    }
    if (o.u) entry.unicode = o.u
    if (o.d) entry.display = true
    if (o.note) entry.note = o.note
    if (o.x) entry.fragment = true
    if (o.t !== undefined) entry.preferredForm = o.t
    return entry
  }
}
