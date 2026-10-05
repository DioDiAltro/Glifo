import { describe, expect, it } from 'vitest'
import { BOARD_PALETTES, inkName, outlineSvg, PEN_SIZE, strokeOutline } from '../src/board/ink'
import { INK_COLORS } from '../src/board/strokes'

/** Il contrasto WCAG tra due colori #rrggbb. */
function contrast(a: string, b: string): number {
  const lum = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl
  }
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** Quanto è largo il contorno di un tratto orizzontale (in verticale). */
const thickness = (outline: number[][]) => Math.max(...outline.map((p) => p[1])) - Math.min(...outline.map((p) => p[1]))

describe('lavagna: colori e tratti', () => {
  it('ogni colore si legge bene sulla lavagna, nel tema chiaro e in quello scuro', () => {
    for (const [theme, p] of Object.entries(BOARD_PALETTES)) {
      for (const c of INK_COLORS) expect(contrast(p.ink[c], p.paper), `${theme} ${c}`).toBeGreaterThanOrEqual(4.5)
      // I quadretti si vedono appena: non devono disturbare quello che si scrive.
      expect(contrast(p.grid, p.paper), `${theme} quadretti`).toBeGreaterThan(1.05)
      expect(contrast(p.grid, p.paper), `${theme} quadretti`).toBeLessThan(1.4)
    }
    // Lo sfondo è quello del testo nei due temi (--pane-editor in app.css).
    expect(BOARD_PALETTES.light.paper).toBe('#ffffff')
    expect(BOARD_PALETTES.dark.paper).toBe('#181b24')
  })

  it('il primo colore è nero nel tema chiaro e bianco in quello scuro', () => {
    expect(inkName('ink', 'light')).toBe('Nero')
    expect(inkName('ink', 'dark')).toBe('Bianco')
    expect(inkName('red', 'dark')).toBe('Rosso')
  })

  it('con la penna lo spessore segue la pressione', () => {
    const line = (p: number) => {
      const points: number[] = []
      for (let x = 0; x <= 100; x += 5) points.push(x, 0, p)
      return strokeOutline({ points, size: PEN_SIZE, pen: true })
    }
    const light = thickness(line(0.15))
    const strong = thickness(line(0.9))
    expect(strong).toBeGreaterThan(light * 1.8)
    expect(light).toBeGreaterThan(0.5)
  })

  it('il contorno diventa un percorso chiuso; un tocco solo è un puntino', () => {
    const d = outlineSvg(strokeOutline({ points: [0, 0, 0.5, 10, 10, 0.5, 20, 0, 0.5], size: 3, pen: false }))
    expect(d).toMatch(/^M[-\d.]+,[-\d.]+ Q/)
    expect(d.endsWith('Z')).toBe(true)
    const dot = strokeOutline({ points: [5, 5, 0.5], size: 4, pen: true })
    expect(dot.length).toBeGreaterThan(4)
    expect(outlineSvg(dot)).not.toBe('')
    expect(outlineSvg([])).toBe('')
  })
})
