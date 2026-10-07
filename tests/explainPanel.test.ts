// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { LocalAbort, type ChatMessage, type LoadProgress } from '../src/ai/local'
import { MarkdownEditor } from '../src/editor/editor'
import { DEFAULT_SETTINGS } from '../src/store/settings'
import { ExplainPanel, type ExplainModel } from '../src/ui/explainPanel'

// CodeMirror misura il testo sullo schermo: in jsdom bastano misure vuote.
Range.prototype.getClientRects = () => [] as unknown as DOMRectList
Range.prototype.getBoundingClientRect = () => new DOMRect()

const r = String.raw
const FORMULA = r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx =`
const DOC = `# Sfera\n\nIl volume è $${FORMULA}$ come si vede\nanche qui.\n\nFine.`

let editor: MarkdownEditor | null = null
afterEach(() => {
  editor?.view.destroy()
  editor = null
  document.body.replaceChildren()
})

/** Un modello finto: la prima risposta chiede la primitiva al motore, la seconda scrive i passaggi. */
function fakeModel(): ExplainModel & { seen: ChatMessage[][] } {
  const replies = [
    '<tool_call>{"name": "primitiva", "arguments": {"funzione": "R^2 - x^2", "variabile": "x"}}</tool_call>',
    r`1. Porto fuori $\pi$, che è una costante. $$\int_{-R}^{R} \pi (R^2 - x^2) \, dx = \pi \int_{-R}^{R} (R^2 - x^2) \, dx$$
2. Sostituisco gli estremi nella primitiva. $$\pi \left[R^2 x - \frac{x^3}{3}\right]_{-R}^{R} = \frac{4\pi R^3}{3}$$`,
  ]
  const seen: ChatMessage[][] = []
  return {
    seen,
    load: async (model: string, onProgress?: (p: LoadProgress) => void) => {
      onProgress?.({ progress: 0.4, text: 'Fetching param cache[3/9]' })
      return `${model}-q4f16_1-MLC`
    },
    chat: async (messages: ChatMessage[], _options, onDelta) => {
      seen.push(messages)
      const reply = replies.shift() ?? ''
      onDelta?.(reply)
      return reply
    },
  }
}

function setup(model: ExplainModel | null, doc = DOC) {
  const host = document.createElement('div')
  document.body.append(host)
  editor = new MarkdownEditor(host, doc, { onDocChange: () => {}, onScroll: () => {}, onSave: () => {}, onFocusSearch: () => {}, onEditSchema: () => {} })
  const toasts: string[] = []
  const panel = new ExplainPanel({ editor, settings: () => ({ ...DEFAULT_SETTINGS }), openSettings: () => {}, toast: (m) => toasts.push(m), ...(model && { model: () => model }) })
  document.body.append(panel.button, panel.el)
  const moveTo = (text: string) => {
    editor!.view.dispatch({ selection: { anchor: editor!.getDoc().indexOf(text) + 1 } })
    panel.update()
  }
  return { editor, panel, toasts, moveTo }
}

function button(panel: ExplainPanel, label: string): HTMLButtonElement {
  const found = [...panel.el.querySelectorAll('button')].find((b) => b.textContent?.trim() === label)
  if (!found) throw new Error(`manca il pulsante «${label}»`)
  return found
}

describe('«Spiegami» nel pannello della formula', () => {
  it('c\'è solo con il cursore su un conto che Glifo sa fare', () => {
    const { panel, moveTo } = setup(fakeModel(), `${DOC}\n\n$a = 2$`)
    moveTo('\\pi (R')
    expect(panel.button.hidden).toBe(false)
    moveTo('Fine')
    expect(panel.button.hidden).toBe(true)
    moveTo('a = 2')
    expect(panel.button.hidden).toBe(true)
  })

  it('scrive i passaggi con il motore, li mostra con il ✓ di Glifo e li mette nella nota dopo il paragrafo', async () => {
    const model = fakeModel()
    const { editor, panel, toasts, moveTo } = setup(model)
    moveTo('\\pi (R')
    const started = panel.start()
    // Mentre carica: l'avanzamento.
    expect(panel.el.hidden).toBe(false)
    await started
    const steps = panel.el.querySelectorAll('.explain-step')
    expect(steps).toHaveLength(2)
    expect(panel.el.querySelectorAll('.calc-check.is-ok')).toHaveLength(2)
    // «$\pi$,» : la virgola resta attaccata alla formula.
    expect(panel.el.querySelector('.explain-text .explain-nowrap')?.textContent).toMatch(/,$/)
    expect(panel.el.querySelector('.ai-model')?.textContent).toBe('Qwen3 1.7B')
    expect(panel.el.querySelector('.explain-summary')?.textContent).toMatch(/^✓ Arriva al risultato di Glifo/)
    expect(panel.el.querySelector('.explain-summary')?.textContent).toContain('Passaggi controllati da Glifo: 2 su 2.')
    expect(panel.el.textContent).toContain('Il modello ha chiesto un conto al motore.')
    // Il modello ha avuto la primitiva dal motore.
    expect(model.seen[1].at(-1)!.content).toContain(r`R^{2}x - \frac{x^{3}}{3} + c`)

    // Spostando il cursore la spiegazione resta.
    moveTo('Fine')
    expect(panel.el.hidden).toBe(false)
    button(panel, 'Inserisci nella nota').click()
    expect(editor.getDoc()).toBe(
      `# Sfera\n\nIl volume è $${FORMULA}$ come si vede\nanche qui.\n\n` +
        `1. Porto fuori $\\pi$, che è una costante: $\\int_{-R}^{R} \\pi (R^2 - x^2) \\, dx = \\pi \\int_{-R}^{R} (R^2 - x^2) \\, dx$\n` +
        `2. Sostituisco gli estremi nella primitiva: $\\pi \\left[R^2 x - \\frac{x^3}{3}\\right]_{-R}^{R} = \\frac{4\\pi R^3}{3}$\n\nFine.`,
    )
    expect(toasts).toEqual(['Spiegazione inserita nella nota'])
  })

  it('se dopo la formula il testo continua subito, la spiegazione ha una riga vuota anche dopo', async () => {
    const { editor, panel, moveTo } = setup(fakeModel(), `$${FORMULA}$\n# Dopo`)
    moveTo('\\pi (R')
    await panel.start()
    button(panel, 'Inserisci nella nota').click()
    expect(editor.getDoc()).toMatch(/^\$[^\n]+\$\n\n1\. [^\n]+\n2\. [^\n]+\n\n# Dopo$/)
  })

  it('se la formula non c\'è più nella nota, non inserisce niente e lo dice', async () => {
    const { editor, panel, toasts, moveTo } = setup(fakeModel())
    moveTo('\\pi (R')
    await panel.start()
    editor.view.dispatch({ changes: { from: 0, to: editor.getDoc().length, insert: 'Tutto cambiato.' } })
    button(panel, 'Inserisci nella nota').click()
    expect(editor.getDoc()).toBe('Tutto cambiato.')
    expect(toasts[0]).toMatch(/non c'è più nella nota/)
  })

  it('un errore del modello si vede, con «Riprova»; «Chiudi» toglie la spiegazione', async () => {
    const model: ExplainModel = {
      load: async () => {
        throw new Error('Questo browser non ha WebGPU, che serve per far girare il modello sul dispositivo.')
      },
      chat: async () => '',
    }
    const { panel, moveTo } = setup(model)
    moveTo('\\pi (R')
    await panel.start()
    expect(panel.el.querySelector('.ai-error')?.textContent).toMatch(/WebGPU/)
    expect(button(panel, 'Riprova')).toBeTruthy()
    panel.el.querySelector<HTMLButtonElement>('.explain-close')!.click()
    expect(panel.el.hidden).toBe(true)
  })

  it('dentro claude.ai lo dice subito: lì il modello non si può scaricare', async () => {
    const win = window as unknown as { claude?: { use(name: string): Promise<unknown> } }
    win.claude = { use: async () => null }
    try {
      const { panel, moveTo } = setup(null)
      moveTo('\\pi (R')
      await panel.start()
      expect(panel.el.querySelector('.ai-error')?.textContent).toMatch(/^Dentro claude\.ai il modello non si può scaricare/)
    } finally {
      delete win.claude
    }
  })

  it('«Annulla» mentre il modello si scarica chiude subito, e dopo non parte niente', async () => {
    let finish: (name: string) => void = () => {}
    let chats = 0
    const model: ExplainModel = {
      load: () => new Promise((resolve) => (finish = resolve)),
      chat: async () => {
        chats++
        return ''
      },
    }
    const { panel, moveTo } = setup(model)
    moveTo('\\pi (R')
    const started = panel.start()
    expect(panel.el.textContent).toContain('Preparo Qwen3 1.7B: 0%')
    button(panel, 'Annulla').click()
    expect(panel.el.hidden).toBe(true)
    finish('Qwen3-1.7B-q4f16_1-MLC')
    await started
    expect(panel.el.hidden).toBe(true)
    expect(chats).toBe(0)
  })

  it('«Annulla» ferma il modello e toglie la spiegazione', async () => {
    let stopped = false
    const model: ExplainModel = {
      load: async (m) => `${m}-q4f16_1-MLC`,
      chat: (_messages, _options, _onDelta, signal) =>
        new Promise((_, reject) =>
          signal?.addEventListener('abort', () => {
            stopped = true
            reject(new LocalAbort())
          }),
        ),
    }
    const { panel, moveTo } = setup(model)
    moveTo('\\pi (R')
    const started = panel.start()
    await vi.waitFor(() => expect(panel.el.textContent).toContain('Scrivo i passaggi'))
    button(panel, 'Annulla').click()
    await started
    expect(stopped).toBe(true)
    expect(panel.el.hidden).toBe(true)
  })
})
