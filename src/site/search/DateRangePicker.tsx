import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { search } from '../../content-prototyp'
import { Note } from '../components/Note'
import { monthGrid, nightsBetween, sameDay, startOfDay } from './dates'

export type DateRange = { start: Date | null; end: Date | null }

const MONTHS_AHEAD = 6
const monthTitle = new Intl.DateTimeFormat('cs-CZ', { month: 'long', year: 'numeric' })
const dayLabel = new Intl.DateTimeFormat('cs-CZ', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

/**
 * Kalendář s měsíci pod sebou (zjištění 1.4). První klik vybere příjezd, druhý odjezd.
 * Počet nocí je přímo na tlačítku Potvrdit.
 */
export function DateRangePicker({
  value,
  onConfirm,
  onClose,
  today = new Date(),
}: {
  value: DateRange
  onConfirm: (range: DateRange) => void
  onClose: () => void
  today?: Date
}) {
  const [draft, setDraft] = useState<DateRange>(value)
  const firstTime = startOfDay(today).getTime()
  const first = new Date(firstTime)
  const months = useMemo(() => {
    const from = new Date(firstTime)
    return Array.from({ length: MONTHS_AHEAD }, (_, index) => {
      const date = new Date(from.getFullYear(), from.getMonth() + index, 1)
      return { date, days: monthGrid(date.getFullYear(), date.getMonth()) }
    })
  }, [firstTime])

  const pick = (day: Date) => {
    if (!draft.start || draft.end || day <= draft.start) setDraft({ start: day, end: null })
    else setDraft({ start: draft.start, end: day })
  }

  const nights = draft.start && draft.end ? nightsBetween(draft.start, draft.end) : 0
  const hint = !draft.start
    ? search.dates.pickStart
    : !draft.end
      ? search.dates.pickEnd
      : search.dates.nights(nights)

  return (
    <div className="flex max-h-[min(34rem,80vh)] flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
        <p className="flex items-center gap-2 font-medium text-cobalt-deep" aria-live="polite">
          {hint}
          <Note id="calendar" />
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label={search.dates.close}
          className="-mr-2 flex size-9 items-center justify-center rounded-full text-muted hover:bg-surface-warm"
        >
          <X aria-hidden size={18} />
        </button>
      </div>

      <div className="overflow-y-auto overscroll-contain px-4 pb-2">
        {months.map(({ date, days }) => (
          <div key={date.toISOString()} className="pt-4">
            <p className="font-heading font-semibold text-cobalt-deep first-letter:uppercase">
              {monthTitle.format(date)}
            </p>
            <div className="mt-2 grid grid-cols-7 text-center text-xs text-muted" aria-hidden>
              {search.dates.weekdays.map((day) => (
                <span key={day} className="py-1">
                  {day}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {days.map((day, index) => {
                if (!day) return <span key={`prazdne-${index}`} />
                const disabled = day < first
                const isStart = sameDay(day, draft.start)
                const isEnd = sameDay(day, draft.end)
                const inside = !!draft.start && !!draft.end && day > draft.start && day < draft.end
                return (
                  <button
                    key={day.getTime()}
                    type="button"
                    disabled={disabled}
                    onClick={() => pick(day)}
                    aria-pressed={isStart || isEnd}
                    aria-label={dayLabel.format(day)}
                    className={`relative flex h-11 items-center justify-center text-sm tabular-nums transition-colors disabled:text-line ${
                      inside ? 'bg-azure-light' : ''
                    } ${isStart && draft.end ? 'rounded-l-full bg-azure-light' : ''} ${
                      isEnd ? 'rounded-r-full bg-azure-light' : ''
                    }`}
                  >
                    <span
                      className={`flex size-10 items-center justify-center rounded-full ${
                        isStart || isEnd
                          ? 'bg-cobalt font-semibold text-white'
                          : disabled
                            ? ''
                            : 'hover:bg-azure-light'
                      }`}
                    >
                      {day.getDate()}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 border-t border-line px-4 py-3">
        <button
          type="button"
          onClick={() => setDraft({ start: null, end: null })}
          className="min-h-11 px-2 text-sm font-medium text-cobalt underline-offset-4 hover:underline"
        >
          {search.dates.clear}
        </button>
        <button
          type="button"
          disabled={!draft.start || !draft.end}
          onClick={() => onConfirm(draft)}
          aria-label={
            nights > 0 ? `${search.dates.confirm} · ${search.dates.nights(nights)}` : undefined
          }
          className="ml-auto flex min-h-11 items-center gap-2 rounded-full bg-coral-600 px-5 font-medium text-white shadow-cta transition hover:bg-coral-700 disabled:bg-line disabled:text-muted disabled:shadow-none"
        >
          {search.dates.confirm}
          {nights > 0 && <span className="font-normal">{` · ${search.dates.nights(nights)}`}</span>}
        </button>
      </div>
    </div>
  )
}
