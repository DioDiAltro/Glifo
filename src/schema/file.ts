/**
 * Gli schemi nei file .md. Nella nota uno schema è un blocco ```schema con il suo JSON, che fuori
 * da Glifo (VS Code, Obsidian…) si vedrebbe come codice. Nel file salvato diventa un'immagine,
 * che tutti sanno mostrare, seguita dal JSON in un commento HTML, che non si vede; aprendo il
 * file con Glifo il blocco torna com'era:
 *
 *     ![Schema](data:image/svg+xml;base64,…)
 *     <!-- glifo-schema · …
 *     {"v":1,"nodes":[…],"edges":[…]}
 *     -->
 */
import { findSchemaBlocks } from './blocks'
import { parseSchema, type Schema } from './model'

const MARKER = 'glifo-schema'
const HINT = 'per modificare lo schema apri questo file con Glifo'
/** Una riga che apre o chiude un blocco di codice (come in blocks.ts). */
const FENCE = /^\s*(`{3,}|~{3,})(.*)$/
const OPEN = new RegExp(`^([ \\t]*)<!-- ${MARKER}\\b`)
const CLOSE = /^[ \t]*-->[ \t]*$/
const IMAGE = /^[ \t]*!\[[^\]\n]*\]\(data:image\/svg\+xml;base64,[A-Za-z0-9+/=]*\)[ \t]*$/

/** Il testo in base64, passando per UTF-8 (btoa da solo accetta solo caratteri latini). */
export function base64(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  return btoa(binary)
}

/**
 * Il JSON dentro un commento HTML, che finisce al primo `-->`: `<` e `>` (che nel JSON stanno
 * solo nei testi) diventano `\u003c` e `\u003e`, che per il JSON sono la stessa cosa.
 */
function hide(json: string): string {
  return json.replace(/</g, '\\u003c').replace(/>/g, '\\u003e')
}

/**
 * Il contrario di `hide`. Le barre si leggono a coppie da sinistra, come fa il JSON: in `\\u003c`
 * la seconda barra è un carattere del testo, non l'inizio di `\u003c`.
 */
function unhide(json: string): string {
  return json.replace(/\\(\\|u003[cCeE])/g, (escape, what: string) => (what === '\\' ? escape : what.slice(-1).toLowerCase() === 'c' ? '<' : '>'))
}

/**
 * Il testo da scrivere nel file: ogni schema diventa la sua immagine (disegnata da `draw`, in
 * SVG) più il JSON nascosto. Restano come sono i blocchi non chiusi, quelli che non si leggono
 * e quelli che non si riesce a disegnare.
 */
export function schemasForFile(text: string, draw: (schema: Schema) => string): string {
  let out = ''
  let pos = 0
  for (const block of findSchemaBlocks(text)) {
    if (!block.closed) continue
    let image = ''
    try {
      const schema = parseSchema(block.source)
      if (schema.nodes.length) image = `data:image/svg+xml;base64,${base64(draw(schema))}`
    } catch {
      continue
    }
    const indent = /^[ \t]*/.exec(text.slice(block.from))![0]
    const lines = image ? [`${indent}![Schema](${image})`] : []
    lines.push(`${indent}<!-- ${MARKER} · ${HINT}`, hide(block.source), `${indent}-->`)
    out += text.slice(pos, block.from) + lines.join('\n')
    pos = block.to
  }
  return out + text.slice(pos)
}

/**
 * Il testo letto da un file: le immagini degli schemi con il loro JSON tornano blocchi ```schema.
 * Gli a capo di Windows (`\r\n`, se il file è passato da un programma che li usa) diventano `\n`.
 */
export function schemasFromFile(text: string): string {
  const lines = text.split(/\r?\n/)
  const out: string[] = []
  let fence: string | null = null
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const m = FENCE.exec(line)
    if (fence) {
      if (m && m[1][0] === fence[0] && m[1].length >= fence.length && !m[2].trim()) fence = null
      out.push(line)
      continue
    }
    if (m && !(m[1][0] === '`' && m[2].includes('`'))) {
      fence = m[1]
      out.push(line)
      continue
    }
    const open = OPEN.exec(line)
    let end = i + 1
    while (open && end < lines.length && !lines[end].includes('-->')) end++
    if (!open || line.includes('-->') || end >= lines.length || !CLOSE.test(lines[end])) {
      out.push(line)
      continue
    }
    // L'immagine subito prima (anche dopo qualche riga vuota) era solo per gli altri programmi.
    let image = out.length - 1
    while (image >= 0 && !out[image].trim()) image--
    if (image >= 0 && IMAGE.test(out[image])) out.length = image
    const indent = open[1]
    out.push(`${indent}\`\`\`schema`, unhide(lines.slice(i + 1, end).join('\n')), `${indent}\`\`\``)
    i = end
  }
  return out.join('\n')
}
