// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { strToU8, zipSync } from 'fflate'
import { setLangForTests } from '../src/i18n'
import { chartData, chartLines, chartRange } from '../src/spreadsheet/chart'
import { csvNumbers, csvToSheet, parseCsv, sheetToCsv } from '../src/spreadsheet/csv'
import { openSheetEditor } from '../src/spreadsheet/editor'
import { SheetEvaluator } from '../src/spreadsheet/evaluate'
import { sheetsForFile } from '../src/spreadsheet/file'
import { formatNumber, formatValue, readEnglishInput, readInput, type Format } from '../src/spreadsheet/format'
import { adjustFormula, englishFormula, FormulaError, italianFormula, parseFormula } from '../src/spreadsheet/formula'
import { allFunctions, englishName, lookupFunction, shownName } from '../src/spreadsheet/functions'
import { englishInput, italianInput, shownInput, storedInput } from '../src/spreadsheet/input'
import { parseSheet, serializeSheet, type SheetModel } from '../src/spreadsheet/model'
import { clipFromText } from '../src/spreadsheet/ops'
import { isPlanRange, planData } from '../src/spreadsheet/plan'
import { hydrateSheets } from '../src/spreadsheet/preview'
import { parseCellName } from '../src/spreadsheet/refs'
import { sheetHtml } from '../src/spreadsheet/render'
import { TEMPLATES } from '../src/spreadsheet/templates'
import { isError, type Value } from '../src/spreadsheet/values'
import { sheetToXlsx, xlsxSheets } from '../src/spreadsheet/xlsx'

/**
 * Le tabelle con Glifo in inglese (src/spreadsheet): l'aiuto e i nomi delle funzioni, gli errori, i
 * numeri mostrati e scritti all'inglese, le note scritte in italiano che danno gli stessi valori, i
 * .csv nelle due lingue, i modelli pronti e l'editor.
 */

// jsdom non ha le finestre modali, lo scorrimento e il disegno su canvas.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.open = true
}
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  this.open = false
  this.dispatchEvent(new Event('close'))
}
Element.prototype.scrollIntoView ??= function () {}
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', { value: () => null, configurable: true })

beforeEach(() => setLangForTests('en'))
afterEach(() => {
  // «Done» chiude l'editor e toglie i suoi ascoltatori dalla finestra.
  for (const button of document.querySelectorAll<HTMLButtonElement>('dialog.sheet-editor button')) {
    if (button.textContent?.trim() === 'Done') button.click()
  }
  document.body.replaceChildren()
  setLangForTests('it')
})

/** Come si vede ogni cella della tabella, nella lingua di adesso. */
function shown(source: string): string[][] {
  return new SheetEvaluator(parseSheet(source)).all().map((row) => row.map((r) => formatValue(r.value, r.format)))
}

/** Il valore e il formato di ogni cella (gli errori con il loro codice), per confrontare le due lingue. */
function values(source: string): unknown[][] {
  return new SheetEvaluator(parseSheet(source)).all().map((row) => row.map((r) => [isError(r.value) ? r.value.error : r.value, r.format]))
}

function show(source: string, name: string): string {
  const at = parseCellName(name)!
  const r = new SheetEvaluator(parseSheet(source)).result(at.row, at.col)
  return formatValue(r.value, r.format)
}

function message(source: string, name: string): string {
  const at = parseCellName(name)!
  const v = new SheetEvaluator(parseSheet(source)).result(at.row, at.col).value
  return isError(v) ? v.message : ''
}

/** La stessa cosa nelle due lingue: prima in italiano, poi in inglese. */
function inBoth<T>(fn: () => T): { it: T; en: T } {
  setLangForTests('it')
  const it = fn()
  setLangForTests('en')
  return { it, en: fn() }
}

describe('le funzioni in inglese', () => {
  it('l\'aiuto e gli argomenti in inglese, con la virgola tra gli argomenti', () => {
    const sum = lookupFunction('SOMMA')!
    expect(sum.help).toBe('The sum of the numbers (also of ranges like B2:B10)')
    expect(sum.args).toBe('number1, [number2], …')
    expect(lookupFunction('if')!.help).toBe('If the test is TRUE it gives the second value, otherwise the third: =IF(B2>=6, "passed", "failed")')
    expect(lookupFunction('PMT')!.args).toBe('rate, nper, pv, [fv], [type]')
    expect(lookupFunction('PI')!.args).toBe('')
  })

  it('ogni funzione ha l\'aiuto in inglese, diverso da quello italiano, e il nome inglese', () => {
    expect(allFunctions()).toHaveLength(68)
    for (const f of allFunctions()) {
      const { it, en } = inBoth(() => ({ help: f.help, args: f.args }))
      expect(en.help, f.name).not.toBe(it.help)
      expect(en.help, f.name).not.toMatch(/[àèìòù]|\b(il|la|di|che|non|una|dei|delle)\b/)
      expect(en.args, f.name).not.toContain(';')
      if (it.args) expect(en.args, f.name).not.toBe(it.args)
      // Il nome inglese porta alla stessa funzione.
      expect(lookupFunction(englishName(f)), f.name).toBe(f)
    }
  })

  it('i nomi si mostrano in inglese e si scrivono nelle due lingue', () => {
    expect(shownName('SOMMA')).toBe('SUM')
    expect(shownName('cerca.vert')).toBe('VLOOKUP')
    expect(shownName('PIPPO')).toBe('PIPPO')
    // Una formula salvata con i nomi italiani funziona in inglese, e viceversa.
    expect(show('| =SOMMA(2;3) | =SUM(2;3) | =se(1>0;"a";"b") | =IF(1>0;"a";"b") |', 'A1')).toBe('5')
    expect(show('| =SOMMA(2;3) | =SUM(2;3) |', 'B1')).toBe('5')
    expect(inBoth(() => show('| =se(1>0;"a";"b") | =IF(1>0;"a";"b") |', 'B1'))).toEqual({ it: 'a', en: 'a' })
  })

  it('i messaggi degli errori in inglese, con i nomi inglesi delle funzioni', () => {
    expect(message('| =ARROTONDA(1) |', 'A1')).toBe('ROUND takes 2 arguments: ROUND(number, digits)')
    expect(message('| =SOMMA(1;2 |', 'A1')).toBe('The closing parenthesis ) of SUM is missing')
    expect(message('| =SE(A2>1 "x") |', 'A1')).toBe('Separate the arguments of IF with a comma ,')
    expect(message('| =PIPPO(1) |', 'A1')).toBe('Unknown function PIPPO')
    expect(message('| =pippo |', 'A1')).toBe('Unknown name “pippo”: functions need parentheses, texts need quotes')
    expect(message('| =B1 | =A1 |', 'A1')).toBe('Circular reference: A1 uses its own result')
    expect(message('| =RADQ(-4) |', 'A1')).toBe('A negative number has no square root')
    expect(message('| =CERCA.VERT("x"; B1:C2; 2; FALSO) | a | 1 |', 'A1')).toBe('“x” isn\'t in the first column')
    expect(message('| =1/0 |', 'A1')).toBe('Division by zero')
    expect(message('| =B1*2 | ciao |', 'A1')).toBe('“ciao” is text, not a number')
    const error = (src: string) => {
      try {
        parseFormula(src)
        return ''
      } catch (err) {
        expect(err).toBeInstanceOf(FormulaError)
        return (err as Error).message
      }
    }
    expect(error('"ciao')).toBe('The closing quote " of the text is missing')
    expect(error('1+2)')).toBe('There\'s one closing parenthesis too many')
    expect(error('1 2')).toBe('An operator is missing before “2”')
    expect(error('3 @ 4')).toBe('The symbol “@” can\'t be used in formulas')
  })
})

describe('gli errori nelle due lingue', () => {
  const errors = '| =1/0 | =PIPPO(1) | =CERCA.VERT(9; B2:C3; 2; FALSO) | =2*"x" | =B1:B3 | =RADQ(-1) | =SOMMA(1;2 | =#RIF! |'

  it('in inglese i codici dell\'Excel inglese, in italiano quelli di sempre', () => {
    const { it, en } = inBoth(() => shown(errors)[0])
    expect(en).toEqual(['#DIV/0!', '#NAME?', '#N/A', '#VALUE!', '#VALUE!', '#NUM!', '#ERROR!', '#REF!'])
    expect(it).toEqual(['#DIV/0!', '#NOME?', '#N/D', '#VALORE!', '#VALORE!', '#NUM!', '#ERRORE!', '#RIF!'])
  })

  it('nella nota gli errori restano all\'italiana, e si leggono con i due nomi', () => {
    // Togliendo una riga, il riferimento diventa #RIF! in tutte e due le lingue.
    expect(adjustFormula('=D3*2', 'row', 2, -1)).toBe('=#RIF!*2')
    expect(storedInput('#N/A')).toBe('#N/D')
    expect(storedInput('=IFERROR(A1, #N/A)')).toBe('=SE.ERRORE(A1; #N/D)')
    for (const note of ['| #N/A | #N/D | =#REF! | =#RIF! | #VALUE! |']) {
      expect(inBoth(() => values(note))).toEqual({ it: values(note), en: values(note) })
      expect(shown(note)[0]).toEqual(['#N/A', '#N/A', '#REF!', '#REF!', '#VALUE!'])
    }
  })

  it('il messaggio di ogni errore in inglese', () => {
    expect(message('| =1/0 |', 'A1')).toBe('Division by zero')
    expect(message('| #N/A |', 'A1')).toBe('The value you\'re looking for isn\'t there')
    expect(message('| #REF! |', 'A1')).toBe('The reference isn\'t valid')
  })
})

describe('i numeri mostrati all\'inglese', () => {
  const fmt = (x: number, f: Format) => formatNumber(x, f)

  it('il punto per i decimali e la virgola per le migliaia, l\'euro davanti', () => {
    expect(fmt(1234.5, { kind: 'general' })).toBe('1234.5')
    expect(fmt(5000 / 3, { kind: 'general' })).toBe('1666.666667')
    expect(fmt(2.5e12, { kind: 'general' })).toBe('2.5E+12')
    expect(fmt(1.5e-8, { kind: 'general' })).toBe('1.5E-08')
    expect(fmt(1234567.891, { kind: 'number', decimals: 2 })).toBe('1,234,567.89')
    expect(fmt(15, { kind: 'euro', decimals: 2 })).toBe('€15.00')
    expect(fmt(-1234.5, { kind: 'euro', decimals: 2 })).toBe('-€1,234.50')
    expect(fmt(0.125, { kind: 'percent', decimals: 1 })).toBe('12.5%')
    expect(formatValue(true, { kind: 'general' })).toBe('TRUE')
    expect(formatValue(false, { kind: 'general' })).toBe('FALSE')
  })

  it('una nota scritta in italiano, aperta in inglese, dà gli stessi valori', () => {
    const note = [
      '| Prodotto | Quantità | Prezzo | Totale |',
      '| --- | --- | --- | --- |',
      '| Penne | 10 | 1,50 € | =B2*C2 |',
      '| Quaderni | 1.000 | 2,4 € | =B3*C3 |',
      '| Righello | 3.5 | 0,125 | =B4*C4 |',
      '| Totale | =SOMMA(B2:B4) | 12,5% | =ARROTONDA(SOMMA(D2:D4)*(1+C5); 2) |',
      '| Media | =MEDIA(B2:B4) | VERO | =SE(C6; D5*0,5; 0) |',
    ].join('\n')
    const both = inBoth(() => values(note))
    expect(both.en).toEqual(both.it)
    expect(shown(note).slice(1)).toEqual([
      ['Penne', '10', '€1.50', '€15.00'],
      ['Quaderni', '1,000', '€2.40', '€2,400.00'],
      ['Righello', '3.5', '0.125', '0.4375'],
      // 1.000 ha i punti delle migliaia: la somma e la media li hanno anche loro, senza decimali.
      ['Totale', '1,014', '12.5%', '€2,717.37'],
      ['Media', '338', 'TRUE', '€1,358.69'],
    ])
    // E ogni modello pronto italiano, letto in inglese.
    setLangForTests('it')
    const italian = TEMPLATES.map((t) => t.source)
    for (const source of italian) expect(inBoth(() => values(source))).toEqual({ it: values(source), en: values(source) })
  })

  it('i testi uniti con & e TESTO mostrano i numeri nella lingua di Glifo', () => {
    const note = '| ="Total: "&1234,5 | =TESTO(1234,5; "0,00 €") | =TEXT(1234.5; "#,##0.00") | =TEXT(0,125; "0.0%") | =VALORE("12,5%") | ="x"&VERO |'
    expect(shown(note)[0]).toEqual(['Total: 1234.5', '€1,234.50', '1,234.50', '12.5%', '12.5%', 'xTRUE'])
    setLangForTests('it')
    expect(shown(note)[0]).toEqual(['Total: 1234,5', '1.234,50 €', '1.234,50', '12,5%', '12,5%', 'xVERO'])
  })

  it('i criteri con VERO e FALSO anche con i nomi inglesi', () => {
    const note = '| VERO | FALSO | VERO | =CONTA.SE(A1:C1; "TRUE") | =COUNTIF(A1:C1; "vero") | =COUNTIF(A1:C1; TRUE) |'
    expect(inBoth(() => shown(note)[0].slice(3))).toEqual({ it: ['2', '2', '2'], en: ['2', '2', '2'] })
  })
})

describe('quello che si scrive nelle celle in inglese', () => {
  it('i numeri all\'inglese vanno nella nota all\'italiana', () => {
    expect(storedInput('3.5')).toBe('3,5')
    expect(storedInput('1,234.5')).toBe('1.234,5')
    expect(storedInput('1,234')).toBe('1.234')
    expect(storedInput('1.234')).toBe('1,234')
    expect(storedInput('.5')).toBe(',5')
    expect(storedInput('€1.50')).toBe('1,50 €')
    expect(storedInput('-€1,234.50')).toBe('-1.234,50 €')
    expect(storedInput('12.5%')).toBe('12,5%')
    expect(storedInput('1.5E3')).toBe('1,5E3')
    expect(storedInput(' 42 ')).toBe('42')
  })

  it('VERO, FALSO, gli errori e i testi', () => {
    expect(storedInput('true')).toBe('VERO')
    expect(storedInput('FALSE')).toBe('FALSO')
    // Scritti in inglese sono testi: all'italiana sarebbero altro, quindi con l'apostrofo.
    expect(storedInput('VERO')).toBe('\'VERO')
    expect(storedInput('3,5')).toBe('\'3,5')
    expect(storedInput('1.234,5')).toBe('\'1.234,5')
    expect(storedInput('Pens')).toBe('Pens')
    expect(storedInput('\'0123')).toBe('\'0123')
    expect(storedInput('')).toBe('')
  })

  it('le formule all\'inglese vanno nella nota all\'italiana, con i nomi italiani', () => {
    expect(storedInput('=sum(a1, 1.5)')).toBe('=SOMMA(A1; 1,5)')
    expect(storedInput('=IF(A1>1,1,2)')).toBe('=SE(A1>1;1;2)')
    expect(storedInput('=ROUND(A1*.5,2)')).toBe('=ARROTONDA(A1*0,5;2)')
    expect(storedInput('="a,b"&A1')).toBe('="a,b"&A1')
    expect(storedInput('=SUM(A1,,1)')).toBe('=SOMMA(A1;;1)')
    expect(storedInput('=TRUE')).toBe('=VERO')
    // Come nell'Excel inglese la virgola separa sempre: =SUM(1,2,3) fa 6, =IF(A1>1,1,2) sceglie tra 1 e 2.
    expect(show(`| ${storedInput('=SUM(1,2,3)')} |`, 'A1')).toBe('6')
    expect(show(`| ${storedInput('=IF(B1>1,1,2)')} | 5 |`, 'A1')).toBe('1')
    // Una formula che non si legge resta com'è (e dice cosa non va).
    expect(storedInput('=SUM(1,2')).toBe('=SOMMA(1;2')
    expect(storedInput('="ciao')).toBe('="ciao')
  })

  it('la nota si mostra all\'inglese mentre si scrive', () => {
    expect(shownInput('1,50 €')).toBe('€1.50')
    expect(shownInput('1.234,5')).toBe('1,234.5')
    expect(shownInput('3.14')).toBe('3.14')
    expect(shownInput('12,5 %')).toBe('12.5%')
    expect(shownInput('-€ 5')).toBe('-€5')
    expect(shownInput('VERO')).toBe('TRUE')
    expect(shownInput('#N/D')).toBe('#N/A')
    expect(shownInput('TRUE')).toBe('\'TRUE')
    expect(shownInput('\'0123')).toBe('\'0123')
    expect(shownInput('=SE(B2>100; B2*0,9; B2)')).toBe('=IF(B2>100, B2*0.9, B2)')
    expect(shownInput('=CERCA.VERT(A1;$B$2:$C$5;2;FALSO)')).toBe('=VLOOKUP(A1,$B$2:$C$5,2,FALSE)')
    expect(shownInput('=SOMMA(1,5; 2)')).toBe('=SUM(1.5, 2)')
    expect(shownInput('=SE.ERRORE(A1/B1; #N/D)')).toBe('=IFERROR(A1/B1, #N/A)')
    // In italiano tutto com'è.
    setLangForTests('it')
    expect(shownInput('1,50 €')).toBe('1,50 €')
    expect(storedInput('3.5')).toBe('3.5')
    expect(storedInput('=sum(a1;b$2)')).toBe('=SOMMA(A1;B$2)')
  })

  it('le formule vanno all\'inglese e tornano all\'italiana uguali', () => {
    const formulas = ['=SE(B2>100; B2*0,9; B2)', '=CERCA.VERT(A1;$B$2:$C$5;2;FALSO)', '=SE.ERRORE(A1/B1; #N/D)', '="a,b"&A1', '=SOMMA(1,5; 2)', '=ARROTONDA(PI.GRECO(); 4)']
    for (const f of formulas) expect(italianFormula(englishFormula(f)), f).toBe(f)
    expect(englishFormula('=ARROTONDA(PI.GRECO(); 4)')).toBe('=ROUND(PI(), 4)')
    // Una formula che non si legge resta com'è.
    expect(englishFormula('=SE("a')).toBe('=SE("a')
  })

  it('andata e ritorno: lo stesso valore all\'inglese e all\'italiana', () => {
    const stored = ['1,50 €', '1.234,5', '3.14', '1,5e3', ',5', '€ 1.200', '-€ 5', '20 euro', '12,5 %', 'VERO', 'falso', '#N/D', 'TRUE', '1,234.5', '\'0123', 'Penne', '10.000', '−3,25', '0.500', '22%']
    const same = (a: { value: Value; format: Format }, b: { value: Value; format: Format }) => {
      expect(isError(a.value) ? a.value.error : a.value).toEqual(isError(b.value) ? b.value.error : b.value)
      expect(a.format).toEqual(b.format)
    }
    for (const s of stored) {
      same(readEnglishInput(englishInput(s)), readInput(s))
      same(readInput(italianInput(englishInput(s))), readInput(s))
    }
    const typed = ['€1.50', '1,234.5', '1,234', '1.234', '.5', 'TRUE', 'VERO', '3,5', '#N/A', '12.5%', '-€1,234.50', '1.5E3', 'Pens', '1,234,567.89', '0.125']
    for (const t of typed) same(readInput(italianInput(t)), readEnglishInput(t))
  })

  it('incollando da Excel in inglese i numeri si leggono all\'inglese', () => {
    const clip = clipFromText('Pens\t€1.50\t1,234\n=SUM(B1,2)\t3.5\tTRUE', storedInput)
    expect(clip.cells.map((r) => r.map((c) => c?.input))).toEqual([
      ['Pens', '1,50 €', '1.234'],
      ['=SOMMA(B1;2)', '3,5', 'VERO'],
    ])
  })
})

describe('i file .csv nelle due lingue', () => {
  const table = '| Prodotto | Prezzo |\n| --- | --- |\n| Penne | 1.234,5 € |\n| Quaderni | 2,4 € |\n| Ok | VERO |'

  it('in inglese si scarica con la virgola e i numeri all\'inglese', () => {
    expect(sheetToCsv(parseSheet(table))).toBe('﻿Prodotto,Prezzo\r\nPenne,"€1,234.50"\r\nQuaderni,€2.40\r\nOk,TRUE\r\n')
    setLangForTests('it')
    expect(sheetToCsv(parseSheet(table))).toBe('﻿Prodotto;Prezzo\r\nPenne;1.234,50 €\r\nQuaderni;2,40 €\r\nOk;VERO\r\n')
  })

  it('un .csv inglese e uno italiano diventano la stessa tabella, in tutte e due le lingue', () => {
    const english = 'Product,Price,Count\nPens,"1,234.50",1.234\nBooks,3.5,"1,000"\n'
    const italian = 'Product;Price;Count\nPens;1.234,50;1,234\nBooks;3,5;1.000\n'
    const expected = ['| Product | Price | Count |', '| --- | --- | --- |', '| Pens | 1.234,50 | 1,234 |', '| Books | 3,5 | 1.000 |'].join('\n')
    for (const lang of ['it', 'en'] as const) {
      setLangForTests(lang)
      expect(serializeSheet(csvToSheet(english).model), lang).toBe(expected)
      expect(serializeSheet(csvToSheet(italian).model), lang).toBe(expected)
    }
  })

  it('il .csv scaricato in inglese si riapre uguale', () => {
    const prices = '| Prodotto | Prezzo | Sconto |\n| --- | --- | --- |\n| Penne | 1.234,5 € | 12,5% |\n| Quaderni | 2,4 € | 0,5 |'
    const csv = sheetToCsv(parseSheet(prices))
    expect(csv).toBe('﻿Prodotto,Prezzo,Sconto\r\nPenne,"€1,234.50",12.5%\r\nQuaderni,€2.40,0.5\r\n')
    expect(serializeSheet(csvToSheet(csv).model)).toBe('| Prodotto | Prezzo | Sconto |\n| --- | --- | --- |\n| Penne | 1.234,50 € | 12,5% |\n| Quaderni | 2,40 € | 0,5 |')
    expect(shown(serializeSheet(csvToSheet(csv).model))).toEqual(shown(prices))
    setLangForTests('it')
    expect(shown(serializeSheet(csvToSheet(csv).model))).toEqual(shown(prices))
    // VERO e FALSO di un .csv restano testi, come sempre.
    expect(serializeSheet(csvToSheet('a,b\nok,TRUE\n').model)).toBe('| a | b |\n| --- | --- |\n| ok | TRUE |')
  })

  it('capisce come sono scritti i numeri; se non si capisce decide il separatore', () => {
    const rows = (text: string) => parseCsv(text)
    expect(csvNumbers(rows('a;b\n1;3,5'), ';')).toBe('it')
    expect(csvNumbers(rows('a;b\n1;3.5'), ';')).toBe('en')
    expect(csvNumbers(rows('a,b\n1,"3,5"'), ',')).toBe('it')
    expect(csvNumbers(rows('a,b\n1,"1,234.5"'), ',')).toBe('en')
    // 1.234 e 1,234 non dicono niente: il punto e virgola è dell'Excel italiano, la virgola di quello inglese.
    expect(csvNumbers(rows('a;b\n1;1.234'), ';')).toBe('it')
    expect(csvNumbers(rows('a,b\n1,"1,234"'), ',')).toBe('en')
    expect(serializeSheet(csvToSheet('a;b\n1;1.234\n').model)).toBe('| a | b |\n| --- | --- |\n| 1 | 1.234 |')
    // Con il tabulatore, la lingua di Glifo.
    expect(csvNumbers(rows('a\tb\n1\t1.234'), '\t')).toBe('en')
    setLangForTests('it')
    expect(csvNumbers(rows('a\tb\n1\t1.234'), '\t')).toBe('it')
  })

  it('i testi che sembrerebbero numeri restano testi', () => {
    // I numeri sono all'inglese (1.50, 2.5): «3,5» è un testo.
    const { model } = csvToSheet('Name,Code,Price\nA,"3,5",1.50\nB,"=SUM(A1)",2.5\n')
    expect(serializeSheet(model)).toBe('| Name | Code | Price |\n| --- | --- | --- |\n| A | \'3,5 | 1,50 |\n| B | \'=SUM(A1) | 2,5 |')
  })
})

describe('i file di Excel in inglese', () => {
  it('i numeri sono numeri veri: nella nota all\'italiana, nelle due lingue', () => {
    const head = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    const ns = 'xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"'
    const file = zipSync({
      'xl/workbook.xml': strToU8(`${head}<workbook ${ns}><sheets><sheet name="Sales" sheetId="1" r:id="rId1"/></sheets></workbook>`),
      'xl/_rels/workbook.xml.rels': strToU8(`${head}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="x" Target="worksheets/sheet1.xml"/></Relationships>`),
      'xl/styles.xml': strToU8(
        `${head}<styleSheet ${ns}><numFmts count="1"><numFmt numFmtId="164" formatCode="#,##0.00\\ &quot;€&quot;"/></numFmts><fonts count="1"><font/></fonts><cellXfs count="3"><xf numFmtId="0" fontId="0"/><xf numFmtId="164" fontId="0"/><xf numFmtId="14" fontId="0"/></cellXfs></styleSheet>`,
      ),
      'xl/worksheets/sheet1.xml': strToU8(
        `${head}<worksheet ${ns}><sheetData><row r="1"><c r="A1" s="1"><v>1234.5</v></c><c r="B1"><v>1.234</v></c><c r="C1" s="2"><v>46307</v></c><c r="D1" t="b"><v>1</v></c><c r="E1" t="e"><v>#N/A</v></c><c r="F1"><f>SUM(A1,B1)</f><v>1235.734</v></c></row></sheetData></worksheet>`,
      ),
    })
    const [sheet] = xlsxSheets(file)
    expect(serializeSheet(sheet.model)).toBe('| 1.234,50 € | 1,234 | 12/10/2026 | VERO | #N/D | =SOMMA(A1; B1) |')
    expect(shown(serializeSheet(sheet.model))[0]).toEqual(['€1,234.50', '1.234', '12/10/2026', 'TRUE', '#N/A', '€1,235.73'])
    // Le date sono testi: in inglese come le scrive il browser (negli Stati Uniti prima il mese).
    const languages = Object.getOwnPropertyDescriptor(navigator, 'languages')
    Object.defineProperty(navigator, 'languages', { value: ['en-US'], configurable: true })
    try {
      expect(serializeSheet(xlsxSheets(file)[0].model)).toContain('| 10/12/2026 |')
    } finally {
      if (languages) Object.defineProperty(navigator, 'languages', languages)
    }
    setLangForTests('it')
    expect(serializeSheet(xlsxSheets(file)[0].model)).toBe('| 1.234,50 € | 1,234 | 12/10/2026 | VERO | #N/D | =SOMMA(A1; B1) |')
  })

  it('il nome del foglio e i messaggi in inglese', () => {
    expect(() => xlsxSheets(zipSync({ 'a.txt': strToU8('x') }))).toThrow('The file isn\'t an Excel file (.xlsx): the workbook is missing')
    const [sheet] = xlsxSheets(sheetToXlsx(parseSheet('| 1 |')))
    expect(sheet.name).toBe('Table')
  })
})

describe('i modelli pronti in inglese', () => {
  const template = (name: string) => TEMPLATES.find((t) => t.name === name)!.source

  it('nomi, righe di aiuto e tabelle in inglese, con i nomi inglesi delle funzioni', () => {
    expect(TEMPLATES.map((t) => t.name)).toEqual([
      'Invoice with VAT',
      'Break-even point',
      'Income statement',
      'Loan amortization schedule',
      'Selling price',
      'Project quote',
      'Gantt chart',
    ])
    expect(TEMPLATES[0].hint).toBe('Quantity times price, the taxable amount with SUM, 22% VAT and the total')
    const invoice = template('Invoice with VAT')
    expect(invoice.split('\n')[0]).toBe('| Product | Quantity | Price | Total |')
    expect(invoice).toContain('**=SUM(D2:D4)**')
    expect(template('Loan amortization schedule')).toContain('=-PMT(B2; B3; B1)')
    for (const t of TEMPLATES) {
      // Niente italiano nelle intestazioni e nei testi; nessun nome italiano delle funzioni.
      expect(t.source, t.name).not.toMatch(/\b(SOMMA|RATA|Prodotto|Totale|Ricavi|Attività|Durata)\b/)
      expect(serializeSheet(parseSheet(t.source)), t.name).toBe(t.source)
    }
  })

  it('fanno gli stessi conti dei modelli italiani, letti in tutte e due le lingue', () => {
    const english = TEMPLATES.map((t) => t.source)
    setLangForTests('it')
    const italian = TEMPLATES.map((t) => t.source)
    english.forEach((source, i) => {
      // Le intestazioni sono diverse, i valori dei numeri uguali.
      const numbers = (s: string) => values(s).map((row) => row.filter((cell) => typeof (cell as unknown[])[0] !== 'string'))
      expect(numbers(source), TEMPLATES[i].name).toEqual(numbers(italian[i]))
      setLangForTests('en')
      expect(numbers(source), TEMPLATES[i].name).toEqual(numbers(italian[i]))
      setLangForTests('it')
    })
    setLangForTests('en')
    const invoice = shown(template('Invoice with VAT'))
    expect(invoice[1]).toEqual(['Pens', '10', '€1.50', '€15.00'])
    expect(invoice[6]).toEqual(['Total', '', '', '€75.64'])
  })

  it('riaperti da un .xlsx tornano uguali', () => {
    for (const t of TEMPLATES) {
      const [sheet] = xlsxSheets(sheetToXlsx(parseSheet(t.source), t.name))
      expect(sheet.valuesOnly, t.name).toBe(0)
      expect(shown(serializeSheet(sheet.model)), t.name).toEqual(shown(t.source))
    }
  })

  it('«Graph» sul punto di pareggio scrive le righe del blocco, con il titolo in inglese', () => {
    const model = parseSheet(template('Break-even point'))
    const made = chartLines(model, chartRange(model, { top: 9, left: 1, bottom: 9, right: 1 }))
    expect(made.lines).toEqual(['titolo: Break-even point', 'asse x: Quantity', 'asse y: €', 'dati: A8:D13', 'pareggio: Revenue, Total costs'])
  })

  it('il Gantt in inglese ha le attività per il diagramma, con le unità di sempre', () => {
    const source = template('Gantt chart')
    const model = parseSheet(source)
    expect(isPlanRange(model, { top: 0, left: 0, bottom: 8, right: 4 })).toBe(true)
    const { plan } = planData(source, 'A1:E9')
    expect(plan?.unit).toBe('giorni')
    expect(plan?.activities.map((a) => a.after)).toEqual(['', 'A', 'A', 'B', 'C', 'D, E', 'F', 'F'])
    expect(plan?.activities[0]).toMatchObject({ id: 'A', name: 'Requirements analysis', duration: 5, who: 'Analyst' })
    expect(plan?.has).toEqual({ after: true, who: true, done: false, name: true })
    expect(planData('| Task | Duration (weeks) | Working days |\n| A | 2 | 1 |', 'A1:C2').plan?.unit).toBe('settimane')
  })
})

describe('grafici e progetti: i messaggi in inglese', () => {
  it('chartData e planData spiegano in inglese cosa non va', () => {
    expect(chartData(null, 'A1:B2').error).toBe('There\'s no table before the graph in the note: the data come from the table written above it')
    expect(chartData('| a |', 'nonsense').error).toBe('Write the data cells as in Excel, for example dati: A8:D13')
    expect(chartData('| 1 | 2 |', 'A1:A1').error).toMatch(/^At least two columns are needed/)
    expect(chartData('| 1 | 2 |\n| 2 | 3 |', 'A1:B2').table?.names).toEqual(['', 'Column B'])
    expect(planData('| A | B |', 'A1:B1').error).toBe('The duration column is missing: call it “Duration” (or “Duration (weeks)”, “Working days”…)')
    expect(planData('| Task | Duration |', 'A1:B1').error).toBe('Below the names of the columns you need the activities, one per row')
  })
})

describe('l\'anteprima e i file .md in inglese', () => {
  const text = ['| Prodotto | Prezzo |', '| --- | --- |', '| **Penne** | 1,5 € |', '| Totale | =SOMMA(B2:B2)*1,5 |', '| Errore | =1/0 |', '| Ok | VERO |'].join('\n')

  it('numeri, VERO/FALSO, errori e formule all\'inglese', () => {
    const html = sheetHtml(text, (s) => s)
    expect(html).toContain('<td class="sheet-num">€1.50</td>')
    expect(html).toContain('<td class="sheet-num" title="B3: =SUM(B2:B2)*1.5">€2.25</td>')
    expect(html).toContain('<td class="sheet-error" title="B4: =1/0\nDivision by zero">#DIV/0!</td>')
    expect(html).toContain('<td class="sheet-bool">TRUE</td>')
    expect(sheetHtml('', (s) => s)).toContain('Empty table')
  })

  it('«Edit» sulla tabella', () => {
    const host = document.createElement('div')
    host.innerHTML = '<div class="sheet-block"></div>'
    hydrateSheets(host)
    const button = host.querySelector<HTMLButtonElement>('.sheet-edit')!
    expect(button.textContent).toBe('Edit')
    expect(button.title).toBe('Edit the table (or double-click it)')
  })

  it('nel file .md i risultati all\'inglese, il blocco come nella nota', () => {
    const file = sheetsForFile('```tabella\n' + text + '\n```')
    expect(file).toContain('| **Penne** | €1.50 |')
    expect(file).toContain('<!-- glifo-tabella · to edit the table with its formulas, open this file with Glifo')
    expect(file).toContain('| Totale | =SOMMA(B2:B2)*1,5 |')
  })
})

describe('l\'editor delle tabelle in inglese', () => {
  function open(source: string) {
    const saved: SheetModel[] = []
    void openSheetEditor({ sheet: parseSheet(source), onSave: (sheet) => saved.push(sheet) })
    const dialog = document.querySelector<HTMLDialogElement>('dialog.sheet-editor')!
    const input = document.querySelector<HTMLInputElement>('.sheet-cell-input')!
    const bar = document.querySelector<HTMLInputElement>('.sheet-formula')!
    const grid = document.querySelector<HTMLElement>('.sheet-grid-wrap')!
    const hint = document.querySelector<HTMLElement>('.sheet-hint')!
    const cell = (row: number, col: number) => document.getElementById(`sheet-${row}-${col}`)!
    const key = (target: Element, k: string) => target.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }))
    const type = (text: string) => {
      input.value = text
      input.setSelectionRange(text.length, text.length)
      input.dispatchEvent(new Event('input', { bubbles: true }))
    }
    const done = () => [...dialog.querySelectorAll<HTMLButtonElement>('button')].find((b) => b.textContent?.trim() === 'Done')!.click()
    return { dialog, input, bar, grid, hint, cell, key, type, done, saved }
  }

  it('i pulsanti, i menu e gli aiuti in inglese', () => {
    const { dialog, hint, grid } = open('| a | 1 |')
    expect(dialog.getAttribute('aria-label')).toBe('Table editor')
    expect(dialog.querySelector('.schema-title')?.textContent).toBe('Table')
    const labels = [...dialog.querySelectorAll<HTMLButtonElement>('.sheet-bar button')].map((b) => b.textContent?.trim()).filter(Boolean)
    expect(labels).toEqual(['Σ', '€', '%', '000', '←.0', '.00→', 'Header', 'Rows', 'Columns', 'File', 'Templates', 'Close', 'Done'])
    expect(dialog.querySelector<HTMLButtonElement>('.sheet-tools button')?.title).toBe('Undo (Ctrl+Z)')
    expect(hint.textContent).toBe('Type a number (also €1.50 or 22%), text or a formula starting with =, like =B2*C2 or =SUM(B2:B5).')
    // Il menu delle righe.
    const rows = [...dialog.querySelectorAll<HTMLButtonElement>('.sheet-menu-button')].find((b) => b.textContent?.includes('Rows'))!
    rows.click()
    expect([...dialog.querySelectorAll('.sheet-menu-item span')].map((s) => s.textContent)).toEqual(['Insert a row above', 'Insert a row below', 'Delete row 1'])
    grid.focus()
  })

  it('i numeri si vedono e si scrivono all\'inglese, e nella nota vanno all\'italiana', () => {
    const { input, bar, grid, cell, key, type, done, saved } = open('| Penne | 1,50 € | 1.234,5 | =SOMMA(B1;C1) |')
    expect([0, 1, 2, 3].map((c) => cell(0, c).textContent)).toEqual(['Penne', '€1.50', '1,234.5', '€1,236.00'])
    // La cella con la formula: nella barra all'inglese.
    cell(0, 3).dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true, cancelable: true }))
    expect(bar.value).toBe('=SUM(B1,C1)')
    // F2 sulla cella del prezzo: si scrive all'inglese.
    cell(0, 1).dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true, cancelable: true }))
    key(grid, 'F2')
    expect(input.value).toBe('€1.50')
    type('€2.5')
    key(input, 'Enter')
    expect(cell(0, 1).textContent).toBe('€2.50')
    expect(cell(0, 3).textContent).toBe('€1,237.00')
    // Invio è andato sotto: una formula all'inglese, con la virgola tra gli argomenti.
    key(grid, '=')
    type('=ROUND(B1*1.5,1)')
    key(input, 'Enter')
    // Riscritta com'era, la cella non cambia.
    cell(0, 2).dispatchEvent(new PointerEvent('pointerdown', { button: 0, bubbles: true, cancelable: true }))
    key(grid, 'F2')
    expect(input.value).toBe('1,234.5')
    key(input, 'Enter')
    done()
    expect(serializeSheet(saved[0])).toBe('| Penne | 2,5 € | 1.234,5 | =SOMMA(B1;C1) |\n|  | =ARROTONDA(B1*1,5;1) |  |  |')
  })

  it('i suggerimenti e l\'aiuto delle funzioni con i nomi inglesi', () => {
    const { input, grid, key, type, hint } = open('| 1 |')
    key(grid, '=')
    type('=SU')
    const items = [...document.querySelectorAll('.sheet-suggest-item strong')].map((s) => s.textContent)
    expect(items).toEqual(['SUM', 'SUMIF', 'SUMPRODUCT'])
    key(input, 'Tab')
    expect(input.value).toBe('=SUM(')
    expect(hint.textContent).toBe('SUM(number1, [number2], …) — The sum of the numbers (also of ranges like B2:B10)')
    key(input, 'Escape')
  })
})
