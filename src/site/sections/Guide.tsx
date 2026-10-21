import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { guide, type GuidePath } from '../../content-prototyp'
import { Note } from '../components/Note'
import { GUIDE_EVENT, scrollToSection } from '../state'
import { useDetailsMotion } from '../motion'
import { GuideScreen } from './GuideScreen'

/** Více podrobností ke kroku. Plynule se vysune pod krátkou větou. */
function StepDetails({ children }: { children: string }) {
  const { detailsRef, contentRef, onSummaryClick } = useDetailsMotion()
  return (
    <details ref={detailsRef} className="mt-1 text-sm">
      <summary
        onClick={onSummaryClick}
        className="inline-flex min-h-11 cursor-pointer items-center font-medium text-cobalt underline-offset-4 hover:underline"
      >
        {guide.details}
      </summary>
      <div ref={contentRef} className="overflow-hidden">
        <p className="pb-1 leading-relaxed text-ink">{children}</p>
      </div>
    </details>
  )
}

/**
 * Interaktivní průvodce místo dlouhého návodu (zjištění 1.11). Tři cesty, kroky si člověk
 * spouští sám tlačítky nebo swipem a zůstává v sekci. Všechny texty jsou v HTML.
 */
export function Guide() {
  const [path, setPath] = useState<GuidePath>('web')
  const [step, setStep] = useState(0)
  const swipeStart = useRef<number | null>(null)
  const current = guide.paths.find((item) => item.id === path) ?? guide.paths[0]
  const total = current.steps.length
  const last = step === total - 1

  const choosePath = (id: GuidePath) => {
    setPath(id)
    setStep(0)
  }
  const go = (delta: number) => setStep((value) => Math.min(Math.max(value + delta, 0), total - 1))

  // Sekce Vybíráte na Booking.com? umí otevřít cestu s rozšířením.
  useEffect(() => {
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<GuidePath>).detail
      setPath(id)
      setStep(0)
      scrollToSection('jak-to-funguje')
    }
    window.addEventListener(GUIDE_EVENT, onOpen)
    return () => window.removeEventListener(GUIDE_EVENT, onOpen)
  }, [])

  return (
    <section
      id="jak-to-funguje"
      aria-labelledby="pruvodce-nadpis"
      className="scroll-mt-20 px-4 pt-16"
    >
      <div className="mx-auto max-w-6xl rounded-[24px] bg-azure-light/60 p-5 sm:p-8" data-reveal>
        <div className="flex items-center gap-2">
          <h2 id="pruvodce-nadpis" className="text-2xl font-bold sm:text-3xl">
            {guide.title}
          </h2>
          <Note id="guide" />
        </div>
        <p className="mt-2 max-w-2xl text-ink">{guide.lead}</p>

        <div
          role="tablist"
          aria-label={guide.pathsLabel}
          className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
        >
          {guide.paths.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === path}
              onClick={() => choosePath(item.id)}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${
                item.id === path
                  ? 'bg-cobalt-deep text-white'
                  : 'bg-white text-cobalt shadow-soft hover:bg-white/70'
              }`}
            >
              {item.label}
              {item.proposal && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    item.id === path ? 'bg-white/20 text-white' : 'bg-amber-light text-amber-ink'
                  }`}
                >
                  {guide.proposal}
                </span>
              )}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          aria-label={current.label}
          className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start"
        >
          <ol key={path} className="animate-rise space-y-2">
            {current.steps.map((item, index) => {
              const active = index === step
              return (
                // Na mobilu je vidět jen aktuální krok pod ukázkou, ostatní zůstávají pro čtečky.
                <li key={item.title} className={active ? '' : 'max-lg:sr-only'}>
                  <div
                    className={`rounded-[14px] transition ${active ? 'bg-white shadow-soft' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={() => setStep(index)}
                      aria-current={active ? 'step' : undefined}
                      className="flex min-h-12 w-full items-center gap-3 px-3 py-2 text-left"
                    >
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                          active
                            ? 'bg-coral-600 text-white'
                            : index < step
                              ? 'bg-cobalt text-white'
                              : 'bg-white text-cobalt ring-1 ring-cobalt/30'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="font-medium text-cobalt-deep">{item.title}</span>
                    </button>
                    {/* Text kroku je v HTML vždy, jen zavřené kroky ho schovávají vizuálně. */}
                    <div className={active ? 'px-3 pb-3 pl-14' : 'sr-only'}>
                      <p className="text-sm text-ink">{item.short}</p>
                      <StepDetails>{item.details}</StepDetails>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          <div
            className="touch-pan-y select-none max-lg:order-first"
            onPointerDown={(event) => {
              swipeStart.current = event.pointerType === 'mouse' ? null : event.clientX
            }}
            onPointerUp={(event) => {
              if (swipeStart.current === null) return
              const distance = event.clientX - swipeStart.current
              swipeStart.current = null
              if (Math.abs(distance) > 40) go(distance < 0 ? 1 : -1)
            }}
          >
            <GuideScreen path={path} step={step} />
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={step === 0}
                className="inline-flex min-h-11 items-center gap-1 rounded-full bg-white px-4 text-sm font-medium text-cobalt shadow-soft disabled:opacity-40"
              >
                <ChevronLeft aria-hidden size={16} />
                {guide.prev}
              </button>
              <span className="text-sm text-muted" aria-live="polite">
                {guide.stepOf(step + 1, total)}
              </span>
              <button
                type="button"
                onClick={() => (last ? setStep(0) : go(1))}
                className="inline-flex min-h-11 items-center gap-1 rounded-full bg-coral-600 px-4 text-sm font-medium text-white shadow-cta hover:bg-coral-700"
              >
                {last ? (
                  <>
                    <RotateCcw aria-hidden size={16} />
                    {guide.restart}
                  </>
                ) : (
                  <>
                    {guide.next}
                    <ChevronRight aria-hidden size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
