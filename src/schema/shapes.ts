/**
 * Le forme che maxGraph non ha già (draw.io le disegna con codice suo): parallelogramma,
 * documento, nota con l'angolo piegato e frecce grandi. Cilindro, esagono, triangolo e nuvola
 * invece ci sono. Ogni forma si disegna nel suo riquadro largo `w` e alto `h`; se è girata,
 * maxGraph scambia `w` e `h` e ruota il disegno.
 */
import { ActorShape, ShapeRegistry, type AbstractCanvas2D } from '@maxgraph/core'

/** Il nome di ogni forma per lo stile `shape` di maxGraph. */
export const SHAPE_STYLES = {
  parallelogram: 'glifoParallelogram',
  document: 'glifoDocument',
  note: 'glifoNote',
  arrow: 'glifoArrow',
  doubleArrow: 'glifoDoubleArrow',
} as const

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
}
