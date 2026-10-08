// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SUPABASE_KEY, SUPABASE_URL } from '../src/account/config'
import { AUTHOR_MAX, feedbackRow, FeedbackError, MESSAGE_MAX, openFeedbackDialog, sendFeedback, type FeedbackRow } from '../src/ui/feedback'

// jsdom non ha le finestre modali.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.open = true
}
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  this.open = false
  this.dispatchEvent(new Event('close'))
}

afterEach(() => document.body.replaceChildren())

const info = { site: 'online' as const, version: 'd2f8055, 2026-10-08 10:39', browser: 'Mozilla/5.0 · finestra 1440×900' }
const row: FeedbackRow = { kind: 'problema', message: 'L\'editor non si apre', author: null, email: null, visible: true, ...info }
const input = { kind: 'altro' as const, message: 'Ciao', author: '', email: '', visible: true }

describe('il commento da mandare', () => {
  it('toglie gli spazi intorno e lascia nome ed email facoltativi', () => {
    expect(feedbackRow({ kind: 'idea', message: '  Le tabelle anche in 3D \n', author: '  ', email: '  ', visible: true }, info)).toEqual({
      kind: 'idea',
      message: 'Le tabelle anche in 3D',
      author: null,
      email: null,
      visible: true,
      ...info,
    })
    expect(feedbackRow({ ...input, message: 'Bello', author: ' Anna ', email: ' anna@esempio.it ', visible: false }, info)).toMatchObject({
      author: 'Anna',
      email: 'anna@esempio.it',
      visible: false,
    })
  })

  it('il nome sta su una riga, come vuole il database', () => {
    expect(feedbackRow({ ...input, author: ' Anna\tMaria\n Rossi ' }, info)).toMatchObject({ author: 'Anna Maria Rossi' })
    expect(feedbackRow({ ...input, author: 'n'.repeat(AUTHOR_MAX) }, info)).toMatchObject({ author: 'n'.repeat(AUTHOR_MAX) })
    expect(feedbackRow({ ...input, author: 'n'.repeat(AUTHOR_MAX + 1) }, info)).toEqual({ problem: `Il nome è troppo lungo: al massimo ${AUTHOR_MAX} caratteri.`, field: 'author' })
  })

  it('dice cosa non va e in quale campo', () => {
    expect(feedbackRow({ ...input, message: ' \n ' }, info)).toEqual({ problem: 'Scrivi qualcosa prima di mandarlo.', field: 'message' })
    expect(feedbackRow({ ...input, message: 'x'.repeat(MESSAGE_MAX + 1) }, info)).toMatchObject({ field: 'message' })
    expect(feedbackRow({ ...input, email: 'anna@esempio' }, info)).toMatchObject({ field: 'email' })
    expect(feedbackRow({ ...input, email: 'anna esempio.it' }, info)).toMatchObject({ field: 'email' })
  })

  it('versione e browser non superano i limiti del database', () => {
    const long = feedbackRow(input, { site: 'prova', version: 'v'.repeat(80), browser: 'b'.repeat(600) }) as FeedbackRow
    expect(long.version).toHaveLength(64)
    expect(long.browser).toHaveLength(512)
  })
})

describe('l\'invio a Supabase', () => {
  it('scrive nella tabella feedback con la sola chiave pubblica', async () => {
    const fetchMock = vi.fn(async () => new Response(null, { status: 201 }))
    await sendFeedback(row, fetchMock)
    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe(`${SUPABASE_URL}/rest/v1/feedback`)
    expect(init.method).toBe('POST')
    expect(init.headers).toEqual({ apikey: SUPABASE_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' })
    expect(JSON.parse(init.body as string)).toEqual(row)
  })

  it('senza rete, con troppi messaggi o con un errore lo dice', async () => {
    const offline = sendFeedback(row, async () => {
      throw new TypeError('Failed to fetch')
    })
    await expect(offline).rejects.toThrow(FeedbackError)
    await expect(offline).rejects.toThrow('Senza connessione il messaggio non parte')
    const quota = new Response(JSON.stringify({ code: '54000', message: 'troppi', hint: 'quota' }), { status: 400 })
    await expect(sendFeedback(row, async () => quota)).rejects.toThrow('troppi messaggi in poco tempo')
    await expect(sendFeedback(row, async () => new Response('', { status: 503 }))).rejects.toThrow('Il messaggio non è partito')
  })
})

describe('la finestra «Scrivi un commento»', () => {
  const fill = (dialog: HTMLDialogElement, message: string, email = '', author = '') => {
    const fields: [string, string][] = [
      ['textarea.feedback-message', message],
      ['input[type="email"]', email],
      ['input[autocomplete="nickname"]', author],
    ]
    for (const [selector, value] of fields) {
      const field = dialog.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector)!
      field.value = value
      field.dispatchEvent(new Event('input'))
    }
  }
  const submit = (dialog: HTMLDialogElement) => dialog.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }))
  const error = (dialog: HTMLDialogElement) => {
    const p = dialog.querySelector<HTMLElement>('.prompt-error')!
    return p.hidden ? null : p.textContent
  }
  const visible = (dialog: HTMLDialogElement) => dialog.querySelector<HTMLInputElement>('.feedback-visible input[type="checkbox"]')!

  it('manda il tipo, il testo, il nome, l\'email, se si vede e da dove arriva, poi ringrazia', async () => {
    const send = vi.fn(async () => {})
    const onSent = vi.fn()
    const dialog = openFeedbackDialog({ site: 'prova', version: 'd2f8055', send, onSent })
    expect(dialog.querySelector('h2')?.textContent).toBe('Scrivi un commento')
    expect(visible(dialog).checked).toBe(true)
    submit(dialog)
    expect(error(dialog)).toBe('Scrivi qualcosa prima di mandarlo.')
    expect(send).not.toHaveBeenCalled()
    dialog.querySelector<HTMLInputElement>('input[value="idea"]')!.dispatchEvent(new Event('change'))
    fill(dialog, 'I grafici anche nelle tabelle', 'anna@esempio', 'Anna')
    submit(dialog)
    expect(error(dialog)).toBe('L\'email non sembra giusta: controllala, o lasciala vuota.')
    fill(dialog, 'I grafici anche nelle tabelle', 'anna@esempio.it', 'Anna')
    submit(dialog)
    expect(send).toHaveBeenCalledOnce()
    const sent = (send.mock.calls[0] as unknown as [FeedbackRow])[0]
    expect(sent).toMatchObject({ kind: 'idea', message: 'I grafici anche nelle tabelle', author: 'Anna', email: 'anna@esempio.it', visible: true, site: 'prova', version: 'd2f8055' })
    expect(sent.browser).toMatch(/· finestra \d+×\d+$/)
    expect(dialog.querySelector<HTMLButtonElement>('button[type="submit"]')!.textContent).toBe('Mando…')
    await vi.waitFor(() => expect(dialog.open).toBe(false))
    expect(document.querySelector('.toast')?.textContent).toBe('Grazie! Il messaggio è arrivato.')
    expect(onSent).toHaveBeenCalledWith(sent)
    // Mandato, il testo se ne va; nome ed email restano per il prossimo.
    const next = openFeedbackDialog({ site: 'prova', version: 'd2f8055', send })
    expect(next.querySelector('textarea')!.value).toBe('')
    expect(next.querySelector<HTMLInputElement>('input[value="altro"]')!.checked).toBe(true)
    expect(next.querySelector<HTMLInputElement>('input[autocomplete="nickname"]')!.value).toBe('Anna')
    expect(next.querySelector<HTMLInputElement>('input[type="email"]')!.value).toBe('anna@esempio.it')
    next.close()
  })

  it('un commento solo per chi fa Glifo, senza nome', async () => {
    const send = vi.fn(async () => {})
    const dialog = openFeedbackDialog({ site: 'online', version: 'd2f8055', send })
    fill(dialog, 'Vorrei usarlo a scuola')
    visible(dialog).checked = false
    visible(dialog).dispatchEvent(new Event('change'))
    submit(dialog)
    expect(send.mock.calls[0]).toEqual([expect.objectContaining({ message: 'Vorrei usarlo a scuola', author: null, email: null, visible: false })])
    await vi.waitFor(() => expect(dialog.open).toBe(false))
    // La scelta resta per il prossimo commento.
    const next = openFeedbackDialog({ site: 'online', version: 'd2f8055', send })
    expect(visible(next).checked).toBe(false)
    visible(next).checked = true
    visible(next).dispatchEvent(new Event('change'))
    next.close()
  })

  it('parte dal tipo scelto nella pagina, se non c\'è un testo a metà', () => {
    const first = openFeedbackDialog({ site: 'online', version: 'd2f8055', kind: 'problema' })
    expect(first.querySelector<HTMLInputElement>('input[value="problema"]')!.checked).toBe(true)
    first.querySelector<HTMLInputElement>('input[value="idea"]')!.dispatchEvent(new Event('change'))
    fill(first, 'A metà')
    first.close()
    const again = openFeedbackDialog({ site: 'online', version: 'd2f8055', kind: 'problema' })
    expect(again.querySelector<HTMLInputElement>('input[value="idea"]')!.checked).toBe(true)
    expect(again.querySelector('textarea')!.value).toBe('A metà')
    fill(again, '')
    again.close()
  })

  it('se non parte lo dice e il testo resta, anche chiudendo la finestra', async () => {
    const send = vi.fn(async () => {
      throw new FeedbackError('Senza connessione il messaggio non parte: riprova quando sei di nuovo in rete. Quello che hai scritto resta qui.')
    })
    const onSent = vi.fn()
    const dialog = openFeedbackDialog({ site: 'online', version: 'd2f8055', send, onSent })
    fill(dialog, 'La lavagna si chiude da sola')
    submit(dialog)
    await vi.waitFor(() => expect(error(dialog)).toContain('Senza connessione'))
    expect(dialog.open).toBe(true)
    expect(onSent).not.toHaveBeenCalled()
    expect(dialog.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled).toBe(false)
    dialog.close()
    const again = openFeedbackDialog({ site: 'online', version: 'd2f8055', send })
    expect(again.querySelector('textarea')!.value).toBe('La lavagna si chiude da sola')
    again.close()
  })

  it('dentro claude.ai non parte niente, e lo dice', () => {
    const send = vi.fn(async () => {})
    const dialog = openFeedbackDialog({ site: 'claude', version: 'locale', off: 'Dentro claude.ai i messaggi non partono: mandalo dal sito di Glifo.', send })
    fill(dialog, 'Ciao')
    submit(dialog)
    expect(send).not.toHaveBeenCalled()
    expect(dialog.querySelector('.feedback-off')?.textContent).toContain('claude.ai')
    expect(dialog.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled).toBe(true)
    dialog.close()
  })
})
