/**
 * I programmi liberi su cui è costruito Glifo, con la loro licenza: in Impostazioni → Informazioni, con
 * il testo di ogni licenza in public/licenze/ (pubblicato insieme all'app, anche per l'uso offline).
 * tests/licenses.test.ts controlla che ogni pacchetto di `dependencies` in package.json sia qui e che i
 * file esistano: aggiungendo una libreria, va aggiunta anche qui con il testo della sua licenza.
 */
import { texts } from '../i18n'

const T = texts({
  editor: ['l\'editor', 'the editor'],
  formulas: ['le formule', 'formulas'],
  preview: ['l\'anteprima e le note a piè di pagina', 'the preview and footnotes'],
  clean: ['la pulizia delle note di altre persone', 'cleaning up notes from other people'],
  code: ['i colori dei blocchi di codice', 'colors in code blocks'],
  diagrams: ['gli schemi', 'diagrams'],
  board: ['la lavagna', 'the whiteboard'],
  excel: ['i file di Excel', 'Excel files'],
  spell: ['il controllo ortografico', 'spell check'],
  italian: ['il dizionario italiano, di Andrea Pescetti e altri', 'the Italian dictionary, by Andrea Pescetti and others'],
  english: ['il dizionario inglese, di SCOWL', 'the English dictionary, from SCOWL'],
  explain: ['«Spiegami» nel browser', '“Explain” in the browser'],
  models: ['i modelli di «Spiegami», del Qwen Team di Alibaba Cloud', 'the “Explain” models, by Alibaba Cloud\'s Qwen Team'],
  account: ['l\'account', 'the account'],
  assistant: ['l\'assistente AI con Claude', 'the AI assistant with Claude'],
})

export interface License {
  name: string
  /** A cosa serve in Glifo, nella lingua di Glifo. */
  readonly what: string
  /** Il nome della licenza. */
  license: string
  /** Il testo della licenza, in public/licenze/. */
  file: string
  /** I pacchetti di package.json che copre; uno che finisce con «/» vale per tutti quelli che cominciano così. */
  packages: readonly string[]
}

export const LICENSES: readonly License[] = [
  { name: 'CodeMirror', get what() { return T.editor }, license: 'MIT', file: 'codemirror.txt', packages: ['@codemirror/', '@lezer/'] },
  { name: 'KaTeX', get what() { return T.formulas }, license: 'MIT', file: 'katex.txt', packages: ['katex'] },
  { name: 'markdown-it', get what() { return T.preview }, license: 'MIT', file: 'markdown-it.txt', packages: ['markdown-it', 'markdown-it-footnote'] },
  { name: 'DOMPurify', get what() { return T.clean }, license: 'Apache 2.0 / MPL 2.0', file: 'dompurify.txt', packages: ['dompurify'] },
  { name: 'highlight.js', get what() { return T.code }, license: 'BSD 3-Clause', file: 'highlight-js.txt', packages: ['highlight.js'] },
  { name: 'maxGraph', get what() { return T.diagrams }, license: 'Apache 2.0', file: 'maxgraph.txt', packages: ['@maxgraph/core'] },
  { name: 'perfect-freehand', get what() { return T.board }, license: 'MIT', file: 'perfect-freehand.txt', packages: ['perfect-freehand'] },
  { name: 'fflate', get what() { return T.excel }, license: 'MIT', file: 'fflate.txt', packages: ['fflate'] },
  { name: 'Hunspell', get what() { return T.spell }, license: 'MIT, MPL 1.1 / GPL 2 / LGPL 2.1', file: 'hunspell.txt', packages: ['@farscrl/hunspell-wasm'] },
  { name: 'dictionary-it', get what() { return T.italian }, license: 'GPL 3', file: 'dizionario-italiano.txt', packages: ['dictionary-it'] },
  { name: 'dictionary-en', get what() { return T.english }, license: 'MIT, BSD', file: 'dizionario-inglese.txt', packages: ['dictionary-en'] },
  { name: 'WebLLM', get what() { return T.explain }, license: 'Apache 2.0', file: 'web-llm.txt', packages: ['@mlc-ai/web-llm'] },
  { name: 'Qwen3', get what() { return T.models }, license: 'Apache 2.0', file: 'qwen3.txt', packages: [] },
  { name: 'Supabase', get what() { return T.account }, license: 'MIT', file: 'supabase.txt', packages: ['@supabase/supabase-js'] },
  { name: 'Anthropic SDK', get what() { return T.assistant }, license: 'MIT', file: 'anthropic-sdk.txt', packages: ['@anthropic-ai/sdk'] },
]

/** Il pacchetto `name` è tra quelli di una licenza dell'elenco? */
export function licenseOf(name: string): License | undefined {
  return LICENSES.find((l) => l.packages.some((p) => (p.endsWith('/') ? name.startsWith(p) : name === p)))
}
