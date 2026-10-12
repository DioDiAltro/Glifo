/**
 * I modelli pronti dell'editor delle tabelle: gli esercizi di economia aziendale e di gestione del
 * progetto che si fanno con Excel (la fattura con l'IVA, il punto di pareggio, il conto economico, il
 * piano di ammortamento, il prezzo di vendita dai costi, il preventivo di un progetto, le attività per
 * il diagramma di Gantt). Sono anche esempi delle formule: si cambiano i numeri e i conti si rifanno.
 *
 * Il modello va nella nota nella lingua di Glifo, scelta quando si inserisce: con Glifo in inglese
 * intestazioni e testi in inglese e le funzioni con i nomi inglesi (SUM), che il lettore capisce
 * come quelli italiani. I numeri e le formule sono scritti come sempre nella nota, all'italiana
 * (1,50 €, il punto e virgola tra gli argomenti), così la nota dà gli stessi valori nelle due lingue.
 */
import { byLang, texts } from '../i18n'

const T = texts({
  invoice: ['Fattura con l\'IVA', 'Invoice with VAT'],
  invoiceHint: ['Quantità per prezzo, l\'imponibile con SOMMA, l\'IVA al 22% e il totale', 'Quantity times price, the taxable amount with SUM, 22% VAT and the total'],
  breakEven: ['Punto di pareggio', 'Break-even point'],
  breakEvenHint: [
    'Costi fissi e variabili, margine di contribuzione, quantità e fatturato di pareggio; sotto, costi e ricavi per alcune quantità, da cui «Grafico» fa il diagramma di redditività',
    'Fixed and variable costs, contribution margin, break-even quantity and sales; below, costs and revenue for a few quantities, from which “Graph” draws the break-even chart',
  ],
  income: ['Conto economico', 'Income statement'],
  incomeHint: ['Ricavi, costi e risultati intermedi, con la percentuale sui ricavi', 'Revenue, costs and intermediate results, with the percentage of revenue'],
  loan: ['Piano di ammortamento', 'Loan amortization schedule'],
  loanHint: [
    'Un prestito restituito con la rata costante (RATA): quota interessi, quota capitale e debito residuo anno per anno',
    'A loan repaid with a constant payment (PMT): interest, principal and remaining balance year by year',
  ],
  price: ['Prezzo di vendita', 'Selling price'],
  priceHint: ['Dai costi al prezzo: costo primo, industriale e complessivo, il ricarico e l\'IVA', 'From costs to price: prime cost, production cost and total cost, the markup and VAT'],
  quote: ['Preventivo di un progetto', 'Project quote'],
  quoteHint: [
    'Le ore di ogni risorsa per il costo orario, la quota dei costi generali, il ricarico e il prezzo con l\'IVA',
    'The hours of each resource times the hourly cost, the share of overheads, the markup and the price with VAT',
  ],
  gantt: ['Diagramma di Gantt', 'Gantt chart'],
  ganttHint: [
    'Le attività di un progetto con la durata, le precedenti e chi le fa: «Grafico» fa il diagramma di Gantt o il reticolo, con il percorso critico',
    'A project\'s activities with their duration, predecessors and who does them: “Graph” draws the Gantt chart or the network diagram, with the critical path',
  ],
})

export interface SheetTemplate {
  readonly name: string
  readonly hint: string
  readonly source: string
}

/** Un modello: il nome, la riga di aiuto e il testo del blocco nella lingua di Glifo, letti quando si usano. */
function template(name: () => string, hint: () => string, source: () => string[]): SheetTemplate {
  return {
    get name() {
      return name()
    },
    get hint() {
      return hint()
    },
    get source() {
      return source().join('\n')
    },
  }
}

export const TEMPLATES: readonly SheetTemplate[] = [
  template(
    () => T.invoice,
    () => T.invoiceHint,
    () =>
      byLang({
        it: () => [
          '| Prodotto | Quantità | Prezzo | Totale |',
          '| --- | --- | --- | --- |',
          '| Penne | 10 | 1,50 € | =B2*C2 |',
          '| Quaderni | 5 | 2,40 € | =B3*C3 |',
          '| Zaino | 1 | 35,00 € | =B4*C4 |',
          '| **Imponibile** |  |  | **=SOMMA(D2:D4)** |',
          '| IVA | 22% |  | =D5*B6 |',
          '| **Totale** |  |  | **=D5+D6** |',
        ],
        en: () => [
          '| Product | Quantity | Price | Total |',
          '| --- | --- | --- | --- |',
          '| Pens | 10 | 1,50 € | =B2*C2 |',
          '| Notebooks | 5 | 2,40 € | =B3*C3 |',
          '| Backpack | 1 | 35,00 € | =B4*C4 |',
          '| **Taxable amount** |  |  | **=SUM(D2:D4)** |',
          '| VAT | 22% |  | =D5*B6 |',
          '| **Total** |  |  | **=D5+D6** |',
        ],
      }),
  ),
  template(
    () => T.breakEven,
    () => T.breakEvenHint,
    () =>
      byLang({
        it: () => [
          '| Costi fissi | 12.000 € |  |  |  |',
          '| Costo variabile unitario | 4,00 € |  |  |  |',
          '| Prezzo di vendita | 10,00 € |  |  |  |',
          '| Margine di contribuzione unitario | =B3-B2 |  |  |  |',
          '| Quantità di pareggio | =B1/B4 |  |  |  |',
          '| Fatturato di pareggio | =B5*B3 |  |  |  |',
          '|  |  |  |  |  |',
          '| **Quantità** | **Costi fissi** | **Costi totali** | **Ricavi** | **Utile** |',
          '| 0 | =$B$1 | =$B$1+$B$2*A9 | =$B$3*A9 | =D9-C9 |',
          '| 1000 | =$B$1 | =$B$1+$B$2*A10 | =$B$3*A10 | =D10-C10 |',
          '| 2000 | =$B$1 | =$B$1+$B$2*A11 | =$B$3*A11 | =D11-C11 |',
          '| 3000 | =$B$1 | =$B$1+$B$2*A12 | =$B$3*A12 | =D12-C12 |',
          '| 4000 | =$B$1 | =$B$1+$B$2*A13 | =$B$3*A13 | =D13-C13 |',
        ],
        en: () => [
          '| Fixed costs | 12.000 € |  |  |  |',
          '| Variable cost per unit | 4,00 € |  |  |  |',
          '| Selling price | 10,00 € |  |  |  |',
          '| Unit contribution margin | =B3-B2 |  |  |  |',
          '| Break-even quantity | =B1/B4 |  |  |  |',
          '| Break-even sales | =B5*B3 |  |  |  |',
          '|  |  |  |  |  |',
          '| **Quantity** | **Fixed costs** | **Total costs** | **Revenue** | **Profit** |',
          '| 0 | =$B$1 | =$B$1+$B$2*A9 | =$B$3*A9 | =D9-C9 |',
          '| 1000 | =$B$1 | =$B$1+$B$2*A10 | =$B$3*A10 | =D10-C10 |',
          '| 2000 | =$B$1 | =$B$1+$B$2*A11 | =$B$3*A11 | =D11-C11 |',
          '| 3000 | =$B$1 | =$B$1+$B$2*A12 | =$B$3*A12 | =D12-C12 |',
          '| 4000 | =$B$1 | =$B$1+$B$2*A13 | =$B$3*A13 | =D13-C13 |',
        ],
      }),
  ),
  template(
    () => T.income,
    () => T.incomeHint,
    () =>
      byLang({
        it: () => [
          '| Voce | Importo | % sui ricavi |',
          '| --- | --- | --- |',
          '| Ricavi di vendita | 250.000 € | =B2/B$2 {0,0%} |',
          '| Costo del venduto | 150.000 € | =B3/B$2 {0,0%} |',
          '| **Margine lordo** | **=B2-B3** | =B4/B$2 {0,0%} |',
          '| Costi del personale | 40.000 € | =B5/B$2 {0,0%} |',
          '| Ammortamenti | 10.000 € | =B6/B$2 {0,0%} |',
          '| Altri costi | 15.000 € | =B7/B$2 {0,0%} |',
          '| **Reddito operativo** | **=B4-B5-B6-B7** | =B8/B$2 {0,0%} |',
          '| Oneri finanziari | 5.000 € | =B9/B$2 {0,0%} |',
          '| **Utile prima delle imposte** | **=B8-B9** | =B10/B$2 {0,0%} |',
          '| Imposte (24%) | =B10*24% {0 €} | =B11/B$2 {0,0%} |',
          '| **Utile netto** | **=B10-B11** {0 €} | =B12/B$2 {0,0%} |',
        ],
        en: () => [
          '| Item | Amount | % of revenue |',
          '| --- | --- | --- |',
          '| Sales revenue | 250.000 € | =B2/B$2 {0,0%} |',
          '| Cost of goods sold | 150.000 € | =B3/B$2 {0,0%} |',
          '| **Gross margin** | **=B2-B3** | =B4/B$2 {0,0%} |',
          '| Personnel costs | 40.000 € | =B5/B$2 {0,0%} |',
          '| Depreciation | 10.000 € | =B6/B$2 {0,0%} |',
          '| Other costs | 15.000 € | =B7/B$2 {0,0%} |',
          '| **Operating income** | **=B4-B5-B6-B7** | =B8/B$2 {0,0%} |',
          '| Interest expense | 5.000 € | =B9/B$2 {0,0%} |',
          '| **Profit before tax** | **=B8-B9** | =B10/B$2 {0,0%} |',
          '| Taxes (24%) | =B10*24% {0 €} | =B11/B$2 {0,0%} |',
          '| **Net profit** | **=B10-B11** {0 €} | =B12/B$2 {0,0%} |',
        ],
      }),
  ),
  template(
    () => T.loan,
    () => T.loanHint,
    () =>
      byLang({
        it: () => [
          '| Prestito | 10.000 € |  |  |',
          '| Tasso annuo | 6% |  |  |',
          '| Anni | 5 |  |  |',
          '| Rata | =-RATA(B2; B3; B1) |  |  |',
          '| **Anno** | **Quota interessi** | **Quota capitale** | **Debito residuo** |',
          '| 0 |  |  | =B1 |',
          '| 1 | =D6*$B$2 | =$B$4-B7 | =D6-C7 |',
          '| 2 | =D7*$B$2 | =$B$4-B8 | =D7-C8 |',
          '| 3 | =D8*$B$2 | =$B$4-B9 | =D8-C9 |',
          '| 4 | =D9*$B$2 | =$B$4-B10 | =D9-C10 |',
          '| 5 | =D10*$B$2 | =$B$4-B11 | =D10-C11 |',
        ],
        en: () => [
          '| Loan | 10.000 € |  |  |',
          '| Annual rate | 6% |  |  |',
          '| Years | 5 |  |  |',
          '| Payment | =-PMT(B2; B3; B1) |  |  |',
          '| **Year** | **Interest** | **Principal** | **Remaining balance** |',
          '| 0 |  |  | =B1 |',
          '| 1 | =D6*$B$2 | =$B$4-B7 | =D6-C7 |',
          '| 2 | =D7*$B$2 | =$B$4-B8 | =D7-C8 |',
          '| 3 | =D8*$B$2 | =$B$4-B9 | =D8-C9 |',
          '| 4 | =D9*$B$2 | =$B$4-B10 | =D9-C10 |',
          '| 5 | =D10*$B$2 | =$B$4-B11 | =D10-C11 |',
        ],
      }),
  ),
  template(
    () => T.price,
    () => T.priceHint,
    () =>
      byLang({
        it: () => [
          '| Voce | % | Importo |',
          '| --- | --- | --- |',
          '| Materie prime |  | 30,00 € |',
          '| Manodopera diretta |  | 20,00 € |',
          '| **Costo primo** |  | **=C2+C3** |',
          '| Costi generali di produzione (sulla manodopera) | 50% | =C3*B5 |',
          '| **Costo industriale** |  | **=C4+C5** |',
          '| Costi commerciali e amministrativi | 20% | =C6*B7 |',
          '| **Costo complessivo** |  | **=C6+C7** |',
          '| Ricarico | 25% | =C8*B9 |',
          '| **Prezzo di vendita** |  | **=C8+C9** |',
          '| IVA | 22% | =C10*B11 |',
          '| **Prezzo con l\'IVA** |  | **=C10+C11** |',
        ],
        en: () => [
          '| Item | % | Amount |',
          '| --- | --- | --- |',
          '| Raw materials |  | 30,00 € |',
          '| Direct labor |  | 20,00 € |',
          '| **Prime cost** |  | **=C2+C3** |',
          '| Production overhead (on labor) | 50% | =C3*B5 |',
          '| **Production cost** |  | **=C4+C5** |',
          '| Selling and administrative costs | 20% | =C6*B7 |',
          '| **Total cost** |  | **=C6+C7** |',
          '| Markup | 25% | =C8*B9 |',
          '| **Selling price** |  | **=C8+C9** |',
          '| VAT | 22% | =C10*B11 |',
          '| **Price with VAT** |  | **=C10+C11** |',
        ],
      }),
  ),
  template(
    () => T.quote,
    () => T.quoteHint,
    () =>
      byLang({
        it: () => [
          '| Risorsa | Ore | Costo orario | Costo |',
          '| --- | --- | --- | --- |',
          '| Analista | 40 | 45,00 € | =B2*C2 |',
          '| Programmatore | 120 | 35,00 € | =B3*C3 |',
          '| Web designer | 30 | 32,00 € | =B4*C4 |',
          '| Collaudatore | 20 | 28,00 € | =B5*C5 |',
          '| **Costi diretti** | **=SOMMA(B2:B5)** |  | **=SOMMA(D2:D5)** |',
          '| Costi generali | 15% |  | =D6*B7 |',
          '| **Costo del progetto** |  |  | **=D6+D7** |',
          '| Ricarico | 30% |  | =D8*B9 |',
          '| **Prezzo di vendita** |  |  | **=D8+D9** |',
          '| IVA | 22% |  | =D10*B11 |',
          '| **Totale del preventivo** |  |  | **=D10+D11** |',
        ],
        en: () => [
          '| Resource | Hours | Hourly cost | Cost |',
          '| --- | --- | --- | --- |',
          '| Analyst | 40 | 45,00 € | =B2*C2 |',
          '| Developer | 120 | 35,00 € | =B3*C3 |',
          '| Web designer | 30 | 32,00 € | =B4*C4 |',
          '| Tester | 20 | 28,00 € | =B5*C5 |',
          '| **Direct costs** | **=SUM(B2:B5)** |  | **=SUM(D2:D5)** |',
          '| Overheads | 15% |  | =D6*B7 |',
          '| **Project cost** |  |  | **=D6+D7** |',
          '| Markup | 30% |  | =D8*B9 |',
          '| **Selling price** |  |  | **=D8+D9** |',
          '| VAT | 22% |  | =D10*B11 |',
          '| **Quote total** |  |  | **=D10+D11** |',
        ],
      }),
  ),
  template(
    () => T.gantt,
    () => T.ganttHint,
    () =>
      byLang({
        it: () => [
          '| Attività | Descrizione | Durata (giorni) | Precedenti | Chi |',
          '| --- | --- | --- | --- | --- |',
          '| A | Analisi dei requisiti | 5 |  | Analista |',
          '| B | Progettazione del database | 4 | A | Analista |',
          '| C | Progettazione dell\'interfaccia | 3 | A | Web designer |',
          '| D | Sviluppo del server | 8 | B | Programmatore |',
          '| E | Sviluppo dell\'interfaccia | 6 | C | Web designer |',
          '| F | Collaudo | 4 | D, E | Collaudatore |',
          '| G | Formazione degli utenti | 2 | F | Analista |',
          '| H | Messa in servizio | 1 | F | Sistemista |',
        ],
        en: () => [
          '| Activity | Description | Duration (days) | Predecessors | Who |',
          '| --- | --- | --- | --- | --- |',
          '| A | Requirements analysis | 5 |  | Analyst |',
          '| B | Database design | 4 | A | Analyst |',
          '| C | Interface design | 3 | A | Web designer |',
          '| D | Server development | 8 | B | Developer |',
          '| E | Interface development | 6 | C | Web designer |',
          '| F | Testing | 4 | D, E | Tester |',
          '| G | User training | 2 | F | Analyst |',
          '| H | Go-live | 1 | F | System administrator |',
        ],
      }),
  ),
]
