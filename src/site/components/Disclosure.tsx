import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { useDetailsMotion } from '../motion'

/**
 * Rozbalovací otázka postavená na details a summary. Text je v HTML i zavřený,
 * takže ho přečtou vyhledávače i čtečky a funguje bez JavaScriptu. Odpověď se plynule vysune.
 */
export function Disclosure({ question, children }: { question: string; children: ReactNode }) {
  const { detailsRef, contentRef, onSummaryClick } = useDetailsMotion()
  return (
    <details
      ref={detailsRef}
      className="group rounded-[12px] bg-white shadow-soft transition-shadow open:shadow-lift"
    >
      <summary
        onClick={onSummaryClick}
        className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-medium text-cobalt-deep [&::-webkit-details-marker]:hidden"
      >
        {question}
        <ChevronDown
          aria-hidden
          size={18}
          className="shrink-0 text-cobalt transition-transform group-open:rotate-180"
        />
      </summary>
      <div ref={contentRef} className="overflow-hidden">
        <div className="px-4 pb-4 text-sm leading-relaxed text-ink">{children}</div>
      </div>
    </details>
  )
}
