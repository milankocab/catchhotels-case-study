import { fireEvent, render, screen, within } from '@testing-library/react'
import { bookingSection, faq, guide, search } from '../../content-prototyp'
import { SiteApp } from '../SiteApp'

describe('Spodní sekce úvodní stránky', () => {
  beforeEach(() => localStorage.clear())

  it('průvodce jde krok za krokem a cesty se dají přepnout', () => {
    render(<SiteApp />)
    const section = screen.getByRole('region', { name: guide.title })
    expect(within(section).getByText(guide.stepOf(1, 6))).toBeInTheDocument()
    fireEvent.click(within(section).getByRole('button', { name: new RegExp(guide.next) }))
    expect(within(section).getByText(guide.stepOf(2, 6))).toBeInTheDocument()

    fireEvent.click(within(section).getByRole('tab', { name: /Rozšíření do prohlížeče/ }))
    expect(within(section).getByText(guide.stepOf(1, 4))).toBeInTheDocument()
  })

  it('tlačítko Ukázat v průvodci otevře cestu s rozšířením', () => {
    render(<SiteApp />)
    fireEvent.click(screen.getByRole('button', { name: bookingSection.extension.demo }))
    expect(screen.getByRole('tab', { name: /Rozšíření do prohlížeče/ })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('Vložit odkaz přepne hledání na pole pro odkaz', () => {
    render(<SiteApp />)
    fireEvent.click(screen.getByRole('button', { name: bookingSection.link.cta }))
    expect(screen.getByPlaceholderText(search.link.placeholder)).toBeInTheDocument()
  })

  it('časté dotazy přepínají kategorie', () => {
    render(<SiteApp />)
    const section = screen.getByRole('region', { name: faq.title })
    expect(within(section).getByText(faq.categories[0].items[0].question)).toBeInTheDocument()
    fireEvent.click(within(section).getByRole('tab', { name: 'Auto' }))
    expect(within(section).getByText(faq.categories[2].items[0].question)).toBeInTheDocument()
    expect(within(section).getByText(faq.sample)).toBeInTheDocument()
  })
})
