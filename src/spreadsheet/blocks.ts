/** I blocchi ```tabella nel testo di una nota: ritrovarli per aprirli nell'editor. */
import { contentHash, fenceName } from '../render/blockMove'
import { parseBlocks } from '../render/markdown'
import { findFencedBlocks, type SchemaBlock } from '../schema/blocks'

/**
 * Il blocco ```tabella che comincia alla riga `line` (da 0) e ha quel testo (`source`, dalla riga
 * con «Modifica» nel testo) o quell'impronta (`hash`, dall'anteprima: vedi `contentHash`). Se
 * intanto il testo prima è cambiato, quello uguale più vicino a `line`.
 */
export function findSheetBlock(text: string, line: number, match: { source?: string; hash?: string } = {}): SchemaBlock | null {
  const blocks = findFencedBlocks(text, 'tabella').filter((b) => b.closed)
  let same: (b: SchemaBlock) => boolean
  if (match.source !== undefined) {
    const source = match.source
    same = (b) => b.source === source
  } else if (match.hash !== undefined) {
    // L'impronta è quella del contenuto letto da markdown-it (senza i rientri della voce d'elenco).
    const lines = new Set<number>()
    for (const t of parseBlocks(text)) {
      if (t.type === 'fence' && t.map && fenceName(t) === 'tabella' && contentHash(t.content) === match.hash) lines.add(t.map[0])
    }
    same = (b) => lines.has(b.line)
  } else {
    return blocks.find((b) => b.line === line) ?? null
  }
  return blocks.filter(same).sort((a, b) => Math.abs(a.line - line) - Math.abs(b.line - line))[0] ?? null
}

/** Il blocco con questo testo più vicino alla posizione `near` (dopo il salvataggio, per rimetterci la tabella). */
export function findSheetBySource(text: string, source: string, near: number): SchemaBlock | null {
  let best: SchemaBlock | null = null
  for (const block of findFencedBlocks(text, 'tabella')) {
    if (block.source !== source || !block.closed) continue
    if (!best || Math.abs(block.from - near) < Math.abs(best.from - near)) best = block
  }
  return best
}
