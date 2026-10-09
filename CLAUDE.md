# Glifo – note per Claude

Web app per prendere appunti universitari in Markdown con formule LaTeX (KaTeX) e un
pannello che suggerisce i simboli. Sito statico (Vite + TypeScript, senza framework),
installabile come app, pubblicato su https://glifo.page (Cloudflare Pages) e, fino al trasloco del 18
ottobre 2026, anche su GitHub Pages: non c'è un server.

**Lo scopo** (spiegato dallo studente il 3 ottobre 2026): Glifo è prima di tutto un posto dove si
scrive (appunti, esercizi, tesi, articoli). Calcoli e grafici servono a quello che si scrive: a
**controllare** che sia vero (x² è una parabola rivolta verso l'alto → il grafico lo conferma; il volume
della sfera con l'integrale deve dare 4/3 πr³) e a **mostrare** quello che si studia (il ricercatore
mette i grafici nell'articolo). Nello scegliere cosa fare conta che il controllo funzioni su quello che
si scrive davvero e che i grafici si possano mostrare, più che coprire ogni argomento dei corsi. I
prossimi passi sono in «In programma» nella ROADMAP.

- L'utente è uno studente italiano. Scrivi sempre in italiano tutto quello che lo studente vede:
  riepiloghi, domande, avvisi, descrizioni dei comandi e le eventuali righe brevi durante il lavoro.
  Interfaccia, commenti e messaggi di commit sono in italiano.
- Durante i compiti segui la skill lavoro-silenzioso: niente commenti tra i passaggi, riepilogo completo alla fine.
- Le funzioni da aggiungere sono in [ROADMAP.md](ROADMAP.md): quando si chiede
  «cosa facciamo adesso?» si parte da lì. Aggiornalo quando una voce è fatta o se ne
  aggiunge una.
- I piani di abbonamento (idee non ancora decise: cosa far pagare, prezzi, cosa serve prima di
  incassare) sono in [ABBONAMENTI.md](ABBONAMENTI.md): quando se ne parla si riparte da lì e ci si
  scrive quello che si dice e si decide.

## Comandi

- `npm run dev`: server di sviluppo.
- `npm test`: test con Vitest. `npm run build`: controllo dei tipi e build in `dist/`.
- `npm run test:e2e`: prova nel browser sulla build in `dist/` (esegui prima
  `npm run build`): il flusso principale e poi l'account, con un Supabase finto
  (`scripts/fake-supabase.mjs`). Serve Chromium: indica il percorso con `CHROMIUM_PATH`
  (nelle sessioni cloud `/opt/pw-browsers/chromium`).
- `GLIFO_NO_PWA=1 npx vite build`: la build per claude.ai (la demo e le prove della grafica):
  senza service worker e con l'account spento (Accedi e Condividi si vedono, ma la finestra di
  accesso dice che lì non si entra).
- `node scripts/tutorial.mjs`: registra dall'app vera (esegui prima `npm run build`) i video del
  tutorial, nel tema chiaro e in quello scuro, in `public/tutorial/` (serve `CHROMIUM_PATH`; usa
  l'ffmpeg di Playwright). Va rifatto quando cambia l'interfaccia che i video mostrano; con un
  nome (`formule`) rifà solo quella pagina.
- `node scripts/spiegami-qwen.mjs`: «Spiegami» con Qwen3 vero sulla build in `dist/` (le prove di
  sempre usano un modello finto). Serve la rete verso Hugging Face (`huggingface.co` e i server dei
  file, `*.hf.co`); senza scheda grafica Chromium usa WebGPU sulla CPU (SwiftShader): va bene per
  vedere se passaggi e strumenti funzionano, non per la velocità. `MODELLO=Qwen3-1.7B` per un altro
  modello; scrive le domande, le risposte del modello e i passaggi con i segni di Glifo.
- `node scripts/relocation-test.mjs`: prova il trasloco su glifo.page con i due indirizzi veri
  (vecchio sito → nuovo): fa da sé una build con le date del trasloco accese e serve `CHROMIUM_PATH`;
  con `FOTO=cartella` salva le foto della fascia, della pagina finale e del messaggio sul sito nuovo.
- `node scripts/icons.mjs`: ridisegna `public/favicon.svg` e le icone PNG dell'app dal simbolo
  ∮ in `src/ui/logo.ts` (serve `CHROMIUM_PATH`). Va rifatto ogni volta che cambia il simbolo.
- `graphify update .`: rifà il grafo del codice in `graphify-out/` (in locale, senza modelli AI).
  Lo fanno da soli l'hook SessionStart (`.claude/hooks/session-start.sh`, che installa graphify
  con il lettore dell'SQL, `graphifyy[sql]`, per le migrazioni) e, dopo ogni commit, gli hook git.
  Del grafo sono nel repository solo `graph.json` e `GRAPH_REPORT.md` (`graphify-out/` è nel
  .gitignore: si aggiungono con `git add -f`); se dopo un commit risultano modificati, vanno nel
  commit successivo. `manifest.json` resta solo in locale: segna le date dei file, che sono
  diverse in ogni copia del repository.
- `node scripts/grafo-html.mjs`: rifà `graphify-out/graph.html`, la pagina interattiva del grafo
  (pallini e collegamenti, con i nomi dei gruppi presi da `graph.json`). Solo se lo studente chiede
  di vedere il grafo, non proporlo: poi mandagli la pagina come file da aprire (SendUserFile con
  `display: 'render'`), senza pubblicarla.

## Dove sono le cose

La mappa dettagliata del codice è in ARCHITETTURA.md: si leggono solo le parti che servono.

Prima di modificare una parte del codice, leggi tu la sezione di ARCHITETTURA.md che la riguarda:
contiene decisioni da rispettare (per esempio che il tema si cambia solo nelle impostazioni). È
documentazione, non codice: la regola di delegare all'esploratore vale per il codice.

- `src/symbols/`: catalogo dei simboli; per aggiungerne uno vedi «Aggiungere un simbolo» nel README.
- `src/search/`: ricerca a parole in italiano e suggerimenti mentre si scrive `\…`.
- `src/editor/`: editor CodeMirror 6 (formule, segnaposto, suggerimenti, ortografia, elenchi).
- `src/lists/`: i marcatori degli elenchi (`markers.ts`), usati da editor e anteprima.
- `src/spell/`: controllo ortografico (Hunspell in WebAssembly in un worker).
- `src/render/`: KaTeX e anteprima Markdown; i conti per spostare schemi e grafici con le frecce ↑ ↓.
- `src/ui/`: interfaccia: barra laterale, pulsanti volanti, barra di formattazione, anteprima, tutorial, la pagina «Commenti».
- `src/store/`: note, cartelle, impostazioni e misure delle sezioni nel browser (chiavi `glifo.*`).
- `src/schema/`: schemi stile draw.io con maxGraph: editor a tutto schermo, corsie dei processi, file .md, codice SQL.
- `src/spreadsheet/`: le tabelle con le formule come Excel (blocchi ```tabella), con il loro editor e i file .xlsx e .csv.
- `src/math/`: le espressioni delle formule: lettura, calcoli e il «foglio» della nota con i controlli.
- `src/graph/`: i grafici nella nota (2D e 3D, zone, piano di Gauss, statistica, i dati delle tabelle, il Gantt e il reticolo) con gli slider.
- `src/board/`: la lavagna per scrivere a mano accanto al testo, con il registro dei tocchi.
- `src/ai/`: assistente AI, con la chiave di chi lo usa, e «Spiegami» (in prova): Qwen3 nel browser con WebLLM, con il motore come strumenti.
- `src/host.ts`: funzioni della demo dentro claude.ai.
- `src/account/`: account e sincronizzazione con Supabase.
- `src/share/`: le note condivise con un link (`nota.html#codice`).
- `src/relocation.ts` e `src/ui/relocation.ts`: il trasloco su glifo.page (avviso e pagina finale sul
  vecchio sito, «Porta i miei appunti nel nuovo Glifo»).
- `privacy.html` e `nota.html`: l'informativa sulla privacy e la pagina delle note condivise.
- `supabase/`: il database degli account: migrazioni, regole di accesso e test.

### Attenzione a

- Niente codice rientrato: il rientro è per gli elenchi.
- Una nota può essere di un'altra persona (link condiviso, la copia salvata da lì, un .md):
  `renderMarkdown` toglie script, moduli, pulsanti e stili (`FORBIDDEN_TAGS`; con `untrusted` le
  caselle non si cliccano) e `.markdown-body` ha `contain: paint`, così niente esce dal riquadro
  della nota.
- Schemi: il testo delle forme passa sempre da `label.ts` (escape + KaTeX): maxGraph lo inserisce
  come HTML. Menu e messaggi dentro l'editor degli schemi vanno messi nella sua finestra (è modale:
  fuori restano sotto).
- Glifo può essere aperto in più schede: ogni modifica parte da quello salvato, non dalla copia in
  memoria, e `main.ts` ascolta l'evento `storage` per aggiornare le altre schede. Sulla lavagna ogni
  cambiamento fa tratti nuovi con id nuovi (come la gomma), così le altre schede non tengono il
  disegno vecchio.
- Sulla lavagna touchstart, touchmove e touchend sono annullati: sull'iPad selezionavano le parole
  e facevano partire Scribble.
- Chiave, modello e indirizzo di ogni servizio dell'AI restano nel browser; il registro dei tocchi
  non tiene mai il testo delle note (`where`).
- Prima di sincronizzare, scaricare o eliminare, `src/account/supabase.ts` controlla che l'accesso
  salvato nel browser sia dell'account aperto.
- WebLLM (6 MB) sta solo nel worker `src/ai/llmWorker.ts`: la pagina non lo importa mai, parla con il
  worker da `src/ai/local.ts`. Nelle prove nel browser il worker è finto (Qwen3 non si scarica).

## Promemoria per lo studente

Quando chiede «cosa dovevo fare?», ricordagli queste cose (e toglile da qui quando sono fatte):

- Domenica 18 ottobre 2026, il giorno del trasloco su `glifo.page`: in Supabase (Authentication → URL
  Configuration) cambiare il **Site URL** in `https://glifo.page/` («Trasloco» in ROADMAP.md, passo 4).
  Da lunedì 12 il vecchio sito mostra l'avviso: lo studente può scrivere a chi usa Glifo come portare gli
  appunti. Più avanti, decisi titolare e limiti di spazio, premere «Publish app» nella Google Auth
  Platform (Audience) per aprire a tutti l'accesso con Google (passo 4 di «Account» in ROADMAP.md).
- Riparlare della condivisione: le cartelle condivise con persone scelte e i loro permessi (come
  nella finestra «Condividi» di NotebookLM) e lo scrivere insieme senza conflitti. Il 4 ottobre
  2026, fatto il link, lo studente ha chiesto di tenerlo per dopo e di sistemare prima la
  grafica: le idee sono al passo 5 di ROADMAP.md.
- Dire quale modello di «Spiegami» tenere all'inizio (0.6B, 1.7B o 4B, nelle impostazioni) e quanto ci
  mette a rispondere: l'8 ottobre 2026 ha usato il 4B e ha detto «ora funziona tutto», e «Spiegami» con
  il pannello ✨ è andato sul sito vero. Le prove nuove si fanno ancora sul sito di prova
  https://glifo-prova.pages.dev (Cloudflare Pages, dal ramo `prova`; lì l'account è spento).
- Leggere ogni tanto i commenti di chi prova Glifo (il fumetto in fondo alla barra laterale apre la
  pagina «Commenti», online dall'8 ottobre 2026): dashboard di Supabase → progetto `glifo` →
  Table Editor → `feedback`, dove ci sono anche quelli privati. Lì si risponde (colonna `reply`: si
  vede sotto il commento), si nasconde dalla pagina un commento che non va (`visible` → false) e si
  cancellano quelli che non servono più; oppure lo si chiede a Claude.
- Provare la lavagna sull'iPad con la Apple Pencil, quando l'avrà di nuovo: le correzioni del 5
  ottobre 2026 sono già online. Prima accendere il registro dei tocchi (Impostazioni, in fondo).
  Scrivendo non si deve selezionare niente, a tutto schermo la lavagna non si deve chiudere e la
  mano appoggiata non deve spostarla né premere i pulsanti; per spostarla servono due dita. Poi dire
  com'è andata e, se qualcosa non va, premere il pallino rosso sulla lavagna, scrivere cosa è
  successo e mandare il registro nella chat (Copia, oppure Scarica o Condividi e allegarlo).

## Regole

- Per cercare o capire il codice delega sempre a esploratore, invece di leggere i file direttamente. Apri tu i file solo nelle parti che devi modificare. Se esploratore segnala che il grafo non è aggiornato, esegui `graphify update .` e ripeti la ricerca.
- Ogni push sul branch predefinito esegue test e build e pubblica il sito: su GitHub Pages
  (`.github/workflows/deploy.yml` → branch `gh-pages`) e su glifo.page (Cloudflare Pages, progetto
  `glifo`, che costruisce da solo il ramo principale; il ramo `prova` va su glifo-prova.pages.dev).
- Le modifiche che lo studente vuole provare prima che vadano online (per esempio la grafica)
  si fanno sul ramo `prova`: lo studente ha detto di mandarlo su GitHub (4 ottobre 2026), e non
  va online perché il sito si pubblica solo dal ramo principale. Gliele fai vedere con le foto
  e, quando serve provarle, con Glifo del ramo `prova` su una pagina privata di claude.ai
  (Artifact, build con `GLIFO_NO_PWA=1`), con l'account spento così i suoi appunti veri non si
  toccano. Quando dice «va bene», `prova` si unisce al ramo principale e si pubblica con i soliti
  controlli. Quello che chiede di fare subito va sul ramo principale, e poi anche in `prova`
  (merge del ramo principale in `prova`).
- Prima di un push: `npm test` e `npm run build`; se cambiano editor o interfaccia
  anche `npm run test:e2e`. Aggiungi un test per ogni bug corretto.
- L'app deve continuare a funzionare senza connessione.
- Database: ogni modifica è una nuova migrazione in `supabase/migrations/`, seguita dai test
  di `supabase/tests/` e dagli Advisors. Nel codice va solo la chiave pubblica di Supabase;
  quella segreta mai, nemmeno nei messaggi.
- Solo servizi gratuiti, finché lo studente non decide diversamente: quello che costerebbe
  (dominio, Supabase Pro, l'AI di Glifo…) è in [COSTI.md](COSTI.md) e si attiva solo quando lo dice
  lui, una voce alla volta (5 ottobre 2026).
- Se cambia quali dati Glifo tiene o a quali servizi li manda (per esempio l'accesso con
  Google), aggiorna `privacy.html` e la sua data.

## Come controllare il lavoro

- Online si dice solo dopo averlo visto: dopo il push, sul branch `gh-pages` deve arrivare il
  commit «Pubblica <sha>» e su GitHub l'azione «pages build and deployment» deve finire con
  successo; per glifo.page, sul commit il controllo «Cloudflare Pages: glifo» deve dire «Deploy
  successful» (`gh api repos/DioDiAltro/Glifo/commits/<sha>/check-runs`). Glifo.page dalla sessione
  non si apre (la rete lo blocca): l'accesso si controlla nei registri di Supabase (`query_logs`).
- Controprove: dopo una correzione rimetti apposta il difetto e guarda che un test fallisca. Per
  tornare indietro copia i file da una copia di riserva fatta prima: mai `git checkout` o
  `git stash` con modifiche non ancora nel commit (si perderebbero). Niente commit né build
  mentre una controprova è in corso.
- `tsc` controlla anche `tests/`, ma i tipi di Node non ci sono: i moduli `node:` nei test si
  importano con un nome composto al momento (vedi `sqlite()` in `tests/schemaSql.test.ts`).
- Gli strumenti che modificano i file trasformano `\u003c` scritto con una barra sola nel
  carattere vero: per scriverlo così com'è usa Python con `chr(92)` o lo strumento Write.
- Le prove nel browser si fanno con script Playwright (Chromium in `CHROMIUM_PATH`), anche per
  fotografare l'app e mostrare allo studente come viene.

## graphify

Il grafo del codice è in `graphify-out/`. Le ricerche nel grafo (`graphify query`, `explain`, `path`)
le fa l'esploratore: la sessione principale non le lancia, delega. Il grafo si aggiorna da solo con
gli hook (SessionStart e dopo ogni commit): la sessione principale esegue `graphify update .` solo se
l'esploratore segnala che il grafo non è aggiornato.

Non eseguire `graphify claude install` né `graphify install`, anche se la skill di graphify lo
suggerisce: riscriverebbero questa sezione in inglese e rimetterebbero gli hook tolti.
