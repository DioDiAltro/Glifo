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

export interface ToastOptions {
  /** Un pulsante nel messaggio (es. «Ricarica»): il messaggio resta finché non lo si preme o lo si chiude con ×. */
  action?: { label: string; run: () => void }
  /** Il messaggio resta finché chi l'ha mostrato non lo toglie con `dismissToast` (es. «Apro l'editor…»). */
  sticky?: boolean
}

/**
 * Messaggio breve in basso (es. "Salvato", "Copiato"). Restituisce il messaggio, per toglierlo prima con
 * `dismissToast`.
 */
export function toast(message: string, kind: 'info' | 'error' = 'info', options: ToastOptions = {}): HTMLElement {
  container ??= h('div', { class: 'toasts', attrs: { role: 'status', 'aria-live': 'polite' } })
  const where = host()
  if (container.parentElement !== where) where.append(container)
  const { action } = options
  const el = action
    ? h(
        'div',
        { class: `toast has-action${kind === 'error' ? ' is-error' : ''}` },
        h('span', { class: 'toast-text' }, message),
        h(
          'button',
          {
            class: 'toast-action',
            attrs: { type: 'button' },
            on: {
              click: () => {
                dismissToast(el)
                action.run()
              },
            },
          },
          action.label,
        ),
        h('button', { class: 'toast-close', title: 'Chiudi', attrs: { type: 'button', 'aria-label': 'Chiudi' }, on: { click: () => dismissToast(el) } }, '×'),
      )
    : h('div', { class: `toast${kind === 'error' ? ' is-error' : ''}` }, message)
  container.append(el)
  requestAnimationFrame(() => el.classList.add('is-visible'))
  if (!action && !options.sticky) setTimeout(() => dismissToast(el), kind === 'error' ? 5000 : 2200)
  return el
}

/** Toglie un messaggio (se c'è ancora). */
export function dismissToast(el: HTMLElement): void {
  if (!el.isConnected || el.classList.contains('is-leaving')) return
  el.classList.add('is-leaving')
  el.classList.remove('is-visible')
  setTimeout(() => el.remove(), 300)
}
