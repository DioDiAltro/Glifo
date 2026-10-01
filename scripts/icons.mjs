/**
 * Ridisegna le icone dell'app dal simbolo in src/ui/logo.ts: public/favicon.svg e le PNG
 * del manifest (vite.config.ts) e di iPhone/iPad.
 *   node scripts/icons.mjs
 * Serve Chromium, come per npm run test:e2e: indica il percorso con CHROMIUM_PATH.
 */
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import { logoIcon } from '../src/ui/logo.ts'

const publicFile = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url))

// [file, lato in pixel, sfondo fino agli angoli]
const PNG_ICONS = [
  ['icon-192.png', 192, false],
  ['icon-512.png', 512, false],
  // Android ritaglia l'icona con la sua forma: il simbolo sta nel cerchio centrale.
  ['icon-maskable-512.png', 512, true],
  // iPhone e iPad arrotondano gli angoli da soli, e dove l'immagine è trasparente mettono il nero.
  ['apple-touch-icon.png', 180, true],
]

await writeFile(publicFile('favicon.svg'), logoIcon())
console.log('✓ public/favicon.svg')

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
try {
  const page = await browser.newPage()
  for (const [name, size, full] of PNG_ICONS) {
    await page.setViewportSize({ width: size, height: size })
    await page.setContent(`<style>body{margin:0}svg{display:block;width:${size}px;height:${size}px}</style>${logoIcon(full)}`)
    // Fuori dagli angoli arrotondati l'immagine resta trasparente.
    await page.screenshot({ path: publicFile(name), omitBackground: true })
    console.log(`✓ public/${name}`)
  }
} finally {
  await browser.close()
}
