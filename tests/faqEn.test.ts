// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { setLangForTests } from '../src/i18n'
import { faqGroups, faqSection } from '../src/ui/faq'

beforeEach(() => setLangForTests('en'))
afterEach(() => {
  setLangForTests('it')
  document.body.replaceChildren()
})

const text = (lang: 'it' | 'en') => {
  setLangForTests(lang)
  const groups = faqGroups()
  setLangForTests('en')
  return groups
}

describe('le domande frequenti in inglese', () => {
  it('sono le stesse, nello stesso ordine e con gli stessi indirizzi', () => {
    const it = text('it')
    const en = text('en')
    expect(en.map((g) => g.questions.length)).toEqual(it.map((g) => g.questions.length))
    expect(en.flatMap((g) => g.questions.map((q) => q.id))).toEqual(it.flatMap((g) => g.questions.map((q) => q.id)))
    // Anche i collegamenti tra le domande, uno per uno.
    const links = (groups: typeof it) => groups.flatMap((g) => g.questions.flatMap((q) => q.answer.flatMap((p) => [...p.querySelectorAll('a')].map((a) => a.getAttribute('href')))))
    expect(links(en)).toEqual(links(it))
  })

  it('sono scritte in inglese, con i nomi dei pulsanti di Glifo in inglese', () => {
    const groups = faqGroups()
    expect(groups.map((g) => g.title)).toEqual(['Your notes', 'Using Glifo', 'AI', 'Your account'])
    const all = groups.flatMap((g) => g.questions.map((q) => `${q.question}\n${q.answer.map((p) => p.textContent).join('\n')}`)).join('\n')
    expect(all).not.toMatch(/[àèìòù«»]/)
    for (const label of ['“Download backup”', '“Restore backup”', '“Save .md”', 'Settings → Data', '“Update link”', '“Remove link”', '“Allow copies”', '“Print or PDF”', '“Delete account…”', '“Download my data”', '“Sign out”', '“Bring my notes to the new Glifo”', '“Explain”', '“Ask AI”', '“Symbols”', '“How to use”']) {
      expect(all).toContain(label)
    }
  })

  it('la sezione della pagina è in inglese', () => {
    const { element } = faqSection({ commentsId: 'commenti' })
    document.body.append(element)
    expect(element.querySelector('h2')?.textContent).toBe('Frequently asked questions')
    expect(element.querySelector('.faq-intro')?.textContent).toBe('Answers to the questions we get most often. If yours isn\'t here, ask it in the comments below.')
    expect(element.querySelector('#offline summary')?.textContent).toBe('Does Glifo work without internet?')
    expect(element.querySelector('#offline .faq-copy')?.textContent).toBe('Copy link')
  })
})
