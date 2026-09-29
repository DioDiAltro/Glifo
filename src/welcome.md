# Benvenuto in Matherdown

Matherdown è un editor di appunti in **Markdown** con le formule in **LaTeX**, come in VS Code, ma con un aiuto in più: il **pannello dei simboli** qui a destra.

## Prova subito

1. Nella riga «Prova qui» scrivi `$\su` : a destra compaiono i suggerimenti con l'anteprima.
2. Clicca su **∑ con estremi** (oppure finisci di scrivere `\sum` e premi **Tab**): viene inserito `\sum_{}^{}`.
3. Scrivi `n=0`, premi **Tab** per passare all'estremo superiore e scrivi `\infty`.

Prova qui: 

Non ricordi un comando? Cercalo a parole nel pannello (**Ctrl**+**K**): *«come faccio il simbolo dell'infinito»* → `\infty`. Puoi anche scrivere in italiano dopo la barra: `\infinito`, `\radice`, `\freccia`, `\perogni`…

## Come si scrivono le formule

- Nel testo, tra due `$`: la circonferenza è $x^2 + y^2 = r^2$.
- A blocco, tra due `$$`, centrata su una riga a parte:

$$
\sum_{n=0}^{\infty} \frac{x^n}{n!} = e^x
$$

## Qualche esempio

- Limite notevole: $\lim_{x \to 0} \frac{\sin x}{x} = 1$
- Insiemi: $A \cup B = \{ x \mid x \in A \lor x \in B \}$
- Logica: $\forall \varepsilon > 0 \; \exists \delta > 0 : |x - x_0| < \delta \implies |f(x) - \ell| < \varepsilon$
- Matrice e sistema:

$$
A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}
\qquad
\begin{cases} x + y = 3 \\ x - y = 1 \end{cases}
$$

## Scorciatoie utili

| Tasti | Cosa fanno |
| --- | --- |
| **Tab** | inserisce il suggerimento · passa al segnaposto successivo |
| **↑** **↓** | scelgono tra i suggerimenti |
| **Esc** | chiude i suggerimenti |
| **Ctrl**+**K** | cerca un simbolo a parole |
| **Ctrl**+**M** | nuova formula `$…$` |
| **Ctrl**+**S** | salva la nota come file `.md` |

- [x] Prova i suggerimenti
- [ ] Crea la tua prima nota con il pulsante **+**

> Gli appunti restano salvati in questo browser. Ogni tanto salvali anche come file `.md` (pulsante «Salva .md»): sono normali file Markdown che puoi aprire in VS Code, Obsidian o su GitHub.
