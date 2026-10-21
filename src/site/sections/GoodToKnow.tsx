import type { CSSProperties } from 'react'
import { ArrowRight, CarFront, ShieldCheck } from 'lucide-react'
import { goodToKnow, placeholder } from '../../content-prototyp'
import { Disclosure } from '../components/Disclosure'
import { Note } from '../components/Note'
import { usePrototype } from '../state'

const ICONS = { insurance: ShieldCheck, car: CarFront } as const

/** Dobré vědět před cestou (bod 1.10). Praktické odpovědi k pojištění a autu. */
export function GoodToKnow() {
  const { notify } = usePrototype()
  return (
    <section
      id="dobre-vedet"
      aria-labelledby="dobre-vedet-nadpis"
      className="scroll-mt-20 px-4 pt-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-2">
          <h2 id="dobre-vedet-nadpis" className="text-2xl font-bold sm:text-3xl">
            {goodToKnow.title}
          </h2>
          <Note id="goodToKnow" />
        </div>
        <p className="mt-2 max-w-2xl text-ink">{goodToKnow.lead}</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {goodToKnow.columns.map((column, index) => {
            const Icon = ICONS[column.id as keyof typeof ICONS]
            return (
              <div
                key={column.id}
                data-reveal
                style={{ '--reveal-delay': `${index * 90}ms` } as CSSProperties}
                className="rounded-[20px] bg-surface-warm p-4 sm:p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-white text-cobalt shadow-soft">
                    <Icon aria-hidden size={20} />
                  </span>
                  <h3 className="text-lg font-semibold">{column.title}</h3>
                </div>
                <div className="mt-4 space-y-2">
                  {column.items.map((item) => (
                    <Disclosure key={item.question} question={item.question}>
                      {item.answer}
                    </Disclosure>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => notify(placeholder.category)}
                  className="mt-3 inline-flex min-h-11 items-center gap-1 px-1 text-sm font-medium text-cobalt underline-offset-4 hover:underline"
                >
                  {goodToKnow.more}
                  <ArrowRight aria-hidden size={14} />
                </button>
              </div>
            )
          })}
        </div>
        <p className="mt-3 text-xs text-muted">{goodToKnow.disclaimer}</p>
      </div>
    </section>
  )
}
