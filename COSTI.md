# Costi

Le cose che costerebbero soldi allo studente. **Finché Glifo è in sviluppo non si spende niente**
(deciso il 5 ottobre 2026): si usano solo le versioni gratuite, e le voci di questo file si attivano
solo quando lo dice lo studente, una alla volta, partendo da qui. Per ogni voce: quanto costa,
quando servirebbe e come si fa intanto senza spendere.

I prezzi cambiano: prima di attivare una voce si ricontrollano. Quelli scritti qui sono del 5
ottobre 2026 (i piani, i prezzi per chi usa Glifo e il resto sono in [ABBONAMENTI.md](ABBONAMENTI.md)).

## Oggi: tutto gratis

| Cosa | Piano | Da tenere d'occhio |
|---|---|---|
| Il sito, su GitHub Pages | gratis | non si può usare per un servizio a pagamento: prima di far pagare si passa a Cloudflare Pages |
| Account e note, su Supabase | gratuito | 500 MB di database e 50.000 utenti attivi al mese; va in pausa dopo 7 giorni con poco uso |
| Accesso con Google | gratis | |
| Cloudflare (l'account c'è già) | gratuito | |
| L'assistente AI | con la chiave di chi lo usa | le prove si fanno gratis con una chiave gratuita di Gemini (Google AI Studio, senza carta di credito) o con i 10.000 «neuroni» al giorno di Cloudflare Workers AI |
| «Spiegami» con Qwen3 nel browser (in prova, 7 ottobre 2026) | gratis: il modello gira sul dispositivo di chi lo usa | si scarica da Hugging Face la prima volta (da 0,4 a 2,3 GB); serve WebGPU, quindi di solito un computer |

## Gratis anche quando Glifo sarà aperto a tutti

- **Il sito su Cloudflare Pages**: gratis, e a differenza di GitHub Pages permette un servizio a
  pagamento; si pubblica anche da un repository privato.
- **La posta per le email di accesso** (Resend o Brevo): piano gratuito.
- **Il CAPTCHA** contro le iscrizioni automatiche (Cloudflare Turnstile): gratis.

## Da attivare solo quando lo dice lo studente

| Cosa | Quanto | Quando servirebbe | Intanto, gratis |
|---|---|---|---|
| **Dominio** (per esempio glifo.app) | 10-20 € l'anno | prima di aprire l'account a tutti, se il sito cambia indirizzo | se Glifo passa sotto S&Z, `glifo.seznet.net` non costa niente in più |
| **Supabase Pro** | 25 $ al mese | con utenti che pagano: niente pausa e i backup | il piano gratuito |
| **Cloudflare Workers a pagamento** | 5 $ al mese, più 0,011 $ ogni 1.000 «neuroni» oltre i 10.000 gratis al giorno | quando il modello piccolo deve servire tanta gente | i 10.000 neuroni gratis al giorno |
| **L'AI di Glifo** (la chiave sul server) | a consumo, per milione di token (ingresso / uscita): Haiku 4.5 1 $ / 5 $, Sonnet 5.5 2 $ / 10 $, Opus 5.5 4 $ / 20 $; si caricano crediti in anticipo e si mette un tetto di spesa al mese | con i piani a pagamento | la propria chiave, anche quella gratuita di Gemini |
| **Trascrizione delle lezioni** | da 0,15 $ a 0,36 $ per ora di audio, più l'AI che ne fa appunti | quando ci sarà la trascrizione | |
| **Servizio di pagamento** (*merchant of record*: Paddle, Lemon Squeezy, Polar…) | nessun costo fisso: circa il 5-7% più 30-50 centesimi per ogni pagamento ricevuto | dal primo abbonamento venduto | |
| **Partita IVA e commercialista** | il commercialista ha un costo, da chiedere; l'INPS, secondo come viene inquadrata l'attività, può avere un minimo di circa 3.000-4.600 € l'anno anche incassando poco | prima di incassare il primo euro | |

## Quando lo studente dice di cominciare

Si attiva una voce alla volta, con un tetto di spesa dove si può. Di solito l'ordine è: il dominio
(se serve), poi commercialista e partita IVA, il servizio di pagamento, Supabase Pro e l'AI di Glifo.
Ogni volta si scrive qui la data e cosa è stato attivato.

## Attivato

Ancora niente.
