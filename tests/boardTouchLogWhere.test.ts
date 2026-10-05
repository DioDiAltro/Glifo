// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { where } from '../src/board/touchlog'

function page(): void {
  document.body.innerHTML = `
    <div class="app">
      <aside class="notes-panel">
        <button class="note-item" type="button"><span class="note-title">Teorema segreto</span></button>
        <button type="button" aria-label="Nuova nota">+</button>
      </aside>
      <div class="content">
        <div class="float-bar"><button type="button" class="view-button" aria-label="Editor"><span>Editor</span></button></div>
        <div class="editor-pane"><div class="cm-editor"><div class="cm-content" contenteditable="true"><div class="cm-line">Appunti privati</div></div></div></div>
        <div class="preview-pane"><div class="markdown-body"><p>Appunti privati</p><button type="button">Pulsante scritto nella nota</button></div></div>
        <section class="board-pane">
          <div class="board-stage"><canvas class="board-live"></canvas></div>
          <div class="board-zoom"><button type="button" class="board-button" aria-label="Ingrandisci"><svg><path d="M0 0"/></svg></button></div>
        </section>
      </div>
    </div>
    <dialog aria-label="Impostazioni"><label><input type="checkbox"> Registra</label></dialog>`
}

const q = (s: string) => document.querySelector(s)

describe('lavagna: il registro dice dove è successo', () => {
  it('le parti dell\'app e i pulsanti, con il loro nome', () => {
    page()
    expect(where(q('.board-live'))).toBe('lavagna')
    expect(where(q('.board-zoom path'))).toBe('strumenti della lavagna: «Ingrandisci»')
    expect(where(q('.view-button span'))).toBe('pulsanti sopra il testo: «Editor»')
    expect(where(q('[aria-label="Nuova nota"]'))).toBe('barra laterale: «Nuova nota»')
    expect(where(q('dialog input'))).toBe('finestra «Impostazioni»: «input»')
    expect(where(document.body)).toBe('pagina')
    expect(where(document)).toBe('pagina')
  })

  it('mai il testo delle note: il titolo di un appunto, il testo e l\'anteprima restano nascosti', () => {
    page()
    expect(where(q('.note-title'))).toBe('barra laterale: un appunto')
    expect(where(q('.cm-line'))).toBe('editor')
    expect(where(q('.cm-line')!.firstChild)).toBe('editor')
    expect(where(q('.markdown-body button'))).toBe('anteprima')
    const all = ['.note-title', '.cm-line', '.markdown-body p', '.markdown-body button'].map((s) => where(q(s))).join(' ')
    expect(all).not.toMatch(/segreto|privati|scritto/)
  })
})
