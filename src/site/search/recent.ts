// Nedávné hledání (zjištění 1.11). Ukládá se jen v prohlížeči a po sedmi dnech zmizí.
import type { SearchTab } from '../../content-prototyp'
import { fromIsoDate, startOfDay } from './dates'

export type RecentSearch = {
  tab: SearchTab
  destination: string
  start: string | null
  end: string | null
  adults: number
  children: number
  savedAt: number
}

const KEY = 'prototyp-nedavne-hledani'
export const RECENT_TTL = 7 * 86_400_000

/** Vrátí uložené hledání, pokud není starší než týden a termín ještě neuplynul. */
export function loadRecent(now = new Date()): RecentSearch | null {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null') as RecentSearch | null
    if (!saved || typeof saved.savedAt !== 'number' || !saved.destination) return null
    if (now.getTime() - saved.savedAt > RECENT_TTL) return null
    const start = saved.start ? fromIsoDate(saved.start) : null
    if (start && start < startOfDay(now)) return null
    return saved
  } catch {
    return null
  }
}

export function saveRecent(search: RecentSearch) {
  try {
    localStorage.setItem(KEY, JSON.stringify(search))
  } catch {
    // Úložiště není dostupné. Hledání funguje i bez něj.
  }
}
