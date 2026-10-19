import { useEffect, useLayoutEffect, type RefObject } from 'react'

/**
 * Pořadí vrstev na celé stránce prototypu. Plovoucí panely se vykreslují přes portál do body,
 * takže je nepřekryje žádná sekce ani vyhledávací panel.
 */
export const LAYER = {
  search: 'z-20',
  sticky: 'z-30',
  floatingButtons: 'z-40',
  popover: 'z-50',
  toast: 'z-[60]',
  note: 'z-[70]',
} as const

const MARGIN = 8
const GAP = 8

export const isNarrow = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(max-width: 639px)').matches

/**
 * Umístí panel k prvku. Výchozí je pod ním. Když se pod něj nevejde, dá ho tam, kde je víc místa,
 * a vždy ho drží celý uvnitř obrazovky.
 */
export function placeFloating(
  anchor: HTMLElement,
  panel: HTMLElement,
  align: 'center' | 'left' | 'right' = 'center',
) {
  const rect = anchor.getBoundingClientRect()
  const width = panel.offsetWidth
  const height = panel.offsetHeight
  const below = window.innerHeight - rect.bottom - GAP - MARGIN
  const above = rect.top - GAP - MARGIN

  let top = below >= height || below >= above ? rect.bottom + GAP : rect.top - GAP - height
  top = Math.min(Math.max(top, MARGIN), window.innerHeight - height - MARGIN)

  let left =
    align === 'left'
      ? rect.left
      : align === 'right'
        ? rect.right - width
        : rect.left + rect.width / 2 - width / 2
  left = Math.min(Math.max(left, MARGIN), window.innerWidth - width - MARGIN)

  panel.style.top = `${Math.round(Math.max(top, MARGIN))}px`
  panel.style.left = `${Math.round(left)}px`
  panel.style.maxHeight = `${window.innerHeight - 2 * MARGIN}px`
  panel.style.visibility = 'visible'
}

/**
 * Drží otevřený panel u prvku i při posouvání a změně velikosti okna.
 * Na úzké obrazovce může panel zůstat jako spodní panel (sheetOnMobile), pak se nepřepočítává.
 */
export function useFloating(
  open: boolean,
  anchor: RefObject<HTMLElement | null>,
  panel: RefObject<HTMLElement | null>,
  {
    align = 'center',
    sheetOnMobile = false,
  }: { align?: 'center' | 'left' | 'right'; sheetOnMobile?: boolean } = {},
) {
  useLayoutEffect(() => {
    if (!open) return
    const update = () => {
      const panelElement = panel.current
      if (!anchor.current || !panelElement) return
      if (sheetOnMobile && isNarrow()) {
        panelElement.style.removeProperty('top')
        panelElement.style.removeProperty('left')
        panelElement.style.removeProperty('max-height')
        panelElement.style.setProperty('visibility', 'visible')
        return
      }
      placeFloating(anchor.current, panelElement, align)
    }
    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    // Obsah panelu se může změnit (třeba počet nocí v kalendáři), proto hlídám i jeho velikost.
    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => update())
    if (panel.current) observer?.observe(panel.current)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
      observer?.disconnect()
    }
  }, [open, anchor, panel, align, sheetOnMobile])
}

/**
 * Zavře panel po kliknutí mimo všechny zadané prvky nebo po stisku Escape.
 * Kliknutí do poznámky „proč“ (data-keep-open) panel nezavře.
 */
export function useOutside(
  refs: RefObject<HTMLElement | null>[],
  open: boolean,
  onClose: () => void,
) {
  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Element
      if (refs.some((ref) => ref.current?.contains(target))) return
      if (target.closest?.('[data-keep-open]')) return
      onClose()
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
    // refs je pole stálých objektů ref, mění se jen jeho identita.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose])
}
