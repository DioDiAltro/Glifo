import { describe, expect, it } from 'vitest'
import privacy from '../privacy.html?raw'

describe('informativa sulla privacy', () => {
  it('ha l\'indirizzo per le richieste sulla privacy', () => {
    // Dal 9 ottobre 2026: arriva al Gmail di Glifo con l'Email Routing di Cloudflare.
    expect(privacy).toContain('<a href="mailto:privacy@glifo.page">privacy@glifo.page</a>')
    expect(privacy).not.toContain('comparirà qui')
  })

  it('dice chi consegna le email per entrare', () => {
    // Dal 9 ottobre 2026 le manda Resend (accesso@glifo.page), non più la posta di prova di Supabase.
    expect(privacy).toContain('<strong>Resend</strong>')
    expect(privacy).not.toContain('email per entrare le manda Supabase')
    // E prima dell'email il controllo anti-robot di Cloudflare (src/account/captcha.ts).
    expect(privacy).toContain('<strong>Cloudflare Turnstile</strong>')
  })

  it('ha la versione inglese, con le stesse parti e la stessa data di quella italiana', () => {
    const part = (lang: string) => {
      const start = privacy.indexOf(`<article lang="${lang}"`)
      return start < 0 ? '' : privacy.slice(start, privacy.indexOf('</article>', start))
    }
    const it = part('it')
    const en = part('en')
    expect(en).toContain('<h1>Privacy policy</h1>')
    const count = (text: string, tag: string) => text.split(`<${tag}>`).length - 1
    for (const tag of ['h2', 'li', 'p', 'strong']) expect(count(en, tag), tag).toBe(count(it, tag))
    for (const piece of ['privacy@glifo.page', '<strong>Resend</strong>', '<strong>Cloudflare Turnstile</strong>', 'Supabase']) expect(en).toContain(piece)
    // Quando cambia l'informativa, cambiano tutte e due le date.
    const MONTHS = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
    const itDate = /Aggiornata il (\d+) (\w+) (\d{4})\./.exec(it)
    const enDate = /Updated (\w+) (\d+), (\d{4})\./.exec(en)
    expect(itDate && enDate).toBeTruthy()
    const english = new Date(`${enDate![1]} ${enDate![2]}, ${enDate![3]}`)
    expect([english.getDate(), english.getMonth(), english.getFullYear()]).toEqual([Number(itDate![1]), MONTHS.indexOf(itDate![2]), Number(itDate![3])])
  })
})
