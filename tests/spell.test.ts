import { beforeAll, describe, expect, it, vi } from 'vitest'
import { EditorState } from '@codemirror/state'
import { ensureSyntaxTree } from '@codemirror/language'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { mathMarkdown } from '../src/editor/mathSyntax'
import { wordsToCheck } from '../src/editor/spellcheck'
import { SpellClient } from '../src/spell/client'
import { SpellEngine, type SpellLanguage } from '../src/spell/engine'
import { findWords } from '../src/spell/words'
import itAff from '../node_modules/dictionary-it/index.aff?raw'
import itDic from '../node_modules/dictionary-it/index.dic?raw'
import enAff from '../node_modules/dictionary-en/index.aff?raw'
import enDic from '../node_modules/dictionary-en/index.dic?raw'
import welcomeNote from '../src/welcome.md?raw'

const r = String.raw

// Il client, senza worker (come in Node), usa il servizio nella pagina: qui è finto.
const fakeService = vi.hoisted(() => ({
  wrong: new Set(['perchè', 'Glifoz']),
  personal: new Set<string>(),
  failInit: false,
  checks: 0,
}))
vi.mock('../src/spell/service', () => ({
  createSpellService: () => async (req: { type: string; words?: string[]; word?: string }) => {
    if (req.type === 'init') {
      if (fakeService.failInit) throw new Error('dizionario non trovato')
      return true
    }
    if (req.type === 'check') {
      fakeService.checks++
      return req.words!.filter((w) => fakeService.wrong.has(w) && !fakeService.personal.has(w))
    }
    if (req.type === 'suggest') return ['perché']
    if (req.type === 'personal') {
      fakeService.personal = new Set(req.words)
      return true
    }
  },
}))

const words = (text: string) => findWords(text).map((w) => w.word)

describe('parole da controllare', () => {
  it('tiene insieme elisioni e troncamenti', () => {
    expect(words("L'insieme dell'integrale c'è, un po' di più.")).toEqual(["L'insieme", "dell'integrale", "c'è", 'un', "po'", 'di', 'più'])
    expect(words("e' vero")).toEqual(["e'", 'vero'])
    expect(words('dell’Università')).toEqual(['dell’Università'])
  })

  it("non prende l'apice di chiusura di una citazione", () => {
    expect(words("'la funzione' e «tale limite»")).toEqual(['la', 'funzione', 'tale', 'limite'])
  })

  it('salta indirizzi, percorsi, codice, sigle e parole con cifre', () => {
    expect(
      words(r`vedi https://esempio.it/pagina e www.sito.com o nome@uni.it in src/main.ts con nome_variabile file.txt \alpha mp3 x2 3D CPU HashMap LaTeX a`),
    ).toEqual(['vedi', 'in', 'con']) // le lettere da sole («e», «o», «a») non si controllano
  })

  it('toglie la punteggiatura del Markdown intorno alle parole', () => {
    expect(words('**grassetto** _corsivo_ ~~barrato~~ [collegamento] (nota).')).toEqual(['grassetto', 'corsivo', 'barrato', 'collegamento', 'nota'])
  })

  it('restituisce le posizioni nel documento', () => {
    expect(findWords('ciao mondo', 10)).toEqual([
      { from: 10, to: 14, word: 'ciao' },
      { from: 15, to: 20, word: 'mondo' },
    ])
  })
})

describe('parti del Markdown escluse', () => {
  function checked(doc: string): string[] {
    const state = EditorState.create({ doc, extensions: [markdown({ base: markdownLanguage, extensions: [mathMarkdown] })] })
    ensureSyntaxTree(state, state.doc.length, 5000)
    return wordsToCheck(state, 0, state.doc.length).map((w) => w.word)
  }

  it('controlla titoli, testo e testo dei link, non formule, codice, indirizzi e HTML', () => {
    const doc = [
      '# Titolo dela nota',
      'Testo con $\\alpha + betta$ e `codicex` e [collegamento](https://esempio.it/pagina).',
      '$$',
      '\\frac{sbagliato}{b}',
      '$$',
      '```java',
      'Strng s = "cioa";',
      '```',
      '<span class="rosso">parola</span> <https://indirizzo.it>',
      '- [x] compito fatto',
      '| colonna | altra |',
    ].join('\n')
    expect(checked(doc)).toEqual(['Titolo', 'dela', 'nota', 'Testo', 'con', 'collegamento', 'parola', 'compito', 'fatto', 'colonna', 'altra'])
  })

  it('controlla la riga intera anche se si chiede solo un punto', () => {
    const state = EditorState.create({ doc: 'prima riga\nseconda riga', extensions: [markdown({ base: markdownLanguage })] })
    expect(wordsToCheck(state, 14, 14).map((w) => w.word)).toEqual(['seconda', 'riga'])
  })
})

describe('correttore (Hunspell con i dizionari veri)', () => {
  const files = { it: [itAff, itDic], en: [enAff, enDic] }
  const encoder = new TextEncoder()
  const load = async (lang: SpellLanguage) => ({ aff: encoder.encode(files[lang][0]), dic: encoder.encode(files[lang][1]) })
  let both: SpellEngine
  let italian: SpellEngine
  beforeAll(async () => {
    ;[both, italian] = await Promise.all([SpellEngine.create(['it', 'en'], load), SpellEngine.create(['it'], load)])
  })

  it('accetta le parole giuste, anche con elisioni e maiuscole', () => {
    for (const w of ['integrale', "l'insieme", "dell'integrale", 'L’insieme', "c'è", "po'", 'perché', 'più', 'Teorema', 'DERIVATA']) {
      expect(both.isCorrect(w), w).toBe(true)
    }
  })

  it('segna gli errori tipici', () => {
    expect(both.misspelled(['perchè', 'piu', 'pò', "e'", "qual'è", 'integrlae', 'funzione'])).toEqual([
      'perchè',
      'piu',
      'pò',
      "e'",
      "qual'è",
      'integrlae',
    ])
  })

  it('conosce i termini tecnici e i cognomi degli scienziati', () => {
    for (const w of ['iniettiva', 'Iniettiva', 'INIETTIVA', 'jacobiano', 'bayesiana', 'Cauchy', 'CAUCHY', "l'Hôpital", 'Schrödinger', 'array', 'thread', 'cvd']) {
      expect(italian.isCorrect(w), w).toBe(true)
    }
    expect(italian.isCorrect('cauchy')).toBe(false)
  })

  it("l'inglese vale solo se è tra le lingue scelte", () => {
    expect(both.isCorrect('however')).toBe(true)
    expect(italian.isCorrect('however')).toBe(false)
  })

  it('propone per prima la correzione giusta', () => {
    expect(both.suggest('perchè')[0]).toBe('perché')
    expect(both.suggest('perchè')).not.toContain('perch') // niente correzioni inglesi per le lettere accentate
    expect(both.suggest('piu')[0]).toBe('più')
    expect(both.suggest("e'")[0]).toBe('è')
    expect(both.suggest('pò')[0]).toBe("po'")
    expect(both.suggest("qual'è")[0]).toBe('qual è')
    expect(both.suggest('accellerazione')[0]).toBe('accelerazione')
    expect(both.suggest('integrlae').length).toBeLessThanOrEqual(6)
  })

  it('nella nota di benvenuto è sottolineato solo l\'esempio da correggere', () => {
    const state = EditorState.create({ doc: welcomeNote, extensions: [markdown({ base: markdownLanguage, extensions: [mathMarkdown] })] })
    ensureSyntaxTree(state, state.doc.length, 5000)
    const found = wordsToCheck(state, 0, state.doc.length).map((w) => w.word)
    expect(found.length).toBeGreaterThan(100)
    expect(both.misspelled(found)).toEqual(['perchè'])
  })

  it('usa le parole aggiunte dallo studente, con qualunque maiuscola', () => {
    const engine = italian
    expect(engine.isCorrect('Sgrunfio')).toBe(false)
    engine.setPersonalWords(['Sgrunfio'])
    expect(['Sgrunfio', 'sgrunfio', 'SGRUNFIO'].every((w) => engine.isCorrect(w))).toBe(true)
    engine.setPersonalWords([])
    expect(engine.isCorrect('Sgrunfio')).toBe(false)
  })
})

describe('client del correttore', () => {
  it('ricorda le parole controllate e non le richiede di nuovo', async () => {
    fakeService.failInit = false
    const client = new SpellClient({ languages: ['it'], personal: [] })
    expect(client.status('perchè')).toBeUndefined()
    expect(await client.check(['perchè', 'perché', 'perchè'])).toBe(true)
    expect(client.status('perchè')).toBe(false)
    expect(client.status('perché')).toBe(true)
    const before = fakeService.checks
    expect(await client.check(['perché'])).toBe(false)
    expect(fakeService.checks).toBe(before)
    expect(await client.suggest('perchè')).toEqual(['perché'])
    client.dispose()
  })

  it('dopo un cambio del dizionario personale ricontrolla tutto', async () => {
    const client = new SpellClient({ languages: ['it'], personal: [] })
    await client.check(['Glifoz'])
    expect(client.status('Glifoz')).toBe(false)
    const changed = new Promise<void>((resolve) => client.subscribe(resolve))
    client.setPersonalWords(['Glifoz'])
    expect(client.status('Glifoz')).toBeUndefined()
    await changed
    await client.check(['Glifoz'])
    expect(client.status('Glifoz')).toBe(true)
    client.dispose()
  })

  it('se il dizionario non si carica avvisa una volta e non segna nulla', async () => {
    fakeService.failInit = true
    const onError = vi.fn()
    const client = new SpellClient({ languages: ['it'], personal: [], onError })
    expect(await client.check(['perchè'])).toBe(false)
    expect(await client.check(['perchè'])).toBe(false)
    expect(client.status('perchè')).toBeUndefined()
    expect(onError).toHaveBeenCalledTimes(1)
    expect(await client.suggest('perchè')).toEqual([])
    fakeService.failInit = false
    client.dispose()
  })
})
