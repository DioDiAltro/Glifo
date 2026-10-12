import { rich, texts } from '../i18n'
import { moveDayLabel, NEW_ORIGIN, RelocationError, relocationMessage, type RelocationResult } from '../relocation'
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

const T = texts({
  popupBlocked: (host: string) => [
    `Il browser ha bloccato la finestra di ${host}: permetti le finestre per questo sito e riprova, oppure scarica il backup.`,
    `The browser blocked the ${host} window: allow pop-ups for this site and try again, or download the backup.`,
  ],
  noAnswer: (host: string) => [
    `${host} non ha risposto. Riprova tra poco, oppure scarica il backup e aprilo su ${host} con «Ripristina backup».`,
    `${host} didn't respond. Try again in a moment, or download the backup and open it on ${host} with “Restore backup”.`,
  ],
  failed: (host: string) => [
    `Gli appunti non sono arrivati su ${host}. Riprova, oppure scarica il backup e aprilo lì con «Ripristina backup».`,
    `Your notes didn't reach ${host}. Try again, or download the backup and open it there with “Restore backup”.`,
  ],
  moving: ['Porto gli appunti…', 'Moving your notes…'],
  downloadBackup: ['Scarica il backup', 'Download the backup'],
  transferred: (host: string) => [`Fatto: i tuoi appunti sono su ${host}. Da ora usa quell'indirizzo.`, `Done: your notes are on ${host}. From now on, use that address.`],
  bannerLabel: ['Glifo cambia indirizzo', 'Glifo is moving'],
  bannerTitle: (host: string) => [`Glifo si sposta su ${host}.`, `Glifo is moving to ${host}.`],
  bannerText: (day: string) => [
    ` Da ${day} si usa solo lì: porta adesso i tuoi appunti, lavagne comprese.`,
    ` From ${day} it only works there: bring your notes over now, whiteboards included.`,
  ],
  bringNotes: ['Porta i miei appunti', 'Bring my notes'],
  open: (host: string) => [`Apri ${host}`, `Open ${host}`],
  close: ['Chiudi', 'Close'],
  closeNotice: ['Chiudi l\'avviso', 'Close the notice'],
  nowAt: (host: string) => [`Glifo ora è su ${host}`, `Glifo is now at ${host}`],
  pageText: (day: string) => [
    `Da ${day} Glifo si usa all'indirizzo {link}. Questo indirizzo resta aperto ancora per un po', solo per portare via i tuoi appunti.`,
    `Since ${day} Glifo lives at {link}. This address stays open a little longer, only so you can take your notes with you.`,
  ],
  bringToNew: ['Porta i miei appunti nel nuovo Glifo', 'Bring my notes to the new Glifo'],
  bringHelp: (host: string) => [
    `Apre ${host} e ci copia note, cartelle, dizionario e lavagne di questo browser. Se non funziona (per esempio dall'app installata sul telefono), usa il backup qui sotto.`,
    `Opens ${host} and copies this browser's notes, folders, dictionary and whiteboards there. If it doesn't work (for example from the app installed on your phone), use the backup below.`,
  ],
  backupHelp: (host: string) => [
    `Un file con tutti i tuoi appunti, da aprire su ${host} con «Ripristina backup» (Impostazioni → I tuoi dati).`,
    `A file with all your notes, to open on ${host} with “Restore backup” (Settings → Your data).`,
  ],
  accountHelp: (host: string) => [
    `Con l'account: su ${host} entra con la stessa email o con Google e ritrovi le note. Le lavagne invece sono solo in questo browser: portale con il primo pulsante.`,
    `With an account: on ${host} sign in with the same email or with Google and you'll find your notes. Whiteboards, though, are only in this browser: bring them over with the first button.`,
  ],
  installAgain: (host: string) => [
    `Se avevi installato Glifo come app, installalo di nuovo da ${host}. Quella vecchia puoi toglierla dopo aver portato gli appunti.`,
    `If you installed Glifo as an app, install it again from ${host}. You can remove the old one after bringing your notes over.`,
  ],
  goTo: (host: string) => [`Vai su ${host} →`, `Go to ${host} →`],
  welcome: ['Benvenuto nel nuovo Glifo', 'Welcome to the new Glifo'],
  installHere: [
    'Se avevi installato Glifo come app, installalo di nuovo da qui: quella vecchia puoi toglierla.',
    'If you installed Glifo as an app, install it again from here: you can remove the old one.',
  ],
  ok: ['Va bene', 'OK'],
})

/** Cosa dire se gli appunti non sono arrivati. */
export function relocationErrorMessage(error: unknown): string {
  const reason = error instanceof RelocationError ? error.reason : 'failed'
  if (reason === 'popup') return T.popupBlocked(NEW_HOST)
  if (reason === 'timeout') return T.noAnswer(NEW_HOST)
  return T.failed(NEW_HOST)
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
          button.textContent = T.moving
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
  return h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => deps.download() } }, icon(ICONS.download, 16), T.downloadBackup)
}

function openNewSite(label: string, extraClass = ''): HTMLAnchorElement {
  return h('a', { class: `btn ${extraClass}`.trim(), attrs: { href: `${NEW_ORIGIN}/`, target: '_blank', rel: 'noopener' } }, label)
}

/** Il messaggio sul vecchio sito, dopo che gli appunti sono arrivati. */
export function transferredMessage(): string {
  return T.transferred(NEW_HOST)
}

/**
 * La fascia in cima al vecchio sito, dal giorno dell'avviso al trasloco. Si chiude con ×, ma solo per
 * questa volta: riaprendo Glifo torna.
 */
export function relocationBanner(deps: RelocationUiDeps): HTMLElement {
  const banner: HTMLElement = h(
    'div',
    { class: 'relocation-banner', attrs: { role: 'region', 'aria-label': T.bannerLabel } },
    h(
      'p',
      { class: 'relocation-banner-text' },
      h('strong', {}, T.bannerTitle(NEW_HOST)),
      T.bannerText(moveDayLabel()),
    ),
    h(
      'div',
      { class: 'relocation-banner-actions' },
      transferButton(deps, T.bringNotes, () => toast(transferredMessage())),
      downloadButton(deps),
      openNewSite(T.open(NEW_HOST)),
      h(
        'button',
        {
          class: 'icon-button relocation-banner-close',
          title: T.close,
          attrs: { type: 'button', 'aria-label': T.closeNotice },
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
    { class: 'relocation-page', attrs: { 'aria-label': T.nowAt(NEW_HOST) } },
    h(
      'div',
      // Il fuoco va sulla scheda, non sul primo link: niente riquadro del fuoco in mezzo al testo.
      { class: 'relocation-card', attrs: { tabindex: '-1', autofocus: true } },
      h('div', { class: 'relocation-logo', html: logoMark() }),
      h('h1', {}, T.nowAt(NEW_HOST)),
      h('p', {}, ...rich(T.pageText(moveDayLabel()), { link: h('a', { attrs: { href: `${NEW_ORIGIN}/` } }, NEW_HOST) })),
      h(
        'div',
        { class: 'relocation-step' },
        transferButton(deps, T.bringToNew, () => {
          status.textContent = transferredMessage()
        }),
        h('p', { class: 'field-help' }, T.bringHelp(NEW_HOST)),
      ),
      h(
        'div',
        { class: 'relocation-step' },
        downloadButton(deps),
        h('p', { class: 'field-help' }, T.backupHelp(NEW_HOST)),
      ),
      status,
      deps.account
        ? h('p', { class: 'field-help' }, T.accountHelp(NEW_HOST))
        : null,
      h('p', { class: 'field-help' }, T.installAgain(NEW_HOST)),
      openNewSite(T.goTo(NEW_HOST), 'relocation-open'),
    ),
  )
  // Esc non la chiude: sotto Glifo non si usa più.
  dialog.addEventListener('cancel', (ev) => ev.preventDefault())
  document.body.append(dialog)
  dialog.showModal()
  return dialog
}

const DONE_KEY = 'glifo.trasloco'

/**
 * Quello che è arrivato, da dire dopo aver ricaricato la pagina (resta solo in questa scheda). Si tengono
 * i numeri e non la frase: con le impostazioni arrivate la pagina può ricaricarsi in un'altra lingua.
 */
export function leaveRelocationDone(result: RelocationResult): void {
  try {
    sessionStorage.setItem(DONE_KEY, JSON.stringify(result))
  } catch {
    /* sessionStorage non disponibile: niente messaggio */
  }
}

/** Quello che è arrivato, lasciato prima di ricaricare, se c'è (e lo toglie). */
export function takeRelocationDone(): RelocationResult | null {
  try {
    const saved = sessionStorage.getItem(DONE_KEY)
    sessionStorage.removeItem(DONE_KEY)
    const r: unknown = saved ? JSON.parse(saved) : null
    const count = (k: string) => (typeof r === 'object' && r !== null ? (r as Record<string, unknown>)[k] : null)
    const keys = ['added', 'already', 'accountNotes', 'boards']
    if (!keys.every((k) => typeof count(k) === 'number')) return null
    return r as RelocationResult
  } catch {
    return null
  }
}

/** Sul sito nuovo, dopo il trasloco degli appunti: cosa è arrivato e cosa fare dell'app installata. */
export function showRelocationDone(result: RelocationResult): HTMLDialogElement {
  const dialog = dialogShell(
    T.welcome,
    [
      h('p', { class: 'confirm-message' }, relocationMessage(result)),
      h('p', { class: 'field-help confirm-note' }, T.installHere),
      h(
        'div',
        { class: 'dialog-actions' },
        h('button', { class: 'btn btn-primary', attrs: { type: 'button', autofocus: true }, on: { click: () => dialog.close() } }, T.ok),
      ),
    ],
    'dialog-confirm',
  )
  dialog.showModal()
  return dialog
}
