import katex from 'katex'
// Estensione per la chimica: \ce{H2O}, \pu{9.81 m/s^2}
import 'katex/contrib/mhchem'

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
 */
export function renderTex(tex: string, displayMode = false, ui = false): TexRender {
  const key = `${displayMode ? 'D' : 'I'}${ui ? 'U' : 'N'}${tex}`
  const hit = cache.get(key)
  if (hit) return hit

  let result: TexRender
  try {
    const html = katex.renderToString(tex, {
      displayMode,
      throwOnError: true,
      strict: 'ignore',
      output: 'htmlAndMathml',
      trust: ui ? (context) => context.command === '\\htmlClass' : false,
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

/** Traduce i messaggi di errore di KaTeX più comuni in italiano. */
export function cleanKatexError(message: string): string {
  const msg = message.replace(/^KaTeX parse error:\s*/, '')
  const undefinedCmd = /Undefined control sequence: (\\[a-zA-Z]+|\\.)/.exec(msg)
  if (undefinedCmd) return `Comando sconosciuto: ${undefinedCmd[1]}`
  if (/Expected '\}', got 'EOF'/.test(msg)) return 'Manca una parentesi graffa di chiusura }'
  if (/Unexpected character: '\}'|Extra \}/.test(msg)) return 'C\'è una parentesi graffa } di troppo'
  if (/Expected group after '\^'|Expected group after '_'/.test(msg)) return 'Manca qualcosa dopo ^ o _'
  if (/Double superscript/.test(msg)) return 'Due esponenti di seguito: usa le graffe, es. x^{a^b}'
  if (/Double subscript/.test(msg)) return 'Due pedici di seguito: usa le graffe, es. x_{a_b}'
  if (/Missing \\right|Expected '\\right'/.test(msg)) return 'Manca il \\right corrispondente a \\left'
  if (/Expected & or \\\\ or \\cr or \\end/.test(msg)) return 'Ambiente non chiuso: manca \\end{…}'
  if (/Mismatch: \\begin/.test(msg)) return '\\begin e \\end non corrispondono'
  if (/Expected group as argument to/.test(msg)) {
    const cmd = /argument to '(\\[a-zA-Z]+)'/.exec(msg)
    return cmd ? `Manca l'argomento di ${cmd[1]} (es. ${cmd[1]}{…})` : 'Manca un argomento tra graffe'
  }
  if (/can only be used in display mode|works only in display equations/i.test(msg)) {
    return 'Questo comando funziona solo in una formula a blocco ($$ … $$)'
  }
  return msg
}
