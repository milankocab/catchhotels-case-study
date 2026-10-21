import { fireEvent, render, screen, within } from '@testing-library/react'
import { czk, destinations, hero, offer, tripBuilder } from '../../content-prototyp'
import { SiteApp } from '../SiteApp'
import { offerTotals, stayFromText } from '../trip/offer'

const totalIn = (summary: HTMLElement) =>
  within(summary)
    .getByText(offer.summary.total)
    .nextElementSibling?.textContent?.replace(/\s/g, ' ')

describe('Obrazovka 2, nabídka doplňků', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    window.history.replaceState(null, '', '/')
  })

  it('karta destinace otevře pobyt bez předvybraných doplňků', () => {
    render(<SiteApp />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(destinations.items[1].name) }))
    expect(window.location.hash).toBe('#doplnky')
    expect(screen.getByText(offer.stays.more.name)).toBeInTheDocument()
    for (const radio of screen.getAllByRole('radio')) expect(radio).not.toBeChecked()
    // Nic nevybráno, proto je hlavní tlačítko „Pokračovat bez doplňků“.
    const summary = screen.getByRole('complementary', { name: offer.summary.title })
    expect(within(summary).getByRole('button', { name: offer.summary.skip })).toBeInTheDocument()
    expect(within(summary).queryByRole('button', { name: offer.summary.cta })).toBeNull()
  })

  it('po výběru pojištění přepočítá souhrn a nabídne obě tlačítka', () => {
    render(<SiteApp />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(destinations.items[1].name) }))
    fireEvent.click(screen.getByRole('radio', { name: /^Doporučujeme\s*Standard/ }))
    const summary = screen.getByRole('complementary', { name: offer.summary.title })
    const total = offer.stays.more.price + offer.stays.more.insurance.standard
    expect(totalIn(summary)).toBe(czk(total).replace(/\s/g, ' '))
    expect(within(summary).getByRole('button', { name: offer.summary.cta })).toBeInTheDocument()
    expect(within(summary).getByRole('button', { name: offer.summary.skip })).toBeInTheDocument()
  })

  it('trip builder předvyplní přidané doplňky se stejnou cenou', () => {
    render(<SiteApp />)
    fireEvent.click(screen.getByRole('button', { name: /^Přidat auto od 3.600 Kč$/ }))
    fireEvent.click(screen.getByRole('button', { name: tripBuilder.cta }))
    expect(screen.getByRole('radio', { name: /Malé auto/ })).toBeChecked()
    const summary = screen.getByRole('complementary', { name: offer.summary.title })
    expect(totalIn(summary)).toBe(czk(18900 + 3600).replace(/\s/g, ' '))
  })

  it('Změnit vrátí na úvodní stránku', () => {
    render(<SiteApp />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(destinations.items[0].name) }))
    fireEvent.click(screen.getByRole('button', { name: offer.change }))
    expect(screen.getByRole('heading', { level: 1, name: hero.title })).toBeInTheDocument()
  })
})

describe('Výpočet nabídky', () => {
  it('rozdělí cenu mezi benefity a doplatek', () => {
    const totals = offerTotals({ stayId: 'more', insurance: 'plus', car: 'family', balance: 20000 })
    expect(totals.total).toBe(18900 + 1090 + 5200)
    expect(totals.fromBenefits).toBe(20000)
    expect(totals.topUp).toBe(5190)
  })

  it('ceny navazují na trip builder', () => {
    for (const preset of tripBuilder.presets) {
      const stay = offer.stays[preset.id as keyof typeof offer.stays]
      expect(stay.price).toBe(preset.stay.price)
      expect(stay.insurance.basic).toBe(preset.insurance.price)
      expect(stay.car.small).toBe(preset.car.price)
    }
  })

  it('podle hledaného místa vybere ukázkový pobyt', () => {
    expect(stayFromText('Krkonoše')).toBe('hory')
    expect(stayFromText('Praha')).toBe('mesto')
    expect(stayFromText('Rakouské Alpy')).toBe('alpy')
    expect(stayFromText('Split')).toBe('more')
  })
})
