import { describe, expect, it } from 'vitest'
import { searchSymbols } from '../src/search/search'
import { suggestCommands } from '../src/search/suggest'

const r = String.raw
const top = (q: string) => searchSymbols(q)[0]?.entry.id
const topN = (q: string, n = 3) => searchSymbols(q).slice(0, n).map((x) => x.entry.id)

describe('ricerca a parole', () => {
  it.each([
    ["come faccio il simbolo dell'infinito", r`\infty`],
    ['infinito', r`\infty`],
    ['infinity', r`\infty`],
    ['∞', r`\infty`],
    [r`\infty`, r`\infty`],
    ['infty', r`\infty`],
    ['freccia doppia a destra', r`\Rightarrow`],
    ['per ogni', r`\forall`],
    ['esiste', r`\exists`],
    ['non esiste', r`\nexists`],
    ['appartiene', r`\in`],
    ['non appartiene', r`\notin`],
    ['minore o uguale', r`\leq`],
    ['maggiore uguale', r`\geq`],
    ['diverso', r`\neq`],
    ['circa uguale', r`\approx`],
    ['radice quadrata', r`\sqrt`],
    ['come si fa la radice', r`\sqrt`],
    ['frazione', r`\frac`],
    ['sommatoria', r`\sum`],
    ['integrale', r`\int`],
    ['integrale doppio', r`\iint`],
    ['numeri reali', r`\mathbb{R}`],
    ['insieme dei numeri naturali', r`\mathbb{N}`],
    ['alfa', r`\alpha`],
    ['pi greco', r`\pi`],
    ['insieme vuoto', r`\emptyset`],
    ['unione', r`\cup`],
    ['intersezione', r`\cap`],
    ['limite', r`\lim`],
    ['matrice 3x3', 'pmatrix3'],
    ['sistema di equazioni', 'system'],
    ['funzione a tratti', 'cases'],
    ['valore assoluto', 'abs'],
    ['vettore', r`\vec{#}`],
    ['cappello', r`\hat{#}`],
    ['più o meno', r`\pm`],
    ['tende a', r`\to`],
    ['gradi', 'degree'],
    ['fattoriale', 'factorial'],
    ['elevato alla', 'pow'],
    ['pedice', 'sub'],
    ['puntini', r`\ldots`],
    ['proporzionale', r`\propto`],
    ['perpendicolare', r`\perp`],
    ['se e solo se', r`\iff`],
    ['fine dimostrazione', r`\blacksquare`],
    ['logaritmo naturale', r`\ln`],
    ['seno', r`\sin`],
    ['derivata', 'deriv'],
    ['frecce', r`\to`],
    ['infinto', r`\infty`],
  ])('%s → %s', (query, expected) => {
    expect(topN(query), query).toContain(expected)
    expect(top(query), query).toBe(expected)
  })

  it('restituisce qualcosa per derivata parziale', () => {
    expect(topN('derivata parziale', 2)).toEqual(expect.arrayContaining([r`\partial`]))
  })

  it('scarta i risultati molto deboli', () => {
    const ids = searchSymbols("come faccio il simbolo dell'infinito").map((x) => x.entry.id)
    expect(ids).not.toContain('setbuilder')
  })

  it('distingue e logico / o logico', () => {
    expect(top('e logico')).toBe(r`\land`)
    expect(top('o logico')).toBe(r`\lor`)
  })

  it('trova qualcosa anche con lettere singole', () => {
    expect(topN('R^n', 3)).toContain('Rn')
  })

  it('ignora le ricerche vuote', () => {
    expect(searchSymbols('   ')).toEqual([])
  })
})

describe('suggerimenti mentre si scrive', () => {
  const ids = (p: string, n = 5) => suggestCommands(p).slice(0, n).map((s) => s.entry.id)

  it('trova il comando esatto per primo', () => {
    expect(ids('sum')[0]).toBe(r`\sum`)
    expect(ids('in')[0]).toBe(r`\in`)
    expect(ids('alpha')[0]).toBe(r`\alpha`)
  })

  it('completa i prefissi', () => {
    expect(ids('su')).toContain(r`\sum`)
    expect(ids('alp')[0]).toBe(r`\alpha`)
    expect(ids('fra')[0]).toBe(r`\frac`)
    expect(ids('in', 4)).toEqual(expect.arrayContaining([r`\int`, r`\infty`]))
  })

  it('capisce le parole italiane dopo la barra', () => {
    expect(ids('infinito')[0]).toBe(r`\infty`)
    expect(ids('radice')[0]).toBe(r`\sqrt`)
    expect(ids('perogni')[0]).toBe(r`\forall`)
    expect(ids('somma')).toContain(r`\sum`)
  })

  it('usa gli alias', () => {
    expect(ids('le')[0]).toBe(r`\leq`)
    expect(ids('dfrac')[0]).toBe(r`\frac`)
    expect(ids('pmatrix')).toContain('pmatrix2')
  })

  it('mostra i più usati quando si scrive solo la barra', () => {
    const popular = ids('', 20)
    expect(popular).toContain(r`\frac`)
    expect(popular).toContain(r`\sum`)
  })
})
