import { useCallback, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Lightbulb, X } from 'lucide-react'
import { notes, type NoteId } from '../../content-prototyp'
import { LAYER, useFloating, useOutside } from '../floating'
import { usePrototype } from '../state'

/**
 * Malé číslo u změněné části stránky. Čísla jdou po stránce shora dolů. Po kliknutí ukáže,
 * proč změna vznikla a z kterého bodu analýzy vychází. Panel se vykreslí přes portál nad vším
 * ostatním, standardně pod číslem, a když se tam nevejde, tam, kde je místo. Otevřená je vždy jen jedna poznámka.
 * Když jsou poznámky v ovládání vypnuté, nic se nevykreslí.
 */
export function Note({ id, className = '' }: { id: NoteId; className?: string }) {
  const { notes: enabled, activeNote, setActiveNote, noteNumbers } = usePrototype()
  const key = useId()
  const open = enabled && activeNote === key
  const anchor = useRef<HTMLSpanElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const close = useCallback(
    () => setActiveNote((current) => (current === key ? null : current)),
    [key, setActiveNote],
  )
  useOutside([anchor, panel], open, close)
  useFloating(open, anchor, panel)

  if (!enabled) return null
  const note = notes.items[id]
  const number = noteNumbers[id]
  // Bez vlastního umístění je obal relative, aby šel posunout třídami z rodiče.
  const position = /\b(absolute|fixed)\b/.test(className) ? '' : 'relative'

  return (
    <span
      ref={anchor}
      data-keep-open
      data-note={id}
      className={`${position} z-10 inline-flex animate-pop align-middle ${className}`}
    >
      <button
        type="button"
        onClick={() => setActiveNote(open ? null : key)}
        aria-expanded={open}
        aria-controls={open ? `${key}-panel` : undefined}
        aria-label={`${number ? notes.number(number) : ''}, ${notes.open}`}
        className={`inline-flex h-6 min-w-6 items-center justify-center gap-0.5 rounded-full border-2 border-coral px-1.5 font-sans text-[11px] leading-none font-semibold shadow-soft transition ${
          open ? 'bg-coral-600 text-white' : 'bg-white text-coral-600 hover:bg-coral-light'
        }`}
      >
        <Lightbulb aria-hidden size={11} strokeWidth={2.5} />
        {number ?? ''}
      </button>
      {open &&
        createPortal(
          <div
            ref={panel}
            id={`${key}-panel`}
            role="dialog"
            aria-label={note.title}
            data-keep-open
            style={{ visibility: 'hidden' }}
            className={`fixed top-0 left-0 ${LAYER.note} w-[min(20rem,calc(100vw-16px))] overflow-y-auto rounded-(--radius-card) border-2 border-coral bg-white p-4 text-left font-sans text-sm font-normal text-ink shadow-lift`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-coral-600">
                  {number ? notes.number(number) : ''}
                </p>
                <p className="font-heading text-base font-semibold text-cobalt-deep">
                  {note.title}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={notes.close}
                className="-mt-1 -mr-2 flex size-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-surface-warm"
              >
                <X aria-hidden size={16} />
              </button>
            </div>
            <p className="mt-2 leading-relaxed">{note.text}</p>
            <p className="mt-3 border-t border-line pt-2 text-xs text-muted">
              {notes.source}: <span className="font-medium text-cobalt-deep">{note.source}</span>
            </p>
          </div>,
          document.body,
        )}
    </span>
  )
}
