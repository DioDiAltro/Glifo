/**
 * La chat sotto la spiegazione, nel pannello «Spiega con l'AI» (passo 4, 8 ottobre 2026): lo studente fa
 * una domanda sulla spiegazione e il modello nel browser risponde rileggendo la cosa spiegata, la
 * spiegazione e le ultime domande (src/ai/explain.ts, `answerFollowUp`); Glifo controlla le formule della
 * risposta come quelle della spiegazione. La chat è di una spiegazione: con un'altra (o con «Rifai»)
 * ricomincia, e non si salva.
 */
import { answerFollowUp, REPLY_TOKENS, type ChatContext, type Explanation, type FollowUp } from '../ai/explain'
import { LocalAbort, type ChatMessage } from '../ai/local'
import { localModel } from '../ai/localModels'
import type { Settings } from '../store/settings'
import { h } from './dom'
import type { ExplainModel } from './explainPanel'
import { formulasSummary, stepsList } from './explainSteps'

export interface ExplainChatDeps {
  context: ChatContext
  settings: () => Settings
  model: () => ExplainModel
}

interface Turn {
  question: string
  answer: Explanation | null
  error: string | null
}

export class ExplainChat {
  readonly el: HTMLElement
  private readonly list: HTMLElement
  private readonly input: HTMLTextAreaElement
  private readonly button: HTMLButtonElement
  private readonly turns: Turn[] = []
  /** Mentre il modello risponde: per fermarlo. */
  private controller: AbortController | null = null
  /** Il testo che il modello sta scrivendo (si aggiorna senza ridisegnare il resto). */
  private draft: HTMLElement | null = null
  private draftText = ''

  constructor(private readonly deps: ExplainChatDeps) {
    this.list = h('ol', { class: 'ai-chat-turns', attrs: { 'aria-label': 'Le domande sulla spiegazione', 'aria-live': 'polite' } })
    this.input = h('textarea', {
      class: 'ai-chat-input',
      attrs: { rows: 2, placeholder: 'Per esempio: perché si fa così?', 'aria-label': 'La tua domanda sulla spiegazione' },
      on: {
        keydown: (ev: Event) => {
          const key = ev as KeyboardEvent
          // Invio manda la domanda; Maiusc+Invio va a capo.
          if (key.key !== 'Enter' || key.shiftKey || key.isComposing) return
          key.preventDefault()
          void this.ask()
        },
      },
    })
    this.button = h('button', { class: 'btn btn-primary btn-small ai-chat-send', attrs: { type: 'button' }, on: { click: () => (this.controller ? this.stop() : void this.ask()) } }, 'Chiedi')
    this.el = h(
      'section',
      { class: 'ai-chat', attrs: { 'aria-label': 'Domande sulla spiegazione' } },
      h('p', { class: 'ai-chat-label' }, 'Hai una domanda su questa spiegazione?'),
      this.list,
      h('div', { class: 'ai-chat-form' }, this.input, this.button),
    )
    this.render()
  }

  /** Manda la domanda scritta (o `question`): la risposta arriva sotto, con le formule controllate. */
  async ask(question = this.input.value): Promise<void> {
    const text = question.trim()
    if (!text || this.controller) return
    const turn: Turn = { question: text, answer: null, error: null }
    const history: FollowUp[] = this.turns.filter((t) => t.answer).map((t) => ({ question: t.question, answer: t.answer! }))
    this.turns.push(turn)
    const controller = (this.controller = new AbortController())
    this.input.value = ''
    this.render()
    this.reveal()
    const settings = this.deps.settings()
    const model = this.deps.model()
    try {
      // Il modello è già nel browser (ha scritto la spiegazione): qui si riprende.
      await model.load(localModel(settings.localModel).id)
      const chat = (messages: ChatMessage[], onDelta?: (text: string) => void) => model.chat(messages, { maxTokens: REPLY_TOKENS }, onDelta, controller.signal)
      turn.answer = await answerFollowUp(this.deps.context, history, text, settings.explainTone, chat, { onDelta: (delta) => this.write(controller, delta) })
    } catch (err) {
      if (err instanceof LocalAbort || controller.signal.aborted) {
        // Fermata: la domanda torna da scrivere, come prima.
        this.turns.splice(this.turns.indexOf(turn), 1)
        if (!this.input.value) this.input.value = text
      } else turn.error = err instanceof Error ? err.message : String(err)
    }
    if (this.controller !== controller) return
    this.controller = null
    this.render()
    // Mentre rispondeva la casella era spenta e ha perso il fuoco: se non è andato altrove, torna lì.
    if (!document.activeElement || document.activeElement === document.body) this.input.focus({ preventScroll: true })
    this.reveal()
  }

  /** La casella per scrivere resta in vista sotto la risposta (il pannello scorre). */
  private reveal(): void {
    this.input.scrollIntoView?.({ block: 'nearest' })
  }

  /** Ferma la risposta che il modello sta scrivendo. */
  stop(): void {
    this.controller?.abort()
  }

  /** La chat non serve più (un'altra spiegazione, il pannello chiuso): si ferma il modello. */
  destroy(): void {
    const controller = this.controller
    this.controller = null
    controller?.abort()
  }

  /** Un pezzo della risposta mentre arriva, in fondo alla domanda. */
  private write(controller: AbortController, text: string): void {
    if (this.controller !== controller || !this.draft) return
    this.draftText = (this.draftText + text).slice(-600)
    this.draft.textContent = this.draftText.replace(/<tool_call>[\s\S]*?(<\/tool_call>|$)/g, ' ⚙ ').replace(/<\/?think>/g, '')
    this.draft.scrollTop = this.draft.scrollHeight
  }

  private render(): void {
    this.draft = null
    this.list.replaceChildren(
      ...this.turns.map((t) => {
        const item = h('li', { class: 'ai-chat-turn' }, h('p', { class: 'ai-chat-question' }, t.question))
        if (t.answer) item.append(h('div', { class: 'ai-chat-answer' }, stepsList(t.answer), formulasSummary(t.answer, 'questa risposta')))
        else if (t.error) {
          item.append(
            h('p', { class: 'ai-error' }, t.error),
            h(
              'button',
              {
                class: 'btn btn-small',
                attrs: { type: 'button' },
                on: {
                  click: () => {
                    this.turns.splice(this.turns.indexOf(t), 1)
                    void this.ask(t.question)
                  },
                },
              },
              'Riprova',
            ),
          )
        } else {
          this.draft = h('pre', { class: 'explain-draft', attrs: { 'aria-hidden': 'true' } })
          this.draftText = ''
          item.append(h('div', { class: 'ai-loading', attrs: { role: 'status' } }, h('span', { class: 'spinner', attrs: { 'aria-hidden': 'true' } }), 'Rispondo…'), this.draft)
        }
        return item
      }),
    )
    this.list.hidden = !this.turns.length
    const busy = !!this.controller
    this.input.disabled = busy
    this.button.textContent = busy ? 'Ferma' : 'Chiedi'
    this.button.classList.toggle('btn-primary', !busy)
    this.button.title = busy ? 'Ferma la risposta' : 'Manda la domanda (Invio)'
  }
}
