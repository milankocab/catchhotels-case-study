import { createContext, useContext } from 'react'
import type { SearchTab, SearchVariant } from '../content-prototyp'

export type PrototypeState = {
  /** Zobrazit čísla s poznámkami „proč“ u změn. */
  notes: boolean
  setNotes: (value: boolean) => void
  /** Varianta A/B testu vyhledávacího pole. */
  variant: SearchVariant
  setVariant: (value: SearchVariant) => void
  /** Aktivní záložka vyhledávání. Mění ji i menu v hlavičce. */
  searchTab: SearchTab
  setSearchTab: (value: SearchTab) => void
  /** Krátké upozornění dole na obrazovce, třeba u odkazů mimo prototyp. */
  notify: (text: string) => void
}

export const PrototypeContext = createContext<PrototypeState | null>(null)

export function usePrototype(): PrototypeState {
  const state = useContext(PrototypeContext)
  if (!state) throw new Error('usePrototype musí být uvnitř PrototypeProvider')
  return state
}

/** Plynule posune stránku na sekci. Hash v adrese neměním, aby se nepletl s kotvami studie. */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
