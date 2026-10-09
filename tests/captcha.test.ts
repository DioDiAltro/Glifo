import { afterEach, describe, expect, it, vi } from 'vitest'
import { captchaToken } from '../src/account/captcha'
import { TURNSTILE_SITE_KEY } from '../src/account/config'

type Options = Record<string, unknown> & {
  callback(token: string): void
  'error-callback'(code: string): unknown
  'timeout-callback'(): void
}

/** Un Turnstile finto al posto di quello di Cloudflare: la risposta la decide la prova. */
function fakeTurnstile(id: string | null = 'w1') {
  const fake = { options: null as Options | null, removed: [] as string[] }
  vi.stubGlobal('window', {
    turnstile: {
      render: (_host: HTMLElement, options: Options) => {
        fake.options = options
        return id
      },
      remove: (widget: string) => fake.removed.push(widget),
    },
  })
  return fake
}

/** Il posto del riquadro: vuoto è nascosto (larghezza 0), e allora conta la finestra intorno. */
const host = (clientWidth: number, around = 0) => ({ clientWidth, parentElement: { clientWidth: around } }) as unknown as HTMLElement
const tick = () => new Promise((resolve) => setTimeout(resolve))

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('controllo anti-robot (Turnstile)', () => {
  it('chiede il token con la chiave del sito e poi toglie il riquadro', async () => {
    const fake = fakeTurnstile()
    const token = captchaToken(host(400), 'dark')
    await tick()
    expect(fake.options).toMatchObject({
      sitekey: TURNSTILE_SITE_KEY,
      appearance: 'interaction-only',
      language: 'it',
      theme: 'dark',
      size: 'flexible',
      'response-field': false,
    })
    fake.options?.callback('token-1')
    await expect(token).resolves.toBe('token-1')
    await tick()
    expect(fake.removed).toEqual(['w1'])
  })

  it('su un telefono stretto il riquadro è quello piccolo', async () => {
    const fake = fakeTurnstile()
    void captchaToken(host(288), 'light')
    await tick()
    expect(fake.options?.size).toBe('compact')
    // Il posto vuoto è nascosto: si guarda la finestra (288 px su un telefono largo 360).
    void captchaToken(host(0, 288), 'light')
    await tick()
    expect(fake.options?.size).toBe('compact')
    void captchaToken(host(0, 400), 'light')
    await tick()
    expect(fake.options?.size).toBe('flexible')
  })

  it('se Cloudflare non dà il token, il messaggio propone Google', async () => {
    const fake = fakeTurnstile()
    const token = captchaToken(host(400), 'light')
    await tick()
    expect(fake.options?.['error-callback']('110200')).toBe(true)
    await expect(token).rejects.toMatchObject({ kind: 'captcha', message: expect.stringContaining('Continua con Google') })
    // Dopo l'errore un token che arriva tardi non cambia niente, e il riquadro si toglie una volta.
    fake.options?.callback('tardi')
    await tick()
    expect(fake.removed).toEqual(['w1'])
  })

  it('anche se il tempo per cliccare finisce, o il riquadro non parte', async () => {
    const fake = fakeTurnstile()
    const late = captchaToken(host(400), 'light')
    await tick()
    fake.options?.['timeout-callback']()
    await expect(late).rejects.toMatchObject({ kind: 'captcha' })
    fakeTurnstile(null)
    await expect(captchaToken(host(400), 'light')).rejects.toMatchObject({ kind: 'captcha' })
  })
})
