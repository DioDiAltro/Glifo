/**
 * Il diagramma di Gantt e il reticolo nell'anteprima: i blocchi ```grafico con la riga `gantt:` o
 * `reticolo:` (vedi planBlock.ts) non sono un piano da spostare e ingrandire, ma un disegno fermo
 * con la legenda (il percorso critico, la durata del progetto) e gli errori, anche quelli della
 * tabella. Passando sopra un'attività si leggono i suoi tempi. Il Gantt è largo quanto
 * l'anteprima; il reticolo ha la sua misura e, se è più largo, si scorre di lato. «Scarica» dà la
 * figura chiara su bianco (PNG, SVG o copiata) e, nella propria nota, cambia il titolo.
 */
import { escapeHtml } from '../render/katex'
import { svgToPng } from '../schema/image'
import { downloadBlob, downloadText, fileNameFor } from '../store/files'
import { dialogShell } from '../ui/dialogs'
import { h } from '../ui/dom'
import { openMenu } from '../ui/menu'
import { moveButtonsHtml } from '../ui/moveButtons'
import { toast } from '../ui/toast'
import { planSwatchSvg } from './gantt'
import { labelHtml } from './labels'
import { readPlan } from './planBlock'
import { planFigure, planName, planPicture, type PlanPicture } from './planFigure'
import type { GraphLabels, GraphLook } from './preview'
import { PALETTES, type Palette } from './svg'
import type { PlanData } from '../spreadsheet/plan'

const DOWNLOAD = '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'

/** La larghezza del Gantt nell'anteprima: quella che c'è, entro certi limiti. */
function ganttWidth(available: number): number {
  return Math.round(Math.max(300, Math.min(980, available || 720)))
}

export class PlanView {
  private readonly source: string
  private readonly data: PlanData | null
  private readonly palette: Palette
  private readonly editable: boolean
  private width: number
  private picture: PlanPicture
  private readonly canvas: HTMLElement
  private readonly notes: HTMLElement
  private readonly stage: HTMLElement

  constructor(
    private readonly block: HTMLElement,
    look: GraphLook,
  ) {
    this.editable = !!look.editable
    this.source = block.dataset.graph ?? ''
    this.data = readPlan(block)
    this.palette = { ...PALETTES[look.theme], halo: look.surface || PALETTES[look.theme].halo }
    this.width = ganttWidth(block.clientWidth)
    this.picture = planPicture(this.source, this.data, this.palette, this.width)!
    const kind = this.picture.block.kind
    block.classList.add('is-plan', kind === 'gantt' ? 'is-gantt' : 'is-network')
    const title = this.picture.block.title ? `<div class="graph-title">${labelHtml(this.picture.block.title)}</div>` : ''
    const label = 'Scarica il disegno come immagine'
    const tool = `<button type="button" class="icon-button graph-tool" data-action="image" title="${label}" aria-label="${label}"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${DOWNLOAD}</svg></button>`
    const move = this.editable && block.dataset.move !== undefined ? moveButtonsHtml('grafico', block.dataset.move, block.dataset.moveIn === 'voce') : ''
    block.innerHTML = `${title}<div class="graph-stage"><div class="graph-frame"><div class="graph-canvas plan-canvas"></div></div><div class="graph-tools">${tool}${move}</div></div><div class="graph-notes"></div>`
    this.stage = block.querySelector<HTMLElement>('.graph-stage')!
    this.canvas = block.querySelector<HTMLElement>('.graph-canvas')!
    this.notes = block.querySelector<HTMLElement>('.graph-notes')!
    this.render()
    this.stage.addEventListener('click', (ev) => {
      const button = (ev.target as HTMLElement).closest<HTMLElement>('[data-action="image"]')
      if (button) this.openImageMenu(button, ev.detail === 0)
    })
    this.stage.querySelector('.graph-tools')!.addEventListener('dblclick', (ev) => ev.stopPropagation())
  }

  private render(): void {
    const { drawing } = this.picture
    // Il disegno è fatto da Glifo: i testi della tabella sono già passati da escapeXml.
    this.canvas.innerHTML = drawing?.svg ?? ''
    this.canvas.hidden = !drawing
    if (drawing && this.picture.block.kind === 'reticolo') {
      // Il reticolo ha la sua misura: se è poco più largo dell'anteprima si stringe un po', se no si scorre.
      const available = this.block.clientWidth - 2
      const fit = available > 0 && drawing.width > available && drawing.width * 0.8 <= available
      const svg = this.canvas.querySelector('svg')
      if (svg && fit) svg.style.width = `${available}px`
      this.stage.style.maxWidth = `${(fit ? available : drawing.width) + 2}px`
    } else this.stage.style.maxWidth = ''
    this.notes.innerHTML = this.legendHtml() + this.errorsHtml()
  }

  private legendHtml(): string {
    const legend = this.picture.legend
    if (!legend) return ''
    const swatch = (kind: Parameters<typeof planSwatchSvg>[0]) => `<svg class="plan-swatch" width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">${planSwatchSvg(kind, this.palette, 0, 0)}</svg>`
    const items = legend.items.map((i) => `<li>${swatch(i.swatch)}${escapeHtml(i.label)}</li>`).join('')
    const notes = legend.notes.map((n) => `<li>${escapeHtml(n)}</li>`).join('')
    return `<ul class="graph-legend">${items}</ul><ul class="plan-notes">${notes}</ul>`
  }

  private errorsHtml(): string {
    const errors = this.picture.errors
    if (!errors.length) return ''
    const first = Number(this.block.dataset.line)
    const rows = errors.map((e) => {
      if (e.row !== undefined) return `<li><strong>Tabella, riga ${e.row}</strong> — ${escapeHtml(e.message)}</li>`
      const where = Number.isFinite(first) ? `Riga ${first + (e.line ?? 0) + 2}` : `Riga ${(e.line ?? 0) + 1}`
      return `<li><strong>${where}</strong> <code>${escapeHtml(e.text ?? '')}</code> — ${escapeHtml(e.message)}</li>`
    })
    return `<ul class="graph-errors">${rows.join('')}</ul>`
  }

  private openImageMenu(anchor: HTMLElement, fromKeyboard: boolean): void {
    openMenu(
      anchor,
      [
        { label: 'Immagine PNG', run: () => void this.exportImage('png') },
        { label: 'Immagine SVG', run: () => void this.exportImage('svg') },
        { label: 'Copia come immagine', run: () => void this.exportImage('copy') },
        ...(this.editable ? ['sep' as const, { label: 'Titolo…', run: () => this.editTitle() }] : []),
      ],
      'Scarica il disegno',
      fromKeyboard,
    )
  }

  /** La figura chiara su bianco, con il titolo e la legenda. */
  figure(): string | null {
    return planFigure(this.source, this.data)
  }

  private async exportImage(kind: 'png' | 'svg' | 'copy'): Promise<void> {
    const svg = this.picture.drawing ? this.figure() : null
    if (!svg) {
      toast('Il disegno non c\'è ancora: prima sistema gli errori.')
      return
    }
    const name = (ext: string) => fileNameFor(planName(this.picture.block), ext)
    try {
      if (kind === 'svg') {
        if (await downloadText(name('.svg'), svg, 'image/svg+xml')) toast('Immagine SVG scaricata')
      } else if (kind === 'png') {
        downloadBlob(name('.png'), await svgToPng(svg, 2))
        toast('Immagine PNG scaricata')
      } else {
        if (typeof ClipboardItem === 'undefined' || !navigator.clipboard?.write) {
          toast('Questo browser non sa copiare le immagini: scaricala come PNG.', 'error')
          return
        }
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': svgToPng(svg, 2) })])
        toast('Immagine copiata: incollala dove vuoi (Word, Google Docs, le slide…)')
      }
    } catch {
      toast(kind === 'copy' ? 'L\'immagine non si è riuscita a copiare: scaricala come PNG.' : 'L\'immagine non si è riuscita a fare su questo browser: prova con l\'altro formato.', 'error')
    }
  }

  /** «Titolo…»: la riga `titolo:` del blocco (lo scrive src/ui/preview.ts, con l'evento `graph-labels`). */
  private editTitle(): void {
    const input = h('input', { class: 'prompt-input', attrs: { type: 'text', value: this.picture.block.title ?? '', placeholder: 'per esempio: Sviluppo del sito', autocomplete: 'off', spellcheck: 'false' } })
    const form = h(
      'form',
      {
        class: 'prompt-form graph-labels-form',
        on: {
          submit: (ev) => {
            ev.preventDefault()
            const labels: GraphLabels = { title: input.value.replace(/\s+/g, ' ').trim(), x: '', y: '' }
            this.block.dispatchEvent(new CustomEvent<GraphLabels>('graph-labels', { bubbles: true, detail: labels }))
            dialog.close()
          },
        },
      },
      h('label', { class: 'prompt-label' }, h('span', {}, 'Titolo'), input),
      h('p', { class: 'field-help' }, 'Si vede sopra il disegno e nelle immagini; vuoto, il titolo si toglie.'),
      h(
        'div',
        { class: 'dialog-actions' },
        h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => dialog.close() } }, 'Annulla'),
        h('button', { class: 'btn btn-primary', attrs: { type: 'submit' } }, 'Fatto'),
      ),
    )
    const dialog = dialogShell('Titolo', [form], 'dialog-prompt')
    dialog.showModal()
    input.focus()
  }

  /** L'anteprima è cambiata di larghezza: il Gantt si rifà alla misura nuova. */
  resize(): void {
    if (this.picture.block.kind !== 'gantt') {
      this.render()
      return
    }
    const width = ganttWidth(this.block.clientWidth)
    if (Math.abs(width - this.width) < 8) return
    this.width = width
    this.picture = planPicture(this.source, this.data, this.palette, this.width)!
    this.render()
  }

  redraw(): void {
    this.render()
  }
}
