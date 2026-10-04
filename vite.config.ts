import { defineConfig } from 'vitest/config'
import { VitePWA } from 'vite-plugin-pwa'

declare const process: { env: Record<string, string | undefined> }

// GLIFO_NO_PWA=1 crea una build senza service worker (utile per
// pubblicare una demo dentro un'altra pagina, dove i service worker non sono ammessi).
const withPwa = !process.env.VITEST && !process.env.GLIFO_NO_PWA

export default defineConfig({
  // Percorsi relativi: il sito funziona anche da una sottocartella
  // (es. GitHub Pages su /glifo/) o aprendo la build da un altro host.
  base: './',
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      // Tre pagine: l'app, l'informativa sulla privacy (che si legge anche senza aprire l'app) e
      // la pagina delle note condivise con un link (src/share/page.ts).
      input: { main: 'index.html', privacy: 'privacy.html', nota: 'nota.html' },
      // maxGraph (gli schemi) usa eval solo per cose che Glifo tiene spente: stili scritti come
      // codice (GraphView.allowEval è false), forme e menu letti da XML. Quell'avviso si nasconde.
      onLog(level, log, handler) {
        if (log.code === 'EVAL' && log.id?.includes('@maxgraph/core')) return
        handler(level, log)
      },
    },
  },
  plugins: withPwa
    ? [
        VitePWA({
          // Installabile come app (telefono, tablet, computer) e funzionante offline.
          registerType: 'autoUpdate',
          includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
          manifest: {
            name: 'Glifo',
            short_name: 'Glifo',
            description: 'Appunti in Markdown per ogni materia: formule LaTeX con anteprima dei simboli, codice, tabelle.',
            lang: 'it',
            start_url: '.',
            scope: '.',
            display: 'standalone',
            theme_color: '#4f46e5',
            background_color: '#f5f6fa',
            icons: [
              { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
              { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
              { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
            ],
          },
          workbox: {
            // Anche i dizionari del controllo ortografico (.aff e .dic), per usarlo offline.
            globPatterns: ['**/*.{js,css,html,svg,png,woff2,aff,dic}'],
            maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
            // L'SDK dell'assistente AI si scarica solo quando serve; service e hunspell.web
            // servono solo dove i worker non sono ammessi (il correttore di solito gira in un worker).
            globIgnores: ['**/sdk-*.js', '**/service-*.js', '**/hunspell.web-*.js'],
          },
        }),
      ]
    : [],
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    // Di solito nei test i CSS sono vuoti; questo serve ai controlli dei temi (tests/theme.test.ts).
    css: { include: [/src\/styles\/app\.css/] },
  },
})
