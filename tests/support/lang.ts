/**
 * Prima di ogni file di prova: un browser in italiano, così Glifo si apre in italiano anche dove le
 * lingue del sistema sono altre (Node dà le sue, di solito inglesi). Le prove dell'inglese cambiano
 * lingua con `setLangForTests` (src/i18n.ts).
 */
for (const [name, value] of [
  ['language', 'it-IT'],
  ['languages', ['it-IT', 'it']],
] as const) {
  if (typeof navigator !== 'undefined') Object.defineProperty(navigator, name, { value, configurable: true })
}
