import { askAi, type AiResult } from '../ai/assistant'
import type { MarkdownEditor } from '../editor/editor'
import { formulaAtCursor, insertGraphBlock } from '../editor/graphInsert'
import { chooseWindow } from '../graph/plot'
import { formulaGraph } from '../graph/spec'
import { graphSvg, graphTitle, PALETTES } from '../graph/svg'
import type { SuggestionItem } from '../editor/suggestions'
import { cleanKatexError, renderTex } from '../render/katex'
import { isConfidentAnswer, searchSymbols, type SearchResult } from '../search/search'
import { CATEGORIES, symbolsInCategory, type CategoryId, type SymbolEntry, type SymbolForm } from '../symbols'
import { cardPreviewTex, formPreviewTex, templateText } from '../symbols/template'
import type { Settings } from '../store/settings'
import { ICONS, clear, h, icon } from './dom'

export interface SidePanelDeps {
  editor: MarkdownEditor
  settings: () => Settings
  /** Il tema scuro è attivo (per i colori del grafico della formula). */
  isDark: () => boolean
  openSettings: () => void
  toast: (message: string, kind?: 'info' | 'error') => void
}

type AiState =
  | { status: 'idle' }
  | { status: 'loading'; question: string; controller: AbortController }
  | { status: 'done'; question: string; result: AiResult }
  | { status: 'error'; question: string; message: string }

const EMPTY_GROUP_RE = /(?<=[\^_}]|\\[a-zA-Z]+)\{\}/g
const EMPTY_GROUP_TEX = String.raw`{\htmlClass{mh-ph}{\square}}`

/** Codice mostrato sotto un'anteprima: ciò che verrà inserito. */
function displayCode(form: SymbolForm): string {
  return templateText(form.tex)
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

  constructor(private readonly deps: SidePanelDeps) {
    this.searchInput = h('input', {
      class: 'panel-search-input',
      attrs: {
        type: 'search',
        placeholder: 'Cerca un simbolo… es. «infinito», «per ogni»',
        'aria-label': 'Cerca un simbolo',
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
        title: 'Cancella la ricerca',
        attrs: { type: 'button', 'aria-label': 'Cancella la ricerca', hidden: true },
        on: { click: () => this.resetSearch(true) },
      },
      icon(ICONS.x, 16),
    )
    this.formulaRender = h('div', { class: 'formula-render', attrs: { 'aria-live': 'polite' } })
    this.formulaMeta = h('span', { class: 'formula-meta' })
    this.formulaError = h('div', { class: 'formula-error', attrs: { role: 'status' } })
    this.formulaGraphCanvas = h('div', { class: 'formula-graph-canvas' })
    this.formulaGraph = h(
      'div',
      { class: 'formula-graph', attrs: { hidden: true } },
      this.formulaGraphCanvas,
      h(
        'button',
        {
          class: 'btn btn-small formula-graph-insert',
          title: 'Mette nella nota un blocco ```grafico con questa funzione, che l\'anteprima disegna',
          attrs: { type: 'button' },
          on: {
            mousedown: preventFocusSteal,
            click: () => {
              const found = formulaAtCursor(this.deps.editor.view)
              if (found) insertGraphBlock(this.deps.editor.view, found.tex, found.to)
            },
          },
        },
        'Inserisci il grafico',
      ),
    )
    this.body = h('div', { class: 'panel-body' })

    this.el = h(
      'aside',
      { class: 'symbols-panel', attrs: { id: 'symbols-panel', 'aria-label': 'Pannello dei simboli' } },
      h(
        'div',
        { class: 'panel-search' },
        h('span', { class: 'panel-search-icon' }, icon(ICONS.search, 16)),
        this.searchInput,
        this.clearButton,
        h('kbd', { class: 'panel-search-kbd', title: 'Scorciatoia' }, 'Ctrl K'),
      ),
      h(
        'section',
        { class: 'formula-box' },
        h('div', { class: 'formula-head' }, h('span', {}, 'Anteprima formula'), this.formulaMeta),
        this.formulaRender,
        this.formulaError,
        this.formulaGraph,
      ),
      this.body,
    )

    deps.editor.suggestions.subscribe(() => {
      this.render()
      this.updateFormula()
      this.updateGraph()
    })
    this.updateFormula()
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
    this.formulaGraphCanvas.innerHTML = graphSvg(spec, chooseWindow(spec, width, height), { ...palette, halo: surface || palette.halo }, { id: 'formula-graph', title: graphTitle(spec) })
    this.formulaGraph.hidden = false
  }

  focusSearch(): void {
    this.searchInput.focus()
    this.searchInput.select()
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
      meta = region.display ? 'a blocco' : 'in linea'
      // Sostituisce il comando parziale con il suggerimento selezionato.
      const plain = region.tex.length === region.contentTo - region.contentFrom
      if (item && token && plain && token.from >= region.contentFrom && token.to <= region.contentTo) {
        const a = token.from - region.contentFrom
        const b = token.to - region.contentFrom
        tex = tex.slice(0, a) + formPreviewTex(item.form) + tex.slice(b)
        meta = `con ${displayCode(item.form)}`
      }
    } else if (item) {
      tex = formPreviewTex(item.form)
      display = true
      meta = `anteprima di ${displayCode(item.form)}`
    }

    const key = tex === null ? '' : `${display ? 'D' : 'I'}${meta}\u0000${tex}`
    if (key === this.lastFormulaKey) return
    this.lastFormulaKey = key
    this.formulaMeta.textContent = meta

    if (tex === null) {
      this.formulaRender.classList.add('is-empty')
      this.formulaRender.classList.remove('is-stale')
      this.formulaRender.textContent = 'Metti il cursore dentro una formula ($ … $) per vederla qui mentre scrivi.'
      this.formulaError.textContent = ''
      return
    }
    this.formulaRender.classList.remove('is-empty')
    if (!tex.trim()) {
      this.formulaRender.classList.remove('is-stale')
      this.formulaRender.textContent = 'Formula vuota: inizia a scrivere…'
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
      const result = await askAi(question, { apiKey: settings.apiKey, model: settings.model, baseUrl: settings.apiBaseUrl }, controller.signal)
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
    this.deps.editor.insert(form.tex, entry.display)
  }

  private async copy(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text)
      this.deps.toast(`Copiato: ${text}`)
    } catch {
      this.deps.toast('Impossibile copiare negli appunti', 'error')
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
    const { html, error } = renderTex(cardPreviewTex(form), !!entry.display, true)
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
        h('span', {}, 'Suggerimenti per ', h('code', {}, `\\${token.prefix}`)),
        s.keyboardActive
          ? h('span', { class: 'panel-hint' }, h('kbd', {}, 'Tab'), ' inserisce · ', h('kbd', {}, '↑↓'), ' scegli · ', h('kbd', {}, 'Esc'))
          : h('span', { class: 'panel-hint' }, 'clicca per inserire'),
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
          h('div', { class: 'answer-kicker' }, 'Risposta'),
          h(
            'button',
            {
              class: 'answer-main',
              title: 'Inserisci nella nota',
              attrs: { type: 'button' },
              on: { mousedown: preventFocusSteal, click: () => this.insert(top.entry, form) },
            },
            h('span', { class: 'answer-render', html: renderTex(cardPreviewTex(form), !!top.entry.display, true).html }),
            h('span', { class: 'answer-text' }, h('strong', {}, top.entry.name), h('code', {}, code)),
          ),
          h(
            'div',
            { class: 'answer-actions' },
            h('button', { class: 'btn btn-primary', attrs: { type: 'button' }, on: { mousedown: preventFocusSteal, click: () => this.insert(top.entry, form) } }, 'Inserisci'),
            h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => void this.copy(code) } }, icon(ICONS.copy, 14), 'Copia'),
          ),
        ),
      )
    }

    if (results.length) {
      this.body.append(h('div', { class: 'panel-section-head' }, h('span', {}, `${results.length} simboli trovati`), h('span', { class: 'panel-hint' }, h('kbd', {}, 'Invio'), ' inserisce')))
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
              h('span', { class: 'result-render', html: renderTex(cardPreviewTex(main), !!entry.display, true).html }),
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
      this.body.append(h('div', { class: 'panel-empty' }, 'Nessun simbolo trovato con queste parole.'))
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
            title: 'Ctrl+Invio',
            on: { click: () => void this.askAi() },
          },
          icon(ICONS.sparkles, 16),
          ` Chiedi all'AI: «${question.length > 40 ? question.slice(0, 40) + '…' : question}»`,
        ),
        h('p', { class: 'ai-hint' }, 'Per domande più complesse, es. «freccia con scritto sopra n → ∞» o «matrice 4×4 con puntini».'),
      )
      return box
    }
    if (ai.status === 'loading') {
      box.append(
        h('div', { class: 'ai-loading' }, h('span', { class: 'spinner', attrs: { 'aria-hidden': 'true' } }), 'Sto cercando la risposta…'),
        h('button', { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => ai.controller.abort() } }, 'Annulla'),
      )
      return box
    }
    if (ai.status === 'error') {
      box.append(h('p', { class: 'ai-error' }, ai.message))
      if (/chiave/i.test(ai.message)) {
        box.append(h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => this.deps.openSettings() } }, icon(ICONS.settings, 14), ' Apri le impostazioni'))
      } else {
        box.append(h('button', { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => void this.askAi() } }, 'Riprova'))
      }
      return box
    }
    // Risposta pronta
    box.append(h('div', { class: 'panel-section-head' }, h('span', {}, icon(ICONS.sparkles, 14), ' Risposta dell\'AI')))
    if (!ai.result.answers.length) box.append(h('p', { class: 'panel-empty' }, 'Nessuna formula proposta.'))
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
              'Inserisci',
            ),
            h('button', { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => void this.copy(a.latex) } }, 'Copia'),
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
      { class: 'cat-tabs', attrs: { role: 'tablist', 'aria-label': 'Categorie di simboli' } },
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
      h('div', { class: 'panel-section-head' }, h('span', {}, current.label), h('span', { class: 'panel-hint' }, 'clicca per inserire')),
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
