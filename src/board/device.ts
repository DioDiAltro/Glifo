/**
 * Il dispositivo, per la lavagna: su iPad e iPhone lo schermo intero del browser non va bene per
 * scrivere. Safari prende i tocchi della penna per una tastiera finta («Non è consentito digitare
 * nei siti web a tutto schermo») ed esce, ed esce anche con un pizzico o trascinando verso il basso:
 * lì la lavagna copre la finestra e basta.
 */
export function appleTouch(nav: Pick<Navigator, 'userAgent' | 'maxTouchPoints'> = navigator): boolean {
  // L'iPad si presenta come un Mac: lo distingue lo schermo touch, che i Mac non hanno.
  return /iPad|iPhone|iPod/.test(nav.userAgent) || (/Macintosh/.test(nav.userAgent) && nav.maxTouchPoints > 1)
}
