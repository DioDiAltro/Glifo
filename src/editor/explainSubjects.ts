/**
 * Il pannello «Spiega con l'AI» (src/ui/aiPanel.ts): quello che si può spiegare nella nota, in ordine. I
 * conti (le formule con un risultato di Glifo, come per «Spiegami»), i grafici, le formule senza un conto
 * (una definizione, un'identità con le lettere) e i teoremi, le definizioni e le proprietà scritti nel
 * testo. Le formule si leggono dall'alto in basso con le definizioni scritte prima, come i risultati
 * della nota: un foglio solo, una formula alla volta.
 */
import { ensureSyntaxTree, syntaxTree } from '@codemirror/language'
import type { EditorState } from '@codemirror/state'
import { explainTarget, formulaNames, type ExplainTarget } from '../ai/explain'
import { graphNames } from '../graph/spec'
import { calculationRequest, Sheet, solveRequest } from '../math/sheet'
import { findFencedBlocks } from '../schema/blocks'
import { formulasUntil } from './calcResults'
import { hasCalculation } from './explainInsert'

export type SubjectKind = 'conto' | 'grafico' | 'formula' | 'teorema'

export interface NoteSubject {
  kind: SubjectKind
  /** Dove sta nella nota: la formula con i $, il blocco con le righe ```, il paragrafo. */
  from: number
  to: number
  /** La formula (senza i $), il testo del blocco o del paragrafo: per ritrovarla se intanto la nota cambia. */
  source: string
  /** Il conto, con il risultato di Glifo. */
  target?: ExplainTarget
  /** Le definizioni della nota che il grafico o la formula usano. */
  defs?: string[]
  /** Un teorema: che cos'è (Teorema, Definizione…) e il suo titolo, come si vedono nell'elenco. */
  tag?: string
  title?: string
}

/** Quanto si aspetta che CodeMirror legga tutta la nota, in millisecondi: oltre, si va con quello che ha letto. */
const PARSE_MS = 200

/**
 * Una formula senza un conto vale la pena di spiegarla se dice qualcosa: una relazione (=, <, ∈, ⇒…) o
 * un'espressione con delle operazioni. $x$, $x_1$, $\alpha$, $\mathbb{R}$ da sole no: sono nomi nel testo.
 */
function worthExplaining(tex: string): boolean {
  const t = tex.replace(/\s+/g, '')
  if (t.length < 3) return false
  if (/=|<|>|[≤≥≠≈∈⊂⊆∀∃⇒⇔→∼]|\\(?:le|ge|leq|geq|neq|approx|equiv|sim|in|subset|subseteq|forall|exists|Rightarrow|iff|implies|to|mapsto)(?![a-zA-Z])/.test(t)) return true
  if (/\\(?:frac|dfrac|sqrt|int|iint|iiint|oint|sum|prod|lim|log|ln|sin|cos|tan|exp|det|binom|partial|nabla|cdot|times)(?![a-zA-Z])/.test(t)) return true
  return t.length >= 5 && /[+\-*/]/.test(t)
}

/** Le parole con cui comincia un enunciato da spiegare. */
const THEOREM_WORDS = ['Teorema', 'Definizione', 'Lemma', 'Proposizione', 'Corollario', 'Proprietà', 'Principio', 'Legge', 'Regola', 'Criterio', 'Assioma', 'Postulato', 'Formula']
const THEOREM_START = new RegExp(`^(?:\\*\\*|__|\\*|_)?(${THEOREM_WORDS.join('|')})(?![\\p{L}])`, 'iu')
const FENCE = /^\s*(`{3,}|~{3,})/
const HEADING = /^\s{0,3}(#{1,6})\s+(.*)$/
const LIST_ITEM = /^\s*(?:[-*+]|\d{1,3}[.)])\s+/
/** Quanto di un enunciato al massimo (una sezione lunga si taglia qui). */
const THEOREM_MAX = 1600

/** Il titolo da mostrare: la prima riga senza i segni del Markdown, fino ai due punti (o 60 caratteri). */
function theoremTitle(line: string): string {
  const plain = line
    .replace(HEADING, '$2')
    .replace(LIST_ITEM, '')
    .replace(/\*\*|__/g, '')
    .replace(/^[*_]|[*_](?=\s|:|$)/g, '')
    .trim()
  const head = plain.split(/[:.](?:\s|$)/)[0].trim()
  return head.length > 60 ? `${head.slice(0, 57)}…` : head
}

/**
 * I teoremi (e le definizioni, le proprietà…) scritti nel testo: un titolo che comincia così (con il
 * suo paragrafo, fino al titolo dopo) o un paragrafo, anche in un elenco, che comincia così (fino alla
 * riga vuota). I blocchi di codice non contano.
 */
export function theoremsIn(text: string): NoteSubject[] {
  const lines = text.split('\n')
  const starts: number[] = []
  let pos = 0
  for (const line of lines) {
    starts.push(pos)
    pos += line.length + 1
  }
  const out: NoteSubject[] = []
  let fence: string | null = null
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const f = FENCE.exec(line)
    if (f) {
      if (!fence) fence = f[1][0]
      else if (f[1][0] === fence) fence = null
      continue
    }
    if (fence) continue
    const heading = HEADING.exec(line)
    const body = heading ? heading[2] : line.replace(LIST_ITEM, '')
    const word = THEOREM_START.exec(body.trim())
    // Un paragrafo comincia dopo una riga vuota (o un titolo); una voce d'elenco comincia sempre.
    const startsParagraph = i === 0 || !lines[i - 1].trim() || HEADING.test(lines[i - 1]) || LIST_ITEM.test(line)
    if (!word || (!heading && !startsParagraph)) continue
    let end = i + 1
    if (heading) {
      const level = heading[1].length
      while (end < lines.length && !(HEADING.exec(lines[end]) && HEADING.exec(lines[end])![1].length <= level)) end++
    } else {
      while (end < lines.length && lines[end].trim() && !HEADING.test(lines[end]) && !LIST_ITEM.test(lines[end])) end++
    }
    while (end > i + 1 && !lines[end - 1].trim()) end--
    const from = starts[i]
    const to = Math.min(starts[end - 1] + lines[end - 1].length, from + THEOREM_MAX)
    const tag = word[1][0].toUpperCase() + word[1].slice(1).toLowerCase()
    out.push({ kind: 'teorema', from, to, source: text.slice(from, to), tag, title: theoremTitle(line) })
  }
  return out
}

export function subjectsIn(state: EditorState): NoteSubject[] {
  // L'albero completo: quello dello stato può essere solo l'inizio (vedi tests/support/editorState.ts).
  const tree = ensureSyntaxTree(state, state.doc.length, PARSE_MS) ?? syntaxTree(state)
  const formulas = formulasUntil(state, state.doc.length, tree)
  const text = state.doc.toString()
  const graphs = findFencedBlocks(text, 'grafico').filter((b) => b.closed && b.source.trim())
  const theorems = theoremsIn(text)
  const insideTheorem = (pos: number) => theorems.some((t) => t.from <= pos && pos < t.to)
  const out: NoteSubject[] = [...theorems]
  const seen = new Set<string>()
  const sheet = new Sheet()
  let next = 0
  // I grafici prima di `pos`, con le definizioni scritte fin lì.
  const graphsBefore = (pos: number) => {
    for (; next < graphs.length && graphs[next].from < pos; next++) {
      const b = graphs[next]
      let defs: string[] = []
      try {
        defs = sheet.definitionsFor(graphNames(b.source))
      } catch {
        defs = []
      }
      out.push({ kind: 'grafico', from: b.from, to: b.to, source: b.source, defs })
    }
  }
  for (const region of formulas) {
    graphsBefore(region.from)
    const tex = region.tex.trim()
    let defs: string[] = []
    let target: ExplainTarget | null = null
    try {
      defs = sheet.definitionsFor(formulaNames(solveRequest(tex) ?? calculationRequest(tex) ?? tex))
      // explainTarget legge la formula nel foglio (come `add`): una definizione con «=» vale per quelle dopo.
      if (hasCalculation(tex)) target = explainTarget(tex, sheet, defs)
      else sheet.add(tex)
    } catch {
      // Una formula che Glifo non legge non definisce niente.
    }
    if (target) out.push({ kind: 'conto', from: region.from, to: region.to, source: tex, target })
    else if (worthExplaining(tex) && !insideTheorem(region.from) && !seen.has(tex)) {
      // La stessa formula più volte: una sola nell'elenco. Dentro un teorema la spiega il teorema.
      seen.add(tex)
      out.push({ kind: 'formula', from: region.from, to: region.to, source: tex, defs })
    }
  }
  graphsBefore(Infinity)
  return out.sort((a, b) => a.from - b.from)
}
