import { EDITOR_SHARE, NOTES_WIDTH, PANE_LIMITS, SYMBOLS_WIDTH, type PaneSizes, type SizeLimits } from '../store/layout'
import { h } from './dom'

/** Testo e anteprima restano larghi almeno così, anche allargando i pannelli ai lati. */
export const PANE_MIN = 220
/** Di quanti pixel si sposta un bordo con le frecce. */
export const KEY_STEP = 16

/**
 * La larghezza di un pannello laterale quando se ne sposta il bordo: dentro i limiti, e senza
 * stringere testo e anteprima sotto `PANE_MIN`. `room`: quanto posto si può ancora togliere al
 * centro della pagina.
 */
export function panelWidth(wanted: number, current: number, room: number, limits: SizeLimits): number {
  const max = Math.max(limits.min, Math.min(limits.max, current + room))
  return Math.round(Math.min(max, Math.max(limits.min, wanted)))
}

/** Nella vista divisa, la parte del testo se lo si vuole largo `wanted` pixel su `total`. */
export function editorShare(wanted: number, total: number): number {
  const min = Math.max(EDITOR_SHARE.min, PANE_MIN / total)
  const max = Math.min(EDITOR_SHARE.max, 1 - PANE_MIN / total)
  if (!(total > 0) || min > max) return EDITOR_SHARE.initial
  return Math.round(Math.min(max, Math.max(min, wanted / total)) * 1000) / 1000
}

export interface ResizableParts {
  notes: HTMLElement
  editor: HTMLElement
  preview: HTMLElement
  symbols: HTMLElement
}

interface Edge {
  key: keyof PaneSizes
  className: string
  label: string
  /** La sezione che il bordo allarga o stringe. */
  controls: HTMLElement
  /** 1 se spostando il bordo a destra la sezione si allarga, -1 se si stringe. */
  grows: 1 | -1
  /** Misura la pagina e dice che misura viene spostando il bordo di `dx` pixel. */
  begin(): (dx: number) => number
}

const END_EVENTS = ['pointerup', 'pointercancel', 'lostpointercapture'] as const

const width = (el: HTMLElement) => el.getBoundingClientRect().width

/**
 * I bordi tra le sezioni: trascinandoli (o con le frecce, quando hanno il fuoco) si cambiano
 * le misure, con un doppio clic tornano quelle di partenza. Dove i pannelli si aprono sopra il
 * testo il CSS li nasconde.
 */
export class PaneResizer {
  readonly notesHandle: HTMLElement
  readonly splitHandle: HTMLElement
  readonly symbolsHandle: HTMLElement
  private readonly sizes: PaneSizes

  constructor(
    private readonly parts: ResizableParts,
    sizes: PaneSizes,
    private readonly save: (changes: Partial<PaneSizes>) => void,
  ) {
    this.sizes = { ...sizes }
    this.notesHandle = this.edge({
      key: 'notesWidth',
      className: 'resize-notes',
      label: 'Larghezza dell\'elenco degli appunti',
      controls: parts.notes,
      grows: 1,
      begin: () => {
        const start = width(parts.notes)
        const room = this.room()
        return (dx) => panelWidth(start + dx, start, room, NOTES_WIDTH)
      },
    })
    this.splitHandle = this.edge({
      key: 'editorShare',
      className: 'resize-split',
      label: 'Divisione tra testo e anteprima',
      controls: parts.editor,
      grows: 1,
      begin: () => {
        const start = width(parts.editor)
        const total = start + width(parts.preview)
        return (dx) => editorShare(start + dx, total)
      },
    })
    this.symbolsHandle = this.edge({
      key: 'symbolsWidth',
      className: 'resize-symbols',
      label: 'Larghezza del pannello dei simboli',
      controls: parts.symbols,
      grows: -1,
      begin: () => {
        const start = width(parts.symbols)
        const room = this.room()
        return (dx) => panelWidth(start - dx, start, room, SYMBOLS_WIDTH)
      },
    })
    this.apply()
  }

  private edge(edge: Edge): HTMLElement {
    return h('div', {
      class: `resize-handle ${edge.className}`,
      title: 'Trascina per allargare o stringere. Doppio clic: torna alla misura di partenza.',
      attrs: {
        role: 'separator',
        tabindex: 0,
        'aria-orientation': 'vertical',
        'aria-label': edge.label,
        'aria-controls': edge.controls.id || undefined,
      },
      on: {
        // Il fuoco resta dov'era (per esempio nel testo).
        mousedown: (ev) => ev.preventDefault(),
        pointerdown: (ev) => this.drag(edge, ev),
        dblclick: () => this.change(edge.key, PANE_LIMITS[edge.key].initial),
        keydown: (ev) => this.key(edge, ev),
      },
    })
  }

  private drag(edge: Edge, ev: PointerEvent): void {
    if (ev.button !== 0 || !ev.isPrimary) return
    ev.preventDefault()
    const handle = ev.currentTarget as HTMLElement
    const root = handle.ownerDocument.documentElement
    const move = edge.begin()
    const before = this.sizes[edge.key]
    try {
      // Così il bordo segue il puntatore anche quando esce dalla striscia.
      handle.setPointerCapture(ev.pointerId)
    } catch {
      /* senza, il bordo si sposta solo finché il puntatore ci resta sopra */
    }
    handle.classList.add('is-dragging')
    root.classList.add('is-resizing')
    const onMove = (e: PointerEvent) => {
      if (e.pointerId === ev.pointerId) this.set(edge.key, move(e.clientX - ev.clientX))
    }
    const end = (e: PointerEvent) => {
      if (e.pointerId !== ev.pointerId) return
      handle.removeEventListener('pointermove', onMove)
      for (const type of END_EVENTS) handle.removeEventListener(type, end)
      handle.classList.remove('is-dragging')
      root.classList.remove('is-resizing')
      if (this.sizes[edge.key] !== before) this.save({ [edge.key]: this.sizes[edge.key] })
    }
    handle.addEventListener('pointermove', onMove)
    for (const type of END_EVENTS) handle.addEventListener(type, end)
  }

  /** Frecce: il bordo si sposta di `KEY_STEP` pixel. Inizio e Fine: la misura più piccola e la più grande. */
  private key(edge: Edge, ev: KeyboardEvent): void {
    const steps: Record<string, number> = {
      ArrowLeft: -KEY_STEP,
      ArrowRight: KEY_STEP,
      Home: -edge.grows * Infinity,
      End: edge.grows * Infinity,
    }
    const dx = steps[ev.key]
    if (dx === undefined || ev.altKey || ev.ctrlKey || ev.metaKey) return
    ev.preventDefault()
    this.change(edge.key, edge.begin()(dx))
  }

  private change(key: keyof PaneSizes, value: number): void {
    if (value === this.sizes[key]) return
    this.set(key, value)
    this.save({ [key]: value })
  }

  private set(key: keyof PaneSizes, value: number): void {
    this.sizes[key] = value
    this.apply()
  }

  /** Quanto posto si può togliere a testo e anteprima (quelli che si vedono) senza stringerli sotto `PANE_MIN`. */
  private room(): number {
    return [this.parts.editor, this.parts.preview]
      .map(width)
      .filter((w) => w > 0)
      .reduce((sum, w) => sum + w - PANE_MIN, 0)
  }

  /** Passa le misure al CSS (che le usa dove i pannelli stanno ai lati) e agli screen reader. */
  private apply(): void {
    const { notesWidth, symbolsWidth, editorShare } = this.sizes
    this.parts.notes.style.setProperty('--notes-size', `${notesWidth}px`)
    this.parts.symbols.style.setProperty('--symbols-size', `${symbolsWidth}px`)
    // Testo e anteprima si dividono il posto in millesimi.
    const editor = Math.round(editorShare * 1000)
    this.parts.editor.style.setProperty('--split-grow', String(editor))
    this.parts.preview.style.setProperty('--split-grow', String(1000 - editor))
    aria(this.notesHandle, notesWidth, NOTES_WIDTH, `${notesWidth} pixel`)
    aria(this.symbolsHandle, symbolsWidth, SYMBOLS_WIDTH, `${symbolsWidth} pixel`)
    const percent = Math.round(editorShare * 100)
    aria(this.splitHandle, percent, { min: EDITOR_SHARE.min * 100, max: EDITOR_SHARE.max * 100 }, `testo ${percent}%, anteprima ${100 - percent}%`)
  }
}

function aria(handle: HTMLElement, now: number, limits: { min: number; max: number }, text: string): void {
  handle.setAttribute('aria-valuenow', String(now))
  handle.setAttribute('aria-valuemin', String(Math.round(limits.min)))
  handle.setAttribute('aria-valuemax', String(Math.round(limits.max)))
  handle.setAttribute('aria-valuetext', text)
}
