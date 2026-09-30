import type { DictionaryData, SpellLanguage } from './engine'
// Dizionari Hunspell dei pacchetti dictionary-it (GPL-3.0) e dictionary-en (MIT e BSD).
// I pacchetti non «esportano» i file .aff e .dic, quindi li prendiamo dal percorso completo:
// Vite li copia nella build come file a parte, scaricati solo se il controllo è attivo.
import itAff from '../../node_modules/dictionary-it/index.aff?url'
import itDic from '../../node_modules/dictionary-it/index.dic?url'
import enAff from '../../node_modules/dictionary-en/index.aff?url'
import enDic from '../../node_modules/dictionary-en/index.dic?url'

const FILES: Record<SpellLanguage, [aff: string, dic: string]> = {
  it: [itAff, itDic],
  en: [enAff, enDic],
}

async function download(url: string): Promise<Uint8Array> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Dizionario non trovato (${res.status})`)
  return new Uint8Array(await res.arrayBuffer())
}

export async function fetchDictionary(lang: SpellLanguage): Promise<DictionaryData> {
  const [aff, dic] = await Promise.all(FILES[lang].map(download))
  return { aff, dic }
}
