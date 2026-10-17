# L'AI: a cosa serve, e le foto, la lavagna e la voce nella nota

Lo studente, il 14 ottobre 2026, finita la grafica (questo file era GRAFICA.md: delle otto richieste del
10 ottobre sette sono fatte e sul sito, e la quinta, «A cosa serve la chiave dell'AI», è tolta perché
«ricade negli abbonamenti»): «questo sono un paio di cose che dobbiamo capire; […] cambi il nome del file e
scriviamo le nuove cose. Ovviamente non toccare nulla del codice, prima ne parleremo per capire cos'è
meglio poi agiremo». Qui, per ogni punto: cosa ha detto lo studente, com'è oggi, cosa se ne sa, la
proposta di Claude, cosa resta da decidere e, man mano, le risposte e le decisioni.

**Come si usa questo file.** Si fa un punto alla volta: se ne parla, e la risposta e la decisione si
scrivono nel punto. Sono funzioni nuove e grandi, quindi prima del codice il progetto di ogni punto (cosa
si vede, come funziona, come si prova) si scrive qui e lo studente lo approva; poi si fa sul ramo `prova`
(con le foto e, quando serve provarlo, Glifo su una pagina privata di claude.ai) e, quando lo studente dice
«va bene», va sul sito. Chi paga l'AI, la propria chiave, il server locale e quale modello stanno in
[ABBONAMENTI.md](ABBONAMENTI.md) («La chiave, il server locale e la scelta del modello»), come ogni
decisione sugli abbonamenti. Il file serve solo per questo lavoro: quando i punti sono fatti si cancella,
insieme alla voce «L'AI» di [ROADMAP.md](ROADMAP.md) e alla riga che lo indica in CLAUDE.md.

| Punto | Cosa | Stato |
|---|---|---|
| 1 | A cosa serve l'AI dei modelli di frontiera | deciso il 15 ottobre 2026 |
| 2 | Dalla lavagna alla nota: la formula presa con il laccio diventa LaTeX | fatto: «In LaTeX», con il lettore nel browser, sul sito dal 16 ottobre 2026 |
| 3 | Da una foto alla nota | da discutere |
| 4 | Dettare: la voce diventa testo nella nota | da discutere |
| 5 | Registrare le lezioni e trascriverle | da discutere |

**Due coppie.** I punti 2 e 3 sono la stessa cosa con due porte: un'immagine (la parte di lavagna presa
con il laccio, o una foto) va a un modello che legge le immagini e torna testo con le formule in LaTeX, da
guardare e correggere prima di metterlo nella nota. Anche 4 e 5: la voce diventa testo (subito, mentre si
detta, o dopo, da una registrazione), poi le formule dette a parole («x al quadrato») diventano LaTeX e il
testo si mette in ordine. Conviene pensarli a coppie: fatto il primo, il secondo costa molto meno.

## 1. A cosa serve l'AI dei modelli di frontiera

**Lo studente.** «un altro problema fondamentale è a cosa mi serve questo tipo di AI? quella per spiegare
già "diciamo" c'è l'abbiamo, però ovviamente uno potrebbe voler usare un ai migliore e più sicura; e in più
io pensavo che modelli di frontiera dovevano servire come aiuto tipo gli chiedi di fare grafici dalla
formula e li inseriscono nella nota».

**Com'è oggi.**

- «Spiega con l'AI» (il pannello ✨, con «Spiegami» e la chat) usa solo il modello nel browser: gratis e
  privato, ma serve WebGPU, cioè di solito Chrome o Edge su un computer con una buona scheda grafica; su
  telefono e iPad di solito no. Nel codice c'è già il punto dove attaccare un altro modello (`ChatFn` in
  `src/ai/explain.ts`), ma nessun servizio è collegato.
- La propria chiave serve solo a «Chiedi all'AI», sotto la ricerca dei simboli: si descrive un simbolo a
  parole e arrivano fino a 4 proposte in LaTeX, con «Inserisci» e «Copia». Una domanda, una risposta:
  niente strumenti del motore, niente immagini.
- **Il grafico di una formula Glifo lo fa già, senza AI**: con il cursore su una formula, il pulsante
  «Grafico» della barra inserisce il blocco ```` ```grafico ```` con quella formula (e nel pannello dei
  simboli c'è «Inserisci il grafico»); `\operatorname{studio}(f)` fa lo studio di funzione. È gratis,
  immediato e funziona senza rete.
- Nessuna AI cambia la nota da sola: quello che propone entra solo con «Inserisci» o «Inserisci nella
  nota».

**Cosa fa meglio un modello di frontiera** (Claude, GPT, Gemini, che girano sui server di chi li fa):

- legge le immagini: foto, lavagne, pagine di libro (punti 2 e 3); i modelli piccoli nel browser lo fanno
  male o non lo fanno;
- funziona su telefono e iPad, senza scaricare niente;
- legge testi lunghi: una nota intera, la trascrizione di una lezione di due ore (punto 5); i modelli nel
  browser, con WebLLM, leggono 4096 token, qualche pagina;
- usa bene gli strumenti: nelle prove del 14 ottobre i modelli nel browser chiedevano i conti al motore di
  rado (ROADMAP.md, «Spiegami»);
- sbaglia meno e scrive meglio in italiano.

In cambio costa a ogni uso, serve la rete e il testo esce dal dispositivo: va al servizio che risponde.

**Proposta di Claude.** L'AI di frontiera fa quello che il motore non sa fare e che il modello nel browser
fa male, sempre con la stessa regola: **l'AI propone, Glifo controlla, chi scrive decide.** Quello che fa
si vede prima in un pannello (come i passaggi di «Spiegami»), con il ✓ o il ✗ del motore dove si può
controllare, e va nella nota solo con «Inserisci nella nota». Quattro lavori:

1. **portare nella nota quello che sta fuori**: la lavagna, le foto, la voce, le lezioni (punti 2-5). È il
   lavoro più utile, perché serve a scrivere;
2. **fare i blocchi da una richiesta a parole**. Il grafico di una formula c'è già con il pulsante; l'AI
   serve quando la richiesta è a parole o tocca più cose insieme: «il grafico di questa funzione con a da
   −2 a 2 e la zona dove è positiva», «la tabella dei costi di questo esercizio con il punto di pareggio»,
   «lo schema E-R del testo qui sopra», «la figura con le tre curve, la legenda e il titolo per
   l'articolo». Il risultato è un blocco normale (```` ```grafico ````, ```` ```tabella ````, uno schema),
   che si apre e si modifica come quelli scritti a mano. Il motore lo disegna e fa i conti: se l'AI
   scrive male il blocco, Glifo se ne accorge e glielo fa correggere prima di mostrarlo;
3. **spiegare dove il modello nel browser non arriva**: su telefono e iPad, o quando si vuole una
   spiegazione migliore, con lo stesso giro di «Spiegami» e gli stessi controlli (era la proposta del
   punto 5 della grafica: chi spiega si decide con gli abbonamenti);
4. più avanti **il tutor** (ROADMAP.md, «Aiuto con gli esercizi»).

«Più sicura»: i conti li controlla il motore con qualsiasi modello, quindi un conto sbagliato non passa né
con il modello nel browser né con quello di frontiera; quello di frontiera ne sbaglia meno, spiega meglio e
capisce richieste più difficili. Per la riservatezza è il contrario: il modello nel browser non manda
niente a nessuno, quello di frontiera riceve il testo (va scritto nell'informativa e, la prima volta,
detto anche in Glifo).

**Da decidere.**

- Va bene questo ruolo, con la regola «l'AI propone, Glifo controlla, chi scrive decide»?
- Da quale lavoro si parte? Claude propone i punti 2-5, che portano nella nota quello che si scrive
  davvero, e poi i blocchi da una richiesta a parole.

**Con gli abbonamenti.** Ogni lavoro dell'AI di frontiera costa a ogni uso: con l'AI di Glifo sta nei
piani a pagamento, con il tetto (ABBONAMENTI.md, Relativistico); con la propria chiave o il proprio server
non costa niente a Glifo. Finché non si spende niente (COSTI.md), i punti 2-5 si provano con la propria
chiave: per esempio quella gratuita di Gemini (Google AI Studio, senza carta di credito; i modelli Gemini
leggono le immagini e ascoltano l'audio). Per offrire Gemini a chi usa Glifo nell'UE, invece, Google
chiede il piano a pagamento (ABBONAMENTI.md, «La chiave, il server locale e la scelta del modello»).

**Nel codice.** `askAi` e `askCompatible` in `src/ai/assistant.ts` (oggi solo testo); i servizi in
`src/ai/services.ts`; il giro con gli strumenti del motore in `converse` (`src/ai/explain.ts`), con
`ChatFn` per attaccare un altro modello; il pulsante «Grafico» in `src/ui/toolbar.ts` e
`insertGraphBlock` in `src/editor/graphInsert.ts`.

**Risposte e decisioni.** 15 ottobre 2026, lo studente: «va bene il punto 1, partiamo dalla lavagna». Deciso:
l'AI di frontiera fa i quattro lavori della proposta, con la regola «l'AI propone, Glifo controlla, chi scrive
decide»; si comincia dal punto 2, la lavagna.

## 2. Dalla lavagna alla nota

**Lo studente.** «una cosa simile che stavamo ancora vedendo per la lavagna, si seleziona con la corda e
se possibile si trascrive la formula scritta, sulla lavagna, in md sulla nota».

**Com'è oggi.**

- La lavagna ha il laccio dal 6 ottobre 2026, come in Note di Apple: prende i tratti che ci si disegna
  intorno (o la linea toccata); poi li si sposta, ingrandisce, taglia, copia, duplica, elimina o colora,
  dal menu della selezione o con la tastiera.
- I tratti sono salvati come punti (x, y e la pressione), in ordine, ognuno con il momento in cui è
  cominciato, nello spazio del browser per le lavagne (IndexedDB), una lavagna per nota: non vanno
  nell'account, nel backup sì. Una lavagna è della nota intera, non di un punto del testo.
- Glifo riconosce solo le figure (linea, freccia, poligoni, ellisse, con «Forme automatiche»): niente
  scrittura, niente formule.
- Già pensato il 5 ottobre 2026 (ABBONAMENTI.md, «La lavagna» → «Dopo»): si cerchia la formula,
  «Converti», Glifo la mostra disegnata con KaTeX con il codice da correggere, e «Aggiungi alla nota» la
  mette dove c'è il cursore; se finisce con `=`, Glifo la calcola. Deciso allora: la lavagna gratis, la
  conversione nei piani a pagamento, perché la fa l'AI. Come modello aperto si pensava a TexTeller.

**Cosa se ne sa** (ricerca del 14 ottobre 2026, fonti in fondo).

- **Dai tratti** (i punti, nell'ordine in cui sono scritti): per il browser non c'è niente di pronto che
  legga una formula intera, e i dati per addestrarlo (MathWriting di Google, CROHME) sono solo per usi non
  commerciali. Lo fanno servizi a pagamento: MyScript (2.000 richieste al mese gratis, poi circa 10 $ ogni
  1.000) e Mathpix (0,002 $ a formula, più 19,99 $ per attivarlo). La Handwriting Recognition API di
  Chrome legge solo testo, e Safari non ce l'ha. Per un simbolo da solo ci sono Detexify (detexify-next
  gira nel browser, anche senza rete) e Detypify (più di 400 simboli, licenza MIT).
- **Dall'immagine**: i tratti presi con il laccio si disegnano puliti, senza ombre né fogli storti, quindi
  è più facile di una foto. Modelli piccoli per il browser: pix2text-mfr (circa 120 MB, licenza MIT, con
  esempi scritti a mano) e Texo (80 MB, con una prova nel browser e buoni numeri sulla scrittura a mano,
  ma con la licenza AGPL, che non va con un Glifo chiuso e a pagamento). Il più bravo tra quelli aperti,
  Uni-MuMER (84% di formule giuste su CROHME, licenza Apache 2.0), pesa circa 1,4 GB e andrebbe
  convertito per il browser. TexTeller, nominato il 5 ottobre, è da provare.
- **Con un modello di frontiera** una formula costa meno di un quinto di centesimo, ma serve la rete.
  Prove pubblicate dei modelli di frontiera sulle singole formule scritte a mano non ce ne sono: va visto
  provando.

**Proposta di Claude.**

- Nel menu della selezione, accanto a taglia, copia e gli altri: **«In LaTeX»**.
- Si apre un pannello come quello di «Spiegami»: la formula disegnata con KaTeX, il codice LaTeX da
  correggere e, se c'è un `=`, il ✓ o il ✗ del motore (un ✗ dice subito che qualcosa non torna: la
  lettura o il conto). Poi «Inserisci nella nota», dove c'è il cursore: `$…$` dentro una riga o `$$…$$` a
  parte. La scrittura resta sulla lavagna.
- Più righe insieme (un conto intero): una formula per riga, una sotto l'altra.
- Chi legge la formula si decide con una prova, come quella dei modelli di «Spiegami»: una ventina di
  formule scritte dallo studente sulla lavagna, lette da pix2text-mfr nel browser e da un modello di
  frontiera con la propria chiave, contando quante sono giuste. Se il modello nel browser basta, la
  conversione è gratis e funziona anche senza rete; se no, la fa il modello di frontiera (oggi con la
  propria chiave, poi con l'AI di Glifo). Il pannello è lo stesso: cambia solo chi legge.

**Da decidere.**

- Va bene «In LaTeX» nel menu del laccio, con il pannello prima di inserire?
- Va bene cominciare dalla prova dei lettori (pix2text-mfr nel browser e un modello di frontiera) sulle
  formule scritte dallo studente?
- Se il modello nel browser basta, la conversione resta a pagamento? Il 5 ottobre era già scritto: «se
  costasse quasi niente, qualche conversione potrebbe stare anche in Classico».

**Con gli abbonamenti.** Deciso il 5 ottobre 2026: la conversione è nei piani a pagamento (Relativistico),
perché usa l'AI. Con un modello nel browser non costerebbe niente a Glifo.

**Nel codice.** Il laccio e la selezione in `src/board/selection.ts`; il menu della selezione
(`openSelMenu`) in `src/board/board.ts`; i tratti in `src/board/strokes.ts` e dove si salvano in
`src/board/store.ts`; KaTeX in `src/render/`. Più in dettaglio (15 ottobre 2026): i tratti si disegnano con
funzioni pure di `src/board/ink.ts` (`strokeOutline`, `outlineSvg`, che vanno anche nei test), il resto del
disegno sta in metodi privati di `Board`; un'immagine dei tratti oggi non c'è (per gli schemi c'è `svgToPng` in
`src/schema/image.ts`); dalla lavagna non si scrive nella nota (`BoardOptions` ha solo `store`, `confirmClear` e
`warn`: serve un collegamento da `main.ts`, dove la nota si scrive con `MarkdownEditor.insert` o con
`insertBlock` di `src/editor/insert.ts`); il controllo come nella nota è `sheetBefore` con `Sheet.read`; i
servizi della propria chiave oggi mandano solo testo.

**La prova dei lettori** (preparata il 15 ottobre 2026, con `scripts/prova-lettori.py`).

- **Lo studente** ricopia a mano sulla lavagna, con la penna o con quello che userà davvero, le 20 formule qui
  sotto (gli sono arrivate disegnate, in un'immagine), una per riga e con un po' di spazio tra una e l'altra; se
  vuole ne aggiunge qualcuna dei suoi appunti, dicendo cos'è. Poi manda le foto dello schermo nella chat. Il
  backup, che ha i tratti, solo se le foto non bastano: contiene anche tutti gli appunti.
- **Claude** ritaglia le formule (nere su bianco, come i tratti presi con il laccio), le fa leggere a
  pix2text-mfr (gli stessi file del browser, qui sul processore) e a un modello di frontiera (Claude, in una
  lettura a parte che non conosce l'elenco: con la propria chiave sarebbe Gemini o Claude), le pulisce come farà
  Glifo e le conta: giusta, giusta dopo la pulizia, da correggere poco (un simbolo), sbagliata. Guarda anche il
  segno del motore dove c'è un «=».
- **Le formule**: 1. `\int_0^1 x^2 \, dx = \frac{1}{3}`; 2. `\lim_{x \to 0} \frac{\sin x}{x} = 1`;
  3. `\frac{d}{dx}(x^2 \sin x) = 2x \sin x + x^2 \cos x`; 4. `\sum_{k=1}^{n} k = \frac{n(n+1)}{2}`;
  5. `x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`; 6. `e^{i\pi} + 1 = 0`; 7. `\sin^2 x + \cos^2 x = 1`;
  8. `f(x) = \frac{x^2 - 1}{x + 2}`; 9. `\sqrt{a^2 + b^2}`; 10. `\log_2 8 = 3`;
  11. `\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}`; 12. `\det A = ad - bc`;
  13. `\frac{\partial f}{\partial x} = 2xy`; 14. `\nabla f = (2x, 2y)`;
  15. `\binom{n}{k} = \frac{n!}{k!\,(n-k)!}`; 16. `P(A \cup B) = P(A) + P(B) - P(A \cap B)`;
  17. `y'' + y = 0`; 18. `\alpha + \beta + \gamma = \pi`; 19. `|x - 3| \leq 2`;
  20. `\int_{-R}^{R} \pi (R^2 - x^2) \, dx = \frac{4}{3} \pi R^3`.
- **Come si decide**: se il modello nel browser ne legge giuste quasi tutte, o con poco da correggere, legge
  lui: gratis, privato, anche senza rete e, perché pesa poco, anche sull'iPad; se no legge il modello di
  frontiera, con la propria chiave e poi con l'AI di Glifo.

**Il primo controllo** (15 ottobre 2026, prima della scrittura dello studente). pix2text-mfr (licenza MIT; 120
MB: 88 il codificatore dell'immagine, 32 il decodificatore) funziona con i file ONNX che userebbe il browser.
Le 20 formule, stampate, le legge tutte giuste nel significato, in meno di un secondo l'una con un processore
solo, ma a modo suo (`\operatorname*{l i m}`, `\cfrac`, spazi tra i caratteri, il binomiale come una matrice
di una colonna): la pulizia di Glifo le riscrive come una persona, e dopo la pulizia KaTeX le disegna tutte.
Con le regole della nota il motore mette ✓ a sei (1, 2, 3, 6, 10 e 20) e a nessuna un ✗: le altre sono
definizioni o equazioni, che nella nota non si giudicano. La scrittura a mano è un'altra cosa: lo dice la prova.

**Il progetto** (da approvare con i risultati della prova; cambia solo chi legge).

- *Cosa si vede.* Nel menu della selezione, dopo Taglia, Copia, Duplica ed Elimina, c'è «In LaTeX». Si apre un
  pannello sopra la lavagna, come quello di «Spiegami»: la scrittura presa, piccola; sotto, la formula disegnata
  con KaTeX e il suo codice in una casella da correggere (la formula si ridisegna mentre si scrive); con un «=»
  il ✓ o il ✗ del motore, con le definizioni della nota che vengono prima del cursore. Più righe prese insieme
  danno una formula per riga. Poi «Inserisci nella nota» (dove c'è il cursore: `$…$` dentro una riga, `$$…$$`
  su una riga vuota), «Copia» e «Chiudi». La scrittura resta sulla lavagna. La prima volta, con il modello nel
  browser, Glifo dice quanto pesa e lo scarica solo con un sì; poi funziona anche senza rete.
- *Come funziona.* I tratti presi si disegnano neri su bianco, con le funzioni della lavagna, in un'immagine
  ritagliata attorno alla scrittura; il lettore la legge; Glifo pulisce il LaTeX e il motore lo controlla. Il
  modello nel browser gira in un worker, come Qwen di «Spiegami», e resta nella cache del browser; con la propria
  chiave l'immagine va al servizio scelto (oggi «Chiedi all'AI» manda solo testo).
- *Come si prova.* I test della pulizia del LaTeX, dell'immagine dai tratti e dell'inserimento nella nota; la
  prova nel browser con un lettore finto, come per «Spiegami», e con i tratti della prova dei lettori; le foto del
  pannello; poi lo studente sul sito di prova, sull'iPad con la penna.

**Risposte e decisioni.** 15 ottobre 2026, lo studente: «va bene il punto 1, partiamo dalla lavagna». Si parte
dalla prova dei lettori; il progetto qui sopra, e se la conversione resta a pagamento quando basta il modello
nel browser, si decidono con i risultati.

**Le prime formule dello studente** (15 ottobre 2026, sulla lavagna del sito di prova, al computer, tema scuro).
∫₀¹ x² dx = 1/3: giusta per tutti e due i lettori, con il ✓ del motore. La derivata di x² sin x, scritta con il −
al posto del +: il motore mette il ✗ e dà quella giusta (2x sin x + x² cos x); il modello di frontiera la legge
giusta (e nota che i tre 2 sono a forma di z), pix2text-mfr è da correggere poco (i tre 2 letti z). Conto
provvisorio, su 2 formule: pix2text-mfr 1 giusta e 1 da correggere poco, il modello di frontiera 2 su 2.

**«In LaTeX» sul ramo `prova`** (16 ottobre 2026). Lo studente: «dimmi cosa c'è sul ramo di prova che non sta sul
principale; se non c'è nulla vorrei provare il lettore della lavagna nel sito di prova» (i due rami erano
uguali). Fatto il progetto qui sopra, con il lettore nel browser, per provarlo con la propria scrittura:
- nel menu della Selezione, se c'è scrittura, «In LaTeX»; la finestra (modale, così si vede anche a schermo
  intero) mostra per ogni riga la scrittura, la formula con KaTeX e il ✓ o il ✗ del motore, il codice da
  correggere e quanto ci ha messo il lettore; «Inserisci nella nota», «Copia», «Chiudi»;
- la prima volta chiede di scaricare il lettore: circa 134 MB, il modello da Hugging Face (120 MB, a una
  revisione fissa) e la libreria di onnxruntime-web dal sito di Glifo (14 MB); poi resta nel browser e
  funziona anche senza rete; la scrittura non esce dal dispositivo (scritto nell'informativa);
- legge sul processore, con WebAssembly e un thread solo: nella sessione da 1,5 a 6 secondi per formula
  (sul computer dello studente di solito meno); sulle 20 formule stampate scrive le stesse cose del
  programma in Python della prova;
- la pulizia (`tidyLatex`) è quella della prova con qualche regola in più: il binomiale, \left e \right,
  \mathrm e \! che chi scrive non mette, le graffe che non servono;
- il modello di frontiera con la propria chiave non c'è ancora: è il passo dopo se il lettore nel browser
  non basta (le immagini ai servizi della propria chiave, oggi solo testo).

Nel codice: `src/ai/formulaModel.ts`, `formulaWorker.ts`, `formulaReader.ts`, `formulaTokens.ts`,
`formulaTidy.ts`; `src/board/strokeImage.ts`; `src/ui/latexDialog.ts`; `src/editor/latexInsert.ts`. Nelle prove
nel browser il lettore è finto (`fakeFormulaWorker` in scripts/smoke-test.mjs); `scripts/lettore-vero.mjs` prova
quello vero con una scrittura finta.

**Sul sito** (16 ottobre 2026). Lo studente, provato sul sito di prova: «funziona abbastanza bene, diciamo che
possiamo metterlo sul ramo principale». «In LaTeX» è andato sul sito. Poi lo studente: «sistema prima il lettore
nelle impostazioni»: in «Dati» c'è il lettore, con quanto pesa e «Togli»; poi (17 ottobre) «fai la domanda
frequente»: faq.html#in-latex, che dice anche che la scrittura non esce dal dispositivo; poi «rifai il video
tutorial solo della lavagna; fai veder che sta il Latex»: il video della lavagna finisce con il lazo intorno a
«y = x²», «In LaTeX» che la legge (nel video con un lettore finto, come il modello di «Spiega con l'AI») e
«Inserisci nella nota», e il testo della pagina dice «In LaTeX». Tutti e tre sul sito dal 17 ottobre 2026.
Resta, scritto in ROADMAP.md, il modello di frontiera con la propria chiave se il lettore nel browser non basta.
Il prossimo è il punto 3.

**Gratis o a pagamento** (16 ottobre 2026). Lo studente: «se si usa quello nel browser, che sbaglia più spesso,
allora è gratis; se poi si compra l'abbonamento, il modello migliore sarà nel piano». Deciso: «In LaTeX» con il
lettore nel browser è gratis; il modello migliore (di frontiera) è nei piani a pagamento. Scritto in
ABBONAMENTI.md (punto 22 della discussione, Classico e Relativistico).

## 3. Da una foto alla nota

**Lo studente.** «un altra cosa che vorrei fare che forse ne abbiamo anche parlato è la possibilità di
inserire una foto e glifo trascrive il contenuto nella nota».

**Com'è oggi.**

- Ne abbiamo parlato il 4 ottobre 2026: in ABBONAMENTI.md è un'«idea in più» di Relativistico («foto →
  appunti: la foto della lavagna o del quaderno diventa testo con le formule, come Mathpix»; 1-2 centesimi
  a foto).
- In Glifo le immagini non si inseriscono: niente incolla o trascina di immagini, niente fotocamera, e
  Glifo non ha uno spazio per le immagini (le note sono testo, nel browser e nell'account, 20 MB per
  account). Un `![](indirizzo)` scritto a mano si vede, ma l'immagine resta su internet.

**Cosa se ne sa** (ricerca del 14 ottobre 2026, fonti in fondo).

- I modelli piccoli che girano nel browser leggono bene le pagine stampate e male la scrittura a mano:
  LightOnOCR-2 (circa 680 MB, ha l'italiano, licenza Apache 2.0), GLM-OCR (650 MB, senza l'italiano),
  Granite-Docling (una prova nel browser da 1,15 GB, solo inglese). Sulle formule scritte a mano anche i
  migliori sbagliano molto (nella prova OmniHandwritingOCR, con esempi difficili scelti apposta, da un
  carattere su dieci a più di uno su due). Su iPad i modelli nel browser a volte si chiudono per la
  memoria.
- Il motore di «Spiegami» (WebLLM) legge le immagini solo con Phi-3.5-vision, che chiede da 3,9 a 5,9 GB
  di memoria della scheda grafica.
- Con i modelli di frontiera: sui documenti storici in italiano Claude e Gemini sono i migliori (nella
  prova METATR circa un carattere sbagliato su dieci, sui manoscritti circa tre; i modelli piccoli molto
  peggio); sulla matematica scritta a mano GPT-4.1-mini fa l'84% di trascrizioni accettabili, Mathpix il
  55%.
  Costano da circa un decimo di centesimo a 5 centesimi a pagina, secondo il modello (Mathpix da 0,2 a
  0,5 centesimi).

**Proposta di Claude.**

- **«Da una foto»** nella barra: sul telefono e sull'iPad apre la fotocamera, sul computer fa scegliere un
  file; anche incollando un'immagine. Prima di mandarla si ritaglia la parte che serve.
- Il pannello: la foto accanto al testo trascritto (Markdown con le formule in LaTeX), da correggere; le
  formule con `=` hanno il ✓ o il ✗ del motore, che fa vedere subito un errore di lettura, o di chi ha
  scritto alla lavagna. Poi «Inserisci nella nota», dove c'è il cursore.
- Chi legge: il modello di frontiera. Gli appunti sono quasi sempre scritti a mano (il quaderno, la
  lavagna dell'aula), proprio dove i modelli piccoli sbagliano, e i modelli piccoli pesano da 0,7 a 1,4
  GB, troppo per un telefono. Per le pagine stampate (libri, slide) si può provare più avanti LightOnOCR-2
  nel browser, gratis.
- La foto non resta nella nota: tenerla vuol dire uno spazio per le immagini nell'account, che costa
  (ABBONAMENTI.md, «Più spazio»); si può decidere dopo.
- Disegni e grafici della foto: all'inizio si saltano, con un segno nel testo («[figura]»); più avanti
  l'AI può provare a rifarli come blocchi di Glifo (uno schema, un grafico).

**Da decidere.**

- Cosa si fotografa di più: il quaderno, la lavagna dell'aula, il libro, le slide? Cambia quale modello
  serve.
- La foto resta nella nota?

**Con gli abbonamenti.** Relativistico, come «idea in più» del 4 ottobre (costa a ogni foto); con la
propria chiave non costa niente a Glifo.

**Nel codice.** Non c'è niente da cui partire: il pannello può essere come quello di «Spiegami»
(`src/ui/explainPanel.ts`), l'inserimento come «Inserisci» di «Chiedi all'AI» (`src/ui/sidePanel.ts`).

**Risposte e decisioni.** —

## 4. Dettare: la voce diventa testo nella nota

**Lo studente.** «usare la voce per scrivere nella nota (uno STT) come quando invece di scrivere io il
prompt, te lo dico e tu lo scrivi».

**Com'è oggi.** In Glifo non c'è niente per la voce: né microfono, né registrazione, né riconoscimento.
C'è già la dettatura del sistema, che scrive in qualsiasi campo di testo: il microfono della tastiera
dell'iPad (l'italiano lo riconosce sul dispositivo), la dettatura del Mac (sul dispositivo con i chip
Apple) e Win+H su Windows (l'italiano c'è, ma la voce va ai server di Microsoft). Nell'editor di Glifo va
provata: sull'iPad, nei campi come quello di CodeMirror, c'era un difetto noto (dopo «nuova riga» il testo
dettato non compariva finché non si toccava l'editor). E scrive solo parole: «x al quadrato», non $x^2$.

**Cosa se ne sa** (ricerca del 14 ottobre 2026, fonti in fondo).

- **Il riconoscimento del browser** (la Web Speech API), gratis e senza niente da scaricare:
  - Chrome: di base la voce va ai server di Google e senza rete non funziona; dal Chrome 139 (agosto 2025)
    può riconoscere sul dispositivo, anche l'italiano: il pacchetto della lingua si scarica una volta, poi
    va anche senza rete;
  - Edge: la voce va ai server di Microsoft;
  - Safari, sul Mac e sull'iPad: usa il riconoscitore di Apple, sul dispositivo quando può (l'italiano sì),
    se no sui server di Apple. Ma nelle app installate dalla schermata Home, come Glifo installato, secondo
    più fonti non funziona: va provato;
  - Firefox: non c'è (solo in prova, sul computer).
- **Un modello nel browser**, senza server: Whisper (aperto, di OpenAI; in italiano il più grande sbaglia
  circa 3 parole su 100, il piccolo circa 10; si scaricano da 250 a 750 MB) e Parakeet v3 di NVIDIA
  (italiano, circa 3 parole su 100, da 0,7 a 1,2 GB, molto veloce con una scheda grafica). Sono fatti per i
  file più che per la dettatura dal vivo (lavorano a pezzi di 30 secondi). Sull'iPad sono pesanti: solo i
  più piccoli, e transformers.js usa la scheda grafica di Safari solo da settembre 2026.
- **Le formule dette**: nessuna app le trasforma in LaTeX. La ricerca più recente (Speech-to-LaTeX, in
  inglese e russo) sbaglia ancora più di un carattere su quattro; per l'italiano non c'è niente. Chi detta
  deve sempre vedere la formula prima di inserirla.

**Proposta di Claude.**

- **Il testo**: la dettatura del sistema, che c'è già, non costa niente e sull'iPad e sul Mac resta sul
  dispositivo. Prima si prova nell'editor di Glifo e, se c'è un difetto, si corregge.
- **Le formule a parole**, il pezzo che manca ovunque: una casella «Formula a parole» dove si detta (con
  il microfono della tastiera) o si scrive «integrale da zero a uno di x al quadrato in dx», e Glifo la
  traduce in `$\int_0^1 x^2 \, dx$`, mostrandola disegnata prima di inserirla. Serve anche a chi non sa il
  LaTeX e la scrive a parole. È parente di «Chiedi all'AI», dove si descrive a parole un simbolo: qui è una
  formula intera. La traduzione la fa un modello (prima si prova quello nel browser: la frase è corta),
  aiutato dai nomi italiani dei simboli che Glifo ha già nella ricerca («alfa», «integrale»,
  «sommatoria»).
- **Un pulsante con il microfono di Glifo** (il riconoscimento del browser, sul dispositivo dove si può)
  solo se la dettatura del sistema non basta: sull'iPad, nell'app installata, potrebbe non funzionare.

**Da decidere.**

- Va bene partire dalla dettatura del sistema per il testo e fare in Glifo le formule a parole, dette o
  scritte?
- Serve anche il pulsante con il microfono di Glifo, o basta quello della tastiera?

**Con gli abbonamenti.** Dettare il testo non costa niente a Glifo (lo fa il sistema, o il browser): può
stare nel piano gratuito, perché è scrivere. Le formule a parole sono gratis con il modello nel browser;
con l'AI di frontiera, nei piani a pagamento o con la propria chiave.

**Nel codice.** Per la voce non c'è niente da cui partire. L'editor è CodeMirror (`src/editor/`): il
testo dettato si inserisce al cursore come una battitura. La casella delle formule a parole può stare
accanto a «Chiedi all'AI», nel pannello dei simboli (`src/ui/sidePanel.ts`).

**Risposte e decisioni.** —

## 5. Registrare le lezioni e trascriverle

**Lo studente.** «la possibilità di registrare le lezioni per poi farla trascrivere in automatico».

**Com'è oggi.**

- In ROADMAP.md, «Trascrizione delle lezioni in appunti»: registrare l'audio (o lo schermo, sul computer)
  e farne appunti ordinati, con titoli, elenchi e formule in LaTeX; due strade, Whisper nel browser
  (gratis e privato, ma pesante per i telefoni) o un servizio a pagamento.
- In ABBONAMENTI.md è in Relativistico: poche ore al mese (per esempio 3) e pacchetti di ore; 20-40
  centesimi per ora di lezione trascritta e fatta diventare appunti; «se un giorno la trascrizione girerà
  nel browser (sul computer), quella non avrà tetto».
- In Glifo non c'è niente per l'audio. Le lavagne stanno già nello spazio del browser per i dati grandi
  (IndexedDB), dove potrebbe andare anche l'audio; Glifo però non chiede al browser di tenerlo
  (`navigator.storage.persist`), quindi con il disco pieno il browser può svuotarlo.

**Cosa se ne sa** (ricerca del 14 ottobre 2026, fonti in fondo).

- **Registrare** nel browser si può, in Chrome e in Safari (MediaRecorder): due ore di voce compressa sono
  da 20 a 60 MB. Lo spazio c'è (Chrome e Safari lasciano a un sito fino al 60% del disco), ma Safari
  cancella i dati dei siti non aperti per 7 giorni in cui lo si usa (con Glifo sulla schermata Home no: lo
  dice già una domanda frequente). Sull'iPad Safari, e anche Glifo installato, smette di ascoltare quando lo
  schermo si spegne o si passa a un'altra app: lo schermo si può tenere acceso (Wake Lock, nelle app
  installate da iPadOS 18.4), ma per due ore è più sicuro registrare con un'app del telefono e caricare il
  file in Glifo.
- **Trascrivere nel browser** è gratis e privato, ma serve una buona scheda grafica: due ore in circa 12
  minuti con Whisper turbo (dichiarato, su un computer non detto; con una grafica integrata si stimano da
  20 a 60 minuti) e in circa 6 con Parakeet v3 su un PC potente; solo con il processore, ore. Sull'iPad no.
- **Con un servizio**, per ora di audio: Groq (Whisper) circa 4 centesimi di dollaro, con un piano gratuito
  che basta per una lezione (8 ore al giorno, file fino a 25 MB, quindi a pezzi); Mistral e OpenAI mini 18;
  AssemblyAI ed ElevenLabs circa 21-22; OpenAI fino a 36; Gemini, con i modelli generali, da 5 a 12 (una
  stima). In ABBONAMENTI.md si contavano da 15 a 36 centesimi, più l'AI che ne fa appunti.
- **Dalla trascrizione agli appunti** serve un modello che legga testi lunghi: due ore di lezione sono
  decine di migliaia di parole, troppe per i modelli nel browser, che leggono qualche pagina alla volta. Le
  formule dette restano il pezzo difficile (punto 4): gli appunti vanno riletti.
- **Le app per studenti**: Notability e GoodNotes legano l'audio a quello che si scrive (si tocca un punto
  degli appunti e riparte la lezione da quel momento) e trascrivono; nessuna trasforma in LaTeX la
  matematica detta.

**Proposta di Claude.** Tre pezzi, ognuno utile da solo:

1. **Registrare** dentro Glifo, sul computer (e sull'iPad con lo schermo acceso), oppure **caricare un
   file audio** registrato con il telefono, più sicuro per due ore. L'audio si salva a pezzi nello spazio
   del browser per i dati grandi, con Glifo che chiede al browser di tenerlo.
2. **L'audio legato agli appunti**, come in Notability: mentre si registra e si scrive, Glifo ricorda a
   che minuto è stata scritta ogni riga; dopo, toccando una riga, si riascolta quel momento della lezione.
   Non serve l'AI: è gratis e funziona senza rete.
3. **Trascrivere e farne appunti**: la voce diventa testo (con lo stesso riconoscimento del punto 4), poi
   l'AI ne fa appunti con titoli, elenchi e formule in LaTeX, e Glifo controlla i conti; la trascrizione
   resta accanto, per ricontrollare. Per la voce: nel browser su un computer con una buona scheda grafica
   (gratis) o con un servizio (oggi con la propria chiave: quella gratuita di Groq basta per una lezione);
   per gli appunti, un modello di frontiera.

**Le regole.** Per il Garante della privacy (le sue indicazioni sono per la scuola) registrare una lezione
per lo studio personale è lecito, se l'istituto non lo vieta; per ogni altro uso, e per diffonderla,
bisogna informare chi parla e avere il suo consenso. Per l'università non c'è un provvedimento apposta; in
più la lezione è un'opera del docente (diritto d'autore): registrarla per studiare è in genere accettato,
ma il docente o il regolamento dell'ateneo possono vietarlo, e pubblicarla no. Glifo lo ricorda quando si
comincia a registrare, e l'audio non va mai nelle note condivise.

**Da decidere.**

- Cosa serve di più alla fine: la trascrizione, gli appunti fatti dall'AI o l'audio legato ai propri
  appunti?
- Registrare dentro Glifo o caricare l'audio registrato con il telefono?

**Con gli abbonamenti.** La trascrizione è in Relativistico dal 4 ottobre (per esempio 3 ore al mese, con
i pacchetti di ore), perché con un servizio costa a ogni ora; se gira nel browser non ha tetto. L'audio
legato agli appunti, senza AI e salvato sul dispositivo, non costa niente a Glifo: può stare nel piano
gratuito. Tenere l'audio nell'account, per riascoltarlo su un altro dispositivo, è spazio che costa.

**Nel codice.** Non c'è niente da cui partire; lo spazio per i dati grandi è quello delle lavagne
(`src/board/store.ts`, IndexedDB).

**Risposte e decisioni.** —

## Da sistemare con il primo punto che tocca l'AI

L'informativa (`privacy.html`) dice «La chiave API dell'assistente non lascia mai il dispositivo» (e lo
stesso in inglese): la chiave non va all'account né a Glifo, ma a ogni domanda va al servizio scelto, che
la usa per rispondere. E «Con Ollama la domanda resta sul tuo computer» vale solo con l'indirizzo di
partenza (`localhost`), che si può cambiare. Ogni punto qui sopra cambia comunque l'informativa (le foto e
la voce che vanno al servizio scelto): con il primo si sistemano anche queste due frasi.

## In che ordine

Proposta di Claude: prima il punto 1, che dice a cosa serve l'AI e chi la usa; poi le immagini,
cominciando dalla lavagna (2: il laccio c'è già, ed è l'idea più vecchia, del 5 ottobre) e poi le foto (3:
lo stesso giro); poi la voce, cominciando dalla dettatura (4) e poi le lezioni (5: usano lo stesso
riconoscimento e sono il lavoro più grande). Ogni punto si prova prima gratis, con la propria chiave o con
un modello nel browser, sul ramo `prova`.

## Fonti (controllate il 14 ottobre 2026)

- La lavagna: [MathWriting](https://huggingface.co/datasets/deepcopy/MathWriting-human) (dati solo per usi
  non commerciali), [MyScript iinkTS](https://github.com/MyScript/iinkTS) e
  [i suoi prezzi](https://developer-support.myscript.com/support/discussions/topics/16000030978),
  [Mathpix](https://mathpix.com/pricing/api),
  [la Handwriting Recognition API](https://github.com/WICG/handwriting-recognition/blob/main/explainer.md),
  [detexify-next](https://github.com/kirel/detexify-next), [Detypify](https://github.com/QuarticCat/detypify),
  [pix2text-mfr](https://huggingface.co/breezedeus/pix2text-mfr-1.5), [Texo](https://github.com/alephpi/Texo),
  [Uni-MuMER](https://github.com/bflameswift/uni-mumer), [TexTeller](https://github.com/OleehyO/TexTeller),
  [le immagini con Claude](https://platform.claude.com/docs/en/build-with-claude/vision).
- Le foto: [LightOnOCR-2](https://huggingface.co/lightonai/LightOnOCR-2-1B),
  [GLM-OCR](https://huggingface.co/zai-org/GLM-OCR),
  [Granite-Docling nel browser](https://huggingface.co/spaces/ibm-granite/granite-docling-258M-WebGPU),
  [OmniHandwritingOCR](https://huggingface.co/papers/2608.18586),
  [METATR](https://huggingface.co/papers/2605.26712),
  [la matematica scritta a mano con GPT-4.1-mini e Mathpix](https://arxiv.org/abs/2603.00895),
  [transformers.js su iPad e iPhone](https://github.com/huggingface/transformers.js/issues/1242).
- La voce: [la Web Speech API](https://github.com/mdn/content/blob/main/files/en-us/web/api/web_speech_api/using_the_web_speech_api/index.md),
  [il riconoscimento sul dispositivo di Chrome](https://github.com/WebAudio/web-speech-api/blob/main/explainers/on-device-speech-recognition.md),
  [Safari nelle app installate](https://github.com/Fyrd/caniuse/blob/main/features-json/speech-recognition.json),
  [la dettatura dell'iPad nei campi come CodeMirror](https://developer.apple.com/forums/thread/718669),
  [Whisper](https://github.com/openai/whisper), [Parakeet v3](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3)
  e [parakeet.js](https://github.com/ysdede/parakeet.js),
  [transformers.js con la scheda grafica di Safari](https://github.com/huggingface/transformers.js/releases/tag/4.3.0),
  [Speech-to-LaTeX](https://huggingface.co/papers/2508.03542).
- Le lezioni: [MediaRecorder](https://github.com/mdn/browser-compat-data/blob/main/api/MediaRecorder.json),
  [lo spazio dei browser](https://github.com/mdn/content/blob/main/files/en-us/web/api/storage_api/storage_quotas_and_eviction_criteria/index.md),
  [il microfono di un'app installata sull'iPad](https://bugs.webkit.org/show_bug.cgi?id=239602),
  [Parakeet nel browser, con le misure](https://github.com/thiswillbeyourgithub/parakeet_web),
  [i limiti gratuiti di Groq](https://console.groq.com/docs/rate-limits),
  [Voxtral Transcribe 2](https://mistral.ai/news/voxtral-transcribe-2/),
  [il Garante: scuola e privacy](https://www.garanteprivacy.it/home/faq/scuola-e-privacy),
  [diritto d'autore e lezioni](https://www.unipa.it/Diritto-dautore-e-Universit/).
- La chiave, il server locale e la scelta del modello: in ABBONAMENTI.md, «Fonti».
