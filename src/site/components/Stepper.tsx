import { Check } from 'lucide-react'
import { offer } from '../../content-prototyp'
import { Note } from './Note'

/** Ukazatel kroků objednávky (zjištění 3.7). Na mobilu jen „Krok 2 z 4“ s pruhem. */
export function Stepper({ current, steps = offer.steps }: { current: number; steps?: string[] }) {
  return (
    <nav aria-label={offer.stepsLabel} className="flex items-center gap-2">
      <ol className="flex flex-1 items-center gap-2 max-sm:hidden">
        {steps.map((step, index) => {
          const done = index < current
          const active = index === current
          return (
            <li key={step} className="flex flex-1 items-center gap-2 last:flex-none">
              <span
                aria-current={active ? 'step' : undefined}
                className={`flex items-center gap-2 text-sm font-medium whitespace-nowrap ${
                  active ? 'text-cobalt-deep' : done ? 'text-cobalt' : 'text-muted'
                }`}
              >
                <span
                  className={`flex size-7 items-center justify-center rounded-full text-xs font-semibold ${
                    active
                      ? 'bg-coral-600 text-white'
                      : done
                        ? 'bg-cobalt text-white'
                        : 'bg-white text-muted ring-1 ring-line'
                  }`}
                >
                  {done ? <Check aria-hidden size={14} /> : index + 1}
                </span>
                {step}
              </span>
              {index < steps.length - 1 && (
                <span
                  aria-hidden
                  className={`h-0.5 flex-1 rounded-full ${done ? 'bg-cobalt' : 'bg-line'}`}
                />
              )}
            </li>
          )
        })}
      </ol>
      <div className="flex-1 sm:hidden">
        <p className="text-sm font-medium text-cobalt-deep">
          {offer.stepOf(current + 1, steps.length)} · {steps[current]}
        </p>
        <span aria-hidden className="mt-2 block h-1.5 overflow-hidden rounded-full bg-line">
          <span
            className="block h-full rounded-full bg-coral-600"
            style={{ width: `${((current + 1) / steps.length) * 100}%` }}
          />
        </span>
      </div>
      <Note id="stepper" />
    </nav>
  )
}
