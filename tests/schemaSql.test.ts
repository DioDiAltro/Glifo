import { PGlite } from '@electric-sql/pglite'
import { describe, expect, it } from 'vitest'
import { parseSchema, type Schema } from '../src/schema/model'
import { schemaSql, sqlType, SQL_DIALECTS } from '../src/schema/sql'
import { TEMPLATES } from '../src/schema/templates'

/** Uno schema con queste tabelle (id → testo) e queste frecce. */
function schema(tables: Record<string, string>, edges: [string, string][] = []): Schema {
  return parseSchema(
    JSON.stringify({
      nodes: Object.entries(tables).map(([id, text], i) => ({ id, shape: 'table', x: i * 250, y: 0, w: 200, h: 100, text })),
      edges: edges.map(([from, to], i) => ({ id: `e${i}`, from, to })),
    }),
  )
}

/** SQLite di Node: il nome si compone qui, così TypeScript non cerca i tipi di Node (che non ci sono). */
async function sqlite(): Promise<{ exec(sql: string): void }> {
  const name = ['node', 'sqlite'].join(':')
  const { DatabaseSync } = (await import(/* @vite-ignore */ name)) as { DatabaseSync: new (path: string) => { exec(sql: string): void } }
  return new DatabaseSync(':memory:')
}

const tabelle = TEMPLATES.find((t) => t.id === 'tabelle')!.schema

/** Uno schema con un po' di tutto: nomi strani, tipi da tradurre, giri di chiavi, chiavi che non si capiscono. */
const mixed = schema(
  {
    squadra: 'Squadra\nPK Codice: CHAR(3)\nNome: VARCHAR(40)\nCittà natale\nAttiva: BOOLEAN',
    partita: 'Partita\nPK Numero: INTEGER\nFK SquadraCasa\nFK SquadraOspite\nDate: DATETIME\nNote: TEXT',
    reparto: 'Reparto\nPK Sigla: CHAR(2)\nFK Capo',
    impiegato: 'Impiegato\nPK Capo: CHAR(5)\nFK Reparto',
    order: 'Order\nPK Id: INTEGER\nFK Cliente\nTotale: DECIMAL(8, 2)',
    vuota: 'Vuota',
  },
  [
    ['partita', 'squadra'],
    ['reparto', 'impiegato'],
  ],
)

describe('codice SQL delle tabelle', () => {
  it('il modello «Tabelle»: chiavi primarie, chiavi esterne dalle frecce e dai nomi, prima le tabelle a cui ci si riferisce', () => {
    const sql = schemaSql(tabelle, 'postgresql')
    // In colonna: i nomi, poi i tipi.
    expect(sql).toContain('CREATE TABLE Studente (\n  Matricola CHAR(6) NOT NULL,\n  Nome      VARCHAR(50),\n  Cognome   VARCHAR(50),\n  PRIMARY KEY (Matricola)\n);')
    expect(sql).toContain('  PRIMARY KEY (Matricola, Corso),\n  FOREIGN KEY (Matricola) REFERENCES Studente (Matricola),\n  FOREIGN KEY (Corso) REFERENCES Corso (Codice)\n);')
    expect(sql.indexOf('CREATE TABLE Esame')).toBeGreaterThan(Math.max(sql.indexOf('CREATE TABLE Studente'), sql.indexOf('CREATE TABLE Corso')))
    // Tutti i campi hanno un tipo: niente nota sui tipi di base, né altre note.
    expect(sql.split('\n').filter((l) => l.startsWith('--'))).toEqual(['-- Tabelle per PostgreSQL, scritte con Glifo.'])
  })

  it('senza frecce, le chiavi esterne si trovano con i nomi; se due tabelle vanno bene uguali, lo dice una nota', () => {
    const sql = schemaSql({ ...tabelle, edges: [] }, 'postgresql')
    // Matricola come la chiave di Studente, Corso come la tabella Corso.
    expect(sql).toContain('  FOREIGN KEY (Matricola) REFERENCES Studente (Matricola),\n  FOREIGN KEY (Corso) REFERENCES Corso (Codice)\n);')
    const twins = schemaSql(schema({ a: 'Aula\nPK Codice', l: 'Laboratorio\nPK Codice', p: 'Prenotazione\nPK Numero\nFK Codice' }), 'postgresql')
    expect(twins).toContain('-- «Prenotazione.Codice» è una chiave esterna, ma non si capisce di quale tabella')
    expect(twins).not.toContain('FOREIGN KEY')
  })

  it('il codice per PostgreSQL e quello standard funzionano davvero, e le chiavi esterne fanno il loro lavoro', async () => {
    for (const dialect of ['postgresql', 'standard'] as const) {
      const db = await PGlite.create()
      await db.exec(schemaSql(tabelle, dialect))
      await db.exec("INSERT INTO Studente VALUES ('123456', 'Ada', 'Lovelace'); INSERT INTO Corso VALUES ('BD001', 'Basi di dati', 9);")
      await db.exec("INSERT INTO Esame VALUES ('123456', 'BD001', 30, '2026-07-01')")
      await expect(db.exec("INSERT INTO Esame VALUES ('999999', 'BD001', 18, '2026-07-01')")).rejects.toThrow(/foreign key/)
      await db.close()
    }
  }, 60_000)

  it('il codice per SQLite funziona davvero, con le chiavi esterne accese', async () => {
    const db = await sqlite()
    const sql = schemaSql(tabelle, 'sqlite')
    expect(sql).toContain('PRAGMA foreign_keys = ON;')
    db.exec(sql)
    db.exec("INSERT INTO Studente VALUES ('123456', 'Ada', 'Lovelace'); INSERT INTO Corso VALUES ('BD001', 'Basi di dati', 9);")
    db.exec("INSERT INTO Esame VALUES ('123456', 'BD001', 30, '2026-07-01')")
    expect(() => db.exec("INSERT INTO Esame VALUES ('999999', 'BD001', 18, '2026-07-01')")).toThrow(/FOREIGN KEY/)
  })

  it('nomi senza spazi né accenti, parole riservate tra virgolette, una nota per quello che non si capisce', () => {
    const sql = schemaSql(mixed, 'postgresql')
    expect(sql).toMatch(/\n {2}Citta_natale +VARCHAR\(255\),/)
    expect(sql).toContain("-- Nomi scritti per l'SQL (senza spazi né accenti): «Squadra.Città natale» → Squadra.Citta_natale.")
    expect(sql).toContain('-- I campi senza tipo sono VARCHAR(255): cambialo dove serve.')
    expect(sql).toContain('CREATE TABLE "Order" (')
    expect(sql).toMatch(/\n {2}"Date" +TIMESTAMP,/)
    // Una freccia sola verso Squadra: tutte e due le FK di Partita sono sue, ognuna per conto suo.
    expect(sql).toContain('  FOREIGN KEY (SquadraCasa) REFERENCES Squadra (Codice),\n  FOREIGN KEY (SquadraOspite) REFERENCES Squadra (Codice)')
    // Le FK prendono il tipo della chiave a cui si riferiscono.
    expect(sql).toMatch(/\n {2}SquadraCasa +CHAR\(3\),/)
    // Reparto e Impiegato si riferiscono l'uno all'altro: una delle due chiavi arriva alla fine.
    expect(sql).toContain('-- Chiavi esterne verso tabelle create dopo:\nALTER TABLE Reparto ADD FOREIGN KEY (Capo) REFERENCES Impiegato (Capo);')
    expect(sql).toContain('-- «Order.Cliente» è una chiave esterna, ma non si capisce di quale tabella')
    expect(sql).toContain('-- «Vuota» non ha campi')
  })

  it('anche lo schema con un po\' di tutto funziona in PostgreSQL e in SQLite', async () => {
    const db = await PGlite.create()
    await db.exec(schemaSql(mixed, 'postgresql'))
    await db.close()
    const lite = await sqlite()
    const sql = schemaSql(mixed, 'sqlite')
    expect(sql).not.toContain('ALTER TABLE')
    lite.exec(sql)
  }, 60_000)

  it('ogni database con i suoi nomi e le sue virgolette', () => {
    const mysql = schemaSql(mixed, 'mysql')
    expect(mysql).toContain('CREATE TABLE `Order` (')
    expect(mysql).toMatch(/\n {2}`Date` +DATETIME,/)
    const sqlserver = schemaSql(mixed, 'sqlserver')
    expect(sqlserver).toContain('CREATE TABLE [Order] (')
    expect(sqlserver).toMatch(/\n {2}Attiva +BIT,/)
    expect(sqlserver).toMatch(/\n {2}Note +VARCHAR\(MAX\),/)
    expect(sqlserver).toMatch(/\n {2}\[Date\] +DATETIME2,/)
    const oracle = schemaSql(mixed, 'oracle')
    expect(oracle).toMatch(/\n {2}Nome +VARCHAR2\(40\),/)
    expect(oracle).toMatch(/\n {2}Attiva +NUMBER\(1\),/)
    expect(oracle).toMatch(/\n {2}Note +CLOB,/)
    expect(oracle).toContain('-- I campi senza tipo sono VARCHAR2(255)')
    for (const { id, name } of SQL_DIALECTS) expect(schemaSql(tabelle, id)).toContain(`-- Tabelle per ${name}, scritte con Glifo.`)
  })

  it('i tipi che cambiano nome da un database all\'altro', () => {
    expect(sqlType('boolean', 'sqlserver')).toBe('BIT')
    expect(sqlType('varchar', 'mysql')).toBe('VARCHAR(255)')
    expect(sqlType('varchar( 30 )', 'oracle')).toBe('VARCHAR2(30)')
    expect(sqlType('timestamp(3)', 'sqlserver')).toBe('DATETIME2(3)')
    expect(sqlType('double', 'postgresql')).toBe('DOUBLE PRECISION')
    expect(sqlType('decimal(8, 2)', 'mysql')).toBe('DECIMAL(8, 2)')
    expect(sqlType("enum('primo anno', 'altro')", 'mysql')).toBe("ENUM('primo anno', 'altro')")
  })

  it('una chiave esterna di più campi verso una chiave primaria di più campi', async () => {
    const composite = schema(
      {
        esame: 'Esame\nPK Matricola: CHAR(6)\nPK Corso: CHAR(5)\nVoto: INTEGER',
        ricevuta: 'Ricevuta\nPK Numero: INTEGER\nFK Matricola\nFK Corso',
        parziale: 'Parziale\nPK Numero: INTEGER\nFK Matricola',
      },
      [
        ['ricevuta', 'esame'],
        ['parziale', 'esame'],
      ],
    )
    const sql = schemaSql(composite, 'postgresql')
    expect(sql).toContain('  FOREIGN KEY (Matricola, Corso) REFERENCES Esame (Matricola, Corso)')
    // Con un campo solo non basta: lo dice una nota, e il codice funziona lo stesso.
    expect(sql).toContain('-- La chiave primaria di «Esame» è (Matricola, Corso): per riferirsi a lei, in «Parziale» servono tutti questi campi come FK.')
    const db = await PGlite.create()
    await db.exec(sql)
    await db.close()
  }, 60_000)
})
