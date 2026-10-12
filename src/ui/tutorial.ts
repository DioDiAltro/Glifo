import { lang, rich, texts } from '../i18n'
import { h, icon, ICONS } from './dom'

/**
 * Il tutorial: una finestra al centro con una pagina per ogni cosa che si fa in Glifo, ognuna con un
 * video e poche righe di testo, da sfogliare con Indietro e Avanti; l'ultima ha «Inizia». Si apre la
 * prima volta che si entra in Glifo e da «Come si usa». I video li registra `node scripts/tutorial.mjs`
 * dall'app vera, nel tema chiaro e in quello scuro: stanno in `public/tutorial/<pagina>-chiaro.webm` e
 * `-scuro.webm`, e quelli con Glifo in inglese (`LINGUA=en`) in `public/tutorial/en/`.
 */

const T = texts({
  scrivereTitle: ['Benvenuto in Glifo', 'Welcome to Glifo'],
  scrivereText: [
    'Qui scrivi appunti, esercizi e tesi, con le formule. Il testo è Markdown: `#` per un titolo, `**` per il grassetto, `-` per un elenco, che Invio continua e Tab rientra. Con «Diviso» vedi accanto come viene.',
    'Here you write notes, exercises and theses, with formulas. The text is Markdown: `#` for a heading, `**` for bold, `-` for a list, which Enter continues and Tab indents. With “Split” you see the result alongside.',
  ],
  formuleTitle: ['Le formule', 'Formulas'],
  formuleText: [
    'Le formule vanno tra `$` e `$` (tra `$$` e `$$` su una riga a parte). Dopo la barra `\\` arrivano i suggerimenti, anche in italiano (`\\radice`, `\\infinito`): Tab inserisce quello scelto e ti porta da un segnaposto all\'altro.',
    'Formulas go between `$` and `$` (between `$$` and `$$` on a line of their own). After the backslash `\\` suggestions appear, in plain words too (`\\root`, `\\infinity`): Tab inserts the one you chose and takes you from one placeholder to the next.',
  ],
  simboliTitle: ['Il pannello dei simboli', 'The symbols panel'],
  simboliText: [
    'Non ricordi un comando? Apri «Simboli», in alto a destra, e cercalo a parole: «infinito», «per ogni», «freccia». Un clic, e il simbolo è nel testo.',
    'Can\'t remember a command? Open “Symbols”, top right, and search for it in words: “infinity”, “for all”, “arrow”. One click and the symbol is in your text.',
  ],
  calcoliTitle: ['Calcoli e controlli', 'Calculations and checks'],
  calcoliText: [
    'Una formula che finisce con `=` mostra il risultato: con Tab lo scrivi nella nota. Se il risultato lo scrivi tu, Glifo lo controlla: ✓ se è giusto, ✗ se no. Ci sono i conti dei corsi: limiti, derivate, integrali, serie, equazioni differenziali, matrici, probabilità.',
    'A formula ending in `=` shows the result: Tab writes it into the note. If you write the result yourself, Glifo checks it: ✓ if it\'s right, ✗ if not. The math of your courses is there: limits, derivatives, integrals, series, differential equations, matrices, probability.',
  ],
  graficiTitle: ['I grafici', 'Graphs'],
  graficiText: [
    'Il pulsante con gli assi disegna la funzione su cui c\'è il cursore. Nel blocco `grafico` ogni riga è una cosa da disegnare: una lettera definita prima, come `a = 3`, diventa uno slider, e con `z = …` il grafico è in 3D. Le frecce ↑ ↓ lo spostano nella nota.',
    'The button with the axes plots the function under the cursor. In the `grafico` block each line is something to draw: a letter defined earlier, like `a = 3`, becomes a slider, and with `z = …` the graph is 3D. The ↑ ↓ arrows move it within the note.',
  ],
  tabelleTitle: ['Le tabelle', 'Tables'],
  tabelleText: [
    'Nel menu «Tabella», «Tabella con le formule» apre un foglio come Excel: scrivi numeri e formule come `=SOMMA(A1:A3)` e con «Fatto» la tabella è nella nota. Apri e salvi file .xlsx e .csv, e con le celle fai un grafico, anche un diagramma di Gantt.',
    'In the “Table” menu, “Table with formulas” opens a sheet like Excel: type numbers and formulas such as `=SUM(A1:A3)` and with “Done” the table is in your note. You can open and save .xlsx and .csv files, and chart the cells, even as a Gantt chart.',
  ],
  schemiTitle: ['Gli schemi', 'Diagrams'],
  schemiText: [
    'Il pulsante «Schema» apre un editor come draw.io: trascina le forme, collegale con le frecce e scrivici dentro, anche le formule. Ci sono le corsie per i processi e le tabelle delle basi di dati, con il loro codice SQL; lo schema si scarica come PNG o SVG.',
    'The “Diagram” button opens an editor like draw.io: drag shapes, connect them with arrows and write inside them, formulas too. There are swimlanes for processes and database tables, with their SQL code; the diagram downloads as PNG or SVG.',
  ],
  spiegamiTitle: ['Spiega con l\'AI', 'Explain with AI'],
  spiegamiText: [
    'Il pulsante ✨ elenca cosa c\'è da spiegare nella nota: conti, grafici, formule, teoremi, schemi e tabelle. Un modello che gira nel tuo browser spiega quello che scegli passo per passo, Glifo controlla i conti (✓ ✗) e sotto puoi fare domande. La prima volta il modello si scarica: serve una buona scheda grafica.',
    'The ✨ button lists what can be explained in your note: calculations, graphs, formulas, theorems, diagrams and tables. A model running in your browser explains the one you pick step by step, Glifo checks the math (✓ ✗) and below you can ask questions. The first time the model downloads: you need a good graphics card.',
  ],
  lavagnaTitle: ['La lavagna', 'The whiteboard'],
  lavagnaText: [
    'Con «Lavagna», in alto, scrivi a mano accanto al testo, con la penna (che sente la pressione), il dito o il mouse. Tieni ferma la penna alla fine del tratto e linee e figure diventano precise; il lazo prende quello che hai scritto per spostarlo o ingrandirlo. Due dita spostano e ingrandiscono; ogni nota ha la sua lavagna.',
    'With “Whiteboard”, at the top, you write by hand next to your text, with a pen (which senses pressure), your finger or the mouse. Hold the pen still at the end of a stroke and lines and shapes become precise; the lasso picks up what you wrote to move or resize it. Two fingers pan and zoom; each note has its own whiteboard.',
  ],
  barraTitle: ['Viste e appunti', 'Views and notes'],
  barraText: [
    'In alto al centro scegli Editor, Diviso, Anteprima o Lavagna. Il logo in alto a sinistra apre la barra laterale con gli appunti e le cartelle; in fondo apri e salvi i file .md e trovi «Come si usa» e le impostazioni, con il tema e la lingua.',
    'At the top center choose Editor, Split, Preview or Whiteboard. The logo at the top left opens the sidebar with your notes and folders; at the bottom you open and save .md files and find “How to use” and the settings, with the theme and the language.',
  ],
  condividiTitle: ['Condividere e ritrovare gli appunti', 'Share and sync your notes'],
  condividiText: [
    'Con l\'account ritrovi gli appunti su ogni dispositivo, e «Condividi», in fondo alla barra laterale, crea un link alla nota: chi lo apre la legge anche senza Glifo. Da lì la stampi o la salvi in PDF, anche senza account. Nel fumetto leggi i commenti di chi prova Glifo e scrivi il tuo.',
    'With an account you find your notes on every device, and “Share”, at the bottom of the sidebar, creates a link to the note: anyone can read it, even without Glifo. From there you can print it or save it as a PDF, even without an account. In the speech bubble you read feedback from people trying Glifo and write yours.',
  ],
  offline: ['Il video si vede con la connessione.', 'The video needs a connection.'],
  page: (n: number, title: string) => [`Pagina ${n}: ${title}`, `Page ${n}: ${title}`],
  step: (n: number, of: number) => [`${n} di ${of}`, `${n} of ${of}`],
  back: ['Indietro', 'Back'],
  next: ['Avanti', 'Next'],
  start: ['Inizia', 'Get started'],
  shortcuts: ['Tutte le scorciatoie', 'All shortcuts'],
  close: ['Chiudi', 'Close'],
  closeTutorial: ['Chiudi il tutorial', 'Close the tutorial'],
  howTo: ['«Come si usa»', '“How to use”'],
  closeHint: ['Chiudi l\'avviso', 'Close the notice'],
  hintClosedBar: ['Per rivedere il tutorial apri la barra laterale con il logo e premi {help} in fondo.', 'To see the tutorial again, open the sidebar with the logo and press {help} at the bottom.'],
  hintOpenBar: ['Per rivedere il tutorial premi {help} in fondo alla barra laterale.', 'To see the tutorial again, press {help} at the bottom of the sidebar.'],
})

export interface TutorialPage {
  /** Il nome dei video della pagina. */
  id: string
  /** Titolo e testo nella lingua della pagina; nel testo, tra apici inversi (`$`), ciò che si scrive davvero. */
  readonly title: string
  readonly text: string
}

/** Una pagina: titolo e testo si leggono quando servono, nella lingua di Glifo. */
function page(id: string, title: () => string, text: () => string): TutorialPage {
  return {
    id,
    get title() {
      return title()
    },
    get text() {
      return text()
    },
  }
}

export const TUTORIAL_PAGES: readonly TutorialPage[] = [
  page('scrivere', () => T.scrivereTitle, () => T.scrivereText),
  page('formule', () => T.formuleTitle, () => T.formuleText),
  page('simboli', () => T.simboliTitle, () => T.simboliText),
  page('calcoli', () => T.calcoliTitle, () => T.calcoliText),
  page('grafici', () => T.graficiTitle, () => T.graficiText),
  page('tabelle', () => T.tabelleTitle, () => T.tabelleText),
  page('schemi', () => T.schemiTitle, () => T.schemiText),
  page('spiegami', () => T.spiegamiTitle, () => T.spiegamiText),
  page('lavagna', () => T.lavagnaTitle, () => T.lavagnaText),
  page('barra', () => T.barraTitle, () => T.barraText),
  page('condividi', () => T.condividiTitle, () => T.condividiText),
]

/** Visto una volta (su questo dispositivo), il tutorial non si apre più da solo. */
const SEEN_KEY = 'glifo.tutorial.v1'

export function tutorialSeen(): boolean {
  try {
    return localStorage.getItem(SEEN_KEY) !== null
  } catch {
    return false
  }
}

/** Il tutorial è già stato visto: anche quando arriva dal vecchio Glifo, con gli appunti (src/relocation.ts). */
export function markTutorialSeen(): void {
  try {
    localStorage.setItem(SEEN_KEY, 'visto')
  } catch {
    // Senza memoria del browser il tutorial riappare la prossima volta: pazienza.
  }
}

/** Il video di una pagina, nel tema dell'app e nella lingua di Glifo. */
export function tutorialVideo(page: TutorialPage, dark: boolean): string {
  return `./tutorial/${lang === 'en' ? 'en/' : ''}${page.id}-${dark ? 'scuro' : 'chiaro'}.webm`
}

/** Il testo con le parti tra apici inversi come codice. */
function richText(text: string): (string | HTMLElement)[] {
  return text.split('`').map((part, i) => (i % 2 ? h('code', {}, part) : part))
}

export interface TutorialOptions {
  /** Il tema dell'app, per i video. */
  dark: boolean
  /** «Tutte le scorciatoie»: la guida completa (il tutorial si chiude). */
  onShortcuts(): void
  /** Il tutorial si è chiuso con la x, Esc o «Inizia» (non per andare alle scorciatoie). */
  onClose?(): void
}

export function openTutorial(opts: TutorialOptions): HTMLDialogElement {
  const pages = TUTORIAL_PAGES
  let index = 0
  let toShortcuts = false
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const video = h('video', {
    attrs: { muted: true, loop: true, playsinline: true, preload: 'auto', 'aria-hidden': 'true' },
  })
  // Senza movimento (se lo chiede il sistema) il video parte solo con i suoi controlli.
  video.muted = true
  video.autoplay = !still
  video.controls = still
  // I video non sono tra i file dell'app che restano senza connessione (sarebbero troppi da
  // scaricare per tutti): offline al loro posto c'è una riga.
  const media = h('div', { class: 'tutorial-media' }, video, h('p', { class: 'tutorial-offline' }, T.offline))
  video.addEventListener('error', () => media.classList.add('is-offline'))
  video.addEventListener('loadeddata', () => media.classList.remove('is-offline'))
  const step = h('p', { class: 'tutorial-step' })
  const title = h('h2', { class: 'tutorial-title', attrs: { id: 'tutorial-title' } })
  const text = h('p', { class: 'tutorial-text' })
  const dots = pages.map((page, i) =>
    h('button', {
      class: 'tutorial-dot',
      title: page.title,
      attrs: { type: 'button', 'aria-label': T.page(i + 1, page.title) },
      on: { click: () => show(i) },
    }),
  )
  const back = h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => show(index - 1) } }, T.back)
  const next = h('button', { class: 'btn btn-primary tutorial-next', attrs: { type: 'button' }, on: { click: () => (index < pages.length - 1 ? show(index + 1) : dialog.close()) } })

  const dialog: HTMLDialogElement = h(
    'dialog',
    { class: 'dialog dialog-tutorial', attrs: { 'aria-labelledby': 'tutorial-title' } },
    media,
    h('div', { class: 'tutorial-body' }, step, title, text),
    h(
      'div',
      { class: 'tutorial-foot' },
      h('div', { class: 'tutorial-dots' }, dots),
      h(
        'button',
        {
          class: 'link-button tutorial-shortcuts',
          attrs: { type: 'button' },
          on: {
            click: () => {
              toShortcuts = true
              dialog.close()
              opts.onShortcuts()
            },
          },
        },
        T.shortcuts,
      ),
      back,
      next,
    ),
    h(
      'button',
      {
        class: 'icon-button tutorial-close',
        title: T.close,
        attrs: { type: 'button', 'aria-label': T.closeTutorial },
        on: { click: () => dialog.close() },
      },
      icon(ICONS.x),
    ),
  )

  function show(i: number): void {
    index = Math.max(0, Math.min(pages.length - 1, i))
    const page = pages[index]
    step.textContent = T.step(index + 1, pages.length)
    title.textContent = page.title
    text.replaceChildren(...richText(page.text))
    const src = tutorialVideo(page, opts.dark)
    if (video.getAttribute('src') !== src) {
      video.setAttribute('src', src)
      if (!still) void video.play().catch(() => {})
    }
    dots.forEach((d, j) => (j === index ? d.setAttribute('aria-current', 'step') : d.removeAttribute('aria-current')))
    back.hidden = index === 0
    const last = index === pages.length - 1
    next.textContent = last ? T.start : T.next
    next.focus()
  }

  dialog.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowRight' && index < pages.length - 1) show(index + 1)
    else if (ev.key === 'ArrowLeft' && index > 0) show(index - 1)
    else return
    ev.preventDefault()
  })
  dialog.addEventListener('close', () => {
    markTutorialSeen()
    video.pause()
    dialog.remove()
    if (!toShortcuts) opts.onClose?.()
  })
  document.body.append(dialog)
  dialog.showModal()
  show(0)
  return dialog
}

/** Quanto resta il fumetto dopo il tutorial, se non ci si passa sopra. */
export const HINT_MS = 8000

let closeHint: (() => void) | null = null

/**
 * Chiuso il tutorial (quello della prima volta, o lasciato per le scorciatoie), un fumetto dice
 * dove si rivede: punta al «?» in fondo alla barra laterale o, se la barra è chiusa, al logo che la
 * apre, e quel pulsante si illumina. Si toglie da solo dopo qualche secondo (non mentre ci si passa
 * sopra), con la x, con Esc o con un clic altrove.
 */
export function showTutorialHint(anchors: { help: HTMLElement; toggle: HTMLElement }): void {
  closeHint?.()
  const shown = (el: HTMLElement) => el.getClientRects().length > 0
  const anchor = shown(anchors.help) ? anchors.help : shown(anchors.toggle) ? anchors.toggle : null
  const mark = () =>
    h('span', { class: 'tutorial-hint-mark', attrs: { role: 'img', 'aria-label': T.howTo } }, icon(ICONS.help, 15))
  const message = h('p', { class: 'tutorial-hint-text' })
  const bubble = h(
    'div',
    { class: 'tutorial-hint', attrs: { role: 'status' } },
    message,
    h(
      'button',
      {
        class: 'icon-button tutorial-hint-close',
        title: T.close,
        attrs: { type: 'button', 'aria-label': T.closeHint },
        on: { click: () => close() },
      },
      icon(ICONS.x, 16),
    ),
  )
  let timer = 0
  const wait = () => {
    clearTimeout(timer)
    timer = window.setTimeout(close, HINT_MS)
  }
  const stay = () => clearTimeout(timer)
  const outside = (ev: PointerEvent) => {
    if (!bubble.contains(ev.target as Node)) close()
  }
  const onKey = (ev: KeyboardEvent) => {
    if (ev.key === 'Escape') close()
  }

  function close(): void {
    clearTimeout(timer)
    document.removeEventListener('pointerdown', outside, true)
    document.removeEventListener('keydown', onKey, true)
    window.removeEventListener('resize', close)
    anchor?.classList.remove('is-pointed')
    bubble.classList.remove('is-visible')
    window.setTimeout(() => bubble.remove(), 200)
    if (closeHint === close) closeHint = null
  }

  /** Il fumetto sopra il «?» (che è in fondo) o sotto il logo (che è in cima), con la punta verso il pulsante. */
  function place(): void {
    const width = bubble.offsetWidth
    const height = bubble.offsetHeight
    if (!anchor) {
      bubble.style.left = `${(innerWidth - width) / 2}px`
      bubble.style.top = `${innerHeight - height - 24}px`
      return
    }
    const r = anchor.getBoundingClientRect()
    const center = r.left + r.width / 2
    const left = Math.max(8, Math.min(innerWidth - width - 8, center - width / 2))
    bubble.style.left = `${left}px`
    bubble.style.setProperty('--arrow-x', `${Math.max(16, Math.min(width - 16, center - left))}px`)
    const above = r.top > innerHeight / 2
    bubble.dataset.side = above ? 'above' : 'below'
    bubble.style.top = `${above ? r.top - height - 12 : r.bottom + 12}px`
  }

  closeHint = close
  bubble.addEventListener('pointerenter', stay)
  bubble.addEventListener('pointerleave', wait)
  bubble.addEventListener('focusin', stay)
  bubble.addEventListener('focusout', wait)
  // Vuoto all'inizio: chi usa un lettore di schermo sente il testo quando arriva.
  document.body.append(bubble)
  requestAnimationFrame(() => {
    if (closeHint !== close) return
    message.append(...rich(anchor === anchors.toggle ? T.hintClosedBar : T.hintOpenBar, { help: mark() }))
    place()
    anchor?.classList.add('is-pointed')
    bubble.classList.add('is-visible')
    document.addEventListener('pointerdown', outside, true)
    document.addEventListener('keydown', onKey, true)
    window.addEventListener('resize', close)
    wait()
  })
}
