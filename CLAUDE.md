# Glifo – note per Claude

Web app per prendere appunti universitari in Markdown con formule LaTeX (KaTeX) e un
pannello che suggerisce i simboli. Sito statico (Vite + TypeScript, senza framework),
installabile come app, pubblicato su GitHub Pages: non c'è un server.

**Lo scopo** (spiegato dallo studente il 3 ottobre 2026): Glifo è prima di tutto un posto dove si
scrive (appunti, esercizi, tesi, articoli). Calcoli e grafici servono a quello che si scrive: a
**controllare** che sia vero (x² è una parabola rivolta verso l'alto → il grafico lo conferma; il volume
della sfera con l'integrale deve dare 4/3 πr³) e a **mostrare** quello che si studia (il ricercatore
mette i grafici nell'articolo). Nello scegliere cosa fare conta che il controllo funzioni su quello che
si scrive davvero e che i grafici si possano mostrare, più che coprire ogni argomento dei corsi. I
prossimi passi sono in «In programma» nella ROADMAP.

- L'utente è uno studente italiano: rispondi **sempre** in italiano, anche nei messaggi brevi
  mentre lavori (cosa stai facendo, attese, riepiloghi) e nelle descrizioni dei comandi; lo ha
  chiesto più volte. Interfaccia, commenti e messaggi di commit sono in italiano.
- Durante i compiti segui la skill lavoro-silenzioso: niente commenti tra i passaggi, riepilogo completo alla fine.
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
- `GLIFO_NO_PWA=1 npx vite build`: la build per claude.ai (la demo e le prove della grafica):
  senza service worker e con l'account spento.
- `node scripts/tutorial.mjs`: registra dall'app vera (esegui prima `npm run build`) i video del
  tutorial, nel tema chiaro e in quello scuro, in `public/tutorial/` (serve `CHROMIUM_PATH`; usa
  l'ffmpeg di Playwright). Va rifatto quando cambia l'interfaccia che i video mostrano; con un
  nome (`formule`) rifà solo quella pagina.
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

- `src/symbols/`: catalogo dei simboli; per aggiungerne uno vedi «Aggiungere un
  simbolo» nel README.
- `src/search/`: ricerca a parole in italiano e suggerimenti mentre si scrive `\…`.
- `src/editor/`: editor CodeMirror 6 (formule, segnaposto, suggerimenti, `spellcheck.ts`,
  `lists.ts` per Invio/Tab/Maiusc+Tab negli elenchi).
- `src/lists/markers.ts`: i marcatori degli elenchi (1), a), i), es), •…), usati da editor e
  anteprima (`src/render/lists.ts`). Niente codice rientrato: il rientro è per gli elenchi.
- `src/spell/`: controllo ortografico (Hunspell in WebAssembly in un worker, dizionari
  `dictionary-it` e `dictionary-en`, glossario tecnico in `glossary.ts`).
- `src/render/`: KaTeX e anteprima Markdown, con le stesse regole di VS Code per `$…$`. Una nota
  può essere di un'altra persona (link condiviso, la copia salvata da lì, un .md): `renderMarkdown`
  toglie script, moduli, pulsanti e stili (`FORBIDDEN_TAGS`; con `untrusted` le caselle non si
  cliccano) e `.markdown-body` ha `contain: paint`, così niente esce dal riquadro della nota.
- `src/ui/`: interfaccia (`resize.ts`: i bordi da trascinare tra le sezioni). Non c'è una barra in
  alto: la barra laterale è l'elenco degli appunti (`notesPanel.ts`) con sopra la nota aperta e i
  suoi pulsanti e sotto l'account e le impostazioni (`sidebarTop` e `sidebarBottom` in `main.ts`);
  i pulsanti volanti (simboli, viste) sono in `.float-bar`, dentro `.content` con testo e
  anteprima, e nell'anteprima la loro fascia è il bordo in alto (`syncTo` ne tiene conto). Nella
  riga ci sono anche i due gruppi della barra di formattazione (`toolbar.ts`); `fitBar` decide se le
  viste stanno al centro o, se il posto non basta, a destra. Il tutorial è in `tutorial.ts` (si apre
  la prima volta e da «Come si usa»; le prove nel browser lo segnano come visto, tranne la sua).
  `src/store/`: note, cartelle (`folders.ts`), impostazioni e misure delle sezioni (`layout.ts`,
  solo su quel dispositivo) nel browser (chiavi `glifo.*`).
  Glifo può essere aperto in più schede: ogni modifica parte da quello salvato, non dalla copia
  in memoria, e `main.ts` ascolta l'evento `storage` per aggiornare le altre schede.
- `src/schema/`: schemi stile draw.io con maxGraph (caricato solo quando serve). Nella nota sono
  blocchi ```schema con un JSON (`model.ts`: formato, controlli, colori dei due temi);
  `editor.ts` è l'editor a tutto schermo, `preview.ts` li disegna nell'anteprima,
  `src/editor/schemaBlocks.ts` li mostra nel testo come una riga con «Modifica» e ne protegge le
  righe ``` (quello che si scrive o arriva dai pulsanti sul bordo dello schema va su una riga sua). Il testo delle
  forme passa sempre da `label.ts` (escape + KaTeX): maxGraph lo inserisce come HTML.
  Nei file .md (`file.ts`, usato da «Salva .md» e «Apri .md») ogni schema diventa un'immagine
  SVG, che VS Code mostra, più il JSON in un commento HTML; aprendo il file torna un blocco.
  Le forme in più (anche quelle delle basi di dati: entità debole, attributi a pallino, tabella)
  sono in `shapes.ts`; il testo delle tabelle (nome, campi, PK/FK) lo fa `tableHtml` in
  `label.ts`, e nell'editor si scrive in due parti, il nome e i campi (`splitTable`/`joinTable`
  in `model.ts`). Una riga di campo è `PK FK Nome: TIPO` (`tableField`/`fieldLine`); il pannello a
  destra cambia gli stessi campi (`tableSection` nell'editor) e `sql.ts` ne fa il codice SQL per
  ogni database (i test lo eseguono in PGlite e in SQLite). I modelli pronti sono in `templates.ts`, allinea e
  distribuisci in `arrange.ts`, PNG e «Copia come immagine» in `image.ts`. Menu e messaggi
  dentro l'editor vanno messi nella sua finestra (è modale: fuori restano sotto).
- `src/math/`: le espressioni delle formule (LaTeX o da calcolatrice): `parse.ts` le legge, `evaluate.ts`
  le calcola (`exact.ts` con le frazioni, `format.ts` scrive i risultati all'italiana; `domain.ts` i
  domini degli integrali doppi e tripli `\iint_D`: un «margine» positivo dentro, le condizioni una per
  una, gli strati quando ogni variabile sta tra due estremi; `complex.ts` i numeri complessi: si usano
  quando una formula ha la i o non ha un valore reale, con le frazioni esatte `GaussRational`, le radici
  tutte, le forme a + bi e ρe^{iθ}; `linear.ts` vettori e matrici, con le frazioni esatte (`EXACT`) o
  con la virgola (`FLOAT`): determinante, inversa, rango, nucleo, autovalori, polinomio caratteristico, e la
  geometria (segmenti, rette, circonferenze, piani, poligoni, angoli, intersezioni: `geometryOf`); i
  risultati con le matrici hanno `rich` e l'editor li disegna con KaTeX; `symbolic.ts` i conti con le
  lettere: derivate (`f'(x)`, nodi `diff` da `\frac{d}{dx}` e `\partial`), gradiente, divergenza, rotore,
  hessiana e jacobiana, con le semplificazioni (`tidy`: frazioni unite, polinomi in ordine, fattori
  raccolti); il foglio li usa con `expandCalculus` e, se restano lettere, mostra la formula;
  `calculus.ts` gli integrali di linea e di superficie (nodi `lint` e `sint`) sulle curve, superfici e
  campi definiti (`Scope.vfns`, con l'intervallo dopo la virgola: t \in [0, 2\pi]); `limits.ts` i limiti
  (nodo `lim`, con i numeri: Richardson; le forme 0/0 prima con le derivate esatte, `zeroOverZero` in
  `symbolic.ts`) e le serie fino a ∞, con `recognize` per π²/6, e, ln 2; in più variabili (`vars` nel nodo
  `lim`, \lim_{(x, y) \to (0, 0)}) `severalLimit` prova le rette e le parabole e poi tutto attorno al punto;
  `several.ts` l'analisi in più variabili: i punti critici con l'hessiana (`criticalPoints`, anche da
  `\nabla f = 0 \Rightarrow`), gli estremi vincolati con Lagrange e assoluti su un insieme (`extremaOf`:
  dentro, sul bordo e negli spigoli; `\max_{…} f` è un nodo `fn` max con `base`), i punti trovati con Newton
  smorzato e riconosciuti esatti con `exactNear` (controllati con le lettere); Taylor in più variabili è
  `taylorSeveral` in `symbolic.ts`; `conics.ts` le coniche e le quadriche dall'equazione
  (`\operatorname{conica}`, `\operatorname{quadrica}`: le matrici dei coefficienti, gli elementi esatti con gli
  assi cartesiani, `ConicElements` per i grafici); `arithmetic.ts` l'aritmetica e i polinomi
  (`arithmeticShown`: fattori primi, divisori, primi, Euclide, Bézout, inverso, Eulero, diofantee, basi,
  scomporre con il raccoglimento e i prodotti notevoli, Ruffini; `solveCongruences` per le congruenze con ⇒,
  nodi `congr`; `(1011)_2` lo legge `readBases` in `parse.ts`, prima dei token; `b^e \bmod n` esatto in
  `exact.ts`); `finite.ts` gli insiemi scritti elemento per elemento (`finiteValue`, nel foglio prima di
  tutto; quelli che vengono dalle operazioni restano nella nota con `finiteSetOf`; ∅, 𝒫, ∁ e … sono nomi);
  `logic.ts` la logica (`logicShown`, sul testo prima della lettura: le tavole di verità, le forme
  normali); `powerseries.ts` le serie di potenze (nel foglio da `showLimit`, quando il termine ha una
  lettera libera: il raggio con i logaritmi dei coefficienti, gli estremi con `seriesSum`); `fourier.ts` la
  serie di Fourier (`fourierProblem` legge funzione, intervallo e tratti; i coefficienti con n come lettera,
  i prodotti di seni e coseni fatti somme con `linearTrig`, poi sin(kπn) = 0 e cos(kπn) = (−1)^{kn};
  `partialSum` per i grafici, `src/graph/fourierGraph.ts`); `laplace.ts` la trasformata con la tabella e
  l'antitrasformata con i fratti semplici (`\mathcal{L}` è il nodo `fn` laplace, con ^{-1} ilaplace),
  controllate con l'integrale fatto con i numeri; `numerical.ts` il calcolo numerico (`numericalShown`
  con un `NumericContext` dal foglio, `numericContext`; le tabelle dei passi; `numericalPlot` per il disegno,
  `src/graph/numericalGraph.ts`); `inference.ts` la statistica inferenziale (`confidenceShown`,
  `hypothesisTest` e `chiSquareTest` con un `InferenceContext` dal foglio: le statistiche scritte come
  relazioni, \bar{x} = …, s = …, n = …, e l'ipotesi alternativa \mu > 10; il disegno della regione di rifiuto
  in `src/graph/inferenceGraph.ts`); `solve.ts` le equazioni, le
  disequazioni e i sistemi di una formula che finisce con ⇒ (`solveRequest`); `differential.ts` le
  equazioni differenziali di ogni ordine (`odeOf`, anche y'' + y = 0; `withPrimes` scrive dy/dx, ẋ e y'(x)
  come y') con le condizioni iniziali anche in formule dopo, risolte con Runge–Kutta (`odeSolution`);
  `odesolve.ts` le risolve con la formula dopo ⇒ (`differentialRequest`, `solveDifferential`, chiamato da
  `solveAll` nel foglio prima delle equazioni): ogni soluzione è una famiglia con le costanti c, c₁, c₂
  come lettere (lineare nelle costanti: gruppi e parte particolare, `Shape`), controllata con i numeri
  (`satisfies`); la somiglianza con le esponenziali complesse (`Wave`, `similar`), i sistemi di due
  equazioni per eliminazione, le condizioni come sistema nelle costanti (`cauchy`); i polinomi di Taylor sono `\operatorname{taylor}`
  in `symbolic.ts`; `primitive.ts` le primitive (nodo `prim`, `\int f \, dx` senza estremi; ognuna
  controllata derivandola con i numeri, `verified`), con i polinomi di `polynomial.ts` (fratti semplici);
  `definite.ts` gli integrali definiti con la primitiva, esatti o impropri, controllati con i numeri;
  `study.ts` lo studio di funzione, `\operatorname{studio}(f) =`: dominio a pezzi, segno, limiti,
  asintoti, derivate, massimi, minimi e flessi trovati con i numeri e riconosciuti esatti, le periodiche
  in un periodo; `studyRows`/`studyTable` lo scrivono una riga per informazione, `studyPart` le parti;
  la probabilità: `$X \sim B(10, 0{,}3)$` è un nodo `dist` che il foglio tiene in `randomVars`, `special.ts` le
  funzioni speciali (Φ, gamma e beta incomplete), `distributions.ts` le distribuzioni (densità, ripartizione,
  quantili, e i valori esatti come `ExpSum`: frazione + Σ coef·e^{−rate}), `probability.ts` gli eventi di P(…)
  (nodo `prob`) come intervalli e E[…] (nodo `expect`), passati ai conti con `Scope.random` (e
  `ExactScope.random`); `statistics.ts` la statistica dei dati sui vettori (con `Field`, esatta o con la
  virgola, da `linear.ts`), `statsShown.ts` come si scrivono i risultati (3/8 = 0,375; tabelle; retta);
  `linsys.ts` i sistemi lineari (A x = b con Rouché–Capelli, `matrixEquation`; con un parametro,
  `parametricSystem`: i valori speciali sono le radici del MCD dei minori, `polyDeterminant` con Bareiss;
  le incognite sono x, y, z, w, t e il parametro l'altra lettera), `spaces.ts` diagonalizzare, Gram–Schmidt,
  segnatura (Cartesio sul polinomio caratteristico), dipendenza, equazioni dei sottospazi, rango con un
  parametro; le matrici con un parametro della nota restano scritte (`symbolicNodes` nel foglio) e si
  mettono al posto del nome (`inline`); `U \cap W` è un prodotto con `cap`, `U^\perp` un esponente `⊥`,
  `sheet.ts` è il
  «foglio» della nota: le formule dall'alto in basso, `$a = 2$` e `$f(x) = …$` definiscono, una formula
  che finisce con `=` ha il risultato (nell'editor `src/editor/calcResults.ts`, Tab lo scrive;
  nell'anteprima colorato, classe `calc-result`). `\log` è il logaritmo naturale.
- `src/graph/`: i blocchi ```grafico (una riga per funzione, curva, punto, vettore, area di un integrale; `spec.ts`), il campionamento
  con salti e asintoti e la finestra scelta da sola (`plot.ts`), il disegno SVG (`svg.ts`, colori
  validati con la skill dataviz), l'anteprima interattiva (`preview.ts`) e i file .md (`file.ts`, come
  gli schemi). Le definizioni della nota arrivano al blocco in `data-defs` (vedi `render/markdown.ts`).
  Gli slider: ogni numero scritto con le cifre che il grafico usa ne ha uno (`spec.sliders`);
  `parseGraph(…, values)` rifà il grafico con altri valori senza cambiare la nota (file .md e stampa
  usano quelli scritti). Un integrale (`\int_0^2 x^2 \, dx`) è un'area (`kind: 'area'`, `sampleArea`
  in `plot.ts`): sotto una curva che un'altra riga disegna già prende il suo colore (lo decide come
  sono scritte le righe, `curveKeys`), se no disegna anche la curva. Con la z (o una funzione di x e y, o tre
  coordinate) il grafico è 3D (`spec.dim`, `isSpaceLine`, `spaceItemFor`): `space.ts` fa superfici, piani,
  curve e la scatola, `view3d.ts` il disegno (algoritmo del pittore; i piani dividono lo spazio e si disegna
  prima quello dietro), `picture.ts` il disegno fermo per pannello e file .md. Il valore si può anche scrivere nella casella accanto (`typedSliderValue`;
  fuori dallo slider, `widenSlider` lo allarga). «Aggiungi lo slider per k» passa da `onAddToGraph`
  (`src/ui/preview.ts`) a `addToGraphBlock`. Il pulsante «Grafico» e il grafico nel pannello della
  formula: `src/editor/graphInsert.ts`. Le zone (disuguaglianze, insiemi, domini degli integrali
  doppi) e i solidi (con la z, integrali tripli, volumi sotto le superfici) sono in `regions.ts`; il 3D
  (`space.ts` e `view3d.ts`, tutto in SVG con l'algoritmo del pittore) disegna i solidi condizione per
  condizione (`solidFaces`) o, se il dominio è a strati, faccia per faccia (`layeredFaces`, anche in
  coordinate cilindriche e sferiche). Con i numeri complessi il grafico è il piano di Gauss (`gauss.ts`,
  `spec.gauss`): numeri come frecce (`kind: 'complex'`), radici e soluzioni come punti, equazioni e
  disuguaglianze in z come curve e zone (i lati si calcolano con `compileComplex`). Le figure della
  geometria (`\triangle ABC`, `\overline{AB}`, `\widehat{BAC}`, `\operatorname{retta}(A, B)`) passano da
  `linearItem` in `spec.ts`; `\overline{AB}` con due maiuscole è un segmento, non il coniugato (vedi
  `isComplexLine`). I punti della nota che una figura usa si aggiungono con `fromNote`; i nomi dei punti
  li mette `nameSpot` in `svg.ts`, nella direzione libera più lontana dalla figura. I campi di vettori
  (`field`, `field3`), le curve con il nome (con `arrow`, la freccia del verso), le superfici con il nome
  e gli integrali di linea e di superficie sono in `fields.ts`: le definizioni con i valori vettori del
  blocco passano dal foglio (`sheet.define`), come nella nota. Lì anche le curve di livello
  (`\operatorname{livelli}(f)`, `kind: 'contour'`) e le equazioni differenziali: del primo ordine il campo di
  direzioni (`kind: 'slopes'`, livelli e soluzioni in `ode.ts`), di ordine più alto la soluzione come
  funzione; un sistema di due equazioni il ritratto di fase (`kind: 'phase'`, `systemOf` in
  `differential.ts`, traiettorie e punti di equilibrio in `ode.ts`). I punti critici e gli estremi in più
  variabili (curve di livello, vincolo, punti M, m, S) sono in `severalGraph.ts`, le coniche con i loro
  elementi in `conicGraph.ts` (una riga `\operatorname{quadrica}(…)` diventa la sua equazione). Un polinomio di Taylor da solo porta nel blocco anche la riga della sua funzione (se nessuna
  la disegna già, `curveKeys`). Lo studio di funzione (`\operatorname{studio}(f)` e le sue parti) è in
  `studyGraph.ts`: la funzione, gli asintoti con `dashed` (tratteggiati in `svg.ts` e nella legenda) e i
  punti M, m, F. La probabilità e i dati sono in `statsGraph.ts`: le distribuzioni come barre (`kind: 'bars'`) o
  densità, P(…) come area o barre dell'evento, istogrammi, barre, dispersione e regressione; `extent` dice la
  parte dell'asse x da mostrare e `data` toglie le stesse unità sui due assi. Le variabili aleatorie del blocco
  (`X \sim B(n, p)` con n e p del blocco) si fanno in `readGraph` prima di disegnare.
- `src/ai/`: assistente AI. `src/host.ts`: funzioni della demo dentro claude.ai.
- `src/account/`: account e sincronizzazione. `sync.ts` è il motore (manda, scarica, nei
  conflitti tiene tutte e due le versioni), `controller.ts` decide quando sincronizzare,
  `space.ts` tiene le note di ogni account in uno spazio a parte del browser (`glifo.u.<id>.…`),
  `supabase.ts` fa l'accesso con Google o via email (il link aperto qui o incollato, o il
  codice) e controlla che l'accesso salvato nel browser sia dell'account aperto prima di
  sincronizzare, scaricare o eliminare. Il client di Supabase si carica solo se si accede.
- `src/share/`: le note condivise con un link, come in Gemini (una fotografia della nota): `link.ts`
  (il link `nota.html#codice`; la nota si legge con la sola chiave pubblica, senza il client di
  Supabase), `dialog.ts` (la finestra «Condividi», come quelle di Google), `page.ts` (la pagina
  `nota.html`: la nota in sola lettura e «Salva una copia»). Le chiamate dell'account (`shareNote`,
  `sharedLinks`…) sono in `src/account/supabase.ts`; nel database la tabella `shared_notes` e le
  funzioni della migrazione «note condivise» (vedi supabase/README.md).
- `privacy.html` e `nota.html`: l'informativa sulla privacy e la pagina delle note condivise, altre
  due pagine della build (vedi `vite.config.ts`); l'informativa è collegata da `src/ui/links.ts`.
- `supabase/`: il database degli account (progetto Supabase `glifo`, Francoforte, piano
  gratuito): tabelle e regole di accesso in `migrations/`, test in `tests/`. Il README spiega
  indirizzo, chiave pubblica, sincronizzazione (`sync_pull`/`sync_push`) e come si cambia.
  `npm test` prova le migrazioni in un Postgres in memoria (PGlite, con
  `supabase/tests/supabase-stub.sql` al posto di Supabase).

## Promemoria per lo studente

Quando chiede «cosa dovevo fare?», ricordagli queste cose (e toglile da qui quando sono fatte):

- Decidere se Glifo passa sotto S&Z (dominio `seznet.net`) e dare un'email di contatto per
  l'informativa (`privacy.html`). Poi, aggiornata l'informativa, premere «Publish app» nella
  Google Auth Platform (Audience) per aprire a tutti l'accesso con Google. I passi sono in
  «Come si riprende», al passo 4 di ROADMAP.md.
- Riparlare della condivisione: le cartelle condivise con persone scelte e i loro permessi (come
  nella finestra «Condividi» di NotebookLM) e lo scrivere insieme senza conflitti. Il 4 ottobre
  2026, fatto il link, lo studente ha chiesto di tenerlo per dopo e di sistemare prima la
  grafica: le idee sono al passo 5 di ROADMAP.md.

## Regole

- Per capire il codice usa prima `graphify query`, `graphify explain` o `graphify path`. Apri i file solo nelle parti che servono, mai interi.
- Ogni push sul branch predefinito esegue test e build e pubblica il sito
  (`.github/workflows/deploy.yml` → branch `gh-pages`).
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
- Solo servizi gratuiti, finché lo studente non decide diversamente.
- Se cambia quali dati Glifo tiene o a quali servizi li manda (per esempio l'accesso con
  Google), aggiorna `privacy.html` e la sua data.

## Come controllare il lavoro

- Online si dice solo dopo averlo visto: dopo il push, sul branch `gh-pages` deve arrivare il
  commit «Pubblica <sha>» e su GitHub l'azione «pages build and deployment» deve finire con
  successo.
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

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
