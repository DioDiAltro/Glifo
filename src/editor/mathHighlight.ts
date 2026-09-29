import { syntaxTree } from '@codemirror/language'
import type { Range } from '@codemirror/state'
import { Decoration, ViewPlugin, type DecorationSet, type EditorView, type ViewUpdate } from '@codemirror/view'

/** Colora i pezzi del TeX dentro le formule: comandi, graffe, ^ e _. */

const marks = {
  cmd: Decoration.mark({ class: 'cm-math-cmd' }),
  brace: Decoration.mark({ class: 'cm-math-brace' }),
  script: Decoration.mark({ class: 'cm-math-script' }),
  align: Decoration.mark({ class: 'cm-math-align' }),
}
const inlineRegion = Decoration.mark({ class: 'cm-math-inline' })
const blockLine = Decoration.line({ class: 'cm-math-block-line' })

const TOKEN_RE = /\\[a-zA-Z]+|\\[^a-zA-Z]|[{}]|[\^_]|&/g

function build(view: EditorView): DecorationSet {
  const ranges: Range<Decoration>[] = []
  const { state } = view
  const tree = syntaxTree(state)
  for (const { from, to } of view.visibleRanges) {
    tree.iterate({
      from,
      to,
      enter(node) {
        if (node.name !== 'InlineMath' && node.name !== 'BlockMath') return
        if (node.name === 'BlockMath') {
          for (let pos = node.from; pos <= node.to; ) {
            const line = state.doc.lineAt(pos)
            ranges.push(blockLine.range(line.from))
            pos = line.to + 1
          }
        } else if (node.to > node.from) {
          ranges.push(inlineRegion.range(node.from, node.to))
        }
        const text = state.sliceDoc(node.from, node.to)
        for (const m of text.matchAll(TOKEN_RE)) {
          const tok = m[0]
          const deco =
            tok[0] === '\\' ? marks.cmd : tok === '{' || tok === '}' ? marks.brace : tok === '&' ? marks.align : marks.script
          const start = node.from + (m.index ?? 0)
          ranges.push(deco.range(start, start + tok.length))
        }
        return false
      },
    })
  }
  return Decoration.set(ranges, true)
}

export const mathHighlighter = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet
    constructor(view: EditorView) {
      this.decorations = build(view)
    }
    update(u: ViewUpdate) {
      if (u.docChanged || u.viewportChanged || syntaxTree(u.startState) !== syntaxTree(u.state)) {
        this.decorations = build(u.view)
      }
    }
  },
  { decorations: (v) => v.decorations },
)
