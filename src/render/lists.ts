import type { StateBlock, Token } from 'markdown-it'
import { bulletGroup, readMarker, resolveMarker, sameList, type Marker } from '../lists/markers'

/**
 * Regola degli elenchi per l'anteprima. È quella di markdown-it (CommonMark)
 * con due differenze:
 *
 * - riconosce anche i marcatori di Glifo: a), (a), i), ii), es), oss), •, . …
 * - il rientro è più comodo: una riga più rientrata del marcatore sta dentro
 *   l'elemento anche se non arriva fino all'inizio del testo (con quattro
 *   spazi per livello va sempre bene, qualunque sia la larghezza del marcatore).
 *
 * I blocchi di codice rientrati sono disattivati (il codice si scrive tra ```),
 * così i rientri servono solo agli elenchi.
 */

interface Found {
  marker: Marker
  /** Posizione subito dopo il marcatore. */
  pos: number
}

function findMarker(state: StateBlock, line: number): Found | null {
  const start = state.bMarks[line] + state.tShift[line]
  // I marcatori sono corti: bastano pochi caratteri, compreso quello che segue.
  const marker = readMarker(state.src.slice(start, Math.min(state.eMarks[line], start + 12)))
  return marker ? { marker, pos: start + marker.text.length } : null
}

function isOrdered(m: Marker): boolean {
  return m.kind === 'number' || m.kind === 'letter' || m.kind === 'roman'
}

function listAttrs(token: Token, m: Marker): void {
  if (isOrdered(m)) {
    if (m.value !== 1) token.attrSet('start', String(m.value))
    if (m.kind !== 'number') token.attrSet('type', m.kind === 'letter' ? (m.upper ? 'A' : 'a') : m.upper ? 'I' : 'i')
    if (m.style !== 'dot') {
      const counter = m.kind === 'number' ? 'decimal' : `${m.upper ? 'upper' : 'lower'}-${m.kind === 'letter' ? 'alpha' : 'roman'}`
      token.attrSet('class', `ol-${counter}-${m.style}`)
    }
  } else if (m.kind === 'label') {
    token.attrSet('class', 'ul-labels')
  } else if (m.text === '-') {
    token.attrSet('class', 'ul-dash')
  } else if (bulletGroup(m.text) === '•') {
    token.attrSet('class', 'ul-dot')
  }
}

/**
 * Sposta idealmente alla colonna del testo le righe più rientrate del
 * marcatore ma meno del testo, così fanno parte dell'elemento. Restituisce la
 * funzione che rimette i valori originali.
 */
function alignInside(state: StateBlock, from: number, endLine: number, markerIndent: number, contentIndent: number): () => void {
  const changed: [number, number][] = []
  for (let line = from; line < endLine; line++) {
    if (state.isEmpty(line)) continue
    const s = state.sCount[line]
    if (s <= markerIndent) break
    if (s < contentIndent) {
      changed.push([line, s])
      state.sCount[line] = contentIndent
    }
  }
  return () => {
    for (const [line, s] of changed) state.sCount[line] = s
  }
}

function markTightParagraphs(state: StateBlock, idx: number): void {
  const level = state.level + 2
  for (let i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
      state.tokens[i + 2].hidden = true
      state.tokens[i].hidden = true
      i += 2
    }
  }
}

export function listRule(state: StateBlock, startLine: number, endLine: number, silent: boolean): boolean {
  let nextLine = startLine
  let tight = true

  // Dentro un paragrafo, un elenco lo interrompe solo se non è vuoto e, se è
  // numerato, se parte da 1, a o i (come in CommonMark per i numeri).
  const isTerminatingParagraph = silent && state.parentType === 'paragraph' && state.sCount[nextLine] >= state.blkIndent

  const first = findMarker(state, nextLine)
  if (!first) return false
  const listMarker = resolveMarker(first.marker, null)
  let posAfterMarker = first.pos
  if (isTerminatingParagraph) {
    if (isOrdered(listMarker) && listMarker.value !== 1) return false
    if (state.skipSpaces(posAfterMarker) >= state.eMarks[nextLine]) return false
  }
  if (silent) return true

  const ordered = isOrdered(listMarker)
  const listTokIdx = state.tokens.length
  let token = state.push(ordered ? 'ordered_list_open' : 'bullet_list_open', ordered ? 'ol' : 'ul', 1)
  listAttrs(token, listMarker)
  const listLines: [number, number] = [nextLine, 0]
  token.map = listLines
  token.markup = listMarker.text

  let itemMarker = listMarker
  let prevEmptyEnd = false
  const terminatorRules = state.md.block.ruler.getRules('list')
  const oldParentType = state.parentType
  state.parentType = 'list'

  while (nextLine < endLine) {
    let pos = posAfterMarker
    const max = state.eMarks[nextLine]
    const initial = state.sCount[nextLine] + posAfterMarker - (state.bMarks[nextLine] + state.tShift[nextLine])
    let offset = initial
    while (pos < max) {
      const ch = state.src.charCodeAt(pos)
      if (ch === 0x09) offset += 4 - ((offset + state.bsCount[nextLine]) % 4)
      else if (ch === 0x20) offset++
      else break
      pos++
    }
    const contentStart = pos
    let indentAfterMarker = contentStart >= max ? 1 : offset - initial
    if (indentAfterMarker > 4) indentAfterMarker = 1
    const indent = initial + indentAfterMarker

    token = state.push('list_item_open', 'li', 1)
    token.markup = itemMarker.text
    if (ordered) token.info = String(itemMarker.value)
    // Le etichette («es)», «oss)») si vedono esattamente come sono scritte.
    if (itemMarker.kind === 'label') token.attrSet('style', `list-style-type: "${itemMarker.text} "`)
    const itemLines: [number, number] = [nextLine, 0]
    token.map = itemLines

    const restoreIndents = alignInside(state, nextLine + 1, endLine, state.sCount[nextLine], indent)
    const oldTight = state.tight
    const oldTShift = state.tShift[nextLine]
    const oldSCount = state.sCount[nextLine]
    const oldListIndent = state.listIndent
    state.listIndent = state.blkIndent
    state.blkIndent = indent
    state.tight = true
    state.tShift[nextLine] = contentStart - state.bMarks[nextLine]
    state.sCount[nextLine] = offset

    if (contentStart >= max && state.isEmpty(nextLine + 1)) {
      state.line = Math.min(state.line + 2, endLine)
    } else {
      state.md.block.tokenize(state, nextLine, endLine)
    }
    if (!state.tight || prevEmptyEnd) tight = false
    prevEmptyEnd = state.line - nextLine > 1 && state.isEmpty(state.line - 1)

    state.blkIndent = state.listIndent
    state.listIndent = oldListIndent
    state.tShift[nextLine] = oldTShift
    state.sCount[nextLine] = oldSCount
    state.tight = oldTight
    restoreIndents()

    token = state.push('list_item_close', 'li', -1)
    token.markup = itemMarker.text
    nextLine = state.line
    itemLines[1] = nextLine
    if (nextLine >= endLine) break
    if (state.sCount[nextLine] < state.blkIndent) break

    let terminate = false
    for (const rule of terminatorRules) {
      if (rule(state, nextLine, endLine, true)) {
        terminate = true
        break
      }
    }
    if (terminate) break

    const next = findMarker(state, nextLine)
    if (!next) break
    const resolved = resolveMarker(next.marker, itemMarker)
    if (!sameList(listMarker, resolved)) break
    itemMarker = resolved
    posAfterMarker = next.pos
  }

  token = state.push(ordered ? 'ordered_list_close' : 'bullet_list_close', ordered ? 'ol' : 'ul', -1)
  token.markup = listMarker.text
  listLines[1] = nextLine
  state.line = nextLine
  state.parentType = oldParentType
  if (tight) markTightParagraphs(state, listTokIdx)
  return true
}

function asciiTrim(s: string): string {
  return s.replace(/^[\t\n\f\r ]+|[\t\n\f\r ]+$/g, '')
}

/**
 * La regola dei paragrafi di markdown-it, con una differenza: una riga molto
 * rientrata che inizia con un marcatore apre un elenco invece di continuare
 * il paragrafo (in CommonMark quel rientro vorrebbe dire «codice»).
 */
export function paragraphRule(state: StateBlock, startLine: number, endLine: number): boolean {
  const terminatorRules = state.md.block.ruler.getRules('paragraph')
  const oldParentType = state.parentType
  let nextLine = startLine + 1
  state.parentType = 'paragraph'
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    if (state.sCount[nextLine] < 0) continue
    if (state.sCount[nextLine] - state.blkIndent > 3) {
      if (listRule(state, nextLine, endLine, true)) break
      continue
    }
    let terminate = false
    for (const rule of terminatorRules) {
      if (rule(state, nextLine, endLine, true)) {
        terminate = true
        break
      }
    }
    if (terminate) break
  }
  const content = asciiTrim(state.getLines(startLine, nextLine, state.blkIndent, false))
  state.line = nextLine
  const open = state.push('paragraph_open', 'p', 1)
  open.map = [startLine, state.line]
  const inline = state.push('inline', '', 0)
  inline.content = content
  inline.map = [startLine, state.line]
  inline.children = []
  state.push('paragraph_close', 'p', -1)
  state.parentType = oldParentType
  return true
}
