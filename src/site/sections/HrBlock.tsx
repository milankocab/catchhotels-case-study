import { ExternalLink } from 'lucide-react'
import { hrBlock, placeholder } from '../../content-prototyp'
import { Note } from '../components/Note'
import { usePrototype } from '../state'

/** Blok pro HR (zjištění 1.14). Vede na samostatný web pro firmy. */
export function HrBlock() {
  const { notify } = usePrototype()
  return (
    <section id="pro-firmy" aria-labelledby="hr-nadpis" className="scroll-mt-20 px-4 pt-16">
      <div
        data-reveal
        className="mx-auto flex max-w-6xl flex-col gap-5 rounded-[24px] bg-cobalt-deep p-6 text-white sm:p-8 md:flex-row md:items-center md:justify-between"
      >
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-sm font-semibold text-azure">
            {hrBlock.eyebrow}
            <Note id="hr" />
          </p>
          <h2 id="hr-nadpis" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            {hrBlock.title}
          </h2>
          <p className="mt-2 text-azure-light">{hrBlock.text}</p>
        </div>
        <button
          type="button"
          onClick={() => notify(placeholder.b2b)}
          className="inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-[10px] bg-white px-5 font-medium text-cobalt-deep hover:bg-azure-light md:self-center"
        >
          {hrBlock.cta}
          <ExternalLink aria-hidden size={16} />
        </button>
      </div>
    </section>
  )
}
