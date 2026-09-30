/**
 * Identificativo unico per note e cartelle: unico anche tra dispositivi e persone diverse,
 * così resta valido quando gli appunti si sincronizzano con l'account.
 */
export function newId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  // randomUUID manca solo nelle pagine non sicure (http): ora + parte casuale.
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}
