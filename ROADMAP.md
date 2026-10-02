# Idee per il futuro

Le cose da aggiungere a Glifo. Quella «in programma» è la prossima; quando si riprende
il lavoro si parte da qui, e quando una voce è fatta si toglie.

**Per chi è Glifo:** non solo studenti universitari, ma chiunque lavori con file Markdown
(`.md`): appunti, paper scientifici, file `SKILL.md` per gli assistenti AI.

## In programma

### Matematica per i corsi: grafici e calcoli per tutto il programma

**Cosa:** chiesto dallo studente il 2 ottobre 2026: grafici e calcoli devono bastare per un corso
di matematica intero (Analisi 1 e 2, Geometria e algebra lineare). Si fa a tappe: ognuna viene
pubblicata appena è pronta e qui si segna come fatta.

1. Fatto (2 ottobre 2026): **grafici 3D** nel blocco ```grafico: superfici (`z = x^2 + y^2`,
   `f(x, y) = …`), superfici date da un'equazione (`x^2 + y^2 + z^2 = 4`) e piani, superfici con due
   parametri (`(u \cos v, u \sin v, u)`), curve nello spazio (`(\cos t, \sin t, t)`), punti e
   vettori (anche nel piano). Si girano trascinandoli e hanno gli slider come quelli 2D. Da
   migliorare se serve: dove due superfici curve si tagliano il bordo è a dentini (i piani invece
   tagliano giusto).
2. Fatto (2 ottobre 2026): **integrali doppi e tripli** nella nota, uno dentro l'altro
   (`\int_0^1 \int_0^x xy \, dy \, dx`, anche in polari e sferiche) o sul dominio scritto sotto
   (`\iint_{x^2 + y^2 \le 1}`, `[0, 1] \times [0, 2]`, il nome di un insieme `D = \{(x, y) : …\}`), e
   nel grafico: il dominio colorato nel piano, il volume sotto la superficie e i solidi nel 3D
   (anche cilindrici e sferici). Le **zone colorate** delle disuguaglianze (`y > x^2`,
   `x^2 + y^2 \le 4`), tratteggiate dove il bordo è escluso, e i solidi (`x^2 + y^2 + z^2 \le 1`).
   Da migliorare se serve: un dominio in coordinate cilindriche o sferiche con condizioni che non
   tengono una variabile da sola tra due estremi (come `0 \le \rho \le 2\cos\varphi`) si disegna a
   gradini; il volume sotto una superficie data in r e θ non si disegna (dentro la funzione c'è lo
   jacobiano r).
3. **Numeri complessi**: `i`, coniugato, modulo, argomento, forma esponenziale, potenze e radici.
   Nel grafico il piano di Gauss, con punti, circonferenze (`|z - i| = 2`) e zone.
4. **Vettori e matrici**: matrici scritte con `pmatrix`, determinante, inversa, trasposta, rango,
   traccia, riduzione a scala, nucleo e immagine, autovalori e autovettori, prodotto scalare e
   vettoriale, norma. Nei grafici le frecce dei vettori.
5. **Geometria**: segmenti, triangoli e poligoni, rette per due punti, circonferenze, distanze,
   angoli, punti medi; piani e rette nello spazio.
6. **Integrali di linea e di superficie** su curve e superfici date con i loro parametri, lavoro e
   flusso; campi vettoriali disegnati con le frecce, gradiente, divergenza e rotore.
7. **Il resto di Analisi**: derivate scritte come formula, limiti, serie, polinomi di Taylor,
   equazioni e sistemi risolti, curve di livello, campi di direzioni delle equazioni differenziali.

### Account: i propri appunti su ogni dispositivo, anche da condividere

**Cosa:** ognuno ha il suo account e ritrova gli stessi appunti su PC, tablet e telefono.
Gli appunti si possono mandare a un'altra persona o tenere in una cartella condivisa. Più
avanti l'account servirà anche per l'abbonamento (vedi «Più avanti»).

**Oggi:** l'account c'è, in prova. Si entra con Google o con un'email e gli appunti si
sincronizzano tra i dispositivi (passi 1-3 e l'accesso con Google del passo 4). Per ora entrano
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

### Schemi: idee in più

Gli schemi sono fatti, con lo studente (ottobre 2026): editor stile draw.io con maxGraph (scelto
al posto del vero draw.io incorporato perché funziona offline e non manda niente a nessuno); forme, frecce curve, modelli pronti, allinea e distribuisci, immagini PNG e SVG;
le figure delle basi di dati (E-R come nell'Atzeni, tabelle con PK, FK e tipi) e il codice SQL
delle tabelle per più database. Tutto è descritto nel README. Se serviranno:

- il contrario dell'SQL: da un file SQL alle tabelle disegnate; e il passaggio dallo schema E-R
  alle tabelle (la progettazione logica);
- stampare con i colori del tema chiaro anche se si usa quello scuro;
- raggruppare le forme;
- altri modelli (per esempio una mappa mentale);
- le punte «a zampa di gallina» per le cardinalità, se servono al corso di basi di dati.

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

### Calcoli e grafici: idee in più

Calcoli e grafici sono fatti (ottobre 2026, primo giro «vediamo cosa esce»): risultati dopo `=` con
le definizioni della nota, blocchi ```grafico con funzioni, curve, punti, asintoti, trascinare e
ingrandire, grafici nei file .md come immagini, gli **slider** per i numeri (in `y = a x^2`,
trascinare `a`, o scriverne il valore accanto, e vedere il grafico cambiare, come in GeoGebra e nelle
Note matematiche) e l'**area degli integrali** (`\int_0^2 x^2 \, dx` colora l'area sotto la curva, con
il valore nella legenda). Tutto è descritto nel README. Quello che serve per i corsi di matematica
è «in programma» (sopra). Se serviranno anche:

- l'area tra due curve (`\int_0^1 (f(x) - g(x)) \, dx` oggi colora quella sotto la differenza);
- nelle aree degli integrali, le parti sotto l'asse x di un altro aspetto (oggi hanno lo stesso
  colore: nell'integrale contano con il meno);
- segnare da soli zeri, massimi, minimi e intersezioni (con un clic sulla curva);
- i calcoli anche fuori dalle formule (`12 * 3 =` nel testo) e con le unità di misura (`3 m/s`);
- un'impostazione per spegnere i risultati dopo `=`, se a qualcuno danno fastidio;
- «Copia come immagine» e PNG anche per i grafici (come per gli schemi).

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
