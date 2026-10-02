// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { renderMarkdown } from '../src/render/markdown'
import { hydrateGraphs } from '../src/graph/preview'
import { graphImage, graphImagesFor, graphsForFile, graphsFromFile } from '../src/graph/file'
import { acceptCalcResult, calcPlugin, calcResults } from '../src/editor/calcResults'
import { addToGraphBlock, formulaAtCursor, insertGraphBlock } from '../src/editor/graphInsert'
import { mathMarkdown } from '../src/editor/mathSyntax'
import { Preview } from '../src/ui/preview'
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
const frames = async (n: number) => {
  for (let i = 0; i < n; i++) await frame()
}
const light = { theme: 'light', surface: '#fff' } as const

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

  it('l\'area di un integrale ha nella legenda la sua velatura e il valore', () => {
    const host = preview('```grafico\n' + r`\int_0^2 x^2 \, dx` + '\n```\n')
    hydrateGraphs(host, light)
    const block = host.querySelector<HTMLElement>('.graph-block')!
    expect(block.querySelector('svg path[data-area="0"]')).not.toBeNull()
    expect(block.querySelector('svg path[data-item="0"]')).not.toBeNull()
    const legend = block.querySelector('.graph-legend li')!
    expect(legend.querySelector('.graph-swatch.is-area')).not.toBeNull()
    expect(legend.textContent).toContain('2,666666')
    expect(block.querySelector('.graph-errors')).toBeNull()
  })

  it('un grafico 3D: superfici e punti nella legenda; si gira trascinandolo e torna alla vista di partenza', async () => {
    const host = preview('```grafico\nz = x^2 - y^2\nP = (1, 2, 3)\n```\n')
    hydrateGraphs(host, light)
    const block = host.querySelector<HTMLElement>('.graph-block')!
    expect(block.classList.contains('is-space')).toBe(true)
    const canvas = block.querySelector<HTMLElement>('.graph-canvas')!
    expect(canvas.querySelector('svg.graph-3d')).not.toBeNull()
    const legend = [...block.querySelectorAll('.graph-legend li')]
    expect(legend[0].querySelector('.graph-swatch.is-surface')).not.toBeNull()
    expect(legend[1].querySelector('.graph-coords')?.textContent).toBe('(1; 2; 3)')
    const reset = block.querySelector<HTMLButtonElement>('[data-action="reset"]')!
    expect(reset.hidden).toBe(true)
    const before = canvas.innerHTML
    canvas.setPointerCapture = () => {}
    const pointer = (type: string, x: number) => canvas.dispatchEvent(new PointerEvent(type, { pointerId: 1, pointerType: 'mouse', button: 0, clientX: x, clientY: 10, bubbles: true }))
    pointer('pointerdown', 10)
    pointer('pointermove', 70)
    await frame()
    expect(canvas.innerHTML).not.toBe(before)
    expect(reset.hidden).toBe(false)
    pointer('pointerup', 70)
    await frame()
    reset.click()
    await frame()
    expect(canvas.innerHTML).toBe(before)
    expect(reset.hidden).toBe(true)
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

describe('gli slider sotto il grafico', () => {
  const NOTE = 'Sia $a = 2$.\n\n```grafico\ny = a x^2\nP = (a, a^2)\n```\n'
  const drawn = (src: string) => {
    const host = preview(src)
    hydrateGraphs(host, light)
    const block = host.querySelector<HTMLElement>('.graph-block')!
    const row = block.querySelector<HTMLElement>('.graph-slider')!
    const field = row.querySelector<HTMLInputElement>('.graph-slider-value')!
    return {
      block,
      row,
      input: row.querySelector<HTMLInputElement>('.graph-slider-input')!,
      field,
      value: () => field.value,
      /** Gli estremi accanto allo slider, in LaTeX. */
      ends: () => [...row.querySelectorAll('.graph-slider-end')].map((e) => e.querySelector('annotation')?.textContent),
      back: row.querySelector<HTMLButtonElement>('[data-action="written"]')!,
      play: row.querySelector<HTMLButtonElement>('[data-action="play"]')!,
      curve: () => block.querySelector('path[data-item="0"]')!.getAttribute('d'),
      point: () => block.querySelector('.graph-coords')!.textContent,
    }
  }
  const move = (input: HTMLInputElement, value: string) => {
    input.value = value
    input.dispatchEvent(new Event('input', { bubbles: true }))
  }
  const press = (field: HTMLInputElement, key: string) => field.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))

  it('ogni numero che il grafico usa ha il suo slider; trascinandolo il grafico cambia, la freccia torna al valore scritto', async () => {
    const g = drawn(NOTE)
    expect(g.block.querySelectorAll('.graph-slider')).toHaveLength(1)
    expect(g.row.querySelector('.graph-slider-label .katex')).not.toBeNull()
    expect([g.input.min, g.input.max, g.input.step, g.input.value]).toEqual(['-10', '10', '0.1', '2'])
    expect([g.value(), g.point(), g.back.disabled]).toEqual(['2', '(2; 4)', true])
    const written = g.curve()
    move(g.input, '3.5')
    await frame()
    expect([g.value(), g.point(), g.back.disabled]).toEqual(['3,5', '(3,5; 12,25)', false])
    expect(g.input.getAttribute('aria-valuetext')).toBe('3,5')
    expect(g.curve()).not.toBe(written)
    // L'anteprima si ridisegna mentre si scrive: lo slider resta dov'è.
    const again = drawn(NOTE)
    expect([again.value(), again.curve()]).toEqual(['3,5', g.curve()])
    again.back.click()
    await frame()
    expect([again.value(), again.point(), again.back.disabled, again.curve()]).toEqual(['2', '(2; 4)', true, written])
  })

  it('il valore si può scrivere: il grafico segue mentre si scrive, Invio lo tiene, Esc torna a prima', async () => {
    const g = drawn(NOTE)
    const written = g.curve()
    g.field.focus()
    // Scrivendo si sostituisce il numero di prima.
    expect([g.field.selectionStart, g.field.selectionEnd]).toEqual([0, 1])
    move(g.field, '1,')
    await frame()
    // Mentre si scrive la casella resta com'è (non diventa «1»), ma il grafico segue già.
    expect([g.value(), g.point()]).toEqual(['1,', '(1; 1)'])
    move(g.field, '1,5')
    await frame()
    expect([g.point(), g.input.value, g.value()]).toEqual(['(1,5; 2,25)', '1.5', '1,5'])
    press(g.field, 'Enter')
    expect(document.activeElement).not.toBe(g.field)
    expect([g.value(), g.back.disabled]).toEqual(['1,5', false])
    // Esc rimette il valore di prima.
    g.field.focus()
    move(g.field, '3')
    await frame()
    expect(g.point()).toBe('(3; 9)')
    press(g.field, 'Escape')
    await frame()
    expect([g.value(), g.point(), document.activeElement === g.field]).toEqual(['1,5', '(1,5; 2,25)', false])
    // Non è un numero: con Invio la casella diventa rossa e resta lì; uscendo torna il valore.
    g.field.focus()
    move(g.field, 'abc')
    press(g.field, 'Enter')
    expect([g.field.getAttribute('aria-invalid'), document.activeElement === g.field]).toEqual(['true', true])
    g.field.blur()
    expect([g.value(), g.field.hasAttribute('aria-invalid')]).toEqual(['1,5', false])
    // Anche π/2 o 1/3; uscendo dalla casella vale come Invio.
    g.field.focus()
    move(g.field, '\\pi/2')
    g.field.blur()
    expect(g.value()).toBe('1,5708')
    g.back.click()
    await frame()
    expect([g.value(), g.curve(), g.back.disabled]).toEqual(['2', written, true])
  })

  it('un valore scritto fuori dallo slider lo allarga; la freccia rimette anche gli estremi', async () => {
    const g = drawn(NOTE)
    expect(g.ends()).toEqual(['-10', '10'])
    g.field.focus()
    move(g.field, '25')
    press(g.field, 'Enter')
    await frame()
    expect([g.input.min, g.input.max, g.input.step, g.input.value]).toEqual(['-10', '25', '0.1', '25'])
    expect([g.ends(), g.point()]).toEqual([['-10', '25'], '(25; 625)'])
    // Trascinandolo resta allargato, anche tornando al valore scritto e se l'anteprima si ridisegna.
    move(g.input, '2')
    await frame()
    const again = drawn(NOTE)
    expect([again.value(), again.input.max, again.ends(), again.back.disabled]).toEqual(['2', '25', ['-10', '25'], false])
    // Molto più lontano: il passo cresce.
    again.field.focus()
    move(again.field, '1000')
    again.field.blur()
    expect([again.input.min, again.input.max, again.input.step, again.value()]).toEqual(['-10', '1000', '10', '1000'])
    again.back.click()
    await frame()
    expect([again.input.min, again.input.max, again.input.step, again.ends(), again.value(), again.back.disabled]).toEqual(['-10', '10', '0.1', ['-10', '10'], '2', true])
  })

  it('i numeri che contano i termini di una somma si scrivono interi', async () => {
    const g = drawn('```grafico\nn = 2\ny = \\sum_{k=0}^{n} x^k\n```\n')
    expect([g.input.step, g.ends()]).toEqual(['1', ['0', '10']])
    g.field.focus()
    move(g.field, '2,6')
    press(g.field, 'Enter')
    expect(g.value()).toBe('3')
    g.back.click()
    await frame()
  })

  it('la nota non cambia: il file .md e la stampa usano il valore scritto', async () => {
    const image = graphImagesFor(NOTE).get(2)
    const g = drawn(NOTE)
    const written = g.curve()
    move(g.input, '-1')
    await frame()
    expect(graphImagesFor(NOTE).get(2)).toBe(image)
    window.dispatchEvent(new Event('beforeprint'))
    expect([g.curve(), g.point(), g.value()]).toEqual([written, '(2; 4)', '2'])
    window.dispatchEvent(new Event('afterprint'))
    expect([g.point(), g.value()]).toEqual(['(−1; 1)', '−1'])
    g.back.click()
    await frame()
  })

  it('▶ lo muove da solo, avanti e indietro; premuto di nuovo lo ferma', async () => {
    const g = drawn(NOTE)
    g.play.click()
    expect(g.play.getAttribute('aria-pressed')).toBe('true')
    expect(g.play.getAttribute('aria-label')).toBe('Ferma a')
    await frames(12)
    const moving = Number(g.value()!.replace(',', '.'))
    expect(moving).toBeGreaterThan(2)
    g.play.click()
    expect(g.play.getAttribute('aria-pressed')).toBe('false')
    const stopped = g.value()
    await frames(4)
    expect(g.value()).toBe(stopped)
    // Arrivato in fondo torna indietro.
    move(g.input, '10')
    g.play.click()
    await frames(6)
    expect(Number(g.value()!.replace(',', '.'))).toBeLessThan(10)
    g.back.click()
    expect(g.play.getAttribute('aria-pressed')).toBe('false')
    await frame()
  })

  it('la parte da mostrare resta quella, se il blocco non la lega a uno slider', async () => {
    const numbers = (block: HTMLElement) => [...block.querySelectorAll('svg text')].map((t) => t.textContent)
    const g = drawn('Sia $a = 2$.\n\n```grafico\ny = a x^2\n```\n')
    const ticks = numbers(g.block)
    move(g.input, '5')
    await frame()
    expect(numbers(g.block)).toEqual(ticks)
    g.back.click()
    await frame()
    const tied = drawn('```grafico\nL = 4\ny = x\nx \\in [0, L]\n```\n')
    const largest = () => Math.max(...numbers(tied.block).map((t) => Number(t)).filter(Number.isFinite))
    expect(largest()).toBeLessThanOrEqual(4)
    move(tied.input, '9')
    await frame()
    expect(largest()).toBeGreaterThan(6)
    tied.back.click()
    await frame()
  })

  it('a un nome che manca, «Aggiungi lo slider per k» scrive k = 1 nel blocco', () => {
    const added: [number, string][] = []
    const p = new Preview({ onToggleTask: () => {}, onJumpToLine: () => {}, onEditSchema: () => {}, onAddToGraph: (line, text) => added.push([line, text]) })
    document.body.append(p.el)
    p.update('Testo\n\n```grafico\ny = a x^2 + b x\n```\n', true)
    const button = p.el.querySelector<HTMLButtonElement>('.graph-add-slider')!
    expect(button.textContent).toBe('Aggiungi gli slider per a e b')
    button.click()
    expect(added).toEqual([[2, 'a = 1\nb = 1']])

    const v = makeView('Testo\n\n```grafico\ny = a x^2 + b x\n```\n')
    expect(addToGraphBlock(v, 2, 'a = 1\nb = 1')).toBe(true)
    expect(v.state.doc.toString()).toBe('Testo\n\n```grafico\na = 1\nb = 1\ny = a x^2 + b x\n```\n')
    // Se intanto il blocco si è spostato, niente; in un elenco, con il rientro del blocco.
    expect(addToGraphBlock(v, 0, 'k = 1')).toBe(false)
    const list = makeView('- punto\n\n  ```grafico\n  y = kx\n  ```')
    expect(addToGraphBlock(list, 2, 'k = 1')).toBe(true)
    expect(list.state.doc.toString()).toBe('- punto\n\n  ```grafico\n  k = 1\n  y = kx\n  ```')
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

  it('con il cursore su un integrale mette nel blocco l\'integrale, senza l\'uguale e il risultato', () => {
    const doc = r`$f(x) = x^2$ e $\int_0^2 f(x)\,dx = 2{,}666666\ldots$`
    const v = makeView(doc, doc.indexOf('dx'))
    const f = formulaAtCursor(v)!
    expect(f).toEqual({ tex: r`\int_0^2 f(x)\,dx`, defs: ['f(x) = x^2'], to: doc.length })
    insertGraphBlock(v, f.tex, f.to)
    expect(v.state.doc.toString()).toBe(doc + '\n\n```grafico\n' + r`\int_0^2 f(x)\,dx` + '\n```\n')
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

  it('sotto la legenda, i numeri degli slider con il valore scritto', () => {
    const svg = graphImage('y = a x\nk = \\frac{1}{2}\ny = k', ['a = 2'])
    expect(svg).toMatch(/viewBox="0 0 640 496"/)
    expect(svg).toContain('<mi>a</mi><mo>=</mo><mn>2</mn>')
    expect(svg).toContain('<mn>0,5</mn>')
    expect(graphImage('y = x')).toMatch(/viewBox="0 0 640 440"/)
  })

  it('l\'immagine ha il disegno e la legenda in MathML, ed è un SVG valido', () => {
    const svg = graphImage('y = \\frac{x}{2}\nP = (1, 2)')
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml')
    expect(doc.querySelector('parsererror')).toBeNull()
    expect(svg).toContain('<foreignObject')
    expect(svg).toContain('<math')
    expect(svg).toContain('fill="#ffffff"')
  })

  it('nella legenda dell\'immagine l\'area ha la sua velatura', () => {
    const svg = graphImage(r`\int_0^2 x^2 \, dx`)
    expect(svg).toContain('data-area="0"')
    expect(svg).toContain('background:rgba(42, 120, 214, 0.18)')
    expect(new DOMParser().parseFromString(svg, 'image/svg+xml').querySelector('parsererror')).toBeNull()
  })

  it('un grafico 3D nel file: il disegno, la legenda con le superfici, un SVG valido e leggero', () => {
    const svg = graphImage('z = x^2 + y^2\nx^2 + y^2 + z^2 = 4')
    expect(svg).toContain('graph-3d')
    expect(svg).toContain('border-radius:3px')
    expect(new DOMParser().parseFromString(svg, 'image/svg+xml').querySelector('parsererror')).toBeNull()
    expect(svg.length).toBeLessThan(250000)
  })

  it('i grafici nel file usano le definizioni della nota', () => {
    const text = '$k = 3$\n\n```grafico\ny = k\n```\n'
    const images = graphImagesFor(text)
    expect([...images.keys()]).toEqual([2])
    // La retta y = 3 c'è: nessun errore «k non è definita» (l'immagine ha la curva).
    expect(images.get(2)).toContain('data-item="0"')
  })
})
