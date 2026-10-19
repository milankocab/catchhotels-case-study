import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  Car,
  Check,
  CircleCheck,
  CreditCard,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import { prototype as t } from '../content'
import { formatCzk, formatNumber } from '../calculator/impact'
import { Logo } from '../components/Logo'
import { calculateCart } from './cart'

type Step = 0 | 1 | 2 | 3
type InsuranceId = (typeof t.data.insurance)[number]['id']
type CarId = (typeof t.data.cars)[number]['id']

const points = (value: number) => `${formatNumber(value)} bodů`

function RadioCard({
  name,
  checked,
  onChange,
  children,
}: {
  name: string
  checked: boolean
  onChange: () => void
  children: ReactNode
}) {
  return (
    <label className="flex min-h-12 items-start gap-3 rounded-[10px] border-2 border-line bg-white p-3 transition-colors has-checked:border-cobalt has-checked:bg-azure-light has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-cobalt">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${checked ? 'border-cobalt bg-cobalt' : 'border-muted/50 bg-white'}`}
      >
        {checked && <Check size={12} strokeWidth={3} className="text-white" />}
      </span>
      <span className="min-w-0 flex-1">{children}</span>
    </label>
  )
}

function PrimaryButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-coral-600 px-5 font-medium text-white shadow-cta transition hover:bg-coral-700 active:scale-[0.98]"
    >
      {children}
      <ArrowRight aria-hidden size={16} />
    </button>
  )
}

function SecondaryButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-11 w-full items-center justify-center rounded-full border-[1.5px] border-cobalt/40 bg-white px-5 font-medium text-cobalt transition hover:bg-azure-light"
    >
      {children}
    </button>
  )
}

function HotelCard() {
  const d = t.data
  return (
    <div className="overflow-hidden rounded-(--radius-card) bg-white shadow-soft">
      {/* Ilustrace místo fotky. Prototyp nepoužívá fotografie skutečných hotelů. */}
      <div
        aria-hidden
        className="relative h-28 bg-gradient-to-b from-azure-light via-azure to-cobalt"
      >
        <span className="absolute top-4 right-8 size-10 rounded-full bg-amber/90" />
        <svg
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
          className="absolute bottom-0 h-12 w-full"
        >
          <path d="M0 30 Q100 5 200 28 T400 22 V60 H0Z" fill="#075B96" opacity="0.55" />
          <path d="M0 45 Q120 25 240 44 T400 40 V60 H0Z" fill="#033D64" />
        </svg>
      </div>
      <div className="p-4">
        <p className="font-heading font-semibold text-cobalt-deep">{d.hotel}</p>
        <ul className="mt-2 space-y-1.5 text-sm">
          <li className="flex items-center gap-2">
            <MapPin aria-hidden size={16} className="text-cobalt" /> {d.place}
          </li>
          <li className="flex items-center gap-2">
            <CalendarDays aria-hidden size={16} className="text-cobalt" /> {d.dates}, {d.nights}
          </li>
          <li className="flex items-center gap-2">
            <Users aria-hidden size={16} className="text-cobalt" /> {d.guests}
          </li>
          <li className="flex items-center gap-2">
            <BedDouble aria-hidden size={16} className="text-cobalt" /> {d.room}
          </li>
        </ul>
      </div>
    </div>
  )
}

export function Prototype() {
  const [step, setStep] = useState<Step>(0)
  const [insuranceId, setInsuranceId] = useState<InsuranceId | null>(null)
  const [carId, setCarId] = useState<CarId | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  const d = t.data
  const insurance = d.insurance.find((item) => item.id === insuranceId) ?? null
  const car = d.cars.find((item) => item.id === carId) ?? null
  const cart = calculateCart({
    accommodation: d.price,
    insurance: insurance?.price ?? 0,
    car: car?.price ?? 0,
    pointsBalance: d.pointsBalance,
  })

  // Po změně kroku přesunu fokus na nadpis kroku a vrátím začátek prototypu do zorného pole.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus({ preventScroll: true })
    const top = frameRef.current?.getBoundingClientRect().top ?? 0
    if (top < 0) frameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  const go = (next: Step) => setStep(next)
  const restart = () => {
    setInsuranceId(null)
    setCarId(null)
    setStep(0)
  }

  const heading = (text: string) => (
    <h3 ref={headingRef} tabIndex={-1} className="text-xl font-semibold outline-none sm:text-2xl">
      {text}
    </h3>
  )

  return (
    <div
      ref={frameRef}
      className="mx-auto w-full max-w-[420px] scroll-mt-4 overflow-hidden rounded-[28px] border border-line bg-page shadow-lift"
    >
      {/* Hlavička rámečku */}
      <div className="flex items-center justify-between gap-2 border-b border-line bg-white px-4 py-3">
        <Logo compact />
        <span className="rounded-md bg-amber-light px-2 py-1 text-[11px] font-medium text-amber-ink">
          {t.frameLabel}
        </span>
      </div>

      {/* Ukazatel kroků */}
      <ol className="flex gap-1.5 bg-white px-4 pt-3 pb-3" aria-label="Kroky rezervace">
        {t.steps.map((label, index) => (
          <li key={label} className="flex-1" aria-current={index === step ? 'step' : undefined}>
            <span
              className={`block h-1.5 rounded-full ${index <= step ? 'bg-coral' : 'bg-line'}`}
            />
            <span
              className={`mt-1 block text-[11px] ${index === step ? 'font-semibold text-cobalt-deep' : 'text-muted'}`}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div key={step} className="animate-rise space-y-4 px-4 pt-4 pb-5">
        {step > 0 && step < 3 && (
          <button
            type="button"
            onClick={() => go((step - 1) as Step)}
            className="-ml-1 inline-flex min-h-11 items-center gap-1 px-1 text-sm font-medium text-cobalt"
          >
            <ArrowLeft aria-hidden size={16} /> {t.back}
          </button>
        )}

        {step === 0 && (
          <>
            {heading(t.summary.title)}
            <HotelCard />
            <dl className="space-y-2 rounded-(--radius-card) bg-white p-4 text-sm shadow-soft">
              <div className="flex justify-between gap-3">
                <dt>{t.summary.priceLabel}</dt>
                <dd className="text-right">
                  <span className="block font-heading font-semibold text-cobalt-deep tabular-nums">
                    {points(d.price)}
                  </span>
                  <span className="text-muted tabular-nums">{formatCzk(d.price)}</span>
                </dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-line pt-2">
                <dt>{t.summary.balanceLabel}</dt>
                <dd className="tabular-nums">{points(d.pointsBalance)}</dd>
              </div>
              <p className="text-xs text-muted">{d.pointValueNote}</p>
            </dl>
            <PrimaryButton onClick={() => go(1)}>{t.summary.cta}</PrimaryButton>
          </>
        )}

        {step === 1 && (
          <>
            {heading(t.addons.title)}
            <p className="text-sm">{t.addons.lead}</p>

            <fieldset className="space-y-2">
              <legend className="mb-2 flex items-start gap-2">
                <ShieldCheck aria-hidden size={20} className="mt-0.5 text-cobalt" />
                <span>
                  <span className="block font-heading font-semibold text-cobalt-deep">
                    {t.addons.insuranceTitle}
                  </span>
                  <span className="text-sm text-muted">{t.addons.insuranceLead}</span>
                </span>
              </legend>
              {d.insurance.map((item) => (
                <RadioCard
                  key={item.id}
                  name="insurance"
                  checked={insuranceId === item.id}
                  onChange={() => setInsuranceId(item.id)}
                >
                  <span className="flex justify-between gap-2">
                    <span className="font-medium text-cobalt-deep">{item.name}</span>
                    <span className="font-medium whitespace-nowrap tabular-nums text-cobalt-deep">
                      {points(item.price)}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">{item.perks.join(' · ')}</span>
                </RadioCard>
              ))}
              <RadioCard
                name="insurance"
                checked={insuranceId === null}
                onChange={() => setInsuranceId(null)}
              >
                <span className="text-sm">{t.addons.none}</span>
              </RadioCard>
            </fieldset>

            <fieldset className="space-y-2 pt-2">
              <legend className="mb-2 flex items-start gap-2">
                <Car aria-hidden size={20} className="mt-0.5 text-cobalt" />
                <span>
                  <span className="block font-heading font-semibold text-cobalt-deep">
                    {t.addons.carTitle}
                  </span>
                  <span className="text-sm text-muted">{t.addons.carLead}</span>
                </span>
              </legend>
              {d.cars.map((item) => (
                <RadioCard
                  key={item.id}
                  name="car"
                  checked={carId === item.id}
                  onChange={() => setCarId(item.id)}
                >
                  <span className="flex justify-between gap-2">
                    <span className="font-medium text-cobalt-deep">{item.name}</span>
                    <span className="font-medium whitespace-nowrap tabular-nums text-cobalt-deep">
                      {points(item.price)}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">{item.example}</span>
                </RadioCard>
              ))}
              <RadioCard name="car" checked={carId === null} onChange={() => setCarId(null)}>
                <span className="text-sm">{t.addons.noCar}</span>
              </RadioCard>
            </fieldset>

            <div className="space-y-2 pt-2">
              {insurance || car ? (
                <PrimaryButton onClick={() => go(2)}>{t.addons.cta}</PrimaryButton>
              ) : (
                <SecondaryButton onClick={() => go(2)}>{t.addons.skip}</SecondaryButton>
              )}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {heading(t.cart.title)}
            <ul className="divide-y divide-line rounded-(--radius-card) bg-white px-4 shadow-soft">
              <CartLine
                icon={<BedDouble size={18} />}
                label={t.cart.accommodation}
                detail={d.hotel}
                amount={d.price}
              />
              {insurance && (
                <CartLine
                  icon={<ShieldCheck size={18} />}
                  label={t.cart.insurance}
                  detail={insurance.name}
                  amount={insurance.price}
                  onRemove={() => setInsuranceId(null)}
                />
              )}
              {car && (
                <CartLine
                  icon={<Car size={18} />}
                  label={t.cart.car}
                  detail={car.name}
                  amount={car.price}
                  onRemove={() => setCarId(null)}
                />
              )}
              <li className="flex justify-between gap-3 py-3 font-heading font-semibold text-cobalt-deep">
                <span>{t.cart.total}</span>
                <span className="tabular-nums">{points(cart.total)}</span>
              </li>
            </ul>

            <div className="rounded-(--radius-card) bg-white p-4 shadow-soft">
              <p className="font-heading font-semibold text-cobalt-deep">{t.cart.payTitle}</p>
              <div
                className="mt-3 flex h-3 overflow-hidden rounded-full bg-line"
                role="img"
                aria-label={`${t.cart.points} ${points(cart.paidByPoints)}, ${t.cart.card} ${formatCzk(cart.paidByCard)}`}
              >
                <span className="bg-cobalt" style={{ width: `${cart.pointsShare * 100}%` }} />
                <span className="bg-coral" style={{ width: `${(1 - cart.pointsShare) * 100}%` }} />
              </div>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2">
                    <Sparkles aria-hidden size={16} className="text-cobalt" /> {t.cart.points}
                  </dt>
                  <dd className="font-medium tabular-nums">{points(cart.paidByPoints)}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2">
                    <CreditCard aria-hidden size={16} className="text-coral-600" /> {t.cart.card}
                  </dt>
                  <dd className="font-medium tabular-nums">{formatCzk(cart.paidByCard)}</dd>
                </div>
              </dl>
              {cart.paidByCard === 0 && <p className="mt-2 text-xs text-muted">{t.cart.noCard}</p>}
            </div>

            <PrimaryButton onClick={() => go(3)}>{t.cart.cta}</PrimaryButton>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex justify-center pt-2">
              <CircleCheck aria-hidden size={56} className="text-positive" />
            </div>
            <div className="text-center">{heading(t.done.title)}</div>
            <p className="text-center text-sm">{t.done.lead}</p>
            <dl className="rounded-(--radius-card) bg-white p-4 text-sm shadow-soft">
              <dt className="text-muted">{t.done.booking}</dt>
              <dd className="font-heading font-semibold text-cobalt-deep">{t.done.bookingValue}</dd>
            </dl>
            <div className="rounded-(--radius-card) bg-azure-light p-4 text-sm">
              <p className="font-heading font-semibold text-cobalt-deep">{t.done.next}</p>
              <ul className="mt-2 space-y-1.5">
                <li className="flex gap-2">
                  <Check aria-hidden size={16} className="mt-0.5 shrink-0 text-positive" />
                  {t.done.nextItems[0]}
                </li>
                {insurance && (
                  <li className="flex gap-2">
                    <Check aria-hidden size={16} className="mt-0.5 shrink-0 text-positive" />
                    {t.done.nextItems[1]}
                  </li>
                )}
                {car && (
                  <li className="flex gap-2">
                    <Check aria-hidden size={16} className="mt-0.5 shrink-0 text-positive" />
                    {t.done.nextItems[2]}
                  </li>
                )}
              </ul>
            </div>
            <SecondaryButton onClick={restart}>
              <RotateCcw aria-hidden size={16} className="mr-2" />
              {t.restart}
            </SecondaryButton>
          </>
        )}
      </div>
    </div>
  )
}

function CartLine({
  icon,
  label,
  detail,
  amount,
  onRemove,
}: {
  icon: ReactNode
  label: string
  detail: string
  amount: number
  onRemove?: () => void
}) {
  return (
    <li className="flex items-center gap-3 py-3">
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cream text-cobalt"
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-cobalt-deep">{label}</span>
        <span className="block truncate text-xs text-muted">{detail}</span>
      </span>
      <span className="text-sm font-medium whitespace-nowrap tabular-nums">{points(amount)}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`${t.cart.remove} ${label.toLowerCase()}`}
          className="-mr-2 flex size-11 shrink-0 items-center justify-center rounded-full text-muted hover:bg-surface-warm hover:text-cobalt"
        >
          <X aria-hidden size={16} />
        </button>
      )}
    </li>
  )
}
