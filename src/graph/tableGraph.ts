/**
 * I grafici dei numeri di una tabella della nota (src/spreadsheet/chart.ts): la riga `dati: A8:D13`
 * del blocco ```grafico disegna una linea con i pallini per ogni colonna, contro la prima. Con
 * `pareggio: Ricavi, Costi totali` anche le aree tra le due linee, l'utile dove i ricavi stanno sopra
 * e la perdita dove stanno sotto, e il punto di pareggio dove si incontrano (il diagramma di
 * redditività dell'economia aziendale).
 */
import { NO_TABLE, parseRange, REVENUE, TOTAL_COST, type ChartData } from '../spreadsheet/chart'
import { formatNumber, roundTo, type Format } from '../spreadsheet/format'
import { colName } from '../spreadsheet/refs'
import type { GraphError, GraphItem } from './spec'

const DATA_LINE = /^(dati|pareggio)\s*:\s*(.*)$/i

/** Una riga `dati: …` o `pareggio: …` (null se la riga è altro). */
export function dataLine(text: string): { key: 'dati' | 'pareggio'; value: string } | null {
  const m = DATA_LINE.exec(text.trim())
  return m ? { key: m[1].toLowerCase() as 'dati' | 'pareggio', value: m[2].trim() } : null
}

/** L'intervallo della riga `dati:` del blocco (null se non c'è): i dati li prende chi disegna, dalla tabella sopra. */
export function dataRange(source: string): string | null {
  for (const line of source.split('\n')) {
    const data = dataLine(line)
    if (data?.key === 'dati') return data.value
  }
  return null
}

/** I numeri della tabella sopra il grafico, scritti dall'anteprima in `data-table` (vedi render/markdown.ts); null se non ci sono. */
export function readChart(block: HTMLElement): ChartData | null {
  if (block.dataset.table === undefined) return null
  try {
    const data = JSON.parse(block.dataset.table) as ChartData
    return data && (typeof data.error === 'string' || (data.table && Array.isArray(data.table.rows))) ? data : null
  } catch {
    return null
  }
}

/** Un nome scritto come testo in LaTeX, per la legenda: \text{Costi totali}. */
export function textLabel(name: string): string {
  const escaped = name.replace(/[\\{}$&#%_^~]/g, (c) =>
    c === '\\' ? '\\textbackslash{}' : c === '^' ? '\\textasciicircum{}' : c === '~' ? '\\textasciitilde{}' : `\\${c}`,
  )
  return `\\text{${escaped}}`
}

type Point = [number, number]

interface DataLine {
  line: number
  text: string
  key: 'dati' | 'pareggio'
  value: string
}

/**
 * Le linee dei dati (`series`) e, con `pareggio:`, le aree dell'utile e della perdita (`gap`) e i
 * punti di pareggio (`mark`). I colori delle linee seguono quelli delle altre righe (da `slot`).
 */
export function tableItems(lines: readonly DataLine[], data: ChartData | null | undefined, slot: number): { items: GraphItem[]; errors: GraphError[] } {
  const items: GraphItem[] = []
  const errors: GraphError[] = []
  const fail = (l: DataLine, message: string) => errors.push({ line: l.line, text: l.text, message })
  const dati = lines.find((l) => l.key === 'dati')
  for (const l of lines) {
    if (l.key === 'dati' && l !== dati) fail(l, 'Un grafico prende i dati da un intervallo solo: scrivi una riga dati: sola')
  }
  const pareggi = lines.filter((l) => l.key === 'pareggio')
  if (!dati) {
    for (const l of pareggi) fail(l, 'Il punto di pareggio è tra due linee dei dati: scrivi prima la riga dati: con le celle della tabella (dati: A8:D13)')
    return { items, errors }
  }
  if (!data?.table) {
    fail(dati, data?.error ?? NO_TABLE)
    return { items, errors }
  }
  const table = data.table
  const xFormat = table.formats[0]
  const series: { name: string; letter: string; points: Point[]; format: Format }[] = []
  const left = parseRange(table.range)?.left ?? 0
  for (let c = 1; c < table.names.length; c++) {
    const points = table.rows.flatMap((row): Point[] => (row[c] === null || row[0] === null ? [] : [[row[0], row[c]!]]))
    if (!points.length) continue
    const format = table.formats[c]
    series.push({ name: table.names[c], letter: colName(left + c), points, format })
    items.push({
      kind: 'series',
      line: dati.line,
      label: textLabel(table.names[c]),
      slot: slot++,
      points,
      texts: points.map(([x, y]) => `(${formatNumber(x, xFormat)}; ${formatNumber(y, format)})`),
    })
  }
  for (const l of pareggi) {
    const names = l.value.split(/[,;]/).map((s) => s.trim()).filter(Boolean)
    if (names.length !== 2) {
      fail(l, 'Scrivi le due linee, prima i ricavi e poi i costi: pareggio: Ricavi, Costi totali')
      continue
    }
    const found = names.map((name) => series.find((s) => s.name.toLowerCase() === name.toLowerCase() || s.letter === name.toUpperCase()))
    const missing = names.find((_, i) => !found[i])
    if (missing) {
      fail(l, `Tra i dati non c'è la colonna «${missing}»: scrivi i nomi come nella prima riga dei dati (pareggio: Ricavi, Costi totali)`)
      continue
    }
    // Prima i ricavi e poi i costi; scritti al contrario, con i loro nomi, si capisce lo stesso.
    let [revenue, cost] = found as (typeof series)[number][]
    if (TOTAL_COST.test(revenue.name) && REVENUE.test(cost.name)) [revenue, cost] = [cost, revenue]
    const meeting = breakEven(revenue.points, cost.points)
    if (!meeting) {
      fail(l, 'Le due linee non hanno valori per le stesse x: servono almeno due righe in comune')
      continue
    }
    if (meeting.gain.length) items.push({ kind: 'gap', line: l.line, label: textLabel('Area di utile'), slot: -1, tone: 'gain', polygons: meeting.gain, text: 'Utile' })
    if (meeting.loss.length) items.push({ kind: 'gap', line: l.line, label: textLabel('Area di perdita'), slot: -1, tone: 'loss', polygons: meeting.loss, text: 'Perdita' })
    for (const [x, y] of meeting.points) {
      items.push({ kind: 'mark', line: l.line, label: textLabel('Punto di pareggio'), slot: -1, x, y, text: 'Punto di pareggio', coords: `(${quantity(x, xFormat)}; ${formatNumber(roundTo(y, 2), revenue.format)})` })
    }
    if (!meeting.points.length) fail(l, 'Le due linee non si incontrano tra i dati della tabella: prova con altre quantità (più grandi o più piccole)')
  }
  return { items, errors }
}

/** La x di un punto trovato (non scritta nella tabella): al massimo due decimali, con i punti delle migliaia. */
function quantity(x: number, format: Format): string {
  if (format.kind !== 'general') return formatNumber(x, format)
  const r = roundTo(x, 2)
  return formatNumber(r, { kind: 'number', decimals: Number.isInteger(r) ? 0 : 2 })
}

/** La linea per i punti (ordinati per x) nel punto x: la retta tra i due vicini. */
function at(points: readonly Point[], x: number): number {
  let i = 1
  while (i < points.length - 1 && points[i][0] < x) i++
  const [x0, y0] = points[i - 1]
  const [x1, y1] = points[i]
  return x1 === x0 ? y1 : y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)
}

/**
 * Dove i ricavi stanno sopra i costi (l'utile) e dove sotto (la perdita), come poligoni tra le due
 * linee, e i punti in cui si incontrano. Null se le due linee non hanno un tratto di x in comune.
 */
export function breakEven(revenue: readonly Point[], cost: readonly Point[]): { gain: Point[][]; loss: Point[][]; points: Point[] } | null {
  const sorted = (p: readonly Point[]) => [...p].sort((a, b) => a[0] - b[0])
  const a = sorted(revenue)
  const b = sorted(cost)
  if (a.length < 2 || b.length < 2) return null
  const lo = Math.max(a[0][0], b[0][0])
  const hi = Math.min(a[a.length - 1][0], b[b.length - 1][0])
  if (!(hi > lo)) return null
  const xs = [...new Set([lo, hi, ...a.map((p) => p[0]), ...b.map((p) => p[0])])].filter((x) => x >= lo && x <= hi).sort((p, q) => p - q)
  // Le x con i due valori, e quelle in cui si incrociano tra una x e l'altra.
  const samples: { x: number; ya: number; yb: number }[] = []
  for (const x of xs) {
    const s = { x, ya: at(a, x), yb: at(b, x) }
    const prev = samples[samples.length - 1]
    if (prev) {
      const d0 = prev.ya - prev.yb
      const d1 = s.ya - s.yb
      if ((d0 < 0 && d1 > 0) || (d0 > 0 && d1 < 0)) {
        const t = d0 / (d0 - d1)
        const cx = prev.x + t * (x - prev.x)
        const cy = prev.ya + t * (s.ya - prev.ya)
        samples.push({ x: cx, ya: cy, yb: cy })
      }
    }
    samples.push(s)
  }
  // Uguali (o quasi: i conti con la virgola) è un punto di pareggio.
  const scale = Math.max(1, ...samples.map((s) => Math.max(Math.abs(s.ya), Math.abs(s.yb))))
  const sign = (s: { ya: number; yb: number }) => (Math.abs(s.ya - s.yb) <= scale * 1e-9 ? 0 : Math.sign(s.ya - s.yb))
  const gain: Point[][] = []
  const loss: Point[][] = []
  const points: Point[] = []
  let run: { sign: number; upper: Point[]; lower: Point[] } | null = null
  const close = () => {
    if (run && run.sign && run.upper.length >= 2) (run.sign > 0 ? gain : loss).push([...run.upper, ...run.lower.reverse()])
    run = null
  }
  samples.forEach((s, i) => {
    const k = sign(s)
    if (k === 0) {
      // Dove sono uguali finisce un tratto e ne comincia un altro; i punti uguali di fila contano una volta.
      if (!i || sign(samples[i - 1]) !== 0) points.push([s.x, (s.ya + s.yb) / 2])
      if (run) {
        run.upper.push([s.x, s.ya])
        run.lower.push([s.x, s.yb])
      }
      close()
      run = { sign: 0, upper: [[s.x, s.ya]], lower: [[s.x, s.yb]] }
      return
    }
    if (run && run.sign === 0) run.sign = k
    run ??= { sign: k, upper: [], lower: [] }
    run.upper.push([s.x, s.ya])
    run.lower.push([s.x, s.yb])
  })
  close()
  return { gain, loss, points }
}
