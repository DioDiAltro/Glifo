import type { AuthError, PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import { AUTH_STORAGE_KEY, SUPABASE_KEY, SUPABASE_URL } from './config'
import { SyncError, type PullResult, type PushChanges, type PushResult, type SyncBackend } from './sync'
import { parseLink, type SharedLink } from '../share/link'

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
          // Il link nell'email e la pagina di Google riportano qui con ?code=…
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
    readonly kind: 'offline' | 'rate' | 'code' | 'input' | 'email' | 'closed' | 'other',
    message: string,
  ) {
    super(message)
  }
}

const MESSAGES: Record<AccountError['kind'], string> = {
  offline: 'Non c\'è connessione: riprova quando sei online.',
  rate: 'Hai chiesto troppe email di fila: aspetta un po\' e riprova (a volte serve anche un\'ora).',
  code: 'Il link o il codice è sbagliato o scaduto: usa quello dell\'ultima email che hai ricevuto, oppure chiedine un\'altra.',
  input: 'Incolla qui il link che trovi nell\'email, oppure scrivi il codice se c\'è.',
  email: 'Controlla l\'indirizzo email: sembra sbagliato.',
  closed: 'A questo indirizzo per ora non possiamo mandare l\'email: entra con «Continua con Google».',
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

/**
 * Manda l'email per entrare (crea l'account se non c'è ancora). Con il servizio di posta di
 * Supabase l'email ha solo un link; il codice c'è se il modello dell'email contiene `{{ .Token }}`.
 */
export async function sendCode(email: string): Promise<void> {
  const sb = await loadClient()
  const { error } = await withTimeout(sb.auth.signInWithOtp({ email, options: { shouldCreateUser: true, emailRedirectTo: appUrl() } }))
  if (error) throw accountError(error)
}

export interface SignedIn {
  userId: string
  email: string
}

/**
 * Il token del link di accesso copiato dall'email, o `null`. Serve quando il link si aprirebbe
 * in un altro browser (per esempio in quello dell'app di Gmail): lì l'accesso non si completa,
 * incollato in Glifo sì. Va bene anche il link «avvolto» da Outlook o da un antivirus.
 * Esportata per i test.
 */
export function emailLinkToken(text: string): string | null {
  let s = text.trim()
  for (let i = 0; i < 3; i++) {
    const token = /\/auth\/v1\/verify\?(?:[^\s"'<>]*&)?token=([\w-]{20,})/.exec(s)?.[1]
    if (token) return token
    try {
      const decoded = decodeURIComponent(s)
      if (decoded === s) break
      s = decoded
    } catch {
      break
    }
  }
  return null
}

/** Controlla il codice ricevuto via email, oppure il link dell'email incollato; se va bene, l'accesso è fatto. */
export async function verifyCode(email: string, input: string): Promise<SignedIn> {
  const tokenHash = emailLinkToken(input)
  const code = input.replace(/\s+/g, '')
  if (!tokenHash && !/^\d{6,10}$/.test(code)) throw new AccountError('input', MESSAGES.input)
  const sb = await loadClient()
  const { data, error } = await withTimeout(
    tokenHash ? sb.auth.verifyOtp({ token_hash: tokenHash, type: 'email' }) : sb.auth.verifyOtp({ email, token: code, type: 'email' }),
  )
  if (error || !data.user) throw error ? accountError(error) : new AccountError('code', MESSAGES.code)
  const user = { userId: data.user.id, email: data.user.email ?? email }
  // Il link di un'email vecchia, per un altro indirizzo: non si entra in un account diverso.
  if (user.email.toLowerCase() !== email.toLowerCase()) {
    await sb.auth.signOut({ scope: 'local' }).catch(() => undefined)
    throw new AccountError('code', 'Questo link è per un altro indirizzo: usa quello dell\'email che ti abbiamo appena mandato.')
  }
  return user
}

/** Quali modi di entrare sono attivi, dalla risposta di /auth/v1/settings (esportata per i test). */
export function providerEnabled(settings: unknown, provider: string): boolean {
  const external = (settings as { external?: Record<string, unknown> } | null)?.external
  return external?.[provider] === true
}

/**
 * Accesso con Google: si va sulla pagina di Google e si torna su Glifo con ?code=… (vedi
 * main.ts). Prima si controlla che in Supabase l'accesso con Google sia attivo: altrimenti
 * Supabase mostrerebbe una pagina di errore al posto di quella di Google.
 */
export async function signInWithGoogle(): Promise<void> {
  const sb = await loadClient()
  let settings: unknown
  try {
    const res = await withTimeout(fetch(`${SUPABASE_URL}/auth/v1/settings`, { headers: { apikey: SUPABASE_KEY } }))
    settings = await res.json()
  } catch {
    throw new AccountError('offline', MESSAGES.offline)
  }
  if (!providerEnabled(settings, 'google')) {
    throw new AccountError('closed', 'L\'accesso con Google non è ancora attivo: per ora entra con l\'email.')
  }
  const { data, error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: appUrl(), skipBrowserRedirect: true } })
  if (error || !data.url) throw accountError(error)
  location.assign(data.url)
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
  if (error.hint === 'quota') return new SyncError('quota', error.message, error.hint)
  return new SyncError('server', error.message, error.hint ?? undefined)
}

type Rpc = 'sync_pull' | 'sync_push' | 'delete_account' | 'share_note' | 'set_shared_copy' | 'unshare_note' | 'shared_links'

async function call<T>(name: Rpc, args: Record<string, unknown>): Promise<T> {
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

/**
 * Controlla che l'accesso salvato in questo browser sia proprio di `userId`. Potrebbe essere di
 * un altro account, per esempio subito dopo essere entrati con un altro account Google, o se
 * in un'altra scheda si è appena entrati con un altro account: allora non si manda, non si
 * scarica e non si elimina niente, così le note di un account non finiscono in un altro.
 */
async function ensureSessionOf(userId: string): Promise<void> {
  let sb: SupabaseClient
  try {
    sb = await supabase()
  } catch {
    throw new SyncError('offline', 'Nessuna connessione')
  }
  const { data, error } = await sb.auth.getSession()
  if (error && (error.name === 'AuthRetryableFetchError' || error.status === 0)) throw new SyncError('offline', 'Nessuna connessione')
  if (data.session?.user.id !== userId) throw new SyncError('auth', 'L\'accesso salvato in questo browser è di un altro account')
}

/** Il server degli account per la sincronizzazione dell'account `userId`. */
export function supabaseBackendFor(userId: string): SyncBackend {
  return {
    pull: async (since: string | null) => {
      await ensureSessionOf(userId)
      return call<PullResult>('sync_pull', { since })
    },
    push: async (changes: PushChanges) => {
      await ensureSessionOf(userId)
      return call<PushResult>('sync_push', { changes })
    },
  }
}

/**
 * Elimina sul server l'account `userId`: con l'utente spariscono note, cartelle e impostazioni
 * (vedi supabase/migrations). Serve la connessione; gli errori sono quelli della sincronizzazione.
 */
export async function deleteAccount(userId: string): Promise<void> {
  await ensureSessionOf(userId)
  await call<null>('delete_account', {})
}

/**
 * Condivide con un link una nota dell'account `userId`, o ne aggiorna la fotografia: chi ha il
 * link la vede com'è adesso. La nota deve essere già nell'account (dopo la sincronizzazione).
 */
export async function shareNote(userId: string, note: { id: string; title: string; content: string }, allowCopy: boolean): Promise<SharedLink> {
  await ensureSessionOf(userId)
  const link = parseLink(await call<unknown>('share_note', { note: note.id, title: note.title, content: note.content, allow_copy: allowCopy }))
  if (!link) throw new SyncError('server', 'Risposta inattesa dal server')
  return link
}

/** Consente o no di salvarsi una copia, senza cambiare la fotografia. Null se la nota non ha link. */
export async function setSharedCopy(userId: string, noteId: string, allowCopy: boolean): Promise<SharedLink | null> {
  await ensureSessionOf(userId)
  return parseLink(await call<unknown>('set_shared_copy', { note: noteId, allow_copy: allowCopy }))
}

/** Toglie il link della nota: da lì in poi non si apre più. */
export async function unshareNote(userId: string, noteId: string): Promise<void> {
  await ensureSessionOf(userId)
  await call<null>('unshare_note', { note: noteId })
}

/** I link dell'account (di una nota sola, se si dice quale), dal più recente. */
export async function sharedLinks(userId: string, noteId?: string): Promise<SharedLink[]> {
  await ensureSessionOf(userId)
  const data = await call<unknown>('shared_links', noteId ? { note: noteId } : {})
  return (Array.isArray(data) ? data : []).map(parseLink).filter((l): l is SharedLink => l !== null)
}

/** Come si entra nell'account e cosa ne sa il servizio di accesso (per «Scarica i miei dati»). */
export async function loginDetails(): Promise<{ providers: string[]; profile: Record<string, unknown> }> {
  const sb = await supabase()
  const user = (await sb.auth.getSession()).data.session?.user
  const providers = user?.app_metadata?.providers
  return { providers: Array.isArray(providers) ? providers : [], profile: user?.user_metadata ?? {} }
}
