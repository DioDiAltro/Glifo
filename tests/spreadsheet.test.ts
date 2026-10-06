import { describe, expect, it } from 'vitest'
import { SheetEvaluator } from '../src/spreadsheet/evaluate'
import { sheetsForFile, sheetsFromFile } from '../src/spreadsheet/file'
import { formatCode, formatNumber, formatValue, parseFormatCode, readInput, roundTo, type Format } from '../src/spreadsheet/format'
import { adjustFormula, FormulaError, formulaRefs, normalizeFormula, parseFormula, shiftFormula } from '../src/spreadsheet/formula'
import { allFunctions, lookupFunction } from '../src/spreadsheet/functions'
import { parseCell, parseSheet, serializeCell, serializeSheet, sheetBlockText } from '../src/spreadsheet/model'
import { autoSum, clipFromText, copyRange, deleteCols, deleteRows, fillRange, getCell, insertCols, insertRows, parseTsv, pasteClip, rangeToTsv } from '../src/spreadsheet/ops'
import { TEMPLATES } from '../src/spreadsheet/templates'
import { cellName, colIndex, colName, parseCellName } from '../src/spreadsheet/refs'
import { sheetHtml, sheetMarkdown } from '../src/spreadsheet/render'
import { isError } from '../src/spreadsheet/values'

/** Come si vede ogni cella della tabella: `show('D2')`. */
function sheet(text: string) {
  const evaluator = new SheetEvaluator(parseSheet(text))
  return {
    show(name: string): string {
      const at = parseCellName(name)!
      const r = evaluator.result(at.row, at.col)
      return formatValue(r.value, r.format)
    },
    value(name: string) {
      const at = parseCellName(name)!
      return evaluator.result(at.row, at.col).value
    },
    message(name: string): string {
      const at = parseCellName(name)!
      const v = evaluator.result(at.row, at.col).value
      return isError(v) ? v.message : ''
    },
  }
}

/** Il risultato di una formula sola, in A1. */
function calc(formula: string, others = ''): string {
  return sheet(`| ${formula.replace(/\|/g, '\\|')} |${others ? `\n${others}` : ''}`).show('A1')
}

describe('tabelle: i nomi delle celle', () => {
  it('colonne con le lettere, righe da 1', () => {
    expect(colName(0)).toBe('A')
    expect(colName(25)).toBe('Z')
    expect(colName(26)).toBe('AA')
    expect(colName(701)).toBe('ZZ')
    expect(colName(702)).toBe('AAA')
    for (const n of [0, 5, 25, 26, 27, 51, 52, 701, 702, 16383]) expect(colIndex(colName(n))).toBe(n)
    expect(cellName(1, 3)).toBe('D2')
    expect(parseCellName('$b$12')).toEqual({ row: 11, col: 1 })
    expect(parseCellName('B0')).toBeNull()
    expect(parseCellName('SOMMA')).toBeNull()
  })
})

describe('tabelle: quello che si scrive nelle celle', () => {
  const read = (text: string) => readInput(text)
  it('i numeri all\'italiana, con la virgola e i punti delle migliaia', () => {
    expect(read('1234')).toEqual({ value: 1234, format: { kind: 'general' } })
    expect(read('1,5').value).toBe(1.5)
    expect(read(',5').value).toBe(0.5)
    expect(read('-3,25').value).toBe(-3.25)
    expect(read('1.234,56')).toEqual({ value: 1234.56, format: { kind: 'number', decimals: 2 } })
    expect(read('10.000')).toEqual({ value: 10000, format: { kind: 'number', decimals: 0 } })
    // Il punto come in inglese, quando non sono migliaia.
    expect(read('3.14').value).toBe(3.14)
    expect(read('0.500').value).toBe(0.5)
    expect(read('1e3').value).toBe(1000)
  })

  it('euro e percentuali', () => {
    expect(read('1,50 €')).toEqual({ value: 1.5, format: { kind: 'euro', decimals: 2 } })
    expect(read('€ 1.200')).toEqual({ value: 1200, format: { kind: 'euro', decimals: 0 } })
    expect(read('1,5€')).toEqual({ value: 1.5, format: { kind: 'euro', decimals: 2 } })
    expect(read('-€ 5')).toEqual({ value: -5, format: { kind: 'euro', decimals: 0 } })
    expect(read('20 euro').format).toEqual({ kind: 'euro', decimals: 0 })
    expect(read('22%')).toEqual({ value: 0.22, format: { kind: 'percent', decimals: 0 } })
    expect(read('12,5 %')).toEqual({ value: 0.125, format: { kind: 'percent', decimals: 1 } })
    expect(read('-5%').value).toBe(-0.05)
  })

  it('VERO, FALSO, gli errori e i testi', () => {
    expect(read('vero').value).toBe(true)
    expect(read('FALSO').value).toBe(false)
    expect(isError(read('#N/D').value)).toBe(true)
    expect(read("'0123").value).toBe('0123')
    expect(read('Penne').value).toBe('Penne')
    expect(read('+39 333 1234567').value).toBe('+39 333 1234567')
    expect(read('5 € al pezzo').value).toBe('5 € al pezzo')
    expect(read('  ').value).toBeNull()
  })
})

describe('tabelle: come si mostrano i numeri', () => {
  const show = (x: number, f: Format) => formatNumber(x, f)
  it('il formato generale, come Excel', () => {
    expect(show(1234.5, { kind: 'general' })).toBe('1234,5')
    expect(show(0.1 + 0.2, { kind: 'general' })).toBe('0,3')
    expect(show(5000 / 3, { kind: 'general' })).toBe('1666,666667')
    expect(show(-2, { kind: 'general' })).toBe('-2')
    expect(show(2.5e12, { kind: 'general' })).toBe('2,5E+12')
    expect(show(1.5e-8, { kind: 'general' })).toBe('1,5E-08')
  })

  it('decimali fissi, euro e percentuali con i punti delle migliaia', () => {
    expect(show(1666.6667, { kind: 'number', decimals: 0 })).toBe('1.667')
    expect(show(1234567.891, { kind: 'number', decimals: 2 })).toBe('1.234.567,89')
    expect(show(15, { kind: 'euro', decimals: 2 })).toBe('15,00 €')
    expect(show(-1234.5, { kind: 'euro', decimals: 2 })).toBe('-1.234,50 €')
    expect(show(0.22, { kind: 'percent', decimals: 0 })).toBe('22%')
    expect(show(0.125, { kind: 'percent', decimals: 1 })).toBe('12,5%')
    expect(show(-0.001, { kind: 'number', decimals: 2 })).toBe('0,00')
  })

  it('arrotonda il 5 lontano da zero, senza il rumore delle cifre binarie', () => {
    expect(roundTo(1.005, 2)).toBe(1.01)
    expect(roundTo(-1.005, 2)).toBe(-1.01)
    expect(roundTo(2.675, 2)).toBe(2.68)
    expect(roundTo(1234, -2)).toBe(1200)
    expect(roundTo(1.234, 1, 'up')).toBe(1.3)
    expect(roundTo(-1.234, 1, 'down')).toBe(-1.2)
  })

  it('i codici dei formati vanno e tornano', () => {
    const formats: Format[] = [
      { kind: 'general' },
      { kind: 'number', decimals: 0 },
      { kind: 'number', decimals: 3 },
      { kind: 'euro', decimals: 2 },
      { kind: 'euro', decimals: 0 },
      { kind: 'percent', decimals: 1 },
    ]
    for (const f of formats) expect(parseFormatCode(formatCode(f))).toEqual(f)
    expect(formatCode({ kind: 'euro', decimals: 2 })).toBe('0,00 €')
    expect(parseFormatCode('#.##0,00 €')).toEqual({ kind: 'euro', decimals: 2 })
    expect(parseFormatCode('€ 0')).toEqual({ kind: 'euro', decimals: 0 })
    expect(parseFormatCode('0,0%')).toEqual({ kind: 'percent', decimals: 1 })
    expect(parseFormatCode('mele')).toBeNull()
  })
})

describe('tabelle: la lettura delle formule', () => {
  it('le precedenze di Excel', () => {
    expect(calc('=1+2*3')).toBe('7')
    expect(calc('=(1+2)*3')).toBe('9')
    expect(calc('=-2^2')).toBe('4')
    expect(calc('=2^3^2')).toBe('64')
    expect(calc('=10-2-3')).toBe('5')
    expect(calc('=2*50%')).toBe('1')
    expect(calc('=1+1=2')).toBe('VERO')
    expect(calc('="a"&"b"&1,5')).toBe('ab1,5')
    expect(calc('=7/2')).toBe('3,5')
    expect(calc('=3 × 4 − 2')).toBe('10')
    expect(calc('=5 ≥ 5')).toBe('VERO')
  })

  it('i numeri con la virgola e gli argomenti con il punto e virgola', () => {
    expect(calc('=SOMMA(1,5; 2,5)')).toBe('4')
    expect(calc('=SOMMA(1.5; 2.5)')).toBe('4')
    // Con la virgola dopo una cella è il separatore, come nell'Excel inglese.
    expect(sheet('| =SOMMA(B1,C1) | 2 | 3 |').show('A1')).toBe('5')
  })

  it('i nomi in italiano o in inglese, maiuscole o minuscole', () => {
    expect(calc('=somma(2;3)')).toBe('5')
    expect(calc('=SUM(2;3)')).toBe('5')
    expect(calc('=if(1>0;"sì";"no")')).toBe('sì')
    expect(lookupFunction('sum')?.name).toBe('SOMMA')
    expect(lookupFunction('cerca.vert')?.name).toBe('CERCA.VERT')
    expect(allFunctions().length).toBeGreaterThan(60)
    for (const f of allFunctions()) expect(f.help, f.name).toMatch(/\S/)
  })

  it('spiega cosa non va', () => {
    const error = (src: string) => {
      try {
        parseFormula(src)
        return ''
      } catch (err) {
        expect(err).toBeInstanceOf(FormulaError)
        return (err as Error).message
      }
    }
    expect(error('SOMMA(A1:A3')).toMatch(/parentesi chiusa/)
    expect(error('(1+2')).toMatch(/parentesi chiusa/)
    expect(error('1+2)')).toMatch(/di troppo/)
    expect(error('"ciao')).toMatch(/virgoletta/)
    expect(error('1+')).toMatch(/incompleta/)
    expect(error('1 2')).toMatch(/operatore/)
    expect(error('SE(A1>1 "x")')).toMatch(/punto e virgola/)
    expect(error('3 @ 4')).toMatch(/simbolo/)
    expect(error('')).toMatch(/manca la formula/)
  })

  it('una formula che non si legge è #ERRORE! con la spiegazione', () => {
    const s = sheet('| =SOMMA(1;2 |')
    expect(s.show('A1')).toBe('#ERRORE!')
    expect(s.message('A1')).toMatch(/parentesi chiusa/)
    expect(calc('=PIPPO(1)')).toBe('#NOME?')
    expect(calc('=pippo')).toBe('#NOME?')
  })
})

describe('tabelle: i conti', () => {
  const spesa = sheetBlockBody([
    '| Prodotto | Quantità | Prezzo | Totale |',
    '| --- | --- | --- | --- |',
    '| Penne | 10 | 1,50 € | =B2*C2 |',
    '| Quaderni | 4 | 2 € | =B3*C3 |',
    '| Totale | =SOMMA(B2:B3) | | =SOMMA(D2:D3) |',
    '| IVA | 22% | | =D4*B5 |',
    '| Con IVA | | | =D4+D5 |',
  ])

  it('le righe contano come in Excel, l\'intestazione è la riga 1', () => {
    const s = sheet(spesa)
    expect(s.show('A1')).toBe('Prodotto')
    expect(s.show('D2')).toBe('15,00 €')
    // Euro per un numero: con i centesimi.
    expect(s.show('D3')).toBe('8,00 €')
    expect(s.show('B4')).toBe('14')
    // Euro più euro: euro, con i decimali del più preciso.
    expect(s.show('D4')).toBe('23,00 €')
    expect(s.show('D5')).toBe('5,06 €')
    expect(s.show('D6')).toBe('28,06 €')
  })

  it('il formato del risultato viene da quello che la formula usa', () => {
    const s = sheet([
      '| Costi fissi | 10.000 € |',
      '| Costo variabile | 5 € |',
      '| Prezzo | 8 € |',
      '| Pareggio (pezzi) | =B1/(B3-B2) |',
      '| Fatturato | =B4*B3 |',
      '| Margine % | =(B3-B2)/B3 |',
      '| Margine % | =(B3-B2)/B3 {0,0%} |',
      '| Prezzo con IVA | =B3*(1+22%) |',
    ].join('\n'))
    expect(s.show('B4')).toBe('3333,333333')
    expect(s.show('B5')).toBe('26.666,67 €')
    expect(s.show('B6')).toBe('0,375')
    expect(s.show('B7')).toBe('37,5%')
    expect(s.show('B8')).toBe('9,76 €')
  })

  it('celle vuote, testi e VERO/FALSO nei conti, come in Excel', () => {
    expect(calc('=B1+1')).toBe('1')
    expect(calc('=B1', '')).toBe('0')
    expect(sheet('| =B1*2 | 5 |').show('A1')).toBe('10')
    expect(sheet('| =B1*2 | ciao |').show('A1')).toBe('#VALORE!')
    expect(sheet('| =B1+1 | 2,5 € |').show('A1')).toBe('3,50 €')
    expect(calc('="3"+1')).toBe('4')
    expect(calc('=VERO+1')).toBe('2')
    expect(sheet('| =SOMMA(B1:D1) | 1 | ciao | VERO |').show('A1')).toBe('1')
  })

  it('gli errori passano al risultato', () => {
    expect(calc('=1/0')).toBe('#DIV/0!')
    expect(sheet('| =B1+1 | =1/0 |').show('A1')).toBe('#DIV/0!')
    expect(sheet('| =SOMMA(B1:C1) | 1 | =1/0 |').show('A1')).toBe('#DIV/0!')
    expect(calc('=SE.ERRORE(1/0; "niente")')).toBe('niente')
    expect(calc('=RADQ(-4)')).toBe('#NUM!')
    expect(calc('=B1:B3')).toBe('#VALORE!')
  })

  it('i riferimenti circolari sono #RIF!', () => {
    const s = sheet('| =B1 | =A1 | =A1+1 |\n| =A2+1 | | |')
    expect(s.show('A1')).toBe('#RIF!')
    expect(s.show('B1')).toBe('#RIF!')
    expect(s.show('C1')).toBe('#RIF!')
    expect(s.message('B1')).toMatch(/circolare/)
    expect(s.show('A2')).toBe('#RIF!')
    // Una formula che somma anche sé stessa.
    expect(sheet('| 1 |\n| 2 |\n| =SOMMA(A1:A3) |').show('A3')).toBe('#RIF!')
  })

  it('una catena lunga di formule si calcola', () => {
    const rows = ['| 1 |', ...Array.from({ length: 1500 }, (_, i) => `| =A${i + 1}+1 |`)]
    expect(sheet(rows.join('\n')).show('A1501')).toBe('1501')
  })
})

describe('tabelle: le funzioni', () => {
  const data = [
    '| Nome | Voto | Classe |',
    '| Anna | 8 | A |',
    '| Bruno | 5,5 | B |',
    '| Carla | 7 | A |',
    '| Dario | | B |',
    '| Elena | 9 | A |',
  ].join('\n')
  const f = (formula: string) => sheet(`${data}\n| ${formula} |`).show('A7')

  it('somma, media, minimo, massimo, conta', () => {
    expect(f('=SOMMA(B2:B6)')).toBe('29,5')
    expect(f('=MEDIA(B2:B6)')).toBe('7,375')
    expect(f('=MIN(B2:B6)')).toBe('5,5')
    expect(f('=MAX(B2:B6)')).toBe('9')
    expect(f('=CONTA.NUMERI(B2:B6)')).toBe('4')
    expect(f('=CONTA.VALORI(A2:A6)')).toBe('5')
    expect(f('=CONTA.VUOTE(B2:B6)')).toBe('1')
    expect(f('=MEDIANA(B2:B6)')).toBe('7,5')
    expect(f('=GRANDE(B2:B6; 2)')).toBe('8')
    expect(f('=PICCOLO(B2:B6; 1)')).toBe('5,5')
    expect(f('=PRODOTTO(2; 3; 4)')).toBe('24')
    expect(f('=MEDIA(A2:A6)')).toBe('#DIV/0!')
  })

  it('con i criteri: CONTA.SE, SOMMA.SE, MEDIA.SE', () => {
    expect(f('=CONTA.SE(B2:B6; ">=6")')).toBe('3')
    expect(f('=CONTA.SE(C2:C6; "A")')).toBe('3')
    expect(f('=CONTA.SE(A2:A6; "?a*")')).toBe('2')
    expect(f('=CONTA.SE(B2:B6; "<>8")')).toBe('4')
    expect(f('=SOMMA.SE(C2:C6; "A"; B2:B6)')).toBe('24')
    expect(f('=MEDIA.SE(C2:C6; "A"; B2:B6)')).toBe('8')
    expect(f('=SOMMA.SE(B2:B6; ">6")')).toBe('24')
  })

  it('SE, E, O, NON', () => {
    expect(f('=SE(B2>=6; "promosso"; "bocciato")')).toBe('promosso')
    expect(f('=SE(B3>=6; "promosso"; "bocciato")')).toBe('bocciato')
    expect(f('=SE(B3>=6; "promosso")')).toBe('FALSO')
    expect(f('=SE(E(B2>6; C2="A"); 1; 0)')).toBe('1')
    expect(f('=O(B3>6; B4>6)')).toBe('VERO')
    expect(f('=NON(B2>6)')).toBe('FALSO')
    // Il ramo che non serve non si calcola.
    expect(f('=SE(VERO; 1; 1/0)')).toBe('1')
  })

  it('CERCA.VERT, CERCA.ORIZZ, CONFRONTA, INDICE', () => {
    expect(f('=CERCA.VERT("Carla"; A2:C6; 2; FALSO)')).toBe('7')
    expect(f('=CERCA.VERT("carla"; A2:C6; 3; FALSO)')).toBe('A')
    expect(f('=CERCA.VERT("Zeno"; A2:C6; 2; FALSO)')).toBe('#N/D')
    expect(f('=CERCA.VERT("Anna"; A2:C6; 4; FALSO)')).toBe('#RIF!')
    expect(f('=CONFRONTA("Carla"; A2:A6; 0)')).toBe('3')
    expect(f('=INDICE(A2:C6; 2; 1)')).toBe('Bruno')
    expect(f('=CERCA.ORIZZ("Voto"; A1:C3; 2; FALSO)')).toBe('8')
    // Gli sconti per fasce: senza FALSO prende la fascia più vicina sotto.
    const sconti = sheet([
      '| Da | Sconto |',
      '| 0 € | 0% |',
      '| 100 € | 5% |',
      '| 500 € | 10% |',
      '| =CERCA.VERT(250; A2:B4; 2) | =CERCA.VERT(50; A2:B4; 2) |',
      '| =CERCA.VERT(999; A2:B4; 2) | =CERCA.VERT(-1; A2:B4; 2) |',
    ].join('\n'))
    expect(sconti.show('A5')).toBe('5%')
    expect(sconti.show('B5')).toBe('0%')
    expect(sconti.show('A6')).toBe('10%')
    expect(sconti.show('B6')).toBe('#N/D')
  })

  it('arrotondare e gli altri conti', () => {
    expect(calc('=ARROTONDA(2,345; 2)')).toBe('2,35')
    expect(calc('=ARROTONDA(1234; -2)')).toBe('1200')
    expect(calc('=ARROTONDA.PER.ECC(2,341; 1)')).toBe('2,4')
    expect(calc('=ARROTONDA.PER.DIF(-2,39; 1)')).toBe('-2,3')
    expect(calc('=TRONCA(8,9)')).toBe('8')
    expect(calc('=INT(-8,9)')).toBe('-9')
    expect(calc('=RESTO(-7; 3)')).toBe('2')
    expect(calc('=POTENZA(2; 10)')).toBe('1024')
    expect(calc('=RADQ(16)')).toBe('4')
    expect(calc('=ASS(-3)')).toBe('3')
    expect(calc('=LOG(8; 2)')).toBe('3')
    expect(calc('=ARROTONDA(PI.GRECO(); 4)')).toBe('3,1416')
    expect(calc('=ARROTONDA')).toBe('#NOME?')
    expect(calc('=ARROTONDA(1)')).toBe('#VALORE!')
  })

  it('i testi', () => {
    expect(calc('=CONCATENA("Glifo"; " "; 2026)')).toBe('Glifo 2026')
    expect(calc('=LUNGHEZZA("perché")')).toBe('6')
    expect(calc('=MAIUSC("ciao")')).toBe('CIAO')
    expect(calc('=SINISTRA("Excel"; 2)')).toBe('Ex')
    expect(calc('=DESTRA("Excel"; 3)')).toBe('cel')
    expect(calc('=STRINGA.ESTRAI("Glifo"; 2; 3)')).toBe('lif')
    expect(calc('=TESTO(1234,5; "0,00 €")')).toBe('1.234,50 €')
    expect(calc('=VALORE("12,5%")')).toBe('12,5%')
  })

  it('la matematica finanziaria, con i segni di Excel', () => {
    const near = (formula: string, expected: number) => {
      const v = sheet(`| ${formula} |`).value('A1')
      expect(typeof v, formula).toBe('number')
      expect(v as number, formula).toBeCloseTo(expected, 6)
    }
    near('=RATA(1%; 12; 10000)', -888.4878867834)
    expect(calc('=RATA(1%; 12; 10000)')).toBe('-888,49 €')
    near('=RATA(0; 10; 1000)', -100)
    near('=VA(5%; 10; -1000)', 7721.734929185)
    near('=VAL.FUT(5%; 10; -100)', 1257.789253554)
    near('=VAN(10%; 300; 400; 500)', 978.9631855747)
    near('=INTERESSI(1%; 1; 12; 10000)', -100)
    near('=P.RATA(1%; 1; 12; 10000)', -788.4878867834)
    near('=INTERESSI(1%; 2; 12; 10000)', -92.11512113217)
    near('=AMMORT.COST(10000; 1000; 5)', 1800)
    const irr = sheet('| -1000 | 300 | 400 | 500 | =TIR.COST(A1:D1) |').value('E1') as number
    expect(-1000 + 300 / (1 + irr) + 400 / (1 + irr) ** 2 + 500 / (1 + irr) ** 3).toBeCloseTo(0, 6)
    expect(sheet('| -1000 | 300 | 400 | 500 | =TIR.COST(A1:D1) |').show('E1')).toBe('8,90%')
    expect(sheet('| 1 | 2 | =TIR.COST(A1:B1) |').show('C1')).toBe('#NUM!')
  })

  it('il piano di ammortamento: le quote capitale sommano il prestito', () => {
    const rows = ['| Rata | Interessi | Capitale | Debito |', '| --- | --- | --- | --- |', '| | | | 12.000 € |']
    for (let k = 1; k <= 12; k++) {
      const r = k + 2
      rows.push(`| =-RATA(1%; 12; $D$2) | =D${r - 1}*1% | =A${r}-B${r} | =D${r - 1}-C${r} |`)
    }
    const s = sheet(rows.join('\n'))
    expect(s.show('A3')).toBe('1.066,19 €')
    expect(s.show('D14')).toBe('0,00 €')
  })
})

describe('tabelle: copiare le formule e cambiare righe e colonne', () => {
  it('copiata più giù o più a destra la formula segue, il $ no', () => {
    expect(shiftFormula('=B2*C2', 1, 0)).toBe('=B3*C3')
    expect(shiftFormula('=B2*$C$2', 2, 1)).toBe('=C4*$C$2')
    expect(shiftFormula('=B$2+$B2', 3, 3)).toBe('=E$2+$B5')
    expect(shiftFormula('=SOMMA(B2:B5)', 0, 1)).toBe('=SOMMA(C2:C5)')
    expect(shiftFormula('=A1+1', -1, 0)).toBe('=#RIF!+1')
    expect(shiftFormula('="B2"&B2', 1, 0)).toBe('="B2"&B3')
    expect(shiftFormula('Penne', 1, 0)).toBe('Penne')
  })

  it('aggiungere e togliere righe sposta i riferimenti come Excel', () => {
    expect(adjustFormula('=SOMMA(D2:D5)', 'row', 3, 1)).toBe('=SOMMA(D2:D6)')
    expect(adjustFormula('=SOMMA(D2:D5)', 'row', 1, 2)).toBe('=SOMMA(D4:D7)')
    expect(adjustFormula('=SOMMA(D2:D5)', 'row', 5, 1)).toBe('=SOMMA(D2:D5)')
    expect(adjustFormula('=D3*2', 'row', 2, -1)).toBe('=#RIF!*2')
    expect(adjustFormula('=D4*2', 'row', 2, -1)).toBe('=D3*2')
    expect(adjustFormula('=SOMMA(D2:D5)', 'row', 2, -2)).toBe('=SOMMA(D2:D3)')
    expect(adjustFormula('=SOMMA(D2:D5)', 'row', 0, -3)).toBe('=SOMMA(D1:D2)')
    expect(adjustFormula('=SOMMA(D2:D3)', 'row', 1, -2)).toBe('=SOMMA(#RIF!)')
    expect(adjustFormula('=$B$2+C1', 'col', 1, 1)).toBe('=$C$2+D1')
    expect(adjustFormula('=B1+C1', 'col', 1, -1)).toBe('=#RIF!+B1')
  })

  it('i nomi in maiuscolo e le funzioni con il nome italiano', () => {
    expect(normalizeFormula('=somma(b2:b5)*2')).toBe('=SOMMA(B2:B5)*2')
    expect(normalizeFormula('  =sum(a1;b$2)')).toBe('=SOMMA(A1;B$2)')
    expect(normalizeFormula('=se(a1>0;vero;falso)')).toBe('=SE(A1>0;VERO;FALSO)')
    expect(normalizeFormula('="somma"&a1')).toBe('="somma"&A1')
    expect(normalizeFormula('ciao')).toBe('ciao')
  })

  it('dove sono i riferimenti nella formula (per colorarli)', () => {
    expect(formulaRefs('=B2*C2+SOMMA(D1:E3)')).toEqual([
      { from: 1, to: 3, top: 1, left: 1, bottom: 1, right: 1 },
      { from: 4, to: 6, top: 1, left: 2, bottom: 1, right: 2 },
      { from: 13, to: 18, top: 0, left: 3, bottom: 2, right: 4 },
    ])
  })
})

/** Le righe del blocco. */
function sheetBlockBody(lines: string[]): string {
  return lines.join('\n')
}

describe('tabelle: il blocco nella nota', () => {
  it('legge e riscrive righe, intestazione, grassetto e formati', () => {
    const text = [
      '| Voce | Importo |',
      '| --- | ---: |',
      '| Ricavi | 10.000 € |',
      '| **Utile** | **=B2*0,3** {0 €} |',
      '| a \\| b | =D2/D4 {0,0%} |',
    ].join('\n')
    const model = parseSheet(text)
    expect(model.header).toBe(true)
    expect(model.align).toEqual([null, 'right'])
    expect(model.cells[2][0]).toEqual({ input: 'Utile', bold: true })
    expect(model.cells[2][1]).toEqual({ input: '=B2*0,3', bold: true, format: { kind: 'euro', decimals: 0 } })
    expect(model.cells[3][0]).toEqual({ input: 'a | b' })
    expect(serializeSheet(model)).toBe(text)
  })

  it('le righe più corte e le celle vuote', () => {
    const model = parseSheet('a | b | c\n| 1 |\n\n|  |  |  |\n| | | x |')
    expect(model.header).toBe(false)
    expect(serializeSheet(model)).toBe('| a | b | c |\n| 1 |  |  |\n|  |  |  |\n|  |  | x |')
  })

  it('un testo che finisce come un formato resta testo', () => {
    const cell = { input: 'Insieme {0}' }
    const text = serializeCell(cell)
    expect(text).toBe('Insieme \\{0}')
    expect(parseCell(text)).toEqual(cell)
    expect(parseCell('{0,00 €}')).toEqual({ input: '', format: { kind: 'euro', decimals: 2 } })
  })

  it('il blocco intero', () => {
    expect(sheetBlockText('| 1 |')).toBe('```tabella\n| 1 |\n```')
    expect(sheetBlockText('')).toBe('```tabella\n```')
    expect(serializeSheet(parseSheet(''))).toBe('')
  })
})

describe('tabelle: nell\'anteprima e nei file .md', () => {
  const text = ['| Prodotto | Prezzo |', '| --- | --- |', '| **Penne** | 1,5 € |', '| $x^2$ | =B2*2 |', '| Errore | =1/0 |'].join('\n')

  it('l\'anteprima mostra i risultati, con le formule e gli errori passando sopra', () => {
    const html = sheetHtml(text, (s) => `<i>${s}</i>`)
    expect(html).toContain('<thead><tr><th><i>Prodotto</i></th><th class="sheet-num"><i>Prezzo</i></th></tr></thead>')
    expect(html).toContain('<td><strong><i>Penne</i></strong></td>')
    expect(html).toContain('<td class="sheet-num">1,50 €</td>')
    expect(html).toContain('<td class="sheet-num" title="B3: =B2*2">3,00 €</td>')
    expect(html).toContain('<td class="sheet-error" title="B4: =1/0\nDivisione per zero">#DIV/0!</td>')
    expect(sheetHtml('', (s) => s)).toContain('Tabella vuota')
  })

  it('i testi delle celle non diventano HTML', () => {
    const html = sheetHtml('| =\"<b>\"&\"x\" |', (s) => s)
    expect(html).toContain('&lt;b&gt;x')
  })

  it('in Markdown con i risultati al posto delle formule', () => {
    expect(sheetMarkdown(text)).toBe(
      ['| Prodotto | Prezzo |', '| --- | ---: |', '| **Penne** | 1,50 € |', '| $x^2$ | 3,00 € |', '| Errore | #DIV/0! |'].join('\n'),
    )
  })

  it('nel file .md la tabella dei risultati e il blocco nascosto, che torna aprendolo', () => {
    const note = `# Conti\n\n${sheetBlockText(text)}\n\nFine.\n\n~~~\n${sheetBlockText('| 1 |')}\n~~~\n\n- voce\n  \`\`\`tabella\n  | =1+1 |\n  \`\`\``
    const file = sheetsForFile(note)
    expect(file).toContain('| Errore | #DIV/0! |')
    expect(file).toContain('<!-- glifo-tabella')
    expect(file).not.toContain('```tabella\n| Prodotto')
    // Il blocco dentro un altro blocco di codice resta com'è.
    expect(file).toContain('~~~\n```tabella\n| 1 |\n```\n~~~')
    expect(file).toContain('  | 2 |')
    expect(sheetsFromFile(file)).toBe(note)
    expect(sheetsFromFile(file.replace(/\n/g, '\r\n'))).toBe(note)
  })

  it('il testo nascosto non chiude il commento prima del tempo', () => {
    const note = sheetBlockText('| =SE(1>0;"a-->b";"c") | &gt; |')
    const file = sheetsForFile(note)
    const hidden = file.slice(file.indexOf('<!--'))
    expect(hidden.indexOf('-->')).toBe(hidden.lastIndexOf('-->'))
    expect(sheetsFromFile(file)).toBe(note)
  })
})

describe('tabelle: le modifiche dell\'editor', () => {
  const model = (text: string) => parseSheet(text)
  const text = (m: ReturnType<typeof parseSheet>) => serializeSheet(m)

  it('aggiungere e togliere righe e colonne aggiusta le formule', () => {
    const m = model('| 1 | =A1*2 |\n| 2 | =A2*2 |\n| =SOMMA(A1:A2) | =SOMMA(B1:B2) |')
    insertRows(m, 1)
    expect(text(m)).toBe('| 1 | =A1*2 |\n|  |  |\n| 2 | =A3*2 |\n| =SOMMA(A1:A3) | =SOMMA(B1:B3) |')
    deleteRows(m, 0)
    expect(text(m)).toBe('|  |  |\n| 2 | =A2*2 |\n| =SOMMA(A1:A2) | =SOMMA(B1:B2) |')
    insertCols(m, 0)
    expect(text(m)).toBe('|  |  |  |\n|  | 2 | =B2*2 |\n|  | =SOMMA(B1:B2) | =SOMMA(C1:C2) |')
    // Via la colonna B: la formula che la usava ha #RIF!, quella della C (ora B) si sposta con lei.
    deleteCols(m, 1)
    expect(text(m)).toBe('|  |  |\n|  | =#RIF!*2 |\n|  | =SOMMA(B1:B2) |')
  })

  it('togliendo la prima riga l\'intestazione non c\'è più', () => {
    const m = model('| A | B |\n| --- | --- |\n| 1 | 2 |')
    deleteRows(m, 0)
    expect(m.header).toBe(false)
    expect(text(m)).toBe('| 1 | 2 |')
  })

  it('copiare e incollare: le formule seguono, il $ no, e si ripete sul rettangolo scelto', () => {
    const m = model('| 2 | 3 | =A1*B1 | =A1*$B$1 |\n| 4 | 5 |  |  |\n| 6 | 7 |  |  |')
    const clip = copyRange(m, { top: 0, left: 2, bottom: 0, right: 3 })
    const placed = pasteClip(m, clip, { top: 1, left: 2, bottom: 2, right: 3 })
    expect(placed).toEqual({ top: 1, left: 2, bottom: 2, right: 3 })
    expect(text(m)).toBe('| 2 | 3 | =A1*B1 | =A1*$B$1 |\n| 4 | 5 | =A2*B2 | =A2*$B$1 |\n| 6 | 7 | =A3*B3 | =A3*$B$1 |')
    // Copiata troppo in su, la formula ha un #RIF!
    pasteClip(m, copyRange(m, { top: 1, left: 2, bottom: 1, right: 2 }), { top: 0, left: 0, bottom: 0, right: 0 })
    expect(getCell(m, 0, 0)?.input).toBe('=#RIF!*#RIF!')
  })

  it('riempire in basso: formule spostate, testi ripetuti, numeri in serie', () => {
    const m = model('| 1 | Mese | =A1*10 |\n| 2 | | |')
    fillRange(m, { top: 0, left: 0, bottom: 1, right: 0 }, { top: 0, left: 0, bottom: 4, right: 0 }, 'down')
    fillRange(m, { top: 0, left: 1, bottom: 0, right: 2 }, { top: 0, left: 1, bottom: 3, right: 2 }, 'down')
    expect(text(m)).toBe('| 1 | Mese | =A1*10 |\n| 2 | Mese | =A2*10 |\n| 3 | Mese | =A3*10 |\n| 4 | Mese | =A4*10 |\n| 5 |  |  |')
    const across = model('| 0,5 | 1 |')
    fillRange(across, { top: 0, left: 0, bottom: 0, right: 1 }, { top: 0, left: 0, bottom: 0, right: 3 }, 'right')
    expect(text(across)).toBe('| 0,5 | 1 | 1,5 | 2 |')
  })

  it('la somma automatica prende i numeri sopra, o a sinistra', () => {
    const m = model('| Voce | Importo |\n| a | 5 |\n| b | 7 |\n| c | 1 |\n|  |  |\n| 1 | 2 |')
    const results = new SheetEvaluator(m).all()
    expect(autoSum(results, 4, 1)).toBe('=SOMMA(B2:B4)')
    expect(autoSum(results, 5, 2)).toBe('=SOMMA(A6:B6)')
    expect(autoSum(results, 0, 0)).toBeNull()
  })

  it('gli appunti con Excel: tabulazioni e virgolette, e le tabelle di Markdown', () => {
    const m = model('| Nome | Prezzo |\n| Penne | 1,5 € |\n| "a"\tb | =B2*2 |')
    const results = new SheetEvaluator(m).all()
    expect(rangeToTsv(m, results, { top: 0, left: 0, bottom: 2, right: 1 })).toBe('Nome\tPrezzo\nPenne\t1,50 €\n"""a""\tb"\t3,00 €')
    expect(parseTsv('Nome\tPrezzo\r\nPenne\t1,50 €\r\n"""a""\tb"\t3,00 €\r\n')).toEqual([
      ['Nome', 'Prezzo'],
      ['Penne', '1,50 €'],
      ['"a"\tb', '3,00 €'],
    ])
    expect(parseTsv('"una\nriga"\tx')).toEqual([['una riga', 'x']])
    const fromMarkdown = clipFromText('| Voce | Euro |\n| --- | ---: |\n| **Totale** | =B2 {0,0 €} |')
    expect(fromMarkdown.cells).toEqual([
      [{ input: 'Voce' }, { input: 'Euro' }],
      [{ input: 'Totale', bold: true }, { input: '=B2', format: { kind: 'euro', decimals: 1 } }],
    ])
    expect(clipFromText('uno\ndue').cells).toEqual([[{ input: 'uno' }], [{ input: 'due' }]])
  })

  it('i modelli pronti fanno i conti giusti', () => {
    const shown = (source: string) => {
      const m = parseSheet(source)
      const results = new SheetEvaluator(m).all()
      return results.map((row) => row.map((r) => formatValue(r.value, r.format)))
    }
    expect(TEMPLATES.map((t) => t.name)).toEqual(['Fattura con l\'IVA', 'Punto di pareggio', 'Conto economico', 'Piano di ammortamento'])
    for (const t of TEMPLATES) {
      expect(shown(t.source).flat().filter((s) => s.startsWith('#')), t.name).toEqual([])
      // Il testo del modello è già come lo riscrive l'editor.
      expect(serializeSheet(parseSheet(t.source)), t.name).toBe(t.source)
    }
    const [fattura, pareggio, conto, piano] = TEMPLATES.map((t) => shown(t.source))
    expect(fattura[6][3]).toBe('75,64 €')
    expect(pareggio[4][1]).toBe('2000')
    expect(pareggio[10][3]).toBe('0,00 €')
    expect(conto[10][1]).toBe('7.200 €')
    expect(conto[11][1]).toBe('22.800 €')
    expect(conto[11][2]).toBe('9,1%')
    expect(piano[3][1]).toBe('2.373,96 €')
    expect(piano[10][3]).toBe('0,00 €')
  })
})
