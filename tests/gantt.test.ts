// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { renderMarkdown } from '../src/render/markdown'
import { hydrateGraphs } from '../src/graph/preview'
import { graphImagesFor } from '../src/graph/file'
import { parseGraph, graphNames } from '../src/graph/spec'
import { parseDate, planBlock, planRange, readPlan } from '../src/graph/planBlock'
import { dayOf, fitText, ganttSvg, networkSvg, planLegend, taskDates, dateText, wrapText } from '../src/graph/gantt'
import { planFigure, planPicture } from '../src/graph/planFigure'
import { schedule } from '../src/graph/schedule'
import { PALETTES } from '../src/graph/svg'
import { planData } from '../src/spreadsheet/plan'
import { TEMPLATES } from '../src/spreadsheet/templates'

const gantt = TEMPLATES.find((t) => t.name === 'Diagramma di Gantt')!.source
const note = (block: string, table = gantt) => `# Progetto\n\n\`\`\`tabella\n${table}\n\`\`\`\n\n\`\`\`grafico\n${block}\n\`\`\`\n`
const light = { theme: 'light', surface: '#fff' } as const

afterEach(() => document.body.replaceChildren())

function preview(src: string): HTMLElement {
  const host = document.createElement('div')
  host.innerHTML = renderMarkdown(src)
  document.body.append(host)
  return host
}

describe('il blocco del diagramma di Gantt e del reticolo', () => {
  it('legge il tipo, le celle, il titolo e la data d\'inizio', () => {
    expect(planRange('titolo: x\ngantt: A1:E9')).toEqual({ kind: 'gantt', range: 'A1:E9', at: { line: 1, text: 'gantt: A1:E9' } })
    expect(planRange('Reticolo: A1:C4')?.kind).toBe('reticolo')
    expect(planRange('y = x^2')).toBeNull()
    const block = planBlock('titolo: Sviluppo del sito\ngantt: A1:E9\ninizio: 12/10/2026')!
    expect(block.title).toBe('Sviluppo del sito')
    expect(block.start?.toISOString()).toBe('2026-10-12T00:00:00.000Z')
    expect(block.errors).toEqual([])
  })

  it('le righe che non c\'entrano sono errori', () => {
    const messages = (src: string) => planBlock(src)!.errors.map((e) => e.message)
    expect(messages('gantt: A1:E9\ny = x^2')[0]).toMatch(/solo le righe titolo:, gantt: e inizio:/)
    expect(messages('gantt: A1:E9\nasse x: tempo')[0]).toMatch(/non ha gli assi/)
    expect(messages('gantt: A1:E9\ngantt: A1:B3')[0]).toMatch(/una riga sola/)
    expect(messages('gantt: A1:E9\nreticolo: A1:E9')[0]).toMatch(/due blocchi/)
    expect(messages('gantt: A1:E9\ninizio: 31/02/2026')[0]).toMatch(/Scrivi la data/)
    expect(messages('reticolo: A1:E9\ninizio: 12/10/2026')[0]).toMatch(/serve al diagramma di Gantt/)
    // In un grafico come gli altri la data d'inizio da sola dice a cosa serve; gantt: non è una formula.
    expect(parseGraph('y = x\ninizio: 12/10/2026').errors[0].message).toMatch(/serve al diagramma di Gantt/)
    expect([...graphNames('gantt: A1:E9\ninizio: 12/10/2026')]).toEqual([])
  })

  it('le date si scrivono in tanti modi', () => {
    const iso = (s: string) => parseDate(s)?.toISOString().slice(0, 10) ?? null
    expect(iso('12/10/2026')).toBe('2026-10-12')
    expect(iso('1-3-26')).toBe('2026-03-01')
    expect(iso('2026-10-12')).toBe('2026-10-12')
    expect(iso('12 ottobre 2026')).toBe('2026-10-12')
    expect(iso('1° gen 2027')).toBe('2027-01-01')
    expect(iso('30/02/2026')).toBeNull()
    expect(iso('domani')).toBeNull()
  })

  it('i giorni lavorativi saltano sabato e domenica', () => {
    const friday = parseDate('9/10/2026')!
    expect(dateText(dayOf(friday, 0, 'giorni', true))).toBe('09/10/2026')
    expect(dateText(dayOf(friday, 1, 'giorni', true))).toBe('12/10/2026')
    expect(dateText(dayOf(friday, 1, 'giorni', false))).toBe('10/10/2026')
    expect(dateText(dayOf(friday, 2, 'settimane', false))).toBe('23/10/2026')
    expect(dateText(dayOf(friday, 3, 'mesi', false))).toBe('09/01/2027')
    // Un sabato come inizio: si comincia il lunedì.
    expect(dateText(dayOf(parseDate('10/10/2026')!, 0, 'giorni', true))).toBe('12/10/2026')
    // Un'attività dal giorno 5 al 8 occupa i giorni 6, 7 e 8; un traguardo al 8 è l'ottavo giorno.
    const start = parseDate('1/10/2026')!
    expect(taskDates({ es: 5, ef: 8, duration: 3 }, start, 'giorni', false).map(dateText)).toEqual(['06/10/2026', '08/10/2026'])
    expect(taskDates({ es: 8, ef: 8, duration: 0 }, start, 'giorni', false).map(dateText)).toEqual(['08/10/2026', '08/10/2026'])
  })
})

describe('il diagramma di Gantt e il reticolo nella nota', () => {
  it('il renderer scrive le attività della tabella sopra', () => {
    const host = preview(note('gantt: A1:E9'))
    const block = host.querySelector<HTMLElement>('.graph-block')!
    const data = readPlan(block)!
    expect(data.error).toBeUndefined()
    expect(data.plan!.activities.map((a) => a.id)).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])
    // Senza tabella sopra, il motivo.
    const alone = preview('```grafico\ngantt: A1:E9\n```\n').querySelector<HTMLElement>('.graph-block')!
    expect(readPlan(alone)?.error).toMatch(/non c'è una tabella/)
    // Un grafico come gli altri non ha le attività.
    expect(preview('```grafico\ny = x\n```\n').querySelector<HTMLElement>('.graph-block')!.dataset.plan).toBeUndefined()
  })

  it('disegna il Gantt con le barre, il margine, la legenda e il percorso critico', () => {
    const host = preview(note('titolo: Sviluppo del sito\ngantt: A1:E9'))
    hydrateGraphs(host, light)
    const block = host.querySelector<HTMLElement>('.graph-block')!
    expect(block.classList.contains('is-plan')).toBe(true)
    expect(block.classList.contains('is-gantt')).toBe(true)
    expect(block.querySelector('.graph-title')?.textContent).toBe('Sviluppo del sito')
    const tasks = block.querySelectorAll('.plan-task')
    expect(tasks).toHaveLength(8)
    expect(tasks[2].querySelector('title')?.textContent).toContain('Margine: 3 giorni (libero: 0)')
    expect(tasks[0].querySelector('title')?.textContent).toContain('Critica: senza margine')
    const legend = block.querySelector('.graph-legend')!.textContent!
    expect(legend).toContain('Attività critica')
    expect(legend).toContain('Margine')
    const notes = [...block.querySelectorAll('.plan-notes li')].map((li) => li.textContent)
    expect(notes).toEqual(['Percorso critico: A → B → D → F → G', 'Durata del progetto: 23 giorni'])
    expect(block.querySelector('.graph-errors')).toBeNull()
    // Niente spostare e ingrandire: solo «Scarica».
    expect(block.querySelectorAll('.graph-tool')).toHaveLength(1)
  })

  it('disegna il reticolo con i tempi in ogni riquadro', () => {
    const host = preview(note('reticolo: A1:E9'))
    hydrateGraphs(host, light)
    const block = host.querySelector<HTMLElement>('.graph-block')!
    expect(block.classList.contains('is-network')).toBe(true)
    const nodes = block.querySelectorAll('.plan-task')
    expect(nodes).toHaveLength(8)
    // E: inizio al più presto 8, durata 6, fine 14; sotto 11, margine 3, fine al più tardi 17.
    const texts = [...nodes[4].querySelectorAll('text')].map((t) => t.textContent)
    expect(texts.slice(0, 4)).toEqual(['8', '6', '14', 'E'])
    expect(texts.slice(4, -3).join(' ')).toBe('Sviluppo dell\'interfaccia')
    expect(texts.slice(-3)).toEqual(['11', '3', '17'])
    expect(block.querySelector('svg')!.textContent).toContain('Inizio')
    expect(block.querySelector('svg')!.textContent).toContain('Fine')
    expect(block.querySelector('.plan-notes')!.textContent).toContain('In ogni riquadro')
  })

  it('gli errori dicono la riga della nota o quella della tabella', () => {
    const host = preview(note('gantt: A1:E9\ny = x'))
    hydrateGraphs(host, light)
    expect(host.querySelector('.graph-errors li')!.textContent).toContain('Riga 18')
    const cycle = gantt.replace('| A | Analisi dei requisiti | 5 |  |', '| A | Analisi dei requisiti | 5 | H |')
    const broken = preview(note('gantt: A1:E9', cycle))
    hydrateGraphs(broken, light)
    const error = broken.querySelector('.graph-errors li')!.textContent!
    expect(error).toContain('Tabella, riga 2')
    expect(error).toContain('si aspettano a vicenda')
    expect(broken.querySelector('.plan-task')).toBeNull()
    const none = preview('```grafico\nreticolo: A1:E9\n```\n')
    hydrateGraphs(none, light)
    expect(none.querySelector('.graph-errors')!.textContent).toMatch(/non c'è una tabella/)
  })

  it('nel file .md il Gantt è un\'immagine con la legenda', () => {
    const images = graphImagesFor(note('titolo: Sviluppo del sito\ngantt: A1:E9\ninizio: 12/10/2026'))
    const image = [...images.values()][0]
    expect(image).toContain('aria-label="Sviluppo del sito"')
    expect(image).toContain('Percorso critico: A → B → D → F → G')
    expect(image).toContain('Durata del progetto: 23 giorni (dal 12/10/2026 al 03/11/2026)')
    expect(image).toContain('ottobre 2026')
  })
})

describe('il disegno', () => {
  const plan = planData(gantt, 'A1:E9').plan!
  const s = schedule(plan)

  it('le attività critiche in rosso, le altre in blu, con il margine fino alla fine al più tardi', () => {
    const { svg, width } = ganttSvg(s, plan, PALETTES.light, { width: 700 })
    expect(width).toBe(700)
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml')
    const bars = [...doc.querySelectorAll('.plan-task')].map((g) => g.querySelector('rect:not(.plan-row)')!.getAttribute('fill'))
    expect(bars).toEqual(['#d03b3b', '#d03b3b', '#2a78d6', '#d03b3b', '#2a78d6', '#d03b3b', '#d03b3b', '#2a78d6'])
    // Il margine di C (3 giorni) e di H (1 giorno): la linea con la stanghetta.
    const slack = [...doc.querySelectorAll('.plan-task path[opacity="0.75"]')]
    expect(slack).toHaveLength(3)
    expect(svg).not.toContain('NaN')
  })

  it('la parte fatta piena e il resto velato; i traguardi come rombi', () => {
    const table = ['| Attività | Durata | Precedenti | Fatto |', '| --- | --- | --- | --- |', '| A | 4 |  | 100% |', '| B | 2 | A | 50% |', '| C | 0 | B |  |'].join('\n')
    const p = planData(table, 'A1:D4').plan!
    const sched = schedule(p)
    const doc = new DOMParser().parseFromString(ganttSvg(sched, p, PALETTES.light, { width: 600 }).svg, 'image/svg+xml')
    const b = doc.querySelectorAll('.plan-task')[1]
    expect(b.querySelectorAll('rect:not(.plan-row)')).toHaveLength(2)
    expect(b.querySelector('rect:not(.plan-row)')!.getAttribute('fill-opacity')).toBe('0.32')
    expect(doc.querySelectorAll('.plan-task')[2].querySelector('path')!.getAttribute('d')).toMatch(/l7 7l-7 7l-7 -7z/)
    expect(planLegend(sched, p, 'gantt').items.map((i) => i.swatch)).toEqual(['critical', 'milestone', 'done'])
  })

  it('nel reticolo le frecce che saltano colonne passano tra i riquadri', () => {
    const table = ['| Attività | Durata | Precedenti |', '| --- | --- | --- |', '| A | 2 |  |', '| B | 3 | A |', '| C | 4 | B |', '| D | 1 | A, C |'].join('\n')
    const p = planData(table, 'A1:C5').plan!
    const { svg, width, height } = networkSvg(schedule(p), p, PALETTES.light)
    expect(svg).not.toContain('NaN')
    // Inizio, A, B, C, D, Fine: sei colonne.
    expect(width).toBeGreaterThan(4 * 112 + 2 * 42)
    expect(height).toBeGreaterThan(70)
    // A → D salta B e C: la freccia passa per due punti in mezzo (un tratto dritto per ogni colonna saltata).
    expect(svg.match(/H\d/g)?.length).toBeGreaterThanOrEqual(2)
  })

  it('un progetto lungo: i numeri dei giorni si diradano e i mesi sono scritti sopra', () => {
    const table = ['| Attività | Durata | Precedenti |', '| --- | --- | --- |', '| A | 60 |  |', '| B | 50 | A |'].join('\n')
    const p = planData(table, 'A1:C3').plan!
    const { svg } = ganttSvg(schedule(p), p, PALETTES.light, { width: 600, start: parseDate('1/10/2026')! })
    expect(svg).not.toContain('NaN')
    const days = [...svg.matchAll(/font-size="10.5"[^>]*>(\d+)</g)].map((m) => Number(m[1]))
    expect(days.length).toBeGreaterThan(5)
    expect(days.length).toBeLessThan(40)
    for (const month of ['ottobre 2026', 'novembre 2026', 'dicembre 2026']) expect(svg).toContain(month)
  })

  it('i nomi troppo lunghi vanno a capo o si accorciano con i puntini', () => {
    expect(fitText('Progettazione dell\'interfaccia', 10.5, 60)).toMatch(/…$/)
    expect(fitText('A', 12, 60)).toBe('A')
    expect(wrapText('Collaudo', 10.5, 100)).toEqual(['Collaudo'])
    expect(wrapText('Progettazione dell\'interfaccia', 10.5, 100)).toEqual(['Progettazione', 'dell\'interfaccia'])
    const long = wrapText('Una frase troppo lunga per stare in due righe strette', 10.5, 100)
    expect(long).toHaveLength(2)
    expect(long[1]).toMatch(/…$/)
    // Una parola sola che non ci sta: una riga, accorciata.
    expect(wrapText('Precipitevolissimevolmente', 10.5, 60)).toEqual([fitText('Precipitevolissimevolmente', 10.5, 60)])
  })

  it('nel reticolo i nomi lunghi vanno a capo e si leggono interi', () => {
    const p = planData(gantt, 'A1:E9').plan!
    const { svg } = networkSvg(schedule(p), p, PALETTES.light)
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml')
    const nodes = [...doc.querySelectorAll('.plan-task')].sort((a, b) => Number(a.getAttribute('data-task')) - Number(b.getAttribute('data-task')))
    const names = nodes.map((g) => [...g.querySelectorAll('text[font-size="10.5"]')].map((t) => t.textContent))
    // «Progettazione del database» e «Progettazione dell'interfaccia» non diventano tutte e due «Progettazione de…».
    expect(names.map((n) => n.join(' '))).toEqual(p.activities.map((a) => a.name))
    expect(names.some((n) => n.length === 2)).toBe(true)
    // Tutti i riquadri sono alti uguali, con il posto per le due righe.
    expect(new Set(nodes.map((g) => g.querySelector('rect')!.getAttribute('height')))).toEqual(new Set(['82']))
  })

  it('la figura da scaricare ha il titolo, la legenda e gli errori', () => {
    const figure = planFigure('titolo: Rete\nreticolo: A1:E9', planData(gantt, 'A1:E9'))!
    expect(figure).toContain('aria-label="Rete"')
    expect(figure).toContain('Percorso critico')
    expect(planFigure('y = x', null)).toBeNull()
    const missing = planFigure('gantt: A1:E9', null)!
    expect(missing).toContain('non c\'è una tabella')
    expect(planPicture('gantt: A1:E9\ninizio: 1/1/2027', planData(gantt.replace('Durata (giorni)', 'Durata (ore)'), 'A1:E9'), PALETTES.light, 600)!.errors[0].message).toMatch(/Le date si mostrano/)
  })
})
