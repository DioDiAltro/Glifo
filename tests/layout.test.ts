// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  EDITOR_SHARE,
  LAYOUT_KEY,
  loadPaneSizes,
  NOTES_WIDTH,
  savePaneSizes,
  SYMBOLS_WIDTH,
  validSize,
  type PaneSizes,
} from '../src/store/layout'
import { editorShare, KEY_STEP, PANE_MIN, PaneResizer, panelWidth, type ResizableParts } from '../src/ui/resize'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.className = ''
})

describe('misure delle sezioni salvate', () => {
  it('senza niente di salvato valgono quelle di partenza', () => {
    expect(loadPaneSizes()).toEqual({ notesWidth: 270, symbolsWidth: 348, editorShare: 0.5 })
  })

  it('una misura salvata male torna dentro i limiti, o a quella di partenza', () => {
    localStorage.setItem(LAYOUT_KEY, JSON.stringify({ notesWidth: 9999, symbolsWidth: 'larga', editorShare: 0.01 }))
    expect(loadPaneSizes()).toEqual({ notesWidth: NOTES_WIDTH.max, symbolsWidth: SYMBOLS_WIDTH.initial, editorShare: EDITOR_SHARE.min })
    for (const broken of ['[300]', '{rotto', 'null', '42']) {
      localStorage.setItem(LAYOUT_KEY, broken)
      expect(loadPaneSizes()).toEqual({ notesWidth: 270, symbolsWidth: 348, editorShare: 0.5 })
    }
    expect(validSize(Number.NaN, NOTES_WIDTH)).toBe(NOTES_WIDTH.initial)
    expect(validSize(Infinity, NOTES_WIDTH)).toBe(NOTES_WIDTH.initial)
    expect(validSize(321, NOTES_WIDTH)).toBe(321)
  })

  it('due finestre che cambiano misure diverse non si cancellano a vicenda', () => {
    savePaneSizes({ notesWidth: 300 })
    savePaneSizes({ symbolsWidth: 400 })
    expect(loadPaneSizes()).toEqual({ notesWidth: 300, symbolsWidth: 400, editorShare: 0.5 })
  })

  it('non finiscono tra le impostazioni (che con l\'account vanno sugli altri dispositivi)', () => {
    savePaneSizes({ notesWidth: 300 })
    expect(localStorage.getItem('glifo.settings.v1')).toBeNull()
  })
})

describe('spostando un bordo', () => {
  it('un pannello resta tra il minimo e il massimo', () => {
    expect(panelWidth(100, 250, 1000, NOTES_WIDTH)).toBe(NOTES_WIDTH.min)
    expect(panelWidth(900, 250, 1000, NOTES_WIDTH)).toBe(NOTES_WIDTH.max)
    expect(panelWidth(300.4, 250, 1000, NOTES_WIDTH)).toBe(300)
  })

  it('un pannello non toglie al testo più posto di quello che c\'è', () => {
    expect(panelWidth(400, 250, 100, NOTES_WIDTH)).toBe(350)
    // Senza posto si può solo stringere.
    expect(panelWidth(400, 250, 0, NOTES_WIDTH)).toBe(250)
    expect(panelWidth(230, 250, 0, NOTES_WIDTH)).toBe(230)
    // Se al testo ne manca, il pannello glielo restituisce, ma non sotto il suo minimo.
    expect(panelWidth(250, 250, -40, NOTES_WIDTH)).toBe(210)
    expect(panelWidth(250, 250, -500, NOTES_WIDTH)).toBe(NOTES_WIDTH.min)
  })

  it('nella vista divisa testo e anteprima restano larghi almeno PANE_MIN', () => {
    expect(editorShare(500, 1000)).toBe(0.5)
    expect(editorShare(333.3333, 1000)).toBe(0.333)
    expect(editorShare(0, 1000)).toBe(PANE_MIN / 1000)
    expect(editorShare(1000, 1000)).toBe(1 - PANE_MIN / 1000)
    // Con tanto posto valgono i limiti in percentuale.
    expect(editorShare(-Infinity, 3000)).toBe(EDITOR_SHARE.min)
    expect(editorShare(Infinity, 3000)).toBe(EDITOR_SHARE.max)
    // Troppo stretto per tutti e due, o niente da misurare: metà e metà.
    expect(editorShare(100, 400)).toBe(0.5)
    expect(editorShare(100, 0)).toBe(0.5)
    expect(editorShare(100, Number.NaN)).toBe(0.5)
  })
})

describe('i bordi tra le sezioni', () => {
  /** Le sezioni con le larghezze che avrebbero sulla pagina (jsdom non le calcola). */
  function setup(widths: Record<keyof ResizableParts, number>, sizes: PaneSizes = loadPaneSizes()) {
    const section = (width: number) => {
      const el = document.createElement('section')
      el.getBoundingClientRect = () => ({ width }) as DOMRect
      return el
    }
    const parts: ResizableParts = {
      notes: section(widths.notes),
      editor: section(widths.editor),
      preview: section(widths.preview),
      symbols: section(widths.symbols),
    }
    const save = vi.fn()
    const resizer = new PaneResizer(parts, sizes, save)
    document.body.replaceChildren(resizer.notesHandle, resizer.splitHandle, resizer.symbolsHandle)
    return { parts, save, resizer }
  }

  const pointer = (type: string, clientX: number, pointerId = 1) =>
    new PointerEvent(type, { clientX, pointerId, button: 0, isPrimary: true, bubbles: true, cancelable: true })

  function drag(handle: HTMLElement, from: number, ...to: number[]): void {
    handle.dispatchEvent(pointer('pointerdown', from))
    for (const x of to) handle.dispatchEvent(pointer('pointermove', x))
    handle.dispatchEvent(pointer('pointerup', to.at(-1) ?? from))
  }

  const key = (handle: HTMLElement, name: string) => handle.dispatchEvent(new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true }))
  const style = (el: HTMLElement, name: string) => el.style.getPropertyValue(name)

  it('all\'inizio passano al CSS le misure salvate', () => {
    const { parts, resizer } = setup({ notes: 250, editor: 400, preview: 400, symbols: 348 }, { notesWidth: 300, symbolsWidth: 400, editorShare: 0.4 })
    expect(style(parts.notes, '--notes-size')).toBe('300px')
    expect(style(parts.symbols, '--symbols-size')).toBe('400px')
    expect(style(parts.editor, '--split-grow')).toBe('400')
    expect(style(parts.preview, '--split-grow')).toBe('600')
    expect(resizer.notesHandle.getAttribute('role')).toBe('separator')
    expect(resizer.splitHandle.getAttribute('aria-valuetext')).toBe('testo 40%, anteprima 60%')
  })

  it('trascinando il bordo l\'elenco degli appunti si allarga, e la misura si salva alla fine', () => {
    const { parts, save, resizer } = setup({ notes: 250, editor: 500, preview: 500, symbols: 348 })
    resizer.notesHandle.dispatchEvent(pointer('pointerdown', 250))
    expect(document.documentElement.classList.contains('is-resizing')).toBe(true)
    resizer.notesHandle.dispatchEvent(pointer('pointermove', 300))
    resizer.notesHandle.dispatchEvent(pointer('pointermove', 330))
    expect(style(parts.notes, '--notes-size')).toBe('330px')
    expect(save).not.toHaveBeenCalled()
    resizer.notesHandle.dispatchEvent(pointer('pointerup', 330))
    expect(save).toHaveBeenCalledExactlyOnceWith({ notesWidth: 330 })
    expect(resizer.notesHandle.getAttribute('aria-valuenow')).toBe('330')
    expect(document.documentElement.classList.contains('is-resizing')).toBe(false)
    // Dopo la fine il bordo non segue più il puntatore.
    resizer.notesHandle.dispatchEvent(pointer('pointermove', 400))
    expect(style(parts.notes, '--notes-size')).toBe('330px')
  })

  it('il pannello dei simboli si allarga trascinando verso sinistra', () => {
    const { parts, save, resizer } = setup({ notes: 250, editor: 500, preview: 500, symbols: 348 })
    drag(resizer.symbolsHandle, 1100, 1060)
    expect(style(parts.symbols, '--symbols-size')).toBe('388px')
    expect(save).toHaveBeenCalledExactlyOnceWith({ symbolsWidth: 388 })
  })

  it('il bordo tra testo e anteprima cambia la parte di ciascuno', () => {
    const { parts, save, resizer } = setup({ notes: 250, editor: 400, preview: 400, symbols: 348 })
    drag(resizer.splitHandle, 650, 700, 730)
    expect(style(parts.editor, '--split-grow')).toBe('600')
    expect(style(parts.preview, '--split-grow')).toBe('400')
    expect(save).toHaveBeenCalledExactlyOnceWith({ editorShare: 0.6 })
  })

  it('allargando un pannello testo e anteprima restano larghi almeno PANE_MIN', () => {
    // Al centro ci sono 500 pixel: se ne possono togliere 60.
    const { parts, resizer } = setup({ notes: 250, editor: 250, preview: 250, symbols: 348 })
    drag(resizer.notesHandle, 250, 600)
    expect(style(parts.notes, '--notes-size')).toBe('310px')
  })

  it('senza spostarsi, o con un altro dito, non cambia niente', () => {
    const { parts, save, resizer } = setup({ notes: 250, editor: 500, preview: 500, symbols: 348 })
    drag(resizer.notesHandle, 250)
    resizer.notesHandle.dispatchEvent(pointer('pointerdown', 250))
    resizer.notesHandle.dispatchEvent(pointer('pointermove', 400, 2))
    resizer.notesHandle.dispatchEvent(pointer('pointerup', 400, 2))
    expect(style(parts.notes, '--notes-size')).toBe(`${NOTES_WIDTH.initial}px`)
    resizer.notesHandle.dispatchEvent(pointer('pointerup', 250))
    expect(save).not.toHaveBeenCalled()
  })

  it('con un doppio clic torna la misura di partenza', () => {
    const { parts, save, resizer } = setup({ notes: 400, editor: 500, preview: 500, symbols: 500 }, { notesWidth: 400, symbolsWidth: 500, editorShare: 0.3 })
    for (const handle of [resizer.notesHandle, resizer.splitHandle, resizer.symbolsHandle]) handle.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
    expect(style(parts.notes, '--notes-size')).toBe(`${NOTES_WIDTH.initial}px`)
    expect(style(parts.symbols, '--symbols-size')).toBe('348px')
    expect(style(parts.editor, '--split-grow')).toBe('500')
    expect(save.mock.calls).toEqual([[{ notesWidth: NOTES_WIDTH.initial }], [{ editorShare: 0.5 }], [{ symbolsWidth: 348 }]])
    // Se è già quella, non c'è niente da salvare.
    resizer.notesHandle.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
    expect(save).toHaveBeenCalledTimes(3)
  })

  it('si usano anche da tastiera: frecce, Inizio e Fine', () => {
    const { parts, save, resizer } = setup({ notes: 250, editor: 500, preview: 500, symbols: 348 })
    key(resizer.notesHandle, 'ArrowRight')
    expect(style(parts.notes, '--notes-size')).toBe(`${250 + KEY_STEP}px`)
    // A destra il pannello dei simboli si stringe.
    key(resizer.symbolsHandle, 'ArrowRight')
    expect(style(parts.symbols, '--symbols-size')).toBe(`${348 - KEY_STEP}px`)
    key(resizer.symbolsHandle, 'Home')
    expect(style(parts.symbols, '--symbols-size')).toBe(`${SYMBOLS_WIDTH.min}px`)
    key(resizer.notesHandle, 'End')
    expect(style(parts.notes, '--notes-size')).toBe(`${NOTES_WIDTH.max}px`)
    expect(save).toHaveBeenCalledTimes(4)
    // Gli altri tasti restano agli altri.
    expect(key(resizer.notesHandle, 'a')).toBe(true)
    expect(key(resizer.notesHandle, 'ArrowUp')).toBe(true)
    expect(save).toHaveBeenCalledTimes(4)
  })
})
