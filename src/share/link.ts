import { SUPABASE_KEY, SUPABASE_URL } from '../account/config'

/**
 * Le note condivise con un link (vedi supabase/migrations, «note condivise»): una fotografia della
 * nota, che chi ha il link legge anche senza account nella pagina nota.html.
 */

/** Il codice di un link: 22 caratteri casuali. */
const TOKEN = /^[A-Za-z0-9_-]{22}$/

/** La pagina che mostra le note condivise, accanto all'app. */
export const SHARE_PAGE = 'nota.html'

/** Un link come lo vede chi ha condiviso la nota. */
export interface SharedLink {
  token: string
  noteId: string
  title: string
  allowCopy: boolean
  createdAt: number
  updatedAt: number
  /** SHA-256 del testo della fotografia: se è diverso da quello della nota, la nota è cambiata dopo. */
  contentHash: string
}

/** Una nota condivisa, come la vede chi apre il link. */
export interface SharedNote {
  title: string
  content: string
  allowCopy: boolean
  updatedAt: number
}

export function isShareToken(value: string): boolean {
  return TOKEN.test(value)
}

/**
 * Il link di una nota condivisa: la pagina accanto all'app, con il codice dopo «#». Quello che
 * sta dopo «#» non arriva al server del sito, e il service worker dell'app riconosce la pagina.
 */
export function shareUrl(token: string, base = location.href): string {
  return new URL(`${SHARE_PAGE}#${token}`, base).href
}

/** Il codice di un link (la parte dopo «#»), oppure null se manca o non va bene. */
export function tokenFromHash(hash: string): string | null {
  let token = hash.replace(/^#/, '')
  try {
    token = decodeURIComponent(token)
  } catch {
    return null
  }
  token = token.trim()
  return isShareToken(token) ? token : null
}

/** Un link come arriva dal database (shared_links, share_note). */
export function parseLink(data: unknown): SharedLink | null {
  if (!data || typeof data !== 'object') return null
  const d = data as Record<string, unknown>
  if (typeof d.token !== 'string' || typeof d.note_id !== 'string') return null
  return {
    token: d.token,
    noteId: d.note_id,
    title: typeof d.title === 'string' ? d.title : '',
    allowCopy: d.allow_copy !== false,
    createdAt: Date.parse(String(d.created_at)) || 0,
    updatedAt: Date.parse(String(d.updated_at)) || 0,
    contentHash: typeof d.content_hash === 'string' ? d.content_hash : '',
  }
}

/** Una nota condivisa come arriva dal database (shared_note), oppure null. */
export function parseSharedNote(data: unknown): SharedNote | null {
  if (!data || typeof data !== 'object') return null
  const d = data as Record<string, unknown>
  if (typeof d.content !== 'string') return null
  return {
    title: typeof d.title === 'string' ? d.title : '',
    content: d.content,
    allowCopy: d.allow_copy !== false,
    updatedAt: Date.parse(String(d.updated_at)) || 0,
  }
}

/** SHA-256 di un testo, in esadecimale (come content_hash nel database). */
export async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

/** Perché non si è potuta aprire una nota condivisa. */
export class ShareReadError extends Error {
  constructor(
    readonly kind: 'offline' | 'server',
    message: string,
  ) {
    super(message)
  }
}

/**
 * Legge la nota di un link, anche senza account: null se il link non c'è più. Non usa il client di
 * Supabase (né l'accesso salvato nel browser): basta la chiave pubblica.
 */
export async function readSharedNote(token: string, fetchImpl: typeof fetch = (...args) => fetch(...args)): Promise<SharedNote | null> {
  let response: Response
  try {
    response = await fetchImpl(`${SUPABASE_URL}/rest/v1/rpc/shared_note`, {
      method: 'POST',
      headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      signal: typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(20_000) : undefined,
    })
  } catch {
    throw new ShareReadError('offline', 'Per aprire una nota condivisa serve la connessione.')
  }
  if (!response.ok) throw new ShareReadError('server', 'Non è stato possibile aprire la nota: riprova tra poco.')
  return parseSharedNote(await response.json().catch(() => null))
}

/** «di oggi alle 10:32», «di ieri alle 9:05», «del 3 ottobre»: quando è stata fatta la fotografia. */
export function snapshotWhen(ts: number, now = new Date()): string {
  const d = new Date(ts)
  const time = d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
  if (d.toDateString() === now.toDateString()) return `di oggi alle ${time}`
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (d.toDateString() === yesterday.toDateString()) return `di ieri alle ${time}`
  const day = d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: d.getFullYear() === now.getFullYear() ? undefined : 'numeric' })
  return `${/^(1|8|11)\b/.test(day) ? 'dell\'' : 'del '}${day}`
}
