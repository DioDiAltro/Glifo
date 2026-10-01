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
})
