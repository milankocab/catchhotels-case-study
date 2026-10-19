import { Minus, Plus } from 'lucide-react'
import { search } from '../../content-prototyp'

export type Guests = { adults: number; children: number }

const LIMITS = { adults: [1, 10], children: [0, 6] } as const

export function GuestsPicker({
  value,
  onChange,
  onDone,
}: {
  value: Guests
  onChange: (guests: Guests) => void
  onDone: () => void
}) {
  const t = search.guests
  const row = (key: keyof Guests, label: string, hint?: string) => {
    const [min, max] = LIMITS[key]
    const set = (next: number) => onChange({ ...value, [key]: next })
    return (
      <div className="flex items-center justify-between gap-4 py-2">
        <div>
          <p className="font-medium text-cobalt-deep">{label}</p>
          {hint && <p className="text-xs text-muted">{hint}</p>}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => set(value[key] - 1)}
            disabled={value[key] <= min}
            aria-label={`${t.less}, ${label.toLowerCase()}`}
            className="flex size-11 items-center justify-center rounded-full border-[1.5px] border-cobalt/40 text-cobalt hover:bg-azure-light disabled:border-line disabled:text-line"
          >
            <Minus aria-hidden size={16} />
          </button>
          <output className="w-5 text-center font-medium tabular-nums" aria-live="polite">
            {value[key]}
          </output>
          <button
            type="button"
            onClick={() => set(value[key] + 1)}
            disabled={value[key] >= max}
            aria-label={`${t.more}, ${label.toLowerCase()}`}
            className="flex size-11 items-center justify-center rounded-full border-[1.5px] border-cobalt/40 text-cobalt hover:bg-azure-light disabled:border-line disabled:text-line"
          >
            <Plus aria-hidden size={16} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      {row('adults', t.adults)}
      {row('children', t.children, t.childrenHint)}
      <button
        type="button"
        onClick={onDone}
        className="mt-3 flex min-h-11 w-full items-center justify-center rounded-full border-[1.5px] border-cobalt/40 font-medium text-cobalt hover:bg-azure-light"
      >
        {t.done}
      </button>
    </div>
  )
}
