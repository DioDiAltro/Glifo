/**
 * Le forme che maxGraph non ha già (draw.io le disegna con codice suo): parallelogramma,
 * documento, nota con l'angolo piegato, frecce grandi, le corsie dei processi e quelle delle basi
 * di dati (entità debole, relazione identificante, tabella, attributo a pallino). Cilindro, esagono, triangolo,
 * nuvola ed ellisse doppia invece ci sono. Ogni forma si disegna nel suo riquadro largo `w` e
 * alto `h`; se è girata, maxGraph scambia `w` e `h` e ruota il disegno.
 */
import { ActorShape, PerimeterRegistry, Point, ShapeRegistry, type AbstractCanvas2D, type PerimeterFunction } from '@maxgraph/core'
import { laneHeadFor, tableMetricsFor } from './model'

/** Il nome di ogni forma per lo stile `shape` di maxGraph. */
export const SHAPE_STYLES = {
  parallelogram: 'glifoParallelogram',
  document: 'glifoDocument',
  note: 'glifoNote',
  arrow: 'glifoArrow',
  doubleArrow: 'glifoDoubleArrow',
  weakEntity: 'glifoWeakEntity',
  identifyingRelation: 'glifoIdentifyingRelation',
  table: 'glifoTable',
  dot: 'glifoDot',
  lanes: 'glifoLanes',
} as const

/** Nello stile delle corsie: quante sono e se sono in righe (i nomi a sinistra) invece che in colonne. */
export interface LanesStyle {
  glifoLanes?: number
  glifoRows?: boolean
}

/** Il perimetro degli attributi «a pallino»: le frecce arrivano al pallino, non al nome. */
export const DOT_PERIMETER = 'glifoDotPerimeter'

class ParallelogramShape extends ActorShape {
  override redrawPath(c: AbstractCanvas2D, _x: number, _y: number, w: number, h: number): void {
    const dx = Math.min(w * 0.2, h * 0.5)
    c.moveTo(dx, 0)
    c.lineTo(w, 0)
    c.lineTo(w - dx, h)
    c.lineTo(0, h)
    c.close()
  }
}

/** Un foglio con il bordo di sotto ondulato, come nei diagrammi di flusso. */
class DocumentShape extends ActorShape {
  override redrawPath(c: AbstractCanvas2D, _x: number, _y: number, w: number, h: number): void {
    const dy = Math.min(h * 0.25, 16)
    c.moveTo(0, 0)
    c.lineTo(w, 0)
    c.lineTo(w, h - dy / 2)
    c.quadTo((w * 3) / 4, h - dy * 1.4, w / 2, h - dy / 2)
    c.quadTo(w / 4, h + dy * 0.4, 0, h - dy / 2)
    c.close()
  }
}

/** Un foglietto con l'angolo in alto a destra piegato. */
class NoteShape extends ActorShape {
  private fold(w: number, h: number): number {
    return Math.min(18, w * 0.25, h * 0.25)
  }

  override redrawPath(c: AbstractCanvas2D, _x: number, _y: number, w: number, h: number): void {
    const s = this.fold(w, h)
    c.moveTo(0, 0)
    c.lineTo(w - s, 0)
    c.lineTo(w, s)
    c.lineTo(w, h)
    c.lineTo(0, h)
    c.close()
  }

  override paintVertexShape(c: AbstractCanvas2D, x: number, y: number, w: number, h: number): void {
    super.paintVertexShape(c, x, y, w, h)
    // La piega, sopra il foglietto già disegnato (le coordinate partono già dal suo angolo).
    const s = this.fold(w, h)
    c.begin()
    c.moveTo(w - s, 0)
    c.lineTo(w - s, s)
    c.lineTo(w, s)
    c.stroke()
  }
}

/** Una freccia piena verso destra: il testo sta sul gambo. */
class ArrowShape extends ActorShape {
  override redrawPath(c: AbstractCanvas2D, _x: number, _y: number, w: number, h: number): void {
    const head = Math.min(w * 0.4, h * 0.9)
    const t = h * 0.22
    c.moveTo(0, t)
    c.lineTo(w - head, t)
    c.lineTo(w - head, 0)
    c.lineTo(w, h / 2)
    c.lineTo(w - head, h)
    c.lineTo(w - head, h - t)
    c.lineTo(0, h - t)
    c.close()
  }
}

/** Una freccia piena con le punte alle due estremità. */
class DoubleArrowShape extends ActorShape {
  override redrawPath(c: AbstractCanvas2D, _x: number, _y: number, w: number, h: number): void {
    const head = Math.min(w * 0.3, h * 0.9)
    const t = h * 0.22
    c.moveTo(0, h / 2)
    c.lineTo(head, 0)
    c.lineTo(head, t)
    c.lineTo(w - head, t)
    c.lineTo(w - head, 0)
    c.lineTo(w, h / 2)
    c.lineTo(w - head, h)
    c.lineTo(w - head, h - t)
    c.lineTo(head, h - t)
    c.lineTo(head, h)
    c.close()
  }
}

/** Il rettangolo doppio dell'entità debole. */
class WeakEntityShape extends ActorShape {
  override redrawPath(c: AbstractCanvas2D, _x: number, _y: number, w: number, h: number): void {
    c.moveTo(0, 0)
    c.lineTo(w, 0)
    c.lineTo(w, h)
    c.lineTo(0, h)
    c.close()
  }

  override paintVertexShape(c: AbstractCanvas2D, x: number, y: number, w: number, h: number): void {
    super.paintVertexShape(c, x, y, w, h)
    const d = Math.min(5, w / 4, h / 4)
    c.begin()
    c.moveTo(d, d)
    c.lineTo(w - d, d)
    c.lineTo(w - d, h - d)
    c.lineTo(d, h - d)
    c.close()
    c.stroke()
  }
}

/** Il rombo doppio della relazione identificante. */
class IdentifyingRelationShape extends ActorShape {
  override redrawPath(c: AbstractCanvas2D, _x: number, _y: number, w: number, h: number): void {
    c.moveTo(w / 2, 0)
    c.lineTo(w, h / 2)
    c.lineTo(w / 2, h)
    c.lineTo(0, h / 2)
    c.close()
  }

  override paintVertexShape(c: AbstractCanvas2D, x: number, y: number, w: number, h: number): void {
    super.paintVertexShape(c, x, y, w, h)
    // Il rombo dentro, alla stessa distanza da ogni lato: gli angoli si spostano di più.
    const t = Math.min(5, w / 6, h / 6)
    const diagonal = Math.hypot(w, h)
    const dx = (t * diagonal) / h
    const dy = (t * diagonal) / w
    c.begin()
    c.moveTo(w / 2, dy)
    c.lineTo(w - dx, h / 2)
    c.lineTo(w / 2, h - dy)
    c.lineTo(dx, h / 2)
    c.close()
    c.stroke()
  }
}

/** La tabella: un riquadro con una fascia in alto, appena colorata, per il nome. */
class TableShape extends ActorShape {
  override redrawPath(c: AbstractCanvas2D, _x: number, _y: number, w: number, h: number): void {
    c.moveTo(0, 0)
    c.lineTo(w, 0)
    c.lineTo(w, h)
    c.lineTo(0, h)
    c.close()
  }

  override paintVertexShape(c: AbstractCanvas2D, x: number, y: number, w: number, h: number): void {
    super.paintVertexShape(c, x, y, w, h)
    const head = Math.min(h, tableMetricsFor(this.style?.fontSize ?? 14).head)
    c.save()
    c.setFillColor(this.stroke ?? null)
    c.setFillAlpha(0.12)
    c.rect(0, 0, w, head)
    c.fill()
    c.restore()
    c.begin()
    c.moveTo(0, head)
    c.lineTo(w, head)
    c.stroke()
  }
}

/**
 * Le corsie: il riquadro, la fascia dei nomi appena colorata (in alto, o a sinistra se sono in
 * righe) e le linee tra una corsia e l'altra. I nomi li mette lanesHtml (label.ts).
 */
class LanesShape extends ActorShape {
  override redrawPath(c: AbstractCanvas2D, _x: number, _y: number, w: number, h: number): void {
    c.moveTo(0, 0)
    c.lineTo(w, 0)
    c.lineTo(w, h)
    c.lineTo(0, h)
    c.close()
  }

  override paintVertexShape(c: AbstractCanvas2D, x: number, y: number, w: number, h: number): void {
    super.paintVertexShape(c, x, y, w, h)
    const style = (this.style ?? {}) as LanesStyle & { fontSize?: number }
    const count = Math.max(1, style.glifoLanes ?? 1)
    const rows = !!style.glifoRows
    const head = Math.min(rows ? w : h, laneHeadFor(style.fontSize ?? 14))
    c.save()
    c.setFillColor(this.stroke ?? null)
    c.setFillAlpha(0.12)
    if (rows) c.rect(0, 0, head, h)
    else c.rect(0, 0, w, head)
    c.fill()
    c.restore()
    c.begin()
    if (rows) {
      c.moveTo(head, 0)
      c.lineTo(head, h)
      for (let i = 1; i < count; i++) {
        c.moveTo(0, (h * i) / count)
        c.lineTo(w, (h * i) / count)
      }
    } else {
      c.moveTo(0, head)
      c.lineTo(w, head)
      for (let i = 1; i < count; i++) {
        c.moveTo((w * i) / count, 0)
        c.lineTo((w * i) / count, h)
      }
    }
    c.stroke()
  }
}

/** Il raggio del pallino in un riquadro alto `h`. */
function dotRadius(h: number): number {
  return Math.max(3, Math.min(6, h / 2 - 1))
}

/** L'attributo «a pallino» (Atzeni): il pallino a sinistra e il nome accanto; girato, a destra. */
class DotShape extends ActorShape {
  override redrawPath(c: AbstractCanvas2D, _x: number, _y: number, _w: number, h: number): void {
    const r = dotRadius(h)
    c.ellipse(1, h / 2 - r, 2 * r, 2 * r)
  }

  override paintVertexShape(c: AbstractCanvas2D, x: number, y: number, w: number, h: number): void {
    c.translate(x, y)
    // Tutto il riquadro risponde al clic, anche il nome, ma si vede solo il pallino.
    c.save()
    c.setFillAlpha(0)
    c.setStrokeAlpha(0)
    c.rect(0, 0, w, h)
    c.fillAndStroke()
    c.restore()
    this.redrawPath(c, x, y, w, h)
    c.fillAndStroke()
  }
}

/** Dove una freccia tocca il pallino: sul suo cerchio, dalla parte da cui arriva. */
const dotPerimeter: PerimeterFunction = (bounds, vertex, next) => {
  const scale = vertex?.view?.scale ?? 1
  const r = dotRadius(bounds.height / scale) * scale
  const west = vertex?.style?.direction === 'west'
  const cx = west ? bounds.x + bounds.width - scale - r : bounds.x + scale + r
  const cy = bounds.y + bounds.height / 2
  const dx = next.x - cx
  const dy = next.y - cy
  const d = Math.hypot(dx, dy) || 1
  return new Point(cx + (dx / d) * r, cy + (dy / d) * r)
}

let registered = false

/** Fa conoscere a maxGraph le forme di Glifo (una volta sola, valgono per tutti i fogli). */
export function registerShapes(): void {
  if (registered) return
  registered = true
  ShapeRegistry.add(SHAPE_STYLES.parallelogram, ParallelogramShape)
  ShapeRegistry.add(SHAPE_STYLES.document, DocumentShape)
  ShapeRegistry.add(SHAPE_STYLES.note, NoteShape)
  ShapeRegistry.add(SHAPE_STYLES.arrow, ArrowShape)
  ShapeRegistry.add(SHAPE_STYLES.doubleArrow, DoubleArrowShape)
  ShapeRegistry.add(SHAPE_STYLES.weakEntity, WeakEntityShape)
  ShapeRegistry.add(SHAPE_STYLES.identifyingRelation, IdentifyingRelationShape)
  ShapeRegistry.add(SHAPE_STYLES.table, TableShape)
  ShapeRegistry.add(SHAPE_STYLES.dot, DotShape)
  ShapeRegistry.add(SHAPE_STYLES.lanes, LanesShape)
  PerimeterRegistry.add(DOT_PERIMETER, dotPerimeter)
}
