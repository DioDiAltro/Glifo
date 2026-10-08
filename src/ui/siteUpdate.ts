/**
 * Quando Glifo si aggiorna con la pagina aperta (8 ottobre 2026). Le parti che si caricano solo quando
 * servono (gli editor degli schemi e delle tabelle, i file Excel…) sono file con nel nome un'impronta del
 * contenuto, e ogni pubblicazione toglie quelli vecchi: sul sito di prova (Cloudflare Pages, senza service
 * worker) al posto di un file che non c'è più arriva la pagina iniziale, sul sito vero il service worker
 * nuovo svuota la cache di quello vecchio. Una pagina aperta da prima non li trova più: «Modifica» diceva
 * «L'editor non si è aperto: riprova», e riprovare non serviva. Ora `loadPart` dice perché (il sito è
 * cambiato, manca la rete) e propone di ricaricare, con la nota salvata prima; e quando si torna sulla
 * pagina `watchSiteUpdates` guarda se sul sito c'è una versione nuova, per dirlo prima.
 */
import { dismissToast, toast } from './toast'

/** Gli script con cui parte una pagina (`<script type="module" src>`), con l'indirizzo completo. */
export function entryScripts(doc: ParentNode, base: string): string[] {
  return [...doc.querySelectorAll('script[type="module"][src]')].map((s) => new URL(s.getAttribute('src') ?? '', base).href)
}

/**
 * La pagina scaricata dal sito (`html`, all'indirizzo `base`) è un'altra versione di Glifo: parte con
 * script diversi da `current`, quelli della pagina aperta. Senza script da confrontare (una risposta
 * che non è la pagina di Glifo) non lo è.
 */
export function isNewVersion(html: string, base: string, current: readonly string[]): boolean {
  const next = entryScripts(new DOMParser().parseFromString(html, 'text/html'), base)
  return current.length > 0 && next.length > 0 && next.some((src) => !current.includes(src))
}

/** Perché una parte di Glifo non si è caricata: il sito è cambiato, manca la rete o non si sa. */
export type LoadFailure = 'aggiornato' | 'offline' | 'altro'

export const UPDATE_TEXT = 'C\'è una versione nuova di Glifo: ricarica la pagina per usarla. Le note restano salvate.'

/** Il messaggio quando `what` (es. «l'editor degli schemi») non si carica, e se ricaricare la pagina aiuta. */
export function failureNotice(why: LoadFailure, what = 'questa parte di Glifo'): { text: string; reload: boolean } {
  if (why === 'aggiornato') return { text: `Glifo è stato aggiornato mentre la pagina era aperta e non riesco più a caricare ${what}: ricarica la pagina. Le note restano salvate.`, reload: true }
  // Senza rete ricaricare farebbe perdere la pagina (sul sito di prova non c'è il service worker).
  if (why === 'offline') return { text: `Senza connessione non riesco a caricare ${what}: riprova quando sei di nuovo in rete.`, reload: false }
  return { text: `Non riesco a caricare ${what}: controlla la connessione e riprova, o ricarica la pagina.`, reload: true }
}

/** Una parte di Glifo che non è arrivata: l'avviso l'ha già dato `loadPart`, chi la chiedeva non ne aggiunge altri. */
export class PartNotLoaded extends Error {
  constructor(readonly reason: unknown) {
    super('Una parte di Glifo non si è caricata')
    this.name = 'PartNotLoaded'
  }
}

export interface SiteUpdateHooks {
  /** Ricarica la pagina, salvando prima la nota. */
  reload: () => void
  /** C'è un editor aperto, con il lavoro non ancora nella nota: l'avviso della versione nuova aspetta. */
  busy: () => boolean
}

let hooks: SiteUpdateHooks = { reload: () => location.reload(), busy: () => false }
/** Gli script della pagina aperta, da confrontare con quelli della pagina sul sito. */
let current: string[] = []
/** L'avviso di adesso: uno solo alla volta. */
let notice: HTMLElement | null = null
/** L'avviso della versione nuova si dà una volta sola (chiuso con ×, non torna a ogni ritorno sulla pagina). */
let announced = false
let checking = false

function show(text: string, kind: 'info' | 'error', reload: boolean): void {
  if (notice) dismissToast(notice)
  notice = toast(text, kind, reload ? { action: { label: 'Ricarica', run: () => hooks.reload() } } : {})
}

/** La pagina sul sito è un'altra versione? Null se non si sa (senza rete, una risposta d'errore). */
async function siteChanged(): Promise<boolean | null> {
  try {
    const res = await fetch(location.href.split('#')[0], { cache: 'no-store' })
    if (!res.ok) return null
    return isNewVersion(await res.text(), res.url || location.href, current)
  } catch {
    return null
  }
}

/** Torna sulla pagina: se sul sito c'è una versione nuova, lo dice (con «Ricarica»). */
async function checkSite(): Promise<void> {
  if (announced || checking || !current.length || document.visibilityState !== 'visible' || hooks.busy()) return
  checking = true
  try {
    if ((await siteChanged()) && !announced && !hooks.busy()) {
      announced = true
      show(UPDATE_TEXT, 'info', true)
    }
  } finally {
    checking = false
  }
}

/**
 * Comincia a guardare se il sito cambia mentre la pagina è aperta: ogni volta che si torna sulla pagina
 * (un'altra scheda o un'altra finestra, il telefono riacceso). Da main.ts, all'avvio; restituisce come
 * smettere (per le prove).
 */
export function watchSiteUpdates(options: SiteUpdateHooks): () => void {
  hooks = options
  current = entryScripts(document, document.baseURI)
  announced = false
  const check = () => void checkSite()
  document.addEventListener('visibilitychange', check)
  window.addEventListener('focus', check)
  return () => {
    document.removeEventListener('visibilitychange', check)
    window.removeEventListener('focus', check)
  }
}

/**
 * Carica una parte di Glifo che serve solo a volte (un `import()`; `what` è il suo nome nel messaggio,
 * es. «l'editor degli schemi»). Se non arriva dice perché, con «Ricarica» se serve, e lancia
 * `PartNotLoaded`.
 */
export async function loadPart<T>(load: () => Promise<T>, what?: string): Promise<T> {
  try {
    return await load()
  } catch (err) {
    const changed = navigator.onLine ? await siteChanged() : null
    const why: LoadFailure = changed === null ? 'offline' : changed ? 'aggiornato' : 'altro'
    if (why === 'aggiornato') announced = true
    const { text, reload } = failureNotice(why, what)
    show(text, 'error', reload)
    throw new PartNotLoaded(err)
  }
}
