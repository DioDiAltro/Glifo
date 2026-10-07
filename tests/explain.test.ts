import { describe, expect, it } from 'vitest'
import { checkSteps, engineHints, explain, ExplainError, explainTarget, feedback, questionPrompt, sheetFactory, stepsIn, systemPrompt, type ChatFn, type ExplainTarget } from '../src/ai/explain'
import type { ChatMessage } from '../src/ai/localModels'
import { checkFormula, runTool, toolCallsIn, toolsPrompt } from '../src/ai/tools'
import { Sheet } from '../src/math/sheet'

const r = String.raw
const sheet = sheetFactory([])

function target(tex: string, defs: string[] = []): ExplainTarget {
  const s = new Sheet()
  for (const d of defs) s.add(d)
  const t = explainTarget(tex, s, defs)
  if (!t) throw new Error(`niente da spiegare in ${tex}`)
  return t
}

/** Il volume della sfera, come in ABBONAMENTI.md («Le spiegazioni, come funzionano»). */
const SPHERE = r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx =`
const SPHERE_STEPS = r`Ecco i passaggi:
1. Porto fuori $\pi$, che è una costante. $$\int_{-R}^{R} \pi (R^2 - x^2) \, dx = \pi \int_{-R}^{R} (R^2 - x^2) \, dx$$
2. **Trovo una primitiva**: $$\int (R^2 - x^2) \, dx = R^2 x - \frac{x^3}{3} + c$$
3. Sostituisco gli estremi: \[\pi \left[R^2 x - \frac{x^3}{3}\right]_{-R}^{R} = \pi \left(\frac{2R^3}{3} + \frac{2R^3}{3}\right)\]
4. Quindi il volume è $\pi \cdot \frac{4R^3}{3} = \frac{4\pi R^3}{3}$.`

describe('cosa c\'è da spiegare', () => {
  it('un risultato dopo «=», un risultato scritto (anche sbagliato), le soluzioni dopo ⇒', () => {
    const calc = target(SPHERE)
    expect(calc).toMatchObject({ kind: 'calc', question: r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx`, answer: { text: '(4πR³)/3' } })
    const wrong = target(r`\int_0^1 x^2 \, dx = \frac{1}{2}`)
    expect(wrong).toMatchObject({ kind: 'check', question: r`\int_0^1 x^2 \, dx`, answer: { text: '1/3' }, written: { tex: r`\frac{1}{2}`, ok: false } })
    expect(target(r`V = \int_{-R}^{R} \pi (R^2 - x^2) \, dx = \frac{4}{3} \pi R^3`)).toMatchObject({ kind: 'check', question: r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx`, written: { ok: true } })
    expect(target(r`x^2 - 5x + 6 = 0 \Rightarrow`)).toMatchObject({ kind: 'solve', question: 'x^2 - 5x + 6 = 0', answer: { tex: r`x = 2 \lor x = 3` } })
    // Con le definizioni della nota.
    expect(target(`f'(2) =`, ['f(x) = x^3 - 3x'])).toMatchObject({ kind: 'calc', answer: { tex: '9' }, defs: ['f(x) = x^3 - 3x'] })
  })

  it('una definizione o un\'equazione senza ⇒ non hanno un conto da spiegare', () => {
    expect(explainTarget('a = 2', new Sheet(), [])).toBeNull()
    expect(explainTarget('x^2 - 5x + 6 = 0', new Sheet(), [])).toBeNull()
  })
})

describe('il motore di Glifo come strumenti', () => {
  it('calcola, deriva, trova le primitive e risolve, con le definizioni della nota', () => {
    expect(runTool({ name: 'calcola', args: { espressione: r`\int_{-R}^{R} (R^2 - x^2) \, dx` } }, sheet)).toBe(r`\int_{-R}^{R} (R^2 - x^2) \, dx = \frac{4R^{3}}{3}`)
    expect(runTool({ name: 'calcola', args: { espressione: r`$\frac{1}{2} + \frac{1}{3} =$` } }, sheet)).toBe(r`\frac{1}{2} + \frac{1}{3} = \frac{5}{6}`)
    expect(runTool({ name: 'deriva', args: { funzione: r`x^2 \sin x`, variabile: 'x' } }, sheet)).toBe(r`\frac{d}{dx}\left(x^2 \sin x\right) = 2x\sin x + x^{2}\cos x`)
    expect(runTool({ name: 'primitiva', args: { funzione: 'R^2 - x^2', variabile: 'x' } }, sheet)).toBe(r`\int \left(R^2 - x^2\right) \, dx = R^{2}x - \frac{x^{3}}{3} + c`)
    expect(runTool({ name: 'risolvi', args: { equazione: 'x^2 - 5x + 6 = 0' } }, sheet)).toBe(r`x^2 - 5x + 6 = 0 \Rightarrow x = 2 \lor x = 3`)
    expect(runTool({ name: 'calcola', args: { espressione: 'f(3)' } }, sheetFactory(['f(x) = x^2 + 1']))).toBe('f(3) = 10')
  })

  it('controlla le uguaglianze, anche con le lettere, e dice il valore giusto', () => {
    expect(runTool({ name: 'controlla', args: { uguaglianza: '(x + 1)^2 = x^2 + 2x + 1' } }, sheet)).toBe('Giusta.')
    expect(runTool({ name: 'controlla', args: { uguaglianza: '(x + 1)^2 = x^2 + x + 1' } }, sheet)).toMatch(/^Sbagliata/)
    expect(runTool({ name: 'controlla', args: { uguaglianza: r`\int_0^1 x^2 \, dx = \frac{1}{2}` } }, sheet)).toBe(r`Sbagliata: il valore giusto è \frac{1}{3}.`)
    // «calcola» con un'uguaglianza la controlla.
    expect(runTool({ name: 'calcola', args: { espressione: '2 + 2 = 5' } }, sheet)).toBe('Sbagliata: il valore giusto è 4.')
  })

  it('uno strumento che non c\'è o un conto che Glifo non sa fare: lo dice, senza fermarsi', () => {
    expect(runTool({ name: 'integra', args: {} }, sheet)).toMatch(/non c'è: usa calcola, controlla, deriva, primitiva, risolvi/)
    expect(runTool({ name: 'calcola', args: { espressione: r`\text{boh}` } }, sheet)).toMatch(/^Glifo non sa fare questo conto/)
  })

  it('gli strumenti nel formato dei Qwen3, nel messaggio di sistema', () => {
    const tools = toolsPrompt()
    expect(tools).toContain('<tools>')
    expect(tools).toContain('<tool_call>')
    for (const name of ['calcola', 'controlla', 'deriva', 'primitiva', 'risolvi']) expect(tools).toContain(`"name":"${name}"`)
    const system = systemPrompt('semplice')
    expect(system).toContain('come a un compagno di corso')
    expect(system).toContain(tools)
    expect(systemPrompt('professore')).toContain('professore universitario')
  })

  it('legge le chiamate del modello, anche con le barre semplici del LaTeX e senza il tag che chiude', () => {
    expect(toolCallsIn('<tool_call>\n{"name": "primitiva", "arguments": {"funzione": "\\\\frac{1}{x}", "variabile": "x"}}\n</tool_call>')).toEqual([{ name: 'primitiva', args: { funzione: r`\frac{1}{x}`, variabile: 'x' } }])
    // \f, \t, \n, \r, \b sono anche sequenze del JSON: si rimette la barra.
    const loose = '<tool_call>{"name": "calcola", "arguments": {"espressione": "\\frac{\\theta}{\\nabla} + \\int \\right \\beta"}}'
    expect(toolCallsIn(loose)).toEqual([{ name: 'calcola', args: { espressione: r`\frac{\theta}{\nabla} + \int \right \beta` } }])
    // Gli argomenti come stringa JSON, e due chiamate di seguito.
    const two = '<tool_call>{"name": "deriva", "arguments": "{\\"funzione\\": \\"x^3\\"}"}</tool_call>\n<tool_call>{"name": "risolvi", "arguments": {"equazione": "x = 1"}}</tool_call>'
    expect(toolCallsIn(two)).toEqual([
      { name: 'deriva', args: { funzione: 'x^3' } },
      { name: 'risolvi', args: { equazione: 'x = 1' } },
    ])
    expect(toolCallsIn('Nessuna chiamata qui. <tool_call>non è JSON</tool_call>')).toEqual([])
  })
})

describe('i passaggi scritti dal modello', () => {
  it('«1. frase $$formula$$», anche con **1.**, Passo 1:, \\[…\\] o la formula in linea', () => {
    expect(stepsIn(SPHERE_STEPS)).toEqual([
      { text: r`Porto fuori $\pi$, che è una costante.`, formula: r`\int_{-R}^{R} \pi (R^2 - x^2) \, dx = \pi \int_{-R}^{R} (R^2 - x^2) \, dx` },
      { text: 'Trovo una primitiva', formula: r`\int (R^2 - x^2) \, dx = R^2 x - \frac{x^3}{3} + c` },
      { text: 'Sostituisco gli estremi', formula: r`\pi \left[R^2 x - \frac{x^3}{3}\right]_{-R}^{R} = \pi \left(\frac{2R^3}{3} + \frac{2R^3}{3}\right)` },
      { text: 'Quindi il volume è', formula: r`\pi \cdot \frac{4R^3}{3} = \frac{4\pi R^3}{3}` },
    ])
    expect(stepsIn('**1.** Derivo: $$f\'(x) = 2x$$\nPasso 2: valuto in 1. $$f\'(1) = 2$$')).toEqual([
      { text: 'Derivo', formula: "f'(x) = 2x" },
      { text: 'valuto in 1.', formula: "f'(1) = 2" },
    ])
    // Una formula su più righe e senza numeri: i paragrafi.
    expect(stepsIn('Primo passaggio:\n$$a = \n1 + 1$$\n\nSecondo: $$b = 2$$')).toEqual([
      { text: 'Primo passaggio', formula: 'a = \n1 + 1' },
      { text: 'Secondo', formula: 'b = 2' },
    ])
  })

  it('le chiamate agli strumenti, il ragionamento e l\'HTML non finiscono nei passaggi; 1.5 non è un passaggio', () => {
    const reply = '<think>\nragiono\n</think>\n1. Calcolo <b>bene</b>: $$1.5 + 1 = 2.5$$\n1.5 è un numero.\n<tool_call>{"name": "calcola", "arguments": {}}</tool_call>'
    expect(stepsIn(reply)).toEqual([{ text: 'Calcolo bene: 1.5 è un numero.', formula: '1.5 + 1 = 2.5' }])
  })

  it('Glifo controlla ogni passaggio e che l\'ultimo arrivi al suo risultato', () => {
    const { steps, reaches } = checkSteps(stepsIn(SPHERE_STEPS), target(SPHERE), sheet)
    expect(steps.map((s) => s.check)).toEqual([{ ok: true }, { ok: true }, { ok: true }, { ok: true }])
    expect(reaches).toBe(true)
  })

  it('un passaggio sbagliato ha il ✗ con il valore giusto; uno con lettere nuove (u = x²) non si giudica', () => {
    const raw = stepsIn(r`1. Primitiva: $$\int (R^2 - x^2) \, dx = R^2 x - \frac{x^3}{2}$$
2. Estremi: $$\pi \left[R^2 x - \frac{x^3}{3}\right]_{-R}^{R} = \frac{2\pi R^3}{3}$$
3. Pongo $u = x^2$: $$\sin u + c = \sin(x^2) + c$$
4. Una frase senza formula.`)
    const result = checkSteps(raw, target(SPHERE), sheet)
    expect(result.steps.map((s) => s.check && (s.check.ok ? '✓' : `✗ ${s.check.value?.text ?? ''}`.trim()))).toEqual(['✗ R²x − x³/3 + c', '✗', null, null])
    expect(result.reaches).toBe(false)
    const note = feedback(result, target(SPHERE))!
    expect(note).toContain(r`Il passaggio 1 è sbagliato: Glifo calcola $R^{2}x - \frac{x^{3}}{3} + c$`)
    expect(note).toContain('Il passaggio 2 è sbagliato.')
    expect(note).toContain(r`L'ultimo passaggio non arriva al risultato di Glifo, $\frac{4\pi R^{3}}{3}$.`)
  })

  it('nelle equazioni: i passaggi con le lettere solo ✓, e le soluzioni in qualsiasi ordine', () => {
    const t = target(r`x^2 - 5x + 6 = 0 \Rightarrow`)
    const raw = stepsIn(r`1. Scompongo: $$x^2 - 5x + 6 = (x - 2)(x - 3)$$
2. Uguaglio a zero: $$(x - 2)(x - 3) = 0$$
3. Le soluzioni: $$x_1 = 3, \quad x_2 = 2$$`)
    const result = checkSteps(raw, t, sheet)
    expect(result.steps.map((s) => s.check)).toEqual([{ ok: true }, null, null])
    expect(result.reaches).toBe(true)
    expect(checkSteps(stepsIn('1. Le soluzioni: $$x = 1 \\lor x = 6$$'), t, sheet).reaches).toBe(false)
  })

  it('checkFormula: il nome davanti si toglie, e «soft» non dice mai ✗', () => {
    expect(checkFormula(r`V = \pi \cdot 2 = 2\pi`, sheet)).toEqual({ ok: true })
    expect(checkFormula('(x + 1)^2 = x^2 + 1', sheet, null, 'soft')).toBeNull()
    expect(checkFormula('(x + 1)^2 = x^2 + 1', sheet, null, 'strict')).toEqual({ ok: false })
  })
})

describe('il giro tra il modello e il motore', () => {
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

  it('il modello chiede un conto al motore, sbaglia un passaggio, Glifo glielo fa correggere', async () => {
    const t = target(SPHERE)
    const { chat, seen } = scripted(
      '<tool_call>\n{"name": "primitiva", "arguments": {"funzione": "R^2 - x^2", "variabile": "x"}}\n</tool_call>',
      r`1. Porto fuori $\pi$: $$\int_{-R}^{R} \pi (R^2 - x^2) \, dx = \pi \int_{-R}^{R} (R^2 - x^2) \, dx$$
2. Sostituisco gli estremi: $$\pi \left[R^2 x - \frac{x^3}{3}\right]_{-R}^{R} = \frac{2\pi R^3}{3}$$`,
      r`1. Porto fuori $\pi$: $$\int_{-R}^{R} \pi (R^2 - x^2) \, dx = \pi \int_{-R}^{R} (R^2 - x^2) \, dx$$
2. Sostituisco gli estremi: $$\pi \left[R^2 x - \frac{x^3}{3}\right]_{-R}^{R} = \frac{4\pi R^3}{3}$$`,
    )
    const tools: string[] = []
    const statuses: string[] = []
    const result = await explain(t, 'professore', chat, { onTool: (_, response) => tools.push(response), onStatus: (s) => statuses.push(s) })
    expect(tools).toEqual([r`\int \left(R^2 - x^2\right) \, dx = R^{2}x - \frac{x^{3}}{3} + c`])
    expect(result.steps.map((s) => s.check?.ok)).toEqual([true, true])
    expect(result).toMatchObject({ reaches: true, toolCalls: 1, corrections: 1 })
    expect(statuses).toEqual(['writing', 'tool', 'writing', 'correcting'])
    // Il primo messaggio: la formula, il risultato di Glifo e la primitiva che il motore sa già.
    expect(seen[0][0].role).toBe('system')
    expect(seen[0][1].content).toBe(questionPrompt(t, engineHints(t, sheet)))
    expect(seen[0][1].content).toContain(r`Risultato di Glifo: $$\frac{4\pi R^{3}}{3}$$`)
    expect(seen[0][1].content).toContain(r`Dal motore di Glifo: $$\int \left(\pi(R^{2} - x^{2})\right) \, dx = \pi\left(R^{2}x - \frac{x^{3}}{3}\right) + c$$`)
    // La risposta dello strumento torna come la vogliono i Qwen3.
    expect(seen[1].at(-1)).toEqual({ role: 'user', content: `<tool_response>\n${tools[0]}\n</tool_response>` })
    expect(seen[2].at(-1)!.content).toContain('Il passaggio 2 è sbagliato')
  })

  it('se il modello non scrive i passaggi, glielo ricorda una volta e poi si ferma con un errore chiaro', async () => {
    const { chat, seen } = scripted('Non so.', 'Davvero non so.')
    await expect(explain(target(SPHERE), 'semplice', chat)).rejects.toThrow(ExplainError)
    expect(seen).toHaveLength(2)
    expect(seen[1].at(-1)!.content).toMatch(/^Ora scrivi la spiegazione nel formato richiesto/)
  })

  it('tiene la spiegazione con meno passaggi sbagliati, anche se la correzione va peggio', async () => {
    const { chat } = scripted('1. Il risultato: $$\\int_0^1 x^2 \\, dx = \\frac{1}{2}$$', '1. Il risultato: $$\\int_0^1 x^2 \\, dx = 1$$\n2. Ancora: $$1 = 2$$', '1. Niente.', 'Niente.')
    const result = await explain(target(r`\int_0^1 x^2 \, dx =`), 'professore', chat)
    expect(result.steps).toHaveLength(1)
    expect(result.steps[0].check).toEqual({ ok: false, value: { tex: r`\frac{1}{3}`, text: '1/3' } })
  })
})
