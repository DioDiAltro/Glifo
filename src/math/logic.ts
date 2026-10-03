/**
 * La logica delle proposizioni: la tavola di verità di una formula (\operatorname{verità}(p \land q
 * \Rightarrow r) =, o la formula con i connettivi e «=»), con le colonne delle sottoformule, e se è una
 * tautologia o una contraddizione; le forme normali canoniche (\operatorname{fnd}, \operatorname{fnc}).
 * Si scrive con \neg, \land, \lor, \oplus (o \veebar), \Rightarrow, \Leftrightarrow, \uparrow (NAND),
 * \downarrow (NOR), \top e \bot; anche come nell'algebra di Boole: A + B, AB, \overline{A}, A'.
 */
import type { FormattedResult } from './format'

type BinOp = 'and' | 'or' | 'xor' | 'imp' | 'iff' | 'nand' | 'nor'

export type Formula =
  | { t: 'var'; name: string; tex: string }
  | { t: 'const'; v: boolean }
  | { t: 'not'; a: Formula }
  | { t: 'bin'; op: BinOp; a: Formula; b: Formula }

type Tok = { k: 'var'; name: string; tex: string } | { k: 'const'; v: boolean } | { k: 'not' } | { k: 'post' } | { k: 'op'; op: BinOp } | { k: 'open' } | { k: 'close' }

class LogicError extends Error {}

const GREEK: Record<string, string> = {
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', varphi: 'φ', phi: 'φ', psi: 'ψ', chi: 'χ', theta: 'θ', sigma: 'σ', tau: 'τ', omega: 'ω',
}

const COMMANDS: Record<string, Tok> = {
  neg: { k: 'not' }, lnot: { k: 'not' }, sim: { k: 'not' },
  land: { k: 'op', op: 'and' }, wedge: { k: 'op', op: 'and' }, '&': { k: 'op', op: 'and' }, cdot: { k: 'op', op: 'and' },
  lor: { k: 'op', op: 'or' }, vee: { k: 'op', op: 'or' },
  oplus: { k: 'op', op: 'xor' }, veebar: { k: 'op', op: 'xor' }, nleftrightarrow: { k: 'op', op: 'xor' }, not: { k: 'op', op: 'xor' },
  Rightarrow: { k: 'op', op: 'imp' }, implies: { k: 'op', op: 'imp' }, rightarrow: { k: 'op', op: 'imp' }, to: { k: 'op', op: 'imp' },
  Longrightarrow: { k: 'op', op: 'imp' }, longrightarrow: { k: 'op', op: 'imp' }, supset: { k: 'op', op: 'imp' },
  Leftrightarrow: { k: 'op', op: 'iff' }, iff: { k: 'op', op: 'iff' }, leftrightarrow: { k: 'op', op: 'iff' },
  Longleftrightarrow: { k: 'op', op: 'iff' }, longleftrightarrow: { k: 'op', op: 'iff' }, equiv: { k: 'op', op: 'iff' },
  uparrow: { k: 'op', op: 'nand' }, barwedge: { k: 'op', op: 'nand' }, downarrow: { k: 'op', op: 'nor' },
  top: { k: 'const', v: true }, bot: { k: 'const', v: false },
}

const CHARS: Record<string, Tok> = {
  '¬': { k: 'not' }, '!': { k: 'not' }, '~': { k: 'not' },
  '∧': { k: 'op', op: 'and' }, '·': { k: 'op', op: 'and' }, '*': { k: 'op', op: 'and' },
  '∨': { k: 'op', op: 'or' }, '+': { k: 'op', op: 'or' },
  '⊕': { k: 'op', op: 'xor' }, '⊻': { k: 'op', op: 'xor' },
  '⇒': { k: 'op', op: 'imp' }, '→': { k: 'op', op: 'imp' },
  '⇔': { k: 'op', op: 'iff' }, '↔': { k: 'op', op: 'iff' }, '≡': { k: 'op', op: 'iff' },
  '↑': { k: 'op', op: 'nand' }, '↓': { k: 'op', op: 'nor' },
  '⊤': { k: 'const', v: true }, '⊥': { k: 'const', v: false },
  '0': { k: 'const', v: false }, '1': { k: 'const', v: true },
  '(': { k: 'open' }, '[': { k: 'open' }, ')': { k: 'close' }, ']': { k: 'close' },
  "'": { k: 'post' },
}

/** Il testo tra graffe che inizia in `i` (subito dopo la graffa aperta): il contenuto e dove finisce. */
function braced(src: string, i: number): { text: string; end: number } {
  let depth = 1
  for (let j = i; j < src.length; j++) {
    if (src[j] === '\\') {
      j++
      continue
    }
    if (src[j] === '{') depth++
    else if (src[j] === '}' && --depth === 0) return { text: src.slice(i, j), end: j + 1 }
  }
  throw new LogicError('Manca una graffa }')
}

function tokens(src: string): Tok[] {
  const out: Tok[] = []
  let i = 0
  while (i < src.length) {
    const c = src[i]
    if (/\s/.test(c)) {
      i++
      continue
    }
    if (c === '\\') {
      const m = /^\\([A-Za-z]+|.)/.exec(src.slice(i))
      if (!m) throw new LogicError('Comando non valido')
      const name = m[1]
      i += m[0].length
      if (/^[,;:! ]$/.test(name) || /^(q?quad|left|right|[bB]igg?[lr]?|displaystyle|mathrm|mathbf|mathit)$/.test(name)) {
        // \left( e \big(: conta la parentesi; \mathrm{V}: conta quello dentro.
        if (/^(mathrm|mathbf|mathit)$/.test(name) && src[i] === '{') {
          const arg = braced(src, i + 1)
          i = arg.end
          out.push(...textToken(arg.text))
        }
        if (name === 'left' || name === 'right') {
          while (src[i] === ' ') i++
          if (src[i] === '.') i++
        }
        continue
      }
      if (name === '{' || name === '}') {
        out.push({ k: name === '{' ? 'open' : 'close' })
        continue
      }
      if (name === 'text' || name === 'textrm' || name === 'mbox' || name === 'operatorname') {
        if (src[i] !== '{') throw new LogicError(`Dopo \\${name} va il testo tra graffe`)
        const arg = braced(src, i + 1)
        i = arg.end
        out.push(...textToken(arg.text))
        continue
      }
      if (name === 'overline' || name === 'bar') {
        // \overline{A \land B}: la negazione di tutto quello che c'è sotto.
        while (src[i] === ' ') i++
        const arg = src[i] === '{' ? braced(src, i + 1) : { text: src[i] ?? '', end: i + 1 }
        i = arg.end
        out.push({ k: 'not' }, { k: 'open' }, ...tokens(arg.text), { k: 'close' })
        continue
      }
      if (name in GREEK) {
        out.push(variable(GREEK[name], `\\${name}`, src, i, (end) => (i = end)))
        continue
      }
      const tok = COMMANDS[name]
      if (!tok) throw new LogicError(`\\${name} non è un connettivo`)
      // \not\equiv: lo xor.
      if (name === 'not') {
        const next = /^\s*\\(equiv|Leftrightarrow|leftrightarrow|iff)\b/.exec(src.slice(i))
        if (!next) throw new LogicError('\\not va prima di \\equiv o \\Leftrightarrow')
        i += next[0].length
      }
      out.push(tok)
      continue
    }
    if (/[A-Za-z]/.test(c)) {
      i++
      out.push(variable(c, c, src, i, (end) => (i = end)))
      continue
    }
    const tok = CHARS[c]
    if (!tok) throw new LogicError(`«${c}» non è un connettivo`)
    out.push(tok)
    i++
  }
  return out
}

/** Una lettera con l'indice, se c'è: p_1, p_{12}. */
function variable(letter: string, tex: string, src: string, i: number, moveTo: (end: number) => void): Tok {
  const m = /^_(\{\s*([A-Za-z0-9]+)\s*\}|([A-Za-z0-9]))/.exec(src.slice(i))
  if (!m) return { k: 'var', name: letter, tex }
  moveTo(i + m[0].length)
  const index = m[2] ?? m[3]
  return { k: 'var', name: `${letter}_${index}`, tex: `${tex}_{${index}}` }
}

/** \text{V}, \mathrm{F}, \text{ e }, \text{non}: i valori e i connettivi scritti a parole. */
function textToken(text: string): Tok[] {
  const t = text.trim().toLowerCase()
  if (t === 'v' || t === 'vero' || t === 't' || t === 'true') return [{ k: 'const', v: true }]
  if (t === 'f' || t === 'falso' || t === 'false') return [{ k: 'const', v: false }]
  if (t === 'e' || t === 'and' || t === 'et') return [{ k: 'op', op: 'and' }]
  if (t === 'o' || t === 'or' || t === 'vel') return [{ k: 'op', op: 'or' }]
  if (t === 'non' || t === 'not') return [{ k: 'not' }]
  if (t === 'aut' || t === 'xor') return [{ k: 'op', op: 'xor' }]
  if (t === 'nand') return [{ k: 'op', op: 'nand' }]
  if (t === 'nor') return [{ k: 'op', op: 'nor' }]
  if (/^[a-z]$/i.test(text.trim())) return [{ k: 'var', name: text.trim(), tex: `\\text{${text.trim()}}` }]
  throw new LogicError(`«${text.trim()}» non è un connettivo`)
}

class Parser {
  private i = 0
  constructor(private readonly toks: Tok[]) {}

  private peek(): Tok | undefined {
    return this.toks[this.i]
  }

  private isOp(...ops: BinOp[]): BinOp | null {
    const t = this.peek()
    return t?.k === 'op' && ops.includes(t.op) ? t.op : null
  }

  parse(): Formula {
    if (!this.toks.length) throw new LogicError('La formula è vuota')
    const f = this.iff()
    if (this.i < this.toks.length) throw new LogicError(this.peek()!.k === 'close' ? 'Una parentesi chiusa di troppo' : 'Manca un connettivo')
    return f
  }

  private iff(): Formula {
    let f = this.imp()
    for (let op; (op = this.isOp('iff')); ) {
      this.i++
      f = { t: 'bin', op, a: f, b: this.imp() }
    }
    return f
  }

  /** p ⇒ q ⇒ r si legge p ⇒ (q ⇒ r). */
  private imp(): Formula {
    const f = this.or()
    if (!this.isOp('imp')) return f
    this.i++
    return { t: 'bin', op: 'imp', a: f, b: this.imp() }
  }

  private or(): Formula {
    let f = this.and()
    for (let op; (op = this.isOp('or', 'xor', 'nor')); ) {
      this.i++
      f = { t: 'bin', op, a: f, b: this.and() }
    }
    return f
  }

  private and(): Formula {
    let f = this.unary()
    for (;;) {
      const op = this.isOp('and', 'nand')
      if (op) {
        this.i++
        f = { t: 'bin', op, a: f, b: this.unary() }
        continue
      }
      // AB: le lettere attaccate sono un «e», come nell'algebra di Boole.
      const t = this.peek()
      if (t && (t.k === 'var' || t.k === 'const' || t.k === 'not' || t.k === 'open')) {
        f = { t: 'bin', op: 'and', a: f, b: this.unary() }
        continue
      }
      return f
    }
  }

  private unary(): Formula {
    const t = this.peek()
    if (!t) throw new LogicError('La formula finisce a metà')
    if (t.k === 'not') {
      this.i++
      return { t: 'not', a: this.unary() }
    }
    let f: Formula
    if (t.k === 'var') {
      this.i++
      f = { t: 'var', name: t.name, tex: t.tex }
    } else if (t.k === 'const') {
      this.i++
      f = { t: 'const', v: t.v }
    } else if (t.k === 'open') {
      this.i++
      f = this.iff()
      if (this.peek()?.k !== 'close') throw new LogicError('Manca la parentesi che chiude')
      this.i++
    } else throw new LogicError('Manca una lettera o una parentesi')
    // A': la negazione, come nell'algebra di Boole.
    while (this.peek()?.k === 'post') {
      this.i++
      f = { t: 'not', a: f }
    }
    return f
  }
}

export function parseLogic(src: string): Formula {
  return new Parser(tokens(src)).parse()
}

function value(f: Formula, at: ReadonlyMap<string, boolean>): boolean {
  switch (f.t) {
    case 'var':
      return at.get(f.name)!
    case 'const':
      return f.v
    case 'not':
      return !value(f.a, at)
    case 'bin': {
      const a = value(f.a, at)
      const b = value(f.b, at)
      switch (f.op) {
        case 'and':
          return a && b
        case 'or':
          return a || b
        case 'xor':
          return a !== b
        case 'imp':
          return !a || b
        case 'iff':
          return a === b
        case 'nand':
          return !(a && b)
        case 'nor':
          return !(a || b)
      }
    }
  }
}

const OP_TEX: Record<BinOp, string> = { and: '\\land', or: '\\lor', xor: '\\oplus', imp: '\\Rightarrow', iff: '\\Leftrightarrow', nand: '\\uparrow', nor: '\\downarrow' }
const OP_TEXT: Record<BinOp, string> = { and: '∧', or: '∨', xor: '⊕', imp: '⇒', iff: '⇔', nand: '↑', nor: '↓' }
const LEVEL: Record<BinOp, number> = { iff: 1, imp: 2, or: 3, xor: 3, nor: 3, and: 4, nand: 4 }

/** La formula riscritta, con le parentesi che servono (p ∧ q ⇒ r, ¬(p ∨ q)). */
function shown(f: Formula, text: boolean): string {
  switch (f.t) {
    case 'var':
      return text ? f.name.replace(/_(.+)$/, (_, i: string) => [...i].map((d) => '₀₁₂₃₄₅₆₇₈₉'[Number(d)] ?? d).join('')) : f.tex
    case 'const':
      return text ? (f.v ? '⊤' : '⊥') : f.v ? '\\top' : '\\bot'
    case 'not': {
      const inner = shown(f.a, text)
      const simple = f.a.t === 'var' || f.a.t === 'const' || f.a.t === 'not'
      return `${text ? '¬' : '\\lnot '}${simple ? inner : `(${inner})`}`
    }
    case 'bin': {
      const side = (g: Formula, right: boolean) => {
        const s = shown(g, text)
        if (g.t !== 'bin') return s
        const tight = LEVEL[g.op] > LEVEL[f.op] || (LEVEL[g.op] === LEVEL[f.op] && g.op === f.op && !right && (f.op === 'and' || f.op === 'or' || f.op === 'xor' || f.op === 'iff'))
        const chain = LEVEL[g.op] === LEVEL[f.op] && g.op === f.op && right && (f.op === 'and' || f.op === 'or' || f.op === 'xor')
        return tight || chain ? s : `(${s})`
      }
      return `${side(f.a, false)} ${text ? OP_TEXT[f.op] : OP_TEX[f.op]} ${side(f.b, true)}`
    }
  }
}

function variables(f: Formula, out = new Set<string>()): Set<string> {
  if (f.t === 'var') out.add(f.name)
  else if (f.t === 'not') variables(f.a, out)
  else if (f.t === 'bin') {
    variables(f.a, out)
    variables(f.b, out)
  }
  return out
}

/** Le sottoformule con un connettivo, dalle più interne, senza doppioni. */
function parts(f: Formula, out: Formula[] = [], seen = new Set<string>()): Formula[] {
  if (f.t === 'not') parts(f.a, out, seen)
  else if (f.t === 'bin') {
    parts(f.a, out, seen)
    parts(f.b, out, seen)
  } else return out
  const k = shown(f, true)
  if (!seen.has(k)) {
    seen.add(k)
    out.push(f)
  }
  return out
}

/** p, q, r in ordine (con gli indici in ordine di numero: p_2 prima di p_10). */
function sortedNames(f: Formula): string[] {
  return [...variables(f)].sort((a, b) => a.localeCompare(b, 'it', { numeric: true }))
}

function texOfVar(f: Formula, name: string): string {
  if (f.t === 'var') return f.name === name ? f.tex : ''
  if (f.t === 'not') return texOfVar(f.a, name)
  if (f.t === 'bin') return texOfVar(f.a, name) || texOfVar(f.b, name)
  return ''
}

/** Le righe della tavola: la prima con tutto vero (V V, V F, F V, F F). */
function rows(names: string[]): Map<string, boolean>[] {
  const n = names.length
  return Array.from({ length: 2 ** n }, (_, r) => new Map(names.map((name, j) => [name, ((r >> (n - 1 - j)) & 1) === 0])))
}

const MOST_VARIABLES = 6
const MOST_COLUMNS = 9

const cell = (v: boolean, bold = false) => (bold ? (v ? '\\mathbf{V}' : '\\mathbf{F}') : v ? '\\mathrm{V}' : '\\mathrm{F}')

/** La tavola di verità, con la colonna di ogni sottoformula se non sono troppe, e cosa è la formula. */
export function truthTable(f: Formula): FormattedResult {
  const names = sortedNames(f)
  if (names.length > MOST_VARIABLES) throw new LogicError(`Con ${names.length} lettere la tavola avrebbe ${2 ** names.length} righe: troppe`)
  const all = rows(names)
  let columns = parts(f)
  if (names.length + columns.length > MOST_COLUMNS) columns = [f]
  if (!columns.length) columns = [f]
  const final = all.map((at) => value(f, at))
  const trueCount = final.filter(Boolean).length
  const verdict =
    trueCount === all.length
      ? f.t === 'bin' && f.op === 'iff'
        ? 'tautologia: le due formule sono equivalenti'
        : f.t === 'bin' && f.op === 'imp'
          ? 'tautologia: la conclusione segue dalle premesse'
          : 'tautologia (sempre vera)'
      : trueCount === 0
        ? 'contraddizione (sempre falsa)'
        : `vera in ${trueCount} ${trueCount === 1 ? 'caso' : 'casi'} su ${all.length}`
  const head = [...names.map((n) => texOfVar(f, n)), ...columns.map((c) => shown(c, false))].join(' & ')
  const body = all.map((at) => [...names.map((n) => cell(at.get(n)!)), ...columns.map((c, k) => cell(value(c, at), k === columns.length - 1))].join(' & ')).join(' \\\\ ')
  const table = `\\begin{array}{${'c'.repeat(names.length)}${names.length ? '|' : ''}${'c'.repeat(columns.length)}} ${head} \\\\ \\hline ${body} \\end{array}`
  return {
    tex: `\\begin{array}{l} ${table} \\\\[0.4em] \\text{${verdict}} \\end{array}`,
    text: `${verdict}; ${shown(f, true)}: ${final.map((v) => (v ? 'V' : 'F')).join(' ')}`,
    rich: true,
  }
}

/** La forma normale canonica: disgiuntiva (le righe vere) o congiuntiva (le righe false). */
export function normalForm(f: Formula, disjunctive: boolean): FormattedResult {
  const names = sortedNames(f)
  if (names.length > MOST_VARIABLES) throw new LogicError('Troppe lettere')
  const picked = rows(names).filter((at) => value(f, at) === disjunctive)
  const literal = (name: string, v: boolean, text: boolean) => {
    const tex = text ? shown({ t: 'var', name, tex: '' }, true) : texOfVar(f, name)
    return v ? tex : `${text ? '¬' : '\\lnot '}${tex}`
  }
  const clause = (at: Map<string, boolean>, text: boolean) => {
    const lits = names.map((n) => literal(n, disjunctive ? at.get(n)! : !at.get(n)!, text))
    const op = disjunctive ? (text ? ' ∧ ' : ' \\land ') : text ? ' ∨ ' : ' \\lor '
    return lits.length > 1 && picked.length > 1 ? `(${lits.join(op)})` : lits.join(op)
  }
  if (!picked.length || !names.length) {
    // Sempre falsa (per la disgiuntiva) o sempre vera (per la congiuntiva): ⊥ o ⊤.
    const v = picked.length ? disjunctive : !disjunctive
    return { tex: v ? '\\top' : '\\bot', text: v ? '⊤ (sempre vera)' : '⊥ (sempre falsa)' }
  }
  const join = disjunctive ? [' \\lor ', ' ∨ '] : [' \\land ', ' ∧ ']
  return { tex: picked.map((at) => clause(at, false)).join(join[0]), text: picked.map((at) => clause(at, true)).join(join[1]), rich: true }
}

/** Il testo tra le parentesi che si aprono in `i` (anche \left( … \right)), e dove finisce. */
function parenthesized(src: string, i: number): { text: string; end: number } | null {
  const open = /^\s*(\\left\s*)?\(/.exec(src.slice(i))
  if (!open) return null
  const start = i + open[0].length
  let depth = 1
  for (let j = start; j < src.length; j++) {
    if (src[j] === '\\') {
      j++
      continue
    }
    if (src[j] === '(') depth++
    else if (src[j] === ')' && --depth === 0) {
      const text = src.slice(start, j).replace(/\\right\s*$/, '')
      return { text, end: j + 1 }
    }
  }
  return null
}

const REQUEST = /^\s*\\operatorname\*?\{\s*(verit(?:a|à|\\`a|\\`\{a\})|tavola|fnd|fnc|dnf|cnf)\s*\}/

/** I connettivi che dicono che una formula è di logica: senza, «x \to 0» non è una tavola di verità. */
const CONNECTIVE = /\\(neg|lnot|land|lor|wedge|vee|oplus|veebar|Leftrightarrow|iff|Rightarrow|implies|uparrow|downarrow|top|bot)(?![A-Za-z])|[¬∧∨⊕⊻⇔⇒↔]/

/**
 * Una richiesta di logica (quello che c'è prima di «=»): \operatorname{verità}(…), \operatorname{fnd}(…),
 * \operatorname{fnc}(…), o una formula con i connettivi (p \land q \Rightarrow p). Null se è altro.
 */
export function logicShown(src: string): FormattedResult | null {
  const request = REQUEST.exec(src)
  let body: string
  let kind = 'table'
  if (request) {
    const inner = parenthesized(src, request[0].length)
    if (!inner || src.slice(inner.end).trim()) return null
    body = inner.text
    const name = request[1]
    kind = name === 'fnd' || name === 'dnf' ? 'dnf' : name === 'fnc' || name === 'cnf' ? 'cnf' : 'table'
  } else {
    if (!CONNECTIVE.test(src)) return null
    body = src
  }
  let f: Formula
  try {
    f = parseLogic(body)
  } catch {
    return null
  }
  // Senza la richiesta, solo le formule con le lettere (non «2 \Rightarrow 1»).
  if (!request && !variables(f).size) return null
  try {
    return kind === 'table' ? truthTable(f) : normalForm(f, kind === 'dnf')
  } catch {
    return null
  }
}
