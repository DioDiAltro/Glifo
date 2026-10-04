import { SyncError } from '../account/sync'
import { confirmDialog, dialogShell } from '../ui/dialogs'
import { h, icon, ICONS } from '../ui/dom'
import { toast } from '../ui/toast'
import { sha256Hex, shareUrl, snapshotWhen, type SharedLink } from './link'

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
}

/** Cosa dire se un'operazione sul link non riesce (`action`: «creare il link»…). */
export function shareProblem(err: unknown, action: string): string {
  if (err instanceof SyncError) {
    if (err.kind === 'offline') return `Per ${action} serve la connessione.`
    if (err.kind === 'auth') return 'L\'accesso è scaduto: accedi di nuovo, poi riprova.'
    if (err.kind === 'quota') return err.message
    if (err.hint === 'missing') return 'La nota non è ancora arrivata all\'account: scrivi qualcosa o aspetta un momento, poi riprova.'
  }
  return `Non è stato possibile ${action}: riprova tra poco.`
}

/**
 * «Condividi»: come nei servizi di Google, l'accesso con il link è «Con limitazioni» (solo tu)
 * oppure «Chiunque abbia il link». Il link mostra una fotografia della nota, come le conversazioni
 * condivise di Gemini: se poi la nota cambia, «Aggiorna il link». «Consenti copie»: chi apre il
 * link può salvarsene una copia tra i suoi appunti.
 */
export function openShareDialog(deps: ShareDialogDeps): HTMLDialogElement {
  const { title } = deps.note()
  if (!deps.server) return openSignedOut(title, deps.onLogin)
  const server = deps.server

  let link: SharedLink | null = null
  let allowCopy = true
  /** La nota è cambiata dopo la fotografia. */
  let changed = false
  let busy = true

  const access = h(
    'select',
    { attrs: { 'aria-label': 'Chi può aprire il link' }, on: { change: () => void changeAccess() } },
    h('option', { attrs: { value: 'none' } }, 'Con limitazioni'),
    h('option', { attrs: { value: 'link' } }, 'Chiunque abbia il link'),
  )
  const accessHelp = h('p', { class: 'field-help share-access-help' })
  const urlInput = h('input', {
    class: 'share-url',
    attrs: { type: 'text', readonly: true, 'aria-label': 'Il link della nota' },
    on: { focus: () => urlInput.select() },
  })
  const snapshot = h('p', { class: 'field-help share-snapshot' })
  const updateButton = h(
    'button',
    { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => void update() } },
    icon(ICONS.refresh, 14),
    'Aggiorna il link',
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
    'Copia link',
  )

  const dialog = dialogShell(
    `Condividi «${title}»`,
    [
      h('h3', { class: 'share-heading' }, 'Accesso con il link'),
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
          h('strong', {}, 'Consenti copie'),
          h('span', { class: 'field-help' }, 'Chi apre il link può salvarsene una copia tra i suoi appunti.'),
        ),
      ),
      status,
      h(
        'div',
        { class: 'dialog-actions share-actions' },
        copyLink,
        h('span', { class: 'share-actions-spacer' }),
        h('button', { class: 'btn btn-primary', attrs: { type: 'button' }, on: { click: () => dialog.close() } }, 'Fine'),
      ),
    ],
    'dialog-share',
  )

  function render(): void {
    // Mentre si aspetta il server restano come li ha messi chi usa il dialogo.
    if (!busy) access.value = link ? 'link' : 'none'
    accessHelp.textContent = link
      ? 'Chiunque abbia il link può vedere la nota, anche senza account.'
      : 'Solo tu puoi vedere questa nota.'
    linkBox.hidden = !link
    if (link) {
      urlInput.value = shareUrl(link.token)
      snapshot.textContent = changed
        ? `Il link mostra la nota com'era nella fotografia ${snapshotWhen(link.updatedAt)}: dopo è cambiata.`
        : `Il link mostra la nota com'è adesso (fotografia ${snapshotWhen(link.updatedAt)}).`
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
      await run('Creo il link…', 'creare il link', shareNow)
      return
    }
    access.value = 'link'
    const ok = await confirmDialog({
      title: 'Togliere il link?',
      message: 'Chi ha il link non potrà più aprire la nota. Se la condividi di nuovo, il link sarà un altro.',
      confirmLabel: 'Togli il link',
      danger: true,
    })
    if (!ok) return
    await run('Tolgo il link…', 'togliere il link', async () => {
      await server.unshare(deps.noteId)
      link = null
      changed = false
    })
  }

  async function update(): Promise<void> {
    if (await run('Aggiorno il link…', 'aggiornare il link', shareNow)) toast('Link aggiornato: mostra la nota di adesso')
  }

  async function changeCopy(): Promise<void> {
    if (!link) {
      allowCopy = copyBox.checked
      return
    }
    const wanted = copyBox.checked
    await run('Salvo…', 'cambiare il permesso', async () => {
      link = (await server.setCopy(deps.noteId, wanted)) ?? link
    })
  }

  async function copy(): Promise<void> {
    if (!link) return
    try {
      await navigator.clipboard.writeText(urlInput.value)
      toast('Link copiato')
    } catch {
      urlInput.focus()
      urlInput.select()
      toast('Il link è selezionato: copialo con Ctrl+C')
    }
  }

  render()
  dialog.showModal()
  void run('Controllo se la nota ha già un link…', 'controllare il link', async () => {
    link = await server.get(deps.noteId)
    await refreshChanged()
  })
  return dialog
}

/** Senza account: il link si può creare solo con l'account, che tiene la fotografia della nota. */
function openSignedOut(title: string, onLogin: () => void): HTMLDialogElement {
  const dialog = dialogShell(
    `Condividi «${title}»`,
    [
      h(
        'p',
        { class: 'confirm-message' },
        'Per condividere una nota con un link serve l\'account: la fotografia della nota resta nell\'account, e chi ha il link la apre anche senza.',
      ),
      h(
        'div',
        { class: 'dialog-actions' },
        h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => dialog.close() } }, 'Annulla'),
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
          'Accedi',
        ),
      ),
    ],
    'dialog-share',
  )
  dialog.showModal()
  return dialog
}
