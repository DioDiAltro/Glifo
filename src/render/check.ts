/**
 * Il segno del controllo delle uguaglianze scritte (src/math/sheet.ts, `Sheet.read`): ✓ se il
 * risultato scritto è giusto, ✗ con il valore giusto se è sbagliato, o con il motivo se Glifo non
 * legge la formula e c'è da dirlo. Lo stesso testo nell'editor (src/editor/calcResults.ts) e nell'anteprima.
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
  wrongOnLine: (line: number, value: string) => [
    `Sbagliato secondo Glifo alla riga ${line}: il valore giusto è ${value}`,
    `Wrong according to Glifo on line ${line}: the correct value is ${value}`,
  ],
  /** Il ✗ con il valore giusto (`value` è già HTML). */
  wrongIs: (value: string) => [`✗ fa ${value}`, `✗ should be ${value}`],
  /** In una formula su più righe (\\), con la riga sbagliata. */
  wrongIsOnLine: (line: number, value: string) => [`✗ riga ${line}: fa ${value}`, `✗ line ${line}: should be ${value}`],
  wrongLine: (line: number) => [`✗ riga ${line}`, `✗ line ${line}`],
  /** Una formula che Glifo non legge, con il motivo (`EqualityCheck.error`: dopo d/dx le parentesi sono obbligatorie). */
  unreadable: (reason: string) => [`Glifo non riesce a leggere la formula: ${reason}`, `Glifo can't read the formula: ${reason}`],
  unreadableOnLine: (line: number, reason: string) => [`Glifo non riesce a leggere la riga ${line}: ${reason}`, `Glifo can't read line ${line}: ${reason}`],
  /** Il ✗ con il motivo (`reason` è già HTML). */
  unreadableOnLineIs: (line: number, reason: string) => [`✗ riga ${line}: ${reason}`, `✗ line ${line}: ${reason}`],
})

/** Il segno spiegato a parole (per il suggerimento e per chi non vede). */
export function checkTitle(check: EqualityCheck): string {
  if (check.ok) return check.rounded ? T.rightRounded : T.right
  if (check.error) return check.line ? T.unreadableOnLine(check.line, check.error) : T.unreadable(check.error)
  const value = check.value?.text ?? '?'
  return check.line ? T.wrongOnLine(check.line, value) : T.wrong(value)
}

/** Il segno nell'anteprima, dopo la formula: ✓, oppure ✗ «fa» e il valore giusto disegnato con KaTeX (o il motivo). */
export function checkHtml(check: EqualityCheck): string {
  const title = escapeHtml(checkTitle(check))
  if (check.ok) return `<span class="calc-check is-ok" title="${title}" role="img" aria-label="${title}">✓</span>`
  if (check.error) {
    const reason = escapeHtml(check.error)
    return `<span class="calc-check is-wrong" title="${title}">${check.line ? T.unreadableOnLineIs(check.line, reason) : `✗ ${reason}`}</span>`
  }
  const drawn = check.value ? renderTex(check.value.tex) : null
  const value = !check.value ? '' : drawn && !drawn.error ? drawn.html : escapeHtml(check.value.text)
  const label = check.line ? (value ? T.wrongIsOnLine(check.line, value) : T.wrongLine(check.line)) : value ? T.wrongIs(value) : '✗'
  return `<span class="calc-check is-wrong" title="${title}">${label}</span>`
}
