/**
 * Il segno del controllo delle uguaglianze scritte (src/math/sheet.ts, `Sheet.read`): ✓ se il
 * risultato scritto è giusto, ✗ con il valore giusto se è sbagliato. Lo stesso testo nell'editor
 * (src/editor/calcResults.ts) e nell'anteprima.
 */
import type { EqualityCheck } from '../math/sheet'
import { escapeHtml, renderTex } from './katex'

/** Il segno spiegato a parole (per il suggerimento e per chi non vede). */
export function checkTitle(check: EqualityCheck): string {
  if (check.ok) return check.rounded ? 'Giusto con le cifre scritte (arrotondato): lo ha controllato Glifo' : 'Giusto: lo ha controllato Glifo'
  return `Sbagliato secondo Glifo: il valore giusto è ${check.value?.text ?? '?'}`
}

/** Il segno nell'anteprima, dopo la formula: ✓, oppure ✗ «fa» e il valore giusto disegnato con KaTeX. */
export function checkHtml(check: EqualityCheck): string {
  const title = escapeHtml(checkTitle(check))
  if (check.ok) return `<span class="calc-check is-ok" title="${title}" role="img" aria-label="${title}">✓</span>`
  const drawn = check.value ? renderTex(check.value.tex) : null
  const value = !check.value ? '' : drawn && !drawn.error ? drawn.html : escapeHtml(check.value.text)
  return `<span class="calc-check is-wrong" title="${title}">✗${value ? ` fa ${value}` : ''}</span>`
}
