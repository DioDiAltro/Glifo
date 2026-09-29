import { renderMarkdown } from '../render/markdown'
import { h } from './dom'

export interface PreviewCallbacks {
  /** Clic su una casella "- [ ]": riga (0-based) dell'elemento nel sorgente. */
  onToggleTask(line: number): void
  /** Doppio clic su un blocco: porta l'editor a quella riga (0-based). */
  onJumpToLine(line: number): void
}

/** Riquadro dell'anteprima: ridisegna il Markdown e segue lo scorrimento dell'editor. */
export class Preview {
  readonly el: HTMLElement
  readonly content: HTMLElement
  private pending = 0
  private lastSource: string | null = null
  private anchors: { line: number; el: HTMLElement }[] = []
  private totalLines = 1
  private syncTarget: { line: number; fraction: number } | null = null

  constructor(private readonly cb: PreviewCallbacks) {
    this.content = h('article', { class: 'markdown-body', attrs: { 'aria-label': 'Anteprima degli appunti' } })
    this.el = h('section', { class: 'preview-pane' }, this.content)
    this.content.addEventListener('change', (ev) => {
      const box = ev.target as HTMLInputElement
      if (box.classList.contains('task-checkbox')) {
        const line = Number(box.dataset.taskLine)
        if (line >= 0) this.cb.onToggleTask(line)
      }
    })
    this.content.addEventListener('dblclick', (ev) => {
      const target = (ev.target as HTMLElement).closest<HTMLElement>('[data-line]')
      if (target) this.cb.onJumpToLine(Number(target.dataset.line))
    })
  }

  /** Aggiorna l'anteprima (con un piccolo ritardo mentre si scrive). */
  update(source: string, immediate = false): void {
    if (source === this.lastSource) return
    if (this.pending) clearTimeout(this.pending)
    const run = () => {
      this.pending = 0
      this.lastSource = source
      this.totalLines = source.split('\n').length
      const scroll = this.el.scrollTop
      this.content.innerHTML = renderMarkdown(source)
      this.el.scrollTop = scroll
      this.anchors = [...this.content.querySelectorAll<HTMLElement>('[data-line]')]
        .map((el) => ({ line: Number(el.dataset.line), el }))
        .sort((a, b) => a.line - b.line)
      if (this.syncTarget) this.syncTo(this.syncTarget.line, this.syncTarget.fraction)
    }
    if (immediate) run()
    else this.pending = window.setTimeout(run, source.length > 50_000 ? 350 : 120)
  }

  /** Scorre l'anteprima alla riga `line` (1-based) dell'editor. */
  syncTo(line: number, fraction: number): void {
    this.syncTarget = { line, fraction }
    if (!this.anchors.length || !this.el.clientHeight) return
    const target = line - 1 + fraction
    let i = 0
    for (let j = 0; j < this.anchors.length; j++) {
      if (this.anchors[j].line <= target) i = j
      else break
    }
    const a = this.anchors[i]
    const b = this.anchors[i + 1]
    const base = this.el.getBoundingClientRect().top - this.el.scrollTop
    const topA = a.el.getBoundingClientRect().top - base
    const topB = b ? b.el.getBoundingClientRect().top - base : this.el.scrollHeight
    const lineB = b ? b.line : this.totalLines
    const span = Math.max(1, lineB - a.line)
    const progress = Math.min(1, Math.max(0, (target - a.line) / span))
    const y = target < a.line ? 0 : topA + (topB - topA) * progress
    this.el.scrollTop = Math.max(0, y - 24)
  }
}
