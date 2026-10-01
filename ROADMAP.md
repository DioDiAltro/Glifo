# Idee per il futuro

Le cose da aggiungere a Glifo. Quella «in programma» è la prossima; quando si riprende
il lavoro si parte da qui, e quando una voce è fatta si toglie.

**Per chi è Glifo:** non solo studenti universitari, ma chiunque lavori con file Markdown
(`.md`): appunti, paper scientifici, file `SKILL.md` per gli assistenti AI.

## In programma

### Schemi stile draw.io

Scelto con lo studente: un editor dentro Glifo fatto con maxGraph (il motore di draw.io),
invece del vero draw.io incorporato, perché funziona offline e non manda niente a nessuno.

- fatto, passo 1: editor a tutto schermo con rettangolo, rettangolo arrotondato, ellisse, rombo e
  testo; frecce blu per collegare (trascinate) o aggiungere una forma collegata (cliccate);
  testo con formule; colori dei due temi, forma, dimensione del testo, frecce dritte o ad angolo,
  punte, tratteggio; annulla, copia e incolla, zoom, griglia. Nella nota è un blocco ```schema
  (`src/schema/`), disegnato nell'anteprima e mostrato nel testo come una riga con «Modifica»;
- fatto, dopo le prime prove dello studente: il riquadro che segue una forma trascinata si vede
  anche sul tema scuro (maxGraph lo faceva nero); con «Salva .md» ogni schema va nel file come
  immagine SVG, che l'anteprima di VS Code mostra, con il JSON in un commento che Glifo rilegge
  riaprendo il file (`src/schema/file.ts`);
- fatto, passo 2: altre forme (parallelogramma, esagono, triangolo, nuvola, documento, cilindro,
  nota, freccia grande e doppia; triangolo e frecce si girano di un quarto, `shapes.ts`),
  modelli pronti (diagramma di flusso, mappa concettuale, albero, ciclo, linea del tempo,
  `templates.ts`), allinea e distribuisci (`arrange.ts`), «Scarica» come PNG (fitto il doppio,
  con la risoluzione scritta dentro per Word) o SVG, e «Copia come immagine» (`image.ts`);
- fatto, su richiesta dello studente: frecce curve («Curva», come in draw.io), il testo di una
  freccia all'inizio, a metà o alla fine (per le cardinalità), e il gruppo «Basi di dati» nel
  pannello: entità ed entità debole, relazione e relazione identificante, attributi (chiave,
  multivalore, derivato, e a pallino come nell'Atzeni), tabella con PK ed FK, database; i
  modelli «Schema E-R» e «Tabelle»;
- fatto, dopo le prove dello studente: la tabella si scrive com'è disegnata, con il nome nella
  fascia in alto e i campi sotto (doppio clic sul nome o su un campo per cambiare quello). Trovati
  provando, per tutte le forme: un clic sul foglio finisce di scrivere (prima il riquadro del testo
  restava aperto); un clic su un colore, mentre si scrive, non va più perso; Ctrl+S, mentre si
  scrive, salva nella nota invece di aprire «Salva pagina con nome» del browser;
- fatto, su proposta dello studente: i campi delle tabelle nel pannello a destra, con PK ed FK
  da premere (anche tutte e due, come in Esame), il tipo e «Aggiungi campo»; «Scarica» → «Codice
  SQL delle tabelle», per il database scelto (SQL standard, PostgreSQL, MySQL/MariaDB, SQLite,
  Oracle, SQL Server: lo studente non sa ancora quale userà il corso), con le chiavi esterne prese
  dalle frecce tra le tabelle o dai nomi (`sql.ts`, provato davvero in PostgreSQL e SQLite);
- corretto, trovato dallo studente: col cursore subito prima o subito dopo la riga «Schema» nel
  testo, «Titolo» (o un elenco, una citazione, o il testo scritto) cambiava la riga ``` e lo schema
  tornava testo; ora va su una riga nuova lì accanto (`schemaBlocks.ts`);
- più avanti, se servono: il contrario (da un file SQL alle tabelle disegnate) e il passaggio dallo
  schema E-R alle tabelle (la progettazione logica);
- più avanti: stampare con i colori del tema chiaro anche se si usa quello scuro; raggruppare le
  forme; altri modelli (per esempio una mappa mentale); le punte «a zampa di gallina» per le
  cardinalità, se servono al corso di basi di dati.

### Account: i propri appunti su ogni dispositivo, anche da condividere

**Cosa:** ognuno ha il suo account e ritrova gli stessi appunti su PC, tablet e telefono.
Gli appunti si possono mandare a un'altra persona o tenere in una cartella condivisa. Più
avanti l'account servirà anche per l'abbonamento (vedi «Più avanti»).

**Oggi:** l'account c'è, in prova. Si entra con un'email e gli appunti si sincronizzano tra
i dispositivi (passi 1-3 qui sotto). Le email però arrivano solo ai membri del team
Supabase, quindi per ora lo può usare solo il proprietario del progetto. Chi non accede
continua a usare Glifo come prima, con gli appunti nel browser.

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
  proprietario, a cui Supabase scrive da solo. Senza email si può aprire l'accesso con
  Google (vedi il passo 4).

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
4. **Aprire l'account a tutti** (il prossimo, gratis):
   - accesso con Google: nell'app è fatto («Continua con Google» nella finestra di accesso;
     con la stessa email si ritrova lo stesso account). Da fare, dallo studente: il progetto
     Google Cloud e l'attivazione in Supabase, con i passi in
     [supabase/README.md](supabase/README.md) («Accesso con Google»). Finché l'app Google è
     «Testing» entrano solo gli indirizzi aggiunti come «Test users»;
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
       di Supabase;
   - CAPTCHA contro le iscrizioni automatiche (Cloudflare Turnstile, gratis) e limiti di
     spazio da rivedere (oggi 20 MB di note per account);
   - un servizio di posta nostro (SMTP): serve per scrivere a chi non è nel team e per
     cambiare l'email, per esempio con il codice di 6 cifre al posto del solo link (comodo
     per leggere l'email sul telefono e scrivere il codice sul computer). Gratis si può
     usare un account Gmail con una «password per le app»; più avanti, con un dominio, un
     servizio come Brevo o Resend.
5. **Condivisione:**
   - profili (il nome che vedono gli altri) e membri di ogni cartella;
   - mandare una copia di una nota a un'altra persona, che la trova tra i «Ricevuti»;
   - cartelle condivise con persone scelte, che possono solo leggere o anche modificare;
   - se due persone cambiano la stessa nota insieme restano tutte e due le versioni.
     Scrivere insieme in tempo reale, come in Google Docs, è un passo successivo.

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

### Abbonamento e funzioni a pagamento (da capire)

- Cosa far pagare e quanto: per esempio la trascrizione e l'AI senza la propria chiave API
  (i costi dell'AI li pagherebbe Glifo).
- Come incassare: Stripe, oppure un servizio che vende al posto tuo e gestisce l'IVA
  europea (*merchant of record*, es. Paddle). Tasse e partita IVA da capire con un
  commercialista.
- Serve l'account: il database terrà il piano di ognuno (gratis o abbonato).

### Trascrizione delle lezioni in appunti

- Registrare l'audio (o lo schermo, sul computer) e trasformarlo in appunti ordinati, con
  titoli, elenchi e formule in LaTeX.
- Due strade: trascrizione nel browser con un modello Whisper (gratis e privata, ma pesante
  per i telefoni) oppure un servizio in cloud, più veloce e preciso, a pagamento.

### Aiuto con gli esercizi

- Una modalità dell'assistente che aiuta senza dare subito la soluzione: chiede cosa hai
  provato, dà un indizio alla volta e controlla i passaggi; la soluzione intera solo se la
  chiedi.
- Funziona già con la propria chiave API; con l'abbonamento anche senza.

### Grafici come nella Calcolatrice dell'iPad

- Scrivi una funzione (es. `y = x^2`) e vedi il grafico nell'anteprima; i risultati si
  calcolano quando scrivi `=`, come nelle «Note matematiche».

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
