import { hydrateGraphs, type GraphLabels } from '../graph/preview'
import type { BlockKind, MoveDir } from '../render/blockMove'
import { renderMarkdown } from '../render/markdown'
import type { Theme } from '../schema/model'
import { hydrateSchemas } from '../schema/preview'
import { h } from './dom'
import { toast } from './toast'

export interface PreviewCallbacks {
  /** Clic su una casella "- [ ]": riga (0-based) dell'elemento nel sorgente. */
  onToggleTask(line: number): void
  /** Doppio clic su un blocco: porta l'editor a quella riga (0-based). */
  onJumpToLine(line: number): void
  /** «Modifica» (o doppio clic) su uno schema: la riga (0-based) del suo blocco e il suo testo. */
  onEditSchema(line: number, source: string): void
  /** «Aggiungi lo slider per k» sotto un grafico: la riga (0-based) del suo blocco e le righe da aggiungere (k = 1). */
  onAddToGraph(line: number, text: string): void
  /** «Titolo e nomi degli assi…» di un grafico: la riga (0-based) del suo blocco e i testi da scrivere. */
  onGraphLabels(line: number, labels: GraphLabels): void
  /**
   * Le frecce ↑ ↓ di uno schema o di un grafico: il blocco alla riga `line` (0-based) con l'impronta
   * `hash` va oltre il blocco vicino. La riga dove è finito, o null se non si è spostato.
   */
  onMoveBlock(kind: BlockKind, line: number, hash: string, dir: MoveDir): number | null
  /** Ctrl+Z (o Ctrl+Maiusc+Z, Ctrl+Y) con il fuoco nell'anteprima: annulla o ripete nel testo. */
  onUndo(redo: boolean): void
  /** La nota mostrata (il suo id): gli slider dei grafici restano suoi. */
  scope?(): string
}

/** Il blocco c'è ma non si vede: in un <details> chiuso, in un elemento hidden, o nascosto dal CSS. */
function hidden(el: HTMLElement): boolean {
  if (el.closest('details:not([open]), [hidden]')) return true
  return typeof el.checkVisibility === 'function' && !el.checkVisibility()
}

/** Quanto resta segnato il blocco appena spostato (come la cella scelta in Colab). */
const JUST_MOVED_MS = 1200
/** Un doppio clic così vicino a una freccia è fatto di clic sulle frecce. */
const DOUBLE_CLICK_MS = 500

/** Riquadro dell'anteprima: ridisegna il Markdown e segue lo scorrimento dell'editor. */
export class Preview {
  readonly el: HTMLElement
  readonly content: HTMLElement
  private pending = 0
  /** Il ridisegno in attesa (vedi `flush`). */
  private pendingRun: (() => void) | null = null
  private lastSource: string | null = null
  private anchors: { line: number; el: HTMLElement }[] = []
  private totalLines = 1
  private syncTarget: { line: number; fraction: number } | null = null
  private theme: Theme = 'light'
  /** L'anteprima segue lo scorrimento dell'editor (nella vista divisa). */
  private follow = true
  /**
   * Si è appena spostato un blocco: l'anteprima resta dov'è (non segue l'editor) finché non si torna
   * a usare l'editor (`release`), così la freccia resta sotto il puntatore.
   */
  private held = false
  /** Per chi usa un lettore di schermo: dove è andato il blocco. Fuori dalla nota, che si rifà. */
  private readonly live: HTMLElement
  private justMoved: { el: HTMLElement; timer: number } | null = null
  /** Quando si è premuta una freccia l'ultima volta. */
  private arrowAt = -Infinity

  constructor(private readonly cb: PreviewCallbacks) {
    this.content = h('article', { class: 'markdown-body', attrs: { 'aria-label': 'Anteprima degli appunti' } })
    this.live = h('div', { class: 'visually-hidden', attrs: { role: 'status', 'aria-live': 'polite' } })
    this.el = h('section', { class: 'preview-pane' }, this.content, this.live)
    this.content.addEventListener('change', (ev) => {
      const box = ev.target as HTMLInputElement
      if (box.classList.contains('task-checkbox')) {
        const line = Number(box.dataset.taskLine)
        if (line >= 0) this.cb.onToggleTask(line)
      }
    })
    this.content.addEventListener('click', (ev) => {
      const move = (ev.target as HTMLElement).closest<HTMLElement>('.block-move')
      if (move) {
        this.moveBlock(move)
        return
      }
      const block = (ev.target as HTMLElement).closest('.schema-edit')?.closest<HTMLElement>('.schema-block')
      if (block) this.cb.onEditSchema(Number(block.dataset.line), block.dataset.schema ?? '')
      const add = (ev.target as HTMLElement).closest<HTMLElement>('.graph-add-slider')
      const graph = add?.closest<HTMLElement>('.graph-block')
      if (add && graph) this.cb.onAddToGraph(Number(graph.dataset.line), add.dataset.add ?? '')
    })
    this.content.addEventListener('graph-labels', (ev) => {
      const graph = (ev.target as HTMLElement).closest<HTMLElement>('.graph-block')
      if (graph) this.cb.onGraphLabels(Number(graph.dataset.line), (ev as CustomEvent<GraphLabels>).detail)
    })
    this.content.addEventListener('dblclick', (ev) => {
      // Due clic veloci sulle frecce (o su «Modifica») non aprono lo schema e non portano all'editor:
      // nemmeno quando il secondo cade accanto, perché in cima alla nota il blocco non può restare fermo.
      if ((ev.target as HTMLElement).closest('.schema-preview-tools, .block-move-group')) return
      if (performance.now() - this.arrowAt < DOUBLE_CLICK_MS) return
      const target = (ev.target as HTMLElement).closest<HTMLElement>('[data-line]')
      if (!target) return
      if (target.classList.contains('schema-block')) this.cb.onEditSchema(Number(target.dataset.line), target.dataset.schema ?? '')
      else this.cb.onJumpToLine(Number(target.dataset.line))
    })
    // Annulla e Ripeti anche da qui (nella vista Anteprima l'editor non si vede): dopo le frecce il fuoco è su una freccia.
    this.el.addEventListener('keydown', (ev) => {
      if (!(ev.ctrlKey || ev.metaKey) || ev.altKey) return
      const key = ev.key.toLowerCase()
      if (key !== 'z' && key !== 'y') return
      const target = ev.target as HTMLElement
      if (target.closest('input, textarea, select, [contenteditable]')) return
      ev.preventDefault()
      this.undo(key === 'y' || ev.shiftKey, target)
    })
  }

  /** Il tema di schemi e grafici: cambiandolo si ridisegnano. */
  setTheme(theme: Theme): void {
    if (theme === this.theme) return
    this.theme = theme
    const source = this.lastSource
    this.lastSource = null
    if (source !== null) this.update(source, true)
  }

  /** La nota mostrata ha cambiato id (con l'account): si ridisegna, così gli slider usano quello nuovo. */
  rescope(): void {
    const source = this.lastSource
    this.lastSource = null
    if (source !== null) this.update(source, true)
  }

  /** L'anteprima segue l'editor che scorre: sì nella vista divisa, no nella vista Anteprima. */
  setFollow(follow: boolean): void {
    this.follow = follow
  }

  /** Si torna all'editor (o si cambia vista): l'anteprima lo segue di nuovo. */
  release(): void {
    this.held = false
  }

  /** Aggiorna l'anteprima (con un piccolo ritardo mentre si scrive). */
  update(source: string, immediate = false): void {
    // Prima di tutto via il ridisegno in attesa: scritto e annullato in un attimo, resterebbe il testo di mezzo.
    if (this.pending) clearTimeout(this.pending)
    this.pending = 0
    this.pendingRun = null
    if (source === this.lastSource) return
    const run = () => {
      this.lastSource = source
      this.totalLines = source.split('\n').length
      const scroll = this.el.scrollTop
      // I <details> aperti (le soluzioni da aprire) restano aperti, se sono ancora gli stessi.
      const open = [...this.content.querySelectorAll('details')].map((d) => d.open)
      this.content.innerHTML = renderMarkdown(source)
      const details = this.content.querySelectorAll('details')
      if (details.length === open.length) details.forEach((d, i) => (d.open = open[i]))
      const surface = getComputedStyle(this.el).backgroundColor
      hydrateSchemas(this.content, { theme: this.theme, surface, editable: true })
      hydrateGraphs(this.content, { theme: this.theme, surface, editable: true, scope: this.cb.scope?.() })
      this.el.scrollTop = scroll
      this.anchors = [...this.content.querySelectorAll<HTMLElement>('[data-line]')]
        .map((el) => ({ line: Number(el.dataset.line), el }))
        .sort((a, b) => a.line - b.line)
      if (this.syncTarget && this.follow && !this.held) this.syncTo(this.syncTarget.line, this.syncTarget.fraction)
    }
    if (immediate) run()
    else {
      this.pendingRun = run
      this.pending = window.setTimeout(() => this.flush(), source.length > 50_000 ? 350 : 120)
    }
  }

  /** Il ridisegno in attesa, subito. */
  flush(): void {
    const run = this.pendingRun
    if (this.pending) clearTimeout(this.pending)
    this.pending = 0
    this.pendingRun = null
    run?.()
  }

  /** Scorre l'anteprima alla riga `line` (1-based) dell'editor. */
  syncTo(line: number, fraction: number): void {
    this.syncTarget = { line, fraction }
    if (this.held || !this.anchors.length || !this.el.clientHeight) return
    const target = line - 1 + fraction
    let i = 0
    for (let j = 0; j < this.anchors.length; j++) {
      if (this.anchors[j].line <= target) i = j
      else break
    }
    const a = this.anchors[i]
    const b = this.anchors[i + 1]
    // Dall'inizio della parte che scorre: sopra c'è il bordo con i pulsanti volanti (clientTop).
    const base = this.el.getBoundingClientRect().top + this.el.clientTop - this.el.scrollTop
    const topA = a.el.getBoundingClientRect().top - base
    const topB = b ? b.el.getBoundingClientRect().top - base : this.el.scrollHeight
    const lineB = b ? b.line : this.totalLines
    const span = Math.max(1, lineB - a.line)
    const progress = Math.min(1, Math.max(0, (target - a.line) / span))
    const y = target < a.line ? 0 : topA + (topB - topA) * progress
    this.el.scrollTop = Math.max(0, y - 24)
  }

  /**
   * Una freccia ↑ ↓: il blocco si sposta nella nota, l'anteprima si ridisegna subito e scorre quanto
   * serve perché la freccia resti sotto il puntatore (o il dito), con il fuoco: come in Colab, si può
   * premere ancora.
   */
  private moveBlock(button: HTMLElement): void {
    this.arrowAt = performance.now()
    if (button.getAttribute('aria-disabled') === 'true') return
    // Righe e impronte vengono dal testo di prima: si ridisegna e basta.
    if (this.pendingRun) {
      this.flush()
      return
    }
    const block = button.closest<HTMLElement>('.graph-block, .schema-block')
    if (!block) return
    const kind: BlockKind = block.classList.contains('graph-block') ? 'grafico' : 'schema'
    const dir = button.dataset.dir === 'up' ? 'up' : 'down'
    const top = { button: button.getBoundingClientRect().top, block: block.getBoundingClientRect().top }
    const defs = block.dataset.defs
    const line = this.cb.onMoveBlock(kind, Number(block.dataset.line), block.dataset.hash ?? '', dir)
    if (line === null) return
    this.held = true
    this.flush()
    const moved = this.findBlock(kind, line)
    if (!moved || hidden(moved)) {
      // Lì non si vedrebbe: dell'HTML scritto nella nota (un «<!--» senza la fine, un <details> chiuso)
      // nasconde quello che c'è dopo o dentro. Lo spostamento si annulla.
      this.cb.onUndo(false)
      this.flush()
      toast(`${kind === 'grafico' ? 'Il grafico' : 'Lo schema'} lì non si vedrebbe: lo nasconde l'HTML scritto nella nota (per esempio un commento «<!--» senza la fine, o un <details> chiuso).`, 'error')
      return
    }
    const arrow = moved.querySelector<HTMLElement>(`.block-move[data-dir="${dir}"]`)
    // Il blocco è lo stesso, quindi la freccia sta allo stesso punto del blocco.
    const anchor = arrow ?? moved
    const before = arrow ? top.button : top.block
    const keep = () => {
      this.el.scrollTop += anchor.getBoundingClientRect().top - before
    }
    keep()
    requestAnimationFrame(keep)
    arrow?.focus({ preventScroll: true })
    this.markMoved(moved)
    this.announce(`${kind === 'grafico' ? 'Grafico' : 'Schema'} spostato più ${dir === 'up' ? 'su' : 'giù'}`)
    if (kind === 'grafico') this.warnLostDefinitions(defs, moved.dataset.defs)
  }

  private findBlock(kind: BlockKind, line: number): HTMLElement | null {
    return this.content.querySelector<HTMLElement>(`.${kind === 'grafico' ? 'graph' : 'schema'}-block[data-line="${line}"]`)
  }

  /** Annulla o Ripeti dall'anteprima; se il fuoco era su una freccia, torna sulla freccia dello stesso blocco. */
  private undo(redo: boolean, target: HTMLElement): void {
    const arrow = target.closest<HTMLElement>('.block-move')
    const block = arrow?.closest<HTMLElement>('.graph-block, .schema-block')
    this.cb.onUndo(redo)
    this.held = true
    this.flush()
    if (!arrow || !block) return
    // Lo stesso blocco: la stessa impronta, il più vicino alla riga di prima.
    const line = Number(block.dataset.line)
    const same = [...this.content.querySelectorAll<HTMLElement>(`.${block.classList.contains('graph-block') ? 'graph' : 'schema'}-block`)]
      .filter((b) => b.dataset.hash === block.dataset.hash)
      .sort((a, b) => Math.abs(Number(a.dataset.line) - line) - Math.abs(Number(b.dataset.line) - line))[0]
    const next = same?.querySelector<HTMLElement>(`.block-move[data-dir="${arrow.dataset.dir}"]`)
    if (!same || !next) return
    next.focus({ preventScroll: true })
    same.scrollIntoView({ block: 'nearest' })
    this.markMoved(same)
  }

  /** Il segno sul blocco appena spostato (e i suoi pulsanti restano visibili). */
  private markMoved(block: HTMLElement): void {
    if (this.justMoved) {
      clearTimeout(this.justMoved.timer)
      this.justMoved.el.classList.remove('just-moved')
    }
    block.classList.add('just-moved')
    const timer = window.setTimeout(() => {
      block.classList.remove('just-moved')
      this.justMoved = null
    }, JUST_MOVED_MS)
    this.justMoved = { el: block, timer }
  }

  private announce(message: string): void {
    // Svuotato prima, così lo stesso messaggio due volte si sente due volte.
    this.live.textContent = ''
    window.setTimeout(() => (this.live.textContent = message), 50)
  }

  /**
   * Le definizioni valgono per quello che viene dopo: portato sopra $a = 2$, il grafico non ha più a.
   * Si avvisa (Ctrl+Z lo riporta dov'era).
   */
  private warnLostDefinitions(before: string | undefined, after: string | undefined): void {
    const read = (json: string | undefined): string[] => {
      try {
        const list: unknown = JSON.parse(json ?? '[]')
        return Array.isArray(list) ? list.filter((d): d is string => typeof d === 'string') : []
      } catch {
        return []
      }
    }
    const now = new Set(read(after))
    const names = [...new Set(read(before).filter((d) => !now.has(d)).map((d) => d.split(/[(=]/)[0].replace(/\\/g, '').trim()).filter(Boolean))]
    if (!names.length) return
    const list = names.length === 1 ? names[0] : `${names.slice(0, -1).join(', ')} e ${names[names.length - 1]}`
    toast(`Il grafico ora sta sopra ${names.length === 1 ? 'la definizione' : 'le definizioni'} di ${list}: le definizioni valgono per quello che viene dopo. Ctrl+Z lo riporta dov'era.`)
  }
}
