import { HIGHLIGHT_COLORS, INK_COLORS, roundPoints, type HighlightColor, type InkColor, type Stroke } from './strokes'
import { PEN_SIZE } from './ink'

/**
 * Le lavagne salvate in questo browser, una per nota: non vanno nella nota né nell'account.
 * Stanno in IndexedDB (i disegni pesano più del testo, e localStorage è già delle note), un tratto
 * per record: ogni modifica aggiunge o toglie tratti, quindi due schede aperte sulla stessa nota
 * non si cancellano il lavoro a vicenda. Le altre schede lo sanno da un BroadcastChannel.
 */

/** Che parte della lavagna si vede: il punto in alto a sinistra e l'ingrandimento. */
export interface BoardView {
  x: number
  y: number
  zoom: number
}

export interface BoardData {
  strokes: Stroke[]
  view: BoardView | null
}

/** Una modifica alla lavagna di una nota: i tratti da aggiungere (o rimettere) e quelli da togliere. */
export interface BoardChange {
  put?: Stroke[]
  remove?: string[]
}

/** Dove stanno davvero le lavagne: IndexedDB o, se il browser non lo permette, la memoria della pagina. */
export interface BoardBackend {
  readonly persistent: boolean
  load(note: string): Promise<BoardData>
  change(note: string, change: BoardChange): Promise<void>
  saveView(note: string, view: BoardView): Promise<void>
  /** Toglie le lavagne di queste note (per esempio eliminate). */
  remove(notes: string[]): Promise<void>
  /** Porta (o copia) la lavagna di una nota su un'altra, che prende il suo posto. */
  transfer(from: string, to: string, keep: boolean): Promise<void>
  /** Le note che hanno una lavagna (tratti o una vista salvata). */
  notes(): Promise<string[]>
  /** Quanti tratti ha la lavagna di una nota. */
  count(note: string): Promise<number>
}

/** Un tratto com'è salvato: con la nota, e i punti in un Float32Array (metà spazio). */
interface StrokeRecord {
  note: string
  id: string
  t: number
  color: string
  size: number
  pen: boolean
  points: Float32Array | number[]
  /** Solo per gli evidenziatori. */
  highlight?: boolean
  /** Solo per le figure precise. */
  shape?: boolean
}

export function toRecord(note: string, s: Stroke): StrokeRecord {
  return { note, id: s.id, t: s.t, color: s.color, size: s.size, pen: s.pen, points: Float32Array.from(s.points), ...(s.highlight ? { highlight: true } : {}), ...(s.shape ? { shape: true } : {}) }
}

/** Un tratto letto da IndexedDB o da un backup: quello che non torna si sistema o si scarta. */
export function fromRecord(r: unknown): Stroke | null {
  if (typeof r !== 'object' || r === null) return null
  const { id, t, color, size, pen, points, highlight, shape } = r as Partial<StrokeRecord>
  if (typeof id !== 'string' || !id) return null
  const values = points instanceof Float32Array || Array.isArray(points) ? Array.from(points as ArrayLike<number>) : []
  const usable = values.slice(0, values.length - (values.length % 3))
  if (!usable.length || !usable.every((v) => Number.isFinite(v))) return null
  // I punti si salvano già arrotondati: si tolgono le cifre che aggiunge il Float32Array (1,23 → 1,2300000190734863).
  return {
    id,
    t: typeof t === 'number' && Number.isFinite(t) ? t : 0,
    color:
      highlight === true
        ? HIGHLIGHT_COLORS.includes(color as HighlightColor)
          ? (color as HighlightColor)
          : 'yellow'
        : INK_COLORS.includes(color as InkColor)
          ? (color as InkColor)
          : 'ink',
    size: typeof size === 'number' && size > 0 && size < 200 ? size : PEN_SIZE,
    pen: pen === true,
    points: roundPoints(usable),
    ...(highlight === true ? { highlight: true } : {}),
    ...(shape === true ? { shape: true } : {}),
  }
}

function validView(v: unknown): BoardView | null {
  if (typeof v !== 'object' || v === null) return null
  const { x, y, zoom } = v as Partial<BoardView>
  return [x, y, zoom].every((n) => typeof n === 'number' && Number.isFinite(n)) && zoom! > 0 ? { x: x!, y: y!, zoom: zoom! } : null
}

// ——— IndexedDB ———

const DB_NAME = 'glifo-lavagne'
const STROKES = 'strokes'
const VIEWS = 'views'

function request<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

function done(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
    tx.onabort = () => reject(tx.error ?? new Error('transazione annullata'))
  })
}

/** Tutti i tratti di una nota: le chiavi sono [nota, id], e un array viene dopo ogni stringa. */
const ofNote = (note: string) => IDBKeyRange.bound([note], [note, []])

export function openBoardDatabase(factory: IDBFactory = indexedDB, name = DB_NAME): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = factory.open(name, 1)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STROKES)) db.createObjectStore(STROKES, { keyPath: ['note', 'id'] })
      if (!db.objectStoreNames.contains(VIEWS)) db.createObjectStore(VIEWS, { keyPath: 'note' })
    }
    req.onsuccess = () => {
      const db = req.result
      // Un'altra scheda con una versione più nuova di Glifo vuole cambiare il database: si lascia fare.
      db.onversionchange = () => db.close()
      resolve(db)
    }
    req.onerror = () => reject(req.error)
    req.onblocked = () => reject(new Error('database bloccato'))
  })
}

export class IdbBoards implements BoardBackend {
  readonly persistent = true

  constructor(private readonly db: IDBDatabase) {}

  async load(note: string): Promise<BoardData> {
    const tx = this.db.transaction([STROKES, VIEWS], 'readonly')
    const [records, view] = await Promise.all([
      request(tx.objectStore(STROKES).getAll(ofNote(note))),
      request(tx.objectStore(VIEWS).get(note)),
    ])
    return {
      strokes: (records as unknown[]).map(fromRecord).filter((s): s is Stroke => s !== null),
      view: validView((view as { view?: unknown } | undefined)?.view),
    }
  }

  async change(note: string, change: BoardChange): Promise<void> {
    const tx = this.db.transaction(STROKES, 'readwrite')
    const store = tx.objectStore(STROKES)
    for (const id of change.remove ?? []) store.delete([note, id])
    for (const s of change.put ?? []) store.put(toRecord(note, s))
    await done(tx)
  }

  async saveView(note: string, view: BoardView): Promise<void> {
    const tx = this.db.transaction(VIEWS, 'readwrite')
    tx.objectStore(VIEWS).put({ note, view })
    await done(tx)
  }

  async remove(notes: string[]): Promise<void> {
    if (!notes.length) return
    const tx = this.db.transaction([STROKES, VIEWS], 'readwrite')
    for (const note of notes) {
      tx.objectStore(STROKES).delete(ofNote(note))
      tx.objectStore(VIEWS).delete(note)
    }
    await done(tx)
  }

  async transfer(from: string, to: string, keep: boolean): Promise<void> {
    if (from === to) return
    // Una transazione sola: lettura e scrittura insieme, nessuna scheda vede metà del lavoro.
    const tx = this.db.transaction([STROKES, VIEWS], 'readwrite')
    const strokes = tx.objectStore(STROKES)
    const views = tx.objectStore(VIEWS)
    const records = (await request(strokes.getAll(ofNote(from)))) as StrokeRecord[]
    const view = (await request(views.get(from))) as { view?: unknown } | undefined
    for (const r of records) strokes.put({ ...r, note: to })
    if (view) views.put({ ...view, note: to })
    if (!keep) {
      strokes.delete(ofNote(from))
      views.delete(from)
    }
    await done(tx)
  }

  async notes(): Promise<string[]> {
    const tx = this.db.transaction([STROKES, VIEWS], 'readonly')
    const found = new Set<string>()
    await new Promise<void>((resolve, reject) => {
      const req = tx.objectStore(STROKES).openKeyCursor()
      req.onerror = () => reject(req.error)
      req.onsuccess = () => {
        const cursor = req.result
        if (!cursor) return resolve()
        const note = (cursor.key as [string, string])[0]
        found.add(note)
        // Si salta subito alla nota dopo, senza passare da tutti i suoi tratti.
        cursor.continue([note, []])
      }
    })
    for (const key of (await request(tx.objectStore(VIEWS).getAllKeys())) as string[]) found.add(key)
    return [...found]
  }

  count(note: string): Promise<number> {
    return request(this.db.transaction(STROKES, 'readonly').objectStore(STROKES).count(ofNote(note)))
  }
}

// ——— In memoria, se IndexedDB non c'è ———

export class MemoryBoards implements BoardBackend {
  readonly persistent = false
  private readonly strokes = new Map<string, Map<string, Stroke>>()
  private readonly views = new Map<string, BoardView>()

  private of(note: string): Map<string, Stroke> {
    let map = this.strokes.get(note)
    if (!map) this.strokes.set(note, (map = new Map()))
    return map
  }

  async load(note: string): Promise<BoardData> {
    return { strokes: [...(this.strokes.get(note)?.values() ?? [])].map((s) => ({ ...s, points: [...s.points] })), view: this.views.get(note) ?? null }
  }

  async change(note: string, change: BoardChange): Promise<void> {
    const map = this.of(note)
    for (const id of change.remove ?? []) map.delete(id)
    for (const s of change.put ?? []) map.set(s.id, { ...s, points: [...s.points] })
    if (!map.size) this.strokes.delete(note)
  }

  async saveView(note: string, view: BoardView): Promise<void> {
    this.views.set(note, { ...view })
  }

  async remove(notes: string[]): Promise<void> {
    for (const note of notes) {
      this.strokes.delete(note)
      this.views.delete(note)
    }
  }

  async transfer(from: string, to: string, keep: boolean): Promise<void> {
    if (from === to) return
    const map = this.strokes.get(from)
    if (map) this.strokes.set(to, new Map([...this.of(to), ...map]))
    const view = this.views.get(from)
    if (view) this.views.set(to, view)
    if (!keep) await this.remove([from])
  }

  async notes(): Promise<string[]> {
    return [...new Set([...this.strokes.keys(), ...this.views.keys()])]
  }

  async count(note: string): Promise<number> {
    return this.strokes.get(note)?.size ?? 0
  }
}

// ——— Le lavagne per il resto di Glifo ———

/** Una lavagna nel file di backup: i punti in una stringa, «x y p x y p …», così il file resta leggibile. */
export interface BackupBoard {
  note: string
  view?: BoardView
  strokes: { t: number; color: InkColor | HighlightColor; size: number; pen: boolean; points: string; highlight?: boolean; shape?: boolean }[]
}

const CHANNEL = 'glifo.lavagne'

export class BoardStore {
  private readonly backend: Promise<BoardBackend>
  private readonly channel: BroadcastChannel | null = null
  private readonly listeners = new Set<(notes: string[]) => void>()

  /** `open`: per i test, un altro modo di aprire il database. */
  constructor(open: () => Promise<BoardBackend> = openDefault) {
    this.backend = open().catch(() => new MemoryBoards())
    try {
      this.channel = typeof BroadcastChannel === 'function' ? new BroadcastChannel(CHANNEL) : null
    } catch {
      this.channel = null
    }
    this.channel?.addEventListener('message', (ev: MessageEvent) => {
      const notes = (ev.data as { notes?: unknown })?.notes
      if (Array.isArray(notes)) this.emit(notes.filter((n): n is string => typeof n === 'string'))
    })
  }

  /** Smette di ascoltare le altre schede (serve ai test). */
  close(): void {
    this.channel?.close()
  }

  /** false se le lavagne restano solo finché la pagina è aperta (il browser non dà IndexedDB). */
  async persistent(): Promise<boolean> {
    return (await this.backend).persistent
  }

  /** Avvisa quando un'altra scheda cambia delle lavagne. */
  onChange(listener: (notes: string[]) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private emit(notes: string[]): void {
    for (const l of this.listeners) l(notes)
  }

  private told(notes: string[]): void {
    try {
      this.channel?.postMessage({ notes })
    } catch {
      /* le altre schede si aggiorneranno riaprendo la nota */
    }
  }

  async load(note: string): Promise<BoardData> {
    return (await this.backend).load(note)
  }

  async change(note: string, change: BoardChange): Promise<void> {
    if (!change.put?.length && !change.remove?.length) return
    await (await this.backend).change(note, change)
    this.told([note])
  }

  async saveView(note: string, view: BoardView): Promise<void> {
    await (await this.backend).saveView(note, view)
  }

  /** Elimina le lavagne di queste note (eliminate, o non più in questo browser). */
  async remove(notes: string[]): Promise<void> {
    if (!notes.length) return
    await (await this.backend).remove(notes)
    this.told(notes)
  }

  /** La nota ha cambiato id (con l'account): la lavagna va con lei. */
  async move(from: string, to: string): Promise<void> {
    await (await this.backend).transfer(from, to, false)
    this.told([from, to])
  }

  /** La nota si è sdoppiata (un conflitto con l'account): tutte e due le versioni hanno la lavagna. */
  async copy(from: string, to: string): Promise<void> {
    await (await this.backend).transfer(from, to, true)
    this.told([to])
  }

  /** Quante di queste note hanno qualcosa scritto sulla lavagna. */
  async drawn(notes: string[]): Promise<number> {
    const backend = await this.backend
    const counts = await Promise.all(notes.map((n) => backend.count(n)))
    return counts.filter((c) => c > 0).length
  }

  /**
   * Toglie le lavagne rimaste senza nota (eliminata in un'altra scheda, su un altro dispositivo,
   * o uscendo dall'account). `existing` legge le note salvate in quel momento: la si chiama dopo
   * aver letto le lavagne, così una nota appena creata in un'altra scheda c'è già.
   */
  async prune(existing: () => Set<string>): Promise<string[]> {
    const backend = await this.backend
    const boards = await backend.notes()
    const notes = existing()
    const gone = boards.filter((n) => !notes.has(n))
    await this.remove(gone)
    return gone
  }

  /** Le lavagne di queste note per il backup (solo quelle con qualcosa scritto). */
  async exportBoards(notes: string[]): Promise<BackupBoard[]> {
    const backend = await this.backend
    const out: BackupBoard[] = []
    for (const note of notes) {
      const data = await backend.load(note)
      if (!data.strokes.length) continue
      out.push({
        note,
        ...(data.view ? { view: data.view } : {}),
        strokes: data.strokes.map((s) => ({
          t: s.t,
          color: s.color,
          size: s.size,
          pen: s.pen,
          points: roundPoints(s.points).join(' '),
          ...(s.highlight ? { highlight: true } : {}),
          ...(s.shape ? { shape: true } : {}),
        })),
      })
    }
    return out
  }

  /** Rimette una lavagna dal backup sulla nota `note` (quella appena ricreata). Restituisce quanti tratti. */
  async importBoard(note: string, board: unknown, newId: () => string): Promise<number> {
    if (typeof board !== 'object' || board === null) return 0
    const { strokes, view } = board as { strokes?: unknown; view?: unknown }
    const list = (Array.isArray(strokes) ? strokes : [])
      .map((s) => {
        const points = typeof (s as { points?: unknown })?.points === 'string' ? (s as { points: string }).points.trim().split(/\s+/).map(Number) : []
        return fromRecord({ ...(s as object), id: newId(), points })
      })
      .filter((s): s is Stroke => s !== null)
    if (list.length) await this.change(note, { put: list })
    const v = validView(view)
    if (v) await this.saveView(note, v)
    return list.length
  }
}

async function openDefault(): Promise<BoardBackend> {
  if (typeof indexedDB === 'undefined') throw new Error('IndexedDB non disponibile')
  return new IdbBoards(await openBoardDatabase())
}
