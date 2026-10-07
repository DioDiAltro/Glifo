/**
 * I file di Excel (.xlsx) delle tabelle. Un .xlsx è uno zip di file XML (Office Open XML): lo zip lo
 * fa la libreria fflate, l'XML Glifo. Si scrive la tabella con le formule (e il loro risultato, per i
 * programmi che non le calcolano), i formati (euro, percentuale, decimali), il grassetto e
 * l'intestazione bloccata; si legge un foglio di un file fatto con Excel, LibreOffice o Fogli Google.
 * Nei file le formule sono in inglese con la virgola tra gli argomenti (=SUM(B2,C2)): si traducono dai
 * nomi italiani di Glifo e ritorno. Le formule che Glifo non sa fare (altre funzioni, altri fogli)
 * restano con il loro valore.
 */
import { strFromU8, strToU8, unzipSync, zipSync } from 'fflate'
import { SheetEvaluator } from './evaluate'
import { formulaBody, isFormula, parseFormula, shiftFormula, tokenize, type Token } from './formula'
import { formatNumber, readNumber, sameFormat, type Format } from './format'
import { allFunctions, lookupFunction } from './functions'
import { emptySheet, MAX_COLS, MAX_ROWS, sheetSize, type SheetCell, type SheetModel } from './model'
import { cellName, colIndex } from './refs'
import { ERROR_NAMES, isError, type ErrorCode } from './values'

// ——— Le formule: dall'italiano all'inglese e ritorno ———

/** Il nome di ogni funzione nell'Excel inglese, quello scritto nei file (anche nell'Excel italiano). */
export const EXCEL_NAMES: Record<string, string> = {
  'AMMORT.COST': 'SLN',
  'ANNULLA.SPAZI': 'TRIM',
  ARROTONDA: 'ROUND',
  'ARROTONDA.PER.DIF': 'ROUNDDOWN',
  'ARROTONDA.PER.ECC': 'ROUNDUP',
  ASS: 'ABS',
  'CERCA.ORIZZ': 'HLOOKUP',
  'CERCA.VERT': 'VLOOKUP',
  CONCATENA: 'CONCATENATE',
  CONFRONTA: 'MATCH',
  'CONTA.NUMERI': 'COUNT',
  'CONTA.SE': 'COUNTIF',
  'CONTA.VALORI': 'COUNTA',
  'CONTA.VUOTE': 'COUNTBLANK',
  DESTRA: 'RIGHT',
  'DEV.ST': 'STDEV',
  'DEV.ST.P': 'STDEVP',
  E: 'AND',
  EXP: 'EXP',
  FALSO: 'FALSE',
  GRANDE: 'LARGE',
  INDICE: 'INDEX',
  INT: 'INT',
  INTERESSI: 'IPMT',
  LN: 'LN',
  LOG: 'LOG',
  LOG10: 'LOG10',
  LUNGHEZZA: 'LEN',
  MAIUSC: 'UPPER',
  MAX: 'MAX',
  MEDIA: 'AVERAGE',
  'MEDIA.SE': 'AVERAGEIF',
  MEDIANA: 'MEDIAN',
  MIN: 'MIN',
  MINUSC: 'LOWER',
  MODA: 'MODE',
  NON: 'NOT',
  O: 'OR',
  'P.RATA': 'PPMT',
  'PI.GRECO': 'PI',
  PICCOLO: 'SMALL',
  POTENZA: 'POWER',
  PRODOTTO: 'PRODUCT',
  RADQ: 'SQRT',
  RATA: 'PMT',
  RESTO: 'MOD',
  SE: 'IF',
  'SE.ERRORE': 'IFERROR',
  SEGNO: 'SIGN',
  SINISTRA: 'LEFT',
  SOMMA: 'SUM',
  'SOMMA.PRODOTTO': 'SUMPRODUCT',
  'SOMMA.SE': 'SUMIF',
  'STRINGA.ESTRAI': 'MID',
  TESTO: 'TEXT',
  'TIR.COST': 'IRR',
  TRONCA: 'TRUNC',
  VA: 'PV',
  'VAL.ERRORE': 'ISERROR',
  'VAL.FUT': 'FV',
  'VAL.NUMERO': 'ISNUMBER',
  'VAL.TESTO': 'ISTEXT',
  'VAL.VUOTO': 'ISBLANK',
  VALORE: 'VALUE',
  VAN: 'NPV',
  VAR: 'VAR',
  'VAR.P': 'VARP',
  VERO: 'TRUE',
}

const EXCEL_ERRORS: Record<ErrorCode, string> = {
  '#DIV/0!': '#DIV/0!',
  '#N/D': '#N/A',
  '#VALORE!': '#VALUE!',
  '#RIF!': '#REF!',
  '#NOME?': '#NAME?',
  '#NUM!': '#NUM!',
  '#ERRORE!': '#VALUE!',
}

/** Un numero come lo scrive Excel nei file: con il punto. */
function plainNumber(v: number): string {
  return String(v)
}

/** La formula di Glifo (con l'=) come la scrive Excel nei file, senza l'=; null se non si legge. */
export function toExcelFormula(input: string): string | null {
  let tokens: Token[]
  try {
    tokens = tokenize(formulaBody(input))
    parseFormula(formulaBody(input))
  } catch {
    return null
  }
  const body = formulaBody(input)
  return tokens
    .map((t, i): string => {
      switch (t.k) {
        case 'num':
          return plainNumber(t.v)
        case 'str':
          return `"${t.v.replace(/"/g, '""')}"`
        case 'err':
          return EXCEL_ERRORS[t.v]
        case 'ref':
          return body.slice(t.from, t.to).toUpperCase()
        case 'name': {
          const upper = t.v.toUpperCase()
          if (tokens[i + 1]?.k === '(') {
            const spec = lookupFunction(upper)
            return spec ? (EXCEL_NAMES[spec.name] ?? spec.name) : upper
          }
          return upper === 'VERO' ? 'TRUE' : upper === 'FALSO' ? 'FALSE' : upper
        }
        case 'op':
          return t.v
        case 'sep':
          return ','
        default:
          return t.k
      }
    })
    .join('')
}

/**
 * La formula di un file (in inglese, senza l'=) per Glifo, con l'= e i nomi italiani; null se Glifo
 * non la sa fare (una funzione che non c'è, un altro foglio, un nome definito nel file).
 */
export function fromExcelFormula(english: string): string | null {
  // In inglese la virgola separa sempre gli argomenti (anche quelli vuoti, =IF(A1,,1)): il punto è dei decimali.
  const text = english.replace(/("(?:[^"]|"")*")|,/g, (_, str: string | undefined) => str ?? ';')
  let tokens: Token[]
  try {
    tokens = tokenize(text)
  } catch {
    return null
  }
  const parts: string[] = []
  for (const [i, t] of tokens.entries()) {
    switch (t.k) {
      case 'num':
        parts.push(String(t.v).replace('.', ','))
        break
      case 'str':
        parts.push(`"${t.v.replace(/"/g, '""')}"`)
        break
      case 'err':
        parts.push(t.v)
        break
      case 'ref':
        parts.push(text.slice(t.from, t.to).toUpperCase())
        break
      case 'name': {
        const upper = t.v.toUpperCase().replace(/^_XLFN\.|^_XLWS\./, '')
        if (tokens[i + 1]?.k === '(') {
          const spec = lookupFunction(upper)
          if (!spec) return null
          parts.push(spec.name)
        } else if (upper === 'TRUE' || upper === 'VERO') parts.push('VERO')
        else if (upper === 'FALSE' || upper === 'FALSO') parts.push('FALSO')
        else return null
        break
      }
      case 'op':
        parts.push(t.v)
        break
      case 'sep':
        parts.push('; ')
        break
      default:
        parts.push(t.k)
    }
  }
  const formula = `=${parts.join('')}`
  try {
    parseFormula(formulaBody(formula))
  } catch {
    return null
  }
  return formula
}

// ——— Scrivere ———

const XML_HEAD = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
const MAIN_NS = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'
const REL_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'

/** Il testo dentro l'XML: i caratteri speciali scappati, quelli che l'XML non ammette tolti. */
function xml(text: string): string {
  return text
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f￾￿]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Il codice del formato di Excel (nei file si scrive all'inglese: il punto per i decimali). */
function excelFormatCode(f: Format): string | null {
  if (f.kind === 'general') return null
  const decimals = f.decimals > 0 ? `.${'0'.repeat(f.decimals)}` : ''
  if (f.kind === 'percent') return `0${decimals}%`
  if (f.kind === 'euro') return `#,##0${decimals}\\ "€"`
  return `#,##0${decimals}`
}

/** Il nome del foglio come lo vuole Excel: al massimo 31 caratteri, senza \ / ? * [ ] : */
export function sheetTitle(name: string): string {
  const clean = name.replace(/[\\/?*[\]:]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 31).replace(/^'|'$/g, '')
  return clean || 'Tabella'
}

/** La tabella come file .xlsx, con un foglio solo (`name`). */
export function sheetToXlsx(model: SheetModel, name = 'Tabella'): Uint8Array {
  const sheet = new SheetEvaluator(model)
  const { rows, cols } = sheetSize(model)
  // Gli stili: uno per ogni coppia formato e grassetto usata (lo 0 è quello di sempre).
  const formats: string[] = []
  const styles: { numFmt: number; bold: boolean }[] = [{ numFmt: 0, bold: false }]
  const styleOf = (format: Format, bold: boolean): number => {
    const code = excelFormatCode(format)
    let numFmt = 0
    if (code) {
      let i = formats.indexOf(code)
      if (i < 0) i = formats.push(code) - 1
      numFmt = 164 + i
    }
    let s = styles.findIndex((st) => st.numFmt === numFmt && st.bold === bold)
    if (s < 0) s = styles.push({ numFmt, bold }) - 1
    return s
  }
  const widths = Array.from({ length: cols }, () => 8)
  const rowsXml: string[] = []
  for (let r = 0; r < rows; r++) {
    const cells: string[] = []
    for (let c = 0; c < cols; c++) {
      const cell = model.cells[r]?.[c]
      if (!cell?.input && !cell?.format) continue
      const res = sheet.result(r, c)
      const bold = !!cell.bold || (model.header && r === 0)
      const s = styleOf(res.format, bold)
      const ref = cellName(r, c)
      const attr = `r="${ref}"${s ? ` s="${s}"` : ''}`
      const v = res.value
      const shown = typeof v === 'number' ? formatNumber(v, res.format) : typeof v === 'string' ? v : ''
      widths[c] = Math.max(widths[c], Math.min(60, shown.length + 2))
      if (cell.input && isFormula(cell.input)) {
        const f = toExcelFormula(cell.input)
        if (f !== null) {
          const formula = `<f>${xml(f)}</f>`
          if (typeof v === 'number') cells.push(`<c ${attr}>${formula}<v>${plainNumber(v)}</v></c>`)
          else if (typeof v === 'string') cells.push(`<c ${attr} t="str">${formula}<v>${xml(v)}</v></c>`)
          else if (typeof v === 'boolean') cells.push(`<c ${attr} t="b">${formula}<v>${v ? 1 : 0}</v></c>`)
          else if (isError(v)) cells.push(`<c ${attr} t="e">${formula}<v>${EXCEL_ERRORS[v.error]}</v></c>`)
          else cells.push(`<c ${attr}>${formula}</c>`)
          continue
        }
        // Una formula che non si legge resta com'è, come testo.
        cells.push(`<c ${attr} t="inlineStr"><is><t xml:space="preserve">${xml(cell.input)}</t></is></c>`)
        continue
      }
      if (typeof v === 'number') cells.push(`<c ${attr}><v>${plainNumber(v)}</v></c>`)
      else if (typeof v === 'boolean') cells.push(`<c ${attr} t="b"><v>${v ? 1 : 0}</v></c>`)
      else if (isError(v)) cells.push(`<c ${attr} t="e"><v>${EXCEL_ERRORS[v.error]}</v></c>`)
      else if (typeof v === 'string') cells.push(`<c ${attr} t="inlineStr"><is><t xml:space="preserve">${xml(v)}</t></is></c>`)
      else cells.push(`<c ${attr}/>`)
    }
    if (cells.length) rowsXml.push(`<row r="${r + 1}">${cells.join('')}</row>`)
  }
  const frozen = model.header && rows > 1 ? '<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>' : ''
  const colsXml = cols ? `<cols>${widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols>` : ''
  const worksheet = `${XML_HEAD}<worksheet xmlns="${MAIN_NS}" xmlns:r="${REL_NS}"><sheetViews><sheetView workbookViewId="0">${frozen}</sheetView></sheetViews><sheetFormatPr defaultRowHeight="15"/>${colsXml}<sheetData>${rowsXml.join('')}</sheetData></worksheet>`
  const numFmts = formats.length ? `<numFmts count="${formats.length}">${formats.map((code, i) => `<numFmt numFmtId="${164 + i}" formatCode="${xml(code)}"/>`).join('')}</numFmts>` : ''
  const xfs = styles.map((st) => `<xf numFmtId="${st.numFmt}" fontId="${st.bold ? 1 : 0}" fillId="0" borderId="0" xfId="0"${st.numFmt ? ' applyNumberFormat="1"' : ''}${st.bold ? ' applyFont="1"' : ''}/>`)
  const stylesXml = `${XML_HEAD}<styleSheet xmlns="${MAIN_NS}">${numFmts}<fonts count="2"><font><sz val="11"/><name val="Calibri"/><family val="2"/></font><font><b/><sz val="11"/><name val="Calibri"/><family val="2"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="${xfs.length}">${xfs.join('')}</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`
  const workbook = `${XML_HEAD}<workbook xmlns="${MAIN_NS}" xmlns:r="${REL_NS}"><bookViews><workbookView/></bookViews><sheets><sheet name="${xml(sheetTitle(name))}" sheetId="1" r:id="rId1"/></sheets><calcPr calcId="191029" fullCalcOnLoad="1"/></workbook>`
  const files: Record<string, Uint8Array> = {
    '[Content_Types].xml': strToU8(
      `${XML_HEAD}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`,
    ),
    '_rels/.rels': strToU8(
      `${XML_HEAD}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`,
    ),
    'docProps/core.xml': strToU8(
      `${XML_HEAD}<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${xml(name)}</dc:title><dc:creator>Glifo</dc:creator></cp:coreProperties>`,
    ),
    'docProps/app.xml': strToU8(`${XML_HEAD}<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Glifo</Application></Properties>`),
    'xl/workbook.xml': strToU8(workbook),
    'xl/_rels/workbook.xml.rels': strToU8(
      `${XML_HEAD}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    ),
    'xl/worksheets/sheet1.xml': strToU8(worksheet),
    'xl/styles.xml': strToU8(stylesXml),
  }
  return zipSync(files, { level: 6 })
}

// ——— Leggere ———

export interface XlsxSheet {
  name: string
  model: SheetModel
  /** Le formule che Glifo non sa fare: restano con il loro valore. */
  valuesOnly: number
  /** Le righe o le colonne lasciate fuori (le tabelle di Glifo sono piccole). */
  cut: boolean
}

/** Un file non è un .xlsx (o è rovinato). */
export class XlsxError extends Error {
  override name = 'XlsxError'
}

const DATE_IDS = new Set([14, 15, 16, 17, 18, 19, 20, 21, 22, 27, 30, 36, 45, 46, 47, 50, 57])

interface Style {
  format: Format | 'date' | 'time' | null
  bold: boolean
}

/** Il formato di Glifo da quello di Excel (numero o codice); 'date' e 'time' per le date e le ore. */
export function formatFromExcel(id: number, code: string | undefined): Format | 'date' | 'time' | null {
  if (DATE_IDS.has(id)) return id >= 18 && id <= 21 ? 'time' : id >= 45 && id <= 47 ? 'time' : 'date'
  const builtin: Record<number, Format | null> = {
    0: null,
    1: null,
    2: { kind: 'number', decimals: 2 },
    3: { kind: 'number', decimals: 0 },
    4: { kind: 'number', decimals: 2 },
    9: { kind: 'percent', decimals: 0 },
    10: { kind: 'percent', decimals: 2 },
    49: null,
  }
  if (code === undefined) return builtin[id] ?? (id >= 5 && id <= 8 ? { kind: 'euro', decimals: id >= 7 ? 2 : 0 } : null)
  const first = code.split(';')[0]
  // Le parti tra virgolette e dopo \ sono testo; tra parentesi quadre colori e valute.
  const bare = first.replace(/"[^"]*"/g, '').replace(/\\./g, '').replace(/\[(?!\$)[^\]]*\]/g, '')
  const euro = /€|\[\$EUR|EUR/i.test(first)
  if (/[dmyhs]/i.test(bare.replace(/\[\$[^\]]*\]/g, '')) && !/[0#]/.test(bare)) return /[dy]/i.test(bare) ? 'date' : 'time'
  const decimals = (/\.(0+)/.exec(bare)?.[1].length ?? 0)
  if (bare.includes('%')) return { kind: 'percent', decimals }
  if (euro) return { kind: 'euro', decimals }
  if (/[0#]/.test(bare)) return decimals || bare.includes(',') ? { kind: 'number', decimals } : null
  return null
}

function parseXml(text: string): Document {
  const doc = new DOMParser().parseFromString(text, 'application/xml')
  if (doc.getElementsByTagName('parsererror').length) throw new XlsxError('Il file è rovinato: una sua parte non si legge')
  return doc
}

/** Gli elementi figli con quel nome (senza guardare i prefissi dei namespace). */
function children(el: Element | Document, name: string): Element[] {
  return [...el.getElementsByTagName('*')].filter((e) => e.localName === name)
}

function direct(el: Element, name: string): Element | undefined {
  return [...el.children].find((e) => e.localName === name)
}

/** Il testo di una stringa di Excel: semplice (<t>) o a pezzi (<r><t>). */
function richText(el: Element): string {
  return children(el, 't')
    .filter((t) => t.parentElement?.localName !== 'rPh')
    .map((t) => t.textContent ?? '')
    .join('')
}

/** La data seriale di Excel come testo all'italiana (12/10/2026; con l'ora se c'è). */
function serialDate(v: number, kind: 'date' | 'time'): string {
  const ms = Math.round((v - 25569) * 86400000)
  const d = new Date(ms)
  const two = (n: number) => String(n).padStart(2, '0')
  const time = `${two(d.getUTCHours())}:${two(d.getUTCMinutes())}`
  if (kind === 'time') return v < 1 ? time : `${two(d.getUTCDate())}/${two(d.getUTCMonth() + 1)}/${d.getUTCFullYear()} ${time}`
  return `${two(d.getUTCDate())}/${two(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`
}

/** Un numero come si scrive in una cella di Glifo, con il formato (scritto come si vede, se torna uguale). */
function numberCell(v: number, format: Format | null): SheetCell {
  if (format) {
    const shown = formatNumber(v, format)
    const back = readNumber(shown)
    if (back && Math.abs(back.value - v) <= 1e-9 * Math.max(1, Math.abs(v)) && back.format.kind === format.kind) {
      // Il formato si capisce già da come è scritto (1,50 €): niente graffe.
      return sameFormat(back.format, format) ? { input: shown } : { input: shown, format }
    }
    return { input: String(v).replace('.', ','), format }
  }
  return { input: String(v).replace('.', ',') }
}

/** I fogli di un file .xlsx, con le loro tabelle. */
export function xlsxSheets(bytes: Uint8Array): XlsxSheet[] {
  let files: Record<string, Uint8Array>
  try {
    files = unzipSync(bytes)
  } catch {
    throw new XlsxError('Il file non è un file di Excel (.xlsx), o è rovinato')
  }
  const text = (path: string) => (files[path] ? strFromU8(files[path]) : null)
  const workbookText = text('xl/workbook.xml')
  if (!workbookText) throw new XlsxError('Il file non è un file di Excel (.xlsx): manca la cartella di lavoro')
  const workbook = parseXml(workbookText)
  const rels = new Map<string, string>()
  const relsText = text('xl/_rels/workbook.xml.rels')
  if (relsText) {
    for (const rel of children(parseXml(relsText), 'Relationship')) {
      const target = rel.getAttribute('Target') ?? ''
      rels.set(rel.getAttribute('Id') ?? '', target.startsWith('/') ? target.slice(1) : `xl/${target}`)
    }
  }
  const strings: string[] = []
  const sharedText = text('xl/sharedStrings.xml')
  if (sharedText) for (const si of children(parseXml(sharedText), 'si')) strings.push(richText(si))
  const styles: Style[] = []
  const stylesText = text('xl/styles.xml')
  if (stylesText) {
    const doc = parseXml(stylesText)
    const codes = new Map<number, string>()
    for (const f of children(doc, 'numFmt')) codes.set(Number(f.getAttribute('numFmtId')), f.getAttribute('formatCode') ?? '')
    const fonts = children(doc, 'fonts')[0]
    const bolds = fonts ? [...fonts.children].filter((f) => f.localName === 'font').map((f) => {
      const b = direct(f, 'b')
      return !!b && b.getAttribute('val') !== '0' && b.getAttribute('val') !== 'false'
    }) : []
    const xfs = children(doc, 'cellXfs')[0]
    for (const xf of xfs ? [...xfs.children].filter((x) => x.localName === 'xf') : []) {
      const id = Number(xf.getAttribute('numFmtId') ?? 0)
      styles.push({ format: formatFromExcel(id, codes.get(id)), bold: bolds[Number(xf.getAttribute('fontId') ?? 0)] ?? false })
    }
  }
  const sheets: XlsxSheet[] = []
  for (const sheetEl of children(workbook, 'sheet')) {
    const name = sheetEl.getAttribute('name') ?? `Foglio${sheets.length + 1}`
    const id = sheetEl.getAttribute('r:id') ?? [...sheetEl.attributes].find((a) => a.localName === 'id')?.value ?? ''
    const path = rels.get(id) ?? `xl/worksheets/sheet${sheets.length + 1}.xml`
    const sheetText = text(path)
    if (!sheetText) continue
    sheets.push(readWorksheet(name, parseXml(sheetText), strings, styles))
  }
  if (!sheets.length) throw new XlsxError('Nel file non c\'è un foglio da aprire')
  return sheets
}

function readWorksheet(name: string, doc: Document, strings: readonly string[], styles: readonly Style[]): XlsxSheet {
  const model = emptySheet()
  let valuesOnly = 0
  let cut = false
  /** Le formule condivise: quella scritta nella prima cella, da spostare nelle altre. */
  const shared = new Map<string, { formula: string | null; row: number; col: number }>()
  for (const c of children(doc, 'c')) {
    const ref = /^([A-Z]{1,3})(\d+)$/.exec(c.getAttribute('r') ?? '')
    if (!ref) continue
    const row = Number(ref[2]) - 1
    const col = colIndex(ref[1])
    if (row >= MAX_ROWS || col >= MAX_COLS) {
      cut = true
      continue
    }
    const type = c.getAttribute('t') ?? 'n'
    const style = styles[Number(c.getAttribute('s') ?? 0)] ?? { format: null, bold: false }
    const v = direct(c, 'v')?.textContent ?? null
    const f = direct(c, 'f')
    let cell: SheetCell | undefined
    // Il valore scritto (quello calcolato da Excel per le formule).
    const value = (): SheetCell | undefined => {
      if (type === 's') return v === null ? undefined : textCell(strings[Number(v)] ?? '')
      if (type === 'inlineStr') return textCell(richText(direct(c, 'is') ?? c))
      if (type === 'str') return v === null ? undefined : textCell(v)
      if (type === 'b') return v === null ? undefined : { input: v === '1' ? 'VERO' : 'FALSO' }
      if (type === 'e') return v === null ? undefined : { input: ERROR_NAMES[v.toUpperCase()] ?? '#VALORE!' }
      if (v === null || v === '') return undefined
      const n = Number(v)
      if (!Number.isFinite(n)) return textCell(v)
      if (style.format === 'date' || style.format === 'time') return textCell(serialDate(n, style.format))
      return numberCell(n, style.format)
    }
    if (f) {
      let formula: string | null = null
      const si = f.getAttribute('si')
      if (f.getAttribute('t') === 'shared' && si !== null) {
        const master = shared.get(si)
        if (f.textContent) {
          formula = fromExcelFormula(f.textContent)
          shared.set(si, { formula, row, col })
        } else if (master?.formula) formula = shiftFormula(master.formula, row - master.row, col - master.col)
      } else if (f.getAttribute('t') !== 'array' && f.textContent) formula = fromExcelFormula(f.textContent)
      // Le date calcolate restano come testo: Glifo non ha le date.
      if (formula && style.format !== 'date' && style.format !== 'time') {
        const format = style.format && typeof style.format === 'object' ? style.format : undefined
        cell = { input: formula, ...(format && { format }) }
      } else {
        valuesOnly++
        cell = value()
      }
    } else cell = value()
    if (!cell) continue
    if (style.bold) cell.bold = true
    while (model.cells.length <= row) model.cells.push([])
    model.cells[row][col] = cell
  }
  dropInferredFormats(model)
  // La prima riga è l'intestazione se è tutta di testo e sotto ci sono altre righe.
  const first = model.cells[0] ?? []
  const filled = first.filter((cell) => cell?.input)
  if (model.cells.length > 1 && filled.length && filled.every((cell) => !isFormula(cell!.input) && !readNumber(cell!.input))) {
    model.header = true
    // Nell'intestazione il grassetto lo mette già Markdown.
    for (const cell of first) if (cell) delete cell.bold
  }
  return { name, model, valuesOnly, cut }
}

/**
 * Le formule prendono da sole il formato da quello che usano (euro per un numero fa euro): il formato
 * scritto nel file serve solo dove è diverso, così nella nota non ci sono graffe inutili.
 */
function dropInferredFormats(model: SheetModel): void {
  const formulas: { cell: SheetCell; row: number; col: number; format: Format }[] = []
  model.cells.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (cell?.format && isFormula(cell.input)) formulas.push({ cell, row: r, col: c, format: cell.format })
    }),
  )
  if (!formulas.length) return
  for (const f of formulas) delete f.cell.format
  // Un formato rimesso può cambiare quello delle formule che usano la cella: si ricontrolla.
  for (let pass = 0; pass < 4; pass++) {
    const sheet = new SheetEvaluator(model)
    let changed = false
    for (const f of formulas) {
      if (f.cell.format) continue
      if (!sameFormat(sheet.result(f.row, f.col).format, f.format)) {
        f.cell.format = f.format
        changed = true
      }
    }
    if (!changed) return
  }
}

/** Un testo da mettere in una cella: con l'apostrofo se sembrerebbe un numero o una formula (come in Excel). */
export function textCell(text: string): SheetCell | undefined {
  const s = text.replace(/\r?\n/g, ' ').trim()
  if (!s) return undefined
  if (s.startsWith('=') || s.startsWith("'") || readNumber(s) || /^(vero|falso)$/i.test(s) || ERROR_NAMES[s.toUpperCase()]) return { input: `'${s}` }
  return { input: s }
}

/** Il nome del file senza l'estensione, per il nome della tabella e della nota. */
export function baseName(file: string): string {
  return file.replace(/\.[^.]+$/, '').trim() || 'Tabella'
}

/** I nomi delle funzioni senza il nome inglese (servono ai test: ogni funzione nuova deve averne uno). */
export function functionsWithoutExcelName(): string[] {
  return allFunctions()
    .map((f) => f.name)
    .filter((n) => !EXCEL_NAMES[n])
}
