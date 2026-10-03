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
- le parole scritte male vengono **sottolineate in rosso** (formule e codice no): un clic e le correggi;
- una formula che finisce con `=` ha già il **risultato**, come nelle Note matematiche dell'iPad, e un
  blocco `grafico` **disegna le funzioni**.

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

**Calcoli e grafici** (come le Note matematiche della Calcolatrice dell'iPad)
- Una formula che finisce con `=` mostra il **risultato**: nell'editor accanto all'uguale, più chiaro,
  e nell'anteprima colorato. Con il cursore subito dopo l'uguale **Tab** (o un clic) lo scrive nella
  formula; finché non lo si scrive non è nel testo, quindi cambia da solo se cambiano i numeri.
  Per una formula che finisce con l'uguale ma non vuole il risultato basta `={}`.
- Le formule si leggono dall'alto in basso: `$a = 2$` e `$f(x) = x^2 - a$` valgono per quelle sotto,
  e `$f(3) =$` dà 7. Anche `a := 2`, più definizioni in una formula (`$a = 2, \quad b = 3$`) e
  `$a = 3 + 4 =$` (mostra 7 e definisce a).
- I risultati come in un quaderno: frazioni esatte (`$\frac{1}{3} + \frac{1}{6} =$` dà ½), decimali
  con la virgola (`0{,}1 + 0{,}2` dà 0,3, non 0,30000000000000004), i puntini quando le cifre
  continuano (√2 = 1,414213…), le potenze di 10 per i numeri molto grandi o piccoli.
- Si calcolano le quattro operazioni, potenze e radici, `\sin`, `\cos`, `\tan` e le inverse,
  `\ln`, `\log` (naturale, come in Analisi; `\log_{10}` e `\lg` per la base 10), `\exp`, valore
  assoluto, parte intera, fattoriale, `\binom`, percentuali, gradi (`30^\circ`), somme e prodotti
  (`\sum_{k=1}^{10} k^2`), integrali definiti (`\int_0^1 x^2 \, dx`, anche con ±∞), derivate delle
  funzioni definite (`f'(2)`, `f''(2)`) e funzioni a tratti con `\begin{cases}`. Si scrivono in LaTeX
  ma anche come in una calcolatrice: `sqrt(x)`, `sin(x)`, `2*x`, `pi`; e con i nomi italiani (`\tg`,
  `\arctg`, `\operatorname{sen}`, `settsinh`).
- **Numeri complessi** con la `i`: `$(1 + 2i)(3 - i) =$` dà 5 + 5i, `$\frac{1}{1 + i} =$` dà ½ − ½i (con
  le frazioni i conti restano esatti), `$e^{i\pi} =$` dà −1. Modulo `|z|`, argomento `\arg z` (tra −π e
  π, scritto come multiplo di π quando lo è), parte reale e immaginaria (`\Re z`, `\Im z`, anche
  `\operatorname{Re}`), coniugato (`\bar{z}`, `\overline{1 + i}`), potenze, esponenziale, logaritmo e
  funzioni trigonometriche. Una radice da sola dà **tutte le radici** (`$\sqrt[3]{8i} =$` dà le tre
  radici cubiche); dentro un'espressione vale la principale. Un numero definito (`$z = 1 + 2i$`) e le
  funzioni (`$f(z) = z^2 + 1$`) si usano dopo; una formula senza valore reale (`\sqrt{-4}`, `\ln(-1)`)
  ha il suo valore complesso.
- **Vettori e matrici**: le matrici con `\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}` (anche `bmatrix`;
  `vmatrix` è il determinante), i vettori come `(1, 2, 3)` o in colonna. Somme e prodotti (`A B`, `2A`,
  `A v`), trasposta (`A^T`, `A^\top`), inversa (`A^{-1}`, con le frazioni esatte), potenze, determinante
  (`\det A`, `|A|`), rango (`\operatorname{rank}`, `\operatorname{rg}`), traccia (`\operatorname{tr}`),
  riduzione a scala (`\operatorname{rref}`), nucleo e immagine (`\ker A`, `\operatorname{Im} A`, come span
  di una base, e `\dim \ker A`), prodotto scalare (`u \cdot v`, `\langle u, v \rangle`) e vettoriale
  (`u \times v`), norma (`\|v\|`), **autovalori** e **autovettori** (`\operatorname{autovalori}(A) =`,
  `\operatorname{autovettori}(A) =`, anche complessi e con la molteplicità) e il polinomio caratteristico
  (`\det(A - \lambda I) =`). I risultati con le matrici si vedono disegnati anche nell'editor.
- **Geometria**, con i punti scritti prima (`$A = (0, 0)$`, `$B = (4, 0)$`, anche con tre coordinate):
  lunghezze (`\overline{AB} =`, `d(A, B) =`, con le radici esatte: √2 ≈ 1,414213…), il vettore da A a B
  (`\overrightarrow{AB}`, `\vec{AB}`), punto medio e baricentro (`\operatorname{medio}(A, B)`,
  `\operatorname{baricentro}(A, B, C)`), la retta per due punti (`\operatorname{retta}(A, B) =` dà
  `y = 2x`; anche `\overleftrightarrow{AB}`; nello spazio in forma parametrica), triangoli e poligoni con
  area e perimetro (`\triangle ABC =`, `\operatorname{area}(A, B, C)`, `\operatorname{poligono}(A, B, C, D)`,
  `\operatorname{perimetro}(\triangle ABC)`), angoli in gradi (`\widehat{BAC} =`, `\angle ABC`, e
  `\operatorname{angolo}(u, v)` tra due vettori), circonferenze con centro e raggio o per tre punti
  (`\operatorname{circonferenza}(O, 3) =` dà `(x − 1)² + (y − 2)² = 9`), il piano per tre punti
  (`\operatorname{piano}(A, B, C) =`), le distanze di un punto da una retta e da un piano (`d(P, r) =`) e
  le intersezioni di rette, circonferenze e piani (`\operatorname{intersezione}(r, c) =`, con le radici
  esatte: `(−√2, −√2); (√2, √2)`). Le figure con un nome (`r = \operatorname{retta}(A, B)`) si usano dopo.
- **Derivate scritte come formula**: con `$f(x) = \frac{x^2 - 1}{x + 2}$`, `$f'(x) =$` dà
  `(x² + 4x + 1)/(x + 2)²` (le frazioni con un denominatore solo, i polinomi dal grado più alto, i fattori
  comuni raccolti: `(1 − x)e^{−x}`); anche `f''(x)`, `\frac{d}{dx} \sin x \cos x =`, `\frac{d^2}{dx^2}`, la
  funzione integrale (`F(x) = \int_0^x e^{-t^2} \, dt` dà `F'(x) = e^{−x²}`) e, in un punto, `f'(2) =`. Le
  **derivate parziali** si scrivono `\frac{\partial f}{\partial x}`, `\frac{\partial^2 f}{\partial x \partial y}`,
  `\partial_x f`, anche in un punto (`\frac{\partial f}{\partial x}(1, 2) =`). Con i campi: il **gradiente**
  (`\nabla f`, `\operatorname{grad} f`), la **divergenza** (`\nabla \cdot F`, `\operatorname{div} F`), il **rotore**
  (`\nabla \times F`, `\operatorname{rot} F`; nel piano è un numero), il laplaciano (`\nabla^2 f`), l'hessiana
  (`\operatorname{Hess} f`, anche `\det \operatorname{Hess} f(1, 1) =`) e la jacobiana (`\operatorname{jac} F`).
  I risultati con le lettere si vedono disegnati anche nell'editor; Tab li scrive nella formula.
- **Campi, curve e superfici** con il nome: `$F(x, y) = (-y, x)$`, `$\gamma(t) = (\cos t, \sin t), \; t \in [0, 2\pi]$`
  (l'intervallo del parametro dopo la virgola), `$S(u, v) = (…), \; u \in [0, 2\pi], \; v \in [0, \pi]$`;
  `F(1, 2) =` dà il vettore. Gli **integrali di linea**: di una funzione (`\int_\gamma f \, ds`, con `1` la
  lunghezza), di un campo (il lavoro: `\oint_\gamma F \cdot dr`, anche `\int_\gamma \nabla f \cdot dr`) o di una
  forma (`\oint_\gamma (-y \, dx + x \, dy)`). Gli **integrali di superficie**: `\iint_S f \, dS` (con `1` l'area)
  e il flusso `\iint_S F \cdot d\mathbf{S}` (o `F \cdot n \, dS`), con la normale S_u × S_v; su una superficie chiusa
  (`\oiint_S`) sempre verso fuori.
- **Limiti**: `\lim_{x \to 0} \frac{\sin x}{x} =` dà 1, anche da una parte sola (`x \to 0^+`, `x \to 0^-`) e
  all'infinito (`x \to +\infty`). Le forme 0/0 si fanno con le derivate esatte (de l'Hôpital:
  `\frac{\tan x - x}{x^3}` dà 1/3), le altre con i numeri, e il valore si riconosce quando è una frazione, una
  radice o un multiplo di π, π², e, ln 2 (`(1 + \frac{1}{x})^x` dà e ≈ 2,718281…). Se va all'infinito il
  risultato è +∞ o −∞; se non c'è, «non esiste», con i due valori quando da sinistra e da destra vengono
  diversi (`\frac{|x|}{x}`). Con n (o k, m) che va all'infinito è una successione:
  `\lim_{n \to \infty} \frac{n!}{n^n} =` dà 0, `(-1)^n` non ha limite.
- **Serie** fino a ∞: `\sum_{n=1}^{\infty} \frac{1}{n^2} =` dà π²/6 ≈ 1,644934…, `\frac{(-1)^{n+1}}{n}` dà ln 2,
  `\frac{1}{n!}` (da 0) dà e; quelle che divergono +∞ (`\frac{1}{n}`), quelle che oscillano «non esiste».
- **Polinomi di Taylor**: `\operatorname{taylor}(\sin x, 0, 5) =` dà x − x³/6 + x⁵/120 (dalla potenza più
  bassa, come nei libri), anche in un altro punto (`\operatorname{taylor}(\ln x, 1, 3)`) e delle funzioni
  della nota; `\operatorname{maclaurin}(\cos x, 4)` è quello in 0. Con un nome
  (`T(x) = \operatorname{taylor}(\sin x, 0, 3)`) si usa dopo, anche nei grafici.
- **Primitive** (integrali indefiniti): `\int x e^x \, dx =` dà (x − 1)eˣ + c, come a lezione: gli integrali
  immediati, per sostituzione (`\int x e^{x^2} \, dx`, `\int \frac{\ln x}{x} \, dx`, anche `\int \sin(\ln x) \, dx`),
  per parti (`x^2 \cos x`, `\ln x`, `\arctan x`, `e^x \sin x`), le funzioni razionali con i fratti semplici
  (`\frac{1}{x^2 - 1}` dà ½ ln|(x − 1)/(x + 1)|), le potenze di seno e coseno (`\sin^4 x`), le radici
  (`\sqrt{1 - x^2}`, `x \sqrt{x + 1}`), anche con il dx nella frazione (`\int \frac{dx}{1 + x^2}`). Ogni
  primitiva si controlla derivandola; quelle che non si scrivono con le funzioni elementari (`e^{-x^2}`,
  `\frac{\sin x}{x}`) non hanno risultato. La costante è c (k se la c c'è già); con un nome
  (`F(x) = \int x e^x \, dx`) la primitiva si usa dopo, anche nei grafici.
- **Integrali definiti esatti**: con la primitiva il valore esatto (`\int_0^1 \frac{dx}{1 + x^2} =` dà
  π/4 ≈ 0,785398…, `\int_0^1 \arctan x \, dx` dà π/4 − ln(2)/2), anche **impropri** (`\int_1^{\infty} \frac{dx}{x^2} =`
  dà 1, `\int_0^1 \frac{dx}{x}` dà +∞: diverge); con una lettera negli estremi la funzione integrale
  (`\int_0^x t^2 \, dt =` dà x³/3). Se la primitiva non si trova resta il valore con i numeri.
- **Studio di funzione**: `\operatorname{studio}(f) =` (con f definita prima, o la funzione stessa:
  `\operatorname{studio}(x e^{-x}) =`) fa lo studio come a lezione, una parte per riga: dominio, simmetria
  (pari o dispari), periodo, intersezioni con gli assi, segno, limiti agli estremi del dominio, asintoti
  (verticali, orizzontali e obliqui), la derivata con la crescenza e i massimi e minimi (anche i punti
  angolosi e le cuspidi), la derivata seconda con la concavità e i flessi (anche a tangente orizzontale o verticale). I
  punti sono esatti quando si può (massimo (1; e⁻¹)); le funzioni periodiche si studiano in un periodo
  (`\tan x` in [0, π], con x ≠ π/2 + kπ). Una parte sola: `\operatorname{dominio}(\ln(4 - x^2)) =` dà
  −2 < x < 2, e così `\operatorname{asintoti}`, `\operatorname{estremi}`, `\operatorname{flessi}`,
  `\operatorname{zeri}`.
- **Equazioni, disequazioni e sistemi risolti**: con `\Rightarrow` (o `\implies`, ⇒) in fondo.
  `x^2 - 5x + 6 = 0 \Rightarrow` dà x = 2 ∨ x = 3, `x^2 - x - 1 = 0` dà x = (1 ± √5)/2, `x^2 - 4x + 4 = 0`
  x = 2 (doppia); senza soluzioni reali dice quelle complesse. Le goniometriche con il periodo
  (`\sin x = \frac{1}{2}` dà x = π/6 + 2kπ ∨ x = 5π/6 + 2kπ), le esponenziali e le logaritmiche con il valore
  esatto (`e^x = 2` dà x = ln 2), le altre con i numeri (`\cos x = x`). Le **disequazioni** danno gli
  intervalli (`\frac{x - 1}{x + 2} \ge 0 \Rightarrow` dà x < −2 ∨ x ≥ 1; `(x - 1)^2 > 0` dà x ≠ 1). I
  **sistemi** con le virgole o in `\begin{cases}`: lineari, con le frazioni esatte (anche con infinite
  soluzioni, «y qualsiasi», o impossibili), e non lineari
  (`\begin{cases} x^2 + y^2 = 25 \\ x - y = 1 \end{cases}` dà (x, y) = (−3, −4) ∨ (x, y) = (4, 3)).
- **Equazioni differenziali**: `$y' = x - y, \; y(0) = 1$` fa di y la soluzione (calcolata con i numeri,
  con Runge–Kutta): dopo, `$y(2) =$` dà 1,270670…, e y si usa come le altre funzioni (derivate,
  integrali, grafici). Anche di ordine più alto, con le condizioni su y', y'' nello stesso punto
  (`y'' + 2y' + 5y = 0, \; y(0) = 1, \; y'(0) = 0`), scritte in qualsiasi modo se la derivata più alta è al
  primo grado; con x come funzione la variabile è il tempo t (`x'' = -x`).
- **Integrali doppi e tripli**, con il dominio sotto: disuguaglianze (`\iint_{x^2 + y^2 \le 1} (x^2 + y^2) \, dA =`,
  `\iiint_{x^2 + y^2 \le 1, 0 \le z \le 2} dV =`), rettangoli (`\iint_{[0, 1] \times [0, 2]} x y \, dx \, dy =`,
  `[0, 1]^3`) o il nome di un insieme scritto prima (`$D = \{(x, y) : 0 \le y \le x \le 1\}$` e poi
  `\iint_D x y \, dA =`); oppure uno dentro l'altro con gli estremi (`\int_0^1 \int_0^x x y \, dy \, dx =`),
  anche in coordinate polari (`\int_0^{2\pi} \int_0^1 r \, dr \, d\theta`) e sferiche. I differenziali sono
  `dx \, dy`, `dA`, `dV` o `d(x, y)`. Il risultato ha qualche cifra in meno degli integrali semplici
  (sono quelle sicure).
- Il pulsante con gli **assi** nella barra mette nella nota un **grafico**: con il cursore su una
  funzione (`$f(x) = …$`) disegna quella, su un integrale (`$\int_0^2 x^2 \, dx =$`) la sua area (e
  così le curve di livello, i polinomi di Taylor, le primitive, gli studi di funzione, le equazioni differenziali), se no prepara il blocco
  da scrivere. Il grafico della formula sotto il cursore si vede anche nel
  pannello a destra, con «Inserisci il grafico».
- Il blocco ` ```grafico ` ha una riga per ogni cosa da disegnare: funzioni (`y = x^2`, `f(x) = \frac{1}{x}`,
  o solo `x^2`), anche dove vale una condizione (`y = \sqrt{x}, 0 \le x \le 4`), rette verticali
  (`x = 2`), curve qualsiasi (`x^2 + y^2 = 4`), in coordinate polari (`r = 1 + \cos\theta`) o con un
  parametro (`(\cos t, \sin t)`), punti (`P = (1, 2)`, anche `(0,5; 2)`), numeri da usare
  (`a = 2`) e la parte da mostrare (`x \in [-5, 5]`, `-1 \le y \le 3`). Usa anche le definizioni della
  nota scritte prima; `%` comincia un commento.
- Un **integrale** definito nel blocco (`\int_0^2 x^2 \, dx`, anche `\int_0^2 f(x) \, dx`, fino a
  `\infty`, o con un nome: `A = \int_0^2 x^2 \, dx`) colora l'**area** tra la curva e l'asse x, da un
  estremo all'altro, e la legenda dice quanto vale (`= 2,666666…`). Le parti sotto l'asse contano con
  il meno, come nell'integrale. Se la curva è già nel grafico (`y = x^2` o `f(x) = x^2` in un'altra
  riga) l'area prende il suo colore; se no il grafico disegna anche la curva. Gli estremi possono
  essere numeri con lo slider (`\int_0^b`): muovendolo l'area cambia. Si può lasciare l'uguale
  finale o il risultato copiato dalla nota.
- Uno **studio di funzione** nel blocco (`\operatorname{studio}(f)`, anche dopo `f(x) = …` in un'altra riga)
  disegna la funzione con gli **asintoti tratteggiati** e i punti notevoli con il nome: i massimi M, i
  minimi m e i flessi F (M₁, M₂… se sono più di uno); `\operatorname{asintoti}(f)` solo gli asintoti,
  `\operatorname{estremi}(f)`, `\operatorname{flessi}(f)` e `\operatorname{zeri}(f)` solo quei punti.
- Le **disuguaglianze** colorano una **zona**: `y > x^2`, `x^2 + y^2 \le 4`, `y \le 4 - x^2, y \ge 0`; il
  bordo è tratteggiato dove non ne fa parte (con < e >). Anche gli **insiemi**
  (`D = \{(x, y) : 0 \le x \le 1, x^2 \le y \le x\}`, o il nome di uno della nota) e i **domini degli
  integrali doppi**, con il valore nella legenda (`\iint_D 1 \, dA = 0,166666…`; scritto in r e θ, il
  dominio si disegna dove sta nel piano). Con la z sono **solidi**: `x^2 + y^2 + z^2 \le 1`, gli insiemi con
  tre variabili, il dominio di un integrale triplo (anche in coordinate cilindriche e sferiche), e un
  integrale doppio con una funzione di x e y diventa il **volume sotto la superficie** (sotto lo zero
  dove la funzione è negativa). Gli spigoli restano netti: ogni condizione disegna la sua faccia.
  Un solido che la scatola taglia (`z \ge 0`) con altre cose nel grafico è velato, per non coprirle.
- Con i numeri complessi il grafico è il **piano di Gauss** (assi Re e Im, le tacche verticali con la
  i): un numero è una freccia dall'origine (`1 + 2i`, `w = e^{i\pi/3}`, i numeri della nota come `z_1`),
  con nella legenda la forma algebrica ed esponenziale (`1 + i = \sqrt{2}\,e^{i\pi/4}`, che si vede
  anche nel pannello a destra); le radici (`\sqrt[6]{-64}`) e le soluzioni di un'equazione (`z^3 = 8i`)
  sono punti; un'equazione con i lati reali è una curva (`|z - i| = 2`, `\Re z = 1`,
  `\arg z = \frac{\pi}{4}`), una disuguaglianza una zona (`|z| \le 2`, `1 < |z - 1| \le 2`), come gli
  insiemi `\{z \in \mathbb{C} : …\}`; con il parametro t una curva (`2e^{it}`).
- Con la **z** (o una funzione di x e y, o un punto con tre coordinate) il grafico è in **3D**:
  superfici sopra il piano xy (`z = x^2 + y^2`, `f(x, y) = \sin x \cos y`, o solo `x^2 - y^2`),
  superfici date da un'equazione (`x^2 + y^2 + z^2 = 4`, il cilindro `x^2 + y^2 = 1`) e piani
  (`x + y + z = 1`, `z = 2`), superfici con due parametri (`(u \cos v, u \sin v, u)`: u e v, s e t,
  θ e φ…; gli angoli fanno un giro, φ mezzo, gli altri vanno da 0 a 1, o come dice `u \in [0, 2]`),
  curve nello spazio (`(\cos t, \sin t, t)`), punti (`P = (1, 2, 3)`) e vettori
  (`\vec{v} = (1, 2, 2)`). Si gira **trascinandolo** (anche con un dito), + e − lo avvicinano e lo
  allontanano, la freccia lo riporta com'era. I piani sono velati e tagliano le superfici nel punto
  giusto; gli slider funzionano come nel piano. La z è la terza coordinata, a meno che la nota non la
  definisca come numero (`$z = 2$`).
- Anche nel piano i **vettori** sono frecce dall'origine (`\vec{v} = (2, 1)`, o con il nome minuscolo,
  `v = (2, 1)`; con la maiuscola, `P = (2, 1)`, è un punto), anche quelli della nota e i loro conti
  (`u + v`, `A u`, con le componenti nella legenda), e una curva con il
  parametro di primo grado (`(1 + t, 2t)`) è una retta intera, da un bordo all'altro (con
  `t \in [0, 1]` solo quel pezzo).
- I **campi di vettori** si disegnano con una freccia in ogni punto (`F(x, y) = (-y, x)`, o solo `(-y, x)`, o il
  gradiente `\nabla f`; con tre componenti in 3D), le curve con il nome con la **freccia del verso**
  (`\gamma(t) = (\cos t, \sin t), \; t \in [0, 2\pi]`, anche nello spazio) e le superfici con il nome (`S(u, v)`).
  Un integrale di linea disegna la curva e il campo, con il lavoro nella legenda (`\oint_\gamma F \cdot dr = 6,283185…`);
  uno di superficie la superficie e le frecce del campo, con il flusso.
- Le **curve di livello** di una funzione di x e y (`\operatorname{livelli}(x^2 + 2y^2)`, o
  `\operatorname{livelli}(f)` con una f della nota o del blocco), con i valori scritti sulle curve (numeri
  tondi scelti da Glifo); con `\nabla f` nello stesso grafico si vede il gradiente perpendicolare ai livelli.
- Un'**equazione differenziale** del primo ordine disegna il **campo di direzioni** (un trattino con la
  pendenza in ogni punto) e, con le condizioni iniziali (`y' = x - y, \; y(0) = 1, \; y(0) = -2`), le
  soluzioni che partono da lì; una di ordine più alto (`y'' = -y, \; y(0) = 0, \; y'(0) = 1`) la soluzione,
  una per ogni gruppo di condizioni. Un **polinomio di Taylor** da solo (`\operatorname{taylor}(\sin x, 0, 5)`)
  si disegna insieme alla funzione da cui viene, per confrontarli (se un'altra riga non la disegna già); una
  **primitiva** (`\int \cos x \, dx`) si disegna con c = 0.
- Le figure della **geometria** si disegnano come si scrivono: punti con il nome (`A = (0, 0)`,
  `M = \operatorname{medio}(B, C)`), segmenti (`\overline{AM}`), triangoli e poligoni colorati
  (`\triangle ABC`), angoli con l'arco e l'ampiezza (`\widehat{BAC}`; quello retto con il quadratino),
  rette per due punti, circonferenze, i punti dove si incontrano (`\operatorname{intersezione}(r, c)`) e,
  con tre coordinate, piani e triangoli nello spazio. La legenda dice le misure (l'area, la lunghezza,
  l'equazione); i punti della nota che una figura usa si disegnano anche loro, e i nomi dei vertici
  stanno fuori dalla figura, lontano dai numeri degli assi.
- Glifo sceglie da solo la parte da mostrare (dove la funzione si annulla, ha massimi e minimi, gli
  asintoti; per seni e coseni due giri con le tacche in π; le circonferenze restano rotonde), stacca
  la curva dove salta e segna gli **asintoti verticali** tratteggiati. Assi con la freccia, i numeri
  con la virgola, l'origine O, la legenda con le formule e, per le righe sbagliate, il perché.
- Nell'anteprima il grafico si **trascina**, si ingrandisce con + e − (o con Ctrl e la rotellina,
  o con due dita) e, passandoci sopra con il mouse, dice le **coordinate** del punto della curva.
- Ogni numero scritto con le cifre che il grafico usa (`$a = 2$` nella nota o `a = 2` nel blocco,
  anche attraverso una funzione come `$f(x) = a x^2$`; non `b = 2a`, che segue a) ha uno **slider**
  sotto il grafico: trascinandolo il grafico cambia subito, ▶ lo muove da solo avanti e indietro, la
  freccia torna al valore scritto. Il valore si può anche **scrivere** nella casella accanto (`1,5`,
  `1/3`, `\pi/2`; Invio lo conferma, Esc torna a prima): un valore fuori dallo slider lo allarga.
  Va da −10 a 10 (di 1 in 1 se conta i termini di una somma, come `n` in `\sum_{k=0}^{n}`);
  `a \in [0, 5]` nel blocco dice da dove a dove. La nota non cambia: il file .md e la stampa usano
  i valori scritti. Se una lettera non è definita (`y = kx + 1` senza `k`), accanto all'errore c'è
  «Aggiungi lo slider per k», che scrive `k = 1` nel blocco.
- Con **Salva .md** ogni grafico diventa un'immagine (con il testo del blocco nascosto sotto), come
  gli schemi; riaprendo il file con **Apri .md** torna un blocco da modificare. Funziona offline:
  è tutto scritto per Glifo, senza librerie esterne.

![Risultati dopo «=» e grafici nell'anteprima](docs/grafici.png)

![Grafici 3D: la sella tagliata da un piano e una sfera tagliata da un piano](docs/grafici-3d.png)

![Integrali doppi e tripli: il dominio nel piano, il volume sotto la superficie e un solido in coordinate sferiche](docs/integrali-multipli.png)

![Numeri complessi: i conti nella nota e il piano di Gauss con frecce, radici e zone](docs/numeri-complessi.png)

![Matrici e vettori: inversa, autovalori, autovettori e polinomio caratteristico, e i vettori come frecce](docs/matrici.png)

![Geometria: lunghezze, area, angoli, rette e circonferenze nella nota, e il triangolo con l'angolo e la mediana nel grafico](docs/geometria.png)

![Derivate e campi: la derivata di un quoziente, gradiente, derivata mista, lavoro e rotore nella nota; il campo con le frecce e la curva con il verso nel grafico](docs/campi.png)

![Analisi: un limite, una serie, un polinomio di Taylor, un'equazione e una disequazione risolte e un'equazione differenziale nella nota; il campo di direzioni con le soluzioni nell'anteprima e, nel pannello, il polinomio di Taylor con la sua funzione](docs/analisi.png)

![Integrali: primitive per parti, con i fratti semplici e per sostituzione, integrali definiti esatti e impropri nella nota; il coseno e la sua primitiva nell'anteprima e, nel pannello, il grafico di una primitiva](docs/primitive.png)

![Studio di funzione: nella nota dominio, simmetria, segno, limiti, asintoti, derivate, massimi, minimi e flessi; nel grafico la funzione con gli asintoti tratteggiati e i punti M, m, F](docs/studio.png)

**Schemi stile draw.io**
- Il pulsante con i due riquadri nella barra apre un editor a tutto schermo: forme a sinistra
  (rettangolo, arrotondato, ellisse, rombo, parallelogramma, esagono, triangolo, nuvola,
  documento, cilindro, nota, freccia grande e doppia, testo), da trascinare sul foglio o da
  cliccare; passando sopra una forma compaiono le **frecce blu**: trascinandone una la colleghi
  a un'altra forma (o, nel vuoto, ne nasce una nuova), cliccandola aggiungi una forma collegata.
- **Basi di dati** (gruppo da aprire nel pannello): entità ed entità debole, relazione e relazione
  identificante, attributi (chiave sottolineata, multivalore, derivato, e a pallino come nei libri
  italiani, pieno per l'identificatore), tabella con un campo per riga (`PK` sottolinea la chiave
  primaria, `FK` segna quella esterna, anche insieme; il tipo dopo i due punti, `Matricola:
  CHAR(6)`) e database. La tabella si scrive com'è disegnata: il nome nella fascia in alto e i
  campi sotto, con un doppio clic sul nome o sul campo da cambiare. Selezionandola, nel pannello a
  destra la si cambia **campo per campo**: PK ed FK da premere, il nome, il tipo, la × per
  toglierlo e «Aggiungi campo».
- **Codice SQL** delle tabelle, da «Scarica»: `CREATE TABLE` con chiavi primarie ed esterne, per
  SQL standard, PostgreSQL, MySQL/MariaDB, SQLite, Oracle o SQL Server, da scaricare come file
  `.sql` o copiare. Le chiavi esterne trovano la loro tabella con le frecce tra le tabelle o con i
  nomi; quello che non si capisce resta in una nota nel codice.
- **Modelli pronti** da cui partire, sul foglio vuoto o dal menu «Modelli»: diagramma di flusso,
  mappa concettuale, albero, ciclo, linea del tempo, schema E-R e tabelle.
- Con più forme selezionate (trascinando un riquadro sul foglio vuoto, o con Maiusc + clic):
  **allinea** (a sinistra, al centro, in alto…) e **distribuisci** con lo stesso spazio;
  triangolo e frecce grandi si **girano** di un quarto alla volta.
- **Scarica** lo schema come immagine PNG (nitida, alla misura giusta anche in Word) o SVG,
  oppure **copialo come immagine** e incollalo in Word, Google Docs o nelle slide.
- Doppio clic (o scrivere con una forma selezionata) per il testo, anche con **formule**
  `$ … $` (si finisce con Esc o con un clic sul foglio; Ctrl+S salva anche mentre si scrive); colori, forma, dimensione del testo, frecce dritte, ad angolo o **curve**, con o senza
  punte, tratteggiate, con il testo all'inizio, a metà o alla fine (per le cardinalità). Annulla/Ripeti, copia e incolla, zoom, griglia, selezione a rettangolo.
- Lo schema va nella nota come blocco ` ```schema ` (un JSON corto, una forma per riga):
  nell'anteprima si vede il disegno, nel testo una riga con «Modifica». I colori seguono il
  tema chiaro o scuro. Funziona anche offline: è fatto con [maxGraph](https://github.com/maxGraph/maxGraph),
  il motore di draw.io, che si carica solo quando serve.
- Con **Salva .md** ogni schema finisce nel file come **immagine** (SVG, chiara su bianco), così
  si vede anche nell'anteprima di VS Code o in Obsidian; il suo JSON resta nel file, in un
  commento che non si vede, e riaprendo il file con **Apri .md** lo schema torna da modificare.

**Appunti**
- Salvati automaticamente nel browser, con elenco, filtro e più note; con l'account, anche su
  tutti i tuoi dispositivi.
- **Cartelle** per organizzarli, per esempio una per corso: le note nuove finiscono nella
  cartella della nota aperta, e il pulsante accanto a ogni nota la sposta.
- Apri e salva file `.md` dal computer (su Chrome/Edge si risalva sullo stesso file); nel
  file gli schemi sono immagini.
- Anteprima affiancata con scorrimento sincronizzato; doppio clic sull'anteprima porta alla riga.
- Stampa / PDF dell'anteprima, backup di tutti gli appunti.
- Sezioni in tonalità diverse (la cornice è più scura del foglio su cui si scrive) e **da
  allargare o stringere**: trascina il bordo dell'elenco degli appunti, del pannello dei
  simboli o quello tra testo e anteprima (o usa le frecce, quando il bordo ha il fuoco); con un
  doppio clic tornano alla misura di partenza. Le misure restano su quel dispositivo.
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
  fatti solo con quattro spazi di rientro non ci sono);
- gli schemi, salvati con **Salva .md**, nel file sono immagini scritte dentro il file stesso
  (`data:image/svg+xml`): VS Code le mostra, GitHub no. Il JSON dello schema è subito sotto, in
  un commento `<!-- glifo-schema … -->`: si può leggere, e Glifo lo usa quando riapre il file.
  Lo stesso per i grafici, con il testo del blocco in `<!-- glifo-grafico … -->`;
- i risultati dopo `=` sono di Glifo: nel file ci sono solo quelli scritti nella formula con Tab.

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
| Schemi | [maxGraph](https://github.com/maxGraph/maxGraph), il motore di draw.io (caricato solo quando serve) |
| Calcoli e grafici | scritti per Glifo: lettura delle formule LaTeX, conti (anche esatti, con le frazioni), disegno in SVG |
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
    calcResults.ts        i risultati dopo «=» nell'editor (Tab li scrive)
    graphInsert.ts        il pulsante «Grafico»: la funzione sotto il cursore in un blocco ```grafico
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
  ui/                     pannello dei simboli, anteprima, elenco appunti, finestre,
                          bordi da trascinare tra le sezioni (resize.ts), il simbolo ∮ (logo.ts)
  store/                  salvataggio nel browser, file .md, impostazioni, misure delle sezioni (layout.ts)
  ai/assistant.ts         assistente AI
  account/
    sync.ts               sincronizzazione: manda e scarica le modifiche, nei conflitti tiene tutte e due le versioni
    controller.ts         quando sincronizzare (avvio, ritorno su Glifo, rete, dopo le modifiche)
    space.ts              le note di ogni account in uno spazio a parte del browser
    supabase.ts           accesso con Google o via email (link o codice), eliminazione dell'account
    export.ts             il file di «Scarica i miei dati»
  schema/
    model.ts              il formato degli schemi (blocchi ```schema), i controlli e i colori dei due temi
    blocks.ts             trova i blocchi ```schema nella nota
    file.ts               gli schemi nei file .md: immagine SVG più il JSON in un commento, e ritorno
    shapes.ts             le forme che maxGraph non ha (parallelogramma, documento, frecce grandi, tabella, pallini…)
    templates.ts          i modelli pronti (diagramma di flusso, mappa concettuale…)
    arrange.ts            allinea e distribuisci (solo i conti)
    image.ts              lo schema come PNG, da scaricare o copiare
    sql.ts                il codice SQL delle tabelle, per ogni database
    graph.ts              il collegamento con maxGraph: forme, frecce, disegno per l'anteprima
    editor.ts             l'editor a tutto schermo (forme, frecce blu, testo, colori, zoom)
    preview.ts, label.ts  il disegno nell'anteprima; il testo delle forme con le formule
  math/
    parse.ts              legge le espressioni (LaTeX o come in una calcolatrice) in un albero
    evaluate.ts           le calcola: funzioni, somme, integrali, derivate, condizioni
    domain.ts             i domini degli integrali doppi e tripli (margine, condizioni, strati) e come si integrano
    complex.ts            i numeri complessi: conti (anche esatti), radici, forme a + bi e ρe^{iθ}, equazioni
    linear.ts             vettori e matrici: conti esatti o con la virgola, determinante, inversa, rango, nucleo, autovalori; la geometria (segmenti, rette, circonferenze, piani, angoli, intersezioni)
    symbolic.ts           i conti con le lettere: derivate (anche parziali), gradiente, divergenza, rotore, hessiana, polinomi di Taylor, i limiti 0/0, con le semplificazioni
    primitive.ts          le primitive: integrali immediati, sostituzione, per parti, fratti semplici, seno e coseno, radici (ognuna controllata derivandola)
    polynomial.ts         i polinomi con le frazioni: divisione, MCD, radici razionali, scomposizione, fratti semplici
    definite.ts           gli integrali definiti con la primitiva: il valore esatto e gli impropri
    study.ts              lo studio di funzione: dominio, segno, limiti, asintoti, derivate, massimi, minimi e flessi
    calculus.ts           gli integrali di linea e di superficie (lavoro e flusso) sulle curve e superfici definite
    limits.ts             i limiti (Richardson, da una parte e dall'altra) e le serie (somme accelerate), e i valori riconosciuti (π²/6, e, ln 2)
    solve.ts              le equazioni, le disequazioni e i sistemi risolti dopo ⇒
    differential.ts       le equazioni differenziali di ogni ordine, risolte con Runge–Kutta dalle condizioni iniziali
    exact.ts, format.ts   i conti esatti con le frazioni; i risultati scritti all'italiana
    sheet.ts              il «foglio» della nota: definizioni dall'alto in basso e risultati dopo «=»
    latex.ts              un'espressione riscritta in LaTeX (le legende dei grafici)
  graph/
    spec.ts               le righe di un blocco ```grafico: funzioni, curve, punti, vettori, aree degli integrali, superfici, zone e solidi, la parte da mostrare, gli slider
    regions.ts            le zone e i solidi: disuguaglianze, insiemi, domini degli integrali doppi e tripli, volumi sotto le superfici
    gauss.ts              il piano di Gauss: numeri complessi, radici, equazioni e zone in z
    fields.ts             i campi di vettori (le frecce), le curve con il verso, le superfici, gli integrali di linea e di superficie, le curve di livello e le equazioni differenziali
    ode.ts                i livelli delle curve di livello e le soluzioni nel campo di direzioni
    studyGraph.ts         lo studio di funzione nel grafico: asintoti tratteggiati, massimi, minimi e flessi
    plot.ts               dove calcolare le curve (salti, asintoti) e le aree, la finestra, le tacche
    svg.ts                il disegno in SVG, con i colori dei due temi
    space.ts              i conti del 3D: superfici a quadretti e a tetraedri, piani, solidi, curve nello spazio, la scatola da mostrare
    view3d.ts             il disegno 3D in SVG: la luce, i pezzi dal più lontano al più vicino, i piani, gli assi
    picture.ts            il disegno fermo di un grafico, per il pannello a destra e i file .md
    preview.ts            nell'anteprima: legenda, errori, slider, trascinare, ingrandire, coordinate
    file.ts               i grafici nei file .md: immagine SVG più il testo nascosto, e ritorno
  host.ts                 integrazione facoltativa con claude.ai (per la demo pubblicata lì)
privacy.html              l'informativa sulla privacy (una seconda pagina, fuori dall'app)
tests/                    test automatici (Vitest), anche del database con le vere migrazioni (PGlite)
scripts/smoke-test.mjs    prova nel browser del flusso principale
scripts/account-test.mjs  prova nel browser dell'account, con un Supabase finto (fake-supabase.mjs)
scripts/icons.mjs         ridisegna favicon e icone dell'app dal simbolo in src/ui/logo.ts
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
`dictionary-en`). Gli schemi usano [maxGraph](https://github.com/maxGraph/maxGraph)
([Apache 2.0](public/licenze/maxgraph.txt)). I testi delle licenze sono pubblicati anche insieme
all'app, in `licenze/`.

## Idee per il futuro

Gli **account** ci sono, in prova: si entra con Google o con un'email. In programma: aprirli a
tutti, poi mandare note ad altri e cartelle condivise. I dettagli, con le altre idee, sono
in [ROADMAP.md](ROADMAP.md).
