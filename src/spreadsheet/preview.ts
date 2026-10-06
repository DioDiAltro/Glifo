/**
 * Le tabelle nell'anteprima della nota di chi la sta scrivendo: la tabella è già pronta (la calcola
 * il Markdown, vedi src/render/markdown.ts); qui si aggiungono «Modifica» e le frecce per spostarla,
 * in alto a destra come per gli schemi. Nella pagina delle note condivise non ci sono.
 */
import { moveButtonsHtml } from '../ui/moveButtons'

export function hydrateSheets(root: HTMLElement): void {
  for (const block of root.querySelectorAll<HTMLElement>('.sheet-block:not([data-drawn])')) {
    block.dataset.drawn = ''
    const tools = document.createElement('div')
    tools.className = 'schema-preview-tools'
    tools.append(
      Object.assign(document.createElement('button'), {
        type: 'button',
        className: 'btn btn-small sheet-edit',
        textContent: 'Modifica',
        title: 'Modifica la tabella (anche con un doppio clic)',
      }),
    )
    if (block.dataset.move !== undefined) tools.insertAdjacentHTML('beforeend', moveButtonsHtml('tabella', block.dataset.move, block.dataset.moveIn === 'voce'))
    block.append(tools)
  }
}
