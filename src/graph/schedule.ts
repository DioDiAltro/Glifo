/**
 * I tempi di un progetto con il metodo del percorso critico (CPM), dalle attività di una tabella
 * (src/spreadsheet/plan.ts): il calcolo in avanti dà l'inizio e la fine al più presto di ogni
 * attività, quello all'indietro l'inizio e la fine al più tardi; il margine (totale) è quanto
 * un'attività può slittare senza allungare il progetto, quello libero quanto può slittare senza
 * spostare le attività dopo di lei. Le attività con il margine zero sono critiche: in fila fanno il
 * percorso critico, lungo quanto il progetto.
 *
 * I legami si scrivono nella colonna delle precedenti: «A, B» (dopo la fine di A e di B), anche con
 * il tipo e lo scarto come in Project: «AII» (inizio-inizio), «BFF+2», «C+3» (3 dopo la fine di C),
 * «D-1»; i tipi sono FI (fine-inizio, quello di sempre), II, FF e IF, anche all'inglese (FS, SS, SF).
 */
import type { PlanActivity, PlanTable, PlanTime } from '../spreadsheet/plan'

export type LinkType = 'FI' | 'II' | 'FF' | 'IF'

export interface Link {
  /** L'attività che viene prima (l'indice in `tasks`). */
  from: number
  type: LinkType
  /** Lo scarto: quanto aspettare dopo (negativo: quanto si può anticipare). */
  lag: number
}

export interface Task {
  row: number
  id: string
  name: string
  who: string
  duration: number
  done: number | null
  /** I legami con le attività che vengono prima. */
  links: Link[]
  /** Inizio e fine al più presto, inizio e fine al più tardi. */
  es: number
  ef: number
  ls: number
  lf: number
  /** Il margine totale e quello libero. */
  slack: number
  free: number
  critical: boolean
}

export interface ScheduleProblem {
  /** La riga della tabella (da 1). */
  row: number
  message: string
}

export interface Schedule {
  tasks: Task[]
  /** La durata del progetto: la fine dell'ultima attività. */
  end: number
  /** I percorsi critici, ognuno con le attività (indici) in ordine. */
  paths: number[][]
  /** Quello che non va nella tabella: con questi problemi i tempi non ci sono (`ok` falso). */
  problems: ScheduleProblem[]
  /** I tempi scritti nella tabella che non tornano (i tempi si calcolano lo stesso). */
  checks: ScheduleProblem[]
  /** I tempi scritti nella tabella che sono stati controllati, tutti giusti (0 se non ce n'erano). */
  checked: number
  ok: boolean
}

/** I conti con la virgola non sono esatti: sotto questo scarto due tempi sono uguali. */
const EPS = 1e-9

const TYPES: Record<string, LinkType> = { FI: 'FI', II: 'II', FF: 'FF', IF: 'IF', FS: 'FI', SS: 'II', SF: 'IF' }
const NONE = /^(-|—|–|\/|nessun[ao]?|niente|nulla)$/i
const LINK = /^(.+?)\s*(?:\(\s*)?(FI|II|FF|IF|FS|SS|SF)?(?:\s*\))?\s*(?:([+-])\s*(\d+(?:[.,]\d+)?)\s*[a-zàèéìòù.]*)?$/i

/** Toglie il rumore delle cifre binarie (0,1 + 0,2 = 0,3). */
function tidy(x: number): number {
  return Math.abs(x) < EPS ? 0 : Number(x.toPrecision(12))
}

/** Il codice per cercarlo, senza maiuscole e spazi in più. */
function key(id: string): string {
  return id.trim().replace(/\s+/g, ' ').toLowerCase()
}

/**
 * I legami scritti in una cella delle precedenti («A, B», «2FI+3; 4II»), con i codici delle attività
 * (`ids`: il codice in minuscolo e il suo indice). Quello che non si capisce va in `problems`.
 */
export function parseLinks(text: string, ids: ReadonlyMap<string, number>): { links: Link[]; problems: string[] } {
  const links: Link[] = []
  const problems: string[] = []
  const s = text.trim()
  if (!s || NONE.test(s)) return { links, problems }
  // La virgola di uno scarto con i decimali («+1,5») non divide: «1,2» sì (le attività 1 e 2).
  for (const raw of s.replace(/([+-]\s*\d+),(\d)/g, '$1.$2').split(/[;,]|\s+e\s+/i)) {
    const item = raw.trim()
    if (!item || NONE.test(item)) continue
    const whole = ids.get(key(item))
    if (whole !== undefined) {
      links.push({ from: whole, type: 'FI', lag: 0 })
      continue
    }
    const m = LINK.exec(item)
    const found = m ? ids.get(key(m[1])) : undefined
    if (m && found !== undefined) {
      const lag = m[4] ? Number(m[4].replace(',', '.')) * (m[3] === '-' ? -1 : 1) : 0
      links.push({ from: found, type: m[2] ? TYPES[m[2].toUpperCase()] : 'FI', lag })
      continue
    }
    // «A B C» con gli spazi: vanno bene se sono tutti codici.
    const parts = item.split(/\s+/)
    if (parts.length > 1 && parts.every((p) => ids.has(key(p)))) {
      for (const p of parts) links.push({ from: ids.get(key(p))!, type: 'FI', lag: 0 })
      continue
    }
    problems.push(`tra le precedenti c'è «${item}», ma non c'è un'attività con questo codice`)
  }
  return { links, problems }
}

/** Di quanto l'inizio di `to` deve stare dopo l'inizio di `from` per il legame: ES(to) ≥ ES(from) + scarto. */
function offset(link: Link, from: number, to: number): number {
  switch (link.type) {
    case 'FI':
      return from + link.lag
    case 'II':
      return link.lag
    case 'FF':
      return from + link.lag - to
    case 'IF':
      return link.lag - to
  }
}

/** Le attività in ordine, ognuna dopo quelle che vengono prima; null se si aspettano a vicenda (con il giro). */
function order(count: number, preds: readonly number[][]): { order: number[] } | { cycle: number[] } {
  const succs: number[][] = Array.from({ length: count }, () => [])
  const waiting = preds.map((p) => p.length)
  preds.forEach((p, i) => p.forEach((from) => succs[from].push(i)))
  const queue = waiting.flatMap((w, i) => (w ? [] : [i]))
  const out: number[] = []
  while (queue.length) {
    const i = queue.shift()!
    out.push(i)
    for (const s of succs[i]) if (--waiting[s] === 0) queue.push(s)
  }
  if (out.length === count) return { order: out }
  // Un giro: si parte da un'attività rimasta e si va indietro finché un'attività torna.
  const left = new Set(waiting.flatMap((w, i) => (w ? [i] : [])))
  let at = [...left][0]
  const seen: number[] = []
  while (!seen.includes(at)) {
    seen.push(at)
    at = preds[at].find((p) => left.has(p))!
  }
  // Ognuna viene prima della seguente; si comincia dalla prima della tabella.
  const cycle = seen.slice(seen.indexOf(at)).reverse()
  const first = cycle.indexOf(Math.min(...cycle))
  return { cycle: [...cycle.slice(first), ...cycle.slice(0, first)] }
}

/** «A, B e C». */
export function listText(items: readonly string[]): string {
  return items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`
}

const TIME_NAMES: Record<PlanTime, string> = {
  es: 'l\'inizio al più presto',
  ef: 'la fine al più presto',
  ls: 'l\'inizio al più tardi',
  lf: 'la fine al più tardi',
  slack: 'il margine totale',
  free: 'il margine libero',
}

/** I tempi del progetto dalle attività della tabella. */
export function schedule(plan: PlanTable): Schedule {
  const acts: readonly PlanActivity[] = plan.activities
  const problems: ScheduleProblem[] = []
  const ids = new Map<string, number>()
  acts.forEach((a, i) => {
    if (!a.id) {
      problems.push({ row: a.row, message: 'manca il codice dell\'attività, nella prima colonna' })
      return
    }
    const k = key(a.id)
    const first = ids.get(k)
    if (first !== undefined) problems.push({ row: a.row, message: `il codice ${a.id} c'è già alla riga ${acts[first].row}: ogni attività ha il suo` })
    else ids.set(k, i)
  })
  const tasks: Task[] = acts.map((a, i) => {
    if (a.duration === null) problems.push({ row: a.row, message: `manca la durata di ${a.id || 'questa attività'} (un numero)` })
    else if (a.duration < 0) problems.push({ row: a.row, message: `la durata di ${a.id} è negativa` })
    const parsed = parseLinks(a.after, ids)
    for (const p of parsed.problems) problems.push({ row: a.row, message: p })
    const links = parsed.links.filter((l) => {
      if (l.from !== i) return true
      problems.push({ row: a.row, message: `${a.id} non può venire dopo sé stessa` })
      return false
    })
    return {
      row: a.row,
      id: a.id,
      name: a.name,
      who: a.who,
      duration: Math.max(0, a.duration ?? 0),
      done: a.done,
      links,
      es: 0,
      ef: 0,
      ls: 0,
      lf: 0,
      slack: 0,
      free: 0,
      critical: false,
    }
  })
  const empty = (ok: boolean): Schedule => ({ tasks, end: 0, paths: [], problems, checks: [], checked: 0, ok })
  if (problems.length) return empty(false)
  const preds = tasks.map((t) => [...new Set(t.links.map((l) => l.from))])
  const sorted = order(tasks.length, preds)
  if ('cycle' in sorted) {
    const names = sorted.cycle.map((i) => tasks[i].id)
    const steps = sorted.cycle.map((i, k) => `${tasks[sorted.cycle[(k + 1) % names.length]].id} dopo ${tasks[i].id}`)
    problems.push({ row: tasks[sorted.cycle[0]].row, message: `${listText(names)} si aspettano a vicenda (${steps.join(', ')}): così il progetto non può cominciare` })
    return empty(false)
  }
  // In avanti: ogni attività comincia appena i suoi legami lo permettono (e non prima dell'inizio).
  for (const i of sorted.order) {
    const t = tasks[i]
    t.es = tidy(Math.max(0, ...t.links.map((l) => tasks[l.from].es + offset(l, tasks[l.from].duration, t.duration))))
    t.ef = tidy(t.es + t.duration)
  }
  const end = tidy(Math.max(0, ...tasks.map((t) => t.ef)))
  // All'indietro: ogni attività comincia al più tardi quando serve a quelle dopo, e finisce entro la fine.
  const succs: { to: number; link: Link }[][] = tasks.map(() => [])
  tasks.forEach((t, i) => t.links.forEach((link) => succs[link.from].push({ to: i, link })))
  for (const i of [...sorted.order].reverse()) {
    const t = tasks[i]
    t.ls = tidy(Math.min(end - t.duration, ...succs[i].map(({ to, link }) => tasks[to].ls - offset(link, t.duration, tasks[to].duration))))
    t.lf = tidy(t.ls + t.duration)
    t.slack = tidy(t.ls - t.es)
    t.critical = t.slack <= EPS
  }
  for (const [i, t] of tasks.entries()) {
    const room = succs[i].map(({ to, link }) => tasks[to].es - t.es - offset(link, t.duration, tasks[to].duration))
    t.free = tidy(Math.max(0, Math.min(end - t.ef, ...room)))
  }
  const schedule: Schedule = { tasks, end, paths: criticalPaths(tasks, succs, end), problems, checks: [], checked: 0, ok: true }
  checkGiven(schedule, acts)
  return schedule
}

/**
 * I percorsi critici: da un'attività critica che comincia all'inizio a una che finisce alla fine,
 * passando per legami senza margine. Al massimo 6 (poi sono troppi da leggere).
 */
function criticalPaths(tasks: readonly Task[], succs: readonly { to: number; link: Link }[][], end: number): number[][] {
  const tight = (from: number, to: number, link: Link) => tasks[from].critical && tasks[to].critical && Math.abs(tasks[to].es - tasks[from].es - offset(link, tasks[from].duration, tasks[to].duration)) <= EPS
  const next = tasks.map((_, i) => succs[i].filter(({ to, link }) => tight(i, to, link)).map(({ to }) => to))
  const hasTightIn = new Set(next.flat())
  const paths: number[][] = []
  const walk = (i: number, path: number[]) => {
    if (paths.length >= 6) return
    const route = [...path, i]
    if (!next[i].length) {
      if (Math.abs(tasks[i].ef - end) <= EPS) paths.push(route)
      return
    }
    for (const to of [...new Set(next[i])]) walk(to, route)
  }
  tasks.forEach((t, i) => {
    if (t.critical && t.es <= EPS && !hasTightIn.has(i)) walk(i, [])
  })
  return paths
}

/** Confronta i tempi scritti nella tabella con quelli calcolati. */
function checkGiven(s: Schedule, acts: readonly PlanActivity[]): void {
  let checked = 0
  acts.forEach((a, i) => {
    const t = s.tasks[i]
    for (const [time, value] of Object.entries(a.given) as [PlanTime, number][]) {
      checked++
      const right = t[time]
      if (Math.abs(right - value) > 1e-6 * Math.max(1, Math.abs(right))) {
        s.checks.push({ row: a.row, message: `${TIME_NAMES[time]} di ${t.id} è ${numberText(right)}, non ${numberText(value)}` })
      }
    }
  })
  s.checked = s.checks.length ? 0 : checked
}

/** Un tempo con la virgola: 2, 2,5, 0,33. */
export function numberText(x: number): string {
  const r = Math.round(x * 100) / 100
  return String(r).replace('.', ',').replace('-', '−')
}
