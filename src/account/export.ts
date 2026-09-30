import type { PullResult } from './sync'

/**
 * «Scarica i miei dati»: tutto quello che l'account ha sul server (note, cartelle, impostazioni
 * e dizionario), in un file JSON. Ha la forma del backup, quindi «Ripristina backup» lo rimette
 * in Glifo, anche senza account.
 */
export function accountDataFile(data: PullResult, account: { userId: string; email: string }, now = new Date()): string {
  const ms = (iso: string) => Date.parse(iso)
  const dictionary = data.settings?.dictionary
  return JSON.stringify(
    {
      app: 'glifo',
      version: 1,
      exportedAt: now.toISOString(),
      account: { id: account.userId, email: account.email },
      notes: data.notes
        .filter((n) => !n.deleted_at)
        .map((n) => ({ id: n.id, title: n.title, createdAt: ms(n.created_at), updatedAt: ms(n.updated_at), folderId: n.folder_id, content: n.content })),
      folders: data.folders
        .filter((f) => !f.deleted_at)
        .map((f) => ({ id: f.id, name: f.name, createdAt: ms(f.created_at), updatedAt: ms(f.updated_at) })),
      settings: data.settings?.settings ?? {},
      dictionary: Array.isArray(dictionary) ? dictionary : [],
    },
    null,
    2,
  )
}
