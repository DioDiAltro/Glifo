const NOTICE_KEY = 'glifo.notice'

/**
 * Un avviso da mostrare all'apertura della prossima pagina (resta solo in questa scheda): per
 * esempio dopo aver ricaricato l'app, o dalla pagina di una nota condivisa all'app.
 */
export function leaveNotice(message: string): void {
  try {
    sessionStorage.setItem(NOTICE_KEY, message)
  } catch {
    /* sessionStorage non disponibile: niente avviso */
  }
}

/** L'avviso lasciato prima di cambiare pagina, se c'è (e lo toglie). */
export function takeNotice(): string | null {
  try {
    const message = sessionStorage.getItem(NOTICE_KEY)
    sessionStorage.removeItem(NOTICE_KEY)
    return message
  } catch {
    return null
  }
}
