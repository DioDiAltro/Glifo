/**
 * Le impostazioni, divise in sezioni (GRAFICA.md, punto 3, 13 ottobre 2026): a sinistra l'elenco, a
 * destra la sezione scelta; sul telefono l'elenco e una pagina per sezione, con la freccia per tornare.
 * Ogni cambio vale subito (non c'è «Salva») e il tema si cambia solo qui. Le sezioni si costruiscono la
 * prima volta che si aprono. «Account» è quello che prima era la finestra dell'account: il pulsante
 * dell'account in fondo alla barra laterale apre le impostazioni lì.
 */
import { EXPLAIN_TONES } from '../ai/explain'
import { localLlm } from '../ai/local'
import { LOCAL_MODELS, localModel, modelInBrowser, modelsInBrowser, type DownloadedModel } from '../ai/localModels'
import { AI_SERVICES, aiService } from '../ai/services'
import { inClaudeViewer } from '../host'
import { dateLocale, lang, LANGUAGES, rich, texts, type Lang } from '../i18n'
import { AI_MODELS, SPELL_LANGUAGES, type Settings, type SpellLanguages, type Theme } from '../store/settings'
import { formatBytes, notesBytes, storageEstimate } from '../store/usage'
import { accountSection, guestAccountSection, type AccountSectionDeps } from './account'
import { dialogShell } from './dialogs'
import { ICONS, h, icon } from './dom'
import { LICENSES } from './licenses'
import { FAQ_URL, privacyLink } from './links'

/** La versione di Glifo: il commit pubblicato e quando è stato costruito (vedi vite.config.ts). */
declare const __GLIFO_VERSION__: string

const T = texts({
  settings: ['Impostazioni', 'Settings'],
  sections: ['Sezioni delle impostazioni', 'Settings sections'],
  back: ['Torna all\'elenco delle impostazioni', 'Back to the settings list'],

  // Le sezioni, con la riga che le descrive nell'elenco (sul telefono).
  general: ['Generale', 'General'],
  generalHint: ['Lingua, tema e dimensione del testo', 'Language, theme and text size'],
  writing: ['Scrittura', 'Writing'],
  writingHint: ['Simboli, controllo ortografico e dizionario', 'Symbols, spell check and dictionary'],
  ai: ['AI', 'AI'],
  aiHint: ['Le spiegazioni e l\'assistente con la tua chiave', 'Explanations and the assistant with your key'],
  account: ['Account', 'Account'],
  guestHint: ['Accedi per ritrovare gli appunti su ogni dispositivo', 'Sign in to get your notes on every device'],
  data: ['Dati', 'Data'],
  dataHint: ['Il backup e lo spazio in questo browser', 'Backup and space in this browser'],
  about: ['Informazioni', 'About'],
  aboutHint: ['Versione, guida, domande frequenti e licenze', 'Version, guide, FAQ and licenses'],

  // Generale
  language: ['Lingua', 'Language'],
  languageHelp: [
    'La lingua di menu, finestre e messaggi: cambiandola, Glifo si ricarica. Le lingue in cui scrivi le sceglie il controllo ortografico, in {writing}.',
    'The language of menus, dialogs and messages: changing it reloads Glifo. The languages you write in are set by the spell checker, under {writing}.',
  ],
  appearance: ['Aspetto', 'Appearance'],
  theme: ['Tema', 'Theme'],
  themeAuto: ['Automatico', 'Automatic'],
  themeLight: ['Chiaro', 'Light'],
  themeDark: ['Scuro', 'Dark'],
  textSize: ['Dimensione del testo', 'Text size'],

  // Scrittura
  editor: ['Editor', 'Editor'],
  autoWrap: [
    'Quando inserisco un simbolo fuori da una formula, aggiungi automaticamente i {code}',
    'When I insert a symbol outside a formula, automatically wrap it in {code}',
  ],
  spellCheck: ['Controllo ortografico', 'Spell check'],
  spellUnderline: [
    'Sottolinea in rosso le parole scritte male. Formule, codice e link non vengono controllati.',
    'Underline misspelled words in red. Formulas, code and links aren\'t checked.',
  ],
  spellLanguages: ['Lingue', 'Languages'],
  spellHelp: [
    'Clicca su una parola sottolineata (o premi {ctrl} {dot}) per vedere le correzioni o aggiungerla al tuo dizionario.',
    'Click an underlined word (or press {ctrl} {dot}) to see suggestions or add it to your dictionary.',
  ],
  personalWords: ['Parole aggiunte al dizionario ({count})', 'Words added to the dictionary ({count})'],
  personalWordsLabel: ['Parole aggiunte al dizionario, una per riga', 'Words added to the dictionary, one per line'],
  personalWordsHelp: ['Una parola per riga: puoi correggerle o cancellarle.', 'One word per line: you can correct or delete them.'],

  // AI: l'assistente con la propria chiave
  aiLegend: ['Assistente AI (facoltativo)', 'AI assistant (optional)'],
  aiDemo: [
    'In questa demo su claude.ai la chiave non serve: «Chiedi all\'AI» usa il tuo account Claude (la prima volta ti viene chiesto il permesso).',
    'In this demo on claude.ai you don\'t need a key: “Ask AI” uses your Claude account (you\'ll be asked for permission the first time).',
  ],
  aiIntro: [
    'La ricerca dei simboli funziona sempre, anche offline. Per le domande più complesse puoi usare l\'AI con una tua chiave.',
    'Symbol search always works, even offline. For harder questions you can use AI with your own key.',
  ],
  service: ['Servizio', 'Service'],
  apiKey: ['Chiave API', 'API key'],
  apiKeyIfNeeded: ['Chiave API (se il servizio la chiede)', 'API key (if the service asks for one)'],
  show: ['Mostra', 'Show'],
  hide: ['Nascondi', 'Hide'],
  model: ['Modello', 'Model'],
  modelPlaceholder: ['il nome del modello', 'the model name'],
  apiUrl: ['Indirizzo dell\'API', 'API URL'],
  anthropicHelp: [
    'Claude con una tua chiave API di Anthropic: {link}. La chiave resta salvata solo in questo browser e viene inviata soltanto ad Anthropic quando premi «Chiedi all\'AI».',
    'Claude with your own Anthropic API key: {link}. The key is saved only in this browser and is sent only to Anthropic when you press “Ask AI”.',
  ],
  anthropicKeyLink: ['creane una qui', 'create one here'],
  geminiHelp: [
    'Gratis, senza carta di credito: crea la chiave in {link} (con il tuo account Google). Il piano gratuito ha un limite di domande al giorno; Google può usare le domande fatte gratis per migliorare i suoi modelli. La chiave resta in questo browser e la domanda va direttamente a Google.',
    'Free, no credit card needed: create the key in {link} (with your Google account). The free plan has a daily limit on questions; Google may use questions asked for free to improve its models. The key stays in this browser and your question goes straight to Google.',
  ],
  openrouterHelp: [
    'Con una chiave sola tanti modelli, anche aperti (Qwen, Gemma…): creala su {link}. «openrouter/free» sceglie ogni volta un modello gratuito. La chiave resta in questo browser e la domanda va direttamente a OpenRouter.',
    'Many models with a single key, open ones too (Qwen, Gemma…): create it on {link}. “openrouter/free” picks a free model each time. The key stays in this browser and your question goes straight to OpenRouter.',
  ],
  ollamaHelp: (origin: string) => [
    `I modelli aperti sul tuo computer, gratis e senza internet: installa {link}, scarica un modello (per esempio «ollama pull qwen3») e avvialo permettendo le richieste da Glifo: OLLAMA_ORIGINS=${origin} ollama serve. La domanda non esce dal computer.`,
    `Open models on your computer, free and without internet: install {link}, download a model (for example “ollama pull qwen3”) and start it allowing requests from Glifo: OLLAMA_ORIGINS=${origin} ollama serve. Your question never leaves the computer.`,
  ],
  compatibleHelp: [
    'Un servizio che parla la «lingua» di OpenAI (OpenAI, Mistral, Groq, DeepSeek, LM Studio…): scrivi l\'indirizzo della sua API, il modello e, se serve, la chiave. La chiave resta in questo browser e la domanda va direttamente a quel servizio.',
    'A service that speaks OpenAI\'s “language” (OpenAI, Mistral, Groq, DeepSeek, LM Studio…): enter its API URL, the model and, if needed, the key. The key stays in this browser and your question goes straight to that service.',
  ],
  proxy: ['Avanzate: usa un server proxy', 'Advanced: use a proxy server'],
  proxyHelp: [
    'Se pubblichi Glifo per altri studenti, puoi mettere la chiave in un piccolo server (es. un Cloudflare Worker) e indicarne qui l\'indirizzo: così nessuno deve inserire la propria chiave.',
    'If you publish Glifo for other students, you can put the key on a small server (e.g. a Cloudflare Worker) and enter its address here: that way nobody has to enter their own key.',
  ],
  proxyPlaceholder: ['https://mio-proxy.example.workers.dev', 'https://my-proxy.example.workers.dev'],

  // AI: le spiegazioni
  explainLegend: ['Spiegazioni (prova)', 'Explanations (beta)'],
  explainHelp: [
    'Con il cursore su un conto, «Spiegami» (sotto l\'anteprima della formula) fa scrivere i passaggi a Qwen3, un modello AI che gira in questo browser con WebLLM: niente chiave, niente costi, e la nota non esce dal dispositivo. I conti li fa e li controlla il motore di Glifo. Serve WebGPU: Chrome o Edge aggiornati, su un computer.',
    'With the cursor on a calculation, “Explain” (below the formula preview) has Qwen3, an AI model that runs in this browser with WebLLM, write out the steps: no key, no cost, and the note never leaves your device. Glifo\'s engine does the math and checks it. Requires WebGPU: an up-to-date Chrome or Edge, on a computer.',
  ],
  removing: (name: string) => [`Tolgo ${name} da questo browser…`, `Removing ${name} from this browser…`],
  removeModel: ['Toglilo da questo browser', 'Remove it from this browser'],
  modelHere: (name: string) => [
    `${name} è già in questo browser: le spiegazioni funzionano anche offline.`,
    `${name} is already in this browser: explanations work offline too.`,
  ],
  modelDownload: (name: string, size: string) => [
    `${name} si scarica la prima volta che premi «Spiegami» (${size}) e poi resta in questo browser.`,
    `${name} downloads the first time you press “Explain” (${size}) and then stays in this browser.`,
  ],
  tone: ['Tono', 'Tone'],
  toneLabel: ['Tono delle spiegazioni', 'Tone of the explanations'],

  // Dati
  backup: ['Backup', 'Backup'],
  dataWithAccount: [
    'Gli appunti sono salvati nel tuo account ({email}) e in questo browser; le lavagne solo in questo browser. Il backup resta utile per averne una copia tutta tua, lavagne comprese. Per scaricare tutti i dati dell\'account o eliminarlo, vai in {account}.',
    'Your notes are saved in your account ({email}) and in this browser; whiteboards only in this browser. A backup is still useful for keeping a copy of your own, whiteboards included. To download all your account data or delete the account, go to {account}.',
  ],
  dataWithoutAccount: [
    'Gli appunti sono salvati nel browser. Se cancelli i dati di navigazione li perdi: scarica ogni tanto un backup, o salva le note come file .md. Con l\'account ritrovi le note su ogni dispositivo: vedi {account}.',
    'Your notes are saved in the browser. If you clear your browsing data you lose them: download a backup now and then, or save your notes as .md files. With an account you\'ll have your notes on every device: see {account}.',
  ],
  downloadBackup: ['Scarica backup', 'Download backup'],
  restoreBackup: ['Ripristina backup', 'Restore backup'],
  privacy: ['Come trattiamo i tuoi dati: {link}.', 'How we handle your data: {link}.'],
  space: ['Spazio in questo browser', 'Space in this browser'],
  spaceNotes: ['Appunti, cartelle e impostazioni', 'Notes, folders and settings'],
  spaceBoards: ['Lavagne', 'Whiteboards'],
  spaceModels: ['Modelli di «Spiegami»', '“Explain” models'],
  spaceModel: (name: string) => [`${name}, il modello di «Spiegami»`, `${name}, the “Explain” model`],
  spacePartModel: (name: string) => [`${name}, scaricato a metà`, `${name}, partly downloaded`],
  spaceTotal: ['In tutto, con i file per usare Glifo offline', 'In total, with the files for using Glifo offline'],
  spaceNone: ['nessuno', 'none'],
  measuring: ['calcolo…', 'measuring…'],
  unknown: ['non si sa', 'unknown'],
  spaceQuota: (size: string) => [`Il browser può dare a Glifo fino a ${size}.`, `The browser can give Glifo up to ${size}.`],
  spaceHelp: [
    'Un modello di «Spiegami» pesa molto più degli appunti: se non ti serve, toglilo. Si riscarica da solo la prossima volta che premi «Spiegami».',
    'An “Explain” model takes up far more space than your notes: if you don\'t need it, remove it. It downloads again by itself the next time you press “Explain”.',
  ],
  remove: ['Togli', 'Remove'],
  removeLabel: (name: string) => [`Togli ${name} da questo browser`, `Remove ${name} from this browser`],

  // Informazioni
  version: (commit: string, date: string) => [`Versione ${commit} del ${date}.`, `Version ${commit}, ${date}.`],
  localVersion: (date: string) => [`Versione locale del ${date}.`, `Local build, ${date}.`],
  aboutHelp: [
    'Il tutorial con tutte le scorciatoie, poi le domande frequenti e i commenti di chi usa Glifo, in una pagina a parte. Per un problema o un\'idea, scrivi un commento.',
    'The tutorial with all the shortcuts, then the FAQ and feedback from people who use Glifo, on a separate page. For a problem or an idea, write a comment.',
  ],
  howToUse: ['Come si usa', 'How to use'],
  faq: ['Domande frequenti e commenti', 'FAQ and feedback'],
  writeComment: ['Scrivi un commento', 'Write a comment'],
  privacyAndLicenses: ['Privacy e licenze', 'Privacy and licenses'],
  licenses: (n: number) => [`I ${n} programmi liberi su cui è costruito Glifo`, `The ${n} free software projects Glifo is built on`],
  licenseOf: (name: string) => [`licenza ${name}`, `${name} license`],
})

export type SettingsSection = 'general' | 'writing' | 'ai' | 'account' | 'data' | 'about'

export interface SettingsDialogDeps {
  settings: Settings
  onChange(next: Partial<Settings>): void
  /** La lingua di Glifo (src/i18n.ts): chi la riceve la salva e ricarica la pagina. */
  onLanguageChange(next: Lang): void
  /** Parole aggiunte al dizionario del controllo ortografico. */
  personalWords: string[]
  /** Salva il nuovo elenco e restituisce la versione ripulita. */
  onPersonalWordsChange(words: string[]): string[]
  onBackup(): void
  onRestore(): void
  /** L'account con cui si è entrati, per la sezione «Account»; senza, la sezione offre «Accedi». */
  account?: AccountSectionDeps | null
  /** «Accedi»: la finestra per entrare (dove l'account è spento, quella che dice perché non si entra). */
  onSignIn?(): void
  /** «Come si usa» e «Scrivi un commento», dalla sezione «Informazioni». */
  onGuide?(): void
  onFeedback?(): void
  /** Quanto occupano le lavagne (src/board/store.ts), per la sezione «Dati». */
  boardsBytes?(): Promise<number>
}

interface Section {
  id: SettingsSection
  icon: string
  name: string
  hint: string
  /** Il contenuto, fatto la prima volta che la sezione si apre. */
  build(): HTMLElement[]
  /** Ogni volta che la sezione si mostra: quello che può essere cambiato intanto (lo spazio, i modelli). */
  shown?(): void
}

/** Sotto questa larghezza le impostazioni sono a pagine, come sul telefono (lo stesso numero in app.css). */
const PHONE = '(max-width: 600px)'
const onPhone = () => typeof matchMedia === 'function' && matchMedia(PHONE).matches

/**
 * Apre le impostazioni, sulla sezione `start` se c'è (sul telefono direttamente sulla sua pagina), se no
 * su «Generale» (sul telefono, sull'elenco delle sezioni).
 */
export function openSettingsDialog(deps: SettingsDialogDeps, start?: SettingsSection): HTMLDialogElement {
  const cleanups: (() => void)[] = []
  // Le parti che si rifanno ogni volta che la loro sezione si mostra.
  let explain: { el: HTMLElement; refresh(): void } | null = null
  let space: { el: HTMLElement; refresh(): void } | null = null
  // Un collegamento a un'altra sezione, dentro un testo («…in Scrittura»).
  const sectionLink = (id: SettingsSection, label: string) =>
    h('button', { class: 'link-button', attrs: { type: 'button' }, on: { click: () => select(id, true, true) } }, label)
  const close = () => dialog.close()

  const sections: Section[] = [
    { id: 'general', icon: ICONS.settings, name: T.general, hint: T.generalHint, build: () => generalSection(deps, sectionLink('writing', T.writing)) },
    { id: 'writing', icon: ICONS.edit, name: T.writing, hint: T.writingHint, build: () => writingSection(deps) },
    {
      id: 'ai',
      icon: ICONS.sparkles,
      name: T.ai,
      hint: T.aiHint,
      build: () => {
        explain = explainFieldset(deps.settings, deps)
        return [explain.el, aiFieldset(deps.settings, deps)]
      },
      shown: () => explain?.refresh(),
    },
    {
      id: 'account',
      icon: ICONS.user,
      name: T.account,
      hint: deps.account?.email ?? T.guestHint,
      build: () => {
        if (!deps.account) return guestAccountSection(() => deps.onSignIn?.(), close)
        const section = accountSection(deps.account, close)
        cleanups.push(section.dispose)
        return section.nodes
      },
    },
    {
      id: 'data',
      icon: ICONS.database,
      name: T.data,
      hint: T.dataHint,
      build: () => {
        space = spaceFieldset(deps, () => explain?.refresh())
        return [backupFieldset(deps, () => sectionLink('account', T.account)), space.el]
      },
      shown: () => space?.refresh(),
    },
    { id: 'about', icon: ICONS.info, name: T.about, hint: T.aboutHint, build: () => aboutSection(deps) },
  ]

  const tabs = new Map<SettingsSection, HTMLButtonElement>()
  const panels = new Map<SettingsSection, HTMLElement>()
  const built = new Set<SettingsSection>()
  const nav = h('div', { class: 'settings-nav', attrs: { role: 'tablist', 'aria-orientation': 'vertical', 'aria-label': T.sections } })
  const pane = h('div', { class: 'settings-pane' })
  for (const s of sections) {
    const tab = h(
      'button',
      {
        class: 'settings-tab',
        attrs: {
          type: 'button',
          role: 'tab',
          id: `settings-tab-${s.id}`,
          'aria-controls': `settings-panel-${s.id}`,
          'aria-selected': 'false',
          'aria-label': s.name,
          'aria-describedby': `settings-hint-${s.id}`,
          tabindex: -1,
        },
        data: { section: s.id },
        on: { click: () => select(s.id, true, onPhone()) },
      },
      icon(s.icon, 18),
      h('span', { class: 'settings-tab-text' }, h('span', { class: 'settings-tab-name' }, s.name), h('span', { class: 'settings-tab-hint', attrs: { id: `settings-hint-${s.id}` } }, s.hint)),
      h('span', { class: 'settings-tab-arrow' }, icon(ICONS.chevron, 16)),
    )
    tabs.set(s.id, tab)
    nav.append(tab)
    const panel = h(
      'section',
      { class: `settings-panel settings-${s.id}`, attrs: { role: 'tabpanel', id: `settings-panel-${s.id}`, 'aria-labelledby': `settings-tab-${s.id}`, hidden: true } },
      h('h3', { class: 'settings-heading' }, s.name),
    )
    panels.set(s.id, panel)
    pane.append(panel)
  }

  // Le frecce scorrono le sezioni (sul computer le aprono anche; sul telefono si apre con Invio).
  nav.addEventListener('keydown', (ev) => {
    const ids = sections.map((s) => s.id)
    const at = ids.findIndex((id) => tabs.get(id) === document.activeElement)
    if (at < 0) return
    const next = ev.key === 'ArrowDown' ? (at + 1) % ids.length : ev.key === 'ArrowUp' ? (at - 1 + ids.length) % ids.length : ev.key === 'Home' ? 0 : ev.key === 'End' ? ids.length - 1 : -1
    if (next < 0) return
    ev.preventDefault()
    tabs.get(ids[next])!.focus()
    if (!onPhone()) select(ids[next], false, false)
  })

  const dialog = dialogShell(T.settings, [nav, pane], 'dialog-settings')
  // Sul telefono la testata dice la sezione aperta, con la freccia per tornare all'elenco.
  const subtitle = h('span', { class: 'settings-subtitle' })
  const back = h(
    'button',
    {
      class: 'icon-button settings-back',
      title: T.back,
      attrs: { type: 'button', 'aria-label': T.back },
      on: {
        click: () => {
          dialog.dataset.view = 'list'
          tabs.get(current)?.focus()
        },
      },
    },
    icon(ICONS.back),
  )
  const head = dialog.querySelector<HTMLElement>('.dialog-head')!
  head.querySelector('h2')!.replaceChildren(h('span', { class: 'settings-title' }, T.settings), subtitle)
  head.prepend(back)
  dialog.addEventListener('close', () => cleanups.splice(0).forEach((dispose) => dispose()))

  let current: SettingsSection = start ?? 'general'
  /** Mostra la sezione `id`; `open`: sul telefono si va sulla sua pagina; `focus`: il fuoco va lì. */
  function select(id: SettingsSection, open: boolean, focus: boolean): void {
    const section = sections.find((s) => s.id === id)!
    current = id
    for (const [sid, tab] of tabs) {
      tab.setAttribute('aria-selected', String(sid === id))
      tab.tabIndex = sid === id ? 0 : -1
    }
    const panel = panels.get(id)!
    if (!built.has(id)) {
      built.add(id)
      panel.append(...section.build())
    }
    for (const [pid, p] of panels) p.hidden = pid !== id
    subtitle.textContent = section.name
    dialog.dataset.section = id
    if (open) dialog.dataset.view = 'section'
    pane.scrollTop = 0
    section.shown?.()
    if (focus) (onPhone() ? back : tabs.get(id)!).focus()
  }

  dialog.dataset.view = start ? 'section' : 'list'
  select(current, !!start, false)
  dialog.showModal()
  ;(start && onPhone() ? back : tabs.get(current)!).focus()
  return dialog
}

/** «Generale»: la lingua di Glifo (per prima: chi l'ha cambiata per sbaglio la ritrova subito), il tema e il testo. */
function generalSection(deps: SettingsDialogDeps, writingLink: HTMLElement): HTMLElement[] {
  const s = deps.settings
  const themeOptions: [Theme, string][] = [
    ['auto', T.themeAuto],
    ['light', T.themeLight],
    ['dark', T.themeDark],
  ]
  const fontValue = h('span', { class: 'field-value' }, `${s.fontSize}px`)
  return [
    h(
      'fieldset',
      { class: 'language-settings' },
      h('legend', {}, T.language),
      h(
        'div',
        { class: 'segmented', attrs: { role: 'radiogroup', 'aria-label': T.language } },
        LANGUAGES.map((l) =>
          h(
            'label',
            { attrs: { lang: l.id } },
            h('input', {
              attrs: { type: 'radio', name: 'language', value: l.id, checked: l.id === lang },
              on: { change: () => deps.onLanguageChange(l.id) },
            }),
            h('span', {}, l.name),
          ),
        ),
      ),
      h('p', { class: 'field-help' }, ...rich(T.languageHelp, { writing: writingLink })),
    ),
    h(
      'fieldset',
      { class: 'appearance-settings' },
      h('legend', {}, T.appearance),
      h(
        'div',
        { class: 'segmented', attrs: { role: 'radiogroup', 'aria-label': T.theme } },
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
        h('span', {}, T.textSize),
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
  ]
}

/** «Scrittura»: i `$` messi da soli attorno ai simboli e il controllo ortografico, con il dizionario. */
function writingSection(deps: SettingsDialogDeps): HTMLElement[] {
  const s = deps.settings
  const wordsCount = h('span', {}, String(deps.personalWords.length))
  const wordsInput = h('textarea', {
    attrs: { rows: 6, spellcheck: 'false', autocomplete: 'off', 'aria-label': T.personalWordsLabel },
    on: {
      change: () => {
        const words = deps.onPersonalWordsChange(wordsInput.value.split('\n'))
        wordsInput.value = words.join('\n')
        wordsCount.textContent = String(words.length)
      },
    },
  })
  wordsInput.value = deps.personalWords.join('\n')
  return [
    h(
      'fieldset',
      { class: 'editor-settings' },
      h('legend', {}, T.editor),
      h(
        'label',
        { class: 'check' },
        h('input', {
          attrs: { type: 'checkbox', checked: s.autoWrap },
          on: { change: (ev) => deps.onChange({ autoWrap: (ev.target as HTMLInputElement).checked }) },
        }),
        h('span', {}, ...rich(T.autoWrap, { code: h('code', {}, '$ … $') })),
      ),
    ),
    h(
      'fieldset',
      { class: 'spell-settings' },
      h('legend', {}, T.spellCheck),
      h(
        'label',
        { class: 'check' },
        h('input', {
          attrs: { type: 'checkbox', checked: s.spellcheck },
          on: { change: (ev) => deps.onChange({ spellcheck: (ev.target as HTMLInputElement).checked }) },
        }),
        h('span', {}, T.spellUnderline),
      ),
      h(
        'label',
        { class: 'field field-column' },
        h('span', {}, T.spellLanguages),
        h(
          'select',
          { on: { change: (ev) => deps.onChange({ spellLanguages: (ev.target as HTMLSelectElement).value as SpellLanguages }) } },
          SPELL_LANGUAGES.map((l) => h('option', { attrs: { value: l.id, selected: l.id === s.spellLanguages } }, l.label)),
        ),
      ),
      h('p', { class: 'field-help' }, ...rich(T.spellHelp, { ctrl: h('kbd', {}, 'Ctrl'), dot: h('kbd', {}, '.') })),
      h(
        'details',
        { class: 'advanced' },
        h('summary', {}, ...rich(T.personalWords, { count: wordsCount })),
        h('p', { class: 'field-help' }, T.personalWordsHelp),
        wordsInput,
      ),
    ),
  ]
}

/**
 * «Assistente AI (facoltativo)»: il servizio (Anthropic o uno che parla la «lingua» di OpenAI, vedi
 * src/ai/services.ts) e, per quello scelto, la chiave, il modello e, se serve, l'indirizzo. Cambiando
 * servizio i campi si rifanno; chiave e modello di ognuno restano salvati, in questo browser.
 */
function aiFieldset(initial: Settings, deps: SettingsDialogDeps): HTMLElement {
  const current: Settings = { ...initial, aiKeys: { ...initial.aiKeys }, aiModels: { ...initial.aiModels }, aiUrls: { ...initial.aiUrls } }
  const fieldset = h('fieldset', { class: 'ai-settings' })
  const change = (changes: Partial<Settings>) => {
    Object.assign(current, changes)
    deps.onChange(changes)
  }
  const link = (href: string, text: string) => h('a', { attrs: { href, target: '_blank', rel: 'noopener noreferrer' } }, text)
  const render = () => {
    const service = aiService(current.aiService)
    const anthropic = service.id === 'anthropic'
    const keyInput = h('input', {
      attrs: {
        type: 'password',
        value: anthropic ? current.apiKey : (current.aiKeys[service.id] ?? ''),
        placeholder: service.keyPlaceholder,
        autocomplete: 'off',
        spellcheck: 'false',
        id: 'api-key',
      },
      on: {
        change: () => {
          const key = keyInput.value.trim()
          change(anthropic ? { apiKey: key } : { aiKeys: { ...current.aiKeys, [service.id]: key } })
        },
      },
    })
    const keyField =
      service.id === 'ollama'
        ? null
        : h(
            'label',
            { class: 'field field-column', attrs: { for: 'api-key' } },
            h('span', {}, service.id === 'compatible' ? T.apiKeyIfNeeded : T.apiKey),
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
                      ;(ev.currentTarget as HTMLButtonElement).textContent = keyInput.type === 'password' ? T.show : T.hide
                    },
                  },
                },
                T.show,
              ),
            ),
          )
    // Il modello: per Anthropic quelli di Claude; per gli altri si scrive, con qualche proposta.
    const listId = `ai-models-${service.id}`
    const modelField = anthropic
      ? h(
          'label',
          { class: 'field field-column' },
          h('span', {}, T.model),
          h(
            'select',
            { on: { change: (ev) => change({ model: (ev.target as HTMLSelectElement).value }) } },
            AI_MODELS.map((m) => h('option', { attrs: { value: m.id, selected: m.id === current.model } }, m.label)),
          ),
        )
      : h(
          'label',
          { class: 'field field-column' },
          h('span', {}, T.model),
          h('input', {
            attrs: { type: 'text', value: current.aiModels[service.id] ?? '', placeholder: service.model || T.modelPlaceholder, list: listId, autocomplete: 'off', spellcheck: 'false' },
            on: { change: (ev) => change({ aiModels: { ...current.aiModels, [service.id]: (ev.target as HTMLInputElement).value.trim() } }) },
          }),
          h('datalist', { attrs: { id: listId } }, service.models.map((m) => h('option', { attrs: { value: m } }))),
        )
    const urlField =
      service.id === 'ollama' || service.id === 'compatible'
        ? h(
            'label',
            { class: 'field field-column' },
            h('span', {}, T.apiUrl),
            h('input', {
              attrs: { type: 'url', value: current.aiUrls[service.id] ?? '', placeholder: service.url || 'https://api.openai.com/v1', autocomplete: 'off', spellcheck: 'false' },
              on: { change: (ev) => change({ aiUrls: { ...current.aiUrls, [service.id]: (ev.target as HTMLInputElement).value.trim() } }) },
            }),
          )
        : null
    const help =
      service.id === 'anthropic'
        ? h('p', { class: 'field-help' }, ...rich(T.anthropicHelp, { link: link(service.keyUrl!, T.anthropicKeyLink) }))
        : service.id === 'gemini'
          ? h('p', { class: 'field-help' }, ...rich(T.geminiHelp, { link: link(service.keyUrl!, 'Google AI Studio') }))
          : service.id === 'openrouter'
            ? h('p', { class: 'field-help' }, ...rich(T.openrouterHelp, { link: link(service.keyUrl!, 'openrouter.ai') }))
            : service.id === 'ollama'
              ? h('p', { class: 'field-help' }, ...rich(T.ollamaHelp(location.origin), { link: link('https://ollama.com', 'Ollama') }))
              : h('p', { class: 'field-help' }, T.compatibleHelp)
    const proxy = anthropic
      ? h(
          'details',
          { class: 'advanced' },
          h('summary', {}, T.proxy),
          h('p', { class: 'field-help' }, T.proxyHelp),
          h('input', {
            attrs: { type: 'url', value: current.apiBaseUrl, placeholder: T.proxyPlaceholder },
            on: { change: (ev) => change({ apiBaseUrl: (ev.target as HTMLInputElement).value.trim() }) },
          }),
        )
      : null
    const parts: (HTMLElement | null)[] = [
      h('legend', {}, T.aiLegend),
      inClaudeViewer() && anthropic ? h('p', { class: 'field-help field-note' }, T.aiDemo) : null,
      h('p', { class: 'field-help' }, T.aiIntro),
      h(
        'label',
        { class: 'field field-column' },
        h('span', {}, T.service),
        h(
          'select',
          {
            on: {
              change: (ev) => {
                change({ aiService: (ev.target as HTMLSelectElement).value })
                render()
                fieldset.querySelector<HTMLSelectElement>('select')?.focus()
              },
            },
          },
          AI_SERVICES.map((a) => h('option', { attrs: { value: a.id, selected: a.id === service.id } }, a.label)),
        ),
      ),
      help,
      keyField,
      modelField,
      urlField,
      proxy,
    ]
    fieldset.replaceChildren(...parts.filter((p): p is HTMLElement => p !== null))
  }
  render()
  return fieldset
}

/**
 * «Spiegazioni (prova)»: il modello che scrive i passaggi di «Spiegami», che gira in questo browser
 * (src/ai/localModels.ts), se è già scaricato (e il pulsante per toglierlo) e il tono. `refresh` guarda
 * di nuovo se il modello c'è: ogni volta che la sezione si mostra (si può togliere anche da «Dati»).
 */
function explainFieldset(initial: Settings, deps: SettingsDialogDeps): { el: HTMLElement; refresh(): void } {
  let chosen = localModel(initial.localModel).id
  const status = h('p', { class: 'field-help explain-status', attrs: { 'aria-live': 'polite' } })
  const remove = h(
    'button',
    {
      class: 'btn btn-small',
      attrs: { type: 'button', hidden: true },
      on: {
        click: () => {
          const model = localModel(chosen)
          remove.disabled = true
          status.textContent = T.removing(model.name)
          localLlm()
            .remove(model.id)
            .then(
              () => refresh(),
              (err: unknown) => (status.textContent = err instanceof Error ? err.message : String(err)),
            )
            .finally(() => (remove.disabled = false))
        },
      },
    },
    icon(ICONS.trash, 14),
    T.removeModel,
  )
  const refresh = async () => {
    const model = localModel(chosen)
    const here = await modelInBrowser(model.id)
    if (model.id !== chosen) return
    status.textContent = here ? T.modelHere(model.name) : T.modelDownload(model.name, model.size)
    remove.hidden = !here
  }
  const el = h(
    'fieldset',
    { class: 'explain-settings' },
    h('legend', {}, T.explainLegend),
    h('p', { class: 'field-help' }, T.explainHelp),
    h(
      'label',
      { class: 'field field-column' },
      h('span', {}, T.model),
      h(
        'select',
        {
          attrs: { id: 'local-model' },
          on: {
            change: (ev) => {
              chosen = (ev.target as HTMLSelectElement).value
              deps.onChange({ localModel: chosen })
              void refresh()
            },
          },
        },
        LOCAL_MODELS.map((m) => h('option', { attrs: { value: m.id, selected: m.id === chosen } }, `${m.label} (${m.size})`)),
      ),
    ),
    status,
    remove,
    h(
      'div',
      { class: 'field field-column' },
      h('span', {}, T.tone),
      h(
        'div',
        { class: 'segmented', attrs: { role: 'radiogroup', 'aria-label': T.toneLabel } },
        EXPLAIN_TONES.map((t) =>
          h(
            'label',
            {},
            h('input', { attrs: { type: 'radio', name: 'explain-tone', value: t.id, checked: initial.explainTone === t.id }, on: { change: () => deps.onChange({ explainTone: t.id }) } }),
            h('span', {}, t.label),
          ),
        ),
      ),
    ),
  )
  return { el, refresh: () => void refresh() }
}

/** «Backup»: scaricarlo e ripristinarlo; `accountLink` porta alla sezione «Account». */
function backupFieldset(deps: SettingsDialogDeps, accountLink: () => HTMLElement): HTMLElement {
  const help = deps.account
    ? rich(T.dataWithAccount, { email: deps.account.email, account: accountLink() })
    : rich(T.dataWithoutAccount, { account: accountLink() })
  return h(
    'fieldset',
    { class: 'backup-settings' },
    h('legend', {}, T.backup),
    h('p', { class: 'field-help' }, ...help),
    h(
      'div',
      { class: 'button-row' },
      h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => deps.onBackup() } }, icon(ICONS.download, 15), T.downloadBackup),
      h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => deps.onRestore() } }, icon(ICONS.upload, 15), T.restoreBackup),
    ),
    h('p', { class: 'field-help' }, ...rich(T.privacy, { link: privacyLink() })),
  )
}

/**
 * «Spazio in questo browser»: gli appunti (localStorage), le lavagne (IndexedDB), i modelli di
 * «Spiegami» (la Cache Storage di WebLLM, ognuno con «Togli») e il totale che dice il browser, con i
 * file per usare Glifo offline. Si misura ogni volta che la sezione si mostra; `onRemoved` dice alla
 * sezione «AI» che un modello non c'è più.
 */
function spaceFieldset(deps: SettingsDialogDeps, onRemoved: () => void): { el: HTMLElement; refresh(): void } {
  const list = h('dl', { class: 'space-list' })
  const quota = h('p', { class: 'field-help', attrs: { hidden: true } })
  const problem = h('p', { class: 'field-help space-problem', attrs: { role: 'alert', hidden: true } })
  const el = h('fieldset', { class: 'space-settings' }, h('legend', {}, T.space), list, problem, quota, h('p', { class: 'field-help' }, T.spaceHelp))
  const row = (label: string, size: string, extra: HTMLElement | null = null, className = '') =>
    h('div', { class: `space-row ${className}`.trim() }, h('dt', {}, label), h('dd', {}, h('span', { class: 'space-size' }, size), extra))
  const removeButton = (model: DownloadedModel) => {
    const button = h(
      'button',
      { class: 'btn btn-small', title: T.removeLabel(model.name), attrs: { type: 'button', 'aria-label': T.removeLabel(model.name) } },
      icon(ICONS.trash, 14),
      T.remove,
    )
    button.addEventListener('click', () => {
      button.disabled = true
      problem.hidden = true
      localLlm()
        .remove(model.id)
        .then(
          () => {
            onRemoved()
            void refresh()
          },
          (err: unknown) => {
            problem.textContent = err instanceof Error ? err.message : String(err)
            problem.hidden = false
            button.disabled = false
          },
        )
    })
    return button
  }
  let run = 0
  const refresh = async () => {
    const mine = ++run
    const notes = notesBytes()
    list.replaceChildren(row(T.spaceNotes, formatBytes(notes)), row(T.spaceBoards, T.measuring), row(T.spaceModels, T.measuring))
    const [boards, models, estimate] = await Promise.all([
      deps.boardsBytes ? deps.boardsBytes().catch(() => null) : Promise.resolve(null),
      modelsInBrowser(),
      storageEstimate(),
    ])
    if (mine !== run) return
    const rows = [row(T.spaceNotes, formatBytes(notes)), row(T.spaceBoards, boards === null ? T.unknown : formatBytes(boards))]
    if (!models.length) rows.push(row(T.spaceModels, T.spaceNone))
    for (const m of models) rows.push(row(m.complete ? T.spaceModel(m.name) : T.spacePartModel(m.name), formatBytes(m.bytes), removeButton(m), 'space-model'))
    // Nel totale del browser gli appunti (localStorage) di solito non ci sono: si aggiungono.
    if (estimate) rows.push(row(T.spaceTotal, formatBytes(estimate.usage + notes), null, 'space-total'))
    list.replaceChildren(...rows)
    quota.hidden = !estimate?.quota
    quota.textContent = estimate?.quota ? T.spaceQuota(formatBytes(estimate.quota)) : ''
  }
  return { el, refresh: () => void refresh() }
}

/** «12 ottobre 2026» (o «12 October 2026») da `__GLIFO_VERSION__`, «1a5dd91, 2026-10-12 18:30» (l'ora è UTC). */
function versionText(version: string): string {
  const [commit, built = ''] = version.split(', ')
  const when = new Date(`${built.replace(' ', 'T')}:00Z`)
  const date = Number.isNaN(when.getTime()) ? built : when.toLocaleDateString(dateLocale(), { day: 'numeric', month: 'long', year: 'numeric' })
  return commit === 'locale' ? T.localVersion(date) : T.version(commit, date)
}

/** «Informazioni»: la versione, la guida, le domande frequenti e i commenti, l'informativa, le licenze. */
function aboutSection(deps: SettingsDialogDeps): HTMLElement[] {
  return [
    h(
      'fieldset',
      { class: 'about-settings' },
      h('legend', {}, 'Glifo'),
      h('p', { class: 'about-version' }, versionText(__GLIFO_VERSION__)),
      h('p', { class: 'field-help' }, T.aboutHelp),
      h(
        'div',
        { class: 'button-row' },
        h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => deps.onGuide?.() } }, icon(ICONS.help, 15), T.howToUse),
        // Le domande frequenti e i commenti sono una pagina a parte (faq.html), come l'informativa.
        h('a', { class: 'btn', attrs: { href: FAQ_URL, target: '_blank', rel: 'noopener' } }, icon(ICONS.info, 15), T.faq),
        h('button', { class: 'btn', attrs: { type: 'button' }, on: { click: () => deps.onFeedback?.() } }, icon(ICONS.message, 15), T.writeComment),
      ),
    ),
    h(
      'fieldset',
      { class: 'licenses-settings' },
      h('legend', {}, T.privacyAndLicenses),
      h('p', { class: 'field-help' }, ...rich(T.privacy, { link: privacyLink() })),
      h(
        'details',
        { class: 'advanced' },
        h('summary', {}, T.licenses(LICENSES.length)),
        h(
          'ul',
          { class: 'license-list' },
          LICENSES.map((l) =>
            h(
              'li',
              {},
              h('strong', {}, l.name),
              ` · ${l.what} · `,
              h('a', { attrs: { href: `licenze/${l.file}`, target: '_blank', rel: 'noopener' } }, T.licenseOf(l.license)),
            ),
          ),
        ),
      ),
    ),
  ]
}
