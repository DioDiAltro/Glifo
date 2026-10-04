import { describe, expect, it } from 'vitest'
import favicon from '../public/favicon.svg?raw'
import { logoIcon, logoMark } from '../src/ui/logo'

describe('il simbolo di Glifo', () => {
  it('l\'icona del sito è ridisegnata dal simbolo di adesso (node scripts/icons.mjs)', () => {
    expect(favicon).toBe(logoIcon())
  })

  it('nella barra laterale è solo il simbolo, del colore del tema; nell\'icona è bianco', () => {
    expect(logoMark()).toContain('fill="currentColor"')
    expect(logoMark()).not.toContain('<rect')
    expect(logoIcon()).toContain('fill="#fff"')
  })
})
