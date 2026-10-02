/**
 * Un blocco ```grafico della nota: una riga per ogni cosa da disegnare, scritta come una formula.
 *
 *     y = x^2 - 1                 una funzione (anche solo x^2 - 1)
 *     f(x) = \frac{1}{x}          una funzione con un nome (che le altre righe possono usare)
 *     y = \sqrt{x}, 0 \le x \le 4 solo dove vale la condizione
 *     x = 2                       una retta verticale
 *     x^2 + y^2 = 4               una curva qualsiasi in x e y
 *     r = 1 + \cos\theta          in coordinate polari
 *     (\cos t, \sin t)            una curva con un parametro t
 *     P = (1, 2)                  un punto (anche P(1, 2) o solo (1, 2))
 *     \int_0^2 x^2 \, dx          l'area tra la curva e l'asse x, con il valore (anche A = \int…)
 *     \vec{v} = (2, 1)            un vettore: una freccia dall'origine
 *     a = 2                       un numero da usare nelle altre righe (con uno slider)
 *     a \in [0, 5]                da dove a dove va lo slider di a (anche 0 \le a \le 5)
 *     x \in [-5, 5]               la parte da mostrare (anche -1 \le y \le 3)
 *     % commento                  non conta
 *
 * Con la z (o una funzione di x e y, o tre coordinate) il grafico è in 3D, e ogni equazione è
 * una superficie (vedi space.ts e view3d.ts):
 *
 *     z = x^2 + y^2               una superficie sopra il piano xy (anche f(x, y) = …, o solo x^2 + y^2)
 *     x^2 + y^2 + z^2 = 4         una superficie qualsiasi in x, y e z (x + y + z = 1 è un piano)
 *     (u \cos v, u \sin v, u)     una superficie con due parametri (u e v, s e t, θ e φ…)
 *     (\cos t, \sin t, t)         una curva nello spazio (con t \in [0, 1] solo quel pezzo)
 *     P = (1, 2, 3)               un punto; \vec{v} = (1, 2, 3) un vettore
 *     z \in [-1, 1]               la parte da mostrare
 *
 * Le righe possono usare anche le definizioni scritte prima nella nota (`$a = 2$`, `$f(x) = …$`).
 * Ogni numero scritto con le cifre che il grafico usa (a = 2, non b = 2a, che segue a) ha uno
 * slider sotto il grafico: `parseGraph` con `values` rifà il grafico con quei valori al posto di
 * quelli scritti, senza cambiare la nota.
 */
import { compileComplex, type Complex, type ComplexFunction, type ComplexScope } from '../math/complex'
import { degreesText, evaluateLinear, EXACT, FLOAT, formatLinear, type Lin, type LinearScope, type LinearValue } from '../math/linear'
import { compile, compileCondition, EMPTY_SCOPE, errorMessage, MathError, scopeWith, UndefinedName, withWorkLimit, type Compiled, type Scope, type UserFunction } from '../math/evaluate'
import { formatNumber } from '../math/format'
import { nameLatex, toLatex } from '../math/latex'
import { children, namesIn, parseMath, parseStatement, tokenize, type MathNode, type Statement } from '../math/parse'
import { calculationRequest, Sheet, splitEquals } from '../math/sheet'
import {
  constantIntegrand,
  inequalityMargin,
  integralRegion,
  multipleOf,
  planeMargin,
  spaceLayers,
  spaceMargin,
  spaceParts,
  volumeLayers,
  volumeMargin,
  volumeParts,
  planeParts,
  type LayeredSolid,
  type Multiple,
  type PlanePart,
} from './regions'
import { expandCalculus, SYMBOLIC_FNS } from '../math/symbolic'
import { odeOf } from '../math/differential'
import { calculusDims, calculusItems, vectorDefinition, type FieldContext } from './fields'
import { gaussItem, isComplexLine, onlyComplex } from './gauss'

export type Range = [number, number]

/** Un punto (o uno spostamento) nello spazio; nel piano z è 0. */
export type Vec3 = [number, number, number]

/** Un piano a x + b y + c z = d, come [a, b, c, d]. */
export type Plane = [number, number, number, number]

interface ItemBase {
  /** La riga del blocco (da 0), per i messaggi. */
  line: number
  /** Cosa scrivere nella legenda, in LaTeX. */
  label: string
  /**
   * Il colore delle curve, nell'ordine delle righe (-1 per i punti). Contano anche le righe
   * sbagliate: così i colori non cambiano mentre si corregge o si muove uno slider.
   */
  slot: number
  /**
   * La stessa zona (o lo stesso solido) di un'altra riga del blocco (D = \{…\} e \iint_D): si
   * disegna una volta sola, e questa riga ne prende il colore. Resta nella legenda.
   */
  same?: boolean
  /**
   * Un punto della nota che una figura del blocco usa (\triangle ABC con A, B, C definiti nella
   * nota): si disegna con il suo nome, ma non è una riga del blocco.
   */
  fromNote?: boolean
}

export type GraphItem =
  | (ItemBase & { kind: 'function'; f: (x: number) => number })
  | (ItemBase & { kind: 'vertical'; x: number })
  | (ItemBase & { kind: 'implicit'; F: (x: number, y: number) => number })
  /**
   * Una curva con un parametro; `straight`: è una retta ((1 + t, 2t)), si disegna da un bordo
   * all'altro; `arrow`: con la freccia del verso (le curve con il nome, \gamma(t) = …).
   */
  | (ItemBase & { kind: 'parametric'; fx: (t: number) => number; fy: (t: number) => number; param: 't' | 'θ'; t: Range; straight: boolean; arrow?: boolean })
  | (ItemBase & { kind: 'point'; x: number; y: number; name: string | null })
  /** Un vettore (\vec{v} = (2, 1)): una freccia da `from` a `to`, nel piano (z = 0) o nello spazio. */
  | (ItemBase & { kind: 'vector'; from: Vec3; to: Vec3; name: string | null })
  /** z = f(x, y): una superficie sopra il piano xy (grafici 3D). */
  | (ItemBase & { kind: 'surface'; f: (x: number, y: number) => number })
  /** Una superficie data da un'equazione F(x, y, z) = 0 (una sfera, un cilindro); `plane` se è un piano. */
  | (ItemBase & { kind: 'implicit3'; F: (x: number, y: number, z: number) => number; plane: Plane | null })
  /** Una superficie con due parametri: (x(u, v), y(u, v), z(u, v)), con u e v negli intervalli dati. */
  | (ItemBase & {
      kind: 'patch'
      fx: (u: number, v: number) => number
      fy: (u: number, v: number) => number
      fz: (u: number, v: number) => number
      params: [string, string]
      u: Range
      v: Range
    })
  /** Una curva nello spazio con un parametro; `straight` e `arrow` come per le curve nel piano. */
  | (ItemBase & { kind: 'curve3'; fx: (t: number) => number; fy: (t: number) => number; fz: (t: number) => number; param: string; t: Range; straight: boolean; arrow?: boolean })
  /** Un campo di vettori nel piano (F(x, y) = (-y, x), \nabla f): una freccia in ogni punto di una griglia. */
  | (ItemBase & { kind: 'field'; F: (x: number, y: number) => [number, number] })
  /** Un campo di vettori nello spazio. */
  | (ItemBase & { kind: 'field3'; F: (x: number, y: number, z: number) => Vec3 })
  /** Le curve di livello di una funzione di x e y (\operatorname{livelli}(f)): i livelli li sceglie il disegno. */
  | (ItemBase & { kind: 'contour'; F: (x: number, y: number) => number })
  /**
   * Il campo di direzioni di un'equazione differenziale y' = f(x, y): un trattino in ogni punto, e le
   * soluzioni che passano per i punti `starts` (y(0) = 1).
   */
  | (ItemBase & { kind: 'slopes'; f: (x: number, y: number) => number; starts: [number, number][] })
  | (ItemBase & { kind: 'point3'; x: number; y: number; z: number; name: string | null })
  /**
   * Una zona del piano (y > x^2, un insieme, il dominio di un integrale doppio): dove M(x, y) ≥ 0;
   * `strict` se il bordo non ne fa parte (< e >); `parts` le sue condizioni una per una, per
   * disegnare il bordo pezzo per pezzo con gli angoli netti (null se ha un «o», o è in r e θ).
   * Nei grafici 3D sta nel piano xy.
   */
  | (ItemBase & { kind: 'region'; M: (x: number, y: number) => number; strict: boolean; parts: PlanePart[] | null })
  /**
   * Un solido (x^2 + y^2 + z^2 \le 1, il dominio di un integrale triplo, il volume sotto una
   * superficie): dove M ≥ 0; `parts` le sue condizioni una per una (null se ha un «o»); `layers`
   * le variabili una dentro l'altra, se il dominio è scritto così (si disegna faccia per faccia).
   */
  | (ItemBase & {
      kind: 'solid'
      M: (x: number, y: number, z: number) => number
      parts: ((x: number, y: number, z: number) => number)[] | null
      layers: LayeredSolid | null
    })
  /** Un segmento AB (\overline{AB}), nel piano o nello spazio. */
  | (ItemBase & { kind: 'segment'; a: Vec3; b: Vec3 })
  /** Un poligono (\triangle ABC, \operatorname{poligono}(A, B, C, D)): colorato dentro. */
  | (ItemBase & { kind: 'polygon'; points: Vec3[] })
  /** Un angolo (\widehat{ABC}): l'arco nel vertice, con l'ampiezza in gradi. */
  | (ItemBase & { kind: 'angle'; vertex: Vec3; a: Vec3; b: Vec3; degrees: number })
  /** Dei punti (dove una retta taglia una circonferenza). */
  | (ItemBase & { kind: 'points'; points: Vec3[] })
  /**
   * Numeri complessi nel piano di Gauss (1 + 2i, w = e^{i\pi/3}, le radici di \sqrt[3]{8i}, le
   * soluzioni di z^3 = 8i): `arrows` le frecce dall'origine (per un numero solo), se no i punti.
   */
  | (ItemBase & { kind: 'complex'; values: Complex[]; name: string | null; arrows: boolean })
  /**
   * L'area tra la curva y = f(x) e l'asse x, da `from` a `to` (\int_0^2 x^2 \, dx); `value` è
   * l'integrale (NaN se non converge). `curve`: disegna anche la curva, se nessun'altra riga la
   * disegna (se no l'area prende il colore di quella riga).
   */
  | (ItemBase & { kind: 'area'; f: (x: number) => number; from: number; to: number; value: number; curve: boolean })

export interface GraphError {
  line: number
  text: string
  message: string
  /** I numeri che mancano, con la riga da aggiungere al blocco per averli con uno slider (k = 1). */
  add?: { name: string; line: string }[]
}

/** Un numero del grafico, con il suo slider. */
export interface GraphSlider {
  name: string
  /** Quello scritto nella nota o nel blocco (o quello dato a parseGraph al suo posto). */
  value: number
  /** Da dove a dove va: scritto nel blocco (a \in [0, 5]) o, se no, da −10 a 10. */
  range: Range
  /** Gli estremi in LaTeX, da scrivere accanto (2\pi, non 6,28). */
  ends: [string, string]
  /** Di quanto si muove: di 1 i numeri che contano i termini di una somma. */
  step: number
  /** Conta i termini di una somma (n in \sum_{k=0}^{n}): solo numeri interi. */
  integer: boolean
}

export interface GraphSpec {
  /** 3: c'è la z (o una funzione di x e y, o un punto con tre coordinate) e si disegna nello spazio. */
  dim: 2 | 3
  items: GraphItem[]
  errors: GraphError[]
  /** La parte da mostrare, se scritta nel blocco. */
  x: Range | null
  y: Range | null
  z: Range | null
  /** Ci sono seni e coseni: sull'asse x le tacche con π. */
  trig: boolean
  sliders: GraphSlider[]
  /** Il piano di Gauss (numeri complessi): sugli assi Re e Im, e le tacche dell'asse verticale con la i. */
  gauss?: boolean
}

const TRIG_FUNCTIONS = new Set(['sin', 'cos', 'tan', 'cot', 'sec', 'csc'])

/** Le righe del blocco, con quelle di un \begin{cases} … \end{cases} unite in una. */
export function blockLines(source: string): { line: number; text: string }[] {
  const out: { line: number; text: string }[] = []
  const lines = source.split('\n')
  for (let i = 0; i < lines.length; i++) {
    let text = lines[i]
    const start = i
    while (/\\begin\{d?cases\}/.test(text) && !/\\end\{d?cases\}/.test(text) && i + 1 < lines.length) text += '\n' + lines[++i]
    const trimmed = text.trim()
    if (!trimmed || trimmed.startsWith('%') || trimmed.startsWith('//')) continue
    out.push({ line: start, text: trimmed })
  }
  return out
}

function usesTrig(node: MathNode): boolean {
  if (node.k === 'fn' && TRIG_FUNCTIONS.has(node.name)) return true
  return children(node).some(usesTrig)
}

function dependsOn(node: MathNode, name: string): boolean {
  return namesIn(node).has(name)
}

/** Il valore di un'espressione senza variabili (un estremo, una coordinata). */
function constantValue(node: MathNode, scope: Scope): number {
  if (node.k === 'infty') return Infinity
  if (node.k === 'neg' && node.a.k === 'infty') return -Infinity
  return compile(node, scope)({})
}

const AXES: readonly string[] = ['x', 'y', 't', 'θ']
/** I parametri delle curve e delle superfici nello spazio: uno per una curva, due per una superficie. */
const PARAMS: readonly string[] = ['t', 'θ', 's', 'u', 'v', 'φ', 'r']

/**
 * `a \in [0, 5]` o `0 \le a \le 5`: da dove a dove va un nome. Per x e y è la parte da mostrare,
 * per t e θ l'intervallo delle curve con un parametro, per gli altri numeri lo slider.
 */
function rangeLine(node: MathNode): { name: string; lo: MathNode; hi: MathNode } | null {
  if (node.k === 'in') return node.a.k === 'name' ? { name: node.a.name, lo: node.lo, hi: node.hi } : null
  if (node.k !== 'rel' || node.items.length !== 3 || node.items[1].k !== 'name') return null
  const name = node.items[1].name
  if (node.ops.every((op) => op === '<' || op === '<=')) return { name, lo: node.items[0], hi: node.items[2] }
  if (node.ops.every((op) => op === '>' || op === '>=')) return { name, lo: node.items[2], hi: node.items[0] }
  return null
}

/** Un numero scritto con le cifre (2, -\frac{1}{2}, 2\pi): non usa altri nomi. */
function onlyDigits(names: Iterable<string>): boolean {
  for (const n of names) if (n !== 'π' && n !== 'e') return false
  return true
}

/** Lo slider di un numero, se il blocco non dice da dove a dove: da −10 a 10 (di più se il numero è più grande). */
function defaultRange(value: number, integer: boolean): Range {
  const size = Math.abs(value) <= 10 ? 10 : 10 ** Math.ceil(Math.log10(Math.abs(value)))
  return integer && value >= 0 ? [0, size] : [-size, size]
}

/** Il passo dello slider: tra 100 e 1000 posizioni. */
function sliderStep(range: Range): number {
  return 10 ** Math.floor(Math.log10((range[1] - range[0]) / 100))
}

/**
 * Il numero scritto a mano accanto allo slider (2, −1,5, 3/4, \pi/2, 2pi): null se non è un
 * numero. Quelli che contano i termini di una somma si arrotondano all'intero.
 */
export function typedSliderValue(text: string, slider: Pick<GraphSlider, 'integer'>): number | null {
  // Mentre si scrive 3,5, «3,» vale già 3.
  const src = text.trim().replace(/[,.]$/, '')
  if (!src) return null
  let value: number
  try {
    value = withWorkLimit(GRAPH_WORK, () => compile(parseMath(src), EMPTY_SCOPE, { calc: true })({}))
  } catch {
    return null
  }
  if (!Number.isFinite(value)) return null
  return slider.integer ? Math.round(value) : value
}

/**
 * Lo slider allargato fino a un valore scritto a mano fuori da dove va (a = 15, con a da −10 a 10):
 * l'estremo nuovo è sul passo, e se lo slider diventa molto più lungo il passo cresce (tra 100 e
 * 1000 posizioni, come gli altri).
 */
export function widenSlider(range: Range, step: number, value: number, integer: boolean): { range: Range; step: number } {
  const [lo, hi] = range
  if (value >= lo && value <= hi) return { range, step }
  const s = integer ? 1 : Math.max(step, sliderStep([Math.min(lo, value), Math.max(hi, value)]))
  const down = (v: number) => Number((Math.floor(v / s + 1e-9) * s).toPrecision(12))
  const up = (v: number) => Number((Math.ceil(v / s - 1e-9) * s).toPrecision(12))
  // Con un passo nuovo anche l'altro estremo va sul passo: lo slider arriva fino in fondo.
  const again = s !== step
  return { range: [value < lo || again ? down(Math.min(lo, value)) : lo, value > hi || again ? up(Math.max(hi, value)) : hi], step: s }
}

/** I nomi che contano i termini di una somma o di un prodotto (\sum_{k=0}^{n}): i loro slider vanno di 1. */
function termCounters(node: MathNode, out: Set<string>): void {
  if (node.k === 'big') {
    namesIn(node.from, out)
    namesIn(node.to, out)
  }
  for (const child of children(node)) termCounters(child, out)
}

/** Una riga che sembra un punto ((1, 2), P = (1, 2), P(1, 2), anche nello spazio): non ha un colore suo. */
function looksLikePoint(main: MathNode): boolean {
  const tuple = tupleOf(main)
  if (!tuple || isVectorName(tuple.name)) return false
  return !tuple.coords.some((n) => PARAMS.some((p) => dependsOn(n, p)))
}

/** L'accento di \vec{v}: il nome di un vettore. */
const VEC = '⃗'

/** Il nome di un vettore: con la freccia (\vec{v}) o una lettera minuscola (u, v_1), come nei libri; i punti hanno la maiuscola. */
function isVectorName(name: string | null | undefined): name is string {
  return !!name && (name.endsWith(VEC) || (/^[a-z](_.+)?$/.test(name) && !['x', 'y', 'z', 't'].includes(name[0])))
}

/** Le coordinate di un punto (o di una curva, o di un vettore): (1, 2), P = (1, 2), P(1, 2, 3). */
function tupleOf(main: MathNode): { coords: MathNode[]; name: string | null } | null {
  if (main.k === 'tuple') return { coords: main.items, name: null }
  if (main.k === 'rel' && main.ops.length === 1 && main.ops[0] === '=' && main.items[0].k === 'name' && main.items[1].k === 'tuple') {
    return { coords: main.items[1].items, name: main.items[0].name }
  }
  if (main.k === 'apply' && !main.primes && main.args.length >= 2) return { coords: main.args, name: main.name }
  return null
}

/**
 * I parametri di una curva o di una superficie nello spazio, nell'ordine in cui compaiono: t e θ
 * sempre (come nel piano), gli altri (s, u, v, φ, r) se non sono numeri definiti.
 */
function tupleParams(coords: MathNode[], scope: Scope): string[] {
  const names = new Set<string>()
  for (const n of coords) namesIn(n, names)
  return [...names].filter((n) => PARAMS.includes(n) && (n === 't' || n === 'θ' || !(scope.consts.has(n) || scope.fns.has(n))))
}

/** `x` compare dentro un seno o un coseno (allora va da 0 a 2π)? */
function inTrig(node: MathNode, name: string): boolean {
  if (node.k === 'fn' && TRIG_FUNCTIONS.has(node.name)) return node.args.some((a) => dependsOn(a, name))
  return children(node).some((c) => inTrig(c, name))
}

/** Da dove a dove va un parametro di una superficie, se il blocco non lo dice: gli angoli un giro (φ mezzo), gli altri da 0 a 1. */
function patchRange(name: string, coords: MathNode[]): Range {
  if (name === 'φ') return [0, Math.PI]
  if (name === 'θ' || coords.some((n) => inTrig(n, name))) return [0, 2 * Math.PI]
  return [0, 1]
}

/** Una curva x(t), y(t), z(t) che è una retta (le coordinate sono di primo grado in t). */
function isStraight(fs: ((t: number) => number)[]): boolean {
  const ts = [0, 1, -1.7, 2.9, 7.3]
  for (const f of fs) {
    const [a, b] = [f(0), f(1)]
    if (!Number.isFinite(a) || !Number.isFinite(b)) return false
    const scale = Math.max(1, Math.abs(a), Math.abs(b))
    for (const t of ts.slice(2)) {
      const v = f(t)
      if (!Number.isFinite(v) || Math.abs(v - (a + (b - a) * t)) > 1e-9 * scale * (1 + Math.abs(t))) return false
    }
  }
  // Ferma in un punto non è una retta.
  return fs.some((f) => f(1) !== f(0))
}

/** Se F(x, y, z) = 0 è un piano (F di primo grado): a x + b y + c z = d. */
function planeOf(F: (x: number, y: number, z: number) => number): Plane | null {
  const f0 = F(0, 0, 0)
  const [a, b, c] = [F(1, 0, 0) - f0, F(0, 1, 0) - f0, F(0, 0, 1) - f0]
  if (![f0, a, b, c].every(Number.isFinite) || (a === 0 && b === 0 && c === 0)) return null
  const scale = Math.max(1, Math.abs(a), Math.abs(b), Math.abs(c), Math.abs(f0))
  const tests: Vec3[] = [[1.7, -2.3, 0.6], [-3.1, 0.4, 2.9], [0.3, 5.2, -4.4], [12, -7, 3]]
  for (const [x, y, z] of tests) {
    const v = F(x, y, z)
    if (!Number.isFinite(v) || Math.abs(v - (f0 + a * x + b * y + c * z)) > 1e-9 * scale * (1 + Math.abs(x) + Math.abs(y) + Math.abs(z))) return null
  }
  return [a, b, c, -f0]
}

/** I due argomenti sono proprio x e y (f(x, y), f(y, x)). */
function xyArgs(args: MathNode[]): boolean {
  const names = args.map((a) => (a.k === 'name' ? a.name : ''))
  return names.length === 2 && names.includes('x') && names.includes('y')
}

/** Una funzione di x e y (f(x, y), anche f(y, x)): nello spazio è una superficie. */
function xyParams(params: readonly string[] | null | undefined): boolean {
  return !!params && params.length === 2 && params.includes('x') && params.includes('y')
}

/**
 * Una riga che fa del grafico un grafico 3D: usa la z insieme alla x o alla y (z = x^2 + y^2), o
 * da sola se la nota non definisce z come numero; ha tre coordinate; è una funzione di x e y.
 * `z = 3` da sola non decide: in un grafico 3D è un piano, se no definisce il numero z.
 */
function isSpaceLine(main: MathNode, zFree: boolean): boolean {
  const range = rangeLine(main)
  if (range) return zFree && range.name === 'z'
  // Un integrale triplo, un insieme con tre variabili.
  if (multipleOf(main)?.dims === 3) return true
  const set = setOf(main)
  if (set) return setDims(set.node) === 3
  const tuple = tupleOf(main)
  if (tuple) return tuple.coords.length === 3 || (main.k === 'apply' && xyArgs(main.args))
  if (main.k === 'rel' && main.ops.length === 1 && main.ops[0] === '=') {
    const [lhs, rhs] = main.items
    if (lhs.k === 'apply' && !lhs.primes && xyArgs(lhs.args)) return true
    if (lhs.k === 'name' && lhs.name === 'z' && !dependsOn(rhs, 'x') && !dependsOn(rhs, 'y') && !dependsOn(rhs, 'z')) return false
  }
  // Anche se la nota ha $z = 2$ (magari solo per dire «il piano z = 2»), z = x^2 + y^2 è una superficie.
  if (dependsOn(main, 'z') && (zFree || dependsOn(main, 'x') || dependsOn(main, 'y'))) return true
  // Un'espressione in y (e in x) da sola: z = …
  const expression = main.k !== 'rel' && main.k !== 'in' && main.k !== 'and' && main.k !== 'or'
  return expression && dependsOn(main, 'y') && !areaOf(main)
}

interface Definition {
  name: string
  params: string[] | null
  value: MathNode
}

/**
 * a = 2 o f(x) = …: una riga che definisce un nome (le coordinate x e y no, sono rette). Neanche
 * z = x^2 + y^2, che è una superficie, e in un grafico 3D (`space`) z = 3, che è un piano.
 */
function definitionOf(node: MathNode, space = false): Definition | null {
  if (node.k !== 'rel' || node.ops.length !== 1 || node.ops[0] !== '=') return null
  const [lhs, value] = node.items
  if (value.k === 'tuple') return null
  if (lhs.k === 'name') {
    if (lhs.name === 'x' || lhs.name === 'y' || lhs.name === 'π') return null
    // y' = x - y: un'equazione differenziale, non un numero.
    if (lhs.name.endsWith("'")) return null
    if (lhs.name === 'z' && (space || dependsOn(value, 'x') || dependsOn(value, 'y'))) return null
    // r = 1 + \cos\theta è una curva in coordinate polari, r = 2 un numero.
    if (lhs.name === 'r' && dependsOn(value, 'θ')) return null
    return { name: lhs.name, params: null, value }
  }
  if (lhs.k === 'apply' && !lhs.primes && lhs.args.length && lhs.args.every((a) => a.k === 'name')) {
    const params = lhs.args.map((a) => (a as { name: string }).name)
    if (new Set(params).size === params.length) return { name: lhs.name, params, value }
  }
  return null
}

/** Una condizione, come funzione: fuori dal suo dominio la curva non c'è. */
function restrict(f: Compiled, cond: MathNode | null, scope: Scope): Compiled {
  if (!cond) return f
  const ok = compileCondition(cond, scope)
  return (v) => (ok(v) ? f(v) : NaN)
}

function condLabel(cond: MathNode | null): string {
  return cond ? `, \\quad ${toLatex(cond)}` : ''
}

type Integral = Extract<MathNode, { k: 'int' }>

/**
 * Un integrale definito da disegnare come area: `\int_0^2 x^2 \, dx`, anche con un nome
 * (`A = \int…`) o con il risultato scritto dopo (`\int… = \frac{8}{3}`). Se dipende da x
 * (\int_0^x t^2 \, dt) è una funzione di x, non un'area.
 */
function areaOf(main: MathNode): { int: Integral; name: string | null } | null {
  const plain = (n: MathNode) => !dependsOn(n, 'x') && !dependsOn(n, 'y')
  // Un integrale dentro l'altro è un integrale doppio (vedi regions.ts).
  const single = (n: MathNode): n is Integral => n.k === 'int' && n.body.k !== 'int'
  if (main.k === 'int') return plain(main) && single(main) ? { int: main, name: null } : null
  if (main.k !== 'rel' || !main.ops.every((op) => op === '=' || op === '≈') || !main.items.every(plain)) return null
  const [first, second] = main.items
  if (single(first)) return { int: first, name: null }
  return first.k === 'name' && single(second) ? { int: second, name: first.name } : null
}

/** Un insieme scritto nella riga (D = \{…\}, o da solo), o il nome di uno definito. */
function setOf(main: MathNode, scope?: Scope): { node: MathNode; name: string | null } | null {
  if (main.k === 'set') return { node: main, name: null }
  if (main.k === 'name' && scope?.sets?.has(main.name)) return { node: main, name: main.name }
  if (main.k === 'rel' && main.ops.length === 1 && main.ops[0] === '=' && main.items[0].k === 'name' && main.items[1].k === 'set') {
    return { node: main.items[1], name: main.items[0].name }
  }
  return null
}

/** Quante variabili ha un insieme: quelle scritte, o x, y (e z) che usa. */
function setDims(set: MathNode): number {
  if (set.k !== 'set') return 2
  if (set.vars) return set.vars.length
  return dependsOn(set.cond, 'z') ? 3 : 2
}

/** Una riga fatta di disuguaglianze (y > x^2, 0 \le y \le x, anche con «e» e «o»). */
function inequalities(main: MathNode): boolean {
  if (main.k === 'rel') return main.ops.every((op) => op !== '=' && op !== '≈')
  return (main.k === 'and' || main.k === 'or') && main.items.every(inequalities)
}

/** La funzione da integrare di un integrale doppio o triplo (quella dentro tutti gli \int). */
function integrandOf(m: Multiple): MathNode {
  let n: MathNode = m.node
  if (n.k === 'mint') return n.body
  while (n.k === 'int') n = n.body
  return n
}

/** Le variabili di un integrale doppio o triplo, da fuori a dentro. */
function multipleVars(m: Multiple): string[] {
  if (m.node.k === 'mint') return m.node.vars
  const vars: string[] = []
  for (let n: MathNode = m.node; n.k === 'int'; n = n.body) vars.push(n.v)
  return vars
}

/** La riga senza l'uguale finale, e poi senza l'ultima parte dopo un uguale, una alla volta. */
function withoutResult(text: string): string[] {
  const request = calculationRequest(text) ?? text
  const parts = splitEquals(request)
  const out = request === text ? [] : [request]
  for (let k = parts.length - 1; k >= 1; k--) out.push(parts.slice(0, k).join('='))
  return out
}

/**
 * Legge una riga del blocco. Dopo un integrale si può lasciare l'uguale (`\int_0^2 x^2 \, dx =`)
 * o il risultato copiato dalla nota (`= 2{,}666666\ldots`): conta l'integrale.
 */
function parseLine(text: string): Statement {
  try {
    return parseStatement(text)
  } catch (err) {
    for (const shorter of withoutResult(text)) {
      try {
        const statement = parseStatement(shorter)
        if (areaOf(statement.main)) return statement
      } catch {
        // Neanche così: si prova più corta.
      }
    }
    throw err
  }
}

interface Line {
  line: number
  text: string
  main: MathNode
  cond: MathNode | null
}

/**
 * La forma di un'espressione nella variabile `v`: due righe con la stessa forma disegnano la
 * stessa curva, anche scritte in modo diverso (2x e 2 \cdot x, \frac{1}{x} e 1/x, t^2 in dt e x^2).
 */
function shapeOf(node: MathNode, v: string): string {
  return JSON.stringify(node, (key, value: unknown) => {
    if (key === 'text' || key === 'comma' || key === 'implicit' || key === 'frac') return undefined
    const n = value as MathNode | null
    return n && typeof n === 'object' && n.k === 'name' && n.name === v ? { k: 'name', name: '' } : value
  })
}

/** `f(v)`: solo la funzione f, nella variabile v. */
function callOf(node: MathNode, v: string): string | null {
  return node.k === 'apply' && !node.primes && node.args.length === 1 && node.args[0].k === 'name' && node.args[0].name === v ? node.name : null
}

/** Come riconoscere la curva y = expr (nella variabile v): `e:` con la sua forma, `f:` con il nome della funzione. */
function shapeKeys(expr: MathNode, v: string, name = callOf(expr, v)): string[] {
  return [`e:${shapeOf(expr, v)}`, ...(name ? [`f:${name}`] : [])]
}

/** La curva y = f(x) che una riga disegna (f(x) = …, y = …, x^2, f), per riconoscerla. */
function curveKeys(main: MathNode, scope: Scope): string[] {
  const def = definitionOf(main)
  if (def) return def.params?.length === 1 ? shapeKeys(def.value, def.params[0], def.name) : []
  if (main.k === 'name') return scope.fns.get(main.name)?.params.length === 1 ? [`f:${main.name}`] : []
  if (main.k === 'rel') {
    const [lhs, rhs] = main.items
    const y = main.ops.length === 1 && main.ops[0] === '=' && lhs.k === 'name' && lhs.name === 'y' && !dependsOn(rhs, 'y')
    return y ? shapeKeys(rhs, 'x') : []
  }
  const expression = main.k !== 'tuple' && main.k !== 'in' && main.k !== 'and' && main.k !== 'or' && !(main.k === 'apply' && main.args.length === 2)
  return expression && dependsOn(main, 'x') ? shapeKeys(main, 'x') : []
}

/** I numeri complessi e le funzioni da calcolare con loro, definiti nella nota e nel blocco. */
interface ComplexDefinitions {
  consts: Map<string, Complex>
  fns: Map<string, ComplexFunction>
  /** Lo stato di adesso, con i numeri reali (vedi readGraph). */
  scope(): ComplexScope
}

function define(
  def: Definition,
  cond: MathNode | null,
  scope: Scope,
  consts: Map<string, number>,
  fns: Map<string, UserFunction>,
  sets: Map<string, MathNode>,
  values?: ReadonlyMap<string, number>,
  complexes?: ComplexDefinitions,
): void {
  complexes?.consts.delete(def.name)
  complexes?.fns.delete(def.name)
  if (!def.params && def.value.k === 'set') {
    if (cond) throw new MathError('Le condizioni vanno dentro l\'insieme')
    consts.delete(def.name)
    fns.delete(def.name)
    sets.set(def.name, def.value)
    return
  }
  if (!def.params) {
    if (cond) throw new MathError('Un numero non ha condizioni')
    let value: number
    try {
      value = values?.get(def.name) ?? compile(def.value, scope, { calc: true })({})
      if (!Number.isFinite(value)) throw new MathError(`${def.name} non è un numero`)
    } catch (err) {
      // Un numero complesso (w = 1 + i): per il piano di Gauss.
      const z = complexes ? complexValue(def.value, complexes.scope()) : null
      if (!z) throw err
      fns.delete(def.name)
      if (z.im === 0) consts.set(def.name, z.re)
      else {
        consts.delete(def.name)
        complexes!.consts.set(def.name, z)
      }
      return
    }
    fns.delete(def.name)
    consts.set(def.name, value)
    return
  }
  if (complexes) complexes.fns.set(def.name, { params: def.params, body: def.value, scope: complexes.scope() })
  const params = def.params
  const inner = scopeWith(scope, params)
  const body = restrict(compile(def.value, inner), cond, inner)
  consts.delete(def.name)
  fns.set(def.name, {
    params,
    call: params.length === 1 ? (args) => body({ [params[0]]: args[0] }) : (args) => body(Object.fromEntries(params.map((p, i) => [p, args[i]]))),
  })
}

/** Le funzioni della geometria (e delle matrici): una riga che le usa si calcola come figura. */
const FIGURES = new Set(['segment', 'arrow', 'line', 'triangle', 'polygon', 'circle', 'mid', 'centroid', 'angle', 'plane', 'intersect', 'dist', 'span', 'ker'])

/** Il coniugato di due lettere (\overline{AB}) è il segmento AB, se A e B sono punti. */
function isSegment(n: MathNode, scope: LinearScope): boolean {
  if (n.k !== 'fn' || n.name !== 'conj' || n.args.length !== 1) return false
  const a = n.args[0]
  return a.k === 'bin' && a.op === '*' && !!a.implicit && a.a.k === 'name' && a.b.k === 'name' && scope.values.has(a.a.name) && scope.values.has(a.b.name)
}

/** La riga usa vettori, matrici o figure (v = (1, 2), A = \begin{pmatrix} … \end{pmatrix}, \overline{AB}). */
function usesLinear(main: MathNode, scope: LinearScope): boolean {
  if ([...namesIn(main)].some((n) => scope.values.has(n))) return true
  let found = false
  const visit = (n: MathNode) => {
    if (n.k === 'matrix' || (n.k === 'fn' && FIGURES.has(n.name)) || isSegment(n, scope)) found = true
    else children(n).forEach(visit)
  }
  visit(main)
  return found
}

/** Il valore (con la virgola) di una riga con vettori e figure, o null se non lo è o non si calcola. */
function linearValue(main: MathNode, scope: LinearScope): Lin<number> | null {
  if (!usesLinear(main, scope)) return null
  try {
    return evaluateLinear(main, scope, FLOAT)
  } catch {
    return null
  }
}

/** In quante dimensioni sta una figura: 3 se ha punti con tre coordinate (o è un piano). */
function linearDims(main: MathNode, scope: LinearScope): number {
  const value = linearValue(main, scope)
  if (!value) return 0
  switch (value.k) {
    case 'matrix':
      return value.m[0].length === 1 ? value.m.length : 0
    case 'plane':
      return 3
    case 'segment':
    case 'arrow':
      return value.a.length
    case 'line':
      return value.p.length
    case 'polygon':
      return value.points[0].length
    case 'angle':
      return value.v.length
    case 'points':
      return value.list[0]?.length ?? 0
    case 'circle':
      return 2
    case 'span':
      return value.basis[0]?.length ?? 0
  }
  return 0
}

/** Il nome e il valore di una riga come r = \operatorname{retta}(A, B); se no null. */
function namedFigure(main: MathNode): { name: string; value: MathNode } | null {
  if (main.k !== 'rel' || main.ops.length !== 1 || main.ops[0] !== '=' || main.items[0].k !== 'name') return null
  return { name: main.items[0].name, value: main.items[1] }
}

const vec3 = (m: number[][]): Vec3 => [m[0][0], m[1][0], m[2]?.[0] ?? 0]

function tryFormat<T>(run: () => T | null): T | null {
  try {
    return run()
  } catch {
    return null
  }
}

/** Il valore di una figura per l'etichetta: con le frazioni, se si può. */
function figureText(node: MathNode, scope: LinearScope, float: Lin<number>): string | null {
  const options = { comma: true, decimal: false, digits: 9 }
  const exact = tryFormat(() => formatLinear(EXACT, evaluateLinear(node, scope, EXACT), options))
  return (exact ?? formatLinear(FLOAT, float, { ...options, decimal: true }))?.tex ?? null
}

/**
 * Quello che disegna una riga con vettori e figure: frecce (u + v, A v, \overrightarrow{AB}), punti
 * (con la maiuscola: P, M = \operatorname{medio}(A, B)), segmenti, rette, circonferenze, piani,
 * poligoni, angoli. Null se la riga è altro.
 */
function linearItem(l: Line, scope: LinearScope, slot: number, space: boolean): GraphItem | null {
  // I punti e i vettori scritti con le coordinate (P = (1, 2)) li disegna itemFor.
  if (tupleOf(l.main)) return null
  const named = namedFigure(l.main)
  const node = named && usesLinear(named.value, scope) ? named.value : l.main
  const name = named && node === named.value ? named.name : l.main.k === 'name' ? l.main.name : null
  if (!usesLinear(node, scope)) return null
  const value = evaluateLinear(node, scope, FLOAT)
  const written = toLatex(l.main)
  const shown = () => figureText(node, scope, value) ?? ''
  const line = l.line
  const flat = (v: Vec3[]) => {
    if (!space && v.some((p) => p[2] !== 0)) throw new MathError('Una figura con tre coordinate va in un grafico 3D')
  }
  switch (value.k) {
    case 'matrix': {
      if (value.m[0].length !== 1) throw new MathError('Una matrice non si disegna: disegna i vettori, come A v')
      const v = value.m.map((r) => r[0])
      if (v.length < 2 || v.length > 3) throw new MathError('Si disegnano i vettori con due o tre componenti')
      const [x, y, z = 0] = v
      if (name && /^[A-Z]/.test(name)) return space ? { kind: 'point3', line, label: nameLatex(name), slot: -1, x, y, z, name } : { kind: 'point', line, label: nameLatex(name), slot: -1, x, y, name }
      if (!space && v.length === 3) throw new MathError('Un vettore con tre componenti va in un grafico 3D')
      // Nella legenda anche le componenti, se la riga non le scrive già: u + v = (4, 1).
      const label = l.main.k === 'matrix' || l.main.k === 'tuple' ? written : `${written} = ${shown()}`
      return { kind: 'vector', line, label, slot, from: [0, 0, 0], to: [x, y, z], name }
    }
    case 'arrow': {
      const from = vec3(value.a)
      const to = vec3(value.b)
      flat([from, to])
      return { kind: 'vector', line, label: `${written} = ${shown()}`, slot, from, to, name }
    }
    case 'segment': {
      const a = vec3(value.a)
      const b = vec3(value.b)
      flat([a, b])
      return { kind: 'segment', line, label: `${written} = ${shown()}`, slot, a, b }
    }
    case 'line': {
      const p = vec3(value.p)
      const d = vec3(value.dir)
      const label = `${written}: ${shown()}`
      if (value.p.length === 3) {
        if (!space) throw new MathError('Una retta nello spazio va in un grafico 3D')
        return { kind: 'curve3', line, label, slot, param: 't', t: [0, 1], straight: true, fx: (t) => p[0] + t * d[0], fy: (t) => p[1] + t * d[1], fz: (t) => p[2] + t * d[2] }
      }
      return { kind: 'parametric', line, label, slot, param: 't', t: [0, 1], straight: true, fx: (t) => p[0] + t * d[0], fy: (t) => p[1] + t * d[1] }
    }
    case 'circle': {
      const [cx, cy] = [value.c[0][0], value.c[1][0]]
      const r2 = value.r2
      return { kind: 'implicit', line, label: `${written}: ${shown()}`, slot, F: (x, y) => (x - cx) ** 2 + (y - cy) ** 2 - r2 }
    }
    case 'plane': {
      if (!space) throw new MathError('Un piano va in un grafico 3D')
      const [a, b, c] = value.n.map((r) => r[0])
      const d = value.d
      return { kind: 'implicit3', line, label: `${written}: ${shown()}`, slot, F: (x, y, z) => a * x + b * y + c * z - d, plane: [a, b, c, d] }
    }
    case 'polygon': {
      const points = value.points.map(vec3)
      flat(points)
      const area = space ? '' : shown()
      return { kind: 'polygon', line, label: area ? `${written},\\ \\text{area} = ${area}` : written, slot, points }
    }
    case 'angle': {
      const vertex = vec3(value.v)
      const a = vec3(value.a)
      const b = vec3(value.b)
      flat([vertex, a, b])
      const ua = a.map((c, i) => c - vertex[i])
      const ub = b.map((c, i) => c - vertex[i])
      const cos = (ua[0] * ub[0] + ua[1] * ub[1] + ua[2] * ub[2]) / (Math.hypot(...ua) * Math.hypot(...ub))
      const degrees = (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI
      return { kind: 'angle', line, label: `${written} = ${degreesText(degrees, { comma: true, decimal: true, digits: 9 })?.tex ?? ''}`, slot, vertex, a, b, degrees }
    }
    case 'points': {
      const points = value.list.map(vec3)
      flat(points)
      return { kind: 'points', line, label: `${written} = ${shown()}`, slot, points }
    }
    case 'span': {
      // Lo span di un vettore è una retta per l'origine, di due (nello spazio) un piano.
      const basis = value.basis.map(vec3)
      if (basis.length === 1) {
        const d = basis[0]
        if (space) return { kind: 'curve3', line, label: written, slot, param: 't', t: [0, 1], straight: true, fx: (t) => t * d[0], fy: (t) => t * d[1], fz: (t) => t * d[2] }
        return { kind: 'parametric', line, label: written, slot, param: 't', t: [0, 1], straight: true, fx: (t) => t * d[0], fy: (t) => t * d[1] }
      }
      if (basis.length === 2 && space) {
        const [u, w] = basis
        const n: Vec3 = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]]
        return { kind: 'implicit3', line, label: written, slot, F: (x, y, z) => n[0] * x + n[1] * y + n[2] * z, plane: [n[0], n[1], n[2], 0] }
      }
      throw new MathError('Si disegnano gli span di uno o due vettori')
    }
    case 'scalar':
    case 'length':
      throw new MathError('È un numero: si calcola nella nota (con «=»), non si disegna')
  }
  return null
}

/** Il valore con i numeri complessi, o null se non c'è. */
function complexValue(node: MathNode, scope: ComplexScope): Complex | null {
  try {
    const z = compileComplex(node, scope)({})
    return Number.isFinite(z.re) && Number.isFinite(z.im) ? z : null
  } catch {
    return null
  }
}

/**
 * Legge il blocco: `defs` sono le definizioni scritte prima nella nota (vedi Sheet.definitionsFor),
 * che le righe possono usare; `values` i numeri con un valore diverso da quello scritto (gli slider).
 */
export function parseGraph(source: string, defs: readonly string[] = [], values?: ReadonlyMap<string, number>): GraphSpec {
  return withWorkLimit(GRAPH_WORK, () => readGraph(source, defs, values))
}

/** I passi di somme e integrali per leggere un grafico, e per ogni disegno: oltre, le curve si fermano. */
export const GRAPH_WORK = 5e6

function readGraph(source: string, defs: readonly string[], values?: ReadonlyMap<string, number>): GraphSpec {
  const sheet = new Sheet(values)
  for (const d of defs) sheet.define(d)
  const spec: GraphSpec = { dim: 2, items: [], errors: [], x: null, y: null, z: null, trig: false, sliders: [] }
  const fail = (l: { line: number; text: string }, err: unknown): GraphError => {
    const error = { line: l.line, text: l.text, message: errorMessage(err) }
    spec.errors.push(error)
    return error
  }
  /** I nomi definiti nella nota o nel blocco (anche quelli che non hanno un valore, come 1/0). */
  const defined = new Set(sheet.definitions.map((d) => d.name))
  /** Le righe con un nome che non c'è: alla fine, la riga da aggiungere per ognuno (k = 1). */
  const undefinedIn: { error: GraphError; line: Line }[] = []
  const failLine = (l: Line, err: unknown) => {
    if (err instanceof UndefinedName && defined.has(err.missing)) {
      fail(l, new MathError(`${err.missing} non ha un valore: controlla la sua definizione`))
      return
    }
    const error = fail(l, err)
    if (err instanceof UndefinedName) undefinedIn.push({ error, line: l })
  }

  const lines: Line[] = []
  /** Le righe con seni e coseni: se sono funzioni di x, sull'asse x le tacche con π. */
  const trig = new Set<number>()
  for (const l of blockLines(source)) {
    try {
      const { main, cond } = parseLine(l.text)
      lines.push({ ...l, main, cond })
      if (usesTrig(main)) trig.add(l.line)
    } catch (err) {
      fail(l, err)
    }
  }
  // I polinomi di Taylor si fanno con le lettere (anche delle funzioni del blocco), prima di tutto.
  if (lines.some((l) => usesSymbolicFunction(l.main))) {
    const symbols = sheet.symbolScope()
    const fns = new Map(symbols.fns)
    for (const l of lines) {
      const def = definitionOf(l.main)
      if (def?.params && !usesSymbolicFunction(def.value)) fns.set(def.name, { params: def.params, body: def.value })
    }
    /** Le righe con solo il polinomio (\operatorname{taylor}(\sin x, 0, 5)) e la funzione da cui viene. */
    const compared: [Line, MathNode][] = []
    for (const l of lines) {
      if (!usesSymbolicFunction(l.main)) continue
      const bare = l.main.k === 'fn' && SYMBOLIC_FNS.has(l.main.name) && !l.cond ? l.main.args[0] : undefined
      try {
        l.main = expandCalculus(l.main, { consts: symbols.consts, fns })
        const def = definitionOf(l.main)
        if (def?.params) fns.set(def.name, { params: def.params, body: def.value })
        if (bare && dependsOn(bare, 'x')) compared.push([l, bare])
      } catch (err) {
        fail(l, err)
      }
    }
    // Il polinomio da solo si disegna con la sua funzione, prima (se un'altra riga non la disegna già).
    const noteScope = sheet.scope()
    for (const [l, f] of compared) {
      const keys = shapeKeys(f, 'x')
      if (lines.some((o) => curveKeys(o.main, noteScope).some((k) => keys.includes(k)))) continue
      lines.splice(lines.indexOf(l), 0, { line: l.line, text: l.text, main: f, cond: null })
    }
  }
  // Nello spazio se una riga usa la z (che la nota non definisce come numero), ha tre coordinate o è
  // una funzione di x e y (anche solo il suo nome, se è definita nella nota). Una formula della nota
  // come $z = x^2 - y^2$ non dà un numero: la z resta una coordinata.
  const noteFns = sheet.scope().fns
  const zFree = !sheet.scope().consts.has('z') && !noteFns.has('z')
  // z = 3 che nessun'altra riga usa: è il piano, non un numero (x^2 + y^2 = 1 e z = 0,5).
  const zPlane = (l: Line) =>
    zFree && l.main.k === 'rel' && l.main.items[0].k === 'name' && l.main.items[0].name === 'z' && !lines.some((o) => o !== l && dependsOn(o.main, 'z'))
  // Con i numeri complessi (la i, \Re z, |z - 1| = 2) è il piano di Gauss: la z è un numero complesso.
  const noteComplex = sheet.complexScope()
  const realNames = new Set(sheet.scope().consts.keys())
  const realValue = (n: MathNode) => compile(n, sheet.scope(), { calc: true })({})
  const gauss = lines.some((l) => isComplexLine(l.main, noteComplex, realNames) || onlyComplex(l.main, realValue, noteComplex))
  // I punti e le figure del blocco (A = (1, 2), r = \operatorname{retta}(A, B)), per le righe dopo.
  const noteLinear = sheet.linearScope()
  const linearValues = new Map<string, LinearValue>(noteLinear.values)
  const linear: LinearScope = { ...noteLinear, values: linearValues }
  const figureLines = new Set<Line>()
  /** I nomi dei punti e delle figure definiti nel blocco. */
  const blockFigures = new Set<string>()
  for (const l of lines) {
    const tuple = tupleOf(l.main)
    const named = namedFigure(l.main)
    let target: { name: string; node: MathNode } | null = null
    if (tuple?.name && tuple.coords.length >= 2 && tuple.coords.length <= 3 && !tuple.coords.some((c) => namesIn(c).size)) {
      target = { name: tuple.name, node: { k: 'tuple', items: tuple.coords } }
    } else if (named && usesLinear(named.value, linear)) {
      target = { name: named.name, node: named.value }
      figureLines.add(l)
    }
    if (!target) continue
    blockFigures.add(target.name)
    try {
      const float = evaluateLinear(target.node, linear, FLOAT)
      const exact = tryFormat(() => evaluateLinear(target!.node, linear, EXACT))
      linearValues.set(target.name, { exact, float })
    } catch {
      // L'errore lo dice la riga, quando si disegna.
    }
  }
  // Le curve, le superfici e i campi del blocco (\gamma(t) = (…), t \in [0, 2\pi]; F(x, y) = (-y, x)): come
  // nella nota. Qui servono a sapere quante coordinate hanno; dopo le definizioni del blocco si rifanno.
  const vectorLines = new Set(lines.filter((l) => vectorDefinition(l.main)))
  for (const l of vectorLines) sheet.define(l.text)
  const shapes = { scope: sheet.scope(), symbols: sheet.symbolScope() }
  // f(x, y) = … per \nabla f è solo la funzione del gradiente: non fa il grafico 3D.
  const gradients = new Set(lines.flatMap((l) => (l.main.k === 'fn' && l.main.name === 'grad' && l.main.args[0]?.k === 'name' ? [l.main.args[0].name] : [])))
  // y (o y(x)) se la nota ne fa una funzione di una variabile (la soluzione di y' = x - y): una curva.
  const curveName = (m: MathNode) => (m.k === 'name' || (m.k === 'apply' && !m.primes && m.args.length === 1)) && noteFns.get(m.name)?.params.length === 1
  let space =
    !gauss &&
    lines.some((l) => {
      if (curveName(l.main)) return false
      const dims = calculusDims(l.main, shapes)
      if (dims) return dims === 3
      const def = definitionOf(l.main)
      if (def?.params && gradients.has(def.name)) return false
      return isSpaceLine(l.main, zFree) || zPlane(l) || (l.main.k === 'name' && xyParams(noteFns.get(l.main.name)?.params)) || linearDims(l.main, linear) === 3
    })

  // Un integrale doppio con solo numeri e insiemi attorno: si vede il volume sotto la superficie,
  // nello spazio (se la funzione è 1, cioè l'area del dominio, il dominio nel piano).
  if (!space && !gauss) {
    const neutral = (l: Line) => {
      const def = definitionOf(l.main)
      return !!multipleOf(l.main) || (!!def && !def.params) || !!rangeLine(l.main) || l.main.k === 'set'
    }
    const volume = (l: Line) => {
      const m = multipleOf(l.main)
      const vars = m ? multipleVars(m) : []
      return m?.dims === 2 && vars.includes('x') && vars.includes('y') && (dependsOn(integrandOf(m), 'x') || dependsOn(integrandOf(m), 'y'))
    }
    space = lines.length > 0 && lines.every(neutral) && lines.some(volume)
  }
  spec.dim = space ? 3 : 2
  if (gauss) spec.gauss = true

  // Prima le definizioni (a = 2, f(x) = …), in qualsiasi ordine: ognuna appena ha quello che le serve.
  const consts = new Map(sheet.scope().consts)
  const fns = new Map(sheet.scope().fns)
  const sets = new Map(sheet.scope().sets)
  const scope = (): Scope => ({ vars: new Set(), consts, fns, sets })
  const complexes: ComplexDefinitions = {
    consts: new Map(sheet.complexValues()),
    fns: new Map(noteComplex.fns),
    scope: () => {
      const all = new Map<string, Complex>()
      for (const [name, value] of consts) all.set(name, { re: value, im: 0 })
      for (const [name, value] of complexes.consts) all.set(name, value)
      return { vars: new Set(), consts: all, fns: new Map(complexes.fns) }
    },
  }
  const pending = new Map<Line, Definition>()
  const drawn: Line[] = []
  /** Le definizioni del blocco riuscite, nell'ordine in cui si sono fatte: per rifarle nel foglio delle curve e dei campi. */
  const madeLines: Line[] = []
  for (const l of lines) {
    const def = figureLines.has(l) || vectorLines.has(l) ? null : definitionOf(l.main, space)
    if (def) {
      pending.set(l, def)
      defined.add(def.name)
    } else drawn.push(l)
  }
  for (let progress = true; progress && pending.size; ) {
    progress = false
    for (const [l, def] of pending) {
      // Prima quelle che usa, se sono nel blocco: le definizioni del blocco valgono più di quelle della nota.
      const uses = namesIn(def.value, new Set(), new Set(def.params ?? []))
      if ([...pending.values()].some((other) => other.name !== def.name && uses.has(other.name))) continue
      try {
        define(def, l.cond, scope(), consts, fns, sets, values, gauss ? complexes : undefined)
      } catch {
        // Riprova dopo le altre: forse usa qualcosa definito più sotto.
        continue
      }
      madeLines.push(l)
      pending.delete(l)
      progress = true
      // Le funzioni di una variabile si disegnano (nello spazio quelle di x e y), le aree e i volumi
      // con un nome (A = \int_0^2 x^2 \, dx) e gli insiemi (D = \{…\}).
      // Nel piano di Gauss anche i numeri complessi definiti (w = 1 + i), come frecce.
      const complexNumber = gauss && !def.params && complexes.consts.has(def.name)
      if ((space ? xyParams(def.params) : def.params?.length === 1) || areaOf(l.main) || multipleOf(l.main) || def.value.k === 'set' || complexNumber) drawn.push(l)
    }
  }
  // Quelle rimaste: o sbagliate, o in un giro (f usa g che usa f).
  const waiting = new Map([...pending.values()].map((d) => [d.name, d]))
  const reaches = (from: string, target: string, seen: Set<string>): boolean => {
    const def = waiting.get(from)
    if (!def) return false
    for (const n of namesIn(def.value, new Set(), new Set(def.params ?? []))) {
      if (n === target) return true
      if (!seen.has(n)) {
        seen.add(n)
        if (reaches(n, target, seen)) return true
      }
    }
    return false
  }
  for (const [l, def] of pending) {
    try {
      define(def, l.cond, scope(), consts, fns, sets, values, gauss ? complexes : undefined)
      madeLines.push(l)
    } catch (err) {
      failLine(l, reaches(def.name, def.name, new Set()) ? new MathError(`${def.name} usa sé stessa (anche attraverso un'altra definizione)`) : err)
    }
  }

  // Le curve, le superfici e i campi con i numeri e le funzioni del blocco.
  if (vectorLines.size || lines.some((l) => l.main.k === 'lint' || l.main.k === 'sint' || (l.main.k === 'fn' && l.main.name === 'grad'))) {
    for (const l of madeLines) sheet.define(l.text)
    for (const l of vectorLines) sheet.define(l.text)
  }
  const fieldContext: FieldContext = {
    scope: { ...scope(), vfns: sheet.scope().vfns },
    symbols: sheet.symbolScope(),
    own: new Map(lines.flatMap((l): [string, number][] => (vectorDefinition(l.main) ? [[vectorDefinition(l.main)!.name, l.line]] : l.main.k === 'name' ? [[l.main.name, l.line]] : []))),
  }
  /** Gli integrali sulle curve e sulle superfici che un'altra riga disegna: prendono il suo colore. */
  const sameLines = new Map<GraphItem, number>()

  // Poi le righe da disegnare, nell'ordine in cui sono scritte, e quelle che dicono da dove a dove.
  const ranges = new Map<string, Range>()
  const sliderRanges = new Map<string, { range: Range; ends: [string, string]; line: Line }>()
  /** Le coordinate: la parte da mostrare, mai uno slider. */
  const coords = space ? ['x', 'y', 'z'] : ['x', 'y']
  drawn.sort((a, b) => a.line - b.line)
  // Un'area sotto una curva che un'altra riga disegna (y = x^2 e \int_0^2 x^2 \, dx, f(x) = … e
  // \int_0^2 f(x) \, dx) prende il colore di quella riga e non la ridisegna. Si guarda solo come
  // sono scritte le righe: così i colori non cambiano muovendo uno slider.
  const under = new Map<number, number>()
  if (!space) {
    const curves = drawn.filter((l) => !rangeLine(l.main) && !areaOf(l.main)).map((l) => ({ line: l.line, keys: curveKeys(l.main, scope()) }))
    const areaCurves: typeof curves = []
    for (const l of drawn) {
      const area = areaOf(l.main)
      if (!area) continue
      const keys = shapeKeys(area.int.body, area.int.v)
      const same = (c: { keys: string[] }) => c.keys.some((k) => keys.includes(k))
      const curve = curves.find(same) ?? areaCurves.find(same)
      if (curve) under.set(l.line, curve.line)
      else areaCurves.push({ line: l.line, keys })
    }
  }
  /** Il colore di ogni riga che ne ha uno suo. */
  const slots = new Map<number, number>()
  let slot = 0
  for (const l of drawn) {
    const r = rangeLine(l.main)
    if (r) {
      try {
        const range: Range = [constantValue(r.lo, scope()), constantValue(r.hi, scope())]
        if (!(Number.isFinite(range[0]) && Number.isFinite(range[1]) && range[1] > range[0])) {
          const example = AXES.includes(r.name) || coords.includes(r.name) ? 'x \\in [-5, 5]' : `${nameLatex(r.name)} \\in [0, 5]`
          throw new MathError(`Servono due estremi, dal più piccolo al più grande: ${example}`)
        }
        ranges.set(r.name, range)
        if (!coords.includes(r.name)) sliderRanges.set(r.name, { range, ends: [toLatex(r.lo), toLatex(r.hi)], line: l })
      } catch (err) {
        failLine(l, err)
      }
      continue
    }
    const own = !under.has(l.line)
    try {
      // Un campo, una curva o una superficie con il nome, un gradiente, un integrale di linea o di superficie.
      const calculus = calculusItems(l, fieldContext, slot, space)
      if (calculus) {
        spec.items.push(...calculus.items)
        if (calculus.sameAs !== undefined) sameLines.set(calculus.items[0], calculus.sameAs)
        else slots.set(l.line, slot)
        slot += calculus.colors
        continue
      }
      const complexLine =
        gauss && (isComplexLine(l.main, complexes.scope(), new Set(consts.keys())) || onlyComplex(l.main, (n) => compile(n, scope(), { calc: true })({}), complexes.scope()))
      const item =
        linearItem(l, linear, slot, space) ??
        (space ? spaceItemFor(l, scope(), slot) : complexLine ? gaussItem(l, complexes.scope(), sets, slot) : itemFor(l, scope(), slot, own))
      if (item.kind !== 'point' && item.kind !== 'point3' && own) slots.set(l.line, slot++)
      spec.items.push(item)
    } catch (err) {
      if (!looksLikePoint(l.main) && own) slots.set(l.line, slot++)
      failLine(l, err)
    }
  }
  for (const item of spec.items) {
    const curve = under.get(item.line)
    if (curve !== undefined) item.slot = slots.get(curve) ?? item.slot
    const same = sameLines.get(item)
    if (same !== undefined) item.slot = slots.get(same) ?? item.slot
  }
  // I punti della nota usati dalle figure (\triangle ABC, \operatorname{retta}(A, B)): anche loro,
  // con il nome, così si vede quale vertice è quale.
  // Quelli che il blocco disegna già (una riga con solo M) non si ripetono.
  const vertices = new Set<string>(spec.items.flatMap((i) => ((i.kind === 'point' || i.kind === 'point3') && i.name ? [i.name] : [])))
  for (const l of drawn) {
    const item = spec.items.find((i) => i.line === l.line)
    if (!item || item.kind === 'point' || item.kind === 'point3' || !usesLinear(l.main, linear)) continue
    for (const name of namesIn(namedFigure(l.main)?.value ?? l.main)) {
      const value = noteLinear.values.get(name)?.float
      if (!/^[A-Z]/.test(name) || blockFigures.has(name) || vertices.has(name) || value?.k !== 'matrix' || value.m[0].length !== 1) continue
      const c = value.m.map((r) => r[0])
      if (c.length !== (space ? 3 : 2) || !c.every(Number.isFinite)) continue
      vertices.add(name)
      const base = { line: l.line, label: nameLatex(name), slot: -1, name, fromNote: true }
      spec.items.push(space ? { ...base, kind: 'point3', x: c[0], y: c[1], z: c[2] } : { ...base, kind: 'point', x: c[0], y: c[1] })
    }
  }
  // Un integrale su un insieme che il blocco disegna già (D = \{…\} e \iint_D 1 \, dA): una zona sola.
  const itemAt = (line: number) => spec.items.find((i) => i.line === line)
  const setItems = new Map<string, GraphItem>()
  for (const l of drawn) {
    const set = setOf(l.main, scope())
    const item = set?.name ? itemAt(l.line) : undefined
    if (set?.name && item) setItems.set(set.name, item)
  }
  for (const l of drawn) {
    const m = multipleOf(l.main)
    const domain = m?.node.k === 'mint' ? m.node.domain : null
    const target = domain?.k === 'name' ? setItems.get(domain.name) : undefined
    const item = itemAt(l.line)
    if (target && item && item !== target && item.kind === target.kind) {
      item.slot = target.slot
      item.same = true
    }
  }
  spec.x = ranges.get('x') ?? null
  spec.y = ranges.get('y') ?? null
  spec.z = space ? ranges.get('z') ?? null : null
  const functions = spec.items.filter((i) => i.kind === 'function' || i.kind === 'area')
  spec.trig = functions.some((i) => trig.has(i.line)) || (functions.length > 0 && defs.some((d) => /\\?(sin|cos|tan|tg)\b/.test(d)))
  // Gli intervalli dei parametri (t \in [0, 1]): una retta con il suo intervallo è solo quel pezzo.
  const params = new Set<string>()
  for (const item of spec.items) {
    if (item.kind === 'parametric' || item.kind === 'curve3') {
      params.add(item.param)
      const t = ranges.get(item.param)
      if (t) {
        item.t = t
        item.straight = false
      }
    } else if (item.kind === 'patch') {
      item.params.forEach((p) => params.add(p))
      item.u = ranges.get(item.params[0]) ?? item.u
      item.v = ranges.get(item.params[1]) ?? item.v
    }
  }
  if (space) {
    for (const l of drawn) {
      const tuple = tupleOf(l.main)
      if (tuple) tupleParams(tuple.coords, scope()).forEach((p) => params.add(p))
    }
  }

  // Gli slider: i numeri scritti con le cifre (nella nota o nel blocco) che il grafico usa, anche
  // attraverso le altre definizioni (f(x) = a x^2 usa a).
  const blockDefs = new Map<string, { def: Definition; line: number }>()
  for (const l of lines) {
    const def = definitionOf(l.main, space)
    if (def) blockDefs.set(def.name, { def, line: l.line })
  }
  const noteDefs = new Map<string, number>()
  sheet.definitions.forEach((d, i) => noteDefs.set(d.name, i))
  const lastNoteDef = (name: string) => sheet.definitions[noteDefs.get(name) ?? -1]
  const usesOf = (name: string): Set<string> => {
    const b = blockDefs.get(name)
    if (b) return namesIn(b.def.value, new Set(), new Set(b.def.params ?? []))
    return new Set(sheet.definitions.filter((d) => d.name === name).flatMap((d) => [...d.uses]))
  }
  // Il valore di un integrale (A = \int_0^2 x^2 \, dx) si calcola: non ha uno slider.
  const isNumber = (name: string): boolean => {
    if (!consts.has(name)) return false
    const b = blockDefs.get(name)?.def ?? lastNoteDef(name)
    return !!b && !b.params && b.value.k !== 'int' && b.value.k !== 'mint' && onlyDigits(usesOf(name))
  }
  const used = new Set<string>()
  for (const l of drawn) {
    namesIn(l.main, used)
    if (l.cond) namesIn(l.cond, used)
  }
  for (const queue = [...used]; queue.length; ) {
    for (const u of usesOf(queue.pop()!)) {
      if (!used.has(u)) {
        used.add(u)
        queue.push(u)
      }
    }
  }
  const counters = new Set<string>()
  for (const l of lines) termCounters(l.main, counters)
  for (const d of sheet.definitions) termCounters(d.value, counters)
  const order = (name: string) => (blockDefs.has(name) ? 1e6 + blockDefs.get(name)!.line : noteDefs.get(name) ?? 0)
  spec.sliders = [...used]
    // Nello spazio la z è una coordinata, anche se la nota la definisce.
    .filter((name) => isNumber(name) && !coords.includes(name))
    .sort((a, b) => order(a) - order(b))
    .map((name) => {
      const value = consts.get(name)!
      const integer = counters.has(name)
      const written = sliderRanges.get(name)
      const range = written?.range ?? defaultRange(value, integer)
      return { name, value, range, ends: written?.ends ?? [String(range[0]), String(range[1])], step: integer ? 1 : sliderStep(range), integer }
    })
  // Un intervallo per un nome che non è un numero da muovere (né un parametro).
  for (const [name, r] of sliderRanges) {
    if (isNumber(name) || name === 't' || name === 'θ' || params.has(name)) continue
    const def = blockDefs.get(name)?.def ?? lastNoteDef(name)
    if (fns.has(name) || def?.params) failLine(r.line, new MathError(`${name} è una funzione: lo slider è per i numeri, come a = 2`))
    else if (def && (def.value.k === 'int' || def.value.k === 'mint' || !onlyDigits(usesOf(name)))) failLine(r.line, new MathError(`${name} si calcola da altri numeri: lo slider è per quelli scritti con le cifre, come a = 2`))
    else failLine(r.line, new UndefinedName(name))
  }

  // I nomi che mancano: la riga da aggiungere al blocco per averli, con uno slider (k = 1, o
  // l'inizio dell'intervallo scritto, se 1 è fuori).
  for (const { error, line } of undefinedIn) {
    const missing = missingNumbers(line, scope(), space).filter((name) => !defined.has(name) && !(gauss && (name === 'i' || name === 'z')))
    if (!missing.length || missing.length > 6 || hasWord(line.text)) continue
    error.add = missing.map((name) => {
      const r = sliderRanges.get(name)
      const value = !r || (r.range[0] <= 1 && r.range[1] >= 1) ? '1' : r.ends[0]
      return { name, line: `${nameLatex(name)} = ${value}` }
    })
  }
  spec.errors.sort((a, b) => a.line - b.line)
  return spec
}

/** Quattro lettere attaccate (velocita): è una parola scritta senza \text, non quattro numeri da muovere. */
function hasWord(text: string): boolean {
  let run = 0
  let end = -1
  for (const t of tokenize(text)) {
    run = t.k === 'name' && /^[a-zA-Z]$/.test(t.v) ? (t.pos === end ? run + 1 : 1) : 0
    if (run >= 4) return true
    end = t.end
  }
  return false
}

/**
 * I numeri che mancano in una riga (non definiti né nella nota né nel blocco): i nomi da soli e
 * quelli davanti a una parentesi con un'espressione (k(x - 1) è un prodotto); g(x) invece è una
 * funzione, e uno slider non serve.
 */
function missingNumbers(l: Line, scope: Scope, space = false): string[] {
  const out = new Set<string>()
  // Nello spazio anche z e i parametri della riga (u e v in (u \cos v, u \sin v, u)).
  const tuple = space ? tupleOf(l.main) : null
  const extra = new Set(space ? ['z', ...(tuple ? tupleParams(tuple.coords, scope) : [])] : [])
  const known = (name: string, bound: ReadonlySet<string>) =>
    bound.has(name) || AXES.includes(name) || extra.has(name) || name === 'π' || name === 'e' || scope.consts.has(name) || scope.fns.has(name)
  const visit = (n: MathNode, bound: ReadonlySet<string>): void => {
    if (n.k === 'name') {
      if (!known(n.name, bound)) out.add(n.name)
      return
    }
    if (n.k === 'apply') {
      const product = !n.primes && n.args.length === 1 && n.args[0].k !== 'name'
      if (product && !known(n.name, bound)) out.add(n.name)
    }
    if (n.k === 'big' || n.k === 'int') {
      visit(n.from, bound)
      visit(n.to, bound)
      visit(n.body, new Set([...bound, n.v]))
      return
    }
    if (n.k === 'mint' || n.k === 'set') {
      const inner = new Set([...bound, ...((n.k === 'mint' ? n.vars : n.vars) ?? []), 'x', 'y', 'z'])
      for (const child of children(n)) visit(child, inner)
      return
    }
    for (const child of children(n)) visit(child, bound)
  }
  const def = definitionOf(l.main, space)
  const polar = l.main.k === 'rel' && l.main.items[0].k === 'name' && l.main.items[0].name === 'r' && dependsOn(l.main.items[1], 'θ')
  if (def) visit(def.value, new Set(def.params ?? []))
  else if (polar) visit((l.main as Extract<MathNode, { k: 'rel' }>).items[1], new Set())
  else visit(l.main, new Set())
  if (l.cond) visit(l.cond, new Set(def?.params ?? []))
  return [...out]
}

/** L'area di un integrale: la funzione da integrare (nella x del grafico), gli estremi e il valore. */
function areaFor(l: Line, { int, name }: NonNullable<ReturnType<typeof areaOf>>, scope: Scope, slot: number, curve: boolean): GraphItem {
  if (l.cond) throw new MathError('Un integrale non ha condizioni: dicono dove gli estremi, es. \\int_0^2')
  const from = constantValue(int.from, scope)
  const to = constantValue(int.to, scope)
  if (Number.isNaN(from) || Number.isNaN(to)) throw new MathError('Gli estremi dell\'integrale non sono numeri')
  const body = compile(int.body, scopeWith(scope, [int.v]))
  const v: Record<string, number> = { [int.v]: 0 }
  const value = compile(int, scope, { calc: true })({})
  // Il valore come nei risultati della nota (2,666666…); se l'integrale non converge, niente.
  const shown = formatNumber(value, { comma: true, decimal: true, digits: 9 })
  const label = `${name ? `${nameLatex(name)} = ` : ''}${toLatex(int)}${shown ? ` = ${shown.tex}` : ''}`
  return { kind: 'area', line: l.line, label, slot, f: (x) => ((v[int.v] = x), body(v)), from, to, value, curve }
}

/** Il valore di un integrale doppio o triplo come nei risultati della nota (meno cifre di quelli semplici). */
function multipleLabel(m: Multiple, scope: Scope): string {
  const value = compile(m.node, scope, { calc: true })({})
  const shown = formatNumber(value, { comma: true, decimal: true, digits: m.dims === 2 ? 8 : 7 })
  return `${m.name ? `${nameLatex(m.name)} = ` : ''}${toLatex(m.node)}${shown ? ` = ${shown.tex}` : ''}`
}

/** Il rettangolo dove sta una zona del piano (dove M ≥ 0), cercato su una griglia: per sapere il segno della funzione lì. */
function planeExtent(M: (x: number, y: number) => number): { x: Range; y: Range } {
  let x0 = Infinity
  let x1 = -Infinity
  let y0 = Infinity
  let y1 = -Infinity
  for (let j = 0; j <= 60; j++) {
    for (let i = 0; i <= 60; i++) {
      const x = -12 + i * 0.4
      const y = -12 + j * 0.4
      if (!(M(x, y) >= 0)) continue
      x0 = Math.min(x0, x)
      x1 = Math.max(x1, x)
      y0 = Math.min(y0, y)
      y1 = Math.max(y1, y)
    }
  }
  return x0 <= x1 ? { x: [x0 - 0.4, x1 + 0.4], y: [y0 - 0.4, y1 + 0.4] } : { x: [-1, 1], y: [-1, 1] }
}

/** Il margine nel piano xy, o l'errore se le variabili non sono x e y (o r e θ). */
function flatMargin(vars: string[], margin: Compiled): (x: number, y: number) => number {
  const M = planeMargin(vars, margin)
  if (!M) throw new MathError(`Le variabili sono ${vars.join(', ')}: nel piano si disegnano i domini in x e y (o r e θ)`)
  return M
}

/**
 * Una zona del piano: le disuguaglianze in x e y (y > x^2), un insieme (D = \{…\}, o il suo nome)
 * o il dominio di un integrale doppio (con il valore nella legenda). Null se la riga è altro.
 */
function planeRegionFor(l: Line, scope: Scope, slot: number): GraphItem | null {
  const { main, cond, line } = l
  const multiple = multipleOf(main)
  if (multiple) {
    if (cond) throw new MathError('Un integrale non ha condizioni: il dominio va sotto, es. \\iint_D')
    const region = integralRegion(multiple.node, scope)
    return { kind: 'region', line, label: multipleLabel(multiple, scope), slot, M: flatMargin(region.vars, region.margin), strict: false, parts: planeParts(region) }
  }
  const set = setOf(main, scope)
  if (set) {
    if (cond) throw new MathError('Le condizioni vanno dentro l\'insieme')
    const domain = inequalityMargin(set.node, scope, null)
    return { kind: 'region', line, label: toLatex(main), slot, M: flatMargin(domain.vars, domain.margin), strict: domain.strict, parts: planeParts(domain) }
  }
  if (inequalities(main) && (dependsOn(main, 'x') || dependsOn(main, 'y'))) {
    const node: MathNode = cond ? { k: 'and', items: [main, cond] } : main
    const domain = inequalityMargin(node, scope, ['x', 'y'])
    return { kind: 'region', line, label: `${toLatex(main)}${condLabel(cond)}`, slot, M: flatMargin(['x', 'y'], domain.margin), strict: domain.strict, parts: planeParts(domain) }
  }
  return null
}

/**
 * Un solido dello spazio: le disuguaglianze in x, y e z, un insieme con tre variabili, il dominio di
 * un integrale triplo o il volume sotto la superficie di un integrale doppio; un insieme del piano
 * o una zona del piano stanno nel piano xy. Null se la riga è altro.
 */
function spaceRegionFor(l: Line, scope: Scope, slot: number): GraphItem | null {
  const { main, cond, line } = l
  const multiple = multipleOf(main)
  if (multiple) {
    if (cond) throw new MathError('Un integrale non ha condizioni: il dominio va sotto, es. \\iiint_E')
    const region = integralRegion(multiple.node, scope)
    const label = multipleLabel(multiple, scope)
    if (multiple.dims === 3) {
      const M = spaceMargin(region.vars, region.margin)
      if (!M) throw new MathError(`Le variabili sono ${region.vars.join(', ')}: nello spazio si disegnano i domini in x, y e z (o cilindriche, o sferiche)`)
      return { kind: 'solid', line, label, slot, M, parts: spaceParts(region.vars, region.parts), layers: spaceLayers(region.layers) }
    }
    // L'area del dominio (la funzione è 1): il dominio nel piano xy.
    if (constantIntegrand(region)) return { kind: 'region', line, label, slot, M: flatMargin(region.vars, region.margin), strict: false, parts: planeParts(region) }
    const M = volumeMargin(region)
    if (!M) throw new MathError('Il volume si disegna per gli integrali in x e y: con r e θ dentro la funzione c\'è anche r')
    const base = flatMargin(region.vars, region.margin)
    return { kind: 'solid', line, label, slot, M, parts: volumeParts(region, planeExtent(base)), layers: volumeLayers(region) }
  }
  const set = setOf(main, scope)
  if (set) {
    if (cond) throw new MathError('Le condizioni vanno dentro l\'insieme')
    const domain = inequalityMargin(set.node, scope, null)
    const { vars, margin, strict, parts, layers } = domain
    if (vars.length === 2) return { kind: 'region', line, label: toLatex(main), slot, M: flatMargin(vars, margin), strict, parts: planeParts(domain) }
    const M = spaceMargin(vars, margin)
    if (!M) throw new MathError(`Le variabili sono ${vars.join(', ')}: nello spazio si disegnano gli insiemi in x, y e z`)
    return { kind: 'solid', line, label: toLatex(main), slot, M, parts: spaceParts(vars, parts), layers: spaceLayers(layers) }
  }
  if (inequalities(main)) {
    const node: MathNode = cond ? { k: 'and', items: [main, cond] } : main
    const { margin, parts, layers } = inequalityMargin(node, scope, ['x', 'y', 'z'])
    const label = `${toLatex(main)}${condLabel(cond)}`
    return { kind: 'solid', line, label, slot, M: spaceMargin(['x', 'y', 'z'], margin)!, parts: spaceParts(['x', 'y', 'z'], parts), layers: spaceLayers(layers) }
  }
  return null
}

/** Quello che disegna una riga; `curve`: un'area disegna anche la sua curva (vedi readGraph). */
function itemFor(l: Line, scope: Scope, slot: number, curve = true): GraphItem {
  const { main, cond, line } = l
  const area = areaOf(main)
  if (area) return areaFor(l, area, scope, slot, curve)
  const region = planeRegionFor(l, scope, slot)
  if (region) return region

  // Un punto: (1, 2), P = (1, 2), P(1, 2). Con t (o θ) è una curva con un parametro.
  let coords: MathNode[] | null = null
  let name: string | null = null
  if (main.k === 'tuple') coords = main.items
  else if (main.k === 'rel' && main.ops.length === 1 && main.ops[0] === '=' && main.items[0].k === 'name' && main.items[1].k === 'tuple') {
    coords = main.items[1].items
    name = main.items[0].name
  } else if (main.k === 'apply' && !scope.fns.has(main.name) && main.args.length === 2) {
    coords = main.args
    name = main.name
  }
  if (coords) {
    if (coords.length !== 2) throw new MathError('Un punto ha due coordinate: (x, y)')
    const param = coords.some((n) => dependsOn(n, 'θ')) ? 'θ' : 't'
    if (coords.some((n) => dependsOn(n, param))) {
      const inner = scopeWith(scope, [param])
      const fx = restrict(compile(coords[0], inner), cond, inner)
      const fy = compile(coords[1], inner)
      const v: Record<string, number> = { [param]: 0 }
      const label = `${name ? `${nameLatex(name)} = ` : ''}${toLatex({ k: 'tuple', items: coords })}${condLabel(cond)}`
      const [fxt, fyt] = [(t: number) => ((v[param] = t), fx(v)), (t: number) => ((v[param] = t), fy(v))]
      return { kind: 'parametric', line, label, slot, param, t: [0, 2 * Math.PI], fx: fxt, fy: fyt, straight: !cond && isStraight([fxt, fyt]) }
    }
    if (cond) throw new MathError('Un punto non ha condizioni')
    const [x, y] = coords.map((n) => compile(n, scope)({}))
    if (!Number.isFinite(x) || !Number.isFinite(y)) throw new MathError('Le coordinate del punto non sono numeri')
    // \vec{v} = (2, 1): una freccia dall'origine.
    if (isVectorName(name)) return { kind: 'vector', line, label: `${nameLatex(name)} = ${toLatex({ k: 'tuple', items: coords })}`, slot, from: [0, 0, 0], to: [x, y, 0], name }
    return { kind: 'point', line, label: name ? nameLatex(name) : '', slot: -1, x, y, name }
  }

  if (main.k === 'rel') {
    if (main.ops.length !== 1 || main.ops[0] !== '=') {
      if (main.ops.every((op) => op === '=')) throw new MathError('In una riga va un\'uguaglianza sola')
      throw new MathError('Un\'uguaglianza e una disuguaglianza insieme: scrivile in due righe')
    }
    const [lhs, rhs] = main.items
    const label = `${toLatex(main)}${condLabel(cond)}`
    // f(x) = … (già definita): la curva è la funzione, con la sua variabile.
    if (lhs.k === 'apply' && lhs.args.length === 1 && scope.fns.get(lhs.name)?.params.length === 1) {
      const fn = scope.fns.get(lhs.name)!
      return { kind: 'function', line, label, slot, f: (x) => fn.call([x]) }
    }
    // y = f(x)
    if (lhs.k === 'name' && lhs.name === 'y' && !dependsOn(rhs, 'y')) {
      const inner = scopeWith(scope, ['x'])
      const f = restrict(compile(rhs, inner), cond, inner)
      const v = { x: 0 }
      return { kind: 'function', line, label, slot, f: (x) => ((v.x = x), f(v)) }
    }
    // x = 3: retta verticale
    if (lhs.k === 'name' && lhs.name === 'x' && !dependsOn(rhs, 'y') && !dependsOn(rhs, 'x')) {
      if (cond) throw new MathError('Una retta verticale non ha condizioni')
      const x = compile(rhs, scope)({})
      if (!Number.isFinite(x)) throw new MathError('x non è un numero')
      return { kind: 'vertical', line, label, slot, x }
    }
    // r = f(θ): coordinate polari
    if (lhs.k === 'name' && lhs.name === 'r' && dependsOn(rhs, 'θ')) {
      const inner = scopeWith(scope, ['θ'])
      const r = restrict(compile(rhs, inner), cond, inner)
      const v = { θ: 0 }
      return {
        kind: 'parametric',
        line,
        label,
        slot,
        param: 'θ',
        t: [0, 2 * Math.PI],
        fx: (t) => ((v.θ = t), r(v) * Math.cos(t)),
        fy: (t) => ((v.θ = t), r(v) * Math.sin(t)),
        straight: false,
      }
    }
    // Una curva qualsiasi: sinistra - destra = 0
    if (!dependsOn(main, 'x') && !dependsOn(main, 'y')) throw new MathError('Mancano x e y: cosa disegno?')
    const xy = scopeWith(scope, ['x', 'y'])
    const left = compile(lhs, xy)
    const right = compile(rhs, xy)
    const ok = cond ? compileCondition(cond, xy) : null
    const v = { x: 0, y: 0 }
    return {
      kind: 'implicit',
      line,
      label,
      slot,
      F: (x, y) => {
        v.x = x
        v.y = y
        return ok && !ok(v) ? NaN : left(v) - right(v)
      },
    }
  }

  if (main.k === 'in' || main.k === 'and' || main.k === 'or') throw new MathError('Una condizione da sola non si disegna: per la parte da mostrare scrivi x \\in [a, b]')
  // f: una funzione definita (nella nota o nel blocco), da sola.
  if (main.k === 'name' && scope.fns.has(main.name)) {
    const fn = scope.fns.get(main.name)!
    if (fn.params.length !== 1) throw new MathError(`${main.name} ha ${fn.params.length} variabili: si disegnano le funzioni di una`)
    return { kind: 'function', line, label: `${nameLatex(main.name)}(${nameLatex(fn.params[0])})`, slot, f: (x) => fn.call([x]) }
  }
  // Un'espressione da sola: è y = …
  if (!dependsOn(main, 'x')) throw new MathError('Manca la x: per una retta orizzontale scrivi y = 3')
  const inner = scopeWith(scope, ['x'])
  const f = restrict(compile(main, inner), cond, inner)
  const v = { x: 0 }
  return { kind: 'function', line, label: `y = ${toLatex(main)}${condLabel(cond)}`, slot, f: (x) => ((v.x = x), f(v)) }
}

/** La superficie z = f(x, y) di una funzione di x e y (scritta f(x, y) o f(y, x)). */
function surfaceOf(fn: UserFunction): (x: number, y: number) => number {
  const xFirst = fn.params[0] === 'x'
  return (x, y) => fn.call(xFirst ? [x, y] : [y, x])
}

/** Un punto, un vettore, una curva o una superficie con i parametri, nello spazio. */
function spaceTuple(l: Line, { coords, name }: { coords: MathNode[]; name: string | null }, scope: Scope, slot: number): GraphItem {
  const { cond, line } = l
  if (coords.length !== 2 && coords.length !== 3) throw new MathError('Un punto nello spazio ha tre coordinate: (x, y, z)')
  // (x, y) nello spazio è nel piano xy.
  const all: MathNode[] = coords.length === 3 ? coords : [...coords, { k: 'num', v: 0, text: '0', comma: false }]
  const params = tupleParams(all, scope)
  const label = `${name ? `${nameLatex(name)} = ` : ''}${toLatex({ k: 'tuple', items: coords })}${condLabel(cond)}`
  if (!params.length) {
    if (cond) throw new MathError('Un punto non ha condizioni')
    const [x, y, z] = all.map((n) => compile(n, scope)({}))
    if (![x, y, z].every(Number.isFinite)) throw new MathError('Le coordinate del punto non sono numeri')
    if (isVectorName(name)) return { kind: 'vector', line, label, slot, from: [0, 0, 0], to: [x, y, z], name }
    return { kind: 'point3', line, label: name ? nameLatex(name) : '', slot: -1, x, y, z, name }
  }
  if (params.length > 2) throw new MathError(`Troppi parametri (${params.join(', ')}): una curva ne ha uno, una superficie due`)
  const inner = scopeWith(scope, params)
  const [cx, cy, cz] = all.map((n, i) => (i === 0 ? restrict(compile(n, inner), cond, inner) : compile(n, inner)))
  const v: Record<string, number> = Object.fromEntries(params.map((p) => [p, 0]))
  if (params.length === 1) {
    const [p] = params
    const at = (f: Compiled) => (t: number) => ((v[p] = t), f(v))
    const [fx, fy, fz] = [at(cx), at(cy), at(cz)]
    return { kind: 'curve3', line, label, slot, param: p, t: p === 'φ' ? [0, Math.PI] : [0, 2 * Math.PI], straight: !cond && isStraight([fx, fy, fz]), fx, fy, fz }
  }
  const [p, q] = params
  const at = (f: Compiled) => (a: number, b: number) => ((v[p] = a), (v[q] = b), f(v))
  return { kind: 'patch', line, label, slot, params: [p, q], u: patchRange(p, all), v: patchRange(q, all), fx: at(cx), fy: at(cy), fz: at(cz) }
}

/**
 * Quello che disegna una riga in un grafico 3D: z = f(x, y) e le funzioni di x e y sono superfici
 * sopra il piano xy, le altre equazioni superfici qualsiasi (x = 2 e x + y + z = 1 piani), i punti
 * con tre coordinate punti, con i parametri curve e superfici.
 */
function spaceItemFor(l: Line, scope: Scope, slot: number): GraphItem {
  const { main, cond, line } = l
  if (areaOf(main)) throw new MathError('Nei grafici 3D l\'area sotto una curva non si disegna: scrivila in un grafico senza la z')
  const solid = spaceRegionFor(l, scope, slot)
  if (solid) return solid
  const tuple = tupleOf(main)
  if (tuple && !(main.k === 'apply' && scope.fns.has(main.name))) return spaceTuple(l, tuple, scope, slot)
  if (main.k === 'rel') {
    if (main.ops.length !== 1 || main.ops[0] !== '=') {
      if (main.ops.every((op) => op === '=')) throw new MathError('In una riga va un\'uguaglianza sola')
      throw new MathError('Un\'uguaglianza e una disuguaglianza insieme: scrivile in due righe')
    }
    const [lhs, rhs] = main.items
    const label = `${toLatex(main)}${condLabel(cond)}`
    // f(x, y) = …: la superficie z = f(x, y).
    const fn = lhs.k === 'apply' && xyArgs(lhs.args) ? scope.fns.get(lhs.name) : undefined
    if (fn && xyParams(fn.params)) return { kind: 'surface', line, label, slot, f: surfaceOf(fn) }
    // z = f(x, y)
    if (lhs.k === 'name' && lhs.name === 'z' && !dependsOn(rhs, 'z')) {
      const inner = scopeWith(scope, ['x', 'y'])
      const f = restrict(compile(rhs, inner), cond, inner)
      const v = { x: 0, y: 0 }
      return { kind: 'surface', line, label, slot, f: (x, y) => ((v.x = x), (v.y = y), f(v)) }
    }
    // r = f(θ): una curva in coordinate polari, nel piano xy.
    if (lhs.k === 'name' && lhs.name === 'r' && dependsOn(rhs, 'θ') && !dependsOn(rhs, 'z')) {
      const inner = scopeWith(scope, ['θ'])
      const r = restrict(compile(rhs, inner), cond, inner)
      const v = { θ: 0 }
      const at = (g: (t: number) => number) => (t: number) => ((v.θ = t), g(t) * r(v))
      return { kind: 'curve3', line, label, slot, param: 'θ', t: [0, 2 * Math.PI], straight: false, fx: at(Math.cos), fy: at(Math.sin), fz: () => 0 }
    }
    if (!dependsOn(main, 'x') && !dependsOn(main, 'y') && !dependsOn(main, 'z')) throw new MathError('Mancano x, y e z: cosa disegno?')
    // Una superficie qualsiasi: sinistra - destra = 0.
    const xyz = scopeWith(scope, ['x', 'y', 'z'])
    const left = compile(lhs, xyz)
    const right = compile(rhs, xyz)
    const ok = cond ? compileCondition(cond, xyz) : null
    const v = { x: 0, y: 0, z: 0 }
    const F = (x: number, y: number, z: number) => {
      v.x = x
      v.y = y
      v.z = z
      return ok && !ok(v) ? NaN : left(v) - right(v)
    }
    return { kind: 'implicit3', line, label, slot, F, plane: ok ? null : planeOf(F) }
  }
  if (main.k === 'in' || main.k === 'and' || main.k === 'or') throw new MathError('Una condizione da sola non si disegna: per la parte da mostrare scrivi z \\in [a, b]')
  // f: una funzione di x e y, da sola.
  if (main.k === 'name' && scope.fns.has(main.name)) {
    const fn = scope.fns.get(main.name)!
    if (!xyParams(fn.params)) throw new MathError(`${main.name} non è una funzione di x e y: nello spazio si disegnano le superfici z = f(x, y)`)
    return { kind: 'surface', line, label: `${nameLatex(main.name)}(${fn.params.map(nameLatex).join(', ')})`, slot, f: surfaceOf(fn) }
  }
  if (!dependsOn(main, 'x') && !dependsOn(main, 'y')) throw new MathError('Mancano x e y: per un piano orizzontale scrivi z = 3')
  // Un'espressione in x e y da sola: è z = …
  const inner = scopeWith(scope, ['x', 'y'])
  const f = restrict(compile(main, inner), cond, inner)
  const v = { x: 0, y: 0 }
  return { kind: 'surface', line, label: `z = ${toLatex(main)}${condLabel(cond)}`, slot, f: (x, y) => ((v.x = x), (v.y = y), f(v)) }
}

/** La riga usa una funzione che si fa solo con le lettere (il polinomio di Taylor)? */
function usesSymbolicFunction(node: MathNode): boolean {
  if (node.k === 'fn' && SYMBOLIC_FNS.has(node.name)) return true
  return children(node).some(usesSymbolicFunction)
}

/** I nomi che il blocco usa: quelli da cercare tra le definizioni della nota. */
export function graphNames(source: string): Set<string> {
  const names = new Set<string>()
  for (const l of blockLines(source)) {
    try {
      const { main, cond } = parseLine(l.text)
      namesIn(main, names)
      if (cond) namesIn(cond, names)
    } catch {
      // Una riga sbagliata non usa niente.
    }
  }
  for (const c of ['x', 'y', 't', 'θ', 'π']) names.delete(c)
  return names
}

/**
 * La riga del blocco per una formula della nota: la formula stessa o, se è un integrale (anche
 * doppio o triplo), solo l'integrale (con il nome, se c'è), senza l'uguale finale né il risultato.
 */
export function formulaGraphLine(tex: string): string {
  const text = tex.trim()
  for (const t of [text, ...withoutResult(text)]) {
    let found: { name: string | null } | null
    try {
      const main = parseStatement(t).main
      found = areaOf(main) ?? multipleOf(main)
    } catch {
      continue
    }
    if (found) return splitEquals(t).slice(0, found.name ? 2 : 1).join('=').trim()
    if (t === text) break
  }
  return text
}

/**
 * La formula è una funzione (o una curva) da disegnare? `y = …` o `f(x) = …` con la x, `r = …` con
 * θ, un'equazione in x e y, un integrale (la sua area, o il dominio e il volume se è doppio o
 * triplo), un insieme (D = \{…\}), delle disuguaglianze in x e y (la zona); nello spazio `z = …`
 * o `f(x, y) = …` con x o y e le equazioni con la z. Se sì, il suo grafico (con le definizioni della
 * nota `defs`).
 */
export function formulaGraph(tex: string, defs: readonly string[] = []): GraphSpec | null {
  const text = formulaGraphLine(tex)
  if (!text || text.includes('\n')) return null
  let main: MathNode
  try {
    main = parseStatement(text).main
  } catch {
    return null
  }
  const all = namesIn(main)
  const axes = ['x', 'y', 'z'].filter((a) => all.has(a)).length
  const zone = inequalities(main) && axes >= 2
  // Un numero complesso, un'equazione o una zona nel piano di Gauss.
  const sheet = new Sheet()
  for (const d of defs) sheet.define(d)
  const complex = isComplexLine(main, sheet.complexScope(), new Set(sheet.scope().consts.keys()))
  // Un vettore (u + v, A v): la sua freccia; un punto o un vettore scritto con le coordinate.
  const tuple = tupleOf(main)
  const figure = linearValue(namedFigure(main)?.value ?? main, sheet.linearScope())
  const drawable = !!figure && figure.k !== 'scalar' && figure.k !== 'length' && !(figure.k === 'matrix' && figure.m[0].length !== 1)
  const vector = drawable || (!!tuple && (tuple.coords.length === 2 || tuple.coords.length === 3) && !tuple.coords.some((c) => namesIn(c).size))
  // Un integrale di linea o di superficie, un gradiente: la curva, la superficie, il campo.
  // Le curve di livello, il polinomio di Taylor (con la sua funzione), le equazioni differenziali.
  const calculus =
    main.k === 'lint' || main.k === 'sint' || (main.k === 'fn' && (main.name === 'grad' || main.name === 'levels' || SYMBOLIC_FNS.has(main.name))) || !!odeOf(main)
  if (!areaOf(main) && !multipleOf(main) && !setOf(main) && !zone && !complex && !vector && !calculus) {
    if (main.k !== 'rel' || main.ops.length !== 1 || main.ops[0] !== '=') return null
    const [lhs, rhs] = main.items
    const plottable =
      (lhs.k === 'name' && lhs.name === 'y' && namesIn(rhs).has('x')) ||
      (lhs.k === 'apply' && !lhs.primes && lhs.args.length === 1 && lhs.args[0].k === 'name' && namesIn(rhs).has(lhs.args[0].name)) ||
      (lhs.k === 'name' && lhs.name === 'r' && namesIn(rhs).has('θ')) ||
      (all.has('x') && all.has('y') && !(lhs.k === 'name' && (lhs.name === 'x' || lhs.name === 'y'))) ||
      (lhs.k === 'name' && lhs.name === 'z' && (namesIn(rhs).has('x') || namesIn(rhs).has('y'))) ||
      (lhs.k === 'apply' && !lhs.primes && xyArgs(lhs.args)) ||
      (all.has('z') && (all.has('x') || all.has('y')))
    if (!plottable) return null
  }
  const spec = parseGraph(text, defs)
  // Una riga sola: con i punti della nota che usa (i vertici) o, per un integrale, anche il campo.
  return spec.errors.length || !spec.items.length ? null : spec
}

/** Il blocco da mettere nella nota. */
export function graphBlockText(lines: readonly string[]): string {
  return '```grafico\n' + lines.join('\n') + '\n```'
}
