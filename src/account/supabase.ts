import type { AuthError, PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import { AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL } from './config'
import { SyncError, type PullResult, type PushChanges, type PushResult, type SyncBackend } from './sync'

let client: Promise<SupabaseClient> | null = null

/** Il client di Supabase: si scarica solo quando serve, chi non usa l'account non lo scarica. */
export function supabase(): Promise<SupabaseClient> {
  client ??= import('@supabase/supabase-js')
    .then(({ createClient }) =>
      createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: {
          storageKey: AUTH_STORAGE_KEY,
          persistSession: true,
          autoRefreshToken: true,
          // Il link nell'email (se c'è al posto del codice) riporta qui con ?code=…
          detectSessionInUrl: true,
          flowType: 'pkce',
        },
      }),
    )
    .catch((err: unknown) => {
      // Senza rete la prima volta: si riprova alla prossima occasione.
      client = null
      throw err
    })
  return client
}

/** Un problema con l'accesso, con il messaggio da mostrare. */
export class AccountError extends Error {
  constructor(
    readonly kind: 'offline' | 'rate' | 'code' | 'email' | 'closed' | 'other',
    message: string,
  ) {
    super(message)
  }
}

const MESSAGES: Record<AccountError['kind'], string> = {
  offline: 'Non c\'è connessione: riprova quando sei online.',
  rate: 'Hai chiesto troppi codici di fila: aspetta qualche minuto e riprova.',
  code: 'Il codice è sbagliato o scaduto: controlla l\'ultima email che hai ricevuto, oppure chiedine un altro.',
  email: 'Controlla l\'indirizzo email: sembra sbagliato.',
  closed: 'Per ora l\'accesso è aperto solo a chi sta provando Glifo: questo indirizzo non può ricevere il codice.',
  other: 'Non è stato possibile accedere. Riprova tra poco.',
}

/** Il messaggio da mostrare per un errore dell'accesso (esportata per i test). */
export function accountError(error: AuthError | null | undefined): AccountError {
  const code = error?.code ?? ''
  const kind: AccountError['kind'] =
    !error || error.name === 'AuthRetryableFetchError' || error.status === 0
      ? 'offline'
      : code.startsWith('over_') || error.status === 429
        ? 'rate'
        : code === 'otp_expired'
          ? 'code'
          : code === 'email_address_invalid' || code === 'validation_failed'
            ? 'email'
            : code === 'email_address_not_authorized' || code === 'signup_disabled' || code === 'otp_disabled'
              ? 'closed'
              : 'other'
  return new AccountError(kind, MESSAGES[kind])
}

async function loadClient(): Promise<SupabaseClient> {
  try {
    return await supabase()
  } catch {
    throw new AccountError('offline', MESSAGES.offline)
  }
}

/**
 * Una richiesta che non risponde (rete debole, Wi-Fi con pagina di accesso) non deve restare
 * in sospeso per sempre: dopo un po' vale come «senza connessione».
 */
function withTimeout<T>(promise: Promise<T>, ms = 20_000): Promise<T> {
  let timer = 0
  const timeout = new Promise<never>((_, reject) => {
    timer = window.setTimeout(() => reject(new AccountError('offline', MESSAGES.offline)), ms)
  })
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}

/** L'indirizzo di Glifo: il link nell'email riporta qui. */
function appUrl(): string {
  return location.origin + location.pathname
}

/** Manda il codice di accesso all'indirizzo email (crea l'account se non c'è ancora). */
export async function sendCode(email: string): Promise<void> {
  const sb = await loadClient()
  const { error } = await withTimeout(sb.auth.signInWithOtp({ email, options: { shouldCreateUser: true, emailRedirectTo: appUrl() } }))
  if (error) throw accountError(error)
}

export interface SignedIn {
  userId: string
  email: string
}

/** Controlla il codice ricevuto via email; se è giusto, l'accesso è fatto. */
export async function verifyCode(email: string, code: string): Promise<SignedIn> {
  const sb = await loadClient()
  const { data, error } = await withTimeout(sb.auth.verifyOtp({ email, token: code, type: 'email' }))
  if (error || !data.user) throw error ? accountError(error) : new AccountError('code', MESSAGES.code)
  return { userId: data.user.id, email: data.user.email ?? email }
}

/** L'accesso salvato in questo browser, se c'è (per esempio dopo aver aperto il link dell'email). */
export async function currentSession(): Promise<SignedIn | null> {
  const sb = await loadClient()
  const { data } = await sb.auth.getSession()
  const user = data.session?.user
  return user ? { userId: user.id, email: user.email ?? '' } : null
}

/** Esce dall'account in questo browser. Senza rete l'accesso si toglie lo stesso da qui. */
export async function signOut(): Promise<void> {
  try {
    const sb = await supabase()
    await sb.auth.signOut({ scope: 'local' })
  } catch {
    /* si toglie tutto qui sotto */
  }
  try {
    for (const key of Object.keys(localStorage)) if (key.startsWith(AUTH_STORAGE_KEY)) localStorage.removeItem(key)
  } catch {
    /* localStorage non disponibile */
  }
}

/** Perché la sincronizzazione non è riuscita, dalla risposta del server (esportata per i test). */
export function syncError(error: PostgrestError, status: number): SyncError {
  if (status === 0 || /fetch|network|load failed|abort|timeout/i.test(error.message)) return new SyncError('offline', 'Nessuna connessione')
  if (status === 401 || status === 403 || error.code === '42501' || error.code === 'PGRST301' || error.code === 'PGRST303') {
    return new SyncError('auth', 'Accesso scaduto')
  }
  if (error.hint === 'quota') return new SyncError('quota', error.message)
  return new SyncError('server', error.message)
}

async function call<T>(name: 'sync_pull' | 'sync_push', args: Record<string, unknown>): Promise<T> {
  let sb: SupabaseClient
  try {
    sb = await supabase()
  } catch {
    throw new SyncError('offline', 'Nessuna connessione')
  }
  // Dopo 30 secondi senza risposta si lascia perdere: si riprova alla prossima occasione.
  const request = sb.rpc(name, args)
  const { data, error, status } = await (typeof AbortSignal.timeout === 'function' ? request.abortSignal(AbortSignal.timeout(30_000)) : request)
  if (error) throw syncError(error, status)
  return data as T
}

/** Il server degli account per la sincronizzazione. */
export const supabaseBackend: SyncBackend = {
  pull: (since: string | null) => call<PullResult>('sync_pull', { since }),
  push: (changes: PushChanges) => call<PushResult>('sync_push', { changes }),
}
