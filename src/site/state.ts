import { createContext, useContext, type Dispatch, type SetStateAction } from 'react'
import type { AddonsVariant, SearchVariant } from '../content-prototyp'

export type PrototypeState = {
  /** Zobrazit čísla s poznámkami „proč“ u změn. */
  notes: boolean
  setNotes: (value: boolean) => void
  /** Varianta A/B testu vyhledávacího pole. */
  variant: SearchVariant
  setVariant: (value: SearchVariant) => void
  /** Varianta A/B testu 3, kde nabídnout doplňky. */
  addonsVariant: AddonsVariant
  setAddonsVariant: (value: AddonsVariant) => void
  /** Krátké upozornění dole na obrazovce, třeba u odkazů mimo prototyp. */
  notify: (text: string) => void
  /** Otevřená poznámka „proč“. Najednou je otevřená vždy jen jedna. */
  activeNote: string | null
  setActiveNote: Dispatch<SetStateAction<string | null>>
  /** Pořadová čísla poznámek podle toho, jak jdou na stránce shora dolů. */
  noteNumbers: Record<string, number>
}

export const PrototypeContext = createContext<PrototypeState | null>(null)

export function usePrototype(): PrototypeState {
  const state = useContext(PrototypeContext)
  if (!state) throw new Error('usePrototype musí být uvnitř PrototypeProvider')
  return state
}

/** Plynule posune stránku na sekci. Hash v adrese neměním, aby se nepletl s kotvami studie. */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
}

/** Události mezi sekcemi. Sekce Booking.com otevírá cestu v průvodci a vložení odkazu v hledání. */
export const GUIDE_EVENT = 'prototyp:pruvodce'
export const LINK_EVENT = 'prototyp:odkaz'
