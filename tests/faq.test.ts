// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { faqGroups, faqSection } from '../src/ui/faq'

afterEach(() => {
  document.body.replaceChildren()
  history.replaceState(null, '', '/')
  vi.restoreAllMocks()
})

const questions = () => faqGroups().flatMap((group) => group.questions)
/** L'ultimo messaggio comparso (quelli di prima possono essere ancora lì). */
const lastToast = () => [...document.querySelectorAll('.toast')].at(-1)?.textContent ?? null

describe('le domande frequenti', () => {
  it('sono divise per argomento, ognuna con la risposta e un indirizzo suo', () => {
    expect(faqGroups().map((group) => group.title)).toEqual(['Gli appunti', 'Usare Glifo', 'L\'AI', 'L\'account'])
    const ids = questions().map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const q of questions()) {
      // Un pezzo d'indirizzo che si scrive e si legge: faq.html#offline.
      expect(q.id).toMatch(/^[a-z]+(-[a-z]+)*$/)
      expect(q.question).toMatch(/\?$/)
      expect(q.answer.length).toBeGreaterThan(0)
      expect(q.answer.map((part) => part.textContent).join(' ').length).toBeGreaterThan(60)
    }
    expect(ids).toContain('offline')
    // «commenti» è dei commenti, più sotto nella pagina.
    expect(ids).not.toContain('commenti')
  })

  it('i collegamenti tra le domande portano a domande che ci sono', () => {
    const ids = new Set(questions().map((q) => q.id))
    const links = questions().flatMap((q) => q.answer.flatMap((part) => [...part.querySelectorAll('a')]))
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) expect(ids.has(link.getAttribute('href')!.replace(/^#/, ''))).toBe(true)
  })

  it('«Glifo è gratis?» non c\'è finché non si decidono i piani (ABBONAMENTI.md)', () => {
    expect(questions().map((q) => q.question).join('\n')).not.toMatch(/gratis|costa|prezz/i)
  })
})

describe('la sezione della pagina', () => {
  const mount = () => {
    const section = faqSection({ commentsId: 'commenti' })
    document.body.append(section.element)
    return section
  }

  it('ogni domanda è chiusa, con la risposta che si apre con un clic', () => {
    const { element } = mount()
    expect(element.querySelector('h2')?.textContent).toBe('Domande frequenti')
    expect(element.querySelector('.faq-intro a')?.getAttribute('href')).toBe('#commenti')
    const items = [...element.querySelectorAll<HTMLDetailsElement>('details.faq-item')]
    expect(items.map((item) => item.id)).toEqual(questions().map((q) => q.id))
    expect(items.every((item) => !item.open)).toBe(true)
    expect(items[0].querySelector('summary')?.textContent).toBe('Dove sono salvati i miei appunti?')
    expect(element.querySelectorAll('.faq-group h3')).toHaveLength(4)
  })

  it('l\'indirizzo con una domanda la apre e la segna; un altro indirizzo no', () => {
    const section = mount()
    const scroll = vi.fn()
    Element.prototype.scrollIntoView = scroll
    expect(section.openFromHash('#offline')).toBe(true)
    const item = section.element.querySelector<HTMLDetailsElement>('#offline')!
    expect(item.open).toBe(true)
    expect(item.classList.contains('is-target')).toBe(true)
    expect(scroll).toHaveBeenCalledOnce()
    expect(section.openFromHash('#cestino')).toBe(true)
    expect(item.classList.contains('is-target')).toBe(false)
    expect(section.openFromHash('#commenti')).toBe(false)
    expect(section.openFromHash('')).toBe(false)
    expect(section.openFromHash('#%E0%A4%A')).toBe(false)
  })

  it('aprendo una domanda, il suo indirizzo va nella barra (per copiarlo)', async () => {
    history.replaceState(null, '', '/faq.html')
    const { element } = mount()
    element.querySelector<HTMLDetailsElement>('#perderli')!.open = true
    await vi.waitFor(() => expect(location.hash).toBe('#perderli'))
  })

  it('«Copia il link» copia l\'indirizzo della domanda', async () => {
    history.replaceState(null, '', '/faq.html')
    const writeText = vi.fn(async (_text: string) => {})
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    const { element } = mount()
    const copy = element.querySelector<HTMLButtonElement>('#offline .faq-copy')!
    expect(copy.getAttribute('aria-label')).toBe('Copia il link alla domanda «Glifo funziona senza internet?»')
    copy.click()
    await vi.waitFor(() => expect(writeText).toHaveBeenCalledWith(`${location.origin}/faq.html#offline`))
    await vi.waitFor(() => expect(lastToast()).toContain('Link copiato'))
  })

  it('se il browser non lascia copiare, l\'indirizzo resta nella barra e lo dice', async () => {
    history.replaceState(null, '', '/faq.html')
    const writeText = vi.fn(async (_text: string) => {
      throw new Error('negato')
    })
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    const { element } = mount()
    element.querySelector<HTMLButtonElement>('#latex .faq-copy')!.click()
    await vi.waitFor(() => expect(lastToast()).toContain('copialo dalla barra degli indirizzi'))
    expect(location.hash).toBe('#latex')
  })
})
