import type { Token } from 'markdown-it'

/**
 * Spostare uno schema, un grafico o una tabella nella nota, come le celle di Colab: le frecce ↑ ↓ dell'anteprima lo
 * fanno saltare oltre il blocco vicino (paragrafo, titolo, elenco intero, tabella, formula $$, altro
 * blocco di codice…), nello stesso contenitore: la nota o la stessa voce d'elenco. Qui i conti, sui
 * token dei blocchi di markdown-it (lo stesso parser dell'anteprima, vedi `parseBlocks` in markdown.ts):
 * `markMoves` dice quali frecce sono accese, `moveFencedBlock` prepara il testo nuovo e lo rilegge per
 * essere sicuro che il resto della nota resti com'era.
 */

export type MoveDir = 'up' | 'down'
export type BlockKind = 'grafico' | 'schema' | 'tabella'

/** Le frecce di un blocco: verso dove si può spostare, e se sta in una voce d'elenco (per i titoli). */
export interface MoveHint {
  up: boolean
  down: boolean
  inItem: boolean
}

const MOVABLE = new Set<string>(['grafico', 'schema', 'tabella'])

/** Il nome del blocco di codice: la prima parola dopo ```, in minuscolo (come nel renderer). */
export function fenceName(t: Token): string {
  return t.info.trim().split(/\s+/)[0].toLowerCase()
}

const movable = (t: Token) => t.type === 'fence' && MOVABLE.has(fenceName(t))

/**
 * L'impronta del contenuto di un blocco (FNV-1a, 8 cifre esadecimali): l'anteprima la scrive in
 * `data-hash`, e con la riga si ritrova il blocco nel testo. Il testo di `data-graph` non basta:
 * DOMPurify toglie gli spazi in fondo e, con «-->» dentro, l'attributo intero.
 */
export function contentHash(text: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(16).padStart(8, '0')
}

/**
 * Il blocco di codice ha la sua riga di chiusura? Le righe di `map` sono quelle del contenuto più
 * l'apertura e la chiusura. Si contano così (non guardando l'ultima riga) perché markdown-it chiude
 * un blocco anche alla fine della voce d'elenco, e una riga «      ```» troppo rientrata non chiude.
 */
export function fenceClosed(t: Token): boolean {
  if (!t.map) return false
  const c = t.content
  const lines = (c.match(/\n/g)?.length ?? 0) + (c && !c.endsWith('\n') ? 1 : 0)
  return t.map[1] - t.map[0] - 2 === lines
}

/** Un blocco aperto arriva fino alla fine del contenitore: messo dopo, un grafico ne diventerebbe il testo. */
function closed(t: Token): boolean {
  if (t.type === 'fence') return fenceClosed(t)
  if (t.type === 'math_block') return t.meta?.closed !== false
  return true
}

/** I tag il cui contenuto, per il browser, è testo fino alla chiusura. */
const RAW_TAGS = /<(script|style|textarea|title|xmp|iframe|noembed|noframes|noscript|plaintext)(?=[\s>/])/gi

/**
 * HTML scritto nella nota che, per il browser, non finisce: un commento «<!--» o uno <script> senza la
 * chiusura nascondono tutto quello che viene dopo nell'anteprima (per markdown-it invece il blocco
 * finisce con la voce o con la riga vuota). Un grafico messo lì dopo sparirebbe.
 */
function swallows(t: Token): boolean {
  let text: string
  if (t.type === 'html_block') {
    text = t.content
    if (text.lastIndexOf('<!--') > text.lastIndexOf('-->')) return true
  } else if (t.type === 'inline') {
    // Nel codice tra apici i tag sono testo, e anche dopo una barra rovesciata (\<script>).
    text = t.content.replace(/(`+)[\s\S]*?\1/g, '').replace(/\\[\s\S]/g, '')
  } else return false
  // Nei commenti chiusi i tag sono testo.
  text = text.replace(/<!--[\s\S]*?-->/g, '')
  for (const m of text.matchAll(RAW_TAGS)) {
    if (!new RegExp(`</${m[1]}\\s*>`, 'i').test(text.slice(m.index))) return true
  }
  return false
}

/** Il fratello si può scavalcare: chiuso, e senza HTML che non finisce. */
function passable(tokens: Token[], s: Sibling): boolean {
  if (!closed(tokens[s.start])) return false
  for (let i = s.start; i <= s.end; i++) if (swallows(tokens[i])) return false
  return true
}

const COMMENTS = /^(?:\s*<!--[\s\S]*?-->)+\s*$/

/**
 * I blocchi che nell'anteprima non si vedono dove sono scritti: le definizioni dei link ([r]: url),
 * quelle delle note a piè di pagina e i commenti HTML. Non si saltano da soli (il clic non cambierebbe
 * niente): restano attaccati al blocco che si vede prima di loro.
 */
function invisible(t: Token): boolean {
  return t.type === 'reference_definition' || t.type === 'footnote_reference_open' || (t.type === 'html_block' && COMMENTS.test(t.content))
}

/** L'indice del token che chiude il gruppo aperto in `i` (lo stesso `i` per un token singolo). */
function closeIdx(tokens: Token[], i: number): number {
  if (tokens[i].nesting !== 1) return i
  let depth = 0
  for (let j = i; j < tokens.length; j++) {
    depth += tokens[j].nesting
    if (depth === 0) return j
  }
  return tokens.length - 1
}

interface Sibling {
  start: number
  end: number
  visible: boolean
  /** Il primo blocco di una voce, sulla riga del marcatore: non si scavalca. */
  fixed: boolean
}

interface Place {
  self: number
  siblings: Sibling[]
  container: Token | null
}

/** Si sposta solo nella nota o in una voce d'elenco: le citazioni e le note a piè di pagina no. */
const ALLOWED = /^(bullet_list|ordered_list|list_item)_open$/

/**
 * Il blocco `idx` fra i suoi fratelli (i blocchi allo stesso livello nello stesso contenitore).
 * `ancestors`: gli indici dei token aperti che lo contengono. Null se non si sposta: aperto, in una
 * citazione o in una nota a piè di pagina, o sulla riga del marcatore («- ```grafico»).
 */
function blockPlace(tokens: Token[], idx: number, ancestors: readonly number[]): Place | null {
  const block = tokens[idx]
  if (!fenceClosed(block)) return null
  if (!ancestors.every((a) => ALLOWED.test(tokens[a].type))) return null
  const at = ancestors.length ? ancestors[ancestors.length - 1] : -1
  const container = at >= 0 ? tokens[at] : null
  if (container && container.map?.[0] === block.map![0]) return null
  const siblings: Sibling[] = []
  let self = -1
  for (let j = at + 1; j < tokens.length; j++) {
    const t = tokens[j]
    if (t.level < block.level) break
    const end = closeIdx(tokens, j)
    if (j === idx) self = siblings.length
    siblings.push({ start: j, end, visible: !invisible(t), fixed: !!container && t.map?.[0] === container.map?.[0] })
    j = end
  }
  return { self, siblings, container }
}

/** Il fratello visibile oltre cui si salta andando in `dir`, o null (la freccia è spenta). */
function moveTarget(tokens: Token[], place: Place, dir: MoveDir): Sibling | null {
  const step = dir === 'up' ? -1 : 1
  for (let k = place.self + step; k >= 0 && k < place.siblings.length; k += step) {
    const s = place.siblings[k]
    if (s.fixed || !passable(tokens, s)) return null
    if (s.visible) return s
  }
  return null
}

/** Scorre i token con la pila delle aperture: per ogni token, quelli che lo contengono. */
function walk(tokens: Token[], visit: (t: Token, i: number, ancestors: readonly number[]) => void): void {
  const stack: number[] = []
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    visit(t, i, stack)
    if (t.nesting === 1) stack.push(i)
    else if (t.nesting === -1) stack.pop()
  }
}

/**
 * Regola di markdown-it subito dopo i blocchi (prima che spariscano i riferimenti e le note, così
 * vede gli stessi token di `moveFencedBlock`): in `meta.move` di ogni schema, grafico e tabella le sue frecce
 * (null: non si sposta, niente frecce).
 */
export function markMoves(tokens: Token[]): void {
  walk(tokens, (t, i, ancestors) => {
    if (!movable(t)) return
    const place = blockPlace(tokens, i, ancestors)
    const move: MoveHint | null = place && {
      up: !!moveTarget(tokens, place, 'up'),
      down: !!moveTarget(tokens, place, 'down'),
      inItem: !!place.container,
    }
    t.meta = { ...(t.meta ?? {}), move }
  })
}

/** Gli attributi per l'anteprima: l'impronta sempre, le frecce (`data-move`) se il blocco si sposta. */
export function moveAttrs(t: Token): string {
  let attrs = ` data-hash="${contentHash(t.content)}"`
  const move = t.meta?.move as MoveHint | null | undefined
  if (move) {
    attrs += ` data-move="${[move.up && 'up', move.down && 'down'].filter(Boolean).join(' ')}"`
    if (move.inItem) attrs += ' data-move-in="voce"'
  }
  return attrs
}

/**
 * Com'è fatto un token, per confrontare la nota prima e dopo: tipo, livello, testo (anche quello dei
 * paragrafi, così si vede se due si uniscono), attributi. Senza l'a capo finale, che un blocco in
 * fondo alla nota non ha. `loose`: un elenco stretto può diventare largo (le righe vuote aggiunte).
 */
function signature(t: Token, loose: boolean): string {
  const hidden = loose && t.type.startsWith('paragraph') ? null : t.hidden
  return JSON.stringify([t.type, t.tag, t.nesting, t.level, t.markup, t.info, t.content.replace(/\n$/, ''), hidden, t.attrs, t.meta?.label ?? null, t.meta?.closed ?? null])
}

export type MoveFailure = 'stale' | 'edge' | 'structure'

export interface BlockMove {
  ok: true
  /** Il testo nuovo della nota. */
  text: string
  /** La riga (da 0) dove ora comincia il blocco. */
  line: number
  /** Le modifiche: il blocco scavalcato non si tocca, così cursore e segni lì restano dove sono. */
  changes: { from: number; to: number; insert: string }[]
  /** Dove stava il blocco (in caratteri) e dove sta ora: il cursore che c'era dentro lo segue. */
  oldFrom: number
  oldTo: number
  newFrom: number
  /** Lo stesso per le righe scavalcate: il cursore lì resta sulla stessa lettera, anche dopo l'ultima. */
  skippedFrom: number
  skippedTo: number
  skippedNewFrom: number
  /** E per le righe vuote fra i due (se non ce ne sono, gapTo < gapFrom). */
  gapFrom: number
  gapTo: number
  gapNewFrom: number
  /** La riga nuova di una riga di prima (le righe vuote aggiunte non vengono da nessuna). */
  mapLine(line: number): number
  /** Al contrario: la riga di prima di una riga nuova (per Annulla). */
  unmapLine(line: number): number
  /** Sono servite righe vuote in più (un elenco stretto può essere diventato largo). */
  blankLines: boolean
}

/** Il blocco da spostare: alla riga `line` con quell'impronta, o l'unico con quell'impronta. */
function findBlock(tokens: Token[], line: number, hash: string): { idx: number; ancestors: number[] } | null {
  const found: { idx: number; ancestors: number[] }[] = []
  let exact: { idx: number; ancestors: number[] } | null = null
  walk(tokens, (t, i, ancestors) => {
    if (exact || !movable(t) || contentHash(t.content) !== hash) return
    const place = { idx: i, ancestors: [...ancestors] }
    if (t.map?.[0] === line) exact = place
    else found.push(place)
  })
  return exact ?? (found.length === 1 ? found[0] : null)
}

const blank = (s: string | undefined) => s !== undefined && /^[ \t]*$/.test(s)

/**
 * Sposta il blocco ```schema o ```grafico che comincia alla riga `line` (da 0) con l'impronta `hash`
 * oltre il blocco vicino, in su o in giù. `parse`: i token dei blocchi (`parseBlocks`).
 *
 * Si spostano righe intere, così rientri e tab restano quelli scritti. Le righe vuote restano tra i
 * due blocchi; se senza righe in più due blocchi si unirebbero (due paragrafi, una riga che diventa
 * della tabella o un titolo con ---), si aggiungono dove servono. Ogni prova si rilegge: deve venire
 * la stessa nota con il solo blocco al posto nuovo. Se no, 'structure' e la nota resta com'è.
 * 'edge': da quella parte non si va (è il primo o l'ultimo); 'stale': il blocco non è più lì.
 */
export function moveFencedBlock(
  text: string,
  line: number,
  hash: string,
  dir: MoveDir,
  parse: (src: string) => Token[],
): BlockMove | { ok: false; reason: MoveFailure } {
  // In CodeMirror non succede: le righe di split e quelle di markdown-it sarebbero diverse.
  if (text.includes('\r')) return { ok: false, reason: 'stale' }
  const tokens = parse(text)
  const found = findBlock(tokens, line, hash)
  if (!found) return { ok: false, reason: 'stale' }
  const place = blockPlace(tokens, found.idx, found.ancestors)
  const target = place && moveTarget(tokens, place, dir)
  if (!place || !target) return { ok: false, reason: 'edge' }

  const lines = text.split('\n')
  const [b0, b1] = tokens[found.idx].map!
  // S: le righe da scavalcare (il blocco vicino e quelli che non si vedono attaccati a lui); G: le
  // righe vuote fra S e il blocco, che restano fra i due.
  let s0: number
  let s1: number
  let g0: number
  let g1: number
  /** L'ultimo fratello dentro S: scendendo, il blocco va dopo di lui. */
  let last = target
  if (dir === 'up') {
    s0 = tokens[target.start].map![0]
    g0 = g1 = b0
    while (g0 > s0 + 1 && blank(lines[g0 - 1])) g0--
    s1 = g0
  } else {
    g0 = g1 = b1
    while (blank(lines[g1])) g1++
    s0 = g1
    const k = place.siblings.indexOf(target)
    const next = place.siblings.findIndex((s, j) => j > k && s.visible)
    s1 = next >= 0 ? tokens[place.siblings[next].start].map![0] : (place.container?.map?.[1] ?? lines.length)
    // Gli elenchi comprendono le righe vuote finali: restano fuori.
    while (s1 > s0 + 1 && blank(lines[s1 - 1])) s1--
    last = place.siblings[next >= 0 ? next - 1 : place.siblings.length - 1]
  }
  const r0 = Math.min(b0, s0)
  const r1 = Math.max(b1, s1)
  const B = lines.slice(b0, b1)
  const G = lines.slice(g0, g1)
  const S = lines.slice(s0, s1)
  const before = lines.slice(0, r0)
  const after = lines.slice(r1)
  const segments = dir === 'up' ? [B, G, S] : [S, G, B]

  // Come deve venire: gli stessi token, con il blocco davanti a S (su) o dopo (giù).
  const order = tokens.map((_, i) => i).filter((i) => i !== found.idx)
  order.splice(dir === 'up' ? order.indexOf(target.start) : order.indexOf(last.end) + 1, 0, found.idx)

  const starts: number[] = [0]
  for (const l of lines) starts.push(starts[starts.length - 1] + l.length + 1)

  for (const blankLines of [false, true]) {
    const region: string[] = []
    const at = new Map<string[], number>()
    let afterB = false
    for (const seg of segments) {
      if (!seg.length) continue
      // Una riga vuota fra due righe piene; dopo la chiusura del blocco non serve.
      const prev = region.length ? region[region.length - 1] : before[before.length - 1]
      if (blankLines && !afterB && prev !== undefined && !blank(prev) && !blank(seg[0])) region.push('')
      at.set(seg, region.length)
      region.push(...seg)
      afterB = seg === B
    }
    if (blankLines && !afterB && after.length && !blank(after[0]) && !blank(region[region.length - 1])) region.push('')
    const next = [...before, ...region, ...after].join('\n')
    const line = r0 + at.get(B)!
    const parsed = parse(next)
    if (parsed.length !== order.length || parsed.some((t, i) => signature(t, blankLines) !== signature(tokens[order[i]], blankLines))) continue
    const moved = parsed.find((t) => t.type === 'fence' && t.map?.[0] === line)
    if (!moved || contentHash(moved.content) !== hash || !fenceClosed(moved)) continue

    // Due modifiche intorno a S, che resta com'è.
    const from = starts[r0]
    const oldRegion = lines.slice(r0, r1).join('\n')
    const newRegion = region.join('\n')
    const sText = S.join('\n')
    const sOld = starts[s0] - from
    const sNew = region.slice(0, at.get(S)!).reduce((n, l) => n + l.length + 1, 0)
    const changes = [
      { from, to: from + sOld, insert: newRegion.slice(0, sNew) },
      { from: from + sOld + sText.length, to: from + oldRegion.length, insert: newRegion.slice(sNew + sText.length) },
    ].filter((c) => c.from !== c.to || c.insert)
    // Le righe di B, G e S, prima e dopo; quelle prima della regione restano, quelle dopo si spostano tutte uguali.
    const delta = region.length - (r1 - r0)
    const spans = ([[B, b0], [G, g0], [S, s0]] as const).filter(([seg]) => seg.length).map(([seg, old]) => ({ old, now: r0 + at.get(seg)!, n: seg.length }))
    const mapLine = (l: number) => {
      if (l < r0) return l
      if (l >= r1) return l + delta
      const m = spans.find((m) => l >= m.old && l < m.old + m.n)
      return m ? m.now + (l - m.old) : l
    }
    const unmapLine = (l: number) => {
      if (l < r0) return l
      if (l >= r0 + region.length) return l - delta
      const m = spans.find((m) => l >= m.now && l < m.now + m.n)
      return m ? m.old + (l - m.now) : l
    }
    const offset = (seg: string[]) => from + region.slice(0, at.get(seg)!).reduce((n, l) => n + l.length + 1, 0)
    return {
      ok: true,
      text: next,
      line,
      changes,
      oldFrom: starts[b0],
      oldTo: starts[b0] + B.join('\n').length,
      newFrom: offset(B),
      skippedFrom: starts[s0],
      skippedTo: starts[s0] + sText.length,
      skippedNewFrom: offset(S),
      gapFrom: starts[g0],
      gapTo: G.length ? starts[g0] + G.join('\n').length : -1,
      gapNewFrom: G.length ? offset(G) : starts[g0],
      mapLine,
      unmapLine,
      blankLines,
    }
  }
  return { ok: false, reason: 'structure' }
}
