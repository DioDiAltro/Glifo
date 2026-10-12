import { texts } from '../i18n'
import { h } from './dom'

const T = texts({
  privacyPolicy: ['informativa sulla privacy', 'privacy policy'],
})

/** L'informativa sulla privacy: una pagina a parte (privacy.html), che si apre anche offline. */
export const PRIVACY_URL = 'privacy.html'

/** Un link all'informativa sulla privacy, che si apre in una scheda nuova. */
export function privacyLink(text = T.privacyPolicy): HTMLAnchorElement {
  return h('a', { attrs: { href: PRIVACY_URL, target: '_blank', rel: 'noopener' } }, text)
}
