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
| 1 | A cosa serve l'AI dei modelli di frontiera | da discutere |
| 2 | Dalla lavagna alla nota: la formula presa con il laccio diventa LaTeX | da discutere |
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

**Risposte e decisioni.** —

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
`src/board/store.ts`; KaTeX in `src/render/`.

**Risposte e decisioni.** —

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
La dettatura del sistema (il microfono della tastiera dell'iPad e del telefono, Win+H su Windows, la
dettatura del Mac) scrive in qualsiasi campo di testo, quindi anche nell'editor di Glifo (da provare), ma
solo parole: «x al quadrato», non $x^2$.

**Cosa se ne sa.**

- **Il riconoscimento del browser** (la Web Speech API) è gratis e non scarica niente, ma di solito la voce
  va a un server: in Chrome a Google, in Safari ad Apple; Firefox non ce l'ha. Serve la rete.
- **Un modello nel browser**, senza server: Whisper (aperto, di OpenAI) gira con transformers.js e WebGPU,
  come i modelli di «Spiegami». Capisce bene l'italiano nelle versioni più grandi, che pesano da qualche
  centinaio di MB a più di un GB e vanno bene su un computer con una buona scheda grafica.
- **Un servizio** (con la propria chiave o con l'AI di Glifo) è il più preciso e si paga a minuti.

**Proposta di Claude.**

- Un pulsante con il microfono nella barra: si parla e il testo compare dove c'è il cursore.
- **Le formule dette a parole**: «integrale da zero a uno di x al quadrato in dx» diventa
  `$\int_0^1 x^2 \, dx$`. È il pezzo che manca alla dettatura del sistema, che scrive solo parole, e che
  serve a chi prende appunti di matematica. Lo fa un modello che traduce la frase in LaTeX (anche quello
  nel browser: è un lavoro corto), aiutato dai nomi italiani dei simboli che Glifo ha già nella ricerca
  («alfa», «integrale», «sommatoria»); Glifo mostra la formula disegnata prima di inserirla.
- Chi riconosce la voce: per cominciare quello del browser, dove c'è (gratis, niente da scaricare, ma la
  voce va a Google o ad Apple e serve la rete); per chi vuole che la voce resti sul dispositivo, o lavora
  senza rete, un modello nel browser che si scarica una volta, come quelli di «Spiegami».

**Da decidere.**

- Per il testo basta la dettatura del sistema, e Glifo aggiunge solo le formule dette a parole? Oppure un
  pulsante di Glifo che fa tutto?
- Va bene che la voce vada ai server di Google o di Apple, o deve restare sul dispositivo?

**Con gli abbonamenti.** Dettare il testo non costa niente a Glifo (lo fa il browser, o un modello nel
browser): può stare nel piano gratuito, perché è scrivere. Le formule dette a parole sono gratis con il
modello nel browser; con l'AI di frontiera, nei piani a pagamento o con la propria chiave.

**Nel codice.** Non c'è niente da cui partire. L'editor è CodeMirror (`src/editor/`): il testo dettato si
inserisce al cursore come una battitura.

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

**Cosa se ne sa.**

- **Registrare** nel browser si può (MediaRecorder): due ore di voce compressa sono qualche decina di MB.
  Sull'iPad, però, Safari smette di ascoltare quando lo schermo si spegne o si passa a un'altra app: per
  due ore di lezione è più sicuro registrare con l'app del telefono e poi caricare il file in Glifo.
- **Trascrivere nel browser** (Whisper) è gratis e privato, ma per due ore serve un computer con una buona
  scheda grafica, e anche lì ci vuole tempo.
- **Con un servizio** costa da pochi centesimi a circa 40 centesimi per ora di audio, secondo il servizio
  (ABBONAMENTI.md: da 15 a 36 centesimi, più l'AI che ne fa appunti).
- **Dalla trascrizione agli appunti** serve un modello che legga testi lunghi: due ore di lezione sono
  decine di migliaia di parole, troppe per i modelli nel browser, che leggono qualche pagina alla volta.

**Proposta di Claude.** Tre pezzi, ognuno utile da solo:

1. **Registrare** dentro Glifo, sul computer, oppure **caricare un file audio** registrato con il
   telefono (più sicuro per due ore, e l'unico modo sull'iPad). L'audio sta nello spazio del browser per i
   dati grandi, con Glifo che chiede al browser di tenerlo.
2. **L'audio legato agli appunti**, come in Notability: mentre si registra e si scrive, Glifo ricorda a
   che minuto è stata scritta ogni riga; dopo, toccando una riga, si riascolta quel momento della lezione.
   Non serve l'AI: è gratis e funziona senza rete.
3. **Trascrivere e farne appunti**: la voce diventa testo (con lo stesso riconoscimento del punto 4), poi
   l'AI ne fa appunti con titoli, elenchi e formule in LaTeX, e Glifo controlla i conti; la trascrizione
   resta accanto, per ricontrollare. Per due ore servono un servizio (o un computer potente) per la voce
   e un modello di frontiera per gli appunti.

**Le regole.** Registrare una lezione per studiare è in genere permesso; per diffonderla (anche
condividendo una nota con l'audio o con la trascrizione) serve il consenso di chi parla, cioè del
professore e di chi interviene, e alcune università hanno regole loro. Glifo lo ricorda quando si comincia
a registrare, e l'audio non va mai nelle note condivise.

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
- La chiave, il server locale e la scelta del modello: in ABBONAMENTI.md, «Fonti».
