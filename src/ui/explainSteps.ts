/**
 * Come si disegnano i passaggi di una spiegazione (src/ui/explainPanel.ts) e le risposte della chat
 * (src/ui/explainChat.ts): la frase con le formule in linea, la formula del passaggio con il segno di
 * Glifo (✓, ✗ con il valore giusto, «non controllato») e, dove non c'è un risultato a cui arrivare, il
 * riepilogo delle formule controllate.
 */
import type { Explanation } from '../ai/explain'
import { checkHtml } from '../render/check'
import { escapeHtml, renderTex } from '../render/katex'
import { h } from './dom'

/**
 * Una frase con le formule in linea ($…$): il testo sempre come testo, le formule con KaTeX. La
 * punteggiatura subito dopo una formula resta attaccata a lei: da sola andrebbe a capo.
 */
export function sentenceHtml(text: string): string {
  const parts = text.split(/(\$[^$]+\$)/g)
  let out = ''
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (!/^\$[^$]+\$$/.test(part)) {
      out += escapeHtml(part)
      continue
    }
    const tex = part.slice(1, -1)
    const { html, error } = renderTex(tex, false)
    const drawn = error ? `<code>${escapeHtml(tex)}</code>` : html
    const punct = /^[.,;:!?)]+/.exec(parts[i + 1] ?? '')?.[0] ?? ''
    if (punct) parts[i + 1] = parts[i + 1].slice(punct.length)
    out += punct ? `<span class="explain-nowrap">${drawn}${escapeHtml(punct)}</span>` : drawn
  }
  return out
}

export function texHtml(tex: string, display: boolean): string {
  const { html, error } = renderTex(tex, display)
  return error ? `<code>${escapeHtml(tex)}</code>` : html
}

/** I passaggi, numerati, con il segno di Glifo accanto a ogni formula. */
export function stepsList(e: Explanation): HTMLElement {
  const list = h('ol', { class: 'explain-steps' })
  for (const step of e.steps) {
    const mark = step.formula
      ? step.check
        ? checkHtml(step.check.ok ? { ok: true, ...(step.check.rounded && { rounded: true }) } : { ok: false, ...(step.check.value && { value: step.check.value }) })
        : '<span class="explain-unchecked" title="Glifo non sa controllare questo passaggio">non controllato</span>'
      : ''
    list.append(
      h(
        'li',
        { class: `explain-step${step.check ? (step.check.ok ? ' is-ok' : ' is-wrong') : ''}` },
        step.text ? h('div', { class: 'explain-text', html: sentenceHtml(step.text) }) : null,
        step.formula ? h('div', { class: 'explain-math' }, h('div', { class: 'explain-math-render', html: texHtml(step.formula, true) }), h('div', { class: 'explain-mark', html: mark })) : null,
      ),
    )
  }
  return list
}

/**
 * Il riepilogo quando non c'è un risultato a cui arrivare (un grafico, un teorema, una risposta della
 * chat): quante formule ha controllato Glifo, e che le frasi le scrive il modello. `what`: «questa
 * spiegazione», «questa risposta».
 */
export function formulasSummary(e: Explanation, what: string): HTMLElement {
  const formulas = e.steps.filter((s) => s.formula)
  const checked = formulas.filter((s) => s.check?.ok).length
  const wrong = formulas.filter((s) => s.check && !s.check.ok).length
  const text = !formulas.length
    ? `Glifo non ha formule da controllare in ${what}: le frasi le scrive il modello, e possono sbagliare.`
    : !checked && !wrong
      ? `Glifo non ha potuto controllare le formule di ${what}: le frasi le scrive il modello, e possono sbagliare.`
      : `${wrong ? '✗' : '✓'} Formule controllate da Glifo: ${checked + wrong} su ${formulas.length}${wrong ? `, ${wrong} sbagliat${wrong === 1 ? 'a' : 'e'}` : ', tutte giuste'}. Le frasi le scrive il modello.`
  return h('p', { class: `explain-summary${checked && !wrong ? ' is-ok' : wrong ? ' is-wrong' : ''}`, attrs: { role: 'status' } }, text)
}
