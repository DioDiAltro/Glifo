// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SUPABASE_KEY, SUPABASE_URL } from '../src/account/config'
import { feedbackRow, FeedbackError, MESSAGE_MAX, openFeedbackDialog, sendFeedback, type FeedbackRow } from '../src/ui/feedback'

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
const row: FeedbackRow = { kind: 'problema', message: 'L\'editor non si apre', email: null, ...info }

describe('il commento da mandare', () => {
  it('toglie gli spazi intorno e lascia l\'email facoltativa', () => {
    expect(feedbackRow({ kind: 'idea', message: '  Le tabelle anche in 3D \n', email: '  ' }, info)).toEqual({ kind: 'idea', message: 'Le tabelle anche in 3D', email: null, ...info })
    expect(feedbackRow({ kind: 'altro', message: 'Bello', email: ' anna@esempio.it ' }, info)).toMatchObject({ email: 'anna@esempio.it' })
  })

  it('dice cosa non va e in quale campo', () => {
    expect(feedbackRow({ kind: 'altro', message: ' \n ', email: '' }, info)).toEqual({ problem: 'Scrivi qualcosa prima di mandarlo.', field: 'message' })
    expect(feedbackRow({ kind: 'altro', message: 'x'.repeat(MESSAGE_MAX + 1), email: '' }, info)).toMatchObject({ field: 'message' })
    expect(feedbackRow({ kind: 'altro', message: 'Ciao', email: 'anna@esempio' }, info)).toMatchObject({ field: 'email' })
    expect(feedbackRow({ kind: 'altro', message: 'Ciao', email: 'anna esempio.it' }, info)).toMatchObject({ field: 'email' })
  })

  it('versione e browser non superano i limiti del database', () => {
    const long = feedbackRow({ kind: 'altro', message: 'Ciao', email: '' }, { site: 'prova', version: 'v'.repeat(80), browser: 'b'.repeat(600) }) as FeedbackRow
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

describe('la finestra «Mandaci un commento»', () => {
  const fill = (dialog: HTMLDialogElement, message: string, email = '') => {
    const text = dialog.querySelector<HTMLTextAreaElement>('textarea.feedback-message')!
    text.value = message
    text.dispatchEvent(new Event('input'))
    const mail = dialog.querySelector<HTMLInputElement>('input[type="email"]')!
    mail.value = email
    mail.dispatchEvent(new Event('input'))
  }
  const submit = (dialog: HTMLDialogElement) => dialog.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }))
  const error = (dialog: HTMLDialogElement) => {
    const p = dialog.querySelector<HTMLElement>('.prompt-error')!
    return p.hidden ? null : p.textContent
  }

  it('manda il tipo, il testo, l\'email e da dove arriva, poi ringrazia', async () => {
    const send = vi.fn(async () => {})
    const dialog = openFeedbackDialog({ site: 'prova', version: 'd2f8055', send })
    expect(dialog.querySelector('h2')?.textContent).toBe('Mandaci un commento')
    submit(dialog)
    expect(error(dialog)).toBe('Scrivi qualcosa prima di mandarlo.')
    expect(send).not.toHaveBeenCalled()
    dialog.querySelector<HTMLInputElement>('input[value="idea"]')!.dispatchEvent(new Event('change'))
    fill(dialog, 'I grafici anche nelle tabelle', 'anna@esempio')
    submit(dialog)
    expect(error(dialog)).toBe('L\'email non sembra giusta: controllala, o lasciala vuota.')
    fill(dialog, 'I grafici anche nelle tabelle', 'anna@esempio.it')
    submit(dialog)
    expect(send).toHaveBeenCalledOnce()
    const sent = (send.mock.calls[0] as unknown as [FeedbackRow])[0]
    expect(sent).toMatchObject({ kind: 'idea', message: 'I grafici anche nelle tabelle', email: 'anna@esempio.it', site: 'prova', version: 'd2f8055' })
    expect(sent.browser).toMatch(/· finestra \d+×\d+$/)
    expect(dialog.querySelector<HTMLButtonElement>('button[type="submit"]')!.textContent).toBe('Mando…')
    await vi.waitFor(() => expect(dialog.open).toBe(false))
    expect(document.querySelector('.toast')?.textContent).toBe('Grazie! Il messaggio è arrivato.')
    // Mandato, la finestra dopo è vuota.
    const next = openFeedbackDialog({ site: 'prova', version: 'd2f8055', send })
    expect(next.querySelector('textarea')!.value).toBe('')
    expect(next.querySelector<HTMLInputElement>('input[value="altro"]')!.checked).toBe(true)
  })

  it('se non parte lo dice e il testo resta, anche chiudendo la finestra', async () => {
    const send = vi.fn(async () => {
      throw new FeedbackError('Senza connessione il messaggio non parte: riprova quando sei di nuovo in rete. Quello che hai scritto resta qui.')
    })
    const dialog = openFeedbackDialog({ site: 'online', version: 'd2f8055', send })
    fill(dialog, 'La lavagna si chiude da sola')
    submit(dialog)
    await vi.waitFor(() => expect(error(dialog)).toContain('Senza connessione'))
    expect(dialog.open).toBe(true)
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
