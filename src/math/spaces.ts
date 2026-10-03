/**
 * Gli spazi vettoriali e le matrici, oltre ai conti: diagonalizzare (A = P D P⁻¹, con P ortogonale se A
 * è simmetrica), Gram–Schmidt (le basi ortogonali e ortonormali, con le radici esatte), la segnatura di
 * una forma quadratica (con la regola dei segni di Cartesio sul polinomio caratteristico: per le
 * matrici simmetriche le radici sono tutte reali), la dipendenza lineare tra vettori, il rango di una
 * matrice con un parametro.
 */
import { MathError } from './evaluate'
import { Rational } from './exact'
import { formatNumber, formatRational, type FormatOptions, type FormattedResult } from './format'
import { nameLatex } from './latex'
import { eigenvalues, eigenvectors, EXACT, FLOAT, kernel, rref, splitRoot, surdText, type Eigenvalue, type LinearScope, type LinearValue, type Mat } from './linear'
import { minorsGcd } from './linsys'
import { degree, numericRoots, pvalue, rationalRoots, trim, type Poly } from './polynomial'

const ZERO = Rational.int(0)

type Cell = FormattedResult

function matrixCells(cells: Cell[][]): FormattedResult {
  return {
    tex: `\\begin{pmatrix} ${cells.map((row) => row.map((c) => c.tex).join(' & ')).join(' \\\\ ')} \\end{pmatrix}`,
    text: `(${cells.map((row) => row.map((c) => c.text).join('  ')).join(' ; ')})`,
  }
}

function tupleCells(cells: Cell[]): FormattedResult {
  const sep = cells.some((c) => c.text.includes(',')) ? '; ' : ', '
  return { tex: `\\left(${cells.map((c) => c.tex).join(sep)}\\right)`, text: `(${cells.map((c) => c.text).join(sep)})` }
}

const number = (v: number, options: FormatOptions): Cell => formatNumber(v, { ...options, decimal: true, digits: 9 }) ?? { tex: '\\text{?}', text: '?' }

/** Un vettore con i numeri interi, se si può: (1/2, −1/3) diventa (3, −2). */
function integral(v: Rational[]): Rational[] {
  const gcd = (a: bigint, b: bigint): bigint => {
    if (a < 0n) a = -a
    if (b < 0n) b = -b
    while (b) [a, b] = [b, a % b]
    return a
  }
  const lcm = v.reduce((l, c) => (l * c.d) / gcd(l, c.d), 1n)
  let w = v.map((c) => c.mul(new Rational(lcm)))
  const g = w.reduce((acc, c) => gcd(acc, c.n), 0n)
  if (g > 1n) w = w.map((c) => c.div(new Rational(g)))
  return w
}

/** Il vettore diviso per la sua lunghezza, con le radici esatte: (1, 1)/√2 = (√2/2, √2/2). */
function normalized(v: Rational[]): Cell[] | null {
  const sq = v.reduce((s, c) => s.add(c.mul(c)), ZERO)
  const root = splitRoot(sq)
  if (!root) return null
  // v_i/(k√m) = (v_i/(k m)) √m.
  return v.map((c) => {
    if (root.m === 1n) return formatRational(c.div(root.k), { comma: true, decimal: false })
    return surdText(ZERO, c.div(root.k.mul(new Rational(root.m))), root.m)
  })
}

const dot = (a: Rational[], b: Rational[]) => a.reduce((s, c, i) => s.add(c.mul(b[i])), ZERO)

/** Gram–Schmidt con le frazioni: i vettori ortogonali (quelli che dipendono dai precedenti spariscono). */
export function gramSchmidt(vectors: Rational[][]): { orthogonal: Rational[][]; dropped: number } {
  const out: Rational[][] = []
  let dropped = 0
  for (const v of vectors) {
    let u = [...v]
    for (const w of out) {
      const f = dot(v, w).div(dot(w, w))
      u = u.map((c, i) => c.sub(f.mul(w[i])))
    }
    if (u.every((c) => c.sign === 0)) dropped++
    else out.push(u)
  }
  return { orthogonal: out, dropped }
}

/** Gram–Schmidt per la nota: i vettori ortogonali e, divisi per la lunghezza, quelli ortonormali. */
export function gramSchmidtShown(vectors: Rational[][], options: FormatOptions): FormattedResult {
  const { orthogonal, dropped } = gramSchmidt(vectors)
  if (!orthogonal.length) throw new MathError('Sono tutti vettori nulli')
  const sub = (i: number) => ['₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'][i] ?? String(i + 1)
  const u = orthogonal.map((v, i) => {
    const t = tupleCells(v.map((c) => formatRational(c, options)))
    return { tex: `u_{${i + 1}} = ${t.tex}`, text: `u${sub(i)} = ${t.text}` }
  })
  const e = orthogonal.map((v, i) => {
    const cells = normalized(v)
    if (!cells) return null
    const t = tupleCells(cells)
    return { tex: `e_{${i + 1}} = ${t.tex}`, text: `e${sub(i)} = ${t.text}` }
  })
  const lines = [{ tex: u.map((x) => x.tex).join(',\\ '), text: u.map((x) => x.text).join(', ') }]
  if (e.every((x) => x)) lines.push({ tex: `${e.map((x) => x!.tex).join(',\\ ')}`, text: `ortonormali: ${e.map((x) => x!.text).join(', ')}` })
  if (dropped) lines.push({ tex: `\\text{(${dropped === 1 ? 'un vettore dipende' : `${dropped} vettori dipendono`} dai precedenti)}`, text: `(${dropped === 1 ? 'un vettore dipende' : `${dropped} vettori dipendono`} dai precedenti)` })
  return { tex: `\\begin{array}{l} ${lines.map((l) => l.tex).join(' \\\\ ')} \\end{array}`, text: lines.map((l) => l.text).join('; '), rich: true }
}

/** La matrice è simmetrica? */
function symmetric(m: Mat<Rational>): boolean {
  return m.length === m[0].length && m.every((row, i) => row.every((x, j) => x.cmp(m[j][i]) === 0))
}

/**
 * Diagonalizzare: P (gli autovettori in colonna) e D (gli autovalori), con A = P D P⁻¹; con A simmetrica
 * anche la P ortogonale (le colonne ortonormali). Se non si può, perché: gli autovalori complessi, o un
 * autovalore con meno autovettori della sua molteplicità.
 */
export function diagonalize(scope: LinearScope, A: LinearValue, options: FormatOptions): FormattedResult {
  if (A.float.k !== 'matrix' || A.float.m.length !== A.float.m[0].length) throw new MathError('Si diagonalizzano le matrici quadrate')
  const values = eigenvalues(scope, A)
  const complex = values.filter((e) => Math.abs(e.im) > 1e-9)
  if (complex.length) {
    return { tex: '\\text{non è diagonalizzabile nei reali: ha autovalori complessi}', text: 'non è diagonalizzabile nei reali: ha autovalori complessi' }
  }
  const valueText = (e: Eigenvalue): Cell => (e.exact ? formatRational(e.exact, options) : number(e.re, options))
  const columns: { e: Eigenvalue; vectors: Mat<number>[] | Mat<Rational>[] }[] = values.map((e) => ({ e, vectors: eigenvectors(A, e) }))
  const short = columns.find((c) => c.vectors.length < c.e.multiplicity)
  if (short) {
    const v = valueText(short.e)
    const text = `non è diagonalizzabile: λ = ${v.text} ha molteplicità algebrica ${short.e.multiplicity} e geometrica ${short.vectors.length}`
    return { tex: `\\text{non è diagonalizzabile: } \\lambda = ${v.tex} \\text{ ha molteplicità algebrica ${short.e.multiplicity} e geometrica ${short.vectors.length}}`, text }
  }
  const n = A.float.m.length
  const exact = columns.every((c) => c.e.exact) && !!A.exact
  // Le colonne di P e la diagonale di D, nello stesso ordine.
  const P: Cell[][] = Array.from({ length: n }, () => [])
  const D: Cell[] = []
  const vectors: Rational[][] = []
  for (const { e, vectors: basis } of columns) {
    for (const b of basis) {
      if (exact) {
        const v = integral((b as Mat<Rational>).map((r) => r[0]))
        vectors.push(v)
        v.forEach((c, i) => P[i].push(formatRational(c, options)))
      } else (b as Mat<number>).forEach((r, i) => P[i].push(number(r[0], options)))
      D.push(valueText(e))
    }
  }
  const diag = matrixCells(D.map((d, i) => D.map((_, j) => (i === j ? d : { tex: '0', text: '0' }))))
  const p = matrixCells(P)
  const lines: FormattedResult[] = [{ tex: `P = ${p.tex},\\quad D = ${diag.tex}`, text: `P = ${p.text}, D = ${diag.text}` }]
  // Simmetrica: le colonne si possono prendere ortonormali (P ortogonale, P⁻¹ = Pᵀ).
  if (exact && A.exact?.k === 'matrix' && symmetric(A.exact.m)) {
    const groups: Rational[][][] = []
    let k = 0
    for (const { vectors: basis } of columns) {
      groups.push(vectors.slice(k, k + basis.length))
      k += basis.length
    }
    const orthonormal = groups.flatMap((g) => gramSchmidt(g).orthogonal).map(normalized)
    if (orthonormal.every((c) => c)) {
      const Q: Cell[][] = Array.from({ length: n }, (_, i) => orthonormal.map((col) => col![i]))
      const q = matrixCells(Q)
      lines.push({ tex: `\\text{ortogonale: } P = ${q.tex}`, text: `ortogonale: P = ${q.text}` })
    }
  }
  const tex = lines.length > 1 ? `\\begin{array}{l} ${lines.map((l) => l.tex).join(' \\\\ ')} \\end{array}` : lines[0].tex
  return { tex, text: lines.map((l) => l.text).join('; '), rich: true }
}

/** Quante volte il segno cambia tra i coefficienti (gli zeri non contano). */
function signChanges(p: Rational[]): number {
  let changes = 0
  let last = 0
  for (const c of p) {
    if (c.sign === 0) continue
    if (last && c.sign !== last) changes++
    last = c.sign
  }
  return changes
}

/**
 * La segnatura di una matrice simmetrica (o di una forma quadratica): quanti autovalori positivi,
 * negativi e nulli, dal polinomio caratteristico con la regola dei segni di Cartesio (esatta: le radici
 * di una matrice simmetrica sono tutte reali). E com'è la forma: definita, semidefinita, indefinita.
 */
export function signature(charPoly: Rational[], options?: FormatOptions): FormattedResult {
  void options
  const p = trim(charPoly)
  let zero = 0
  while (zero < p.length && p[zero].sign === 0) zero++
  const rest = p.slice(zero)
  const positive = signChanges(rest)
  const negative = signChanges(rest.map((c, i) => (i % 2 ? c.neg() : c)))
  const kind =
    zero === 0 && negative === 0
      ? 'definita positiva'
      : zero === 0 && positive === 0
        ? 'definita negativa'
        : negative === 0
          ? 'semidefinita positiva'
          : positive === 0
            ? 'semidefinita negativa'
            : 'indefinita'
  return {
    tex: `\\text{${kind}: } (n_+, n_-, n_0) = (${positive}, ${negative}, ${zero})`,
    text: `${kind}: (n₊, n₋, n₀) = (${positive}, ${negative}, ${zero})`,
  }
}

/**
 * I vettori sono linearmente indipendenti? Se no, la relazione tra loro (2u − v − w = 0), con i nomi
 * scritti (o v₁, v₂…).
 */
export function independence(vectors: Rational[][], names: string[], options: FormatOptions): FormattedResult {
  const n = vectors[0].length
  if (vectors.some((v) => v.length !== n)) throw new MathError('I vettori hanno un numero diverso di componenti')
  const m: Mat<Rational> = Array.from({ length: n }, (_, i) => vectors.map((v) => v[i]))
  const relations = kernel(EXACT, m)
  if (!relations.length) return { tex: '\\text{sì: sono linearmente indipendenti}', text: 'sì: sono linearmente indipendenti' }
  let c = integral(relations[0].map((r) => r[0]))
  if (c.find((x) => x.sign !== 0)!.sign < 0) c = c.map((x) => x.neg())
  const terms = c
    .map((x, i) => ({ x, name: names[i] }))
    .filter((t) => t.x.sign !== 0)
    .map((t, k) => {
      const abs = t.x.abs()
      const coef = abs.n === 1n && abs.d === 1n ? { tex: '', text: '' } : formatRational(abs, options)
      const sign = t.x.sign < 0 ? (k ? ' - ' : '-') : k ? ' + ' : ''
      return { tex: `${sign}${coef.tex}${nameLatex(t.name)}`, text: `${sign.replace('-', '−')}${coef.text}${t.name}` }
    })
  return {
    tex: `\\text{no: } ${terms.map((t) => t.tex).join('')} = \\mathbf{0}`,
    text: `no: ${terms.map((t) => t.text).join('')} = 0`,
  }
}

/** I nomi delle coordinate: x, y, z, w (o x₁, x₂… con più di quattro). */
function coordinateNames(n: number): string[] {
  return n <= 4 ? ['x', 'y', 'z', 'w'].slice(0, n) : Array.from({ length: n }, (_, i) => `x_${i + 1}`)
}

/** Le equazioni cartesiane di un sottospazio (dalla sua base): x + y − z = 0. */
export function cartesianEquations(basis: Rational[][], n: number, options: FormatOptions): FormattedResult {
  const names = coordinateNames(n)
  // I coefficienti delle equazioni: i vettori ortogonali a tutta la base.
  const rows = basis.length ? kernel(EXACT, basis) : Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => [Rational.int(i === j ? 1 : 0)]))
  if (!rows.length) return { tex: '\text{nessuna: è tutto lo spazio}', text: 'nessuna: è tutto lo spazio' }
  const equations = rows.map((r) => {
    const c = integral(r.map((x) => x[0]))
    const first = c.find((x) => x.sign !== 0)
    const sign = first && first.sign < 0 ? Rational.int(-1) : Rational.int(1)
    const terms = c
      .map((x, i) => ({ x: x.mul(sign), name: names[i] }))
      .filter((t) => t.x.sign !== 0)
      .map((t, k) => {
        const abs = t.x.abs()
        const coef = abs.n === 1n && abs.d === 1n ? { tex: '', text: '' } : formatRational(abs, options)
        const s = t.x.sign < 0 ? (k ? ' - ' : '-') : k ? ' + ' : ''
        return { tex: `${s}${coef.tex}${nameLatex(t.name)}`, text: `${s.replace('-', '−')}${coef.text}${t.name}` }
      })
    return { tex: `${terms.map((t) => t.tex).join('')} = 0`, text: `${terms.map((t) => t.text).join('')} = 0` }
  })
  return { tex: equations.map((e) => e.tex).join(',\quad '), text: equations.map((e) => e.text).join(', ') }
}

/** Il rango di una matrice con un parametro: «2 per k ≠ 2; 1 per k = 2». */
export function parametricRank(M: Poly[][], k: string, options: FormatOptions): FormattedResult {
  const at = (x: Rational) => M.map((row) => row.map((p) => pvalue(p, x)))
  const rankAt = (x: Rational) => rref(EXACT, at(x)).pivots.length
  let generic = 0
  for (const x of [new Rational(22n, 7n), new Rational(-31n, 13n), new Rational(57n, 11n)]) generic = Math.max(generic, rankAt(x))
  // Dove il rango scende: le radici del massimo comun divisore dei minori generic × generic.
  const roots: { exact: Rational | null; v: number; shown: Cell }[] = []
  const g = minorsGcd(M, generic)
  if (degree(g) >= 1) {
    const { roots: rational, rest } = rationalRoots(trim(g))
    for (const r of rational) if (!roots.some((s) => s.exact?.cmp(r) === 0)) roots.push({ exact: r, v: r.toNumber(), shown: formatRational(r, options) })
    if (rest.length > 2) {
      for (const z of numericRoots(rest.map((c) => c.toNumber()))) if (Math.abs(z.im) < 1e-9) roots.push({ exact: null, v: z.re, shown: number(z.re, options) })
    }
  }
  roots.sort((p, q) => p.v - q.v)
  const K = nameLatex(k)
  if (!roots.length) return { tex: `${generic}\\ \\text{per ogni } ${K}`, text: `${generic} per ogni ${k}` }
  const lines = [
    { tex: `${generic}\\ \\text{per } ${roots.map((r) => `${K} \\ne ${r.shown.tex}`).join(',\\ ')}`, text: `${generic} per ${roots.map((r) => `${k} ≠ ${r.shown.text}`).join(', ')}` },
  ]
  for (const r of roots) {
    const rank = r.exact
      ? rankAt(r.exact)
      : rref(
          FLOAT,
          M.map((row) => row.map((p) => p.reduce((s, c, i) => s + c.toNumber() * r.v ** i, 0))),
        ).pivots.length
    lines.push({ tex: `${rank}\\ \\text{per } ${K} = ${r.shown.tex}`, text: `${rank} per ${k} = ${r.shown.text}` })
  }
  return { tex: lines.map((l) => l.tex).join(';\\quad '), text: lines.map((l) => l.text).join('; ') }
}

/** Il vettore della nota come lista di frazioni (null se non è esatto). */
export function exactVector(v: LinearValue): Rational[] | null {
  const m = v.exact
  return m?.k === 'matrix' && m.m[0].length === 1 ? m.m.map((r) => r[0]) : null
}
