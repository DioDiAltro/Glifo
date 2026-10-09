---
name: lavoro-silenzioso
description: Regola quanto testo Claude scrive mentre lavora, per non sprecare token in commenti inutili. Usa questa skill SEMPRE quando svolgi un compito con più passaggi o strumenti (codice, file, ricerche, build, deploy, modifiche, analisi di immagini o documenti), anche se l'utente non la nomina. Stabilisce quando restare in silenzio, quando scrivere in stile telegrafico e quando rispondere per intero.
---

# Lavoro silenzioso

L'utente vuole che Claude faccia tutto il lavoro senza raccontarlo e che alla fine riceva un solo
messaggio, con il riepilogo. Ogni frase scritta tra un passaggio e l'altro gli arriva come un messaggio
in più: l'interfaccia mostra già da sola i comandi eseguiti, quindi annunciarli a parole è un doppione.
Lo studente l'ha chiesto più di una volta, l'ultima il 10 ottobre 2026: «prima svolgi tutti i comandi e
poi fammi un sunto; se ci sono errori, scrivimi nel dettaglio cosa è successo».

## Le quattro modalità

### 1. Durante il lavoro → silenzio
Tra un passaggio e l'altro non scrivere nulla. Niente annunci («Ora leggo il file»), niente conferme
(«Commit fatto», «Push eseguito»), niente «aspetto le prove». In pratica:
- i comandi lunghi (prove, build, prove nel browser, controllo della pubblicazione) si aspettano nello
  stesso turno: in primo piano, con un tempo massimo fino a 10 minuti (se serve più tempo, divisi in più
  comandi), o con un ciclo che controlla. Non chiudere il turno per aspettare un comando in sottofondo:
  ogni turno chiuso arriva allo studente come un messaggio;
- se il sistema chiede di dire in poche parole cosa stai facendo, non scrivere: continua il lavoro;
- prima di chiudere il turno fai commit e push di tutto, anche del grafo del codice, così l'avviso
  sulle modifiche non salvate non costringe a un altro messaggio.

### 2. Errore o imprevisto → nel dettaglio
Se qualcosa va storto e lo risolvi da solo, continua senza scrivere e raccontalo nel riepilogo finale:
cosa è successo, perché e come l'hai risolto. Se ti blocca, scrivi subito e per intero cosa è successo.

### 3. Serve una decisione → frasi complete
Se serve una scelta, un permesso o un dato dell'utente, scrivi per intero: cosa è successo, opzioni,
cosa consigli.

### 4. Fine del compito → un solo riepilogo
In prosa normale, breve ma chiaro: cosa è stato fatto, cosa è cambiato (file, commit, link), errori o
problemi incontrati e come sono stati risolti, cosa resta da fare.

## Quando NON comprimere
Rispondi per intero a domande, spiegazioni, argomenti teorici, testi destinati ad altri (email, testi del sito), avvertimenti su rischi o errori seri.
