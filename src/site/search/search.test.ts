import { formatRange, fromIsoDate, monthGrid, nightsBetween, toIsoDate } from './dates'
import { loadRecent, RECENT_TTL, saveRecent, type RecentSearch } from './recent'
import { looksLikeBookingLink, matchSuggestions } from './suggest'

describe('dates', () => {
  it('počítá noci i přes změnu času', () => {
    expect(nightsBetween(new Date(2026, 9, 24), new Date(2026, 9, 28))).toBe(4)
  })

  it('mřížka listopadu 2026 začíná nedělí, tedy šesti prázdnými místy', () => {
    const grid = monthGrid(2026, 10)
    expect(grid.slice(0, 6)).toEqual(Array(6).fill(null))
    expect(grid[6]?.getDate()).toBe(1)
    expect(grid).toHaveLength(36)
  })

  it('zkracuje termín podle měsíce a roku', () => {
    expect(formatRange(new Date(2026, 10, 13), new Date(2026, 10, 15))).toBe('13.–15. 11. 2026')
    expect(formatRange(new Date(2026, 10, 28), new Date(2026, 11, 2))).toBe('28. 11. – 2. 12. 2026')
    expect(formatRange(new Date(2026, 11, 30), new Date(2027, 0, 2))).toBe(
      '30. 12. 2026 – 2. 1. 2027',
    )
  })

  it('převádí datum tam a zpět', () => {
    expect(toIsoDate(fromIsoDate('2026-11-13')!)).toBe('2026-11-13')
    expect(fromIsoDate('13. 11.')).toBeNull()
  })
})

describe('nedávné hledání', () => {
  const now = new Date(2026, 9, 19, 12)
  const search: RecentSearch = {
    destination: 'Praha',
    start: '2026-11-13',
    end: '2026-11-15',
    adults: 2,
    children: 0,
    savedAt: now.getTime(),
  }

  beforeEach(() => localStorage.clear())

  it('vrátí uložené hledání', () => {
    saveRecent(search)
    expect(loadRecent(now)).toEqual(search)
  })

  it('po týdnu hledání zapomene', () => {
    saveRecent(search)
    expect(loadRecent(new Date(now.getTime() + RECENT_TTL + 1))).toBeNull()
  })

  it('zapomene hledání, jehož termín už začal', () => {
    saveRecent({ ...search, start: '2026-10-18' })
    expect(loadRecent(now)).toBeNull()
  })
})

describe('našeptávač', () => {
  it('pozná odkaz na hotel z Booking.com', () => {
    expect(looksLikeBookingLink('https://www.booking.com/hotel/cz/nerudova.cs.html')).toBe(true)
    expect(looksLikeBookingLink('Praha')).toBe(false)
  })

  it('hledá bez diakritiky v místech i hotelech', () => {
    const result = matchSuggestions('snez')
    expect(result.hotels.map((item) => item.name)).toContain('Horský hotel Pod Sněžkou')
    expect(matchSuggestions('krkonose').places[0].name).toBe('Krkonoše')
  })
})
