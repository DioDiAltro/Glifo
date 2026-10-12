import { afterEach, describe, expect, it } from 'vitest'
import { setLangForTests } from '../src/i18n'
import { compile, EMPTY_SCOPE, scopeWith } from '../src/math/evaluate'
import { parseMath } from '../src/math/parse'
import { renderTex } from '../src/render/katex'
import { STOPWORDS, singular, stem, words } from '../src/search/normalize'
import { searchSymbols } from '../src/search/search'
import { suggestCommands } from '../src/search/suggest'
import { CATEGORIES, SYMBOLS, commandNames, symbolById, type SymbolEntry } from '../src/symbols'
import { formPreviewTex, templateText } from '../src/symbols/template'

/**
 * I simboli e la ricerca in inglese: i nomi, le etichette delle varianti e le note di ogni simbolo nelle
 * due lingue, scelte quando si leggono, e la ricerca che trova con tutte e due le lingue, qualunque sia
 * quella di Glifo.
 */

const r = String.raw

afterEach(() => setLangForTests('it'))

/** Quello che `read` dà con Glifo in italiano e in inglese. */
function inBoth<T>(read: () => T): [italian: T, english: T] {
  setLangForTests('it')
  const italian = read()
  setLangForTests('en')
  const english = read()
  setLangForTests('it')
  return [italian, english]
}

/** Le lettere e le elisioni dell'italiano (come in tests/translations.test.ts). */
const NOT_ENGLISH = /[àèìòùÀÈÌÒÙ]|(^|[^a-z])(l|dell|all|nell|dall|sull|un|c)'[a-z]/i

/** Parole dell'italiano che in un testo inglese non ci sono. */
const ITALIAN_WORDS = new Set(
  'il lo la gli le uno una di del dello della dei degli delle dal dalla con per tra fra che non alla nel nella sul sulla sopra sotto'.split(' '),
)

/**
 * Le parole che sono uguali nelle due lingue: lettere greche ed ebraiche, sigle e nomi propri (per
 * «such that (s.t.)» il nome era già inglese). Valgono anche i nomi dei comandi del simbolo e le parole
 * del suo TeX (vee, dashv, lvert…).
 */
const SAME_WORDS = new Set(
  (
    'alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigma tau upsilon phi chi psi ' +
    'omega digamma aleph beth gimel zero argmax argmin modulo mod card exp formula join lollipop pilcrow copyright bra ket ' +
    'such that simpson cholesky jacobi gauss seidel heun runge kutta gram schmidt'
  ).split(' '),
)

function texWords(s: SymbolEntry): Set<string> {
  const tex = [s.cmd, ...s.forms.flatMap((f) => [f.tex, f.preview ?? ''])].join(' ')
  return new Set([...commandNames(s).map((c) => c.toLowerCase()), ...words(tex.replace(/\\/g, ' '))])
}

/** Un testo inglese: non vuoto, senza lettere o parole dell'italiano; uguale all'italiano solo se è di parole comuni alle due lingue. */
function englishProblem(italian: string, en: string | undefined, s: SymbolEntry): string | null {
  if (!en?.trim()) return 'manca l\'inglese'
  if (NOT_ENGLISH.test(en)) return `«${en}» sembra italiano`
  const italianWords = words(en).filter((w) => ITALIAN_WORDS.has(w))
  if (italianWords.length) return `«${en}» ha parole italiane (${italianWords.join(', ')})`
  if (en === italian) {
    const tex = texWords(s)
    const other = words(en).filter((w) => w.length > 2 && !/\d/.test(w) && !SAME_WORDS.has(w) && !tex.has(w))
    if (other.length) return `«${en}» è uguale all'italiano (${other.join(', ')})`
  }
  return null
}

describe('i testi dei simboli in inglese', () => {
  it('le categorie', () => {
    for (const c of CATEGORIES) {
      const [italian, en] = inBoth(() => c.label)
      expect(en, c.id).not.toBe(italian)
      expect(en, c.id).not.toMatch(NOT_ENGLISH)
    }
    setLangForTests('en')
    expect(CATEGORIES.map((c) => c.label).slice(0, 3)).toEqual(['Greek letters', 'Fractions, powers, roots', 'Operators'])
  })

  it('ogni simbolo ha il nome inglese', () => {
    const problems: string[] = []
    for (const s of SYMBOLS) {
      const [italian, en] = inBoth(() => s.name)
      expect(s.names, s.id).toEqual([italian, en])
      const problem = englishProblem(italian, en, s)
      if (problem) problems.push(`${s.id}: ${problem}`)
    }
    expect(problems).toEqual([])
  })

  it('ogni etichetta delle varianti e ogni nota ha l\'inglese', () => {
    const problems: string[] = []
    let labels = 0
    for (const s of SYMBOLS) {
      const [itLabels, enLabels] = inBoth(() => s.forms.map((f) => f.label))
      itLabels.forEach((italian, i) => {
        if (!italian) return expect(enLabels[i], s.id).toBeFalsy()
        labels++
        const problem = englishProblem(italian, enLabels[i], s)
        if (problem) problems.push(`${s.id}, variante ${i}: ${problem}`)
      })
      const [itNote, enNote] = inBoth(() => s.note)
      if (!itNote) continue
      const problem = englishProblem(itNote, enNote, s) ?? (enNote === itNote ? 'la nota è uguale' : null)
      if (problem) problems.push(`${s.id}, nota: ${problem}`)
    }
    expect(problems).toEqual([])
    expect(labels).toBeGreaterThan(250)
  })

  it('le parole chiave inglesi non sono italiane', () => {
    for (const s of SYMBOLS) for (const k of s.keywordsByLang[1]) expect(k, s.id).not.toMatch(NOT_ENGLISH)
  })

  it('i testi si leggono nella lingua di Glifo quando si usano', () => {
    const sum = symbolById(r`\sum`)!
    expect(inBoth(() => sum.name)).toEqual(['sommatoria', 'summation'])
    expect(inBoth(() => sum.forms[1].label)).toEqual(['con estremi', 'with limits'])
    expect(inBoth(() => sum.note)).toEqual([
      r`In una formula in linea gli estremi vanno di lato: usa \limits per metterli sopra e sotto.`,
      r`In an inline formula the limits go to the side: use \limits to put them above and below.`,
    ])
    expect(inBoth(() => CATEGORIES[0].label)).toEqual(['Lettere greche', 'Greek letters'])
    expect(inBoth(() => symbolById(r`\alpha`)!.name)).toEqual(['alfa', 'alpha'])
    expect(inBoth(() => symbolById(r`\nabla`)!.name)).toEqual(['nabla (gradiente)', 'nabla (gradient)'])
  })

  it('in inglese le formule restano valide per KaTeX', () => {
    setLangForTests('en')
    const errors: string[] = []
    for (const s of SYMBOLS) {
      for (const f of s.forms) {
        const preview = renderTex(formPreviewTex(f), !!s.display, true)
        if (preview.error) errors.push(`${s.id} → ${f.preview ?? f.tex}: ${preview.error}`)
        if (s.fragment) continue
        const inserted = renderTex(templateText(f.tex), !!s.display)
        if (inserted.error) errors.push(`${s.id} → ${f.tex}: ${inserted.error}`)
      }
    }
    expect(errors).toEqual([])
  })
})

describe('quello che i simboli mettono nella nota', () => {
  it('«se» e «altrimenti» nella lingua di Glifo', () => {
    expect(inBoth(() => symbolById('text-se')!.forms[0].tex)).toEqual([r`\text{ se }`, r`\text{ if }`])
    expect(inBoth(() => symbolById('text-se')!.cmd)).toEqual([r`\text{ se }`, r`\text{ if }`])
    expect(inBoth(() => symbolById('text-else')!.forms[0].tex)).toEqual([r`\text{altrimenti}`, r`\text{otherwise}`])
    const [italian, en] = inBoth(() => symbolById('cases')!.forms[0].tex)
    expect(italian).toBe(r`\begin{cases} # & \text{se } # \\ # & \text{altrimenti} \end{cases}`)
    expect(en).toBe(r`\begin{cases} # & \text{if } # \\ # & \text{otherwise} \end{cases}`)
  })

  it('la funzione a tratti in inglese si calcola come quella in italiano', () => {
    setLangForTests('en')
    const parts = ['x^2', 'x < 0', 'x']
    const filled = symbolById('cases')!.forms[0].tex.replace(/#/g, () => parts.shift()!)
    const f = compile(parseMath(filled), scopeWith(EMPTY_SCOPE, ['x']))
    expect(f({ x: -2 })).toBe(4)
    expect(f({ x: 3 })).toBe(3)
  })

  it('le anteprime: il punto per i decimali e le parole in inglese', () => {
    expect(inBoth(() => symbolById('sci')!.forms[0].preview)).toEqual([r`6{,}02 \times 10^{23}`, r`6.02 \times 10^{23}`])
    expect(inBoth(() => symbolById('units')!.forms[0].preview)).toEqual([r`9{,}81\,\mathrm{m/s^2}`, r`9.81\,\mathrm{m/s^2}`])
    expect(inBoth(() => symbolById('confidence')!.forms[0].preview)).toEqual([r`\operatorname{ic}(x, 0{,}95)`, r`\operatorname{ic}(x, 0.95)`])
    expect(inBoth(() => symbolById(r`\text{#}`)!.forms[0].preview)).toEqual([r`\text{testo}`, r`\text{text}`])
    // Le parole che il motore legge restano italiane, per ora: \operatorname{ic}, \operatorname{eulero}…
    expect(inBoth(() => symbolById('eulermethod')!.forms[0].tex)).toEqual([r`\operatorname{eulero}(#, #, #, #)`, r`\operatorname{eulero}(#, #, #, #)`])
  })
})

describe('la normalizzazione per l\'inglese', () => {
  it('il plurale con la s', () => {
    expect(singular('integrals')).toBe('integral')
    expect(singular('sets')).toBe('set')
    expect(singular('matrices')).toBe('matrice')
    for (const w of ['gauss', 'minus', 'plus', 'cos', 'frecce', 'integrale']) expect(singular(w), w).toBe(w)
    expect(stem('matrices')).toBe(stem('matrice'))
    expect(stem('arrows')).toBe(stem('arrow'))
    expect(stem('frecce')).toBe('frecc')
  })

  it('le parole vuote inglesi', () => {
    for (const w of ['the', 'of', 'a', 'to', 'how', 'write', 'symbol', 'for', 'is', 'there']) expect(STOPWORDS.has(w), w).toBe(true)
    // Queste invece contano: «logical and», «not equal», «less than».
    for (const w of ['and', 'or', 'not', 'than', 'equal', 'sum']) expect(STOPWORDS.has(w), w).toBe(false)
  })
})

const top = (q: string) => searchSymbols(q)[0]?.entry.id
const topN = (q: string, n = 3) => searchSymbols(q).slice(0, n).map((x) => x.entry.id)

describe('la ricerca in inglese', () => {
  const ENGLISH: [string, string][] = [
    ['integral', r`\int`],
    ['integrals', r`\int`],
    ['square root', r`\sqrt`],
    ['greater than or equal', r`\geq`],
    ['greater than or equal to', r`\geq`],
    ['less than or equal', r`\leq`],
    ['right arrow', r`\rightarrow`],
    ['union', r`\cup`],
    ['infinity', r`\infty`],
    ['sum', r`\sum`],
    ['summation', r`\sum`],
    ['alpha', r`\alpha`],
    ['not equal', r`\neq`],
    ['for all', r`\forall`],
    ['there exists', r`\exists`],
    ['element of', r`\in`],
    ['approximately equal', r`\approx`],
    ['double integral', r`\iint`],
    ['empty set', r`\emptyset`],
    ['limit', r`\lim`],
    ['degree', 'degree'],
    ['angle', r`\angle`],
    ['perpendicular', r`\perp`],
    ['parallel', r`\parallel`],
    ['dot product', r`\cdot`],
    ['cross product', r`\times`],
    ['subset', r`\subset`],
    ['intersection', r`\cap`],
    ['implies', r`\implies`],
    ['if and only if', r`\iff`],
    ['fraction', r`\frac`],
    ['fractions', r`\frac`],
    ['derivative', 'deriv'],
    ['derivatives', 'deriv'],
    ['matrix', 'pmatrix2'],
    ['absolute value', 'abs'],
    ['natural logarithm', r`\ln`],
    ['real numbers', r`\mathbb{R}`],
    ['such that', 'st'],
    ['open interval', 'interval-open'],
    ['maps to', r`\mapsto`],
    ['tends to', r`\to`],
    ['end of proof', r`\blacksquare`],
    ['piecewise function', 'cases'],
    ['system of equations', 'system'],
    ['how do I write infinity', r`\infty`],
    ['the symbol for union', r`\cup`],
    ['what is the sign for not equal', r`\neq`],
  ]

  it.each(ENGLISH)('%s → %s, con Glifo in inglese', (query, expected) => {
    setLangForTests('en')
    expect(top(query), query).toBe(expected)
  })

  it.each(ENGLISH.filter(([q]) => !['such that', 'degree', 'derivative', 'derivatives', 'open interval', 'implies'].includes(q)))(
    '%s → %s anche con Glifo in italiano',
    (query, expected) => {
      expect(topN(query), query).toContain(expected)
    },
  )

  it('la derivata parziale', () => {
    for (const lang of ['it', 'en'] as const) {
      setLangForTests(lang)
      expect(topN('partial derivative', 2)).toEqual(expect.arrayContaining([r`\partial`, 'pderiv']))
    }
  })

  it('le parole italiane con Glifo in inglese', () => {
    setLangForTests('en')
    expect(top('radice quadrata')).toBe(r`\sqrt`)
    expect(top('per ogni')).toBe(r`\forall`)
    expect(top('infinito')).toBe(r`\infty`)
    expect(top('integrale')).toBe(r`\int`)
    expect(top("come faccio il simbolo dell'infinito")).toBe(r`\infty`)
  })

  it('a parità vince la lingua di Glifo', () => {
    // «such that» è in tutti e due: in italiano t.c., come prima; in inglese s.t.
    expect(inBoth(() => top('such that'))).toEqual(['tc', 'st'])
  })

  it('ogni simbolo si trova con il suo nome, in tutte e due le lingue', { timeout: 60000 }, () => {
    const missing: string[] = []
    for (const lang of ['it', 'en'] as const) {
      setLangForTests(lang)
      for (const s of SYMBOLS) {
        for (const name of s.names) {
          if (!searchSymbols(name).slice(0, 5).some((x) => x.entry === s)) missing.push(`[${lang}] ${s.id}: «${name}»`)
        }
      }
    }
    expect(missing).toEqual([])
  })
})

describe('i suggerimenti mentre si scrive, con le parole inglesi', () => {
  const first = (p: string) => suggestCommands(p)[0]?.entry.id
  const ids = (p: string, n = 5) => suggestCommands(p).slice(0, n).map((s) => s.entry.id)

  it.each([
    ['root', r`\sqrt`],
    ['squareroot', r`\sqrt`],
    ['infinity', r`\infty`],
    ['integral', r`\int`],
    ['summation', r`\sum`],
    ['forevery', r`\forall`],
    ['union', r`\cup`],
    ['intersection', r`\cap`],
    ['notequal', r`\neq`],
    ['lessorequal', r`\leq`],
    ['greaterorequal', r`\geq`],
    ['approximately', r`\approx`],
    ['degree', 'degree'],
    ['fraction', r`\frac`],
    ['vector', r`\vec{#}`],
    ['thereexists', r`\exists`],
    ['elementof', r`\in`],
    ['absolutevalue', 'abs'],
    ['piecewise', 'cases'],
  ])('\\%s → %s, in tutte e due le lingue', (prefix, expected) => {
    for (const lang of ['it', 'en'] as const) {
      setLangForTests(lang)
      expect(first(prefix), `${lang}: \\${prefix}`).toBe(expected)
    }
  })

  it('\\partialderivative, \\limit: tra i primi anche la derivata parziale e \\lim', () => {
    for (const lang of ['it', 'en'] as const) {
      setLangForTests(lang)
      expect(ids('partialderivative', 2)).toEqual(expect.arrayContaining([r`\partial`, 'pderiv']))
      // Prima il comando \limits, che comincia così.
      expect(ids('limit', 2)).toEqual([r`\limits`, r`\lim`])
    }
  })

  it('le parole italiane funzionano anche con Glifo in inglese', () => {
    setLangForTests('en')
    expect(first('infinito')).toBe(r`\infty`)
    expect(first('radice')).toBe(r`\sqrt`)
    expect(first('perogni')).toBe(r`\forall`)
    expect(ids('somma')).toContain(r`\sum`)
  })

  it('con Glifo in italiano l\'inizio di una parola italiana vince su una parola inglese', () => {
    // «res» (resistività) prima di «resizable»/«result», «tend» (tende a) prima di «tend»…
    expect(first('res')).toBe(r`\rho`)
    expect(first('tend')).toBe(r`\to`)
    expect(first('nota')).toBe('sen')
  })
})
