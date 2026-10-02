/**
 * Il disegno dei grafici 3D in SVG: superfici, curve, punti, vettori e assi, visti da una
 * direzione che si cambia trascinando il grafico. Niente WebGL: i pezzi si disegnano dal più
 * lontano al più vicino («l'algoritmo del pittore»), così lo stesso disegno va nell'anteprima, nel
 * pannello a destra e nelle immagini dei file .md. I piani dividono lo spazio: prima si disegna
 * quello che sta dalla parte lontana, poi il piano (velato, si vede attraverso), poi il resto.
 * La luce viene da sopra, a sinistra di chi guarda: le superfici si vedono in rilievo.
 */
import { withWorkLimit } from '../math/evaluate'
import { tickLabel, ticks } from './plot'
import {
  curveLines,
  FAST,
  FINE,
  implicitFaces,
  layeredFaces,
  polygonNormal,
  patchFaces,
  planeFace,
  regionFaces,
  solidFaces,
  planeSide,
  planeTolerance,
  splitFace,
  splitLine,
  surfaceFaces,
  surfacePlane,
  type Box,
  type Detail,
  type Face,
} from './space'
import { GRAPH_WORK, type GraphSpec, type Plane, type Vec3 } from './spec'
import { escapeXml, itemColors, pointName, type Palette } from './svg'

export interface Camera {
  /** Quanto si gira attorno all'asse z (in radianti). */
  az: number
  /** Quanto si guarda dall'alto (in radianti, tra −π/2 e π/2). */
  el: number
  zoom: number
}

/** Come nei libri: l'asse x verso chi guarda, la y a destra, la z in alto. */
export const DEFAULT_CAMERA: Camera = { az: 0.62, el: 0.4, zoom: 1 }

/** Quanto si può guardare dall'alto o dal basso: oltre, il grafico si capovolgerebbe. */
export const MAX_ELEVATION = Math.PI / 2 - 0.02

/** `fine` nell'anteprima, `fast` mentre si gira (meno quadretti), `file` per le immagini dei file .md (più leggere). */
export type Quality = 'fine' | 'fast' | 'file'

const DETAILS: Record<Quality, Detail> = { fine: FINE, fast: FAST, file: { surface: 30, patch: 28, implicit: 18 } }

/** Da che parte di ogni piano sta un pezzo: 1 sopra (a x + b y + c z > d), −1 sotto, 0 sul piano stesso. */
type Sides = number[]

interface SceneFace {
  face: Face
  item: number
  sides: Sides
  /** Il piano di cui è un pezzo (il suo indice in `planes`), o −1. */
  plane: number
  /** Una zona del piano xy: velata come i piani, si vede attraverso. */
  flat?: boolean
  /** Un pezzo di un solido (chiuso): girato dall'altra parte non si vede, e non si disegna. */
  solid?: boolean
  /**
   * Un pezzo di un solido che la scatola taglia (z \ge 0), in un grafico con altre cose: velato,
   * così non le copre. I suoi lati sulla scatola si disegnano per ultimi: tutto il resto è dietro.
   */
  open?: boolean
}

/** Quello da disegnare di un grafico 3D, nello spazio: si calcola una volta e si guarda da dove si vuole. */
export interface Scene {
  box: Box
  planes: Plane[]
  faces: SceneFace[]
  lines: { points: Vec3[]; item: number; sides: Sides }[]
  points: { p: Vec3; item: number; name: string | null; sides: Sides }[]
  /** Le frecce: `thin` quelle dei campi (tante e sottili), `headOnly` le punte che dicono il verso delle curve. */
  vectors: { from: Vec3; to: Vec3; item: number; name: string | null; thin?: boolean; headOnly?: boolean }[]
}

function inside(p: readonly number[], box: Box, slack = 1e-9): boolean {
  const r = [box.x, box.y, box.z]
  return p.every((v, k) => v >= r[k][0] - slack && v <= r[k][1] + slack)
}

/** Da che parte dei piani sta un punto. */
function sidesOf(p: readonly number[], planes: Plane[], box: Box): Sides {
  return planes.map((plane) => (planeSide(plane, p) >= -planeTolerance(plane, box) ? 1 : -1))
}

/** Superfici e curve del grafico come poligoni e linee nella scatola, divisi dai piani. */
export function buildScene(spec: GraphSpec, box: Box, quality: Quality = 'fine'): Scene {
  return withWorkLimit(GRAPH_WORK, () => {
    const detail = DETAILS[quality]
    const scene: Scene = { box, planes: [], faces: [], lines: [], points: [], vectors: [] }
    const add = (faces: Face[], item: number, plane = -1, flags: Pick<SceneFace, 'flat' | 'solid' | 'open'> = {}) => {
      for (const face of faces) scene.faces.push({ face, item, sides: [], plane, ...flags })
    }
    const addPlane = (plane: Plane, item: number) => {
      const face = planeFace(plane, box)
      if (!face) return
      scene.planes.push(plane)
      add([face], item, scene.planes.length - 1)
    }
    spec.items.forEach((item, i) => {
      // La stessa zona di un'altra riga: è già disegnata.
      if (item.same) return
      switch (item.kind) {
        case 'surface': {
          const plane = surfacePlane(item.f, box)
          if (plane) addPlane(plane, i)
          else add(surfaceFaces(item.f, box, detail.surface), i)
          break
        }
        case 'implicit3':
          if (item.plane) addPlane(item.plane, i)
          else add(implicitFaces(item.F, box, detail.implicit), i)
          break
        case 'patch':
          add(patchFaces(item.fx, item.fy, item.fz, item.u, item.v, detail.patch, detail.patch, box), i)
          break
        case 'solid': {
          const faces = item.layers ? layeredFaces(item.layers, box, detail.implicit) : solidFaces(item.M, item.parts, box, detail.implicit)
          const open = spec.items.length > 1 && faces.some((f) => f.boxSide)
          add(faces, i, -1, open ? { solid: true, open: true } : { solid: true })
          break
        }
        case 'region':
          add(regionFaces(item.M, box, detail.patch), i, -1, { flat: true })
          break
        case 'curve3':
          for (const points of curveLines(item.fx, item.fy, item.fz, item.t, box, item.straight)) scene.lines.push({ points, item: i, sides: [] })
          if (item.arrow) {
            // Il verso: una punta a metà dell'intervallo.
            const tm = (item.t[0] + item.t[1]) / 2
            const h = (item.t[1] - item.t[0]) * 2e-3 || 1e-3
            const at = (t: number): Vec3 => [item.fx(t), item.fy(t), item.fz(t)]
            const [from, to] = [at(tm - h), at(tm + h)]
            if (from.every(Number.isFinite) && to.every(Number.isFinite) && inside(to, box, 1e-6)) scene.vectors.push({ from, to, item: i, name: null, headOnly: true })
          }
          break
        case 'field3':
          scene.vectors.push(...fieldVectors(item.F, box, i))
          break
        case 'point3': {
          const p: Vec3 = [item.x, item.y, item.z]
          const size = Math.max(box.x[1] - box.x[0], box.y[1] - box.y[0], box.z[1] - box.z[0])
          if (inside(p, box, size * 0.02)) scene.points.push({ p, item: i, name: item.name, sides: [] })
          break
        }
        case 'vector':
          scene.vectors.push({ from: item.from, to: item.to, item: i, name: item.name })
          break
        case 'segment':
          scene.lines.push({ points: straight(item.a, item.b), item: i, sides: [] })
          break
        case 'polygon': {
          // La faccia, velata, e il bordo.
          add([{ polygons: [item.points], normal: polygonNormal(item.points), mesh: [] }], i, -1, { flat: true })
          item.points.forEach((p, k) => scene.lines.push({ points: straight(p, item.points[(k + 1) % item.points.length]), item: i, sides: [] }))
          break
        }
        case 'angle':
          scene.lines.push({ points: arcPoints(item.vertex, item.a, item.b), item: i, sides: [] })
          break
        case 'points':
          for (const p of item.points) scene.points.push({ p, item: i, name: null, sides: [] })
          break
      }
    })
    // Ogni pezzo diviso da ogni piano, così sta tutto da una parte.
    scene.planes.forEach((plane, k) => {
      const eps = planeTolerance(plane, box)
      scene.faces = scene.faces.flatMap((f) => {
        if (f.plane === k) return [{ ...f, sides: [...f.sides, 0] }]
        return splitFace(f.face, plane, eps).map(({ side, face }) => ({ ...f, face, sides: [...f.sides, side] }))
      })
      scene.lines = scene.lines.flatMap((l) => splitLine(l.points, plane, eps).map(({ side, points }) => ({ ...l, points, sides: [...l.sides, side] })))
    })
    for (const p of scene.points) p.sides = sidesOf(p.p, scene.planes, box)
    return scene
  })
}

/** Le frecce di un campo nello spazio: su una griglia nella scatola, lunghe secondo quanto vale il campo. */
function fieldVectors(F: (x: number, y: number, z: number) => Vec3, box: Box, item: number): Scene['vectors'] {
  const n = 4
  const r = [box.x, box.y, box.z]
  const sizes = r.map(([lo, hi]) => hi - lo)
  const samples: { p: Vec3; u: Vec3; m: number }[] = []
  let max = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        const p = [i, j, k].map((c, a) => r[a][0] + ((c + 0.5) / n) * sizes[a]) as Vec3
        const v = F(p[0], p[1], p[2])
        // Le componenti in proporzione alla scatola, che può avere gli assi lunghi diversi.
        const u = v.map((c, a) => c / sizes[a]) as Vec3
        const m = Math.hypot(...u)
        if (!Number.isFinite(m)) continue
        max = Math.max(max, m)
        samples.push({ p, u, m })
      }
    }
  }
  if (!(max > 0)) return []
  const out: Scene['vectors'] = []
  for (const { p, u, m } of samples) {
    if (m < max * 1e-9) continue
    const len = (0.8 / n) * Math.sqrt(m / max)
    const d = u.map((c, a) => ((c / m) * len * sizes[a]) / 2) as Vec3
    out.push({ from: p.map((c, a) => c - d[a]) as Vec3, to: p.map((c, a) => c + d[a]) as Vec3, item, name: null, thin: true })
  }
  return out
}

/** Un tratto dritto da a a b, in pezzi (ognuno con la sua profondità). */
function straight(a: Vec3, b: Vec3, pieces = 12): Vec3[] {
  return Array.from({ length: pieces + 1 }, (_, k) => a.map((c, i) => c + ((b[i] - c) * k) / pieces) as Vec3)
}

/** L'arco di un angolo nel vertice v, da verso a a verso b, nel piano dei due lati. */
function arcPoints(v: Vec3, a: Vec3, b: Vec3): Vec3[] {
  const ua = a.map((c, i) => c - v[i])
  const ub = b.map((c, i) => c - v[i])
  const la = Math.hypot(...ua)
  const lb = Math.hypot(...ub)
  if (!la || !lb) return []
  const u = ua.map((c) => c / la)
  const dotUB = (u[0] * ub[0] + u[1] * ub[1] + u[2] * ub[2]) / lb
  const angle = Math.acos(Math.max(-1, Math.min(1, dotUB)))
  const perp = ub.map((c, i) => c / lb - dotUB * u[i])
  const lp = Math.hypot(...perp)
  const e = lp ? perp.map((c) => c / lp) : [0, 0, 0]
  const r = 0.3 * Math.min(la, lb)
  return Array.from({ length: 17 }, (_, k) => {
    const t = (angle * k) / 16
    return v.map((c, i) => c + r * (Math.cos(t) * u[i] + Math.sin(t) * e[i])) as Vec3
  })
}

// ——— Dal punto nello spazio al punto sullo schermo ———

function dot(a: readonly number[], b: readonly number[]): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2])
  return len > 0 ? [v[0] / len, v[1] / len, v[2] / len] : [0, 0, 0]
}

interface Directions {
  right: Vec3
  up: Vec3
  /** Verso chi guarda. */
  toward: Vec3
}

function directions({ az, el }: Pick<Camera, 'az' | 'el'>): Directions {
  return {
    right: [-Math.sin(az), Math.cos(az), 0],
    up: [-Math.sin(el) * Math.cos(az), -Math.sin(el) * Math.sin(az), Math.cos(el)],
    toward: [Math.cos(el) * Math.cos(az), Math.cos(el) * Math.sin(az), Math.sin(el)],
  }
}

/** Le misure della scatola nel disegno: le vere (con le stesse unità) o fisse, più bassa che larga. */
function boxShape(box: Box): Vec3 {
  const half = [box.x, box.y, box.z].map(([lo, hi]) => (hi - lo) / 2)
  const big = Math.max(...half)
  return box.equal ? [half[0] / big, half[1] / big, half[2] / big] : [1, 1, 0.62]
}

/** I pixel per unità della scatola: entra tutta nel riquadro, vista da dove si guarda di solito. */
function fitScale(shape: Vec3, width: number, height: number): number {
  const { right, up } = directions(DEFAULT_CAMERA)
  let w = 0
  let h = 0
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const q = [sx * shape[0], sy * shape[1], sz * shape[2]]
        w = Math.max(w, Math.abs(dot(q, right)))
        h = Math.max(h, Math.abs(dot(q, up)))
      }
    }
  }
  return Math.min((width * 0.45) / w, (height * 0.42) / h)
}

export interface Projection extends Directions {
  /** Dove va un punto sullo schermo, e quanto è vicino a chi guarda (più grande: più vicino). */
  at(p: readonly number[]): Vec3
  /** Una normale nello spazio del disegno, di lunghezza 1. */
  normal(n: readonly number[]): Vec3
  /** Da dove viene la luce. */
  light: Vec3
}

export function projection(box: Box, camera: Camera, width: number, height: number): Projection {
  const r = [box.x, box.y, box.z]
  const center = r.map(([lo, hi]) => (lo + hi) / 2)
  const shape = boxShape(box)
  const k = r.map(([lo, hi], i) => (2 * shape[i]) / (hi - lo))
  const dirs = directions(camera)
  const { right, up, toward } = dirs
  const s = fitScale(shape, width, height) * camera.zoom
  const cx = width / 2
  const cy = height / 2
  const light = normalize([
    -0.35 * right[0] + 0.6 * up[0] + 0.72 * toward[0],
    -0.35 * right[1] + 0.6 * up[1] + 0.72 * toward[1],
    -0.35 * right[2] + 0.6 * up[2] + 0.72 * toward[2],
  ])
  return {
    ...dirs,
    light,
    at(p) {
      const q = [(p[0] - center[0]) * k[0], (p[1] - center[1]) * k[1], (p[2] - center[2]) * k[2]]
      return [cx + s * dot(q, right), cy - s * dot(q, up), dot(q, toward)]
    },
    normal: (n) => normalize([n[0] / k[0], n[1] / k[1], n[2] / k[2]]),
  }
}

// ——— I colori ———

function rgb(hex: string): Vec3 {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Vec3
}

function hex([r, g, b]: Vec3): string {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')
  return `#${c(r)}${c(g)}${c(b)}`
}

/** Le sfumature della luce: non troppe, così i pezzi vicini dello stesso colore si disegnano insieme. */
const LEVELS = 40
const shades = new Map<string, string>()

/** Il colore di un pezzo di superficie con quanta luce prende (0–1): il davanti più vivo, il retro più spento. */
function shade(color: string, light: number, front: boolean): string {
  const level = Math.round(Math.max(0, Math.min(1, light)) * LEVELS)
  const key = `${color}${level}${front ? 'f' : 'b'}`
  let out = shades.get(key)
  if (!out) {
    const t = level / LEVELS
    const base = rgb(color)
    let c: Vec3
    if (front) {
      const k = 0.5 + 0.55 * t
      // Dove la luce batte di più, un po' di bianco.
      const shine = 0.18 * t ** 3
      c = base.map((v) => v * k + (255 - v * k) * shine) as Vec3
    } else {
      const gray = (base[0] + base[1] + base[2]) / 3
      const k = 0.55 + 0.45 * t
      c = base.map((v) => (v * 0.5 + gray * 0.5) * k) as Vec3
    }
    out = hex(c)
    if (shades.size > 4000) shades.clear()
    shades.set(key, out)
  }
  return out
}

// ——— Il disegno ———

/**
 * Dove le superfici coprono il disegno: i numeri degli assi lì non si scrivono (sopra una superficie
 * si confonderebbero, e dietro non si vedono). I poligoni si cercano per quadretti dello schermo.
 */
class Coverage {
  private readonly cells = new Map<number, number[][]>()
  private static readonly SIZE = 24

  add(poly: number[]): void {
    let x0 = Infinity
    let y0 = Infinity
    let x1 = -Infinity
    let y1 = -Infinity
    for (let i = 0; i < poly.length; i += 2) {
      x0 = Math.min(x0, poly[i])
      x1 = Math.max(x1, poly[i])
      y0 = Math.min(y0, poly[i + 1])
      y1 = Math.max(y1, poly[i + 1])
    }
    const S = Coverage.SIZE
    for (let cy = Math.floor(y0 / S); cy <= Math.floor(y1 / S); cy++) {
      for (let cx = Math.floor(x0 / S); cx <= Math.floor(x1 / S); cx++) {
        const key = cy * 4096 + cx
        let list = this.cells.get(key)
        if (!list) this.cells.set(key, (list = []))
        list.push(poly)
      }
    }
  }

  covers(x: number, y: number): boolean {
    const S = Coverage.SIZE
    for (const poly of this.cells.get(Math.floor(y / S) * 4096 + Math.floor(x / S)) ?? []) {
      let inside = false
      for (let i = 0, j = poly.length - 2; i < poly.length; j = i, i += 2) {
        const [xi, yi, xj, yj] = [poly[i], poly[i + 1], poly[j], poly[j + 1]]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
      }
      if (inside) return true
    }
    return false
  }

  /** Il riquadro di un testo (da x0, y0 a x1, y1) tocca una superficie? */
  coversBox(x0: number, y0: number, x1: number, y1: number): boolean {
    const xm = (x0 + x1) / 2
    const ym = (y0 + y1) / 2
    const probes = [[x0, y0], [x1, y0], [x0, y1], [x1, y1], [xm, ym], [xm, y0], [xm, y1]]
    return probes.some(([x, y]) => this.covers(x, y))
  }
}

const f1 = (v: number) => (Math.round(v * 10) / 10).toString()

type Prim = { depth: number; sides: Sides } & (
  /** `veil`: quanto si vede il pezzo (1 pieno; meno per i piani e le zone, che lasciano vedere dietro). */
  | { k: 'face'; fill: string; d: string; mesh: [Vec3, Vec3][]; veil: number }
  | { k: 'line'; stroke: string; width: number; d: string; item?: number }
  | { k: 'fill'; fill: string; d: string }
  | { k: 'dot'; x: number; y: number; fill: string }
  | { k: 'text'; svg: string }
)

export interface SpaceDrawOptions {
  width: number
  height: number
  /** Il nome da leggere per chi non vede il disegno. */
  title?: string
}

/** Un tratto di linea sullo schermo, spezzato in pezzi corti (ognuno con la sua profondità). */
function linePrims(points: Vec3[], sides: Sides, proj: Projection, stroke: string, width: number, out: Prim[], piece = 6, item?: number): void {
  const screen = points.map((p) => proj.at(p))
  for (let i = 0; i + 1 < screen.length; i += piece) {
    const part = screen.slice(i, i + piece + 1)
    let d = `M${f1(part[0][0])} ${f1(part[0][1])}`
    let depth = part[0][2]
    for (let j = 1; j < part.length; j++) {
      d += `L${f1(part[j][0])} ${f1(part[j][1])}`
      depth += part[j][2]
    }
    out.push({ depth: depth / part.length, sides, k: 'line', stroke, width, d, item })
  }
}

/** La punta di una freccia sullo schermo, da `a` verso `b` (in pixel). */
function arrowHead(a: Vec3, b: Vec3, length: number, half: number): string | null {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const len = Math.hypot(dx, dy)
  if (len < 1e-6) return null
  const ux = dx / len
  const uy = dy / len
  const size = Math.min(length, len)
  const bx = b[0] - ux * size
  const by = b[1] - uy * size
  return `M${f1(b[0])} ${f1(b[1])}L${f1(bx - uy * half)} ${f1(by + ux * half)}L${f1(bx + uy * half)} ${f1(by - ux * half)}Z`
}

/** Il grafico 3D visto da `camera`, come testo SVG. */
export function sceneSvg(scene: Scene, spec: GraphSpec, camera: Camera, palette: Palette, options: SpaceDrawOptions): string {
  return withWorkLimit(GRAPH_WORK, () => drawScene(scene, spec, camera, palette, options))
}

function drawScene(scene: Scene, spec: GraphSpec, camera: Camera, palette: Palette, options: SpaceDrawOptions): string {
  const { width: W, height: H } = options
  const { box, planes } = scene
  const proj = projection(box, camera, W, H)
  const colors = itemColors(spec.items, palette)
  const prims: Prim[] = []
  const halo = `stroke="${palette.halo}" stroke-width="3" stroke-linejoin="round" paint-order="stroke"`
  const math = `font-style="italic" font-family="'KaTeX_Math', 'Times New Roman', serif" font-size="16"`
  /** Le linee calcolate qui (assi, vettori) divise dai piani come quelle della scena. */
  const split = (points: Vec3[]): { points: Vec3[]; sides: Sides }[] => {
    let pieces = [{ points, sides: [] as Sides }]
    planes.forEach((plane) => {
      const eps = planeTolerance(plane, box)
      pieces = pieces.flatMap((p) => splitLine(p.points, plane, eps).map((s) => ({ points: s.points, sides: [...p.sides, s.side] })))
    })
    return pieces
  }
  const sidesAt = (p: readonly number[]) => sidesOf(p, planes, box)

  const coverage = new Coverage()
  /** I lati sulla scatola dei solidi tagliati (vedi SceneFace.open): sopra a tutto. */
  const late: Prim[] = []
  // Le superfici: ogni pezzo con la luce che prende, il retro più spento.
  for (const { face, item, sides, plane, flat, solid, open } of scene.faces) {
    let n = proj.normal(face.normal)
    const front = dot(n, proj.toward) >= 0
    // Di un solido si vede solo il davanti: i pezzi dietro, vicino agli spigoli, finirebbero sopra.
    if (solid && !front) continue
    if (!front) n = [-n[0], -n[1], -n[2]]
    const fill = shade(colors[item], Math.max(0, dot(n, proj.light)), front)
    let d = ''
    let depth = 0
    let count = 0
    const isFlat = !!flat
    for (const poly of face.polygons) {
      const points: number[] = []
      poly.forEach((p, i) => {
        const [x, y, z] = proj.at(p)
        d += `${i ? 'L' : 'M'}${f1(x)} ${f1(y)}`
        points.push(x, y)
        depth += z
        count++
      })
      d += 'Z'
      // I piani, le zone del piano e i solidi tagliati sono velati: sopra di loro i numeri si leggono.
      if (plane < 0 && !isFlat && !open) coverage.add(points)
    }
    const prim: Prim = { depth: depth / count, sides, k: 'face', fill, d, mesh: face.mesh, veil: plane >= 0 || isFlat ? 0.72 : open ? 0.42 : 1 }
    if (open && face.boxSide) late.push(prim)
    else prims.push(prim)
  }

  // Gli assi, dove c'è lo zero (se no sul bordo della scatola), con le frecce e le tacche.
  const r = [box.x, box.y, box.z]
  const names = ['x', 'y', 'z']
  const clamp = (v: number, [lo, hi]: [number, number]) => Math.min(hi, Math.max(lo, v))
  for (let a = 0; a < 3; a++) {
    const base: Vec3 = [clamp(0, r[0]), clamp(0, r[1]), clamp(0, r[2])]
    const from: Vec3 = [...base]
    const to: Vec3 = [...base]
    from[a] = r[a][0]
    to[a] = r[a][1]
    const pieces: Vec3[] = []
    for (let i = 0; i <= 16; i++) pieces.push(from.map((v, k) => v + ((to[k] - v) * i) / 16) as Vec3)
    for (const part of split(pieces)) linePrims(part.points, part.sides, proj, palette.axis, 1.25, prims, 1)
    const s0 = proj.at(from)
    const s1 = proj.at(to)
    const length = Math.hypot(s1[0] - s0[0], s1[1] - s0[1])
    const head = arrowHead(s0, s1, 9, 4)
    if (head) prims.push({ depth: s1[2], sides: sidesAt(to), k: 'fill', fill: palette.axis, d: head })
    if (length < 24) continue
    const ux = (s1[0] - s0[0]) / length
    const uy = (s1[1] - s0[1]) / length
    // Il nome dell'asse oltre la punta: un po' più vicino, così non lo copre la superficie che arriva lì.
    prims.push({ depth: s1[2] + 0.05, sides: sidesAt(to), k: 'text', svg: `<text x="${f1(s1[0] + ux * 13)}" y="${f1(s1[1] + uy * 13 + 5)}" text-anchor="middle" ${math} fill="${palette.axis}" ${halo}>${names[a]}</text>` })
    // Le tacche da una parte dell'asse: sotto per x e y, a sinistra per z.
    let px = -uy
    let py = ux
    if (a < 2 ? py < 0 : px > 0) {
      px = -px
      py = -py
    }
    const t = ticks(r[a][0], r[a][1], length * 0.75)
    const step = Math.abs((t.major[1]?.value ?? 1) - (t.major[0]?.value ?? 0)) || 1
    for (const tick of t.major) {
      if (Math.abs(tick.value) < 1e-12) continue
      const p: Vec3 = [...base]
      p[a] = tick.value
      const sp = proj.at(p)
      // Non sotto la freccia.
      if (Math.hypot(sp[0] - s1[0], sp[1] - s1[1]) < 16) continue
      const sides = sidesAt(p)
      prims.push({ depth: sp[2], sides, k: 'line', stroke: palette.axis, width: 1, d: `M${f1(sp[0] - px * 3)} ${f1(sp[1] - py * 3)}L${f1(sp[0] + px * 3)} ${f1(sp[1] + py * 3)}` })
      const lx = sp[0] + px * 13
      const ly = sp[1] + py * 13 + 4
      const anchor = Math.abs(px) < 0.35 ? 'middle' : px > 0 ? 'start' : 'end'
      const text = tickLabel(tick.value, step)
      const w = text.length * 6.6 + 4
      const left = anchor === 'middle' ? lx - w / 2 : anchor === 'start' ? lx - 2 : lx - w + 2
      if (coverage.coversBox(left, ly - 11, left + w, ly + 3)) continue
      prims.push({ depth: sp[2], sides, k: 'text', svg: `<text x="${f1(lx)}" y="${f1(ly)}" text-anchor="${anchor}" font-size="11.5" fill="${palette.text}" ${halo}>${escapeXml(text)}</text>` })
    }
  }

  // Le curve
  for (const { points, item, sides } of scene.lines) linePrims(points, sides, proj, colors[item], 2.5, prims, 6, item)

  // I vettori: una freccia dall'inizio alla fine, con il nome vicino alla punta.
  for (const v of scene.vectors) {
    const sa = proj.at(v.from)
    const sb = proj.at(v.to)
    const len = Math.hypot(sb[0] - sa[0], sb[1] - sa[1])
    if (len < 0.5 && !v.headOnly) continue
    const sides = sidesAt(v.to)
    if (v.headOnly) {
      // Il verso di una curva: solo la punta, lungo la curva.
      const ux = (sb[0] - sa[0]) / (len || 1)
      const uy = (sb[1] - sa[1]) / (len || 1)
      const tip: Vec3 = [sb[0] + ux * 6, sb[1] + uy * 6, sb[2]]
      const head = arrowHead([tip[0] - ux * 14, tip[1] - uy * 14, tip[2]], tip, 12, 5.5)
      if (head) prims.push({ depth: sb[2] + 0.01, sides, k: 'fill', fill: colors[v.item], d: head })
      continue
    }
    const [width, headLength, half] = v.thin ? [1.4, 7, 3] : [2.5, 12, 5.5]
    // La linea si ferma alla base della punta, se no spunterebbe oltre.
    const k = len > headLength + 2 ? 1 - (headLength - 2) / len : 1
    const end = v.from.map((c, i) => c + (v.to[i] - c) * k) as Vec3
    const shaft: Vec3[] = []
    for (let i = 0; i <= 8; i++) shaft.push(v.from.map((c, j) => c + ((end[j] - c) * i) / 8) as Vec3)
    for (const part of split(shaft)) linePrims(part.points, part.sides, proj, colors[v.item], width, prims, 8, v.item)
    const head = arrowHead(sa, sb, headLength, half)
    if (head) prims.push({ depth: sb[2], sides, k: 'fill', fill: colors[v.item], d: head })
    if (v.name) prims.push({ depth: sb[2] + 0.02, sides, k: 'text', svg: nameLabel(v.name, sb[0], sb[1], W, palette, halo) })
  }

  // I punti
  for (const pt of scene.points) {
    const [x, y, depth] = proj.at(pt.p)
    prims.push({ depth, sides: pt.sides, k: 'dot', x, y, fill: colors[pt.item] })
    if (pt.name) prims.push({ depth: depth + 0.02, sides: pt.sides, k: 'text', svg: nameLabel(pt.name, x, y, W, palette, halo) })
  }

  // Dalla parte lontana di ogni piano a quella vicina; dentro ogni parte dal più lontano al più vicino.
  const near = planes.map((plane) => (dot(proj.normal(plane), proj.toward) >= 0 ? 1 : -1))
  const order = (list: Prim[], level: number): Prim[] => {
    if (level === planes.length || !list.length) return list.sort((p, q) => p.depth - q.depth)
    const far: Prim[] = []
    const on: Prim[] = []
    const close: Prim[] = []
    for (const p of list) (p.sides[level] === 0 ? on : p.sides[level] === near[level] ? close : far).push(p)
    return [...order(far, level + 1), ...on.sort((p, q) => p.depth - q.depth), ...order(close, level + 1)]
  }
  const sorted = [...order(prims, 0), ...late.sort((p, q) => p.depth - q.depth)]

  // Una linea della griglia tra due pezzi si ripassa con quello disegnato dopo: se no il bordo di
  // quello la coprirebbe a metà.
  const owner = new Map<string, number>()
  const edgeKey = ([a, b]: [Vec3, Vec3]) => {
    const ka = a.join(',')
    const kb = b.join(',')
    return ka < kb ? `${ka};${kb}` : `${kb};${ka}`
  }
  sorted.forEach((p, i) => {
    if (p.k === 'face') for (const e of p.mesh) owner.set(edgeKey(e), i)
  })
  const meshPath = (p: Extract<Prim, { k: 'face' }>, i: number) => {
    let d = ''
    for (const e of p.mesh) {
      if (owner.get(edgeKey(e)) !== i) continue
      const pa = proj.at(e[0])
      const pb = proj.at(e[1])
      d += `M${f1(pa[0])} ${f1(pa[1])}L${f1(pb[0])} ${f1(pb[1])}`
    }
    return d
  }

  const out: string[] = []
  out.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" class="graph-svg graph-3d" role="img"${options.title ? ` aria-label="${escapeXml(options.title)}"` : ''} font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">`,
  )
  if (palette.surface) out.push(`<rect width="${W}" height="${H}" fill="${palette.surface}"/>`)
  // Il bordo dei pezzi del loro stesso colore copre le fessure tra un pezzo e l'altro.
  out.push('<g stroke-width="0.7" stroke-linejoin="round">')
  for (let i = 0; i < sorted.length; ) {
    const p = sorted[i]
    if (p.k === 'face') {
      let d = p.d
      let mesh = meshPath(p, i)
      let j = i + 1
      while (j < sorted.length) {
        const q = sorted[j]
        if (q.k !== 'face' || q.fill !== p.fill || q.veil !== p.veil) break
        d += q.d
        mesh += meshPath(q, j)
        j++
      }
      // I piani velati: si vede quello che hanno dietro.
      out.push(p.veil < 1 ? `<path d="${d}" fill="${p.fill}" fill-opacity="${p.veil}" stroke="none"/>` : `<path d="${d}" fill="${p.fill}" stroke="${p.fill}"/>`)
      if (mesh) out.push(`<path d="${mesh}" fill="none" stroke="${palette.mesh}" stroke-width="0.8"/>`)
      i = j
      continue
    }
    if (p.k === 'line') {
      let d = p.d
      let j = i + 1
      while (j < sorted.length) {
        const q = sorted[j]
        if (q.k !== 'line' || q.stroke !== p.stroke || q.width !== p.width || q.item !== p.item) break
        d += q.d
        j++
      }
      out.push(`<path d="${d}" fill="none" stroke="${p.stroke}" stroke-width="${p.width}" stroke-linecap="round"${p.item === undefined ? '' : ` data-item="${p.item}"`}/>`)
      i = j
      continue
    }
    if (p.k === 'fill') out.push(`<path d="${p.d}" fill="${p.fill}" stroke="none"/>`)
    else if (p.k === 'text') out.push(p.svg)
    else out.push(`<circle cx="${f1(p.x)}" cy="${f1(p.y)}" r="4.5" fill="${p.fill}" stroke="${palette.halo}" stroke-width="2" paint-order="stroke"/>`)
    i++
  }
  out.push('</g></svg>')
  return out.join('')
}

/** Il nome di un punto o di un vettore, accanto (a destra, se c'è posto). */
function nameLabel(name: string, x: number, y: number, W: number, palette: Palette, halo: string): string {
  const right = x < W - 40
  const text = pointName(name.replace(/⃗$/, ''))
  return `<text x="${f1(right ? x + 8 : x - 8)}" y="${f1(y < 22 ? y + 18 : y - 8)}" text-anchor="${right ? 'start' : 'end'}" font-style="italic" font-family="'KaTeX_Math', 'Times New Roman', serif" font-size="16" fill="${palette.text}" ${halo}>${escapeXml(text)}</text>`
}
