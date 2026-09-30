import { PGlite } from '@electric-sql/pglite'
import stubSql from '../../supabase/tests/supabase-stub.sql?raw'
import testsSql from '../../supabase/tests/database.test.sql?raw'

// Le migrazioni, lette come testo: le chiavi sono i percorsi, in ordine di versione.
const MIGRATIONS = import.meta.glob<string>('../../supabase/migrations/*.sql', { query: '?raw', import: 'default', eager: true })

/** I file di supabase/migrations, in ordine. */
export function migrations(): string[] {
  return Object.keys(MIGRATIONS)
    .sort()
    .map((path) => MIGRATIONS[path])
}

export function databaseTests(): string {
  return testsSql
}

/** Un database nuovo, in memoria, con tutte le migrazioni applicate. */
export async function createDatabase(): Promise<PGlite> {
  const db = await PGlite.create()
  await db.exec(stubSql)
  for (const sql of migrations()) await db.exec(sql)
  return db
}

export async function createUser(db: PGlite, email: string): Promise<string> {
  const { rows } = await db.query<{ id: string }>(
    `insert into auth.users (id, email, aud, role) values (gen_random_uuid(), $1, 'authenticated', 'authenticated') returning id`,
    [email],
  )
  return rows[0].id
}

/**
 * Chiama una funzione del database come fa l'API di Supabase: una transazione per richiesta,
 * con il ruolo authenticated e l'utente preso dal token.
 */
export async function callAs<T>(db: PGlite, userId: string, name: 'sync_pull' | 'sync_push', args: Record<string, unknown>): Promise<T> {
  return db.transaction(async (tx) => {
    await tx.query(`select set_config('role', 'authenticated', true), set_config('request.jwt.claims', $1, true)`, [
      JSON.stringify({ sub: userId, role: 'authenticated' }),
    ])
    const { rows } =
      name === 'sync_pull'
        ? await tx.query<{ r: T }>('select public.sync_pull($1) as r', [(args.since as string | null | undefined) ?? null])
        : await tx.query<{ r: T }>('select public.sync_push($1::jsonb) as r', [JSON.stringify(args.changes ?? {})])
    return rows[0].r
  })
}
