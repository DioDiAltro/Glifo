import { describe, expect, it } from 'vitest'
import { byteTable, END, greedy, lastArgmax, START, textOf, vocabularyFrom } from '../src/ai/formulaTokens'

// Un pezzo del tokenizer.json di pix2text-mfr 1.5 con i token della lettura di e^{iπ} + 1 = 0
// (scripts/prova-lettori.py, 15 ottobre 2026): Ġ è lo spazio.
const TOKENIZER = {
  model: { vocab: { '<pad>': 0, '<s>': 1, '</s>': 2, e: 73, 'Ġ}': 261, 'Ġ{': 262, 'Ġ\\': 263, 'Ġ^': 265, 'Ġ1': 268, 'Ġ=': 270, 'Ġ+': 274, 'Ġ0': 279, 'Ġi': 281, pi: 356 } },
  added_tokens: [{ id: 0 }, { id: 1 }, { id: 2 }],
}

describe('i token del lettore della lavagna', () => {
  it('dai numeri dei token al testo, come nella prova con Python', () => {
    const vocabulary = vocabularyFrom(TOKENIZER)
    const ids = [START, 73, 265, 262, 281, 263, 356, 261, 274, 268, 270, 279]
    expect(textOf(ids, vocabulary)).toBe('e ^ { i \\pi } + 1 = 0')
  })

  it('la tabella dei byte: i caratteri stampabili restano, gli altri sono spostati dopo il 255', () => {
    const table = byteTable()
    expect(table.size).toBe(256)
    expect(table.get('a')).toBe(0x61)
    expect(table.get('Ġ')).toBe(0x20)
    expect(table.get('Ċ')).toBe(0x0a)
    // Le lettere accentate in UTF-8 sono due token-carattere.
    const vocabulary = { tokens: ['Ã¨'], special: new Set<number>() }
    expect(textOf([0], vocabulary)).toBe('è')
  })

  it('il token più probabile è quello dell\'ultima riga dei logit', () => {
    expect(lastArgmax(Float32Array.from([9, 0, 0, 0, 0.5, 3]), 3)).toBe(2)
    expect(lastArgmax([1, 7, 2], 3)).toBe(1)
  })

  it('il giro si ferma a </s> o al massimo dei token', async () => {
    const seen: number[][] = []
    const ids = await greedy(async (sofar) => {
      seen.push([...sofar])
      return sofar.length < 3 ? 40 + sofar.length : END
    })
    expect(ids).toEqual([41, 42])
    expect(seen[0]).toEqual([START])
    expect(await greedy(async () => 7, 4)).toEqual([7, 7, 7, 7])
  })
})
