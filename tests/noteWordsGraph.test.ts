// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { setLangForTests } from '../src/i18n'
import { graphKeyLine, graphKeyWord, parseGraphKey } from '../src/noteWords'
import { renderMarkdown } from '../src/render/markdown'
import { graphBlockText, graphNames, labelLine, parseGraph } from '../src/graph/spec'
import { dataLine, dataRange, planLine, readChart } from '../src/graph/tableGraph'
import { parseDate, planBlock, planRange, readPlan } from '../src/graph/planBlock'
import { parseLinks, schedule } from '../src/graph/schedule'
import { graphsForFile, graphsFromFile } from '../src/graph/file'
import { insertGraphBlock, setGraphLabels } from '../src/editor/graphInsert'
import { planData } from '../src/spreadsheet/plan'
import type { ChartData } from '../src/spreadsheet/chart'

/**
 * Le parole dei blocchi dei grafici nelle due lingue (src/noteWords.ts): title:, x axis:, data:,
 * break-even:, gantt:, network: e start: valgono come titolo:, asse x:, dati:, pareggio:, gantt:,
 * reticolo: e inizio:, con Glifo in italiano e in inglese; quello che Glifo scrive nella nota è nella
 * sua lingua, e una riga che c'è già resta nella sua.
 */

// CodeMirror misura il testo sullo schermo: in jsdom bastano misure vuote.
Range.prototype.getClientRects = () => [] as unknown as DOMRectList
Range.prototype.getBoundingClientRect = () => new DOMRect()

const LANGS = ['it', 'en'] as const
const r = String.raw

let view: EditorView | null = null

afterEach(() => {
  setLangForTests('it')
  view?.destroy()
  view = null
  document.body.replaceChildren()
})

function makeView(doc: string): EditorView {
  view = new EditorView({ state: EditorState.create({ doc, selection: { anchor: doc.length } }), parent: document.body.appendChild(document.createElement('div')) })
  return view
}

/** La data come 2026-10-12 (null se non è una data). */
const iso = (s: string) => parseDate(s)?.toISOString().slice(0, 10) ?? null

/** I costi e i ricavi della tabella sopra il grafico (come li scrive l'anteprima in `data-table`). */
const chart: ChartData = {
  table: {
    range: 'A1:C5',
    names: ['Quantità', 'Ricavi', 'Costi totali'],
    rows: [
      [0, 0, 12000],
      [1000, 10000, 16000],
      [2000, 20000, 20000],
      [3000, 30000, 24000],
    ],
    formats: [{ kind: 'general' }, { kind: 'number', decimals: 0 }, { kind: 'number', decimals: 0 }],
  },
}

const BREAK_EVEN_EN = 'title: Punto di pareggio\nx axis: Quantità\ny axis: €\ndata: A1:C5\nbreak-even: Ricavi, Costi totali'
const BREAK_EVEN_IT = 'titolo: Punto di pareggio\nasse x: Quantità\nasse y: €\ndati: A1:C5\npareggio: Ricavi, Costi totali'

/** Le attività di un progetto, con le precedenti scritte in inglese (none, «B and C»). */
const PROJECT = [
  '| Attività | Durata | Precedenti |',
  '| --- | --- | --- |',
  '| A | 3 | none |',
  '| B | 2 | A |',
  '| C | 4 | A |',
  '| D | 1 | B and C |',
].join('\n')

describe('le parole delle righe dei grafici', () => {
  it('si leggono in italiano e in inglese, con la parola italiana dentro Glifo e la lingua in cui sono scritte', () => {
    for (const language of LANGS) {
      setLangForTests(language)
      expect(parseGraphKey('title: La parabola $y = x^2$'), language).toEqual({ key: 'titolo', lang: 'en', value: 'La parabola $y = x^2$' })
      expect(parseGraphKey('Titolo: La parabola'), language).toEqual({ key: 'titolo', lang: 'it', value: 'La parabola' })
      expect(parseGraphKey('x axis: time $t$ (s)'), language).toEqual({ key: 'asse x', lang: 'en', value: 'time $t$ (s)' })
      expect(parseGraphKey('Y-Axis:  space (m)'), language).toEqual({ key: 'asse y', lang: 'en', value: 'space (m)' })
      expect(parseGraphKey('zaxis: h'), language).toEqual({ key: 'asse z', lang: 'en', value: 'h' })
      expect(parseGraphKey('asse z: altezza'), language).toEqual({ key: 'asse z', lang: 'it', value: 'altezza' })
      expect(parseGraphKey('Data : A8:D13'), language).toEqual({ key: 'dati', lang: 'en', value: 'A8:D13' })
      expect(parseGraphKey('break-even: Revenue, Total costs'), language).toEqual({ key: 'pareggio', lang: 'en', value: 'Revenue, Total costs' })
      expect(parseGraphKey('Breakeven: Revenue, Total costs')?.key, language).toBe('pareggio')
      expect(parseGraphKey('network: A1:E9'), language).toEqual({ key: 'reticolo', lang: 'en', value: 'A1:E9' })
      expect(parseGraphKey('start: October 12, 2026'), language).toEqual({ key: 'inizio', lang: 'en', value: 'October 12, 2026' })
      expect(parseGraphKey('Gantt: A1:E9'), language).toMatchObject({ key: 'gantt', value: 'A1:E9' })
      // Le formule non sono righe con una parola.
      for (const formula of ['y = x^2', 'x = 2', 'data = 3', 'starting: 3', 'titles: x', r`\text{data}: 1`]) expect(parseGraphKey(formula), formula).toBeNull()
    }
  })

  it('le funzioni dei grafici le leggono uguali (titolo, assi, dati, Gantt e reticolo)', () => {
    for (const language of LANGS) {
      setLangForTests(language)
      expect(labelLine('title: La parabola'), language).toEqual({ key: 'title', value: 'La parabola' })
      expect(labelLine('X axis: tempo'), language).toEqual({ key: 'x', value: 'tempo' })
      expect(labelLine('x-axis: tempo'), language).toEqual({ key: 'x', value: 'tempo' })
      expect(labelLine('asse y: spazio'), language).toEqual({ key: 'y', value: 'spazio' })
      expect(labelLine('data: A1:B3'), language).toBeNull()
      expect(dataLine('data: A8:D13'), language).toEqual({ key: 'dati', value: 'A8:D13' })
      expect(dataLine('break-even: Ricavi, Costi totali'), language).toEqual({ key: 'pareggio', value: 'Ricavi, Costi totali' })
      expect(dataLine('dati: A8:D13'), language).toEqual({ key: 'dati', value: 'A8:D13' })
      expect(dataLine('title: x'), language).toBeNull()
      expect(dataRange('title: Costi\ndata: A8:D13'), language).toBe('A8:D13')
      expect(planLine('network: A1:E9'), language).toEqual({ key: 'reticolo', value: 'A1:E9' })
      expect(planLine('start: 2026-10-12'), language).toEqual({ key: 'inizio', value: '2026-10-12' })
      expect(planLine('reticolo: A1:E9'), language).toEqual({ key: 'reticolo', value: 'A1:E9' })
      expect(planRange('title: Il progetto\nnetwork: A1:C5'), language).toEqual({ kind: 'reticolo', range: 'A1:C5', at: { line: 1, text: 'network: A1:C5' } })
      // Non sono formule: il grafico non cerca i loro nomi tra le definizioni della nota.
      expect([...graphNames('title: x\nx axis: t\ndata: A1:B2\nbreak-even: a, b\nnetwork: A1:B2\nstart: 2026-10-12\ny = a x')], language).toEqual(['a'])
    }
  })

  it('un grafico con title:, x axis:, data: e break-even: è uguale a quello scritto in italiano, in tutte e due le lingue', () => {
    for (const language of LANGS) {
      setLangForTests(language)
      const english = parseGraph(BREAK_EVEN_EN, [], undefined, chart)
      const italian = parseGraph(BREAK_EVEN_IT, [], undefined, chart)
      expect(english.errors, language).toEqual([])
      expect(english.title, language).toBe('Punto di pareggio')
      expect(english.axes, language).toEqual({ x: 'Quantità', y: '€' })
      expect(english.items.map((i) => i.kind), language).toEqual(['series', 'series', 'gap', 'gap', 'mark'])
      expect(english, language).toEqual(italian)
    }
  })

  it('nella nota il grafico con data: prende i numeri della tabella sopra, come con dati:', () => {
    const note = (block: string) =>
      `\`\`\`table\n| Quantità | Ricavi | Costi totali |\n| --- | --- | --- |\n| 0 | 0 | 12000 |\n| 1000 | 10000 | 16000 |\n| 2000 | 20000 | 20000 |\n| 3000 | 30000 | 24000 |\n\`\`\`\n\n\`\`\`graph\n${block}\n\`\`\`\n`
    for (const language of LANGS) {
      setLangForTests(language)
      const specs = [BREAK_EVEN_EN, BREAK_EVEN_IT].map((block) => {
        const host = document.createElement('div')
        host.innerHTML = renderMarkdown(note(block))
        const el = host.querySelector<HTMLElement>('.graph-block')!
        return parseGraph(el.dataset.graph ?? '', [], undefined, readChart(el))
      })
      expect(specs[0].errors, language).toEqual([])
      expect(specs[0].items.filter((i) => i.kind === 'mark'), language).toHaveLength(1)
      expect(specs[0], language).toEqual(specs[1])
    }
  })

  it('il diagramma di Gantt e il reticolo con network: e start:, come con reticolo: e inizio:', () => {
    for (const language of LANGS) {
      setLangForTests(language)
      const gantt = planBlock('title: Il sito\ngantt: A1:C5\nstart: October 12, 2026')!
      expect(gantt, language).toEqual(planBlock('titolo: Il sito\ngantt: A1:C5\ninizio: 12/10/2026'))
      expect(gantt.title, language).toBe('Il sito')
      expect(gantt.start?.toISOString(), language).toBe('2026-10-12T00:00:00.000Z')
      expect(gantt.errors, language).toEqual([])
      const network = planBlock('title: Il progetto\nnetwork: A1:C5')!
      expect(network.kind, language).toBe('reticolo')
      expect(network.errors, language).toEqual([])
      // Gli stessi errori delle parole italiane.
      const messages = (src: string) => planBlock(src)!.errors.map((e) => e.message)
      expect(messages('network: A1:C5\nstart: 12 October 2026'), language).toEqual(messages('reticolo: A1:C5\ninizio: 12/10/2026'))
      expect(messages('gantt: A1:C5\nnetwork: A1:C5'), language).toEqual(messages('gantt: A1:C5\nreticolo: A1:C5'))
      expect(messages('network: A1:C5\nx axis: tempo'), language).toEqual(messages('reticolo: A1:C5\nasse x: tempo'))
      // In un grafico come gli altri la data d'inizio da sola dice a cosa serve.
      expect(parseGraph('y = x\nstart: 2026-10-12').errors.map((e) => e.message), language).toEqual(parseGraph('y = x\ninizio: 12/10/2026').errors.map((e) => e.message))
    }
  })

  it('nella nota il reticolo con network: prende le attività della tabella sopra', () => {
    for (const language of LANGS) {
      setLangForTests(language)
      const host = document.createElement('div')
      host.innerHTML = renderMarkdown(`\`\`\`tabella\n${PROJECT}\n\`\`\`\n\n\`\`\`graph\ntitle: Il progetto\nnetwork: A1:C5\n\`\`\`\n`)
      const plan = readPlan(host.querySelector<HTMLElement>('.graph-block')!)
      expect(plan?.plan?.activities.map((a) => a.id), language).toEqual(['A', 'B', 'C', 'D'])
    }
  })
})

describe('Glifo scrive le parole nella sua lingua', () => {
  it('la parola e la riga per una riga nuova (per le tabelle: dati:, pareggio:, gantt:, reticolo:)', () => {
    expect(graphKeyWord('dati')).toBe('dati')
    expect(graphKeyLine('dati', 'A8:D13')).toBe('dati: A8:D13')
    expect(graphKeyLine('asse x', 'Quantità')).toBe('asse x: Quantità')
    expect(graphKeyLine('pareggio', 'Ricavi, Costi totali')).toBe('pareggio: Ricavi, Costi totali')
    expect(graphKeyLine('reticolo', 'A1:E9')).toBe('reticolo: A1:E9')
    setLangForTests('en')
    expect(graphKeyWord('dati')).toBe('data')
    expect(graphKeyLine('dati', 'A8:D13')).toBe('data: A8:D13')
    expect(graphKeyLine('titolo', 'Break-even point')).toBe('title: Break-even point')
    expect(graphKeyLine('asse x', 'Quantity')).toBe('x axis: Quantity')
    expect(graphKeyLine('asse y', '€')).toBe('y axis: €')
    expect(graphKeyLine('pareggio', 'Revenue, Total costs')).toBe('break-even: Revenue, Total costs')
    expect(graphKeyLine('gantt', 'A1:E9')).toBe('gantt: A1:E9')
    expect(graphKeyLine('reticolo', 'A1:E9')).toBe('network: A1:E9')
    expect(graphKeyLine('inizio', '2026-10-12')).toBe('start: 2026-10-12')
    // Una riga che c'è già si riscrive nella sua lingua.
    expect(graphKeyLine('titolo', 'Il sito', 'it')).toBe('titolo: Il sito')
    // Quello che Glifo scrive si rilegge.
    for (const key of ['titolo', 'asse x', 'asse y', 'asse z', 'dati', 'pareggio', 'gantt', 'reticolo', 'inizio'] as const) {
      expect(parseGraphKey(graphKeyLine(key, 'v'))?.key).toBe(key)
      expect(parseGraphKey(graphKeyLine(key, 'v', 'it'))?.key).toBe(key)
    }
  })

  it('il blocco nuovo: ```grafico in italiano (come prima), ```graph in inglese', () => {
    expect(graphBlockText(['y = x'])).toBe('```grafico\ny = x\n```')
    setLangForTests('en')
    expect(graphBlockText(['y = x', 'y = 2x'])).toBe('```graph\ny = x\ny = 2x\n```')
    const v = makeView('Text\n')
    insertGraphBlock(v, null)
    const text = v.state.doc.toString()
    expect(text).toBe('Text\n\n```graph\ny = \n```\n')
    expect(v.state.selection.main.head).toBe(text.indexOf('y = ') + 4)
  })

  it('«Titolo e nomi degli assi…»: le righe nuove nella lingua di Glifo', () => {
    setLangForTests('en')
    const v = makeView('Text\n\n```graph\ny = x^2\n```\n')
    expect(setGraphLabels(v, 2, { title: 'Parabola', x: 'time $t$', y: '' })).toBe(true)
    expect(v.state.doc.toString()).toBe('Text\n\n```graph\ntitle: Parabola\nx axis: time $t$\ny = x^2\n```\n')
    expect(setGraphLabels(v, 2, { title: '', x: 'time $t$', y: 'space', z: 'height' })).toBe(true)
    expect(v.state.doc.toString()).toBe('Text\n\n```graph\nx axis: time $t$\ny axis: space\nz axis: height\ny = x^2\n```\n')
  })

  it('«Titolo e nomi degli assi…»: una riga che c\'è già resta nella sua lingua', () => {
    // Glifo in inglese, una nota scritta in italiano: titolo: e asse y: restano, la riga nuova è inglese.
    setLangForTests('en')
    const italian = makeView('```grafico\ntitolo: Vecchio\nasse y: spazio\ny = x^2\n```')
    expect(setGraphLabels(italian, 0, { title: 'Nuovo', x: 'tempo', y: 'distanza' })).toBe(true)
    expect(italian.state.doc.toString()).toBe('```grafico\ntitolo: Nuovo\nx axis: tempo\nasse y: distanza\ny = x^2\n```')
    italian.destroy()
    // Glifo in italiano, una nota scritta in inglese: title: e x axis: restano, la riga nuova è italiana.
    setLangForTests('it')
    const english = makeView('```graph\nTitle: Old\nX-Axis: t\ny = x\n```')
    expect(setGraphLabels(english, 0, { title: 'New', x: 's', y: 'v' })).toBe(true)
    expect(english.state.doc.toString()).toBe('```graph\ntitle: New\nx axis: s\nasse y: v\ny = x\n```')
    // Vuota, la riga inglese si toglie.
    expect(setGraphLabels(english, 0, { title: '', x: 's', y: 'v' })).toBe(true)
    expect(english.state.doc.toString()).toBe('```graph\nx axis: s\nasse y: v\ny = x\n```')
  })

  it('con Glifo in italiano una nota italiana si scrive come prima', () => {
    const v = makeView('- punto\n\n  ```grafico\n  Titolo: Rette\n  y = kx\n  ```')
    expect(setGraphLabels(v, 2, { title: 'Le rette', x: 'tempo', y: '' })).toBe(true)
    expect(v.state.doc.toString()).toBe('- punto\n\n  ```grafico\n  titolo: Le rette\n  asse x: tempo\n  y = kx\n  ```')
  })
})

describe('i grafici nei file .md tornano con il loro nome', () => {
  const image = (text: string) => new Map(text.split('\n').flatMap((l, i) => (/^\s*```(grafico|graph)/.test(l) ? [[i, '<svg/>'] as [number, string]] : [])))

  it('```graph resta ```graph e ```grafico resta ```grafico, in tutte e due le lingue', () => {
    const text = 'Prima\n\n```graph\ny = x\n```\n\n- voce\n\n  ```grafico\n  y = 2x\n  ```\n\nDopo'
    for (const saving of LANGS) {
      setLangForTests(saving)
      const file = graphsForFile(text, image(text))
      expect(file, saving).not.toContain('```')
      expect(file, saving).toMatch(/\n<!-- glifo-grafico graph · /)
      expect(file, saving).toMatch(/\n {2}<!-- glifo-grafico · /)
      for (const opening of LANGS) {
        setLangForTests(opening)
        expect(graphsFromFile(file), `${saving} → ${opening}`).toBe(text)
      }
    }
  })

  it('con Glifo in italiano il file di un blocco ```grafico è uguale a prima, e un file di prima si riapre uguale', () => {
    const file = graphsForFile('```grafico\ny = x\n```', new Map([[0, '<svg/>']]))
    expect(file).toBe('![Grafico](data:image/svg+xml;base64,PHN2Zy8+)\n<!-- glifo-grafico · per modificare il grafico apri questo file con Glifo\ny = x\n-->')
    for (const language of LANGS) {
      setLangForTests(language)
      expect(graphsFromFile(file), language).toBe('```grafico\ny = x\n```')
    }
  })
})

describe('le date e le precedenti in inglese', () => {
  it('i mesi inglesi accanto agli italiani, e le date all\'inglese', () => {
    expect(iso('2026-10-12')).toBe('2026-10-12')
    expect(iso('12 October 2026')).toBe('2026-10-12')
    expect(iso('October 12, 2026')).toBe('2026-10-12')
    expect(iso('october 12 2026')).toBe('2026-10-12')
    expect(iso('Oct 12, 2026')).toBe('2026-10-12')
    expect(iso('12 Oct. 2026')).toBe('2026-10-12')
    expect(iso('1st January 2027')).toBe('2027-01-01')
    expect(iso('January 1st, 2027')).toBe('2027-01-01')
    expect(iso('Sept 30, 2026')).toBe('2026-09-30')
    expect(iso('May 5, 2026')).toBe('2026-05-05')
    expect(iso('5 Jun 2026')).toBe('2026-06-05')
    expect(iso('Jul 4, 2026')).toBe('2026-07-04')
    expect(iso('Aug 1, 2026')).toBe('2026-08-01')
    expect(iso('Dec 25, 2026')).toBe('2026-12-25')
    // Le prime tre lettere uguali nelle due lingue sono lo stesso mese.
    expect(iso('3 mar 2026')).toBe('2026-03-03')
    expect(iso('3 nov 2026')).toBe('2026-11-03')
    expect(iso('February 30, 2026')).toBeNull()
    expect(iso('Octember 12, 2026')).toBeNull()
    expect(iso('Oc 12, 2026')).toBeNull()
    expect(iso('tomorrow')).toBeNull()
  })

  it('le date italiane come prima, anche con Glifo in inglese (gg/mm/aaaa)', () => {
    for (const language of LANGS) {
      setLangForTests(language)
      expect(iso('12/10/2026'), language).toBe('2026-10-12')
      expect(iso('10/12/2026'), language).toBe('2026-12-10')
      expect(iso('1-3-26'), language).toBe('2026-03-01')
      expect(iso('12 ottobre 2026'), language).toBe('2026-10-12')
      expect(iso('1° gen 2027'), language).toBe('2027-01-01')
      expect(iso('5 mag 2026'), language).toBe('2026-05-05')
      expect(iso('30/02/2026'), language).toBeNull()
    }
  })

  it('«none», «nothing» e «A and B» nelle precedenti, come «nessuna» e «A e B»', () => {
    const ids = new Map([['a', 0], ['b', 1], ['c', 2]])
    for (const language of LANGS) {
      setLangForTests(language)
      expect(parseLinks('none', ids), language).toEqual({ links: [], problems: [] })
      expect(parseLinks('Nothing', ids), language).toEqual({ links: [], problems: [] })
      expect(parseLinks('nessuna', ids), language).toEqual({ links: [], problems: [] })
      expect(parseLinks('A and C', ids).links.map((l) => l.from), language).toEqual([0, 2])
      expect(parseLinks('A, B AND C', ids).links.map((l) => l.from), language).toEqual([0, 1, 2])
      expect(parseLinks('A e C', ids).links.map((l) => l.from), language).toEqual([0, 2])
      expect(parseLinks('A and BFF+2', ids).links, language).toEqual([
        { from: 0, type: 'FI', lag: 0 },
        { from: 1, type: 'FF', lag: 2 },
      ])
      // Un codice che non c'è resta un problema.
      expect(parseLinks('A and X', ids).problems, language).toHaveLength(1)
    }
  })

  it('il progetto con «none» e «B and C» ha gli stessi tempi di quello scritto in italiano', () => {
    const p = (source: string) => planData(source, 'A1:C5').plan!
    const italian = PROJECT.replace('none', 'nessuna').replace('B and C', 'B e C')
    for (const language of LANGS) {
      setLangForTests(language)
      const s = schedule(p(PROJECT))
      expect(s.problems, language).toEqual([])
      expect(s.tasks.map((t) => [t.id, t.es, t.ef]), language).toEqual([
        ['A', 0, 3],
        ['B', 3, 5],
        ['C', 3, 7],
        ['D', 7, 8],
      ])
      expect(s.paths.map((path) => path.map((i) => s.tasks[i].id).join(' → ')), language).toEqual(['A → C → D'])
      expect(s, language).toEqual(schedule(p(italian)))
    }
  })
})

describe('i messaggi citano le parole nella lingua di Glifo', () => {
  it('in inglese le parole inglesi, in italiano quelle di sempre', () => {
    const block = (src: string) => planBlock(src)!.errors[0]?.message
    const data = (src: string) => parseGraph(src, [], undefined, chart).errors[0]?.message
    expect(block('network: A1:C5\ny = x')).toBe('Nel reticolo si scrivono solo le righe titolo:, reticolo: e inizio: (le attività sono nella tabella)')
    expect(data('data: A1:C5\ndata: A1:B5')).toBe('Un grafico prende i dati da un intervallo solo: scrivi una riga dati: sola')
    setLangForTests('en')
    expect(block('reticolo: A1:C5\ny = x')).toBe('In the network diagram you can only write the title:, network: and start: lines (the tasks are in the table)')
    expect(block('gantt: A1:C5\nreticolo: A1:C5')).toBe('A block makes a single chart: the Gantt chart and the network diagram go in two graph blocks')
    expect(data('dati: A1:C5\ndati: A1:B5')).toBe('A graph takes its data from a single range: write only one data: line')
    expect(data('break-even: Ricavi, Costi totali')).toBe(
      'The break-even point is between two data lines: first write the data: line with the table cells (data: A8:D13)',
    )
    expect(data('data: A1:C5\nbreak-even: Ricavi')).toBe('Write the two lines, revenue first and then costs: break-even: Revenue, Total costs')
  })

  it('le funzioni con il nome inglese: study, histogram, barchart, scatter, regression, levels, conic', () => {
    const message = (src: string, defs: string[] = []) => parseGraph(src, defs).errors[0]?.message
    expect(message(r`\operatorname{studio}(f, g)`)).toBe(r`Si scrive \operatorname{studio}(f), con f una funzione di una variabile`)
    expect(message(r`\operatorname{dispersione}(x)`, ['x = (1, 2, 3)'])).toBe(r`Si scrive \operatorname{dispersione}(x, y), con x e y due vettori di dati`)
    setLangForTests('en')
    expect(message(r`\operatorname{studio}(f, g)`)).toBe(r`Write \operatorname{study}(f), with f a function of one variable`)
    expect(message(r`\operatorname{istogramma}(1, 2, 3)`)).toBe(r`Write \operatorname{histogram}(x), or with the number of bins: \operatorname{histogram}(x, 5)`)
    expect(message(r`\operatorname{barre}(1, 2, 3)`)).toBe(r`Write \operatorname{barchart}(x), or with the frequencies: \operatorname{barchart}(v, f)`)
    expect(message(r`\operatorname{dispersione}(x)`, ['x = (1, 2, 3)'])).toBe(r`Write \operatorname{scatter}(x, y), with x and y two data vectors`)
    expect(message(r`\operatorname{regressione}(x)`, ['x = (1, 2, 3)'])).toBe(r`Write \operatorname{regression}(x, y), with x and y two data vectors`)
    // Il nome inglese è quello che il lettore conosce (src/noteWords.ts): contour.
    expect(message(r`\operatorname{livelli}(f, g)`)).toBe(r`Write \operatorname{contour}(f), with f a function of x and y`)
    expect(message(r`\operatorname{conica}(x^2 + y^2)`)).toBe(r`Write \operatorname{conic}(x^2 + 4y^2 = 4)`)
  })
})
