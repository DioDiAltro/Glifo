/**
 * Un Supabase finto per le prove nel browser. L'accesso accetta sempre il codice 123456, il
 * link dell'ultima email (aperto o incollato) e Google (la «pagina di Google» riporta subito
 * a Glifo con l'account scelto con setGoogle); la sincronizzazione invece è quella vera:
 * sync_pull, sync_push e le note condivise con un link girano sulle migrazioni di
 * supabase/migrations, in un Postgres in memoria (PGlite).
 */
import { randomBytes } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'
import { PGlite } from '@electric-sql/pglite'

const ROOT = new URL('../supabase/', import.meta.url)
export const SUPABASE_URL = 'https://fgsuonetdmcgojbvrsxi.supabase.co'
export const CODE = '123456'
const LINK_CODE = 'codice-del-link'
export const GOOGLE_CODE = 'codice-di-google'

const b64 = (value) => Buffer.from(JSON.stringify(value)).toString('base64url')

export async function createFakeSupabase() {
  const db = await PGlite.create()
  await db.exec(readFileSync(new URL('tests/supabase-stub.sql', ROOT), 'utf8'))
  const files = readdirSync(new URL('migrations/', ROOT))
    .filter((f) => f.endsWith('.sql'))
    .sort()
  for (const file of files) await db.exec(readFileSync(new URL(`migrations/${file}`, ROOT), 'utf8'))

  /** email → id */
  const users = new Map()
  /** L'ultima richiesta di accesso: il link nell'email ha `tokenHash` e riporta a `redirectTo`. */
  let lastLogin = null
  /** L'accesso con Google: se è attivo in Supabase e con quale account Google si entra. */
  let google = { enabled: true, email: null }
  /** Per le prove: sync_push risponde con un errore, così le modifiche restano da mandare. */
  let pushFails = false
  const emailOf = (id) => [...users].find(([, uid]) => uid === id)?.[0]

  async function userFor(email) {
    let id = users.get(email)
    if (!id) {
      const { rows } = await db.query(
        `insert into auth.users (id, email, aud, role) values (gen_random_uuid(), $1, 'authenticated', 'authenticated') returning id`,
        [email],
      )
      id = rows[0].id
      users.set(email, id)
    }
    return { id, email }
  }

  const userJson = ({ id, email }) => ({
    id,
    aud: 'authenticated',
    role: 'authenticated',
    email,
    email_confirmed_at: '2026-09-30T10:00:00Z',
    app_metadata: { provider: 'email', providers: ['email'] },
    user_metadata: {},
    identities: [],
    created_at: '2026-09-30T10:00:00Z',
    updated_at: '2026-09-30T10:00:00Z',
  })

  function session(user) {
    const now = Math.floor(Date.now() / 1000)
    const claims = { sub: user.id, email: user.email, role: 'authenticated', aud: 'authenticated', iat: now, exp: now + 3600 }
    return {
      access_token: `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64(claims)}.firma`,
      token_type: 'bearer',
      expires_in: 3600,
      expires_at: now + 3600,
      refresh_token: `refresh-${user.id}`,
      user: userJson(user),
    }
  }

  function userIdFrom(authorization) {
    try {
      const claims = JSON.parse(Buffer.from(authorization.replace(/^Bearer /i, '').split('.')[1], 'base64url').toString())
      return claims.role === 'authenticated' ? claims.sub : null
    } catch {
      return null
    }
  }

  /** Le funzioni del database che l'app chiama, con gli argomenti presi dal corpo della richiesta. */
  const CALLS = {
    sync_pull: (b) => ['select public.sync_pull($1) as r', [b.since ?? null]],
    sync_push: (b) => ['select public.sync_push($1::jsonb) as r', [JSON.stringify(b.changes ?? {})]],
    delete_account: () => ['select public.delete_account() as r', []],
    share_note: (b) => ['select public.share_note($1, $2, $3, $4) as r', [b.note, b.title, b.content, b.allow_copy ?? true]],
    set_shared_copy: (b) => ['select public.set_shared_copy($1, $2) as r', [b.note, b.allow_copy]],
    unshare_note: (b) => ['select public.unshare_note($1) as r', [b.note]],
    shared_links: (b) => ['select public.shared_links($1) as r', [b.note ?? null]],
    shared_note: (b) => ['select public.shared_note($1) as r', [b.token ?? null]],
  }
  /** Quelle che si possono chiamare anche senza accesso (come anon). */
  const PUBLIC_CALLS = new Set(['shared_note'])

  /** Come l'API di Supabase: una transazione per richiesta, con l'utente preso dal token (o anon). */
  function rpc(name, userId, body) {
    return db.transaction(async (tx) => {
      if (userId) {
        await tx.query(`select set_config('role', 'authenticated', true), set_config('request.jwt.claims', $1, true)`, [
          JSON.stringify({ sub: userId, role: 'authenticated' }),
        ])
      } else await tx.query(`select set_config('role', 'anon', true), set_config('request.jwt.claims', '', true)`)
      const [sql, args] = CALLS[name](body)
      const { rows } = await tx.query(sql, args)
      return rows[0].r ?? null
    })
  }

  const cors = {
    'access-control-allow-origin': '*',
    'access-control-allow-headers': '*',
    'access-control-allow-methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'access-control-expose-headers': '*',
    'x-supabase-api-version': '2024-01-01',
  }

  async function handle(route) {
    const request = route.request()
    const reply = (status, data) =>
      route.fulfill({ status, headers: { ...cors, 'content-type': 'application/json' }, body: data === undefined ? '' : JSON.stringify(data) })
    if (request.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors })
    const url = new URL(request.url())
    const path = url.pathname
    const raw = request.postData()
    const body = raw ? JSON.parse(raw) : {}

    if (path === '/auth/v1/settings') return reply(200, { external: { email: true, google: google.enabled }, disable_signup: false })
    if (path === '/auth/v1/authorize') {
      // La pagina di Google: si sceglie l'account (quello di setGoogle) e si torna a Glifo.
      if (!google.enabled || url.searchParams.get('provider') !== 'google') {
        return reply(400, { code: 400, error_code: 'validation_failed', msg: 'Unsupported provider: provider is not enabled' })
      }
      const back = new URL(url.searchParams.get('redirect_to'))
      back.searchParams.set('code', GOOGLE_CODE)
      return route.fulfill({
        status: 200,
        headers: { 'content-type': 'text/html' },
        body: `<!doctype html><title>Google</title><script>location.replace(${JSON.stringify(back.href)})</script>`,
      })
    }
    if (path === '/auth/v1/otp') {
      lastLogin = { email: body.email, redirectTo: url.searchParams.get('redirect_to'), tokenHash: `pkce_${randomBytes(28).toString('hex')}` }
      return reply(200, {})
    }
    if (path === '/auth/v1/verify') {
      const expired = () => {
        const message = 'Token has expired or is invalid'
        return reply(403, { code: 'otp_expired', error_code: 'otp_expired', message, msg: message })
      }
      // Il link dell'email incollato in Glifo: vale una volta sola.
      if (body.token_hash) {
        if (body.token_hash !== lastLogin?.tokenHash || lastLogin.used) return expired()
        lastLogin.used = true
        return reply(200, session(await userFor(lastLogin.email)))
      }
      if (body.token !== CODE) return expired()
      return reply(200, session(await userFor(body.email)))
    }
    if (path === '/auth/v1/token' && url.searchParams.get('grant_type') === 'pkce' && body.auth_code === GOOGLE_CODE) {
      if (!body.code_verifier || !google.email) {
        return reply(400, { code: 'flow_state_not_found', error_code: 'flow_state_not_found', message: 'invalid flow state' })
      }
      return reply(200, session(await userFor(google.email)))
    }
    if (path === '/auth/v1/token' && url.searchParams.get('grant_type') === 'pkce') {
      // Il link nell'email: il codice del link vale per l'ultima richiesta di accesso.
      if (body.auth_code !== LINK_CODE || !body.code_verifier || !lastLogin) {
        return reply(400, { code: 'flow_state_not_found', error_code: 'flow_state_not_found', message: 'invalid flow state' })
      }
      return reply(200, session(await userFor(lastLogin.email)))
    }
    if (path === '/auth/v1/token') {
      const id = String(body.refresh_token ?? '').replace('refresh-', '')
      const email = emailOf(id)
      if (!email) return reply(400, { code: 'refresh_token_not_found', error_code: 'refresh_token_not_found', message: 'Invalid Refresh Token' })
      return reply(200, session({ id, email }))
    }
    if (path === '/auth/v1/logout') return route.fulfill({ status: 204, headers: cors })
    if (path === '/auth/v1/user') {
      const id = userIdFrom(request.headers().authorization ?? '')
      return id ? reply(200, userJson({ id, email: emailOf(id) })) : reply(401, { code: 'no_authorization', message: 'No authorization' })
    }
    const fn = /^\/rest\/v1\/rpc\/(\w+)$/.exec(path)?.[1]
    if (fn && Object.hasOwn(CALLS, fn)) {
      const userId = userIdFrom(request.headers().authorization ?? '')
      if (!userId && !PUBLIC_CALLS.has(fn)) {
        return reply(401, { code: '42501', message: `permission denied for function ${fn}`, details: null, hint: null })
      }
      if (fn === 'sync_push' && pushFails) return reply(503, { code: 'PGRST000', message: 'Servizio non disponibile (prova)', details: null, hint: null })
      try {
        const result = await rpc(fn, userId, body)
        // Con l'account eliminato, la stessa email rientrando ne crea uno nuovo.
        if (fn === 'delete_account') users.delete(emailOf(userId))
        return reply(200, result)
      } catch (err) {
        return reply(400, { code: err.code ?? 'P0001', message: err.message, details: err.detail ?? null, hint: err.hint ?? null })
      }
    }
    // I commenti di chi prova Glifo (src/ui/feedback.ts): si scrivono soltanto, come anon o con l'accesso.
    if (path === '/rest/v1/feedback' && request.method() === 'POST') {
      const userId = userIdFrom(request.headers().authorization ?? '')
      const columns = Object.keys(body).filter((c) => /^[a-z_]+$/.test(c))
      try {
        await db.transaction(async (tx) => {
          if (userId) {
            await tx.query(`select set_config('role', 'authenticated', true), set_config('request.jwt.claims', $1, true)`, [
              JSON.stringify({ sub: userId, role: 'authenticated' }),
            ])
          } else await tx.query(`select set_config('role', 'anon', true), set_config('request.jwt.claims', '', true)`)
          await tx.query(
            `insert into public.feedback (${columns.join(', ')}) values (${columns.map((_, i) => `$${i + 1}`).join(', ')})`,
            columns.map((c) => body[c]),
          )
        })
        return reply(201)
      } catch (err) {
        return reply(err.code === '42501' ? 401 : 400, { code: err.code ?? 'P0001', message: err.message, details: err.detail ?? null, hint: err.hint ?? null })
      }
    }
    return reply(404, { message: `Non previsto dal Supabase finto: ${path}` })
  }

  return {
    /** Collega il Supabase finto a un contesto del browser (un «dispositivo»). */
    attach: (context) => context.route(`${SUPABASE_URL}/**`, handle),
    /** Il link com'è scritto nell'ultima email (da copiare e incollare in Glifo). */
    emailLink() {
      const link = new URL(`${SUPABASE_URL}/auth/v1/verify`)
      link.searchParams.set('token', lastLogin.tokenHash)
      link.searchParams.set('type', 'magiclink')
      link.searchParams.set('redirect_to', lastLogin.redirectTo)
      return link.href
    },
    /** Dove porta il link dell'ultima email, dopo il passaggio da Supabase. */
    link() {
      const target = new URL(lastLogin.redirectTo)
      target.searchParams.set('code', LINK_CODE)
      return target.href
    },
    /** Con quale account Google si entra, e se l'accesso con Google è attivo. */
    setGoogle(options) {
      google = { ...google, ...options }
    },
    /** Per le prove: fa fallire (o di nuovo riuscire) sync_push. */
    failPush(value) {
      pushFails = value
    },
    /** L'id dell'account con questa email, se c'è. */
    userId: (email) => users.get(email) ?? null,
    /** Quello che resta nel database dell'account `id`: l'utente e le sue note. */
    async countsFor(id) {
      const { rows } = await db.query(
        'select (select count(*) from auth.users where id = $1)::int as users, (select count(*) from public.notes where owner_id = $1)::int as notes',
        [id],
      )
      return rows[0]
    },
    /** I commenti arrivati (come li vede chi fa Glifo nella dashboard). */
    async feedback() {
      const { rows } = await db.query('select * from public.feedback order by created_at')
      return rows
    },
    /** Le note dell'account salvate nel database. */
    async notes(email) {
      const { rows } = await db.query('select * from public.notes where owner_id = $1 order by created_at', [users.get(email)])
      return rows
    },
    close: () => db.close(),
  }
}
