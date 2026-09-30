// @vitest-environment jsdom
import type { PGlite } from '@electric-sql/pglite'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { SyncEngine, SyncError, SyncState, type LocalChange, type Prefs, type SyncBackend } from '../src/account/sync'
import { FoldersStore } from '../src/store/folders'
import { NotesStore } from '../src/store/notes'
import { callAs, createDatabase, createUser } from './support/database'

let db: PGlite
beforeAll(async () => {
  db = await createDatabase()
}, 60_000)
afterAll(async () => {
  await db.close()
})
beforeEach(() => localStorage.clear())

let devices = 0

/** Un dispositivo con l'account `userId`: le sue note stanno in uno spazio tutto suo. */
function device(userId: string, backend: Partial<SyncBackend> = {}) {
  const space = `u.${userId}.d${++devices}.`
  const notes = new NotesStore({ space, trackDeletions: true })
  const folders = new FoldersStore({ space, trackDeletions: true })
  const state = new SyncState(`glifo.${space}sync.v1`)
  const settings: Record<string, unknown> = { theme: 'auto', fontSize: 16 }
  const words: string[] = []
  const changes: LocalChange[] = []
  const prefs: Prefs = {
    read: () => ({ ...settings }),
    apply: (values) => Object.assign(settings, values),
    words: () => [...words],
    applyWords: (next) => words.splice(0, words.length, ...next),
  }
  const engine = new SyncEngine({
    notes,
    folders,
    state,
    prefs,
    backend: {
      pull: (since) => callAs(db, userId, 'sync_pull', { since }),
      push: (changes) => callAs(db, userId, 'sync_push', { changes }),
      ...backend,
    },
    hooks: { flush: () => {}, changed: (change) => changes.push(change) },
  })
  return { notes, folders, state, settings, words, changes, engine, sync: () => engine.sync() }
}

const contents = (d: ReturnType<typeof device>) =>
  d.notes
    .list()
    .map((n) => d.notes.get(n.id)!.content)
    .sort()

describe('sincronizzazione tra due dispositivi', () => {
  it('note e cartelle scritte su uno arrivano sull\'altro', async () => {
    const user = await createUser(db, 'a@example.invalid')
    const pc = device(user)
    const telefono = device(user)
    const analisi = pc.folders.create('Analisi 1')!
    const nota = pc.notes.create('# Limiti\n\nDefinizione', analisi.id)
    const sent = await pc.sync()
    expect(pc.engine.hasPending()).toBe(false)
    expect(pc.notes.meta(nota.id)).toMatchObject({ rev: 1 })
    // Quello che si è appena mandato non torna indietro come novità.
    expect(sent.updated).toEqual([])

    const change = await telefono.sync()
    expect(change.updated).toEqual([nota.id])
    expect(telefono.folders.list().map((f) => f.name)).toEqual(['Analisi 1'])
    expect(telefono.notes.get(nota.id)).toMatchObject({ content: '# Limiti\n\nDefinizione', folderId: analisi.id, title: 'Limiti', rev: 1 })
    expect(telefono.engine.hasPending()).toBe(false)
  })

  it('le modifiche vanno avanti e indietro, e le eliminazioni arrivano', async () => {
    const user = await createUser(db, 'b@example.invalid')
    const pc = device(user)
    const telefono = device(user)
    const nota = pc.notes.create('# Uno')
    await pc.sync()
    await telefono.sync()

    telefono.notes.save(nota.id, '# Uno\n\ndal telefono')
    await telefono.sync()
    await pc.sync()
    expect(pc.notes.get(nota.id)).toMatchObject({ content: '# Uno\n\ndal telefono', rev: 2 })

    pc.notes.remove(nota.id)
    await pc.sync()
    const change = await telefono.sync()
    expect(change.removed).toEqual([nota.id])
    expect(telefono.notes.list()).toEqual([])
    // Niente resta in sospeso: la nota non ricompare.
    expect(pc.notes.deleted()).toEqual([])
    await pc.sync()
    expect(pc.notes.list()).toEqual([])
  })

  it('eliminando una cartella le sue note restano, fuori dalle cartelle', async () => {
    const user = await createUser(db, 'c@example.invalid')
    const pc = device(user)
    const telefono = device(user)
    const fisica = pc.folders.create('Fisica 1')!
    const nota = pc.notes.create('# Moto', fisica.id)
    await pc.sync()
    await telefono.sync()
    pc.notes.moveAll(fisica.id, null)
    pc.folders.remove(fisica.id)
    await pc.sync()
    await telefono.sync()
    expect(telefono.folders.list()).toEqual([])
    expect(telefono.notes.meta(nota.id)?.folderId).toBeNull()
  })
})

describe('non si perde testo', () => {
  it('la stessa nota cambiata su due dispositivi: restano tutte e due le versioni', async () => {
    const user = await createUser(db, 'd@example.invalid')
    const pc = device(user)
    const telefono = device(user)
    const nota = pc.notes.create('# Derivate')
    await pc.sync()
    await telefono.sync()

    pc.notes.save(nota.id, '# Derivate\n\nscritto sul pc')
    telefono.notes.save(nota.id, '# Derivate\n\nscritto sul telefono')
    await pc.sync()
    const change = await telefono.sync()

    // Sul telefono la nota ha la versione del pc, e quella del telefono è una nota a parte.
    expect(change.replaced).toHaveLength(1)
    const copy = change.replaced[0]
    expect(copy).toMatchObject({ from: nota.id, conflict: true })
    expect(telefono.notes.get(nota.id)?.content).toBe('# Derivate\n\nscritto sul pc')
    expect(telefono.notes.get(copy.to)).toMatchObject({ content: '# Derivate\n\nscritto sul telefono', conflict: true })
    expect(telefono.engine.hasPending()).toBe(false)

    // E la copia arriva anche sul pc.
    await pc.sync()
    expect(contents(pc)).toEqual(['# Derivate\n\nscritto sul pc', '# Derivate\n\nscritto sul telefono'])
    expect(contents(telefono)).toEqual(contents(pc))
  })

  it('eliminata sul pc ma cambiata sul telefono: la nota resta, con le modifiche', async () => {
    const user = await createUser(db, 'e@example.invalid')
    const pc = device(user)
    const telefono = device(user)
    const nota = pc.notes.create('# Integrali')
    await pc.sync()
    await telefono.sync()

    pc.notes.remove(nota.id)
    await pc.sync()
    telefono.notes.save(nota.id, '# Integrali\n\nappena scritto')
    await telefono.sync()
    expect(telefono.notes.get(nota.id)?.content).toBe('# Integrali\n\nappena scritto')

    await pc.sync()
    expect(pc.notes.get(nota.id)?.content).toBe('# Integrali\n\nappena scritto')
  })

  it('cambiata sul telefono e poi eliminata sul pc che non lo sapeva: torna', async () => {
    const user = await createUser(db, 'f@example.invalid')
    const pc = device(user)
    const telefono = device(user)
    const nota = pc.notes.create('# Serie')
    await pc.sync()
    await telefono.sync()

    telefono.notes.save(nota.id, '# Serie\n\nconvergenza')
    await telefono.sync()
    pc.notes.remove(nota.id)
    const change = await pc.sync()
    expect(change.restored).toEqual([nota.id])
    expect(pc.notes.get(nota.id)?.content).toBe('# Serie\n\nconvergenza')
    expect(pc.notes.deleted()).toEqual([])
  })

  it('senza rete le modifiche aspettano, e partono quando la rete torna', async () => {
    const user = await createUser(db, 'g@example.invalid')
    let online = false
    const offline = () => Promise.reject(new SyncError('offline', 'Nessuna connessione'))
    const pc = device(user, {
      pull: (since) => (online ? callAs(db, user, 'sync_pull', { since }) : offline()),
      push: (changes) => (online ? callAs(db, user, 'sync_push', { changes }) : offline()),
    })
    const nota = pc.notes.create('# Scritto in treno')
    await expect(pc.sync()).rejects.toMatchObject({ kind: 'offline' })
    expect(pc.engine.hasPending()).toBe(true)
    expect(pc.notes.meta(nota.id)?.dirty).toBe(true)

    online = true
    await pc.sync()
    expect(pc.engine.hasPending()).toBe(false)
    const telefono = device(user)
    await telefono.sync()
    expect(contents(telefono)).toEqual(['# Scritto in treno'])
  })

  it('una modifica fatta mentre si manda la nota non si perde', async () => {
    const user = await createUser(db, 'h@example.invalid')
    let pc!: ReturnType<typeof device>
    let nota = ''
    let typed = false
    pc = device(user, {
      push: async (changes) => {
        const result = await callAs<Awaited<ReturnType<SyncBackend['push']>>>(db, user, 'sync_push', { changes })
        // Mentre la richiesta viaggia si continua a scrivere.
        if (!typed) {
          typed = true
          pc.notes.save(nota, '# Appunti\n\nuno\ndue')
        }
        return result
      },
    })
    nota = pc.notes.create('# Appunti\n\nuno').id
    await pc.sync()
    // Il secondo giro ha mandato anche la riga scritta durante il primo.
    expect(pc.notes.meta(nota)).toMatchObject({ rev: 2 })
    expect(pc.notes.meta(nota)?.dirty).toBeUndefined()
    const telefono = device(user)
    await telefono.sync()
    expect(contents(telefono)).toEqual(['# Appunti\n\nuno\ndue'])
  })

  it('una modifica fatta mentre si scaricano le novità non viene sovrascritta', async () => {
    const user = await createUser(db, 'p@example.invalid')
    const telefono = device(user)
    let pc!: ReturnType<typeof device>
    let nota = ''
    let busy = false
    pc = device(user, {
      pull: async (since) => {
        if (busy) {
          busy = false
          // Mentre la richiesta parte: il telefono cambia la nota e qui si continua a scrivere.
          telefono.notes.save(nota, '# Limiti\n\ndal telefono')
          await telefono.sync()
          pc.notes.save(nota, '# Limiti\n\ndal pc')
        }
        return callAs(db, user, 'sync_pull', { since })
      },
    })
    nota = pc.notes.create('# Limiti').id
    await pc.sync()
    await telefono.sync()
    busy = true
    await pc.sync()
    expect(pc.notes.get(nota)?.content).toBe('# Limiti\n\ndal pc')
    expect(pc.notes.meta(nota)?.dirty).toBe(true)
    // Alla prossima sincronizzazione restano tutte e due le versioni.
    await pc.sync()
    expect(contents(pc)).toEqual(['# Limiti\n\ndal pc', '# Limiti\n\ndal telefono'])
  })

  it('una nota creata e subito eliminata non lascia niente', async () => {
    const user = await createUser(db, 'i@example.invalid')
    const pc = device(user)
    const nota = pc.notes.create('# Prova')
    pc.notes.remove(nota.id)
    await pc.sync()
    expect(pc.engine.hasPending()).toBe(false)
    const telefono = device(user)
    await telefono.sync()
    expect(telefono.notes.list()).toEqual([])
  })

  it('un id già usato da un altro account: la nota ne prende uno nuovo', async () => {
    const anna = await createUser(db, 'anna@example.invalid')
    const bruno = await createUser(db, 'bruno@example.invalid')
    const suo = device(bruno)
    const nota = suo.notes.create('# Di Bruno')
    await suo.sync()

    const mio = device(anna)
    // Una nota con lo stesso id (per esempio da un backup di Bruno ripristinato da Anna).
    mio.notes.applyRemote({ id: nota.id, content: '# Di Anna', folderId: null, createdAt: 1, updatedAt: 1, rev: 1 })
    mio.notes.save(nota.id, '# Di Anna')
    const change = await mio.sync()
    expect(change.replaced).toEqual([{ from: nota.id, to: expect.any(String), conflict: false }])
    expect(mio.notes.get(change.replaced[0].to)?.content).toBe('# Di Anna')
    expect(mio.notes.get(nota.id)).toBeNull()
    expect(mio.engine.hasPending()).toBe(false)
    // Quella di Bruno non è cambiata.
    const altro = device(bruno)
    await altro.sync()
    expect(contents(altro)).toEqual(['# Di Bruno'])
  })

  it('se il server ricomincia da capo, si scarica di nuovo tutto', async () => {
    const user = await createUser(db, 'l@example.invalid')
    const pc = device(user)
    pc.notes.create('# Tutto')
    await pc.sync()
    const telefono = device(user)
    telefono.state.update(() => ({ cursor: '999999999999' }))
    await telefono.sync()
    expect(contents(telefono)).toEqual(['# Tutto'])
  })
})

describe('impostazioni e dizionario', () => {
  it('le impostazioni cambiate su un dispositivo arrivano sull\'altro', async () => {
    const user = await createUser(db, 'm@example.invalid')
    const pc = device(user)
    const telefono = device(user)
    pc.settings.theme = 'dark'
    pc.state.settingsChanged(['theme'])
    await pc.sync()
    const change = await telefono.sync()
    expect(change.settings).toBe(true)
    expect(telefono.settings.theme).toBe('dark')
  })

  it('parole aggiunte su due dispositivi: restano tutte', async () => {
    const user = await createUser(db, 'n@example.invalid')
    const pc = device(user)
    const telefono = device(user)
    await pc.sync()
    await telefono.sync()
    pc.words.push('Lagrangiana')
    pc.state.wordsChanged()
    telefono.words.push('Hamiltoniana')
    telefono.state.wordsChanged()
    await pc.sync()
    await telefono.sync()
    await pc.sync()
    expect(pc.words.sort()).toEqual(['Hamiltoniana', 'Lagrangiana'])
    expect(telefono.words.sort()).toEqual(['Hamiltoniana', 'Lagrangiana'])
  })

  it('al primo accesso su un altro dispositivo valgono le impostazioni dell\'account', async () => {
    const user = await createUser(db, 'o@example.invalid')
    const pc = device(user)
    pc.settings.theme = 'dark'
    pc.state.update(() => ({ settingsDirty: ['theme', 'fontSize'], adopt: true }))
    await pc.sync()

    const nuovo = device(user)
    nuovo.settings.fontSize = 20
    nuovo.words.push('Glifo')
    nuovo.state.update(() => ({ settingsDirty: ['theme', 'fontSize'], wordsDirty: true, adopt: true }))
    await nuovo.sync()
    expect(nuovo.settings).toMatchObject({ theme: 'dark', fontSize: 16 })
    // Le parole di questo browser invece si aggiungono a quelle dell'account.
    await pc.sync()
    expect(pc.words).toEqual(['Glifo'])
  })
})
