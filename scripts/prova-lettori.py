"""La prova dei lettori della lavagna (AI.md, punto 2): ritaglia le formule scritte a mano dalle foto dello
schermo della lavagna e le fa leggere a pix2text-mfr, il modello che leggerebbe le formule nel browser (gli
stessi file ONNX, qui con onnxruntime sul processore: i risultati sono quelli del browser, i tempi no).

  python3 -I scripts/prova-lettori.py scarica CARTELLA
      il modello da Hugging Face (breezedeus/pix2text-mfr-1.5, licenza MIT, 120 MB) nella cartella
  python3 -I scripts/prova-lettori.py ritaglia FOTO USCITA [x0 y0 x1 y1] [--spazio N]
      una formula per riga, nero su bianco come i tratti presi con il laccio; il riquadro è la parte della
      foto con la lavagna (senza pulsanti e barre); le righe si separano dove ci sono almeno N pixel vuoti
  python3 -I scripts/prova-lettori.py leggi CARTELLA_MODELLO IMMAGINI...
      una riga JSON per immagine: quello che scrive il modello, lo stesso pulito, e i secondi

Servono numpy, pillow e onnxruntime (nelle sessioni cloud ci sono già). Le foto e le formule dello studente
non vanno nel repository."""
import json
import re
import sys
import time
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image

MODEL = 'breezedeus/pix2text-mfr-1.5'
FILES = ['config.json', 'preprocessor_config.json', 'generation_config.json', 'tokenizer.json',
         'tokenizer_config.json', 'special_tokens_map.json', 'encoder_model.onnx', 'decoder_model.onnx']

# Le funzioni che il modello scrive come \operatorname{s i n}: in Glifo hanno il loro comando.
FUNCTIONS = set('sin cos tan cot sec csc arcsin arccos arctan sinh cosh tanh coth log ln lg exp lim det max min '
                'sup inf gcd dim ker deg arg Pr'.split())


def download(folder):
    Path(folder).mkdir(parents=True, exist_ok=True)
    for name in FILES:
        target = Path(folder) / name
        if not target.exists():
            urllib.request.urlretrieve(f'https://huggingface.co/{MODEL}/resolve/main/{name}', target)
    print(f'{MODEL} in {folder}')


def crop(src, out, box=None, gap=None):
    img = Image.open(src).convert('RGB')
    if box:
        img = img.crop(box)
    a = np.asarray(img).astype(np.int16)
    # Lo sfondo è il colore più frequente; l'inchiostro quello che se ne allontana (anche nel tema scuro).
    colors, counts = np.unique(a.reshape(-1, 3), axis=0, return_counts=True)
    dist = np.abs(a - colors[counts.argmax()]).sum(axis=2)
    ink = dist > 120
    rows = ink.sum(axis=1) > 0
    gap = gap or max(12, a.shape[0] // 20)
    bands, start, empty = [], None, 0
    for y, has in enumerate(rows):
        if has:
            start = y if start is None else start
            empty = 0
        elif start is not None:
            empty += 1
            if empty >= gap:
                bands.append((start, y - empty + 1))
                start, empty = None, 0
    if start is not None:
        bands.append((start, len(rows)))
    Path(out).mkdir(parents=True, exist_ok=True)
    n = 0
    for y0, y1 in bands:
        band = ink[y0:y1]
        cols = np.where(band.sum(axis=0) > 0)[0]
        if band.sum() < 30:
            continue
        x0, x1 = cols[0], cols[-1] + 1
        m = max(8, (y1 - y0) // 6)
        level = np.clip(255 - dist[y0:y1, x0:x1] * 255 // max(1, int(dist.max())), 0, 255).astype(np.uint8)
        level[~band[:, x0:x1]] = 255
        canvas = Image.new('L', (x1 - x0 + 2 * m, y1 - y0 + 2 * m), 255)
        canvas.paste(Image.fromarray(level), (m, m))
        n += 1
        canvas.convert('RGB').save(Path(out) / f'formula-{n:02d}.png')
    print(f'{n} formule ritagliate (spazio tra le righe: {gap} px)')


def byte_table():
    # La tabella dei byte di GPT-2: il tokenizer del modello è un BPE «ByteLevel».
    bs = list(range(ord('!'), ord('~') + 1)) + list(range(ord('¡'), ord('¬') + 1)) + list(range(ord('®'), ord('ÿ') + 1))
    cs = bs[:]
    n = 0
    for b in range(256):
        if b not in bs:
            bs.append(b)
            cs.append(256 + n)
            n += 1
    return {chr(c): b for b, c in zip(bs, cs)}


class Reader:
    def __init__(self, folder):
        import onnxruntime as ort
        options = ort.SessionOptions()
        options.intra_op_num_threads = 1
        self.enc = ort.InferenceSession(f'{folder}/encoder_model.onnx', options, providers=['CPUExecutionProvider'])
        self.dec = ort.InferenceSession(f'{folder}/decoder_model.onnx', options, providers=['CPUExecutionProvider'])
        tok = json.load(open(f'{folder}/tokenizer.json', encoding='utf-8'))
        self.tokens = {i: s for s, i in tok['model']['vocab'].items()}
        self.special = {a['id'] for a in tok.get('added_tokens', [])}
        self.bytes = byte_table()

    def read(self, img, max_len=256):
        # Come il TrOCRProcessor del modello: 384 × 384 (bicubico), valori da −1 a 1.
        img = img.convert('RGB').resize((384, 384), Image.BICUBIC)
        pixels = ((np.asarray(img, dtype=np.float32) / 255.0 - 0.5) / 0.5).transpose(2, 0, 1)[None]
        hidden = self.enc.run(None, {'pixel_values': pixels})[0]
        ids = [1]
        for _ in range(max_len):
            logits = self.dec.run(None, {'input_ids': np.array([ids], dtype=np.int64), 'encoder_hidden_states': hidden})[0]
            nxt = int(logits[0, -1].argmax())
            if nxt == 2:
                break
            ids.append(nxt)
        text = ''.join(self.tokens[i] for i in ids[1:] if i not in self.special)
        return bytes(self.bytes[c] for c in text).decode('utf-8', errors='replace').strip()


def tidy(tex):
    """Il LaTeX del modello come lo scriverebbe una persona (la prima idea della pulizia che farà Glifo)."""
    t = tex
    m = re.fullmatch(r'\s*\\begin\{aligned\}\s*\{(.*)\}\s*\\\\\s*\\end\{aligned\}\s*', t, re.S)
    if m:
        t = m.group(1)

    def name(m):
        letters = m.group(2).replace(' ', '')
        return f'\\{letters} ' if letters in FUNCTIONS else f'\\operatorname{m.group(1)}{{{letters}}}'
    t = re.sub(r'\\operatorname(\*?)\s*\{\s*((?:[A-Za-z]\s*)+)\}', name, t)
    t = re.sub(r'\\underset\s*\{(.*?)\}\s*\{\s*\\(lim|max|min|sup|inf)\s*\}', r'\\\2_{\1}', t)
    t = t.replace('\\cfrac', '\\frac').replace('\\mathop', '').replace('\\boldsymbol', '')
    t = re.sub(r'\^\s*\{\s*((?:\\prime\s*)+)\}', lambda m: "'" * m.group(1).count('\\prime'), t)
    t = re.sub(r'\\\\\s*\\end\{', r'\\end{', t)
    t = re.sub(r'\\left\(\s*\\begin\{matrix\}(.*?)\\end\{matrix\}\s*\\right\)', r'\\begin{pmatrix}\1\\end{pmatrix}', t, flags=re.S)
    t = re.sub(r'\{\s*([A-Za-z0-9])\s*\}(?=\s*(&|\\\\|\\end))', r'\1', t)
    # Gli spazi tra i simboli si tolgono; resta solo quello dopo un comando seguito da una lettera.
    t = re.sub(r'(\\[A-Za-z]+)\s+(?=[A-Za-z0-9])', '\\1\x00', t)
    return re.sub(r'\s+', '', t).replace('\x00', ' ').strip()


def read(folder, paths):
    reader = Reader(folder)
    for path in paths:
        start = time.time()
        raw = reader.read(Image.open(path))
        print(json.dumps({'file': Path(path).name, 'letto': raw, 'pulito': tidy(raw), 'secondi': round(time.time() - start, 2)}, ensure_ascii=False))


if __name__ == '__main__':
    command, args = sys.argv[1], sys.argv[2:]
    if command == 'scarica':
        download(args[0])
    elif command == 'ritaglia':
        gap = None
        if '--spazio' in args:
            i = args.index('--spazio')
            gap = int(args[i + 1])
            del args[i:i + 2]
        crop(args[0], args[1], tuple(int(v) for v in args[2:6]) if len(args) >= 6 else None, gap)
    elif command == 'leggi':
        read(args[0], args[1:])
    else:
        sys.exit(__doc__)
