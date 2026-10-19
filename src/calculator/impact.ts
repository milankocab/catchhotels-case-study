export interface CategoryInput {
  /** Podíl rezervací s doplňkem v procentech. */
  attachPct: number
  /** Průměrná cena doplňku v Kč. */
  price: number
  /** Provize z ceny doplňku v procentech. */
  commissionPct: number
}

export interface ImpactInput {
  bookings: number
  insurance: CategoryInput
  car: CategoryInput
}

export interface CategoryResult {
  units: number
  turnover: number
  revenue: number
}

export interface ImpactResult {
  insurance: CategoryResult
  car: CategoryResult
  units: number
  turnover: number
  revenue: number
  revenuePerBooking: number
}

function category(bookings: number, input: CategoryInput): CategoryResult {
  // Počet prodaných doplňků zaokrouhluji na celé kusy. Obrat i provize počítám z nich.
  const units = Math.round((bookings * input.attachPct) / 100)
  const turnover = units * input.price
  const revenue = (turnover * input.commissionPct) / 100
  return { units, turnover, revenue }
}

export function calculateImpact(input: ImpactInput): ImpactResult {
  const insurance = category(input.bookings, input.insurance)
  const car = category(input.bookings, input.car)
  const revenue = insurance.revenue + car.revenue
  return {
    insurance,
    car,
    units: insurance.units + car.units,
    turnover: insurance.turnover + car.turnover,
    revenue,
    revenuePerBooking: input.bookings > 0 ? revenue / input.bookings : 0,
  }
}

const czk = new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 })
const czkPrecise = new Intl.NumberFormat('cs-CZ', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatNumber(value: number): string {
  return czk.format(value)
}

export function formatCzk(value: number, precise = false): string {
  return `${(precise ? czkPrecise : czk).format(value)} Kč`
}
