/**
 * «Spiega con l'AI» (il pulsante ✨ sopra il testo, 7 ottobre 2026): nel posto del pannello dei simboli,
 * l'elenco di quello che si può spiegare nella nota (src/editor/explainSubjects.ts: i conti, i grafici, le
 * formule senza un conto, i teoremi e le definizioni)
 * e, scelto uno, la sua spiegazione, nello stesso riquadro di «Spiegami» (src/ui/explainPanel.ts: il modello
 * nel browser, Glifo che controlla le formule). L'elenco si rifà quando cambia la nota, solo se si vede.
 */
import type { Text } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { formulaTopic, graphTopic, theoremTopic } from '../ai/topics'
import type { MarkdownEditor } from '../editor/editor'
import { subjectsIn, type NoteSubject, type SubjectKind } from '../editor/explainSubjects'
import { escapeHtml, renderTex } from '../render/katex'
import type { Settings } from '../store/settings'
import { ICONS, h, icon } from './dom'
import { ExplainPanel, type ExplainModel, type ExplainSubject } from './explainPanel'

export interface AiPanelDeps {
  editor: MarkdownEditor
  settings: () => Settings
  openSettings: () => void
  toast: (message: string, kind?: 'info' | 'error') => void
  /** La ✕ in alto: chiude il pannello. */
  onClose: () => void
  /** Il modello: nei test uno finto. */
  model?: () => ExplainModel
}

const KIND_NAMES: Record<SubjectKind, string> = { conto: 'Conto', grafico: 'Grafico', formula: 'Formula', teorema: 'Teorema' }

/** Dopo quanto, smesso di scrivere, l'elenco si rifà (in millisecondi). */
const REFRESH_MS = 300

function texInline(tex: string): string {
  const { html, error } = renderTex(tex, false)
  return error ? `<code>${escapeHtml(tex)}</code>` : html
}

/** Come si vede un grafico nell'elenco: il titolo scritto nel blocco, se no la prima riga, disegnata. */
function graphLabel(source: string): string {
  const lines = source.split('\n').map((l) => l.trim()).filter(Boolean)
  const title = lines.find((l) => /^titolo\s*:/i.test(l))
  if (title) return escapeHtml(title.replace(/^titolo\s*:\s*/i, '').replace(/\$/g, ''))
  return texInline(lines[0] ?? '')
}

export class AiPanel {
  readonly el: HTMLElement
  private readonly list: HTMLElement
  private readonly empty: HTMLElement
  private readonly explain: ExplainPanel
  private subjects: NoteSubject[] = []
  /** Quello scelto (tipo e testo): resta scelto anche se la nota cambia altrove. */
  private chosen: string | null = null
  private visible = false
  /** La nota dell'ultimo elenco: se non è cambiata, non si rifà. */
  private doc: Text | null = null
  private timer = 0

  constructor(private readonly deps: AiPanelDeps) {
    this.explain = new ExplainPanel({ editor: deps.editor, settings: deps.settings, openSettings: deps.openSettings, toast: deps.toast, ...(deps.model && { model: deps.model }) })
    this.list = h('ul', { class: 'ai-subjects', attrs: { 'aria-label': 'Quello che si può spiegare nella nota' } })
    this.empty = h(
      'p',
      { class: 'ai-panel-empty', attrs: { hidden: true } },
      'In questa nota non c\'è ancora niente da spiegare: scrivi una formula (anche un conto, con «=» alla fine: ',
      h('span', { html: texInline('\\int_0^1 x^2 \\, dx =') }),
      '), un teorema o una definizione, o inserisci un grafico.',
    )
    this.el = h(
      'section',
      { class: 'ai-panel', attrs: { 'aria-label': 'Spiega con l\'AI' } },
      h(
        'div',
        { class: 'ai-panel-head' },
        h('span', { class: 'ai-panel-title' }, icon(ICONS.sparkles, 18), 'Spiega con l\'AI'),
        h(
          'button',
          { class: 'icon-button ai-panel-close', title: 'Chiudi', attrs: { type: 'button', 'aria-label': 'Chiudi il pannello' }, on: { click: () => deps.onClose() } },
          icon(ICONS.x, 16),
        ),
      ),
      h('p', { class: 'ai-panel-label' }, 'Nella nota: scegli cosa spiegare'),
      this.list,
      this.empty,
      this.explain.el,
    )
    deps.editor.suggestions.subscribe(() => this.schedule())
  }

  /** Il pannello si vede: l'elenco della nota di adesso. */
  show(): void {
    this.visible = true
    this.refresh()
  }

  hide(): void {
    this.visible = false
    window.clearTimeout(this.timer)
  }

  /** Si è passati a un'altra nota: la spiegazione di quella di prima non c'entra più. */
  reset(): void {
    this.explain.close()
    this.chosen = null
    this.doc = null
    if (this.visible) this.refresh()
    else this.render()
  }

  private schedule(): void {
    if (!this.visible) return
    window.clearTimeout(this.timer)
    this.timer = window.setTimeout(() => this.refresh(), REFRESH_MS)
  }

  /** Rifà l'elenco, se la nota è cambiata. */
  refresh(): void {
    const { state } = this.deps.editor.view
    if (state.doc === this.doc) return
    this.doc = state.doc
    this.subjects = subjectsIn(state)
    this.render()
  }

  private key(s: NoteSubject): string {
    return `${s.kind}\n${s.source}`
  }

  private render(): void {
    this.empty.hidden = this.subjects.length > 0
    this.list.replaceChildren(
      ...this.subjects.map((s) => {
        const chosen = this.key(s) === this.chosen
        const body = s.kind === 'grafico' ? graphLabel(s.source) : s.kind === 'teorema' ? escapeHtml(s.title ?? '') : texInline(s.source)
        return h(
          'li',
          {},
          h(
            'button',
            {
              class: `ai-subject${chosen ? ' is-chosen' : ''}`,
              attrs: { type: 'button', 'aria-pressed': String(chosen), 'data-kind': s.kind },
              on: { click: () => void this.choose(s) },
            },
            h('span', { class: 'ai-subject-kind' }, s.kind === 'teorema' && s.tag ? s.tag : KIND_NAMES[s.kind]),
            h('span', { class: 'ai-subject-body', html: body }),
          ),
        )
      }),
    )
  }

  /** Spiega quello che si è scelto, e nella nota si va lì (senza spostare il cursore). */
  private async choose(s: NoteSubject): Promise<void> {
    this.chosen = this.key(s)
    this.render()
    this.deps.editor.view.dispatch({ effects: EditorView.scrollIntoView(s.from, { y: 'center' }) })
    const topic =
      s.kind === 'grafico' ? graphTopic(s.source, s.defs ?? []) : s.kind === 'formula' ? formulaTopic(s.source, s.defs ?? []) : s.kind === 'teorema' ? theoremTopic(s.source, s.title ?? '') : null
    const subject: ExplainSubject | null = s.kind === 'conto' && s.target ? { kind: 'conto', target: s.target } : topic ? { kind: 'topic', topic, source: s.source } : null
    // Dove ritrovarla per inserire la spiegazione: la fine del conto, o l'inizio del suo testo (per un grafico
    // non la riga ```, più vicina a una formula uguale scritta appena prima).
    const near = s.kind === 'conto' ? s.to : s.from + Math.max(0, this.deps.editor.view.state.sliceDoc(s.from, s.to).indexOf(s.source))
    if (subject) await this.explain.explainSubject(subject, near)
  }
}
