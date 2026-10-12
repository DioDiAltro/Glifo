import katex from 'katex'
// Estensione per la chimica: \ce{H2O}, \pu{9.81 m/s^2}
import 'katex/contrib/mhchem'
import { texts } from '../i18n'

const T = texts({
  unknownCommand: (cmd: string) => [`Comando sconosciuto: ${cmd}`, `Unknown command: ${cmd}`],
  missingCloseBrace: ['Manca una parentesi graffa di chiusura }', 'Missing a closing brace }'],
  extraBrace: ['C\'è una parentesi graffa } di troppo', 'There\'s an extra brace }'],
  missingAfterScript: ['Manca qualcosa dopo ^ o _', 'Something is missing after ^ or _'],
  doubleSuperscript: ['Due esponenti di seguito: usa le graffe, es. x^{a^b}', 'Two superscripts in a row: use braces, e.g. x^{a^b}'],
  doubleSubscript: ['Due pedici di seguito: usa le graffe, es. x_{a_b}', 'Two subscripts in a row: use braces, e.g. x_{a_b}'],
  missingRight: ['Manca il \\right corrispondente a \\left', 'Missing the \\right that matches \\left'],
  unclosedEnvironment: ['Ambiente non chiuso: manca \\end{…}', 'Environment not closed: missing \\end{…}'],
  beginEndMismatch: ['\\begin e \\end non corrispondono', '\\begin and \\end don\'t match'],
  missingArgumentOf: (cmd: string) => [`Manca l'argomento di ${cmd} (es. ${cmd}{…})`, `Missing the argument of ${cmd} (e.g. ${cmd}{…})`],
  missingArgument: ['Manca un argomento tra graffe', 'Missing an argument in braces'],
  displayOnly: ['Questo comando funziona solo in una formula a blocco ($$ … $$)', 'This command only works in a block formula ($$ … $$)'],
})

export interface TexRender {
  html: string
  error: string | null
}

const cache = new Map<string, TexRender>()
const MAX_CACHE = 4000

/**
 * Disegna una formula con KaTeX (con cache: ridisegnare lo stesso TeX è gratis).
 *
 * `ui = true` si usa solo per le anteprime generate dall'app (simboli e
 * segnaposto): abilita `\htmlClass`, che non concediamo mai al testo delle note.
 * `ui = 'result'` abilita solo `\htmlClass{calc-result}`, il colore dei risultati dopo «=».
 */
export function renderTex(tex: string, displayMode = false, ui: boolean | 'result' = false): TexRender {
  const key = `${displayMode ? 'D' : 'I'}${ui === 'result' ? 'R' : ui ? 'U' : 'N'}${tex}`
  const hit = cache.get(key)
  if (hit) return hit

  let result: TexRender
  try {
    const html = katex.renderToString(tex, {
      displayMode,
      throwOnError: true,
      strict: 'ignore',
      output: 'htmlAndMathml',
      trust:
        ui === 'result'
          ? (context) => context.command === '\\htmlClass' && context.class === 'calc-result'
          : ui
          ? (context) => context.command === '\\htmlClass'
          : false,
    })
    result = { html, error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    result = { html: '', error: cleanKatexError(message) }
  }

  if (cache.size >= MAX_CACHE) {
    // Elimina la voce più vecchia (le Map mantengono l'ordine di inserimento).
    const oldest = cache.keys().next().value
    if (oldest !== undefined) cache.delete(oldest)
  }
  cache.set(key, result)
  return result
}

/**
 * La formula solo in MathML, che i browser disegnano da soli: per le immagini che escono da
 * Glifo (gli schemi nei file .md), dove gli stili e i caratteri di KaTeX non ci sono. Se la
 * formula è sbagliata resta il testo.
 */
export function renderTexMathml(tex: string, displayMode = false): string {
  try {
    return katex.renderToString(tex, { displayMode, throwOnError: true, strict: 'ignore', output: 'mathml', trust: false })
  } catch {
    return escapeHtml(tex)
  }
}

/**
 * Una formula che finisce con «=», con in fondo il risultato calcolato da Glifo (src/math/sheet.ts),
 * colorato con la classe `calc-result`. Se così non si disegna, la formula da sola.
 */
export function renderTexWithResult(tex: string, result: string, displayMode = false): string {
  const { html, error } = renderTex(`${tex} \\htmlClass{calc-result}{${result}}`, displayMode, 'result')
  return error ? renderTexOrError(tex, displayMode) : html
}

/** Versione HTML sempre valida: se la formula è sbagliata mostra l'errore. */
export function renderTexOrError(tex: string, displayMode = false): string {
  const { html, error } = renderTex(tex, displayMode)
  if (!error) return html
  const cls = displayMode ? 'katex-error katex-error-block' : 'katex-error'
  return `<span class="${cls}" title="${escapeHtml(error)}">${escapeHtml(tex)}</span>`
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

/** Traduce i messaggi di errore di KaTeX più comuni nella lingua di Glifo (gli altri restano in inglese). */
export function cleanKatexError(message: string): string {
  const msg = message.replace(/^KaTeX parse error:\s*/, '')
  const undefinedCmd = /Undefined control sequence: (\\[a-zA-Z]+|\\.)/.exec(msg)
  if (undefinedCmd) return T.unknownCommand(undefinedCmd[1])
  if (/Expected '\}', got 'EOF'/.test(msg)) return T.missingCloseBrace
  if (/Unexpected character: '\}'|Extra \}/.test(msg)) return T.extraBrace
  if (/Expected group after '\^'|Expected group after '_'/.test(msg)) return T.missingAfterScript
  if (/Double superscript/.test(msg)) return T.doubleSuperscript
  if (/Double subscript/.test(msg)) return T.doubleSubscript
  if (/Missing \\right|Expected '\\right'/.test(msg)) return T.missingRight
  if (/Expected & or \\\\ or \\cr or \\end/.test(msg)) return T.unclosedEnvironment
  if (/Mismatch: \\begin/.test(msg)) return T.beginEndMismatch
  if (/Expected group as argument to/.test(msg)) {
    const cmd = /argument to '(\\[a-zA-Z]+)'/.exec(msg)
    return cmd ? T.missingArgumentOf(cmd[1]) : T.missingArgument
  }
  if (/can only be used in display mode|works only in display equations/i.test(msg)) {
    return T.displayOnly
  }
  return msg
}
