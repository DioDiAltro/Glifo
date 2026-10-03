/**
 * La serie di Fourier nei grafici: \operatorname{fourier}(f, [a, b], N) disegna la funzione ripetuta con il
 * suo periodo (tratteggiata) e la somma parziale S_N, con i coefficienti fatti con i numeri (N è 5 se non
 * c'è). Con N definito nel blocco (N = 5) c'è lo slider: si vede la somma che si avvicina alla funzione.
 */
import { compile, MathError, type Scope } from '../math/evaluate'
import { fourierProblem, partialSum } from '../math/fourier'
import { toLatex } from '../math/latex'
import type { MathNode } from '../math/parse'
import type { SymbolScope } from '../math/symbolic'
import type { GraphItem } from './spec'

export const isFourierLine = (main: MathNode): boolean => main.k === 'fn' && main.name === 'fourier' && main.args.length >= 1 && main.args.length <= 3

export function fourierItems(main: MathNode, line: number, slot: number, scope: Scope, symbols: SymbolScope): { items: GraphItem[]; colors: number } | null {
  if (!isFourierLine(main) || main.k !== 'fn') return null
  const [f, where, terms] = main.args
  const problem = fourierProblem(where ? [f, where] : [f], symbols, scope)
  if (!problem) throw new MathError('Qui va una funzione di una variabile, come \\operatorname{fourier}(x, [-\\pi, \\pi], 5)')
  // Il numero dei termini, anche con una lettera del blocco (N = 5: con lo slider).
  const N = terms ? Math.round(compile(terms, scope)({})) : 5
  if (!(N >= 0 && N <= 200)) throw new MathError('Il numero dei termini va da 0 a 200')
  const period = problem.b - problem.a
  // Due periodi: quello dell'intervallo e mezzo per parte.
  const extent: [number, number] = [problem.a - period / 2, problem.b + period / 2]
  const name = toLatex(problem.label)
  return {
    items: [
      { kind: 'function', line, label: `${name}\\ \\text{(ripetuta)}`, slot, f: problem.F, dashed: true, extent },
      { kind: 'function', line, label: `S_{${N}}(${problem.v})`, slot: slot + 1, f: partialSum(problem, N), extent },
    ],
    colors: 2,
  }
}
