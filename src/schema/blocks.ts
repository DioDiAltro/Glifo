/** I blocchi ```schema (e ```grafico) nel testo di una nota: dove sono e cosa contengono. */

export interface SchemaBlock {
  /** Dall'inizio della riga con ```schema alla fine della riga che lo chiude. */
  from: number
  to: number
  /** Il JSON tra le due righe. */
  contentFrom: number
  contentTo: number
  source: string
  /** La riga (da 0) dell'apertura, come `data-line` nell'anteprima. */
  line: number
  /** Senza la riga di chiusura il blocco arriva alla fine della nota. */
  closed: boolean
}

/** Una riga che apre o chiude un blocco di codice: ``` o ~~~, anche rientrata (negli elenchi). */
const FENCE = /^\s*(`{3,}|~{3,})(.*)$/

interface OpenFence {
  marker: string
  schema: boolean
  from: number
  contentFrom: number
  line: number
}

/** I blocchi ```schema del testo, in ordine. Quelli dentro altri blocchi di codice non contano. */
export function findSchemaBlocks(text: string): SchemaBlock[] {
  return findFencedBlocks(text, 'schema')
}

/** I blocchi di codice con questo nome (```schema, ```grafico), in ordine; quelli dentro altri blocchi non contano. */
export function findFencedBlocks(text: string, name: string): SchemaBlock[] {
  const blocks: SchemaBlock[] = []
  const add = (open: OpenFence, to: number, contentTo: number, closed: boolean) =>
    blocks.push({ from: open.from, to, contentFrom: open.contentFrom, contentTo, source: text.slice(open.contentFrom, contentTo), line: open.line, closed })
  let open: OpenFence | null = null
  let pos = 0
  for (let line = 0; ; line++) {
    const newline = text.indexOf('\n', pos)
    const end = newline < 0 ? text.length : newline
    const m = FENCE.exec(text.slice(pos, end))
    if (open) {
      // Chiude una riga con lo stesso segno, almeno altrettanto lungo, e nient'altro.
      if (m && m[1][0] === open.marker[0] && m[1].length >= open.marker.length && !m[2].trim()) {
        if (open.schema) add(open, end, Math.max(open.contentFrom, pos - 1), true)
        open = null
      }
    } else if (m && !(m[1][0] === '`' && m[2].includes('`'))) {
      const info = m[2].trim().split(/\s+/)[0].toLowerCase()
      open = { marker: m[1], schema: info === name, from: pos, contentFrom: Math.min(end + 1, text.length), line }
    }
    if (newline < 0) break
    pos = newline + 1
  }
  if (open?.schema) add(open, text.length, text.length, false)
  return blocks
}

/** Il blocco che comincia alla riga `line` (da 0). */
export function schemaBlockAtLine(text: string, line: number): SchemaBlock | null {
  return findSchemaBlocks(text).find((b) => b.line === line) ?? null
}

/**
 * Il blocco con questo contenuto più vicino alla posizione `near`: serve a ritrovarlo anche
 * se intanto il testo prima è cambiato (per esempio in un'altra scheda).
 */
export function findSchemaBlock(text: string, source: string, near: number): SchemaBlock | null {
  let best: SchemaBlock | null = null
  for (const block of findSchemaBlocks(text)) {
    if (block.source !== source || !block.closed) continue
    if (!best || Math.abs(block.from - near) < Math.abs(best.from - near)) best = block
  }
  return best
}

/** Il blocco da mettere nella nota. */
export function schemaBlockText(json: string): string {
  return '```schema\n' + json + '\n```'
}
