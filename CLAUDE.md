# Glifo – note per Claude

Web app per prendere appunti universitari in Markdown con formule LaTeX (KaTeX) e un
pannello che suggerisce i simboli. Sito statico (Vite + TypeScript, senza framework),
installabile come app, pubblicato su GitHub Pages: non c'è un server.

- L'utente è uno studente italiano: rispondi in italiano. Interfaccia, commenti e
  messaggi di commit sono in italiano.
- Le funzioni da aggiungere sono in [ROADMAP.md](ROADMAP.md): quando si chiede
  «cosa facciamo adesso?» si parte da lì. Aggiornalo quando una voce è fatta o se ne
  aggiunge una.

## Comandi

- `npm run dev`: server di sviluppo.
- `npm test`: test con Vitest. `npm run build`: controllo dei tipi e build in `dist/`.
- `npm run test:e2e`: prova nel browser sulla build in `dist/` (esegui prima
  `npm run build`): il flusso principale e poi l'account, con un Supabase finto
  (`scripts/fake-supabase.mjs`). Serve Chromium: indica il percorso con `CHROMIUM_PATH`
  (nelle sessioni cloud `/opt/pw-browsers/chromium`).
- `GLIFO_NO_PWA=1 npx vite build`: build senza service worker (per la demo su claude.ai).
- `node scripts/icons.mjs`: ridisegna `public/favicon.svg` e le icone PNG dell'app dal simbolo
  ∮ in `src/ui/logo.ts` (serve `CHROMIUM_PATH`). Va rifatto ogni volta che cambia il simbolo.

## Dove sono le cose

- `src/symbols/`: catalogo dei simboli; per aggiungerne uno vedi «Aggiungere un
  simbolo» nel README.
- `src/search/`: ricerca a parole in italiano e suggerimenti mentre si scrive `\…`.
- `src/editor/`: editor CodeMirror 6 (formule, segnaposto, suggerimenti, `spellcheck.ts`,
  `lists.ts` per Invio/Tab/Maiusc+Tab negli elenchi).
- `src/lists/markers.ts`: i marcatori degli elenchi (1), a), i), es), •…), usati da editor e
  anteprima (`src/render/lists.ts`). Niente codice rientrato: il rientro è per gli elenchi.
- `src/spell/`: controllo ortografico (Hunspell in WebAssembly in un worker, dizionari
  `dictionary-it` e `dictionary-en`, glossario tecnico in `glossary.ts`).
- `src/render/`: KaTeX e anteprima Markdown, con le stesse regole di VS Code per `$…$`.
- `src/ui/`: interfaccia (`resize.ts`: i bordi da trascinare tra le sezioni). `src/store/`: note,
  cartelle (`folders.ts`), impostazioni e misure delle sezioni (`layout.ts`, solo su quel
  dispositivo) nel browser (chiavi `glifo.*`).
  Glifo può essere aperto in più schede: ogni modifica parte da quello salvato, non dalla copia
  in memoria, e `main.ts` ascolta l'evento `storage` per aggiornare le altre schede.
- `src/schema/`: schemi stile draw.io con maxGraph (caricato solo quando serve). Nella nota sono
  blocchi ```schema con un JSON (`model.ts`: formato, controlli, colori dei due temi);
  `editor.ts` è l'editor a tutto schermo, `preview.ts` li disegna nell'anteprima,
  `src/editor/schemaBlocks.ts` li mostra nel testo come una riga con «Modifica». Il testo delle
  forme passa sempre da `label.ts` (escape + KaTeX): maxGraph lo inserisce come HTML.
  Nei file .md (`file.ts`, usato da «Salva .md» e «Apri .md») ogni schema diventa un'immagine
  SVG, che VS Code mostra, più il JSON in un commento HTML; aprendo il file torna un blocco.
  Le forme in più (anche quelle delle basi di dati: entità debole, attributi a pallino, tabella)
  sono in `shapes.ts`; il testo delle tabelle (nome, campi, PK/FK) lo fa `tableHtml` in
  `label.ts`, e nell'editor si scrive in due parti, il nome e i campi (`splitTable`/`joinTable`
  in `model.ts`). I modelli pronti sono in `templates.ts`, allinea e
  distribuisci in `arrange.ts`, PNG e «Copia come immagine» in `image.ts`. Menu e messaggi
  dentro l'editor vanno messi nella sua finestra (è modale: fuori restano sotto).
- `src/ai/`: assistente AI. `src/host.ts`: funzioni della demo dentro claude.ai.
- `src/account/`: account e sincronizzazione. `sync.ts` è il motore (manda, scarica, nei
  conflitti tiene tutte e due le versioni), `controller.ts` decide quando sincronizzare,
  `space.ts` tiene le note di ogni account in uno spazio a parte del browser (`glifo.u.<id>.…`),
  `supabase.ts` fa l'accesso con Google o via email (il link aperto qui o incollato, o il
  codice) e controlla che l'accesso salvato nel browser sia dell'account aperto prima di
  sincronizzare, scaricare o eliminare. Il client di Supabase si carica solo se si accede.
- `privacy.html`: l'informativa sulla privacy, una seconda pagina della build (vedi
  `vite.config.ts`), collegata da `src/ui/links.ts`.
- `supabase/`: il database degli account (progetto Supabase `glifo`, Francoforte, piano
  gratuito): tabelle e regole di accesso in `migrations/`, test in `tests/`. Il README spiega
  indirizzo, chiave pubblica, sincronizzazione (`sync_pull`/`sync_push`) e come si cambia.
  `npm test` prova le migrazioni in un Postgres in memoria (PGlite, con
  `supabase/tests/supabase-stub.sql` al posto di Supabase).

## Promemoria per lo studente

Quando chiede «cosa dovevo fare?», ricordagli queste cose (e toglile da qui quando sono fatte):

- Attivare l'accesso con Google: progetto in Google Cloud e attivazione in Supabase, con i
  passi in `supabase/README.md` («Accesso con Google»). Poi controlla nei registri di Supabase
  (`query_logs`, servizio auth) che l'accesso con Google sia riuscito.
- Decidere se Glifo passa sotto S&Z (dominio `seznet.net`) e dare un'email di contatto per
  l'informativa (`privacy.html`): vedi il passo 4 in ROADMAP.md.

## Regole

- Ogni push sul branch predefinito esegue test e build e pubblica il sito
  (`.github/workflows/deploy.yml` → branch `gh-pages`).
- Prima di un push: `npm test` e `npm run build`; se cambiano editor o interfaccia
  anche `npm run test:e2e`. Aggiungi un test per ogni bug corretto.
- L'app deve continuare a funzionare senza connessione.
- Database: ogni modifica è una nuova migrazione in `supabase/migrations/`, seguita dai test
  di `supabase/tests/` e dagli Advisors. Nel codice va solo la chiave pubblica di Supabase;
  quella segreta mai, nemmeno nei messaggi.
- Solo servizi gratuiti, finché lo studente non decide diversamente.
- Se cambia quali dati Glifo tiene o a quali servizi li manda (per esempio l'accesso con
  Google), aggiorna `privacy.html` e la sua data.
