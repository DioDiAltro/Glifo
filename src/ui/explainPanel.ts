/**
 * «Spiegami» nel pannello della formula (src/ui/sidePanel.ts): il pulsante sotto l'anteprima, quando la
 * formula sotto il cursore è un conto che Glifo sa fare, e sotto il riquadro la spiegazione: lo scaricamento
 * del modello (la prima volta), il testo mentre il modello lo scrive, poi i passaggi con il segno di Glifo
 * (✓, ✗ con il valore giusto, o «non controllato»), «Inserisci nella nota» e «Rifai». La spiegazione resta
 * finché non se ne chiede un'altra o si chiude, anche spostando il cursore. Vedi src/ai/explain.ts.
 */
import { explain, REPLY_TOKENS, type Explanation, type ExplainTarget } from '../ai/explain'
import { LocalAbort, localLlm, type ChatMessage, type ChatOptions, type LoadProgress } from '../ai/local'
import { localModel, modelName } from '../ai/localModels'
import type { MarkdownEditor } from '../editor/editor'
import { explanationMarkdown, insertExplanation, regionToExplain, targetAt } from '../editor/explainInsert'
import type { MathRegion } from '../editor/mathContext'
import { inClaudeViewer } from '../host'
import { checkHtml } from '../render/check'
import { escapeHtml, renderTex } from '../render/katex'
import type { Settings } from '../store/settings'
import { ICONS, h, icon } from './dom'

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
}

/** La formula spiegata: il conto e dove era nella nota (per rimetterci la spiegazione). */
interface Asked {
  target: ExplainTarget
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

/**
 * Una frase con le formule in linea ($…$): il testo sempre come testo, le formule con KaTeX. La
 * punteggiatura subito dopo una formula resta attaccata a lei: da sola andrebbe a capo.
 */
function sentenceHtml(text: string): string {
  const parts = text.split(/(\$[^$]+\$)/g)
  let out = ''
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (!/^\$[^$]+\$$/.test(part)) {
      out += escapeHtml(part)
      continue
    }
    const tex = part.slice(1, -1)
    const { html, error } = renderTex(tex, false)
    const drawn = error ? `<code>${escapeHtml(tex)}</code>` : html
    const punct = /^[.,;:!?)]+/.exec(parts[i + 1] ?? '')?.[0] ?? ''
    if (punct) parts[i + 1] = parts[i + 1].slice(punct.length)
    out += punct ? `<span class="explain-nowrap">${drawn}${escapeHtml(punct)}</span>` : drawn
  }
  return out
}

function texHtml(tex: string, display: boolean): string {
  const { html, error } = renderTex(tex, display)
  return error ? `<code>${escapeHtml(tex)}</code>` : html
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
    const target = again?.target ?? this.here?.target
    if (!target) return
    if (this.state.status === 'loading' || this.state.status === 'writing') this.state.asked.controller.abort()
    const asked: Asked = { target, near: again?.near ?? this.here!.region.to, controller: new AbortController() }
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
      const explanation = await explain(
        target,
        settings.explainTone,
        (messages, onDelta) => model.chat(messages, { maxTokens: REPLY_TOKENS }, onDelta, asked.controller.signal),
        {
          onStatus: (status) => {
            if (!this.current(asked) || this.state.status !== 'writing') return
            if (status === 'tool') return
            this.set({ ...this.state, correcting: status === 'correcting' })
          },
          onDelta: (text) => this.write(asked, text),
          onTool: () => {
            if (this.current(asked) && this.state.status === 'writing') this.set({ ...this.state, tools: this.state.tools + 1 })
          },
        },
      )
      if (this.current(asked)) this.set({ status: 'done', asked, model: name, explanation })
    } catch (err) {
      if (!this.current(asked)) return
      if (err instanceof LocalAbort || asked.controller.signal.aborted) this.set({ status: 'idle' })
      else this.set({ status: 'error', asked, message: err instanceof Error ? err.message : String(err) })
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

  private close(): void {
    if (this.state.status === 'loading' || this.state.status === 'writing') this.state.asked.controller.abort()
    this.set({ status: 'idle' })
  }

  private insert(asked: Asked, explanation: Explanation): void {
    const ok = insertExplanation(this.deps.editor.view, explanationMarkdown(explanation), asked.target.tex, asked.near)
    if (ok) this.deps.toast('Spiegazione inserita nella nota')
    else this.deps.toast('La formula non c\'è più nella nota: la spiegazione non si può inserire', 'error')
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
    const formula = h('div', { class: 'explain-formula', html: texHtml(s.asked.target.kind === 'solve' ? `${s.asked.target.question} \\Rightarrow` : s.asked.target.question, true) })
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
          s.correcting ? 'Correggo i passaggi che Glifo ha segnato…' : 'Scrivo i passaggi…',
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
    }
    this.el.replaceChildren(...parts.filter((p): p is HTMLElement => p !== null))
  }

  /** Annulla: la spiegazione si chiude subito (lo scaricamento del modello, se c'è, finisce nel worker e resta per la prossima volta). */
  private cancelButton(): HTMLElement {
    return h('button', { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => this.close() } }, 'Annulla')
  }

  private stepsView(asked: Asked, e: Explanation): HTMLElement[] {
    const list = h('ol', { class: 'explain-steps' })
    for (const step of e.steps) {
      const mark = step.formula
        ? step.check
          ? checkHtml(step.check.ok ? { ok: true, ...(step.check.rounded && { rounded: true }) } : { ok: false, ...(step.check.value && { value: step.check.value }) })
          : '<span class="explain-unchecked" title="Glifo non sa controllare questo passaggio">non controllato</span>'
        : ''
      list.append(
        h(
          'li',
          { class: `explain-step${step.check ? (step.check.ok ? ' is-ok' : ' is-wrong') : ''}` },
          step.text ? h('div', { class: 'explain-text', html: sentenceHtml(step.text) }) : null,
          step.formula ? h('div', { class: 'explain-math' }, h('div', { class: 'explain-math-render', html: texHtml(step.formula, true) }), h('div', { class: 'explain-mark', html: mark })) : null,
        ),
      )
    }
    const formulas = e.steps.filter((s) => s.formula)
    const checked = formulas.filter((s) => s.check?.ok).length
    const wrong = formulas.filter((s) => s.check && !s.check.ok).length
    const answer = texHtml(asked.target.answer.tex, false)
    const summary = h('p', { class: `explain-summary${e.reaches === true && !wrong ? ' is-ok' : e.reaches === false || wrong ? ' is-wrong' : ''}`, attrs: { role: 'status' } })
    summary.innerHTML = [
      e.reaches === true ? `✓ Arriva al risultato di Glifo, ${answer}.` : e.reaches === false ? `✗ L'ultimo passaggio non arriva al risultato di Glifo, ${answer}.` : `Glifo non ha potuto confrontare l'ultimo passaggio con il suo risultato, ${answer}.`,
      formulas.length ? ` Passaggi controllati da Glifo: ${checked} su ${formulas.length}${wrong ? `, ${wrong} sbagliat${wrong === 1 ? 'o' : 'i'}` : ''}.` : '',
    ].join('')
    const notes = [
      e.toolCalls ? `il modello ha chiesto ${e.toolCalls === 1 ? 'un conto' : `${e.toolCalls} conti`} al motore` : '',
      e.corrections ? `Glifo gli ha fatto correggere i passaggi ${e.corrections === 1 ? 'una volta' : `${e.corrections} volte`}` : '',
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
            title: 'Mette i passaggi nella nota, dopo la formula: lì Glifo li controlla come le altre formule',
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
