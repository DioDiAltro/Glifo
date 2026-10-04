/**
 * Il simbolo di Glifo: ∮, l'integrale su un percorso chiuso, com'è nei libri di matematica. È il ∮
 * dei caratteri di KaTeX (KaTeX_Size1, lo stesso che si vede nelle formule; KaTeX ha la licenza MIT),
 * un po' più pieno perché si legga anche piccolo. Da qui vengono il logo nella barra laterale (solo il
 * simbolo, del colore del tema) e le icone dell'app in `public/`, che si ridisegnano con
 * `node scripts/icons.mjs`.
 */

/** Il contorno del ∮ nelle unità del carattere (1000 per em, y verso l'alto). */
const OINT =
  'M153 -195 Q153 -225 129 -237 Q128 -238 124.0 -239.5 Q120 -241 116 -242 L113 -244 Q113 -245 118.5 ' +
  '-250.0 Q124 -255 128 -257 Q144 -269 167 -269 Q186 -269 199 -260 Q223 -246 235 -208 Q251 -163 266 ' +
  '33 L269 74 L264 76 Q260 79 253.5 81.5 Q247 84 246 85 Q179 119 156 192 Q148 216 148 250 Q148 283 ' +
  '156 307 Q182 390 265 423 Q270 425 277.5 427.0 Q285 429 293.5 431.0 Q302 433 306 434 L307 444 ' +
  'Q308 449 313.0 486.5 Q318 524 322.0 555.0 Q326 586 327 591 Q352 735 424 782 Q449 798 479 804 ' +
  'Q481 804 488.5 804.5 Q496 805 501 805 Q548 802 579.0 772.0 Q610 742 610 695 Q610 673 596.0 659.0 ' +
  'Q582 645 561.0 645.0 Q540 645 526.0 659.5 Q512 674 512 694 Q512 724 536 736 Q537 737 541.0 738.5 ' +
  'Q545 740 548 742 L552 743 Q552 748 537 756 Q520 768 498 768 Q454 768 434 716 Q415 672 405 527 ' +
  'L397 425 Q397 423 420 414 Q487 380 510 307 Q518 283 518 250 Q518 216 510 192 Q484 109 401 76 ' +
  'Q396 74 388.5 72.0 Q381 70 372.5 68.0 Q364 66 360 65 L359 55 Q357 41 351.5 -2.5 Q346 -46 343.0 ' +
  '-63.5 Q340 -81 334.0 -112.5 Q328 -144 320.5 -165.5 Q313 -187 303 -207 Q274 -269 225 -293 Q199 ' +
  '-306 169 -306 Q97 -306 67 -244 Q55 -223 55 -196 Q55 -174 69.0 -160.0 Q83 -146 104.0 -146.0 Q125 ' +
  '-146 139.0 -160.5 Q153 -175 153 -195 Z M300 391 Q300 393 292 390 Q248 378 217.5 339.5 Q187 301 ' +
  '187 249 Q187 203 211.0 169.0 Q235 135 272 116V122 Q273 126 275 154 Q283 253 298 374 Z M479 249 ' +
  'Q479 292 456.5 327.5 Q434 363 402 379 L394 383V377 Q393 373 391 346 Q385 274 369 133 Q366 112 ' +
  '366 107 Q372 107 388 114 Q426 128 452.5 165.0 Q479 202 479 249 Z'
/** Il riquadro del contorno, nelle stesse unità. */
const BOX = { x0: 55, y0: -306, x1: 610, y1: 805 }

export const LOGO_COLOR = '#4f46e5'

/**
 * Il simbolo del colore `color`, alto `height` unità al centro di un quadrato di 64; `bold` lo
 * ingrossa (nelle unità del carattere) con un contorno dello stesso colore.
 */
function glyph(color: string, height: number, bold: number): string {
  const s = height / (BOX.y1 - BOX.y0)
  const tx = 32 - (s * (BOX.x0 + BOX.x1)) / 2
  const ty = 32 + (s * (BOX.y0 + BOX.y1)) / 2
  const n = (v: number) => Number(v.toFixed(4))
  return `<g transform="translate(${n(tx)} ${n(ty)}) scale(${n(s)} ${n(-s)})"><path d="${OINT}" fill="${color}" stroke="${color}" stroke-width="${bold}" stroke-linejoin="round"/></g>`
}

/** Il logo nella barra laterale: solo il simbolo, del colore del testo (il CSS gli dà quello del tema). */
export function logoMark(): string {
  return `<svg viewBox="0 0 64 64" width="28" height="28" aria-hidden="true">${glyph('currentColor', 54, 26)}</svg>`
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
    `  ${glyph('#fff', full ? 38 : 44, 30)}`,
    '</svg>',
    '',
  ].join('\n')
}
