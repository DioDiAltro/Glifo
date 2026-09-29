import type { EditorState } from '@codemirror/state'
import type { EditorView } from '@codemirror/view'
import { suggestCommands } from '../search/suggest'
import { commandNames, type SymbolEntry, type SymbolForm } from '../symbols'
import { parseTemplate, templateText } from '../symbols/template'
import { templateInsertion } from './insert'
import { mathContextAt, type EditorMathContext } from './mathContext'

export interface SuggestionItem {
  entry: SymbolEntry
  form: SymbolForm
  formIndex: number
}

const MAX_ITEMS = 60
const MAX_FORMS_PER_ENTRY = 6

/**
 * Stato dei suggerimenti per il comando `\…` che si sta scrivendo.
 * Il pannello laterale lo mostra; la tastiera (↑ ↓ Tab Esc) lo comanda.
 */
export class SuggestionController {
  items: SuggestionItem[] = []
  selected = 0
  ctx: EditorMathContext | null = null
  private key = ''
  private dismissedKey = ''
  private suppressNext = false
  /** Stato dell'editor a cui si riferiscono i suggerimenti. */
  private syncedState: EditorState | null = null
  private listeners = new Set<() => void>()

  constructor(
    private readonly getView: () => EditorView,
    private readonly autoWrap: () => boolean,
  ) {}

  subscribe(fn: () => void): () => void {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  private emit(): void {
    for (const fn of this.listeners) fn()
  }

  get token() {
    return this.ctx?.token ?? null
  }

  /** Ci sono suggerimenti da mostrare per il comando corrente. */
  get visible(): boolean {
    return !!this.token && this.items.length > 0 && this.key !== this.dismissedKey
  }

  /** ↑ ↓ e Tab agiscono sui suggerimenti (e non sull'editor). */
  get keyboardActive(): boolean {
    const token = this.token
    if (!this.visible || !token || !this.ctx) return false
    // Fuori dalle formule serve almeno qualche lettera (es. "C:\Users" non conta).
    if (!this.ctx.inMath && token.prefix.length < 2) return false
    // Comando già completo e senza varianti: le frecce tornano all'editor.
    const first = this.items[0]
    if (
      first &&
      commandNames(first.entry)[0] === token.prefix &&
      first.entry.forms.length === 1 &&
      parseTemplate(first.form.tex).slots.length === 0
    ) {
      return false
    }
    return true
  }

  update(ctx: EditorMathContext, state: EditorState | null = null): void {
    this.ctx = ctx
    this.syncedState = state
    const token = ctx.token
    const key = token ? `${token.from}:${token.prefix}` : ''
    if (key !== this.key) {
      this.key = key
      this.selected = 0
      this.items = token ? expand(suggestCommands(token.prefix, 30).map((s) => s.entry)) : []
      this.selected = preferredIndex(this.items, token?.prefix ?? '')
      if (this.suppressNext) {
        this.dismissedKey = key
        this.suppressNext = false
      }
    }
    this.emit()
  }

  /**
   * I tasti possono arrivare prima che il pannello si aggiorni (si scrive
   * più veloce di un fotogramma): in quel caso ricalcola subito il contesto.
   */
  private sync(): void {
    const view = this.getView()
    if (!view?.state || view.state === this.syncedState) return
    this.update(mathContextAt(view.state, view.state.selection.main.head), view.state)
  }

  move(dir: 1 | -1): boolean {
    this.sync()
    if (!this.keyboardActive) return false
    const n = this.items.length
    this.selected = (this.selected + dir + n) % n
    this.emit()
    return true
  }

  select(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.selected = index
      this.emit()
    }
  }

  /** Tab: inserisce il suggerimento selezionato. */
  acceptWithKeyboard(): boolean {
    this.sync()
    if (!this.keyboardActive) return false
    return this.apply(this.selected, true)
  }

  /** Clic su un suggerimento. */
  pick(index: number): boolean {
    if (!this.token) return false
    return this.apply(index, false)
  }

  private apply(index: number, fromKeyboard: boolean): boolean {
    const token = this.token
    const item = this.items[index]
    if (!token || !item) return false
    const view = this.getView()
    const current = view.state.sliceDoc(token.from, token.to)
    const text = templateText(item.form.tex)
    const hasSlots = parseTemplate(item.form.tex).slots.length > 0
    if (fromKeyboard && text === current && !hasSlots) {
      // Niente da completare: lascia che Tab faccia il suo lavoro normale.
      this.dismiss()
      return false
    }
    this.suppressNext = true
    view.dispatch(
      view.state.update(
        templateInsertion(view.state, {
          template: item.form.tex,
          display: item.entry.display,
          replace: { from: token.from, to: token.to },
          autoWrap: this.autoWrap(),
        }),
      ),
    )
    view.focus()
    return true
  }

  dismiss(): boolean {
    this.sync()
    if (!this.visible) return false
    this.dismissedKey = this.key
    this.emit()
    return true
  }
}

/**
 * Con il comando scritto per intero (es. `\sum`) propone subito la variante
 * più utile (`\sum_{}^{}`): così basta premere Tab.
 */
function preferredIndex(items: SuggestionItem[], prefix: string): number {
  const first = items[0]
  if (!first || first.entry.preferredForm === undefined) return 0
  if (commandNames(first.entry)[0] !== prefix) return 0
  const i = items.findIndex((it) => it.entry === first.entry && it.formIndex === first.entry.preferredForm)
  return i >= 0 ? i : 0
}

function expand(entries: SymbolEntry[]): SuggestionItem[] {
  const out: SuggestionItem[] = []
  for (const entry of entries) {
    entry.forms.slice(0, MAX_FORMS_PER_ENTRY).forEach((form, formIndex) => out.push({ entry, form, formIndex }))
    if (out.length >= MAX_ITEMS) break
  }
  return out.slice(0, MAX_ITEMS)
}
