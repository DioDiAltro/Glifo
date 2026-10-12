import { askAi, type AiResult } from '../ai/assistant'
import { aiSettingsOf } from '../ai/services'
import type { MarkdownEditor } from '../editor/editor'
import { formulaAtCursor, insertGraphBlock } from '../editor/graphInsert'
import { staticGraphSvg } from '../graph/picture'
import { formulaGraph } from '../graph/spec'
import { graphTitle, PALETTES } from '../graph/svg'
import type { SuggestionItem } from '../editor/suggestions'
import { rich, texts } from '../i18n'
import { localizeTex } from '../noteWords'
import { cleanKatexError, renderTex } from '../render/katex'
import { isConfidentAnswer, searchSymbols, type SearchResult } from '../search/search'
import { CATEGORIES, symbolsInCategory, type CategoryId, type SymbolEntry, type SymbolForm } from '../symbols'
import { cardPreviewTex, formPreviewTex, templateText } from '../symbols/template'
import type { Settings } from '../store/settings'
import { ICONS, clear, h, icon } from './dom'
import type { AiWork } from './aiActivity'
import { AiPanel } from './aiPanel'
import { ExplainPanel } from './explainPanel'

const T = texts({
  searchPlaceholder: ['Cerca un simbolo… es. «infinito», «per ogni»', 'Search for a symbol… e.g. “infinity”, “for all”'],
  search: ['Cerca un simbolo', 'Search for a symbol'],
  clearSearch: ['Cancella la ricerca', 'Clear search'],
  insertGraphTitle: [
    'Mette nella nota un blocco ```grafico con questa funzione, che l\'anteprima disegna',
    'Inserts a ```graph block with this function into the note; the preview draws it',
  ],
  insertGraph: ['Inserisci il grafico', 'Insert graph'],
  symbolsPanel: ['Pannello dei simboli', 'Symbols panel'],
  shortcut: ['Scorciatoia', 'Shortcut'],
  formulaPreview: ['Anteprima formula', 'Formula preview'],
  explainWithAi: ['Spiega con l\'AI', 'Explain with AI'],
  block: ['a blocco', 'block'],
  inline: ['in linea', 'inline'],
  withCode: (code: string) => [`con ${code}`, `with ${code}`],
  previewOf: (code: string) => [`anteprima di ${code}`, `preview of ${code}`],
  noFormula: [
    'Metti il cursore dentro una formula ($ … $) per vederla qui mentre scrivi.',
    'Put the cursor inside a formula ($ … $) to see it here as you type.',
  ],
  emptyFormula: ['Formula vuota: inizia a scrivere…', 'Empty formula: start typing…'],
  copied: (text: string) => [`Copiato: ${text}`, `Copied: ${text}`],
  copyFailed: ['Impossibile copiare negli appunti', 'Couldn\'t copy to the clipboard'],
  suggestionsFor: ['Suggerimenti per {cmd}', 'Suggestions for {cmd}'],
  suggestionKeys: ['{tab} inserisce · {arrows} scegli · {esc}', '{tab} inserts · {arrows} choose · {esc}'],
  clickToInsert: ['clicca per inserire', 'click to insert'],
  answer: ['Risposta', 'Answer'],
  insertIntoNote: ['Inserisci nella nota', 'Insert into note'],
  insert: ['Inserisci', 'Insert'],
  copy: ['Copia', 'Copy'],
  found: (n: number) => [n === 1 ? '1 simbolo trovato' : `${n} simboli trovati`, n === 1 ? '1 symbol found' : `${n} symbols found`],
  enterKey: ['Invio', 'Enter'],
  enterInserts: ['{enter} inserisce', '{enter} inserts'],
  noneFound: ['Nessun simbolo trovato con queste parole.', 'No symbols found for these words.'],
  askAiKeys: ['Ctrl+Invio', 'Ctrl+Enter'],
  askAi: (question: string) => [` Chiedi all'AI: «${question}»`, ` Ask AI: “${question}”`],
  askAiHint: [
    'Per domande più complesse, es. «freccia con scritto sopra n → ∞» o «matrice 4×4 con puntini».',
    'For more complex questions, e.g. “arrow with n → ∞ written above it” or “4×4 matrix with dots”.',
  ],
  searching: ['Sto cercando la risposta…', 'Looking for the answer…'],
  cancel: ['Annulla', 'Cancel'],
  openSettings: [' Apri le impostazioni', ' Open settings'],
  tryAgain: ['Riprova', 'Try again'],
  aiAnswer: [' Risposta dell\'AI', ' AI answer'],
  modelTitle: ['Il modello che ha risposto', 'The model that answered'],
  noAnswers: ['Nessuna formula proposta.', 'No formulas suggested.'],
  categories: ['Categorie di simboli', 'Symbol categories'],
})

export interface SidePanelDeps {
  editor: MarkdownEditor
  settings: () => Settings
  /** Il tema scuro è attivo (per i colori del grafico della formula). */
  isDark: () => boolean
  openSettings: () => void
  toast: (message: string, kind?: 'info' | 'error') => void
  /** Chiude il pannello (la ✕ di «Spiega con l'AI»). */
  closePanel: () => void
  /** Il pulsante ✨ (src/ui/aiActivity.ts): sa quando il pannello «Spiega con l'AI» lavora. */
  aiActivity?: AiWork
}

/** Cosa mostra il pannello a destra: i simboli o «Spiega con l'AI» (src/ui/aiPanel.ts). */
export type PanelView = 'symbols' | 'ai'

type AiState =
  | { status: 'idle' }
  | { status: 'loading'; question: string; controller: AbortController }
  | { status: 'done'; question: string; result: AiResult }
  | { status: 'error'; question: string; message: string }

const EMPTY_GROUP_RE = /(?<=[\^_}]|\\[a-zA-Z]+)\{\}/g
const EMPTY_GROUP_TEX = String.raw`{\htmlClass{mh-ph}{\square}}`

/**
 * Codice mostrato sotto un'anteprima: ciò che verrà inserito. I simboli sono scritti con le parole italiane
 * (\operatorname{studio}): nella nota e nelle anteprime vanno quelle della lingua di Glifo (src/noteWords.ts).
 */
function displayCode(form: SymbolForm): string {
  return templateText(localizeTex(form.tex))
}

/** L'anteprima di una variante, nella formula sotto il cursore o da sola. */
function formPreview(form: SymbolForm): string {
  return localizeTex(formPreviewTex(form))
}

/** L'anteprima di una variante nelle schede del pannello. */
function cardPreview(form: SymbolForm): string {
  return localizeTex(cardPreviewTex(form))
}

function preventFocusSteal(ev: MouseEvent): void {
  // Il clic su un simbolo non deve togliere il cursore dall'editor.
  ev.preventDefault()
}

export class SidePanel {
  readonly el: HTMLElement
  private readonly searchInput: HTMLInputElement
  private readonly clearButton: HTMLButtonElement
  private readonly formulaRender: HTMLElement
  private readonly formulaMeta: HTMLElement
  private readonly formulaError: HTMLElement
  /** Il grafico della formula sotto il cursore, se è una funzione (y = …, f(x) = …). */
  private readonly formulaGraph: HTMLElement
  private readonly formulaGraphCanvas: HTMLElement
  /** Sotto il piano di Gauss: il numero nelle sue forme (1 + i = √2 e^{iπ/4}). */
  private readonly formulaGraphCaption: HTMLElement
  private lastGraphKey = ''
  private readonly body: HTMLElement
  private query = ''
  private results: SearchResult[] = []
  private resultIndex = 0
  private category: CategoryId = 'greek'
  private mode: 'suggestions' | 'search' | 'categories' | null = null
  /** Cosa mostra ora il pannello: si ridisegna solo quando cambia. */
  private renderKey = ''
  private aiVersion = 0
  /** Chiave dell'ultima anteprima disegnata (per non ridisegnare a vuoto). */
  private lastFormulaKey: string | null = null
  private ai: AiState = { status: 'idle' }
  /** «Spiegami»: il pulsante nel riquadro della formula e la spiegazione sotto (src/ui/explainPanel.ts). */
  private readonly explain: ExplainPanel
  /** «Spiega con l'AI»: l'altra vista del pannello, nello stesso posto (con la stessa larghezza). */
  readonly aiPanel: AiPanel
  private shown: PanelView = 'symbols'
  private open = false

  constructor(private readonly deps: SidePanelDeps) {
    this.explain = new ExplainPanel({ editor: deps.editor, settings: deps.settings, openSettings: deps.openSettings, toast: deps.toast })
    this.aiPanel = new AiPanel({ editor: deps.editor, settings: deps.settings, openSettings: deps.openSettings, toast: deps.toast, onClose: deps.closePanel, activity: deps.aiActivity })
    this.searchInput = h('input', {
      class: 'panel-search-input',
      attrs: {
        type: 'search',
        placeholder: T.searchPlaceholder,
        'aria-label': T.search,
        autocomplete: 'off',
        spellcheck: 'false',
      },
      on: {
        input: () => this.setQuery(this.searchInput.value),
        keydown: (ev) => this.onSearchKey(ev),
      },
    })
    this.clearButton = h(
      'button',
      {
        class: 'icon-button panel-search-clear',
        title: T.clearSearch,
        attrs: { type: 'button', 'aria-label': T.clearSearch, hidden: true },
        on: { click: () => this.resetSearch(true) },
      },
      icon(ICONS.x, 16),
    )
    this.formulaRender = h('div', { class: 'formula-render', attrs: { 'aria-live': 'polite' } })
    this.formulaMeta = h('span', { class: 'formula-meta' })
    this.formulaError = h('div', { class: 'formula-error', attrs: { role: 'status' } })
    this.formulaGraphCanvas = h('div', { class: 'formula-graph-canvas' })
    this.formulaGraphCaption = h('div', { class: 'formula-graph-caption', attrs: { hidden: true } })
    this.formulaGraph = h(
      'div',
      { class: 'formula-graph', attrs: { hidden: true } },
      this.formulaGraphCanvas,
      this.formulaGraphCaption,
      h(
        'button',
        {
          class: 'btn btn-small formula-graph-insert',
          title: T.insertGraphTitle,
          attrs: { type: 'button' },
          on: {
            mousedown: preventFocusSteal,
            click: () => {
              const found = formulaAtCursor(this.deps.editor.view)
              if (found) insertGraphBlock(this.deps.editor.view, found.tex, found.to)
            },
          },
        },
        T.insertGraph,
      ),
    )
    this.body = h('div', { class: 'panel-body' })

    this.el = h(
      'aside',
      { class: 'symbols-panel', attrs: { id: 'symbols-panel', 'aria-label': T.symbolsPanel } },
      h(
        'div',
        { class: 'panel-search' },
        h('span', { class: 'panel-search-icon' }, icon(ICONS.search, 16)),
        this.searchInput,
        this.clearButton,
        h('kbd', { class: 'panel-search-kbd', title: T.shortcut }, 'Ctrl K'),
      ),
      h(
        'section',
        { class: 'formula-box' },
        h('div', { class: 'formula-head' }, h('span', {}, T.formulaPreview), this.formulaMeta),
        this.formulaRender,
        this.formulaError,
        h('div', { class: 'formula-actions' }, this.explain.button),
        this.formulaGraph,
      ),
      this.explain.el,
      this.body,
      this.aiPanel.el,
    )

    deps.editor.suggestions.subscribe(() => {
      this.render()
      this.updateFormula()
      this.updateGraph()
      this.explain.update()
    })
    this.updateFormula()
    this.explain.update()
    this.render()
  }

  /** Come nelle Note matematiche: se la formula sotto il cursore è una funzione, il suo grafico, da mettere nella nota. */
  private updateGraph(): void {
    const s = this.deps.editor.suggestions
    const found = s.ctx?.region ? formulaAtCursor(this.deps.editor.view) : null
    const dark = this.deps.isDark()
    const key = found ? `${dark}\n${found.tex}\n${found.defs.join('\n')}` : ''
    if (key === this.lastGraphKey) return
    this.lastGraphKey = key
    const spec = found ? formulaGraph(found.tex, found.defs) : null
    if (!spec) {
      this.formulaGraph.hidden = true
      this.formulaGraphCanvas.replaceChildren()
      return
    }
    const width = Math.max(220, Math.min(420, this.formulaGraphCanvas.clientWidth || 300))
    const height = Math.round(width * 0.58)
    const palette = PALETTES[dark ? 'dark' : 'light']
    const surface = getComputedStyle(this.formulaGraph.parentElement ?? this.el).backgroundColor
    // Il disegno è fatto da Glifo: i testi sono già passati da escapeXml.
    this.formulaGraphCanvas.innerHTML = staticGraphSvg(spec, width, height, { ...palette, halo: surface || palette.halo }, { id: 'formula-graph', title: graphTitle(spec) })
    // Un numero complesso: sotto il disegno le sue forme, algebrica ed esponenziale.
    const number = spec.gauss ? spec.items.find((i) => i.kind === 'complex' && i.arrows) : undefined
    const caption = number ? renderTex(number.label) : null
    this.formulaGraphCaption.innerHTML = caption && !caption.error ? caption.html : ''
    this.formulaGraphCaption.hidden = !caption || !!caption.error
    this.formulaGraph.hidden = false
  }

  focusSearch(): void {
    this.searchInput.focus()
    this.searchInput.select()
  }

  /** Quale vista si vede quando il pannello è aperto. */
  get view(): PanelView {
    return this.shown
  }

  setView(view: PanelView): void {
    this.shown = view
    this.el.classList.toggle('view-ai', view === 'ai')
    this.el.setAttribute('aria-label', view === 'ai' ? T.explainWithAi : T.symbolsPanel)
    this.syncAi()
  }

  /** Il pannello si apre o si chiude (main.ts, `setPanels`): l'elenco di «Spiega con l'AI» si fa solo se si vede. */
  setOpen(open: boolean): void {
    this.open = open
    this.syncAi()
  }

  private syncAi(): void {
    if (this.open && this.shown === 'ai') this.aiPanel.show()
    else this.aiPanel.hide()
  }

  // ——— Anteprima della formula sotto il cursore ———

  /**
   * Disegna la formula in cui si trova il cursore. Mentre si sceglie un
   * suggerimento, lo mostra già al suo posto nella formula ("anteprima di
   * cosa sto inserendo").
   */
  private updateFormula(): void {
    const s = this.deps.editor.suggestions
    const region = s.ctx?.region ?? null
    const item = s.visible ? s.items[s.keyboardActive ? s.selected : 0] : undefined
    const token = s.token

    let tex: string | null = null
    let display = false
    let meta = ''
    if (region) {
      tex = region.tex
      display = region.display
      meta = region.display ? T.block : T.inline
      // Sostituisce il comando parziale con il suggerimento selezionato.
      const plain = region.tex.length === region.contentTo - region.contentFrom
      if (item && token && plain && token.from >= region.contentFrom && token.to <= region.contentTo) {
        const a = token.from - region.contentFrom
        const b = token.to - region.contentFrom
        tex = tex.slice(0, a) + formPreview(item.form) + tex.slice(b)
        meta = T.withCode(displayCode(item.form))
      }
    } else if (item) {
      tex = formPreview(item.form)
      display = true
      meta = T.previewOf(displayCode(item.form))
    }

    const key = tex === null ? '' : `${display ? 'D' : 'I'}${meta}\u0000${tex}`
    if (key === this.lastFormulaKey) return
    this.lastFormulaKey = key
    this.formulaMeta.textContent = meta

    if (tex === null) {
      this.formulaRender.classList.add('is-empty')
      this.formulaRender.classList.remove('is-stale')
      this.formulaRender.textContent = T.noFormula
      this.formulaError.textContent = ''
      return
    }
    this.formulaRender.classList.remove('is-empty')
    if (!tex.trim()) {
      this.formulaRender.classList.remove('is-stale')
      this.formulaRender.textContent = T.emptyFormula
      this.formulaError.textContent = ''
      return
    }
    const visual = tex.replace(EMPTY_GROUP_RE, EMPTY_GROUP_TEX)
    const { html, error } = renderTex(visual, true, true)
    if (error) {
      // Lascia visibile l'ultima versione corretta, sbiadita.
      this.formulaRender.classList.add('is-stale')
      this.formulaError.textContent = cleanKatexError(error)
    } else {
      this.formulaRender.classList.remove('is-stale')
      this.formulaRender.innerHTML = html
      this.formulaError.textContent = ''
    }
  }

  // ——— Ricerca ———

  private setQuery(q: string): void {
    this.query = q
    this.clearButton.hidden = !q
    this.results = q.trim() ? searchSymbols(q, 24) : []
    this.resultIndex = 0
    if (this.ai.status !== 'idle' && this.ai.question !== q.trim()) {
      if (this.ai.status === 'loading') this.ai.controller.abort()
      this.setAi({ status: 'idle' })
    }
    this.render()
  }

  private resetSearch(focusSearch = false): void {
    this.searchInput.value = ''
    this.setQuery('')
    if (focusSearch) this.searchInput.focus()
  }

  private onSearchKey(ev: KeyboardEvent): void {
    if (ev.key === 'Escape') {
      ev.preventDefault()
      if (this.query) this.resetSearch(true)
      else this.deps.editor.focus()
      return
    }
    if (ev.key === 'Enter' && (ev.ctrlKey || ev.metaKey)) {
      ev.preventDefault()
      void this.askAi()
      return
    }
    if (!this.results.length) {
      if (ev.key === 'Enter' && this.query.trim()) {
        ev.preventDefault()
        void this.askAi()
      }
      return
    }
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      ev.preventDefault()
      const n = this.results.length
      this.resultIndex = (this.resultIndex + (ev.key === 'ArrowDown' ? 1 : -1) + n) % n
      this.highlightResult()
    } else if (ev.key === 'Enter') {
      ev.preventDefault()
      const r = this.results[this.resultIndex]
      if (r) this.insert(r.entry, r.entry.forms[0])
    }
  }

  private highlightResult(): void {
    this.body.querySelectorAll('.result-row').forEach((row, i) => {
      row.classList.toggle('is-selected', i === this.resultIndex)
      if (i === this.resultIndex) row.scrollIntoView({ block: 'nearest' })
    })
  }

  private async askAi(): Promise<void> {
    const question = this.query.trim()
    if (!question) return
    const settings = this.deps.settings()
    if (this.ai.status === 'loading') this.ai.controller.abort()
    const controller = new AbortController()
    this.setAi({ status: 'loading', question, controller })
    try {
      const result = await askAi(question, aiSettingsOf(settings), controller.signal)
      if (this.ai.status === 'loading' && this.ai.controller === controller) this.setAi({ status: 'done', question, result })
    } catch (err) {
      if (this.ai.status === 'loading' && this.ai.controller === controller) {
        this.setAi({ status: 'error', question, message: err instanceof Error ? err.message : String(err) })
      }
    }
  }

  private setAi(state: AiState): void {
    this.ai = state
    this.aiVersion++
    this.render()
  }

  // ——— Inserimento ———

  private insert(entry: SymbolEntry, form: SymbolForm): void {
    this.deps.editor.insert(localizeTex(form.tex), entry.display)
  }

  private async copy(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text)
      this.deps.toast(T.copied(text))
    } catch {
      this.deps.toast(T.copyFailed, 'error')
    }
  }

  // ——— Disegno del pannello ———

  private render(): void {
    const s = this.deps.editor.suggestions
    const mode = s.visible ? 'suggestions' : this.query.trim() ? 'search' : 'categories'
    const key =
      mode === 'suggestions'
        ? `${s.token?.from}:${s.token?.prefix}:${s.items.length}:${s.keyboardActive}`
        : mode === 'search'
          ? `${this.query}\u0000${this.aiVersion}`
          : this.category
    if (mode === this.mode && key === this.renderKey) {
      if (mode === 'suggestions') this.updateSuggestionSelection()
      return
    }
    this.mode = mode
    this.renderKey = key
    clear(this.body)
    this.body.scrollTop = 0
    if (mode === 'suggestions') this.renderSuggestions()
    else if (mode === 'search') this.renderSearch()
    else this.renderCategories()
  }

  private card(entry: SymbolEntry, form: SymbolForm, opts: { index?: number; compact?: boolean; onPick: () => void }): HTMLButtonElement {
    const code = displayCode(form)
    const { html, error } = renderTex(cardPreview(form), !!entry.display, true)
    const tooltip = [entry.name + (form.label ? ` – ${form.label}` : ''), code, entry.note].filter(Boolean).join('\n')
    return h(
      'button',
      {
        class: `sym-card${opts.compact ? ' is-compact' : ''}`,
        title: tooltip,
        attrs: { type: 'button', 'aria-label': `${entry.name}${form.label ? `, ${form.label}` : ''}: ${code}` },
        data: opts.index === undefined ? {} : { index: String(opts.index) },
        on: { mousedown: preventFocusSteal, click: opts.onPick },
      },
      h('span', { class: 'sym-render', html: error ? '' : html }, error ? code : null),
      h('code', { class: 'sym-code' }, code),
      form.label && !opts.compact ? h('span', { class: 'sym-label' }, form.label) : null,
    )
  }

  private renderSuggestions(): void {
    const s = this.deps.editor.suggestions
    const token = s.token!
    this.body.append(
      h(
        'div',
        { class: 'panel-section-head' },
        h('span', {}, ...rich(T.suggestionsFor, { cmd: h('code', {}, `\\${token.prefix}`) })),
        s.keyboardActive
          ? h('span', { class: 'panel-hint' }, ...rich(T.suggestionKeys, { tab: h('kbd', {}, 'Tab'), arrows: h('kbd', {}, '↑↓'), esc: h('kbd', {}, 'Esc') }))
          : h('span', { class: 'panel-hint' }, T.clickToInsert),
      ),
    )
    const list = h('div', { class: 'sug-list' })
    let group: HTMLElement | null = null
    let forms: HTMLElement | null = null
    let lastEntry: SymbolEntry | null = null
    s.items.forEach((item: SuggestionItem, index) => {
      if (item.entry !== lastEntry) {
        lastEntry = item.entry
        forms = h('div', { class: 'sug-forms' })
        group = h(
          'div',
          { class: 'sug-group' },
          h('div', { class: 'sug-title' }, h('span', {}, item.entry.name), h('code', { class: 'sug-cmd' }, item.entry.cmd.startsWith('\\') ? item.entry.cmd : '')),
          forms,
          item.entry.note ? h('div', { class: 'sug-note' }, item.entry.note) : null,
        )
        list.append(group)
      }
      forms!.append(this.card(item.entry, item.form, { index, onPick: () => s.pick(index) }))
    })
    this.body.append(list)
    this.updateSuggestionSelection()
  }

  private updateSuggestionSelection(): void {
    const s = this.deps.editor.suggestions
    this.body.querySelectorAll<HTMLElement>('.sug-list .sym-card').forEach((el) => {
      const selected = Number(el.dataset.index) === s.selected && s.keyboardActive
      el.classList.toggle('is-selected', selected)
      if (selected) el.scrollIntoView({ block: 'nearest' })
    })
  }

  private renderSearch(): void {
    const results = this.results
    if (results.length && isConfidentAnswer(results)) {
      const top = results[0]
      const form = top.entry.forms[0]
      const code = displayCode(form)
      this.body.append(
        h(
          'div',
          { class: 'answer-card' },
          h('div', { class: 'answer-kicker' }, T.answer),
          h(
            'button',
            {
              class: 'answer-main',
              title: T.insertIntoNote,
              attrs: { type: 'button' },
              on: { mousedown: preventFocusSteal, click: () => this.insert(top.entry, form) },
            },
            h('span', { class: 'answer-render', html: renderTex(cardPreview(form), !!top.entry.display, true).html }),
            h('span', { class: 'answer-text' }, h('strong', {}, top.entry.name), h('code', {}, code)),
          ),
          h(
            'div',
            { class: 'answer-actions' },
            h('button', { class: 'btn btn-primary', attrs: { type: 'button' }, on: { mousedown: preventFocusSteal, click: () => this.insert(top.entry, form) } }, T.insert),
            h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => void this.copy(code) } }, icon(ICONS.copy, 14), T.copy),
          ),
        ),
      )
    }

    if (results.length) {
      this.body.append(h('div', { class: 'panel-section-head' }, h('span', {}, T.found(results.length)), h('span', { class: 'panel-hint' }, ...rich(T.enterInserts, { enter: h('kbd', {}, T.enterKey) }))))
      const list = h('div', { class: 'result-list' })
      results.forEach((r, i) => {
        const entry = r.entry
        const main = entry.forms[0]
        list.append(
          h(
            'div',
            { class: `result-row${i === this.resultIndex ? ' is-selected' : ''}` },
            h(
              'button',
              {
                class: 'result-main',
                title: entry.note ?? entry.name,
                attrs: { type: 'button' },
                on: { mousedown: preventFocusSteal, click: () => this.insert(entry, main) },
              },
              h('span', { class: 'result-render', html: renderTex(cardPreview(main), !!entry.display, true).html }),
              h('span', { class: 'result-text' }, h('span', { class: 'result-name' }, entry.name), h('code', {}, displayCode(main))),
            ),
            entry.forms.length > 1
              ? h(
                  'div',
                  { class: 'result-variants' },
                  entry.forms.slice(1).map((f) => this.card(entry, f, { compact: true, onPick: () => this.insert(entry, f) })),
                )
              : null,
          ),
        )
      })
      this.body.append(list)
    } else {
      this.body.append(h('div', { class: 'panel-empty' }, T.noneFound))
    }
    this.body.append(this.renderAiBox())
  }

  private renderAiBox(): HTMLElement {
    const question = this.query.trim()
    const box = h('div', { class: 'ai-box' })
    const ai = this.ai
    if (ai.status === 'idle' || ai.question !== question) {
      box.append(
        h(
          'button',
          {
            class: 'btn btn-ai',
            attrs: { type: 'button', disabled: question.length < 2 },
            title: T.askAiKeys,
            on: { click: () => void this.askAi() },
          },
          icon(ICONS.sparkles, 16),
          T.askAi(question.length > 40 ? question.slice(0, 40) + '…' : question),
        ),
        h('p', { class: 'ai-hint' }, T.askAiHint),
      )
      return box
    }
    if (ai.status === 'loading') {
      box.append(
        h('div', { class: 'ai-loading' }, h('span', { class: 'spinner', attrs: { 'aria-hidden': 'true' } }), T.searching),
        h('button', { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => ai.controller.abort() } }, T.cancel),
      )
      return box
    }
    if (ai.status === 'error') {
      box.append(h('p', { class: 'ai-error' }, ai.message))
      // I messaggi arrivano da src/ai/assistant.ts, in italiano o in inglese: chiave e impostazioni nelle due lingue.
      if (/chiave|impostazioni|\bkey\b|settings/i.test(ai.message)) {
        box.append(h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => this.deps.openSettings() } }, icon(ICONS.settings, 14), T.openSettings))
      } else {
        box.append(h('button', { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => void this.askAi() } }, T.tryAgain))
      }
      return box
    }
    // Risposta pronta
    // Si vede sempre quale modello ha risposto.
    box.append(
      h(
        'div',
        { class: 'panel-section-head' },
        h('span', {}, icon(ICONS.sparkles, 14), T.aiAnswer),
        ai.result.model ? h('span', { class: 'ai-model', title: T.modelTitle }, ai.result.model) : null,
      ),
    )
    if (!ai.result.answers.length) box.append(h('p', { class: 'panel-empty' }, T.noAnswers))
    for (const a of ai.result.answers) {
      const rendered = a.error ? null : renderTex(a.latex, false).html
      box.append(
        h(
          'div',
          { class: 'ai-answer' },
          h('div', { class: 'ai-answer-render', html: rendered ?? '' }, a.error ? h('span', { class: 'formula-error' }, cleanKatexError(a.error)) : null),
          h('code', { class: 'ai-answer-code' }, a.latex),
          h('p', { class: 'ai-answer-desc' }, a.description),
          h(
            'div',
            { class: 'answer-actions' },
            h(
              'button',
              {
                class: 'btn btn-primary btn-small',
                attrs: { type: 'button' },
                on: { mousedown: preventFocusSteal, click: () => this.deps.editor.insert(a.latex, false) },
              },
              T.insert,
            ),
            h('button', { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => void this.copy(a.latex) } }, T.copy),
          ),
        ),
      )
    }
    if (ai.result.note) box.append(h('p', { class: 'ai-note' }, ai.result.note))
    return box
  }

  private renderCategories(): void {
    const tabs = h(
      'div',
      { class: 'cat-tabs', attrs: { role: 'tablist', 'aria-label': T.categories } },
      CATEGORIES.map((c) =>
        h(
          'button',
          {
            class: `cat-tab${c.id === this.category ? ' is-active' : ''}`,
            title: c.label,
            attrs: { type: 'button', role: 'tab', 'aria-selected': c.id === this.category ? 'true' : 'false', 'aria-label': c.label },
            on: {
              mousedown: preventFocusSteal,
              click: () => {
                this.category = c.id
                this.render()
              },
            },
          },
          h('span', { class: 'cat-icon', html: renderTex(c.icon, false, true).html }),
        ),
      ),
    )
    const current = CATEGORIES.find((c) => c.id === this.category)!
    this.body.append(
      tabs,
      h('div', { class: 'panel-section-head' }, h('span', {}, current.label), h('span', { class: 'panel-hint' }, T.clickToInsert)),
    )

    const container = h('div', { class: 'cat-content' })
    let grid: HTMLElement | null = null
    for (const entry of symbolsInCategory(this.category)) {
      if (entry.forms.length === 1) {
        if (!grid) {
          grid = h('div', { class: 'sym-grid' })
          container.append(grid)
        }
        grid.append(this.card(entry, entry.forms[0], { onPick: () => this.insert(entry, entry.forms[0]) }))
      } else {
        grid = null
        container.append(
          h(
            'div',
            { class: 'sug-group' },
            h('div', { class: 'sug-title' }, h('span', {}, entry.name), h('code', { class: 'sug-cmd' }, entry.cmd.startsWith('\\') ? entry.cmd : '')),
            h('div', { class: 'sug-forms' }, entry.forms.map((f) => this.card(entry, f, { onPick: () => this.insert(entry, f) }))),
            entry.note ? h('div', { class: 'sug-note' }, entry.note) : null,
          ),
        )
      }
    }
    this.body.append(container)
  }
}
