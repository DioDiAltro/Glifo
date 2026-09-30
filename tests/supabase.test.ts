import type { AuthError, PostgrestError } from '@supabase/supabase-js'
import { describe, expect, it } from 'vitest'
import { accountError, syncError } from '../src/account/supabase'

const auth = (fields: Partial<AuthError>) => ({ name: 'AuthApiError', message: '', status: 400, ...fields }) as AuthError
const postgrest = (fields: Partial<PostgrestError>) => ({ message: '', details: '', hint: '', code: '', ...fields }) as PostgrestError

describe('errori dell\'accesso', () => {
  it('ogni problema ha il suo messaggio in italiano', () => {
    expect(accountError(auth({ name: 'AuthRetryableFetchError', status: 0 }))).toMatchObject({ kind: 'offline' })
    expect(accountError(auth({ code: 'over_email_send_rate_limit', status: 429 }))).toMatchObject({ kind: 'rate' })
    expect(accountError(auth({ code: 'otp_expired', status: 403 })).message).toContain('codice è sbagliato o scaduto')
    expect(accountError(auth({ code: 'email_address_invalid' }))).toMatchObject({ kind: 'email' })
    // Con il servizio di posta di prova, Supabase scrive solo ai membri del progetto.
    expect(accountError(auth({ code: 'email_address_not_authorized' }))).toMatchObject({ kind: 'closed' })
    expect(accountError(auth({ code: 'qualcosa_di_nuovo' }))).toMatchObject({ kind: 'other' })
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
