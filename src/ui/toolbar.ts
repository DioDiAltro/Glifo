import { EditorSelection } from '@codemirror/state'
import type { MarkdownEditor } from '../editor/editor'
import { insertBlock, toggleLinePrefix, wrapSelection } from '../editor/insert'
import { LIST_STYLES, applyListStyle, indentListItems, outdentListItems, type ListStyle, type ListStyleId } from '../editor/lists'
import { texts } from '../i18n'
import { ICONS, h, icon } from './dom'

const T = texts({
  formatting: ['Formattazione', 'Formatting'],
  insert: ['Inserisci', 'Insert'],
  heading: ['Titolo (## )', 'Heading (## )'],
  bold: ['Grassetto (Ctrl+B)', 'Bold (Ctrl+B)'],
  italic: ['Corsivo (Ctrl+I)', 'Italic (Ctrl+I)'],
  strike: ['Barrato', 'Strikethrough'],
  bulleted: ['Elenco con i trattini', 'Bulleted list'],
  numbered: ['Elenco numerato 1) 2) 3)', 'Numbered list 1) 2) 3)'],
  todo: ['Lista di cose da fare', 'To-do list'],
  quote: ['Citazione', 'Quote'],
  code: ['Codice', 'Code'],
  link: ['Link', 'Link'],
  schema: ['Schema: forme e frecce, come in draw.io', 'Diagram: shapes and arrows, like draw.io'],
  graph: [
    'Grafico di una funzione (con il cursore su una formula come y = x^2, disegna quella)',
    'Graph of a function (with the cursor on a formula like y = x^2, it draws that one)',
  ],
  inlineMath: ['Formula in linea (Ctrl+M)', 'Inline formula (Ctrl+M)'],
  blockMath: ['Formula a blocco (Ctrl+Maiusc+M)', 'Block formula (Ctrl+Shift+M)'],
  listsHint: ['Tutti i tipi di elenco e i rientri', 'All list types and indentation'],
  lists: ['Tutti i tipi di elenco', 'All list types'],
  indent: ['Rientra', 'Indent'],
  outdent: ['Riduci rientro', 'Outdent'],
  outdentKeys: ['Maiusc+Tab', 'Shift+Tab'],
  tableHint: ['Tabella: con le formule, come in Excel, o di testo', 'Table: with formulas, like Excel, or text'],
  table: ['Tabella', 'Table'],
  sheet: ['Tabella con le formule, come in Excel', 'Table with formulas, like Excel'],
  textTable: ['Tabella di testo (Markdown)', 'Text table (Markdown)'],
  // Il testo che i pulsanti scrivono nella nota quando non c'è niente di selezionato (si scrive sopra).
  tableHeader: ['| Colonna 1 | Colonna 2 |', '| Column 1 | Column 2 |'],
  linkText: ['testo del link', 'link text'],
  codeText: ['codice', 'code'],
  boldText: ['grassetto', 'bold'],
  italicText: ['corsivo', 'italic'],
  strikeText: ['barrato', 'strikethrough'],
})

type Action = { icon?: keyof typeof ICONS; text?: string; title: string; run: () => void } | 'sep' | HTMLElement

/** Lo stile del menu degli elenchi con quell'id (le etichette cambiano con la lingua). */
function listStyle(id: ListStyleId): ListStyle {
  return LIST_STYLES.find((s) => s.id === id)!.style
}

interface MenuItem {
  example: string
  label: string
  run: () => void
  keys?: string
}

/** Un pulsante della barra che apre un menu (le voci con un esempio a sinistra), come quello degli elenchi. */
function toolMenu(editor: MarkdownEditor, opts: { icon: keyof typeof ICONS; title: string; label: string; items: (MenuItem | 'sep')[] }): HTMLElement {
  const items: HTMLButtonElement[] = []
  const menu = h('div', { class: 'tool-menu', attrs: { role: 'menu', 'aria-label': opts.label, hidden: true } })
  const button = h(
    'button',
    {
      class: 'tool tool-more',
      title: opts.title,
      attrs: { type: 'button', 'aria-label': opts.label, 'aria-haspopup': 'menu', 'aria-expanded': 'false' },
      on: {
        mousedown: (ev) => ev.preventDefault(),
        // detail 0: aperto da tastiera (Invio o spazio sul pulsante)
        click: (ev) => (menu.hidden ? open(ev.detail === 0) : close()),
      },
    },
    icon(ICONS[opts.icon], 17),
    icon(ICONS.chevronDown, 12),
  )
  const wrap = h('div', { class: 'tool-menu-wrap' }, button, menu)

  const onOutside = (ev: MouseEvent) => {
    if (!wrap.contains(ev.target as Node)) close()
  }
  function open(fromKeyboard: boolean): void {
    const r = button.getBoundingClientRect()
    menu.style.left = `${Math.max(8, Math.min(r.left, window.innerWidth - 250))}px`
    menu.style.top = `${r.bottom + 4}px`
    menu.hidden = false
    button.setAttribute('aria-expanded', 'true')
    document.addEventListener('mousedown', onOutside, true)
    window.addEventListener('resize', close)
    if (fromKeyboard) items[0].focus()
  }
  function close(): void {
    menu.hidden = true
    button.setAttribute('aria-expanded', 'false')
    document.removeEventListener('mousedown', onOutside, true)
    window.removeEventListener('resize', close)
  }

  for (const entry of opts.items) {
    if (entry === 'sep') {
      menu.append(h('div', { class: 'tool-menu-sep', attrs: { role: 'separator' } }))
      continue
    }
    const item = h(
      'button',
      {
        class: 'tool-menu-item',
        attrs: { type: 'button', role: 'menuitem', tabindex: -1 },
        on: {
          mousedown: (ev) => ev.preventDefault(),
          click: () => {
            close()
            entry.run()
            editor.focus()
          },
        },
      },
      h('span', { class: 'tool-menu-example' }, entry.example),
      h('span', { class: 'tool-menu-label' }, entry.label),
      entry.keys ? h('kbd', {}, entry.keys) : null,
    )
    items.push(item)
    menu.append(item)
  }

  menu.addEventListener('keydown', (ev) => {
    const i = items.indexOf(document.activeElement as HTMLButtonElement)
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      ev.preventDefault()
      items[(i + (ev.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus()
    } else if (ev.key === 'Escape' || ev.key === 'Tab') {
      ev.preventDefault()
      close()
      button.focus()
    }
  })
  return wrap
}

/** Menu con tutti i tipi di elenco (1), a), A), i), es), –, •, cose da fare) e i rientri. */
function listMenu(editor: MarkdownEditor): HTMLElement {
  return toolMenu(editor, {
    icon: 'listOrdered',
    title: T.listsHint,
    label: T.lists,
    items: [
      ...LIST_STYLES.map((s) => ({ example: s.example, label: s.label, run: () => applyListStyle(editor.view, s.style) })),
      'sep',
      { example: '→', label: T.indent, run: () => indentListItems(editor.view), keys: 'Tab' },
      { example: '←', label: T.outdent, run: () => outdentListItems(editor.view), keys: T.outdentKeys },
    ],
  })
}

/**
 * Le due tabelle in un pulsante solo (la barra deve stare in una riga): quella con le formule, come
 * Excel, che si scrive nel suo editor, e quella di testo di Markdown, che si scrive nella nota.
 */
function tableMenu(editor: MarkdownEditor, more: ToolbarActions): HTMLElement {
  return toolMenu(editor, {
    icon: 'sheet',
    title: T.tableHint,
    label: T.table,
    items: [
      { example: '=B2*C2', label: T.sheet, run: () => more.onSheet() },
      {
        example: '| a | b |',
        label: T.textTable,
        run: () => {
          // Il cursore nella prima cella vuota.
          const head = `${T.tableHeader}\n| --- | --- |\n| `
          insertBlock(editor.view, `${head} |  |`, head.length)
        },
      },
    ],
  })
}

function insertLink(editor: MarkdownEditor): void {
  const view = editor.view
  const sel = view.state.selection.main
  const text = view.state.sliceDoc(sel.from, sel.to) || T.linkText
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
    wrapSelection(view, '`', '`', T.codeText)
  }
}

export interface ToolbarActions {
  /** Apre l'editor per uno schema nuovo. */
  onSchema(): void
  /** Apre l'editor per una tabella nuova, con le formule come in Excel. */
  onSheet(): void
  /** Mette nella nota un grafico di funzione. */
  onGraph(): void
  /** Il pulsante ✨ di «Spiega con l'AI» (src/ui/aiPanel.ts), in fondo agli inserimenti, dopo $$. */
  explain: HTMLElement
}

/**
 * I pulsanti sopra l'editor, in due gruppi: per formattare (titolo, grassetto, elenchi, citazione)
 * e per inserire (codice, link, tabella, tabella con le formule, schema, grafico, formule). Stanno nella riga sopra il
 * testo, ai due lati delle viste (vedi `fitBar` in main.ts).
 */
export function createToolbar(editor: MarkdownEditor, more: ToolbarActions): { format: HTMLElement; insert: HTMLElement } {
  const v = () => editor.view
  const format: Action[] = [
    { icon: 'heading', title: T.heading, run: () => toggleLinePrefix(v(), '## ', /^#{1,6}\s+/) },
    { icon: 'bold', title: T.bold, run: () => wrapSelection(v(), '**', '**', T.boldText) },
    { icon: 'italic', title: T.italic, run: () => wrapSelection(v(), '*', '*', T.italicText) },
    { icon: 'strike', title: T.strike, run: () => wrapSelection(v(), '~~', '~~', T.strikeText) },
    'sep',
    { icon: 'list', title: T.bulleted, run: () => applyListStyle(v(), listStyle('dashes')) },
    { icon: 'listOrdered', title: T.numbered, run: () => applyListStyle(v(), listStyle('numbers')) },
    { icon: 'tasks', title: T.todo, run: () => applyListStyle(v(), listStyle('todo')) },
    listMenu(editor),
    { icon: 'quote', title: T.quote, run: () => toggleLinePrefix(v(), '> ', /^>\s?/) },
  ]
  const insert: Action[] = [
    { icon: 'code', title: T.code, run: () => insertCode(editor) },
    { icon: 'link', title: T.link, run: () => insertLink(editor) },
    tableMenu(editor, more),
    { icon: 'schema', title: T.schema, run: () => more.onSchema() },
    { icon: 'graph', title: T.graph, run: () => more.onGraph() },
    'sep',
    { text: '$x$', title: T.inlineMath, run: () => editor.insertInlineMath() },
    { text: '$$', title: T.blockMath, run: () => editor.insertBlockMath() },
    more.explain,
  ]
  return { format: toolbar(T.formatting, format), insert: toolbar(T.insert, insert) }
}

function toolbar(label: string, actions: Action[]): HTMLElement {
  return h(
    'div',
    { class: 'editor-toolbar', attrs: { role: 'toolbar', 'aria-label': label } },
    actions.map((a) =>
      a instanceof HTMLElement
        ? a
        : a === 'sep'
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
