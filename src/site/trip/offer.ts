import { offer, type CarClass, type InsuranceTier, type StayId } from '../../content-prototyp'

export type Route = 'home' | 'addons'

/** Výběr na obrazovce 2. Null znamená, že člověk zatím nic nezvolil, 'none' je výslovné „Bez“. */
export type Trip = {
  stayId: StayId
  insurance: InsuranceTier | 'none' | null
  car: CarClass | 'none' | null
  balance: number
}

export const DEFAULT_BALANCE = 22000

/** Karty destinací a předvolby trip builderu vedou na pobyt se stejnými daty. */
export const DESTINATION_STAY: Record<string, StayId> = {
  krkonose: 'hory',
  chorvatsko: 'more',
  praha: 'mesto',
  rakousko: 'alpy',
}

const KEYWORDS: [RegExp, StayId][] = [
  [/krkono|sněžk|snezk|pec|hory|špindl|spindl/i, 'hory'],
  [/praha|prague|brno/i, 'mesto'],
  [/rakous|alp|schladming|salcburk|tyrol/i, 'alpy'],
]

/** Prototyp přeskakuje výsledky, proto podle hledaného místa vybere nejbližší ukázkový pobyt. */
export function stayFromText(text: string): StayId {
  return KEYWORDS.find(([pattern]) => pattern.test(text))?.[1] ?? 'more'
}

export const isTier = (value: Trip['insurance']): value is InsuranceTier =>
  value !== null && value !== 'none'
export const isCar = (value: Trip['car']): value is CarClass => value !== null && value !== 'none'

export function offerTotals(trip: Trip) {
  const stay = offer.stays[trip.stayId]
  const insurance = isTier(trip.insurance) ? stay.insurance[trip.insurance] : 0
  const car = isCar(trip.car) ? stay.car[trip.car] : 0
  const total = stay.price + insurance + car
  const balance = Math.max(trip.balance, 0)
  const fromBenefits = Math.min(balance, total)
  return {
    stay,
    insurance,
    car,
    total,
    fromBenefits,
    topUp: total - fromBenefits,
    left: Math.max(balance - total, 0),
    share: total > 0 ? fromBenefits / total : 1,
    hasAddons: insurance > 0 || car > 0,
  }
}
