/**
 * Le cose della nota da spiegare che non sono conti (il pannello «Spiega con l'AI», src/ui/aiPanel.ts),
 * con i fatti che Glifo sa già calcolare: il modello li racconta, non li inventa (src/ai/explain.ts,
 * `explainTopic`). I grafici: per ogni funzione lo studio di funzione (dominio, zeri, segno, asintoti,
 * massimi e minimi…), le aree colorate, i punti, gli slider. Le formule senza un conto (una definizione,
 * un'identità come a^2 + b^2 = c^2) e i teoremi scritti nel testo: lì Glifo controlla gli esempi con i
 * numeri che il modello scrive.
 */
import { parseGraph, type GraphSpec } from '../graph/spec'
import { formatNumber } from '../math/format'
import { Sheet } from '../math/sheet'
import type { ExplainTopic } from './explain'

/** I nomi da dare alle funzioni scritte come y = …, perché il modello e i controlli le possano chiamare. */
const FREE_NAMES = ['f', 'g', 'h', 'p', 'q', 'u', 'v', 'w']
/** Fatti al massimo, e caratteri dello studio di una funzione: il contesto del modello è piccolo. */
const MAX_FACTS = 12
const STUDY_CHARS = 700

function numberText(v: number): string {
  return formatNumber(v, { comma: true, decimal: true, digits: 6 })?.text ?? String(v)
}

/** f(x) = x^2 → f; le funzioni già definite (nella nota o nel blocco) tengono il loro nome. */
function definedName(def: string): string | null {
  return /^\s*([A-Za-z])\s*\(\s*[a-z]\s*\)\s*=/.exec(def)?.[1] ?? null
}

/** Lo studio di funzione di Glifo, come lo scrive la nota (`\operatorname{studio}(f) =`); null se non lo sa fare. */
function studyOf(defs: string[], name: string, chars = STUDY_CHARS): string | null {
  try {
    const sheet = new Sheet()
    for (const d of defs) sheet.add(d)
    const text = sheet.add(`\\operatorname{studio}(${name}) =`)?.text ?? null
    if (!text) return null
    return text.length > chars ? `${text.slice(0, chars)}…` : text
  } catch {
    return null
  }
}

/**
 * Un grafico della nota (il testo del blocco ```grafico, con le definizioni scritte prima): le righe
 * del blocco e i fatti di Glifo. Le funzioni scritte come y = … prendono un nome (f, g…), così il
 * modello può scrivere f(0) = 0 e Glifo lo controlla.
 */
export function graphTopic(source: string, defs: string[]): ExplainTopic {
  let spec: GraphSpec | null = null
  try {
    spec = parseGraph(source, defs)
  } catch {
    spec = null
  }
  const own = [...defs]
  const used = new Set(defs.map(definedName).filter((n): n is string => !!n))
  const facts: string[] = []
  const firstLabel: string[] = []
  if (spec?.title) facts.push(`titolo del grafico: ${spec.title}`)
  for (const [axis, name] of Object.entries(spec?.axes ?? {})) facts.push(`l'asse ${axis} è ${name}`)
  for (const item of spec?.items ?? []) {
    if (item.fromNote || item.dashed) continue
    if (!firstLabel.length && item.label) firstLabel.push(item.label)
    if (item.kind === 'function') {
      const named = /^\s*([A-Za-z])\s*\(\s*x\s*\)\s*$/.exec(item.label)?.[1]
      let name: string | null = named ?? null
      const body = name ? null : /^\s*y\s*=\s*([\s\S]+?)(?:,\s*\\quad[\s\S]*)?$/.exec(item.label)?.[1]
      // y = f(x), con f della nota: è lei.
      const call = body ? /^([A-Za-z])\((?:x)\)$/.exec(body.replace(/\\left|\\right|\s+/g, ''))?.[1] : undefined
      if (call && used.has(call)) name = call
      if (!name) {
        name = FREE_NAMES.find((n) => !used.has(n)) ?? null
        if (!body || !name) {
          facts.push(`curva: $$${item.label}$$`)
          continue
        }
        used.add(name)
        own.push(`${name}(x) = ${body.trim()}`)
      }
      const def = own.find((d) => definedName(d) === name)
      if (def) facts.push(`la funzione $$${def}$$`)
      const study = studyOf(own, name)
      if (study) facts.push(`studio di ${name}: ${study}`)
    } else if (item.kind === 'area') {
      facts.push(`area colorata sotto la curva, da ${numberText(item.from)} a ${numberText(item.to)}: $$${item.label}$$`)
    } else if (item.kind === 'point') {
      facts.push(`il punto ${item.name ?? ''} = (${numberText(item.x)}; ${numberText(item.y)})`.replace('  ', ' '))
    } else if (item.label) {
      facts.push(`nel grafico anche $$${item.label}$$`)
    }
  }
  for (const s of spec?.sliders ?? []) facts.push(`lo slider ${s.name} vale ${numberText(s.value)} (da ${s.ends[0]} a ${s.ends[1]})`)
  const title = spec?.title ? { text: spec.title.replace(/\$/g, '') } : firstLabel.length ? { tex: firstLabel[0] } : { text: 'Il grafico' }
  return { kind: 'grafico', title, content: `\`\`\`grafico\n${source.trim()}\n\`\`\``, facts: facts.slice(0, MAX_FACTS), defs: own }
}

/**
 * Una formula della nota senza un conto (src/editor/explainSubjects.ts): una definizione (f(x) = x^2,
 * a = 2), un'identità o una relazione con le lettere (a^2 + b^2 = c^2). Se definisce una funzione,
 * Glifo dà anche un pezzo del suo studio; il resto lo spiega il modello, con gli esempi che Glifo controlla.
 */
export function formulaTopic(tex: string, defs: string[]): ExplainTopic {
  const facts: string[] = []
  const own = [...defs]
  const name = definedName(tex)
  if (name) {
    facts.push(`è la definizione di una funzione: $$${tex}$$`)
    own.push(tex)
    const study = studyOf(own, name, 400)
    if (study) facts.push(`studio di ${name}: ${study}`)
  }
  return { kind: 'formula', title: { tex }, content: `$$${tex}$$`, facts, defs: own }
}

/** Quanto di un teorema si manda al modello (il resto del paragrafo si taglia). */
const THEOREM_CHARS = 1400

/** Un teorema, una definizione, una proprietà scritti nel testo della nota: il modello lo legge così com'è. */
export function theoremTopic(text: string, title: string): ExplainTopic {
  const content = text.length > THEOREM_CHARS ? `${text.slice(0, THEOREM_CHARS)}…` : text
  return { kind: 'teorema', title: { text: title }, content, facts: [], defs: [] }
}
