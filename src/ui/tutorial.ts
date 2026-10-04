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
    text: 'In alto al centro scegli Editor, Diviso o Anteprima. Il logo in alto a sinistra apre la barra laterale con gli appunti e le cartelle; in fondo ci sono «Condividi» (anche per stampare), l\'account, per ritrovare tutto su ogni dispositivo, «Come si usa» e le impostazioni.',
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
              toShortcuts = true
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
    h('span', { class: 'tutorial-hint-mark', attrs: { role: 'img', 'aria-label': '«Come si usa»' } }, icon(ICONS.help, 15))
  const message = h('p', { class: 'tutorial-hint-text' })
  const bubble = h(
    'div',
    { class: 'tutorial-hint', attrs: { role: 'status' } },
    message,
    h(
      'button',
      {
        class: 'icon-button tutorial-hint-close',
        title: 'Chiudi',
        attrs: { type: 'button', 'aria-label': 'Chiudi l\'avviso' },
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
    message.append(
      ...(anchor === anchors.toggle
        ? ['Per rivedere il tutorial apri la barra laterale con il logo e premi ', mark(), ' in fondo.']
        : ['Per rivedere il tutorial premi ', mark(), ' in fondo alla barra laterale.']),
    )
    place()
    anchor?.classList.add('is-pointed')
    bubble.classList.add('is-visible')
    document.addEventListener('pointerdown', outside, true)
    document.addEventListener('keydown', onKey, true)
    window.addEventListener('resize', close)
    wait()
  })
}
