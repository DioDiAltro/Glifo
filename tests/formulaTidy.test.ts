import { describe, expect, it } from 'vitest'
import { tidyLatex } from '../src/ai/formulaTidy'
import { Sheet } from '../src/math/sheet'

const r = String.raw

/** Il segno del motore come nella nota: ✓, ✗ con il valore giusto, null se non si giudica. */
function check(tex: string): string | null {
  const c = new Sheet().read(tex).check
  if (!c) return null
  return c.ok ? (c.rounded ? '✓≈' : '✓') : `✗ ${c.value?.text ?? c.error}`
}

// Quello che pix2text-mfr ha scritto davvero (15 ottobre 2026): le 20 formule della prova dei lettori
// stampate con KaTeX e le prime scritte a mano dallo studente sulla lavagna.
const PRINTED: [string, string][] = [
  [r`\int _ { 0 } ^ { 1 } x ^ { 2 } \, d x = \cfrac { 1 } { 3 }`, r`\int_0^1 x^2\,dx=\frac{1}{3}`],
  [r`\operatorname* { l i m } _ { x \to 0 } \frac { \operatorname { s i n } x } { x } = 1`, r`\lim_{x\to 0}\frac{\sin x}{x}=1`],
  [r`\frac { d } { d x } ( x ^ { 2 } \operatorname { s i n } x ) = 2 x \operatorname { s i n } x + x ^ { 2 } \operatorname { c o s } x`, r`\frac{d}{dx}(x^2\sin x)=2x\sin x+x^2\cos x`],
  [r`\sum _ { k = 1 } ^ { n } k = \frac { n ( n + 1 ) } { 2 }`, r`\sum_{k=1}^n k=\frac{n(n+1)}{2}`],
  [r`x _ { 1 , 2 } = { \frac { - b \pm \sqrt { b ^ { 2 } - 4 a c } } { 2 a } }`, r`x_{1,2}=\frac{-b\pm\sqrt{b^2-4ac}}{2a}`],
  [r`e ^ { i \pi } + 1 = 0`, r`e^{i\pi}+1=0`],
  [r`\operatorname { s i n } ^ { 2 } { x } + \operatorname { c o s } ^ { 2 } { x } = 1`, r`\sin^2 x+\cos^2 x=1`],
  [r`f ( x ) = \cfrac { x ^ { 2 } - 1 } { x + 2 }`, r`f(x)=\frac{x^2-1}{x+2}`],
  [r`\sqrt { a ^ { 2 } + b ^ { 2 } }`, r`\sqrt{a^2+b^2}`],
  [r`\operatorname { l o g } _ { 2 } 8 = 3`, r`\log_2 8=3`],
  [r`\left( \begin{matrix} { 1 } & { 2 } \\ { 3 } & { 4 } \\ \end{matrix} \right)`, r`\begin{pmatrix}1&2\\3&4\end{pmatrix}`],
  [r`\operatorname* { d e t } A = a d - b c`, r`\det A=ad-bc`],
  [r`\cfrac { \partial f } { \partial x } = 2 x y`, r`\frac{\partial f}{\partial x}=2xy`],
  [r`\nabla f = ( 2 x , 2 y )`, r`\nabla f=(2x,2y)`],
  [r`\left( \begin{matrix} { n } \\ { k } \\ \end{matrix} \right) = \frac { n ! } { k ! \left( n - k \right) ! }`, r`\binom{n}{k}=\frac{n!}{k!(n-k)!}`],
  [r`P ( A \cup B ) = P ( A ) + P ( B ) - P ( A \cap B ) \;`, r`P(A\cup B)=P(A)+P(B)-P(A\cap B)`],
  [r`y ^ { \prime \prime } + y = 0`, r`y''+y=0`],
  [r`\alpha + \beta + \gamma = \pi`, r`\alpha+\beta+\gamma=\pi`],
  [r`| x - 3 | \leq 2`, r`|x-3|\leq 2`],
  [r`\begin{aligned} { \int _ { - R } ^ { R } \pi ( R ^ { 2 } - x ^ { 2 } ) \, d x = \frac { 4 } { 3 } \pi R ^ { 3 } } \\ \end{aligned}`, r`\int_{-R}^R\pi(R^2-x^2)\,dx=\frac{4}{3}\pi R^3`],
]

const HANDWRITTEN: [string, string][] = [
  [r`\int _ { 0 } ^ { 1 } x ^ { 2 } d x`, r`\int_0^1 x^2 dx`],
  [r`\int _ { 0 } ^ { 1 } x ^ { 2 } d x = \frac { 1 } { 3 }`, r`\int_0^1 x^2 dx=\frac{1}{3}`],
  [r`\frac { d } { d x } \left( x ^ { z } \sin \left( x \right) \right) = z x \cdot \sin \left( x \right) - x ^ { z } \cdot \cos \left( x \right)`, r`\frac{d}{dx}(x^z\sin(x))=zx\cdot\sin(x)-x^z\cdot\cos(x)`],
]

describe('la pulizia del LaTeX letto dalla lavagna', () => {
  it('le 20 formule stampate: come le scriverebbe una persona', () => {
    for (const [read, tidy] of PRINTED) expect(tidyLatex(read)).toBe(tidy)
  })

  it('la scrittura a mano dello studente', () => {
    for (const [read, tidy] of HANDWRITTEN) expect(tidyLatex(read)).toBe(tidy)
  })

  it('il motore giudica le formule pulite come quelle scritte a mano nella nota', () => {
    const signs = PRINTED.map(([read]) => check(tidyLatex(read)))
    // Come nella prima prova del 15 ottobre: ✓ all'integrale, al limite, alla derivata, a e^{iπ},
    // al logaritmo e al volume della sfera; le altre sono definizioni o equazioni.
    expect(signs.map((s, i) => (s === '✓' ? i + 1 : 0)).filter(Boolean)).toEqual([1, 2, 3, 6, 10, 20])
    expect(signs.filter((s) => s?.startsWith('✗'))).toEqual([])
    expect(check(tidyLatex(HANDWRITTEN[1][0]))).toBe('✓')
    // La derivata scritta con il − invece del +: il ✗ dà quella giusta.
    expect(check(r`\frac{d}{dx}(x^2\sin(x))=2x\cdot\sin(x)-x^2\cdot\cos(x)`)).toBe('✗ 2x sin(x) + x² cos(x)')
  })

  it('le altre regole: \\left e \\right, i nomi delle funzioni, le graffe che non servono', () => {
    expect(tidyLatex(r`\left| x \right| + \left\{ a \right\} + \left. f \right|`)).toBe(r`|x|+\{a\}+f|`)
    expect(tidyLatex(r`a \leftarrow b \Leftrightarrow c \rightarrow d`)).toBe(r`a\leftarrow b\Leftrightarrow c\rightarrow d`)
    expect(tidyLatex(r`\operatorname { s t u d i o } ( f )`)).toBe(r`\operatorname{studio}(f)`)
    expect(tidyLatex(r`\sum \limits _ { k = 0 } ^ { 10 } \dfrac { 1 } { k ! }`)).toBe(r`\sum_{k=0}^{10}\frac{1}{k!}`)
    expect(tidyLatex(r`\int _ { 0 } ^ { 1 } f ( x ) \mathrm { d } x`)).toBe(r`\int_0^1 f(x)dx`)
    expect(tidyLatex(r`\underset { x \to 0 } { \lim } f ( x )`)).toBe(r`\lim_{x\to 0}f(x)`)
    expect(tidyLatex(r`y = { a + b } \quad`)).toBe(r`y=a+b`)
    expect(tidyLatex(r`x ^ { 2 } { y } = { 3 } ^ { 2 }`)).toBe(r`x^2 y={3}^2`)
    // La scrittura finta di scripts/lettore-vero.mjs, letta nel browser: \mathrm e \! che chi scrive non mette.
    expect(tidyLatex(r`\int_0^1\!\mathrm{x}^2\,\mathrm{dx=}\frac{1}{3}`)).toBe(r`\int_0^1 x^2\,dx=\frac{1}{3}`)
    expect(tidyLatex(r`a _ 1 b + e ^ x y`)).toBe(r`a_1 b+e^x y`)
    // Come lo legge il browser (15 ottobre 2026): la k tra graffe dopo l'apice.
    expect(tidyLatex(r`\sum _ { k = 1 } ^ { n } { k } = \frac { n ( n + 1 ) } { 2 }`)).toBe(r`\sum_{k=1}^n k=\frac{n(n+1)}{2}`)
  })
})
