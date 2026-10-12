import { touchLog } from '../board/touchlog'
import { texts } from '../i18n'
import { downloadText } from '../store/files'
import { ICONS, h, icon } from './dom'
import { toast } from './toast'

/**
 * Il registro dei tocchi della lavagna (src/board/touchlog.ts) nell'interfaccia: acceso e spento,
 * quante righe ha, e i modi per mandarlo a Claude (Copia, Scarica, Condividi). Sta nelle impostazioni
 * e nella finestra che apre il pallino rosso sulla lavagna.
 */

/**
 * Quello che si vede è nella lingua di Glifo; le righe del registro (qui sotto in `touchLogHeader` e in
 * src/board/touchlog.ts) restano in italiano: le legge Claude, per capire cosa è successo.
 */
const T = texts({
  whatHappened: ['Cosa è successo', 'What happened'],
  whatHappenedHint: [
    'Cosa è successo? Per esempio: «scrivendo in basso a destra la lavagna si è spostata». Facoltativo.',
    'What happened? For example: “writing at the bottom right, the whiteboard moved”. Optional.',
  ],
  copy: ['Copia', 'Copy'],
  copied: (size: string) => [`Registro copiato (${size}): incollalo nella chat con Claude`, `Log copied (${size}): paste it into the chat with Claude`],
  cantCopy: ['Non riesco a copiarlo: usa «Scarica» e allega il file nella chat con Claude', 'I can\'t copy it: use “Download” and attach the file in the chat with Claude'],
  download: ['Scarica', 'Download'],
  downloaded: ['Registro scaricato: allegalo nella chat con Claude', 'Log downloaded: attach it in the chat with Claude'],
  share: ['Condividi', 'Share'],
  shareTitle: ['Registro dei tocchi di Glifo', 'Glifo touch log'],
  cantShare: ['Non riesco a condividerlo: usa «Copia» o «Scarica»', 'I can\'t share it: use “Copy” or “Download”'],
  clear: ['Svuota', 'Clear'],
  cleared: ['Registro svuotato', 'Log cleared'],
  legend: ['Registro dei tocchi (lavagna)', 'Touch log (whiteboard)'],
  record: ['Registra i tocchi sulla lavagna: penna, dita e quello che fa il browser', 'Record touches on the whiteboard: pen, fingers and what the browser does'],
  help: [
    'Serve a capire i problemi su un dispositivo che Claude non ha, come l\'iPad con la penna. Accendilo, usa la lavagna finché succede il problema, poi premi il pallino rosso sulla lavagna (o torna qui), scrivi cosa è successo e mandalo nella chat con Claude: «Copia» per incollarlo, «Scarica» o «Condividi» per allegarlo. Resta in questo browser finché non lo mandi tu, e non contiene il testo delle note.',
    'It helps understand problems on a device Claude doesn\'t have, like an iPad with a pen. Turn it on, use the whiteboard until the problem happens, then press the red dot on the whiteboard (or come back here), write what happened and send it in the chat with Claude: “Copy” to paste it, “Download” or “Share” to attach it. It stays in this browser until you send it, and it doesn\'t contain the text of your notes.',
  ],
  recording: (n: number) => [`Sta registrando: ${n} ${n === 1 ? 'riga' : 'righe'}.`, `Recording: ${n} ${n === 1 ? 'line' : 'lines'}.`],
  offWith: (n: number) => [`Spento, con ${n} ${n === 1 ? 'riga' : 'righe'} registrate.`, `Off, with ${n} ${n === 1 ? 'line' : 'lines'} recorded.`],
  off: ['Spento.', 'Off.'],
})

/** La versione di Glifo (il commit pubblicato, vedi vite.config.ts). */
declare const __GLIFO_VERSION__: string

/** Le righe in cima al registro: Glifo, il dispositivo e come è messa l'app. */
export function touchLogHeader(): string[] {
  const nav = navigator as Navigator & { standalone?: boolean }
  const installed = matchMedia('(display-mode: standalone)').matches || nav.standalone === true
  const app = document.querySelector<HTMLElement>('.app')
  const board = document.querySelector<HTMLElement>('.board-pane')
  const theme = document.documentElement.dataset.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'scuro dal sistema' : 'chiaro dal sistema')
  const views: Record<string, string> = { editor: 'Editor', split: 'Diviso', preview: 'Anteprima', board: 'Lavagna' }
  const tools: Record<string, string> = { pen: 'penna', highlight: 'evidenziatore', eraser: 'gomma', lasso: 'selezione' }
  const tool = tools[board?.dataset.tool ?? ''] ?? '?'
  const eraser =
    board?.dataset.tool === 'eraser'
      ? board.dataset.eraser === 'stroke'
        ? ' (linea intera)'
        : ' (dove passa)'
      : board?.dataset.tool === 'lasso'
        ? ` (${board.dataset.selected ?? '0'} tratti selezionati)`
        : ''
  return [
    `Copiato: ${new Date().toLocaleString('it-IT')} · Glifo ${__GLIFO_VERSION__}`,
    `Dispositivo: ${nav.userAgent}`,
    `Tocchi insieme: ${nav.maxTouchPoints} · schermo ${screen.width}×${screen.height} ×${devicePixelRatio} · finestra ${innerWidth}×${innerHeight} · ${installed ? 'app installata' : 'nel browser'}`,
    `Glifo: vista ${views[app?.dataset.view ?? ''] ?? '?'} · lavagna ${board?.classList.contains('is-full') ? 'a tutto schermo' : 'non a tutto schermo'} · penna vista ${board?.dataset.pen === 'true' ? 'sì' : 'no'} · strumento ${tool}${eraser} · forme ${board?.dataset.shapes === 'auto' ? 'automatiche' : 'tenendo ferma la penna'} · tema ${theme}`,
  ]
}

/** Il nome del file: glifo-registro-2026-10-05-1830.txt. */
export function touchLogFileName(date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `glifo-registro-${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}-${p(date.getHours())}${p(date.getMinutes())}.txt`
}

const kb = (text: string) => `${Math.max(1, Math.round(new Blob([text]).size / 1024))} KB`

/** Il riquadro del registro, per le impostazioni e per la finestra della lavagna. */
export function touchLogFieldset(): HTMLElement {
  const toggle = h('input', {
    attrs: { type: 'checkbox' },
    on: { change: () => (toggle.checked ? touchLog.start() : touchLog.stop()) },
  })
  const status = h('p', { class: 'field-help touch-log-status', attrs: { 'aria-live': 'polite' } })
  const note = h('textarea', {
    class: 'touch-log-note',
    attrs: {
      rows: 2,
      'aria-label': T.whatHappened,
      placeholder: T.whatHappenedHint,
    },
  })
  const text = () => touchLog.text(touchLogHeader(), note.value)
  const button = (label: string, paths: string, onClick: () => void) =>
    h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: onClick } }, icon(paths, 15), label)

  const copy = button(T.copy, ICONS.copy, async () => {
    const value = text()
    try {
      await navigator.clipboard.writeText(value)
      toast(T.copied(kb(value)))
    } catch {
      toast(T.cantCopy, 'error')
    }
  })
  const save = button(T.download, ICONS.download, async () => {
    if (await downloadText(touchLogFileName(), text())) toast(T.downloaded)
  })
  // Sull'iPad «Condividi» apre il menu del sistema: di lì si manda all'app di Claude, alla posta…
  const fileOf = () => new File([text()], touchLogFileName(), { type: 'text/plain' })
  const canShare = typeof navigator.canShare === 'function' && navigator.canShare({ files: [new File(['prova'], 'prova.txt', { type: 'text/plain' })] })
  const share = button(T.share, ICONS.share, async () => {
    try {
      await navigator.share({ files: [fileOf()], title: T.shareTitle })
    } catch (err) {
      if ((err as Error).name !== 'AbortError') toast(T.cantShare, 'error')
    }
  })
  share.hidden = !canShare
  const clear = button(T.clear, ICONS.trash, () => {
    touchLog.clear()
    note.value = ''
    toast(T.cleared)
  })

  const fieldset = h(
    'fieldset',
    { class: 'touch-log' },
    h('legend', {}, T.legend),
    h('label', { class: 'check' }, toggle, h('span', {}, T.record)),
    h('p', { class: 'field-help' }, T.help),
    status,
    note,
    h('div', { class: 'button-row' }, copy, save, share, clear),
  )
  const render = () => {
    toggle.checked = touchLog.on
    const n = touchLog.lines.length
    status.textContent = touchLog.on ? T.recording(n) : n ? T.offWith(n) : T.off
    for (const b of [copy, save, share, clear]) b.disabled = n === 0
  }
  const stop = touchLog.onChange(() => (fieldset.isConnected ? render() : stop()))
  render()
  return fieldset
}
