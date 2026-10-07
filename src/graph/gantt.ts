/**
 * Il diagramma di Gantt e il reticolo di un progetto in SVG, con i tempi calcolati da schedule.ts.
 *
 * Il Gantt: una riga per attività (il codice e la descrizione a sinistra) con la barra dall'inizio
 * alla fine al più presto, rossa se l'attività è critica e blu se ha margine; dopo la barra la linea
 * sottile del margine, fino alla fine al più tardi, e chi la fa. Le frecce sono i legami. Il tempo è
 * in alto: in numeri da 0 o, con `inizio:`, le date (i giorni lavorativi saltano sabato e domenica).
 * Con la colonna «Fatto» la parte fatta della barra è piena e il resto velato.
 *
 * Il reticolo (PERT/CPM, con le attività nei nodi): ogni attività è un riquadro con l'inizio al più
 * presto, la durata e la fine al più presto sopra, il codice e la descrizione al centro, l'inizio al
 * più tardi, il margine e la fine al più tardi sotto, come nei libri. Le colonne sono i passi
 * dall'inizio; le frecce che saltano colonne passano tra i riquadri (nodi finti, come nel metodo di
 * Sugiyama) e l'ordine nelle colonne è quello che incrocia meno frecce (i baricentri).
 */
import type { PlanTable } from '../spreadsheet/plan'
import { numberText, type Link, type Schedule, type Task } from './schedule'
import { escapeXml, type Palette } from './svg'

export interface PlanDrawing {
  svg: string
  width: number
  height: number
}

export const PLAN_FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
const FONT = `font-family="${PLAN_FONT}"`
const EPS = 1e-9
const r1 = (v: number) => (Math.round(v * 10) / 10).toString()

// ——— Testi ———

const NARROW = new Set([...'iljtfrI.,:;!|\'"()[]{} ·'])
const WIDE = new Set([...'mwMW@%—'])

let measurer: CanvasRenderingContext2D | null | undefined

/** La larghezza misurata dal browser con il suo carattere (null nei test, dove non c'è). */
function measured(text: string, size: number, bold: boolean): number | null {
  if (measurer === undefined) {
    measurer = null
    try {
      if (typeof document !== 'undefined' && !/jsdom/i.test(navigator.userAgent)) measurer = document.createElement('canvas').getContext('2d')
    } catch {
      measurer = null
    }
  }
  if (!measurer) return null
  measurer.font = `${bold ? '700 ' : ''}${size}px ${PLAN_FONT}`
  return measurer.measureText(text).width
}

/**
 * Quanto è largo un testo in pixel, con il carattere di `size`: misurato dal browser o, dove non
 * c'è, stimato largo (meglio accorciare un nome che farlo uscire dal riquadro).
 */
export function textWidth(text: string, size: number, bold = false): number {
  const real = measured(text, size, bold)
  if (real !== null) return real
  let w = 0
  for (const ch of text) {
    if (NARROW.has(ch)) w += 0.31
    else if (WIDE.has(ch)) w += 0.9
    else if (ch >= 'A' && ch <= 'Z') w += 0.7
    else if (ch >= '0' && ch <= '9') w += 0.6
    else w += 0.57
  }
  return w * size * (bold ? 1.06 : 1)
}

/** Il testo accorciato con «…» per stare in `max` pixel ('' se non ci sta niente). */
export function fitText(text: string, size: number, max: number, bold = false): string {
  if (textWidth(text, size, bold) <= max) return text
  let s = text
  while (s.length > 1 && textWidth(`${s}…`, size, bold) > max) s = s.slice(0, -1)
  return s.length > 1 ? `${s.trimEnd()}…` : ''
}

/** Il testo su più righe larghe `max` pixel, andando a capo tra le parole; se non basta, l'ultima si accorcia con «…». */
export function wrapText(text: string, size: number, max: number, lines = 2): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean)
  const out: string[] = []
  let i = 0
  // Una parola che da sola non ci sta va nell'ultima riga, accorciata.
  while (i < words.length && out.length < lines - 1 && textWidth(words[i], size) <= max) {
    let line = words[i++]
    while (i < words.length && textWidth(`${line} ${words[i]}`, size) <= max) line += ` ${words[i++]}`
    out.push(line)
  }
  const rest = fitText(words.slice(i).join(' '), size, max)
  return rest ? [...out, rest] : out
}

const SINGULAR: Record<string, string> = { giorni: 'giorno', 'giorni lavorativi': 'giorno lavorativo', settimane: 'settimana', ore: 'ora', mesi: 'mese', minuti: 'minuto', anni: 'anno' }

/** Una durata con la sua unità: «1 giorno», «2,5 settimane». */
export function amount(x: number, unit: string): string {
  return `${numberText(x)} ${Math.abs(x - 1) < EPS ? (SINGULAR[unit] ?? unit) : unit}`
}

// ——— Le date ———

export const MONTHS = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
const SHORT_MONTHS = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic']

/** Le unità con cui il Gantt mostra le date (con le ore e i minuti restano i numeri). */
export function hasDates(unit: string): boolean {
  return unit === 'giorni' || unit === 'settimane' || unit === 'mesi'
}

const isWeekend = (d: Date) => d.getUTCDay() === 0 || d.getUTCDay() === 6

/** Il giorno (o la settimana, il mese) numero `k` del progetto, da 0: i giorni lavorativi saltano sabato e domenica. */
export function dayOf(start: Date, k: number, unit: string, working: boolean): Date {
  const d = new Date(start.getTime())
  const n = Math.max(0, Math.floor(k + EPS))
  if (unit === 'settimane') d.setUTCDate(d.getUTCDate() + 7 * n)
  else if (unit === 'mesi') d.setUTCMonth(d.getUTCMonth() + n)
  else if (!working) d.setUTCDate(d.getUTCDate() + n)
  else {
    while (isWeekend(d)) d.setUTCDate(d.getUTCDate() + 1)
    for (let left = n; left > 0; ) {
      d.setUTCDate(d.getUTCDate() + 1)
      if (!isWeekend(d)) left--
    }
  }
  return d
}

/** 12/10/2026. */
export function dateText(d: Date): string {
  return `${String(d.getUTCDate()).padStart(2, '0')}/${String(d.getUTCMonth() + 1).padStart(2, '0')}/${d.getUTCFullYear()}`
}

/** Il primo e l'ultimo giorno di un'attività (o la data di un traguardo, la fine di quello che c'è prima). */
export function taskDates(t: Pick<Task, 'es' | 'ef' | 'duration'>, start: Date, unit: string, working: boolean): [Date, Date] {
  if (t.duration <= EPS) {
    const d = dayOf(start, Math.max(0, Math.ceil(t.es - EPS) - 1), unit, working)
    return [d, d]
  }
  return [dayOf(start, t.es, unit, working), dayOf(start, Math.max(t.es, Math.ceil(t.ef - EPS) - 1), unit, working)]
}

// ——— Il diagramma di Gantt ———

export interface GanttOptions {
  /** La larghezza del disegno. */
  width: number
  /** Il primo giorno, per le date (senza: il tempo in numeri, da 0). */
  start?: Date
}

const ROW = 28
const BAR = 14

/** La descrizione di un'attività, per il fumetto che si legge passandoci sopra. */
function taskTitle(t: Task, plan: PlanTable, start: Date | undefined): string {
  const lines = [`${t.id}${t.name ? ` · ${t.name}` : ''}${t.who ? ` (${t.who})` : ''}`]
  lines.push(t.duration <= EPS ? 'Traguardo (durata zero)' : `Durata: ${amount(t.duration, plan.unit)}`)
  if (start && hasDates(plan.unit)) {
    const [a, b] = taskDates(t, start, plan.unit, plan.working)
    lines.push(t.duration <= EPS ? `Il ${dateText(a)}` : `Dal ${dateText(a)} al ${dateText(b)}`)
  }
  lines.push(`Inizio e fine al più presto: ${numberText(t.es)} e ${numberText(t.ef)}`)
  lines.push(`Inizio e fine al più tardi: ${numberText(t.ls)} e ${numberText(t.lf)}`)
  lines.push(t.critical ? 'Critica: senza margine' : `Margine: ${amount(t.slack, plan.unit)} (libero: ${numberText(t.free)})`)
  if (t.done !== null) lines.push(`Fatto: ${numberText(t.done * 100)}%`)
  return lines.join('\n')
}

/** Il passo dei numeri del tempo: 1, 2, 5, 10, 20, 25, 50… quanto basta perché non si tocchino. */
function timeStep(unitWidth: number, label: number): number {
  for (const base of [1, 10, 100, 1000, 10000]) {
    for (const k of [1, 2, 5]) {
      const step = base * k
      if (step * unitWidth >= label) return step
    }
  }
  return 100000
}

/** Il colore della barra: rosso le critiche, blu le altre. */
function barColor(t: Task, palette: Palette): string {
  return t.critical ? palette.loss : palette.series[0]
}

export function ganttSvg(s: Schedule, plan: PlanTable, palette: Palette, options: GanttOptions): PlanDrawing {
  const width = Math.round(options.width)
  const start = options.start && hasDates(plan.unit) ? options.start : undefined
  const tasks = s.tasks
  const units = Math.max(1, Math.ceil(s.end - EPS))
  const idSize = 12.5
  const nameSize = 12
  const idWidth = Math.max(...tasks.map((t) => textWidth(t.id, idSize, true)))
  const nameWidth = plan.has.name ? Math.max(0, ...tasks.map((t) => textWidth(t.name, nameSize))) : 0
  const labelWidth = Math.round(Math.min(Math.max(70, idWidth + (nameWidth ? 10 + nameWidth : 0) + 22), Math.max(110, width * 0.36)))
  const whoWidth = plan.has.who ? Math.min(Math.max(0, ...tasks.map((t) => textWidth(t.who, 11))) + 16, width * 0.2) : 0
  const x0 = labelWidth
  const x1 = width - 10 - whoWidth
  const unit = (x1 - x0) / units
  const x = (t: number) => x0 + t * unit
  const header = start ? 42 : 26
  const top = header + 4
  const height = top + tasks.length * ROW + 8
  const rowY = (i: number) => top + i * ROW + ROW / 2
  const out: string[] = []

  // Le righe a strisce, per seguirle con l'occhio.
  tasks.forEach((_, i) => {
    if (i % 2) out.push(`<rect x="0" y="${top + i * ROW}" width="${width}" height="${ROW}" fill="${palette.gridMinor}" opacity="0.55"/>`)
  })

  // Il tempo: le colonne, i numeri (o le date) in alto.
  const grid: string[] = []
  const labels: string[] = []
  const caption = plan.unit.charAt(0).toUpperCase() + plan.unit.slice(1) + (plan.working && start ? ' lavorativi' : '')
  if (start) {
    const days = Array.from({ length: units }, (_, k) => dayOf(start, k, plan.unit, plan.working))
    const cellLabel = (d: Date) => (plan.unit === 'giorni' ? String(d.getUTCDate()) : plan.unit === 'settimane' ? `${d.getUTCDate()}/${d.getUTCMonth() + 1}` : SHORT_MONTHS[d.getUTCMonth()])
    // Un numero ogni `step` colonne, perché non si tocchino; ognuno sopra il suo giorno (o settimana, mese).
    const step = Math.max(1, Math.ceil((textWidth(plan.unit === 'settimane' ? '30/10' : '30', 10.5) + 4) / unit))
    days.forEach((d, k) => {
      if (plan.unit === 'giorni' && !plan.working && isWeekend(d)) grid.push(`<rect x="${r1(x(k))}" y="${top}" width="${r1(unit)}" height="${tasks.length * ROW}" fill="${palette.grid}" opacity="0.35"/>`)
      if (k % step === 0) labels.push(`<text x="${r1(x(k) + unit / 2)}" y="${header - 6}" text-anchor="middle" font-size="10.5" fill="${palette.text}">${escapeXml(cellLabel(d))}</text>`)
    })
    // Sopra, il mese (o l'anno) dove comincia.
    const group = (d: Date) => (plan.unit === 'mesi' ? String(d.getUTCFullYear()) : `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`)
    let from = 0
    for (let k = 1; k <= units; k++) {
      if (k < units && group(days[k]) === group(days[from])) continue
      const room = x(k) - x(from) - 6
      const short = `${SHORT_MONTHS[days[from].getUTCMonth()]} ${days[from].getUTCFullYear()}`
      const text = [group(days[from]), short, SHORT_MONTHS[days[from].getUTCMonth()]].find((t) => textWidth(t, 11, true) <= room) ?? ''
      if (text) labels.push(`<text x="${r1(x(from) + 3)}" y="${header - 24}" font-size="11" font-weight="600" fill="${palette.axis}">${escapeXml(text)}</text>`)
      if (from > 0) grid.push(`<path d="M${r1(x(from))} ${header - 36}V${top + tasks.length * ROW}" stroke="${palette.grid}" stroke-width="1"/>`)
      from = k
    }
    for (let k = 0; k <= units; k++) {
      if (unit >= 5 || k % step === 0) grid.push(`<path d="M${r1(x(k))} ${top}V${top + tasks.length * ROW}" stroke="${k % step === 0 ? palette.grid : palette.gridMinor}" stroke-width="1"/>`)
    }
  } else {
    const step = timeStep(unit, textWidth(String(units), 11) + 10)
    for (let k = 0; k <= units; k++) {
      const major = k % step === 0
      if (unit >= 5 || major) grid.push(`<path d="M${r1(x(k))} ${top}V${top + tasks.length * ROW}" stroke="${major ? palette.grid : palette.gridMinor}" stroke-width="1"/>`)
      if (major) labels.push(`<text x="${r1(x(k))}" y="${header - 7}" text-anchor="middle" font-size="11" fill="${palette.text}">${k}</text>`)
    }
  }
  out.push(...grid)
  out.push(`<path d="M0 ${top - 0.5}H${width}" stroke="${palette.grid}" stroke-width="1"/>`)
  out.push(`<text x="8" y="${header - 7}" font-size="11" font-weight="600" fill="${palette.axis}">${escapeXml(caption)}</text>`)
  out.push(...labels)

  // I legami, sotto le barre: dalla fine (o dall'inizio) di quella prima all'inizio (o alla fine) di quella dopo.
  const half = (t: Task) => (t.duration <= EPS ? 6 : 0)
  for (const [i, t] of tasks.entries()) {
    for (const link of t.links) {
      const p = tasks[link.from]
      const fromEnd = link.type === 'FI' || link.type === 'FF'
      const toStart = link.type === 'FI' || link.type === 'II'
      const xs = fromEnd ? x(p.ef) + half(p) : x(p.es) - half(p)
      const xt = toStart ? x(t.es) - half(t) : x(t.ef) + half(t)
      const ys = rowY(link.from)
      const yt = rowY(i)
      const out1 = xs + (fromEnd ? 7 : -7)
      const into = toStart ? xt - 8 : xt + 8
      const fits = toStart ? out1 <= into : out1 >= into
      const mid = yt + (yt > ys ? -ROW / 2 : ROW / 2)
      const pts = fits ? [[xs, ys], [out1, ys], [out1, yt], [xt, yt]] : [[xs, ys], [out1, ys], [out1, mid], [into, mid], [into, yt], [xt, yt]]
      const tight = p.critical && t.critical && isTight(p, t, link)
      const color = tight ? palette.loss : palette.axis
      const dir = toStart ? 1 : -1
      out.push(
        `<path d="M${pts.map(([a, b]) => `${r1(a)} ${r1(b)}`).join('L')}" fill="none" stroke="${color}" stroke-width="${tight ? 1.4 : 1.1}" stroke-linejoin="round" opacity="${tight ? 0.9 : 0.55}"/>`,
        `<path d="M${r1(xt)} ${r1(yt)}l${-5 * dir} -3.5v7z" fill="${color}" opacity="${tight ? 0.9 : 0.6}"/>`,
      )
    }
  }

  // Le attività: il nome a sinistra, la barra (o il rombo dei traguardi), il margine e chi la fa.
  for (const [i, t] of tasks.entries()) {
    const y = rowY(i)
    const color = barColor(t, palette)
    const parts: string[] = []
    const room = labelWidth - 14 - idWidth - 8
    const name = plan.has.name && t.name ? fitText(t.name, nameSize, room) : ''
    parts.push(`<text x="8" y="${r1(y + 4.5)}" font-size="${idSize}" font-weight="700" fill="${palette.axis}">${escapeXml(fitText(t.id, idSize, labelWidth - 14))}</text>`)
    if (name) parts.push(`<text x="${r1(8 + idWidth + 8)}" y="${r1(y + 4.5)}" font-size="${nameSize}" fill="${palette.text}">${escapeXml(name)}</text>`)
    const xs = x(t.es)
    const xe = x(t.ef)
    if (t.slack > EPS) {
      const xl = x(t.lf)
      parts.push(`<path d="M${r1(xe + half(t))} ${r1(y)}H${r1(xl)}M${r1(xl)} ${r1(y - 5)}V${r1(y + 5)}" stroke="${palette.axis}" stroke-width="1.5" opacity="0.75"/>`)
    }
    if (t.duration <= EPS) {
      parts.push(`<path d="M${r1(xs)} ${r1(y - 7)}l7 7l-7 7l-7 -7z" fill="${color}"/>`)
    } else {
      const w = Math.max(2, xe - xs)
      if (t.done !== null) {
        parts.push(`<rect x="${r1(xs)}" y="${r1(y - BAR / 2)}" width="${r1(w)}" height="${BAR}" rx="3" fill="${color}" fill-opacity="0.32" stroke="${color}" stroke-width="1"/>`)
        if (t.done > 0) parts.push(`<rect x="${r1(xs)}" y="${r1(y - BAR / 2)}" width="${r1(Math.max(2, w * t.done))}" height="${BAR}" rx="3" fill="${color}"/>`)
      } else {
        parts.push(`<rect x="${r1(xs)}" y="${r1(y - BAR / 2)}" width="${r1(w)}" height="${BAR}" rx="3" fill="${color}"/>`)
      }
    }
    // Chi la fa: dentro la barra se ci sta (non con la parte fatta), se no dopo la barra e il margine.
    if (t.who) {
      if (t.done === null && t.duration > EPS && textWidth(t.who, 11, true) + 10 <= xe - xs) {
        parts.push(`<text x="${r1((xs + xe) / 2)}" y="${r1(y + 4)}" text-anchor="middle" font-size="11" font-weight="600" fill="#ffffff">${escapeXml(t.who)}</text>`)
      } else {
        const after = Math.max(xe + half(t), t.slack > EPS ? x(t.lf) : 0) + 12
        const who = fitText(t.who, 11, width - 4 - after)
        if (who) parts.push(`<text x="${r1(after)}" y="${r1(y + 4)}" font-size="11" fill="${palette.text}">${escapeXml(who)}</text>`)
      }
    }
    out.push(`<g class="plan-task" data-task="${i}"><title>${escapeXml(taskTitle(t, plan, start))}</title><rect class="plan-row" x="0" y="${top + i * ROW}" width="${width}" height="${ROW}" fill="transparent"/>${parts.join('')}</g>`)
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" ${FONT} role="img" aria-label="Diagramma di Gantt">${out.join('')}</svg>`
  return { svg, width, height }
}

/** Il legame non ha margine: l'attività dopo comincia appena il legame lo permette. */
function isTight(p: Task, t: Task, link: Link): boolean {
  const need = link.type === 'FI' ? p.ef + link.lag : link.type === 'II' ? p.es + link.lag : link.type === 'FF' ? p.ef + link.lag - t.duration : p.es + link.lag - t.duration
  return Math.abs(t.es - need) <= 1e-6
}

// ——— Il reticolo ———

const NODE_W = 112
/** L'altezza dei riquadri; con un nome su due righe tutti diventano più alti di NAME_LINE. */
const NODE_H = 70
const NAME_LINE = 12
const GAP_X = 34
const GAP_Y = 22
const END_R = 21

interface NetNode {
  /** L'attività (indice), 'start' e 'end' i nodi Inizio e Fine, 'dummy' un punto di passaggio di una freccia. */
  kind: 'task' | 'start' | 'end' | 'dummy'
  task: number
  rank: number
  /** L'altezza del posto che occupa nella colonna. */
  size: number
  y: number
}

interface NetEdge {
  /** I nodi da cui passa, dal primo all'ultimo. */
  path: number[]
  critical: boolean
  /** Il tipo e lo scarto, scritti sulla freccia quando non è un legame fine-inizio senza scarto. */
  label: string
}

/** Il numero di incroci tra due colonne vicine, con l'ordine dato. */
function crossings(edges: [number, number][], pos: ReadonlyMap<number, number>): number {
  let count = 0
  for (let a = 0; a < edges.length; a++) {
    for (let b = a + 1; b < edges.length; b++) {
      const [u1, v1] = edges[a]
      const [u2, v2] = edges[b]
      if ((pos.get(u1)! - pos.get(u2)!) * (pos.get(v1)! - pos.get(v2)!) < 0) count++
    }
  }
  return count
}

/**
 * Le posizioni più vicine a quelle volute (`want`), nell'ordine dato e distanti almeno quanto
 * servono le misure: il minimo dei quadrati con i vincoli d'ordine (blocchi che si uniscono, PAVA).
 */
function place(want: number[], sizes: number[], gap: number): number[] {
  const n = want.length
  const offset: number[] = []
  let acc = 0
  for (let i = 0; i < n; i++) {
    if (i) acc += (sizes[i - 1] + sizes[i]) / 2 + gap
    offset.push(acc)
  }
  const blocks: { sum: number; count: number }[] = []
  const owner: number[] = []
  for (let i = 0; i < n; i++) {
    blocks.push({ sum: want[i] - offset[i], count: 1 })
    while (blocks.length > 1 && blocks[blocks.length - 2].sum / blocks[blocks.length - 2].count > blocks[blocks.length - 1].sum / blocks[blocks.length - 1].count) {
      const last = blocks.pop()!
      blocks[blocks.length - 1].sum += last.sum
      blocks[blocks.length - 1].count += last.count
    }
  }
  for (const b of blocks) for (let k = 0; k < b.count; k++) owner.push(b.sum / b.count)
  return owner.map((z, i) => z + offset[i])
}

export function networkSvg(s: Schedule, plan: PlanTable, palette: Palette): PlanDrawing {
  const tasks = s.tasks
  const nodes: NetNode[] = []
  const start = nodes.push({ kind: 'start', task: -1, rank: 0, size: END_R * 2, y: 0 }) - 1
  const succs = tasks.map(() => [] as number[])
  tasks.forEach((t, i) => t.links.forEach((l) => succs[l.from].push(i)))
  // La colonna di ogni attività: una dopo la più lontana di quelle prima.
  const rank: number[] = tasks.map(() => 0)
  const done = new Set<number>()
  const visit = (i: number): number => {
    if (done.has(i)) return rank[i]
    done.add(i)
    rank[i] = 1 + Math.max(0, ...tasks[i].links.map((l) => visit(l.from)))
    return rank[i]
  }
  tasks.forEach((_, i) => visit(i))
  // I nomi vanno a capo: «Progettazione del database» e «Progettazione dell'interfaccia» accorciati sarebbero uguali.
  const names = tasks.map((t) => (t.name ? wrapText(t.name, 10.5, NODE_W - 12) : []))
  const nodeH = NODE_H + NAME_LINE * (Math.max(1, ...names.map((n) => n.length)) - 1)
  const taskNode = tasks.map((_, i) => nodes.push({ kind: 'task', task: i, rank: rank[i], size: nodeH, y: 0 }) - 1)
  const last = Math.max(0, ...rank) + 1
  const end = nodes.push({ kind: 'end', task: -1, rank: last, size: END_R * 2, y: 0 }) - 1

  // Le frecce, con i nodi finti dove saltano delle colonne.
  const edges: NetEdge[] = []
  const linkLabel = (l: Link) => (l.type === 'FI' ? '' : l.type) + (l.lag ? `${l.lag > 0 ? '+' : '−'}${numberText(Math.abs(l.lag))}` : '')
  const addEdge = (from: number, to: number, critical: boolean, label = '') => {
    const path = [from]
    for (let r = nodes[from].rank + 1; r < nodes[to].rank; r++) path.push(nodes.push({ kind: 'dummy', task: -1, rank: r, size: 10, y: 0 }) - 1)
    path.push(to)
    edges.push({ path, critical, label })
  }
  tasks.forEach((t, i) => {
    if (!t.links.length) addEdge(start, taskNode[i], t.critical && t.es <= EPS)
    for (const l of t.links) addEdge(taskNode[l.from], taskNode[i], tasks[l.from].critical && t.critical && isTight(tasks[l.from], t, l), linkLabel(l))
    if (!succs[i].length) addEdge(taskNode[i], end, t.critical && Math.abs(t.ef - s.end) <= EPS)
  })

  // L'ordine nelle colonne: prima quello della tabella, poi i baricentri avanti e indietro.
  const columns: number[][] = Array.from({ length: last + 1 }, () => [])
  nodes.forEach((n, i) => columns[n.rank].push(i))
  const pairs: [number, number][] = []
  for (const e of edges) for (let k = 0; k + 1 < e.path.length; k++) pairs.push([e.path[k], e.path[k + 1]])
  const before = nodes.map(() => [] as number[])
  const after = nodes.map(() => [] as number[])
  for (const [u, v] of pairs) {
    after[u].push(v)
    before[v].push(u)
  }
  const position = () => {
    const pos = new Map<number, number>()
    columns.forEach((col) => col.forEach((n, k) => pos.set(n, k)))
    return pos
  }
  const totalCrossings = () => {
    const pos = position()
    let count = 0
    for (let r = 0; r < last; r++) count += crossings(pairs.filter(([u]) => nodes[u].rank === r), pos)
    return count
  }
  let best = columns.map((c) => [...c])
  let bestCount = totalCrossings()
  for (let sweep = 0; sweep < 8 && bestCount > 0; sweep++) {
    const down = sweep % 2 === 0
    const pos = position()
    const range = down ? columns.keys() : [...columns.keys()].reverse()
    for (const r of range) {
      const near = down ? before : after
      const order = columns[r].map((n, k) => {
        const others = near[n].map((m) => pos.get(m)!)
        return { n, key: others.length ? others.reduce((a, b) => a + b, 0) / others.length : k }
      })
      order.sort((a, b) => a.key - b.key)
      columns[r] = order.map((o) => o.n)
      columns[r].forEach((n, k) => pos.set(n, k))
    }
    const count = totalCrossings()
    if (count < bestCount) {
      bestCount = count
      best = columns.map((c) => [...c])
    }
  }
  best.forEach((c, r) => (columns[r] = c))

  // L'altezza: ognuno vicino alla media di quelli a cui è legato, avanti e indietro, senza toccarsi.
  for (let pass = 0; pass < 6; pass++) {
    const down = pass % 2 === 0
    const order = down ? [...columns.keys()] : [...columns.keys()].reverse()
    for (const r of order) {
      const col = columns[r]
      const want = col.map((n) => {
        const near = pass === 0 ? before[n] : [...before[n], ...after[n]]
        return near.length ? near.reduce((a, m) => a + nodes[m].y, 0) / near.length : nodes[n].y
      })
      const ys = place(want, col.map((n) => nodes[n].size), GAP_Y)
      col.forEach((n, k) => (nodes[n].y = ys[k]))
    }
  }
  const pad = 14
  const minY = Math.min(...nodes.map((n) => n.y - n.size / 2))
  const maxY = Math.max(...nodes.map((n) => n.y + n.size / 2))
  // Le colonne dell'inizio e della fine sono strette quanto i loro cerchi.
  const colWidth = columns.map((col) => (col.some((n) => nodes[n].kind === 'task' || nodes[n].kind === 'dummy') ? NODE_W : END_R * 2))
  const colLeft: number[] = []
  colWidth.reduce((x, w, r) => ((colLeft[r] = x), x + w + GAP_X), pad)
  const cx = (n: NetNode) => colLeft[n.rank] + colWidth[n.rank] / 2
  const cy = (n: NetNode) => pad + 6 + n.y - minY
  const width = Math.round(colLeft[last] + colWidth[last] + pad)
  const height = Math.round(maxY - minY + pad * 2 + 12)
  const out: string[] = []

  // Le frecce, sotto i riquadri.
  const side = (n: NetNode, right: boolean) => cx(n) + (n.kind === 'dummy' ? (right ? NODE_W / 2 : -NODE_W / 2) : n.kind === 'task' ? (right ? NODE_W / 2 : -NODE_W / 2) : right ? END_R : -END_R)
  for (const e of edges.filter((e) => !e.critical).concat(edges.filter((e) => e.critical))) {
    const color = e.critical ? palette.loss : palette.axis
    let d = ''
    for (let k = 0; k + 1 < e.path.length; k++) {
      const a = nodes[e.path[k]]
      const b = nodes[e.path[k + 1]]
      const xa = side(a, true)
      const ya = cy(a)
      const xb = side(b, false)
      const yb = cy(b)
      const c = (xb - xa) / 2
      if (!d) d = `M${r1(xa)} ${r1(ya)}`
      else if (a.kind === 'dummy') d += `M${r1(side(a, false))} ${r1(ya)}H${r1(xa)}`
      d += `C${r1(xa + c)} ${r1(ya)} ${r1(xb - c)} ${r1(yb)} ${r1(xb - 6)} ${r1(yb)}`
    }
    const tip = nodes[e.path[e.path.length - 1]]
    const tx = side(tip, false)
    const ty = cy(tip)
    out.push(`<path d="${d}" fill="none" stroke="${color}" stroke-width="${e.critical ? 2 : 1.2}" opacity="${e.critical ? 0.95 : 0.7}"/>`, `<path d="M${r1(tx)} ${r1(ty)}l-7 -4v8z" fill="${color}"/>`)
    if (e.label) {
      const a = nodes[e.path[0]]
      const lx = side(a, true) + GAP_X / 2
      const ly = cy(a) - 6
      out.push(`<text x="${r1(lx)}" y="${r1(ly)}" text-anchor="middle" font-size="10" font-weight="600" fill="${color}" stroke="${palette.halo}" stroke-width="3" paint-order="stroke">${escapeXml(e.label)}</text>`)
    }
  }

  // I riquadri delle attività e i cerchi dell'inizio e della fine.
  const num = (v: number) => escapeXml(numberText(v))
  for (const n of nodes) {
    const x = cx(n)
    const y = cy(n)
    if (n.kind === 'dummy') continue
    if (n.kind !== 'task') {
      const critical = edges.some((e) => e.critical && (e.path[0] === nodes.indexOf(n) || e.path[e.path.length - 1] === nodes.indexOf(n)))
      const color = critical ? palette.loss : palette.axis
      out.push(
        `<circle cx="${r1(x)}" cy="${r1(y)}" r="${END_R}" fill="${palette.halo}" stroke="${color}" stroke-width="${critical ? 2 : 1.3}"/>`,
        `<text x="${r1(x)}" y="${r1(y + 4)}" text-anchor="middle" font-size="10.5" font-weight="600" fill="${palette.axis}">${n.kind === 'start' ? 'Inizio' : 'Fine'}</text>`,
      )
      continue
    }
    const t = tasks[n.task]
    const color = t.critical ? palette.loss : palette.axis
    const left = x - NODE_W / 2
    const topY = y - nodeH / 2
    const third = NODE_W / 3
    const row = 19
    const lines = `M${r1(left)} ${r1(topY + row)}H${r1(left + NODE_W)}M${r1(left)} ${r1(topY + nodeH - row)}H${r1(left + NODE_W)}M${r1(left + third)} ${r1(topY)}V${r1(topY + row)}M${r1(left + 2 * third)} ${r1(topY)}V${r1(topY + row)}M${r1(left + third)} ${r1(topY + nodeH - row)}V${r1(topY + nodeH)}M${r1(left + 2 * third)} ${r1(topY + nodeH - row)}V${r1(topY + nodeH)}`
    const cell = (k: number, yy: number, text: string, strong = false) =>
      `<text x="${r1(left + third * k + third / 2)}" y="${r1(yy)}" text-anchor="middle" font-size="11"${strong ? ' font-weight="700"' : ''} fill="${palette.axis}">${text}</text>`
    const name = names[n.task]
    // Il codice e il nome, in mezzo alla fascia centrale.
    const middle = topY + nodeH / 2
    const idY = middle + 4 - 6.5 * name.length
    out.push(
      `<g class="plan-task" data-task="${n.task}"><title>${escapeXml(taskTitle(t, plan, undefined))}</title>`,
      `<rect x="${r1(left)}" y="${r1(topY)}" width="${NODE_W}" height="${nodeH}" rx="4" fill="${palette.halo}" stroke="${color}" stroke-width="${t.critical ? 2 : 1.2}"/>`,
      `<path d="${lines}" stroke="${color}" stroke-width="0.9" opacity="0.8"/>`,
      cell(0, topY + 13.5, num(t.es)),
      cell(1, topY + 13.5, num(t.duration)),
      cell(2, topY + 13.5, num(t.ef)),
      `<text x="${r1(x)}" y="${r1(idY)}" text-anchor="middle" font-size="12.5" font-weight="700" fill="${t.critical ? palette.loss : palette.axis}">${escapeXml(fitText(t.id, 12.5, NODE_W - 12))}</text>`,
      ...name.map((text, k) => `<text x="${r1(x)}" y="${r1(idY + 13 + NAME_LINE * k)}" text-anchor="middle" font-size="10.5" fill="${palette.text}">${escapeXml(text)}</text>`),
      cell(0, topY + nodeH - 5.5, num(t.ls)),
      cell(1, topY + nodeH - 5.5, num(t.slack), t.critical),
      cell(2, topY + nodeH - 5.5, num(t.lf)),
      '</g>',
    )
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" ${FONT} role="img" aria-label="Reticolo del progetto">${out.join('')}</svg>`
  return { svg, width, height }
}

// ——— La legenda ———

export type PlanSwatch = 'critical' | 'normal' | 'slack' | 'milestone' | 'done' | 'node'

export interface PlanLegend {
  items: { swatch: PlanSwatch; label: string }[]
  /** Le righe sotto: il percorso critico, la durata, il controllo dei tempi scritti. */
  notes: string[]
}

export function planLegend(s: Schedule, plan: PlanTable, kind: 'gantt' | 'reticolo', start?: Date): PlanLegend {
  const items: PlanLegend['items'] = []
  const hasCritical = s.tasks.some((t) => t.critical)
  if (kind === 'gantt') {
    if (hasCritical) items.push({ swatch: 'critical', label: 'Attività critica (senza margine)' })
    if (s.tasks.some((t) => !t.critical)) items.push({ swatch: 'normal', label: 'Attività con margine' })
    if (s.tasks.some((t) => t.slack > EPS)) items.push({ swatch: 'slack', label: 'Margine (quanto può slittare)' })
    if (s.tasks.some((t) => t.duration <= EPS)) items.push({ swatch: 'milestone', label: 'Traguardo' })
    if (plan.has.done) items.push({ swatch: 'done', label: 'Fatto (la parte piena)' })
  } else if (hasCritical) {
    items.push({ swatch: 'critical', label: 'Attività e legami critici' })
  }
  const notes: string[] = []
  if (kind === 'reticolo') notes.push('In ogni riquadro: sopra l\'inizio al più presto, la durata e la fine al più presto; sotto l\'inizio al più tardi, il margine e la fine al più tardi')
  const paths = s.paths.map((p) => p.map((i) => s.tasks[i].id).join(' → '))
  if (paths.length) notes.push(`${paths.length > 1 ? 'Percorsi critici' : 'Percorso critico'}: ${paths.join('; ')}`)
  let duration = `Durata del progetto: ${amount(s.end, plan.working ? 'giorni lavorativi' : plan.unit)}`
  if (start && kind === 'gantt' && hasDates(plan.unit) && s.tasks.length) {
    const last = s.tasks.reduce((a, t) => (t.ef > a.ef ? t : a))
    duration += ` (dal ${dateText(dayOf(start, 0, plan.unit, plan.working))} al ${dateText(taskDates(last, start, plan.unit, plan.working)[1])})`
  }
  notes.push(duration)
  if (s.checked) notes.push(`✓ I tempi scritti nella tabella sono giusti (${s.checked})`)
  return { items, notes }
}

/** Il quadratino della legenda in SVG, largo 20 e alto 14, con l'angolo in alto a sinistra in (x, y). */
export function planSwatchSvg(swatch: PlanSwatch, palette: Palette, x: number, y: number): string {
  switch (swatch) {
    case 'critical':
      return `<rect x="${x + 1}" y="${y + 3}" width="18" height="8" rx="2" fill="${palette.loss}"/>`
    case 'normal':
      return `<rect x="${x + 1}" y="${y + 3}" width="18" height="8" rx="2" fill="${palette.series[0]}"/>`
    case 'slack':
      return `<path d="M${x + 1} ${y + 7}H${x + 18}M${x + 18} ${y + 3}V${y + 11}" stroke="${palette.axis}" stroke-width="1.5"/>`
    case 'milestone':
      return `<path d="M${x + 10} ${y}l7 7l-7 7l-7 -7z" fill="${palette.axis}"/>`
    case 'done':
      return `<rect x="${x + 1}" y="${y + 3}" width="18" height="8" rx="2" fill="${palette.series[0]}" fill-opacity="0.32" stroke="${palette.series[0]}"/><rect x="${x + 1}" y="${y + 3}" width="10" height="8" rx="2" fill="${palette.series[0]}"/>`
    case 'node':
      return `<rect x="${x + 1}" y="${y}" width="18" height="14" rx="2" fill="none" stroke="${palette.axis}" stroke-width="1.2"/><path d="M${x + 1} ${y + 4.5}H${x + 19}M${x + 1} ${y + 9.5}H${x + 19}" stroke="${palette.axis}" stroke-width="0.9"/>`
  }
}
