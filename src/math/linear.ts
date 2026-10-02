/**
 * Vettori e matrici: le matrici si scrivono con \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} (anche
 * bmatrix; vmatrix è il determinante), i vettori come (1, 2, 3) o come colonne. Si calcolano somme
 * e prodotti (A B, 2A, A v), la trasposta A^T, l'inversa A^{-1}, le potenze, il determinante (\det A,
 * |A|), il rango, la traccia, la riduzione a scala (\operatorname{rref}), nucleo e immagine (\ker A,
 * \operatorname{Im} A, come span di una base), il prodotto scalare (u \cdot v, \langle u, v \rangle)
 * e vettoriale (u \times v), la norma (\|v\|), autovalori e autovettori, e il polinomio
 * caratteristico (\det(A - \lambda I)).
 *
 * Come per i numeri, i conti si fanno prima con le frazioni (esatti: l'inversa di una matrice di
 * interi ha le frazioni giuste) e, se non si può (π, radici), con la virgola: `Field` è il tipo di
 * numero, `Rational` o `number`.
 */
import { compile, MathError, UndefinedName, type Scope } from './evaluate'
import { ExactUnavailable, Rational } from './exact'
import { formatNumber, formatRational, type FormatOptions, type FormattedResult } from './format'
import type { MathNode } from './parse'

// ——— I numeri: frazioni o con la virgola ———

export interface Field<T> {
  readonly exact: boolean
  zero(): T
  one(): T
  int(n: number): T
  num(text: string, value: number): T
  add(a: T, b: T): T
  sub(a: T, b: T): T
  mul(a: T, b: T): T
  div(a: T, b: T): T
  neg(a: T): T
  /** |a| come numero, per scegliere il pivot. */
  size(a: T): number
  /** È zero: esattamente con le frazioni, sotto `tolerance` con la virgola. */
  isZero(a: T, tolerance: number): boolean
  toNumber(a: T): number
  /** La radice quadrata (con le frazioni solo se è esatta). */
  sqrt(a: T): T
  /** Un numero calcolato con la virgola (π, sin 1): con le frazioni non si può. */
  fromFloat(x: number): T
  /** Un numero intero (per gli esponenti). */
  integer(a: T): number | null
}

const unavailable = (): never => {
  throw new ExactUnavailable()
}

function rationalSqrt(r: Rational): Rational {
  if (r.sign < 0) unavailable()
  const root = (n: bigint): bigint => {
    if (n < 2n) return n
    let x = 1n << BigInt(Math.ceil(n.toString(2).length / 2) + 1)
    for (;;) {
      const y = (x + n / x) / 2n
      if (y >= x) break
      x = y
    }
    return x
  }
  const n = root(r.n)
  const d = root(r.d)
  if (n * n !== r.n || d * d !== r.d) unavailable()
  return new Rational(n, d)
}

export const EXACT: Field<Rational> = {
  exact: true,
  zero: () => Rational.int(0),
  one: () => Rational.int(1),
  int: (n) => Rational.int(n),
  num: (text) => Rational.decimal(text),
  add: (a, b) => a.add(b),
  sub: (a, b) => a.sub(b),
  mul: (a, b) => a.mul(b),
  div: (a, b) => {
    if (b.sign === 0) throw new MathError('Divisione per zero')
    return a.div(b)
  },
  neg: (a) => a.neg(),
  size: (a) => Math.abs(a.toNumber()),
  isZero: (a) => a.sign === 0,
  toNumber: (a) => a.toNumber(),
  sqrt: rationalSqrt,
  fromFloat: () => unavailable(),
  integer: (a) => (a.isInteger && a.n >= -1000000n && a.n <= 1000000n ? Number(a.n) : null),
}

export const FLOAT: Field<number> = {
  exact: false,
  zero: () => 0,
  one: () => 1,
  int: (n) => n,
  num: (_text, value) => value,
  add: (a, b) => {
    const s = a + b
    return Math.abs(s) < 1e-13 * Math.max(Math.abs(a), Math.abs(b)) ? 0 : s
  },
  sub: (a, b) => {
    const s = a - b
    return Math.abs(s) < 1e-13 * Math.max(Math.abs(a), Math.abs(b)) ? 0 : s
  },
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  neg: (a) => -a,
  size: Math.abs,
  isZero: (a, tolerance) => Math.abs(a) <= tolerance,
  toNumber: (a) => a,
  sqrt: Math.sqrt,
  fromFloat: (x) => x,
  integer: (a) => (Number.isInteger(a) && Math.abs(a) <= 1e6 ? a : Math.abs(a - Math.round(a)) < 1e-9 ? Math.round(a) : null),
}

// ——— I valori ———

export type Mat<T> = T[][]

export type Lin<T> =
  | { k: 'scalar'; v: T }
  /** `tuple`: un vettore scritto come (1, 2, 3); i vettori sono colonne (n righe, 1 colonna). */
  | { k: 'matrix'; m: Mat<T>; tuple: boolean }
  /** c·I: la matrice identità (per c, o per 1 se c è null), della misura che serve (o I_3). */
  | { k: 'identity'; n: number | null; c: T | null }
  /** Un sottospazio (nucleo, immagine, span): i vettori di una base. */
  | { k: 'span'; basis: Mat<T>[] }

/** Le matrici e i vettori definiti, con le frazioni (null se non si può) e con la virgola. */
export interface LinearValue {
  exact: Lin<Rational> | null
  float: Lin<number>
}

export interface LinearScope {
  /** I numeri reali e le funzioni (per quello che non è una matrice). */
  real: Scope
  /** I numeri reali con le frazioni (null se non si può). */
  exactReals: ReadonlyMap<string, Rational | null>
  /** Le matrici e i vettori definiti. */
  values: ReadonlyMap<string, LinearValue>
}

interface Ctx<T> {
  F: Field<T>
  scope: LinearScope
  locals: ReadonlyMap<string, T>
}

const dims = <T>(m: Mat<T>) => [m.length, m[0]?.length ?? 0] as const

function isVector<T>(v: Lin<T>): v is Extract<Lin<T>, { k: 'matrix' }> {
  return v.k === 'matrix' && v.m[0]?.length === 1
}

function identity<T>(F: Field<T>, n: number): Mat<T> {
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? F.one() : F.zero())))
}

function maxSize<T>(F: Field<T>, m: Mat<T>): number {
  let s = 0
  for (const row of m) for (const x of row) s = Math.max(s, F.size(x))
  return s
}

function tolerance<T>(F: Field<T>, m: Mat<T>): number {
  return F.exact ? 0 : 1e-10 * Math.max(1, maxSize(F, m))
}

/** Una matrice da un valore, con l'identità della misura `n` se serve. */
function asMatrix<T>(F: Field<T>, v: Lin<T>, n: number): Mat<T> {
  if (v.k === 'matrix') return v.m
  if (v.k === 'identity') {
    const id = identity(F, v.n ?? n)
    const c = v.c
    return c === null ? id : id.map((row) => row.map((x) => F.mul(c, x)))
  }
  throw new MathError('Qui va una matrice')
}

function transpose<T>(m: Mat<T>): Mat<T> {
  const [r, c] = dims(m)
  return Array.from({ length: c }, (_, j) => Array.from({ length: r }, (_, i) => m[i][j]))
}

function multiply<T>(F: Field<T>, a: Mat<T>, b: Mat<T>): Mat<T> {
  const [ar, ac] = dims(a)
  const [br, bc] = dims(b)
  if (ac !== br) throw new MathError(`Per moltiplicare due matrici le colonne della prima (${ac}) devono essere quante le righe della seconda (${br})`)
  return Array.from({ length: ar }, (_, i) =>
    Array.from({ length: bc }, (_, j) => {
      let s = F.zero()
      for (let k = 0; k < ac; k++) s = F.add(s, F.mul(a[i][k], b[k][j]))
      return s
    }),
  )
}

/** La forma a scala ridotta (Gauss-Jordan) e le colonne dei pivot. */
export function rref<T>(F: Field<T>, m: Mat<T>): { r: Mat<T>; pivots: number[]; swaps: number } {
  const r = m.map((row) => [...row])
  const [rows, cols] = dims(r)
  const tol = tolerance(F, m)
  const pivots: number[] = []
  let swaps = 0
  let row = 0
  for (let col = 0; col < cols && row < rows; col++) {
    // Il pivot più grande (con la virgola) o il primo non nullo (con le frazioni).
    let best = -1
    for (let i = row; i < rows; i++) {
      if (F.isZero(r[i][col], tol)) continue
      if (best < 0 || (!F.exact && F.size(r[i][col]) > F.size(r[best][col]))) best = i
      if (F.exact) break
    }
    if (best < 0) {
      for (let i = row; i < rows; i++) r[i][col] = F.zero()
      continue
    }
    if (best !== row) {
      ;[r[best], r[row]] = [r[row], r[best]]
      swaps++
    }
    const p = r[row][col]
    for (let j = 0; j < cols; j++) r[row][j] = F.div(r[row][j], p)
    for (let i = 0; i < rows; i++) {
      if (i === row || F.isZero(r[i][col], 0)) continue
      const f = r[i][col]
      for (let j = 0; j < cols; j++) r[i][j] = F.sub(r[i][j], F.mul(f, r[row][j]))
      r[i][col] = F.zero()
    }
    pivots.push(col)
    row++
  }
  if (!F.exact) for (const line of r) for (let j = 0; j < cols; j++) if (F.isZero(line[j], tol)) line[j] = F.zero()
  return { r, pivots, swaps }
}

export function determinant<T>(F: Field<T>, m: Mat<T>): T {
  const [n, c] = dims(m)
  if (n !== c) throw new MathError(`Il determinante si calcola per le matrici quadrate (questa è ${n} × ${c})`)
  const a = m.map((row) => [...row])
  const tol = tolerance(F, m)
  let det = F.one()
  for (let col = 0; col < n; col++) {
    let best = -1
    for (let i = col; i < n; i++) {
      if (F.isZero(a[i][col], tol)) continue
      if (best < 0 || (!F.exact && F.size(a[i][col]) > F.size(a[best][col]))) best = i
      if (F.exact) break
    }
    if (best < 0) return F.zero()
    if (best !== col) {
      ;[a[best], a[col]] = [a[col], a[best]]
      det = F.neg(det)
    }
    det = F.mul(det, a[col][col])
    for (let i = col + 1; i < n; i++) {
      const f = F.div(a[i][col], a[col][col])
      for (let j = col; j < n; j++) a[i][j] = F.sub(a[i][j], F.mul(f, a[col][j]))
    }
  }
  return det
}

export function inverse<T>(F: Field<T>, m: Mat<T>): Mat<T> {
  const [n, c] = dims(m)
  if (n !== c) throw new MathError(`Solo le matrici quadrate hanno l'inversa (questa è ${n} × ${c})`)
  const id = identity(F, n)
  const { r, pivots } = rref(
    F,
    m.map((row, i) => [...row, ...id[i]]),
  )
  if (pivots.length < n || pivots[n - 1] !== n - 1) throw new MathError('La matrice non è invertibile: il determinante è 0')
  return r.map((row) => row.slice(n))
}

function power<T>(F: Field<T>, m: Mat<T>, e: number): Mat<T> {
  const [n, c] = dims(m)
  if (n !== c) throw new MathError('Le potenze si fanno con le matrici quadrate')
  if (e < 0) return power(F, inverse(F, m), -e)
  if (e > 1000) throw new MathError('L\'esponente è troppo grande')
  let r = identity(F, n)
  let base = m
  for (let k = e; k > 0; k = Math.floor(k / 2)) {
    if (k % 2 === 1) r = multiply(F, r, base)
    base = multiply(F, base, base)
  }
  return r
}

/** Una base del nucleo: un vettore per ogni colonna senza pivot. */
export function kernel<T>(F: Field<T>, m: Mat<T>): Mat<T>[] {
  const [, cols] = dims(m)
  const { r, pivots } = rref(F, m)
  const free = Array.from({ length: cols }, (_, j) => j).filter((j) => !pivots.includes(j))
  return free.map((f) => {
    const v: T[] = Array.from({ length: cols }, () => F.zero())
    v[f] = F.one()
    pivots.forEach((p, i) => (v[p] = F.neg(r[i][f])))
    return v.map((x) => [x])
  })
}

/** Una base dell'immagine: le colonne della matrice dove la forma a scala ha i pivot. */
export function image<T>(F: Field<T>, m: Mat<T>): Mat<T>[] {
  const { pivots } = rref(F, m)
  return pivots.map((p) => m.map((row) => [row[p]]))
}

// ——— Le espressioni ———

function scalarOf<T>(v: Lin<T>, what: string): T {
  if (v.k === 'scalar') return v.v
  if (v.k === 'matrix' && v.m.length === 1 && v.m[0].length === 1) return v.m[0][0]
  throw new MathError(`${what} vuole un numero, non una matrice`)
}

function matrixOf<T>(v: Lin<T>, what: string): Mat<T> {
  if (v.k === 'matrix') return v.m
  throw new MathError(`${what} vuole una matrice`)
}

function elementwise<T>(F: Field<T>, a: Lin<T>, b: Lin<T>, op: (x: T, y: T) => T, word: string): Lin<T> {
  if (a.k === 'scalar' && b.k === 'scalar') return { k: 'scalar', v: op(a.v, b.v) }
  if (a.k === 'span' || b.k === 'span') throw new MathError('Con i sottospazi non si fanno i conti')
  if (a.k === 'scalar' || b.k === 'scalar') throw new MathError(`Non si ${word} un numero e una matrice: forse manca la I (A - \\lambda I)?`)
  const size = a.k === 'matrix' ? a.m.length : b.k === 'matrix' ? b.m.length : 0
  if (a.k === 'identity' && b.k === 'identity') {
    if (a.n !== b.n) throw new MathError('Di che misura è la I? Scrivi I_2, I_3…')
    return { k: 'identity', n: a.n, c: op(a.c ?? F.one(), b.c ?? F.one()) }
  }
  const ma = asMatrix(F, a, size)
  const mb = asMatrix(F, b, size)
  const [ar, ac] = dims(ma)
  const [br, bc] = dims(mb)
  if (ar !== br || ac !== bc) throw new MathError(`Si ${word}no matrici della stessa misura (${ar} × ${ac} e ${br} × ${bc})`)
  return { k: 'matrix', m: ma.map((row, i) => row.map((x, j) => op(x, mb[i][j]))), tuple: (a.k === 'matrix' && a.tuple) || (b.k === 'matrix' && b.tuple) }
}

function scale<T>(F: Field<T>, s: T, v: Lin<T>, divide = false): Lin<T> {
  if (v.k === 'scalar') return { k: 'scalar', v: divide ? F.div(v.v, s) : F.mul(s, v.v) }
  if (v.k === 'matrix') return { k: 'matrix', m: v.m.map((row) => row.map((x) => (divide ? F.div(x, s) : F.mul(s, x)))), tuple: v.tuple }
  if (v.k === 'identity') {
    const c = v.c ?? F.one()
    return { k: 'identity', n: v.n, c: divide ? F.div(c, s) : F.mul(s, c) }
  }
  throw new MathError('Con i sottospazi non si fanno i conti')
}

function dot<T>(F: Field<T>, a: Mat<T>, b: Mat<T>): T {
  if (a.length !== b.length) throw new MathError(`Il prodotto scalare vuole due vettori con lo stesso numero di componenti (${a.length} e ${b.length})`)
  let s = F.zero()
  for (let i = 0; i < a.length; i++) s = F.add(s, F.mul(a[i][0], b[i][0]))
  return s
}

function cross<T>(F: Field<T>, a: Mat<T>, b: Mat<T>): Mat<T> {
  if (a.length !== 3 || b.length !== 3) throw new MathError('Il prodotto vettoriale si fa tra due vettori con tre componenti')
  const [x1, y1, z1] = a.map((r) => r[0])
  const [x2, y2, z2] = b.map((r) => r[0])
  return [[F.sub(F.mul(y1, z2), F.mul(z1, y2))], [F.sub(F.mul(z1, x2), F.mul(x1, z2))], [F.sub(F.mul(x1, y2), F.mul(y1, x2))]]
}

function norm<T>(F: Field<T>, v: Mat<T>): T {
  return F.sqrt(dot(F, v, v))
}

/** Una base di un insieme di vettori (le colonne indipendenti). */
function basisOf<T>(F: Field<T>, vectors: Mat<T>[]): Mat<T>[] {
  if (!vectors.length) return []
  const n = vectors[0].length
  if (vectors.some((v) => v.length !== n)) throw new MathError('I vettori hanno un numero diverso di componenti')
  const m: Mat<T> = Array.from({ length: n }, (_, i) => vectors.map((v) => v[i][0]))
  return image(F, m)
}

/** Il nome è la matrice identità? I, I_2, I_3… (se non è definito altro con quel nome). */
function identityName(name: string): number | null | false {
  if (name === 'I' || name === 'E') return name === 'I' ? null : false
  const m = /^I_(\d)$/.exec(name)
  return m ? Number(m[1]) : false
}

function valueOf<T>(ctx: Ctx<T>, name: string): Lin<T> | null {
  const { F, scope, locals } = ctx
  const local = locals.get(name)
  if (local !== undefined) return { k: 'scalar', v: local }
  const value = scope.values.get(name)
  if (value) {
    const v = F.exact ? value.exact : value.float
    if (!v) unavailable()
    return v as Lin<T>
  }
  if (scope.real.consts.has(name)) {
    if (F.exact) {
      const r = scope.exactReals.get(name)
      if (!r) unavailable()
      return { k: 'scalar', v: r as T }
    }
    return { k: 'scalar', v: F.fromFloat(scope.real.consts.get(name)!) }
  }
  return null
}

/** Il valore di un'espressione con vettori e matrici, con i numeri del tipo `F`. */
export function evaluateLinear<T>(node: MathNode, scope: LinearScope, F: Field<T>, locals: ReadonlyMap<string, T> = new Map()): Lin<T> {
  return evaluate({ F, scope, locals }, node)
}

function evaluate<T>(ctx: Ctx<T>, node: MathNode): Lin<T> {
  const { F } = ctx
  const ev = (n: MathNode) => evaluate(ctx, n)
  switch (node.k) {
    case 'num':
      return { k: 'scalar', v: F.num(node.text, node.v) }
    case 'name': {
      const value = valueOf(ctx, node.name)
      if (value) return value
      const id = identityName(node.name)
      if (id !== false) return { k: 'identity', n: id, c: null }
      if (node.name === 'π') return { k: 'scalar', v: F.fromFloat(Math.PI) }
      if (node.name === 'e') return { k: 'scalar', v: F.fromFloat(Math.E) }
      throw new UndefinedName(node.name)
    }
    case 'tuple':
      if (node.items.length < 2) throw new MathError('Un vettore ha almeno due componenti')
      return { k: 'matrix', m: node.items.map((n) => [scalarOf(ev(n), 'Una componente')]), tuple: true }
    case 'matrix':
      return { k: 'matrix', m: node.rows.map((row) => row.map((n) => scalarOf(ev(n), 'Un elemento della matrice'))), tuple: false }
    case 'neg':
      return scale(F, F.int(-1), ev(node.a))
    case 'bin': {
      if (node.op === '^') return powerOf(ctx, node)
      const a = ev(node.a)
      const b = ev(node.b)
      switch (node.op) {
        case '+':
          return elementwise(F, a, b, F.add, 'somma')
        case '-':
          return elementwise(F, a, b, F.sub, 'sottrae')
        case '/':
          if (b.k !== 'scalar') throw new MathError('Non si divide per una matrice: moltiplica per l\'inversa, A^{-1}')
          return scale(F, b.v, a, true)
        case '*': {
          if (a.k === 'scalar') return scale(F, a.v, b)
          if (b.k === 'scalar') return scale(F, b.v, a)
          if (a.k === 'span' || b.k === 'span') throw new MathError('Con i sottospazi non si fanno i conti')
          if (node.cross) {
            if (!isVector(a) || !isVector(b)) throw new MathError('Il prodotto vettoriale si fa tra due vettori')
            return { k: 'matrix', m: cross(F, a.m, b.m), tuple: a.tuple }
          }
          // Due vettori: il prodotto scalare (u \cdot v).
          if (isVector(a) && isVector(b) && a.m.length === b.m.length && a.m.length > 1) return { k: 'scalar', v: dot(F, a.m, b.m) }
          const size = a.k === 'matrix' ? a.m[0].length : b.k === 'matrix' ? b.m.length : 0
          if (a.k === 'identity' && b.k === 'identity') return { k: 'identity', n: a.n ?? b.n, c: F.mul(a.c ?? F.one(), b.c ?? F.one()) }
          const ma = asMatrix(F, a, a.k === 'identity' && b.k === 'matrix' ? b.m.length : size)
          const mb = asMatrix(F, b, b.k === 'identity' && a.k === 'matrix' ? a.m[0].length : size)
          const m = multiply(F, ma, mb)
          if (m.length === 1 && m[0].length === 1) return { k: 'scalar', v: m[0][0] }
          return { k: 'matrix', m, tuple: (b.k === 'matrix' && b.tuple && m[0].length === 1) || false }
        }
      }
      break
    }
    case 'abs': {
      const a = ev(node.a)
      if (a.k === 'scalar') return { k: 'scalar', v: F.size(a.v) === 0 ? a.v : F.toNumber(a.v) < 0 ? F.neg(a.v) : a.v }
      // |v| è la norma di un vettore, |A| il determinante di una matrice.
      if (isVector(a)) return { k: 'scalar', v: norm(F, a.m) }
      return { k: 'scalar', v: determinant(F, matrixOf(a, '|…|')) }
    }
    case 'fn':
      return functionOf(ctx, node)
    case 'apply': {
      // A(v): il prodotto.
      const value = valueOf(ctx, node.name)
      if (!value || node.primes || node.args.length !== 1) throw new UndefinedName(node.name)
      return evaluate(ctx, { k: 'bin', op: '*', a: { k: 'name', name: node.name }, b: node.args[0] })
    }
  }
  // Un numero, con le regole dei numeri reali (sin 1, 3!).
  if (F.exact) unavailable()
  return { k: 'scalar', v: F.fromFloat(compile(node, ctx.scope.real, { calc: true })({})) }
}

function powerOf<T>(ctx: Ctx<T>, node: Extract<MathNode, { k: 'bin' }>): Lin<T> {
  const { F } = ctx
  const base = evaluate(ctx, node.a)
  // A^T: la trasposta (se T non è un numero definito).
  if (node.b.k === 'name' && node.b.name === 'T' && !valueOf(ctx, 'T')) {
    if (base.k !== 'matrix') throw new MathError('La trasposta è di una matrice o di un vettore')
    return { k: 'matrix', m: transpose(base.m), tuple: false }
  }
  const e = evaluate(ctx, node.b)
  if (e.k !== 'scalar') throw new MathError('L\'esponente è un numero')
  if (base.k === 'scalar') {
    const n = F.integer(e.v)
    if (n !== null) {
      let r = F.one()
      const b = n < 0 ? F.div(F.one(), base.v) : base.v
      for (let k = 0; k < Math.abs(n); k++) r = F.mul(r, b)
      return { k: 'scalar', v: r }
    }
    if (F.exact) unavailable()
    return { k: 'scalar', v: F.fromFloat(Math.pow(F.toNumber(base.v), F.toNumber(e.v))) }
  }
  if (base.k !== 'matrix') throw new MathError('Qui va una matrice')
  const n = F.integer(e.v)
  if (n === null) throw new MathError('Le potenze di una matrice hanno l\'esponente intero (A^{-1} è l\'inversa)')
  return { k: 'matrix', m: power(F, base.m, n), tuple: false }
}

function functionOf<T>(ctx: Ctx<T>, node: Extract<MathNode, { k: 'fn' }>): Lin<T> {
  const { F } = ctx
  const args = node.args.map((a) => evaluate(ctx, a))
  const one = () => {
    if (args.length !== 1) throw new MathError(`\\${node.name} vuole un valore solo`)
    return args[0]
  }
  let out: Lin<T>
  switch (node.name) {
    case 'det':
      out = { k: 'scalar', v: determinant(F, matrixOf(one(), '\\det')) }
      break
    case 'rank':
      out = { k: 'scalar', v: F.int(rref(F, matrixOf(one(), 'Il rango')).pivots.length) }
      break
    case 'tr': {
      const m = matrixOf(one(), 'La traccia')
      if (m.length !== m[0].length) throw new MathError('La traccia è delle matrici quadrate')
      let s = F.zero()
      m.forEach((row, i) => (s = F.add(s, row[i])))
      out = { k: 'scalar', v: s }
      break
    }
    case 'rref':
      out = { k: 'matrix', m: rref(F, matrixOf(one(), 'La riduzione a scala')).r, tuple: false }
      break
    case 'ker':
      out = { k: 'span', basis: kernel(F, matrixOf(one(), 'Il nucleo')) }
      break
    case 'im': {
      const a = one()
      if (a.k !== 'matrix') throw new MathError('\\operatorname{Im} di un numero reale è 0: per i numeri complessi scrivi la i')
      out = { k: 'span', basis: image(F, a.m) }
      break
    }
    case 'span':
      out = { k: 'span', basis: basisOf(F, args.map((a) => (isVector(a) ? a.m : matrixOf(a, 'Lo span')))) }
      break
    case 'dim': {
      const a = one()
      if (a.k === 'span') out = { k: 'scalar', v: F.int(a.basis.length) }
      else throw new MathError('\\dim è la dimensione di un sottospazio: \\dim \\ker A')
      break
    }
    case 'dot': {
      const [a, b] = args
      if (!isVector(a) || !isVector(b)) throw new MathError('Il prodotto scalare si fa tra due vettori')
      out = { k: 'scalar', v: dot(F, a.m, b.m) }
      break
    }
    case 'abs': {
      const a = one()
      out = isVector(a) ? { k: 'scalar', v: norm(F, a.m) } : { k: 'scalar', v: scalarOf(a, '|…|') }
      break
    }
    case 'sqrt':
      out = { k: 'scalar', v: F.sqrt(scalarOf(one(), 'La radice')) }
      break
    case 'eig':
    case 'eigvec':
      throw new MathError('Gli autovalori si chiedono da soli: \\operatorname{autovalori}(A) =')
    default: {
      // Le altre funzioni (sin, ln…) dei numeri, con la virgola.
      if (F.exact) unavailable()
      const values = args.map((a) => F.toNumber(scalarOf(a, `\\${node.name}`)))
      const fn: MathNode = { ...node, args: values.map((v) => ({ k: 'num', v, text: String(v), comma: false })) }
      return { k: 'scalar', v: F.fromFloat(compile(fn, ctx.scope.real, { calc: true })({})) }
    }
  }
  if (node.pow && out.k === 'scalar') {
    const p = evaluate(ctx, node.pow)
    const n = p.k === 'scalar' ? F.integer(p.v) : null
    if (n === null) {
      if (F.exact) unavailable()
      return { k: 'scalar', v: F.fromFloat(Math.pow(F.toNumber(out.v), F.toNumber(scalarOf(p, 'L\'esponente')))) }
    }
    let r = F.one()
    for (let k = 0; k < Math.abs(n); k++) r = F.mul(r, out.v)
    return { k: 'scalar', v: n < 0 ? F.div(F.one(), r) : r }
  }
  return out
}

// ——— Autovalori e polinomio caratteristico ———

/** I coefficienti (dal grado 0) del polinomio che passa per i punti (0, y₀), (1, y₁), …: esatti, con le differenze divise. */
function interpolate(ys: Rational[]): Rational[] {
  const n = ys.length
  const c = [...ys]
  for (let j = 1; j < n; j++) for (let i = n - 1; i >= j; i--) c[i] = c[i].sub(c[i - 1]).div(Rational.int(j))
  // Da Newton (x(x−1)(x−2)…) ai monomi.
  let poly: Rational[] = [c[n - 1]]
  for (let i = n - 2; i >= 0; i--) {
    const next: Rational[] = Array.from({ length: poly.length + 1 }, () => Rational.int(0))
    poly.forEach((a, k) => {
      next[k + 1] = next[k + 1].add(a)
      next[k] = next[k].sub(a.mul(Rational.int(i)))
    })
    next[0] = next[0].add(c[i])
    poly = next
  }
  while (poly.length > 1 && poly[poly.length - 1].sign === 0) poly.pop()
  return poly
}

/** Come `interpolate`, con la virgola. */
function interpolateFloat(ys: number[]): number[] {
  const n = ys.length
  const c = [...ys]
  for (let j = 1; j < n; j++) for (let i = n - 1; i >= j; i--) c[i] = (c[i] - c[i - 1]) / j
  let poly: number[] = [c[n - 1]]
  for (let i = n - 2; i >= 0; i--) {
    const next: number[] = Array.from({ length: poly.length + 1 }, () => 0)
    poly.forEach((a, k) => {
      next[k + 1] += a
      next[k] -= a * i
    })
    next[0] += c[i]
    poly = next
  }
  const scale = Math.max(...poly.map(Math.abs))
  while (poly.length > 1 && Math.abs(poly[poly.length - 1]) <= 1e-12 * scale) poly.pop()
  return poly
}

/**
 * Un'espressione con una variabile sola (λ in \det(A - \lambda I)) che è un polinomio: i suoi
 * coefficienti esatti (dal grado 0), o null se non lo è (o non si sa calcolare con le frazioni).
 */
export function polynomialIn(node: MathNode, name: string, scope: LinearScope, most = 12): Rational[] | null {
  const at = (x: number) => {
    const v = evaluateLinear(node, scope, EXACT, new Map([[name, Rational.int(x)]]))
    if (v.k !== 'scalar') throw new MathError('Non è un numero')
    return v.v
  }
  try {
    const ys = Array.from({ length: most }, (_, x) => at(x))
    const poly = interpolate(ys)
    // Una prova in un punto in più: se il grado fosse più alto, qui non tornerebbe.
    const x = Rational.int(most + 3)
    let y = Rational.int(0)
    for (let k = poly.length - 1; k >= 0; k--) y = y.mul(x).add(poly[k])
    return y.cmp(at(most + 3)) === 0 ? poly : null
  } catch {
    return null
  }
}

/** Le radici razionali di un polinomio a coefficienti frazioni (con la molteplicità), e quello che resta. */
function rationalRoots(poly: Rational[]): { roots: Rational[]; rest: Rational[] } {
  let p = [...poly]
  const roots: Rational[] = []
  // Con i coefficienti interi: le radici sono ±(divisori del termine noto)/(divisori del primo coefficiente).
  const lcm = p.reduce((m, c) => {
    const g = (a: bigint, b: bigint): bigint => (b ? g(b, a % b) : a < 0n ? -a : a)
    return (m * c.d) / g(m, c.d)
  }, 1n)
  const ints = () => p.map((c) => (c.n * lcm) / c.d)
  const divisors = (n: bigint): bigint[] => {
    n = n < 0n ? -n : n
    if (n === 0n || n > 1000000n) return []
    const out: bigint[] = []
    for (let d = 1n; d * d <= n; d++) {
      if (n % d === 0n) {
        out.push(d)
        if (d * d !== n) out.push(n / d)
      }
    }
    return out
  }
  const value = (q: Rational[], x: Rational) => {
    let y = Rational.int(0)
    for (let k = q.length - 1; k >= 0; k--) y = y.mul(x).add(q[k])
    return y
  }
  const deflate = (q: Rational[], x: Rational) => {
    // (q) / (t − x), con Ruffini.
    const out: Rational[] = Array.from({ length: q.length - 1 }, () => Rational.int(0))
    let carry = Rational.int(0)
    for (let k = q.length - 1; k >= 1; k--) {
      carry = carry.mul(x).add(q[k])
      out[k - 1] = carry
    }
    return out
  }
  for (;;) {
    if (p.length <= 1) break
    if (p[0].sign === 0) {
      roots.push(Rational.int(0))
      p = p.slice(1)
      continue
    }
    const c = ints()
    const candidates: Rational[] = []
    for (const a of divisors(c[0])) for (const b of divisors(c[c.length - 1])) for (const s of [1n, -1n]) candidates.push(new Rational(s * a, b))
    const root = candidates.find((x) => value(p, x).sign === 0)
    if (!root) break
    roots.push(root)
    p = deflate(p, root)
  }
  return { roots, rest: p }
}

/** Le radici (anche complesse) di un polinomio con i coefficienti con la virgola: Durand–Kerner. */
function numericRoots(coeffs: number[]): { re: number; im: number }[] {
  const n = coeffs.length - 1
  if (n < 1) return []
  const lead = coeffs[n]
  const a = coeffs.map((c) => c / lead)
  let z = Array.from({ length: n }, (_, k) => ({ re: Math.cos((2 * Math.PI * k) / n + 0.4) * 1.3, im: Math.sin((2 * Math.PI * k) / n + 0.4) * 1.3 }))
  const mul = (p: { re: number; im: number }, q: { re: number; im: number }) => ({ re: p.re * q.re - p.im * q.im, im: p.re * q.im + p.im * q.re })
  const evalAt = (x: { re: number; im: number }) => {
    let y = { re: 0, im: 0 }
    for (let k = n; k >= 0; k--) y = { re: mul(y, x).re + a[k], im: mul(y, x).im }
    return y
  }
  for (let it = 0; it < 500; it++) {
    let moved = 0
    z = z.map((zi, i) => {
      let d = { re: 1, im: 0 }
      z.forEach((zj, j) => {
        if (i !== j) d = mul(d, { re: zi.re - zj.re, im: zi.im - zj.im })
      })
      const f = evalAt(zi)
      const den = d.re * d.re + d.im * d.im
      if (!den) return zi
      const step = { re: (f.re * d.re + f.im * d.im) / den, im: (f.im * d.re - f.re * d.im) / den }
      moved = Math.max(moved, Math.hypot(step.re, step.im))
      return { re: zi.re - step.re, im: zi.im - step.im }
    })
    if (moved < 1e-15) break
  }
  return z.map((r) => ({ re: r.re, im: Math.abs(r.im) < 1e-9 * Math.max(1, Math.abs(r.re)) ? 0 : r.im }))
}

export interface Eigenvalue {
  /** Il valore: esatto (una frazione) o con la virgola, anche complesso. */
  exact: Rational | null
  re: number
  im: number
  /** Quante volte è radice del polinomio caratteristico. */
  multiplicity: number
}

/** Gli autovalori di una matrice quadrata, dal polinomio caratteristico. */
export function eigenvalues(scope: LinearScope, A: LinearValue): Eigenvalue[] {
  const m = A.float.k === 'matrix' ? A.float.m : null
  if (!m || m.length !== m[0].length) throw new MathError('Gli autovalori sono delle matrici quadrate')
  const n = m.length
  const lambda = 'λ\u0000'
  const node: MathNode = {
    k: 'fn',
    name: 'det',
    args: [{ k: 'bin', op: '-', a: { k: 'name', name: '\u0000A' }, b: { k: 'bin', op: '*', a: { k: 'name', name: lambda }, b: { k: 'name', name: 'I' } } }],
  }
  const inner: LinearScope = { ...scope, values: new Map([...scope.values, ['\u0000A', A]]) }
  const out: Eigenvalue[] = []
  const add = (e: Omit<Eigenvalue, 'multiplicity'>) => {
    const same = out.find((o) => Math.abs(o.re - e.re) < 1e-7 * Math.max(1, Math.abs(e.re)) && Math.abs(o.im - e.im) < 1e-7 * Math.max(1, Math.abs(e.im)))
    if (same) same.multiplicity++
    else out.push({ ...e, multiplicity: 1 })
  }
  const poly = A.exact ? polynomialIn(node, lambda, inner, n + 2) : null
  if (poly) {
    const { roots, rest } = rationalRoots(poly)
    for (const r of roots) add({ exact: r, re: r.toNumber(), im: 0 })
    for (const z of numericRoots(rest.map((c) => c.toNumber()))) add({ exact: null, re: z.re, im: z.im })
  } else {
    // Con la virgola: il polinomio dai valori in n + 1 punti.
    const ys: number[] = []
    for (let x = 0; x <= n; x++) {
      const v = evaluateLinear(node, inner, FLOAT, new Map([[lambda, x]]))
      ys.push(v.k === 'scalar' ? v.v : NaN)
    }
    for (const z of numericRoots(interpolateFloat(ys))) add({ exact: null, re: z.re, im: z.im })
  }
  return out.sort((p, q) => p.re - q.re || p.im - q.im)
}

/** Gli autovettori di un autovalore reale: una base del nucleo di A − λI. */
export function eigenvectors(A: LinearValue, e: Eigenvalue): Mat<number>[] | Mat<Rational>[] {
  if (e.im !== 0) return []
  if (e.exact && A.exact?.k === 'matrix') {
    const m = A.exact.m
    return kernel(
      EXACT,
      m.map((row, i) => row.map((x, j) => (i === j ? x.sub(e.exact!) : x))),
    )
  }
  if (A.float.k !== 'matrix') return []
  const m = A.float.m
  const shifted = m.map((row, i) => row.map((x, j) => (i === j ? x - e.re : x)))
  // Con la virgola l'autovalore non è esatto: la tolleranza è più larga.
  const loose: Field<number> = { ...FLOAT, isZero: (a) => Math.abs(a) <= 1e-7 * Math.max(1, maxSize(FLOAT, m)) }
  return kernel(loose, shifted).map((v) => {
    // Il vettore con la componente più grande uguale a 1, così si legge meglio.
    const big = v.reduce((p, r) => (Math.abs(r[0]) > Math.abs(p) ? r[0] : p), 0)
    return big ? v.map((r) => [r[0] / big]) : v
  })
}

// ——— Come si scrivono ———

/** Un numero della matrice: una frazione o le sue cifre. */
function entry<T>(F: Field<T>, x: T, options: FormatOptions): FormattedResult {
  if (F.exact) return formatRational(x as Rational, options)
  return formatNumber(F.toNumber(x), { ...options, decimal: true }) ?? { tex: '\\text{?}', text: '?' }
}

function matrixTex<T>(F: Field<T>, m: Mat<T>, options: FormatOptions): FormattedResult {
  const cells = m.map((row) => row.map((x) => entry(F, x, options)))
  return {
    tex: `\\begin{pmatrix} ${cells.map((row) => row.map((c) => c.tex).join(' & ')).join(' \\\\ ')} \\end{pmatrix}`,
    text: `(${cells.map((row) => row.map((c) => c.text).join('  ')).join(' ; ')})`,
    rich: true,
  }
}

function tupleTex<T>(F: Field<T>, m: Mat<T>, options: FormatOptions): FormattedResult {
  const cells = m.map((row) => entry(F, row[0], options))
  // Con i decimali con la virgola le componenti si separano con il punto e virgola.
  const sep = cells.some((c) => c.text.includes(',')) ? '; ' : ', '
  return { tex: `\\left(${cells.map((c) => c.tex).join(sep)}\\right)`, text: `(${cells.map((c) => c.text).join(sep)})`, rich: true }
}

/** Un valore con vettori e matrici come risultato. */
export function formatLinear<T>(F: Field<T>, v: Lin<T>, options: FormatOptions): FormattedResult | null {
  switch (v.k) {
    case 'scalar':
      return F.exact ? formatRational(v.v as Rational, options) : formatNumber(F.toNumber(v.v), { ...options, decimal: true })
    case 'matrix':
      return v.tuple && v.m[0].length === 1 ? tupleTex(F, v.m, options) : matrixTex(F, v.m, options)
    case 'identity':
      return v.n ? matrixTex(F, asMatrix(F, v, v.n), options) : null
    case 'span': {
      if (!v.basis.length) return { tex: '\\left\\{ \\mathbf{0} \\right\\}', text: '{0}', rich: true }
      const vectors = v.basis.map((b) => matrixTex(F, b, options))
      return {
        tex: `\\operatorname{span}\\left\\{ ${vectors.map((b) => b.tex).join(',\\ ')} \\right\\}`,
        text: `span{${vectors.map((b) => b.text).join(', ')}}`,
        rich: true,
      }
    }
  }
}

/** Gli autovalori come risultato: λ₁ = 1; λ₂ = 3 (con la molteplicità, se più di 1). */
export function formatEigenvalues(values: Eigenvalue[], options: FormatOptions, vectors?: (e: Eigenvalue) => FormattedResult | null): FormattedResult {
  const parts = values.map((e, i) => {
    const value =
      e.exact !== null
        ? formatRational(e.exact, options)
        : e.im === 0
          ? formatNumber(e.re, { ...options, decimal: true })
          : complexText(e.re, e.im, options)
    const times = e.multiplicity > 1 ? { tex: `\\ (\\times ${e.multiplicity})`, text: ` (×${e.multiplicity})` } : { tex: '', text: '' }
    const vec = vectors?.(e)
    const name = values.length > 1 ? `\\lambda_{${i + 1}}` : '\\lambda'
    const textName = values.length > 1 ? `λ${'₀₁₂₃₄₅₆₇₈₉'[i + 1] ?? i + 1}` : 'λ'
    return {
      tex: `${name} = ${value?.tex ?? '?'}${times.tex}${vec ? `:\\ ${vec.tex}` : ''}`,
      text: `${textName} = ${value?.text ?? '?'}${times.text}${vec ? `: ${vec.text}` : ''}`,
    }
  })
  return { tex: parts.map((p) => p.tex).join(';\\quad '), text: parts.map((p) => p.text).join('; '), rich: true }
}

function complexText(re: number, im: number, options: FormatOptions): FormattedResult | null {
  const a = formatNumber(re, { ...options, decimal: true })
  const b = formatNumber(Math.abs(im), { ...options, decimal: true })
  if (!b) return null
  const i = b.tex === '1' ? 'i' : `${b.tex}\\,i`
  const it = b.text === '1' ? 'i' : `${b.text}i`
  if (!a || re === 0) return { tex: `${im < 0 ? '-' : ''}${i}`, text: `${im < 0 ? '−' : ''}${it}` }
  return { tex: `${a.tex} ${im < 0 ? '-' : '+'} ${i}`, text: `${a.text} ${im < 0 ? '−' : '+'} ${it}` }
}

/** Un polinomio (coefficienti dal grado 0) nella variabile `name`: \lambda^{2} - 4\lambda + 3. */
export function formatPolynomial(poly: Rational[], name: string, options: FormatOptions): FormattedResult {
  const v = name === 'λ' ? '\\lambda' : name
  const terms: { tex: string; text: string; negative: boolean }[] = []
  for (let k = poly.length - 1; k >= 0; k--) {
    const c = poly[k]
    if (c.sign === 0) continue
    const abs = c.abs()
    const one = abs.cmp(Rational.int(1)) === 0
    const coef = formatRational(abs, { ...options, decimal: false })
    const power = k === 0 ? '' : k === 1 ? v : `${v}^{${k}}`
    const powerText = k === 0 ? '' : k === 1 ? name : `${name}^${k}`
    terms.push({
      tex: k === 0 ? coef.tex : `${one ? '' : coef.tex}${power}`,
      text: k === 0 ? coef.text : `${one ? '' : coef.text}${powerText}`,
      negative: c.sign < 0,
    })
  }
  if (!terms.length) return { tex: '0', text: '0' }
  let tex = ''
  let text = ''
  terms.forEach((t, i) => {
    tex += i === 0 ? (t.negative ? `-${t.tex}` : t.tex) : ` ${t.negative ? '-' : '+'} ${t.tex}`
    text += i === 0 ? (t.negative ? `−${t.text}` : t.text) : ` ${t.negative ? '−' : '+'} ${t.text}`
  })
  return { tex, text }
}

