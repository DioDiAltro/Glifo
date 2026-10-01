import { escapeHtml, renderTexMathml, renderTexOrError } from '../render/katex'
import { matchInlineMath } from '../render/mathDelims'
import { tableMetricsFor } from './model'

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

/** Una riga della tabella che non va a capo: se è troppo lunga finisce con «…». */
const LINE = 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis'

/**
 * Il testo di una tabella: la prima riga è il nome, le altre i campi, uno per riga. «PK» o «FK»
 * all'inizio di un campo lo segnano come chiave primaria (sottolineata) o esterna. Le altezze
 * sono quelle con cui la forma disegna la fascia del nome (tableMetricsFor).
 */
export function tableHtml(text: string, fontSize: number, mathml = false): string {
  const { head, row } = tableMetricsFor(fontSize)
  const [name = '', ...lines] = text.split('\n')
  const fields = lines.map((line) => {
    const m = /^\s*(PK|FK)\s+(.*)$/i.exec(line)
    return m ? { key: m[1].toUpperCase(), text: m[2] } : { key: '', text: line }
  })
  // Se c'è almeno una chiave, i nomi dei campi stanno tutti in colonna dopo «PK» e «FK».
  const tags = fields.some((f) => f.key)
  const rows = fields.map((f) => {
    const tag = tags ? `<span style="display:inline-block;width:2.4em;font-size:0.72em;font-weight:700;opacity:0.7">${f.key}</span>` : ''
    const body = labelHtml(f.text, mathml)
    return `<div style="height:${row}px;line-height:${row}px;padding:0 8px;text-align:left;${LINE}">${tag}${f.key === 'PK' ? `<u>${body}</u>` : body}</div>`
  })
  const title = `<div style="height:${head}px;line-height:${head}px;padding:0 8px;text-align:center;font-weight:600;${LINE}">${labelHtml(name, mathml)}</div>`
  return `${title}<div style="padding:5px 0">${rows.join('')}</div>`
}
