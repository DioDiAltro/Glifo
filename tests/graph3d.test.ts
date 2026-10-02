import { describe, expect, it } from 'vitest'
import { staticGraphSvg } from '../src/graph/picture'
import { chooseBox, clipPolygon, clipSegment, curveLines, implicitFaces, patchFaces, planeFace, splitFace, splitLine, surfaceFaces, surfacePlane, type Box } from '../src/graph/space'
import { formulaGraph, parseGraph, type GraphItem, type Vec3 } from '../src/graph/spec'
import { PALETTES } from '../src/graph/svg'
import { buildScene, DEFAULT_CAMERA, projection, sceneSvg } from '../src/graph/view3d'

const r = String.raw

function item<K extends GraphItem['kind']>(source: string, kind: K, index = 0, defs: string[] = []): Extract<GraphItem, { kind: K }> {
  const found = parseGraph(source, defs).items.filter((i) => i.kind === kind)[index]
  if (!found) throw new Error(`${kind} non trovato in ${source}`)
  return found as Extract<GraphItem, { kind: K }>
}

const BOX: Box = { x: [-2, 2], y: [-2, 2], z: [-2, 2], equal: true }
const light = { ...PALETTES.light, surface: '#ffffff', halo: '#ffffff' }

describe('i grafici 3D: quando un blocco è nello spazio', () => {
  it('con la z, con tre coordinate o con una funzione di x e y', () => {
    for (const source of ['z = x^2 + y^2', 'x^2 + y^2 + z^2 = 4', '(1, 2, 3)', 'P(1, 2, 3)', 'f(x, y) = x y', 'x^2 + y^2', 'z \\in [0, 1]\nz = x']) {
      expect(parseGraph(source).dim, source).toBe(3)
    }
    // z = 2 che nessun'altra riga usa è un piano: x^2 + y^2 = 1 diventa un cilindro.
    expect(parseGraph('x^2 + y^2 = 1\nz = 2').dim).toBe(3)
    for (const source of ['y = x^2', 'x^2 + y^2 = 4', '(\\cos t, \\sin t)', 'P = (1, 2)', '\\int_0^2 x^2 \\, dx']) {
      expect(parseGraph(source).dim, source).toBe(2)
    }
  })

  it('una riga con la z ma senza x e y usa il numero z della nota', () => {
    const spec = parseGraph('P = (z, 1)', ['z = 2'])
    expect(spec.dim).toBe(2)
    expect(spec.items[0]).toMatchObject({ kind: 'point', x: 2, y: 1 })
    // $z = x^2 - y^2$ nella nota non è un numero: il grafico della stessa formula è la superficie.
    const surface = parseGraph('z = x^2 - y^2', ['z = x^2 - y^2'])
    expect(surface.dim).toBe(3)
    expect(surface.errors).toEqual([])
  })

  it('con la x o la y la z è sempre la terza coordinata, anche se la nota dice «il piano $z = 2$»', () => {
    for (const source of ['z = x^2 + y^2', 'x^2 + y^2 + z^2 = 4', 'f(x, y) = x y\nz = 2']) {
      const spec = parseGraph(source, ['z = 2'])
      expect(spec.dim, source).toBe(3)
      expect(spec.errors, source).toEqual([])
      // Niente slider per la z: è una coordinata.
      expect(spec.sliders, source).toEqual([])
    }
    expect(item('z = x^2 + y^2', 'surface', 0, ['z = 2']).f(1, 1)).toBe(2)
    expect(item('f(x, y) = x y\nz = 2', 'surface', 1, ['z = 2']).f(5, 5)).toBe(2)
  })

  it('una funzione di x e y definita nella nota, scritta da sola, è una superficie', () => {
    const spec = parseGraph('f', ['f(x, y) = x^2 + y'])
    expect(spec.dim).toBe(3)
    expect(item('f', 'surface', 0, ['f(x, y) = x^2 + y']).f(2, 1)).toBe(5)
  })

  it('le superfici z = f(x, y): scritte con z, con una funzione o da sole', () => {
    const spec = parseGraph('z = x^2 + y^2\nf(x, y) = x - y\nx y\ng(y, x) = y - 2x\nz = 3')
    expect(spec.errors).toEqual([])
    expect(spec.items.map((i) => i.kind)).toEqual(['surface', 'surface', 'surface', 'surface', 'surface'])
    const [a, b, c, d, e] = spec.items as Extract<GraphItem, { kind: 'surface' }>[]
    expect(a.f(1, 2)).toBe(5)
    expect(b.f(3, 1)).toBe(2)
    expect(c.f(2, 3)).toBe(6)
    expect(c.label).toBe('z = xy')
    // g(y, x): la prima variabile è la y.
    expect(d.f(1, 5)).toBe(3)
    expect(e.f(7, 8)).toBe(3)
  })

  it('le altre equazioni in x, y e z sono superfici; quelle di primo grado sono piani', () => {
    const spec = parseGraph('x^2 + y^2 + z^2 = 4\nx + 2y - z = 3\nx = 1\ny = x^2')
    expect(spec.errors).toEqual([])
    const [sphere, plane, vertical, cylinder] = spec.items as Extract<GraphItem, { kind: 'implicit3' }>[]
    expect(spec.items.map((i) => i.kind)).toEqual(['implicit3', 'implicit3', 'implicit3', 'implicit3'])
    expect(sphere.plane).toBeNull()
    expect(sphere.F(2, 0, 0)).toBe(0)
    expect(plane.plane).toEqual([1, 2, -1, 3])
    expect(vertical.plane).toEqual([1, 0, 0, 1])
    expect(cylinder.plane).toBeNull()
  })

  it('i punti, i vettori, le curve e le superfici con i parametri', () => {
    const spec = parseGraph(r`P = (1, 2, 3)
\vec{v} = (1, 0, 2)
(\cos t, \sin t, t)
(u \cos v, u \sin v, u)
(1 + t, 2t, 3)
(\cos t, \sin t)`)
    expect(spec.errors).toEqual([])
    expect(spec.items.map((i) => i.kind)).toEqual(['point3', 'vector', 'curve3', 'patch', 'curve3', 'curve3'])
    const [p, v, helix, cone, line, circle] = spec.items
    expect(p).toMatchObject({ x: 1, y: 2, z: 3, name: 'P', slot: -1 })
    expect(v).toMatchObject({ from: [0, 0, 0], to: [1, 0, 2], name: 'v⃗' })
    expect(helix).toMatchObject({ param: 't', straight: false, t: [0, 2 * Math.PI] })
    expect(cone).toMatchObject({ params: ['u', 'v'], u: [0, 1], v: [0, 2 * Math.PI] })
    expect(line).toMatchObject({ straight: true })
    // (x, y) nello spazio sta nel piano xy.
    if (circle.kind !== 'curve3') throw new Error()
    expect([circle.fx(0), circle.fy(0), circle.fz(0)]).toEqual([1, 0, 0])
  })

  it('gli angoli dei parametri: θ fa un giro, φ mezzo (la sfera non si ricopre due volte)', () => {
    const sphere = item(r`(\sin φ \cos θ, \sin φ \sin θ, \cos φ)`, 'patch')
    expect(sphere.params).toEqual(['φ', 'θ'])
    expect(sphere.u).toEqual([0, Math.PI])
    expect(sphere.v).toEqual([0, 2 * Math.PI])
    expect(item('(s, t, s^2 + t^2)', 'patch')).toMatchObject({ params: ['s', 't'], u: [0, 1], v: [0, 1] })
  })

  it('gli intervalli: la parte da mostrare (anche z) e quelli dei parametri, che non sono slider', () => {
    const spec = parseGraph('(u, v, u v)\nu \\in [-1, 1]\nv \\in [0, 2]\nz \\in [-3, 3]\nx \\in [-2, 2]')
    expect(spec.errors).toEqual([])
    expect(spec.sliders).toEqual([])
    expect(spec.items[0]).toMatchObject({ kind: 'patch', u: [-1, 1], v: [0, 2] })
    expect(spec.z).toEqual([-3, 3])
    expect(spec.x).toEqual([-2, 2])
  })

  it('una retta con l\'intervallo del parametro è solo quel pezzo', () => {
    expect(item('(1 + t, 2t, 3)\nt \\in [0, 1]', 'curve3')).toMatchObject({ straight: false, t: [0, 1] })
  })

  it('gli slider anche nello spazio', () => {
    const spec = parseGraph('z = a x^2\na = 2')
    expect(spec.sliders.map((s) => [s.name, s.value])).toEqual([['a', 2]])
    const moved = parseGraph('z = a x^2\na = 2', [], new Map([['a', 3]]))
    expect((moved.items[0] as Extract<GraphItem, { kind: 'surface' }>).f(1, 0)).toBe(3)
  })

  it('le righe sbagliate dicono perché, e i numeri che mancano si possono aggiungere', () => {
    const spec = parseGraph(r`z = x^2 + k
(u, v, w, 1)
(u, v, s)
\int_0^1 x \, dx
z = x^2, x > 1, y`)
    const messages = spec.errors.map((e) => e.message)
    expect(spec.errors[0]).toMatchObject({ line: 0, add: [{ name: 'k', line: 'k = 1' }] })
    expect(messages[1]).toContain('tre coordinate')
    expect(messages[2]).toContain('Troppi parametri')
    expect(messages[3]).toContain('area sotto una curva')
    expect(spec.errors.length).toBe(5)
  })

  it('le superfici della nota si riconoscono per il pannello a destra', () => {
    expect(formulaGraph('z = x^2 + y^2')?.dim).toBe(3)
    expect(formulaGraph('f(x, y) = x^2 - y^2')?.dim).toBe(3)
    expect(formulaGraph('x^2 + y^2 + z^2 = 1')?.dim).toBe(3)
    expect(formulaGraph('y = x^2')?.dim).toBe(2)
    expect(formulaGraph('z = 3')).toBeNull()
  })
})

describe('i conti delle superfici e delle curve nello spazio', () => {
  it('taglia poligoni e segmenti sulla scatola', () => {
    const square: Vec3[] = [[-3, 0, 0], [3, 0, 0], [3, 1, 0], [-3, 1, 0]]
    const clipped = clipPolygon(square, BOX)
    expect(Math.min(...clipped.map((p) => p[0]))).toBe(-2)
    expect(Math.max(...clipped.map((p) => p[0]))).toBe(2)
    expect(clipSegment([0, 0, 0], [4, 0, 0], BOX)).toEqual([[0, 0, 0], [2, 0, 0]])
    expect(clipSegment([3, 3, 3], [4, 4, 4], BOX)).toBeNull()
    // Gli estremi già dentro restano gli stessi punti.
    const a: Vec3 = [0, 0, 0]
    const b: Vec3 = [1, 1, 1]
    const s = clipSegment(a, b, BOX)!
    expect(s[0]).toBe(a)
    expect(s[1]).toBe(b)
  })

  it('la superficie z = f(x, y) a quadretti, tagliata in alto e in basso, con il davanti sopra', () => {
    const faces = surfaceFaces((x, y) => x * x + y * y, BOX, 10)
    const points = faces.flatMap((f) => f.polygons.flat())
    expect(Math.max(...points.map((p) => p[2]))).toBeCloseTo(2, 9)
    expect(Math.min(...points.map((p) => p[2]))).toBeGreaterThanOrEqual(0)
    expect(faces.every((f) => f.normal[2] > 0)).toBe(true)
    // Le linee della griglia stanno sulla superficie.
    for (const [p, q] of faces.flatMap((f) => f.mesh)) {
      expect(p[2]).toBeCloseTo(Math.min(2, p[0] ** 2 + p[1] ** 2), 1)
      expect(q[2]).toBeLessThanOrEqual(2 + 1e-9)
    }
  })

  it('dove la funzione non c\'è, i quadretti si tagliano sul bordo del dominio', () => {
    const faces = surfaceFaces((x, y) => Math.sqrt(1 - x * x - y * y), BOX, 12)
    const radii = faces.flatMap((f) => f.polygons.flat()).map((p) => Math.hypot(p[0], p[1]))
    expect(Math.max(...radii)).toBeLessThanOrEqual(1 + 1e-6)
    expect(Math.max(...radii)).toBeGreaterThan(0.999)
  })

  it('dove la funzione salta (un asintoto) i quadretti non si disegnano', () => {
    const faces = surfaceFaces((x) => 1 / x, BOX, 9)
    const spans = faces.map((f) => Math.max(...f.polygons[0].map((p) => p[0])) - Math.min(...f.polygons[0].map((p) => p[0])))
    // Nessun quadretto attraversa x = 0 da un lato all'altro.
    expect(faces.every((f) => f.polygons[0].every((p) => p[0] <= 1e-9) || f.polygons[0].every((p) => p[0] >= -1e-9))).toBe(true)
    expect(spans.length).toBeGreaterThan(0)
  })

  it('una sfera con i tetraedri in marcia: i vertici sulla sfera, le normali verso fuori', () => {
    for (const F of [(x: number, y: number, z: number) => x * x + y * y + z * z - 1, (x: number, y: number, z: number) => 1 - x * x - y * y - z * z]) {
      const faces = implicitFaces(F, BOX, 16)
      expect(faces.length).toBeGreaterThan(50)
      for (const face of faces) {
        for (const p of face.polygons.flat()) expect(Math.abs(Math.hypot(...p) - 1)).toBeLessThan(0.05)
        const c = face.polygons[0][0]
        expect(face.normal[0] * c[0] + face.normal[1] * c[1] + face.normal[2] * c[2]).toBeGreaterThan(0)
      }
    }
  })

  it('una superficie con i parametri: verso fuori qualunque sia il verso dei parametri', () => {
    const torus = (sign: number) =>
      patchFaces(
        (u, v) => (2 + Math.cos(v)) * Math.cos(sign * u),
        (u, v) => (2 + Math.cos(v)) * Math.sin(sign * u),
        (_u, v) => Math.sin(v),
        [0, 2 * Math.PI],
        [0, 2 * Math.PI],
        24,
        12,
        { x: [-4, 4], y: [-4, 4], z: [-4, 4], equal: true },
      )
    for (const sign of [1, -1]) {
      const faces = torus(sign)
      const outward = faces.filter((f) => {
        const p = f.polygons[0][0]
        const ring = Math.hypot(p[0], p[1])
        const toward: Vec3 = [p[0] - (2 * p[0]) / ring, p[1] - (2 * p[1]) / ring, p[2]]
        return f.normal[0] * toward[0] + f.normal[1] * toward[1] + f.normal[2] * toward[2] > 0
      })
      expect(outward.length / faces.length).toBeGreaterThan(0.95)
    }
  })

  it('un piano è un poligono solo dentro la scatola; z = 3 e z = x + y si riconoscono come piani', () => {
    const face = planeFace([1, 1, 1, 1], BOX)!
    expect(face.polygons).toHaveLength(1)
    for (const p of face.polygons[0]) expect(p[0] + p[1] + p[2]).toBeCloseTo(1, 9)
    expect(face.mesh.length).toBeGreaterThan(5)
    expect(planeFace([0, 0, 1, 5], BOX)).toBeNull()
    expect(surfacePlane(() => 3, BOX)).toEqual([-0, -0, 1, 3])
    const tilted = surfacePlane((x, y) => x + 2 * y - 1, BOX)!
    expect(tilted[0] * 1 + tilted[1] * 1 + tilted[2] * 2).toBeCloseTo(tilted[3], 9)
    expect(surfacePlane((x, y) => x * y, BOX)).toBeNull()
  })

  it('divide pezzi di superficie e linee davanti e dietro un piano', () => {
    const face = { polygons: [[[-1, -1, -1], [1, -1, 1], [1, 1, 1], [-1, 1, -1]] as Vec3[]], normal: [0, 0, 1] as Vec3, mesh: [] as [Vec3, Vec3][] }
    const parts = splitFace(face, [0, 0, 1, 0], 1e-12)
    expect(parts.map((p) => p.side).sort()).toEqual([-1, 1])
    for (const part of parts) for (const p of part.face.polygons.flat()) expect(p[2] * part.side).toBeGreaterThanOrEqual(-1e-12)
    const pieces = splitLine([[0, 0, -1], [0, 0, -0.5], [0, 0, 0.5], [0, 0, 1]], [0, 0, 1, 0], 1e-12)
    expect(pieces.map((p) => p.side)).toEqual([-1, 1])
    expect(pieces[0].points.at(-1)).toEqual([0, 0, 0])
    expect(pieces[1].points[0]).toEqual([0, 0, 0])
  })

  it('le curve si staccano dove escono dalla scatola; le rette vanno da un bordo all\'altro', () => {
    const helix = curveLines(Math.cos, Math.sin, (t) => t - 4, [0, 8], BOX, false)
    expect(helix).toHaveLength(1)
    const all = helix.flat()
    expect(Math.min(...all.map((p) => p[2]))).toBeCloseTo(-2, 6)
    expect(Math.max(...all.map((p) => p[2]))).toBeCloseTo(2, 6)
    const line = curveLines((t) => t, (t) => 2 * t, () => 0, [0, 1], BOX, true)
    expect(line).toEqual([[[-1, -2, 0], [1, 2, 0]]])
    // Esce dalla scatola in alto e in basso: tre pezzi.
    const wave = curveLines(() => 0, () => 0, (t) => 2.5 * Math.sin(t), [0, 2 * Math.PI], BOX, false)
    expect(wave.length).toBe(3)
    for (const piece of wave) for (const p of piece) expect(Math.abs(p[2])).toBeLessThanOrEqual(2 + 1e-9)
  })

  it('sceglie la scatola: attorno a una sfera con le stesse unità, alta quanto serve per un paraboloide', () => {
    const sphere = chooseBox(parseGraph('x^2 + y^2 + z^2 = 4'))
    expect(sphere.equal).toBe(true)
    for (const range of [sphere.x, sphere.y, sphere.z]) {
      expect(range[0]).toBeLessThan(-2)
      expect(range[0]).toBeGreaterThan(-3.5)
      expect(range[1]).toBeGreaterThan(2)
    }
    const bowl = chooseBox(parseGraph('z = x^2 + y^2'))
    expect(bowl.x).toEqual([-3, 3])
    expect(bowl.z[0]).toBeLessThanOrEqual(0)
    expect(bowl.z[1]).toBeGreaterThanOrEqual(18)
    expect(bowl.equal).toBe(false)
    // Quella scritta nel blocco vale.
    expect(chooseBox(parseGraph('z = x^2\nx \\in [0, 1]\ny \\in [0, 1]\nz \\in [0, 2]'))).toMatchObject({ x: [0, 1], y: [0, 1], z: [0, 2] })
    // Un cilindro lungo z: x e y dal cilindro, z come x e y.
    const cylinder = chooseBox(parseGraph('x^2 + y^2 = 1\nz \\in [-1, 1]'))
    expect(cylinder.x[0]).toBeGreaterThan(-2)
    expect(cylinder.x[1]).toBeLessThan(2)
    // Punti: con l'origine, così si vedono gli assi.
    const points = chooseBox(parseGraph('P = (1, 2, 3)'))
    expect(points.x[0]).toBeLessThanOrEqual(0)
    expect(points.z[1]).toBeGreaterThan(3)
  })
})

describe('il disegno dei grafici 3D', () => {
  it('superfici, assi con i loro nomi e i punti; girando il grafico cambia', () => {
    const spec = parseGraph('z = x^2 - y^2\nP = (1, 1, 0)')
    const box = chooseBox(spec)
    const scene = buildScene(spec, box)
    expect(scene.faces.length).toBeGreaterThan(500)
    const svg = sceneSvg(scene, spec, DEFAULT_CAMERA, light, { width: 640, height: 400, title: 'Grafico' })
    expect(svg).toContain('class="graph-svg graph-3d"')
    expect(svg).toContain('aria-label="Grafico"')
    for (const name of ['>x<', '>y<', '>z<', '>P<']) expect(svg).toContain(name)
    expect(svg).toContain('<circle')
    const turned = sceneSvg(scene, spec, { ...DEFAULT_CAMERA, az: DEFAULT_CAMERA.az + 1 }, light, { width: 640, height: 400 })
    expect(turned).not.toBe(svg)
  })

  it('il punto più vicino a chi guarda è disegnato dopo', () => {
    const proj = projection(BOX, DEFAULT_CAMERA, 640, 400)
    const near = proj.at([2, 2, 2])
    const far = proj.at([-2, -2, -2])
    expect(near[2]).toBeGreaterThan(far[2])
    // L'asse z sale sullo schermo.
    expect(proj.at([0, 0, 2])[1]).toBeLessThan(proj.at([0, 0, -2])[1])
  })

  it('un piano è velato, e quello che ha dietro si disegna prima di lui, quello davanti dopo', () => {
    // A è sopra il piano ma in fondo, B sotto ma davanti: dal più lontano al più vicino sarebbe il
    // contrario, e il piano coprirebbe A.
    const spec = parseGraph('z = 0\nA = (-9, -9, 0.5)\nB = (9, 9, -0.5)\nx \\in [-10, 10]\ny \\in [-10, 10]\nz \\in [-1, 1]')
    const svg = staticGraphSvg(spec, 640, 400, light, { id: 'g' })
    const plane = svg.indexOf('fill-opacity="0.72"')
    expect(plane).toBeGreaterThan(0)
    // Si guarda dall'alto: B (sotto il piano) prima, A (sopra) dopo.
    expect(svg.indexOf('>B<')).toBeLessThan(plane)
    expect(svg.indexOf('>A<')).toBeGreaterThan(plane)
  })

  it('i numeri degli assi non si scrivono sopra le superfici', () => {
    const spec = parseGraph('x^2 + y^2 + z^2 = 4')
    const svg = staticGraphSvg(spec, 640, 400, light, { id: 'g' })
    // Le tacche in ±2 sono sulla sfera: i loro numeri no.
    expect(svg).not.toMatch(/>−?2</)
    const free = staticGraphSvg(parseGraph('P = (2, 2, 2)'), 640, 400, light, { id: 'g' })
    expect(free).toMatch(/>2</)
  })

})
