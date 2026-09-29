import { describe, expect, it } from 'vitest'
import { CATEGORIES, SYMBOLS, commandNames } from '../src/symbols'
import { cardPreviewTex, formPreviewTex, parseTemplate, placeholderPreview, templateText } from '../src/symbols/template'
import { renderTex } from '../src/render/katex'

describe('database dei simboli', () => {
  it('ha id univoci', () => {
    const seen = new Set<string>()
    const dup: string[] = []
    for (const s of SYMBOLS) {
      if (seen.has(s.id)) dup.push(s.id)
      seen.add(s.id)
    }
    expect(dup).toEqual([])
  })

  it('usa solo categorie esistenti e ogni categoria ha simboli', () => {
    const ids = new Set(CATEGORIES.map((c) => c.id))
    for (const s of SYMBOLS) expect(ids.has(s.category), s.id).toBe(true)
    for (const c of CATEGORIES) expect(SYMBOLS.some((s) => s.category === c.id), c.id).toBe(true)
  })

  it('ogni simbolo ha nome, parole chiave e almeno una variante', () => {
    for (const s of SYMBOLS) {
      expect(s.name.length, s.id).toBeGreaterThan(0)
      expect(s.keywords.length, s.id).toBeGreaterThan(0)
      expect(s.forms.length, s.id).toBeGreaterThan(0)
      expect(s.weight, s.id).toBeGreaterThanOrEqual(0)
      expect(s.weight, s.id).toBeLessThanOrEqual(10)
    }
  })

  it('tutte le anteprime sono formule KaTeX valide', () => {
    const errors: string[] = []
    for (const s of SYMBOLS) {
      for (const f of s.forms) {
        const { error } = renderTex(formPreviewTex(f), !!s.display, true)
        if (error) errors.push(`${s.id} → ${f.preview ?? f.tex}: ${error}`)
        const card = renderTex(cardPreviewTex(f), !!s.display, true)
        if (card.error) errors.push(`${s.id} (scheda) → ${f.preview ?? f.tex}: ${card.error}`)
      }
    }
    expect(errors).toEqual([])
  })

  it('anche il testo inserito (segnaposto vuoti) è valido', () => {
    const errors: string[] = []
    for (const s of SYMBOLS) {
      if (s.fragment) continue
      for (const f of s.forms) {
        const text = templateText(f.tex)
        const { error } = renderTex(text, !!s.display)
        if (error) errors.push(`${s.id} → ${text}: ${error}`)
        // …e lo è anche riempiendo i segnaposto
        const filled = placeholderFill(f.tex)
        const r2 = renderTex(filled, !!s.display)
        if (r2.error) errors.push(`${s.id} → ${filled}: ${r2.error}`)
      }
    }
    expect(errors).toEqual([])
  })

  it('le icone delle categorie sono valide', () => {
    for (const c of CATEGORIES) expect(renderTex(c.icon, false, true).error, c.id).toBeNull()
  })

  it('ricava i nomi di comando', () => {
    const sum = SYMBOLS.find((s) => s.id === String.raw`\sum`)!
    expect(commandNames(sum)).toEqual(['sum'])
    const pm = SYMBOLS.find((s) => s.id === 'pmatrix2')!
    expect(commandNames(pm)).toContain('pmatrix')
  })
})

describe('modelli con segnaposto', () => {
  it('individua i segnaposto', () => {
    expect(parseTemplate(String.raw`\sum_{#}^{#}`)).toEqual({ text: String.raw`\sum_{}^{}`, slots: [6, 9] })
    expect(parseTemplate(String.raw`\frac{#}{#}`)).toEqual({ text: String.raw`\frac{}{}`, slots: [6, 8] })
  })

  it('rispetta gli escape di LaTeX', () => {
    expect(parseTemplate(String.raw`\# #`)).toEqual({ text: String.raw`\# `, slots: [3] })
    expect(parseTemplate(String.raw`a \\#`)).toEqual({ text: String.raw`a \\`, slots: [4] })
    expect(parseTemplate(String.raw`\{ # \}`)).toEqual({ text: String.raw`\{  \}`, slots: [3] })
  })

  it('mostra i segnaposto come puntini', () => {
    expect(placeholderPreview(String.raw`\sqrt{#}`)).toBe(String.raw`\sqrt{{\htmlClass{mh-ph}{\cdots}}}`)
  })
})

function placeholderFill(tpl: string): string {
  let out = ''
  for (let i = 0; i < tpl.length; i++) {
    if (tpl[i] === '\\' && i + 1 < tpl.length) {
      out += tpl[i] + tpl[i + 1]
      i++
    } else out += tpl[i] === '#' ? 'x' : tpl[i]
  }
  return out
}
