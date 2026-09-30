import { readJson, writeJson } from './storage'

/** Una nota o una cartella eliminata con l'account attivo. */
export interface Deletion {
  id: string
  /** La versione dell'account da cui si è eliminato (null: mai arrivata all'account). */
  rev: number | null
  /** Quando è stata eliminata. */
  at: number
}

/**
 * Le eliminazioni ancora da mandare all'account. Restano segnate finché il server non le
 * conosce, altrimenti la nota tornerebbe dall'account alla sincronizzazione successiva.
 */
export class DeletionLog {
  constructor(private readonly key: string) {}

  list(): Deletion[] {
    const raw = readJson<unknown>(this.key, [])
    if (!Array.isArray(raw)) return []
    return raw.filter((d): d is Deletion => typeof d === 'object' && d !== null && typeof (d as Deletion).id === 'string')
  }

  get(id: string): Deletion | null {
    return this.list().find((d) => d.id === id) ?? null
  }

  add(deletion: Deletion): void {
    writeJson(this.key, [...this.list().filter((d) => d.id !== deletion.id), deletion])
  }

  /** Il server la conosce già (o la nota è tornata): non c'è più niente da mandare. */
  forget(id: string): void {
    const list = this.list()
    if (list.some((d) => d.id === id)) writeJson(this.key, list.filter((d) => d.id !== id))
  }

  /** L'ultima modifica mandata all'account è diventata la versione `rev`. */
  setRev(id: string, rev: number): void {
    const list = this.list()
    if (list.some((d) => d.id === id)) writeJson(this.key, list.map((d) => (d.id === id ? { ...d, rev } : d)))
  }
}
