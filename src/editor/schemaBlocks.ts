import { StateField, type EditorState, type Extension } from '@codemirror/state'
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
  return field
}
