import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { placeholder, type SearchTab, type SearchVariant } from '../content-prototyp'
import { LAYER } from './floating'
import { PrototypeContext } from './state'

// Verze v klíči, protože se prohodily varianty A a B. Staré uložené nastavení by je zaměnilo.
const STORAGE_KEY = 'prototyp-ovladani-v2'

// Nastavení ovládání si pamatuji jen v prohlížeči. Bez úložiště prototyp funguje s výchozími hodnotami.
function readStored(): { notes: boolean; variant: SearchVariant } {
  const fallback = { notes: true, variant: 'A' as SearchVariant }
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
  const [activeNote, setActiveNote] = useState<string | null>(null)
  const [noteNumbers, setNoteNumbers] = useState<Record<string, number>>({})
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

  // Poznámky číslují viditelné prvky v pořadí na stránce. Skryté (třeba jen pro desktop,
  // nebo pole, které varianta B nemá) číslo nedostanou, takže v řadě nejsou mezery.
  useEffect(() => {
    const schedule =
      window.requestAnimationFrame ?? ((callback: () => void) => window.setTimeout(callback, 16))
    const cancel = window.cancelAnimationFrame ?? window.clearTimeout
    let frame = 0
    const compute = () => {
      cancel(frame)
      frame = schedule(() => {
        const all = [...document.querySelectorAll<HTMLElement>('[data-note]')]
        // V testovacím prostředí nemají prvky rozměry, pak čísluji v pořadí v HTML.
        const measurable = all.some((element) => element.getClientRects().length > 0)
        const visible = measurable
          ? all.filter((element) => element.getClientRects().length > 0)
          : all
        // Pořadí podle polohy na stránce: shora dolů, ve stejném řádku zleva doprava.
        // Plovoucí prvky jdou až na konec v pořadí v HTML, aby chat nezměnil číslo,
        // když se objeví připnuté hledání.
        const position = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect()
          const floating = element.closest('.fixed') !== null
          return {
            floating,
            row: Math.round((rect.top + (floating ? 0 : window.scrollY)) / 24),
            left: rect.left,
          }
        }
        const placed = visible.map((element) => ({ element, ...position(element) }))
        if (measurable)
          placed.sort((a, b) =>
            a.floating || b.floating
              ? Number(a.floating) - Number(b.floating)
              : a.row - b.row || a.left - b.left,
          )
        const next: Record<string, number> = {}
        let count = 0
        for (const { element } of placed) {
          const id = element.dataset.note ?? ''
          if (!(id in next)) next[id] = ++count
        }
        setNoteNumbers((current) =>
          JSON.stringify(current) === JSON.stringify(next) ? current : next,
        )
      })
    }
    compute()
    const observer = new MutationObserver(compute)
    observer.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('resize', compute)
    return () => {
      cancel(frame)
      observer.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [])

  const value = useMemo(
    () => ({
      notes,
      setNotes,
      variant,
      setVariant,
      searchTab,
      setSearchTab,
      notify,
      activeNote,
      setActiveNote,
      noteNumbers,
    }),
    [notes, variant, searchTab, notify, activeNote, noteNumbers],
  )

  return (
    <PrototypeContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed inset-x-0 bottom-20 ${LAYER.toast} flex justify-center px-4`}
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
