/**
 * I testi scelti da chi scrive per un grafico (il titolo, i nomi degli assi), con le formule tra `$`:
 * nell'anteprima in HTML con KaTeX; nei disegni e nelle immagini che escono da Glifo come testo SVG
 * (`<tspan>`), che si legge anche in Word, nelle slide e in Inkscape, dove MathML e KaTeX non ci
 * sono. Le formule diventano testo: le lettere in corsivo, numeri e simboli dritti, esponenti e pedici
 * più piccoli, sopra e sotto, le frazioni come a/b. Basta per i nomi degli assi, il titolo e la legenda.
 */
import { escapeHtml, renderTex } from '../render/katex'

/** Un pezzo di testo con lo stesso aspetto: `scale` rispetto al carattere, `rise` in em (più su se positivo). */
interface Run {
  text: string
  italic: boolean
  scale: number
  rise: number
}

const GREEK: Record<string, string> = {
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ϵ', varepsilon: 'ε', zeta: 'ζ', eta: 'η', theta: 'θ',
  vartheta: 'ϑ', iota: 'ι', kappa: 'κ', lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ', pi: 'π', varpi: 'ϖ', rho: 'ρ',
  varrho: 'ϱ', sigma: 'σ', varsigma: 'ς', tau: 'τ', upsilon: 'υ', phi: 'ϕ', varphi: 'φ', chi: 'χ', psi: 'ψ',
  omega: 'ω', Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ', Pi: 'Π', Sigma: 'Σ', Upsilon: 'Υ',
  Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
}

/** I simboli che separano (+, =, ≤, →…): con uno spazio prima e dopo. */
const RELATIONS: Record<string, string> = {
  pm: '±', mp: '∓', cdot: '·', times: '×', div: '÷', le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠',
  approx: '≈', equiv: '≡', sim: '∼', simeq: '≃', cong: '≅', propto: '∝', to: '→', rightarrow: '→', leftarrow: '←',
  Rightarrow: '⇒', Leftarrow: '⇐', Leftrightarrow: '⇔', iff: '⇔', implies: '⇒', mapsto: '↦', in: '∈', notin: '∉',
  subset: '⊂', subseteq: '⊆', supset: '⊃', supseteq: '⊇', cup: '∪', cap: '∩', setminus: '∖', land: '∧', lor: '∨',
  wedge: '∧', vee: '∨', perp: '⊥', parallel: '∥', mid: '|', oplus: '⊕', otimes: '⊗', circ: '∘',
}

const SYMBOLS: Record<string, string> = {
  infty: '∞', partial: '∂', nabla: '∇', int: '∫', iint: '∬', iiint: '∭', oint: '∮', sum: '∑', prod: '∏',
  emptyset: '∅', varnothing: '∅', forall: '∀', exists: '∃', neg: '¬', lnot: '¬', ldots: '…', cdots: '⋯', dots: '…',
  prime: '′', angle: '∠', triangle: '△', degree: '°', ell: 'ℓ', hbar: 'ℏ', langle: '⟨', rangle: '⟩', lfloor: '⌊',
  rfloor: '⌋', lceil: '⌈', rceil: '⌉', vert: '|', Vert: '‖', lvert: '|', rvert: '|', star: '⋆', ast: '∗', bullet: '•',
  '{': '{', '}': '}', '%': '%', '&': '&', '#': '#', _: '_', $: '$', '|': '‖',
}

/** Le funzioni scritte dritte (sin, ln, lim). */
const FUNCTIONS = new Set([
  'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh', 'ln', 'log', 'lg',
  'exp', 'lim', 'max', 'min', 'sup', 'inf', 'det', 'dim', 'ker', 'deg', 'gcd', 'arg', 'Pr', 'sgn', 'tg', 'arctg',
  'sen', 'Re', 'Im',
])

const SPACES: Record<string, string> = { ',': ' ', ';': ' ', ':': ' ', '!': '', ' ': ' ', quad: ' ', qquad: '  ' }

const BLACKBOARD: Record<string, string> = { R: 'ℝ', N: 'ℕ', Z: 'ℤ', Q: 'ℚ', C: 'ℂ', P: 'ℙ' }
const CALLIGRAPHIC: Record<string, string> = { L: 'ℒ', F: 'ℱ', P: '𝒫', A: '𝒜', B: 'ℬ', C: '𝒞', E: 'ℰ', H: 'ℋ', M: 'ℳ', R: 'ℛ' }

/** I segni sopra le lettere, come caratteri che si combinano con quello prima. */
const ACCENTS: Record<string, string> = {
  vec: '⃗', overrightarrow: '⃗', bar: '̄', overline: '̅', hat: '̂', widehat: '̂',
  tilde: '̃', widetilde: '̃', dot: '̇', ddot: '̈', check: '̌', breve: '̆',
}

/** Dove si chiude la graffa aperta in `open`. */
function closing(src: string, open: number): number {
  let depth = 0
  for (let i = open; i < src.length; i++) {
    if (src[i] === '\\') {
      i++
      continue
    }
    if (src[i] === '{') depth++
    else if (src[i] === '}' && --depth === 0) return i
  }
  return src.length
}

/** Una formula LaTeX come pezzi di testo (vedi Run), in `out`. */
function convert(src: string, scale: number, rise: number, out: Run[], italic = true): void {
  let i = 0
  const push = (text: string, slanted = false) => {
    if (text) out.push({ text, italic: slanted, scale, rise })
  }
  /** Un simbolo tra due cose (a + b): con gli spazi; all'inizio (−1) senza. */
  const operator = (sign: string) => {
    const before = out.length && out[out.length - 1].rise === rise && !/[\s(\[{⟨|]$/.test(out[out.length - 1].text)
    push(before ? ` ${sign} ` : sign)
  }
  /** L'argomento che viene: tra graffe, un comando o un carattere. */
  const argument = (): string => {
    while (src[i] === ' ') i++
    if (src[i] === '{') {
      const end = closing(src, i)
      const group = src.slice(i + 1, end)
      i = end + 1
      return group
    }
    if (src[i] === '\\') {
      const m = /^\\([a-zA-Z]+|.)/.exec(src.slice(i))
      i += m ? m[0].length : 1
      return m ? m[0] : ''
    }
    return src[i++] ?? ''
  }
  /** Un gruppo come testo semplice (per \text, gli accenti, \mathbb). */
  const plain = (group: string): string => {
    const runs: Run[] = []
    convert(group, scale, rise, runs, false)
    return runs.map((r) => r.text).join('')
  }
  /** Tra parentesi se è più di una cosa (in a/b e √). */
  const wrapped = (group: string) => {
    const runs: Run[] = []
    convert(group, scale, rise, runs, italic)
    const text = runs.map((r) => r.text).join('')
    const single = [...text.trim()].length <= 1 || /^[\d,.]+$/.test(text.trim())
    if (!single) push('(')
    out.push(...runs)
    if (!single) push(')')
  }
  while (i < src.length) {
    const c = src[i]
    if (c === '\\') {
      const m = /^\\([a-zA-Z]+|.)/.exec(src.slice(i))
      const name = m ? m[1] : ''
      i += m ? m[0].length : 1
      if (name in GREEK) push(GREEK[name], italic && /^[a-z]/.test(name))
      else if (name === 'frac' || name === 'dfrac' || name === 'tfrac') {
        const a = argument()
        const b = argument()
        wrapped(a)
        push('/')
        wrapped(b)
      } else if (name === 'sqrt') {
        let index = ''
        if (src[i] === '[') {
          const end = src.indexOf(']', i)
          index = src.slice(i + 1, end < 0 ? src.length : end)
          i = end < 0 ? src.length : end + 1
        }
        push(index === '3' ? '∛' : index === '4' ? '∜' : '√')
        wrapped(argument())
      } else if (['text', 'textrm', 'mathrm', 'operatorname', 'mathbf', 'textbf', 'mathsf', 'textit'].includes(name)) push(plain(argument()), name === 'textit')
      else if (name === 'mathit') push(plain(argument()), true)
      else if (name === 'mathbb') push([...plain(argument())].map((ch) => BLACKBOARD[ch] ?? ch).join(''))
      else if (name === 'mathcal' || name === 'mathscr') push([...plain(argument())].map((ch) => CALLIGRAPHIC[ch] ?? ch).join(''))
      else if (name in ACCENTS) {
        const group = argument()
        const runs: Run[] = []
        convert(group, scale, rise, runs, italic)
        // Il segno su ogni lettera (\overline{AB}: tutte e due); \vec e \hat solo sull'ultima.
        const each = name === 'overline' || name === 'bar'
        runs.forEach((r, k) => (r.text = each ? [...r.text].map((ch) => ch + ACCENTS[name]).join('') : k === runs.length - 1 ? r.text + ACCENTS[name] : r.text))
        out.push(...runs)
      } else if (name === 'left' || name === 'right' || /^[Bb]igg?[lr]?$/.test(name)) {
        while (src[i] === ' ') i++
        const d = /^\\([a-zA-Z]+|.)|^./.exec(src.slice(i))
        if (d) {
          i += d[0].length
          const delimiter = d[1] !== undefined ? (SYMBOLS[d[1]] ?? (d[1] === '{' || d[1] === '}' ? d[1] : '')) : d[0]
          if (delimiter !== '.') push(delimiter)
        }
      } else if (name in SPACES) push(SPACES[name])
      else if (FUNCTIONS.has(name)) push(out.length && !/\s$/.test(out[out.length - 1].text) && out[out.length - 1].rise === rise ? ` ${name} ` : `${name} `)
      else if (name in RELATIONS) operator(RELATIONS[name])
      else if (name in SYMBOLS) push(SYMBOLS[name])
      else if (name === '\\') push(' ')
      else push(name)
      continue
    }
    if (c === '^' || c === '_') {
      i++
      const group = argument()
      // 30^\circ: i gradi, alla stessa altezza; f^\prime: l'apice.
      if (c === '^' && (group === '\\circ' || group === '\\degree')) push('°')
      else if (c === '^' && group === '\\prime') push('′')
      else convert(group, scale * 0.72, rise + (c === '^' ? 0.42 : -0.24) * scale, out, italic)
      continue
    }
    if (c === '{') {
      const end = closing(src, i)
      convert(src.slice(i + 1, end), scale, rise, out, italic)
      i = end + 1
      continue
    }
    i++
    if (c === '}' || c === '&') continue
    if (c === ' ' || c === '\n' || c === '\t') {
      if (!italic) push(' ')
      continue
    }
    if (c === '~') push(' ')
    else if (c === '-') operator('−')
    else if (c === '+' || c === '=' || c === '<' || c === '>') operator(c)
    else if (c === "'") push('′')
    else if (/[A-Za-z]/.test(c)) push(c, italic)
    else push(c)
  }
}

/** I pezzi uguali uno dopo l'altro, uniti. */
function merge(runs: Run[]): Run[] {
  const out: Run[] = []
  for (const r of runs) {
    const last = out[out.length - 1]
    if (last && last.italic === r.italic && last.scale === r.scale && last.rise === r.rise) last.text += r.text
    else out.push({ ...r })
  }
  return out
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** I pezzi come <tspan> da mettere in un <text> SVG con il carattere di `size` pixel. */
function runsSvg(runs: Run[], size: number): string {
  let rise = 0
  let out = ''
  for (const r of merge(runs)) {
    const attrs: string[] = []
    if (r.rise !== rise) attrs.push(`dy="${((rise - r.rise) * size).toFixed(1)}"`)
    if (r.scale !== 1) attrs.push(`font-size="${(r.scale * size).toFixed(1)}"`)
    if (r.italic) attrs.push('font-style="italic"')
    out += `<tspan${attrs.length ? ' ' + attrs.join(' ') : ''}>${escapeXml(r.text)}</tspan>`
    rise = r.rise
  }
  return out
}

/** La larghezza che avrà (circa), in pixel, con il carattere di `size` pixel. */
function runsWidth(runs: Run[], size: number): number {
  return runs.reduce((w, r) => w + [...r.text].length * 0.55 * size * r.scale, 0)
}

/** Una formula LaTeX come testo SVG (<tspan>), e quanto è larga (circa). */
export function texSvg(tex: string, size: number): { svg: string; width: number } {
  const runs: Run[] = []
  convert(tex, 1, 0, runs)
  return { svg: runsSvg(runs, size), width: runsWidth(runs, size) }
}

/** Il testo diviso nelle formule tra $ e nel resto. */
function parts(text: string): { math: boolean; text: string }[] {
  const out: { math: boolean; text: string }[] = []
  const re = /\$([^$]*)\$/g
  let pos = 0
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (m.index > pos) out.push({ math: false, text: text.slice(pos, m.index) })
    out.push({ math: true, text: m[1] })
    pos = m.index + m[0].length
  }
  if (pos < text.length) out.push({ math: false, text: text.slice(pos) })
  return out
}

/**
 * Un testo scelto da chi scrive (`tempo $t$ (s)`) come testo SVG: le formule tra $ come in `texSvg`,
 * il resto dritto; una lettera da sola (`asse x: t`) è una formula, in corsivo.
 */
export function labelSvg(text: string, size: number): { svg: string; width: number } {
  const runs: Run[] = []
  for (const p of parts(text.trim())) {
    if (p.math || /^[A-Za-z]$/.test(p.text.trim())) convert(p.text.trim(), 1, 0, runs)
    else runs.push({ text: p.text, italic: false, scale: 1, rise: 0 })
  }
  return { svg: runsSvg(runs, size), width: runsWidth(runs, size) }
}

/** Lo stesso testo in HTML, con le formule disegnate da KaTeX (per l'anteprima). */
export function labelHtml(text: string): string {
  return parts(text.trim())
    .map((p) => {
      if (!p.math) return escapeHtml(p.text)
      const { html, error } = renderTex(p.text)
      return error ? escapeHtml(p.text) : html
    })
    .join('')
}

/** Lo stesso testo senza formattazione, da leggere (per chi non vede il disegno). */
export function labelPlain(text: string): string {
  const runs: Run[] = []
  for (const p of parts(text.trim())) {
    if (p.math) convert(p.text, 1, 0, runs)
    else runs.push({ text: p.text, italic: false, scale: 1, rise: 0 })
  }
  return runs.map((r) => r.text).join('').replace(/\s+/g, ' ').trim()
}
