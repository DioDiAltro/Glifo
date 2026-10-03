#!/bin/bash
# All'avvio di ogni sessione di Claude Code (anche nel cloud, dove il contenitore riparte da zero):
# installa graphify se manca, rimette gli hook git che rifanno il grafo a ogni commit e aggiorna il
# grafo del codice in graphify-out/. Lavora solo in locale, senza modelli AI: non costa token.
# I messaggi dei comandi vanno su stderr: lo stdout di questo hook finirebbe nel contesto di Claude.
set -uo pipefail

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}" || exit 0

# uv e pipx mettono i comandi in ~/.local/bin: serve nel PATH anche ai comandi della sessione.
case ":$PATH:" in
  *":$HOME/.local/bin:"*) ;;
  *)
    export PATH="$HOME/.local/bin:$PATH"
    if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
      echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$CLAUDE_ENV_FILE"
    fi
    ;;
esac

if ! command -v graphify >/dev/null 2>&1; then
  # La stessa versione della skill in .claude/skills/graphify, che `graphify install` aggiorna.
  versione=$(tr -d '[:space:]' < .claude/skills/graphify/.graphify_version 2>/dev/null)
  pacchetto="graphifyy${versione:+==$versione}"
  if command -v uv >/dev/null 2>&1; then
    uv tool install "$pacchetto" >&2
  elif command -v pipx >/dev/null 2>&1; then
    pipx install "$pacchetto" >&2
  fi
fi

if ! command -v graphify >/dev/null 2>&1; then
  echo "graphify non si è installato: in questa sessione i comandi graphify non funzionano e il grafo in graphify-out/ può essere vecchio."
  exit 0
fi

graphify hook install >&2
if ! GRAPHIFY_NO_TIPS=1 graphify update . >&2; then
  echo "graphify update non è riuscito: il grafo in graphify-out/ può essere vecchio."
fi
exit 0
