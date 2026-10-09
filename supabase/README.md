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
- `shared_notes`: le note condivise con un link (vedi «Note condivise con un link», sotto).
- `feedback`: i commenti di chi prova Glifo (vedi «Commenti di chi prova Glifo», sotto).
- **Regole di accesso:**
  - ognuno legge e modifica solo le sue righe, e chi non ha fatto l'accesso non vede niente
    (tranne una nota condivisa, con il suo link, e i commenti visibili: sotto);
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

## Note condivise con un link

Una nota condivisa è una fotografia (titolo e testo come erano quando la si è condivisa), che
chi ha il link legge anche senza account, nella pagina `nota.html#codice` di Glifo. Il codice è
casuale (22 caratteri, 122 bit). La tabella `shared_notes` la legge solo il proprietario; il
browser non ci scrive: tutto passa da queste funzioni.

- `share_note({ note, title, content, allow_copy })`: condivide una propria nota, o ne aggiorna
  la fotografia (il link resta lo stesso). La nota deve essere nell'account e non eliminata,
  altrimenti errore con `hint = 'missing'`. Restituisce il link: `{ token, note_id, title,
  allow_copy, created_at, updated_at, content_hash }`, dove `content_hash` è lo SHA-256 del
  testo (l'app lo confronta con la nota per dire se è cambiata dopo la fotografia).
- `set_shared_copy({ note, allow_copy })`: «Consenti copie» sì o no, senza cambiare la
  fotografia. `null` se la nota non ha link.
- `unshare_note({ note })`: toglie il link, che non si apre più.
- `shared_links({ note? })`: i propri link (di una nota sola, se si dice quale).
- `shared_note({ token })`: per chi ha il link, **anche senza accesso** (ruolo `anon`):
  `{ title, content, allow_copy, updated_at }`, oppure `null`. Non dice di chi è la nota.
  L'app la chiama con la sola chiave pubblica nell'intestazione `apikey`, senza il client.

Eliminando la nota (`deleted_at`) o l'account il link sparisce. Le fotografie di un account
occupano al massimo 20 MB (`hint = 'quota'`). Le funzioni che scrivono stanno in `private`
(`security definer`, controllano `auth.uid()`); quelle in `public` le chiamano con i permessi
di chi chiama. I test sono in `tests/condivisione.test.sql`.

## Commenti di chi prova Glifo

Il fumetto in fondo alla barra laterale apre la pagina «Commenti» (`src/ui/comments.ts`): i commenti
che chi scrive ha fatto vedere a tutti, divisi in problemi, idee e altro. Da lì «Scrivi un commento»
(`src/ui/feedback.ts`) manda un problema, un'idea o altro, anche senza account. Tutto passa dalla
tabella `feedback` (migrazioni «commenti» e «commenti pubblici»), con la sola chiave pubblica, senza
l'accesso:

- colonne: `kind` (`problema`, `idea`, `altro`), `message` (al massimo 4000 caratteri, non solo
  spazi), `author` (il nome, facoltativo: al massimo 40 caratteri, su una riga), `email`
  (facoltativa, per rispondere), `visible` (se si vede nella pagina; quelli arrivati prima della
  pagina sono `false`, perché la finestra diceva che li leggeva solo chi fa Glifo), `reply` (la
  risposta di chi fa Glifo), `site` (`online`, `prova` o `claude`), `version` (lo sha della build e
  quando), `browser` (il browser e la misura della finestra), `created_at`;
- dal browser si **inseriscono** le colonne del messaggio (non `reply`; id e data li mette il
  database) e si **leggono** solo i commenti con `visible`, e di questi solo `id`, `created_at`,
  `kind`, `author`, `message` e `reply`: mai email, sito, versione e browser (`select=*` e i filtri
  su quelle colonne danno errore). Nessuno li cambia o li cancella dall'app, nemmeno con l'accesso;
- al massimo 60 commenti all'ora in tutto (`private.feedback_limit`, errore con `hint = 'quota'`).

**Per leggerli:** dashboard di Supabase → progetto `glifo` → **Table Editor** → `feedback` (i più
nuovi in fondo, o ordinati per `created_at`): lì ci sono tutti, anche quelli privati. Da lì si
**risponde** (si scrive in `reply`: compare sotto il commento), si **nasconde** un commento dalla
pagina (`visible` → `false`) e si cancellano quelli che non servono più o che qualcuno chiede di
togliere. I test sono in `tests/commenti.test.sql`.

## Nell'app

- `src/account/sync.ts` usa queste due funzioni: manda le modifiche, poi scarica le novità.
- `src/account/space.ts` tiene le note di ogni account in uno spazio a parte del browser.
- `src/account/supabase.ts` si occupa dell'accesso (email o Google). Sincronizza, scarica i
  dati, condivide le note ed elimina l'account solo se l'accesso salvato nel browser è
  dell'account aperto: così le note di un account non finiscono mai in un altro.
- `src/share/` è la condivisione con un link: la finestra «Condividi» e la pagina `nota.html`.

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

### Il trasloco su glifo.page (ottobre 2026)

Dal 18 ottobre 2026 Glifo è su `https://glifo.page/` (ROADMAP.md, «Trasloco»). L'accesso torna
sempre alla pagina da cui parte (`appUrl` in `src/account/supabase.ts`), quindi Supabase deve
accettare anche il nuovo indirizzo:

- **Redirect URLs** (Authentication → URL Configuration): `https://glifo.page/**`, aggiunto dallo
  studente il 9 ottobre 2026 (l'accesso con Google da glifo.page funziona: nei registri il login
  `pkce` delle 16:17 UTC);
- **Site URL**: `https://glifo.page/` dal giorno del trasloco (fino ad allora resta quello di
  GitHub Pages);
- in Google, nel client web (vedi sotto), *Authorized JavaScript origins* anche
  `https://glifo.page`, e in **Branding** il dominio `glifo.page` tra gli *Authorized domains*
  (fatto il 9 ottobre 2026). Il *redirect URI* resta quello di Supabase. Sempre il 9 ottobre l'account
  Google di Glifo è diventato proprietario (Owner) del progetto Google Cloud, accanto a quello dello
  studente, ed è l'email di assistenza e di contatto in **Branding**: nella finestra di Google si vede
  quella, non l'email personale.

### Accesso con Google

Attivo dal 2 ottobre 2026. Glifo chiama `signInWithOAuth({ provider: 'google' })` e torna con
`?code=…`, come il link dell'email. Prima legge `/auth/v1/settings`: se Google non è attivo, lo
dice nella finestra invece di mandare su una pagina di errore. Con la stessa email di un account
già esistente, Supabase collega Google a quell'account: note e impostazioni restano le stesse.

Come è stato attivato (gratis, senza carta di credito), anche per rifarlo:

1. In [Google Cloud](https://console.cloud.google.com/) c'è il progetto «Glifo», con «Nessuna
   organizzazione». Se un giorno S&Z avrà un'organizzazione Google (Workspace, o Cloud Identity
   Free sul suo dominio), il progetto si sposta dentro senza rifarlo.
2. Nella [Google Auth Platform](https://console.cloud.google.com/auth/overview), «Get started»:
   - nome dell'app «Glifo», email di assistenza;
   - pubblico «External»;
   - email di contatto.

   In **Branding** niente logo: il logo va fatto verificare da Google.
3. In **Audience** l'app resta «Testing», ma con Google entra lo stesso chiunque: Glifo chiede
   solo i permessi del punto 4 (nome, email e foto del profilo), e per le app così Google non usa
   l'elenco dei «Test users», non mostra avvisi e l'accesso non scade dopo 7 giorni («Manage App
   Audience» nella guida di Google Cloud). Lo studente lo ha provato il 9 ottobre 2026 con un
   account che non era nell'elenco: «Publish app» non serve. Se un giorno Glifo chiedesse a Google
   altri permessi (per esempio Drive), l'eccezione non varrebbe più: entrerebbero solo i «Test
   users» fino a «Publish app» e alla verifica di Google.
4. In **Data Access** → «Add or remove scopes»: `openid`, `.../auth/userinfo.email` e
   `.../auth/userinfo.profile`, come chiede la guida di Supabase.
5. In **Clients** → «Create client», tipo «Web application»:
   - *Authorized JavaScript origins*: `https://diodialtro.github.io`;
   - *Authorized redirect URIs*: `https://fgsuonetdmcgojbvrsxi.supabase.co/auth/v1/callback`.

   Poi si copiano subito «Client ID» e «Client secret»: il secret Google lo mostra per intero
   solo quando crea il client. Se si perde, se ne crea un altro dalla pagina del client e lo si
   rimette in Supabase.
6. In Supabase, Authentication → Sign In / Providers → **Google**: si attiva, e si incollano
   Client ID e Client secret. Il secret va solo lì. Il Site URL resta quello di Glifo (vedi
   sopra).

Un client nuovo, anche in un altro progetto Google, non cambia gli account: Google dà a ogni
persona lo stesso identificativo in tutti i progetti.

Per controllare che funzioni si guardano i registri di Supabase (Logs → Auth, o `query_logs` del
connettore). Un accesso riuscito passa da `/authorize` («Redirecting to external provider»),
`/callback` e `/token`, con `provider: google`; la prima volta per un account che c'era già
compare anche `identity_linked`. Le chiamate a `/callback` con «OAuth state parameter missing»
non sono accessi veri: qualcuno, o un programma, ha aperto quell'indirizzo direttamente.

La pagina di Google mostra l'indirizzo di Supabase (`fgsuonetdmcgojbvrsxi.supabase.co`) al posto
di «Glifo». Si può cambiare in due modi: con la verifica del marchio da parte di Google, o con
un dominio personalizzato per Supabase, che però è a pagamento.

## Cambiare il database

1. Ogni modifica è un file nuovo in `migrations/`. Quelli già applicati non si toccano.
2. Si applica con il connettore Supabase (`apply_migration`), poi si rinomina il file con
   la versione che dà `list_migrations`. Con la CLI: `supabase db push`.
3. Si eseguono i test di `tests/` (`database.test.sql`, `condivisione.test.sql` e `commenti.test.sql`). `npm test` li esegue già in un Postgres
   in memoria (PGlite), con `tests/supabase-stub.sql` al posto delle parti di Supabase. Sul
   progetto vero si eseguono dal SQL editor di Supabase, con `psql` o con `execute_sql` del
   connettore. Tutto viene annullato alla fine, e il risultato giusto è l'errore
   «TEST OK: N controlli».
4. Si controllano gli avvisi di sicurezza e prestazioni (Advisors nella dashboard, oppure
   `get_advisors`).
