import { describe, expect, it } from 'vitest'
import { chartData, chartLines, chartRange, currentRegion, parseRange, type ChartData } from '../src/spreadsheet/chart'
import { parseSheet } from '../src/spreadsheet/model'
import { TEMPLATES } from '../src/spreadsheet/templates'
import { breakEven, dataLine, dataRange, tableItems, textLabel } from '../src/graph/tableGraph'
import { parseGraph, type GraphItem } from '../src/graph/spec'
import { chooseWindow, tickLabel, ticks } from '../src/graph/plot'
import { graphSvg, itemColors, PALETTES } from '../src/graph/svg'

const pareggio = TEMPLATES.find((t) => t.name === 'Punto di pareggio')!.source
const block = ['titolo: Punto di pareggio', 'asse x: Quantità', 'asse y: €', 'dati: A8:D13', 'pareggio: Ricavi, Costi totali'].join('\n')

function of<K extends GraphItem['kind']>(items: GraphItem[], kind: K): Extract<GraphItem, { kind: K }>[] {
  return items.filter((i): i is Extract<GraphItem, { kind: K }> => i.kind === kind)
}

describe('i dati di una tabella per un grafico', () => {
  it('legge gli intervalli come in Excel', () => {
    expect(parseRange('A8:D13')).toEqual({ top: 7, left: 0, bottom: 12, right: 3 })
    expect(parseRange(' $d$13 : a8 ')).toEqual({ top: 7, left: 0, bottom: 12, right: 3 })
    expect(parseRange('A8')).toBeNull()
    expect(parseRange('ciao')).toBeNull()
  })

  it('prende i numeri calcolati, con i nomi dalla prima riga e il formato di ogni colonna', () => {
    const data = chartData(pareggio, 'A8:D13')
    expect(data.error).toBeUndefined()
    const table = data.table!
    expect(table.range).toBe('A8:D13')
    expect(table.names).toEqual(['Quantità', 'Costi fissi', 'Costi totali', 'Ricavi'])
    expect(table.rows).toEqual([
      [0, 12000, 12000, 0],
      [1000, 12000, 16000, 10000],
      [2000, 12000, 20000, 20000],
      [3000, 12000, 24000, 30000],
      [4000, 12000, 28000, 40000],
    ])
    expect(table.formats.map((f) => f.kind)).toEqual(['general', 'euro', 'euro', 'euro'])
  })

  it('senza la riga dei nomi le colonne si chiamano con la lettera', () => {
    const table = chartData('| 1 | 10 |\n| 2 | 20 |\n| 3 | x |', 'A1:B3').table!
    expect(table.names).toEqual(['', 'Colonna B'])
    expect(table.rows).toEqual([[1, 10], [2, 20], [3, null]])
  })

  it('dice perché i dati non ci sono', () => {
    expect(chartData(null, 'A1:B3').error).toMatch(/non c'è una tabella/)
    expect(chartData(pareggio, 'A8').error).toMatch(/come in Excel/)
    expect(chartData(pareggio, 'A8:A13').error).toMatch(/almeno due colonne/)
    // Le prime righe hanno i nomi dei costi nella prima colonna, non dei numeri.
    expect(chartData(pareggio, 'A1:B6').error).toMatch(/prima colonna \(A\).*numeri/)
    expect(chartData('| x | y |\n| 1 | a |\n| 2 | b |', 'A1:B3').error).toMatch(/altre colonne servono dei numeri/)
  })

  it('il pulsante «Grafico» prende il blocco dei dati attorno alla cella, o il primo della tabella', () => {
    const model = parseSheet(pareggio)
    expect(currentRegion(model, 9, 1)).toEqual({ top: 7, left: 0, bottom: 12, right: 4 })
    expect(currentRegion(model, 1, 1)).toEqual({ top: 0, left: 0, bottom: 5, right: 1 })
    // Su una cella dei costi (righe 1-6) i dati da disegnare sono quelli sotto.
    expect(chartRange(model, { top: 1, left: 1, bottom: 1, right: 1 })).toEqual({ top: 7, left: 0, bottom: 12, right: 4 })
    // Le celle scelte restano quelle.
    expect(chartRange(model, { top: 7, left: 0, bottom: 12, right: 2 })).toEqual({ top: 7, left: 0, bottom: 12, right: 2 })
  })

  it('con i ricavi e i costi totali scrive il diagramma del punto di pareggio, senza l\'utile', () => {
    const model = parseSheet(pareggio)
    expect(chartLines(model, chartRange(model, { top: 9, left: 0, bottom: 9, right: 0 }))).toEqual({ lines: block.split('\n') })
    // Altri dati: le linee e basta.
    const voti = parseSheet('| Mese | Vendite |\n| --- | --- |\n| 1 | 10 |\n| 2 | 15 |\n| 3 | 12 |')
    expect(chartLines(voti, chartRange(voti, { top: 0, left: 0, bottom: 0, right: 0 }))).toEqual({ lines: ['asse x: Mese', 'dati: A1:B4'] })
    expect(chartLines(model, { top: 0, left: 0, bottom: 5, right: 1 }).error).toMatch(/prima colonna/)
  })
})

describe('il blocco ```grafico con i dati di una tabella', () => {
  it('riconosce le righe dati: e pareggio:, che non sono formule', () => {
    expect(dataLine('dati: A8:D13')).toEqual({ key: 'dati', value: 'A8:D13' })
    expect(dataLine('  Pareggio : Ricavi, Costi totali')).toEqual({ key: 'pareggio', value: 'Ricavi, Costi totali' })
    expect(dataLine('y = x')).toBeNull()
    expect(dataRange(`titolo: x\n${block}`)).toBe('A8:D13')
    expect(dataRange('y = x^2')).toBeNull()
    expect(textLabel('Costi & ricavi_1 {x}')).toBe('\\text{Costi \\& ricavi\\_1 \\{x\\}}')
  })

  it('disegna le linee, le aree dell\'utile e della perdita e il punto di pareggio', () => {
    const spec = parseGraph(block, [], undefined, chartData(pareggio, 'A8:D13'))
    expect(spec.errors).toEqual([])
    expect(spec.title).toBe('Punto di pareggio')
    expect(spec.axes).toEqual({ x: 'Quantità', y: '€' })
    const series = of(spec.items, 'series')
    expect(series.map((s) => s.label)).toEqual(['\\text{Costi fissi}', '\\text{Costi totali}', '\\text{Ricavi}'])
    expect(series.map((s) => s.slot)).toEqual([0, 1, 2])
    expect(series[2].texts[2]).toBe('(2000; 20.000,00 €)')
    const [gain, loss] = of(spec.items, 'gap')
    expect([gain.tone, gain.text, loss.tone, loss.text]).toEqual(['gain', 'Utile', 'loss', 'Perdita'])
    // La perdita è il triangolo da 0 a 2000 tra i costi (sopra) e i ricavi (sotto); l'utile dopo.
    expect(loss.polygons).toEqual([[[0, 0], [1000, 10000], [2000, 20000], [2000, 20000], [1000, 16000], [0, 12000]]])
    expect(gain.polygons[0][0]).toEqual([2000, 20000])
    const [mark] = of(spec.items, 'mark')
    expect(mark).toMatchObject({ x: 2000, y: 20000, text: 'Punto di pareggio', coords: '(2.000; 20.000,00 €)' })
    // I colori: le linee in ordine, utile e perdita i loro, il punto con l'inchiostro.
    const colors = itemColors(spec.items, PALETTES.light)
    expect(colors.slice(0, 3)).toEqual(PALETTES.light.series.slice(0, 3))
    expect(colors.slice(3)).toEqual([PALETTES.light.gain, PALETTES.light.loss, PALETTES.light.axis])
  })

  it('trova il punto di pareggio anche tra due righe, e i ricavi scritti dopo i costi', () => {
    const met = breakEven([[0, 0], [1000, 10000], [2000, 20000]], [[0, 10000], [1000, 14000], [2000, 18000]])!
    expect(met.points).toHaveLength(1)
    expect(met.points[0][0]).toBeCloseTo(1666.667, 2)
    expect(met.points[0][1]).toBeCloseTo(16666.667, 2)
    const source = pareggio.replace('| 12.000 € |', '| 10.000 € |')
    const spec = parseGraph('dati: A8:D13\npareggio: Costi totali, Ricavi', [], undefined, chartData(source, 'A8:D13'))
    expect(spec.errors).toEqual([])
    expect(of(spec.items, 'mark')[0].coords).toBe('(1.666,67; 16.666,67 €)')
    // L'utile dopo il punto di pareggio, la perdita prima, anche con i nomi scritti al contrario.
    const [gain, loss] = of(spec.items, 'gap')
    expect([gain.tone, loss.tone]).toEqual(['gain', 'loss'])
    expect(gain.polygons.flat().every(([x]) => x >= 1666.66)).toBe(true)
    expect(loss.polygons.flat().every(([x]) => x <= 1666.67)).toBe(true)
  })

  it('dice cosa non va: niente tabella, colonne che non ci sono, linee che non si incontrano', () => {
    const message = (src: string, data: ChartData | null = chartData(pareggio, 'A8:D13')) => parseGraph(src, [], undefined, data).errors.map((e) => e.message)
    expect(message('dati: A8:D13', chartData(undefined, 'A8:D13'))[0]).toMatch(/non c'è una tabella/)
    expect(message('dati: A8:D13', null)[0]).toMatch(/non c'è una tabella/)
    expect(message('pareggio: Ricavi, Costi totali')[0]).toMatch(/scrivi prima la riga dati:/)
    expect(message('dati: A8:D13\npareggio: Ricavi, Spese')[0]).toMatch(/non c'è la colonna «Spese»/)
    expect(message('dati: A8:D13\npareggio: Ricavi')[0]).toMatch(/due linee/)
    // Con un prezzo di 4,50 € i ricavi restano sotto i costi fino a 4000 pezzi.
    const low = pareggio.replace('| 10,00 € |', '| 4,50 € |')
    expect(message('dati: A8:D13\npareggio: Ricavi, Costi totali', chartData(low, 'A8:D13'))[0]).toMatch(/non si incontrano/)
    // Le colonne si possono scrivere anche con la lettera.
    expect(message('dati: A8:D13\npareggio: D, C')).toEqual([])
  })

  it('la finestra comincia da zero e i numeri delle tacche hanno i punti delle migliaia', () => {
    expect(tickLabel(20000, 10000, true)).toBe('20.000')
    expect(tickLabel(1500, 500, true)).toBe('1.500')
    expect(tickLabel(-2500, 500, true)).toBe('−2.500')
    expect(tickLabel(0.25, 0.05, true)).toBe('0,25')
    expect(tickLabel(200000, 100000)).toBe('2·10⁵')
    const spec = parseGraph(block, [], undefined, chartData(pareggio, 'A8:D13'))
    const vp = chooseWindow(spec, 600, 360)
    expect(vp.x0).toBeLessThan(0)
    expect(vp.x1).toBeGreaterThan(4000)
    expect(vp.y0).toBeLessThan(0)
    expect(vp.y1).toBeGreaterThan(40000)
    expect(ticks(vp.y0, vp.y1, 360, false, true).major.map((t) => t.label)).toContain('20.000')
    const svg = graphSvg(spec, vp, PALETTES.light, { id: 'prova' })
    expect(svg).toContain('Punto di pareggio')
    expect(svg).toContain('>20.000<')
    expect(svg).toContain(PALETTES.light.gain)
    // L'origine dei dati non è la O della geometria.
    expect(svg).not.toContain('>O<')
  })

  it('una riga dati: sola, e nel piano', () => {
    const items = tableItems(
      [
        { line: 0, text: 'dati: A8:D13', key: 'dati', value: 'A8:D13' },
        { line: 1, text: 'dati: A8:B13', key: 'dati', value: 'A8:B13' },
      ],
      chartData(pareggio, 'A8:D13'),
      0,
    )
    expect(items.errors.map((e) => e.line)).toEqual([1])
    expect(parseGraph('z = x + y\ndati: A8:D13', [], undefined, chartData(pareggio, 'A8:D13')).errors.map((e) => e.message)).toContain('I dati di una tabella si disegnano nel piano, non nello spazio')
  })
})
