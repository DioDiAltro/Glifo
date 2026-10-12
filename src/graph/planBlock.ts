/**
 * Il blocco ```grafico del diagramma di Gantt o del reticolo: la riga `gantt: A1:E9` (o `reticolo:
 * A1:E9`) prende le attività dalla tabella scritta prima del grafico nella nota, come la riga
 * `dati:` (vedi tableGraph.ts); `titolo:` mette il titolo e `inizio: 12/10/2026` le date sotto il
 * Gantt. In inglese `network:`, `title:` e `start: 2026-10-12` (src/noteWords.ts). Il renderer scrive
 * le attività in `data-plan` (vedi src/render/markdown.ts), lette da `readPlan` nell'anteprima e nei
 * file .md.
 */
import { texts } from '../i18n'
import type { PlanData } from '../spreadsheet/plan'
import { blockLines, labelLine, type GraphError } from './spec'
import { planLine } from './tableGraph'

const T = texts({
  noAxes: ['Il diagramma non ha gli assi x e y: il tempo e le attività hanno già il loro nome', 'This chart has no x and y axes: the time and the tasks already have their names'],
  ganttLines: [
    'Nel diagramma di Gantt si scrivono solo le righe titolo:, gantt: e inizio: (le attività sono nella tabella)',
    'In the Gantt chart you can only write the title:, gantt: and start: lines (the tasks are in the table)',
  ],
  networkLines: [
    'Nel reticolo si scrivono solo le righe titolo:, reticolo: e inizio: (le attività sono nella tabella)',
    'In the network diagram you can only write the title:, network: and start: lines (the tasks are in the table)',
  ],
  date: ['Scrivi la data d\'inizio come 12/10/2026', 'Write the start date like 2026-10-12'],
  networkDate: ['Il reticolo ha i tempi in numeri: la data d\'inizio serve al diagramma di Gantt', 'The network diagram shows times as numbers: the start date is for the Gantt chart'],
  oneRange: ['Il disegno prende le attività da un intervallo solo: scrivi una riga sola', 'The chart takes its tasks from a single range: write only one line'],
  oneChart: ['Un blocco fa un disegno solo: il Gantt e il reticolo vanno in due blocchi grafico', 'A block makes a single chart: the Gantt chart and the network diagram go in two graph blocks'],
})

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

// I mesi della data d'inizio scritta nella nota (inizio: 12 ottobre 2026, start: October 12, 2026), in
// italiano e in inglese; bastano le prime tre lettere (gen, Oct). Nessun inizio di tre lettere è di due
// mesi diversi nelle due lingue (mar, apr, feb e nov sono gli stessi mesi).
const MONTHS = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
const MONTHS_EN = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

/** Il mese (da 1) di una parola come ottobre, ott, October, Oct; 0 se non è un mese. */
function monthOf(word: string): number {
  if (word.length < 3) return 0
  const month = (names: string[]) => names.findIndex((name) => name.startsWith(word)) + 1
  return month(MONTHS) || month(MONTHS_EN)
}

/**
 * Una data scritta all'italiana (12/10/2026, 12-10-26, 12 ottobre 2026), all'inglese (12 October 2026,
 * October 12, 2026, Oct 12 2026) o come 2026-10-12; null se non lo è.
 */
export function parseDate(text: string): Date | null {
  const s = text.trim().toLowerCase()
  let d: number, m: number, y: number
  let match = /^(\d{1,2})\s*[/.-]\s*(\d{1,2})\s*[/.-]\s*(\d{2}|\d{4})$/.exec(s)
  if (match) [d, m, y] = [Number(match[1]), Number(match[2]), Number(match[3])]
  else if ((match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s))) [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])]
  else if ((match = /^(\d{1,2})(?:°|º|st|nd|rd|th)?\s+([a-z]+)\.?\s+(\d{4})$/.exec(s))) {
    const month = monthOf(match[2])
    if (!month) return null
    ;[d, m, y] = [Number(match[1]), month, Number(match[3])]
  } else if ((match = /^([a-z]+)\.?\s+(\d{1,2})(?:st|nd|rd|th)?\s*,?\s+(\d{4})$/.exec(s))) {
    // All'americana: October 12, 2026.
    const month = monthOf(match[1])
    if (!month) return null
    ;[d, m, y] = [Number(match[2]), month, Number(match[3])]
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
      else if (label.key !== 'title') fail(T.noAxes)
      continue
    }
    const p = planLine(l.text)
    if (!p) {
      fail(found.kind === 'gantt' ? T.ganttLines : T.networkLines)
      continue
    }
    if (p.key === 'inizio') {
      const date = parseDate(p.value)
      if (!date) fail(T.date)
      else if (found.kind === 'reticolo') fail(T.networkDate)
      else block.start = date
      continue
    }
    if (seen) fail(p.key === found.kind ? T.oneRange : T.oneChart)
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
