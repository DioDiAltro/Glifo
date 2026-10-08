# Glifo – architettura

La mappa dettagliata del codice, tolta da CLAUDE.md per tenerlo corto: si leggono solo le parti
che servono. Le regole da tenere sempre a mente sono anche in CLAUDE.md, in «Attenzione a».

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
  Schemi, grafici e tabelle si spostano nella nota con le frecce ↑ ↓ dell'anteprima, come le celle di Colab
  (6 ottobre 2026; i nomi e le classi dei tre blocchi sono in `BLOCK_NAMES` di `src/ui/moveButtons.ts`): `blockMove.ts` fa i conti sui token dei blocchi di markdown-it (`parseBlocks` in
  `markdown.ts`, lo stesso parser dell'anteprima). La regola `block_moves`, subito dopo i blocchi,
  scrive `data-hash` (l'impronta del contenuto: il testo di `data-graph` DOMPurify lo accorcia) e
  `data-move` (le frecce accese; senza, niente frecce: citazioni, note a piè di pagina, blocchi aperti,
  «- ```grafico»); `moveFencedBlock` fa saltare il blocco oltre il fratello visibile (nella nota o nella
  stessa voce d'elenco; riferimenti, note e commenti restano attaccati al blocco prima), aggiunge righe
  vuote solo se servono e rilegge il testo: se la nota cambierebbe in altro, 'structure' e non si fa.
  Non si scavalca HTML che il browser non chiude (`swallows`: un «<!--» o uno <script> aperti nascondono il
  resto). `src/editor/moveBlock.ts` ne fa una modifica (un passo di Annulla, `move.block` con
  `isolateHistory`; guardBlocks la lascia passare; cursore e selezioni vanno con le loro righe) e con
  `blockMoves` (`invertedEffects`) dice le righe nuove anche con Annulla e Ripeti; `src/ui/moveButtons.ts`
  le frecce (`aria-disabled` ai bordi, così il fuoco resta). Nell'anteprima (`src/ui/preview.ts`) il clic
  ridisegna subito (`flush`), la freccia resta sotto il puntatore con il fuoco, `held` la tiene ferma finché
  non si torna all'editor o si cambia nota, `follow` le fa seguire l'editor solo nella vista divisa; se il
  blocco spostato non si vede (in un `<details>` chiuso, dopo un commento aperto) si annulla con l'avviso;
  i `<details>` aperti restano aperti. Gli slider hanno nella chiave la nota e la riga: `remapGraphLines`
  li sposta con i blocchi (da `onBlockMoved`), `renameGraphScope` quando la nota cambia id; il contenitore
  dei pulsanti degli schemi (e delle tabelle) è `.schema-preview-tools` (`.schema-tools` è la barra dell'editor degli schemi).
- `src/ui/`: interfaccia (`resize.ts`: i bordi da trascinare tra le sezioni). Non c'è una barra in
  alto: la barra laterale è l'elenco degli appunti (`notesPanel.ts`) con sopra il logo (niente
  titolo della nota) e in fondo la riga `foot` con «Apri .md» e «Salva .md» (icona e testo, larghi
  uguali) e l'icona di «Condividi», senza spazi vuoti (la stampa è nella finestra «Condividi»), poi
  l'account, il fumetto dei «Commenti» (`comments.ts`: la pagina con i commenti visibili divisi in
  problemi, idee e altro, letti dalla tabella `feedback` di Supabase con la sola chiave pubblica,
  senza il client, e solo le colonne che il database dà a tutti; da lì «Scrivi un commento» apre
  `feedback.ts`, sopra la pagina: tipo, testo, nome ed email facoltativi e la spunta per farlo vedere,
  e il testo resta finché non parte; dentro claude.ai non si leggono e non partono), «Come si usa» e
  le impostazioni (`sidebarTop`, `shareButton` e `sidebarBottom` in `main.ts`; il tema si cambia
  solo nelle impostazioni; con tre pulsanti sono larghi 30 px, così sotto «Accedi» si legge tutto). Lo stato del salvataggio non si vede: è in `data-save` sulla pagina,
  per le prove nel browser. Il logo apre e chiude la
  barra (`sidebarToggle`, come in Gemini) e sta nello stesso punto da aperta e da chiusa;
  i pulsanti volanti (simboli, viste) sono in `.float-bar`, dentro `.content` con testo e
  anteprima, e nell'anteprima la loro fascia è il bordo in alto (`syncTo` ne tiene conto). Nella
  riga ci sono anche i due gruppi della barra di formattazione (`toolbar.ts`); `fitBar` decide se le
  viste stanno al centro o, se il posto non basta, a destra. Il tutorial è in `tutorial.ts` (si apre
  la prima volta e da «Come si usa»; le prove nel browser lo segnano come visto, tranne la sua);
  chiuso quello della prima volta, o lasciato per le scorciatoie, `showTutorialHint` mostra un
  fumetto che punta al «?» (o al logo, se la barra è chiusa) e se ne va da solo dopo 8 secondi.
  I messaggi brevi in basso sono `toast.ts`; con un pulsante (per esempio «Ricarica») restano finché
  non lo si preme o non li si chiude. `siteUpdate.ts` (8 ottobre 2026) serve quando il sito si aggiorna con
  la pagina aperta: i file delle parti caricate solo quando servono (gli editor di schemi e tabelle, i
  file Excel) hanno nel nome un'impronta e la versione nuova toglie quelli vecchi. Ogni `import()` per
  un'azione dello studente passa da `loadPart`, che dice perché non arriva (Glifo aggiornato, senza
  rete) e offre «Ricarica» (`reloadForUpdate` in main.ts salva prima la nota). `watchSiteUpdates`
  avvisa della versione nuova quando si torna sulla pagina (non con un editor aperto, non dentro
  claude.ai). In main.ts `loadingEditor` dice «Apro l'editor…» se l'editor tarda, e `warmEditors`
  carica in anticipo l'editor degli schemi o delle tabelle della nota aperta, così «Modifica» lo apre
  subito anche dopo una pubblicazione.
  `src/store/`: note, cartelle (`folders.ts`), impostazioni e misure delle sezioni (`layout.ts`,
  solo su quel dispositivo) nel browser (chiavi `glifo.*`).
  Glifo può essere aperto in più schede: ogni modifica parte da quello salvato, non dalla copia
  in memoria, e `main.ts` ascolta l'evento `storage` per aggiornare le altre schede.
- `src/schema/`: schemi stile draw.io con maxGraph (caricato solo quando serve). Nella nota sono
  blocchi ```schema con un JSON (`model.ts`: formato, controlli, colori dei due temi);
  `editor.ts` è l'editor a tutto schermo, `preview.ts` li disegna nell'anteprima,
  `src/editor/schemaBlocks.ts` li mostra nel testo come una riga con «Modifica» e ne protegge le
  righe ``` (quello che si scrive o arriva dai pulsanti sul bordo dello schema va su una riga sua);
  lo stesso fa con le tabelle ```tabella (`findWidgetBlocks`, `WidgetKind`). Il testo delle
  forme passa sempre da `label.ts` (escape + KaTeX): maxGraph lo inserisce come HTML.
  Nei file .md (`file.ts`, usato da «Salva .md» e «Apri .md») ogni schema diventa un'immagine
  SVG, che VS Code mostra, più il JSON in un commento HTML; aprendo il file torna un blocco.
  Le forme in più (anche quelle delle basi di dati: entità debole, attributi a pallino, tabella)
  sono in `shapes.ts`, con le corsie dei processi (`lanes`: un riquadro solo, diviso in parti
  uguali, in colonne o in righe con `rot` 1; i nomi uno per riga del testo, `laneNames`; `LanesShape`
  disegna fascia e divisioni, `lanesHtml` in `label.ts` i nomi, `laneAt`/`insideLanes` in `model.ts`
  i conti). Le forme del processo non stanno dentro le corsie (lo schema resta un elenco di forme)
  ma sopra: le corsie vanno dietro (`orderCells`), si prendono solo dalla fascia dei nomi (`setUpLanes`
  nell'editor: `fireMouseEvent` toglie la cella dagli eventi sul resto, `intersects` fa lo stesso per
  `getCellAt`), e spostandole o duplicandole vengono con loro le forme con il centro dentro e le frecce
  tra queste (`withLaneContents`, anche in `SelectionHandler.getCells`); non si collegano
  (`isValidTarget`); il pannello ha nomi, «Aggiungi corsia» e il verso (`lanesSection`, `setLanes`:
  le altre corsie restano grandi com'erano). Il testo delle tabelle (nome, campi, PK/FK) lo fa `tableHtml` in
  `label.ts`, e nell'editor si scrive in due parti, il nome e i campi (`splitTable`/`joinTable`
  in `model.ts`). Una riga di campo è `PK FK Nome: TIPO` (`tableField`/`fieldLine`); il pannello a
  destra cambia gli stessi campi (`tableSection` nell'editor) e `sql.ts` ne fa il codice SQL per
  ogni database (i test lo eseguono in PGlite e in SQLite). I modelli pronti sono in `templates.ts`, allinea e
  distribuisci in `arrange.ts`, PNG e «Copia come immagine» in `image.ts`. Menu e messaggi
  dentro l'editor vanno messi nella sua finestra (è modale: fuori restano sotto).
- `src/spreadsheet/`: le tabelle con le formule, come Excel (6 ottobre 2026). Nella
  nota sono blocchi ```tabella con una riga di testo per riga della tabella (`model.ts`: le celle tra
  |, `\|` per la barra; la riga con i trattini dopo la prima dice che c'è l'intestazione e non conta
  tra le righe: come in Excel la riga 1 è quella dei titoli; il grassetto `**…**`; il formato tra
  graffe in fondo alla cella, `{0,0%}`, solo quando non si capisce già dal contenuto). Le formule
  all'italiana in `formula.ts` (`tokenize`, `parseFormula`; `shiftFormula` per copiare, `adjustFormula`
  per righe e colonne aggiunte o tolte, `normalizeFormula` per i nomi in maiuscolo e in italiano,
  `formulaRefs` per colorarle); le funzioni in `functions.ts` (i nomi dell'Excel italiano con gli
  alias inglesi, una riga di aiuto ciascuna; come in Excel i testi negli intervalli si saltano e un
  errore ferma la funzione, `Stop`); i conti in `evaluate.ts` (`SheetEvaluator`: ogni cella una
  volta, i riferimenti circolari sono #RIF!, la prima volta tutte dall'alto così le catene restano
  corte, `MAX_DEPTH`); in `format.ts` i numeri all'italiana e i formati: i risultati prendono il
  formato da quello che usano, come le unità di misura (`addFormat`, `mulFormat`, `divFormat`,
  `withCents`). L'anteprima la calcola subito nel Markdown (`sheetHtml` in `render.ts`, dal renderer
  dei fence di `src/render/markdown.ts`): il testo delle celle passa da `md.renderInline` e poi da
  DOMPurify come il resto, i testi che escono dalle formule si scappano; `preview.ts` aggiunge
  «Modifica» e le frecce (`hydrateSheets`, solo nella propria nota). `main.ts` apre l'editor
  (`openSheet`, caricato solo quando serve, con `loadPart`) e rimette il blocco con `saveSheetBlock`, ritrovandolo
  dal testo o dall'impronta dell'anteprima (`findSheetBlock`, `findSheetBySource` in `blocks.ts`). Nei
  file .md (`file.ts`) la tabella di Markdown con i risultati (`sheetMarkdown`) e il blocco in un
  commento `glifo-tabella` (& e > scappati). L'editor (`editor.ts`) lavora su una copia della
  tabella (le modifiche in `ops.ts`, `cloneSheet` per Annulla); menu, suggerimenti e messaggi stanno
  dentro la sua finestra (è modale). Col tocco si comincia a scrivere nella cella già scelta alla fine
  del tocco (`click`, `tapEdit`): i clic finti che il telefono manda dopo il tocco porterebbero via il
  fuoco dalla casella. Quando la finestra cambia misura (sul telefono anche perché si apre la
  tastiera) la scrittura resta aperta e la casella torna sopra la sua cella (`placeCellInput`):
  chiuderla chiudeva subito anche la tastiera. Col tocco le caselle in cui si scrive hanno i caratteri
  da 16px, se no l'iPhone ingrandisce la pagina. I grafici dei dati (`chart.ts`): `chartData` legge un
  intervallo (la prima colonna è l'asse x, la prima riga i nomi se è di testo, i numeri calcolati con il
  formato della colonna); il pulsante «Grafico» dell'editor sceglie le celle (`chartRange`: con una cella
  sola il blocco attorno, `currentRegion`, o il primo che ha dati) e scrive le righe del blocco
  (`chartLines`, con `pareggio:` se ci sono i ricavi e i costi totali, senza l'utile in fondo); `main.ts`
  le mette sotto la tabella o rifà il grafico dello stesso tipo tra quelli che la seguono (`placeChart`,
  `tableChartKind`: dati, Gantt, reticolo; il nuovo va dopo gli altri). Le attività di un progetto
  (`plan.ts`): `planData` legge un intervallo con la prima riga dei nomi (`columnRole` riconosce durata
  con l'unità, precedenti, chi, descrizione, fatto e i tempi calcolati a mano da controllare; i codici e
  le precedenti si leggono dal testo scritto, così «1,2» sono due attività); con la durata e le
  precedenti (`isPlanRange`) «Grafico» apre un menu: Gantt o reticolo. I file (`xlsx.ts`, `csv.ts`, menu
  «File» dell'editor): lo zip lo fa fflate (caricato con l'editor), l'XML Glifo; le formule passano
  all'inglese (`toExcelFormula`, `EXCEL_NAMES`: ogni funzione deve averne uno, lo controlla un test) e
  ritorno (`fromExcelFormula`: le virgole inglesi sono sempre separatori; quelle che Glifo non sa fare
  restano valori, `valuesOnly`), con le formule condivise spostate (`shiftFormula`) e i formati che le
  formule hanno già da soli tolti (`dropInferredFormats`); le date diventano testo. I .csv si leggono
  con il separatore capito da solo (`csvDelimiter`) e si scrivono per l'Excel italiano (punto e
  virgola, i valori come si vedono, BOM). Un testo che sembrerebbe un numero o una formula prende
  l'apostrofo (`textCell`). «Apri .md» apre anche .xlsx e .csv (`OpenedFile.bytes` in
  `src/store/files.ts`, `tablesNote` in `main.ts`: una nota con una tabella per foglio); di questi file
  non si tiene l'handle, se no «Salva .md» ci scriverebbe sopra. Nella barra il pulsante della tabella è un menu (`tableMenu` in
  `src/ui/toolbar.ts`): con le formule o di testo, perché la barra deve stare in una riga. Per le
  prove nel browser le celle della griglia hanno l'id `sheet-<riga>-<colonna>` (da 0).
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
  raccolti); il foglio li usa con `expandCalculus` e, se restano lettere, mostra la formula; gli integrali
  definiti con le lettere, uno dentro l'altro o dentro un'espressione li fa `definiteValue` (il `Converter`
  con `definite`: le lettere sono numeri positivi, `assumePositive` scioglie √(R²) = R; agli estremi infiniti
  `limitAtInfinity`; `cancelLinear` semplifica (b³ − a³)/(b − a)) e il foglio li mostra con `showDefinite`
  solo se tornano con i numeri (`checked`, tre scelte di valori per le lettere);
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
  controllata derivandola con i numeri, `verified`), con i polinomi di `polynomial.ts` (fratti semplici) e,
  con le lettere nei coefficienti, `quadraticRootLetters` e `rationalLetters` (√(R² − x²), 1/(x² + a²));
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
  nell'anteprima colorato, classe `calc-result`). Con il risultato scritto
  (`$\int_0^1 x^2 \, dx = \frac{1}{3}$`) c'è il controllo (`Sheet.read`, `check`): la domanda è la prima
  parte che si sa calcolare (`resultOf`), le altre valgono quanto lei (con le lettere per tre scelte di
  numeri, i decimali arrotondati o troncati con `writtenSlack`, la primitiva tra gli estremi
  `\left[…\right]_a^b` con `bracketValue`); definizioni, equazioni e formule con ⇒ no. Una parte senza un
  valore (1/0, 0/0: in JavaScript ∞ e NaN) non si giudica, né ✓ né ✗ (`sameAs`, `sameScalar`, `same`; il 7
  ottobre 2026 `$1/0 = 5$` aveva il ✓). Il segno ✓/✗ è in
  `src/render/check.ts` (nell'editor il ✗ aspetta che il cursore esca dalla formula); i controlli fatti
  li ricorda `checks`, con l'impronta delle definizioni (`state`). `\log` è il logaritmo naturale.
  π, e o un numero della nota davanti a una parentesi sono un prodotto (`callsUnknown`: \pi \left(…\right)
  non è una funzione che manca). `Sheet.same` dice se due espressioni valgono lo stesso anche quando
  nessuna è un conto ((x + 1)^2 e x^2 + 2x + 1, la primitiva tra gli estremi), per i passaggi delle
  spiegazioni (`src/ai/explain.ts`).
- `src/graph/`: i blocchi ```grafico (una riga per funzione, curva, punto, vettore, area di un integrale; `spec.ts`), il campionamento
  con salti e asintoti e la finestra scelta da sola (`plot.ts`), il disegno SVG (`svg.ts`, colori
  validati con la skill dataviz), l'anteprima interattiva (`preview.ts`) e i file .md (`file.ts`, come
  gli schemi). Le definizioni della nota arrivano al blocco in `data-defs` (vedi `render/markdown.ts`).
  I numeri di una tabella (`tableGraph.ts`): la riga `dati: A8:D13` prende l'ultima tabella prima del
  grafico (il renderer tiene il suo testo in `env.table` e scrive i dati in `data-table`, letti da
  `readChart` nell'anteprima e nei file .md); le colonne sono elementi `series` (linee con i pallini,
  `texts` i valori come nella tabella), `pareggio:` aggiunge le aree `gap` (utile e perdita, `tone`,
  con i colori di stato `gain`/`loss` della palette e il nome dentro con `insideSpot`) e i punti `mark`
  (`breakEven`). Con i dati la finestra parte da zero e lascia lo spazio ai numeri (`dataWindow` in
  `plot.ts`), le tacche hanno i punti delle migliaia (`tickLabel` con `grouped`) e non c'è la O.
  Il diagramma di Gantt e il reticolo (`gantt:` e `reticolo:`, con `titolo:` e `inizio:`; `planBlock.ts`)
  prendono le attività dalla stessa tabella: il renderer le scrive in `data-plan` (`planData`), e
  `hydrateGraphs` per questi blocchi usa `PlanView` (`planPreview.ts`: un disegno fermo, niente
  spostare, ingrandire e slider; «Scarica» e «Titolo…»). `schedule.ts` fa i conti del percorso critico
  (in avanti e all'indietro, con i legami FI, II, FF, IF e lo scarto come in Project, `parseLinks`;
  i giri e i codici sbagliati sono `problems` con la riga della tabella, i tempi scritti a mano che non
  tornano `checks`), `gantt.ts` i disegni (il reticolo a colonne con i nodi finti per le frecce lunghe,
  l'ordine con i baricentri e le altezze con `place`, i minimi quadrati con i vincoli d'ordine) e la
  legenda, `planFigure.ts` la figura per «Scarica» e i file .md (`graphImagesFor`). Le larghezze dei
  testi si misurano nel browser con un canvas (`textWidth`), nei test si stimano larghe. Nel reticolo
  i nomi lunghi vanno a capo su due righe (`wrapText`, e allora tutti i riquadri sono più alti):
  accorciati, «Progettazione del database» e «… dell'interfaccia» sarebbero uguali. `parseGraph`
  salta le righe del Gantt (`planLine` in `tableGraph.ts`).
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
  formula: `src/editor/graphInsert.ts`. I grafici da mostrare: `titolo: …` e `asse x: …` (y, z) nel
  blocco (`labelLine`, `spec.title`, `spec.axes`; `labels.ts` li fa in HTML con KaTeX e, nei disegni, con
  le formule come testo SVG nei `<tspan>`); il pulsante «Scarica» (`openImageMenu` in `preview.ts`) dà la
  figura chiara su bianco 640 × 400 (`graphFigure` in `file.ts`, con la parte che contiene quella sullo
  schermo, `containing`) come PNG (`svgToPng` degli schemi), SVG o copiata; «Titolo e nomi degli assi…»
  scrive le righe nel blocco (evento `graph-labels` → `onGraphLabels` → `setGraphLabels`). Le zone (disuguaglianze, insiemi, domini degli integrali
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
- `src/board/`: la lavagna, per scrivere a mano accanto al testo (la vista «Lavagna», `ViewMode`
  `'board'`). `strokes.ts` i tratti come vettori (x, y e pressione) e la
  gomma che li taglia esattamente (`capsuleSpan`, `eraseStroke`); la gomma «Linea intera» toglie il
  tratto che tocca (`strokeTouched`), quella «Dove passa» si allarga andando veloce (`eraserGrowth`,
  con la velocità sullo schermo); gli evidenziatori sono tratti con `highlight` (colori a parte,
  `HIGHLIGHT_COLORS`), disegnati prima della scrittura e trasparenti. `shapes.ts` le figure precise:
  `recognize` (il tratto ricampionato, i vertici di Douglas–Peucker tenuti solo dove il tratto gira
  di colpo, `corners`; poi linea, freccia, spezzata, poligoni raddrizzati o ellisse; `strict` per le
  forme automatiche: niente spezzate, misure minime più grandi), `adjustShape` (la penna ancora giù
  la regola) e `shapePoints`; i tratti con `shape` hanno solo i vertici e si disegnano con il
  contorno di spessore uguale (`shapeSvg` in ink.ts). Le soglie sono state scelte provando tanti
  tratti simulati (tremolio, angoli arrotondati) e la scrittura. `selection.ts` la selezione, come
  in Note di Apple: il lazo (`insideLasso` conta i giri; `lassoed` prende i tratti dentro almeno per
  metà della lunghezza, `strokeAt` la linea toccata), il riquadro (`selectionBox`), spostare e
  ingrandire (`transformStrokes`, `handleScale`), le copie (`copyStrokes`), il colore (`recolor`) e
  `keepInside` per quello che si incolla; ogni cambiamento fa tratti nuovi con id nuovi (come la
  gomma), così le altre schede non tengono il disegno vecchio. `ink.ts` il contorno con
  perfect-freehand, le tre misure di ogni strumento (`TOOL_SIZES`) e i colori dei due temi
  (`BOARD_PALETTES`: nei tratti c'è il nome del colore);
  `store.ts` le lavagne in IndexedDB (`glifo-lavagne`, un tratto per record con la chiave [nota, id],
  le altre schede avvisate da un BroadcastChannel; in memoria se IndexedDB non c'è), il backup
  (`exportBoards`, `importBoard`) e `prune` (all'avvio toglie quelle senza nota, `noteIdsInBrowser`);
  `board.ts` il componente: penna con la pressione (vista una penna, `glifo.lavagna.v1`, un dito solo
  non fa niente e due dita spostano; un tocco mentre la penna scrive o entro `PALM_MS` è la mano: non
  conta, nemmeno sui pulsanti), dita, mouse, gomma, annulla e ripeti; la barra (penna, evidenziatore,
  gomma; i colori e il modo della gomma uno sopra l'altro in `.board-options`, così cambiando
  strumento non si sposta; sulla lavagna stretta si stringe con `@container`), il menu delle misure
  (`openMenu`: lo strumento premuto di nuovo o il pulsante con il pallino; scelte in
  `glifo.lavagna.v1`; nel menu della penna l'interruttore «Forme automatiche»; con il lazo, al posto
  di colori e misura, «Tutto» e «Incolla»), la selezione (`startSelect`: sulla selezione la sposta o,
  dal pallino nell'angolo, la ingrandisce, `MoveAction`, disegnata sopra con la trasformazione del
  canvas finché non si alza; fuori un lazo nuovo, `LassoAction`; il menu `openSelMenu` sopra i tratti
  presi, o «Incolla» toccando un punto vuoto; gli appunti `clipboard` restano cambiando nota; i passi
  di Annulla hanno `selection`, così la selezione torna com'era; le frecce di seguito sono un passo
  solo, `nudge`), le figure (la punta
  ferma `HOLD_MS` in `watchHold`/`holdShape`, poi `adjustShape` finché è giù; in `finishDraw` due
  passi, il tratto a mano e la figura con `pair`, così Annulla riporta il tratto), schermo intero (su iPad e iPhone
  senza quello del browser, `device.ts`: Safari ne usciva prendendo la penna per una tastiera; sotto,
  il resto dell'app è nascosto con `.board-full`). Sulla lavagna touchstart, touchmove e touchend
  sono annullati: sull'iPad selezionavano le parole e facevano partire Scribble. `touchlog.ts` è il
  registro dei tocchi (`glifo.registro.v1`, acceso nelle impostazioni da `src/ui/touchLogPanel.ts`;
  riprende all'avvio con `touchLog.resume()` in main.ts, perché il modulo finisce anche in nota.html):
  penna, dita e mouse (i movimenti uniti in una riga), le decisioni della lavagna (le righe con «→»,
  scritte da board.ts) e il browser (tocchi presi dal sistema, selezione, fuoco, scrittura, tastiera,
  schermo intero, pagina nascosta, errori), mai il testo delle note (`where`); il pallino rosso sulla
  lavagna lo apre, e lo studente lo copia o lo scarica per mandarlo nella chat. In `main.ts`
  la lavagna si toglie con la nota, segue la nota che cambia id con l'account (`replaced`,
  `adoptGuestNotes`) e uscendo dall'account si toglie, con l'avviso. Per le prove nel browser lo stato
  è in `data-strokes`, `data-note`, `data-loaded`, `data-tool`, `data-eraser`, `data-shapes`,
  `data-shape` (l'ultima figura) e `data-selected` (quanti tratti sono selezionati) sulla `.board-pane`.
- `src/ai/`: assistente AI, con la chiave di chi lo usa: Anthropic con l'SDK, o un servizio che parla la
  «lingua» di OpenAI (`services.ts`: Gemini gratis, OpenRouter, Ollama sul computer, un altro con il suo
  indirizzo; `askCompatible` in `assistant.ts` chiede lo schema, poi un oggetto JSON, poi niente, e legge la
  risposta con `jsonIn`). Chiave, modello e indirizzo di ogni servizio restano nel browser (`aiKeys`,
  `aiModels`, `aiUrls` nelle impostazioni). `src/host.ts`: funzioni della demo dentro claude.ai.
  «Spiegami» (7 ottobre 2026, online dall'8; il disegno è in ABBONAMENTI.md, «Le
  spiegazioni, come funzionano»): un Qwen3 piccolo che gira nel browser con WebLLM scrive i passaggi di
  un conto e il motore li firma. `localModels.ts` i modelli (Qwen3 0.6B, 1.7B, 4B: `webllmId` sceglie
  q4f16 o q4f32 secondo `shader-f16`), se sono già nella Cache Storage di WebLLM (`modelInBrowser`, senza
  caricarlo) e i messaggi con il worker; `llmWorker.ts` il worker con WebLLM (6 MB, solo lì: la pagina
  non lo importa mai), senza il ragionamento (`enable_thinking: false`); `local.ts` il lato pagina
  (`LocalLlm`, uno per pagina con `localLlm()`: carica una volta, risposte a pezzi, `stop` con Annulla,
  `localErrorMessage` in italiano). `tools.ts` il motore come strumenti nel formato dei Qwen3
  (`<tools>` nel messaggio di sistema, `<tool_call>` letti dal testo con le barre del LaTeX aggiustate,
  `<tool_response>` in un messaggio dell'utente): calcola, controlla, deriva, primitiva, risolvi, ognuno
  su un foglio nuovo con le definizioni della nota (`sheetFactory`); `checkFormula` controlla un
  passaggio prima come la nota (`Sheet.read`) e poi parte con parte con `Sheet.same` (`strict`, `soft`
  nelle equazioni: solo ✓). `explain.ts` il giro: `explainTarget` (un risultato dopo «=», un risultato
  scritto, le soluzioni dopo ⇒), il primo messaggio con il risultato di Glifo e la primitiva di ogni
  integrale (`engineHints`), fino a 3 giri di strumenti, `stepsIn` legge «1. frase $$formula$$» (anche
  \[…\], la formula in linea, i paragrafi; toglie «Una frase breve:», che Qwen3 copiava dal vecchio
  schema, e un «Risultato finale» senza conto in fondo). Il messaggio di sistema (`systemPrompt`) ha una
  riga d'esempio vera, una derivata (non uno schema da riempire), e i nomi giusti delle regole (teorema
  fondamentale del calcolo integrale, regola della potenza…). `checkSteps` (un ✗ con lettere che la formula non ha, come
  u = x², non è sicuro e non si dice; `reaches`: l'ultimo passaggio contro il risultato), `feedback` fa
  correggere fino a 2 volte e si tiene la spiegazione con meno ✗; il contesto è di 4096 token
  (`tooLong`). L'interfaccia è `src/ui/explainPanel.ts`: «Spiegami» nel riquadro della formula di
  `sidePanel.ts` (`.formula-actions`, solo su un conto: `regionToExplain` e `targetAt` in
  `src/editor/explainInsert.ts`, ricalcolati quando cambiano nota o formula) e sotto il riquadro la
  spiegazione (`.explain-box`: scaricamento, testo mentre arriva, passaggi con `checkHtml`, «Inserisci
  nella nota» con `insertExplanation` dopo il blocco della formula, «Rifai»); resta finché non si chiude.
  Dentro claude.ai lo dice subito (la pagina blocca i download). Impostazioni `localModel` ed
  `explainTone`, solo su questo dispositivo (`explainFieldset` in `src/ui/dialogs.ts`). Nella PWA il
  worker non è tra i file precaricati: alla prima spiegazione va nella cache `glifo-webllm`, per
  l'offline. Nelle prove nel browser il worker è sostituito da uno finto (`fakeLlmWorker` in
  `scripts/smoke-test.mjs`; per un grafico risponde con tre punti, uno sbagliato, per uno schema e una
  tabella con due punti se Glifo gli ha dato le frecce e i valori).
  «Spiega con l'AI» (7 e 8 ottobre 2026, online dall'8): il pulsante ✨ dopo `$$` (`aiToggle` in main.ts,
  in fondo agli inserimenti di `toolbar.ts`) mostra nel pannello a destra, al posto dei simboli, la vista
  `ai` (`SidePanel.setView` e `setOpen`, `PanelView`; `data-panel` su `.app` dice quale pulsante è acceso;
  il pulsante della vista che si vede chiude il pannello, l'altro cambia vista, Ctrl+K torna ai simboli):
  `src/ui/aiPanel.ts`, con l'elenco di `subjectsIn` (`src/editor/explainSubjects.ts`: i conti, letti con un
  foglio solo dall'alto in basso come i risultati, i blocchi ```grafico chiusi con le definizioni scritte
  prima, le formule senza un conto che dicono qualcosa, una volta sola (`worthExplaining`: una relazione o
  delle operazioni, non $x$, $\alpha$ o $\mathbb{R}$), e i teoremi del testo (`theoremsIn`: un titolo o un
  paragrafo, anche in un elenco, che comincia con Teorema, Definizione, Lemma, Proprietà…, fuori dai
  blocchi di codice; le formule dentro le spiega lui), e i blocchi ```schema e ```tabella chiusi che si
  leggono, con il nome da mostrare (`schemaTitle`, `tableTitle`); dall'albero completo di `ensureSyntaxTree`, che lo
  stato non restituisce: `formulasUntil` lo prende come `tree`) e, scelto uno, la spiegazione in un `ExplainPanel` suo (`explainSubject` con un
  `ExplainSubject`: un conto, o un `ExplainTopic` con il testo per ritrovarlo). L'elenco si rifà solo se
  si vede, 300 ms dopo l'ultima modifica; cambiando nota `reset` chiude la spiegazione. Per un grafico
  `graphTopic` (`src/ai/topics.ts`) dà al modello il blocco e i fatti di Glifo: per ogni funzione lo studio
  di funzione (y = … prende un nome libero, f(x), g(x)…; y = f(x) con f della nota resta f), le aree, i
  punti, gli slider. Per una formula `formulaTopic` (se definisce una funzione, anche un pezzo del suo
  studio), per un teorema `theoremTopic` (il testo così com'è, senza gli strumenti): lì Glifo controlla gli
  esempi con i numeri che il modello scrive, e la formula ripetuta con le lettere non si giudica. Per uno
  schema `schemaTopic` lo descrive a parole (il modello non legge le coordinate del JSON): le corsie, le
  forme nell'ordine delle frecce (`flowOrder`) con il loro tipo (`SHAPE_NAMES`; in uno schema E-R entità,
  relazioni e attributi; le tabelle con i campi e le chiavi) e la corsia (`laneAt`), i collegamenti con il
  verso e il testo (le cardinalità dalla parte dove sono scritte); i fatti sono quante forme, da dove si
  parte e dove si arriva, e nel messaggio di sistema le formule vanno solo se sono nello schema. Per una
  tabella `tableTopic`: la griglia con le lettere delle colonne, i numeri delle righe e i valori di
  `SheetEvaluator`; i fatti sono le formule (quelle copiate riga per riga o colonna per colonna, che
  `shiftFormula` riconosce, dette una volta) e gli errori con cosa vogliono dire. `explainTopic` fa lo stesso giro dei conti (`converse`) con un messaggio di sistema
  per il tipo (`topicSystemPrompt`, gli strumenti solo per grafici e formule) e senza un risultato a cui
  arrivare: `checkTopicSteps` controlla le formule dei punti (anche f(x) = … e f'(x) = …, con `Sheet.same`),
  `topicFeedback` fa correggere quelle sbagliate, una spiegazione solo a parole va bene; il riepilogo dice
  quante formule ha controllato Glifo e che le frasi le scrive il modello. «Inserisci nella nota» la mette
  dopo il blocco (`insertAfterText`, cercando il testo del blocco vicino al suo inizio, non alla riga ```:
  una formula uguale scritta appena prima sarebbe più vicina). Sotto la spiegazione, solo nel pannello
  (`chat` in `ExplainPanelDeps`), la chat di `src/ui/explainChat.ts` (8 ottobre 2026): Invio manda la
  domanda, «Ferma» la interrompe (la domanda torna da scrivere). `answerFollowUp` (src/ai/explain.ts) fa lo
  stesso giro (`converse`) con un messaggio di sistema per le domande (`chatSystemPrompt`, gli strumenti per
  i conti, i grafici e le formule), il messaggio della spiegazione (`chatContext`: `questionPrompt` o
  `topicPrompt`), la spiegazione come l'ha scritta il modello (`explanationText`) e le ultime tre domande
  (le più vecchie si lasciano se il contesto non basta); Glifo controlla le formule della risposta
  (`checkFormulas`, lo stesso controllo dei grafici e dei teoremi) e fa correggere quelle sbagliate. Con
  un'altra spiegazione, «Rifai» o chiudendo, la chat ricomincia (`endChat` ferma il modello); non si salva.
  I passaggi e il riepilogo si disegnano con `src/ui/explainSteps.ts`, per la spiegazione e per la chat.
- `src/account/`: account e sincronizzazione. `sync.ts` è il motore (manda, scarica, nei
  conflitti tiene tutte e due le versioni), `controller.ts` decide quando sincronizzare,
  `space.ts` tiene le note di ogni account in uno spazio a parte del browser (`glifo.u.<id>.…`),
  `supabase.ts` fa l'accesso con Google o via email (il link aperto qui o incollato, o il
  codice) e controlla che l'accesso salvato nel browser sia dell'account aperto prima di
  sincronizzare, scaricare o eliminare. Il client di Supabase si carica solo se si accede.
  Nella build per claude.ai (`GLIFO_NO_PWA=1`), dentro claude.ai (`inClaudeViewer`) e sul sito di
  prova su Cloudflare Pages l'account è spento (`accountOff` in main.ts): quale Glifo si costruisce lo
  decide vite.config.ts (su Cloudflare, dove la build ha `CF_PAGES`, è sempre il sito di prova, senza
  service worker) e lo passa in `__GLIFO_SITE__`; `src/site.ts` ha i nomi e il messaggio della
  finestra di Accedi (`accountOffMessage`).
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
