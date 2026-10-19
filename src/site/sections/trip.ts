import { tripBuilder, type AddonKind } from '../../content-prototyp'

export type Preset = (typeof tripBuilder.presets)[number]

/** Spočítá cenu cesty a kolik z ní pokryjí benefity. */
export function tripTotals(preset: Preset, added: AddonKind[], balance: number) {
  const total =
    preset.stay.price +
    (added.includes('car') ? preset.car.price : 0) +
    (added.includes('insurance') ? preset.insurance.price : 0)
  const fromBenefits = Math.min(Math.max(balance, 0), total)
  return { total, fromBenefits, topUp: total - fromBenefits, left: Math.max(balance - total, 0) }
}
