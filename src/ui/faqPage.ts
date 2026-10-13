import '../styles/app.css'
import { inClaudeViewer } from '../host'
import { lang, rich, texts } from '../i18n'
import { NEW_ORIGIN, relocationPhase } from '../relocation'
import type { Site } from '../site'
import { loadSettings } from '../store/settings'
import { commentsOffInClaude, commentsView } from './comments'
import { h } from './dom'
import { faqSection } from './faq'
import { feedbackOffInClaude } from './feedback'
import { logoMark } from './logo'

declare const __GLIFO_SITE__: Site
declare const __GLIFO_VERSION__: string

const T = texts({
  title: ['Domande frequenti e commenti', 'FAQ and feedback'],
  openGlifo: ['Apri Glifo', 'Open Glifo'],
  comments: ['Commenti', 'Feedback'],
  footer: ['Glifo è un posto dove prendere appunti con le formule, anche offline. {privacy}', 'Glifo is a place to take notes with formulas, even offline. {privacy}'],
})

/**
 * La pagina «Domande frequenti e commenti» (faq.html, su glifo.page anche glifo.page/faq; GRAFICA.md,
 * punto 2, 13 ottobre 2026): in cima le domande frequenti (faq.ts), sotto i commenti di chi prova Glifo
 * (comments.ts) con «Scrivi un commento». Si apre dal link nella finestra del fumetto e da Impostazioni →
 * Informazioni, si manda a chiunque con il link e non carica l'editor. Come l'informativa, il service
 * worker la tiene per l'uso offline: le domande si leggono anche senza rete, i commenti no. Per ora non
 * va nei motori di ricerca (noindex in faq.html): ci sono i nomi di chi scrive.
 */

/** Dove sono i commenti nella pagina: faq.html#commenti. */
const COMMENTS_ID = 'commenti'

// Dal giorno del trasloco il vecchio indirizzo manda al nuovo, con la stessa domanda (src/relocation.ts).
if (relocationPhase(location.origin, new Date()) === 'moved') location.replace(`${NEW_ORIGIN}/faq${location.hash}`)

// La lingua e il tema di Glifo, come nell'app (main.ts): faq.html è scritta in italiano.
document.documentElement.lang = lang
document.title = `${T.title} · Glifo`
const settings = loadSettings()
if (settings.theme !== 'auto') document.documentElement.dataset.theme = settings.theme

const inClaude = __GLIFO_SITE__ === 'claude' || inClaudeViewer()
const faq = faqSection({ commentsId: COMMENTS_ID })
const comments = h(
  'section',
  { class: 'faq-section faq-comments', attrs: { id: COMMENTS_ID, 'aria-labelledby': 'comments-title' } },
  h('h2', { attrs: { id: 'comments-title' } }, T.comments),
  commentsView({
    off: inClaude ? commentsOffInClaude() : undefined,
    feedback: {
      site: inClaude ? 'claude' : __GLIFO_SITE__,
      version: __GLIFO_VERSION__,
      off: inClaude ? feedbackOffInClaude() : undefined,
    },
  }),
)

document.getElementById('app')!.replaceChildren(
  h(
    'header',
    { class: 'shared-top' },
    h(
      'a',
      { class: 'brand', attrs: { href: './', title: T.openGlifo } },
      h('span', { class: 'brand-mark', attrs: { 'aria-hidden': 'true' }, html: logoMark() }),
      h('span', { class: 'brand-name' }, 'Glifo'),
    ),
    h('div', { class: 'shared-info' }, h('h1', { class: 'shared-title' }, T.title)),
    h('div', { class: 'shared-actions' }, h('a', { class: 'btn btn-primary', attrs: { href: './' } }, T.openGlifo)),
  ),
  h('main', { class: 'faq-main' }, faq.element, comments),
  h('footer', { class: 'shared-foot' }, ...rich(T.footer, { privacy: h('a', { attrs: { href: './privacy.html' } }, 'Privacy') })),
)

/** Con una domanda nell'indirizzo (faq.html#offline) la apre; con #commenti va ai commenti. */
function followHash(): void {
  if (faq.openFromHash(location.hash)) return
  if (location.hash === `#${COMMENTS_ID}`) comments.scrollIntoView({ block: 'start' })
}
followHash()
window.addEventListener('hashchange', followHash)
