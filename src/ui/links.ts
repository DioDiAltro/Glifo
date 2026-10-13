import { texts } from '../i18n'
import { h } from './dom'

const T = texts({
  privacyPolicy: ['informativa sulla privacy', 'privacy policy'],
  faq: ['Domande frequenti e commenti', 'FAQ and feedback'],
})

/** L'informativa sulla privacy: una pagina a parte (privacy.html), che si apre anche offline. */
export const PRIVACY_URL = 'privacy.html'

/**
 * Le domande frequenti e i commenti: una pagina a parte (faq.html, su glifo.page anche glifo.page/faq),
 * che si apre anche offline (i commenti no: arrivano dal database).
 */
export const FAQ_URL = 'faq.html'

/** Un link all'informativa sulla privacy, che si apre in una scheda nuova. */
export function privacyLink(text = T.privacyPolicy): HTMLAnchorElement {
  return h('a', { attrs: { href: PRIVACY_URL, target: '_blank', rel: 'noopener' } }, text)
}

/** Un link alle domande frequenti e ai commenti, che si apre in una scheda nuova. */
export function faqLink(text = T.faq): HTMLAnchorElement {
  return h('a', { attrs: { href: FAQ_URL, target: '_blank', rel: 'noopener' } }, text)
}
