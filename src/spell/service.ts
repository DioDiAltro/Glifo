import { fetchDictionary } from './dictionaries'
import { SpellEngine, type SpellLanguage } from './engine'

/** Richieste al correttore, uguali sia dal worker sia (se manca) dalla pagina. */
export type SpellRequest =
  | { type: 'init'; languages: SpellLanguage[]; personal: string[] }
  | { type: 'check'; words: string[] }
  | { type: 'suggest'; word: string }
  | { type: 'personal'; words: string[] }

export function createSpellService(): (req: SpellRequest) => Promise<unknown> {
  let engine: Promise<SpellEngine> | null = null
  const ready = () => engine ?? Promise.reject(new Error('Correttore non ancora avviato'))

  return async (req) => {
    switch (req.type) {
      case 'init': {
        engine = SpellEngine.create(req.languages, fetchDictionary)
        ;(await engine).setPersonalWords(req.personal)
        return true
      }
      case 'check':
        return (await ready()).misspelled(req.words)
      case 'suggest':
        return (await ready()).suggest(req.word)
      case 'personal':
        ;(await ready()).setPersonalWords(req.words)
        return true
    }
  }
}
