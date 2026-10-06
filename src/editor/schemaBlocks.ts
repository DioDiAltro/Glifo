import { ChangeSet, EditorSelection, EditorState, StateField, Transaction, type Extension, type TransactionSpec } from '@codemirror/state'
import { Decoration, EditorView, WidgetType, type DecorationSet } from '@codemirror/view'
import { findFencedBlocks, type SchemaBlock } from '../schema/blocks'
import { parseSchema } from '../schema/model'
import { readInput } from '../spreadsheet/format'
import { parseSheet, sheetSize } from '../spreadsheet/model'
import { ICONS } from '../ui/dom'

/** I blocchi che nel testo diventano una riga con «Modifica»: gli schemi e le tabelle. */
export type WidgetKind = 'schema' | 'tabella'

export interface WidgetBlock extends SchemaBlock {
  kind: WidgetKind
}

const svg = (paths: string) =>
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`

/** Quante forme e frecce ci sono, per la riga al posto del blocco. */
function schemaSummary(source: string): string {
  try {
    const { nodes, edges } = parseSchema(source)
    const shapes = nodes.length === 1 ? '1 forma' : `${nodes.length} forme`
    const arrows = edges.length === 1 ? '1 freccia' : `${edges.length} frecce`
    return `${shapes}, ${arrows}`
  } catch {
    return 'da sistemare: il testo del blocco non è uno schema'
  }
}

/** Quante righe e colonne, e i testi della prima riga per riconoscerla. */
function sheetSummary(source: string): string {
  const model = parseSheet(source)
  const { rows, cols } = sheetSize(model)
  if (!rows) return 'vuota'
  const size = `${rows} ${rows === 1 ? 'riga' : 'righe'}, ${cols} ${cols === 1 ? 'colonna' : 'colonne'}`
  // Solo i testi: i numeri e le formule non dicono di cosa parla la tabella.
  const names = (model.cells[0] ?? [])
    .map((c) => c?.input.trim() ?? '')
    .filter((s) => s && !s.startsWith('=') && typeof readInput(s).value === 'string')
    .join(', ')
  return names ? `${size} · ${names.length > 60 ? `${names.slice(0, 59)}…` : names}` : size
}

const KINDS: Record<WidgetKind, { title: string; icon: string; summary(source: string): string }> = {
  schema: { title: 'Schema', icon: svg(ICONS.schema), summary: schemaSummary },
  tabella: { title: 'Tabella', icon: svg(ICONS.sheet), summary: sheetSummary },
}

/** Gli schemi e le tabelle chiusi del testo, in ordine. */
export function findWidgetBlocks(text: string): WidgetBlock[] {
  const blocks = (['schema', 'tabella'] as const).flatMap((kind) => findFencedBlocks(text, kind).map((b) => ({ ...b, kind })))
  return blocks.filter((b) => b.closed).sort((a, b) => a.from - b.from)
}

class BlockWidget extends WidgetType {
  constructor(
    readonly kind: WidgetKind,
    readonly source: string,
    private readonly onEdit: (kind: WidgetKind, line: number, source: string) => void,
  ) {
    super()
  }

  override eq(other: BlockWidget): boolean {
    return other.kind === this.kind && other.source === this.source
  }

  toDOM(view: EditorView): HTMLElement {
    const kind = KINDS[this.kind]
    const wrap = document.createElement('div')
    wrap.className = 'cm-schema'
    wrap.dataset.kind = this.kind
    const info = document.createElement('span')
    info.className = 'cm-schema-info'
    const title = document.createElement('strong')
    title.textContent = kind.title
    info.append(title, ` · ${kind.summary(this.source)}`)
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'btn btn-small'
    button.textContent = 'Modifica'
    // La riga del blocco si calcola al momento: intanto il testo prima può essere cambiato.
    const edit = () => this.onEdit(this.kind, view.state.doc.lineAt(view.posAtDOM(wrap)).number - 1, this.source)
    button.addEventListener('click', edit)
    wrap.addEventListener('dblclick', edit)
    wrap.insertAdjacentHTML('afterbegin', kind.icon)
    wrap.append(info, button)
    return wrap
  }

  override ignoreEvent(): boolean {
    return true
  }
}

/**
 * Nell'editor i blocchi ```schema e ```tabella (chiusi) diventano una riga con «Modifica»: il testo
 * del blocco non si vede e si salta, si copia o si cancella tutto insieme (e Ctrl+Z lo riporta).
 */
export function schemaBlocks(onEdit: (kind: WidgetKind, line: number, source: string) => void): Extension {
  const build = (state: EditorState): DecorationSet =>
    Decoration.set(
      findWidgetBlocks(state.doc.toString()).map((b) => Decoration.replace({ widget: new BlockWidget(b.kind, b.source, onEdit), block: true }).range(b.from, b.to)),
    )

  const field = StateField.define<DecorationSet>({
    create: build,
    update(decorations, tr) {
      if (!tr.docChanged) return decorations
      // Si ricalcola solo se cambiano righe con ``` o ~~~, o un blocco già trovato.
      let rebuild = false
      tr.changes.iterChanges((fromA, toA, _fromB, _toB, inserted) => {
        if (rebuild) return
        if (/[`~]/.test(inserted.toString()) || /[`~]/.test(tr.startState.sliceDoc(fromA, toA))) rebuild = true
        decorations.between(fromA, toA, () => {
          rebuild = true
          return false
        })
      })
      return rebuild ? build(tr.state) : decorations.map(tr.changes)
    },
    provide: (f) => [EditorView.decorations.from(f), EditorView.atomicRanges.of((view) => view.state.field(f))],
  })
  return [field, guardBlocks(field)]
}

/** Dove sono gli schemi e le tabelle chiusi (le righe con «Modifica»), dall'inizio della riga ``` alla fine di quella che chiude. */
export function schemaBlockRanges(state: EditorState): { from: number; to: number }[] {
  return findWidgetBlocks(state.doc.toString()).map(({ from, to }) => ({ from, to }))
}

/**
 * Se il cursore è sul bordo di uno schema (subito prima o subito dopo la sua riga), un comando
 * che cambia le righe (titolo, elenco, citazione) non tocca lo schema: mette `text` su una riga
 * nuova, prima o dopo, con il cursore lì. Null se il cursore non è su uno schema.
 */
export function besideSchema(state: EditorState, text: string): TransactionSpec | null {
  const head = state.selection.main.head
  const block = schemaBlockRanges(state).find((b) => head >= b.from && head <= b.to)
  if (!block) return null
  if (head === block.from) return { changes: { from: block.from, insert: `${text}\n` }, selection: EditorSelection.cursor(block.from + text.length), scrollIntoView: true, userEvent: 'input' }
  return { changes: { from: block.to, insert: `\n${text}` }, selection: EditorSelection.cursor(block.to + 1 + text.length), scrollIntoView: true, userEvent: 'input' }
}

/**
 * Le righe ```schema e ``` di uno schema non si toccano da fuori, se no lo schema torna testo:
 * quello che si scrive (o si incolla, o arriva dai pulsanti) proprio prima o proprio dopo lo
 * schema va su una riga sua; una modifica che lo romperebbe lo stesso non si fa (Canc o ⌫ che
 * attaccherebbero una riga di testo allo schema spostano solo il cursore). Toglierlo tutto si può.
 */
function guardBlocks(field: StateField<DecorationSet>): Extension {
  return EditorState.transactionFilter.of((tr) => {
    if (!tr.docChanged || !(tr.isUserEvent('input') || tr.isUserEvent('delete') || tr.isUserEvent('move'))) return tr
    // Le frecce dell'anteprima spostano blocchi interi, e la nota è già stata riletta (src/render/blockMove.ts):
    // qui si sbaglierebbe, perché findSchemaBlocks non vede i blocchi sulla riga del marcatore («- ```py»).
    if (tr.isUserEvent('move.block')) return tr
    const blocks: { from: number; to: number }[] = []
    tr.startState.field(field).between(0, tr.startState.doc.length, (from, to) => {
      blocks.push({ from, to })
    })
    let near = false
    tr.changes.iterChangedRanges((fromA, toA) => {
      if (blocks.some((b) => fromA <= b.to + 1 && toA >= b.from - 1)) near = true
    })
    if (!near) return tr

    // Scritto subito prima o subito dopo lo schema: con un a capo in più, su una riga sua.
    const fixes: { at: number; before: boolean }[] = []
    tr.changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
      if (!inserted.length) return
      const text = inserted.toString()
      if (blocks.some((b) => b.to === fromA) && !text.startsWith('\n')) fixes.push({ at: fromB, before: false })
      if (blocks.some((b) => b.from === toA) && !text.endsWith('\n')) fixes.push({ at: toB, before: true })
    })
    const fix = fixes.length ? ChangeSet.of(fixes.map((f) => ({ from: f.at, insert: '\n' })), tr.newDoc.length) : null
    const changes = fix ? tr.changes.compose(fix) : tr.changes

    // Ogni schema che non si toglie tutto deve restare uno schema, al suo posto.
    const after = findWidgetBlocks((fix ? fix.apply(tr.newDoc) : tr.newDoc).toString())
    let broken = false
    for (const b of blocks) {
      let whole = false
      tr.changes.iterChangedRanges((fromA, toA) => {
        if (fromA <= b.from && toA >= b.to) whole = true
      })
      const at = changes.mapPos(b.from, 1)
      if (!whole && !after.some((n) => n.from === at)) broken = true
    }
    if (broken) {
      // ⌫ subito dopo una riga di testo, o Canc subito prima: il cursore passa oltre lo schema.
      let cursor: number | null = null
      tr.changes.iterChanges((fromA, toA, _fromB, _toB, inserted) => {
        if (inserted.length) return
        if (blocks.some((b) => b.from === toA)) cursor = fromA
        else if (blocks.some((b) => b.to === fromA)) cursor = toA
      })
      return cursor === null ? {} : { selection: EditorSelection.cursor(cursor), scrollIntoView: true }
    }
    if (!fix) return tr
    // Il cursore resta dove sarebbe stato, rispetto al testo scritto.
    const map = (pos: number) => fix.mapPos(pos, fixes.some((f) => f.at === pos && f.before) ? -1 : 1)
    const selection = EditorSelection.create(
      tr.newSelection.ranges.map((r) => EditorSelection.range(map(r.anchor), map(r.head))),
      tr.newSelection.mainIndex,
    )
    const userEvent = tr.annotation(Transaction.userEvent)
    return { changes, selection, effects: tr.effects, scrollIntoView: tr.scrollIntoView, ...(userEvent && { userEvent }) }
  })
}
