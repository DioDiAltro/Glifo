# Glifo

**Appunti universitari in Markdown, per ogni materia. Le formule LaTeX si scrivono quasi da sole.**

Glifo è un editor di appunti che funziona nel browser (e si può installare come app).
Si scrive in Markdown come in VS Code (formule in LaTeX tra `$ … $`, codice colorato,
tabelle, liste), ma con un **pannello laterale** che mostra l'anteprima dei simboli mentre
li scrivi:

- scrivi `\su` → a destra compaiono `\sum`, `\sum_{}^{}`, `\sum_{}`… con l'anteprima
  (la sommatoria con i puntini sopra e sotto, per far capire dove vanno gli estremi);
- clicchi su quello giusto (o premi **Tab**) e il comando viene completato;
- con **Tab** salti da un segnaposto all'altro: `\sum_{n=0}^{\infty}` si scrive in pochi tasti;
- non ricordi il comando? Lo **cerchi a parole**: «come faccio il simbolo dell'infinito» → `\infty`;
- le parole scritte male vengono **sottolineate in rosso** (formule e codice no): un clic e le correggi.

**Usala subito: <https://diodialtro.github.io/Glifo/>**

![Suggerimenti mentre si scrive \su](docs/suggerimenti.png)

## Usarla tutti i giorni

Non serve installare nulla: basta aprire <https://diodialtro.github.io/Glifo/> dal
browser. Per averla come un'app vera, con la sua icona e funzionante anche senza internet:

| Dispositivo | Come installarla |
| --- | --- |
| Computer (Chrome o Edge) | icona **Installa** a destra nella barra degli indirizzi (oppure, nel menu del browser, la voce *Installa Glifo*) |
| Android (Chrome) | menu ⋮ → **Installa app** (o *Aggiungi a schermata Home*) |
| iPhone / iPad (Safari) | pulsante Condividi → **Aggiungi alla schermata Home** |
| Mac (Safari) | menu *File* → **Aggiungi al Dock** |

Cose da sapere:

- Senza account gli appunti sono salvati **nel browser del dispositivo** che stai usando:
  quelli scritti sul computer non compaiono da soli sul telefono. Con l'**account** sì
  (vedi sotto).
- Per spostarli o tenerli al sicuro puoi anche usare **Salva .md** (pure dentro una cartella
  di OneDrive, Google Drive o iCloud) e **Apri .md** sull'altro dispositivo. In *Impostazioni*
  c'è anche **Scarica backup**, con tutti gli appunti in un solo file.
- Puoi tenere Glifo aperto in più schede, o nell'app installata e nel browser insieme: si
  aggiornano a vicenda e nessuna cancella gli appunti scritti nelle altre.
- Quando esce una nuova versione, l'app si aggiorna da sola alla riapertura.

### Account

Con l'account ritrovi gli stessi appunti, con cartelle, impostazioni e dizionario personale,
su computer, tablet e telefono. Si entra dal pulsante **Accedi** in alto, senza password:
con **Continua con Google** oppure con un'email. Il link nell'email va aperto nel browser in
cui si usa Glifo; se si aprirebbe altrove (per esempio nell'app di Gmail), si copia e si
incolla nella finestra di Glifo. *Per ora è in prova: possono entrare solo gli indirizzi di
chi sta provando Glifo.*

- **Sincronizzazione automatica:** all'avvio, quando torni su Glifo, quando torna la rete e
  poco dopo ogni modifica. Il pallino sul pulsante dell'account dice com'è andata.
- **Senza rete** Glifo funziona come sempre, e le modifiche partono quando la rete torna.
- **Stessa nota cambiata su due dispositivi:** restano tutte e due le versioni, e quella
  di qui ha l'etichetta «copia in conflitto». Una nota eliminata su un dispositivo ma
  cambiata su un altro torna tra gli appunti: non si perde mai testo.
- **Primo accesso:** Glifo chiede se aggiungere all'account gli appunti già presenti nel
  browser. Se li lasci fuori, li ritrovi quando esci.
- **Chiave API:** quella dell'assistente AI resta sul dispositivo e non va all'account.
- **Uscita:** uscendo, le note dell'account vengono tolte dal browser, che magari non è il
  tuo. Nell'account restano.
- **Dove stanno i dati:** su [Supabase](https://supabase.com), in Europa (Francoforte).
  Ognuno può leggere solo i suoi appunti (vedi [supabase/README.md](supabase/README.md)).
- **I tuoi dati:** nella finestra dell'account, «Scarica i miei dati» scarica tutto l'account
  in un file (che «Ripristina backup» sa rileggere) ed «Elimina account» lo cancella dal
  server per sempre. Come vengono trattati i dati lo spiega
  l'[informativa sulla privacy](https://diodialtro.github.io/Glifo/privacy.html)
  (`privacy.html`).

## Funzionalità

**Editor**
- Markdown completo: titoli, grassetto, corsivo, elenchi, liste di cose da fare, tabelle,
  citazioni, codice con evidenziazione, link, note a piè di pagina.
- Formule in linea `$ … $` e a blocco `$$ … $$` riconosciute con **le stesse regole
  dell'anteprima di VS Code**: i file restano compatibili (anche i blocchi ` ```math ` di GitHub).
- Colori per il TeX dentro le formule, `$`, graffe e parentesi che si chiudono da sole.
- Barra di formattazione e scorciatoie (Ctrl+B, Ctrl+I, Ctrl+M per una formula…).
- **Elenchi di ogni tipo**, anche uno dentro l'altro: `1)` `1.` `(1)`, lettere `a)` `A)` `(a)`,
  numeri romani `i)` `ii)`, puntati `-` `*` `•`, etichette come `es)` `oss)` `NB)` e cose da
  fare `- [ ]`. **Invio** continua con il marcatore dopo (1) → 2), a) → b), i) → ii)) e su una
  riga vuota torna indietro di un livello; **Tab** sposta la riga dentro quella sopra, allineata
  al suo testo (1) → a) → i), come nei programmi di scrittura), **Maiusc+Tab** la riporta fuori;
  i numeri si aggiornano da soli. Nell'anteprima ogni marcatore si vede com'è scritto
  (`-` diventa un trattino). Tutti i tipi sono anche nel menu degli elenchi nella barra.
- **Controllo ortografico** in italiano e inglese con [Hunspell](https://hunspell.github.io), lo
  stesso correttore di LibreOffice e Firefox. Non controlla formule, codice e link, conosce i
  termini tecnici (iniettiva, jacobiano, bayesiano, eteroschedasticità…), i cognomi degli
  scienziati (Cauchy, Weierstrass, Schrödinger…) e le parole dell'informatica (array, thread,
  override…). Clic sulla parola sottolineata (o **Ctrl+.**) per le correzioni; le parole che
  aggiungi al tuo dizionario si possono rivedere in *Impostazioni*. Funziona anche offline.

**Pannello dei simboli**
- **Anteprima della formula** sotto il cursore, aggiornata mentre scrivi: mostra già il
  suggerimento selezionato al suo posto, e se c'è un errore lo spiega in italiano.
- **Suggerimenti** mentre scrivi `\…`, con varianti e segnaposto (`\frac{}{}`, `\lim_{ \to }`,
  matrici, sistemi…). Si può scrivere anche in italiano: `\infinito`, `\radice`, `\freccia`,
  `\perogni`.
- **Segnaposto annidati**: inserisci una frazione dentro l'estremo di una sommatoria e Tab
  passa prima dai campi della frazione, poi continua con quelli della sommatoria.
- Se **selezioni del testo** e clicchi `\sqrt{}`, il testo finisce dentro la radice.
- Se inserisci un simbolo **fuori da una formula**, i `$` vengono aggiunti da soli.
- **Ricerca a parole** (italiano e inglese), anche incollando il simbolo: `∞`, `ℝ`, `→`.
- **Catalogo per categorie**: lettere greche, frazioni e potenze, operatori, relazioni,
  frecce, insiemi, logica, analisi, funzioni, parentesi, accenti, stili, matrici e sistemi,
  testo e spazi, chimica (`\ce{H2O}`). Oltre 470 simboli, con più di 600 varianti.
- **Assistente AI** (facoltativo) per le domande difficili, es. «freccia con scritto sopra
  n → ∞»: risponde con il codice LaTeX pronto da inserire.

**Appunti**
- Salvati automaticamente nel browser, con elenco, filtro e più note; con l'account, anche su
  tutti i tuoi dispositivi.
- **Cartelle** per organizzarli, per esempio una per corso: le note nuove finiscono nella
  cartella della nota aperta, e il pulsante accanto a ogni nota la sposta.
- Apri e salva file `.md` dal computer (su Chrome/Edge si risalva sullo stesso file).
- Anteprima affiancata con scorrimento sincronizzato; doppio clic sull'anteprima porta alla riga.
- Stampa / PDF dell'anteprima, backup di tutti gli appunti.
- Tema chiaro e scuro, funziona su telefono e tablet, **installabile come app** e usabile offline.

![Ricerca a parole](docs/ricerca.png)

## Provarlo sul tuo computer

Serve [Node.js](https://nodejs.org) 24 o successivo (il 22 funziona, ma `npm install` avvisa che il correttore
ortografico chiede il 24).

```bash
npm install
npm run dev
```

Poi apri l'indirizzo che compare nel terminale (di solito <http://localhost:5173>).

| Comando | Cosa fa |
| --- | --- |
| `npm run dev` | avvia l'app in sviluppo (si aggiorna da sola quando modifichi il codice) |
| `npm run build` | controlla i tipi e crea la versione da pubblicare in `dist/` |
| `npm run preview` | prova in locale la versione di `dist/` |
| `npm test` | esegue i test automatici |
| `npm run test:e2e` | prova il flusso principale in un browser vero (dopo `npm run build`) |

Per `npm run test:e2e` serve Chromium: `npx playwright-core install chromium`
(oppure indica un Chromium già installato con la variabile `CHROMIUM_PATH`).

## Come viene pubblicata

Il sito online è su **GitHub Pages** e si aggiorna da solo: ogni volta che cambia il branch
principale del repository, l'automazione `.github/workflows/deploy.yml` esegue i test,
compila l'app (`npm run build`) e copia la cartella `dist/` nel branch `gh-pages`, che è
quello pubblicato da GitHub Pages. Si può anche rilanciare a mano dalla scheda *Actions*.

`dist/` è un normale sito statico, quindi funziona anche su altri hosting gratuiti come
**Cloudflare Pages** o **Netlify** (comando di build `npm run build`, cartella `dist`).

## Assistente AI

La ricerca dei simboli è locale: funziona sempre, anche senza internet, ed è gratuita.
L'assistente AI serve solo per le domande che la ricerca non capisce e usa l'API di Claude:

1. crea una chiave API su <https://console.anthropic.com/settings/keys>;
2. in Glifo apri **Impostazioni → Assistente AI** e incollala;
3. nel pannello dei simboli scrivi la domanda e premi **Chiedi all'AI** (o Ctrl+Invio).

La chiave resta salvata **solo nel tuo browser** e viene inviata soltanto all'API di
Anthropic. Il modello predefinito è Claude Opus 5.5 (con ragionamento ridotto, per rispondere
in fretta); nelle impostazioni puoi scegliere Sonnet 5.5 o Haiku 4.5, più economici. Se la
richiesta viene rifiutata dai filtri di sicurezza, l'app chiede all'API di riprovare in
automatico con un altro modello (`fallbacks: "default"`).

Se pubblichi Glifo per altri studenti e non vuoi che ognuno usi la propria chiave, puoi
mettere la chiave in un piccolo server "proxy" (per esempio un Cloudflare Worker) e indicarne
l'indirizzo in **Impostazioni → Avanzate**.

## Compatibilità con VS Code

Gli appunti sono normali file `.md`: puoi aprirli in VS Code, Obsidian o su GitHub.
Il riconoscimento di `$ … $` e `$$ … $$` ricalca quello dell'anteprima Markdown di VS Code
(stesso motore, KaTeX). Le differenze:

- la chimica con `\ce{…}` (estensione mhchem) funziona in Glifo ma non nell'anteprima standard
  di VS Code;
- gli elenchi con lettere, numeri romani ed etichette (`a)`, `ii)`, `es)`) e il pallino `•` sono
  di Glifo: altrove si vedono come testo normale (`-`, `*`, `1.` e `1)` vanno bene ovunque);
- in Glifo il rientro serve agli elenchi: il codice si scrive tra ` ``` ` (i blocchi di codice
  fatti solo con quattro spazi di rientro non ci sono).

## Com'è fatto

Web app in **TypeScript** con [Vite](https://vite.dev), senza framework e senza server.

| Parte | Libreria |
| --- | --- |
| Editor | [CodeMirror 6](https://codemirror.net) con un'estensione per le formule |
| Formule | [KaTeX](https://katex.org) (+ mhchem per la chimica) |
| Anteprima Markdown | [markdown-it](https://github.com/markdown-it/markdown-it), highlight.js, DOMPurify |
| Controllo ortografico | [Hunspell](https://hunspell.github.io) in WebAssembly ([@farscrl/hunspell-wasm](https://github.com/farscrl/hunspell-wasm)) in un worker, dizionari [dictionary-it e dictionary-en](https://github.com/wooorm/dictionaries) |
| Assistente AI | SDK ufficiale di Anthropic (caricato solo quando serve) |
| Account e sincronizzazione | [Supabase](https://supabase.com): database Postgres e accesso via email, senza password (il client si carica solo se si accede) |
| App installabile | vite-plugin-pwa |

```
src/
  main.ts                 avvio dell'app e collegamento dei pezzi
  welcome.md              la nota di benvenuto
  symbols/                il "dizionario" dei simboli
    data/*.ts             i simboli, divisi per categoria
    template.ts           segnaposto (#) e anteprime (⋯)
  search/
    suggest.ts            suggerimenti mentre si scrive \…
    search.ts             ricerca a parole (italiano/inglese, sinonimi, errori di battitura)
  lists/markers.ts        i marcatori degli elenchi (1), a), ii), es), •…), per editor e anteprima
  editor/
    lists.ts              Invio, Tab, Maiusc+Tab e Backspace negli elenchi, menu dei tipi
    mathSyntax.ts         riconosce $…$ e $$…$$ nell'editor
    mathContext.ts        "il cursore è in una formula? che comando sto scrivendo?"
    placeholders.ts       i segnaposto raggiungibili con Tab
    insert.ts             inserimento dei simboli (aggiunge i $, usa la selezione…)
    suggestions.ts        stato dei suggerimenti (↑ ↓ Tab Esc)
    spellcheck.ts         sottolineatura delle parole sbagliate e correzioni
    editor.ts             configurazione di CodeMirror
  spell/
    words.ts              divide il testo in parole (salta indirizzi, codice, sigle…)
    engine.ts             Hunspell con i dizionari, glossario e dizionario personale
    glossary.ts           termini tecnici e cognomi che i dizionari non conoscono
    worker.ts, client.ts  il correttore gira in un worker, fuori dalla pagina
  render/
    mathDelims.ts         regole dei delimitatori (condivise da editor e anteprima)
    markdown.ts           Markdown → HTML sicuro
    lists.ts              elenchi con tutti i marcatori e rientri comodi nell'anteprima
    katex.ts              disegno delle formule, messaggi di errore in italiano
  ui/                     pannello dei simboli, anteprima, elenco appunti, finestre
  store/                  salvataggio nel browser, file .md, impostazioni
  ai/assistant.ts         assistente AI
  account/
    sync.ts               sincronizzazione: manda e scarica le modifiche, nei conflitti tiene tutte e due le versioni
    controller.ts         quando sincronizzare (avvio, ritorno su Glifo, rete, dopo le modifiche)
    space.ts              le note di ogni account in uno spazio a parte del browser
    supabase.ts           accesso con Google o via email (link o codice), eliminazione dell'account
    export.ts             il file di «Scarica i miei dati»
  host.ts                 integrazione facoltativa con claude.ai (per la demo pubblicata lì)
privacy.html              l'informativa sulla privacy (una seconda pagina, fuori dall'app)
tests/                    test automatici (Vitest), anche del database con le vere migrazioni (PGlite)
scripts/smoke-test.mjs    prova nel browser del flusso principale
scripts/account-test.mjs  prova nel browser dell'account, con un Supabase finto (fake-supabase.mjs)
supabase/                 il database degli account: tabelle, regole di accesso e i loro test
```

### Aggiungere un simbolo

I simboli stanno in `src/symbols/data/`. Ogni voce è una riga:

```ts
c(r`\iint`, 'integrale doppio', 'integrale doppio, doppio integrale, double integral', {
  u: '∬',                                       // carattere Unicode (per la ricerca)
  w: 5,                                         // popolarità da 0 a 10
  f: [r`\iint`, [r`\iint_{#}`, 'su un dominio']], // varianti: # = segnaposto
})
```

`npm test` controlla automaticamente che ogni simbolo e ogni variante siano formule valide
per KaTeX e che la ricerca continui a trovare le risposte giuste.

## Licenze

Il controllo ortografico usa [Hunspell](https://github.com/hunspell/hunspell) (MPL 1.1 / GPL 2 /
LGPL 2.1), il dizionario italiano di Andrea Pescetti e altri
([GPL 3](public/licenze/dizionario-italiano.txt), dal pacchetto `dictionary-it`) e quello
inglese di SCOWL ([MIT e BSD](public/licenze/dizionario-inglese.txt), dal pacchetto
`dictionary-en`). I testi delle licenze sono pubblicati anche insieme all'app, in `licenze/`.

## Idee per il futuro

Gli **account** ci sono, in prova. In programma: aprirli a tutti (anche con l'accesso con
Google), poi mandare note ad altri e cartelle condivise. I dettagli, con le altre idee, sono
in [ROADMAP.md](ROADMAP.md).
