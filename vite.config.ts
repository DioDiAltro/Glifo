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
  },
  plugins: withPwa
    ? [
        VitePWA({
          // Installabile come app (telefono, tablet, computer) e funzionante offline.
          registerType: 'autoUpdate',
          includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
          manifest: {
            name: 'Glifo – appunti universitari',
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
  },
})
