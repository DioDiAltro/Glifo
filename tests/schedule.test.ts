import { describe, expect, it } from 'vitest'
import { columnRole, durationUnit, isPlanRange, planData, type PlanTable } from '../src/spreadsheet/plan'
import { parseSheet } from '../src/spreadsheet/model'
import { TEMPLATES } from '../src/spreadsheet/templates'
import { parseLinks, schedule, type Schedule } from '../src/graph/schedule'

const gantt = TEMPLATES.find((t) => t.name === 'Diagramma di Gantt')!.source

function plan(source: string, range = 'A1:E9'): PlanTable {
  const data = planData(source, range)
  expect(data.error).toBeUndefined()
  return data.plan!
}

/** I tempi di ogni attività: [codice, ES, EF, LS, LF, margine totale, margine libero]. */
function times(s: Schedule): [string, number, number, number, number, number, number][] {
  return s.tasks.map((t) => [t.id, t.es, t.ef, t.ls, t.lf, t.slack, t.free])
}

const table = (rows: string[]) => ['| Attività | Durata | Precedenti |', '| --- | --- | --- |', ...rows].join('\n')

describe('le attività di un progetto da una tabella', () => {
  it('riconosce le colonne dal nome, anche senza accenti e con l\'unità', () => {
    expect(columnRole('Durata (giorni)')).toBe('duration')
    expect(columnRole('Attività precedenti')).toBe('after')
    expect(columnRole('Predecessori')).toBe('after')
    expect(columnRole('Chi la fa')).toBe('who')
    expect(columnRole('Risorse')).toBe('who')
    expect(columnRole('Descrizione')).toBe('name')
    expect(columnRole('% completato')).toBe('done')
    expect(columnRole('Inizio al più presto')).toBe('es')
    expect(columnRole('Inizio al piu tardi')).toBe('ls')
    expect(columnRole('Fine al più tardi')).toBe('lf')
    expect(columnRole('Margine libero')).toBe('free')
    expect(columnRole('Margine totale')).toBe('slack')
    expect(columnRole('Prezzo')).toBeNull()
    expect(durationUnit('Durata (settimane)')).toEqual({ unit: 'settimane', working: false })
    expect(durationUnit('Giorni lavorativi')).toEqual({ unit: 'giorni', working: true })
    expect(durationUnit('Durata')).toEqual({ unit: 'giorni', working: false })
  })

  it('legge il modello «Diagramma di Gantt»', () => {
    const p = plan(gantt)
    expect(p.range).toBe('A1:E9')
    expect(p.unit).toBe('giorni')
    expect(p.has).toEqual({ after: true, who: true, done: false, name: true })
    expect(p.activities).toHaveLength(8)
    expect(p.activities[5]).toMatchObject({ row: 7, id: 'F', name: 'Collaudo', duration: 4, after: 'D, E', who: 'Collaudatore', done: null })
    expect(isPlanRange(parseSheet(gantt), { top: 0, left: 0, bottom: 8, right: 4 })).toBe(true)
    // Il punto di pareggio non è una tabella di attività.
    const pareggio = parseSheet(TEMPLATES.find((t) => t.name === 'Punto di pareggio')!.source)
    expect(isPlanRange(pareggio, { top: 7, left: 0, bottom: 12, right: 4 })).toBe(false)
  })

  it('dice perché le attività non ci sono', () => {
    expect(planData(null, 'A1:C3').error).toMatch(/non c'è una tabella/)
    expect(planData(gantt, 'A1').error).toMatch(/come in Excel/)
    expect(planData(gantt, 'A1:A9').error).toMatch(/almeno due colonne/)
    expect(planData('| A | 3 |\n| B | 2 |', 'A1:B2').error).toMatch(/nomi delle colonne/)
    expect(planData('| Attività | Chi |\n| --- | --- |\n| A | Io |', 'A1:B2').error).toMatch(/manca la durata/)
    expect(planData('| Attività | Durata |\n| --- | --- |', 'A1:B3').error).toMatch(/servono le attività/)
  })

  it('quanto è fatto: in percentuale, o un numero fino a 100', () => {
    const p = plan('| Attività | Durata | Fatto |\n| --- | --- | --- |\n| A | 3 | 50% |\n| B | 2 | 25 |\n| C | 1 |  |', 'A1:C4')
    expect(p.activities.map((a) => a.done)).toEqual([0.5, 0.25, null])
  })
})

describe('il percorso critico', () => {
  it('calcola i tempi del modello: in avanti, all\'indietro e i margini', () => {
    const s = schedule(plan(gantt))
    expect(s.ok).toBe(true)
    expect(s.problems).toEqual([])
    expect(s.end).toBe(23)
    expect(times(s)).toEqual([
      ['A', 0, 5, 0, 5, 0, 0],
      ['B', 5, 9, 5, 9, 0, 0],
      ['C', 5, 8, 8, 11, 3, 0],
      ['D', 9, 17, 9, 17, 0, 0],
      ['E', 8, 14, 11, 17, 3, 3],
      ['F', 17, 21, 17, 21, 0, 0],
      ['G', 21, 23, 21, 23, 0, 0],
      ['H', 21, 22, 22, 23, 1, 1],
    ])
    expect(s.tasks.filter((t) => t.critical).map((t) => t.id)).toEqual(['A', 'B', 'D', 'F', 'G'])
    expect(s.paths.map((p) => p.map((i) => s.tasks[i].id).join(' → '))).toEqual(['A → B → D → F → G'])
  })

  it('legge le precedenti scritte in tanti modi', () => {
    const ids = new Map([['a', 0], ['b', 1], ['c', 2], ['1', 3], ['2', 4]])
    expect(parseLinks('A, B', ids).links.map((l) => l.from)).toEqual([0, 1])
    expect(parseLinks('a;b', ids).links.map((l) => l.from)).toEqual([0, 1])
    expect(parseLinks('A e C', ids).links.map((l) => l.from)).toEqual([0, 2])
    expect(parseLinks('A B C', ids).links.map((l) => l.from)).toEqual([0, 1, 2])
    expect(parseLinks('-', ids).links).toEqual([])
    expect(parseLinks('nessuna', ids).links).toEqual([])
    // Come in Project: il tipo del legame e lo scarto.
    expect(parseLinks('BII', ids).links).toEqual([{ from: 1, type: 'II', lag: 0 }])
    expect(parseLinks('B FF+2', ids).links).toEqual([{ from: 1, type: 'FF', lag: 2 }])
    expect(parseLinks('C+3 gg', ids).links).toEqual([{ from: 2, type: 'FI', lag: 3 }])
    expect(parseLinks('A-1', ids).links).toEqual([{ from: 0, type: 'FI', lag: -1 }])
    expect(parseLinks('2SS+1,5', ids).links).toEqual([{ from: 4, type: 'II', lag: 1.5 }])
    // «1,2» scritto in una cella con i codici numerici: sono due attività, non 1,2.
    expect(parseLinks('1,2', ids).links.map((l) => l.from)).toEqual([3, 4])
    expect(parseLinks('A, X', ids).problems[0]).toMatch(/«X»/)
  })

  it('i codici numerici: «1,2» nella cella sono le attività 1 e 2 (e «2,10» la 2 e la 10, non 2,1)', () => {
    const s = schedule(plan('| N. | Durata | Precedenti |\n| --- | --- | --- |\n| 1 | 2 |  |\n| 2 | 3 |  |\n| 3 | 1 | 1,2 |', 'A1:C4'))
    expect(s.ok).toBe(true)
    expect(times(s)[2]).toEqual(['3', 3, 4, 3, 4, 0, 0])
    const ten = schedule(plan('| N. | Durata | Precedenti |\n| --- | --- | --- |\n| 2 | 3 |  |\n| 10 | 5 |  |\n| 11 | 1 | 2,10 |', 'A1:C4'))
    expect(ten.problems).toEqual([])
    expect(times(ten)[2]).toEqual(['11', 5, 6, 5, 6, 0, 0])
  })

  it('i legami inizio-inizio, fine-fine e con lo scarto', () => {
    const s = schedule(plan(table(['| A | 4 |  |', '| B | 2 | A II+1 |', '| C | 3 | A FF |', '| D | 1 | B+2 |']), 'A1:C5'))
    expect(s.ok).toBe(true)
    const t = Object.fromEntries(s.tasks.map((task) => [task.id, [task.es, task.ef]]))
    expect(t).toEqual({ A: [0, 4], B: [1, 3], C: [1, 4], D: [5, 6] })
    expect(s.end).toBe(6)
  })

  it('le attività di durata zero sono traguardi, e possono essere critiche', () => {
    const s = schedule(plan(table(['| A | 3 |  |', '| B | 0 | A |', '| C | 2 | B |']), 'A1:C4'))
    expect(times(s).map((r) => r.slice(0, 3))).toEqual([['A', 0, 3], ['B', 3, 3], ['C', 3, 5]])
    expect(s.paths.map((p) => p.map((i) => s.tasks[i].id))).toEqual([['A', 'B', 'C']])
  })

  it('con più percorsi critici li trova tutti', () => {
    const s = schedule(plan(table(['| A | 2 |  |', '| B | 3 | A |', '| C | 3 | A |', '| D | 1 | B, C |']), 'A1:C5'))
    expect(s.paths.map((p) => p.map((i) => s.tasks[i].id).join(''))).toEqual(['ABD', 'ACD'])
  })

  it('dice cosa non va: codici che mancano o ripetuti, durate, precedenti sbagliate, giri', () => {
    const problems = (rows: string[]) => schedule(plan(table(rows), `A1:C${rows.length + 1}`)).problems.map((p) => `${p.row}: ${p.message}`)
    expect(problems(['| A | 2 |  |', '|  | 3 | A |'])).toEqual(['3: manca il codice dell\'attività, nella prima colonna'])
    expect(problems(['| A | 2 |  |', '| A | 3 |  |'])).toEqual(['3: il codice A c\'è già alla riga 2: ogni attività ha il suo'])
    expect(problems(['| A | due |  |'])).toEqual(['2: manca la durata di A (un numero)'])
    expect(problems(['| A | -2 |  |'])).toEqual(['2: la durata di A è negativa'])
    expect(problems(['| A | 2 | Z |'])[0]).toMatch(/^2: tra le precedenti c'è «Z»/)
    expect(problems(['| A | 2 | A |'])).toEqual(['2: A non può venire dopo sé stessa'])
    expect(problems(['| A | 2 | C |', '| B | 2 | A |', '| C | 2 | B |'])[0]).toMatch(/si aspettano a vicenda/)
    const cycle = schedule(plan(table(['| A | 2 | C |', '| B | 2 | A |', '| C | 2 | B |']), 'A1:C4'))
    expect(cycle.ok).toBe(false)
    expect(cycle.problems[0].message).toBe('A, B e C si aspettano a vicenda (B dopo A, C dopo B, A dopo C): così il progetto non può cominciare')
  })

  it('controlla i tempi calcolati a mano nella tabella', () => {
    const source = [
      '| Attività | Durata | Precedenti | Inizio al più presto | Fine al più presto | Inizio al più tardi | Fine al più tardi | Margine |',
      '| --- | --- | --- | --- | --- | --- | --- | --- |',
      '| A | 3 |  | 0 | 3 | 0 | 3 | 0 |',
      '| B | 2 | A | 3 | 5 | 4 | 6 | 1 |',
      '| C | 3 | A | 3 | 6 | 3 | 6 | 0 |',
    ].join('\n')
    const right = schedule(plan(source, 'A1:H4'))
    expect(right.checks).toEqual([])
    expect(right.checked).toBe(15)
    const wrong = schedule(plan(source.replace('| 4 | 6 | 1 |', '| 3 | 6 | 1 |'), 'A1:H4'))
    expect(wrong.checks).toEqual([{ row: 3, message: 'l\'inizio al più tardi di B è 4, non 3' }])
    expect(wrong.checked).toBe(0)
  })
})
