/**
 * Un Supabase finto per le prove nel browser. L'accesso accetta sempre il codice 123456;
 * la sincronizzazione invece è quella vera: sync_pull e sync_push girano sulle migrazioni di
 * supabase/migrations, in un Postgres in memoria (PGlite).
 */
import { readdirSync, readFileSync } from 'node:fs'
import { PGlite } from '@electric-sql/pglite'

const ROOT = new URL('../supabase/', import.meta.url)
export const SUPABASE_URL = 'https://fgsuonetdmcgojbvrsxi.supabase.co'
export const CODE = '123456'
const LINK_CODE = 'codice-del-link'

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
  /** L'ultima richiesta di accesso: con il link nell'email si torna a `redirectTo`. */
  let lastLogin = null
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

  /** Come l'API di Supabase: una transazione per richiesta, con l'utente preso dal token. */
  function rpc(name, userId, body) {
    return db.transaction(async (tx) => {
      await tx.query(`select set_config('role', 'authenticated', true), set_config('request.jwt.claims', $1, true)`, [
        JSON.stringify({ sub: userId, role: 'authenticated' }),
      ])
      const { rows } =
        name === 'sync_pull'
          ? await tx.query('select public.sync_pull($1) as r', [body.since ?? null])
          : await tx.query('select public.sync_push($1::jsonb) as r', [JSON.stringify(body.changes ?? {})])
      return rows[0].r
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

    if (path === '/auth/v1/otp') {
      lastLogin = { email: body.email, redirectTo: url.searchParams.get('redirect_to') }
      return reply(200, {})
    }
    if (path === '/auth/v1/verify') {
      if (body.token !== CODE) {
        const message = 'Token has expired or is invalid'
        return reply(403, { code: 'otp_expired', error_code: 'otp_expired', message, msg: message })
      }
      return reply(200, session(await userFor(body.email)))
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
    const fn = /^\/rest\/v1\/rpc\/(sync_pull|sync_push)$/.exec(path)?.[1]
    if (fn) {
      const userId = userIdFrom(request.headers().authorization ?? '')
      if (!userId) return reply(401, { code: '42501', message: `permission denied for function ${fn}`, details: null, hint: null })
      try {
        return reply(200, await rpc(fn, userId, body))
      } catch (err) {
        return reply(400, { code: err.code ?? 'P0001', message: err.message, details: err.detail ?? null, hint: err.hint ?? null })
      }
    }
    return reply(404, { message: `Non previsto dal Supabase finto: ${path}` })
  }

  return {
    /** Collega il Supabase finto a un contesto del browser (un «dispositivo»). */
    attach: (context) => context.route(`${SUPABASE_URL}/**`, handle),
    /** L'indirizzo del link nell'email per l'ultima richiesta di accesso. */
    link() {
      const target = new URL(lastLogin.redirectTo)
      target.searchParams.set('code', LINK_CODE)
      return target.href
    },
    /** Le note dell'account salvate nel database. */
    async notes(email) {
      const { rows } = await db.query('select * from public.notes where owner_id = $1 order by created_at', [users.get(email)])
      return rows
    },
    close: () => db.close(),
  }
}
