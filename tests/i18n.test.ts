// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  browserLang,
  byLang,
  chooseLang,
  dateLocale,
  detectLang,
  lang,
  LANG_KEY,
  LANGUAGES,
  rememberLang,
  rich,
  setLangForTests,
  texts,
} from '../src/i18n'

function browserLanguages(languages: string[]): void {
  Object.defineProperty(navigator, 'languages', { value: languages, configurable: true })
  Object.defineProperty(navigator, 'language', { value: languages[0], configurable: true })
}

beforeEach(() => localStorage.clear())
afterEach(() => {
  browserLanguages(['it-IT', 'it'])
  setLangForTests('it')
})

describe('la lingua di Glifo', () => {
  it('nelle prove Glifo si apre in italiano', () => {
    expect(lang).toBe('it')
    expect(LANGUAGES.map((l) => l.id)).toEqual(['it', 'en'])
  })

  it('dal browser: la prima tra italiano e inglese, se no inglese', () => {
    expect(browserLang(['it-IT'])).toBe('it')
    expect(browserLang(['it'])).toBe('it')
    expect(browserLang(['en-US', 'it-IT'])).toBe('en')
    expect(browserLang(['fr-FR', 'it-IT', 'en'])).toBe('it')
    expect(browserLang(['de-DE', 'fr'])).toBe('en')
    expect(browserLang(['EN-gb'])).toBe('en')
    expect(browserLang([])).toBe('en')
  })

  it('la prima volta si prende dal browser; chi ha già gli appunti resta in italiano', () => {
    browserLanguages(['en-US', 'en'])
    expect(detectLang()).toBe('en')
    localStorage.setItem('glifo.notes.v1', '[]')
    expect(detectLang()).toBe('it')
    localStorage.clear()
    // Gli appunti con il vecchio nome (main.ts li sposta dopo).
    localStorage.setItem('matherdown.notes.v1', '[]')
    expect(detectLang()).toBe('it')
    localStorage.clear()
    localStorage.setItem('altro.sito', 'x')
    expect(detectLang()).toBe('en')
  })

  it('la lingua scelta vale più del browser e degli appunti', () => {
    browserLanguages(['it-IT'])
    chooseLang('en')
    expect(detectLang()).toBe('en')
    localStorage.setItem('glifo.notes.v1', '[]')
    expect(detectLang()).toBe('en')
    localStorage.setItem(LANG_KEY, 'fr')
    expect(detectLang()).toBe('it')
  })

  it('all\'avvio la lingua trovata si ricorda, così gli appunti scritti dopo non la cambiano', () => {
    rememberLang()
    expect(localStorage.getItem(LANG_KEY)).toBe('it')
    chooseLang('en')
    rememberLang()
    expect(localStorage.getItem(LANG_KEY)).toBe('en')
  })
})

describe('i testi nelle due lingue', () => {
  const T = texts({
    close: ['Chiudi', 'Close'],
    notes: (n: number) => [n === 1 ? 'una nota' : `${n} note`, n === 1 ? 'one note' : `${n} notes`],
  })

  it('ogni testo e ogni funzione danno la lingua della pagina, anche se cambia dopo', () => {
    expect(T.close).toBe('Chiudi')
    expect(T.notes(1)).toBe('una nota')
    expect(T.notes(3)).toBe('3 note')
    setLangForTests('en')
    expect(T.close).toBe('Close')
    expect(T.notes(1)).toBe('one note')
    expect(T.notes(3)).toBe('3 notes')
    expect(Object.keys(T)).toEqual(['close', 'notes'])
  })

  it('un pezzo intero nelle due lingue', () => {
    const version = () => byLang({ it: () => ['a', 1], en: () => ['b', 2] })
    expect(version()).toEqual(['a', 1])
    setLangForTests('en')
    expect(version()).toEqual(['b', 2])
  })

  it('i pezzi tra graffe diventano elementi, gli altri restano testo', () => {
    const key = document.createElement('kbd')
    key.textContent = 'Ctrl'
    const parts = rich('Premi {key} e poi {what}.', { key, what: 'Invio' })
    expect(parts).toEqual(['Premi ', key, ' e poi ', 'Invio', '.'])
    expect(rich('{key}', { key })).toEqual([key])
    expect(rich('Senza {nome}', {})).toEqual(['Senza ', '{nome}'])
  })

  it('le date: italiane, o inglesi nel formato del browser', () => {
    expect(dateLocale()).toBe('it-IT')
    setLangForTests('en')
    browserLanguages(['it-IT'])
    expect(dateLocale()).toBe('en-GB')
    browserLanguages(['en-US', 'it'])
    expect(dateLocale()).toBe('en-US')
  })
})
