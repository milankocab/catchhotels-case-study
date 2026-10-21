import type { ReactNode } from 'react'
import {
  BedDouble,
  CalendarDays,
  CarFront,
  Check,
  FileText,
  MapPin,
  Minus,
  Plus,
  Puzzle,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { bookingSection, czk, guide, tripBuilder, type GuidePath } from '../../content-prototyp'

// Ukázková data jsou z cesty k moři v trip builderu, ať čísla na stránce sedí.
const sea = tripBuilder.presets[1]
const ext = bookingSection.extension
const m = guide.mock

/** Místo, kam by uživatel klikl. Pulzující kroužek, při vypnutých animacích jen tečka. */
function Tap({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute size-9 ${className}`}>
      <span className="absolute inset-0 animate-tap rounded-full bg-coral/50" />
      <span className="absolute inset-[13px] rounded-full bg-coral-600 ring-2 ring-white" />
    </span>
  )
}

function Line({ w = 'w-full', className = '' }: { w?: string; className?: string }) {
  return <span aria-hidden className={`block h-2.5 rounded-full bg-line ${w} ${className}`} />
}

function Typed({ children }: { children: string }) {
  return <span className="inline-block animate-type whitespace-nowrap">{children}</span>
}

function Field({ icon: Icon, children }: { icon: typeof MapPin; children: ReactNode }) {
  return (
    <span className="flex h-10 items-center gap-2 rounded-[8px] border border-line bg-white px-3 text-sm text-cobalt-deep">
      <Icon aria-hidden size={16} className="shrink-0 text-cobalt" />
      {children}
    </span>
  )
}

function Button({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`relative flex h-10 items-center justify-center gap-2 rounded-[8px] bg-coral-600 px-4 text-sm font-medium text-white ${className}`}
    >
      {children}
    </span>
  )
}

function HotelRow({
  name,
  price,
  children,
}: {
  name: string
  price?: string
  children?: ReactNode
}) {
  return (
    <span className="relative flex gap-3 rounded-[10px] bg-white p-2.5 shadow-soft">
      <span
        aria-hidden
        className="size-14 shrink-0 rounded-[8px] bg-gradient-to-br from-azure to-cobalt/60"
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-cobalt-deep">{name}</span>
        <Line w="w-2/3" className="mt-2" />
        {price && (
          <span className="mt-1.5 block text-xs font-semibold text-cobalt-deep">{price}</span>
        )}
      </span>
      {children}
    </span>
  )
}

function screen(path: GuidePath, step: number): ReactNode {
  if (path === 'web') {
    switch (step) {
      case 0:
        return (
          <div className="space-y-2.5">
            <Field icon={MapPin}>
              <Typed>{m.place}</Typed>
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field icon={CalendarDays}>{m.dates}</Field>
              <Field icon={Users}>{m.guests}</Field>
            </div>
            <Button>
              <Search aria-hidden size={16} /> {m.search}
              <Tap className="-right-2 -bottom-3" />
            </Button>
          </div>
        )
      case 1:
        return (
          <div className="space-y-2.5">
            <HotelRow name={m.results[0].name} price={`od ${czk(m.results[0].price)}`} />
            <HotelRow name={sea.stay.name} price={czk(sea.stay.price)}>
              <span className="relative self-end rounded-[6px] bg-coral-600 px-2 py-1 text-[11px] font-medium text-white">
                {m.options}
                <Tap className="-right-3 -bottom-4" />
              </span>
            </HotelRow>
            <HotelRow name={m.results[1].name} price={`od ${czk(m.results[1].price)}`} />
          </div>
        )
      case 2:
        return (
          <div className="space-y-2.5">
            {[
              [m.rooms[0], sea.stay.price, 1],
              [m.rooms[1], m.seaViewPrice, 0],
            ].map(([name, price, count]) => (
              <span
                key={name}
                className="relative flex items-center gap-3 rounded-[10px] bg-white p-3 shadow-soft"
              >
                <BedDouble aria-hidden size={18} className="shrink-0 text-cobalt" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-cobalt-deep">
                    {name}
                  </span>
                  <span className="text-xs text-muted">
                    {czk(Number(price))} {m.perStay}
                  </span>
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold text-cobalt-deep">
                  <Minus aria-hidden size={16} className="text-muted" />
                  {count}
                  <span className="relative">
                    <Plus aria-hidden size={16} className="text-cobalt" />
                    {count === 1 && <Tap className="-top-[10px] -left-[10px]" />}
                  </span>
                </span>
              </span>
            ))}
          </div>
        )
      case 3:
        return (
          <div className="space-y-2.5">
            {m.formLabels.map((label, index) => (
              <span key={label} className="block">
                <span className="text-xs text-muted">{label}</span>
                <span className="mt-1 flex h-9 items-center rounded-[8px] border border-line bg-white px-3 text-sm text-cobalt-deep">
                  {index === 0 ? <Typed>{m.typedName}</Typed> : <Line w="w-1/2" />}
                </span>
              </span>
            ))}
          </div>
        )
      case 4:
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
              {m.programs.map((program, index) => (
                <span
                  key={program}
                  className={`relative rounded-[8px] py-2.5 ${index === 1 ? 'bg-cobalt text-white' : 'bg-white text-cobalt-deep shadow-soft'}`}
                >
                  {program}
                  {index === 1 && <Tap className="-right-3 -bottom-4" />}
                </span>
              ))}
            </div>
            <span className="block rounded-[10px] bg-white p-3 text-sm shadow-soft">
              <span className="flex justify-between">
                <span className="text-muted">{m.fromBenefits}</span>
                <strong className="text-positive">{czk(m.benefitsPaid)}</strong>
              </span>
              <span className="mt-1 flex justify-between">
                <span className="text-muted">{m.topUp}</span>
                <strong className="text-cobalt-deep">{czk(m.topUpPaid)}</strong>
              </span>
              <span className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-coral-light">
                <span className="h-full w-[95%] origin-left animate-fill rounded-full bg-positive" />
              </span>
            </span>
          </div>
        )
      default:
        return (
          <div className="flex flex-col items-center gap-3 py-2 text-center">
            <span className="flex size-14 animate-rise items-center justify-center rounded-full bg-positive text-white">
              <Check aria-hidden size={28} />
            </span>
            <span className="font-heading font-semibold text-cobalt-deep">{m.paid}</span>
            <span className="w-full space-y-1.5">
              {m.docs.map((doc) => (
                <span
                  key={doc}
                  className="flex items-center gap-2 rounded-[8px] bg-white px-3 py-2 text-left text-sm text-cobalt-deep shadow-soft"
                >
                  <FileText aria-hidden size={16} className="text-cobalt" />
                  {doc}
                </span>
              ))}
            </span>
          </div>
        )
    }
  }

  if (path === 'extension') {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col items-center gap-3 py-2 text-center">
            <span className="flex size-14 items-center justify-center rounded-[14px] bg-coral-600 text-white">
              <Puzzle aria-hidden size={26} />
            </span>
            <span className="font-heading font-semibold text-cobalt-deep">{ext.title}</span>
            <Line w="w-3/4" />
            <Button className="w-full">
              {ext.cta}
              <Tap className="-right-2 -bottom-3" />
            </Button>
          </div>
        )
      case 1:
        return (
          <div className="space-y-2.5">
            {m.bookingHotels.map((name, index) => (
              <HotelRow key={name} name={name}>
                {index !== 1 && (
                  <span className="self-start rounded-full bg-positive-light px-2 py-0.5 text-[10px] font-semibold text-positive">
                    {m.payable}
                  </span>
                )}
              </HotelRow>
            ))}
          </div>
        )
      case 2:
        return (
          <div className="space-y-2.5">
            <span
              aria-hidden
              className="block h-20 rounded-[10px] bg-gradient-to-br from-azure to-cobalt/60"
            />
            <span className="block text-sm font-semibold text-cobalt-deep">{ext.hotel}</span>
            <Line w="w-1/2" />
            <Button className="w-full">
              {ext.pay} · {czk(sea.stay.price)}
              <Tap className="-right-2 -bottom-3" />
            </Button>
            <span className="flex items-center justify-center gap-1 text-xs font-semibold text-positive">
              <Check aria-hidden size={14} /> {ext.fits}
            </span>
          </div>
        )
      default:
        return (
          <div className="space-y-2.5">
            <HotelRow name={sea.stay.name} price={czk(sea.stay.price)} />
            <div className="grid grid-cols-2 gap-2">
              <Field icon={CalendarDays}>{m.dates}</Field>
              <Field icon={Users}>{m.guests}</Field>
            </div>
            <span className="flex items-center gap-1 text-xs text-positive">
              <Check aria-hidden size={14} /> {m.prefilled}
            </span>
            <Button>
              {m.chooseRoom}
              <Tap className="-right-2 -bottom-3" />
            </Button>
          </div>
        )
    }
  }

  switch (step) {
    case 0:
      return (
        <div className="space-y-2.5">
          <HotelRow name={sea.stay.name} price={czk(sea.stay.price)} />
          <span className="flex items-center gap-1 text-xs text-muted">
            <CalendarDays aria-hidden size={14} /> {m.datesLong}
          </span>
        </div>
      )
    case 1:
      return (
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: ShieldCheck, ...sea.insurance, recommended: true },
            { icon: CarFront, ...sea.car, recommended: false },
          ].map(({ icon: Icon, name, price, recommended }) => (
            <span
              key={name}
              className={`relative flex flex-col gap-2 rounded-[10px] bg-white p-3 shadow-soft ${recommended ? 'ring-2 ring-amber' : ''}`}
            >
              <Icon aria-hidden size={20} className="text-cobalt" />
              {recommended && (
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-amber-light px-2 py-0.5 text-[10px] font-semibold text-amber-ink">
                  <Sparkles aria-hidden size={10} /> {tripBuilder.recommended}
                </span>
              )}
              <span className="text-sm font-semibold text-cobalt-deep">{name}</span>
              <span className="text-xs text-muted">{czk(price)}</span>
              <span className="relative mt-auto rounded-[6px] border border-cobalt/30 py-1 text-center text-xs font-medium text-cobalt">
                {m.add}
                {recommended && <Tap className="-right-3 -bottom-4" />}
              </span>
            </span>
          ))}
        </div>
      )
    case 2: {
      const total = sea.stay.price + sea.insurance.price
      return (
        <span className="block space-y-1.5 rounded-[10px] bg-white p-3 text-sm shadow-soft">
          {[
            [m.stay, sea.stay.price],
            [m.insurance, sea.insurance.price],
          ].map(([label, price]) => (
            <span key={label} className="flex justify-between">
              <span className="text-muted">{label}</span>
              <span className="text-cobalt-deep">{czk(Number(price))}</span>
            </span>
          ))}
          <span className="flex justify-between border-t border-line pt-1.5 font-semibold">
            <span className="text-cobalt-deep">{m.totalFromBenefits}</span>
            <span className="text-positive">{czk(total)}</span>
          </span>
          <span className="flex h-2.5 overflow-hidden rounded-full bg-coral-light">
            <span className="h-full w-full origin-left animate-fill rounded-full bg-positive" />
          </span>
        </span>
      )
    }
    default:
      return (
        <div className="space-y-2">
          {[
            { icon: BedDouble, label: sea.stay.name },
            { icon: ShieldCheck, label: sea.insurance.name },
            { icon: FileText, label: m.docs[1] },
          ].map(({ icon: Icon, label }, index) => (
            <span
              key={label}
              style={{ animationDelay: `${index * 150}ms` }}
              className="flex animate-rise items-center gap-3 rounded-[10px] bg-white p-3 text-sm text-cobalt-deep shadow-soft"
            >
              <Icon aria-hidden size={18} className="text-cobalt" />
              <span className="flex-1">{label}</span>
              <Check aria-hidden size={16} className="text-positive" />
            </span>
          ))}
        </div>
      )
  }
}

/**
 * Ukázka rozhraní nakreslená v HTML a CSS pro jeden krok průvodce (zjištění 1.11).
 * Je jen ilustrační, proto je pro čtečky skrytá. Obsah kroku je v textu vedle.
 */
export function GuideScreen({ path, step }: { path: GuidePath; step: number }) {
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-[18px] bg-white shadow-lift ring-1 ring-line"
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-warm px-3 py-2">
        {['bg-coral', 'bg-amber', 'bg-positive'].map((color) => (
          <span key={color} className={`size-2.5 rounded-full ${color}`} />
        ))}
        <span className="ml-2 truncate rounded-full bg-white px-3 py-0.5 text-[11px] text-muted">
          {path === 'extension' && step < 3 ? m.bookingLabel : m.siteLabel}
        </span>
      </div>
      <div key={`${path}-${step}`} className="min-h-[248px] animate-rise bg-page p-4">
        {screen(path, step)}
      </div>
    </div>
  )
}
