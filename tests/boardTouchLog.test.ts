import { describe, expect, it } from 'vitest'
import { LOG_MAX_LINES, TouchLog, type LogStore, type SavedLog } from '../src/board/touchlog'

/** Un posto dove salvare in memoria, come il browser. */
function memoryStore(initial: unknown = null): LogStore & { value: unknown } {
  const store = {
    value: initial,
    read: () => store.value,
    write: (v: SavedLog) => {
      store.value = JSON.parse(JSON.stringify(v))
      return true
    },
  }
  return store
}

/** Un orologio da far andare avanti a mano. */
function clock(start = 1_000_000) {
  let t = start
  return { now: () => t, tick: (ms: number) => (t += ms) }
}

function newLog() {
  const c = clock()
  const store = memoryStore()
  const log = new TouchLog(c.now, store)
  return { log, c, store }
}

/** Le righe senza i secondi davanti. */
const texts = (log: TouchLog) => log.lines.map((l) => l.replace(/^\d+\.\d{3} /, ''))

describe('lavagna: il registro dei tocchi', () => {
  it('spento non annota niente; acceso annota con i secondi dall\'inizio', () => {
    const { log, c } = newLog()
    log.add('penna 1 giù')
    log.move('penna 1', 'muove', 1, 2, 0.5)
    expect(log.lines).toEqual([])
    log.start()
    c.tick(1250)
    log.add('dito 2 giù')
    expect(log.lines).toEqual(['0.000 registro acceso', '1.250 dito 2 giù'])
  })

  it('unisce i movimenti dello stesso puntatore in una riga, con il percorso, la pressione e la durata', () => {
    const { log, c } = newLog()
    log.start()
    for (let i = 0; i < 5; i++) {
      c.tick(10)
      log.move('penna 2', 'muove', 100 + i * 10, 200, 0.2 + i * 0.1)
    }
    log.add('penna 2 su')
    expect(texts(log).slice(1)).toEqual(['penna 2 muove ×5 (100,200)→(140,200) p 0.20–0.60 in 0.040 s', 'penna 2 su'])
    // Il primo movimento arriva a 0,010 s, quando è cominciato.
    expect(log.lines[1].startsWith('0.010 ')).toBe(true)
  })

  it('i movimenti di due puntatori insieme restano separati, nell\'ordine in cui sono cominciati', () => {
    const { log, c } = newLog()
    log.start()
    c.tick(5)
    log.move('dito 7', 'muove', 300, 400, 0.5)
    c.tick(5)
    log.move('penna 2', 'muove', 10, 10, 0.3)
    log.move('dito 7', 'muove', 310, 405, 0.5)
    log.move('penna 2', 'sospesa', 12, 12, 0)
    log.flushMoves()
    expect(texts(log).slice(1)).toEqual([
      'dito 7 muove ×2 (300,400)→(310,405) p 0.50 in 0.005 s',
      'penna 2 muove ×1 (10,10)→(10,10) p 0.30 in 0.000 s',
      'penna 2 sospesa ×1 (12,12)→(12,12) in 0.000 s',
    ])
  })

  it('un tratto lungo si divide in più righe, per non perdere quando è successo', () => {
    const { log, c } = newLog()
    log.start()
    for (let i = 0; i < 130; i++) {
      c.tick(2)
      log.move('penna 2', 'muove', i, i, 0.5)
    }
    log.flushMoves()
    expect(texts(log).slice(1).map((l) => l.split(' ')[3])).toEqual(['×60', '×60', '×10'])
  })

  it('la scrittura di seguito nello stesso posto è una riga sola, senza il testo', () => {
    const { log, c } = newLog()
    log.start()
    for (let i = 0; i < 3; i++) {
      c.tick(200)
      log.input('insertText', 1, 'editor')
    }
    c.tick(5000)
    log.input('insertText', 4, 'editor')
    log.input('deleteContentBackward', 0, 'editor')
    expect(texts(log).slice(1)).toEqual([
      'scrittura: insertText ×3, 3 caratteri · editor',
      'scrittura: insertText, 4 caratteri · editor',
      'scrittura: deleteContentBackward, 0 caratteri · editor',
    ])
  })

  it('tiene le righe più recenti e dice quante ne ha tolte', () => {
    const { log } = newLog()
    log.start()
    for (let i = 0; i < LOG_MAX_LINES + 50; i++) log.add(`riga ${i}`)
    expect(log.lines.length).toBeLessThanOrEqual(LOG_MAX_LINES)
    expect(log.dropped).toBeGreaterThan(50)
    expect(texts(log).at(-1)).toBe(`riga ${LOG_MAX_LINES + 49}`)
    expect(log.text([])).toContain(`(tolte le ${log.dropped} più vecchie)`)
  })

  it('si salva nel browser e, ricaricando la pagina, riprende da dove era', () => {
    const { log, c, store } = newLog()
    log.start()
    c.tick(500)
    log.move('penna 2', 'muove', 1, 1, 0.4)
    log.saveNow()
    const saved = store.value as SavedLog
    expect(saved.on).toBe(true)
    expect(saved.lines.at(-1)).toContain('penna 2 muove ×1')
    const again = new TouchLog(c.now, store)
    expect(again.on).toBe(true)
    expect(again.lines).toEqual(log.lines)
    // Spento, resta spento; svuotato, riparte da adesso.
    again.stop()
    expect((store.value as SavedLog).on).toBe(false)
    expect(texts(again).at(-1)).toBe('registro spento')
    again.clear()
    expect(again.lines).toEqual([])
    expect(new TouchLog(c.now, memoryStore({ on: 'sì', lines: 3 })).on).toBe(false)
  })

  it('riaprendo la pagina con il registro acceso lo dice, e lo salva subito', () => {
    const c = clock()
    const store = memoryStore({ on: true, started: c.now() - 2000, dropped: 0, lines: ['0.000 registro acceso'] })
    const log = new TouchLog(c.now, store)
    log.resume()
    expect((store.value as SavedLog).lines).toEqual(['0.000 registro acceso', '2.000 pagina aperta: il registro riprende'])
    // Spento, riaprendo la pagina non riprende.
    const off = memoryStore({ on: false, started: 0, dropped: 0, lines: [] })
    new TouchLog(c.now, off).resume()
    expect((off.value as SavedLog).lines).toEqual([])
  })

  it('il testo da mandare ha l\'intestazione, la nota di chi prova e le righe', () => {
    const { log, c } = newLog()
    log.start()
    c.tick(100)
    log.add('penna 2 giù (10,20) p 0.40 · lavagna')
    log.add('→ penna: scrive')
    const text = log.text(['Dispositivo: un iPad'], '  la lavagna\nsi è chiusa ')
    const rows = text.trimEnd().split('\n')
    expect(rows.slice(0, 3)).toEqual(['Registro dei tocchi di Glifo', 'Dispositivo: un iPad', 'Cosa è successo: la lavagna si è chiusa'])
    expect(rows[3]).toMatch(/^Righe: 3\. Il numero all'inizio/)
    expect(rows.slice(4)).toEqual(['—', '0.000 registro acceso', '0.100 penna 2 giù (10,20) p 0.40 · lavagna', '0.100 → penna: scrive'])
  })

  it('avvisa quando cambia, per contare le righe', () => {
    const { log } = newLog()
    let calls = 0
    const stop = log.onChange(() => calls++)
    log.start()
    log.add('una riga')
    expect(calls).toBeGreaterThan(0)
    stop()
    const before = calls
    log.add('un\'altra')
    expect(calls).toBe(before)
  })
})
