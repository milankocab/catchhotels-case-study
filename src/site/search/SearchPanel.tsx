import { useCallback, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  ArrowLeft,
  BedDouble,
  CalendarDays,
  CarFront,
  Clock,
  Globe,
  Link2,
  MapPin,
  Search,
  ShieldCheck,
  SquarePen,
  Users,
} from 'lucide-react'
import { search } from '../../content-prototyp'
import { Note } from '../components/Note'
import { scrollToSection, usePrototype } from '../state'
import { useDismiss } from '../useDismiss'
import { fromIsoDate, formatRange, toIsoDate } from './dates'
import { DateRangePicker, type DateRange } from './DateRangePicker'
import { DestinationField } from './DestinationField'
import { GuestsPicker, type Guests } from './GuestsPicker'
import { loadRecent, saveRecent, type RecentSearch } from './recent'
import { looksLikeBookingLink } from './suggest'

const TAB_ICONS = { stay: BedDouble, car: CarFront, insurance: ShieldCheck } as const

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
  const ref = useRef<HTMLDivElement>(null)
  useDismiss(ref, open, onClose)
  return (
    <div ref={ref} className={`relative ${open ? 'z-30' : ''}`}>
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
      {open && (
        <>
          <div aria-hidden className="fixed inset-0 z-40 bg-cobalt-deep/30 sm:hidden" />
          <div
            role="dialog"
            aria-label={label}
            className={`z-50 animate-rise overflow-hidden bg-white shadow-lift max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:rounded-t-[20px] sm:absolute sm:top-full sm:mt-2 sm:w-[380px] sm:rounded-(--radius-card) ${align === 'right' ? 'sm:right-0' : 'sm:left-0'}`}
          >
            {children}
          </div>
        </>
      )}
    </div>
  )
}

export function SearchPanel({
  sticky,
}: {
  /** Panel odjel z obrazovky, takže se nahoře připne hledání (1.9). */
  sticky: boolean
}) {
  const { variant, searchTab: tab, setSearchTab: setTab, notify } = usePrototype()
  const [destination, setDestination] = useState('')
  const [carPlace, setCarPlace] = useState('')
  const [area, setArea] = useState<string>(search.insurance.areas[1])
  const [range, setRange] = useState<DateRange>({ start: null, end: null })
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0 })
  const [panel, setPanel] = useState<Panel>(null)
  const [linkMode, setLinkMode] = useState(false)
  const [link, setLink] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [recent, setRecent] = useState<RecentSearch | null>(() => loadRecent())
  const closePanel = useCallback(() => setPanel(null), [])
  const toggle = (next: Panel) => setPanel((current) => (current === next ? null : next))

  const isA = variant === 'A'
  // Ve variantě A se termín a osoby ukážou až po zadání místa, stejně jako na dnešním webu.
  const showRest = !(isA && tab === 'stay' && destination.trim() === '')
  const dateText = formatRange(range.start, range.end)
  const guestText = search.guests.summary(guests.adults, guests.children)
  const where = tab === 'car' ? carPlace : tab === 'insurance' ? area : destination
  const summary = [where || search.sticky.empty, dateText, tab === 'car' ? '' : guestText]
    .filter(Boolean)
    .join(' · ')

  // Při přepnutí záložky nebo varianty začínám bez chyb a bez vložení odkazu.
  // Záložku mění i menu v hlavičce, proto stav srovnám už při vykreslení, ne v efektu.
  const resetKey = `${tab}-${variant}`
  const [lastResetKey, setLastResetKey] = useState(resetKey)
  if (lastResetKey !== resetKey) {
    setLastResetKey(resetKey)
    setError(null)
    setLinkMode(false)
    setPanel(null)
  }

  const submit = (place: Place) => (event: FormEvent) => {
    event.preventDefault()
    const value = where.trim()
    if (tab !== 'insurance' && !value) {
      setError(tab === 'car' ? search.car.placeError : search.destinationError)
      return
    }
    if (tab === 'stay' && looksLikeBookingLink(value)) {
      notify(search.next.hotel)
      return
    }
    if (!range.start || !range.end) {
      setPanel(`${place}-dates`)
      return
    }
    setError(null)
    if (tab === 'stay') {
      const saved: RecentSearch = {
        tab,
        destination: value,
        start: toIsoDate(range.start),
        end: toIsoDate(range.end),
        adults: guests.adults,
        children: guests.children,
        savedAt: Date.now(),
      }
      saveRecent(saved)
      setRecent(saved)
    }
    notify(tab === 'stay' ? search.next.stay : search.next.other)
  }

  const restore = (saved: RecentSearch) => {
    setTab(saved.tab)
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
          .querySelector<HTMLElement>('#hledani [role="tabpanel"] :is(input, select, button)')
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
    const [datesLabel, datesPlaceholder] =
      tab === 'car'
        ? [search.car.datesLabel, search.car.datesPlaceholder]
        : tab === 'insurance'
          ? [search.insurance.datesLabel, search.insurance.datesPlaceholder]
          : [search.dates.label, search.dates.placeholder]
    const columns =
      tab === 'car'
        ? 'lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)_auto]'
        : 'lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)_minmax(0,1fr)_auto]'

    return (
      <div className={`grid grid-cols-2 items-start gap-3 ${columns}`}>
        <div className={`relative col-span-2 ${showRest ? 'lg:col-span-1' : 'lg:col-span-full'}`}>
          {tab === 'stay' &&
            (isA ? (
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
                onOpenLink={() => notify(search.next.hotel)}
                error={error ?? undefined}
              />
            ))}
          {tab === 'car' &&
            textField(
              carPlace,
              setCarPlace,
              search.car.placeLabel,
              search.car.placePlaceholder,
              MapPin,
            )}
          {tab === 'insurance' && (
            <label className="block">
              <span className="sr-only">{search.insurance.areaLabel}</span>
              <span className={fieldBox}>
                <Globe aria-hidden size={18} className="shrink-0 text-cobalt" />
                <select
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-3 outline-none"
                >
                  {search.insurance.areas.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </span>
            </label>
          )}
          {main && tab === 'stay' && (
            <Note id={isA ? 'searchA' : 'searchB'} className="absolute -top-3 right-2" />
          )}
        </div>

        {showRest && (
          <>
            <div
              className={`relative ${tab === 'car' ? 'col-span-2' : ''} lg:col-span-1 ${main && isA && tab === 'stay' ? 'animate-rise' : ''}`}
            >
              <PanelField
                icon={CalendarDays}
                label={datesLabel}
                text={dateText}
                placeholder={datesPlaceholder}
                open={panel === datesKey}
                onToggle={() => toggle(datesKey)}
                onClose={closePanel}
              >
                <DateRangePicker
                  value={range}
                  onClose={closePanel}
                  onConfirm={(next) => {
                    setRange(next)
                    setPanel(tab === 'car' ? null : guestsKey)
                  }}
                />
              </PanelField>
              {main && !isA && tab === 'stay' && (
                <Note id="fields" className="absolute -top-3 right-2" />
              )}
            </div>
            {tab !== 'car' && (
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
            )}
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
          } else setError(search.link.error)
        }}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-coral-600 px-6 font-medium text-white shadow-cta transition hover:bg-coral-700 sm:w-auto"
      >
        {search.link.submit}
      </button>
    </div>
  )

  const TabIcon = TAB_ICONS[tab]

  return (
    <div className="relative">
      {/* Záložky kategorií. Ve variantách A i B stejné. */}
      <div className="relative flex items-end">
        <div role="tablist" aria-label={search.tabsLabel} className="flex">
          {search.tabs.map((item) => {
            const Icon = TAB_ICONS[item.id]
            const selected = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(item.id)}
                className={`flex min-h-12 items-center gap-1.5 rounded-t-[14px] px-3 text-sm font-medium transition-colors sm:gap-2 sm:px-4 ${
                  selected
                    ? 'bg-white text-cobalt-deep'
                    : 'bg-white/60 text-cobalt backdrop-blur hover:bg-white/80'
                }`}
              >
                <Icon aria-hidden size={18} className={selected ? 'text-coral-600' : ''} />
                <span className="sm:hidden">{item.short}</span>
                <span className="max-sm:hidden">{item.label}</span>
              </button>
            )
          })}
        </div>
        <Note id="tabs" className="absolute right-0 bottom-3 sm:static sm:mb-3 sm:ml-2" />
        <Note id="row" className="ml-auto mb-3 max-lg:hidden" />
      </div>

      <form
        role="tabpanel"
        aria-label={search.tabs.find((item) => item.id === tab)?.label}
        onSubmit={submit('main')}
        noValidate
        className="rounded-tr-[16px] rounded-b-[16px] bg-white p-4 shadow-lift sm:p-5"
      >
        {tab === 'stay' && linkMode && !isA ? (
          linkForm
        ) : (
          <>
            {tab === 'stay' && isA && (
              <p className="mb-2 text-sm font-medium text-cobalt-deep">{search.combinedLabel}</p>
            )}
            {fieldsRow('main')}
          </>
        )}

        {tab === 'stay' && !isA && !linkMode && (
          <p className="mt-3 flex flex-wrap items-center gap-x-1 text-sm text-muted">
            {search.linkQuestion}
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

        {recent && recent.tab === tab && !linkMode && (
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

      {sticky && (
        <div className="fixed inset-x-0 top-0 z-30 animate-rise bg-white/95 shadow-lift backdrop-blur">
          {/* Desktop: celé hledání v jednom řádku, dá se vyhledávat odkudkoliv na stránce. */}
          <form
            onSubmit={submit('sticky')}
            noValidate
            aria-label={search.sticky.label}
            className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-3 max-lg:hidden"
          >
            <span
              className="flex min-h-12 shrink-0 items-center gap-2 rounded-[10px] bg-cream px-3 text-sm font-medium text-cobalt-deep"
              title={search.tabs.find((item) => item.id === tab)?.label}
            >
              <TabIcon aria-hidden size={18} className="text-coral-600" />
              {search.tabs.find((item) => item.id === tab)?.short}
            </span>
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
        </div>
      )}
    </div>
  )
}
