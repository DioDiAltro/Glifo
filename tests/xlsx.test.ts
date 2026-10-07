// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { strFromU8, strToU8, unzipSync, zipSync } from 'fflate'
import { formatFromExcel, fromExcelFormula, functionsWithoutExcelName, sheetToXlsx, textCell, toExcelFormula, xlsxSheets, XlsxError } from '../src/spreadsheet/xlsx'
import { csvDelimiter, csvToSheet, parseCsv, sheetToCsv } from '../src/spreadsheet/csv'
import { parseSheet, serializeSheet } from '../src/spreadsheet/model'
import { TEMPLATES } from '../src/spreadsheet/templates'
import { SheetEvaluator } from '../src/spreadsheet/evaluate'
import { formatValue } from '../src/spreadsheet/format'

const template = (name: string) => TEMPLATES.find((t) => t.name === name)!.source
const shown = (source: string) => new SheetEvaluator(parseSheet(source)).all().map((row) => row.map((r) => formatValue(r.value, r.format)))

describe('le formule nei file di Excel', () => {
  it('dall\'italiano all\'inglese, con la virgola tra gli argomenti e il punto nei decimali', () => {
    expect(toExcelFormula('=SE(B2>100; B2*0,9; B2)')).toBe('IF(B2>100,B2*0.9,B2)')
    expect(toExcelFormula('=SOMMA(D2:D4)')).toBe('SUM(D2:D4)')
    expect(toExcelFormula('=-RATA(B2; B3; B1)')).toBe('-PMT(B2,B3,B1)')
    expect(toExcelFormula('=CERCA.VERT(A1;$B$2:$C$5;2;FALSO)')).toBe('VLOOKUP(A1,$B$2:$C$5,2,FALSE)')
    expect(toExcelFormula('=B10*24%')).toBe('B10*24%')
    expect(toExcelFormula('=SE(A1="sì";"va ""bene""";#N/D)')).toBe('IF(A1="sì","va ""bene""",#N/A)')
    expect(toExcelFormula('=somma(a1:a3)')).toBe('SUM(A1:A3)')
    expect(toExcelFormula('=SOMMA(')).toBeNull()
  })

  it('dall\'inglese all\'italiano; quelle che Glifo non sa fare restano valori', () => {
    expect(fromExcelFormula('IF(B2>100,B2*0.9,B2)')).toBe('=SE(B2>100; B2*0,9; B2)')
    expect(fromExcelFormula('_xlfn.STDEV.S(A1:A5)')).toBe('=DEV.ST(A1:A5)')
    expect(fromExcelFormula('ROUND(A1*1.22,2)')).toBe('=ARROTONDA(A1*1,22; 2)')
    expect(fromExcelFormula('IF(A1,,1)')).toBe('=SE(A1; ; 1)')
    expect(fromExcelFormula('"a,b"&A1')).toBe('="a,b"&A1')
    expect(fromExcelFormula('IFERROR(A1/B1,#N/A)')).toBe('=SE.ERRORE(A1/B1; #N/D)')
    expect(fromExcelFormula('SUM(Foglio2!A1:A3)')).toBeNull()
    expect(fromExcelFormula('XLOOKUP(A1,B:B,C:C)')).toBeNull()
    expect(fromExcelFormula('Totale*2')).toBeNull()
  })

  it('ogni funzione di Glifo ha il suo nome nell\'Excel inglese', () => {
    expect(functionsWithoutExcelName()).toEqual([])
  })

  it('i formati di Excel diventano quelli di Glifo', () => {
    expect(formatFromExcel(0, undefined)).toBeNull()
    expect(formatFromExcel(4, undefined)).toEqual({ kind: 'number', decimals: 2 })
    expect(formatFromExcel(9, undefined)).toEqual({ kind: 'percent', decimals: 0 })
    expect(formatFromExcel(14, undefined)).toBe('date')
    expect(formatFromExcel(164, '#,##0.00\\ "€"')).toEqual({ kind: 'euro', decimals: 2 })
    expect(formatFromExcel(165, '[$€-410]\\ #,##0')).toEqual({ kind: 'euro', decimals: 0 })
    expect(formatFromExcel(166, '0.0%')).toEqual({ kind: 'percent', decimals: 1 })
    expect(formatFromExcel(167, 'dd/mm/yyyy')).toBe('date')
    expect(formatFromExcel(168, 'hh:mm')).toBe('time')
    // Un anno scritto 2026 non diventa 2.026.
    expect(formatFromExcel(169, '0')).toBeNull()
    expect(formatFromExcel(170, '#,##0.000;[Red]-#,##0.000')).toEqual({ kind: 'number', decimals: 3 })
  })
})

describe('scrivere e leggere un .xlsx', () => {
  it('il file ha le parti che Excel si aspetta, con le formule in inglese e i loro risultati', () => {
    const files = unzipSync(sheetToXlsx(parseSheet(template('Fattura con l\'IVA')), 'Fattura'))
    expect(Object.keys(files).sort()).toEqual([
      '[Content_Types].xml',
      '_rels/.rels',
      'docProps/app.xml',
      'docProps/core.xml',
      'xl/_rels/workbook.xml.rels',
      'xl/styles.xml',
      'xl/workbook.xml',
      'xl/worksheets/sheet1.xml',
    ])
    const sheet = strFromU8(files['xl/worksheets/sheet1.xml'])
    expect(sheet).toContain('<c r="D2" s="')
    expect(sheet).toContain('<f>B2*C2</f><v>15</v>')
    expect(sheet).toContain('<f>SUM(D2:D4)</f><v>62</v>')
    // L'intestazione bloccata, come in Excel.
    expect(sheet).toContain('state="frozen"')
    expect(strFromU8(files['xl/workbook.xml'])).toContain('<sheet name="Fattura"')
    expect(strFromU8(files['xl/styles.xml'])).toContain('formatCode="#,##0.00\\ &quot;€&quot;"')
    // Tutte le parti sono XML che si legge.
    for (const [name, data] of Object.entries(files)) {
      expect(new DOMParser().parseFromString(strFromU8(data), 'application/xml').getElementsByTagName('parsererror'), name).toHaveLength(0)
    }
  })

  it('riaperto, ogni modello pronto torna uguale', () => {
    for (const t of TEMPLATES) {
      const [sheet] = xlsxSheets(sheetToXlsx(parseSheet(t.source), t.name))
      expect(sheet.valuesOnly, t.name).toBe(0)
      expect(serializeSheet(sheet.model), t.name).toBe(serializeSheet(parseSheet(t.source)))
      expect(shown(serializeSheet(sheet.model)), t.name).toEqual(shown(t.source))
    }
  })

  /** Un .xlsx come lo scrive Excel: le stringhe condivise, gli stili, le formule condivise, più fogli. */
  function excelFile(): Uint8Array {
    const head = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    const ns = 'xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"'
    return zipSync({
      'xl/workbook.xml': strToU8(`${head}<workbook ${ns}><sheets><sheet name="Vendite" sheetId="1" r:id="rId1"/><sheet name="Note" sheetId="2" r:id="rId2"/></sheets></workbook>`),
      'xl/_rels/workbook.xml.rels': strToU8(
        `${head}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="x" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="x" Target="/xl/worksheets/sheet2.xml"/></Relationships>`,
      ),
      'xl/sharedStrings.xml': strToU8(`${head}<sst ${ns}><si><t>Prodotto</t></si><si><t>Prezzo</t></si><si><r><t>Pen</t></r><r><rPr><b/></rPr><t>ne</t></r></si><si><t>Data</t></si><si><t>2026</t></si></sst>`),
      'xl/styles.xml': strToU8(
        `${head}<styleSheet ${ns}><numFmts count="1"><numFmt numFmtId="164" formatCode="#,##0.00\\ &quot;€&quot;"/></numFmts><fonts count="2"><font/><font><b/></font></fonts><cellXfs count="4"><xf numFmtId="0" fontId="0"/><xf numFmtId="164" fontId="0"/><xf numFmtId="14" fontId="0"/><xf numFmtId="0" fontId="1"/></cellXfs></styleSheet>`,
      ),
      'xl/worksheets/sheet1.xml': strToU8(
        `${head}<worksheet ${ns}><sheetData>` +
          '<row r="1"><c r="A1" t="s"><v>0</v></c><c r="B1" t="s"><v>1</v></c><c r="C1" t="s"><v>3</v></c><c r="D1" t="inlineStr"><is><t>Con IVA</t></is></c></row>' +
          '<row r="2"><c r="A2" t="s"><v>2</v></c><c r="B2" s="1"><v>1.5</v></c><c r="C2" s="2"><v>46307</v></c><c r="D2" s="1"><f t="shared" ref="D2:D3" si="0">B2*1.22</f><v>1.83</v></c></row>' +
          '<row r="3"><c r="A3" t="s"><v>4</v></c><c r="B3" s="1"><v>2</v></c><c r="D3" s="1"><f t="shared" si="0"/><v>2.44</v></c></row>' +
          '<row r="4"><c r="A4" s="3" t="inlineStr"><is><t>Totale</t></is></c><c r="B4" s="1"><f>_xlfn.XLOOKUP(1,A2:A3,B2:B3)</f><v>3.5</v></c><c r="D4" s="1"><f>SUM(D2:D3)</f><v>4.27</v></c></row>' +
          '</sheetData></worksheet>',
      ),
      'xl/worksheets/sheet2.xml': strToU8(`${head}<worksheet ${ns}><sheetData><row r="1"><c r="A1" t="inlineStr"><is><t>=non è una formula</t></is></c><c r="B1" t="b"><v>1</v></c><c r="C1" t="e"><v>#DIV/0!</v></c></row></sheetData></worksheet>`),
    })
  }

  it('legge un file di Excel: testi, numeri in euro, date, formule condivise e quelle che Glifo non ha', () => {
    const [vendite, note] = xlsxSheets(excelFile())
    expect(vendite.name).toBe('Vendite')
    expect(vendite.valuesOnly).toBe(1)
    expect(vendite.model.header).toBe(true)
    expect(serializeSheet(vendite.model).split('\n')).toEqual([
      '| Prodotto | Prezzo | Data | Con IVA |',
      '| --- | --- | --- | --- |',
      '| Penne | 1,50 € | 12/10/2026 | =B2*1,22 |',
      '| \'2026 | 2,00 € |  | =B3*1,22 |',
      '| **Totale** | 3,50 € |  | =SOMMA(D2:D3) |',
    ])
    expect(shown(serializeSheet(vendite.model))[3][3]).toBe('4,27 €')
    expect(note.name).toBe('Note')
    expect(serializeSheet(note.model)).toBe('| \'=non è una formula | VERO | #DIV/0! |')
  })

  it('un file che non è un .xlsx lo dice', () => {
    expect(() => xlsxSheets(strToU8('ciao'))).toThrow(XlsxError)
    expect(() => xlsxSheets(zipSync({ 'a.txt': strToU8('x') }))).toThrow(/manca la cartella di lavoro/)
  })

  it('i testi che sembrerebbero numeri o formule restano testi', () => {
    expect(textCell('2026')).toEqual({ input: '\'2026' })
    expect(textCell('=A1')).toEqual({ input: '\'=A1' })
    expect(textCell('vero')).toEqual({ input: '\'vero' })
    expect(textCell('Penne\nrosse')).toEqual({ input: 'Penne rosse' })
    expect(textCell('  ')).toBeUndefined()
  })
})

describe('i file .csv', () => {
  it('capisce il separatore: punto e virgola, tabulatore o virgola', () => {
    expect(csvDelimiter('a;b;c\n1;2;3')).toBe(';')
    expect(csvDelimiter('a\tb\n1\t2')).toBe('\t')
    expect(csvDelimiter('a,b\n1,2')).toBe(',')
    // La virgola dei decimali italiani non inganna.
    expect(csvDelimiter('Prodotto;Prezzo\nPenne;1,50\nQuaderni;2,40')).toBe(';')
    expect(csvDelimiter('"a;b",c\n"d;e",f')).toBe(',')
  })

  it('legge le virgolette, gli a capo dentro le celle e il BOM', () => {
    expect(parseCsv('﻿a;"b;c";"d ""e"""\r\n1;"due\nrighe";3\r\n')).toEqual([
      ['a', 'b;c', 'd "e"'],
      ['1', 'due\nrighe', '3'],
    ])
  })

  it('un .csv dell\'Excel italiano e uno inglese diventano la stessa tabella', () => {
    const it1 = csvToSheet('Prodotto;Prezzo;Quantità\nPenne;1,50;10\nZaino;35;1\n')
    const en = csvToSheet('Prodotto,Prezzo,Quantità\nPenne,1.50,10\nZaino,35,1\n')
    expect(serializeSheet(it1.model)).toBe(serializeSheet(en.model))
    expect(it1.model.header).toBe(true)
    expect(shown(serializeSheet(it1.model))[1][1]).toBe('1,5')
    expect(serializeSheet(csvToSheet('a;=SOMMA(A1)\n').model)).toBe('| a | \'=SOMMA(A1) |')
  })

  it('scrive i valori come si vedono, con il punto e virgola, per l\'Excel italiano', () => {
    const csv = sheetToCsv(parseSheet(template('Fattura con l\'IVA')))
    expect(csv.startsWith('﻿')).toBe(true)
    const lines = csv.slice(1).trimEnd().split('\r\n')
    expect(lines[0]).toBe('Prodotto;Quantità;Prezzo;Totale')
    expect(lines[1]).toBe('Penne;10;1,50 €;15,00 €')
    expect(lines[6]).toBe('Totale;;;75,64 €')
    expect(sheetToCsv(parseSheet('| a;b | "c" |'))).toBe('﻿"a;b";"""c"""\r\n')
    // Riletto, torna la stessa tabella di valori.
    expect(shown(serializeSheet(csvToSheet(csv).model))[6][3]).toBe('75,64 €')
  })
})
