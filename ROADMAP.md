# Idee per il futuro

Le cose da aggiungere a Glifo. Quella «in programma» è la prossima; quando si riprende
il lavoro si parte da qui, e quando una voce è fatta si toglie.

**Per chi è Glifo:** non solo studenti universitari, ma chiunque lavori con file Markdown
(`.md`): appunti, paper scientifici, file `SKILL.md` per gli assistenti AI.

## In programma

### Account: i propri appunti su ogni dispositivo, anche da condividere

**Cosa:** ognuno ha il suo account e ritrova gli stessi appunti su PC, tablet e telefono.
Gli appunti si possono mandare a un'altra persona o tenere in una cartella condivisa. Più
avanti l'account servirà anche per l'abbonamento (vedi «Più avanti»).

**Oggi:** gli appunti restano nel browser del dispositivo dove li scrivi. Per spostarli si
usano i file `.md` oppure Impostazioni → «Scarica backup» e «Ripristina backup». Anche con
gli account, chi non accede continua a usare Glifo così.

**Servizio proposto: Supabase** (da confermare). Dà già pronti database (Postgres), login e
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
- Con utenti veri serve il piano Pro, 25 dollari al mese per progetto, che non va in pausa.
- Per mandare le email di accesso agli utenti servono un servizio di posta (SMTP, es.
  Resend) e un dominio (es. glifo.app, circa 10-20 € l'anno), che può ospitare anche il
  sito. Per le prove basta l'email del proprietario, a cui Supabase scrive da solo.

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
   - ogni nota ricorda l'ultima versione sincronizzata, e le note eliminate restano
     segnate come «eliminate», altrimenti ricompaiono dall'altro dispositivo (si fa insieme
     alla sincronizzazione, al passo 3).
2. **Il progetto Supabase:** tabelle (profili, note, cartelle, chi fa parte di ogni
   cartella), regole di accesso e test che provano che nessuno legge le note degli altri.
3. **Accesso e sincronizzazione** delle proprie note:
   - con la rete manda e scarica le modifiche da sola; senza rete l'app funziona come oggi
     e sincronizza quando la rete torna;
   - se la stessa nota cambia su due dispositivi tiene tutte e due le versioni, così non si
     perde testo;
   - al primo accesso chiede se caricare gli appunti già presenti nel browser;
   - porta con sé impostazioni e dizionario personale; la chiave API di Anthropic resta sul
     dispositivo.
4. **Condivisione:**
   - mandare una copia di una nota a un'altra persona, che la trova tra i «Ricevuti»;
   - cartelle condivise con persone scelte, che possono solo leggere o anche modificare;
   - se due persone cambiano la stessa nota insieme restano tutte e due le versioni.
     Scrivere insieme in tempo reale, come in Google Docs, è un passo successivo.
5. **Privacy:** informativa (GDPR), «Elimina account» che cancella tutto, «Scarica i miei
   dati».

**Da tenere a mente:**

- Il browser dà circa 5 MB di spazio (localStorage): con tanti appunti, e più avanti con le
  registrazioni, conviene passare a IndexedDB.
- Crittografia end-to-end (nemmeno il server legge gli appunti): con condivisione,
  trascrizione e AI lato server diventa complicata, perché il server non vede il testo.
- Il punto di partenza nel codice è `src/store/notes.ts`: ogni nota ha già `id`,
  `createdAt` e `updatedAt`, e ogni modifica all'elenco parte da quello salvato.

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
