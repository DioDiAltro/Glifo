// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { setLangForTests } from '../src/i18n'
import { renderMarkdown } from '../src/render/markdown'
import { hydrateGraphs } from '../src/graph/preview'
import { graphImage, graphsForFile, graphsFromFile } from '../src/graph/file'
import { parseGraph, type GraphItem } from '../src/graph/spec'
import { tickLabel } from '../src/graph/plot'
import { graphSvg, graphTitle, PALETTES } from '../src/graph/svg'
import { planBlock, parseDate } from '../src/graph/planBlock'
import { amount, dateText, ganttSvg, networkSvg, planLegend } from '../src/graph/gantt'
import { planFigure, planPicture } from '../src/graph/planFigure'
import { listText, numberText, schedule } from '../src/graph/schedule'
import { planData, type PlanTable } from '../src/spreadsheet/plan'
import type { ChartData } from '../src/spreadsheet/chart'

/**
 * I grafici con Glifo in inglese (src/graph): i messaggi del blocco, le scritte nel disegno e intorno,
 * i numeri con il punto e le date come in inglese. Le parole che si scrivono nelle note (```grafico,
 * dati:, gantt:…) per ora restano italiane.
 */

const r = String.raw
const light = { theme: 'light', surface: '#fff' } as const

beforeEach(() => setLangForTests('en'))
afterEach(() => {
  setLangForTests('it')
  document.body.replaceChildren()
})

/** La nota nell'anteprima, con i grafici disegnati. */
function preview(src: string): HTMLElement {
  const host = document.createElement('div')
  host.innerHTML = renderMarkdown(src)
  document.body.append(host)
  hydrateGraphs(host, light)
  return host
}

/** Il primo errore del blocco. */
const message = (src: string, defs: string[] = []) => parseGraph(src, defs).errors[0]?.message

function of<K extends GraphItem['kind']>(items: GraphItem[], kind: K): Extract<GraphItem, { kind: K }>[] {
  return items.filter((i): i is Extract<GraphItem, { kind: K }> => i.kind === kind)
}

describe('il blocco ```grafico in inglese', () => {
  it('dice cosa non va in ogni riga', () => {
    expect(message('3')).toBe('x is missing: for a horizontal line write y = 3')
    expect(message(r`x \in [5, 1]`)).toBe(r`Two endpoints are needed, from the smaller to the larger: x \in [-5, 5]`)
    expect(message('f(x) = f(x) + 1')).toBe('f uses itself (possibly through another definition)')
    expect(message('y = 3 < x')).toBe('An equality and an inequality together: write them on two lines')
    expect(message(r`\int_0^2 x^2 \, dx, x > 1`)).toBe(r`An integral has no conditions: the limits say where, e.g. \int_0^2`)
    expect(message(r`y = b x` + '\n' + r`b \in [0, 1]`, ['a = 1', 'b = 2a'])).toBe('b is calculated from other numbers: sliders are for numbers written with digits, like a = 2')
    expect(parseGraph('y = b x', ['a = 1', r`b = \frac{1}{a}`], new Map([['a', 0]])).errors[0].message).toBe('b has no value: check its definition')
    expect(message('y = x\ninizio: 12/10/2026')).toBe('The start date is for the Gantt chart: also write the gantt: line with the task cells (gantt: A1:E9)')
    expect(message('1 + 1 = 2')).toBe('x and y are missing: what should I draw?')
    expect(message('w = 2, x > 0')).toBe('A number has no conditions')
    expect(message('|z - i| = 2, x > 0')).toMatch(/^In the complex plane, conditions go in a set/)
    // I nomi delle funzioni nelle formule per ora restano italiani.
    expect(message(r`\operatorname{studio}(f, g)`)).toBe(r`Write \operatorname{studio}(f), with f a function of one variable`)
    expect(message(r`\operatorname{istogramma}(1, 2, 3)`)).toBe(r`Write \operatorname{istogramma}(x), or with the number of bins: \operatorname{istogramma}(x, 5)`)
  })

  it('le scritte del disegno e della legenda sono in inglese', () => {
    const study = parseGraph(r`\operatorname{studio}(x^3 - 3x)`)
    expect(study.errors).toEqual([])
    const points = of(study.items, 'point').map((p) => [p.name, p.label])
    expect(points).toContainEqual(['M', r`M\ \text{(maximum)}`])
    expect(points).toContainEqual(['m', r`m\ \text{(minimum)}`])
    // Il flesso è I (inflection point), in italiano F.
    expect(points).toContainEqual(['I', r`I\ \text{(inflection point)}`])
    const saddle = parseGraph(r`\operatorname{critici}(x^2 - y^2)`)
    expect(saddle.items[0].label).toMatch(/^\\text\{level curves of \}/)
    expect(of(saddle.items, 'point').map((p) => p.label)).toContain(r`S\ \text{(saddle point)}`)
    expect(parseGraph(r`\operatorname{fourier}(x, [-\pi, \pi], 3)`).items[0].label).toContain(r`\text{(periodic extension)}`)
    expect(graphTitle(parseGraph('y = x^2\ny = 2x'))).toMatch(/^Graph of y = .* and y = /)
    expect(graphTitle(parseGraph(''))).toBe('Graph')
  })

  it('i numeri scelti da Glifo hanno il punto per i decimali (e la virgola per le migliaia)', () => {
    expect(tickLabel(-0.5, 0.1)).toBe('−0.5')
    expect(tickLabel(2.5, 0.5)).toBe('2.5')
    expect(tickLabel(250000, 50000)).toBe('2.5·10⁵')
    expect(tickLabel(20000, 1000, true)).toBe('20,000')
    expect(tickLabel(1500.5, 0.5, true)).toBe('1,500.5')
    const svg = graphSvg(parseGraph('y = x'), { x0: -1, x1: 1, y0: -1, y1: 1, width: 400, height: 400 }, PALETTES.light, { id: 'graph' })
    expect(svg).toContain('>0.5<')
    expect(svg).not.toMatch(/>−?0,5</)
    expect(parseGraph(r`A = \int_0^2 x^2 \, dx`).items[0].label).toBe(r`A = \int_{0}^{2} x^{2} \, dx = 2.666666\ldots`)
    expect(numberText(2.5)).toBe('2.5')
    // In italiano gli stessi numeri hanno la virgola.
    setLangForTests('it')
    expect(tickLabel(-0.5, 0.1)).toBe('−0,5')
    expect(tickLabel(20000, 1000, true)).toBe('20.000')
    expect(numberText(2.5)).toBe('2,5')
  })

  it('i pulsanti, gli slider e le coordinate nell\'anteprima', () => {
    const host = preview('Let $a = 0.5$.\n\n```grafico\ny = a x\nP = (1.5, 2)\n```\n')
    const block = host.querySelector<HTMLElement>('.graph-block')!
    expect(block.querySelector('[data-action="in"]')!.getAttribute('title')).toBe('Zoom in')
    expect(block.querySelector('[data-action="out"]')!.getAttribute('title')).toBe('Zoom out')
    expect(block.querySelector('[data-action="reset"]')!.getAttribute('title')).toBe('Back to the starting view')
    expect(block.querySelector('[data-action="image"]')!.getAttribute('title')).toBe('Download the graph as an image')
    const row = block.querySelector<HTMLElement>('.graph-slider')!
    expect(row.querySelector<HTMLInputElement>('.graph-slider-value')!.value).toBe('0.5')
    expect(row.querySelector('.graph-slider-input')!.getAttribute('aria-label')).toBe('Value of a')
    expect(row.querySelector('[data-action="play"]')!.getAttribute('title')).toBe('Animate a')
    expect(row.querySelector('[data-action="written"]')!.getAttribute('title')).toBe('Back to the value in the note: a = 0.5')
    // Con il punto nei numeri, le coordinate si separano con la virgola.
    expect(block.querySelector('.graph-coords')!.textContent).toBe('(1.5, 2)')
  })

  it('dice cosa scrivere e cosa non va, con i pulsanti per gli slider che mancano', () => {
    expect(preview('```grafico\n```\n').querySelector('.graph-hint')!.textContent).toBe(
      'Write a function in the block, one per line: for example y = x^2 (or z = x^2 + y^2 for a surface)',
    )
    const error = preview('```grafico\ny = k x\n```\n').querySelector('.graph-errors li')!
    expect(error.querySelector('strong')!.textContent).toMatch(/^Line \d+$/)
    expect(error.querySelector('.graph-add-slider')!.textContent).toBe('Add a slider for k')
    expect(preview('```grafico\ny = k x + c\n```\n').querySelector('.graph-add-slider')!.textContent).toBe('Add sliders for k and c')
  })

  it('nel file .md l\'immagine e il suggerimento sono in inglese, e il file si riapre uguale nelle due lingue', () => {
    const text = '```grafico\ny = x\n```'
    const file = graphsForFile(text, new Map([[0, '<svg/>']]))
    expect(file).toContain('![Graph](data:image/svg+xml;base64,')
    expect(file).toContain('<!-- glifo-grafico · to edit the graph, open this file with Glifo')
    expect(graphsFromFile(file)).toBe(text)
    expect(graphImage('y = x^2')).toContain('aria-label="Graph of y = x^{2}"')
    setLangForTests('it')
    expect(graphsFromFile(file)).toBe(text)
  })
})

describe('il punto di pareggio in inglese', () => {
  const data: ChartData = {
    table: {
      range: 'A1:C5',
      names: ['Quantity', 'Revenue', 'Total costs'],
      rows: [
        [0, 0, 12000],
        [1000, 10000, 16000],
        [2000, 20000, 20000],
        [3000, 30000, 24000],
      ],
      formats: [{ kind: 'general' }, { kind: 'number', decimals: 0 }, { kind: 'number', decimals: 0 }],
    },
  }
  const block = 'dati: A1:C5\npareggio: Revenue, Total costs'

  it('le aree dell\'utile e della perdita e il punto di pareggio hanno i nomi inglesi', () => {
    const spec = parseGraph(block, [], undefined, data)
    expect(spec.errors).toEqual([])
    const [gain, loss] = of(spec.items, 'gap')
    expect([gain.label, gain.text, loss.label, loss.text]).toEqual([r`\text{Profit area}`, 'Profit', r`\text{Loss area}`, 'Loss'])
    const [mark] = of(spec.items, 'mark')
    expect([mark.label, mark.text]).toEqual([r`\text{Break-even point}`, 'Break-even point'])
    const svg = graphSvg(spec, { x0: -300, x1: 3300, y0: -3000, y1: 33000, width: 640, height: 400 }, PALETTES.light, { id: 'graph' })
    expect(svg).toContain('>Loss<')
    expect(svg).toContain('>Break-even point<')
    // Le migliaia con la virgola, come nelle tabelle inglesi.
    expect(svg).toContain('>10,000<')
    expect(svg).not.toContain('>10.000<')
  })

  it('dice cosa non va', () => {
    const errors = (src: string) => parseGraph(src, [], undefined, data).errors.map((e) => e.message)
    expect(errors('pareggio: Revenue, Total costs')[0]).toBe(
      'The break-even point is between two data lines: first write the dati: line with the table cells (dati: A8:D13)',
    )
    expect(errors('dati: A1:C5\npareggio: Revenue, Expenses')[0]).toMatch(/^There's no “Expenses” column in the data/)
    expect(errors('dati: A1:C5\npareggio: Revenue')[0]).toBe('Write the two lines, revenue first and then costs: pareggio: Revenue, Total costs')
    expect(errors('dati: A1:C5\ndati: A1:B5')[0]).toBe('A graph takes its data from a single range: write only one dati: line')
  })
})

describe('il diagramma di Gantt e il reticolo in inglese', () => {
  const rows = (...lines: string[]) => ['| Attività | Durata | Precedenti |', '| --- | --- | --- |', ...lines].join('\n')
  const project = rows('| A | 3 |  |', '| B | 2 | A |', '| C | 4 | A |', '| D | 1 | B, C |')
  const plan = (source: string, range = 'A1:C5'): PlanTable => planData(source, range).plan!
  const start = parseDate('12/10/2026')!

  it('la legenda, il percorso critico e la durata del progetto', () => {
    const p = plan(project)
    const s = schedule(p)
    const legend = planLegend(s, p, 'gantt')
    expect(legend.items.map((i) => i.label)).toEqual(['Critical task (no slack)', 'Task with slack', 'Slack (how much it can slip)'])
    expect(legend.notes).toEqual(['Critical path: A → C → D', 'Project duration: 8 days'])
    expect(planLegend(s, p, 'gantt', start).notes[1]).toBe('Project duration: 8 days (from 12/10/2026 to 19/10/2026)')
    expect(planLegend(s, p, 'reticolo').notes[0]).toMatch(/^In each box: the earliest start, the duration and the earliest finish on top/)
  })

  it('i tempi, le unità e le date (in inglese britannico, se il browser non dice altro)', () => {
    const p = plan(project)
    const svg = ganttSvg(schedule(p), p, PALETTES.light, { width: 700, start }).svg
    expect(svg).toContain('aria-label="Gantt chart"')
    expect(svg).toContain('>Days<')
    expect(svg).toContain('October 2026')
    expect(svg).toContain('Duration: 2 days')
    expect(svg).toContain('From 15/10/2026 to 16/10/2026')
    expect(svg).toContain('Earliest start and finish: 3 and 5')
    expect(svg).toContain('Slack: 2 days (free: 2)')
    expect(svg).toContain('Critical: no slack')
    expect(amount(1, 'giorni')).toBe('1 day')
    expect(amount(2.5, 'settimane')).toBe('2.5 weeks')
    expect(amount(3, 'giorni', true)).toBe('3 working days')
    expect(dateText(start)).toBe('12/10/2026')
    expect(listText(['A', 'B', 'C'])).toBe('A, B and C')
  })

  it('il reticolo con Start, End e i legami scritti come in inglese', () => {
    const p = plan(rows('| A | 3 |  |', '| B | 2 | AII+1 |'), 'A1:C3')
    const svg = networkSvg(schedule(p), p, PALETTES.light).svg
    expect(svg).toContain('aria-label="Project network diagram"')
    expect(svg).toContain('>Start<')
    expect(svg).toContain('>End<')
    // Inizio-inizio (II) con un giorno di scarto: in inglese start-to-start, SS.
    expect(svg).toContain('>SS+1<')
  })

  it('gli errori del blocco e della tabella', () => {
    const errors = (src: string) => planBlock(src)!.errors.map((e) => e.message)
    expect(errors('gantt: A1:C5\ny = x')[0]).toBe('In the Gantt chart you can only write the titolo:, gantt: and inizio: lines (the tasks are in the table)')
    expect(errors('reticolo: A1:C5\ny = x')[0]).toBe('In the network diagram you can only write the titolo:, reticolo: and inizio: lines (the tasks are in the table)')
    expect(errors('gantt: A1:C5\ninizio: 31/02/2026')[0]).toBe('Write the start date like 2026-10-12')
    expect(errors('gantt: A1:C5\nasse x: time')[0]).toBe('This chart has no x and y axes: the time and the tasks already have their names')
    expect(planPicture('gantt: A1:C5', null, PALETTES.light, 700)!.errors[0].message).toBe(
      'There\'s no table before the graph in the note: the tasks come from the table written above it',
    )
    const cycle = schedule(plan(rows('| A | 3 | B |', '| B | 2 | A |'), 'A1:C3'))
    expect(cycle.problems[0].message).toBe('A and B wait for each other (B after A, A after B): so the project can\'t start')
    const checked = ['| Attività | Durata | Precedenti | Inizio al più presto |', '| --- | --- | --- | --- |', '| A | 3 |  | 0 |', '| B | 2 | A | 2 |'].join('\n')
    expect(schedule(plan(checked, 'A1:D3')).checks[0].message).toBe('the earliest start of B is 3, not 2')
    const figure = planFigure('gantt: A1:C3', planData(rows('| A | 3 | B |', '| B | 2 | A |'), 'A1:C3'))!
    expect(figure).toContain('Table, row 2: A and B wait for each other')
  })

  it('nell\'anteprima il pulsante e le note sono in inglese', () => {
    const host = preview(`\`\`\`tabella\n${project}\n\`\`\`\n\n\`\`\`grafico\ngantt: A1:C5\n\`\`\`\n`)
    const block = host.querySelector<HTMLElement>('.graph-block')!
    expect(block.querySelector('.graph-tool')!.getAttribute('title')).toBe('Download the chart as an image')
    expect([...block.querySelectorAll('.plan-notes li')].map((li) => li.textContent)).toEqual(['Critical path: A → C → D', 'Project duration: 8 days'])
    expect(block.querySelector('.plan-task title')!.textContent).toContain('Duration: 3 days')
  })
})
