import { describe, expect, it } from 'vitest'
import favicon from '../public/favicon.svg?raw'
import { logoIcon, logoMark } from '../src/ui/logo'

describe('il simbolo di Glifo', () => {
  it('l\'icona del sito è ridisegnata dal simbolo di adesso (node scripts/icons.mjs)', () => {
    expect(favicon).toBe(logoIcon())
  })

  it('nella barra in alto prende il colore del tema', () => {
    expect(logoMark()).toContain('stroke="currentColor"')
    expect(logoIcon()).toContain('stroke="#fff"')
  })
})
