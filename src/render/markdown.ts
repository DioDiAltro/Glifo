import markdownit, { type MarkdownIt, type StateBlock, type StateCore, type StateInline } from 'markdown-it'
import footnote from 'markdown-it-footnote'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import css from 'highlight.js/lib/languages/css'
import go from 'highlight.js/lib/languages/go'
import haskell from 'highlight.js/lib/languages/haskell'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import julia from 'highlight.js/lib/languages/julia'
import kotlin from 'highlight.js/lib/languages/kotlin'
import latex from 'highlight.js/lib/languages/latex'
import markdownLang from 'highlight.js/lib/languages/markdown'
import matlab from 'highlight.js/lib/languages/matlab'
import php from 'highlight.js/lib/languages/php'
import plaintext from 'highlight.js/lib/languages/plaintext'
import prolog from 'highlight.js/lib/languages/prolog'
import python from 'highlight.js/lib/languages/python'
import r from 'highlight.js/lib/languages/r'
import rust from 'highlight.js/lib/languages/rust'
import sql from 'highlight.js/lib/languages/sql'
import typescript from 'highlight.js/lib/languages/typescript'
import x86asm from 'highlight.js/lib/languages/x86asm'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import { graphNames } from '../graph/spec'
import { Sheet } from '../math/sheet'
import { escapeHtml, renderTexOrError, renderTexWithResult } from './katex'
import { listRule, paragraphRule } from './lists'
import { analyzeBlockOpen, findBlockClose, matchInlineMath } from './mathDelims'

const HLJS_LANGUAGES = {
  bash, c, cpp, csharp, css, go, haskell, java, javascript, json, julia, kotlin, latex,
  markdown: markdownLang, matlab, php, plaintext, prolog, python, r, rust, sql, typescript, x86asm, xml, yaml,
}
for (const [name, lang] of Object.entries(HLJS_LANGUAGES)) hljs.registerLanguage(name, lang)

/** Come VS Code: alcuni ambienti vanno sempre in modalità display. */
const DISPLAY_ENVS = /\\begin\{(align|equation|gather|cd|alignat)\*?\}/i

function stripBackticks(content: string): string {
  // $`1+1`$ è la sintassi di GitHub per la matematica in linea.
  return content.length > 2 && content.startsWith('`') && content.endsWith('`') ? content.slice(1, -1) : content
}

function mathInlineRule(state: StateInline, silent: boolean): boolean {
  if (state.src.charCodeAt(state.pos) !== 0x24 /* $ */) return false
  const m = matchInlineMath(state.src, state.pos, state.posMax)
  if (!m) return false
  if (!silent) {
    const token = state.push(m.display ? 'math_inline_display' : 'math_inline', 'math', 0)
    token.content = state.src.slice(m.contentFrom, m.contentTo)
    token.markup = m.display ? '$$' : '$'
  }
  state.pos = m.end
  return true
}

function mathBlockRule(state: StateBlock, startLine: number, endLine: number, silent: boolean): boolean {
  if (state.sCount[startLine] - state.blkIndent >= 4) return false
  const pos = state.bMarks[startLine] + state.tShift[startLine]
  const max = state.eMarks[startLine]
  const firstLine = state.src.slice(pos, max)
  const open = analyzeBlockOpen(firstLine, 0)
  if (open.kind === 'none') return false
  if (silent) return true

  let content: string
  let next = startLine + 1
  if (open.kind === 'single') {
    content = firstLine.slice(open.contentFrom, open.contentTo)
  } else {
    const lines: string[] = []
    const rest = firstLine.slice(open.contentFrom)
    if (rest.trim()) lines.push(rest)
    for (; next < endLine; next++) {
      const lpos = state.bMarks[next] + state.tShift[next]
      const lmax = state.eMarks[next]
      // Una riga meno rientrata chiude l'elenco che contiene la formula.
      if (lpos < lmax && state.sCount[next] < state.blkIndent) break
      const text = state.src.slice(lpos, lmax)
      const close = findBlockClose(text, 0)
      if (close >= 0) {
        const last = text.slice(0, close)
        if (last.trim()) lines.push(last)
        next++
        break
      }
      lines.push(text)
    }
    content = lines.join('\n')
  }

  state.line = next
  const token = state.push('math_block', 'math', 0)
  token.block = true
  token.content = content
  token.map = [startLine, next]
  token.markup = '$$'
  return true
}

/** Liste di cose da fare: "- [ ] compito" e "- [x] fatto". */
function taskListRule(state: StateCore): void {
  const tokens = state.tokens
  for (let i = 2; i < tokens.length; i++) {
    const inline = tokens[i]
    if (inline.type !== 'inline' || tokens[i - 1].type !== 'paragraph_open' || tokens[i - 2].type !== 'list_item_open') continue
    const m = /^\[([ xX])\][  ]/.exec(inline.content)
    const first = inline.children?.[0]
    if (!m || !first || first.type !== 'text' || !first.content.startsWith(m[0].slice(0, 3))) continue
    const checked = m[1] !== ' '
    first.content = first.content.slice(3).replace(/^[  ]/, '')
    const box = new state.Token('html_inline', '', 0)
    const line = tokens[i - 2].map?.[0] ?? -1
    box.content = `<input type="checkbox" class="task-checkbox" data-task-line="${line}"${checked ? ' checked' : ''}> `
    inline.children!.unshift(box)
    tokens[i - 2].attrJoin('class', 'task-list-item')
  }
}

/** Aggiunge data-line ai blocchi, per sincronizzare lo scorrimento con l'editor. */
function sourceLineRule(state: StateCore): void {
  for (const token of state.tokens) {
    if (token.map && token.nesting >= 0 && token.block && token.type !== 'math_block') {
      token.attrSet('data-line', String(token.map[0]))
    }
  }
}

function createMarkdownIt(): MarkdownIt {
  const md: MarkdownIt = markdownit({
    html: true,
    linkify: true,
    breaks: false,
    highlight(code, lang) {
      const language = lang && hljs.getLanguage(lang) ? lang : null
      if (!language) return ''
      try {
        return hljs.highlight(code, { language, ignoreIllegals: true }).value
      } catch {
        return ''
      }
    },
  })
  md.use(footnote)
  // Elenchi con tutti i marcatori di Glifo (a), i), es)…); niente codice rientrato:
  // i rientri servono agli elenchi, il codice si scrive tra ```.
  md.block.ruler.at('list', listRule, { alt: ['paragraph', 'reference', 'blockquote'] })
  md.block.ruler.at('paragraph', paragraphRule)
  md.disable('code')
  md.inline.ruler.after('escape', 'math_inline', mathInlineRule)
  md.block.ruler.after('blockquote', 'math_block', mathBlockRule, { alt: ['paragraph', 'reference', 'blockquote', 'list'] })
  md.core.ruler.after('inline', 'task_lists', taskListRule)
  md.core.ruler.push('source_line', sourceLineRule)

  // Le formule passano anche dal «foglio» della nota (src/math/sheet.ts), come nell'editor: le
  // definizioni ($a = 2$, $f(x) = …$) servono a quelle sotto e ai grafici, e una formula che
  // finisce con «=» si vede con il suo risultato, colorato (finché non lo si scrive con Tab).
  const formula = (content: string, display: boolean, env: unknown) => {
    const result = sheetOf(env)?.add(content)
    return result ? renderTexWithResult(content, result.tex, display) : renderTexOrError(content, display)
  }
  md.renderer.rules.math_inline = (tokens, idx, _options, env) => {
    const content = stripBackticks(tokens[idx].content)
    return formula(content, DISPLAY_ENVS.test(content), env)
  }
  md.renderer.rules.math_inline_display = (tokens, idx, _options, env) => formula(tokens[idx].content, true, env)
  md.renderer.rules.math_block = (tokens, idx, _options, env) => {
    const line = tokens[idx].map?.[0]
    const attr = line === undefined ? '' : ` data-line="${line}"`
    return `<div class="math-block"${attr}>${formula(tokens[idx].content, true, env)}</div>\n`
  }
  // I blocchi ```math si comportano come $$ … $$ (come su GitHub); quelli ```schema e ```grafico
  // lasciano il posto al disegno, che l'anteprima fa dopo (src/schema/preview.ts, src/graph/preview.ts).
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const info = token.info.trim().split(/\s+/)[0].toLowerCase()
    const line = token.map?.[0]
    const attr = line === undefined ? '' : ` data-line="${line}"`
    if (info === 'math') {
      return `<div class="math-block"${attr}>${renderTexOrError(token.content, true)}</div>\n`
    }
    if (info === 'schema') {
      return `<div class="schema-block"${attr} data-schema="${escapeHtml(token.content)}"></div>\n`
    }
    if (info === 'grafico') {
      const defs = sheetOf(env)?.definitionsFor(graphNames(token.content)) ?? []
      return `<div class="graph-block"${attr} data-graph="${escapeHtml(token.content)}" data-defs="${escapeHtml(JSON.stringify(defs))}"></div>\n`
    }
    return fence(tokens, idx, options, env, self)
  }
  return md
}

interface RenderEnv {
  sheet?: Sheet
}

function sheetOf(env: unknown): Sheet | undefined {
  return (env as RenderEnv | undefined)?.sheet
}

let md: MarkdownIt | null = null
let purifyConfigured = false

function configurePurify(): void {
  if (purifyConfigured) return
  purifyConfigured = true
  // I link si aprono in una nuova scheda, per non perdere l'app.
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A' && node.getAttribute('href') && !node.getAttribute('href')!.startsWith('#')) {
      node.setAttribute('target', '_blank')
      node.setAttribute('rel', 'noopener noreferrer')
    }
  })
}

/** Da Markdown a HTML sicuro (il testo delle note non può eseguire script). */
export function renderMarkdown(src: string): string {
  md ??= createMarkdownIt()
  const env: RenderEnv = { sheet: new Sheet() }
  const html = md.render(src, env as Record<string, unknown>)
  configurePurify()
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['target', 'data-line', 'data-task-line', 'data-schema', 'data-graph', 'data-defs', 'aria-hidden', 'encoding'],
    ADD_TAGS: ['semantics', 'annotation'],
  })
}

export { escapeHtml }
