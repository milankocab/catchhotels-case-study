import { useCallback, useId, useRef, useState, type KeyboardEvent, type Ref } from 'react'
import { BedDouble, Link2, MapPin } from 'lucide-react'
import { search } from '../../content-prototyp'
import { useDismiss } from '../useDismiss'
import { looksLikeBookingLink, matchSuggestions } from './suggest'

type Option =
  | { kind: 'link'; name: string; detail: string }
  | { kind: 'place' | 'hotel'; name: string; detail: string }

/**
 * Pole „Kam pojedete?“ s našeptávačem pro variantu B. Našeptává místa i hotely podle názvu
 * a vložený odkaz z Booking.com nabídne otevřít jako hotel (zjištění 1.1, prvky A a E).
 */
export function DestinationField({
  value,
  onChange,
  onOpenLink,
  error,
  inputRef,
}: {
  value: string
  onChange: (value: string) => void
  onOpenLink: (url: string) => void
  error?: string
  inputRef?: Ref<HTMLInputElement>
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const wrapper = useRef<HTMLDivElement>(null)
  const listId = useId()
  const errorId = useId()
  const close = useCallback(() => setOpen(false), [])
  useDismiss(wrapper, open, close)

  const isLink = looksLikeBookingLink(value)
  const { places, hotels } = matchSuggestions(isLink ? '' : value)
  const options: Option[] = isLink
    ? [{ kind: 'link', name: search.fromLink, detail: search.fromLinkDetail }]
    : [
        ...places.map((item) => ({ kind: 'place' as const, ...item })),
        ...hotels.map((item) => ({ kind: 'hotel' as const, ...item })),
      ]

  const choose = (option: Option) => {
    setOpen(false)
    if (option.kind === 'link') onOpenLink(value.trim())
    else onChange(option.name)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setActive((index) => Math.min(index + 1, options.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter' && open && options[active]) {
      event.preventDefault()
      choose(options[active])
    }
  }

  const optionId = (index: number) => `${listId}-${index}`
  const groupTitle = (index: number) => {
    const option = options[index]
    if (index === 0 && option.kind === 'place') return value ? null : search.placesTitle
    if (option.kind === 'hotel' && options[index - 1]?.kind !== 'hotel') return search.hotelsTitle
    return null
  }

  return (
    <div ref={wrapper} className={`relative ${open ? 'z-20' : ''}`}>
      <label className="block">
        <span className="sr-only">{search.destinationLabel}</span>
        <span className="flex min-h-12 items-center gap-3 rounded-[10px] border border-line bg-white px-3 focus-within:border-azure focus-within:ring-2 focus-within:ring-azure">
          <MapPin aria-hidden size={18} className="shrink-0 text-cobalt" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            autoComplete="off"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={open && options[active] ? optionId(active) : undefined}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            value={value}
            placeholder={search.destinationPlaceholder}
            onChange={(event) => {
              onChange(event.target.value)
              setActive(0)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-cobalt-deep outline-none placeholder:text-[#8392a5]"
          />
        </span>
      </label>
      {error && (
        <p id={errorId} className="mt-1 text-sm text-coral-700">
          {error}
        </p>
      )}

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={search.suggestionsLabel}
          className="absolute inset-x-0 top-full z-40 mt-2 max-h-80 overflow-y-auto rounded-(--radius-card) bg-white py-2 shadow-lift"
        >
          {options.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted">{search.noMatch}</li>
          )}
          {options.map((option, index) => {
            const title = groupTitle(index)
            const Icon =
              option.kind === 'link' ? Link2 : option.kind === 'hotel' ? BedDouble : MapPin
            return (
              <li key={`${option.kind}-${option.name}`} role="presentation">
                {title && (
                  <p className="px-4 pt-2 pb-1 text-xs font-medium text-muted" aria-hidden>
                    {title}
                  </p>
                )}
                <div
                  id={optionId(index)}
                  role="option"
                  aria-selected={index === active}
                  tabIndex={-1}
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={() => choose(option)}
                  onKeyDown={(event) => event.key === 'Enter' && choose(option)}
                  className={`flex min-h-12 cursor-pointer items-center gap-3 px-4 py-2 ${index === active ? 'bg-azure-light' : 'hover:bg-surface-warm'}`}
                >
                  <span
                    aria-hidden
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full ${option.kind === 'link' ? 'bg-coral-light text-coral-600' : 'bg-cream text-cobalt'}`}
                  >
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-cobalt-deep">
                      {option.name}
                    </span>
                    <span className="block truncate text-xs text-muted">{option.detail}</span>
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
