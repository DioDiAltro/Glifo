import { describe, expect, it } from 'vitest'
import { createDatabase, databaseTests } from './support/database'

// Le regole di accesso e le funzioni di sincronizzazione, con le stesse migrazioni del
// progetto Supabase, in un Postgres in memoria (PGlite).
describe('database degli account', () => {
  it('supera i test di supabase/tests', async () => {
    const db = await createDatabase()
    // Il blocco di test finisce sempre con un errore: «TEST OK» se è andato tutto bene.
    await expect(db.exec(databaseTests())).rejects.toThrow(/TEST OK: \d+ controlli/)
    await db.close()
  }, 60_000)
})
