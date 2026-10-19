// Našeptávač pro variantu B (zjištění 1.1, prvky A a E). Data jsou fiktivní.
import { search } from '../../content-prototyp'

type Suggestion = { name: string; detail: string }

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()

/** Odkaz na hotel z Booking.com, který dnešní web umí zpracovat. */
export function looksLikeBookingLink(value: string): boolean {
  return /booking\.com\/hotel\//i.test(value.trim())
}

/** Bez textu vrátí oblíbená místa. Jinak místa a hotely, jejichž název obsahuje hledaný text. */
export function matchSuggestions(query: string): { places: Suggestion[]; hotels: Suggestion[] } {
  const needle = normalize(query)
  if (!needle) return { places: search.places.slice(0, 4), hotels: [] }
  const hit = (item: Suggestion) =>
    normalize(item.name).includes(needle) || normalize(item.detail).includes(needle)
  return { places: search.places.filter(hit), hotels: search.hotels.filter(hit) }
}
