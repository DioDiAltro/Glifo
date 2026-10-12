// @vitest-environment jsdom
import katex from 'katex'
import { afterEach, describe, expect, it } from 'vitest'
import { parseSync } from 'vite'
import { EditorState, type TransactionSpec } from '@codemirror/state'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import type { EditorView } from '@codemirror/view'
import { setLangForTests, type Lang } from '../src/i18n'
import { functionWord, functionWordPairs, localizeTex, TEXT_WORDS, textWord } from '../src/noteWords'
import { makeDistribution } from '../src/math/distributions'
import { hypothesisTest } from '../src/math/inference'
import { toLatex } from '../src/math/latex'
import { dataOf, evaluateLinear, EXACT, FLOAT } from '../src/math/linear'
import { logicShown } from '../src/math/logic'
import { numericalShown } from '../src/math/numerical'
import { parseMath, parseStatement, type MathNode } from '../src/math/parse'
import { Sheet } from '../src/math/sheet'
import { statistic } from '../src/math/statistics'
import { mathMarkdown } from '../src/editor/mathSyntax'
import { mathContextAt } from '../src/editor/mathContext'
import { placeholderField } from '../src/editor/placeholders'
import { SuggestionController } from '../src/editor/suggestions'
import { SYMBOLS, type SymbolEntry } from '../src/symbols'
import { openHelpDialog } from '../src/ui/dialogs'
import { fullyParsed } from './support/editorState'

/**
 * Le parole delle formule nelle due lingue (src/noteWords.ts): i nomi delle funzioni
 * (\operatorname{studio} e \operatorname{study}) e le parole di \text{…} (se e if). Le italiane e le
 * inglesi si leggono con Glifo in tutte e due le lingue e danno gli stessi conti; chi scrive nella nota
 * (latex.ts, i simboli del pannello, i suggerimenti, la guida, i messaggi che dicono cosa scrivere) usa
 * quelle della lingua di Glifo, e in italiano scrive come prima. In fondo, i difetti corretti insieme.
 */

const r = String.raw

afterEach(() => {
  setLangForTests('it')
  document.body.replaceChildren()
})

/** Fa la prova con Glifo in italiano e poi in inglese. */
function inBothLanguages(test: (language: Lang) => void): void {
  for (const language of ['it', 'en'] as const) {
    setLangForTests(language)
    test(language)
  }
}

/** Le parole della tavola di verità: le legge src/math/logic.ts, non il lettore delle formule. */
const LOGIC = new Set(['verità', 'tavola', 'fnd', 'fnc'])
const PAIRS = functionWordPairs()
const FUNCTIONS = PAIRS.filter(([it]) => !LOGIC.has(it))
const ITALIAN = new Set(PAIRS.map(([it]) => it))
const ENGLISH = [...new Set(PAIRS.map(([, en]) => en))]
const TO_ENGLISH = new Map(PAIRS)

/** La stessa formula con i nomi inglesi delle funzioni. */
const inEnglish = (tex: string) => tex.replace(/\\operatorname\{([^{}]*)\}/g, (all, name: string) => (TO_ENGLISH.has(name) ? `\\operatorname{${TO_ENGLISH.get(name)}}` : all))

/** I nomi scritti con \operatorname. */
const operatorNames = (tex: string) => [...tex.matchAll(/\\operatorname\*?\{([^{}]*)\}/g)].map((m) => m[1])

/** Il risultato dell'ultima formula, con le formule prima come definizioni. */
function result(...formulas: string[]) {
  const sheet = new Sheet()
  let last = null
  for (const f of formulas) last = sheet.read(f)
  return last?.result ?? null
}

/** Il nome si legge: una funzione, una distribuzione dopo \sim o una richiesta della logica. */
function known(name: string): boolean {
  for (const src of [`\\operatorname{${name}}(x)`, `X \\sim \\operatorname{${name}}(1)`]) {
    try {
      parseMath(src)
      return true
    } catch {
      // Si prova il modo dopo.
    }
  }
  return logicShown(`\\operatorname{${name}}(p \\land q)`) !== null
}

/** Le formule della nota con i nomi italiani (con le definizioni prima): in inglese si scrivono con `inEnglish`. */
const DATA = r`x = (12.1, 11.9, 12.3, 11.8, 12.4)`
const POINTS = ['A = (0, 0)', 'B = (4, 0)', 'C = (0, 3)']
const NOTES: string[][] = [
  // Lo studio di funzione.
  [r`f(x) = \frac{x^2 + 1}{x}`, r`\operatorname{studio}(f) =`],
  [r`\operatorname{dominio}(\ln x) =`],
  [r`\operatorname{asintoti}(\frac{x^2 + 1}{x}) =`],
  [r`\operatorname{estremi}(x^3 - 3x) =`],
  [r`\operatorname{massimi}(x^3 - 3x) =`],
  [r`\operatorname{minimi}(x^3 - 3x) =`],
  [r`\operatorname{flessi}(x^3) =`],
  [r`\operatorname{zeri}(x^2 - 1) =`],
  // La geometria.
  [...POINTS, r`\operatorname{medio}(A, B) =`],
  [...POINTS, r`\operatorname{puntomedio}(A, C) =`],
  [...POINTS, r`\operatorname{retta}(A, B) =`],
  [...POINTS, r`\operatorname{circonferenza}(A, 3) =`],
  [...POINTS, r`\operatorname{cerchio}(A, B, C) =`],
  [...POINTS, r`\operatorname{baricentro}(A, B, C) =`],
  [...POINTS, r`\operatorname{perimetro}(\triangle ABC) =`],
  [...POINTS, r`\operatorname{distanza}(A, B) =`],
  [...POINTS, r`\operatorname{triangolo}(A, B, C) =`],
  [...POINTS, r`r = \operatorname{retta}(A, C)`, r`s = \operatorname{retta}(B, C)`, r`\operatorname{intersezione}(r, s) =`],
  [r`\operatorname{angolo}((1, 0), (1, 2))=`],
  ['P = (0, 0, 0)', 'Q = (1, 0, 0)', 'R = (0, 1, 0)', r`\operatorname{piano}(P, Q, R) =`],
  // Le matrici e l'algebra lineare.
  [r`A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}`, r`\operatorname{rango}(A) =`],
  [r`A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}`, r`\operatorname{traccia}(A) =`],
  [r`A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}`, r`\operatorname{autovalori}(A) =`],
  [r`A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}`, r`\operatorname{autovettori}(A) =`],
  [r`A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}`, r`\operatorname{diagonalizza}(A) =`],
  [r`\operatorname{ortonormalizza}((1, 1), (1, 0)) =`],
  [r`q(x, y) = x^2 + y^2 + xy`, r`\operatorname{segnatura}(q) =`],
  [r`\operatorname{indipendenti}((1, 0), (0, 1)) =`],
  [r`g(x, y) = (x + y, x - y)`, r`\operatorname{matrice}(g) =`],
  [r`v = (1, 0, 0)`, r`U = \operatorname{span}(v)`, r`\operatorname{equazioni}(U) =`],
  [r`W = \operatorname{span}((1, 0, 0), (0, 1, 0))`, r`\operatorname{proiezione}((1, 2, 3), W) =`],
  // I campi, analisi 2, le trasformate.
  [r`f(x, y) = x^2 y`, r`\operatorname{gradiente}(f) =`],
  [r`f(x, y) = x^2 y`, r`\operatorname{hessiana}(f) =`],
  [r`F(x, y) = (-y, x)`, r`\operatorname{rotore}(F) =`],
  [r`\operatorname{critici}(x^2 - y^2) =`],
  [r`\operatorname{stazionari}(x^2 + y^2) =`],
  [r`\operatorname{vincolati}(x + y, x^2 + y^2 = 1) =`],
  [r`\operatorname{conica}(x^2 + 4y^2 = 4) =`],
  [r`\operatorname{quadrica}(x^2 + y^2 - z^2 = 1) =`],
  [r`\operatorname{antilaplace}(\frac{1}{s^2 + 1}) =`],
  // Il calcolo numerico.
  [r`\operatorname{bisezione}(x^3 - x - 2, [1, 2]) =`],
  [r`\operatorname{secanti}(x^2 - 2, 1, 2) =`],
  [r`\operatorname{puntofisso}(\cos x, 1) =`],
  [r`\operatorname{interpola}((0, 1), (1, 3), (2, 2)) =`],
  [r`\operatorname{minimiquadrati}((0, 1), (1, 3), (2, 2)) =`],
  [r`\operatorname{rettangoli}(x^2, [0, 1], 10) =`],
  [r`\operatorname{trapezi}(e^{x^2}, [0, 1], 4) =`],
  [r`\operatorname{norma}(\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}, \infty) =`],
  [r`\operatorname{eulero}(y' = x + y, y(0) = 1, 0.1, 5) =`],
  // La statistica inferenziale.
  [DATA, r`\operatorname{ic}(x, 0.95) =`],
  [DATA, r`\operatorname{icvarianza}(x, 0.95) =`],
  [r`\operatorname{chiquadro}((18, 22, 20, 40), (0.25, 0.25, 0.25, 0.25)) =`],
  // L'aritmetica, i polinomi e gli insiemi.
  [r`\operatorname{fattori}(360) =`],
  [r`\operatorname{scomponi}(x^3 - x) =`],
  [r`\operatorname{divisori}(12) =`],
  [r`\operatorname{primo}(97) =`],
  [r`\operatorname{euclide}(252, 198) =`],
  [r`\operatorname{inverso}(3, 7) =`],
  [r`\operatorname{diofantea}(3x + 5y = 7) =`],
  [r`\operatorname{binario}(11) =`],
  [r`\operatorname{esadecimale}(255) =`],
  [r`\operatorname{sviluppa}((x + 1)^3) =`],
  [r`\operatorname{divisione}(17, 5) =`],
  [r`\operatorname{totiente}(12) =`],
  [r`\operatorname{mcm}(4, 6) =`],
  [r`A = \{1, 2\}`, r`\operatorname{parti}(A) =`],
  // La statistica dei dati.
  [DATA, r`\operatorname{media}(x) =`],
  [DATA, r`\operatorname{mediana}(x) =`],
  [r`\operatorname{moda}((1, 1, 2, 2, 3)) =`],
  [DATA, r`\operatorname{varianza}(x) =`],
  [DATA, r`\operatorname{varc}(x) =`],
  [DATA, r`\operatorname{sqm}(x) =`],
  [DATA, r`\operatorname{sqmc}(x) =`],
  [DATA, r`\operatorname{devst}(x) =`],
  [DATA, r`\operatorname{quartili}(x) =`],
  [DATA, r`y = (1, 2, 2, 4, 5)`, r`\operatorname{covarianza}(x, y) =`],
  [DATA, r`y = (1, 2, 2, 4, 5)`, r`\operatorname{correlazione}(x, y) =`],
  [DATA, r`y = (1, 2, 2, 4, 5)`, r`\operatorname{regressione}(x, y) =`],
  [DATA, r`\operatorname{statistiche}(x) =`],
  [DATA, r`\operatorname{frequenze}(x) =`],
  [DATA, r`\operatorname{frequenza}(x) =`],
  [DATA, r`\operatorname{campo}(x) =`],
  // La logica.
  [r`\operatorname{verità}(p \land q) =`],
  [r`\operatorname{tavola}(p \lor q) =`],
  [r`\operatorname{fnd}(p \Rightarrow q) =`],
  [r`\operatorname{fnc}(p \Rightarrow q) =`],
]

describe('i nomi delle funzioni nelle due lingue', () => {
  it('ogni nome inglese si legge come quello italiano, e quello italiano si legge ancora, con Glifo in tutte e due le lingue', () => {
    inBothLanguages((language) => {
      for (const [it, en] of FUNCTIONS) {
        const italian = parseMath(`\\operatorname{${it}}(x)`)
        expect(italian, `${language}: ${it}`).toMatchObject({ k: 'fn' })
        expect(parseMath(`\\operatorname{${en}}(x)`), `${language}: ${en}`).toEqual(italian)
      }
      // Anche con \text{…}, come il lettore legge i nomi delle funzioni.
      expect(parseMath(r`\text{study}(f)`)).toEqual(parseMath(r`\operatorname{studio}(f)`))
    })
  })

  it('i conti con i nomi inglesi danno quello che danno i nomi italiani', () => {
    inBothLanguages((language) => {
      for (const note of NOTES) {
        const italian = result(...note)
        expect(italian, `${language}: ${note.join(' | ')}`).not.toBeNull()
        expect(result(...note.map(inEnglish)), `${language}: ${note.map(inEnglish).join(' | ')}`).toEqual(italian)
      }
    })
  })

  it('lo studio di funzione, il dominio e l\'intervallo di confidenza scritti in inglese', () => {
    setLangForTests('en')
    expect(result(r`f(x) = \frac{x^2 + 1}{x}`, r`\operatorname{study}(f) =`)?.text).toMatch(/^Domain: x ≠ 0\. Symmetry: odd\./)
    expect(result(r`\operatorname{domain}(\ln x) =`)?.text).toBe('x > 0')
    expect(result(DATA, r`\operatorname{ci}(x, 0.95) =`)?.text).toMatch(/^\[11\.\d+, 12\.\d+\] \(95%: 12\.1 ± 0\.\d+, t\(4\) = 2\.7764\)$/)
    setLangForTests('it')
    expect(result(r`f(x) = \frac{x^2 + 1}{x}`, r`\operatorname{study}(f) =`)?.text).toMatch(/^Dominio: x ≠ 0\. Simmetria: dispari\./)
    expect(result(r`\operatorname{domain}(\ln x) =`)?.text).toBe('x > 0')
    expect(result(DATA, r`\operatorname{ci}(x, 0.95) =`)?.text).toMatch(/^\[11,\d+; 12,\d+\] \(95%: 12,1 ± 0,\d+, t\(4\) = 2,7764\)$/)
  })

  it('una nota italiana di prima dà quello che dava prima', () => {
    const note = [
      ...POINTS,
      r`\operatorname{medio}(A, B) =`,
      r`\operatorname{retta}(A, B) =`,
      r`\operatorname{perimetro}(\triangle ABC) =`,
      r`\operatorname{fattori}(360) =`,
      r`\operatorname{primo}(97) =`,
      r`\operatorname{divisori}(12) =`,
      r`f(x) = \begin{cases} x^2 & x > 0 \\ 0 & \text{altrimenti} \end{cases}`,
      r`f(-1) =`,
      r`\operatorname{verità}(p \land q) =`,
      r`\operatorname{rettangoli}(x^2, [0, 1], 10) =`,
    ]
    const sheet = new Sheet()
    const texts = note.map((f) => sheet.read(f).result?.text ?? null)
    expect(texts.filter((t) => t !== null)).toEqual([
      '(2, 0)',
      'y = 0',
      '12',
      '2³ · 3² · 5',
      'sì, 97 è primo',
      '1, 2, 3, 4, 6, 12 (6 divisori)',
      '0',
      'vera in 1 caso su 4; p ∧ q: V F F F',
      '≈ 0,3325 (punto medio, n = 10; errore ≈ 0,000833)',
    ])
  })

  it('la tavola di verità e le forme normali si chiedono anche in inglese', () => {
    inBothLanguages(() => {
      expect(logicShown(r`\operatorname{truth}(p \land q)`)).toEqual(logicShown(r`\operatorname{verità}(p \land q)`))
      expect(logicShown(r`\operatorname{truthtable}(p \land q)`)).toEqual(logicShown(r`\operatorname{tavola}(p \land q)`))
      expect(logicShown(r`\operatorname{dnf}(p \Rightarrow q)`)).toEqual(logicShown(r`\operatorname{fnd}(p \Rightarrow q)`))
      expect(logicShown(r`\operatorname{cnf}(p \Rightarrow q)`)).toEqual(logicShown(r`\operatorname{fnc}(p \Rightarrow q)`))
      expect(logicShown(r`\operatorname{truth}(p \land q)`)).not.toBeNull()
    })
  })

  it('nessuna ambiguità: un nome inglese non è un comando del LaTeX con un altro significato, né un\'altra parola delle formule', () => {
    const katexKnows = (tex: string) => {
      try {
        katex.renderToString(tex, { throwOnError: true })
        return true
      } catch {
        return false
      }
    }
    // \angle, \triangle e \gcd ci sono, ma vogliono dire proprio l'angolo, il triangolo e il mcd.
    expect(ENGLISH.filter((en) => katexKnows(`\\${en}`) || katexKnows(`\\${en}{x}`)).sort()).toEqual(['angle', 'gcd', 'triangle'])
    // Non \prime (f^{\prime}), \bar o \matrix.
    for (const word of ['prime', 'bar', 'matrix']) expect(ENGLISH).not.toContain(word)
    const textWords = Object.values(TEXT_WORDS).flatMap((words) => Object.entries(words).flat())
    expect(ENGLISH.filter((en) => textWords.includes(en) || en === 'else')).toEqual([])
    // midpoint è il punto medio di un segmento; la regola del punto medio negli integrali è rectangles.
    expect(parseMath(r`\operatorname{midpoint}(A, B)`)).toEqual(parseMath(r`\operatorname{medio}(A, B)`))
    expect(parseMath(r`\operatorname{rectangles}(f, [0, 1], 4)`)).toEqual(parseMath(r`\operatorname{rettangoli}(f, [0, 1], 4)`))
    expect(parseMath(r`\operatorname{midpoint}(f, [0, 1], 4)`)).not.toEqual(parseMath(r`\operatorname{rettangoli}(f, [0, 1], 4)`))
    // norm è anche la normale dopo \sim, come prima.
    inBothLanguages(() => expect(result(r`X \sim \operatorname{norm}(0, 1)`, r`P(X < 0) =`)?.text).toMatch(/^0[,.]5$/))
  })
})

describe('le parole di \\text{…} nelle due lingue', () => {
  it('l\'italiano e l\'inglese si leggono uguali, con Glifo in tutte e due le lingue', () => {
    inBothLanguages(() => {
      const cases = (word: string) => parseMath(`\\begin{cases} x & x > 0 \\\\ 0 & \\text{${word}} \\end{cases}`)
      for (const [it, en] of Object.entries(TEXT_WORDS.otherwise)) expect(cases(en)).toEqual(cases(it))
      expect(cases('else')).toEqual(cases('altrimenti'))
      expect(cases('elsewhere')).toEqual(cases('altrimenti'))
      for (const [it, en] of Object.entries(TEXT_WORDS.condition)) {
        expect(parseStatement(`y = x^2 \\text{ ${en} } x > 0`)).toEqual(parseStatement(`y = x^2 \\text{ ${it} } x > 0`))
      }
      for (const [it, en] of Object.entries({ ...TEXT_WORDS.and, ...TEXT_WORDS.or })) {
        expect(parseMath(`\\{x : x > 0 \\text{ ${en} } x < 2\\}`)).toEqual(parseMath(`\\{x : x > 0 \\text{ ${it} } x < 2\\}`))
      }
      // La densità di probabilità «0 elsewhere», come i libri inglesi.
      expect(result(r`f(x) = \begin{cases} 2x & 0 < x < 1 \\ 0 & \text{elsewhere} \end{cases}`, r`f(3) =`)?.text).toBe('0')
    })
  })

  it('textWord: la parola nella lingua di Glifo', () => {
    expect(textWord('altrimenti')).toBe('altrimenti')
    expect(textWord('se')).toBe('se')
    setLangForTests('en')
    expect(textWord('altrimenti')).toBe('otherwise')
    expect(textWord('se')).toBe('if')
    expect(textWord('altrove')).toBe('elsewhere')
  })
})

describe('chi scrive nella nota usa le parole della lingua di Glifo', () => {
  const write = (src: string) => toLatex(parseMath(src))

  it('latex.ts: in italiano come prima, in inglese con i nomi inglesi', () => {
    const cases = r`\begin{cases} 1 & x > 0 \\ 0 & \text{altrimenti} \end{cases}`
    const triangle = r`\operatorname{triangle}((0, 0), (4, 0), (0, 3))`
    expect(write(r`\operatorname{studio}(f)`)).toBe(r`\operatorname{studio} f`)
    expect(write(r`\operatorname{ic}(x, 0.95)`)).toBe(r`\operatorname{ic}\left(x, 0.95\right)`)
    expect(write(r`\operatorname{medio}(A, B)`)).toBe(r`\operatorname{medio}\left(A, B\right)`)
    expect(write(triangle)).toBe(r`\operatorname{triangolo}\left(\left(0, 0\right), \left(4, 0\right), \left(0, 3\right)\right)`)
    expect(write(r`\operatorname{rotore}(F)`)).toBe(r`\operatorname{rot} F`)
    expect(write(r`\operatorname{mcm}(4, 6)`)).toBe(r`\operatorname{mcm}\left(4, 6\right)`)
    expect(write(r`\operatorname{sqmc}(x)`)).toBe(r`\operatorname{sqm}_{c}\left(x\right)`)
    expect(write(r`\operatorname{varc}(x)`)).toBe(r`\operatorname{Var}_{c}\left(x\right)`)
    expect(write(r`\operatorname{critici}(f)`)).toBe(r`\operatorname{critical} f`)
    expect(write(cases)).toBe(cases)
    expect(write(r`\{x : x < 0 \lor x > 2\}`)).toBe(r`\left\{ x : x < 0\ \text{o}\ x > 2 \right\}`)
    setLangForTests('en')
    expect(write(r`\operatorname{studio}(f)`)).toBe(r`\operatorname{study} f`)
    expect(write(r`\operatorname{ic}(x, 0.95)`)).toBe(r`\operatorname{ci}\left(x, 0.95\right)`)
    expect(write(r`\operatorname{medio}(A, B)`)).toBe(r`\operatorname{midpoint}\left(A, B\right)`)
    expect(write(triangle)).toBe(r`\operatorname{triangle}\left(\left(0, 0\right), \left(4, 0\right), \left(0, 3\right)\right)`)
    expect(write(r`\operatorname{rotore}(F)`)).toBe(r`\operatorname{curl} F`)
    expect(write(r`\operatorname{mcm}(4, 6)`)).toBe(r`\operatorname{lcm}\left(4, 6\right)`)
    expect(write(r`\operatorname{sqmc}(x)`)).toBe(r`\operatorname{sd}_{s}\left(x\right)`)
    expect(write(r`\operatorname{varc}(x)`)).toBe(r`\operatorname{Var}_{s}\left(x\right)`)
    expect(write(r`\operatorname{flessi}(f)`)).toBe(r`\operatorname{inflections} f`)
    expect(write(r`\operatorname{autovalori}(A)`)).toBe(r`\operatorname{eigenvalues} A`)
    expect(write(cases)).toBe(r`\begin{cases} 1 & x > 0 \\ 0 & \text{otherwise} \end{cases}`)
    expect(write(r`\{x : x < 0 \lor x > 2\}`)).toBe(r`\left\{ x : x < 0\ \text{or}\ x > 2 \right\}`)
  })

  it('quello che latex.ts scrive si rilegge come la funzione di prima, in tutte e due le lingue', () => {
    // Scritti con un simbolo (\Delta f, H_f, J_F, \varphi(n), \mathcal{P}(A)) o con il pedice delle statistiche
    // campionarie (\operatorname{Var}_{c}), che si mostra soltanto: non si rileggono come funzioni, come prima.
    const notWords = new Set(['lap', 'hess', 'jac', 'totient', 'powerset', 'svar', 'ssd'])
    inBothLanguages((language) => {
      for (const [it] of FUNCTIONS) {
        const node = parseMath(`\\operatorname{${it}}(a, b)`) as Extract<MathNode, { k: 'fn' }>
        if (notWords.has(node.name)) continue
        const tex = toLatex(node)
        expect(parseMath(tex), `${language}: ${it} → ${tex}`).toMatchObject({ k: 'fn', name: node.name })
      }
    })
  })

  it('functionWord: il nome nella lingua di Glifo', () => {
    expect(functionWord('studio')).toBe('studio')
    expect(functionWord('taylor')).toBe('taylor')
    setLangForTests('en')
    expect(functionWord('studio')).toBe('study')
    expect(functionWord('ic')).toBe('ci')
    expect(functionWord('taylor')).toBe('taylor')
    expect(functionWord('constructor')).toBe('constructor')
  })

  it('localizeTex: i simboli del pannello con le parole della lingua di Glifo', () => {
    const tex = r`\operatorname{studio}(#) + \operatorname{verità}(#) + \begin{cases} # & \text{se } # \\ # & \text{altrimenti} \end{cases}`
    expect(localizeTex(tex)).toBe(tex)
    setLangForTests('en')
    expect(localizeTex(r`\operatorname{studio}(#)`)).toBe(r`\operatorname{study}(#)`)
    expect(localizeTex(r`\operatorname{ic}(\hat{p} = #, n = #, #)`)).toBe(r`\operatorname{ci}(\hat{p} = #, n = #, #)`)
    expect(localizeTex(r`\operatorname{verità}(p \land q \Rightarrow p)`)).toBe(r`\operatorname{truth}(p \land q \Rightarrow p)`)
    expect(localizeTex(r`\operatorname{mcm}`)).toBe(r`\operatorname{lcm}`)
    expect(localizeTex(r`\operatorname*{critici}_{#}`)).toBe(r`\operatorname*{critical}_{#}`)
    expect(localizeTex(r`\begin{cases} # & \text{se } # \\ # & \text{altrimenti} \end{cases}`)).toBe(r`\begin{cases} # & \text{if } # \\ # & \text{otherwise} \end{cases}`)
    expect(localizeTex(r`\text{ se }`)).toBe(r`\text{ if }`)
    // Restano: le notazioni italiane (sen, tg), i nomi uguali nelle due lingue, gli altri testi.
    for (const same of [r`\operatorname{sen}(#)`, r`\operatorname{tg}`, r`\operatorname*{arg\,max}_{#}`, r`\operatorname{test}(#, #)`, r`\operatorname{Var}(#)`, r`\operatorname{ruffini}(#, #)`, r`\text{testo}`, r`\textbf{se}`, r`\operatorname{constructor}`]) {
      expect(localizeTex(same)).toBe(same)
    }
  })

  it('i simboli del catalogo, con Glifo in inglese, non hanno nomi italiani e si leggono ancora', () => {
    setLangForTests('en')
    const forms = SYMBOLS.flatMap((entry) => entry.forms.flatMap((form) => [form.tex, form.preview ?? '']))
    let changed = 0
    for (const tex of forms) {
      const localized = localizeTex(tex)
      if (localized !== tex) changed++
      expect(operatorNames(localized).filter((name) => ITALIAN.has(name)), tex).toEqual([])
      for (const name of operatorNames(tex)) if (known(name)) expect(known(functionWord(name)), `${tex}: ${name}`).toBe(true)
    }
    expect(changed).toBeGreaterThan(30)
    expect(forms.map(localizeTex)).toContain(r`\begin{cases} # & \text{if } # \\ # & \text{otherwise} \end{cases}`)
  })

  it('i suggerimenti mentre si scrive \\… mettono nella nota i nomi della lingua di Glifo', () => {
    const typed = (language: Lang): string => {
      setLangForTests(language)
      const doc = r`$\crit$`
      const view = {
        state: fullyParsed(EditorState.create({ doc, selection: { anchor: 6 }, extensions: [markdown({ base: markdownLanguage, extensions: [mathMarkdown] }), placeholderField] })),
        dispatch(...specs: TransactionSpec[]) {
          this.state = this.state.update(...specs).state
        },
        focus() {},
      }
      const s = new SuggestionController(() => view as unknown as EditorView, () => true)
      s.update(mathContextAt(view.state, 6), view.state)
      // Il simbolo dei punti critici, come nel catalogo (scritto con il nome italiano).
      const form = { tex: r`\operatorname{critici}(#)` }
      s.items = [{ entry: { display: false, forms: [form] } as unknown as SymbolEntry, form, formIndex: 0 }]
      expect(s.pick(0)).toBe(true)
      return view.state.doc.toString()
    }
    expect(typed('it')).toBe(r`$\operatorname{critici}()$`)
    expect(typed('en')).toBe(r`$\operatorname{critical}()$`)
  })
})

describe('la guida', () => {
  // jsdom non ha showModal.
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '')
  }

  /** Gli esempi della guida (`code`), con Glifo nella lingua data. */
  function guideCode(language: Lang): string[] {
    setLangForTests(language)
    const dialog = openHelpDialog()
    const code = [...dialog.querySelectorAll('code')].map((c) => c.textContent ?? '')
    dialog.remove()
    return code
  }

  it('in inglese gli esempi hanno i nomi inglesi, i decimali con il punto e le parole inglesi dei grafici', () => {
    const code = guideCode('en')
    const names = code.flatMap(operatorNames)
    expect(names.length).toBeGreaterThan(60)
    expect(names.filter((name) => ITALIAN.has(name))).toEqual([])
    expect(code.filter((c) => /\d\{,\}\d/.test(c))).toEqual([])
    for (const name of new Set(names)) expect(known(name), name).toBe(true)
    for (const example of [r`\operatorname{study}(f) =`, r`\operatorname{domain}`, r`\operatorname{ci}(x, 0.95) =`, r`\operatorname{midpoint}(A, B) =`, r`\operatorname{truth}(p \land q \Rightarrow p) =`, '```graph', 'title: …', 'x axis: time $t$ (s)']) {
      expect(code).toContain(example)
    }
    expect(code.filter((c) => /```grafico|titolo:|asse x:/.test(c))).toEqual([])
  })

  it('in italiano la guida è quella di prima', () => {
    const code = guideCode('it')
    for (const example of [r`\operatorname{studio}(f) =`, r`\operatorname{ic}(x, 0{,}95) =`, r`\operatorname{medio}(A, B) =`, '```grafico', 'titolo: …', 'asse x: tempo $t$ (s)']) {
      expect(code).toContain(example)
    }
  })
})

describe('i messaggi che dicono che cosa scrivere', () => {
  it('citano i nomi nella lingua di Glifo', () => {
    const scope = new Sheet().linearScope()
    const numeric = (src: string) => () => numericalShown(parseMath(src), new Sheet().numericContext({ comma: false, decimal: false, digits: 10 }))
    const linear = (src: string) => () => evaluateLinear(parseMath(src), scope, FLOAT)
    const modes = () => statistic(FLOAT, 'mode', { values: [1, 1, 2, 2, 3], weights: null })
    expect(numeric(r`\operatorname{secanti}(x^2 - 2, 1)`)).toThrow(r`Si scrive \operatorname{secanti}(f, x_0, x_1)`)
    expect(numeric(r`\operatorname{puntofisso}(x)`)).toThrow(r`Si scrive \operatorname{puntofisso}(g, x_0): x_{k+1} = g(x_k)`)
    expect(numeric(r`\operatorname{eulero}(y' = y)`)).toThrow(r`Si scrive \operatorname{eulero}(y' = x + y, y(0) = 1, h, n)`)
    expect(() => dataOf([])).toThrow(r`o uno per uno: \operatorname{media}(2, 3, 5, 7)`)
    expect(linear(r`\operatorname{quartili}((1, 2))`)).toThrow(r`\operatorname{quartili}(x) =`)
    expect(linear(r`\operatorname{proiezione}((1, 2))`)).toThrow(r`Si scrive \operatorname{proiezione}(v, U)`)
    expect(linear(r`\operatorname{autovalori}((1, 2))`)).toThrow(r`Gli autovalori si chiedono da soli: \operatorname{autovalori}(A) =`)
    expect(modes).toThrow(r`chiedile da sole, \operatorname{moda}(x) =`)
    setLangForTests('en')
    expect(numeric(r`\operatorname{secant}(x^2 - 2, 1)`)).toThrow(r`Write \operatorname{secant}(f, x_0, x_1)`)
    expect(numeric(r`\operatorname{fixedpoint}(x)`)).toThrow(r`Write \operatorname{fixedpoint}(g, x_0): x_{k+1} = g(x_k)`)
    expect(numeric(r`\operatorname{euler}(y' = y)`)).toThrow(r`Write \operatorname{euler}(y' = x + y, y(0) = 1, h, n)`)
    expect(() => dataOf([])).toThrow(r`or one by one: \operatorname{mean}(2, 3, 5, 7)`)
    expect(linear(r`\operatorname{quartiles}((1, 2))`)).toThrow(r`\operatorname{quartiles}(x) =`)
    expect(linear(r`\operatorname{projection}((1, 2))`)).toThrow(r`Write \operatorname{projection}(v, U)`)
    expect(linear(r`\operatorname{eigenvalues}((1, 2))`)).toThrow(r`Ask for the eigenvalues on their own: \operatorname{eigenvalues}(A) =`)
    expect(modes).toThrow(r`ask for them on their own, \operatorname{mode}(x) =`)
  })

  it('nei testi inglesi di src/math, del pannello e dell\'editor non ci sono nomi italiani né la virgola dei decimali', () => {
    const sources = import.meta.glob(['../src/math/*.ts', '../src/noteWords.ts', '../src/ui/sidePanel.ts', '../src/editor/*.ts'], {
      query: '?raw',
      import: 'default',
      eager: true,
    }) as Record<string, string>
    const problems: string[] = []
    for (const [path, code] of Object.entries(sources)) {
      for (const text of englishTexts(code)) {
        const italian = operatorNames(text).filter((name) => ITALIAN.has(name))
        if (italian.length || /\d\{,\}\d/.test(text)) problems.push(`${path}: ${text}`)
      }
    }
    expect(problems).toEqual([])
  })
})

describe('i difetti corretti insieme', () => {
  it('\\operatorname{triangolo}, come lo scrive latex.ts, si legge', () => {
    inBothLanguages(() => {
      expect(parseMath(r`\operatorname{triangolo}((0, 0), (4, 0), (0, 3))`)).toEqual(parseMath(r`\operatorname{triangle}((0, 0), (4, 0), (0, 3))`))
      expect(result(r`\operatorname{triangolo}((0, 0), (4, 0), (0, 3)) =`)?.text).toBe('6')
    })
  })

  it('le equazioni di un sottospazio, quando sono più di una, si separano con \\quad (non con «quad»)', () => {
    inBothLanguages(() => {
      expect(result(r`v = (1, 0, 0)`, r`U = \operatorname{span}(v)`, r`\operatorname{equazioni}(U) =`)).toEqual({ tex: r`y = 0,\quad z = 0`, text: 'y = 0, z = 0' })
    })
  })

  it('in inglese un\'equazione impossibile è «inconsistent», come i sistemi', () => {
    expect(result(r`x + 1 = x \Rightarrow`)?.text).toBe('nessuna soluzione (impossibile)')
    setLangForTests('en')
    expect(result(r`x + 1 = x \Rightarrow`)?.text).toBe('no solution (inconsistent)')
    expect(result(r`x + y = 1, \; x + y = 2 \Rightarrow`)?.text).toBe('no solution (inconsistent)')
  })

  it('l\'italiano dei messaggi: sottraggono, 1 divisore, i gradi di libertà sono, «=, >», 1 passo', () => {
    const scope = new Sheet().linearScope()
    expect(() => evaluateLinear(parseMath(r`\begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix} - (1, 2, 3)`), scope, EXACT)).toThrow(
      'Si sottraggono matrici della stessa misura (2 × 2 e 3 × 1)',
    )
    expect(result(r`\operatorname{divisori}(1) =`)?.text).toBe('1 (1 divisore)')
    expect(result(r`\operatorname{divisori}(12) =`)?.text).toBe('1, 2, 3, 4, 6, 12 (6 divisori)')
    for (const family of ['student', 'chi2'] as const) expect(() => makeDistribution(family, [-1])).toThrow('I gradi di libertà sono un numero positivo')
    expect(() => makeDistribution('poisson', [-1])).toThrow('λ è un numero positivo')
    const args = (parseMath(r`\operatorname{test}(\bar{x} \approx 10, s = 2, n = 30, \mu > 9)`) as Extract<MathNode, { k: 'fn' }>).args
    expect(() => hypothesisTest(args, new Sheet().inferenceContext())).toThrow('Qui va =, >, < o \\ne')
    expect(result(r`\operatorname{newton}(x - 2, 1) =`)?.text).toBe('x ≈ 2 (1 passo) (passi: 0 1 −1 1; 1 2 0 1)')
    expect(result(r`\operatorname{newton}(x^2 - 2, 1) =`)?.text).toMatch(/^x ≈ 1,41421356237 \(5 passi\) /)
    setLangForTests('en')
    expect(result(r`\operatorname{newton}(x - 2, 1) =`)?.text).toBe('x ≈ 2 (1 step) (steps: 0 1 −1 1; 1 2 0 1)')
    for (const family of ['student', 'chi2'] as const) expect(() => makeDistribution(family, [-1])).toThrow('The degrees of freedom must be a positive number')
  })
})

// ——— I testi inglesi delle tabelle `texts`, letti dal sorgente ———

interface AstNode {
  type: string
  [key: string]: unknown
}

const isNode = (v: unknown): v is AstNode => typeof v === 'object' && v !== null && typeof (v as AstNode).type === 'string'

function childrenOf(node: AstNode): AstNode[] {
  return Object.entries(node).flatMap(([key, value]) => (key === 'type' ? [] : Array.isArray(value) ? value.filter(isNode) : isNode(value) ? [value] : []))
}

/** I pezzi di testo dentro un nodo: i letterali e le parti fisse dei template. */
function strings(node: AstNode): string[] {
  if (node.type === 'Literal' && typeof node.value === 'string') return [node.value]
  if (node.type === 'TemplateLiteral') return [(node.quasis as { value: { cooked: string | null } }[]).map((q) => q.value.cooked ?? '').join('…')]
  return childrenOf(node).flatMap(strings)
}

/** I testi inglesi delle tabelle `texts({ nome: [italiano, inglese] })` di un file. */
function englishTexts(code: string): string[] {
  const out: string[] = []
  const pairs = (node: AstNode): void => {
    if (node.type === 'ArrayExpression') {
      const english = (node.elements as (AstNode | null)[])[1]
      if (english) out.push(...strings(english))
      return
    }
    childrenOf(node).forEach(pairs)
  }
  const visit = (node: AstNode): void => {
    const callee = node.callee as AstNode | undefined
    if (node.type === 'CallExpression' && callee?.type === 'Identifier' && callee.name === 'texts') {
      const [table] = node.arguments as AstNode[]
      for (const property of (table?.properties as AstNode[] | undefined) ?? []) pairs(property.value as AstNode)
      return
    }
    childrenOf(node).forEach(visit)
  }
  visit((parseSync('file.ts', code, { lang: 'ts' }) as unknown as { program: AstNode }).program)
  return out
}
