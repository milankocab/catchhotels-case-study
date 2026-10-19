import { calculateImpact } from './impact'
import { calculator } from '../content'

describe('calculateImpact', () => {
  it('odpovídá ručnímu výpočtu s výchozími předpoklady', () => {
    // Ruční výpočet (30 000 rezervací):
    // Pojištění 30 000 × 5 % = 1 500 ks, obrat 1 500 × 600 = 900 000 Kč, provize 20 % = 180 000 Kč.
    // Auto 30 000 × 2 % = 600 ks, obrat 600 × 4 500 = 2 700 000 Kč, provize 8 % = 216 000 Kč.
    // Celkem 2 100 ks, obrat 3 600 000 Kč, provize 396 000 Kč, na rezervaci 13,20 Kč.
    const d = calculator.defaults
    const result = calculateImpact({
      bookings: 30000,
      insurance: {
        attachPct: d.insuranceAttach,
        price: d.insurancePrice,
        commissionPct: d.insuranceCommission,
      },
      car: { attachPct: d.carAttach, price: d.carPrice, commissionPct: d.carCommission },
    })
    expect(result.insurance).toEqual({ units: 1500, turnover: 900000, revenue: 180000 })
    expect(result.car).toEqual({ units: 600, turnover: 2700000, revenue: 216000 })
    expect(result.units).toBe(2100)
    expect(result.turnover).toBe(3600000)
    expect(result.revenue).toBe(396000)
    expect(result.revenuePerBooking).toBeCloseTo(13.2, 10)
  })

  it('při dvojnásobku rezervací zdvojnásobí výnos, výnos na rezervaci zůstane', () => {
    const base = {
      insurance: { attachPct: 5, price: 600, commissionPct: 20 },
      car: { attachPct: 2, price: 4500, commissionPct: 8 },
    }
    const a = calculateImpact({ bookings: 30000, ...base })
    const b = calculateImpact({ bookings: 60000, ...base })
    expect(b.revenue).toBe(a.revenue * 2)
    expect(b.revenuePerBooking).toBeCloseTo(a.revenuePerBooking, 10)
  })

  it('nula rezervací nedělí nulou', () => {
    const zero = { attachPct: 0, price: 0, commissionPct: 0 }
    expect(calculateImpact({ bookings: 0, insurance: zero, car: zero }).revenuePerBooking).toBe(0)
  })
})
