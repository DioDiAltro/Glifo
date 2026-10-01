# Il database degli account (Supabase)

Serve a ritrovare gli stessi appunti su ogni dispositivo. Glifo funziona anche senza: chi
non accede tiene tutto nel browser, come sempre.

## Il progetto

- Nome `glifo`, id `fgsuonetdmcgojbvrsxi`, a Francoforte (`eu-central-1`), piano gratuito.
- Indirizzo: `https://fgsuonetdmcgojbvrsxi.supabase.co`
- Chiave pubblica: `sb_publishable_4jydYJz3S1NHQNZfaACsOg_QUy22pch`. Può stare nel codice
  dell'app: da sola non apre niente, sono le regole del database a decidere chi vede cosa.
- La chiave segreta (`sb_secret_…`, o la vecchia `service_role`) salta tutte le regole: non
  va **mai** nel codice, nei messaggi o a qualcuno.
- Sul piano gratuito il progetto va in pausa dopo 7 giorni con poco uso; lo riattiva il
  proprietario dalla dashboard di Supabase.

## Cosa c'è

Le tabelle sono in `migrations/`:

- `folders`, `notes` e `user_settings`: cartelle, note, impostazioni e dizionario personale di
  ogni account.
- **Regole di accesso:**
  - ognuno legge e modifica solo le sue righe, e chi non ha fatto l'accesso non vede niente;
  - una nota può stare solo in una cartella dello stesso account.
- **Niente si cancella dal browser.** Una nota o una cartella eliminata resta con
  `deleted_at` e senza testo, così anche gli altri dispositivi la tolgono. Tutto sparisce
  davvero quando si elimina l'account.
- **Colonne scritte solo dal database:**
  - `revision` sale di 1 a ogni modifica;
  - `txid` è la transazione dell'ultima modifica.

  Proprietario, revisione e transazione non si possono scegliere dal browser.
- **Limiti:**
  - una nota al massimo 1 MB;
  - le note di un account al massimo 20 MB (ogni nota conta almeno 1000 byte);
  - al massimo 1000 cartelle.

  Gli errori dei limiti hanno `hint = 'quota'`.
- La chiave API di Anthropic (`apiKey`) e l'indirizzo del proxy (`apiBaseUrl`) non possono
  finire in `user_settings`.
- Gli id sono UUID. Le note create prima delle cartelle hanno id più corti: al primo
  caricamento ne ricevono uno nuovo.

## Eliminare l'account

`delete_account()`, da chiamare dopo l'accesso con `supabase.rpc('delete_account')`, elimina
l'utente del token e, a cascata, le sue cartelle, note, impostazioni e sessioni (anche quelle
degli altri dispositivi, che al prossimo rinnovo dell'accesso restano fuori). Chi non ha fatto
l'accesso non la può chiamare.

Il browser non può toccare `auth.users`: la cancellazione la fa
`private.delete_own_account()`, che gira con i permessi di chi l'ha creata (`security
definer`) ma cancella solo l'utente del token. Sta nello schema `private`, che l'API non
espone; `delete_account()` in `public` la chiama con i permessi di chi chiama.

## Sincronizzazione

Due funzioni, da chiamare dopo l'accesso con `supabase.rpc(...)`.

### `sync_pull({ since })`: scarica le novità

- Senza `since` restituisce tutte le cartelle e le note (tranne le eliminate) e le
  impostazioni.
- Con `since` uguale al `cursor` della volta prima, restituisce solo quello che è cambiato
  dopo, comprese le eliminazioni.
- Risposta: `{ cursor, folders: [riga], notes: [riga], settings: riga | null }`.
- Il cursore è la più vecchia transazione ancora aperta: una modifica che finisce di
  salvarsi mentre si scarica arriva la volta dopo. Può tornare una riga già vista; basta
  confrontare `revision`.

### `sync_push({ changes })`: manda le modifiche

- `changes` è `{ folders: [...], notes: [...], settings: {...} }`:
  - cartella: `{ id, base_revision, name, created_at, updated_at, deleted_at }`;
  - nota: `{ id, base_revision, folder_id, title, content, created_at, updated_at, deleted_at }`;
  - impostazioni: `{ base_revision, settings?, dictionary?, updated_at }`, mandando solo
    quello che è cambiato.
- `base_revision` è la revisione da cui è partita la modifica (`null` se è nuova).
- Le cartelle si salvano prima delle note, così una nota può entrare in una cartella appena
  creata.
- Risposta: per ogni voce `{ id, status, row }` (per le impostazioni solo `{ status, row }`).
  I valori di `status`:
  - `ok`: salvata, oppure sul server era già così (per esempio se si rimanda la stessa
    modifica perché la risposta si è persa);
  - `conflict`: nel frattempo è cambiata su un altro dispositivo. `row` è la versione del
    server e non è stato sovrascritto niente: per le note l'app tiene tutte e due le
    versioni;
  - `rejected`: l'id appartiene a un altro account.
- Una nota in una cartella che sul server non c'è resta fuori dalle cartelle.

## Nell'app

- `src/account/sync.ts` usa queste due funzioni: manda le modifiche, poi scarica le novità.
- `src/account/space.ts` tiene le note di ogni account in uno spazio a parte del browser.
- `src/account/supabase.ts` si occupa dell'accesso (email o Google). Sincronizza, scarica i
  dati ed elimina l'account solo se l'accesso salvato nel browser è dell'account aperto: così
  le note di un account non finiscono mai in un altro.

L'email per entrare:

- **Site URL** (Authentication → URL Configuration) deve essere l'indirizzo di Glifo,
  `https://diodialtro.github.io/Glifo/`: è dove riporta il link. Con quello predefinito,
  `http://localhost:3000`, il link porta a una pagina che non si apre.
- **Il servizio di posta di Supabase** (gratuito) scrive solo ai membri del team, poche
  email all'ora, e con i modelli predefiniti: l'email ha solo il link («Sign in»), non il
  codice. I modelli si possono cambiare solo con un servizio di posta proprio (SMTP).
- **Il link** vale una volta sola e solo nel browser in cui si è chiesta l'email (flusso
  PKCE). Se si aprirebbe altrove, lo si copia e lo si incolla nella finestra di Glifo:
  l'app prende il token e lo controlla con `verifyOtp({ token_hash, type: 'email' })`.
- **Il codice di 6 cifre** arriva se i modelli «Magic Link» e «Confirm signup» contengono
  `{{ .Token }}` (quindi con un SMTP proprio): Glifo lo accetta già.

### Accesso con Google

Glifo chiama `signInWithOAuth({ provider: 'google' })` e torna con `?code=…`, come il link
dell'email. Prima legge `/auth/v1/settings`: se Google non è attivo, lo dice nella finestra
invece di mandare su una pagina di errore. Con la stessa email di un account già esistente,
Supabase collega Google a quell'account: note e impostazioni restano le stesse.

Per attivarlo (gratis, senza carta di credito):

1. In [Google Cloud](https://console.cloud.google.com/) si crea un progetto «Glifo». Nella
   [Google Auth Platform](https://console.cloud.google.com/auth/overview), «Get started»:
   - nome dell'app «Glifo», email di assistenza;
   - pubblico «External»;
   - email di contatto.
2. In **Audience** l'app resta «Testing»: entrano solo gli indirizzi aggiunti tra i «Test
   users» (fino a 100). Quando l'account si apre a tutti, «Publish app».
3. In **Clients** → «Create client», tipo «Web application»:
   - *Authorized JavaScript origins*: `https://diodialtro.github.io`;
   - *Authorized redirect URIs*: `https://fgsuonetdmcgojbvrsxi.supabase.co/auth/v1/callback`.

   Poi si copiano «Client ID» e «Client secret».
4. In Supabase, Authentication → Sign In / Providers → **Google**: si attiva, e si incollano
   Client ID e Client secret. Il secret va solo lì.

La pagina di Google mostra l'indirizzo di Supabase (`fgsuonetdmcgojbvrsxi.supabase.co`) al posto
di «Glifo». Si può cambiare in due modi: con la verifica del marchio da parte di Google, o con
un dominio personalizzato per Supabase, che però è a pagamento.

## Cambiare il database

1. Ogni modifica è un file nuovo in `migrations/`. Quelli già applicati non si toccano.
2. Si applica con il connettore Supabase (`apply_migration`), poi si rinomina il file con
   la versione che dà `list_migrations`. Con la CLI: `supabase db push`.
3. Si eseguono i test di `tests/database.test.sql`. `npm test` li esegue già in un Postgres
   in memoria (PGlite), con `tests/supabase-stub.sql` al posto delle parti di Supabase. Sul
   progetto vero si eseguono dal SQL editor di Supabase, con `psql` o con `execute_sql` del
   connettore. Tutto viene annullato alla fine, e il risultato giusto è l'errore
   «TEST OK: N controlli».
4. Si controllano gli avvisi di sicurezza e prestazioni (Advisors nella dashboard, oppure
   `get_advisors`).
