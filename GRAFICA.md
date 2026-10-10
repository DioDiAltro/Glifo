# La grafica: le otto richieste del 10 ottobre 2026

Lo studente, il 10 ottobre 2026: «ora la grafica», otto cose viste a colpo d'occhio, da discutere
prima di toccare il codice, ricordando che Glifo avrà gli abbonamenti. Qui, per ogni punto: com'è
oggi, la proposta di Claude, cosa resta da decidere e, man mano, le risposte e le decisioni.

**Come si usa questo file.** Si fa un punto alla volta: se ne parla, la risposta e la decisione si
scrivono nel punto, poi si fa sul ramo `prova` (con le foto e, quando serve provarlo, Glifo su una
pagina privata di claude.ai) e, quando lo studente dice «va bene», va sul sito. Le decisioni sugli
abbonamenti vanno anche in [ABBONAMENTI.md](ABBONAMENTI.md). Il file serve solo per questo lavoro:
quando i punti sono tutti fatti si cancella, insieme alla voce «La grafica» di
[ROADMAP.md](ROADMAP.md) e alla riga che lo indica in CLAUDE.md.

| Punto | Cosa | Stato |
|---|---|---|
| 1 | «Cambia account» | da decidere |
| 2 | La pagina dei commenti, tipo FAQ | da decidere |
| 3 | Le impostazioni divise in sezioni | da decidere |
| 4 | Più modelli per «Spiegami» | da decidere |
| 5 | A cosa serve la chiave dell'AI | da decidere |
| 6 | Glifo anche in inglese | da decidere |
| 7 | Via il registro dei tocchi | deciso: si toglie (manca una risposta) |
| 8 | Il pulsante ✨ con il contorno | da decidere |

## 1. «Cambia account»

**Com'è oggi.** In fondo alla barra laterale il pulsante dell'account mostra un cerchio con la prima
lettera dell'email, l'email e lo stato. Il clic apre la finestra «Account»: «Sei entrato come…», la
sincronizzazione con «Sincronizza ora» («Accedi di nuovo» solo con l'accesso scaduto), gli appunti
fuori dall'account con «Aggiungili all'account» (se ci sono), «Esci dall'account» e «I tuoi dati»
(«Scarica i miei dati», «Elimina account…», l'informativa).

- Per cambiare account oggi si fa «Esci» e poi «Accedi». «Esci» manda le modifiche e, se qualcosa non
  è partito o ci sono lavagne con qualcosa di scritto, chiede «Uscire lo stesso?»; poi toglie dal
  browser note, cartelle e lavagne dell'account. Le note tornano rientrando, le lavagne no: non vanno
  mai sul server. Impostazioni e dizionario restano nel browser.
- L'accesso con Google non chiede quale account usare (manca `prompt: 'select_account'`), quindi può
  rientrare da solo in quello di prima (da provare con il Google vero: nelle prove Google è finto).
- C'è già un cambio nascosto: con l'accesso scaduto, «Accedi di nuovo» e poi Google con un altro
  account cambia account senza dire niente. Le note del primo restano nel browser, non si vedono, e le
  sue modifiche non ancora mandate partono solo quando ci si rientra. Con l'email no: la casella è
  bloccata sull'email dell'account.

**Proposta.** Un pulsante «Cambia account» accanto a «Esci»:

- manda le modifiche come «Esci», ma senza perdere niente: quello che non parte resta nel browser e
  parte quando si rientra in quell'account;
- lascia nel browser note, cartelle e lavagne dell'account di prima;
- chiude l'accesso e riapre la finestra di accesso, con Google che chiede sempre quale account;
- poi la pagina si ricarica con le note dell'altro account.

«Esci» resta quello che toglie tutto da questo browser, per quando si usa il computer di un altro. Il
cambio nascosto passa dagli stessi controlli. In più, se lo studente vuole:

- l'elenco «Account su questo dispositivo», come in Gmail, per rientrare più in fretta: con Google
  basta sceglierlo, con l'email serve di nuovo il codice (il browser tiene un accesso alla volta);
- la foto e il nome di Google nel pulsante, al posto della lettera (Glifo li riceve già; la foto
  arriva dai server di Google, e va scritto nell'informativa).

**Da decidere.**

- Il cambio tiene nel browser note e lavagne dell'account di prima? Claude consiglia di sì.
- L'elenco degli account usati sul dispositivo?
- La foto e il nome di Google nel pulsante?

**Con gli abbonamenti.** Il piano è dell'account, non del dispositivo: cambiando account cambia
anche il piano, e la finestra dell'account lo mostrerà.

**Nel codice.** `AccountButton` e `openAccountDialog` in `src/ui/account.ts`; `signOutAccount`,
`completeSignIn` e il ritorno da Google in `src/main.ts`; `signInWithGoogle` in
`src/account/supabase.ts`; gli spazi degli account in `src/account/space.ts`; la prova nel browser in
`scripts/account-test.mjs` (il Google finto non fa scegliere l'account).

**Risposte e decisioni.** —

## 2. La pagina dei commenti, tipo FAQ

**Com'è oggi.** Il fumetto in fondo alla barra laterale apre la finestra «Commenti», dentro Glifo: le
schede Problemi, Idee e Altro con quanti sono (gli ultimi 300) e ogni commento con il nome (o
«Anonimo»), la data e la risposta di chi fa Glifo. «Scrivi un commento» apre sopra la finestra per
scrivere: il tipo, il messaggio, il nome e l'email facoltativi e «Fallo vedere a tutti» (già
spuntata). Senza rete i commenti non si vedono; dentro claude.ai non si leggono e non partono. Nel
database (tabella `feedback`) tutti leggono solo i commenti visibili, e solo tipo, nome, testo, data e
risposta.

**Proposta.** Una pagina a parte, come l'informativa: `commenti.html`, cioè `glifo.page/commenti`.

- In cima le **domande frequenti**, scritte da chi fa Glifo dentro la pagina: si leggono anche senza
  rete (l'app installata tiene le pagine).
- Sotto, i commenti divisi come oggi, con le risposte, e «Scrivi un commento» (la stessa finestra).
- In Glifo il fumetto apre subito la finestra per scrivere, con il link «Domande frequenti e
  commenti» che apre la pagina.
- La pagina si manda a chiunque con il link e non carica l'editor. Il database non cambia.
- Le prime domande frequenti le propone Claude e lo studente le corregge, per esempio: dove sono
  salvati i miei appunti; funziona senza internet; come installo Glifo sul telefono o sul computer;
  perché «Spiegami» non parte sul telefono; come porto gli appunti su glifo.page; come elimino il mio
  account. Quando una domanda torna spesso nei commenti, diventa una domanda frequente.

**Da sapere.** Il limite di 60 commenti all'ora è uno solo per tutti: una persona che ne manda 60
blocca gli altri per un'ora. Per ora va bene; se diventa un problema, serve un limite per persona,
con una funzione sul server.

**Da decidere.**

- Il fumetto apre subito la finestra per scrivere, e la pagina a parte ha domande frequenti e
  commenti: va bene?
- Le prime domande frequenti le propone Claude?
- La pagina compare nelle ricerche di Google? Sì: più persone trovano Glifo; no: i nomi di chi scrive
  non finiscono su Google (come le note condivise, che non compaiono). Claude consiglia di no, almeno
  all'inizio.

**Con gli abbonamenti.** Tra le domande frequenti andranno anche quelle sui piani (cosa è gratis,
come si disdice); con lo stesso stampo arriveranno le pagine dei prezzi e dei termini di servizio,
che servono prima di incassare.

**Nel codice.** `src/ui/comments.ts` (la lista dei commenti va tolta dalla finestra per usarla anche
nella pagina) e `src/ui/feedback.ts`; `openComments` in `src/main.ts`; le pagine della build in
`vite.config.ts` (oggi `index.html`, `privacy.html` e `nota.html`); il collegamento come
`PRIVACY_URL` in `src/ui/links.ts`.

**Risposte e decisioni.** —

## 3. Le impostazioni divise in sezioni

**Com'è oggi.** Una finestra con una colonna sola che scorre, e ogni cambio vale subito. Sette
riquadri:

1. Aspetto: il tema (Automatico, Chiaro, Scuro) e la dimensione del testo;
2. Editor: i `$ … $` messi da soli attorno ai simboli;
3. Controllo ortografico: acceso o spento, le lingue (italiano e inglese, solo italiano, solo
   inglese), le parole aggiunte al dizionario;
4. Assistente AI (facoltativo): servizio, chiave, modello, indirizzo, server proxy;
5. Spiegazioni (prova): il modello Qwen3, «Toglilo da questo browser», il tono;
6. I tuoi dati: «Scarica backup», «Ripristina backup», l'informativa;
7. Registro dei tocchi (lavagna).

Con l'account vanno il tema, la dimensione del testo, i `$`, l'ortografia con le lingue, il modello
di Claude e il dizionario; il resto (chiavi, servizi, modello di «Spiegami», tono) resta sul
dispositivo.

**Proposta.** A sinistra l'elenco delle sezioni, a destra quella scelta; sul telefono una pagina per
sezione, con la freccia per tornare. Ogni cambio continua a valere subito, e il tema resta solo qui
(decisione di ARCHITETTURA.md).

- **Generale**: la lingua (nuova, punto 6), il tema, la dimensione del testo;
- **Scrittura**: i `$` automatici, il controllo ortografico con le lingue, il dizionario;
- **AI**: chi spiega e con quale modello, il tono, la propria chiave (punti 4 e 5);
- **Account**: quello che oggi è nella finestra «Account», con «Cambia account» (punto 1);
- **Dati**: backup e ripristino, e quanto spazio occupano nel browser note, lavagne e modelli
  dell'AI (un modello può pesare più di 2 GB, e oggi non si vede);
- **Informazioni**: la versione di Glifo, la guida «Come si usa», commenti e domande frequenti,
  l'informativa, le licenze.

**Da decidere.**

- Le sezioni vanno bene?
- L'account diventa una sezione delle impostazioni (il pulsante dell'account apre le impostazioni su
  «Account»: una finestra sola) o resta anche la sua finestra?

**Con gli abbonamenti.** Una sezione «Abbonamento»: il piano, il rinnovo, le ricevute e il pulsante
per disdire. Quel pulsante (il «pulsante di recesso») è obbligatorio dal 19 giugno 2026 e deve
trovarsi subito.

**Nel codice.** `openSettingsDialog`, `aiFieldset` ed `explainFieldset` in `src/ui/dialogs.ts`
(`dialogShell` serve anche alle altre finestre); le impostazioni e quali vanno con l'account
(`ACCOUNT_SETTINGS`) in `src/store/settings.ts`; le prove che leggono i testi delle impostazioni:
`tests/aiSettings.test.ts` e `tests/accountPosition.test.ts`.

**Risposte e decisioni.** —

## 4. Più modelli per «Spiegami»

**Com'è oggi.** Tre modelli: Qwen3 0.6B (circa 0,4 GB da scaricare), 1.7B (circa 1 GB, quello di
partenza) e 4B (circa 2,3 GB). Si scaricano da Hugging Face la prima volta e restano nel browser;
«Toglilo da questo browser» toglie quello scelto. Le grandezze sono scritte a mano.

WebLLM 0.2.85, l'ultima versione (settembre 2026), ha 165 voci, circa 70 modelli: Qwen3 (0.6B,
1.7B, 4B, 8B), Qwen3.5 (0.8B, 2B, 4B, 9B), Qwen2.5, Llama 3.1 e 3.2, Gemma 3, Phi 3.5 e 4-mini,
Mistral 7B, Ministral 3, SmolLM2, DeepSeek-R1-Distill, Hermes, OLMo 2 e altri. La memoria della
scheda grafica che chiedono, nella versione più leggera:

| Modello | Memoria |
|---|---|
| Gemma 3 1B | 0,7 GB |
| Llama 3.2 1B | 0,9 GB |
| Qwen3 0.6B | 1,4 GB |
| Qwen3.5 0.8B | 1,6 GB |
| Qwen3 1.7B | 2,0 GB |
| Qwen3.5 2B | 2,2 GB |
| Llama 3.2 3B | 2,3 GB |
| Qwen3 4B | 3,4 GB |
| Phi 4-mini | 3,4 GB |
| Qwen3.5 4B | 3,9 GB |
| Mistral 7B | 4,6 GB |
| Qwen3 8B | 5,7 GB |
| Qwen3.5 9B | 6,4 GB |
| Llama 3.1 70B | 31 GB |

**Perché non tutti così come sono.** «Spiegami» è fatto per i Qwen3:

- il modello chiede i conti al motore scrivendo `<tool_call>` nel testo: i Qwen e gli Hermes lo sanno
  fare, molti altri no;
- `enable_thinking: false` spegne il ragionamento dei Qwen3, gli altri non lo conoscono;
- servono 4096 token di testo, e alcune versioni ne leggono 1024 o 2048;
- il messaggio con le regole è stato corretto provando i Qwen3;
- in italiano i modelli piccoli che non sono Qwen scrivono peggio (SmolLM2, TinyLlama e OLMo quasi
  solo in inglese);
- le licenze: i Qwen3 sono Apache 2.0 (i Qwen3.5 da controllare); Qwen2.5 3B è solo per la ricerca e
  non va con Glifo a pagamento; Llama e Gemma hanno condizioni loro (per Llama la scritta «Built with
  Llama»).

**Proposta.** Sceglie chi usa Glifo, da un elenco ragionato:

- **Consigliati** (provati con Glifo): Qwen3 0.6B, 1.7B, 4B e anche l'8B, per chi ha una buona scheda
  grafica; i Qwen3.5 dopo le prove;
- **Altri modelli**: quelli che passano i controlli (si chatta, almeno 4096 token, una licenza che va
  bene), con peso e memoria e l'avviso «non provato con Glifo: può sbagliare di più». A quelli che non
  sanno chiedere i conti al motore Glifo dà i conti già fatti nel primo messaggio, e poi controlla i
  passaggi come sempre;
- nelle avanzate, l'elenco completo;
- i modelli scaricati, ognuno con quanto pesa e «Togli» (anche in Impostazioni → Dati), perché
  provandone tre si riempie il disco;
- le grandezze lette da WebLLM e dai file del modello, non più scritte a mano.

**Da decidere.**

- Elenco ragionato con quello completo nelle avanzate (Claude consiglia questo), o tutto subito?
- Il Qwen3 8B tra i consigliati?

**Con gli abbonamenti.** I modelli nel browser non costano niente a Glifo: restano gratis per tutti,
in ogni piano.

**Nel codice.** L'elenco e `webllmId` in `src/ai/localModels.ts`; `src/ai/llmWorker.ts`
(`enable_thinking`); il formato degli strumenti in `src/ai/tools.ts`; `systemPrompt` e
`CONTEXT_TOKENS` in `src/ai/explain.ts`; l'elenco completo è `prebuiltAppConfig.model_list` di
`@mlc-ai/web-llm` (con `vram_required_MB` e il contesto di ogni modello).

**Risposte e decisioni.** —

## 5. A cosa serve la chiave dell'AI

**Com'è oggi.** Nelle impostazioni, «Assistente AI (facoltativo)»: il servizio (Anthropic, Gemini,
OpenRouter, Ollama o un altro compatibile con OpenAI), la chiave e il modello. Serve **solo** a
«Chiedi all'AI» nella ricerca dei simboli: si descrive a parole un simbolo che non si trova (Ctrl +
Invio, o Invio quando non ci sono risultati) e arrivano fino a 4 proposte in LaTeX, con «Inserisci» e
«Copia». Il testo nelle impostazioni dice: «La ricerca dei simboli funziona sempre, anche offline.
Per le domande più complesse puoi usare l'AI con una tua chiave.» «Spiegami» e il pannello ✨ (con la
chat) non la usano mai: solo Qwen3 nel browser. Dentro claude.ai «Chiedi all'AI» usa l'account
Claude, mentre le spiegazioni non partono.

**Proposta.**

- La chiave anche per spiegare: «Spiegami», il pannello ✨ e la chat.
- Nella sezione AI delle impostazioni una scelta chiara, «Chi spiega»:
  - «Il modello nel tuo browser»: gratis, privato, anche senza rete dopo averlo scaricato; serve un
    computer con una buona scheda grafica;
  - «Il servizio della tua chiave»: molto più bravo, anche su telefono e iPad, niente da scaricare;
    serve la rete, e il testo della nota va al servizio scelto.
- Glifo controlla i passaggi allo stesso modo, con ✓ e ✗.
- Testi chiari: la chiave serve a «Chiedi all'AI» nei simboli e, se lo si sceglie, a spiegare.
- L'informativa si aggiorna (le note da spiegare vanno al servizio scelto).
- Con la chiave il modello chiede i conti al motore nel modo dei servizi (gli «strumenti» di
  Anthropic e di OpenAI), non con `<tool_call>` scritto nel testo.
- Dentro claude.ai le spiegazioni potrebbero usare l'account Claude, come già «Chiedi all'AI».

**Da decidere.** La chiave anche per spiegare? Claude consiglia di sì, sapendo che così le
spiegazioni con la propria chiave restano gratis per sempre (vedi «Gli abbonamenti» qui sotto).

**Con gli abbonamenti.** In «Chi spiega» arriverà una terza voce, «L'AI di Glifo», inclusa nei piani
a pagamento: la stessa strada, cambia solo chi risponde.

**Nel codice.** `askAi` e `askCompatible` in `src/ai/assistant.ts`; i servizi in `src/ai/services.ts`;
«Chiedi all'AI» in `src/ui/sidePanel.ts`; le spiegazioni in `src/ui/explainPanel.ts` e
`src/ui/explainChat.ts`, il giro con gli strumenti in `converse` (`src/ai/explain.ts`); la demo su
claude.ai in `src/host.ts`.

**Risposte e decisioni.** —

## 6. Glifo anche in inglese

**Com'è oggi.** Tutto in italiano, scritto direttamente nel codice: non c'è niente per tradurre. I
testi sono tra 2.000 e 3.000: i più numerosi nei conti (`src/math`: risultati ed errori),
nell'interfaccia (`src/ui`, con la guida «Come si usa»), nei simboli (circa 510, con il nome e le
parole per la ricerca), nelle tabelle (76 funzioni con la riga d'aiuto), nei grafici, negli schemi e
nell'AI. In più: i 12 video della guida, l'informativa, la nota di benvenuto, l'email per entrare (i
modelli sono in Supabase), il nome e la descrizione dell'app installata.

Cosa c'è già: il controllo ortografico ha l'inglese (impostazione «Lingue»); le funzioni delle
tabelle accettano già i nomi inglesi (SUM, AVERAGE, IF…); nelle formule si scrive già 0.5 oltre a
0{,}5; la ricerca dei simboli ha già qualche parola inglese.

**Proposta, a tappe.**

1. **La base**: ogni testo ha un nome e due versioni, italiano e inglese, e una prova segnala quelli
   senza traduzione. La prima volta la lingua si prende dal browser (chi lo ha in un'altra lingua
   vede l'inglese), poi si sceglie in Impostazioni → Generale (Italiano, English); cambiandola la
   pagina si ricarica.
2. **Le schermate**: da lì ogni schermata nuova o rifatta (impostazioni, account, commenti) nasce
   nelle due lingue; poi si traduce il resto, partendo da quello che vede per primo chi arriva (barra
   laterale, barre, finestre, guida), poi i messaggi dei conti, i simboli, le tabelle e gli schemi.
3. **Le note**: le parole italiane che si scrivono nelle note (```` ```grafico ````,
   ```` ```tabella ````, `titolo:`, `asse x:`, `dati:`, `pareggio:`, `gantt:`, `reticolo:`,
   `\operatorname{studio}`, `\operatorname{livelli}`…) restano valide per sempre, e si aggiungono
   quelle inglesi; i pulsanti scrivono quelle della lingua scelta. Una nota si vede uguale per tutti,
   in qualunque lingua.
4. **I numeri**: per chi usa l'inglese i risultati con il punto (3.14), e le date all'inglese.
5. **L'AI**: risponde nella lingua scelta (i Qwen3 vanno anche meglio in inglese).
6. **Alla fine**: informativa, domande frequenti, nota di benvenuto, i video della guida rifatti in
   inglese (lo script c'è già) e l'email per entrare in italiano e in inglese insieme.

La lingua di Glifo e quella in cui si scrive restano separate: si può avere Glifo in inglese e
scrivere in italiano (il controllo ortografico ha la sua impostazione). Da quel momento ogni cosa
nuova va scritta nelle due lingue, e le regole di CLAUDE.md cambiano: l'interfaccia in italiano e in
inglese, con lo studente sempre in italiano. Per questo conviene farlo presto.

**Da decidere.**

- Va bene a tappe, in quest'ordine?
- La prima volta la lingua dal browser?

**Con gli abbonamenti.** L'inglese apre Glifo fuori dall'Italia: anche prezzi, termini di servizio e
pagamento in due lingue (il servizio di pagamento, il *merchant of record*, ha già le lingue e paga
l'IVA dei paesi europei).

**Nel codice.** Tutto `src/`. Le parole delle note in `src/render/markdown.ts`, `src/graph/spec.ts`,
`src/graph/tableGraph.ts`, `src/graph/planBlock.ts` e `src/math/parse.ts`; i numeri in
`src/math/format.ts`, `src/math/sheet.ts` e `src/spreadsheet/format.ts`; i messaggi dell'AI in
`src/ai/explain.ts` e `src/ai/assistant.ts`; le date con `'it-IT'` in vari file; le prove nel
browser (`scripts/smoke-test.mjs`) controllano i testi italiani.

**Risposte e decisioni.** —

## 7. Via il registro dei tocchi

**Com'è oggi.** In fondo alle impostazioni, «Registro dei tocchi (lavagna)»: acceso, registra penna,
dita e mouse e le decisioni della lavagna; il pallino rosso sulla lavagna lo apre; «Copia»,
«Scarica», «Condividi», «Svuota». Sono circa 1.050 righe tra codice, prove e stili, e il modulo
finisce anche nella pagina delle note condivise.

**Deciso** (lo studente, 10 ottobre 2026): si toglie, perché serviva solo mentre sviluppava la
lavagna.

**Cosa si fa.** Via dalle impostazioni, dalla lavagna (il pallino rosso) e dal codice, con le sue
prove: la lavagna funziona uguale, perché il registro scriveva soltanto. Via anche il paragrafo
dell'informativa (con la data nuova) e le righe nei documenti; nei browser si cancella quello che è
rimasto (`glifo.registro.v1`). Dall'idea dei commenti «allegare il registro dei tocchi o una foto
della pagina» resta la foto.

**Da sapere.** La prova sull'iPad con la Apple Pencil dei promemoria di CLAUDE.md è stata fatta? Se
sì, il promemoria si toglie; se no, resta senza il registro: se qualcosa non va, basta raccontarlo.

**Nel codice.** `src/board/touchlog.ts` e `src/ui/touchLogPanel.ts`; in `src/board/board.ts` le
chiamate `touchLog.add` e le tabelle usate solo dal registro (`ACTION_NAMES`, `TOOL_NAMES`…), da
togliere insieme, se no `tsc` (noUnusedLocals) si ferma; in `src/main.ts` `touchLog.resume()` e
`VIEW_NAMES`; `SHAPE_NAMES` in `src/board/shapes.ts`; le prove `tests/boardTouchLog.test.ts`,
`tests/boardTouchLogWhere.test.ts` e il pezzo di `scripts/smoke-test.mjs`.

**Risposte e decisioni.** —

## 8. Il pulsante ✨ con il contorno

**Com'è oggi.** Il pulsante ✨ dopo `$$`, alto 30 px come gli altri della barra. A riposo è l'icona
indaco, senza fondo né bordo; con il pannello AI aperto un quadrato pieno indaco con l'icona bianca.
Mentre l'AI lavora, con il pannello chiuso l'icona sfuma azzurro → indaco → viola → rosa con l'alone
(come un neon), con il pannello aperto è il fondo a cambiare colore; se finisce con il pannello
chiuso compare il pallino rosso. Con «riduci animazioni» il colore resta fermo.

**Proposta.** Con il pannello aperto, al posto del quadrato pieno, un contorno spesso (2 px) con
dentro la solita icona; mentre lavora, contorno e icona sfumano nei quattro colori con l'alone, dentro
il pulsante come oggi (la barra scorre e taglierebbe quello che esce). A riposo e con il pannello
chiuso resta com'è. Due varianti, da vedere prima in foto nei due temi:

- **A**: contorno indaco, che si colora solo mentre l'AI lavora;
- **B**: contorno già sfumato dall'azzurro al rosa, con i colori che girano mentre lavora.

**Da decidere.**

- A o B?
- «Simboli», quando è aperto, è anche lui un pulsante pieno: resta così o passa al contorno?

**Nel codice.** Gli stili in `src/styles/app.css` (`.ai-toggle`, `.is-working`, `.has-news`, i colori
`--ai-1`…`--ai-4` dei due temi); gli stati in `src/ui/aiActivity.ts`.

**Risposte e decisioni.** —

## Gli abbonamenti, in tutto questo

Lo studente ha chiesto di ricordare che Glifo avrà gli abbonamenti (anche in ABBONAMENTI.md, «Com'è
andata la discussione», punto 18):

- **account**: il piano è dell'account; cambiando account cambia anche il piano (punto 1);
- **impostazioni**: la sezione «Abbonamento», con il pulsante per disdire (punto 3);
- **AI**: «Chi spiega» avrà tre voci, il modello nel browser (gratis per tutti), la propria chiave e,
  nei piani a pagamento, l'AI di Glifo; fatta adesso con due, la terza si aggiunge senza rifare
  niente (punti 4 e 5);
- **pagine**: la pagina dei commenti è fatta come l'informativa, e con lo stesso stampo verranno i
  prezzi e i termini di servizio (punto 2), anche in inglese (punto 6);
- **da decidere bene**: se le spiegazioni con la propria chiave arrivano adesso, restano gratis per
  sempre (quello che è gratis non si toglie più). Per Claude va bene: a Glifo non costano niente e
  quasi nessuno si fa una chiave; i piani a pagamento venderanno l'AI senza chiave, i modelli migliori
  e il tutor. La decisione va anche in ABBONAMENTI.md, «Deciso».

## In che ordine

Proposta di Claude: prima le cose piccole (7, 8 e 1), poi la base per le due lingue insieme alle
impostazioni nuove (6 e 3), così i testi nuovi nascono già in inglese; poi la pagina dei commenti (2),
la chiave e i modelli (5 e 4), infine il resto dell'inglese. Tutto sul ramo `prova`; fino al trasloco
del 18 ottobre (l'avviso parte il 12) il sito vero cambia il meno possibile.
