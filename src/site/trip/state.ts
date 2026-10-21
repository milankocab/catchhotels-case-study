import { createContext, useContext } from 'react'
import type { Route, Trip } from './offer'

export type TripState = {
  route: Route
  trip: Trip
  setTrip: (update: (trip: Trip) => Trip) => void
  /**
   * Začne objednávku s pobytem a případně předvybranými doplňky. Ve variantě A testu 3
   * otevře obrazovku 2, ve variantě B rovnou košík.
   */
  startTrip: (start: Partial<Trip> & Pick<Trip, 'stayId'>) => void
  /** Otevře obrazovku 2 nebo 3. */
  goTo: (route: Exclude<Route, 'home'>) => void
  goHome: () => void
  /** Vymaže výběr a vrátí na úvodní stránku, aby šel prototyp projít znovu. */
  restart: () => void
}

export const TripContext = createContext<TripState | null>(null)

export function useTrip(): TripState {
  const state = useContext(TripContext)
  if (!state) throw new Error('useTrip musí být uvnitř TripProvider')
  return state
}
