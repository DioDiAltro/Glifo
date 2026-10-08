# Idee per il futuro

Le cose da aggiungere a Glifo. Quella «in programma» è la prossima; quando si riprende
il lavoro si parte da qui, e quando una voce è fatta si toglie.

**Per chi è Glifo:** non solo studenti universitari, ma chiunque lavori con file Markdown
(`.md`): appunti, paper scientifici, file `SKILL.md` per gli assistenti AI.

**A cosa servono calcoli e grafici** (spiegato dallo studente il 3 ottobre 2026): Glifo è prima di
tutto un posto dove si scrive. Calcoli e grafici servono a quello che si scrive, in due modi: a
**controllare** che sia giusto (scrivo che x² è una parabola rivolta verso l'alto e il grafico me lo
conferma; calcolo il volume della sfera con un integrale e deve venire 4/3 πr³) e a **mostrare**
quello che si studia (chi scrive un articolo ci mette i grafici di quello che sta studiando o
scoprendo). Conta che il controllo funzioni su quello che uno scrive davvero e che i grafici si
possano mostrare, più che coprire ogni argomento dei corsi.

## In programma

### Account: i propri appunti su ogni dispositivo, anche da condividere

**Cosa:** ognuno ha il suo account e ritrova gli stessi appunti su PC, tablet e telefono.
Gli appunti si possono mandare a un'altra persona o tenere in una cartella condivisa. Più
avanti l'account servirà anche per l'abbonamento (vedi «Più avanti»).

**Oggi:** l'account c'è, in prova. Si entra con Google o con un'email e gli appunti si
sincronizzano tra i dispositivi (passi 1-3 e l'accesso con Google del passo 4). Una nota si
condivide con un link, come in Gemini (il primo pezzo del passo 5). Per ora entrano
in pochi: con Google gli indirizzi aggiunti tra i «Test users» dell'app Google (fino a 100),
con l'email i membri del team Supabase. Chi non accede continua a usare Glifo come prima, con
gli appunti nel browser.

**Servizio scelto: Supabase**, sul piano gratuito (progetto `glifo`, vedi
[supabase/README.md](supabase/README.md)). Dà già pronti database (Postgres), login e
funzioni lato server:

- condivisione e cartelle si descrivono bene in un database relazionale, e le regole di
  accesso stanno nel database stesso: ognuno vede solo le sue note e quelle delle cartelle
  condivise con lui, e lo si può verificare con i test;
- login con un codice di 6 cifre via email, che funziona anche nell'app installata su
  iPhone, e con Google;
- tutto in Europa (Francoforte), dati di accesso compresi: più semplice per il GDPR;
- funzioni lato server (Edge Functions) e spazio per i file, che serviranno per pagamenti,
  trascrizione e AI senza chiave;
- open source e basato su Postgres: se un giorno serve, si può cambiare fornitore.

Da sapere (dati controllati il 30/09/2026):

- Piano gratuito: database da 500 MB, 50.000 utenti attivi al mese, al massimo 2 progetti.
  Va in pausa dopo 7 giorni con poco uso e lo riattiva solo il proprietario: va bene
  finché lo sviluppiamo e lo usi tu.
- Per un gruppo di compagni che lo usano ogni giorno il piano gratuito basta. Con tanti
  utenti, o per non rischiare la pausa (per esempio d'estate), conviene il piano Pro, 25
  dollari al mese per progetto.
- Per mandare le email di accesso agli utenti serve un servizio di posta nostro (SMTP):
  gratis con un account Gmail, oppure con un dominio (es. glifo.app, circa 10-20 € l'anno,
  che può ospitare anche il sito) e un servizio come Resend. Per le prove basta l'email del
  proprietario, a cui Supabase scrive da solo. Intanto si entra anche con Google (vedi il
  passo 4).

Perché non gli altri:

- **Firebase:** i dati sono documenti (NoSQL), e condivisione e permessi si scrivono
  peggio; funzioni lato server e spazio per i file richiedono il piano a consumo con
  carta di credito; i dati di accesso sono trattati negli USA.
- **GitHub:** ognuno dovrebbe avere un account GitHub; va bene solo per uso personale.
- **Google Drive** senza server: il permesso dura circa un'ora e per rinnovarlo si apre un
  popup.
- **Un servizio tutto nostro su Cloudflare:** il login andrebbe scritto da zero.

**Piano:**

1. **Base comune** nel browser:
   - fatto: con Glifo aperto in più schede le note non spariscono più e le schede si
     aggiornano a vicenda;
   - fatto: le **cartelle** (un livello, niente cartelle dentro cartelle), e gli id di note e
     cartelle sono unici anche tra dispositivi diversi;
   - fatto: ogni nota ricorda l'ultima versione sincronizzata, e le note eliminate restano
     segnate come «eliminate» finché l'account non lo sa, altrimenti ricompaiono dall'altro
     dispositivo.
2. **Il progetto Supabase**, fatto: il progetto `glifo` a Francoforte, sul piano gratuito.
   Contiene:
   - cartelle, note e impostazioni di ogni account, con le regole di accesso;
   - i limiti di spazio;
   - le funzioni per sincronizzare.

   I test in `supabase/tests` (47 controlli) provano, tra l'altro, che nessuno legge o
   cambia le note degli altri. Profili e membri delle cartelle arrivano con la
   condivisione (passo 5).
3. **Accesso e sincronizzazione**, fatto (in prova):
   - si entra con il link dell'email, aperto in questo browser o incollato nella finestra di
     Glifo (o con il codice, se l'email lo contiene), e le note di ogni account stanno in uno
     spazio a parte del browser. Con il servizio di posta gratuito di Supabase l'email non si
     può cambiare, quindi ha solo il link (vedi il passo 4);
   - con la rete Glifo manda e scarica le modifiche da solo: all'avvio, tornando su Glifo,
     quando torna la rete, poco dopo ogni modifica e ogni minuto. Senza rete funziona come
     prima;
   - se la stessa nota cambia su due dispositivi restano tutte e due le versioni, e una nota
     eliminata qui ma cambiata altrove torna;
   - al primo accesso chiede se aggiungere all'account gli appunti già nel browser;
   - porta con sé impostazioni e dizionario personale; la chiave API resta sul dispositivo;
   - uscendo, le note dell'account vengono tolte dal browser;
   - i test usano le vere migrazioni in un Postgres in memoria (PGlite), anche nella prova
     nel browser con un Supabase finto (`scripts/fake-supabase.mjs`).
4. **Aprire l'account a tutti** (il prossimo, gratis). **In attesa** dal 2 ottobre 2026: si
   riprende quando lo studente ha deciso su S&Z. Come si riprende:
   1. lo studente decide su S&Z (vedi sotto) e dà un'email di contatto per l'informativa
      (va bene anche una sua, provvisoria);
   2. Claude aggiorna l'informativa (titolare e contatto) e rivede i limiti di spazio: oggi
      20 MB di note per account, ma il database gratuito ha 500 MB in tutto;
   3. lo studente preme «Publish app» (Google Auth Platform → Audience): da lì entra con
      Google chiunque, non solo i «Test users».

   Dopo viene l'email per tutti: servizio di posta nostro e CAPTCHA insieme, meglio con il
   dominio, quindi dopo la decisione su S&Z. La condivisione (passo 5) non dipende da S&Z: si
   può iniziare anche prima.

   Le singole parti:
   - fatto (2 ottobre 2026): accesso con Google, attivo («Continua con Google» nella finestra
     di accesso; con la stessa email si ritrova lo stesso account). L'app Google è ancora
     «Testing»: entrano solo gli indirizzi aggiunti come «Test users». Per aprirla a tutti,
     «Publish app» (vedi [supabase/README.md](supabase/README.md), «Accesso con Google»);
   - fatto: informativa sulla privacy (`privacy.html`, collegata dalla finestra di accesso,
     dall'account e dalle impostazioni), «Scarica i miei dati» (tutto l'account in un file
     che «Ripristina backup» rilegge) ed «Elimina account» (funzione `delete_account` nel
     database: con l'utente spariscono note, cartelle, impostazioni e sessioni). Come
     titolare per ora c'è «DioDiAltro». Manca l'indirizzo email di contatto, da aggiungere
     prima di aprire a tutti;
   - da decidere: forse Glifo passa sotto **S&Z**, con il dominio `seznet.net` che lo
     studente ha già con un amico. Cambierebbe tre cose:
     - titolare nell'informativa: S&Z se è una società, altrimenti le due persone come
       contitolari, con un accordo scritto su chi risponde alle richieste; come contatto, per
       esempio, `privacy@seznet.net`;
     - email di accesso: si possono mandare da `glifo@seznet.net` con un servizio di posta
       che ha un piano gratuito (Resend o Brevo), dopo aver aggiunto alcuni record DNS al
       dominio. Arriverebbero a tutti e con il codice di 6 cifre;
     - indirizzo: `glifo.seznet.net` è gratis con GitHub Pages. Attenzione: le note salvate
       solo nel browser restano legate al vecchio indirizzo, quindi prima del cambio serve un
       modo per portarle (l'account o un backup), e vanno aggiornati Site URL e Redirect URLs
       di Supabase e le «Authorized JavaScript origins» del client Google;
   - CAPTCHA contro le iscrizioni automatiche (Cloudflare Turnstile, gratis) e limiti di
     spazio da rivedere (oggi 20 MB di note per account);
   - un servizio di posta nostro (SMTP): serve per scrivere a chi non è nel team e per
     cambiare l'email, per esempio con il codice di 6 cifre al posto del solo link (comodo
     per leggere l'email sul telefono e scrivere il codice sul computer). Gratis si può
     usare un account Gmail con una «password per le app»; più avanti, con un dominio, un
     servizio come Brevo o Resend.
5. **Condivisione:**
   - fatto (4 ottobre 2026): **il link a una nota, come in Gemini**. «Condividi» →
     «Chiunque abbia il link»: chi apre il link, anche senza account, vede una fotografia della
     nota in sola lettura (la pagina `nota.html`). «Aggiorna il link» rifà la fotografia,
     «Consenti copie» lascia salvarne una copia, «Con limitazioni» toglie il link; eliminando la
     nota o l'account il link smette di funzionare. Nel database: la tabella `shared_notes` e le
     funzioni `share_note`, `set_shared_copy`, `unshare_note`, `shared_links` e `shared_note`
     (migrazione «note condivise», 33 controlli in `supabase/tests/condivisione.test.sql`).
     Le note arrivano anche da altre persone: l'anteprima non mostra moduli, pulsanti e stili
     scritti nelle note, e niente esce dal riquadro della nota;
   - si decide più avanti (lo studente: «facciamo prima il link, poi ne parliamo»; fatto il
     link, il 4 ottobre 2026 ha chiesto di tenerlo per dopo e di sistemare prima la grafica):
     - profili (il nome che vedono gli altri) e membri di ogni cartella;
     - mandare una copia di una nota a un'altra persona, che la trova tra i «Ricevuti»;
     - cartelle condivise con persone scelte, con i permessi come nei servizi di Google (lo
       studente ha mostrato la finestra «Condividi» di NotebookLM): il proprietario aggiunge
       le persone e per ognuna decide cosa può fare (per esempio solo leggere o anche
       modificare); in più «Chiunque abbia il link» e «Consenti copie», come per le note;
     - gli inviti con un link da mandare, perché senza un servizio di posta nostro Supabase
       scrive solo al team; e per far entrare gli altri con Google serve «Publish app» (passo 4).
   - **scrivere insieme senza conflitti** (messo da parte il 4 ottobre 2026, se ne riparla):
     lo studente vuole che due persone che scrivono nello stesso punto non vadano in conflitto.
     Due modi di lavorare insieme:
     - come **Google Docs**: tutti scrivono sulla stessa nota nello stesso momento e le battute
       si uniscono lettera per lettera (CRDT): nessun conflitto, anche dopo aver scritto senza
       rete. È la strada che fa quello che chiede lo studente: per esempio Yjs, che funziona con
       CodeMirror (l'editor di Glifo), con il canale in tempo reale di Supabase (gratuito);
     - come **GitHub**: ognuno ha la sua copia e le modifiche si uniscono quando si mandano;
       se due cambiano le stesse righe è un conflitto che una persona deve risolvere (oggi
       Glifo tiene tutte e due le versioni). In più la cronologia (chi ha cambiato cosa) e le
       proposte di modifica da approvare.

**Da tenere a mente:**

- Il browser dà circa 5 MB di spazio (localStorage): con tanti appunti, e più avanti con le
  registrazioni, conviene passare a IndexedDB.
- Crittografia end-to-end (nemmeno il server legge gli appunti): con condivisione,
  trascrizione e AI lato server diventa complicata, perché il server non vede il testo.
- Il punto di partenza nel codice è `src/store/notes.ts`: ogni nota ha già `id`,
  `createdAt` e `updatedAt`, e ogni modifica all'elenco parte da quello salvato.
- Le note eliminate restano nel database come segno per gli altri dispositivi: dopo qualche
  mese si potranno togliere con un lavoro programmato (`pg_cron`).

## Più avanti

### La lavagna: idee in più

La lavagna base, senza AI, è fatta e pubblicata (5 ottobre 2026: lo studente ha detto «fai la
lavagna» e poi, vista sul ramo `prova`, «va bene, pubblicala»). È descritta nel README e in
`src/board/`: la vista «Lavagna» accanto al testo (sul telefono al suo posto, e a tutto schermo con
un pulsante), penna con la pressione, gomma che taglia i tratti, quattro colori, annulla e ripeti,
due dita per spostare e ingrandire, il palmo che non scrive; una lavagna per nota, salvata su quel
dispositivo (IndexedDB), che va nel backup e non nell'account. C'è anche il registro dei tocchi
(fatto il 5 ottobre 2026, chiesto dallo studente per la prova sull'iPad): acceso nelle impostazioni,
annota penna, dita, le decisioni della lavagna e quello che fa il browser, e si manda nella chat
con Claude. La discussione è in [ABBONAMENTI.md](ABBONAMENTI.md), «La lavagna». Se servirà:

- con l'AI e nei piani a pagamento, le formule scritte a mano convertite in LaTeX e aggiunte alla
  nota se si vuole («Aggiungi alla nota»): aspetta la discussione sulla chiave API;
- **una lavagna completa di tutto** (lo studente, 5 ottobre 2026: «deve essere una lavagna completa
  di tutto», come Microsoft Whiteboard). I primi cinque punti sono fatti e pubblicati (5 ottobre
  2026, «sì a tutto, comincia dagli strumenti della lavagna», poi «sì, parti con le linee e le
  figure»; viste sul ramo `prova`, il 6 ottobre «va bene, pubblicala»; la selezione lo stesso
  giorno, vista sul ramo `prova` e poi «va bene, pubblicala»):
  - fatto: la grandezza dello strumento scelto, cioè lo spessore della penna,
    dell'evidenziatore e della gomma (tre misure, dal menu che si apre premendo di nuovo lo
    strumento o il pulsante con il pallino);
  - fatto: gli evidenziatori, in quattro colori, trasparenti e sempre sotto la scrittura;
  - fatto: la gomma con due modi, «Dove passa», che cancella dove passa e diventa più
    grande quando la si muove veloce, e «Linea intera», che toccando anche un solo punto di una
    linea la cancella tutta;
  - fatto: **linee e figure precise** (lo studente, 5 ottobre 2026: «se fai una linea e
    tieni premuto te l'allinea da sola; anche le altre figure», e un pulsante perché «le figure che
    si disegnano si aggiustano da sole», come in Whiteboard). Tenendo ferma la penna alla fine del
    tratto: linea, freccia, spezzata, triangolo, rettangolo, quadrato, rombo, pentagono, esagono,
    ellisse, cerchio, raddrizzati; con la penna ancora giù la si regola. Nel menu della penna
    l'interruttore «Forme automatiche». Annulla riporta il tratto a mano;
  - fatto: **selezionare come in Note di Apple** (lo studente, 6 ottobre 2026: «nella lavagna
    dobbiamo aggiungere il poter selezionare stile note di apple»). Il
    lazo, nella barra, prende quello che ci si disegna intorno (o la linea toccata); poi lo si
    trascina, lo si ingrandisce con il pallino nell'angolo e dal menu lo si taglia, copia,
    duplica, elimina o gli si cambia colore; «Incolla» toccando un punto vuoto o dalla barra,
    con «Tutto»; dalla tastiera Ctrl+A, C, X, V, D, Canc, le frecce ed Esc;
  - scaricare la lavagna come immagine;
- la lavagna sugli altri dispositivi, con l'account;
- sull'iPad la prima prova (5 ottobre 2026) ha trovato quattro problemi, corretti subito: le parole
  che si selezionavano, la lavagna che si chiudeva e l'iPad che la prendeva per una tastiera (era lo
  schermo intero di Safari, che lì non si usa più), e la mano appoggiata (con la penna un dito solo
  non fa niente). Le correzioni sono online ma vanno ancora provate sull'iPad, che lo studente per
  ora non ha: con il registro dei tocchi acceso, così se qualcosa non va lo si manda a Claude. Se
  resta qualcosa, o con la tavoletta grafica senza schermo, si sistema.

### Schemi: idee in più

Gli schemi sono fatti, con lo studente (ottobre 2026): editor stile draw.io con maxGraph (scelto
al posto del vero draw.io incorporato perché funziona offline e non manda niente a nessuno); forme, frecce curve, modelli pronti, allinea e distribuisci, immagini PNG e SVG;
le figure delle basi di dati (E-R come nell'Atzeni, tabelle con PK, FK e tipi) e il codice SQL
delle tabelle per più database; dal 6 ottobre 2026 si spostano nella nota con le frecce ↑ ↓, come i
grafici. Tutto è descritto nel README. Se serviranno:

- **i diagrammi di flusso trasformati in codice** (lo studente, 5 ottobre 2026): come oggi le
  tabelle danno l'SQL, un diagramma di flusso fatto con le forme di sempre (inizio e fine,
  istruzioni, decisioni con sì e no, ingresso e uscita) si scarica come codice nel linguaggio scelto:
  C, C++, Java, Python, JavaScript (il linguaggio del web) e lo pseudocodice che si usa a scuola
  (proposti da Claude, approvati dallo studente il 5 ottobre 2026). Le decisioni che
  tornano indietro diventano cicli; un diagramma che non si può scrivere con if e cicli lo dice.
  Come l'SQL, solo nei piani a pagamento, perché scrivere il codice a mano fa bene (vedi
  [ABBONAMENTI.md](ABBONAMENTI.md), «Deciso»);
- **tabelle come in Excel** negli schemi (lo studente, 5 ottobre 2026), per gli esercizi che faceva
  alle superiori in G.E.S.P. (Gestione d'Impresa e Organizzazione Aziendale):
  - la pianificazione e il controllo della produzione: come un'azienda informatica organizza i suoi
    servizi (sviluppo del software, assistenza, cicli produttivi);
  - la gestione dei costi: i costi fissi e variabili dei servizi e delle risorse, per trovare il
    prezzo di vendita o il punto di pareggio (break-even point);
  - l'ottimizzazione dei flussi: lo studio dei processi per automatizzarli o gestirli con un
    gestionale (ERP).

  Approvato dallo studente il 5 ottobre 2026 («sì a tutto»), gratis come i calcoli e i grafici. Fatto
  tutto entro il 7 ottobre 2026, un pezzo alla volta:
  - fatto (6 ottobre 2026, lo studente: «sì, parti dalla tabella con le formule»; vista sul ramo
    `prova` e provata anche sul telefono, il 7 ottobre «carica tutto sul ramo principale»): **la
    tabella con le formule**, non dentro gli schemi ma un blocco
    ```tabella a parte, che si apre a tutto schermo come gli schemi in un editor fatto come Excel:
    celle e formule all'italiana (=B2*C2, SOMMA, SE, CERCA.VERT, RATA, VAN…, con i nomi dell'Excel
    italiano), numeri in euro e in percentuale, i tasti di Excel, copia e incolla anche con Excel, la
    maniglia per riempire, i modelli pronti (fattura con l'IVA, punto di pareggio, conto economico,
    piano di ammortamento); nella nota la tabella con i risultati, nei file .md una tabella di
    Markdown con i risultati. I conti li fa Glifo (`src/spreadsheet`). Descritta nel README;
  - fatto (7 ottobre 2026, lo studente: «sì, fai il grafico del punto di pareggio»; visto sul ramo
    `prova`, «va bene, carica tutto sul ramo principale»): **il grafico del punto di pareggio** con il
    blocco grafico, dai numeri della tabella:
    la riga `dati: A8:D13` disegna le colonne della tabella sopra (come i grafici di Excel) e
    `pareggio: Ricavi, Costi totali` colora l'utile e la perdita e segna il punto di pareggio; il
    pulsante «Grafico» dell'editor delle tabelle le scrive da solo, e il modello «Punto di pareggio»
    ha anche la colonna dei costi fissi;
  - fatto (7 ottobre 2026, lo studente: «fai tutto quello che riguarda GESP; non fare le cose a
    pezzi»; visto sul ramo `prova`, «va bene, carica tutto sul ramo principale»), tutto insieme:
    - **il diagramma di Gantt e il reticolo** dalle attività di una tabella (durata, precedenti, chi
      le fa, quanto è fatto): le righe `gantt: A1:E9` e `reticolo: A1:E9` del blocco grafico, con il
      **percorso critico** calcolato da Glifo (inizio e fine al più presto e al più tardi, margini
      totali e liberi, legami come in Project), le date con `inizio:` (anche i giorni lavorativi) e il
      controllo dei tempi calcolati a mano; «Grafico» sulle attività chiede quale fare;
    - **i flussi con le corsie** (chi fa cosa) negli schemi: la forma «Corsie», in colonne o in righe,
      che si porta dietro le forme del processo, e il modello «Processo con le corsie» (l'ordine di un
      cliente dalle vendite al magazzino all'amministrazione, i reparti di un ERP);
    - **i file di Excel (.xlsx) e .csv** da aprire e scaricare, con le formule tradotte (menu «File»
      dell'editor delle tabelle, e «Apri .md» nella barra laterale);
    - i modelli **prezzo di vendita** (le configurazioni di costo e il ricarico), **preventivo di un
      progetto** e **diagramma di Gantt**;
- il contrario dell'SQL: da un file SQL alle tabelle disegnate; e il passaggio dallo schema E-R
  alle tabelle (la progettazione logica);
- stampare con i colori del tema chiaro anche se si usa quello scuro;
- raggruppare le forme;
- altri modelli (per esempio una mappa mentale);
- le punte «a zampa di gallina» per le cardinalità, se servono al corso di basi di dati.

### Abbonamento e funzioni a pagamento (da capire)

Se ne parla dal 4 ottobre 2026 in [ABBONAMENTI.md](ABBONAMENTI.md): la proposta dello studente
(Classico gratis, Relativistico, Quantistico), cosa far pagare piano per piano e perché, i prezzi, i costi
dell'AI e della trascrizione, cosa serve prima di incassare (partita IVA, *merchant of record*,
hosting, regole). Quello che è deciso è scritto lì, in «Deciso». Quello che costerebbe, e che si
attiva solo quando lo dice lo studente, è in [COSTI.md](COSTI.md).

### Trascrizione delle lezioni in appunti

- Registrare l'audio (o lo schermo, sul computer) e trasformarlo in appunti ordinati, con
  titoli, elenchi e formule in LaTeX.
- Due strade: trascrizione nel browser con un modello Whisper (gratis e privata, ma pesante
  per i telefoni) oppure un servizio in cloud, più veloce e preciso, a pagamento.

### Spiegami: le spiegazioni dei conti (in prova)

**Online dall'8 ottobre 2026**: provato sul sito di prova, lo studente ha detto «ora funziona tutto,
caricalo sul ramo principale», e il ramo `prova` (Spiegami, il pannello ✨ «Spiega con l'AI» con la
chat, la divisione per zero, gli editor dopo un aggiornamento) è andato sul ramo principale. Il sito di
prova resta per le prove dopo. Da sapere ancora: quale modello tenere all'inizio (lo studente ha usato
il 4B) e in quanto tempo risponde.

**In prova sul ramo `prova` (7 ottobre 2026)**, lo studente: «sul ramo di prova possiamo provare ad
integrare il modello piccolo di Qwen3 con WebLLM per le spiegazioni che possa usare il motore
matematico di Glifo?». Fatto: con il cursore su un conto, «Spiegami» sotto l'anteprima della formula;
i passaggi li scrive Qwen3 nel browser (WebLLM, 0.6B, 1.7B o 4B nelle impostazioni, con il tono), che
chiede i conti al motore; Glifo li controlla (✓, ✗ con il valore giusto, «non controllato»), fa
correggere quelli sbagliati e dice se l'ultimo arriva al suo risultato; «Inserisci nella nota» e
«Rifai». Descritto nel README («Spiegami») e in ABBONAMENTI.md.

**Prima prova vera (7 ottobre 2026, sera, sul sito di prova, con il modello predefinito).** Su
`$\int_0^1 x^2 \, dx =$` le formule erano giuste (le controlla Glifo), ma il modello scriveva «Una frase
breve:» in ogni passaggio (copiava lo schema del messaggio di sistema), due frasi erano sbagliate («si
calcola sottraendo l'area sotto la curva»; «regola del confronto» invece della regola della potenza) e
il primo e l'ultimo passaggio ripetevano solo la domanda e il risultato. Corretto la sera stessa: una riga
d'esempio vera (una derivata) al posto dello schema, i nomi giusti delle regole nel messaggio di sistema,
e Glifo toglie lo schema copiato e il «Risultato finale» senza conto (`tests/explain.test.ts`). Le frasi
Glifo non le controlla: da riprovare sul sito di prova.

**Chiesto dallo studente dopo la prova (7 ottobre 2026, sera):**
- un pulsante con la sola icona dell'AI (✨) nella barra in alto, dopo `$$`: apre un pannello suo, al
  posto di quello dei simboli, con l'elenco di quello che c'è nella nota; se ne sceglie uno e Glifo lo
  spiega, senza mettere il cursore nella formula né aprire «Simboli». Deciso: icona sola, lì;
- spiegare «qualsiasi cosa»: le formule anche senza un conto, i teoremi, i grafici (cosa mostrano, con i
  numeri di Glifo: deciso sì), gli schemi e le tabelle. Dove Glifo non può controllare (le parole, un
  teorema, uno schema) la spiegazione va segnata come non controllata;
- una chat per gli approfondimenti, in fondo allo stesso pannello;
- il dubbio che il modello piccolo non basti: ha chiesto se si può addestrare (anche su tutta
  Wikipedia). Risposta data: Qwen3 l'ha già letta; aiutano di più le informazioni giuste date al momento
  (regole, conti del motore, il contenuto della nota), il modello 4B e il controllo di Glifo; addestrarlo
  davvero (migliaia di spiegazioni fatte bene in italiano, ore di scheda grafica, il modello rifatto per
  WebLLM) è un progetto grosso, da valutare solo se le prove dicono che serve;
- dove compare la spiegazione non era chiaro: gli è stata mandata una foto finta del pannello (pulsante,
  elenco, spiegazione, chat). Lo studente: «va bene il pannello, procedi in quell'ordine»: 1) i conti e
  i grafici, 2) i teoremi e le formule senza conto, 3) gli schemi e le tabelle, 4) la chat.

**Fatto il passo 1 (7 ottobre 2026, sera, sul ramo `prova`)**: il pulsante ✨ dopo `$$`, il pannello
«Spiega con l'AI» al posto dei simboli con l'elenco dei conti e dei grafici della nota e, scelto uno, la
spiegazione (per i grafici con lo studio di funzione di Glifo e le formule controllate). Descritto nel
README e in ARCHITETTURA.md (`src/ui/aiPanel.ts`).

**Fatto il passo 2 (7 ottobre 2026, notte)**: nell'elenco anche le formule senza un conto e i teoremi, le
definizioni e le proprietà scritti nel testo; Glifo controlla gli esempi con i numeri della spiegazione.

**Fatto il passo 3 (7 ottobre 2026, notte)**: nell'elenco anche gli schemi e le tabelle. Per uno schema
Glifo dà al modello una descrizione a parole (le forme seguendo le frecce, le corsie, i collegamenti con il
loro testo; negli schemi E-R entità, relazioni, attributi e cardinalità; le tabelle con i campi e le
chiavi); per una tabella i valori calcolati, con le lettere delle colonne, e le formule. Resta la chat
(passo 4). Provando, è venuto fuori un difetto del controllo, anche nelle note sul sito: una divisione per
zero passava per giusta (`$1/0 = 5$` con il ✓, e lo stesso nei passaggi delle spiegazioni). Corretto sul
ramo `prova`: una parte senza un valore non si giudica (`tests/check.test.ts`); sul sito va con il resto
di `prova`, o prima se lo studente lo chiede.

**Fatto il passo 4 (8 ottobre 2026, notte)**: sotto la spiegazione la chat per le domande. Lo stesso modello
risponde rileggendo la cosa spiegata, la spiegazione e le ultime tre domande; Glifo controlla le formule
delle risposte e fa correggere quelle sbagliate, come nella spiegazione. La chat è della spiegazione: con
un'altra ricomincia, e non si salva. Fatti così i quattro passi chiesti dallo studente: ora va provato sul
sito di prova con il modello vero.

**Seconda prova vera (8 ottobre 2026, sul sito di prova)**, sullo stesso `$\int_0^1 x^2 \, dx =$`: i
passaggi sono giusti, con i nomi giusti (regola della potenza, teorema fondamentale del calcolo integrale), e
«Una frase breve» non c'è più. Restavano un ultimo passaggio con il solo risultato («Il risultato finale è:
$\frac{1}{3}$», senza uguale), che ora Glifo toglie come il «Risultato finale» senza formula (`checkSteps`,
non nelle equazioni, dove le soluzioni da sole sono la risposta; `tests/explain.test.ts`), e «limiti di
integrazione» al posto di «estremi»: il nome giusto ora è nel messaggio di sistema. Da sapere ancora: con
quale modello (0.6B, 1.7B o 4B) e in quanto tempo; il pannello ✨ con schemi, tabelle e chat è da provare.

**Gli editor che non si aprivano (8 ottobre 2026, sul sito di prova)**: lo studente, con il 4B, non riusciva
ad aprire l'editor né degli schemi né delle tabelle, con il pannello ✨ aperto mentre il modello si caricava.
Il pannello non c'entrava (provato: gli editor si aprono anche con il modello che carica). La pagina era
quella di prima di una pubblicazione: gli editor si caricano solo quando servono, i loro file hanno
nel nome un'impronta del contenuto, e ogni pubblicazione toglie quelli vecchi. Sul sito di prova (senza
service worker) al loro posto arriva la pagina iniziale, e «Modifica» diceva solo «L'editor non si è
aperto: riprova», ma riprovare non serviva. Sul sito vero succede lo stesso quando il service worker nuovo
svuota la cache. Ora (`src/ui/siteUpdate.ts`): «Modifica» dice che Glifo è stato aggiornato e offre
«Ricarica», con la nota salvata prima. Senza rete dice che manca la connessione, e lì non propone di
ricaricare. Quando si torna sulla pagina, se sul sito c'è una versione nuova Glifo lo dice. Se la nota ha uno
schema o una tabella, il loro editor si carica appena il browser è libero (`warmEditors` in main.ts), così
si apre subito anche dopo una pubblicazione. Se un editor tarda (per esempio con la rete occupata dal
modello), un avviso dice «Apro l'editor…» invece di non mostrare niente.

Da fare:
- provarlo davvero su un computer con WebGPU (Chrome o Edge), su esercizi veri, e scegliere il modello
  di partenza: finora è provato solo con un modello finto (nelle sessioni di Claude Hugging Face era
  bloccato, anche riprovando il 7 ottobre 2026, e dentro claude.ai il modello non si scarica). Quando
  l'ambiente delle sessioni permette `huggingface.co` e `*.hf.co`, la prova con Qwen3 vero si fa anche
  lì con `node scripts/spiegami-qwen.mjs` (WebGPU sulla CPU: lento, ma il resto è già pronto);
- dove WebGPU non c'è (telefono, iPad): lo stesso giro con il modello sul server (Cloudflare Workers
  AI) o con la propria chiave;
- il «Perché?» su ogni passaggio, i passaggi che il motore sa scrivere da solo (derivate, Ruffini,
  Gauss) e il primo argomento da curare (la proposta è gli integrali);
- poi, se va bene, il tutor («Aiuto con gli esercizi»), con lo stesso controllo dei passaggi.

**Come si riprende (7 ottobre 2026, sera).** Il codice è tutto sul ramo `prova`, già su GitHub. Lo
studente ha scelto di provarlo su un **sito di prova a parte su Cloudflare Pages** (gratis, l'account
c'è già), da fare:
- da Claude non si crea: nella sessione nuova (7 ottobre sera) il connettore Cloudflare risultava da
  autorizzare (le sessioni nel cloud non possono fare l'accesso, quindi i suoi strumenti non si sono
  potuti vedere; da quanto se ne sa, account, KV, Workers da leggere, R2, D1, Hyperdrive e
  documentazione, non creano siti Pages), e la rete delle sessioni blocca `api.cloudflare.com`,
  `dash.cloudflare.com` e `*.pages.dev`: niente `wrangler` e niente controllo del sito da lì;
- il ramo `prova` è pronto (7 ottobre sera): su Cloudflare, dove la build ha `CF_PAGES`, Glifo è da
  solo il sito di prova (`src/site.ts`: senza service worker e con l'account spento, anche senza
  `GLIFO_NO_PWA`; la finestra di Accedi dice «Questo è il sito di prova di Glifo…» invece di «dentro
  claude.ai»), con Node 24 come su GitHub (`.node-version`). Costruito così da una copia pulita del
  ramo: 223 file, il più grande 5,7 MB (WebLLM), sotto i limiti di Pages (20.000 file, 25 MiB);
- **fatto dallo studente il 7 ottobre sera**: il sito è su https://glifo-prova.pages.dev e la finestra di
  Accedi dice «Questo è il sito di prova di Glifo…». Come l'ha collegato (per rifarlo): dal sito di
  Cloudflare, «Workers & Pages» → «Create» → «Pages» (se si vede solo
  Workers, in fondo alla pagina «Looking to deploy Pages? Get started») → «Import an existing Git
  repository» → GitHub, repository `DioDiAltro/Glifo` → Project name `glifo-prova`, Production branch
  `prova`, Framework preset None, Build command `npm run build`, Build output directory `dist`, nessuna
  variabile → «Save and Deploy». Poi, nel progetto, «Settings» → «Build» → «Branch control»: Preview
  branch «None», se no Cloudflare costruisce anche gli altri rami (il principale e `gh-pages`, dove la
  build fallisce). Si aggiorna da solo a ogni push su `prova`; l'indirizzo è `glifo-prova.pages.dev`;
- attenzione a non finire su Workers («Import a repository», con Deploy command `npx wrangler deploy` e
  l'API token): il 7 ottobre sera lo studente ci era arrivato e gli è stato detto di tornare su Pages.
  Lì Cloudflare parte dal ramo principale del repository (il ramo si cambia dopo, in «Settings» →
  «Build» → «Branch control»), senza `wrangler.jsonc` apre una pull request con la sua configurazione
  e la build ha `WORKERS_CI` invece di `CF_PAGES` (quindi non sarebbe il sito di prova). Se un giorno
  si passa a Workers (Cloudflare lo consiglia per i progetti nuovi): `wrangler.jsonc` con lo stesso
  nome del Worker e `assets` su `./dist`, anche sul ramo principale, e `WORKERS_CI` in vite.config.ts;
- poi lo studente prova «Spiegami» sul suo computer (Chrome o Edge, con WebGPU) e dice com'è andata.

### Aiuto con gli esercizi

- Una modalità dell'assistente che aiuta senza dare subito la soluzione: chiede cosa hai
  provato, dà un indizio alla volta e controlla i passaggi; la soluzione intera solo se la
  chiedi.
- Funziona già con la propria chiave API; con l'abbonamento anche senza.

### Calcoli e grafici: idee in più

Calcoli e grafici sono fatti (ottobre 2026, primo giro «vediamo cosa esce»): risultati dopo `=` con
le definizioni della nota, blocchi ```grafico con funzioni, curve, punti, asintoti, trascinare e
ingrandire, grafici nei file .md come immagini, gli **slider** per i numeri (in `y = a x^2`,
trascinare `a`, o scriverne il valore accanto, e vedere il grafico cambiare, come in GeoGebra e nelle
Note matematiche) e l'**area degli integrali** (`\int_0^2 x^2 \, dx` colora l'area sotto la curva, con
il valore nella legenda). Il 6 ottobre 2026 grafici e schemi si **spostano nella nota** con le frecce
↑ ↓ dell'anteprima, come le celle di Google Colab (lo studente: «fai che gli schemi e i grafici si
possano spostare nel documento; stile google colab», da fare subito sul ramo principale). Tutto è
descritto nel README. Quello che serve per i corsi di matematica è nella voce dopo. Se serviranno anche:

- l'area tra due curve (`\int_0^1 (f(x) - g(x)) \, dx` oggi colora quella sotto la differenza);
- nelle aree degli integrali, le parti sotto l'asse x di un altro aspetto (oggi hanno lo stesso
  colore: nell'integrale contano con il meno);
- segnare da soli zeri, massimi, minimi e intersezioni (con un clic sulla curva);
- le definizioni con le lettere: `V = \int_{-R}^{R} \pi (R^2 - x^2) \, dx` e poi `\frac{V}{R^3} =` (oggi
  una definizione tiene solo i numeri, e il risultato con le lettere si vede solo dopo `=`);
- gli integrali su un dominio con le lettere (`\iiint_{x^2 + y^2 + z^2 \le R^2} dV`: oggi solo con R
  definito, con i numeri) e quelli che dipendono da com'è la lettera (`\int_1^{\infty} \frac{dx}{x^p}`
  converge solo per p > 1: oggi nessun risultato);
- i calcoli anche fuori dalle formule (`12 * 3 =` nel testo) e con le unità di misura (`3 m/s`);
- un'impostazione per spegnere i risultati dopo `=`, se a qualcuno danno fastidio.

Fatti il 4 e il 5 ottobre 2026 (i tre passi decisi con lo studente il 3 ottobre, per **controllare** e
**mostrare** quello che si scrive): i **calcoli con le lettere** (il volume della sfera con l'integrale dà
4πR³/3, scritto come sul quaderno o in coordinate sferiche, cilindriche e cartesiane), il **controllo
delle uguaglianze scritte** (con il risultato scritto da chi prende appunti, `\int_0^1 x^2 \, dx =
\frac{1}{3}`, Glifo dice ✓ o ✗ con il valore giusto: anche con le lettere, con i decimali arrotondati, in
ogni passaggio di una catena e con la primitiva tra gli estremi) e i **grafici da mostrare** («Scarica»
dà il grafico come immagine PNG o SVG, o lo copia per Word e le slide, con il titolo e i nomi degli assi
scritti nel blocco: `titolo:`, `asse x:`). Restano, per il controllo e le immagini:

- controllare anche le soluzioni scritte dopo ⇒ (`x^2 - 5x + 6 = 0 \Rightarrow x = 2 \lor x = 3`) e le
  identità con le lettere (`(a + b)^2 = a^2 + 2ab + b^2`), che oggi non si distinguono dalle equazioni;
- con un clic sul ✗, scrivere al posto del risultato sbagliato quello giusto (se si vuole);
- le figure «da pubblicazione» (numerate, con la didascalia, pronte per la tesi): in
  [ABBONAMENTI.md](ABBONAMENTI.md) sono un'idea per il piano Quantistico;
- scegliere la misura dell'immagine (oggi 640 × 400) e scaricare anche in PDF.

### Matematica per i corsi: idee in più

Fatto con lo studente (2 ottobre 2026), in sette tappe pubblicate una per una: grafici e calcoli per
un corso di matematica intero (Analisi 1 e 2, Geometria e algebra lineare). I grafici 3D (superfici,
piani, superfici con due parametri, curve nello spazio, da girare trascinandoli); gli integrali doppi e
tripli con il dominio colorato, il volume sotto la superficie e i solidi; le zone delle disuguaglianze;
i numeri complessi e il piano di Gauss; vettori e matrici (inversa, rango, nucleo, autovalori e
autovettori); la geometria (lunghezze, aree, angoli, rette, circonferenze, piani, intersezioni) con le
figure nei grafici; le derivate scritte come formula, gradiente, divergenza, rotore, hessiana e
jacobiana, gli integrali di linea e di superficie e i campi di vettori; i limiti (le forme 0/0 esatte),
le serie, i polinomi di Taylor, le equazioni, disequazioni e sistemi risolti con ⇒, le equazioni
differenziali di ogni ordine, le curve di livello e i campi di direzioni. Tutto è descritto nel README.
Se serviranno:

- dove due superfici curve si tagliano, il bordo è a dentini (i piani invece tagliano giusto);
- un dominio in coordinate cilindriche o sferiche con condizioni che non tengono una variabile da sola
  tra due estremi (come `0 \le \rho \le 2\cos\varphi`) si disegna a gradini; il volume sotto una
  superficie data in r e θ non si disegna (dentro la funzione c'è lo jacobiano r);
- nel piano di Gauss le soluzioni si cercano con parte reale e immaginaria tra −32 e 32;
- risolvere anche `A x = b` scritto con le matrici (oggi `A^{-1} b`, o il sistema per esteso con ⇒);
- le coniche (ellisse, parabola, iperbole) come figure con i loro elementi (fuochi, assi);
- negli integrali di superficie, le superfici date come grafico (z = g(x, y) su un dominio): oggi vanno
  scritte con i parametri, S(u, v) = (u, v, g(u, v));
- i limiti con le lettere (`\lim_{x \to 0} \frac{\sin(a x)}{x}` con a non definita; oggi servono i
  numeri) e quelli in più variabili;
- le equazioni differenziali risolte con la formula (oggi con i numeri), i sistemi (x' = y, y' = −x) con
  il ritratto di fase, e i problemi ai limiti (y(0) = 0, y(1) = 1);
- le soluzioni con i numeri delle equazioni si cercano tra −100 e 100, quelle dei sistemi non lineari
  partendo da una griglia di punti;
- i polinomi di Taylor in più variabili.

### Tutta la matematica dei corsi: idee in più

**Cosa:** dopo le prime sette tappe (vedi «Matematica per i corsi: idee in più», sopra), tutto il
resto che serve nei corsi universitari con la matematica: Analisi 1 e 2, Geometria e algebra lineare,
Probabilità e statistica, Matematica discreta, Calcolo numerico. Chiesto dallo studente il 3 ottobre
2026; ogni tappa è stata pubblicata appena pronta.

**Stato:** tutte le tappe, dalla 8 alla 18, sono fatte e online (3 ottobre 2026). Quello che si può
aggiungere è scritto in «Restano» in fondo a ogni tappa: viene dopo «Controllare e mostrare quello
che si scrive».

**Piano:**

8. **Primitive e integrali esatti**, fatto: `\int x e^x \, dx =` dà (x − 1)eˣ + c (integrali immediati,
   sostituzione anche con l'inversa, per parti, fratti semplici, potenze di seno e coseno, radici; ogni
   primitiva controllata derivandola); gli integrali definiti con il valore esatto (`\int_0^1 x^2 \, dx =`
   dà 1/3, `\int_0^1 \frac{dx}{1 + x^2}` dà π/4), gli impropri (+∞ se divergono), la funzione integrale;
   nei grafici la primitiva. Restano senza risultato gli integrali con un punto dove la funzione esplode
   in mezzo agli estremi (`\int_{-1}^{1} \frac{dx}{x^2}`, che diverge) e le primitive con fattori
   irrazionali (`\frac{1}{x^4 + 1}`).
9. **Studio di funzione**, fatto: `\operatorname{studio}(f) =` dà dominio, simmetria, periodo,
   intersezioni con gli assi, segno, limiti agli estremi, asintoti (verticali, orizzontali, obliqui),
   derivata e crescenza, massimi e minimi (anche punti angolosi e cuspidi), derivata seconda, concavità
   e flessi (anche a tangente orizzontale o verticale), con i punti esatti quando si può; le funzioni
   periodiche in un periodo; le parti da sole (`\operatorname{dominio}`, `asintoti`, `estremi`,
   `flessi`, `zeri`); nel grafico gli asintoti tratteggiati e i punti M, m, F. I punti si trovano con i
   numeri e si riconoscono esatti quando si può (√3, e^{3/2}, π/4); se no restano decimali.
10. **Probabilità e statistica**, fatto: le variabili aleatorie `X \sim B(10, 0{,}3)` (Bernoulli,
    binomiale, Poisson, geometrica, ipergeometrica, normale, esponenziale, uniforme, t, χ², F, Gamma) con
    `P(X \le 3)` (anche condizionata e con |X − 5| < 2), esatta quando si può (frazioni, e^{−λ}), `E[X]`,
    `E[X^2]`, `\operatorname{Var}(X)`, i quantili, Φ e Φ⁻¹; il calcolo combinatorio (C_{n,k}, D_{n,k}, con
    ripetizione); i dati (media, mediana, mode, varianza e sqm anche campionari, quartili e quantili come
    QUARTILE.INC, frequenze, il riassunto, covarianza, correlazione, retta di regressione); nei grafici le
    barre delle discrete, le densità con l'area della probabilità, istogrammi, diagrammi a barre e di
    dispersione con la retta. Restano: le variabili insieme (X + Y, la normale bivariata) e il box plot;
    gli intervalli di confidenza e i test sono la voce 18.
11. **Algebra lineare in più**, fatto: `A x = b \Rightarrow` (Rouché–Capelli, con le soluzioni infinite
    scritte con i parametri), i sistemi con un parametro discussi al variare del parametro (anche con la
    matrice: rango, determinante), diagonalizzare (P e D, P ortogonale per le simmetriche), Gram–Schmidt,
    la dipendenza lineare, somma, intersezione, complemento ortogonale, equazioni cartesiane e proiezione
    sui sottospazi, le forme quadratiche (matrice e segnatura), le applicazioni lineari (matrice, nucleo,
    immagine). Restano: l'inversa con un parametro, i cambi di base e la matrice rispetto a basi date.
12. **Equazioni differenziali con la formula**, fatto: con ⇒ l'integrale generale (lineari a
    coefficienti costanti con il polinomio caratteristico, la somiglianza anche in risonanza e la
    variazione delle costanti; anche con i parametri, y'' + ω²y = 0; lineari del primo ordine con il
    fattore integrante; a variabili separabili, con le soluzioni costanti e la forma implicita se y non si
    ricava; Bernoulli; Eulero; senza la y), il problema di Cauchy e i problemi ai limiti (una, nessuna o
    infinite soluzioni), i sistemi lineari di due equazioni; nei grafici il ritratto di fase dei sistemi
    (direzioni, traiettorie con il verso, punti di equilibrio). Le derivate anche come dy/dx, ẋ, y'(x).
    Restano: le omogenee y' = f(y/x) e le esatte, i sistemi di tre equazioni, la soluzione esatta al posto
    di Runge–Kutta quando y si definisce con le condizioni (senza ⇒).
13. **Analisi 2 in più**, fatto: i limiti in più variabili (lungo rette e parabole, poi tutto attorno
    al punto), i punti critici e la loro natura con l'hessiana (`\operatorname{critici}(f)`,
    `\nabla f = 0 \Rightarrow`, anche in tre variabili), massimi e minimi vincolati con Lagrange
    (`\operatorname{lagrange}`, `\max_{g = c} f`) e assoluti su un insieme chiuso e limitato
    (`\operatorname{estremi}(f, D)`, `\max_{D} f`), Taylor in più variabili; nei grafici le curve di
    livello con i punti critici, il vincolo e i punti di massimo e di minimo. Restano: i vincoli doppi
    in tre variabili, gli estremi assoluti in tre variabili, il piano tangente scritto come tale.
14. **Coniche e quadriche**, fatto: `\operatorname{conica}(…)` dà il tipo (anche degeneri e senza punti
    reali), la forma canonica e gli elementi (centro, semiassi, fuochi, eccentricità, asintoti, vertice,
    direttrice, asse), con il termine in xy la forma canonica negli assi ruotati; `\operatorname{quadrica}(…)`
    il tipo e la forma canonica; nei grafici la conica con i suoi elementi e la quadrica in 3D. Restano:
    gli elementi delle coniche ruotate nelle coordinate di partenza, i fasci di coniche, il centro e gli
    assi delle quadriche con i termini misti.
15. **Aritmetica, polinomi, logica e insiemi**, fatto: fattori primi, divisori, numeri primi (anche
    grandi), resto (anche delle potenze grandi), divisione con il resto, Euclide e Bézout, inverso modulo n,
    funzione di Eulero, equazioni diofantee, congruenze con ⇒ (anche i sistemi con il teorema cinese del
    resto e quelle di grado più alto), basi ((1011)_2, binario, esadecimale); i polinomi (scomporre, anche
    con più lettere con il raccoglimento e i prodotti notevoli, sviluppare, dividere, Ruffini con la
    tabella, mcd e mcm); le tavole di verità con le sottoformule, tautologie e forme normali; gli insiemi
    con gli elementi (∪, ∩, differenza anche simmetrica, prodotto cartesiano, parti, complementare,
    cardinalità, la probabilità classica con Ω). Restano: il raccoglimento parziale (ax + ay + bx + by),
    i diagrammi di Venn, le relazioni (riflessiva, simmetrica, transitiva) e le funzioni tra insiemi finiti.
16. **Serie di potenze, Fourier e Laplace**, fatto: il raggio e l'insieme di convergenza delle serie di
    potenze (con gli estremi); la serie di Fourier con i coefficienti esatti (anche a tratti, con |x|, su
    un intervallo qualsiasi, con i coefficienti a parte dove la formula non vale) e, nel grafico, la somma
    parziale con lo slider; la trasformata di Laplace con la tabella e l'antitrasformata delle funzioni
    razionali con i fratti semplici. Corrette anche le serie a segni alterni con i termini che vanno piano
    a zero (Σ(−1)ⁿ/√n). Restano: la somma delle serie di potenze (−ln(1 − x)), la trasformata di Fourier,
    la Heaviside e la delta nella trasformata di Laplace, le equazioni differenziali risolte con Laplace.
17. **Calcolo numerico**, fatto: bisezione, Newton, secanti e punto fisso con la tabella dei passi, il
    polinomio interpolante e quello dei minimi quadrati, trapezi, Simpson e rettangoli con l'errore, LU
    (con il pivot) e Cholesky, le norme e il condizionamento, Jacobi e Gauss–Seidel con il raggio
    spettrale, Eulero, Heun e Runge–Kutta 4; nel pannello i disegni. Restano: le spline, QR e i minimi
    quadrati con le matrici, il metodo delle potenze, i metodi impliciti e i sistemi di equazioni
    differenziali.
18. **Statistica inferenziale**, fatto: gli intervalli di confidenza (della media con σ nota e no, di una
    proporzione, della varianza) e i test d'ipotesi (z e t sulla media, sulla proporzione, χ² sulla
    varianza, due medie con Welch, il χ² di adattamento e di indipendenza), con il p-value e la decisione
    e, nel grafico, la regione di rifiuto colorata sotto la densità. Restano: due medie con le varianze
    uguali (t combinata) e appaiate, due proporzioni, la potenza del test, l'ANOVA e la regressione con
    l'inferenza sui coefficienti.

### Non solo appunti

- Paper scientifici: bibliografia (BibTeX), riferimenti numerati a equazioni e figure,
  esportazione in PDF e LaTeX.
- File `SKILL.md`: modello con l'intestazione (`name`, `description`) e controllo della
  descrizione.
- Interfaccia anche in inglese.

## Altre idee

- Nell'editor, le righe lunghe di un elenco che vanno a capo allineate al testo dell'elemento
  (rientro sospeso), come nell'anteprima.
- Controllo della **grammatica**, oltre all'ortografia (es. LanguageTool, che supporta
  l'italiano: però il testo verrebbe mandato ai suoi server).
- Aprire direttamente una cartella di appunti, con le immagini.
- Riconoscere un simbolo **disegnato a mano** (come Detexify).
- Anteprima delle formule direttamente dentro l'editor, alla Typora/Obsidian.
- Scorciatoie personali (es. `//` → `\frac{}{}`) e macro personalizzate.
- App desktop (Tauri) o estensione per VS Code con lo stesso pannello.
