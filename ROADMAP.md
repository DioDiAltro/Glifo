# Idee per il futuro

Le cose da aggiungere a Glifo. Quella «in programma» è la prossima; quando si riprende
il lavoro si parte da qui, e quando una voce è fatta si toglie.

## In programma

### Account: gli stessi appunti su ogni dispositivo

**Cosa:** accedere con un account da PC, tablet e telefono e ritrovare sempre gli
stessi appunti, aggiornati.

**Oggi:** gli appunti restano nel browser del dispositivo dove li scrivi. Per
spostarli si usano i file `.md` oppure Impostazioni → «Scarica backup» e
«Ripristina backup» sull'altro dispositivo.

**Prima scelta da fare:** se Glifo resta uno strumento personale basta **GitHub**; se lo
useranno anche altri studenti servono account veri con **Firebase**. Nel dubbio si parte da
GitHub: i passi 1 e 2 restano validi e Firebase si aggiunge dopo come secondo servizio.

**Piano, in tre passi:**

1. **Base comune**, utile con qualunque servizio:
   - fatto: con Glifo aperto in più schede le note non spariscono più e le schede si
     aggiornano a vicenda;
   - ogni nota ricorda l'ultima versione sincronizzata;
   - le note eliminate restano segnate come «eliminate», altrimenti ricompaiono
     dall'altro dispositivo.
2. **Sincronizzazione**, uguale per ogni servizio:
   - con la rete manda e scarica le modifiche da sola; senza rete l'app funziona come
     oggi e sincronizza quando la rete torna;
   - se la stessa nota cambia su due dispositivi tiene tutte e due le versioni, così non
     si perde testo;
   - al primo accesso chiede se caricare gli appunti già presenti nel browser;
   - porta con sé impostazioni e dizionario personale; la chiave API di Anthropic resta
     sul dispositivo;
   - test che simulano due dispositivi.
3. **Il servizio**, secondo la scelta.

**Le strade** (dati controllati il 30/09/2026 sulle documentazioni ufficiali):

- **GitHub**, per uso personale: un repository privato con un file `.md` per nota, con la
  cronologia delle modifiche e apribile in VS Code. Gratis, senza server, e non si
  conservano dati di altre persone.
  - Si accede con un token *fine-grained* limitato a quel repository (permesso Contents
    in lettura e scrittura; può anche non scadere), incollato una volta per dispositivo.
  - L'API di GitHub accetta chiamate dal browser (CORS). Per aggiornare un file serve lo
    `sha` della versione precedente: se nel frattempo è cambiato risponde 409, e così si
    scoprono i conflitti.
  - Un pulsante «Accedi con GitHub» richiede un piccolo servizio intermedio (es. un
    Cloudflare Worker): il login OAuth e il *device flow* non funzionano dal browser,
    perché GitHub non risponde con CORS e vuole il *client secret* anche con PKCE. Il
    supporto per le app senza server è in pausa nella roadmap di GitHub.
- **Firebase**, per account veri:
  - Accesso con email e password, che funziona anche nell'app installata su iPhone.
    «Accedi con Google» va su PC e Android; sull'iPhone con l'app installata il popup può
    non funzionare, e il redirect non va se il sito non è su Firebase Hosting.
  - Piano gratuito (Spark), senza carta di credito: Firestore con 1 GiB, 50.000 letture
    e 20.000 scritture al giorno; accesso gratuito fino a 50.000 utenti attivi al mese.
    Numeri da ricontrollare prima di partire.
  - Appunti salvati a Milano (`europe-west8`), ma Firebase Authentication tratta le email
    negli USA. Servono un'informativa sulla privacy (GDPR) che lo dica e un pulsante
    «Elimina account».
  - Firestore Lite (senza cache offline: la sincronizzazione è la nostra) con l'accesso
    pesa circa 65 KB (gzip), da caricare solo dopo il login.
- Scartate:
  - **Supabase**: il piano gratuito va in pausa dopo 7 giorni con poco uso e lo riattiva
    solo il proprietario; per mandare email agli utenti serve un proprio servizio di
    posta (SMTP).
  - **Google Drive** senza server: il permesso dura circa un'ora e per rinnovarlo si apre
    un popup.
  - **Un servizio tutto nostro su Cloudflare** (Workers + D1): il login andrebbe scritto
    da zero.

**Da tenere a mente:**

- Il browser dà circa 5 MB di spazio (localStorage): con tanti appunti conviene passare
  a IndexedDB, utile anche senza account.
- Facoltativo: crittografia end-to-end (gli appunti partono già cifrati con una password
  e nemmeno il server li può leggere; se si perde la password, si perdono gli appunti).
- Il punto di partenza nel codice è `src/store/notes.ts`: ogni nota ha già `id`,
  `createdAt` e `updatedAt`, e ogni modifica all'elenco parte da quello salvato.

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
