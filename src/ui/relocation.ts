import { moveDayLabel, NEW_ORIGIN, RelocationError, type RelocationResult } from '../relocation'
import { dialogShell } from './dialogs'
import { ICONS, h, icon } from './dom'
import { logoMark } from './logo'
import { toast } from './toast'

/**
 * Il trasloco su glifo.page visto da chi usa Glifo (src/relocation.ts): sul vecchio sito la fascia
 * con l'avviso e, dal giorno del trasloco, la pagina a tutto schermo; sul sito nuovo il messaggio con
 * quello che è arrivato.
 */

export interface RelocationUiDeps {
  /** Porta gli appunti nel nuovo Glifo: apre glifo.page e glieli passa. */
  transfer(): Promise<RelocationResult>
  /** Scarica un file con tutti gli appunti, da aprire su glifo.page con «Ripristina backup». */
  download(): void
  /** Si è entrati con l'account: le note ci sono già sul sito nuovo, le lavagne no. */
  account: boolean
}

const NEW_HOST = NEW_ORIGIN.replace('https://', '')

/** Cosa dire se gli appunti non sono arrivati. */
export function relocationErrorMessage(error: unknown): string {
  const reason = error instanceof RelocationError ? error.reason : 'failed'
  if (reason === 'popup') {
    return `Il browser ha bloccato la finestra di ${NEW_HOST}: permetti le finestre per questo sito e riprova, oppure scarica il backup.`
  }
  if (reason === 'timeout') {
    return `${NEW_HOST} non ha risposto. Riprova tra poco, oppure scarica il backup e aprilo su ${NEW_HOST} con «Ripristina backup».`
  }
  return `Gli appunti non sono arrivati su ${NEW_HOST}. Riprova, oppure scarica il backup e aprilo lì con «Ripristina backup».`
}

/** Il pulsante che porta gli appunti: mentre lavora dice cosa fa, poi com'è andata. */
function transferButton(deps: RelocationUiDeps, label: string, onDone: (result: RelocationResult) => void): HTMLButtonElement {
  const button: HTMLButtonElement = h(
    'button',
    {
      class: 'btn btn-primary relocation-transfer',
      attrs: { type: 'button' },
      on: {
        click: () => {
          button.disabled = true
          button.textContent = 'Porto gli appunti…'
          deps
            .transfer()
            .then(onDone, (error: unknown) => toast(relocationErrorMessage(error), 'error'))
            .finally(() => {
              button.disabled = false
              button.textContent = label
            })
        },
      },
    },
    label,
  )
  return button
}

function downloadButton(deps: RelocationUiDeps): HTMLButtonElement {
  return h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => deps.download() } }, icon(ICONS.download, 16), 'Scarica il backup')
}

function openNewSite(label: string, extraClass = ''): HTMLAnchorElement {
  return h('a', { class: `btn ${extraClass}`.trim(), attrs: { href: `${NEW_ORIGIN}/`, target: '_blank', rel: 'noopener' } }, label)
}

/** Il messaggio sul vecchio sito, dopo che gli appunti sono arrivati. */
export function transferredMessage(): string {
  return `Fatto: i tuoi appunti sono su ${NEW_HOST}. Da ora usa quell'indirizzo.`
}

/**
 * La fascia in cima al vecchio sito, dal giorno dell'avviso al trasloco. Si chiude con ×, ma solo per
 * questa volta: riaprendo Glifo torna.
 */
export function relocationBanner(deps: RelocationUiDeps): HTMLElement {
  const banner: HTMLElement = h(
    'div',
    { class: 'relocation-banner', attrs: { role: 'region', 'aria-label': 'Glifo cambia indirizzo' } },
    h(
      'p',
      { class: 'relocation-banner-text' },
      h('strong', {}, `Glifo si sposta su ${NEW_HOST}.`),
      ` Da ${moveDayLabel()} si usa solo lì: porta adesso i tuoi appunti, lavagne comprese.`,
    ),
    h(
      'div',
      { class: 'relocation-banner-actions' },
      transferButton(deps, 'Porta i miei appunti', () => toast(transferredMessage())),
      downloadButton(deps),
      openNewSite(`Apri ${NEW_HOST}`),
      h(
        'button',
        {
          class: 'icon-button relocation-banner-close',
          title: 'Chiudi',
          attrs: { type: 'button', 'aria-label': 'Chiudi l\'avviso' },
          on: { click: () => banner.remove() },
        },
        icon(ICONS.x),
      ),
    ),
  )
  return banner
}

/**
 * Dal giorno del trasloco il vecchio sito mostra solo questa pagina: Glifo non si usa più qui, ma gli
 * appunti sono ancora in questo browser e si possono portare su glifo.page o scaricare. È una finestra
 * modale che non si chiude, così sotto non si scrive più.
 */
export function showRelocationPage(deps: RelocationUiDeps): HTMLDialogElement {
  const status = h('p', { class: 'relocation-status', attrs: { role: 'status' } })
  const dialog: HTMLDialogElement = h(
    'dialog',
    { class: 'relocation-page', attrs: { 'aria-label': `Glifo ora è su ${NEW_HOST}` } },
    h(
      'div',
      // Il fuoco va sulla scheda, non sul primo link: niente riquadro del fuoco in mezzo al testo.
      { class: 'relocation-card', attrs: { tabindex: '-1', autofocus: true } },
      h('div', { class: 'relocation-logo', html: logoMark() }),
      h('h1', {}, `Glifo ora è su ${NEW_HOST}`),
      h(
        'p',
        {},
        `Da ${moveDayLabel()} Glifo si usa all'indirizzo `,
        h('a', { attrs: { href: `${NEW_ORIGIN}/` } }, NEW_HOST),
        '. Questo indirizzo resta aperto ancora per un po\', solo per portare via i tuoi appunti.',
      ),
      h(
        'div',
        { class: 'relocation-step' },
        transferButton(deps, 'Porta i miei appunti nel nuovo Glifo', () => {
          status.textContent = transferredMessage()
        }),
        h(
          'p',
          { class: 'field-help' },
          `Apre ${NEW_HOST} e ci copia note, cartelle, dizionario e lavagne di questo browser. Se non funziona (per esempio dall'app installata sul telefono), usa il backup qui sotto.`,
        ),
      ),
      h(
        'div',
        { class: 'relocation-step' },
        downloadButton(deps),
        h('p', { class: 'field-help' }, `Un file con tutti i tuoi appunti, da aprire su ${NEW_HOST} con «Ripristina backup» (Impostazioni → I tuoi dati).`),
      ),
      status,
      deps.account
        ? h(
            'p',
            { class: 'field-help' },
            `Con l'account: su ${NEW_HOST} entra con la stessa email o con Google e ritrovi le note. Le lavagne invece sono solo in questo browser: portale con il primo pulsante.`,
          )
        : null,
      h(
        'p',
        { class: 'field-help' },
        `Se avevi installato Glifo come app, installalo di nuovo da ${NEW_HOST}. Quella vecchia puoi toglierla dopo aver portato gli appunti.`,
      ),
      openNewSite(`Vai su ${NEW_HOST} →`, 'relocation-open'),
    ),
  )
  // Esc non la chiude: sotto Glifo non si usa più.
  dialog.addEventListener('cancel', (ev) => ev.preventDefault())
  document.body.append(dialog)
  dialog.showModal()
  return dialog
}

const DONE_KEY = 'glifo.trasloco'

/** Il messaggio da mostrare dopo aver ricaricato la pagina con gli appunti arrivati (resta solo in questa scheda). */
export function leaveRelocationDone(message: string): void {
  try {
    sessionStorage.setItem(DONE_KEY, message)
  } catch {
    /* sessionStorage non disponibile: niente messaggio */
  }
}

/** Il messaggio lasciato prima di ricaricare, se c'è (e lo toglie). */
export function takeRelocationDone(): string | null {
  try {
    const message = sessionStorage.getItem(DONE_KEY)
    sessionStorage.removeItem(DONE_KEY)
    return message
  } catch {
    return null
  }
}

/** Sul sito nuovo, dopo il trasloco degli appunti: cosa è arrivato e cosa fare dell'app installata. */
export function showRelocationDone(message: string): HTMLDialogElement {
  const dialog = dialogShell(
    'Benvenuto nel nuovo Glifo',
    [
      h('p', { class: 'confirm-message' }, message),
      h('p', { class: 'field-help confirm-note' }, 'Se avevi installato Glifo come app, installalo di nuovo da qui: quella vecchia puoi toglierla.'),
      h(
        'div',
        { class: 'dialog-actions' },
        h('button', { class: 'btn btn-primary', attrs: { type: 'button', autofocus: true }, on: { click: () => dialog.close() } }, 'Va bene'),
      ),
    ],
    'dialog-confirm',
  )
  dialog.showModal()
  return dialog
}
