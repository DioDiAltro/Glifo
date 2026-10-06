/**
 * Le tabelle nei file .md. Nella nota una tabella è un blocco ```tabella con le formule, che fuori
 * da Glifo (VS Code, GitHub, Obsidian…) si vedrebbe come codice. Nel file salvato diventa una
 * tabella di Markdown con i risultati, che tutti sanno mostrare, seguita dal blocco in un commento
 * HTML, che non si vede; aprendo il file con Glifo il blocco torna com'era:
 *
 *     | Prodotto | Prezzo |
 *     | --- | ---: |
 *     | Penne | 1,50 € |
 *
 *     <!-- glifo-tabella · …
 *     | Prodotto | Prezzo |
 *     …
 *     -->
 */
import { findFencedBlocks } from '../schema/blocks'
import { sheetMarkdown } from './render'

const MARKER = 'glifo-tabella'
const HINT = 'per modificare la tabella con le formule apri questo file con Glifo'
/** Una riga che apre o chiude un blocco di codice (come in src/schema/blocks.ts). */
const FENCE = /^\s*(`{3,}|~{3,})(.*)$/
const OPEN = new RegExp(`^([ \\t]*)<!-- ${MARKER}\\b`)
const CLOSE = /^[ \t]*-->[ \t]*$/

/** Il testo dentro un commento HTML, che finisce al primo `-->`: & e > diventano &amp; e &gt;. */
function hide(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/>/g, '&gt;')
}

function unhide(text: string): string {
  return text.replace(/&gt;/g, '>').replace(/&amp;/g, '&')
}

/** Il testo da scrivere nel file: ogni tabella chiusa diventa la tabella dei risultati più il blocco nascosto. */
export function sheetsForFile(text: string): string {
  let out = ''
  let pos = 0
  for (const block of findFencedBlocks(text, 'tabella')) {
    if (!block.closed) continue
    const indent = /^[ \t]*/.exec(text.slice(block.from))![0]
    const table = sheetMarkdown(block.source)
    const lines = table ? [...table.split('\n').map((l) => indent + l), ''] : []
    lines.push(`${indent}<!-- ${MARKER} · ${HINT}`, hide(block.source), `${indent}-->`)
    out += text.slice(pos, block.from) + lines.join('\n')
    pos = block.to
  }
  return out + text.slice(pos)
}

/** Il testo letto da un file: le tabelle dei risultati con il loro blocco nascosto tornano blocchi ```tabella. */
export function sheetsFromFile(text: string): string {
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
    // La tabella dei risultati subito prima (anche dopo una riga vuota) era solo per gli altri programmi.
    let last = out.length - 1
    while (last >= 0 && !out[last].trim()) last--
    let first = last
    while (first >= 0 && out[first].trim().startsWith('|')) first--
    if (last - first >= 2) out.length = first + 1
    const indent = open[1]
    const source = unhide(lines.slice(i + 1, end).join('\n'))
    out.push(`${indent}\`\`\`tabella`, ...(source ? [source] : []), `${indent}\`\`\``)
    i = end
  }
  return out.join('\n')
}
