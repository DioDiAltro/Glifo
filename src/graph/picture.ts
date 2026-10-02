/**
 * Il disegno di un grafico così com'è scritto, senza spostarlo né girarlo: per il pannello a
 * destra e per le immagini dei file .md. Nel piano con la finestra scelta da Glifo, nello spazio con
 * la scatola scelta da Glifo vista da dove si guarda di solito.
 */
import { chooseWindow } from './plot'
import { chooseBox } from './space'
import type { GraphSpec } from './spec'
import { graphSvg, type DrawOptions, type Palette } from './svg'
import { buildScene, DEFAULT_CAMERA, sceneSvg, type Quality } from './view3d'

/** `quality`: per i file .md (`file`) i grafici 3D hanno meno quadretti, così le immagini restano leggere. */
export function staticGraphSvg(spec: GraphSpec, width: number, height: number, palette: Palette, options: DrawOptions, quality: Quality = 'fine'): string {
  if (spec.dim === 3) return sceneSvg(buildScene(spec, chooseBox(spec), quality), spec, DEFAULT_CAMERA, palette, { width, height, title: options.title })
  return graphSvg(spec, chooseWindow(spec, width, height), palette, options)
}
