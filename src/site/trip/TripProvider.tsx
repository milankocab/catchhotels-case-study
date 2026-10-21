import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_BALANCE, type Route, type Trip } from './offer'
import { TripContext } from './state'
import { usePrototype } from '../state'

const STORAGE_KEY = 'prototyp-cesta-v1'
// Obrazovky prototypu mají vlastní adresu v hashi, aby fungovalo tlačítko zpět a šlo poslat odkaz.
const HASHES: Record<Exclude<Route, 'home'>, string> = { addons: '#doplnky', cart: '#kosik' }

const routeFromHash = (): Route => {
  if (typeof window === 'undefined') return 'home'
  const found = Object.entries(HASHES).find(([, hash]) => hash === window.location.hash)
  return (found?.[0] as Route | undefined) ?? 'home'
}

const DEFAULT_TRIP: Trip = { stayId: 'more', insurance: null, car: null, balance: DEFAULT_BALANCE }

function loadTrip(): Trip {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null') as Trip | null
    return saved?.stayId ? { ...DEFAULT_TRIP, ...saved } : DEFAULT_TRIP
  } catch {
    return DEFAULT_TRIP
  }
}

export function TripProvider({ children }: { children: ReactNode }) {
  const { addonsVariant } = usePrototype()
  const [route, setRoute] = useState<Route>(routeFromHash)
  const [trip, setTripState] = useState<Trip>(loadTrip)

  useEffect(() => {
    const sync = () => setRoute(routeFromHash())
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
    }
  }, [])

  // Nová obrazovka začíná nahoře, jako by se načetla nová stránka.
  useEffect(() => {
    window.scrollTo?.({ top: 0, behavior: 'instant' })
  }, [route])

  const setTrip = useCallback((update: (trip: Trip) => Trip) => {
    setTripState((current) => {
      const next = update(current)
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // Bez úložiště jen nepřežije obnovení stránky.
      }
      return next
    })
  }, [])

  const goTo = useCallback((next: Exclude<Route, 'home'>) => {
    if (window.location.hash !== HASHES[next]) window.location.hash = HASHES[next]
    setRoute(next)
  }, [])

  const startTrip = useCallback(
    (start: Partial<Trip> & Pick<Trip, 'stayId'>) => {
      setTrip((current) => ({
        stayId: start.stayId,
        insurance: start.insurance ?? null,
        car: start.car ?? null,
        balance: start.balance ?? current.balance,
      }))
      goTo(addonsVariant === 'B' ? 'cart' : 'addons')
    },
    [setTrip, goTo, addonsVariant],
  )

  const goHome = useCallback(() => {
    window.history.pushState(null, '', window.location.pathname + window.location.search)
    setRoute('home')
  }, [])

  const restart = useCallback(() => {
    setTrip(() => DEFAULT_TRIP)
    goHome()
  }, [setTrip, goHome])

  const value = useMemo(
    () => ({ route, trip, setTrip, startTrip, goTo, goHome, restart }),
    [route, trip, setTrip, startTrip, goTo, goHome, restart],
  )
  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}
