import { escapeHtml, renderTexMathml, renderTexOrError } from '../render/katex'
import { matchInlineMath } from '../render/mathDelims'

/** Testo semplice in HTML: `\$` è un dollaro, gli a capo restano. */
function plainHtml(text: string): string {
  return escapeHtml(text.replace(/\\\$/g, '$')).replace(/\n/g, '<br>')
}

/**
 * Il testo di una forma o di una freccia in HTML: le formule tra `$…$` (o `$$…$$`) disegnate
 * con KaTeX, con le stesse regole delle note; tutto il resto è testo, mai codice HTML.
 * `mathml`: le formule solo in MathML, per le immagini che si leggono fuori da Glifo.
 */
export function labelHtml(text: string, mathml = false): string {
  const formula = mathml ? renderTexMathml : renderTexOrError
  let html = ''
  let plain = 0
  for (let i = text.indexOf('$'); i >= 0; i = text.indexOf('$', i)) {
    const m = matchInlineMath(text, i)
    if (!m) {
      i++
      continue
    }
    html += plainHtml(text.slice(plain, i)) + formula(text.slice(m.contentFrom, m.contentTo), m.display)
    plain = i = m.end
  }
  return html + plainHtml(text.slice(plain))
}
