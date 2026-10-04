import { describe, expect, it } from 'vitest'
import { TUTORIAL_PAGES, tutorialVideo } from '../src/ui/tutorial'

/** fs di Node: il nome si compone qui, così TypeScript non cerca i tipi di Node (che non ci sono). */
async function fileSize(path: string): Promise<number> {
  const name = ['node', 'fs'].join(':')
  const { statSync } = (await import(/* @vite-ignore */ name)) as { statSync(p: string): { size: number } }
  return statSync(path).size
}

describe('tutorial', () => {
  it('ogni pagina ha titolo, testo e i video dei due temi (non troppo grandi)', async () => {
    expect(TUTORIAL_PAGES.length).toBeGreaterThanOrEqual(4)
    expect(new Set(TUTORIAL_PAGES.map((p) => p.id)).size).toBe(TUTORIAL_PAGES.length)
    for (const page of TUTORIAL_PAGES) {
      expect(page.title.trim(), page.id).not.toBe('')
      expect(page.text.length, page.id).toBeGreaterThan(40)
      // Gli apici inversi del codice vanno a coppie.
      expect(page.text.split('`').length % 2, page.id).toBe(1)
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
