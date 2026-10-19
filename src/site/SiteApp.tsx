import { TopBar } from '../shared/TopBar'
import { PrototypeProvider } from './PrototypeProvider'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Destinations } from './sections/Destinations'
import { TripBuilder } from './sections/TripBuilder'
import { GoodToKnow } from './sections/GoodToKnow'
import { Guide } from './sections/Guide'
import { BookingSection } from './sections/BookingSection'
import { HrBlock } from './sections/HrBlock'
import { Faq } from './sections/Faq'
import { Footer } from './sections/Footer'
import { Chat } from './components/Chat'
import { PrototypeControls } from './components/PrototypeControls'
import { useScrollReveal } from './motion'
import { AddonsScreen } from './addons/AddonsScreen'
import { TripProvider } from './trip/TripProvider'
import { useTrip } from './trip/state'

/**
 * Prototyp navrhovaného webu. Úvodní stránka (pořadí sekcí podle analyza-webu.md, kapitola 8.3)
 * a obrazovka 2 s nabídkou doplňků na adrese #doplnky (kapitola 8.8).
 */
export function SiteApp() {
  return (
    <PrototypeProvider>
      <TripProvider>
        <Screens />
      </TripProvider>
    </PrototypeProvider>
  )
}

function Screens() {
  useScrollReveal()
  const { route } = useTrip()
  if (route === 'addons')
    return (
      <>
        <TopBar current="prototype" />
        <Header minimal />
        <main className="bg-page">
          <AddonsScreen />
        </main>
        <Footer />
        <PrototypeControls />
        <Chat />
      </>
    )
  return (
    <>
      <TopBar current="prototype" />
      <Header />
      <main>
        <Hero />
        <Destinations />
        <TripBuilder />
        <GoodToKnow />
        <Guide />
        <BookingSection />
        <HrBlock />
        <Faq />
      </main>
      <Footer />
      <PrototypeControls />
      <Chat />
    </>
  )
}
