import { afterEach, describe, expect, it, vi } from 'vitest'
import workflow from '../.github/workflows/deploy.yml?raw'
import { accountOffMessage } from '../src/site'

/** Quello che vite.config.ts passa all'app, costruendo con queste variabili (le altre vuote). */
async function defineFor(env: Record<string, string>): Promise<Record<string, unknown>> {
  for (const name of ['CF_PAGES', 'CF_PAGES_BRANCH', 'CF_PAGES_COMMIT_SHA', 'GLIFO_NO_PWA', 'GITHUB_SHA']) vi.stubEnv(name, env[name] ?? '')
  vi.resetModules()
  const { default: config } = await import('../vite.config')
  return config.define ?? {}
}

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

describe('sito di prova su Cloudflare Pages', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('la build di Cloudflare è il sito di prova, con l\'account spento anche senza GLIFO_NO_PWA', async () => {
    expect((await defineFor({ CF_PAGES: '1', CF_PAGES_BRANCH: 'prova' })).__GLIFO_SITE__).toBe('"prova"')
    expect((await defineFor({ CF_PAGES: '1', CF_PAGES_BRANCH: 'prova', GLIFO_NO_PWA: '1' })).__GLIFO_SITE__).toBe('"prova"')
    // Un altro ramo, o un ramo che non si sa: meglio il sito di prova, con l'account spento.
    expect((await defineFor({ CF_PAGES: '1', CF_PAGES_BRANCH: 'un-altro-ramo' })).__GLIFO_SITE__).toBe('"prova"')
    expect((await defineFor({ CF_PAGES: '1' })).__GLIFO_SITE__).toBe('"prova"')
    expect((await defineFor({ GLIFO_NO_PWA: '1' })).__GLIFO_SITE__).toBe('"claude"')
    expect((await defineFor({})).__GLIFO_SITE__).toBe('"online"')
  })

  it('su Cloudflare il ramo principale è il sito vero (glifo.page, dal 9 ottobre 2026)', async () => {
    const { MAIN_BRANCH } = await import('../vite.config')
    expect((await defineFor({ CF_PAGES: '1', CF_PAGES_BRANCH: MAIN_BRANCH })).__GLIFO_SITE__).toBe('"online"')
  })

  it('la finestra di Accedi non dice «dentro claude.ai» sul sito di prova', () => {
    // Il 7 ottobre 2026 la build con GLIFO_NO_PWA, da usare anche su Cloudflare, lo diceva ovunque.
    const prova = accountOffMessage('prova')
    expect(prova).toContain('sito di prova')
    expect(prova).not.toContain('claude.ai')
    // La prova nel browser (scripts/smoke-test.mjs) cerca queste parole.
    expect(prova).toContain('accesso è spento')
    expect(accountOffMessage('claude')).toContain('dentro claude.ai')
  })

  it('nel registro dei tocchi c\'è il commit anche sul sito di prova', async () => {
    expect((await defineFor({ CF_PAGES: '1', CF_PAGES_COMMIT_SHA: 'abc1234def567' })).__GLIFO_VERSION__).toMatch(/^"abc1234, /)
    expect((await defineFor({ GITHUB_SHA: '9f8e7d6c5b4a' })).__GLIFO_VERSION__).toMatch(/^"9f8e7d6, /)
  })
})
