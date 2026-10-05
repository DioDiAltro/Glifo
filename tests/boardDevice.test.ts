import { describe, expect, it } from 'vitest'
import { appleTouch } from '../src/board/device'

const UA = {
  // Safari sull'iPad (da iPadOS 13 si presenta come un Mac) e nell'app installata.
  ipad: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
  ipadApp: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)',
  oldIpad: 'Mozilla/5.0 (iPad; CPU OS 12_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1',
  iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  mac: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
  android: 'Mozilla/5.0 (Linux; Android 14; SM-X710) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  windows: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
}

describe('lavagna: il dispositivo', () => {
  it("riconosce l'iPad, anche quando si presenta come un Mac, e l'iPhone", () => {
    expect(appleTouch({ userAgent: UA.ipad, maxTouchPoints: 5 })).toBe(true)
    expect(appleTouch({ userAgent: UA.ipadApp, maxTouchPoints: 5 })).toBe(true)
    expect(appleTouch({ userAgent: UA.oldIpad, maxTouchPoints: 5 })).toBe(true)
    expect(appleTouch({ userAgent: UA.iphone, maxTouchPoints: 5 })).toBe(true)
  })

  it('il Mac, i tablet Android e i computer Windows (anche touch) no: lì lo schermo intero va bene', () => {
    expect(appleTouch({ userAgent: UA.mac, maxTouchPoints: 0 })).toBe(false)
    expect(appleTouch({ userAgent: UA.android, maxTouchPoints: 10 })).toBe(false)
    expect(appleTouch({ userAgent: UA.windows, maxTouchPoints: 10 })).toBe(false)
  })
})
