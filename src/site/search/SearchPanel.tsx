import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Link2,
  MapPin,
  Search,
  SquarePen,
  Users,
} from 'lucide-react'
import { createPortal } from 'react-dom'
import { search } from '../../content-prototyp'
import { BookingLogo } from '../components/BrandLogos'
import { Note } from '../components/Note'
import { LINK_EVENT, scrollToSection, usePrototype } from '../state'
import { LAYER, useFloating, useOutside } from '../floating'
import { fromIsoDate, formatRange, toIsoDate } from './dates'
import { DateRangePicker, type DateRange } from './DateRangePicker'
import { DestinationField } from './DestinationField'
import { GuestsPicker, type Guests } from './GuestsPicker'
import { loadRecent, saveRecent, type RecentSearch } from './recent'
import { looksLikeBookingLink } from './suggest'
import { stayFromText } from '../trip/offer'
import { useTrip } from '../trip/state'

// Stejná pole se vykreslí v panelu a v připnutém řádku. Každé místo má vlastní vyskakovací panely.
type Place = 'main' | 'sticky'
type Panel = `${Place}-${'dates' | 'guests'}` | null

const fieldBox =
  'flex min-h-12 w-full items-center gap-3 rounded-[10px] border border-line bg-white px-3 text-left text-[15px] text-cobalt-deep transition-colors hover:border-cobalt/40'

/** Pole, které otevírá vyskakovací panel. Na mobilu se panel ukáže zespodu přes celou šířku. */
function PanelField({
  icon: Icon,
  label,
  text,
  placeholder,
  open,
  onToggle,
  onClose,
  children,
  align = 'left',
}: {
  icon: typeof CalendarDays
  label: string
  text: string
  placeholder: string
  open: boolean
  onToggle: () => void
  onClose: () => void
  children: ReactNode
  align?: 'left' | 'right'
}) {
  const anchor = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  useOutside([anchor, panel], open, onClose)
  useFloating(open, anchor, panel, { align, sheetOnMobile: true })
  return (
    <div ref={anchor} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`${fieldBox} ${open ? 'border-azure ring-2 ring-azure' : ''}`}
      >
        <Icon aria-hidden size={18} className="shrink-0 text-cobalt" />
        <span className="sr-only">{label}: </span>
        <span className={`truncate ${text ? '' : 'text-[#8392a5]'}`}>{text || placeholder}</span>
      </button>
      {open &&
        createPortal(
          <>
            <div
              aria-hidden
              className={`fixed inset-0 ${LAYER.popover} bg-cobalt-deep/30 sm:hidden`}
            />
            <div
              ref={panel}
              role="dialog"
              aria-label={label}
              style={{ visibility: 'hidden' }}
              className={`fixed ${LAYER.popover} flex animate-rise flex-col overflow-hidden bg-white shadow-lift max-sm:inset-x-0 max-sm:bottom-0 max-sm:max-h-[85vh] max-sm:rounded-t-[20px] sm:top-0 sm:left-0 sm:w-[380px] sm:rounded-(--radius-card)`}
            >
              {children}
            </div>
          </>,
          document.body,
        )}
    </div>
  )
}

export function SearchPanel({
  sticky,
}: {
  /** Panel odjel z obrazovky, takže se nahoře připne hledání (1.5). */
  sticky: boolean
}) {
  const { variant, notify } = usePrototype()
  const { startTrip } = useTrip()
  const [destination, setDestination] = useState('')
  const [range, setRange] = useState<DateRange>({ start: null, end: null })
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0 })
  const [panel, setPanel] = useState<Panel>(null)
  const [linkMode, setLinkMode] = useState(false)
  const [link, setLink] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [recent, setRecent] = useState<RecentSearch | null>(() => loadRecent())
  const closePanel = useCallback(() => setPanel(null), [])
  const toggle = (next: Panel) => setPanel((current) => (current === next ? null : next))

  // Varianta B je dnešní řešení v novém vzhledu, varianta A navržená úprava.
  const isCurrent = variant === 'B'
  // Ve variantě B se termín a osoby ukážou až po zadání místa, stejně jako na dnešním webu.
  const showRest = !(isCurrent && destination.trim() === '')
  const dateText = formatRange(range.start, range.end)
  const guestText = search.guests.summary(guests.adults, guests.children)
  const summary = [destination || search.sticky.empty, dateText, guestText]
    .filter(Boolean)
    .join(' · ')

  // Při přepnutí varianty začínám bez chyb a bez vložení odkazu. Stav srovnám už při vykreslení.
  const [lastVariant, setLastVariant] = useState(variant)
  if (lastVariant !== variant) {
    setLastVariant(variant)
    setError(null)
    setLinkMode(false)
    setPanel(null)
  }

  // Sekce Vybíráte na Booking.com? posune stránku sem a otevře pole pro odkaz.
  // Ve variantě B pole pro odkaz neexistuje, tak jen dá fokus do hlavního pole.
  useEffect(() => {
    const onLink = () => {
      setLinkMode(true)
      scrollToSection('hledani')
      window.setTimeout(
        () =>
          document
            .querySelector<HTMLInputElement>('#hledani form input')
            ?.focus({ preventScroll: true }),
        500,
      )
    }
    window.addEventListener(LINK_EVENT, onLink)
    return () => window.removeEventListener(LINK_EVENT, onLink)
  }, [])

  const submit = (place: Place) => (event: FormEvent) => {
    event.preventDefault()
    const value = destination.trim()
    if (!value) {
      setError(search.destinationError)
      return
    }
    if (looksLikeBookingLink(value)) {
      notify(search.next.hotel)
      startTrip({ stayId: 'more' })
      return
    }
    if (!range.start || !range.end) {
      setPanel(`${place}-dates`)
      return
    }
    setError(null)
    const saved: RecentSearch = {
      destination: value,
      start: toIsoDate(range.start),
      end: toIsoDate(range.end),
      adults: guests.adults,
      children: guests.children,
      savedAt: Date.now(),
    }
    saveRecent(saved)
    setRecent(saved)
    // Prototyp přeskakuje výsledky a detail hotelu a otevře rovnou nabídku doplňků.
    startTrip({ stayId: stayFromText(value) })
  }

  const restore = (saved: RecentSearch) => {
    setDestination(saved.destination)
    setRange({
      start: saved.start ? fromIsoDate(saved.start) : null,
      end: saved.end ? fromIsoDate(saved.end) : null,
    })
    setGuests({ adults: saved.adults, children: saved.children })
  }

  const backToSearch = () => {
    scrollToSection('hledani')
    // Fokus do prvního pole hlavního panelu.
    window.setTimeout(
      () =>
        document
          .querySelector<HTMLElement>('#hledani form :is(input, button)')
          ?.focus({ preventScroll: true }),
      400,
    )
  }

  const textField = (
    value: string,
    setValue: (value: string) => void,
    label: string,
    placeholder: string,
    icon: typeof MapPin,
  ) => {
    const Icon = icon
    return (
      <div>
        <label className="block">
          <span className="sr-only">{label}</span>
          <span className="flex min-h-12 items-center gap-3 rounded-[10px] border border-line bg-white px-3 focus-within:border-azure focus-within:ring-2 focus-within:ring-azure">
            <Icon aria-hidden size={18} className="shrink-0 text-cobalt" />
            <input
              type="text"
              value={value}
              placeholder={placeholder}
              aria-invalid={!!error}
              onChange={(event) => {
                setValue(event.target.value)
                setError(null)
              }}
              className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-cobalt-deep outline-none placeholder:text-[#8392a5]"
            />
          </span>
        </label>
        {error && <p className="mt-1 text-sm text-coral-700">{error}</p>}
      </div>
    )
  }

  // Jeden řádek polí. Na desktopu je všechno vedle sebe, na mobilu pod sebou.
  const fieldsRow = (place: Place) => {
    const main = place === 'main'
    const datesKey: Panel = `${place}-dates`
    const guestsKey: Panel = `${place}-guests`
    return (
      <div className="grid grid-cols-2 items-start gap-3 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1.3fr)_minmax(0,1fr)_auto]">
        <div className={`relative col-span-2 ${showRest ? 'lg:col-span-1' : 'lg:col-span-full'}`}>
          {isCurrent ? (
            textField(
              destination,
              setDestination,
              search.combinedLabel,
              search.combinedPlaceholder,
              MapPin,
            )
          ) : (
            <DestinationField
              value={destination}
              onChange={(value) => {
                setDestination(value)
                setError(null)
              }}
              onOpenLink={() => {
                notify(search.next.hotel)
                startTrip({ stayId: 'more' })
              }}
              error={error ?? undefined}
            />
          )}
          {main && (
            <Note
              id={isCurrent ? 'searchCurrent' : 'searchNew'}
              className="absolute -top-3 right-2"
            />
          )}
        </div>

        {showRest && (
          <>
            <div className={`relative lg:col-span-1 ${main && isCurrent ? 'animate-rise' : ''}`}>
              <PanelField
                icon={CalendarDays}
                label={search.dates.label}
                text={dateText}
                placeholder={search.dates.placeholder}
                open={panel === datesKey}
                onToggle={() => toggle(datesKey)}
                onClose={closePanel}
              >
                <DateRangePicker
                  value={range}
                  onClose={closePanel}
                  onConfirm={(next) => {
                    setRange(next)
                    setPanel(guestsKey)
                  }}
                />
              </PanelField>
              {main && !isCurrent && <Note id="fields" className="absolute -top-3 right-2" />}
            </div>
            <PanelField
              icon={Users}
              label={search.guests.label}
              text={guestText}
              placeholder={search.guests.label}
              open={panel === guestsKey}
              onToggle={() => toggle(guestsKey)}
              onClose={closePanel}
              align="right"
            >
              <GuestsPicker value={guests} onChange={setGuests} onDone={closePanel} />
            </PanelField>
            <div className="relative col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-coral-600 px-6 font-medium text-white shadow-cta transition hover:bg-coral-700 active:scale-[0.98]"
              >
                <Search aria-hidden size={18} />
                {search.submit}
              </button>
              {main && <Note id="button" className="absolute -top-3 -right-2" />}
            </div>
          </>
        )}
      </div>
    )
  }

  const linkForm = (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setLinkMode(false)}
        className="-ml-1 inline-flex min-h-11 items-center gap-1 px-1 text-sm font-medium text-cobalt"
      >
        <ArrowLeft aria-hidden size={16} /> {search.link.back}
      </button>
      {textField(link, setLink, search.link.label, search.link.placeholder, Link2)}
      <ol className="space-y-1 text-sm text-muted">
        {search.link.steps.map((step, index) => (
          <li key={step} className="flex gap-2">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-cream text-xs font-semibold text-cobalt">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => {
          if (looksLikeBookingLink(link)) {
            setError(null)
            notify(search.next.hotel)
            startTrip({ stayId: 'more' })
          } else setError(search.link.error)
        }}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-coral-600 px-6 font-medium text-white shadow-cta transition hover:bg-coral-700 sm:w-auto"
      >
        {search.link.submit}
      </button>
    </div>
  )

  return (
    <div className="relative rounded-[20px] bg-white p-4 shadow-lift sm:p-5">
      {/* Vyhledávání jen pro ubytování. Doplňky se nabízejí až po výběru pobytu (bod 1.7). */}
      <div className="flex items-center gap-2">
        <h2 id="hledani-nadpis" className="text-xl leading-tight font-semibold">
          {search.title}
        </h2>
        <Note id="row" className="ml-auto max-lg:hidden" />
      </div>

      <form aria-labelledby="hledani-nadpis" onSubmit={submit('main')} noValidate className="mt-4">
        {linkMode && !isCurrent ? (
          linkForm
        ) : (
          <>
            {isCurrent && (
              <p className="mb-2 text-sm font-medium text-cobalt-deep">{search.combinedLabel}</p>
            )}
            {fieldsRow('main')}
          </>
        )}

        {!isCurrent && !linkMode && (
          <p className="mt-3 flex flex-wrap items-center gap-x-1 text-sm text-muted">
            <span>
              {search.linkQuestion} <BookingLogo className="h-3.5 translate-y-px" />?
            </span>
            <button
              type="button"
              onClick={() => {
                setError(null)
                setLinkMode(true)
              }}
              className="inline-flex min-h-11 items-center gap-1 font-medium text-cobalt underline underline-offset-4"
            >
              <Link2 aria-hidden size={14} />
              {search.linkAction}
            </button>
            <Note id="link" className="ml-1" />
          </p>
        )}

        {recent && !linkMode && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
            <span className="text-sm text-muted">{search.recentTitle}</span>
            <button
              type="button"
              onClick={() => restore(recent)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-azure-light px-4 text-sm font-medium text-cobalt hover:bg-azure/30"
            >
              <Clock aria-hidden size={14} />
              {[
                recent.destination,
                formatRange(
                  recent.start ? fromIsoDate(recent.start) : null,
                  recent.end ? fromIsoDate(recent.end) : null,
                ),
                search.guests.summary(recent.adults, recent.children),
              ]
                .filter(Boolean)
                .join(' · ')}
            </button>
            <Note id="recent" />
          </div>
        )}
      </form>

      {sticky &&
        createPortal(
          <div
            className={`fixed inset-x-0 top-0 ${LAYER.sticky} animate-rise bg-white/95 shadow-lift backdrop-blur`}
          >
            {/* Desktop: celé hledání v jednom řádku, dá se vyhledávat odkudkoliv na stránce. */}
            <form
              onSubmit={submit('sticky')}
              noValidate
              aria-label={search.sticky.label}
              className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-3 max-lg:hidden"
            >
              <div className="min-w-0 flex-1">{fieldsRow('sticky')}</div>
              <Note id="sticky" className="mt-3" />
            </form>

            {/* Mobil a tablet: zkrácený řádek, který vrátí k panelu hledání. */}
            <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2 lg:hidden">
              <button
                type="button"
                onClick={backToSearch}
                className="flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-full border border-line bg-white px-4 text-left text-sm text-cobalt-deep hover:border-cobalt/40"
              >
                <Search aria-hidden size={16} className="shrink-0 text-coral-600" />
                <span className="truncate">{summary}</span>
                <span className="ml-auto flex shrink-0 items-center gap-1 font-medium text-cobalt max-sm:sr-only">
                  <SquarePen aria-hidden size={14} />
                  {search.sticky.label}
                </span>
              </button>
              <Note id="sticky" />
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
