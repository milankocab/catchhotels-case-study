import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CarFront, ChevronRight, ShieldCheck } from 'lucide-react'
import { hero, placeholder } from '../../content-prototyp'
import heroPhoto from '../assets/photos/hero-pobrezi-ilustrace.webp'
import { ProgramLogo } from '../components/BrandLogos'
import { Note } from '../components/Note'
import { LAYER } from '../floating'
import { SearchPanel } from '../search/SearchPanel'
import { scrollToSection, usePrototype } from '../state'

const ADDON_ICONS = { insurance: ShieldCheck, car: CarFront } as const

/**
 * Doplňkové služby vedle vyhledávání (analýza, bod 1.7). Hledání nabízí jen ubytování,
 * doplňky jsou tu jen vidět a klik vede na stránku kategorie. Na mobilu dvě dlaždice pod hledáním.
 */
function AddonsCard() {
  const { notify } = usePrototype()
  const { addons } = hero
  return (
    <aside
      aria-labelledby="doplnky-nadpis"
      className="animate-rise rounded-[20px] bg-white/95 p-4 shadow-lift backdrop-blur [animation-delay:240ms] sm:p-5"
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
          const Icon = ADDON_ICONS[item.id]
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => notify(placeholder.category)}
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
    </aside>
  )
}

export function Hero() {
  const panelRef = useRef<HTMLDivElement>(null)
  const [sticky, setSticky] = useState(false)

  // Hledání se připne nahoru, když panel vyhledávání odjede nad okraj obrazovky (1.5).
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
      className="relative isolate overflow-x-clip bg-gradient-to-b from-[#eef9fd] to-[#97ddf1]"
    >
      {/* Ilustrace je široký pruh dole. Nebe nad ní plynule navazuje barvou pozadí sekce.
          Na mobilu je vidět jen pravá část s turistou. */}
      <img
        src={heroPhoto}
        alt={hero.photoAlt}
        className="absolute inset-x-0 bottom-0 -z-10 h-[clamp(150px,20vw,290px)] w-full animate-hero-photo object-cover object-[80%_50%] sm:object-center"
      />
      <Note id="season" className="absolute top-3 right-4" />

      {/* Desktop: nadpis a hledání vlevo, doplňky vpravo. Mobil: vše pod sebou. */}
      <div className="mx-auto grid max-w-6xl gap-6 px-4 pt-8 pb-[110px] sm:pt-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-x-6 lg:gap-y-8 lg:pt-14 lg:pb-[clamp(110px,13vw,190px)] lg:[grid-template-areas:'head_addons'_'search_addons']">
        <div className="animate-rise lg:[grid-area:head]">
          <h1
            id="hero-nadpis"
            className="max-w-2xl text-[34px] leading-[1.05] font-bold sm:text-5xl lg:text-[54px]"
          >
            {hero.title} <Note id="headline" className="ml-1" />
          </h1>
          <p className="mt-4 max-w-xl text-base text-ink sm:text-lg">{hero.subtitle}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-1 font-medium text-cobalt-deep">{hero.programsLabel}</span>
            <ul className="flex flex-wrap items-center gap-2">
              {hero.programs.map((id) => (
                <li
                  key={id}
                  className="flex h-10 items-center rounded-full bg-white px-4 shadow-soft"
                >
                  <ProgramLogo id={id} />
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => scrollToSection('jak-to-funguje')}
              className="inline-flex min-h-11 items-center gap-1 px-1 font-medium text-cobalt underline-offset-4 hover:underline"
            >
              {hero.how}
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

        <div className="lg:[grid-area:addons] lg:self-end">
          <AddonsCard />
        </div>
      </div>
    </section>
  )
}
