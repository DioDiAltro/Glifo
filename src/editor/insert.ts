import { EditorSelection, type EditorState, type TransactionSpec } from '@codemirror/state'
import type { EditorView } from '@codemirror/view'
import { parseTemplate } from '../symbols/template'
import { mathContextAt } from './mathContext'
import { addPlaceholders, type Placeholder } from './placeholders'

export interface InsertOptions {
  /** Modello TeX con segnaposto `#`. */
  template: string
  /** Fuori da una formula, crea un blocco `$$ … $$` invece di `$ … $`. */
  display?: boolean
  /** Intervallo da sostituire (es. il `\su` che si stava scrivendo). */
  replace?: { from: number; to: number }
  /** Racchiude automaticamente tra `$` se il cursore non è in una formula. */
  autoWrap?: boolean
}

/**
 * Calcola la transazione che inserisce un simbolo o un modello:
 * - se c'è del testo selezionato, finisce nel primo segnaposto
 *   (seleziona `x+1`, clicca `\sqrt{}` → `\sqrt{x+1}`);
 * - fuori da una formula aggiunge i `$` (o `$$` per le strutture grandi);
 * - registra i segnaposto per spostarsi con Tab.
 */
export function templateInsertion(state: EditorState, opts: InsertOptions): TransactionSpec {
  const sel = state.selection.main
  const from = opts.replace?.from ?? sel.from
  const to = opts.replace?.to ?? sel.to
  const selected = opts.replace ? '' : state.sliceDoc(sel.from, sel.to)
  const ctx = mathContextAt(state, from)
  const { text, slots } = parseTemplate(opts.template)

  let insert = text
  const slotRanges = slots.map((s) => ({ from: s, to: s }))
  let firstFilled = false
  if (selected && slots.length) {
    insert = text.slice(0, slots[0]) + selected + text.slice(slots[0])
    for (let i = 0; i < slotRanges.length; i++) {
      if (i === 0) slotRanges[i] = { from: slots[0], to: slots[0] + selected.length }
      else slotRanges[i] = { from: slots[i] + selected.length, to: slots[i] + selected.length }
    }
    firstFilled = true
  }

  // Evita di attaccare lettere a un comando: "\alpha" + "x" diventerebbe "\alphax".
  const before = state.sliceDoc(Math.max(0, from - 40), from)
  const after = state.sliceDoc(to, to + 1)
  let lead = ''
  if (/^[a-zA-Z]/.test(insert) && /\\[a-zA-Z]+$/.test(before)) lead = ' '
  if (/\\[a-zA-Z]+$/.test(insert) && /^[a-zA-Z]/.test(after)) insert += ' '

  let open = ''
  let close = ''
  if (opts.autoWrap !== false && !ctx.inMath && !ctx.inCode) {
    if (opts.display) {
      const line = state.doc.lineAt(from)
      const textBefore = state.sliceDoc(line.from, from)
      const textAfter = state.sliceDoc(to, state.doc.lineAt(to).to)
      open = (textBefore.trim() ? '\n\n' : '') + '$$\n'
      close = '\n$$' + (textAfter.trim() ? '\n\n' : '')
    } else {
      open = '$'
      close = '$'
    }
  }

  const full = lead + open + insert + close
  const base = from + lead.length + open.length
  const placeholders: Placeholder[] = slotRanges.map((r) => ({ from: base + r.from, to: base + r.to, exit: false }))
  const end = base + insert.length
  if (placeholders.length && placeholders[placeholders.length - 1].to !== end) {
    placeholders.push({ from: end, to: end, exit: true })
  }

  let selection: EditorSelection
  const startIndex = firstFilled && placeholders.length > 1 ? 1 : 0
  if (placeholders.length) {
    const p = placeholders[startIndex]
    selection = EditorSelection.single(p.from, p.to)
  } else {
    selection = EditorSelection.single(end)
  }

  return {
    changes: { from, to, insert: full },
    selection,
    // Con un solo punto non c'è nessun posto in cui saltare con Tab.
    effects: placeholders.length > 1 ? addPlaceholders.of(placeholders) : [],
    scrollIntoView: true,
    userEvent: 'input.complete',
  }
}

export function insertTemplate(view: EditorView, opts: InsertOptions): void {
  view.dispatch(view.state.update(templateInsertion(view.state, opts)))
  view.focus()
}

/** Racchiude la selezione tra due marcatori (grassetto, corsivo, formula…). */
export function wrapSelection(view: EditorView, before: string, after = before, placeholder = ''): void {
  const { state } = view
  const changes = state.changeByRange((range) => {
    const text = state.sliceDoc(range.from, range.to) || placeholder
    // Se è già racchiusa, toglie i marcatori.
    const outerFrom = range.from - before.length
    const outerTo = range.to + after.length
    if (
      range.from !== range.to &&
      outerFrom >= 0 &&
      state.sliceDoc(outerFrom, range.from) === before &&
      state.sliceDoc(range.to, outerTo) === after
    ) {
      return {
        changes: [
          { from: outerFrom, to: range.from, insert: '' },
          { from: range.to, to: outerTo, insert: '' },
        ],
        range: EditorSelection.range(outerFrom, range.to - before.length),
      }
    }
    return {
      changes: { from: range.from, to: range.to, insert: before + text + after },
      range: EditorSelection.range(range.from + before.length, range.from + before.length + text.length),
    }
  })
  view.dispatch(state.update(changes, { scrollIntoView: true, userEvent: 'input' }))
  view.focus()
}

/** Aggiunge o toglie un prefisso a tutte le righe selezionate ("# ", "- ", "> "…). */
export function toggleLinePrefix(view: EditorView, prefix: string, pattern: RegExp): void {
  const { state } = view
  const lines = new Set<number>()
  for (const r of state.selection.ranges) {
    for (let n = state.doc.lineAt(r.from).number; n <= state.doc.lineAt(r.to).number; n++) lines.add(n)
  }
  const all = [...lines].map((n) => state.doc.line(n))
  const allHave = all.every((l) => pattern.test(l.text))
  const changes = all.map((l) => {
    const m = pattern.exec(l.text)
    if (allHave && m) return { from: l.from, to: l.from + m[0].length, insert: '' }
    // Sostituisce un eventuale prefisso dello stesso tipo (es. "## " → "# ").
    return { from: l.from, to: l.from + (m ? m[0].length : 0), insert: prefix }
  })
  view.dispatch({ changes, userEvent: 'input', scrollIntoView: true })
  view.focus()
}

/** Inserisce un blocco di testo su righe proprie, con il cursore al punto `cursorOffset`. */
export function insertBlock(view: EditorView, block: string, cursorOffset = block.length): void {
  const { state } = view
  const sel = state.selection.main
  const line = state.doc.lineAt(sel.from)
  const atLineStart = !state.sliceDoc(line.from, sel.from).trim()
  const prefix = atLineStart ? '' : '\n\n'
  const insert = prefix + block + '\n'
  view.dispatch({
    changes: { from: sel.from, to: sel.to, insert },
    selection: EditorSelection.cursor(sel.from + prefix.length + cursorOffset),
    scrollIntoView: true,
    userEvent: 'input',
  })
  view.focus()
}
