import type { CSSProperties } from 'react'
import { Check, Link2, PlayCircle, Puzzle } from 'lucide-react'
import { bookingSection as copy } from '../../content-prototyp'
import { Note } from '../components/Note'
import { GUIDE_EVENT, LINK_EVENT, usePrototype } from '../state'
import { GuideScreen } from './GuideScreen'

/**
 * Vybíráte na Booking.com? (zjištění 1.1 D a kapitola 3). Hlavní cestou je rozšíření
 * do prohlížeče, vložení odkazu zůstává jako druhá možnost.
 */
export function BookingSection() {
  const { notify } = usePrototype()
  return (
    <section id="booking" aria-labelledby="booking-nadpis" className="scroll-mt-20 px-4 pt-16">
      <div className="mx-auto max-w-6xl" data-reveal>
        <div className="flex items-center gap-2">
          <h2 id="booking-nadpis" className="text-2xl font-bold sm:text-3xl">
            {copy.title}
          </h2>
          <Note id="booking" />
        </div>
        <p className="mt-2 max-w-2xl text-ink">{copy.lead}</p>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <article
            data-reveal
            className="grid gap-6 rounded-[20px] bg-white p-5 shadow-soft sm:p-6 md:grid-cols-[minmax(0,1fr)_260px] md:items-center"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-light px-3 py-1 text-xs font-semibold text-amber-ink">
                <Puzzle aria-hidden size={14} />
                {copy.extension.badge}
              </span>
              <h3 className="mt-3 text-xl font-semibold">{copy.extension.title}</h3>
              <p className="mt-2 text-ink">{copy.extension.text}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-cobalt-deep">
                {copy.extension.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <Check aria-hidden size={16} className="shrink-0 text-positive" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => notify(copy.extension.ctaNote)}
                  className="inline-flex min-h-12 items-center gap-2 rounded-[10px] bg-coral-600 px-5 font-medium text-white shadow-cta hover:bg-coral-700"
                >
                  <Puzzle aria-hidden size={18} />
                  {copy.extension.cta}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent(GUIDE_EVENT, { detail: 'extension' }))
                  }
                  className="inline-flex min-h-12 items-center gap-2 rounded-[10px] px-4 font-medium text-cobalt hover:bg-azure-light"
                >
                  <PlayCircle aria-hidden size={18} />
                  {copy.extension.demo}
                </button>
              </div>
            </div>
            <GuideScreen path="extension" step={2} />
          </article>

          <article
            data-reveal
            style={{ '--reveal-delay': '120ms' } as CSSProperties}
            className="flex flex-col rounded-[20px] bg-surface-warm p-5 sm:p-6"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-white text-cobalt shadow-soft">
              <Link2 aria-hidden size={20} />
            </span>
            <h3 className="mt-3 text-xl font-semibold">{copy.link.title}</h3>
            <ol className="mt-3 space-y-2 text-sm text-ink">
              {copy.link.steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-cobalt shadow-soft">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(LINK_EVENT))}
              className="mt-5 inline-flex min-h-12 w-fit items-center gap-2 rounded-[10px] border border-cobalt/30 bg-white px-5 font-medium text-cobalt hover:border-cobalt md:mt-auto"
            >
              <Link2 aria-hidden size={18} />
              {copy.link.cta}
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}
