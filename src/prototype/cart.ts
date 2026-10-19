export interface CartInput {
  accommodation: number
  insurance: number
  car: number
  pointsBalance: number
}

export interface CartResult {
  total: number
  paidByPoints: number
  paidByCard: number
  /** Podíl ceny zaplacený body, 0 až 1. Pro pruh s rozdělením platby. */
  pointsShare: number
}

/**
 * Rozdělení platby. Prototyp předpokládá, že body jde použít na ubytování i na doplňky
 * a 1 bod = 1 Kč. Body se použijí jako první, zbytek se doplatí kartou.
 */
export function calculateCart(input: CartInput): CartResult {
  const total = input.accommodation + input.insurance + input.car
  const paidByPoints = Math.min(Math.max(input.pointsBalance, 0), total)
  return {
    total,
    paidByPoints,
    paidByCard: total - paidByPoints,
    pointsShare: total > 0 ? paidByPoints / total : 0,
  }
}
