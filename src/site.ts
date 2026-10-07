/**
 * Quale Glifo è: vite.config.ts lo decide nella build e lo passa all'app in `__GLIFO_SITE__`.
 * - `online`: il sito, su GitHub Pages;
 * - `claude`: la copia per claude.ai (`GLIFO_NO_PWA=1`: la demo e le prove della grafica, vedi CLAUDE.md);
 * - `prova`: il sito di prova su Cloudflare Pages (glifo-prova.pages.dev, dal ramo `prova`), dove
 *   Cloudflare mette `CF_PAGES` nella build.
 * Fuori dal sito niente service worker e l'account spento, così gli appunti veri non si toccano.
 */
export type Site = 'online' | 'claude' | 'prova'

/** Cosa dice la finestra di Accedi dove l'account è spento. */
export function accountOffMessage(site: Site): string {
  if (site === 'prova') {
    return 'Questo è il sito di prova di Glifo: l\'accesso è spento, così gli appunti veri non si toccano, e le note scritte qui restano solo in questo browser. Sul sito di Glifo funziona.'
  }
  return 'In questa copia di Glifo dentro claude.ai l\'accesso è spento, così gli appunti veri non si toccano: sul sito di Glifo funziona.'
}
