/**
 * I modelli pronti da cui partire: schemi già disegnati, con testi da sostituire. Si aprono
 * dal foglio vuoto o dal menu «Modelli» dell'editor, che li aggiunge allo schema.
 */
import { DEFAULT_EDGE, SHAPE_SIZE, tableHeight, type Schema, type SchemaEdge, type SchemaNode, type ShapeKind } from './model'

export interface Template {
  id: string
  name: string
  /** A cosa serve, in una riga (per il suggerimento sul pulsante). */
  hint: string
  schema: Schema
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
const flowchart: Schema = {
  nodes: [
    node('inizio', 'ellipse', 100, 0, 'Inizio', { h: 60, color: 'green' }),
    node('dati', 'parallelogram', 90, 100, 'Leggi i dati'),
    node('calcolo', 'rect', 100, 200, 'Elabora'),
    node('domanda', 'rhombus', 100, 300, 'Va bene?', { color: 'yellow' }),
    node('risultato', 'document', 90, 430, 'Scrivi il risultato', { w: 140 }),
    node('fine', 'ellipse', 100, 550, 'Fine', { h: 60, color: 'red' }),
  ],
  edges: [
    edge('e1', 'inizio', 'dati'),
    edge('e2', 'dati', 'calcolo'),
    edge('e3', 'calcolo', 'domanda'),
    edge('e4', 'domanda', 'risultato', { text: 'Sì' }),
    edge('e5', 'risultato', 'fine'),
    edge('e6', 'domanda', 'calcolo', { text: 'No', points: [[300, 340], [300, 230]] }),
  ],
}

/** Un concetto al centro, quelli collegati sotto, con le parole che li legano. */
const conceptMap: Schema = {
  nodes: [
    node('centro', 'ellipse', 190, 0, 'Concetto principale', { w: 180, color: 'blue' }),
    node('c1', 'rounded', 0, 170, 'Concetto', { w: 140 }),
    node('c2', 'rounded', 210, 170, 'Concetto', { w: 140 }),
    node('c3', 'rounded', 420, 170, 'Concetto', { w: 140 }),
    node('es1', 'rounded', 0, 330, 'Esempio', { w: 140, color: 'green' }),
    node('es2', 'rounded', 420, 330, 'Esempio', { w: 140, color: 'green' }),
  ],
  edges: [
    edge('e1', 'centro', 'c1', { text: 'comprende', route: 'straight' }),
    edge('e2', 'centro', 'c2', { text: 'si basa su', route: 'straight' }),
    edge('e3', 'centro', 'c3', { text: 'porta a', route: 'straight' }),
    edge('e4', 'c1', 'es1', { text: 'per esempio', route: 'straight' }),
    edge('e5', 'c3', 'es2', { text: 'per esempio', route: 'straight' }),
  ],
}

/** Un argomento diviso in parti, e ogni parte in dettagli (come una classificazione). */
const tree: Schema = {
  nodes: [
    node('radice', 'rounded', 200, 0, 'Argomento', { w: 140, color: 'blue' }),
    node('p1', 'rounded', 60, 120, 'Parte 1', { w: 140 }),
    node('p2', 'rounded', 340, 120, 'Parte 2', { w: 140 }),
    node('d1', 'rect', 0, 240, 'Dettaglio', { h: 50 }),
    node('d2', 'rect', 140, 240, 'Dettaglio', { h: 50 }),
    node('d3', 'rect', 280, 240, 'Dettaglio', { h: 50 }),
    node('d4', 'rect', 420, 240, 'Dettaglio', { h: 50 }),
  ],
  edges: [
    edge('e1', 'radice', 'p1', { arrows: 'none' }),
    edge('e2', 'radice', 'p2', { arrows: 'none' }),
    edge('e3', 'p1', 'd1', { arrows: 'none' }),
    edge('e4', 'p1', 'd2', { arrows: 'none' }),
    edge('e5', 'p2', 'd3', { arrows: 'none' }),
    edge('e6', 'p2', 'd4', { arrows: 'none' }),
  ],
}

/** Quattro fasi che si ripetono, in senso orario: le frecce girano attorno, dagli angoli. */
const cycle: Schema = {
  nodes: [
    node('f1', 'rounded', 170, 0, 'Fase 1', { w: 130, color: 'blue' }),
    node('f2', 'rounded', 340, 130, 'Fase 2', { w: 130, color: 'green' }),
    node('f3', 'rounded', 170, 260, 'Fase 3', { w: 130, color: 'yellow' }),
    node('f4', 'rounded', 0, 130, 'Fase 4', { w: 130, color: 'red' }),
  ],
  edges: [
    edge('e1', 'f1', 'f2', { points: [[405, 30]] }),
    edge('e2', 'f2', 'f3', { points: [[405, 290]] }),
    edge('e3', 'f3', 'f4', { points: [[65, 290]] }),
    edge('e4', 'f4', 'f1', { points: [[65, 30]] }),
  ],
}

/** Gli eventi uno dopo l'altro, con l'anno sopra. */
const timeline: Schema = {
  nodes: [
    node('a1', 'rounded', 0, 0, 'Anno\nEvento', { w: 120, h: 64 }),
    node('a2', 'rounded', 180, 0, 'Anno\nEvento', { w: 120, h: 64 }),
    node('a3', 'rounded', 360, 0, 'Anno\nEvento', { w: 120, h: 64 }),
    node('a4', 'rounded', 540, 0, 'Anno\nEvento', { w: 120, h: 64 }),
  ],
  edges: [edge('e1', 'a1', 'a2', { route: 'straight' }), edge('e2', 'a2', 'a3', { route: 'straight' }), edge('e3', 'a3', 'a4', { route: 'straight' })],
}

/**
 * Uno schema E-R come nei libri di basi di dati italiani (Atzeni): entità, relazione con le
 * cardinalità vicino alle entità, attributi a pallino (pieno per l'identificatore).
 */
const er: Schema = {
  nodes: [
    node('studente', 'rect', 150, 100, 'Studente'),
    node('esame', 'rhombus', 380, 90, 'Esame'),
    node('corso', 'rect', 610, 100, 'Corso'),
    node('matricola', 'identifier', 0, 85, 'Matricola', { rot: 2 }),
    node('nome', 'attribute', 0, 120, 'Nome', { rot: 2 }),
    node('cognome', 'attribute', 0, 155, 'Cognome', { rot: 2 }),
    node('voto', 'attribute', 310, 20, 'Voto', { rot: 2 }),
    node('data', 'attribute', 460, 20, 'Data'),
    node('codice', 'identifier', 780, 85, 'Codice'),
    node('titolo', 'attribute', 780, 120, 'Titolo'),
    node('crediti', 'attribute', 780, 155, 'Crediti'),
  ],
  edges: [
    edge('e1', 'studente', 'esame', { text: '(0,N)', route: 'straight', arrows: 'none', at: 'start' }),
    edge('e2', 'esame', 'corso', { text: '(0,N)', route: 'straight', arrows: 'none', at: 'end' }),
    ...['matricola', 'nome', 'cognome'].map((a) => edge(`s-${a}`, 'studente', a, { route: 'straight', arrows: 'none' })),
    ...['voto', 'data'].map((a) => edge(`e-${a}`, 'esame', a, { route: 'straight', arrows: 'none' })),
    ...['codice', 'titolo', 'crediti'].map((a) => edge(`c-${a}`, 'corso', a, { route: 'straight', arrows: 'none' })),
  ],
}

/** Lo stesso esempio come tabelle (schema relazionale): le frecce vanno dalle chiavi esterne. */
function table(id: string, x: number, text: string): SchemaNode {
  return node(id, 'table', x, 0, text, { h: tableHeight(text, 'm') })
}

const tables: Schema = {
  nodes: [
    table('studente', 0, 'Studente\nPK Matricola\nNome\nCognome'),
    table('esame', 260, 'Esame\nPK Matricola\nPK Corso\nVoto\nData'),
    table('corso', 520, 'Corso\nPK Codice\nTitolo\nCrediti'),
  ],
  edges: [edge('e1', 'esame', 'studente'), edge('e2', 'esame', 'corso')],
}

export const TEMPLATES: Template[] = [
  { id: 'flusso', name: 'Diagramma di flusso', hint: 'I passi di un procedimento, con le domande e le strade possibili', schema: flowchart },
  { id: 'mappa', name: 'Mappa concettuale', hint: 'Un concetto e quelli collegati, con le parole che li legano', schema: conceptMap },
  { id: 'albero', name: 'Albero', hint: 'Un argomento diviso in parti e dettagli, come una classificazione', schema: tree },
  { id: 'ciclo', name: 'Ciclo', hint: 'Fasi che si ripetono, una dopo l\'altra', schema: cycle },
  { id: 'linea', name: 'Linea del tempo', hint: 'Eventi in ordine, con il loro anno', schema: timeline },
  { id: 'er', name: 'Schema E-R', hint: 'Entità, relazione con le cardinalità e attributi (basi di dati)', schema: er },
  { id: 'tabelle', name: 'Tabelle', hint: 'Tabelle con chiavi primarie ed esterne (schema relazionale)', schema: tables },
]
