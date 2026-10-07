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
import { labelPlain, labelSvg, texSvg } from './labels'
import { staticGraphSvg } from './picture'
import { parseGraph, type GraphItem, type GraphSpec } from './spec'
import type { ChartData } from '../spreadsheet/chart'
import { readChart } from './tableGraph'
import { areaColor, graphTitle, itemColors, PALETTES, escapeXml, type Palette } from './svg'

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
 * `chart`: i numeri della tabella sopra il grafico, per la riga `dati:`.
 */
export function graphImage(source: string, defs: readonly string[] = [], chart: ChartData | null = null): string {
  const spec = parseGraph(source, defs, undefined, chart)
  const width = 640
  const height = 400
  const palette = { ...PALETTES.light, surface: '#ffffff', halo: '#ffffff' }
  const plot = staticGraphSvg(spec, width, height, palette, { id: 'grafico' }, 'file')
  const colors = itemColors(spec.items, palette)
  const rows = spec.items
    .map((item, i) => ({ item, color: colors[i] }))
    .filter(({ item }) => ((item.kind !== 'point' && item.kind !== 'point3') || item.name) && item.label !== '')
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
          item.kind === 'point' || item.kind === 'point3' || item.kind === 'points' || item.kind === 'mark' || (item.kind === 'complex' && !item.arrows)
            ? `<span style="width:9px;height:9px;border-radius:50%;background:${color}"></span>`
            : item.kind === 'area' || item.kind === 'bars' || item.kind === 'gap'
              ? `<span style="width:18px;height:12px;box-sizing:border-box;border-top:3px solid ${color};border-radius:2px 2px 0 0;background:${areaColor(color, palette)}"></span>`
              : item.kind === 'region' || item.kind === 'polygon'
                ? `<span style="width:14px;height:14px;box-sizing:border-box;border:2px solid ${color};border-radius:3px;background:${areaColor(color, palette)}"></span>`
                : item.kind === 'surface' || item.kind === 'implicit3' || item.kind === 'patch' || item.kind === 'solid'
                ? `<span style="width:14px;height:14px;border-radius:3px;background:${color}"></span>`
                : item.kind === 'field' || item.kind === 'field3' || item.kind === 'vector' || (item.kind === 'complex' && item.arrows)
                  ? `<svg width="20" height="10" viewBox="0 0 20 10"><path d="M1 5H13" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/><path d="M19 5L12 1.5V8.5Z" fill="${color}"/></svg>`
                  : `<span style="width:18px;height:3px;border-radius:2px;background:${color}"></span>`
        const coords = item.kind === 'mark' ? `<span style="font:14px system-ui, sans-serif;color:#52514e">${escapeXml(item.coords)}</span>` : ''
        return `<div style="display:flex;align-items:center;gap:8px;height:28px">${swatch}${renderTexMathml(item.label)}${coords}</div>`
      })
      .concat(numbers.length ? [`<div style="display:flex;align-items:center;height:28px">${renderTexMathml(numbers.join(', \\quad '))}</div>`] : [])
      .join('')
    legend = `<foreignObject x="0" y="${height + 6}" width="${width}" height="${legendHeight - 6}">${new XMLSerializer().serializeToString(div)}</foreignObject>`
  }
  const title = titleBand(spec, width)
  const total = title.height + height + legendHeight
  const body = title.height ? `<g transform="translate(0 ${title.height})">${plot}${legend}</g>` : `${plot}${legend}`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${total}" width="${width}" height="${total}" role="img" aria-label="${escapeXml(figureName(spec))}"><rect width="${width}" height="${total}" fill="#ffffff"/>${title.svg}${body}</svg>`
}

/** Il nome della figura, da leggere: il titolo scelto da chi scrive, se c'è. */
function figureName(spec: GraphSpec): string {
  return spec.title ? labelPlain(spec.title) : graphTitle(spec)
}

/** Il titolo sopra il grafico (`titolo: …` nel blocco), in testo SVG, e quanto spazio prende. */
function titleBand(spec: GraphSpec, width: number): { svg: string; height: number } {
  if (!spec.title) return { svg: '', height: 0 }
  const { svg } = labelSvg(spec.title, 17)
  return {
    svg: `<text x="${width / 2}" y="26" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="600" fill="#1c2030">${svg}</text>`,
    height: 40,
  }
}

/** Il quadratino della legenda in SVG, largo 20 e alto 14, con l'angolo in alto a sinistra in (x, y). */
function swatchSvg(item: GraphItem, color: string, palette: Palette, x: number, y: number): string {
  const kind = item.kind
  if (item.dashed) return `<path d="M${x} ${y + 7}H${x + 20}" stroke="${color}" stroke-width="2.5" stroke-dasharray="5 3"/>`
  if (kind === 'point' || kind === 'point3' || kind === 'points' || kind === 'mark' || (kind === 'complex' && !item.arrows)) return `<circle cx="${x + 10}" cy="${y + 7}" r="4.5" fill="${color}"/>`
  if (kind === 'area' || kind === 'bars' || kind === 'gap') return `<rect x="${x + 1}" y="${y + 1}" width="18" height="12" fill="${areaColor(color, palette)}"/><path d="M${x + 1} ${y + 2.5}H${x + 19}" stroke="${color}" stroke-width="3"/>`
  if (kind === 'region' || kind === 'polygon') return `<rect x="${x + 4}" y="${y + 1}" width="12" height="12" rx="2" fill="${areaColor(color, palette)}" stroke="${color}" stroke-width="2"/>`
  if (kind === 'surface' || kind === 'implicit3' || kind === 'patch' || kind === 'solid') return `<rect x="${x + 3}" y="${y}" width="14" height="14" rx="3" fill="${color}"/>`
  if (kind === 'field' || kind === 'field3' || kind === 'vector' || (kind === 'complex' && item.arrows)) return `<path d="M${x + 1} ${y + 7}H${x + 13}" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/><path d="M${x + 19} ${y + 7}L${x + 12} ${y + 3.5}V${y + 10.5}Z" fill="${color}"/>`
  return `<rect x="${x + 1}" y="${y + 5.5}" width="18" height="3" rx="1.5" fill="${color}"/>`
}

/**
 * Il grafico come figura da usare fuori da Glifo (PNG, SVG, copiata in Word o nelle slide), chiara su
 * bianco: il titolo sopra (se c'è), il disegno `plot` (largo `width`, alto `height`, fatto con
 * `FIGURE_PALETTE`), la legenda e i valori degli slider sotto. Tutto in testo SVG: MathML e KaTeX
 * fuori dal browser non si vedono.
 */
export function graphFigure(spec: GraphSpec, plot: string, width: number, height: number): string {
  const palette = FIGURE_PALETTE
  const colors = itemColors(spec.items, palette)
  const rows: string[] = []
  const rowHeight = 26
  const size = 15
  const font = `font-family="'KaTeX_Main', 'Times New Roman', serif" font-size="${size}" fill="#1c2030"`
  spec.items.forEach((item, i) => {
    if (((item.kind === 'point' || item.kind === 'point3') && !item.name) || item.label === '') return
    const text = texSvg(item.label, size)
    // Il punto di pareggio con le sue coordinate, scritte come nella tabella.
    const coords = item.kind === 'mark' ? ` ${item.coords}` : ''
    const coordsWidth = 7.2 * coords.length
    const x = Math.max(8, (width - (28 + text.width + coordsWidth)) / 2)
    const y = rows.length * rowHeight
    const extra = coords ? `<text x="${(x + 28 + text.width).toFixed(1)}" y="${y + 18}" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13.5" fill="#52514e">${escapeXml(coords)}</text>` : ''
    rows.push(`${swatchSvg(item, colors[i], palette, x, y + 6)}<text x="${(x + 28).toFixed(1)}" y="${y + 18}" ${font}>${text.svg}</text>${extra}`)
  })
  if (spec.sliders.length) {
    const numbers = spec.sliders.map((s) => `${nameLatex(s.name)} = ${formatNumber(s.value, { comma: true, decimal: true, digits: 6 })?.tex ?? s.value}`).join(', \quad ')
    const text = texSvg(numbers, size)
    rows.push(`<text x="${width / 2}" y="${rows.length * rowHeight + 18}" text-anchor="middle" ${font}>${text.svg}</text>`)
  }
  const title = titleBand(spec, width)
  const legendTop = title.height + height + 10
  const legendHeight = rows.length ? rows.length * rowHeight + 14 : 4
  const total = legendTop + legendHeight
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${total}" width="${width}" height="${total}" role="img" aria-label="${escapeXml(figureName(spec))}">`,
    `<rect width="${width}" height="${total}" fill="#ffffff"/>`,
    title.svg,
    `<g transform="translate(0 ${title.height})">${plot}</g>`,
    rows.length ? `<g transform="translate(0 ${legendTop})">${rows.join('')}</g>` : '',
    '</svg>',
  ].join('')
}

/** I colori delle figure che escono da Glifo: quelli del tema chiaro, su bianco. */
export const FIGURE_PALETTE: Palette = { ...PALETTES.light, surface: '#ffffff', halo: '#ffffff' }

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
    images.set(Number(el.dataset.line), graphImage(el.dataset.graph ?? '', defs, readChart(el)))
  }
  return images
}
