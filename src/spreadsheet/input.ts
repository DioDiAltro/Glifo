/**
 * Quello che si scrive nelle celle, nelle due lingue di Glifo. Nella nota le celle sono sempre scritte
 * all'italiana, come prima delle due lingue: i numeri con la virgola (1,5; 1.234,5; 1,50 €), le formule
 * con il punto e virgola tra gli argomenti e i nomi italiani (=ARROTONDA(B2*1,5; 2)), VERO e FALSO,
 * gli errori come #N/D. Così una nota dà gli stessi valori in italiano e in inglese, e il formato
 * salvato non dipende dalla lingua.
 *
 * Con Glifo in inglese l'editor mostra le celle come le scrive l'Excel inglese (1.5; 1,234.5; €1.50;
 * =ROUND(B2*1.5, 2); TRUE; #N/A: `shownInput`) e legge all'inglese quello che si scrive, che torna
 * all'italiana prima di andare nella nota (`storedInput`). Un testo che all'italiana si leggerebbe
 * come un numero (3,5 scritto in inglese è un testo) prende l'apostrofo, come in Excel. In italiano
 * le celle restano come sono (le formule con i nomi in maiuscolo, `normalizeFormula`).
 */
import { usesDecimalComma } from '../i18n'
import { booleanText, englishNumber, ENGLISH, errorText, ITALIAN, italianNumber, readEnglishInput, readInput } from './format'
import { englishFormula, isFormula, italianFormula, normalizeFormula } from './formula'
import { isError, type Value } from './values'

/** Le celle si scrivono all'inglese (Glifo in inglese): il punto per i decimali, la virgola tra gli argomenti. */
export function englishTyping(): boolean {
  return !usesDecimalComma()
}

/** Lo stesso testo (un testo letto all'altra maniera potrebbe essere un numero o VERO). */
const sameText = (a: Value, b: Value) => typeof a === 'string' && a === b

/** Il contenuto di una cella della nota scritto come lo scrive l'Excel inglese: «1,50 €» → «€1.50». */
export function englishInput(stored: string): string {
  if (isFormula(stored)) return englishFormula(stored)
  const s = stored.trim()
  if (!s || s.startsWith("'")) return s
  const { value } = readInput(s)
  if (typeof value === 'boolean') return booleanText(value, ENGLISH)
  if (isError(value)) return errorText(value.error, ENGLISH)
  if (typeof value === 'number') return englishNumber(s) ?? s
  // Un testo che all'inglese sembrerebbe altro (TRUE, 1,234.5) prende l'apostrofo.
  return sameText(readEnglishInput(s).value, value) ? s : `'${s}`
}

/** Quello che si è scritto all'inglese in una cella, come va nella nota: «€1.50» → «1,50 €». */
export function italianInput(typed: string): string {
  if (isFormula(typed)) return italianFormula(typed)
  const s = typed.trim()
  if (!s || s.startsWith("'")) return s
  const { value } = readEnglishInput(s)
  if (typeof value === 'boolean') return booleanText(value, ITALIAN)
  if (isError(value)) return value.error
  if (typeof value === 'number') return italianNumber(s) ?? s
  // Un testo che all'italiana sarebbe altro (3,5 è un numero, VERO un valore logico) prende l'apostrofo.
  return sameText(readInput(s).value, value) ? s : `'${s}`
}

/** Il contenuto di una cella come si vede mentre si scrive, nella lingua di Glifo. */
export function shownInput(stored: string): string {
  return englishTyping() ? englishInput(stored) : stored
}

/** Quello che si è scritto in una cella, come va nella nota: in italiano com'è (le formule riscritte come Excel). */
export function storedInput(typed: string): string {
  if (englishTyping()) return italianInput(typed)
  return isFormula(typed) ? normalizeFormula(typed) : typed.trim()
}
