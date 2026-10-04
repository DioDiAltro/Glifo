import { shareUrl, type SharedLink } from '../share/link'
import type { PullResult } from './sync'

/**
 * «Scarica i miei dati»: tutto quello che l'account ha sul server (note, cartelle, impostazioni,
 * dizionario e link condivisi), in un file JSON. Ha la forma del backup, quindi «Ripristina
 * backup» lo rimette in Glifo, anche senza account.
 */
export function accountDataFile(
  data: PullResult,
  account: { userId: string; email: string },
  /** Come si entra (email, google…) e cosa ne sa il servizio di accesso (per Google: nome e immagine). */
  login: { providers: string[]; profile: Record<string, unknown> } = { providers: [], profile: {} },
  now = new Date(),
  /** Le note condivise con un link (la fotografia è una copia della nota, che c'è già). */
  links: SharedLink[] = [],
  /** L'indirizzo di Glifo, per scrivere i link per intero. */
  base = typeof location === 'undefined' ? 'https://example.invalid/' : location.href,
): string {
  const ms = (iso: string) => Date.parse(iso)
  const dictionary = data.settings?.dictionary
  return JSON.stringify(
    {
      app: 'glifo',
      version: 1,
      exportedAt: now.toISOString(),
      account: { id: account.userId, email: account.email, providers: login.providers, profile: login.profile },
      notes: data.notes
        .filter((n) => !n.deleted_at)
        .map((n) => ({ id: n.id, title: n.title, createdAt: ms(n.created_at), updatedAt: ms(n.updated_at), folderId: n.folder_id, content: n.content })),
      folders: data.folders
        .filter((f) => !f.deleted_at)
        .map((f) => ({ id: f.id, name: f.name, createdAt: ms(f.created_at), updatedAt: ms(f.updated_at) })),
      settings: data.settings?.settings ?? {},
      dictionary: Array.isArray(dictionary) ? dictionary : [],
      sharedLinks: links.map((l) => ({
        noteId: l.noteId,
        title: l.title,
        link: shareUrl(l.token, base),
        allowCopy: l.allowCopy,
        createdAt: l.createdAt,
        updatedAt: l.updatedAt,
      })),
    },
    null,
    2,
  )
}
