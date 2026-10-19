import { useCallback, useId, useRef, useState } from 'react'
import { Lightbulb, X } from 'lucide-react'
import { notes, type NoteId } from '../../content-prototyp'
import { usePrototype } from '../state'
import { useDismiss } from '../useDismiss'

/**
 * Malé číslo u změněné části stránky. Po kliknutí ukáže, proč změna vznikla a ke kterému
 * zjištění z auditu patří. Když jsou poznámky v ovládání vypnuté, nic se nevykreslí.
 */
export function Note({ id, className = '' }: { id: NoteId; className?: string }) {
  const { notes: enabled } = usePrototype()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const panelId = useId()
  const close = useCallback(() => setOpen(false), [])
  useDismiss(ref, open, close)

  if (!enabled) return null
  const note = notes.items[id]
  // Bez vlastního umístění je obal relative, aby se k němu panel s poznámkou zarovnal.
  const position = /\b(absolute|fixed)\b/.test(className) ? '' : 'relative'

  return (
    <span ref={ref} className={`${position} z-10 inline-flex align-middle ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${notes.open}, ${notes.finding} ${note.finding}`}
        className="inline-flex h-6 min-w-6 items-center justify-center gap-0.5 rounded-full border-2 border-coral bg-white px-1.5 font-sans text-[11px] leading-none font-semibold text-coral-600 shadow-soft transition hover:bg-coral-light"
      >
        <Lightbulb aria-hidden size={11} strokeWidth={2.5} />
        {note.finding}
      </button>
      {open && (
        <span
          id={panelId}
          role="dialog"
          aria-label={note.title}
          className="z-50 block animate-rise rounded-(--radius-card) border-2 border-coral bg-white p-4 text-left font-sans text-sm font-normal text-ink shadow-lift max-sm:fixed max-sm:inset-x-4 max-sm:bottom-20 sm:absolute sm:top-full sm:left-1/2 sm:mt-2 sm:w-80 sm:-translate-x-1/2"
        >
          <span className="flex items-start justify-between gap-2">
            <span>
              <span className="block text-xs font-medium text-coral-600">
                {notes.finding} {note.finding}
              </span>
              <span className="block font-heading text-base font-semibold text-cobalt-deep">
                {note.title}
              </span>
            </span>
            <button
              type="button"
              onClick={close}
              aria-label={notes.close}
              className="-mt-1 -mr-2 flex size-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-surface-warm"
            >
              <X aria-hidden size={16} />
            </button>
          </span>
          <span className="mt-2 block leading-relaxed">{note.text}</span>
        </span>
      )}
    </span>
  )
}
