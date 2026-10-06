import { invertedEffects, isolateHistory } from '@codemirror/commands'
import { EditorSelection, StateEffect, type EditorState, type Extension, type Transaction } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { moveFencedBlock, type BlockMove, type MoveDir, type MoveFailure } from '../render/blockMove'
import { parseBlocks } from '../render/markdown'

/** Le righe prima e dopo uno spostamento (`map`), e al contrario (`back`): servono a chi segue i blocchi per riga. */
interface LineMap {
  map: (line: number) => number
  back: (line: number) => number
}

const blockMoved = StateEffect.define<LineMap>()

/**
 * Chi tiene qualcosa per riga (gli slider dei grafici) lo sposta con i blocchi: `onMoved` riceve le
 * righe nuove di quelle di prima a ogni spostamento, e anche quando Annulla lo disfa o Ripeti lo rifà
 * (lo spostamento al contrario viaggia con la cronologia).
 */
export function blockMoves(onMoved: (map: (line: number) => number) => void): Extension {
  return [
    invertedEffects.of((tr) => tr.effects.flatMap((e) => (e.is(blockMoved) ? [blockMoved.of({ map: e.value.back, back: e.value.map })] : []))),
    EditorView.updateListener.of((update) => {
      for (const tr of update.transactions) for (const e of tr.effects) if (e.is(blockMoved)) onMoved(e.value.map)
    }),
  ]
}

/**
 * Lo spostamento di uno schema o di un grafico (le frecce dell'anteprima) come modifica dell'editor:
 * un passo solo di Annulla (`move.block` non si unisce a quello che si scrive prima, `isolateHistory`
 * a quello dopo). Il cursore che stava nel blocco lo segue; quello nel blocco scavalcato resta sulla
 * stessa lettera. `tr` è null se il testo non cambia (due blocchi uguali). 'guard': un filtro avrebbe
 * cambiato la modifica, e allora non si fa.
 */
export function blockMoveTransaction(
  state: EditorState,
  line: number,
  hash: string,
  dir: MoveDir,
): { ok: true; move: BlockMove; tr: Transaction | null } | { ok: false; reason: MoveFailure | 'guard' } {
  const doc = state.doc.toString()
  const move = moveFencedBlock(doc, line, hash, dir, parseBlocks)
  if (!move.ok) return move
  if (move.text === doc) return { ok: true, move, tr: null }
  const changes = state.changes(move.changes)
  // Ogni posizione va con le sue righe: nel blocco, in quello scavalcato o nelle righe vuote fra i due.
  const map = (pos: number) => {
    if (pos >= move.oldFrom && pos <= move.oldTo) return move.newFrom + (pos - move.oldFrom)
    if (pos >= move.skippedFrom && pos <= move.skippedTo) return move.skippedNewFrom + (pos - move.skippedFrom)
    if (pos >= move.gapFrom && pos <= move.gapTo) return move.gapNewFrom + (pos - move.gapFrom)
    return changes.mapPos(pos, 1)
  }
  // Una selezione che prende tutti e due i blocchi (anche Ctrl+A) li prende ancora tutti e due.
  const first = Math.min(move.oldFrom, move.skippedFrom)
  const last = Math.max(move.oldTo, move.skippedTo)
  const length = changes.newLength
  // Una selezione del blocco con l'a capo prima o dopo (Maiusc+↓ sulle sue righe) resta del blocco.
  const withB = (pos: number) => Math.min(length, Math.max(0, move.newFrom + (pos - move.oldFrom)))
  const nearB = (pos: number) => pos >= move.oldFrom - 1 && pos <= move.oldTo + 1
  const { ranges, mainIndex } = state.selection
  const selection = EditorSelection.create(
    ranges.map((r) => {
      if (r.empty) return EditorSelection.cursor(map(r.head))
      if (r.from <= first && r.to >= last) {
        return EditorSelection.range(changes.mapPos(r.anchor, r.anchor === r.from ? -1 : 1), changes.mapPos(r.head, r.head === r.from ? -1 : 1))
      }
      if (nearB(r.anchor) && nearB(r.head)) return EditorSelection.range(withB(r.anchor), withB(r.head))
      return EditorSelection.range(map(r.anchor), map(r.head))
    }),
    mainIndex,
  )
  const tr = state.update({
    changes,
    selection,
    effects: blockMoved.of({ map: move.mapLine, back: move.unmapLine }),
    userEvent: 'move.block',
    annotations: isolateHistory.of('full'),
  })
  if (tr.newDoc.toString() !== move.text) return { ok: false, reason: 'guard' }
  return { ok: true, move, tr }
}
