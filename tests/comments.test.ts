// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SUPABASE_KEY, SUPABASE_URL } from '../src/account/config'
import { commentDate, COMMENTS_MAX, CommentsError, commentsOffInClaude, commentsView, loadComments, PUBLIC_COLUMNS, type PublicComment } from '../src/ui/comments'
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

describe('i commenti nella pagina «Domande frequenti e commenti»', () => {
  const list = [
    comment({ author: 'Anna', message: 'L\'editor delle tabelle non si apre', reply: 'Sistemato, grazie!' }),
    comment({ message: 'La lavagna\nsi chiude', created_at: new Date(2026, 9, 7, 9, 5).toISOString() }),
    comment({ kind: 'idea', author: 'Bruno', message: 'I grafici 3D anche nelle tabelle' }),
  ]
  const feedback = { site: 'online' as const, version: 'd2f8055' }
  /** La vista nella pagina (faqPage.ts la mette nella sezione dei commenti). */
  const mount = (deps: Parameters<typeof commentsView>[0]) => {
    const view = commentsView(deps)
    document.body.append(view)
    return view
  }
  const choose = (view: HTMLElement, kind: FeedbackKind) => {
    const input = view.querySelector<HTMLInputElement>(`input[name="comments-tab"][value="${kind}"]`)!
    input.checked = true
    input.dispatchEvent(new Event('change'))
  }
  const tabs = (view: HTMLElement) => [...view.querySelectorAll('.comments-tabs label')].map((l) => l.textContent)
  const state = (view: HTMLElement) => view.querySelector('.comments-state')?.textContent ?? null
  const loaded = (view: HTMLElement) => vi.waitFor(() => expect(tabs(view)[0]).toMatch(/\d$/))
  const writeDialog = () => [...document.querySelectorAll('dialog')].at(-1)!

  it('divide i commenti in problemi, idee e altro, con il nome, la data e la risposta', async () => {
    const view = mount({ feedback, load: async () => list, now: () => now })
    expect(view.querySelector('.comments-intro')?.textContent).toBe('Problemi, idee e altro da chi prova Glifo: guarda se qualcuno l\'ha già scritto, se no scrivilo tu.')
    expect(state(view)).toBe('Carico i commenti…')
    await loaded(view)
    expect(tabs(view)).toEqual(['Problemi2', 'Idee1', 'Altro0'])
    choose(view, 'problema')
    const [first, second] = view.querySelectorAll('.comment')
    expect(first.querySelector('.comment-author')?.textContent).toBe('Anna')
    expect(first.querySelector('time')?.textContent).toBe('oggi alle 17:29')
    expect(first.querySelector('.comment-text')?.textContent).toBe('L\'editor delle tabelle non si apre')
    expect(first.querySelector('.comment-reply')?.textContent).toBe('Risposta di chi fa GlifoSistemato, grazie!')
    expect(second.querySelector('.comment-author.is-anonymous')?.textContent).toBe('Anonimo')
    expect(second.querySelector('time')?.textContent).toBe('ieri alle 9:05')
    expect(second.querySelector('.comment-text')?.textContent).toBe('La lavagna\nsi chiude')
    expect(second.querySelector('.comment-reply')).toBeNull()
    choose(view, 'idea')
    expect([...view.querySelectorAll('.comment-author')].map((a) => a.textContent)).toEqual(['Bruno'])
    choose(view, 'altro')
    expect(view.querySelector('.comment')).toBeNull()
    expect(state(view)).toBe('Ancora niente, qui. Se hai qualcosa da dire, scrivilo tu.')
    // La scheda resta quella dell'ultima volta, finché la pagina è aperta.
    const again = mount({ feedback, load: async () => list, now: () => now })
    expect(again.querySelector<HTMLInputElement>('input[value="altro"]')!.checked).toBe(true)
  })

  it('quello che scrivono resta testo: niente HTML', async () => {
    const load = async () => [comment({ author: '<b>Anna</b>', message: '<img src=x onerror="alert(1)">', reply: '<script>x</script>' })]
    const view = mount({ feedback, load, now: () => now })
    choose(view, 'problema')
    await vi.waitFor(() => expect(view.querySelector('.comment')).not.toBeNull())
    expect(view.querySelector('.comment b, .comment img, .comment script')).toBeNull()
    expect(view.querySelector('.comment-author')?.textContent).toBe('<b>Anna</b>')
    expect(view.querySelector('.comment-text')?.textContent).toBe('<img src=x onerror="alert(1)">')
  })

  it('senza rete lo dice e «Riprova» li carica', async () => {
    const load = vi
      .fn<() => Promise<PublicComment[]>>()
      .mockRejectedValueOnce(new CommentsError('Senza connessione i commenti non si vedono: riprova quando sei di nuovo in rete.'))
      .mockResolvedValueOnce(list)
    const view = mount({ feedback, load, now: () => now })
    await vi.waitFor(() => expect(state(view)).toContain('Senza connessione'))
    expect(tabs(view)).toEqual(['Problemi', 'Idee', 'Altro'])
    const retry = [...view.querySelectorAll<HTMLButtonElement>('.comments-body button')].find((b) => b.textContent === 'Riprova')!
    retry.click()
    await loaded(view)
    expect(load).toHaveBeenCalledTimes(2)
    expect(view.querySelector('.comments-body button')).toBeNull()
  })

  it('«Scrivi un commento» parte dalla scheda aperta, senza il link alla pagina; mandato a tutti, l\'elenco si aggiorna', async () => {
    const load = vi.fn(async () => list)
    const send = vi.fn(async (_row: FeedbackRow) => {})
    const view = mount({ feedback: { ...feedback, send }, load, now: () => now })
    await loaded(view)
    choose(view, 'idea')
    view.querySelector<HTMLButtonElement>('.comments-write')!.click()
    const write = writeDialog()
    expect(write.querySelector('h2')?.textContent).toBe('Scrivi un commento')
    expect(write.querySelector<HTMLInputElement>('input[value="idea"]')!.checked).toBe(true)
    // Nella pagina le domande frequenti ci sono già: il link in cima è solo dal fumetto di Glifo.
    expect(write.querySelector('.feedback-faq')).toBeNull()
    const text = write.querySelector('textarea')!
    text.value = 'Le formule anche nei titoli'
    text.dispatchEvent(new Event('input'))
    write.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }))
    await vi.waitFor(() => expect(load).toHaveBeenCalledTimes(2))
    expect(send.mock.calls[0][0]).toMatchObject({ kind: 'idea', message: 'Le formule anche nei titoli', visible: true, site: 'online' })
    expect(write.open).toBe(false)
    expect(view.querySelector<HTMLInputElement>('input[value="idea"]')!.checked).toBe(true)
  })

  it('un commento solo per chi fa Glifo non ricarica l\'elenco', async () => {
    const load = vi.fn(async () => list)
    const send = vi.fn(async (_row: FeedbackRow) => {})
    const view = mount({ feedback: { ...feedback, send }, load, now: () => now })
    await loaded(view)
    view.querySelector<HTMLButtonElement>('.comments-write')!.click()
    const write = writeDialog()
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
  })

  it('dal sito di prova il commento parte privato e l\'elenco non si ricarica', async () => {
    const load = vi.fn(async () => list)
    const send = vi.fn(async (_row: FeedbackRow) => {})
    const view = mount({ feedback: { site: 'prova', version: 'd2f8055', send }, load, now: () => now })
    await loaded(view)
    view.querySelector<HTMLButtonElement>('.comments-write')!.click()
    const write = writeDialog()
    const text = write.querySelector('textarea')!
    text.value = 'Una prova'
    text.dispatchEvent(new Event('input'))
    write.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }))
    await vi.waitFor(() => expect(write.open).toBe(false))
    expect(send.mock.calls[0][0]).toMatchObject({ message: 'Una prova', visible: false, site: 'prova' })
    expect(load).toHaveBeenCalledOnce()
  })

  it('dentro claude.ai non carica niente e lo dice', () => {
    const load = vi.fn(async () => list)
    const view = mount({
      off: commentsOffInClaude(),
      feedback: { site: 'claude', version: 'locale', off: 'Dentro claude.ai i messaggi non partono: mandalo dal sito di Glifo.' },
      load,
    })
    expect(load).not.toHaveBeenCalled()
    expect(state(view)).toBe('Dentro claude.ai i commenti non si vedono: aprili dal sito di Glifo.')
    expect(view.querySelector('.comments-body button')).toBeNull()
    view.querySelector<HTMLButtonElement>('.comments-write')!.click()
    expect(writeDialog().querySelector('.feedback-off')?.textContent).toContain('claude.ai')
  })
})
