import { ChangeSet, EditorSelection, EditorState, StateField, Transaction, type Extension, type TransactionSpec } from '@codemirror/state'
import { Decoration, EditorView, WidgetType, type DecorationSet } from '@codemirror/view'
import { findSchemaBlocks } from '../schema/blocks'
import { parseSchema } from '../schema/model'

const SCHEMA_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="7" height="5" rx="1"/><rect x="14" y="15" width="7" height="5" rx="1"/><path d="M6.5 9v4.5a2 2 0 0 0 2 2H14"/></svg>'

/** Quante forme e frecce ci sono, per la riga al posto del blocco. */
function summary(source: string): string {
  try {
    const { nodes, edges } = parseSchema(source)
    const shapes = nodes.length === 1 ? '1 forma' : `${nodes.length} forme`
    const arrows = edges.length === 1 ? '1 freccia' : `${edges.length} frecce`
    return `${shapes}, ${arrows}`
  } catch {
    return 'da sistemare: il testo del blocco non è uno schema'
  }
}

class SchemaWidget extends WidgetType {
  constructor(
    readonly source: string,
    private readonly onEdit: (line: number, source: string) => void,
  ) {
    super()
  }

  override eq(other: SchemaWidget): boolean {
    return other.source === this.source
  }

  toDOM(view: EditorView): HTMLElement {
    const wrap = document.createElement('div')
    wrap.className = 'cm-schema'
    const info = document.createElement('span')
    info.className = 'cm-schema-info'
    const title = document.createElement('strong')
    title.textContent = 'Schema'
    info.append(title, ` · ${summary(this.source)}`)
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'btn btn-small'
    button.textContent = 'Modifica'
    // La riga del blocco si calcola al momento: intanto il testo prima può essere cambiato.
    const edit = () => this.onEdit(view.state.doc.lineAt(view.posAtDOM(wrap)).number - 1, this.source)
    button.addEventListener('click', edit)
    wrap.addEventListener('dblclick', edit)
    wrap.insertAdjacentHTML('afterbegin', SCHEMA_ICON)
    wrap.append(info, button)
    return wrap
  }

  override ignoreEvent(): boolean {
    return true
  }
}

/**
 * Nell'editor i blocchi ```schema (chiusi) diventano una riga con «Modifica»: il JSON non si
 * vede e si salta, si copia o si cancella tutto insieme (e Ctrl+Z lo riporta).
 */
export function schemaBlocks(onEdit: (line: number, source: string) => void): Extension {
  const build = (state: EditorState): DecorationSet =>
    Decoration.set(
      findSchemaBlocks(state.doc.toString())
        .filter((b) => b.closed)
        .map((b) => Decoration.replace({ widget: new SchemaWidget(b.source, onEdit), block: true }).range(b.from, b.to)),
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

/** Dove sono gli schemi chiusi (le righe «Schema»), dall'inizio della riga ```schema alla fine di quella che chiude. */
export function schemaBlockRanges(state: EditorState): { from: number; to: number }[] {
  return findSchemaBlocks(state.doc.toString())
    .filter((b) => b.closed)
    .map(({ from, to }) => ({ from, to }))
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
    const after = findSchemaBlocks((fix ? fix.apply(tr.newDoc) : tr.newDoc).toString()).filter((b) => b.closed)
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
