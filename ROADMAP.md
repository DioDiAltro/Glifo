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

**Strade possibili:**

- **Accedi con GitHub:** ogni appunto diventa un file `.md` in un repository
  privato dello studente. Gratis, con la cronologia delle modifiche, e i file si
  aprono anche in VS Code. Contro: serve un account GitHub, e il login da un sito
  senza server richiede un piccolo servizio intermedio (es. un Cloudflare Worker)
  oppure un token incollato a mano.
- **Account veri (email o Google)** con un servizio pronto come Supabase o
  Firebase: login, database e regole di sicurezza senza scrivere un server da
  zero; il piano gratuito basta per iniziare (verificare i limiti attuali).
  Funziona ovunque, telefono compreso, e un domani permette di condividere
  appunti con i compagni. Contro: si conservano dati di altre persone, quindi
  serve un'informativa sulla privacy (GDPR), e ci sono costi se gli utenti
  crescono.

Prima scelta da fare: se Glifo resta uno strumento personale basta GitHub; se lo
useranno anche altri studenti servono gli account veri.

**Da tenere a mente, qualunque strada si scelga:**

- L'app deve continuare a funzionare senza connessione (è installabile): copia
  locale degli appunti e sincronizzazione quando torna la rete.
- Conflitti: se la stessa nota viene modificata su due dispositivi offline, non
  si deve perdere testo (tenere entrambe le versioni o unire le modifiche).
- Le note eliminate vanno ricordate come «eliminate», altrimenti ricompaiono
  dall'altro dispositivo.
- Al primo accesso chiedere se caricare gli appunti già presenti nel browser.
- Sincronizzare anche le impostazioni e le parole aggiunte al dizionario del controllo
  ortografico; la chiave API di Anthropic invece resta sul dispositivo.
- Il browser dà circa 5 MB di spazio (localStorage): con tanti appunti conviene
  passare a IndexedDB, utile anche senza account.
- Facoltativo: crittografia end-to-end (gli appunti partono già cifrati con una
  password e nemmeno il server li può leggere; se si perde la password, si
  perdono gli appunti).
- Il punto di partenza nel codice è `src/store/notes.ts`: ogni nota ha già `id`,
  `createdAt` e `updatedAt`.

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
