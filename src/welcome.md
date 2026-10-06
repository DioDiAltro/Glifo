# Benvenuto in Glifo

Glifo è un editor di appunti in **Markdown** per qualsiasi materia: formule in **LaTeX** (come in VS Code), codice, tabelle, liste. In più c'è il **pannello dei simboli** qui a destra, che ti mostra l'anteprima dei simboli mentre li scrivi.

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

- Analisi: $\lim_{x \to 0} \frac{\sin x}{x} = 1$
- Statistica: $\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i$, con $X \sim \mathcal{N}(\mu, \sigma^2)$
- Fisica: $\vec{F} = m \vec{a}$ e $\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}$
- Logica: $\forall \varepsilon > 0 \; \exists \delta > 0 : |x - x_0| < \delta \implies |f(x) - \ell| < \varepsilon$
- Matrice e sistema:

$$
A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}
\qquad
\begin{cases} x + y = 3 \\ x - y = 1 \end{cases}
$$

## Calcoli e grafici

Scrivi una formula che finisce con `=` e Glifo fa il conto, come le Note matematiche dell'iPad: $\frac{3}{4} + \frac{1}{6} =$ — con il cursore subito dopo l'uguale, **Tab** scrive il risultato nella formula. Valgono le definizioni scritte prima: con $a = 3$ e $f(x) = x^2 - a$, ecco $f(2) =$

Per un grafico c'è il pulsante con gli assi nella barra (con il cursore su una funzione come $f(x)$ qui sopra, disegna quella), oppure un blocco `grafico` con una riga per ogni cosa da disegnare. Trascinalo per spostare la vista; i pulsanti + e − lo ingrandiscono, e le frecce ↑ ↓ accanto a loro lo spostano più su o più giù nella nota. Sotto c'è lo **slider** di $a$: muovilo, o scrivi un valore nella casella accanto, e la parabola cambia, mentre qui resta scritto 3; ▶ lo muove da solo.

```grafico
f(x)
y = 2x
P = (3, 6)
```

## Anche per programmare

Il codice tra tre apici inversi viene colorato (Java, Python, C, SQL…):

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Ciao da Glifo!");
    }
}
```

## Elenchi

Ogni marcatore ha il suo significato — `1)`, `a)`, `i)`, `es)`, `-`, `•`… — e si possono mettere uno dentro l'altro. Premi **Invio** per continuare l'elenco, **Tab** per andare dentro e **Maiusc**+**Tab** per tornare fuori:

1) Derivata del prodotto
    es) $f(x) = x \sin x$
        i) $f'(x) = \sin x + x \cos x$, ii) vale per ogni $x$
    - si generalizza a più fattori
        a) tre funzioni, b) $n$ funzioni
2) Derivata del quoziente

Tutti i tipi di elenco sono anche nel menu accanto ai pulsanti degli elenchi, nella barra sopra l'editor.

## Controllo ortografico

Le parole scritte male vengono sottolineate in rosso; formule, codice e link non vengono controllati. Clicca su una parola sottolineata (o premi **Ctrl**+**.**) per correggerla o aggiungerla al tuo dizionario. Prova con questa: perchè.

## Scorciatoie utili

| Tasti | Cosa fanno |
| --- | --- |
| **Tab** | inserisce il suggerimento · passa al segnaposto successivo |
| **↑** **↓** | scelgono tra i suggerimenti |
| **Esc** | chiude i suggerimenti |
| **Ctrl**+**K** | cerca un simbolo a parole |
| **Ctrl**+**M** | nuova formula `$…$` |
| **Ctrl**+**S** | salva la nota come file `.md` |
| **Ctrl**+**.** | corregge la parola sottolineata in rosso |
| **Tab** · **Maiusc**+**Tab** | in un elenco: sposta la riga dentro · fuori |

- [x] Prova i suggerimenti
- [ ] Crea la tua prima nota con il pulsante **+**
- [ ] Crea una cartella per ogni corso (pulsante con la cartella, sopra l'elenco degli appunti)

> Gli appunti restano salvati in questo browser. Ogni tanto salvali anche come file `.md` (pulsante «Salva .md»): sono normali file Markdown che puoi aprire in VS Code, Obsidian o su GitHub.
