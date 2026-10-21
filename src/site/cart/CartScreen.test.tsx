import { fireEvent, render, screen, within } from '@testing-library/react'
import { cart, czk, destinations, offer } from '../../content-prototyp'
import { SiteApp } from '../SiteApp'
import { cartPayment, emptyForm, validateCart } from './cart'

const form = () => document.getElementById('kosik-formular') as HTMLFormElement
const space = (text?: string | null) => text?.replace(/\s/g, ' ')

/** Úvodní stránka, karta Chorvatsko, pojištění Standard a pokračování do košíku. */
function openCartWithInsurance() {
  render(<SiteApp />)
  fireEvent.click(screen.getByRole('button', { name: new RegExp(destinations.items[1].name) }))
  fireEvent.click(screen.getByRole('radio', { name: /^Doporučujeme\s*Standard/ }))
  const summary = screen.getByRole('complementary', { name: offer.summary.title })
  fireEvent.click(within(summary).getByRole('button', { name: offer.summary.cta }))
}

describe('Obrazovka 3, košík', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    window.history.replaceState(null, '', '/')
  })

  it('z obrazovky 2 otevře košík s vybraným pojištěním a poli pro pojištěné', () => {
    openCartWithInsurance()
    expect(window.location.hash).toBe('#kosik')
    const recap = screen.getByRole('complementary', { name: cart.recap.title })
    const total = offer.stays.more.price + offer.stays.more.insurance.standard
    expect(space(within(recap).getByText(cart.recap.total).nextElementSibling?.textContent)).toBe(
      space(czk(total)),
    )
    expect(screen.getByRole('heading', { name: cart.insured.title })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: cart.driver.title })).toBeNull()
    // Souhlas s marketingem není předem zaškrtnutý a žádný program není předvybraný.
    expect(screen.getByRole('checkbox', { name: cart.consents.marketing })).not.toBeChecked()
    for (const program of cart.payment.programList)
      expect(screen.getByRole('radio', { name: program.name })).not.toBeChecked()
  })

  it('prázdný formulář nepustí dál a fokus skočí na první chybu', () => {
    openCartWithInsurance()
    fireEvent.submit(form())
    expect(screen.getByLabelText(cart.contact.firstName)).toHaveFocus()
    expect(screen.getAllByText(cart.errors.required).length).toBeGreaterThan(0)
    expect(screen.queryByText(cart.done.demo)).toBeNull()
  })

  it('po vyplnění ukáže potvrzení a nabídne auto, které člověk nevybral', () => {
    openCartWithInsurance()
    fireEvent.change(screen.getByLabelText(cart.contact.firstName), { target: { value: 'Jana' } })
    fireEvent.change(screen.getByLabelText(cart.contact.lastName), { target: { value: 'Nová' } })
    fireEvent.change(screen.getByLabelText(cart.contact.email), {
      target: { value: 'jana@example.com' },
    })
    // První pojištěná osoba se převezme z kontaktu, druhou je potřeba vyplnit.
    const names = screen.getAllByLabelText(cart.insured.name)
    expect(names[0]).toHaveValue('Jana Nová')
    fireEvent.change(names[1], { target: { value: 'Petr Nový' } })
    for (const birth of screen.getAllByLabelText(cart.insured.birth))
      fireEvent.change(birth, { target: { value: '1. 5. 1990' } })
    fireEvent.click(screen.getByRole('radio', { name: 'Pluxee' }))
    fireEvent.click(screen.getByRole('checkbox', { name: cart.consents.terms }))
    fireEvent.submit(form())

    expect(screen.getByText(cart.done.demo)).toBeInTheDocument()
    expect(screen.getByText(cart.done.docs.insurance)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: cart.done.upsellCar })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: cart.done.upsellAdd }))
    expect(screen.getByText(cart.done.docs.car)).toBeInTheDocument()
  })

  it('doplněk jde odebrat a odebrání vrátit', () => {
    openCartWithInsurance()
    const recap = screen.getByRole('complementary', { name: cart.recap.title })
    fireEvent.click(within(recap).getByRole('button', { name: /^Odebrat/ }))
    expect(screen.queryByRole('heading', { name: cart.insured.title })).toBeNull()
    fireEvent.click(within(recap).getByRole('button', { name: cart.recap.undo }))
    expect(screen.getByRole('heading', { name: cart.insured.title })).toBeInTheDocument()
  })

  it('ve variantě B testu 3 vede karta destinace rovnou do košíku s nabídkou doplňků', () => {
    localStorage.setItem(
      'prototyp-ovladani-v2',
      JSON.stringify({ notes: true, variant: 'A', addonsVariant: 'B' }),
    )
    render(<SiteApp />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(destinations.items[1].name) }))
    expect(window.location.hash).toBe('#kosik')
    expect(screen.getByRole('heading', { name: cart.offer.title })).toBeInTheDocument()
    expect(screen.getByText(cart.stepsShort[1], { selector: 'span' })).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button', { name: cart.offer.add })[0])
    expect(screen.getByRole('heading', { name: cart.insured.title })).toBeInTheDocument()
  })
})

describe('Výpočet košíku', () => {
  const trip = {
    stayId: 'more' as const,
    insurance: 'standard' as const,
    car: null,
    balance: 15000,
  }

  it('předvyplní benefity podle zůstatku a dopočítá doplatek', () => {
    const pay = cartPayment(trip, null)
    expect(pay.total).toBe(18900 + 690)
    expect(pay.fromBenefits).toBe(15000)
    expect(pay.topUp).toBe(18900 + 690 - 15000)
  })

  it('přepsaná částka nepřesáhne celkovou cenu', () => {
    const pay = cartPayment(trip, 50000)
    expect(pay.fromBenefits).toBe(pay.total)
    expect(pay.topUp).toBe(0)
    expect(pay.overLimit).toBe(true)
  })

  it('bez benefitů nechce program, s benefity ano', () => {
    const form = {
      ...emptyForm(2),
      firstName: 'Jana',
      lastName: 'Nová',
      email: 'jana@example.com',
      terms: true,
      persons: [
        { name: null, birth: '1. 5. 1990' },
        { name: 'Petr Nový', birth: '2. 6. 1988' },
      ],
    }
    expect(validateCart(form, trip, 0)).toEqual([])
    expect(validateCart(form, trip, 1000).map(([id]) => id)).toEqual(['kosik-program-edenred'])
  })
})
