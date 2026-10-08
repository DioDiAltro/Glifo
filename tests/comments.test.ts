// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SUPABASE_KEY, SUPABASE_URL } from '../src/account/config'
import { commentDate, COMMENTS_MAX, CommentsError, loadComments, openCommentsDialog, PUBLIC_COLUMNS, type PublicComment } from '../src/ui/comments'
import type { FeedbackKind, FeedbackRow } from '../src/ui/feedback'

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
  vi.restoreAllMocks()
})

const now = new Date(2026, 9, 8, 18, 0)
let id = 0
const comment = (over: Partial<PublicComment>): PublicComment => ({
  id: `c${++id}`,
  created_at: new Date(2026, 9, 8, 17, 29).toISOString(),
  kind: 'problema',
  author: null,
  message: 'Ciao',
  reply: null,
  ...over,
})

describe('la lettura dei commenti', () => {
  it('chiede solo le colonne pubbliche, i più recenti, con la sola chiave pubblica', async () => {
    const rows = [comment({ message: 'L\'editor non si apre' }), comment({ kind: 'idea', author: 'Anna', reply: 'Fatto' })]
    const fetchMock = vi.fn(async () => new Response(JSON.stringify(rows), { status: 200 }))
    expect(await loadComments(fetchMock)).toEqual(rows)
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe(`${SUPABASE_URL}/rest/v1/feedback?select=id,created_at,kind,author,message,reply&order=created_at.desc&limit=${COMMENTS_MAX}`)
    expect(init.method ?? 'GET').toBe('GET')
    expect(init.headers).toEqual({ apikey: SUPABASE_KEY })
    expect(PUBLIC_COLUMNS).not.toMatch(/email|site|version|browser|visible/)
  })

  it('lascia fuori le righe che non sono commenti', async () => {
    const good = comment({})
    const rows = [good, { ...comment({}), kind: 'lamentela' }, { ...comment({}), message: 3 }, { ...comment({}), id: undefined }, null, 'testo']
    expect(await loadComments(async () => new Response(JSON.stringify(rows)))).toEqual([good])
  })

  it('senza rete o con un errore lo dice', async () => {
    const failing = async () => {
      throw new TypeError('Failed to fetch')
    }
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
    await expect(loadComments(failing)).rejects.toThrow(new CommentsError('Senza connessione i commenti non si vedono: riprova quando sei di nuovo in rete.'))
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true)
    await expect(loadComments(failing)).rejects.toThrow('Non riesco a caricare i commenti: controlla la connessione e riprova.')
    await expect(loadComments(async () => new Response('', { status: 503 }))).rejects.toThrow('Non riesco a caricare i commenti: riprova tra poco.')
    await expect(loadComments(async () => new Response('{"message":"no"}'))).rejects.toThrow(CommentsError)
  })
})

describe('la data dei commenti', () => {
  it('oggi e ieri con l\'ora, poi il giorno; l\'anno solo se è un altro', () => {
    expect(commentDate(new Date(2026, 9, 8, 17, 29).toISOString(), now)).toBe('oggi alle 17:29')
    expect(commentDate(new Date(2026, 9, 7, 9, 5).toISOString(), now)).toBe('ieri alle 9:05')
    expect(commentDate(new Date(2026, 8, 30, 12).toISOString(), now)).toBe('30 settembre')
    expect(commentDate(new Date(2025, 11, 31, 23).toISOString(), now)).toBe('31 dicembre 2025')
    expect(commentDate('non è una data', now)).toBe('')
  })
})

describe('la pagina «Commenti»', () => {
  const list = [
    comment({ author: 'Anna', message: 'L\'editor delle tabelle non si apre', reply: 'Sistemato, grazie!' }),
    comment({ message: 'La lavagna\nsi chiude', created_at: new Date(2026, 9, 7, 9, 5).toISOString() }),
    comment({ kind: 'idea', author: 'Bruno', message: 'I grafici 3D anche nelle tabelle' }),
  ]
  const feedback = { site: 'prova' as const, version: 'd2f8055' }
  const choose = (dialog: HTMLDialogElement, kind: FeedbackKind) => {
    const input = dialog.querySelector<HTMLInputElement>(`input[name="comments-tab"][value="${kind}"]`)!
    input.checked = true
    input.dispatchEvent(new Event('change'))
  }
  const tabs = (dialog: HTMLDialogElement) => [...dialog.querySelectorAll('.comments-tabs label')].map((l) => l.textContent)
  const state = (dialog: HTMLDialogElement) => dialog.querySelector('.comments-state')?.textContent ?? null
  const loaded = (dialog: HTMLDialogElement) => vi.waitFor(() => expect(tabs(dialog)[0]).toMatch(/\d$/))

  it('divide i commenti in problemi, idee e altro, con il nome, la data e la risposta', async () => {
    const dialog = openCommentsDialog({ feedback, load: async () => list, now: () => now })
    expect(dialog.querySelector('h2')?.textContent).toBe('Commenti')
    expect(state(dialog)).toBe('Carico i commenti…')
    await loaded(dialog)
    expect(tabs(dialog)).toEqual(['Problemi2', 'Idee1', 'Altro0'])
    choose(dialog, 'problema')
    const [first, second] = dialog.querySelectorAll('.comment')
    expect(first.querySelector('.comment-author')?.textContent).toBe('Anna')
    expect(first.querySelector('time')?.textContent).toBe('oggi alle 17:29')
    expect(first.querySelector('.comment-text')?.textContent).toBe('L\'editor delle tabelle non si apre')
    expect(first.querySelector('.comment-reply')?.textContent).toBe('Risposta di chi fa GlifoSistemato, grazie!')
    expect(second.querySelector('.comment-author.is-anonymous')?.textContent).toBe('Anonimo')
    expect(second.querySelector('time')?.textContent).toBe('ieri alle 9:05')
    expect(second.querySelector('.comment-text')?.textContent).toBe('La lavagna\nsi chiude')
    expect(second.querySelector('.comment-reply')).toBeNull()
    choose(dialog, 'idea')
    expect([...dialog.querySelectorAll('.comment-author')].map((a) => a.textContent)).toEqual(['Bruno'])
    choose(dialog, 'altro')
    expect(dialog.querySelector('.comment')).toBeNull()
    expect(state(dialog)).toBe('Ancora niente, qui. Se hai qualcosa da dire, scrivilo tu.')
    dialog.close()
    // La scheda resta quella dell'ultima volta.
    const again = openCommentsDialog({ feedback, load: async () => list, now: () => now })
    expect(again.querySelector<HTMLInputElement>('input[value="altro"]')!.checked).toBe(true)
    again.close()
  })

  it('quello che scrivono resta testo: niente HTML', async () => {
    const load = async () => [comment({ author: '<b>Anna</b>', message: '<img src=x onerror="alert(1)">', reply: '<script>x</script>' })]
    const dialog = openCommentsDialog({ feedback, load, now: () => now })
    choose(dialog, 'problema')
    await vi.waitFor(() => expect(dialog.querySelector('.comment')).not.toBeNull())
    expect(dialog.querySelector('.comment b, .comment img, .comment script')).toBeNull()
    expect(dialog.querySelector('.comment-author')?.textContent).toBe('<b>Anna</b>')
    expect(dialog.querySelector('.comment-text')?.textContent).toBe('<img src=x onerror="alert(1)">')
    dialog.close()
  })

  it('senza rete lo dice e «Riprova» li carica', async () => {
    const load = vi
      .fn<() => Promise<PublicComment[]>>()
      .mockRejectedValueOnce(new CommentsError('Senza connessione i commenti non si vedono: riprova quando sei di nuovo in rete.'))
      .mockResolvedValueOnce(list)
    const dialog = openCommentsDialog({ feedback, load, now: () => now })
    await vi.waitFor(() => expect(state(dialog)).toContain('Senza connessione'))
    expect(tabs(dialog)).toEqual(['Problemi', 'Idee', 'Altro'])
    const retry = [...dialog.querySelectorAll<HTMLButtonElement>('.comments-body button')].find((b) => b.textContent === 'Riprova')!
    retry.click()
    await loaded(dialog)
    expect(load).toHaveBeenCalledTimes(2)
    expect(dialog.querySelector('.comments-body button')).toBeNull()
    dialog.close()
  })

  it('«Scrivi un commento» parte dalla scheda aperta; mandato a tutti, la pagina si aggiorna', async () => {
    const load = vi.fn(async () => list)
    const send = vi.fn(async (_row: FeedbackRow) => {})
    const dialog = openCommentsDialog({ feedback: { ...feedback, send }, load, now: () => now })
    await loaded(dialog)
    choose(dialog, 'idea')
    dialog.querySelector<HTMLButtonElement>('.comments-write')!.click()
    const write = [...document.querySelectorAll('dialog')].at(-1)!
    expect(write).not.toBe(dialog)
    expect(write.querySelector('h2')?.textContent).toBe('Scrivi un commento')
    expect(write.querySelector<HTMLInputElement>('input[value="idea"]')!.checked).toBe(true)
    const text = write.querySelector('textarea')!
    text.value = 'Le formule anche nei titoli'
    text.dispatchEvent(new Event('input'))
    write.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }))
    await vi.waitFor(() => expect(load).toHaveBeenCalledTimes(2))
    expect(send.mock.calls[0][0]).toMatchObject({ kind: 'idea', message: 'Le formule anche nei titoli', visible: true })
    expect(write.open).toBe(false)
    expect(dialog.open).toBe(true)
    expect(dialog.querySelector<HTMLInputElement>('input[value="idea"]')!.checked).toBe(true)
    dialog.close()
  })

  it('un commento solo per chi fa Glifo non ricarica la pagina', async () => {
    const load = vi.fn(async () => list)
    const send = vi.fn(async (_row: FeedbackRow) => {})
    const dialog = openCommentsDialog({ feedback: { ...feedback, send }, load, now: () => now })
    await loaded(dialog)
    dialog.querySelector<HTMLButtonElement>('.comments-write')!.click()
    const write = [...document.querySelectorAll('dialog')].at(-1)!
    const text = write.querySelector('textarea')!
    text.value = 'Solo per te'
    text.dispatchEvent(new Event('input'))
    const visible = write.querySelector<HTMLInputElement>('.feedback-visible input')!
    visible.checked = false
    visible.dispatchEvent(new Event('change'))
    write.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }))
    await vi.waitFor(() => expect(write.open).toBe(false))
    expect(send.mock.calls[0][0]).toMatchObject({ message: 'Solo per te', visible: false })
    expect(load).toHaveBeenCalledOnce()
    dialog.close()
  })

  it('dentro claude.ai non carica niente e lo dice', () => {
    const load = vi.fn(async () => list)
    const dialog = openCommentsDialog({
      off: 'Dentro claude.ai i commenti non si vedono: aprili dal sito di Glifo.',
      feedback: { site: 'claude', version: 'locale', off: 'Dentro claude.ai i messaggi non partono: mandalo dal sito di Glifo.' },
      load,
    })
    expect(load).not.toHaveBeenCalled()
    expect(state(dialog)).toBe('Dentro claude.ai i commenti non si vedono: aprili dal sito di Glifo.')
    expect(dialog.querySelector('.comments-body button')).toBeNull()
    dialog.querySelector<HTMLButtonElement>('.comments-write')!.click()
    const write = [...document.querySelectorAll('dialog')].at(-1)!
    expect(write.querySelector('.feedback-off')?.textContent).toContain('claude.ai')
    dialog.close()
  })
})
