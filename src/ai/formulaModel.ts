/**
 * Il lettore delle formule della lavagna (AI.md, punto 2): pix2text-mfr 1.5 di BreezeDeus (licenza MIT), un
 * TrOCR che dall'immagine di una formula scrive il suo LaTeX. Gira nel browser, sul processore, con
 * onnxruntime-web (src/ai/formulaWorker.ts); la pagina gli parla da src/ai/formulaReader.ts con i messaggi
 * di qui. La prova del 15 ottobre 2026 (scripts/prova-lettori.py) ha usato gli stessi file.
 */

/** Il modello su Hugging Face, a una revisione fissa: i file non cambiano senza che Glifo lo sappia. */
export const READER_MODEL = 'breezedeus/pix2text-mfr-1.5'
export const READER_REVISION = '1cef9f0bdcd6a4c63df7de1311fb0894593340cc'

/** I file del modello e quanto pesano (byte), per l'avanzamento: prima i piccoli. */
export const READER_FILES = [
  { name: 'tokenizer.json', bytes: 113_168 },
  { name: 'decoder_model.onnx', bytes: 32_026_253 },
  { name: 'encoder_model.onnx', bytes: 87_510_770 },
] as const

/** Quanto pesa la libreria di onnxruntime-web che fa i conti (WebAssembly, dal sito di Glifo). */
export const ENGINE_BYTES = 14_239_897

/** Quanto si scarica la prima volta, in byte (circa 134 MB). */
export const READER_DOWNLOAD = READER_FILES.reduce((n, f) => n + f.bytes, 0) + ENGINE_BYTES

/** Dove il browser tiene i file del lettore (Cache Storage): dopo la prima volta funziona anche offline. */
export const READER_CACHE = 'glifo-lettore'

/** L'indirizzo di un file del modello. */
export function readerFileUrl(name: string): string {
  return `https://huggingface.co/${READER_MODEL}/resolve/${READER_REVISION}/${name}`
}

/** L'immagine che il modello legge: 384 × 384, a colori, con i valori da −1 a 1 (canale per canale). */
export const IMAGE_SIZE = 384

/** I messaggi dalla pagina al worker: `engine` è l'indirizzo della libreria WebAssembly. */
export type ToReader = { type: 'load'; id: number; engine: string } | { type: 'read'; id: number; pixels: Float32Array }

/** I messaggi dal worker alla pagina. */
export type FromReader =
  | { id: number; type: 'progress'; loaded: number; total: number }
  | { id: number; type: 'done'; text?: string; ms?: number }
  | { id: number; type: 'error'; code: ReaderErrorCode; detail: string }

/** Gli errori del worker sono codici: i testi, nella lingua di Glifo, li scrive la pagina. */
export type ReaderErrorCode = 'offline' | 'no-space' | 'not-ready' | 'failed'
