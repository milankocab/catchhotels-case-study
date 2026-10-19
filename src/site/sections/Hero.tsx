import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CarFront, ChevronRight, ShieldCheck } from 'lucide-react'
import { hero } from '../../content-prototyp'
import carPhoto from '../assets/photos/auto.webp'
import heroPhoto from '../assets/photos/hero-pobrezi.webp'
import { Note } from '../components/Note'
import { LAYER } from '../floating'
import { SearchPanel } from '../search/SearchPanel'
import { scrollToSection, usePrototype } from '../state'

const ADDON_ICONS = { insurance: ShieldCheck, car: CarFront } as const

/**
 * Doplňkové služby hned vedle vyhledávání (kapitola 7). Na desktopu vysoká karta s fotkou
 * zarovnaná ke kartě hledání, na mobilu dvě dlaždice pod ním. Klik přepne hledání na kategorii.
 */
function AddonsCard() {
  const { setSearchTab } = usePrototype()
  const { addons } = hero
  return (
    <aside
      aria-labelledby="doplnky-nadpis"
      className="animate-rise rounded-[20px] bg-white/95 p-4 shadow-lift backdrop-blur [animation-delay:240ms] sm:p-5 lg:[grid-area:addons] lg:self-end"
    >
      <div className="flex items-center gap-2">
        <h2 id="doplnky-nadpis" className="text-base font-semibold sm:text-lg">
          {addons.title}
        </h2>
        <Note id="addons" />
      </div>
      <p className="mt-1 text-sm text-muted">{addons.lead}</p>
      <ul className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">
        {addons.items.map((item) => {
          const Icon = ADDON_ICONS[item.tab as keyof typeof ADDON_ICONS]
          return (
            <li key={item.tab}>
              <button
                type="button"
                onClick={() => setSearchTab(item.tab)}
                className="group flex min-h-14 w-full items-center gap-3 rounded-[14px] bg-surface-warm p-2.5 text-left transition hover:bg-cream"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-white text-cobalt shadow-soft max-sm:hidden">
                  <Icon aria-hidden size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm leading-tight font-medium text-cobalt-deep">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">
                    <strong className="font-semibold text-coral-700">{item.price}</strong>{' '}
                    {item.unit}
                  </span>
                </span>
                <ChevronRight
                  aria-hidden
                  size={16}
                  className="shrink-0 text-cobalt transition-transform group-hover:translate-x-0.5 max-sm:hidden"
                />
              </button>
            </li>
          )
        })}
      </ul>
      <img
        src={carPhoto}
        alt={addons.photoAlt}
        className="mt-3 aspect-[16/10] w-full rounded-[14px] object-cover max-lg:hidden"
      />
    </aside>
  )
}

export function Hero() {
  const panelRef = useRef<HTMLDivElement>(null)
  const [sticky, setSticky] = useState(false)

  // Hledání se připne nahoru, když panel vyhledávání odjede nad okraj obrazovky (1.9).
  useEffect(() => {
    const element = panelRef.current
    if (!element || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) =>
      setSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="hledani"
      aria-labelledby="hero-nadpis"
      className="relative isolate overflow-x-clip"
    >
      <img
        src={heroPhoto}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full animate-hero-photo object-cover object-[70%_55%]"
      />
      {/* Mlha zleva, aby byl text čitelný (design manuál, kapitola 8.5). */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white/95 via-white/75 to-white/30 lg:bg-gradient-to-r lg:from-white/95 lg:via-white/60 lg:to-white/0"
      />

      {/* Desktop: nadpis nahoře vlevo, pod ním hledání, vpravo vedle obou karta doplňků.
          Mobil: nadpis, hledání, doplňky pod sebou. */}
      <div className="mx-auto grid max-w-6xl gap-6 px-4 pt-10 pb-12 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-x-6 lg:gap-y-10 lg:pt-16 lg:pb-16 lg:[grid-template-areas:'head_addons'_'search_addons']">
        <div className="animate-rise lg:[grid-area:head]">
          <h1
            id="hero-nadpis"
            className="max-w-xl text-[34px] leading-[1.05] font-bold sm:text-5xl lg:text-[56px]"
          >
            {hero.title} <Note id="headline" className="ml-1" />
          </h1>
          <p className="mt-4 max-w-lg text-base text-ink sm:text-lg">{hero.subtitle}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-cobalt-deep">{hero.programsLabel}</span>
            {hero.programs.map((program) => (
              <span
                key={program}
                className="rounded-full bg-white px-3 py-1 font-semibold text-cobalt-deep shadow-soft"
              >
                {program}
              </span>
            ))}
            <button
              type="button"
              onClick={() => scrollToSection('jak-to-funguje')}
              className="inline-flex min-h-11 items-center gap-1 px-1 font-medium text-cobalt underline-offset-4 hover:underline"
            >
              {hero.programsHow}
              <ArrowRight aria-hidden size={14} />
            </button>
          </div>
        </div>

        <div
          ref={panelRef}
          className={`relative ${LAYER.search} animate-rise [animation-delay:120ms] lg:[grid-area:search]`}
        >
          <SearchPanel sticky={sticky} />
        </div>

        <AddonsCard />
      </div>
    </section>
  )
}
