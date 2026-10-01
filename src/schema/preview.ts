/**
 * Gli schemi nell'anteprima. Il Markdown lascia un segnaposto con il JSON del blocco (vedi
 * src/render/markdown.ts) e qui lo si disegna. maxGraph si carica alla prima nota con uno
 * schema; i disegni restano in memoria, così mentre si scrive non si rifanno ogni volta.
 */
import { escapeHtml } from '../render/katex'
import { parseSchema, SchemaError, type Theme } from './model'

export interface PreviewLook {
  theme: Theme
  /** Lo sfondo dell'anteprima, dietro il testo delle frecce. */
  surface: string
}

const MAX_CACHE = 60
const drawn = new Map<string, string>()
const pending = new Map<string, Promise<string>>()
let graphModule: Promise<typeof import('./graph')> | null = null

function errorHtml(err: unknown): string {
  const message = err instanceof SchemaError ? err.message : 'Lo schema non si riesce a disegnare.'
  return `<p class="schema-error">${escapeHtml(message)}</p>`
}

/** Il disegno dello schema; vuoto se non ci sono forme. */
async function draw(source: string, look: PreviewLook): Promise<string> {
  try {
    const schema = parseSchema(source)
    if (!schema.nodes.length) return ''
    graphModule ??= import('./graph')
    const { schemaSvg } = await graphModule
    return schemaSvg(schema, look)
  } catch (err) {
    return errorHtml(err)
  }
}

function drawCached(key: string, source: string, look: PreviewLook): Promise<string> {
  let job = pending.get(key)
  if (!job) {
    job = draw(source, look).then((html) => {
      pending.delete(key)
      if (drawn.size >= MAX_CACHE) drawn.delete(drawn.keys().next().value!)
      drawn.set(key, html)
      return html
    })
    pending.set(key, job)
  }
  return job
}

function fill(block: HTMLElement, html: string): void {
  block.dataset.drawn = ''
  block.classList.remove('is-loading')
  block.classList.toggle('is-empty', !html)
  // Il disegno è fatto da Glifo: i testi sono già passati da escapeHtml o da KaTeX.
  block.innerHTML = html
  block.append(
    Object.assign(document.createElement('button'), {
      type: 'button',
      className: 'btn btn-small schema-edit',
      textContent: 'Modifica',
      title: 'Modifica lo schema (anche con un doppio clic)',
    }),
  )
}

/** Disegna gli schemi dell'anteprima: quelli già pronti subito, gli altri appena possibile. */
export function hydrateSchemas(root: HTMLElement, look: PreviewLook): void {
  for (const block of root.querySelectorAll<HTMLElement>('.schema-block:not([data-drawn])')) {
    const source = block.dataset.schema ?? ''
    const key = `${look.theme}\n${look.surface}\n${source}`
    const html = drawn.get(key)
    if (html !== undefined) {
      fill(block, html)
      continue
    }
    block.classList.add('is-loading')
    void drawCached(key, source, look).then((result) => {
      if (block.isConnected && !('drawn' in block.dataset)) fill(block, result)
    })
  }
}
