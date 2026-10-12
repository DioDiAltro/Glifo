import { pick, type Text } from '../i18n'
import type { CategoryId, SymbolEntry, SymbolForm } from './types'

/** `String.raw`: permette di scrivere il TeX senza raddoppiare le barre rovesciate. */
export const r = String.raw

/**
 * Un testo dei simboli (nome, parole chiave, etichetta, nota, e il TeX quando ha delle parole, come
 * `\text{se}`): uguale nelle due lingue, come «nabla» o «2×2», oppure la coppia [italiano, inglese].
 */
export type Words = string | Text

/** Variante: solo TeX, oppure [TeX, etichetta, anteprima]. */
export type FormSpec = string | [tex: Words, label?: Words, preview?: Words]

export interface EntryOptions {
  /** Id esplicito (di default è il comando, in italiano). */
  id?: string
  /** Carattere Unicode equivalente. */
  u?: string
  /** Popolarità 0–10 (default 3). */
  w?: number
  /** Varianti di inserimento (default: il comando stesso). */
  f?: FormSpec[]
  /** Anteprima della variante di default (quando `f` non è indicato). */
  p?: Words
  /** Preferisce la modalità display fuori dalle formule. */
  d?: boolean
  /** Nomi di comando alternativi, separati da virgola. */
  a?: string
  /** Nota mostrata nell'interfaccia. */
  note?: Words
  /** Frammento valido solo dentro una formula più ampia. */
  x?: boolean
  /** Indice della variante da proporre per prima a comando completo. */
  t?: number
}

/** Il testo nella lingua di Glifo. */
function inLang(words: Words): string {
  return typeof words === 'string' ? words : pick(words)
}

/** I testi sono getter: la lingua si sceglie quando si leggono. */
function toForm(spec: FormSpec): SymbolForm {
  const [tex, label, preview]: [Words, Words?, Words?] = typeof spec === 'string' ? [spec] : spec
  return {
    get tex() {
      return inLang(tex)
    },
    get label() {
      return label && inLang(label)
    },
    get preview() {
      return preview && inLang(preview)
    },
  }
}

function splitList(list: string | undefined): string[] {
  return (list ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

/**
 * Crea una funzione compatta per definire i simboli di una categoria:
 * `g(r`\alpha`, ['alfa', 'alpha'], ['alfa, lettera greca a', 'greek letter a'], { u: 'α', w: 9 })`.
 * Le parole chiave sono separate da virgole, [italiane, inglesi]: la ricerca le trova tutte (le
 * italiane hanno anche qualche parola inglese, da prima che Glifo avesse l'inglese).
 */
export function category(cat: CategoryId) {
  return (cmd: Words, name: Words, keywords: Words, o: EntryOptions = {}): SymbolEntry => {
    const forms = o.f ? o.f.map(toForm) : [toForm([cmd, undefined, o.p])]
    const [itKeywords, enKeywords] = typeof keywords === 'string' ? [keywords, keywords] : keywords
    const keywordsByLang = [splitList(itKeywords), splitList(enKeywords)] as const
    const entry: SymbolEntry = {
      id: o.id ?? (typeof cmd === 'string' ? cmd : cmd[0]),
      get cmd() {
        return inLang(cmd)
      },
      get name() {
        return inLang(name)
      },
      names: typeof name === 'string' ? [name, name] : name,
      category: cat,
      keywords: [...new Set(keywordsByLang.flat())],
      keywordsByLang,
      forms,
      weight: o.w ?? 3,
      aliases: splitList(o.a),
      get note() {
        return o.note && inLang(o.note)
      },
    }
    if (o.u) entry.unicode = o.u
    if (o.d) entry.display = true
    if (o.x) entry.fragment = true
    if (o.t !== undefined) entry.preferredForm = o.t
    return entry
  }
}
