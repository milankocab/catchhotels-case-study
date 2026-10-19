import { useId, useState } from 'react'
import { Car, ShieldCheck, type LucideIcon } from 'lucide-react'
import { calculator as t } from '../content'
import { calculateImpact, formatCzk, formatNumber, type CategoryInput } from './impact'

interface FieldSpec {
  key: keyof CategoryInput
  label: string
  unit: string
  min: number
  max: number
  step: number
}

const INSURANCE_FIELDS: FieldSpec[] = [
  { key: 'attachPct', label: t.fields.attach, unit: '%', min: 0, max: 40, step: 0.5 },
  { key: 'price', label: t.fields.price, unit: 'Kč', min: 100, max: 3000, step: 50 },
  { key: 'commissionPct', label: t.fields.commission, unit: '%', min: 0, max: 50, step: 1 },
]

const CAR_FIELDS: FieldSpec[] = [
  { key: 'attachPct', label: t.fields.attach, unit: '%', min: 0, max: 20, step: 0.5 },
  { key: 'price', label: t.fields.price, unit: 'Kč', min: 1000, max: 15000, step: 100 },
  { key: 'commissionPct', label: t.fields.commission, unit: '%', min: 0, max: 30, step: 1 },
]

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/** Posuvník propojený s číselným polem. Pole přijme i hodnotu mimo rozsah posuvníku. */
function SliderField({
  spec,
  value,
  onChange,
}: {
  spec: FieldSpec
  value: number
  onChange: (value: number) => void
}) {
  const id = useId()
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={`${id}-number`} className="text-sm font-medium text-cobalt-deep">
          {spec.label}
        </label>
        <div className="flex items-center gap-1.5">
          <input
            id={`${id}-number`}
            type="number"
            inputMode="decimal"
            min={0}
            step={spec.step}
            value={Number.isFinite(value) ? value : ''}
            onChange={(event) => onChange(Math.max(0, Number(event.target.value)))}
            className="h-11 w-24 rounded-[10px] border border-line bg-white px-2 text-right tabular-nums focus:border-azure focus:outline-2 focus:outline-azure"
          />
          <span className="w-5 text-sm text-muted">{spec.unit}</span>
        </div>
      </div>
      <input
        type="range"
        aria-label={spec.label}
        min={spec.min}
        max={spec.max}
        step={spec.step}
        value={clamp(value, spec.min, spec.max)}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full"
      />
    </div>
  )
}

function CategoryPanel({
  title,
  icon: Icon,
  fields,
  value,
  onChange,
}: {
  title: string
  icon: LucideIcon
  fields: FieldSpec[]
  value: CategoryInput
  onChange: (value: CategoryInput) => void
}) {
  return (
    <fieldset className="rounded-(--radius-card) bg-white p-4 shadow-soft sm:p-5">
      <legend className="sr-only">{title}</legend>
      <p
        aria-hidden
        className="flex items-center gap-2 font-heading font-semibold text-cobalt-deep"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-cream">
          <Icon size={20} className="text-cobalt" />
        </span>
        {title}
      </p>
      <div className="mt-3 space-y-1">
        {fields.map((spec) => (
          <SliderField
            key={spec.key}
            spec={spec}
            value={value[spec.key]}
            onChange={(next) => onChange({ ...value, [spec.key]: next })}
          />
        ))}
      </div>
    </fieldset>
  )
}

export function ImpactCalculator() {
  const d = t.defaults
  const [bookings, setBookings] = useState<number>(t.bookingsOptions[0].value)
  const [insurance, setInsurance] = useState<CategoryInput>({
    attachPct: d.insuranceAttach,
    price: d.insurancePrice,
    commissionPct: d.insuranceCommission,
  })
  const [car, setCar] = useState<CategoryInput>({
    attachPct: d.carAttach,
    price: d.carPrice,
    commissionPct: d.carCommission,
  })

  const result = calculateImpact({ bookings, insurance, car })

  const outputs = [
    {
      label: t.results.units,
      value: formatNumber(result.units),
      note: t.unitsBreakdown(formatNumber(result.insurance.units), formatNumber(result.car.units)),
    },
    { label: t.results.turnover, value: formatCzk(result.turnover) },
    { label: t.results.revenue, value: formatCzk(result.revenue) },
    { label: t.results.perBooking, value: formatCzk(result.revenuePerBooking, true), main: true },
  ]

  return (
    <div className="rounded-(--radius-card) bg-surface-warm p-4 sm:p-6">
      <fieldset>
        <legend className="text-sm font-medium text-cobalt-deep">{t.bookingsLabel}</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {t.bookingsOptions.map((option) => (
            <label
              key={option.value}
              className="flex min-h-14 flex-col justify-center rounded-[10px] border-2 border-line bg-white px-3 py-2 has-checked:border-cobalt has-checked:bg-azure-light has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-cobalt"
            >
              <input
                type="radio"
                name="bookings"
                className="sr-only"
                checked={bookings === option.value}
                onChange={() => setBookings(option.value)}
              />
              <span className="font-heading font-semibold text-cobalt-deep tabular-nums">
                {option.label}
              </span>
              <span className="text-xs text-muted">{option.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <CategoryPanel
          title={t.insuranceTitle}
          icon={ShieldCheck}
          fields={INSURANCE_FIELDS}
          value={insurance}
          onChange={setInsurance}
        />
        <CategoryPanel
          title={t.carTitle}
          icon={Car}
          fields={CAR_FIELDS}
          value={car}
          onChange={setCar}
        />
      </div>

      <div aria-live="polite" className="mt-4">
        <p className="font-heading text-sm font-semibold text-cobalt-deep">{t.resultsTitle}</p>
        <dl className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {outputs.map((output) => (
            <div
              key={output.label}
              className={`rounded-[10px] p-3 ${output.main ? 'bg-cobalt text-white' : 'bg-white shadow-soft'}`}
            >
              <dt className={`text-xs ${output.main ? 'text-azure-light' : 'text-muted'}`}>
                {output.label}
              </dt>
              <dd
                className={`mt-1 font-heading text-lg font-semibold tabular-nums sm:text-xl ${output.main ? 'text-white' : 'text-cobalt-deep'}`}
              >
                {output.value}
              </dd>
              {output.note && <dd className="mt-0.5 text-xs text-muted">{output.note}</dd>}
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
