import type { BlockContext, Element, Line, MarkdownConfig } from '@lezer/markdown'
import { Tag } from '@lezer/highlight'
import { analyzeBlockOpen, findBlockClose, matchInlineMath } from '../render/mathDelims'

/**
 * Estensione del parser Markdown di CodeMirror: riconosce le formule
 * `$…$` (InlineMath) e `$$…$$` (BlockMath) con le stesse regole
 * dell'anteprima, così l'editor sa sempre se il cursore è in una formula.
 */

function lineDepth(line: Line): number {
  return (line as unknown as { depth: number }).depth
}

function parseBlockMath(cx: BlockContext, line: Line): boolean {
  const open = analyzeBlockOpen(line.text, line.pos)
  if (open.kind === 'none') return false
  const from = cx.lineStart + line.pos
  const marks: Element[] = [cx.elt('BlockMathMark', from, from + 2)]

  if (open.kind === 'single') {
    const closeFrom = cx.lineStart + open.closeFrom
    marks.push(cx.elt('BlockMathMark', closeFrom, closeFrom + 2))
    cx.nextLine()
    cx.addElement(cx.elt('BlockMath', from, closeFrom + 2, marks))
    return true
  }

  let end = cx.lineStart + line.text.length
  while (cx.nextLine() && lineDepth(line) >= cx.depth) {
    for (const m of line.markers) marks.push(m)
    const close = findBlockClose(line.text, line.pos)
    if (close >= 0) {
      const closeFrom = cx.lineStart + close
      marks.push(cx.elt('BlockMathMark', closeFrom, closeFrom + 2))
      end = closeFrom + 2
      cx.nextLine()
      break
    }
    end = cx.lineStart + line.text.length
  }
  cx.addElement(cx.elt('BlockMath', from, end, marks))
  return true
}

/** Tag di evidenziazione per il contenuto delle formule e per i `$`. */
export const mathTag = Tag.define()
export const mathDelimTag = Tag.define()

export const mathMarkdown: MarkdownConfig = {
  defineNodes: [
    { name: 'InlineMath', style: mathTag },
    { name: 'InlineMathMark', style: mathDelimTag },
    { name: 'BlockMath', block: true, style: mathTag },
    { name: 'BlockMathMark', style: mathDelimTag },
  ],
  parseInline: [
    {
      name: 'InlineMath',
      parse(cx, next, pos) {
        if (next !== 36 /* $ */) return -1
        const m = matchInlineMath(cx.text, pos - cx.offset, cx.end - cx.offset)
        if (!m) return -1
        const markLen = m.display ? 2 : 1
        const end = cx.offset + m.end
        return cx.addElement(
          cx.elt('InlineMath', pos, end, [
            cx.elt('InlineMathMark', pos, pos + markLen),
            cx.elt('InlineMathMark', end - markLen, end),
          ]),
        )
      },
      before: 'Escape',
    },
  ],
  parseBlock: [
    {
      name: 'BlockMath',
      parse: parseBlockMath,
      endLeaf: (_cx, line) => analyzeBlockOpen(line.text, line.pos).kind !== 'none',
      before: 'HorizontalRule',
    },
  ],
}
