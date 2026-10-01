/**
 * Il simbolo di Glifo: ∮, l'integrale su un percorso chiuso, a tratto pieno come le icone
 * dell'interfaccia. Da qui vengono il marchio nella barra in alto e le icone dell'app in
 * `public/`, che si ridisegnano con `node scripts/icons.mjs`.
 */

/** In un quadrato di 64 unità: l'integrale, inclinato come nelle formule, e l'anello al centro. */
const GLYPH = '<path d="M43.5 15.5C41.3 12.1 35.35 11.91 34 20L30 44C28.65 52.09 22.7 51.9 20.5 48.5"/><circle cx="32" cy="32" r="8"/>'

export const LOGO_COLOR = '#4f46e5'

/** Il simbolo del colore `color`, rimpicciolito di `scale` attorno al centro del quadrato. */
function glyph(color: string, scale: number): string {
  return `<g fill="none" stroke="${color}" stroke-width="5.5" stroke-linecap="round" transform="translate(32 32) scale(${scale}) translate(-32 -32)">${GLYPH}</g>`
}

/** Il marchio nella barra in alto: il simbolo del colore del testo, sullo sfondo dato dal CSS. */
export function logoMark(): string {
  return `<svg viewBox="0 0 64 64" width="28" height="28" aria-hidden="true">${glyph('currentColor', 0.92)}</svg>`
}

/**
 * L'icona dell'app, bianca su indaco. `full`: lo sfondo arriva fino agli angoli e il simbolo è
 * più piccolo, per telefoni e tablet che ritagliano l'icona con la loro forma.
 */
export function logoIcon(full = false): string {
  const background = full ? `<rect width="64" height="64" fill="${LOGO_COLOR}"/>` : `<rect width="64" height="64" rx="14" fill="${LOGO_COLOR}"/>`
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">',
    `  ${background}`,
    `  ${glyph('#fff', full ? 0.8 : 0.92)}`,
    '</svg>',
    '',
  ].join('\n')
}
