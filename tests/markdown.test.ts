// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderMarkdown } from '../src/render/markdown'

const r = String.raw

describe('anteprima Markdown', () => {
  it('disegna le formule in linea e a blocco', () => {
    const html = renderMarkdown(r`Sia $x^2$ e $$\sum_{n=0}^{\infty} a_n$$ fine` + '\n\n$$\n\\int_0^1 f\n$$\n')
    expect(html).toContain('class="katex"')
    expect(html).toContain('katex-display')
    expect(html).toContain('class="math-block"')
    expect(html).not.toContain('$x^2$')
  })

  it('rispetta le regole di VS Code sui dollari', () => {
    const html = renderMarkdown('costa 5$ e 3$ al chilo')
    expect(html).not.toContain('katex')
    expect(html).toContain('5$ e 3$')
  })

  it('supporta \\$ come dollaro letterale', () => {
    expect(renderMarkdown(r`prezzo \$5`)).toContain('$5')
  })

  it('non interpreta _ e * dentro le formule come Markdown', () => {
    const html = renderMarkdown(r`$a_1 * b_2 * c$`)
    expect(html).not.toContain('<em>')
  })

  it('segnala gli errori nelle formule senza rompere la pagina', () => {
    const html = renderMarkdown(r`$\frac{1}{$ ok`)
    expect(html).toContain('katex-error')
  })

  it('supporta i blocchi ```math come GitHub', () => {
    expect(renderMarkdown('```math\na^2+b^2=c^2\n```')).toContain('katex-display')
  })

  it('supporta la chimica con mhchem', () => {
    expect(renderMarkdown(r`$\ce{H2O}$`)).not.toContain('katex-error')
  })

  it('gestisce elenchi di cose da fare, tabelle e note', () => {
    const html = renderMarkdown('- [x] fatto\n- [ ] da fare\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\nTesto[^1]\n\n[^1]: nota')
    expect(html).toContain('type="checkbox"')
    expect(html).toContain('checked')
    expect(html).toContain('<table')
    expect(html).toContain('footnote')
  })

  it('evidenzia il codice', () => {
    expect(renderMarkdown('```python\ndef f(x):\n    return x\n```')).toContain('hljs-')
  })

  it('rimuove script e attributi pericolosi', () => {
    const html = renderMarkdown('<img src=x onerror="alert(1)"><script>alert(1)</script><a href="javascript:alert(1)">x</a>')
    expect(html).not.toContain('onerror')
    expect(html).not.toContain('<script')
    expect(html).not.toContain('javascript:')
  })

  it('aggiunge data-line per sincronizzare lo scorrimento', () => {
    const html = renderMarkdown('# Titolo\n\nparagrafo\n\n$$\nx\n$$')
    expect(html).toContain('data-line="0"')
    expect(html).toContain('data-line="2"')
    expect(html).toContain('data-line="4"')
  })

  it('apre i link in una nuova scheda', () => {
    expect(renderMarkdown('[sito](https://example.com)')).toContain('target="_blank"')
  })
})
