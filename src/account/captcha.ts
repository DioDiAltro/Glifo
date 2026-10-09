import { TURNSTILE_SITE_KEY } from './config'
import { accountFailure } from './supabase'

/**
 * Il controllo anti-robot prima dell'email per entrare: Cloudflare Turnstile. Con il CAPTCHA
 * acceso, Supabase manda l'email solo con un token valido, così nessuno può usare la finestra
 * «Accedi» per farci mandare email a raffica. Lo script va caricato da qui, senza copiarlo.
 */
export const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

interface Turnstile {
  render(host: HTMLElement, options: Record<string, unknown>): string | null | undefined
  remove(id: string): void
}

declare global {
  interface Window {
    turnstile?: Turnstile
  }
}

let loading: Promise<Turnstile> | null = null

/** Lo script si scarica solo la prima volta che serve: chi entra con Google non lo scarica. */
function loadTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  loading ??= new Promise<Turnstile>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = TURNSTILE_SCRIPT
    script.async = true
    const failed = () => {
      // Senza rete, o bloccato: la volta dopo si riprova da capo.
      script.remove()
      loading = null
      reject(accountFailure(navigator.onLine === false ? 'offline' : 'captcha'))
    }
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : failed())
    script.onerror = failed
    document.head.append(script)
  })
  return loading
}

/**
 * Un token di Turnstile, buono per una sola email. Il riquadro di Cloudflare compare in `host`
 * solo se chiede di cliccare (`interaction-only`) e se ne va appena c'è il token.
 */
export async function captchaToken(host: HTMLElement, theme: 'light' | 'dark'): Promise<string> {
  const turnstile = await loadTurnstile()
  return new Promise<string>((resolve, reject) => {
    let id: string | null | undefined = null
    let settled = false
    const finish = (settle: () => void) => {
      if (settled) return
      settled = true
      settle()
      // Il riquadro si toglie dopo, fuori dalla risposta di Cloudflare che lo sta usando.
      setTimeout(() => {
        if (id) turnstile.remove(id)
      })
    }
    const fail = () => finish(() => reject(accountFailure('captcha')))
    // Sui telefoni stretti il riquadro normale (almeno 300 px) non ci sta. Il posto vuoto è
    // nascosto, quindi conta la larghezza della finestra che lo contiene.
    const width = host.clientWidth || host.parentElement?.clientWidth || 0
    id = turnstile.render(host, {
      sitekey: TURNSTILE_SITE_KEY,
      action: 'accesso',
      appearance: 'interaction-only',
      theme,
      language: 'it',
      size: width > 0 && width < 300 ? 'compact' : 'flexible',
      'response-field': false,
      callback: (token: string) => finish(() => resolve(token)),
      'error-callback': () => {
        fail()
        return true
      },
      'timeout-callback': fail,
      'unsupported-callback': fail,
    })
    if (!id) fail()
  })
}
