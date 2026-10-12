/**
 * Le lingue di Glifo (GRAFICA.md, punto 6): italiano e inglese. Ogni testo che si vede ha un nome e
 * le due versioni, scritte una accanto all'altra nel modulo che lo usa (`texts`); i pezzi lunghi, come
 * le pagine della guida, si scrivono interi nelle due lingue (`byLang`). La prova
 * tests/translations.test.ts controlla che ogni testo abbia l'inglese e che nelle parti già tradotte non
 * resti italiano scritto direttamente nel codice.
 *
 * La lingua si decide una volta, quando la pagina si apre: cambiandola nelle impostazioni la pagina si
 * ricarica. La prima volta si prende dal browser (italiano se tra le lingue del browser l'italiano viene
 * prima dell'inglese, se no inglese); chi usava già Glifo, con gli appunti nel browser, resta in italiano.
 * Resta su questo dispositivo, come il modello di «Spiegami». La lingua in cui si scrive è un'altra cosa:
 * la sceglie il controllo ortografico (`spellLanguages`).
 */

export type Lang = 'it' | 'en'

/** Le lingue, ognuna con il nome scritto nella sua lingua (così si ritrova anche senza capire l'altra). */
export const LANGUAGES: readonly { id: Lang; name: string }[] = [
  { id: 'it', name: 'Italiano' },
  { id: 'en', name: 'English' },
]

/** Chiave in localStorage: fuori dagli spazi degli account, perché è del dispositivo. */
export const LANG_KEY = 'glifo.lang.v1'

export function isLang(value: unknown): value is Lang {
  return value === 'it' || value === 'en'
}

function savedLang(): Lang | null {
  try {
    const value = localStorage.getItem(LANG_KEY)
    return isLang(value) ? value : null
  } catch {
    return null
  }
}

/** Nel browser ci sono già gli appunti o le impostazioni di Glifo (anche con il vecchio nome, Matherdown). */
function usedBefore(): boolean {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) ?? ''
      if (key.startsWith('glifo.') || key.startsWith('matherdown.')) return true
    }
  } catch {
    // Senza memoria del browser non c'è niente di prima.
  }
  return false
}

/** La prima tra italiano e inglese nelle lingue del browser; se non c'è nessuna delle due, inglese. */
export function browserLang(languages: readonly string[]): Lang {
  for (const language of languages) {
    const code = language.slice(0, 2).toLowerCase()
    if (isLang(code)) return code
  }
  return 'en'
}

function browserLanguages(): readonly string[] {
  if (typeof navigator === 'undefined') return []
  return navigator.languages?.length ? navigator.languages : navigator.language ? [navigator.language] : []
}

/** La lingua con cui si apre Glifo: quella scelta, se no (la prima volta) dal browser. Non scrive niente. */
export function detectLang(): Lang {
  return savedLang() ?? (usedBefore() ? 'it' : browserLang(browserLanguages()))
}

/** La lingua di questa pagina. */
export let lang: Lang = detectLang()

/** Solo per le prove: cambia la lingua dei testi senza ricaricare. */
export function setLangForTests(next: Lang): void {
  lang = next
}

/**
 * All'avvio (main.ts): la lingua trovata la prima volta resta quella, anche dopo, quando nel browser ci
 * sono gli appunti (che altrimenti la farebbero tornare italiana).
 */
export function rememberLang(): void {
  if (savedLang()) return
  try {
    localStorage.setItem(LANG_KEY, lang)
  } catch {
    // Senza memoria del browser la lingua si ricalcola ogni volta, dal browser: va bene lo stesso.
  }
}

/** La lingua scelta nelle impostazioni (vale dalla prossima apertura: chi chiama ricarica la pagina). */
export function chooseLang(next: Lang): void {
  try {
    localStorage.setItem(LANG_KEY, next)
  } catch {
    // Senza memoria del browser non si può ricordare: resta quella di prima.
  }
}

/** Un testo nelle due lingue: prima l'italiano, poi l'inglese. */
export type Text = readonly [it: string, en: string]

/** Un testo, o una funzione che lo compone con dei valori (un numero, un nome…). */
type Entry = Text | ((...args: never[]) => Text)

/** I testi di un modulo nella lingua della pagina: le funzioni restano funzioni, con gli stessi argomenti. */
export type Texts<T> = {
  readonly [K in keyof T]: T[K] extends (...args: infer A) => Text ? (...args: A) => string : string
}

/** Il testo nella lingua della pagina. */
export function pick(text: Text): string {
  return text[lang === 'it' ? 0 : 1]
}

/**
 * I testi di un modulo, ognuno con il suo nome e le due versioni, per esempio
 * `const T = texts({ close: ['Chiudi', 'Close'], notes: (n: number) => [`${n} note`, `${n} notes`] })`:
 * poi `T.close` e `T.notes(3)` danno il testo nella lingua della pagina.
 */
export function texts<T extends Record<string, Entry>>(table: T): Texts<T> {
  const out: Record<string, unknown> = {}
  for (const [key, entry] of Object.entries(table)) {
    if (typeof entry === 'function') {
      Object.defineProperty(out, key, { value: (...args: never[]) => pick(entry(...args)), enumerable: true })
    } else {
      Object.defineProperty(out, key, { get: () => pick(entry), enumerable: true })
    }
  }
  return out as Texts<T>
}

/**
 * Un pezzo intero nelle due lingue (per esempio una pagina della guida, con i suoi tasti e il suo
 * codice): `byLang({ it: () => …, en: () => … })` dà quello della lingua della pagina.
 */
export function byLang<T>(versions: { it: () => T; en: () => T }): T {
  return lang === 'it' ? versions.it() : versions.en()
}

/**
 * Un testo con dei pezzi da mettere al posto dei nomi tra graffe, per esempio un tasto:
 * `rich(T.help, { key: h('kbd', {}, 'Ctrl') })`. Restituisce i figli da dare a h().
 */
export function rich(text: string, parts: Record<string, Node | string>): (string | Node)[] {
  return text
    .split(/\{(\w+)\}/)
    .map((piece, i) => (i % 2 ? (parts[piece] ?? `{${piece}}`) : piece))
    .filter((piece) => piece !== '')
}

/** Per le date: in inglese il formato del browser, se è inglese (americano o britannico), se no britannico. */
export function dateLocale(): string {
  if (lang === 'it') return 'it-IT'
  return browserLanguages().find((l) => l.toLowerCase().startsWith('en')) ?? 'en-GB'
}
