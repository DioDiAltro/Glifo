import { describe, expect, it } from 'vitest'
import css from '../src/styles/app.css?raw'

/** I nomi delle variabili (--…) dichiarate nel primo blocco che segue `selector`. */
function tokens(selector: string): string[] {
  const start = css.indexOf(selector)
  expect(start, selector).toBeGreaterThanOrEqual(0)
  const open = css.indexOf('{', start + selector.length - 1)
  const body = css.slice(open + 1, css.indexOf('}', open))
  return [...body.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]).sort()
}

describe('temi', () => {
  it('il tema scuro automatico e quello scelto a mano hanno gli stessi colori', () => {
    const auto = tokens(":root:not([data-theme='light']) {")
    const chosen = tokens(":root[data-theme='dark'] {")
    expect(chosen).toEqual(auto)
  })

  it('il tema scuro ridefinisce le zone della pagina (cornice, foglio, anteprima)', () => {
    const light = tokens(':root {')
    const dark = tokens(":root[data-theme='dark'] {")
    for (const t of ['--frame', '--frame-hover', '--frame-active', '--pane-editor', '--pane-preview']) {
      expect(light, t).toContain(t)
      expect(dark, t).toContain(t)
    }
    // Ogni colore del tema scuro esiste anche nel chiaro.
    for (const t of dark) expect(light, t).toContain(t)
  })

  it('i menu a tendina hanno la freccia di Glifo, non il riquadro chiaro del sistema', () => {
    // Le regole senza altre graffe dentro (anche quelle dentro @media): selettori e dichiarazioni,
    // senza i commenti.
    const plain = css.replace(/\/\*[\s\S]*?\*\//g, '')
    const rules = [...plain.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ selectors: m[1].trim(), body: m[2] }))
    const own = rules.filter((r) => r.selectors === 'select')
    expect(own.some((r) => /appearance:\s*none/.test(r.body) && /background-image:\s*var\(--select-arrow\)/.test(r.body))).toBe(true)
    for (const theme of [':root {', ":root:not([data-theme='light']) {", ":root[data-theme='dark'] {"]) {
      expect(tokens(theme), theme).toContain('--select-arrow')
    }
    // La scorciatoia `background:` su un menu a tendina toglierebbe la freccia.
    const onSelect = rules.filter((r) => r.selectors.split(',').some((s) => /(^|[\s>+~])select(?![\w-])/.test(s.trim())))
    expect(onSelect.length).toBeGreaterThan(2)
    for (const r of onSelect) expect(r.body, r.selectors).not.toMatch(/(^|[;\s])background\s*:/)
  })
})
