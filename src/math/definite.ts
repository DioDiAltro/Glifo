/**
 * Gli integrali definiti con la primitiva: F(b) − F(a) esatto (con π, le radici, i logaritmi) e gli
 * integrali impropri con i limiti di F agli estremi (anche +∞, quando divergono). Tutto si controlla
 * con i numeri: l'integrale calcolato con i numeri deve tornare, e tra gli estremi F non deve saltare.
 */
import { compile, EMPTY_SCOPE, integrate, scopeWith, type Scope } from './evaluate'
import { limit, type LimitValue } from './limits'
import { sub, subst, tidy, toNode, type Ex } from './symbolic'

export interface Definite {
  /** Il valore esatto, se gli estremi sono finiti e F è continua tra loro. */
  exact: Ex | null
  value: LimitValue
}

const close = (a: number, b: number) => Math.abs(a - b) <= 1e-7 * Math.max(1, Math.abs(a), Math.abs(b))

/** Il valore con i numeri di un'espressione senza variabili (π, e, i numeri definiti in `scope`). */
export function exValue(x: Ex, scope: Scope = EMPTY_SCOPE): number {
  try {
    return compile(toNode(x), scope)({})
  } catch {
    return NaN
  }
}

/** I punti per controllare F tra gli estremi (anche infiniti), dentro l'intervallo. */
function samples(lo: number, hi: number, n: number): number[] {
  const out: number[] = []
  for (let i = 1; i < n; i++) {
    const t = i / n
    if (Number.isFinite(lo) && Number.isFinite(hi)) out.push(lo + (hi - lo) * t)
    else if (Number.isFinite(lo)) out.push(lo + t / (1 - t))
    else if (Number.isFinite(hi)) out.push(hi - (1 - t) / t)
    else out.push((2 * t - 1) / (1 - (2 * t - 1) ** 2))
  }
  return out
}

/**
 * ∫_a^b f con la primitiva F (in v): `A` e `B` gli estremi con i numeri, `a` e `b` con le lettere (null
 * se infiniti), `numeric` l'integrale con i numeri (NaN se non converge), `f` la funzione, `scope` i
 * numeri definiti. Null se F non si può usare (salta tra gli estremi, o non torna con i numeri).
 */
export function definiteIntegral(
  F: Ex,
  v: string,
  f: (x: number) => number,
  a: Ex | null,
  b: Ex | null,
  A: number,
  B: number,
  numeric: number,
  scope: Scope = EMPTY_SCOPE,
): Definite | null {
  if (Number.isNaN(A) || Number.isNaN(B) || A === B) return null
  let Fn: (x: number) => number
  try {
    const c = compile(toNode(F), scopeWith(scope, [v]))
    const vars: Record<string, number> = {}
    Fn = (x) => ((vars[v] = x), c(vars))
  } catch {
    return null
  }
  // Integrale finito con gli estremi finiti: F(b) − F(a), se torna con i numeri.
  if (a && b && Number.isFinite(numeric)) {
    const exact = tidy(sub(subst(F, v, b), subst(F, v, a)))
    const x = exValue(exact, scope)
    if (Number.isFinite(x) && close(x, numeric)) return { exact, value: { k: 'value', v: x } }
  }
  // Improprio (o F non si calcola negli estremi): i limiti di F, se tra gli estremi non salta.
  const lo = Math.min(A, B)
  const hi = Math.max(A, B)
  const points = [lo, ...samples(lo, hi, 48), hi]
  for (let i = 1; i < points.length - 2; i++) {
    const [p, q] = [points[i], points[i + 1]]
    const step = Fn(q) - Fn(p)
    if (!Number.isFinite(step) || !close(step, integrate(f, p, q, 1e-9))) return null
  }
  const dir = B > A ? 1 : -1
  const atA = limit(Fn, A, Number.isFinite(A) ? (dir as 1 | -1) : 0)
  const atB = limit(Fn, B, Number.isFinite(B) ? (-dir as 1 | -1) : 0)
  if (atA.k === 'none' || atB.k === 'none') return null
  if (atA.k === 'value' && atB.k === 'value') {
    const total = atB.v - atA.v
    // Deve tornare con i numeri (se i numeri ce la fanno).
    if (Number.isFinite(numeric) && !close(total, numeric)) return null
    return { exact: null, value: { k: 'value', v: total } }
  }
  // Diverge: +∞ − (finito), (finito) − (−∞), +∞ − (−∞).
  const top = atB.k === 'infinity' ? atB.sign : 0
  const bottom = atA.k === 'infinity' ? -atA.sign : 0
  if (top && bottom && top !== bottom) return null
  if (Number.isFinite(numeric)) return null
  return { exact: null, value: { k: 'infinity', sign: (top || bottom) as 1 | -1 } }
}
