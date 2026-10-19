import { calculateCart } from './cart'

describe('calculateCart', () => {
  it('když body stačí, karta se nepoužije', () => {
    expect(
      calculateCart({ accommodation: 18900, insurance: 690, car: 0, pointsBalance: 22000 }),
    ).toEqual({
      total: 19590,
      paidByPoints: 19590,
      paidByCard: 0,
      pointsShare: 1,
    })
  })

  it('zbytek nad zůstatkem bodů doplatí kartou', () => {
    const cart = calculateCart({
      accommodation: 18900,
      insurance: 690,
      car: 5200,
      pointsBalance: 22000,
    })
    expect(cart.total).toBe(24790)
    expect(cart.paidByPoints).toBe(22000)
    expect(cart.paidByCard).toBe(2790)
  })
})
