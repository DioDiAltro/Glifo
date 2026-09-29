import type { SymbolForm } from './types'

/**
 * Nei modelli dei simboli il carattere `#` indica un segnaposto
 * (un punto in cui il cursore salta premendo Tab). Per scrivere un `#`
 * vero si usa `\#`, come in LaTeX.
 */
export interface ParsedTemplate {
  /** Testo da inserire, senza i segnaposto. */
  text: string
  /** Posizioni (offset in `text`) dei segnaposto, in ordine. */
  slots: number[]
}

export function parseTemplate(template: string): ParsedTemplate {
  let text = ''
  const slots: number[] = []
  for (let i = 0; i < template.length; i++) {
    const ch = template[i]
    if (ch === '\\' && i + 1 < template.length) {
      // Sequenza di escape (\#, \\, \{ …): va copiata così com'è.
      text += ch + template[i + 1]
      i++
    } else if (ch === '#') {
      slots.push(text.length)
    } else {
      text += ch
    }
  }
  return { text, slots }
}

/** Il testo che verrà effettivamente inserito (senza `#`). */
export function templateText(template: string): string {
  return parseTemplate(template).text
}

/** Come appare il segnaposto nelle anteprime: tre puntini colorati. */
export const PLACEHOLDER_TEX = String.raw`\htmlClass{mh-ph}{\cdots}`

/** Sostituisce i segnaposto `#` con i tre puntini per l'anteprima. */
export function placeholderPreview(template: string): string {
  let out = ''
  for (let i = 0; i < template.length; i++) {
    const ch = template[i]
    if (ch === '\\' && i + 1 < template.length) {
      out += ch + template[i + 1]
      i++
    } else if (ch === '#') {
      out += `{${PLACEHOLDER_TEX}}`
    } else {
      out += ch
    }
  }
  return out
}

/** TeX da disegnare come anteprima di una variante. */
export function formPreviewTex(form: SymbolForm): string {
  return placeholderPreview(form.preview ?? form.tex)
}

/**
 * Anteprima per le schede del pannello: in stile "display", così per
 * esempio gli estremi della sommatoria compaiono sopra e sotto il simbolo.
 */
export function cardPreviewTex(form: SymbolForm): string {
  return `\\displaystyle ${formPreviewTex(form)}`
}
