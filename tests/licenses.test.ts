import { describe, expect, it } from 'vitest'
import packageJson from '../package.json?raw'
import { LICENSES, licenseOf } from '../src/ui/licenses'

const texts = import.meta.glob('../public/licenze/*.txt', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

describe('le licenze in Impostazioni → Informazioni', () => {
  it('ogni libreria di package.json che finisce nell\'app è nell\'elenco', () => {
    const dependencies = Object.keys((JSON.parse(packageJson) as { dependencies: Record<string, string> }).dependencies)
    expect(dependencies.length).toBeGreaterThan(20)
    expect(dependencies.filter((name) => !licenseOf(name))).toEqual([])
  })

  it('il testo di ogni licenza è pubblicato con l\'app, in public/licenze/', () => {
    for (const license of LICENSES) {
      const text = texts[`../public/licenze/${license.file}`]
      expect(text, license.file).toBeTruthy()
      expect(text.length, license.file).toBeGreaterThan(500)
    }
  })
})
