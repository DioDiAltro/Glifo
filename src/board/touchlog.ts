import { readJson, writeJson } from '../store/storage'

/**
 * Il registro dei tocchi della lavagna, per capire che cosa succede su un dispositivo che Claude non
 * ha (l'iPad con la Apple Pencil). Si accende nelle impostazioni; da lì annota quello che arriva da
 * penna, dita e mouse, che cosa ne fa la lavagna (board.ts scrive le sue decisioni, con «→») e quello
 * che fa il browser intorno: tocchi presi dal sistema, selezione, fuoco, scrittura nel testo,
 * tastiera, schermo intero, pagina nascosta, errori. Poi lo si copia, scarica o condivide per
 * mandarlo a Claude (src/ui/touchLogPanel.ts).
 *
 * Resta in questo browser (`glifo.registro.v1`) finché non lo si manda, e non contiene il testo delle
 * note: della selezione e di quello che si scrive dice solo quanto è lungo e dove.
 */

export const LOG_KEY = 'glifo.registro.v1'
/** Le righe che si tengono: oltre, vanno via le più vecchie. */
export const LOG_MAX_LINES = 4000
/** I movimenti di un puntatore si uniscono in una riga, fino a tanti o per tanto tempo (ms). */
const MOVES_MAX = { n: 60, ms: 500 }
/** La scrittura di seguito nello stesso posto è una riga sola, se non passa più di tanto (ms). */
const INPUT_GAP = 1500

/** Quello che si salva nel browser. */
export interface SavedLog {
  on: boolean
  started: number
  dropped: number
  lines: string[]
}

/** Dove si salva: il browser, o la memoria nei test. */
export interface LogStore {
  read(): unknown
  write(value: SavedLog): boolean
}

interface Moves {
  what: string
  verb: string
  n: number
  x0: number
  y0: number
  x1: number
  y1: number
  pmin: number
  pmax: number
  t0: number
  t1: number
}

interface Writing {
  key: string
  index: number
  time: string
  kind: string
  where: string
  count: number
  chars: number
  last: number
}

const browserStore: LogStore = {
  read: () => readJson<unknown>(LOG_KEY, null),
  write: (value) => writeJson(LOG_KEY, value),
}

function isSaved(v: unknown): v is SavedLog {
  if (typeof v !== 'object' || v === null) return false
  const s = v as SavedLog
  return typeof s.on === 'boolean' && Number.isFinite(s.started) && Number.isFinite(s.dropped) && Array.isArray(s.lines) && s.lines.every((l) => typeof l === 'string')
}

const seconds = (ms: number) => (ms / 1000).toFixed(3)

function movesLine(m: Moves): string {
  const pressure = m.pmax > 0 ? ` p ${m.pmin === m.pmax ? m.pmin.toFixed(2) : `${m.pmin.toFixed(2)}–${m.pmax.toFixed(2)}`}` : ''
  return `${m.what} ${m.verb} ×${m.n} (${m.x0},${m.y0})→(${m.x1},${m.y1})${pressure} in ${seconds(m.t1 - m.t0)} s`
}

export class TouchLog {
  on = false
  /** Quando è cominciato il registro (Date.now()): i tempi delle righe partono da qui. */
  started = 0
  /** Quante righe vecchie sono già andate via. */
  dropped = 0
  lines: string[] = []
  private readonly moves = new Map<string, Moves>()
  private readonly listeners = new Set<() => void>()
  private writing: Writing | null = null
  private saveTimer: ReturnType<typeof setTimeout> | null = null
  private detach: (() => void) | null = null

  constructor(
    private readonly now: () => number = Date.now,
    private readonly store: LogStore = browserStore,
  ) {
    const saved = store.read()
    if (isSaved(saved)) {
      this.on = saved.on
      this.started = saved.started
      this.dropped = saved.dropped
      this.lines = saved.lines.slice(-LOG_MAX_LINES)
    }
  }

  /** Dopo aver aperto la pagina: se il registro era acceso, riprende. */
  resume(): void {
    if (!this.on) return
    this.watch()
    this.add('pagina aperta: il registro riprende')
    this.saveNow()
  }

  /** Accende il registro, da capo. */
  start(): void {
    if (this.on) return
    this.on = true
    this.started = this.now()
    this.dropped = 0
    this.lines = []
    this.moves.clear()
    this.writing = null
    this.watch()
    this.add('registro acceso')
    this.saveNow()
  }

  /** Spegne il registro; le righe restano finché non lo si svuota. */
  stop(): void {
    if (!this.on) return
    this.add('registro spento')
    this.on = false
    this.detach?.()
    this.detach = null
    this.saveNow()
  }

  /** Toglie tutte le righe (e, se è acceso, riparte da adesso). */
  clear(): void {
    this.lines = []
    this.dropped = 0
    this.moves.clear()
    this.writing = null
    this.started = this.now()
    if (this.on) this.add('registro svuotato')
    this.saveNow()
  }

  /** Una riga del registro (se è acceso). */
  add(text: string): void {
    if (!this.on) return
    this.flushMoves()
    this.writing = null
    this.push(this.now(), text)
    this.changed()
  }

  /**
   * Un movimento: quelli dello stesso puntatore, uno dopo l'altro, diventano una riga sola con il
   * percorso, la pressione e quanto è durato. `what` è il puntatore («penna 2»), `verb` «muove» o
   * «sospesa» (la penna sopra lo schermo, senza toccarlo).
   */
  move(what: string, verb: string, x: number, y: number, pressure: number): void {
    if (!this.on) return
    const key = `${what} ${verb}`
    const t = this.now()
    const p = Number.isFinite(pressure) ? pressure : 0
    const m = this.moves.get(key)
    if (!m) {
      this.moves.set(key, { what, verb, n: 1, x0: x, y0: y, x1: x, y1: y, pmin: p, pmax: p, t0: t, t1: t })
      return
    }
    m.n++
    m.x1 = x
    m.y1 = y
    m.t1 = t
    m.pmin = Math.min(m.pmin, p)
    m.pmax = Math.max(m.pmax, p)
    if (m.n >= MOVES_MAX.n || t - m.t0 >= MOVES_MAX.ms) this.flushMoves()
  }

  /**
   * Si scrive nel testo (`kind` è il tipo di input del browser, per esempio insertText): di seguito
   * nello stesso posto è una riga sola, con quante volte e quanti caratteri, senza il testo.
   */
  input(kind: string, chars: number, where: string): void {
    if (!this.on) return
    this.flushMoves()
    const t = this.now()
    const key = `${kind} ${where}`
    const w = this.writing
    if (w && w.key === key && t - w.last <= INPUT_GAP && w.index === this.lines.length - 1 && this.lines[w.index].startsWith(w.time)) {
      w.count++
      w.chars += chars
      w.last = t
      this.lines[w.index] = `${w.time} ${writingLine(w)}`
      this.changed()
      return
    }
    const time = seconds(t - this.started)
    const next: Writing = { key, index: 0, time, kind, where, count: 1, chars, last: t }
    this.push(t, writingLine(next))
    next.index = this.lines.length - 1
    this.writing = next
    this.changed()
  }

  /** I movimenti in sospeso diventano righe, nell'ordine in cui sono cominciati. */
  flushMoves(): void {
    if (!this.moves.size) return
    const pending = [...this.moves.values()].sort((a, b) => a.t0 - b.t0)
    this.moves.clear()
    for (const m of pending) this.push(m.t0, movesLine(m))
    this.changed()
  }

  /** Avvisa quando cambia qualcosa (per contare le righe nell'interfaccia). */
  onChange(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  /** Salva subito (per esempio quando la pagina si chiude o va in secondo piano). */
  saveNow(): void {
    this.flushMoves()
    if (this.saveTimer) clearTimeout(this.saveTimer)
    this.saveTimer = null
    this.store.write({ on: this.on, started: this.started, dropped: this.dropped, lines: this.lines })
    this.emit()
  }

  /** Il testo da mandare a Claude: l'intestazione, la nota di chi prova e le righe. */
  text(header: string[], note = ''): string {
    this.flushMoves()
    const out = ['Registro dei tocchi di Glifo', ...header]
    if (note.trim()) out.push(`Cosa è successo: ${note.trim().replace(/\s+/g, ' ')}`)
    out.push(
      `Righe: ${this.lines.length}${this.dropped ? ` (tolte le ${this.dropped} più vecchie)` : ''}. ` +
        `Il numero all'inizio di ogni riga sono i secondi dall'inizio del registro (${new Date(this.started).toISOString()}); ` +
        'le coordinate sono in pixel dalla finestra; «→» è quello che ha deciso la lavagna.',
      '—',
      ...this.lines,
    )
    return `${out.join('\n')}\n`
  }

  private push(t: number, text: string): void {
    this.lines.push(`${seconds(t - this.started)} ${text}`)
    if (this.lines.length > LOG_MAX_LINES) {
      const cut = this.lines.length - LOG_MAX_LINES + Math.floor(LOG_MAX_LINES / 10)
      this.lines.splice(0, cut)
      this.dropped += cut
      this.writing = null
    }
  }

  private changed(): void {
    this.emit()
    // Si salva quando ci si ferma un attimo: scrivere nel browser durante un tratto lo rallenterebbe.
    if (this.saveTimer) clearTimeout(this.saveTimer)
    this.saveTimer = setTimeout(() => this.saveNow(), 3000)
  }

  private emit(): void {
    for (const listener of this.listeners) listener()
  }

  private watch(): void {
    if (this.detach || typeof window === 'undefined') return
    this.detach = watchBrowser(this)
  }
}

function writingLine(w: Writing): string {
  return `scrittura: ${w.kind}${w.count > 1 ? ` ×${w.count}` : ''}, ${w.chars} ${w.chars === 1 ? 'carattere' : 'caratteri'} · ${w.where}`
}

// ——— Quello che fa il browser ———

const KINDS: Record<string, string> = { pen: 'penna', touch: 'dito', mouse: 'mouse' }

/** Il puntatore, con il suo numero: «penna 2», «dito 7». */
export function pointerName(ev: PointerEvent): string {
  return `${KINDS[ev.pointerType] ?? (ev.pointerType || 'puntatore')} ${ev.pointerId}`
}

const at = (ev: MouseEvent) => `(${Math.round(ev.clientX)},${Math.round(ev.clientY)})`

/** Dove ha toccato la penna, quanto ha premuto, i tasti e (per le dita) quanto è grande il tocco. */
function pointerDetail(ev: PointerEvent): string {
  let s = at(ev)
  if (ev.pointerType === 'pen') s += ` p ${(ev.pressure || 0).toFixed(2)}`
  if (ev.buttons > 1) s += ` tasti ${ev.buttons}`
  if (ev.pointerType === 'touch' && (ev.width > 1 || ev.height > 1)) s += ` ${Math.round(ev.width)}×${Math.round(ev.height)}`
  return s
}

const REGIONS: [string, string][] = [
  ['.board-stage', 'lavagna'],
  ['.board-pane', 'strumenti della lavagna'],
  ['.cm-editor', 'editor'],
  ['.preview-pane', 'anteprima'],
  ['.float-bar', 'pulsanti sopra il testo'],
  ['.notes-panel', 'barra laterale'],
  ['.symbols-panel', 'simboli'],
  ['dialog', 'finestra'],
]

const clip = (s: string, n = 60) => (s.length > n ? `${s.slice(0, n - 1)}…` : s)

/**
 * Dove è successo, a parole: la parte dell'app e, se c'è, il pulsante. Mai il testo delle note: nel
 * testo e nell'anteprima solo la parte, e un appunto dell'elenco è «un appunto».
 */
export function where(target: EventTarget | null): string {
  const el = target instanceof Element ? target : target instanceof Node ? target.parentElement : null
  if (!el) return typeof Document !== 'undefined' && target instanceof Document ? 'pagina' : 'finestra'
  const found = REGIONS.find(([sel]) => el.closest(sel))
  let region = found ? found[1] : el === document.body || el === document.documentElement ? 'pagina' : el.tagName.toLowerCase()
  if (found?.[0] === 'dialog') region = `finestra «${clip(el.closest('dialog')?.getAttribute('aria-label') ?? '', 40)}»`
  if (region === 'editor' || region === 'anteprima') return region
  if (el.closest('.note-item')) return `${region}: un appunto`
  const control = el.closest('button, a, input, textarea, select, [role="button"]')
  if (!control) return region
  const label =
    control.getAttribute('aria-label') ||
    control.getAttribute('title') ||
    (control.tagName === 'BUTTON' ? (control.textContent ?? '').trim() : '') ||
    control.tagName.toLowerCase()
  return `${region}: «${clip(label, 40)}»`
}

/** I tocchi di un evento touch: penna o dito (su Safari), forza e grandezza. */
function touchesInfo(ev: TouchEvent): string {
  const parts = Array.from(ev.changedTouches, (t) => {
    const type = (t as Touch & { touchType?: string }).touchType
    const kind = type === 'stylus' ? 'penna' : type === 'direct' ? 'dito' : 'tocco'
    const force = Number.isFinite(t.force) && t.force > 0 ? ` forza ${t.force.toFixed(2)}` : ''
    const radius = Number.isFinite(t.radiusX) && t.radiusX > 0 ? ` raggio ${t.radiusX.toFixed(1)}` : ''
    return `${kind}${force}${radius}`
  })
  return `${parts.join(', ')} (in tutto ${ev.touches.length})`
}

/** Aspetta che le cose si fermino (una selezione che si allarga, la tastiera che sale). */
function settle(fn: () => void, ms = 150): () => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(fn, ms)
  }
}

/** Tutti gli ascoltatori del browser, finché il registro è acceso: restituisce come toglierli. */
function watchBrowser(log: TouchLog): () => void {
  const off: (() => void)[] = []
  const listen = (target: EventTarget, type: string, fn: (ev: Event) => void, capture = true) => {
    target.addEventListener(type, fn, { capture, passive: true })
    off.push(() => target.removeEventListener(type, fn, { capture }))
  }
  const onBoard = (target: EventTarget | null) => target instanceof Element && target.closest('.board-pane') !== null

  // I puntatori: giù, su e annullati dappertutto; i movimenti solo sulla lavagna.
  listen(window, 'pointerdown', (ev) => {
    const p = ev as PointerEvent
    log.add(`${pointerName(p)} giù ${pointerDetail(p)} · ${where(p.target)}`)
  })
  listen(window, 'pointerup', (ev) => {
    const p = ev as PointerEvent
    log.add(`${pointerName(p)} su ${at(p)}`)
  })
  listen(window, 'pointercancel', (ev) => {
    const p = ev as PointerEvent
    log.add(`${pointerName(p)} annullato dal browser ${at(p)} · ${where(p.target)}`)
  })
  listen(window, 'pointermove', (ev) => {
    const p = ev as PointerEvent
    if (!onBoard(p.target)) return
    const pressed = p.buttons !== 0
    if (!pressed && p.pointerType !== 'pen') return
    log.move(pointerName(p), pressed ? 'muove' : 'sospesa', Math.round(p.clientX), Math.round(p.clientY), p.pressure)
  })
  // I tocchi come li vede il browser, dopo la lavagna: «annullato» vuol dire che non ne ha fatto
  // altro (selezione, lente, Scribble); touchcancel che se li è presi il sistema.
  for (const type of ['touchstart', 'touchend', 'touchcancel']) {
    listen(
      window,
      type,
      (ev) => {
        const t = ev as TouchEvent
        log.add(`${type} ${touchesInfo(t)} · ${where(t.target)}${t.defaultPrevented ? ' · annullato' : ''}`)
      },
      false,
    )
  }
  listen(window, 'gesturestart', (ev) => log.add(`gesto di Safari: inizio · ${where(ev.target)}`))
  listen(window, 'gestureend', (ev) => {
    const scale = (ev as Event & { scale?: number }).scale
    log.add(`gesto di Safari: fine${typeof scale === 'number' ? `, scala ${scale.toFixed(2)}` : ''}`)
  })
  listen(document, 'contextmenu', (ev) => log.add(`menu del tocco lungo · ${where(ev.target)}${ev.defaultPrevented ? ' · annullato' : ''}`), false)
  listen(document, 'dragstart', (ev) => log.add(`trascinamento · ${where(ev.target)}`))

  // La selezione (quanto è lunga e dove, quando si ferma), il fuoco e la scrittura nel testo.
  let selection = 'selezione: nessuna'
  listen(
    document,
    'selectionchange',
    settle(() => {
      const sel = document.getSelection()
      const next = !sel || sel.isCollapsed || !sel.rangeCount ? 'selezione: nessuna' : `selezione: ${sel.toString().length} caratteri · ${where(sel.anchorNode)}`
      if (next === selection) return
      selection = next
      log.add(next)
    }),
  )
  listen(document, 'focusin', (ev) => log.add(`fuoco: ${where(ev.target)}`))
  listen(document, 'beforeinput', (ev) => {
    const input = ev as InputEvent
    log.input(input.inputType || 'scrittura', input.data?.length ?? 0, where(input.target))
  })
  listen(document, 'compositionstart', (ev) => log.add(`composizione del testo: inizio · ${where(ev.target)}`))

  // Lo schermo intero, la pagina che va via o torna, la finestra e la tastiera.
  for (const type of ['fullscreenchange', 'webkitfullscreenchange']) {
    listen(document, type, () => {
      const doc = document as Document & { webkitFullscreenElement?: Element | null }
      log.add(`schermo intero del browser: ${doc.fullscreenElement || doc.webkitFullscreenElement ? 'sì' : 'no'} (${type})`)
    })
  }
  listen(document, 'visibilitychange', () => {
    const hidden = document.visibilityState === 'hidden'
    log.add(`pagina ${hidden ? 'nascosta' : 'di nuovo visibile'}`)
    if (hidden) log.saveNow()
  })
  listen(
    window,
    'pagehide',
    (ev) => {
      log.add(`pagina chiusa o lasciata${(ev as PageTransitionEvent).persisted ? ' (resta in memoria)' : ''}`)
      log.saveNow()
    },
    false,
  )
  listen(window, 'pageshow', (ev) => (ev as PageTransitionEvent).persisted && log.add('pagina tornata dalla memoria'), false)
  listen(window, 'blur', () => log.add('la finestra perde il fuoco'), false)
  listen(window, 'focus', () => log.add('la finestra riprende il fuoco'), false)
  let size = `${innerWidth}×${innerHeight}`
  listen(
    window,
    'resize',
    settle(() => {
      const next = `${innerWidth}×${innerHeight}`
      if (next === size) return
      size = next
      log.add(`finestra ${next}`)
    }),
    false,
  )
  const vv = window.visualViewport
  if (vv) {
    const describe = () => `${Math.round(vv.width)}×${Math.round(vv.height)}${Math.abs(vv.scale - 1) > 0.01 ? `, ingrandita ×${vv.scale.toFixed(2)}` : ''}`
    let visible = describe()
    listen(
      vv,
      'resize',
      settle(() => {
        const next = describe()
        if (next === visible) return
        visible = next
        log.add(`parte visibile ${next} (più bassa della finestra: la tastiera)`)
      }),
      false,
    )
  }
  listen(
    window,
    'error',
    (ev) => {
      const e = ev as ErrorEvent
      const file = e.filename ? ` (${e.filename.split('/').pop()}:${e.lineno})` : ''
      log.add(`errore: ${clip(String(e.message), 160)}${file}`)
    },
    false,
  )
  listen(
    window,
    'unhandledrejection',
    (ev) => {
      const reason = (ev as PromiseRejectionEvent).reason as { message?: unknown } | undefined
      log.add(`errore in un'attesa: ${clip(String(reason?.message ?? reason), 160)}`)
    },
    false,
  )
  return () => {
    for (const fn of off) fn()
  }
}

/**
 * Il registro di questa pagina. Riprende (`resume`) solo nell'app, da main.ts: questo modulo finisce
 * anche nel pezzo di codice che usa la pagina delle note condivise.
 */
export const touchLog = new TouchLog()
