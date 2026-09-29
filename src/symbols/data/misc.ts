import { category, r } from '../define'

const m = category('misc')
const ch = category('chemistry')

export const misc = [
  m(r`\ldots`, 'puntini in basso', 'puntini, tre puntini, puntini in basso, ellissi, eccetera, ecc, dots, ldots', { u: '…', w: 8, a: 'dots' }),
  m(r`\cdots`, 'puntini centrati', 'puntini, tre puntini, puntini centrati, puntini a metà altezza, cdots', { u: '⋯', w: 8 }),
  m(r`\vdots`, 'puntini verticali', 'puntini verticali, tre puntini in colonna, vdots', { u: '⋮', w: 5 }),
  m(r`\ddots`, 'puntini diagonali', 'puntini diagonali, puntini obliqui, ddots', { u: '⋱', w: 4 }),
  m(r`^{\circ}`, 'gradi (°)', 'gradi, grado, gradi centigradi, gradi celsius, angolo in gradi, degree, pallino in alto', {
    id: 'degree',
    u: '°',
    w: 6,
    f: [[r`^{\circ}`, 'come apice', r`90^{\circ}`], [r`^{\circ}\mathrm{C}`, 'gradi Celsius', r`25^{\circ}\mathrm{C}`], [r`\degree`, 'comando \\degree', r`90\degree`]],
  }),
  m(r`\angle`, 'angolo', 'angolo, simbolo di angolo, angle', { u: '∠', w: 5, p: r`\angle ABC` }),
  m(r`\measuredangle`, 'angolo misurato', 'angolo misurato, measuredangle', { u: '∡', w: 1 }),
  m(r`\triangle`, 'triangolo', 'triangolo, triangle', { u: '△', w: 4, p: r`\triangle ABC` }),
  m(r`\hbar`, 'h tagliato', 'h tagliato, acca tagliata, costante di planck ridotta, h bar, hbar, planck', { u: 'ℏ', w: 5 }),
  m(r`\ell`, 'elle corsiva', 'elle corsiva, l corsiva, lunghezza, ell', { u: 'ℓ', w: 4 }),
  m(r`\Re`, 'parte reale', 'parte reale, reale, re, real part', { u: 'ℜ', w: 4, f: [r`\Re`, [r`\operatorname{Re}(#)`, 'Re(z)', r`\operatorname{Re}(z)`]] }),
  m(r`\Im`, 'parte immaginaria', 'parte immaginaria, immaginario, im, imaginary part', { u: 'ℑ', w: 4, f: [r`\Im`, [r`\operatorname{Im}(#)`, 'Im(z)', r`\operatorname{Im}(z)`]] }),
  m(r`\wp`, 'p di Weierstrass', 'p di weierstrass, wp', { u: '℘', w: 1 }),
  m(r`\imath`, 'i senza punto', 'i senza punto, imath', { u: 'ı', w: 1 }),
  m(r`\jmath`, 'j senza punto', 'j senza punto, jmath', { u: 'ȷ', w: 1 }),
  m(r`\prime`, 'primo (apice)', 'primo, apice, prime', { u: '′', w: 3, p: r`f^{\prime}` }),
  m(r`\checkmark`, 'spunta', 'spunta, visto, check, segno di spunta, corretto', { u: '✓', w: 3 }),
  m(r`\bigstar`, 'stella piena', 'stella piena, stella nera, bigstar', { u: '★', w: 2 }),
  m(r`\diamond`, 'rombo', 'rombo, diamante, diamond', { u: '⋄', w: 2 }),
  m(r`\lozenge`, 'losanga', 'losanga, rombo vuoto, lozenge', { u: '◊', w: 1 }),
  m(r`\clubsuit`, 'fiori (carte)', 'fiori, seme fiori, club', { u: '♣', w: 1 }),
  m(r`\diamondsuit`, 'quadri (carte)', 'quadri, seme quadri, diamonds', { u: '♢', w: 1 }),
  m(r`\heartsuit`, 'cuori (carte)', 'cuori, cuore, seme cuori, hearts', { u: '♡', w: 1 }),
  m(r`\spadesuit`, 'picche (carte)', 'picche, seme picche, spades', { u: '♠', w: 1 }),
  m(r`\flat`, 'bemolle', 'bemolle, flat', { u: '♭', w: 1 }),
  m(r`\sharp`, 'diesis', 'diesis, sharp', { u: '♯', w: 1 }),
  m(r`\natural`, 'bequadro', 'bequadro, natural', { u: '♮', w: 1 }),
  m(r`\surd`, 'simbolo di radice', 'simbolo di radice, surd', { u: '√', w: 1 }),
  m(r`\%`, 'percento', 'percento, percentuale, per cento, percent', { u: '%', w: 4 }),
  m(r`\$`, 'dollaro', 'dollaro, dollar', { u: '$', w: 2 }),
  m(r`\#`, 'cancelletto', 'cancelletto, hashtag, numero, hash', { u: '#', w: 2 }),
  m(r`\&`, 'e commerciale', 'e commerciale, ampersand', { u: '&', w: 2 }),
  m(r`\_`, 'trattino basso', 'trattino basso, underscore', { u: '_', w: 2 }),
  m(r`\backslash`, 'barra rovesciata', 'barra rovesciata, backslash', { u: '\\', w: 2 }),
  m(r`\S`, 'paragrafo (§)', 'paragrafo, sezione, section', { u: '§', w: 1 }),
  m(r`\P`, 'pilcrow (¶)', 'pilcrow, capoverso', { u: '¶', w: 1 }),
  m(r`\copyright`, 'copyright', 'copyright, diritti', { u: '©', w: 1 }),
  m(r`\pounds`, 'sterlina', 'sterlina, pound', { u: '£', w: 1 }),
]

export const chemistry = [
  ch(r`\ce{#}`, 'formula chimica', 'formula chimica, chimica, molecola, composto, mhchem, ce', {
    w: 5,
    note: 'Usa l\'estensione mhchem: funziona in Glifo ma non nell\'anteprima standard di VS Code.',
    f: [[r`\ce{#}`, 'formula', r`\ce{H2SO4}`], [r`\ce{#^{#}}`, 'ione', r`\ce{SO4^{2-}}`]],
  }),
  ch(r`\ce{# -> #}`, 'reazione chimica', 'reazione, reazione chimica, freccia di reazione, reagenti prodotti', {
    id: 'ce-reaction',
    w: 4,
    f: [[r`\ce{# -> #}`, 'reazione', r`\ce{2H2 + O2 -> 2H2O}`], [r`\ce{# ->[#] #}`, 'con condizioni', r`\ce{A ->[\Delta] B}`]],
  }),
  ch(r`\ce{# <=> #}`, 'equilibrio chimico', 'equilibrio, equilibrio chimico, reazione reversibile, doppia freccia chimica', { id: 'ce-equilibrium', w: 3, p: r`\ce{N2 + 3H2 <=> 2NH3}` }),
  ch(r`\pu{#}`, 'unità fisiche (mhchem)', 'unità, unità fisiche, pu, misura, grandezza', { w: 2, p: r`\pu{9.81 m/s^2}` }),
]
