/**
 * Parole che i dizionari non conoscono ma che negli appunti universitari
 * sono giuste: termini tecnici, parole inglesi dell'informatica, cognomi di
 * scienziati, abbreviazioni. Valgono qualunque lingua sia scelta.
 *
 * Le parole in minuscolo valgono anche con l'iniziale maiuscola o tutte in
 * maiuscolo; i cognomi valgono con la maiuscola.
 */

const ANALISI_ALGEBRA = `
  iniettivo iniettiva iniettivi iniettive iniettività suriettivo suriettiva suriettivi suriettive suriettività
  biiettivo biiettiva biiettivi biiettive biiettività biiezione biiezioni
  bigettivo bigettiva bigettivi bigettive surgettivo surgettiva surgettivi surgettive
  derivabilità diagonalizzabile diagonalizzabili diagonalizzabilità diagonalizzazione diagonalizzazioni
  lipschitziano lipschitziana lipschitziani lipschitziane hölderiano hölderiana hölderiani hölderiane
  olomorfo olomorfa olomorfi olomorfe olomorfia meromorfo meromorfa meromorfi meromorfe
  autospazio autospazi autofunzione autofunzioni ortogonalizzazione ortonormalizzazione
  autovalore autovalori autovettore autovettori ortonormale ortonormali ortonormalizzare
  diagonalizzare diagonalizza diagonalizzata diagonalizzate diagonalizzati diagonalizzando
  semidefinito semidefinita semidefiniti semidefinite ipergeometrica ipergeometriche
  sottomatrice sottomatrici sottosuccessione sottosuccessioni sottocampo sottocampi sottoanello sottoanelli
  epimorfismo epimorfismi monomorfismo monomorfismi diffeomorfismo diffeomorfismi omeomorfismo omeomorfismi
  jacobiano jacobiana jacobiani jacobiane hessiano hessiana hessiani hessiane laplaciano laplaciana laplaciani laplaciane
  lagrangiano lagrangiana lagrangiani lagrangiane hamiltoniano hamiltoniana hamiltoniani hamiltoniane
  euleriano euleriana euleriani euleriane hilbertiano hilbertiana hilbertiani hilbertiane
  banachiano banachiana banachiani banachiane maxwelliano maxwelliana maxwelliani maxwelliane wronskiano wronskiana
  quaternione quaternioni circuitazione controimmagine controimmagini
  equicontinuo equicontinua equicontinui equicontinue equilimitato equilimitata equilimitati equilimitate
  semicontinuo semicontinua semicontinui semicontinue semicontinuità
  iperpiano iperpiani ipersuperficie ipersuperfici sesquilineare sesquilineari
  integranda integrande integrando integrandi antitrasformata antitrasformate
  autointersezione autointersezioni produttoria produttorie
  approssimabile approssimabili linearizzabile linearizzabili linearizzazione
  triangolabile triangolabili triangolarizzazione
`

const STATISTICA = `
  poissoniano poissoniana poissoniani poissoniane markoviano markoviana markoviani markoviane
  bayesiano bayesiana bayesiani bayesiane
  eteroschedasticità eteroschedastico eteroschedastica eteroschedastici eteroschedastiche
  omoschedasticità omoschedastico omoschedastica omoschedastici omoschedastiche
  decile decili boxplot ipergeometrico ipergeometrici multinomiale multinomiali correlogramma correlogrammi
  curtosi leptocurtico leptocurtica platicurtico platicurtica mesocurtico mesocurtica
  regressore regressori multicollinearità dataset datasets outlier outliers bootstrap
  campionabile campionabili sovracampionamento sottocampionamento
`

const FISICA_CHIMICA_ECONOMIA = `
  isoentropico isoentropica isoentropici isoentropiche isoentropia isocoro isocora isocori isocore
  redox isoquanto isoquanti
`

const INFORMATICA = `
  bytecode istanziare istanziato istanziata istanziati istanziate istanziazione
  deallocare deallocato deallocata deallocati deallocate deallocazione
  debuggare debuggato debuggata debuggati debuggate multithreading multithread
  quicksort mergesort heapsort bubblesort iteratore iteratori deserializzare deserializzazione
  superclasse superclassi supertipo supertipi dereferenziare dereferenziazione tokenizzazione
  backend frontend bitwise javadoc getter setter
  ridimensionabile ridimensionabili serializzabile serializzabili clonabile clonabili
  istanziabile istanziabili deallocabile deallocabili
  array arrays thread threads runtime override overriding overloading overflow underflow
  debug debugger debugging commit repository parser parsing token tokens deadlock refactoring
  hash hashing hashmap framework stack heap queue deque query kernel socket offline
  string integer float enum struct typedef malloc header template stream generics compiler linker shell
  sort merge insertion selection bubble binary search tree graph node vector tensor
  machine learning deep layer epoch loss overfitting underfitting feature clustering embedding notebook
  python java javascript typescript kotlin swift git github html css sql json xml url
  if else for while do switch case break continue return try catch finally throw throws
  new this super class interface extends implements import package public private protected
  static final abstract void null true false int long short byte char double boolean main method instanceof
`

const ABBREVIAZIONI = `def dim oss prop teor cor eq fig tab cap pag cfr cvd qed sse tc rif vs`

/** Nomi dei tasti, per scrivere le scorciatoie («Ctrl + S»). */
const TASTI = `ctrl esc alt altgr maiusc canc cmd fn backspace`

const COGNOMI = `
  Abel Adams Agnesi Ampère Archimede Arrhenius Arzelà Ascoli Avogadro Backus Baire Banach Bayes Bellman Beltrami
  Bernoulli Bertrand Bessel Betti Bézier Binet Biot Bode Bohr Boltzmann Bolzano Bombelli Boole Borel Bose Boyle
  Bragg Brayton Brønsted Cantor Capelli Cardano Carnot Cartesio Cauchy Cavalieri Cayley Celsius Cesàro Chatelier
  Chebyshev Čebyšëv Cholesky Chomsky Civita Clapeyron Clausius Cobb Compton Coriolis Coulomb Cournot Cramer
  Dalton Darboux Dedekind Diesel Dijkstra Dirac Dirichlet Doppler Douglas Einstein Erone Euclide Euler Eulero
  Fahrenheit Faraday Fermat Fermi Fibonacci Fisher Floyd Ford Fourier Fraenkel Frege Frobenius Fubini Fulkerson
  Galilei Galileo Galois Galvani Gauss Gibbs Gini Gödel Graham Gram Green Grönwall Gronwall Guldino Hadamard
  Hamilton Hamming Hankel Hausdorff Heaviside Heine Heisenberg Helmholtz Henry Herfindahl Hermite Hertz Hess
  Hicks Hilbert Hoare Hölder Hooke Hôpital Hopital Householder Huffman Hund Hurwitz Huygens Jacobi Jordan Joule
  Kalman Kelvin Kendall Kepler Keplero Keynes Kirchhoff Knuth Kolmogorov Kosaraju Kramers Kronecker Kronig
  Kruskal Kutta Laffer Lagrange Laguerre Laplace Laurent Laurin Lavoisier Lebesgue Legendre Leibniz Lempel Lenz
  Leontief Levi Lewis Lindeberg Lindelöf Liouville Lipschitz Ljapunov Lorentz Lowry Lussac Lyapunov Mach Maclaurin
  Mandelbrot Mariotte Markov Marshall Maxwell Mealy Mendeleev Millikan Minkowski Moore Morera Morgan Nash Naur
  Navier Nernst Neumann Newton Noether Nyquist Ohm Okun Pareto Parseval Pascal Pauli Peano Pearson Phillips
  Picard Pitagora Plancherel Planck Poincaré Poisson Poynting Prim Proust Raabe Rankine Raoult Raphson Rayleigh
  Reynolds Riccati Ricci Riemann Rolle Rouché Routh Ruffini Runge Russell Rutherford Sarrus Savart Schmidt
  Schrödinger Schwarz Seidel Shannon Simpson Slutsky Snedecor Snell Solow Spearman Stackelberg Stefan Stirling
  Stokes Sylvester Talete Tarjan Tartaglia Taylor Tesla Thomson Tonelli Torricelli Turing Vandermonde Venturi
  Volta Volterra Waals Wallis Walras Warshall Watt Weber Weibull Weierstrass Weyl Wien Wiener Wilcoxon Wronski
  Zermelo Ziv
`

export const GLOSSARY: ReadonlySet<string> = new Set(
  [ANALISI_ALGEBRA, STATISTICA, FISICA_CHIMICA_ECONOMIA, INFORMATICA, ABBREVIAZIONI, TASTI, COGNOMI].join(' ').split(/\s+/).filter(Boolean),
)
