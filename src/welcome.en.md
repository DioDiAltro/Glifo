# Welcome to Glifo

Glifo is a note editor in **Markdown** for any subject: formulas in **LaTeX** (as in VS Code), code, tables, lists. On top of that there's the **symbols panel** here on the right, which previews symbols as you type them.

## Try it now

1. On the “Try here” line type `$\su`: the suggestions appear on the right, with their preview.
2. Click the **sum with limits** (or finish typing `\sum` and press **Tab**): `\sum_{}^{}` is inserted.
3. Type `n=0`, press **Tab** to move to the upper limit and type `\infty`.

Try here: 

Can't remember a command? Search for it in words in the panel (**Ctrl**+**K**): *“infinity symbol”* → `\infty`. After the backslash you can also type plain words: `\root`, `\infinity`, `\arrow`…

## How to write formulas

- Inline, between two `$`: the circle is $x^2 + y^2 = r^2$.
- As a block, between two `$$`, centered on a line of its own:

$$
\sum_{n=0}^{\infty} \frac{x^n}{n!} = e^x
$$

## A few examples

- Calculus: $\lim_{x \to 0} \frac{\sin x}{x} = 1$
- Statistics: $\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i$, with $X \sim \mathcal{N}(\mu, \sigma^2)$
- Physics: $\vec{F} = m \vec{a}$ and $\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}$
- Logic: $\forall \varepsilon > 0 \; \exists \delta > 0 : |x - x_0| < \delta \implies |f(x) - \ell| < \varepsilon$
- Matrix and system:

$$
A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}
\qquad
\begin{cases} x + y = 3 \\ x - y = 1 \end{cases}
$$

## Calculations and graphs

Write a formula ending in `=` and Glifo does the math, like Math Notes on the iPad: $\frac{3}{4} + \frac{1}{6} =$ — with the cursor right after the equals sign, **Tab** writes the result into the formula. Definitions written earlier apply: with $a = 3$ and $f(x) = x^2 - a$, here is $f(2) =$

For a graph there's the button with the axes in the bar (with the cursor on a function like $f(x)$ above, it plots that one), or a `grafico` block with one line for each thing to draw. Drag it to move the view; the + and − buttons zoom in and out, and the ↑ ↓ arrows next to them move it up or down in the note. Below it there's the **slider** for $a$: move it, or type a value in the box next to it, and the parabola changes, while 3 stays written here; ▶ moves it by itself.

```grafico
f(x)
y = 2x
P = (3, 6)
```

## For programming too

Code between three backticks gets colored (Java, Python, C, SQL…):

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Glifo!");
    }
}
```

## Lists

Each marker has its own meaning — `1)`, `a)`, `i)`, `-`, `•`… — and they can be nested. Press **Enter** to continue the list, **Tab** to go in and **Shift**+**Tab** to come back out:

1) Product rule
    a) $f(x) = x \sin x$
        i) $f'(x) = \sin x + x \cos x$, ii) it holds for every $x$
    - it extends to more factors
        a) three functions, b) $n$ functions
2) Quotient rule

All the kinds of list are also in the menu next to the list buttons, in the bar above the editor.

## Spell check

Misspelled words are underlined in red; formulas, code and links aren't checked. Click an underlined word (or press **Ctrl**+**.**) to fix it or add it to your dictionary. Try this one: recieve.

## Handy shortcuts

| Keys | What they do |
| --- | --- |
| **Tab** | inserts the suggestion · moves to the next placeholder |
| **↑** **↓** | choose among the suggestions |
| **Esc** | closes the suggestions |
| **Ctrl**+**K** | searches for a symbol in words |
| **Ctrl**+**M** | new formula `$…$` |
| **Ctrl**+**S** | saves the note as a `.md` file |
| **Ctrl**+**.** | fixes the word underlined in red |
| **Tab** · **Shift**+**Tab** | in a list: moves the line in · out |

- [x] Try the suggestions
- [ ] Create your first note with the **+** button
- [ ] Create a folder for each course (the folder button, above the list of notes)

> Your notes are saved in this browser. Now and then save them as `.md` files too (“Save .md” button): they're plain Markdown files you can open in VS Code, Obsidian or on GitHub.
