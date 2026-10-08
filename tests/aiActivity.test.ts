// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { AI_NEWS_TITLE, AI_WORKING_TITLE, aiActivity } from '../src/ui/aiActivity'

function button(): HTMLButtonElement {
  const b = document.createElement('button')
  b.title = 'Spiega con l\'AI: scegli nella nota cosa farti spiegare'
  b.setAttribute('aria-label', 'Spiega con l\'AI')
  return b
}

describe('il pulsante ✨ mentre l\'AI lavora', () => {
  it('sfuma i colori finché lavora, e lo dice', () => {
    const b = button()
    const activity = aiActivity(b, () => true)
    const end = activity.start()
    expect(b.classList.contains('is-working')).toBe(true)
    expect(b.title).toBe(AI_WORKING_TITLE)
    expect(b.getAttribute('aria-label')).toBe('Spiega con l\'AI, sta lavorando')
    end()
    expect(b.classList.contains('is-working')).toBe(false)
    expect(b.title).toBe('Spiega con l\'AI: scegli nella nota cosa farti spiegare')
    expect(b.getAttribute('aria-label')).toBe('Spiega con l\'AI')
  })

  it('con il pannello AI aperto, finito non lascia il pallino', () => {
    const b = button()
    const activity = aiActivity(b, () => true)
    activity.start()()
    expect(activity.news).toBe(false)
    expect(b.classList.contains('has-news')).toBe(false)
  })

  it('finito a pannello chiuso lascia il pallino, che se ne va riaprendo il pannello', () => {
    const b = button()
    let open = true
    const activity = aiActivity(b, () => open)
    const end = activity.start()
    open = false
    end()
    expect(b.classList.contains('has-news')).toBe(true)
    expect(b.classList.contains('is-working')).toBe(false)
    expect(b.title).toBe(AI_NEWS_TITLE)
    expect(b.getAttribute('aria-label')).toBe('Spiega con l\'AI, ha finito')
    open = true
    activity.seen()
    expect(b.classList.contains('has-news')).toBe(false)
    expect(b.getAttribute('aria-label')).toBe('Spiega con l\'AI')
  })

  it('fermato, o lasciato perché la nota è cambiata, non lascia il pallino', () => {
    const b = button()
    const activity = aiActivity(b, () => false)
    activity.start()(false)
    expect(activity.news).toBe(false)
    expect(b.classList.contains('has-news')).toBe(false)
  })

  it('con più lavori insieme sfuma finché non finisce l\'ultimo; finire due volte conta una', () => {
    const b = button()
    const activity = aiActivity(b, () => false)
    const first = activity.start()
    const second = activity.start()
    first()
    first()
    expect(activity.working).toBe(true)
    expect(b.classList.contains('is-working')).toBe(true)
    second()
    expect(activity.working).toBe(false)
    expect(b.classList.contains('has-news')).toBe(true)
  })
})
