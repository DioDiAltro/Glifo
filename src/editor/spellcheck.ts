import { isolateHistory } from '@codemirror/commands'
import { syntaxTree } from '@codemirror/language'
import { StateEffect, StateField, type EditorState, type Extension, type Range } from '@codemirror/state'
import {
  Decoration,
  EditorView,
  ViewPlugin,
  keymap,
  showTooltip,
  type DecorationSet,
  type TooltipView,
  type ViewUpdate,
} from '@codemirror/view'
import { findWords, type WordRange } from '../spell/words'
import { h } from '../ui/dom'

/**
 * Controllo ortografico nell'editor: sottolinea in rosso le parole
 * sbagliate (non dentro formule, codice e link) e, con un clic sulla parola
 * o con Ctrl+., propone le correzioni.
 */

/** Il correttore visto dall'editor (in pratica un SpellClient). */
export interface SpellChecker {
  /** true o false se la parola è già stata controllata, undefined se non ancora. */
  status(word: string): boolean | undefined
  /** Controlla le parole mai viste; true se sono arrivati risultati nuovi. */
  check(words: string[]): Promise<boolean>
  suggest(word: string): Promise<string[]>
  /** Avvisa quando le parole vanno ricontrollate (es. dizionario personale cambiato). */
  subscribe(listener: () => void): () => void
}

export interface SpellcheckOptions {
  client: SpellChecker
  /** Aggiunge la parola al dizionario personale. */
  addWord(word: string): void
}

/** Nodi Markdown che non sono prosa: formule, codice, indirizzi, HTML. */
const SKIP = new Set([
  'InlineMath',
  'BlockMath',
  'InlineCode',
  'FencedCode',
  'CodeBlock',
  'HTMLBlock',
  'HTMLTag',
  'Comment',
  'CommentBlock',
  'ProcessingInstruction',
  'ProcessingInstructionBlock',
  'URL',
  'Autolink',
  'LinkLabel',
  'LinkReference',
  'Entity',
  'Escape',
])

/** Parole da controllare tra `from` e `to`, allargati alle righe intere. */
export function wordsToCheck(state: EditorState, from: number, to: number): WordRange[] {
  const { doc } = state
  from = doc.lineAt(from).from
  to = doc.lineAt(to).to
  const out: WordRange[] = []
  let pos = from
  syntaxTree(state).iterate({
    from,
    to,
    enter: (node) => {
      if (!SKIP.has(node.name)) return
      if (node.from > pos) out.push(...findWords(doc.sliceString(pos, node.from), pos))
      pos = Math.max(pos, node.to)
      return false
    },
  })
  if (pos < to) out.push(...findWords(doc.sliceString(pos, to), pos))
  return out
}

interface SpellTarget {
  from: number
  to: number
  word: string
  /** Aperto da tastiera: il fuoco passa alle correzioni. */
  focus: boolean
}

const refreshSpelling = StateEffect.define<null>()
const setTarget = StateEffect.define<SpellTarget | null>()
const misspelledMark = Decoration.mark({ class: 'cm-misspelled' })

export function spellcheck(options: SpellcheckOptions): Extension {
  const { client } = options

  /** La parola sbagliata che contiene `pos`, se c'è (anche se non è ancora stata controllata). */
  async function misspelledAt(state: EditorState, pos: number): Promise<SpellTarget | null> {
    const found = wordsToCheck(state, pos, pos).find((w) => w.from <= pos && pos <= w.to)
    if (!found) return null
    if (client.status(found.word) === undefined) await client.check([found.word])
    return client.status(found.word) === false ? { from: found.from, to: found.to, word: found.word, focus: false } : null
  }

  const targetField = StateField.define<SpellTarget | null>({
    create: () => null,
    update(target, tr) {
      for (const e of tr.effects) if (e.is(setTarget)) return e.value
      if (!target) return null
      if (tr.docChanged) {
        if (tr.changes.touchesRange(target.from, target.to)) return null
        target = { ...target, from: tr.changes.mapPos(target.from), to: tr.changes.mapPos(target.to) }
      }
      const sel = tr.state.selection.main
      return sel.from < target.from || sel.to > target.to ? null : target
    },
    provide: (field) =>
      showTooltip.from(field, (target) =>
        target ? { pos: target.from, end: target.to, above: false, create: (view) => tooltipView(view, target) } : null,
      ),
  })

  /** Apre le correzioni per la parola in `pos`, se nel frattempo il testo non è cambiato. */
  function openAt(view: EditorView, pos: number, how: { select?: boolean; focus?: boolean } = {}): void {
    const { state } = view
    void misspelledAt(state, pos).then((target) => {
      if (!target || view.state.doc !== state.doc) return
      const sel = view.state.selection.main
      if (!how.select && (sel.from < target.from || sel.to > target.to)) return
      const open = view.state.field(targetField)
      if (open && open.from === target.from && open.to === target.to && !how.focus) return
      view.dispatch({
        selection: how.select ? { anchor: pos } : undefined,
        effects: setTarget.of({ ...target, focus: !!how.focus }),
      })
    })
  }

  function close(view: EditorView): void {
    view.dispatch({ effects: setTarget.of(null) })
    view.focus()
  }

  function replace(view: EditorView, text: string): void {
    const current = view.state.field(targetField)
    if (!current) return
    view.dispatch({
      changes: { from: current.from, to: current.to, insert: text },
      selection: { anchor: current.from + text.length },
      effects: setTarget.of(null),
      userEvent: 'input.spellcheck',
      annotations: isolateHistory.of('full'),
    })
    view.focus()
  }

  function tooltipView(view: EditorView, target: SpellTarget): TooltipView {
    const list = h('div', { class: 'spell-list' }, h('span', { class: 'spell-note' }, 'Cerco correzioni…'))
    const add = h(
      'button',
      {
        class: 'spell-add',
        attrs: { type: 'button' },
        on: {
          click: () => {
            options.addWord(target.word)
            close(view)
          },
        },
      },
      'Aggiungi al dizionario',
    )
    const dom = h('div', { class: 'spell-tooltip', attrs: { role: 'group', 'aria-label': `Correzioni per «${target.word}»` } }, list, add)
    // Un clic sui pulsanti non deve togliere il cursore dall'editor.
    dom.addEventListener('mousedown', (ev) => ev.preventDefault())
    // Il fuoco esce dal riquadro e dall'editor: si chiude (fuori dal ciclo di aggiornamento).
    dom.addEventListener('focusout', (ev) => {
      const next = ev.relatedTarget as Node | null
      if (next && view.dom.contains(next)) return
      setTimeout(() => {
        if (view.state.field(targetField, false) && !view.hasFocus && !dom.contains(document.activeElement)) {
          view.dispatch({ effects: setTarget.of(null) })
        }
      })
    })
    dom.addEventListener('keydown', (ev) => {
      const buttons = [...dom.querySelectorAll('button')]
      const i = buttons.indexOf(document.activeElement as HTMLButtonElement)
      if (ev.key === 'Escape') {
        ev.preventDefault()
        close(view)
      } else if ((ev.key === 'Enter' || ev.key === ' ') && i >= 0) {
        // Gestito qui: altrimenti, tornato il fuoco all'editor, l'Invio andrebbe a capo.
        ev.preventDefault()
        buttons[i].click()
      } else if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight' || ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') {
        ev.preventDefault()
        const step = ev.key === 'ArrowDown' || ev.key === 'ArrowRight' ? 1 : -1
        buttons[(i + step + buttons.length) % buttons.length]?.focus()
      }
    })

    void client.suggest(target.word).then((suggestions) => {
      list.replaceChildren(
        ...(suggestions.length
          ? suggestions.map((s) =>
              h('button', { class: 'spell-suggestion', attrs: { type: 'button' }, on: { click: () => replace(view, s) } }, s),
            )
          : [h('span', { class: 'spell-note' }, 'Nessuna correzione trovata')]),
      )
      if (target.focus && dom.isConnected) dom.querySelector('button')?.focus()
    })
    return { dom, offset: { x: 0, y: 4 } }
  }

  class SpellView {
    decorations: DecorationSet = Decoration.none
    /** Dove si sta scrivendo: quella parola si controlla quando la si lascia. */
    private typingAt = -1
    private destroyed = false
    private readonly unsubscribe: () => void

    constructor(readonly view: EditorView) {
      this.unsubscribe = client.subscribe(() => this.refresh())
      this.compute()
    }

    update(u: ViewUpdate): void {
      const wasTyping = this.typingAt >= 0
      if (u.docChanged) {
        const typed = u.transactions.some((tr) => tr.isUserEvent('input') || tr.isUserEvent('delete'))
        this.typingAt = typed ? u.state.selection.main.head : -1
      } else if (u.selectionSet) {
        this.typingAt = -1
      }
      if (
        u.docChanged ||
        u.viewportChanged ||
        (u.selectionSet && wasTyping) ||
        u.transactions.some((tr) => tr.effects.some((e) => e.is(refreshSpelling))) ||
        syntaxTree(u.startState) !== syntaxTree(u.state)
      ) {
        this.compute()
      }
    }

    private compute(): void {
      const unknown: string[] = []
      const marks: Range<Decoration>[] = []
      for (const w of this.visibleWords()) {
        if (this.typingAt >= w.from && this.typingAt <= w.to) continue
        const ok = client.status(w.word)
        if (ok === undefined) unknown.push(w.word)
        else if (!ok) marks.push(misspelledMark.range(w.from, w.to))
      }
      this.decorations = Decoration.set(marks, true)
      if (unknown.length) {
        void client.check(unknown).then((changed) => {
          if (changed) this.refresh()
        })
      }
    }

    private visibleWords(): WordRange[] {
      const { state } = this.view
      const out: WordRange[] = []
      let covered = -1
      for (const r of this.view.visibleRanges) {
        const from = Math.max(state.doc.lineAt(r.from).from, covered + 1)
        if (from > r.to) continue
        const words = wordsToCheck(state, from, r.to)
        out.push(...words)
        covered = state.doc.lineAt(r.to).to
      }
      return out
    }

    private refresh(): void {
      if (!this.destroyed) this.view.dispatch({ effects: refreshSpelling.of(null) })
    }

    destroy(): void {
      this.destroyed = true
      this.unsubscribe()
    }
  }

  const plugin = ViewPlugin.fromClass(SpellView, {
    decorations: (v) => v.decorations,
    eventHandlers: {
      // Il fuoco va altrove (non sulle correzioni): il riquadro si chiude.
      blur(ev) {
        const next = ev.relatedTarget as Node | null
        if (next && this.view.dom.contains(next)) return false
        if (this.view.state.field(targetField)) this.view.dispatch({ effects: setTarget.of(null) })
        return false
      },
      // Clic (o tocco) su una parola sottolineata: mostra le correzioni.
      click(ev) {
        if (ev.button !== 0 || ev.shiftKey || ev.altKey || ev.ctrlKey || ev.metaKey) return false
        const { view } = this
        const sel = view.state.selection.main
        if (!sel.empty) return false
        let hit = false
        this.decorations.between(sel.head, sel.head, () => {
          hit = true
          return false
        })
        if (hit) openAt(view, sel.head)
        return false
      },
      // Tasto destro su una parola sottolineata: le correzioni al posto del menu del browser.
      contextmenu(ev) {
        const { view } = this
        const pos = view.posAtCoords({ x: ev.clientX, y: ev.clientY })
        if (pos === null) return false
        let hit = false
        this.decorations.between(pos, pos, () => {
          hit = true
          return false
        })
        if (!hit) return false
        ev.preventDefault()
        openAt(view, pos, { select: true })
        return true
      },
    },
  })

  const keys = keymap.of([
    {
      key: 'Mod-.',
      run: (view) => {
        openAt(view, view.state.selection.main.head, { focus: true })
        return true
      },
    },
    {
      key: 'Escape',
      run: (view) => {
        if (!view.state.field(targetField)) return false
        view.dispatch({ effects: setTarget.of(null) })
        return true
      },
    },
  ])

  return [plugin, targetField, keys]
}
