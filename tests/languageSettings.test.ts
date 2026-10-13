// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { setLangForTests, type Lang } from '../src/i18n'
import { DEFAULT_SETTINGS } from '../src/store/settings'
import { openSettingsDialog } from '../src/ui/settings'

// jsdom non ha showModal.
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute('open', '')
}
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute('open')
  this.dispatchEvent(new Event('close'))
}

afterEach(() => {
  document.body.replaceChildren()
  setLangForTests('it')
})

function open(): { chosen: Lang[]; section: HTMLElement } {
  const chosen: Lang[] = []
  openSettingsDialog({
    settings: { ...DEFAULT_SETTINGS },
    onChange: () => {},
    onLanguageChange: (next) => chosen.push(next),
    personalWords: [],
    onPersonalWordsChange: (words) => words,
    onBackup: () => {},
    onRestore: () => {},
  })
  return { chosen, section: document.querySelector<HTMLElement>('dialog.dialog-settings fieldset')! }
}

describe('la lingua nelle impostazioni', () => {
  it('è il primo riquadro, con i nomi delle lingue nella loro lingua e quella di adesso scelta', () => {
    const { section } = open()
    expect(section.classList.contains('language-settings')).toBe(true)
    expect(section.querySelector('legend')?.textContent).toBe('Lingua')
    const labels = [...section.querySelectorAll('label')]
    expect(labels.map((l) => [l.lang, l.textContent])).toEqual([
      ['it', 'Italiano'],
      ['en', 'English'],
    ])
    expect(section.querySelector<HTMLInputElement>('input[value="it"]')?.checked).toBe(true)
    expect(section.querySelector('.field-help')?.textContent).toContain('controllo ortografico')
  })

  it('scegliendo l\'altra lingua la finestra lo dice a chi la apre (che ricarica la pagina)', () => {
    const { chosen, section } = open()
    const english = section.querySelector<HTMLInputElement>('input[value="en"]')!
    english.checked = true
    english.dispatchEvent(new Event('change'))
    expect(chosen).toEqual(['en'])
  })

  it('in inglese la finestra parla inglese, e la lingua scelta è l\'inglese', () => {
    setLangForTests('en')
    const { section } = open()
    expect(section.querySelector('legend')?.textContent).toBe('Language')
    expect(section.querySelector<HTMLInputElement>('input[value="en"]')?.checked).toBe(true)
    expect(section.querySelector('.field-help')?.textContent).toContain('spell checker')
  })
})
