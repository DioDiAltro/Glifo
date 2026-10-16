// I pezzi del lettore della lavagna (pix2text-mfr) che non dipendono da onnxruntime: dai token al
// testo e il giro che sceglie ogni volta il token più probabile. Come `Reader` di
// scripts/prova-lettori.py; stanno qui per provarli senza il modello.

/** Il primo token del decodificatore (<s>) e quello che chiude (</s>). */
export const START = 1
export const END = 2

/** Quanti token al massimo: le formule della prova ne avevano meno di 100. */
export const MAX_TOKENS = 256

/** La tabella dei byte di GPT-2: il tokenizer del modello è un BPE «ByteLevel», ogni byte un carattere. */
export function byteTable(): Map<string, number> {
  const bytes: number[] = []
  for (let c = 0x21; c <= 0x7e; c++) bytes.push(c)
  for (let c = 0xa1; c <= 0xac; c++) bytes.push(c)
  for (let c = 0xae; c <= 0xff; c++) bytes.push(c)
  const chars = [...bytes]
  let extra = 0
  for (let b = 0; b < 256; b++) {
    if (bytes.includes(b)) continue
    bytes.push(b)
    chars.push(256 + extra++)
  }
  return new Map(bytes.map((b, i) => [String.fromCharCode(chars[i]), b]))
}

export interface Vocabulary {
  /** Il testo di ogni token, all'indice del suo numero. */
  tokens: string[]
  /** I token speciali (<pad>, <s>, </s>, <unk>, <mask>): non diventano testo. */
  special: Set<number>
}

/** Il vocabolario dal tokenizer.json del modello. */
export function vocabularyFrom(json: { model: { vocab: Record<string, number> }; added_tokens?: { id: number }[] }): Vocabulary {
  const tokens: string[] = []
  for (const [text, id] of Object.entries(json.model.vocab)) tokens[id] = text
  return { tokens, special: new Set((json.added_tokens ?? []).map((t) => t.id)) }
}

/** Il testo dei token scelti: i caratteri dei token tornano byte, i byte UTF-8. */
export function textOf(ids: number[], vocabulary: Vocabulary, bytes = byteTable()): string {
  const chars = ids.filter((id) => !vocabulary.special.has(id)).map((id) => vocabulary.tokens[id] ?? '').join('')
  return new TextDecoder().decode(Uint8Array.from([...chars], (c) => bytes.get(c) ?? 0x3f)).trim()
}

/** Il token più probabile dopo l'ultimo: l'indice del valore più grande nell'ultima riga dei logit. */
export function lastArgmax(logits: ArrayLike<number>, size: number): number {
  const start = logits.length - size
  let best = 0
  for (let i = 1; i < size; i++) if (logits[start + i] > logits[start + best]) best = i
  return best
}

/** Il giro: da <s>, ogni volta il token più probabile, fino a </s> o a `max` token. */
export async function greedy(next: (ids: number[]) => Promise<number>, max = MAX_TOKENS): Promise<number[]> {
  const ids = [START]
  while (ids.length <= max) {
    const id = await next(ids)
    if (id === END) break
    ids.push(id)
  }
  return ids.slice(1)
}
