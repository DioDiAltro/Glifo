/**
 * «Spiegami»: i passaggi di un conto della nota, scritti da un modello AI e controllati dal motore di
 * Glifo (ABBONAMENTI.md, «Le spiegazioni, come funzionano»). Per ora (prova sul ramo `prova`, 7 ottobre
 * 2026) con un Qwen3 piccolo che gira nel browser (src/ai/local.ts):
 *
 * 1. Glifo manda al modello la formula, il risultato che ha già calcolato, le definizioni della nota e
 *    quello che il motore sa già dire (la primitiva della funzione da integrare);
 * 2. il modello può chiedere conti al motore (gli strumenti di src/ai/tools.ts) e poi scrive i passaggi,
 *    «1. frase $$formula$$»;
 * 3. Glifo controlla ogni passaggio (✓, ✗ con il valore giusto, o niente se non si sa controllare) e che
 *    l'ultimo arrivi al suo risultato; se qualcosa non torna lo dice al modello, che riscrive.
 *
 * Un modello piccolo sbaglia più di uno grande: per questo i conti li firma Glifo, e i passaggi che non
 * tornano si vedono con il ✗.
 */
import type { FormattedResult } from '../math/format'
import { toLatex } from '../math/latex'
import { children, namesIn, parseMath, type MathNode } from '../math/parse'
import { calculationRequest, Sheet, solveRequest, splitEquals, splitPieces } from '../math/sheet'
import type { ChatMessage } from './localModels'
import { checkFormula, nameLike, runTool, toolCallsIn, toolResponses, toolsPrompt, withoutToolCalls, type FormulaCheck, type SheetFactory, type ToolCall } from './tools'

export type ExplainTone = 'professore' | 'semplice'

export const EXPLAIN_TONES: { id: ExplainTone; label: string }[] = [
  { id: 'professore', label: 'Come il professore' },
  { id: 'semplice', label: 'Più semplice' },
]

/** Il conto da spiegare: un risultato dopo «=», un risultato scritto (giusto o sbagliato) o le soluzioni dopo ⇒. */
export type ExplainKind = 'calc' | 'check' | 'solve'

export interface ExplainTarget {
  /** La formula come è nella nota, senza i $. */
  tex: string
  kind: ExplainKind
  /** La parte da calcolare (o l'equazione da risolvere). */
  question: string
  /** Il risultato di Glifo: il valore giusto anche quando quello scritto è sbagliato. */
  answer: FormattedResult
  /** Il risultato scritto nella nota, quando c'è. */
  written?: { tex: string; ok: boolean }
  /** Le definizioni della nota che la formula usa (a = 2, f(x) = x^2): il foglio degli strumenti parte da qui. */
  defs: string[]
}

/**
 * Una cosa della nota da spiegare che non è un conto (il pannello «Spiega con l'AI», src/ui/aiPanel.ts):
 * qui non c'è un risultato a cui arrivare, ma Glifo controlla le formule che il modello scrive.
 */
export type TopicKind = 'grafico' | 'formula' | 'teorema' | 'schema' | 'tabella'

export interface ExplainTopic {
  kind: TopicKind
  /** In cima alla spiegazione: una formula (LaTeX) o un testo. */
  title: { tex: string } | { text: string }
  /** Quello che il modello legge della nota: il blocco, la formula, il testo. */
  content: string
  /** Quello che Glifo ha già calcolato (lo studio di una funzione, un'area…), un fatto per riga. */
  facts: string[]
  /** Le definizioni per gli strumenti e per controllare le formule: quelle della nota e le funzioni del grafico. */
  defs: string[]
}

export interface ExplainStep {
  /** La frase, con le formule in linea tra $. */
  text: string
  /** La formula del passaggio, senza i $; null se il passaggio è solo una frase. */
  formula: string | null
  /** Il controllo di Glifo: null se il passaggio non si sa controllare. */
  check: FormulaCheck
}

export interface Explanation {
  steps: ExplainStep[]
  /** L'ultimo passaggio arriva al risultato di Glifo? null se non si sa. */
  reaches: boolean | null
  /** Le volte che il modello ha chiesto un conto al motore, e quelle in cui Glifo gli ha fatto correggere i passaggi. */
  toolCalls: number
  corrections: number
}

export interface ExplainEvents {
  /** Cosa sta facendo: scrive, chiede un conto al motore, corregge i passaggi che Glifo ha segnato. */
  onStatus?(status: 'writing' | 'tool' | 'correcting'): void
  /** Il testo che il modello sta scrivendo, un pezzo alla volta. */
  onDelta?(text: string): void
  onTool?(call: ToolCall, response: string): void
}

/** Una risposta del modello alla conversazione fin qui (`onDelta`: il testo mentre arriva). */
export type ChatFn = (messages: ChatMessage[], onDelta?: (text: string) => void) => Promise<string>

export class ExplainError extends Error {}

/** Giri con gli strumenti e correzioni al massimo: il contesto dei modelli nel browser è di 4096 token. */
const MAX_TOOL_ROUNDS = 3
const MAX_CORRECTIONS = 2
const MAX_STEPS = 8
/** Una stima per eccesso dei token della conversazione (i caratteri / 2,8) e quanti ne restano per la risposta. */
const CONTEXT_TOKENS = 4096
export const REPLY_TOKENS = 900

/**
 * Cosa c'è da spiegare nella formula (`sheet`: il foglio con le definizioni scritte prima nella nota);
 * null se Glifo non ha un risultato per lei (una definizione, un'equazione senza ⇒, un testo).
 */
export function explainTarget(tex: string, sheet: Sheet, defs: string[]): ExplainTarget | null {
  let line
  try {
    line = sheet.read(tex)
  } catch {
    return null
  }
  const solve = solveRequest(tex)
  if (line.result && solve !== null) return { tex, kind: 'solve', question: solve.trim(), answer: line.result, defs }
  const calc = calculationRequest(tex)
  if (line.result && calc !== null) return { tex, kind: 'calc', question: calc.trim(), answer: line.result, defs }
  if (!line.check) return null
  let parts = splitEquals(tex)
    .map((p) => p.trim())
    .filter(Boolean)
  // V = \int … = \frac{4}{3}\pi R^3: il nome davanti non è il conto.
  if (parts.length > 2 && nameLike(parts[0])) parts = parts.slice(1)
  if (parts.length < 2) return null
  const last = parts[parts.length - 1]
  const answer = line.check.ok ? { tex: last, text: last } : line.check.value
  if (!answer) return null
  return { tex, kind: 'check', question: parts[0], answer, written: { tex: last, ok: line.check.ok }, defs }
}

const TONES: Record<ExplainTone, string> = {
  professore: 'Scrivi come un professore universitario: preciso, con i nomi delle regole e dei teoremi che usi.',
  semplice: 'Scrivi in modo semplice, come a un compagno di corso: frasi brevi, e il perché di ogni passaggio.',
}

export function systemPrompt(tone: ExplainTone): string {
  return [
    'Sei il tutor di Glifo, l\'app per prendere appunti di matematica. Spieghi in italiano, passo per passo, come si arriva al risultato di una formula che lo studente ha scritto nella nota.',
    TONES[tone],
    '',
    'Regole:',
    '- I conti li fa il motore di Glifo, che non sbaglia: non fare conti a mente. Per un integrale, una derivata, una primitiva, un\'equazione o una semplificazione usa gli strumenti.',
    '- Glifo controlla ogni passaggio che scrivi e ti fa correggere quelli sbagliati.',
    // Un esempio vero, non uno schema da riempire: il 7 ottobre 2026 Qwen3 copiava «Una frase breve:» in
    // ogni passaggio. È una derivata, così sugli integrali non copia il contenuto.
    '- Quando hai i conti, scrivi solo la spiegazione: un elenco numerato, un passaggio per riga, con una frase (cosa fai e perché, con il nome giusto della regola) e poi la formula tra $$. Esempio di riga:',
    '1. Per la regola del prodotto derivo un fattore alla volta. $$\\frac{d}{dx}(x^2 \\sin x) = 2x \\sin x + x^2 \\cos x$$',
    '- Ogni formula è un\'uguaglianza in LaTeX (a = b), senza parole dentro. Da 2 a 6 passaggi: il primo fa già un conto (non ripetere la domanda), l\'ultimo arriva al risultato di Glifo (niente passaggio con il solo risultato).',
    '- Nomi giusti: l\'integrale definito è l\'area con segno sotto la curva e vale F(b) - F(a), con F una primitiva e a, b gli estremi di integrazione (teorema fondamentale del calcolo integrale); la primitiva di x^n è x^{n+1}/(n+1) (regola della potenza); poi linearità, integrazione per parti, per sostituzione; nelle derivate le regole della somma, del prodotto, del quoziente e della catena.',
    '',
    toolsPrompt(),
  ].join('\n')
}

export function questionPrompt(target: ExplainTarget, hints: string[]): string {
  const lines: string[] = []
  if (target.kind === 'solve') {
    lines.push(`Da risolvere: $$${target.question}$$`, `Soluzioni di Glifo: $$${target.answer.tex}$$`)
  } else {
    lines.push(`Formula: $$${target.question}$$`, `Risultato di Glifo: $$${target.answer.tex}$$`)
    if (target.written && !target.written.ok) {
      lines.push(`Lo studente ha scritto $$${target.question} = ${target.written.tex}$$ ma secondo Glifo è sbagliato: spiega come si arriva al risultato giusto.`)
    }
  }
  if (target.defs.length) lines.push(`Definizioni della nota: ${target.defs.map((d) => `$${d}$`).join(', ')}`)
  for (const h of hints) lines.push(`Dal motore di Glifo: $$${h}$$`)
  lines.push(target.kind === 'solve' ? 'Spiegami come si trovano le soluzioni.' : 'Spiegami come si arriva al risultato.')
  return lines.join('\n')
}

/** Un foglio nuovo con le definizioni della nota, per ogni conto: quello che fa uno non cambia gli altri. */
export function sheetFactory(defs: string[]): SheetFactory {
  return () => {
    const sheet = new Sheet()
    for (const d of defs) {
      try {
        sheet.add(d)
      } catch {
        // Una definizione che non si legge non c'è.
      }
    }
    return sheet
  }
}

function parsed(tex: string): MathNode | null {
  try {
    return parseMath(tex)
  } catch {
    return null
  }
}

/** Gli integrali della formula, dal più esterno. */
function integralsIn(node: MathNode | null): Extract<MathNode, { k: 'int' | 'prim' }>[] {
  const out: Extract<MathNode, { k: 'int' | 'prim' }>[] = []
  const visit = (n: MathNode) => {
    if (n.k === 'int' || n.k === 'prim') out.push(n)
    children(n).forEach(visit)
  }
  if (node) visit(node)
  return out
}

/** Quello che il motore sa già dire e che aiuta il modello: la primitiva della funzione di ogni integrale. */
export function engineHints(target: ExplainTarget, sheet: SheetFactory): string[] {
  if (target.kind === 'solve') return []
  const hints: string[] = []
  for (const int of integralsIn(parsed(target.question)).slice(0, 2)) {
    if (int.k === 'prim') continue
    const response = runTool({ name: 'primitiva', args: { funzione: toLatex(int.body), variabile: int.v } }, sheet)
    if (response.startsWith('\\int')) hints.push(response)
  }
  return hints
}

/** I nomi di una formula, lettere e funzioni (anche divisa agli uguali, se intera non si legge). */
export function formulaNames(tex: string): Set<string> {
  const out = new Set<string>()
  const whole = parsed(tex)
  if (whole) return namesIn(whole, out)
  for (const part of splitEquals(tex)) {
    const n = parsed(part)
    if (n) namesIn(n, out)
  }
  return out
}

/** Tutte le lettere della formula, anche le variabili degli integrali, dei limiti e delle derivate (la x di dx). */
function allNames(tex: string): Set<string> {
  const out = formulaNames(tex)
  const visit = (n: MathNode) => {
    const bound = n as { v?: unknown; vars?: unknown }
    if (typeof bound.v === 'string') out.add(bound.v)
    if (Array.isArray(bound.vars)) for (const v of bound.vars) if (typeof v === 'string') out.add(v)
    children(n).forEach(visit)
  }
  const node = parsed(tex)
  if (node) visit(node)
  return out
}

/**
 * I passaggi nel testo del modello: «1. frase $$formula$$» (anche 1), **1.**, Passo 1:, con \[…\] o con
 * la formula in linea). Senza numeri, i paragrafi o le righe con il trattino.
 */
export function stepsIn(reply: string): { text: string; formula: string | null }[] {
  const clean = withoutToolCalls(reply.replace(/<think>[\s\S]*?(?:<\/think>|$)/g, ''))
    .replace(/\r/g, '')
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, f: string) => `$$${f}$$`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, f: string) => `$${f}$`)
  const numbered = /^\s*(?:\*\*)?(?:(?:passo|passaggio)\s*)?\d{1,2}\s*[.):](?:\*\*)?(?:\s+|$)(.*)$/i
  const bullet = /^\s*[-*•]\s+(.*)$/
  const lines = clean.split('\n')
  const start = lines.some((l) => numbered.test(l)) ? numbered : lines.some((l) => bullet.test(l)) ? bullet : null
  const items: string[][] = []
  if (start) {
    let current: string[] | null = null
    for (const line of lines) {
      const m = start.exec(line)
      if (m) items.push((current = [m[1]]))
      else current?.push(line)
    }
  } else {
    items.push(...clean.split(/\n\s*\n/).map((p) => [p]))
  }
  const steps: { text: string; formula: string | null }[] = []
  for (const item of items) {
    const step = stepOf(item.join('\n'))
    if (step && (step.text || step.formula)) steps.push(step)
    if (steps.length >= MAX_STEPS) break
  }
  // «Risultato finale: $1/3$» in fondo, senza un'uguaglianza, ripete solo il risultato.
  while (steps.length > 1 && !steps[steps.length - 1].formula && /^risultato\b/i.test(steps[steps.length - 1].text)) steps.pop()
  return steps
}

function stepOf(item: string): { text: string; formula: string | null } | null {
  let text = item
  let formula: string | null = null
  const display = [...text.matchAll(/\$\$([\s\S]+?)\$\$/g)]
  if (display.length) {
    const last = display[display.length - 1]
    formula = last[1].trim()
    // Le altre formule a blocco restano nella frase, in linea.
    text = text.slice(0, last.index) + text.slice(last.index + last[0].length)
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, f: string) => `$${f.trim()}$`)
  } else {
    // Senza formule a blocco: l'ultima formula in linea con l'uguale.
    const inline = [...text.matchAll(/\$([^$\n]+?)\$/g)].filter((m) => splitEquals(m[1]).length > 1)
    const last = inline[inline.length - 1]
    if (last) {
      formula = last[1].trim()
      text = text.slice(0, last.index) + text.slice(last.index + last[0].length)
    }
  }
  text = text
    .replace(/<[^>]*>/g, '')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    // Lo schema del vecchio messaggio di sistema copiato così com'era (Qwen3, 7 ottobre 2026).
    .replace(/^(?:una\s+)?frase\s+breve(?:\s*:\s*cosa\s+si\s+fa\s+e\s+perché)?\s*[:.]?\s*/i, '')
    // Il punto o i due punti rimasti soli dove c'era la formula: «il volume è .».
    .replace(/\s+[.:]$/, '')
    .replace(/\s*[:,;]$/, '')
  if (formula !== null && !formula) formula = null
  return { text, formula }
}

/** Le soluzioni scritte (x = 2 \lor x = 3; x_1 = 2, \quad x_2 = 3; x = 2 \text{ oppure } x = 3): i valori. */
function solutionsOf(tex: string): string[] {
  const flat = tex.replace(/\\(?:lor|vee|land|wedge)\b|[∨∧]|\\(?:text|mbox|textrm)\{[^{}]*\}/g, ', ')
  const values: string[] = []
  for (const piece of splitPieces(flat)) {
    const parts = splitEquals(piece)
      .map((p) => p.trim())
      .filter(Boolean)
    if (parts.length >= 2 && nameLike(parts[0])) values.push(parts[parts.length - 1])
  }
  return values
}

/** Le stesse soluzioni, in qualsiasi ordine? null se non si sa. */
function sameSolutions(written: string, glifo: string, sheet: SheetFactory): boolean | null {
  const a = solutionsOf(written)
  const b = solutionsOf(glifo)
  if (!a.length || !b.length) return null
  const s = sheet()
  const inside = (xs: string[], ys: string[]) => {
    let known = true
    for (const x of xs) {
      const found = ys.map((y) => s.same(x, y))
      if (found.includes(true)) continue
      if (found.every((f) => f === false)) return false
      known = false
    }
    return known ? true : null
  }
  const ab = inside(a, b)
  const ba = inside(b, a)
  return ab === false || ba === false ? false : ab && ba ? true : null
}

/** Una relazione in una formula: con questa non è un'espressione da sola. */
const RELATION = /[<>≤≥≠≈∈∉⊂⊆⇒⇔]|\\(?:le|ge|leq|geq|lt|gt|neq|ne|approx|in|notin|subset|subseteq|Rightarrow|iff|implies|lor|land|vee|wedge)(?![a-zA-Z])/

/** Un passaggio con un'espressione da sola, senza uguale: il risultato ripetuto («Il risultato finale è: $$\frac{1}{3}$$»). */
function bareResult(s: { formula: string | null }): boolean {
  return !!s.formula && splitEquals(s.formula).length < 2 && !RELATION.test(s.formula)
}

/** I passaggi con il controllo di Glifo e se l'ultimo arriva al risultato. */
export function checkSteps(raw: { text: string; formula: string | null }[], target: ExplainTarget, sheet: SheetFactory): { steps: ExplainStep[]; reaches: boolean | null } {
  // In fondo il solo risultato, senza uguale (Qwen3, 8 ottobre 2026): ripete quello a cui l'ultimo passaggio
  // è già arrivato, come «Risultato finale» senza formula (vedi `stepsIn`), e si toglie. Nelle equazioni no:
  // le soluzioni scritte da sole sono la risposta.
  let kept = raw
  while (target.kind !== 'solve' && kept.length > 1 && bareResult(kept[kept.length - 1]) && kept.slice(0, -1).some((s) => s.formula && !bareResult(s))) kept = kept.slice(0, -1)
  const question = parsed(target.question)
  const variable = integralsIn(question)[0]?.v ?? null
  // Le lettere che la formula e le definizioni usano: un ✗ con altre lettere (u = x^2, c, a, b) non è sicuro.
  const own = allNames(target.question)
  for (const d of target.defs) allNames(d).forEach((n) => own.add(n))
  // Nelle equazioni le parti non sono uguali per ogni x: lì un confronto con le lettere dice solo ✓.
  const identities = target.kind === 'solve' ? 'soft' : 'strict'
  const steps = kept.map((s): ExplainStep => {
    if (!s.formula) return { ...s, check: null }
    let check = checkFormula(s.formula, sheet, variable, identities)
    if (check && !check.ok && [...formulaNames(s.formula)].some((n) => !own.has(n) && !['π', 'e', 'i'].includes(n))) check = null
    return { ...s, check }
  })
  const last = [...steps].reverse().find((s) => s.formula)?.formula ?? null
  let reaches: boolean | null = null
  if (last) {
    if (target.kind === 'solve') reaches = sameSolutions(last, target.answer.tex, sheet)
    else {
      const parts = splitEquals(last)
        .map((p) => p.trim())
        .filter(Boolean)
      const end = parts[parts.length - 1]
      const check = end ? checkFormula(`${target.question} = ${end}`, sheet, variable) : null
      reaches = check ? check.ok : null
    }
  }
  return { steps, reaches }
}

/** Il messaggio per il modello con quello che Glifo ha trovato sbagliato; null se va tutto bene. */
export function feedback(result: { steps: ExplainStep[]; reaches: boolean | null }, target: ExplainTarget): string | null {
  const lines: string[] = []
  result.steps.forEach((s, i) => {
    if (s.check && !s.check.ok) lines.push(`- Il passaggio ${i + 1} è sbagliato${s.check.value ? `: Glifo calcola $${s.check.value.tex}$` : ''}.`)
  })
  if (result.reaches === false) lines.push(`- L'ultimo passaggio non arriva al risultato di Glifo, $${target.answer.tex}$.`)
  if (!lines.length) return null
  return ['Glifo ha controllato i passaggi:', ...lines, 'Correggi e riscrivi tutta la spiegazione nello stesso formato. Se ti serve un conto, usa gli strumenti.'].join('\n')
}

/** Cosa si chiede al modello per ogni tipo di cosa della nota. */
const TOPIC_TASK: Record<TopicKind, string> = {
  grafico: 'cosa mostra un grafico della sua nota: che funzioni ci sono, dove tagliano gli assi, dove crescono e decrescono, massimi e minimi, asintoti, le aree colorate e i punti',
  formula: 'cosa significa una formula della sua nota: cosa sono i simboli, cosa dice e quando si usa',
  teorema: 'un teorema o una definizione della sua nota: cosa dice, le ipotesi, a cosa serve, con un esempio',
  schema: 'uno schema della sua nota: cosa rappresenta, le parti e come sono collegate',
  tabella: 'una tabella della sua nota: cosa contiene, cosa calcolano le formule e cosa dicono i risultati',
}

const TOPIC_HEAD: Record<TopicKind, string> = {
  grafico: 'Il grafico nella nota',
  formula: 'La formula nella nota',
  teorema: 'Dalla nota',
  schema: 'Lo schema nella nota, descritto da Glifo',
  tabella: 'La tabella nella nota, con i valori calcolati da Glifo',
}

const TOPIC_ASK: Record<TopicKind, string> = {
  grafico: 'Spiegami cosa mostra il grafico.',
  formula: 'Spiegami cosa significa questa formula.',
  teorema: 'Spiegami questo enunciato.',
  schema: 'Spiegami cosa rappresenta lo schema.',
  tabella: 'Spiegami cosa calcola la tabella.',
}

/** Quanto della nota si manda al modello: il contesto è di 4096 token. */
const TOPIC_CHARS = 1600

export function topicSystemPrompt(tone: ExplainTone, kind: TopicKind): string {
  // Gli strumenti servono dove ci sono conti da fare (un grafico, una formula); altrove occupano posto.
  const tools = kind === 'grafico' || kind === 'formula'
  return [
    `Sei il tutor di Glifo, l'app per prendere appunti di matematica. Spieghi in italiano allo studente ${TOPIC_TASK[kind]}.`,
    TONES[tone],
    '',
    'Regole:',
    `- I numeri li calcola il motore di Glifo, che non sbaglia: usa i fatti che ti dà Glifo${tools ? ' e, se ti serve un altro conto, gli strumenti' : ''}. Non inventare numeri.`,
    '- Glifo controlla le formule che scrivi.',
    kind === 'schema'
      ? '- Scrivi solo la spiegazione: un elenco numerato, un punto per riga, con una o due frasi. Una formula tra $$ solo se è già nello schema. Da 2 a 6 punti.'
      : '- Scrivi solo la spiegazione: un elenco numerato, un punto per riga. In ogni punto una o due frasi e, quando aiuta, alla fine una formula tra $$: un\'uguaglianza in LaTeX (a = b) senza parole dentro. Da 2 a 6 punti.',
    ...(tools ? ['', toolsPrompt()] : []),
  ].join('\n')
}

export function topicPrompt(topic: ExplainTopic): string {
  const content = topic.content.length > TOPIC_CHARS ? `${topic.content.slice(0, TOPIC_CHARS)}\n…` : topic.content
  const lines = [`${TOPIC_HEAD[topic.kind]}:`, content]
  if (topic.defs.length) lines.push(`Definizioni: ${topic.defs.map((d) => `$${d}$`).join(', ')}`)
  for (const fact of topic.facts) lines.push(`Dal motore di Glifo: ${fact}`)
  lines.push(TOPIC_ASK[topic.kind])
  return lines.join('\n')
}

/**
 * Una formula di un punto: come i passaggi dei conti; in più f(x) = x^2 o f'(x) = 2x, con il nome
 * davanti (che `checkFormula` toglie, perché di solito è una definizione) confrontato con la formula.
 */
function checkTopicFormula(tex: string, sheet: SheetFactory): FormulaCheck {
  const check = checkFormula(tex, sheet, 'x', 'strict')
  if (check) return check
  const parts = splitEquals(tex)
    .map((p) => p.trim())
    .filter(Boolean)
  if (parts.length !== 2 || !/^[A-Za-z]'*\(x\)$/.test(parts[0].replace(/\s+/g, ''))) return null
  const same = sheet().same(parts[0], parts[1], 'x')
  return same === null ? null : same ? { ok: true } : { ok: false }
}

/** I punti con il controllo di Glifo sulle formule; un ✗ con lettere che non sono della nota non è sicuro. */
export function checkTopicSteps(raw: { text: string; formula: string | null }[], topic: ExplainTopic, sheet: SheetFactory): { steps: ExplainStep[]; reaches: null } {
  return checkFormulas(raw, topic.defs, sheet)
}

/** Le formule dei punti (di una spiegazione o di una risposta della chat) con il controllo di Glifo. */
function checkFormulas(raw: { text: string; formula: string | null }[], defs: string[], sheet: SheetFactory): { steps: ExplainStep[]; reaches: null } {
  const own = new Set(['x', 'y'])
  for (const d of defs) allNames(d).forEach((n) => own.add(n))
  const steps = raw.map((s): ExplainStep => {
    if (!s.formula) return { ...s, check: null }
    let check = checkTopicFormula(s.formula, sheet)
    if (check && !check.ok && [...formulaNames(s.formula)].some((n) => !own.has(n) && !['π', 'e', 'i'].includes(n))) check = null
    return { ...s, check }
  })
  return { steps, reaches: null }
}

/** Il messaggio per il modello con le formule che Glifo ha trovato sbagliate; null se va tutto bene. */
export function topicFeedback(result: { steps: ExplainStep[] }, what = 'tutta la spiegazione'): string | null {
  const lines: string[] = []
  result.steps.forEach((s, i) => {
    if (s.check && !s.check.ok) lines.push(`- La formula del punto ${i + 1} è sbagliata${s.check.value ? `: Glifo calcola $${s.check.value.tex}$` : ''}.`)
  })
  if (!lines.length) return null
  return ['Glifo ha controllato le formule:', ...lines, `Correggi e riscrivi ${what} nello stesso formato.`].join('\n')
}

/** Quanti passaggi sbagliati (per tenere la spiegazione migliore tra quelle scritte). */
function wrongs(e: Explanation): number {
  return e.steps.filter((s) => s.check && !s.check.ok).length + (e.reaches === false ? 1 : 0)
}

function tooLong(messages: ChatMessage[]): boolean {
  const chars = messages.reduce((n, m) => n + m.content.length + 12, 0)
  return chars / 2.8 + REPLY_TOKENS > CONTEXT_TOKENS
}

/** Il testo del modello senza il ragionamento (<think>), come va rimesso nella conversazione. */
function said(reply: string): string {
  return reply.replace(/<think>[\s\S]*?(?:<\/think>|$)/g, '').trim()
}

/** La spiegazione di un conto: il giro tra il modello (`chat`) e il motore, vedi in cima al file. */
export async function explain(target: ExplainTarget, tone: ExplainTone, chat: ChatFn, events: ExplainEvents = {}): Promise<Explanation> {
  const sheet = sheetFactory(target.defs)
  return converse(
    {
      messages: [
        { role: 'system', content: systemPrompt(tone) },
        { role: 'user', content: questionPrompt(target, engineHints(target, sheet)) },
      ],
      sheet,
      check: (raw) => checkSteps(raw, target, sheet),
      feedback: (result) => feedback(result, target),
      needsFormula: true,
    },
    chat,
    events,
  )
}

/** La spiegazione di un grafico (o di un'altra cosa della nota): lo stesso giro, senza un risultato a cui arrivare. */
export async function explainTopic(topic: ExplainTopic, tone: ExplainTone, chat: ChatFn, events: ExplainEvents = {}): Promise<Explanation> {
  const sheet = sheetFactory(topic.defs)
  return converse(
    {
      messages: [
        { role: 'system', content: topicSystemPrompt(tone, topic.kind) },
        { role: 'user', content: topicPrompt(topic) },
      ],
      sheet,
      check: (raw) => checkTopicSteps(raw, topic, sheet),
      feedback: (result) => topicFeedback(result),
      needsFormula: false,
    },
    chat,
    events,
  )
}

// ——— La chat: le domande dopo la spiegazione (il pannello «Spiega con l'AI») ———

/** Una domanda dello studente sulla spiegazione e la risposta del modello, con le formule controllate da Glifo. */
export interface FollowUp {
  question: string
  answer: Explanation
}

/** Quello a cui si riferiscono le domande: la cosa spiegata (come la vede il modello) e la spiegazione. */
export interface ChatContext {
  kind: 'conto' | TopicKind
  /** Il messaggio con il conto o la cosa della nota, lo stesso della spiegazione. */
  prompt: string
  /** La spiegazione, nel formato in cui l'ha scritta il modello. */
  explanation: string
  /** Le definizioni per gli strumenti e per controllare le formule. */
  defs: string[]
}

const CHAT_SUBJECT: Record<'conto' | TopicKind, string> = {
  conto: 'come si arriva al risultato di una formula della sua nota',
  grafico: 'un grafico della sua nota',
  formula: 'una formula della sua nota',
  teorema: 'un enunciato della sua nota',
  schema: 'uno schema della sua nota',
  tabella: 'una tabella della sua nota',
}

/** Le domande di prima che si rimandano al modello, al massimo: il contesto è di 4096 token. */
const CHAT_HISTORY = 3

export function chatSystemPrompt(tone: ExplainTone, kind: 'conto' | TopicKind): string {
  const tools = kind === 'conto' || kind === 'grafico' || kind === 'formula'
  return [
    `Sei il tutor di Glifo, l'app per prendere appunti di matematica. Hai spiegato allo studente ${CHAT_SUBJECT[kind]}; ora rispondi in italiano alle sue domande su quella spiegazione.`,
    TONES[tone],
    '',
    'Regole:',
    `- I numeri li calcola il motore di Glifo, che non sbaglia: non fare conti a mente${tools ? '; se ti serve un conto, usa gli strumenti' : ''}. Non inventare numeri.`,
    '- Glifo controlla le formule che scrivi.',
    '- Rispondi solo alla domanda, in breve: da 1 a 4 punti in un elenco numerato, un punto per riga, con una o due frasi e, quando aiuta, alla fine una formula tra $$ (un\'uguaglianza in LaTeX, a = b).',
    '- Se la domanda non riguarda la matematica della nota, dillo in una frase.',
    ...(tools ? ['', toolsPrompt()] : []),
  ].join('\n')
}

/** Una spiegazione (o una risposta) come la rilegge il modello: «1. frase $$formula$$», il suo formato. */
export function explanationText(e: Explanation): string {
  return e.steps.map((s, i) => `${i + 1}. ${s.text}${s.formula ? ` $$${s.formula}$$` : ''}`.trim()).join('\n')
}

/** La chat su una spiegazione: di un conto (con i suggerimenti del motore, come allora) o di un'altra cosa della nota. */
export function chatContext(about: ExplainTarget | ExplainTopic, e: Explanation): ChatContext {
  if ('content' in about) return { kind: about.kind, prompt: topicPrompt(about), explanation: explanationText(e), defs: about.defs }
  return { kind: 'conto', prompt: questionPrompt(about, engineHints(about, sheetFactory(about.defs))), explanation: explanationText(e), defs: about.defs }
}

/**
 * La risposta a una domanda della chat: il modello rilegge la cosa spiegata, la spiegazione e le ultime
 * domande (le più vecchie si lasciano se il contesto non basta), può chiedere conti al motore, e Glifo
 * controlla le formule della risposta come quelle della spiegazione (e fa correggere quelle sbagliate).
 */
export async function answerFollowUp(context: ChatContext, history: FollowUp[], question: string, tone: ExplainTone, chat: ChatFn, events: ExplainEvents = {}): Promise<Explanation> {
  const sheet = sheetFactory(context.defs)
  const head: ChatMessage[] = [
    { role: 'system', content: chatSystemPrompt(tone, context.kind) },
    { role: 'user', content: context.prompt },
    { role: 'assistant', content: context.explanation },
  ]
  let past = history.slice(-CHAT_HISTORY)
  const build = (): ChatMessage[] => [
    ...head,
    ...past.flatMap((f): ChatMessage[] => [
      { role: 'user', content: f.question },
      { role: 'assistant', content: explanationText(f.answer) },
    ]),
    { role: 'user', content: question.trim() },
  ]
  let messages = build()
  while (past.length && tooLong(messages)) {
    past = past.slice(1)
    messages = build()
  }
  return converse(
    {
      messages,
      sheet,
      check: (raw) => checkFormulas(raw, context.defs, sheet),
      feedback: (result) => topicFeedback(result, 'tutta la risposta'),
      needsFormula: false,
      empty: 'Il modello non ha risposto: riprova, o scegli un modello più grande nelle impostazioni.',
    },
    chat,
    events,
  )
}

/** Cosa cambia tra un conto e le altre cose della nota; il giro con il modello è lo stesso. */
interface Conversation {
  messages: ChatMessage[]
  sheet: SheetFactory
  check(raw: { text: string; formula: string | null }[]): { steps: ExplainStep[]; reaches: boolean | null }
  feedback(result: { steps: ExplainStep[]; reaches: boolean | null }): string | null
  /** Un conto si spiega con le formule: senza nessuna, si chiede di riscrivere. Un grafico può bastare a parole. */
  needsFormula: boolean
  /** Cosa dire se il modello non scrive niente (di solito: non ha scritto i passaggi). */
  empty?: string
}

async function converse(c: Conversation, chat: ChatFn, events: ExplainEvents): Promise<Explanation> {
  const { messages, sheet } = c
  let toolCalls = 0
  let toolRounds = 0
  let corrections = 0
  let reminded = false
  let long = false
  let best: Explanation | null = null
  for (let round = 0; round < MAX_TOOL_ROUNDS + MAX_CORRECTIONS + 3; round++) {
    if (round && tooLong(messages)) {
      long = true
      break
    }
    events.onStatus?.(corrections ? 'correcting' : 'writing')
    let reply: string
    try {
      reply = await chat(messages, events.onDelta)
    } catch (err) {
      // Una spiegazione c'è già (il modello si è fermato mentre correggeva): meglio quella. «Annulla» no.
      if (best && !(err instanceof Error && err.name === 'AbortError')) break
      throw err
    }
    const calls = toolCallsIn(reply)
    if (calls.length && toolRounds < MAX_TOOL_ROUNDS) {
      toolRounds++
      events.onStatus?.('tool')
      const responses = calls.slice(0, 4).map((call) => {
        const response = runTool(call, sheet)
        toolCalls++
        events.onTool?.(call, response)
        return response
      })
      messages.push({ role: 'assistant', content: said(reply) }, { role: 'user', content: toolResponses(responses) })
      continue
    }
    const raw = stepsIn(reply)
    if (c.needsFormula ? !raw.some((s) => s.formula) : !raw.length) {
      if (reminded) break
      reminded = true
      const ask = c.needsFormula
        ? 'Ora scrivi la spiegazione nel formato richiesto: un elenco numerato, un passaggio per riga, con la frase e la formula tra $$.'
        : 'Ora scrivi la spiegazione nel formato richiesto: un elenco numerato, un punto per riga.'
      messages.push({ role: 'assistant', content: said(reply) }, { role: 'user', content: ask })
      continue
    }
    const { steps, reaches } = c.check(raw)
    const result: Explanation = { steps, reaches, toolCalls, corrections }
    if (!best || wrongs(result) <= wrongs(best)) best = result
    const note = c.feedback(result)
    if (!note || corrections >= MAX_CORRECTIONS) break
    corrections++
    messages.push({ role: 'assistant', content: said(reply) }, { role: 'user', content: note })
  }
  if (!best) {
    throw new ExplainError(
      long
        ? 'La spiegazione è diventata troppo lunga per il modello nel browser: riprova, o scegli un modello più grande nelle impostazioni.'
        : (c.empty ?? 'Il modello non ha scritto i passaggi: riprova, o scegli un modello più grande nelle impostazioni.'),
    )
  }
  return { ...best, toolCalls }
}
