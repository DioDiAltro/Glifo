// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { EditorState } from '@codemirror/state'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { explainTopic, topicPrompt, topicSystemPrompt, type ChatFn } from '../src/ai/explain'
import type { ChatMessage, LoadProgress } from '../src/ai/local'
import { formulaTopic, graphTopic, schemaTopic, tableTopic, theoremTopic } from '../src/ai/topics'
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
  it('i conti, i grafici e le formule senza conto, in ordine, con le definizioni scritte prima', () => {
    const subjects = subjectsIn(state(NOTE))
    expect(subjects.map((s) => [s.kind, s.source])).toEqual([
      ['conto', r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx =`],
      ['formula', 'f(x) = x^3 - 3x'],
      ['formula', 'a^2 + b^2 = c^2'],
      ['grafico', 'y = x^2'],
      ['conto', "f'(2) ="],
      ['conto', r`x^2 - 5x + 6 = 0 \Rightarrow`],
      ['grafico', 'f'],
    ])
    const [sphere, definition, , graph, derivative, equation, named] = subjects
    expect(definition.defs).toEqual([])
    expect(sphere.target?.answer.text).toBe('(4πR³)/3')
    expect(derivative.target).toMatchObject({ kind: 'calc', defs: ['f(x) = x^3 - 3x'] })
    expect(derivative.target?.answer.text).toBe('9')
    expect(equation.target?.kind).toBe('solve')
    // Il grafico di f prende la definizione di prima; ognuno sa dov'è nella nota.
    expect(named.defs).toEqual(['f(x) = x^3 - 3x'])
    expect(NOTE.slice(graph.from, graph.to)).toBe(GRAPH)
    expect(NOTE.slice(sphere.from, sphere.to)).toBe(r`$\int_{-R}^{R} \pi (R^2 - x^2) \, dx =$`)
  })

  it('un blocco grafico non chiuso o vuoto non c\'è; le formule che sono solo nomi ($x$, $n$) nemmeno, e quelle ripetute una volta sola', () => {
    expect(subjectsIn(state('```grafico\n```\n\n```grafico\ny = x'))).toEqual([])
    const subjects = subjectsIn(state(r`Sia $x$ in $\mathbb{R}$ e $n \in \mathbb{N}$, con $x^2 + 1 > 0$; ancora $x^2 + 1 > 0$ e $\alpha$.`))
    expect(subjects.map((s) => s.source)).toEqual([r`n \in \mathbb{N}`, 'x^2 + 1 > 0'])
  })

  it('i teoremi, le definizioni e le proprietà del testo: un titolo con la sua parte, o un paragrafo; dentro, le formule no', () => {
    const note = [
      '## Teorema di Pitagora',
      '',
      r`In un triangolo rettangolo $a^2 + b^2 = c^2$.`,
      '',
      '## Esercizi',
      '',
      '**Definizione** (limite): si dice che $f$ tende a $L$ se…',
      'continua sulla riga dopo.',
      '',
      'Una riga che parla della Proprietà commutativa non comincia così.',
      '',
      '- Proprietà commutativa: $a + b = b + a$',
      '',
      '```',
      'Teorema in un blocco di codice: no',
      '```',
    ].join('\n')
    const subjects = subjectsIn(state(note))
    expect(subjects.map((s) => [s.kind, s.tag ?? '', s.title ?? s.source])).toEqual([
      ['teorema', 'Teorema', 'Teorema di Pitagora'],
      ['teorema', 'Definizione', 'Definizione (limite)'],
      ['teorema', 'Proprietà', 'Proprietà commutativa'],
    ])
    // Il titolo prende la sua parte, fino al titolo dopo; il paragrafo fino alla riga vuota.
    expect(subjects[0].source).toBe('## Teorema di Pitagora\n\nIn un triangolo rettangolo $a^2 + b^2 = c^2$.')
    expect(subjects[1].source).toBe('**Definizione** (limite): si dice che $f$ tende a $L$ se…\ncontinua sulla riga dopo.')
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

describe('la spiegazione di una formula senza conto e di un teorema', () => {
  it('una formula: Glifo controlla l\'esempio con i numeri; la formula ripetuta con le lettere non si giudica', async () => {
    const topic = formulaTopic('a^2 + b^2 = c^2', [])
    expect(topic).toMatchObject({ kind: 'formula', title: { tex: 'a^2 + b^2 = c^2' }, content: '$$a^2 + b^2 = c^2$$', facts: [], defs: [] })
    const reply = r`1. È il teorema di Pitagora. $$a^2 + b^2 = c^2$$
2. Per esempio con i lati 3, 4 e 5. $$3^2 + 4^2 = 5^2$$
3. Con 6 invece di 5 non vale. $$3^2 + 4^2 = 6^2$$`
    const e = await explainTopic(topic, 'professore', async () => reply)
    expect(e.steps.map((s) => s.check)).toEqual([null, { ok: true }, { ok: false, value: { tex: '25', text: '25' } }])
  })

  it('una funzione definita nella nota: con il suo studio, e le formule con lei si controllano', async () => {
    const topic = formulaTopic('f(x) = x^2 - 1', [])
    expect(topic.defs).toEqual(['f(x) = x^2 - 1'])
    expect(topic.facts[0]).toBe('è la definizione di una funzione: $$f(x) = x^2 - 1$$')
    expect(topic.facts[1]).toMatch(/^studio di f: Dominio: x ∈ ℝ\./)
    const e = await explainTopic(topic, 'semplice', async () => '1. In 3 vale 8. $$f(3) = 8$$')
    expect(e.steps[0].check).toEqual({ ok: true })
  })

  it('un teorema: il modello legge il testo, senza gli strumenti, e Glifo controlla gli esempi', async () => {
    const text = '## Teorema di Pitagora\n\nIn un triangolo rettangolo $a^2 + b^2 = c^2$.'
    const topic = theoremTopic(text, 'Teorema di Pitagora')
    expect(topic).toMatchObject({ kind: 'teorema', title: { text: 'Teorema di Pitagora' }, content: text, facts: [], defs: [] })
    const seen: ChatMessage[][] = []
    const e = await explainTopic(topic, 'professore', async (messages) => {
      seen.push(messages)
      return '1. Dice che il quadrato costruito sull\'ipotenusa è la somma dei quadrati sui cateti. $$5^2 = 3^2 + 4^2$$'
    })
    expect(e.steps[0].check).toEqual({ ok: true })
    expect(seen[0][0].content).toContain('un teorema o una definizione')
    expect(seen[0][0].content).not.toContain('<tools>')
    expect(seen[0][1].content).toBe(`Dalla nota:\n${text}\nSpiegami questo enunciato.`)
  })
})

/** Un flusso con le corsie: chi ordina e chi spedisce; una forma senza testo. */
const FLOW = JSON.stringify({
  v: 1,
  nodes: [
    { id: 'l', shape: 'lanes', x: 0, y: 0, w: 660, h: 420, text: 'Cliente\nNegozio' },
    { id: 'e', shape: 'ellipse', x: 40, y: 330, w: 120, h: 60, text: 'Fine' },
    { id: 'a', shape: 'ellipse', x: 40, y: 60, w: 120, h: 60, text: 'Inizio' },
    { id: 'c', shape: 'rhombus', x: 380, y: 180, w: 120, h: 80, text: 'Disponibile?' },
    { id: 'b', shape: 'rect', x: 40, y: 180, w: 120, h: 60, text: 'Ordina' },
    { id: 'd', shape: 'rect', x: 380, y: 300, w: 120, h: 60, text: 'Spedisce' },
    { id: 'f', shape: 'note', x: 380, y: 40, w: 120, h: 60, text: '' },
  ],
  edges: [
    { id: 'e1', from: 'a', to: 'b' },
    { id: 'e2', from: 'b', to: 'c' },
    { id: 'e3', from: 'c', to: 'd', text: 'sì' },
    { id: 'e4', from: 'c', to: 'e', text: 'no', dashed: true },
    { id: 'e5', from: 'd', to: 'e' },
  ],
})
const SHEET = [
  '| Prodotto | Quantità | Prezzo | Totale |',
  '| --- | --- | --- | --- |',
  '| Penne | 10 | 1,50 € | =B2*C2 |',
  '| Quaderni | 5 | 2,40 € | =B3*C3 |',
  '| Gomme | 0 | 0,50 € | =b4*c4 |',
  '| Totale | =SOMMA(B2:B4) | =SOMMA(C2:C4) | =SOMMA(D2:D4) |',
  '| Per pezzo | | | =D5/B4 |',
].join('\n')

describe('gli schemi e le tabelle', () => {
  it('nell\'elenco gli schemi e le tabelle chiusi che si leggono, con le forme o la prima riga', () => {
    const note = [
      '# Negozio',
      '',
      '```schema',
      FLOW,
      '```',
      '',
      '```tabella',
      SHEET,
      '```',
      '',
      '```schema',
      'non è uno schema',
      '```',
      '',
      '```schema',
      '{"v":1,"nodes":[],"edges":[]}',
      '```',
      '',
      '```tabella',
      '| a | b |',
    ].join('\n')
    const subjects = subjectsIn(state(note))
    expect(subjects.map((s) => [s.kind, s.title])).toEqual([
      ['schema', 'Inizio · Ordina · Disponibile? · Spedisce · Fine'],
      ['tabella', 'Prodotto · Quantità · Prezzo · Totale'],
    ])
    expect(note.slice(subjects[0].from, subjects[0].to)).toBe(`\`\`\`schema\n${FLOW}\n\`\`\``)
    expect(subjects[1].source).toBe(SHEET)
  })

  it('uno schema a parole: le forme nell\'ordine delle frecce con la corsia, i collegamenti con il testo, da dove si parte e dove si arriva', () => {
    const topic = schemaTopic(FLOW)
    expect(topic.title).toEqual({ text: 'Inizio · Ordina · Disponibile? · Spedisce · Fine' })
    expect(topic.content).toBe(
      [
        'Corsie: «Cliente», «Negozio»',
        'Forme:',
        '- «Inizio» (ellisse), nella corsia «Cliente»',
        '- «Ordina» (rettangolo), nella corsia «Cliente»',
        '- «Disponibile?» (rombo), nella corsia «Negozio»',
        '- «Spedisce» (rettangolo), nella corsia «Negozio»',
        '- «Fine» (ellisse), nella corsia «Cliente»',
        '- nota n. 1, nella corsia «Negozio»',
        'Collegamenti:',
        '- «Inizio» → «Ordina»',
        '- «Ordina» → «Disponibile?»',
        '- «Disponibile?» → «Spedisce»: «sì»',
        '- «Disponibile?» → «Fine»: «no» (tratteggiata)',
        '- «Spedisce» → «Fine»',
      ].join('\n'),
    )
    expect(topic.facts).toEqual(['lo schema ha 6 forme e 5 collegamenti, in 2 corsie', 'seguendo le frecce si parte da «Inizio»', 'seguendo le frecce si arriva a «Fine»'])
    expect(topicPrompt(topic).startsWith('Lo schema nella nota, descritto da Glifo:\nCorsie:')).toBe(true)
    // Senza gli strumenti, e le formule solo se sono nello schema.
    const system = topicSystemPrompt('professore', 'schema')
    expect(system).toContain('Una formula tra $$ solo se è già nello schema.')
    expect(system).not.toContain('<tools>')
  })

  it('uno schema E-R: entità, relazioni e attributi, le cardinalità dalla parte dove sono scritte; le tabelle con i campi e le chiavi', () => {
    const er = schemaTopic(
      JSON.stringify({
        v: 1,
        nodes: [
          { id: 'm', shape: 'keyAttribute', x: 0, y: 100, w: 20, h: 20, text: 'Matricola' },
          { id: 's', shape: 'rect', x: 0, y: 0, w: 120, h: 60, text: 'Studente' },
          { id: 'r', shape: 'rhombus', x: 200, y: 0, w: 120, h: 60, text: 'Iscrizione' },
          { id: 'c', shape: 'rect', x: 400, y: 0, w: 120, h: 60, text: 'Corso' },
        ],
        edges: [
          { id: 'e1', from: 's', to: 'r', arrows: 'none', text: '(0,N)', at: 'start' },
          { id: 'e2', from: 'r', to: 'c', arrows: 'none', text: '(1,N)', at: 'end' },
          { id: 'e3', from: 's', to: 'm', arrows: 'none' },
        ],
      }),
    )
    expect(er.title).toEqual({ text: 'Studente · Iscrizione · Corso' })
    expect(er.content.split('\n')).toEqual([
      'Forme:',
      '- «Studente» (entità)',
      '- «Iscrizione» (relazione)',
      '- «Corso» (entità)',
      '- «Matricola» (attributo chiave)',
      'Collegamenti:',
      '- «Studente» — «Iscrizione», con «(0,N)» dalla parte di «Studente»',
      '- «Iscrizione» — «Corso», con «(1,N)» dalla parte di «Corso»',
      '- «Studente» — «Matricola»',
    ])
    expect(er.facts).toEqual(['lo schema ha 4 forme e 3 collegamenti', 'è uno schema E-R: entità, relazioni e i loro attributi'])
    const table = schemaTopic(JSON.stringify({ v: 1, nodes: [{ id: 't', shape: 'table', x: 0, y: 0, w: 160, h: 100, text: 'Studente\nPK Matricola: CHAR(6)\nNome\nPK FK Corso' }], edges: [] }))
    expect(table.content).toBe('Forme:\n- «Studente» (tabella), campi: Matricola (CHAR(6), chiave primaria), Nome, Corso (chiave primaria ed esterna)')
    expect(table.facts).toEqual(['lo schema ha 1 forma e nessun collegamento', 'c\'è una tabella di una base di dati, con i campi e le chiavi'])
  })

  it('una tabella: la griglia con le lettere e i valori di Glifo, le formule copiate dette una volta, gli errori con cosa vogliono dire', async () => {
    const topic = tableTopic(SHEET)
    expect(topic.title).toEqual({ text: 'Prodotto · Quantità · Prezzo · Totale' })
    expect(topic.content.split('\n')).toEqual([
      '|   | A | B | C | D |',
      '|---|---|---|---|---|',
      '| 1 | Prodotto | Quantità | Prezzo | Totale |',
      '| 2 | Penne | 10 | 1,50 € | 15,00 € |',
      '| 3 | Quaderni | 5 | 2,40 € | 12,00 € |',
      '| 4 | Gomme | 0 | 0,50 € | 0,00 € |',
      '| 5 | Totale | 15 | 4,40 € | 27,00 € |',
      '| 6 | Per pezzo |  |  | #DIV/0! |',
    ])
    expect(topic.facts).toEqual([
      'da D2 a D4 la stessa formula riga per riga: D2 =B2*C2 … D4 =B4*C4',
      'da B5 a D5 la stessa formula colonna per colonna: B5 =SOMMA(B2:B4) … D5 =SOMMA(D2:D4)',
      'in D6 la formula =D5/B4, che dà #DIV/0!',
      'in D6 c\'è l\'errore #DIV/0! (divisione per zero)',
    ])
    expect(topicPrompt(topic)).toContain('La tabella nella nota, con i valori calcolati da Glifo:\n|   | A |')
    // Glifo controlla i conti con i numeri della spiegazione.
    const e = await explainTopic(topic, 'semplice', async () => r`1. Il totale delle penne è il prezzo per la quantità. $$10 \cdot 1{,}5 = 15$$
2. I quaderni costano di più. $$5 \cdot 2{,}4 = 13$$`)
    expect(e.steps.map((s) => s.check)).toEqual([{ ok: true }, { ok: false, value: { tex: '12', text: '12' } }])
  })
})

let editor: MarkdownEditor | null = null
afterEach(() => {
  editor?.view.destroy()
  editor = null
  document.body.replaceChildren()
})

function fakeModel(replies: string[], seen: ChatMessage[][] = []): ExplainModel {
  return {
    load: async (model: string, onProgress?: (p: LoadProgress) => void) => {
      onProgress?.({ progress: 1, text: 'Finish loading' })
      return `${model}-q4f16_1-MLC`
    },
    chat: async (messages, _options, onDelta) => {
      seen.push(messages.map((m) => ({ ...m })))
      const reply = replies.shift() ?? ''
      onDelta?.(reply)
      return reply
    },
  }
}

function setup(doc: string, replies: string[], seen: ChatMessage[][] = []) {
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
    model: () => fakeModel(replies, seen),
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
    expect(items.map((b) => b.dataset.kind)).toEqual(['formula', 'grafico'])
    items[1].click()
    await settle()
    expect([...panel.el.querySelectorAll('.ai-subject')].map((b) => b.getAttribute('aria-pressed'))).toEqual(['false', 'true'])
    const steps = [...panel.el.querySelectorAll('.explain-step')]
    expect(steps.map((s) => s.className)).toEqual(['explain-step is-ok', 'explain-step is-ok', 'explain-step is-ok'])
    expect(panel.el.querySelector('.explain-summary')?.textContent).toBe('✓ Formule controllate da Glifo: 3 su 3, tutte giuste. Le frasi le scrive il modello.')
    const insert = [...panel.el.querySelectorAll('button')].find((b) => b.textContent === 'Inserisci nella nota')!
    insert.click()
    expect(toasts).toEqual(['Spiegazione inserita nella nota'])
    expect(editor.getDoc()).toBe(`# Parabola\n\nLa funzione $y = x^2$.\n\n${GRAPH}\n\n1. È una parabola con il vertice nell'origine: $f(0) = 0$\n2. La derivata si annulla in zero, dove c'è il minimo: $f'(x) = 2x$\n3. In uno vale uno: $f(1) = 1$\n\nFine.`)
  })

  it('uno schema e una tabella: nell\'elenco con il loro nome; la tabella al modello con i valori, e la spiegazione dopo il blocco', async () => {
    const table = `\`\`\`tabella\n${SHEET}\n\`\`\``
    const doc = `# Negozio\n\n\`\`\`schema\n${FLOW}\n\`\`\`\n\n${table}\n\nFine.`
    const seen: ChatMessage[][] = []
    const { editor, panel } = setup(doc, [r`1. In D si moltiplica la quantità per il prezzo. $$10 \cdot 1{,}5 = 15$$` + '\n2. In fondo ci sono i totali.'], seen)
    panel.show()
    const items = [...panel.el.querySelectorAll<HTMLButtonElement>('.ai-subject')]
    expect(items.map((b) => [b.dataset.kind, b.querySelector('.ai-subject-kind')?.textContent, b.querySelector('.ai-subject-body')?.textContent])).toEqual([
      ['schema', 'Schema', 'Inizio · Ordina · Disponibile? · Spedisce · Fine'],
      ['tabella', 'Tabella', 'Prodotto · Quantità · Prezzo · Totale'],
    ])
    items[1].click()
    await settle()
    expect(seen[0][1].content).toContain('| 2 | Penne | 10 | 1,50 € | 15,00 € |')
    expect(seen[0][1].content).toContain('Dal motore di Glifo: da D2 a D4 la stessa formula riga per riga')
    expect(panel.el.querySelector('.explain-title-text')?.textContent).toBe('Prodotto · Quantità · Prezzo · Totale')
    expect(panel.el.querySelector('.explain-summary')?.textContent).toBe('✓ Formule controllate da Glifo: 1 su 1, tutte giuste. Le frasi le scrive il modello.')
    ;[...panel.el.querySelectorAll('button')].find((b) => b.textContent === 'Inserisci nella nota')!.click()
    // La frase senza formula tiene il suo punto.
    expect(editor.getDoc()).toBe(doc.replace(`${table}\n\n`, `${table}\n\n1. In D si moltiplica la quantità per il prezzo: $10 \\cdot 1{,}5 = 15$\n2. In fondo ci sono i totali.\n\n`))
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
