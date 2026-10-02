/**
 * Le espressioni dei grafici e dei calcoli. Si scrivono come nelle formule di Glifo, in LaTeX
 * (`\frac{1}{x}`, `\sin^2 x`, `x^{2}`, `\sqrt[3]{x}`), o come in una calcolatrice (`sqrt(x)`,
 * `sin(x)`, `2*x`, `1/x`). Qui diventano un albero (`MathNode`): `evaluate.ts` lo calcola,
 * `latex.ts` lo riscrive in LaTeX.
 *
 * Valgono le regole del LaTeX, così un'espressione vale quello che si vede disegnato: `x^23` è
 * x²·3 (come la disegna KaTeX), `ab` è a·b, `\sin 2x` è sin(2x) e `\sin x \cos x` è
 * sin(x)·cos(x). Dove il LaTeX non avrebbe senso si fa come una calcolatrice: `x^-1` è x⁻¹ e
 * `2^(x+1)` è 2 alla x+1.
 *
 * I decimali si scrivono con il punto (`0.5`) o con la virgola: `0{,}5` come in LaTeX, oppure
 * `0,5` senza spazi. Dentro parentesi tonde e quadre però la virgola separa (`(1,2)` è un punto,
 * `[0,5]` un intervallo). Le migliaia si possono separare con i punti (`2.500.000`).
 */

export type RelOp = '=' | '<' | '<=' | '>' | '>=' | '!=' | '≈'

export type MathNode =
  | { k: 'num'; v: number; /** Il numero come è scritto, con il punto: serve ai conti esatti. */ text: string; comma: boolean }
  | { k: 'name'; name: string }
  | { k: 'neg'; a: MathNode }
  /** `cross`: scritto con \times (o ×): tra due vettori è il prodotto vettoriale, tra due intervalli un rettangolo. */
  | { k: 'bin'; op: '+' | '-' | '*' | '/' | '^'; a: MathNode; b: MathNode; implicit?: boolean; frac?: boolean; cross?: boolean }
  /**
   * Una funzione nota: `\sin x`, `\log_2 x` (base), `\sqrt[3]{x}` (indice in `base`), `\sin^2 x` (pow).
   * Gradiente, divergenza, rotore e laplaciano scritti con \nabla hanno `nabla`.
   */
  | { k: 'fn'; name: string; args: MathNode[]; pow?: MathNode; base?: MathNode; nabla?: boolean }
  /** `f(x)`, `f'(2)`: una funzione definita nella nota, oppure (se `f` è un numero) un prodotto. */
  | { k: 'apply'; name: string; args: MathNode[]; primes: number }
  | { k: 'post'; op: '!' | '%' | '°'; a: MathNode }
  | { k: 'abs' | 'floor' | 'ceil'; a: MathNode }
  | { k: 'binom'; n: MathNode; r: MathNode }
  | { k: 'big'; op: 'sum' | 'prod'; v: string; from: MathNode; to: MathNode; body: MathNode }
  | { k: 'int'; v: string; from: MathNode; to: MathNode; body: MathNode }
  /**
   * `\iint_D f \, dx \, dy`, `\iiint_E f \, dV`: l'integrale su un dominio, che è un insieme, una
   * condizione (x^2 + y^2 \le 1), un rettangolo ([0, 1] \times [0, 2]) o il nome di un insieme.
   */
  | { k: 'mint'; vars: string[]; domain: MathNode; body: MathNode }
  /**
   * Una derivata: `\frac{d}{dx} …`, `\frac{\partial^2 f}{\partial x \partial y}`, `\partial_x f`; `vars` ha
   * una variabile per ogni derivata. Di una funzione in un punto (`\frac{\partial f}{\partial x}(1, 2)`)
   * `body` è f(1, 2).
   */
  | { k: 'diff'; body: MathNode; vars: string[]; partial: boolean }
  /**
   * Un integrale di linea sulla curva `curve` (definita nella nota: γ(t) = (…), t ∈ [a, b]): di una
   * funzione (`ds`) o di un campo (il lavoro: F · dr); `form` se è scritto come P dx + Q dy.
   */
  | { k: 'lint'; curve: string; closed: boolean; ds: boolean; body: MathNode; form?: boolean }
  /** Un integrale sulla superficie `surface` (S(u, v) = (…)): di una funzione (`dS`) o il flusso di un campo. */
  | { k: 'sint'; surface: string; closed: boolean; dS: boolean; body: MathNode }
  /** `\{(x, y) \in \mathbb{R}^2 : x^2 + y^2 \le 1\}`: un insieme; `vars` null se non le scrive. */
  | { k: 'set'; vars: string[] | null; cond: MathNode }
  | { k: 'cases'; rows: { value: MathNode; cond: MathNode | null }[] }
  /** Una matrice (\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}), o un vettore colonna: le righe. */
  | { k: 'matrix'; rows: MathNode[][] }
  | { k: 'tuple'; items: MathNode[] }
  | { k: 'rel'; ops: RelOp[]; items: MathNode[] }
  | { k: 'in'; a: MathNode; lo: MathNode; hi: MathNode; loOpen: boolean; hiOpen: boolean }
  | { k: 'and' | 'or'; items: MathNode[] }
  | { k: 'infty' }

/** Un'espressione con, dopo una virgola o «per», la condizione in cui vale (`y = x^2, x > 0`). */
export interface Statement {
  main: MathNode
  cond: MathNode | null
}

export class MathSyntaxError extends Error {
  constructor(
    message: string,
    /** Dove, nel testo: serve a indicare il punto sbagliato. */
    readonly at: number,
  ) {
    super(message)
  }
}

// ——— Le parole e i comandi ———

const GREEK: Record<string, string> = {
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', varepsilon: 'ε', zeta: 'ζ', eta: 'η', theta: 'θ',
  vartheta: 'θ', iota: 'ι', kappa: 'κ', lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ', rho: 'ρ', varrho: 'ρ', sigma: 'σ',
  varsigma: 'σ', tau: 'τ', upsilon: 'υ', phi: 'φ', varphi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω', Gamma: 'Γ', Delta: 'Δ',
  Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ', Pi: 'Π', Sigma: 'Σ', Upsilon: 'Υ', Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω', pi: 'π',
}
const GREEK_CHARS = new Set(Object.values(GREEK))

/** Le funzioni che si sanno calcolare, con i nomi italiani e quelli dei vari libri. */
const FUNCTION_NAMES: Record<string, string> = {
  sin: 'sin', sen: 'sin', cos: 'cos', tan: 'tan', tg: 'tan', cot: 'cot', cotg: 'cot', ctg: 'cot', sec: 'sec',
  csc: 'csc', cosec: 'csc', arcsin: 'arcsin', arcsen: 'arcsin', asin: 'arcsin', arccos: 'arccos', acos: 'arccos',
  arctan: 'arctan', arctg: 'arctan', atan: 'arctan', arccot: 'arccot', arccotg: 'arccot', arcctg: 'arccot',
  sinh: 'sinh', senh: 'sinh', sh: 'sinh', cosh: 'cosh', ch: 'cosh', tanh: 'tanh', tgh: 'tanh', th: 'tanh',
  coth: 'coth', cth: 'coth', arsinh: 'arsinh', arcsinh: 'arsinh', asinh: 'arsinh', settsinh: 'arsinh',
  settsenh: 'arsinh', arcosh: 'arcosh', arccosh: 'arcosh', acosh: 'arcosh', settcosh: 'arcosh', artanh: 'artanh',
  arctanh: 'artanh', atanh: 'artanh', setttanh: 'artanh', setttgh: 'artanh', ln: 'ln', log: 'log', lg: 'lg',
  exp: 'exp', sqrt: 'sqrt', abs: 'abs', sgn: 'sgn', sign: 'sgn', segno: 'sgn', floor: 'floor', ceil: 'ceil',
  max: 'max', min: 'min', gcd: 'gcd', mcd: 'gcd', lcm: 'lcm', mcm: 'lcm', round: 'round',
  // I numeri complessi: parte reale e immaginaria (\Re z, \operatorname{Re} z), argomento, coniugato.
  Re: 're', re: 're', Im: 'im', im: 'im', arg: 'arg', Arg: 'arg', conj: 'conj',
  // Le matrici: determinante, rango, traccia, nucleo (\operatorname{Im} è anche l'immagine), riduzione
  // a scala, autovalori e autovettori.
  det: 'det', rank: 'rank', rk: 'rank', rg: 'rank', rango: 'rank', tr: 'tr', Tr: 'tr', trace: 'tr', traccia: 'tr',
  ker: 'ker', Ker: 'ker', dim: 'dim', rref: 'rref', scala: 'rref', gauss: 'rref', autovalori: 'eig', eig: 'eig',
  autovettori: 'eigvec', eigvec: 'eigvec', span: 'span', Span: 'span',
  // La geometria: triangoli e poligoni, angoli, rette, circonferenze, piani, punti medi, distanze.
  triangle: 'triangle', poligono: 'polygon', angle: 'angle', measuredangle: 'angle', angolo: 'angle', retta: 'line',
  circonferenza: 'circle', cerchio: 'circle', medio: 'mid', puntomedio: 'mid', baricentro: 'centroid', area: 'area',
  perimetro: 'perimeter', piano: 'plane', intersezione: 'intersect', distanza: 'dist', segmento: 'segment',
  // Le operazioni con i campi: gradiente, divergenza, rotore, laplaciano, hessiana e jacobiana.
  grad: 'grad', gradiente: 'grad', div: 'div', divergenza: 'div', rot: 'curl', rotore: 'curl', curl: 'curl',
  lap: 'lap', laplaciano: 'lap', hess: 'hess', hessiana: 'hess', jac: 'jac', jacobiana: 'jac',
}

/** Le parole riconosciute anche senza barra (`sin x`, `sqrt(x)`, `pi`), come in una calcolatrice. */
const BARE_WORDS = [
  'arcsin', 'arccos', 'arctan', 'arctg', 'sinh', 'cosh', 'tanh', 'sqrt', 'sin', 'sen', 'cos', 'tan', 'tg', 'cot',
  'cotg', 'ln', 'log', 'exp', 'abs', 'sgn', 'floor', 'ceil', 'max', 'min', 'pi',
].sort((a, b) => b.length - a.length)

/** Le parole di `\text{…}` che legano un'espressione alla sua condizione: «y = x^2 per x > 0». */
const CONNECTIVES = new Set(['se', 'per', 'con', 'quando', 'dove', 'if', 'for', 'when', 'where', 'with'])
const AND_WORDS = new Set(['e', 'and', 'ed'])
const OR_WORDS = new Set(['o', 'or', 'oppure'])
const ELSE_WORDS = new Set(['altrimenti', 'otherwise', 'else', 'negli altri casi', 'altrove'])

/** Accenti sulle lettere (\bar{x}, \hat{p}…): nomi di variabili diversi. */
const ACCENTS: Record<string, string> = {
  bar: '̄', overline: '̄', hat: '̂', widehat: '̂', tilde: '̃', widetilde: '̃',
  vec: '⃗', dot: '̇', ddot: '̈',
}

const COMMAND_OPS: Record<string, [Kind, string]> = {
  cdot: ['op', '*'], ast: ['op', '*'], cdotp: ['op', '*'], div: ['op', '/'],
  le: ['rel', '<='], leq: ['rel', '<='], leqslant: ['rel', '<='], leqq: ['rel', '<='],
  ge: ['rel', '>='], geq: ['rel', '>='], geqslant: ['rel', '>='], geqq: ['rel', '>='],
  lt: ['rel', '<'], gt: ['rel', '>'], ne: ['rel', '!='], neq: ['rel', '!='], approx: ['rel', '≈'],
  in: ['in', 'in'], R: ['set', 'R'], Reals: ['set', 'R'], reals: ['set', 'R'], land: ['and', 'and'], wedge: ['and', 'and'], lor: ['or', 'or'], vee: ['or', 'or'],
  infty: ['infty', '∞'], circ: ['deg', '°'], frac: ['frac', 'frac'], dfrac: ['frac', 'frac'], tfrac: ['frac', 'frac'],
  cfrac: ['frac', 'frac'], sqrt: ['sqrt', 'sqrt'], binom: ['binom', 'binom'], dbinom: ['binom', 'binom'],
  tbinom: ['binom', 'binom'], sum: ['big', 'sum'], prod: ['big', 'prod'], int: ['int', 'int'], iint: ['int', 'iint'], iiint: ['int', 'iiint'],
  oint: ['int', 'oint'], oiint: ['int', 'oiint'], nabla: ['nabla', 'nabla'], partial: ['partial', 'partial'],
  mid: ['bar', '|'],
  quad: ['sep', 'quad'], qquad: ['sep', 'quad'], cr: ['row', '\\\\'], coloneqq: ['rel', '='], coloneq: ['rel', '='],
  lbrace: ['open', '\\{'], rbrace: ['close', '\\}'], lbrack: ['open', '['], rbrack: ['close', ']'],
  lfloor: ['open', 'floor'], rfloor: ['close', 'floor'], lceil: ['open', 'ceil'], rceil: ['close', 'ceil'],
  lvert: ['bar', 'l|'], rvert: ['bar', 'r|'], vert: ['bar', '|'], lVert: ['bar', 'l|'], rVert: ['bar', 'r|'], Vert: ['bar', '|'],
}

/** Gli ambienti delle matrici: \begin{vmatrix} è il determinante. */
const MATRIX_ENVS = new Set(['pmatrix', 'bmatrix', 'Bmatrix', 'vmatrix', 'Vmatrix', 'matrix', 'smallmatrix', 'array'])

/** I comandi che non cambiano il valore: spazi, stili, dimensioni. */
const IGNORED = new Set([
  'displaystyle', 'textstyle', 'scriptstyle', 'limits', 'nolimits', 'enspace', 'thinspace', 'medspace',
  'thickspace', 'negthinspace', 'middle', 'nonumber', 'notag',
])

// ——— I pezzi del testo (token) ———

type Kind =
  | 'num' | 'name' | 'fn' | 'frac' | 'sqrt' | 'binom' | 'big' | 'int' | 'op' | 'rel' | 'open' | 'close' | 'bar'
  | 'comma' | 'semi' | 'sep' | 'in' | 'and' | 'or' | 'else' | 'amp' | 'row' | 'cases' | 'endcases' | 'matrix' | 'endmatrix' | 'infty'
  | 'deg' | 'prime' | 'set' | 'nabla' | 'partial' | 'bad'

interface Tok {
  k: Kind
  v: string
  pos: number
  end: number
  /** Solo i numeri: scritto con la virgola. */
  comma?: boolean
  /** Solo «:» (che è una divisione, ma in un insieme vuol dire «tali che»). */
  colon?: boolean
  /** Solo \times e ×. */
  cross?: boolean
}

const isDigit = (c: string | undefined) => c !== undefined && c >= '0' && c <= '9'
const isLetter = (c: string | undefined) => c !== undefined && /^[A-Za-z]$/.test(c)

/** Il contenuto di `{…}` che comincia in `i` (con le graffe annidate), e dove finisce. */
function readBraces(src: string, i: number): { text: string; end: number } | null {
  let j = i
  while (src[j] === ' ') j++
  if (src[j] !== '{') return null
  let depth = 0
  for (let k = j; k < src.length; k++) {
    if (src[k] === '\\') {
      k++
      continue
    }
    if (src[k] === '{') depth++
    else if (src[k] === '}' && --depth === 0) return { text: src.slice(j + 1, k), end: k + 1 }
  }
  return null
}

export function tokenize(src: string): Tok[] {
  const out: Tok[] = []
  /** Profondità di ( [ e \{: lì dentro la virgola separa sempre. */
  let depth = 0
  let i = 0
  const push = (k: Kind, v: string, pos: number, end: number, extra?: Partial<Tok>) => out.push({ k, v, pos, end, ...extra })

  while (i < src.length) {
    const c = src[i]
    if (c === ' ' || c === '\t' || c === '\n' || c === '\r' || c === '~' || c === ' ') {
      i++
      continue
    }
    // In LaTeX % comincia un commento, fino alla fine della riga.
    if (c === '%') {
      const nl = src.indexOf('\n', i)
      if (nl < 0) break
      i = nl + 1
      continue
    }
    if (isDigit(c) || (c === '.' && isDigit(src[i + 1]))) {
      const rest = src.slice(i)
      const thousands = /^\d{1,3}(?:(?:\.\d{3}){2,}|(?:\\,\d{3})+)(?![\d.])/.exec(rest)
      if (thousands) {
        push('num', thousands[0].replace(/\.|\\,/g, ''), i, i + thousands[0].length)
        i += thousands[0].length
        continue
      }
      const m = /^(?:\d+(?:\.\d+)?|\.\d+)/.exec(rest)!
      let text = m[0]
      let j = i + text.length
      let comma = false
      if (!text.includes('.')) {
        const braced = /^\{,\}(\d+)/.exec(src.slice(j))
        const tight = depth === 0 ? /^,(\d+)/.exec(src.slice(j)) : null
        const dec = braced ?? tight
        if (dec) {
          text += '.' + dec[1]
          j += dec[0].length
          comma = true
        }
      }
      push('num', text.startsWith('.') ? '0' + text : text, i, j, { comma })
      i = j
      continue
    }
    if (c === '\\') {
      i = readCommand(src, i, out, () => depth, (d) => (depth += d))
      continue
    }
    if (isLetter(c)) {
      let j = i
      while (isLetter(src[j])) j++
      const word = src.slice(i, j)
      for (let p = 0; p < word.length; ) {
        const known = BARE_WORDS.find((w) => word.startsWith(w, p))
        if (known) {
          if (known === 'pi') push('name', 'π', i + p, i + p + 2)
          else push('fn', FUNCTION_NAMES[known], i + p, i + p + known.length)
          p += known.length
        } else {
          push('name', word[p], i + p, i + p + 1)
          p++
        }
      }
      i = j
      continue
    }
    const one = (k: Kind, v: string) => {
      push(k, v, i, i + 1)
      i++
    }
    switch (c) {
      case '+': one('op', '+'); break
      case '-': case '−': case '–': one('op', '-'); break
      case '×': push('op', '*', i, i + 1, { cross: true }); i++; break
      case '*': case '·': case '⋅': case '∙': one('op', '*'); break
      case ':':
        // a := 3 è una definizione, come a = 3; da solo «:» è la divisione (6 : 3).
        if (src[i + 1] === '=') {
          push('rel', '=', i, i + 2)
          i += 2
        } else {
          push('op', '/', i, i + 1, { colon: true })
          i++
        }
        break
      case '/': case '÷': one('op', '/'); break
      case '^': one('op', '^'); break
      case '_': one('op', '_'); break
      case '!': one('op', '!'); break
      case "'": case '′': one('prime', "'"); break
      case '″': push('prime', "'", i, i + 1); one('prime', "'"); break
      case '=': one('rel', '='); break
      case '<': case '>':
        if (src[i + 1] === '=') {
          push('rel', c + '=', i, i + 2)
          i += 2
        } else one('rel', c)
        break
      case '≤': one('rel', '<='); break
      case '≥': one('rel', '>='); break
      case '≠': one('rel', '!='); break
      case '≈': one('rel', '≈'); break
      case '(': case '[': depth++; one('open', c); break
      case ')': case ']': depth = Math.max(0, depth - 1); one('close', c); break
      case '{': one('open', '{'); break
      case '}': one('close', '}'); break
      case '|': case '‖': one('bar', '|'); break
      case ',': one('comma', ','); break
      case ';': one('semi', ';'); break
      case '&': one('amp', '&'); break
      case '∞': one('infty', '∞'); break
      case '°': one('deg', '°'); break
      case '∈': one('in', 'in'); break
      case '∧': one('and', 'and'); break
      case '∨': one('or', 'or'); break
      case '√': one('sqrt', 'sqrt'); break
      case '∇': one('nabla', 'nabla'); break
      case '∂': one('partial', 'partial'); break
      case '∮': one('int', 'oint'); break
      case 'ℝ': one('set', 'R'); break
      case '⟨': one('open', '⟨'); break
      case '⟩': one('close', '⟩'); break
      case '⌊': one('open', 'floor'); break
      case '⌋': one('close', 'floor'); break
      case '⌈': one('open', 'ceil'); break
      case '⌉': one('close', 'ceil'); break
      case '.':
        // Il punto alla fine di una frase non conta.
        if (!src.slice(i + 1).trim()) i++
        else one('bad', '.')
        break
      default:
        if (GREEK_CHARS.has(c)) one('name', c)
        else one('bad', c)
    }
  }
  return out
}

function readCommand(src: string, i: number, out: Tok[], depth: () => number, addDepth: (d: number) => void): number {
  const m = /^\\([A-Za-z]+|.)/s.exec(src.slice(i))
  if (!m) {
    out.push({ k: 'bad', v: '\\', pos: i, end: i + 1 })
    return i + 1
  }
  const name = m[1]
  let end = i + m[0].length
  const push = (k: Kind, v: string, to = end) => out.push({ k, v, pos: i, end: to })

  if (name === ',' || name === ';' || name === ':' || name === '!' || name === ' ' || name === '>' || IGNORED.has(name)) return end
  if (name === '\\') {
    push('row', '\\\\')
    return end
  }
  if (name === '{') {
    addDepth(1)
    push('open', '\\{')
    return end
  }
  if (name === '}') {
    addDepth(-1)
    push('close', '\\}')
    return end
  }
  if (name === '|') {
    push('bar', '|')
    return end
  }
  if (name === '%') {
    push('op', '%')
    return end
  }
  // \left( … \right) e \big( … \big): conta solo la parentesi.
  const sized = /^(left|right|bigl|bigr|Bigl|Bigr|biggl|biggr|Biggl|Biggr|big|Big|bigg|Bigg|bigm|Bigm)$/.exec(name)
  if (sized) {
    let j = end
    while (src[j] === ' ') j++
    const side = name.startsWith('left') || name.endsWith('l') ? 'l' : name.startsWith('right') || name.endsWith('r') ? 'r' : ''
    const d = /^(\\[A-Za-z]+|\\[{}|]|[()[\]|.])/.exec(src.slice(j))
    if (!d) return end
    const delim = d[1]
    const to = j + delim.length
    if (delim === '.') return to
    if (delim === '|' || delim === '\\|' || delim === '\\vert' || delim === '\\Vert') {
      out.push({ k: 'bar', v: side ? side + '|' : '|', pos: i, end: to })
      return to
    }
    // Il resto (parentesi, graffe, \lfloor…) come se fosse scritto da solo.
    const before = out.length
    const next = delim.startsWith('\\') ? readCommand(src, j, out, depth, addDepth) : (tokenizeDelim(delim, j, out, addDepth), to)
    for (let t = before; t < out.length; t++) out[t].pos = i
    return next
  }
  if (name === 'times') {
    out.push({ k: 'op', v: '*', pos: i, end, cross: true })
    return end
  }
  if (name === 'colon') {
    out.push({ k: 'op', v: '/', pos: i, end, colon: true })
    return end
  }
  if (name in COMMAND_OPS) {
    const [k, v] = COMMAND_OPS[name]
    if (k === 'open' && v !== 'floor' && v !== 'ceil') addDepth(1)
    if (k === 'close' && v !== 'floor' && v !== 'ceil') addDepth(-1)
    push(k, v)
    return end
  }
  if (name in GREEK) {
    push('name', GREEK[name])
    return end
  }
  if (name in FUNCTION_NAMES) {
    push('fn', FUNCTION_NAMES[name])
    return end
  }
  if (name in ACCENTS) {
    const arg = readBraces(src, end)
    let letter: string | null = null
    if (arg) {
      const inner = arg.text.trim()
      const greek = /^\\([A-Za-z]+)$/.exec(inner)
      letter = /^[A-Za-z]$/.test(inner) ? inner : greek && greek[1] in GREEK ? GREEK[greek[1]] : null
      // \overline{1 + i}, \bar{z w}: il coniugato di un'espressione, come conj(…) (con due punti,
      // \overline{AB}, è il segmento); \widehat{ABC} è l'angolo; \vec{AB} il vettore da A a B.
      const wrapping: Record<string, string> = { bar: 'conj', overline: 'conj', widehat: 'angle', hat: 'angle', vec: 'arrow' }
      if (!letter && inner && name in wrapping) return pushWrapped(i, arg, wrapping[name], out)
      end = arg.end
    } else {
      let j = end
      while (src[j] === ' ') j++
      if (isLetter(src[j])) {
        letter = src[j]
        end = j + 1
      }
    }
    push(letter ? 'name' : 'bad', letter ? letter + ACCENTS[name] : '\\' + name)
    return end
  }
  if (/^(mathbb|mathbf|mathrm|mathit|mathsf|boldsymbol|bm|text|textrm|textit|textbf|mbox|operatorname)$/.test(name)) {
    let j = end
    if (name === 'operatorname' && src[j] === '*') j++
    const arg = readBraces(src, j)
    if (!arg) {
      push('bad', '\\' + name)
      return end
    }
    end = arg.end
    const text = arg.text.trim()
    const lower = text.toLowerCase().replace(/\s+/g, ' ')
    if (name === 'mathbb') {
      push(/^[A-Za-z]$/.test(text) ? 'set' : 'bad', text)
      return end
    }
    if (!text) return end
    // In \text{…} «e» e «o» sono parole («x > 0 \text{ e } x < 2»); in \mathrm{e} è il numero e.
    const isText = /^(text|textrm|textit|textbf|mbox)$/.test(name)
    if (lower in FUNCTION_NAMES) push('fn', FUNCTION_NAMES[lower])
    else if (/^[A-Za-z]$/.test(text) && !(isText && (AND_WORDS.has(lower) || OR_WORDS.has(lower)))) push('name', text)
    else if (CONNECTIVES.has(lower)) push('sep', lower)
    else if (AND_WORDS.has(lower)) push('and', 'and')
    else if (OR_WORDS.has(lower)) push('or', 'or')
    else if (ELSE_WORDS.has(lower)) push('else', 'else')
    else push('bad', text)
    return end
  }
  if (name === 'begin' || name === 'end') {
    const arg = readBraces(src, end)
    const env = arg?.text.trim() ?? ''
    if (arg) end = arg.end
    if (/^(cases|dcases|rcases|cases\*)$/.test(env)) push(name === 'begin' ? 'cases' : 'endcases', env)
    else if (MATRIX_ENVS.has(env)) {
      // \begin{array}{cc}: le colonne non contano.
      if (name === 'begin' && env === 'array') {
        const columns = readBraces(src, end)
        if (columns) end = columns.end
      }
      push(name === 'begin' ? 'matrix' : 'endmatrix', env)
    } else push('bad', `\\${name}{${env}}`)
    return end
  }
  if (name === 'overrightarrow' || name === 'overleftrightarrow' || name === 'overleftarrow') {
    // \overrightarrow{AB}: il vettore da A a B; \overleftrightarrow{AB}: la retta per A e B.
    const arg = readBraces(src, end)
    if (!arg) {
      push('bad', '\\' + name)
      return end
    }
    return pushWrapped(i, arg, name === 'overleftrightarrow' ? 'line' : 'arrow', out)
  }
  if (name === 'top' || name === 'intercal') {
    // A^\top: la trasposta.
    push('name', 'T')
    return end
  }
  if (name === 'langle' || name === 'rangle') {
    // \langle u, v \rangle: il prodotto scalare.
    push(name === 'langle' ? 'open' : 'close', name === 'langle' ? '⟨' : '⟩')
    return end
  }
  push('bad', '\\' + name)
  return end
}

/** Una funzione applicata a quello che c'è tra le graffe (\overline{z + w} → conj(z + w)), come se fosse tra parentesi. */
function pushWrapped(at: number, arg: { text: string; end: number }, fn: string, out: Tok[]): number {
  const open = arg.end - arg.text.length - 1
  out.push({ k: 'fn', v: fn, pos: at, end: open })
  out.push({ k: 'open', v: '(', pos: open, end: open + 1 })
  for (const t of tokenize(arg.text)) out.push({ ...t, pos: t.pos + open + 1, end: t.end + open + 1 })
  out.push({ k: 'close', v: ')', pos: arg.end - 1, end: arg.end })
  return arg.end
}

function tokenizeDelim(delim: string, at: number, out: Tok[], addDepth: (d: number) => void): void {
  if (delim === '(' || delim === '[') addDepth(1)
  if (delim === ')' || delim === ']') addDepth(-1)
  out.push({ k: delim === '(' || delim === '[' ? 'open' : 'close', v: delim, pos: at, end: at + 1 })
}

// ——— Il parser ———

const CLOSING: Record<string, string> = { '(': ')', '[': ']', '{': '}', '\\{': '\\}', floor: 'floor', ceil: 'ceil', '⟨': '⟩' }
const SHOW: Record<string, string> = { '\\{': '\\{', '\\}': '\\}', floor: '⌊', ceil: '⌈', '\\\\': '\\\\' }

/** Le funzioni trigonometriche e iperboliche: per loro `^{-1}` è la funzione inversa. */
const INVERSE: Record<string, string> = {
  sin: 'arcsin', cos: 'arccos', tan: 'arctan', cot: 'arccot', sinh: 'arsinh', cosh: 'arcosh', tanh: 'artanh',
}

function describe(t: Tok | undefined): string {
  if (!t) return 'la fine'
  if (t.k === 'num') return t.v
  return `«${SHOW[t.v] ?? t.v}»`
}

class Parser {
  private i = 0
  /** Quante | di valore assoluto sono aperte: lì una | chiude. */
  private absDepth = 0
  /** Dentro un integrale: `dx` chiude la funzione da integrare. */
  private integrals = 0
  /** Nell'intervallo ]a, b[ la [ alla fine chiude, non apre. */
  private reversedInterval = false

  constructor(
    private readonly toks: Tok[],
    private readonly srcLength: number,
  ) {}

  private peek(o = 0): Tok | undefined {
    return this.toks[this.i + o]
  }

  private next(): Tok {
    const t = this.toks[this.i++]
    if (!t) throw this.error('L\'espressione finisce troppo presto')
    return t
  }

  private at(): number {
    return this.peek()?.pos ?? this.srcLength
  }

  private error(message: string, at = this.at()): MathSyntaxError {
    return new MathSyntaxError(message, at)
  }

  private is(k: Kind, v?: string, o = 0): boolean {
    const t = this.peek(o)
    return !!t && t.k === k && (v === undefined || t.v === v)
  }

  private expect(k: Kind, v: string, what: string): Tok {
    if (!this.is(k, v)) throw this.error(`Manca ${what}`)
    return this.next()
  }

  get done(): boolean {
    return this.i >= this.toks.length
  }

  finish(): void {
    const t = this.peek()
    if (!t) return
    if (t.k === 'close') throw this.error(`C'è una parentesi ${describe(t)} di troppo`)
    if (t.k === 'bad') throw this.badToken(t)
    throw this.error(`Non mi aspettavo ${describe(t)} qui`)
  }

  private badToken(t: Tok): MathSyntaxError {
    if (t.v.startsWith('\\')) {
      if (t.v === '\\lim') return this.error('I limiti non si sanno ancora calcolare', t.pos)
      if (t.v === '\\pm' || t.v === '\\mp') return this.error('Con ± ci sono due valori: scrivili separati', t.pos)
      if (/\\(l|c)?dots/.test(t.v)) return this.error('I puntini … non si possono calcolare', t.pos)
      return this.error(`Non so calcolare ${t.v}`, t.pos)
    }
    if (t.v === '.') return this.error('Un punto da solo: per i decimali scrivi 0.5', t.pos)
    if (t.v.length > 1) return this.error(`«${t.v}» non è un'espressione`, t.pos)
    return this.error(`Il segno «${t.v}» non si può calcolare`, t.pos)
  }

  // ——— Frasi: relazioni e condizioni ———

  statement(): Statement {
    const main = this.relation()
    let cond: MathNode | null = null
    while (this.peek()) {
      if (this.is('open', '\\{')) {
        this.next()
        cond = joinAnd(cond, this.condition())
        this.expect('close', '\\}', 'la graffa \\} della condizione')
      } else if (this.is('comma') || this.is('semi') || this.is('sep') || this.is('and')) {
        this.next()
        if (!this.peek()) break
        cond = joinAnd(cond, this.condition())
      } else break
    }
    return { main, cond }
  }

  /** Una o più espressioni legate da =, <, ≤…; oppure `x \in [a, b]`. */
  relation(): MathNode {
    const first = this.expr()
    if (this.is('in')) return this.interval(first)
    if (!this.is('rel')) return first
    const ops: RelOp[] = []
    const items = [first]
    while (this.is('rel')) {
      const op = this.next()
      if (!this.peek() || this.is('comma') || this.is('semi') || this.is('sep')) throw this.error(`Manca qualcosa dopo ${op.v === '!=' ? '≠' : op.v}`)
      ops.push(op.v as RelOp)
      items.push(this.expr())
    }
    return { k: 'rel', ops, items }
  }

  /** Condizioni legate da «e» (anche la virgola) e «o». */
  condition(): MathNode {
    const ors: MathNode[] = []
    let ands: MathNode[] = []
    for (;;) {
      while (this.is('sep')) this.next()
      ands.push(this.relation())
      if (this.is('and') || ((this.is('comma') || this.is('semi')) && this.peek(1) && this.peek(1)!.k !== 'close')) {
        this.next()
        continue
      }
      if (this.is('or')) {
        this.next()
        ors.push(ands.length === 1 ? ands[0] : { k: 'and', items: ands })
        ands = []
        continue
      }
      break
    }
    ors.push(ands.length === 1 ? ands[0] : { k: 'and', items: ands })
    return ors.length === 1 ? ors[0] : { k: 'or', items: ors }
  }

  /** `x \in [a, b]`, anche aperto (`(a, b)`, `]a, b[`), con ±∞, o `x \in \mathbb{R}`. */
  private interval(a: MathNode): MathNode {
    this.next()
    if (this.is('set')) {
      const set = this.next()
      if (set.v !== 'R') throw this.error(`Si sa usare solo ℝ (non ${set.v})`, set.pos)
      let lo: MathNode = { k: 'neg', a: { k: 'infty' } }
      let hi: MathNode = { k: 'infty' }
      // ℝ^+ e ℝ^-
      if (this.is('op', '^')) {
        this.next()
        let sign = this.next()
        if (sign.k === 'open' && sign.v === '{') {
          sign = this.next()
          this.expect('close', '}', 'la graffa }')
        }
        if (sign.v === '+') lo = { k: 'num', v: 0, text: '0', comma: false }
        else if (sign.v === '-') hi = { k: 'num', v: 0, text: '0', comma: false }
        else throw this.error('Dopo ℝ^ va + o -', sign.pos)
      }
      return { k: 'in', a, lo, hi, loOpen: true, hiOpen: true }
    }
    const open = this.peek()
    if (!open || !((open.k === 'open' && (open.v === '[' || open.v === '(')) || (open.k === 'close' && open.v === ']'))) {
      throw this.error('Dopo ∈ va un intervallo, per esempio [0, 5]')
    }
    this.next()
    const loOpen = open.v !== '['
    const lo = this.expr()
    if (!this.is('comma') && !this.is('semi')) throw this.error('Nell\'intervallo i due estremi vanno separati da una virgola: [0, 5]')
    this.next()
    this.reversedInterval = true
    let hi: MathNode
    try {
      hi = this.expr()
    } finally {
      this.reversedInterval = false
    }
    const close = this.peek()
    if (!close || !((close.k === 'close' && (close.v === ']' || close.v === ')')) || (close.k === 'open' && close.v === '['))) {
      throw this.error('Manca la parentesi che chiude l\'intervallo')
    }
    this.next()
    return { k: 'in', a, lo, hi, loOpen, hiOpen: close.v !== ']' }
  }

  // ——— Espressioni ———

  expr(): MathNode {
    let left = this.term()
    while (this.is('op', '+') || this.is('op', '-')) {
      const op = this.next().v as '+' | '-'
      if (!this.peek()) throw this.error(`Manca qualcosa dopo ${op}`)
      left = { k: 'bin', op, a: left, b: this.term() }
    }
    return left
  }

  private term(): MathNode {
    let left = this.unary()
    for (;;) {
      if (this.is('op', '*') || this.is('op', '/')) {
        // F \cdot dr, F \cdot d\mathbf{S}: il differenziale chiude la funzione da integrare.
        if (this.integrals > 0 && this.is('op', '*') && this.atDifferential(1)) break
        const sign = this.next()
        const op = sign.v as '*' | '/'
        if (!this.peek()) throw this.error(`Manca qualcosa dopo ${op === '*' ? '·' : '/'}`)
        left = { k: 'bin', op, a: left, b: this.unary(), ...(sign.cross && { cross: true }) }
      } else if (this.startsFactor()) {
        if (left.k === 'num' && this.is('num')) throw this.error('Due numeri di seguito: manca un\'operazione?')
        left = { k: 'bin', op: '*', a: left, b: this.power(), implicit: true }
      } else break
    }
    return left
  }

  /** Il prossimo pezzo si può moltiplicare a quello prima senza segno (`2x`, `x\sin x`)? */
  private startsFactor(fnArgument = false): boolean {
    const t = this.peek()
    if (!t) return false
    switch (t.k) {
      case 'num':
      case 'frac':
      case 'sqrt':
      case 'binom':
      case 'cases':
        return true
      case 'name':
        // «dx» (e d(x, y)) chiude l'integrale.
        return !(this.integrals > 0 && this.atDifferential())
      case 'fn':
      case 'big':
      case 'int':
      case 'nabla':
      case 'partial':
        return !fnArgument
      case 'open':
        if (t.v === '[' && this.reversedInterval) return false
        // \{ … \} dopo un'espressione è la sua condizione (y = x^2 \{x > 0\}).
        return t.v !== '\\{'
      case 'bar':
        return t.v === 'l|' || (t.v === '|' && this.absDepth === 0)
      default:
        return false
    }
  }

  private unary(): MathNode {
    if (this.is('op', '-')) {
      this.next()
      return { k: 'neg', a: this.unary() }
    }
    if (this.is('op', '+')) {
      this.next()
      return this.unary()
    }
    return this.power()
  }

  private power(): MathNode {
    let base = this.postfix(this.primary())
    if (this.is('op', '^')) {
      const hat = this.next()
      if (this.is('deg') || (this.is('open', '{') && this.is('deg', undefined, 1) && this.is('close', '}', 2))) {
        // 30^\circ: gradi
        if (this.is('open')) this.i += 3
        else this.next()
        base = this.postfix({ k: 'post', op: '°', a: base })
      } else {
        const exp = this.supArg(hat)
        base = this.postfix({ k: 'bin', op: '^', a: base, b: exp })
      }
      if (this.is('op', '^')) throw this.error('Due esponenti di seguito: usa le graffe, es. x^{a^b}')
    }
    return base
  }

  private postfix(node: MathNode): MathNode {
    for (;;) {
      if (this.is('op', '!')) {
        this.next()
        node = { k: 'post', op: '!', a: node }
      } else if (this.is('op', '%')) {
        this.next()
        node = { k: 'post', op: '%', a: node }
      } else if (this.is('deg')) {
        this.next()
        node = { k: 'post', op: '°', a: node }
      } else return node
    }
  }

  /** L'esponente dopo ^: come in LaTeX un solo segno o un gruppo tra graffe; `-` e `(` come in una calcolatrice. */
  private supArg(hat: Tok): MathNode {
    if (this.is('op', '-') || this.is('op', '+')) {
      const sign = this.next().v
      const arg = this.supArg(hat)
      return sign === '-' ? { k: 'neg', a: arg } : arg
    }
    if (this.is('open', '(')) return this.primary()
    if (!this.peek()) throw this.error('Manca l\'esponente dopo ^', hat.pos)
    return this.latexArg('l\'esponente dopo ^')
  }

  /** Un argomento come lo legge il LaTeX: un gruppo `{…}`, una cifra, una lettera o un comando. */
  private latexArg(what: string): MathNode {
    const t = this.peek()
    if (!t) throw this.error(`Manca ${what}`)
    if (t.k === 'open' && t.v === '{') {
      this.next()
      if (!this.peek()) throw this.error(`Manca ${what}`)
      if (this.is('close', '}')) throw this.error(`Manca ${what}: le graffe sono vuote`)
      const inner = this.expr()
      this.expect('close', '}', 'la graffa }')
      return inner
    }
    if (t.k === 'num') {
      // \frac12 e x^23: una cifra sola, il resto resta lì.
      if (t.v.length > 1) {
        const rest = t.v.slice(1)
        this.toks.splice(this.i, 1, { k: 'num', v: t.v[0], pos: t.pos, end: t.pos + 1 }, { k: 'num', v: rest.startsWith('.') ? '0' + rest : rest, pos: t.pos + 1, end: t.end, comma: t.comma })
      }
      const digit = this.next()
      return { k: 'num', v: Number(digit.v), text: digit.v, comma: false }
    }
    if (t.k === 'name') {
      this.next()
      return { k: 'name', name: t.v }
    }
    if (t.k === 'fn' || t.k === 'frac' || t.k === 'sqrt' || t.k === 'binom' || t.k === 'infty' || t.k === 'bar' || t.k === 'open') {
      return this.primary()
    }
    throw this.error(`Manca ${what}`)
  }

  private primary(): MathNode {
    const t = this.peek()
    if (!t) throw this.error('Manca qualcosa alla fine')
    switch (t.k) {
      case 'num':
        this.next()
        return { k: 'num', v: Number(t.v), text: t.v, comma: !!t.comma }
      case 'name':
        return this.name()
      case 'fn':
        return this.fnCall()
      case 'frac': {
        const derivative = this.derivativeFrac()
        if (derivative) return derivative
        this.next()
        const a = this.latexArg('il numeratore di \\frac')
        const b = this.latexArg('il denominatore di \\frac')
        return { k: 'bin', op: '/', a, b, frac: true }
      }
      case 'sqrt': {
        this.next()
        let index: MathNode | undefined
        if (this.is('open', '[')) {
          this.next()
          index = this.expr()
          this.expect('close', ']', 'la parentesi ] dell\'indice')
        }
        const arg = this.is('open', '(') ? this.primary() : this.latexArg('il numero sotto la radice')
        return index ? { k: 'fn', name: 'root', args: [arg], base: index } : { k: 'fn', name: 'sqrt', args: [arg] }
      }
      case 'binom': {
        this.next()
        const n = this.latexArg('il primo numero di \\binom')
        const r = this.latexArg('il secondo numero di \\binom')
        return { k: 'binom', n, r }
      }
      case 'big':
        return this.bigOperator()
      case 'int':
        return this.integral()
      case 'nabla':
        return this.nabla()
      case 'partial':
        return this.partialDerivative()
      case 'cases':
        return this.cases()
      case 'matrix':
        return this.matrix()
      case 'open':
        return t.v === '\\{' ? this.setBuilder() : this.group()
      case 'bar': {
        this.next()
        this.absDepth++
        const inner = this.expr()
        this.absDepth--
        if (!this.is('bar') || this.is('bar', 'l|')) throw this.error('Manca la | che chiude il valore assoluto')
        this.next()
        return { k: 'abs', a: inner }
      }
      case 'infty':
        this.next()
        return { k: 'infty' }
      case 'close':
        throw this.error(t.v === '}' ? 'C\'è una graffa } di troppo' : `Manca qualcosa prima di ${describe(t)}`)
      case 'bad':
        throw this.badToken(t)
      case 'op':
        throw this.error(t.v === '^' || t.v === '_' ? `Manca qualcosa prima di ${t.v}` : `Manca qualcosa prima di ${describe(t)}`)
      case 'rel':
        throw this.error(`Manca qualcosa prima di ${describe(t)}`)
      default:
        throw this.error(`Non mi aspettavo ${describe(t)} qui`)
    }
  }

  /** Il pedice di un nome (`x_0`, `v_{max}`) come testo: fa parte del nome. */
  private subscriptText(): string {
    this.next()
    const t = this.peek()
    if (!t) throw this.error('Manca il pedice dopo _')
    if (t.k === 'open' && t.v === '{') {
      this.next()
      let text = ''
      let depth = 0
      while (this.peek() && !(depth === 0 && this.is('close', '}'))) {
        const u = this.next()
        if (u.k === 'open') depth++
        if (u.k === 'close') depth--
        text += u.v
      }
      this.expect('close', '}', 'la graffa } del pedice')
      if (!text) throw this.error('Il pedice è vuoto')
      return text
    }
    if (t.k === 'num') {
      // x_12 in LaTeX è x con pedice 1, seguito da 2.
      if (t.v.length > 1) {
        this.toks.splice(this.i, 1, { k: 'num', v: t.v[0], pos: t.pos, end: t.pos + 1 }, { k: 'num', v: t.v.slice(1), pos: t.pos + 1, end: t.end })
      }
      return this.next().v
    }
    if (t.k === 'name') return this.next().v
    throw this.error('Manca il pedice dopo _')
  }

  private name(): MathNode {
    let name = this.next().v
    if (this.is('op', '_')) name += '_' + this.subscriptText()
    let primes = 0
    while (this.is('prime')) {
      this.next()
      primes++
    }
    if (this.is('open', '(')) {
      const group = this.group(true)
      return { k: 'apply', name, args: group.k === 'tuple' ? group.items : [group], primes }
    }
    if (primes) throw this.error(`Dopo ${name}${"'".repeat(primes)} va il valore tra parentesi, es. ${name}'(x)`)
    return { k: 'name', name }
  }

  private fnCall(): MathNode {
    let name = this.next().v
    let base: MathNode | undefined
    let pow: MathNode | undefined
    for (let n = 0; n < 2; n++) {
      if (this.is('op', '_') && !base) {
        if (name !== 'log') throw this.error(`${name} non ha una base: solo \\log_b`)
        this.next()
        base = this.latexArg('la base del logaritmo')
      } else if (this.is('op', '^') && !pow) {
        const hat = this.next()
        pow = this.supArg(hat)
      }
    }
    if (pow && isMinusOne(pow) && INVERSE[name]) {
      name = INVERSE[name]
      pow = undefined
    }
    let args: MathNode[]
    if (this.is('open', '(') || (this.is('open', '\\{') && (name === 'max' || name === 'min' || name === 'gcd' || name === 'lcm'))) {
      const group = this.group(true)
      args = group.k === 'tuple' ? group.items : [group]
    } else {
      if (!this.peek() || !this.startsArgument()) throw this.error(`Manca l'argomento di ${name}`)
      args = [this.implicitArgument()]
    }
    return { k: 'fn', name, args, ...(pow && { pow }), ...(base && { base }) }
  }

  private startsArgument(): boolean {
    return this.startsFactor(true) || this.is('op', '-') || this.is('fn') || this.is('big') || this.is('int') || this.is('bar', '|')
  }

  /** L'argomento senza parentesi: `\sin 2x` è sin(2x), `\sin x \cos x` è sin(x)·cos(x). */
  private implicitArgument(): MathNode {
    let left = this.unary()
    while (this.startsFactor(true)) {
      if (left.k === 'num' && this.is('num')) throw this.error('Due numeri di seguito: manca un\'operazione?')
      left = { k: 'bin', op: '*', a: left, b: this.power(), implicit: true }
    }
    return left
  }

  /** `\sum_{k=1}^{n} …` e `\prod`. */
  private bigOperator(): MathNode {
    const op = this.next().v as 'sum' | 'prod'
    const symbol = op === 'sum' ? '\\sum' : '\\prod'
    let v: string | null = null
    let from: MathNode | null = null
    let to: MathNode | null = null
    for (let n = 0; n < 2; n++) {
      if (this.is('op', '_') && !from) {
        this.next()
        const braced = this.is('open', '{')
        if (braced) this.next()
        const index = this.peek()
        if (!index || index.k !== 'name' || !this.is('rel', '=', 1)) throw this.error(`Sotto ${symbol} va l'indice con il primo valore, es. ${symbol}_{k=1}`)
        this.i += 2
        v = index.v
        from = this.expr()
        if (braced) this.expect('close', '}', 'la graffa } dopo il primo valore')
      } else if (this.is('op', '^') && !to) {
        const hat = this.next()
        to = this.supArg(hat)
      }
    }
    if (!v || !from || !to) throw this.error(`${symbol} vuole l'indice e i due estremi, es. ${symbol}_{k=1}^{n}`)
    if (!this.peek() || !this.startsArgument()) throw this.error(`Manca cosa sommare dopo ${symbol}`)
    return { k: 'big', op, v, from, to, body: this.implicitArgument() }
  }

  /** `dx`, `d(x, y)` (anche `\mathrm{d}x`): qui finisce la funzione da integrare. */
  private atDifferential(o = 0): boolean {
    return this.is('name', 'd', o) && (this.is('name', undefined, o + 1) || this.is('open', '(', o + 1))
  }

  /** `\int_a^b f(x)\,dx`. */
  private integral(): MathNode {
    const kind = this.peek()!.v
    if (kind !== 'int' && kind !== 'oint') return this.multipleIntegral()
    const start = this.next()
    let from: MathNode | null = null
    let to: MathNode | null = null
    for (let n = 0; n < 2; n++) {
      if (this.is('op', '_') && !from) {
        const bar = this.next()
        from = this.supArg(bar)
      } else if (this.is('op', '^') && !to) {
        const hat = this.next()
        to = this.supArg(hat)
      }
    }
    // \int_\gamma f \, ds, \oint_C F \cdot dr: sulla curva.
    if (kind === 'oint' || (from && !to && from.k === 'name')) return this.lineIntegral(from, kind === 'oint', start)
    if (!from || !to) throw this.error('Si sanno calcolare solo gli integrali con gli estremi, es. \\int_0^1', start.pos)
    this.integrals++
    let body: MathNode
    try {
      // \int_0^1 dx: la funzione è 1.
      body = this.atDifferential() ? ONE : this.expr()
    } finally {
      this.integrals--
    }
    if (!this.is('name', 'd') || !this.is('name', undefined, 1)) throw this.error('Manca il dx alla fine dell\'integrale')
    this.next()
    const v = this.next().v
    return { k: 'int', v, from, to, body }
  }

  /** `\iint_D f \, dx \, dy` (anche `dA` o `d(x, y)`) e `\iiint_E f \, dx \, dy \, dz` (anche `dV`). */
  private multipleIntegral(): MathNode {
    const start = this.next()
    const n = start.v === 'iiint' ? 3 : 2
    const symbol = start.v === 'oiint' ? '\\oiint' : n === 2 ? '\\iint' : '\\iiint'
    let domain: MathNode | null = null
    if (this.is('op', '_')) {
      this.next()
      domain = this.domainArg()
    }
    if (this.is('op', '^')) throw this.error(`${symbol} vuole sotto il dominio, non gli estremi sopra: ${symbol}_D`)
    if (!domain) throw this.error(`Sotto ${symbol} va il dominio, es. ${n === 2 ? '\\iint_D' : '\\iiint_E'}`, start.pos)
    this.integrals++
    let body: MathNode
    try {
      body = this.atDifferential() ? ONE : this.expr()
    } finally {
      this.integrals--
    }
    // F \cdot d\mathbf{S}, f \, dS, F \cdot n \, dS: sulla superficie.
    const dot = this.is('op', '*') && this.atDifferential(1)
    if (dot) this.next()
    if (this.atDifferential() && SURFACE.has(this.peek(1)!.v)) {
      this.i += 2
      if (domain.k !== 'name') throw this.error(`Sotto ${symbol} va il nome della superficie, es. ${symbol}_S`, start.pos)
      const normal = dot ? null : withoutNormal(body)
      return { k: 'sint', surface: domain.name, closed: start.v === 'oiint', dS: !dot && !normal, body: normal ?? body }
    }
    if (dot || start.v === 'oiint') throw this.error(`Alla fine di ${symbol} va dS (o F \\cdot d\\mathbf{S})`)
    return { k: 'mint', vars: this.differentials(n), domain, body }
  }

  /** `\int_\gamma f \, ds`, `\oint_\gamma F \cdot dr`, `\int_\gamma y \, dx - x \, dy`: l'integrale sulla curva. */
  private lineIntegral(curve: MathNode | null, closed: boolean, start: Tok): MathNode {
    if (!curve || curve.k !== 'name') throw this.error('Sotto \\oint va la curva, es. \\oint_\\gamma', start.pos)
    this.integrals++
    try {
      // (P \, dx + Q \, dy): la forma tra parentesi.
      if (this.is('open', '(') && this.formAhead()) {
        this.next()
        const body = this.form()
        this.expect('close', ')', 'la parentesi ) della forma')
        return { k: 'lint', curve: curve.name, closed, ds: false, body, form: true }
      }
      const first = this.atDifferential() ? ONE : this.expr()
      if (this.is('op', '*') && this.atDifferential(1)) this.next()
      if (!this.atDifferential()) throw this.error('Manca il differenziale alla fine: ds (per una funzione), dr (per un campo) o dx, dy')
      this.next()
      const v = this.next().v
      if (v === 's') return { k: 'lint', curve: curve.name, closed, ds: true, body: first }
      if (v === 'r' || v === 'r⃗' || v === 'l' || v === 'ℓ') return { k: 'lint', curve: curve.name, closed, ds: false, body: first }
      if (v === 'x' || v === 'y' || v === 'z') return { k: 'lint', curve: curve.name, closed, ds: false, body: this.form({ v, coef: first }), form: true }
      throw this.error(`Alla fine va ds, dr oppure dx, dy, dz (non d${v})`)
    } finally {
      this.integrals--
    }
  }

  /** Dentro le parentesi dopo \int_\gamma c'è un dx, dy o dz: è una forma differenziale. */
  private formAhead(): boolean {
    let depth = 0
    for (let j = this.i; j < this.toks.length; j++) {
      const t = this.toks[j]
      if (t.k === 'open') depth++
      else if (t.k === 'close' && --depth === 0) return false
      else if (depth === 1 && t.k === 'name' && t.v === 'd' && /^[xyz]$/.test(this.toks[j + 1]?.v ?? '') && this.toks[j + 1].k === 'name') return true
    }
    return false
  }

  /** P \, dx + Q \, dy (+ R \, dz): il campo (P, Q, R). `first`: il primo pezzo, già letto. */
  private form(first?: { v: string; coef: MathNode }): MathNode {
    const parts = new Map<string, MathNode>()
    const put = (v: string, coef: MathNode) => {
      if (!/^[xyz]$/.test(v)) throw this.error(`In una forma vanno dx, dy e dz (non d${v})`)
      const before = parts.get(v)
      parts.set(v, before ? { k: 'bin', op: '+', a: before, b: coef } : coef)
    }
    const piece = (minus: boolean) => {
      const coef = this.atDifferential() ? ONE : this.term()
      if (!this.atDifferential()) throw this.error('Manca il differenziale: dx, dy o dz')
      this.next()
      put(this.next().v, minus ? { k: 'neg', a: coef } : coef)
    }
    if (first) put(first.v, first.coef)
    else piece(false)
    while (this.is('op', '+') || this.is('op', '-')) piece(this.next().v === '-')
    const names = parts.has('z') ? ['x', 'y', 'z'] : ['x', 'y']
    return { k: 'tuple', items: names.map((n) => parts.get(n) ?? ZERO) }
  }

  /**
   * `\frac{d}{dx} x^2`, `\frac{d^2 f}{dx^2}`, `\frac{\partial f}{\partial x}(1, 2)`,
   * `\frac{\partial^2}{\partial x \partial y} (x^2 y)`: una derivata. Null (senza leggere niente) se la
   * frazione è un'altra.
   */
  private derivativeFrac(): MathNode | null {
    const start = this.i
    const fail = () => {
      this.i = start
      return null
    }
    this.next()
    if (!this.is('open', '{')) return fail()
    this.next()
    const top = this.differentialHead()
    if (!top) return fail()
    let fn: string | null = null
    if (this.is('name')) {
      fn = this.next().v
      if (this.is('op', '_')) fn += '_' + this.subscriptText()
    }
    if (!this.is('close', '}')) return fail()
    this.next()
    if (!this.is('open', '{')) return fail()
    this.next()
    const vars: string[] = []
    while (!this.is('close', '}')) {
      const head = this.differentialHead(true)
      if (!head) return fail()
      for (let k = 0; k < (head.order ?? 1); k++) vars.push(head.v!)
    }
    this.next()
    if (!vars.length || (top.order !== null && top.order !== vars.length)) return fail()
    let body: MathNode
    if (fn) {
      // \frac{\partial f}{\partial x}(1, 2): f nel punto; senza punto, f con le sue variabili.
      if (this.is('open', '(')) {
        const group = this.group(true)
        body = { k: 'apply', name: fn, args: group.k === 'tuple' ? group.items : [group], primes: 0 }
      } else body = { k: 'name', name: fn }
    } else {
      if (!this.peek() || !this.startsArgument()) throw this.error('Manca la funzione da derivare dopo la frazione')
      body = this.term()
    }
    return { k: 'diff', body, vars, partial: top.partial }
  }

  /** `d`, `\partial`, `d^2`, `\partial^2` (con `variable`: seguito dalla variabile, `dx`, `\partial x^2`). */
  private differentialHead(variable = false): { partial: boolean; order: number | null; v?: string } | null {
    let partial: boolean
    if (this.is('partial')) partial = true
    else if (this.is('name', 'd')) partial = false
    else return null
    this.next()
    let v: string | undefined
    if (variable) {
      if (!this.is('name')) return null
      v = this.next().v
    }
    let order: number | null = null
    if (this.is('op', '^')) {
      this.next()
      const braced = this.is('open', '{')
      if (braced) this.next()
      if (!this.is('num')) return null
      order = Number(this.next().v)
      if (braced) {
        if (!this.is('close', '}')) return null
        this.next()
      }
      if (!Number.isInteger(order) || order < 1 || order > 9) return null
    }
    return { partial, order, v }
  }

  /** `\partial_x f`, `\partial_{xy} f`, `\partial_x \partial_y f`. */
  private partialDerivative(): MathNode {
    const start = this.next()
    const vars: string[] = []
    for (;;) {
      if (!this.is('op', '_')) throw this.error('Dopo \\partial va la variabile: \\partial_x f', start.pos)
      this.next()
      if (this.is('open', '{')) {
        this.next()
        while (this.is('name')) vars.push(this.next().v)
        this.expect('close', '}', 'la graffa } della variabile')
      } else if (this.is('name')) vars.push(this.next().v)
      if (!vars.length) throw this.error('Dopo \\partial va la variabile: \\partial_x f', start.pos)
      if (!this.is('partial')) break
      this.next()
    }
    if (!this.peek() || !this.startsArgument()) throw this.error('Manca la funzione da derivare dopo \\partial', start.pos)
    return { k: 'diff', body: this.term(), vars, partial: true }
  }

  /** `\nabla f` (il gradiente), `\nabla \cdot F` (la divergenza), `\nabla \times F` (il rotore), `\nabla^2 f` (il laplaciano). */
  private nabla(): MathNode {
    const start = this.next()
    let name = 'grad'
    if (this.is('op', '*')) name = this.next().cross ? 'curl' : 'div'
    else if (this.is('op', '^')) {
      const hat = this.next()
      const p = this.supArg(hat)
      if (!(p.k === 'num' && p.v === 2)) throw this.error('\\nabla^2 f è il laplaciano: dopo \\nabla^ va 2', start.pos)
      name = 'lap'
    }
    if (!this.peek() || !this.startsArgument()) throw this.error('Manca la funzione dopo \\nabla', start.pos)
    return { k: 'fn', name, args: [this.implicitArgument()], nabla: true }
  }

  /** Il dominio sotto \iint: un nome (D) o, tra graffe, un insieme, una condizione o un rettangolo. */
  private domainArg(): MathNode {
    if (!this.is('open', '{')) return this.latexArg('il dominio dell\'integrale')
    this.next()
    if (this.is('close', '}')) throw this.error('Il dominio è vuoto')
    const inner = this.condition()
    this.expect('close', '}', 'la graffa } del dominio')
    return inner
  }

  /** Le variabili di dx \, dy (\, dz), d(x, y), dA (x e y) o dV (x, y e z), alla fine di un integrale doppio o triplo. */
  private differentials(n: number): string[] {
    const vars: string[] = []
    while (this.atDifferential()) {
      this.next()
      if (this.is('open', '(')) {
        const group = this.group(true)
        for (const item of group.k === 'tuple' ? group.items : [group]) {
          if (item.k !== 'name') throw this.error('In d(x, y) vanno le variabili')
          vars.push(item.name)
        }
      } else vars.push(this.next().v)
    }
    if (vars.length === 1 && n === 2 && vars[0] === 'A') return ['x', 'y']
    if (vars.length === 1 && n === 3 && vars[0] === 'V') return ['x', 'y', 'z']
    if (vars.length !== n || new Set(vars).size !== n) {
      throw this.error(n === 2 ? 'Alla fine dell\'integrale doppio va dx \\, dy (o dA)' : 'Alla fine dell\'integrale triplo va dx \\, dy \\, dz (o dV)')
    }
    return vars
  }

  /**
   * `\{(x, y) \in \mathbb{R}^2 : x^2 + y^2 \le 1\}`: un insieme, con le sue variabili e la condizione
   * (dopo «:», «|» o \mid); le variabili si possono non scrivere: `\{0 \le x \le 1, 0 \le y \le x\}`.
   */
  private setBuilder(): MathNode {
    this.next()
    const start = this.i
    let vars: string[] | null = null
    try {
      vars = this.setHead()
    } catch {
      vars = null
    }
    if (!vars) this.i = start
    if (this.is('close', '\\}')) throw this.error('L\'insieme è vuoto')
    const cond = this.condition()
    this.expect('close', '\\}', 'la graffa \\} che chiude l\'insieme')
    return { k: 'set', vars, cond }
  }

  /** La prima parte di un insieme: `(x, y)` o `x`, con `\in \mathbb{R}^2` facoltativo, fino a «:» o «|». */
  private setHead(): string[] | null {
    const vars: string[] = []
    if (this.is('open', '(')) {
      this.next()
      for (;;) {
        if (!this.is('name')) return null
        const n = this.name()
        if (n.k !== 'name') return null
        vars.push(n.name)
        if (!this.is('comma')) break
        this.next()
      }
      if (!this.is('close', ')')) return null
      this.next()
    } else if (this.is('name')) {
      const n = this.name()
      if (n.k !== 'name') return null
      vars.push(n.name)
    } else return null
    if (this.is('in')) {
      this.next()
      if (!this.is('set')) return null
      this.next()
      if (this.is('op', '^')) {
        this.next()
        this.latexArg('la dimensione')
      }
    }
    const t = this.peek()
    if (!t || !((t.k === 'op' && t.colon) || (t.k === 'bar' && t.v === '|'))) return null
    this.next()
    return vars
  }

  /** `\begin{cases} x^2 & x < 0 \\ x & \text{altrimenti} \end{cases}`. */
  private cases(): MathNode {
    this.next()
    const rows: { value: MathNode; cond: MathNode | null }[] = []
    for (;;) {
      if (this.is('endcases')) break
      if (!this.peek()) throw this.error('Manca \\end{cases}')
      const value = this.expr()
      let cond: MathNode | null = null
      while (this.is('comma') || this.is('semi') || this.is('sep')) this.next()
      if (this.is('amp')) {
        this.next()
        while (this.is('sep')) this.next()
        if (this.is('else')) this.next()
        else if (!this.is('row') && !this.is('endcases')) cond = this.condition()
      }
      rows.push({ value, cond })
      if (this.is('row')) {
        this.next()
        continue
      }
      if (!this.is('endcases')) throw this.error('Nei casi ogni riga finisce con \\\\ e la condizione va dopo &')
    }
    this.next()
    if (!rows.length) throw this.error('I casi sono vuoti')
    return { k: 'cases', rows }
  }

  /**
   * Una parentesi: un'espressione, oppure più valori separati da virgole (un punto, gli argomenti
   * di una funzione). `args`: la parentesi segue il nome di una funzione.
   */
  private group(args = false): MathNode {
    const open = this.next()
    const close = CLOSING[open.v]
    if (open.v === '\\{' && !args) throw this.error('Le graffe \\{ \\} si usano solo per le condizioni')
    if (this.is('close', close)) {
      if (args) {
        this.next()
        return { k: 'tuple', items: [] }
      }
      throw this.error('Le parentesi sono vuote')
    }
    let items = [this.expr()]
    const seps: { semi: boolean; tight: boolean }[] = []
    while (this.is('comma') || this.is('semi')) {
      const sep = this.next()
      const before = this.toks[this.i - 2]
      const after = this.peek()
      // «0,5» senza spazi tra due cifre
      const tight = sep.k === 'comma' && before?.k === 'num' && after?.k === 'num' && before.end === sep.pos && after.pos === sep.end
      seps.push({ semi: sep.k === 'semi', tight })
      items.push(this.expr())
    }
    // Con il punto e virgola a separare, la virgola tra due cifre è quella dei decimali: (0,5; 2).
    if (seps.some((sep) => sep.semi)) {
      const merged = [items[0]]
      seps.forEach((sep, i) => {
        const prev = merged[merged.length - 1]
        const item = items[i + 1]
        if (sep.tight && prev.k === 'num' && item.k === 'num' && !prev.text.includes('.')) {
          const text = `${prev.text}.${item.text}`
          merged[merged.length - 1] = { k: 'num', v: Number(text), text, comma: true }
        } else merged.push(item)
      })
      items = merged
    }
    if (!this.is('close', close)) {
      const t = this.peek()
      if (t?.k === 'close') throw this.error(`La parentesi ${describe(open)} si chiude con ${SHOW[close] ?? close}, non con ${describe(t)}`)
      if (!t) throw this.error(`Manca la parentesi ${SHOW[close] ?? close}`)
      if (t.k === 'bad') throw this.badToken(t)
      throw this.error(`Non mi aspettavo ${describe(t)} qui: manca la parentesi ${SHOW[close] ?? close}?`)
    }
    this.next()
    if (open.v === 'floor' || open.v === 'ceil') {
      if (items.length > 1) throw this.error('Nella parte intera va un solo valore', open.pos)
      return { k: open.v, a: items[0] }
    }
    if (open.v === '⟨') {
      if (items.length !== 2) throw this.error('Il prodotto scalare ha due vettori: \\langle u, v \\rangle', open.pos)
      return { k: 'fn', name: 'dot', args: items }
    }
    return items.length === 1 ? items[0] : { k: 'tuple', items }
  }

  /** `\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}`: le righe, con gli elementi separati da &. */
  private matrix(): MathNode {
    const begin = this.next()
    const rows: MathNode[][] = []
    let row: MathNode[] = []
    for (;;) {
      if (this.is('endmatrix')) break
      if (!this.peek()) throw this.error(`Manca \\end{${begin.v}}`)
      row.push(this.expr())
      if (this.is('amp')) {
        this.next()
        continue
      }
      if (this.is('row')) {
        this.next()
        rows.push(row)
        row = []
        continue
      }
      if (!this.is('endmatrix')) throw this.error('In una matrice gli elementi si separano con & e le righe con \\\\')
    }
    this.next()
    if (row.length) rows.push(row)
    if (!rows.length) throw this.error('La matrice è vuota', begin.pos)
    if (rows.some((r) => r.length !== rows[0].length)) throw this.error('Le righe della matrice hanno lunghezze diverse', begin.pos)
    const matrix: MathNode = { k: 'matrix', rows }
    return begin.v === 'vmatrix' ? { k: 'fn', name: 'det', args: [matrix] } : matrix
  }
}

/** La funzione 1 di \int_0^1 dx (e dell'area di un dominio, \iint_D dx \, dy). */
const ONE: MathNode = { k: 'num', v: 1, text: '1', comma: false }
const ZERO: MathNode = { k: 'num', v: 0, text: '0', comma: false }

/** I differenziali di superficie: dS, dσ, d\mathbf{S}, d\vec{S}. */
const SURFACE = new Set(['S', 'σ', 'S⃗', 'Σ'])

/** F \cdot n (o \hat{n}, \mathbf{n}, \vec{n}): il campo F, senza la normale; null se non è scritto così. */
function withoutNormal(body: MathNode): MathNode | null {
  if (body.k !== 'bin' || body.op !== '*' || body.implicit || body.cross) return null
  const n = body.b
  return n.k === 'name' && /^(n|n̂|n⃗|ν|N)$/.test(n.name) ? body.a : null
}

function isMinusOne(n: MathNode): boolean {
  return n.k === 'neg' && n.a.k === 'num' && n.a.v === 1
}

function joinAnd(a: MathNode | null, b: MathNode): MathNode {
  if (!a) return b
  return { k: 'and', items: [...(a.k === 'and' ? a.items : [a]), ...(b.k === 'and' ? b.items : [b])] }
}

/** Legge un'espressione (o una relazione, `a = b`, `x < 2`). */
export function parseMath(src: string): MathNode {
  const parser = new Parser(tokenize(src), src.length)
  if (parser.done) throw new MathSyntaxError('L\'espressione è vuota', 0)
  const node = parser.relation()
  parser.finish()
  return node
}

/** Legge un'espressione con la sua eventuale condizione: `y = x^2, x > 0`. */
export function parseStatement(src: string): Statement {
  const parser = new Parser(tokenize(src), src.length)
  if (parser.done) throw new MathSyntaxError('L\'espressione è vuota', 0)
  const statement = parser.statement()
  parser.finish()
  return statement
}

/** I nomi (variabili e funzioni definite nella nota) che l'espressione usa. */
export function namesIn(node: MathNode, out = new Set<string>(), bound: ReadonlySet<string> = new Set()): Set<string> {
  const visit = (n: MathNode, b: ReadonlySet<string>): void => {
    switch (n.k) {
      case 'name':
        if (!b.has(n.name)) out.add(n.name)
        return
      case 'apply':
        if (!b.has(n.name)) out.add(n.name)
        n.args.forEach((a) => visit(a, b))
        return
      case 'big':
      case 'int': {
        visit(n.from, b)
        visit(n.to, b)
        visit(n.body, new Set([...b, n.v]))
        return
      }
      case 'mint': {
        const inner = new Set([...b, ...n.vars])
        visit(n.domain, inner)
        visit(n.body, inner)
        return
      }
      case 'set':
        visit(n.cond, new Set([...b, ...(n.vars ?? [])]))
        return
      case 'diff':
        visit(n.body, b)
        // La derivata dipende dalle sue variabili (non se è in un punto: f(1, 2)).
        if (n.body.k !== 'apply') for (const v of n.vars) if (!b.has(v)) out.add(v)
        return
      case 'lint':
      case 'sint': {
        const where = n.k === 'lint' ? n.curve : n.surface
        if (!b.has(where)) out.add(where)
        visit(n.body, new Set([...b, 'x', 'y', 'z']))
        return
      }
      default:
        for (const child of children(n)) visit(child, b)
    }
  }
  visit(node, bound)
  return out
}

/** I figli di un nodo, per visitarlo. */
export function children(n: MathNode): MathNode[] {
  switch (n.k) {
    case 'matrix':
      return n.rows.flat()
    case 'num':
    case 'name':
    case 'infty':
      return []
    case 'neg':
    case 'post':
    case 'abs':
    case 'floor':
    case 'ceil':
      return [n.a]
    case 'bin':
      return [n.a, n.b]
    case 'fn':
      return [...n.args, ...(n.pow ? [n.pow] : []), ...(n.base ? [n.base] : [])]
    case 'apply':
      return n.args
    case 'binom':
      return [n.n, n.r]
    case 'big':
    case 'int':
      return [n.from, n.to, n.body]
    case 'mint':
      return [n.domain, n.body]
    case 'set':
      return [n.cond]
    case 'cases':
      return n.rows.flatMap((r) => (r.cond ? [r.value, r.cond] : [r.value]))
    case 'tuple':
    case 'rel':
    case 'and':
    case 'or':
      return n.items
    case 'in':
      return [n.a, n.lo, n.hi]
    case 'diff':
    case 'lint':
    case 'sint':
      return [n.body]
  }
}
