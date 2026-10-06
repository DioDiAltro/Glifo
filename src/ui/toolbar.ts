import { EditorSelection } from '@codemirror/state'
import type { MarkdownEditor } from '../editor/editor'
import { insertBlock, toggleLinePrefix, wrapSelection } from '../editor/insert'
import { LIST_STYLES, applyListStyle, indentListItems, outdentListItems, type ListStyle } from '../editor/lists'
import { ICONS, h, icon } from './dom'

type Action = { icon?: keyof typeof ICONS; text?: string; title: string; run: () => void } | 'sep' | HTMLElement

function listStyle(label: string): ListStyle {
  return LIST_STYLES.find((s) => s.label === label)!.style
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
    title: 'Tutti i tipi di elenco e i rientri',
    label: 'Tutti i tipi di elenco',
    items: [
      ...LIST_STYLES.map((s) => ({ example: s.example, label: s.label, run: () => applyListStyle(editor.view, s.style) })),
      'sep',
      { example: '→', label: 'Rientra', run: () => indentListItems(editor.view), keys: 'Tab' },
      { example: '←', label: 'Riduci rientro', run: () => outdentListItems(editor.view), keys: 'Maiusc+Tab' },
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
    title: 'Tabella: con le formule, come in Excel, o di testo',
    label: 'Tabella',
    items: [
      { example: '=B2*C2', label: 'Tabella con le formule, come in Excel', run: () => more.onSheet() },
      {
        example: '| a | b |',
        label: 'Tabella di testo (Markdown)',
        run: () => insertBlock(editor.view, '| Colonna 1 | Colonna 2 |\n| --- | --- |\n|  |  |', '| Colonna 1 | Colonna 2 |\n| --- | --- |\n| '.length),
      },
    ],
  })
}

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

export interface ToolbarActions {
  /** Apre l'editor per uno schema nuovo. */
  onSchema(): void
  /** Apre l'editor per una tabella nuova, con le formule come in Excel. */
  onSheet(): void
  /** Mette nella nota un grafico di funzione. */
  onGraph(): void
}

/**
 * I pulsanti sopra l'editor, in due gruppi: per formattare (titolo, grassetto, elenchi, citazione)
 * e per inserire (codice, link, tabella, tabella con le formule, schema, grafico, formule). Stanno nella riga sopra il
 * testo, ai due lati delle viste (vedi `fitBar` in main.ts).
 */
export function createToolbar(editor: MarkdownEditor, more: ToolbarActions): { format: HTMLElement; insert: HTMLElement } {
  const v = () => editor.view
  const format: Action[] = [
    { icon: 'heading', title: 'Titolo (## )', run: () => toggleLinePrefix(v(), '## ', /^#{1,6}\s+/) },
    { icon: 'bold', title: 'Grassetto (Ctrl+B)', run: () => wrapSelection(v(), '**', '**', 'grassetto') },
    { icon: 'italic', title: 'Corsivo (Ctrl+I)', run: () => wrapSelection(v(), '*', '*', 'corsivo') },
    { icon: 'strike', title: 'Barrato', run: () => wrapSelection(v(), '~~', '~~', 'barrato') },
    'sep',
    { icon: 'list', title: 'Elenco con i trattini', run: () => applyListStyle(v(), listStyle('Trattini')) },
    { icon: 'listOrdered', title: 'Elenco numerato 1) 2) 3)', run: () => applyListStyle(v(), listStyle('Numeri')) },
    { icon: 'tasks', title: 'Lista di cose da fare', run: () => applyListStyle(v(), listStyle('Cose da fare')) },
    listMenu(editor),
    { icon: 'quote', title: 'Citazione', run: () => toggleLinePrefix(v(), '> ', /^>\s?/) },
  ]
  const insert: Action[] = [
    { icon: 'code', title: 'Codice', run: () => insertCode(editor) },
    { icon: 'link', title: 'Link', run: () => insertLink(editor) },
    tableMenu(editor, more),
    { icon: 'schema', title: 'Schema: forme e frecce, come in draw.io', run: () => more.onSchema() },
    { icon: 'graph', title: 'Grafico di una funzione (con il cursore su una formula come y = x^2, disegna quella)', run: () => more.onGraph() },
    'sep',
    { text: '$x$', title: 'Formula in linea (Ctrl+M)', run: () => editor.insertInlineMath() },
    { text: '$$', title: 'Formula a blocco (Ctrl+Maiusc+M)', run: () => editor.insertBlockMath() },
  ]
  return { format: toolbar('Formattazione', format), insert: toolbar('Inserisci', insert) }
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
