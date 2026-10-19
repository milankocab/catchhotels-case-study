import { fireEvent, render, screen, within } from '@testing-library/react'
import { czk, tripBuilder } from '../../content-prototyp'
import { SiteApp } from '../SiteApp'
import { tripTotals } from './trip'

const sea = tripBuilder.presets[1]
// Testing Library porovnává text s obyčejnými mezerami, Intl vrací nezlomitelné.
const text = (value: string) => value.replace(/\s/g, ' ')

describe('Trip builder', () => {
  it('spočítá doplatek, když benefity nestačí', () => {
    expect(tripTotals(sea, ['car', 'insurance'], 20000)).toEqual({
      total: 22890,
      fromBenefits: 20000,
      topUp: 2890,
      left: 0,
    })
    expect(tripTotals(sea, [], 22000).topUp).toBe(0)
  })

  it('po přidání auta přepočítá souhrn a ukáže doplatek', () => {
    render(<SiteApp />)
    const summary = screen.getByRole('complementary', { name: tripBuilder.summaryTitle })
    fireEvent.change(within(summary).getByRole('textbox'), { target: { value: '20000' } })
    expect(within(summary).getByText(tripBuilder.covered)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /^Přidat auto od 3.600 Kč$/ }))
    expect(within(summary).getByText(text(czk(sea.stay.price + sea.car.price)))).toBeInTheDocument()
    expect(within(summary).getByText(text(tripBuilder.topUp(czk(2500))))).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: `${tripBuilder.remove}: Auto` }))
    expect(within(summary).getByText(tripBuilder.covered)).toBeInTheDocument()
  })
})
