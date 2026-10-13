// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import privacy from '../privacy.html?raw'
import { DEFAULT_SETTINGS } from '../src/store/settings'
import type { AccountSectionDeps } from '../src/ui/account'
import { openSettingsDialog } from '../src/ui/settings'

// jsdom non ha le finestre modali.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.open = true
}

afterEach(() => document.body.replaceChildren())

const account = (email: string): AccountSectionDeps => ({
  email,
  status: { kind: 'idle', at: Date.now() },
  onStatus: () => () => {},
  syncNow: () => {},
  guestCount: 0,
  onAdoptGuest: () => 0,
  onRelogin: () => {},
  onSwitch: () => {},
  onSignOut: () => {},
  onDownload: async () => {},
  onDelete: () => {},
})

/** Il testo del backup nella sezione «Dati» delle impostazioni, senza account o con l'email data. */
function dataHelp(email?: string): { dialog: HTMLDialogElement; help: HTMLElement } {
  const dialog = openSettingsDialog(
    {
      settings: { ...DEFAULT_SETTINGS },
      onChange: () => {},
      onLanguageChange: () => {},
      personalWords: [],
      onPersonalWordsChange: (words) => words,
      onBackup: () => {},
      onRestore: () => {},
      account: email ? account(email) : null,
    },
    'data',
  )
  return { dialog, help: dialog.querySelector<HTMLElement>('fieldset.backup-settings p.field-help')! }
}

// Il pulsante dell'account sta in fondo alla barra laterale e apre le impostazioni su «Account»: in alto
// non c'è una barra.
describe('dove si apre l\'account', () => {
  it('senza account il backup manda alla sezione «Account», che offre «Accedi»', () => {
    const { dialog, help } = dataHelp()
    expect(help.textContent).toContain('Con l\'account ritrovi le note su ogni dispositivo: vedi Account.')
    expect(help.textContent).not.toContain('in alto')
    help.querySelector<HTMLButtonElement>('button.link-button')!.click()
    expect(dialog.dataset.section).toBe('account')
    const panel = dialog.querySelector<HTMLElement>('#settings-panel-account')!
    expect(panel.hidden).toBe(false)
    expect(panel.textContent).toContain('Non sei entrato in un account.')
    expect([...panel.querySelectorAll('button')].map((b) => b.textContent)).toContain('Accedi')
  })

  it('con l\'account manda alla sezione «Account» per scaricare o eliminare, e dice che le lavagne restano nel browser', () => {
    const { dialog, help } = dataHelp('studente@example.com')
    expect(help.textContent).toContain('nel tuo account (studente@example.com)')
    expect(help.textContent).toContain('Per scaricare tutti i dati dell\'account o eliminarlo, vai in Account.')
    expect(help.textContent).toContain('le lavagne solo in questo browser')
    help.querySelector<HTMLButtonElement>('button.link-button')!.click()
    const panel = dialog.querySelector<HTMLElement>('#settings-panel-account')!
    const buttons = [...panel.querySelectorAll('button')].map((b) => b.textContent)
    expect(buttons).toContain('Scarica i miei dati')
    expect(buttons).toContain('Elimina account…')
  })

  it('l\'informativa manda a «Scarica i miei dati» dal pulsante in fondo alla barra laterale', () => {
    const text = privacy.replace(/\s+/g, ' ')
    expect(text).toContain('apri l\'account (il pulsante in fondo alla barra laterale) e premi «Scarica i miei dati»')
    expect(text).not.toContain('il pulsante in alto')
  })
})
