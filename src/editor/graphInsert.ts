import { syntaxTree } from '@codemirror/language'
import { EditorSelection } from '@codemirror/state'
import type { EditorView } from '@codemirror/view'
import { formulaGraph, formulaGraphLine, graphBlockText, graphNames } from '../graph/spec'
import type { Lang } from '../i18n'
import { calculationRequest } from '../math/sheet'
import { graphKeyLine, parseGraphKey, type GraphKey } from '../noteWords'
import { sheetBefore } from './calcResults'
import { mathRegionAt } from './mathContext'

/**
 * La formula sotto il cursore, se è una funzione da disegnare (y = …, f(x) = …) o un integrale (la
 * sua area): la riga per il blocco ```grafico e le definizioni della nota scritte prima, che usa.
 */
export function formulaAtCursor(view: EditorView): { tex: string; defs: string[]; to: number } | null {
  const { state } = view
  const head = state.selection.main.head
  const region = mathRegionAt(state, head)
  if (!region || !region.closed || head < region.contentFrom || head > region.contentTo) return null
  const sheet = sheetBefore(state, region.from)
  const tex = formulaGraphLine(region.tex)
  const defs = sheet.definitionsFor(graphNames(tex))
  if (formulaGraph(tex, defs)) return { tex, defs, to: region.to }
  // Un conto con i numeri complessi (1 + i =, \sqrt[3]{8i} =): il numero prima dell'uguale.
  const request = calculationRequest(tex)?.trim()
  if (!request) return null
  const requestDefs = sheet.definitionsFor(graphNames(request))
  return formulaGraph(request, requestDefs) ? { tex: request, defs: requestDefs, to: region.to } : null
}

/**
 * Mette un blocco ```grafico nella nota, su righe sue dopo quella del cursore (o della formula, o
 * del blocco di codice in cui si trova). Con `line` il grafico è già pronto e il cursore va dopo;
 * senza, il blocco ha `y = ` e il cursore resta lì, per scrivere la funzione.
 */
export function insertGraphBlock(view: EditorView, line: string | null, after?: number): void {
  const { state } = view
  let pos = after ?? state.selection.main.head
  // Mai dentro un altro blocco di codice (o un altro grafico): dopo.
  for (let node = syntaxTree(state).resolveInner(pos, -1); node.parent; node = node.parent) {
    if (node.name === 'FencedCode' || node.name === 'BlockMath') pos = Math.max(pos, node.to)
  }
  const anchor = state.doc.lineAt(pos)
  const empty = !anchor.text.trim()
  const from = empty ? anchor.from : anchor.to
  // Una riga vuota prima del blocco (se la riga vuota del cursore non ce l'ha già sopra).
  const above = empty && anchor.number > 1 ? state.doc.line(anchor.number - 1).text.trim() : ''
  const prefix = empty ? (above ? '\n' : '') : '\n\n'
  const body = line ?? 'y = '
  const block = graphBlockText([body])
  const insert = `${prefix}${block}\n`
  // Senza funzione il cursore va dopo `y = `, sulla riga sotto quella che apre il blocco.
  const cursor = line === null ? from + prefix.length + block.indexOf('\n') + 1 + body.length : from + insert.length
  view.dispatch({
    changes: { from, insert },
    selection: EditorSelection.cursor(Math.min(cursor, state.doc.length + insert.length)),
    scrollIntoView: true,
    userEvent: 'input',
  })
  view.focus()
}

/**
 * «Aggiungi lo slider per k» nell'anteprima: le righe `text` (k = 1) all'inizio del blocco
 * ```grafico che apre alla riga `line` (da 0). Se lì non c'è più quel blocco, niente.
 */
export function addToGraphBlock(view: EditorView, line: number, text: string): boolean {
  const { doc } = view.state
  if (!text || line < 0 || line >= doc.lines) return false
  const fence = doc.line(line + 1)
  const m = /^([ \t]*)(?:`{3,}|~{3,})[ \t]*(?:grafico|graph)[ \t]*$/i.exec(fence.text)
  if (!m) return false
  const lines = text.split('\n').map((t) => m[1] + t)
  const changes =
    line + 1 < doc.lines ? { from: doc.line(line + 2).from, insert: lines.join('\n') + '\n' } : { from: fence.to, insert: '\n' + lines.join('\n') }
  view.dispatch({ changes, userEvent: 'input' })
  return true
}

/** Il titolo e i nomi degli assi da scrivere in un blocco ```grafico (vuoto: la riga si toglie). */
export interface GraphLabelLines {
  title: string
  x: string
  y: string
  z?: string
}

/** La parola di ogni riga: `titolo:`, `asse x:`… (in inglese `title:`, `x axis:`…; src/noteWords.ts). */
const LABEL_KEYS = { title: 'titolo', x: 'asse x', y: 'asse y', z: 'asse z' } as const satisfies Record<keyof GraphLabelLines, GraphKey>

/**
 * «Titolo e nomi degli assi…» nell'anteprima: nel blocco ```grafico che apre alla riga `line` (da 0)
 * le righe `titolo: …` e `asse x: …` cambiano, si aggiungono all'inizio (nell'ordine titolo, x, y, z)
 * o, se il campo è vuoto, si tolgono. Una riga nuova ha la parola della lingua di Glifo (`title:` in
 * inglese); una che c'è già resta nella sua lingua (`titolo:` resta `titolo:`). Se lì non c'è più quel
 * blocco, niente.
 */
export function setGraphLabels(view: EditorView, line: number, labels: GraphLabelLines): boolean {
  const { doc } = view.state
  if (line < 0 || line >= doc.lines) return false
  const fence = doc.line(line + 1)
  const m = /^([ \t]*)(`{3,}|~{3,})[ \t]*(?:grafico|graph)[ \t]*$/i.exec(fence.text)
  if (!m) return false
  const indent = m[1]
  const wanted: [name: keyof GraphLabelLines, value: string][] = [
    ['title', labels.title],
    ['x', labels.x],
    ['y', labels.y],
  ]
  if (labels.z !== undefined) wanted.push(['z', labels.z])
  const changes: { from: number; to?: number; insert?: string }[] = []
  /** Le righe che ci sono già, per ogni parola, con la lingua in cui sono scritte. */
  const rows = new Map<GraphKey, { from: number; to: number; lang: Lang }>()
  const keys = new Set<GraphKey>(Object.values(LABEL_KEYS))
  for (let n = line + 2; n <= doc.lines; n++) {
    const row = doc.line(n)
    if (/^[ \t]*(`{3,}|~{3,})[ \t]*$/.test(row.text) && row.text.trim().startsWith(m[2][0])) break
    const label = parseGraphKey(row.text)
    if (label && keys.has(label.key) && !rows.has(label.key)) rows.set(label.key, { from: row.from, to: row.to, lang: label.lang })
  }
  const start = line + 1 < doc.lines ? doc.line(line + 2).from : null
  wanted.forEach(([name, value], i) => {
    const key = LABEL_KEYS[name]
    const row = rows.get(key)
    if (row) {
      // Cambia, con la parola nella sua lingua, o (vuota) si toglie con il suo a capo.
      changes.push(value ? { from: row.from, to: row.to, insert: indent + graphKeyLine(key, value, row.lang) } : { from: row.from, to: Math.min(row.to + 1, doc.length) })
      return
    }
    if (!value) return
    const text = graphKeyLine(key, value)
    // Dopo la riga di quella che viene prima (titolo, x, y, z), se c'è; se no all'inizio del blocco.
    const before = wanted.slice(0, i).reverse().map(([k]) => rows.get(LABEL_KEYS[k])).find((r) => r)
    if (before) changes.push({ from: Math.min(before.to + 1, doc.length), insert: indent + text + '\n' })
    else if (start !== null) changes.push({ from: start, insert: indent + text + '\n' })
    else changes.push({ from: fence.to, insert: '\n' + indent + text })
  })
  if (!changes.length) return true
  view.dispatch({ changes, userEvent: 'input' })
  return true
}
