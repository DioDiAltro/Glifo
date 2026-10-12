/**
 * Il segno del controllo delle uguaglianze scritte (src/math/sheet.ts, `Sheet.read`): ✓ se il
 * risultato scritto è giusto, ✗ con il valore giusto se è sbagliato. Lo stesso testo nell'editor
 * (src/editor/calcResults.ts) e nell'anteprima.
 */
import { texts } from '../i18n'
import type { EqualityCheck } from '../math/sheet'
import { escapeHtml, renderTex } from './katex'

const T = texts({
  rightRounded: [
    'Giusto con le cifre scritte (arrotondato): lo ha controllato Glifo',
    'Correct to the digits written (rounded): checked by Glifo',
  ],
  right: ['Giusto: lo ha controllato Glifo', 'Correct: checked by Glifo'],
  wrong: (value: string) => [`Sbagliato secondo Glifo: il valore giusto è ${value}`, `Wrong according to Glifo: the correct value is ${value}`],
  /** Il ✗ con il valore giusto (`value` è già HTML). */
  wrongIs: (value: string) => [`✗ fa ${value}`, `✗ should be ${value}`],
})

/** Il segno spiegato a parole (per il suggerimento e per chi non vede). */
export function checkTitle(check: EqualityCheck): string {
  if (check.ok) return check.rounded ? T.rightRounded : T.right
  return T.wrong(check.value?.text ?? '?')
}

/** Il segno nell'anteprima, dopo la formula: ✓, oppure ✗ «fa» e il valore giusto disegnato con KaTeX. */
export function checkHtml(check: EqualityCheck): string {
  const title = escapeHtml(checkTitle(check))
  if (check.ok) return `<span class="calc-check is-ok" title="${title}" role="img" aria-label="${title}">✓</span>`
  const drawn = check.value ? renderTex(check.value.tex) : null
  const value = !check.value ? '' : drawn && !drawn.error ? drawn.html : escapeHtml(check.value.text)
  return `<span class="calc-check is-wrong" title="${title}">${value ? T.wrongIs(value) : '✗'}</span>`
}
