import { useState, type CSSProperties } from 'react'
import { BedDouble, CarFront, Check, Minus, Plus, ShieldCheck, Sparkles } from 'lucide-react'
import {
  czk,
  placeholder,
  tripBuilder as copy,
  type AddonKind,
  type StayId,
  type TripPart,
} from '../../content-prototyp'
import { Note } from '../components/Note'
import { useCountUp } from '../motion'
import { useTrip } from '../trip/state'
import { usePrototype } from '../state'
import { tripTotals, type Preset } from './trip'

const PART_ICONS = { car: CarFront, stay: BedDouble, insurance: ShieldCheck } as const
// Pořadí na časové ose podle kapitoly 8.5.
const PARTS: TripPart[] = ['car', 'stay', 'insurance']

function PartCard({
  part,
  preset,
  added,
  onToggle,
}: {
  part: TripPart
  preset: Preset
  added: boolean
  onToggle: () => void
}) {
  const { notify } = usePrototype()
  const Icon = PART_ICONS[part]
  const label = copy.partLabels[part]
  const recommended = part !== 'stay' && preset.recommended === part
  const item = preset[part]
  const detail = 'detail' in item ? item.detail : `${item.place} · ${item.dates}`

  if (!added) {
    return (
      <div className="flex h-full flex-col items-start gap-3 rounded-(--radius-card) border-2 border-dashed border-cobalt/25 bg-white/60 p-4">
        <div className="flex w-full flex-wrap items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-azure-light text-cobalt">
            <Icon aria-hidden size={20} />
          </span>
          <span className="font-heading font-semibold text-cobalt-deep">{label}</span>
          {recommended && (
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-light px-2.5 py-1 text-xs font-semibold text-amber-ink">
              <Sparkles aria-hidden size={12} />
              {copy.recommended}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="mt-auto inline-flex min-h-11 items-center gap-2 rounded-full border border-cobalt/30 bg-white px-4 text-sm font-medium text-cobalt transition hover:border-cobalt hover:bg-azure-light"
        >
          <Plus aria-hidden size={16} />
          {copy.add(label, czk(item.price))}
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full animate-rise flex-col gap-3 rounded-(--radius-card) bg-white p-4 shadow-soft">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-cobalt text-white">
          <Icon aria-hidden size={20} />
        </span>
        <span className="text-sm font-medium text-muted">{label}</span>
        <Check aria-hidden size={18} className="ml-auto text-positive" />
      </div>
      <div>
        <p className="font-heading font-semibold text-cobalt-deep">{item.name}</p>
        <p className="mt-0.5 text-sm text-muted">{detail}</p>
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
        <span className="font-semibold text-cobalt-deep">{czk(item.price)}</span>
        <span className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => notify(placeholder.category)}
            className="min-h-11 px-2 text-sm font-medium text-cobalt underline-offset-4 hover:underline"
          >
            {copy.more}
          </button>
          {part !== 'stay' && (
            <button
              type="button"
              onClick={onToggle}
              aria-label={`${copy.remove}: ${label}`}
              className="inline-flex min-h-11 items-center gap-1 rounded-full px-2 text-sm text-muted hover:bg-surface-warm hover:text-coral-700"
            >
              <Minus aria-hidden size={16} />
              {copy.remove}
            </button>
          )}
        </span>
      </div>
    </div>
  )
}

/** Trip builder „Sestavte si cestu za benefity“ (kapitola 8.5). */
export function TripBuilder() {
  const { startTrip } = useTrip()
  const [presetId, setPresetId] = useState<string>(copy.presets[1].id)
  const [added, setAdded] = useState<AddonKind[]>([])
  const [balanceText, setBalanceText] = useState(String(copy.defaultBalance))
  const preset = copy.presets.find((item) => item.id === presetId) ?? copy.presets[0]
  const balance = Number(balanceText) || 0
  const { total, fromBenefits, topUp, left } = tripTotals(preset, added, balance)
  const shownTotal = useCountUp(total)
  const shownFromBenefits = useCountUp(fromBenefits)
  const share = total > 0 ? fromBenefits / total : 0

  const choosePreset = (id: string) => {
    setPresetId(id)
    setAdded([])
  }
  const toggle = (part: AddonKind) =>
    setAdded((list) =>
      list.includes(part) ? list.filter((item) => item !== part) : [...list, part],
    )

  return (
    <section id="cesta" aria-labelledby="cesta-nadpis" className="scroll-mt-20 px-4 pt-16">
      <div className="mx-auto max-w-6xl rounded-[24px] bg-cream/60 p-5 sm:p-8" data-reveal>
        <div className="flex items-center gap-2">
          <h2 id="cesta-nadpis" className="text-2xl font-bold sm:text-3xl">
            {copy.title}
          </h2>
          <Note id="tripBuilder" />
        </div>
        <p className="mt-2 max-w-2xl text-ink">{copy.lead}</p>

        <div role="radiogroup" aria-label={copy.presetsLabel} className="mt-5 flex flex-wrap gap-2">
          {copy.presets.map((item) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={item.id === presetId}
              onClick={() => choosePreset(item.id)}
              className={`min-h-11 rounded-full px-4 text-sm font-medium transition-colors ${
                item.id === presetId
                  ? 'bg-cobalt-deep text-white'
                  : 'bg-white text-cobalt shadow-soft hover:bg-azure-light'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-6">
          {/* Části cesty v pořadí, jak jdou po sobě. Na desktopu vedle sebe, na mobilu pod sebou. */}
          <ol className="grid gap-4 lg:grid-cols-3">
            {PARTS.map((part, index) => (
              <li
                key={`${preset.id}-${part}`}
                data-reveal
                style={{ '--reveal-delay': `${index * 90}ms` } as CSSProperties}
              >
                <PartCard
                  part={part}
                  preset={preset}
                  added={part === 'stay' || added.includes(part)}
                  onToggle={() => part !== 'stay' && toggle(part)}
                />
              </li>
            ))}
          </ol>

          <aside
            aria-labelledby="souhrn-nadpis"
            data-reveal
            className="grid gap-5 rounded-(--radius-card) bg-white p-5 shadow-lift lg:grid-cols-[260px_minmax(0,1fr)_auto] lg:items-end lg:gap-8"
          >
            <h3 id="souhrn-nadpis" className="font-heading text-lg font-semibold lg:sr-only">
              {copy.summaryTitle}
            </h3>
            <label className="block">
              <span className="flex items-center gap-2 text-sm font-medium text-cobalt-deep">
                {copy.balanceLabel}
                <Note id="coverage" />
              </span>
              <span className="mt-1.5 flex min-h-12 items-center rounded-[10px] border border-line px-3 focus-within:border-azure focus-within:ring-2 focus-within:ring-azure">
                <input
                  type="text"
                  inputMode="numeric"
                  value={balanceText}
                  onChange={(event) =>
                    setBalanceText(event.target.value.replace(/\D/g, '').slice(0, 7))
                  }
                  className="min-w-0 flex-1 bg-transparent py-3 text-[15px] font-semibold text-cobalt-deep outline-none"
                />
                <span className="text-muted">Kč</span>
              </span>
              <span className="mt-1 block text-xs text-muted">{copy.balanceHint}</span>
            </label>

            <dl className="space-y-1.5 text-sm" aria-live="polite">
              <div className="flex justify-between">
                <dt className="text-muted">{copy.total}</dt>
                <dd className="font-semibold text-cobalt-deep tabular-nums">{czk(shownTotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">{copy.fromBenefits}</dt>
                <dd className="font-semibold text-positive tabular-nums">
                  {czk(shownFromBenefits)}
                </dd>
              </div>
              <div
                className="mt-2 flex h-3 overflow-hidden rounded-full bg-coral-light"
                role="img"
                aria-label={topUp > 0 ? copy.topUp(czk(topUp)) : copy.covered}
              >
                <span
                  className="h-full rounded-full bg-positive transition-[width] duration-500"
                  style={{ width: `${Math.round(share * 100)}%` }}
                />
              </div>
              <p className={`pt-1 font-semibold ${topUp > 0 ? 'text-coral-700' : 'text-positive'}`}>
                {topUp > 0 ? copy.topUp(czk(topUp)) : copy.covered}
              </p>
              {topUp === 0 && left > 0 && (
                <p className="text-xs text-muted">{copy.leftOver(czk(left))}</p>
              )}
            </dl>

            <button
              type="button"
              onClick={() =>
                startTrip({
                  stayId: preset.id as StayId,
                  insurance: added.includes('insurance') ? 'basic' : null,
                  car: added.includes('car') ? 'small' : null,
                  balance,
                })
              }
              className="flex min-h-12 w-full items-center justify-center rounded-[10px] bg-coral-600 px-6 font-medium text-white shadow-cta transition hover:bg-coral-700 lg:w-auto"
            >
              {copy.cta}
            </button>
          </aside>
        </div>
      </div>
    </section>
  )
}
