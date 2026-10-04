import { describe, expect, it } from 'vitest'
import workflow from '../.github/workflows/deploy.yml?raw'

describe('pubblicazione su GitHub Pages', () => {
  it('va online solo il ramo principale', () => {
    expect(workflow).toMatch(/if:\s*github\.ref_name == github\.event\.repository\.default_branch/)
  })

  it('un push su un altro ramo (come «prova») non ferma la pubblicazione del principale', () => {
    // Il 4 ottobre 2026 il push di «prova» ha fermato quella del ramo principale: avevano lo
    // stesso gruppo, e il più recente ferma l'altro.
    const group = workflow.match(/concurrency:\s*\n\s*group:\s*(.+)/)
    expect(group, 'manca il gruppo di concorrenza').not.toBeNull()
    expect(group![1]).toMatch(/\$\{\{\s*github\.ref(_name)?\s*\}\}/)
  })
})
