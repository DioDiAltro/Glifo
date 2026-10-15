// @vitest-environment jsdom
import { PGlite } from '@electric-sql/pglite'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { setLangForTests } from '../src/i18n'
import { renderMarkdown } from '../src/render/markdown'
import { openSchemaEditor } from '../src/schema/editor'
import { schemasForFile, schemasFromFile } from '../src/schema/file'
import { COLOR_NAMES, parseSchema, SchemaError, serializeSchema, SHAPE_NAMES, type Schema } from '../src/schema/model'
import { hydrateSchemas } from '../src/schema/preview'
import { schemaSql, SQL_DIALECTS } from '../src/schema/sql'
import { TEMPLATES } from '../src/schema/templates'

/**
 * Gli schemi con Glifo in inglese: l'editor, i modelli pronti (il testo delle forme si sceglie quando si
 * inseriscono), il codice SQL, l'anteprima e i file .md. Quello che si salva nella nota (```schema e il
 * JSON) è uguale nelle due lingue.
 */

// jsdom non ha le finestre modali e il disegno su canvas.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.open = true
}
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  this.open = false
  this.dispatchEvent(new Event('close'))
}
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', { value: () => null, configurable: true })

const EMPTY = '{"v":1,"nodes":[],"edges":[]}'

beforeEach(() => setLangForTests('en'))
afterEach(() => {
  // «Done» chiude l'editor e toglie i suoi ascoltatori dalla finestra.
  document.querySelector<HTMLButtonElement>('dialog.schema-editor .schema-bar .btn-primary')?.click()
  document.body.replaceChildren()
  localStorage.clear()
  setLangForTests('it')
})

/**
 * Apre l'editor degli schemi: la finestra, i pulsanti per testo o titolo e gli schemi salvati nella nota.
 * Con `sql` il codice SQL delle tabelle è acceso, come lo sarà con i piani a pagamento.
 */
function open(source = EMPTY, sql = false) {
  const saved: Schema[] = []
  void openSchemaEditor({ schema: parseSchema(source), theme: 'light', title: 'Notes', sql, onSave: (schema) => saved.push(schema) })
  const dialog = document.querySelector<HTMLDialogElement>('dialog.schema-editor')!
  const all = (root: ParentNode, selector: string) => [...root.querySelectorAll<HTMLElement>(selector)]
  const byText = (text: string, root: ParentNode = dialog) => all(root, 'button').find((b) => b.textContent?.trim() === text) as HTMLButtonElement
  const byTitle = (title: string, root: ParentNode = dialog) => all(root, 'button').find((b) => b.title === title) as HTMLButtonElement
  const preset = (id: string) => dialog.querySelector<HTMLButtonElement>(`.schema-shape[data-preset="${id}"]`)!
  const format = dialog.querySelector<HTMLElement>('.schema-format')!
  const headings = () => all(format, 'h3').map((h) => h.textContent)
  const choices = () => all(format, '.schema-choice').map((b) => b.title)
  return { dialog, saved, all, byText, byTitle, preset, format, headings, choices }
}

/** L'ultimo messaggio in basso (quelli di prima restano finché non scadono). */
const lastToast = () => [...document.querySelectorAll('.toast')].at(-1)?.textContent

/** Lo schema senza i testi: la forma, i colori, le frecce, che non cambiano con la lingua. */
function withoutTexts(schema: Schema): Schema {
  return { nodes: schema.nodes.map((n) => ({ ...n, text: '' })), edges: schema.edges.map((e) => ({ ...e, text: '' })) }
}

/** Uno schema con queste tabelle (id → testo) e queste frecce. */
function tables(texts: Record<string, string>, edges: [string, string][] = []): Schema {
  return parseSchema(
    JSON.stringify({
      nodes: Object.entries(texts).map(([id, text], i) => ({ id, shape: 'table', x: i * 250, y: 0, w: 200, h: 100, text })),
      edges: edges.map(([from, to], i) => ({ id: `e${i}`, from, to })),
    }),
  )
}

describe('l\'editor degli schemi in inglese', () => {
  it('la barra, il pannello delle forme e il foglio vuoto', () => {
    const { dialog, byText, byTitle, preset, format, all } = open()
    expect(dialog.getAttribute('aria-label')).toBe('Diagram editor')
    expect(dialog.querySelector('.schema-title')?.textContent).toBe('Diagram')
    expect(dialog.querySelector('.schema-tools')?.getAttribute('aria-label')).toBe('Diagram tools')
    for (const title of ['Undo (Ctrl+Z)', 'Redo (Ctrl+Y)', 'Zoom out', 'Zoom to 100%', 'Zoom in', 'Fit to window', 'Grid', 'Delete selection (Del)']) {
      expect(byTitle(title), title).toBeTruthy()
    }
    expect(byText('Templates').title).toBe('Ready-made templates to add to the diagram')
    expect(byText('Download').title).toBe('The diagram as an image, to use outside Glifo')
    expect(byText('Close')).toBeTruthy()
    expect(byText('Done')).toBeTruthy()

    // Le forme, con i nomi e i suggerimenti in inglese.
    expect(all(dialog, '.schema-group-head').map((h) => h.textContent)).toEqual(['Shapes', 'Databases'])
    expect(preset('rect').title).toBe('Rectangle: drag it onto the canvas or click it')
    expect(preset('rhombus').textContent).toBe('Diamond')
    expect(preset('arrow').textContent).toBe('Block arrow')
    expect(preset('lanes').textContent).toBe('Swimlanes')
    expect(preset('container').textContent).toBe('Container')
    expect(preset('entity').textContent).toBe('Entity')
    expect(preset('relation').textContent).toBe('Relationship')
    expect(preset('multiAttribute').textContent).toBe('Multivalued attribute')
    expect(preset('identifier').textContent).toBe('Identifier (filled circle)')
    expect(preset('table').textContent).toBe('Table')

    // Il foglio vuoto, con i modelli da cui partire.
    const empty = dialog.querySelector<HTMLElement>('.schema-empty')!
    expect(empty.textContent).toContain('Drag a shape here from the panel on the left, or click it.')
    expect(empty.textContent).toContain('Then hover over a shape and drag a blue arrow to connect it to another one.')
    expect(empty.textContent).toContain('Or start from a template:')
    expect(all(empty, 'button').map((b) => b.textContent)).toEqual(['Flowchart', 'Concept map', 'Tree', 'Cycle', 'Timeline', 'Swimlane process', 'Containers', 'E-R diagram', 'Tables'])
    expect(byText('Flowchart', empty).title).toBe('The steps of a procedure, with the questions and the possible paths')

    // Senza niente di selezionato, il pannello dell'aspetto spiega come si usa (con i tasti inglesi).
    expect(format.getAttribute('aria-label')).toBe('Appearance')
    expect(format.querySelector('.schema-format-hint')?.textContent).toBe('Select a shape or an arrow to change its color and appearance.')
    const help = all(format, '.schema-help li').map((li) => li.textContent)
    expect(help[0]).toBe('Double-click a shape to write in it, including formulas between $…$.')
    expect(help[1]).toBe('To select more than one (and align them): drag a box on the empty canvas, or Shift + click.')
    expect(help[4]).toBe('Ctrl Z undo, Del delete, Ctrl D duplicate.')
    expect(all(format, 'kbd').map((k) => k.textContent)).toEqual(['Shift', 'Ctrl', 'Z', 'Del', 'Ctrl', 'D'])

    expect(dialog.querySelector('.schema-canvas')?.getAttribute('aria-label')).toBe('Diagram canvas')
    expect(dialog.querySelector('.schema-text')?.getAttribute('aria-label')).toBe('Text (formulas between $…$)')
    expect(dialog.querySelector('.schema-table-name')?.getAttribute('placeholder')).toBe('Table name')
    expect(dialog.querySelector('.schema-table-fields')?.getAttribute('placeholder')).toBe('One field per line')
  })

  it('un modello inserito in inglese ha i testi in inglese, nello stesso formato della nota in italiano', () => {
    const { dialog, saved, byText } = open()
    byText('Flowchart', dialog.querySelector('.schema-empty')!).click()
    byText('Done').click()
    expect(saved).toHaveLength(1)
    const [schema] = saved
    expect(schema.nodes.map((n) => n.text)).toEqual(['Start', 'Read the data', 'Process', 'Is it OK?', 'Write the result', 'End'])
    expect(schema.edges.map((e) => e.text).filter(Boolean)).toEqual(['Yes', 'No'])
    // Il blocco nella nota: lo stesso JSON, con i nomi delle forme e dei colori di sempre, che si rilegge uguale in italiano.
    const json = serializeSchema(schema)
    expect(json.startsWith('{"v":1,"nodes":[')).toBe(true)
    expect(json).toContain('"shape":"ellipse"')
    expect(json).toContain('"color":"green"')
    setLangForTests('it')
    expect(parseSchema(json)).toEqual(schema)
  })

  it('con tutto selezionato: colori, forme, allineare, distribuire, linee, punte e posizione del testo', () => {
    const { dialog, byText, headings, choices, format } = open()
    byText('Flowchart', dialog.querySelector('.schema-empty')!).click()
    dialog.querySelector('.schema-canvas')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', ctrlKey: true, bubbles: true, cancelable: true }))
    expect(headings()).toEqual(['Color', 'Shape', 'Align', 'Distribute', 'Text', 'Line', 'Arrowheads', 'Text position'])
    expect(choices()).toEqual(
      expect.arrayContaining([
        'Default',
        'Purple',
        'Gray',
        'Rounded rectangle',
        'Diamond',
        'Align left',
        'Align center',
        'Align middle',
        'Align bottom',
        'Distribute horizontally (same space between shapes)',
        'Distribute vertically (same space between shapes)',
        'Small text',
        'Normal text',
        'Large text',
        'Straight',
        'Right-angled',
        'Curved',
        'Dashed',
        'Arrowhead at the end',
        'Arrowheads at both ends',
        'No arrowheads',
        'Text at the start of the arrow',
        'Text in the middle of the arrow',
        'Text at the end of the arrow',
      ]),
    )
    expect(byText('Delete', format)).toBeTruthy()
    // «Edit text» solo con una cosa sola selezionata.
    expect(byText('Edit text', format)).toBeUndefined()
  })

  it('le forme con un verso: girare di un quarto, o il nome dall\'altra parte del pallino', () => {
    const { preset, headings, choices, byText, format } = open()
    preset('triangle').click()
    expect(headings()).toContain('Direction')
    expect(choices()).toContain('Rotate a quarter turn (clockwise)')
    expect(byText('Edit text', format)).toBeTruthy()
    preset('attribute').click()
    expect(choices()).toContain('Name on the other side of the circle')
  })

  it('una tabella nuova: il testo da sostituire, i campi con PK e FK e la chiave che manca', () => {
    const { saved, preset, format, byText, all, byTitle } = open()
    preset('table').click()
    expect(format.querySelector('.schema-table-section h3')?.textContent).toBe('Table')
    expect(format.querySelector('.schema-table-title')?.getAttribute('placeholder')).toBe('Table name')
    expect(format.querySelector('.schema-fields')?.getAttribute('aria-label')).toBe('Table fields')
    expect(all(format, '.schema-fields-head span').map((s) => s.textContent)).toEqual(['Key', 'Field', 'Type'])
    expect(all(format, '.schema-field-name').map((i) => (i as HTMLInputElement).value)).toEqual(['ID', 'Name'])
    expect(byTitle('Primary key: ID', format).getAttribute('aria-pressed')).toBe('true')
    expect(byTitle('Foreign key: Name', format).getAttribute('aria-pressed')).toBe('false')
    expect(byTitle('Remove field “ID”', format)).toBeTruthy()
    const type = format.querySelector<HTMLInputElement>('.schema-field-type')!
    expect(type.placeholder).toBe('type')
    expect(type.getAttribute('aria-label')).toBe('Field type, for SQL (optional)')
    expect(format.querySelector('.schema-field-name')?.getAttribute('aria-label')).toBe('Field name')
    expect(format.querySelector('.schema-table-section .schema-format-hint:last-child')?.textContent).toContain('The type is for SQL (for example INTEGER, VARCHAR(50), DATE).')
    const missing = format.querySelector<HTMLElement>('.schema-fields-missing')!
    expect(missing.hidden).toBe(true)

    byText('Add field', format).click()
    expect(all(format, '.schema-field-name').map((i) => (i as HTMLInputElement).value)).toEqual(['ID', 'Name', 'Field'])
    byTitle('Primary key: ID', format).click()
    expect(missing.hidden).toBe(false)
    expect(missing.textContent).toBe('The primary key is missing: press “PK” on the fields that make it up.')

    byText('Done').click()
    expect(saved[0].nodes.map((n) => n.text)).toEqual(['Table\nID\nName\nField'])
  })

  it('il contenitore: il titolo e, nel pannello, come si usa', () => {
    const { saved, preset, format, byText } = open()
    preset('container').click()
    expect(format.querySelector('.schema-container-section h3')?.textContent).toBe('Container')
    // Dove sta il titolo: sopra o sotto, a sinistra, al centro o a destra.
    expect(format.querySelector('.schema-place-section h3')?.textContent).toBe('Text position')
    expect([...format.querySelectorAll<HTMLButtonElement>('.schema-place-section button')].map((b) => b.title)).toEqual([
      'Text at the top left',
      'Text at the top center',
      'Text at the top right',
      'Text at the bottom left',
      'Text at the bottom center',
      'Text at the bottom right',
    ])
    expect(format.querySelector('.schema-container-section .schema-format-hint')?.textContent).toBe(
      'Put shapes inside the container, other containers too: moving it moves them as well. Grab the container by its title or its border; inside it, double-click to add a shape.',
    )
    byText('Done').click()
    expect(saved[0].nodes.map((n) => [n.shape, n.text])).toEqual([['container', 'Container']])
  })

  it('le corsie: i nomi, una corsia in più e il verso', () => {
    const { saved, preset, format, byText, byTitle, all, choices } = open()
    preset('lanes').click()
    expect(format.querySelector('.schema-lanes-section h3')?.textContent).toBe('Swimlanes')
    expect(format.querySelector('.schema-lanes')?.getAttribute('aria-label')).toBe('Lanes')
    expect(all(format, '.schema-lane-name').map((i) => i.getAttribute('aria-label'))).toEqual(['Name of lane 1', 'Name of lane 2', 'Name of lane 3'])
    expect(all(format, '.schema-lane-name').map((i) => (i as HTMLInputElement).value)).toEqual(['Customer', 'Sales', 'Warehouse'])
    expect(byTitle('Remove lane “Customer”', format)).toBeTruthy()
    expect(choices()).toEqual(expect.arrayContaining(['In columns: names at the top', 'In rows: names on the left']))
    expect(format.querySelector('.schema-lanes-section .schema-format-hint')?.textContent).toContain('The process shapes go on top of the lanes')
    byText('Add lane', format).click()
    byText('Done').click()
    expect(saved[0].nodes.map((n) => n.text)).toEqual(['Customer\nSales\nWarehouse\nLane 4'])
  })

  it('il codice SQL delle tabelle è spento: la voce resta, e chi la preme legge che a breve sarà a pagamento', () => {
    const { dialog, preset, byText, all } = open()
    const soon = 'SQL code for the tables will soon be a paid feature: for now it can\'t be used.'
    const last = () => [...document.querySelectorAll('.toast')].at(-1)
    // Senza tabelle: prima di tutto si dice che è spento.
    byText('Download').click()
    byText('SQL code for the tables…', dialog.querySelector('.tool-menu')!).click()
    expect(lastToast()).toBe(soon)
    const first = last()
    preset('table').click()
    byText('Download').click()
    expect(all(dialog, '.tool-menu-item').map((b) => b.textContent)).toEqual(['PNG image', 'SVG image', 'Copy as image', 'SQL code for the tables…'])
    const item = byText('SQL code for the tables…', dialog.querySelector('.tool-menu')!)
    expect(item.getAttribute('aria-disabled')).toBe('true')
    expect(item.title).toBe(soon)
    expect(all(dialog, '.tool-menu-item').filter((b) => b.hasAttribute('aria-disabled')).length).toBe(1)
    item.click()
    expect(last()).not.toBe(first)
    expect(lastToast()).toBe(soon)
    expect(dialog.querySelector('.tool-menu')).toBeNull()
    expect(document.querySelector('dialog.dialog-sql')).toBeNull()
  })

  it('il codice SQL delle tabelle, quando è acceso: la finestra, i database e i commenti', () => {
    const { dialog, preset, byText, all } = open(EMPTY, true)
    preset('table').click()
    byText('Download').click()
    expect(all(dialog, '.tool-menu-item').map((b) => b.textContent)).toEqual(['PNG image', 'SVG image', 'Copy as image', 'SQL code for the tables…'])
    byText('SQL code for the tables…', dialog.querySelector('.tool-menu')!).click()
    const sql = document.querySelector<HTMLDialogElement>('dialog.dialog-sql')!
    expect(sql.querySelector('h2')?.textContent).toBe('SQL code for the tables')
    expect(sql.querySelector('.sql-dialect span')?.textContent).toBe('For which database?')
    expect(all(sql, 'option').map((o) => o.textContent)).toEqual(['Standard SQL', 'PostgreSQL', 'MySQL / MariaDB', 'SQLite', 'Oracle', 'SQL Server'])
    expect(sql.querySelector('pre')?.getAttribute('aria-label')).toBe('SQL code')
    const code = sql.querySelector('code')!.textContent!
    expect(code.startsWith('-- Tables for Standard SQL, written with Glifo.\n-- Fields without a type are VARCHAR(255): change it where needed.\n')).toBe(true)
    expect(code).toContain('CREATE TABLE "Table" (')
    expect(sql.querySelector('.field-help')?.textContent).toContain('Lines starting with “--” are comments.')
    expect(byText('Copy', sql)).toBeTruthy()
    expect(byText('Download .sql', sql)).toBeTruthy()
    // Scegliendo un altro database cambia anche il nome nel commento.
    const select = sql.querySelector('select')!
    select.value = 'sqlite'
    select.dispatchEvent(new Event('change'))
    expect(sql.querySelector('code')!.textContent).toContain('-- SQLite only checks foreign keys with this line, to be repeated on every connection:\nPRAGMA foreign_keys = ON;')
  })

  it('i file scaricati hanno il nome in inglese: «diagram» e «tables»', async () => {
    // jsdom non scarica: si guarda il nome del file sul link che Glifo preme.
    const names: string[] = []
    const { createObjectURL, revokeObjectURL } = URL
    URL.createObjectURL = () => 'blob:glifo'
    URL.revokeObjectURL = () => {}
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      names.push(this.download)
    })
    try {
      const { dialog, preset, byText } = open(EMPTY, true)
      preset('table').click()
      byText('Download').click()
      byText('SVG image', dialog.querySelector('.tool-menu')!).click()
      await vi.waitFor(() => expect(names).toEqual(['Notes-diagram.svg']))
      expect(lastToast()).toBe('SVG image downloaded')
      byText('Download').click()
      byText('SQL code for the tables…', dialog.querySelector('.tool-menu')!).click()
      byText('Download .sql', document.querySelector('dialog.dialog-sql')!).click()
      await vi.waitFor(() => expect(names).toEqual(['Notes-diagram.svg', 'Notes-tables.sql']))
      expect(lastToast()).toBe('Downloaded “Notes-tables.sql”')
    } finally {
      click.mockRestore()
      Object.assign(URL, { createObjectURL, revokeObjectURL })
    }
  })

  it('i messaggi: niente da salvare come immagine, niente tabelle, e chiudere senza salvare', async () => {
    const { dialog, byText, preset } = open(EMPTY, true)
    byText('Download').click()
    byText('PNG image', dialog.querySelector('.tool-menu')!).click()
    expect(lastToast()).toBe('The diagram is empty: there\'s nothing to save as an image yet.')
    byText('Download').click()
    byText('SQL code for the tables…', dialog.querySelector('.tool-menu')!).click()
    expect(lastToast()).toBe('There are no tables in the diagram: you\'ll find them in the “Databases” group, on the left.')

    preset('rect').click()
    byText('Close').click()
    const confirm = document.querySelector<HTMLDialogElement>('dialog.dialog-confirm')!
    expect(confirm.querySelector('h2')?.textContent).toBe('Close without saving?')
    expect(confirm.querySelector('.confirm-message')?.textContent).toBe('The latest changes to the diagram aren\'t in the note yet.')
    expect(byText('Close without saving', confirm)).toBeTruthy()
    byText('Back to the diagram', confirm).click()
    await vi.waitFor(() => expect(document.querySelector('dialog.dialog-confirm')).toBeNull())
    // L'editor resta aperto, con la forma.
    expect(dialog.isConnected).toBe(true)
  })
})

describe('i modelli pronti in inglese', () => {
  it('nomi e suggerimenti, e il testo delle forme scelto quando si inseriscono', () => {
    expect(TEMPLATES.map((t) => t.name)).toEqual(['Flowchart', 'Concept map', 'Tree', 'Cycle', 'Timeline', 'Swimlane process', 'Containers', 'E-R diagram', 'Tables'])
    expect(TEMPLATES.find((t) => t.id === 'corsie')!.hint).toBe('Who does what: the steps of a business process in the lanes of whoever does them')
    expect(TEMPLATES.find((t) => t.id === 'contenitori')!.hint).toBe('Sets one inside the other, like the IT system inside the information system')
    const texts = (id: string) => {
      const { nodes, edges } = TEMPLATES.find((t) => t.id === id)!.schema
      return [...nodes.map((n) => n.text), ...edges.map((e) => e.text).filter(Boolean)]
    }
    expect(texts('mappa')).toEqual(['Main concept', 'Concept', 'Concept', 'Concept', 'Example', 'Example', 'includes', 'is based on', 'leads to', 'for example', 'for example'])
    expect(texts('albero')).toEqual(['Topic', 'Part 1', 'Part 2', 'Detail', 'Detail', 'Detail', 'Detail'])
    expect(texts('ciclo')).toEqual(['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'])
    expect(texts('linea')).toEqual(['Year\nEvent', 'Year\nEvent', 'Year\nEvent', 'Year\nEvent'])
    expect(texts('er')).toEqual(['Student', 'Exam', 'Course', 'StudentID', 'Name', 'Surname', 'Grade', 'Date', 'Code', 'Title', 'Credits', '(0,N)', '(0,N)'])
    expect(texts('corsie')).toEqual([
      'Customer\nSales\nWarehouse\nAccounting',
      'Start',
      'Place the order',
      'Record the order',
      'Goods\nin stock?',
      'Reorder from the supplier',
      'Prepare and ship the goods',
      'Issue the invoice',
      'Receive the goods and pay',
      'Record the payment',
      'End',
      'Yes',
      'No',
    ])
    expect(texts('contenitori')).toEqual(['Organizational system', 'Information system', 'IT system'])
    expect(texts('tabelle')[0]).toBe('Student\nPK StudentID: CHAR(6)\nName: VARCHAR(50)\nSurname: VARCHAR(50)')
    // Gli stessi modelli, con Glifo in italiano, hanno i testi italiani; il disegno è lo stesso.
    const english = TEMPLATES.map((t) => t.schema)
    setLangForTests('it')
    expect(TEMPLATES[0].name).toBe('Diagramma di flusso')
    expect(TEMPLATES[0].schema.nodes[0].text).toBe('Inizio')
    TEMPLATES.forEach((t, i) => expect(withoutTexts(english[i]), t.id).toEqual(withoutTexts(t.schema)))
  })
})

describe('il codice SQL in inglese', () => {
  const tablesTemplate = () => TEMPLATES.find((t) => t.id === 'tabelle')!.schema

  it('il modello «Tables»: solo il commento in cima, e i nomi inglesi senza virgolette', () => {
    const sql = schemaSql(tablesTemplate(), 'postgresql')
    expect(sql.split('\n').filter((l) => l.startsWith('--'))).toEqual(['-- Tables for PostgreSQL, written with Glifo.'])
    expect(sql).toContain('CREATE TABLE Student (\n  StudentID CHAR(6) NOT NULL,\n  Name      VARCHAR(50),\n  Surname   VARCHAR(50),\n  PRIMARY KEY (StudentID)\n);')
    expect(sql).toContain('  ExamDate  DATE,\n  PRIMARY KEY (StudentID, Course),\n  FOREIGN KEY (StudentID) REFERENCES Student (StudentID),\n  FOREIGN KEY (Course) REFERENCES Course (Code)\n);')
    expect(schemaSql(tablesTemplate(), 'standard').startsWith('-- Tables for Standard SQL, written with Glifo.\n')).toBe(true)
  })

  it('il modello «Tables» in inglese funziona davvero, con le chiavi esterne', async () => {
    const db = await PGlite.create()
    await db.exec(schemaSql(tablesTemplate(), 'postgresql'))
    await db.exec("INSERT INTO Student VALUES ('123456', 'Ada', 'Lovelace'); INSERT INTO Course VALUES ('DB001', 'Databases', 9);")
    await db.exec("INSERT INTO Exam VALUES ('123456', 'DB001', 30, '2026-07-01')")
    await expect(db.exec("INSERT INTO Exam VALUES ('999999', 'DB001', 18, '2026-07-01')")).rejects.toThrow(/foreign key/)
    await db.close()
  }, 60_000)

  it('i nomi scelti da Glifo e le note in inglese; i nomi scritti nello schema restano quelli', () => {
    const sql = schemaSql(
      tables({
        team: 'Team\nPK Code: CHAR(3)\nHome city\nActive: BOOLEAN',
        squadra: 'Squadra\nPK Codice: CHAR(3)\nCittà',
        nameless: '\nPK : INTEGER\nFK',
        note: 'Note\nText: TEXT',
        empty: 'Empty',
      }),
      'postgresql',
    )
    expect(sql).toContain('-- Fields without a type are VARCHAR(255): change it where needed.')
    expect(sql).toContain('-- Names written for SQL (without spaces or accents): “Team.Home city” → Team.Home_city, “Squadra.Città” → Squadra.Citta.')
    // Una tabella e i campi senza nome: i nomi li sceglie Glifo, in inglese.
    expect(sql).toContain('CREATE TABLE table_3 (\n  field_1 INTEGER NOT NULL,\n  field_2 VARCHAR(255),\n  PRIMARY KEY (field_1)\n);')
    expect(sql).toContain('-- “table_3.field_2” is a foreign key, but it isn\'t clear which table it refers to: connect the tables with an arrow, or give the field the same name as the other table\'s primary key.')
    expect(sql).toContain('-- “Note” has no primary key: press “PK” on the fields that make it up.\nCREATE TABLE Note (')
    expect(sql).toContain('-- “Empty” has no fields: add some and download the code again.')
    expect(sql).toContain('CREATE TABLE Squadra (\n  Codice CHAR(3) NOT NULL,\n  Citta  VARCHAR(255),')
    expect(schemaSql(parseSchema(EMPTY), 'mysql')).toBe('-- There are no tables in the diagram.\n')
  })

  it('le chiavi di più campi e quelle verso tabelle create dopo', () => {
    const composite = schemaSql(tables({ exam: 'Exam\nPK StudentID: CHAR(6)\nPK Course: CHAR(5)', partial: 'Partial\nPK Number: INTEGER\nFK StudentID' }, [['partial', 'exam']]), 'postgresql')
    expect(composite).toContain('-- The primary key of “Exam” is (StudentID, Course): to refer to it, “Partial” needs all these fields, marked FK.')
    const loop = schemaSql(tables({ dept: 'Dept\nPK Code: CHAR(2)\nFK Head', employee: 'Employee\nPK Head: CHAR(5)\nFK Dept' }, [['dept', 'employee']]), 'postgresql')
    expect(loop).toContain('-- Foreign keys to tables created later:\nALTER TABLE Dept ADD FOREIGN KEY (Head) REFERENCES Employee (Head);')
  })
})

describe('gli schemi nella nota e nei file, in inglese', () => {
  it('l\'anteprima: gli errori e il pulsante «Edit»', async () => {
    const host = document.createElement('div')
    host.innerHTML = renderMarkdown(`\`\`\`schema\n{broken\n\`\`\`\n\n\`\`\`schema\n[1, 2]\n\`\`\`\n\n\`\`\`schema\n${EMPTY}\n\`\`\`\n`)
    document.body.append(host)
    hydrateSchemas(host, { theme: 'light', surface: '#fff' })
    const [broken, other, empty] = host.querySelectorAll<HTMLElement>('.schema-block')
    await vi.waitFor(() => expect(broken.querySelector('.schema-error')?.textContent).toBe('The diagram can\'t be read: was the block\'s text edited by hand?'))
    await vi.waitFor(() => expect(other.querySelector('.schema-error')?.textContent).toBe('This block doesn\'t contain a diagram.'))
    await vi.waitFor(() => expect(empty.classList.contains('is-empty')).toBe(true))
    const edit = empty.querySelector<HTMLButtonElement>('.schema-edit')!
    expect(edit.textContent).toBe('Edit')
    expect(edit.title).toBe('Edit the diagram (or double-click it)')
    expect(() => parseSchema('"schema"')).toThrow(new SchemaError('This block doesn\'t contain a diagram.'))
  })

  it('nel file .md l\'immagine e il suggerimento sono in inglese, e il file si riapre uguale in tutte e due le lingue', () => {
    const json = '{"v":1,"nodes":[\n{"id":"a","shape":"rect","x":0,"y":0,"w":120,"h":60,"text":"Start"}\n],"edges":[]}'
    const note = `# Notes\n\n\`\`\`schema\n${json}\n\`\`\`\n`
    const file = schemasForFile(note, () => '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"/>')
    expect(file).toContain('\n![Diagram](data:image/svg+xml;base64,')
    expect(file).toContain('\n<!-- glifo-schema · to edit the diagram, open this file with Glifo\n')
    expect(schemasFromFile(file)).toBe(note)
    setLangForTests('it')
    expect(schemasFromFile(file)).toBe(note)
  })

  it('i nomi di forme, colori e database si leggono nella lingua di quando si usano', () => {
    expect([SHAPE_NAMES.rhombus, SHAPE_NAMES.lanes, SHAPE_NAMES.attribute, COLOR_NAMES.default, COLOR_NAMES.gray, SQL_DIALECTS[0].name]).toEqual([
      'Diamond',
      'Swimlanes',
      'Attribute (circle)',
      'Default',
      'Gray',
      'Standard SQL',
    ])
    setLangForTests('it')
    expect([SHAPE_NAMES.rhombus, SHAPE_NAMES.lanes, SHAPE_NAMES.attribute, COLOR_NAMES.default, COLOR_NAMES.gray, SQL_DIALECTS[0].name]).toEqual([
      'Rombo',
      'Corsie',
      'Attributo (pallino)',
      'Normale',
      'Grigio',
      'SQL standard',
    ])
  })
})
