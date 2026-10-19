import type { CSSProperties } from 'react'
import { CarFront, ShieldCheck } from 'lucide-react'
import { czk, destinations } from '../../content-prototyp'
import chorvatsko from '../assets/photos/chorvatsko.webp'
import krkonose from '../assets/photos/krkonose.webp'
import praha from '../assets/photos/praha.webp'
import rakousko from '../assets/photos/rakousko.webp'
import { Note } from '../components/Note'
import { usePrototype } from '../state'

const PHOTOS: Record<string, string> = { krkonose, chorvatsko, praha, rakousko }
const TAG_ICONS = { car: CarFront, insurance: ShieldCheck } as const

/** Oblíbené destinace se štítkem doporučeného doplňku (kapitola 8.4). */
export function Destinations() {
  const { notify } = usePrototype()
  return (
    <section id="inspirace" aria-labelledby="destinace-nadpis" className="scroll-mt-20 px-4 pt-14">
      <div className="mx-auto max-w-6xl" data-reveal>
        <div className="flex items-center gap-2">
          <h2 id="destinace-nadpis" className="text-2xl font-bold sm:text-3xl">
            {destinations.title}
          </h2>
          <Note id="destinations" />
        </div>
        <p className="mt-2 max-w-2xl text-ink">{destinations.lead}</p>

        <ul className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {destinations.items.map((item, index) => {
            const TagIcon = item.addon ? TAG_ICONS[item.addon] : null
            return (
              <li
                key={item.id}
                data-reveal
                style={{ '--reveal-delay': `${index * 90}ms` } as CSSProperties}
                className="w-[78%] shrink-0 snap-start sm:w-auto"
              >
                <button
                  type="button"
                  onClick={() => notify(destinations.next(item.name))}
                  className="group relative block aspect-[4/5] w-full overflow-hidden rounded-(--radius-card) text-left shadow-soft transition hover:shadow-lift sm:aspect-[3/4]"
                >
                  <img
                    src={PHOTOS[item.id]}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-cobalt-deep/85 via-cobalt-deep/10 to-transparent"
                  />
                  {item.tag && TagIcon && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-cobalt-deep shadow-soft">
                      <TagIcon aria-hidden size={14} className="text-coral-600" />
                      {item.tag}
                    </span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 block p-4 text-white">
                    <span className="block font-heading text-xl font-semibold">{item.name}</span>
                    <span className="mt-0.5 flex items-baseline justify-between gap-2 text-sm">
                      <span className="text-white/85">{item.country}</span>
                      <span>
                        {destinations.priceFrom}{' '}
                        <strong className="font-semibold">{czk(item.price)}</strong>{' '}
                        <span className="text-white/85">{destinations.perNight}</span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
