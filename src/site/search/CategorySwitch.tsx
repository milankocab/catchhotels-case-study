import { useLayoutEffect, useRef } from 'react'
import { BedDouble, CarFront, ShieldCheck } from 'lucide-react'
import { search, type SearchTab } from '../../content-prototyp'

const TAB_ICONS = { stay: BedDouble, car: CarFront, insurance: ShieldCheck } as const

type Props = {
  value: SearchTab
  onChange: (tab: SearchTab) => void
  /** Hlavní panel jsou záložky (tablist). Připnutá lišta má jen přepínací tlačítka. */
  mode: 'tabs' | 'bar'
  className?: string
}

/**
 * Přepínač Ubytování, Auto a Pojištění. Bílé zvýraznění se posune pod vybranou kategorii,
 * takže je vidět, odkud kam se přepíná.
 */
export function CategorySwitch({ value, onChange, mode, className = '' }: Props) {
  const list = useRef<HTMLDivElement>(null)
  const pill = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const container = list.current
    const indicator = pill.current
    if (!container || !indicator) return
    const place = () => {
      const button = container.querySelector<HTMLElement>(`[data-tab="${value}"]`)
      if (!button) return
      indicator.style.setProperty('width', `${button.offsetWidth}px`)
      indicator.style.setProperty('height', `${button.offsetHeight}px`)
      indicator.style.setProperty(
        'transform',
        `translate(${button.offsetLeft}px, ${button.offsetTop}px)`,
      )
    }
    place()
    // Při prvním umístění se nemá nic posouvat, animace platí až pro přepnutí.
    const id = window.requestAnimationFrame?.(() => indicator.setAttribute('data-ready', ''))
    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => place())
    observer?.observe(container)
    return () => {
      if (id) window.cancelAnimationFrame(id)
      observer?.disconnect()
    }
  }, [value])

  const bar = mode === 'bar'
  return (
    <div
      ref={list}
      role={bar ? 'group' : 'tablist'}
      aria-label={search.tabsLabel}
      className={`relative rounded-[14px] bg-surface-warm p-1 ${
        bar ? 'flex gap-0.5' : 'grid grid-cols-3 gap-1 sm:flex'
      } ${className}`}
    >
      <span
        ref={pill}
        aria-hidden
        className="absolute top-0 left-0 rounded-[10px] bg-white shadow-soft data-ready:transition-[transform,width] data-ready:duration-300 data-ready:ease-[cubic-bezier(0.22,1,0.36,1)]"
      />
      {search.tabs.map((item) => {
        const Icon = TAB_ICONS[item.id]
        const selected = value === item.id
        return (
          <button
            key={item.id}
            type="button"
            data-tab={item.id}
            {...(bar
              ? { 'aria-pressed': selected, 'aria-label': item.label }
              : { role: 'tab', 'aria-selected': selected })}
            onClick={() => onChange(item.id)}
            className={`relative flex items-center justify-center gap-1.5 rounded-[10px] text-sm font-medium transition-colors ${
              bar ? 'min-h-10 px-2.5 xl:px-3' : 'min-h-11 px-2 sm:gap-2 sm:px-4'
            } ${selected ? 'text-cobalt-deep' : 'text-cobalt hover:text-cobalt-deep'}`}
          >
            <Icon
              aria-hidden
              size={18}
              className={`transition-colors ${bar ? '' : 'max-sm:hidden'} ${selected ? 'text-coral-600' : ''}`}
            />
            {bar ? (
              <span className="max-xl:hidden">{item.short}</span>
            ) : (
              <>
                <span className="sm:hidden">{item.short}</span>
                <span className="max-sm:hidden">{item.label}</span>
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}
