// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { entryScripts, failureNotice, isNewVersion, loadPart, PartNotLoaded, UPDATE_TEXT, watchSiteUpdates } from '../src/ui/siteUpdate'

const page = (main: string) =>
  `<!doctype html><html><head><script id="vite-plugin-pwa:register-sw" src="./registerSW.js"></script><script type="module" crossorigin src="./assets/${main}"></script><link rel="modulepreload" crossorigin href="./assets/notice-BjxL-257.js"></head><body></body></html>`
const base = 'https://glifo-prova.pages.dev/'

/** Il sito risponde con la pagina di Glifo che parte con `main` (o non risponde, con null). */
function site(main: string | null) {
  const fetchMock = vi.fn(async () => {
    if (main === null) throw new TypeError('Failed to fetch')
    return new Response(page(main), { status: 200, headers: { 'Content-Type': 'text/html' } })
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

const toasts = () => [...document.querySelectorAll('.toast')].map((t) => ({ text: t.querySelector('.toast-text')?.textContent ?? t.textContent, error: t.classList.contains('is-error'), reload: !!t.querySelector('.toast-action') }))

/** Guarda il sito come main.ts, fino alla fine della prova. */
let stop = () => {}
function watch(hooks: Parameters<typeof watchSiteUpdates>[0]) {
  document.head.innerHTML = '<script type="module" src="/assets/main-koJVT_Z-.js"></script>'
  stop = watchSiteUpdates(hooks)
}

afterEach(() => {
  stop()
  vi.unstubAllGlobals()
  document.querySelectorAll('.toasts').forEach((t) => t.replaceChildren())
})

describe('versione nuova del sito con la pagina aperta (8 ottobre 2026)', () => {
  it('gli script di partenza sono quelli type="module", con l\'indirizzo completo', () => {
    const doc = new DOMParser().parseFromString(page('main-koJVT_Z-.js'), 'text/html')
    expect(entryScripts(doc, base)).toEqual(['https://glifo-prova.pages.dev/assets/main-koJVT_Z-.js'])
  })

  it('la pagina sul sito parte con un altro script: è una versione nuova', () => {
    const current = [`${base}assets/main-koJVT_Z-.js`]
    expect(isNewVersion(page('main-DWc3OwxQ.js'), base, current)).toBe(true)
    expect(isNewVersion(page('main-koJVT_Z-.js'), base, current)).toBe(false)
    // Lo stesso file scritto con un altro indirizzo relativo resta la stessa versione.
    expect(isNewVersion(page('main-koJVT_Z-.js').replace('./assets/', '/assets/'), base, current)).toBe(false)
  })

  it('senza script da confrontare non si dice niente', () => {
    // Una risposta che non è la pagina di Glifo (una pagina d'errore, un portale del Wi-Fi…).
    expect(isNewVersion('<html><body>Accedi alla rete</body></html>', base, [`${base}assets/main-koJVT_Z-.js`])).toBe(false)
    // Una pagina senza script esterni (tutto dentro l'HTML): niente da confrontare.
    expect(isNewVersion(page('main-DWc3OwxQ.js'), base, [])).toBe(false)
  })

  it('i messaggi dicono che cosa non si carica; senza rete non si propone di ricaricare', () => {
    expect(failureNotice('aggiornato', 'l\'editor degli schemi')).toEqual({
      text: 'Glifo è stato aggiornato mentre la pagina era aperta e non riesco più a caricare l\'editor degli schemi: ricarica la pagina. Le note restano salvate.',
      reload: true,
    })
    expect(failureNotice('offline', 'l\'editor delle tabelle')).toEqual({ text: 'Senza connessione non riesco a caricare l\'editor delle tabelle: riprova quando sei di nuovo in rete.', reload: false })
    expect(failureNotice('altro')).toMatchObject({ reload: true })
    expect(failureNotice('altro').text).toContain('questa parte di Glifo')
  })

  it('«Modifica» con i file della versione vecchia che non ci sono più: dice di ricaricare, non «riprova»', async () => {
    // La pagina aperta parte con main-koJVT_Z-.js; il sito, intanto, con main-DWc3OwxQ.js.
    const reload = vi.fn()
    watch({ reload, busy: () => false })
    site('main-DWc3OwxQ.js')
    const missing = new TypeError('Failed to fetch dynamically imported module: http://localhost:3000/assets/editor-Br_lZ1Dk.js')
    const failed = await loadPart(() => Promise.reject(missing), 'l\'editor degli schemi').catch((err) => err)
    expect(failed).toBeInstanceOf(PartNotLoaded)
    expect(failed.reason).toBe(missing)
    expect(toasts()).toEqual([{ text: failureNotice('aggiornato', 'l\'editor degli schemi').text, error: true, reload: true }])
    // «Ricarica» ricarica la pagina (main.ts salva prima la nota) e toglie l'avviso.
    ;(document.querySelector('.toast-action') as HTMLButtonElement).click()
    expect(reload).toHaveBeenCalledOnce()
  })

  it('senza rete lo dice, senza «Ricarica»; se il sito è lo stesso propone di riprovare o ricaricare', async () => {
    watch({ reload: () => {}, busy: () => false })
    site(null)
    await loadPart(() => Promise.reject(new TypeError('Failed to fetch dynamically imported module')), 'l\'editor delle tabelle').catch(() => {})
    expect(toasts().at(-1)).toEqual({ text: failureNotice('offline', 'l\'editor delle tabelle').text, error: true, reload: false })
    site('main-koJVT_Z-.js')
    await loadPart(() => Promise.reject(new TypeError('Failed to fetch dynamically imported module')), 'l\'editor delle tabelle').catch(() => {})
    expect(toasts().at(-1)).toEqual({ text: failureNotice('altro', 'l\'editor delle tabelle').text, error: true, reload: true })
    // Quando la parte arriva, nessun avviso.
    await expect(loadPart(async () => 42)).resolves.toBe(42)
  })

  it('tornando sulla pagina dice che c\'è una versione nuova, una volta sola, e non mentre un editor è aperto', async () => {
    let busy = true
    watch({ reload: () => {}, busy: () => busy })
    const fetchMock = site('main-koJVT_Z-.js')
    const back = async () => {
      window.dispatchEvent(new Event('focus'))
      await new Promise((r) => setTimeout(r, 0))
      await new Promise((r) => setTimeout(r, 0))
    }
    await back()
    // Con un editor aperto (il lavoro non è ancora nella nota) non si guarda nemmeno.
    expect(fetchMock).not.toHaveBeenCalled()
    busy = false
    await back()
    expect(fetchMock).toHaveBeenCalledOnce()
    expect(toasts()).toEqual([])
    site('main-DWc3OwxQ.js')
    await back()
    expect(toasts()).toEqual([{ text: UPDATE_TEXT, error: false, reload: true }])
    const again = site('main-DWc3OwxQ.js')
    await back()
    expect(again).not.toHaveBeenCalled()
    expect(toasts()).toHaveLength(1)
  })
})
