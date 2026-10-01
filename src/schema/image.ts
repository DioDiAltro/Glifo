/**
 * Lo schema come immagine PNG, da scaricare o da copiare (per Word, le slide, i messaggi).
 * Si parte dall'SVG di `schemaImage` (chiaro su bianco) e lo si disegna su un canvas, due
 * volte più fitto dello schermo, così resta nitido anche ingrandito.
 */
import { base64 } from './file'

/** Oltre tanti pixel i telefoni (Safari) non disegnano il canvas: gli schemi enormi vengono meno fitti. */
const MAX_PIXELS = 16_000_000

/** Larghezza e altezza scritte nell'elemento <svg>. */
function svgSize(svg: string): { width: number; height: number } {
  const root = /^<svg\b[^>]*>/.exec(svg)?.[0] ?? ''
  const width = Number(/\swidth="([\d.]+)"/.exec(root)?.[1] ?? 0)
  const height = Number(/\sheight="([\d.]+)"/.exec(root)?.[1] ?? 0)
  return { width, height }
}

let crcTable: Uint32Array | null = null

/** Il CRC-32 dei pezzi di un PNG. */
export function crc32(bytes: Uint8Array): number {
  if (!crcTable) {
    crcTable = new Uint32Array(256)
    for (let n = 0; n < 256; n++) {
      let c = n
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
      crcTable[n] = c >>> 0
    }
  }
  let crc = 0xffffffff
  for (const b of bytes) crc = crcTable[(crc ^ b) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

/**
 * Scrive nel PNG quanti pixel ha per pollice (il pezzo «pHYs»): con un'immagine due volte più
 * fitta, Word e gli altri programmi la mettono comunque alla misura dello schema.
 */
export function withDensity(png: Uint8Array<ArrayBuffer>, scale: number): Uint8Array<ArrayBuffer> {
  const type = (at: number) => String.fromCharCode(...png.subarray(at + 4, at + 8))
  // Dopo la firma (8 byte) c'è sempre IHDR: 4 di lunghezza, 4 di nome, 13 di dati, 4 di CRC.
  const afterHeader = 8 + 25
  for (let at = 8; at + 8 <= png.length; ) {
    const name = type(at)
    if (name === 'pHYs') return png
    if (name === 'IDAT' || name === 'IEND') break
    at += 12 + new DataView(png.buffer, png.byteOffset + at, 4).getUint32(0)
  }
  const perMeter = Math.round((96 * scale) / 0.0254)
  const chunk = new Uint8Array(21)
  const view = new DataView(chunk.buffer)
  view.setUint32(0, 9)
  chunk.set([0x70, 0x48, 0x59, 0x73], 4)
  view.setUint32(8, perMeter)
  view.setUint32(12, perMeter)
  chunk[16] = 1
  view.setUint32(17, crc32(chunk.subarray(4, 17)))
  const out = new Uint8Array(png.length + chunk.length)
  out.set(png.subarray(0, afterHeader))
  out.set(chunk, afterHeader)
  out.set(png.subarray(afterHeader), afterHeader + chunk.length)
  return out
}

/** L'SVG dello schema come PNG, `scale` volte più fitto (di solito 2). */
export async function svgToPng(svg: string, scale = 2): Promise<Blob> {
  const { width, height } = svgSize(svg)
  const k = Math.min(scale, Math.sqrt(MAX_PIXELS / Math.max(1, width * height)))
  const image = new Image()
  image.src = `data:image/svg+xml;base64,${base64(svg)}`
  await image.decode()
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(width * k))
  canvas.height = Math.max(1, Math.round(height * k))
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas non disponibile')
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
  if (!blob) throw new Error('PNG non riuscito')
  const png = withDensity(new Uint8Array(await blob.arrayBuffer()), k)
  return new Blob([png], { type: 'image/png' })
}
