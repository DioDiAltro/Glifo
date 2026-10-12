/**
 * «Spiega con l'AI» (il pulsante ✨ sopra il testo, 7 ottobre 2026): nel posto del pannello dei simboli,
 * l'elenco di quello che si può spiegare nella nota (src/editor/explainSubjects.ts: i conti, i grafici, le
 * formule senza un conto, i teoremi e le definizioni, gli schemi e le tabelle)
 * e, scelto uno, la sua spiegazione, nello stesso riquadro di «Spiegami» (src/ui/explainPanel.ts: il modello
 * nel browser, Glifo che controlla le formule), con sotto la chat per le domande (src/ui/explainChat.ts).
 * L'elenco si rifà quando cambia la nota, solo se si vede.
 */
import type { Text } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import type { ExplainTopic } from '../ai/explain'
import { formulaTopic, graphTopic, schemaTopic, tableTopic, theoremTopic } from '../ai/topics'
import type { MarkdownEditor } from '../editor/editor'
import { subjectsIn, type NoteSubject, type SubjectKind } from '../editor/explainSubjects'
import { rich, texts } from '../i18n'
import { parseGraphKey } from '../noteWords'
import { escapeHtml, renderTex } from '../render/katex'
import type { Settings } from '../store/settings'
import { ICONS, h, icon } from './dom'
import type { AiWork } from './aiActivity'
import { ExplainPanel, type ExplainModel, type ExplainSubject } from './explainPanel'

const T = texts({
  kindCalculation: ['Conto', 'Calculation'],
  kindGraph: ['Grafico', 'Graph'],
  kindFormula: ['Formula', 'Formula'],
  kindTheorem: ['Teorema', 'Theorem'],
  kindDiagram: ['Schema', 'Diagram'],
  kindTable: ['Tabella', 'Table'],
  subjects: ['Quello che si può spiegare nella nota', 'What can be explained in the note'],
  empty: [
    'In questa nota non c\'è ancora niente da spiegare: scrivi una formula (anche un conto, con «=» alla fine: {example}), un teorema o una definizione, o inserisci un grafico, uno schema o una tabella.',
    'There\'s nothing to explain in this note yet: write a formula (even a calculation, with “=” at the end: {example}), a theorem or a definition, or insert a graph, a diagram or a table.',
  ],
  explainWithAi: ['Spiega con l\'AI', 'Explain with AI'],
  close: ['Chiudi', 'Close'],
  closePanel: ['Chiudi il pannello', 'Close the panel'],
  choose: ['Nella nota: scegli cosa spiegare', 'In the note: choose what to explain'],
})

export interface AiPanelDeps {
  editor: MarkdownEditor
  settings: () => Settings
  openSettings: () => void
  toast: (message: string, kind?: 'info' | 'error') => void
  /** La ✕ in alto: chiude il pannello. */
  onClose: () => void
  /** Il modello: nei test uno finto. */
  model?: () => ExplainModel
  /** Il pulsante ✨ (src/ui/aiActivity.ts): sa quando la spiegazione e la chat lavorano. */
  activity?: AiWork
}

/** Il tipo di una voce dell'elenco, come si legge accanto a lei. */
function kindName(kind: SubjectKind): string {
  const names: Record<SubjectKind, string> = { conto: T.kindCalculation, grafico: T.kindGraph, formula: T.kindFormula, teorema: T.kindTheorem, schema: T.kindDiagram, tabella: T.kindTable }
  return names[kind]
}

/** Dopo quanto, smesso di scrivere, l'elenco si rifà (in millisecondi). */
const REFRESH_MS = 300

function texInline(tex: string): string {
  const { html, error } = renderTex(tex, false)
  return error ? `<code>${escapeHtml(tex)}</code>` : html
}

/** Cosa si dà al modello per una cosa della nota che non è un conto. */
function topicOf(s: NoteSubject): ExplainTopic | null {
  switch (s.kind) {
    case 'grafico':
      return graphTopic(s.source, s.defs ?? [])
    case 'formula':
      return formulaTopic(s.source, s.defs ?? [])
    case 'teorema':
      return theoremTopic(s.source, s.title ?? '')
    case 'schema':
      return schemaTopic(s.source)
    case 'tabella':
      return tableTopic(s.source)
    default:
      return null
  }
}

/** Come si vede un grafico nell'elenco: il titolo scritto nel blocco, se no la prima riga, disegnata. */
function graphLabel(source: string): string {
  const lines = source.split('\n').map((l) => l.trim()).filter(Boolean)
  // La riga del titolo, scritta in italiano o in inglese (titolo:, title:).
  const title = lines.map((l) => parseGraphKey(l)).find((k) => k?.key === 'titolo')
  if (title) return escapeHtml(title.value.replace(/\$/g, ''))
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
    this.explain = new ExplainPanel({
      editor: deps.editor,
      settings: deps.settings,
      openSettings: deps.openSettings,
      toast: deps.toast,
      chat: true,
      activity: deps.activity,
      ...(deps.model && { model: deps.model }),
    })
    this.list = h('ul', { class: 'ai-subjects', attrs: { 'aria-label': T.subjects } })
    this.empty = h(
      'p',
      { class: 'ai-panel-empty', attrs: { hidden: true } },
      ...rich(T.empty, { example: h('span', { html: texInline('\\int_0^1 x^2 \\, dx =') }) }),
    )
    this.el = h(
      'section',
      { class: 'ai-panel', attrs: { 'aria-label': T.explainWithAi } },
      h(
        'div',
        { class: 'ai-panel-head' },
        h('span', { class: 'ai-panel-title' }, icon(ICONS.sparkles, 18), T.explainWithAi),
        h(
          'button',
          { class: 'icon-button ai-panel-close', title: T.close, attrs: { type: 'button', 'aria-label': T.closePanel }, on: { click: () => deps.onClose() } },
          icon(ICONS.x, 16),
        ),
      ),
      h('p', { class: 'ai-panel-label' }, T.choose),
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
        const body = s.kind === 'grafico' ? graphLabel(s.source) : s.kind === 'conto' || s.kind === 'formula' ? texInline(s.source) : escapeHtml(s.title ?? '')
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
            h('span', { class: 'ai-subject-kind' }, s.kind === 'teorema' && s.tag ? s.tag : kindName(s.kind)),
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
    const topic = topicOf(s)
    const subject: ExplainSubject | null = s.kind === 'conto' && s.target ? { kind: 'conto', target: s.target } : topic ? { kind: 'topic', topic, source: s.source } : null
    // Dove ritrovarla per inserire la spiegazione: la fine del conto, o l'inizio del suo testo (per un blocco
    // non la riga ```, più vicina a una formula uguale scritta appena prima).
    const near = s.kind === 'conto' ? s.to : s.from + Math.max(0, this.deps.editor.view.state.sliceDoc(s.from, s.to).indexOf(s.source))
    if (subject) await this.explain.explainSubject(subject, near)
  }
}
