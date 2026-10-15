import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { askAi } from '../src/ai/assistant'
import {
  chatSystemPrompt,
  EXPLAIN_TONES,
  explain,
  ExplainError,
  explainTarget,
  explainTopic,
  questionPrompt,
  sheetFactory,
  stepsIn,
  systemPrompt,
  topicFeedback,
  topicPrompt,
  topicSystemPrompt,
  type ChatFn,
  type ExplainTarget,
} from '../src/ai/explain'
import { LocalAbort, LocalLlm, localErrorMessage, type WorkerLike } from '../src/ai/local'
import { GLIFO_ERROR, glifoErrorMessage, type ChatMessage, type FromWorker, type ToWorker } from '../src/ai/localModels'
import { aiService } from '../src/ai/services'
import { runTool, toolsPrompt } from '../src/ai/tools'
import { graphTopic, schemaTitle, schemaTopic, tableTitle, tableTopic, theoremTopic } from '../src/ai/topics'
import { theoremsIn } from '../src/editor/explainSubjects'
import { browserLang, setLangForTests } from '../src/i18n'
import { Sheet } from '../src/math/sheet'

/**
 * L'AI con Glifo in inglese (src/ai): i messaggi per il modello (con l'istruzione di rispondere in
 * inglese), i fatti di grafici, schemi e tabelle, gli strumenti, i teoremi scritti in inglese, gli errori
 * e la lingua che arriva al worker del modello. In italiano tutto resta com'era (le altre prove).
 */

const r = String.raw
const sheet = sheetFactory([])

/** Parole e lettere dell'italiano che in un testo inglese non ci sono. */
const ITALIAN = /[àèéìòù]|\b(?:il|gli|della|nella|che|sono|passaggio|passaggi|spiegazione|risultato|regole|spiegami|motore|conto|conti|formule|studente|strumenti)\b/i

beforeEach(() => setLangForTests('en'))
afterEach(() => {
  setLangForTests('it')
  vi.unstubAllGlobals()
})

function target(tex: string, defs: string[] = []): ExplainTarget {
  const s = new Sheet()
  for (const d of defs) s.add(d)
  const t = explainTarget(tex, s, defs)
  if (!t) throw new Error(`niente da spiegare in ${tex}`)
  return t
}

/** Un modello finto: risponde con i testi dati, uno per giro, e tiene le conversazioni che riceve. */
function scripted(...replies: string[]): { chat: ChatFn; seen: ChatMessage[][] } {
  const seen: ChatMessage[][] = []
  return {
    seen,
    chat: async (messages, onDelta) => {
      seen.push(messages.map((m) => ({ ...m })))
      const reply = replies.shift()
      if (reply === undefined) throw new Error('il modello finto non ha altre risposte')
      onDelta?.(reply)
      return reply
    },
  }
}

const SPHERE = r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx =`

describe('i messaggi per il modello, in inglese', () => {
  it('il messaggio di sistema dei conti: in inglese, con l\'istruzione di rispondere in inglese', () => {
    for (const tone of ['professore', 'semplice'] as const) {
      const system = systemPrompt(tone)
      expect(system.startsWith('You are the tutor of Glifo, the app for taking math notes. You explain in English')).toBe(true)
      expect(system).toContain('Always write in English.')
      expect(system).toContain('fundamental theorem of calculus')
      expect(system).toContain('power rule')
      expect(system).toContain('the limits of integration')
      expect(system).toContain(r`powers included: \frac{d}{dx}\left((x^2+1)^3\right)`)
      expect(system).not.toMatch(ITALIAN)
      // La riga d'esempio si legge come un passaggio vero.
      const example = system.split('\n').find((l) => /^1\. /.test(l))
      expect(example && stepsIn(example)).toEqual([{ text: 'By the product rule, I differentiate one factor at a time.', formula: r`\frac{d}{dx}(x^2 \sin x) = 2x \sin x + x^2 \cos x` }])
    }
    expect(systemPrompt('professore')).toContain('Write like a university professor')
    expect(systemPrompt('semplice')).toContain('as if to a classmate')
    expect(EXPLAIN_TONES.map((t) => t.label)).toEqual(['Like a professor', 'Simpler'])
  })

  it('i messaggi di sistema delle altre cose della nota e della chat', () => {
    for (const kind of ['grafico', 'formula', 'teorema', 'schema', 'tabella'] as const) {
      const system = topicSystemPrompt('semplice', kind)
      expect(system).toMatch(/^You are the tutor of Glifo, the app for taking math notes\. You explain to the student, in English, /)
      expect(system).toContain('Always write in English.')
      expect(system).not.toMatch(ITALIAN)
    }
    expect(topicSystemPrompt('professore', 'grafico')).toContain('what a graph in their note shows')
    expect(topicSystemPrompt('professore', 'schema')).toContain('A formula between $$ only if it is already in the diagram.')
    for (const kind of ['conto', 'grafico', 'formula', 'teorema', 'schema', 'tabella'] as const) {
      const system = chatSystemPrompt('professore', kind)
      expect(system).toContain('now answer their questions about that explanation, in English. Always write in English.')
      expect(system).not.toMatch(ITALIAN)
    }
    expect(chatSystemPrompt('semplice', 'tabella')).toContain('You explained to the student a table in their note;')
  })

  it('il primo messaggio di un conto: la formula, il risultato di Glifo e la domanda', () => {
    const wrong = target(r`\int_0^1 x^2 \, dx = \frac{1}{2}`)
    expect(questionPrompt(wrong, [])).toBe(
      [
        r`Formula: $$\int_0^1 x^2 \, dx$$`,
        r`Glifo's result: $$\frac{1}{3}$$`,
        r`The student wrote $$\int_0^1 x^2 \, dx = \frac{1}{2}$$ but according to Glifo it is wrong: explain how to get to the correct result.`,
        'Explain how to get to the result.',
      ].join('\n'),
    )
    const solve = target(r`x^2 - 5x + 6 = 0 \Rightarrow`)
    expect(questionPrompt(solve, [])).toBe([r`To solve: $$x^2 - 5x + 6 = 0$$`, r`Glifo's solutions: $$x = 2 \lor x = 3$$`, 'Explain how to find the solutions.'].join('\n'))
    expect(questionPrompt(target(`f'(2) =`, ['f(x) = x^3 - 3x']), [r`\int x \, dx = \frac{x^{2}}{2} + c`])).toBe(
      ["Formula: $$f'(2)$$", "Glifo's result: $$9$$", 'Definitions in the note: $f(x) = x^3 - 3x$', r`From Glifo's engine: $$\int x \, dx = \frac{x^{2}}{2} + c$$`, 'Explain how to get to the result.'].join('\n'),
    )
  })

  it('il giro con il modello: gli strumenti con i nomi inglesi, le correzioni e il promemoria in inglese', async () => {
    const t = target(SPHERE)
    const { chat, seen } = scripted(
      '<tool_call>\n{"name": "antiderivative", "arguments": {"function": "R^2 - x^2", "variable": "x"}}\n</tool_call>',
      r`Step 1: I take $\pi$ out. $$\int_{-R}^{R} \pi (R^2 - x^2) \, dx = \pi \int_{-R}^{R} (R^2 - x^2) \, dx$$
Step 2: I substitute the limits. $$\pi \left[R^2 x - \frac{x^3}{3}\right]_{-R}^{R} = \frac{2\pi R^3}{3}$$`,
      r`1. I take $\pi$ out. $$\int_{-R}^{R} \pi (R^2 - x^2) \, dx = \pi \int_{-R}^{R} (R^2 - x^2) \, dx$$
2. I substitute the limits. $$\pi \left[R^2 x - \frac{x^3}{3}\right]_{-R}^{R} = \frac{4\pi R^3}{3}$$
3. Final result: $\frac{4\pi R^3}{3}$`,
    )
    const tools: string[] = []
    const result = await explain(t, 'semplice', chat, { onTool: (_, response) => tools.push(response) })
    expect(tools).toEqual([r`\int \left(R^2 - x^2\right) \, dx = R^{2}x - \frac{x^{3}}{3} + c`])
    expect(result.steps.map((s) => [s.text, s.check?.ok])).toEqual([
      ['I take $\\pi$ out.', true],
      ['I substitute the limits.', true],
    ])
    expect(result).toMatchObject({ reaches: true, toolCalls: 1, corrections: 1 })
    expect(seen[0][0].content).toBe(systemPrompt('semplice'))
    expect(seen[0][1].content).toContain(r`Glifo's result: $$\frac{4\pi R^{3}}{3}$$`)
    expect(seen[0][1].content).toContain("From Glifo's engine: $$\\int")
    // La correzione: i passaggi sbagliati, in inglese.
    expect(seen[2].at(-1)!.content).toBe(
      [
        'Glifo checked the steps:',
        '- Step 2 is wrong.',
        r`- The last step doesn't reach Glifo's result, $\frac{4\pi R^{3}}{3}$.`,
        'Fix the mistakes and rewrite the whole explanation in the same format. If you need a calculation, use the tools.',
      ].join('\n'),
    )
    // Se il modello non scrive i passaggi: il promemoria in inglese, poi l'errore per chi usa Glifo.
    const silent = scripted('I do not know.', 'Really, I do not know.')
    const error = await explain(t, 'professore', silent.chat).catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ExplainError)
    expect((error as Error).message).toBe('The model didn\'t write the steps: try again, or choose a bigger model in Settings.')
    expect(silent.seen[1].at(-1)!.content).toBe('Now write the explanation in the required format: a numbered list, one step per line, with the sentence and the formula between $$.')
  })

  it('le formule sbagliate di un grafico o della chat: la correzione in inglese', () => {
    const steps = [
      { text: 'a', formula: 'f(1) = 2', check: { ok: false as const, value: { tex: '1', text: '1' } } },
      { text: 'b', formula: 'f(2) = 3', check: { ok: false as const } },
    ]
    expect(topicFeedback({ steps })).toBe(
      ['Glifo checked the formulas:', '- The formula in point 1 is wrong: Glifo calculates $1$.', '- The formula in point 2 is wrong.', 'Fix the mistakes and rewrite the whole explanation in the same format.'].join('\n'),
    )
  })
})

describe('gli strumenti del motore, in inglese', () => {
  it('nel messaggio di sistema i nomi, gli argomenti e le descrizioni inglesi', () => {
    const tools = toolsPrompt()
    for (const name of ['calculate', 'check', 'derivative', 'antiderivative', 'solve']) expect(tools).toContain(`"name":"${name}"`)
    for (const arg of ['expression', 'equality', 'function', 'variable', 'equation']) expect(tools).toContain(`"${arg}":{"type":"string"`)
    expect(tools).toContain('Finds an antiderivative (the indefinite integral) of a function with Glifo\'s engine.')
    expect(tools).not.toMatch(ITALIAN)
  })

  it('i nomi inglesi e quelli italiani funzionano; le risposte sono in inglese', () => {
    expect(runTool({ name: 'calculate', args: { expression: r`\frac{1}{2} + \frac{1}{3}` } }, sheet)).toBe(r`\frac{1}{2} + \frac{1}{3} = \frac{5}{6}`)
    expect(runTool({ name: 'derivative', args: { function: r`x^2 \sin x`, variable: 'x' } }, sheet)).toBe(r`\frac{d}{dx}\left(x^2 \sin x\right) = 2x\sin x + x^{2}\cos x`)
    expect(runTool({ name: 'solve', args: { equation: 'x^2 - 5x + 6 = 0' } }, sheet)).toBe(r`x^2 - 5x + 6 = 0 \Rightarrow x = 2 \lor x = 3`)
    // Dentro Glifo (engineHints) si usano i nomi italiani: vanno anche con Glifo in inglese.
    expect(runTool({ name: 'primitiva', args: { funzione: 'R^2 - x^2', variabile: 'x' } }, sheet)).toBe(r`\int \left(R^2 - x^2\right) \, dx = R^{2}x - \frac{x^{3}}{3} + c`)
    expect(runTool({ name: 'check', args: { equality: '(x + 1)^2 = x^2 + 2x + 1' } }, sheet)).toBe('Correct.')
    expect(runTool({ name: 'check', args: { equality: r`\int_0^1 x^2 \, dx = \frac{1}{2}` } }, sheet)).toBe(r`Wrong: the correct value is \frac{1}{3}.`)
    expect(runTool({ name: 'check', args: { equality: '(x + 1)^2 = x^2 + x + 1' } }, sheet)).toBe('Wrong: the two sides are not equal (if it is an equation to solve, use solve).')
    expect(runTool({ name: 'check', args: { equality: 'x' } }, sheet)).toBe('This needs an equality, with “=”.')
    expect(runTool({ name: 'calculate', args: { expression: '' } }, sheet)).toBe('The expression is missing.')
    expect(runTool({ name: 'calculate', args: { expression: r`\text{boh}` } }, sheet)).toBe('Glifo can\'t do this calculation: write it another way or go on without it.')
    expect(runTool({ name: 'integrate', args: {} }, sheet)).toBe('There is no tool “integrate”: use calculate, check, derivative, antiderivative, solve.')
  })
})

describe('i fatti di Glifo, in inglese e con i numeri con il punto', () => {
  it('un grafico: il titolo, gli assi, la funzione con il suo studio, l\'area, i punti e gli slider', () => {
    const topic = graphTopic(['titolo: Motion', 'asse x: time $t$ (s)', 'y = x^2', r`\int_0^1 x^2 \, dx`, 'P = (1.5, 2.25)', '(2, 4)', 'x^2 + y^2 = 1'].join('\n'), [])
    expect(topic.title).toEqual({ text: 'Motion' })
    expect(topic.facts.slice(0, 3)).toEqual(['graph title: Motion', 'the x axis is time $t$ (s)', 'the function $$f(x) = x^{2}$$'])
    expect(topic.facts[3]).toMatch(/^analysis of f: /)
    expect(topic.facts[4]).toMatch(/^shaded area under the curve, from 0 to 1: \$\$\\int_\{0\}\^\{1\} x\^\{2\} \\, dx = /)
    expect(topic.facts.slice(5)).toEqual(['the point P = (1.5, 2.25)', 'the point = (2, 4)', 'also in the graph: $$x^{2} + y^{2} = 1$$'])
    // Il modello legge il blocco com'è nella nota, poi i fatti.
    const prompt = topicPrompt(topic)
    expect(prompt.startsWith('The graph in the note:\n```grafico\ntitolo: Motion')).toBe(true)
    expect(prompt).toContain('Definitions: $f(x) = x^{2}$')
    expect(prompt).toContain("From Glifo's engine: the point P = (1.5, 2.25)")
    expect(prompt.endsWith('Explain what the graph shows.')).toBe(true)
    // Lo slider con un numero decimale; senza niente da mostrare, «The graph».
    expect(graphTopic('y = a x^2', ['a = 0.5']).facts.at(-1)).toMatch(/^the slider a is set to 0\.5 \(from .+ to .+\)$/)
    expect(graphTopic('', []).title).toEqual({ text: 'The graph' })
  })

  it('in italiano i numeri restano con la virgola', () => {
    setLangForTests('it')
    expect(graphTopic('P = (1.5, 2.25)', []).facts).toEqual(['il punto P = (1,5; 2,25)'])
  })

  it('una tabella scritta all\'italiana: le formule e gli errori come in Excel inglese', () => {
    const source = ['| Cosa | Quanto |', '| --- | --- |', '| Penne | 2,5 |', '| Somma | =SOMMA(B2:B2) |', '| Errore | =NONESISTE(B2) |'].join('\n')
    const facts = tableTopic(source).facts.join(' · ')
    expect(facts).toContain('=SUM(B2:B2)')
    expect(facts).not.toContain('SOMMA')
    expect(facts).toContain('#NAME?')
    expect(facts).not.toContain('#NOME?')
  })

  it('una tabella: la griglia, le formule copiate dette una volta, gli errori, e il nome nell\'elenco', () => {
    const source = [
      '| Item | Qty | Price | Total |',
      '| --- | --- | --- | --- |',
      '| Pens | 10 | 2 | =B2*C2 |',
      '| Notebooks | 5 | 3 | =B3*C3 |',
      '| Sum | =B2+B3 | =C2+C3 | =D2+D3 |',
      '| Per item | | | =D4/0 |',
    ].join('\n')
    const topic = tableTopic(source)
    expect(topic.title).toEqual({ text: 'Item · Qty · Price · Total' })
    expect(topic.content.split('\n').slice(0, 3)).toEqual(['|   | A | B | C | D |', '|---|---|---|---|---|', '| 1 | Item | Qty | Price | Total |'])
    expect(topic.facts.slice(0, 3)).toEqual([
      'from D2 to D3 the same formula row by row: D2 =B2*C2 … D3 =B3*C3',
      'from B4 to D4 the same formula column by column: B4 =B2+B3 … D4 =D2+D3',
      'in D5 the formula =D4/0, which gives #DIV/0!',
    ])
    expect(topic.facts[3]).toMatch(/^in D5 there is the error #DIV\/0! \(.+\)$/)
    const prompt = topicPrompt(topic)
    expect(prompt.startsWith('The table in the note, with the values calculated by Glifo:\n|   | A |')).toBe(true)
    expect(prompt).toContain("From Glifo's engine: from D2 to D3 the same formula row by row")
    expect(prompt.endsWith('Explain what the table calculates.')).toBe(true)
    // Senza intestazioni: quante righe e colonne; troppe colonne: quante ne restano.
    expect(tableTitle('| =1 |\n| --- |')).toBe('1 row and 1 column')
    expect(tableTitle('| =1 | =2 | =3 |\n| --- | --- | --- |\n| 4 | 5 | 6 |')).toBe('2 rows and 3 columns')
    const wide = tableTopic(['| ' + Array.from({ length: 13 }, (_, i) => `c${i}`).join(' | ') + ' |', '| ' + Array.from({ length: 13 }, () => '---').join(' | ') + ' |'].join('\n'))
    expect(wide.content.split('\n').at(-1)).toBe('… and 1 more column')
    expect(tableTopic('').title).toEqual({ text: 'The table' })
  })

  it('uno schema: le corsie, le forme nell\'ordine delle frecce, i collegamenti, da dove si parte e dove si arriva', () => {
    const flow = JSON.stringify({
      v: 1,
      nodes: [
        { id: 'l', shape: 'lanes', x: 0, y: 0, w: 660, h: 420, text: 'Customer\nShop' },
        { id: 'e', shape: 'ellipse', x: 40, y: 330, w: 120, h: 60, text: 'End' },
        { id: 'a', shape: 'ellipse', x: 40, y: 60, w: 120, h: 60, text: 'Start' },
        { id: 'c', shape: 'rhombus', x: 380, y: 180, w: 120, h: 80, text: 'Available?' },
        { id: 'b', shape: 'rect', x: 40, y: 180, w: 120, h: 60, text: 'Order' },
        { id: 'd', shape: 'rect', x: 380, y: 300, w: 120, h: 60, text: 'Ship' },
      ],
      edges: [
        { id: 'e1', from: 'a', to: 'b' },
        { id: 'e2', from: 'b', to: 'c' },
        { id: 'e3', from: 'c', to: 'd', text: 'yes' },
        { id: 'e4', from: 'c', to: 'e', text: 'no', dashed: true },
        { id: 'e5', from: 'd', to: 'e' },
      ],
    })
    const topic = schemaTopic(flow)
    expect(topic.title).toEqual({ text: 'Start · Order · Available? · Ship · End' })
    const lines = topic.content.split('\n')
    expect(lines.slice(0, 2)).toEqual(['Swimlanes: “Customer”, “Shop”', 'Shapes:'])
    // Il nome della forma (ellisse, rettangolo…) viene dagli schemi (src/schema/model.ts).
    expect(lines[2]).toMatch(/^- “Start” \(.+\), in swimlane “Customer”$/)
    expect(lines.slice(7)).toEqual(['Connections:', '- “Start” → “Order”', '- “Order” → “Available?”', '- “Available?” → “Ship”: “yes”', '- “Available?” → “End”: “no” (dashed)', '- “Ship” → “End”'])
    expect(topic.facts).toEqual(['the diagram has 5 shapes and 5 connections, in 2 swimlanes', 'following the arrows, it starts from “Start”', 'following the arrows, it ends at “End”'])
    expect(topicPrompt(topic).startsWith('The diagram in the note, described by Glifo:\nSwimlanes:')).toBe(true)
    expect(topicPrompt(topic).endsWith('Explain what the diagram represents.')).toBe(true)
  })

  it('uno schema E-R e le tabelle di una base di dati', () => {
    const er = schemaTopic(
      JSON.stringify({
        v: 1,
        nodes: [
          { id: 's', shape: 'rect', x: 0, y: 0, w: 120, h: 60, text: 'Student' },
          { id: 'r', shape: 'rhombus', x: 200, y: 0, w: 120, h: 60, text: 'Enrollment' },
          { id: 'c', shape: 'rect', x: 400, y: 0, w: 120, h: 60, text: 'Course' },
          { id: 'm', shape: 'keyAttribute', x: 0, y: 100, w: 20, h: 20, text: 'Id' },
          { id: 'x', shape: 'rect', x: 400, y: 200, w: 120, h: 60, text: '' },
        ],
        edges: [
          { id: 'e1', from: 's', to: 'r', arrows: 'none', text: '(0,N)', at: 'start' },
          { id: 'e2', from: 'r', to: 'c', arrows: 'none', text: '(1,N)', at: 'end' },
        ],
      }),
    )
    expect(er.content.split('\n')).toEqual(
      expect.arrayContaining([
        '- “Student” (entity)',
        '- “Enrollment” (relationship)',
        '- entity no. 1',
        '- “Student” — “Enrollment”, with “(0,N)” on the side of “Student”',
        '- “Enrollment” — “Course”, with “(1,N)” on the side of “Course”',
      ]),
    )
    expect(er.facts).toEqual(['the diagram has 5 shapes and 2 connections', 'it is an E-R diagram: entities, relationships and their attributes'])
    const table = schemaTopic(JSON.stringify({ v: 1, nodes: [{ id: 't', shape: 'table', x: 0, y: 0, w: 160, h: 100, text: 'Student\nPK Id: CHAR(6)\nName\nPK FK Course\nFK Room' }], edges: [] }))
    expect(table.content).toMatch(/, fields: Id \(CHAR\(6\), primary key\), Name, Course \(primary and foreign key\), Room \(foreign key\)$/)
    expect(table.facts).toEqual(['the diagram has 1 shape and no connections', 'there is one database table, with fields and keys'])
    expect(schemaTitle('{"v":1,"nodes":[{"id":"a","shape":"rect","x":0,"y":0,"w":1,"h":1,"text":""}],"edges":[]}')).toBe('1 shape')
    expect(schemaTopic('{"v":1,"nodes":[],"edges":[]}').title).toEqual({ text: 'The diagram' })
  })
})

describe('i teoremi scritti in inglese', () => {
  const NOTE = [
    '## Theorem (Pythagoras)',
    '',
    'In a right triangle $a^2 + b^2 = c^2$.',
    '',
    '**Definition** (limit): we say that $f$ tends to $L$ if…',
    '',
    '- Proof. By induction on $n$.',
    '',
    'Remark: it also holds for $n = 0$.',
    '',
    'Example 2. Take $x = 1$.',
    '',
    'Corollary 1. The sum is finite.',
    '',
    '*Proposition* 3: every bounded sequence has a convergent subsequence.',
    '',
    'LEMMA 4. Small but useful.',
    '',
    'A line that mentions a Theorem does not start like this.',
    '',
    '## Teorema di Pitagora',
    '',
    '```',
    'Theorem in a code block: no',
    '```',
  ].join('\n')
  const EXPECTED = [
    ['Theorem', 'Theorem (Pythagoras)'],
    ['Definition', 'Definition (limit)'],
    ['Corollary', 'Corollary 1'],
    ['Proposition', 'Proposition 3'],
    ['Lemma', 'LEMMA 4'],
    ['Teorema', 'Teorema di Pitagora'],
  ]

  it('si riconoscono con Glifo in inglese e in italiano, insieme a quelli italiani', () => {
    expect(theoremsIn(NOTE).map((s) => [s.tag, s.title])).toEqual(EXPECTED)
    expect(theoremsIn(NOTE)[0].source).toBe('## Theorem (Pythagoras)\n\nIn a right triangle $a^2 + b^2 = c^2$.\n\n**Definition** (limit): we say that $f$ tends to $L$ if…\n\n- Proof. By induction on $n$.\n\nRemark: it also holds for $n = 0$.\n\nExample 2. Take $x = 1$.\n\nCorollary 1. The sum is finite.\n\n*Proposition* 3: every bounded sequence has a convergent subsequence.\n\nLEMMA 4. Small but useful.\n\nA line that mentions a Theorem does not start like this.')
    setLangForTests('it')
    expect(theoremsIn(NOTE).map((s) => [s.tag, s.title])).toEqual(EXPECTED)
  })

  it('un teorema al modello: il testo com\'è e la domanda in inglese', async () => {
    const text = '## Theorem (Pythagoras)\n\nIn a right triangle $a^2 + b^2 = c^2$.'
    const { chat, seen } = scripted('1. The square on the hypotenuse is the sum of the squares on the legs. $$5^2 = 3^2 + 4^2$$')
    const e = await explainTopic(theoremTopic(text, 'Theorem (Pythagoras)'), 'professore', chat)
    expect(e.steps[0].check).toEqual({ ok: true })
    expect(seen[0][0].content).toContain('a theorem or a definition in their note')
    expect(seen[0][0].content).not.toContain('<tools>')
    expect(seen[0][1].content).toBe(`From the note:\n${text}\nExplain this statement.`)
  })
})

describe('gli errori per chi usa Glifo, in inglese', () => {
  it('il modello nel browser', () => {
    expect(localErrorMessage('QuotaExceededError', 'The quota has been exceeded.')).toBe('There isn\'t enough space in the browser for the model: free some up or choose a smaller model in Settings.')
    expect(localErrorMessage('Error', 'Device was lost')).toBe('The graphics card can\'t handle this model: choose a smaller model in Settings.')
    expect(localErrorMessage('Error', 'NetworkError when attempting to fetch resource.')).toMatch(/^Can't download the model: you need a connection/)
    expect(localErrorMessage('ContextWindowSizeExceededError', 'Prompt tokens exceed context window size')).toBe('The explanation got too long for the model in your browser: try again, or choose a bigger model in Settings.')
    expect(localErrorMessage('Error', 'Cannot find adapter that matches the request')).toMatch(/needs WebGPU/)
    expect(localErrorMessage('Error', 'boh')).toBe('The model in your browser stopped: boh')
    expect(localErrorMessage('', '')).toBe('The model in your browser stopped: unknown error')
    expect(new LocalAbort().message).toBe('Cancelled')
  })

  it('l\'assistente con la chiave: gli errori del servizio', async () => {
    const answer = (status: number) => vi.fn(async () => new Response(JSON.stringify({ error: { message: 'no' } }), { status }))
    const gemini = { service: 'gemini' as const, apiKey: 'k', model: 'gemini-flash-lite-latest', baseUrl: '' }
    vi.stubGlobal('fetch', answer(401))
    await expect(askAi('x', gemini)).rejects.toThrow('The key for Gemini isn\'t valid (or doesn\'t have the permissions): check it in Settings.')
    vi.stubGlobal('fetch', answer(503))
    await expect(askAi('x', { service: 'compatible', apiKey: '', model: 'm', baseUrl: 'https://api.example.com/v1' })).rejects.toThrow('The service is having a problem right now (503): try again later.')
    vi.stubGlobal('fetch', answer(404))
    await expect(askAi('x', { service: 'ollama', apiKey: '', model: 'llama9', baseUrl: '' })).rejects.toThrow('The model “llama9” isn\'t in Ollama: download it with “ollama pull llama9”, or choose another one in Settings.')
    vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new TypeError('Failed to fetch'))))
    await expect(askAi('x', { service: 'compatible', apiKey: '', model: 'm', baseUrl: 'https://api.example.com/v1' })).rejects.toThrow('Can\'t reach the service: check your connection and the URL in Settings.')
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    await expect(askAi('x', { ...gemini, apiKey: '' })).rejects.toThrow('To use Gemini you need a key: enter it in Settings (it\'s saved only in this browser).')
    await expect(askAi('x', { apiKey: '', model: 'claude-opus-5-5' })).rejects.toThrow(/^To use the AI assistant you need an API key/)
    expect(fetchMock).not.toHaveBeenCalled()
    expect(aiService('compatible').name).toBe('the service')
  })

  it('l\'assistente con la chiave: le istruzioni e lo schema della risposta in inglese', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ model: 'm', choices: [{ message: { content: '{"answers": [], "note": ""}' }, finish_reason: 'stop' }] }), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)
    await askAi('infinity', { service: 'gemini', apiKey: 'k', model: 'm', baseUrl: '' })
    const body = JSON.parse(String((fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].body))
    expect(body.messages[0].content).toMatch(/^You are the assistant of Glifo/)
    expect(body.messages[0].content).toContain('- Always write in English, even if the question is in another language.')
    expect(body.messages[0].content).toContain('{"answers": [{"latex": "\\\\infty", "description": "The infinity symbol."}], "note": ""}')
    expect(body.messages[0].content).not.toMatch(ITALIAN)
    expect(body.response_format.json_schema.name).toBe('answer')
    expect(body.response_format.json_schema.schema.properties.answers.items.properties.description.description).toBe('Short explanation in English')
  })
})

/** Un worker finto: tiene i messaggi ricevuti e risponde con `reply`. */
function fakeWorker(reply: (msg: ToWorker, send: (m: FromWorker) => void) => void) {
  const listeners: ((ev: Event) => void)[] = []
  const received: ToWorker[] = []
  const send = (data: FromWorker) => queueMicrotask(() => listeners.forEach((fn) => fn({ data } as unknown as Event)))
  const worker = {
    postMessage: (msg: ToWorker) => {
      received.push(msg)
      reply(msg, send)
    },
    addEventListener: (type: string, fn: (ev: Event) => void) => {
      if (type === 'message') listeners.push(fn)
    },
    terminate: () => {},
  } as unknown as WorkerLike
  return { worker, received }
}

describe('la lingua che arriva al worker del modello', () => {
  it('i messaggi per il modello si preparano nella pagina, nella lingua di Glifo (non in quella del browser)', async () => {
    // Il browser delle prove è in italiano (tests/support/lang.ts), Glifo in inglese: nel worker `lang`
    // di src/i18n.ts sarebbe l'italiano del browser, ma al worker i testi arrivano già in inglese.
    expect(browserLang(navigator.languages)).toBe('it')
    const steps = r`1. I take $\pi$ out. $$\int_{-R}^{R} \pi (R^2 - x^2) \, dx = \pi \int_{-R}^{R} (R^2 - x^2) \, dx$$
2. I substitute the limits. $$\pi \left[R^2 x - \frac{x^3}{3}\right]_{-R}^{R} = \frac{4\pi R^3}{3}$$`
    const { worker, received } = fakeWorker((msg, send) => {
      if (msg.type === 'load') send({ id: msg.id, type: 'done', value: `${msg.model}-q4f16_1-MLC` })
      else if (msg.type === 'chat') send({ id: msg.id, type: 'done', value: steps })
    })
    const llm = new LocalLlm(() => worker)
    await llm.load('Qwen3-1.7B')
    const result = await explain(target(SPHERE), 'professore', (messages, onDelta) => llm.chat(messages, {}, onDelta))
    expect(result.reaches).toBe(true)
    const chat = received.find((m): m is Extract<ToWorker, { type: 'chat' }> => m.type === 'chat')!
    expect(chat.messages.map((m) => m.role)).toEqual(['system', 'user'])
    expect(chat.messages[0].content).toBe(systemPrompt('professore'))
    expect(chat.messages[0].content).toContain('You explain in English')
    expect(chat.messages[0].content).not.toMatch(ITALIAN)
    expect(chat.messages[1].content).toContain("Glifo's result:")
    expect(chat.messages[1].content.endsWith('Explain how to get to the result.')).toBe(true)
  })

  it('il worker vero non scrive testi: manda un codice, e la pagina lo scrive nella sua lingua', async () => {
    // llmWorker.ts in un ambito finto, senza WebGPU (in Node navigator.gpu non c'è).
    const posted: FromWorker[] = []
    let onMessage: ((ev: MessageEvent<ToWorker>) => void) | null = null
    vi.stubGlobal('self', {
      postMessage: (msg: FromWorker) => posted.push(msg),
      addEventListener: (type: string, fn: (ev: MessageEvent<ToWorker>) => void) => {
        if (type === 'message') onMessage = fn
      },
    })
    await import('../src/ai/llmWorker')
    const send = (data: ToWorker) => onMessage!({ data } as MessageEvent<ToWorker>)
    send({ type: 'chat', id: 1, messages: [{ role: 'user', content: 'hi' }], options: {} })
    send({ type: 'load', id: 2, model: 'Qwen3-1.7B' })
    await vi.waitFor(() => expect(posted).toHaveLength(2))
    expect(posted).toEqual([
      { id: 1, type: 'error', name: GLIFO_ERROR, message: 'not-ready' },
      { id: 2, type: 'error', name: GLIFO_ERROR, message: 'no-webgpu' },
    ])
    // Una scheda grafica che non si trova.
    vi.stubGlobal('navigator', { gpu: { requestAdapter: async () => null } })
    send({ type: 'load', id: 3, model: 'Qwen3-1.7B' })
    await vi.waitFor(() => expect(posted).toHaveLength(3))
    expect(posted[2]).toEqual({ id: 3, type: 'error', name: GLIFO_ERROR, message: 'no-gpu' })
    // La pagina li scrive nella lingua di Glifo, in inglese o in italiano.
    const messages = () => posted.map((p) => (p.type === 'error' ? localErrorMessage(p.name, p.message) : ''))
    expect(messages()).toEqual([
      'The model isn\'t ready yet.',
      'This browser doesn\'t have WebGPU, which is needed to run the model on your device: try an up-to-date Chrome or Edge, on a computer.',
      'WebGPU is there, but it can\'t find a graphics card to use on this device.',
    ])
    expect(localErrorMessage(GLIFO_ERROR, glifoErrorMessage('unknown-model', 'Qwen3-9B-q4f16_1-MLC'))).toBe('The model Qwen3-9B-q4f16_1-MLC isn\'t in this version of WebLLM.')
    setLangForTests('it')
    expect(messages()).toEqual([
      'Il modello non è ancora pronto.',
      'Questo browser non ha WebGPU, che serve per far girare il modello sul dispositivo: prova con Chrome o Edge aggiornati, su un computer.',
      'WebGPU c\'è, ma non trova una scheda grafica da usare su questo dispositivo.',
    ])
    expect(localErrorMessage(GLIFO_ERROR, glifoErrorMessage('unknown-model', 'Qwen3-9B-q4f16_1-MLC'))).toBe('Il modello Qwen3-9B-q4f16_1-MLC non c\'è in questa versione di WebLLM.')
  })

  it('anche gli errori del worker che si ferma arrivano nella lingua di Glifo', async () => {
    const listeners: ((ev: Event) => void)[] = []
    const worker = {
      postMessage: () => {},
      addEventListener: (type: string, fn: (ev: Event) => void) => {
        if (type === 'error') listeners.push(fn)
      },
      terminate: () => {},
    } as unknown as WorkerLike
    const llm = new LocalLlm(() => worker)
    const loading = llm.load('Qwen3-1.7B')
    listeners.forEach((fn) => fn({ message: '', preventDefault() {} } as unknown as Event))
    await expect(loading).rejects.toThrow('The model in your browser stopped: the worker didn\'t start')
  })
})
