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
import { CartScreen } from './cart/CartScreen'
import { TripProvider } from './trip/TripProvider'
import { useTrip } from './trip/state'

/**
 * Prototyp navrhovaného webu. Úvodní stránka (analyza-webu.md, kapitola 3)
 * obrazovka 2 s nabídkou doplňků na #doplnky (kapitola 4) a obrazovka 3 s košíkem na #kosik (kapitola 5).
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
  if (route !== 'home')
    return (
      <>
        <TopBar current="prototype" />
        <Header minimal />
        <main className="bg-page">{route === 'addons' ? <AddonsScreen /> : <CartScreen />}</main>
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
