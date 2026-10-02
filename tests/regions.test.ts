import { describe, expect, it } from 'vitest'
import { staticGraphSvg } from '../src/graph/picture'
import { chooseWindow, regionEdges } from '../src/graph/plot'
import { chooseBox, layeredFaces, solidFaces, type Box } from '../src/graph/space'
import { formulaGraph, formulaGraphLine, parseGraph, type GraphItem } from '../src/graph/spec'
import { PALETTES } from '../src/graph/svg'
import { buildScene } from '../src/graph/view3d'

const r = String.raw

function item<K extends GraphItem['kind']>(source: string, kind: K, index = 0, defs: string[] = []): Extract<GraphItem, { kind: K }> {
  const spec = parseGraph(source, defs)
  const found = spec.items.filter((i) => i.kind === kind)[index]
  if (!found) throw new Error(`${kind} non trovato in ${source}: ${JSON.stringify(spec.errors)}`)
  return found as Extract<GraphItem, { kind: K }>
}

const light = { ...PALETTES.light, surface: '#ffffff', halo: '#ffffff' }

describe('le zone del piano', () => {
  it('le disuguaglianze in x e y, gli insiemi e i domini degli integrali doppi', () => {
    const zone = item('y > x^2', 'region')
    expect(zone.strict).toBe(true)
    expect(zone.M(0, 1)).toBeGreaterThan(0)
    expect(zone.M(0, -1)).toBeLessThan(0)
    expect(item(r`x^2 + y^2 \le 4`, 'region').strict).toBe(false)
    const set = item(r`D = \{(x, y) : 0 \le x \le 1, x^2 \le y \le x\}`, 'region')
    expect(set.M(0.5, 0.4)).toBeGreaterThan(0)
    expect(set.M(0.5, 0.1)).toBeLessThan(0)
    expect(set.parts).toHaveLength(4)
    // Il nome di un insieme della nota, e un integrale doppio sopra: con il valore nella legenda.
    const defs = [r`D = \{(x, y) : x^2 + y^2 \le 1\}`]
    expect(item('D', 'region', 0, defs).M(0, 0)).toBeGreaterThan(0)
    const integral = item(r`\iint_D 1 \, dA`, 'region', 0, defs)
    expect(integral.label).toBe(r`\iint_{D} 1 \, dx \, dy = 3{,}141592\ldots`)
    // In coordinate polari: la cardioide, nel piano xy.
    const polar = item(r`\int_0^{\pi} \int_0^{1 + \cos\theta} r \, dr \, d\theta`, 'region')
    expect(polar.M(1, 0.5)).toBeGreaterThan(0)
    expect(polar.M(1, -0.5)).toBeLessThan(0)
    expect(polar.M(1.9, 0.01)).toBeGreaterThan(0)
  })

  it('una zona con la condizione dopo la virgola', () => {
    const zone = item(r`y \le 4 - x^2, y \ge 0`, 'region')
    expect(zone.M(0, 2)).toBeGreaterThan(0)
    expect(zone.M(0, -1)).toBeLessThan(0)
  })

  it('il bordo pezzo per pezzo: tratteggiato dove la condizione è stretta', () => {
    const svg = staticGraphSvg(parseGraph(r`D = \{(x, y) : y > x^2, y \le 4\}`), 640, 400, light, { id: 'g' })
    const edges = [...svg.matchAll(/<path d="[^"]+" stroke="[^"]+" stroke-width="2"( stroke-dasharray="6 4")? data-item="0"\/>/g)]
    expect(edges.map((m) => !!m[1])).toEqual([true, false])
    expect(svg).toContain('data-area="0"')
    // Ogni condizione disegna la sua curva solo dove valgono le altre: la parabola fino a y = 4.
    const zone = item(r`D = \{(x, y) : y > x^2, y \le 4\}`, 'region')
    const vp = { x0: -4, x1: 4, y0: -1, y1: 6, width: 320, height: 280 }
    const [parabola, line] = regionEdges(zone, vp)
    const xs = (lines: number[][]) => lines.flatMap((l) => l.filter((_, k) => k % 2 === 0)).map((px) => vp.x0 + (px / vp.width) * (vp.x1 - vp.x0))
    expect(Math.max(...xs(parabola.lines).map(Math.abs))).toBeCloseTo(2, 2)
    expect(Math.max(...xs(line.lines).map(Math.abs))).toBeCloseTo(2, 2)
  })

  it('la finestra si stringe attorno alle zone', () => {
    const small = chooseWindow(parseGraph(r`D = \{(x, y) : 0 \le x \le 1, x^2 \le y \le x\}`), 640, 400)
    expect(small.x0).toBeLessThan(0)
    expect(small.x1).toBeGreaterThan(1)
    expect(small.x1 - small.x0).toBeLessThan(4)
    // Le zone senza fine: il loro bordo vicino all'origine.
    const open = chooseWindow(parseGraph('y > x^2\ny < 4'), 640, 400)
    expect(open.x1 - open.x0).toBeLessThan(20)
    expect(open.y1).toBeGreaterThan(4)
    const half = chooseWindow(parseGraph('x + y < 1'), 640, 400)
    expect(half.x1 - half.x0).toBeLessThan(10)
  })

  it('l\'integrale su un insieme già disegnato nel blocco: una zona sola, dello stesso colore', () => {
    const spec = parseGraph(r`D = \{(x, y) : 0 \le x \le 1, x^2 \le y \le x\}
\iint_D 1 \, dA`)
    expect(spec.items.map((i) => [i.kind, i.slot, !!i.same])).toEqual([
      ['region', 0, false],
      ['region', 0, true],
    ])
    const svg = staticGraphSvg(spec, 640, 400, light, { id: 'g' })
    expect(svg).toContain('data-area="0"')
    expect(svg).not.toContain('data-area="1"')
  })

  it('due righe con «=» e «<» insieme dicono di dividerle', () => {
    expect(parseGraph('y = 3 < x').errors[0].message).toBe('Un\'uguaglianza e una disuguaglianza insieme: scrivile in due righe')
  })
})

describe('i solidi nello spazio', () => {
  it('le disuguaglianze con la z, gli insiemi con tre variabili e gli integrali tripli', () => {
    const ball = item(r`x^2 + y^2 + z^2 \le 1`, 'solid')
    expect(ball.M(0, 0, 0.5)).toBeGreaterThan(0)
    expect(ball.M(0, 0, 1.5)).toBeLessThan(0)
    expect(ball.parts).toHaveLength(1)
    expect(ball.layers).toBeNull()
    const set = item(r`E = \{(x, y, z) : \sqrt{x^2 + y^2} \le z \le \sqrt{2 - x^2 - y^2}\}`, 'solid')
    expect(set.M(0, 0, 1)).toBeGreaterThan(0)
    expect(set.M(0, 0, -1)).toBeLessThan(0)
    const triple = item(r`\iiint_{x \ge 0, y \ge 0, z \ge 0, x + y + z \le 1} dV`, 'solid')
    expect(triple.label).toBe(r`\iiint_{x \ge 0,\; y \ge 0,\; z \ge 0,\; x + y + z \le 1} 1 \, dx \, dy \, dz = 0{,}166666\ldots`)
    expect(triple.parts).toHaveLength(4)
  })

  it('un integrale doppio con una funzione di x e y è il volume sotto la superficie, nello spazio', () => {
    const spec = parseGraph(r`\iint_{x^2 + y^2 \le 1} (2 - x^2 - y^2) \, dA`)
    expect(spec.dim).toBe(3)
    const solid = spec.items[0]
    expect(solid.kind).toBe('solid')
    if (solid.kind !== 'solid') return
    expect(solid.M(0, 0, 1)).toBeGreaterThan(0)
    expect(solid.M(0, 0, 2.5)).toBeLessThan(0)
    expect(solid.M(0, 0, -0.5)).toBeLessThan(0)
    // L'area del dominio (la funzione è 1) resta nel piano.
    expect(parseGraph(r`\iint_{x^2 + y^2 \le 1} 1 \, dA`).dim).toBe(2)
    // Una funzione con r e θ non si sa dove sia: dentro c'è anche lo jacobiano r.
    expect(parseGraph(r`\int_0^{2\pi} \int_0^1 r^2 \, dr \, d\theta
z = 1`).errors[0].message).toContain('con r e θ')
  })

  it('i domini uno dentro l\'altro sono a strati, anche in coordinate cilindriche e sferiche', () => {
    const nested = item(r`\int_0^1 \int_0^{1-x} \int_0^{1-x-y} 1 \, dz \, dy \, dx`, 'solid')
    expect(nested.layers?.vars).toEqual(['x', 'y', 'z'])
    const cylinder = item(r`\int_0^{2\pi} \int_0^1 \int_0^2 r \, dz \, dr \, d\theta`, 'solid')
    expect(cylinder.layers?.angle).toBe('θ')
    expect(cylinder.layers?.point({ θ: Math.PI / 2, r: 1, z: 2 }).map((c) => Math.round(c * 1e9) / 1e9)).toEqual([0, 1, 2])
    const ball = item(r`\int_0^{2\pi} \int_0^{\pi/2} \int_0^1 \rho^2 \sin\varphi \, d\rho \, d\varphi \, d\theta`, 'solid')
    expect(ball.layers?.point({ θ: 0, φ: Math.PI / 2, ρ: 1 }).map((c) => Math.round(c * 1e9) / 1e9)).toEqual([1, 0, 0])
    // Un volume su un rettangolo: z tra 0 e f, anche dove f è negativa.
    const volume = item(r`\iint_{[-1,1] \times [-1,1]} x y \, dx \, dy`, 'solid')
    expect(volume.layers?.vars).toEqual(['x', 'y', 'z'])
    expect(volume.layers?.lo[2]({ x: 1, y: -1 })).toBe(-1)
    expect(volume.layers?.hi[2]({ x: 1, y: -1 })).toBe(0)
  })

  it('le facce di un cilindro: niente parete dove θ fa il giro, normali verso fuori', () => {
    const cylinder = item(r`\int_0^{2\pi} \int_0^1 \int_0^2 r \, dz \, dr \, d\theta`, 'solid')
    const box: Box = { x: [-1.5, 1.5], y: [-1.5, 1.5], z: [-0.5, 2.5], equal: true }
    const faces = layeredFaces(cylinder.layers!, box, 12)
    // Il fianco e i due cerchi: 3 facce di 12 × 12 quadretti (r = 0 è una linea, θ = 0 e θ = 2π si toccano).
    expect(faces).toHaveLength(3 * 144)
    for (const face of faces) {
      const c = face.polygons[0].reduce((s, p) => [s[0] + p[0], s[1] + p[1], s[2] + p[2]], [0, 0, 0]).map((v) => v / face.polygons[0].length)
      const n = face.normal
      if (Math.abs(n[2]) > 0.5 * Math.hypot(...n)) expect(Math.sign(n[2])).toBe(c[2] > 1 ? 1 : -1)
      else expect(n[0] * c[0] + n[1] * c[1]).toBeGreaterThan(0)
      // Nessun pezzo sul semipiano y = 0, x > 0 (dove θ = 0 e θ = 2π).
      expect(face.polygons[0].every((p) => Math.abs(p[1]) < 1e-12 && p[0] > 1e-9 && p[0] < 1 - 1e-9)).toBe(false)
    }
  })

  it('i solidi con le condizioni una per una hanno gli spigoli netti: il tetraedro ha 4 facce piane', () => {
    const tetra = item(r`\iiint_{x \ge 0, y \ge 0, z \ge 0, x + y + z \le 1} dV`, 'solid')
    const box: Box = { x: [-0.5, 1.5], y: [-0.5, 1.5], z: [-0.5, 1.5], equal: true }
    const faces = solidFaces(tetra.M, tetra.parts, box, 12)
    expect(faces).toHaveLength(4)
    expect(faces.every((f) => f.polygons.length === 1 && f.polygons[0].length === 3)).toBe(true)
  })

  it('la scatola contiene il solido', () => {
    const box = chooseBox(parseGraph(r`\int_0^{2\pi} \int_0^1 \int_0^2 r \, dz \, dr \, d\theta`))
    expect(box.x[0]).toBeLessThan(-1)
    expect(box.x[1]).toBeGreaterThan(1)
    expect(box.z[0]).toBeLessThanOrEqual(0)
    expect(box.z[1]).toBeGreaterThan(2)
  })

  it('un solido tagliato dalla scatola (z \\ge 0) con altre cose nel grafico è velato', () => {
    const spec = parseGraph(r`x^2 + y^2 + z^2 \le 1
z \ge 0`)
    const scene = buildScene(spec, chooseBox(spec), 'fast')
    expect(scene.faces.some((f) => f.item === 1 && f.open && f.face.boxSide)).toBe(true)
    expect(scene.faces.some((f) => f.item === 0 && f.open)).toBe(false)
    const svg = staticGraphSvg(spec, 400, 300, light, { id: 'g' })
    expect(svg).toContain('fill-opacity="0.42"')
    // Da solo resta pieno.
    expect(staticGraphSvg(parseGraph(r`z \ge x^2 + y^2`), 400, 300, light, { id: 'g' })).not.toContain('fill-opacity="0.42"')
  })
})

describe('il grafico nel pannello di una formula', () => {
  it('gli integrali doppi e tripli, senza il risultato', () => {
    expect(formulaGraphLine(r`\iint_{[0,1]^2} (x + y) \, dA = 1`)).toBe(r`\iint_{[0,1]^2} (x + y) \, dA`)
    expect(formulaGraphLine(r`V = \iiint_{x^2 + y^2 + z^2 \le 1} dV =`)).toBe(r`V = \iiint_{x^2 + y^2 + z^2 \le 1} dV`)
    const volume = formulaGraph(r`\iint_{x^2 + y^2 \le 1} (2 - x^2 - y^2) \, dA = 4{,}712388\ldots`)
    expect(volume?.dim).toBe(3)
    expect(volume?.items.map((i) => i.kind)).toEqual(['solid'])
    const defs = [r`D = \{(x, y) : x^2 + y^2 \le 1\}`]
    expect(formulaGraph(r`\iint_D 1 \, dA =`, defs)?.items.map((i) => i.kind)).toEqual(['region'])
  })

  it('gli insiemi e le zone con x e y, non una condizione su una variabile sola', () => {
    expect(formulaGraph(r`D = \{(x, y) : x^2 + y^2 \le 1\}`)?.items.map((i) => i.kind)).toEqual(['region'])
    expect(formulaGraph('y > x^2')?.items.map((i) => i.kind)).toEqual(['region'])
    expect(formulaGraph(r`x^2 + y^2 + z^2 \le 4`)?.items.map((i) => i.kind)).toEqual(['solid'])
    expect(formulaGraph('x > 0')).toBeNull()
  })
})
