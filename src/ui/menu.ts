import { h } from './dom'

export type MenuEntry = { label: string; run: () => void; danger?: boolean } | 'sep'

let current: { anchor: HTMLElement; close: (returnFocus?: boolean) => void } | null = null

/**
 * Menu a comparsa accanto a un pulsante. Si usa anche da tastiera (frecce per muoversi,
 * Invio per scegliere, Esc per chiudere) e si chiude cliccando fuori. Premendo di nuovo
 * lo stesso pulsante si chiude.
 */
export function openMenu(anchor: HTMLElement, entries: MenuEntry[], label: string, fromKeyboard = false): void {
  if (current) {
    const same = current.anchor === anchor
    current.close()
    if (same) return
  }
  const items: HTMLButtonElement[] = []
  const menu = h('div', { class: 'tool-menu', attrs: { role: 'menu', 'aria-label': label } })
  for (const entry of entries) {
    if (entry === 'sep') {
      menu.append(h('div', { class: 'tool-menu-sep', attrs: { role: 'separator' } }))
      continue
    }
    const item = h(
      'button',
      {
        class: `tool-menu-item${entry.danger ? ' is-danger' : ''}`,
        attrs: { type: 'button', role: 'menuitem', tabindex: -1 },
        on: {
          click: () => {
            close()
            entry.run()
          },
        },
      },
      h('span', { class: 'tool-menu-label' }, entry.label),
    )
    items.push(item)
    menu.append(item)
  }
  document.body.append(menu)

  // Sotto il pulsante, allineato a destra; sopra se in basso non c'è spazio.
  const r = anchor.getBoundingClientRect()
  const width = menu.offsetWidth
  const height = menu.offsetHeight
  menu.style.left = `${Math.max(8, Math.min(r.right - width, window.innerWidth - width - 8))}px`
  const below = r.bottom + 4 + height <= window.innerHeight - 8
  menu.style.top = `${below ? r.bottom + 4 : Math.max(8, r.top - 4 - height)}px`
  anchor.setAttribute('aria-expanded', 'true')

  const onOutside = (ev: MouseEvent) => {
    const target = ev.target as Node
    if (!menu.contains(target) && !anchor.contains(target)) close()
  }
  const onKey = (ev: KeyboardEvent) => {
    const i = items.indexOf(document.activeElement as HTMLButtonElement)
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      ev.preventDefault()
      const step = ev.key === 'ArrowDown' ? 1 : -1
      items[(i + step + items.length) % items.length]?.focus()
    } else if (ev.key === 'Escape') {
      ev.preventDefault()
      close(true)
    } else if (ev.key === 'Tab') {
      close()
    }
  }
  function close(returnFocus = false): void {
    if (current?.anchor === anchor) current = null
    menu.remove()
    anchor.setAttribute('aria-expanded', 'false')
    document.removeEventListener('mousedown', onOutside, true)
    window.removeEventListener('resize', onResize)
    if (returnFocus) anchor.focus()
  }
  const onResize = () => close()
  menu.addEventListener('keydown', onKey)
  document.addEventListener('mousedown', onOutside, true)
  window.addEventListener('resize', onResize)
  current = { anchor, close }
  if (fromKeyboard) items[0]?.focus()
}
