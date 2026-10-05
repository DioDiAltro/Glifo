import { getStroke, type StrokeOptions } from 'perfect-freehand'
import type { HighlightColor, InkColor, Stroke } from './strokes'

/**
 * Come si disegnano i tratti della lavagna: il contorno lo calcola perfect-freehand (lo spessore
 * cambia con la pressione della penna, o con la velocità per il dito e il mouse) e i colori
 * dipendono dal tema, chiaro o scuro.
 */

export type BoardTheme = 'light' | 'dark'

export interface BoardPalette {
  /** Lo sfondo della lavagna. */
  paper: string
  /** I quadretti, appena visibili. */
  grid: string
  ink: Record<InkColor, string>
  /** Gli evidenziatori, disegnati trasparenti (`highlightAlpha`) sotto la scrittura. */
  highlight: Record<HighlightColor, string>
  highlightAlpha: number
}

/**
 * Lo sfondo è quello del testo (--pane-editor); nel tema scuro la lavagna è scura e si scrive in
 * chiaro, come col gesso. Ogni colore si legge sullo sfondo (contrasto almeno 4,5, vedi i test). Gli
 * evidenziatori si vedono sulla carta e la scrittura sopra si legge (vedi i test).
 */
export const BOARD_PALETTES: Record<BoardTheme, BoardPalette> = {
  light: {
    paper: '#ffffff',
    grid: '#e9ecf3',
    ink: { ink: '#1c2030', blue: '#2453d4', red: '#cf2337', green: '#15803d' },
    highlight: { yellow: '#fcc419', green: '#51cf66', pink: '#f06595', blue: '#4dabf7' },
    highlightAlpha: 0.45,
  },
  dark: {
    paper: '#181b24',
    grid: '#232836',
    ink: { ink: '#e8eaf1', blue: '#86aaff', red: '#ff8a8f', green: '#5fd38c' },
    highlight: { yellow: '#ffe066', green: '#63e6be', pink: '#faa2c1', blue: '#a5d8ff' },
    highlightAlpha: 0.3,
  },
}

/** Il nome del colore, per i pulsanti: il primo è nero nel tema chiaro e bianco in quello scuro. */
export function inkName(color: InkColor, theme: BoardTheme): string {
  if (color === 'ink') return theme === 'dark' ? 'Bianco' : 'Nero'
  return { blue: 'Blu', red: 'Rosso', green: 'Verde' }[color]
}

/** Il nome del colore di un evidenziatore. */
export function highlightName(color: HighlightColor): string {
  return { yellow: 'Giallo', green: 'Verde', pink: 'Rosa', blue: 'Azzurro' }[color]
}

/** Lo spessore di partenza della penna, in unità della lavagna. */
export const PEN_SIZE = 3.2

/**
 * Le tre misure di ogni strumento: lo spessore di penna ed evidenziatore in unità della lavagna, il
 * raggio della gomma in pixel dello schermo (la gomma «dove passa» si allarga anche con la velocità).
 */
export const TOOL_SIZES = {
  pen: [2, PEN_SIZE, 5.5],
  highlight: [10, 18, 28],
  eraser: [6, 11, 20],
} as const
export type SizeChoice = 0 | 1 | 2

export function strokeOptions(s: Pick<Stroke, 'size' | 'pen' | 'highlight'>, last: boolean): StrokeOptions {
  // L'evidenziatore è spesso uguale dall'inizio alla fine, e più morbido.
  if (s.highlight) return { size: s.size, thinning: 0, smoothing: 0.6, streamline: 0.45, simulatePressure: false, start: { cap: true }, end: { cap: true }, last }
  return {
    size: s.size,
    // Con la penna la pressione conta un po' di più; col dito e col mouse la si simula.
    thinning: s.pen ? 0.55 : 0.45,
    smoothing: 0.5,
    // Poco: la linea resta attaccata alla punta mentre si scrive.
    streamline: 0.3,
    simulatePressure: !s.pen,
    start: { cap: true },
    end: { cap: true },
    last,
  }
}

/** Il contorno del tratto (un poligono), come coppie [x, y]. `last`: il tratto è finito. */
export function strokeOutline(s: Pick<Stroke, 'points' | 'size' | 'pen' | 'highlight'>, last = true): number[][] {
  const input: number[][] = []
  for (let i = 0; i + 2 < s.points.length; i += 3) input.push([s.points[i], s.points[i + 1], s.points[i + 2]])
  return input.length ? getStroke(input, strokeOptions(s, last)) : []
}

const mid = (a: number, b: number) => (a + b) / 2

/**
 * Il contorno come percorso SVG, con curve che passano per i punti di mezzo (come nel README di
 * perfect-freehand): lo usa Path2D per il canvas.
 */
export function outlineSvg(outline: number[][]): string {
  const n = outline.length
  if (n < 4) return ''
  const f = (v: number) => v.toFixed(2)
  const [a, b, c] = outline
  let d = `M${f(a[0])},${f(a[1])} Q${f(b[0])},${f(b[1])} ${f(mid(b[0], c[0]))},${f(mid(b[1], c[1]))} T`
  for (let i = 2; i < n - 1; i++) d += `${f(mid(outline[i][0], outline[i + 1][0]))},${f(mid(outline[i][1], outline[i + 1][1]))} `
  return `${d}Z`
}
