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

const SWITCH_KEY = 'glifo.cambio-account'

/** Dopo «Cambia account» la pagina si ricarica e riapre la finestra per entrare (main.ts). */
export interface AccountSwitch {
  /** L'account lasciato: i suoi appunti restano in questo browser. */
  email: string
  /** Qualche modifica non è arrivata nell'account: parte quando si rientra. */
  pending: boolean
}

export function leaveSwitch(info: AccountSwitch): void {
  try {
    sessionStorage.setItem(SWITCH_KEY, JSON.stringify(info))
  } catch {
    /* sessionStorage non disponibile: la finestra non si riapre, resta «Accedi» */
  }
}

/** Il cambio di account appena fatto in questa scheda, se c'è (e lo toglie). */
export function takeSwitch(): AccountSwitch | null {
  try {
    const raw = sessionStorage.getItem(SWITCH_KEY)
    sessionStorage.removeItem(SWITCH_KEY)
    const info = raw ? (JSON.parse(raw) as Partial<AccountSwitch> | null) : null
    return info && typeof info.email === 'string' ? { email: info.email, pending: info.pending === true } : null
  } catch {
    return null
  }
}
