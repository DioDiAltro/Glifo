/**
 * I modelli pronti dell'editor delle tabelle: gli esercizi di economia aziendale che si fanno con
 * Excel (la fattura con l'IVA, il punto di pareggio, il conto economico, il piano di ammortamento).
 * Sono anche esempi delle formule: si cambiano i numeri e i conti si rifanno.
 */

export interface SheetTemplate {
  name: string
  hint: string
  source: string
}

export const TEMPLATES: SheetTemplate[] = [
  {
    name: 'Fattura con l\'IVA',
    hint: 'Quantità per prezzo, l\'imponibile con SOMMA, l\'IVA al 22% e il totale',
    source: [
      '| Prodotto | Quantità | Prezzo | Totale |',
      '| --- | --- | --- | --- |',
      '| Penne | 10 | 1,50 € | =B2*C2 |',
      '| Quaderni | 5 | 2,40 € | =B3*C3 |',
      '| Zaino | 1 | 35,00 € | =B4*C4 |',
      '| **Imponibile** |  |  | **=SOMMA(D2:D4)** |',
      '| IVA | 22% |  | =D5*B6 |',
      '| **Totale** |  |  | **=D5+D6** |',
    ].join('\n'),
  },
  {
    name: 'Punto di pareggio',
    hint: 'Costi fissi e variabili, margine di contribuzione, quantità e fatturato di pareggio; sotto, costi e ricavi per alcune quantità, da cui «Grafico» fa il diagramma di redditività',
    source: [
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
    ].join('\n'),
  },
  {
    name: 'Conto economico',
    hint: 'Ricavi, costi e risultati intermedi, con la percentuale sui ricavi',
    source: [
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
    ].join('\n'),
  },
  {
    name: 'Piano di ammortamento',
    hint: 'Un prestito restituito con la rata costante (RATA): quota interessi, quota capitale e debito residuo anno per anno',
    source: [
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
    ].join('\n'),
  },
]
