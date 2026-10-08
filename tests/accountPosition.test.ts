// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import privacy from '../privacy.html?raw'
import { openSettingsDialog } from '../src/ui/dialogs'
import { DEFAULT_SETTINGS } from '../src/store/settings'

// jsdom non ha le finestre modali.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.open = true
}

afterEach(() => document.body.replaceChildren())

/** Il testo della sezione «I tuoi dati» delle impostazioni, senza account o con l'email data. */
function dataHelp(accountEmail?: string): string {
  openSettingsDialog({
    settings: { ...DEFAULT_SETTINGS },
    onChange: () => {},
    personalWords: [],
    onPersonalWordsChange: (words) => words,
    onBackup: () => {},
    onRestore: () => {},
    ...(accountEmail ? { accountEmail } : {}),
  })
  const section = [...document.querySelectorAll('dialog.dialog-settings fieldset')].find(
    (fieldset) => fieldset.querySelector('legend')?.textContent === 'I tuoi dati',
  )!
  return section.querySelector('p.field-help')!.textContent!
}

// Il pulsante dell'account sta in fondo alla barra laterale: in alto non c'è una barra.
describe('dove si apre l\'account', () => {
  it('le impostazioni senza account mandano ad «Accedi», in fondo alla barra laterale', () => {
    const text = dataHelp()
    expect(text).toContain('«Accedi», in fondo alla barra laterale')
    expect(text).not.toContain('in alto')
  })

  it('le impostazioni con l\'account mandano al pulsante in fondo e dicono che le lavagne restano nel browser', () => {
    const text = dataHelp('studente@example.com')
    expect(text).toContain('apri l\'account dal pulsante in fondo alla barra laterale')
    expect(text).toContain('le lavagne solo in questo browser')
    expect(text).not.toContain('in alto')
  })

  it('l\'informativa manda a «Scarica i miei dati» dal pulsante in fondo alla barra laterale', () => {
    const text = privacy.replace(/\s+/g, ' ')
    expect(text).toContain('apri l\'account (il pulsante in fondo alla barra laterale) e premi «Scarica i miei dati»')
    expect(text).not.toContain('il pulsante in alto')
  })
})
