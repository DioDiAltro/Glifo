/**
 * I grafici nei file .md. Come gli schemi (src/schema/file.ts): nel file salvato il blocco
 * ```grafico diventa un'immagine SVG, che VS Code, Obsidian e gli altri programmi mostrano, seguita
 * dal testo del blocco in un commento HTML, che non si vede; aprendo il file con Glifo il blocco
 * torna com'era:
 *
 *     ![Grafico](data:image/svg+xml;base64,…)
 *     <!-- glifo-grafico · per modificare il grafico apri questo file con Glifo
 *     y = x^2
 *     -->
 */
import { formatNumber } from '../math/format'
import { nameLatex } from '../math/latex'
import { renderTexMathml } from '../render/katex'
import { renderMarkdown } from '../render/markdown'
import { findFencedBlocks } from '../schema/blocks'
import { base64 } from '../schema/file'
import { chooseWindow } from './plot'
import { parseGraph } from './spec'
import { areaColor, graphSvg, graphTitle, itemColors, PALETTES, escapeXml } from './svg'

const MARKER = 'glifo-grafico'
const HINT = 'per modificare il grafico apri questo file con Glifo'
/** Una riga che apre o chiude un blocco di codice (come in src/schema/blocks.ts). */
const FENCE = /^\s*(`{3,}|~{3,})(.*)$/
const OPEN = new RegExp(`^([ \\t]*)<!-- ${MARKER}\\b`)
const CLOSE = /^[ \t]*-->[ \t]*$/
const IMAGE = /^[ \t]*!\[[^\]\n]*\]\(data:image\/svg\+xml;base64,[A-Za-z0-9+/=]*\)[ \t]*$/

/** Il commento HTML finisce al primo `-->`: nel testo del grafico diventa `--&gt;`. */
function hide(source: string): string {
  return source.replace(/--&gt;/g, '--&amp;gt;').replace(/-->/g, '--&gt;')
}

function unhide(source: string): string {
  return source.replace(/--&gt;/g, '-->').replace(/--&amp;gt;/g, '--&gt;')
}

/**
 * Il grafico come immagine SVG a sé, chiara su bianco, con la legenda sotto (le formule in
 * MathML, che i browser disegnano da soli) e i numeri degli slider con il valore scritto (a = 2).
 */
export function graphImage(source: string, defs: readonly string[] = []): string {
  const spec = parseGraph(source, defs)
  const width = 640
  const height = 400
  const palette = { ...PALETTES.light, surface: '#ffffff', halo: '#ffffff' }
  const plot = graphSvg(spec, chooseWindow(spec, width, height), palette, { id: 'grafico' })
  const colors = itemColors(spec.items, palette)
  const rows = spec.items
    .map((item, i) => ({ item, color: colors[i] }))
    .filter(({ item }) => item.kind !== 'point' || item.name)
  const numbers = spec.sliders.map((s) => `${nameLatex(s.name)} = ${formatNumber(s.value, { comma: true, decimal: true, digits: 6 })?.tex ?? s.value}`)
  const lines = rows.length + (numbers.length ? 1 : 0)
  const legendHeight = lines ? lines * 28 + 12 : 0
  let legend = ''
  if (lines) {
    const div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
    div.setAttribute('style', 'display:flex;flex-direction:column;align-items:center;font:16px serif;color:#1c2030')
    div.innerHTML = rows
      .map(({ item, color }) => {
        const swatch =
          item.kind === 'point'
            ? `<span style="width:9px;height:9px;border-radius:50%;background:${color}"></span>`
            : item.kind === 'area'
              ? `<span style="width:18px;height:12px;box-sizing:border-box;border-top:3px solid ${color};border-radius:2px 2px 0 0;background:${areaColor(color, palette)}"></span>`
              : `<span style="width:18px;height:3px;border-radius:2px;background:${color}"></span>`
        return `<div style="display:flex;align-items:center;gap:8px;height:28px">${swatch}${renderTexMathml(item.label)}</div>`
      })
      .concat(numbers.length ? [`<div style="display:flex;align-items:center;height:28px">${renderTexMathml(numbers.join(', \\quad '))}</div>`] : [])
      .join('')
    legend = `<foreignObject x="0" y="${height + 6}" width="${width}" height="${legendHeight - 6}">${new XMLSerializer().serializeToString(div)}</foreignObject>`
  }
  const total = height + legendHeight
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${total}" width="${width}" height="${total}" role="img" aria-label="${escapeXml(graphTitle(spec))}"><rect width="${width}" height="${total}" fill="#ffffff"/>${plot}${legend}</svg>`
}

/**
 * Il testo da scrivere nel file: ogni grafico diventa la sua immagine più il testo nascosto.
 * `images` dà l'immagine di ogni blocco, dalla riga (da 0) con ```grafico; i blocchi senza
 * immagine e quelli non chiusi restano come sono.
 */
export function graphsForFile(text: string, images: ReadonlyMap<number, string>): string {
  let out = ''
  let pos = 0
  for (const block of findFencedBlocks(text, 'grafico')) {
    const image = images.get(block.line)
    if (!block.closed || !image) continue
    const indent = /^[ \t]*/.exec(text.slice(block.from))![0]
    const lines = [`${indent}![Grafico](data:image/svg+xml;base64,${base64(image)})`, `${indent}<!-- ${MARKER} · ${HINT}`, hide(block.source), `${indent}-->`]
    out += text.slice(pos, block.from) + lines.join('\n')
    pos = block.to
  }
  return out + text.slice(pos)
}

/** Il testo letto da un file: le immagini dei grafici con il loro testo tornano blocchi ```grafico. */
export function graphsFromFile(text: string): string {
  const lines = text.split('\n')
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
    out.push(`${indent}\`\`\`grafico`, unhide(lines.slice(i + 1, end).join('\n')), `${indent}\`\`\``)
    i = end
  }
  return out.join('\n')
}

/** Le immagini dei grafici del testo, per la riga del blocco: con le definizioni della nota, come nell'anteprima. */
export function graphImagesFor(text: string): Map<number, string> {
  const host = document.createElement('div')
  host.innerHTML = renderMarkdown(text)
  const images = new Map<number, string>()
  for (const el of host.querySelectorAll<HTMLElement>('.graph-block')) {
    let defs: string[] = []
    try {
      const parsed = JSON.parse(el.dataset.defs || '[]')
      if (Array.isArray(parsed)) defs = parsed.filter((d): d is string => typeof d === 'string')
    } catch {
      // Senza definizioni: il grafico usa solo le sue righe.
    }
    images.set(Number(el.dataset.line), graphImage(el.dataset.graph ?? '', defs))
  }
  return images
}
