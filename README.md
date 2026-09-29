# Matherdown

**Appunti universitari in Markdown, con le formule LaTeX che si scrivono da sole.**

Matherdown è un editor di appunti che funziona nel browser (e si può installare come app).
Si scrive in Markdown come in VS Code, con le formule in LaTeX tra `$ … $`, ma con un
**pannello laterale** che mostra l'anteprima dei simboli mentre li scrivi:

- scrivi `\su` → a destra compaiono `\sum`, `\sum_{}^{}`, `\sum_{}`… con l'anteprima
  (la sommatoria con i puntini sopra e sotto, per far capire dove vanno gli estremi);
- clicchi su quello giusto (o premi **Tab**) e il comando viene completato;
- con **Tab** salti da un segnaposto all'altro: `\sum_{n=0}^{\infty}` si scrive in pochi tasti;
- non ricordi il comando? Lo **cerchi a parole**: «come faccio il simbolo dell'infinito» → `\infty`.

![Suggerimenti mentre si scrive \su](docs/suggerimenti.png)

## Funzionalità

**Editor**
- Markdown completo: titoli, grassetto, corsivo, elenchi, liste di cose da fare, tabelle,
  citazioni, codice con evidenziazione, link, note a piè di pagina.
- Formule in linea `$ … $` e a blocco `$$ … $$` riconosciute con **le stesse regole
  dell'anteprima di VS Code**: i file restano compatibili (anche i blocchi ` ```math ` di GitHub).
- Colori per il TeX dentro le formule, `$`, graffe e parentesi che si chiudono da sole.
- Barra di formattazione e scorciatoie (Ctrl+B, Ctrl+I, Ctrl+M per una formula…).

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
- Salvati automaticamente nel browser, con elenco, filtro e più note.
- Apri e salva file `.md` dal computer (su Chrome/Edge si risalva sullo stesso file).
- Anteprima affiancata con scorrimento sincronizzato; doppio clic sull'anteprima porta alla riga.
- Stampa / PDF dell'anteprima, backup di tutti gli appunti.
- Tema chiaro e scuro, funziona su telefono e tablet, **installabile come app** e usabile offline.

![Ricerca a parole](docs/ricerca.png)

## Provarlo sul tuo computer

Serve [Node.js](https://nodejs.org) (versione 20.19 o successiva, oppure 22.12 o successiva).

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

## Metterlo online

`npm run build` produce un sito statico nella cartella `dist/`: non serve un server,
basta un qualunque hosting gratuito per siti statici, per esempio:

- **GitHub Pages**: carica `dist/` (anche con una GitHub Action) e attiva Pages nelle
  impostazioni del repository. I percorsi sono relativi, quindi funziona anche su
  `https://utente.github.io/matherdown/`.
- **Cloudflare Pages** o **Netlify**: comando di build `npm run build`, cartella `dist`.

Una volta online, dal browser si può **installare** (icona "Installa app" su Chrome/Edge,
"Aggiungi a Home" su iPhone/Android): si apre in una finestra sua e funziona anche offline.

## Assistente AI

La ricerca dei simboli è locale: funziona sempre, anche senza internet, ed è gratuita.
L'assistente AI serve solo per le domande che la ricerca non capisce e usa l'API di Claude:

1. crea una chiave API su <https://console.anthropic.com/settings/keys>;
2. in Matherdown apri **Impostazioni → Assistente AI** e incollala;
3. nel pannello dei simboli scrivi la domanda e premi **Chiedi all'AI** (o Ctrl+Invio).

La chiave resta salvata **solo nel tuo browser** e viene inviata soltanto all'API di
Anthropic. Il modello predefinito è Claude Opus 5.5 (con ragionamento ridotto, per rispondere
in fretta); nelle impostazioni puoi scegliere Sonnet 5.5 o Haiku 4.5, più economici. Se la
richiesta viene rifiutata dai filtri di sicurezza, l'app chiede all'API di riprovare in
automatico con un altro modello (`fallbacks: "default"`).

Se pubblichi Matherdown per altri studenti e non vuoi che ognuno usi la propria chiave, puoi
mettere la chiave in un piccolo server "proxy" (per esempio un Cloudflare Worker) e indicarne
l'indirizzo in **Impostazioni → Avanzate**.

## Compatibilità con VS Code

Gli appunti sono normali file `.md`: puoi aprirli in VS Code, Obsidian o su GitHub.
Il riconoscimento di `$ … $` e `$$ … $$` ricalca quello dell'anteprima Markdown di VS Code
(stesso motore, KaTeX). Unica eccezione: la chimica con `\ce{…}` (estensione mhchem) funziona
in Matherdown ma non nell'anteprima standard di VS Code.

## Com'è fatto

Web app in **TypeScript** con [Vite](https://vite.dev), senza framework e senza server.

| Parte | Libreria |
| --- | --- |
| Editor | [CodeMirror 6](https://codemirror.net) con un'estensione per le formule |
| Formule | [KaTeX](https://katex.org) (+ mhchem per la chimica) |
| Anteprima Markdown | [markdown-it](https://github.com/markdown-it/markdown-it), highlight.js, DOMPurify |
| Assistente AI | SDK ufficiale di Anthropic (caricato solo quando serve) |
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
  editor/
    mathSyntax.ts         riconosce $…$ e $$…$$ nell'editor
    mathContext.ts        "il cursore è in una formula? che comando sto scrivendo?"
    placeholders.ts       i segnaposto raggiungibili con Tab
    insert.ts             inserimento dei simboli (aggiunge i $, usa la selezione…)
    suggestions.ts        stato dei suggerimenti (↑ ↓ Tab Esc)
    editor.ts             configurazione di CodeMirror
  render/
    mathDelims.ts         regole dei delimitatori (condivise da editor e anteprima)
    markdown.ts           Markdown → HTML sicuro
    katex.ts              disegno delle formule, messaggi di errore in italiano
  ui/                     pannello dei simboli, anteprima, elenco appunti, finestre
  store/                  salvataggio nel browser, file .md, impostazioni
  ai/assistant.ts         assistente AI
  host.ts                 integrazione facoltativa con claude.ai (per la demo pubblicata lì)
tests/                    test automatici (Vitest)
scripts/smoke-test.mjs    prova nel browser del flusso principale
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

## Idee per il futuro

- Sincronizzazione degli appunti tra dispositivi (oggi restano nel browser o nei file `.md`).
- Aprire direttamente una cartella di appunti, con le immagini.
- Riconoscere un simbolo **disegnato a mano** (come Detexify).
- Anteprima delle formule direttamente dentro l'editor, alla Typora/Obsidian.
- Scorciatoie personali (es. `//` → `\frac{}{}`) e macro personalizzate.
- App desktop (Tauri) o estensione per VS Code con lo stesso pannello.
