// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { accountSpace, knowsAccount } from '../src/account/space'
import { BoardStore, MemoryBoards } from '../src/board/store'
import { newStrokeId, type Stroke } from '../src/board/strokes'
import {
  buildPackage,
  importPackage,
  isRelocationPackage,
  moveDayLabel,
  NEW_ORIGIN,
  OLD_ORIGIN,
  openedForRelocation,
  receiveFromOldSite,
  RelocationError,
  relocationMessage,
  relocationPhase,
  sendToNewSite,
  type RelocationPackage,
} from '../src/relocation'
import { loadPersonalWords, savePersonalWords } from '../src/store/dictionary'
import { FoldersStore } from '../src/store/folders'
import { NotesStore } from '../src/store/notes'
import { loadSettings, saveSettings } from '../src/store/settings'

const WELCOME = '# Benvenuto in Glifo\n\nScrivi qui.'
const ID_A = '0b6f2a52-3c1d-4e0f-9a7b-1c2d3e4f5a6b'
const ID_B = '1c7a3b63-4d2e-4f1a-8b8c-2d3e4f5a6b7c'
const ID_ACCOUNT = '2d8b4c74-5e3f-4a2b-9c9d-3e4f5a6b7c8d'
const USER = '7f3e2d1c-0b9a-4876-9543-210fedcba987'

const opened: BoardStore[] = []
function boardsFor(): BoardStore {
  const boards = new BoardStore(async () => new MemoryBoards())
  opened.push(boards)
  return boards
}

const stroke = (id: string): Stroke => ({ id, t: 1000, color: 'ink', size: 3, pen: true, points: [10, 20, 0.5, 30, 40, 0.5] })

beforeEach(() => localStorage.clear())
afterEach(() => {
  for (const b of opened.splice(0)) b.close()
  vi.useRealTimers()
})

/**
 * Il browser con il vecchio Glifo: la nota di benvenuto mai toccata, due appunti fuori dall'account
 * (uno in una cartella), un account con una nota, le lavagne, il dizionario, le impostazioni con la
 * chiave dell'AI e l'accesso salvato.
 */
async function oldBrowser(): Promise<BoardStore> {
  const guest = new NotesStore()
  guest.adopt({ id: '3e9c5d85-6f4a-4b3c-8dae-4f5a6b7c8d9e', content: WELCOME, folderId: null, createdAt: 500, updatedAt: 500 })
  const folder = new FoldersStore().create('Analisi')!
  guest.adopt({ id: ID_A, content: '# Limiti', folderId: folder.id, createdAt: 1000, updatedAt: 3000 })
  guest.adopt({ id: ID_B, content: '# Derivate', folderId: null, createdAt: 2000, updatedAt: 4000 })
  guest.activeId = ID_B
  const account = accountSpace(USER)
  account.notes.applyRemote({ id: ID_ACCOUNT, content: '# Integrali', folderId: null, createdAt: 1500, updatedAt: 3500, rev: 3 })
  account.state.update(() => ({ wordsDirty: true }))
  localStorage.setItem('glifo.account.v1', JSON.stringify({ userId: USER, email: 'anna@example.com' }))
  localStorage.setItem('glifo.auth.v1', '{"access_token":"segreto-di-accesso"}')
  localStorage.setItem('glifo.tutorial.v1', 'visto')
  savePersonalWords(['Weierstrass'])
  saveSettings({ theme: 'dark', fontSize: 18, apiKey: 'chiave-segreta', aiKeys: { gemini: 'altra-chiave-segreta' } })
  const boards = boardsFor()
  await boards.change(ID_A, { put: [stroke('a1'), stroke('a2')] })
  await boards.change(ID_ACCOUNT, { put: [stroke('c1')] })
  return boards
}

async function packageFromOldBrowser(): Promise<RelocationPackage> {
  const boards = await oldBrowser()
  const pkg = await buildPackage({ boards, welcome: WELCOME, tutorialSeen: true })
  // Il pacco passa da una finestra all'altra (postMessage), come una copia.
  return JSON.parse(JSON.stringify(pkg)) as RelocationPackage
}

describe('trasloco su glifo.page: le date', () => {
  const dates = { notice: '2026-10-12', move: '2026-10-18' }

  it('solo il vecchio indirizzo ha l\'avviso e poi la pagina finale, nei giorni giusti', () => {
    expect(relocationPhase(OLD_ORIGIN, new Date(2026, 9, 11, 23, 59), dates)).toBe('none')
    expect(relocationPhase(OLD_ORIGIN, new Date(2026, 9, 12, 0, 0), dates)).toBe('notice')
    expect(relocationPhase(OLD_ORIGIN, new Date(2026, 9, 17, 23, 59), dates)).toBe('notice')
    expect(relocationPhase(OLD_ORIGIN, new Date(2026, 9, 18, 0, 0), dates)).toBe('moved')
    expect(relocationPhase(OLD_ORIGIN, new Date(2027, 1, 28), dates)).toBe('moved')
    expect(relocationPhase(NEW_ORIGIN, new Date(2026, 9, 20), dates)).toBe('none')
    expect(relocationPhase('https://glifo-prova.pages.dev', new Date(2026, 9, 20), dates)).toBe('none')
  })

  it('senza il giorno dell\'avviso non succede niente, neanche dopo il trasloco', () => {
    expect(relocationPhase(OLD_ORIGIN, new Date(2026, 9, 20), { notice: null, move: '2026-10-18' })).toBe('none')
  })

  it('il giorno del trasloco si scrive in italiano', () => {
    expect(moveDayLabel(dates)).toBe('domenica 18 ottobre')
  })
})

describe('trasloco su glifo.page: il pacco degli appunti', () => {
  it('porta appunti, cartelle, account, lavagne, dizionario e impostazioni, mai l\'accesso né le chiavi dell\'AI', async () => {
    const pkg = await packageFromOldBrowser()
    expect(isRelocationPackage(pkg)).toBe(true)
    expect(pkg.notes.map((n) => n.id).sort()).toEqual([ID_A, ID_B])
    expect(pkg.folders.map((f) => f.name)).toEqual(['Analisi'])
    expect(Object.keys(pkg.accounts).every((k) => k.startsWith(`glifo.u.${USER}.`))).toBe(true)
    expect(pkg.accounts[`glifo.u.${USER}.note.v1.${ID_ACCOUNT}`]).toBe('# Integrali')
    expect(pkg.boards.map((b) => b.note).sort()).toEqual([ID_A, ID_ACCOUNT].sort())
    expect(pkg.dictionary).toEqual(['Weierstrass'])
    expect(pkg.settings).toMatchObject({ theme: 'dark', fontSize: 18 })
    const text = JSON.stringify(pkg)
    expect(text).not.toContain('segreto-di-accesso')
    expect(text).not.toContain('chiave-segreta')
    expect(text).not.toContain('anna@example.com')
  })

  it('sul sito nuovo arriva tutto: le note con i loro id, l\'account pronto per quando si entra, le lavagne', async () => {
    const pkg = await packageFromOldBrowser()
    localStorage.clear()
    // Il sito nuovo, appena aperto: la sua nota di benvenuto.
    const notes = new NotesStore()
    notes.create(WELCOME, null, { local: true })
    const boards = boardsFor()
    const { result, dictionary, tutorialSeen } = await importPackage(pkg, { notes, folders: new FoldersStore(), boards, newStrokeId, welcome: WELCOME })
    expect(result).toEqual({ added: 2, already: 0, accountNotes: 1, boards: 2 })
    // Chi porta i suoi appunti non ritrova la nota di benvenuto, e si apre l'appunto che era aperto.
    expect(notes.list().map((n) => n.id).sort()).toEqual([ID_A, ID_B])
    expect(notes.activeId).toBe(ID_B)
    expect(notes.get(ID_A)?.content).toBe('# Limiti')
    expect(new FoldersStore().list().find((f) => f.id === notes.get(ID_A)?.folderId)?.name).toBe('Analisi')
    expect(knowsAccount(USER)).toBe(true)
    expect(accountSpace(USER).notes.get(ID_ACCOUNT)).toMatchObject({ content: '# Integrali', rev: 3 })
    expect(accountSpace(USER).state.read().wordsDirty).toBe(true)
    // Sul sito nuovo si entra di nuovo: l'accesso non viaggia.
    expect(localStorage.getItem('glifo.auth.v1')).toBeNull()
    expect(localStorage.getItem('glifo.account.v1')).toBeNull()
    expect((await boards.load(ID_A)).strokes).toHaveLength(2)
    expect((await boards.load(ID_ACCOUNT)).strokes).toHaveLength(1)
    expect(loadSettings()).toMatchObject({ theme: 'dark', fontSize: 18, apiKey: '' })
    expect(dictionary).toEqual(['Weierstrass'])
    expect(tutorialSeen).toBe(true)
    expect(relocationMessage(result)).toBe(
      'Dal vecchio Glifo sono arrivati 3 appunti e 2 lavagne. Da ora Glifo è qui, su glifo.page. Gli appunti dell\'account li vedi entrando con l\'account.',
    )
  })

  it('portando gli appunti due volte non raddoppia niente', async () => {
    const pkg = await packageFromOldBrowser()
    localStorage.clear()
    const notes = new NotesStore()
    const boards = boardsFor()
    await importPackage(pkg, { notes, folders: new FoldersStore(), boards, newStrokeId })
    const { result } = await importPackage(pkg, { notes, folders: new FoldersStore(), boards, newStrokeId })
    expect(result).toEqual({ added: 0, already: 2, accountNotes: 0, boards: 0 })
    expect(notes.list()).toHaveLength(2)
    expect((await boards.load(ID_A)).strokes).toHaveLength(2)
    expect(relocationMessage(result)).toBe('Gli appunti del vecchio Glifo c\'erano già tutti. Da ora Glifo è qui, su glifo.page.')
  })

  it('un account già entrato sul sito nuovo resta com\'è, e le impostazioni cambiate lì pure', async () => {
    const pkg = await packageFromOldBrowser()
    localStorage.clear()
    accountSpace(USER).notes.applyRemote({ id: ID_ACCOUNT, content: '# Integrali, versione nuova', folderId: null, createdAt: 1500, updatedAt: 9000, rev: 7 })
    saveSettings({ theme: 'light' })
    savePersonalWords(['Cauchy'])
    const boards = boardsFor()
    const { result, dictionary } = await importPackage(pkg, { notes: new NotesStore(), folders: new FoldersStore(), boards, newStrokeId })
    expect(result.accountNotes).toBe(0)
    expect(accountSpace(USER).notes.get(ID_ACCOUNT)).toMatchObject({ content: '# Integrali, versione nuova', rev: 7 })
    // La lavagna della nota dell'account arriva lo stesso: la nota c'è.
    expect((await boards.load(ID_ACCOUNT)).strokes).toHaveLength(1)
    expect(loadSettings().theme).toBe('light')
    // Il dizionario si unisce (lo fa main.ts con setPersonalWords).
    expect(dictionary).toEqual(['Weierstrass'])
    expect(loadPersonalWords()).toEqual(['Cauchy'])
  })

  it('se non arriva nessun appunto, la nota di benvenuto del sito nuovo resta', async () => {
    localStorage.clear()
    const notes = new NotesStore()
    const welcome = notes.create(WELCOME, null, { local: true })
    notes.activeId = welcome.id
    const pkg = { app: 'glifo-trasloco', version: 1, notes: [], folders: [], dictionary: [], boards: [], accounts: {}, settings: {}, tutorialSeen: false } as RelocationPackage
    const { result } = await importPackage(pkg, { notes, folders: new FoldersStore(), boards: boardsFor(), newStrokeId, welcome: WELCOME })
    expect(result).toEqual({ added: 0, already: 0, accountNotes: 0, boards: 0 })
    expect(notes.list().map((n) => n.id)).toEqual([welcome.id])
    expect(notes.activeId).toBe(welcome.id)
  })

  it('un pacco che non è di Glifo non si apre', () => {
    expect(isRelocationPackage(null)).toBe(false)
    expect(isRelocationPackage({ app: 'glifo', version: 1, notes: [] })).toBe(false)
    expect(isRelocationPackage({ app: 'glifo-trasloco', version: 2, notes: [] })).toBe(false)
    expect(isRelocationPackage({ app: 'glifo-trasloco', version: 1, notes: [] })).toBe(true)
  })

  it('il messaggio dice cosa è arrivato', () => {
    expect(relocationMessage({ added: 0, already: 0, accountNotes: 0, boards: 0 })).toBe(
      'Nel vecchio Glifo non c\'erano appunti da portare. Da ora Glifo è qui, su glifo.page.',
    )
    expect(relocationMessage({ added: 1, already: 0, accountNotes: 0, boards: 0 })).toBe('Dal vecchio Glifo è arrivato 1 appunto. Da ora Glifo è qui, su glifo.page.')
    expect(relocationMessage({ added: 0, already: 3, accountNotes: 0, boards: 1 })).toBe(
      'Dal vecchio Glifo è arrivata 1 lavagna (3 c\'erano già). Da ora Glifo è qui, su glifo.page.',
    )
    expect(relocationMessage({ added: 0, already: 0, accountNotes: 0, boards: 2 })).toBe('Dal vecchio Glifo sono arrivate 2 lavagne. Da ora Glifo è qui, su glifo.page.')
    expect(relocationMessage({ added: 1, already: 1, accountNotes: 0, boards: 1 })).toBe(
      'Dal vecchio Glifo sono arrivati 1 appunto e 1 lavagna (uno c\'era già). Da ora Glifo è qui, su glifo.page.',
    )
  })
})

/** Un messaggio che arriva da un'altra finestra (in jsdom `source` va messo così). */
function message(data: unknown, origin: string, source: unknown): MessageEvent {
  const event = new MessageEvent('message', { data, origin })
  Object.defineProperty(event, 'source', { value: source })
  return event
}

const RESULT = { added: 2, already: 0, accountNotes: 1, boards: 2 }

describe('trasloco su glifo.page: le due finestre', () => {
  it('il vecchio sito apre glifo.page e gli passa gli appunti solo quando risponde da glifo.page', async () => {
    const target = { postMessage: vi.fn() }
    const open = vi.fn(() => target as unknown as Window)
    const pkg = { app: 'glifo-trasloco', version: 1, notes: [] } as unknown as RelocationPackage
    const sent = sendToNewSite(async () => pkg, { open })
    expect(open).toHaveBeenCalledWith(`${NEW_ORIGIN}/#trasloco`)
    // Un'altra pagina, o un altro indirizzo, non riceve niente.
    window.dispatchEvent(message({ glifo: 'pronto' }, 'https://altro.example', target))
    window.dispatchEvent(message({ glifo: 'pronto' }, NEW_ORIGIN, {}))
    await Promise.resolve()
    expect(target.postMessage).not.toHaveBeenCalled()
    window.dispatchEvent(message({ glifo: 'pronto' }, NEW_ORIGIN, target))
    await vi.waitFor(() => expect(target.postMessage).toHaveBeenCalledWith({ glifo: 'appunti', pacco: pkg }, NEW_ORIGIN))
    window.dispatchEvent(message({ glifo: 'fatto', result: RESULT }, NEW_ORIGIN, target))
    await expect(sent).resolves.toEqual(RESULT)
  })

  it('se il browser blocca la finestra, o glifo.page non risponde, lo dice', async () => {
    await expect(sendToNewSite(async () => ({}) as RelocationPackage, { open: () => null })).rejects.toMatchObject({ reason: 'popup' })
    vi.useFakeTimers()
    const target = { postMessage: vi.fn() }
    const sent = sendToNewSite(async () => ({}) as RelocationPackage, { open: () => target as unknown as Window, timeoutMs: 1000 })
    const check = expect(sent).rejects.toBeInstanceOf(RelocationError)
    vi.advanceTimersByTime(1000)
    await check
    await expect(sent).rejects.toMatchObject({ reason: 'timeout' })
  })

  /** La finestra di glifo.page aperta dal vecchio sito. */
  function newSiteWindow(opener: unknown, hash = '#trasloco', origin = NEW_ORIGIN) {
    return Object.assign(new EventTarget(), {
      opener,
      location: { hash, origin, pathname: '/', search: '' },
      history: { replaceState: vi.fn() },
    }) as unknown as Window & { history: { replaceState: ReturnType<typeof vi.fn> } }
  }

  it('si riconosce la pagina aperta per il trasloco', () => {
    expect(openedForRelocation(newSiteWindow({}))).toBe(true)
    expect(openedForRelocation(newSiteWindow(null))).toBe(false)
    expect(openedForRelocation(newSiteWindow({}, ''))).toBe(false)
    expect(openedForRelocation(newSiteWindow({}, '#trasloco', 'https://glifo-prova.pages.dev'))).toBe(false)
  })

  it('glifo.page dice che è pronto, accetta gli appunti solo dal vecchio sito e risponde com\'è andata', async () => {
    const opener = { postMessage: vi.fn() }
    const win = newSiteWindow(opener)
    const receive = vi.fn(async () => RESULT)
    const done = vi.fn()
    receiveFromOldSite(receive, done, win)
    expect(win.history.replaceState).toHaveBeenCalledWith(null, '', '/')
    expect(opener.postMessage).toHaveBeenCalledWith({ glifo: 'pronto' }, OLD_ORIGIN)
    const pkg = { app: 'glifo-trasloco', version: 1, notes: [] }
    win.dispatchEvent(message({ glifo: 'appunti', pacco: pkg }, 'https://altro.example', opener))
    win.dispatchEvent(message({ glifo: 'appunti', pacco: pkg }, OLD_ORIGIN, {}))
    expect(receive).not.toHaveBeenCalled()
    win.dispatchEvent(message({ glifo: 'appunti', pacco: pkg }, OLD_ORIGIN, opener))
    await vi.waitFor(() => expect(done).toHaveBeenCalledWith(RESULT))
    expect(receive).toHaveBeenCalledWith(pkg)
    expect(opener.postMessage).toHaveBeenLastCalledWith({ glifo: 'fatto', result: RESULT }, OLD_ORIGIN)
  })

  it('un pacco rovinato non si apre: il vecchio sito lo sa', async () => {
    const opener = { postMessage: vi.fn() }
    const win = newSiteWindow(opener)
    const receive = vi.fn(async () => RESULT)
    const done = vi.fn()
    receiveFromOldSite(receive, done, win)
    win.dispatchEvent(message({ glifo: 'appunti', pacco: { app: 'altro' } }, OLD_ORIGIN, opener))
    await vi.waitFor(() => expect(done).toHaveBeenCalledWith(null))
    expect(receive).not.toHaveBeenCalled()
    expect(opener.postMessage).toHaveBeenLastCalledWith({ glifo: 'errore' }, OLD_ORIGIN)
  })
})
