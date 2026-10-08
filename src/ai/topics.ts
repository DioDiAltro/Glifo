/**
 * Le cose della nota da spiegare che non sono conti (il pannello «Spiega con l'AI», src/ui/aiPanel.ts),
 * con i fatti che Glifo sa già calcolare: il modello li racconta, non li inventa (src/ai/explain.ts,
 * `explainTopic`). I grafici: per ogni funzione lo studio di funzione (dominio, zeri, segno, asintoti,
 * massimi e minimi…), le aree colorate, i punti, gli slider. Le formule senza un conto (una definizione,
 * un'identità come a^2 + b^2 = c^2) e i teoremi scritti nel testo: lì Glifo controlla gli esempi con i
 * numeri che il modello scrive. Gli schemi, descritti a parole (le forme nell'ordine delle frecce, le
 * corsie, i collegamenti), e le tabelle con i valori calcolati e le formule.
 */
import { parseGraph, type GraphSpec } from '../graph/spec'
import { formatNumber } from '../math/format'
import { Sheet } from '../math/sheet'
import { DB_SHAPES, insideLanes, laneAt, laneNames, parseSchema, parseTable, SHAPE_NAMES, type Schema, type SchemaEdge, type SchemaNode, type ShapeKind, type TableField } from '../schema/model'
import { SheetEvaluator, type CellResult } from '../spreadsheet/evaluate'
import { formatValue } from '../spreadsheet/format'
import { isFormula, normalizeFormula, shiftFormula } from '../spreadsheet/formula'
import { parseSheet, sheetSize, type SheetModel } from '../spreadsheet/model'
import { cellName, colName } from '../spreadsheet/refs'
import { isError } from '../spreadsheet/values'
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

// ——— Schemi e tabelle ———

/** Quanto testo al massimo per uno schema o una tabella (il resto si conta in fondo) e per il nome nell'elenco. */
const BLOCK_CHARS = 1400
const LABEL_CHARS = 60

function cut(text: string, max = LABEL_CHARS): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}

/** 1 forma, 3 forme. */
function count(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`
}

/** «A», «A e B», «A, B e C». */
function listText(items: string[]): string {
  return items.length < 2 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`
}

/** Le righe che stanno in `max` caratteri (la prima sempre); quante ne restano si dice in fondo. */
function fitLines(lines: string[], max: number): string[] {
  let used = 0
  for (let i = 0; i < lines.length; i++) {
    used += lines[i].length + 1
    if (used > max && i > 1) return [...lines.slice(0, i), `… e altre ${lines.length - i} righe`]
  }
  return lines
}

/** Le forme degli schemi E-R che sono attributi (nell'elenco del pannello vengono dopo entità e relazioni). */
const ATTRIBUTES = new Set<ShapeKind>(['keyAttribute', 'multiAttribute', 'derivedAttribute', 'attribute', 'identifier'])
/** Le forme che dicono che lo schema è un E-R (non le tabelle, che sono lo schema logico). */
const ER_SHAPES = new Set<ShapeKind>(DB_SHAPES.filter((s) => s !== 'table'))

function readSchema(source: string): Schema | null {
  try {
    return parseSchema(source)
  } catch {
    return null
  }
}

/** Il testo di una forma su una riga; di una tabella il nome. */
function shapeText(n: SchemaNode): string {
  return (n.shape === 'table' ? parseTable(n.text).name : n.text).replace(/\s*\n\s*/g, ' ').trim()
}

/** Che forma è, in minuscolo: in uno schema E-R i rettangoli sono le entità e i rombi le relazioni. */
function shapeKindName(n: SchemaNode, er: boolean): string {
  if (er && n.shape === 'rect') return 'entità'
  if (er && n.shape === 'rhombus') return 'relazione'
  return SHAPE_NAMES[n.shape].replace(/\s*\(.*\)$/, '').toLowerCase()
}

/**
 * Le forme nell'ordine del flusso: ognuna dopo quelle da cui le arrivano le frecce (con la punta), prima
 * quelle da cui il flusso continua e poi quelle dove finisce, a parità dall'alto in basso e da sinistra a
 * destra; in un giro (A → B → A) si va avanti dalla prima forma raggiunta. Le forme senza frecce vengono
 * dopo, nello stesso ordine della pagina.
 */
function flowOrder(nodes: SchemaNode[], edges: SchemaEdge[]): SchemaNode[] {
  const key = (n: SchemaNode) => [Math.round((n.y + n.h / 2) / 40), n.x + n.w / 2]
  const byPos = [...nodes].sort((a, b) => {
    const [ra, xa] = key(a)
    const [rb, xb] = key(b)
    return ra - rb || xa - xb
  })
  const known = new Set(nodes.map((n) => n.id))
  const next = new Map<string, string[]>()
  const waiting = new Map<string, number>()
  for (const e of edges) {
    if (e.arrows !== 'end' || !known.has(e.from) || !known.has(e.to) || e.from === e.to) continue
    next.set(e.from, [...(next.get(e.from) ?? []), e.to])
    waiting.set(e.to, (waiting.get(e.to) ?? 0) + 1)
  }
  const inFlow = byPos.filter((n) => next.has(n.id) || waiting.has(n.id))
  const order: SchemaNode[] = []
  const done = new Set<string>()
  const reached = new Set<string>()
  while (order.length < inFlow.length) {
    const left = inFlow.filter((n) => !done.has(n.id))
    // La prima forma pronta (tutte le frecce che le arrivano sono già passate); in un giro, la prima raggiunta.
    const ready = left.filter((m) => !waiting.get(m.id))
    const n = ready.find((m) => next.has(m.id)) ?? ready[0] ?? left.find((m) => reached.has(m.id)) ?? left[0]
    order.push(n)
    done.add(n.id)
    for (const to of next.get(n.id) ?? []) {
      waiting.set(to, (waiting.get(to) ?? 1) - 1)
      reached.add(to)
    }
  }
  return [...order, ...byPos.filter((n) => !done.has(n.id))]
}

/** La corsia in cui sta una forma: «Cliente», o il numero se la corsia non ha nome. */
function laneOf(n: SchemaNode, lanes: SchemaNode[]): string | null {
  for (const l of lanes) {
    if (!insideLanes(l, n)) continue
    const at = laneAt(l, n.x + n.w / 2, n.y + n.h / 2)
    if (!at) continue
    const name = laneNames(l.text)[at.lane]?.trim()
    return name ? `«${name}»` : `n. ${at.lane + 1}`
  }
  return null
}

function fieldText(f: TableField): string {
  const keys = f.pk && f.fk ? 'chiave primaria ed esterna' : f.pk ? 'chiave primaria' : f.fk ? 'chiave esterna' : ''
  const more = [f.type.trim(), keys].filter(Boolean).join(', ')
  return `${f.name.trim()}${more ? ` (${more})` : ''}`
}

/** I nomi da mostrare nell'elenco del pannello: entità, relazioni e passi prima degli attributi e dei testi. */
function schemaLabel(schema: Schema): string {
  const lanes = schema.nodes.filter((n) => n.shape === 'lanes')
  const shapes = flowOrder(schema.nodes.filter((n) => n.shape !== 'lanes'), schema.edges)
  const main = shapes.filter((n) => !ATTRIBUTES.has(n.shape) && n.shape !== 'text' && n.shape !== 'note').map(shapeText).filter(Boolean)
  const texts = main.length ? main : shapes.map(shapeText).filter(Boolean)
  const parts = texts.length ? texts : lanes.flatMap((l) => laneNames(l.text).map((t) => t.trim())).filter(Boolean)
  return parts.length ? cut(parts.slice(0, 8).join(' · ').replace(/\$/g, '')) : count(schema.nodes.length, 'forma', 'forme')
}

/** Il nome di uno schema nell'elenco del pannello; null se il blocco non è uno schema o è vuoto. */
export function schemaTitle(source: string): string | null {
  const schema = readSchema(source)
  return schema?.nodes.length ? schemaLabel(schema) : null
}

/**
 * Uno schema della nota (il JSON del blocco ```schema), descritto a parole: il modello non legge le
 * coordinate. Le corsie, le forme nell'ordine del flusso con il loro tipo (in uno schema E-R entità,
 * relazioni, attributi; le tabelle con i campi e le chiavi) e la corsia, i collegamenti con il verso e
 * il testo (anche le cardinalità, dalla parte dove sono scritte). I fatti: quante forme, da dove si
 * parte e dove si arriva.
 */
export function schemaTopic(source: string): ExplainTopic {
  const schema = readSchema(source) ?? { nodes: [], edges: [] }
  const lanes = schema.nodes.filter((n) => n.shape === 'lanes')
  const shapes = flowOrder(schema.nodes.filter((n) => n.shape !== 'lanes'), schema.edges)
  const er = shapes.some((n) => ER_SHAPES.has(n.shape))
  const names = new Map<string, string>(lanes.map((l) => [l.id, 'le corsie']))
  const unnamed = new Map<string, number>()
  for (const n of shapes) {
    const text = shapeText(n)
    if (text) names.set(n.id, `«${text}»`)
    else {
      const kind = shapeKindName(n, er)
      const k = (unnamed.get(kind) ?? 0) + 1
      unnamed.set(kind, k)
      names.set(n.id, `${kind} n. ${k}`)
    }
  }
  const laneList = lanes.flatMap((l) => laneNames(l.text).map((t) => t.trim())).filter(Boolean)
  const lines: string[] = []
  if (laneList.length) lines.push(`Corsie: ${laneList.map((t) => `«${t}»`).join(', ')}`)
  lines.push('Forme:')
  for (const n of shapes) {
    const name = names.get(n.id)!
    let line = name.startsWith('«') ? `${name} (${shapeKindName(n, er)})` : name
    const fields = n.shape === 'table' ? parseTable(n.text).fields.filter((f) => f.name.trim()) : []
    if (fields.length) line += `, campi: ${fields.map(fieldText).join(', ')}`
    const lane = lanes.length ? laneOf(n, lanes) : null
    if (lane) line += `, nella corsia ${lane}`
    lines.push(`- ${line}`)
  }
  if (schema.edges.length) {
    lines.push('Collegamenti:')
    for (const e of schema.edges) {
      const a = names.get(e.from) ?? 'una forma'
      const b = names.get(e.to) ?? 'una forma'
      let line = `${a} ${e.arrows === 'both' ? '↔' : e.arrows === 'none' ? '—' : '→'} ${b}`
      const text = e.text.replace(/\s*\n\s*/g, ' ').trim()
      if (text) line += e.at === 'start' ? `, con «${text}» dalla parte di ${a}` : e.at === 'end' ? `, con «${text}» dalla parte di ${b}` : `: «${text}»`
      if (e.dashed) line += ' (tratteggiata)'
      lines.push(`- ${line}`)
    }
  }
  const links = schema.edges.length ? count(schema.edges.length, 'collegamento', 'collegamenti') : 'nessun collegamento'
  const facts = [`lo schema ha ${count(shapes.length, 'forma', 'forme')} e ${links}${laneList.length ? `, in ${count(laneList.length, 'corsia', 'corsie')}` : ''}`]
  if (er) facts.push('è uno schema E-R: entità, relazioni e i loro attributi')
  const tables = shapes.filter((n) => n.shape === 'table').length
  if (tables) facts.push(`${tables === 1 ? 'c\'è una tabella' : `ci sono ${tables} tabelle`} di una base di dati, con i campi e le chiavi`)
  const arrows = schema.edges.filter((e) => e.arrows === 'end')
  if (arrows.length) {
    const from = new Set(arrows.map((e) => e.from))
    const to = new Set(arrows.map((e) => e.to))
    const starts = shapes.filter((n) => from.has(n.id) && !to.has(n.id)).map((n) => names.get(n.id)!)
    const ends = shapes.filter((n) => to.has(n.id) && !from.has(n.id)).map((n) => names.get(n.id)!)
    if (starts.length && starts.length <= 3) facts.push(`seguendo le frecce si parte da ${listText(starts)}`)
    if (ends.length && ends.length <= 3) facts.push(`seguendo le frecce si arriva a ${listText(ends)}`)
  }
  const title = schema.nodes.length ? schemaLabel(schema) : 'Lo schema'
  return { kind: 'schema', title: { text: title }, content: fitLines(lines, BLOCK_CHARS).join('\n'), facts, defs: [] }
}

/** Quante colonne della tabella si mandano al modello, e quante formule e quanti errori si dicono. */
const GRID_COLS = 12
const MAX_FORMULAS = 9
const MAX_ERRORS = 3

function readSheet(source: string): SheetModel | null {
  try {
    return parseSheet(source)
  } catch {
    return null
  }
}

/** Il valore come lo mostra la tabella; un errore con il suo codice (e, se serve, cosa vuol dire). */
function valueText(result: CellResult, why = false): string {
  if (isError(result.value)) return why ? `${result.value.error} (${result.value.message.toLowerCase()})` : result.value.error
  return formatValue(result.value, result.format)
}

/** La formula come la riscrive Excel (=somma(b2:b5) → =SOMMA(B2:B5)). */
function formulaText(input: string): string {
  try {
    return normalizeFormula(input.trim())
  } catch {
    return input.trim()
  }
}

/** Il nome di una tabella nell'elenco del pannello (la prima riga); null se il blocco è vuoto. */
export function tableTitle(source: string): string | null {
  const model = readSheet(source)
  if (!model) return null
  const { rows, cols } = sheetSize(model)
  if (!rows || !cols) return null
  const head = (model.cells[0] ?? [])
    .slice(0, cols)
    .map((c) => (c && !isFormula(c.input) ? c.input.trim() : ''))
    .filter(Boolean)
  return head.length ? cut(head.join(' · ').replace(/\$/g, '')) : `${count(rows, 'riga', 'righe')} e ${count(cols, 'colonna', 'colonne')}`
}

/**
 * Una tabella della nota (il testo del blocco ```tabella): la griglia con le lettere delle colonne e i
 * numeri delle righe, come nell'editor, con i valori calcolati da Glifo; i fatti sono le formule (quelle
 * copiate riga per riga o colonna per colonna, come D2 = B2*C2 … D6 = B6*C6, dette una volta sola) e
 * gli errori, con cosa vogliono dire.
 */
export function tableTopic(source: string): ExplainTopic {
  const model = readSheet(source)
  const title = { text: tableTitle(source) ?? 'La tabella' }
  if (!model) return { kind: 'tabella', title, content: source, facts: [], defs: [] }
  const { rows, cols } = sheetSize(model)
  const evaluator = new SheetEvaluator(model)
  const shown = Math.min(cols, GRID_COLS)
  const columns = Array.from({ length: shown }, (_, c) => c)
  const lines = [`|   | ${columns.map(colName).join(' | ')} |`, `|${'---|'.repeat(shown + 1)}`]
  for (let r = 0; r < rows; r++) lines.push(`| ${r + 1} | ${columns.map((c) => valueText(evaluator.result(r, c)).replace(/\|/g, '\\|')).join(' | ')} |`)
  const content = [...fitLines(lines, BLOCK_CHARS), ...(cols > shown ? [`… e altre ${cols - shown} colonne`] : [])].join('\n')

  const formulas: { row: number; col: number; input: string }[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = model.cells[r]?.[c]
      if (cell && isFormula(cell.input)) formulas.push({ row: r, col: c, input: cell.input })
    }
  }
  const at = new Map(formulas.map((f) => [`${f.row},${f.col}`, f]))
  const told = new Set<(typeof formulas)[number]>()
  // La formula di `f` copiata nella cella di `g` è quella di `g`.
  const copied = (f: (typeof formulas)[number], g: (typeof formulas)[number]) => {
    try {
      return formulaText(shiftFormula(f.input, g.row - f.row, g.col - f.col)) === formulaText(g.input)
    } catch {
      return false
    }
  }
  const run = (f: (typeof formulas)[number], dr: number, dc: number) => {
    const out = [f]
    for (let k = 1; ; k++) {
      const g = at.get(`${f.row + dr * k},${f.col + dc * k}`)
      if (!g || told.has(g) || !copied(f, g)) return out
      out.push(g)
    }
  }
  const said: string[] = []
  for (const f of formulas) {
    if (told.has(f)) continue
    const down = run(f, 1, 0)
    const same = down.length > 1 ? down : run(f, 0, 1)
    same.forEach((g) => told.add(g))
    const first = cellName(f.row, f.col)
    if (same.length === 1) {
      said.push(`in ${first} la formula ${formulaText(f.input)}, che dà ${valueText(evaluator.result(f.row, f.col))}`)
      continue
    }
    const last = same[same.length - 1]
    const end = cellName(last.row, last.col)
    said.push(`da ${first} a ${end} la stessa formula ${down.length > 1 ? 'riga per riga' : 'colonna per colonna'}: ${first} ${formulaText(f.input)} … ${end} ${formulaText(last.input)}`)
  }
  const errors = formulas
    .filter((f) => isError(evaluator.result(f.row, f.col).value))
    .map((f) => `in ${cellName(f.row, f.col)} c'è l'errore ${valueText(evaluator.result(f.row, f.col), true)}`)
  const facts = [
    ...(said.length > MAX_FORMULAS ? [...said.slice(0, MAX_FORMULAS - 1), `e altre ${said.length - MAX_FORMULAS + 1} formule`] : said),
    ...(errors.length > MAX_ERRORS ? [...errors.slice(0, MAX_ERRORS - 1), `e altri ${errors.length - MAX_ERRORS + 1} errori`] : errors),
  ]
  return { kind: 'tabella', title, content, facts, defs: [] }
}
