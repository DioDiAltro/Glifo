import { describe, expect, it } from 'vitest'
import { adjustShape, recognize, shapePoints, snapAngle, type Shape } from '../src/board/shapes'
import type { Pt } from '../src/board/strokes'

/** Un tremolio sempre uguale (pseudo-casuale con un seme), come una mano che disegna. */
function shaky(seed = 1) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s / 2147483647) * 2 - 1
  }
}

/** Il tratto per i punti dati, un punto ogni 3 unità, con un tremolio di `amp` unità. */
function hand(points: Pt[], amp = 1.5, seed = 1): Pt[] {
  const r = shaky(seed)
  const out: Pt[] = []
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]
    const b = points[i]
    const steps = Math.max(1, Math.round(Math.hypot(b.x - a.x, b.y - a.y) / 3))
    for (let k = i === 1 ? 0 : 1; k <= steps; k++) {
      const t = k / steps
      out.push({ x: a.x + (b.x - a.x) * t + r() * amp, y: a.y + (b.y - a.y) * t + r() * amp })
    }
  }
  return out
}

/** Un'ellisse a mano: da `from` a `to` giri, con il tremolio. */
function ellipse(c: Pt, rx: number, ry: number, angle = 0, turns = 1.03, amp = 1.5, seed = 2): Pt[] {
  const r = shaky(seed)
  const out: Pt[] = []
  const n = 120
  for (let i = 0; i <= n * turns; i++) {
    const t = (2 * Math.PI * i) / n
    const x = rx * Math.cos(t) + r() * amp
    const y = ry * Math.sin(t) + r() * amp
    out.push({ x: c.x + x * Math.cos(angle) - y * Math.sin(angle), y: c.y + x * Math.sin(angle) + y * Math.cos(angle) })
  }
  return out
}

const P = (x: number, y: number): Pt => ({ x, y })
const deg = (r: number) => (r * 180) / Math.PI
const close = (a: Pt, b: Pt, tol: number) => Math.hypot(a.x - b.x, a.y - b.y) <= tol
const vertices = (s: Shape | null) => (s && 'points' in s ? s.points : [])

describe('lavagna: le figure precise', () => {
  it('una riga quasi orizzontale diventa una linea orizzontale, con la stessa lunghezza', () => {
    const s = recognize(hand([P(0, 0), P(100, 4), P(200, 6)]))
    expect(s?.kind).toBe('line')
    if (s?.kind !== 'line') return
    expect(s.a.y).toBeCloseTo(s.b.y, 6)
    expect(Math.abs(s.b.x - s.a.x)).toBeGreaterThan(190)
  })

  it('le linee storte restano storte; a 45° per poco diventano a 45°', () => {
    const steep = recognize(hand([P(0, 0), P(100, 58)]))
    expect(steep?.kind).toBe('line')
    if (steep?.kind === 'line') expect(deg(Math.atan2(steep.b.y - steep.a.y, steep.b.x - steep.a.x))).toBeCloseTo(30, 0)
    const diag = recognize(hand([P(0, 0), P(150, 141)]))
    if (diag?.kind !== 'line') throw new Error('non è una linea')
    expect(deg(Math.atan2(diag.b.y - diag.a.y, diag.b.x - diag.a.x))).toBeCloseTo(45, 6)
    expect(snapAngle(Math.PI / 2 + 0.05)).toBeCloseTo(Math.PI / 2, 9)
    expect(snapAngle(0.3)).toBe(0.3)
  })

  it('un cerchio a mano diventa un cerchio, con il centro e il raggio giusti', () => {
    const s = recognize(ellipse(P(200, 150), 60, 62))
    expect(s?.kind).toBe('circle')
    if (s?.kind !== 'circle') return
    expect(close(s.c, P(200, 150), 3)).toBe(true)
    expect(s.rx).toBeGreaterThan(56)
    expect(s.rx).toBeLessThan(65)
  })

  it('un\'ellisse storta resta storta, una quasi diritta diventa diritta', () => {
    const tilted = recognize(ellipse(P(0, 0), 120, 55, (25 * Math.PI) / 180))
    expect(tilted?.kind).toBe('ellipse')
    if (tilted?.kind === 'ellipse') {
      expect(deg(tilted.angle)).toBeCloseTo(25, -0.5)
      expect(tilted.rx / tilted.ry).toBeGreaterThan(1.8)
    }
    const almost = recognize(ellipse(P(0, 0), 60, 130, (4 * Math.PI) / 180))
    expect(almost?.kind).toBe('ellipse')
    if (almost?.kind === 'ellipse') {
      expect(almost.angle).toBe(0)
      // Diritta in piedi: rx orizzontale, ry verticale.
      expect(almost.ry).toBeGreaterThan(almost.rx)
    }
  })

  it('un quadrato a mano diventa un quadrato diritto, un rettangolo un rettangolo', () => {
    const sq = recognize(hand([P(0, 0), P(120, 3), P(122, 121), P(2, 118), P(0, 2)], 1.5, 3))
    expect(sq?.kind).toBe('square')
    const v = vertices(sq)
    expect(v).toHaveLength(4)
    // Lati orizzontali e verticali, tutti lunghi uguale.
    for (let i = 0; i < 4; i++) {
      const a = v[i]
      const b = v[(i + 1) % 4]
      expect(Math.min(Math.abs(a.x - b.x), Math.abs(a.y - b.y))).toBeLessThan(1e-6)
      expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeCloseTo(Math.hypot(v[1].x - v[0].x, v[1].y - v[0].y), 6)
    }
    const rect = recognize(hand([P(10, 10), P(250, 18), P(246, 130), P(6, 122), P(10, 12)], 1.5, 4))
    expect(rect?.kind).toBe('rectangle')
    const r = vertices(rect)
    expect(Math.abs(r[0].y - r[1].y)).toBeLessThan(1e-6)
    expect(Math.abs(r[1].x - r[2].x)).toBeLessThan(1e-6)
  })

  it('un rettangolo storto resta storto, con gli angoli retti', () => {
    const c = P(0, 0)
    const corners = [P(-100, -50), P(100, -50), P(100, 50), P(-100, 50)].map((p) => {
      const a = (30 * Math.PI) / 180
      return P(c.x + p.x * Math.cos(a) - p.y * Math.sin(a), c.y + p.x * Math.sin(a) + p.y * Math.cos(a))
    })
    const s = recognize(hand([...corners, corners[0]], 1.5, 5))
    expect(s?.kind).toBe('rectangle')
    const v = vertices(s)
    const dot = (v[1].x - v[0].x) * (v[2].x - v[1].x) + (v[1].y - v[0].y) * (v[2].y - v[1].y)
    expect(Math.abs(dot)).toBeLessThan(1e-6)
    expect(deg(Math.atan2(v[1].y - v[0].y, v[1].x - v[0].x)) % 90).toBeCloseTo(30, -0.5)
  })

  it('triangoli: i vertici dove sono stati disegnati; un angolo quasi retto diventa retto', () => {
    const t = recognize(hand([P(0, 200), P(100, 20), P(200, 200), P(0, 200)], 1.5, 6))
    expect(t?.kind).toBe('triangle')
    const v = vertices(t)
    for (const want of [P(0, 200), P(100, 20), P(200, 200)]) expect(v.some((p) => close(p, want, 8))).toBe(true)
    const right = recognize(hand([P(0, 0), P(4, 150), P(160, 150), P(0, 0)], 1.5, 7))
    expect(right?.kind).toBe('triangle')
    const r = vertices(right)
    // Uno dei tre angoli è retto, esatto.
    const dots = [0, 1, 2].map((i) => {
      const a = r[(i + 2) % 3]
      const b = r[i]
      const c = r[(i + 1) % 3]
      return Math.abs((a.x - b.x) * (c.x - b.x) + (a.y - b.y) * (c.y - b.y))
    })
    expect(Math.min(...dots)).toBeLessThan(1e-6)
  })

  it('un rombo con le diagonali diritte; pentagoni ed esagoni regolari', () => {
    const d = recognize(hand([P(100, 0), P(178, 100), P(100, 202), P(18, 100), P(100, 0)], 1.5, 8))
    expect(d?.kind).toBe('diamond')
    // Le diagonali: una orizzontale e una verticale.
    const upright = (v: Pt[]) =>
      (Math.abs(v[0].y - v[2].y) < 1e-6 && Math.abs(v[1].x - v[3].x) < 1e-6) || (Math.abs(v[0].x - v[2].x) < 1e-6 && Math.abs(v[1].y - v[3].y) < 1e-6)
    expect(upright(vertices(d))).toBe(true)
    // Anche con le diagonali quasi uguali (un quadrato in punta) è un rombo, con le diagonali diritte;
    // un quadrato con i lati diritti resta un quadrato.
    const pointy = recognize(hand([P(100, 0), P(205, 100), P(100, 198), P(-2, 100), P(100, 0)], 1.5, 8))
    expect(pointy?.kind).toBe('diamond')
    expect(upright(vertices(pointy))).toBe(true)
    const hexagon = Array.from({ length: 7 }, (_, i) => P(100 + 90 * Math.cos((i * Math.PI) / 3), 100 + 90 * Math.sin((i * Math.PI) / 3)))
    const hex = recognize(hand(hexagon, 1.5, 9))
    expect(hex?.kind).toBe('hexagon')
    const h = vertices(hex)
    const sides = h.map((p, i) => Math.hypot(h[(i + 1) % 6].x - p.x, h[(i + 1) % 6].y - p.y))
    for (const l of sides) expect(l).toBeCloseTo(sides[0], 6)
  })

  it('una freccia in un tratto solo: l\'asta dritta e due alette uguali', () => {
    const s = recognize(hand([P(0, 100), P(200, 103), P(176, 88), P(200, 103), P(177, 116)], 1.2, 10))
    expect(s?.kind).toBe('arrow')
    if (s?.kind !== 'arrow') return
    expect(s.a.y).toBeCloseTo(s.b.y, 6)
    expect(close(s.b, P(200, 101.5), 5)).toBe(true)
    const pts = shapePoints(s)
    expect(pts).toHaveLength(5)
    // Le due alette sono simmetriche rispetto all'asta.
    expect(pts[2].x).toBeCloseTo(pts[4].x, 6)
    expect(pts[2].y - s.b.y).toBeCloseTo(s.b.y - pts[4].y, 6)
  })

  it('una freccia lunga con le alette piccole (un asse) resta una freccia; tornare indietro sulla linea no', () => {
    const axis = recognize(hand([P(40, 333), P(440, 327), P(426, 319), P(440, 327), P(426, 337)], 1.2, 14))
    expect(axis?.kind).toBe('arrow')
    if (axis?.kind === 'arrow') {
      expect(axis.a.y).toBeCloseTo(axis.b.y, 6)
      expect(axis.head).toBeGreaterThan(12)
      expect(axis.head).toBeLessThan(20)
    }
    // Alla fine la penna torna un po' indietro sulla stessa linea: è una linea, senza alette.
    expect(recognize(hand([P(0, 100), P(300, 100), P(285, 100)], 1, 15))?.kind).not.toBe('arrow')
  })

  it('una spezzata tenendo premuto; con le forme automatiche no (Z, L e V sono lettere)', () => {
    const l = hand([P(0, 0), P(2, 150), P(120, 152)], 1.2, 11)
    const s = recognize(l)
    expect(s?.kind).toBe('polyline')
    const v = vertices(s)
    expect(v).toHaveLength(3)
    // I lati quasi verticale e quasi orizzontale diventano esatti.
    expect(v[0].x).toBeCloseTo(v[1].x, 6)
    expect(v[1].y).toBeCloseTo(v[2].y, 6)
    expect(recognize(l, { strict: true })).toBeNull()
    expect(recognize(hand([P(0, 0), P(120, 0), P(0, 110), P(120, 110)], 1.2, 12), { strict: true })).toBeNull()
  })

  it('la scrittura e le curve non sono figure: una S, un arco, una spirale, una o piccola', () => {
    const s = Array.from({ length: 80 }, (_, i) => P(60 * Math.sin((i / 79) * 2 * Math.PI), i * 2.5))
    expect(recognize(s)).toBeNull()
    const arc = Array.from({ length: 60 }, (_, i) => P(100 * Math.cos((i / 59) * Math.PI), 100 * Math.sin((i / 59) * Math.PI)))
    expect(recognize(arc)).toBeNull()
    const spiral = Array.from({ length: 200 }, (_, i) => P((10 + i) * Math.cos(i / 10), (10 + i) * Math.sin(i / 10)))
    expect(recognize(spiral)).toBeNull()
    const o = ellipse(P(0, 0), 7, 8)
    expect(recognize(o)).toBeNull()
    // Una «a» grande, con il gambo dopo il giro: non è un cerchio (il giro torna all'inizio, ma il gambo va oltre).
    const a = [...ellipse(P(0, 0), 40, 45, 0, 1, 1, 13), ...Array.from({ length: 20 }, (_, i) => P(40 + i * 0.2, i * 3.5))]
    expect(recognize(a)).toBeNull()
    expect(recognize(a, { strict: true })).toBeNull()
    // Ingrandita (la stessa o, ma la lavagna è al 400%) resta piccola sullo schermo: niente.
    expect(recognize(ellipse(P(0, 0), 14, 16), { unit: 4 })).toBeNull()
    // Un cerchio grande con le forme automatiche sì.
    expect(recognize(ellipse(P(0, 0), 60, 60), { strict: true })?.kind).toBe('circle')
  })

  it('tenendo giù la penna dopo la figura, la si regola: la linea segue la penna, il cerchio si ingrandisce', () => {
    const line: Shape = { kind: 'line', a: P(0, 0), b: P(100, 0) }
    const moved = adjustShape(line, P(100, 0), P(150, 3))
    expect(moved.kind).toBe('line')
    if (moved.kind === 'line') {
      expect(moved.b.x).toBeCloseTo(150, 0)
      expect(moved.b.y).toBeCloseTo(0, 6)
    }
    const circle: Shape = { kind: 'circle', c: P(0, 0), rx: 50, ry: 50, angle: 0 }
    const bigger = adjustShape(circle, P(50, 0), P(0, 100))
    if (bigger.kind !== 'circle') throw new Error('non è un cerchio')
    expect(bigger.rx).toBeCloseTo(100, 6)
    const square: Shape = { kind: 'square', points: [P(-50, -50), P(50, -50), P(50, 50), P(-50, 50)] }
    // Girato di poco torna diritto; girato tanto resta girato.
    const nudged = vertices(adjustShape(square, P(50, 50), P(48, 53)))
    expect(Math.abs(nudged[0].y - nudged[1].y)).toBeLessThan(1e-6)
    const turned = vertices(adjustShape(square, P(50, 50), P(0, 70.7)))
    expect(Math.abs(turned[0].y - turned[1].y)).toBeGreaterThan(10)
  })

  it('i punti da disegnare: le figure chiuse finiscono dove cominciano', () => {
    const sq = shapePoints({ kind: 'square', points: [P(0, 0), P(10, 0), P(10, 10), P(0, 10)] })
    expect(sq).toHaveLength(5)
    expect(sq[4]).toEqual(sq[0])
    const c = shapePoints({ kind: 'circle', c: P(0, 0), rx: 10, ry: 10, angle: 0 })
    expect(c[0]).toEqual(c[c.length - 1])
    expect(c.every((p) => Math.abs(Math.hypot(p.x, p.y) - 10) < 1e-9)).toBe(true)
  })
})
