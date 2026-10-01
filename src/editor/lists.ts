import { syntaxTree } from '@codemirror/language'
import type { SyntaxNode } from '@lezer/common'
import type { MarkdownConfig } from '@lezer/markdown'
import { EditorSelection, type ChangeSpec, type EditorState, type Line, type Range } from '@codemirror/state'
import { Decoration, ViewPlugin, type DecorationSet, type EditorView, type ViewUpdate } from '@codemirror/view'
import {
  bullet,
  childMarker,
  firstMarker,
  label,
  nextMarker,
  numbered,
  parseListLine,
  resolveMarker,
  sameList,
  withValue,
  type ListLine,
  type Marker,
} from '../lists/markers'
import type { CommandTarget } from './placeholders'
import { besideSchema, schemaBlockRanges } from './schemaBlocks'

/**
 * Elenchi nell'editor, con tutti i marcatori di Glifo (1), a), i), es), -, •…):
 *
 * - Invio continua l'elenco con il marcatore successivo; su un elemento vuoto
 *   torna al livello di sopra o, al primo livello, chiude l'elenco;
 * - Tab sposta l'elemento dentro quello precedente, con il testo allineato
 *   (1) → a) → i) come nei programmi di scrittura); Maiusc+Tab lo riporta fuori;
 * - Backspace subito dopo il marcatore lo toglie.
 *
 * Gli elementi figli si spostano insieme al genitore e i numeri si aggiornano.
 */

/** Niente blocchi di codice rientrati: il rientro serve agli elenchi (il codice va tra ```). */
export const noIndentedCode: MarkdownConfig = { remove: ['IndentedCode'] }

/** Dove un marcatore non è un marcatore: codice, formule a blocco, HTML. */
const NOT_LISTS = new Set(['FencedCode', 'CodeBlock', 'BlockMath', 'HTMLBlock', 'CommentBlock'])

export function inListContext(state: EditorState, pos: number): boolean {
  for (let node: SyntaxNode | null = syntaxTree(state).resolveInner(pos, 1); node; node = node.parent) {
    if (NOT_LISTS.has(node.name)) return false
  }
  return true
}

interface Item {
  line: Line
  m: ListLine
}

function itemAt(state: EditorState, lineNo: number): Item | null {
  const line = state.doc.line(lineNo)
  const m = parseListLine(line.text)
  return m && inListContext(state, line.from) ? { line, m } : null
}

/** Colonna del primo carattere non vuoto; null per le righe vuote. */
function indentOf(text: string): number | null {
  if (!text.trim()) return null
  let col = 0
  for (const ch of text) {
    if (ch === ' ') col++
    else if (ch === '\t') col += 4 - (col % 4)
    else break
  }
  return col
}

function isBlank(state: EditorState, lineNo: number): boolean {
  return lineNo < 1 || !state.doc.line(lineNo).text.trim()
}

/** L'elemento precedente allo stesso livello (null se è il primo dell'elenco). */
function previousSibling(state: EditorState, lineNo: number, indent: number): Item | null {
  for (let n = lineNo - 1; n >= 1; n--) {
    const ind = indentOf(state.doc.line(n).text)
    if (ind === null || ind > indent) continue
    const item = itemAt(state, n)
    if (item) return item.m.indent === indent ? item : null
    if (ind < indent) return null
    // Testo allo stesso rientro: continua l'elemento sopra, se è attaccato.
    if (isBlank(state, n - 1)) return null
  }
  return null
}

/** L'elemento che contiene questo (null al primo livello). */
function parentItem(state: EditorState, lineNo: number, indent: number): Item | null {
  for (let n = lineNo - 1; n >= 1; n--) {
    const ind = indentOf(state.doc.line(n).text)
    if (ind === null || ind >= indent) continue
    const item = itemAt(state, n)
    if (item) return item
    if (isBlank(state, n - 1)) return null
  }
  return null
}

/** Ultima riga dell'elemento: il testo che continua e gli elementi figli. */
function itemEnd(state: EditorState, lineNo: number, indent: number): number {
  let end = lineNo
  for (let n = lineNo + 1; n <= state.doc.lines; n++) {
    const ind = indentOf(state.doc.line(n).text)
    if (ind === null) continue
    if (ind <= indent && (itemAt(state, n) || isBlank(state, n - 1))) break
    end = n
  }
  return end
}

/** Gli elementi che seguono nello stesso elenco. */
function followingSiblings(state: EditorState, lineNo: number, list: Marker, indent: number): Item[] {
  const out: Item[] = []
  let prev = list
  for (let n = itemEnd(state, lineNo, indent) + 1; n <= state.doc.lines; ) {
    if (isBlank(state, n)) {
      n++
      continue
    }
    const item = itemAt(state, n)
    if (!item || item.m.indent !== indent) break
    const resolved = resolveMarker(item.m, prev)
    if (!sameList(list, resolved)) break
    out.push(item)
    prev = resolved
    n = itemEnd(state, n, indent) + 1
  }
  return out
}

function isNumbered(m: Marker): boolean {
  return m.kind === 'number' || m.kind === 'letter' || m.kind === 'roman'
}

/** Il marcatore dell'elemento, deciso guardando quello precedente (per i/v/x). */
function resolvedAt(state: EditorState, item: Item): Marker {
  const prev = previousSibling(state, item.line.number, item.m.indent)
  return resolveMarker(item.m, prev ? resolveMarker(prev.m, null) : null)
}

/** Sostituisce rientro e marcatore di un elemento. */
function setPrefix(item: Item, indent: number, marker: Marker, changes: ChangeSpec[]): void {
  changes.push({ from: item.line.from, to: item.line.from + item.m.indentLength + item.m.text.length, insert: ' '.repeat(indent) + marker.text })
}

/** Sposta il rientro di una riga di `delta` colonne. */
function shiftLine(line: Line, delta: number, changes: ChangeSpec[]): void {
  const ind = indentOf(line.text)
  if (ind === null) return
  const ws = /^[ \t]*/.exec(line.text)![0].length
  changes.push({ from: line.from, to: line.from + ws, insert: ' '.repeat(Math.max(0, ind + delta)) })
}

/** Rinumera gli elementi a partire da `value` (solo dove il numero cambia). */
function renumber(items: Item[], list: Marker, value: number, changes: ChangeSpec[]): void {
  if (!isNumbered(list)) return
  for (const item of items) {
    const want = withValue(list, value++)
    if (want.text !== item.m.text) {
      const from = item.line.from + item.m.indentLength
      changes.push({ from, to: from + item.m.text.length, insert: want.text })
    }
  }
}

/** Gli elementi allo stesso livello del primo, dalla sua riga fino a `lastLine`. */
function itemsInRange(state: EditorState, first: Item, lastLine: number): Item[] {
  const items = [first]
  for (let n = itemEnd(state, first.line.number, first.m.indent) + 1; n <= lastLine; ) {
    if (isBlank(state, n)) {
      n++
      continue
    }
    const item = itemAt(state, n)
    if (!item || item.m.indent !== first.m.indent) break
    items.push(item)
    n = itemEnd(state, n, first.m.indent) + 1
  }
  return items
}

/** Invio: continua l'elenco con il marcatore successivo. */
export function continueList(target: CommandTarget): boolean {
  const { state } = target
  const sel = state.selection
  if (sel.ranges.length !== 1 || !sel.main.empty) return false
  const pos = sel.main.head
  const line = state.doc.lineAt(pos)
  const item = itemAt(state, line.number)
  if (!item || pos < line.from + item.m.contentStart) return false
  const { m } = item
  if (!line.text.slice(m.contentStart).trim()) return endEmptyItem(target, item)

  const current = resolvedAt(state, item)
  const next = nextMarker(current)
  const prefix = line.text.slice(0, m.indentLength) + next.text + ' ' + (m.task ? '[ ] ' : '')
  // Il testo dopo il cursore passa nel nuovo elemento, senza spazi davanti.
  let after = pos
  while (after < line.to && /[ \t]/.test(state.sliceDoc(after, after + 1))) after++
  const changes: ChangeSpec[] = [{ from: pos, to: after, insert: '\n' + prefix }]
  renumber(followingSiblings(state, line.number, current, m.indent), current, next.value + 1, changes)
  target.dispatch({
    changes,
    selection: EditorSelection.cursor(pos + 1 + prefix.length),
    scrollIntoView: true,
    userEvent: 'input',
  })
  return true
}

/** Invio su un elemento vuoto: torna al livello di sopra, o chiude l'elenco. */
function endEmptyItem(target: CommandTarget, item: Item): boolean {
  const { state } = target
  if (item.m.indent > 0 && parentItem(state, item.line.number, item.m.indent)) return outdentListItems(target)
  // Al primo livello: via il marcatore e una riga vuota, così l'elenco finisce davvero.
  target.dispatch({
    changes: { from: item.line.from, to: item.line.to, insert: '\n' },
    selection: EditorSelection.cursor(item.line.from + 1),
    scrollIntoView: true,
    userEvent: 'input',
  })
  return true
}

/** Tab: sposta gli elementi selezionati dentro quello precedente. */
export function indentListItems(target: CommandTarget): boolean {
  const { state } = target
  const { from, to } = state.selection.main
  const first = itemAt(state, state.doc.lineAt(from).number)
  if (!first) return false
  const prev = previousSibling(state, first.line.number, first.m.indent)
  // Il primo elemento di un elenco non ha dove entrare: il tasto non fa nulla.
  if (!prev) return true

  // Se l'elemento sopra ha già dei figli, ci si aggiunge in fondo; altrimenti inizia
  // un sotto-elenco allineato al suo testo.
  let lastChild: Item | null = null
  for (let n = prev.line.number + 1; n < first.line.number; n++) {
    const child = itemAt(state, n)
    if (child && child.m.indent > prev.m.indent && (!lastChild || child.m.indent <= lastChild.m.indent)) lastChild = child
  }
  const indent = lastChild ? lastChild.m.indent : prev.m.contentColumn
  let marker = lastChild ? nextMarker(resolvedAt(state, lastChild)) : childMarker(resolvedAt(state, first))

  const items = itemsInRange(state, first, state.doc.lineAt(to).number)
  const last = items[items.length - 1]
  const end = itemEnd(state, last.line.number, first.m.indent)
  const delta = indent - first.m.indent
  const changes: ChangeSpec[] = []
  const moved = new Set(items.map((i) => i.line.number))
  for (let n = first.line.number; n <= end; n++) {
    const line = state.doc.line(n)
    if (moved.has(n)) {
      setPrefix({ line, m: parseListLine(line.text)! }, indent, marker, changes)
      marker = nextMarker(marker)
    } else {
      shiftLine(line, delta, changes)
    }
  }
  // Gli elementi che seguivano ora vengono subito dopo quello sopra.
  const list = resolvedAt(state, prev)
  renumber(followingSiblings(state, last.line.number, list, first.m.indent), list, list.value + 1, changes)
  target.dispatch({ changes, scrollIntoView: true, userEvent: 'input.indent' })
  return true
}

/** Maiusc+Tab: riporta gli elementi selezionati al livello di sopra. */
export function outdentListItems(target: CommandTarget): boolean {
  const { state } = target
  const { from, to } = state.selection.main
  const first = itemAt(state, state.doc.lineAt(from).number)
  if (!first) return false
  const parent = first.m.indent > 0 ? parentItem(state, first.line.number, first.m.indent) : null
  if (!parent) return true

  const parentMarker = resolvedAt(state, parent)
  let marker = nextMarker(parentMarker)
  const items = itemsInRange(state, first, state.doc.lineAt(to).number)
  const last = items[items.length - 1]
  const end = itemEnd(state, last.line.number, first.m.indent)
  const delta = parent.m.indent - first.m.indent
  const changes: ChangeSpec[] = []
  const moved = new Set(items.map((i) => i.line.number))
  for (let n = first.line.number; n <= end; n++) {
    const line = state.doc.line(n)
    if (moved.has(n)) {
      setPrefix({ line, m: parseListLine(line.text)! }, parent.m.indent, marker, changes)
      marker = nextMarker(marker)
    } else {
      shiftLine(line, delta, changes)
    }
  }
  const lastMoved = withValue(marker, marker.value - 1)
  // Gli elementi che seguivano allo stesso livello diventano figli dell'ultimo
  // spostato: ricominciano da capo.
  const oldList = resolvedAt(state, last)
  const orphans = followingSiblings(state, last.line.number, oldList, first.m.indent)
  if (orphans.length) renumber(orphans, firstMarker(resolvedAt(state, orphans[0])), 1, changes)
  // Gli elementi dopo il genitore si spostano in avanti.
  renumber(followingSiblings(state, parent.line.number, parentMarker, parent.m.indent), parentMarker, lastMoved.value + 1, changes)
  target.dispatch({ changes, scrollIntoView: true, userEvent: 'input.indent' })
  return true
}

/** Backspace subito dopo il marcatore: lo toglie, il testo resta dov'è. */
export function deleteListMarker(target: CommandTarget): boolean {
  const { state } = target
  const sel = state.selection
  if (sel.ranges.length !== 1 || !sel.main.empty) return false
  const line = state.doc.lineAt(sel.main.head)
  const item = itemAt(state, line.number)
  if (!item || sel.main.head !== line.from + item.m.contentStart) return false
  target.dispatch({
    changes: { from: line.from + item.m.indentLength, to: line.from + item.m.contentStart },
    scrollIntoView: true,
    userEvent: 'delete.backward',
  })
  return true
}

export interface ListStyle {
  marker: Marker
  task?: boolean
}

/**
 * Trasforma le righe selezionate in un elenco del tipo scelto (o toglie
 * l'elenco, se sono già tutte di quel tipo). Ogni livello di rientro ha la
 * sua numerazione.
 */
export function applyListStyle(target: CommandTarget, style: ListStyle): void {
  const { state } = target
  const sel = state.selection.main
  const firstNo = state.doc.lineAt(sel.from).number
  const lastNo = state.doc.lineAt(sel.to).number
  // Le righe di uno schema restano come sono: col cursore sul suo bordo, l'elenco comincia su una riga nuova lì accanto.
  const blocks = schemaBlockRanges(state)
  const lines: Line[] = []
  for (let n = firstNo; n <= lastNo; n++) {
    const line = state.doc.line(n)
    if (blocks.some((b) => line.from >= b.from && line.to <= b.to)) continue
    if (line.text.trim() || firstNo === lastNo) lines.push(line)
  }
  if (!lines.length) {
    const beside = besideSchema(state, `${withValue(style.marker, 1).text} ${style.task ? '[ ] ' : ''}`)
    if (beside) target.dispatch(beside)
    return
  }
  const matches = (line: Line) => {
    const m = parseListLine(line.text)
    return !!m && sameList(style.marker, resolveMarker(m, null)) && !!m.task === !!style.task
  }
  const changes: ChangeSpec[] = []
  if (lines.every(matches)) {
    for (const line of lines) {
      const m = parseListLine(line.text)!
      changes.push({ from: line.from + m.indentLength, to: line.from + m.contentStart })
    }
  } else {
    const counters = new Map<number, number>()
    for (const line of lines) {
      const m = parseListLine(line.text)
      const indentLength = m ? m.indentLength : /^[ \t]*/.exec(line.text)![0].length
      const indent = m ? m.indent : (indentOf(line.text) ?? 0)
      for (const level of [...counters.keys()]) if (level > indent) counters.delete(level)
      let value = counters.get(indent)
      if (value === undefined) {
        // Continua l'elenco appena sopra, se è dello stesso tipo.
        const prev = previousSibling(state, line.number, indent)
        value = prev && sameList(style.marker, resolveMarker(prev.m, null)) ? resolveMarker(prev.m, null).value + 1 : 1
      }
      counters.set(indent, value + 1)
      const marker = withValue(style.marker, value)
      const box = style.task ? '[ ] ' : ''
      changes.push({
        from: line.from + indentLength,
        to: line.from + (m ? m.contentStart : indentLength),
        insert: `${marker.text} ${box}`,
      })
    }
  }
  target.dispatch({ changes, scrollIntoView: true, userEvent: 'input' })
}

/** Gli stili del menu degli elenchi. */
export const LIST_STYLES: { label: string; example: string; style: ListStyle }[] = [
  { label: 'Numeri', example: '1)', style: { marker: numbered('number', 1, 'paren') } },
  { label: 'Numeri con il punto', example: '1.', style: { marker: numbered('number', 1, 'dot') } },
  { label: 'Lettere', example: 'a)', style: { marker: numbered('letter', 1, 'paren') } },
  { label: 'Lettere maiuscole', example: 'A)', style: { marker: numbered('letter', 1, 'paren', true) } },
  { label: 'Numeri romani', example: 'i)', style: { marker: numbered('roman', 1, 'paren') } },
  { label: 'Esempi', example: 'es)', style: { marker: label('es)') } },
  { label: 'Trattini', example: '–', style: { marker: bullet('-') } },
  { label: 'Pallini', example: '•', style: { marker: bullet('*') } },
  { label: 'Cose da fare', example: '☐', style: { marker: bullet('-'), task: true } },
]

const markerMark = Decoration.mark({ class: 'cm-list-mark' })
const labelMark = Decoration.mark({ class: 'cm-list-mark cm-list-label' })

/** Colora i marcatori degli elenchi, anche quelli che il Markdown standard non conosce. */
export const listMarkers = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet

    constructor(view: EditorView) {
      this.decorations = this.build(view)
    }

    update(u: ViewUpdate): void {
      if (u.docChanged || u.viewportChanged || syntaxTree(u.startState) !== syntaxTree(u.state)) this.decorations = this.build(u.view)
    }

    build(view: EditorView): DecorationSet {
      const { state } = view
      const marks: Range<Decoration>[] = []
      let next = 0
      for (const { from, to } of view.visibleRanges) {
        for (let pos = Math.max(from, next); pos <= to; ) {
          const line = state.doc.lineAt(pos)
          const m = parseListLine(line.text)
          if (m && inListContext(state, line.from)) {
            const start = line.from + m.indentLength
            marks.push((m.kind === 'label' ? labelMark : markerMark).range(start, start + m.text.length))
          }
          pos = next = line.to + 1
        }
      }
      return Decoration.set(marks, true)
    }
  },
  { decorations: (v) => v.decorations },
)
