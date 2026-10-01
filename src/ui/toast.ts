import { h } from './dom'

let container: HTMLElement | null = null

/**
 * Dove si vedono i messaggi: nella finestra modale aperta, se c'è (es. l'editor degli schemi),
 * perché quello che sta fuori resta sotto e non viene letto ad alta voce.
 */
function host(): HTMLElement {
  try {
    const modals = [...document.querySelectorAll<HTMLDialogElement>('dialog[open]')].filter((d) => d.matches(':modal'))
    return modals.at(-1) ?? document.body
  } catch {
    return document.body
  }
}

/** Messaggio breve in basso (es. "Salvato", "Copiato"). */
export function toast(message: string, kind: 'info' | 'error' = 'info'): void {
  container ??= h('div', { class: 'toasts', attrs: { role: 'status', 'aria-live': 'polite' } })
  const where = host()
  if (container.parentElement !== where) where.append(container)
  const el = h('div', { class: `toast${kind === 'error' ? ' is-error' : ''}` }, message)
  container.append(el)
  requestAnimationFrame(() => el.classList.add('is-visible'))
  setTimeout(() => {
    el.classList.remove('is-visible')
    setTimeout(() => el.remove(), 300)
  }, kind === 'error' ? 5000 : 2200)
}
