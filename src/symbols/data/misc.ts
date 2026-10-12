import { category, r } from '../define'

const m = category('misc')
const ch = category('chemistry')

export const misc = [
  m(r`\ldots`, ['puntini in basso', 'low dots'], ['puntini, tre puntini, puntini in basso, ellissi, eccetera, ecc, dots, ldots', 'ellipsis, three dots, low dots, baseline dots, etc, et cetera'], { u: '…', w: 8, a: 'dots' }),
  m(r`\cdots`, ['puntini centrati', 'centered dots'], ['puntini, tre puntini, puntini centrati, puntini a metà altezza, cdots', 'three dots, centered dots, centered ellipsis, midline dots'], { u: '⋯', w: 8 }),
  m(r`\vdots`, ['puntini verticali', 'vertical dots'], ['puntini verticali, tre puntini in colonna, vdots', 'vertical dots, vertical ellipsis'], { u: '⋮', w: 5 }),
  m(r`\ddots`, ['puntini diagonali', 'diagonal dots'], ['puntini diagonali, puntini obliqui, ddots', 'diagonal dots, diagonal ellipsis'], { u: '⋱', w: 4 }),
  m(r`^{\circ}`, ['gradi (°)', 'degrees (°)'], ['gradi, grado, gradi centigradi, gradi celsius, angolo in gradi, degree, pallino in alto', 'degrees, degrees celsius, celsius, angle in degrees, degree sign, degree'], {
    id: 'degree',
    u: '°',
    w: 6,
    f: [[r`^{\circ}`, ['come apice', 'as superscript'], r`90^{\circ}`], [r`^{\circ}\mathrm{C}`, ['gradi Celsius', 'degrees Celsius'], r`25^{\circ}\mathrm{C}`], [r`\degree`, ['comando \\degree', 'the \\degree command'], r`90\degree`]],
  }),
  m(r`\angle`, ['angolo', 'angle'], ['angolo, simbolo di angolo, angle', 'angle symbol'], { u: '∠', w: 5, p: r`\angle ABC` }),
  m(r`\measuredangle`, ['angolo misurato', 'measured angle'], ['angolo misurato, measuredangle', 'measured angle'], { u: '∡', w: 1 }),
  m(r`\triangle`, ['triangolo', 'triangle'], ['triangolo, triangle', 'triangle symbol'], { u: '△', w: 4, p: r`\triangle ABC` }),
  m(r`\hbar`, ['h tagliato', 'h-bar'], ['h tagliato, acca tagliata, costante di planck ridotta, h bar, hbar, planck', 'reduced planck constant, dirac constant, planck'], { u: 'ℏ', w: 5 }),
  m(r`\ell`, ['elle corsiva', 'script l'], ['elle corsiva, l corsiva, lunghezza, ell', 'script l, cursive l, length'], { u: 'ℓ', w: 4 }),
  m(r`\Re`, ['parte reale', 'real part'], ['parte reale, reale, re, real part', 'real'], { u: 'ℜ', w: 4, f: [r`\Re`, [r`\operatorname{Re}(#)`, 'Re(z)', r`\operatorname{Re}(z)`]] }),
  m(r`\Im`, ['parte immaginaria', 'imaginary part'], ['parte immaginaria, immaginario, im, imaginary part', 'imaginary'], { u: 'ℑ', w: 4, f: [r`\Im`, [r`\operatorname{Im}(#)`, 'Im(z)', r`\operatorname{Im}(z)`]] }),
  m(r`\wp`, ['p di Weierstrass', 'Weierstrass p'], ['p di weierstrass, wp', 'weierstrass p, weierstrass function'], { u: '℘', w: 1 }),
  m(r`\imath`, ['i senza punto', 'dotless i'], ['i senza punto, imath', 'dotless i'], { u: 'ı', w: 1 }),
  m(r`\jmath`, ['j senza punto', 'dotless j'], ['j senza punto, jmath', 'dotless j'], { u: 'ȷ', w: 1 }),
  m(r`\prime`, ['primo (apice)', 'prime (mark)'], ['primo, apice, prime', 'prime mark, apostrophe, derivative mark'], { u: '′', w: 3, p: r`f^{\prime}` }),
  m(r`\checkmark`, ['spunta', 'check mark'], ['spunta, visto, check, segno di spunta, corretto', 'check mark, tick, correct, check'], { u: '✓', w: 3 }),
  m(r`\bigstar`, ['stella piena', 'filled star'], ['stella piena, stella nera, bigstar', 'filled star, black star, star'], { u: '★', w: 2 }),
  m(r`\diamond`, ['rombo', 'diamond'], ['rombo, diamante, diamond', 'rhombus'], { u: '⋄', w: 2 }),
  m(r`\lozenge`, ['losanga', 'lozenge'], ['losanga, rombo vuoto, lozenge', 'empty diamond'], { u: '◊', w: 1 }),
  m(r`\clubsuit`, ['fiori (carte)', 'clubs (cards)'], ['fiori, seme fiori, club', 'clubs, club suit, cards, club'], { u: '♣', w: 1 }),
  m(r`\diamondsuit`, ['quadri (carte)', 'diamonds (cards)'], ['quadri, seme quadri, diamonds', 'diamond suit, cards, diamonds'], { u: '♢', w: 1 }),
  m(r`\heartsuit`, ['cuori (carte)', 'hearts (cards)'], ['cuori, cuore, seme cuori, hearts', 'heart, heart suit, cards, hearts'], { u: '♡', w: 1 }),
  m(r`\spadesuit`, ['picche (carte)', 'spades (cards)'], ['picche, seme picche, spades', 'spade suit, cards, spades'], { u: '♠', w: 1 }),
  m(r`\flat`, ['bemolle', 'flat'], ['bemolle, flat', 'music flat'], { u: '♭', w: 1 }),
  m(r`\sharp`, ['diesis', 'sharp'], ['diesis, sharp', 'music sharp'], { u: '♯', w: 1 }),
  m(r`\natural`, ['bequadro', 'natural'], ['bequadro, natural', 'music natural'], { u: '♮', w: 1 }),
  m(r`\surd`, ['simbolo di radice', 'radical sign'], ['simbolo di radice, surd', 'radical sign, root sign'], { u: '√', w: 1 }),
  m(r`\%`, ['percento', 'percent'], ['percento, percentuale, per cento, percent', 'percentage, per cent, percent sign'], { u: '%', w: 4 }),
  m(r`\$`, ['dollaro', 'dollar'], ['dollaro, dollar', 'dollar sign'], { u: '$', w: 2 }),
  m(r`\#`, ['cancelletto', 'hash'], ['cancelletto, hashtag, numero, hash', 'hash sign, number sign, octothorpe'], { u: '#', w: 2 }),
  m(r`\&`, ['e commerciale', 'ampersand'], ['e commerciale, ampersand', 'and sign'], { u: '&', w: 2 }),
  m(r`\_`, ['trattino basso', 'underscore'], ['trattino basso, underscore', 'low line'], { u: '_', w: 2 }),
  m(r`\backslash`, ['barra rovesciata', 'backslash'], ['barra rovesciata, backslash', 'reverse slash'], { u: '\\', w: 2 }),
  m(r`\S`, ['paragrafo (§)', 'section (§)'], ['paragrafo, sezione, section', 'section sign, paragraph'], { u: '§', w: 1 }),
  m(r`\P`, 'pilcrow (¶)', ['pilcrow, capoverso', 'paragraph sign, paragraph mark'], { u: '¶', w: 1 }),
  m(r`\copyright`, 'copyright', ['copyright, diritti', 'copyright sign'], { u: '©', w: 1 }),
  m(r`\pounds`, ['sterlina', 'pound sterling'], ['sterlina, pound', 'pound sterling, sterling, pound'], { u: '£', w: 1 }),
]

export const chemistry = [
  ch(r`\ce{#}`, ['formula chimica', 'chemical formula'], ['formula chimica, chimica, molecola, composto, mhchem, ce', 'chemistry, chemical formula, molecule, compound, mhchem'], {
    w: 5,
    note: ['Usa l\'estensione mhchem: funziona in Glifo ma non nell\'anteprima standard di VS Code.', 'It uses the mhchem extension: it works in Glifo but not in the standard VS Code preview.'],
    f: [[r`\ce{#}`, 'formula', r`\ce{H2SO4}`], [r`\ce{#^{#}}`, ['ione', 'ion'], r`\ce{SO4^{2-}}`]],
  }),
  ch(r`\ce{# -> #}`, ['reazione chimica', 'chemical reaction'], ['reazione, reazione chimica, freccia di reazione, reagenti prodotti', 'reaction, chemical reaction, reaction arrow, reactants products'], {
    id: 'ce-reaction',
    w: 4,
    f: [[r`\ce{# -> #}`, ['reazione', 'reaction'], r`\ce{2H2 + O2 -> 2H2O}`], [r`\ce{# ->[#] #}`, ['con condizioni', 'with conditions'], r`\ce{A ->[\Delta] B}`]],
  }),
  ch(r`\ce{# <=> #}`, ['equilibrio chimico', 'chemical equilibrium'], ['equilibrio, equilibrio chimico, reazione reversibile, doppia freccia chimica', 'equilibrium, chemical equilibrium, reversible reaction, equilibrium arrow'], { id: 'ce-equilibrium', w: 3, p: r`\ce{N2 + 3H2 <=> 2NH3}` }),
  ch(r`\pu{#}`, ['unità fisiche (mhchem)', 'physical units (mhchem)'], ['unità, unità fisiche, pu, misura, grandezza', 'units, physical units, measurement, quantity'], { w: 2, p: r`\pu{9.81 m/s^2}` }),
]
