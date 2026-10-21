import booking from '../assets/logos/booking.svg'
import edenred from '../assets/logos/edenred.svg'
import pluxee from '../assets/logos/pluxee.svg'
import up from '../assets/logos/up.svg'
import type { ProgramId } from '../../content-prototyp'

/**
 * Loga benefitních programů a Booking.com. Jsou to ochranné známky jejich vlastníků,
 * v prototypu jen ukazují, které programy web přijímá a odkud je nabídka ubytování.
 */
const PROGRAMS: Record<ProgramId, { src: string; name: string; height: string }> = {
  edenred: { src: edenred, name: 'Edenred', height: 'h-9' },
  pluxee: { src: pluxee, name: 'Pluxee', height: 'h-5' },
  up: { src: up, name: 'Up', height: 'h-5' },
}

/** Decorative, když název programu už nese okolní text, třeba popisek dlaždice. */
export function ProgramLogo({ id, decorative = false }: { id: ProgramId; decorative?: boolean }) {
  const logo = PROGRAMS[id]
  return (
    <img src={logo.src} alt={decorative ? '' : logo.name} className={`${logo.height} w-auto`} />
  )
}

export function BookingLogo({ className = 'h-3.5' }: { className?: string }) {
  return <img src={booking} alt="Booking.com" className={`inline-block w-auto ${className}`} />
}
