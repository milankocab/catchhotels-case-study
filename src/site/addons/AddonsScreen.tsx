import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import {
  CalendarDays,
  CarFront,
  Check,
  CircleAlert,
  CreditCard,
  Info,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { czk, offer, type CarClass, type InsuranceTier } from '../../content-prototyp'
import { Note } from '../components/Note'
import { Stepper } from '../components/Stepper'
import { LAYER } from '../floating'
import { useCountUp, useDetailsMotion } from '../motion'
import { PHOTOS } from '../photos'
import { usePrototype } from '../state'
import { isCar, isTier, offerTotals } from '../trip/offer'
import { useTrip } from '../trip/state'

const copy = offer

function PayableBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-positive-light px-2.5 py-1 text-xs font-semibold text-positive">
      <Check aria-hidden size={12} strokeWidth={3} />
      {copy.payable}
    </span>
  )
}

function RecommendedBadge() {
  return (
    <span className="inline-flex w-fit items-center gap-1 rounded-full bg-amber-light px-2.5 py-1 text-xs font-semibold text-amber-ink">
      <Sparkles aria-hidden size={12} />
      {copy.recommended}
    </span>
  )
}

/** Kroužek volby. Zaškrtnutí naskočí, aby bylo vidět, že se něco stalo. */
function RadioMark({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex size-6 shrink-0 items-center justify-center rounded-full transition-colors ${
        checked ? 'bg-cobalt text-white' : 'bg-white ring-2 ring-line'
      }`}
    >
      {checked && <Check size={14} strokeWidth={3} className="animate-pop" />}
    </span>
  )
}

const cardClass = (recommended: boolean) =>
  `relative flex h-full flex-col rounded-[16px] bg-white shadow-soft transition-shadow hover:shadow-lift has-checked:ring-2 has-checked:ring-cobalt has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-azure ${
    recommended ? 'ring-2 ring-amber' : 'ring-1 ring-line'
  }`

/** Rozbalovací seznam krytí. Je mimo label, aby klik na něj nevybral variantu. */
function CoverageDetails({ items }: { items: string[] }) {
  const { detailsRef, contentRef, onSummaryClick } = useDetailsMotion()
  return (
    <details ref={detailsRef} className="mt-auto border-t border-line px-4 text-sm">
      <summary
        onClick={onSummaryClick}
        className="flex min-h-11 cursor-pointer list-none items-center font-medium text-cobalt underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden"
      >
        {copy.insurance.details}
      </summary>
      <div ref={contentRef} className="overflow-hidden">
        <ul className="space-y-1.5 pb-3 text-ink">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <Check aria-hidden size={14} className="mt-1 shrink-0 text-positive" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}

/** Volba „Bez pojištění“ nebo „Bez auta“. Menší řádek, ale stejně dobře klikatelný. */
function NoneOption({
  name,
  checked,
  onSelect,
  label,
  hint,
}: {
  name: string
  checked: boolean
  onSelect: () => void
  label: string
  hint: string
}) {
  return (
    <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-[14px] bg-white/70 px-4 py-3 ring-1 ring-line transition hover:bg-white has-checked:bg-white has-checked:ring-2 has-checked:ring-cobalt has-focus-visible:outline-2 has-focus-visible:outline-azure">
      <input type="radio" name={name} checked={checked} onChange={onSelect} className="sr-only" />
      <RadioMark checked={checked} />
      <span>
        <span className="block font-medium text-cobalt-deep">{label}</span>
        <span className="block text-xs text-muted">{hint}</span>
      </span>
    </label>
  )
}

function SectionHead({
  id,
  icon: Icon,
  title,
  meta,
  children,
}: {
  id: string
  icon: typeof ShieldCheck
  title: string
  meta: string
  children?: ReactNode
}) {
  const { notify } = usePrototype()
  return (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="flex size-10 items-center justify-center rounded-full bg-white text-cobalt shadow-soft">
          <Icon aria-hidden size={20} />
        </span>
        <h2 id={id} className="text-xl font-semibold sm:text-2xl">
          {title}
        </h2>
        {children}
      </div>
      <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-muted">
        {meta}
        <button
          type="button"
          onClick={() => notify(copy.editNote)}
          className="inline-flex min-h-11 items-center font-medium text-cobalt underline-offset-4 hover:underline"
        >
          {copy.edit}
        </button>
      </p>
    </>
  )
}

function StayCard() {
  const { trip, goHome } = useTrip()
  const stay = copy.stays[trip.stayId]
  return (
    <article
      aria-label={copy.stay.label}
      className="flex gap-4 rounded-(--radius-card) bg-white p-3 shadow-soft sm:p-4"
    >
      <img
        src={PHOTOS[stay.photo]}
        alt=""
        className="size-20 shrink-0 rounded-[12px] object-cover sm:h-28 sm:w-36"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-xs font-medium text-muted">
              {copy.stay.label}
              <Note id="staySummary" />
            </p>
            <h2 className="mt-0.5 truncate text-lg font-semibold">{stay.name}</h2>
          </div>
          <button
            type="button"
            onClick={goHome}
            className="-mt-1 inline-flex min-h-11 shrink-0 items-center px-1 text-sm font-medium text-cobalt underline-offset-4 hover:underline"
          >
            {copy.change}
          </button>
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink">
          <MapPin aria-hidden size={14} className="shrink-0 text-cobalt" />
          {stay.place}
        </p>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink">
          <CalendarDays aria-hidden size={14} className="shrink-0 text-cobalt" />
          {copy.stay.meta(stay.dates, stay.nights, stay.guestsLabel)}
        </p>
        <p className="mt-0.5 text-sm text-muted max-sm:hidden">{stay.room}</p>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold ${
              stay.refundable ? 'text-positive' : 'text-coral-700'
            }`}
          >
            {stay.refundable ? (
              <Check aria-hidden size={14} />
            ) : (
              <CircleAlert aria-hidden size={14} />
            )}
            {stay.cancellation}
          </span>
          <span className="text-right">
            <strong className="font-heading text-lg text-cobalt-deep">{czk(stay.price)}</strong>
            <span className="block text-xs text-muted">{copy.stay.fee(czk(stay.fee))}</span>
          </span>
        </div>
      </div>
    </article>
  )
}

function InsuranceSection() {
  const { trip, setTrip } = useTrip()
  const stay = copy.stays[trip.stayId]
  const choose = (insurance: InsuranceTier | 'none') => setTrip((t) => ({ ...t, insurance }))
  const recommendedTier: InsuranceTier | null = stay.abroad ? 'standard' : null

  return (
    <fieldset aria-labelledby="pojisteni-nadpis" data-reveal>
      <SectionHead
        id="pojisteni-nadpis"
        icon={ShieldCheck}
        title={copy.insurance.title}
        meta={copy.insurance.meta(stay.region, stay.guests, stay.insuranceDays)}
      >
        <PayableBadge />
        <Note id="payable" />
        <Note id="insuranceTiers" />
      </SectionHead>

      <p className="mt-1 flex items-start gap-2 text-sm text-ink">
        <Info aria-hidden size={16} className="mt-0.5 shrink-0 text-cobalt" />
        <span>
          {stay.abroad ? copy.insurance.whyAbroad : copy.insurance.whyHome}{' '}
          <Note id="recommendation" />
        </span>
      </p>
      {!stay.refundable && (
        <p className="mt-3 flex items-start gap-2 rounded-[12px] bg-amber-light px-3 py-2.5 text-sm text-amber-ink">
          <CircleAlert aria-hidden size={16} className="mt-0.5 shrink-0" />
          <span>
            {copy.insurance.nonRefundable} <Note id="stornoHint" />
          </span>
        </p>
      )}

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {copy.insurance.tiers.map((tier) => {
          const checked = trip.insurance === tier.id
          const recommended = tier.id === recommendedTier
          return (
            <div key={tier.id} className={cardClass(recommended)}>
              <label className="flex cursor-pointer flex-col gap-3 p-4">
                <input
                  type="radio"
                  name="pojisteni"
                  value={tier.id}
                  checked={checked}
                  onChange={() => choose(tier.id)}
                  className="sr-only"
                />
                <span className="flex items-start justify-between gap-2">
                  <span>
                    {recommended && <RecommendedBadge />}
                    <span className="mt-1 block font-heading text-lg font-semibold text-cobalt-deep">
                      {tier.name}
                    </span>
                  </span>
                  <RadioMark checked={checked} />
                </span>
                <span>
                  <strong className="text-xl text-cobalt-deep">
                    {czk(stay.insurance[tier.id])}
                  </strong>
                  <span className="block text-xs text-muted">{copy.insurance.perTrip}</span>
                </span>
                <ul className="space-y-1 text-sm text-ink">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <Check aria-hidden size={14} className="shrink-0 text-positive" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </label>
              <CoverageDetails items={tier.details} />
            </div>
          )
        })}
      </div>
      <div className="mt-3">
        <NoneOption
          name="pojisteni"
          checked={trip.insurance === 'none'}
          onSelect={() => choose('none')}
          label={copy.insurance.none}
          hint={copy.insurance.noneHint}
        />
      </div>
      <p className="mt-2 text-xs text-muted">{copy.insurance.disclaimer}</p>
    </fieldset>
  )
}

function CarSection() {
  const { trip, setTrip } = useTrip()
  const stay = copy.stays[trip.stayId]
  const [expanded, setExpanded] = useState(false)
  const choose = (car: CarClass | 'none') => setTrip((t) => ({ ...t, car }))

  // Ve městě je auto sbalené do jednoho řádku (kapitola 8.4).
  if (stay.carCollapsed && !expanded && !isCar(trip.car)) {
    return (
      <div
        data-reveal
        className="flex flex-wrap items-center gap-3 rounded-(--radius-card) bg-white/70 p-4 ring-1 ring-line"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-white text-cobalt shadow-soft">
          <CarFront aria-hidden size={20} />
        </span>
        <p className="min-w-0 flex-1 text-sm text-ink">
          <strong className="block text-base text-cobalt-deep">{copy.car.title}</strong>
          {copy.car.collapsed}
        </p>
        <Note id="recommendation" />
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="inline-flex min-h-11 items-center rounded-full border border-cobalt/30 bg-white px-4 text-sm font-medium text-cobalt hover:border-cobalt"
        >
          {copy.car.expand}
        </button>
      </div>
    )
  }

  return (
    <fieldset aria-labelledby="auto-nadpis" data-reveal className="animate-rise">
      <SectionHead
        id="auto-nadpis"
        icon={CarFront}
        title={copy.car.title}
        meta={copy.car.meta(stay.carPickup, stay.carDays)}
      >
        <PayableBadge />
      </SectionHead>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {copy.car.classes.map((item) => {
          const checked = trip.car === item.id
          const recommended = stay.recommended === 'car' && item.id === 'small'
          return (
            <div key={item.id} className={cardClass(recommended)}>
              <label className="flex cursor-pointer items-start gap-3 p-4">
                <input
                  type="radio"
                  name="auto"
                  value={item.id}
                  checked={checked}
                  onChange={() => choose(item.id)}
                  className="sr-only"
                />
                <span className="flex size-12 shrink-0 items-center justify-center rounded-[12px] bg-azure-light text-cobalt">
                  <CarFront aria-hidden size={24} />
                </span>
                <span className="min-w-0 flex-1">
                  {recommended && <RecommendedBadge />}
                  <span className="mt-1 block font-heading text-lg font-semibold text-cobalt-deep">
                    {item.name}
                  </span>
                  <span className="block text-sm text-muted">{item.example}</span>
                  <strong className="mt-2 block text-xl text-cobalt-deep">
                    {czk(stay.car[item.id])}
                  </strong>
                  <span className="block text-xs text-muted">{copy.car.perTrip(stay.carDays)}</span>
                </span>
                <RadioMark checked={checked} />
              </label>
            </div>
          )
        })}
      </div>
      <div className="mt-3">
        <NoneOption
          name="auto"
          checked={trip.car === 'none'}
          onSelect={() => choose('none')}
          label={copy.car.none}
          hint={copy.car.noneHint}
        />
      </div>
      <p className="mt-3 flex items-start gap-2 rounded-[12px] bg-azure-light px-3 py-2.5 text-sm text-cobalt-deep">
        <CreditCard aria-hidden size={16} className="mt-0.5 shrink-0" />
        <span>
          {copy.car.deposit} <Note id="deposit" />
        </span>
      </p>
    </fieldset>
  )
}

function useOfferActions() {
  const { setTrip } = useTrip()
  const { notify } = usePrototype()
  return {
    proceed: () => notify(copy.summary.next),
    skip: () => {
      setTrip((t) => ({ ...t, insurance: 'none', car: 'none' }))
      notify(copy.summary.next)
    },
  }
}

function Summary({ actionsRef }: { actionsRef: RefObject<HTMLDivElement | null> }) {
  const { trip, setTrip } = useTrip()
  const { proceed, skip } = useOfferActions()
  const totals = offerTotals(trip)
  const shownTotal = useCountUp(totals.total)
  const [balanceText, setBalanceText] = useState(String(trip.balance))
  const tierName = copy.insurance.tiers.find((tier) => tier.id === trip.insurance)?.name
  const carName = copy.car.classes.find((item) => item.id === trip.car)?.name

  const lines: [string, string, number][] = [['stay', copy.summary.stay, totals.stay.price]]
  if (isTier(trip.insurance) && tierName)
    lines.push(['insurance', copy.summary.insurance(tierName), totals.insurance])
  if (isCar(trip.car) && carName) lines.push(['car', copy.summary.car(carName), totals.car])

  return (
    <aside
      aria-labelledby="souhrn-cesty"
      className="rounded-(--radius-card) bg-white p-5 shadow-lift lg:sticky lg:top-6"
    >
      <div className="flex items-center gap-2">
        <h2 id="souhrn-cesty" className="text-lg font-semibold">
          {copy.summary.title}
        </h2>
        <Note id="offerSummary" />
      </div>
      <dl className="mt-3 space-y-2 text-sm">
        {lines.map(([id, label, price]) => (
          <div key={`${id}-${label}`} className="flex animate-rise justify-between gap-3">
            <dt className="text-ink">{label}</dt>
            <dd className="text-cobalt-deep tabular-nums">{czk(price)}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-3 border-t border-line pt-2 text-base font-semibold">
          <dt className="text-cobalt-deep">{copy.summary.total}</dt>
          <dd className="text-cobalt-deep tabular-nums">{czk(shownTotal)}</dd>
        </div>
      </dl>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-cobalt-deep">{copy.summary.balanceLabel}</span>
        <span className="mt-1.5 flex min-h-12 items-center rounded-[10px] border border-line px-3 focus-within:border-azure focus-within:ring-2 focus-within:ring-azure">
          <input
            type="text"
            inputMode="numeric"
            value={balanceText}
            onChange={(event) => {
              const text = event.target.value.replace(/\D/g, '').slice(0, 7)
              setBalanceText(text)
              setTrip((t) => ({ ...t, balance: Number(text) || 0 }))
            }}
            className="min-w-0 flex-1 bg-transparent py-3 text-[15px] font-semibold text-cobalt-deep outline-none"
          />
          <span className="text-muted">Kč</span>
        </span>
      </label>

      <div className="mt-4 space-y-1.5 text-sm" aria-live="polite">
        <div className="flex justify-between">
          <span className="text-muted">{copy.summary.fromBenefits}</span>
          <strong className="text-positive tabular-nums">{czk(totals.fromBenefits)}</strong>
        </div>
        <div
          className="flex h-3 overflow-hidden rounded-full bg-coral-light"
          role="img"
          aria-label={
            totals.topUp > 0 ? copy.summary.topUp(czk(totals.topUp)) : copy.summary.covered
          }
        >
          <span
            className="h-full rounded-full bg-positive transition-[width] duration-500"
            style={{ width: `${Math.round(totals.share * 100)}%` }}
          />
        </div>
        <p className={`font-semibold ${totals.topUp > 0 ? 'text-coral-700' : 'text-positive'}`}>
          {totals.topUp > 0 ? copy.summary.topUp(czk(totals.topUp)) : copy.summary.covered}
        </p>
        {totals.topUp === 0 && totals.left > 0 && (
          <p className="text-xs text-muted">{copy.summary.leftOver(czk(totals.left))}</p>
        )}
      </div>

      <div ref={actionsRef} className="mt-5 space-y-2">
        {totals.hasAddons ? (
          <>
            <button
              type="button"
              onClick={proceed}
              className="flex min-h-12 w-full items-center justify-center rounded-[10px] bg-coral-600 px-5 font-medium text-white shadow-cta transition hover:bg-coral-700"
            >
              {copy.summary.cta}
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={skip}
                className="flex min-h-12 w-full items-center justify-center rounded-[10px] border border-cobalt/30 bg-white px-5 font-medium text-cobalt transition hover:border-cobalt"
              >
                {copy.summary.skip}
              </button>
              <Note id="skip" className="absolute -top-2 -right-2" />
            </div>
          </>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={skip}
              className="flex min-h-12 w-full items-center justify-center rounded-[10px] bg-coral-600 px-5 font-medium text-white shadow-cta transition hover:bg-coral-700"
            >
              {copy.summary.skip}
            </button>
            <Note id="skip" className="absolute -top-2 -right-2" />
          </div>
        )}
      </div>
    </aside>
  )
}

/**
 * Spodní lišta na mobilu s cenou a hlavním tlačítkem. Schová se, když jsou vidět tlačítka
 * v souhrnu. Výšku hlásí přes --bottom-bar, aby nad ní zůstal chat a ovládání prototypu.
 */
function MobileBar({ actionsRef }: { actionsRef: RefObject<HTMLDivElement | null> }) {
  const { trip } = useTrip()
  const { proceed, skip } = useOfferActions()
  const totals = offerTotals(trip)
  const shownTotal = useCountUp(totals.total)
  const bar = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const target = actionsRef.current
    if (!target || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting))
    observer.observe(target)
    return () => observer.disconnect()
  }, [actionsRef])

  useEffect(() => {
    const element = bar.current
    const root = document.documentElement
    if (!element) return
    const update = () =>
      root.style.setProperty('--bottom-bar', hidden ? '0px' : `${element.offsetHeight}px`)
    update()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update)
    observer?.observe(element)
    return () => {
      observer?.disconnect()
      root.style.removeProperty('--bottom-bar')
    }
  }, [hidden])

  return (
    <div
      ref={bar}
      aria-hidden={hidden}
      inert={hidden}
      className={`fixed inset-x-0 bottom-0 ${LAYER.sticky} border-t border-line bg-white/95 px-4 py-3 shadow-lift backdrop-blur transition-transform duration-300 lg:hidden ${
        hidden ? 'translate-y-full' : ''
      }`}
    >
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-heading text-lg font-semibold text-cobalt-deep tabular-nums">
            {czk(shownTotal)}
          </p>
          <p
            className={`truncate text-xs font-medium ${totals.topUp > 0 ? 'text-coral-700' : 'text-positive'}`}
          >
            {totals.topUp > 0 ? copy.summary.topUp(czk(totals.topUp)) : copy.summary.covered}
          </p>
        </div>
        <button
          type="button"
          onClick={totals.hasAddons ? proceed : skip}
          className="flex min-h-12 shrink-0 items-center justify-center rounded-[10px] bg-coral-600 px-4 text-sm font-medium text-white shadow-cta"
        >
          {totals.hasAddons ? copy.summary.cta : copy.summary.skip}
        </button>
      </div>
    </div>
  )
}

/** Obrazovka 2. Nabídka doplňků po výběru ubytování (analyza-webu.md, kapitola 8.8). */
export function AddonsScreen() {
  const actionsRef = useRef<HTMLDivElement>(null)
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-28 lg:pt-8 lg:pb-20">
        <Stepper current={1} />
        <div className="mt-8 flex animate-rise items-center gap-2">
          <h1 className="text-[28px] leading-tight font-bold sm:text-4xl">{copy.title}</h1>
          <Note id="addonsStep" />
        </div>
        <p className="mt-2 max-w-2xl animate-rise text-ink [animation-delay:80ms]">{copy.lead}</p>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div className="min-w-0 space-y-10">
            <div className="animate-rise [animation-delay:160ms]">
              <StayCard />
            </div>
            <InsuranceSection />
            <CarSection />
          </div>
          <Summary actionsRef={actionsRef} />
        </div>
      </div>
      <MobileBar actionsRef={actionsRef} />
    </>
  )
}
