import { CircleAlert, Clock } from 'lucide-react'
import { hero, meta, nav } from '../content'
import { Logo } from '../components/Logo'

export function Hero() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-azure-light via-page to-page">
      {/* Upozornění o nezávislosti. Musí být vidět hned nahoře. */}
      <div role="note" className="border-b border-amber/60 bg-amber-light">
        <p className="mx-auto flex max-w-3xl items-start gap-2 px-4 py-3 text-sm font-medium text-amber-ink">
          <CircleAlert aria-hidden size={18} className="mt-0.5 shrink-0" />
          {meta.disclaimer}
        </p>
      </div>

      {/* Dekorativní slunce v pozadí */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-16 size-64 rounded-full bg-amber/25 blur-2xl sm:right-10"
      />

      <div className="relative mx-auto max-w-3xl px-4 pt-6 pb-10 sm:pt-8 sm:pb-14">
        <Logo />
        <p className="mt-10 text-sm font-medium text-coral-600">{hero.eyebrow}</p>
        <h1 className="mt-2 text-3xl leading-[1.08] font-bold sm:text-5xl">{hero.title}</h1>
        <p className="mt-4 text-lg sm:text-xl">{hero.subtitle}</p>
        <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="font-medium text-cobalt-deep">{meta.author}</span>
          <span aria-hidden>·</span>
          <span>{meta.year}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden size={14} /> {hero.readingTime}
          </span>
        </p>

        <div className="mt-8 rounded-(--radius-card) bg-white p-5 shadow-lift sm:p-6">
          <h2 className="text-lg font-semibold">{hero.summaryTitle}</h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            {hero.summary.map((item, index) => (
              <li key={item.label}>
                <span className="flex size-8 items-center justify-center rounded-full bg-cream font-heading text-sm font-semibold text-cobalt">
                  {index + 1}
                </span>
                <p className="mt-2 font-heading font-semibold text-cobalt-deep">{item.label}</p>
                <p className="mt-1 text-sm leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <nav aria-label="Obsah" className="mt-6">
          <ol className="flex flex-wrap gap-2">
            {nav.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-cobalt/25 bg-white/70 px-4 text-sm font-medium text-cobalt hover:bg-azure-light"
                >
                  <span className="mr-1.5 text-muted">{index + 1}.</span>
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </header>
  )
}
