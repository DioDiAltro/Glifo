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

export function nameLatex(name: string): string {
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
    case 'mint':
      return 1.8
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
    case 'neg':
      return `-${wrap(node.a, 2)}`
    case 'bin': {
      switch (node.op) {
        case '+':
          return `${toLatex(node.a)} + ${wrap(node.b, 1.6)}`
        case '-':
          return `${toLatex(node.a)} - ${wrap(node.b, 1.6)}`
        case '*': {
          const a = wrap(node.a, 1.9)
          const b = wrap(node.b, 2)
          if (node.cross) return `${a} \\times ${b}`
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
    case 'mint': {
      const symbol = node.vars.length === 2 ? '\\iint' : '\\iiint'
      return `${symbol}_{${domainLatex(node.domain)}} ${wrap(node.body, 1.5)} \\, ${node.vars.map((v) => `d${nameLatex(v)}`).join(' \\, ')}`
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
  }
  return ''
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
    case 'dot':
      out = `\\langle ${args.map(toLatex).join(', ')} \\rangle`
      break
    case 'floor':
      out = `\\left\\lfloor ${inner}\\right\\rfloor`
      break
    case 'ceil':
      out = `\\left\\lceil ${inner}\\right\\rceil`
      break
    default: {
      const head = fnName(node.name) + (node.base ? `_{${toLatex(node.base)}}` : '') + (pow ? `^{${toLatex(pow)}}` : '')
      if (arg && isAtom(arg)) return `${head} ${toLatex(arg)}`
      return `${head}${paren(inner)}`
    }
  }
  return pow ? `${paren(out)}^{${toLatex(pow)}}` : out
}
