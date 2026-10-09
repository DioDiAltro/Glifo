import { defineConfig } from 'vitest/config'
import { VitePWA } from 'vite-plugin-pwa'

declare const process: { env: Record<string, string | undefined> }

// Il ramo principale del repository: su Cloudflare Pages (dove Cloudflare mette CF_PAGES e il ramo in
// CF_PAGES_BRANCH) solo la sua build è il sito vero, quello di glifo.page. Se il ramo cambia nome, va
// cambiato anche qui: altrimenti glifo.page diventa il sito di prova, con l'account spento.
export const MAIN_BRANCH = 'claude/blissful-goodall-c0gpmk'

// Quale Glifo si costruisce (i nomi sono in src/site.ts): il sito (su GitHub Pages e, dal ramo
// principale, su Cloudflare), la build per claude.ai (GLIFO_NO_PWA=1: la demo e le prove della
// grafica, vedi CLAUDE.md) o il sito di prova, cioè ogni altra build di Cloudflare (il ramo `prova`).
// Le ultime due senza service worker, che dentro un'altra pagina non sono ammessi e sul sito di prova
// terrebbero le versioni vecchie, e senza account, così gli appunti veri non si toccano: su
// Cloudflare anche senza GLIFO_NO_PWA.
const site = process.env.CF_PAGES
  ? process.env.CF_PAGES_BRANCH === MAIN_BRANCH ? 'online' : 'prova'
  : process.env.GLIFO_NO_PWA ? 'claude' : 'online'
const withPwa = !process.env.VITEST && site === 'online'

export default defineConfig({
  // Percorsi relativi: il sito funziona anche da una sottocartella
  // (es. GitHub Pages su /glifo/) o aprendo la build da un altro host.
  base: './',
  define: {
    __GLIFO_SITE__: JSON.stringify(site),
    // Nel registro dei tocchi (src/ui/touchLogPanel.ts): quale Glifo si stava provando (il commit
    // arriva da GitHub o da Cloudflare).
    __GLIFO_VERSION__: JSON.stringify(`${(process.env.GITHUB_SHA || process.env.CF_PAGES_COMMIT_SHA || '').slice(0, 7) || 'locale'}, ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`),
  },
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
            // Anche WebLLM (llmWorker, 6 MB, per «Spiegami») si scarica solo quando serve.
            globIgnores: ['**/sdk-*.js', '**/service-*.js', '**/hunspell.web-*.js', '**/llmWorker-*.js'],
            runtimeCaching: [
              {
                // Scaricato la prima volta che si preme «Spiegami», WebLLM resta: con il modello già nel
                // browser (lo tiene WebLLM) le spiegazioni funzionano anche offline.
                urlPattern: /\/assets\/llmWorker-[\w-]+\.js$/,
                handler: 'CacheFirst',
                options: { cacheName: 'glifo-webllm', expiration: { maxEntries: 2 } },
              },
            ],
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
