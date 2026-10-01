/**
 * Le tabelle di uno schema in SQL, per il database scelto: un CREATE TABLE per tabella, con la
 * chiave primaria e le chiavi esterne, nell'ordine giusto (prima le tabelle a cui le altre si
 * riferiscono). Una chiave esterna (FK) trova la sua tabella con le frecce tra le tabelle o con
 * i nomi: un campo che si chiama come la chiave primaria di un'altra tabella (Matricola →
 * Studente.Matricola) o come l'altra tabella (Corso → Corso.Codice). Quello che non si capisce
 * finisce in una nota, dopo «--».
 */
import { parseTable, type Schema } from './model'

export type SqlDialect = 'standard' | 'postgresql' | 'mysql' | 'sqlite' | 'oracle' | 'sqlserver'

export const SQL_DIALECTS: readonly { id: SqlDialect; name: string }[] = [
  { id: 'standard', name: 'SQL standard' },
  { id: 'postgresql', name: 'PostgreSQL' },
  { id: 'mysql', name: 'MySQL / MariaDB' },
  { id: 'sqlite', name: 'SQLite' },
  { id: 'oracle', name: 'Oracle' },
  { id: 'sqlserver', name: 'SQL Server' },
]

/** Il tipo dei campi che non ne hanno uno. */
const DEFAULT_TYPE: Record<SqlDialect, string> = {
  standard: 'VARCHAR(255)',
  postgresql: 'VARCHAR(255)',
  mysql: 'VARCHAR(255)',
  sqlite: 'VARCHAR(255)',
  oracle: 'VARCHAR2(255)',
  sqlserver: 'VARCHAR(255)',
}

/** Parole riservate in almeno uno dei database: un nome così va tra virgolette. */
const RESERVED = new Set(
  `ADD ALL ALTER AND ANY AS ASC BETWEEN BY CASE CAST CHECK COLUMN COMMENT CONSTRAINT CREATE CROSS CURRENT DATE DEFAULT
  DELETE DESC DISTINCT DROP ELSE END EXCEPT EXISTS FALSE FETCH FILE FOR FOREIGN FROM FULL GRANT GROUP HAVING IN INDEX
  INNER INSERT INTERSECT INTO IS JOIN KEY LEFT LEVEL LIKE LIMIT MINUS MODE NATURAL NOT NULL NUMBER OF OFFSET ON OR ORDER
  OUTER PRIMARY RANGE RANK REFERENCES RIGHT ROW ROWS SELECT SESSION SET SIZE TABLE THEN TIME TIMESTAMP TO TRUE UNION
  UNIQUE UPDATE USER USING VALUES VIEW WHEN WHERE WITH`
    .trim()
    .split(/\s+/),
)

interface Column {
  /** Il nome nello schema, per le note. */
  label: string
  ident: string
  /** Il tipo scritto nello schema ('' se non c'è). */
  type: string
  pk: boolean
  fk: boolean
}

interface SqlTable {
  label: string
  ident: string
  columns: Column[]
  /** Le note da scrivere sopra il suo CREATE TABLE. */
  notes: string[]
}

interface ForeignKey {
  columns: Column[]
  to: SqlTable
  refs: Column[]
}

/** Un nome per l'SQL: senza accenti, con _ al posto di spazi e simboli («Città natale» → Citta_natale). */
function identFrom(name: string): string {
  return name
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .replace(/[^A-Za-z0-9_]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

/** Due nomi uguali per l'SQL (Matricola e matricola lo sono). */
function same(a: string, b: string): boolean {
  return identFrom(a).toLowerCase() === identFrom(b).toLowerCase()
}

/** Un nome non ancora usato: «Esame», poi «Esame_2»… (maiuscole e minuscole contano uguali). */
function unique(ident: string, taken: Set<string>): string {
  let name = ident
  for (let n = 2; taken.has(name.toLowerCase()); n++) name = `${ident}_${n}`
  taken.add(name.toLowerCase())
  return name
}

/** Il nome nel codice: tra virgolette (del tipo che usa quel database) solo se serve. */
function quote(ident: string, dialect: SqlDialect): string {
  if (/^[A-Za-z][A-Za-z0-9_]*$/.test(ident) && !RESERVED.has(ident.toUpperCase())) return ident
  if (dialect === 'mysql') return `\`${ident}\``
  if (dialect === 'sqlserver') return `[${ident}]`
  return `"${ident}"`
}

/**
 * Il tipo come lo vuole il database scelto: alcuni hanno un altro nome (BOOLEAN in SQL Server è
 * BIT, VARCHAR in Oracle è VARCHAR2…); quelli che non conosco restano come sono scritti.
 */
export function sqlType(type: string, dialect: SqlDialect): string {
  const written = type.trim().replace(/\s+/g, ' ')
  const m = /^([A-Za-z][A-Za-z0-9_ ]*?)\s*(\([^)]*\))?$/.exec(written)
  if (!m) return written
  const base = m[1].toUpperCase()
  // Tra parentesi: le misure, senza spazi; per i tipi che non conosco resta com'è (per esempio i valori di un ENUM).
  const raw = m[2] ?? ''
  const args = raw.replace(/\s+/g, '')
  const pick = (choices: Partial<Record<SqlDialect, string>>, other: string) => choices[dialect] ?? other
  switch (base) {
    case 'BOOL':
    case 'BOOLEAN':
      return pick({ sqlserver: 'BIT', oracle: 'NUMBER(1)' }, 'BOOLEAN')
    case 'TEXT':
    case 'CLOB':
      return pick({ standard: 'CLOB', oracle: 'CLOB', sqlserver: 'VARCHAR(MAX)' }, 'TEXT')
    case 'DATETIME':
    case 'DATETIME2':
    case 'TIMESTAMP':
      return pick({ sqlserver: 'DATETIME2', mysql: 'DATETIME', sqlite: 'DATETIME' }, 'TIMESTAMP') + args
    case 'VARCHAR':
    case 'VARCHAR2':
    case 'CHARACTER VARYING':
      // Senza lunghezza MySQL e Oracle non lo accettano, e SQL Server lo farebbe lungo 1.
      return pick({ oracle: 'VARCHAR2' }, 'VARCHAR') + (args || '(255)')
    case 'DOUBLE':
    case 'DOUBLE PRECISION':
      return pick({ sqlserver: 'FLOAT', oracle: 'BINARY_DOUBLE', mysql: 'DOUBLE', sqlite: 'REAL' }, 'DOUBLE PRECISION')
    case 'BIGINT':
      return pick({ oracle: 'NUMBER(19)' }, 'BIGINT')
    case 'TINYINT':
      return pick({ mysql: 'TINYINT', sqlserver: 'TINYINT', sqlite: 'TINYINT' }, 'SMALLINT')
    case 'NUMBER':
      return (dialect === 'oracle' ? 'NUMBER' : 'NUMERIC') + args
    default:
      return base + raw
  }
}

/** Le tabelle dello schema, con nomi buoni per l'SQL; `renamed` raccoglie i nomi cambiati. */
function readTables(schema: Schema, renamed: string[]): { tables: SqlTable[]; ids: Map<string, SqlTable> } {
  const tableNames = new Set<string>()
  const ids = new Map<string, SqlTable>()
  const tables = schema.nodes
    .filter((node) => node.shape === 'table')
    .map((node, i) => {
      const parsed = parseTable(node.text)
      const label = parsed.name.trim()
      const ident = unique(identFrom(label) || `tabella_${i + 1}`, tableNames)
      if (label && ident !== label) renamed.push(`«${label}» → ${ident}`)
      const columnNames = new Set<string>()
      const columns = parsed.fields
        .filter((f) => f.name.trim() || f.type.trim() || f.pk || f.fk)
        .map((f, j): Column => {
          const name = f.name.trim()
          const column = unique(identFrom(name) || `campo_${j + 1}`, columnNames)
          if (name && column !== name) renamed.push(`«${label || ident}.${name}» → ${ident}.${column}`)
          return { label: name || column, ident: column, type: f.type.trim(), pk: f.pk, fk: f.fk }
        })
      const table: SqlTable = { label: label || ident, ident, columns, notes: [] }
      ids.set(node.id, table)
      return table
    })
  return { tables, ids }
}

const primaryKey = (table: SqlTable) => table.columns.filter((c) => c.pk)

/**
 * Le chiavi esterne di ogni tabella. Per ogni campo FK si cerca, prima tra le tabelle collegate
 * da una freccia e poi tra tutte: una chiave primaria con lo stesso nome (meglio se tutta la
 * chiave si ritrova tra le FK della tabella), poi una tabella con lo stesso nome. Restano campi
 * senza tabella e una sola tabella collegata: sono suoi.
 */
function findForeignKeys(tables: SqlTable[], schema: Schema, ids: Map<string, SqlTable>): Map<SqlTable, ForeignKey[]> {
  const linked = new Map<SqlTable, SqlTable[]>(tables.map((t) => [t, []]))
  for (const edge of schema.edges) {
    const a = ids.get(edge.from)
    const b = ids.get(edge.to)
    if (!a || !b) continue
    if (!linked.get(a)!.includes(b)) linked.get(a)!.push(b)
    if (!linked.get(b)!.includes(a)) linked.get(b)!.push(a)
  }
  const result = new Map<SqlTable, ForeignKey[]>()
  for (const table of tables) {
    const fks = table.columns.filter((c) => c.fk)
    const targets = new Map<Column, { to: SqlTable; ref: Column }>()
    const unclear: Column[] = []
    for (const column of fks) {
      let found: { to: SqlTable; ref: Column } | 'more' | null = null
      for (const candidates of [linked.get(table)!, tables.filter((t) => t !== table)]) {
        const withKey = candidates.filter((t) => primaryKey(t).some((k) => same(k.label, column.label)))
        const whole = withKey.filter((t) => primaryKey(t).every((k) => fks.some((c) => same(c.label, k.label))))
        const byKey = whole.length ? whole : withKey
        const byName = candidates.filter((t) => same(t.label, column.label) && primaryKey(t).length === 1)
        if (byKey.length === 1) found = { to: byKey[0], ref: primaryKey(byKey[0]).find((k) => same(k.label, column.label))! }
        else if (byKey.length > 1 || byName.length > 1) found = 'more'
        else if (byName.length === 1) found = { to: byName[0], ref: primaryKey(byName[0])[0] }
        if (found) break
      }
      if (found && found !== 'more') targets.set(column, found)
      else unclear.push(column)
    }
    // Una sola tabella collegata da una freccia, non ancora usata e con la chiave di un campo solo:
    // i campi FK rimasti si riferiscono a lei (per esempio Partita: SquadraCasa e SquadraOspite).
    const free = linked.get(table)!.filter((t) => primaryKey(t).length === 1 && ![...targets.values()].some((v) => v.to === t))
    if (unclear.length && free.length === 1) {
      for (const column of unclear.splice(0)) targets.set(column, { to: free[0], ref: primaryKey(free[0])[0] })
    }
    for (const column of unclear) {
      table.notes.push(
        `«${table.label}.${column.label}» è una chiave esterna, ma non si capisce di quale tabella: collega le tabelle con una freccia, o chiama il campo come la chiave primaria dell'altra tabella.`,
      )
    }
    const keys: ForeignKey[] = []
    for (const to of new Set([...targets.values()].map((v) => v.to))) {
      const columns = [...targets].filter(([, v]) => v.to === to).map(([c]) => c)
      const key = primaryKey(to)
      if (key.length === 1) {
        // Ogni campo è una chiave esterna a sé (anche due campi verso la stessa tabella).
        for (const column of columns) keys.push({ columns: [column], to, refs: key })
      } else if (key.every((k) => columns.filter((c) => targets.get(c)!.ref === k).length === 1)) {
        // Una chiave primaria di più campi: la chiave esterna li ha tutti, nello stesso ordine.
        keys.push({ columns: key.map((k) => columns.find((c) => targets.get(c)!.ref === k)!), to, refs: key })
      } else {
        table.notes.push(
          `La chiave primaria di «${to.label}» è (${key.map((k) => k.label).join(', ')}): per riferirsi a lei, in «${table.label}» servono tutti questi campi come FK.`,
        )
      }
    }
    result.set(table, keys)
  }
  return result
}

/** Il codice SQL delle tabelle dello schema (forme «Tabella») per il database scelto. */
export function schemaSql(schema: Schema, dialect: SqlDialect): string {
  const dialectName = SQL_DIALECTS.find((d) => d.id === dialect)!.name
  const renamed: string[] = []
  const { tables, ids } = readTables(schema, renamed)
  if (!tables.length) return '-- Nello schema non ci sono tabelle.\n'
  const foreign = findForeignKeys(tables, schema, ids)
  const q = (ident: string) => quote(ident, dialect)

  // Il tipo di ogni campo: il suo, o quello della chiave a cui si riferisce, o quello di base.
  const refOf = new Map<Column, Column>()
  for (const keys of foreign.values()) for (const fk of keys) fk.columns.forEach((c, i) => refOf.set(c, fk.refs[i]))
  let defaulted = false
  const typeOf = (column: Column): string => {
    const written = column.type || refOf.get(column)?.type
    if (written) return sqlType(written, dialect)
    defaulted = true
    return DEFAULT_TYPE[dialect]
  }
  const types = new Map(tables.flatMap((t) => t.columns.map((c) => [c, typeOf(c)] as const)))

  // Prima le tabelle a cui le altre si riferiscono. In un giro di chiavi esterne (A → B → A),
  // quelle verso una tabella non ancora creata si aggiungono alla fine (in SQLite non serve).
  const order: SqlTable[] = []
  const remaining = [...tables]
  while (remaining.length) {
    const ready = remaining.find((t) => foreign.get(t)!.every((fk) => fk.to === t || order.includes(fk.to))) ?? remaining[0]
    order.push(ready)
    remaining.splice(remaining.indexOf(ready), 1)
  }

  const out: string[] = [`-- Tabelle per ${dialectName}, scritte con Glifo.`]
  if (defaulted) out.push(`-- I campi senza tipo sono ${DEFAULT_TYPE[dialect]}: cambialo dove serve.`)
  if (renamed.length) out.push(`-- Nomi scritti per l'SQL (senza spazi né accenti): ${renamed.join(', ')}.`)
  if (dialect === 'sqlite') out.push('-- SQLite controlla le chiavi esterne solo con questa riga, da ripetere a ogni connessione:', 'PRAGMA foreign_keys = ON;')
  out.push('')
  const later: string[] = []
  const created: SqlTable[] = []
  const reference = (fk: ForeignKey) => `FOREIGN KEY (${fk.columns.map((c) => q(c.ident)).join(', ')}) REFERENCES ${q(fk.to.ident)} (${fk.refs.map((c) => q(c.ident)).join(', ')})`
  for (const table of order) {
    const notes = [...table.notes]
    if (!table.columns.length) {
      out.push(`-- «${table.label}» non ha campi: aggiungili e scarica di nuovo il codice.`, '')
      continue
    }
    const key = primaryKey(table)
    if (!key.length) notes.unshift(`«${table.label}» non ha una chiave primaria: premi «PK» sui campi che la formano.`)
    const width = Math.max(...table.columns.map((c) => q(c.ident).length))
    const lines = table.columns.map((c) => `  ${q(c.ident).padEnd(width)} ${types.get(c)}${c.pk ? ' NOT NULL' : ''}`)
    if (key.length) lines.push(`  PRIMARY KEY (${key.map((c) => q(c.ident)).join(', ')})`)
    created.push(table)
    for (const fk of foreign.get(table)!) {
      if (dialect === 'sqlite' || created.includes(fk.to)) lines.push(`  ${reference(fk)}`)
      else later.push(`ALTER TABLE ${q(table.ident)} ADD ${reference(fk)};`)
    }
    out.push(...notes.map((n) => `-- ${n}`), `CREATE TABLE ${q(table.ident)} (`, lines.join(',\n'), ');', '')
  }
  if (later.length) out.push('-- Chiavi esterne verso tabelle create dopo:', ...later, '')
  return `${out.join('\n').trimEnd()}\n`
}
