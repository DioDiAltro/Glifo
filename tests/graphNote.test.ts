// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { renderMarkdown } from '../src/render/markdown'
import { hydrateGraphs } from '../src/graph/preview'
import { graphImage, graphImagesFor, graphsForFile, graphsFromFile } from '../src/graph/file'
import { acceptCalcResult, calcPlugin, calcResults } from '../src/editor/calcResults'
import { formulaAtCursor, insertGraphBlock } from '../src/editor/graphInsert'
import { mathMarkdown } from '../src/editor/mathSyntax'
import { fullyParsed } from './support/editorState'

// CodeMirror misura il testo sullo schermo: in jsdom bastano misure vuote.
Range.prototype.getClientRects = () => [] as unknown as DOMRectList
Range.prototype.getBoundingClientRect = () => new DOMRect()

const r = String.raw
let view: EditorView | null = null

afterEach(() => {
  view?.destroy()
  view = null
  document.body.replaceChildren()
})

function makeView(doc: string, cursor = doc.length): EditorView {
  const state = fullyParsed(
    EditorState.create({ doc, selection: { anchor: cursor }, extensions: [markdown({ base: markdownLanguage, extensions: [mathMarkdown] }), calcPlugin] }),
  )
  view = new EditorView({ state, parent: document.body.appendChild(document.createElement('div')) })
  return view
}

function preview(src: string): HTMLElement {
  const host = document.createElement('div')
  host.innerHTML = renderMarkdown(src)
  document.body.append(host)
  return host
}

const frame = () => new Promise((done) => requestAnimationFrame(() => done(null)))

describe('i risultati dopo «=»', () => {
  it('nell\'anteprima si vedono, colorati, con le definizioni scritte prima', () => {
    const host = preview(r`Sia $a = 3$ e $b = 4$: $\sqrt{a^2 + b^2} =$ e $$\frac{1}{3} + \frac{1}{6} =$$`)
    const results = [...host.querySelectorAll('.calc-result')].map((el) => el.textContent?.trim())
    expect(results[0]).toContain('5')
    expect(host.querySelectorAll('.calc-result')).toHaveLength(2)
    // Una formula sbagliata o senza risultato resta com'è.
    expect(preview('$x + 1 =$').querySelector('.calc-result')).toBeNull()
  })

  it('nell\'editor compaiono dopo l\'«=», e Tab li scrive nella formula', () => {
    const doc = r`$a = 2$ e $a^{10} =$ fine`
    const v = makeView(doc, doc.indexOf('=$') + 1)
    expect(calcResults(v.state, v.state.doc.length).map((x) => x.tex)).toEqual(['1024'])
    expect(v.dom.querySelector('.cm-calc-result')?.textContent).toContain('1024')
    expect(v.dom.querySelector('.cm-calc-result kbd')?.textContent).toBe('Tab')
    expect(acceptCalcResult(v)).toBe(true)
    expect(v.state.doc.toString()).toBe(r`$a = 2$ e $a^{10} = 1024$ fine`)
    // Il cursore passa dopo la formula.
    expect(v.state.selection.main.head).toBe(r`$a = 2$ e $a^{10} = 1024$`.length)
    expect(v.dom.querySelector('.cm-calc-result')).toBeNull()
  })

  it('Tab altrove fa il solito; gli spazi dopo l\'«=» lasciano il posto al risultato', () => {
    const v = makeView('$2 + 2 = $ e poi', 3)
    expect(acceptCalcResult(v)).toBe(false)
    v.dispatch({ selection: { anchor: '$2 + 2 = '.length } })
    expect(acceptCalcResult(v)).toBe(true)
    expect(v.state.doc.toString()).toBe('$2 + 2 = 4$ e poi')
  })

  it('anche nelle formule a blocco su più righe, prima dell\'a capo', () => {
    const v = makeView('$$\n\\int_0^1 2x \\, dx =\n$$\n', 5)
    v.dispatch({ selection: { anchor: '$$\n\\int_0^1 2x \\, dx ='.length } })
    expect(acceptCalcResult(v)).toBe(true)
    expect(v.state.doc.toString()).toBe('$$\n\\int_0^1 2x \\, dx = 1\n$$\n')
  })
})

describe('i grafici nell\'anteprima', () => {
  it('il blocco ```grafico lascia il posto al disegno, con le definizioni della nota che usa', () => {
    const host = preview('Sia $a = 2$, $c = 5$ e $f(x) = a x^2$.\n\n```grafico\ny = f(x)\n```\n\nDopo $a = 7$.')
    const block = host.querySelector<HTMLElement>('.graph-block')!
    expect(block.dataset.line).toBe('2')
    expect(block.dataset.graph).toBe('y = f(x)')
    expect(JSON.parse(block.dataset.defs!)).toEqual(['a = 2', 'f(x) = a x^2'])
    expect(host.querySelector('pre')).toBeNull()
  })

  it('disegna il grafico con la legenda; gli errori dicono la riga della nota', () => {
    const host = preview('# Titolo\n\n```grafico\ny = x^2\ny = x^\nP = (1, 1)\n```\n')
    hydrateGraphs(host, { theme: 'light', surface: '#fff' })
    const block = host.querySelector<HTMLElement>('.graph-block')!
    expect(block.querySelector('svg.graph-svg')).not.toBeNull()
    expect(block.querySelectorAll('.graph-legend li')).toHaveLength(2)
    expect(block.querySelector('.graph-legend .katex')).not.toBeNull()
    expect(block.querySelector('.graph-legend .graph-coords')?.textContent).toBe('(1; 1)')
    const error = block.querySelector('.graph-errors li')!.textContent!
    expect(error).toContain('Riga 5')
    expect(error).toContain('y = x^')
    expect(error).toContain('Manca l\'esponente')
  })

  it('un blocco vuoto dice cosa scrivere', () => {
    const host = preview('```grafico\n```\n')
    hydrateGraphs(host, { theme: 'dark', surface: '#000' })
    expect(host.querySelector('.graph-hint')?.textContent).toContain('y = x^2')
  })

  it('i pulsanti ingrandiscono e riportano alla vista di partenza, che resta anche ridisegnando', async () => {
    const src = '```grafico\ny = x\nx \\in [-4, 4]\n```\n'
    const host = preview(src)
    hydrateGraphs(host, { theme: 'light', surface: '#fff' })
    const block = host.querySelector<HTMLElement>('.graph-block')!
    const labels = () => [...block.querySelectorAll('svg text')].map((t) => t.textContent)
    const reset = block.querySelector<HTMLButtonElement>('[data-action="reset"]')!
    expect(reset.hidden).toBe(true)
    expect(labels()).toContain('−3')
    block.querySelector<HTMLButtonElement>('[data-action="in"]')!.click()
    await frame()
    expect(labels()).not.toContain('−3')
    expect(reset.hidden).toBe(false)
    // L'anteprima si ridisegna mentre si scrive: lo zoom resta.
    const again = preview(src)
    hydrateGraphs(again, { theme: 'light', surface: '#fff' })
    expect([...again.querySelectorAll('svg text')].map((t) => t.textContent)).not.toContain('−3')
    again.querySelector<HTMLButtonElement>('[data-action="reset"]')!.click()
    await frame()
    expect([...again.querySelectorAll('svg text')].map((t) => t.textContent)).toContain('−3')
  })
})

describe('il pulsante «Grafico» e la formula sotto il cursore', () => {
  it('con il cursore su una funzione la riconosce, con le definizioni di prima', () => {
    const doc = r`$a = 2$ poi $f(x) = a x + 1$ e $b = 3$`
    const v = makeView(doc, doc.indexOf('a x'))
    expect(formulaAtCursor(v)).toEqual({ tex: 'f(x) = a x + 1', defs: ['a = 2'], to: doc.indexOf(' e $b') })
    v.dispatch({ selection: { anchor: doc.length - 2 } })
    expect(formulaAtCursor(v)).toBeNull()
  })

  it('mette il grafico su righe sue, dopo la riga della formula', () => {
    const doc = 'Sia $y = x^2$ la parabola.\nAltro'
    const v = makeView(doc, 6)
    const f = formulaAtCursor(v)!
    insertGraphBlock(v, f.tex, f.to)
    expect(v.state.doc.toString()).toBe('Sia $y = x^2$ la parabola.\n\n```grafico\ny = x^2\n```\n\nAltro')
  })

  it('su una riga vuota sotto un testo lascia una riga vuota prima del blocco', () => {
    const v = makeView('Testo\n')
    insertGraphBlock(v, null)
    expect(v.state.doc.toString()).toBe('Testo\n\n```grafico\ny = \n```\n')
  })

  it('senza una funzione prepara il blocco con «y = », con il cursore lì; mai dentro un altro blocco di codice', () => {
    const v = makeView('```python\nprint(1)\n```\n', 12)
    insertGraphBlock(v, null)
    const text = v.state.doc.toString()
    expect(text).toBe('```python\nprint(1)\n```\n\n```grafico\ny = \n```\n\n')
    expect(v.state.selection.main.head).toBe(text.indexOf('y = ') + 4)
  })
})

describe('i grafici nei file .md', () => {
  it('diventano immagini con il testo nascosto, e tornano blocchi riaprendo il file', () => {
    const text = 'Prima\n\n```grafico\ny = x^2\n% x --> 0\n```\n\nDopo'
    const saved = graphsForFile(text, graphImagesFor(text))
    expect(saved).toMatch(/^Prima\n\n!\[Grafico\]\(data:image\/svg\+xml;base64,[A-Za-z0-9+/=]+\)\n<!-- glifo-grafico · /)
    expect(saved).toContain('% x --&gt; 0')
    expect(saved).not.toContain('```')
    expect(graphsFromFile(saved)).toBe(text)
  })

  it('l\'immagine ha il disegno e la legenda in MathML, ed è un SVG valido', () => {
    const svg = graphImage('y = \\frac{x}{2}\nP = (1, 2)')
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml')
    expect(doc.querySelector('parsererror')).toBeNull()
    expect(svg).toContain('<foreignObject')
    expect(svg).toContain('<math')
    expect(svg).toContain('fill="#ffffff"')
  })

  it('i grafici nel file usano le definizioni della nota', () => {
    const text = '$k = 3$\n\n```grafico\ny = k\n```\n'
    const images = graphImagesFor(text)
    expect([...images.keys()]).toEqual([2])
    // La retta y = 3 c'è: nessun errore «k non è definita» (l'immagine ha la curva).
    expect(images.get(2)).toContain('data-item="0"')
  })
})
