/**
 * Il diagramma di Gantt o il reticolo di un blocco ```grafico, pronto da mostrare: i tempi
 * (schedule.ts), il disegno (gantt.ts), la legenda e gli errori. Lo usano l'anteprima
 * (planPreview.ts) e le figure da usare fuori da Glifo: «Scarica» (PNG, SVG, copiata) e
 * l'immagine nei file .md, chiare su bianco, con il titolo e la legenda in testo SVG.
 */
import type { PlanData } from '../spreadsheet/plan'
import { ganttSvg, hasDates, networkSvg, planLegend, planSwatchSvg, PLAN_FONT, textWidth, type PlanDrawing, type PlanLegend } from './gantt'
import { labelPlain, labelSvg } from './labels'
import { planBlock, type PlanBlock } from './planBlock'
import { schedule, type Schedule } from './schedule'
import { escapeXml, PALETTES, type Palette } from './svg'

/** Un errore da mostrare: di una riga del blocco o di una riga della tabella. */
export interface PlanError {
  /** La riga del blocco (da 0), se l'errore è lì. */
  line?: number
  /** Il testo della riga del blocco. */
  text?: string
  /** La riga della tabella (da 1), se l'errore è lì. */
  row?: number
  message: string
}

export interface PlanPicture {
  block: PlanBlock
  schedule: Schedule | null
  drawing: PlanDrawing | null
  legend: PlanLegend | null
  errors: PlanError[]
}

/** Il blocco disegnato con la sua tabella, largo `width` (il Gantt; il reticolo ha la sua misura). */
export function planPicture(source: string, data: PlanData | null, palette: Palette, width: number): PlanPicture | null {
  const block = planBlock(source)
  if (!block) return null
  const errors: PlanError[] = block.errors.map((e) => ({ line: e.line, text: e.text, message: e.message }))
  const fail = (message: string) => errors.push({ line: block.at.line, text: block.at.text, message })
  if (!data || data.error !== undefined) {
    fail(data?.error ?? 'Prima del grafico, nella nota, non c\'è una tabella: le attività vengono dalla tabella scritta sopra')
    return { block, schedule: null, drawing: null, legend: null, errors }
  }
  const plan = data.plan
  const s = schedule(plan)
  for (const p of s.problems) errors.push({ row: p.row, message: p.message })
  for (const c of s.checks) errors.push({ row: c.row, message: c.message })
  if (!s.ok) return { block, schedule: s, drawing: null, legend: null, errors }
  const start = block.start
  if (start && !hasDates(plan.unit)) fail(`Le date si mostrano con le durate in giorni, settimane o mesi (qui sono in ${plan.unit})`)
  const drawing = block.kind === 'gantt' ? ganttSvg(s, plan, palette, { width, start }) : networkSvg(s, plan, palette)
  return { block, schedule: s, drawing, legend: planLegend(s, plan, block.kind, start), errors }
}

/** Un testo lungo diviso in righe larghe al massimo `max` pixel. */
function wrap(text: string, size: number, max: number): string[] {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word
    if (line && textWidth(next, size) > max) {
      lines.push(line)
      line = word
    } else line = next
  }
  if (line) lines.push(line)
  return lines
}

/** I colori delle figure che escono da Glifo: quelli del tema chiaro, su bianco. */
const FIGURE: Palette = { ...PALETTES.light, surface: '#ffffff', halo: '#ffffff' }

/** La larghezza del Gantt nelle figure. */
export const FIGURE_WIDTH = 760

/** Il nome della figura: il titolo, o quello del disegno. */
export function planName(block: PlanBlock): string {
  return block.title ? labelPlain(block.title) : block.kind === 'gantt' ? 'Diagramma di Gantt' : 'Reticolo del progetto'
}

/**
 * La figura chiara su bianco, da scaricare o da mettere nei file .md: il titolo sopra, il disegno,
 * la legenda e gli errori sotto (null se il blocco non è un Gantt né un reticolo).
 */
export function planFigure(source: string, data: PlanData | null): string | null {
  const picture = planPicture(source, data, FIGURE, FIGURE_WIDTH)
  if (!picture) return null
  const { block, drawing, legend, errors } = picture
  const width = Math.max(drawing?.width ?? 0, 480)
  const parts: string[] = []
  let y = 0
  if (block.title) {
    const { svg } = labelSvg(block.title, 17)
    parts.push(`<text x="${width / 2}" y="26" text-anchor="middle" font-family="${PLAN_FONT}" font-size="17" font-weight="600" fill="#1c2030">${svg}</text>`)
    y = 40
  }
  if (drawing) {
    parts.push(`<g transform="translate(${Math.round((width - drawing.width) / 2)} ${y})">${drawing.svg}</g>`)
    y += drawing.height + 10
  }
  const font = `font-family="${PLAN_FONT}" font-size="13.5" fill="#1c2030"`
  if (legend) {
    // Una voce per riga, come nei grafici (le misure dei caratteri cambiano da un programma all'altro).
    for (const item of legend.items) {
      const x = Math.max(8, (width - 28 - textWidth(item.label, 13.5)) / 2)
      parts.push(planSwatchSvg(item.swatch, FIGURE, x, y + 4), `<text x="${(x + 28).toFixed(1)}" y="${y + 16}" ${font}>${escapeXml(item.label)}</text>`)
      y += 24
    }
    for (const note of legend.notes) {
      for (const line of wrap(note, 13.5, width - 24)) {
        parts.push(`<text x="${width / 2}" y="${y + 16}" text-anchor="middle" ${font}>${escapeXml(line)}</text>`)
        y += 22
      }
    }
  }
  for (const e of errors) {
    const where = e.row !== undefined ? `Tabella, riga ${e.row}: ` : ''
    parts.push(`<text x="12" y="${y + 16}" font-family="${PLAN_FONT}" font-size="13" fill="${FIGURE.loss}">${escapeXml(where + e.message)}</text>`)
    y += 22
  }
  const total = Math.max(y + 8, 60)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${total}" width="${width}" height="${total}" role="img" aria-label="${escapeXml(planName(block))}"><rect width="${width}" height="${total}" fill="#ffffff"/>${parts.join('')}</svg>`
}
