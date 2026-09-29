import { EditorSelection } from '@codemirror/state'
import type { MarkdownEditor } from '../editor/editor'
import { insertBlock, toggleLinePrefix, wrapSelection } from '../editor/insert'
import { ICONS, h, icon } from './dom'

type Action = { icon?: keyof typeof ICONS; text?: string; title: string; run: () => void } | 'sep'

function insertLink(editor: MarkdownEditor): void {
  const view = editor.view
  const sel = view.state.selection.main
  const text = view.state.sliceDoc(sel.from, sel.to) || 'testo del link'
  const insert = `[${text}](https://)`
  const urlFrom = sel.from + text.length + 3
  view.dispatch({
    changes: { from: sel.from, to: sel.to, insert },
    selection: EditorSelection.single(urlFrom, urlFrom + 'https://'.length),
    userEvent: 'input',
  })
  view.focus()
}

function insertCode(editor: MarkdownEditor): void {
  const view = editor.view
  const sel = view.state.selection.main
  const text = view.state.sliceDoc(sel.from, sel.to)
  if (text.includes('\n') || (!text && !view.state.doc.lineAt(sel.from).text.trim())) {
    const block = '```\n' + text + '\n```'
    insertBlock(view, block, 4 + text.length)
  } else {
    wrapSelection(view, '`', '`', 'codice')
  }
}

/** Barra dei pulsanti di formattazione sopra l'editor. */
export function createToolbar(editor: MarkdownEditor): HTMLElement {
  const v = () => editor.view
  const actions: Action[] = [
    { icon: 'heading', title: 'Titolo (## )', run: () => toggleLinePrefix(v(), '## ', /^#{1,6}\s+/) },
    { icon: 'bold', title: 'Grassetto (Ctrl+B)', run: () => wrapSelection(v(), '**', '**', 'grassetto') },
    { icon: 'italic', title: 'Corsivo (Ctrl+I)', run: () => wrapSelection(v(), '*', '*', 'corsivo') },
    { icon: 'strike', title: 'Barrato', run: () => wrapSelection(v(), '~~', '~~', 'barrato') },
    'sep',
    { icon: 'list', title: 'Elenco puntato', run: () => toggleLinePrefix(v(), '- ', /^\s*[-*+]\s+(?!\[[ xX]\])/) },
    { icon: 'listOrdered', title: 'Elenco numerato', run: () => toggleLinePrefix(v(), '1. ', /^\s*\d+[.)]\s+/) },
    { icon: 'tasks', title: 'Lista di cose da fare', run: () => toggleLinePrefix(v(), '- [ ] ', /^\s*[-*+]\s+\[[ xX]\]\s+/) },
    { icon: 'quote', title: 'Citazione', run: () => toggleLinePrefix(v(), '> ', /^>\s?/) },
    'sep',
    { icon: 'code', title: 'Codice', run: () => insertCode(editor) },
    { icon: 'link', title: 'Link', run: () => insertLink(editor) },
    {
      icon: 'table',
      title: 'Tabella',
      run: () => insertBlock(v(), '| Colonna 1 | Colonna 2 |\n| --- | --- |\n|  |  |', '| Colonna 1 | Colonna 2 |\n| --- | --- |\n| '.length),
    },
    'sep',
    { text: '$x$', title: 'Formula in linea (Ctrl+M)', run: () => editor.insertInlineMath() },
    { text: '$$', title: 'Formula a blocco (Ctrl+Maiusc+M)', run: () => editor.insertBlockMath() },
  ]

  return h(
    'div',
    { class: 'editor-toolbar', attrs: { role: 'toolbar', 'aria-label': 'Formattazione' } },
    actions.map((a) =>
      a === 'sep'
        ? h('span', { class: 'toolbar-sep', attrs: { 'aria-hidden': 'true' } })
        : h(
            'button',
            {
              class: `tool${a.text ? ' tool-text' : ''}`,
              title: a.title,
              attrs: { type: 'button', 'aria-label': a.title },
              // mousedown: non togliere la selezione all'editor
              on: { mousedown: (ev) => ev.preventDefault(), click: () => a.run() },
            },
            a.icon ? icon(ICONS[a.icon], 17) : a.text,
          ),
    ),
  )
}
