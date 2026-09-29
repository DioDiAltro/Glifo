import { describe, expect, it } from 'vitest'
import { EditorState, type TransactionSpec } from '@codemirror/state'
import { ensureSyntaxTree } from '@codemirror/language'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { mathMarkdown } from '../src/editor/mathSyntax'
import { commandTokenAt, mathContextAt, mathRegionAt, openMathBefore } from '../src/editor/mathContext'
import { templateInsertion } from '../src/editor/insert'
import { getPlaceholders, jumpPlaceholder, placeholderField, type CommandTarget } from '../src/editor/placeholders'
import { SuggestionController } from '../src/editor/suggestions'
import type { EditorView } from '@codemirror/view'

const r = String.raw

function makeState(doc: string, cursor = doc.length): EditorState {
  const state = EditorState.create({
    doc,
    selection: { anchor: cursor },
    extensions: [markdown({ base: markdownLanguage, extensions: [mathMarkdown] }), placeholderField],
  })
  ensureSyntaxTree(state, state.doc.length, 5000)
  return state
}

/** Posizione del segnaposto "|" nel testo, che viene rimosso. */
function withCursor(src: string): { doc: string; pos: number } {
  const pos = src.indexOf('|')
  return { doc: src.slice(0, pos) + src.slice(pos + 1), pos }
}

function ctxOf(src: string) {
  const { doc, pos } = withCursor(src)
  return mathContextAt(makeState(doc, pos), pos)
}

class Harness implements CommandTarget {
  constructor(public state: EditorState) {}
  dispatch = (...specs: TransactionSpec[]) => {
    this.state = this.state.update(...specs).state
  }
  get doc() {
    return this.state.doc.toString()
  }
  get cursor() {
    return this.state.selection.main.head
  }
  type(text: string) {
    const { from, to } = this.state.selection.main
    this.dispatch({ changes: { from, to, insert: text }, selection: { anchor: from + text.length }, userEvent: 'input.type' })
  }
  insert(template: string, extra: Partial<Parameters<typeof templateInsertion>[1]> = {}) {
    this.dispatch(templateInsertion(this.state, { template, ...extra }))
  }
  tab(dir: 1 | -1 = 1) {
    return jumpPlaceholder(this, dir)
  }
}

describe('riconoscimento delle formule nell\'editor', () => {
  it('riconosce $…$ e $$…$$', () => {
    expect(ctxOf('Sia $x^|2$ un numero').inMath).toBe(true)
    expect(ctxOf('Sia $x^2$ un| numero').inMath).toBe(false)
    expect(ctxOf('$$\n\\sum_{n}|\n$$').inMath).toBe(true)
    expect(ctxOf('Testo $$a+|b$$ testo').inMath).toBe(true)
  })

  it('segue le regole di VS Code sui dollari', () => {
    expect(ctxOf('costa 5$ e anche 3|$ e').inMath).toBe(false)
    expect(ctxOf('prezzi $5 e $1|0').inMath).toBe(false)
    expect(ctxOf(r`scrivo \$ non è $x| $ formula`).inMath).toBe(true)
  })

  it('non considera formule il codice', () => {
    expect(ctxOf('`$x|$`').inMath).toBe(false)
    expect(ctxOf('```\n$x|$\n```').inCode).toBe(true)
  })

  it('riconosce una formula aperta ma non ancora chiusa', () => {
    expect(ctxOf(r`Sia $\alp|`).inMath).toBe(true)
    expect(openMathBefore('costa 5$ e |', 12)).toBe(null)
    expect(openMathBefore('$$ x', 4)).toBe('display')
  })

  it('estrae il TeX della formula, anche dentro una citazione', () => {
    const { doc, pos } = withCursor('> $$\n> a +| b\n> $$')
    const region = mathRegionAt(makeState(doc, pos), pos)
    expect(region?.display).toBe(true)
    expect(region?.tex.trim()).toBe('a + b')
  })

  it('individua il comando che si sta scrivendo', () => {
    const { doc, pos } = withCursor(r`$\su|$`)
    expect(commandTokenAt(makeState(doc, pos), pos)).toEqual({ from: 1, to: 4, prefix: 'su' })
    const t2 = withCursor(r`$\su|m$`)
    expect(commandTokenAt(makeState(t2.doc, t2.pos), t2.pos)).toEqual({ from: 1, to: 5, prefix: 'su' })
    const t3 = withCursor(r`$a \\alp|$`)
    expect(commandTokenAt(makeState(t3.doc, t3.pos), t3.pos)).toBeNull()
  })
})

describe('inserimento di simboli e segnaposto', () => {
  it('inserisce un modello e salta tra i segnaposto con Tab', () => {
    const h = new Harness(makeState('$$', 1))
    h.insert(r`\sum_{#}^{#}`)
    expect(h.doc).toBe(r`$\sum_{}^{}$`)
    expect(h.cursor).toBe(7)
    h.type('n=0')
    expect(h.tab()).toBe(true)
    h.type(r`\infty`)
    expect(h.tab()).toBe(true)
    expect(h.doc).toBe(r`$\sum_{n=0}^{\infty}$`)
    // L'ultimo Tab porta alla fine del modello e chiude la sessione
    expect(h.cursor).toBe(h.doc.length - 1)
    expect(getPlaceholders(h.state)).toEqual([])
  })

  it('aggiunge i $ se il cursore non è in una formula', () => {
    const h = new Harness(makeState('Serie: '))
    h.insert(r`\sum_{#}^{#}`)
    expect(h.doc).toBe(r`Serie: $\sum_{}^{}$`)
  })

  it('usa un blocco $$ per le strutture grandi', () => {
    const h = new Harness(makeState('Matrice: '))
    h.insert(r`\begin{pmatrix} # & # \\ # & # \end{pmatrix}`, { display: true })
    expect(h.doc).toBe('Matrice: \n\n$$\n' + r`\begin{pmatrix}  &  \\  &  \end{pmatrix}` + '\n$$')
  })

  it('sostituisce il comando parziale', () => {
    const h = new Harness(makeState(r`$\su$`, 4))
    h.insert(r`\sum_{#}^{#}`, { replace: { from: 1, to: 4 } })
    expect(h.doc).toBe(r`$\sum_{}^{}$`)
  })

  it('mette il testo selezionato nel primo segnaposto', () => {
    const state = EditorState.create({
      doc: '$x+1$',
      selection: { anchor: 1, head: 4 },
      extensions: [markdown({ base: markdownLanguage, extensions: [mathMarkdown] }), placeholderField],
    })
    ensureSyntaxTree(state, state.doc.length, 5000)
    const h = new Harness(state)
    h.insert(r`\frac{#}{#}`)
    expect(h.doc).toBe(r`$\frac{x+1}{}$`)
    expect(h.cursor).toBe(12) // nel denominatore
  })

  it('gestisce modelli annidati', () => {
    const h = new Harness(makeState('$$', 1))
    h.insert(r`\sum_{#}^{#}`)
    h.insert(r`\frac{#}{#}`) // dentro il pedice
    h.type('1')
    h.tab()
    h.type('2')
    h.tab() // esce dalla frazione (resta nel pedice)
    h.tab() // passa all'apice della sommatoria
    h.type('N')
    expect(h.doc).toBe(r`$\sum_{\frac{1}{2}}^{N}$`)
  })

  it('separa un comando dalle lettere che seguono', () => {
    const h = new Harness(makeState('$x$', 1))
    h.insert(r`\alpha`)
    expect(h.doc).toBe(r`$\alpha x$`)
  })

  it('Maiusc+Tab torna indietro', () => {
    const h = new Harness(makeState('$$', 1))
    h.insert(r`\frac{#}{#}`)
    h.type('a')
    h.tab()
    expect(h.tab(-1)).toBe(true)
    expect(h.state.selection.main.from).toBe(7)
    expect(h.state.selection.main.to).toBe(8)
  })
})

describe('suggerimenti', () => {
  const ctx = (prefix: string, inMath = true) => ({
    pos: 1 + prefix.length + 1,
    region: null,
    inMath,
    openDisplay: false,
    inCode: false,
    token: { from: 1, to: 2 + prefix.length, prefix },
  })

  it('a comando completo propone la variante più utile', () => {
    const s = new SuggestionController(() => ({}) as EditorView, () => true)
    s.update(ctx('sum'))
    expect(s.items[s.selected].form.tex).toBe(r`\sum_{#}^{#}`)
    s.update(ctx('su'))
    expect(s.items[s.selected].form.tex).toBe(r`\sum`)
  })

  it('fuori dalle formule non cattura la tastiera con una sola lettera', () => {
    const s = new SuggestionController(() => ({}) as EditorView, () => true)
    s.update(ctx('n', false))
    expect(s.visible).toBe(true)
    expect(s.keyboardActive).toBe(false)
    s.update(ctx('alp', false))
    expect(s.keyboardActive).toBe(true)
  })

  it('non cattura le frecce per un comando completo senza varianti', () => {
    const s = new SuggestionController(() => ({}) as EditorView, () => true)
    s.update(ctx('alpha'))
    expect(s.keyboardActive).toBe(false)
  })

  it('usa lo stato aggiornato anche se si scrive più veloce del pannello', () => {
    const view = {
      state: makeState(r`$\inft$`, 6),
      dispatch(...specs: TransactionSpec[]) {
        this.state = this.state.update(...specs).state
      },
      focus() {},
    }
    const s = new SuggestionController(() => view as unknown as EditorView, () => true)
    s.update(mathContextAt(view.state, 6), view.state)
    // Si scrive l'ultima lettera e si preme subito Tab, prima che il pannello si aggiorni.
    view.dispatch({ changes: { from: 6, insert: 'y' }, selection: { anchor: 7 } })
    s.acceptWithKeyboard()
    expect(view.state.doc.toString()).toBe(r`$\infty$`)
  })

  it('Esc nasconde i suggerimenti fino al prossimo comando', () => {
    const s = new SuggestionController(() => ({}) as EditorView, () => true)
    s.update(ctx('su'))
    expect(s.dismiss()).toBe(true)
    expect(s.visible).toBe(false)
    s.update(ctx('sum'))
    expect(s.visible).toBe(true)
  })
})
