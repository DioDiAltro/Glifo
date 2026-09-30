import { h } from './dom'

/** L'informativa sulla privacy: una pagina a parte (privacy.html), che si apre anche offline. */
export const PRIVACY_URL = 'privacy.html'

/** Un link all'informativa sulla privacy, che si apre in una scheda nuova. */
export function privacyLink(text = 'informativa sulla privacy'): HTMLAnchorElement {
  return h('a', { attrs: { href: PRIVACY_URL, target: '_blank', rel: 'noopener' } }, text)
}
