/**
 * Le domande frequenti (GRAFICA.md, punto 2, 13 ottobre 2026), in cima alla pagina «Domande frequenti e
 * commenti» (faq.html, src/ui/faqPage.ts): le risposte alle domande che tornano più spesso, divise per
 * argomento. Si vede la domanda e con un clic si apre la risposta. Ogni domanda ha il suo indirizzo
 * (faq.html#offline, lo stesso nelle due lingue), così a un commento che chiede una cosa già spiegata si
 * risponde con il link. Le scrive chi fa Glifo, qui, nelle due lingue: quando una domanda torna spesso nei
 * commenti, diventa una domanda frequente. Le risposte dicono come funziona Glifo oggi: se cambia, si
 * cambiano anche loro.
 */
import { byLang, rich, texts } from '../i18n'
import { h, icon, ICONS } from './dom'
import { toast } from './toast'

const T = texts({
  title: ['Domande frequenti', 'Frequently asked questions'],
  // `comments`: il link ai commenti, più sotto nella pagina.
  intro: [
    'Le risposte alle domande che arrivano più spesso. Se la tua non c\'è, scrivila nei {comments}.',
    'Answers to the questions we get most often. If yours isn\'t here, ask it in the {comments}.',
  ],
  commentsBelow: ['commenti, qui sotto', 'comments below'],
  copyLink: ['Copia il link', 'Copy link'],
  copyLinkLabel: (question: string) => [`Copia il link alla domanda «${question}»`, `Copy the link to the question “${question}”`],
  copied: ['Link copiato: incollalo dove vuoi.', 'Link copied: paste it wherever you like.'],
  copyFailed: ['Non riesco a copiare il link: copialo dalla barra degli indirizzi.', 'I can\'t copy the link: copy it from the address bar.'],
})

/** Una domanda con la sua risposta. */
export interface FaqQuestion {
  /** Il pezzo dell'indirizzo che apre la domanda (faq.html#offline): lo stesso nelle due lingue. */
  id: string
  question: string
  /** La risposta: paragrafi ed elenchi. */
  answer: HTMLElement[]
}

/** Un argomento («Gli appunti», «L'account»…) con le sue domande. */
export interface FaqGroup {
  title: string
  questions: FaqQuestion[]
}

type Piece = Node | string

const p = (...pieces: Piece[]): HTMLParagraphElement => h('p', {}, pieces)
const list = (...items: Piece[][]): HTMLUListElement => h('ul', {}, items.map((pieces) => h('li', {}, pieces)))
/** Un collegamento a un'altra domanda della pagina. */
const to = (id: string, text: string): HTMLAnchorElement => h('a', { attrs: { href: `#${id}` } }, text)
const kbd = (key: string): HTMLElement => h('kbd', {}, key)

/** Le domande frequenti, divise per argomento, nella lingua della pagina. */
export function faqGroups(): FaqGroup[] {
  return byLang<FaqGroup[]>({
    it: () => [
      {
        title: 'Gli appunti',
        questions: [
          {
            id: 'dove-sono',
            question: 'Dove sono salvati i miei appunti?',
            answer: [
              p('Nel browser che stai usando, su questo dispositivo: senza account le note non vanno su nessun server.'),
              p(
                'Con l\'account gli appunti sono anche nell\'account (su Supabase, con i server a Francoforte, in Germania), e li ritrovi su ogni dispositivo dove entri. Le lavagne invece restano solo nel browser dove le hai disegnate.',
              ),
              p('Quanto spazio occupano lo vedi in Impostazioni → Dati.'),
            ],
          },
          {
            id: 'perderli',
            question: 'Posso perdere gli appunti?',
            answer: [
              p('Sì, se cancelli i dati di navigazione del browser e non hai né l\'account né un backup: senza account, Glifo li tiene solo lì. Per stare tranquillo:'),
              list(
                ['entra con l\'account: gli appunti sono anche lì (le lavagne no);'],
                ['ogni tanto premi «Scarica backup» in Impostazioni → Dati: un file con appunti, cartelle e lavagne, da rimettere con «Ripristina backup»;'],
                ['oppure salva le note importanti come file, con «Salva .md».'],
              ),
              p(
                'Su iPhone e iPad (e anche sul Mac) Safari cancella i dati dei siti che non apri per 7 giorni in cui lo usi. Con Glifo sulla schermata Home non succede: vedi ',
                to('installare', 'come si installa'),
                '.',
              ),
            ],
          },
          {
            id: 'cestino',
            question: 'Ho eliminato una nota per sbaglio: si recupera?',
            answer: [
              p('No: in Glifo non c\'è un cestino, e la nota se ne va insieme alla sua lavagna. Per questo, prima di eliminarla, Glifo chiede se sei sicuro.'),
              p(
                'Se hai un backup fatto prima, «Ripristina backup» (Impostazioni → Dati) la riporta senza toccare gli altri appunti. Mentre scrivi, invece, ',
                kbd('Ctrl'),
                ' ',
                kbd('Z'),
                ' (sul Mac ',
                kbd('⌘'),
                ' ',
                kbd('Z'),
                ') annulla le ultime modifiche al testo della nota.',
              ),
            ],
          },
          {
            id: 'offline',
            question: 'Glifo funziona senza internet?',
            answer: [
              p(
                'Sì. Dopo la prima volta che lo apri, Glifo si apre e funziona anche senza connessione: scrivere, le formule, i simboli, i grafici, le tabelle, gli schemi, la lavagna e il controllo ortografico.',
              ),
              p('Senza rete non vanno solo le cose che passano da internet:'),
              list(
                ['la sincronizzazione con l\'account: le modifiche restano nel browser e partono quando torna la rete;'],
                ['entrare nell\'account, condividere una nota con un link e aprire le note condivise;'],
                ['i commenti e i video del tutorial;'],
                ['«Spiegami» la prima volta, perché il modello va scaricato (dopo resta nel browser e funziona anche offline), e «Chiedi all\'AI».'],
              ),
            ],
          },
          {
            id: 'dispositivi',
            question: 'Come uso gli stessi appunti su più dispositivi?',
            answer: [
              p(
                'Con l\'account: entra con lo stesso account (Google o email) su ogni dispositivo, e appunti, cartelle e impostazioni si sincronizzano da soli. Le lavagne restano nel browser dove le hai disegnate.',
              ),
              p('Senza account: «Scarica backup» su un dispositivo e «Ripristina backup» sull\'altro (Impostazioni → Dati), oppure passa le note come file .md.'),
            ],
          },
        ],
      },
      {
        title: 'Usare Glifo',
        questions: [
          {
            id: 'latex',
            question: 'Devo saper scrivere in LaTeX?',
            answer: [
              p(
                'No. Nel pannello «Simboli» cerchi un simbolo a parole, per esempio «integrale», «freccia» o «per ogni», e con un clic lo metti nella nota. Mentre scrivi un comando che comincia con ',
                h('code', {}, '\\'),
                ', Glifo ti suggerisce come finirlo.',
              ),
              p('Il resto lo mostra «Come si usa», in fondo alla barra laterale: il tutorial con i video e tutte le scorciatoie.'),
            ],
          },
          {
            id: 'installare',
            question: 'Come installo Glifo sul telefono o sul computer?',
            answer: [
              p('Glifo è un sito che si installa come un\'app: poi si apre dalla sua icona, in una finestra sua, e funziona anche offline.'),
              list(
                ['Chrome o Edge sul computer: il pulsante «Installa» nella barra degli indirizzi (o nel menu del browser).'],
                ['Android: nel menu ⋮ di Chrome, «Installa app» (o «Aggiungi a schermata Home»).'],
                ['iPhone e iPad: in Safari, il pulsante Condividi e poi «Aggiungi alla schermata Home».'],
                ['Mac con Safari: menu File → «Aggiungi al Dock».'],
              ),
            ],
          },
          {
            id: 'condividere',
            question: 'Come condivido una nota?',
            answer: [
              p(
                'Con «Condividi», in fondo alla barra laterale: Glifo crea un link, e chi lo apre legge la nota anche senza Glifo e senza account. Per creare il link serve l\'account.',
              ),
              p(
                'Il link mostra la nota com\'era quando l\'hai condivisa: dopo le modifiche premi «Aggiorna il link». Con «Togli il link» non la apre più nessuno. Se lasci «Consenti copie», chi la apre può salvarsene una copia tra i suoi appunti.',
              ),
            ],
          },
          {
            id: 'stampare',
            question: 'Come stampo una nota o la salvo in PDF?',
            answer: [
              p('In «Condividi» c\'è «Stampa o PDF», anche senza account: nella finestra di stampa del browser scegli di salvarla come PDF.'),
              p('Le tabelle si scaricano anche come file Excel (.xlsx) o .csv, gli schemi e i grafici come immagini, e la nota intera come file .md con «Salva .md».'),
            ],
          },
        ],
      },
      {
        title: 'L\'AI',
        questions: [
          {
            id: 'spiegami',
            question: 'Perché «Spiegami» non parte sul mio telefono?',
            answer: [
              p(
                '«Spiegami» usa un modello di intelligenza artificiale che gira dentro il tuo browser, senza mandare la nota a nessuno. Per farlo servono WebGPU e una scheda grafica con abbastanza memoria: su un computer con Chrome o Edge aggiornati di solito va, su telefoni e iPad spesso no.',
              ),
              p(
                'La prima volta il modello si scarica (circa 1 GB quello di partenza) e poi resta nel browser. Se la scheda grafica non ce la fa, scegli un modello più piccolo in Impostazioni → AI.',
              ),
            ],
          },
          {
            id: 'ai-e-appunti',
            question: 'I miei appunti finiscono a un\'intelligenza artificiale?',
            answer: [
              p('Con «Spiegami» no: il modello gira nel tuo browser e la nota resta sul tuo dispositivo.'),
              p(
                '«Chiedi all\'AI», nella ricerca dei simboli, funziona solo se metti una tua chiave in Impostazioni → AI: allora quello che scrivi nella ricerca va al servizio che hai scelto (per esempio Anthropic o Gemini). Senza chiave non parte niente.',
              ),
            ],
          },
        ],
      },
      {
        title: 'L\'account',
        questions: [
          {
            id: 'account',
            question: 'Serve un account?',
            answer: [
              p('No: Glifo funziona anche senza, con gli appunti nel browser. L\'account serve per ritrovare gli appunti su più dispositivi e per condividere le note con un link.'),
              p('Per entrare non serve una password: si entra con Google, o con la propria email (arriva un\'email per entrare).'),
            ],
          },
          {
            id: 'eliminare-account',
            question: 'Come elimino il mio account?',
            answer: [
              p(
                'In Impostazioni → Account, «Elimina account…», da confermare scrivendo «elimina». Dal server si cancellano per sempre l\'account e tutto quello che contiene: note, cartelle, impostazioni, dizionario e link condivisi.',
              ),
              p(
                'Prima, se vuoi, «Scarica i miei dati» ti dà una copia di tutto. In questo browser restano gli appunti fuori dall\'account; sugli altri dispositivi premi «Esci dall\'account» per togliere le note anche da lì.',
              ),
            ],
          },
          {
            id: 'trasloco',
            question: 'Come porto i miei appunti su glifo.page?',
            answer: [
              p(
                'Dal 18 ottobre 2026 Glifo è su glifo.page (prima era su diodialtro.github.io/Glifo). Apri il vecchio indirizzo nel browser dove hai gli appunti e premi «Porta i miei appunti nel nuovo Glifo»: arrivano appunti, cartelle e lavagne.',
              ),
              p(
                'Con l\'account basta entrare su glifo.page, perché le note sono nell\'account; le lavagne però stanno solo nel browser, quindi portale con lo stesso pulsante. Il vecchio indirizzo resta aperto almeno fino alla fine di febbraio 2027.',
              ),
            ],
          },
        ],
      },
    ],
    en: () => [
      {
        title: 'Your notes',
        questions: [
          {
            id: 'dove-sono',
            question: 'Where are my notes saved?',
            answer: [
              p('In the browser you\'re using, on this device: without an account, your notes don\'t go to any server.'),
              p(
                'With an account, your notes are also in your account (on Supabase, with servers in Frankfurt, Germany), and you find them on every device where you sign in. Whiteboards, on the other hand, stay only in the browser where you drew them.',
              ),
              p('You can see how much space they take in Settings → Data.'),
            ],
          },
          {
            id: 'perderli',
            question: 'Can I lose my notes?',
            answer: [
              p('Yes, if you clear the browser\'s data and have neither an account nor a backup: without an account, Glifo keeps them only there. To be safe:'),
              list(
                ['sign in with an account: your notes are there too (whiteboards aren\'t);'],
                ['every now and then press “Download backup” in Settings → Data: a file with your notes, folders and whiteboards, which you put back with “Restore backup”;'],
                ['or save important notes as files, with “Save .md”.'],
              ),
              p(
                'On iPhone and iPad (and on the Mac too) Safari deletes the data of websites you don\'t open for 7 days of using it. With Glifo on the Home Screen this doesn\'t happen: see ',
                to('installare', 'how to install it'),
                '.',
              ),
            ],
          },
          {
            id: 'cestino',
            question: 'I deleted a note by mistake: can I get it back?',
            answer: [
              p('No: Glifo has no trash, and the note goes away together with its whiteboard. That\'s why Glifo asks whether you\'re sure before deleting it.'),
              p(
                'If you have an earlier backup, “Restore backup” (Settings → Data) brings it back without touching your other notes. While you\'re writing, on the other hand, ',
                kbd('Ctrl'),
                ' ',
                kbd('Z'),
                ' (',
                kbd('⌘'),
                ' ',
                kbd('Z'),
                ' on the Mac) undoes your latest changes to the note\'s text.',
              ),
            ],
          },
          {
            id: 'offline',
            question: 'Does Glifo work without internet?',
            answer: [
              p(
                'Yes. After the first time you open it, Glifo opens and works without a connection too: writing, formulas, symbols, graphs, tables, diagrams, the whiteboard and the spell checker.',
              ),
              p('Without a connection, only the things that go through the internet don\'t work:'),
              list(
                ['syncing with your account: changes stay in the browser and are sent when you\'re back online;'],
                ['signing in, sharing a note with a link and opening shared notes;'],
                ['feedback and the tutorial videos;'],
                ['“Explain” the first time, because the model has to be downloaded (then it stays in the browser and works offline too), and “Ask AI”.'],
              ),
            ],
          },
          {
            id: 'dispositivi',
            question: 'How do I use the same notes on several devices?',
            answer: [
              p(
                'With an account: sign in with the same account (Google or email) on every device, and your notes, folders and settings sync by themselves. Whiteboards stay in the browser where you drew them.',
              ),
              p('Without an account: “Download backup” on one device and “Restore backup” on the other (Settings → Data), or move your notes as .md files.'),
            ],
          },
        ],
      },
      {
        title: 'Using Glifo',
        questions: [
          {
            id: 'latex',
            question: 'Do I need to know LaTeX?',
            answer: [
              p(
                'No. In the “Symbols” panel you search for a symbol by name, for example “integral”, “arrow” or “for all”, and one click puts it in your note. While you type a command starting with ',
                h('code', {}, '\\'),
                ', Glifo suggests how to finish it.',
              ),
              p('“How to use”, at the bottom of the sidebar, shows the rest: the tutorial with videos and all the shortcuts.'),
            ],
          },
          {
            id: 'installare',
            question: 'How do I install Glifo on my phone or computer?',
            answer: [
              p('Glifo is a website you can install like an app: then it opens from its icon, in its own window, and works offline too.'),
              list(
                ['Chrome or Edge on a computer: the “Install” button in the address bar (or in the browser menu).'],
                ['Android: in Chrome\'s ⋮ menu, “Install app” (or “Add to Home screen”).'],
                ['iPhone and iPad: in Safari, the Share button and then “Add to Home Screen”.'],
                ['Mac with Safari: File menu → “Add to Dock”.'],
              ),
            ],
          },
          {
            id: 'condividere',
            question: 'How do I share a note?',
            answer: [
              p(
                'With “Share”, at the bottom of the sidebar: Glifo creates a link, and whoever opens it can read the note even without Glifo and without an account. You need an account to create the link.',
              ),
              p(
                'The link shows the note as it was when you shared it: after changing it, press “Update link”. With “Remove link” no one can open it anymore. If you leave “Allow copies” on, whoever opens it can save a copy to their own notes.',
              ),
            ],
          },
          {
            id: 'stampare',
            question: 'How do I print a note or save it as a PDF?',
            answer: [
              p('In “Share” there\'s “Print or PDF”, even without an account: in the browser\'s print window, choose to save it as a PDF.'),
              p('Tables can also be downloaded as Excel (.xlsx) or .csv files, diagrams and graphs as images, and the whole note as a .md file with “Save .md”.'),
            ],
          },
        ],
      },
      {
        title: 'AI',
        questions: [
          {
            id: 'spiegami',
            question: 'Why doesn\'t “Explain” start on my phone?',
            answer: [
              p(
                '“Explain” uses an AI model that runs inside your browser, without sending your note to anyone. For that it needs WebGPU and a graphics card with enough memory: on a computer with an up-to-date Chrome or Edge it usually works, on phones and iPads often not.',
              ),
              p(
                'The first time, the model is downloaded (about 1 GB for the default one) and then it stays in the browser. If your graphics card can\'t handle it, choose a smaller model in Settings → AI.',
              ),
            ],
          },
          {
            id: 'ai-e-appunti',
            question: 'Do my notes end up with an AI?',
            answer: [
              p('With “Explain”, no: the model runs in your browser and the note stays on your device.'),
              p(
                '“Ask AI”, in the symbol search, works only if you add your own key in Settings → AI: then what you type in the search goes to the service you chose (for example Anthropic or Gemini). Without a key nothing is sent.',
              ),
            ],
          },
        ],
      },
      {
        title: 'Your account',
        questions: [
          {
            id: 'account',
            question: 'Do I need an account?',
            answer: [
              p('No: Glifo works without one too, with your notes in the browser. An account lets you find your notes on several devices and share notes with a link.'),
              p('You don\'t need a password: you sign in with Google, or with your email (you get an email to sign in).'),
            ],
          },
          {
            id: 'eliminare-account',
            question: 'How do I delete my account?',
            answer: [
              p(
                'In Settings → Account, “Delete account…”, which you confirm by typing “delete”. The account and everything in it are deleted from the server forever: notes, folders, settings, dictionary and shared links.',
              ),
              p(
                'First, if you like, “Download my data” gives you a copy of everything. In this browser, the notes outside the account stay; on your other devices, press “Sign out” to remove the notes from there too.',
              ),
            ],
          },
          {
            id: 'trasloco',
            question: 'How do I bring my notes to glifo.page?',
            answer: [
              p(
                'Since 18 October 2026 Glifo has been at glifo.page (before, it was at diodialtro.github.io/Glifo). Open the old address in the browser where your notes are and press “Bring my notes to the new Glifo”: your notes, folders and whiteboards come along.',
              ),
              p(
                'With an account, just sign in on glifo.page, because your notes are in the account; whiteboards, however, are only in the browser, so bring them with the same button. The old address stays open at least until the end of February 2027.',
              ),
            ],
          },
        ],
      },
    ],
  })
}

/** Copia l'indirizzo della domanda, per mandarlo a qualcuno o rispondere a un commento. */
async function copyLink(id: string): Promise<void> {
  const url = `${location.origin}${location.pathname}#${id}`
  try {
    await navigator.clipboard.writeText(url)
    toast(T.copied)
  } catch {
    history.replaceState(null, '', `#${id}`)
    toast(T.copyFailed, 'error')
  }
}

function questionItem(question: FaqQuestion): HTMLDetailsElement {
  const item = h(
    'details',
    { class: 'faq-item', attrs: { id: question.id } },
    h('summary', { class: 'faq-question' }, h('span', {}, question.question), icon(ICONS.chevronDown, 18)),
    h(
      'div',
      { class: 'faq-answer' },
      question.answer,
      h(
        'button',
        {
          class: 'faq-copy',
          attrs: { type: 'button', 'aria-label': T.copyLinkLabel(question.question) },
          on: { click: () => void copyLink(question.id) },
        },
        icon(ICONS.link, 14),
        T.copyLink,
      ),
    ),
  )
  // Aperta, la domanda si legge nell'indirizzo: chi la vuole mandare copia quello.
  item.addEventListener('toggle', () => {
    if (item.open && item.isConnected && location.hash !== `#${question.id}`) history.replaceState(null, '', `#${question.id}`)
  })
  return item
}

export interface FaqSection {
  element: HTMLElement
  /** Apre la domanda dell'indirizzo (`#offline`) e ci porta la pagina: false se non è una domanda. */
  openFromHash(hash: string): boolean
}

/** Le domande frequenti per la pagina: il titolo, due righe e gli argomenti con le loro domande. */
export function faqSection(opts: { commentsId: string; groups?: FaqGroup[] }): FaqSection {
  const groups = opts.groups ?? faqGroups()
  const items = new Map<string, HTMLDetailsElement>()
  const element = h(
    'section',
    { class: 'faq-section', attrs: { 'aria-labelledby': 'faq-title' } },
    h('h2', { attrs: { id: 'faq-title' } }, T.title),
    h('p', { class: 'faq-intro' }, ...rich(T.intro, { comments: h('a', { attrs: { href: `#${opts.commentsId}` } }, T.commentsBelow) })),
    groups.map((group) =>
      h(
        'div',
        { class: 'faq-group' },
        h('h3', {}, group.title),
        h(
          'div',
          { class: 'faq-list' },
          group.questions.map((question) => {
            const item = questionItem(question)
            items.set(question.id, item)
            return item
          }),
        ),
      ),
    ),
  )
  return {
    element,
    openFromHash(hash) {
      let id = hash.replace(/^#/, '')
      try {
        id = decodeURIComponent(id)
      } catch {
        // Un indirizzo storpiato non apre niente.
      }
      const item = items.get(id)
      if (!item) return false
      for (const other of items.values()) other.classList.toggle('is-target', other === item)
      item.open = true
      item.scrollIntoView({ block: 'start' })
      return true
    },
  }
}
