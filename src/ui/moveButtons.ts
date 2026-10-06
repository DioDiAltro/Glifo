import type { BlockKind, MoveDir } from '../render/blockMove'

/**
 * Le frecce ↑ ↓ di schemi e grafici nell'anteprima, come quelle delle celle di Colab: le ultime in
 * alto a destra, dopo un separatore (così ↓ non si confonde con «Scarica»). Le gestisce l'anteprima
 * (src/ui/preview.ts); `move` è il `data-move` del blocco (vedi src/render/blockMove.ts). Quelle che
 * non portano da nessuna parte sono spente con aria-disabled, non disabled: così arrivati in cima il
 * fuoco resta sulla freccia.
 */

const PATHS: Record<MoveDir, string> = {
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  down: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
}

export function moveButtonsHtml(kind: BlockKind, move: string, inItem: boolean): string {
  const on = move.split(' ')
  const what = kind === 'grafico' ? 'il grafico' : 'lo schema'
  const button = (dir: MoveDir) => {
    const where = dir === 'up' ? 'su' : 'giù'
    const edge = `È già ${dir === 'up' ? 'in cima' : 'in fondo'} ${inItem ? 'alla voce dell\'elenco' : 'alla nota'}`
    const enabled = on.includes(dir)
    return (
      `<button type="button" class="icon-button block-move" data-dir="${dir}" title="${enabled ? `Sposta più ${where}` : edge}" ` +
      `aria-label="Sposta ${what} più ${where} nella nota"${enabled ? '' : ' aria-disabled="true"'}>` +
      `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[dir]}</svg></button>`
    )
  }
  return `<span class="block-move-sep" aria-hidden="true"></span><span class="block-move-group" role="group" aria-label="Posizione nella nota">${button('up')}${button('down')}</span>`
}
