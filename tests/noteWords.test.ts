// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { setLangForTests } from '../src/i18n'
import { blockKind, blockWord } from '../src/noteWords'
import { renderMarkdown } from '../src/render/markdown'
import { findFencedBlocks, schemaBlockText } from '../src/schema/blocks'
import { sheetBlockText } from '../src/spreadsheet/model'

afterEach(() => setLangForTests('it'))

describe('i nomi dei blocchi nelle due lingue', () => {
  it('dentro Glifo un blocco ha il nome italiano, scritto in italiano o in inglese', () => {
    expect(blockKind('grafico')).toBe('grafico')
    expect(blockKind('graph')).toBe('grafico')
    expect(blockKind(' Graph  altro')).toBe('grafico')
    expect(blockKind('table')).toBe('tabella')
    expect(blockKind('TABELLA')).toBe('tabella')
    expect(blockKind('diagram')).toBe('schema')
    expect(blockKind('schema')).toBe('schema')
    expect(blockKind('math')).toBe('math')
    expect(blockKind('python')).toBe('python')
    expect(blockKind('')).toBe('')
  })

  it('i pulsanti scrivono il nome della lingua di Glifo', () => {
    expect(blockWord('grafico')).toBe('grafico')
    expect(schemaBlockText('{}')).toBe('```schema\n{}\n```')
    expect(sheetBlockText('| a |')).toBe('```tabella\n| a |\n```')
    setLangForTests('en')
    expect(blockWord('grafico')).toBe('graph')
    expect(blockWord('tabella')).toBe('table')
    expect(blockWord('schema')).toBe('diagram')
    expect(schemaBlockText('{}')).toBe('```diagram\n{}\n```')
    expect(sheetBlockText('| a |')).toBe('```table\n| a |\n```')
  })

  it('un blocco scritto in inglese si trova come quello italiano', () => {
    const text = '```graph\ny = x\n```\n\n```grafico\ny = 2x\n```\n\n```diagram\n{}\n```\n'
    expect(findFencedBlocks(text, 'grafico').map((b) => b.source)).toEqual(['y = x', 'y = 2x'])
    expect(findFencedBlocks(text, 'schema').map((b) => b.source)).toEqual(['{}'])
  })

  it('l\'anteprima disegna i blocchi inglesi come quelli italiani, in tutte e due le lingue', () => {
    for (const language of ['it', 'en'] as const) {
      setLangForTests(language)
      const html = renderMarkdown('```graph\ny = x\n```\n\n```table\nA1: 1\n```\n\n```diagram\n{"nodes":[],"edges":[]}\n```\n')
      expect(html, language).toContain('class="graph-block"')
      expect(html, language).toContain('class="sheet-block"')
      expect(html, language).toContain('class="schema-block"')
    }
  })
})
