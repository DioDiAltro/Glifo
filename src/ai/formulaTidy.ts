// La pulizia del LaTeX che il lettore della lavagna (pix2text-mfr) scrive a modo suo: come lo
// scriverebbe una persona, con i comandi che Glifo e il motore conoscono. Viene da `tidy` di
// scripts/prova-lettori.py (la prova dei lettori, AI.md punto 2), con qualche regola in più.

// Le funzioni che il modello scrive come \operatorname{s i n}: in Glifo hanno il loro comando.
const FUNCTIONS = new Set(
  'sin cos tan cot sec csc arcsin arccos arctan sinh cosh tanh coth log ln lg exp lim det max min sup inf gcd dim ker deg arg Pr'.split(' '),
)

/** Il LaTeX del lettore come lo scriverebbe una persona. */
export function tidyLatex(tex: string): string {
  let t = tex
  // Una formula sola in un ambiente aligned con una riga: resta la formula.
  const aligned = /^\s*\\begin\{aligned\}\s*\{([\s\S]*)\}\s*\\\\\s*\\end\{aligned\}\s*$/.exec(t)
  if (aligned) t = aligned[1]
  t = t.replace(/\\operatorname(\*?)\s*\{\s*((?:[A-Za-z]\s*)+)\}/g, (_m, star: string, letters: string) => {
    const name = letters.replace(/\s/g, '')
    return FUNCTIONS.has(name) ? `\\${name} ` : `\\operatorname${star}{${name}}`
  })
  t = t.replace(/\\underset\s*\{(.*?)\}\s*\{\s*\\(lim|max|min|sup|inf)\s*\}/g, '\\$2_{$1}')
  t = t.replace(/\\[cdt]frac/g, '\\frac').replace(/\\(?:mathop|boldsymbol|displaystyle|textstyle|limits|nolimits)(?![A-Za-z])\s*/g, '')
  t = t.replace(/\^\s*\{\s*((?:\\prime\s*)+)\}/g, (_m, primes: string) => "'".repeat(primes.split('\\prime').length - 1))
  t = t.replace(/\\\\\s*\\end\{/g, '\\end{')
  t = t.replace(/\\left\(\s*\\begin\{matrix\}([\s\S]*?)\\end\{matrix\}\s*\\right\)/g, '\\begin{pmatrix}$1\\end{pmatrix}')
  t = t.replace(/\{\s*([A-Za-z0-9])\s*\}(?=\s*(?:&|\\\\|\\end))/g, '$1')
  // Gli spazi tra i simboli si tolgono; resta solo quello dopo un comando seguito da una lettera.
  t = t.replace(/(\\[A-Za-z]+)\s+(?=[A-Za-z0-9])/g, '$1\u0000')
  t = t.replace(/\s+/g, '').replace(/\u0000/g, ' ')
  // \! (uno spazio negativo) e \mathrm intorno a qualche lettera (dx, x, e): chi scrive non li mette.
  t = t.replace(/\\!/g, '').replace(/\\mathrm\{([A-Za-z0-9=+-]{1,4})\}/g, '$1')
  // \left( e \right) intorno a una parentesi qualsiasi: chi scrive mette la parentesi e basta.
  t = t.replace(/\\(?:left|right)\./g, '')
  t = t.replace(/\\(?:left|right)(?=[()[\]|]|\\[{}|]|\\[lr]vert(?![A-Za-z])|\\[lr]angle(?![A-Za-z]))/g, '')
  // Il binomiale: il lettore lo scrive come una matrice di una colonna e due righe.
  t = t.replace(/\\begin\{pmatrix\}([^&\\]*(?:\\(?!\\)[^&\\]*)*)\\\\([^&\\]*(?:\\(?!\\)[^&\\]*)*)\\end\{pmatrix\}/g, '\\binom{$1}{$2}')
  // Un solo carattere in apice o in pedice non ha bisogno delle graffe (x^2, a_1); prima di una
  // lettera o di una cifra resta uno spazio, come si scrive (\int_0^1 x, \log_2 8).
  t = t.replace(/([\^_])\{([A-Za-z0-9])\}(?=([A-Za-z0-9])?)/g, (_m, mark: string, c: string, next?: string) => `${mark}${c}${next ? ' ' : ''}`)
  // Una lettera tra graffe dopo un apice o un pedice di un carattere: \sin^2{x} → \sin^2 x, \sum^n{k} → \sum^n k.
  t = t.replace(/([\^_][A-Za-z0-9])\{([A-Za-z0-9])\}/g, '$1 $2')
  // Dopo un apice o un pedice di un carattere, la lettera che segue si stacca: \int_0^1x → \int_0^1 x.
  t = t.replace(/([\^_][A-Za-z0-9])(?=[A-Za-z0-9])/g, '$1 ')
  // Gli spazi messi in fondo dal lettore (\; \, \quad) non servono.
  t = t.replace(/(?:\\[,;:!]|\\q?quad(?![A-Za-z])|~)+$/, '')
  return withoutLooseGroups(t).trim()
}

/** Toglie le graffe di un gruppo che non è l'argomento di niente: ={\frac{a}{b}} → =\frac{a}{b}. */
function withoutLooseGroups(tex: string): string {
  let t = tex
  for (let i = 0; i < t.length; i++) {
    if (t[i] !== '{' || (i > 0 && t[i - 1] === '\\')) continue
    const before = i === 0 ? '' : t[i - 1]
    if (before !== '' && !'=+-(,'.includes(before)) continue
    const end = closing(t, i)
    if (end < 0) continue
    const after = t[end + 1] ?? ''
    if (after !== '' && !'=+-),'.includes(after)) continue
    t = t.slice(0, i) + t.slice(i + 1, end) + t.slice(end + 1)
    i--
  }
  return t
}

/** La graffa che chiude quella in `start`, senza contare quelle scritte \{ e \}; −1 se manca. */
function closing(tex: string, start: number): number {
  let depth = 0
  for (let i = start; i < tex.length; i++) {
    if (tex[i] === '\\') {
      i++
      continue
    }
    if (tex[i] === '{') depth++
    else if (tex[i] === '}' && --depth === 0) return i
  }
  return -1
}
