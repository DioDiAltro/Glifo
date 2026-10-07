// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { EditorState } from '@codemirror/state'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { explainTopic, topicPrompt, type ChatFn } from '../src/ai/explain'
import type { ChatMessage, LoadProgress } from '../src/ai/local'
import { graphTopic } from '../src/ai/topics'
import { MarkdownEditor } from '../src/editor/editor'
import { subjectsIn } from '../src/editor/explainSubjects'
import { mathMarkdown } from '../src/editor/mathSyntax'
import { DEFAULT_SETTINGS } from '../src/store/settings'
import { AiPanel } from '../src/ui/aiPanel'
import type { ExplainModel } from '../src/ui/explainPanel'
import { fullyParsed } from './support/editorState'

// CodeMirror misura il testo sullo schermo: in jsdom bastano misure vuote.
Range.prototype.getClientRects = () => [] as unknown as DOMRectList
Range.prototype.getBoundingClientRect = () => new DOMRect()

const r = String.raw
const GRAPH = '```grafico\ny = x^2\n```'
const NOTE = [
  '# Esercizi',
  '',
  r`La sfera: $\int_{-R}^{R} \pi (R^2 - x^2) \, dx =$`,
  '',
  r`Una definizione $f(x) = x^3 - 3x$ e un teorema $a^2 + b^2 = c^2$.`,
  '',
  GRAPH,
  '',
  r`Poi $f'(2) =$ e $x^2 - 5x + 6 = 0 \Rightarrow$`,
  '',
  '```grafico',
  'f',
  '```',
].join('\n')

function state(doc: string): EditorState {
  return fullyParsed(EditorState.create({ doc, extensions: [markdown({ base: markdownLanguage, extensions: [mathMarkdown] })] }))
}

/** Il modello finto: per il grafico tre punti, due formule giuste e una sbagliata; poi la correzione. */
const GRAPH_STEPS = r`1. È una parabola con il vertice nell'origine. $$f(0) = 0$$
2. La derivata si annulla in zero, dove c'è il minimo. $$f'(x) = 2x$$
3. In uno vale due. $$f(1) = 2$$`
const GRAPH_FIXED = GRAPH_STEPS.replace('In uno vale due. $$f(1) = 2$$', 'In uno vale uno. $$f(1) = 1$$')

describe('quello che si può spiegare nella nota', () => {
  it('i conti e i grafici, in ordine, con le definizioni scritte prima', () => {
    const subjects = subjectsIn(state(NOTE))
    expect(subjects.map((s) => [s.kind, s.source])).toEqual([
      ['conto', r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx =`],
      ['grafico', 'y = x^2'],
      ['conto', "f'(2) ="],
      ['conto', r`x^2 - 5x + 6 = 0 \Rightarrow`],
      ['grafico', 'f'],
    ])
    // Le formule senza un risultato (la definizione, il teorema) per ora non ci sono.
    const [sphere, , derivative, equation, named] = subjects
    expect(sphere.target?.answer.text).toBe('(4πR³)/3')
    expect(derivative.target).toMatchObject({ kind: 'calc', defs: ['f(x) = x^3 - 3x'] })
    expect(derivative.target?.answer.text).toBe('9')
    expect(equation.target?.kind).toBe('solve')
    // Il grafico di f prende la definizione di prima; ognuno sa dov'è nella nota.
    expect(named.defs).toEqual(['f(x) = x^3 - 3x'])
    expect(NOTE.slice(subjects[1].from, subjects[1].to)).toBe(GRAPH)
    expect(NOTE.slice(sphere.from, sphere.to)).toBe(r`$\int_{-R}^{R} \pi (R^2 - x^2) \, dx =$`)
  })

  it('un blocco grafico non chiuso o vuoto non c\'è', () => {
    expect(subjectsIn(state('```grafico\n```\n\n```grafico\ny = x'))).toEqual([])
  })
})

describe('la spiegazione di un grafico', () => {
  it('i fatti di Glifo: la funzione con un nome, lo studio, l\'area e il punto', () => {
    const topic = graphTopic(r`y = x^2` + '\n' + r`\int_0^1 x^2 \, dx` + '\nP = (1, 1)', [])
    expect(topic.defs).toEqual(['f(x) = x^{2}'])
    expect(topic.title).toEqual({ tex: 'y = x^{2}' })
    const facts = topic.facts.join('\n')
    expect(facts).toContain('la funzione $$f(x) = x^{2}$$')
    expect(facts).toContain('Massimi e minimi: minimo (0; 0)')
    expect(facts).toContain("Derivata: f'(x) = 2x")
    expect(facts).toContain(r`area colorata sotto la curva, da 0 a 1: $$\int_{0}^{1} x^{2} \, dx = 0{,}333333\ldots$$`)
    expect(facts).toContain('il punto P = (1; 1)')
    // Il modello legge il blocco e i fatti.
    const prompt = topicPrompt(topic)
    expect(prompt).toContain('```grafico\ny = x^2')
    expect(prompt).toContain('Dal motore di Glifo: studio di f:')
    expect(prompt.endsWith('Spiegami cosa mostra il grafico.')).toBe(true)
  })

  it('una funzione della nota tiene il suo nome; y = f(x) è lei', () => {
    const topic = graphTopic('f\ny = f(x)\ny = 1/x', ['f(x) = x^3 - 3x'])
    expect(topic.defs).toEqual(['f(x) = x^3 - 3x', 'g(x) = \\frac{1}{x}'])
    expect(topic.facts.filter((f) => f.startsWith('studio di')).map((f) => f.slice(0, 12))).toEqual(['studio di f:', 'studio di f:', 'studio di g:'])
  })

  it('Glifo controlla le formule (anche f\'(x) = 2x) e fa correggere quella sbagliata', async () => {
    const replies = [GRAPH_STEPS, GRAPH_FIXED]
    const seen: ChatMessage[][] = []
    const chat: ChatFn = async (messages) => {
      seen.push(messages.map((m) => ({ ...m })))
      return replies.shift() ?? ''
    }
    const e = await explainTopic(graphTopic('y = x^2', []), 'professore', chat)
    expect(e.steps.map((s) => s.check)).toEqual([{ ok: true }, { ok: true }, { ok: true }])
    expect(e.corrections).toBe(1)
    expect(e.reaches).toBeNull()
    // La correzione dice quale formula e il valore giusto.
    expect(seen[1].at(-1)?.content).toContain('La formula del punto 3 è sbagliata: Glifo calcola $1$')
    // Il messaggio di sistema parla del grafico, con gli strumenti.
    expect(seen[0][0].content).toContain('cosa mostra un grafico')
    expect(seen[0][0].content).toContain('<tools>')
  })

  it('una spiegazione solo a parole va bene: non c\'è niente da controllare', async () => {
    const e = await explainTopic(graphTopic('y = x^2', []), 'semplice', async () => '1. È una parabola.\n2. È simmetrica.')
    expect(e.steps).toEqual([
      { text: 'È una parabola.', formula: null, check: null },
      { text: 'È simmetrica.', formula: null, check: null },
    ])
  })
})

let editor: MarkdownEditor | null = null
afterEach(() => {
  editor?.view.destroy()
  editor = null
  document.body.replaceChildren()
})

function fakeModel(replies: string[]): ExplainModel {
  return {
    load: async (model: string, onProgress?: (p: LoadProgress) => void) => {
      onProgress?.({ progress: 1, text: 'Finish loading' })
      return `${model}-q4f16_1-MLC`
    },
    chat: async (_messages, _options, onDelta) => {
      const reply = replies.shift() ?? ''
      onDelta?.(reply)
      return reply
    },
  }
}

function setup(doc: string, replies: string[]) {
  const host = document.createElement('div')
  document.body.append(host)
  editor = new MarkdownEditor(host, doc, { onDocChange: () => {}, onScroll: () => {}, onSave: () => {}, onFocusSearch: () => {}, onEditSchema: () => {} })
  const toasts: string[] = []
  let closed = 0
  const panel = new AiPanel({
    editor,
    settings: () => ({ ...DEFAULT_SETTINGS }),
    openSettings: () => {},
    toast: (m) => toasts.push(m),
    onClose: () => closed++,
    model: () => fakeModel(replies),
  })
  document.body.append(panel.el)
  return { editor, panel, toasts, closed: () => closed }
}

async function settle(): Promise<void> {
  for (let i = 0; i < 20; i++) await new Promise((resolve) => setTimeout(resolve, 0))
}

describe('il pannello «Spiega con l\'AI»', () => {
  it('l\'elenco della nota; scelto il grafico, la spiegazione con i segni di Glifo, e la si mette dopo il blocco', async () => {
    // La stessa riga prima, in una formula: la spiegazione va dopo il blocco, non dopo lei.
    const doc = `# Parabola\n\nLa funzione $y = x^2$.\n\n${GRAPH}\n\nFine.`
    const { editor, panel, toasts } = setup(doc, [GRAPH_STEPS, GRAPH_FIXED])
    panel.show()
    const items = [...panel.el.querySelectorAll<HTMLButtonElement>('.ai-subject')]
    expect(items.map((b) => b.dataset.kind)).toEqual(['grafico'])
    items[0].click()
    await settle()
    expect(panel.el.querySelector('.ai-subject')?.getAttribute('aria-pressed')).toBe('true')
    const steps = [...panel.el.querySelectorAll('.explain-step')]
    expect(steps.map((s) => s.className)).toEqual(['explain-step is-ok', 'explain-step is-ok', 'explain-step is-ok'])
    expect(panel.el.querySelector('.explain-summary')?.textContent).toBe('✓ Formule controllate da Glifo: 3 su 3, tutte giuste. Le frasi le scrive il modello.')
    const insert = [...panel.el.querySelectorAll('button')].find((b) => b.textContent === 'Inserisci nella nota')!
    insert.click()
    expect(toasts).toEqual(['Spiegazione inserita nella nota'])
    expect(editor.getDoc()).toBe(`# Parabola\n\nLa funzione $y = x^2$.\n\n${GRAPH}\n\n1. È una parabola con il vertice nell'origine: $f(0) = 0$\n2. La derivata si annulla in zero, dove c'è il minimo: $f'(x) = 2x$\n3. In uno vale uno: $f(1) = 1$\n\nFine.`)
  })

  it('senza niente da spiegare lo dice; l\'elenco si rifà solo se si vede, e cambiando nota la spiegazione si chiude', async () => {
    const { editor, panel, closed } = setup('Solo testo.', [r`1. Porto fuori $\pi$. $$\int_0^1 \pi x \, dx = \pi \int_0^1 x \, dx$$`])
    panel.show()
    expect(panel.el.querySelector<HTMLElement>('.ai-panel-empty')?.hidden).toBe(false)
    panel.hide()
    editor.setDoc(r`Il conto $\int_0^1 \pi x \, dx =$`)
    panel.refresh()
    expect(panel.el.querySelectorAll('.ai-subject')).toHaveLength(1)
    expect(panel.el.querySelector<HTMLElement>('.ai-panel-empty')?.hidden).toBe(true)
    panel.el.querySelector<HTMLButtonElement>('.ai-subject')!.click()
    await settle()
    expect(panel.el.querySelector<HTMLElement>('.explain-box')?.hidden).toBe(false)
    panel.reset()
    expect(panel.el.querySelector<HTMLElement>('.explain-box')?.hidden).toBe(true)
    expect(panel.el.querySelector('.ai-subject')?.getAttribute('aria-pressed')).toBe('false')
    panel.el.querySelector<HTMLButtonElement>('.ai-panel-close')!.click()
    expect(closed()).toBe(1)
  })
})
