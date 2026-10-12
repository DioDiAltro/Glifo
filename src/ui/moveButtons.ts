import { texts } from '../i18n'
import type { BlockKind, MoveDir } from '../render/blockMove'

/**
 * Le frecce ↑ ↓ di schemi, grafici e tabelle nell'anteprima, come quelle delle celle di Colab: le ultime in
 * alto a destra, dopo un separatore (così ↓ non si confonde con «Scarica»). Le gestisce l'anteprima
 * (src/ui/preview.ts); `move` è il `data-move` del blocco (vedi src/render/blockMove.ts). Quelle che
 * non portano da nessuna parte sono spente con aria-disabled, non disabled: così arrivati in cima il
 * fuoco resta sulla freccia.
 */

/** Il testo per il tipo di blocco: grafico, schema o tabella. */
function byKind<T>(kind: BlockKind, graph: T, schema: T, table: T): T {
  return kind === 'grafico' ? graph : kind === 'schema' ? schema : table
}

// Le frasi sono intere in ogni lingua: in italiano articoli e accordi cambiano con il blocco.
const T = texts({
  the: (kind: BlockKind) => [byKind(kind, 'il grafico', 'lo schema', 'la tabella'), byKind(kind, 'the graph', 'the diagram', 'the table')],
  The: (kind: BlockKind) => [byKind(kind, 'Il grafico', 'Lo schema', 'La tabella'), byKind(kind, 'The graph', 'The diagram', 'The table')],
  name: (kind: BlockKind) => [byKind(kind, 'Grafico', 'Schema', 'Tabella'), byKind(kind, 'Graph', 'Diagram', 'Table')],
  moveLabel: (kind: BlockKind, dir: MoveDir) => [
    `Sposta ${byKind(kind, 'il grafico', 'lo schema', 'la tabella')} più ${dir === 'up' ? 'su' : 'giù'} nella nota`,
    `Move the ${byKind(kind, 'graph', 'diagram', 'table')} ${dir === 'up' ? 'up' : 'down'} in the note`,
  ],
  moveHint: (dir: MoveDir) => [dir === 'up' ? 'Sposta più su' : 'Sposta più giù', dir === 'up' ? 'Move up' : 'Move down'],
  atEdge: (dir: MoveDir, inItem: boolean) => [
    `È già ${dir === 'up' ? 'in cima' : 'in fondo'} ${inItem ? 'alla voce dell\'elenco' : 'alla nota'}`,
    `Already at the ${dir === 'up' ? 'top' : 'bottom'} of the ${inItem ? 'list item' : 'note'}`,
  ],
  position: ['Posizione nella nota', 'Position in the note'],
  moved: (kind: BlockKind, dir: MoveDir) => [
    `${byKind(kind, 'Grafico spostato', 'Schema spostato', 'Tabella spostata')} più ${dir === 'up' ? 'su' : 'giù'}`,
    `${byKind(kind, 'Graph', 'Diagram', 'Table')} moved ${dir === 'up' ? 'up' : 'down'}`,
  ],
  hidden: (kind: BlockKind) => [
    `${byKind(kind, 'Il grafico', 'Lo schema', 'La tabella')} lì non si vedrebbe: lo nasconde l'HTML scritto nella nota (per esempio un commento «<!--» senza la fine, o un <details> chiuso).`,
    `The ${byKind(kind, 'graph', 'diagram', 'table')} wouldn't be visible there: HTML written in the note hides it (for example a “<!--” comment with no end, or a closed <details>).`,
  ],
})

const PATHS: Record<MoveDir, string> = {
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  down: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
}

interface BlockNames {
  /** Con l'articolo, dentro una frase e a inizio frase («il grafico», «Il grafico»), e il nome da solo. */
  readonly the: string
  readonly The: string
  readonly name: string
  readonly className: string
}

/** I nomi nella lingua della pagina, letti quando servono. */
function blockNames(kind: BlockKind, className: string): BlockNames {
  return {
    get the() {
      return T.the(kind)
    },
    get The() {
      return T.The(kind)
    },
    get name() {
      return T.name(kind)
    },
    className,
  }
}

/** Come si chiamano i blocchi che si spostano, nei testi dell'interfaccia. */
export const BLOCK_NAMES: Record<BlockKind, BlockNames> = {
  grafico: blockNames('grafico', 'graph-block'),
  schema: blockNames('schema', 'schema-block'),
  tabella: blockNames('tabella', 'sheet-block'),
}

/** L'avviso quando il blocco spostato non si vedrebbe (e lo spostamento si annulla). */
export function blockHiddenMessage(kind: BlockKind): string {
  return T.hidden(kind)
}

/** Per chi usa un lettore di schermo: dove è andato il blocco. */
export function blockMovedMessage(kind: BlockKind, dir: MoveDir): string {
  return T.moved(kind, dir)
}

/** Il tipo del blocco dell'anteprima, dalla sua classe. */
export function blockKindOf(block: HTMLElement): BlockKind {
  return block.classList.contains('graph-block') ? 'grafico' : block.classList.contains('sheet-block') ? 'tabella' : 'schema'
}

/** I blocchi dell'anteprima che si spostano. */
export const MOVABLE_BLOCKS = '.graph-block, .schema-block, .sheet-block'

export function moveButtonsHtml(kind: BlockKind, move: string, inItem: boolean): string {
  const on = move.split(' ')
  const button = (dir: MoveDir) => {
    const enabled = on.includes(dir)
    return (
      `<button type="button" class="icon-button block-move" data-dir="${dir}" title="${enabled ? T.moveHint(dir) : T.atEdge(dir, inItem)}" ` +
      `aria-label="${T.moveLabel(kind, dir)}"${enabled ? '' : ' aria-disabled="true"'}>` +
      `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[dir]}</svg></button>`
    )
  }
  return `<span class="block-move-sep" aria-hidden="true"></span><span class="block-move-group" role="group" aria-label="${T.position}">${button('up')}${button('down')}</span>`
}
