import { describe, expect, it } from 'vitest'
import privacy from '../privacy.html?raw'

describe('informativa sulla privacy', () => {
  it('ha l\'indirizzo per le richieste sulla privacy', () => {
    // Dal 9 ottobre 2026: arriva al Gmail di Glifo con l'Email Routing di Cloudflare.
    expect(privacy).toContain('<a href="mailto:privacy@glifo.page">privacy@glifo.page</a>')
    expect(privacy).not.toContain('comparirà qui')
  })
})
