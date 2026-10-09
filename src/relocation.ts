import { isWelcome, knowsAccount } from './account/space'
import type { BackupBoard } from './board/store'
import { loadPersonalWords } from './store/dictionary'
import { FoldersStore } from './store/folders'
import { noteIdsInBrowser, NotesStore } from './store/notes'
import { restoreBackup, type RestoreBoards } from './store/restore'
import { accountSettings, DEFAULT_SETTINGS, loadSettings, saveSettings, validAccountSettings } from './store/settings'
import { readItem, storageKeys, writeItem } from './store/storage'

/**
 * Il trasloco di Glifo (ROADMAP.md, «Trasloco»): dal 9 ottobre 2026 il sito ha un dominio tutto suo,
 * glifo.page, su Cloudflare Pages. Il browser tiene separati i dati di ogni indirizzo, quindi gli
 * appunti del vecchio indirizzo (GitHub Pages) vanno portati: con «Porta i miei appunti nel nuovo
 * Glifo» (il vecchio sito apre il nuovo e gli passa tutto) o con un backup.
 */

/** Il nuovo indirizzo di Glifo. */
export const NEW_ORIGIN = 'https://glifo.page'
/** Il vecchio: GitHub Pages, https://diodialtro.github.io/Glifo/. */
export const OLD_ORIGIN = 'https://diodialtro.github.io'

/**
 * Il giorno dell'avviso: da lì il vecchio sito mostra la fascia in cima. `null`: spento, finché glifo.page
 * non funziona (account compreso). Per le prove si cambia nella build con VITE_TRASLOCO_AVVISO.
 */
const NOTICE_DAY: string | null = null
/** Il giorno del trasloco: da lì il vecchio sito mostra solo la pagina a tutto schermo. Per le prove: VITE_TRASLOCO. */
const MOVE_DAY = '2026-10-18'

export interface RelocationDates {
  notice: string | null
  move: string
}

export const RELOCATION_DATES: RelocationDates = {
  notice: (import.meta.env.VITE_TRASLOCO_AVVISO as string | undefined) || NOTICE_DAY,
  move: (import.meta.env.VITE_TRASLOCO as string | undefined) || MOVE_DAY,
}

/** `none`: niente da mostrare; `notice`: la fascia con l'avviso; `moved`: la pagina a tutto schermo. */
export type RelocationPhase = 'none' | 'notice' | 'moved'

/** A che punto è il trasloco su questo sito: solo il vecchio indirizzo ha l'avviso e la pagina finale. */
export function relocationPhase(origin: string, now: Date, dates: RelocationDates = RELOCATION_DATES): RelocationPhase {
  if (origin !== OLD_ORIGIN || !dates.notice) return 'none'
  if (now >= startOf(dates.move)) return 'moved'
  return now >= startOf(dates.notice) ? 'notice' : 'none'
}

/** La mezzanotte (nell'ora di chi usa Glifo) del giorno `aaaa-mm-gg`. */
function startOf(day: string): Date {
  const [y, m, d] = day.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Il giorno del trasloco da scrivere: «domenica 18 ottobre». */
export function moveDayLabel(dates: RelocationDates = RELOCATION_DATES): string {
  return startOf(dates.move).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })
}

/** Quello che il vecchio Glifo passa al nuovo. */
export interface RelocationPackage {
  app: 'glifo-trasloco'
  version: 1
  /** Gli appunti fuori dall'account, come in un backup (senza la nota di benvenuto mai toccata). */
  notes: { id: string; content: string; folderId?: string | null; createdAt: number; updatedAt: number }[]
  folders: { id: string; name: string }[]
  dictionary: string[]
  /** Le lavagne di tutte le note del browser, anche di quelle dell'account: non vanno mai sul server. */
  boards: BackupBoard[]
  /**
   * Gli account di questo browser, chiave per chiave (`glifo.u.<id>.…`: note, cartelle e
   * sincronizzazione). Mai l'accesso (`glifo.auth.v1`): sul sito nuovo si entra di nuovo.
   */
  accounts: Record<string, string>
  /** Le impostazioni che vanno anche con l'account (tema, carattere, controllo ortografico…): mai le chiavi dell'AI. */
  settings: Record<string, unknown>
  /** Il tutorial già visto: sul sito nuovo non riparte. */
  tutorialSeen: boolean
  /** L'appunto aperto (fuori dall'account): sul sito nuovo si apre quello. */
  active?: string | null
}

const ACCOUNT_PREFIX = 'glifo.u.'

/** Sul vecchio sito: tutto quello che c'è da portare. `welcome`: il testo della nota di benvenuto. */
export async function buildPackage(deps: {
  boards: { exportBoards(notes: string[]): Promise<BackupBoard[]> }
  welcome: string
  tutorialSeen: boolean
}): Promise<RelocationPackage> {
  const guest = new NotesStore()
  const notes = guest
    .exportAll()
    .filter((n) => !isWelcome(n, deps.welcome))
    .map(({ id, content, folderId, createdAt, updatedAt }) => ({ id, content, folderId: folderId ?? null, createdAt, updatedAt }))
  const active = guest.activeId
  const accounts: Record<string, string> = {}
  for (const key of storageKeys(ACCOUNT_PREFIX)) {
    const value = readItem(key)
    if (value !== null) accounts[key] = value
  }
  const boards = await deps.boards.exportBoards([...noteIdsInBrowser()]).catch(() => [])
  return {
    app: 'glifo-trasloco',
    version: 1,
    notes,
    folders: new FoldersStore().list().map(({ id, name }) => ({ id, name })),
    dictionary: loadPersonalWords(),
    boards,
    accounts,
    settings: accountSettings(loadSettings()),
    tutorialSeen: deps.tutorialSeen,
    active: active && notes.some((n) => n.id === active) ? active : null,
  }
}

export function isRelocationPackage(data: unknown): data is RelocationPackage {
  const p = data as Partial<RelocationPackage> | null
  return typeof p === 'object' && p !== null && p.app === 'glifo-trasloco' && p.version === 1 && Array.isArray(p.notes)
}

/** Com'è andato il trasloco degli appunti. */
export interface RelocationResult {
  /** Note fuori dall'account: aggiunte, e quelle che c'erano già. */
  added: number
  already: number
  /** Note degli account portate: si vedono entrando con l'account. */
  accountNotes: number
  boards: number
}

/**
 * Sul sito nuovo: mette qui gli appunti del vecchio. Gli account che questo browser non conosce
 * arrivano chiave per chiave, così entrando con l'account ci sono già note e lavagne, e la
 * sincronizzazione riparte da dove era; gli appunti fuori dall'account vanno con quelli di qui come
 * un backup, senza doppioni (src/store/restore.ts); le lavagne vanno sulle loro note, se lì non c'è
 * già niente di scritto. Impostazioni e tutorial solo se qui non ci sono ancora; se sono arrivati
 * appunti, si apre quello che era aperto sul vecchio sito e la nota di benvenuto mai toccata se ne va.
 * Restituisce anche le parole del dizionario, da aggiungere a quelle di qui.
 */
export async function importPackage(
  pkg: RelocationPackage,
  deps: { notes: NotesStore; folders: FoldersStore; boards: RestoreBoards; newStrokeId: () => string; welcome?: string },
): Promise<{ result: RelocationResult; dictionary: string[]; tutorialSeen: boolean }> {
  const byAccount = new Map<string, [string, string][]>()
  for (const [key, value] of Object.entries(typeof pkg.accounts === 'object' && pkg.accounts ? pkg.accounts : {})) {
    const m = /^glifo\.u\.([^.]+)\./.exec(key)
    if (!m || typeof value !== 'string') continue
    byAccount.set(m[1], [...(byAccount.get(m[1]) ?? []), [key, value]])
  }
  let accountNotes = 0
  for (const [userId, entries] of byAccount) {
    if (knowsAccount(userId)) continue
    for (const [key, value] of entries) {
      if (writeItem(key, value) && /^glifo\.u\.[^.]+\.note\.v1\./.test(key)) accountNotes++
    }
  }
  const boards = Array.isArray(pkg.boards) ? pkg.boards : []
  const restored = await restoreBackup({ notes: pkg.notes, folders: pkg.folders, boards }, deps)
  const guest = new Set(pkg.notes.map((n) => n.id))
  if (restored.added) {
    // Chi porta i suoi appunti Glifo lo conosce già: la nota di benvenuto del sito nuovo, mai toccata, se ne va.
    for (const meta of deps.notes.list()) {
      const note = deps.notes.get(meta.id)
      if (deps.welcome && note && !guest.has(note.id) && isWelcome(note, deps.welcome)) deps.notes.remove(note.id)
    }
    // Si apre l'appunto che era aperto sul vecchio sito, altrimenti il più recente di quelli arrivati.
    const latest = [...pkg.notes].sort((a, b) => b.updatedAt - a.updatedAt).find((n) => deps.notes.get(n.id))
    const open = pkg.active && deps.notes.get(pkg.active) ? pkg.active : latest?.id
    if (open) deps.notes.activeId = open
  }
  let drawn = restored.boards
  const here = noteIdsInBrowser()
  for (const b of boards) {
    if (typeof b?.note !== 'string' || guest.has(b.note) || !here.has(b.note)) continue
    try {
      if (!(await deps.boards.drawn([b.note])) && (await deps.boards.importBoard(b.note, b, deps.newStrokeId))) drawn++
    } catch {
      // Senza lavagne (IndexedDB non disponibile) il resto arriva lo stesso.
    }
  }
  // Le impostazioni del vecchio sito solo se qui sono ancora quelle di partenza.
  const untouched = JSON.stringify(accountSettings(loadSettings())) === JSON.stringify(accountSettings(DEFAULT_SETTINGS))
  if (untouched && typeof pkg.settings === 'object' && pkg.settings) saveSettings(validAccountSettings(pkg.settings))
  return {
    result: { added: restored.added, already: restored.already, accountNotes, boards: drawn },
    dictionary: Array.isArray(pkg.dictionary) ? pkg.dictionary.filter((w): w is string => typeof w === 'string') : [],
    tutorialSeen: pkg.tutorialSeen === true,
  }
}

/** Il messaggio sul sito nuovo, dopo il trasloco degli appunti. */
export function relocationMessage(r: RelocationResult): string {
  const here = ' Da ora Glifo è qui, su glifo.page.'
  const notes = r.added + r.accountNotes
  if (!notes && !r.boards) {
    return (r.already ? 'Gli appunti del vecchio Glifo c\'erano già tutti.' : 'Nel vecchio Glifo non c\'erano appunti da portare.') + here
  }
  const parts = [
    ...(notes ? [notes === 1 ? '1 appunto' : `${notes} appunti`] : []),
    ...(r.boards ? [r.boards === 1 ? '1 lavagna' : `${r.boards} lavagne`] : []),
  ]
  // «è arrivato 1 appunto», «è arrivata 1 lavagna», «sono arrivate 2 lavagne», «sono arrivati 3 appunti e 1 lavagna».
  const verb = notes + r.boards === 1 ? (notes ? 'è arrivato' : 'è arrivata') : notes ? 'sono arrivati' : 'sono arrivate'
  let text = `Dal vecchio Glifo ${verb} ${parts.join(' e ')}`
  if (r.already) text += r.already === 1 ? ' (uno c\'era già)' : ` (${r.already} c'erano già)`
  text += `.${here}`
  if (r.accountNotes) text += ' Gli appunti dell\'account li vedi entrando con l\'account.'
  return text
}

/** Perché il trasloco non è riuscito: finestra bloccata, il sito nuovo non risponde, un errore. */
export class RelocationError extends Error {
  constructor(readonly reason: 'popup' | 'timeout' | 'failed') {
    super(reason)
  }
}

/** La pagina del sito nuovo che riceve gli appunti. */
export const RECEIVE_URL = `${NEW_ORIGIN}/#trasloco`

/**
 * Sul vecchio sito: apre glifo.page in un'altra finestra e, quando è pronto, gli passa gli appunti
 * (`build`). Le due finestre si parlano con postMessage, controllando sempre l'indirizzo dell'altra.
 */
export function sendToNewSite(
  build: () => Promise<RelocationPackage>,
  opts: { open?: (url: string) => Window | null; timeoutMs?: number } = {},
): Promise<RelocationResult> {
  const target = (opts.open ?? ((url) => window.open(url, '_blank')))(RECEIVE_URL)
  if (!target) return Promise.reject(new RelocationError('popup'))
  const pkg = build()
  return new Promise((resolve, reject) => {
    const finish = (error: RelocationError | null, result?: RelocationResult) => {
      window.clearTimeout(timer)
      window.removeEventListener('message', onMessage)
      if (error) reject(error)
      else resolve(result!)
    }
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== NEW_ORIGIN || e.source !== target) return
      const data = e.data as { glifo?: unknown; result?: unknown } | null
      if (data?.glifo === 'pronto') {
        pkg.then(
          (p) => target.postMessage({ glifo: 'appunti', pacco: p }, NEW_ORIGIN),
          () => finish(new RelocationError('failed')),
        )
      } else if (data?.glifo === 'fatto' && typeof data.result === 'object' && data.result) {
        finish(null, data.result as RelocationResult)
      } else if (data?.glifo === 'errore') {
        finish(new RelocationError('failed'))
      }
    }
    // Se glifo.page si apre fuori da questa finestra (l'app installata sul telefono lo apre nel browser),
    // non risponde: dopo un minuto si dice di usare il backup.
    const timer = window.setTimeout(() => finish(new RelocationError('timeout')), opts.timeoutMs ?? 60_000)
    window.addEventListener('message', onMessage)
  })
}

/** Il sito nuovo è stato aperto dal vecchio per ricevere gli appunti? */
export function openedForRelocation(win: Window = window): boolean {
  return win.location.hash === '#trasloco' && win.location.origin === NEW_ORIGIN && !!win.opener
}

/**
 * Sul sito nuovo, aperto dal vecchio: gli dice che è pronto, riceve gli appunti, li mette qui con
 * `receive` e gli risponde com'è andata. Poi `done`, con il risultato o null se qualcosa è andato storto.
 */
export function receiveFromOldSite(
  receive: (pkg: RelocationPackage) => Promise<RelocationResult>,
  done: (result: RelocationResult | null) => void,
  win: Window = window,
): void {
  const opener = win.opener as Window | null
  win.history.replaceState(null, '', win.location.pathname + win.location.search)
  if (!opener) return
  const onMessage = async (e: MessageEvent) => {
    if (e.origin !== OLD_ORIGIN || e.source !== opener) return
    const data = e.data as { glifo?: unknown; pacco?: unknown } | null
    if (data?.glifo !== 'appunti') return
    win.removeEventListener('message', onMessage)
    if (!isRelocationPackage(data.pacco)) {
      opener.postMessage({ glifo: 'errore' }, OLD_ORIGIN)
      done(null)
      return
    }
    try {
      const result = await receive(data.pacco)
      opener.postMessage({ glifo: 'fatto', result }, OLD_ORIGIN)
      done(result)
    } catch {
      opener.postMessage({ glifo: 'errore' }, OLD_ORIGIN)
      done(null)
    }
  }
  win.addEventListener('message', onMessage)
  opener.postMessage({ glifo: 'pronto' }, OLD_ORIGIN)
}
