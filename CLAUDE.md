# Glifo – note per Claude

Web app per prendere appunti universitari in Markdown con formule LaTeX (KaTeX) e un
pannello che suggerisce i simboli. Sito statico (Vite + TypeScript, senza framework),
installabile come app, pubblicato su GitHub Pages: non c'è un server.

- L'utente è uno studente italiano: rispondi in italiano. Interfaccia, commenti e
  messaggi di commit sono in italiano.
- Le funzioni da aggiungere sono in [ROADMAP.md](ROADMAP.md): quando si chiede
  «cosa facciamo adesso?» si parte da lì. Aggiornalo quando una voce è fatta o se ne
  aggiunge una.

## Comandi

- `npm run dev`: server di sviluppo.
- `npm test`: test con Vitest. `npm run build`: controllo dei tipi e build in `dist/`.
- `npm run test:e2e`: prova nel browser sulla build in `dist/` (esegui prima
  `npm run build`). Serve Chromium: indica il percorso con `CHROMIUM_PATH`
  (nelle sessioni cloud `/opt/pw-browsers/chromium`).
- `GLIFO_NO_PWA=1 npx vite build`: build senza service worker (per la demo su claude.ai).

## Dove sono le cose

- `src/symbols/`: catalogo dei simboli; per aggiungerne uno vedi «Aggiungere un
  simbolo» nel README.
- `src/search/`: ricerca a parole in italiano e suggerimenti mentre si scrive `\…`.
- `src/editor/`: editor CodeMirror 6 (formule, segnaposto, suggerimenti, `spellcheck.ts`).
- `src/spell/`: controllo ortografico (Hunspell in WebAssembly in un worker, dizionari
  `dictionary-it` e `dictionary-en`, glossario tecnico in `glossary.ts`).
- `src/render/`: KaTeX e anteprima Markdown, con le stesse regole di VS Code per `$…$`.
- `src/ui/`: interfaccia. `src/store/`: note e impostazioni nel browser (chiavi `glifo.*`).
- `src/ai/`: assistente AI. `src/host.ts`: funzioni della demo dentro claude.ai.

## Regole

- Ogni push sul branch predefinito esegue test e build e pubblica il sito
  (`.github/workflows/deploy.yml` → branch `gh-pages`).
- Prima di un push: `npm test` e `npm run build`; se cambiano editor o interfaccia
  anche `npm run test:e2e`. Aggiungi un test per ogni bug corretto.
- L'app deve continuare a funzionare senza connessione.
