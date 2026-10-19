import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { placeholder, type SearchTab, type SearchVariant } from '../content-prototyp'
import { PrototypeContext } from './state'

const STORAGE_KEY = 'prototyp-ovladani'

// Nastavení ovládání si pamatuji jen v prohlížeči. Bez úložiště prototyp funguje s výchozími hodnotami.
function readStored(): { notes: boolean; variant: SearchVariant } {
  const fallback = { notes: true, variant: 'B' as SearchVariant }
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (
      parsed &&
      typeof parsed.notes === 'boolean' &&
      (parsed.variant === 'A' || parsed.variant === 'B')
    )
      return parsed
  } catch {
    // Úložiště není dostupné, třeba v anonymním okně.
  }
  return fallback
}

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [stored] = useState(readStored)
  const [notes, setNotes] = useState(stored.notes)
  const [variant, setVariant] = useState<SearchVariant>(stored.variant)
  const [searchTab, setSearchTab] = useState<SearchTab>('stay')
  const [toast, setToast] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ notes, variant }))
    } catch {
      // Viz readStored.
    }
  }, [notes, variant])

  const notify = useCallback((text: string) => {
    setToast(text)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(null), 4500)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const value = useMemo(
    () => ({ notes, setNotes, variant, setVariant, searchTab, setSearchTab, notify }),
    [notes, variant, searchTab, notify],
  )

  return (
    <PrototypeContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex justify-center px-4"
      >
        {toast && (
          <p className="pointer-events-auto flex max-w-md animate-rise items-start gap-3 rounded-(--radius-card) bg-cobalt-deep py-3 pr-2 pl-4 text-sm text-white shadow-lift">
            <span className="py-1">{toast}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label={placeholder.close}
              className="flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-white/10"
            >
              <X aria-hidden size={16} />
            </button>
          </p>
        )}
      </div>
    </PrototypeContext.Provider>
  )
}
