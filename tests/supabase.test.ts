import type { AuthError, PostgrestError } from '@supabase/supabase-js'
import { describe, expect, it } from 'vitest'
import { accountError, emailLinkToken, providerEnabled, syncError, verifyCode } from '../src/account/supabase'

const auth = (fields: Partial<AuthError>) => ({ name: 'AuthApiError', message: '', status: 400, ...fields }) as AuthError
const postgrest = (fields: Partial<PostgrestError>) => ({ message: '', details: '', hint: '', code: '', ...fields }) as PostgrestError

describe('errori dell\'accesso', () => {
  it('ogni problema ha il suo messaggio in italiano', () => {
    expect(accountError(auth({ name: 'AuthRetryableFetchError', status: 0 }))).toMatchObject({ kind: 'offline' })
    expect(accountError(auth({ code: 'over_email_send_rate_limit', status: 429 }))).toMatchObject({ kind: 'rate' })
    expect(accountError(auth({ code: 'otp_expired', status: 403 })).message).toContain('è sbagliato o scaduto')
    expect(accountError(auth({ code: 'email_address_invalid' }))).toMatchObject({ kind: 'email' })
    // Con il servizio di posta di prova, Supabase scrive solo ai membri del progetto: gli altri
    // entrano con Google, aperto a tutti anche con l'app Google in «Testing».
    expect(accountError(auth({ code: 'email_address_not_authorized' }))).toMatchObject({ kind: 'closed' })
    expect(accountError(auth({ code: 'email_address_not_authorized' })).message).toContain('entra con «Continua con Google»')
    expect(accountError(auth({ code: 'qualcosa_di_nuovo' }))).toMatchObject({ kind: 'other' })
  })
})

describe('link dell\'email incollato nella finestra', () => {
  const token = `pkce_${'0a1b2c3d'.repeat(7)}`
  const link = `https://fgsuonetdmcgojbvrsxi.supabase.co/auth/v1/verify?token=${token}&type=magiclink&redirect_to=https://diodialtro.github.io/Glifo/`

  it('prende il token dal link, anche con spazi o testo intorno', () => {
    expect(emailLinkToken(link)).toBe(token)
    expect(emailLinkToken(`  ${link}\n`)).toBe(token)
    expect(emailLinkToken(`Sign in <${link}>`)).toBe(token)
    expect(emailLinkToken(link.replace(`token=${token}&type=magiclink`, `type=signup&token=${token}`))).toBe(token)
  })

  it('anche dal link avvolto da Outlook o da un antivirus', () => {
    expect(emailLinkToken(`https://eur01.safelinks.protection.outlook.com/?url=${encodeURIComponent(link)}&data=05%7C02&reserved=0`)).toBe(token)
  })

  it('niente token da un codice, dall\'indirizzo di Glifo o da un testo qualsiasi', () => {
    expect(emailLinkToken('123456')).toBeNull()
    expect(emailLinkToken('https://diodialtro.github.io/Glifo/?code=5b1c0f9e-8d4a-4f0e-9a51-2f7d1c3b6a10')).toBeNull()
    expect(emailLinkToken('sicuro al 100%')).toBeNull()
  })

  it('un testo che non è né il link né un codice viene segnalato subito', async () => {
    await expect(verifyCode('studente@example.com', 'https://diodialtro.github.io/Glifo/')).rejects.toMatchObject({ kind: 'input' })
    await expect(verifyCode('studente@example.com', '12 34')).rejects.toMatchObject({ kind: 'input' })
  })
})

describe('accesso con Google', () => {
  it('è attivo solo se Supabase lo dice', () => {
    expect(providerEnabled({ external: { email: true, google: true } }, 'google')).toBe(true)
    expect(providerEnabled({ external: { email: true, google: false } }, 'google')).toBe(false)
    expect(providerEnabled({ external: { email: true } }, 'google')).toBe(false)
    // Una risposta di errore (per esempio una chiave sbagliata) o niente.
    expect(providerEnabled({ message: 'Invalid API key' }, 'google')).toBe(false)
    expect(providerEnabled(null, 'google')).toBe(false)
  })
})

describe('errori della sincronizzazione', () => {
  it('distingue rete, accesso scaduto, spazio esaurito e il resto', () => {
    expect(syncError(postgrest({ message: 'TypeError: Failed to fetch' }), 0).kind).toBe('offline')
    expect(syncError(postgrest({ message: 'AbortError: signal timed out' }), 0).kind).toBe('offline')
    expect(syncError(postgrest({ code: 'PGRST301', message: 'JWT expired' }), 401).kind).toBe('auth')
    expect(syncError(postgrest({ code: '42501', message: 'permission denied for function sync_pull' }), 401).kind).toBe('auth')
    const quota = syncError(postgrest({ code: 'P0001', hint: 'quota', message: 'Spazio esaurito: …' }), 400)
    expect(quota).toMatchObject({ kind: 'quota', message: 'Spazio esaurito: …' })
    expect(syncError(postgrest({ code: '23514', message: 'violates check constraint' }), 400).kind).toBe('server')
  })
})
