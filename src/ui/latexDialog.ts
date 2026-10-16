/**
 * «In LaTeX» (AI.md, punto 2): la finestra che si apre dal menu della Selezione della lavagna. La scrittura
 * presa, una formula per riga, va al lettore nel browser (src/ai/formulaReader.ts); il LaTeX, pulito con
 * `tidyLatex`, si vede disegnato con KaTeX e si corregge nella casella; con un «=» c'è il ✓ o il ✗ del motore,
 * con le definizioni della nota prima del cursore (`sheetBefore`). «Inserisci nella nota» lo mette dove c'è il
 * cursore (`formulaInsertion`); la scrittura resta sulla lavagna. È una finestra modale sul body: si vede anche
 * con la lavagna a schermo intero, e i tasti scritti nella casella non arrivano alla lavagna.
 */
import type { EditorView } from '@codemirror/view'
import { READER_DOWNLOAD } from '../ai/formulaModel'
import type { ReadProgress } from '../ai/formulaReader'
import { tidyLatex } from '../ai/formulaTidy'
import type { Stroke } from '../board/strokes'
import { sheetBefore } from '../editor/calcResults'
import { formulaInsertion } from '../editor/latexInsert'
import { inClaudeViewer } from '../host'
import { numberLocale, texts } from '../i18n'
import { checkHtml } from '../render/check'
import { renderTex } from '../render/katex'
import { dialogShell } from './dialogs'
import { h } from './dom'
import { toast } from './toast'

const T = texts({
  title: ['In LaTeX', 'To LaTeX'],
  consent: (mb: number) => [
    `Per leggere la scrittura Glifo usa un lettore che gira in questo browser (pix2text-mfr). La prima volta si scarica da Hugging Face, circa ${mb} MB: poi resta qui e funziona anche senza connessione. La scrittura non esce dal dispositivo.`,
    `To read handwriting, Glifo uses a reader that runs in this browser (pix2text-mfr). The first time it downloads from Hugging Face, about ${mb} MB: then it stays here and works offline too. Your handwriting never leaves the device.`,
  ],
  download: ['Scarica il lettore', 'Download the reader'],
  downloading: (n: number) => [`Scarico il lettore: ${n}%`, `Downloading the reader: ${n}%`],
  progress: ['Avanzamento', 'Progress'],
  preparing: ['Preparo il lettore…', 'Getting the reader ready…'],
  readingOne: ['Leggo la scrittura…', 'Reading the handwriting…'],
  reading: (i: number, n: number) => [`Leggo la riga ${i} di ${n}…`, `Reading line ${i} of ${n}…`],
  readIn: (seconds: string) => [`Letta in ${seconds} s`, `Read in ${seconds} s`],
  nothing: ['Il lettore non ha trovato una formula: scrivila tu qui sopra.', 'The reader didn\'t find a formula: type it above.'],
  code: (i: number, n: number) => [n === 1 ? 'Il codice LaTeX' : `Il codice LaTeX della riga ${i}`, n === 1 ? 'The LaTeX code' : `The LaTeX code of line ${i}`],
  unreadable: (reason: string) => [`KaTeX non riesce a disegnarla: ${reason}`, `KaTeX can't draw it: ${reason}`],
  help: [
    'Con un «=» Glifo controlla il conto, con le definizioni della nota prima del cursore. La scrittura resta sulla lavagna.',
    'With an "=" Glifo checks the result, using the definitions in the note before the cursor. The handwriting stays on the board.',
  ],
  insert: ['Inserisci nella nota', 'Insert into the note'],
  copy: ['Copia', 'Copy'],
  copied: ['Copiato', 'Copied'],
  copyFailed: ['Non riesco a copiare: seleziona il codice e copialo a mano.', 'Can\'t copy: select the code and copy it yourself.'],
  close: ['Chiudi', 'Close'],
  inserted: (n: number) => [
    n === 1 ? 'Formula inserita nella nota' : `${n} formule inserite nella nota`,
    n === 1 ? 'Formula inserted into the note' : `${n} formulas inserted into the note`,
  ],
  retry: ['Riprova', 'Try again'],
  noInk: ['Nella selezione non c\'è scrittura: l\'evidenziatore non si legge.', 'There\'s no writing in the selection: highlighter isn\'t read.'],
  inClaude: [
    'Dentro claude.ai il lettore non si può scaricare: prova «In LaTeX» su Glifo, nel browser.',
    'Inside claude.ai the reader can\'t be downloaded: try "To LaTeX" on Glifo, in the browser.',
  ],
})

/** Il lettore: quello vero (`formulaReader()`) o, nei test, uno finto. */
export interface LatexReader {
  ready: boolean
  load(onProgress?: (p: ReadProgress) => void): Promise<void>
  read(pixels: Float32Array): Promise<{ text: string; ms: number }>
}

export interface LatexDialogDeps {
  /** I tratti presi, una formula per riga (`formulaLines`). */
  lines: Stroke[][]
  /** L'editor della nota: le definizioni prima del cursore e dove inserire. */
  view: EditorView
  reader: LatexReader
  /** Il lettore è già tutto nel browser? Se no, prima di scaricarlo si chiede. */
  inBrowser(): Promise<boolean>
  /** L'immagine di una riga per il modello (`lineImage`). */
  image(strokes: Stroke[]): Float32Array
  /** La riga com'è scritta, piccola (`linePreview`). */
  preview(strokes: Stroke[]): HTMLElement
}

interface Line {
  strokes: Stroke[]
  code: HTMLTextAreaElement
  render: HTMLElement
  note: HTMLElement
}

export function openLatexDialog(deps: LatexDialogDeps): HTMLDialogElement {
  const status = h('div', { class: 'latex-status', attrs: { 'aria-live': 'polite' } })
  const lines: Line[] = deps.lines.map((strokes, i) => ({
    strokes,
    code: h('textarea', {
      class: 'latex-code',
      attrs: { rows: 2, spellcheck: 'false', autocapitalize: 'off', 'aria-label': T.code(i + 1, deps.lines.length), disabled: true },
      on: { input: () => refresh() },
    }),
    render: h('div', { class: 'latex-render' }),
    note: h('p', { class: 'latex-note' }),
  }))
  const insert = h('button', { class: 'btn btn-primary', attrs: { type: 'button', disabled: true }, on: { click: () => insertAll() } }, T.insert)
  const copy = h('button', { class: 'btn', attrs: { type: 'button', disabled: true }, on: { click: () => void copyAll() } }, T.copy)
  const dialog = dialogShell(
    T.title,
    [
      status,
      lines.length
        ? h(
            'ol',
            { class: 'latex-lines' },
            lines.map((l) => h('li', { class: 'latex-line' }, h('div', { class: 'latex-writing' }, deps.preview(l.strokes)), l.render, l.code, l.note)),
          )
        : null,
      lines.length ? h('p', { class: 'field-help latex-help' }, T.help) : null,
      h(
        'div',
        { class: 'dialog-actions' },
        h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => dialog.close() } }, T.close),
        copy,
        insert,
      ),
    ],
    'dialog-latex',
  )
  let closed = false
  dialog.addEventListener('close', () => (closed = true))
  dialog.showModal()

  const formulas = () => lines.map((l) => l.code.value.trim()).filter(Boolean)

  /** Ridisegna le formule e i segni del motore, che legge le righe una dopo l'altra come nella nota. */
  function refresh(): void {
    const sheet = sheetBefore(deps.view.state, deps.view.state.selection.main.from)
    for (const l of lines) {
      const tex = l.code.value.trim()
      if (!tex) {
        l.render.replaceChildren()
        continue
      }
      const drawn = renderTex(tex, true)
      if (drawn.error) {
        l.render.replaceChildren(h('p', { class: 'latex-error' }, T.unreadable(drawn.error)))
        continue
      }
      const check = sheet.read(tex).check
      l.render.replaceChildren(h('div', { class: 'latex-math', html: drawn.html }), ...(check ? [h('span', { html: checkHtml(check) })] : []))
    }
    const some = formulas().length > 0
    insert.disabled = !some
    copy.disabled = !some
  }

  function working(text: string): void {
    status.replaceChildren(h('div', { class: 'ai-loading' }, h('span', { class: 'spinner', attrs: { 'aria-hidden': 'true' } }), h('span', {}, text)))
  }

  function downloading(p: ReadProgress): void {
    const share = p.total ? p.loaded / p.total : 0
    if (share >= 1) return working(T.preparing)
    const percent = Math.floor(share * 100)
    status.replaceChildren(
      h('progress', { class: 'explain-progress', attrs: { max: 100, value: percent, 'aria-label': T.progress } }),
      h('p', { class: 'latex-note' }, T.downloading(percent)),
    )
  }

  function failed(message: string, retry: boolean): void {
    status.replaceChildren(
      h('p', { class: 'latex-error' }, message),
      ...(retry ? [h('button', { class: 'btn btn-small', attrs: { type: 'button' }, on: { click: () => void run() } }, T.retry)] : []),
    )
  }

  async function run(): Promise<void> {
    try {
      if (!deps.reader.ready) {
        working(T.preparing)
        await deps.reader.load(downloading)
      }
      for (const [i, line] of lines.entries()) {
        if (closed) return
        if (line.code.value) continue
        working(lines.length === 1 ? T.readingOne : T.reading(i + 1, lines.length))
        const { text, ms } = await deps.reader.read(deps.image(line.strokes))
        const tex = tidyLatex(text)
        line.code.value = tex
        line.code.disabled = false
        line.note.textContent = tex ? T.readIn(new Intl.NumberFormat(numberLocale(), { maximumFractionDigits: 1 }).format(ms / 1000)) : T.nothing
        refresh()
      }
      status.replaceChildren()
    } catch (err) {
      failed(err instanceof Error ? err.message : String(err), true)
    }
  }

  async function start(): Promise<void> {
    if (!lines.length) return failed(T.noInk, false)
    if (deps.reader.ready || (await deps.inBrowser())) return run()
    if (inClaudeViewer()) return failed(T.inClaude, false)
    status.replaceChildren(
      h('p', { class: 'latex-consent' }, T.consent(Math.round(READER_DOWNLOAD / 1e6))),
      h('button', { class: 'btn btn-primary', attrs: { type: 'button' }, on: { click: () => void run() } }, T.download),
    )
  }

  function insertAll(): void {
    const list = formulas()
    if (!list.length) return
    const { view } = deps
    view.dispatch(view.state.update(formulaInsertion(view.state, list)))
    dialog.close()
    toast(T.inserted(list.length))
  }

  async function copyAll(): Promise<void> {
    try {
      await navigator.clipboard.writeText(formulas().join('\n'))
      toast(T.copied)
    } catch {
      toast(T.copyFailed, 'error')
    }
  }

  void start()
  return dialog
}
