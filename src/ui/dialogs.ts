import { AI_MODELS, type Settings, type Theme } from '../store/settings'
import { ICONS, h, icon } from './dom'

export interface SettingsDialogDeps {
  settings: Settings
  onChange(next: Partial<Settings>): void
  onBackup(): void
  onRestore(): void
}

function dialogShell(title: string, body: HTMLElement[], extraClass = ''): HTMLDialogElement {
  const dialog: HTMLDialogElement = h(
    'dialog',
    { class: `dialog ${extraClass}`.trim(), attrs: { 'aria-label': title } },
    h(
      'div',
      { class: 'dialog-head' },
      h('h2', {}, title),
      h(
        'button',
        { class: 'icon-button', title: 'Chiudi', attrs: { type: 'button', 'aria-label': 'Chiudi' }, on: { click: () => dialog.close() } },
        icon(ICONS.x),
      ),
    ),
    h('div', { class: 'dialog-body' }, body),
  )
  // Clic fuori dal riquadro: chiude.
  dialog.addEventListener('click', (ev) => {
    if (ev.target === dialog) dialog.close()
  })
  dialog.addEventListener('close', () => dialog.remove())
  document.body.append(dialog)
  return dialog
}

export function openSettingsDialog(deps: SettingsDialogDeps): void {
  const s = deps.settings
  const themeOptions: [Theme, string][] = [
    ['auto', 'Automatico'],
    ['light', 'Chiaro'],
    ['dark', 'Scuro'],
  ]
  const fontValue = h('span', { class: 'field-value' }, `${s.fontSize}px`)
  const keyInput = h('input', {
    attrs: { type: 'password', value: s.apiKey, placeholder: 'sk-ant-…', autocomplete: 'off', spellcheck: 'false', id: 'api-key' },
    on: { change: () => deps.onChange({ apiKey: keyInput.value.trim() }) },
  })

  const body = [
    h(
      'fieldset',
      {},
      h('legend', {}, 'Aspetto'),
      h(
        'div',
        { class: 'segmented', attrs: { role: 'radiogroup', 'aria-label': 'Tema' } },
        themeOptions.map(([value, label]) =>
          h(
            'label',
            {},
            h('input', {
              attrs: { type: 'radio', name: 'theme', value, checked: s.theme === value },
              on: { change: () => deps.onChange({ theme: value }) },
            }),
            h('span', {}, label),
          ),
        ),
      ),
      h(
        'label',
        { class: 'field' },
        h('span', {}, 'Dimensione del testo'),
        h('input', {
          attrs: { type: 'range', min: 13, max: 22, step: 1, value: s.fontSize },
          on: {
            input: (ev) => {
              const v = Number((ev.target as HTMLInputElement).value)
              fontValue.textContent = `${v}px`
              deps.onChange({ fontSize: v })
            },
          },
        }),
        fontValue,
      ),
    ),
    h(
      'fieldset',
      {},
      h('legend', {}, 'Editor'),
      h(
        'label',
        { class: 'check' },
        h('input', {
          attrs: { type: 'checkbox', checked: s.autoWrap },
          on: { change: (ev) => deps.onChange({ autoWrap: (ev.target as HTMLInputElement).checked }) },
        }),
        h('span', {}, 'Quando inserisco un simbolo fuori da una formula, aggiungi automaticamente i ', h('code', {}, '$ … $')),
      ),
    ),
    h(
      'fieldset',
      {},
      h('legend', {}, 'Assistente AI (facoltativo)'),
      h(
        'p',
        { class: 'field-help' },
        'La ricerca dei simboli funziona sempre, anche offline. Per le domande più complesse puoi usare Claude con una tua chiave API di Anthropic: ',
        h('a', { attrs: { href: 'https://console.anthropic.com/settings/keys', target: '_blank', rel: 'noopener noreferrer' } }, 'creane una qui'),
        '. La chiave resta salvata solo in questo browser e viene inviata soltanto all\'API di Anthropic quando premi «Chiedi all\'AI».',
      ),
      h(
        'label',
        { class: 'field field-column', attrs: { for: 'api-key' } },
        h('span', {}, 'Chiave API'),
        h(
          'div',
          { class: 'input-row' },
          keyInput,
          h(
            'button',
            {
              class: 'btn btn-small',
              attrs: { type: 'button' },
              on: {
                click: (ev) => {
                  keyInput.type = keyInput.type === 'password' ? 'text' : 'password'
                  ;(ev.currentTarget as HTMLButtonElement).textContent = keyInput.type === 'password' ? 'Mostra' : 'Nascondi'
                },
              },
            },
            'Mostra',
          ),
        ),
      ),
      h(
        'label',
        { class: 'field field-column' },
        h('span', {}, 'Modello'),
        h(
          'select',
          { on: { change: (ev) => deps.onChange({ model: (ev.target as HTMLSelectElement).value }) } },
          AI_MODELS.map((m) => h('option', { attrs: { value: m.id, selected: m.id === s.model } }, m.label)),
        ),
      ),
      h(
        'details',
        { class: 'advanced' },
        h('summary', {}, 'Avanzate: usa un server proxy'),
        h(
          'p',
          { class: 'field-help' },
          'Se pubblichi Matherdown per altri studenti, puoi mettere la chiave in un piccolo server (es. un Cloudflare Worker) e indicarne qui l\'indirizzo: così nessuno deve inserire la propria chiave.',
        ),
        h('input', {
          attrs: { type: 'url', value: s.apiBaseUrl, placeholder: 'https://mio-proxy.example.workers.dev' },
          on: { change: (ev) => deps.onChange({ apiBaseUrl: (ev.target as HTMLInputElement).value.trim() }) },
        }),
      ),
    ),
    h(
      'fieldset',
      {},
      h('legend', {}, 'I tuoi dati'),
      h(
        'p',
        { class: 'field-help' },
        'Gli appunti sono salvati nel browser. Se cancelli i dati di navigazione li perdi: scarica ogni tanto un backup, o salva le note come file .md.',
      ),
      h(
        'div',
        { class: 'button-row' },
        h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => deps.onBackup() } }, icon(ICONS.download, 15), 'Scarica backup'),
        h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => deps.onRestore() } }, icon(ICONS.upload, 15), 'Ripristina backup'),
      ),
    ),
  ]
  dialogShell('Impostazioni', body, 'dialog-settings').showModal()
}

export function openHelpDialog(): void {
  const row = (keys: string[], text: string) =>
    h(
      'tr',
      {},
      h('td', {}, keys.map((k, i) => [i ? ' ' : null, h('kbd', {}, k)])),
      h('td', {}, text),
    )
  const body = [
    h(
      'p',
      {},
      'Scrivi i tuoi appunti in Markdown e le formule in LaTeX tra ',
      h('code', {}, '$ … $'),
      ' (in linea) o ',
      h('code', {}, '$$ … $$'),
      ' (a blocco). Mentre scrivi un comando come ',
      h('code', {}, '\\su'),
      ', il pannello a destra mostra l\'anteprima dei simboli: clicca per inserirli.',
    ),
    h(
      'table',
      { class: 'shortcuts' },
      h(
        'tbody',
        {},
        row(['Tab'], 'inserisce il suggerimento selezionato, poi passa al segnaposto successivo'),
        row(['Maiusc', 'Tab'], 'torna al segnaposto precedente'),
        row(['↑', '↓'], 'sceglie tra i suggerimenti'),
        row(['Esc'], 'chiude i suggerimenti'),
        row(['Ctrl', 'K'], 'cerca un simbolo a parole (es. «per ogni»)'),
        row(['Ctrl', 'Invio'], 'nella ricerca: chiede all\'assistente AI'),
        row(['Ctrl', 'M'], 'nuova formula in linea $ … $'),
        row(['Ctrl', 'Maiusc', 'M'], 'nuova formula a blocco $$ … $$'),
        row(['Ctrl', 'B'], 'grassetto'),
        row(['Ctrl', 'I'], 'corsivo'),
        row(['Ctrl', 'S'], 'salva la nota come file .md'),
        row(['Ctrl', 'F'], 'trova e sostituisci'),
      ),
    ),
    h(
      'p',
      { class: 'field-help' },
      'Suggerimento: dopo la barra puoi scrivere anche in italiano — ',
      h('code', {}, '\\infinito'),
      ', ',
      h('code', {}, '\\radice'),
      ', ',
      h('code', {}, '\\freccia'),
      ' — e ti verrà proposto il comando giusto. Su Mac usa ⌘ al posto di Ctrl.',
    ),
  ]
  dialogShell('Come si usa', body, 'dialog-help').showModal()
}
