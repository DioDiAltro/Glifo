import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { deleteMarkupBackward, insertNewlineContinueMarkup, markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { HighlightStyle, bracketMatching, indentOnInput, syntaxHighlighting, syntaxTree } from '@codemirror/language'
import { highlightSelectionMatches, search, searchKeymap } from '@codemirror/search'
import { Compartment, EditorSelection, EditorState, Prec, Transaction, type Extension } from '@codemirror/state'
import {
  EditorView,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightSpecialChars,
  keymap,
  placeholder,
  type ViewUpdate,
} from '@codemirror/view'
import { tags as t } from '@lezer/highlight'
import { insertTemplate, wrapSelection } from './insert'
import { continueList, deleteListMarker, indentListItems, listMarkers, noIndentedCode, outdentListItems } from './lists'
import { mathContextAt, mathRegionAt, type EditorMathContext } from './mathContext'
import { mathHighlighter } from './mathHighlight'
import { mathDelimTag, mathMarkdown, mathTag } from './mathSyntax'
import { clearAllPlaceholders, jumpPlaceholder, placeholderField } from './placeholders'
import { spellcheck, type SpellcheckOptions } from './spellcheck'
import { SuggestionController } from './suggestions'

export interface EditorCallbacks {
  onDocChange(doc: string): void
  onScroll(line: number, fraction: number): void
  onSave(): void
  onFocusSearch(): void
}

const highlight = HighlightStyle.define([
  { tag: t.heading1, fontSize: '1.55em', fontWeight: '700', color: 'var(--heading)' },
  { tag: t.heading2, fontSize: '1.3em', fontWeight: '700', color: 'var(--heading)' },
  { tag: t.heading3, fontSize: '1.12em', fontWeight: '700', color: 'var(--heading)' },
  { tag: [t.heading4, t.heading5, t.heading6], fontWeight: '700', color: 'var(--heading)' },
  { tag: t.strong, fontWeight: '700' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: 'var(--link)' },
  { tag: t.url, color: 'var(--muted)', textDecoration: 'underline' },
  { tag: t.monospace, fontFamily: 'var(--font-mono)', fontSize: '0.92em', color: 'var(--code-fg)' },
  { tag: t.quote, color: 'var(--muted)' },
  { tag: t.list, color: 'var(--text)' },
  { tag: t.processingInstruction, color: 'var(--md-mark)' },
  { tag: t.contentSeparator, color: 'var(--md-mark)' },
  { tag: [t.labelName, t.string], color: 'var(--muted)' },
  { tag: mathTag, color: 'var(--math-fg)' },
  { tag: mathDelimTag, color: 'var(--math-delim)', fontWeight: '700' },
  // Evidenziazione del codice nei blocchi ```
  { tag: [t.keyword, t.modifier, t.operatorKeyword, t.controlKeyword], color: 'var(--code-keyword)' },
  { tag: [t.comment, t.lineComment, t.blockComment], color: 'var(--code-comment)', fontStyle: 'italic' },
  { tag: [t.number, t.bool, t.null, t.atom], color: 'var(--code-number)' },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: 'var(--code-function)' },
  { tag: [t.typeName, t.className, t.namespace], color: 'var(--code-type)' },
  { tag: [t.special(t.string), t.regexp, t.escape], color: 'var(--code-string)' },
])

const italianPhrases = EditorState.phrases.of({
  Find: 'Trova',
  Replace: 'Sostituisci',
  next: 'successivo',
  previous: 'precedente',
  all: 'tutti',
  'match case': 'maiuscole/minuscole',
  'by word': 'parola intera',
  regexp: 'espressione regolare',
  replace: 'sostituisci',
  'replace all': 'sostituisci tutti',
  close: 'chiudi',
  'current match': 'risultato corrente',
  'on line': 'alla riga',
  'Go to line': 'Vai alla riga',
  go: 'vai',
  'replaced match on line $': 'sostituito alla riga $',
  'replaced $ matches': 'sostituiti $ risultati',
})

/** Invio dopo una riga "$$" aperta: crea subito la chiusura del blocco. */
function closeMathBlockOnEnter(view: EditorView): boolean {
  const { state } = view
  const sel = state.selection.main
  if (!sel.empty) return false
  const line = state.doc.lineAt(sel.head)
  if (line.text.trim() !== '$$' || sel.head !== line.to) return false
  const region = mathRegionAt(state, line.from + line.text.indexOf('$$'))
  if (region && region.closed) return false
  const indent = /^\s*/.exec(line.text)?.[0] ?? ''
  view.dispatch({
    changes: { from: sel.head, insert: `\n${indent}\n${indent}$$` },
    selection: EditorSelection.cursor(sel.head + 1 + indent.length),
    scrollIntoView: true,
    userEvent: 'input',
  })
  return true
}

/**
 * Tab dentro una formula senza segnaposto: esce dalla graffa/parentesi o dal
 * `$` che segue il cursore; altrimenti non fa nulla (invece di indentare la
 * riga, che in Markdown la trasformerebbe in un blocco di codice).
 */
function tabOutOfMath(view: EditorView): boolean {
  const { state } = view
  const sel = state.selection.main
  if (!sel.empty) return false
  const ctx = mathContextAt(state, sel.head)
  if (!ctx.inMath) return false
  const next = state.sliceDoc(sel.head, sel.head + 2)
  let skip = 0
  if (next === '$$') skip = 2
  else if (next && '})]$'.includes(next[0])) skip = 1
  if (skip) view.dispatch({ selection: EditorSelection.cursor(sel.head + skip), scrollIntoView: true, userEvent: 'select' })
  return true
}

export class MarkdownEditor {
  readonly view: EditorView
  readonly suggestions: SuggestionController
  private autoWrap = true
  private suppressDocEvents = false
  private contextFrame = 0
  private readonly spelling = new Compartment()
  /** La cronologia di Annulla, che ricomincia da capo a ogni cambio di nota. */
  private readonly undoHistory = new Compartment()

  constructor(parent: HTMLElement, doc: string, private readonly cb: EditorCallbacks) {
    this.suggestions = new SuggestionController(
      () => this.view,
      () => this.autoWrap,
    )
    const s = this.suggestions

    const suggestionKeys = Prec.highest(
      keymap.of([
        { key: 'ArrowDown', run: () => s.move(1) },
        { key: 'ArrowUp', run: () => s.move(-1) },
        { key: 'Tab', run: () => s.acceptWithKeyboard() },
        { key: 'Escape', run: () => s.dismiss() },
        { key: 'Enter', run: closeMathBlockOnEnter },
      ]),
    )
    const editingKeys = Prec.high(
      keymap.of([
        {
          key: 'Tab',
          run: (v) => jumpPlaceholder(v, 1) || tabOutOfMath(v) || indentListItems(v),
          shift: (v) => jumpPlaceholder(v, -1) || outdentListItems(v),
        },
        // Invio e Backspace capiscono tutti i marcatori degli elenchi; il resto (es. le citazioni) come prima.
        { key: 'Enter', run: (v) => continueList(v) || insertNewlineContinueMarkup(v) },
        { key: 'Backspace', run: (v) => deleteListMarker(v) || deleteMarkupBackward(v) },
        { key: 'Escape', run: clearAllPlaceholders },
        { key: 'Mod-b', run: (v) => (wrapSelection(v, '**', '**', 'grassetto'), true) },
        { key: 'Mod-i', run: (v) => (wrapSelection(v, '*', '*', 'corsivo'), true) },
        { key: 'Mod-m', run: (v) => (this.insertInlineMath(v), true) },
        { key: 'Mod-Shift-m', run: (v) => (this.insertBlockMath(v), true) },
        { key: 'Mod-s', run: () => (this.cb.onSave(), true), preventDefault: true },
        { key: 'Mod-k', run: () => (this.cb.onFocusSearch(), true), preventDefault: true },
      ]),
    )

    const extensions: Extension[] = [
      highlightSpecialChars(),
      this.undoHistory.of(history()),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      bracketMatching(),
      closeBrackets(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      search({ top: true }),
      EditorView.lineWrapping,
      italianPhrases,
      placeholder('Scrivi qui i tuoi appunti in Markdown… prova a digitare \\sum'),
      markdown({ base: markdownLanguage, codeLanguages: languages, extensions: [mathMarkdown, noIndentedCode], addKeymap: false }),
      listMarkers,
      // Chiude in automatico anche davanti al $ di fine formula (es. `$x^{|}$`).
      markdownLanguage.data.of({ closeBrackets: { brackets: ['(', '[', '{', '$'], before: ')]}:;>$' } }),
      syntaxHighlighting(highlight),
      mathHighlighter,
      placeholderField,
      suggestionKeys,
      editingKeys,
      keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...searchKeymap, ...historyKeymap, indentWithTab]),
      EditorView.updateListener.of((u) => this.onUpdate(u)),
      // Il controllo del browser resta spento: quello di Glifo salta formule e codice.
      EditorView.contentAttributes.of({ spellcheck: 'false', lang: 'it', 'aria-label': 'Editor degli appunti' }),
      this.spelling.of([]),
    ]

    this.view = new EditorView({
      parent,
      state: EditorState.create({ doc, extensions }),
    })
    this.view.scrollDOM.addEventListener('scroll', () => this.reportScroll(), { passive: true })
    this.scheduleContext()
  }

  setAutoWrap(on: boolean): void {
    this.autoWrap = on
  }

  /** Accende (con il correttore indicato) o spegne il controllo ortografico. */
  setSpellcheck(options: SpellcheckOptions | null): void {
    this.view.dispatch({ effects: this.spelling.reconfigure(options ? spellcheck(options) : []) })
  }

  private onUpdate(u: ViewUpdate): void {
    if (u.docChanged && !this.suppressDocEvents) this.cb.onDocChange(u.state.doc.toString())
    if (u.docChanged || u.selectionSet || u.focusChanged || syntaxTree(u.startState) !== syntaxTree(u.state)) {
      this.scheduleContext()
    }
  }

  private scheduleContext(): void {
    if (this.contextFrame) return
    this.contextFrame = requestAnimationFrame(() => {
      this.contextFrame = 0
      // Il pannello dei simboli legge il contesto dal controller dei suggerimenti.
      this.suggestions.update(this.context(), this.view.state)
    })
  }

  context(): EditorMathContext {
    return mathContextAt(this.view.state, this.view.state.selection.main.head)
  }

  private reportScroll(): void {
    const { view } = this
    const top = view.scrollDOM.scrollTop
    const block = view.lineBlockAtHeight(top)
    const line = view.state.doc.lineAt(block.from).number
    const fraction = block.height > 0 ? Math.min(1, Math.max(0, (top - block.top) / block.height)) : 0
    this.cb.onScroll(line, fraction)
  }

  /** Sostituisce tutto il testo (cambio di nota) senza generare "modifiche". */
  setDoc(doc: string): void {
    this.suppressDocEvents = true
    this.view.dispatch({
      changes: { from: 0, to: this.view.state.doc.length, insert: doc },
      selection: EditorSelection.cursor(0),
      // Senza cronologia: Annulla non deve riportare qui il testo della nota di prima
      // (che poi verrebbe salvato sopra questa).
      effects: [EditorView.scrollIntoView(0), this.undoHistory.reconfigure([])],
    })
    this.view.dispatch({ effects: this.undoHistory.reconfigure(history()) })
    this.suppressDocEvents = false
    this.scheduleContext()
  }

  /**
   * Mostra il testo salvato altrove (es. in un'altra scheda) senza generare "modifiche":
   * cambia solo la parte diversa, così cursore e scorrimento restano dove sono, e resta
   * fuori dalla cronologia di Annulla, che continua ad annullare solo quello scritto qui.
   */
  applyExternalDoc(doc: string): void {
    const current = this.view.state.doc.toString()
    if (doc === current) return
    let from = 0
    while (from < current.length && from < doc.length && current.charCodeAt(from) === doc.charCodeAt(from)) from++
    let to = current.length
    let end = doc.length
    while (to > from && end > from && current.charCodeAt(to - 1) === doc.charCodeAt(end - 1)) {
      to--
      end--
    }
    this.suppressDocEvents = true
    this.view.dispatch({
      changes: { from, to, insert: doc.slice(from, end) },
      annotations: [Transaction.addToHistory.of(false), Transaction.remote.of(true)],
    })
    this.suppressDocEvents = false
    this.scheduleContext()
  }

  getDoc(): string {
    return this.view.state.doc.toString()
  }

  focus(): void {
    this.view.focus()
  }

  /** Inserisce un simbolo/modello al cursore (dal pannello o dalla ricerca). */
  insert(template: string, display = false): void {
    insertTemplate(this.view, { template, display, autoWrap: this.autoWrap })
  }

  insertInlineMath(view = this.view): void {
    const ctx = mathContextAt(view.state, view.state.selection.main.head)
    if (ctx.inMath) return
    wrapSelection(view, '$', '$')
  }

  insertBlockMath(view = this.view): void {
    insertTemplate(view, { template: '#', display: true, autoWrap: true })
  }
}
