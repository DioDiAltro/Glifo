/**
 * Le attività di un progetto da una tabella della nota, per il diagramma di Gantt e il reticolo
 * (le righe `gantt: A1:E9` e `reticolo: A1:E9` del blocco ```grafico, vedi src/graph/schedule.ts).
 * Come negli esercizi di Gestione del progetto: una riga per attività, con il codice nella prima
 * colonna (A, B, C… o 1, 2, 3…) e le altre colonne riconosciute dal nome scritto nella prima riga:
 * la durata (Durata, Giorni, Settimane…; l'unità tra parentesi, «Durata (settimane)», e i giorni
 * lavorativi), le attività precedenti (Precedenti, Predecessori…), chi la fa (Chi, Risorse,
 * Responsabile…), la descrizione e quanto è fatto (Fatto, Avanzamento). Se ci sono anche i tempi
 * calcolati a mano (inizio e fine al più presto e al più tardi, i margini), il disegno li controlla.
 * I nomi delle colonne si riconoscono anche in inglese (Duration, Predecessors, Who…), come quelli
 * del modello pronto con Glifo in inglese. L'unità (`unit`) resta la parola italiana: è un codice per
 * i disegni (src/graph/gantt.ts).
 */
import { texts } from '../i18n'
import { noTable, parseRange } from './chart'
import { SheetEvaluator, type CellResult } from './evaluate'
import { isFormula } from './formula'
import { formatValue, ITALIAN, shownStyle, type NumberStyle } from './format'
import { parseSheet, type SheetModel } from './model'
import type { CellRange } from './ops'
import { rangeName } from './refs'

const T = texts({
  badRange: ['Scrivi le celle delle attività come in Excel, per esempio A1:E9', 'Write the cells of the activities as in Excel, for example A1:E9'],
  twoColumns: ['Servono almeno due colonne: il codice dell\'attività e la durata', 'At least two columns are needed: the activity code and the duration'],
  noNames: [
    'Nella prima riga delle celle servono i nomi delle colonne: Attività, Durata, Precedenti…',
    'The first row of the cells needs the names of the columns: Activity, Duration, Predecessors…',
  ],
  noDuration: [
    'Tra le colonne manca la durata: chiamala «Durata» (o «Durata (settimane)», «Giorni lavorativi»…)',
    'The duration column is missing: call it “Duration” (or “Duration (weeks)”, “Working days”…)',
  ],
  noActivities: ['Sotto i nomi delle colonne servono le attività, una per riga', 'Below the names of the columns you need the activities, one per row'],
  tooMany: (max: number) => [`Le attività sono troppe: il disegno ne mostra al massimo ${max}`, `There are too many activities: the drawing shows at most ${max}`],
})

/** I tempi che una tabella può avere già scritti, da controllare. */
export type PlanTime = 'es' | 'ef' | 'ls' | 'lf' | 'slack' | 'free'

export interface PlanActivity {
  /** La riga nella tabella, come in Excel (da 1): serve ai messaggi. */
  row: number
  /** Il codice dell'attività (A, B, 1, 2…), come è scritto nella prima colonna. */
  id: string
  /** La descrizione ('' se non c'è la colonna). */
  name: string
  /** La durata; null se nella cella non c'è un numero. */
  duration: number | null
  /** Le attività precedenti come sono scritte: «A, B», «2FI+3». */
  after: string
  /** Chi la fa ('' se non si sa). */
  who: string
  /** Quanto è fatto, da 0 a 1; null se non si sa. */
  done: number | null
  /** I tempi scritti nella tabella, da controllare. */
  given: Partial<Record<PlanTime, number>>
}

export interface PlanTable {
  /** L'intervallo, come nella riga del blocco (A1:E9). */
  range: string
  /** L'unità delle durate, al plurale: giorni, settimane, ore, mesi… */
  unit: string
  /** Giorni lavorativi: con una data d'inizio si saltano il sabato e la domenica. */
  working: boolean
  /** Le colonne che ci sono, oltre al codice e alla durata. */
  has: { after: boolean; who: boolean; done: boolean; name: boolean }
  /** I tempi che la tabella ha già scritti (le colonne da controllare). */
  checks: PlanTime[]
  activities: PlanActivity[]
}

/** Le attività per il disegno, o perché non ci sono (il messaggio sotto il grafico). */
export type PlanData = { plan: PlanTable; error?: undefined } | { plan?: undefined; error: string }

/** Al massimo tante attività: il disegno deve restare leggibile. */
export const MAX_ACTIVITIES = 150

type Role = 'after' | 'who' | 'done' | 'name' | 'duration' | PlanTime

/** Il nome di una colonna senza accenti e in minuscolo: «Attività precedenti» → «attivita precedenti». */
function plain(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// Dal più preciso al più generico: «margine libero» prima di «margine», «inizio al più tardi» prima di «inizio».
// Anche i nomi inglesi: Duration, Predecessors, Who, Description, Early start…
const ROLES: [Role, RegExp][] = [
  ['free', /margine libero|^ml\b|free float|slittamento libero|free slack|^ff\b/],
  ['slack', /^margine|slack|slittamento|scorrimento|float|^mt\b|^m\.? ?t\.?$|^tf\b/],
  ['ls', /inizio (al )?piu tardi|inizio massimo|^ls\b|latest start|late start/],
  ['lf', /fine (al )?piu tardi|fine massima|^lf\b|latest finish|late finish/],
  ['es', /inizio (al )?piu presto|inizio minimo|^es\b|earliest start|early start|^inizio\b|^start\b/],
  ['ef', /fine (al )?piu presto|fine minima|^ef\b|earliest finish|early finish|^fine\b|^finish\b|^end\b/],
  ['after', /precedent|predecessor|precedenz|dipende|^dopo\b|vincol|prerequisit|^prec\b|depends|dependenc|^after\b/],
  ['duration', /^(durata|durate|giorni|gg\b|settiman|sett\b|ore\b|mesi\b|tempo|tempi|duration|days?\b|weeks?\b|hours?\b|months?\b|working days|time\b)/],
  ['done', /^(fatt[oa]|avanzament|completament|% ?complet|progresso|stato|done\b|progress|complete|status)/],
  ['who', /^(chi\b|risors|responsabil|persona|persone|reparto|ruolo|addett|team|squadra|gruppo|assegnat|esecutor|addetto|who\b|resource|owner|assign|person|people|role|staff)/],
  ['name', /^(descrizione|nome|attivita|fase|compito|lavoro|task|operazion|denominazion|description|name\b|activity|phase|job|work\b)/],
]

/** Che cosa contiene una colonna, dal suo nome (null se non si riconosce). */
export function columnRole(header: string): Role | null {
  const h = plain(header)
  if (!h) return null
  for (const [role, re] of ROLES) if (re.test(h)) return role
  return null
}

/**
 * L'unità delle durate dal nome della colonna: «Durata (settimane)», «Giorni lavorativi», anche in
 * inglese («Duration (weeks)», «Working days»). L'unità è la parola italiana, un codice per i disegni.
 */
export function durationUnit(header: string): { unit: string; working: boolean } {
  const h = plain(header)
  if (/lavorativ|working|business day/.test(h)) return { unit: 'giorni', working: true }
  if (/settiman|\bsett\b|\bweeks?\b/.test(h)) return { unit: 'settimane', working: false }
  if (/\bore\b|\(h\)|\bhours?\b/.test(h)) return { unit: 'ore', working: false }
  if (/\bmes|\bmonths?\b/.test(h)) return { unit: 'mesi', working: false }
  if (/minut/.test(h)) return { unit: 'minuti', working: false }
  if (/\banni\b|\banno\b|\byears?\b/.test(h)) return { unit: 'anni', working: false }
  return { unit: 'giorni', working: false }
}

type Results = Pick<SheetEvaluator, 'result'>

const isNumber = (res: CellResult) => typeof res.value === 'number' && Number.isFinite(res.value)

/**
 * Il testo di una cella com'è scritto (i codici 1,2 restano «1,2», non 1.2); di una formula, il
 * risultato: all'italiana per i codici e le precedenti (`ITALIAN`), così il progetto è lo stesso in
 * tutte e due le lingue, come si mostra per la descrizione e per chi la fa.
 */
function cellText(model: SheetModel, sheet: Results, row: number, col: number, style: NumberStyle = ITALIAN): string {
  const input = model.cells[row]?.[col]?.input ?? ''
  if (!isFormula(input)) return (input.startsWith("'") ? input.slice(1) : input).trim()
  const res = sheet.result(row, col)
  return formatValue(res.value, res.format, style).trim()
}

/** Le colonne dell'intervallo con il loro ruolo, dai nomi della prima riga. */
function columnsOf(sheet: Results, r: CellRange): Map<Role, number> | null {
  const roles = new Map<Role, number>()
  let text = 0
  for (let c = r.left; c <= r.right; c++) {
    const res = sheet.result(r.top, c)
    // Come in Excel: la riga dei nomi non ha numeri.
    if (isNumber(res)) return null
    if (typeof res.value !== 'string' || !res.value.trim()) continue
    text++
    if (c === r.left) continue
    const role = columnRole(res.value)
    if (role && !roles.has(role)) roles.set(role, c)
  }
  return text ? roles : null
}

/** È una tabella di attività (ha la durata e le precedenti): il pulsante «Grafico» propone il Gantt e il reticolo. */
export function isPlanRange(model: SheetModel, r: CellRange): boolean {
  if (r.right <= r.left) return false
  const roles = columnsOf(new SheetEvaluator(model), r)
  return !!roles && roles.has('duration') && roles.has('after')
}

/** Le attività dell'intervallo `range` della tabella `source` (il testo del blocco ```tabella; null se non c'è). */
export function planData(source: string | null | undefined, range: string): PlanData {
  if (source == null) return { error: noTable() }
  const r = parseRange(range)
  if (!r) return { error: T.badRange }
  const model = parseSheet(source)
  return planFrom(model, new SheetEvaluator(model), r)
}

export function planFrom(model: SheetModel, sheet: Results, r: CellRange): PlanData {
  if (r.right === r.left) return { error: T.twoColumns }
  const roles = columnsOf(sheet, r)
  if (!roles) return { error: T.noNames }
  const durationCol = roles.get('duration')
  if (durationCol === undefined) return { error: T.noDuration }
  const { unit, working } = durationUnit(String(sheet.result(r.top, durationCol).value))
  const col = (role: Role) => roles.get(role) ?? -1
  const checks = (['es', 'ef', 'ls', 'lf', 'slack', 'free'] as const).filter((t) => roles.has(t))
  const activities: PlanActivity[] = []
  for (let row = r.top + 1; row <= r.bottom; row++) {
    const id = cellText(model, sheet, row, r.left)
    const durationRes = sheet.result(row, durationCol)
    const filled = Array.from({ length: r.right - r.left + 1 }, (_, i) => cellText(model, sheet, row, r.left + i)).some(Boolean)
    if (!filled) continue
    const text = (role: Role, style?: NumberStyle) => (col(role) >= 0 ? cellText(model, sheet, row, col(role), style) : '')
    const number = (role: Role): number | null => {
      if (col(role) < 0) return null
      const res = sheet.result(row, col(role))
      return isNumber(res) ? (res.value as number) : null
    }
    let done = number('done')
    if (done !== null) {
      const percent = sheet.result(row, col('done')).format.kind === 'percent'
      done = Math.max(0, Math.min(1, !percent && done > 1 ? done / 100 : done))
    }
    const given: Partial<Record<PlanTime, number>> = {}
    for (const t of checks) {
      const v = number(t)
      if (v !== null) given[t] = v
    }
    activities.push({
      row: row + 1,
      id,
      name: text('name', shownStyle()),
      duration: isNumber(durationRes) ? (durationRes.value as number) : null,
      after: text('after'),
      who: text('who', shownStyle()),
      done,
      given,
    })
  }
  if (!activities.length) return { error: T.noActivities }
  if (activities.length > MAX_ACTIVITIES) return { error: T.tooMany(MAX_ACTIVITIES) }
  return {
    plan: {
      range: rangeName(r.top, r.left, r.bottom, r.right),
      unit,
      working,
      has: { after: roles.has('after'), who: roles.has('who'), done: roles.has('done'), name: roles.has('name') },
      checks,
      activities,
    },
  }
}
