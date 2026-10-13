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
| 1 | «Cambia account» | fatto: sul sito dal 12 ottobre; lo studente: «va bene» |
| 2 | La pagina dei commenti, tipo FAQ | fatto: sul sito dal 13 ottobre 2026; lo studente: «va bene» |
| 3 | Le impostazioni divise in sezioni | fatto: sul sito dal 13 ottobre 2026; lo studente: «va bene» |
| 4 | Più modelli per «Spiegami» | da decidere |
| 5 | A cosa serve la chiave dell'AI | da decidere |
| 6 | Glifo anche in inglese | fatto: tutto tradotto, anche le parole delle note, i numeri, l'AI e l'informativa; sul sito vero dal 12 ottobre 2026; lo studente: «va bene» |
| 7 | Via il registro dei tocchi | fatto: sul sito dal 13 ottobre 2026; lo studente: «va bene» |
| 8 | Il pulsante ✨ con il contorno | fatto: variante B, sul sito vero dal 12 ottobre 2026; lo studente: «va bene» |

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

**Risposte e decisioni.** Lo studente, 12 ottobre 2026: «facciamo il passo 1 di grafica; aggiungiamo
il pulsante cambia account». Si fa la proposta, con il cambio che tiene nel browser note, cartelle e
lavagne dell'account di prima. L'elenco «Account su questo dispositivo» e la foto e il nome di Google
nel pulsante non li ha chiesti: restano da decidere.

Fatto sul ramo `prova` il 12 ottobre 2026:

- nella finestra «Account» il riquadro «Cambiare account o uscire» ha «Cambia account» accanto a «Esci
  dall'account», e il testo dice la differenza (cambiando restano qui; uscendo si tolgono, ed è la
  scelta giusta su un computer non tuo);
- «Cambia account» manda le modifiche e non chiede niente, perché non si perde niente: quello che non
  parte resta nello spazio dell'account e parte quando si rientra. Senza rete non parte («Per cambiare
  account serve la connessione»): non si potrebbe entrare nell'altro;
- le impostazioni che vanno con l'account e il dizionario personale (nel browser ce n'è una copia
  sola) restano da parte nello spazio dell'account e tornano quando si rientra. Prima, rientrando dopo
  il cambio nascosto, restavano quelle dell'altro account, e quelle non ancora mandate potevano finire
  nell'account sbagliato;
- l'accesso si chiude solo in questo browser; la pagina si ricarica senza account e si riapre da sola
  la finestra «Cambia account», che dice di chi sono gli appunti che restano (e, se c'è, che qualche
  modifica partirà al rientro). Chiudendola si resta senza account, con «Accedi»;
- Google chiede sempre quale account usare (`prompt: 'select_account'`), anche da «Accedi»;
- il cambio nascosto passa dagli stessi controlli: le impostazioni dell'account di prima restano da
  parte, e un avviso dice in quale account si è entrati e che gli appunti di quello di prima restano
  in questo browser;
- «Esci» resta com'è: toglie tutto da questo browser;
- l'informativa (aggiornata al 12 ottobre) dice che con «Cambia account» note, cartelle e lavagne
  restano nel browser.

Sul sito di prova l'account è spento, quindi lì «Cambia account» non si prova: com'è venuto si
vede nelle foto, e la prova nel browser (`scripts/account-test.mjs`, con il Supabase finto) fa tutto il
giro con due account Google. Lo studente, viste le foto: «va bene, portalo sul ramo principale anche
perché sul ramo di prova non posso provarlo». Sul sito dal 12 ottobre 2026 (glifo.page e il vecchio
indirizzo). Lo studente, il 12 ottobre 2026: «il punto 1 va bene». L'elenco «Account su questo
dispositivo» e la foto e il nome di Google nel pulsante restano idee per dopo: quando questo file si
cancella vanno in «Account» di ROADMAP.md.

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

**Risposte e decisioni.** Il 13 ottobre 2026 Claude ha aggiornato la proposta (nel frattempo i commenti
si aprivano anche da Impostazioni → Informazioni e tutto era in due lingue): la pagina con le domande
frequenti e i commenti, il fumetto che apre subito la finestra per scrivere, 14 domande frequenti
proposte da Claude, la pagina fuori da Google, l'indirizzo glifo.page/faq invece di /commenti (si capisce
anche in inglese), «Glifo è gratis?» lasciata fuori finché non si decidono i piani, e dal sito di prova i
commenti sempre privati (il database è quello vero). Lo studente: «fai faq, però dobbiamo prima capire
perché forse non mi convince molto. Falla e mettila su prova, poi ti dico». Fatto sul ramo `prova` il 13
ottobre 2026, con le scelte che Claude consigliava:

- **la pagina** `faq.html` (su glifo.page anche glifo.page/faq), come l'informativa: in cima la barra con
  il logo e «Apri Glifo», la lingua e il tema di Glifo, fuori dai motori di ricerca (`noindex`); il
  service worker la tiene per l'offline e non carica l'editor;
- **le domande frequenti** in cima: 14, in quattro argomenti (gli appunti, usare Glifo, l'AI, l'account),
  in italiano e in inglese. Si vede la domanda e con un clic si apre la risposta; ogni domanda ha il suo
  indirizzo (`faq.html#offline`), che va nella barra quando la si apre, e «Copia il link»; un indirizzo
  con una domanda la apre e la segna;
- **i commenti** sotto, come nella finestra di prima: le schede Problemi, Idee e Altro con quanti sono, i
  commenti con le risposte e, accanto alle schede, «Scrivi un commento»;
- **in Glifo** il fumetto apre subito «Scrivi un commento», con in cima «Prima di scrivere, guarda se la
  risposta c'è già: Domande frequenti e commenti» (il link apre la pagina in una scheda nuova; dentro
  claude.ai non c'è). In Impostazioni → Informazioni, al posto di «Commenti», ci sono «Domande frequenti e
  commenti» e «Scrivi un commento». La finestra con la lista dei commenti non c'è più;
- **dal sito di prova** i commenti partono sempre privati: al posto della spunta «Fallo vedere a tutti» la
  finestra lo dice. Si leggono nella dashboard (colonna `site` = `prova`) e si cancellano;
- **dal 18 ottobre** la pagina sul vecchio indirizzo manda a glifo.page/faq, con la stessa domanda;
- l'informativa (italiano e inglese) dice della pagina nuova, che non va nei motori di ricerca, e dei
  commenti privati dal sito di prova; il tutorial «Condividere e ritrovare gli appunti» dice del fumetto
  nuovo (il video resta: passa solo sopra il fumetto).

Sul sito di prova la pagina è https://glifo-prova.pages.dev/faq (i commenti lì sono quelli veri).

Lo studente, 13 ottobre 2026, provata la pagina: «va bene, portalo sul sito vero». Sul sito dal 13 ottobre
2026 (glifo.page/faq e il vecchio indirizzo). Ha chiesto come si risponde a chi scrive e come si toglie un
commento, per esempio un problema risolto: per ora dalla dashboard di Supabase (Table Editor → `feedback`:
`reply` per rispondere, `visible` → false per nasconderlo, o la riga eliminata), oppure chiedendolo a
Claude; rispondere e nascondere dalla pagina, con il proprio account, resta un'idea per dopo (ROADMAP.md,
nei commenti).

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
`tests/aiSettings.test.ts` e `tests/accountPosition.test.ts`. Dal 13 ottobre 2026 le impostazioni sono in
`src/ui/settings.ts` e la sezione «Account» in `accountSection` di `src/ui/account.ts` (vedi
ARCHITETTURA.md).

**Risposte e decisioni.** Lo studente, 13 ottobre 2026: «facciamo il punto 3 di GRAFICA.md». Si fa la
proposta, con le sei sezioni, e l'account diventa una sezione delle impostazioni: una finestra sola, con
il pulsante dell'account che apre le impostazioni su «Account» (se lo studente preferisce che resti anche
la finestra sua, è un cambio piccolo). Fatto sul ramo `prova` il 13 ottobre 2026:

- **la finestra**: a sinistra l'elenco delle sezioni, con le icone (quella aperta è chiara con il nome in
  indaco, come la nota aperta nella barra laterale), a destra la sezione, con il suo nome in cima, che
  scorre da sola: la finestra non cambia misura passando da una sezione all'altra. Con la tastiera le
  frecce ↑ ↓ scorrono le sezioni. Ogni cambio vale subito, come prima, e il tema resta solo qui;
- **sul telefono** (sotto i 600 px) le impostazioni prendono tutto lo schermo: prima l'elenco, con sotto
  ogni sezione una riga che dice cosa c'è dentro (sotto «Account» l'email), poi una pagina per sezione,
  con la freccia ← per tornare e il nome della sezione in alto;
- **Generale**: la lingua (per prima, come prima), il tema e la dimensione del testo; il testo della
  lingua porta con un collegamento a «Scrittura», dove si scelgono le lingue del controllo ortografico;
- **Scrittura**: i `$` automatici e il controllo ortografico, con le lingue e il dizionario;
- **AI**: prima «Spiegazioni (prova)» (il modello Qwen3, «Toglilo da questo browser», il tono), poi
  «Assistente AI (facoltativo)» con la propria chiave. «Chi spiega» e gli altri modelli (punti 4 e 5)
  arriveranno qui. I pulsanti «Impostazioni» negli errori dell'AI e di «Spiegami» ora aprono direttamente
  questa sezione;
- **Account**: quello che era nella finestra «Account» (lo stato della sincronizzazione con «Sincronizza
  ora», gli appunti fuori dall'account, «Cambia account» ed «Esci dall'account», «Scarica i miei dati» ed
  «Elimina account…»); il pulsante dell'account in fondo alla barra laterale apre le impostazioni qui.
  Senza account la sezione dice cosa dà l'account e ha «Accedi»; il pulsante in fondo alla barra laterale,
  senza account, apre come prima la finestra per entrare;
- **Dati**: il backup («Scarica backup», «Ripristina backup», con un collegamento ad «Account» per i dati
  dell'account) e «Spazio in questo browser»: appunti, cartelle e impostazioni; lavagne; ogni modello di
  «Spiegami» scaricato, con quanto pesa davvero (letto dall'elenco dei suoi pezzi) e «Togli», come
  proponeva il punto 4; il totale, con i file per usare Glifo offline, e fino a quanto il browser lascia
  arrivare Glifo;
- **Informazioni**: la versione di Glifo (il commit e il giorno), «Come si usa» e «Commenti» (si aprono
  sopra le impostazioni; le domande frequenti arriveranno con il punto 2), l'informativa e le licenze: i
  15 programmi liberi su cui è costruito Glifo, ognuno con il testo della sua licenza, che si apre anche
  offline (prima ce n'erano 5, in fondo alla guida, che ora rimanda qui). In fondo, finché c'è (punto 7),
  il registro dei tocchi;
- tutto in italiano e in inglese.

I video del tutorial non cambiano: nessuno mostra la finestra delle impostazioni o dell'account, e il fondo
della barra laterale è lo stesso. Le foto (computer e telefono, tema chiaro e scuro) sono nella chat; sul
sito di prova https://glifo-prova.pages.dev si prova tutto tranne la sezione «Account» con un account dentro
(lì l'account è spento): quella si vede nelle foto, fatte con il Supabase finto delle prove.

Lo studente, 13 ottobre 2026, viste le foto: «va bene, portalo sul sito vero». Sul sito dal 13 ottobre
2026 (glifo.page e il vecchio indirizzo), con l'account come sezione delle impostazioni (una finestra sola).

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

**Risposte e decisioni.** Lo studente, 12 ottobre 2026: «ora facciamo il punto 6; pensavo che dovremmo
aggiornare il tutorial perché abbiamo aggiunto molte funzionalità nuove e non abbiamo spiegato come
funziona». Si fa la proposta a tappe, con la lingua dal browser la prima volta. Fatto sul ramo `prova`
il 12 ottobre 2026:

- **la base** (tappa 1): `src/i18n.ts`, con ogni testo nella tabella del suo file, il nome e le due
  versioni; la prova `tests/translations.test.ts` segnala i testi senza inglese e l'italiano rimasto nel
  codice delle parti tradotte. In Impostazioni il primo riquadro è «Lingua» (Italiano, English: finché
  le impostazioni non sono divise in sezioni, punto 3; poi va in «Generale»); cambiandola Glifo salva la
  nota e si ricarica, e le altre schede aperte lo dicono. La prima volta la lingua si prende dal
  browser: italiano se tra le lingue del browser l'italiano viene prima dell'inglese, se no inglese; chi
  ha già gli appunti nel browser resta in italiano. Il trasloco su glifo.page la porta dal vecchio sito,
  altrimenti chi ha il browser in inglese vedrebbe glifo.page in inglese;
- **le schermate** (tappa 2, la prima parte): in inglese ci sono la barra laterale, le due barre, le
  viste, le finestre (impostazioni, account e accesso, condividi, commenti, conferme), la guida con tutte
  le scorciatoie, il tutorial, la lavagna, i pannelli dei simboli e di «Spiega con l'AI», l'anteprima,
  i messaggi e la pagina delle note condivise; anche la nota di benvenuto ha la versione inglese. Con
  Glifo in inglese il controllo ortografico parte con l'inglese solo, e «Glifo» non è più sottolineato;
- **il tutorial**: da 6 a 11 pagine, con i video rifatti nei due temi. Pagine nuove: «I grafici» (il
  pulsante con gli assi, lo slider, il 3D, le frecce ↑ ↓), «Le tabelle» (la tabella con le formule e
  SOMMA), «Gli schemi» (forme e frecce come in draw.io), «Spiega con l'AI» (il pulsante ✨ e i passaggi
  controllati) e «Condividere e ritrovare gli appunti» (il link, la stampa, l'account, i commenti);
  «Calcoli e controlli» ora mostra anche un limite. I video sono con Glifo in italiano: quelli inglesi
  si rifanno alla fine (tappa 6), quando anche conti e simboli sono tradotti;
- le prove nel browser girano con il browser in italiano; una prova nuova apre Glifo con il browser in
  inglese (tutorial, barre e nota di benvenuto in inglese) e torna all'italiano dalle impostazioni.
  Corretto anche «1 simboli trovati» (ora «1 simbolo trovato»).

Lo studente, 12 ottobre 2026, sulla lingua: «le impostazioni devono seguire l'account». Fatto sul ramo
`prova`: la lingua è un'impostazione come il tema (`language`, tra quelle che vanno con l'account) ed è
nell'informativa tra le impostazioni salvate nell'account. Scelta su un dispositivo, arriva sugli altri:
una pagina appena aperta (per esempio subito dopo essere entrati) si ricarica da sola nella lingua
dell'account; dove si sta già lavorando, Glifo lo dice con «Ricarica». Lo stesso vale per le altre schede.

Lo studente, 12 ottobre 2026, sulla domanda di quando portarlo sul sito vero: «non puoi tradurre tutto ora e
poi mettiamo tutto online?». Fatto lo stesso giorno, con le tappe 2-6:

- **le schermate** (tappa 2, la seconda parte): i conti (risultati, controlli, errori, lo studio di funzione,
  le formule riscritte con `\text{if}` e `\text{otherwise}`), i simboli (521 nomi, le etichette, le
  categorie e le parole inglesi per la ricerca, che trova con le due lingue e fa pesare quella di Glifo), le
  tabelle (editor, aiuto delle 68 funzioni con i nomi dell'Excel inglese, errori, modelli), i grafici
  (scritte, legende, Gantt e reticolo), gli schemi (editor, forme, modelli, SQL), il trasloco e il
  riquadro del registro dei tocchi (le sue righe restano in italiano: le legge Claude);
- **le parole delle note** (tappa 3): le italiane valgono sempre e ci sono anche le inglesi, in tutte e due le
  lingue, e i pulsanti scrivono quelle della lingua di Glifo: ```` ```graph ````, ```` ```table ```` e
  ```` ```diagram ````; `title:`, `x axis:`, `data:`, `break-even:`, `network:`, `start:`; i nomi delle
  funzioni nelle formule (`\operatorname{study}`, `domain`, `ci`, `euler`…); i mesi e «none» nei Gantt.
  Le tabelle invece nella nota restano all'italiana (1,5 e `SOMMA`), e con Glifo in inglese l'editor le
  mostra e le riceve all'inglese (1.5 e `SUM`);
- **i numeri** (tappa 4): in inglese con il punto (√2 = 1.414213…), nelle tabelle 1,234.50, le date all'inglese;
  quando chi prende appunti scrive 0{,}5, Glifo tiene la virgola;
- **l'AI** (tappa 5): con Glifo in inglese «Spiegami» e l'assistente ricevono tutto in inglese e rispondono in
  inglese; i teoremi si riconoscono anche scritti in inglese (Theorem, Definition…);
- **alla fine** (tappa 6): l'informativa in inglese nella stessa pagina (si apre nella lingua di Glifo), i
  video del tutorial in inglese, la nota di benvenuto con ```` ```graph ````, il testo dell'email per
  entrare in tutte e due le lingue (messo in Supabase dallo studente il 13 ottobre: vedi supabase/README.md), la descrizione
  dell'app installata in tutte e due le lingue.

Una prova nel browser apre Glifo in inglese con una nota scritta con le parole inglesi e controlla che
nell'anteprima, nel pannello dei simboli, negli editor, nel pannello ✨ e nelle impostazioni non si veda
italiano.

Lo studente, 13 ottobre 2026, con Glifo in inglese sul sito vero: «quello che hai fatto fin ora va bene».

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

**Risposte e decisioni.** Lo studente, 13 ottobre 2026: «facciamo il punto 7 di GRAFICA.md»; alla domanda
sull'iPad: «sì, l'ho già fatto e funziona», così il promemoria della prova sull'iPad esce da CLAUDE.md.
Fatto sul ramo `prova` il 13 ottobre 2026:

- **via dall'interfaccia** il registro in fondo a Impostazioni → Informazioni (ora la sezione finisce con
  «Privacy e licenze») e il pallino rosso sulla lavagna, con la sua finestra;
- **via dal codice** `src/board/touchlog.ts` e `src/ui/touchLogPanel.ts`, le righe della lavagna che
  scrivevano nel registro e quello che serviva solo a loro (in board.ts `ACTION_NAMES`, `TOOL_NAMES`,
  `strokeSummary`, `verb`, il pulsante con i suoi testi; `SHAPE_NAMES` in shapes.ts; `VIEW_NAMES` e
  `touchLog.resume()` in main.ts; `openTouchLogDialog` in dialogs.ts), gli stili e le due prove; il modulo
  non finisce più nemmeno nella pagina delle note condivise. La lavagna funziona come prima: dove una riga
  del registro era anche un `return`, il `return` è rimasto, e le prove della lavagna nel browser (penna,
  mano, dita, figure, selezione) passano tutte;
- **nei browser** all'avvio Glifo toglie quello che il registro aveva lasciato (`glifo.registro.v1`:
  `forgetOldKeys` in `src/store/storage.ts`), con la sua prova, la controprova e un controllo nella prova
  nel browser;
- **l'informativa** senza il paragrafo sul registro, in italiano e in inglese, con la data del 13 ottobre
  2026; README, ARCHITETTURA.md, ROADMAP.md e CLAUDE.md senza il registro; dall'idea dei commenti resta
  «allegare una foto della pagina».

Le foto (Impostazioni → Informazioni prima e dopo, computer e telefono, anche in inglese) sono nella chat;
sul sito di prova https://glifo-prova.pages.dev si prova tutto.

Lo studente, 13 ottobre 2026, viste le foto: «va bene, portalo sul sito vero». Sul sito dal 13 ottobre
2026 (glifo.page e il vecchio indirizzo).

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

**Risposte e decisioni.** Lo studente, 12 ottobre 2026: «se puoi fai anche il punto 8». Fatta prima sul
ramo `prova` la variante A, quella che Claude consigliava (il colore resta il segno che l'AI sta lavorando):

- con il pannello aperto ✨ ha un contorno indaco di 2 px con l'icona indaco dentro, al posto del
  quadrato pieno con l'icona bianca; mentre l'AI lavora contorno e icona sfumano azzurro → indaco → viola
  → rosa, con l'alone verso l'interno (la barra scorre e taglierebbe quello che esce). A riposo e con il
  pannello chiuso è come prima; con «riduci animazioni» il contorno resta viola, fermo;
- anche «Simboli», aperto, ha il contorno (il bordo e un'ombra dentro: il pulsante non cambia misura)
  invece del fondo pieno, così i due pulsanti dei pannelli si accendono allo stesso modo;
- i due pulsanti dicono con `aria-expanded` quale pannello si vede: prima lo capiva solo chi guardava.

Le foto (`pulsante-ai-chiaro.png` e `pulsante-ai-scuro.png`, mandate nella chat) mettono accanto oggi, A
e B nei due temi, con quattro momenti dell'animazione. A riposo l'icona è grigia come gli altri pulsanti
della barra, non indaco come era scritto qui sopra (la regola indaco era coperta da quella dei pulsanti):
resta così.

Lo studente, viste le foto: «variante B, simboli con il contorno va bene». Fatto sul ramo `prova` il 12
ottobre 2026: con il pannello aperto ✨ ha un contorno di 2 px sfumato azzurro → indaco → viola → rosa,
con l'icona indaco dentro (un anello disegnato con una maschera: dentro il pulsante resta trasparente, e
la misura non cambia); mentre l'AI lavora i colori del contorno girano (l'angolo della sfumatura,
registrato con `@property`; dove il browser non lo conosce il contorno resta fermo), dentro c'è la luce
dello stesso neon e l'icona sfuma come prima. Con «riduci animazioni» il contorno resta sfumato e fermo,
con la luce viola. «Simboli» resta con il contorno indaco.

Sul sito vero dal 12 ottobre 2026, insieme al punto 6; lo studente, il 13: «quello che hai fatto fin ora va
bene».

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
