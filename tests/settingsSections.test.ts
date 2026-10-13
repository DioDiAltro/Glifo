// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { SyncStatus } from '../src/account/controller'
import { setLangForTests } from '../src/i18n'
import { DEFAULT_SETTINGS } from '../src/store/settings'
import type { AccountSectionDeps } from '../src/ui/account'
import { LICENSES } from '../src/ui/licenses'
import { openSettingsDialog, type SettingsDialogDeps, type SettingsSection } from '../src/ui/settings'

// «Togli» di un modello passa dal worker di WebLLM: qui un finto, che lo toglie dalla cache finta.
const removeModel = vi.fn(async (_id: string) => {})
vi.mock('../src/ai/local', () => ({ localLlm: () => ({ remove: (id: string) => removeModel(id) }) }))

// jsdom non ha le finestre modali.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.open = true
}
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  this.open = false
  this.dispatchEvent(new Event('close'))
}

afterEach(() => {
  document.body.replaceChildren()
  localStorage.clear()
  setLangForTests('it')
  vi.unstubAllGlobals()
  removeModel.mockReset()
})

function open(extra: Partial<SettingsDialogDeps> = {}, start?: SettingsSection) {
  const changes: object[] = []
  const dialog = openSettingsDialog(
    {
      settings: { ...DEFAULT_SETTINGS },
      onChange: (next) => changes.push(next),
      onLanguageChange: () => {},
      personalWords: [],
      onPersonalWordsChange: (words) => words,
      onBackup: () => {},
      onRestore: () => {},
      ...extra,
    },
    start,
  )
  const tab = (id: SettingsSection) => dialog.querySelector<HTMLButtonElement>(`#settings-tab-${id}`)!
  const panel = (id: SettingsSection) => dialog.querySelector<HTMLElement>(`#settings-panel-${id}`)!
  const legends = (id: SettingsSection) => [...panel(id).querySelectorAll(':scope > fieldset > legend')].map((l) => l.textContent)
  const button = (id: SettingsSection, label: string) => [...panel(id).querySelectorAll('button')].find((b) => b.textContent === label)!
  return { dialog, changes, tab, panel, legends, button }
}

/** Un account entrato, con la sincronizzazione che si può far cambiare da `listeners`. */
function signedIn(extra: Partial<AccountSectionDeps> = {}) {
  const listeners: ((status: SyncStatus) => void)[] = []
  const unsubscribe = vi.fn()
  const deps: AccountSectionDeps = {
    email: 'studente@example.com',
    status: { kind: 'idle', at: Date.UTC(2026, 9, 13, 8, 5) },
    onStatus: (listener) => {
      listeners.push(listener)
      return unsubscribe
    },
    syncNow: vi.fn(),
    guestCount: 0,
    onAdoptGuest: () => 0,
    onRelogin: vi.fn(),
    onSwitch: vi.fn(),
    onSignOut: vi.fn(),
    onDownload: async () => {},
    onDelete: vi.fn(),
    ...extra,
  }
  return { deps, listeners, unsubscribe }
}

/** Mette la larghezza del telefono (matchMedia di jsdom non c'è: senza, è quella del computer). */
function phone(): void {
  vi.stubGlobal('matchMedia', (media: string) => ({ matches: true, media, addEventListener() {}, removeEventListener() {} }))
}

describe('le impostazioni divise in sezioni', () => {
  it('sei sezioni nell\'ordine; si apre su «Generale», e le altre si fanno quando si aprono', () => {
    const { dialog, tab, panel, legends } = open()
    expect([...dialog.querySelectorAll('.settings-tab-name')].map((n) => n.textContent)).toEqual(['Generale', 'Scrittura', 'AI', 'Account', 'Dati', 'Informazioni'])
    expect(dialog.querySelector('[role="tablist"]')?.getAttribute('aria-orientation')).toBe('vertical')
    expect(tab('general').getAttribute('aria-selected')).toBe('true')
    expect(document.activeElement).toBe(tab('general'))
    expect(legends('general')).toEqual(['Lingua', 'Aspetto'])
    expect(panel('writing').hidden).toBe(true)
    expect(panel('ai').querySelector('fieldset')).toBeNull()
    // Sul telefono si vede prima l'elenco.
    expect(dialog.dataset.view).toBe('list')
    expect(dialog.getAttribute('aria-label')).toBe('Impostazioni')
  })

  it('ogni sezione ha i suoi riquadri, e i cambi valgono subito', () => {
    const { dialog, changes, tab, panel, legends } = open()
    tab('writing').click()
    expect(panel('general').hidden).toBe(true)
    expect(panel('writing').hidden).toBe(false)
    expect(dialog.dataset.section).toBe('writing')
    expect(dialog.querySelector('.settings-subtitle')?.textContent).toBe('Scrittura')
    expect(legends('writing')).toEqual(['Editor', 'Controllo ortografico'])
    const spell = panel('writing').querySelector<HTMLInputElement>('.spell-settings input[type="checkbox"]')!
    spell.click()
    expect(changes).toContainEqual({ spellcheck: false })
    tab('ai').click()
    // Prima le spiegazioni (chi spiega, il modello, il tono), poi la propria chiave.
    expect(legends('ai')).toEqual(['Spiegazioni (prova)', 'Assistente AI (facoltativo)'])
    tab('data').click()
    expect(legends('data')).toEqual(['Backup', 'Spazio in questo browser'])
    tab('about').click()
    expect(legends('about')).toEqual(['Glifo', 'Privacy e licenze'])
    // Tornando su una sezione già aperta, è com'era.
    tab('writing').click()
    expect(panel('writing').querySelector<HTMLInputElement>('.spell-settings input[type="checkbox"]')).toBe(spell)
  })

  it('con le frecce si passa da una sezione all\'altra', () => {
    const { tab } = open()
    const key = (from: SettingsSection, key: string) => tab(from).dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
    key('general', 'ArrowDown')
    expect(document.activeElement).toBe(tab('writing'))
    expect(tab('writing').getAttribute('aria-selected')).toBe('true')
    expect(tab('general').tabIndex).toBe(-1)
    key('writing', 'End')
    expect(tab('about').getAttribute('aria-selected')).toBe('true')
    key('about', 'ArrowDown')
    expect(tab('general').getAttribute('aria-selected')).toBe('true')
    key('general', 'ArrowUp')
    expect(document.activeElement).toBe(tab('about'))
  })

  it('dalla lingua un collegamento porta al controllo ortografico, in «Scrittura»', () => {
    const { panel, tab } = open()
    const help = panel('general').querySelector('.language-settings .field-help')!
    expect(help.textContent).toContain('le sceglie il controllo ortografico, in Scrittura.')
    help.querySelector<HTMLButtonElement>('button.link-button')!.click()
    expect(tab('writing').getAttribute('aria-selected')).toBe('true')
    expect(panel('writing').hidden).toBe(false)
  })

  it('sul telefono una pagina per sezione, con la freccia per tornare all\'elenco', () => {
    phone()
    const { dialog, tab } = open()
    expect(dialog.dataset.view).toBe('list')
    // Con le frecce sull'elenco ci si sposta soltanto: si apre con Invio, o toccando.
    tab('general').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    expect(document.activeElement).toBe(tab('writing'))
    expect(dialog.dataset.view).toBe('list')
    tab('data').click()
    expect(dialog.dataset.view).toBe('section')
    const back = dialog.querySelector<HTMLButtonElement>('.settings-back')!
    expect(document.activeElement).toBe(back)
    expect(back.getAttribute('aria-label')).toBe('Torna all\'elenco delle impostazioni')
    expect(dialog.querySelector('.settings-subtitle')?.textContent).toBe('Dati')
    back.click()
    expect(dialog.dataset.view).toBe('list')
    expect(document.activeElement).toBe(tab('data'))
  })

  it('si apre anche su una sezione: sul telefono direttamente sulla sua pagina', () => {
    phone()
    const { dialog, panel } = open({}, 'account')
    expect(dialog.dataset.view).toBe('section')
    expect(panel('account').hidden).toBe(false)
    expect(document.activeElement).toBe(dialog.querySelector('.settings-back'))
  })

  it('in inglese', () => {
    setLangForTests('en')
    const { dialog, panel, tab } = open()
    expect([...dialog.querySelectorAll('.settings-tab-name')].map((n) => n.textContent)).toEqual(['General', 'Writing', 'AI', 'Account', 'Data', 'About'])
    expect(dialog.getAttribute('aria-label')).toBe('Settings')
    tab('about').click()
    expect(panel('about').querySelector('.about-version')?.textContent).toMatch(/^(Local build|Version [0-9a-f]{7}), \d{1,2} [A-Z][a-z]+ \d{4}\.$/)
  })
})

describe('la sezione «Account»', () => {
  it('con l\'account: chi è entrato e la sincronizzazione, che si aggiorna mentre la si guarda', () => {
    const { deps, listeners, unsubscribe } = signedIn()
    const { dialog, panel, button, tab } = open({ account: deps }, 'account')
    expect(dialog.querySelector('#settings-hint-account')?.textContent).toBe('studente@example.com')
    expect(tab('account').getAttribute('aria-selected')).toBe('true')
    expect(panel('account').querySelector('.account-email')?.textContent).toBe('Sei entrato come studente@example.com.')
    expect(panel('account').querySelector('.account-status')?.textContent).toMatch(/^Tutto sincronizzato/)
    expect(button('account', 'Accedi di nuovo').hidden).toBe(true)
    button('account', 'Sincronizza ora').click()
    expect(deps.syncNow).toHaveBeenCalled()
    listeners[0]({ kind: 'auth' })
    expect(panel('account').querySelector('.account-status')?.textContent).toMatch(/^L'accesso è scaduto/)
    expect(button('account', 'Accedi di nuovo').hidden).toBe(false)
    // Chiudendo le impostazioni si smette di seguirla.
    dialog.close()
    expect(unsubscribe).toHaveBeenCalledTimes(1)
  })

  it('«Cambia account», «Esci» ed «Elimina account…» chiudono prima le impostazioni', () => {
    for (const [label, action] of [
      ['Cambia account', 'onSwitch'],
      ['Esci dall\'account', 'onSignOut'],
      ['Elimina account…', 'onDelete'],
      ['Accedi di nuovo', 'onRelogin'],
    ] as const) {
      const { deps, unsubscribe } = signedIn()
      const { dialog, button } = open({ account: deps }, 'account')
      button('account', label).click()
      expect(dialog.open, label).toBe(false)
      expect(deps[action], label).toHaveBeenCalledTimes(1)
      expect(unsubscribe).toHaveBeenCalledTimes(1)
    }
  })

  it('gli appunti fuori dall\'account si aggiungono da qui', () => {
    const { deps } = signedIn({ guestCount: 2, onAdoptGuest: () => 2 })
    const { panel, button } = open({ account: deps }, 'account')
    expect(panel('account').textContent).toContain('In questo browser ci sono anche 2 appunti fuori dall\'account')
    button('account', 'Aggiungili all\'account').click()
    expect(panel('account').textContent).toContain('Aggiunti 2 appunti all\'account.')
  })

  it('senza account: cosa dà l\'account, e «Accedi» chiude le impostazioni e apre la finestra per entrare', () => {
    const onSignIn = vi.fn()
    const { dialog, panel, button } = open({ onSignIn }, 'account')
    expect(dialog.querySelector('#settings-hint-account')?.textContent).toBe('Accedi per ritrovare gli appunti su ogni dispositivo')
    expect(panel('account').textContent).toContain('Non sei entrato in un account.')
    expect(panel('account').textContent).toContain('Niente password')
    button('account', 'Accedi').click()
    expect(dialog.open).toBe(false)
    expect(onSignIn).toHaveBeenCalledTimes(1)
  })
})

describe('la sezione «Dati»', () => {
  /** Una Cache Storage di WebLLM con Qwen3 0.6B tutto scaricato (400 MB). */
  function modelInCache(): Map<string, unknown> {
    const base = 'https://huggingface.co/mlc-ai/Qwen3-0.6B-q4f16_1-MLC/resolve/main/'
    const stored = new Map<string, unknown>([
      [`${base}tensor-cache.json`, { records: [{ dataPath: 'params_shard_0.bin', nbytes: 400_000_000 }] }],
      [`${base}params_shard_0.bin`, 'pezzo'],
    ])
    const cache = {
      match: async (url: string) => (stored.has(url) ? { json: async () => stored.get(url), headers: new Headers() } : undefined),
      keys: async () => [...stored.keys()].map((url) => ({ url })),
    }
    vi.stubGlobal('caches', { has: async () => true, open: async () => cache })
    return stored
  }

  it('quanto occupano appunti, lavagne e modelli di «Spiegami», e il totale che dice il browser', async () => {
    localStorage.setItem('glifo.note.v1.a', 'x'.repeat(4985))
    modelInCache()
    vi.stubGlobal('navigator', { ...navigator, storage: { estimate: async () => ({ usage: 1_500_000_000, quota: 60_000_000_000 }) } })
    const { panel } = open({ boardsBytes: async () => 2_500_000 }, 'data')
    const rows = () => [...panel('data').querySelectorAll('.space-row')].map((row) => [row.querySelector('dt')?.textContent, row.querySelector('.space-size')?.textContent])
    await vi.waitFor(() => expect(rows()).toHaveLength(4))
    expect(rows()).toEqual([
      ['Appunti, cartelle e impostazioni', '5 kB'],
      ['Lavagne', '2,5 MB'],
      ['Qwen3 0.6B, il modello di «Spiegami»', '400 MB'],
      ['In tutto, con i file per usare Glifo offline', '1,5 GB'],
    ])
    expect(panel('data').textContent).toContain('Il browser può dare a Glifo fino a 60 GB.')
  })

  it('un modello si toglie da qui, e l\'elenco si rifà', async () => {
    const stored = modelInCache()
    removeModel.mockImplementation(async () => stored.clear())
    const { panel } = open({}, 'data')
    const remove = await vi.waitFor(() => {
      const button = panel('data').querySelector<HTMLButtonElement>('.space-model button')
      if (!button) throw new Error('il pulsante non c\'è ancora')
      return button
    })
    expect(remove.getAttribute('aria-label')).toBe('Togli Qwen3 0.6B da questo browser')
    remove.click()
    expect(removeModel).toHaveBeenCalledWith('Qwen3-0.6B')
    await vi.waitFor(() => expect(panel('data').querySelector('.space-model')).toBeNull())
    expect(panel('data').textContent).toContain('Modelli di «Spiegami»nessuno')
  })

  it('senza misure dal browser restano quelle di Glifo, senza totale', async () => {
    const { panel } = open({}, 'data')
    await vi.waitFor(() => expect(panel('data').textContent).toContain('Lavagnenon si sa'))
    expect(panel('data').querySelector('.space-total')).toBeNull()
  })
})

describe('la sezione «Informazioni»', () => {
  it('la versione, la guida e i commenti (sopra le impostazioni, che restano aperte), l\'informativa e le licenze', () => {
    const onGuide = vi.fn()
    const onComments = vi.fn()
    const { dialog, panel, button } = open({ onGuide, onComments }, 'about')
    expect(panel('about').querySelector('.about-version')?.textContent).toMatch(/^Versione (locale|[0-9a-f]{7}) del \d{1,2} [a-z]+ \d{4}\.$/)
    button('about', 'Come si usa').click()
    button('about', 'Commenti').click()
    expect(onGuide).toHaveBeenCalledTimes(1)
    expect(onComments).toHaveBeenCalledTimes(1)
    expect(dialog.open).toBe(true)
    expect(panel('about').querySelector('a[href="privacy.html"]')).not.toBeNull()
    expect(panel('about').querySelector('summary')?.textContent).toBe(`I ${LICENSES.length} programmi liberi su cui è costruito Glifo`)
    const links = [...panel('about').querySelectorAll<HTMLAnchorElement>('.license-list a')]
    expect(links.map((a) => a.getAttribute('href'))).toEqual(LICENSES.map((l) => `licenze/${l.file}`))
    expect(panel('about').querySelector('.license-list li')?.textContent).toBe('CodeMirror · l\'editor · licenza MIT')
    // In fondo privacy e licenze: il registro dei tocchi non c'è più (GRAFICA.md, punto 7).
    expect(panel('about').querySelector(':scope > fieldset:last-of-type')?.classList.contains('licenses-settings')).toBe(true)
    expect(panel('about').querySelector('.touch-log')).toBeNull()
  })
})
