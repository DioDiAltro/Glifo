import { describe, expect, it } from 'vitest'
import { parseSync } from 'vite'

/**
 * Le traduzioni (src/i18n.ts, GRAFICA.md punto 6). In tutto src/ controlla le tabelle dei testi:
 * ogni testo di `texts` ha l'italiano e l'inglese, con gli stessi nomi tra graffe, e ogni `byLang` le due
 * versioni. Nelle parti già tradotte (TRANSLATED) segnala l'italiano rimasto scritto direttamente nel
 * codice: le frasi con le parole o le lettere dell'italiano e le parole dell'interfaccia con la maiuscola
 * (Chiudi, Salva…). Un testo che deve restare italiano in ogni lingua (per esempio una parola che si
 * scrive nella nota) va sulla riga con il commento «non si traduce».
 */

/**
 * Le parti tradotte: una cartella (con la barra alla fine) o un file. Dal 12 ottobre 2026 è tutto `src/`
 * (GRAFICA.md, punto 6), tranne i dati dei simboli, che controlla tests/symbolsEn.test.ts.
 */
const TRANSLATED = [
  'src/i18n.ts',
  'src/main.ts',
  'src/site.ts',
  'src/ui/',
  'src/board/',
  'src/share/',
  'src/account/',
  'src/editor/',
  'src/render/',
  'src/schema/',
  'src/store/',
  'src/spell/',
  'src/lists/',
  'src/host.ts',
  'src/relocation.ts',
  'src/ai/',
  'src/graph/',
  'src/math/',
  // I dati dei simboli (src/symbols/data/) hanno i testi in coppie [italiano, inglese] dentro le chiamate: li controlla tests/symbolsEn.test.ts.
  'src/symbols/define.ts',
  'src/symbols/index.ts',
  'src/symbols/template.ts',
  'src/symbols/types.ts',
  'src/search/',
  'src/spreadsheet/',
]

/** Dentro le parti tradotte, i file che restano in italiano (e perché). */
const NOT_TRANSLATED: Record<string, string> = {
  'src/ui/touchLogPanel.ts': 'il registro dei tocchi si toglie (GRAFICA.md, punto 7)',
  'src/board/touchlog.ts': 'il registro dei tocchi si toglie (GRAFICA.md, punto 7)',
}

const sources = import.meta.glob('../src/**/*.ts', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const files = Object.entries(sources)
  .map(([path, code]) => ({ path: path.replace(/^\.\.\//, ''), code }))
  .sort((a, b) => a.path.localeCompare(b.path))

const isTranslated = (path: string) =>
  !(path in NOT_TRANSLATED) && TRANSLATED.some((t) => (t.endsWith('/') ? path.startsWith(t) : path === t))

/** Parole che in un testo inglese (o nel codice) non ci sono: articoli, preposizioni e poche altre. */
const ITALIAN_WORDS = new Set(
  (
    'il lo la gli le un uno una di del dello della dei degli delle dal dallo dalla dai dagli dalle nel nello ' +
    'nella nei negli nelle sul sullo sulla sui sugli sulle col con per tra fra che non ma se come più al allo ' +
    'alla agli alle questo questa questi queste quello quella quelli quelle anche già dove quando solo poi ' +
    'qui sono hai puoi ogni tutto tutti tutte niente nessun nessuna oppure ancora prima dopo senza sei siamo ' +
    'essere fatto nota appunti cartella cartelle pagina riga righe colonna colonne parola parole volta volte ' +
    'minuti secondi giorni elementi modifiche commento commenti simbolo simboli risultato passaggi passaggio ' +
    'oggi ieri ecco cosa perché qualcosa scrivi scegli premi clicca apri benvenuto grazie adesso subito ' +
    'sempre mai molto bene vuoi devi serve servono sotto sopra accanto dentro fuori insieme invece'
  ).split(' '),
)

/** Parole dell'interfaccia che, da sole e con la maiuscola, sono un'etichetta italiana. */
const ITALIAN_LABELS = new Set(
  (
    'chiudi annulla salva apri elimina inserisci copia incolla indietro avanti riprova scarica modifica cerca ' +
    'nuova nuovo rinomina sposta impostazioni accedi esci condividi stampa ricarica lavagna anteprima diviso ' +
    'simboli penna gomma evidenziatore selezione sì nota cartella cartelle commenti grafico tabella spiegami ' +
    'inizia aggiungi togli sincronizza ripristina mostra nascondi grassetto corsivo titolo elenco collegamento ' +
    'immagine codice tema chiaro scuro automatico lingua lingue appunti oggi ieri errore attenzione fatto ' +
    'invio maiusc canc esempio esempi testo pagina avviso domande problema altro strumenti colore spessore ' +
    'ripeti formattazione inserimenti viste vista pannello riduci ingrandisci schermo intero conferma ' +
    'continua fine pronto caricamento attendi dimensione aspetto dati informativa'
  ).split(' '),
)

/** Le lettere accentate e gli apostrofi dell'italiano (l'anteprima, dell'AI, c'è). */
const ITALIAN_MARKS = /[àèéìòùÀÈÉÌÒÙ]|(^|[^a-z])(l|dell|all|nell|dall|sull|un|quest|quell|c|dov|tutt)'[a-zà-ù]/i

/**
 * Pezzi di codice, non testi: classi CSS e id («btn btn-ai», «ai-subject»), nomi di file e percorsi
 * («/nota.html», «glifo-backup-»). Senza spazi, con un trattino, un punto o una barra; oppure parole
 * minuscole con almeno un trattino.
 */
function looksLikeCode(text: string): boolean {
  const parts = text.split(/\{\w+\}/).map((p) => p.trim()).filter(Boolean)
  if (!parts.length) return true
  return parts.every((p) => {
    if (!/\s/.test(p)) return /[-./_]/.test(p) && !ITALIAN_MARKS.test(p)
    const tokens = p.split(/\s+/)
    return tokens.every((t) => /^[a-z0-9-]+$/.test(t)) && tokens.some((t) => t.includes('-'))
  })
}

function looksItalian(text: string, template = false): boolean {
  if (looksLikeCode(text)) return false
  const plain = text.replace(/\{\w+\}/g, ' ')
  if (ITALIAN_MARKS.test(plain)) return true
  const words = plain.toLowerCase().match(/[a-zà-ù]+/g) ?? []
  const trimmed = plain.trim()
  if (template || /\s/.test(trimmed)) return words.some((w) => ITALIAN_WORDS.has(w) || (template && ITALIAN_LABELS.has(w)))
  return words.length === 1 && /^[A-ZÀ-Ù]/.test(trimmed) && ITALIAN_LABELS.has(words[0])
}

/** Le lettere che in inglese non ci sono (un testo inglese copiato dall'italiano). */
const NOT_ENGLISH = /[àèìòùÀÈÌÒÙ]|(^|[^a-z])(l|dell|all|nell|dall|sull|un)'[a-z]/i

interface AstNode {
  type: string
  start: number
  end: number
  [key: string]: unknown
}

const isNode = (v: unknown): v is AstNode => typeof v === 'object' && v !== null && typeof (v as AstNode).type === 'string'

function children(node: AstNode): AstNode[] {
  const out: AstNode[] = []
  for (const [key, value] of Object.entries(node)) {
    if (key === 'type' || key === 'start' || key === 'end') continue
    if (Array.isArray(value)) out.push(...value.filter(isNode))
    else if (isNode(value)) out.push(value)
  }
  return out
}

/** Il testo di un letterale (per i template, le parti fisse) o null se non è un testo. */
function literalText(node: AstNode): { text: string; template: boolean } | null {
  if (node.type === 'Literal' && typeof node.value === 'string') return { text: node.value, template: false }
  if (node.type === 'TemplateLiteral') {
    const quasis = node.quasis as { value: { cooked: string | null } }[]
    return { text: quasis.map((q) => q.value.cooked ?? '').join(' {x} '), template: quasis.length > 1 }
  }
  return null
}

const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',')

const calleeName = (node: AstNode) => {
  const callee = node.callee as AstNode
  return callee?.type === 'Identifier' ? (callee.name as string) : null
}

/** Gli array [italiano, inglese] che una voce di `texts` dà (direttamente o da una funzione). */
function entryPairs(value: AstNode): AstNode[] | null {
  if (value.type === 'ArrayExpression') return [value]
  if (value.type !== 'ArrowFunctionExpression' && value.type !== 'FunctionExpression') return null
  const body = value.body as AstNode
  if (body.type !== 'BlockStatement') return body.type === 'ArrayExpression' ? [body] : null
  const pairs: AstNode[] = []
  const visit = (n: AstNode) => {
    if (n.type === 'ReturnStatement' && isNode(n.argument)) pairs.push(n.argument)
    if (n.type.includes('Function')) return
    children(n).forEach(visit)
  }
  children(body).forEach(visit)
  return pairs.length && pairs.every((p) => p.type === 'ArrayExpression') ? pairs : null
}

function check(path: string, code: string, scanLiterals: boolean): string[] {
  const problems: string[] = []
  const result = parseSync(path, code, { lang: 'ts' }) as unknown as { program: AstNode; errors: unknown[] }
  const lineOf = (offset: number) => code.slice(0, offset).split('\n').length
  const lines = code.split('\n')
  const report = (node: AstNode, message: string): void => {
    problems.push(`${path}:${lineOf(node.start)}: ${message}`)
  }

  function checkPair(pair: AstNode): void {
    const elements = (pair.elements as (AstNode | null)[]).filter(isNode)
    if (elements.length !== 2) return report(pair, 'un testo vuole due versioni, [italiano, inglese]')
    const [it, en] = elements.map(literalText)
    if (!it || !en) return
    if (!en.text.trim()) return report(pair, `manca l'inglese di «${it.text}»`)
    if (placeholders(it.text) !== placeholders(en.text)) report(pair, `i nomi tra graffe non sono gli stessi: «${it.text}» / «${en.text}»`)
    if (en.text === it.text && looksItalian(it.text, it.template)) report(pair, `l'inglese è uguale all'italiano: «${it.text}»`)
    else if (NOT_ENGLISH.test(en.text)) report(pair, `l'inglese sembra italiano: «${en.text}»`)
  }

  function visit(node: AstNode, exempt: boolean): void {
    if (node.type === 'CallExpression') {
      const name = calleeName(node)
      const [arg] = (node.arguments as AstNode[]) ?? []
      if (name === 'texts') {
        if (arg?.type !== 'ObjectExpression') report(node, 'texts() vuole un oggetto con i testi')
        else {
          for (const prop of arg.properties as AstNode[]) {
            if (prop.type !== 'Property') continue
            const pairs = entryPairs(prop.value as AstNode)
            if (!pairs) report(prop, 'ogni testo è [italiano, inglese] o una funzione che lo dà')
            else pairs.forEach(checkPair)
          }
        }
        children(node).forEach((c) => visit(c, true))
        return
      }
      if (name === 'byLang') {
        const keys = arg?.type === 'ObjectExpression' ? (arg.properties as AstNode[]).map((p) => ((p.key as AstNode)?.name as string) ?? '') : []
        if (!keys.includes('it') || !keys.includes('en')) report(node, 'byLang() vuole le due versioni, it ed en')
        children(node).forEach((c) => visit(c, true))
        return
      }
      // I messaggi per chi sviluppa (console.warn…) non li vede chi usa Glifo.
      const callee = node.callee as AstNode
      if (callee?.type === 'MemberExpression' && (callee.object as AstNode)?.type === 'Identifier' && (callee.object as AstNode).name === 'console') {
        return
      }
      if (name === 'pick' && arg?.type === 'ArrayExpression') {
        checkPair(arg)
        children(node).forEach((c) => visit(c, true))
        return
      }
    }
    if (
      node.type === 'ImportDeclaration' ||
      node.type === 'ExportAllDeclaration' ||
      node.type === 'TSLiteralType' ||
      node.type === 'TSImportType' ||
      (node.type === 'ImportExpression' && !exempt)
    ) {
      return
    }
    if (node.type === 'ExportNamedDeclaration' && node.source) {
      return
    }
    if (node.type === 'Property' && !node.computed) {
      visit(node.value as AstNode, exempt)
      return
    }
    const literal = literalText(node)
    if (literal && scanLiterals && !exempt) {
      const line = lines[lineOf(node.start) - 1] ?? ''
      if (!line.includes('non si traduce') && looksItalian(literal.text, literal.template)) {
        report(node, `testo italiano fuori dalle traduzioni: «${literal.text.replace(/\s+/g, ' ').slice(0, 90)}»`)
      }
    }
    children(node).forEach((c) => visit(c, exempt))
  }

  if (result.errors.length) problems.push(`${path}: il file non si legge`)
  visit(result.program, false)
  return problems
}

describe('traduzioni', () => {
  it('le parti tradotte esistono', () => {
    for (const t of [...TRANSLATED, ...Object.keys(NOT_TRANSLATED)]) {
      expect(files.some((f) => (t.endsWith('/') ? f.path.startsWith(t) : f.path === t)), t).toBe(true)
    }
  })

  it.each(files.map((f) => [f.path, f.code]))('%s', (path, code) => {
    expect(check(path, code, isTranslated(path))).toEqual([])
  })
})

describe('il controllo delle traduzioni', () => {
  const problems = (code: string, scan = true) => check('src/prova.ts', code, scan)

  it('trova l\'italiano rimasto nel codice, non quello nelle tabelle', () => {
    expect(problems("const a = 'Il testo è qui'")).toHaveLength(1)
    expect(problems("const a = 'Chiudi'")).toHaveLength(1)
    expect(problems('const a = `${n} cartelle`')).toHaveLength(1)
    expect(problems("const a = 'grafico'; const b = 'is-open'; const c = 'Glifo'")).toEqual([])
    // Classi CSS, id e nomi di file non sono testi.
    expect(problems("const a = 'btn btn-ai'; const b = `ai-subject${x ? ' is-chosen' : ''}`; const c = `glifo-dati-${d}.json`")).toEqual([])
    expect(problems("const a = `${origin}/nota.html${hash}`; const b = 'Google AI Studio'")).toEqual([])
    expect(problems("const a = 'Chiudi' // non si traduce")).toEqual([])
    expect(problems("import x from './qui è'")).toEqual([])
    expect(problems("const T = texts({ close: ['Chiudi', 'Close'], n: (k: number) => [`${k} note`, `${k} notes`] })")).toEqual([])
    expect(problems("const a = 'Il testo è qui'", false)).toEqual([])
    expect(problems("console.warn('Non è andata')")).toEqual([])
  })

  it('ogni testo ha l\'inglese, con gli stessi nomi tra graffe', () => {
    expect(problems("const T = texts({ a: ['Chiudi'] })")).toHaveLength(1)
    expect(problems("const T = texts({ a: ['Chiudi', ''] })")).toHaveLength(1)
    expect(problems("const T = texts({ a: ['Premi {key}', 'Press {tasto}'] })")).toHaveLength(1)
    expect(problems("const T = texts({ a: ['Il testo', 'Il testo'] })")).toHaveLength(1)
    expect(problems("const T = texts({ a: ['Apri', 'Apri l\\'anteprima'] })")).toHaveLength(1)
    expect(problems("const T = texts({ a: 'Chiudi' })")).toHaveLength(1)
    expect(problems("const T = texts({ a: ['Markdown', 'Markdown'], b: ['OK', 'OK'] })")).toEqual([])
    expect(problems("const x = byLang({ it: () => 'Ciao' })")).toHaveLength(1)
    expect(problems("const x = byLang({ it: () => 'Il testo è qui', en: () => 'The text is here' })")).toEqual([])
  })
})
