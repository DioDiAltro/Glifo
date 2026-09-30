// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { childMarker, firstMarker, nextMarker, parseListLine, readMarker, resolveMarker, romanValue } from '../src/lists/markers'
import { renderMarkdown } from '../src/render/markdown'

const text = (s: string) => readMarker(s)?.text ?? null
const kind = (s: string) => readMarker(s)?.kind ?? null

describe('marcatori degli elenchi', () => {
  it('riconosce tutti i tipi', () => {
    expect(['- x', '* x', '+ x', '• x', '. x'].map(kind)).toEqual(['bullet', 'bullet', 'bullet', 'bullet', 'bullet'])
    expect(['1. x', '12) x', '(3) x'].map(text)).toEqual(['1.', '12)', '(3)'])
    expect(['a) x', 'B) x', '(c) x', 'd. x'].map(kind)).toEqual(['letter', 'letter', 'letter', 'letter'])
    expect(['ii) x', 'IV) x', '(ix) x', 'iii. x'].map(kind)).toEqual(['roman', 'roman', 'roman', 'roman'])
    expect(['es) x', 'oss) x', 'NB) x', 'Def) x'].map(kind)).toEqual(['label', 'label', 'label', 'label'])
  })

  it('non scambia per marcatori abbreviazioni, iniziali e parole', () => {
    for (const s of ['cfr. pagina 3', 'A. Einstein', 'ecc. ecc.', '...e poi', 'a)b', 'Teorema: vale', '-3 gradi', '1.5 metri', 'è) no', 'iiii.', 'settantasette) x']) {
      expect(readMarker(s), s).toBeNull()
    }
  })

  it('i numeri romani validi', () => {
    expect(['i', 'iv', 'ix', 'xiv', 'XXXIX'].map(romanValue)).toEqual([1, 4, 9, 14, 39])
    expect(['iiii', 'vv', 'iX', 'l'].map(romanValue)).toEqual([null, null, null, null])
  })

  it('legge rientro, testo e casella', () => {
    const l = parseListLine('    a) [ ] compito')!
    expect([l.indent, l.text, l.task, l.contentStart, l.contentColumn]).toEqual([4, 'a)', '[ ]', 11, 11])
    expect(parseListLine('\t- x')!.indent).toBe(4)
    expect(parseListLine('es) [ ] anche le etichette')!.task).toBe('[ ]')
    expect(parseListLine('testo normale')).toBeNull()
  })

  it('calcola il marcatore successivo', () => {
    const next = (s: string, prev?: string) => nextMarker(readMarker(s)!, prev ? readMarker(prev) : null).text
    expect([next('1)'), next('9.'), next('(2)'), next('a)'), next('z)'), next('C)')]).toEqual(['2)', '10.', '(3)', 'b)', 'aa)', 'D)'])
    expect([next('i)'), next('iv)'), next('viii)'), next('(ix)')]).toEqual(['ii)', 'v)', 'ix)', '(x)'])
    expect([next('es)'), next('-'), next('. ')]).toEqual(['es)', '-', '.'])
  })

  it('distingue «i» lettera da «i» romano guardando l\'elemento prima', () => {
    const resolve = (s: string, prev?: string) => resolveMarker(readMarker(s)!, prev ? readMarker(prev) : null).kind
    expect(resolve('i)')).toBe('roman')
    expect(resolve('i)', 'h)')).toBe('letter')
    expect(resolve('v)', 'iv)')).toBe('roman')
    expect(resolve('v)', 'u)')).toBe('letter')
    expect(resolve('x)')).toBe('letter')
    expect(nextMarker(readMarker('i)')!, readMarker('h)')).text).toBe('j)')
  })

  it('sceglie il marcatore dei sotto-elenchi e ricomincia da capo', () => {
    const child = (s: string) => childMarker(readMarker(s)!).text
    expect([child('2)'), child('3.'), child('(1)'), child('c)'), child('B)'), child('ii)'), child('-'), child('es)')]).toEqual([
      'a)',
      'a.',
      '(a)',
      'i)',
      'I)',
      '1)',
      '-',
      '-',
    ])
    expect(firstMarker(readMarker('iv)')!).text).toBe('i)')
  })
})

describe('elenchi nell\'anteprima', () => {
  function dom(md: string): HTMLElement {
    const el = document.createElement('div')
    el.innerHTML = renderMarkdown(md)
    return el
  }
  /** Struttura degli elenchi in forma compatta, per confrontarla facilmente. */
  function outline(el: Element): string {
    const parts: string[] = []
    for (const child of el.children) {
      if (child.tagName === 'UL' || child.tagName === 'OL') {
        const attrs = [child.getAttribute('class'), child.getAttribute('type') && `type=${child.getAttribute('type')}`, child.getAttribute('start') && `start=${child.getAttribute('start')}`]
        const items = [...child.children].map((li) => {
          const label = /"(.*) "/.exec(li.getAttribute('style') ?? '')?.[1]
          const own = [...li.childNodes]
            .filter((n) => n.nodeType === 3 || (n as Element).tagName === 'P')
            .map((n) => n.textContent!.trim())
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim()
          const nested = outline(li)
          return `${label ? label + ' ' : ''}${own}${nested ? ' ' + nested : ''}`
        })
        parts.push(`${child.tagName.toLowerCase()}(${attrs.filter(Boolean).join(' ')})[${items.join(' | ')}]`)
      } else if (child.tagName !== 'P') {
        const nested = outline(child)
        if (nested) parts.push(nested)
      }
    }
    return parts.join(' ')
  }

  it('disegna l\'esempio con elenchi di ogni tipo uno dentro l\'altro', () => {
    const md = [
      '1) qualcosa',
      '    es) questo',
      '        i) di questo, ii) di questo',
      '    - questo però',
      '        a) del però, b) del però',
      '2) altro',
    ].join('\n')
    expect(outline(dom(md))).toBe(
      'ol(ol-decimal-paren)[qualcosa ul(ul-labels)[es) questo ol(ol-lower-roman-paren type=i)[di questo, ii) di questo]] ul(ul-dash)[questo però ol(ol-lower-alpha-paren type=a)[del però, b) del però]] | altro]',
    )
  })

  it('funziona anche con rientri di due o otto spazi e con le tabulazioni', () => {
    expect(outline(dom('- uno\n  - due\n        - tre'))).toBe('ul(ul-dash)[uno ul(ul-dash)[due ul(ul-dash)[tre]]]')
    expect(outline(dom('iii) uno\n    a) dentro'))).toBe('ol(ol-lower-roman-paren type=i start=3)[uno ol(ol-lower-alpha-paren type=a)[dentro]]')
    expect(outline(dom('oss) uno\n\ttab'))).toBe('ul(ul-labels)[oss) uno tab]')
  })

  it('tiene insieme lettere e romani nello stesso elenco', () => {
    expect(outline(dom('h) otto\ni) nove\nj) dieci'))).toBe('ol(ol-lower-alpha-paren type=a start=8)[otto | nove | dieci]')
    expect(outline(dom('i) uno\nii) due\niii) tre\niv) quattro\nv) cinque'))).toBe(
      'ol(ol-lower-roman-paren type=i)[uno | due | tre | quattro | cinque]',
    )
    expect(outline(dom('es) primo\noss) secondo'))).toBe('ul(ul-labels)[es) primo | oss) secondo]')
  })

  it('lascia come prima gli elenchi standard', () => {
    expect(outline(dom('1. uno\n2. due'))).toBe('ol()[uno | due]')
    expect(outline(dom('* a\n* b'))).toBe('ul()[a | b]')
    expect(outline(dom('• a\n. b'))).toBe('ul(ul-dot)[a | b]')
    expect(outline(dom('(1) a\n(2) b'))).toBe('ol(ol-decimal-parens)[a | b]')
    expect(outline(dom('a. a\nb. b'))).toBe('ol(type=a)[a | b]')
  })

  it('un elenco interrompe un paragrafo solo se parte dal primo valore', () => {
    expect(outline(dom('Testo\na) primo\nb) secondo'))).toBe('ol(ol-lower-alpha-paren type=a)[primo | secondo]')
    expect(dom('Testo\nb) secondo').querySelector('ol')).toBeNull()
    expect(outline(dom('Testo\nes) esempio'))).toBe('ul(ul-labels)[es) esempio]')
  })

  it('niente blocchi di codice rientrati: il codice si scrive tra ```', () => {
    const el = dom('Testo\n\n        rientrato\n\n```\ncodice\n```')
    expect(el.querySelectorAll('pre').length).toBe(1)
    expect(el.textContent).toContain('rientrato')
    expect(el.querySelector('pre')!.textContent).toBe('codice\n')
  })

  it('caselle, formule e numeri di riga funzionano anche nei nuovi elenchi', () => {
    const el = dom('a) [x] fatto con $x^2$\n    es) [ ] esempio')
    expect(el.querySelectorAll('input.task-checkbox').length).toBe(2)
    expect(el.querySelector('.katex')).not.toBeNull()
    expect(el.querySelector('li')!.getAttribute('data-line')).toBe('0')
    expect(el.querySelector('.ul-labels li')!.getAttribute('data-line')).toBe('1')
  })
})
