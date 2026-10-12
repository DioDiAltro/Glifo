import { SyncError } from '../account/sync'
import { confirmDialog, dialogShell } from '../ui/dialogs'
import { h, icon, ICONS } from '../ui/dom'
import { toast } from '../ui/toast'
import { texts } from '../i18n'
import { sha256Hex, shareUrl, snapshotWhen, type SharedLink } from './link'

const T = texts({
  printTitle: ['Stampa la nota o salvala in PDF', 'Print the note or save it as PDF'],
  print: ['Stampa o PDF', 'Print or PDF'],
  // `action`: quello che non è riuscito, da mettere nella frase («creare il link» / «create the link»).
  needsConnection: (action: string) => [`Per ${action} serve la connessione.`, `You need a connection to ${action}.`],
  signInExpired: ['L\'accesso è scaduto: accedi di nuovo, poi riprova.', 'Your sign-in has expired: sign in again, then try again.'],
  notInAccount: [
    'La nota non è ancora arrivata all\'account: scrivi qualcosa o aspetta un momento, poi riprova.',
    'The note hasn\'t reached your account yet: write something or wait a moment, then try again.',
  ],
  couldNot: (action: string) => [`Non è stato possibile ${action}: riprova tra poco.`, `Couldn't ${action}: try again in a moment.`],
  createLink: ['creare il link', 'create the link'],
  removeLink: ['togliere il link', 'remove the link'],
  updateLink: ['aggiornare il link', 'update the link'],
  changePermission: ['cambiare il permesso', 'change the permission'],
  checkLink: ['controllare il link', 'check the link'],
  whoCanOpen: ['Chi può aprire il link', 'Who can open the link'],
  restricted: ['Con limitazioni', 'Restricted'],
  anyoneWithLink: ['Chiunque abbia il link', 'Anyone with the link'],
  noteLink: ['Il link della nota', 'The note\'s link'],
  updateButton: ['Aggiorna il link', 'Update link'],
  copyLink: ['Copia link', 'Copy link'],
  shareTitle: (title: string) => [`Condividi «${title}»`, `Share “${title}”`],
  linkAccess: ['Accesso con il link', 'Link access'],
  allowCopies: ['Consenti copie', 'Allow copies'],
  allowCopiesHelp: ['Chi apre il link può salvarsene una copia tra i suoi appunti.', 'Whoever opens the link can save a copy to their own notes.'],
  done: ['Fine', 'Done'],
  anyoneCanView: ['Chiunque abbia il link può vedere la nota, anche senza account.', 'Anyone with the link can view the note, even without an account.'],
  onlyYou: ['Solo tu puoi vedere questa nota.', 'Only you can view this note.'],
  // `when`: quando è stata fatta la fotografia (snapshotWhen, link.ts: «di oggi alle 10:32» / «from today at 10:32 AM»).
  changedSince: (when: string) => [
    `Il link mostra la nota com'era nella fotografia ${when}: dopo è cambiata.`,
    `The link shows the note as it was in the snapshot ${when}: it has changed since.`,
  ],
  upToDate: (when: string) => [`Il link mostra la nota com'è adesso (fotografia ${when}).`, `The link shows the note as it is now (snapshot ${when}).`],
  creating: ['Creo il link…', 'Creating the link…'],
  removeTitle: ['Togliere il link?', 'Remove the link?'],
  removeMessage: [
    'Chi ha il link non potrà più aprire la nota. Se la condividi di nuovo, il link sarà un altro.',
    'People with the link won\'t be able to open the note anymore. If you share it again, it will have a new link.',
  ],
  removeConfirm: ['Togli il link', 'Remove link'],
  removing: ['Tolgo il link…', 'Removing the link…'],
  updating: ['Aggiorno il link…', 'Updating the link…'],
  updated: ['Link aggiornato: mostra la nota di adesso', 'Link updated: it shows the note as it is now'],
  saving: ['Salvo…', 'Saving…'],
  copied: ['Link copiato', 'Link copied'],
  selected: ['Il link è selezionato: copialo con Ctrl+C', 'The link is selected: copy it with Ctrl+C'],
  checking: ['Controllo se la nota ha già un link…', 'Checking whether the note already has a link…'],
  needsAccount: [
    'Per condividere una nota con un link serve l\'account: la fotografia della nota resta nell\'account, e chi ha il link la apre anche senza.',
    'To share a note with a link you need an account: the snapshot of the note is kept in your account, and people with the link can open it even without one.',
  ],
  printWithout: ['Senza account puoi stamparla o salvarla in PDF.', 'Without an account, you can print it or save it as PDF.'],
  cancel: ['Annulla', 'Cancel'],
  signIn: ['Accedi', 'Sign in'],
})

/** Quello che serve al dialogo per parlare con l'account (già legato a chi ha fatto l'accesso). */
export interface ShareServer {
  /** Salva e sincronizza: la nota deve essere nell'account prima di condividerla. */
  prepare(): Promise<void>
  get(noteId: string): Promise<SharedLink | null>
  share(note: { id: string; title: string; content: string }, allowCopy: boolean): Promise<SharedLink>
  setCopy(noteId: string, allowCopy: boolean): Promise<SharedLink | null>
  unshare(noteId: string): Promise<void>
}

export interface ShareDialogDeps {
  noteId: string
  /** Il titolo e il testo della nota adesso. */
  note(): { title: string; content: string }
  /** Null senza account: allora il dialogo spiega che serve e propone di accedere. */
  server: ShareServer | null
  onLogin(): void
  /** «Stampa o PDF»: anche senza account (non c'è dove la stampa non funziona, dentro claude.ai). */
  onPrint?(): void
}

/** Il pulsante «Stampa o PDF»: chiude la finestra e stampa la nota (o la salva in PDF). */
function printButton(dialog: () => HTMLDialogElement, onPrint: (() => void) | undefined): HTMLElement | null {
  if (!onPrint) return null
  return h(
    'button',
    {
      class: 'btn share-print',
      title: T.printTitle,
      attrs: { type: 'button' },
      on: {
        click: () => {
          dialog().close()
          onPrint()
        },
      },
    },
    icon(ICONS.print, 16),
    T.print,
  )
}

/** Cosa dire se un'operazione sul link non riesce (`action`: «creare il link»…). */
export function shareProblem(err: unknown, action: string): string {
  if (err instanceof SyncError) {
    if (err.kind === 'offline') return T.needsConnection(action)
    if (err.kind === 'auth') return T.signInExpired
    if (err.kind === 'quota') return err.message
    if (err.hint === 'missing') return T.notInAccount
  }
  return T.couldNot(action)
}

/**
 * «Condividi»: come nei servizi di Google, l'accesso con il link è «Con limitazioni» (solo tu)
 * oppure «Chiunque abbia il link». Il link mostra una fotografia della nota, come le conversazioni
 * condivise di Gemini: se poi la nota cambia, «Aggiorna il link». «Consenti copie»: chi apre il
 * link può salvarsene una copia tra i suoi appunti.
 */
export function openShareDialog(deps: ShareDialogDeps): HTMLDialogElement {
  const { title } = deps.note()
  if (!deps.server) return openSignedOut(title, deps.onLogin, deps.onPrint)
  const server = deps.server

  let link: SharedLink | null = null
  let allowCopy = true
  /** La nota è cambiata dopo la fotografia. */
  let changed = false
  let busy = true

  const access = h(
    'select',
    { attrs: { 'aria-label': T.whoCanOpen }, on: { change: () => void changeAccess() } },
    h('option', { attrs: { value: 'none' } }, T.restricted),
    h('option', { attrs: { value: 'link' } }, T.anyoneWithLink),
  )
  const accessHelp = h('p', { class: 'field-help share-access-help' })
  const urlInput = h('input', {
    class: 'share-url',
    attrs: { type: 'text', readonly: true, 'aria-label': T.noteLink },
    on: { focus: () => urlInput.select() },
  })
  const snapshot = h('p', { class: 'field-help share-snapshot' })
  const updateButton = h(
    'button',
    { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => void update() } },
    icon(ICONS.refresh, 14),
    T.updateButton,
  )
  const linkBox = h('div', { class: 'share-link', attrs: { hidden: true } }, urlInput, h('div', { class: 'share-snapshot-row' }, snapshot, updateButton))
  const copyBox = h('input', {
    attrs: { type: 'checkbox', checked: true },
    on: { change: () => void changeCopy() },
  })
  const status = h('p', { class: 'share-status', attrs: { role: 'status', 'aria-live': 'polite' } })
  const copyLink = h(
    'button',
    { class: 'btn', attrs: { type: 'button' }, on: { click: () => void copy() } },
    icon(ICONS.link, 16),
    T.copyLink,
  )

  const dialog = dialogShell(
    T.shareTitle(title),
    [
      h('h3', { class: 'share-heading' }, T.linkAccess),
      h(
        'div',
        { class: 'share-access' },
        h('span', { class: 'share-access-icon', attrs: { 'aria-hidden': 'true' } }, icon(ICONS.link, 18)),
        h('div', { class: 'share-access-main' }, access, accessHelp),
      ),
      linkBox,
      h(
        'label',
        { class: 'check share-copy' },
        copyBox,
        h(
          'span',
          {},
          h('strong', {}, T.allowCopies),
          h('span', { class: 'field-help' }, T.allowCopiesHelp),
        ),
      ),
      status,
      h(
        'div',
        { class: 'dialog-actions share-actions' },
        copyLink,
        printButton(() => dialog, deps.onPrint),
        h('span', { class: 'share-actions-spacer' }),
        h('button', { class: 'btn btn-primary', attrs: { type: 'button' }, on: { click: () => dialog.close() } }, T.done),
      ),
    ],
    'dialog-share',
  )

  function render(): void {
    // Mentre si aspetta il server restano come li ha messi chi usa il dialogo.
    if (!busy) access.value = link ? 'link' : 'none'
    accessHelp.textContent = link ? T.anyoneCanView : T.onlyYou
    linkBox.hidden = !link
    if (link) {
      urlInput.value = shareUrl(link.token)
      snapshot.textContent = changed ? T.changedSince(snapshotWhen(link.updatedAt)) : T.upToDate(snapshotWhen(link.updatedAt))
      updateButton.hidden = !changed
    }
    if (!busy) copyBox.checked = link ? link.allowCopy : allowCopy
    for (const control of [access, copyBox, updateButton]) control.disabled = busy
    copyLink.disabled = busy || !link
  }

  function setStatus(message: string, isError = false): void {
    status.textContent = message
    status.classList.toggle('is-error', isError)
  }

  /** Esegue un'operazione sul link: intanto i controlli sono fermi, e gli errori si leggono sotto. */
  async function run(message: string, action: string, task: () => Promise<void>): Promise<boolean> {
    busy = true
    setStatus(message)
    render()
    try {
      await task()
      setStatus('')
      return true
    } catch (err) {
      setStatus(shareProblem(err, action), true)
      return false
    } finally {
      busy = false
      render()
    }
  }

  async function refreshChanged(): Promise<void> {
    changed = !!link && (await sha256Hex(deps.note().content)) !== link.contentHash
  }

  async function shareNow(): Promise<void> {
    await server.prepare()
    const note = deps.note()
    link = await server.share({ id: deps.noteId, title: note.title, content: note.content }, link?.allowCopy ?? allowCopy)
    await refreshChanged()
  }

  async function changeAccess(): Promise<void> {
    if (access.value === 'link') {
      await run(T.creating, T.createLink, shareNow)
      return
    }
    access.value = 'link'
    const ok = await confirmDialog({
      title: T.removeTitle,
      message: T.removeMessage,
      confirmLabel: T.removeConfirm,
      danger: true,
    })
    if (!ok) return
    await run(T.removing, T.removeLink, async () => {
      await server.unshare(deps.noteId)
      link = null
      changed = false
    })
  }

  async function update(): Promise<void> {
    if (await run(T.updating, T.updateLink, shareNow)) toast(T.updated)
  }

  async function changeCopy(): Promise<void> {
    if (!link) {
      allowCopy = copyBox.checked
      return
    }
    const wanted = copyBox.checked
    await run(T.saving, T.changePermission, async () => {
      link = (await server.setCopy(deps.noteId, wanted)) ?? link
    })
  }

  async function copy(): Promise<void> {
    if (!link) return
    try {
      await navigator.clipboard.writeText(urlInput.value)
      toast(T.copied)
    } catch {
      urlInput.focus()
      urlInput.select()
      toast(T.selected)
    }
  }

  render()
  dialog.showModal()
  void run(T.checking, T.checkLink, async () => {
    link = await server.get(deps.noteId)
    await refreshChanged()
  })
  return dialog
}

/** Senza account: il link si può creare solo con l'account, che tiene la fotografia della nota. */
function openSignedOut(title: string, onLogin: () => void, onPrint?: () => void): HTMLDialogElement {
  const dialog: HTMLDialogElement = dialogShell(
    T.shareTitle(title),
    [
      h('p', { class: 'confirm-message' }, T.needsAccount),
      onPrint ? h('p', { class: 'field-help' }, T.printWithout) : null,
      h(
        'div',
        { class: 'dialog-actions share-actions' },
        printButton(() => dialog, onPrint),
        h('span', { class: 'share-actions-spacer' }),
        h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => dialog.close() } }, T.cancel),
        h(
          'button',
          {
            class: 'btn btn-primary',
            attrs: { type: 'button', autofocus: true },
            on: {
              click: () => {
                dialog.close()
                onLogin()
              },
            },
          },
          T.signIn,
        ),
      ),
    ],
    'dialog-share',
  )
  dialog.showModal()
  return dialog
}
