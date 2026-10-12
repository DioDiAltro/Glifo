/** Minuscole, senza accenti, solo lettere e cifre separate da spazi. */
export function normalizeText(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function words(s: string): string[] {
  const n = normalizeText(s)
  return n ? n.split(' ') : []
}

/**
 * Parole che non aiutano a trovare un simbolo, in italiano ("come faccio il simbolo dell'…") e in
 * inglese ("how do I write the symbol for…"): la ricerca capisce le due lingue, qualunque sia quella
 * di Glifo. Sono già senza accenti.
 */
export const STOPWORDS = new Set(
  /* non si traduce: sono le parole di chi cerca */ `come faccio fa fare fai si scrive scrivere scrivo scriverlo scriverla scrivi inserire inserisco inserisci metto mettere metti
  ottengo ottenere ottieni voglio vorrei volevo posso puoi puo potrei devo serve servirebbe mi ti ci vi ne
  il lo la i gli le l un uno una un di del dello della dei degli delle dell d a al allo alla ai agli alle all
  da dal dallo dalla dai dagli dalle in nel nello nella nei negli nelle con su sul sullo sulla sui sugli sulle per tra fra
  e ed o od che cosa cos qual quale quali quello quella questo questa c e
  simbolo simboli segno segni comando comandi codice latex katex tex markdown md formula formule matematica matematico
  carattere caratteri scritta tipo tipi
  how do does did i to the a an of for in on at by with from is are be it its this that these what which where there
  write type make get insert put add use using want need like show symbol symbols sign signs command commands
  character characters formulas formulae math maths mathematical please can could would should you my me we`
    .split(/\s+/)
    .filter(Boolean),
)

/** Il singolare inglese con la s: "integrals" → "integral", "sets" → "set" (non "gauss", "minus"). */
export function singular(word: string): string {
  return word.length >= 4 && /[^su]s$/.test(word) ? word.slice(0, -1) : word
}

/**
 * Radice rudimentale: "frecce"/"freccia" → "frecc" e, con il singolare inglese, "matrices" →
 * "matric" come "matrice".
 */
export function stem(word: string): string {
  const s = singular(word).replace(/[aeiou]+$/, '')
  return s.length >= 3 ? s : word
}

/** Distanza di Levenshtein con uscita anticipata oltre `max`. */
export function editDistance(a: string, b: string, max = 2): number {
  if (Math.abs(a.length - b.length) > max) return max + 1
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    let rowMin = i
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost)
      cur.push(v)
      if (v < rowMin) rowMin = v
    }
    if (rowMin > max) return max + 1
    prev = cur
  }
  return prev[b.length]
}
