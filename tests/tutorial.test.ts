import { afterEach, describe, expect, it } from 'vitest'
import { setLangForTests } from '../src/i18n'
import { TUTORIAL_PAGES, tutorialVideo } from '../src/ui/tutorial'

/** fs di Node: il nome si compone qui, così TypeScript non cerca i tipi di Node (che non ci sono). */
async function fileSize(path: string): Promise<number> {
  const name = ['node', 'fs'].join(':')
  const { statSync } = (await import(/* @vite-ignore */ name)) as { statSync(p: string): { size: number } }
  return statSync(path).size
}

afterEach(() => setLangForTests('it'))

describe('tutorial', () => {
  it('le pagine: anche grafici, tabelle, schemi, «Spiega con l\'AI» e la condivisione', () => {
    expect(TUTORIAL_PAGES.map((p) => p.id)).toEqual([
      'scrivere',
      'formule',
      'simboli',
      'calcoli',
      'grafici',
      'tabelle',
      'schemi',
      'spiegami',
      'lavagna',
      'barra',
      'condividi',
    ])
  })

  it('in ogni lingua ogni pagina ha il titolo e un testo che sta in quattro righe, con il codice tra apici a coppie', () => {
    for (const lang of ['it', 'en'] as const) {
      setLangForTests(lang)
      for (const page of TUTORIAL_PAGES) {
        expect(page.title.trim(), `${lang} ${page.id}`).not.toBe('')
        expect(page.text.length, `${lang} ${page.id}`).toBeGreaterThan(40)
        // Quattro righe della finestra (larga 720 px): oltre, i pulsanti si spostano da una pagina all'altra.
        expect(page.text.length, `${lang} ${page.id}`).toBeLessThanOrEqual(340)
        expect(page.text.split('`').length % 2, `${lang} ${page.id}`).toBe(1)
      }
    }
    setLangForTests('en')
    expect(TUTORIAL_PAGES[0].title).toBe('Welcome to Glifo')
  })

  it('ogni pagina ha i video dei due temi (non troppo grandi)', async () => {
    expect(new Set(TUTORIAL_PAGES.map((p) => p.id)).size).toBe(TUTORIAL_PAGES.length)
    for (const page of TUTORIAL_PAGES) {
      for (const dark of [false, true]) {
        const src = tutorialVideo(page, dark)
        expect(src).toBe(`./tutorial/${page.id}-${dark ? 'scuro' : 'chiaro'}.webm`)
        const size = await fileSize(`public/${src.slice(2)}`)
        expect(size, src).toBeGreaterThan(20_000)
        expect(size, src).toBeLessThan(1_000_000)
      }
    }
  })
})
