import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { faq, placeholder } from '../../content-prototyp'
import { Disclosure } from '../components/Disclosure'
import { Note } from '../components/Note'
import { usePrototype } from '../state'

/** Časté dotazy s kategoriemi (zjištění 1.7). */
export function Faq() {
  const { notify } = usePrototype()
  const [categoryId, setCategoryId] = useState(faq.categories[0].id)
  const category = faq.categories.find((item) => item.id === categoryId) ?? faq.categories[0]

  return (
    <section
      id="caste-dotazy"
      aria-labelledby="faq-nadpis"
      className="scroll-mt-20 px-4 pt-16 pb-20"
    >
      <div data-reveal className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 id="faq-nadpis" className="text-2xl font-bold sm:text-3xl">
              {faq.title}
            </h2>
            <Note id="faq" />
          </div>
          <div
            role="tablist"
            aria-label={faq.categoriesLabel}
            className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
          >
            {faq.categories.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === categoryId}
                onClick={() => setCategoryId(item.id)}
                className={`min-h-11 shrink-0 rounded-[10px] px-4 text-left text-sm font-medium transition-colors ${
                  item.id === categoryId
                    ? 'bg-cobalt-deep text-white'
                    : 'bg-surface-warm text-cobalt hover:bg-cream'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div key={categoryId} role="tabpanel" aria-label={category.label} className="animate-rise">
          <div className="space-y-2">
            {category.items.map((item) => (
              <Disclosure key={item.question} question={item.question}>
                {item.answer}
              </Disclosure>
            ))}
          </div>
          {category.sample && <p className="mt-3 text-xs text-muted">{faq.sample}</p>}
          <button
            type="button"
            onClick={() => notify(placeholder.page)}
            className="mt-3 inline-flex min-h-11 items-center gap-1 px-1 text-sm font-medium text-cobalt underline-offset-4 hover:underline"
          >
            {faq.more}
            <ArrowRight aria-hidden size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}
