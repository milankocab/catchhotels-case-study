import { createContext, useContext } from 'react'
import type { Route, Trip } from './offer'

export type TripState = {
  route: Route
  trip: Trip
  setTrip: (update: (trip: Trip) => Trip) => void
  /** Začne objednávku s pobytem a případně předvybranými doplňky a otevře obrazovku 2. */
  startTrip: (start: Partial<Trip> & Pick<Trip, 'stayId'>) => void
  goHome: () => void
}

export const TripContext = createContext<TripState | null>(null)

export function useTrip(): TripState {
  const state = useContext(TripContext)
  if (!state) throw new Error('useTrip musí být uvnitř TripProvider')
  return state
}
