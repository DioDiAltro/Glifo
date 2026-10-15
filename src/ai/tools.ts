/**
 * Il motore di Glifo come strumenti per il modello delle spiegazioni (src/ai/explain.ts): il modello
 * chiede un conto (un integrale, una derivata, una primitiva, un'equazione) e Glifo glielo fa, con il
 * foglio della nota (src/math/sheet.ts) e le sue definizioni. «Il testo lo scrive l'AI, i conti li firma
 * Glifo» (ABBONAMENTI.md, «Le spiegazioni, come funzionano»).
 *
 * Le chiamate sono nel formato dei Qwen3, quello con cui sono stati addestrati: gli strumenti descritti
 * dentro <tools></tools> nel messaggio di sistema, le chiamate come JSON dentro <tool_call></tool_call>
 * e le risposte dentro <tool_response></tool_response>, in un messaggio dell'utente. WebLLM le fa da
 * solo solo per i modelli Hermes: qui si leggono dal testo. Si leggono anche le chiamate dei Qwen3.5,
 * addestrati a scriverle con <function=…> e <parameter=…> dentro <tool_call>. I modelli che non sanno
 * chiedere i conti (src/ai/localModels.ts) gli strumenti non li vedono.
 *
 * Il modello legge gli strumenti nella lingua di Glifo: con Glifo in inglese sono inglesi i nomi, gli
 * argomenti, le descrizioni e le risposte. `runTool` riconosce i nomi delle due lingue (dentro Glifo si
 * usano quelli italiani, come in `engineHints`, src/ai/explain.ts).
 */
import { pick, texts, type Text } from '../i18n'
import type { FormattedResult } from '../math/format'
import { Sheet, splitEquals } from '../math/sheet'

// Quello che il modello legge: le descrizioni degli strumenti e le risposte del motore.
const T = texts({
  notDone: [
    'Glifo non sa fare questo conto: scrivilo in un altro modo o vai avanti senza.',
    'Glifo can\'t do this calculation: write it another way or go on without it.',
  ],
  calculate: [
    'Calcola con il motore di Glifo un\'espressione in LaTeX: numeri, frazioni, radici, integrali, derivate, limiti, somme, con le definizioni della nota. Restituisce il risultato esatto.',
    'Calculates a LaTeX expression with Glifo\'s engine: numbers, fractions, roots, integrals, derivatives, limits, sums, with the definitions in the note. Returns the exact result.',
  ],
  expression: ['L\'espressione in LaTeX, senza «=» in fondo. Esempio: \\int_0^1 x^2 \\, dx', 'The expression in LaTeX, without “=” at the end. Example: \\int_0^1 x^2 \\, dx'],
  noExpression: ['Manca l\'espressione.', 'The expression is missing.'],
  derivative: ['Calcola con il motore di Glifo la derivata di una funzione.', 'Calculates the derivative of a function with Glifo\'s engine.'],
  derivativeFunction: ['La funzione in LaTeX. Esempio: x^2 \\sin x', 'The function in LaTeX. Example: x^2 \\sin x'],
  variable: ['La variabile, di solito x.', 'The variable, usually x.'],
  noFunction: ['Manca la funzione.', 'The function is missing.'],
  antiderivative: [
    'Trova con il motore di Glifo una primitiva (l\'integrale indefinito) di una funzione.',
    'Finds an antiderivative (the indefinite integral) of a function with Glifo\'s engine.',
  ],
  integrand: ['La funzione da integrare, in LaTeX. Esempio: R^2 - x^2', 'The function to integrate, in LaTeX. Example: R^2 - x^2'],
  solve: ['Risolve con il motore di Glifo un\'equazione, una disequazione o un sistema.', 'Solves an equation, an inequality or a system with Glifo\'s engine.'],
  equation: ['L\'equazione in LaTeX. Esempio: x^2 - 5x + 6 = 0', 'The equation in LaTeX. Example: x^2 - 5x + 6 = 0'],
  noEquation: ['Manca l\'equazione.', 'The equation is missing.'],
  check: [
    'Controlla con il motore di Glifo se un\'uguaglianza in LaTeX è giusta, anche con le lettere (per esempio un passaggio di un conto).',
    'Checks with Glifo\'s engine whether an equality in LaTeX is correct, even with letters (for example a step of a calculation).',
  ],
  equality: ['L\'uguaglianza in LaTeX. Esempio: (x + 1)^2 = x^2 + 2x + 1', 'The equality in LaTeX. Example: (x + 1)^2 = x^2 + 2x + 1'],
  needsEquality: ['Serve un\'uguaglianza, con «=».', 'This needs an equality, with “=”.'],
  cantCheck: ['Glifo non riesce a controllarla: vai avanti senza.', 'Glifo can\'t check it: go on without it.'],
  rightRounded: ['Giusta, con le cifre arrotondate.', 'Correct, with the digits rounded.'],
  right: ['Giusta.', 'Correct.'],
  wrongValue: (value: string) => [`Sbagliata: il valore giusto è ${value}.`, `Wrong: the correct value is ${value}.`],
  wrongSides: [
    'Sbagliata: le due parti non valgono lo stesso (se è un\'equazione da risolvere, usa risolvi).',
    'Wrong: the two sides are not equal (if it is an equation to solve, use solve).',
  ],
  noTool: (name: string, names: string) => [`Lo strumento «${name}» non c'è: usa ${names}.`, `There is no tool “${name}”: use ${names}.`],
})

/** Un foglio nuovo con le definizioni della nota: ogni chiamata parte da lì e non ne cambia altre. */
export type SheetFactory = () => Sheet

export interface ToolCall {
  name: string
  args: Record<string, string>
}

/** Uno strumento: i nomi sono [italiano, inglese], e `run` legge gli argomenti con il nome italiano. */
interface Tool {
  name: Text
  readonly description: string
  params: { name: Text; readonly description: string }[]
  run(args: Record<string, string>, sheet: SheetFactory): string
}

/** Toglie i delimitatori ($…$, \[…\]) e l'«=» in fondo che il modello a volte lascia. */
export function bareTex(src: string): string {
  let t = src.trim()
  for (const [open, close] of [
    ['$$', '$$'],
    ['\\[', '\\]'],
    ['\\(', '\\)'],
    ['$', '$'],
  ]) {
    if (t.startsWith(open) && t.endsWith(close) && t.length >= open.length + close.length) {
      t = t.slice(open.length, t.length - close.length).trim()
      break
    }
  }
  return t.replace(/(?:=|\\Rightarrow|⇒)\s*$/, '').trim()
}

/** Il risultato di una formula che finisce con «=» (o con ⇒), come lo scrive Glifo. */
function resultOf(tex: string, sheet: SheetFactory): FormattedResult | null {
  try {
    return sheet().read(tex).result
  } catch {
    return null
  }
}

/** La risposta di «controlla»: anche per i passaggi delle spiegazioni (vedi `checkFormula`). */
export type FormulaCheck = { ok: true; rounded?: boolean } | { ok: false; value?: { tex: string; text: string } } | null

/**
 * Come si confrontano le parti di un passaggio con le lettere: «strict» dice anche ✗, «soft» solo ✓
 * (nelle equazioni x^2 - 5x + 6 = 0 le due parti non sono uguali per ogni x, e va bene così), «off» no.
 */
export type Identities = 'strict' | 'soft' | 'off'

/**
 * Un'uguaglianza a = b = c è giusta? Prima come nella nota (`Sheet.read`: la prima parte che Glifo sa
 * calcolare e le altre, con le primitive e i decimali arrotondati), poi parte con parte con le lettere
 * (`Sheet.same`), secondo `identities`. Il nome davanti (V = …) si toglie. Null se non si sa.
 */
export function checkFormula(tex: string, sheet: SheetFactory, variable: string | null = null, identities: Identities = 'strict'): FormulaCheck {
  let parts = splitEquals(tex)
    .map((p) => p.trim())
    .filter(Boolean)
  if (parts.length < 2) return null
  try {
    const check = sheet().read(tex).check
    // Una formula che Glifo non legge (\frac{d}{dx} x^2, senza parentesi) non si controlla: nella nota il ✗ ha
    // il motivo, qui resta come prima.
    if (check?.error) return null
    if (check) return check.ok ? { ok: true, ...(check.rounded && { rounded: true }) } : { ok: false, ...(check.value && { value: check.value }) }
  } catch {
    // Si prova parte con parte.
  }
  if (identities === 'off') return null
  if (nameLike(parts[0])) parts = parts.slice(1)
  if (parts.length < 2) return null
  const s = sheet()
  let all = true
  for (let i = 0; i + 1 < parts.length; i++) {
    const same = s.same(parts[i], parts[i + 1], variable)
    if (same === false) {
      if (identities !== 'strict') return null
      // Il valore giusto, se Glifo sa calcolare la parte prima.
      const value = resultOf(`${parts[i]} =`, sheet)
      return { ok: false, ...(value && { value }) }
    }
    if (same === null) all = false
  }
  return all ? { ok: true } : null
}

/** V, x_1, f(x), V_{sfera}: un nome che si sta definendo, non un conto. */
export function nameLike(src: string): boolean {
  return /^\s*(?:[A-Za-z]|\\[A-Za-z]+)(?:_(?:\{[^{}]*\}|\w))?(?:'*)?(?:\s*\((?:\s*[A-Za-z](?:\s*,\s*[A-Za-z])*\s*)\))?\s*$/.test(src)
}

const TOOLS: readonly Tool[] = [
  {
    name: ['calcola', 'calculate'],
    get description() { return T.calculate },
    params: [{ name: ['espressione', 'expression'], get description() { return T.expression } }],
    run: (a, sheet) => {
      const tex = bareTex(a.espressione ?? '')
      if (!tex) return T.noExpression
      if (splitEquals(tex).length > 1) return checkTool.run({ uguaglianza: tex }, sheet)
      const result = resultOf(`${tex} =`, sheet)
      return result ? `${tex} = ${result.tex}` : T.notDone
    },
  },
  {
    name: ['deriva', 'derivative'],
    get description() { return T.derivative },
    params: [
      { name: ['funzione', 'function'], get description() { return T.derivativeFunction } },
      { name: ['variabile', 'variable'], get description() { return T.variable } },
    ],
    run: (a, sheet) => {
      const f = bareTex(a.funzione ?? '')
      const v = variableOf(a.variabile)
      if (!f) return T.noFunction
      const result = resultOf(`\\frac{d}{d${v}}\\left(${f}\\right) =`, sheet)
      return result ? `\\frac{d}{d${v}}\\left(${f}\\right) = ${result.tex}` : T.notDone
    },
  },
  {
    name: ['primitiva', 'antiderivative'],
    get description() { return T.antiderivative },
    params: [
      { name: ['funzione', 'function'], get description() { return T.integrand } },
      { name: ['variabile', 'variable'], get description() { return T.variable } },
    ],
    run: (a, sheet) => {
      const f = bareTex(a.funzione ?? '')
      const v = variableOf(a.variabile)
      if (!f) return T.noFunction
      const result = resultOf(`\\int ${withParens(f)} \\, d${v} =`, sheet)
      return result ? `\\int ${withParens(f)} \\, d${v} = ${result.tex}` : T.notDone
    },
  },
  {
    name: ['risolvi', 'solve'],
    get description() { return T.solve },
    params: [{ name: ['equazione', 'equation'], get description() { return T.equation } }],
    run: (a, sheet) => {
      const tex = bareTex(a.equazione ?? '')
      if (!tex) return T.noEquation
      const result = resultOf(`${tex} \\Rightarrow`, sheet)
      return result ? `${tex} \\Rightarrow ${result.tex}` : T.notDone
    },
  },
]

/** «controlla»: separato perché anche «calcola» ci passa, quando riceve un'uguaglianza. */
const checkTool: Tool = {
  name: ['controlla', 'check'],
  get description() { return T.check },
  params: [{ name: ['uguaglianza', 'equality'], get description() { return T.equality } }],
  run: (a, sheet) => {
    const tex = bareTex(a.uguaglianza ?? '')
    if (splitEquals(tex).length < 2) return T.needsEquality
    const check = checkFormula(tex, sheet)
    if (!check) return T.cantCheck
    if (check.ok) return check.rounded ? T.rightRounded : T.right
    return check.value ? T.wrongValue(check.value.tex) : T.wrongSides
  },
}

const ALL_TOOLS: readonly Tool[] = [TOOLS[0], checkTool, ...TOOLS.slice(1)]

function variableOf(v: string | undefined): string {
  const m = /^\s*([A-Za-z])\s*$/.exec(v ?? '')
  return m ? m[1] : 'x'
}

/** Una funzione da integrare: tra parentesi se è una somma, perché il dx valga per tutta. */
function withParens(f: string): string {
  return /[+-]/.test(f.replace(/^\s*-/, '')) && !/^\(.*\)$/.test(f.trim()) ? `\\left(${f}\\right)` : f
}

/** Gli strumenti nel messaggio di sistema, con le parole del modello dei Qwen3 (in inglese, come li ha imparati). */
export function toolsPrompt(): string {
  const specs = ALL_TOOLS.map((t) =>
    JSON.stringify({
      type: 'function',
      function: {
        name: pick(t.name),
        description: t.description,
        parameters: {
          type: 'object',
          properties: Object.fromEntries(t.params.map((p) => [pick(p.name), { type: 'string', description: p.description }])),
          required: t.params.map((p) => pick(p.name)),
        },
      },
    }),
  )
  return [
    '# Tools',
    '',
    'You may call one or more functions to assist with the user query.',
    '',
    'You are provided with function signatures within <tools></tools> XML tags:',
    '<tools>',
    ...specs,
    '</tools>',
    '',
    'For each function call, return a json object with function name and arguments within <tool_call></tool_call> XML tags:',
    '<tool_call>',
    '{"name": <function-name>, "arguments": <args-json-object>}',
    '</tool_call>',
  ].join('\n')
}

/**
 * Fa la chiamata con il motore e restituisce la risposta per il modello. Lo strumento e gli argomenti si
 * riconoscono con il nome italiano o con quello inglese; se lo strumento non c'è, la risposta dice i nomi
 * nella lingua di Glifo (quelli che il modello ha letto).
 */
export function runTool(call: ToolCall, sheet: SheetFactory): string {
  const tool = ALL_TOOLS.find((t) => t.name.includes(call.name))
  if (!tool) return T.noTool(call.name, ALL_TOOLS.map((t) => pick(t.name)).join(', '))
  const args = Object.fromEntries(Object.entries(call.args).map(([k, v]) => [tool.params.find((p) => p.name.includes(k))?.name[0] ?? k, v]))
  try {
    return tool.run(args, sheet)
  } catch {
    return T.notDone
  }
}

/** Le risposte degli strumenti, come le vuole il modello dei Qwen3. */
export function toolResponses(responses: string[]): string {
  return responses.map((r) => `<tool_response>\n${r}\n</tool_response>`).join('\n')
}

/**
 * Le chiamate nel testo del modello: <tool_call>{"name": …, "arguments": {…}}</tool_call>, anche senza
 * il tag che chiude (il testo è finito lì). Il LaTeX dentro il JSON spesso ha le barre semplici
 * (\frac): si aggiustano, sia quelle che il JSON non accetta (\int) sia quelle che legge come altro
 * (\f, \t, \n, \r, \b). Anche nel formato dei Qwen3.5: <tool_call><function=calcola><parameter=espressione>
 * \int_0^1 x^2 \, dx</parameter></function></tool_call>, dove il LaTeX resta com'è.
 */
export function toolCallsIn(text: string): ToolCall[] {
  const calls: ToolCall[] = []
  for (const m of text.matchAll(/<tool_call>([\s\S]*?)(?:<\/tool_call>|$)/g)) {
    const call = callOf(m[1])
    if (call) calls.push(call)
  }
  return calls
}

/** Il testo prima della prima chiamata (quello che il modello ha scritto mentre chiamava gli strumenti). */
export function withoutToolCalls(text: string): string {
  return text.replace(/<tool_call>[\s\S]*?(?:<\/tool_call>|$)/g, '').trim()
}

function callOf(src: string): ToolCall | null {
  const fn = /<function=([^>\s]+)\s*>([\s\S]*?)(?:<\/function>|$)/.exec(src)
  if (fn) {
    const args: Record<string, string> = {}
    for (const p of fn[2].matchAll(/<parameter=([^>\s]+)\s*>([\s\S]*?)(?:<\/parameter>|$)/g)) args[p[1]] = p[2].trim()
    return { name: fn[1].trim(), args }
  }
  const start = src.indexOf('{')
  const end = src.lastIndexOf('}')
  if (start < 0 || end <= start) return null
  const value = looseJson(src.slice(start, end + 1))
  if (!value || typeof value !== 'object') return null
  const { name, arguments: raw } = value as { name?: unknown; arguments?: unknown }
  if (typeof name !== 'string') return null
  const args = typeof raw === 'string' ? looseJson(raw) : raw
  const out: Record<string, string> = {}
  if (args && typeof args === 'object') {
    for (const [k, v] of Object.entries(args as Record<string, unknown>)) {
      if (typeof v === 'string' || typeof v === 'number') out[k] = repairTex(String(v))
    }
  }
  return { name: name.trim(), args: out }
}

/** JSON.parse con le barre del LaTeX aggiustate; null se non si legge. */
function looseJson(src: string): unknown {
  try {
    // Le coppie che il JSON conosce (\\, \", \n, \u con quattro cifre esadecimali…) restano; una barra sola davanti ad altro si raddoppia.
    return JSON.parse(src.replace(/\\(["\\/bfnrt]|u[0-9a-fA-F]{4})|\\/g, (m, pair: string | undefined) => (pair === undefined ? '\\\\' : m)))
  } catch {
    return null
  }
}

/** \frac letta dal JSON come «avanzamento pagina» + rac: si rimette la barra. */
function repairTex(s: string): string {
  return s.replace(/\f/g, '\\f').replace(/\t/g, '\\t').replace(/\r/g, '\\r').replace(/\x08/g, '\\b').replace(/\n(?=[a-zA-Z])/g, '\\n')
}
