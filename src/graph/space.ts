/**
 * I conti dei grafici 3D: superfici e curve diventano poligoni e linee nello spazio, dentro la
 * scatola che il grafico mostra (`Box`), e la scatola si sceglie da sola se il blocco non dice da
 * dove a dove (x \in [a, b], z \in [c, d]). Il disegno lo fa view3d.ts.
 */
import { withWorkLimit } from '../math/evaluate'
import { GRAPH_WORK, type GraphSpec, type Plane, type Range, type Vec3 } from './spec'

const finite = Number.isFinite

export interface Box {
  x: Range
  y: Range
  z: Range
  /** Le stesse unità sui tre assi (le sfere restano rotonde); se no la scatola ha proporzioni fisse. */
  equal: boolean
}

/** Un pezzo di superficie: uno o più poligoni (i triangoli di un cubetto) dello stesso colore. */
export interface Face {
  polygons: Vec3[][]
  /** Da che parte guarda il «davanti» (non di lunghezza 1): sopra per z = f(x, y), fuori per una sfera. */
  normal: Vec3
  /** I tratti della griglia sulla superficie che stanno su questo pezzo, da ripassare sopra. */
  mesh: [Vec3, Vec3][]
}

type Axis = 0 | 1 | 2

function ranges(box: Box): [Range, Range, Range] {
  return [box.x, box.y, box.z]
}

function lerp(a: Vec3, b: Vec3, t: number): Vec3 {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

/** Taglia un poligono lungo un piano x = value (o y, o z): resta la parte dal lato `side` (1: sopra, −1: sotto). */
function clipSide(poly: Vec3[], axis: Axis, value: number, side: 1 | -1): Vec3[] {
  const out: Vec3[] = []
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]
    const b = poly[(i + 1) % poly.length]
    const da = side * (a[axis] - value)
    const db = side * (b[axis] - value)
    if (da >= 0) out.push(a)
    if (da >= 0 !== db >= 0) out.push(lerp(a, b, da / (da - db)))
  }
  return out
}

/** La parte di un poligono dentro la scatola (lungo gli assi `axes`). */
export function clipPolygon(poly: Vec3[], box: Box, axes: readonly Axis[] = [0, 1, 2]): Vec3[] {
  const r = ranges(box)
  let out = poly
  for (const axis of axes) {
    out = clipSide(out, axis, r[axis][0], 1)
    if (out.length < 3) return []
    out = clipSide(out, axis, r[axis][1], -1)
    if (out.length < 3) return []
  }
  return out
}

/** La parte di un segmento dentro la scatola, o null. */
export function clipSegment(a: Vec3, b: Vec3, box: Box): [Vec3, Vec3] | null {
  let t0 = 0
  let t1 = 1
  const r = ranges(box)
  for (let k = 0; k < 3; k++) {
    const d = b[k] - a[k]
    for (const [bound, side] of [[r[k][0], 1], [r[k][1], -1]] as const) {
      const start = side * (a[k] - bound)
      const step = side * d
      if (step === 0) {
        if (start < 0) return null
        continue
      }
      const t = -start / step
      if (step > 0) t0 = Math.max(t0, t)
      else t1 = Math.min(t1, t)
      if (t0 > t1) return null
    }
  }
  // Gli estremi dentro la scatola restano gli stessi punti (curveLines li riconosce così).
  return [t0 === 0 ? a : lerp(a, b, t0), t1 === 1 ? b : lerp(a, b, t1)]
}

/** La normale di un poligono (metodo di Newell): verso chi lo vede girare in senso antiorario. */
export function polygonNormal(poly: Vec3[]): Vec3 {
  let nx = 0
  let ny = 0
  let nz = 0
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]
    const b = poly[(i + 1) % poly.length]
    nx += (a[1] - b[1]) * (a[2] + b[2])
    ny += (a[2] - b[2]) * (a[0] + b[0])
    nz += (a[0] - b[0]) * (a[1] + b[1])
  }
  return [nx, ny, nz]
}

/** Quante linee della griglia su una superficie con `n` quadretti per lato: una ogni tanto, come nei libri. */
function meshEvery(n: number): number {
  return Math.max(1, Math.round(n / 10))
}

function addMesh(mesh: [Vec3, Vec3][], a: Vec3, b: Vec3, box: Box): void {
  if (!a.every(finite) || !b.every(finite)) return
  const s = clipSegment(a, b, box)
  if (s) mesh.push(s)
}

/**
 * La superficie z = f(x, y) sopra la scatola, a quadretti (n per lato). Dove f non c'è (fuori dal
 * dominio, come √(1 − x² − y²)) i quadretti si tagliano sul bordo; dove salta (un asintoto) no.
 */
export function surfaceFaces(f: (x: number, y: number) => number, box: Box, n: number): Face[] {
  const [x0, x1] = box.x
  const [y0, y1] = box.y
  const dx = (x1 - x0) / n
  const dy = (y1 - y0) / n
  const N = n + 1
  const zs = new Float64Array(N * N)
  for (let j = 0; j <= n; j++) for (let i = 0; i <= n; i++) zs[j * N + i] = f(x0 + i * dx, y0 + j * dy)
  const jump = 2 * (box.z[1] - box.z[0])
  const every = meshEvery(n)
  const at = (i: number, j: number): Vec3 => [x0 + i * dx, y0 + j * dy, zs[j * N + i]]
  const faces: Face[] = []
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const corners = [at(i, j), at(i + 1, j), at(i + 1, j + 1), at(i, j + 1)]
      const values = corners.map((p) => p[2]).filter(finite)
      if (!values.length || Math.max(...values) - Math.min(...values) > jump) continue
      const poly = values.length === 4 ? corners : domainCut(corners, f)
      const clipped = poly.length >= 3 ? clipPolygon(poly, box, [2]) : []
      if (clipped.length < 3) continue
      const mesh: [Vec3, Vec3][] = []
      if (i % every === 0) addMesh(mesh, corners[3], corners[0], box)
      if ((i + 1) % every === 0 || i + 1 === n) addMesh(mesh, corners[1], corners[2], box)
      if (j % every === 0) addMesh(mesh, corners[0], corners[1], box)
      if ((j + 1) % every === 0 || j + 1 === n) addMesh(mesh, corners[2], corners[3], box)
      faces.push({ polygons: [clipped], normal: polygonNormal(clipped), mesh })
    }
  }
  return faces
}

/** Un quadretto con dei vertici fuori dal dominio: il pezzo dentro, con il bordo cercato dimezzando i lati. */
function domainCut(corners: Vec3[], f: (x: number, y: number) => number): Vec3[] {
  const out: Vec3[] = []
  for (let k = 0; k < corners.length; k++) {
    const a = corners[k]
    const b = corners[(k + 1) % corners.length]
    const inA = finite(a[2])
    if (inA) out.push(a)
    if (inA === finite(b[2])) continue
    let good = inA ? a : b
    let bad = inA ? b : a
    let found = false
    for (let it = 0; it < 28; it++) {
      const x = (good[0] + bad[0]) / 2
      const y = (good[1] + bad[1]) / 2
      const z = f(x, y)
      if (finite(z)) {
        good = [x, y, z]
        found = true
      } else bad = [x, y, z]
    }
    if (found) out.push(good)
  }
  return out
}

/** Una superficie con due parametri, a quadretti (nu × nv), tagliata sulla scatola. */
export function patchFaces(
  fx: (u: number, v: number) => number,
  fy: (u: number, v: number) => number,
  fz: (u: number, v: number) => number,
  u: Range,
  v: Range,
  nu: number,
  nv: number,
  box: Box,
): Face[] {
  const points: Vec3[] = []
  for (let j = 0; j <= nv; j++) {
    const b = v[0] + ((v[1] - v[0]) * j) / nv
    for (let i = 0; i <= nu; i++) {
      const a = u[0] + ((u[1] - u[0]) * i) / nu
      points.push([fx(a, b), fy(a, b), fz(a, b)])
    }
  }
  const r = ranges(box)
  const far = Math.hypot(...r.map(([lo, hi]) => hi - lo)) / 2
  const everyU = meshEvery(nu)
  const everyV = meshEvery(nv)
  const at = (i: number, j: number) => points[j * (nu + 1) + i]
  const faces: Face[] = []
  for (let j = 0; j < nv; j++) {
    for (let i = 0; i < nu; i++) {
      const corners = [at(i, j), at(i + 1, j), at(i + 1, j + 1), at(i, j + 1)]
      if (!corners.every((p) => p.every(finite))) continue
      // Un salto tra un vertice e l'altro: lì la superficie non è continua.
      if (corners.some((p, k) => Math.hypot(...p.map((c, m) => c - corners[(k + 1) % 4][m])) > far)) continue
      const clipped = clipPolygon(corners, box)
      if (clipped.length < 3) continue
      const mesh: [Vec3, Vec3][] = []
      if (i % everyU === 0) addMesh(mesh, corners[3], corners[0], box)
      if ((i + 1) % everyU === 0 || i + 1 === nu) addMesh(mesh, corners[1], corners[2], box)
      if (j % everyV === 0) addMesh(mesh, corners[0], corners[1], box)
      if ((j + 1) % everyV === 0 || j + 1 === nv) addMesh(mesh, corners[2], corners[3], box)
      faces.push({ polygons: [clipped], normal: polygonNormal(corners), mesh })
    }
  }
  return outward(faces)
}

/**
 * Le normali verso fuori: per una superficie chiusa (una sfera, un toro) il davanti è l'esterno,
 * qualunque sia il verso dei parametri; per una aperta (un cono) il lato lontano dal suo centro.
 */
function outward(faces: Face[]): Face[] {
  if (!faces.length) return faces
  const centers = faces.map((f) => centroid(f.polygons))
  const middle = centroid([centers])
  let sum = 0
  faces.forEach((f, i) => {
    const n = f.normal
    const len = Math.hypot(...n)
    if (len > 0) sum += (n[0] * (centers[i][0] - middle[0]) + n[1] * (centers[i][1] - middle[1]) + n[2] * (centers[i][2] - middle[2])) / len
  })
  if (sum < 0) for (const f of faces) f.normal = [-f.normal[0], -f.normal[1], -f.normal[2]]
  return faces
}

/**
 * Il pezzo di un piano dentro la scatola, come un poligono solo, con le linee di una griglia sopra
 * (una ogni ottavo della scatola, lungo i due assi su cui il piano è più disteso).
 */
export function planeFace([a, b, c, d]: Plane, box: Box): Face | null {
  const coef = [a, b, c]
  const abs = coef.map(Math.abs)
  const k: Axis = abs[0] >= abs[1] && abs[0] >= abs[2] ? 0 : abs[1] >= abs[2] ? 1 : 2
  const [p, q] = ([0, 1, 2] as Axis[]).filter((i) => i !== k)
  const r = ranges(box)
  const point = (s: number, t: number): Vec3 => {
    const out: Vec3 = [0, 0, 0]
    out[p] = s
    out[q] = t
    out[k] = (d - coef[p] * s - coef[q] * t) / coef[k]
    return out
  }
  const [s0, s1] = r[p]
  const [t0, t1] = r[q]
  const polygon = clipPolygon([point(s0, t0), point(s1, t0), point(s1, t1), point(s0, t1)], box, [k])
  if (polygon.length < 3) return null
  const mesh: [Vec3, Vec3][] = []
  for (let i = 1; i < 8; i++) {
    addMesh(mesh, point(s0 + ((s1 - s0) * i) / 8, t0), point(s0 + ((s1 - s0) * i) / 8, t1), box)
    addMesh(mesh, point(s0, t0 + ((t1 - t0) * i) / 8), point(s1, t0 + ((t1 - t0) * i) / 8), box)
  }
  return { polygons: [polygon], normal: [a, b, c], mesh }
}

/** Se z = f(x, y) è un piano (z = 3, z = x + y + 1): come a x + b y + c z = d. */
export function surfacePlane(f: (x: number, y: number) => number, box: Box): Plane | null {
  const [x0, x1] = box.x
  const [y0, y1] = box.y
  const c0 = f(x0, y0)
  const a = (f(x1, y0) - c0) / (x1 - x0)
  const b = (f(x0, y1) - c0) / (y1 - y0)
  if (![c0, a, b].every(finite)) return null
  const scale = Math.max(1, Math.abs(c0), Math.abs(a) * (x1 - x0), Math.abs(b) * (y1 - y0))
  for (const [u, v] of [[0.37, 0.61], [0.83, 0.12], [0.5, 0.5], [1, 1], [0.08, 0.93]]) {
    const x = x0 + (x1 - x0) * u
    const y = y0 + (y1 - y0) * v
    const z = f(x, y)
    if (!finite(z) || Math.abs(z - (c0 + a * (x - x0) + b * (y - y0))) > 1e-9 * scale) return null
  }
  // z = c0 + a (x − x0) + b (y − y0)  ⇔  −a x − b y + z = c0 − a x0 − b y0
  return [-a, -b, 1, c0 - a * x0 - b * y0]
}

// ——— Davanti e dietro un piano ———

/** Da che parte del piano sta un punto: positivo se a x + b y + c z > d. */
export function planeSide(plane: Plane, p: readonly number[]): number {
  return plane[0] * p[0] + plane[1] * p[1] + plane[2] * p[2] - plane[3]
}

/** Quanto vicino al piano un punto conta come «sul piano»: dipende dalla grandezza della scatola. */
export function planeTolerance(plane: Plane, box: Box): number {
  const size = Math.max(box.x[1] - box.x[0], box.y[1] - box.y[0], box.z[1] - box.z[0])
  return 1e-9 * size * Math.hypot(plane[0], plane[1], plane[2])
}

/** Un poligono diviso dal piano: la parte sopra e quella sotto (vuote se non c'è). */
function splitPolygon(poly: Vec3[], plane: Plane, eps: number): [Vec3[], Vec3[]] {
  const above: Vec3[] = []
  const below: Vec3[] = []
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]
    const b = poly[(i + 1) % poly.length]
    const da = planeSide(plane, a)
    const db = planeSide(plane, b)
    if (da >= -eps) above.push(a)
    if (da <= eps) below.push(a)
    if ((da > eps && db < -eps) || (da < -eps && db > eps)) {
      const m = lerp(a, b, da / (da - db))
      above.push(m)
      below.push(m)
    }
  }
  return [above.length >= 3 ? above : [], below.length >= 3 ? below : []]
}

/**
 * Un pezzo di superficie diviso da un piano: la parte sopra (1) e quella sotto (−1), ognuna con i
 * suoi tratti di griglia. Così, disegnando prima quello che sta dalla parte lontana del piano, il
 * piano copre giusto (l'algoritmo del pittore da solo sbaglia dove le superfici si tagliano).
 */
export function splitFace(face: Face, plane: Plane, eps: number): { side: 1 | -1; face: Face }[] {
  const parts: Record<'1' | '-1', Face> = {
    '1': { polygons: [], normal: face.normal, mesh: [] },
    '-1': { polygons: [], normal: face.normal, mesh: [] },
  }
  for (const poly of face.polygons) {
    const [above, below] = splitPolygon(poly, plane, eps)
    if (above.length) parts['1'].polygons.push(above)
    if (below.length) parts['-1'].polygons.push(below)
  }
  for (const [a, b] of face.mesh) {
    for (const piece of splitLine([a, b], plane, eps)) {
      const target = parts[String(piece.side) as '1' | '-1']
      if (piece.points.length === 2) target.mesh.push([piece.points[0], piece.points[1]])
    }
  }
  const out: { side: 1 | -1; face: Face }[] = []
  for (const side of [1, -1] as const) {
    const f = parts[String(side) as '1' | '-1']
    if (f.polygons.length) out.push({ side, face: f })
  }
  return out
}

/** Una linea spezzata divisa dal piano, in pezzi tutti da una parte. */
export function splitLine(points: Vec3[], plane: Plane, eps: number): { side: 1 | -1; points: Vec3[] }[] {
  const sides = points.map((p) => {
    const d = planeSide(plane, p)
    return d > eps ? 1 : d < -eps ? -1 : 0
  })
  let current: { side: 1 | -1; points: Vec3[] } = { side: sides.find((v) => v !== 0) === -1 ? -1 : 1, points: [points[0]] }
  const out = [current]
  for (let i = 1; i < points.length; i++) {
    const side = sides[i]
    if (side === 0 || side === current.side) {
      current.points.push(points[i])
      continue
    }
    // Dove la linea passa il piano: il punto lì chiude un pezzo e apre il successivo.
    const prev = points[i - 1]
    let start = prev
    if (sides[i - 1] !== 0) {
      const da = planeSide(plane, prev)
      start = lerp(prev, points[i], da / (da - planeSide(plane, points[i])))
      current.points.push(start)
    }
    current = { side, points: [start, points[i]] }
    out.push(current)
  }
  return out.filter((piece) => piece.points.length >= 2)
}

/** Le sei metà dei tetraedri di un cubetto (i vertici numerati come in CORNERS), tutti con la diagonale 0–6. */
const TETS = [
  [0, 1, 2, 6],
  [0, 2, 3, 6],
  [0, 3, 7, 6],
  [0, 7, 4, 6],
  [0, 4, 5, 6],
  [0, 5, 1, 6],
]
const CORNERS: Vec3[] = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 1],
  [1, 1, 1],
  [0, 1, 1],
]

/**
 * La superficie F(x, y, z) = 0 nella scatola, con i «tetraedri in marcia»: la scatola si divide in
 * n³ cubetti, ogni cubetto in sei tetraedri, e dove F cambia segno tra i vertici passa la superficie.
 * Dove F salta (un asintoto) il cambio di segno non è la superficie e non conta.
 */
export function implicitFaces(F: (x: number, y: number, z: number) => number, box: Box, n: number): Face[] {
  const r = ranges(box)
  const step = r.map(([lo, hi]) => (hi - lo) / n)
  const N = n + 1
  const values = new Float64Array(N * N * N)
  const pos = (i: number, j: number, k: number): Vec3 => [r[0][0] + i * step[0], r[1][0] + j * step[1], r[2][0] + k * step[2]]
  for (let k = 0; k <= n; k++) for (let j = 0; j <= n; j++) for (let i = 0; i <= n; i++) values[(k * N + j) * N + i] = F(...pos(i, j, k))
  const faces: Face[] = []
  const cv = new Array<number>(8)
  const cp = new Array<Vec3>(8)
  for (let k = 0; k < n; k++) {
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        let pos0 = false
        let neg0 = false
        let ok = true
        for (let c = 0; c < 8; c++) {
          const [di, dj, dk] = CORNERS[c]
          const value = values[((k + dk) * N + j + dj) * N + i + di]
          if (!finite(value)) ok = false
          if (value > 0) pos0 = true
          else neg0 = true
          cv[c] = value
          cp[c] = pos(i + di, j + dj, k + dk)
        }
        if (!ok || !pos0 || !neg0) continue
        const triangles: Vec3[][] = []
        for (const tet of TETS) addTet(tet, cv, cp, triangles)
        if (!triangles.length) continue
        const center = centroid(triangles)
        const m = F(...center)
        const largest = Math.max(...cv.map(Math.abs))
        if (!finite(m) || Math.abs(m) > largest) continue
        const border = outline(triangles)
        faces.push({ polygons: border ? [border] : triangles, normal: gradient(F, center, step, triangles), mesh: [] })
      }
    }
  }
  return outward(faces)
}

/** I triangoli della superficie in un tetraedro: uno se un vertice è da una parte e tre dall'altra, due se due e due. */
function addTet(tet: number[], cv: number[], cp: Vec3[], out: Vec3[][]): void {
  const inside = tet.filter((c) => cv[c] > 0)
  if (inside.length === 0 || inside.length === 4) return
  const outside = tet.filter((c) => cv[c] <= 0)
  const cross = (a: number, b: number) => lerp(cp[a], cp[b], cv[a] / (cv[a] - cv[b]))
  if (inside.length === 1 || inside.length === 3) {
    const [lone, others] = inside.length === 1 ? [inside[0], outside] : [outside[0], inside]
    out.push(others.map((o) => cross(lone, o)))
    return
  }
  const [a, b] = inside
  const [c, d] = outside
  const quad = [cross(a, c), cross(a, d), cross(b, d), cross(b, c)]
  out.push([quad[0], quad[1], quad[2]], [quad[0], quad[2], quad[3]])
}

/**
 * Il bordo dei triangoli di un cubetto, se formano un pezzo solo: un poligono al posto di tanti
 * triangoli (il disegno e i file .md restano leggeri). Null se il pezzo ha buchi o più bordi.
 */
function outline(triangles: Vec3[][]): Vec3[] | null {
  if (triangles.length === 1) return triangles[0]
  const key = (p: Vec3) => p.map((v) => Math.round(v * 1e7)).join(',')
  const edges = new Map<string, { from: Vec3; to: Vec3; count: number }>()
  for (const t of triangles) {
    for (let i = 0; i < 3; i++) {
      const a = t[i]
      const b = t[(i + 1) % 3]
      const [ka, kb] = [key(a), key(b)]
      if (ka === kb) continue
      const id = ka < kb ? `${ka};${kb}` : `${kb};${ka}`
      const e = edges.get(id)
      if (e) e.count++
      else edges.set(id, { from: a, to: b, count: 1 })
    }
  }
  // I lati del bordo sono quelli di un triangolo solo: si seguono uno dopo l'altro.
  const next = new Map<string, Vec3[]>()
  let count = 0
  for (const e of edges.values()) {
    if (e.count !== 1) continue
    count++
    for (const [p, q] of [[e.from, e.to], [e.to, e.from]]) {
      const list = next.get(key(p)) ?? []
      list.push(q)
      next.set(key(p), list)
    }
  }
  if (count < 3 || [...next.values()].some((l) => l.length !== 2)) return null
  const start = [...edges.values()].find((e) => e.count === 1)!.from
  const loop: Vec3[] = [start]
  let prev: Vec3 | null = null
  let at = start
  for (let guard = 0; guard <= count; guard++) {
    const options: Vec3[] = next.get(key(at))!
    const step: Vec3 = prev && key(options[0]) === key(prev) ? options[1] : options[0]
    if (key(step) === key(start)) break
    loop.push(step)
    prev = at
    at = step
  }
  return loop.length === count ? loop : null
}

function centroid(polygons: Vec3[][]): Vec3 {
  const sum: Vec3 = [0, 0, 0]
  let count = 0
  for (const poly of polygons) {
    for (const p of poly) {
      sum[0] += p[0]
      sum[1] += p[1]
      sum[2] += p[2]
      count++
    }
  }
  return [sum[0] / count, sum[1] / count, sum[2] / count]
}

/** La direzione in cui F cresce (il «fuori» di una sfera); se non si calcola, quella dei triangoli. */
function gradient(F: (x: number, y: number, z: number) => number, c: Vec3, step: number[], triangles: Vec3[][]): Vec3 {
  const g: Vec3 = [0, 0, 0]
  for (let a = 0; a < 3; a++) {
    const h = step[a] / 2
    const p = [...c] as Vec3
    const q = [...c] as Vec3
    p[a] += h
    q[a] -= h
    g[a] = (F(...p) - F(...q)) / (2 * h)
  }
  if (g.every(finite) && g.some((v) => v !== 0)) return g
  const sum: Vec3 = [0, 0, 0]
  for (const t of triangles) {
    const nrm = polygonNormal(t)
    sum[0] += nrm[0]
    sum[1] += nrm[1]
    sum[2] += nrm[2]
  }
  return sum
}

/**
 * Una curva nello spazio, come linee spezzate dentro la scatola: più fitta dove i punti si
 * allontanano, staccata dove la curva non c'è o esce dalla scatola. Una retta (`straight`) va da un
 * bordo all'altro della scatola.
 */
export function curveLines(
  fx: (t: number) => number,
  fy: (t: number) => number,
  fz: (t: number) => number,
  t: Range,
  box: Box,
  straight: boolean,
  n = 600,
): Vec3[][] {
  const at = (u: number): Vec3 => [fx(u), fy(u), fz(u)]
  if (straight) {
    const span = lineSpan(at, box)
    return span ? [[at(span[0]), at(span[1])]] : []
  }
  const r = ranges(box)
  const size = r.map(([lo, hi]) => hi - lo)
  const far = Math.hypot(...size) / 60
  const lines: Vec3[][] = []
  let line: Vec3[] | null = null
  let prev: Vec3 | null = null
  const push = (p: Vec3) => {
    if (prev) {
      const s = clipSegment(prev, p, box)
      if (!s) line = null
      else {
        if (!line || line[line.length - 1] !== s[0]) {
          line = [s[0]]
          lines.push(line)
        }
        line.push(s[1])
        // Uscita dalla scatola: il pezzo dopo comincia da capo.
        if (s[1] !== p) line = null
      }
    }
    prev = p
  }
  const add = (u: number, before: number | null, depth: number): void => {
    const p = at(u)
    if (!p.every(finite)) {
      line = null
      prev = null
      return
    }
    if (prev && before !== null && depth < 6) {
      const d = Math.hypot((p[0] - prev[0]) / size[0], (p[1] - prev[1]) / size[1], (p[2] - prev[2]) / size[2]) * Math.hypot(...size)
      if (d > far) {
        add((before + u) / 2, before, depth + 1)
        add(u, (before + u) / 2, depth + 1)
        return
      }
    }
    push(p)
  }
  let before: number | null = null
  for (let i = 0; i <= n; i++) {
    const u = t[0] + ((t[1] - t[0]) * i) / n
    add(u, before, 0)
    before = u
  }
  return lines.filter((l) => l.length >= 2)
}

/** Da dove a dove va t perché la retta p(t) stia nella scatola, o null se non ci passa. */
function lineSpan(at: (t: number) => Vec3, box: Box): Range | null {
  const p0 = at(0)
  const p1 = at(1)
  const d = p1.map((v, i) => v - p0[i])
  let lo = -Infinity
  let hi = Infinity
  const r = ranges(box)
  for (let k = 0; k < 3; k++) {
    if (d[k] === 0) {
      if (p0[k] < r[k][0] || p0[k] > r[k][1]) return null
      continue
    }
    const a = (r[k][0] - p0[k]) / d[k]
    const b = (r[k][1] - p0[k]) / d[k]
    lo = Math.max(lo, Math.min(a, b))
    hi = Math.min(hi, Math.max(a, b))
  }
  return lo < hi ? [lo, hi] : null
}

// ——— La scatola da mostrare ———

/** Quanti quadretti (o cubetti) per lato: meno mentre si gira il grafico, per seguire il mouse. */
export interface Detail {
  surface: number
  patch: number
  implicit: number
}

export const FINE: Detail = { surface: 44, patch: 40, implicit: 24 }
export const FAST: Detail = { surface: 24, patch: 22, implicit: 14 }

/** La scatola da mostrare, se il blocco non la dice (o ne dice solo una parte). */
export function chooseBox(spec: GraphSpec): Box {
  return withWorkLimit(GRAPH_WORK, () => findBox(spec))
}

/** Le coordinate dei punti delle cose limitate (punti, curve, superfici chiuse), asse per asse. */
type Extents = [number[], number[], number[]]

function push(extents: Extents, p: readonly number[]): void {
  if (p.every((v) => finite(v) && Math.abs(v) < 1e6)) for (let k = 0; k < 3; k++) extents[k].push(p[k])
}

function findBox(spec: GraphSpec): Box {
  const extents: Extents = [[], [], []]
  const surfaces: ((x: number, y: number) => number)[] = []
  for (const item of spec.items) {
    switch (item.kind) {
      case 'point3':
        push(extents, [item.x, item.y, item.z])
        break
      case 'vector':
        push(extents, item.from)
        push(extents, item.to)
        break
      case 'curve3':
        if (item.straight) for (const t of [0, 1]) push(extents, [item.fx(t), item.fy(t), item.fz(t)])
        else {
          for (let i = 0; i <= 300; i++) {
            const t = item.t[0] + ((item.t[1] - item.t[0]) * i) / 300
            push(extents, [item.fx(t), item.fy(t), item.fz(t)])
          }
        }
        break
      case 'patch':
        for (let j = 0; j <= 24; j++) {
          for (let i = 0; i <= 24; i++) {
            const u = item.u[0] + ((item.u[1] - item.u[0]) * i) / 24
            const v = item.v[0] + ((item.v[1] - item.v[0]) * j) / 24
            push(extents, [item.fx(u, v), item.fy(u, v), item.fz(u, v)])
          }
        }
        break
      case 'implicit3':
        if (!item.plane) implicitExtent(item.F, extents)
        break
      case 'surface':
        surfaces.push(item.f)
        break
    }
  }
  const spanOf = (values: number[]): Range | null => {
    if (!values.length) return null
    let lo = Math.min(...values)
    let hi = Math.max(...values)
    const size = hi - lo
    // L'origine (e gli assi) si vede, se non è troppo lontana; per un punto solo sempre.
    const reach = size > 1e-9 ? size * 0.75 : Infinity
    if (lo > 0 && lo <= reach) lo = 0
    if (hi < 0 && -hi <= reach) hi = 0
    // Un po' di margine: mezza unità per le cose piccole, di più per le grandi.
    const pad = hi - lo > 1e-9 ? Math.max((hi - lo) * 0.15, Math.min(0.5, (hi - lo) * 0.3)) : 0.5
    return [lo - pad, hi + pad]
  }
  const union = (a: Range | null, b: Range | null): Range | null => (a && b ? [Math.min(a[0], b[0]), Math.max(a[1], b[1])] : a ?? b)
  const fallback: Range = [-3, 3]
  // Le superfici z = f(x, y) non finiscono: almeno da −3 a 3.
  const base = surfaces.length ? fallback : null
  const x = spec.x ?? union(spanOf(extents[0]), base) ?? fallback
  const y = spec.y ?? union(spanOf(extents[1]), base) ?? fallback
  let z = spec.z
  if (!z) {
    const values = [...extents[2]]
    for (const f of surfaces) {
      for (let j = 0; j <= 40; j++) {
        for (let i = 0; i <= 40; i++) {
          const v = f(x[0] + ((x[1] - x[0]) * i) / 40, y[0] + ((y[1] - y[0]) * j) / 40)
          if (finite(v)) values.push(v)
        }
      }
    }
    z = surfaces.length ? heights(values, extents[2]) : spanOf(values) ?? fallback
  }
  // Le stesse unità sui tre assi se le misure non sono troppo diverse (con z = f(x, y) più facilmente no).
  const sizes = [x, y, z].map(([lo, hi]) => hi - lo)
  const ratio = Math.max(...sizes) / Math.min(...sizes)
  const equal = ratio <= (surfaces.length ? 2 : 4)
  return { x, y, z, equal }
}

/** L'altezza della scatola per le superfici z = f(x, y): dove stanno i valori, senza quelli enormi vicino agli asintoti. */
function heights(values: number[], fixed: number[]): Range {
  if (!values.length) return [-3, 3]
  const sorted = [...values].sort((a, b) => a - b)
  const at = (q: number) => sorted[Math.min(sorted.length - 1, Math.max(0, Math.round(q * (sorted.length - 1))))]
  let lo = sorted[0]
  let hi = sorted[sorted.length - 1]
  const middle = at(0.9) - at(0.1)
  if (hi - lo > 12 * Math.max(middle, 1e-9)) {
    lo = Math.min(at(0.03), ...fixed)
    hi = Math.max(at(0.97), ...fixed)
  }
  const size = hi - lo
  if (size < 1e-9) {
    // Un piano z = c: un po' sopra e sotto, con lo zero.
    return [Math.min(lo, 0) - 1, Math.max(hi, 0) + 1]
  }
  if (lo > 0 && lo <= size * 0.5) lo = 0
  if (hi < 0 && -hi <= size * 0.5) hi = 0
  const pad = (hi - lo) * 0.06
  return [lo - pad, hi + pad]
}

/**
 * Dove sta la superficie F = 0, se è limitata in qualche direzione: si cerca dove F cambia segno su
 * una griglia, prima vicino all'origine e poi più in là, e tra due punti con segni diversi il punto
 * della superficie (una media pesata). Gli assi su cui arriva al bordo della ricerca (un cilindro
 * lungo z) non contano.
 */
function implicitExtent(F: (x: number, y: number, z: number) => number, extents: Extents): void {
  for (const R of [6, 1.5, 24]) {
    const n = 24
    const step = (2 * R) / n
    const N = n + 1
    const values = new Float64Array(N * N * N)
    for (let k = 0; k <= n; k++) for (let j = 0; j <= n; j++) for (let i = 0; i <= n; i++) values[(k * N + j) * N + i] = F(-R + i * step, -R + j * step, -R + k * step)
    const lo = [Infinity, Infinity, Infinity]
    const hi = [-Infinity, -Infinity, -Infinity]
    const offsets = [1, N, N * N]
    for (let k = 0; k <= n; k++) {
      for (let j = 0; j <= n; j++) {
        for (let i = 0; i <= n; i++) {
          const at = (k * N + j) * N + i
          const a = values[at]
          if (!finite(a)) continue
          const node = [i, j, k]
          for (let axis = 0; axis < 3; axis++) {
            if (node[axis] === n) continue
            const b = values[at + offsets[axis]]
            if (!finite(b) || a > 0 === b > 0) continue
            const p = node.map((c) => -R + c * step)
            p[axis] += (step * a) / (a - b)
            for (let m = 0; m < 3; m++) {
              lo[m] = Math.min(lo[m], p[m])
              hi[m] = Math.max(hi[m], p[m])
            }
          }
        }
      }
    }
    if (lo[0] === Infinity) continue
    for (let a = 0; a < 3; a++) {
      if (lo[a] > -R + step && hi[a] < R - step) extents[a].push(lo[a], hi[a])
    }
    return
  }
}
