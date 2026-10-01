import { syntaxTree } from '@codemirror/language'
import type { EditorState } from '@codemirror/state'
import type { SyntaxNode } from '@lezer/common'
import { isEscaped } from '../render/mathDelims'

export interface MathRegion {
  /** Intera formula, delimitatori compresi. */
  from: number
  to: number
  /** Solo il contenuto, tra i delimitatori. */
  contentFrom: number
  contentTo: number
  display: boolean
  /** La formula ha il delimitatore di chiusura. */
  closed: boolean
  /** Il TeX della formula (senza i `>` delle citazioni). */
  tex: string
}

export interface CommandToken {
  /** Posizione della barra rovesciata. */
  from: number
  /** Fine del nome del comando (può superare il cursore). */
  to: number
  /** Lettere tra la barra e il cursore. */
  prefix: string
}

export interface EditorMathContext {
  pos: number
  /** La formula in cui si trova il cursore (o a cui è attaccato). */
  region: MathRegion | null
  /** Il cursore è dentro una formula (anche non ancora chiusa). */
  inMath: boolean
  /** Il cursore è in una formula `$$` aperta sulla riga ma non ancora chiusa. */
  openDisplay: boolean
  inCode: boolean
  token: CommandToken | null
}

const MATH_NODES = new Set(['InlineMath', 'BlockMath'])
const CODE_NODES = new Set(['FencedCode', 'CodeBlock', 'InlineCode', 'HTMLBlock', 'CommentBlock', 'Comment'])

export function regionFromNode(state: EditorState, node: SyntaxNode): MathRegion {
  const isBlock = node.name === 'BlockMath'
  const marks = node.getChildren(isBlock ? 'BlockMathMark' : 'InlineMathMark')
  const first = marks[0]
  const last = marks.length > 1 ? marks[marks.length - 1] : null
  const contentFrom = first ? first.to : node.from
  const contentTo = last ? last.from : node.to
  const display = isBlock || (first ? first.to - first.from === 2 : false)

  // Toglie i marcatori delle citazioni (">") dalle formule dentro un blockquote.
  let tex = ''
  let cursor = contentFrom
  for (let child = node.firstChild; child; child = child.nextSibling) {
    if (child.name !== 'QuoteMark') continue
    if (child.from < contentFrom || child.to > contentTo) continue
    tex += state.sliceDoc(cursor, child.from)
    cursor = child.to
    if (state.sliceDoc(cursor, cursor + 1) === ' ') cursor++
  }
  tex += state.sliceDoc(cursor, Math.max(cursor, contentTo))

  return { from: node.from, to: node.to, contentFrom, contentTo, display, closed: !!last, tex }
}

/** La formula che contiene `pos` (o che termina/inizia esattamente lì). */
export function mathRegionAt(state: EditorState, pos: number): MathRegion | null {
  const tree = syntaxTree(state)
  for (const side of [-1, 1] as const) {
    for (let node: SyntaxNode | null = tree.resolveInner(pos, side); node; node = node.parent) {
      if (MATH_NODES.has(node.name)) return regionFromNode(state, node)
    }
  }
  return null
}

/** Il cursore è in un blocco di codice o in `codice in linea`? */
export function isInCode(state: EditorState, pos: number): boolean {
  const tree = syntaxTree(state)
  for (let node: SyntaxNode | null = tree.resolveInner(pos, -1); node; node = node.parent) {
    if (CODE_NODES.has(node.name)) return pos > node.from && pos < node.to
  }
  return false
}

/**
 * Riconosce una formula aperta ma non ancora chiusa sulla riga corrente,
 * es. `Sia $x \in` mentre si scrive. Restituisce null se non ce n'è.
 */
export function openMathBefore(lineText: string, upto: number): 'inline' | 'display' | null {
  let inline = false
  let display = false
  for (let i = 0; i < upto; i++) {
    const ch = lineText[i]
    if (ch === '\\') {
      i++
      continue
    }
    if (ch === '`' && !inline && !display) {
      let run = 1
      while (lineText[i + run] === '`') run++
      const close = lineText.indexOf('`'.repeat(run), i + run)
      if (close >= 0 && close < upto) {
        i = close + run - 1
        continue
      }
      i += run - 1
      continue
    }
    if (ch !== '$') continue
    if (lineText[i + 1] === '$') {
      if (!inline) display = !display
      i++
      continue
    }
    if (display) continue
    if (inline) {
      inline = false
    } else {
      const prev = i > 0 ? lineText[i - 1] : ''
      if (!/[A-Za-z0-9_]/.test(prev)) inline = true
    }
  }
  return display ? 'display' : inline ? 'inline' : null
}

/** Il comando `\…` che si sta scrivendo al cursore, se c'è. */
export function commandTokenAt(state: EditorState, pos: number): CommandToken | null {
  const line = state.doc.lineAt(pos)
  const before = line.text.slice(0, pos - line.from)
  const m = /\\([a-zA-Z]*)$/.exec(before)
  if (!m) return null
  // "\\alpha" è un a-capo seguito da testo, non un comando.
  if (isEscaped(before, m.index)) return null
  const after = /^[a-zA-Z]*/.exec(line.text.slice(pos - line.from))?.[0] ?? ''
  return { from: line.from + m.index, to: pos + after.length, prefix: m[1] }
}

export function mathContextAt(state: EditorState, pos: number): EditorMathContext {
  const region = mathRegionAt(state, pos)
  const insideRegion = !!region && pos >= region.contentFrom && pos <= region.contentTo
  const inCode = !insideRegion && isInCode(state, pos)
  let open: 'inline' | 'display' | null = null
  if (!insideRegion && !inCode) {
    const line = state.doc.lineAt(pos)
    open = openMathBefore(line.text, pos - line.from)
  }
  return {
    pos,
    region,
    inMath: insideRegion || open !== null,
    openDisplay: open === 'display',
    inCode,
    token: inCode ? null : commandTokenAt(state, pos),
  }
}
