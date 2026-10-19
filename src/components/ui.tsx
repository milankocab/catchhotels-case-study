import type { ReactNode } from 'react'
import { CircleAlert, Info, PencilLine, Sun } from 'lucide-react'
import { nav, type SectionId } from '../content'
import { isTodo } from './todo'

/** Jantarový štítek pro místa, která Milan doplní. Na stránce musí být vidět. */
export function Todo({ text }: { text: string }) {
  return (
    <span className="inline-flex items-start gap-1.5 rounded-md border border-dashed border-amber bg-amber-light px-2 py-1 text-sm font-medium text-amber-ink">
      <PencilLine aria-hidden size={16} className="mt-0.5 shrink-0" />
      <span>{text}</span>
    </span>
  )
}

/** Text z content.ts. Text začínající TODO-MILAN se vykreslí jako štítek. */
export function Text({ text, className }: { text: string; className?: string }) {
  if (isTodo(text)) {
    return (
      <p className={className}>
        <Todo text={text} />
      </p>
    )
  }
  return <p className={className}>{text}</p>
}

export function Paragraphs({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((item) => (
        <Text key={item} text={item} />
      ))}
    </>
  )
}

export function Section({
  id,
  children,
  tone = 'plain',
}: {
  id: SectionId
  children: ReactNode
  tone?: 'plain' | 'warm'
}) {
  const index = nav.findIndex((item) => item.id === id)
  return (
    <section
      id={id}
      aria-labelledby={`${id}-nadpis`}
      className={`scroll-mt-4 py-12 sm:py-16 ${tone === 'warm' ? 'bg-surface-warm' : ''}`}
    >
      <div className="mx-auto max-w-3xl px-4">
        <p className="font-heading text-sm font-semibold text-coral-600">
          {String(index + 1).padStart(2, '0')}
        </p>
        <h2 id={`${id}-nadpis`} className="mt-1 text-2xl font-semibold sm:text-3xl">
          {nav[index].title}
        </h2>
        <div className="mt-6 space-y-4 leading-relaxed">{children}</div>
      </div>
    </section>
  )
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="pt-4 text-lg font-semibold sm:text-xl">{children}</h3>
}

export function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-coral" />
          {isTodo(item) ? <Todo text={item} /> : <span>{item}</span>}
        </li>
      ))}
    </ul>
  )
}

const CALLOUT_TONES = {
  info: { box: 'bg-azure-light', icon: Info, iconClass: 'text-cobalt' },
  tip: { box: 'bg-azure-light', icon: Sun, iconClass: 'text-amber' },
  warning: {
    box: 'bg-amber-light border border-amber/60',
    icon: CircleAlert,
    iconClass: 'text-amber-ink',
  },
  key: {
    box: 'bg-white border-2 border-coral shadow-soft',
    icon: CircleAlert,
    iconClass: 'text-coral-600',
  },
  highlight: { box: 'bg-cobalt text-white', icon: Sun, iconClass: 'text-amber' },
} as const

export function Callout({
  tone,
  title,
  children,
}: {
  tone: keyof typeof CALLOUT_TONES
  title?: string
  children: ReactNode
}) {
  const { box, icon: Icon, iconClass } = CALLOUT_TONES[tone]
  return (
    <div className={`rounded-(--radius-card) p-5 sm:p-6 ${box}`}>
      <div className="flex items-center gap-2">
        <Icon aria-hidden size={22} className={`shrink-0 ${iconClass}`} />
        {title && (
          <p
            className={`font-heading font-semibold ${tone === 'highlight' ? 'text-white' : 'text-cobalt-deep'}`}
          >
            {title}
          </p>
        )}
      </div>
      <div className="mt-3 space-y-3 leading-relaxed">{children}</div>
    </div>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-(--radius-card) bg-white p-5 shadow-soft ${className}`}>
      {children}
    </div>
  )
}
