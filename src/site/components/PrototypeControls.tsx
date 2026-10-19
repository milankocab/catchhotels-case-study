import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { controls } from '../../content-prototyp'
import { LAYER } from '../floating'
import { usePrototype } from '../state'

/**
 * Plovoucí panel vlevo dole. Ovládá prototyp, není součástí navrhovaného webu.
 */
export function PrototypeControls() {
  const { notes, setNotes, variant, setVariant } = usePrototype()
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`fixed bottom-[calc(1rem+var(--bottom-bar,0px))] left-4 ${LAYER.floatingButtons} flex min-h-11 ring-1 ring-white/40 items-center gap-2 rounded-full bg-cobalt-deep px-4 text-sm font-medium text-white shadow-lift hover:bg-cobalt`}
      >
        <SlidersHorizontal aria-hidden size={18} />
        <span className="max-sm:sr-only">{controls.open}</span>
      </button>
    )
  }

  return (
    <section
      aria-label={controls.title}
      className={`fixed bottom-[calc(1rem+var(--bottom-bar,0px))] left-4 ${LAYER.floatingButtons} w-[min(18rem,calc(100vw-2rem))] animate-rise rounded-(--radius-card) bg-cobalt-deep p-4 text-sm text-white shadow-lift`}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-heading text-base font-semibold text-white">{controls.title}</h2>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={controls.close}
          className="-mr-2 flex size-9 items-center justify-center rounded-full hover:bg-white/10"
        >
          <X aria-hidden size={18} />
        </button>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p id="ovladani-poznamky" className="font-medium">
            {controls.notes}
          </p>
          <p className="mt-0.5 text-xs text-azure-light">{controls.notesHint}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={notes}
          aria-labelledby="ovladani-poznamky"
          onClick={() => setNotes(!notes)}
          className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors ${notes ? 'bg-coral' : 'bg-white/25'}`}
        >
          <span
            aria-hidden
            className={`absolute top-1 left-1 size-5 rounded-full bg-white transition-transform ${notes ? 'translate-x-5' : ''}`}
          />
        </button>
      </div>

      <fieldset className="mt-4 border-t border-white/15 pt-3">
        <legend className="font-medium">{controls.variant}</legend>
        <p className="mt-0.5 text-xs text-azure-light">{controls.variantHint}</p>
        <div className="mt-2 grid grid-cols-2 gap-1 rounded-full bg-white/10 p-1">
          {controls.variants.map((item) => (
            <label
              key={item.id}
              className="flex min-h-9 items-center justify-center rounded-full font-medium transition-colors has-checked:bg-white has-checked:text-cobalt-deep has-focus-visible:outline-2 has-focus-visible:outline-white"
            >
              <input
                type="radio"
                name="varianta-vyhledavani"
                value={item.id}
                checked={variant === item.id}
                onChange={() => setVariant(item.id)}
                className="sr-only"
              />
              {item.label}
            </label>
          ))}
        </div>
        <p className="mt-2 text-xs text-azure-light">
          {controls.variants.find((item) => item.id === variant)?.description}
        </p>
      </fieldset>
    </section>
  )
}
