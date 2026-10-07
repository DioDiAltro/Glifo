import { escapeHtml, renderTexMathml, renderTexOrError } from '../render/katex'
import { matchInlineMath } from '../render/mathDelims'
import { laneHeadFor, laneNames, parseTable, tableMetricsFor } from './model'

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
 * Il testo di una tabella: la prima riga è il nome, le altre i campi, uno per riga. «PK» e «FK»
 * all'inizio di un campo lo segnano come chiave primaria (sottolineata) o esterna, anche tutte e
 * due; il tipo, dopo i due punti, sta a destra, più chiaro. Le altezze sono quelle con cui la
 * forma disegna la fascia del nome (tableMetricsFor).
 */
export function tableHtml(text: string, fontSize: number, mathml = false): string {
  const { head, row } = tableMetricsFor(fontSize)
  const { name, fields } = parseTable(text)
  // Se c'è almeno una chiave, i nomi dei campi stanno tutti in colonna dopo «PK» e «FK».
  const tags = fields.some((f) => f.pk || f.fk)
  const width = fields.some((f) => f.pk && f.fk) ? 4.2 : 2.4
  const rows = fields.map((f) => {
    const keys = [f.pk ? 'PK' : '', f.fk ? 'FK' : ''].filter(Boolean).join(' ')
    const tag = tags ? `<span style="flex:none;width:${width}em;font-size:0.72em;font-weight:700;opacity:0.7">${keys}</span>` : ''
    const body = labelHtml(f.name, mathml)
    const type = f.type ? `<span style="flex:none;margin-left:8px;font-size:0.8em;opacity:0.6">${labelHtml(f.type, mathml)}</span>` : ''
    return `<div style="display:flex;align-items:baseline;height:${row}px;line-height:${row}px;padding:0 8px;text-align:left;white-space:nowrap">${tag}<span style="flex:1;min-width:0;${LINE}">${f.pk ? `<u>${body}</u>` : body}</span>${type}</div>`
  })
  const title = `<div style="height:${head}px;line-height:${head}px;padding:0 8px;text-align:center;font-weight:600;${LINE}">${labelHtml(name, mathml)}</div>`
  return `${title}<div style="padding:5px 0">${rows.join('')}</div>`
}

/**
 * I nomi delle corsie, ognuno nella sua parte della fascia: in alto se le corsie sono in colonne, a
 * sinistra (scritti dal basso in alto, come nei diagrammi BPMN) se sono in righe. Lo spessore della
 * fascia è quello con cui la forma la disegna (laneHeadFor).
 */
export function lanesHtml(text: string, fontSize: number, rows: boolean, mathml = false): string {
  const head = laneHeadFor(fontSize)
  const cell = 'flex:1;min-width:0;min-height:0;display:flex;align-items:center;justify-content:center;overflow:hidden;font-weight:600;text-align:center'
  const names = laneNames(text).map((name) => {
    const body = labelHtml(name, mathml)
    return rows
      ? `<div style="${cell}"><div style="writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;line-height:1.2">${body}</div></div>`
      : `<div style="${cell};padding:0 6px;line-height:1.2">${body}</div>`
  })
  return rows
    ? `<div style="display:flex;flex-direction:column;width:${head}px;height:100%">${names.join('')}</div>`
    : `<div style="display:flex;width:100%;height:${head}px">${names.join('')}</div>`
}
