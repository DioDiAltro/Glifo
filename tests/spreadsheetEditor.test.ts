// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { openSheetEditor } from '../src/spreadsheet/editor'
import { parseSheet } from '../src/spreadsheet/model'

// jsdom non ha le finestre modali, lo scorrimento e il disegno su canvas.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.open = true
}
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  this.open = false
  this.dispatchEvent(new Event('close'))
}
Element.prototype.scrollIntoView ??= function () {}
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', { value: () => null, configurable: true })

afterEach(() => {
  // «Fatto» chiude l'editor e toglie i suoi ascoltatori dalla finestra.
  for (const button of document.querySelectorAll<HTMLButtonElement>('dialog.sheet-editor button')) {
    if (button.textContent?.trim() === 'Fatto') button.click()
  }
  document.body.replaceChildren()
})

function open(source: string) {
  void openSheetEditor({ sheet: parseSheet(source), onSave: () => {} })
  const input = document.querySelector<HTMLInputElement>('.sheet-cell-input')!
  const grid = document.querySelector<HTMLElement>('.sheet-grid-wrap')!
  const cell = (row: number, col: number) => document.getElementById(`sheet-${row}-${col}`)!
  return { input, grid, cell }
}

function touch(target: Element, type: 'pointerdown' | 'pointercancel'): void {
  target.dispatchEvent(new PointerEvent(type, { pointerType: 'touch', button: 0, isPrimary: true, bubbles: true, cancelable: true }))
}

describe('editor delle tabelle sul telefono', () => {
  it('la scrittura resta aperta quando la finestra cambia misura, come quando si apre la tastiera', () => {
    const { input, grid, cell } = open('| a | 1 |')
    grid.dispatchEvent(new KeyboardEvent('keydown', { key: 'F2', bubbles: true, cancelable: true }))
    expect(document.activeElement).toBe(input)
    window.dispatchEvent(new Event('resize'))
    expect(input.hidden).toBe(false)
    expect(document.activeElement).toBe(input)
    input.value = 'ciao'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    expect(cell(0, 0).textContent).toBe('ciao')
  })

  it('un tocco sulla cella già scelta comincia a scriverci alla fine del tocco, anche se i clic finti spostano il fuoco', () => {
    const { input, grid, cell } = open('| a | 1 |')
    touch(cell(0, 1), 'pointerdown')
    cell(0, 1).dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    expect(input.hidden).toBe(true)
    touch(cell(0, 1), 'pointerdown')
    expect(input.hidden).toBe(true)
    // Sull'iPhone i clic del mouse che seguono il tocco mettono il fuoco sulla griglia prima del click.
    grid.focus()
    cell(0, 1).dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    expect(input.hidden).toBe(false)
    expect(document.activeElement).toBe(input)
    expect(input.value).toBe('1')
  })

  it('un dito che fa scorrere la tabella partendo dalla cella scelta non comincia a scrivere', () => {
    const { input, cell } = open('| a | 1 |')
    touch(cell(0, 0), 'pointerdown')
    touch(cell(0, 0), 'pointercancel')
    cell(0, 0).dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    expect(input.hidden).toBe(true)
  })
})
