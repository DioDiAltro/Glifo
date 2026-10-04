import { h, icon, ICONS } from './dom'

/**
 * Il tutorial: una finestra al centro con poche pagine, ognuna con un video e due righe di testo,
 * da sfogliare con Indietro e Avanti; l'ultima ha «Inizia». Si apre la prima volta che si entra
 * in Glifo e da «Come si usa». I video li registra `node scripts/tutorial.mjs` dall'app vera, nel
 * tema chiaro e in quello scuro: stanno in `public/tutorial/<pagina>-chiaro.webm` e `-scuro.webm`.
 */

export interface TutorialPage {
  /** Il nome dei video della pagina. */
  id: string
  title: string
  /** Il testo; tra apici inversi (`$`) ciò che si scrive davvero. */
  text: string
}

export const TUTORIAL_PAGES: readonly TutorialPage[] = [
  {
    id: 'scrivere',
    title: 'Benvenuto in Glifo',
    text: 'Qui scrivi appunti, esercizi e tesi, con le formule. Il testo è Markdown: `#` per un titolo, `**` per il grassetto, `-` per un elenco. Con «Diviso» vedi accanto come viene.',
  },
  {
    id: 'formule',
    title: 'Le formule',
    text: 'Le formule vanno tra `$` e `$`. Dopo la barra `\\` arrivano i suggerimenti, anche in italiano (`\\radice`, `\\infinito`): Tab inserisce quello scelto e ti porta da un segnaposto all\'altro.',
  },
  {
    id: 'simboli',
    title: 'Il pannello dei simboli',
    text: 'Non ricordi un comando? Apri «Simboli», in alto a destra, e cercalo a parole: «infinito», «per ogni», «freccia». Un clic, e il simbolo è nel testo.',
  },
  {
    id: 'calcoli',
    title: 'Calcoli e grafici',
    text: 'Una formula che finisce con `=` mostra il risultato: con Tab lo scrivi nella nota. Il pulsante con gli assi disegna la funzione su cui c\'è il cursore, così controlli che sia giusta.',
  },
  {
    id: 'barra',
    title: 'Viste, appunti e account',
    text: 'In alto al centro scegli Editor, Diviso o Anteprima. Nella barra a sinistra ci sono gli appunti, le cartelle e «Condividi»; in fondo l\'account, per ritrovare tutto su ogni dispositivo, «Come si usa» e le impostazioni.',
  },
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

function markSeen(): void {
  try {
    localStorage.setItem(SEEN_KEY, 'visto')
  } catch {
    // Senza memoria del browser il tutorial riappare la prossima volta: pazienza.
  }
}

/** Il video di una pagina, nel tema dell'app. */
export function tutorialVideo(page: TutorialPage, dark: boolean): string {
  return `./tutorial/${page.id}-${dark ? 'scuro' : 'chiaro'}.webm`
}

/** Il testo con le parti tra apici inversi come codice. */
function richText(text: string): (string | HTMLElement)[] {
  return text.split('`').map((part, i) => (i % 2 ? h('code', {}, part) : part))
}

export interface TutorialOptions {
  /** Il tema dell'app, per i video. */
  dark: boolean
  /** «Tutte le scorciatoie»: la guida completa. */
  onShortcuts(): void
}

export function openTutorial(opts: TutorialOptions): HTMLDialogElement {
  const pages = TUTORIAL_PAGES
  let index = 0
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
  const media = h('div', { class: 'tutorial-media' }, video, h('p', { class: 'tutorial-offline' }, 'Il video si vede con la connessione.'))
  video.addEventListener('error', () => media.classList.add('is-offline'))
  video.addEventListener('loadeddata', () => media.classList.remove('is-offline'))
  const step = h('p', { class: 'tutorial-step' })
  const title = h('h2', { class: 'tutorial-title', attrs: { id: 'tutorial-title' } })
  const text = h('p', { class: 'tutorial-text' })
  const dots = pages.map((page, i) =>
    h('button', {
      class: 'tutorial-dot',
      title: page.title,
      attrs: { type: 'button', 'aria-label': `Pagina ${i + 1}: ${page.title}` },
      on: { click: () => show(i) },
    }),
  )
  const back = h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => show(index - 1) } }, 'Indietro')
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
              dialog.close()
              opts.onShortcuts()
            },
          },
        },
        'Tutte le scorciatoie',
      ),
      back,
      next,
    ),
    h(
      'button',
      {
        class: 'icon-button tutorial-close',
        title: 'Chiudi',
        attrs: { type: 'button', 'aria-label': 'Chiudi il tutorial' },
        on: { click: () => dialog.close() },
      },
      icon(ICONS.x),
    ),
  )

  function show(i: number): void {
    index = Math.max(0, Math.min(pages.length - 1, i))
    const page = pages[index]
    step.textContent = `${index + 1} di ${pages.length}`
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
    next.textContent = last ? 'Inizia' : 'Avanti'
    next.focus()
  }

  dialog.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowRight' && index < pages.length - 1) show(index + 1)
    else if (ev.key === 'ArrowLeft' && index > 0) show(index - 1)
    else return
    ev.preventDefault()
  })
  dialog.addEventListener('close', () => {
    markSeen()
    video.pause()
    dialog.remove()
  })
  document.body.append(dialog)
  dialog.showModal()
  show(0)
  return dialog
}
