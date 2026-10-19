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

/** Úvodní stránka navrhovaného webu. Pořadí sekcí podle analyza-webu.md, kapitola 8.3. */
export function SiteApp() {
  useScrollReveal()
  return (
    <PrototypeProvider>
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
    </PrototypeProvider>
  )
}
