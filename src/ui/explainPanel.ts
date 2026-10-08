/**
 * «Spiegami» nel pannello della formula (src/ui/sidePanel.ts): il pulsante sotto l'anteprima, quando la
 * formula sotto il cursore è un conto che Glifo sa fare, e sotto il riquadro la spiegazione: lo scaricamento
 * del modello (la prima volta), il testo mentre il modello lo scrive, poi i passaggi con il segno di Glifo
 * (✓, ✗ con il valore giusto, o «non controllato»), «Inserisci nella nota» e «Rifai». La spiegazione resta
 * finché non se ne chiede un'altra o si chiude, anche spostando il cursore. Vedi src/ai/explain.ts.
 * Lo stesso riquadro spiega anche quello che si sceglie nel pannello «Spiega con l'AI» (src/ui/aiPanel.ts):
 * un conto o un grafico (`explainSubject`); lì, sotto la spiegazione, la chat (src/ui/explainChat.ts).
 */
import { chatContext, explain, explainTopic, REPLY_TOKENS, type ExplainEvents, type Explanation, type ExplainTarget, type ExplainTopic } from '../ai/explain'
import { LocalAbort, localLlm, type ChatMessage, type ChatOptions, type LoadProgress } from '../ai/local'
import { localModel, modelName } from '../ai/localModels'
import type { MarkdownEditor } from '../editor/editor'
import { explanationMarkdown, insertAfterText, insertExplanation, regionToExplain, targetAt } from '../editor/explainInsert'
import type { MathRegion } from '../editor/mathContext'
import { inClaudeViewer } from '../host'
import type { Settings } from '../store/settings'
import { ICONS, h, icon } from './dom'
import { ExplainChat } from './explainChat'
import { formulasSummary, stepsList, texHtml } from './explainSteps'

/** Il modello: quello nel browser (src/ai/local.ts), o uno finto nei test. */
export interface ExplainModel {
  load(model: string, onProgress?: (p: LoadProgress) => void): Promise<string>
  chat(messages: ChatMessage[], options?: ChatOptions, onDelta?: (text: string) => void, signal?: AbortSignal): Promise<string>
}

export interface ExplainPanelDeps {
  editor: MarkdownEditor
  settings: () => Settings
  openSettings: () => void
  toast: (message: string, kind?: 'info' | 'error') => void
  model?: () => ExplainModel
  /** Sotto la spiegazione, la chat per le domande (nel pannello «Spiega con l'AI»). */
  chat?: boolean
}

/** Cosa si spiega: un conto della nota, o un'altra cosa (un grafico…) con il testo per ritrovarla nella nota. */
export type ExplainSubject = { kind: 'conto'; target: ExplainTarget } | { kind: 'topic'; topic: ExplainTopic; source: string }

/** Quello che si spiega e dove era nella nota (per rimetterci la spiegazione). */
interface Asked {
  subject: ExplainSubject
  near: number
  controller: AbortController
}

type State =
  | { status: 'idle' }
  | { status: 'loading'; asked: Asked; progress: number; fetching: boolean }
  | { status: 'writing'; asked: Asked; model: string; correcting: boolean; tools: number }
  | { status: 'done'; asked: Asked; model: string; explanation: Explanation }
  | { status: 'error'; asked: Asked; message: string }

function preventFocusSteal(ev: MouseEvent): void {
  ev.preventDefault()
}

export class ExplainPanel {
  /** «Spiegami», nel riquadro della formula. */
  readonly button: HTMLButtonElement
  /** La spiegazione, sotto il riquadro. */
  readonly el: HTMLElement
  private state: State = { status: 'idle' }
  /** La formula sotto il cursore, se c'è un conto da spiegare (si ricalcola solo quando cambiano nota o formula). */
  private here: { region: MathRegion; target: ExplainTarget } | null = null
  private hereKey: unknown[] = []
  /** Il testo che il modello sta scrivendo (si aggiorna senza ridisegnare il resto). */
  private draft: HTMLElement | null = null
  private draftText = ''
  /** La chat della spiegazione che si vede (con `deps.chat`). */
  private chat: { asked: Asked; view: ExplainChat } | null = null

  constructor(private readonly deps: ExplainPanelDeps) {
    this.button = h(
      'button',
      {
        class: 'btn btn-small btn-explain',
        title: 'I passaggi di questo conto, scritti da un modello AI nel browser e controllati da Glifo',
        attrs: { type: 'button', hidden: true },
        on: { mousedown: preventFocusSteal, click: () => void this.start() },
      },
      icon(ICONS.sparkles, 14),
      'Spiegami',
    )
    this.el = h('section', { class: 'explain-box', attrs: { hidden: true, 'aria-label': 'Spiegazione' } })
  }

  /** Il cursore si è mosso o la nota è cambiata: «Spiegami» c'è solo su un conto che Glifo sa fare. */
  update(): void {
    const state = this.deps.editor.view.state
    const region = regionToExplain(state)
    const key = [state.doc, region?.from, region?.to]
    if (key.every((k, i) => k === this.hereKey[i])) return
    this.hereKey = key
    let target: ExplainTarget | null = null
    try {
      target = region ? targetAt(state, region) : null
    } catch {
      target = null
    }
    this.here = region && target ? { region, target } : null
    this.button.hidden = !this.here
  }

  private model(): ExplainModel {
    return (this.deps.model ?? localLlm)()
  }

  private set(state: State): void {
    this.state = state
    this.render()
  }

  private current(asked: Asked): boolean {
    return this.state.status !== 'idle' && this.state.asked === asked
  }

  /** Spiega la formula sotto il cursore (o, con `again`, di nuovo quella già spiegata). */
  async start(again?: Asked): Promise<void> {
    if (again) return this.run(again.subject, again.near)
    if (this.here) return this.run({ kind: 'conto', target: this.here.target }, this.here.region.to)
  }

  /** Spiega quello che si è scelto nel pannello «Spiega con l'AI»; `near`: dov'è nella nota. */
  explainSubject(subject: ExplainSubject, near: number): Promise<void> {
    return this.run(subject, near)
  }

  private async run(subject: ExplainSubject, near: number): Promise<void> {
    if (this.state.status === 'loading' || this.state.status === 'writing') this.state.asked.controller.abort()
    this.endChat()
    const asked: Asked = { subject, near, controller: new AbortController() }
    const settings = this.deps.settings()
    const chosen = localModel(settings.localModel)
    const model = this.model()
    if (inClaudeViewer() && !this.deps.model) {
      // La pagina di claude.ai blocca i download da altri siti: il modello non arriverebbe mai.
      this.set({ status: 'error', asked, message: 'Dentro claude.ai il modello non si può scaricare (la pagina blocca i download da Hugging Face): «Spiegami» funziona su Glifo aperto dal suo sito, con Chrome o Edge su un computer.' })
      return
    }
    this.set({ status: 'loading', asked, progress: 0, fetching: false })
    try {
      const loaded = await model.load(chosen.id, (p) => {
        if (!this.current(asked) || this.state.status !== 'loading') return
        const fetching = /fetch|download/i.test(p.text)
        if (Math.round(p.progress * 100) === Math.round(this.state.progress * 100) && fetching === this.state.fetching) return
        this.set({ status: 'loading', asked, progress: p.progress, fetching })
      })
      if (!this.current(asked)) return
      const name = modelName(loaded)
      this.set({ status: 'writing', asked, model: name, correcting: false, tools: 0 })
      const chat = (messages: ChatMessage[], onDelta?: (text: string) => void) => model.chat(messages, { maxTokens: REPLY_TOKENS }, onDelta, asked.controller.signal)
      const events = this.events(asked)
      const explanation = await (subject.kind === 'conto' ? explain(subject.target, settings.explainTone, chat, events) : explainTopic(subject.topic, settings.explainTone, chat, events))
      if (!this.current(asked)) return
      if (this.deps.chat) {
        const context = chatContext(subject.kind === 'conto' ? subject.target : subject.topic, explanation)
        this.chat = { asked, view: new ExplainChat({ context, settings: this.deps.settings, model: () => this.model() }) }
      }
      this.set({ status: 'done', asked, model: name, explanation })
    } catch (err) {
      if (!this.current(asked)) return
      if (err instanceof LocalAbort || asked.controller.signal.aborted) this.set({ status: 'idle' })
      else this.set({ status: 'error', asked, message: err instanceof Error ? err.message : String(err) })
    }
  }

  /** Cosa fa sapere il giro con il modello (src/ai/explain.ts) al riquadro. */
  private events(asked: Asked): ExplainEvents {
    return {
      onStatus: (status) => {
        if (!this.current(asked) || this.state.status !== 'writing') return
        if (status === 'tool') return
        this.set({ ...this.state, correcting: status === 'correcting' })
      },
      onDelta: (text) => this.write(asked, text),
      onTool: () => {
        if (this.current(asked) && this.state.status === 'writing') this.set({ ...this.state, tools: this.state.tools + 1 })
      },
    }
  }

  /** Un pezzo di testo del modello: si vede in fondo al riquadro, mentre arriva. */
  private write(asked: Asked, text: string): void {
    if (!this.current(asked) || !this.draft) return
    this.draftText = (this.draftText + text).slice(-600)
    // Le chiamate al motore (<tool_call>…) non si mostrano come testo.
    this.draft.textContent = this.draftText.replace(/<tool_call>[\s\S]*?(<\/tool_call>|$)/g, ' ⚙ ').replace(/<\/?think>/g, '')
    this.draft.scrollTop = this.draft.scrollHeight
  }

  /** Chiude la spiegazione (e ferma il modello, se sta scrivendo). */
  close(): void {
    if (this.state.status === 'loading' || this.state.status === 'writing') this.state.asked.controller.abort()
    this.endChat()
    this.set({ status: 'idle' })
  }

  /** La chat della spiegazione di prima non serve più: se il modello sta rispondendo, si ferma. */
  private endChat(): void {
    this.chat?.view.destroy()
    this.chat = null
  }

  private insert(asked: Asked, explanation: Explanation): void {
    const { view } = this.deps.editor
    const markdown = explanationMarkdown(explanation)
    const s = asked.subject
    const ok = s.kind === 'conto' ? insertExplanation(view, markdown, s.target.tex, asked.near) : insertAfterText(view, markdown, s.source, asked.near)
    if (ok) this.deps.toast('Spiegazione inserita nella nota')
    else this.deps.toast(`${s.kind === 'conto' ? 'La formula' : 'Quello che hai fatto spiegare'} non c'è più nella nota: la spiegazione non si può inserire`, 'error')
  }

  private render(): void {
    const s = this.state
    this.draft = null
    if (s.status === 'idle') {
      this.el.hidden = true
      this.el.replaceChildren()
      return
    }
    this.el.hidden = false
    const head = h(
      'div',
      { class: 'explain-head' },
      h('span', { class: 'explain-title' }, icon(ICONS.sparkles, 14), 'Spiegazione'),
      s.status === 'writing' || s.status === 'done' ? h('span', { class: 'ai-model', title: 'Il modello che scrive la spiegazione, in questo browser' }, s.model) : null,
      h(
        'button',
        { class: 'icon-button explain-close', title: 'Chiudi la spiegazione', attrs: { type: 'button', 'aria-label': 'Chiudi la spiegazione' }, on: { click: () => this.close() } },
        icon(ICONS.x, 15),
      ),
    )
    const formula = this.subjectView(s.asked.subject)
    const parts: (HTMLElement | null)[] = [head, formula]
    if (s.status === 'loading') {
      const chosen = localModel(this.deps.settings().localModel)
      const percent = Math.round(s.progress * 100)
      parts.push(
        h('div', { class: 'ai-loading', attrs: { role: 'status' } }, h('span', { class: 'spinner', attrs: { 'aria-hidden': 'true' } }), s.fetching ? `Scarico ${chosen.name}: ${percent}%` : `Preparo ${chosen.name}: ${percent}%`),
        h('progress', { class: 'explain-progress', attrs: { max: 100, value: percent, 'aria-label': 'Avanzamento' } }),
        h('p', { class: 'ai-hint' }, `La prima volta il modello si scarica (${chosen.size}) e poi resta in questo browser, anche offline.`),
        this.cancelButton(),
      )
    } else if (s.status === 'writing') {
      this.draft = h('pre', { class: 'explain-draft', attrs: { 'aria-hidden': 'true' } })
      this.draft.textContent = this.draftText = ''
      parts.push(
        h(
          'div',
          { class: 'ai-loading', attrs: { role: 'status' } },
          h('span', { class: 'spinner', attrs: { 'aria-hidden': 'true' } }),
          s.asked.subject.kind === 'conto'
            ? s.correcting
              ? 'Correggo i passaggi che Glifo ha segnato…'
              : 'Scrivo i passaggi…'
            : s.correcting
              ? 'Correggo le formule che Glifo ha segnato…'
              : 'Scrivo la spiegazione…',
        ),
        s.tools ? h('p', { class: 'ai-hint' }, `Conti fatti dal motore di Glifo: ${s.tools}`) : null,
        this.draft,
        this.cancelButton(),
      )
    } else if (s.status === 'error') {
      parts.push(h('p', { class: 'ai-error' }, s.message))
      const actions = h('div', { class: 'answer-actions' })
      if (/impostazioni/i.test(s.message)) actions.append(h('button', { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => this.deps.openSettings() } }, icon(ICONS.settings, 14), 'Impostazioni'))
      actions.append(h('button', { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => void this.start(s.asked) } }, 'Riprova'))
      parts.push(actions)
    } else {
      parts.push(...this.stepsView(s.asked, s.explanation))
      if (this.chat?.asked === s.asked) parts.push(this.chat.view.el)
    }
    this.el.replaceChildren(...parts.filter((p): p is HTMLElement => p !== null))
  }

  /** In cima alla spiegazione: il conto, o la formula o il nome di quello che si spiega. */
  private subjectView(subject: ExplainSubject): HTMLElement {
    if (subject.kind === 'conto') {
      const { target } = subject
      return h('div', { class: 'explain-formula', html: texHtml(target.kind === 'solve' ? `${target.question} \\Rightarrow` : target.question, true) })
    }
    const { title } = subject.topic
    return 'tex' in title ? h('div', { class: 'explain-formula', html: texHtml(title.tex, true) }) : h('div', { class: 'explain-formula explain-title-text' }, title.text)
  }

  /** Annulla: la spiegazione si chiude subito (lo scaricamento del modello, se c'è, finisce nel worker e resta per la prossima volta). */
  private cancelButton(): HTMLElement {
    return h('button', { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => this.close() } }, 'Annulla')
  }

  private stepsView(asked: Asked, e: Explanation): HTMLElement[] {
    const list = stepsList(e)
    const conto = asked.subject.kind === 'conto'
    let summary: HTMLElement
    if (asked.subject.kind === 'conto') {
      const formulas = e.steps.filter((s) => s.formula)
      const checked = formulas.filter((s) => s.check?.ok).length
      const wrong = formulas.filter((s) => s.check && !s.check.ok).length
      const answer = texHtml(asked.subject.target.answer.tex, false)
      summary = h('p', { class: `explain-summary${e.reaches === true && !wrong ? ' is-ok' : e.reaches === false || wrong ? ' is-wrong' : ''}`, attrs: { role: 'status' } })
      summary.innerHTML = [
        e.reaches === true ? `✓ Arriva al risultato di Glifo, ${answer}.` : e.reaches === false ? `✗ L'ultimo passaggio non arriva al risultato di Glifo, ${answer}.` : `Glifo non ha potuto confrontare l'ultimo passaggio con il suo risultato, ${answer}.`,
        formulas.length ? ` Passaggi controllati da Glifo: ${checked} su ${formulas.length}${wrong ? `, ${wrong} sbagliat${wrong === 1 ? 'o' : 'i'}` : ''}.` : '',
      ].join('')
    } else {
      // Qui non c'è un risultato a cui arrivare: Glifo controlla le formule, le frasi no.
      summary = formulasSummary(e, 'questa spiegazione')
    }
    const notes = [
      e.toolCalls ? `il modello ha chiesto ${e.toolCalls === 1 ? 'un conto' : `${e.toolCalls} conti`} al motore` : '',
      e.corrections ? `Glifo gli ha fatto correggere ${conto ? 'i passaggi' : 'le formule'} ${e.corrections === 1 ? 'una volta' : `${e.corrections} volte`}` : '',
    ].filter(Boolean)
    const parts: (HTMLElement | null)[] = [
      list,
      summary,
      notes.length ? h('p', { class: 'ai-hint' }, `${notes.join('; ').replace(/^./, (c) => c.toUpperCase())}.`) : null,
      h(
        'div',
        { class: 'answer-actions' },
        h(
          'button',
          {
            class: 'btn btn-primary btn-small',
            title: conto ? 'Mette i passaggi nella nota, dopo la formula: lì Glifo li controlla come le altre formule' : 'Mette la spiegazione nella nota, subito dopo: lì Glifo controlla le formule come le altre',
            attrs: { type: 'button' },
            on: { mousedown: preventFocusSteal, click: () => this.insert(asked, e) },
          },
          'Inserisci nella nota',
        ),
        h('button', { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => void this.start(asked) } }, 'Rifai'),
      ),
    ]
    return parts.filter((p): p is HTMLElement => p !== null)
  }
}
