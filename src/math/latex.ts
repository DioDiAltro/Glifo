/**
 * Un'espressione letta da `parse.ts` riscritta in LaTeX, per le legende dei grafici. Così si
 * vede come Glifo l'ha capita: `sqrt(x)/2` diventa \frac{\sqrt{x}}{2}.
 */
import type { MathNode, RelOp } from './parse'

const GREEK_COMMANDS: Record<string, string> = {
  α: 'alpha', β: 'beta', γ: 'gamma', δ: 'delta', ε: 'varepsilon', ζ: 'zeta', η: 'eta', θ: 'theta', ι: 'iota',
  κ: 'kappa', λ: 'lambda', μ: 'mu', ν: 'nu', ξ: 'xi', ρ: 'rho', σ: 'sigma', τ: 'tau', υ: 'upsilon', φ: 'varphi',
  χ: 'chi', ψ: 'psi', ω: 'omega', Γ: 'Gamma', Δ: 'Delta', Θ: 'Theta', Λ: 'Lambda', Ξ: 'Xi', Π: 'Pi', Σ: 'Sigma',
  Υ: 'Upsilon', Φ: 'Phi', Ψ: 'Psi', Ω: 'Omega', π: 'pi',
}
const ACCENT_COMMANDS: Record<string, string> = {
  '̄': 'bar', '̂': 'hat', '̃': 'tilde', '⃗': 'vec', '̇': 'dot', '̈': 'ddot',
}
/** Le funzioni che KaTeX conosce come comandi; le altre con \operatorname. */
const KATEX_FUNCTIONS = new Set(['sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh', 'coth', 'ln', 'log', 'lg', 'exp', 'max', 'min', 'gcd', 'det', 'ker', 'dim'])
const REL: Record<RelOp, string> = { '=': '=', '<': '<', '<=': '\\le', '>': '>', '>=': '\\ge', '!=': '\\ne', '≈': '\\approx' }

function letters(s: string): string {
  let out = ''
  for (const ch of s) {
    const g = GREEK_COMMANDS[ch]
    out += g ? `\\${g} ` : ch
  }
  return out.trim()
}

/** I nomi che sono simboli: l'insieme vuoto, l'insieme delle parti, il complementare, i puntini. */
const SYMBOL_NAMES: Record<string, string> = { '⊥': '\\perp', '∅': '\\emptyset', '𝒫': '\\mathcal{P}', '∁': '\\complement', '…': '\\ldots' }

export function nameLatex(name: string): string {
  if (name in SYMBOL_NAMES) return SYMBOL_NAMES[name]
  const [base, ...sub] = name.split('_')
  let head = letters(base)
  const accent = ACCENT_COMMANDS[base.slice(-1)]
  if (accent) head = `\\${accent}{${letters(base.slice(0, -1))}}`
  return sub.length ? `${head}_{${letters(sub.join('_'))}}` : head
}

/** Quanto lega un nodo: le parentesi servono quando dentro c'è qualcosa che lega meno. */
function level(n: MathNode): number {
  switch (n.k) {
    case 'rel':
    case 'in':
    case 'and':
    case 'or':
      return 0
    case 'bin':
      return n.op === '+' || n.op === '-' ? 1 : n.op === '^' ? 4 : n.op === '/' ? 5 : 2
    case 'neg':
      return 1.5
    case 'big':
    case 'int':
    case 'prim':
    case 'mint':
    case 'lint':
    case 'sint':
    case 'lim':
      return 1.8
    case 'diff':
      return n.body.k === 'name' || n.body.k === 'apply' ? 5 : 1.8
    case 'fn':
      return n.args.length === 1 && isAtom(n.args[0]) ? 3 : 5
    case 'post':
      return 4.5
    case 'num':
      return n.v < 0 ? 1.5 : 5
    default:
      return 5
  }
}

function isAtom(n: MathNode): boolean {
  return (n.k === 'num' && n.v >= 0) || n.k === 'name'
}

function paren(s: string): string {
  return `\\left(${s}\\right)`
}

function wrap(n: MathNode, min: number): string {
  const s = toLatex(n)
  return level(n) < min ? paren(s) : s
}

function numberLatex(n: Extract<MathNode, { k: 'num' }>): string {
  return n.comma ? n.text.replace('.', '{,}') : n.text
}

/** Come si scrivono le funzioni dei numeri complessi. */
const COMPLEX_FUNCTIONS: Record<string, string> = {
  re: '\\operatorname{Re}',
  im: '\\operatorname{Im}',
  arg: '\\arg',
  eig: '\\operatorname{autovalori}',
  eigvec: '\\operatorname{autovettori}',
  study: '\\operatorname{studio}',
  domain: '\\operatorname{dominio}',
  asymptotes: '\\operatorname{asintoti}',
  extrema: '\\operatorname{estremi}',
  flexes: '\\operatorname{flessi}',
  zeros: '\\operatorname{zeri}',
  line: '\\operatorname{retta}',
  circle: '\\operatorname{circonferenza}',
  mid: '\\operatorname{medio}',
  centroid: '\\operatorname{baricentro}',
  perimeter: '\\operatorname{perimetro}',
  plane: '\\operatorname{piano}',
  intersect: '\\operatorname{intersezione}',
  polygon: '\\operatorname{poligono}',
  dist: '\\operatorname{distanza}',
  segment: '\\operatorname{segmento}',
  angle: '\\operatorname{angolo}',
  levels: '\\operatorname{livelli}',
  taylor: '\\operatorname{taylor}',
  maclaurin: '\\operatorname{maclaurin}',
  mean: '\\operatorname{media}',
  median: '\\operatorname{mediana}',
  mode: '\\operatorname{moda}',
  var: '\\operatorname{Var}',
  svar: '\\operatorname{Var}_{c}',
  sd: '\\operatorname{sqm}',
  ssd: '\\operatorname{sqm}_{c}',
  quartiles: '\\operatorname{quartili}',
  quantile: '\\operatorname{quantile}',
  percentile: '\\operatorname{percentile}',
  cov: '\\operatorname{Cov}',
  corr: '\\operatorname{corr}',
  regression: '\\operatorname{regressione}',
  summary: '\\operatorname{statistiche}',
  frequencies: '\\operatorname{frequenze}',
  range: '\\operatorname{campo}',
  histogram: '\\operatorname{istogramma}',
  barchart: '\\operatorname{barre}',
  scatter: '\\operatorname{dispersione}',
  diagonalize: '\\operatorname{diagonalizza}',
  gramschmidt: '\\operatorname{gramschmidt}',
  signature: '\\operatorname{segnatura}',
  independent: '\\operatorname{indipendenti}',
  matrixof: '\\operatorname{matrice}',
  equations: '\\operatorname{equazioni}',
  projection: '\\operatorname{proiezione}',
  factor: '\\operatorname{scomponi}',
  divisors: '\\operatorname{divisori}',
  isprime: '\\operatorname{primo}',
  division: '\\operatorname{divisione}',
  ruffini: '\\operatorname{ruffini}',
  expandpoly: '\\operatorname{sviluppa}',
  modinv: '\\operatorname{inverso}',
  base: '\\operatorname{base}',
  binary: '\\operatorname{binario}',
  hex: '\\operatorname{esadecimale}',
  powerset: '\\mathcal{P}',
  card: '\\operatorname{card}',
  totient: '\\varphi',
  diophantine: '\\operatorname{diofantea}',
  bezout: '\\operatorname{bezout}',
  euclid: '\\operatorname{euclide}',
  lcm: '\\operatorname{mcm}',
  fourier: '\\operatorname{fourier}',
  laplace: '\\mathcal{L}',
  ilaplace: '\\mathcal{L}^{-1}',
  bisection: '\\operatorname{bisezione}',
  secant: '\\operatorname{secanti}',
  fixedpoint: '\\operatorname{puntofisso}',
  interpolate: '\\operatorname{interpola}',
  leastsquares: '\\operatorname{minimiquadrati}',
  midpoint: '\\operatorname{rettangoli}',
  trapezoid: '\\operatorname{trapezi}',
  norm: '\\operatorname{norma}',
  euler: '\\operatorname{eulero}',
  ci: '\\operatorname{ic}',
  civar: '\\operatorname{icvarianza}',
  htest: '\\operatorname{test}',
  chisq: '\\operatorname{chiquadro}',
}

/** Le funzioni della statistica: sempre con le parentesi. */
const STATISTICS_NAMES = new Set([
  'mean', 'median', 'mode', 'var', 'svar', 'sd', 'ssd', 'quartiles', 'quantile', 'percentile', 'cov', 'corr', 'regression',
  'summary', 'frequencies', 'range', 'histogram', 'barchart', 'scatter',
])

/** Come si scrivono le distribuzioni dopo \sim. */
const DISTRIBUTION_LATEX: Record<string, string> = {
  bernoulli: '\\operatorname{Be}', binomial: 'B', poisson: '\\operatorname{Po}', geometric: '\\operatorname{Geom}',
  hypergeometric: '\\operatorname{H}', normal: '\\mathcal{N}', exponential: '\\operatorname{Exp}', uniform: '\\mathcal{U}',
  student: 't', chi2: '\\chi^2', fisher: 'F', gamma: '\\Gamma',
}

/** B(10, 0{,}3), \mathcal{N}(0, 1): una distribuzione con i suoi parametri. */
export function distributionLatex(family: string, params: MathNode[]): string {
  return `${DISTRIBUTION_LATEX[family] ?? family}(${params.map(toLatex).join(', ')})`
}

/** I nomi scritti attaccati di una figura (AB, ABC): \overline{AB}, \widehat{ABC}. */
function lettersOnly(n: MathNode): boolean {
  if (n.k === 'name') return true
  return n.k === 'bin' && n.op === '*' && !!n.implicit && lettersOnly(n.a) && lettersOnly(n.b)
}

function fnName(name: string): string {
  if (KATEX_FUNCTIONS.has(name)) return `\\${name}`
  return COMPLEX_FUNCTIONS[name] ?? `\\operatorname{${name}}`
}

/** Il primo carattere che si vedrebbe: per decidere se tra due fattori serve il puntino. */
function startsWithDigit(n: MathNode): boolean {
  switch (n.k) {
    case 'num':
      return true
    case 'bin':
      return n.op !== '/' && startsWithDigit(n.a)
    case 'post':
      return startsWithDigit(n.a)
    default:
      return false
  }
}

export function toLatex(node: MathNode): string {
  switch (node.k) {
    case 'num':
      return numberLatex(node)
    case 'name':
      return nameLatex(node.name)
    case 'infty':
      return '\\infty'
    case 'congr':
      return `${toLatex(node.a)} \\equiv ${toLatex(node.b)} \\pmod{${toLatex(node.m)}}`
    case 'neg':
      return `-${wrap(node.a, 2)}`
    case 'bin': {
      switch (node.op) {
        case '+':
          if (node.cup) return `${toLatex(node.a)} \\cup ${wrap(node.b, 1.6)}`
          return `${toLatex(node.a)} + ${wrap(node.b, 1.6)}`
        case '-':
          if (node.setminus) return `${toLatex(node.a)} \\setminus ${wrap(node.b, 1.6)}`
          return `${toLatex(node.a)} - ${wrap(node.b, 1.6)}`
        case '*': {
          const a = wrap(node.a, 1.9)
          const b = wrap(node.b, 2)
          if (node.cross) return `${a} \\times ${b}`
          if (node.cap) return `${a} \\cap ${b}`
          const dot = !node.implicit || startsWithDigit(node.b) || (node.a.k === 'post' && node.a.op === '!')
          return dot ? `${a} \\cdot ${b}` : `${a}${/^[A-Za-z]/.test(b) && /\\[A-Za-z]+$/.test(a) ? ' ' : ''}${b}`
        }
        case '/':
          return `\\frac{${toLatex(node.a)}}{${toLatex(node.b)}}`
        case '^': {
          if (node.a.k === 'fn' && !node.a.pow && !node.a.base) return fnLatex(node.a, node.b)
          return `${wrap(node.a, 4.1)}^{${toLatex(node.b)}}`
        }
      }
      break
    }
    case 'fn':
      return fnLatex(node, node.pow)
    case 'apply': {
      // f(x) con le parentesi normali; quelle che si allungano solo attorno alle frazioni.
      const args = node.args.map(toLatex).join(', ')
      return `${nameLatex(node.name)}${"'".repeat(node.primes)}${/\\(frac|sum|int|prod|binom)/.test(args) ? paren(args) : `(${args})`}`
    }
    case 'post':
      if (node.op === '!') return `${wrap(node.a, 5)}!`
      if (node.op === '%') return `${wrap(node.a, 4.5)}\\%`
      return `${wrap(node.a, 4.5)}^{\\circ}`
    case 'abs':
      return `\\left|${toLatex(node.a)}\\right|`
    case 'floor':
      return `\\left\\lfloor ${toLatex(node.a)}\\right\\rfloor`
    case 'ceil':
      return `\\left\\lceil ${toLatex(node.a)}\\right\\rceil`
    case 'binom':
      return `\\binom{${toLatex(node.n)}}{${toLatex(node.r)}}`
    case 'big':
      return `\\${node.op}_{${nameLatex(node.v)}=${toLatex(node.from)}}^{${toLatex(node.to)}} ${wrap(node.body, 2)}`
    case 'int':
      // Una somma tra parentesi: \int_0^1 (x + y) \, dx; un integrale dentro l'altro no.
      return `\\int_{${toLatex(node.from)}}^{${toLatex(node.to)}} ${node.body.k === 'int' ? toLatex(node.body) : wrap(node.body, 1.5)} \\, d${nameLatex(node.v)}`
    case 'prim':
      return `\\int ${wrap(node.body, 1.5)} \\, d${nameLatex(node.v)}`
    case 'mint': {
      const symbol = node.vars.length === 2 ? '\\iint' : '\\iiint'
      return `${symbol}_{${domainLatex(node.domain)}} ${wrap(node.body, 1.5)} \\, ${node.vars.map((v) => `d${nameLatex(v)}`).join(' \\, ')}`
    }
    case 'diff':
      return diffLatex(node)
    case 'lim': {
      const side = node.side ? `^{${node.side > 0 ? '+' : '-'}}` : ''
      const to = node.to.k === 'infty' ? '+\\infty' : toLatex(node.to)
      const vars = node.vars ? `\\left(${node.vars.map(nameLatex).join(', ')}\\right)` : nameLatex(node.v)
      return `\\lim_{${vars} \\to ${to}${side}} ${wrap(node.body, 2)}`
    }
    case 'lint': {
      const head = `${node.closed ? '\\oint' : '\\int'}_{${nameLatex(node.curve)}}`
      if (node.ds) return `${head} ${wrap(node.body, 1.5)} \\, ds`
      if (node.form && node.body.k === 'tuple') return `${head} ${formLatex(node.body.items)}`
      return `${head} ${wrap(node.body, 2)} \\cdot d\\mathbf{r}`
    }
    case 'sint': {
      const head = `${node.closed ? '\\oiint' : '\\iint'}_{${nameLatex(node.surface)}}`
      return node.dS ? `${head} ${wrap(node.body, 1.5)} \\, dS` : `${head} ${wrap(node.body, 2)} \\cdot d\\mathbf{S}`
    }
    case 'set':
      return setLatex(node)
    case 'matrix':
      return `\\begin{pmatrix} ${node.rows.map((r) => r.map(toLatex).join(' & ')).join(' \\\\ ')} \\end{pmatrix}`
    case 'cases':
      return `\\begin{cases} ${node.rows.map((r) => `${toLatex(r.value)} & ${r.cond ? toLatex(r.cond) : '\\text{altrimenti}'}`).join(' \\\\ ')} \\end{cases}`
    case 'tuple':
      return paren(node.items.map(toLatex).join(', '))
    case 'rel':
      return node.items.map((it, i) => (i ? ` ${REL[node.ops[i - 1]]} ` : '') + toLatex(it)).join('')
    case 'in':
      return `${toLatex(node.a)} \\in \\left${node.loOpen ? '(' : '['}${toLatex(node.lo)}, ${toLatex(node.hi)}\\right${node.hiOpen ? ')' : ']'}`
    case 'and':
      return node.items.map(toLatex).join(',\\; ')
    case 'or':
      return node.items.map(toLatex).join('\\ \\text{o}\\ ')
    case 'prob': {
      // Le parentesi che si allungano solo attorno alle frazioni (come f(x)): P(X \le 3) senza spazio dopo la P.
      const inner = `${toLatex(node.event)}${node.given ? ` \\mid ${toLatex(node.given)}` : ''}`
      return /\\(frac|sum|int|prod|binom)/.test(inner) ? `P\\left(${inner}\\right)` : `P(${inner})`
    }
    case 'expect': {
      const inner = toLatex(node.a)
      return /\\(frac|sum|int|prod|binom)/.test(inner) ? `E\\left[${inner}\\right]` : `E[${inner}]`
    }
    case 'dist':
      return `${nameLatex(node.v)} \\sim ${distributionLatex(node.family, node.params)}`
  }
  return ''
}

/** \frac{\partial^2 f}{\partial x \, \partial y}, \frac{d}{dx} (…), \frac{\partial f}{\partial x}(1, 2). */
function diffLatex(node: Extract<MathNode, { k: 'diff' }>): string {
  const d = node.partial ? '\\partial' : 'd'
  const n = node.vars.length
  const top = n > 1 ? `${d}^{${n}}` : d
  const groups: [string, number][] = []
  for (const v of node.vars) {
    const last = groups[groups.length - 1]
    if (last && last[0] === v) last[1]++
    else groups.push([v, 1])
  }
  const bottom = groups.map(([v, k]) => `${d}${node.partial ? ' ' : ''}${nameLatex(v)}${k > 1 ? `^{${k}}` : ''}`).join(' \\, ')
  const body = node.body
  if (body.k === 'name') return `\\frac{${top} ${nameLatex(body.name)}}{${bottom}}`
  if (body.k === 'apply' && !body.primes) return `\\frac{${top} ${nameLatex(body.name)}}{${bottom}}\\left(${body.args.map(toLatex).join(', ')}\\right)`
  return `\\frac{${top}}{${bottom}} ${wrap(body, 3)}`
}

/** (P \, dx + Q \, dy): una forma differenziale. */
function formLatex(items: MathNode[]): string {
  const parts: string[] = []
  items.forEach((c, i) => {
    if (c.k === 'num' && c.v === 0) return
    const d = `d${'xyz'[i]}`
    const negative = c.k === 'neg'
    const value = negative ? c.a : c
    const coef = value.k === 'num' && value.v === 1 ? d : `${wrap(value, 2)} \\, ${d}`
    parts.push(parts.length ? `${negative ? '-' : '+'} ${coef}` : `${negative ? '-' : ''}${coef}`)
  })
  return paren(parts.join(' ') || '0')
}

function setLatex(node: Extract<MathNode, { k: 'set' }>): string {
  const head = node.vars ? `${node.vars.length === 1 ? nameLatex(node.vars[0]) : `(${node.vars.map(nameLatex).join(', ')})`} : ` : ''
  return `\\left\\{ ${head}${toLatex(node.cond)} \\right\\}`
}

/** Il dominio di un integrale doppio o triplo: gli intervalli di un rettangolo con le quadre ([0, 1] \times [0, 2]). */
function domainLatex(node: MathNode): string {
  if (node.k === 'tuple' && node.items.length === 2) return `[${node.items.map(toLatex).join(', ')}]`
  if (node.k === 'bin' && node.op === '*') return `${domainLatex(node.a)} \\times ${domainLatex(node.b)}`
  if (node.k === 'bin' && node.op === '^' && node.a.k === 'tuple') return `${domainLatex(node.a)}^{${toLatex(node.b)}}`
  return toLatex(node)
}

function fnLatex(node: Extract<MathNode, { k: 'fn' }>, pow?: MathNode): string {
  const args = node.args
  const arg = args.length === 1 ? args[0] : null
  const inner = args.map(toLatex).join(', ')
  let out: string
  switch (node.name) {
    case 'sqrt':
      out = `\\sqrt{${inner}}`
      break
    case 'root':
      out = `\\sqrt[${toLatex(node.base!)}]{${inner}}`
      break
    case 'abs':
      out = `\\left|${inner}\\right|`
      break
    case 'conj':
      out = `\\overline{${inner}}`
      break
    case 'triangle':
      if (arg && lettersOnly(arg)) return `\\triangle ${inner}`
      out = `\\operatorname{triangolo}${paren(inner)}`
      break
    case 'arrow':
      out = arg && lettersOnly(arg) ? `\\overrightarrow{${inner}}` : `\\overrightarrow{${inner}}`
      break
    case 'angle':
      if (arg && lettersOnly(arg)) {
        out = `\\widehat{${inner}}`
        break
      }
      out = `\\operatorname{angolo}${paren(inner)}`
      break
    case 'line':
      if (arg && lettersOnly(arg)) {
        out = `\\overleftrightarrow{${inner}}`
        break
      }
      out = `\\operatorname{retta}${paren(inner)}`
      break
    case 'dot':
      out = `\\langle ${args.map(toLatex).join(', ')} \\rangle`
      break
    case 'grad':
    case 'div':
    case 'curl':
    case 'lap': {
      const a = arg ? wrap(arg, 3) : paren(inner)
      if (node.nabla) out = { grad: '\\nabla', div: '\\nabla \\cdot', curl: '\\nabla \\times', lap: '\\nabla^{2}' }[node.name] + ` ${a}`
      else out = { grad: '\\operatorname{grad}', div: '\\operatorname{div}', curl: '\\operatorname{rot}', lap: '\\Delta' }[node.name] + ` ${a}`
      break
    }
    case 'hess':
    case 'jac': {
      const letter = node.name === 'hess' ? 'H' : 'J'
      out = arg && arg.k === 'name' ? `${letter}_{${toLatex(arg)}}` : `${letter}_{${arg && arg.k === 'apply' ? nameLatex(arg.name) : ''}}${arg && arg.k === 'apply' ? `(${arg.args.map(toLatex).join(', ')})` : paren(inner)}`
      break
    }
    case 'mod':
      // 17 \bmod 5, come si scrive.
      if (node.args.length === 2) return `${wrap(node.args[0], 2)} \\bmod ${wrap(node.args[1], 2)}`
      out = `\\operatorname{mod}${paren(inner)}`
      break
    case 'floor':
      out = `\\left\\lfloor ${inner}\\right\\rfloor`
      break
    case 'ceil':
      out = `\\left\\lceil ${inner}\\right\\rceil`
      break
    case 'comb':
    case 'combrep':
    case 'disp':
    case 'disprep':
      // C_{10,3}, D'_{10,3}: come nei libri italiani.
      out = `${node.name.startsWith('comb') ? 'C' : 'D'}${node.name.endsWith('rep') ? "'" : ''}_{${inner.replace(', ', ',')}}`
      break
    case 'normq':
      out = `\\Phi^{-1}${paren(inner)}`
      break
    default: {
      const head = fnName(node.name) + (node.base ? `_{${toLatex(node.base)}}` : '') + (pow ? `^{${toLatex(pow)}}` : '')
      // Le funzioni della statistica con le parentesi, anche attorno a una lettera: \operatorname{media}(x).
      if (arg && isAtom(arg) && !STATISTICS_NAMES.has(node.name)) return `${head} ${toLatex(arg)}`
      // \ln|x|, come si scrive: il valore assoluto ha già le sue sbarre.
      if (arg && arg.k === 'abs') return `${head}${inner}`
      return `${head}${paren(inner)}`
    }
  }
  return pow ? `${paren(out)}^{${toLatex(pow)}}` : out
}
