import { useId, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from 'react'
import {
  ArrowLeft,
  CarFront,
  Check,
  ChevronDown,
  CircleAlert,
  CreditCard,
  FileText,
  Landmark,
  Lock,
  Mail,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react'
import {
  cart,
  czk,
  offer,
  type CarClass,
  type InsuranceTier,
  type PayMethod,
} from '../../content-prototyp'
import { ProgramLogo } from '../components/BrandLogos'
import { Note } from '../components/Note'
import { Stepper } from '../components/Stepper'
import { useCountUp, useDetailsMotion } from '../motion'
import { PHOTOS } from '../photos'
import { usePrototype } from '../state'
import { isCar, isTier, type Trip } from '../trip/offer'
import { cartPayment, emptyForm, validateCart, type Form, type Person } from './cart'
import { useTrip } from '../trip/state'

const copy = cart
const STUDY_HREF = `${import.meta.env.BASE_URL}pripadova-studie/`

const inputClass =
  'min-h-12 w-full rounded-[10px] border bg-white px-3 py-3 text-[15px] text-cobalt-deep outline-none transition placeholder:text-muted/70 focus:border-azure focus:ring-2 focus:ring-azure'

function Field({
  id,
  label,
  hint,
  error,
  className = '',
  ...input
}: {
  id: string
  label: string
  hint?: string
  error?: string
  className?: string
} & InputHTMLAttributes<HTMLInputElement>) {
  const describedBy = [hint && `${id}-napoveda`, error && `${id}-chyba`].filter(Boolean).join(' ')
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-cobalt-deep">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`mt-1.5 ${inputClass} ${error ? 'border-coral-600' : 'border-line'}`}
        {...input}
      />
      {hint && !error && (
        <p id={`${id}-napoveda`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && <FieldError id={`${id}-chyba`}>{error}</FieldError>}
    </div>
  )
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1 flex items-center gap-1.5 text-xs font-medium text-coral-700">
      <CircleAlert aria-hidden size={14} className="shrink-0" />
      {children}
    </p>
  )
}

/** Sbalená část formuláře, třeba adresa nebo poznámka. Otevře se plynule. */
function Optional({ label, children }: { label: string; children: ReactNode }) {
  const { detailsRef, contentRef, onSummaryClick } = useDetailsMotion()
  return (
    <details ref={detailsRef} className="group">
      <summary
        onClick={onSummaryClick}
        className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-cobalt underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden"
      >
        {label}
        <ChevronDown aria-hidden size={16} className="transition-transform group-open:rotate-180" />
      </summary>
      <div ref={contentRef} className="overflow-hidden">
        <div className="pt-2 pb-1">{children}</div>
      </div>
    </details>
  )
}

function Section({
  id,
  icon: Icon,
  title,
  lead,
  note,
  children,
}: {
  id: string
  icon: typeof Mail
  title: string
  lead?: string
  note?: ReactNode
  children: ReactNode
}) {
  return (
    <section
      aria-labelledby={id}
      data-reveal
      className="rounded-(--radius-card) bg-white p-5 shadow-soft sm:p-6"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-azure-light text-cobalt">
          <Icon aria-hidden size={20} />
        </span>
        <h2 id={id} className="text-xl font-semibold">
          {title}
        </h2>
        {note}
      </div>
      {lead && <p className="mt-2 text-sm text-ink">{lead}</p>}
      <div className="mt-4">{children}</div>
    </section>
  )
}

/** Dlaždice volby. Stejný kroužek jako na obrazovce 2. */
function Tile({
  id,
  name,
  checked,
  onSelect,
  icon,
  label,
  hint,
  hideLabel = false,
}: {
  id: string
  name: string
  checked: boolean
  onSelect: () => void
  icon?: ReactNode
  label: string
  hint?: string
  /** Název jen pro čtečky, když ho nese logo. */
  hideLabel?: boolean
}) {
  return (
    <label
      htmlFor={id}
      className="flex min-h-14 cursor-pointer items-center gap-3 rounded-[12px] bg-white px-4 py-3 ring-1 ring-line transition hover:ring-cobalt/40 has-checked:ring-2 has-checked:ring-cobalt has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-azure"
    >
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        className="sr-only"
      />
      <span
        aria-hidden
        className={`flex size-6 shrink-0 items-center justify-center rounded-full transition-colors ${
          checked ? 'bg-cobalt text-white' : 'bg-white ring-2 ring-line'
        }`}
      >
        {checked && <Check size={14} strokeWidth={3} className="animate-pop" />}
      </span>
      {icon}
      <span className="min-w-0">
        <span className={hideLabel ? 'sr-only' : 'block font-medium text-cobalt-deep'}>
          {label}
        </span>
        {hint && <span className="block text-xs text-muted">{hint}</span>}
      </span>
    </label>
  )
}

/** Pruh pokrytí. Stejný jako v trip builderu a na obrazovce 2. */
function CoverageBar({ share, label }: { share: number; label: string }) {
  return (
    <div
      className="flex h-3 overflow-hidden rounded-full bg-coral-light"
      role="img"
      aria-label={label}
    >
      <span
        className="h-full rounded-full bg-positive transition-[width] duration-500"
        style={{ width: `${Math.round(share * 100)}%` }}
      />
    </div>
  )
}

const tierName = (id: InsuranceTier) =>
  offer.insurance.tiers.find((tier) => tier.id === id)?.name ?? ''
const carName = (id: CarClass) => offer.car.classes.find((item) => item.id === id)?.name ?? ''

function Recap({
  amount,
  onPay,
  payLabel,
}: {
  amount: number | null
  onPay: () => void
  payLabel: string
}) {
  const { trip, setTrip, goHome } = useTrip()
  const pay = cartPayment(trip, amount)
  const shownTotal = useCountUp(pay.total)
  const [open, setOpen] = useState(false)
  const [removed, setRemoved] = useState<
    (Pick<Trip, 'insurance' | 'car'> & { name: string }) | null
  >(null)
  const bodyId = useId()

  const remove = (part: 'insurance' | 'car', name: string) => {
    setRemoved({ insurance: trip.insurance, car: trip.car, name })
    setTrip((t) => ({ ...t, [part]: 'none' }))
  }
  const undo = () => {
    if (!removed) return
    setTrip((t) => ({ ...t, insurance: removed.insurance, car: removed.car }))
    setRemoved(null)
  }

  const lines: { id: string; label: string; price: number; part?: 'insurance' | 'car' }[] = []
  if (isTier(trip.insurance))
    lines.push({
      id: 'insurance',
      label: copy.recap.insurance(tierName(trip.insurance)),
      price: pay.insurance,
      part: 'insurance',
    })
  if (isCar(trip.car))
    lines.push({ id: 'car', label: carName(trip.car), price: pay.car, part: 'car' })

  return (
    <aside
      aria-labelledby="kosik-rekapitulace"
      className="rounded-(--radius-card) bg-white p-5 shadow-lift lg:sticky lg:top-6"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 id="kosik-rekapitulace" className="text-lg font-semibold whitespace-nowrap">
            {copy.recap.title}
          </h2>
          <Note id="cartRecap" />
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-cobalt lg:hidden"
        >
          <span className="font-semibold text-cobalt-deep tabular-nums">{czk(shownTotal)}</span>
          <span className="sr-only">{open ? copy.recap.hide : copy.recap.show}</span>
          <ChevronDown
            aria-hidden
            size={16}
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <div id={bodyId} className={open ? 'animate-rise' : 'max-lg:hidden'}>
        <div className="mt-3 flex gap-3">
          <img
            src={PHOTOS[pay.stay.photo]}
            alt=""
            className="size-16 shrink-0 rounded-[10px] object-cover"
          />
          <div className="min-w-0 text-sm">
            <p className="truncate font-semibold text-cobalt-deep">{pay.stay.name}</p>
            <p className="text-muted">
              {offer.stay.meta(pay.stay.dates, pay.stay.nights, pay.stay.guestsLabel)}
            </p>
            <button
              type="button"
              onClick={goHome}
              className="inline-flex min-h-9 items-center font-medium text-cobalt underline-offset-4 hover:underline"
            >
              {offer.change}
            </button>
          </div>
        </div>

        <dl className="mt-3 space-y-2 border-t border-line pt-3 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-ink">{copy.recap.stay}</dt>
            <dd className="text-cobalt-deep tabular-nums">{czk(pay.stay.price - pay.stay.fee)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="flex items-center gap-1.5 text-ink">
              {copy.recap.fee}
              <Note id="fee" />
            </dt>
            <dd className="text-cobalt-deep tabular-nums">{czk(pay.stay.fee)}</dd>
          </div>
          {lines.map((line, index) => (
            <div key={line.id} className="flex animate-rise items-center justify-between gap-3">
              <dt className="min-w-0 text-ink">
                {line.label}
                <button
                  type="button"
                  onClick={() => line.part && remove(line.part, line.label)}
                  aria-label={`${copy.recap.remove} ${line.label}`}
                  className="ml-2 inline-flex min-h-9 items-center text-xs font-medium text-cobalt underline-offset-4 hover:underline"
                >
                  {copy.recap.remove}
                </button>
                {index === 0 && <Note id="removeAddon" className="ml-1" />}
              </dt>
              <dd className="whitespace-nowrap text-cobalt-deep tabular-nums">{czk(line.price)}</dd>
            </div>
          ))}
          {removed && (
            <div
              role="status"
              className="flex animate-rise items-center justify-between gap-2 rounded-[10px] bg-surface-warm px-3 py-2 text-xs text-ink"
            >
              {copy.recap.removed(removed.name)}
              <button
                type="button"
                onClick={undo}
                className="inline-flex min-h-9 shrink-0 items-center font-semibold text-cobalt underline-offset-4 hover:underline"
              >
                {copy.recap.undo}
              </button>
            </div>
          )}
          <div className="flex justify-between gap-3 border-t border-line pt-2 text-base font-semibold">
            <dt className="text-cobalt-deep">{copy.recap.total}</dt>
            <dd className="text-cobalt-deep tabular-nums">{czk(shownTotal)}</dd>
          </div>
        </dl>

        <div className="mt-3 space-y-1.5 text-sm" aria-live="polite">
          <div className="flex justify-between">
            <span className="text-muted">{copy.recap.fromBenefits}</span>
            <strong className="text-positive tabular-nums">{czk(pay.fromBenefits)}</strong>
          </div>
          <CoverageBar
            share={pay.share}
            label={pay.topUp > 0 ? `${copy.recap.topUp} ${czk(pay.topUp)}` : copy.recap.covered}
          />
          {pay.topUp > 0 ? (
            <div className="flex justify-between font-semibold text-coral-700">
              <span>{copy.recap.topUp}</span>
              <span className="tabular-nums">{czk(pay.topUp)}</span>
            </div>
          ) : (
            <p className="font-semibold text-positive">{copy.recap.covered}</p>
          )}
        </div>

        <button
          type="button"
          onClick={onPay}
          className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-coral-600 px-5 font-medium text-white shadow-cta transition hover:bg-coral-700 max-lg:hidden"
        >
          <Lock aria-hidden size={16} />
          {payLabel}
        </button>
      </div>
    </aside>
  )
}

/** Varianta B testu 3. Doporučené doplňky jedním tlačítkem přímo v košíku. */
function CartOffer() {
  const { trip, setTrip } = useTrip()
  const stay = offer.stays[trip.stayId]
  const recommendedTier: InsuranceTier = stay.abroad ? 'standard' : 'basic'

  const row = (
    key: string,
    icon: ReactNode,
    title: string,
    price: number,
    active: boolean,
    toggle: () => void,
    recommended: boolean,
  ) => (
    <li
      key={key}
      className="flex flex-wrap items-center gap-3 rounded-[12px] px-3 py-3 ring-1 ring-line"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-azure-light text-cobalt">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        {recommended && (
          <span className="mb-0.5 inline-flex items-center gap-1 rounded-full bg-amber-light px-2 py-0.5 text-xs font-semibold text-amber-ink">
            <Sparkles aria-hidden size={12} />
            {offer.recommended}
          </span>
        )}
        <span className="block font-medium text-cobalt-deep">{title}</span>
        <span className="block text-sm text-muted">
          {czk(price)} {copy.offer.perTrip}
        </span>
      </span>
      <button
        type="button"
        aria-pressed={active}
        onClick={toggle}
        className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition ${
          active
            ? 'bg-positive-light text-positive'
            : 'border border-cobalt/30 bg-white text-cobalt hover:border-cobalt'
        }`}
      >
        {active && <Check aria-hidden size={14} strokeWidth={3} />}
        {active ? copy.offer.added : copy.offer.add}
      </button>
    </li>
  )

  const insuranceRow = (tier: InsuranceTier, recommended: boolean) =>
    row(
      tier,
      <ShieldCheck aria-hidden size={20} />,
      copy.recap.insurance(tierName(tier)),
      stay.insurance[tier],
      trip.insurance === tier,
      () => setTrip((t) => ({ ...t, insurance: t.insurance === tier ? 'none' : tier })),
      recommended,
    )
  const carRow = (car: CarClass, recommended: boolean) =>
    row(
      car,
      <CarFront aria-hidden size={20} />,
      carName(car),
      stay.car[car],
      trip.car === car,
      () => setTrip((t) => ({ ...t, car: t.car === car ? 'none' : car })),
      recommended,
    )

  const otherTiers = offer.insurance.tiers
    .map((tier) => tier.id)
    .filter((id) => id !== recommendedTier)

  return (
    <Section
      id="kosik-pridat"
      icon={Sparkles}
      title={copy.offer.title}
      lead={copy.offer.lead}
      note={<Note id="cartOffer" />}
    >
      <ul className="space-y-2">
        {insuranceRow(recommendedTier, stay.abroad)}
        {!stay.carCollapsed && carRow('small', stay.recommended === 'car')}
      </ul>
      <Optional label={copy.offer.more}>
        <ul className="space-y-2">
          {otherTiers.map((tier) => insuranceRow(tier, false))}
          {stay.carCollapsed && carRow('small', false)}
          {carRow('family', false)}
        </ul>
      </Optional>
      <p className="mt-2 flex items-start gap-2 text-xs text-muted">
        <CreditCard aria-hidden size={14} className="mt-0.5 shrink-0" />
        {offer.car.deposit}
      </p>
    </Section>
  )
}

type Paid = { fromBenefits: number; topUp: number; method: PayMethod; left: number }

function Confirmation({ paid, onAdd }: { paid: Paid; onAdd: (price: number) => void }) {
  const { trip, setTrip, restart } = useTrip()
  const { notify } = usePrototype()
  const stay = offer.stays[trip.stayId]
  const done = copy.done
  const upsellTier: InsuranceTier = stay.abroad ? 'standard' : 'basic'
  const upsell = !isTier(trip.insurance)
    ? {
        title: done.upsellInsurance,
        text: done.upsellInsuranceText(tierName(upsellTier), czk(stay.insurance[upsellTier])),
        price: stay.insurance[upsellTier],
        icon: ShieldCheck,
        add: () => setTrip((t) => ({ ...t, insurance: upsellTier })),
      }
    : !isCar(trip.car) && !stay.carCollapsed
      ? {
          title: done.upsellCar,
          text: done.upsellCarText(carName('small'), czk(stay.car.small), stay.carDays),
          price: stay.car.small,
          icon: CarFront,
          add: () => setTrip((t) => ({ ...t, car: 'small' })),
        }
      : null

  const docs = [done.docs.stay]
  if (isTier(trip.insurance)) docs.push(done.docs.insurance)
  if (isCar(trip.car)) docs.push(done.docs.car)

  return (
    <div className="mx-auto max-w-2xl animate-rise">
      <div className="rounded-(--radius-card) bg-white p-6 text-center shadow-lift sm:p-8">
        <span className="mx-auto flex size-14 animate-pop items-center justify-center rounded-full bg-positive-light text-positive">
          <PartyPopper aria-hidden size={28} />
        </span>
        <h1 tabIndex={-1} className="mt-4 text-[28px] leading-tight font-bold sm:text-3xl">
          {done.title}
        </h1>
        <p className="mt-2 font-medium text-coral-700">{done.demo}</p>
        <p className="mt-4 text-sm text-muted">
          {done.orderLabel} <strong className="text-cobalt-deep">{done.order}</strong>
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <section
          aria-labelledby="hotovo-doklady"
          className="rounded-(--radius-card) bg-white p-5 shadow-soft"
        >
          <h2 id="hotovo-doklady" className="text-lg font-semibold">
            {done.docsTitle}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-ink">
            {docs.map((doc) => (
              <li key={doc} className="flex animate-rise items-start gap-2">
                <FileText aria-hidden size={16} className="mt-0.5 shrink-0 text-cobalt" />
                {doc}
              </li>
            ))}
          </ul>
        </section>
        <section
          aria-labelledby="hotovo-platba"
          className="rounded-(--radius-card) bg-white p-5 shadow-soft"
        >
          <h2 id="hotovo-platba" className="text-lg font-semibold">
            {done.paidTitle}
          </h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-ink">{done.paidBenefits}</dt>
              <dd className="font-semibold text-positive tabular-nums">{czk(paid.fromBenefits)}</dd>
            </div>
            {paid.topUp > 0 && (
              <div className="flex justify-between gap-3">
                <dt className="text-ink">
                  {paid.method === 'card' ? done.paidCard : done.paidTransfer}
                </dt>
                <dd className="text-cobalt-deep tabular-nums">{czk(paid.topUp)}</dd>
              </div>
            )}
            <div className="flex justify-between gap-3 border-t border-line pt-2">
              <dt className="text-ink">{done.left}</dt>
              <dd className="text-cobalt-deep tabular-nums">{czk(paid.left)}</dd>
            </div>
          </dl>
        </section>
      </div>

      {upsell && (
        <section
          aria-labelledby="hotovo-nabidka"
          className="mt-4 flex flex-wrap items-center gap-4 rounded-(--radius-card) bg-azure-light p-5"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-cobalt shadow-soft">
            <upsell.icon aria-hidden size={24} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 id="hotovo-nabidka" className="text-lg font-semibold">
                {upsell.title}
              </h2>
              <Note id="confirmationOffer" />
            </div>
            <p className="text-sm text-ink">{upsell.text}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              upsell.add()
              onAdd(upsell.price)
              notify(done.upsellAdded)
            }}
            className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-coral-600 px-5 font-medium text-white shadow-cta transition hover:bg-coral-700 max-sm:w-full"
          >
            {done.upsellAdd}
          </button>
        </section>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={restart}
          className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-cobalt/30 bg-white px-5 font-medium text-cobalt transition hover:border-cobalt"
        >
          {done.restart}
        </button>
        <a
          href={STUDY_HREF}
          className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-cobalt px-5 font-medium text-white transition hover:bg-cobalt-deep"
        >
          {done.study}
        </a>
      </div>
    </div>
  )
}

/** Obrazovka 3. Košík s rozdělením platby a potvrzení (analyza-webu.md, kapitola 5). */
export function CartScreen() {
  const { trip, goTo } = useTrip()
  const { addonsVariant, notify } = usePrototype()
  const stay = offer.stays[trip.stayId]
  const [form, setForm] = useState<Form>(() => emptyForm(stay.guests))
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [paid, setPaid] = useState<Paid | null>(null)
  const [voucher, setVoucher] = useState('')
  const [amountText, setAmountText] = useState<string | null>(null)

  const short = addonsVariant === 'B'
  const steps = short ? copy.stepsShort : offer.steps
  const pay = cartPayment(trip, form.amount)
  const errors = validateCart(form, trip, pay.fromBenefits)
  const errorFor = (id: string) =>
    submitted || touched[id] ? errors.find(([key]) => key === id)?.[1] : undefined
  const blur = (id: string) => () => setTouched((current) => ({ ...current, [id]: true }))
  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((current) => ({ ...current, [key]: value }))
  const contactName = `${form.firstName} ${form.lastName}`.trim()
  const payLabel =
    pay.topUp > 0 && form.method === 'transfer' ? copy.payTransfer : copy.pay(czk(pay.total))

  const submit = (event?: FormEvent) => {
    event?.preventDefault()
    setSubmitted(true)
    if (errors.length) {
      notify(copy.errors.summary(errors.length))
      document.getElementById(errors[0][0])?.focus()
      return
    }
    setPaid({
      fromBenefits: pay.fromBenefits,
      topUp: pay.topUp,
      method: form.method,
      left: Math.max(trip.balance - pay.fromBenefits, 0),
    })
    window.scrollTo?.({ top: 0, behavior: 'instant' })
  }

  if (paid)
    return (
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-20 lg:pt-8">
        <Stepper current={steps.length - 1} steps={steps} />
        <div className="mt-8">
          <Confirmation
            paid={paid}
            onAdd={(price) =>
              setPaid((current) =>
                current && current.left >= price
                  ? { ...current, left: current.left - price }
                  : current,
              )
            }
          />
        </div>
      </div>
    )

  const amountValue = amountText ?? String(pay.fromBenefits)

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 pb-24 lg:pt-8 lg:pb-20">
      <Stepper current={steps.length - 2} steps={steps} />
      {!short && (
        <button
          type="button"
          onClick={() => goTo('addons')}
          className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-cobalt underline-offset-4 hover:underline"
        >
          <ArrowLeft aria-hidden size={16} />
          {copy.back}
        </button>
      )}
      <h1
        className={`${short ? 'mt-8' : 'mt-2'} animate-rise text-[28px] leading-tight font-bold sm:text-4xl`}
      >
        {copy.title}
      </h1>
      <p className="mt-2 max-w-2xl animate-rise text-ink [animation-delay:80ms]">{copy.lead}</p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-8">
        <div className="lg:order-2">
          <Recap amount={form.amount} onPay={() => submit()} payLabel={payLabel} />
        </div>

        <form
          id="kosik-formular"
          noValidate
          onSubmit={submit}
          className="min-w-0 space-y-6 lg:order-1"
        >
          <Section
            id="kosik-kontakt"
            icon={Mail}
            title={copy.contact.title}
            note={<Note id="contact" />}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="kosik-jmeno"
                label={copy.contact.firstName}
                autoComplete="given-name"
                value={form.firstName}
                onChange={(event) => set('firstName', event.target.value)}
                onBlur={blur('kosik-jmeno')}
                error={errorFor('kosik-jmeno')}
              />
              <Field
                id="kosik-prijmeni"
                label={copy.contact.lastName}
                autoComplete="family-name"
                value={form.lastName}
                onChange={(event) => set('lastName', event.target.value)}
                onBlur={blur('kosik-prijmeni')}
                error={errorFor('kosik-prijmeni')}
              />
              <Field
                id="kosik-email"
                type="email"
                label={copy.contact.email}
                hint={copy.contact.emailHint}
                autoComplete="email"
                value={form.email}
                onChange={(event) => set('email', event.target.value)}
                onBlur={blur('kosik-email')}
                error={errorFor('kosik-email')}
              />
              <Field
                id="kosik-telefon"
                type="tel"
                label={copy.contact.phone}
                hint={copy.contact.phoneHint}
                autoComplete="tel"
                value={form.phone}
                onChange={(event) => set('phone', event.target.value)}
              />
            </div>
            <div className="mt-3 space-y-1">
              <Optional label={copy.contact.address}>
                <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
                  <Field
                    id="kosik-ulice"
                    label={copy.contact.street}
                    autoComplete="street-address"
                    value={form.street}
                    onChange={(event) => set('street', event.target.value)}
                    className="sm:col-span-2"
                  />
                  <Field
                    id="kosik-mesto"
                    label={copy.contact.city}
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={(event) => set('city', event.target.value)}
                  />
                  <Field
                    id="kosik-psc"
                    label={copy.contact.zip}
                    autoComplete="postal-code"
                    inputMode="numeric"
                    value={form.zip}
                    onChange={(event) => set('zip', event.target.value)}
                  />
                  <Field
                    id="kosik-ico"
                    label={copy.contact.company}
                    inputMode="numeric"
                    value={form.company}
                    onChange={(event) => set('company', event.target.value)}
                    className="sm:col-span-2"
                  />
                </div>
              </Optional>
              <Optional label={copy.contact.note}>
                <label htmlFor="kosik-poznamka" className="text-sm font-medium text-cobalt-deep">
                  {copy.contact.noteLabel}
                </label>
                <textarea
                  id="kosik-poznamka"
                  rows={3}
                  value={form.note}
                  onChange={(event) => set('note', event.target.value)}
                  aria-describedby="kosik-poznamka-napoveda"
                  className={`mt-1.5 ${inputClass} border-line`}
                />
                <p id="kosik-poznamka-napoveda" className="mt-1 text-xs text-muted">
                  {copy.contact.noteHint}
                </p>
              </Optional>
            </div>
          </Section>

          {isTier(trip.insurance) && (
            <Section
              id="kosik-pojistene"
              icon={ShieldCheck}
              title={copy.insured.title}
              lead={copy.insured.lead}
              note={<Note id="addonFields" />}
            >
              <div className="space-y-4">
                {form.persons.map((person, index) => {
                  const nameId = `kosik-osoba-${index}`
                  const birthId = `kosik-narozeni-${index}`
                  const update = (patch: Partial<Person>) =>
                    set(
                      'persons',
                      form.persons.map((item, i) => (i === index ? { ...item, ...patch } : item)),
                    )
                  return (
                    <fieldset key={nameId} className="grid gap-3 sm:grid-cols-[1fr_11rem]">
                      <legend className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">
                        {copy.insured.person(index + 1)}
                      </legend>
                      <Field
                        id={nameId}
                        label={copy.insured.name}
                        value={person.name ?? (index === 0 ? contactName : '')}
                        onChange={(event) => update({ name: event.target.value })}
                        onBlur={blur(nameId)}
                        error={errorFor(nameId)}
                      />
                      <Field
                        id={birthId}
                        label={copy.insured.birth}
                        placeholder={copy.insured.birthPlaceholder}
                        inputMode="numeric"
                        autoComplete={index === 0 ? 'bday' : 'off'}
                        value={person.birth}
                        onChange={(event) => update({ birth: event.target.value })}
                        onBlur={blur(birthId)}
                        error={errorFor(birthId)}
                      />
                    </fieldset>
                  )
                })}
              </div>
            </Section>
          )}

          {isCar(trip.car) && (
            <Section
              id="kosik-ridic-nadpis"
              icon={CarFront}
              title={copy.driver.title}
              lead={copy.driver.lead}
              note={isTier(trip.insurance) ? undefined : <Note id="addonFields" />}
            >
              <Field
                id="kosik-ridic"
                label={copy.driver.name}
                value={form.driver ?? contactName}
                onChange={(event) => set('driver', event.target.value)}
                onBlur={blur('kosik-ridic')}
                error={errorFor('kosik-ridic')}
              />
              <label
                htmlFor="kosik-ridic-vek"
                className="mt-4 flex min-h-11 cursor-pointer items-start gap-3"
              >
                <input
                  id="kosik-ridic-vek"
                  type="checkbox"
                  checked={form.driverAge}
                  onChange={(event) => set('driverAge', event.target.checked)}
                  aria-invalid={errorFor('kosik-ridic-vek') ? true : undefined}
                  aria-describedby="kosik-ridic-vek-napoveda"
                  className="mt-0.5 size-5 shrink-0 accent-cobalt"
                />
                <span className="text-sm font-medium text-cobalt-deep">
                  {copy.driver.age}
                  <span
                    id="kosik-ridic-vek-napoveda"
                    className="block text-xs font-normal text-muted"
                  >
                    {copy.driver.ageHint}
                  </span>
                </span>
              </label>
              {errorFor('kosik-ridic-vek') && (
                <FieldError id="kosik-ridic-vek-chyba">{errorFor('kosik-ridic-vek')}</FieldError>
              )}
            </Section>
          )}

          {short && <CartOffer />}

          <Section id="kosik-platba" icon={Wallet} title={copy.payment.title}>
            <fieldset aria-describedby="kosik-program-napoveda">
              <legend className="flex items-center gap-2 text-sm font-medium text-cobalt-deep">
                {copy.payment.programs}
                <Note id="programs" />
              </legend>
              <p id="kosik-program-napoveda" className="text-xs text-muted">
                {copy.payment.programsHint}
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {copy.payment.programList.map((program) => (
                  <Tile
                    key={program.id}
                    id={`kosik-program-${program.id}`}
                    name="program"
                    checked={form.program === program.id}
                    onSelect={() => set('program', program.id)}
                    icon={<ProgramLogo id={program.id} decorative />}
                    label={program.name}
                    hideLabel
                  />
                ))}
              </div>
              {errorFor(`kosik-program-${copy.payment.programList[0].id}`) && (
                <FieldError id="kosik-program-chyba">{copy.errors.program}</FieldError>
              )}
            </fieldset>

            <div className="mt-5">
              <label
                htmlFor="kosik-castka"
                className="flex items-center gap-2 text-sm font-medium text-cobalt-deep"
              >
                {copy.payment.amount}
                <Note id="benefitsAmount" />
              </label>
              <span className="mt-1.5 flex min-h-12 max-w-xs items-center rounded-[10px] border border-line bg-white px-3 focus-within:border-azure focus-within:ring-2 focus-within:ring-azure">
                <input
                  id="kosik-castka"
                  type="text"
                  inputMode="numeric"
                  value={amountValue}
                  aria-describedby="kosik-castka-napoveda"
                  onChange={(event) => {
                    const text = event.target.value.replace(/\D/g, '').slice(0, 7)
                    setAmountText(text)
                    set('amount', Number(text) || 0)
                  }}
                  onBlur={() => setAmountText(null)}
                  className="min-w-0 flex-1 bg-transparent py-3 text-[15px] font-semibold text-cobalt-deep outline-none"
                />
                <span className="text-muted">Kč</span>
              </span>
              <p
                id="kosik-castka-napoveda"
                className={`mt-1 text-xs ${pay.overLimit ? 'font-medium text-amber-ink' : 'text-muted'}`}
              >
                {pay.overLimit
                  ? copy.payment.amountMax
                  : copy.payment.amountHint(czk(trip.balance))}
              </p>
            </div>

            <div className="mt-5" aria-live="polite">
              {pay.topUp > 0 ? (
                <fieldset className="animate-rise">
                  <legend className="text-sm font-medium text-cobalt-deep">
                    {copy.payment.topUpTitle(czk(pay.topUp))}
                  </legend>
                  <p className="text-xs text-muted">{copy.payment.topUpHint}</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {copy.payment.methods.map((method) => (
                      <Tile
                        key={method.id}
                        id={`kosik-metoda-${method.id}`}
                        name="metoda"
                        checked={form.method === method.id}
                        onSelect={() => set('method', method.id)}
                        icon={
                          method.id === 'card' ? (
                            <CreditCard aria-hidden size={20} className="shrink-0 text-cobalt" />
                          ) : (
                            <Landmark aria-hidden size={20} className="shrink-0 text-cobalt" />
                          )
                        }
                        label={method.name}
                        hint={method.hint}
                      />
                    ))}
                  </div>
                </fieldset>
              ) : (
                <p className="flex animate-rise items-center gap-2 rounded-[12px] bg-positive-light px-4 py-3 text-sm font-semibold text-positive">
                  <Check aria-hidden size={18} strokeWidth={3} />
                  {copy.payment.covered}{' '}
                  <span className="font-normal">
                    {copy.payment.leftOver(czk(Math.max(trip.balance - pay.fromBenefits, 0)))}
                  </span>
                </p>
              )}
            </div>

            <div className="mt-4">
              <Optional label={copy.payment.voucher}>
                <div className="flex max-w-md items-end gap-2">
                  <Field
                    id="kosik-poukaz"
                    label={copy.payment.voucherLabel}
                    value={voucher}
                    onChange={(event) => setVoucher(event.target.value)}
                    className="min-w-0 flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => notify(copy.payment.voucherNote)}
                    className="inline-flex min-h-12 items-center rounded-[10px] border border-cobalt/30 bg-white px-4 text-sm font-medium text-cobalt hover:border-cobalt"
                  >
                    {copy.payment.voucherApply}
                  </button>
                </div>
              </Optional>
            </div>
          </Section>

          <Section
            id="kosik-souhlasy"
            icon={FileText}
            title={copy.consents.title}
            note={<Note id="consents" />}
          >
            <label className="flex min-h-11 cursor-pointer items-start gap-3">
              <input
                id="kosik-podminky"
                type="checkbox"
                checked={form.terms}
                onChange={(event) => set('terms', event.target.checked)}
                aria-invalid={errorFor('kosik-podminky') ? true : undefined}
                aria-describedby={errorFor('kosik-podminky') ? 'kosik-podminky-chyba' : undefined}
                className="mt-0.5 size-5 shrink-0 accent-cobalt"
              />
              <span className="text-sm text-ink">{copy.consents.terms}</span>
            </label>
            {errorFor('kosik-podminky') && (
              <FieldError id="kosik-podminky-chyba">{errorFor('kosik-podminky')}</FieldError>
            )}
            {pay.hasAddons && (
              <div className="mt-3 rounded-[12px] bg-surface-warm px-4 py-3 text-sm">
                <p className="font-medium text-cobalt-deep">{copy.consents.docs}</p>
                <ul className="mt-1 flex flex-wrap gap-x-4">
                  {[
                    ...(isTier(trip.insurance) ? copy.consents.insuranceDocs : []),
                    ...(isCar(trip.car) ? copy.consents.carDocs : []),
                  ].map((doc) => (
                    <li key={doc}>
                      <button
                        type="button"
                        onClick={() => notify(copy.consents.docNote)}
                        className="inline-flex min-h-9 items-center gap-1 text-cobalt underline underline-offset-4"
                      >
                        <FileText aria-hidden size={14} />
                        {doc}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <label className="mt-3 flex min-h-11 cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.marketing}
                onChange={(event) => set('marketing', event.target.checked)}
                className="mt-0.5 size-5 shrink-0 accent-cobalt"
              />
              <span className="text-sm text-ink">{copy.consents.marketing}</span>
            </label>
          </Section>

          <div data-reveal className="rounded-(--radius-card) bg-azure-light p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{copy.next.title}</h2>
              <Note id="whatNext" />
            </div>
            <ul className="mt-3 space-y-2 text-sm text-cobalt-deep">
              {[
                copy.next.stay,
                ...(isTier(trip.insurance) ? [copy.next.insurance] : []),
                ...(isCar(trip.car) ? [copy.next.car] : []),
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check aria-hidden size={16} className="mt-0.5 shrink-0 text-positive" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <button
              type="submit"
              className="flex min-h-14 w-full items-center justify-center gap-2 rounded-[10px] bg-coral-600 px-5 text-lg font-medium text-white shadow-cta transition hover:bg-coral-700"
            >
              <Lock aria-hidden size={18} />
              {payLabel}
            </button>
            <Note id="payButton" className="absolute -top-2 -right-2" />
          </div>
        </form>
      </div>
    </div>
  )
}
