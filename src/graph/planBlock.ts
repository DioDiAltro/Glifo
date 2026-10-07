/**
 * Il blocco ```grafico del diagramma di Gantt o del reticolo: la riga `gantt: A1:E9` (o `reticolo:
 * A1:E9`) prende le attività dalla tabella scritta prima del grafico nella nota, come la riga
 * `dati:` (vedi tableGraph.ts); `titolo:` mette il titolo e `inizio: 12/10/2026` le date sotto il
 * Gantt. Il renderer scrive le attività in `data-plan` (vedi src/render/markdown.ts), lette da
 * `readPlan` nell'anteprima e nei file .md.
 */
import type { PlanData } from '../spreadsheet/plan'
import { blockLines, labelLine, type GraphError } from './spec'
import { planLine } from './tableGraph'

export type PlanKind = 'gantt' | 'reticolo'

export interface PlanBlock {
  kind: PlanKind
  /** Le celle delle attività, come sono scritte (A1:E9). */
  range: string
  /** La riga gantt: (o reticolo:) del blocco, per i messaggi sulla tabella. */
  at: { line: number; text: string }
  title?: string
  /** Il primo giorno del progetto (mezzanotte UTC), per le date sotto il Gantt. */
  start?: Date
  errors: GraphError[]
}

/** Il tipo e le celle del disegno (la prima riga gantt: o reticolo:); null se il blocco è un grafico come gli altri. */
export function planRange(source: string): { kind: PlanKind; range: string; at: { line: number; text: string } } | null {
  for (const l of blockLines(source)) {
    const p = planLine(l.text)
    if (p && p.key !== 'inizio') return { kind: p.key, range: p.value, at: l }
  }
  return null
}

const MONTHS = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']

/** Una data scritta all'italiana (12/10/2026, 12-10-26, 12 ottobre 2026) o come 2026-10-12; null se non lo è. */
export function parseDate(text: string): Date | null {
  const s = text.trim().toLowerCase()
  let d: number, m: number, y: number
  let match = /^(\d{1,2})\s*[/.-]\s*(\d{1,2})\s*[/.-]\s*(\d{2}|\d{4})$/.exec(s)
  if (match) [d, m, y] = [Number(match[1]), Number(match[2]), Number(match[3])]
  else if ((match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s))) [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])]
  else if ((match = /^(\d{1,2})(?:°|º)?\s+([a-z]+)\s+(\d{4})$/.exec(s))) {
    const word = match[2]
    const month = word.length >= 3 ? MONTHS.findIndex((name) => name.startsWith(word)) : -1
    if (month < 0) return null
    ;[d, m, y] = [Number(match[1]), month + 1, Number(match[3])]
  } else return null
  if (y < 100) y += 2000
  const date = new Date(Date.UTC(y, m - 1, d))
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d ? date : null
}

/** Il blocco del Gantt o del reticolo; null se non ha la riga gantt: o reticolo:. */
export function planBlock(source: string): PlanBlock | null {
  const found = planRange(source)
  if (!found) return null
  const block: PlanBlock = { ...found, errors: [] }
  let seen = false
  for (const l of blockLines(source)) {
    const fail = (message: string) => block.errors.push({ line: l.line, text: l.text, message })
    const label = labelLine(l.text)
    if (label) {
      if (label.key === 'title' && label.value) block.title = label.value
      else if (label.key !== 'title') fail('Il diagramma non ha gli assi x e y: il tempo e le attività hanno già il loro nome')
      continue
    }
    const p = planLine(l.text)
    if (!p) {
      fail(`Nel ${found.kind === 'gantt' ? 'diagramma di Gantt' : 'reticolo'} si scrivono solo le righe titolo:, ${found.kind}: e inizio: (le attività sono nella tabella)`)
      continue
    }
    if (p.key === 'inizio') {
      const date = parseDate(p.value)
      if (!date) fail('Scrivi la data d\'inizio come 12/10/2026')
      else if (found.kind === 'reticolo') fail('Il reticolo ha i tempi in numeri: la data d\'inizio serve al diagramma di Gantt')
      else block.start = date
      continue
    }
    if (seen) fail(p.key === found.kind ? 'Il disegno prende le attività da un intervallo solo: scrivi una riga sola' : 'Un blocco fa un disegno solo: il Gantt e il reticolo vanno in due blocchi grafico')
    seen = true
  }
  return block
}

/** Le attività della tabella sopra il disegno, scritte dall'anteprima in `data-plan`; null se non ci sono. */
export function readPlan(block: HTMLElement): PlanData | null {
  if (block.dataset.plan === undefined) return null
  try {
    const data = JSON.parse(block.dataset.plan) as PlanData
    if (data && typeof data.error === 'string') return data
    return data && data.plan && Array.isArray(data.plan.activities) ? data : null
  } catch {
    return null
  }
}
