import { cart, type PayMethod, type ProgramId } from '../../content-prototyp'
import { isCar, isTier, offerTotals, type Trip } from '../trip/offer'

// Výpočty a kontrola formuláře košíku. Oddělené od komponent, aby šly testovat samostatně.

export type Person = { name: string | null; birth: string }

/** Stav formuláře. Null u jména znamená „převzít z kontaktních údajů“, dokud ho člověk nepřepíše. */
export type Form = {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  city: string
  zip: string
  company: string
  note: string
  persons: Person[]
  driver: string | null
  driverAge: boolean
  program: ProgramId | null
  /** Částka z benefitů. Null znamená předvyplnit podle zůstatku. */
  amount: number | null
  method: PayMethod
  terms: boolean
  marketing: boolean
}

export const emptyForm = (guests: number): Form => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  zip: '',
  company: '',
  note: '',
  persons: Array.from({ length: guests }, () => ({ name: null, birth: '' })),
  driver: null,
  driverAge: false,
  program: null,
  amount: null,
  method: 'card',
  terms: false,
  marketing: false,
})

/** Rozdělení platby. Benefity nejdřív, maximálně do celkové ceny, zbytek doplatek. */
export function cartPayment(trip: Trip, amount: number | null) {
  const totals = offerTotals(trip)
  const wanted = amount ?? totals.fromBenefits
  const fromBenefits = Math.min(Math.max(wanted, 0), totals.total)
  return {
    ...totals,
    fromBenefits,
    topUp: totals.total - fromBenefits,
    share: totals.total > 0 ? fromBenefits / totals.total : 1,
    overLimit: wanted > totals.total,
  }
}

const BIRTH = /^\s*\d{1,2}\.\s*\d{1,2}\.\s*(19|20)\d{2}\s*$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Chyby v pořadí, v jakém jsou pole na stránce. Klíč je id pole, na které skočí fokus. */
export function validateCart(form: Form, trip: Trip, fromBenefits: number) {
  const errors: [string, string][] = []
  const contactName = `${form.firstName} ${form.lastName}`.trim()
  if (!form.firstName.trim()) errors.push(['kosik-jmeno', cart.errors.required])
  if (!form.lastName.trim()) errors.push(['kosik-prijmeni', cart.errors.required])
  if (!form.email.trim()) errors.push(['kosik-email', cart.errors.required])
  else if (!EMAIL.test(form.email.trim())) errors.push(['kosik-email', cart.errors.email])
  if (isTier(trip.insurance))
    form.persons.forEach((person, index) => {
      const name = person.name ?? (index === 0 ? contactName : '')
      if (!name.trim()) errors.push([`kosik-osoba-${index}`, cart.errors.required])
      if (!person.birth.trim()) errors.push([`kosik-narozeni-${index}`, cart.errors.required])
      else if (!BIRTH.test(person.birth))
        errors.push([`kosik-narozeni-${index}`, cart.errors.birth])
    })
  if (isCar(trip.car)) {
    if (!(form.driver ?? contactName).trim()) errors.push(['kosik-ridic', cart.errors.required])
    if (!form.driverAge) errors.push(['kosik-ridic-vek', cart.errors.age])
  }
  if (fromBenefits > 0 && !form.program)
    errors.push([`kosik-program-${cart.payment.programList[0].id}`, cart.errors.program])
  if (!form.terms) errors.push(['kosik-podminky', cart.errors.terms])
  return errors
}
