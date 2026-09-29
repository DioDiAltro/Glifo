import {
  EditorSelection,
  StateEffect,
  StateField,
  type EditorState,
  type Transaction,
  type TransactionSpec,
} from '@codemirror/state'
import { Decoration, EditorView, WidgetType, type DecorationSet } from '@codemirror/view'

/**
 * Segnaposto: i punti di un modello (es. gli estremi di `\sum_{}^{}`)
 * che si raggiungono con Tab / Maiusc+Tab. Si possono annidare: inserendo
 * `\frac{}{}` dentro un segnaposto, Tab passa prima dai campi della frazione
 * e poi prosegue con quelli esterni.
 */
export interface Placeholder {
  from: number
  to: number
  /** Punto di uscita alla fine del modello (invisibile). */
  exit: boolean
}

export const addPlaceholders = StateEffect.define<Placeholder[]>()
export const clearPlaceholders = StateEffect.define<null>()

function sortPlaceholders(list: Placeholder[]): Placeholder[] {
  return list.sort((a, b) => a.from - b.from || b.to - a.to || Number(a.exit) - Number(b.exit))
}

function insertsNewline(tr: Transaction): boolean {
  let found = false
  tr.changes.iterChanges((_fa, _ta, _fb, _tb, inserted) => {
    if (inserted.lines > 1) found = true
  })
  return found
}

export const placeholderField = StateField.define<Placeholder[]>({
  create: () => [],
  update(list, tr) {
    let next = list
    if (tr.docChanged && next.length) {
      next = next.map((p) => {
        // I campi si allargano mentre si scrive; i punti di uscita no.
        const from = tr.changes.mapPos(p.from, -1)
        const to = p.exit ? from : Math.max(from, tr.changes.mapPos(p.to, 1))
        return { from, to, exit: p.exit }
      })
      // Andare a capo chiude la sessione di segnaposto.
      if (tr.isUserEvent('input') && !tr.isUserEvent('input.complete') && insertsNewline(tr)) next = []
    }
    for (const e of tr.effects) {
      if (e.is(clearPlaceholders)) next = []
      else if (e.is(addPlaceholders)) next = sortPlaceholders([...next, ...e.value])
    }
    if (next.length && (tr.selection || tr.docChanged)) {
      const { head } = tr.newSelection.main
      const min = next[0].from
      const max = Math.max(...next.map((p) => p.to))
      if (head < min || head > max) next = []
    }
    return next
  },
  provide: (field) => EditorView.decorations.from(field, buildDecorations),
})

class SlotWidget extends WidgetType {
  override eq(): boolean {
    return true
  }
  toDOM(): HTMLElement {
    const span = document.createElement('span')
    span.className = 'cm-mh-slot'
    span.setAttribute('aria-hidden', 'true')
    return span
  }
  override ignoreEvent(): boolean {
    return false
  }
}

const slotWidget = Decoration.widget({ widget: new SlotWidget(), side: 1 })
const filledMark = Decoration.mark({ class: 'cm-mh-slot-filled' })

function buildDecorations(list: Placeholder[]): DecorationSet {
  const ranges = []
  for (const p of list) {
    if (p.exit) continue
    ranges.push(p.from === p.to ? slotWidget.range(p.from) : filledMark.range(p.from, p.to))
  }
  return Decoration.set(ranges, true)
}

/** Un EditorView, o qualunque oggetto con stato e dispatch (utile nei test). */
export interface CommandTarget {
  state: EditorState
  dispatch: (...specs: TransactionSpec[]) => void
}

export function getPlaceholders(state: EditorState): Placeholder[] {
  return state.field(placeholderField, false) ?? []
}

/** Indice del segnaposto più interno che contiene la selezione (-1 se nessuno). */
function currentIndex(list: Placeholder[], from: number, to: number): number {
  let best = -1
  for (let i = 0; i < list.length; i++) {
    const p = list[i]
    if (from >= p.from && to <= p.to) {
      if (best < 0 || p.from >= list[best].from) best = i
    }
  }
  return best
}

function contains(outer: Placeholder, inner: Placeholder): boolean {
  return outer.from <= inner.from && outer.to >= inner.to && outer !== inner
}

/** Sposta il cursore al segnaposto successivo (dir = 1) o precedente (dir = -1). */
export function jumpPlaceholder(view: CommandTarget, dir: 1 | -1): boolean {
  const list = getPlaceholders(view.state)
  if (!list.length) return false
  const sel = view.state.selection.main
  const cur = currentIndex(list, sel.from, sel.to)

  let target = -1
  if (dir > 0) {
    if (cur >= 0) target = cur + 1 < list.length ? cur + 1 : -1
    else target = list.findIndex((p) => p.from > sel.head)
  } else if (cur >= 0) {
    for (let i = cur - 1; i >= 0; i--) {
      if (!contains(list[i], list[cur])) {
        target = i
        break
      }
    }
  } else {
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i].to < sel.head) {
        target = i
        break
      }
    }
  }

  if (target < 0) {
    if (dir > 0) view.dispatch({ effects: clearPlaceholders.of(null) })
    return false
  }
  const p = list[target]
  const isLast = dir > 0 && target === list.length - 1
  view.dispatch({
    selection: EditorSelection.single(p.from, p.to),
    effects: isLast ? clearPlaceholders.of(null) : [],
    scrollIntoView: true,
    userEvent: 'select.placeholder',
  })
  return true
}

export function clearAllPlaceholders(view: CommandTarget): boolean {
  if (!getPlaceholders(view.state).length) return false
  view.dispatch({ effects: clearPlaceholders.of(null) })
  return true
}
