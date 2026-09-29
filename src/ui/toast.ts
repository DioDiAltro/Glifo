import { h } from './dom'

let container: HTMLElement | null = null

/** Messaggio breve in basso (es. "Salvato", "Copiato"). */
export function toast(message: string, kind: 'info' | 'error' = 'info'): void {
  if (!container) {
    container = h('div', { class: 'toasts', attrs: { role: 'status', 'aria-live': 'polite' } })
    document.body.append(container)
  }
  const el = h('div', { class: `toast${kind === 'error' ? ' is-error' : ''}` }, message)
  container.append(el)
  requestAnimationFrame(() => el.classList.add('is-visible'))
  setTimeout(() => {
    el.classList.remove('is-visible')
    setTimeout(() => el.remove(), 300)
  }, kind === 'error' ? 5000 : 2200)
}
