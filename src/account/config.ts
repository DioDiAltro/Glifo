/**
 * Il progetto Supabase degli account (vedi supabase/README.md). La chiave è quella pubblica:
 * può stare nel codice, perché sono le regole del database a decidere chi vede cosa.
 */
export const SUPABASE_URL = 'https://fgsuonetdmcgojbvrsxi.supabase.co'
export const SUPABASE_KEY = 'sb_publishable_4jydYJz3S1NHQNZfaACsOg_QUy22pch'

/**
 * Il controllo anti-robot prima dell'email per entrare (Cloudflare Turnstile, widget «Glifo», per
 * glifo.page e diodialtro.github.io). Anche questa chiave è pubblica: quella segreta è solo in Supabase.
 */
export const TURNSTILE_SITE_KEY = '0x4AAAAAAFSl9e5iFMxjVBro'

/** Dove Supabase salva l'accesso in questo browser (e le chiavi da togliere quando si esce). */
export const AUTH_STORAGE_KEY = 'glifo.auth.v1'
