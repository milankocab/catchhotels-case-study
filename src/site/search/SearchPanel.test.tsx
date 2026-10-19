import { fireEvent, render, screen } from '@testing-library/react'
import { SiteApp } from '../SiteApp'
import { offer, search } from '../../content-prototyp'

const setVariant = (variant: 'A' | 'B') =>
  localStorage.setItem('prototyp-ovladani-v2', JSON.stringify({ notes: true, variant }))

describe('Vyhledávání na úvodní stránce', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    window.history.replaceState(null, '', '/')
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 9, 19, 12))
  })
  afterEach(() => vi.useRealTimers())

  it('ve variantě A ukazuje termín a osoby hned', () => {
    setVariant('A')
    render(<SiteApp />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Termín/ })).toBeInTheDocument()
  })

  it('ve variantě B ukáže termín až po zadání místa, stejně jako dnešní web', () => {
    setVariant('B')
    render(<SiteApp />)
    expect(screen.queryByRole('button', { name: /Termín/ })).not.toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText(search.combinedPlaceholder), {
      target: { value: 'Praha' },
    })
    expect(screen.getByRole('button', { name: /Termín/ })).toBeInTheDocument()
  })

  it('našeptává hotely podle názvu a pozná vložený odkaz z Booking.com', () => {
    setVariant('A')
    render(<SiteApp />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: 'zátoka' } })
    expect(screen.getByRole('option', { name: /Hotel Modrá zátoka/ })).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'https://www.booking.com/hotel/cz/x.html' } })
    fireEvent.click(screen.getByRole('option', { name: new RegExp(search.fromLink) }))
    expect(screen.getByText(search.next.hotel)).toBeInTheDocument()
  })

  it('bez místa upozorní na chybu a po odeslání si hledání zapamatuje', () => {
    setVariant('A')
    render(<SiteApp />)
    fireEvent.click(screen.getByRole('button', { name: search.submit }))
    expect(screen.getByText(search.destinationError)).toBeInTheDocument()

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Praha' } })
    fireEvent.click(screen.getByRole('button', { name: search.submit }))
    // Bez termínu se otevře kalendář. Dnešek je v testu 19. 10. 2026.
    fireEvent.click(screen.getByRole('button', { name: /13\. listopadu/ }))
    fireEvent.click(screen.getByRole('button', { name: /15\. listopadu/ }))
    fireEvent.click(screen.getByRole('button', { name: /Potvrdit · 2 noci/ }))
    fireEvent.click(screen.getByRole('button', { name: search.guests.done }))
    fireEvent.click(screen.getByRole('button', { name: search.submit }))
    // Prototyp přeskočí výsledky a otevře nabídku doplňků s pobytem v Praze.
    expect(screen.getByRole('heading', { level: 1, name: offer.title })).toBeInTheDocument()
    expect(screen.getByText(offer.stays.mesto.name)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: offer.change }))
    expect(screen.getByText(search.recentTitle)).toBeInTheDocument()
  })
})
