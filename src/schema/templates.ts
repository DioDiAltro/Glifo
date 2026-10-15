/**
 * I modelli pronti da cui partire: schemi già disegnati, con testi da sostituire. Si aprono
 * dal foglio vuoto o dal menu «Modelli» dell'editor, che li aggiunge allo schema. I testi delle
 * forme sono nella lingua di Glifo: `schema` rifà lo schema ogni volta, quando lo si inserisce.
 */
import { texts } from '../i18n'
import { DEFAULT_EDGE, SHAPE_SIZE, tableHeight, type Schema, type SchemaEdge, type SchemaNode, type ShapeKind } from './model'

const T = texts({
  // I modelli: il nome e, sul pulsante, a cosa servono.
  flowchart: ['Diagramma di flusso', 'Flowchart'],
  flowchartHint: ['I passi di un procedimento, con le domande e le strade possibili', 'The steps of a procedure, with the questions and the possible paths'],
  conceptMap: ['Mappa concettuale', 'Concept map'],
  conceptMapHint: ['Un concetto e quelli collegati, con le parole che li legano', 'A concept and the related ones, with the words that link them'],
  tree: ['Albero', 'Tree'],
  treeHint: ['Un argomento diviso in parti e dettagli, come una classificazione', 'A topic divided into parts and details, like a classification'],
  cycle: ['Ciclo', 'Cycle'],
  cycleHint: ['Fasi che si ripetono, una dopo l\'altra', 'Phases that repeat, one after the other'],
  timeline: ['Linea del tempo', 'Timeline'],
  timelineHint: ['Eventi in ordine, con il loro anno', 'Events in order, with their year'],
  lanesProcess: ['Processo con le corsie', 'Swimlane process'],
  lanesProcessHint: ['Chi fa cosa: i passi di un processo aziendale nelle corsie di chi li fa', 'Who does what: the steps of a business process in the lanes of whoever does them'],
  nested: ['Contenitori', 'Containers'],
  nestedHint: ['Insiemi uno dentro l\'altro, come il sistema informatico dentro quello informativo', 'Sets one inside the other, like the IT system inside the information system'],
  er: ['Schema E-R', 'E-R diagram'],
  erHint: ['Entità, relazione con le cardinalità e attributi (basi di dati)', 'Entities, a relationship with its cardinalities, and attributes (databases)'],
  tables: ['Tabelle', 'Tables'],
  tablesHint: ['Tabelle con chiavi primarie ed esterne (schema relazionale)', 'Tables with primary and foreign keys (relational schema)'],
  // Il testo delle forme e delle frecce, da sostituire.
  start: ['Inizio', 'Start'],
  readData: ['Leggi i dati', 'Read the data'],
  compute: ['Elabora', 'Process'],
  isItOk: ['Va bene?', 'Is it OK?'],
  writeResult: ['Scrivi il risultato', 'Write the result'],
  end: ['Fine', 'End'],
  yes: ['Sì', 'Yes'],
  no: ['No', 'No'],
  mainConcept: ['Concetto principale', 'Main concept'],
  concept: ['Concetto', 'Concept'],
  example: ['Esempio', 'Example'],
  includes: ['comprende', 'includes'],
  basedOn: ['si basa su', 'is based on'],
  leadsTo: ['porta a', 'leads to'],
  forExample: ['per esempio', 'for example'],
  topic: ['Argomento', 'Topic'],
  part: (n: number) => [`Parte ${n}`, `Part ${n}`],
  detail: ['Dettaglio', 'Detail'],
  phase: (n: number) => [`Fase ${n}`, `Phase ${n}`],
  yearEvent: ['Anno\nEvento', 'Year\nEvent'],
  student: ['Studente', 'Student'],
  exam: ['Esame', 'Exam'],
  course: ['Corso', 'Course'],
  studentId: ['Matricola', 'StudentID'],
  firstName: ['Nome', 'Name'],
  surname: ['Cognome', 'Surname'],
  grade: ['Voto', 'Grade'],
  date: ['Data', 'Date'],
  code: ['Codice', 'Code'],
  title: ['Titolo', 'Title'],
  credits: ['Crediti', 'Credits'],
  // Le tabelle, con i tipi per l'SQL: in inglese la data dell'esame non si chiama Date, che nell'SQL è una parola riservata.
  studentTable: ['Studente\nPK Matricola: CHAR(6)\nNome: VARCHAR(50)\nCognome: VARCHAR(50)', 'Student\nPK StudentID: CHAR(6)\nName: VARCHAR(50)\nSurname: VARCHAR(50)'],
  examTable: ['Esame\nPK FK Matricola: CHAR(6)\nPK FK Corso: CHAR(5)\nVoto: INTEGER\nData: DATE', 'Exam\nPK FK StudentID: CHAR(6)\nPK FK Course: CHAR(5)\nGrade: INTEGER\nExamDate: DATE'],
  courseTable: ['Corso\nPK Codice: CHAR(5)\nTitolo: VARCHAR(100)\nCrediti: INTEGER', 'Course\nPK Code: CHAR(5)\nTitle: VARCHAR(100)\nCredits: INTEGER'],
  lanes: ['Cliente\nVendite\nMagazzino\nAmministrazione', 'Customer\nSales\nWarehouse\nAccounting'],
  placeOrder: ['Invia l\'ordine', 'Place the order'],
  recordOrder: ['Registra l\'ordine', 'Record the order'],
  inStock: ['Merce\ndisponibile?', 'Goods\nin stock?'],
  reorder: ['Riordina dal fornitore', 'Reorder from the supplier'],
  ship: ['Prepara e spedisce la merce', 'Prepare and ship the goods'],
  invoice: ['Emette la fattura', 'Issue the invoice'],
  pay: ['Riceve la merce e paga', 'Receive the goods and pay'],
  recordPayment: ['Registra l\'incasso', 'Record the payment'],
  organization: ['Sistema organizzativo', 'Organizational system'],
  informationSystem: ['Sistema informativo', 'Information system'],
  itSystem: ['Sistema informatico', 'IT system'],
})

export interface Template {
  id: string
  /** Il nome, nella lingua di Glifo quando si legge. */
  readonly name: string
  /** A cosa serve, in una riga (per il suggerimento sul pulsante). */
  readonly hint: string
  /** Lo schema, fatto quando si legge: i testi sono nella lingua di Glifo di quel momento. */
  readonly schema: Schema
}

type NodeExtra = Partial<Omit<SchemaNode, 'id' | 'shape' | 'x' | 'y' | 'text'>>

function node(id: string, shape: ShapeKind, x: number, y: number, text: string, extra: NodeExtra = {}): SchemaNode {
  const [w, h] = SHAPE_SIZE[shape]
  return { id, shape, x, y, w, h, text, color: 'default', size: 'm', rot: 0, ...extra }
}

function edge(id: string, from: string, to: string, extra: Partial<Omit<SchemaEdge, 'id' | 'from' | 'to'>> = {}): SchemaEdge {
  return { id, from, to, ...DEFAULT_EDGE, points: [], at: 'middle', ...extra }
}

/** Dall'inizio alla fine, con una domanda e un ritorno indietro. */
const flowchart = (): Schema => ({
  nodes: [
    node('inizio', 'ellipse', 100, 0, T.start, { h: 60, color: 'green' }),
    node('dati', 'parallelogram', 90, 100, T.readData),
    node('calcolo', 'rect', 100, 200, T.compute),
    node('domanda', 'rhombus', 100, 300, T.isItOk, { color: 'yellow' }),
    node('risultato', 'document', 90, 430, T.writeResult, { w: 140 }),
    node('fine', 'ellipse', 100, 550, T.end, { h: 60, color: 'red' }),
  ],
  edges: [
    edge('e1', 'inizio', 'dati'),
    edge('e2', 'dati', 'calcolo'),
    edge('e3', 'calcolo', 'domanda'),
    edge('e4', 'domanda', 'risultato', { text: T.yes }),
    edge('e5', 'risultato', 'fine'),
    edge('e6', 'domanda', 'calcolo', { text: T.no, points: [[300, 340], [300, 230]] }),
  ],
})

/** Un concetto al centro, quelli collegati sotto, con le parole che li legano. */
const conceptMap = (): Schema => ({
  nodes: [
    node('centro', 'ellipse', 190, 0, T.mainConcept, { w: 180, color: 'blue' }),
    node('c1', 'rounded', 0, 170, T.concept, { w: 140 }),
    node('c2', 'rounded', 210, 170, T.concept, { w: 140 }),
    node('c3', 'rounded', 420, 170, T.concept, { w: 140 }),
    node('es1', 'rounded', 0, 330, T.example, { w: 140, color: 'green' }),
    node('es2', 'rounded', 420, 330, T.example, { w: 140, color: 'green' }),
  ],
  edges: [
    edge('e1', 'centro', 'c1', { text: T.includes, route: 'straight' }),
    edge('e2', 'centro', 'c2', { text: T.basedOn, route: 'straight' }),
    edge('e3', 'centro', 'c3', { text: T.leadsTo, route: 'straight' }),
    edge('e4', 'c1', 'es1', { text: T.forExample, route: 'straight' }),
    edge('e5', 'c3', 'es2', { text: T.forExample, route: 'straight' }),
  ],
})

/** Un argomento diviso in parti, e ogni parte in dettagli (come una classificazione). */
const tree = (): Schema => ({
  nodes: [
    node('radice', 'rounded', 200, 0, T.topic, { w: 140, color: 'blue' }),
    node('p1', 'rounded', 60, 120, T.part(1), { w: 140 }),
    node('p2', 'rounded', 340, 120, T.part(2), { w: 140 }),
    node('d1', 'rect', 0, 240, T.detail, { h: 50 }),
    node('d2', 'rect', 140, 240, T.detail, { h: 50 }),
    node('d3', 'rect', 280, 240, T.detail, { h: 50 }),
    node('d4', 'rect', 420, 240, T.detail, { h: 50 }),
  ],
  edges: [
    edge('e1', 'radice', 'p1', { arrows: 'none' }),
    edge('e2', 'radice', 'p2', { arrows: 'none' }),
    edge('e3', 'p1', 'd1', { arrows: 'none' }),
    edge('e4', 'p1', 'd2', { arrows: 'none' }),
    edge('e5', 'p2', 'd3', { arrows: 'none' }),
    edge('e6', 'p2', 'd4', { arrows: 'none' }),
  ],
})

/** Quattro fasi che si ripetono, in senso orario: le frecce girano attorno, dagli angoli. */
const cycle = (): Schema => ({
  nodes: [
    node('f1', 'rounded', 170, 0, T.phase(1), { w: 130, color: 'blue' }),
    node('f2', 'rounded', 340, 130, T.phase(2), { w: 130, color: 'green' }),
    node('f3', 'rounded', 170, 260, T.phase(3), { w: 130, color: 'yellow' }),
    node('f4', 'rounded', 0, 130, T.phase(4), { w: 130, color: 'red' }),
  ],
  edges: [
    edge('e1', 'f1', 'f2', { points: [[405, 30]] }),
    edge('e2', 'f2', 'f3', { points: [[405, 290]] }),
    edge('e3', 'f3', 'f4', { points: [[65, 290]] }),
    edge('e4', 'f4', 'f1', { points: [[65, 30]] }),
  ],
})

/** Gli eventi uno dopo l'altro, con l'anno sopra. */
const timeline = (): Schema => ({
  nodes: [
    node('a1', 'rounded', 0, 0, T.yearEvent, { w: 120, h: 64 }),
    node('a2', 'rounded', 180, 0, T.yearEvent, { w: 120, h: 64 }),
    node('a3', 'rounded', 360, 0, T.yearEvent, { w: 120, h: 64 }),
    node('a4', 'rounded', 540, 0, T.yearEvent, { w: 120, h: 64 }),
  ],
  edges: [edge('e1', 'a1', 'a2', { route: 'straight' }), edge('e2', 'a2', 'a3', { route: 'straight' }), edge('e3', 'a3', 'a4', { route: 'straight' })],
})

/**
 * Uno schema E-R come nei libri di basi di dati italiani (Atzeni): entità, relazione con le
 * cardinalità vicino alle entità, attributi a pallino (pieno per l'identificatore).
 */
const er = (): Schema => ({
  nodes: [
    node('studente', 'rect', 150, 100, T.student),
    node('esame', 'rhombus', 380, 90, T.exam),
    node('corso', 'rect', 610, 100, T.course),
    node('matricola', 'identifier', 0, 85, T.studentId, { rot: 2 }),
    node('nome', 'attribute', 0, 120, T.firstName, { rot: 2 }),
    node('cognome', 'attribute', 0, 155, T.surname, { rot: 2 }),
    node('voto', 'attribute', 310, 20, T.grade, { rot: 2 }),
    node('data', 'attribute', 460, 20, T.date),
    node('codice', 'identifier', 780, 85, T.code),
    node('titolo', 'attribute', 780, 120, T.title),
    node('crediti', 'attribute', 780, 155, T.credits),
  ],
  edges: [
    edge('e1', 'studente', 'esame', { text: '(0,N)', route: 'straight', arrows: 'none', at: 'start' }),
    edge('e2', 'esame', 'corso', { text: '(0,N)', route: 'straight', arrows: 'none', at: 'end' }),
    ...['matricola', 'nome', 'cognome'].map((a) => edge(`s-${a}`, 'studente', a, { route: 'straight', arrows: 'none' })),
    ...['voto', 'data'].map((a) => edge(`e-${a}`, 'esame', a, { route: 'straight', arrows: 'none' })),
    ...['codice', 'titolo', 'crediti'].map((a) => edge(`c-${a}`, 'corso', a, { route: 'straight', arrows: 'none' })),
  ],
})

/**
 * Lo stesso esempio come tabelle (schema relazionale), con i tipi per l'SQL: le frecce vanno
 * dalle chiavi esterne. In Esame la chiave primaria è fatta di due chiavi esterne.
 */
function table(id: string, x: number, text: string): SchemaNode {
  return node(id, 'table', x, 0, text, { w: 210, h: tableHeight(text, 'm') })
}

const tables = (): Schema => ({
  nodes: [
    table('studente', 0, T.studentTable),
    table('esame', 290, T.examTable),
    table('corso', 580, T.courseTable),
  ],
  edges: [edge('e1', 'esame', 'studente'), edge('e2', 'esame', 'corso')],
})

/**
 * Un processo con le corsie (chi fa cosa), come nei libri di economia aziendale: l'ordine di un
 * cliente dall'arrivo all'incasso, passando per le vendite, il magazzino e l'amministrazione (i
 * reparti che un gestionale, un ERP, tiene insieme). Le corsie stanno per prime, cioè dietro.
 */
const process = (): Schema => ({
  nodes: [
    node('corsie', 'lanes', 0, 0, T.lanes, { w: 800, h: 740 }),
    node('inizio', 'ellipse', 40, 60, T.start, { h: 50, color: 'green' }),
    node('ordine', 'rounded', 30, 140, T.placeOrder, { w: 140 }),
    node('registra', 'rounded', 230, 140, T.recordOrder, { w: 140 }),
    node('disponibile', 'rhombus', 225, 235, T.inStock, { w: 150, h: 90, color: 'yellow' }),
    node('fornitore', 'rounded', 430, 250, T.reorder, { w: 140 }),
    node('prepara', 'rounded', 430, 360, T.ship, { w: 140 }),
    node('fattura', 'document', 630, 355, T.invoice, { w: 140 }),
    node('paga', 'rounded', 30, 560, T.pay, { w: 140 }),
    node('incasso', 'rounded', 630, 560, T.recordPayment, { w: 140 }),
    node('fine', 'ellipse', 640, 660, T.end, { h: 50, color: 'red' }),
  ],
  edges: [
    edge('e1', 'inizio', 'ordine'),
    edge('e2', 'ordine', 'registra'),
    edge('e3', 'registra', 'disponibile'),
    edge('e4', 'disponibile', 'prepara', { text: T.yes, points: [[300, 390]] }),
    edge('e5', 'disponibile', 'fornitore', { text: T.no }),
    edge('e6', 'fornitore', 'prepara'),
    edge('e7', 'prepara', 'fattura'),
    edge('e8', 'fattura', 'paga', { points: [[700, 500], [100, 500]] }),
    edge('e9', 'paga', 'incasso'),
    edge('e10', 'incasso', 'fine'),
  ],
})

/**
 * Tre contenitori uno dentro l'altro, come nei libri di sistemi informativi: il sistema informatico
 * (computer, programmi, reti) è una parte del sistema informativo, che è una parte dell'organizzazione.
 * I più grandi stanno per primi, cioè dietro.
 */
const nested = (): Schema => ({
  nodes: [
    node('organizzativo', 'container', 0, 0, T.organization, { w: 420, h: 290 }),
    node('informativo', 'container', 30, 50, T.informationSystem, { w: 360, h: 210 }),
    node('informatico', 'container', 60, 100, T.itSystem, { w: 300, h: 130 }),
  ],
  edges: [],
})

export const TEMPLATES: Template[] = [
  { id: 'flusso', get name() { return T.flowchart }, get hint() { return T.flowchartHint }, get schema() { return flowchart() } },
  { id: 'mappa', get name() { return T.conceptMap }, get hint() { return T.conceptMapHint }, get schema() { return conceptMap() } },
  { id: 'albero', get name() { return T.tree }, get hint() { return T.treeHint }, get schema() { return tree() } },
  { id: 'ciclo', get name() { return T.cycle }, get hint() { return T.cycleHint }, get schema() { return cycle() } },
  { id: 'linea', get name() { return T.timeline }, get hint() { return T.timelineHint }, get schema() { return timeline() } },
  { id: 'corsie', get name() { return T.lanesProcess }, get hint() { return T.lanesProcessHint }, get schema() { return process() } },
  { id: 'contenitori', get name() { return T.nested }, get hint() { return T.nestedHint }, get schema() { return nested() } },
  { id: 'er', get name() { return T.er }, get hint() { return T.erHint }, get schema() { return er() } },
  { id: 'tabelle', get name() { return T.tables }, get hint() { return T.tablesHint }, get schema() { return tables() } },
]
