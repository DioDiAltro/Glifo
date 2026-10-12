/**
 * Il pulsante ✨ «Spiega con l'AI» mentre l'AI lavora (8 ottobre 2026, lo studente: «quando è in
 * funzione abbia un'animazione… quando finisce di pensare esce un pallino per dire che ha finito, stile
 * messaggio, senza numero dentro»). Finché il pannello AI scarica il modello, pensa o scrive una
 * spiegazione o una risposta, il pulsante ha `.is-working` e l'icona sfuma i colori (app.css). Se il
 * lavoro finisce mentre il pannello AI non si vede (chiuso, o con i simboli), `.has-news` mette il
 * pallino, che se ne va quando il pannello AI torna a vedersi. Titolo e aria-label dicono lo stesso.
 */

import { texts } from '../i18n'

const T = texts({
  workingTitle: ['Spiega con l\'AI: sta lavorando…', 'Explain with AI: working…'],
  newsTitle: ['Spiega con l\'AI: ha finito, apri il pannello per vedere', 'Explain with AI: done, open the panel to see it'],
  workingLabel: (label: string) => [`${label}, sta lavorando`, `${label}, working`],
  newsLabel: (label: string) => [`${label}, ha finito`, `${label}, done`],
})

/** Quello che serve a chi lavora con il modello (la spiegazione, la chat): dire quando comincia e finisce. */
export interface AiWork {
  /**
   * Comincia un lavoro. La funzione che torna lo finisce (conta solo la prima volta): con `news`
   * falso (fermato da chi lo usa, o perché la nota è cambiata) non lascia il pallino.
   */
  start(): (news?: boolean) => void
}

export interface AiActivity extends AiWork {
  /** Il pannello AI si vede: via il pallino. */
  seen(): void
  readonly working: boolean
  readonly news: boolean
}

export const AI_WORKING_TITLE = T.workingTitle
export const AI_NEWS_TITLE = T.newsTitle

export function aiActivity(button: HTMLElement, visible: () => boolean): AiActivity {
  const idle = { title: button.title, label: button.getAttribute('aria-label') ?? '' }
  let running = 0
  let news = false

  function paint(): void {
    button.classList.toggle('is-working', running > 0)
    button.classList.toggle('has-news', news)
    const [title, label] = running > 0
      ? [AI_WORKING_TITLE, T.workingLabel(idle.label)]
      : news
        ? [AI_NEWS_TITLE, T.newsLabel(idle.label)]
        : [idle.title, idle.label]
    button.title = title
    button.setAttribute('aria-label', label)
  }

  return {
    start() {
      running++
      paint()
      let open = true
      return (withNews = true) => {
        if (!open) return
        open = false
        running--
        if (withNews && !visible()) news = true
        paint()
      }
    },
    seen() {
      if (!news) return
      news = false
      paint()
    },
    get working() {
      return running > 0
    },
    get news() {
      return news
    },
  }
}
